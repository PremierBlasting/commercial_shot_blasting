import type { RequestHandler } from "express";
import type { BlogPost } from "../drizzle/schema";
import { GLOSSARY_BY_ID } from "../client/src/data/glossaryData";
import { countyData } from "../client/src/data/countyData";
import { locationSlugIndex } from "../client/src/data/locationSlugIndex";
import { isCanonicalServiceSlug } from "../shared/serviceSeoCatalog";
import { getMaintainedStaticPaths } from "./seoUrlNormalisation";
import { getPublishedBlogPostForHtml, type PublishedBlogHtmlResult } from "./db";

export type HtmlContentContext = { kind: "blog"; slug: string; post: BlogPost } | { kind: "glossary"; slug: string };
export type HtmlRouteDecision =
  | { state: "found"; content?: HtmlContentContext }
  | { state: "redirect"; destination: string }
  | { state: "missing"; media: boolean }
  | { state: "unavailable" };
const owns = (object: object, key: string) => Object.prototype.hasOwnProperty.call(object, key);
const INDUSTRIES = new Set(["manufacturing", "construction", "agriculture", "aerospace", "marine", "heritage-restoration", "retail", "transport-logistics"]);
const RESOURCE_SUFFIX = /\.(?:avif|webp|jpe?g|png|gif|svg|ico|bmp|tiff?|heic|heif|mp4|mov|m4v|webm|avi|mkv|mp3|wav|ogg|pdf|woff2?|ttf|otf|eot|js|mjs|css|map|json|xml|txt|csv|zip|webmanifest)$/i;

/** Do not let a query, encoded separator or extra suffix impersonate a valid content route. */
export function getHtmlPath(originalUrl: string): string | null {
  const raw = originalUrl.split(/[?#]/, 1)[0];
  if (!raw.startsWith("/") || raw.startsWith("//") || /[\\\x00-\x1f\x7f]/.test(raw)) return null;
  try {
    const pieces = raw.split("/");
    for (const piece of pieces) {
      const value = decodeURIComponent(piece);
      if (value === "." || value === ".." || /[\/\\\x00-\x1f\x7f]/.test(value)) return null;
    }
    return pieces.map(piece => decodeURIComponent(piece)).join("/");
  } catch { return null; }
}

export function getContentDetail(originalUrl: string): { kind: "blog" | "glossary"; slug: string; canonical: string } | null {
  const pathname = getHtmlPath(originalUrl);
  const match = pathname?.match(/^\/(blog|glossary)\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/);
  return match ? { kind: match[1] as "blog" | "glossary", slug: match[2], canonical: `/${match[1]}/${match[2]}` } : null;
}

export function isResourceRequestPath(originalUrl: string): boolean {
  const pathname = originalUrl.split(/[?#]/, 1)[0];
  return RESOURCE_SUFFIX.test(pathname) || /^\/(?:api|manus-storage|assets|@vite|@fs|@id|src|node_modules|og)(?:\/|$)/.test(pathname);
}

export function renderHtmlRouteError(status: 404 | 503): string {
  const unavailable = status === 503;
  const title = unavailable ? "Page Temporarily Unavailable" : "Page Not Found";
  const text = unavailable ? "This page is temporarily unavailable. Please try again shortly, or contact us about your project." : "We couldn’t find that page. You can still explore our services and projects or get in touch.";
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${unavailable ? "" : '<meta name="robots" content="noindex, follow">'}<title>${title} | Commercial Shot Blasting</title><style>body{font:18px/1.6 system-ui,sans-serif;color:#193b58;background:#f8fafc;margin:0;padding:32px 20px}main{max-width:720px;margin:8vh auto}nav{display:flex;flex-wrap:wrap;gap:16px}a{color:#193b58;text-underline-offset:4px}</style></head><body><main><h1>${title}</h1><p>${text}</p><nav aria-label="Useful pages"><a href="/">Home</a><a href="/services">Services</a><a href="/our-work">Our Work</a><a href="/service-areas">Service areas</a><a href="/contact">Get In Touch</a></nav></main></body></html>`;
}

export type HtmlRouteOptions = {
  lookupPost?: (slug: string) => Promise<PublishedBlogHtmlResult>;
  timeoutMs?: number;
};

async function readWithinDeadline(slug: string, options: HtmlRouteOptions): Promise<PublishedBlogHtmlResult> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const unavailable = new Promise<PublishedBlogHtmlResult>(resolve => {
      timer = setTimeout(() => resolve({ state: "unavailable" }), options.timeoutMs ?? 5000);
      timer.unref?.();
    });
    return await Promise.race([(options.lookupPost ?? getPublishedBlogPostForHtml)(slug), unavailable]);
  } catch { return { state: "unavailable" }; }
  finally { if (timer) clearTimeout(timer); }
}

/** Called only after real static/Vite/storage/API handlers have had their opportunity. */
export async function resolveHtmlRoute(originalUrl: string, options: HtmlRouteOptions = {}): Promise<HtmlRouteDecision> {
  const pathname = getHtmlPath(originalUrl);
  if (!pathname || pathname === "/404" || pathname === "/index.html") return { state: "missing", media: false };
  const detail = getContentDetail(originalUrl);
  if (detail) {
    let content: HtmlContentContext;
    if (detail.kind === "glossary") {
      if (!owns(GLOSSARY_BY_ID, detail.slug)) return { state: "missing", media: false };
      content = { kind: "glossary", slug: detail.slug };
    } else {
      const result = await readWithinDeadline(detail.slug, options);
      if (result.state === "unavailable") return { state: "unavailable" };
      if (result.state === "missing") return { state: "missing", media: false };
      if (!result.post || result.post.isPublished !== true || result.post.slug !== detail.slug) return { state: "missing", media: false };
      content = { kind: "blog", slug: detail.slug, post: result.post };
    }
    const rawPath = originalUrl.split(/[?#]/, 1)[0];
    if (rawPath !== detail.canonical) {
      const queryIndex = originalUrl.indexOf("?");
      return { state: "redirect", destination: detail.canonical + (queryIndex < 0 ? "" : originalUrl.slice(queryIndex)) };
    }
    return { state: "found", content };
  }
  if (isResourceRequestPath(originalUrl)) return { state: "missing", media: true };
  if (getMaintainedStaticPaths().includes(pathname)) return { state: "found" };
  const service = pathname.match(/^\/services\/([^/]+)$/);
  if (service && isCanonicalServiceSlug(service[1])) return { state: "found" };
  const local = pathname.match(/^\/service-areas\/([^/]+)$/);
  if (local && owns(locationSlugIndex, local[1])) return { state: "found" };
  const county = pathname.match(/^\/counties\/([^/]+)$/);
  if (county && owns(countyData, county[1])) return { state: "found" };
  const industry = pathname.match(/^\/industries\/([^/]+)$/);
  if (industry && INDUSTRIES.has(industry[1])) return { state: "found" };
  return { state: "missing", media: false };
}

export function createContentRouteGate(options: HtmlRouteOptions = {}): RequestHandler {
  return async (req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    try {
      const decision = await resolveHtmlRoute(req.originalUrl, options);
      if (decision.state === "found") { res.locals.htmlContent = decision.content; return next(); }
      if (decision.state === "redirect") return void res.redirect(301, decision.destination);
      res.set({ "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
      if (decision.state === "unavailable") {
        res.set("Retry-After", "60").status(503).type("html").send(renderHtmlRouteError(503));
      } else if (decision.media) {
        res.status(404).type("text").send("Resource not found");
      } else { res.status(404).type("html").send(renderHtmlRouteError(404)); }
    } catch (error) { next(error); }
  };
}

/** Entry HTML must not become a separately indexable physical static-file copy. */
export const rejectStandaloneHtmlEntry: RequestHandler = (req, res, next) => {
  if ((req.method === "GET" || req.method === "HEAD") && ["/index.html", "/404"].includes(req.path)) {
    res.status(404).set({ "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" }).type("html").send(renderHtmlRouteError(404));
  } else next();
};
