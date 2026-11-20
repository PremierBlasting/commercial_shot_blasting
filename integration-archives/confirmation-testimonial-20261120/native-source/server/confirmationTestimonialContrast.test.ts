import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(import.meta.dirname, "../client/src/components/HBTunnellingTestimonial.tsx"), "utf8");
const form = readFileSync(resolve(import.meta.dirname, "../client/src/components/LeadForm.tsx"), "utf8");
const confirmationClasses = source.match(/confirmation: "([^"]+)"/)?.[1];

function luminance(hex: string): number {
  const channels = hex.replace("#", "").match(/.{2}/g)!.map(value => {
    const channel = parseInt(value, 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrast(foreground: string, background: string): number {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

// Source-only tests: no lead, database, delivery or Google calls.
// Browser acceptance additionally measures the resolved Tailwind slate colours.
describe("HB Tunnelling post-enquiry testimonial contrast", () => {
  it("uses an opaque white confirmation surface, not a translucent or inherited surface", () => {
    expect(confirmationClasses).toBe("border-[#2C5F7F]/20 bg-white p-4 text-left");
    expect(confirmationClasses).not.toMatch(/bg-\[[^\]]+\]\//);
  });

  it.each(["#183c52", "#2c5f7f"])("keeps fixed text colour %s above normal-text WCAG AA on the confirmation surface", color => {
    expect(source).toContain(`text-[${color}]`);
    expect(contrast(color, "#ffffff")).toBeGreaterThanOrEqual(4.5);
  });

  it("retains explicit dark quote and company colours instead of inheriting the dark form's white text", () => {
    expect(source).toMatch(/<blockquote[^>]*text-slate-700/);
    expect(source).toContain('className="text-sm text-slate-600"');
  });

  it("does not change the service or full case-study variant surfaces or spacing", () => {
    expect(source).toContain('"case-study": "border-[#2c5f7f]/20 bg-white p-7 shadow-sm md:p-9"');
    expect(source).toContain('service: "border-[#2C5F7F]/20 bg-[#eaf3f6] p-6 md:p-8"');
    expect(source).toContain('const compact = variant === "confirmation"');
    expect(source).toContain('compact ? "h-10 w-10" : "h-16 w-16"');
  });

  it("retains the original query-fed full quote, attribution, logo and reveal", () => {
    expect(source).toContain("{testimonial.text}");
    expect(source).toContain("{testimonial.name}");
    expect(source).toContain("{testimonial.company}");
    expect(source).toContain('src="/manus-storage/hb-tunnelling-logo-official_1acf5938.png"');
    expect(source).toContain('<ScrollReveal duration={500} threshold={0.12} rootMargin="0px 0px -24px 0px">');
  });

  it("is exactly the approved one-class production change against the 20 November baseline", () => {
    const reverted = source.replace(
      'confirmation: "border-[#2C5F7F]/20 bg-white p-4 text-left"',
      'confirmation: "border-[#2C5F7F]/20 bg-[#2C5F7F]/5 p-4 text-left"',
    );
    expect(createHash("sha256").update(reverted).digest("hex"))
      .toBe("8710fd35e9fb2db09255e5e52985302f698e0fbefddf358ef422becd7a61b80c");
  });

  it("leaves the enquiry form, submission, uploader, consent and tracking code byte-identical", () => {
    expect(createHash("sha256").update(form).digest("hex"))
      .toBe("21b8bd4e83f53e91fd88d0378baeeaf7e8a7d4683e9e86520883c7b9574ce960");
    expect(form).toContain('<HBTunnellingTestimonial variant="confirmation" />');
  });
});
