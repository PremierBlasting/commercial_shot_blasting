import { describe, expect, it } from "vitest";
import { getNearbyAreas } from "../client/src/hooks/useNearbyAreas";

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
});

