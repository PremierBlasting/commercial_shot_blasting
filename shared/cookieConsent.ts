export const COOKIE_CONSENT_STORAGE_KEY = "csb_cookie_consent";
export const COOKIE_CONSENT_CHANGE_EVENT = "csb:cookie-consent-change";
// A preference-scope marker only, not a visitor/campaign identifier. Old analytics
// acceptance alone is not treated as new advertising-measurement permission.
export const GOOGLE_MEASUREMENT_CONSENT_KEY = "csb_google_measurement_consent";
// Separate affirmative permission for actual duration-based website calls.
export const WEBSITE_CALL_CONSENT_KEY = "csb_website_call_consent";
export const COOKIE_PREFERENCES_OPEN_EVENT = "csb:cookie-preferences-open";

export type CookieConsentStatus = "accepted" | "declined" | null;

export function permitsOptionalAnalytics(consent: CookieConsentStatus): boolean {
  return consent === "accepted";
}
