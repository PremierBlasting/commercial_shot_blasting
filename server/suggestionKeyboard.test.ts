import { describe, expect, it } from "vitest";
import { nextSuggestionIndex } from "../client/src/hooks/useSuggestionKeyboard";
import { locationCoordinates } from "../client/src/data/locationCoordinates";

describe("suggestion keyboard navigation", () => {
  it("wraps ArrowDown and ArrowUp through available suggestions", () => {
    expect(nextSuggestionIndex(-1, "next", 3)).toBe(0);
    expect(nextSuggestionIndex(2, "next", 3)).toBe(0);
    expect(nextSuggestionIndex(0, "previous", 3)).toBe(2);
    expect(nextSuggestionIndex(-1, "previous", 3)).toBe(2);
  });

  it("has coordinates for Hampshire, Surrey, and Sussex service-area hubs", () => {
    const requiredSlugs = ["southampton", "winchester", "basingstoke", "portsmouth", "gosport", "guildford", "woking", "epsom", "camberley", "farnham", "brighton-and-hove", "crawley", "worthing", "horsham"];
    for (const slug of requiredSlugs) {
      expect(locationCoordinates[slug]).toMatchObject({ lat: expect.any(Number), lng: expect.any(Number) });
    }
  });

  it("has coordinates for every current Kent and Devon service-area record", () => {
    const requiredSlugs = [
      "maidstone", "gillingham-medway", "ashford", "chatham", "dartford", "rochester", "margate", "gravesend", "canterbury", "sittingbourne", "folkestone", "royal-tunbridge-wells",
      "barnstaple", "bideford", "plymouth", "exeter", "torquay", "newton-abbot", "tiverton",
    ];
    for (const slug of requiredSlugs) {
      expect(locationCoordinates[slug]).toMatchObject({ lat: expect.any(Number), lng: expect.any(Number) });
    }
  });
});
