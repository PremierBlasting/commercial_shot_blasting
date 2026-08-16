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

  it("keeps timestamp generation available without requiring git in production builds", () => {
    const packageJson = JSON.parse(readFileSync(resolve(projectRoot, "package.json"), "utf8"));
    expect(packageJson.scripts["sitemap:lastmod"]).toBe("node scripts/generate-sitemap-lastmod.mjs");
    expect(packageJson.scripts.build).not.toContain("generate-sitemap-lastmod");
  });

  it("marks service-area breadcrumbs as the active current page", () => {
    const locationPage = readFileSync(resolve(projectRoot, "client/src/components/LocationPage.tsx"), "utf8");
    expect(locationPage).toContain("isCurrentPage: true");
    expect(locationPage).toContain("/counties/${location.countySlug}");
  });

  it("provides a responsive sitemap filter and an on-demand geographic coverage map", () => {
    const sitemapPage = readFileSync(resolve(projectRoot, "client/src/pages/SitemapPage.tsx"), "utf8");
    const coverageMap = readFileSync(resolve(projectRoot, "client/src/components/SitemapCoverageMap.tsx"), "utf8");

    expect(sitemapPage).toContain("SitemapCoverageMap");
    expect(sitemapPage).toContain("aria-describedby=\"sitemap-filter-status\"");
    expect(sitemapPage).toContain("const isSearching = q.length >= 1");
    expect(coverageMap).toContain("Load interactive coverage map");
    expect(coverageMap).toContain("MapView");
    expect(coverageMap).toContain("County hub markers represent every service area");
  });

  it("outputs visible and server-rendered BreadcrumbList structured data", () => {
    const breadcrumb = readFileSync(resolve(projectRoot, "client/src/components/Breadcrumb.tsx"), "utf8");
    const metaTags = readFileSync(resolve(projectRoot, "server/metaTags.ts"), "utf8");

    expect(breadcrumb).toContain('itemType="https://schema.org/BreadcrumbList"');
    expect(breadcrumb).toContain('itemProp="itemListElement"');
    expect(metaTags).toContain('"@id": `${url}#breadcrumb`');
    expect(metaTags).toContain('"inLanguage": "en-GB"');
    expect(metaTags).toContain('"@id":"${pageUrl}#breadcrumb"');
  });
});
