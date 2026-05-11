/**
 * Dynamic sitemap.xml generator for commercialshotblasting.co.uk
 *
 * Covers:
 *  - Static pages (home, about, contact, services index, industries index, areas index, blog, reviews)
 *  - 18 service detail pages
 *  - 8 industry pages
 *  - 30 county pages
 *  - 650 service-area (town) pages
 */

import type { Express } from "express";

const SITE_URL = "https://commercialshotblasting.co.uk";

// ── Static pages ──────────────────────────────────────────────────────────────
const STATIC_PAGES = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/about", changefreq: "monthly", priority: "0.7" },
  { loc: "/contact", changefreq: "monthly", priority: "0.8" },
  { loc: "/services", changefreq: "weekly", priority: "0.9" },
  { loc: "/industries", changefreq: "weekly", priority: "0.9" },
  { loc: "/service-areas", changefreq: "weekly", priority: "0.9" },
  { loc: "/blog", changefreq: "weekly", priority: "0.7" },
  { loc: "/reviews", changefreq: "monthly", priority: "0.6" },
  { loc: "/prep-and-cleanup", changefreq: "monthly", priority: "0.6" },
  { loc: "/our-work", changefreq: "monthly", priority: "0.6" },
];

// ── Service pages ─────────────────────────────────────────────────────────────
const SERVICE_SLUGS = [
  "structural-steel-shot-blasting",
  "container-shot-blasting",
  "factory-cladding-shot-blasting",
  "floor-shot-blasting",
  "fire-escape-shot-blasting",
  "pipework-shot-blasting",
  "agricultural-shot-blasting",
  "telecom-tower-shot-blasting",
  "machinery-shot-blasting",
  "racking-shot-blasting",
  "marine-shot-blasting",
  "heritage-shot-blasting",
  "rust-removal",
  "mill-scale-removal",
  "paint-stripping",
  "coating-removal",
  "surface-preparation",
  "mobile-shot-blasting",
];

// ── Industry pages ────────────────────────────────────────────────────────────
const INDUSTRY_SLUGS = [
  "manufacturing",
  "construction",
  "agriculture",
  "aerospace",
  "marine",
  "heritage-restoration",
  "retail",
  "transport-logistics",
];

// ── County slugs ──────────────────────────────────────────────────────────────
const COUNTY_SLUGS = [
  "cambridgeshire",
  "essex",
  "hertfordshire",
  "norfolk",
  "suffolk",
  "derbyshire",
  "leicestershire",
  "lincolnshire",
  "northamptonshire",
  "nottinghamshire",
  "herefordshire",
  "shropshire",
  "staffordshire",
  "warwickshire",
  "west-midlands",
  "worcestershire",
  "south-yorkshire",
  "west-yorkshire",
  "north-yorkshire",
  "cheshire",
  "greater-manchester",
  "lancashire",
  "merseyside",
  "cumbria",
  "county-durham",
  "tyne-and-wear",
  "northumberland",
  "gloucestershire",
  "north-devon",
  "somerset",
  "wiltshire",
  "buckinghamshire",
  "berkshire",
  "hampshire",
  "east-wales",
];

// ── Town slugs (650 service-area pages) ───────────────────────────────────────
// Loaded from locationData.ts at startup — extracted via regex to avoid importing TS at runtime
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// __dirname shim for ESM / tsx environments
const _dirname = (() => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return path.dirname(fileURLToPath(import.meta.url));
  } catch {
    // CommonJS fallback
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return __dirname;
  }
})();

function loadTownSlugs(): string[] {
  try {
    // We read the source file directly (it's always present in both dev and prod)
    const candidates = [
      path.resolve(process.cwd(), "client/src/data/locationData.ts"),
      path.resolve(_dirname, "../../client/src/data/locationData.ts"),
      path.resolve(_dirname, "../../../client/src/data/locationData.ts"),
      path.resolve(_dirname, "../../../../client/src/data/locationData.ts"),
    ];
    for (const candidate of candidates) {
      if (fs.existsSync(candidate)) {
        const content = fs.readFileSync(candidate, "utf-8");
        const slugs: string[] = [];
        let m: RegExpExecArray | null;
        const re = /slug:\s*['"]([ a-z0-9-]+)['"]/g;
        while ((m = re.exec(content)) !== null) {
          slugs.push(m[1]);
        }
        // Deduplicate while preserving order
        const seen = new Set<string>();
        return slugs.filter(s => { if (seen.has(s)) return false; seen.add(s); return true; });
      }
    }
  } catch (e) {
    console.error("[Sitemap] Failed to load town slugs:", e);
  }
  return [];
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSitemap(): string {
  const townSlugs = loadTownSlugs();
  const today = new Date().toISOString().split("T")[0];

  const urls: string[] = [];

  // Static pages
  for (const page of STATIC_PAGES) {
    urls.push(
      `  <url>\n    <loc>${escapeXml(SITE_URL + page.loc)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`
    );
  }

  // Service pages
  for (const slug of SERVICE_SLUGS) {
    urls.push(
      `  <url>\n    <loc>${escapeXml(`${SITE_URL}/services/${slug}`)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`
    );
  }

  // Industry pages
  for (const slug of INDUSTRY_SLUGS) {
    urls.push(
      `  <url>\n    <loc>${escapeXml(`${SITE_URL}/industries/${slug}`)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`
    );
  }

  // County pages
  for (const slug of COUNTY_SLUGS) {
    urls.push(
      `  <url>\n    <loc>${escapeXml(`${SITE_URL}/counties/${slug}`)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    );
  }

  // Town / service-area pages
  for (const slug of townSlugs) {
    urls.push(
      `  <url>\n    <loc>${escapeXml(`${SITE_URL}/service-areas/${slug}`)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
}

export function registerSitemapRoute(app: Express): void {
  app.get("/sitemap.xml", (_req, res) => {
    const xml = buildSitemap();
    res.set("Content-Type", "application/xml; charset=utf-8");
    res.set("Cache-Control", "public, max-age=3600"); // cache 1 hour
    res.send(xml);
  });
}
