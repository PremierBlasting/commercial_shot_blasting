/**
 * The single source of truth for indexable Commercial Shot Blasting service URLs.
 * Keep sitemap entries, redirects, SSR content, structured data, and project cards
 * aligned to these routes so crawlers never receive competing service URLs.
 */
export const CANONICAL_SERVICE_SLUGS = [
  "structural-steel-frames",
  "steel-chimney-surface-preparation",
  "steel-containers",
  "factory-cladding",
  "fire-escapes",
  "staircases",
  "bridge-steelwork",
  "ladders",
  "warehouse-racking",
  "pipework",
  "telecom-towers",
  "floor-preparation",
  "powder-coating",
  "commercial-radiators",
  "commercial-vehicles",
  "steel-doors",
  "steel-sheeting",
  "steel-gates",
  "plant-machinery",
  "intumescent-painting",
  "marine-shot-blasting",
  "rust-removal",
  "mill-scale-removal",
  "paint-stripping",
  "coating-removal",
  "agricultural-shot-blasting",
  "car-park-paint-removal",
] as const;

export type CanonicalServiceSlug = (typeof CANONICAL_SERVICE_SLUGS)[number];

/** Historic aliases that must never be emitted as indexable internal URLs. */
export const LEGACY_SERVICE_REDIRECTS: Record<string, string> = {
  "structural-steel-shot-blasting": "/services/structural-steel-frames",
  "container-shot-blasting": "/services/steel-containers",
  "factory-cladding-shot-blasting": "/services/factory-cladding",
  "floor-shot-blasting": "/services/floor-preparation",
  "fire-escape-shot-blasting": "/services/fire-escapes",
  "pipework-shot-blasting": "/services/pipework",
  "telecom-tower-shot-blasting": "/services/telecom-towers",
  "machinery-shot-blasting": "/services/plant-machinery",
  "racking-shot-blasting": "/services/warehouse-racking",
  "heritage-shot-blasting": "/industries/heritage-restoration",
  "surface-preparation": "/services",
  "mobile-shot-blasting": "/services",
  "marine-services": "/services/marine-shot-blasting",
  "bridge-steelwork-shot-blasting": "/services/bridge-steelwork",
  "automotive-restoration": "/services/commercial-vehicles",
  "steel-shot-blasting": "/services/structural-steel-frames",
};

const canonicalServiceSet = new Set<string>(CANONICAL_SERVICE_SLUGS);

export function isCanonicalServiceSlug(slug: string): slug is CanonicalServiceSlug {
  return canonicalServiceSet.has(slug);
}

export function getCanonicalServicePath(slug: string): string | undefined {
  if (isCanonicalServiceSlug(slug)) return `/services/${slug}`;
  return LEGACY_SERVICE_REDIRECTS[slug];
}

/** Rewrites legacy service links in generated crawler-visible HTML and JSON-LD. */
export function normaliseServiceUrls(html: string): string {
  return Object.entries(LEGACY_SERVICE_REDIRECTS).reduce(
    (result, [legacySlug, canonicalPath]) => result.replace(
      new RegExp(`/services/${legacySlug}(?=["'\\s?#<])`, "g"),
      canonicalPath,
    ),
    html,
  );
}
