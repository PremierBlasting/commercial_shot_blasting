/**
 * Scheduled task endpoints — called by the Manus Cloud Computer scheduler.
 * Auth: uses the platform-injected session cookie (role: "user").
 * These routes are intentionally simple POST handlers that accept pre-composed
 * content from the scheduler agent and persist it to the database.
 */
import type { Express, Request, Response } from "express";
import https from "https";
import { createContext } from "./_core/context";
import { createBlogPost } from "./db";

const SITEMAP_URL = "https://commercialshotblasting.co.uk/sitemap.xml";

/**
 * Ping Google (and Bing) to notify them the sitemap has been updated.
 * Fires-and-forgets — never throws, so it can't break the main request.
 */
async function pingSitemaps(): Promise<void> {
  const endpoints = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  ];
  await Promise.allSettled(
    endpoints.map(
      (url) =>
        new Promise<void>((resolve) => {
          https
            .get(url, (res) => {
              res.resume(); // drain response
              console.log(`[Scheduled] Sitemap ping ${url} → HTTP ${res.statusCode}`);
              resolve();
            })
            .on("error", (err) => {
              console.warn(`[Scheduled] Sitemap ping failed for ${url}:`, err.message);
              resolve(); // swallow error
            });
        })
    )
  );
}

/**
 * Verify the request carries a valid session cookie with at least "user" role.
 * Returns the user object or null.
 */
async function getSessionUser(req: Request, res: Response) {
  try {
    // Re-use the existing tRPC context builder which already validates the JWT cookie
    const ctx = await createContext({ req, res } as any);
    return ctx.user ?? null;
  } catch {
    return null;
  }
}

export function registerScheduledRoutes(app: Express) {
  /**
   * POST /api/scheduled/blog-post
   * Body (JSON):
   *   slug          string   URL-safe slug, e.g. "shot-blasting-birmingham-2025"
   *   title         string   Full SEO title
   *   excerpt       string   1–2 sentence summary shown in blog listing
   *   content       string   Full HTML or Markdown body
   *   featuredImage string   URL to a relevant image (Unsplash or CDN)
   *   category      string   e.g. "Service Areas" | "Industry News" | "Tips & Guides"
   *   tags          string[] Array of tag strings
   *   metaDescription string  160-char meta description
   */
  app.post("/api/scheduled/blog-post", async (req: Request, res: Response) => {
    // Auth check — must be at least a "user" session (scheduler cookie)
    const user = await getSessionUser(req, res);
    if (!user) {
      res.status(401).json({ error: "Unauthorised" });
      return;
    }

    const {
      slug,
      title,
      excerpt,
      content,
      featuredImage,
      category,
      tags,
      metaDescription,
    } = req.body as {
      slug: string;
      title: string;
      excerpt: string;
      content: string;
      featuredImage: string;
      category?: string;
      tags?: string[];
      metaDescription?: string;
    };

    // Basic validation
    if (!slug || !title || !excerpt || !content || !featuredImage) {
      res.status(400).json({ error: "Missing required fields: slug, title, excerpt, content, featuredImage" });
      return;
    }

    try {
      await createBlogPost({
        slug,
        title,
        excerpt,
        content,
        featuredImage,
        author: "Commercial Shot Blasting",
        category: category ?? "Industry News",
        tags: tags ? JSON.stringify(tags) : null,
        metaDescription: metaDescription ?? null,
        isPublished: true,
      });

      console.log(`[Scheduled] Blog post published: "${title}" (${slug})`);
      // Notify Google & Bing that the sitemap has been updated (fire-and-forget)
      pingSitemaps().catch(() => {});
      res.status(201).json({ success: true, slug, sitemapPinged: true });
    } catch (err: any) {
      // Duplicate slug — post already exists, treat as idempotent success
      if (err?.code === "ER_DUP_ENTRY" || String(err).includes("Duplicate")) {
        console.warn(`[Scheduled] Duplicate slug skipped: ${slug}`);
        res.status(200).json({ success: true, slug, note: "already exists" });
        return;
      }
      console.error("[Scheduled] Failed to create blog post:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
