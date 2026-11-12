import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { BlogPost } from "../drizzle/schema";
import type { PublishedBlogHtmlResult } from "./db";

const mocks = vi.hoisted(() => ({
  lookup: vi.fn(),
  drizzle: vi.fn(),
  eq: vi.fn((field: { name: string }, value: unknown) => ({
    operation: "eq",
    field,
    value,
  })),
  and: vi.fn((...clauses: unknown[]) => ({ operation: "and", clauses })),
}));
// No route test can reach a database, including tests of the default lookup.
vi.mock("./db", () => ({ getPublishedBlogPostForHtml: mocks.lookup }));
vi.mock("drizzle-orm/mysql2", () => ({ drizzle: mocks.drizzle }));
vi.mock("drizzle-orm", async importOriginal => ({
  ...(await importOriginal<typeof import("drizzle-orm")>()),
  eq: mocks.eq,
  and: mocks.and,
}));

import {
  getContentDetail,
  getHtmlPath,
  isResourceRequestPath,
  renderHtmlRouteError,
  resolveHtmlRoute,
} from "./contentRouteExistence";
import { getMaintainedStaticPaths } from "./seoUrlNormalisation";
import { CANONICAL_SERVICE_SLUGS } from "../shared/serviceSeoCatalog";
import { countyData } from "../client/src/data/countyData";
import { locationSlugIndex } from "../client/src/data/locationSlugIndex";
import { GLOSSARY_BY_ID } from "../client/src/data/glossaryData";

const post: BlogPost = {
  id: 7001,
  slug: "published-fixture",
  title: "Published fixture title",
  excerpt: "Public fixture excerpt",
  content: "<p>Public fixture body.</p>",
  featuredImage: "/fixture.webp",
  author: "Commercial Shot Blasting",
  category: "Preparation",
  tags: '["steel"]',
  faq: null,
  metaDescription: "Public fixture description",
  isPublished: true,
  publishedAt: new Date("2026-01-01T00:00:00Z"),
  createdAt: new Date("2026-01-01T00:00:00Z"),
  updatedAt: new Date("2026-01-02T00:00:00Z"),
};
const rawQuery =
  "?adwords=ppc&utm_campaign=fixture&utm_id=42&gclid=test&gbraid=test&wbraid=test&hsa_cam=42&ref=a%2Bb%2Fc%3Dd%20e&device=m&plus=a+b&dup=one&dup=two&empty=&bare";
const missingPage = { state: "missing", media: false };

beforeEach(() => {
  vi.clearAllMocks();
  mocks.lookup.mockReset().mockResolvedValue({ state: "unavailable" });
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
});

describe("safe, exact HTML path and detail parsing", () => {
  it("decodes segments once and disregards queries without reconstructing them", () => {
    expect(getHtmlPath("/blog/%70ublished-fixture" + rawQuery)).toBe(
      "/blog/published-fixture"
    );
    expect(getHtmlPath("/contact?bad=%ZZ&next=%2F..%2F")).toBe("/contact");
    expect(getHtmlPath("/service-areas/westward-ho%21")).toBe(
      "/service-areas/westward-ho!"
    );
    expect(getHtmlPath("/blog/%252F")).toBe("/blog/%2F");
  });

  it.each([
    "",
    "blog/published-fixture",
    "https://example.invalid/blog/published-fixture",
    "//contact",
    "/blog/\\published-fixture",
    "/blog/published-fixture\u0000",
    "/blog/%00",
    "/blog/%1F",
    "/blog/%7F",
    "/blog/%",
    "/blog/%GG",
    "/blog/%E0%A4%A",
    "/blog/%C0%AF",
    "/blog/%2Fpublished-fixture",
    "/blog/published-fixture%2fextra",
    "/blog/%5Cpublished-fixture",
    "/blog/.",
    "/blog/..",
    "/blog/%2e",
    "/blog/%2e%2e",
    "/blog/.%2e",
    "/blog/%2E./contact",
  ])(
    "rejects unsafe or malformed path %j before an authoritative read",
    async url => {
      expect(getHtmlPath(url)).toBeNull();
      expect(getContentDetail(url)).toBeNull();
      await expect(resolveHtmlRoute(url)).resolves.toEqual(missingPage);
      expect(mocks.lookup).not.toHaveBeenCalled();
    }
  );

  it.each([
    "/blog",
    "/glossary",
    "/blog/",
    "/blog//published-fixture",
    "/blog/published-fixture//",
    "/blog/published-fixture/extra",
    "/blog/published-fixture.json",
    "/blog/published-fixture.html",
    "/blog/published-fixture-",
    "/blog/-published-fixture",
    "/blog/published--fixture",
    "/blog/Published-Fixture",
    "/glossary/sa-2-5/extra",
    "/glossary/sa-2-5.json",
    "/glossary/sa-2-5//",
    "/blog/%252F",
    "/blog/%252e%252e",
    "/blog/__proto__",
  ])("does not prefix-match a detail route at %j", url => {
    expect(getContentDetail(url)).toBeNull();
  });

  it.each(["blog", "glossary"] as const)(
    "recognizes exactly one %s leaf with an optional single slash",
    kind => {
      for (const suffix of ["", "/", rawQuery, "/" + rawQuery]) {
        expect(getContentDetail(`/${kind}/published-fixture${suffix}`)).toEqual(
          {
            kind,
            slug: "published-fixture",
            canonical: `/${kind}/published-fixture`,
          }
        );
      }
    }
  );
});

describe("all maintained HTML route registries are independent of database health", () => {
  const groups = [
    ["maintained App owners", getMaintainedStaticPaths()],
    [
      "canonical services",
      CANONICAL_SERVICE_SLUGS.map(slug => `/services/${slug}`),
    ],
    ["counties", Object.keys(countyData).map(slug => `/counties/${slug}`)],
    [
      "catalogue locations",
      Object.keys(locationSlugIndex).map(slug => `/service-areas/${slug}`),
    ],
  ] as const;

  it("checks the expected finite service, county, town and glossary populations", () => {
    expect(CANONICAL_SERVICE_SLUGS).toHaveLength(28);
    expect(Object.keys(countyData)).toHaveLength(43);
    expect(Object.keys(locationSlugIndex)).toHaveLength(765);
    expect(Object.keys(GLOSSARY_BY_ID)).toHaveLength(12);
    expect(getMaintainedStaticPaths()).not.toContain("/404");
    expect(getMaintainedStaticPaths()).not.toContain("/index.html");
  });

  it.each(groups)(
    "preserves every current %s route, including query-bearing requests",
    async (_label, paths) => {
      for (const path of paths) {
        expect(await resolveHtmlRoute(path), path).toEqual({ state: "found" });
        expect(
          await resolveHtmlRoute(path + rawQuery),
          path + rawQuery
        ).toEqual({ state: "found" });
      }
      expect(mocks.lookup).not.toHaveBeenCalled();
    }
  );

  it("finds all twelve exact static glossary IDs without any DB read", async () => {
    for (const slug of Object.keys(GLOSSARY_BY_ID)) {
      expect(await resolveHtmlRoute(`/glossary/${slug}${rawQuery}`)).toEqual({
        state: "found",
        content: { kind: "glossary", slug },
      });
    }
    expect(mocks.lookup).not.toHaveBeenCalled();
  });

  it.each([
    "/arbitrary-missing-page",
    "/404",
    "/404?fixture=1",
    "/index.html",
    "/index.html?fixture=1",
    "/services/not-a-real-service",
    "/counties/not-a-real-county",
    "/service-areas/not-a-real-town",
    "/industries/not-a-real-industry",
    "/glossary/not-a-real-term",
    "/glossary/sa-2-5/extra",
    "/services/structural-steel-frames/extra",
    "/counties/hampshire/extra",
    "/service-areas/derby/extra",
    "/glossary/constructor",
    "/glossary/__proto__",
    "/glossary/toString",
    "/counties/constructor",
    "/counties/__proto__",
    "/counties/toString",
    "/service-areas/constructor",
    "/service-areas/__proto__",
    "/service-areas/toString",
    "/services/constructor",
    "/industries/constructor",
  ])("confirms %j missing rather than fabricating a page owner", async url => {
    await expect(resolveHtmlRoute(url)).resolves.toEqual(missingPage);
    expect(mocks.lookup).not.toHaveBeenCalled();
  });

  it("requires own properties even when a prototype supplies a syntactically valid slug", async () => {
    for (const [registry, prefix] of [
      [GLOSSARY_BY_ID, "/glossary"],
      [countyData, "/counties"],
      [locationSlugIndex, "/service-areas"],
    ] as const) {
      const previous = Object.getPrototypeOf(registry);
      try {
        Object.setPrototypeOf(registry, {
          "inherited-fixture": Object.values(registry)[0],
        });
        await expect(
          resolveHtmlRoute(`${prefix}/inherited-fixture`)
        ).resolves.toEqual(missingPage);
      } finally {
        Object.setPrototypeOf(registry, previous);
      }
    }
    expect(mocks.lookup).not.toHaveBeenCalled();
  });
});

describe("blog HTML follows one healthy published-only authoritative read", () => {
  it("returns the exact found post object for request-local rendering", async () => {
    mocks.lookup.mockResolvedValue({ state: "found", post });
    const result = await resolveHtmlRoute(`/blog/${post.slug}${rawQuery}`);
    expect(result).toEqual({
      state: "found",
      content: { kind: "blog", slug: post.slug, post },
    });
    if (result.state === "found" && result.content?.kind === "blog")
      expect(result.content.post).toBe(post);
    expect(mocks.lookup.mock.calls).toEqual([[post.slug]]);
  });

  it("allows a per-request injected strict read without consulting the default helper", async () => {
    const lookupPost = vi.fn().mockResolvedValue({ state: "found", post });
    await expect(
      resolveHtmlRoute(`/blog/${post.slug}`, { lookupPost })
    ).resolves.toMatchObject({ state: "found" });
    expect(lookupPost.mock.calls).toEqual([[post.slug]]);
    expect(mocks.lookup).not.toHaveBeenCalled();
  });

  it.each([
    ["healthy missing", { state: "missing" }],
    [
      "unpublished defensive result",
      { state: "found", post: { ...post, isPublished: false } },
    ],
    [
      "wrong-slug defensive result",
      { state: "found", post: { ...post, slug: "different-fixture" } },
    ],
    ["empty defensive found result", { state: "found", post: undefined }],
  ])(
    "returns 404 only for %s, including trailing-slash requests",
    async (_label, result) => {
      mocks.lookup.mockResolvedValue(result);
      await expect(resolveHtmlRoute(`/blog/${post.slug}`)).resolves.toEqual(
        missingPage
      );
      await expect(
        resolveHtmlRoute(`/blog/${post.slug}/${rawQuery}`)
      ).resolves.toEqual(missingPage);
      expect(mocks.lookup).toHaveBeenCalledTimes(2);
    }
  );

  it("does not collapse an unavailable strict helper or rejection into missing", async () => {
    await expect(resolveHtmlRoute(`/blog/${post.slug}`)).resolves.toEqual({
      state: "unavailable",
    });
    mocks.lookup.mockRejectedValueOnce(
      new Error("Controlled fixture backend failure")
    );
    await expect(
      resolveHtmlRoute(`/blog/${post.slug}/${rawQuery}`)
    ).resolves.toEqual({ state: "unavailable" });
  });

  it("times out a pending authoritative read and clears the timer", async () => {
    vi.useFakeTimers();
    const lookupPost = vi.fn(
      () => new Promise<PublishedBlogHtmlResult>(() => undefined)
    );
    const decision = resolveHtmlRoute(`/blog/${post.slug}`, {
      lookupPost,
      timeoutMs: 25,
    });
    await vi.advanceTimersByTimeAsync(25);
    await expect(decision).resolves.toEqual({ state: "unavailable" });
    expect(lookupPost).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("clears the timeout after a successful immediate read", async () => {
    vi.useFakeTimers();
    mocks.lookup.mockResolvedValue({ state: "found", post });
    await resolveHtmlRoute(`/blog/${post.slug}`, { timeoutMs: 25 });
    expect(vi.getTimerCount()).toBe(0);
  });

  it("does not cache found or missing decisions across requests", async () => {
    mocks.lookup
      .mockResolvedValueOnce({ state: "found", post })
      .mockResolvedValueOnce({ state: "missing" });
    await expect(resolveHtmlRoute(`/blog/${post.slug}`)).resolves.toMatchObject(
      { state: "found" }
    );
    await expect(resolveHtmlRoute(`/blog/${post.slug}`)).resolves.toEqual(
      missingPage
    );
    expect(mocks.lookup).toHaveBeenCalledTimes(2);
  });

  it("normalizes a published dynamic slash only after existence, retaining every raw query byte", async () => {
    mocks.lookup.mockResolvedValue({ state: "found", post });
    await expect(
      resolveHtmlRoute(`/blog/${post.slug}/${rawQuery}`)
    ).resolves.toEqual({
      state: "redirect",
      destination: `/blog/${post.slug}${rawQuery}`,
    });
    expect(mocks.lookup.mock.calls).toEqual([[post.slug]]);
    await expect(
      resolveHtmlRoute(`/glossary/sa-2-5/${rawQuery}`)
    ).resolves.toEqual({
      state: "redirect",
      destination: `/glossary/sa-2-5${rawQuery}`,
    });
    expect(mocks.lookup).toHaveBeenCalledTimes(1);
  });
});

describe("missing resources are not SPA pages", () => {
  it.each([
    "avif",
    "webp",
    "jpg",
    "jpeg",
    "png",
    "gif",
    "svg",
    "ico",
    "bmp",
    "tif",
    "tiff",
    "heic",
    "heif",
    "mp4",
    "mov",
    "m4v",
    "webm",
    "avi",
    "mkv",
    "mp3",
    "wav",
    "ogg",
    "pdf",
    "woff",
    "woff2",
    "ttf",
    "otf",
    "eot",
    "js",
    "mjs",
    "css",
    "map",
    "json",
    "xml",
    "txt",
    "csv",
    "zip",
    "webmanifest",
  ])(
    "classifies missing .%s files case-insensitively and with raw queries",
    async extension => {
      for (const url of [
        `/missing.${extension}`,
        `/missing.${extension.toUpperCase()}${rawQuery}`,
      ]) {
        expect(isResourceRequestPath(url)).toBe(true);
        await expect(resolveHtmlRoute(url)).resolves.toEqual({
          state: "missing",
          media: true,
        });
      }
      expect(mocks.lookup).not.toHaveBeenCalled();
    }
  );

  // Portable controls from the saved 271-record historical media population;
  // these are classifier tests, not claims that deployed files are still missing.
  it.each([
    "/StructuralSteelFramesAfter.webp",
    "/StructuralSteelFramesBefore.webp",
    "/agriculture-equipment.jpg",
    "/agriculture-industry-hero-new.webp",
  ])(
    "classifies historical media control %s without HTTP or an archive dependency",
    async url => {
      expect(url).toMatch(/\.(?:webp|jpe?g|png|gif|svg|avif)$/i);
      expect(isResourceRequestPath(url)).toBe(true);
      await expect(resolveHtmlRoute(url + rawQuery)).resolves.toEqual({
        state: "missing",
        media: true,
      });
    }
  );

  it.each([
    "/assets/missing-file",
    "/manus-storage/missing",
    "/api/unknown",
    "/@vite/client",
    "/@fs/fixture",
    "/@id/fixture",
    "/src/main.tsx",
    "/node_modules/fixture",
    "/og/missing",
  ])(
    "does not turn an unhandled resource namespace %s into SPA HTML",
    async url => {
      expect(isResourceRequestPath(url)).toBe(true);
      await expect(resolveHtmlRoute(url)).resolves.toEqual({
        state: "missing",
        media: true,
      });
    }
  );

  it("does not classify a buyer route from a resource-looking query or prefix collision", () => {
    for (const url of [
      "/contact?image=hero.jpg",
      "/blog/published-fixture?script=main.js",
      "/apiary",
      "/assets-page",
    ]) {
      expect(isResourceRequestPath(url)).toBe(false);
    }
  });
});

describe("error HTML policy", () => {
  it("renders a meaningful navigable noindex 404 without normal-page schema or canonical", () => {
    const html = renderHtmlRouteError(404);
    expect(html).toMatch(/<h1>[^<]*Page Not Found[^<]*<\/h1>/i);
    expect(html).toMatch(
      /<meta[^>]*name="robots"[^>]*content="noindex,\s*follow"/i
    );
    for (const path of ["/services", "/our-work", "/service-areas", "/contact"])
      expect(html).toContain(`href="${path}"`);
    expect(html).not.toMatch(
      /application\/ld\+json|"@type"\s*:\s*"(?:WebPage|Article)"|rel="canonical"/
    );
  });

  it("uses neutral temporary-unavailability copy, not a false deletion assertion", () => {
    const html = renderHtmlRouteError(503);
    expect(html).toMatch(/<h1>[^<]*Temporarily Unavailable[^<]*<\/h1>/i);
    expect(html).toMatch(/try again/i);
    expect(html).not.toMatch(
      /Page Not Found|deleted|permanently removed|application\/ld\+json|rel="canonical"/i
    );
    // A 503 robots directive is deliberately not an acceptance assertion.
  });
});

describe("isolated real DB helper contracts with a fully mocked Drizzle builder", () => {
  type Clause = { operation: "eq"; field: { name: string }; value: unknown };
  type Predicate = Clause | { operation: "and"; clauses: Clause[] };
  let rows: BlogPost[];
  let predicate: Predicate;
  let builder: {
    select: ReturnType<typeof vi.fn>;
    from: ReturnType<typeof vi.fn>;
    where: ReturnType<typeof vi.fn>;
    limit: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("DATABASE_URL", "mysql://fixture.invalid/not-a-real-database");
    rows = [];
    builder = {
      select: vi.fn(() => builder),
      from: vi.fn(() => builder),
      where: vi.fn((condition: Predicate) => {
        predicate = condition;
        return builder;
      }),
      limit: vi.fn(async (limit: number) => {
        const clauses =
          predicate.operation === "and" ? predicate.clauses : [predicate];
        return rows
          .filter(row =>
            clauses.every(
              clause =>
                row[clause.field.name as keyof BlogPost] === clause.value
            )
          )
          .slice(0, limit);
      }),
    };
    mocks.drizzle.mockReset().mockReturnValue(builder);
  });

  async function realDb() {
    return vi.importActual<typeof import("./db")>("./db");
  }

  it("queries slug AND isPublished=true, with limit one, and returns the exact row", async () => {
    rows = [
      { ...post, slug: "unrelated" },
      { ...post, isPublished: false },
      post,
    ];
    const db = await realDb();
    const result = await db.getPublishedBlogPostForHtml(post.slug);
    expect(result).toEqual({ state: "found", post });
    if (result.state === "found") expect(result.post).toBe(post);
    expect(builder.where.mock.calls).toEqual([
      [
        {
          operation: "and",
          clauses: [
            {
              operation: "eq",
              field: expect.objectContaining({ name: "slug" }),
              value: post.slug,
            },
            {
              operation: "eq",
              field: expect.objectContaining({ name: "isPublished" }),
              value: true,
            },
          ],
        },
      ],
    ]);
    expect(builder.limit.mock.calls).toEqual([[1]]);
    expect(mocks.drizzle).toHaveBeenCalledTimes(1);
  });

  it.each(["absent", "draft-only"])(
    "distinguishes a healthy %s result from unavailable",
    async scenario => {
      rows = scenario === "draft-only" ? [{ ...post, isPublished: false }] : [];
      const db = await realDb();
      await expect(db.getPublishedBlogPostForHtml(post.slug)).resolves.toEqual({
        state: "missing",
      });
      expect(builder.limit).toHaveBeenCalledTimes(1);
    }
  );

  it("returns unavailable with no DATABASE_URL, while preserving legacy undefined", async () => {
    vi.stubEnv("DATABASE_URL", "");
    const db = await realDb();
    await expect(db.getPublishedBlogPostForHtml(post.slug)).resolves.toEqual({
      state: "unavailable",
    });
    await expect(db.getBlogPostBySlug(post.slug)).resolves.toBeUndefined();
    expect(mocks.drizzle).not.toHaveBeenCalled();
    expect(builder.select).not.toHaveBeenCalled();
  });

  it("returns unavailable after an initialization failure without attempting a query", async () => {
    mocks.drizzle.mockImplementationOnce(() => {
      throw new Error("Controlled initialization failure");
    });
    const warning = vi
      .spyOn(console, "warn")
      .mockImplementation(() => undefined);
    try {
      const db = await realDb();
      await expect(db.getPublishedBlogPostForHtml(post.slug)).resolves.toEqual({
        state: "unavailable",
      });
      expect(builder.select).not.toHaveBeenCalled();
    } finally {
      warning.mockRestore();
    }
  });

  it("returns unavailable after a rejected strict query, never healthy missing", async () => {
    builder.limit.mockRejectedValueOnce(new Error("Controlled query failure"));
    const db = await realDb();
    await expect(db.getPublishedBlogPostForHtml(post.slug)).resolves.toEqual({
      state: "unavailable",
    });
    expect(builder.limit).toHaveBeenCalledTimes(1);
  });

  it("preserves the legacy slug-only API and its draft result rather than silently tightening it", async () => {
    const draft = { ...post, isPublished: false };
    rows = [draft];
    const db = await realDb();
    await expect(db.getBlogPostBySlug(post.slug)).resolves.toBe(draft);
    expect(builder.where.mock.calls).toEqual([
      [
        {
          operation: "eq",
          field: expect.objectContaining({ name: "slug" }),
          value: post.slug,
        },
      ],
    ]);
    expect(mocks.and).not.toHaveBeenCalled();
  });
});
