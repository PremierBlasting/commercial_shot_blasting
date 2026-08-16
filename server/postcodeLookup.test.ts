import { describe, expect, it } from "vitest";
import { isValidUKPostcode, normalisePostcode } from "../shared/postcodeUtils";

describe("postcode lookup validation", () => {
  it("normalises full UK postcodes before lookup", () => {
    expect(normalisePostcode("  ss1   1aa ")).toBe("SS1 1AA");
  });

  it("accepts a full postcode and rejects incomplete or malformed input", () => {
    expect(isValidUKPostcode("SS1 1AA")).toBe(true);
    expect(isValidUKPostcode("BH15 1AA")).toBe(true);
    expect(isValidUKPostcode("SS1")).toBe(false);
    expect(isValidUKPostcode("not-a-postcode")).toBe(false);
  });
});
