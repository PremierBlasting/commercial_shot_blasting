import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { injectMetaTags } from "./metaTags";

const baseHtml = `<!doctype html><html><head><title>Commercial Shot Blasting</title><meta name="description" content="Initial description" /><meta property="og:title" content="Initial title" /><meta property="og:description" content="Initial description" /><meta property="og:url" content="https://commercialshotblasting.co.uk/" /><meta property="og:image" content="https://commercialshotblasting.co.uk/placeholder.jpg" /></head><body><!--SSR_CONTENT--></body></html>`;
const projectRoot = resolve(import.meta.dirname, "..");

describe("Bromsgrove School spiral staircase case study", () => {
  it("renders canonical evidence-led crawler content and project-video schema", async () => {
    const html = await injectMetaTags(baseHtml, "/case-studies/bromsgrove-school-staircase");

    expect(html).toContain('<link rel="canonical" href="https://commercialshotblasting.co.uk/case-studies/bromsgrove-school-staircase"');
    expect(html).toContain("Bromsgrove School: External Spiral Staircase Restoration");
    expect(html).toContain("flaking paint and rust-affected areas");
    expect(html).toContain("black anti-slip paint on the steps");
    expect(html).toContain("bromsgrove-school-staircase-before_96c645cd.mp4");
    expect(html).toContain("VideoObject");
    expect(html).toContain("BreadcrumbList");
    expect(html).toContain("/external-staircases");
    expect(html).toContain("Request A Site Visit");
  });

  it("uses the supplied before-and-after media and registers all discovery paths", () => {
    const app = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
    const page = readFileSync(resolve(projectRoot, "client/src/pages/BromsgroveSchoolCaseStudy.tsx"), "utf8");
    const comparison = readFileSync(resolve(projectRoot, "client/src/components/BeforeAfterProjectSlider.tsx"), "utf8");
    const externalStaircases = readFileSync(resolve(projectRoot, "client/src/pages/ExternalStaircasesPage.tsx"), "utf8");
    const work = readFileSync(resolve(projectRoot, "client/src/pages/OurWork.tsx"), "utf8");
    const xmlSitemap = readFileSync(resolve(projectRoot, "server/sitemap.ts"), "utf8");
    const htmlSitemap = readFileSync(resolve(projectRoot, "client/src/pages/SitemapPage.tsx"), "utf8");

    expect(app).toContain('path={"/case-studies/bromsgrove-school-staircase"}');
    expect(page).toContain("bromsgrove-school-staircase-before_96c645cd.mp4");
    expect(page).toContain("bromsgrove-school-staircase-before-definitive-2026-09-14_dca201c9.png");
    expect(page).toContain("bromsgrove-school-before-video-still-01-2026-09-14_8c21d250.jpg");
    expect(page).not.toContain("bromsgrove-staircase-before-01_9ba57d63.jpg");
    expect(page).toContain("bromsgrove-staircase-after_ae521dcd.png");
    expect(page).toContain("Watch before footage");
    expect(page).toContain("BeforeAfterProjectSlider");
    expect(page).toContain('aspectRatio="portrait"');
    expect(page).toContain("bromsgrove-before-video-progress");
    expect(page).toContain("Play before footage");
    expect(page).toContain("Pause before footage");
    expect(page).toContain("Mute before footage");
    expect(page).toContain("Replay");
    expect(page).not.toContain("autoPlay controls");
    expect(comparison).toContain('aspectRatio?: "landscape" | "portrait"');
    expect(comparison).toContain("View full-screen comparison");
    expect(comparison).toContain(">After</span>");
    expect(comparison).toContain(">Before</span>");
    expect(page).toContain("black anti-slip paint to the steps");
    expect(page).toContain("Request A Site Visit");
    expect(externalStaircases).toContain('href="/case-studies/bromsgrove-school-staircase"');
    expect(externalStaircases).toContain("Bromsgrove School external spiral staircase restoration");
    expect(externalStaircases).toContain("bromsgrove-staircase-after_ae521dcd.png");
    expect(work).toContain('/case-studies/bromsgrove-school-staircase');
    expect(work).toContain('selectedCategory === "Staircases"');
    expect(work).toContain("displayedProjectCount");
    expect(work).toContain("View case study");
    expect(work).toContain("External spiral staircase restoration");
    expect(xmlSitemap).toContain('{ loc: "/case-studies/bromsgrove-school-staircase"');
    expect(htmlSitemap).toContain('{ href: "/case-studies/bromsgrove-school-staircase"');
  });
});
