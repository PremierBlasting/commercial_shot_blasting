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
    expect(coverageMap).toContain("Nearby towns within {searchRadiusMiles} miles");
  });

  it("supports full-postcode lookup and map centring without sending location to the server", () => {
    const coverageMap = readFileSync(resolve(projectRoot, "client/src/components/SitemapCoverageMap.tsx"), "utf8");

    expect(coverageMap).toContain("Find a postcode on the map");
    expect(coverageMap).toContain("isValidUKPostcode");
    expect(coverageMap).toContain("new window.google.maps.Geocoder()");
    expect(coverageMap).toContain("Find postcode");
    expect(coverageMap).toContain("map.setZoom(zoomForRadius(searchRadiusMiles))");
    expect(coverageMap).not.toContain("fetch(");
  });

  it("validates postcode format inline and lets visitors choose a nearby-town radius", () => {
    const coverageMap = readFileSync(resolve(projectRoot, "client/src/components/SitemapCoverageMap.tsx"), "utf8");

    expect(coverageMap).toContain("SEARCH_RADIUS_OPTIONS");
    expect(coverageMap).toContain('id="sitemap-map-radius"');
    expect(coverageMap).toContain("Within {radius} miles");
    expect(coverageMap).toContain("postcodeFormatError");
    expect(coverageMap).toContain("aria-invalid");
    expect(coverageMap).toContain("radius: searchRadiusMiles * 1609.344");
  });

  it("prefills the map from a valid browser-only Site Visit postcode handoff", () => {
    const surveyFlow = readFileSync(resolve(projectRoot, "client/src/components/SurveyBookingFlow.tsx"), "utf8");
    const coverageMap = readFileSync(resolve(projectRoot, "client/src/components/SitemapCoverageMap.tsx"), "utf8");
    const handoff = readFileSync(resolve(projectRoot, "client/src/lib/sitemapPostcodeHandoff.ts"), "utf8");

    expect(surveyFlow).toContain("saveSitemapPostcodeHandoff(postalCode)");
    expect(surveyFlow).toContain("View coverage around this postcode on the map");
    expect(coverageMap).toContain("readSitemapPostcodeHandoff");
    expect(coverageMap).toContain('new URLSearchParams(window.location.search).get("postcode")');
    expect(handoff).toContain("window.sessionStorage.setItem");
    expect(handoff).not.toContain("fetch(");
  });

  it("shows the nearest mapped service towns beneath a valid Site Visit postcode without server lookup", () => {
    const surveyFlow = readFileSync(resolve(projectRoot, "client/src/components/SurveyBookingFlow.tsx"), "utf8");
    const nearbyCoverage = readFileSync(resolve(projectRoot, "client/src/hooks/usePostcodeNearbyCoverage.ts"), "utf8");

    expect(surveyFlow).toContain("usePostcodeNearbyCoverage(postalCode)");
    expect(surveyFlow).toContain("Service coverage near your site");
    expect(surveyFlow).toContain("Finding nearby service areas");
    expect(nearbyCoverage).toContain("new window.google.maps.Geocoder()");
    expect(nearbyCoverage).toContain("Object.entries(locationCoordinates)");
    expect(nearbyCoverage).not.toContain("fetch(");
  });

  it("keeps initial nearby coverage compact and lets visitors reveal more towns on demand", () => {
    const surveyFlow = readFileSync(resolve(projectRoot, "client/src/components/SurveyBookingFlow.tsx"), "utf8");
    const nearbyCoverage = readFileSync(resolve(projectRoot, "client/src/hooks/usePostcodeNearbyCoverage.ts"), "utf8");

    expect(surveyFlow).toContain("showAllNearbyTowns");
    expect(surveyFlow).toContain("See all nearby towns");
    expect(surveyFlow).toContain("Show fewer nearby towns");
    expect(surveyFlow).toContain("aria-expanded={showAllNearbyTowns}");
    expect(nearbyCoverage).toContain(".slice(0, 12)");
  });

  it("adds county context and verified county-relevant project examples to nearby coverage", () => {
    const surveyFlow = readFileSync(resolve(projectRoot, "client/src/components/SurveyBookingFlow.tsx"), "utf8");
    const nearbyCoverage = readFileSync(resolve(projectRoot, "client/src/hooks/usePostcodeNearbyCoverage.ts"), "utf8");

    expect(surveyFlow).toContain("Relevant recent project examples");
    expect(surveyFlow).toContain("project.countySlugs.includes(nearestCounty)");
    expect(surveyFlow).toContain("town.countyLabel");
    expect(nearbyCoverage).toContain("locationSlugIndex");
    expect(nearbyCoverage).toContain("countyLabel");
  });

  it("renders approved lazy-loaded project imagery in nearby project example cards", () => {
    const surveyFlow = readFileSync(resolve(projectRoot, "client/src/components/SurveyBookingFlow.tsx"), "utf8");

    expect(surveyFlow).toContain("src={project.afterImage}");
    expect(surveyFlow).toContain("loading=\"lazy\"");
    expect(surveyFlow).toContain("Completed ${project.title} project");
    expect(surveyFlow).toContain("object-cover");
  });

  it("adds accessible expandable details and only renders verified before-and-after comparisons", () => {
    const surveyFlow = readFileSync(resolve(projectRoot, "client/src/components/SurveyBookingFlow.tsx"), "utf8");
    const projectData = readFileSync(resolve(projectRoot, "client/src/data/recentProjects.ts"), "utf8");
    const slider = readFileSync(resolve(projectRoot, "client/src/components/BeforeAfterProjectSlider.tsx"), "utf8");

    expect(surveyFlow).toContain("Read project details");
    expect(surveyFlow).toContain("Documented preparation detail");
    expect(surveyFlow).toContain("project.beforeImage && project.comparisonCaption");
    expect(surveyFlow).toContain("BeforeAfterProjectSlider");
    expect(projectData).toContain("beforeImage?: string");
    expect(projectData).toContain("comparisonCaption");
    expect(slider).toContain('type="range"');
    expect(slider).toContain("Compare before and after images");
  });
});
