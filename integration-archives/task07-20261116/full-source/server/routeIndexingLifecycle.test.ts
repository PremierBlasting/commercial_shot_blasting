import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import ts from "typescript";
import { locationSlugIndex } from "../client/src/data/locationSlugIndex";
import { getLocationRobotsDirective } from "../shared/locationSeoTiers";
import {
  DEFAULT_PAGE_ROBOTS, getPageIndexingDirective, getPageIndexingPath,
  getPageRobotsDirective, NOINDEX_FOLLOW, NOINDEX_NOFOLLOW, PREVIEW_PAGE_ROBOTS,
} from "../shared/pageIndexingPolicy";
import { resolveRouteMetadata, type RouteMetadataInput } from "../shared/routeMetadata";
import { createMetadataController, type MetadataController } from "../client/src/components/RouteMetadataOwner";
// Importing the route contract must never give this test a live database lookup.
vi.mock("./db", () => ({ getPublishedBlogPostForHtml: vi.fn(() => { throw new Error("Live DB forbidden"); }) }));
import { getHtmlPath, renderHtmlRouteError, resolveHtmlRoute } from "./contentRouteExistence";

class HeadElement {
  attributes: Record<string, string> = {};
  parentNode: FakeHead | null = null;
  textContent = "";
  constructor(readonly tagName: string) {}
  setAttribute(name: string, value: string) { this.attributes[name] = String(value); }
  getAttribute(name: string) { return this.attributes[name] ?? null; }
  hasAttribute(name: string) { return this.getAttribute(name) !== null; }
  removeAttribute(name: string) { delete this.attributes[name]; }
  get rel() { return this.getAttribute("rel") ?? ""; }
  set rel(value: string) { this.setAttribute("rel", value); }
  get href() { return this.getAttribute("href") ?? ""; }
  set href(value: string) { this.setAttribute("href", value); }
  remove() { if (this.parentNode) this.parentNode.elements = this.parentNode.elements.filter(element => element !== this); this.parentNode = null; }
}
class FakeHead {
  elements: HeadElement[] = [];
  appendChild(element: HeadElement) { element.parentNode = this; this.elements.push(element); return element; }
  querySelectorAll(selector: string) {
    return this.elements.filter(element => selector.split(",").some(part => {
      const value = part.trim(); const tag = value.match(/^[a-z]+/i)?.[0];
      if (!tag || element.tagName !== tag.toUpperCase()) return false;
      return [...value.matchAll(/\[([\w:-]+)(?:=["']([^"']*)["'])?\]/g)].every(([, key, expected]) => expected === undefined ? element.hasAttribute(key) : element.getAttribute(key) === expected);
    }));
  }
}
class HeadDocument {
  head = new FakeHead(); body = { contains: () => false };
  get title() { return this.head.querySelectorAll("title")[0]?.textContent ?? ""; }
  set title(value: string) { const title = this.head.querySelectorAll("title")[0] ?? this.head.appendChild(this.createElement("title")); title.textContent = value; }
  createElement(tag: string) { return new HeadElement(tag.toUpperCase()); }
  getElementById(_id: string) { return null; }
  querySelectorAll(selector: string) { return selector.startsWith("#") ? [] : this.head.querySelectorAll(selector); }
  querySelector(selector: string) { return this.querySelectorAll(selector)[0] ?? null; }
}
class HistoryWindow extends EventTarget {
  location = { pathname: "/", search: "", hash: "", href: "https://commercialshotblasting.co.uk/" };
  move(originalUrl: string, event?: string) {
    const url = new URL(originalUrl, "https://commercialshotblasting.co.uk");
    this.location = { pathname: url.pathname, search: url.search, hash: url.hash, href: url.href };
    if (event) this.dispatchEvent(new Event(event));
  }
}
let doc: HeadDocument;
let browser: HistoryWindow;
let owner: MetadataController | undefined;
let network: ReturnType<typeof vi.fn>;
function currentUrl() { return browser.location.pathname + browser.location.search + browser.location.hash; }
function startOwner() {
  owner = createMetadataController({ url: currentUrl(), document: doc as unknown as Document, getUrl: currentUrl });
  for (const event of ["popstate", "pushState", "replaceState", "hashchange"]) browser.addEventListener(event, () => owner?.navigate(currentUrl()));
  owner.reconcile(); return owner;
}
function robotsTags() { return doc.querySelectorAll('meta[name="robots"]'); }
function expectRobots(directive: string) { expect(robotsTags()).toHaveLength(1); expect(robotsTags()[0].getAttribute("content")).toBe(directive); }
function addRobots(directive: string) { const tag = doc.createElement("meta"); tag.setAttribute("name", "robots"); tag.setAttribute("content", directive); doc.head.appendChild(tag); return tag; }
function publish(input: RouteMetadataInput) { if (!owner) throw new Error("Owner not mounted"); return owner.publish(owner.getSnapshot(), input); }
async function flushCommit() { await Promise.resolve(); }
beforeEach(() => {
  owner = undefined; doc = new HeadDocument(); browser = new HistoryWindow();
  network = vi.fn(() => { throw new Error("Network forbidden in route lifecycle tests"); });
  vi.stubGlobal("document", doc); vi.stubGlobal("window", browser); vi.stubGlobal("fetch", network);
});
afterEach(async () => { owner?.dispose(); await flushCommit(); expect(network).not.toHaveBeenCalled(); vi.unstubAllGlobals(); });

describe("shared exact destination indexing policy (not publication/access control)", () => {
  it.each([
    ["/service-areas/truro", "noindex, follow, max-image-preview:large, max-snippet:-1"],
    ["/service-areas/birmingham", PREVIEW_PAGE_ROBOTS], ["/service-areas/wigan", PREVIEW_PAGE_ROBOTS],
    ["/services/structural-steel-frames", PREVIEW_PAGE_ROBOTS],
    ["/", DEFAULT_PAGE_ROBOTS], ["/terms", DEFAULT_PAGE_ROBOTS],
    ["/privacy-policy", NOINDEX_FOLLOW], ["/terms-of-service", NOINDEX_FOLLOW],
    ["/case-studies/fire-escape-multi-storey-office", NOINDEX_FOLLOW],
    ["/admin", NOINDEX_NOFOLLOW], ["/call-analytics", NOINDEX_NOFOLLOW],
  ])("resolves %s on clean, trailing-slash and attributed URLs", (route, expected) => {
    const query = "?utm_source=task06&gclid=a%2Bb&gclid=&gbraid=x&wbraid=y#details";
    for (const input of [route, `${route}${query}`, `${route === "/" ? "" : route}/${query}`]) {
      expect(getPageRobotsDirective(input)).toBe(expected); expect(getPageIndexingDirective(input)).toBe(expected);
    }
  });
  it("keeps every maintained town's existing tier without classifying unknown towns", () => {
    for (const slug of Object.keys(locationSlugIndex)) expect(getPageRobotsDirective(`/service-areas/${slug}?ref=task06`)).toBe(getLocationRobotsDirective(slug));
    expect(getPageRobotsDirective("/service-areas/not-a-maintained-town")).toBeUndefined();
  });
  it.each(["/blog/unknown-post", "/services/unknown-service", "/counties/unknown", "/admin/extra", "/privacy-policy/extra", "/404", "/index.html", "//admin", "/%2fadmin", "/%2e%2e/admin", "/admin%5c", "/%GG"])("makes no pathname-only publication claim for %s", input => { expect(getPageRobotsDirective(input)).toBeUndefined(); });
  it("parses scoped matches consistently with the existing server pathname parser", () => {
    const original = "/privacy%2Dpolicy?utm_source=x&gclid=%2B&gclid=#notice";
    expect(getPageIndexingPath(original)).toBe(getHtmlPath(original)); expect(getPageRobotsDirective(original)).toBe(NOINDEX_FOLLOW);
    expect(original).toBe("/privacy%2Dpolicy?utm_source=x&gclid=%2B&gclid=#notice");
  });
});

describe("persistent metadata owner one-tag entry, update, destination-aware exit and history", () => {
  it("deduplicates inherited tags and preserves approved destination non-robots fields exactly", () => {
    browser.move("/service-areas/truro?utm_source=a&gclid=%2B&gclid="); addRobots("index, follow"); addRobots("noindex, follow");
    const schema = doc.createElement("script"); schema.setAttribute("type", "application/ld+json"); schema.setAttribute("data-fixture", '{"existing":"schema"}'); doc.head.appendChild(schema);
    startOwner(); const truro = resolveRouteMetadata("/service-areas/truro");
    expectRobots(getLocationRobotsDirective("truro")); expect(doc.title).toBe(truro.title);
    expect(doc.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(truro.description);
    expect(doc.querySelector('meta[name="keywords"]')?.getAttribute("content")).toBe(truro.keywords);
    expect(doc.querySelector('link[rel="canonical"]')?.href).toBe(truro.canonical);
    expect(doc.querySelector('meta[property="og:title"]')?.getAttribute("content")).toBe(truro.ogTitle);
    expect(doc.querySelector('meta[property="og:description"]')?.getAttribute("content")).toBe(truro.ogDescription);
    expect(doc.querySelector('meta[property="og:url"]')?.getAttribute("content")).toBe(truro.canonical);
    expect(doc.querySelector('meta[name="twitter:image"]')?.getAttribute("content")).toBe(truro.twitterImage);
    expect(schema.getAttribute("data-fixture")).toBe('{"existing":"schema"}'); expect(schema.parentNode).toBe(doc.head);
    expect(browser.location.search).toBe("?utm_source=a&gclid=%2B&gclid=");
  });
  it("handles same-component Truro/Birmingham changes, service exit, Home and both history directions", async () => {
    browser.move("/service-areas/truro"); const controller = startOwner(); const truroKey = controller.getSnapshot(); expectRobots(getLocationRobotsDirective("truro"));
    browser.move("/service-areas/birmingham?gclid=x", "pushState"); expectRobots(getLocationRobotsDirective("birmingham"));
    expect(controller.publish(truroKey, { state: "ready", title: "Old Truro effect", robots: NOINDEX_FOLLOW })).toBe(false);
    await flushCommit(); const birmingham = resolveRouteMetadata("/service-areas/birmingham");
    expect(doc.title).toBe(birmingham.title); expect(doc.querySelector('link[rel="canonical"]')?.href).toBe(birmingham.canonical); expectRobots(getLocationRobotsDirective("birmingham"));
    browser.move("/service-areas/truro?gclid=back", "popstate"); expectRobots(getLocationRobotsDirective("truro"));
    browser.move("/services/structural-steel-frames?utm_source=service", "pushState"); await flushCommit(); expectRobots(PREVIEW_PAGE_ROBOTS);
    browser.move("/?utm_source=home&gclid=", "pushState"); await flushCommit(); expectRobots(DEFAULT_PAGE_ROBOTS);
    browser.move("/service-areas/truro?gclid=back", "popstate"); expectRobots(getLocationRobotsDirective("truro"));
    browser.move("/service-areas/birmingham?gclid=forward", "popstate"); expectRobots(getLocationRobotsDirective("birmingham")); expect(browser.location.search).toBe("?gclid=forward");
  });
  it.each(["/privacy-policy", "/terms-of-service", "/case-studies/fire-escape-multi-storey-office", "/admin", "/call-analytics"])("deduplicates scoped %s entry and correctly exits to held town and Home", async route => {
    browser.move(`${route}?utm_source=task06&gclid=a%2Bb`); addRobots("index, follow"); addRobots("noindex, follow"); startOwner(); expectRobots(getPageRobotsDirective(route)!);
    browser.move("/service-areas/truro?gclid=kept", "pushState"); await flushCommit(); expectRobots(getLocationRobotsDirective("truro"));
    browser.move("/", "replaceState"); expectRobots(DEFAULT_PAGE_ROBOTS);
  });
  it("reconciles the next restricted destination when old cleanup/completion runs after new setup", async () => {
    browser.move("/services/structural-steel-frames"); const controller = startOwner(); const oldKey = controller.getSnapshot();
    browser.move("/service-areas/truro", "pushState"); expect(controller.publish(oldKey, { robots: "index, follow" })).toBe(false); await flushCommit(); expectRobots(getLocationRobotsDirective("truro"));
    browser.move("/privacy-policy", "pushState"); expectRobots(NOINDEX_FOLLOW); expect(controller.publish(oldKey, { robots: PREVIEW_PAGE_ROBOTS })).toBe(false); await flushCommit(); expectRobots(NOINDEX_FOLLOW);
  });
  it("never allows an explicit index directive to promote a held/internal destination", () => {
    browser.move("/service-areas/truro"); startOwner(); publish({ state: "ready", robots: "index, follow" }); expectRobots(getLocationRobotsDirective("truro"));
    browser.move("/admin", "replaceState"); publish({ state: "ready", title: "Admin Dashboard", description: "Existing description", robots: "index, follow" }); expectRobots(NOINDEX_NOFOLLOW);
  });
  it("guards a parent passive input when a child auth Redirect already reached Home", async () => {
    browser.move("/call-analytics?ref=task06"); const controller = startOwner(); const shellKey = controller.getSnapshot();
    browser.move("/?ref=task06", "replaceState");
    expect(controller.publish(shellKey, { title: "Call Tracking Analytics", description: "Existing description", robots: NOINDEX_NOFOLLOW })).toBe(false);
    expectRobots(DEFAULT_PAGE_ROBOTS); expect(doc.title).toBe("Commercial Shot Blasting Services | Nationwide"); await flushCommit();
    expectRobots(DEFAULT_PAGE_ROBOTS); expect(browser.location.search).toBe("?ref=task06");
  });
  it("does not apply stale held-town or deletion directives to an unknown/unavailable dynamic destination", async () => {
    browser.move("/service-areas/truro"); const controller = startOwner(); const heldKey = controller.getSnapshot();
    browser.move("/blog/unknown-or-unavailable?gclid=x", "pushState"); expect(controller.publish(heldKey, { robots: getLocationRobotsDirective("truro") })).toBe(false); await flushCommit();
    // Task07 now explicitly owns pending state; this is not a published/deleted verdict.
    expect(controller.getSnapshot().metadata.state).toBe("pending"); expectRobots(NOINDEX_FOLLOW);
    publish({ state: "unavailable" }); expect(robotsTags()).toHaveLength(0); expect(doc.title).toBe("Page Temporarily Unavailable | Commercial Shot Blasting");
    expect(getPageRobotsDirective("/blog/unknown-or-unavailable")).toBeUndefined();
  });
  it("deduplicates title-driven ready updates and keeps publication directives only on their route", async () => {
    browser.move("/blog/runtime-resolved-post"); const controller = startOwner(); publish({ state: "ready", title: "Runtime content", description: "Existing description", robots: PREVIEW_PAGE_ROBOTS }); expectRobots(PREVIEW_PAGE_ROBOTS);
    addRobots("index, follow"); publish({ state: "ready", title: "Updated runtime title", description: "Existing description", robots: PREVIEW_PAGE_ROBOTS }); await flushCommit();
    expectRobots(PREVIEW_PAGE_ROBOTS); expect(doc.title).toBe("Updated runtime title"); const key = controller.getSnapshot();
    browser.move("/blog/another-unknown", "popstate"); expect(controller.getSnapshot().metadata.state).toBe("pending"); expectRobots(NOINDEX_FOLLOW);
    expect(controller.publish(key, { state: "ready", title: "Updated runtime title", robots: PREVIEW_PAGE_ROBOTS })).toBe(false);
  });
  it("handles query-only and hash history updates without rewriting attribution", () => {
    browser.move("/privacy-policy?gclid=one"); const controller = startOwner(); const key = controller.getSnapshot();
    browser.move("/privacy-policy?utm_source=x&gclid=&gclid=%2B&gbraid=g&wbraid=w#notice", "replaceState"); expectRobots(NOINDEX_FOLLOW);
    browser.dispatchEvent(new Event("hashchange")); expectRobots(NOINDEX_FOLLOW); expect(controller.getSnapshot().generation).toBe(key.generation);
    expect(browser.location.href).toBe("https://commercialshotblasting.co.uk/privacy-policy?utm_source=x&gclid=&gclid=%2B&gbraid=g&wbraid=w#notice");
  });
});

describe("existing unknown/error and unconditional internal-shell contracts", () => {
  it("keeps real unknown blog 404 distinct from temporary unavailable 503, entirely offline", async () => {
    const missingLookup = vi.fn(async () => ({ state: "missing" as const })); const outageLookup = vi.fn(async () => ({ state: "unavailable" as const }));
    expect(await resolveHtmlRoute("/blog/not-published?gclid=x", { lookupPost: missingLookup })).toEqual({ state: "missing", media: false });
    expect(await resolveHtmlRoute("/blog/unavailable?gclid=x", { lookupPost: outageLookup })).toEqual({ state: "unavailable" });
    expect(renderHtmlRouteError(404)).toMatch(/<meta name="robots" content="noindex, follow"\s*\/?\s*>/);
    expect(renderHtmlRouteError(404)).not.toContain('rel="canonical"');
    expect(renderHtmlRouteError(503)).not.toContain('name="robots"'); expect(renderHtmlRouteError(503)).not.toContain("noindex");
    expect(getPageRobotsDirective("/blog/unavailable")).toBeUndefined();
  });
  it.each(["Admin", "CallAnalytics"])("calls useSEO unconditionally before any %s authentication return", page => {
    const text = readFileSync(new URL(`../client/src/pages/${page}.tsx`, import.meta.url), "utf8");
    const source = ts.createSourceFile(`${page}.tsx`, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const component = source.statements.find(statement => ts.isFunctionDeclaration(statement) && statement.name?.text === page) as ts.FunctionDeclaration;
    const statements = component.body!.statements;
    const seoIndex = statements.findIndex(statement => ts.isExpressionStatement(statement) && ts.isCallExpression(statement.expression) && statement.expression.expression.getText(source) === "useSEO");
    const firstBranch = statements.findIndex(statement => ts.isIfStatement(statement) || ts.isReturnStatement(statement));
    expect(seoIndex).toBeGreaterThanOrEqual(0); expect(seoIndex).toBeLessThan(firstBranch); expect(statements[seoIndex].getText(source)).toContain('robots: "noindex, nofollow"');
    expect(text).toContain("useAuth()"); if (page === "CallAnalytics") expect(text).toContain('return <Redirect to="/" />;'); else expect(text).toContain('if (user.role !== "admin")');
  });
  it("legal/provisional pages explicitly retain intended robots with one provisional owner", () => {
    for (const page of ["PrivacyPolicy", "AdsAppTermsOfService", "FireEscapeProvisionalCaseStudy"]) {
      const text = readFileSync(new URL(`../client/src/pages/${page}.tsx`, import.meta.url), "utf8"); expect(text).toContain('robots: "noindex, follow"'); expect(text).not.toContain("previousContent");
    }
  });
});
