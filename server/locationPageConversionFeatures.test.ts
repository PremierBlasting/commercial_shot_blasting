import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const locationPageSource = readFileSync(
  new URL("../client/src/components/LocationPage.tsx", import.meta.url),
  "utf8",
);

describe("location-page conversion and local-proof features", () => {
  it("includes the compact survey capture above the fold for every data-driven location page", () => {
    expect(locationPageSource).toContain("<CompactSurveyCapture");
    expect(locationPageSource).toContain('defaults={{ locationName: location.name }}');
    expect(locationPageSource).toContain("Request A Site Visit");
  });

  it("renders both interactive local maps from the shared location template", () => {
    expect(locationPageSource).toContain("<LocalIndustryMap");
    expect(locationPageSource).toContain("<ServiceRadiusMap");
  });

  it("shows realistic industry-specific project examples rather than a placeholder or hard-coded testimonials", () => {
    expect(locationPageSource).toContain("Commercial Shot Blasting Projects in {location.name}");
    expect(locationPageSource).toContain("getProjectsForCounty(location.countySlug");
    expect(locationPageSource).toContain("Typical Projects");
    // Must not have the old placeholder text
    expect(locationPageSource).not.toContain("We are building a library");
    expect(locationPageSource).not.toContain("verified, location-specific project records");
    // Must not have hard-coded testimonial names
    expect(locationPageSource).not.toContain("James H.");
    expect(locationPageSource).not.toContain("Midlands Steel Fabricators");
  });

  it("has a sticky mobile CTA bar labeled 'Request A Site Visit'", () => {
    expect(locationPageSource).toContain("Sticky mobile Request A Site Visit bar");
    expect(locationPageSource).toContain("CalendarCheck");
  });
});
