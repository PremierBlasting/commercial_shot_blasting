import { describe, expect, it } from "vitest";
import { injectMetaTags } from "./metaTags";
import { locationSlugIndex } from "../client/src/data/locationSlugIndex";
import {
  INDEXABLE_EVIDENCE_LOCATION_SLUGS,
  LOCATION_ALIAS_SLUGS,
  TIER_A_LOCATION_SLUGS,
  getLocationRobotsDirective,
  getLocationSitemapTier,
  shouldIncludeLocationInSitemap,
} from "../shared/locationSeoTiers";

const baseHtml = `<!doctype html><html><head>
  <title>Commercial Shot Blasting</title>
  <meta name="description" content="Default description" />
  <link rel="canonical" href="https://commercialshotblasting.co.uk/" />
</head><body><!--SSR_CONTENT--></body></html>`;

describe("local page indexability tier", () => {
  it("keeps major commercial centres and named local proof pages indexable", () => {
    for (const slug of ["birmingham", "wigan", "bromsgrove"]) {
      expect(shouldIncludeLocationInSitemap(slug), slug).toBe(true);
      expect(getLocationRobotsDirective(slug), slug).toMatch(/^index, follow/);
    }
    expect(getLocationSitemapTier("birmingham")).toBe("A");
    expect(getLocationSitemapTier("wigan")).toBe("B");
  });

  it("separates one redirect alias from 65 canonical targets and the same 699 held towns", () => {
    expect(TIER_A_LOCATION_SLUGS.size).toBe(52);
    expect(INDEXABLE_EVIDENCE_LOCATION_SLUGS.size).toBe(13);
    expect([...LOCATION_ALIAS_SLUGS]).toEqual(["stoke"]);
    expect(getLocationSitemapTier("stoke")).toBe("alias");
    expect(shouldIncludeLocationInSitemap("stoke")).toBe(false);
    expect(INDEXABLE_EVIDENCE_LOCATION_SLUGS.has("stoke")).toBe(false);
    const counts = Object.keys(locationSlugIndex).reduce((result, slug) => {
      result[getLocationSitemapTier(slug)]++;
      return result;
    }, { A: 0, B: 0, alias: 0, noindex: 0 });
    expect(counts).toEqual({ A: 52, B: 13, alias: 1, noindex: 699 });
  });

  it("keeps every evidence-tier sitemap target in the canonical local catalogue", () => {
    for (const slug of INDEXABLE_EVIDENCE_LOCATION_SLUGS) {
      expect(locationSlugIndex[slug], slug).toBeDefined();
    }
  });

  it("keeps the wider visitor catalogue live but removes generic templates from index targets", () => {
    expect(shouldIncludeLocationInSitemap("truro")).toBe(false);
    expect(getLocationSitemapTier("truro")).toBe("noindex");
    expect(getLocationRobotsDirective("truro")).toMatch(/^noindex, follow/);
  });

  it("emits matching robots directives in server-rendered local HTML", async () => {
    const [tierA, evidence, catalogue] = await Promise.all([
      injectMetaTags(baseHtml, "/service-areas/birmingham"),
      injectMetaTags(baseHtml, "/service-areas/wigan"),
      injectMetaTags(baseHtml, "/service-areas/truro"),
    ]);

    expect(tierA).toContain('<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />');
    expect(evidence).toContain('<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />');
    expect(catalogue).toContain('<meta name="robots" content="noindex, follow, max-image-preview:large, max-snippet:-1" />');
    expect(catalogue).toContain('https://commercialshotblasting.co.uk/service-areas/truro');
  });
});
