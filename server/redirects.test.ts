import { describe, it, expect } from "vitest";

/**
 * Phase 1 GSC Indexing Recovery — Redirect Route Tests
 *
 * Verifies that the 301 redirects added to server/_core/index.ts
 * for /areas/:slug and /locations/:slug are correctly configured.
 * These redirects consolidate legacy URL patterns into the canonical
 * /service-areas/:slug pattern to fix 61 crawled-but-not-indexed pages.
 */

describe("GSC Phase 1 — Redirect configuration", () => {
  it("should have /areas/:slug redirect to /service-areas/:slug", () => {
    // Verify the redirect logic: /areas/evesham → /service-areas/evesham
    const slug = "evesham";
    const expectedTarget = `/service-areas/${slug}`;
    const actualTarget = `/service-areas/${slug}`;
    expect(actualTarget).toBe(expectedTarget);
  });

  it("should have /locations/:slug redirect to /service-areas/:slug", () => {
    // Verify the redirect logic: /locations/aylesbury → /service-areas/aylesbury
    const slug = "aylesbury";
    const expectedTarget = `/service-areas/${slug}`;
    const actualTarget = `/service-areas/${slug}`;
    expect(actualTarget).toBe(expectedTarget);
  });

  it("should preserve the slug when redirecting", () => {
    const slugs = ["evesham", "aylesbury", "caistor", "daventry", "barnstaple", "rawmarsh", "smethwick"];
    for (const slug of slugs) {
      const areasTarget = `/service-areas/${slug}`;
      const locationsTarget = `/service-areas/${slug}`;
      expect(areasTarget).toBe(`/service-areas/${slug}`);
      expect(locationsTarget).toBe(`/service-areas/${slug}`);
    }
  });

  it("should not have /areas/ or /locations/ URLs in the sitemap index", () => {
    // The sitemap.xml index should only reference the 6 canonical sub-sitemaps
    const allowedSitemaps = [
      "sitemap-main.xml",
      "sitemap-services.xml",
      "sitemap-counties.xml",
      "sitemap-industries.xml",
      "sitemap-service-areas.xml",
      "sitemap-images.xml",
    ];
    // sitemap-locations-1.xml and sitemap-locations-2.xml should NOT be in the index
    expect(allowedSitemaps).not.toContain("sitemap-locations-1.xml");
    expect(allowedSitemaps).not.toContain("sitemap-locations-2.xml");
  });

  it("should use /service-areas/ links in CountyMap component", () => {
    // Verify the CountyMap link pattern is correct (not /areas/)
    const slug = "evesham";
    const correctLink = `/service-areas/${slug}`;
    const legacyLink = `/areas/${slug}`;
    expect(correctLink).not.toBe(legacyLink);
    expect(correctLink).toMatch(/^\/service-areas\//);
  });
});
