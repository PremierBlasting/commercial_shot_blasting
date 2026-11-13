/** Dynamic sitemap endpoints; canonical membership/rendering is shared with offline mirrors. */
import type { Express, Response } from "express";
import { getPublishedBlogPosts, getActiveGalleryItems } from "./db";
import {
  countySitemapEntries,
  latestValidSitemapLastmod,
  mainSitemapEntries,
  renderSitemapIndex,
  renderSitemapUrlSet,
  serviceAreaSitemapEntries,
} from "../shared/sitemapPolicy";

export async function buildMainSitemap(): Promise<string> {
  const entries = mainSitemapEntries();
  const asOf = new Date(); // Validation ceiling only; never a page lastmod fallback.
  try {
    const galleryRows = await getActiveGalleryItems();
    const lastmod = latestValidSitemapLastmod(
      galleryRows.flatMap((row) => [row.updatedAt, row.createdAt]), asOf,
    );
    if (lastmod) {
      const gallery = entries.find((entry) => entry.loc === "/our-work");
      if (gallery) gallery.lastmod = lastmod;
    }
  } catch (err) {
    console.error("[Sitemap] Failed to load gallery items:", err);
  }
  return renderSitemapUrlSet(entries, asOf);
}

export function buildCountySitemap(): string {
  return renderSitemapUrlSet(countySitemapEntries(), new Date());
}
export function buildServiceAreaSitemap(): string {
  return renderSitemapUrlSet(serviceAreaSitemapEntries(), new Date());
}
export async function buildBlogSitemap(): Promise<string> {
  const asOf = new Date();
  try {
    const posts = await getPublishedBlogPosts();
    return renderSitemapUrlSet(posts.map((post) => ({
      loc: `/blog/${post.slug}`,
      lastmod: latestValidSitemapLastmod([post.updatedAt, post.createdAt], asOf),
      changefreq: "weekly",
      priority: "0.7",
    })), asOf);
  } catch (err) {
    console.error("[Sitemap] Failed to load blog posts:", err);
    return renderSitemapUrlSet([], asOf);
  }
}
export function buildSitemapIndex(): string {
  return renderSitemapIndex();
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
