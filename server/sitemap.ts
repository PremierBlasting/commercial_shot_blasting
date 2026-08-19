/**
 * Dynamic sitemap.xml generator for commercialshotblasting.co.uk
 *
 * Covers:
 *  - Static pages (home, about, contact, services index, industries index, areas index, blog, reviews)
 *  - 18 service detail pages
 *  - 8 industry pages
 *  - Every registered county hub
 *  - Every current service-area (town) page
 */

import type { Express } from "express";
import { getPublishedBlogPosts, getActiveGalleryItems } from "./db";
import { locationSlugIndex } from "../client/src/data/locationSlugIndex";
import { countyData } from "../client/src/data/countyData";
import { countyLastModified, locationLastModified } from "@shared/sitemapLastModified";
import { CANONICAL_SERVICE_SLUGS } from "@shared/serviceSeoCatalog";
import { getLocationSitemapTier, shouldIncludeLocationInSitemap } from "@shared/locationSeoTiers";

const SITE_URL = "https://commercialshotblasting.co.uk";
const CATALOGUE_BASELINE_LASTMOD = "2026-02-18";

// ── Static pages ──────────────────────────────────────────────────────────────
const STATIC_PAGES = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/about", changefreq: "monthly", priority: "0.7" },
  { loc: "/contact", changefreq: "monthly", priority: "0.8" },
  { loc: "/services", changefreq: "weekly", priority: "0.9" },
  { loc: "/industries", changefreq: "weekly", priority: "0.9" },
  { loc: "/counties", changefreq: "weekly", priority: "0.8" },
  { loc: "/service-areas", changefreq: "weekly", priority: "0.9" },
  { loc: "/site-survey", changefreq: "monthly", priority: "0.8" },
  { loc: "/blog", changefreq: "weekly", priority: "0.7" },
  { loc: "/glossary", changefreq: "monthly", priority: "0.7" },
  { loc: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { loc: "/reviews", changefreq: "monthly", priority: "0.6" },
  { loc: "/prep-and-cleanup", changefreq: "monthly", priority: "0.6" },
  { loc: "/our-work", changefreq: "monthly", priority: "0.6" },
  { loc: "/steel-fabrications", changefreq: "weekly", priority: "0.8" },
  { loc: "/steel-fabrication-surface-preparation", changefreq: "weekly", priority: "0.8" },
  { loc: "/steel-chimney-process-stack-surface-preparation", changefreq: "weekly", priority: "0.8" },
  { loc: "/industrial-steelwork-restoration", changefreq: "weekly", priority: "0.8" },
  { loc: "/factory-cladding-restoration", changefreq: "weekly", priority: "0.8" },
  { loc: "/process-pipework-spools-surface-preparation", changefreq: "weekly", priority: "0.8" },
  { loc: "/agricultural-steelwork-grain-store-preparation", changefreq: "weekly", priority: "0.8" },
  { loc: "/external-staircases", changefreq: "weekly", priority: "0.8" },
  { loc: "/sitemap", changefreq: "monthly", priority: "0.5" },
];

// ── Service pages ─────────────────────────────────────────────────────────────
const SERVICE_SLUGS = CANONICAL_SERVICE_SLUGS;

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

function loadTownSlugs(): string[] {
  return Object.keys(locationSlugIndex);
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function buildSitemap(): Promise<string> {
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

  // County pages derive directly from the registered county page catalogue.
  // New county hubs are included automatically without editing a separate sitemap list.
  for (const slug of Object.keys(countyData)) {
    const lastmod = countyLastModified[slug] ?? CATALOGUE_BASELINE_LASTMOD;
    urls.push(
      `  <url>\n    <loc>${escapeXml(`${SITE_URL}/counties/${slug}`)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    );
  }

  // Town / service-area pages — Tier A commercial hubs receive the strongest crawl
  // hint. Pages moved to review are held back until evidence-led local copy is ready.
  for (const slug of townSlugs) {
    if (!shouldIncludeLocationInSitemap(slug)) continue;
    const tier = getLocationSitemapTier(slug);
    const changefreq = tier === "A" ? "weekly" : "monthly";
    const priority = tier === "A" ? "0.8" : "0.6";
    const lastmod = locationLastModified[slug] ?? CATALOGUE_BASELINE_LASTMOD;
    urls.push(
      `  <url>\n    <loc>${escapeXml(`${SITE_URL}/service-areas/${slug}`)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    );
  }

  // Gallery page — use most recent gallery item's updatedAt for lastmod
  try {
    const galleryRows = await getActiveGalleryItems();
    if (galleryRows.length > 0) {
      const latestGallery = galleryRows.reduce((a, b) =>
        new Date(a.updatedAt) > new Date(b.updatedAt) ? a : b
      );
      const galleryLastmod = new Date(latestGallery.updatedAt).toISOString().split("T")[0];
      // Update the /gallery and /our-work static entries with real lastmod
      const galleryIdx = urls.findIndex(u => u.includes(`${SITE_URL}/gallery`));
      if (galleryIdx >= 0) {
        urls[galleryIdx] = urls[galleryIdx].replace(
          /<lastmod>[^<]+<\/lastmod>/,
          `<lastmod>${galleryLastmod}</lastmod>`
        );
      }
      const ourWorkIdx = urls.findIndex(u => u.includes(`${SITE_URL}/our-work`));
      if (ourWorkIdx >= 0) {
        urls[ourWorkIdx] = urls[ourWorkIdx].replace(
          /<lastmod>[^<]+<\/lastmod>/,
          `<lastmod>${galleryLastmod}</lastmod>`
        );
      }
    }
  } catch (err) {
    console.error("[Sitemap] Failed to load gallery items:", err);
  }

  // Blog post pages — use real updatedAt for lastmod
  try {
    const posts = await getPublishedBlogPosts();
    for (const post of posts) {
      const lastmod = post.updatedAt
        ? new Date(post.updatedAt).toISOString().split("T")[0]
        : post.createdAt
          ? new Date(post.createdAt).toISOString().split("T")[0]
          : today;
      urls.push(
        `  <url>\n    <loc>${escapeXml(`${SITE_URL}/blog/${post.slug}`)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`
      );
    }
  } catch (err) {
    console.error("[Sitemap] Failed to load blog posts:", err);
  }

  // Glossary term pages
  const GLOSSARY_SLUGS = [
    "bs-en-iso-8501-1",
    "dft",
    "grit-blasting",
    "intumescent-paint",
    "mill-scale",
    "nace",
    "rust-grade",
    "sa-2-5",
    "sa-3",
    "shot-blasting",
    "sspc",
    "surface-profile",
  ];
  for (const slug of GLOSSARY_SLUGS) {
    urls.push(
      `  <url>\n    <loc>${escapeXml(`${SITE_URL}/glossary/${slug}`)}</loc>\n    <lastmod>2026-07-14</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
}

export function registerSitemapRoute(app: Express): void {
  app.get("/sitemap.xml", async (_req, res) => {
    try {
      const xml = await buildSitemap();
      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=3600"); // cache 1 hour
      res.send(xml);
    } catch (err) {
      console.error("[Sitemap] Generation error:", err);
      res.status(500).send("Sitemap generation failed");
    }
  });
}
