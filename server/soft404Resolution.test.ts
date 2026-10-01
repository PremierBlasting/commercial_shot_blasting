import { describe, expect, it } from "vitest";
import { getCanonicalServiceAreaRedirect, getSoft404PathResolution } from "./seoUrlNormalisation";

function expectRedirect(path: string, destination: string) {
  expect(getSoft404PathResolution(path, path)).toEqual({ type: "redirect", destination });
}

function expectNotFound(path: string) {
  expect(getSoft404PathResolution(path, path)).toEqual({ type: "not-found" });
}

describe("Search Console soft-404 remediation", () => {
  it("keeps valid exported town URLs canonical", () => {
    for (const path of [
      "/service-areas/blackpool",
      "/service-areas/maidenhead",
      "/service-areas/newton-aycliffe",
      "/service-areas/basingstoke",
      "/service-areas/northallerton",
      "/service-areas/fakenham",
      "/service-areas/st-neots",
    ]) {
      expect(getSoft404PathResolution(path, path)).toBeNull();
    }
  });

  it("redirects valid historic town URL patterns to one canonical service-area URL", () => {
    expectRedirect("/areas/evesham", "/service-areas/evesham");
    expectRedirect("/locations/chesterfield", "/service-areas/chesterfield");
    expectRedirect("/service-area/lincolnshire", "/counties/lincolnshire");
    expectRedirect("/locations/westward-ho!", "/service-areas/westward-ho");
    expect(getSoft404PathResolution("/areas/evesham", "/areas/evesham?utm_source=google")).toEqual({
      type: "redirect",
      destination: "/service-areas/evesham?utm_source=google",
    });
  });

  it("redirects recognised legacy .html local-page duplicates", () => {
    expectRedirect("/service-areas/evesham.html", "/service-areas/evesham");
    expectRedirect("/service-areas/evesham/index.html", "/service-areas/evesham");
    expectNotFound("/service-areas/no-such-town.html");
  });

  it("uses county hubs for retired towns without a canonical town page", () => {
    expectRedirect("/service-areas/andover", "/counties/hampshire");
    expectRedirect("/service-areas/alnwick", "/counties/northumberland");
    expectRedirect("/service-areas/kendal", "/counties/cumbria");
    expectRedirect("/service-areas/newbury", "/counties/berkshire");
    expectRedirect("/service-areas/fareham", "/counties/hampshire");
  });

  it("redirects genuine root and industry successors", () => {
    expectRedirect("/privacy", "/privacy-policy");
    expectRedirect("/hertfordshire", "/counties/hertfordshire");
    expectRedirect("/staffordshire", "/counties/staffordshire");
    expectRedirect("/preparation-and-cleanup", "/prep-and-cleanup");
    expectRedirect("/industries/automotive", "/services/commercial-vehicles");
  });

  it("returns genuine 404 outcomes for unsupported or non-equivalent requests", () => {
    for (const path of [
      "/service-areas/north-west",
      "/areas/not-a-real-area",
      "/locations/not-a-real-area",
      "/counties/east-midlands",
      "/industries/oil-and-gas",
      "/uk",
      "/assets/index-aUUVvKD6.js:49:115947",
    ]) {
      expectNotFound(path);
    }
  });

  it("does not normalize unknown trailing-slash paths into fresh soft 404 URLs", () => {
    expect(getCanonicalServiceAreaRedirect("/service-areas/blackpool/", "/service-areas/blackpool/?utm_source=gsc"))
      .toBe("/service-areas/blackpool?utm_source=gsc");
    expect(getCanonicalServiceAreaRedirect("/service-areas/not-a-real-area/", "/service-areas/not-a-real-area/"))
      .toBeNull();
  });
});
