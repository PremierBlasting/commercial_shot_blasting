import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import superjson from "superjson";
import {
  getRenderingPilot, splitRenderingUrl, validateRenderingPilotBoot,
  RENDERING_PILOT_RELEASE, type RenderingPilotBoot,
} from "../shared/renderingPilot";
import { composePilotHtml } from "./ssr/composePilotHtml";

const paths = ["/services/structural-steel-frames", "/counties/hampshire", "/blog/factory-warehouse-cladding-restoration", "/"];
const rawSearch = "adwords=ppc&utm_campaign=fixture&gclid=DENIED_CLICK_ID&ref=a%2Bb%2Fc%3Dd%20e&plus=a+b&dup=one&dup=two&empty=&bare?second=%ZZ";
const date = new Date("2026-01-01T23:30:00Z");
const gallery = { id: 1, title: "Public steel", category: "structural", description: "Public copy", beforeImage: "/before.webp", afterImage: "/after.webp", isActive: true, sortOrder: 0, createdAt: date, updatedAt: date };
const template = '<!doctype html><html><head><title>Task07 owner</title></head><body><div id="root"><!--RENDERING_PILOT_ROOT--></div><script id="route-metadata-boot" type="application/json">{"owner":"Task07"}</script></body></html>';
function payload(page: string) {
  const matches = Array.from(page.matchAll(/<script id="rendering-pilot-boot" type="application\/json">([\s\S]*?)<\/script>/g));
  expect(matches).toHaveLength(1);
  return matches[0][1];
}

function boot(pathname = "/", data: unknown = [gallery], preserveDateAliases = false): RenderingPilotBoot {
  const qc = new QueryClient();
  const cloneDates = (value: any): any => value instanceof Date ? new Date(value.getTime()) : Array.isArray(value) ? value.map(cloneDates) : value && typeof value === "object" ? Object.fromEntries(Object.entries(value).map(([key, item]) => [key, cloneDates(item)])) : value;
  if (pathname === "/" || pathname === paths[0]) {
    qc.setQueryData([["gallery", "list"], { type: "query" }], preserveDateAliases ? data : cloneDates(data));
    qc.setQueryData([["testimonials", "list"], { type: "query" }], []);
    if (pathname === "/") qc.setQueryData([["blog", "list"], { type: "query" }], []);
  }
  const state = superjson.serialize(dehydrate(qc));
  qc.clear();
  return { schemaVersion: 1, release: RENDERING_PILOT_RELEASE, pathname, pilotId: getRenderingPilot(pathname)!.id, success: true, renderValues: { year: 2026 }, state };
}
function alterState(value: RenderingPilotBoot, edit: (state: any) => void) {
  const state = superjson.deserialize<any>(value.state);
  edit(state);
  return { ...value, state: superjson.serialize(state) };
}
beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(date); vi.stubGlobal("fetch", vi.fn(() => { throw new Error("TEST DENIED live transport"); })); });
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("Task08 exact four raw-path pilot / query contract", () => {
  it("has the approved release and four distinct pilot identities", () => {
    expect(RENDERING_PILOT_RELEASE).toBe("csb-task08-20261118-v3");
    expect(new Set(paths.map(path => getRenderingPilot(path)!.id)).size).toBe(4);
  });
  it("rejects valid-shaped old v1/v2 state instead of hydrating it with the v3 tree", () => {
    const current = boot();
    expect(validateRenderingPilotBoot(current, "/")).not.toBeNull();
    for (const release of ["csb-task08-20261118-v1", "csb-task08-20261118-v2"]) {
      expect(validateRenderingPilotBoot({ ...current, release }, "/")).toBeNull();
    }
  });
  it.each(paths)("selects only exact %s, independently of search/hash", path => {
    for (const suffix of ["", "?", "?" + rawSearch, "?" + rawSearch + "#browser-fragment", "#browser-fragment?not-search"]) {
      expect(getRenderingPilot(path + suffix)).toEqual(getRenderingPilot(path));
      expect(getRenderingPilot(path + suffix)?.pathname).toBe(path);
    }
  });
  it.each(["/services/intumescent-painting", "/services/structural-steel-frames/", "/services/Structural-steel-frames", "/services/%73tructural-steel-frames", "/services/structural-steel-frames/extra", "/counties/hampshire/", "/counties/Hampshire", "/counties/kent", "/blog/other-published-article", "/blog/factory-warehouse-cladding-restoration/", "/service-areas/derby", "/admin", "/contact", "/privacy-policy", "/index.html", "/404", "/assets", "//", "", "https://example.invalid/", "/%2f", "/?bad=1/extra#fragment"].filter(p => p !== "/?bad=1/extra#fragment"))(
    "does not normalize/broaden %j", path => expect(getRenderingPilot(path + "?" + rawSearch)).toBeNull(),
  );
  it("splits at first ? and strips only the browser fragment", () => {
    expect(splitRenderingUrl("/counties/hampshire?" + rawSearch + "#hash?tail")).toEqual({ pathname: "/counties/hampshire", search: rawSearch });
    expect(splitRenderingUrl("/counties/hampshire?")).toEqual({ pathname: "/counties/hampshire", search: "" });
    expect(splitRenderingUrl("/#fragment?not-query")).toEqual({ pathname: "/", search: "" });
  });
});

describe("inert boot release / shape / public query whitelist", () => {
  it("accepts public Date-preserving state and static Hampshire empty state", () => {
    expect(validateRenderingPilotBoot(boot(), "/")).not.toBeNull();
    const restored = superjson.deserialize<any>(boot().state);
    expect(restored.queries.find((q: any) => q.queryKey[0][0] === "gallery").state.data[0].createdAt).toEqual(date);
    expect(validateRenderingPilotBoot(boot("/counties/hampshire"), "/counties/hampshire")).not.toBeNull();
  });
  it("accepts only preserved aliases between annotated fixed public Date fields", () => {
    const value = boot("/", [gallery], true);
    const meta = value.state.meta as any;
    expect(meta.referentialEqualities).toBeDefined();
    expect(Object.keys(meta.referentialEqualities)).toContain("queries.0.state.data.0.createdAt");
    expect(validateRenderingPilotBoot(value, "/")).not.toBeNull();
    const restored = superjson.deserialize<any>(value.state);
    const row = restored.queries[0].state.data[0];
    expect(row.createdAt).toBeInstanceOf(Date);
    expect(row.createdAt).toBe(row.updatedAt);
    expect(row.createdAt).toEqual(date);
  });
  it.each(["queries.0.state.data.0.email", "queries.0.state.data.0.title", "queries.0.state.data.0.__proto__", "queries.0.queryKey", "mutations.0.state.data", "queries.0.state.data.0.publishedAt"])("rejects private/arbitrary or unannotated Date alias %s", alias => {
    const value = boot("/", [gallery], true);
    const serialized = JSON.parse(JSON.stringify(value.state));
    serialized.meta.referentialEqualities = { "queries.0.state.data.0.createdAt": [alias] };
    expect(validateRenderingPilotBoot({ ...value, state: serialized }, "/")).toBeNull();
    serialized.meta.referentialEqualities = { [alias]: ["queries.0.state.data.0.createdAt"] };
    expect(validateRenderingPilotBoot({ ...value, state: serialized }, "/")).toBeNull();
  });
  it.each(["Error", "regexp", "custom", "URL", "class"])("rejects non-Date Superjson annotation %s", annotation => {
    const value = boot();
    const state = JSON.parse(JSON.stringify(value.state));
    state.meta.values["queries.0.state.data.0.createdAt"] = [annotation];
    expect(validateRenderingPilotBoot({ ...value, state }, "/")).toBeNull();
  });
  it.each([null, {}, [], "boot", { schemaVersion: 1 }])("rejects malformed %j", value => expect(validateRenderingPilotBoot(value, "/")).toBeNull());
  it.each([
    { schemaVersion: 2 }, { release: "old-worker-cached-release" }, { success: false },
    { pathname: "/services/intumescent-painting" }, { pilotId: "other" },
    { renderValues: { year: NaN } }, { renderValues: { year: 2026, token: "private" } },
    { state: { json: { queries: [], mutations: [{ data: "private" }] } } },
    { rawUrl: "/?gclid=private" }, { search: "utm_campaign=private" }, { cookie: "session" },
  ])("rejects an invalid/extended envelope %j", change => expect(validateRenderingPilotBoot({ ...boot(), ...change }, "/")).toBeNull());
  it("rejects correct-release state cached for another route or nonpilot", () => {
    expect(validateRenderingPilotBoot(boot(), paths[0])).toBeNull();
    expect(validateRenderingPilotBoot(boot(), "/services/intumescent-painting")).toBeNull();
  });
  it.each(["auth", "admin", "contact", "upload", "crm", "storage"])("rejects unexpected %s cache keys", procedure => {
    const value = alterState(boot(), state => { state.queries[0].queryKey = [[procedure, "list"], { type: "query" }]; });
    expect(validateRenderingPilotBoot(value, "/")).toBeNull();
  });
  it.each(["email", "phone", "user", "session", "token", "cookie", "gclid", "consent", "upload", "internalNotes"])("rejects private/unapproved row field %s", field => {
    expect(validateRenderingPilotBoot(boot("/", [{ ...gallery, [field]: "PRIVATE_SENTINEL" }]), "/")).toBeNull();
  });
  it("rejects mutation, errors, duplicate/unexpected input/type and crossroute caches", () => {
    for (const edit of [
      (s: any) => { s.mutations.push({ mutationKey: ["contact", "submit"], state: { data: "private" } }); },
      (s: any) => { s.queries[0].state.error = new Error("PRIVATE_DB_ERROR"); s.queries[0].state.status = "error"; },
      (s: any) => { s.queries[0].queryKey[1].input = {}; },
      (s: any) => { s.queries[0].queryKey[1].type = "infinite"; },
      (s: any) => { s.queries.push(s.queries[0]); },
    ]) expect(validateRenderingPilotBoot(alterState(boot(), edit), "/")).toBeNull();
    expect(validateRenderingPilotBoot({ ...boot(), pathname: paths[1], pilotId: getRenderingPilot(paths[1])!.id }, paths[1])).toBeNull();
  });
});

describe("composition safety without global normalization of App/data", () => {
  it("preserves literal replacement sequences and Task07 head/boot; puts inert state outside root", () => {
    const html = '<h1>Actual component output</h1><p>$$ $& $\' $` /services/factory-cladding-shot-blasting</p><!-- literal </body> -->';
    const page = composePilotHtml(template, { html, boot: boot() });
    expect(page).toContain(html);
    expect(page).toContain('<div id="root">' + html + '</div>');
    expect(page).toContain('<title>Task07 owner</title>');
    expect(page).toContain('<script id="route-metadata-boot" type="application/json">{"owner":"Task07"}</script>');
    expect(validateRenderingPilotBoot(JSON.parse(payload(page)), "/")).not.toBeNull();
    const withoutBody = page.replace('<div id="root">' + html + '</div>', '');
    expect(payload(withoutBody)).toBe(payload(page));
    expect(page).not.toContain("RENDERING_PILOT_ROOT");
  });
  it("escapes all script delimiters / Unicode separators without losing dates or public copy", () => {
    const text = "</script><script>DENIED</script>&>\u2028\u2029$$ $& $' $`";
    const page = composePilotHtml(template, { html: "<h1>Actual page</h1>", boot: boot("/", [{ ...gallery, description: text }]) });
    const raw = payload(page);
    for (const char of ["<", ">", "&", "\u2028", "\u2029"]) expect(raw).not.toContain(char);
    const state = superjson.deserialize<any>(JSON.parse(raw).state);
    const row = state.queries.find((q: any) => q.queryKey[0][0] === "gallery").state.data[0];
    expect(row.description).toBe(text);
    expect(row.createdAt).toEqual(date);
    expect(Array.from(page.matchAll(/<script\b/g))).toHaveLength(2);
  });
  it("revalidates the boot before serializing and never writes invalid private state", () => {
    expect(() => composePilotHtml(template, { html: "<h1>Actual page</h1>", boot: { ...boot(), token: "PRIVATE_SENTINEL" } as any })).toThrow();
  });
  it.each([template.replace("<!--RENDERING_PILOT_ROOT-->", ""), template.replace("</head>", "<!--RENDERING_PILOT_ROOT--></head>"), template.replace('id="root"', 'id="other"')])("fails closed on missing/ambiguous/out-of-root marker", input => {
    expect(() => composePilotHtml(input, { html: "<h1>Actual page</h1>", boot: boot() })).toThrow();
  });
  it("caps combined UTF-8 buffered HTML and state at 2 MiB (not character count)", () => {
    expect(() => composePilotHtml(template, { html: "é".repeat(1024 * 1024), boot: boot() })).toThrow();
    expect(() => composePilotHtml(template, { html: "x".repeat(2 * 1024 * 1024), boot: boot() })).toThrow();
    expect(() => composePilotHtml(template, { html: "x".repeat(1024 * 1024), boot: boot() })).not.toThrow();
  });
});
