import { describe, expect, it } from "vitest";
import { locationSlugIndex } from "../client/src/data/locationSlugIndex";
import { countyData } from "../client/src/data/countyData";
import { countyLastModified, locationLastModified } from "../shared/sitemapLastModified";
import { buildSitemap } from "./sitemap";

describe("dynamic full-site sitemap", () => {
  it("includes every current service-area and county hub URL", async () => {
    const xml = await buildSitemap();

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain('</urlset>');

    for (const slug of ["manchester", "truro", "maidstone", "woking", "bournemouth", "newton-abbot"]) {
      expect(xml).toContain(`https://commercialshotblasting.co.uk/service-areas/${slug}`);
    }
    for (const slug of ["greater-manchester", "kent", "devon", "merseyside", "dorset", "essex"]) {
      expect(xml).toContain(`https://commercialshotblasting.co.uk/counties/${slug}`);
    }

    const serviceAreaUrlCount = (xml.match(/https:\/\/commercialshotblasting\.co\.uk\/service-areas\//g) || []).length;
    expect(serviceAreaUrlCount).toBe(Object.keys(locationSlugIndex).length);
    expect(Object.keys(countyData).length).toBeGreaterThan(40);
  });

  it("includes core canonical pages alongside the full areas catalogue", async () => {
    const xml = await buildSitemap();
    for (const path of ["/", "/contact", "/site-survey", "/counties", "/service-areas", "/privacy-policy", "/blog"]) {
      expect(xml).toContain(`https://commercialshotblasting.co.uk${path}`);
    }
  });

  it("uses generated content dates for service areas and county hubs", async () => {
    const xml = await buildSitemap();
    expect(Object.keys(locationLastModified)).toHaveLength(Object.keys(locationSlugIndex).length);
    expect(Object.keys(countyLastModified)).toHaveLength(Object.keys(countyData).length);
    expect(xml).toContain(
      `<loc>https://commercialshotblasting.co.uk/service-areas/truro</loc>\n    <lastmod>${locationLastModified.truro}</lastmod>`,
    );
    expect(xml).toContain(
      `<loc>https://commercialshotblasting.co.uk/counties/kent</loc>\n    <lastmod>${countyLastModified.kent}</lastmod>`,
    );
  });
});
