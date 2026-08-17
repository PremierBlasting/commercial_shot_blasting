import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { clusterCoveragePoints, distanceInMiles } from "../client/src/lib/sitemapMapUtils";

const projectRoot = resolve(__dirname, "..");

describe("sitemap map controls and Site Visit options", () => {
  it("clusters nearby detailed town markers while retaining individual markers at close zoom", () => {
    const points = [
      { slug: "a", name: "A", lat: 51.50, lng: -0.10 },
      { slug: "b", name: "B", lat: 51.56, lng: -0.16 },
      { slug: "c", name: "C", lat: 53.48, lng: -2.24 },
    ];

    expect(clusterCoveragePoints(points, 6)).toHaveLength(2);
    expect(clusterCoveragePoints(points, 8)).toHaveLength(3);
  });

  it("calculates credible user-to-town distances for nearby highlighting", () => {
    const londonToBirmingham = distanceInMiles(
      { lat: 51.5072, lng: -0.1276 },
      { lat: 52.4862, lng: -1.8904 },
    );

    expect(londonToBirmingham).toBeGreaterThan(95);
    expect(londonToBirmingham).toBeLessThan(110);
  });

  it("offers expanded Site Visit choices without a 24-hour response promise", () => {
    const surveyFlow = readFileSync(resolve(projectRoot, "client/src/components/SurveyBookingFlow.tsx"), "utf8");
    const quotePopup = readFileSync(resolve(projectRoot, "client/src/components/QuotePopup.tsx"), "utf8");

    expect(surveyFlow).toContain('"End-to-End Blasting & Coating"');
    expect(surveyFlow).toContain('"Containers, Tanks & Vessels"');
    expect(surveyFlow).toContain('"Paint & Coating Removal"');
    expect(surveyFlow).not.toContain("within 24 hours");
    expect(quotePopup).not.toContain("within 24 hours");
  });

  it("provides clickable regional filters and an opt-in Locate Me control", () => {
    const sitemapPage = readFileSync(resolve(projectRoot, "client/src/pages/SitemapPage.tsx"), "utf8");
    const coverageMap = readFileSync(resolve(projectRoot, "client/src/components/SitemapCoverageMap.tsx"), "utf8");

    expect(sitemapPage).toContain("activeRegion");
    expect(sitemapPage).toContain('aria-label="Filter sitemap by major region"');
    expect(sitemapPage).toContain("<SitemapCoverageMap query={query} region={activeRegion} />");
    expect(coverageMap).toContain("clusterCoveragePoints");
    expect(coverageMap).toContain("Locate Me");
    expect(coverageMap).toContain("navigator.geolocation.getCurrentPosition");
    expect(coverageMap).toContain("Nearby towns highlighted");
  });

  it("supports full-postcode lookup and map centring without sending location to the server", () => {
    const coverageMap = readFileSync(resolve(projectRoot, "client/src/components/SitemapCoverageMap.tsx"), "utf8");

    expect(coverageMap).toContain("Find a postcode on the map");
    expect(coverageMap).toContain("isValidUKPostcode");
    expect(coverageMap).toContain("new window.google.maps.Geocoder()");
    expect(coverageMap).toContain("Find postcode");
    expect(coverageMap).toContain("map.setZoom(10)");
    expect(coverageMap).not.toContain("fetch(");
  });
});
