import { locationSlugIndex } from "../client/src/data/locationSlugIndex";
import { getLocationRobotsDirective } from "./locationSeoTiers";
import { isCanonicalServiceSlug } from "./serviceSeoCatalog";

export const INDEX_FOLLOW = "index, follow";
export const NOINDEX_FOLLOW = "noindex, follow";
export const NOINDEX_NOFOLLOW = "noindex, nofollow";
export const DEFAULT_PAGE_ROBOTS = "index, follow, max-image-preview:large";
export const PREVIEW_PAGE_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1";

const legalAndProvisionalPaths = new Set([
  "/privacy-policy", "/terms-of-service", "/case-studies/fire-escape-multi-storey-office",
]);
const internalPaths = new Set(["/admin", "/call-analytics"]);
// Maintained literal public routes only. Aliases and unknown content are not
// declared published by this metadata policy; existing route/status owners decide.
const publicPaths = new Set([
  "/", "/contact", "/about", "/chas-elite", "/capability-statement",
  "/preparation-cleanup", "/our-work", "/reviews",
  "/case-studies/iss-property-former-bakkavor-foods-facility-wigan",
  "/case-studies/hb-tunnelling-doncaster", "/case-studies/bromsgrove-school-staircase",
  "/case-studies/ade-power-wakefield-marine-cx-enclosures",
  "/steel-fabrications", "/steel-fabrication-surface-preparation",
  "/steel-chimney-process-stack-surface-preparation", "/industrial-steelwork-restoration",
  "/factory-cladding-restoration", "/process-pipework-spools-surface-preparation",
  "/agricultural-steelwork-grain-store-preparation", "/container-restoration-storage-steelwork",
  "/mobile-on-site-shot-blasting", "/intumescent-paint-for-steel",
  "/commercial-shot-blasting-sandblasting", "/external-staircases",
  "/commercial-blasting-specification-checklist", "/services", "/industries", "/counties",
  "/site-survey", "/terms", "/glossary", "/blog", "/service-areas", "/sitemap",
]);
const countySlugs = new Set([
  "bedfordshire", "cambridgeshire", "hertfordshire", "norfolk", "suffolk",
  "derbyshire", "leicestershire", "lincolnshire", "northamptonshire", "nottinghamshire",
  "herefordshire", "shropshire", "staffordshire", "warwickshire", "west-midlands", "worcestershire",
  "south-yorkshire", "north-yorkshire", "west-yorkshire", "cheshire", "gloucestershire",
  "north-devon", "somerset", "wiltshire", "buckinghamshire", "east-wales", "greater-manchester",
  "essex", "berkshire", "hampshire", "lancashire", "cumbria", "durham", "tyne-and-wear",
  "northumberland", "cornwall", "kent", "devon", "merseyside", "oxfordshire", "surrey", "sussex", "dorset",
]);
const industrySlugs = new Set([
  "manufacturing", "construction", "agriculture", "aerospace", "marine",
  "heritage-restoration", "retail", "transport-logistics",
]);

/** Parse for matching only: never mutate, reorder or strip the visitor's query.
 * Reject encoded separators/dot segments rather than treating them as a page.
 */
export function getPageIndexingPath(originalUrl: string): string | undefined {
  const raw = originalUrl.split(/[?#]/, 1)[0];
  if (!raw.startsWith("/") || raw.startsWith("//") || /[\\\x00-\x1f\x7f]/.test(raw)) return undefined;
  try {
    const pieces = raw.split("/").map(piece => decodeURIComponent(piece));
    if (pieces.some(piece => piece === "." || piece === ".." || /[/\\\x00-\x1f\x7f]/.test(piece))) return undefined;
    const pathname = pieces.join("/");
    return pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  } catch {
    return undefined;
  }
}

/** Exact destination robots policy, not a route-existence/publication verdict.
 * Unknown routes (including database-backed blog details) return undefined so
 * callers retain their own content/error contract. Never apply this to a 503
 * as a false-deletion directive. Internal noindex is not access control.
 */
export function getPageRobotsDirective(originalUrl: string): string | undefined {
  const pathname = getPageIndexingPath(originalUrl);
  if (!pathname) return undefined;
  if (internalPaths.has(pathname)) return NOINDEX_NOFOLLOW;
  if (legalAndProvisionalPaths.has(pathname)) return NOINDEX_FOLLOW;
  const town = pathname.match(/^\/service-areas\/([^/]+)$/);
  if (town) {
    return Object.prototype.hasOwnProperty.call(locationSlugIndex, town[1])
      ? getLocationRobotsDirective(town[1]) : undefined;
  }
  const service = pathname.match(/^\/services\/([^/]+)$/);
  if (service) return isCanonicalServiceSlug(service[1]) ? PREVIEW_PAGE_ROBOTS : undefined;
  const county = pathname.match(/^\/counties\/([^/]+)$/);
  if (county) return countySlugs.has(county[1]) ? DEFAULT_PAGE_ROBOTS : undefined;
  const industry = pathname.match(/^\/industries\/([^/]+)$/);
  if (industry) return industrySlugs.has(industry[1]) ? DEFAULT_PAGE_ROBOTS : undefined;
  if (!publicPaths.has(pathname)) return undefined;
  if (["/contact", "/our-work", "/preparation-cleanup", "/sitemap"].includes(pathname)) return INDEX_FOLLOW;
  if (["/about", "/glossary"].includes(pathname)) return PREVIEW_PAGE_ROBOTS;
  return DEFAULT_PAGE_ROBOTS;
}

// Compatibility name for server consumers; both exports have the same contract.
export const getPageIndexingDirective = getPageRobotsDirective;
