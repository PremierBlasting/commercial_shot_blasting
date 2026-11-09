import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { lstat, mkdtemp, readFile, readdir, rm, symlink, utimes, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";
import { router } from "./_core/trpc";
import type { TrpcContext } from "./_core/context";
import { ENQUIRY_CHUNK_BYTES as CHUNK, ENQUIRY_UPLOAD_TTL_MS as TTL, MIB } from "../shared/enquiryAttachments";
import { cleanupExpiredEnquiryMediaUploads, enquiryMediaUploadProcedures } from "./enquiryMediaUploads";

const storageMock = vi.hoisted(() => vi.fn());
vi.mock("./storage", () => ({ storagePut: storageMock }));
// A private test temp root avoids fake-clock housekeeping touching another test worker.
vi.mock("node:os", async importOriginal => {
  const actual = await importOriginal<typeof import("node:os")>();
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const root = await fs.mkdtemp(path.join(actual.tmpdir(), "csb-media-tests-"));
  return { ...actual, tmpdir: () => root };
});
const testRouter = router(enquiryMediaUploadProcedures);
function caller(ip = "192.0.2.1", cf?: string) {
  return testRouter.createCaller({
    user: null,
    req: { ip, headers: cf ? { "cf-connecting-ip": cf } : {}, socket: { remoteAddress: ip } },
    res: {},
  } as unknown as TrpcContext);
}
let now = Date.now();
let jpeg: Buffer;
let png: Buffer;
let webp: Buffer;
let gif: Buffer;
let tiff: Buffer;
let storedBytes: Buffer[] = [];
const pdf = Buffer.from("%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF\n");
const privatePrefix = "csb-enquiry-media-v1-";
async function privateSpools() {
  const entries = await readdir(tmpdir());
  return entries.filter(name => name.startsWith(privatePrefix)).map(name => join(tmpdir(), name));
}
async function upload(bytes: Buffer, fileName = "site.jpg", contentType = "image/jpeg", api = caller()) {
  const begun = await api.beginMediaUpload({ fileName, contentType, size: bytes.length });
  for (let offset = 0; offset < bytes.length; offset += CHUNK) {
    await api.uploadMediaChunk({ uploadId: begun.uploadId, chunkIndex: offset / CHUNK, fileData: bytes.subarray(offset, offset + CHUNK).toString("base64") });
  }
  return { api, ...begun };
}
function ftyp(brand: string) {
  const bytes = Buffer.alloc(32);
  bytes.writeUInt32BE(32, 0);
  bytes.write("ftyp", 4);
  bytes.write(brand.padEnd(4), 8);
  bytes.write(brand.padEnd(4), 16);
  return bytes;
}
function rawTiff(tag?: number, marker?: Buffer) {
  const bytes = Buffer.alloc(64);
  bytes.write("II"); bytes.writeUInt16LE(42, 2); bytes.writeUInt32LE(marker ? 16 : 8, 4);
  if (marker) marker.copy(bytes, 8);
  else if (tag) { bytes.writeUInt16LE(1, 8); bytes.writeUInt16LE(tag, 10); }
  return bytes;
}
function riff(type: string) {
  const bytes = Buffer.alloc(64);
  bytes.write("RIFF"); bytes.writeUInt32LE(56, 4); bytes.write(type, 8);
  return bytes;
}
function ebml(type: string) {
  const text = Buffer.from(type);
  const child = Buffer.concat([Buffer.from([0x42, 0x82, 0x80 | text.length]), text]);
  return Buffer.concat([Buffer.from([0x1a, 0x45, 0xdf, 0xa3, 0x80 | child.length]), child, Buffer.alloc(32)]);
}
function asf(video = true) {
  const bytes = Buffer.alloc(100);
  Buffer.from("3026b2758e66cf11a6d900aa0062ce6c", "hex").copy(bytes);
  bytes.writeBigUInt64LE(BigInt(100), 16);
  bytes.writeUInt32LE(1, 24);
  Buffer.from("9107dcb7b7a9cf118ee600c00c205365", "hex").copy(bytes, 30);
  bytes.writeBigUInt64LE(BigInt(70), 46);
  Buffer.from(video ? "c0ef19bc4d5bcf11a8fd00805f5c442b" : "409e69f84d5bcf11a8fd00805f5c442b", "hex").copy(bytes, 54);
  return bytes;
}
function transport(bdav = false) {
  const bytes = Buffer.alloc(384);
  bytes[bdav ? 4 : 0] = 0x47;
  bytes[bdav ? 196 : 188] = 0x47;
  return bytes;
}
function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
async function waitForCalls(count: number) {
  for (let i = 0; i < 100 && storageMock.mock.calls.length < count; i++) await new Promise(resolve => setTimeout(resolve, 2));
  expect(storageMock.mock.calls.length).toBe(count);
}

beforeAll(async () => {
  const image = sharp({ create: { width: 2, height: 2, channels: 3, background: { r: 20, g: 40, b: 60 } } });
  [jpeg, png, webp, gif, tiff] = await Promise.all([image.clone().jpeg().toBuffer(), image.clone().png().toBuffer(), image.clone().webp().toBuffer(), image.clone().gif().toBuffer(), image.clone().tiff().toBuffer()]);
});
beforeEach(() => {
  vi.spyOn(Date, "now").mockImplementation(() => now);
  storedBytes = [];
  storageMock.mockReset().mockImplementation(async (key: string, blob: Blob) => {
    expect(blob).toBeInstanceOf(Blob);
    storedBytes.push(Buffer.from(await blob.arrayBuffer()));
    return { key, url: `https://files.example.test/${key}` };
  });
});
afterEach(async () => {
  now += TTL + 60_001;
  await cleanupExpiredEnquiryMediaUploads();
  vi.restoreAllMocks();
});
afterAll(async () => { await rm(tmpdir(), { recursive: true, force: true }); });

describe("original byte detection and canonical storage formats", () => {
  it.each([
    ["jpg", () => jpeg, "jpg", "image/jpeg"],
    ["png", () => png, "png", "image/png"],
    ["webp", () => webp, "webp", "image/webp"],
    ["gif", () => gif, "gif", "image/gif"],
    ["tiff", () => tiff, "tif", "image/tiff"],
    ["heic", () => ftyp("heic"), "heic", "image/heic"],
    ["heif", () => ftyp("mif1"), "heif", "image/heif"],
    ["heic", () => ftyp("hevc"), "heic", "image/heic"],
    ["heif", () => ftyp("msf1"), "heif", "image/heif"],
    ["avif", () => ftyp("avif"), "avif", "image/avif"],
    ["bmp", () => Buffer.concat([Buffer.from("BM"), Buffer.alloc(62)]), "bmp", "image/bmp"],
    ["jxl", () => Buffer.from([0xff, 0x0a, 0, 0]), "jxl", "image/jxl"],
    ["jp2", () => Buffer.concat([Buffer.from("0000000c6a5020200d0a870a00000014667479706a703220", "hex"), Buffer.alloc(16)]), "jp2", "image/jp2"],
    ["cr2", () => rawTiff(undefined, Buffer.from("CR\x02\x00")), "cr2", "image/x-canon-cr2"],
    ["cr3", () => ftyp("crx"), "cr3", "image/x-canon-cr3"],
    ["dng", () => rawTiff(50706), "dng", "image/x-adobe-dng"],
    ["arw", () => rawTiff(50341), "arw", "image/x-sony-arw"],
    ["nef", () => rawTiff(undefined, Buffer.from([0x1c, 0, 0xfe, 0])), "nef", "image/x-nikon-nef"],
    ["orf", () => Buffer.concat([Buffer.from([0x49, 0x49, 0x52, 0x4f, 8, 0, 0, 0, 0x18]), Buffer.alloc(32)]), "orf", "image/x-olympus-orf"],
    ["rw2", () => Buffer.concat([Buffer.from("494955001800000088e774d8", "hex"), Buffer.alloc(32)]), "rw2", "image/x-panasonic-rw2"],
    ["raf", () => Buffer.concat([Buffer.from("FUJIFILMCCD-RAW"), Buffer.alloc(32)]), "raf", "image/x-fujifilm-raf"],
    ["mp4", () => ftyp("isom"), "mp4", "video/mp4"],
    ["mov", () => ftyp("qt"), "mov", "video/quicktime"],
    ["m4v", () => ftyp("M4V"), "m4v", "video/x-m4v"],
    ["webm", () => ebml("webm"), "webm", "video/webm"],
    ["mkv", () => ebml("matroska"), "mkv", "video/x-matroska"],
    ["avi", () => riff("AVI "), "avi", "video/x-msvideo"],
    ["mpeg", () => Buffer.from([0, 0, 1, 0xb3, 0, 0, 0, 0]), "mpg", "video/mpeg"],
    ["mpeg", () => Buffer.from([0, 0, 1, 0xba, 0x21, 0, 0, 0]), "mpg", "video/mpeg"],
    ["mpeg", () => Buffer.from([0, 0, 1, 0xba, 0x44, 0, 0, 0]), "mpg", "video/mpeg"],
    ["3gp", () => ftyp("3gp5"), "3gp", "video/3gpp"],
    ["3g2", () => ftyp("3g2a"), "3g2", "video/3gpp2"],
    ["wmv", () => asf(), "asf", "video/x-ms-wmv"],
    ["asf", () => asf(), "asf", "video/x-ms-wmv"],
    ["ts", () => transport(), "mts", "video/mp2t"],
    ["mts", () => transport(), "mts", "video/mp2t"],
    ["m2ts", () => transport(true), "mts", "video/mp2t"],
    ["flv", () => Buffer.from([0x46, 0x4c, 0x56, 1, 5, 0, 0, 0, 9, 0, 0, 0, 0]), "flv", "video/x-flv"],
    ["pdf", () => pdf, "pdf", "application/pdf"],
  ] as const)("sniffs %s originals, stores canonical %s without changing bytes", async (ext, make, canonical, mime) => {
    const bytes = make();
    const { api, uploadId } = await upload(bytes, `original.${ext}`, "application/octet-stream");
    const result = await api.finishMediaUpload({ uploadId });
    expect(result.key).toMatch(new RegExp(`^survey-attachments/[a-f0-9]{64}\\.${canonical}$`));
    const [key, blob, type] = storageMock.mock.calls[0];
    expect(key).toBe(result.key);
    expect(type).toBe(mime);
    expect(blob.size).toBe(bytes.length);
    expect(storedBytes[0]).toEqual(bytes);
  });

  it("permits generic TIFF-family camera RAW but never claims its user extension as actual format", async () => {
    const { api, uploadId } = await upload(tiff, "camera.nef", "image/x-nikon-nef");
    const result = await api.finishMediaUpload({ uploadId });
    expect(result.key).toMatch(/\.tif$/);
  });
  it("accepts blank browser MIME, extension aliases and sanitized display names", async () => {
    const { api, uploadId, chunkSize } = await upload(jpeg, "../../résumé photo.JPEG", "");
    expect(chunkSize).toBe(1048576);
    expect(uploadId).toMatch(/^[a-f0-9]{64}$/);
    const result = await api.finishMediaUpload({ uploadId });
    expect(result.fileName).toMatch(/^[a-zA-Z0-9._-]{1,160}$/);
    expect(result.fileName).not.toMatch(/^\./);
    expect(result.key).not.toContain("photo");
  });
  it("accepts supported MIME when there is no extension", async () => {
    const { api, uploadId } = await upload(jpeg, "photo", "image/jpeg");
    expect((await api.finishMediaUpload({ uploadId })).key).toMatch(/\.jpg$/);
  });
  it.each([
    ["HTML", () => Buffer.from("<!doctype html><html><script>alert(1)</script></html>")],
    ["SVG", () => Buffer.from("<svg xmlns='http://www.w3.org/2000/svg'><script>alert(1)</script></svg>")],
    ["executable", () => Buffer.concat([Buffer.from("MZ"), Buffer.alloc(128)])],
    ["unknown", () => Buffer.from("not a photo")],
    ["audio MP4", () => ftyp("M4A")],
    ["audio ASF", () => asf(false)],
  ] as const)("rejects %s despite a supported claimed filename/MIME", async (_label, make) => {
    const { api, uploadId } = await upload(make());
    await expect(api.finishMediaUpload({ uploadId })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(storageMock).not.toHaveBeenCalled();
    await expect(api.finishMediaUpload({ uploadId })).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
  it.each([
    ["photo", () => jpeg, "site.mp4", "video/mp4"],
    ["video", () => ftyp("isom"), "site.jpg", "image/jpeg"],
    ["PDF", () => pdf, "site.jpg", "image/jpeg"],
    ["photo", () => jpeg, "site.pdf", "application/pdf"],
  ] as const)("rejects actual %s in a different policy category", async (_label, make, name, type) => {
    const { api, uploadId } = await upload(make(), name, type);
    await expect(api.finishMediaUpload({ uploadId })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(storageMock).not.toHaveBeenCalled();
  });
});

describe("strict schema, sizes and bounded sequential chunks", () => {
  it.each([
    { fileName: "a.jpg", contentType: "image/jpeg", size: 0 },
    { fileName: "a.jpg", contentType: "image/jpeg", size: -1 },
    { fileName: "a.jpg", contentType: "image/jpeg", size: 1.5 },
    { fileName: "a.jpg", contentType: "image/jpeg", size: 100 * MIB + 1 },
    { fileName: "a.pdf", contentType: "application/pdf", size: 100 * MIB + 1 },
    { fileName: "a.mp4", contentType: "video/mp4", size: 250 * MIB + 1 },
    { fileName: "x".repeat(161) + ".jpg", contentType: "image/jpeg", size: 1 },
    { fileName: "a.jpg", contentType: "x".repeat(101), size: 1 },
    { fileName: "a.svg", contentType: "image/jpeg", size: 1 },
    { fileName: "a.exe", contentType: "video/mp4", size: 1 },
  ])("rejects invalid begin metadata %#", async input => {
    await expect(caller().beginMediaUpload(input)).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
  it("permits exact per-file limits with sparse declared reservations", async () => {
    const api = caller();
    for (const [fileName, contentType, size] of [["a.jpg", "image/jpeg", 100 * MIB], ["a.pdf", "application/pdf", 100 * MIB], ["a.mp4", "video/mp4", 250 * MIB]] as const) {
      const begun = await api.beginMediaUpload({ fileName, contentType, size });
      await api.cancelMediaUpload({ uploadId: begun.uploadId });
    }
  });
  it.each([" YQ==", "YQ==\n", "YQ", "YQ=", "YQ===", "YR==", "YWJ=", "YWJj_===", "data:image/jpeg;base64,YQ==", "", "!!!!"])("rejects noncanonical base64 %j", async fileData => {
    const api = caller();
    const { uploadId } = await api.beginMediaUpload({ fileName: "a.jpg", contentType: "image/jpeg", size: 1 });
    await expect(api.uploadMediaChunk({ uploadId, chunkIndex: 0, fileData })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
  it("rejects a decoded chunk exceeding 1 MiB even within the encoded length bound", async () => {
    const api = caller();
    const { uploadId } = await api.beginMediaUpload({ fileName: "a.jpg", contentType: "image/jpeg", size: 2 * CHUNK });
    await expect(api.uploadMediaChunk({ uploadId, chunkIndex: 0, fileData: Buffer.alloc(CHUNK + 1).toString("base64") })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
  it("enforces full chunks, sequential indexes, exact final bytes and hash-identical retries", async () => {
    const bytes = Buffer.alloc(CHUNK + jpeg.length);
    jpeg.copy(bytes);
    const api = caller();
    const { uploadId } = await api.beginMediaUpload({ fileName: "a.jpg", contentType: "image/jpeg", size: bytes.length });
    const first = bytes.subarray(0, CHUNK).toString("base64");
    const second = bytes.subarray(CHUNK).toString("base64");
    await expect(api.uploadMediaChunk({ uploadId, chunkIndex: 1, fileData: second })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(api.uploadMediaChunk({ uploadId, chunkIndex: 0, fileData: "YQ==" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(await api.uploadMediaChunk({ uploadId, chunkIndex: 0, fileData: first })).toEqual({ receivedBytes: CHUNK });
    expect(await api.uploadMediaChunk({ uploadId, chunkIndex: 0, fileData: first })).toEqual({ receivedBytes: CHUNK });
    const conflict = Buffer.from(bytes.subarray(0, CHUNK)); conflict[100] ^= 1;
    await expect(api.uploadMediaChunk({ uploadId, chunkIndex: 0, fileData: conflict.toString("base64") })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(api.finishMediaUpload({ uploadId })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(api.uploadMediaChunk({ uploadId, chunkIndex: 1, fileData: Buffer.alloc(jpeg.length + 1).toString("base64") })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(await api.uploadMediaChunk({ uploadId, chunkIndex: 1, fileData: second })).toEqual({ receivedBytes: bytes.length });
    expect(await api.uploadMediaChunk({ uploadId, chunkIndex: 0, fileData: first })).toEqual({ receivedBytes: bytes.length });
    await expect(api.uploadMediaChunk({ uploadId, chunkIndex: 2, fileData: "YQ==" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await api.finishMediaUpload({ uploadId });
    expect(storedBytes[0]).toEqual(bytes);
  });
  it.each([-1, 0.5, 250])("rejects invalid chunk index %s", async chunkIndex => {
    const { api, uploadId } = await upload(jpeg);
    await expect(api.uploadMediaChunk({ uploadId, chunkIndex, fileData: jpeg.toString("base64") })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
  it("permits genuine bearer capabilities across mobile network changes but rejects unknown tokens/paths", async () => {
    const { uploadId } = await upload(jpeg);
    await expect(caller("192.0.2.2").finishMediaUpload({ uploadId: "f".repeat(64) })).rejects.toMatchObject({ code: "NOT_FOUND" });
    await expect(caller().finishMediaUpload({ uploadId: "../../etc/passwd" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(await caller("192.0.2.2").finishMediaUpload({ uploadId })).toHaveProperty("url");
    expect(await caller("192.0.2.2").cancelMediaUpload({ uploadId })).toEqual({ success: true });
    await expect(caller().finishMediaUpload({ uploadId })).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
  it("continues chunks after WiFi-to-mobile change while reservations remain with original client", async () => {
    const origin = caller("192.0.2.1");
    const mobile = caller("198.51.100.1");
    const { uploadId } = await origin.beginMediaUpload({ fileName: "a.jpg", contentType: "", size: jpeg.length });
    expect(await mobile.uploadMediaChunk({ uploadId, chunkIndex: 0, fileData: jpeg.toString("base64") })).toEqual({ receivedBytes: jpeg.length });
    await expect(mobile.finishMediaUpload({ uploadId })).resolves.toHaveProperty("url");
  });
});

describe("resource budgets and expiry", () => {
  it("enforces 500 MiB reserved per client and frees cancelled reservations", async () => {
    const api = caller();
    const input = { fileName: "a.mp4", contentType: "video/mp4", size: 250 * MIB };
    const first = await api.beginMediaUpload(input);
    await api.beginMediaUpload(input);
    await expect(api.beginMediaUpload({ ...input, size: 1 })).rejects.toMatchObject({ code: "TOO_MANY_REQUESTS" });
    await api.cancelMediaUpload({ uploadId: first.uploadId });
    await expect(api.beginMediaUpload(input)).resolves.toHaveProperty("uploadId");
  });
  it("limits active files to 20 per client", async () => {
    const api = caller();
    for (let i = 0; i < 20; i++) await api.beginMediaUpload({ fileName: "a.jpg", contentType: "", size: 1 });
    await expect(api.beginMediaUpload({ fileName: "a.jpg", contentType: "", size: 1 })).rejects.toMatchObject({ code: "TOO_MANY_REQUESTS" });
  });
  it("enforces 2 GiB globally across clients before allocating more spools", async () => {
    for (let i = 0; i < 8; i++) await caller(`192.0.2.${i + 1}`).beginMediaUpload({ fileName: "a.mp4", contentType: "", size: 250 * MIB });
    await caller("192.0.2.20").beginMediaUpload({ fileName: "a.jpg", contentType: "", size: 48 * MIB });
    await expect(caller("192.0.2.21").beginMediaUpload({ fileName: "a.jpg", contentType: "", size: 1 })).rejects.toMatchObject({ code: "TOO_MANY_REQUESTS" });
  });
  it("enforces 64 active globally even for concurrent begin calls", async () => {
    await Promise.all(Array.from({ length: 64 }, (_, i) => caller(`192.0.2.${i + 1}`).beginMediaUpload({ fileName: "a.jpg", contentType: "", size: 1 })));
    await expect(caller("192.0.2.100").beginMediaUpload({ fileName: "a.jpg", contentType: "", size: 1 })).rejects.toMatchObject({ code: "TOO_MANY_REQUESTS" });
  });
  it("limits begin attempts to 40/30 minutes even when each upload is cancelled", async () => {
    const api = caller();
    for (let i = 0; i < 40; i++) {
      const begun = await api.beginMediaUpload({ fileName: "a.jpg", contentType: "", size: 1 });
      await api.cancelMediaUpload({ uploadId: begun.uploadId });
    }
    await expect(api.beginMediaUpload({ fileName: "a.jpg", contentType: "", size: 1 })).rejects.toMatchObject({ code: "TOO_MANY_REQUESTS" });
    now += TTL;
    await expect(api.beginMediaUpload({ fileName: "a.jpg", contentType: "", size: 1 })).resolves.toHaveProperty("uploadId");
  });
  it("accounts by Cloudflare IP when present, without expanding the site rate limiter", async () => {
    const a = caller("127.0.0.1", "198.51.100.1");
    const b = caller("127.0.0.1", "198.51.100.2");
    const input = { fileName: "a.mp4", contentType: "", size: 250 * MIB };
    await a.beginMediaUpload(input); await a.beginMediaUpload(input);
    await expect(a.beginMediaUpload(input)).rejects.toMatchObject({ code: "TOO_MANY_REQUESTS" });
    await expect(b.beginMediaUpload(input)).resolves.toHaveProperty("uploadId");
  });
  it("expires inactive partial uploads after 30 minutes and releases budgets", async () => {
    const api = caller();
    const begun = await api.beginMediaUpload({ fileName: "a.mp4", contentType: "", size: 250 * MIB });
    now += TTL;
    await cleanupExpiredEnquiryMediaUploads();
    await expect(api.finishMediaUpload({ uploadId: begun.uploadId })).rejects.toMatchObject({ code: "NOT_FOUND" });
    expect(await api.cancelMediaUpload({ uploadId: begun.uploadId })).toEqual({ success: true });
    await expect(api.beginMediaUpload({ fileName: "a.mp4", contentType: "", size: 250 * MIB })).resolves.toHaveProperty("uploadId");
  });
  it("refreshes inactivity TTL on accepted new and identical duplicate chunks, not invalid chunks", async () => {
    const api = caller();
    const { uploadId } = await api.beginMediaUpload({ fileName: "a.jpg", contentType: "", size: jpeg.length });
    const chunk = { uploadId, chunkIndex: 0, fileData: jpeg.toString("base64") };
    now += TTL - 1;
    await api.uploadMediaChunk(chunk);
    now += TTL - 1;
    await api.uploadMediaChunk(chunk);
    now += TTL - 1;
    await expect(api.uploadMediaChunk({ ...chunk, fileData: Buffer.alloc(jpeg.length).toString("base64") })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    now++;
    await expect(api.finishMediaUpload({ uploadId })).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
  it("creates exclusive private spools with restrictive permissions and no user paths", async () => {
    const before = new Set(await privateSpools());
    const api = caller();
    const begun = await api.beginMediaUpload({ fileName: "../../private-site.jpg", contentType: "", size: jpeg.length });
    const added = (await privateSpools()).filter(path => !before.has(path));
    expect(added).toHaveLength(1);
    expect((await lstat(added[0])).mode & 0o777).toBe(0o700);
    const path = join(added[0], "original");
    expect((await lstat(path)).mode & 0o777).toBe(0o600);
    expect((await lstat(path)).size).toBe(0);
    await api.cancelMediaUpload({ uploadId: begun.uploadId });
    await expect(lstat(added[0])).rejects.toMatchObject({ code: "ENOENT" });
  });
  it("sweeps expired restart orphans only under its private prefix, not fresh directories or symlinks", async () => {
    const stale = await mkdtemp(join(tmpdir(), privatePrefix));
    const fresh = await mkdtemp(join(tmpdir(), privatePrefix));
    const foreign = await mkdtemp(join(tmpdir(), "other-app-media-"));
    const link = join(tmpdir(), `${privatePrefix}symlink-${Math.random()}`);
    await writeFile(join(stale, "original"), jpeg);
    await writeFile(join(foreign, "keep"), "safe");
    await symlink(foreign, link);
    await utimes(stale, new Date(now - TTL - 1000), new Date(now - TTL - 1000));
    await utimes(fresh, new Date(now), new Date(now));
    now += 60_001;
    await cleanupExpiredEnquiryMediaUploads();
    await expect(lstat(stale)).rejects.toMatchObject({ code: "ENOENT" });
    expect((await lstat(fresh)).isDirectory()).toBe(true);
    expect(await readFile(join(foreign, "keep"), "utf8")).toBe("safe");
    expect((await lstat(link)).isSymbolicLink()).toBe(true);
    await Promise.all([rm(fresh, { recursive: true, force: true }), rm(foreign, { recursive: true, force: true }), rm(link)]);
  });
});

describe("storage failure isolation and idempotent finalization", () => {
  it("redacts upstream errors, retains the good spool and retries with the same key", async () => {
    storageMock.mockRejectedValueOnce(new Error("secret-token private-site.jpg upstream body"));
    const { api, uploadId } = await upload(jpeg);
    await expect(api.finishMediaUpload({ uploadId })).rejects.toMatchObject({ code: "INTERNAL_SERVER_ERROR", message: "We could not save this attachment just now. Please retry the upload.", cause: undefined });
    const result = await api.finishMediaUpload({ uploadId });
    expect(storageMock).toHaveBeenCalledTimes(2);
    expect(storageMock.mock.calls[0][0]).toBe(storageMock.mock.calls[1][0]);
    expect(await api.finishMediaUpload({ uploadId })).toEqual(result);
    expect(storageMock).toHaveBeenCalledTimes(2);
  });
  it.each(["javascript:alert(1)", "data:text/html,a", "//evil.test/x", "https:/evil.test", "https://", "https://user:pass@files.test/x", "https://files.test/x\n", "https://files.test/%0a", "https://files.test/%xx", "/manus-storage/../evil", "/manus-storage/%2e%2e/evil", "/manus-storage/", "/manus-storage/a\\evil", "https://files.test/" + "a".repeat(512), undefined, 42])("rejects unsafe/malformed storage URL %j but keeps spool retryable", async url => {
    storageMock.mockImplementationOnce(async (key: string) => ({ key, url }));
    const { api, uploadId } = await upload(jpeg);
    await expect(api.finishMediaUpload({ uploadId })).rejects.toMatchObject({ code: "INTERNAL_SERVER_ERROR" });
    await expect(api.finishMediaUpload({ uploadId })).resolves.toHaveProperty("url");
    expect(storageMock).toHaveBeenCalledTimes(2);
  });
  it.each(["https://files.test/a.jpg?signature=good", "http://files.test/a.jpg", "/manus-storage/survey-attachments/a.jpg"])("accepts valid storage URL %s", async url => {
    storageMock.mockImplementationOnce(async (key: string) => ({ key, url }));
    const { api, uploadId } = await upload(jpeg);
    expect((await api.finishMediaUpload({ uploadId })).url).toBe(url.startsWith("/") ? `https://commercialshotblasting.co.uk${url}` : url);
  });
  it("passes a bounded abort signal, releases the finalization slot on timeout and retains retryable spool", async () => {
    const timeout = vi.spyOn(AbortSignal, "timeout").mockImplementation(() => AbortSignal.abort(new Error("timed out secret upstream")));
    storageMock.mockImplementationOnce(async (_key: string, _blob: Blob, _type: string, options: { signal: AbortSignal }) => {
      options.signal.throwIfAborted();
      throw new Error("expected abort");
    });
    const { api, uploadId } = await upload(jpeg);
    await expect(api.finishMediaUpload({ uploadId })).rejects.toMatchObject({ code: "INTERNAL_SERVER_ERROR", cause: undefined });
    expect(timeout).toHaveBeenCalledWith(180_000);
    timeout.mockRestore();
    await expect(api.finishMediaUpload({ uploadId })).resolves.toHaveProperty("url");
  });
  it("rejects a storage key mismatch and retries the same private key", async () => {
    storageMock.mockResolvedValueOnce({ key: "different", url: "https://files.test/a.jpg" });
    const { api, uploadId } = await upload(jpeg);
    await expect(api.finishMediaUpload({ uploadId })).rejects.toMatchObject({ code: "INTERNAL_SERVER_ERROR" });
    await expect(api.finishMediaUpload({ uploadId })).resolves.toHaveProperty("key");
  });
  it("retains successful result for 30 minutes without retaining the disk spool", async () => {
    const before = new Set(await privateSpools());
    const { api, uploadId } = await upload(jpeg);
    const result = await api.finishMediaUpload({ uploadId });
    expect((await privateSpools()).filter(path => !before.has(path))).toHaveLength(0);
    now += TTL - 1;
    expect(await api.finishMediaUpload({ uploadId })).toEqual(result);
    expect(storageMock).toHaveBeenCalledTimes(1);
    now++;
    await expect(api.finishMediaUpload({ uploadId })).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
  it("serializes duplicate simultaneous chunks without double writing", async () => {
    const api = caller();
    const { uploadId } = await api.beginMediaUpload({ fileName: "a.jpg", contentType: "", size: jpeg.length });
    const input = { uploadId, chunkIndex: 0, fileData: jpeg.toString("base64") };
    const result = await Promise.all([api.uploadMediaChunk(input), api.uploadMediaChunk(input)]);
    expect(result).toEqual([{ receivedBytes: jpeg.length }, { receivedBytes: jpeg.length }]);
    await api.finishMediaUpload({ uploadId });
    expect(storedBytes[0]).toEqual(jpeg);
  });
  it("serializes duplicate finish calls and invokes storage only once", async () => {
    const gate = deferred<{ key: string; url: string }>();
    storageMock.mockImplementationOnce(() => gate.promise);
    const { api, uploadId } = await upload(jpeg);
    const first = api.finishMediaUpload({ uploadId });
    await waitForCalls(1);
    const second = api.finishMediaUpload({ uploadId });
    gate.resolve({ key: storageMock.mock.calls[0][0], url: "https://files.test/a.jpg" });
    expect(await first).toEqual(await second);
    expect(storageMock).toHaveBeenCalledTimes(1);
  });
  it("limits storage finalization to two, with a retryable third upload", async () => {
    const gates = [deferred<{ key: string; url: string }>(), deferred<{ key: string; url: string }>()];
    storageMock.mockImplementationOnce(() => gates[0].promise).mockImplementationOnce(() => gates[1].promise);
    const uploads = await Promise.all([upload(jpeg), upload(jpeg), upload(jpeg)]);
    const first = uploads[0].api.finishMediaUpload({ uploadId: uploads[0].uploadId });
    const second = uploads[1].api.finishMediaUpload({ uploadId: uploads[1].uploadId });
    await waitForCalls(2);
    await expect(uploads[2].api.finishMediaUpload({ uploadId: uploads[2].uploadId })).rejects.toMatchObject({ code: "TOO_MANY_REQUESTS" });
    gates.forEach((gate, i) => gate.resolve({ key: storageMock.mock.calls[i][0], url: `https://files.test/${i}.jpg` }));
    await Promise.all([first, second]);
    await expect(uploads[2].api.finishMediaUpload({ uploadId: uploads[2].uploadId })).resolves.toHaveProperty("url");
  });
  it("waits for in-flight finalization before cancellation unlinks the Blob source", async () => {
    const gate = deferred<void>();
    storageMock.mockImplementationOnce(async (key: string, blob: Blob) => {
      await gate.promise;
      expect(Buffer.from(await blob.arrayBuffer())).toEqual(jpeg);
      return { key, url: "https://files.test/a.jpg" };
    });
    const { api, uploadId } = await upload(jpeg);
    const finish = api.finishMediaUpload({ uploadId });
    await waitForCalls(1);
    const cancel = api.cancelMediaUpload({ uploadId });
    gate.resolve();
    await expect(finish).resolves.toHaveProperty("url");
    expect(await cancel).toEqual({ success: true });
    await expect(api.finishMediaUpload({ uploadId })).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
  it("does not expire/unlink a file under in-flight storage IO", async () => {
    const gate = deferred<void>();
    storageMock.mockImplementationOnce(async (key: string, blob: Blob) => {
      await gate.promise;
      expect(Buffer.from(await blob.arrayBuffer())).toEqual(jpeg);
      return { key, url: "https://files.test/a.jpg" };
    });
    const { api, uploadId } = await upload(jpeg);
    const finish = api.finishMediaUpload({ uploadId });
    await waitForCalls(1);
    now += TTL + 1;
    await cleanupExpiredEnquiryMediaUploads();
    gate.resolve();
    const result = await finish;
    expect(await api.finishMediaUpload({ uploadId })).toEqual(result);
  });
});
