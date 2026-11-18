import type { BlogPost, GalleryItem, Testimonial } from "../../drizzle/schema";
import { getRenderingPilot, type PilotSeed } from "../../shared/renderingPilot";
import type { HtmlContentContext } from "../contentRouteExistence";
import { getActiveGalleryItems, getActiveTestimonials, getPublishedBlogPosts, getRelatedBlogPosts } from "../db";
import { readPublicContentOrFallback } from "../publicContentFallback";

export const PILOT_OPTIONAL_READ_TIMEOUT_MS = 1500;
export const PILOT_ARTICLE_SLUG = "factory-warehouse-cladding-restoration";

/** Raw existing public DB reads only. No context, router caller, auth or HTTP. */
export interface PilotPublicReads {
  getActiveGalleryItems: () => Promise<unknown>;
  getActiveTestimonials: () => Promise<unknown>;
  getPublishedBlogPosts: () => Promise<unknown>;
  getRelatedBlogPosts: (slug: string, category: string | null) => Promise<unknown>;
}
export const defaultPilotPublicReads: PilotPublicReads = {
  getActiveGalleryItems,
  getActiveTestimonials,
  getPublishedBlogPosts,
  getRelatedBlogPosts,
};

/** Track the real getter promises, not just the deadline-raced prefetch promise. */
export function createTrackedPilotReads(
  track: (promise: Promise<unknown>) => void,
  reads: PilotPublicReads = defaultPilotPublicReads,
  signal?: AbortSignal,
): PilotPublicReads {
  const start = (read: () => Promise<unknown>) => {
    if (signal?.aborted) throw new PilotPrefetchError("aborted");
    let resolve!: (value: unknown) => void;
    let reject!: (reason: unknown) => void;
    const promise = new Promise<unknown>((onResolve, onReject) => { resolve = onResolve; reject = onReject; });
    // Register before scheduling the read. A closed lease throws here and no DB work starts.
    track(promise);
    Promise.resolve().then(() => {
      if (signal?.aborted) throw new PilotPrefetchError("aborted");
      return read();
    }).then(resolve, reject);
    return promise;
  };
  return {
    getActiveGalleryItems: () => start(() => reads.getActiveGalleryItems()),
    getActiveTestimonials: () => start(() => reads.getActiveTestimonials()),
    getPublishedBlogPosts: () => start(() => reads.getPublishedBlogPosts()),
    getRelatedBlogPosts: (slug, category) => start(() => reads.getRelatedBlogPosts(slug, category)),
  };
}

export class PilotPrefetchError extends Error {
  constructor(public readonly code: "optional-read-timeout" | "aborted" | "invalid-public-data" | "not-pilot") {
    super(`Rendering pilot prefetch: ${code}`);
    this.name = "PilotPrefetchError";
  }
}
const invalid = (): never => { throw new PilotPrefetchError("invalid-public-data"); };
const object = (value: unknown): Record<string, unknown> => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return invalid();
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) return invalid();
  return value as Record<string, unknown>;
};
const string = (value: unknown): string => typeof value === "string" ? value : invalid();
const nullableString = (value: unknown): string | null => value === null ? null : string(value);
const integer = (value: unknown): number => typeof value === "number" && Number.isSafeInteger(value) ? value : invalid();
const date = (value: unknown): Date => value instanceof Date && Number.isFinite(value.getTime()) ? new Date(value.getTime()) : invalid();
const bool = (value: unknown): boolean => typeof value === "boolean" ? value : invalid();
const rows = (value: unknown): unknown[] => Array.isArray(value) ? value : invalid();
const assertActive = (value: unknown): true => value === true ? true : invalid();
const assertIdentity = (value: unknown): number => { const id = integer(value); return id > 0 ? id : invalid(); };

function projectGallery(value: unknown): GalleryItem {
  const item = object(value);
  return {
    id: assertIdentity(item.id), title: string(item.title), category: string(item.category),
    description: nullableString(item.description), beforeImage: string(item.beforeImage), afterImage: string(item.afterImage),
    isActive: assertActive(item.isActive), sortOrder: integer(item.sortOrder),
    createdAt: date(item.createdAt), updatedAt: date(item.updatedAt),
  };
}

type PublicTestimonial = Omit<Testimonial, "images"> & { images: string[] };
function projectTestimonial(value: unknown, transformedImages: unknown): PublicTestimonial {
  const item = object(value);
  const images = rows(transformedImages).map(string);
  const rating = integer(item.rating);
  // Public list preserves 0 for an unrated quote; Home explicitly renders it without stars.
  // Admin create/update's 1–5 input rule does not rewrite existing published public rows.
  if (rating < 0 || rating > 5) return invalid();
  return {
    id: assertIdentity(item.id), name: string(item.name), company: nullableString(item.company), rating,
    text: string(item.text), project: nullableString(item.project), images,
    isNew: bool(item.isNew), isActive: assertActive(item.isActive), sortOrder: integer(item.sortOrder),
    createdAt: date(item.createdAt), updatedAt: date(item.updatedAt),
  };
}

/** Validation, not a sanitizer: fail closed rather than rewriting maintained article HTML. */
function assertSafePrimaryMarkup(content: string): void {
  if (!content.trim() || /[\u0000]/.test(content) ||
      /<\s*\/?\s*(?:script|iframe|object|embed|style|link|meta|base|html|head|body|svg|math)\b/i.test(content) ||
      /\bon[a-z]+\s*=|\bsrcdoc\s*=/i.test(content) ||
      /(?:javascript|vbscript|data)\s*(?::|&#(?:0*58|x0*3a);?)/i.test(content) ||
      /<!--|<!doctype|<\?/i.test(content)) invalid();
  // Entity/control obfuscation in an attribute is not accepted as safe primary data.
  for (const match of Array.from(content.matchAll(/\b(?:href|src|action|formaction|xlink:href)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi))) {
    const url = match[1] ?? match[2] ?? match[3];
    if (/[\u0000-\u0020\u007f]|&#|&(?:colon|tab|newline);/i.test(url) ||
        (!/^(?:https?:\/\/|\/|#|mailto:|tel:)/i.test(url) && /^[a-z][a-z0-9+.-]*:/i.test(url))) invalid();
  }
}

export function projectPublishedPilotBlog(value: unknown, primary = false): BlogPost {
  const item = object(value);
  const post: BlogPost = {
    id: assertIdentity(item.id), slug: string(item.slug), title: string(item.title), excerpt: string(item.excerpt),
    content: string(item.content), featuredImage: string(item.featuredImage), author: string(item.author),
    category: nullableString(item.category), tags: nullableString(item.tags), faq: nullableString(item.faq),
    metaDescription: nullableString(item.metaDescription), isPublished: assertActive(item.isPublished),
    publishedAt: date(item.publishedAt), createdAt: date(item.createdAt), updatedAt: date(item.updatedAt),
  };
  if (!post.slug || !post.title.trim()) invalid();
  if (post.tags) {
    let parsed: unknown;
    try { parsed = JSON.parse(post.tags); } catch { return invalid(); }
    if (!Array.isArray(parsed) || !parsed.every(tag => typeof tag === "string")) invalid();
  }
  if (post.faq) {
    let parsed: unknown;
    try { parsed = JSON.parse(post.faq); } catch { return invalid(); }
    if (!Array.isArray(parsed) || !parsed.every(faq => {
      const record = object(faq);
      return Object.keys(record).every(key => key === "question" || key === "answer") &&
        typeof record.question === "string" && typeof record.answer === "string" &&
        !/[<>]/.test(record.question + record.answer);
    })) invalid();
  }
  if (primary) {
    // Legacy head FAQ serialization is retained; reject script terminators in its data.
    if ([post.title, post.excerpt, post.author, post.category, post.tags, post.metaDescription, post.featuredImage]
      .some(value => value !== null && /<\s*\/\s*script\b/i.test(value))) invalid();
    assertSafePrimaryMarkup(post.content);
  }
  return post;
}

function listKey(namespace: "gallery" | "testimonials" | "blog"): unknown[] {
  return [[namespace, "list"], { type: "query" }];
}

async function waitForOptional<T>(work: Promise<T>, signal?: AbortSignal): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let onAbort: (() => void) | undefined;
  const deadline = Date.now() + PILOT_OPTIONAL_READ_TIMEOUT_MS;
  try {
    if (signal?.aborted) throw new PilotPrefetchError("aborted");
    const interruption = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new PilotPrefetchError("optional-read-timeout")), PILOT_OPTIONAL_READ_TIMEOUT_MS);
      timer.unref?.();
      onAbort = () => reject(new PilotPrefetchError("aborted"));
      signal?.addEventListener("abort", onAbort, { once: true });
      if (signal?.aborted) onAbort();
    });
    const result = await Promise.race([work, interruption]);
    if (signal?.aborted) throw new PilotPrefetchError("aborted");
    if (Date.now() >= deadline) throw new PilotPrefetchError("optional-read-timeout");
    return result;
  } finally {
    if (timer) clearTimeout(timer);
    if (onAbort) signal?.removeEventListener("abort", onAbort);
  }
}

export async function prefetchPilot(
  url: string,
  content?: HtmlContentContext,
  signal?: AbortSignal,
  reads: PilotPublicReads = defaultPilotPublicReads,
): Promise<PilotSeed[]> {
  const pilot = getRenderingPilot(url);
  if (!pilot) throw new PilotPrefetchError("not-pilot");
  if (signal?.aborted) throw new PilotPrefetchError("aborted");
  if (pilot.pathname === "/counties/hampshire") return [];

  if (pilot.pathname === `/blog/${PILOT_ARTICLE_SLUG}`) {
    if (content?.kind !== "blog" || content.slug !== PILOT_ARTICLE_SLUG ||
        content.post?.slug !== PILOT_ARTICLE_SLUG || content.post.isPublished !== true) return invalid();
    const post = projectPublishedPilotBlog(content.post, true);
    const category = post.category ?? null;
    const relatedWork = readPublicContentOrFallback<unknown>("related blog posts", [],
      () => reads.getRelatedBlogPosts(post.slug, category));
    const related = rows(await waitForOptional(relatedWork, signal)).map(value => projectPublishedPilotBlog(value));
    if (related.some(row => row.slug === post.slug)) invalid();
    return [
      { queryKey: [["blog", "getBySlug"], { input: { slug: post.slug }, type: "query" }], data: post },
      { queryKey: [["blog", "getRelated"], { input: { slug: post.slug, category }, type: "query" }], data: related },
    ];
  }

  const galleryWork = readPublicContentOrFallback<unknown>("active gallery", [], () => reads.getActiveGalleryItems());
  // Exactly the procedure-level JSON transform/fallback: one bad JSON row falls back for the whole list.
  // Projection validation is OUTSIDE that catch, so successful malformed/private output cannot become invented [].
  const testimonialsWork = (async () => {
    const items = rows(await readPublicContentOrFallback<unknown>("active testimonials", [], () => reads.getActiveTestimonials()));
    const raw = items.map(value => {
      const item = object(value);
      return { value, images: nullableString(item.images) };
    });
    return readPublicContentOrFallback<Array<{ value: unknown; images: unknown }>>("active testimonials", [], async () =>
      raw.map(item => ({ value: item.value, images: item.images ? JSON.parse(item.images) : [] })));
  })();
  const blogWork = pilot.pathname === "/"
    ? readPublicContentOrFallback<unknown>("published blog posts", [], () => reads.getPublishedBlogPosts())
    : Promise.resolve(undefined);
  const [gallery, testimonials, blogs] = await waitForOptional(Promise.all([galleryWork, testimonialsWork, blogWork]), signal);
  const seeds: PilotSeed[] = [
    { queryKey: listKey("gallery"), data: rows(gallery).map(projectGallery) },
    { queryKey: listKey("testimonials"), data: testimonials.map(item => projectTestimonial(item.value, item.images)) },
  ];
  if (pilot.pathname === "/") seeds.push({ queryKey: listKey("blog"), data: rows(blogs).map(value => projectPublishedPilotBlog(value)) });
  if (signal?.aborted) throw new PilotPrefetchError("aborted");
  return seeds;
}
