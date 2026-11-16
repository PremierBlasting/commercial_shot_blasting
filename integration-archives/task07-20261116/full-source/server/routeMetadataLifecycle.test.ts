import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import {
  createMetadataController, reconcileRouteMetadataHead, readRouteMetadataBoot, removeClippedServerBodyRoots,
  type MetadataController, type MetadataRouteKey,
} from "../client/src/components/RouteMetadataOwner";
import { resolveRouteMetadata, serializeRouteMetadataBoot, getRouteMetadataTags, getRouteMetadataCanonical, type RouteMetadataRecord } from "../shared/routeMetadata";
import { DEFAULT_PAGE_ROBOTS, PREVIEW_PAGE_ROBOTS, NOINDEX_FOLLOW } from "../shared/pageIndexingPolicy";
import { probeAmbiguousArticleMetadata, isAmbiguousArticleQuery } from "../client/src/pages/BlogPost";

// Deliberately small DOM implementing only selectors used by the production owner.
class Element {
  attributes: Record<string, string> = {};
  children: Element[] = [];
  parentNode: Element | null = null;
  textContent = "";
  style = { position: "", width: "", height: "", overflow: "", clip: "", clipPath: "" };
  constructor(readonly tagName: string) {}
  get parentElement() { return this.parentNode; }
  get id() { return this.getAttribute("id") ?? ""; }
  set id(value: string) { this.setAttribute("id", value); }
  get rel() { return this.getAttribute("rel") ?? ""; }
  set rel(value: string) { this.setAttribute("rel", value); }
  get href() { return this.getAttribute("href") ?? ""; }
  set href(value: string) { this.setAttribute("href", value); }
  setAttribute(name: string, value: string) { this.attributes[name] = String(value); }
  getAttribute(name: string) { return this.attributes[name] ?? null; }
  hasAttribute(name: string) { return this.getAttribute(name) !== null; }
  removeAttribute(name: string) { delete this.attributes[name]; }
  appendChild(element: Element) { element.remove(); element.parentNode = this; this.children.push(element); return element; }
  remove() { if (this.parentNode) this.parentNode.children = this.parentNode.children.filter(child => child !== this); this.parentNode = null; }
  contains(element: Element | null): boolean { return !!element && (element === this || this.children.some(child => child.contains(element))); }
  querySelectorAll(selector: string): Element[] {
    const descendants = this.children.flatMap(child => [child, ...child.querySelectorAll("*")]);
    return descendants.filter(element => selector.split(",").some(part => {
      const value = part.trim();
      if (value === "*") return true;
      if (value.startsWith("#")) return element.id === value.slice(1);
      const tag = value.match(/^[a-z]+/i)?.[0];
      if (!tag || element.tagName !== tag.toUpperCase()) return false;
      const attrs = [...value.matchAll(/\[([\w:-]+)(?:=["']([^"']*)["'])?\]/g)];
      return attrs.every(([, name, expected]) => expected === undefined ? element.getAttribute(name) !== null : element.getAttribute(name) === expected);
    }));
  }
  querySelector(selector: string) { return this.querySelectorAll(selector)[0] ?? null; }
}
class Document {
  head = new Element("HEAD"); body = new Element("BODY");
  get title() { return this.head.querySelector("title")?.textContent ?? ""; }
  set title(value: string) { const title = this.head.querySelector("title") ?? this.head.appendChild(new Element("TITLE")); title.textContent = value; }
  createElement(tag: string) { return new Element(tag.toUpperCase()); }
  getElementById(id: string) { return this.querySelectorAll("*").find(element => element.id === id) ?? null; }
  querySelectorAll(selector: string) { return [...this.head.querySelectorAll(selector), ...this.body.querySelectorAll(selector)]; }
  querySelector(selector: string) { return this.querySelectorAll(selector)[0] ?? null; }
}
class Browser extends EventTarget {
  location = new URL("https://commercialshotblasting.co.uk/");
  history = { pushState: (_data: unknown, _unused: string, url: string) => this.move(url, "pushState"), replaceState: (_data: unknown, _unused: string, url: string) => this.move(url, "replaceState") };
  move(url: string, event?: string) { this.location = new URL(url, this.location.origin); if (event) this.dispatchEvent(new Event(event)); }
}
let doc: Document;
let browser: Browser;
let network: ReturnType<typeof vi.fn>;
let controller: MetadataController | undefined;
const controllers: MetadataController[] = [];
function start(url: string, boot?: RouteMetadataRecord | null) {
  browser.move(url);
  controller = createMetadataController({ url: browser.location.pathname + browser.location.search + browser.location.hash, document: doc as unknown as globalThis.Document, getUrl: () => browser.location.pathname + browser.location.search + browser.location.hash, boot });
  controllers.push(controller);
  for (const event of ["pushState", "replaceState", "popstate", "hashchange"]) browser.addEventListener(event, () => controller?.navigate(browser.location.pathname + browser.location.search + browser.location.hash));
  controller.reconcile(); return controller;
}
function add(tag: string, attributes: Record<string, string>, parent = doc.head) { const node = doc.createElement(tag); Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value)); parent.appendChild(node); return node; }
function clipped(id = "ssr-content", parent = doc.body) { const node = add("div", { id }, parent); Object.assign(node.style, { position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }); return node; }
function tagContent(key: string) { return doc.head.querySelectorAll("meta[name], meta[property]").filter(node => node.getAttribute("name") === key || node.getAttribute("property") === key); }
function expectHead(record: RouteMetadataRecord) {
  expect(doc.head.querySelectorAll("title")).toHaveLength(1); expect(doc.title).toBe(record.title);
  const canonicals = doc.head.querySelectorAll("link[rel]").filter(link => link.rel.toLowerCase().split(/\s+/).includes("canonical"));
  const canonical = getRouteMetadataCanonical(record);
  expect(canonicals).toHaveLength(canonical ? 1 : 0);
  if (canonical) expect(canonicals[0].href).toBe(canonical);
  for (const tag of getRouteMetadataTags(record)) if (tag.key !== "article:tag") { expect(tagContent(tag.key)).toHaveLength(1); expect(tagContent(tag.key)[0].getAttribute("content")).toBe(tag.value); }
  if (!record.robots) expect(tagContent("robots")).toHaveLength(0);
}
beforeEach(() => { controllers.length = 0; controller = undefined; doc = new Document(); browser = new Browser(); network = vi.fn(() => { throw new Error("Live network forbidden"); }); vi.stubGlobal("document", doc); vi.stubGlobal("window", browser); vi.stubGlobal("fetch", network); vi.useFakeTimers(); });
afterEach(() => { controllers.forEach(item => item.dispose()); expect(network).not.toHaveBeenCalled(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe("one persistent complete metadata owner across destinations", () => {
  it("deduplicates canonical/robots and equivalent Twitter spellings without touching schema or preload", () => {
    add("title", {}); add("title", {});
    add("link", { rel: "canonical", href: "https://wrong.invalid" }); add("link", { rel: "CANONICAL", href: "https://old.invalid" });
    add("meta", { name: "robots", content: "index, follow" }); add("meta", { property: "robots", content: "noindex" });
    add("meta", { name: "twitter:title", content: "old" }); add("meta", { property: "twitter:title", content: "old property" });
    add("meta", { name: "googlebot", content: "noindex" });
    const schema = add("script", { type: "application/ld+json" }); schema.textContent = '{"@type":"Organization","existing":true}';
    const preload = add("link", { rel: "preload", href: "/existing-hero.webp", as: "image" });
    start("/about?utm_source=x&gclid=&gclid=%2B"); expectHead(resolveRouteMetadata("/about"));
    expect(schema.parentNode).toBe(doc.head); expect(schema.textContent).toBe('{"@type":"Organization","existing":true}'); expect(preload.parentNode).toBe(doc.head);
    expect(doc.head.querySelectorAll('meta[property="twitter:title"]')).toHaveLength(0);
    expect(tagContent("googlebot")).toHaveLength(0);
    expect(browser.location.search).toBe("?utm_source=x&gclid=&gclid=%2B");
  });
  it("replaces About -> Industries -> Areas immediately during lazy fallback and both history directions", () => {
    const owner = start("/about");
    const transitions = [["/industries?gclid=x", "pushState"], ["/service-areas?utm_source=x", "pushState"], ["/industries?gclid=back", "popstate"], ["/about?gclid=back", "popstate"], ["/service-areas?gclid=forward", "popstate"]];
    for (const [url, event] of transitions) { browser.move(url, event); expectHead(resolveRouteMetadata(url)); }
    expect(owner.getSnapshot().generation).toBe(5); expect(browser.location.search).toBe("?gclid=forward");
  });
  it("preserves Truro/Birmingham tiers through service/catalogue/Home and history without waiting for page hooks", () => {
    start("/service-areas/truro"); expect(tagContent("robots")[0].getAttribute("content")).toBe("noindex, follow, max-image-preview:large, max-snippet:-1");
    for (const [url, event] of [["/service-areas/birmingham?gclid=x", "pushState"], ["/services/structural-steel-frames", "pushState"], ["/services", "pushState"], ["/", "pushState"], ["/service-areas/truro?gclid=back", "popstate"], ["/service-areas/birmingham?gclid=forward", "popstate"]]) { browser.move(url, event); expectHead(resolveRouteMetadata(url)); }
    expect(tagContent("robots")[0].getAttribute("content")).toBe(PREVIEW_PAGE_ROBOTS);
  });
  it("rejects delayed dynamic data from old destination and old generation after returning to the same pathname", () => {
    const owner = start("/blog/first-post"); const oldKey = owner.getSnapshot();
    setTimeout(() => owner.publish(oldKey, { state: "ready", title: "Stale post", description: "Stale description" }), 1000);
    browser.move("/blog/second-post", "pushState"); const secondKey = owner.getSnapshot();
    expect(owner.publish(secondKey, { state: "ready", title: "Current post", description: "Current description" })).toBe(true);
    vi.advanceTimersByTime(1000); expect(doc.title).toBe("Current post");
    browser.move("/blog/first-post", "popstate"); expect(owner.publish(oldKey, { state: "ready", title: "Stale post" })).toBe(false);
    expect(owner.getSnapshot().metadata.state).toBe("pending"); expect(tagContent("robots")[0].getAttribute("content")).toBe(NOINDEX_FOLLOW);
  });
  it("guards current URL before a delayed auth-shell or service effect can publish outgoing metadata", () => {
    const owner = start("/call-analytics?ref=task07"); const oldKey = owner.getSnapshot();
    browser.move("/?ref=task07");
    expect(owner.publish(oldKey, { state: "ready", title: "Call Tracking Analytics", robots: "noindex, nofollow" })).toBe(false);
    expectHead(resolveRouteMetadata("/")); expect(tagContent("robots")[0].getAttribute("content")).toBe(DEFAULT_PAGE_ROBOTS);
    expect(browser.location.search).toBe("?ref=task07");
  });
  it("preserves authoritative ready boot data against a lazy pending input and query/hash-only changes", () => {
    const ready = resolveRouteMetadata("/blog/cladding-post", { state: "ready", title: "Published cladding title", description: "Actual published description", image: null });
    const script = add("script", { id: "route-metadata-boot", type: "application/json" }); script.textContent = serializeRouteMetadataBoot(ready).replace(/^.*?>/, "").replace(/<\/script>$/, "");
    expect(readRouteMetadataBoot("/blog/cladding-post", doc as unknown as globalThis.Document)).toEqual(ready);
    expect(readRouteMetadataBoot("/blog/other-post", doc as unknown as globalThis.Document)).toBeNull();
    const owner = start("/blog/cladding-post?gclid=x"); const key = owner.getSnapshot(); expectHead(ready);
    expect(owner.publish(key, { state: "pending" })).toBe(false); expectHead(ready);
    browser.move("/blog/cladding-post?gclid=&gclid=%2B#detail", "replaceState"); browser.dispatchEvent(new Event("hashchange"));
    expect(owner.getSnapshot().generation).toBe(key.generation); expectHead(ready);
  });
  it("does not downgrade Task04's published hard-load boot to lazy pending metadata", () => {
    const published = resolveRouteMetadata("/blog/published-cladding", { state: "published", title: "Existing published cladding", description: "Existing public excerpt", image: null });
    const owner = start("/blog/published-cladding?gclid=kept", published);
    expect(owner.getSnapshot().metadata.state).toBe("published"); expectHead(published);
    expect(owner.publish(owner.getSnapshot(), { state: "pending" })).toBe(false);
    expect(owner.getSnapshot().metadata).toEqual(published); expectHead(published);
  });
  it("clears absent article, image, alternate and keyword fields on destination change but retains page/global JSON-LD", () => {
    const ready = resolveRouteMetadata("/blog/cladding-post", { state: "ready", title: "Published", description: "Existing", image: "https://example.invalid/article.jpg", publishedAt: "2025-01-01", modifiedAt: "2025-01-02", articleAuthor: "Public author", articleSection: "Cladding", articleTags: ["existing-tag"] });
    start("/blog/cladding-post", ready);
    const schema = add("script", { type: "application/ld+json" }); schema.textContent = '{"@type":"Article"}';
    expect(tagContent("article:published_time")).toHaveLength(1); expect(tagContent("article:tag").map(node => node.getAttribute("content"))).toEqual(["existing-tag"]);
    expect(doc.head.querySelectorAll("link[rel='alternate'][hreflang]").map(node => node.getAttribute("hreflang"))).toEqual(["en-gb", "en"]);
    browser.move("/blog/unknown-next", "pushState"); expectHead(resolveRouteMetadata("/blog/unknown-next"));
    for (const key of ["article:published_time", "article:modified_time", "article:author", "article:section", "article:tag", "og:image", "og:image:width", "og:image:height", "og:image:type", "og:image:alt", "twitter:image", "twitter:image:alt", "keywords"]) expect(tagContent(key)).toHaveLength(0);
    expect(doc.head.querySelectorAll("link[rel='alternate'][hreflang]")).toHaveLength(0); expect(schema.parentNode).toBe(doc.head);
  });
  it("keeps render-error fallback distinct from missing and resumes destination metadata after navigation", () => {
    const owner = start("/services/structural-steel-frames"); const key = owner.getSnapshot();
    expect(owner.publish(key, { state: "render-error" })).toBe(true); expect(owner.getSnapshot().metadata.state).toBe("render-error");
    expect(doc.title).toBe("An unexpected error occurred."); expect(tagContent("robots")).toHaveLength(0);
    expect(doc.title).not.toContain("Page Not Found");
    browser.move("/service-areas/truro", "popstate"); expectHead(resolveRouteMetadata("/service-areas/truro"));
    expect(owner.publish(key, { state: "render-error" })).toBe(false);
  });
  it("supports subscribers and prevents disposed stale writers without undoing current head or body", () => {
    const copy = clipped(); const owner = start("/about"); const listener = vi.fn(); const unsubscribe = owner.subscribe(listener);
    owner.reconcile(); expect(copy.parentNode).toBe(doc.body);
    browser.move("/industries", "pushState"); expect(listener).toHaveBeenCalledTimes(1); unsubscribe();
    browser.move("/service-areas", "pushState"); expect(listener).toHaveBeenCalledTimes(1); const snapshot = owner.getSnapshot();
    const retained = clipped(); owner.dispose(); owner.navigate("/about"); expect(owner.publish(snapshot, { state: "missing" })).toBe(false);
    expectHead(snapshot.metadata); expect(retained.parentNode).toBe(doc.body);
  });
});

describe("verified injected body-root cleanup only on actual pathname changes", () => {
  it("keeps hard-load copies on boot, replay, query/hash changes and dynamic resolution, removing on navigation/history", () => {
    const copy = clipped(); const owner = start("/about?gclid=boot"); const key = owner.getSnapshot();
    owner.reconcile(); owner.navigate("/about?gclid=boot"); expect(copy.parentNode).toBe(doc.body);
    browser.move("/about?utm_source=x&gclid=&gclid=%2B#details", "replaceState"); browser.dispatchEvent(new Event("hashchange")); expect(copy.parentNode).toBe(doc.body);
    owner.publish(key, { state: "ready", title: "Ignored static input" }); expect(copy.parentNode).toBe(doc.body);
    browser.move("/industries", "pushState"); expect(copy.parentNode).toBeNull();
    const next = clipped("ssr-service-content"); browser.move("/about", "popstate"); expect(next.parentNode).toBeNull();
  });
  it("does not remove React content, script-bearing roots, non-clipped content, similar IDs, schema or body itself", () => {
    const react = add("div", { id: "root" }, doc.body); const reactCopy = clipped("ssr-content", react);
    const scriptCopy = clipped("ssr-service-content"); const script = add("script", { type: "application/ld+json" }, scriptCopy); script.textContent = '{"existing":true}';
    const ordinary = add("div", { id: "ssr-county-content" }, doc.body); const similar = clipped("ssr-home-faq");
    const removable = clipped("ssr-content");
    removeClippedServerBodyRoots(doc as unknown as globalThis.Document);
    expect(removable.parentNode).toBeNull(); expect(reactCopy.parentNode).toBe(react); expect(scriptCopy.parentNode).toBe(doc.body);
    expect(ordinary.parentNode).toBe(doc.body); expect(similar.parentNode).toBe(doc.body); expect(script.parentNode).toBe(scriptCopy);
    expect(react.parentNode).toBe(doc.body);
  });
  it("removes verified roots inside the injector's clipped wrapper without removing that wrapper or siblings", () => {
    const wrapper = clipped("verified-wrapper"); const copy = add("div", { id: "ssr-county-content" }, wrapper); const sibling = add("p", { id: "keep" }, wrapper);
    removeClippedServerBodyRoots(doc as unknown as globalThis.Document);
    expect(copy.parentNode).toBeNull(); expect(wrapper.parentNode).toBe(doc.body); expect(sibling.parentNode).toBe(wrapper);
  });
  it("has one owner outside ErrorBoundary/lazy subtree and retains StrictMode-safe listener-only cleanup", () => {
    const app = readFileSync(new URL("../client/src/App.tsx", import.meta.url), "utf8");
    expect(app.indexOf("<RouteMetadataOwner>")).toBeLessThan(app.indexOf("<ErrorBoundary>"));
    expect(app).toContain("<Suspense fallback={<PageLoader />}>" ); expect(app).toContain("<RouteMeasurementReady />");
    const boundary = readFileSync(new URL("../client/src/components/ErrorBoundary.tsx", import.meta.url), "utf8");
    expect(boundary).toContain("render-error"); expect(boundary).toContain("recoverFromStaleDynamicImport(error)");
    const owner = readFileSync(new URL("../client/src/components/RouteMetadataOwner.tsx", import.meta.url), "utf8");
    expect(owner).toContain("window.removeEventListener(event, navigate)");
    expect(owner).not.toMatch(/return\s*\(\)\s*=>\s*\{[^}]*controller\.dispose\(/);
  });
});

describe("approved ambiguous article HEAD status check", () => {
  it.each([[404, "missing"], [503, "unavailable"], [200, "unavailable"], [410, "unavailable"]] as const)("uses status %s only as %s, without publishing article data", async (status, state) => {
    const owner = start("/blog/ambiguous-post?gclid=&gclid=%2B&utm_source=kept#details");
    const copy = clipped(); const saved = browser.location.href;
    const request = vi.fn().mockResolvedValue({ status });
    const cancel = probeAmbiguousArticleMetadata(owner, owner.getSnapshot(), saved, request as unknown as typeof fetch);
    await vi.advanceTimersByTimeAsync(0);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request.mock.calls[0][0]).toBe(saved);
    expect(request.mock.calls[0][1]).toMatchObject({ method: "HEAD", credentials: "omit", cache: "no-store", redirect: "error" });
    expect(owner.getSnapshot().metadata.state).toBe(state);
    expectHead(resolveRouteMetadata(browser.location.pathname, { state }));
    expect(browser.location.href).toBe(saved); expect(copy.parentNode).toBe(doc.body);
    expect(owner.getSnapshot().metadata.publishedAt).toBeNull();
    expect(vi.getTimerCount()).toBe(0); cancel();
  });
  it("keeps rejected status reads unavailable without false-deletion noindex", async () => {
    const owner = start("/blog/ambiguous-post"); const request = vi.fn().mockRejectedValue(new Error("mock transport failure"));
    const cancel = probeAmbiguousArticleMetadata(owner, owner.getSnapshot(), browser.location.href, request as unknown as typeof fetch);
    await vi.advanceTimersByTimeAsync(0);
    expect(owner.getSnapshot().metadata.state).toBe("unavailable"); expect(tagContent("robots")).toHaveLength(0);
    expect(vi.getTimerCount()).toBe(0); cancel();
  });
  it("cancels the first StrictMode replay before it can start a second request", async () => {
    const owner = start("/blog/ambiguous-post"); const request = vi.fn().mockResolvedValue({ status: 404 });
    const first = probeAmbiguousArticleMetadata(owner, owner.getSnapshot(), browser.location.href, request as unknown as typeof fetch); first();
    const second = probeAmbiguousArticleMetadata(owner, owner.getSnapshot(), browser.location.href, request as unknown as typeof fetch);
    await vi.advanceTimersByTimeAsync(0);
    expect(request).toHaveBeenCalledTimes(1); expect(owner.getSnapshot().metadata.state).toBe("missing"); second();
  });
  it("aborts cleanup and rejects a late response after cancellation", async () => {
    const owner = start("/blog/ambiguous-post"); let settle!: (value: { status: number }) => void;
    const request = vi.fn((_url: string, _init: RequestInit) => new Promise<{ status: number }>(resolve => { settle = resolve; }));
    const cancel = probeAmbiguousArticleMetadata(owner, owner.getSnapshot(), browser.location.href, request as unknown as typeof fetch);
    await vi.advanceTimersByTimeAsync(0); const signal = request.mock.calls[0]?.[1] as unknown as RequestInit;
    cancel(); settle({ status: 404 }); await vi.advanceTimersByTimeAsync(0);
    expect(signal.signal?.aborted).toBe(true); expect(owner.getSnapshot().metadata.state).toBe("pending"); expect(vi.getTimerCount()).toBe(0);
  });
  it("times out a hung request once, aborting it and retaining unavailable semantics", async () => {
    const owner = start("/blog/ambiguous-post"); const request = vi.fn((_url: string, _init: RequestInit) => new Promise(() => {}));
    const cancel = probeAmbiguousArticleMetadata(owner, owner.getSnapshot(), browser.location.href, request as unknown as typeof fetch);
    await vi.advanceTimersByTimeAsync(5000);
    expect(request).toHaveBeenCalledTimes(1); expect(request.mock.calls[0][1].signal?.aborted).toBe(true);
    expect(owner.getSnapshot().metadata.state).toBe("unavailable"); expect(tagContent("robots")).toHaveLength(0); expect(vi.getTimerCount()).toBe(0); cancel();
  });
  it("cannot overwrite a newer generation after leaving and returning to the same pathname", async () => {
    const owner = start("/blog/ambiguous-post"); const old = owner.getSnapshot(); let settle!: (value: { status: number }) => void;
    const request = vi.fn((_url: string, _init: RequestInit) => new Promise(resolve => { settle = resolve; }));
    const cancel = probeAmbiguousArticleMetadata(owner, old, browser.location.href, request as unknown as typeof fetch);
    await vi.advanceTimersByTimeAsync(0); browser.move("/about", "pushState"); browser.move("/blog/ambiguous-post", "popstate");
    const current = owner.getSnapshot(); owner.publish(current, { state: "published", title: "Current published title", description: "Current excerpt" });
    settle({ status: 404 }); await vi.advanceTimersByTimeAsync(0);
    expect(owner.getSnapshot().metadata.state).toBe("published"); expect(doc.title).toBe("Current published title"); cancel();
  });
  it("does not start requests for foreign URLs, non-article routes or already-stale generations", async () => {
    const owner = start("/blog/ambiguous-post"); const key = owner.getSnapshot(); const request = vi.fn();
    probeAmbiguousArticleMetadata(owner, key, "https://foreign.invalid/blog/ambiguous-post", request as unknown as typeof fetch)();
    probeAmbiguousArticleMetadata(owner, key, "/about", request as unknown as typeof fetch)();
    probeAmbiguousArticleMetadata(owner, { ...key, generation: key.generation - 1 }, browser.location.href, request as unknown as typeof fetch)();
    await vi.advanceTimersByTimeAsync(0); expect(request).not.toHaveBeenCalled(); expect(vi.getTimerCount()).toBe(0);
  });
  it("starts only for successful empty data, not loading, query failure or existing posts", () => {
    const source = readFileSync(new URL("../client/src/pages/BlogPost.tsx", import.meta.url), "utf8");
    expect(source).toContain("isLoading || !ambiguousEmpty");
    const key = [["blog", "getBySlug"], { input: { slug: "ambiguous-post" }, type: "query" }];
    const guard = new Error(JSON.stringify(key) + " data is undefined");
    expect(isAmbiguousArticleQuery(true, undefined, null, "ambiguous-post")).toBe(true);
    expect(isAmbiguousArticleQuery(false, undefined, guard, "ambiguous-post")).toBe(true);
    expect(isAmbiguousArticleQuery(false, undefined, guard, "other-post")).toBe(false);
    expect(isAmbiguousArticleQuery(false, undefined, new Error("Network failed"), "ambiguous-post")).toBe(false);
    expect(isAmbiguousArticleQuery(false, undefined, new Error("data is undefined"), "ambiguous-post")).toBe(false);
    const apiError = new Error(guard.message); apiError.name = "TRPCClientError";
    expect(isAmbiguousArticleQuery(false, undefined, apiError, "ambiguous-post")).toBe(false);
    expect(isAmbiguousArticleQuery(true, { slug: "ambiguous-post" }, null, "ambiguous-post")).toBe(false);
    expect(source).toContain("generation: metadataGeneration");
    expect(source).toContain('method: "HEAD"'); expect(source).toContain('redirect: "error"');
    expect(source).not.toMatch(/window\.history\.(?:replaceState|pushState)/);
  });
});
