import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { countyData } from "../client/src/data/countyData";

const projectRoot = resolve(__dirname, "..");

describe("sitemap navigation and consolidation", () => {
  it("keeps the visual sitemap linked from the footer and catalogue-driven", () => {
    const footer = readFileSync(resolve(projectRoot, "client/src/components/Footer.tsx"), "utf8");
    const sitemapPage = readFileSync(resolve(projectRoot, "client/src/pages/SitemapPage.tsx"), "utf8");

    expect(footer).toContain('href="/sitemap"');
    expect(footer).toContain("Object.values(countyData)");
    expect(sitemapPage).toContain("Object.values(locationData)");
    expect(sitemapPage).toContain("additionalRegions");
    expect(Object.keys(countyData).length).toBeGreaterThan(40);
  });

  it("redirects stale static page sitemaps while retaining the image sitemap", () => {
    const serverEntry = readFileSync(resolve(projectRoot, "server/_core/index.ts"), "utf8");
    expect(serverEntry).toContain('"/sitemap-main.xml", "/sitemap-service-areas.xml", "/sitemap-counties.xml"');
    expect(serverEntry).toContain('res.redirect(301, "/sitemap.xml")');
    expect(serverEntry).not.toContain('"/sitemap-images.xml"');
    expect(serverEntry).toContain("Sitemap: https://commercialshotblasting.co.uk/sitemap-images.xml");
  });

  it("regenerates content timestamps during production builds", () => {
    const packageJson = readFileSync(resolve(projectRoot, "package.json"), "utf8");
    expect(packageJson).toContain("node scripts/generate-sitemap-lastmod.mjs");
  });

  it("marks service-area breadcrumbs as the active current page", () => {
    const locationPage = readFileSync(resolve(projectRoot, "client/src/components/LocationPage.tsx"), "utf8");
    expect(locationPage).toContain("isCurrentPage: true");
    expect(locationPage).toContain("/counties/${location.countySlug}");
  });
});
