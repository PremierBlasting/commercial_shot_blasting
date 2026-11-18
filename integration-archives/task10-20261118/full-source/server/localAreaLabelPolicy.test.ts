import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { getLocalAreaLabelPolicy } from "../shared/localAreaLabelPolicy";
import { locationData } from "../shared/locationData";
import { locationSlugIndex } from "../client/src/data/locationSlugIndex";
import { countyData } from "../client/src/data/countyData";
import { getPriorityLocalNearMeCopy, getPriorityLocalNearMeMetadata } from "../shared/priorityLocalNearMePilot";
import { getLocationRobotsDirective, getLocationSitemapTier, isIndexableLocation, shouldIncludeLocationInSitemap } from "../shared/locationSeoTiers";
import { getPageRobotsDirective } from "../shared/pageIndexingPolicy";
import { resolveRouteMetadata, serializeRouteMetadataHead } from "../shared/routeMetadata";
import { getCanonicalServiceAreaRedirect } from "./seoUrlNormalisation";

const root = resolve(import.meta.dirname, "..");
const source = (file: string) => readFileSync(resolve(root, file), "utf8");
const digest = (value: string) => createHash("sha256").update(value).digest("hex");
// Captured from the approved 1154c00c baseline, not from modified working files.
const unchangedLocalOwners = {
  "shared/priorityLocalNearMePilot.ts": "a33146afc71d7dd8d9223e19751347850e95a8b60fdf3522aaef3d5159856e4b",
  "shared/locationSeoTiers.ts": "a46a977585d62e66b44a1cc411f59b7068e33baa9cb5a106c4720ae19b489a8c",
  "shared/locationData.ts": "7820d5aa457155dfa47ad61f96e469b814b1d92e298aada280e5e41a483968d5",
  "shared/countyData.ts": "cbde0cef09eda819425262bb213068288f90913fbf6f355d10b043fd88c66ae3",
  "client/src/data/locationSlugIndex.ts": "1607878198c7d0157f93178e9548922010c765fabdd3a221de694af2ce5d3858",
  "client/src/data/countyData.ts": "69f294735dc42a7fec9b986d429f8bb7dab77a956cb5fac3d550d7e6d9292442",
  "client/src/components/LocationPage.tsx": "3c5ef85e0ed4d28ff138edb633a749e34f6af5312693e91594757d13da3abb92",
  "client/src/components/CountyPage.tsx": "fc057b1ce2571195b6868a8e64269a751a7f5a0c8a584df3a0031825c90107e1",
  "client/src/components/LocalBusinessSchema.tsx": "c2aa295999026443d73d9bf3a55507f132b9c1ccff2f1b8fdc18ee159318eff9",
  "client/src/hooks/useSEO.ts": "8afd8b6ef2addb92ce8cd4953864de203f67a085dbb8083b0eb2218d7b792a47",
  "shared/pageIndexingPolicy.ts": "d9566ab7557631f8732d53da9b5d054647f0db02a75ad5bc35a254bdf18ba9dd",
  "server/seoUrlNormalisation.ts": "773104bbcf60bdc263997e133b7e4b22a2882212ee22228edb6b874d53d9995b",
} as const;
let network: ReturnType<typeof vi.fn>;
beforeEach(() => {
  network = vi.fn(() => { throw new Error("TEST DENIED live APIs, storage, leads and Google events"); });
  vi.stubGlobal("fetch", network);
});
afterEach(() => { expect(network).not.toHaveBeenCalled(); vi.unstubAllGlobals(); });

function productionSources(directory: string): string[] {
  return readdirSync(resolve(root, directory), { withFileTypes: true }).flatMap(entry => {
    const file = `${directory}/${entry.name}`;
    if (entry.isDirectory()) return productionSources(file);
    return /\.[cm]?[jt]sx?$/.test(entry.name) && !/\.(?:test|spec)\./.test(entry.name)
      && file !== "shared/localAreaLabelPolicy.ts" && file !== "server/task10SourceScopeGuard.ts" ? [file] : [];
  });
}

describe("Task10 local-area proposal is a pure unused formatter, not deployment", () => {
  it.each(["Truro", "Birmingham", "Hampshire", "Stoke-on-Trent", "King's Lynn", "Brighton & Hove", "North Devon"])("returns the exact keyword and three presentation labels for %s", areaName => {
    expect(getLocalAreaLabelPolicy(areaName)).toEqual({
      keyword: `shot blasting in ${areaName}`,
      title: `Shot Blasting in ${areaName}`,
      h1: `Shot Blasting in ${areaName}`,
      serviceName: `Shot Blasting in ${areaName}`,
    });
  });
  it("does not trim, recase, add a suffix/description or infer a location", () => {
    for (const areaName of ["", "  Truro  ", "TRURO", "Éire", "[Area]"]) {
      const label = getLocalAreaLabelPolicy(areaName);
      expect(Object.keys(label).sort()).toEqual(["h1", "keyword", "serviceName", "title"]);
      expect(label.keyword).toBe(`shot blasting in ${areaName}`);
      expect([label.title, label.h1, label.serviceName]).toEqual(Array(3).fill(`Shot Blasting in ${areaName}`));
    }
  });
  it("returns independent plain data and has no imports or production consumers", () => {
    const first = getLocalAreaLabelPolicy("Truro");
    first.title = "INERT TEST MUTATION";
    expect(getLocalAreaLabelPolicy("Truro").title).toBe("Shot Blasting in Truro");
    expect(Object.getPrototypeOf(first)).toBe(Object.prototype);
    expect(source("shared/localAreaLabelPolicy.ts")).not.toMatch(/\b(?:import|require|fetch|process|window|document)\b/);
    for (const file of ["client/src", "shared", "server"].flatMap(productionSources)) {
      expect(source(file), file).not.toMatch(/getLocalAreaLabelPolicy|localAreaLabelPolicy/);
    }
  });
  it.each(Object.entries(unchangedLocalOwners))("preserves the entire deployed local owner %s", (file, hash) => {
    expect(digest(source(file)), file).toBe(hash);
  });
});

describe("Task10 keeps the deployed town/county catalogue and label owners unchanged", () => {
  it("retains 765 records, 764 canonical destinations, 65 organic targets, 699 held towns and the one Stoke alias", () => {
    const slugs = Object.keys(locationData);
    expect(slugs).toHaveLength(765);
    expect(Object.keys(locationSlugIndex).sort()).toEqual([...slugs].sort());
    expect(slugs.filter(slug => getLocationSitemapTier(slug) !== "alias")).toHaveLength(764);
    expect(slugs.filter(isIndexableLocation)).toHaveLength(65);
    expect(slugs.filter(slug => getLocationSitemapTier(slug) === "noindex")).toHaveLength(699);
    expect(slugs.filter(slug => getLocationSitemapTier(slug) === "alias")).toEqual(["stoke"]);
    expect(slugs.filter(shouldIncludeLocationInSitemap)).toHaveLength(65);
    expect(getLocationSitemapTier("truro")).toBe("noindex");
    expect(getLocationSitemapTier("birmingham")).toBe("A");
    expect(Object.keys(countyData)).toHaveLength(43);
  });
  it("preserves every deployed town title, description, H1 pattern, canonical, secondary terms and robots", () => {
    for (const [slug, location] of Object.entries(locationData)) {
      const canonicalSlug = slug === "stoke" ? "stoke-on-trent" : slug;
      const metadata = getPriorityLocalNearMeMetadata(canonicalSlug, location.name);
      const current = resolveRouteMetadata(`/service-areas/${slug}`);
      const indexed = isIndexableLocation(canonicalSlug);
      expect(metadata, slug).toEqual({
        title: `Shot Blasting ${indexed ? "Near" : "in"} ${location.name} | Commercial Surface Preparation`,
        description: indexed
          ? `Commercial shot blasting near ${location.name} for structural steel, cladding, plant, floors and access steel. Share the asset, condition, access and next stage.`
          : `Commercial shot blasting and sandblasting in ${location.name} for structural steel, cladding, plant, floors and access steel. Share the asset, condition, access and next stage.`,
      });
      expect(current.title, slug).toBe(metadata.title);
      expect(current.description, slug).toBe(metadata.description);
      expect(current.pathname, slug).toBe(`/service-areas/${canonicalSlug}`);
      expect(current.canonical, slug).toBe(`https://commercialshotblasting.co.uk/service-areas/${canonicalSlug}`);
      expect(current.robots, slug).toBe(getLocationRobotsDirective(canonicalSlug));
      expect(current.keywords, slug).toContain(`sandblasting ${location.name}`);
      expect(current.keywords, slug).toContain(`sand blasting ${location.name}`);
      const pageCopy = getPriorityLocalNearMeCopy(slug, location.name);
      expect(pageCopy.heroHeading, slug).toBe(isIndexableLocation(slug)
        ? `Commercial Shot Blasting Near ${location.name}`
        : `Commercial Shot Blasting in ${location.name} | Surface-Preparation Planning`);
      expect(pageCopy.heroDescription, slug).toBe(isIndexableLocation(slug)
        ? `Looking for commercial shot blasting near ${location.name}? Share the asset, condition, access and intended next stage so the right project scope can be discussed.`
        : `Commercial shot blasting and sandblasting in ${location.name} for structural steel, cladding, plant, floors and access steel. Share the asset, condition, access and intended next stage so the right scope can be discussed.`);
    }
  });
  it("preserves all 43 county titles/descriptions/robots and the distinct county H1 owner", () => {
    for (const [slug, county] of Object.entries(countyData)) {
      const route = `/counties/${slug}`;
      const metadata = resolveRouteMetadata(route);
      expect(metadata.title, slug).toBe(`Shot Blasting Services ${county.name} | Commercial Shot Blasting UK`);
      expect(metadata.description, slug).toBe(county.description);
      expect(metadata.canonical, slug).toBe(`https://commercialshotblasting.co.uk${route}`);
      expect(metadata.robots, slug).toBe(getPageRobotsDirective(route));
      expect(metadata.state, slug).toBe("ready");
    }
    expect(source("client/src/components/CountyPage.tsx")).toContain("Shot Blasting Services in {county.name}");
    expect(source("client/src/components/LocationPage.tsx")).toContain("{nearMePilot.heroHeading}");
  });
  it("keeps Stoke alias query bytes and the canonical destination's complete head unchanged", () => {
    const query = "?utm_source=task10&utm_source=&gclid=%2B&gclid=&gbraid=g&wbraid=w&dup=one&dup=two&empty=";
    const canonicalPath = "/service-areas/stoke-on-trent";
    expect(getCanonicalServiceAreaRedirect("/service-areas/stoke", "/service-areas/stoke" + query)).toBe(canonicalPath + query);
    expect(shouldIncludeLocationInSitemap("stoke")).toBe(false);
    const canonical = resolveRouteMetadata(canonicalPath);
    expect(resolveRouteMetadata("/service-areas/stoke" + query)).toEqual(canonical);
    expect(serializeRouteMetadataHead(resolveRouteMetadata("/service-areas/stoke" + query))).toBe(serializeRouteMetadataHead(canonical));
  });
});
