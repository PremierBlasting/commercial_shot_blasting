/**
 * Dynamic sitemap index and child sitemap generators for commercialshotblasting.co.uk.
 *
 * The index is the single discovery endpoint. Child sitemaps separate stable core URLs,
 * county hubs, service-area pages, published articles, and the static image sitemap so
 * crawlers can fetch the large location catalogue independently of core commercial pages.
 */

import type { Express, Response } from "express";
import { getPublishedBlogPosts, getActiveGalleryItems } from "./db";
import { locationSlugIndex } from "../client/src/data/locationSlugIndex";
import { countyData } from "../client/src/data/countyData";
import { countyLastModified, locationLastModified } from "@shared/sitemapLastModified";
import { CANONICAL_SERVICE_SLUGS } from "@shared/serviceSeoCatalog";
import { getLocationSitemapTier, shouldIncludeLocationInSitemap } from "@shared/locationSeoTiers";

const SITE_URL = "https://commercialshotblasting.co.uk";
const CATALOGUE_BASELINE_LASTMOD = "2026-02-18";
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

const STATIC_PAGES = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/about", changefreq: "monthly", priority: "0.7" },
  { loc: "/chas-elite", changefreq: "monthly", priority: "0.7" },
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
  { loc: "/case-studies/hb-tunnelling-doncaster", changefreq: "monthly", priority: "0.8" },
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
  { loc: "/external-staircases", changefreq: "weekly", priority: "0.8" },
  { loc: "/sitemap", changefreq: "monthly", priority: "0.5" },
];

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

type SitemapEntry = { loc: string; lastmod: string; changefreq: string; priority: string };

function today(): string {
  return new Date().toISOString().split("T")[0];
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderUrlSet(entries: SitemapEntry[]): string {
  const urls = entries.map((entry) => `  <url>\n    <loc>${escapeXml(`${SITE_URL}${entry.loc}`)}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
}

function coreEntries(lastmod: string): SitemapEntry[] {
  return [
    ...STATIC_PAGES.map((page) => ({ ...page, lastmod })),
    ...CANONICAL_SERVICE_SLUGS.map((slug) => ({ loc: `/services/${slug}`, lastmod, changefreq: "monthly", priority: "0.8" })),
    ...INDUSTRY_SLUGS.map((slug) => ({ loc: `/industries/${slug}`, lastmod, changefreq: "monthly", priority: "0.8" })),
    ...GLOSSARY_SLUGS.map((slug) => ({ loc: `/glossary/${slug}`, lastmod: "2026-07-14", changefreq: "monthly", priority: "0.6" })),
  ];
}

export async function buildMainSitemap(): Promise<string> {
  const entries = coreEntries(today());
  try {
    const galleryRows = await getActiveGalleryItems();
    if (galleryRows.length > 0) {
      const latest = galleryRows.reduce((a, b) => new Date(a.updatedAt) > new Date(b.updatedAt) ? a : b);
      const galleryLastmod = new Date(latest.updatedAt).toISOString().split("T")[0];
      for (const entry of entries) {
        if (entry.loc === "/our-work") entry.lastmod = galleryLastmod;
      }
    }
  } catch (err) {
    console.error("[Sitemap] Failed to load gallery items:", err);
  }
  return renderUrlSet(entries);
}

export function buildCountySitemap(): string {
  return renderUrlSet(Object.keys(countyData).map((slug) => ({
    loc: `/counties/${slug}`,
    lastmod: countyLastModified[slug] ?? CATALOGUE_BASELINE_LASTMOD,
    changefreq: "monthly",
    priority: "0.7",
  })));
}

export function buildServiceAreaSitemap(): string {
  return renderUrlSet(Object.keys(locationSlugIndex).flatMap((slug) => {
    if (!shouldIncludeLocationInSitemap(slug)) return [];
    const tier = getLocationSitemapTier(slug);
    return [{
      loc: `/service-areas/${slug}`,
      lastmod: locationLastModified[slug] ?? CATALOGUE_BASELINE_LASTMOD,
      changefreq: tier === "A" ? "weekly" : "monthly",
      priority: tier === "A" ? "0.8" : "0.6",
    }];
  }));
}

export async function buildBlogSitemap(): Promise<string> {
  try {
    const posts = await getPublishedBlogPosts();
    return renderUrlSet(posts.map((post) => ({
      loc: `/blog/${post.slug}`,
      lastmod: post.updatedAt
        ? new Date(post.updatedAt).toISOString().split("T")[0]
        : post.createdAt
          ? new Date(post.createdAt).toISOString().split("T")[0]
          : today(),
      changefreq: "weekly",
      priority: "0.7",
    })));
  } catch (err) {
    console.error("[Sitemap] Failed to load blog posts:", err);
    return renderUrlSet([]);
  }
}

export function buildSitemapIndex(): string {
  const lastmod = today();
  const children = [
    "/sitemap-main.xml",
    "/sitemap-counties.xml",
    "/sitemap-service-areas.xml",
    "/sitemap-blog.xml",
    "/sitemap-images.xml",
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${children.map((child) => `  <sitemap>\n    <loc>${SITE_URL}${child}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`).join("\n")}\n</sitemapindex>`;
}

/** Compatibility export retained for callers that previously requested the primary sitemap. */
export async function buildSitemap(): Promise<string> {
  return buildSitemapIndex();
}

function sendXml(res: Response, xml: string): void {
  res.set("Content-Type", "application/xml; charset=utf-8");
  res.set("Cache-Control", "public, max-age=3600");
  res.send(xml);
}

export function registerSitemapRoute(app: Express): void {
  app.get("/sitemap.xml", (_req, res) => sendXml(res, buildSitemapIndex()));
  app.get("/sitemap-main.xml", async (_req, res) => {
    try { sendXml(res, await buildMainSitemap()); }
    catch (err) { console.error("[Sitemap] Main generation error:", err); res.status(500).send("Sitemap generation failed"); }
  });
  app.get("/sitemap-counties.xml", (_req, res) => sendXml(res, buildCountySitemap()));
  app.get("/sitemap-service-areas.xml", (_req, res) => sendXml(res, buildServiceAreaSitemap()));
  app.get("/sitemap-blog.xml", async (_req, res) => {
    try { sendXml(res, await buildBlogSitemap()); }
    catch (err) { console.error("[Sitemap] Blog generation error:", err); res.status(500).send("Sitemap generation failed"); }
  });
}
