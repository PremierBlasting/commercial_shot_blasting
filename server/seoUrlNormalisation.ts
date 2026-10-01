import { countyData } from "../client/src/data/countyData";
import { locationSlugIndex } from "../client/src/data/locationSlugIndex";

type Soft404PathResolution =
  | { type: "redirect"; destination: string }
  | { type: "not-found" };

const CANONICAL_INDUSTRY_SLUGS = new Set([
  "manufacturing",
  "construction",
  "agriculture",
  "aerospace",
  "marine",
  "heritage-restoration",
  "retail",
  "transport-logistics",
]);

/** Retired town names with an accurate county-hub successor rather than a town page. */
const RETIRED_SERVICE_AREA_SUCCESSORS: Record<string, string> = {
  "west-midlands": "/counties/west-midlands",
  andover: "/counties/hampshire",
  alnwick: "/counties/northumberland",
  kendal: "/counties/cumbria",
  windsor: "/counties/berkshire",
  newbury: "/counties/berkshire",
  leyland: "/counties/lancashire",
  fareham: "/counties/hampshire",
};

/** Historic root URLs that have one clear current equivalent. */
const LEGACY_ROOT_REDIRECTS: Record<string, string> = {
  "/privacy": "/privacy-policy",
  "/gloucestershire": "/counties/gloucestershire",
  "/hertfordshire": "/counties/hertfordshire",
  "/staffordshire": "/counties/staffordshire",
  "/preparation-and-cleanup": "/prep-and-cleanup",
};

// This historic coverage page conflicts with the current England-and-Wales
// scope, so it must retire rather than redirecting visitors to an inaccurate
// successor.
const RETIRED_ROOT_PATHS = new Set(["/uk"]);

/** Only redirect retired industry URLs where one genuinely equivalent service survives. */
const LEGACY_INDUSTRY_REDIRECTS: Record<string, string> = {
  automotive: "/services/commercial-vehicles",
};

/** A single erroneous punctuation variant reported in the Search Console export. */
const LEGACY_LOCATION_ALIASES: Record<string, string> = {
  "westward-ho!": "westward-ho",
};

function getQuery(originalUrl: string): string {
  const queryStart = originalUrl.indexOf("?");
  return queryStart >= 0 ? originalUrl.slice(queryStart) : "";
}

function decodePathSegment(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function getCanonicalLocationSlug(value: string): string | null {
  const slug = LEGACY_LOCATION_ALIASES[decodePathSegment(value)] ?? decodePathSegment(value);
  return locationSlugIndex[slug] ? slug : null;
}

function withQuery(destination: string, originalUrl: string): string {
  return `${destination}${getQuery(originalUrl)}`;
}

function getLegacyLocationResolution(
  prefix: "/areas/" | "/locations/" | "/service-area/",
  requestPath: string,
  originalUrl: string,
): Soft404PathResolution | null {
  if (!requestPath.startsWith(prefix)) return null;
  const slug = requestPath.slice(prefix.length);
  if (!slug || slug.includes("/")) return { type: "not-found" };

  const canonicalSlug = getCanonicalLocationSlug(slug);
  if (canonicalSlug) {
    return { type: "redirect", destination: withQuery(`/service-areas/${canonicalSlug}`, originalUrl) };
  }

  // The historic singular pattern also contained county-level URLs such as
  // /service-area/lincolnshire. Preserve that useful intent with the real hub.
  if (prefix === "/service-area/" && countyData[slug]) {
    return { type: "redirect", destination: withQuery(`/counties/${slug}`, originalUrl) };
  }

  return { type: "not-found" };
}

/**
 * Resolves stale local URL patterns before the SPA fallback runs. A return of
 * null means the path is a current canonical URL (or is outside this scope).
 */
export function getSoft404PathResolution(requestPath: string, originalUrl: string): Soft404PathResolution | null {
  const rootDestination = LEGACY_ROOT_REDIRECTS[requestPath];
  if (rootDestination) {
    return { type: "redirect", destination: withQuery(rootDestination, originalUrl) };
  }
  if (RETIRED_ROOT_PATHS.has(requestPath)) return { type: "not-found" };

  for (const prefix of ["/areas/", "/locations/", "/service-area/"] as const) {
    const resolution = getLegacyLocationResolution(prefix, requestPath, originalUrl);
    if (resolution) return resolution;
  }

  const legacyHtmlMatch = requestPath.match(/^\/service-areas\/([^/]+)(?:\.html|\/index\.html)$/);
  if (legacyHtmlMatch) {
    const canonicalSlug = getCanonicalLocationSlug(legacyHtmlMatch[1]);
    return canonicalSlug
      ? { type: "redirect", destination: withQuery(`/service-areas/${canonicalSlug}`, originalUrl) }
      : { type: "not-found" };
  }

  if (requestPath.startsWith("/service-areas/")) {
    const slug = requestPath.slice("/service-areas/".length);
    if (!slug || slug.includes("/")) return { type: "not-found" };
    const successor = RETIRED_SERVICE_AREA_SUCCESSORS[slug];
    if (successor) return { type: "redirect", destination: withQuery(successor, originalUrl) };
    return locationSlugIndex[slug] ? null : { type: "not-found" };
  }

  if (requestPath.startsWith("/counties/")) {
    const slug = requestPath.slice("/counties/".length);
    if (!slug || slug.includes("/") || !countyData[slug]) return { type: "not-found" };
  }

  if (requestPath.startsWith("/industries/")) {
    const slug = requestPath.slice("/industries/".length);
    const successor = LEGACY_INDUSTRY_REDIRECTS[slug];
    if (successor) return { type: "redirect", destination: withQuery(successor, originalUrl) };
    if (!slug || slug.includes("/") || !CANONICAL_INDUSTRY_SLUGS.has(slug)) return { type: "not-found" };
  }

  // Google discovered a source-location suffix appended to a stale Vite asset.
  // It cannot identify an actual deployment asset and must never fall through to
  // an HTML 200 response.
  if (requestPath.startsWith("/assets/") && requestPath.includes(":")) {
    return { type: "not-found" };
  }

  return null;
}

/**
 * Returns the one canonical non-trailing-slash service-area URL while retaining
 * query parameters used for attribution. Non-location requests are unchanged.
 */
export function getCanonicalServiceAreaRedirect(requestPath: string, originalUrl: string): string | null {
  const query = getQuery(originalUrl);

  if (requestPath === "/service-areas/stoke") {
    return `/service-areas/stoke-on-trent${query}`;
  }

  if (!requestPath.startsWith("/service-areas/") || !requestPath.endsWith("/")) {
    return null;
  }

  const slug = requestPath.slice("/service-areas/".length, -1);
  const successor = RETIRED_SERVICE_AREA_SUCCESSORS[slug];
  if (successor) return `${successor}${query}`;
  return locationSlugIndex[slug] ? `${requestPath.slice(0, -1)}${query}` : null;
}
