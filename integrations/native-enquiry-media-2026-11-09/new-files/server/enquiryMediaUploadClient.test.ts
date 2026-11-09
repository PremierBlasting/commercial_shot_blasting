import { Blob as NodeBlob, File as NodeFile } from "node:buffer";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  boundedUploadCall,
  readEnquiryChunk,
  uploadEnquiryFile,
  type EnquiryMediaUploadApi,
  type EnquiryUploadProgress,
  type UploadedEnquiryMedia,
} from "../client/src/lib/enquiryMediaUpload";
import { ENQUIRY_CHUNK_BYTES, MIB } from "../shared/enquiryAttachments";

const UPLOAD_ID = "synthetic-upload-id";
const completed: UploadedEnquiryMedia = {
  fileName: "original.MOV",
  key: "enquiry-media/synthetic-original.mov",
  url: "https://files.example.invalid/enquiry-media/synthetic-original.mov?token=synthetic",
};

function originalFile(name = "original.MOV", bytes = new Uint8Array([0, 1, 128, 255]), type = ""): File {
  return new NodeFile([bytes], name, { type, lastModified: 1 }) as unknown as File;
}

function mockApi() {
  const receivedChunks = new Map<number, number>();
  return {
    begin: vi.fn<EnquiryMediaUploadApi["begin"]>().mockResolvedValue({ uploadId: UPLOAD_ID, chunkSize: ENQUIRY_CHUNK_BYTES }),
    chunk: vi.fn<EnquiryMediaUploadApi["chunk"]>().mockImplementation(async ({ chunkIndex, fileData }) => {
      receivedChunks.set(chunkIndex, Buffer.from(fileData, "base64").byteLength);
      return { receivedBytes: Array.from(receivedChunks.values()).reduce((sum, bytes) => sum + bytes, 0) };
    }),
    finish: vi.fn<EnquiryMediaUploadApi["finish"]>().mockResolvedValue(completed),
    cancel: vi.fn<EnquiryMediaUploadApi["cancel"]>().mockResolvedValue({ cancelled: true }),
  };
}

function httpError(status: number, code?: string): Error {
  return Object.assign(new Error(`Synthetic HTTP ${status}`), { data: { httpStatus: status, code } });
}

beforeEach(() => {
  // Force Node's binary fallback; every transport boundary is a local mock.
  vi.stubGlobal("FileReader", undefined);
  vi.stubGlobal("fetch", vi.fn(() => { throw new Error("Real network must not be used in upload helper tests"); }));
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("enquiry original-file chunk upload client", () => {
  it("sends one MiB followed by the remainder sequentially, preserving every original byte and the exact finished link", async () => {
    const bytes = Uint8Array.from({ length: MIB + 37 }, (_, index) => index % 256);
    const file = originalFile("original.MOV", bytes);
    const wholeFileRead = vi.spyOn(file, "arrayBuffer");
    const slice = vi.spyOn(file, "slice");
    const api = mockApi();
    const progress = vi.fn<(value: EnquiryUploadProgress) => void>();
    const callOrder: string[] = [];
    let releaseFirst!: (value: { receivedBytes: number }) => void;
    const firstChunk = new Promise<{ receivedBytes: number }>(resolve => { releaseFirst = resolve; });
    api.chunk.mockImplementation(async ({ chunkIndex }) => {
      callOrder.push(`chunk-${chunkIndex}`);
      return chunkIndex === 0 ? firstChunk : { receivedBytes: file.size };
    });
    api.finish.mockImplementation(async () => {
      callOrder.push("finish");
      return completed;
    });

    const upload = uploadEnquiryFile(file, api, progress);
    await vi.waitFor(() => expect(api.chunk).toHaveBeenCalledTimes(1));
    expect(api.finish).not.toHaveBeenCalled();
    expect(slice).toHaveBeenCalledTimes(1);
    expect(progress.mock.calls.map(([value]) => value)).toEqual([
      { sentBytes: 0, totalBytes: bytes.length, phase: "uploading" },
    ]);
    releaseFirst({ receivedBytes: MIB });
    expect(await upload).toBe(completed);

    expect(api.begin.mock.calls).toEqual([[{
      fileName: "original.MOV", contentType: "video/quicktime", size: bytes.length,
    }]]);
    expect(api.chunk).toHaveBeenCalledTimes(2);
    const chunks = api.chunk.mock.calls.map(([input]) => input);
    expect(chunks.map(({ uploadId, chunkIndex }) => ({ uploadId, chunkIndex }))).toEqual([
      { uploadId: UPLOAD_ID, chunkIndex: 0 }, { uploadId: UPLOAD_ID, chunkIndex: 1 },
    ]);
    const decoded = chunks.map(({ fileData }) => Buffer.from(fileData, "base64"));
    expect(decoded.map(chunk => chunk.length)).toEqual([MIB, 37]);
    expect(Buffer.concat(decoded).equals(Buffer.from(bytes))).toBe(true);
    expect(slice.mock.calls).toEqual([[0, MIB], [MIB, bytes.length]]);
    expect(wholeFileRead).not.toHaveBeenCalled();
    expect(callOrder).toEqual(["chunk-0", "chunk-1", "finish"]);
    expect(progress.mock.calls.map(([value]) => value)).toEqual([
      { sentBytes: 0, totalBytes: bytes.length, phase: "uploading" },
      { sentBytes: MIB, totalBytes: bytes.length, phase: "uploading" },
      { sentBytes: bytes.length, totalBytes: bytes.length, phase: "uploading" },
      { sentBytes: bytes.length, totalBytes: bytes.length, phase: "finishing" },
    ]);
    expect(api.finish.mock.calls).toEqual([[{ uploadId: UPLOAD_ID }]]);
    expect(api.cancel).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each([
    ["original.HEIC", "", "image/heic"],
    ["original.DNG", "application/octet-stream", "image/x-adobe-dng"],
    ["original.M4V", "video/x-m4v", "video/mp4"],
    ["original.JPEG", "image/pjpeg", "image/jpeg"],
    ["original.TIFF", "", "image/tiff"],
    ["original.pdf", "application/pdf", "application/pdf"],
  ])("begins %s with canonical MIME and sends the original, never a resized/transcoded derivative", async (name, type, contentType) => {
    const bytes = new Uint8Array([0, 255, 216, 254, 1, 128, 99]);
    const file = originalFile(name, bytes, type);
    const api = mockApi();
    const result = { ...completed, fileName: name };
    api.finish.mockResolvedValue(result);
    expect(await uploadEnquiryFile(file, api, vi.fn())).toBe(result);
    expect(api.begin.mock.calls).toEqual([[{ fileName: name, contentType, size: bytes.length }]]);
    expect(api.chunk).toHaveBeenCalledTimes(1);
    expect(Buffer.from(api.chunk.mock.calls[0][0].fileData, "base64").equals(Buffer.from(bytes))).toBe(true);
    expect(api.finish).toHaveBeenCalledTimes(1);
    expect(api.cancel).not.toHaveBeenCalled();
  });

  it("does not send an extra chunk when the file is exactly one MiB", async () => {
    const api = mockApi();
    const file = originalFile("exact.mp4", new Uint8Array(MIB));
    await uploadEnquiryFile(file, api, vi.fn());
    expect(api.chunk).toHaveBeenCalledTimes(1);
    expect(Buffer.from(api.chunk.mock.calls[0][0].fileData, "base64")).toHaveLength(MIB);
    expect(api.finish).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["empty.jpg", 0],
    ["vector.svg", 1],
    ["page.html", 1],
    ["program.exe", 1],
    [`${"x".repeat(157)}.jpg`, 1],
  ])("rejects invalid %s before starting or reading any upload", async (name, size) => {
    const file = originalFile(name, new Uint8Array(size));
    const read = vi.spyOn(file, "slice");
    const api = mockApi();
    const progress = vi.fn();
    await expect(uploadEnquiryFile(file, api, progress)).rejects.toThrow();
    expect(api.begin).not.toHaveBeenCalled();
    expect(api.chunk).not.toHaveBeenCalled();
    expect(api.finish).not.toHaveBeenCalled();
    expect(api.cancel).not.toHaveBeenCalled();
    expect(read).not.toHaveBeenCalled();
    expect(progress).not.toHaveBeenCalled();
  });

  it.each([500, 502, 503, 408, 429])("retries transient HTTP %s chunk errors without resubmitting the file or duplicating progress", async status => {
    vi.useFakeTimers();
    const api = mockApi();
    api.chunk.mockRejectedValueOnce(httpError(status));
    const file = originalFile();
    const progress = vi.fn();
    const upload = uploadEnquiryFile(file, api, progress);
    await vi.advanceTimersByTimeAsync(500);
    expect(await upload).toBe(completed);
    expect(api.begin).toHaveBeenCalledTimes(1);
    expect(api.chunk).toHaveBeenCalledTimes(2);
    expect(api.chunk.mock.calls[0][0]).toEqual(api.chunk.mock.calls[1][0]);
    expect(api.finish).toHaveBeenCalledTimes(1);
    expect(api.cancel).not.toHaveBeenCalled();
    expect(progress.mock.calls.map(([value]) => value)).toEqual([
      { sentBytes: 0, totalBytes: file.size, phase: "uploading" },
      { sentBytes: file.size, totalBytes: file.size, phase: "uploading" },
      { sentBytes: file.size, totalBytes: file.size, phase: "finishing" },
    ]);
    expect(vi.getTimerCount()).toBe(0);
  });

  it.each([
    new Error("Synthetic network interruption"),
    httpError(409, "CONFLICT"),
  ])("retries network and explicit conflict errors", async error => {
    vi.useFakeTimers();
    const api = mockApi();
    api.chunk.mockRejectedValueOnce(error);
    const upload = uploadEnquiryFile(originalFile(), api, vi.fn());
    await vi.advanceTimersByTimeAsync(500);
    expect(await upload).toBe(completed);
    expect(api.chunk).toHaveBeenCalledTimes(2);
    expect(api.chunk.mock.calls[1][0]).toEqual(api.chunk.mock.calls[0][0]);
    expect(api.begin).toHaveBeenCalledTimes(1);
    expect(api.finish).toHaveBeenCalledTimes(1);
  });

  it("uses the same chunk index/data after an acknowledgement is lost, so an idempotent receiver gets one original", async () => {
    vi.useFakeTimers();
    const bytes = new Uint8Array([0, 128, 255, 1]);
    const file = originalFile("original.heic", bytes);
    const api = mockApi();
    const stored = new Map<number, Buffer>();
    let lostAcknowledgement = true;
    api.chunk.mockImplementation(async ({ chunkIndex, fileData }) => {
      stored.set(chunkIndex, Buffer.from(fileData, "base64"));
      if (lostAcknowledgement) {
        lostAcknowledgement = false;
        throw new Error("Synthetic lost acknowledgement after storing the chunk");
      }
      return { receivedBytes: file.size };
    });
    const upload = uploadEnquiryFile(file, api, vi.fn());
    await vi.advanceTimersByTimeAsync(500);
    await upload;
    expect(stored.size).toBe(1);
    expect(stored.get(0)!.equals(Buffer.from(bytes))).toBe(true);
    expect(api.chunk.mock.calls[1][0]).toEqual(api.chunk.mock.calls[0][0]);
    expect(api.begin).toHaveBeenCalledTimes(1);
    expect(api.finish).toHaveBeenCalledTimes(1);
  });

  it.each([400, 401, 403, 404, 413, 415, 422])("does not retry non-transient HTTP %s and cancels the started upload", async status => {
    vi.useFakeTimers();
    const api = mockApi();
    api.chunk.mockRejectedValue(httpError(status));
    await expect(uploadEnquiryFile(originalFile(), api, vi.fn())).rejects.toThrow(
      status === 413 ? /connection rejected/ : /Synthetic HTTP/,
    );
    expect(api.chunk).toHaveBeenCalledTimes(1);
    expect(api.finish).not.toHaveBeenCalled();
    expect(api.cancel.mock.calls).toEqual([[{ uploadId: UPLOAD_ID }]]);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("limits retries to three attempts with 500 ms then 1000 ms backoff", async () => {
    vi.useFakeTimers();
    const api = mockApi();
    api.chunk.mockRejectedValue(httpError(503));
    const outcome = uploadEnquiryFile(originalFile(), api, vi.fn()).catch(error => error);
    await vi.advanceTimersByTimeAsync(0);
    expect(api.chunk).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(499);
    expect(api.chunk).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1);
    expect(api.chunk).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(999);
    expect(api.chunk).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(1);
    expect((await outcome).message).toMatch(/could not upload this file just now/);
    expect(api.chunk).toHaveBeenCalledTimes(3);
    expect(api.finish).not.toHaveBeenCalled();
    expect(api.cancel.mock.calls).toEqual([[{ uploadId: UPLOAD_ID }]]);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("retries finish without reading or sending any chunks again", async () => {
    vi.useFakeTimers();
    const file = originalFile();
    const slice = vi.spyOn(file, "slice");
    const api = mockApi();
    api.finish.mockRejectedValueOnce(httpError(503));
    const progress = vi.fn();
    const upload = uploadEnquiryFile(file, api, progress);
    await vi.advanceTimersByTimeAsync(500);
    expect(await upload).toBe(completed);
    expect(api.begin).toHaveBeenCalledTimes(1);
    expect(slice).toHaveBeenCalledTimes(1);
    expect(api.chunk).toHaveBeenCalledTimes(1);
    expect(api.finish.mock.calls).toEqual([[{ uploadId: UPLOAD_ID }], [{ uploadId: UPLOAD_ID }]]);
    expect(progress.mock.calls.filter(([value]) => value.phase === "finishing")).toHaveLength(1);
    expect(api.cancel).not.toHaveBeenCalled();
  });

  it.each([400, 503])("cancels after failed finish (HTTP %s) without repeating chunk submission", async status => {
    vi.useFakeTimers();
    const api = mockApi();
    api.finish.mockRejectedValue(httpError(status));
    const outcome = uploadEnquiryFile(originalFile(), api, vi.fn()).catch(error => error);
    await vi.advanceTimersByTimeAsync(1500);
    expect(await outcome).toBeInstanceOf(Error);
    expect(api.chunk).toHaveBeenCalledTimes(1);
    expect(api.finish).toHaveBeenCalledTimes(status === 503 ? 3 : 1);
    expect(api.cancel.mock.calls).toEqual([[{ uploadId: UPLOAD_ID }]]);
  });

  it("cancels on a binary read failure without sending the unread chunk or finishing", async () => {
    const file = originalFile();
    const slice = vi.spyOn(file, "slice").mockReturnValue({
      arrayBuffer: vi.fn().mockRejectedValue(new Error("Synthetic binary read failure")),
    } as unknown as Blob);
    const api = mockApi();
    const progress = vi.fn();
    await expect(uploadEnquiryFile(file, api, progress)).rejects.toThrow("Synthetic binary read failure");
    expect(slice).toHaveBeenCalledTimes(1);
    expect(api.chunk).not.toHaveBeenCalled();
    expect(api.finish).not.toHaveBeenCalled();
    expect(api.cancel.mock.calls).toEqual([[{ uploadId: UPLOAD_ID }]]);
    expect(progress.mock.calls.map(([value]) => value)).toEqual([
      { sentBytes: 0, totalBytes: file.size, phase: "uploading" },
    ]);
  });

  it.each([
    { uploadId: "", chunkSize: MIB },
    { uploadId: UPLOAD_ID, chunkSize: MIB + 1 },
    { uploadId: UPLOAD_ID, chunkSize: 0 },
  ])("rejects invalid begin response %j before reading any bytes", async response => {
    const api = mockApi();
    api.begin.mockResolvedValue(response);
    const file = originalFile();
    const slice = vi.spyOn(file, "slice");
    await expect(uploadEnquiryFile(file, api, vi.fn())).rejects.toThrow(/could not start/);
    expect(slice).not.toHaveBeenCalled();
    expect(api.chunk).not.toHaveBeenCalled();
    expect(api.finish).not.toHaveBeenCalled();
    if (response.uploadId) expect(api.cancel.mock.calls).toEqual([[{ uploadId: response.uploadId }]]);
    else expect(api.cancel).not.toHaveBeenCalled();
  });

  it.each([0, 3, 5])("rejects incomplete or over-total chunk acknowledgement %s and cancels", async receivedBytes => {
    const api = mockApi();
    api.chunk.mockResolvedValue({ receivedBytes });
    await expect(uploadEnquiryFile(originalFile(), api, vi.fn())).rejects.toThrow(/interrupted/);
    expect(api.chunk).toHaveBeenCalledTimes(1);
    expect(api.finish).not.toHaveBeenCalled();
    expect(api.cancel.mock.calls).toEqual([[{ uploadId: UPLOAD_ID }]]);
  });

  it.each([NaN, undefined])("rejects a non-numeric chunk acknowledgement (%s) instead of finishing", async receivedBytes => {
    const api = mockApi();
    api.chunk.mockResolvedValue({ receivedBytes } as { receivedBytes: number });
    await expect(uploadEnquiryFile(originalFile(), api, vi.fn())).rejects.toThrow();
    expect(api.chunk).toHaveBeenCalledTimes(1);
    expect(api.finish).not.toHaveBeenCalled();
    expect(api.cancel.mock.calls).toEqual([[{ uploadId: UPLOAD_ID }]]);
  });

  it.each(["url", "key", "fileName"] as const)("rejects a finish response missing %s instead of returning an unusable attachment", async field => {
    const api = mockApi();
    api.finish.mockResolvedValue({ ...completed, [field]: "" });
    await expect(uploadEnquiryFile(originalFile(), api, vi.fn())).rejects.toThrow(/did not finish/);
    expect(api.finish).toHaveBeenCalledTimes(1);
    expect(api.cancel.mock.calls).toEqual([[{ uploadId: UPLOAD_ID }]]);
  });

  it("preserves the original failure even if best-effort cancellation rejects", async () => {
    const api = mockApi();
    api.chunk.mockRejectedValue(httpError(400));
    api.cancel.mockRejectedValue(new Error("Synthetic cancellation failure"));
    await expect(uploadEnquiryFile(originalFile(), api, vi.fn())).rejects.toThrow("Synthetic HTTP 400");
    expect(api.cancel).toHaveBeenCalledTimes(1);
  });

  it("bounds a stalled begin call at 60 seconds without starting chunks", async () => {
    vi.useFakeTimers();
    const api = mockApi();
    api.begin.mockImplementation(() => new Promise(() => {}));
    const outcome = uploadEnquiryFile(originalFile(), api, vi.fn()).catch(error => error);
    await vi.advanceTimersByTimeAsync(59999);
    expect(api.begin).toHaveBeenCalledTimes(1);
    expect(api.chunk).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(1);
    await vi.advanceTimersByTimeAsync(1);
    expect((await outcome).message).toMatch(/took too long/);
    expect(api.chunk).not.toHaveBeenCalled();
    expect(api.finish).not.toHaveBeenCalled();
    expect(api.cancel).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });

  it.each(["chunk", "finish"] as const)("bounds a stalled %s to three 60-second attempts then cancels", async stage => {
    vi.useFakeTimers();
    const api = mockApi();
    api[stage].mockImplementation(() => new Promise(() => {}));
    const outcome = uploadEnquiryFile(originalFile(), api, vi.fn()).catch(error => error);
    await vi.advanceTimersByTimeAsync(181500);
    expect((await outcome).message).toMatch(/took too long/);
    expect(api[stage]).toHaveBeenCalledTimes(3);
    expect(api.begin).toHaveBeenCalledTimes(1);
    if (stage === "chunk") expect(api.finish).not.toHaveBeenCalled();
    else expect(api.chunk).toHaveBeenCalledTimes(1);
    expect(api.cancel.mock.calls).toEqual([[{ uploadId: UPLOAD_ID }]]);
    expect(vi.getTimerCount()).toBe(0);
  });
});

describe("bounded upload API calls", () => {
  it("resolves the original value and removes its watchdog timer", async () => {
    vi.useFakeTimers();
    const value = { synthetic: true };
    const run = vi.fn().mockResolvedValue(value);
    expect(await boundedUploadCall(run, 25)).toBe(value);
    expect(run).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("preserves rejection and removes its watchdog timer", async () => {
    vi.useFakeTimers();
    const error = new Error("Synthetic API failure");
    await expect(boundedUploadCall(() => Promise.reject(error), 25)).rejects.toBe(error);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("rejects exactly at the configured timeout and ignores late success", async () => {
    vi.useFakeTimers();
    let resolveLate!: (value: string) => void;
    const settled = vi.fn();
    const outcome = boundedUploadCall(() => new Promise<string>(resolve => { resolveLate = resolve; }), 25)
      .then(value => { settled("resolved"); return value; }, error => { settled("rejected"); return error; });
    await vi.advanceTimersByTimeAsync(24);
    expect(settled).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect((await outcome).message).toMatch(/took too long/);
    resolveLate("too late");
    await vi.advanceTimersByTimeAsync(0);
    expect(settled.mock.calls).toEqual([["rejected"]]);
    expect(vi.getTimerCount()).toBe(0);
  });
});

describe("binary chunk reading", () => {
  it("base64-encodes Node Blob bytes losslessly without FileReader", async () => {
    const bytes = Uint8Array.from({ length: 256 }, (_, index) => index);
    const encoded = await readEnquiryChunk(new NodeBlob([bytes]) as unknown as Blob);
    expect(Buffer.from(encoded, "base64").equals(Buffer.from(bytes))).toBe(true);
    expect(encoded).not.toContain("data:");
  });

  it("uses browser FileReader when present and removes the data-URL prefix", async () => {
    vi.useFakeTimers();
    const bytes = new Uint8Array([0, 128, 255]);
    const blob = new NodeBlob([bytes]) as unknown as Blob;
    const read = vi.fn();
    class BrowserReader {
      result: string | null = null;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      onabort: (() => void) | null = null;
      abort = vi.fn();
      readAsDataURL(input: Blob) {
        read(input);
        this.result = `data:application/octet-stream;base64,${Buffer.from(bytes).toString("base64")}`;
        this.onload?.();
      }
    }
    vi.stubGlobal("FileReader", BrowserReader);
    const fallback = vi.spyOn(blob, "arrayBuffer");
    expect(Buffer.from(await readEnquiryChunk(blob), "base64").equals(Buffer.from(bytes))).toBe(true);
    expect(read.mock.calls).toEqual([[blob]]);
    expect(fallback).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });

  it.each(["error", "abort", "empty"] as const)("cancels the upload when browser reading produces %s", async mode => {
    vi.useFakeTimers();
    class FailingReader {
      result = "data:application/octet-stream;base64,";
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      onabort: (() => void) | null = null;
      abort = vi.fn();
      readAsDataURL() {
        if (mode === "error") this.onerror?.();
        else if (mode === "abort") this.onabort?.();
        else this.onload?.();
      }
    }
    vi.stubGlobal("FileReader", FailingReader);
    const api = mockApi();
    await expect(uploadEnquiryFile(originalFile(), api, vi.fn())).rejects.toThrow(/read|interrupted/i);
    expect(api.chunk).not.toHaveBeenCalled();
    expect(api.finish).not.toHaveBeenCalled();
    expect(api.cancel.mock.calls).toEqual([[{ uploadId: UPLOAD_ID }]]);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("aborts a stalled browser read after 30 seconds and cancels the upload", async () => {
    vi.useFakeTimers();
    const abort = vi.fn();
    class StalledReader {
      result = null;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      onabort: (() => void) | null = null;
      readAsDataURL() {}
      abort() { abort(); this.onabort?.(); }
    }
    vi.stubGlobal("FileReader", StalledReader);
    const api = mockApi();
    const outcome = uploadEnquiryFile(originalFile(), api, vi.fn()).catch(error => error);
    await vi.advanceTimersByTimeAsync(29999);
    expect(abort).not.toHaveBeenCalled();
    expect(api.cancel).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(await outcome).toBeInstanceOf(Error);
    expect(abort).toHaveBeenCalledTimes(1);
    expect(api.chunk).not.toHaveBeenCalled();
    expect(api.finish).not.toHaveBeenCalled();
    expect(api.cancel.mock.calls).toEqual([[{ uploadId: UPLOAD_ID }]]);
    expect(vi.getTimerCount()).toBe(0);
  });
});
