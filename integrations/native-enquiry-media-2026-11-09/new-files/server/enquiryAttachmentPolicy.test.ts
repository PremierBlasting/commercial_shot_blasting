import { describe, expect, it } from "vitest";
import {
  ENQUIRY_ATTACHMENT_ACCEPT,
  ENQUIRY_CHUNK_BYTES,
  ENQUIRY_MEDIA_FORMATS,
  MAX_ENQUIRY_FILES,
  MAX_ENQUIRY_TOTAL_BYTES,
  MAX_PHOTO_BYTES,
  MAX_VIDEO_BYTES,
  MIB,
  attachmentSelectionError,
  enquiryAttachmentLimit,
  enquiryMediaFormat,
  selectEnquiryAttachments,
} from "../shared/enquiryAttachments";

// Metadata only: large limits do not allocate or read customer files.
const file = (name: string, size = 1, type = "", lastModified = 1) => ({
  name, size, type, lastModified,
});

const originalFormats = [
  ["JPG", "photo", "image/jpeg"],
  ["JPEG", "photo", "image/jpeg"],
  ["jpe", "photo", "image/jpeg"],
  ["jfif", "photo", "image/jpeg"],
  ["png", "photo", "image/png"],
  ["apng", "photo", "image/png"],
  ["HEIC", "photo", "image/heic"],
  ["HEIF", "photo", "image/heif"],
  ["hif", "photo", "image/heif"],
  ["AVIF", "photo", "image/avif"],
  ["tif", "photo", "image/tiff"],
  ["TIFF", "photo", "image/tiff"],
  ["GIF", "photo", "image/gif"],
  ["BMP", "photo", "image/bmp"],
  ["dib", "photo", "image/bmp"],
  ["WebP", "photo", "image/webp"],
  ["jxl", "photo", "image/jxl"],
  ["jp2", "photo", "image/jp2"],
  ["CR2", "photo", "image/x-canon-cr2"],
  ["cr3", "photo", "image/x-canon-cr3"],
  ["DNG", "photo", "image/x-adobe-dng"],
  ["nef", "photo", "image/x-nikon-nef"],
  ["arw", "photo", "image/x-sony-arw"],
  ["orf", "photo", "image/x-olympus-orf"],
  ["rw2", "photo", "image/x-panasonic-rw2"],
  ["raf", "photo", "image/x-fujifilm-raf"],
  ["raw", "photo", "image/x-raw"],
  ["MOV", "video", "video/quicktime"],
  ["qt", "video", "video/quicktime"],
  ["MP4", "video", "video/mp4"],
  ["M4V", "video", "video/mp4"],
  ["AVI", "video", "video/x-msvideo"],
  ["WebM", "video", "video/webm"],
  ["mkv", "video", "video/x-matroska"],
  ["mpg", "video", "video/mpeg"],
  ["mpeg", "video", "video/mpeg"],
  ["mpe", "video", "video/mpeg"],
  ["m2v", "video", "video/mpeg"],
  ["3gp", "video", "video/3gpp"],
  ["3g2", "video", "video/3gpp2"],
  ["wmv", "video", "video/x-ms-wmv"],
  ["asf", "video", "video/x-ms-wmv"],
  ["mts", "video", "video/mp2t"],
  ["m2ts", "video", "video/mp2t"],
  ["ts", "video", "video/mp2t"],
  ["flv", "video", "video/x-flv"],
  ["PDF", "document", "application/pdf"],
] as const;

describe("enquiry attachment original-file policy", () => {
  it("sets binary MiB limits and one-MiB chunks", () => {
    expect(MIB).toBe(1024 * 1024);
    expect(MAX_PHOTO_BYTES).toBe(100 * MIB);
    expect(MAX_VIDEO_BYTES).toBe(250 * MIB);
    expect(MAX_ENQUIRY_TOTAL_BYTES).toBe(500 * MIB);
    expect(MAX_ENQUIRY_FILES).toBe(20);
    expect(ENQUIRY_CHUNK_BYTES).toBe(MIB);
  });

  it.each(originalFormats)("accepts original .%s files with blank browser MIME", (extension, kind, mime) => {
    const original = file(`original.${extension}`, 123);
    expect(enquiryMediaFormat(original)).toMatchObject({ kind, mime });
    expect(attachmentSelectionError(original)).toBeUndefined();
    const result = selectEnquiryAttachments([], [original]);
    expect(result.errors).toEqual([]);
    expect(result.files).toHaveLength(1);
    expect(result.files[0]).toBe(original);
  });

  it.each([
    [" IMAGE/JPG ", "image/jpeg"],
    ["image/pjpeg", "image/jpeg"],
    ["image/x-png", "image/png"],
    ["video/x-m4v", "video/mp4"],
    ["video/avi", "video/x-msvideo"],
    ["image/x-ms-bmp", "image/bmp"],
    ["image/heic-sequence", "image/heic"],
    ["image/heif-sequence", "image/heif"],
    ["video/x-mpeg", "video/mpeg"],
    ["IMAGE/JPEG; charset=binary", "image/jpeg"],
  ])("normalizes extensionless MIME alias %s to %s", (type, mime) => {
    const original = file("original", 12, type);
    expect(enquiryMediaFormat(original)?.mime).toBe(mime);
    expect(attachmentSelectionError(original)).toBeUndefined();
  });

  it.each(["", "application/octet-stream", "binary/octet-stream"])("uses filename fallback for MIME '%s'", type => {
    expect(enquiryMediaFormat(file("camera.original.HEIC", 1, type)))
      .toMatchObject({ kind: "photo", mime: "image/heic" });
    expect(enquiryMediaFormat(file("camera.original.MOV", 1, type)))
      .toMatchObject({ kind: "video", mime: "video/quicktime" });
  });

  it.each([
    ["photo.jpg", "image/jpeg", 100 * MIB],
    ["camera.dng", "", 100 * MIB],
    ["document.pdf", "application/pdf", 100 * MIB],
    ["video.mov", "video/quicktime", 250 * MIB],
  ])("accepts exactly the cap and rejects one extra byte for %s", (name, type, cap) => {
    const atCap = file(name, cap, type);
    const overCap = file(name, cap + 1, type);
    expect(enquiryAttachmentLimit(enquiryMediaFormat(atCap)!)).toBe(cap);
    expect(attachmentSelectionError(atCap)).toBeUndefined();
    expect(attachmentSelectionError(overCap)).toEqual(expect.any(String));
    const result = selectEnquiryAttachments([], [overCap, atCap]);
    expect(result.files).toEqual([atCap]);
    expect(result.errors).toHaveLength(1);
  });

  it("rejects zero-byte files while retaining the next valid original", () => {
    const empty = file("empty.jpg", 0);
    const valid = file("original.heic", 1);
    expect(attachmentSelectionError(empty)).toMatch(/empty/i);
    expect(selectEnquiryAttachments([], [empty, valid])).toEqual({
      files: [valid], errors: [attachmentSelectionError(empty)],
    });
  });

  it("accepts 160-character names and rejects 161-character names", () => {
    const valid = file(`${"a".repeat(156)}.jpg`);
    const invalid = file(`${"a".repeat(157)}.jpg`);
    expect(valid.name).toHaveLength(160);
    expect(invalid.name).toHaveLength(161);
    expect(attachmentSelectionError(valid)).toBeUndefined();
    expect(attachmentSelectionError(invalid)).toMatch(/160/);
    expect(selectEnquiryAttachments([], [invalid, valid]).files).toEqual([valid]);
  });

  it.each([
    ["vector.svg", "image/svg+xml"],
    ["page.html", "text/html"],
    ["page.htm", "text/html"],
    ["program.exe", "application/x-msdownload"],
    ["script.js", "text/javascript"],
    ["installer.msi", "application/octet-stream"],
    ["archive.zip", "application/zip"],
    ["photo.jpg.exe", "image/jpeg"],
    ["image.svg", "image/jpeg"],
    ["page.html", "image/jpeg"],
    ["no-extension", "image/svg+xml"],
    ["unknown", ""],
  ])("excludes active or unsupported file %s even with misleading MIME", (name, type) => {
    const invalid = file(name, 10, type);
    expect(enquiryMediaFormat(invalid)).toBeUndefined();
    expect(attachmentSelectionError(invalid)).toMatch(/not supported/);
    expect(selectEnquiryAttachments([], [invalid]).files).toEqual([]);
  });

  it("lists each supported extension/MIME in the picker without active wildcard types", () => {
    const accepted = ENQUIRY_ATTACHMENT_ACCEPT.split(",");
    expect(new Set(accepted).size).toBe(accepted.length);
    for (const format of ENQUIRY_MEDIA_FORMATS) {
      expect(accepted).toContain(format.mime);
      for (const extension of format.extensions) expect(accepted).toContain(`.${extension}`);
    }
    for (const excluded of [".svg", "image/svg+xml", ".html", "text/html", ".exe", "image/*", "video/*"]) {
      expect(accepted).not.toContain(excluded);
    }
  });

  it("retains valid mixed-batch files in order, without cloning or mutating originals", () => {
    const existing = Object.freeze([Object.freeze(file("retained.pdf", 10))]);
    const photo = Object.freeze(file("camera.HEIC", 11));
    const video = Object.freeze(file("clip.MOV", 12));
    const rejected = file("page.html", 13, "text/html");
    const incoming = Object.freeze([photo, rejected, video]);
    const result = selectEnquiryAttachments(existing, incoming);
    expect(result.files).toEqual([existing[0], photo, video]);
    expect(result.files[0]).toBe(existing[0]);
    expect(result.files[1]).toBe(photo);
    expect(result.files[2]).toBe(video);
    expect(result.errors).toEqual([attachmentSelectionError(rejected)]);
    expect(existing).toHaveLength(1);
    expect(incoming).toHaveLength(3);
  });

  it("accepts exactly 20 files and rejects the 21st without dropping existing selections", () => {
    const incoming = Array.from({ length: 21 }, (_, index) => file(`photo-${index}.jpg`));
    const result = selectEnquiryAttachments([], incoming);
    expect(result.files).toEqual(incoming.slice(0, 20));
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain(incoming[20].name);
    expect(selectEnquiryAttachments(incoming.slice(0, 19), incoming.slice(19)).files)
      .toEqual(incoming.slice(0, 20));
  });

  it("accepts exactly 500 MiB total and rejects one extra byte", () => {
    const first = file("first.mov", 250 * MIB);
    const second = file("second.mp4", 250 * MIB);
    const excess = file("excess.jpg", 1);
    const result = selectEnquiryAttachments([first], [second, excess]);
    expect(result.files).toEqual([first, second]);
    expect(result.files.reduce((sum, selected) => sum + selected.size, 0)).toBe(500 * MIB);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain(excess.name);
  });

  it("skips an over-total file but continues accepting smaller valid files", () => {
    const existing = [file("one.mov", 250 * MIB), file("two.mov", 249 * MIB)];
    const oversizedBatchMember = file("too-large.jpg", MIB + 1);
    const fitting = file("fits.jpg", MIB);
    const result = selectEnquiryAttachments(existing, [oversizedBatchMember, fitting]);
    expect(result.files).toEqual([...existing, fitting]);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain(oversizedBatchMember.name);
  });

  it("deduplicates matching name/size/lastModified across existing and incoming files", () => {
    const original = file("original.jpg", 100, "image/jpeg", 10);
    const same = { ...original, type: "" };
    const otherSize = { ...original, size: 101 };
    const otherTime = { ...original, lastModified: 11 };
    const otherName = { ...original, name: "different.jpg" };
    const result = selectEnquiryAttachments([original], [same, same, otherSize, otherTime, otherName]);
    expect(result.errors).toEqual([]);
    expect(result.files).toEqual([original, otherSize, otherTime, otherName]);
    expect(result.files[0]).toBe(original);
    expect(selectEnquiryAttachments([], [original, same]).files).toEqual([original]);
  });

  it("silently skips duplicates before the count and total caps", () => {
    const fullCount = Array.from({ length: 20 }, (_, index) => file(`${index}.jpg`));
    expect(selectEnquiryAttachments(fullCount, [{ ...fullCount[0] }]))
      .toEqual({ files: fullCount, errors: [] });
    const fullTotal = [file("one.mov", 250 * MIB), file("two.mov", 250 * MIB)];
    expect(selectEnquiryAttachments(fullTotal, [{ ...fullTotal[1] }]))
      .toEqual({ files: fullTotal, errors: [] });
  });
});
