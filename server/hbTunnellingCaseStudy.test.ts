import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { injectMetaTags } from "./metaTags";

const baseHtml = `<!doctype html><html><head><title>Commercial Shot Blasting</title><meta name="description" content="Initial description" /><meta property="og:title" content="Initial title" /><meta property="og:description" content="Initial description" /><meta property="og:url" content="https://commercialshotblasting.co.uk/" /><meta property="og:image" content="https://commercialshotblasting.co.uk/placeholder.jpg" /></head><body><!--SSR_CONTENT--></body></html>`;
const projectRoot = resolve(import.meta.dirname, "..");

describe("HB Tunnelling Doncaster campaign case study", () => {
  it("renders a canonical, video-led, evidence-based case-study page for crawlers", async () => {
    const html = await injectMetaTags(baseHtml, "/case-studies/hb-tunnelling-doncaster");

    expect(html).toContain('<link rel="canonical" href="https://commercialshotblasting.co.uk/case-studies/hb-tunnelling-doncaster"');
    expect(html).toContain("HB Tunnelling Doncaster: Warehouse Steelwork Refurbishment");
    expect(html).toContain("£150,000");
    expect(html).toContain("six-week programme");
    expect(html).toContain("primed immediately after blasting");
    expect(html).toContain("VideoObject");
    expect(html).toContain("BreadcrumbList");
    expect(html).toContain("hb-tunnelling-doncaster-surface-preparation_0f209a96.mp4");
    expect(html).toContain("wa.me/447970566409");
  });

  it("uses approved video-derived assets, campaign CTAs, and discoverable site pathways", () => {
    const app = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
    const page = readFileSync(resolve(projectRoot, "client/src/pages/HBTunnellingCaseStudy.tsx"), "utf8");
    const work = readFileSync(resolve(projectRoot, "client/src/pages/OurWork.tsx"), "utf8");
    const xmlSitemap = readFileSync(resolve(projectRoot, "server/sitemap.ts"), "utf8");
    const htmlSitemap = readFileSync(resolve(projectRoot, "client/src/pages/SitemapPage.tsx"), "utf8");

    expect(app).toContain('path={"/case-studies/hb-tunnelling-doncaster"}');
    expect(page).toContain("hb-tunnelling-doncaster-surface-preparation_0f209a96.mp4");
    expect(page).toContain("hb-tunnelling-video-still-01_a5275ae9.webp");
    expect(page).toContain("hb-tunnelling-video-still-25_e27be683.webp");
    expect(page).toContain("Request A Site Visit");
    expect(page).toContain("wa.me/447970566409");
    expect(page).not.toContain("Screenshot2026-08-28");
    expect(page).not.toContain("The supplied project record");
    expect(page).not.toContain("Supplied footage");
    expect(page).toContain("Need a steelwork refurbishment plan that fits your programme?");
    expect(work).toContain('/case-studies/hb-tunnelling-doncaster');
    expect(xmlSitemap).toContain('{ loc: "/case-studies/hb-tunnelling-doncaster"');
    expect(htmlSitemap).toContain('{ href: "/case-studies/hb-tunnelling-doncaster"');
  });
});
