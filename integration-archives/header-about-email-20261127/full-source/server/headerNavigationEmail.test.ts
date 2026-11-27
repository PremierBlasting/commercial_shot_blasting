import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { restoreBeforeHeaderNavigation } from "./fixtures/headerNavigationScope";
import { campaignEmailHref } from "../client/src/lib/campaignEmailLinks";

const header = readFileSync(resolve(import.meta.dirname, "../client/src/components/Header.tsx"), "utf8");
const desktopBeforeAbout = header.slice(header.indexOf("{/* Desktop Navigation */}"), header.indexOf("{/* About dropdown"));
const desktopAbout = header.slice(header.indexOf("{/* About dropdown"), header.indexOf("</nav>"));
const mobile = header.slice(header.indexOf("{/* Mobile Menu */}"));
const mobileAbout = mobile.slice(mobile.indexOf('<div className="border-b border-white/10 py-3">\n              <Link href="/about"'));

describe("header About navigation and responsive email", () => {
  it("moves Reviews and Prep & Cleanup out of the desktop primary links into About", () => {
    for (const href of ["/reviews", "/preparation-cleanup"]) {
      expect(desktopBeforeAbout).not.toContain(`href="${href}"`);
      expect(desktopAbout).toContain(`href="${href}"`);
    }
    expect(desktopAbout).toContain("Prep &amp; Cleanup");
    expect(desktopAbout).toContain("setAboutOpen(false)");
  });

  it("puts both links under the mobile About group, retaining close-on-navigation", () => {
    const beforeAbout = mobile.slice(0, mobile.indexOf('<div className="border-b border-white/10 py-3">\n              <Link href="/about"'));
    for (const href of ["/reviews", "/preparation-cleanup"]) {
      expect(beforeAbout).not.toContain(`href="${href}"`);
      expect(mobileAbout).toContain(`href="${href}" onClick={closeMobileMenu}`);
    }
    expect(mobileAbout).toContain("min-h-11");
  });

  it("offers the supplied address in both desktop and compact headers, not only inside the opened menu", () => {
    const beforeMenu = header.slice(0, header.indexOf("{/* Mobile Menu */}"));
    expect(beforeMenu.match(/href="mailto:info@commercialshotblasting.co.uk"/g)).toHaveLength(2);
    expect(beforeMenu).toContain("hidden lg:flex flex-col");
    expect(beforeMenu).toContain("pb-2 lg:hidden");
    expect(beforeMenu).toContain('<span className="break-all">info@commercialshotblasting.co.uk</span>');
  });

  it("uses a compact menu below the full-navigation breakpoint with accessible toggle state", () => {
    expect(header).toContain('hidden xl:flex items-center gap-3 whitespace-nowrap text-sm');
    expect(header).toContain('className="xl:hidden p-2');
    expect(header).toContain('aria-expanded={mobileMenuOpen}');
    expect(header).toContain('aria-controls="header-mobile-navigation"');
    expect(header).toContain('id="header-mobile-navigation"');
  });

  it("retains established phone, quote, prefetch and remaining destinations", () => {
    expect(header).toContain("trackPhoneCall('07970566409', 'Header')");
    expect(header).toContain("trackPhoneCall('07970566409', 'Mobile Menu')");
    expect(header).toContain("trackCTAClick('Request A Site Visit', 'Header')");
    expect(header).toContain("trackCTAClick('Request A Site Visit', 'Mobile Menu')");
    for (const href of ["/services", "/industries", "/our-work", "/service-areas", "/about", "/contact", "/chas-elite", "/blog", "/glossary"]) expect(header).toContain(`href="${href}"`);
    expect(header).toContain("prefetch('/reviews')");
    expect(header).toContain("prefetch('/preparation-cleanup')");
  });

  it("keeps mailto on the existing delegated attribution pathway without automatic sends", () => {
    const href = "mailto:info@commercialshotblasting.co.uk";
    expect(campaignEmailHref(href, {}, "/")).toBe(href);
    const prepared = campaignEmailHref(href, { cv_utm_campaign: "csb-search-test", cv_utm_id: "123" }, "/");
    expect(prepared.startsWith(href)).toBe(true);
    expect(new URL(prepared).searchParams.get("body")).toContain("csb-search-test (campaign ID 123)");
    expect(header).not.toContain("trackEvent('email_click'");
  });

  it("restores the exact earlier header hash without replacing historical fixtures", () => {
    const original = restoreBeforeHeaderNavigation(header);
    expect(createHash("sha256").update(original).digest("hex")).toBe("3268def1cab5e6454d33ac290d66e5ee668e5a11b7453073411d8f18fe0b1ba0");
    expect(restoreBeforeHeaderNavigation(original)).toBe(original);
  });

  it("rejects unrelated changes or an incorrect mailbox instead of rebaselining", () => {
    for (const changed of [header + "\n// unrelated edit\n", header.replace("info@commercialshotblasting.co.uk", "wrong@example.com"), header.replace("07970566409", "07721375756")]) expect(() => restoreBeforeHeaderNavigation(changed)).toThrow();
  });
});
