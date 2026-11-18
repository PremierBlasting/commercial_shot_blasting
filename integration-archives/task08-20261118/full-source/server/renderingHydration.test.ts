import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createServer, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import { resolveRouteMetadata } from "../shared/routeMetadata";
import { validateRenderingPilotBoot, type PilotSeed } from "../shared/renderingPilot";

// Node-only contract/SSR coverage, NOT DOM hydration acceptance. No jsdom exists.
// Mandatory first-hydration node-identity/console checks are parent-owned real
// Chromium checks using browser/hydration_probe.py. Never mock App or pages.
// Existing Vitest config uses classic JSX: do not add global React or modify it.
// All runtime components, hooks, React and ReactDOM come from this one Vite graph.
let vite: ViteDevServer;
let createElement: typeof import("react").createElement;
let Suspense: typeof import("react").Suspense;
let renderToString: typeof import("react-dom/server").renderToString;
let QueryClient: typeof import("@tanstack/react-query").QueryClient;
let RenderProviders: typeof import("../client/src/ssr/RenderProviders").RenderProviders;
let createServerTRPCClient: typeof import("../client/src/ssr/RenderProviders").createServerTRPCClient;
let createServerQueryClient: typeof import("../client/src/ssr/RenderProviders").createServerQueryClient;
let usePilotRenderContext: typeof import("../client/src/ssr/PilotRenderContext").usePilotRenderContext;
let usePilotDateFormatter: typeof import("../client/src/ssr/PilotRenderContext").usePilotDateFormatter;
let usePilotYear: typeof import("../client/src/ssr/PilotRenderContext").usePilotYear;
let readPilotFormInitialValues: typeof import("../client/src/ssr/PilotRenderContext").readPilotFormInitialValues;
let usePilotFormInitialValues: typeof import("../client/src/ssr/PilotRenderContext").usePilotFormInitialValues;
let preloadable: typeof import("../client/src/ssr/preloadable").preloadable;
let renderPilot: typeof import("../client/src/ssr/entry-server").renderPilot;
beforeAll(async () => {
  const root = fileURLToPath(new URL("../", import.meta.url));
  vite = await createServer({
    configFile: false, root: path.join(root,"client"), envDir: root,
    cacheDir: "/home/ubuntu/csb-task08-implementation-2026-11-17/test-vite-cache",
    appType: "custom", logLevel: "error", publicDir: false,
    plugins: [{
      name: "task08-deny-private-backend-imports", enforce: "pre",
      resolveId(source, importer) {
        if (source === "/@task08/graph.ts") return "\0task08-ssr-graph";
        const resolved = source.startsWith(".") && importer ? path.resolve(path.dirname(importer),source) : source;
        if (/\/server\/(?:db|routers|storage|_core\/(?:context|sdk))(?:\.[cm]?[jt]s)?$/.test(resolved)) {
          throw new Error("TEST DENIED renderer private backend import: " + source);
        }
      },
      load(id) {
        if (id !== "\0task08-ssr-graph") return;
        return `export {createElement,Suspense} from 'react';
          export {renderToString} from 'react-dom/server';
          export {QueryClient} from '@tanstack/react-query';
          export {RenderProviders,createServerTRPCClient,createServerQueryClient} from '/src/ssr/RenderProviders.tsx';
          export {usePilotRenderContext,usePilotDateFormatter,usePilotYear,readPilotFormInitialValues,usePilotFormInitialValues} from '/src/ssr/PilotRenderContext.tsx';
          export {preloadable} from '/src/ssr/preloadable.tsx';
          export {renderPilot} from '/src/ssr/entry-server.tsx';`;
      },
    }, react()],
    resolve: { alias: { "@": path.join(root,"client/src"), "@shared": path.join(root,"shared"), "@assets": path.join(root,"attached_assets") } },
    server: { middlewareMode: true, hmr: false, watch: null },
    ssr: { noExternal: ["react-helmet-async"] },
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  ({createElement,Suspense,renderToString,QueryClient,RenderProviders,createServerTRPCClient,createServerQueryClient,
    usePilotRenderContext,usePilotDateFormatter,usePilotYear,readPilotFormInitialValues,usePilotFormInitialValues,
    preloadable,renderPilot} = await vite.ssrLoadModule("/@task08/graph.ts"));
}, 60000);
afterAll(async () => { await vite?.close(); });
const queryKey = (name: string, input?: object): unknown[] => [name.split("."), { ...(input === undefined ? {} : { input }), type: "query" }];
const slug = "factory-warehouse-cladding-restoration";
const articlePath = "/blog/" + slug;
const date = new Date("2026-01-01T23:30:00Z");
const post = { id: 8, slug, title: "Factory & Warehouse Cladding Restoration", excerpt: "Offline public fixture excerpt", content: '<h2>Offline public article evidence</h2><p>Offline public fixture body.</p>', featuredImage: "/offline-article.webp", author: "Commercial Shot Blasting", category: "Restoration Projects", tags: '["steel"]', faq: null, metaDescription: "Public offline fixture description", isPublished: true, publishedAt: date, createdAt: date, updatedAt: date };
const gallery = { id: 9, title: "Warehouse Cladding Restoration", category: "structural", description: "Offline public gallery evidence", beforeImage: "/offline-before.webp", afterImage: "/offline-after.webp", isActive: true, sortOrder: 0, createdAt: date, updatedAt: date };
const testimonial = { id: 10, name: "Public Reviewer", company: "HB Tunnelling Limited", rating: 5, text: "Offline public review evidence", project: "Offline public project", images: [], isNew: false, isActive: true, sortOrder: 0, createdAt: date, updatedAt: date };
const pilots = [
  ["/services/structural-steel-frames", "What Happens If Steel Isn't Prepared to Sa 2.5?"],
  ["/counties/hampshire", "Request A Site Visit"],
  [articlePath, "UK Commercial Shot Blasting Contractor"],
  ["/", "View Our Work"],
] as const;
function cloneDates(value: any): any {
  if (value instanceof Date) return new Date(value.getTime());
  if (Array.isArray(value)) return value.map(cloneDates);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k,v]) => [k,cloneDates(v)]));
  return value;
}
function seeds(path: string, requestLabel?: string): PilotSeed[] {
  if (path === "/counties/hampshire") return [];
  if (path === articlePath) return cloneDates([{ queryKey: queryKey("blog.getBySlug", { slug }), data: { ...post, content: post.content + (requestLabel ? '<p>' + requestLabel + '</p>' : '') } }, { queryKey: queryKey("blog.getRelated", { slug, category: post.category }), data: [] }]);
  const value: PilotSeed[] = [{ queryKey: queryKey("gallery.list"), data: [{ ...gallery, description: requestLabel ?? gallery.description }] }, { queryKey: queryKey("testimonials.list"), data: [testimonial] }];
  if (path === "/") value.push({ queryKey: queryKey("blog.list"), data: [post] });
  return cloneDates(value);
}
function metadata(path: string) {
  return resolveRouteMetadata(path, path === articlePath ? { state: "published", title: post.title, description: post.metaDescription, image: post.featuredImage, author: post.author, section: post.category, publishedAt: date, modifiedAt: date } : {});
}
let network: ReturnType<typeof vi.fn>;
beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] }); vi.setSystemTime(date);
  network = vi.fn(() => { throw new Error("TEST DENIED live network/Google/contact/CRM/storage"); });
  vi.stubGlobal("fetch", network);
});
afterEach(() => { expect(network).not.toHaveBeenCalled(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

function renderProbe(path: string, child: ReactNode, seedPath: string | null = path) {
  const qc = createServerQueryClient();
  try {
    return renderToString(createElement(RenderProviders, { queryClient: qc, trpcClient: createServerTRPCClient(), ssrPath: path, pilot: seedPath ? { pathname: seedPath, renderValues: { year: 2042 } } : null, children: child }));
  } finally { qc.clear(); }
}

const formFields = ["name", "phone", "email", "postcode", "message"] as const;
type FormField = typeof formFields[number];
type FormValues = Record<FormField, string>;
const emptyFormValues: FormValues = { name: "", phone: "", email: "", postcode: "", message: "" };
const syntheticFormValues: FormValues = {
  name: " INERT_FORM_NAME_DO_NOT_SEND ",
  phone: "INERT_FORM_PHONE_DO_NOT_SEND",
  email: "INERT_FORM_EMAIL_DO_NOT_SEND@example.invalid",
  postcode: "INERT_FORM_POSTCODE_DO_NOT_SEND",
  message: "INERT_FORM_MESSAGE_DO_NOT_SEND\nSecond line — preserve raw text",
};
type FakeForm = { tagName: string; dispatchEvent: ReturnType<typeof vi.fn>; submit: ReturnType<typeof vi.fn> };
type FakeControl = {
  id: string; tagName: string; required: boolean; isConnected: boolean;
  attributeType: string | null; value: string; form: FakeForm | null;
  closest: ReturnType<typeof vi.fn>; getAttribute: ReturnType<typeof vi.fn>;
  dispatchEvent: ReturnType<typeof vi.fn>;
};
// Deliberately minimal plain objects, not a DOM/browser or hydration simulation.
// They test the exported reader's lookup/identity/read-only contract only.
function fakeFormDocument(entries = [{ fieldId: ":fixture-A:", values: syntheticFormValues }]) {
  const deniedEffect = () => { throw new Error("TEST DENIED form mutation/event dispatch"); };
  const lookup = new Map<string, unknown>();
  const insideRoot = new Set<unknown>();
  const root = { contains: vi.fn((node: unknown) => insideRoot.has(node)), dispatchEvent: vi.fn(deniedEffect) };
  lookup.set("root", root);
  const forms: FakeForm[] = [];
  const groups: Record<FormField, FakeControl>[] = [];
  for (const { fieldId, values } of entries) {
    const form: FakeForm = { tagName: "FORM", dispatchEvent: vi.fn(deniedEffect), submit: vi.fn(deniedEffect) };
    forms.push(form); insideRoot.add(form);
    const controls = {} as Record<FormField, FakeControl>;
    for (const field of formFields) {
      const control: FakeControl = {
        id: `${fieldId}-${field}`, tagName: field === "message" ? "TEXTAREA" : "INPUT",
        required: true, isConnected: true,
        attributeType: field === "message" ? null : field === "phone" ? "tel" : field === "email" ? "email" : "text",
        value: values[field], form,
        closest: vi.fn((selector: string) => selector === "form" ? control.form : null),
        getAttribute: vi.fn((name: string) => name === "type" ? control.attributeType : null),
        dispatchEvent: vi.fn(deniedEffect),
      };
      controls[field] = control; lookup.set(control.id, control); insideRoot.add(control);
    }
    groups.push(controls);
  }
  const getElementById = vi.fn((id: string) => lookup.get(id) ?? null);
  const documentObject = { getElementById, dispatchEvent: vi.fn(deniedEffect) };
  return { doc: documentObject as unknown as Document, documentObject, getElementById, root, lookup, insideRoot, forms, groups };
}

describe("pure fake-document five-field snapshot contract (NOT DOM hydration proof)", () => {
  it("reads all five exact native IDs, preserving whitespace, invalid raw text and multiline Unicode", () => {
    const fixture = fakeFormDocument();
    expect(readPilotFormInitialValues(":fixture-A:", true, fixture.doc)).toEqual(syntheticFormValues);
    expect(fixture.getElementById.mock.calls.map(([id]) => id)).toEqual(["root", ...formFields.map(field => `:fixture-A:-${field}`)]);
    for (const control of Object.values(fixture.groups[0])) expect(control.closest).toHaveBeenCalledWith("form");
  });
  it.each(formFields)("preserves %s independently while unopened fields remain empty", field => {
    const values = { ...emptyFormValues, [field]: syntheticFormValues[field] };
    expect(readPilotFormInitialValues(":fixture-A:", true, fakeFormDocument([{ fieldId: ":fixture-A:", values }]).doc)).toEqual(values);
  });
  it("keeps separate stable field IDs and forms independent under the same root", () => {
    const second = Object.fromEntries(formFields.map(field => [field, `INERT_SECOND_FORM_${field}`])) as FormValues;
    const fixture = fakeFormDocument([{ fieldId: ":fixture-A:", values: syntheticFormValues }, { fieldId: ":fixture-B:", values: second }]);
    expect(readPilotFormInitialValues(":fixture-A:", true, fixture.doc)).toEqual(syntheticFormValues);
    expect(readPilotFormInitialValues(":fixture-B:", true, fixture.doc)).toEqual(second);
    expect(readPilotFormInitialValues(":fixture-unmatched:", true, fixture.doc)).toEqual(emptyFormValues);
  });
  it.each(formFields)("denies the entire snapshot when %s is missing", field => {
    const fixture = fakeFormDocument(); fixture.lookup.delete(`:fixture-A:-${field}`);
    expect(readPilotFormInitialValues(":fixture-A:", true, fixture.doc)).toEqual(emptyFormValues);
  });
  it.each(formFields)("denies the entire snapshot when %s has the wrong native tag", field => {
    const fixture = fakeFormDocument(); fixture.groups[0][field].tagName = field === "message" ? "INPUT" : "TEXTAREA";
    expect(readPilotFormInitialValues(":fixture-A:", true, fixture.doc)).toEqual(emptyFormValues);
  });
  it.each(["name", "phone", "email", "postcode"] as const)("denies %s with a wrong native input type", field => {
    const fixture = fakeFormDocument(); fixture.groups[0][field].attributeType = "checkbox";
    expect(readPilotFormInitialValues(":fixture-A:", true, fixture.doc)).toEqual(emptyFormValues);
  });
  it.each(formFields)("denies non-required %s", field => {
    const fixture = fakeFormDocument(); fixture.groups[0][field].required = false;
    expect(readPilotFormInitialValues(":fixture-A:", true, fixture.doc)).toEqual(emptyFormValues);
  });
  it.each(formFields)("denies disconnected %s", field => {
    const fixture = fakeFormDocument(); fixture.groups[0][field].isConnected = false;
    expect(readPilotFormInitialValues(":fixture-A:", true, fixture.doc)).toEqual(emptyFormValues);
  });
  it.each(formFields)("denies %s outside the selected root", field => {
    const fixture = fakeFormDocument(); fixture.insideRoot.delete(fixture.groups[0][field]);
    expect(readPilotFormInitialValues(":fixture-A:", true, fixture.doc)).toEqual(emptyFormValues);
  });
  it("denies a missing root before reading any controls", () => {
    const fixture = fakeFormDocument(); fixture.lookup.delete("root");
    expect(readPilotFormInitialValues(":fixture-A:", true, fixture.doc)).toEqual(emptyFormValues);
    expect(fixture.getElementById).toHaveBeenCalledTimes(1); expect(fixture.getElementById).toHaveBeenCalledWith("root");
  });
  it("denies controls without a containing form", () => {
    const fixture = fakeFormDocument(); fixture.groups[0].message.form = null;
    expect(readPilotFormInitialValues(":fixture-A:", true, fixture.doc)).toEqual(emptyFormValues);
  });
  it("denies a containing form outside the root even when controls are inside", () => {
    const fixture = fakeFormDocument(); fixture.insideRoot.delete(fixture.forms[0]);
    expect(readPilotFormInitialValues(":fixture-A:", true, fixture.doc)).toEqual(emptyFormValues);
  });
  it("denies mixed-form fields instead of combining values across forms", () => {
    const fixture = fakeFormDocument([{ fieldId: ":fixture-A:", values: syntheticFormValues }, { fieldId: ":fixture-B:", values: emptyFormValues }]);
    fixture.groups[0].message.form = fixture.forms[1];
    expect(readPilotFormInitialValues(":fixture-A:", true, fixture.doc)).toEqual(emptyFormValues);
  });
  it("returns blank when disabled/non-pilot without any document read", () => {
    const fixture = fakeFormDocument();
    expect(readPilotFormInitialValues(":fixture-A:", false, fixture.doc)).toEqual(emptyFormValues);
    expect(fixture.getElementById).not.toHaveBeenCalled(); expect(fixture.root.contains).not.toHaveBeenCalled();
    for (const control of Object.values(fixture.groups[0])) {
      expect(control.closest).not.toHaveBeenCalled(); expect(control.getAttribute).not.toHaveBeenCalled();
    }
  });
  it("returns blank without an explicit document on the server", () => {
    expect(typeof window).toBe("undefined"); expect(typeof document).toBe("undefined");
    expect(readPilotFormInitialValues(":fixture-A:", true)).toEqual(emptyFormValues);
    expect(readPilotFormInitialValues(":fixture-A:", false)).toEqual(emptyFormValues);
  });
  it("reads frozen objects without mutation, storage, network, logs or event dispatch", () => {
    const fixture = fakeFormDocument();
    const deniedStorage = () => { throw new Error("TEST DENIED storage access"); };
    const storage = { getItem: vi.fn(deniedStorage), setItem: vi.fn(deniedStorage), removeItem: vi.fn(deniedStorage), clear: vi.fn(deniedStorage) };
    vi.stubGlobal("localStorage", storage); vi.stubGlobal("sessionStorage", storage);
    const logs = ["log", "info", "warn", "error", "debug"].map(method => vi.spyOn(console, method as "log"));
    for (const object of [fixture.documentObject, fixture.root, ...fixture.forms, ...Object.values(fixture.groups[0])]) Object.freeze(object);
    const snapshot = readPilotFormInitialValues(":fixture-A:", true, fixture.doc);
    expect(snapshot).toEqual(syntheticFormValues);
    snapshot.name = "INERT_OUTPUT_ONLY";
    expect(readPilotFormInitialValues(":fixture-A:", true, fixture.doc)).toEqual(syntheticFormValues);
    for (const method of Object.values(storage)) expect(method).not.toHaveBeenCalled();
    for (const log of logs) expect(log).not.toHaveBeenCalled();
    for (const object of [fixture.documentObject, fixture.root, ...fixture.forms, ...Object.values(fixture.groups[0])]) expect(object.dispatchEvent).not.toHaveBeenCalled();
    for (const form of fixture.forms) expect(form.submit).not.toHaveBeenCalled();
    expect(network).not.toHaveBeenCalled();
  });
  it.each([
    ["/", "/"], ["/services/intumescent-painting", "/"], ["/", null],
  ] as const)("keeps hook values blank in Node for route %s / seed %s", (path, seedPath) => {
    function Probe() { return createElement("span", null, JSON.stringify(usePilotFormInitialValues(":fixture-A:"))); }
    const fixture = fakeFormDocument(); vi.stubGlobal("document", fixture.doc);
    expect(typeof window).toBe("undefined");
    expect(renderProbe(path, createElement(Probe), seedPath)).toContain(JSON.stringify(emptyFormValues).replace(/"/g, "&quot;"));
    expect(fixture.getElementById).not.toHaveBeenCalled();
  });
});

describe("Node provider ancestry, deterministic first render and deny-all transport (not DOM hydration)", () => {
  it("creates isolated request QueryClients retaining five/ten-minute freshness", () => {
    const a = createServerQueryClient(); const b = createServerQueryClient();
    expect(a).not.toBe(b);
    expect(a.getDefaultOptions().queries?.staleTime).toBe(5 * 60 * 1000);
    expect(a.getDefaultOptions().queries?.gcTime).toBe(10 * 60 * 1000);
    a.setQueryData(queryKey("gallery.list"), [gallery]);
    expect(b.getQueryData(queryKey("gallery.list"))).toBeUndefined(); a.clear(); b.clear();
  });
  it("retains Helmet → tRPC → QueryClient → HydrationBoundary → Router → Pilot context ancestry", () => {
    const qc = createServerQueryClient();
    const element = RenderProviders({ queryClient: qc, trpcClient: createServerTRPCClient(), ssrPath: "/", ssrSearch: "raw?second", children: createElement("span", null, "provider unit probe") });
    const names: string[] = []; let cursor: any = element;
    while (cursor?.type) { names.push(typeof cursor.type === "string" ? cursor.type : cursor.type.displayName ?? cursor.type.name ?? "Provider"); cursor = cursor.props.children; }
    expect(names[0]).toMatch(/Helmet/); expect(names[1]).toMatch(/Provider/); expect(names[2]).toBe("QueryClientProvider");
    expect(names[3]).toBe("HydrationBoundary"); expect(names[4]).toBe("Router"); expect(names[5]).toBe("PilotRenderProvider");
    const server = readFileSync(new URL("../client/src/ssr/entry-server.tsx", import.meta.url), "utf8");
    const main = readFileSync(new URL("../client/src/main.tsx", import.meta.url), "utf8");
    expect(server).toContain("RenderProviders"); expect(main).toContain("RenderProviders"); qc.clear();
  });
  it("denies unexpected public/private queries AND mutations without HTTP", async () => {
    const onDenied = vi.fn(); const client = createServerTRPCClient(onDenied);
    await expect((client as any).gallery.list.query()).rejects.toThrow(/denied/i);
    await expect((client as any).auth.me.query()).rejects.toThrow(/denied/i);
    await expect((client as any).contact.submit.mutate({ name: "INERT_DO_NOT_SEND" })).rejects.toThrow(/denied/i);
    expect(onDenied).toHaveBeenCalledTimes(3);
  });
  it("uses request year and Europe/London first date only on the exact seeded pilot", () => {
    function Probe() {
      const context = usePilotRenderContext(); const format = usePilotDateFormatter(); const year = usePilotYear();
      return createElement("span", null, JSON.stringify({ id: context.synchronousPilotId, adopts: context.adoptsServerSchema, deterministic: context.deterministicDates, year, date: format("2026-07-01T23:30:00Z", { day: "numeric", month: "long", year: "numeric" }) }));
    }
    const html = renderProbe("/",createElement(Probe));
    expect(html).toContain("P0001"); expect(html).toContain("2042"); expect(html).toContain("2 July 2026");
    const other = renderProbe("/services/intumescent-painting", createElement(Probe), "/");
    expect(other).not.toContain("P0001"); expect(other).not.toContain("2042"); expect(other).toContain("2026");
    expect(renderProbe("/",createElement(Probe),null)).not.toContain("P0001");
  });
});

describe("Node preload readiness and request-local substitution (unit probes, not fake pages)", () => {
  it("deduplicates code/promise but never activates an already-prepared wrapper on another pilot", async () => {
    const Component = () => createElement("span", null, "wrapper unit probe");
    const loader = vi.fn().mockResolvedValue({ default: Component });
    const Wrapped = preloadable(loader, "P0001");
    await Promise.all([Wrapped.preload(), Wrapped.preload()]); expect(loader).toHaveBeenCalledTimes(1);
    expect(renderProbe("/",createElement(Wrapped))).toContain("wrapper unit probe");
    const other = renderProbe("/services/structural-steel-frames",createElement(Suspense,{fallback:createElement("span",null,"legacy lazy boundary")},createElement(Wrapped)));
    expect(other).toContain("legacy lazy boundary"); expect(other).not.toContain("wrapper unit probe");
  });
  it("throws on an unprepared selected pilot instead of inventing primary content", () => {
    const loader = vi.fn().mockResolvedValue({ default: () => createElement("span",null,"not prepared") });
    const Wrapped = preloadable(loader,"P0001");
    expect(() => renderProbe("/",createElement(Wrapped))).toThrow(/not prepared/i); expect(loader).not.toHaveBeenCalled();
  });
  it("retries a failed code preparation and thereafter caches only the successful code", async () => {
    const Component = () => createElement("span",null,"retry success");
    const loader = vi.fn().mockRejectedValueOnce(new Error("fixture import failed")).mockResolvedValue({default:Component});
    const Wrapped = preloadable(loader,"P0001");
    await expect(Wrapped.preload()).rejects.toThrow("fixture import failed");
    await Wrapped.preload(); await Wrapped.preload(); expect(loader).toHaveBeenCalledTimes(2);
    expect(renderProbe("/",createElement(Wrapped))).toContain("retry success");
  });
});

// Parent confirmed source coherence. Every real-App test is active by default,
// using actual Vite transforms/deny transport, not HTTP/DOM/browser acceptance.
describe("offline real-App four-page SSR acceptance", () => {
  it.each(pilots)("renders maintained %s primary content + native form without fallback", async (path, needle) => {
    const clear = vi.spyOn(QueryClient.prototype, "clear");
    const result = await renderPilot(path + "?dup=one&dup=two&plus=a+b?tail=%ZZ&gclid=INERT_CLICK", seeds(path), metadata(path));
    const escapedNeedle = needle.replace(/&/g,"&amp;").replace(/'/g,"&#x27;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    expect(result.html).toContain(escapedNeedle); expect(result.html).toMatch(/<h1\b/); expect(result.html).toMatch(/<form\b/);
    expect(result.html).toMatch(/href="\/services"/); expect(result.html).not.toMatch(/<!--\$(?:!|\?)-->|data-msg=|data-dgst=/);
    if (path === articlePath) { expect(result.html).toContain("Offline public fixture body."); expect(result.html).toMatch(/<article\b/); }
    expect(validateRenderingPilotBoot(result.boot, path)).not.toBeNull(); expect(JSON.stringify(result.boot)).not.toContain("INERT_CLICK");
    expect(clear).toHaveBeenCalled();
  });
  it.each(pilots)("keeps all five maintained %s text controls empty and private in server HTML/boot", async (path) => {
    expect(typeof window).toBe("undefined"); expect(typeof document).toBe("undefined");
    const result = await renderPilot(path, seeds(path), metadata(path));
    const boot = JSON.stringify(result.boot);
    for (const value of Object.values(syntheticFormValues)) {
      expect(result.html).not.toContain(value); expect(boot).not.toContain(value);
    }
    expect(result.html + boot).not.toContain("INERT_FORM_");
    for (const field of ["name", "phone", "email", "postcode"] as const) {
      const inputs = result.html.match(new RegExp(`<input\\b[^>]*\\bid="[^"]+-${field}"[^>]*>`, "g")) ?? [];
      expect(inputs.length).toBeGreaterThan(0);
      for (const input of inputs) expect(input).toMatch(/\bvalue=""/);
    }
    const messages = result.html.match(/<textarea\b[^>]*\bid="[^"]+-message"[^>]*>[\s\S]*?<\/textarea>/g) ?? [];
    expect(messages.length).toBeGreaterThan(0);
    for (const textarea of messages) expect(textarea).toMatch(/><\/textarea>$/);
    expect(validateRenderingPilotBoot(result.boot, path)).not.toBeNull();
  });
  it("isolates concurrent actual article renders and rejects aborted/invalid seed requests", async () => {
    const [a,b] = await Promise.all([renderPilot(articlePath, seeds(articlePath,"REQUEST_A"), metadata(articlePath)),renderPilot(articlePath,seeds(articlePath,"REQUEST_B"),metadata(articlePath))]);
    expect(a.html).toContain("REQUEST_A"); expect(a.html).not.toContain("REQUEST_B");
    expect(b.html).toContain("REQUEST_B"); expect(b.html).not.toContain("REQUEST_A");
    expect(JSON.stringify(a.boot)).not.toContain("REQUEST_B"); expect(JSON.stringify(b.boot)).not.toContain("REQUEST_A");
    const aborted = new AbortController(); aborted.abort();
    await expect(renderPilot(articlePath,seeds(articlePath),metadata(articlePath),aborted.signal)).rejects.toThrow();
    await expect(renderPilot("/services/intumescent-painting",[],metadata("/services/intumescent-painting"))).rejects.toThrow();
    await expect(renderPilot("/",[],metadata("/"))).rejects.toThrow();
  });
});
