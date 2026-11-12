import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import express, { type Express, type RequestHandler } from "express";
import { IncomingMessage, ServerResponse } from "node:http";
import { Duplex } from "node:stream";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { BlogPost } from "../drizzle/schema";
import type { PublishedBlogHtmlResult } from "./db";

const reads = vi.hoisted(() => ({ strict: vi.fn(), legacy: vi.fn() }));
vi.mock("./db", () => ({
  getPublishedBlogPostForHtml: reads.strict,
  getBlogPostBySlug: reads.legacy,
}));
import {
  createContentRouteGate,
  rejectStandaloneHtmlEntry,
  type HtmlContentContext,
  type HtmlRouteOptions,
} from "./contentRouteExistence";
import { injectMetaTags } from "./metaTags";
import { getMaintainedStaticPaths } from "./seoUrlNormalisation";
import { CANONICAL_SERVICE_SLUGS } from "../shared/serviceSeoCatalog";
import { countyData } from "../client/src/data/countyData";
import { locationSlugIndex } from "../client/src/data/locationSlugIndex";
import { GLOSSARY_BY_ID } from "../client/src/data/glossaryData";

const post: BlogPost = {
  id: 8001,
  slug: "published-gate-fixture",
  title: "Healthy published fixture title",
  excerpt: "Healthy excerpt",
  content: "<p>Original public article body must remain unchanged.</p>",
  featuredImage: "/unchanged-fixture.webp",
  author: "Commercial Shot Blasting",
  category: "Preparation",
  tags: '["steel","preparation"]',
  faq: '[{"question":"Fixture question?","answer":"Fixture answer."}]',
  metaDescription: "Healthy published fixture description",
  isPublished: true,
  publishedAt: new Date("2026-01-01T00:00:00Z"),
  createdAt: new Date("2026-01-01T00:00:00Z"),
  updatedAt: new Date("2026-01-02T00:00:00Z"),
};
const articleMarkup = `<article data-preserved="true">${post.content}</article>`;
const template = `<!doctype html><html><head><title>Template title</title><meta name="description" content="Template description"></head><body><div id="root"></div>${articleMarkup}<!--SSR_CONTENT--></body></html>`;
const query =
  "?adwords=ppc&utm_campaign=fixture&utm_id=42&gclid=test&gbraid=test&wbraid=test&hsa_cam=42&ref=a%2Bb%2Fc%3Dd%20e&plus=a+b&dup=one&dup=two&empty=&bare";

type Reply = {
  status: number;
  headers: Record<string, unknown>;
  body: string;
  locals: Record<string, unknown>;
};
/** Run the real Express router with HTTP objects, but no listen(), fetch(), socket I/O or startup import. */
function dispatch(app: Express, method: string, url: string): Promise<Reply> {
  return new Promise((done, reject) => {
    const socket = new Duplex({
      read() {},
      write(_chunk, _encoding, callback) {
        callback();
      },
    });
    const req = new IncomingMessage(socket);
    req.method = method;
    req.url = url;
    req.headers = { host: "fixture.invalid", accept: "text/html" };
    const res = new ServerResponse(req);
    // Express's actual send/redirect methods determine HEAD handling and headers.
    res.end = ((chunk?: unknown) => {
      done({
        status: res.statusCode,
        headers: { ...res.getHeaders() },
        body:
          chunk == null
            ? ""
            : Buffer.isBuffer(chunk)
              ? chunk.toString("utf8")
              : String(chunk),
        locals: (res as unknown as { locals: Record<string, unknown> }).locals,
      });
      socket.destroy();
      return res;
    }) as typeof res.end;
    app.handle(req as never, res as never, (error?: unknown) => {
      socket.destroy();
      if (error) reject(error);
      else reject(new Error(`Unexpected fallthrough: ${method} ${url}`));
    });
  });
}

function gatedApp(options: HtmlRouteOptions = {}, fallback?: RequestHandler) {
  const app = express();
  app.use(createContentRouteGate(options));
  app.use(
    fallback ??
      ((_req, res) =>
        res.status(200).type("html").send("<main>SPA sentinel</main>"))
  );
  return app;
}
function assert404(reply: Reply, method: string) {
  expect(reply.status).toBe(404);
  expect(reply.headers["cache-control"]).toBe("no-store");
  expect(reply.headers["x-content-type-options"]).toBe("nosniff");
  expect(reply.headers["content-type"]).toMatch(/^text\/html/);
  if (method === "HEAD") expect(reply.body).toBe("");
  else {
    expect(reply.body).toMatch(/<h1>Page Not Found<\/h1>/);
    expect(reply.body).toMatch(/name="robots"[^>]*content="noindex,\s*follow"/);
    for (const path of ["/services", "/our-work", "/service-areas", "/contact"])
      expect(reply.body).toContain(`href="${path}"`);
    expect(reply.body).not.toMatch(
      /SPA sentinel|application\/ld\+json|rel="canonical"/
    );
  }
}
function assert503(reply: Reply, method: string) {
  expect(reply.status).toBe(503);
  expect(reply.headers["retry-after"]).toBe("60");
  expect(reply.headers["cache-control"]).toBe("no-store");
  expect(reply.headers["x-content-type-options"]).toBe("nosniff");
  expect(reply.headers["content-type"]).toMatch(/^text\/html/);
  if (method === "HEAD") expect(reply.body).toBe("");
  else {
    expect(reply.body).toMatch(/Temporarily Unavailable/);
    expect(reply.body).not.toMatch(
      /Page Not Found|deleted|permanently removed|SPA sentinel|application\/ld\+json|rel="canonical"/i
    );
  }
  // 503 robots directives are intentionally not specified by this test policy.
}

beforeEach(() => {
  vi.clearAllMocks();
  reads.strict.mockReset().mockResolvedValue({ state: "unavailable" });
  reads.legacy.mockReset().mockImplementation(() => {
    throw new Error("Slug-only lookup must never be used by HTML metadata");
  });
});
afterEach(() => vi.useRealTimers());

describe("GET/HEAD content gate with real Express response semantics", () => {
  it.each(["GET", "HEAD"])(
    "preserves every current maintained registry for %s without consulting DB",
    async method => {
      const paths = [
        ...new Set([
          ...getMaintainedStaticPaths(),
          ...CANONICAL_SERVICE_SLUGS.map(slug => `/services/${slug}`),
          ...Object.keys(countyData).map(slug => `/counties/${slug}`),
          ...Object.keys(locationSlugIndex).map(
            slug => `/service-areas/${slug}`
          ),
          ...Object.keys(GLOSSARY_BY_ID).map(slug => `/glossary/${slug}`),
        ]),
      ];
      const app = gatedApp();
      for (const path of paths) {
        const reply = await dispatch(app, method, path + query);
        expect(reply.status, path).toBe(200);
        expect(reply.body, path).toBe(
          method === "HEAD" ? "" : "<main>SPA sentinel</main>"
        );
      }
      expect(reads.strict).not.toHaveBeenCalled();
      expect(reads.legacy).not.toHaveBeenCalled();
    }
  );

  it.each(["GET", "HEAD"])(
    "returns a meaningful HTML 404 for unknown/error/detail paths on %s",
    async method => {
      reads.strict.mockResolvedValue({ state: "missing" });
      for (const path of [
        "/unknown-fixture",
        "/404",
        "/index.html",
        "/blog/unknown-fixture",
        "/glossary/unknown-fixture",
        "/glossary/sa-2-5/extra",
        "/blog/published-gate-fixture/extra",
        "/blog/%2e%2e",
        "/blog/%2fextra",
        "/services/constructor",
        "/counties/__proto__",
        "/service-areas/constructor",
        "/glossary/constructor",
      ])
        assert404(await dispatch(gatedApp(), method, path + query), method);
    }
  );

  it.each(["GET", "HEAD"])(
    "never returns an unpublished defensive lookup result as HTML 200 on %s",
    async method => {
      reads.strict.mockResolvedValue({
        state: "found",
        post: { ...post, isPublished: false },
      });
      assert404(
        await dispatch(gatedApp(), method, `/blog/${post.slug}${query}`),
        method
      );
      expect(reads.strict.mock.calls).toEqual([[post.slug]]);
    }
  );

  it.each(["GET", "HEAD"])(
    "uses temporary 503 for unavailable configuration and rejected reads on %s",
    async method => {
      assert503(
        await dispatch(gatedApp(), method, `/blog/${post.slug}${query}`),
        method
      );
      reads.strict.mockRejectedValueOnce(
        new Error("Controlled unavailable query")
      );
      assert503(
        await dispatch(gatedApp(), method, `/blog/${post.slug}/${query}`),
        method
      );
    }
  );

  it.each(["GET", "HEAD"])(
    "uses temporary 503 after a controlled read deadline on %s",
    async method => {
      vi.useFakeTimers();
      const lookupPost = vi.fn(
        () => new Promise<PublishedBlogHtmlResult>(() => undefined)
      );
      const reply = dispatch(
        gatedApp({ lookupPost, timeoutMs: 30 }),
        method,
        `/blog/${post.slug}`
      );
      await vi.advanceTimersByTimeAsync(30);
      assert503(await reply, method);
      expect(lookupPost.mock.calls).toEqual([[post.slug]]);
      expect(vi.getTimerCount()).toBe(0);
    }
  );

  it.each(["GET", "HEAD"])(
    "returns plain-text resource 404s rather than SPA HTML on %s",
    async method => {
      for (const path of [
        "/missing.jpg",
        "/missing.mp4",
        "/StructuralSteelFramesAfter.webp",
        "/missing.PDF",
        "/assets/missing.js",
        "/api/unknown",
        "/manus-storage/missing",
      ]) {
        const reply = await dispatch(gatedApp(), method, path + query);
        expect(reply.status).toBe(404);
        expect(reply.headers["content-type"]).toMatch(/^text\/plain/);
        expect(reply.headers["x-content-type-options"]).toBe("nosniff");
        expect(reply.headers["cache-control"]).toBe("no-store");
        expect(reply.body).toBe(method === "HEAD" ? "" : "Resource not found");
        expect(reply.body).not.toMatch(/<html|SPA sentinel/);
      }
      expect(reads.strict).not.toHaveBeenCalled();
    }
  );

  it.each(["POST", "PUT", "PATCH", "DELETE", "OPTIONS", "TRACE"])(
    "calls next without classification or a read for %s",
    async method => {
      const next = vi.fn();
      await createContentRouteGate()(
        { method, originalUrl: `/blog/${post.slug}` } as never,
        {} as never,
        next
      );
      expect(next.mock.calls).toEqual([[]]);
      expect(reads.strict).not.toHaveBeenCalled();
    }
  );

  it.each(["GET", "HEAD"])(
    "normalizes only healthy dynamic leaves with the entire raw query on %s",
    async method => {
      reads.strict.mockResolvedValue({ state: "found", post });
      for (const path of [`/blog/${post.slug}`, "/glossary/sa-2-5"]) {
        const reply = await dispatch(gatedApp(), method, path + "/" + query);
        expect(reply.status).toBe(301);
        expect(reply.headers.location).toBe(path + query);
        if (method === "HEAD") expect(reply.body).toBe("");
      }
      expect(reads.strict.mock.calls).toEqual([[post.slug]]);
      // The separate canonical-redirect matrix owns established static/legacy aliases.
    }
  );
});

describe("existing handlers get first refusal before the HTML gate", () => {
  const contracts = [
    {
      path: "/api/trpc/blog.list",
      type: "application/json",
      body: '{"result":{"data":[]}}',
      cache: "no-store",
    },
    {
      path: "/api/preload/homepage",
      type: "application/json",
      body: '{"testimonials":[],"gallery":[],"blogPosts":[]}',
      cache: "no-store",
    },
    {
      path: "/api/oauth/callback",
      type: "text/plain",
      body: "Simulated auth callback",
      cache: "no-store",
    },
    {
      path: "/manus-storage/gallery/fixture",
      type: "image/webp",
      body: "STORED-BYTES",
      cache: "public, max-age=3600",
    },
    {
      path: "/assets/fixture-AbCdEf12.js",
      type: "application/javascript",
      body: "export default 1",
      cache: "public, max-age=31536000, immutable",
    },
    {
      path: "/fixture-hero.webp",
      type: "image/webp",
      body: "IMAGE-BYTES",
      cache: "public, max-age=31536000, immutable",
    },
    {
      path: "/fixture-video.mp4",
      type: "video/mp4",
      body: "VIDEO-BYTES",
      cache: "public, max-age=31536000, immutable",
    },
    {
      path: "/fonts/fixture.woff2",
      type: "font/woff2",
      body: "FONT-BYTES",
      cache: "public, max-age=31536000, immutable",
    },
    {
      path: "/downloads/fixture.pdf",
      type: "application/pdf",
      body: "PDF-BYTES",
      cache: "public, max-age=3600",
    },
    {
      path: "/favicon.ico",
      type: "image/x-icon",
      body: "ICON-BYTES",
      cache: "public, max-age=3600",
    },
    {
      path: "/sitemap.xml",
      type: "application/xml",
      body: "<urlset/>",
      cache: "public, max-age=3600",
    },
    {
      path: "/robots.txt",
      type: "text/plain",
      body: "User-agent: *",
      cache: "public, max-age=3600",
    },
    {
      path: "/og/county/hampshire.png",
      type: "image/png",
      body: "OG-BYTES",
      cache: "public, max-age=3600",
    },
    {
      path: "/@vite/client",
      type: "application/javascript",
      body: "VITE-BYTES",
      cache: "no-cache",
    },
    {
      path: "/@fs/fixture.ts",
      type: "application/javascript",
      body: "FS-BYTES",
      cache: "no-cache",
    },
    {
      path: "/@id/fixture",
      type: "application/javascript",
      body: "ID-BYTES",
      cache: "no-cache",
    },
    {
      path: "/src/main.tsx",
      type: "application/javascript",
      body: "MODULE-BYTES",
      cache: "no-cache",
    },
    {
      path: "/node_modules/.vite/fixture.js",
      type: "application/javascript",
      body: "DEPENDENCY-BYTES",
      cache: "no-cache",
    },
  ];

  it.each(["GET", "HEAD"])(
    "preserves status, content type, body, caching and raw query for accepted contracts on %s",
    async method => {
      const handled = vi.fn();
      const reachedGate = vi.fn();
      const app = express();
      app.use((req, res, next) => {
        const contract = contracts.find(item => item.path === req.path);
        if (!contract) return next();
        handled(req.method, req.originalUrl);
        res
          .status(200)
          .set({
            "Content-Type": contract.type,
            "Cache-Control": contract.cache,
            "X-Content-Type-Options": "nosniff",
          })
          .send(contract.body);
      });
      app.use((req, res, next) => {
        reachedGate();
        return createContentRouteGate()(req, res, next);
      });
      app.use((_req, res) => res.send("SPA sentinel"));
      for (const contract of contracts) {
        const reply = await dispatch(app, method, contract.path + query);
        expect(reply.status, contract.path).toBe(200);
        expect(String(reply.headers["content-type"]), contract.path).toContain(
          contract.type
        );
        expect(reply.headers["cache-control"], contract.path).toBe(
          contract.cache
        );
        expect(reply.headers["x-content-type-options"]).toBe("nosniff");
        expect(reply.body, contract.path).toBe(
          method === "HEAD" ? "" : contract.body
        );
        expect(handled).toHaveBeenLastCalledWith(method, contract.path + query);
      }
      expect(reachedGate).not.toHaveBeenCalled();
      expect(reads.strict).not.toHaveBeenCalled();
    }
  );

  it.each(["GET", "HEAD"])(
    "rejects standalone HTML entry/error routes before a simulated physical index file on %s",
    async method => {
      const staticHandler = vi.fn();
      const app = express();
      app.use(rejectStandaloneHtmlEntry);
      app.use((_req, res) => {
        staticHandler();
        res.type("html").send("Physical index SPA sentinel");
      });
      for (const path of ["/index.html", "/404"])
        assert404(await dispatch(app, method, path + query), method);
      expect(staticHandler).not.toHaveBeenCalled();
      expect(reads.strict).not.toHaveBeenCalled();
    }
  );

  it("the entry exception is exact and GET/HEAD-only", () => {
    for (const [method, path] of [
      ["POST", "/index.html"],
      ["OPTIONS", "/404"],
      ["GET", "/contact"],
      ["HEAD", "/nested/index.html"],
    ]) {
      const next = vi.fn();
      rejectStandaloneHtmlEntry({ method, path } as never, {} as never, next);
      expect(next.mock.calls).toEqual([[]]);
    }
  });
});

describe("request-local metadata consistency without slug-only fallback", () => {
  it("passes the exact resolved post and unchanged raw URL to metadata after one read", async () => {
    reads.strict
      .mockResolvedValueOnce({ state: "found", post })
      .mockRejectedValue(
        new Error("A second read would race with outage/unpublishing")
      );
    const observed = vi.fn();
    const app = gatedApp({}, async (req, res, next) => {
      try {
        const content = res.locals.htmlContent as HtmlContentContext;
        observed(req.originalUrl, content);
        res
          .type("html")
          .send(await injectMetaTags(template, req.originalUrl, content));
      } catch (error) {
        next(error);
      }
    });
    const reply = await dispatch(app, "GET", `/blog/${post.slug}${query}`);
    expect(reply.status).toBe(200);
    expect(observed).toHaveBeenCalledWith(`/blog/${post.slug}${query}`, {
      kind: "blog",
      slug: post.slug,
      post,
    });
    expect((observed.mock.calls[0][1] as { post: BlogPost }).post).toBe(post);
    expect(reply.locals.htmlContent).toEqual({
      kind: "blog",
      slug: post.slug,
      post,
    });
    expect(reads.strict.mock.calls).toEqual([[post.slug]]);
    expect(reads.legacy).not.toHaveBeenCalled();
    expect(reply.body).toContain(articleMarkup);
    expect(reply.body).toContain(post.title);
    expect(reply.body).toContain(post.metaDescription);
    expect(reply.body).toContain(
      `rel="canonical" href="https://commercialshotblasting.co.uk/blog/${post.slug}"`
    );
    const schemas = [
      ...reply.body.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
      ),
    ].map(match => JSON.parse(match[1]));
    expect(schemas).toContainEqual(
      expect.objectContaining({
        "@type": "Article",
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.publishedAt.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        image: { "@type": "ImageObject", url: post.featuredImage },
      })
    );
    expect(schemas).toContainEqual(
      expect.objectContaining({ "@type": "FAQPage" })
    );
  });

  it("keeps a published blog HEAD response bodyless while handing its one read to metadata", async () => {
    reads.strict
      .mockResolvedValueOnce({ state: "found", post })
      .mockRejectedValue(new Error("No duplicate metadata read"));
    const app = gatedApp({}, async (req, res, next) => {
      try {
        res
          .type("html")
          .send(
            await injectMetaTags(
              template,
              req.originalUrl,
              res.locals.htmlContent
            )
          );
      } catch (error) {
        next(error);
      }
    });
    const reply = await dispatch(app, "HEAD", `/blog/${post.slug}${query}`);
    expect(reply.status).toBe(200);
    expect(reply.body).toBe("");
    expect(reply.headers["content-type"]).toMatch(/^text\/html/);
    expect(reply.locals.htmlContent).toEqual({
      kind: "blog",
      slug: post.slug,
      post,
    });
    expect(reads.strict.mock.calls).toEqual([[post.slug]]);
    expect(reads.legacy).not.toHaveBeenCalled();
  });

  it("keeps post contexts isolated across concurrent and later requests, without a global content cache", async () => {
    let completeFirst!: (value: PublishedBlogHtmlResult) => void;
    const second = {
      ...post,
      slug: "second-gate-fixture",
      title: "Second fixture title",
    };
    reads.strict.mockImplementation((slug: string) =>
      slug === post.slug
        ? new Promise<PublishedBlogHtmlResult>(done => {
            completeFirst = done;
          })
        : Promise.resolve({ state: "found", post: second })
    );
    const app = gatedApp({}, (_req, res) =>
      res
        .type("json")
        .send(
          JSON.stringify({
            slug: res.locals.htmlContent.slug,
            title: res.locals.htmlContent.post.title,
          })
        )
    );
    const firstReply = dispatch(app, "GET", `/blog/${post.slug}`);
    const secondReply = await dispatch(app, "GET", `/blog/${second.slug}`);
    completeFirst({ state: "found", post });
    expect(JSON.parse(secondReply.body)).toEqual({
      slug: second.slug,
      title: second.title,
    });
    expect(JSON.parse((await firstReply).body)).toEqual({
      slug: post.slug,
      title: post.title,
    });
    reads.strict.mockResolvedValueOnce({ state: "missing" });
    assert404(await dispatch(app, "GET", `/blog/${post.slug}`), "GET");
    expect(reads.strict).toHaveBeenCalledTimes(3);
  });

  it("uses one strict published lookup for standalone metadata and leaves existing article markup untouched", async () => {
    reads.strict.mockResolvedValue({ state: "found", post });
    const html = await injectMetaTags(template, `/blog/${post.slug}${query}`);
    expect(html).toContain(post.title);
    expect(html).toContain(articleMarkup);
    expect(reads.strict.mock.calls).toEqual([[post.slug]]);
    expect(reads.legacy).not.toHaveBeenCalled();
  });

  it("does not fabricate Article schema for standalone missing, unpublished or unavailable content", async () => {
    for (const result of [
      { state: "missing" },
      { state: "found", post: { ...post, isPublished: false } },
      { state: "unavailable" },
    ]) {
      reads.strict.mockResolvedValueOnce(result);
      const html = await injectMetaTags(template, `/blog/${post.slug}`);
      expect(html).not.toMatch(/application\/ld\+json|rel="canonical"/);
      expect(html).toMatch(
        result.state === "unavailable"
          ? /Temporarily Unavailable/
          : /Page Not Found/
      );
    }
    expect(reads.strict).toHaveBeenCalledTimes(3);
    expect(reads.legacy).not.toHaveBeenCalled();
  });

  it.each([
    "/blog/published-gate-fixture/extra",
    "/blog/published-gate-fixture.json",
    "/blog/%2fpublished-gate-fixture",
    "/glossary/sa-2-5/extra",
    "/glossary/sa-2-5.json",
    "/glossary/constructor",
    "/glossary/unknown-fixture",
  ])("does not misidentify a valid article/term at %s", async url => {
    const html = await injectMetaTags(template, url + query);
    expect(html).toMatch(/Page Not Found/);
    expect(html).not.toMatch(/application\/ld\+json|rel="canonical"/);
    expect(reads.strict).not.toHaveBeenCalled();
    expect(reads.legacy).not.toHaveBeenCalled();
  });

  it("renders all exact static glossary IDs independently of any DB failure", async () => {
    for (const slug of Object.keys(GLOSSARY_BY_ID)) {
      const html = await injectMetaTags(template, `/glossary/${slug}${query}`, {
        kind: "glossary",
        slug,
      });
      expect(html, slug).toContain('"@type":"DefinedTerm"');
      expect(html, slug).toContain(
        `rel="canonical" href="https://commercialshotblasting.co.uk/glossary/${slug}"`
      );
    }
    expect(reads.strict).not.toHaveBeenCalled();
    expect(reads.legacy).not.toHaveBeenCalled();
  });
});

describe("runtime registration source guards without importing startup or schedules", () => {
  it("places gates after resource handlers and before HTML fallback in both environments", () => {
    const source = readFileSync(
      resolve(import.meta.dirname, "_core/vite.ts"),
      "utf8"
    );
    const dev = source.slice(
      source.indexOf("export async function setupVite"),
      source.indexOf("export function serveStatic")
    );
    const prod = source.slice(source.indexOf("export function serveStatic"));
    expect(dev.indexOf("app.use(vite.middlewares)")).toBeLessThan(
      dev.indexOf("app.use(createContentRouteGate())")
    );
    expect(dev.indexOf("app.use(createContentRouteGate())")).toBeLessThan(
      dev.indexOf('app.use("*"')
    );
    expect(prod.indexOf("app.use(express.static")).toBeLessThan(
      prod.indexOf("app.use(createContentRouteGate())")
    );
    expect(prod.indexOf("app.use('/assets'")).toBeLessThan(
      prod.indexOf("app.use(createContentRouteGate())")
    );
    expect(prod.indexOf("app.use(createContentRouteGate())")).toBeLessThan(
      prod.indexOf('app.use("*"')
    );
    expect(
      source.match(/injectMetaTags\([^\n]+res\.locals\.htmlContent\)/g)
    ).toHaveLength(2);
  });

  it("rejects physical entry HTML before Vite/static setup without executing index.ts", () => {
    const source = readFileSync(
      resolve(import.meta.dirname, "_core/index.ts"),
      "utf8"
    );
    const entry = source.indexOf("app.use(rejectStandaloneHtmlEntry)");
    expect(entry).toBeGreaterThan(-1);
    expect(entry).toBeLessThan(source.indexOf("await setupVite"));
    expect(entry).toBeLessThan(source.indexOf("serveStatic(app)"));
  });
});
