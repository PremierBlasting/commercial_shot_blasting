import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EventEmitter } from "node:events";
import type { BlogPost } from "../drizzle/schema";
import type { HtmlContentContext } from "./contentRouteExistence";

// Mock the entire DB import: an omitted/accidental read throws, never opens MySQL.
const denied = vi.hoisted(() => ({ read: vi.fn(() => { throw new Error("TEST DENIED real database/auth/CRM/storage"); }) }));
vi.mock("./db", () => new Proxy({
  getActiveGalleryItems: denied.read, getActiveTestimonials: denied.read,
  getPublishedBlogPosts: denied.read, getRelatedBlogPosts: denied.read,
  getPublishedBlogPostForHtml: denied.read, getBlogPostBySlug: denied.read,
}, { get(target, property) { if (property === "then") return undefined; return Reflect.get(target, property) ?? denied.read; } }));
vi.mock("./routers", () => { throw new Error("TEST DENIED general router"); });
vi.mock("./_core/context", () => { throw new Error("TEST DENIED authenticated context"); });
vi.mock("./storage", () => { throw new Error("TEST DENIED storage"); });
vi.mock("../vite.config", () => ({ default: {} }));
vi.mock("./metaTags", () => ({ injectMetaTags: denied.read, composeRouteMetadataHead: denied.read, resolveServerRouteMetadata: denied.read }));
import { prefetchPilot, createTrackedPilotReads, type PilotPublicReads } from "./ssr/pilotPrefetch";
import { createContentRouteGate } from "./contentRouteExistence";

const slug = "factory-warehouse-cladding-restoration";
const articleUrl = "/blog/" + slug;
const date = new Date("2026-01-01T23:30:00Z");
const gallery = { id: 1, title: "Public steel fixture", category: "structural", description: "Public gallery copy", beforeImage: "/before.webp", afterImage: "/after.webp", isActive: true, sortOrder: 0, createdAt: date, updatedAt: date };
const testimonial = { id: 2, name: "Public reviewer", company: "HB Tunnelling Limited", rating: 5, text: "Public testimonial", project: "Public project", images: '["/review.webp"]', isNew: false, isActive: true, sortOrder: 0, createdAt: date, updatedAt: date };
const post: BlogPost = { id: 3, slug, title: "Factory & Warehouse Cladding Restoration", excerpt: "Public article fixture", content: "<p>Public maintained article fixture body.</p>", featuredImage: "/article.webp", author: "Commercial Shot Blasting", category: "Request record category", tags: '["steel"]', faq: null, metaDescription: "Public description", isPublished: true, publishedAt: date, createdAt: date, updatedAt: date };
const key = (procedure: string, input?: object) => [procedure.split("."), { ...(input === undefined ? {} : { input }), type: "query" }];
const galleryFields = Object.keys(gallery).sort();
const testimonialFields = Object.keys(testimonial).sort();
const blogFields = Object.keys(post).sort();

// These adapter names mirror the existing narrow DB getters; align only to the
// implementation's real exported interface, never substitute a router caller.
function reads(overrides: Partial<PilotPublicReads> = {}): PilotPublicReads {
  return {
    getActiveGalleryItems: vi.fn().mockResolvedValue([gallery]),
    getActiveTestimonials: vi.fn().mockResolvedValue([testimonial]),
    getPublishedBlogPosts: vi.fn().mockResolvedValue([post]),
    getRelatedBlogPosts: vi.fn().mockResolvedValue([{ ...post, id: 4, slug: "related-public-post" }]),
    ...overrides,
  } as PilotPublicReads;
}
function content(value: BlogPost = post): HtmlContentContext { return { kind: "blog", slug, post: value }; }
function data(seeds: { queryKey: unknown[]; data: unknown }[], procedure: string) {
  return seeds.find(seed => JSON.stringify(seed.queryKey[0]) === JSON.stringify(procedure.split(".")))!.data as any;
}
beforeEach(() => {
  vi.clearAllMocks(); vi.useFakeTimers(); vi.setSystemTime(date);
  vi.stubGlobal("fetch", vi.fn(() => { throw new Error("TEST DENIED HTTP/Google/CRM/storage/contact"); }));
});
afterEach(() => { expect(denied.read).not.toHaveBeenCalled(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("public reads, exact successful tRPC keys and explicit projection", () => {
  it("seeds all three homepage undefined-input keys, retaining ordered raw public rows/Dates", async () => {
    const r = reads({ getActiveGalleryItems: vi.fn().mockResolvedValue([gallery, { ...gallery, id: 99, title: "Second public item", sortOrder: 99 }]) } as any);
    const seeds = await prefetchPilot("/?utm_campaign=PRIVATE_QUERY&gclid=PRIVATE_CLICK?dup=2", undefined, undefined, r);
    expect(seeds.map(seed => seed.queryKey)).toEqual([key("gallery.list"), key("testimonials.list"), key("blog.list")]);
    expect(data(seeds, "gallery.list").map((row: any) => row.id)).toEqual([1, 99]);
    expect(data(seeds, "gallery.list")[0].createdAt).toEqual(date);
    expect(data(seeds, "blog.list")[0].publishedAt).toEqual(date);
    expect(data(seeds, "blog.list")[0].tags).toBe(post.tags);
    expect(data(seeds, "testimonials.list")[0].images).toEqual(["/review.webp"]);
    expect(JSON.stringify(seeds)).not.toMatch(/PRIVATE_QUERY|PRIVATE_CLICK/);
    expect((r as any).getRelatedBlogPosts).not.toHaveBeenCalled();
  });
  it("projects exact fixed public fields, stripping private and future DB fields", async () => {
    const additions = { email: "PRIVATE_EMAIL", phone: "PRIVATE_PHONE", token: "PRIVATE_TOKEN", internalNotes: "PRIVATE_INTERNAL", futureColumn: "PRIVATE_FUTURE" };
    const r = reads({ getActiveGalleryItems: vi.fn().mockResolvedValue([{ ...gallery, ...additions }]), getActiveTestimonials: vi.fn().mockResolvedValue([{ ...testimonial, ...additions }]), getPublishedBlogPosts: vi.fn().mockResolvedValue([{ ...post, ...additions }]) } as any);
    const seeds = await prefetchPilot("/", undefined, undefined, r);
    expect(Object.keys(data(seeds, "gallery.list")[0]).sort()).toEqual(galleryFields);
    expect(Object.keys(data(seeds, "testimonials.list")[0]).sort()).toEqual(testimonialFields);
    expect(Object.keys(data(seeds, "blog.list")[0]).sort()).toEqual(blogFields);
    expect(JSON.stringify(seeds)).not.toContain("PRIVATE_");
  });
  it("preserves a genuine unrated testimonial rating 0 without fabricating review stars", async () => {
    const r = reads({ getActiveTestimonials: vi.fn().mockResolvedValue([{ ...testimonial, rating: 0 }]) });
    const seeds = await prefetchPilot("/", undefined, undefined, r);
    expect(data(seeds, "testimonials.list")[0].rating).toBe(0);
    expect(data(seeds, "testimonials.list")[0].text).toBe(testimonial.text);
  });
  it.each([-1, 6, 1.5, NaN])("rejects successful testimonial invalid rating %j rather than inventing []", async rating => {
    await expect(prefetchPilot("/", undefined, undefined, reads({ getActiveTestimonials: vi.fn().mockResolvedValue([{ ...testimonial, rating }]) }))).rejects.toThrow();
  });
  it("structural has exactly two keys, Hampshire has none, guards have no reads", async () => {
    const r = reads();
    expect((await prefetchPilot("/services/structural-steel-frames?", undefined, undefined, r)).map(seed => seed.queryKey)).toEqual([key("gallery.list"), key("testimonials.list")]);
    vi.clearAllMocks();
    expect(await prefetchPilot("/counties/hampshire", undefined, undefined, r)).toEqual([]);
    for (const path of ["/services/intumescent-painting", "/admin", "/counties/hampshire/", "/index.html"]) await expect(prefetchPilot(path, undefined, undefined, r)).rejects.toThrow();
    for (const read of Object.values(r)) if (typeof read === "function") expect(read).not.toHaveBeenCalled();
  });
  it.each([post.category, null])("article uses ONLY gate record and explicit request category %j", async category => {
    const r = reads();
    const seeds = await prefetchPilot(articleUrl + "?category=WRONG_URL_CATEGORY", content({ ...post, category }), undefined, r);
    expect(seeds.map(seed => seed.queryKey)).toEqual([key("blog.getBySlug", { slug }), key("blog.getRelated", { slug, category })]);
    expect(data(seeds, "blog.getBySlug")).toEqual({ ...post, category });
    expect((r as any).getRelatedBlogPosts).toHaveBeenCalledWith(slug, category);
    for (const method of ["getActiveGalleryItems", "getActiveTestimonials", "getPublishedBlogPosts"]) expect((r as any)[method]).not.toHaveBeenCalled();
  });
  it("does not mutate a shared source record or retain request data between concurrent requests", async () => {
    const rA = reads({ getActiveGalleryItems: vi.fn().mockResolvedValue([{ ...gallery, title: "REQUEST_A" }]) } as any);
    const rB = reads({ getActiveGalleryItems: vi.fn().mockResolvedValue([{ ...gallery, title: "REQUEST_B" }]) } as any);
    const [a, b] = await Promise.all([prefetchPilot("/", undefined, undefined, rA), prefetchPilot("/", undefined, undefined, rB)]);
    expect(data(a, "gallery.list")[0].title).toBe("REQUEST_A");
    expect(data(b, "gallery.list")[0].title).toBe("REQUEST_B");
    data(a, "gallery.list")[0].title = "MUTATED_A";
    expect(data(b, "gallery.list")[0].title).toBe("REQUEST_B");
    expect(gallery.title).toBe("Public steel fixture");
  });
});

describe("optional existing empty fallback is not a timeout/primary-data success", () => {
  it("seeds successful empty arrays for optional failures and whole-list malformed testimonial JSON", async () => {
    const r = reads({ getActiveGalleryItems: vi.fn().mockRejectedValue(new Error("PRIVATE_DB_ERROR")), getActiveTestimonials: vi.fn().mockResolvedValue([testimonial, { ...testimonial, id: 5, images: "not-json" }]), getPublishedBlogPosts: vi.fn().mockRejectedValue(new Error("PRIVATE_DB_ERROR")) } as any);
    const seeds = await prefetchPilot("/", undefined, undefined, r);
    expect(seeds.map(seed => seed.data)).toEqual([[], [], []]);
    expect(JSON.stringify(seeds)).not.toContain("PRIVATE_DB_ERROR");
  });
  it("retains optional article-related empty fallback but rejects successful invalid or draft rows", async () => {
    const fallback = await prefetchPilot(articleUrl, content(), undefined, reads({ getRelatedBlogPosts: vi.fn().mockRejectedValue(new Error("PRIVATE_RELATED_ERROR")) }));
    expect(data(fallback, "blog.getBySlug")).toEqual(post);
    expect(data(fallback, "blog.getRelated")).toEqual([]);
    for (const invalid of [{ ...post, isPublished: false }, { ...post, slug }, { ...post, slug: "related-public-post", tags: "bad-json" }]) {
      await expect(prefetchPilot(articleUrl, content(), undefined, reads({ getRelatedBlogPosts: vi.fn().mockResolvedValue([invalid]) }))).rejects.toThrow();
    }
  });
  it("does not turn successful malformed public projections into fabricated optional empty lists", async () => {
    for (const invalid of [{ ...gallery, createdAt: "2026-01-01" }, { ...gallery, isActive: false }, { ...gallery, id: "1" }]) {
      await expect(prefetchPilot("/", undefined, undefined, reads({ getActiveGalleryItems: vi.fn().mockResolvedValue([invalid]) }))).rejects.toThrow();
    }
    await expect(prefetchPilot("/", undefined, undefined, reads({ getPublishedBlogPosts: vi.fn().mockResolvedValue([{ ...post, isPublished: false }]) }))).rejects.toThrow();
  });
  it("never fabricates a successful seed after the 1500 ms waiting deadline", async () => {
    let settle!: (value: any[]) => void;
    const pending = new Promise<any[]>(resolve => { settle = resolve; });
    const result = prefetchPilot("/", undefined, undefined, reads({ getActiveGalleryItems: vi.fn().mockReturnValue(pending) } as any));
    const assertion = expect(result).rejects.toThrow();
    await vi.advanceTimersByTimeAsync(1501);
    await assertion;
    settle([gallery]); await Promise.resolve();
  });
  it.each([
    undefined, { kind: "glossary", slug }, { kind: "blog", slug: "wrong", post },
    { kind: "blog", slug, post: { ...post, slug: "wrong" } },
    { kind: "blog", slug, post: { ...post, isPublished: false } },
    { kind: "blog", slug, post: { ...post, content: "" } },
    { kind: "blog", slug, post: { ...post, publishedAt: new Date("invalid") } },
    { kind: "blog", slug, post: { ...post, tags: "bad-json" } },
    { kind: "blog", slug, post: { ...post, tags: '{"not":"an-array"}' } },
    { kind: "blog", slug, post: { ...post, content: '<script>alert("denied")</script>' } },
    { kind: "blog", slug, post: { ...post, content: '<img src="x" onerror="alert(1)">' } },
  ])("stops article without exact valid safe primary gate context %j", async input => {
    const r = reads();
    await expect(prefetchPilot(articleUrl, input as HtmlContentContext, undefined, r)).rejects.toThrow();
    expect((r as any).getRelatedBlogPosts).not.toHaveBeenCalled();
  });
  it("already-aborted or midread aborted requests reject rather than seed later results", async () => {
    const controller = new AbortController(); controller.abort();
    const r = reads();
    await expect(prefetchPilot("/", undefined, controller.signal, r)).rejects.toThrow();
    for (const read of Object.values(r)) if (typeof read === "function") expect(read).not.toHaveBeenCalled();
    let settle!: (value: any[]) => void;
    const pending = new Promise<any[]>(resolve => { settle = resolve; });
    const mid = new AbortController();
    const result = prefetchPilot("/", undefined, mid.signal, reads({ getActiveGalleryItems: vi.fn().mockReturnValue(pending) } as any));
    const assertion = expect(result).rejects.toThrow();
    mid.abort(); await assertion; settle([gallery]); await Promise.resolve();
  });
});

describe("unchanged authoritative Task04 missing/draft/outage status before render", () => {
  it.each([
    ["missing", { state: "missing" }, 404],
    ["draft", { state: "found", post: { ...post, isPublished: false } }, 404],
    ["unavailable", { state: "unavailable" }, 503],
  ] as const)("keeps %s status and does not continue to SSR", async (_name, lookupResult, status) => {
    const lookup = vi.fn().mockResolvedValue(lookupResult);
    const gate = createContentRouteGate({ lookupPost: lookup } as any);
    const req = { method: "GET", originalUrl: articleUrl } as any;
    const headers: Record<string, unknown> = {};
    const res: any = { locals: {}, set: vi.fn((arg: any, value?: any) => { if (typeof arg === "object") Object.assign(headers, arg); else headers[arg] = value; return res; }), status: vi.fn(() => res), type: vi.fn(() => res), send: vi.fn(() => res) };
    const next = vi.fn();
    await gate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(status);
    expect(next).not.toHaveBeenCalled(); expect(lookup).toHaveBeenCalledTimes(1);
    expect(headers["Cache-Control"]).toBe("no-store");
    if (status === 503) expect(headers["Retry-After"]).toBe("60");
    else expect(res.send.mock.calls[0][0]).toContain("noindex");
  });
});

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

// Real exported orchestration helpers in the approved vite.ts seam, not test
// implementations. Source-ready parent confirmation makes all active by default.
describe("pilot leases, outstanding work, deadlines and request disconnect", () => {
  it("uses real aborted/close listeners, distinguishes normal finish, and detaches idempotently", async () => {
    const { createPilotDisconnectSignal } = await import("./_core/vite");
    const req = Object.assign(new EventEmitter(), { aborted: false });
    const res = Object.assign(new EventEmitter(), { writableFinished: true, destroyed: false });
    const normal = createPilotDisconnectSignal(req as any,res as any);
    expect(req.listenerCount("aborted")).toBe(1); expect(res.listenerCount("close")).toBe(1);
    res.emit("close"); expect(normal.signal.aborted).toBe(false);
    normal.detach(); normal.detach(); expect(req.listenerCount("aborted")).toBe(0); expect(res.listenerCount("close")).toBe(0);
    res.writableFinished = false;
    const closed = createPilotDisconnectSignal(req as any,res as any); res.emit("close"); expect(closed.signal.aborted).toBe(true); closed.detach();
    const aborted = createPilotDisconnectSignal(req as any,res as any); req.emit("aborted"); expect(aborted.signal.aborted).toBe(true); aborted.detach();
    req.aborted = true;
    const early = createPilotDisconnectSignal(req as any,res as any); expect(early.signal.aborted).toBe(true); early.detach();
    expect(req.listenerCount("aborted")).toBe(0); expect(res.listenerCount("close")).toBe(0);
  });
  it("limits concurrent leases to two immediately with no queue; finish is idempotent", async () => {
    const { createPilotLeasePool } = await import("./_core/vite");
    const pool = createPilotLeasePool();
    const a = pool.tryAcquire()!; const b = pool.tryAcquire()!;
    expect(pool.outstanding).toBe(2); expect(pool.tryAcquire()).toBeNull();
    a.finish(); a.finish(); await a.settled; expect(pool.outstanding).toBe(1);
    const c = pool.tryAcquire()!; expect(c).not.toBe(a); expect(pool.outstanding).toBe(2);
    b.finish(); c.finish(); await Promise.all([b.settled,c.settled]); expect(pool.outstanding).toBe(0);
    expect(() => createPilotLeasePool(3)).toThrow();
  });
  it("holds leases after optional 1500ms timeout until actual noncancelable reads settle", async () => {
    const { createPilotLeasePool, runPilotWithDeadline } = await import("./_core/vite");
    const pool=createPilotLeasePool(); const pendingA=deferred<any[]>(); const pendingB=deferred<any[]>();
    const a=pool.tryAcquire()!; const b=pool.tryAcquire()!;
    const operation = (lease: typeof a,pending: ReturnType<typeof deferred<any[]>>) => runPilotWithDeadline(lease,(signal,track)=>prefetchPilot("/",undefined,signal,createTrackedPilotReads(track,reads({getActiveGalleryItems:vi.fn().mockReturnValue(pending.promise)} as any),signal)));
    const ra=operation(a,pendingA); const rb=operation(b,pendingB);
    const aa=expect(ra).rejects.toThrow(); const ab=expect(rb).rejects.toThrow();
    await vi.advanceTimersByTimeAsync(1501); await Promise.all([aa,ab]);
    expect(pool.outstanding).toBe(2); expect(a.pending).toBeGreaterThan(0); expect(b.pending).toBeGreaterThan(0);
    for(let i=0;i<20;i++) expect(pool.tryAcquire()).toBeNull();
    expect(() => a.track(Promise.resolve([]))).toThrow();
    pendingA.resolve([gallery]); await a.settled; expect(pool.outstanding).toBe(1);
    pendingB.resolve([gallery]); await b.settled; expect(pool.outstanding).toBe(0);
  });
  it("enforces the 5s additional budget, aborts waiting, yet holds unresolved work", async () => {
    const { createPilotLeasePool, runPilotWithDeadline } = await import("./_core/vite");
    const pool=createPilotLeasePool(); const lease=pool.tryAcquire()!; const pending=deferred<string>();
    let internal!: AbortSignal;
    const result=runPilotWithDeadline(lease,async(signal,track)=>{internal=signal;return track(pending.promise);});
    const assertion=expect(result).rejects.toThrow();
    await vi.advanceTimersByTimeAsync(4999); expect(internal.aborted).toBe(false);
    await vi.advanceTimersByTimeAsync(2); await assertion;
    expect(internal.aborted).toBe(true); expect(pool.outstanding).toBe(1);
    pending.resolve("late result must not become success"); await lease.settled; expect(pool.outstanding).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });
  it("disconnect aborts one request, preserves concurrent request and frees only drained work", async () => {
    const { createPilotLeasePool, runPilotWithDeadline } = await import("./_core/vite");
    const pool=createPilotLeasePool(); const a=pool.tryAcquire()!; const b=pool.tryAcquire()!;
    const controller=new AbortController(); const add=vi.spyOn(controller.signal,"addEventListener"); const remove=vi.spyOn(controller.signal,"removeEventListener");
    const pendingA=deferred<string>(); const pendingB=deferred<string>(); let aSignal!:AbortSignal; let bSignal!:AbortSignal;
    const ra=runPilotWithDeadline(a,(signal,track)=>{aSignal=signal;return track(pendingA.promise);},{signal:controller.signal});
    const rb=runPilotWithDeadline(b,(signal,track)=>{bSignal=signal;return track(pendingB.promise);});
    const assertion=expect(ra).rejects.toThrow(); await vi.advanceTimersByTimeAsync(0); controller.abort(); await assertion;
    expect(aSignal.aborted).toBe(true); expect(bSignal.aborted).toBe(false); expect(pool.outstanding).toBe(2);
    expect(add).toHaveBeenCalled(); expect(remove).toHaveBeenCalled();
    pendingB.resolve("REQUEST_B"); await expect(rb).resolves.toBe("REQUEST_B"); await b.settled; expect(pool.outstanding).toBe(1);
    pendingA.reject(new Error("late private error")); await a.settled; expect(pool.outstanding).toBe(0); expect(vi.getTimerCount()).toBe(0);
  });
  it("already-aborted requests never start work; late synchronous return also fails deadline", async () => {
    const { createPilotLeasePool, runPilotWithDeadline } = await import("./_core/vite");
    const pool=createPilotLeasePool(); const controller=new AbortController(); controller.abort(); const work=vi.fn().mockResolvedValue("must not run");
    await expect(runPilotWithDeadline(pool.tryAcquire()!,work,{signal:controller.signal})).rejects.toThrow(); expect(work).not.toHaveBeenCalled(); expect(pool.outstanding).toBe(0);
    await expect(runPilotWithDeadline(pool.tryAcquire()!,async()=>{vi.setSystemTime(new Date(date.getTime()+5001));return "late synchronous render";})).rejects.toThrow();
    expect(pool.outstanding).toBe(0); expect(vi.getTimerCount()).toBe(0);
  });
});
