import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { injectMetaTags } from "./metaTags";

const projectRoot = resolve(import.meta.dirname, "..");
const baseHtml = `<!doctype html><html><head><title>Commercial Shot Blasting</title><meta name="description" content="Initial description" /><meta property="og:title" content="Initial title" /><meta property="og:description" content="Initial description" /><meta property="og:url" content="https://commercialshotblasting.co.uk/" /><meta property="og:image" content="https://commercialshotblasting.co.uk/placeholder.jpg" /></head><body><!--SSR_CONTENT--></body></html>`;
const canonicalPath = "/case-studies/iss-property-former-bakkavor-foods-facility-wigan";

describe("ISS Property Former Bakkavor Foods Facility Wigan case study", () => {
  it("renders canonical, evidence-led crawler content with matching structured data", async () => {
    const html = await injectMetaTags(baseHtml, canonicalPath);

    expect(html).toContain(`<link rel="canonical" href="https://commercialshotblasting.co.uk${canonicalPath}"`);
    expect(html).toContain("ISS Property — Former Bakkavor Foods Facility, Wigan");
    expect(html).toContain("£40,000");
    expect(html).toContain("150 hours");
    expect(html).toContain("Sa 2.5 surface finish");
    expect(html).toContain("intumescent fire-protection coating");
    expect(html).toContain("completed in 10 days, five days ahead of programme");
    expect(html).toContain("iss-property-former-bakkavor-wigan-before-2026-09-15_a00636db.png");
    expect(html).toContain("iss-property-former-bakkavor-wigan-after-2026-09-15_21aa25d4.png");
    expect(html).toContain("BreadcrumbList");
    expect(html).toContain("Article");
    expect(html).toContain("Request A Site Visit");
  });

  it("uses the supplied before-and-after images, shared site navigation, full-screen viewing, and updated discovery paths", () => {
    const page = readFileSync(resolve(projectRoot, "client/src/pages/StructuralSteelCaseStudy.tsx"), "utf8");
    const app = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
    const server = readFileSync(resolve(projectRoot, "server/_core/index.ts"), "utf8");
    const sitemap = readFileSync(resolve(projectRoot, "server/sitemap.ts"), "utf8");
    const htmlSitemap = readFileSync(resolve(projectRoot, "client/src/pages/SitemapPage.tsx"), "utf8");
    const homepage = readFileSync(resolve(projectRoot, "client/src/components/CaseStudies.tsx"), "utf8");
    const work = readFileSync(resolve(projectRoot, "client/src/pages/OurWork.tsx"), "utf8");
    const serviceDetail = readFileSync(resolve(projectRoot, "client/src/pages/ServiceDetail.tsx"), "utf8");
    const fabrications = readFileSync(resolve(projectRoot, "client/src/pages/SteelFabricationsPage.tsx"), "utf8");

    expect(page).toContain('import { Header } from "@/components/Header"');
    expect(page).toContain('import { Footer } from "@/components/Footer"');
    expect(page).toContain("ISS Property — Former Bakkavor Foods Facility");
    expect(page).toContain("iss-property-former-bakkavor-wigan-before-2026-09-15_a00636db.png");
    expect(page).toContain("iss-property-former-bakkavor-wigan-after-2026-09-15_21aa25d4.png");
    expect(page).toContain("BeforeAfterProjectSlider");
    expect(page).toContain("Close full-screen image gallery");
    expect(page).toContain("Request A Site Visit");
    expect(page).toContain("hero_video_15s_4219ca94.mp4");
    expect(page).toContain("hero_video_30s_83819d35.mp4");
    expect(page).toContain("IMG_3365_56728af1.webp");
    expect(page).toContain("IMG_3366_af09464b.webp");
    expect(page).toContain("The complete previously published project image collection.");
    expect(page).toContain("supporting images");
    expect(page).toContain("legacyGalleryGroups.reduce");
    expect(page).toContain("Native playback controls available");
    expect(page).toContain("flex min-h-32 flex-col items-center justify-center");
    expect(page).toContain("text-center last:border-r-0");
    expect(page).toContain('href="#before-after-comparison"');
    expect(page).toContain('id="before-after-comparison"');
    expect(page).toContain("Compare before &amp; after");
    expect(page).toContain("onClick={scrollToComparison}");
    expect(page).toContain('window.matchMedia("(prefers-reduced-motion: reduce)")');
    expect(page).toContain('scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" })');
    expect(page).toContain("target.focus({ preventScroll: true })");
    expect(page).toContain("Delivery timeline");
    expect(page).toContain("The approved Wigan project stages, kept in sequence.");
    expect(page).toContain("Site survey & measure");
    expect(page).toContain("Prepare to Sa 2.5");
    expect(page).toContain("Complete the programme");
    expect(page).toContain("Building2");
    expect(page).toContain("MapPin");
    expect(page).toContain("Banknote");
    expect(app).toContain(`path={"${canonicalPath}"}`);
    expect(app).toContain('window.location.replace("/case-studies/iss-property-former-bakkavor-foods-facility-wigan")');
    expect(server).toContain('app.get("/case-studies/structural-steel"');
    expect(server).toContain('res.redirect(301, "/case-studies/iss-property-former-bakkavor-foods-facility-wigan")');
    expect(sitemap).toContain('{ loc: "/case-studies/iss-property-former-bakkavor-foods-facility-wigan"');
    expect(sitemap).not.toContain('{ loc: "/case-studies/structural-steel"');
    expect(htmlSitemap).toContain('{ href: "/case-studies/iss-property-former-bakkavor-foods-facility-wigan"');
    expect(homepage).toContain('href="/case-studies/iss-property-former-bakkavor-foods-facility-wigan"');
    expect(work).toContain('href="/case-studies/iss-property-former-bakkavor-foods-facility-wigan"');
    expect(serviceDetail).toContain('href="/case-studies/iss-property-former-bakkavor-foods-facility-wigan"');
    expect(fabrications).toContain('href: "/case-studies/iss-property-former-bakkavor-foods-facility-wigan"');
  });
});
