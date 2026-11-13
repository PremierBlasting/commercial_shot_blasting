import { beforeEach, describe, expect, it, vi } from "vitest";
import { locationSlugIndex } from "../client/src/data/locationSlugIndex";
import { countyData } from "../client/src/data/countyData";
import { countyLastModified, locationLastModified } from "../shared/sitemapLastModified";
import { buildCountySitemap, buildMainSitemap, buildServiceAreaSitemap, buildSitemapIndex } from "./sitemap";
import { CANONICAL_SERVICE_SLUGS, LEGACY_SERVICE_REDIRECTS } from "../shared/serviceSeoCatalog";
import { shouldIncludeLocationInSitemap } from "../shared/locationSeoTiers";

const db = vi.hoisted(() => ({ getPublishedBlogPosts: vi.fn(), getActiveGalleryItems: vi.fn() }));
vi.mock("./db", () => db);
beforeEach(() => {
  db.getActiveGalleryItems.mockResolvedValue([]);
  db.getPublishedBlogPosts.mockResolvedValue([]);
});
const locations = (xml: string) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

describe("dynamic sitemap index and child sitemaps", () => {
  it("lists exactly the five current runtime children without invented child dates", () => {
    const xml = buildSitemapIndex();
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(locations(xml)).toEqual(["sitemap-main.xml", "sitemap-counties.xml", "sitemap-service-areas.xml", "sitemap-blog.xml", "sitemap-images.xml"].map((child) => `https://commercialshotblasting.co.uk/${child}`));
    expect(xml).not.toContain("<lastmod>");
  });
  it("keeps 65 unique canonical towns and all 43 counties in distinct children", () => {
    const serviceAreas = buildServiceAreaSitemap();
    const counties = buildCountySitemap();
    const townUrls = locations(serviceAreas);
    const countyUrls = locations(counties);
    expect(townUrls).toHaveLength(65);
    expect(new Set(townUrls).size).toBe(65);
    expect(townUrls).toEqual(Object.keys(locationSlugIndex).filter(shouldIncludeLocationInSitemap).map((slug) => `https://commercialshotblasting.co.uk/service-areas/${slug}`));
    expect(townUrls.filter((url) => url.endsWith("/stoke-on-trent"))).toHaveLength(1);
    for (const slug of ["stoke", "truro", "newton-abbot"]) {
      expect(townUrls).not.toContain(`https://commercialshotblasting.co.uk/service-areas/${slug}`);
    }
    expect(countyUrls).toHaveLength(43);
    expect(countyUrls).toEqual(Object.keys(countyData).map((slug) => `https://commercialshotblasting.co.uk/counties/${slug}`));
    expect(serviceAreas).not.toContain("/counties/");
    expect(counties).not.toContain("/service-areas/");
  });
  it("keeps current core canonical membership while excluding noindex and redirect pages", async () => {
    const xml = await buildMainSitemap();
    const urls = locations(xml);
    expect(urls).toHaveLength(81);
    for (const path of ["/", "/contact", "/site-survey", "/counties", "/service-areas", "/blog", "/preparation-cleanup", "/case-studies/iss-property-former-bakkavor-foods-facility-wigan", "/case-studies/ade-power-wakefield-marine-cx-enclosures", "/steel-fabrication-surface-preparation", "/steel-chimney-process-stack-surface-preparation", "/industrial-steelwork-restoration", "/factory-cladding-restoration", "/process-pipework-spools-surface-preparation"]) {
      expect(urls).toContain(`https://commercialshotblasting.co.uk${path}`);
    }
    for (const path of ["/privacy-policy", "/terms-of-service", "/admin", "/call-analytics", "/case-studies/fire-escape-multi-storey-office", "/case-studies/structural-steel", "/preparation-and-cleanup", "/prep-and-cleanup", "/survey", "/api", "/manus-storage"]) {
      expect(urls).not.toContain(`https://commercialshotblasting.co.uk${path}`);
    }
    expect(xml).not.toContain("<lastmod>");
    expect(db.getActiveGalleryItems).toHaveBeenCalledOnce();
    expect(db.getPublishedBlogPosts).not.toHaveBeenCalled();
  });
  it("lists only canonical live service URLs", async () => {
    const urls = locations(await buildMainSitemap());
    for (const slug of CANONICAL_SERVICE_SLUGS) {
      expect(urls).toContain(`https://commercialshotblasting.co.uk/services/${slug}`);
    }
    for (const legacySlug of Object.keys(LEGACY_SERVICE_REDIRECTS)) {
      expect(urls).not.toContain(`https://commercialshotblasting.co.uk/services/${legacySlug}`);
    }
  });
  it("preserves source-date provenance without treating it as verified latest significant page change", () => {
    expect(Object.keys(locationLastModified)).toHaveLength(Object.keys(locationSlugIndex).length);
    expect(Object.keys(countyLastModified)).toHaveLength(Object.keys(countyData).length);
    expect(locationLastModified.wigan).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(countyLastModified.kent).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(buildServiceAreaSitemap()).not.toContain("<lastmod>");
    expect(buildCountySitemap()).not.toContain("<lastmod>");
  });
});
