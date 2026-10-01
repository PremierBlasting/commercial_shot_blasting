import { describe, expect, it } from "vitest";
import { getNearbyAreas } from "../client/src/hooks/useNearbyAreas";
import { locationCoordinates, sortLocationSlugsByDistance } from "../client/src/data/locationCoordinates";

describe("nearby service area suggestions", () => {
  it("returns the nearest featured Essex service area for an Essex coordinate", () => {
    const nearby = getNearbyAreas(51.5761, 0.4887);

    expect(nearby).toHaveLength(3);
    expect(nearby[0]).toMatchObject({ slug: "basildon", name: "Basildon", distanceMiles: 0 });
  });

  it("returns nearby results in ascending distance order", () => {
    const nearby = getNearbyAreas(50.7192, -1.8808);

    expect(nearby[0]?.slug).toBe("bournemouth");
    expect(nearby[0]!.distanceMiles).toBeLessThanOrEqual(nearby[1]!.distanceMiles);
    expect(nearby[1]!.distanceMiles).toBeLessThanOrEqual(nearby[2]!.distanceMiles);
  });

  it("includes all current Essex and Dorset service-area towns in the lightweight coordinate index", () => {
    const requiredSlugs = ["basildon", "chelmsford", "colchester", "southend-on-sea", "bournemouth", "poole", "weymouth"];

    for (const slug of requiredSlugs) {
      expect(locationCoordinates[slug]).toMatchObject({ lat: expect.any(Number), lng: expect.any(Number) });
    }
  });

  it("includes all current Greater Manchester service-area towns and orders results by distance", () => {
    const requiredSlugs = ["bolton", "manchester", "oldham", "rochdale", "salford", "stockport", "wigan", "bury", "wythenshawe", "sale", "leigh", "hindley", "atherton", "tyldesley", "radcliffe", "littleborough", "ramsbottom"];
    for (const slug of requiredSlugs) {
      expect(locationCoordinates[slug]).toMatchObject({ lat: expect.any(Number), lng: expect.any(Number) });
    }

    const nearby = getNearbyAreas(53.4808, -2.2426, 5);
    expect(nearby.map((area) => area.distanceMiles)).toEqual([...nearby.map((area) => area.distanceMiles)].sort((a, b) => a - b));
  });

  it("orders the compact same-county link set by proximity with a stable fallback", () => {
    const ordered = sortLocationSlugsByDistance("wigan", ["stockport", "leigh", "hindley", "manchester"]);
    expect(ordered.slice(0, 3)).toEqual(["hindley", "leigh", "manchester"]);
    expect(sortLocationSlugsByDistance("unknown-town", ["zebra", "alpha"])).toEqual(["alpha", "zebra"]);
  });
});
