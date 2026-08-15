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
    expect(locationPageSource).toContain("Book a Free Site Survey");
  });

  it("renders both interactive local maps from the shared location template", () => {
    expect(locationPageSource).toContain("<LocalIndustryMap");
    expect(locationPageSource).toContain("<ServiceRadiusMap");
  });

  it("uses a transparent local case-study placeholder rather than hard-coded testimonial copy", () => {
    expect(locationPageSource).toContain("Commercial Project Records for {location.name}");
    expect(locationPageSource).toContain("verified, location-specific project records");
    expect(locationPageSource).not.toContain("James H.");
    expect(locationPageSource).not.toContain("Midlands Steel Fabricators");
  });
});
