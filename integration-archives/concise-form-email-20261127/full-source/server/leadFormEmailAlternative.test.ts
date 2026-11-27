import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { campaignEmailHref } from "../client/src/lib/campaignEmailLinks";
import { restoreBeforeFormEmailAlternative } from "./fixtures/formEmailAlternativeScope";

const root = resolve(import.meta.dirname, "..");
const form = readFileSync(resolve(root, "client/src/components/LeadForm.tsx"), "utf8");
const emailHref = "mailto:info@commercialshotblasting.co.uk";

describe("shared form concise uploads and email alternative", () => {
  it("removes both owner-highlighted guidance paragraphs", () => {
    expect(form).not.toContain("photos/PDFs 100 MB each");
    expect(form).not.toContain("HEIC/iPhone photos");
    expect(form).not.toContain("Originals are kept.");
    expect(form).not.toContain("Up to {MAX_ENQUIRY_FILES} files");
  });

  it("keeps the optional upload label, multiple input and actual validation", () => {
    expect(form).toContain("Add photos, videos or drawings");
    expect(form).toContain('type="file" multiple disabled={isSubmitting} accept={ENQUIRY_ATTACHMENT_ACCEPT}');
    expect(form).toContain("selectEnquiryAttachments(attachments.map(item => item.file), Array.from(incoming))");
    expect(form).toContain("removeAttachment(item.id)");
  });

  it("offers the supplied mailbox outside the optional WhatsApp branch", () => {
    const position = form.indexOf(`href="${emailHref}"`);
    expect(position).toBeGreaterThan(form.indexOf("We&apos;ll only use your details"));
    expect(position).toBeLessThan(form.indexOf("{showWhatsApp && ("));
    expect(form).toContain("<span>Email us</span>");
    expect(form).toContain('<span className="break-all">info@commercialshotblasting.co.uk</span>');
  });

  it("uses a native mailto link, not a submit button or automatic send", () => {
    const link = form.slice(form.indexOf(`<a href="${emailHref}"`), form.indexOf("{showWhatsApp && ("));
    expect(link).not.toContain("onClick");
    expect(link).not.toContain("handleSubmit");
    expect(link).toContain("focus:ring-2");
    expect(link).toContain("flex-wrap");
  });

  it("preserves every original submission, upload and tracking handler byte", () => {
    const handlers = form.slice(form.indexOf("  const contactMutation ="), form.indexOf("  const bg ="));
    expect(createHash("sha256").update(handlers).digest("hex")).toBe("1ea71ab9d9c1100ff02c463e57281abc3230d36e481488681c3a8bbde7dba86b");
  });

  it("does not weaken the five mandatory native fields", () => {
    for (const suffix of ["name", "email", "phone", "postcode"]) {
      expect(form).toMatch(new RegExp(`id=\\{\\x60\\$\\{fieldId\\}-${suffix}\\x60\\}[^>]*\\brequired\\b`));
    }
    expect(form).toMatch(/<textarea[^>]*\brequired\b/);
  });

  it("retains existing campaign-aware mailto preparation without a new recipient", () => {
    expect(campaignEmailHref(emailHref, {}, "/services/structural-steel-frames")).toBe(emailHref);
    const attributed = campaignEmailHref(emailHref, { cv_utm_campaign: "csb-search-test", cv_utm_id: "123", gclid: "never-copy-this" }, "/services/structural-steel-frames");
    expect(attributed.startsWith(emailHref)).toBe(true);
    expect(new URL(attributed).searchParams.get("body")).toContain("csb-search-test (campaign ID 123)");
    expect(attributed).not.toContain("gclid");
    expect(attributed).not.toContain("never-copy-this");
  });

  it("retains the original full-form historical hash after exact reversal", () => {
    const original = restoreBeforeFormEmailAlternative(form);
    expect(createHash("sha256").update(original).digest("hex")).toBe("21b8bd4e83f53e91fd88d0378baeeaf7e8a7d4683e9e86520883c7b9574ce960");
    expect(restoreBeforeFormEmailAlternative(original)).toBe(original);
  });

  it("rejects unauthorized edits and incorrect email targets instead of rebaselining", () => {
    for (const changed of [form + "\n// unrelated change\n", form.replace("info@commercialshotblasting.co.uk", "wrong@example.com"), form.replace("setSubmitted(true)", "setSubmitted(false)")]) {
      expect(() => restoreBeforeFormEmailAlternative(changed)).toThrow();
    }
  });
});
