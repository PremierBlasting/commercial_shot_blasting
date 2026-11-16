import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import type { BlogPost } from "../drizzle/schema";
const lookup = vi.hoisted(() => vi.fn(() => { throw new Error("Live database forbidden"); }));
vi.mock("./db", () => ({ getPublishedBlogPostForHtml: lookup }));
import { injectMetaTags, composeRouteMetadataHead, resolveServerRouteMetadata } from "./metaTags";
import { createContentRouteGate } from "./contentRouteExistence";
import {
  resolveRouteMetadata, serializeRouteMetadataHead, serializeRouteMetadataBoot,
  getRouteMetadataTags, type RouteMetadataRecord,
} from "../shared/routeMetadata";
import { getPageRobotsDirective, NOINDEX_FOLLOW, PREVIEW_PAGE_ROBOTS } from "../shared/pageIndexingPolicy";

const rows = [
  ["P0001", "/"], ["P0079", "/services"], ["P0070", "/about"], ["P0072", "/contact"],
  ["P0075", "/industries"], ["P0078", "/service-areas"], ["P0116", "/counties/hampshire"],
  ["P0825", "/service-areas/truro"], ["P0213", "/service-areas/birmingham"],
  ["P0365", "/service-areas/derby"], ["P0774", "/service-areas/stoke"],
  ["P0775", "/service-areas/stoke-on-trent"], ["P0871", "/service-areas/wigan"],
] as const;
const nullable = ["author", "ogImageSecureUrl", "twitterSite", "twitterCreator", "keywords", "ogTitle", "ogDescription", "ogUrl", "ogType", "ogImage", "ogImageWidth", "ogImageHeight", "ogImageType", "ogImageAlt", "ogLocale", "ogSiteName", "twitterCard", "twitterTitle", "twitterDescription", "twitterUrl", "twitterImage", "twitterImageAlt", "publishedAt", "modifiedAt", "articleAuthor", "articleSection"] as const;
const query = "?utm_source=task07&utm_source=&utm_medium=a%2Bb&gclid=%2B&gclid=&gbraid=g&wbraid=w&msclkid=m&functional=%26%3D#details";
let network: ReturnType<typeof vi.fn>;
beforeEach(() => { network = vi.fn(() => { throw new Error("Network forbidden"); }); vi.stubGlobal("fetch", network); });
afterEach(() => { expect(network).not.toHaveBeenCalled(); vi.unstubAllGlobals(); });
function expectComplete(record: RouteMetadataRecord) {
  for (const key of ["pathname", "state", "title", "description", "canonical", "robots"] as const) expect(typeof record[key]).toBe("string");
  for (const key of nullable) { expect(record).toHaveProperty(key); expect(record[key] === null || typeof record[key] === "string").toBe(true); }
  expect(Array.isArray(record.articleTags)).toBe(true);
  expect(Array.isArray(record.alternates)).toBe(true);
  expect(Object.values(record)).not.toContain(undefined);
}

describe("Task07 exact B07-NAV-PARITY complete records", () => {
  it.each(rows)("%s %s has clean/query/encoded/trailing metadata parity without URL mutation", (_id, route) => {
    const clean = resolveRouteMetadata(route);
    expectComplete(clean);
    expect(clean.state).toBe("ready");
    expect(clean.title.length).toBeGreaterThan(0);
    expect(clean.description.length).toBeGreaterThan(0);
    const canonicalPath = route === "/service-areas/stoke" ? "/service-areas/stoke-on-trent" : route;
    expect(clean.pathname).toBe(canonicalPath);
    expect(clean.canonical).toBe(`https://commercialshotblasting.co.uk${canonicalPath}`);
    expect(clean.robots).toBe(getPageRobotsDirective(canonicalPath));
    for (const original of [route + query, (route === "/" ? "/" : route + "/") + query, route.replace(/-/g, "%2D") + query]) {
      const saved = original;
      expect(resolveRouteMetadata(original)).toEqual(clean);
      expect(serializeRouteMetadataHead(resolveRouteMetadata(original))).toBe(serializeRouteMetadataHead(clean));
      expect(serializeRouteMetadataBoot(resolveRouteMetadata(original))).toBe(serializeRouteMetadataBoot(clean));
      expect(original).toBe(saved);
    }
    expect(serializeRouteMetadataHead(clean)).not.toMatch(/task07|gclid|gbraid|wbraid|msclkid|functional/);
  });
  it.each([
    ["/", "Commercial Shot Blasting Services | Nationwide", "Nationwide commercial shot blasting services for metal surface preparation, rust and coating removal, structural steel, cladding, containers and plant. Get in touch."],
    ["/about", "About Us | Commercial Shot Blasting", "Learn about Commercial Shot Blasting - expert surface preparation services across the UK. Professional team, modern equipment, quality results."],
    ["/contact", "Contact Us | Commercial Shot Blasting", "Get in touch with Commercial Shot Blasting for a site visit. Call 07970 566409 or fill out our contact form for expert surface preparation services."],
  ])("preserves approved source text exactly at %s", (route, title, description) => {
    const record = resolveRouteMetadata(route);
    expect(record.title).toBe(title); expect(record.description).toBe(description);
    expect(record.ogTitle).toBe(title); expect(record.twitterTitle).toBe(title);
    expect(record.ogDescription).toBe(description); expect(record.twitterDescription).toBe(description);
    expect(resolveRouteMetadata(route, { title: "Outgoing stale title", description: "Outgoing stale description", robots: "index, follow" })).toEqual(record);
  });
  it("keeps Structural Steel an exact canonical service rather than permissive matching", () => {
    const record = resolveRouteMetadata("/services/structural-steel-frames" + query);
    expectComplete(record); expect(record.state).toBe("ready"); expect(record.robots).toBe(PREVIEW_PAGE_ROBOTS);
    expect(record.title).toContain("Structural Steel");
    expect(record).toEqual(resolveRouteMetadata("/services/structural-steel-frames"));
    expect(resolveRouteMetadata("/services/structural-steel-frames/extra").state).toBe("missing");
  });
  it.each(["//admin", "/%2fadmin", "/%2e%2e/admin", "/admin%5c", "/%GG", "/services/not-real", "/counties/not-real", "/service-areas/not-maintained", "/admin/extra", "/404", "/index.html"])("never promotes unknown or unsafe identity %s", route => {
    const record = resolveRouteMetadata(route, { state: "ready", title: "Not a publication verdict", robots: "index, follow" });
    expect(record.state).toBe("missing"); expect(record.robots).toBe(NOINDEX_FOLLOW);
    expectComplete(record);
  });
});

describe("publication states and public serialization", () => {
  const route = "/blog/factory-cladding-shot-blasting";
  it("keeps pending, missing and unavailable states distinct without false deletion/indexability", () => {
    const pending = resolveRouteMetadata(route);
    expect(pending.state).toBe("pending"); expect(pending.title).toBe("Loading... | Commercial Shot Blasting"); expect(pending.robots).toBe(NOINDEX_FOLLOW);
    const missing = resolveRouteMetadata(route, { state: "missing" });
    expect(missing.title).toBe("Page Not Found | Commercial Shot Blasting"); expect(missing.robots).toBe(NOINDEX_FOLLOW);
    const unavailable = resolveRouteMetadata(route, { state: "unavailable" });
    expect(unavailable.state).toBe("unavailable"); expect(unavailable.title).toBe("Page Temporarily Unavailable | Commercial Shot Blasting");
    expect(unavailable.robots).toBe(""); expect(serializeRouteMetadataHead(unavailable)).not.toContain('name="robots"');
    expect(serializeRouteMetadataHead(unavailable)).not.toContain("noindex");
    for (const record of [pending, missing, unavailable]) { expectComplete(record); expect(record.publishedAt).toBeNull(); expect(record.ogImage).toBeNull(); }
  });
  it("preserves validated published title, actual dates and explicit null fields without inventing image facts", () => {
    const input = { state: "ready" as const, title: "Existing published cladding title", description: "Existing metaDescription before excerpt", image: "https://example.invalid/existing.jpg", publishedAt: new Date("2025-02-03T10:20:30Z"), modifiedAt: "2025-02-04T10:20:30Z", articleAuthor: "Existing public author", articleSection: "Existing category", articleTags: ["cladding", "surface preparation"] };
    const record = resolveRouteMetadata(route + query, input);
    expectComplete(record); expect(record.title).toBe(input.title); expect(record.description).toBe(input.description);
    expect(record.state).toBe("ready"); expect(record.robots).toBe(PREVIEW_PAGE_ROBOTS); expect(record.ogType).toBe("article");
    expect(record.publishedAt).toBe("2025-02-03T10:20:30.000Z"); expect(record.modifiedAt).toBe("2025-02-04T10:20:30.000Z");
    expect(record.ogImage).toBe(input.image); expect(record.twitterImage).toBe(input.image);
    expect(record.ogImageWidth).toBeNull(); expect(record.ogImageHeight).toBeNull(); expect(record.ogImageType).toBeNull(); expect(record.ogImageAlt).toBeNull();
    expect(getRouteMetadataTags(record).filter(tag => tag.key === "article:tag").map(tag => tag.value)).toEqual(input.articleTags);
    const noImage = resolveRouteMetadata(route, { state: "ready", title: input.title, description: input.description, image: null, publishedAt: "invalid" });
    expect(noImage.ogImage).toBeNull(); expect(noImage.twitterImage).toBeNull(); expect(noImage.publishedAt).toBeNull(); expect(noImage.modifiedAt).toBeNull();
  });
  it("escapes attributes, closing scripts and Unicode separators while boot projects only public head fields", () => {
    const hostile = 'Title " & <script>bad()</script> </script><script>alert(1)</script>\u2028\u2029';
    const record = resolveRouteMetadata(route + "?email=private%40example.invalid&gclid=visitor-id", { state: "ready", title: hostile, description: hostile, image: null });
    const poisoned = Object.assign({}, record, { email: "private@example.invalid", phone: "private-contact", post: { body: "private draft" }, query: "visitor-id" });
    const head = serializeRouteMetadataHead(poisoned);
    expect(head).toContain("&lt;script&gt;"); expect(head).toContain("&quot;"); expect(head).not.toContain("<script>");
    const boot = serializeRouteMetadataBoot(poisoned);
    expect(boot.match(/<script\b/g)).toHaveLength(1); expect(boot.match(/<\/script>/g)).toHaveLength(1);
    expect(boot).toContain("\\u003c"); expect(boot).toContain("\\u2028"); expect(boot).toContain("\\u2029");
    expect(boot).not.toMatch(/private@example|private-contact|private draft|visitor-id|\"post\"|\"email\"/);
    expect(JSON.parse(boot.replace(/^.*?>/, "").replace(/<\/script>$/, ""))).toEqual(record);
  });
  it("contains no server lookup, publication snapshot or page-body dependency", () => {
    const source = readFileSync(new URL("../shared/routeMetadata.ts", import.meta.url), "utf8");
    expect(source).not.toMatch(/from\s+["'][^"']*(?:server\/|\/db|blogPosts|locationData|countyData)["']/);
    expect(source).not.toMatch(/\bfetch\s*\(/);
  });
});

describe("final hard-load composition shares the browser's complete record", () => {
  const base = '<html><head><title>Old</title><meta name="robots" content="index, follow"><meta property="robots" content="noindex"><link rel="canonical" href="https://old.invalid"><meta property="twitter:title" content="Old"><script type="application/ld+json">{"existingSchema":true}</script><link rel="preload" as="image" href="/existing.webp"></head><body><!--SSR_CONTENT--><div id="root"></div></body></html>';
  function head(html: string) { return html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? ""; }
  it.each([...rows, ["P0066", "/services/structural-steel-frames"]] as const)("%s %s actually injects identical clean/query managed heads", async (_id, route) => {
    const clean = head(await injectMetaTags(base, route));
    const tagged = head(await injectMetaTags(base, route + query));
    expect(tagged).toBe(clean);
    const record = resolveRouteMetadata(route);
    expect(clean).toContain(serializeRouteMetadataHead(record));
    expect(clean).toContain(serializeRouteMetadataBoot(record));
    expect(clean.match(/<title\b/g)).toHaveLength(1);
    expect(clean.match(/<link\b[^>]*rel="canonical"/g)).toHaveLength(1);
    expect(clean.match(/<meta\b[^>]*name="robots"/g)).toHaveLength(1);
    expect(clean).not.toContain('property="twitter:title"');
    expect(clean).toContain('{"existingSchema":true}'); expect(clean).toContain('href="/existing.webp"');
    expect(lookup).not.toHaveBeenCalled();
  });
  it("publishes request-local validated article fields, preserves exact server title precedence and never serializes private body", async () => {
    const post: BlogPost = { id: 7001, slug: "published-cladding-fixture", title: "Existing published cladding title", excerpt: "Existing excerpt", content: "<p>BODY_PRIVATE_SENTINEL</p>", featuredImage: "/fixture.webp", author: "Public author", category: "Cladding", tags: '["steel","cladding"]', faq: null, metaDescription: "Existing metadata description", isPublished: true, publishedAt: new Date("2026-01-01T00:00:00Z"), createdAt: new Date("2026-01-01T00:00:00Z"), updatedAt: new Date("2026-01-02T00:00:00Z") };
    const route = "/blog/" + post.slug;
    const content = { kind: "blog" as const, slug: post.slug, post };
    const record = resolveServerRouteMetadata(route + query, content);
    expect(record.state).toBe("published"); expect(record.title).toBe(post.title); expect(record.description).toBe(post.metaDescription);
    expect(record.publishedAt).toBe(post.publishedAt!.toISOString()); expect(record.modifiedAt).toBe(post.updatedAt.toISOString());
    expect(record.articleAuthor).toBe(post.author); expect(record.articleSection).toBe(post.category); expect(record.articleTags).toEqual(["steel", "cladding"]);
    expect(record.ogImageWidth).toBeNull(); expect(record.ogImageHeight).toBeNull();
    const clean = head(await injectMetaTags(base, route, content)); const tagged = head(await injectMetaTags(base, route + query, content));
    expect(tagged).toBe(clean); expect(clean).toContain(serializeRouteMetadataHead(record));
    expect(clean).toContain(serializeRouteMetadataBoot(record)); expect(clean).not.toContain("BODY_PRIVATE_SENTINEL"); expect(lookup).not.toHaveBeenCalled();
    expect(resolveServerRouteMetadata(route, { ...content, post: { ...post, metaDescription: null } }).description).toBe(post.excerpt);
    expect(resolveServerRouteMetadata(route, { ...content, post: { ...post, isPublished: false } }).state).toBe("pending");
    expect(resolveServerRouteMetadata(route, { ...content, slug: "wrong-post" }).state).toBe("pending");
  });
  it("final composition removes equivalent inherited managed variants, obsolete destination fields, but not JSON-LD/body/preload", () => {
    const record = resolveRouteMetadata("/blog/unknown-post", { state: "unavailable" });
    const source = base.replace("</head>", '<meta property="article:published_time" content="old"><meta name="twitter:image" content="old"><meta property="twitter:image" content="old"><link rel="alternate" hreflang="en" href="https://old.invalid"><meta name="googlebot" content="noindex"></head>');
    const composed = composeRouteMetadataHead(source, record);
    expect(head(composed)).toContain(serializeRouteMetadataHead(record));
    expect(head(composed)).not.toMatch(/name="robots"|property="robots"|name="googlebot"|article:published_time|twitter:image|rel="alternate"/);
    expect(head(composed)).toContain('{"existingSchema":true}'); expect(head(composed)).toContain('href="/existing.webp"');
    expect(composed.split("<body>")[1]).toBe(source.split("<body>")[1]);
  });
});

describe("metadata does not change Task04 GET/HEAD status or cache contracts", () => {
  it.each(["GET", "HEAD"])("preserves missing 404 and temporary 503 with Retry-After on %s without a network", async method => {
    for (const state of ["missing", "unavailable"] as const) {
      const originalUrl = "/blog/status-fixture?gclid=&gclid=%2B&utm_source=kept";
      const lookupPost = vi.fn(async () => ({ state }));
      const headers: Record<string, string> = {};
      let code = 200, mime = "", body = "";
      const res = {
        locals: {},
        set(key: string | Record<string, string>, value?: string) { if (typeof key === "string") headers[key] = value!; else Object.assign(headers, key); return this; },
        status(value: number) { code = value; return this; },
        type(value: string) { mime = value; return this; },
        send(value: string) { body = value; return this; },
      };
      const req = { method, originalUrl };
      const next = vi.fn();
      await createContentRouteGate({ lookupPost })(req as never, res as never, next);
      expect(code).toBe(state === "missing" ? 404 : 503); expect(mime).toBe("html");
      expect(headers["Cache-Control"]).toBe("no-store"); expect(headers["X-Content-Type-Options"]).toBe("nosniff");
      expect(headers["Retry-After"]).toBe(state === "unavailable" ? "60" : undefined);
      if (state === "missing") expect(body).toContain('name="robots" content="noindex, follow"');
      else { expect(body).not.toContain('name="robots"'); expect(body).not.toContain("noindex"); }
      expect(body).not.toContain('rel="canonical"');
      expect(body).not.toContain('application/ld+json');
      expect(req.originalUrl).toBe(originalUrl); expect(next).not.toHaveBeenCalled();
      expect(lookupPost).toHaveBeenCalledTimes(1); expect(lookupPost).toHaveBeenCalledWith("status-fixture");
    }
  });
  it("passes through non-GET/HEAD without invoking publication lookup or changing routing", async () => {
    const lookupPost = vi.fn(async () => ({ state: "unavailable" as const })); const next = vi.fn();
    await createContentRouteGate({ lookupPost })({ method: "POST", originalUrl: "/blog/status-fixture?gclid=kept" } as never, {} as never, next);
    expect(next).toHaveBeenCalledTimes(1); expect(lookupPost).not.toHaveBeenCalled();
  });
});
