/** Marketing attribution plus visitor-safe, separately labelled enquiry context. */
import { COOKIE_CONSENT_STORAGE_KEY } from "@shared/cookieConsent";
import { classifyVisit, landingPath, referrerHost } from "@shared/leadAttribution";
import { currentGoogleConsent } from "./googleMeasurement";

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'] as const;
const TRACKING_PARAMS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'ref', 'hsa_acc', 'hsa_cam', 'hsa_grp', 'hsa_ad', 'hsa_src', 'hsa_tgt', 'hsa_kw', 'hsa_mt', 'hsa_net', 'hsa_ver', 'matchtype', 'device', 'network'] as const;
const UTM_STORAGE_KEY = 'csb_utm_data';
const FIRST_TOUCH_KEY = 'csb_first_touch';
const SESSION_KEY = 'csb_session_data';
const VISIT_IDLE_MS = 30 * 60 * 1000;

export interface UTMData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_id?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  hsa_acc?: string;
  hsa_cam?: string;
  hsa_grp?: string;
  hsa_ad?: string;
  hsa_src?: string;
  hsa_tgt?: string;
  hsa_kw?: string;
  hsa_mt?: string;
  hsa_net?: string;
  hsa_ver?: string;
  matchtype?: string;
  device?: string;
  network?: string;
  fbclid?: string;
  msclkid?: string;
  ref?: string;
  landing_page?: string;
  referrer?: string;
  timestamp?: string;
  last_activity?: string;
}

// Storage denial must never prevent app load or an enquiry. No external requests.
let memorySession: UTMData | null = null;
let memoryLastTouch: UTMData | null = null;
let memoryFirstTouch: UTMData | null = null;
let initialised = false;

function readStored(storage: "localStorage" | "sessionStorage", key: string): UTMData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window[storage].getItem(key);
    if (!raw || raw.length > 32768) return null;
    const value = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const allowed = [...UTM_PARAMS, ...TRACKING_PARAMS, "landing_page", "referrer", "timestamp", "last_activity"];
    return Object.fromEntries(Object.entries(value).filter(([key, value]) => allowed.includes(key) && typeof value === "string")) as UTMData;
  } catch {
    return null;
  }
}

function writeStored(storage: "localStorage" | "sessionStorage", key: string, data: UTMData): void {
  const stored = { ...data };
  // Existing tagged attribution behavior is preserved. Newly supported Google
  // braid IDs are form context in memory, not new persistent advertising IDs without permission.
  if (!currentGoogleConsent().advertising) { delete stored.gbraid; delete stored.wbraid; }
  try { window[storage].setItem(key, JSON.stringify(stored)); } catch { /* Memory fallback remains available. */ }
}

function optionalStorageAllowed(): boolean {
  try { return window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === "accepted"; } catch { return false; }
}

export function parseUTMFromURL(): UTMData {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const result: UTMData = {};
  for (const key of [...UTM_PARAMS, ...TRACKING_PARAMS]) {
    const value = params.get(key);
    if (value) result[key] = value;
  }
  return result;
}

/** Existing tagged first-/last-touch semantics and localStorage keys are unchanged. */
export function storeUTMData(data: UTMData): void {
  if (typeof window === 'undefined' || Object.keys(data).length === 0) return;
  const enriched: UTMData = {
    ...data,
    landing_page: window.location.pathname,
    referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
    timestamp: new Date().toISOString(),
  };
  memoryFirstTouch = getFirstTouchUTM() || enriched;
  memoryLastTouch = enriched;
  memorySession = enriched;
  writeStored("localStorage", UTM_STORAGE_KEY, enriched);
  // Never replace an existing paid/tagged first touch with an organic visit.
  if (!readStored("localStorage", FIRST_TOUCH_KEY)) writeStored("localStorage", FIRST_TOUCH_KEY, memoryFirstTouch);
  writeStored("sessionStorage", SESSION_KEY, enriched);
}

export function getUTMData(): UTMData | null {
  return memoryLastTouch || readStored("localStorage", UTM_STORAGE_KEY);
}

export function getFirstTouchUTM(): UTMData | null {
  return memoryFirstTouch || readStored("localStorage", FIRST_TOUCH_KEY);
}

export function getSessionUTM(): UTMData | null {
  if (memorySession) return memorySession;
  const stored = readStored("sessionStorage", SESSION_KEY);
  // Existing tagged visit context is retained; new untagged context is memory-only without consent.
  const tagged = stored && [...UTM_PARAMS, ...TRACKING_PARAMS].some(key => stored[key]) && stored.utm_medium !== "organic";
  return optionalStorageAllowed() || tagged ? stored : null;
}

function isNewNavigation(): boolean {
  try {
    const entry = window.performance?.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    return entry?.type === "navigate";
  } catch { return false; }
}

/** Initial capture is first observed in this visit, not a claim of first-ever acquisition. */
export function initUTMTracking(): void {
  if (typeof window === 'undefined' || initialised) return;
  initialised = true;
  const tagged = parseUTMFromURL();
  if (Object.keys(tagged).length > 0) {
    storeUTMData(tagged);
    return;
  }
  const prior = getSessionUTM();
  const referrer = typeof document !== "undefined" ? referrerHost(document.referrer) : undefined;
  const ownHost = referrerHost(window.location.origin);
  const externalArrival = Boolean(referrer && referrer !== ownHost && isNewNavigation());
  const priorTime = Date.parse(prior?.last_activity || prior?.timestamp || "");
  const expired = !Number.isFinite(priorTime) || Date.now() - priorTime > VISIT_IDLE_MS;
  memorySession = prior && !externalArrival && !expired ? prior : {
    landing_page: landingPath(window.location.pathname),
    // A reload/history restore isn't evidence of a new external arrival after expiry.
    referrer: !prior || externalArrival ? referrer : undefined,
    timestamp: new Date().toISOString(),
  };
  if (optionalStorageAllowed()) writeStored("sessionStorage", SESSION_KEY, memorySession);
}

export function getAttributionData(): { firstTouch: UTMData | null; lastTouch: UTMData | null; session: UTMData | null } {
  return { firstTouch: getFirstTouchUTM(), lastTouch: getUTMData(), session: getSessionUTM() };
}

/** The form contract stays Record<string,string>; existing ft_/lt_ values are kept verbatim. */
export function formatUTMForSubmission(): Record<string, string> {
  initUTMTracking();
  const result: Record<string, string> = {};
  for (const [prefix, data] of [["lt", getUTMData()], ["ft", getFirstTouchUTM()]] as const) {
    if (data) for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string" && value && key !== "last_activity") result[`${prefix}_${key}`] = value;
    }
  }
  if (typeof window === "undefined") return result;
  const visit = getSessionUTM();
  if (visit) {
    for (const key of [...UTM_PARAMS, ...TRACKING_PARAMS]) {
      const value = visit[key];
      if (value) result[`cv_${key}`] = value;
    }
    const classification = classifyVisit(visit as Record<string, string>, window.location.origin);
    result.cv_source = classification.source;
    result.cv_medium = classification.medium;
    result.cv_channel = classification.channel;
    const landing = landingPath(visit.landing_page);
    if (landing) result.cv_landing_page = landing;
    if (classification.referrer) result.cv_referrer = classification.referrer;
    if (visit.timestamp) result.cv_timestamp = visit.timestamp;
  }
  return result;
}

/** Used at existing SPA route changes: no events, requests or additional storage keys. */
export function refreshAttributionActivity(): void {
  if (typeof window === "undefined") return;
  initUTMTracking();
  if (memorySession) {
    memorySession.last_activity = new Date().toISOString();
    if (optionalStorageAllowed()) writeStored("sessionStorage", SESSION_KEY, memorySession);
  }
}

export function clearUTMData(): void {
  memorySession = memoryLastTouch = memoryFirstTouch = null;
  initialised = false;
  if (typeof window === 'undefined') return;
  for (const [storage, key] of [["localStorage", UTM_STORAGE_KEY], ["localStorage", FIRST_TOUCH_KEY], ["sessionStorage", SESSION_KEY]] as const) {
    try { window[storage].removeItem(key); } catch { /* Also safe in privacy-restricted browsers. */ }
  }
}
