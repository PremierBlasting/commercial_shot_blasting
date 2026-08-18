import { describe, expect, it } from "vitest";
import { CANONICAL_SERVICE_SLUGS, getCanonicalServicePath, normaliseServiceUrls } from "../shared/serviceSeoCatalog";
import { getLocationSitemapTier, shouldIncludeLocationInSitemap } from "../shared/locationSeoTiers";
import { normaliseResponseTimeCopy } from "../shared/seoContentPolicy";
import { getProjectsForCounty } from "../client/src/data/recentProjects";

describe("SEO priority safeguards", () => {
  it("uses only live canonical service paths and redirects historic aliases", () => {
    expect(CANONICAL_SERVICE_SLUGS).toContain("structural-steel-frames");
    expect(getCanonicalServicePath("structural-steel-shot-blasting")).toBe("/services/structural-steel-frames");
    expect(normaliseServiceUrls('<a href="/services/floor-shot-blasting">Floor</a>')).toContain("/services/floor-preparation");
  });

  it("keeps response copy prompt without a fixed 24-hour promise", () => {
    const legacy = "We typically respond to enquiries within 24 hours and can usually schedule site visits in Leeds within 2-5 working days. For urgent projects, we can often accommodate faster response times.";
    const normalised = normaliseResponseTimeCopy(legacy);
    expect(normalised).toContain("We'll get back to you promptly.");
    expect(normalised).not.toMatch(/24 hours/i);
  });

  it("marks major commercial centres as Tier A while retaining the wider evidence-led catalogue", () => {
    expect(getLocationSitemapTier("birmingham")).toBe("A");
    expect(getLocationSitemapTier("truro")).toBe("B");
    expect(shouldIncludeLocationInSitemap("birmingham")).toBe(true);
    expect(shouldIncludeLocationInSitemap("truro")).toBe(true);
  });

  it("never pads local project examples with an unrelated county", () => {
    const projects = getProjectsForCounty("cornwall", 3);
    expect(projects.every((project) => project.countySlugs.includes("cornwall"))).toBe(true);
  });
});
