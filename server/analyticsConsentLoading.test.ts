import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { permitsOptionalAnalytics } from "../shared/cookieConsent";

const projectRoot = resolve(import.meta.dirname, "..");

describe("consent-aware analytics loading", () => {
  it("allows optional analytics only after an affirmative preference", () => {
    expect(permitsOptionalAnalytics("accepted")).toBe(true);
    expect(permitsOptionalAnalytics("declined")).toBe(false);
    expect(permitsOptionalAnalytics(null)).toBe(false);
  });

  it("broadcasts a visitor consent decision without changing the stored consent values", () => {
    const consent = readFileSync(resolve(projectRoot, "client/src/lib/cookiePreferences.ts"), "utf8");

    expect(consent).toContain('localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, status)');
    expect(consent).toContain("COOKIE_CONSENT_CHANGE_EVENT");
    expect(consent).toContain('detail: { status, source: "interaction" }');
  });

  it("loads analytics after consent and keeps a gtag queue for accepted visitors", () => {
    const analytics = readFileSync(resolve(projectRoot, "client/src/components/GoogleAnalytics.tsx"), "utf8");
    const dispatcher = readFileSync(resolve(projectRoot, "client/src/lib/googleMeasurement.ts"), "utf8");

    expect(analytics).toContain("currentGoogleConsent");
    expect(analytics).toContain("COOKIE_CONSENT_CHANGE_EVENT");
    expect(dispatcher).toContain("window.gtag = window.gtag ||");
    expect(dispatcher).toContain("requestIdleCallback");
    expect(dispatcher).toContain("data-csb-analytics-loader");
    expect(dispatcher).toContain("window.dataLayer.push(arguments)");
  });

  it("does not alter the existing CSB Google Ads conversion identifiers", () => {
    const analytics = readFileSync(resolve(projectRoot, "shared/googleMeasurement.ts"), "utf8");
    const dispatcher = readFileSync(resolve(projectRoot, "client/src/lib/googleMeasurement.ts"), "utf8");

    expect(analytics).toContain("AW-16481669131");
    expect(analytics).toContain("nOlECJeFnNccEIugibM9");
    expect(analytics).toContain("UPr1CIvfr9ccEIugibM9");
    expect(analytics).toContain("GOOGLE_ADS_LEAD_LABEL");
    expect(analytics).toContain("GOOGLE_ADS_PHONE_LABEL");
    expect(dispatcher).toContain("CSB_GOOGLE_DESTINATIONS");
  });
});
