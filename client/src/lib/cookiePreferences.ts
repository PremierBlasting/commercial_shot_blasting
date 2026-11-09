import { setGoogleChoiceBlocked, syncGoogleConsent } from "./googleMeasurement";
import { COOKIE_CONSENT_CHANGE_EVENT, COOKIE_CONSENT_STORAGE_KEY, GOOGLE_MEASUREMENT_CONSENT_KEY, WEBSITE_CALL_CONSENT_KEY } from "@shared/cookieConsent";

export interface CookieMeasurementChoices { measurements: boolean; websiteCalls: boolean }

/** Only explicit visitor actions call this helper. Existing keys/Google lifecycle stay unchanged. */
export function saveCookieMeasurementChoices(choices: CookieMeasurementChoices): void {
  const status = choices.measurements ? "accepted" : "declined";
  const calls = choices.measurements && choices.websiteCalls ? "accepted" : "declined";
  try {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, status);
    localStorage.setItem(GOOGLE_MEASUREMENT_CONSENT_KEY, status);
    localStorage.setItem(WEBSITE_CALL_CONSENT_KEY, calls);
    setGoogleChoiceBlocked(status !== "accepted");
  } catch { setGoogleChoiceBlocked(true); }
  syncGoogleConsent();
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_CHANGE_EVENT, { detail: { status, source: "interaction" } }));
}

export function readCookieMeasurementChoices(): CookieMeasurementChoices {
  try {
    const measurements = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === "accepted" && localStorage.getItem(GOOGLE_MEASUREMENT_CONSENT_KEY) === "accepted";
    return { measurements, websiteCalls: measurements && localStorage.getItem(WEBSITE_CALL_CONSENT_KEY) === "accepted" };
  } catch { return { measurements: false, websiteCalls: false }; }
}
