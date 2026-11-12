import { countyData } from "../client/src/data/countyData";
import { locationSlugIndex } from "../client/src/data/locationSlugIndex";
import { CANONICAL_SERVICE_SLUGS, LEGACY_ROOT_SERVICE_REDIRECTS, LEGACY_SERVICE_REDIRECTS } from "../shared/serviceSeoCatalog";

type Soft404PathResolution =
  | { type: "redirect"; destination: string }
  | { type: "not-found" };

/** Exact maintained literal App routes; aliases, dynamic patterns and /404 are not page owners. */
export const MAINTAINED_STATIC_PATHS: readonly string[] = Object.freeze([
  "/",
  "/contact",
  "/about",
  "/chas-elite",
  "/capability-statement",
  "/preparation-cleanup",
  "/our-work",
  "/admin",
  "/call-analytics",
  "/reviews",
  "/case-studies/iss-property-former-bakkavor-foods-facility-wigan",
  "/case-studies/hb-tunnelling-doncaster",
  "/case-studies/bromsgrove-school-staircase",
  "/case-studies/fire-escape-multi-storey-office",
  "/case-studies/ade-power-wakefield-marine-cx-enclosures",
  "/steel-fabrications",
  "/steel-fabrication-surface-preparation",
  "/steel-chimney-process-stack-surface-preparation",
  "/industrial-steelwork-restoration",
  "/factory-cladding-restoration",
  "/process-pipework-spools-surface-preparation",
  "/agricultural-steelwork-grain-store-preparation",
  "/container-restoration-storage-steelwork",
  "/mobile-on-site-shot-blasting",
  "/intumescent-paint-for-steel",
  "/commercial-shot-blasting-sandblasting",
  "/external-staircases",
  "/services/car-park-paint-removal",
  "/services/intumescent-painting",
  "/services/marine-cx-surface-preparation",
  "/commercial-blasting-specification-checklist",
  "/services",
  "/industries",
  "/counties",
  "/industries/construction",
  "/industries/manufacturing",
  "/industries/retail",
  "/industries/aerospace",
  "/industries/marine",
  "/industries/agriculture",
  "/industries/transport-logistics",
  "/industries/heritage-restoration",
  "/site-survey",
  "/privacy-policy",
  "/terms",
  "/terms-of-service",
  "/glossary",
  "/blog",
  "/service-areas",
  "/counties/bedfordshire",
  "/counties/cambridgeshire",
  "/counties/hertfordshire",
  "/counties/norfolk",
  "/counties/suffolk",
  "/counties/derbyshire",
  "/counties/leicestershire",
  "/counties/lincolnshire",
  "/counties/northamptonshire",
  "/counties/nottinghamshire",
  "/counties/herefordshire",
  "/counties/shropshire",
  "/counties/staffordshire",
  "/counties/warwickshire",
  "/counties/west-midlands",
  "/counties/worcestershire",
  "/counties/south-yorkshire",
  "/counties/north-yorkshire",
  "/counties/west-yorkshire",
  "/counties/cheshire",
  "/counties/gloucestershire",
  "/counties/north-devon",
  "/counties/somerset",
  "/counties/wiltshire",
  "/counties/buckinghamshire",
  "/counties/east-wales",
  "/counties/greater-manchester",
  "/counties/essex",
  "/counties/berkshire",
  "/counties/hampshire",
  "/counties/lancashire",
  "/counties/cumbria",
  "/counties/durham",
  "/counties/tyne-and-wear",
  "/counties/northumberland",
  "/counties/cornwall",
  "/counties/kent",
  "/counties/devon",
  "/counties/merseyside",
  "/counties/oxfordshire",
  "/counties/surrey",
  "/counties/sussex",
  "/counties/dorset",
  "/sitemap",
]);

export function getMaintainedStaticPaths(): readonly string[] {
  return MAINTAINED_STATIC_PATHS;
}

const maintainedStaticPaths = new Set(MAINTAINED_STATIC_PATHS);
const canonicalServiceSlugs = new Set<string>(CANONICAL_SERVICE_SLUGS);
const CANONICAL_INDUSTRY_SLUGS = new Set([
  "manufacturing", "construction", "agriculture", "aerospace", "marine",
  "heritage-restoration", "retail", "transport-logistics",
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

/** Historic URLs with one established final page owner. */
const LEGACY_ROOT_REDIRECTS: Record<string, string> = {
  "/privacy": "/privacy-policy",
  "/gloucestershire": "/counties/gloucestershire",
  "/hertfordshire": "/counties/hertfordshire",
  "/staffordshire": "/counties/staffordshire",
  "/preparation-and-cleanup": "/preparation-cleanup",
  "/prep-and-cleanup": "/preparation-cleanup",
  "/gallery": "/our-work",
  "/free-site-survey": "/site-survey",
  "/case-studies/structural-steel": "/case-studies/iss-property-former-bakkavor-foods-facility-wigan",
};
const LEGACY_COUNTY_REDIRECTS: Record<string, string> = {
  "/counties/county-durham": "/counties/durham",
};
// This historic coverage page conflicts with the current England-and-Wales scope.
const RETIRED_ROOT_PATHS = new Set(["/uk"]);
const LEGACY_INDUSTRY_REDIRECTS: Record<string, string> = {
  automotive: "/services/commercial-vehicles",
};
const LEGACY_LOCATION_ALIASES: Record<string, string> = {
  "westward-ho!": "westward-ho",
};

function ownValue<T>(record: Record<string, T>, key: string): T | undefined {
  return Object.prototype.hasOwnProperty.call(record, key) ? record[key] : undefined;
}

/** Do not parse, reorder, decode or drop duplicate/empty attribution parameters. */
function withQuery(destination: string, originalUrl: string): string {
  const queryStart = originalUrl.indexOf("?");
  return destination + (queryStart >= 0 ? originalUrl.slice(queryStart) : "");
}

/** Decode once, segment by segment; never turn encoded separators or traversal into routes. */
function normaliseKnownPath(requestPath: string): string | null {
  if (!requestPath.startsWith("/") || requestPath.includes("//")) return null;
  const withoutSlash = requestPath !== "/" && requestPath.endsWith("/")
    ? requestPath.slice(0, -1) : requestPath;
  if (withoutSlash === "/") return "/";
  const segments: string[] = [];
  for (const value of withoutSlash.slice(1).split("/")) {
    let decoded: string;
    try {
      decoded = decodeURIComponent(value);
    } catch {
      return null;
    }
    if (!decoded || decoded === "." || decoded === ".." || /[/%\\?#\u0000-\u0020\u007f]/.test(decoded)) return null;
    segments.push(decoded);
  }
  return `/${segments.join("/")}`;
}

function getCanonicalLocationPath(slug: string): string | null {
  const canonicalSlug = ownValue(LEGACY_LOCATION_ALIASES, slug) ?? slug;
  if (!ownValue(locationSlugIndex, canonicalSlug)) return null;
  return `/service-areas/${canonicalSlug === "stoke" ? "stoke-on-trent" : canonicalSlug}`;
}

/**
 * Early finite alias/slash resolver. Returns a final path plus the untouched raw
 * query suffix, or null for canonical/unrecognised/unsafe paths. Dynamic blog and
 * glossary detail slashes belong to their healthy authoritative existence lookup.
 */
export function getKnownPageRedirect(requestPath: string, originalUrl: string): string | null {
  const path = normaliseKnownPath(requestPath);
  if (!path) return null;
  let destination = ownValue(LEGACY_ROOT_REDIRECTS, path)
    ?? ownValue(LEGACY_ROOT_SERVICE_REDIRECTS, path)
    ?? ownValue(LEGACY_COUNTY_REDIRECTS, path);

  if (!destination && maintainedStaticPaths.has(path)) destination = path;

  const serviceMatch = path.match(/^\/services\/([^/]+)$/);
  if (!destination && serviceMatch) {
    const slug = serviceMatch[1];
    destination = canonicalServiceSlugs.has(slug) ? path : ownValue(LEGACY_SERVICE_REDIRECTS, slug);
  }

  const locationMatch = path.match(/^\/service-areas\/([^/]+)$/);
  if (!destination && locationMatch && !locationMatch[1].endsWith(".html")) {
    destination = ownValue(RETIRED_SERVICE_AREA_SUCCESSORS, locationMatch[1])
      ?? getCanonicalLocationPath(locationMatch[1]) ?? undefined;
  }

  const legacyLocalMatch = path.match(/^\/(areas|locations|service-area)\/([^/]+)$/);
  if (!destination && legacyLocalMatch) {
    destination = getCanonicalLocationPath(legacyLocalMatch[2]) ?? undefined;
    if (!destination && legacyLocalMatch[1] === "service-area" && ownValue(countyData, legacyLocalMatch[2])) {
      destination = `/counties/${legacyLocalMatch[2]}`;
    }
  }

  const legacyHtmlMatch = path.match(/^\/service-areas\/([^/]+?)(?:\.html|\/index\.html)$/);
  if (!destination && legacyHtmlMatch) destination = getCanonicalLocationPath(legacyHtmlMatch[1]) ?? undefined;

  const countyMatch = path.match(/^\/counties\/([^/]+)$/);
  if (!destination && countyMatch && ownValue(countyData, countyMatch[1])) destination = path;

  const industryMatch = path.match(/^\/industries\/([^/]+)$/);
  if (!destination && industryMatch) {
    destination = ownValue(LEGACY_INDUSTRY_REDIRECTS, industryMatch[1]);
    if (!destination && CANONICAL_INDUSTRY_SLUGS.has(industryMatch[1])) destination = path;
  }

  return destination && destination !== requestPath ? withQuery(destination, originalUrl) : null;
}

/** Retain the scoped missing-route policy; unknown paths never get guessed successors. */
export function getSoft404PathResolution(requestPath: string, originalUrl: string): Soft404PathResolution | null {
  const redirect = getKnownPageRedirect(requestPath, originalUrl);
  if (redirect) return { type: "redirect", destination: redirect };
  const path = normaliseKnownPath(requestPath);
  if (path && RETIRED_ROOT_PATHS.has(path)) return { type: "not-found" };

  for (const prefix of ["/areas/", "/locations/", "/service-area/"] as const) {
    if (requestPath.startsWith(prefix)) return { type: "not-found" };
  }
  if (requestPath.startsWith("/service-areas/")) {
    const slug = path?.slice("/service-areas/".length);
    return slug && !slug.includes("/") && ownValue(locationSlugIndex, slug) ? null : { type: "not-found" };
  }
  if (requestPath.startsWith("/counties/")) {
    const slug = path?.slice("/counties/".length);
    if (!slug || slug.includes("/") || !ownValue(countyData, slug)) return { type: "not-found" };
  }
  if (requestPath.startsWith("/industries/")) {
    const slug = path?.slice("/industries/".length);
    if (!slug || slug.includes("/") || !CANONICAL_INDUSTRY_SLUGS.has(slug)) return { type: "not-found" };
  }
  // A source-location suffix on a stale asset cannot identify a real deployment resource.
  if (requestPath.startsWith("/assets/") && requestPath.includes(":")) return { type: "not-found" };
  return null;
}

/** Backward-compatible service-area entry point, resolving Stoke directly in one hop. */
export function getCanonicalServiceAreaRedirect(requestPath: string, originalUrl: string): string | null {
  if (!requestPath.startsWith("/service-areas/")) return null;
  const path = normaliseKnownPath(requestPath);
  if (!path || path.includes(".html")) return null;
  return getKnownPageRedirect(requestPath, originalUrl);
}
