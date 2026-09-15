import { describe, expect, it } from "vitest";
import { locationSlugIndex } from "../client/src/data/locationSlugIndex";
import { countyData } from "../client/src/data/countyData";
import { countyLastModified, locationLastModified } from "../shared/sitemapLastModified";
import { buildCountySitemap, buildMainSitemap, buildServiceAreaSitemap, buildSitemapIndex } from "./sitemap";
import { CANONICAL_SERVICE_SLUGS, LEGACY_SERVICE_REDIRECTS } from "../shared/serviceSeoCatalog";

describe("dynamic sitemap index and child sitemaps", () => {
  it("lists every current child sitemap in the primary sitemap index", () => {
    const xml = buildSitemapIndex();

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    for (const child of ["sitemap-main.xml", "sitemap-counties.xml", "sitemap-service-areas.xml", "sitemap-blog.xml", "sitemap-images.xml"]) {
      expect(xml).toContain(`https://commercialshotblasting.co.uk/${child}`);
    }
    expect(xml).toContain("</sitemapindex>");
  });

  it("keeps service-area and county catalogues in their distinct child sitemaps", () => {
    const serviceAreas = buildServiceAreaSitemap();
    const counties = buildCountySitemap();

    expect(serviceAreas).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(counties).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    for (const slug of ["manchester", "truro", "maidstone", "woking", "bournemouth", "newton-abbot"]) {
      expect(serviceAreas).toContain(`https://commercialshotblasting.co.uk/service-areas/${slug}`);
    }
    for (const slug of ["greater-manchester", "kent", "devon", "merseyside", "dorset", "essex"]) {
      expect(counties).toContain(`https://commercialshotblasting.co.uk/counties/${slug}`);
    }

    const serviceAreaUrlCount = (serviceAreas.match(/https:\/\/commercialshotblasting\.co\.uk\/service-areas\//g) || []).length;
    expect(serviceAreaUrlCount).toBe(Object.keys(locationSlugIndex).length);
    expect(Object.keys(countyData).length).toBeGreaterThan(40);
    expect(serviceAreas).not.toContain("/counties/");
    expect(counties).not.toContain("/service-areas/");
  });

  it("keeps core canonical pages in the main child sitemap", async () => {
    const xml = await buildMainSitemap();
    for (const path of ["/", "/contact", "/site-survey", "/counties", "/service-areas", "/privacy-policy", "/blog", "/case-studies/iss-property-former-bakkavor-foods-facility-wigan", "/steel-fabrication-surface-preparation", "/steel-chimney-process-stack-surface-preparation", "/industrial-steelwork-restoration", "/factory-cladding-restoration", "/process-pipework-spools-surface-preparation"]) {
      expect(xml).toContain(`https://commercialshotblasting.co.uk${path}`);
    }
    expect(xml).not.toContain("https://commercialshotblasting.co.uk/case-studies/structural-steel");
  });

  it("lists only canonical live service URLs", async () => {
    const xml = await buildMainSitemap();
    for (const slug of CANONICAL_SERVICE_SLUGS) {
      expect(xml).toContain(`https://commercialshotblasting.co.uk/services/${slug}`);
    }
    for (const legacySlug of Object.keys(LEGACY_SERVICE_REDIRECTS)) {
      expect(xml).not.toContain(`https://commercialshotblasting.co.uk/services/${legacySlug}`);
    }
  });

  it("uses generated content dates for service areas and county hubs", () => {
    const serviceAreas = buildServiceAreaSitemap();
    const counties = buildCountySitemap();
    expect(Object.keys(locationLastModified)).toHaveLength(Object.keys(locationSlugIndex).length);
    expect(Object.keys(countyLastModified)).toHaveLength(Object.keys(countyData).length);
    expect(serviceAreas).toContain(
      `<loc>https://commercialshotblasting.co.uk/service-areas/truro</loc>\n    <lastmod>${locationLastModified.truro}</lastmod>`,
    );
    expect(counties).toContain(
      `<loc>https://commercialshotblasting.co.uk/counties/kent</loc>\n    <lastmod>${countyLastModified.kent}</lastmod>`,
    );
  });
});
