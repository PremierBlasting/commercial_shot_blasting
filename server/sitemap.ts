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
  { loc: "/external-staircases", changefreq: "weekly", priority: "0.8" },
  { loc: "/services/car-park-paint-removal", changefreq: "weekly", priority: "0.8" },
  { loc: "/services/intumescent-painting", changefreq: "weekly", priority: "0.8" },
  { loc: "/sitemap", changefreq: "monthly", priority: "0.5" },
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
  "intumescent-painting",
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

// ── Top 20 major city slugs — higher priority/changefreq ─────────────────────
const TOP_CITY_SLUGS = new Set([
  "birmingham", "manchester", "leeds", "sheffield", "bristol",
  "liverpool", "newcastle-upon-tyne", "nottingham", "leicester", "coventry",
  "bradford", "cardiff", "glasgow", "edinburgh", "southampton",
  "portsmouth", "derby", "wolverhampton", "stoke-on-trent", "hull",
]);

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

  // Town / service-area pages — top 20 cities get higher priority + weekly crawl
  for (const slug of townSlugs) {
    const isTopCity = TOP_CITY_SLUGS.has(slug);
    const changefreq = isTopCity ? "weekly" : "monthly";
    const priority = isTopCity ? "0.8" : "0.6";
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
