/**
 * Canonical search-discovery catalogue shared by runtime and offline snapshots.
 * No database, network, private input or implicit clock reads belong here.
 * Historical sitemapLastModified maps remain provenance, not proof of the latest
 * significant rendered-page change. No scoped dependency dates are verified, so
 * these catalogue entries deliberately omit lastmod (including glossary pages).
 */
import { locationSlugIndex } from "../client/src/data/locationSlugIndex";
import { countyData } from "../client/src/data/countyData";
import { CANONICAL_SERVICE_SLUGS } from "./serviceSeoCatalog";
import { getLocationSitemapTier, shouldIncludeLocationInSitemap } from "./locationSeoTiers";

export const SITEMAP_SITE_URL = "https://commercialshotblasting.co.uk";
export const SITEMAP_CHILD_PATHS = [
  "/sitemap-main.xml",
  "/sitemap-counties.xml",
  "/sitemap-service-areas.xml",
  "/sitemap-blog.xml",
  "/sitemap-images.xml",
] as const;

export type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq: string;
  priority: string;
};

const STATIC_PAGES: readonly SitemapEntry[] = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/about", changefreq: "monthly", priority: "0.7" },
  { loc: "/chas-elite", changefreq: "monthly", priority: "0.7" },
  { loc: "/capability-statement", changefreq: "monthly", priority: "0.7" },
  { loc: "/contact", changefreq: "monthly", priority: "0.8" },
  { loc: "/services", changefreq: "weekly", priority: "0.9" },
  { loc: "/industries", changefreq: "weekly", priority: "0.9" },
  { loc: "/counties", changefreq: "weekly", priority: "0.8" },
  { loc: "/service-areas", changefreq: "weekly", priority: "0.9" },
  { loc: "/site-survey", changefreq: "monthly", priority: "0.8" },
  { loc: "/blog", changefreq: "weekly", priority: "0.7" },
  { loc: "/glossary", changefreq: "monthly", priority: "0.7" },
  { loc: "/reviews", changefreq: "monthly", priority: "0.6" },
  { loc: "/preparation-cleanup", changefreq: "monthly", priority: "0.6" },
  { loc: "/our-work", changefreq: "monthly", priority: "0.6" },
  { loc: "/case-studies/iss-property-former-bakkavor-foods-facility-wigan", changefreq: "monthly", priority: "0.8" },
  { loc: "/case-studies/hb-tunnelling-doncaster", changefreq: "monthly", priority: "0.8" },
  { loc: "/case-studies/bromsgrove-school-staircase", changefreq: "monthly", priority: "0.8" },
  { loc: "/case-studies/ade-power-wakefield-marine-cx-enclosures", changefreq: "monthly", priority: "0.8" },
  { loc: "/steel-fabrications", changefreq: "weekly", priority: "0.8" },
  { loc: "/steel-fabrication-surface-preparation", changefreq: "weekly", priority: "0.8" },
  { loc: "/steel-chimney-process-stack-surface-preparation", changefreq: "weekly", priority: "0.8" },
  { loc: "/industrial-steelwork-restoration", changefreq: "weekly", priority: "0.8" },
  { loc: "/factory-cladding-restoration", changefreq: "weekly", priority: "0.8" },
  { loc: "/process-pipework-spools-surface-preparation", changefreq: "weekly", priority: "0.8" },
  { loc: "/agricultural-steelwork-grain-store-preparation", changefreq: "weekly", priority: "0.8" },
  { loc: "/container-restoration-storage-steelwork", changefreq: "weekly", priority: "0.8" },
  { loc: "/mobile-on-site-shot-blasting", changefreq: "weekly", priority: "0.8" },
  { loc: "/intumescent-paint-for-steel", changefreq: "weekly", priority: "0.8" },
  { loc: "/commercial-shot-blasting-sandblasting", changefreq: "weekly", priority: "0.8" },
  { loc: "/commercial-blasting-specification-checklist", changefreq: "monthly", priority: "0.7" },
  { loc: "/external-staircases", changefreq: "weekly", priority: "0.8" },
  { loc: "/sitemap", changefreq: "monthly", priority: "0.5" },
];

export const SITEMAP_INDUSTRY_SLUGS = [
  "manufacturing", "construction", "agriculture", "aerospace", "marine",
  "heritage-restoration", "retail", "transport-logistics",
] as const;
const GLOSSARY_SLUGS = [
  "bs-en-iso-8501-1", "dft", "grit-blasting", "intumescent-paint", "mill-scale",
  "nace", "rust-grade", "sa-2-5", "sa-3", "shot-blasting", "sspc", "surface-profile",
] as const;

/** Accept only real calendar dates, ISO instants or valid Date records, not guesses.
 * asOf is an explicit validation ceiling, never a substitute content timestamp.
 */
export function validSitemapLastmod(value: unknown, asOf: Date): string | undefined {
  if (!Number.isFinite(asOf.getTime())) return undefined;
  let instant: Date;
  if (value instanceof Date) {
    instant = value;
  } else if (typeof value === "string") {
    const match = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,3})?(Z|[+-]\d{2}:\d{2}))?$/.exec(value);
    if (!match) return undefined;
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const calendar = new Date(0);
    calendar.setUTCFullYear(year, month - 1, day);
    calendar.setUTCHours(0, 0, 0, 0);
    if (year < 1 || calendar.getUTCFullYear() !== year || calendar.getUTCMonth() !== month - 1 || calendar.getUTCDate() !== day) return undefined;
    if (match[4] !== undefined) {
      if (Number(match[4]) > 23 || Number(match[5]) > 59 || Number(match[6]) > 59) return undefined;
      const offset = match[7];
      if (offset !== "Z") {
        const hours = Number(offset.slice(1, 3));
        const minutes = Number(offset.slice(4, 6));
        if (hours > 14 || minutes > 59 || (hours === 14 && minutes !== 0)) return undefined;
      }
    }
    instant = new Date(value);
  } else {
    return undefined;
  }
  if (!Number.isFinite(instant.getTime()) || instant.getTime() > asOf.getTime()) return undefined;
  const date = instant.toISOString().split("T")[0];
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && !date.startsWith("0000-") ? date : undefined;
}

/** Latest valid content-record date; invalid/missing/future candidates contribute nothing. */
export function latestValidSitemapLastmod(values: readonly unknown[], asOf: Date): string | undefined {
  return values.reduce<string | undefined>((latest, value) => {
    const date = validSitemapLastmod(value, asOf);
    return date && (!latest || date > latest) ? date : latest;
  }, undefined);
}

export function serviceSitemapEntries(): SitemapEntry[] {
  return CANONICAL_SERVICE_SLUGS.map((slug) => ({ loc: `/services/${slug}`, changefreq: "monthly", priority: "0.8" }));
}
export function industrySitemapEntries(): SitemapEntry[] {
  return SITEMAP_INDUSTRY_SLUGS.map((slug) => ({ loc: `/industries/${slug}`, changefreq: "monthly", priority: "0.8" }));
}
export function mainSitemapEntries(): SitemapEntry[] {
  return [
    ...STATIC_PAGES.map((page) => ({ ...page })),
    ...serviceSitemapEntries(),
    ...industrySitemapEntries(),
    ...GLOSSARY_SLUGS.map((slug) => ({ loc: `/glossary/${slug}`, changefreq: "monthly", priority: "0.6" })),
  ];
}
export function countySitemapEntries(): SitemapEntry[] {
  return Object.keys(countyData).map((slug) => ({ loc: `/counties/${slug}`, changefreq: "monthly", priority: "0.7" }));
}
export function serviceAreaSitemapEntries(): SitemapEntry[] {
  return Object.keys(locationSlugIndex).filter(shouldIncludeLocationInSitemap).map((slug) => {
    const tier = getLocationSitemapTier(slug);
    return { loc: `/service-areas/${slug}`, changefreq: tier === "A" ? "weekly" : "monthly", priority: tier === "A" ? "0.8" : "0.6" };
  });
}

export function escapeSitemapXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
export function renderSitemapUrlSet(entries: readonly SitemapEntry[], asOf: Date): string {
  const urls = entries.map((entry) => {
    const lastmod = validSitemapLastmod(entry.lastmod, asOf);
    return `  <url>\n    <loc>${escapeSitemapXml(`${SITEMAP_SITE_URL}${entry.loc}`)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n    <changefreq>${escapeSitemapXml(entry.changefreq)}</changefreq>\n    <priority>${escapeSitemapXml(entry.priority)}</priority>\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}
export function renderSitemapIndex(): string {
  // No reliable child-sitemap change records: do not add child lastmod.
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${SITEMAP_CHILD_PATHS.map((child) => `  <sitemap>\n    <loc>${SITEMAP_SITE_URL}${child}</loc>\n  </sitemap>`).join("\n")}\n</sitemapindex>\n`;
}

/** Retained compatibility mirrors; blog membership remains database-owned at runtime. */
export function staticSitemapSnapshots(asOf: Date): Record<string, string> {
  return {
    "sitemap.xml": renderSitemapIndex(),
    "sitemap-main.xml": renderSitemapUrlSet(mainSitemapEntries(), asOf),
    "sitemap-counties.xml": renderSitemapUrlSet(countySitemapEntries(), asOf),
    "sitemap-service-areas.xml": renderSitemapUrlSet(serviceAreaSitemapEntries(), asOf),
    "sitemap-services.xml": renderSitemapUrlSet(serviceSitemapEntries(), asOf),
    "sitemap-industries.xml": renderSitemapUrlSet(industrySitemapEntries(), asOf),
  };
}

/** Preserve the complete image catalogue byte-for-byte except its unverified parent date. */
export function omitUnverifiedImageParentLastmod(xml: string): string {
  return xml.replace(/^[\t ]*<lastmod>[^<]*<\/lastmod>\r?\n/gm, "");
}
