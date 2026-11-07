import { COOKIE_CONSENT_STORAGE_KEY, GOOGLE_MEASUREMENT_CONSENT_KEY, WEBSITE_CALL_CONSENT_KEY } from "@shared/cookieConsent";
import { CSB_GOOGLE_DESTINATIONS, GOOGLE_ADS_ID } from "@shared/googleMeasurement";
import { CSB_WEBSITE_CALL_HOSTS, verifiedWebsiteCallConfig, type CSBWebsiteCallConfig } from "@shared/csbWebsiteCall";

export const GOOGLE_MEASUREMENT_READY_EVENT = "csb:google-measurement-ready";

declare global {
  interface Window {
    gtag: (command: "event" | "config" | "js" | "consent" | "set", action: string | Date, params?: Record<string, unknown>) => void;
    dataLayer: unknown[];
  }
}

let configuredGA = false;
let configuredAds = false;
let consentInitialised = false;
let lastGoogleConsent: string | null = null;
let cancelLoader: (() => void) | undefined;
let lastPageLocation: string | undefined;
let blockedByChoice = false;

/** Withdrawal wins even when browser storage becomes unwritable mid-visit. */
export function setGoogleChoiceBlocked(blocked: boolean) { blockedByChoice = blocked; }

export function currentGoogleConsent() {
  if (typeof window === "undefined" || blockedByChoice) return { analytics: false, advertising: false };
  try {
    const analytics = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === "accepted";
    return { analytics, advertising: analytics && window.localStorage.getItem(GOOGLE_MEASUREMENT_CONSENT_KEY) === "accepted" };
  } catch { return { analytics: false, advertising: false }; }
}

export function measurementPagePath(path = typeof window === "undefined" ? "/" : window.location.pathname): string {
  try { return new URL(path, window.location.origin).pathname; } catch { return "/"; }
}

/** Older analytics/click permission does not cover the new call-measurement purpose. */
export function currentWebsiteCallConsent(): boolean {
  if (!currentGoogleConsent().advertising) return false;
  try { return window.localStorage.getItem(WEBSITE_CALL_CONSENT_KEY) === "accepted"; } catch { return false; }
}

function googleConsentValues() {
  const consent = currentGoogleConsent();
  return {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.advertising ? "granted" : "denied",
    ad_user_data: consent.advertising ? "granted" : "denied",
    // Measurement is not permission for remarketing or personalised advertising.
    ad_personalization: "denied",
  };
}

/** No script or event queue for an initially declined/undecided visitor. */
export function syncGoogleConsent(): boolean {
  if (typeof window === "undefined") return false;
  const consent = currentGoogleConsent();
  if (!consent.analytics) {
    cancelLoader?.(); cancelLoader = undefined;
    lastPageLocation = undefined;
    // A local queue that has not been loaded must not replay old events later.
    const script = document.querySelector<HTMLScriptElement>("script[data-csb-analytics-loader]");
    if (!script || script.dataset.csbAnalyticsLoaded !== "true") {
      if (window.dataLayer) window.dataLayer.length = 0;
      script?.remove();
      configuredGA = false; configuredAds = false;
      consentInitialised = false; lastGoogleConsent = null;
    }
    if (consentInitialised && window.gtag) {
      const denied = googleConsentValues();
      try { window.gtag("consent", "update", denied); } catch { /* Tracking must not break contacts. */ }
      lastGoogleConsent = JSON.stringify(denied);
    }
    return false;
  }
  try {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function (...args: unknown[]) { window.dataLayer.push(arguments); };
    if (!consentInitialised) {
      window.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      consentInitialised = true;
    }
    const values = googleConsentValues();
    const signature = JSON.stringify(values);
    if (signature !== lastGoogleConsent) { window.gtag("consent", "update", values); lastGoogleConsent = signature; }
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (!configuredGA) {
      window.gtag("js", new Date());
      if (gaId && gaId !== "G-XXXXXXXXXX") window.gtag("config", gaId, {
        page_path: measurementPagePath(), page_location: window.location.origin + measurementPagePath(),
        send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
      });
      configuredGA = true;
    }
    if (consent.advertising && !configuredAds) {
      window.gtag("config", GOOGLE_ADS_ID, { allow_ad_personalization_signals: false });
      configuredAds = true;
    }
    return true;
  } catch { return false; }
}

/** Local queue synchronously; network loader remains idle/deferred. */
export function initialiseGoogleMeasurement(): () => void {
  if (!syncGoogleConsent()) return () => {};
  const append = () => {
    cancelLoader = undefined;
    if (!currentGoogleConsent().analytics || document.querySelector("script[data-csb-analytics-loader]")) return;
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    const id = gaId && gaId !== "G-XXXXXXXXXX" ? gaId : (currentGoogleConsent().advertising ? GOOGLE_ADS_ID : undefined);
    if (!id) return;
    const loader = document.createElement("script");
    loader.async = true; loader.dataset.csbAnalyticsLoader = "true";
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    loader.onload = () => {
      loader.dataset.csbAnalyticsLoaded = "true";
      window.dispatchEvent?.(new Event(GOOGLE_MEASUREMENT_READY_EVENT));
    };
    document.head.appendChild(loader);
  };
  if (!cancelLoader && !document.querySelector("script[data-csb-analytics-loader]")) {
    if (window.requestIdleCallback) {
      const id = window.requestIdleCallback(append, { timeout: 4000 });
      cancelLoader = () => window.cancelIdleCallback?.(id);
    } else {
      const id = window.setTimeout(append, 1200);
      cancelLoader = () => window.clearTimeout(id);
    }
  }
  return () => { cancelLoader?.(); cancelLoader = undefined; };
}

/** Drop denied activity immediately, never save it for a later consent choice. */
export function dispatchGoogleEvent(name: string, params: Record<string, unknown> = {}): boolean {
  if (name === "conversion" || !syncGoogleConsent()) return false;
  try { window.gtag("event", name, params); return true; } catch { return false; }
}

/** Existing iframe onFormSubmitted callback only; caller retains native-event dedup.
 * No fabricated native contact.submit UUID or transaction token is required.
 */
export function dispatchHubSpotLeadConversion(): boolean {
  if (!currentGoogleConsent().advertising || !syncGoogleConsent()) return false;
  try {
    window.gtag("event", "conversion", { send_to: CSB_GOOGLE_DESTINATIONS.lead });
    return true;
  } catch { return false; }
}

/** Actual calls use Google's phone config/callback, never an ordinary click conversion. */
export function dispatchWebsiteCallConfig(config: CSBWebsiteCallConfig | null, callback: (formatted: unknown, mobile: unknown) => void): boolean {
  const verified = verifiedWebsiteCallConfig(config);
  if (!verified || typeof window === "undefined" || !CSB_WEBSITE_CALL_HOSTS.some(host => host === window.location.hostname) || !currentWebsiteCallConsent()) return false;
  if (document.querySelector<HTMLScriptElement>("script[data-csb-analytics-loader]")?.dataset.csbAnalyticsLoaded !== "true" || !syncGoogleConsent()) return false;
  try {
    window.gtag("config", verified.destination, {
      phone_conversion_number: verified.businessNumber,
      phone_conversion_callback: (formatted: unknown, mobile: unknown) => {
        if (currentWebsiteCallConsent()) { try { callback(formatted, mobile); } catch { /* Contact navigation must remain safe. */ } }
      },
      send_page_view: false,
      allow_ad_personalization_signals: false,
    });
    return true;
  } catch { return false; }
}

/** One manual view per actual route change. Call only after the lazy page commits. */
export function dispatchPageView(path: string, title: string): boolean {
  if (!currentGoogleConsent().analytics) return false;
  const pagePath = measurementPagePath(path);
  const pageLocation = window.location.origin + pagePath;
  if (pageLocation === lastPageLocation) return false;
  const referrer = lastPageLocation || (() => { try { const url = new URL(document.referrer); return url.origin + url.pathname; } catch { return ""; } })();
  const sent = dispatchGoogleEvent("page_view", { page_path: pagePath, page_location: pageLocation, page_title: title, page_referrer: referrer, engagement_time_msec: 1 });
  if (sent) lastPageLocation = pageLocation;
  return sent;
}
