import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import ts from "typescript";
import { locationSlugIndex } from "../client/src/data/locationSlugIndex";
import { getLocationRobotsDirective } from "../shared/locationSeoTiers";
import {
  DEFAULT_PAGE_ROBOTS, getPageIndexingDirective, getPageIndexingPath,
  getPageRobotsDirective, NOINDEX_FOLLOW, NOINDEX_NOFOLLOW, PREVIEW_PAGE_ROBOTS,
} from "../shared/pageIndexingPolicy";

const effects = vi.hoisted(() => ({ pending: [] as Array<() => void | (() => void)>, dependencies: [] as unknown[][] }));
vi.mock("react", () => ({
  useEffect: (effect: () => void | (() => void), dependencies: unknown[]) => {
    effects.pending.push(effect);
    effects.dependencies.push(dependencies);
  },
}));
// Importing the route contract must never give this test a live database lookup.
vi.mock("./db", () => ({ getPublishedBlogPostForHtml: vi.fn(() => { throw new Error("Live DB forbidden"); }) }));
import { useSEO, getLocationSEO, getServiceSEO } from "../client/src/hooks/useSEO";
import { getHtmlPath, renderHtmlRouteError, resolveHtmlRoute } from "./contentRouteExistence";

type SEO = Parameters<typeof useSEO>[0];
class HeadElement {
  attributes: Record<string, string> = {};
  parentNode: FakeHead | null = null;
  constructor(readonly tagName: string) {}
  setAttribute(name: string, value: string) { this.attributes[name] = value; }
  getAttribute(name: string) { return this.attributes[name] ?? null; }
  get rel() { return this.getAttribute("rel") ?? ""; }
  set rel(value: string) { this.setAttribute("rel", value); }
  get href() { return this.getAttribute("href") ?? ""; }
  set href(value: string) { this.setAttribute("href", value); }
  remove() {
    if (this.parentNode) this.parentNode.elements = this.parentNode.elements.filter(element => element !== this);
    this.parentNode = null;
  }
}
class FakeHead {
  elements: HeadElement[] = [];
  appendChild(element: HeadElement) {
    element.parentNode = this;
    this.elements.push(element);
    return element;
  }
}
class HeadDocument {
  title = "Initial title";
  head = new FakeHead();
  createElement(tag: string) { return new HeadElement(tag); }
  querySelectorAll(selector: string) {
    const match = selector.match(/^(meta|link)\[(name|property|rel)="([^"]+)"\]$/);
    if (!match) throw new Error(`Unexpected fixture selector: ${selector}`);
    return this.head.elements.filter(element => element.tagName === match[1] && element.getAttribute(match[2]) === match[3]);
  }
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
let cleanups: Array<() => void>;
let network: ReturnType<typeof vi.fn>;
const truro = getLocationSEO("Truro", "truro", "Cornwall");
const birmingham = getLocationSEO("Birmingham", "birmingham", "West Midlands");
const structural = getServiceSEO("Structural Steel Frames", "Existing service description.");

function robotsTags() { return doc.querySelectorAll('meta[name="robots"]'); }
function expectRobots(directive: string) {
  expect(robotsTags()).toHaveLength(1);
  expect(robotsTags()[0].getAttribute("content")).toBe(directive);
}
function addRobots(directive: string) {
  const tag = doc.createElement("meta");
  tag.setAttribute("name", "robots");
  tag.setAttribute("content", directive);
  doc.head.appendChild(tag);
  return tag;
}
function flushEffect() {
  const effect = effects.pending.shift();
  if (!effect) throw new Error("Expected a captured React effect");
  const cleanup = effect();
  if (cleanup) cleanups.push(cleanup);
  return cleanup;
}
function mount(config: SEO) { useSEO(config); return flushEffect(); }
async function flushCommit() { await Promise.resolve(); }

beforeEach(() => {
  effects.pending = [];
  effects.dependencies = [];
  cleanups = [];
  doc = new HeadDocument();
  browser = new HistoryWindow();
  network = vi.fn(() => { throw new Error("Network forbidden in route lifecycle tests"); });
  vi.stubGlobal("document", doc);
  vi.stubGlobal("window", browser);
  vi.stubGlobal("fetch", network);
});
afterEach(async () => {
  cleanups.forEach(cleanup => cleanup());
  await flushCommit();
  expect(network).not.toHaveBeenCalled();
  vi.unstubAllGlobals();
});

describe("shared exact destination indexing policy (not publication/access control)", () => {
  it.each([
    ["/service-areas/truro", "noindex, follow, max-image-preview:large, max-snippet:-1"],
    ["/service-areas/birmingham", PREVIEW_PAGE_ROBOTS],
    ["/service-areas/wigan", PREVIEW_PAGE_ROBOTS],
    ["/services/structural-steel-frames", PREVIEW_PAGE_ROBOTS],
    ["/", DEFAULT_PAGE_ROBOTS], ["/terms", DEFAULT_PAGE_ROBOTS],
    ["/privacy-policy", NOINDEX_FOLLOW], ["/terms-of-service", NOINDEX_FOLLOW],
    ["/case-studies/fire-escape-multi-storey-office", NOINDEX_FOLLOW],
    ["/admin", NOINDEX_NOFOLLOW], ["/call-analytics", NOINDEX_NOFOLLOW],
  ])("resolves %s on clean, trailing-slash and attributed URLs", (route, expected) => {
    const query = "?utm_source=task06&gclid=a%2Bb&gclid=&gbraid=x&wbraid=y#details";
    for (const input of [route, `${route}${query}`, `${route === "/" ? "" : route}/${query}`]) {
      expect(getPageRobotsDirective(input)).toBe(expected);
      expect(getPageIndexingDirective(input)).toBe(expected);
    }
  });
  it("keeps every maintained town's existing tier without classifying unknown towns", () => {
    for (const slug of Object.keys(locationSlugIndex)) {
      expect(getPageRobotsDirective(`/service-areas/${slug}?ref=task06`)).toBe(getLocationRobotsDirective(slug));
    }
    expect(getPageRobotsDirective("/service-areas/not-a-maintained-town")).toBeUndefined();
  });
  it.each(["/blog/unknown-post", "/services/unknown-service", "/counties/unknown", "/admin/extra", "/privacy-policy/extra", "/404", "/index.html", "//admin", "/%2fadmin", "/%2e%2e/admin", "/admin%5c", "/%GG"])("makes no pathname-only publication claim for %s", input => {
    expect(getPageRobotsDirective(input)).toBeUndefined();
  });
  it("parses scoped matches consistently with the existing server pathname parser", () => {
    const original = "/privacy%2Dpolicy?utm_source=x&gclid=%2B&gclid=#notice";
    expect(getPageIndexingPath(original)).toBe(getHtmlPath(original));
    expect(getPageRobotsDirective(original)).toBe(NOINDEX_FOLLOW);
    expect(original).toBe("/privacy%2Dpolicy?utm_source=x&gclid=%2B&gclid=#notice");
  });
});

describe("useSEO one-tag entry, update, destination-aware exit and history", () => {
  it("deduplicates inherited tags and preserves non-robots metadata values exactly", () => {
    browser.move("/service-areas/truro?utm_source=a&gclid=%2B&gclid=");
    addRobots("index, follow");
    addRobots("noindex, follow");
    const schema = doc.createElement("script");
    schema.setAttribute("type", "application/ld+json");
    schema.setAttribute("data-fixture", '{"existing":"schema"}');
    doc.head.appendChild(schema);
    mount(truro);
    expectRobots(getLocationRobotsDirective("truro"));
    expect(doc.title).toBe(truro.title);
    expect(doc.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(truro.description);
    expect(doc.querySelector('meta[name="keywords"]')?.getAttribute("content")).toBe(truro.keywords);
    expect(doc.querySelector('link[rel="canonical"]')?.href).toBe(truro.canonical);
    expect(doc.querySelector('meta[property="og:title"]')?.getAttribute("content")).toBe(truro.title);
    expect(doc.querySelector('meta[property="og:description"]')?.getAttribute("content")).toBe(truro.description);
    expect(doc.querySelector('meta[property="og:url"]')?.getAttribute("content")).toBe(truro.canonical);
    expect(doc.querySelector('meta[name="twitter:image"]')?.getAttribute("content")).toBe(truro.image);
    expect(schema.getAttribute("data-fixture")).toBe('{"existing":"schema"}');
    expect(browser.location.search).toBe("?utm_source=a&gclid=%2B&gclid=");
  });
  it("handles same-component Truro/Birmingham changes, service exit, Home and both history directions", async () => {
    browser.move("/service-areas/truro");
    const leaveTruro = mount(truro);
    expectRobots(getLocationRobotsDirective("truro"));
    browser.move("/service-areas/birmingham?gclid=x", "pushState");
    expectRobots(getLocationRobotsDirective("birmingham"));
    useSEO(birmingham); // React schedules update; old effect cleans up first.
    leaveTruro?.();
    const leaveBirmingham = flushEffect();
    await flushCommit();
    expect(doc.title).toBe(birmingham.title);
    expect(doc.querySelector('link[rel="canonical"]')?.href).toBe(birmingham.canonical);
    expectRobots(getLocationRobotsDirective("birmingham"));
    browser.move("/service-areas/truro?gclid=back", "popstate");
    expectRobots(getLocationRobotsDirective("truro"));
    leaveBirmingham?.();
    const leaveHeld = mount(truro);
    browser.move("/services/structural-steel-frames?utm_source=service", "pushState");
    leaveHeld?.();
    const leaveService = mount(structural);
    await flushCommit();
    expectRobots(PREVIEW_PAGE_ROBOTS);
    browser.move("/?utm_source=home&gclid=", "pushState");
    leaveService?.(); // Home owns no useSEO hook.
    await flushCommit();
    expectRobots(DEFAULT_PAGE_ROBOTS);
    browser.move("/service-areas/truro?gclid=back", "popstate");
    expectRobots(getLocationRobotsDirective("truro"));
    browser.move("/service-areas/birmingham?gclid=forward", "popstate");
    expectRobots(getLocationRobotsDirective("birmingham"));
    expect(browser.location.search).toBe("?gclid=forward");
  });
  it.each(["/privacy-policy", "/terms-of-service", "/case-studies/fire-escape-multi-storey-office", "/admin", "/call-analytics"])("deduplicates scoped %s entry and correctly exits to held town and Home", async route => {
    browser.move(`${route}?utm_source=task06&gclid=a%2Bb`);
    addRobots("index, follow");
    addRobots("noindex, follow");
    const leave = mount({ title: "Existing title", description: "Existing description", robots: getPageRobotsDirective(route) });
    expectRobots(getPageRobotsDirective(route)!);
    browser.move("/service-areas/truro?gclid=kept", "pushState");
    leave?.();
    await flushCommit();
    expectRobots(getLocationRobotsDirective("truro"));
    browser.move("/", "replaceState");
    expectRobots(DEFAULT_PAGE_ROBOTS);
  });
  it("reconciles the next restricted destination when old cleanup runs after new setup", async () => {
    browser.move("/services/structural-steel-frames");
    const oldCleanup = mount(structural);
    browser.move("/service-areas/truro", "pushState");
    mount(truro);
    oldCleanup?.();
    await flushCommit();
    expectRobots(getLocationRobotsDirective("truro"));
    browser.move("/privacy-policy", "pushState");
    expectRobots(NOINDEX_FOLLOW);
    oldCleanup?.();
    await flushCommit();
    expectRobots(NOINDEX_FOLLOW);
  });
  it("never allows an explicit index directive to promote a held/internal destination", () => {
    browser.move("/service-areas/truro");
    mount({ ...truro, robots: "index, follow" });
    expectRobots(getLocationRobotsDirective("truro"));
    browser.move("/admin", "replaceState");
    mount({ title: "Admin Dashboard", description: "Existing description", robots: "index, follow" });
    expectRobots(NOINDEX_NOFOLLOW);
  });
  it("guards a parent passive effect when a child auth Redirect already reached Home", async () => {
    browser.move("/call-analytics?ref=task06");
    useSEO({ title: "Call Tracking Analytics", description: "Existing description", robots: NOINDEX_NOFOLLOW });
    browser.move("/?ref=task06", "replaceState"); // Child Redirect effect first.
    doc.title = "Commercial Shot Blasting Services | Nationwide"; // Home effect.
    const cleanup = flushEffect();
    expectRobots(DEFAULT_PAGE_ROBOTS);
    expect(doc.title).toBe("Commercial Shot Blasting Services | Nationwide");
    cleanup?.();
    await flushCommit();
    expectRobots(DEFAULT_PAGE_ROBOTS);
    expect(browser.location.search).toBe("?ref=task06");
  });
  it("does not apply stale held-town or deletion directives to an unknown dynamic destination", async () => {
    browser.move("/service-areas/truro");
    const leave = mount(truro);
    browser.move("/blog/unknown-or-unavailable?gclid=x", "pushState");
    leave?.();
    await flushCommit();
    expect(robotsTags()).toHaveLength(0);
    mount({ title: "Existing dynamic title", description: "Existing dynamic description" });
    expect(robotsTags()).toHaveLength(0);
  });
  it("deduplicates on title-driven updates and keeps explicit directives only on their route", async () => {
    browser.move("/blog/runtime-resolved-post");
    const leave = mount({ title: "Runtime content", description: "Existing description", robots: PREVIEW_PAGE_ROBOTS });
    expectRobots(PREVIEW_PAGE_ROBOTS);
    addRobots("index, follow");
    useSEO({ title: "Updated runtime title", description: "Existing description", robots: PREVIEW_PAGE_ROBOTS });
    leave?.();
    flushEffect();
    await flushCommit();
    expectRobots(PREVIEW_PAGE_ROBOTS);
    expect(doc.title).toBe("Updated runtime title");
    expect(effects.dependencies[0][0]).toBe("Runtime content");
    expect(effects.dependencies[1][0]).toBe("Updated runtime title");
    browser.move("/blog/another-unknown", "popstate");
    expect(robotsTags()).toHaveLength(0);
  });
  it("handles query-only and hash history updates without rewriting attribution", () => {
    browser.move("/privacy-policy?gclid=one");
    mount({ title: "Existing legal title", description: "Existing legal description", robots: NOINDEX_FOLLOW });
    browser.move("/privacy-policy?utm_source=x&gclid=&gclid=%2B&gbraid=g&wbraid=w#notice", "replaceState");
    expectRobots(NOINDEX_FOLLOW);
    browser.dispatchEvent(new Event("hashchange"));
    expectRobots(NOINDEX_FOLLOW);
    expect(browser.location.href).toBe("https://commercialshotblasting.co.uk/privacy-policy?utm_source=x&gclid=&gclid=%2B&gbraid=g&wbraid=w#notice");
  });
});

describe("existing unknown/error and unconditional internal-shell contracts", () => {
  it("keeps real unknown blog 404 distinct from temporary unavailable 503, entirely offline", async () => {
    const missingLookup = vi.fn(async () => ({ state: "missing" as const }));
    const outageLookup = vi.fn(async () => ({ state: "unavailable" as const }));
    expect(await resolveHtmlRoute("/blog/not-published?gclid=x", { lookupPost: missingLookup })).toEqual({ state: "missing", media: false });
    expect(await resolveHtmlRoute("/blog/unavailable?gclid=x", { lookupPost: outageLookup })).toEqual({ state: "unavailable" });
    expect(renderHtmlRouteError(404)).toContain('<meta name="robots" content="noindex, follow">');
    expect(renderHtmlRouteError(503)).not.toContain('name="robots"');
    expect(renderHtmlRouteError(503)).not.toContain("noindex");
    expect(getPageRobotsDirective("/blog/unavailable")).toBeUndefined();
  });
  it.each(["Admin", "CallAnalytics"])("calls useSEO unconditionally before any %s authentication return", page => {
    const text = readFileSync(new URL(`../client/src/pages/${page}.tsx`, import.meta.url), "utf8");
    const source = ts.createSourceFile(`${page}.tsx`, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const component = source.statements.find(statement => ts.isFunctionDeclaration(statement) && statement.name?.text === page) as ts.FunctionDeclaration;
    const statements = component.body!.statements;
    const seoIndex = statements.findIndex(statement => ts.isExpressionStatement(statement) && ts.isCallExpression(statement.expression) && statement.expression.expression.getText(source) === "useSEO");
    const firstBranch = statements.findIndex(statement => ts.isIfStatement(statement) || ts.isReturnStatement(statement));
    expect(seoIndex).toBeGreaterThanOrEqual(0);
    expect(seoIndex).toBeLessThan(firstBranch);
    expect(statements[seoIndex].getText(source)).toContain('robots: "noindex, nofollow"');
    // The metadata addition does not claim to secure either shell or alter auth.
    expect(text).toContain("useAuth()");
    if (page === "CallAnalytics") expect(text).toContain('return <Redirect to="/" />;');
    else expect(text).toContain('if (user.role !== "admin")');
  });
  it("legal/provisional pages explicitly retain intended robots with one provisional owner", () => {
    for (const page of ["PrivacyPolicy", "AdsAppTermsOfService", "FireEscapeProvisionalCaseStudy"]) {
      const text = readFileSync(new URL(`../client/src/pages/${page}.tsx`, import.meta.url), "utf8");
      expect(text).toContain('robots: "noindex, follow"');
      expect(text).not.toContain("previousContent");
    }
  });
});
