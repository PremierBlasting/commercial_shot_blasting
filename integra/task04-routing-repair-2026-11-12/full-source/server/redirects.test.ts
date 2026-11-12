import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getCanonicalServicePath, getCanonicalServiceRedirectPath, getLegacyRootServiceRedirectPath, LEGACY_SERVICE_REDIRECTS, isCanonicalServiceSlug, normaliseServiceUrls } from "../shared/serviceSeoCatalog";
import { getCanonicalServiceAreaRedirect, getKnownPageRedirect } from "./seoUrlNormalisation";

vi.mock("./db", () => ({
  getPublishedBlogPosts: vi.fn(async () => []),
  getActiveGalleryItems: vi.fn(async () => []),
}));
import { buildMainSitemap, buildSitemapIndex } from "./sitemap";

const projectRoot = resolve(import.meta.dirname, "..");
const query = "?utm_source=adwords&utm_medium=ppc&utm_campaign=csb-test&utm_id=123&gclid=mock%2Bclick&gbraid=mock%2Fbraid&wbraid=mock%3Dbraid&hsa_acc=123&ref=a%20b&device=m&x=one&x=two&empty=&literal_plus=a+b";

describe("GSC redirect configuration", () => {
  it("resolves recognised historic areas and locations through the real helper", () => {
    for (const slug of ["evesham", "aylesbury", "caistor", "daventry", "barnstaple", "rawmarsh", "smethwick"]) {
      for (const prefix of ["areas", "locations"]) {
        const path = `/${prefix}/${slug}`;
        expect(getKnownPageRedirect(path, path + query)).toBe(`/service-areas/${slug}${query}`);
        expect(getKnownPageRedirect(path + "/", path + "/" + query)).toBe(`/service-areas/${slug}${query}`);
      }
    }
  });

  it("emits the current canonical sitemap children, not retired location partitions", () => {
    const xml = buildSitemapIndex();
    expect(xml).toContain("/sitemap-main.xml</loc>");
    expect(xml).toContain("/sitemap-service-areas.xml</loc>");
    expect(xml).not.toMatch(/sitemap-locations-[12]\.xml/);
    expect(xml).not.toContain("/areas/");
    expect(xml).not.toContain("/locations/");
  });

  it("keeps CountyMap town links canonical in the actual component", () => {
    const source = readFileSync(resolve(projectRoot, "client/src/components/CountyMap.tsx"), "utf8");
    expect(source).toContain("/service-areas/");
    expect(source).not.toMatch(/(?:href|navigate)[^\n]*\/(?:areas|locations)\//);
  });

  it("redirects service-area slashes including Stoke in one hop without query loss", () => {
    expect(getCanonicalServiceAreaRedirect("/service-areas/swindon/", "/service-areas/swindon/")).toBe("/service-areas/swindon");
    expect(getCanonicalServiceAreaRedirect("/service-areas/swindon/", "/service-areas/swindon/" + query)).toBe("/service-areas/swindon" + query);
    for (const path of ["/service-areas/stoke", "/service-areas/stoke/"]) {
      expect(getCanonicalServiceAreaRedirect(path, path + query)).toBe("/service-areas/stoke-on-trent" + query);
    }
    expect(getCanonicalServiceAreaRedirect("/service-areas/swindon", "/service-areas/swindon")).toBeNull();
    expect(getCanonicalServiceAreaRedirect("/service-areas/stoke-on-trent", "/service-areas/stoke-on-trent" + query)).toBeNull();
    expect(getCanonicalServiceAreaRedirect("/locations/corby", "/locations/corby")).toBeNull();
  });

  it("redirects legacy service aliases and preserves their catalogued destinations", () => {
    expect(getCanonicalServicePath("structural-steel-shot-blasting")).toBe("/services/structural-steel-frames");
    expect(getCanonicalServicePath("container-shot-blasting")).toBe("/services/steel-containers");
    expect(getCanonicalServicePath("crane-beams")).toBe("/services/structural-steel-frames");
    expect(getCanonicalServicePath("structural-steel")).toBe("/services/structural-steel-frames");
    expect(getCanonicalServicePath("concrete-preparation")).toBe("/services/floor-preparation");
    expect(getCanonicalServicePath("automotive-shot-blasting")).toBe("/services/commercial-vehicles");
    expect(getCanonicalServiceRedirectPath("crane-beams", "/services/crane-beams" + query)).toBe("/services/structural-steel-frames" + query);
    expect(getKnownPageRedirect("/services/mobile-shot-blasting/", "/services/mobile-shot-blasting/" + query)).toBe("/services" + query);
    expect(isCanonicalServiceSlug("structural-steel-frames")).toBe(true);
    expect(isCanonicalServiceSlug("structural-steel-shot-blasting")).toBe(false);
    expect(Object.keys(LEGACY_SERVICE_REDIRECTS)).toContain("floor-shot-blasting");
  });

  it("redirects the root-level Marine CX URL and its slash without changing attribution", () => {
    expect(getLegacyRootServiceRedirectPath("/marine-cx-surface-preparation", "/marine-cx-surface-preparation")).toBe("/services/marine-cx-surface-preparation");
    expect(getLegacyRootServiceRedirectPath("/marine-cx-surface-preparation", "/marine-cx-surface-preparation" + query)).toBe("/services/marine-cx-surface-preparation" + query);
    expect(getKnownPageRedirect("/marine-cx-surface-preparation/", "/marine-cx-surface-preparation/" + query)).toBe("/services/marine-cx-surface-preparation" + query);
  });

  it("keeps preparation discovery on the maintained owner in both sitemap generators", async () => {
    const xml = await buildMainSitemap();
    expect(xml).toContain("https://commercialshotblasting.co.uk/preparation-cleanup</loc>");
    expect(xml).not.toMatch(/\/(?:prep-and-cleanup|preparation-and-cleanup)</);
    const source = readFileSync(resolve(projectRoot, "client/src/pages/SitemapPage.tsx"), "utf8");
    expect(source).toContain('{ href: "/preparation-cleanup", label: "Preparation & Cleanup" }');
    expect(source).not.toContain('href: "/preparation-and-cleanup"');
  });

  it("rewrites stale crawler-visible service links to their canonical equivalents", () => {
    const html = '<a href="/services/structural-steel-shot-blasting">Steel</a><script>{"url":"/services/floor-shot-blasting"}</script>';
    expect(normaliseServiceUrls(html)).toContain('/services/structural-steel-frames');
    expect(normaliseServiceUrls(html)).toContain('/services/floor-preparation');
  });

  it("does not retain Search Console legacy-service paths in updated internal link sources", () => {
    const sources = [
      "client/src/pages/Home.tsx",
      "client/src/pages/PrivacyPolicy.tsx",
      "client/src/pages/NorthamptonServiceArea.tsx",
      "client/src/pages/WrexhamServiceArea.tsx",
      "client/src/pages/ChesterfieldServiceArea.tsx",
      "client/src/pages/ServiceAreas.tsx",
      "client/src/pages/ManufacturingIndustry.tsx",
      "server/routers.ts",
    ].map((source) => readFileSync(resolve(projectRoot, source), "utf8")).join("\n");
    for (const legacyPath of ["/services/crane-beams", "/services/structural-steel", "/services/concrete-preparation", "/services/automotive-shot-blasting"]) {
      expect(sources).not.toMatch(new RegExp(`${legacyPath}(?=["'\\s?#<])`));
    }
  });
});
