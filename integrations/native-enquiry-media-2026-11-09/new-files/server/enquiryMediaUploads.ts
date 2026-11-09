import { createHash, randomBytes } from "node:crypto";
import { openAsBlob } from "node:fs";
import { lstat, mkdtemp, open, readdir, rm } from "node:fs/promises";
import { isIP } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { TRPCError } from "@trpc/server";
import { fileTypeFromFile, type FileTypeResult } from "file-type";
import { z } from "zod";
import {
  ENQUIRY_CHUNK_BYTES,
  ENQUIRY_UPLOAD_TTL_MS,
  MAX_ENQUIRY_FILES,
  MAX_ENQUIRY_TOTAL_BYTES,
  MIB,
  enquiryAttachmentLimit,
  enquiryMediaFormat,
  type EnquiryMediaKind,
} from "../shared/enquiryAttachments";
import type { TrpcContext } from "./_core/context";
import { publicProcedure } from "./_core/trpc";
import { storagePut } from "./storage";

// Originals are process-local, never converted or loaded in full into memory.
// A process restart requires a fresh upload; expired orphan spools are swept below.
const PRIVATE_PREFIX = "csb-enquiry-media-v1-";
const GLOBAL_RESERVED_LIMIT = 2 * 1024 * MIB;
const ACTIVE_LIMIT = 64;
const BEGIN_ATTEMPT_LIMIT = 40;
const CLIENT_BUCKET_LIMIT = 4096;
const SESSION_LIMIT = 4096; // Includes small, TTL-retained successful retry results.
const MAX_QUEUED_OPERATIONS = 4;
const MAX_BASE64_CHARS = Math.ceil(ENQUIRY_CHUNK_BYTES / 3) * 4;
const sessions = new Map<string, UploadSession>();
const clients = new Map<string, ClientBudget>();
let reservedBytes = 0;
let activeUploads = 0;
let finalizing = 0;
let sweepPromise: Promise<void> | undefined;
let lastOrphanSweep = -Infinity;

interface ClientBudget {
  windowStart: number;
  attempts: number;
  reserved: number;
  active: number;
}
interface UploadResult { fileName: string; url: string; key: string }
interface ChunkReceipt { offset: number; size: number; hash: string }
interface UploadSession {
  id: string;
  client: string;
  fileName: string;
  kind: EnquiryMediaKind;
  size: number;
  expiresAt: number;
  directory?: string;
  path?: string;
  received: number;
  chunks: ChunkReceipt[];
  reserved: boolean;
  result?: UploadResult;
  tail: Promise<void>;
  pending: number;
}

function badRequest(message: string): TRPCError {
  return new TRPCError({ code: "BAD_REQUEST", message });
}
function busy(): TRPCError {
  return new TRPCError({
    code: "TOO_MANY_REQUESTS",
    message: "Attachment uploads are busy. Please wait a moment and try again.",
  });
}
function missing(): TRPCError {
  return new TRPCError({
    code: "NOT_FOUND",
    message: "This attachment upload has expired or is unavailable. Please choose the file again.",
  });
}
function storageFailure(): TRPCError {
  // Never attach the storage error/cause: it can contain credentials or upstream bodies.
  return new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "We could not save this attachment just now. Please retry the upload.",
  });
}
function clientKey(ctx: TrpcContext): string {
  const cf = ctx.req.headers["cf-connecting-ip"];
  const address = typeof cf === "string" && isIP(cf) ? cf
    : ctx.req.ip && isIP(ctx.req.ip) ? ctx.req.ip
    : ctx.req.socket?.remoteAddress && isIP(ctx.req.socket.remoteAddress)
      ? ctx.req.socket.remoteAddress : "unknown";
  // No raw IP addresses, names or image data in log output or accounting keys.
  return createHash("sha256").update(address).digest("hex");
}
function safeDisplayName(name: string): string {
  // This is display-only. Never use any part of the user name for a disk/storage path.
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/^\.+/, "").slice(0, 160) || "attachment";
}
function accountBegin(client: string): ClientBudget {
  const now = Date.now();
  let budget = clients.get(client);
  if (!budget) {
    if (clients.size >= CLIENT_BUCKET_LIMIT) throw busy();
    budget = { windowStart: now, attempts: 0, reserved: 0, active: 0 };
    clients.set(client, budget);
  }
  if (now - budget.windowStart >= ENQUIRY_UPLOAD_TTL_MS) {
    budget.windowStart = now;
    budget.attempts = 0;
  }
  if (++budget.attempts > BEGIN_ATTEMPT_LIMIT) {
    // Keep accounting bounded even for an abusive client's repeated attempts.
    budget.attempts = BEGIN_ATTEMPT_LIMIT + 1;
    throw busy();
  }
  return budget;
}
async function removeSpool(session: UploadSession): Promise<void> {
  if (session.directory) {
    // Keep the reservation if removal fails: disk resources must not be undercounted.
    await rm(session.directory, { recursive: true, force: true });
    session.directory = undefined;
    session.path = undefined;
  }
  if (session.reserved) {
    session.reserved = false;
    reservedBytes -= session.size;
    activeUploads--;
    const budget = clients.get(session.client);
    if (budget) {
      budget.reserved -= session.size;
      budget.active--;
    }
  }
}
async function dispose(session: UploadSession): Promise<void> {
  await removeSpool(session);
  if (sessions.get(session.id) === session) sessions.delete(session.id);
}

/** Lazy and interval housekeeping; also usable for deterministic tests/admin shutdown. */
export async function cleanupExpiredEnquiryMediaUploads(): Promise<void> {
  if (sweepPromise) return sweepPromise;
  sweepPromise = (async () => {
    const now = Date.now();
    for (const session of Array.from(sessions.values())) {
      // In-flight writes/finalization own their files; never unlink underneath a Blob stream.
      if (session.expiresAt <= now && session.pending === 0) {
        await dispose(session).catch(() => undefined);
      } else if (session.result && session.pending === 0 && session.reserved) {
        await removeSpool(session).catch(() => undefined);
      }
    }
    for (const [key, budget] of Array.from(clients.entries())) {
      if (budget.active === 0 && now - budget.windowStart >= ENQUIRY_UPLOAD_TTL_MS) clients.delete(key);
    }
    if (now - lastOrphanSweep < 60_000) return;
    lastOrphanSweep = now;
    const owned = new Set(Array.from(sessions.values()).map(session => session.directory).filter(Boolean));
    const entries = await readdir(tmpdir(), { withFileTypes: true }).catch(() => []);
    for (const entry of entries) {
      // Only our private mkdtemp prefix; never traverse symlinks or delete other app files.
      if (!entry.isDirectory() || !entry.name.startsWith(PRIVATE_PREFIX)) continue;
      const directory = join(tmpdir(), entry.name);
      if (owned.has(directory)) continue;
      try {
        const stat = await lstat(directory);
        if (!stat.isSymbolicLink() && now - stat.mtimeMs >= ENQUIRY_UPLOAD_TTL_MS) {
          await rm(directory, { recursive: true, force: true });
        }
      } catch { /* Best-effort housekeeping; no PII or file paths logged. */ }
    }
  })().finally(() => { sweepPromise = undefined; });
  return sweepPromise;
}
const cleanupTimer = setInterval(() => {
  void cleanupExpiredEnquiryMediaUploads().catch(() => undefined);
}, 60_000);
cleanupTimer.unref();

async function withSession<T>(ctx: TrpcContext, id: string, operation: (session: UploadSession) => Promise<T>): Promise<T> {
  await cleanupExpiredEnquiryMediaUploads();
  const session = sessions.get(id);
  // A cryptographically random bearer capability authorizes continuation across mobile networks.
  // Original-client accounting remains fixed; changing networks never transfers reservations.
  if (!session || session.expiresAt <= Date.now()) throw missing();
  if (session.pending >= MAX_QUEUED_OPERATIONS) throw busy();
  session.pending++;
  const previous = session.tail;
  let release!: () => void;
  session.tail = new Promise<void>(resolve => { release = resolve; });
  await previous;
  try {
    if (sessions.get(id) !== session || session.expiresAt <= Date.now()) throw missing();
    return await operation(session);
  } finally {
    session.pending--;
    // Clean expiry after an in-flight operation releases its disk/storage resources.
    if (session.pending === 0 && session.expiresAt <= Date.now()) await dispose(session).catch(() => undefined);
    release();
  }
}

function decodeChunk(data: string): Buffer {
  if (!data.length || data.length > MAX_BASE64_CHARS || data.length % 4 !== 0
      || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(data)) {
    throw badRequest("This attachment chunk is invalid. Please choose the file again.");
  }
  const bytes = Buffer.from(data, "base64");
  // Re-encoding checks padding bits as well as canonical alphabet/padding/whitespace.
  if (!bytes.length || bytes.length > ENQUIRY_CHUNK_BYTES || bytes.toString("base64") !== data) {
    throw badRequest("This attachment chunk is invalid or too large.");
  }
  return bytes;
}

interface DetectedFormat { kind: EnquiryMediaKind; extension: string; mime: string }
// Pair extension AND actual sniffed MIME. No MIME/name-only fallback or unknown formats.
const DETECTED_FORMATS: ReadonlyArray<[string, string, EnquiryMediaKind, string?, string?]> = [
  ["jpg", "image/jpeg", "photo"], ["png", "image/png", "photo"],
  ["apng", "image/apng", "photo", "png", "image/png"],
  ["gif", "image/gif", "photo"], ["webp", "image/webp", "photo"],
  ["heic", "image/heic", "photo"], ["heic", "image/heic-sequence", "photo", "heic", "image/heic"],
  ["heic", "image/heif", "photo", "heif", "image/heif"],
  ["heic", "image/heif-sequence", "photo", "heif", "image/heif"],
  ["avif", "image/avif", "photo"], ["tif", "image/tiff", "photo"],
  ["bmp", "image/bmp", "photo"], ["jxl", "image/jxl", "photo"], ["jp2", "image/jp2", "photo"],
  ["cr2", "image/x-canon-cr2", "photo"], ["cr3", "image/x-canon-cr3", "photo"],
  ["dng", "image/x-adobe-dng", "photo"], ["nef", "image/x-nikon-nef", "photo"],
  ["arw", "image/x-sony-arw", "photo"], ["orf", "image/x-olympus-orf", "photo"],
  ["rw2", "image/x-panasonic-rw2", "photo"], ["raf", "image/x-fujifilm-raf", "photo"],
  ["mp4", "video/mp4", "video"], ["mov", "video/quicktime", "video"],
  ["m4v", "video/x-m4v", "video"], ["webm", "video/webm", "video"],
  ["avi", "video/vnd.avi", "video", "avi", "video/x-msvideo"],
  ["mkv", "video/x-matroska", "video"], ["mpg", "video/mpeg", "video"],
  ["mpg", "video/MP1S", "video", "mpg", "video/mpeg"],
  ["mpg", "video/MP2P", "video", "mpg", "video/mpeg"],
  ["3gp", "video/3gpp", "video"], ["3g2", "video/3gpp2", "video"],
  ["asf", "video/x-ms-asf", "video", "asf", "video/x-ms-wmv"],
  ["asf", "application/vnd.ms-asf", "video", "asf", "video/x-ms-wmv"],
  ["mts", "video/mp2t", "video"], ["flv", "video/x-flv", "video"],
  ["pdf", "application/pdf", "document"],
];
function detectedFormat(type: FileTypeResult | undefined): DetectedFormat | undefined {
  const match = type && DETECTED_FORMATS.find(([ext, mime]) => ext === type.ext && mime === type.mime);
  return match ? { kind: match[2], extension: match[3] ?? match[0], mime: match[4] ?? match[1] } : undefined;
}
function validStorageUrl(value: unknown): value is string {
  if (typeof value !== "string" || !value.length || value.length > 512 || /[\s\\\u0000-\u001f\u007f]/.test(value)) return false;
  if (/%(?![0-9a-f]{2})|%(?:0[0-9a-f]|1[0-9a-f]|7f|5c)/i.test(value)) return false;
  if (value.startsWith("/manus-storage/")) {
    // Reject URL/path normalization ambiguities and encoded controls/backslashes/dot segments.
    if (/%(?:0[0-9a-f]|1[0-9a-f]|7f|5c|2e|2f)/i.test(value)) return false;
    const parsed = new URL(value, "https://storage.invalid");
    return parsed.origin === "https://storage.invalid" && parsed.pathname.startsWith("/manus-storage/")
      && parsed.pathname.length > "/manus-storage/".length && !parsed.hash;
  }
  if (!/^https?:\/\//i.test(value)) return false;
  try {
    const url = new URL(value);
    return (url.protocol === "http:" || url.protocol === "https:") && !!url.hostname
      && !url.username && !url.password && !url.hash;
  } catch { return false; }
}

const uploadIdSchema = z.string().regex(/^[a-f0-9]{64}$/);
export const enquiryMediaUploadProcedures = {
  beginMediaUpload: publicProcedure.input(z.object({
    fileName: z.string().min(1).max(160),
    contentType: z.string().max(100),
    size: z.number().int().positive().max(250 * MIB),
  }).strict()).mutation(async ({ input, ctx }) => {
    await cleanupExpiredEnquiryMediaUploads();
    const client = clientKey(ctx);
    const budget = accountBegin(client);
    const format = enquiryMediaFormat({ name: input.fileName, type: input.contentType });
    if (!format) throw badRequest("Please choose a supported photo, video or PDF.");
    if (input.size > enquiryAttachmentLimit(format)) {
      throw badRequest("Photos and PDFs can be up to 100 MB each; videos can be up to 250 MB each.");
    }
    if (activeUploads >= ACTIVE_LIMIT || sessions.size >= SESSION_LIMIT
        || reservedBytes + input.size > GLOBAL_RESERVED_LIMIT
        || budget.reserved + input.size > MAX_ENQUIRY_TOTAL_BYTES
        || budget.active >= MAX_ENQUIRY_FILES) throw busy();
    const id = randomBytes(32).toString("hex");
    const session: UploadSession = {
      id, client, fileName: safeDisplayName(input.fileName), kind: format.kind,
      size: input.size, expiresAt: Date.now() + ENQUIRY_UPLOAD_TTL_MS,
      received: 0, chunks: [], reserved: true, tail: Promise.resolve(), pending: 1,
    };
    // Reserve synchronously before any filesystem await; parallel begin cannot bypass limits.
    sessions.set(id, session);
    reservedBytes += input.size;
    activeUploads++;
    budget.reserved += input.size;
    budget.active++;
    try {
      session.directory = await mkdtemp(join(tmpdir(), PRIVATE_PREFIX));
      session.path = join(session.directory, "original");
      const file = await open(session.path, "wx", 0o600);
      await file.close();
      return { uploadId: id, chunkSize: ENQUIRY_CHUNK_BYTES };
    } catch {
      await dispose(session).catch(() => undefined);
      throw storageFailure();
    } finally { session.pending--; }
  }),

  uploadMediaChunk: publicProcedure.input(z.object({
    uploadId: uploadIdSchema,
    chunkIndex: z.number().int().nonnegative().max(249),
    fileData: z.string().min(1).max(MAX_BASE64_CHARS),
  }).strict()).mutation(({ input, ctx }) => withSession(ctx, input.uploadId, async session => {
    if (session.result || !session.path) throw badRequest("This attachment is already complete.");
    const bytes = decodeChunk(input.fileData);
    const hash = createHash("sha256").update(bytes).digest("hex");
    const offset = input.chunkIndex * ENQUIRY_CHUNK_BYTES;
    if (input.chunkIndex < session.chunks.length) {
      const receipt = session.chunks[input.chunkIndex];
      if (receipt.offset !== offset || receipt.size !== bytes.length || receipt.hash !== hash) {
        throw badRequest("This attachment chunk conflicts with an earlier upload. Please choose the file again.");
      }
      session.expiresAt = Date.now() + ENQUIRY_UPLOAD_TTL_MS;
      return { receivedBytes: session.received };
    }
    if (input.chunkIndex !== session.chunks.length || offset !== session.received) {
      throw badRequest("Please upload attachment chunks in order.");
    }
    const expected = Math.min(ENQUIRY_CHUNK_BYTES, session.size - session.received);
    if (expected <= 0 || bytes.length !== expected) {
      throw badRequest("This attachment chunk does not match the declared file size.");
    }
    try {
      const file = await open(session.path, "r+");
      try {
        if ((await file.stat()).size !== session.received) throw new Error("Spool size mismatch");
        let written = 0;
        while (written < bytes.length) {
          const result = await file.write(bytes, written, bytes.length - written, offset + written);
          if (!result.bytesWritten) throw new Error("Incomplete spool write");
          written += result.bytesWritten;
        }
      } catch {
        // A retry must start at the same offset even after a partial write.
        await file.truncate(session.received);
        throw storageFailure();
      } finally { await file.close(); }
    } catch { throw storageFailure(); }
    session.chunks.push({ offset, size: bytes.length, hash });
    session.received += bytes.length;
    session.expiresAt = Date.now() + ENQUIRY_UPLOAD_TTL_MS;
    return { receivedBytes: session.received };
  })),

  finishMediaUpload: publicProcedure.input(z.object({ uploadId: uploadIdSchema }).strict())
    .mutation(({ input, ctx }) => withSession(ctx, input.uploadId, async session => {
      if (session.result) {
        await removeSpool(session).catch(() => undefined);
        return session.result;
      }
      if (!session.path || session.received !== session.size) throw badRequest("Please finish uploading all attachment chunks first.");
      session.expiresAt = Date.now() + ENQUIRY_UPLOAD_TTL_MS;
      if (finalizing >= 2) throw busy();
      finalizing++;
      try {
        let actual: DetectedFormat | undefined;
        try {
          if ((await lstat(session.path)).size !== session.size) throw new Error("Spool size mismatch");
          actual = detectedFormat(await fileTypeFromFile(session.path));
        } catch { /* Malformed/truncated/unsupported originals fail closed. */ }
        if (!actual || actual.kind !== session.kind) {
          await dispose(session).catch(() => undefined);
          throw badRequest("The attachment contents do not match a supported photo, video or PDF. Please choose the original file again.");
        }
        // Storage extension and MIME come from actual bytes, never the user's claimed name/type.
        const key = `survey-attachments/${session.id}.${actual.extension}`;
        let url: string;
        try {
          const blob = await openAsBlob(session.path, { type: actual.mime });
          if (blob.size !== session.size) throw new Error("Spool size mismatch");
          const stored = await storagePut(key, blob, actual.mime, { signal: AbortSignal.timeout(180_000) });
          if (!validStorageUrl(stored.url) || stored.key !== key) throw new Error("Invalid storage result");
          url = stored.url.startsWith("/manus-storage/")
            ? new URL(stored.url, "https://commercialshotblasting.co.uk").href : stored.url;
          if (url.length > 512) throw new Error("Storage URL too long");
        } catch { throw storageFailure(); }
        session.result = { fileName: session.fileName, key, url };
        session.expiresAt = Date.now() + ENQUIRY_UPLOAD_TTL_MS;
        // Cache the successful result before cleanup. Even a cleanup error cannot duplicate storage.
        await removeSpool(session).catch(() => undefined);
        return session.result;
      } finally {
        finalizing--;
        if (sessions.get(session.id) === session) session.expiresAt = Date.now() + ENQUIRY_UPLOAD_TTL_MS;
      }
    })),

  cancelMediaUpload: publicProcedure.input(z.object({ uploadId: uploadIdSchema }).strict())
    .mutation(async ({ input, ctx }) => {
      // Cancellation of unknown/expired IDs is deliberately idempotent and non-enumerating.
      try {
        await withSession(ctx, input.uploadId, async session => {
          await dispose(session);
        });
      } catch (error) {
        if (!(error instanceof TRPCError) || error.code !== "NOT_FOUND") {
          if (error instanceof TRPCError) throw error;
          throw storageFailure();
        }
      }
      return { success: true } as const;
    }),
};
