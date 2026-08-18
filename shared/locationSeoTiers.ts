/**
 * Search prioritisation for the local-page catalogue. Tier A pages are major
 * commercial centres receiving weekly sitemap hints and the strongest internal
 * linking. Tier B retains the evidence-backed wider England and Wales catalogue.
 * A slug can be moved to the review set if its local evidence is later withdrawn.
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

/** Intentionally empty until a content review identifies pages without usable evidence. */
export const LOCAL_PAGE_REVIEW_SLUGS = new Set<string>();

export function getLocationSitemapTier(slug: string): "A" | "B" | "review" {
  if (LOCAL_PAGE_REVIEW_SLUGS.has(slug)) return "review";
  return TIER_A_LOCATION_SLUGS.has(slug) ? "A" : "B";
}

export function shouldIncludeLocationInSitemap(slug: string): boolean {
  return getLocationSitemapTier(slug) !== "review";
}
