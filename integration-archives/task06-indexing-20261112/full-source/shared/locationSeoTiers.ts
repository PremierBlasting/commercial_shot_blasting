/**
 * Search prioritisation for the local-page catalogue.
 *
 * Search Console samples on 7 October 2026 showed hundreds of the generic local
 * templates as crawled but not selected. We therefore reserve indexation and
 * sitemap discovery for major commercial centres, high-impression destinations,
 * pages with sourced commercial context, and named local project evidence.
 *
 * Every other local route remains available to visitors and uses noindex,follow:
 * it can pass users to canonical services/county hubs without asking Google to
 * evaluate a large set of near-identical town templates.
 */
export const TIER_A_LOCATION_SLUGS = new Set([
  "birmingham", "manchester", "leeds", "sheffield", "bristol", "liverpool",
  "nottingham", "leicester", "coventry", "bradford", "cardiff", "southampton",
  "portsmouth", "derby", "wolverhampton", "stoke-on-trent", "reading",
  "cambridge", "peterborough", "norwich", "northampton", "oxford", "milton-keynes",
  "gloucester", "swindon", "luton", "warrington", "chester", "doncaster",
  "rotherham", "barnsley", "huddersfield", "stockport", "bolton", "salford",
  "oldham", "rochdale", "blackpool", "blackburn", "plymouth", "exeter", "york",
  "bath", "bournemouth", "brighton-and-hove", "basildon", "chelmsford", "colchester",
  "maidstone", "canterbury", "guildford", "woking",
]);

/** High-impression or named-evidence pages that are not already Tier A. */
export const INDEXABLE_EVIDENCE_LOCATION_SLUGS = new Set([
  // Search Console high-impression local destinations.
  "carlisle", "hitchin",
  // Sourced priority local commercial context.
  "bromsgrove", "bury-st-edmunds", "chepstow", "chesterfield", "crewe",
  "darlington", "gainsborough", "heanor", "newcastle-upon-tyne", "weston-super-mare",
  // Named, approved local case-study evidence.
  "wigan",
]);

/** Redirect-only catalogue records are neither search targets nor held towns. */
export const LOCATION_ALIAS_SLUGS = new Set(["stoke"]);
export type LocationSitemapTier = "A" | "B" | "alias" | "noindex";

export function isIndexableLocation(slug: string): boolean {
  if (LOCATION_ALIAS_SLUGS.has(slug)) return false;
  return TIER_A_LOCATION_SLUGS.has(slug) || INDEXABLE_EVIDENCE_LOCATION_SLUGS.has(slug);
}

/**
 * Tier B is a kept indexable evidence page. Aliases retain their redirect owner;
 * the remaining routes are noindex-follow visitor catalogue pages.
 */
export function getLocationSitemapTier(slug: string): LocationSitemapTier {
  if (LOCATION_ALIAS_SLUGS.has(slug)) return "alias";
  if (TIER_A_LOCATION_SLUGS.has(slug)) return "A";
  if (INDEXABLE_EVIDENCE_LOCATION_SLUGS.has(slug)) return "B";
  return "noindex";
}

export function shouldIncludeLocationInSitemap(slug: string): boolean {
  return isIndexableLocation(slug);
}

export function getLocationRobotsDirective(slug: string): string {
  return isIndexableLocation(slug)
    ? "index, follow, max-image-preview:large, max-snippet:-1"
    : "noindex, follow, max-image-preview:large, max-snippet:-1";
}
