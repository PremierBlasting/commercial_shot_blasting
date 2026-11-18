import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createServer, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import captured from "./fixtures/task10ApprovalBaseline.json";
import { normalizeTask10Source } from "./task10SourceScopeGuard";
import { CANONICAL_SERVICE_SLUGS, LEGACY_SERVICE_REDIRECTS, LEGACY_ROOT_SERVICE_REDIRECTS } from "../shared/serviceSeoCatalog";
import { escapeRouteMetadata, getRouteMetadataTags, resolveRouteMetadata, serializeRouteMetadataBoot, serializeRouteMetadataHead, type RouteMetadataRecord } from "../shared/routeMetadata";
import { validateRenderingPilotBoot, type PilotSeed } from "../shared/renderingPilot";

const lookup = vi.hoisted(() => vi.fn(() => { throw new Error("TEST DENIED live database"); }));
vi.mock("./db", () => ({ getPublishedBlogPostForHtml: lookup }));
import { injectMetaTags } from "./metaTags";

type ApprovedRecord = {
  page_id: string; path: string; approved_title: string; approved_description: string;
  current_complete_record: RouteMetadataRecord;
};
const fixture = captured as unknown as {
  baselineCommit: string; approvedRecords: ApprovedRecord[];
  unchangedRecordMap: Record<string, RouteMetadataRecord>; localRecordMap: Record<string, RouteMetadataRecord>;
  localRecordHashes: Record<string, string>; canonicalSlugs: string[];
  offerCatalogBaseline: { "@type": string; name: string; itemListElement: unknown[] };
  baselineHashes: Record<string, string>;
};
const root = fileURLToPath(new URL("../", import.meta.url));
const source = (file: string) => readFileSync(path.join(root, file), "utf8");
const digest = (contents: string) => createHash("sha256").update(contents).digest("hex");
const query = "?utm_source=task10&utm_source=&utm_medium=a%2Bb&gclid=%2B&gclid=&gbraid=INERT_G&wbraid=INERT_W&dup=one&dup=two&empty=&functional=%26%3D#details";
const base = '<!doctype html><html><head><title>Old</title><meta name="robots" content="index, follow"><meta property="robots" content="noindex"><meta property="twitter:title" content="Old"><link rel="canonical" href="https://old.invalid"><script type="application/ld+json">{"existingSchema":true}</script><script id="retained-inert-script" type="application/json">{"inert":true}</script><link rel="preload" as="image" href="/existing.webp"><link rel="modulepreload" href="/existing.js"></head><body><!--SSR_CONTENT--><div id="root"></div></body></html>';
const head = (html: string) => html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
function schemas(html: string): any[] {
  return Array.from(html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g), match => JSON.parse(match[1]));
}
const exactApproval = [
  ["P0047", "/services/factory-cladding", "Factory Cladding Shot Blasting | Commercial Shot Blasting", "Surface preparation for factory and warehouse cladding. Discuss panel condition, failed coatings, access and the next coating stage to agree a suitable approach with Commercial Shot Blasting."],
  ["P0049", "/services/floor-preparation", "Floor Shot Blasting Contractors | Commercial Shot Blasting", "Commercial floor shot blasting and concrete floor preparation for warehouses and industrial areas. Discuss floor condition, access and the next flooring or coating stage."],
  ["P0052", "/services/marine-cx-surface-preparation", "Marine CX Surface Preparation | Commercial Shot Blasting", "Blast preparation for large steelwork and enclosures entering specified Marine CX coating systems. Review access, preparation criteria, checks and handover with your project team."],
  ["P0919", "/steel-fabrication-surface-preparation", "Steel Fabrication Surface Preparation Planning | Commercial Shot Blasting", "Plan steel fabrication surface preparation with component details, condition, access and coating handover for a practical Site Visit discussion."],
  ["P0914", "/industrial-steelwork-restoration", "Industrial Steelwork Restoration Planning | Commercial Shot Blasting", "Plan industrial steelwork restoration across pipework, containers, access steelwork, bridge components and plant. Share condition, access and coating-handover details for a practical route discussion."],
  ["P0913", "/factory-cladding-restoration", "Factory Cladding Restoration Planning | Commercial Shot Blasting", "Plan factory and warehouse cladding restoration around panel condition, access, operations and the next coating stage. Share practical details for a Site Visit."],
  ["P0909", "/agricultural-steelwork-grain-store-preparation", "Grain Store Steelwork Preparation Planning | Commercial Shot Blasting", "Plan preparation for grain-store and agricultural building steelwork. Review condition, access, seasonal constraints and coating handover for an assessed scope."],
  ["P0912", "/container-restoration-storage-steelwork", "Container Restoration Planning | Commercial Shot Blasting", "Plan container restoration and recoating around quantities, condition, handling and access. Review scope inputs and the dedicated container shot blasting service."],
  ["P0916", "/mobile-on-site-shot-blasting", "Mobile & On-Site Shot Blasting | Commercial Shot Blasting", "Plan mobile and on-site shot blasting around the asset, working area, access, containment and coating handover. Send your postcode and project details for review."],
  ["P0915", "/intumescent-paint-for-steel", "Steel Preparation for Intumescent Paint | Commercial Shot Blasting", "Plan steel preparation and handover before intumescent fire-protective coating. Share steelwork condition, access, specification and sequencing for a practical project review."],
  ["P0910", "/commercial-blasting-specification-checklist", "Commercial Blasting Specification Checklist | Commercial Shot Blasting", "Use a commercial blasting checklist to prepare asset details, condition photos, access, protection requirements and coating handover before a project discussion."],
] as const;
let network: ReturnType<typeof vi.fn>;
beforeEach(() => {
  lookup.mockClear();
  network = vi.fn(() => { throw new Error("TEST DENIED live APIs, Google events, leads and storage"); });
  vi.stubGlobal("fetch", network);
});
afterEach(() => { expect(network).not.toHaveBeenCalled(); expect(lookup).not.toHaveBeenCalled(); vi.unstubAllGlobals(); });

describe("Task10 exact eleven approved complete metadata records", () => {
  it("pins the public fixture to the actual approval, 52-route manifest and original source checkpoint", () => {
    expect(fixture.baselineCommit).toBe("1154c00cde8ba2c784ea32f306e0c8eaeec1c16f");
    expect(fixture.approvedRecords.map(record => [record.page_id, record.path, record.approved_title, record.approved_description])).toEqual(exactApproval);
    expect(fixture.approvedRecords).toHaveLength(11);
    expect(Object.keys(fixture.unchangedRecordMap)).toHaveLength(41);
    expect(new Set([...fixture.approvedRecords.map(record => record.path), ...Object.keys(fixture.unchangedRecordMap)]).size).toBe(52);
  });
  it.each(fixture.approvedRecords)("$page_id $path changes only the approved title/description and matching social text", approved => {
    const current = resolveRouteMetadata(approved.path);
    const expected = { ...approved.current_complete_record,
      title: approved.approved_title, description: approved.approved_description,
      ogTitle: approved.approved_title, twitterTitle: approved.approved_title,
      ogDescription: approved.approved_description, twitterDescription: approved.approved_description,
    };
    expect(current).toEqual(expected);
    for (const title of [current.title, current.ogTitle, current.twitterTitle]) {
      expect(title).toBe(approved.approved_title);
      expect(title!.match(/Commercial Shot Blasting/g)).toHaveLength(1);
    }
    for (const description of [current.description, current.ogDescription, current.twitterDescription]) expect(description).toBe(approved.approved_description);
    for (const original of [approved.path + query, approved.path + "/" + query, approved.path.replace(/-/g, "%2D") + query]) {
      const saved = original;
      expect(resolveRouteMetadata(original)).toEqual(expected);
      expect(serializeRouteMetadataHead(resolveRouteMetadata(original))).toBe(serializeRouteMetadataHead(current));
      expect(serializeRouteMetadataBoot(resolveRouteMetadata(original))).toBe(serializeRouteMetadataBoot(current));
      expect(original).toBe(saved);
    }
    expect(resolveRouteMetadata(approved.path, { title: "Outgoing stale title", description: "Outgoing stale description" })).toEqual(expected);
  });
  it.each(fixture.approvedRecords)("$path composes exact singleton clean/query heads while retaining schemas, scripts and preloads", async approved => {
    const cleanHtml = await injectMetaTags(base, approved.path);
    const queryUrl = approved.path + query;
    const saved = queryUrl;
    const queryHtml = await injectMetaTags(base, queryUrl);
    const clean = head(cleanHtml);
    expect(head(queryHtml)).toBe(clean); expect(queryUrl).toBe(saved);
    const metadata = resolveRouteMetadata(approved.path);
    expect(clean).toContain(serializeRouteMetadataHead(metadata));
    expect(clean).toContain(serializeRouteMetadataBoot(metadata));
    expect(clean.match(/<title\b[^>]*>[\s\S]*?<\/title>/g)).toEqual([`<title>${escapeRouteMetadata(approved.approved_title)}</title>`]);
    expect(clean.match(/<link\b[^>]*rel="canonical"[^>]*>/g)).toEqual([`<link rel="canonical" href="${metadata.canonical}" />`]);
    expect(clean.match(/<meta\b[^>]*name="robots"[^>]*>/g)).toEqual([`<meta name="robots" content="${metadata.robots}" />`]);
    for (const tag of getRouteMetadataTags(metadata)) {
      const matches = (clean.match(/<meta\b[^>]*>/g) ?? []).filter(value => value.includes(`${tag.attribute}="${tag.key}"`));
      expect(matches, tag.key).toEqual([`<meta ${tag.attribute}="${tag.key}" content="${escapeRouteMetadata(tag.value)}" />`]);
    }
    expect(clean).not.toContain('property="twitter:title"');
    expect(clean).not.toContain('property="robots"');
    for (const retained of ['{"existingSchema":true}', '<script id="retained-inert-script" type="application/json">{"inert":true}</script>', '<link rel="preload" as="image" href="/existing.webp">', '<link rel="modulepreload" href="/existing.js">']) expect(clean).toContain(retained);
    expect(schemas(cleanHtml)).toContainEqual({ existingSchema: true });
    expect(clean).not.toMatch(/task10|INERT_G|INERT_W|gclid|gbraid|wbraid|functional/);
  });
});

describe("Task10 every non-approved record stays held, with the sole Services alt exception", () => {
  it.each(Object.entries(fixture.unchangedRecordMap))("preserves the entire complete record at %s", (route, baseline) => {
    const expected = route === "/services" ? { ...baseline,
      twitterImageAlt: baseline.twitterImageAlt!.replace("18 commercial and industrial services", "commercial and industrial services"),
    } : baseline;
    if (route === "/services") expect(baseline.twitterImageAlt).toContain("18 commercial and industrial services");
    expect(resolveRouteMetadata(route)).toEqual(expected);
    expect(resolveRouteMetadata(route + query)).toEqual(expected);
  });
  it("keeps root/broad/service first-wave metadata on hold and root specialists distinct from fallback/aliases", () => {
    for (const route of ["/", "/services", "/commercial-shot-blasting-sandblasting", "/services/car-park-paint-removal", "/services/intumescent-painting", "/services/structural-steel-frames", "/steel-fabrications", "/external-staircases"]) {
      const current = resolveRouteMetadata(route);
      expect(current.title, route).toBe(fixture.unchangedRecordMap[route].title);
      expect(current.description, route).toBe(fixture.unchangedRecordMap[route].description);
      expect(current.state, route).toBe("ready");
      expect(current.canonical, route).toBe(`https://commercialshotblasting.co.uk${route}`);
    }
    expect(resolveRouteMetadata("/steel-fabrications").title).not.toBe(resolveRouteMetadata("/external-staircases").title);
  });
  it.each(Object.entries(fixture.localRecordMap))("keeps the full baseline sample at %s, not a local label rollout", async (route, baseline) => {
    expect(resolveRouteMetadata(route)).toEqual(baseline);
    expect(resolveRouteMetadata(route + query)).toEqual(baseline);
    expect(head(await injectMetaTags(base, route))).toContain(serializeRouteMetadataHead(baseline));
  });
  it("retains all 765 complete deployed local-record hashes including the Stoke alias", () => {
    expect(Object.keys(fixture.localRecordHashes)).toHaveLength(765);
    for (const [route, hash] of Object.entries(fixture.localRecordHashes)) expect(digest(JSON.stringify(resolveRouteMetadata(route))), route).toBe(hash);
  });
});

describe("Task10 source-only approved semantic tags and exact historical byte guards", () => {
  it("keeps Footer, head lifecycle/history startup, canonical catalogue and pilot paths byte-for-byte unchanged", () => {
    const protectedOwners = {
      "client/src/components/Footer.tsx": "1c9e0d81ad12ab25cd284117487962c6c488cd2dabdf91eada8bbec76ab748d6",
      "client/src/components/RouteMetadataOwner.tsx": "c55fdb4851df5c784d0c01548bfdf6ad06d709d00f283df9eaa0df6225c22a21",
      "client/src/main.tsx": "59b024b04044abd2c95b3cfde915639b2c06828696e5bdc9dc2379990dee84dc",
      "shared/serviceSeoCatalog.ts": "26a8fb077f5409317b2425d8f15ec3aa1c97e523e53be04d8f51079605c26a4f",
      "shared/renderingPilot.ts": "01083786c41f92f9482a096c915d98c9a369363eaca4519e9ecbe70a0b09e7ba",
    };
    for (const [file, hash] of Object.entries(protectedOwners)) expect(digest(source(file)), file).toBe(hash);
  });
  it.each(["client/src/components/Header.tsx", "shared/routeMetadata.ts"])("proves original source bytes after authorized normalization at %s and rejects nearby unauthorized edits", file => {
    const current = source(file);
    const restored = normalizeTask10Source(file, current);
    expect(digest(restored)).toBe(fixture.baselineHashes[file]);
    expect(normalizeTask10Source(file, restored)).toBe(restored);
    for (const poisoned of [current + "\n// unauthorized source change\n", current.replace(/\n/, "\n "), current.replace("Commercial Shot Blasting", "Unapproved Brand")]) {
      expect(poisoned).not.toBe(current);
      expect(() => normalizeTask10Source(file, poisoned)).toThrow();
    }
  });
  it("changes Header brand H1 to P with its exact text, classes and font, preserving the entire remaining Header", () => {
    const header = source("client/src/components/Header.tsx");
    expect(header).toContain('<p className="text-xl font-bold" style={{ fontFamily: "\'Playfair Display\', serif" }}>Commercial Shot Blasting</p>');
    expect(header).not.toMatch(/<h1\b/);
    expect(header).toContain("View All Services →");
    expect(header).not.toContain("View All 19 Services →");
    expect(digest(normalizeTask10Source("client/src/components/Header.tsx", header))).toBe("d1230152b1e6acca8cf503297be81d897761b9169a183e3af5356dda059d8fe6");
  });
  it("changes only the Get In Touch H3/H2 tag pair, preserving form styles, IDs, flows and confirmation H3", () => {
    const form = source("client/src/components/LeadForm.tsx");
    const approved = '<h2 className={`${isHero ? "text-xl" : "text-lg"} font-bold ${headingColor}`}>Get In Touch</h2>';
    const baseline = '<h3 className={`${isHero ? "text-xl" : "text-lg"} font-bold ${headingColor}`}>Get In Touch</h3>';
    expect(form.split(approved)).toHaveLength(2); expect(form).not.toContain(baseline);
    expect(form).toContain('<h3 className={`mb-2 text-lg font-bold ${headingColor}`}>Thank you — we&apos;ve received your enquiry.</h3>');
    expect(digest(form.replace(approved, baseline))).toBe(fixture.baselineHashes["client/src/components/LeadForm.tsx"]);
  });
  it("retains exact Services source apart from the five approved count fragments, with all 20 visual cards unchanged", () => {
    const services = source("client/src/pages/Services.tsx");
    const deltas = [
      ["We deliver all 18 shot blasting services", "We deliver shot blasting services"],
      ['{ label: "18 Services", sub: "Full range available" }', '{ label: "Services", sub: "Full range available" }'],
      ['{/* Full Services Image Grid */}\n      <section className="py-16 bg-white">\n        <div className="container">\n          <div className="text-center mb-10">\n            <p className="text-[#2C5F7F] font-medium mb-2">All 19 Services</p>', '{/* Full Services Image Grid */}\n      <section className="py-16 bg-white">\n        <div className="container">\n          <div className="text-center mb-10">\n            <p className="text-[#2C5F7F] font-medium mb-2">All Services</p>'],
      ["18 Services, One Provider", "Services, One Provider"],
      ["We offer 18 specialist shot blasting services", "We offer specialist shot blasting services"],
    ];
    let restored = services;
    for (const [before, after] of deltas) {
      expect(restored.split(after), after).toHaveLength(2); expect(restored, before).not.toContain(before);
      restored = restored.replace(after, before);
    }
    expect(digest(restored)).toBe(fixture.baselineHashes["client/src/pages/Services.tsx"]);
    const cards = services.slice(services.indexOf("const allServices = ["), services.indexOf("const commercialResourceClusters = ["));
    expect(digest(cards)).toBe("b4345171b46cf0a1bbeacfa7d982f9760c95b8ccc02ebc8d6dc6007d1bd8f040");
    const ids = Array.from(cards.matchAll(/id: "([^"]+)"/g), match => match[1]);
    expect(ids).toHaveLength(20); expect(new Set(ids).size).toBe(20);
    expect(ids.filter(id => (CANONICAL_SERVICE_SLUGS as readonly string[]).includes(id))).toHaveLength(18);
    expect(ids.filter(id => !(CANONICAL_SERVICE_SLUGS as readonly string[]).includes(id))).toEqual(["steel-fabrications", "external-staircases"]);
  });
});

describe("Task10 canonical Services inventory remains separate from curated offers and visual cards", () => {
  it("emits exactly 28 canonical Service URLs, contiguous positions and unchanged schema/provider structure without root specialists or aliases", async () => {
    expect(CANONICAL_SERVICE_SLUGS).toHaveLength(28);
    expect([...CANONICAL_SERVICE_SLUGS]).toEqual(fixture.canonicalSlugs);
    const html = await injectMetaTags(base, "/services" + query);
    const graph = schemas(html);
    const lists = graph.filter(item => item["@type"] === "ItemList" && item["@id"] === "https://commercialshotblasting.co.uk/services#itemlist");
    expect(lists).toHaveLength(1);
    const list = lists[0];
    expect(Object.keys(list).sort()).toEqual(["@context", "@id", "@type", "description", "itemListElement", "name", "numberOfItems", "url"]);
    expect(list).toMatchObject({ "@context": "https://schema.org", "@type": "ItemList", "@id": "https://commercialshotblasting.co.uk/services#itemlist", name: "Shot Blasting Services", description: "Professional mobile shot blasting services for commercial and industrial applications nationwide.", url: "https://commercialshotblasting.co.uk/services", numberOfItems: 28 });
    expect(list.itemListElement).toHaveLength(28);
    const urls = CANONICAL_SERVICE_SLUGS.map(slug => `https://commercialshotblasting.co.uk/services/${slug}`);
    expect(list.itemListElement.map((entry: any) => entry.url)).toEqual(urls);
    expect(new Set(list.itemListElement.map((entry: any) => entry.url)).size).toBe(28);
    for (const [index, entry] of list.itemListElement.entries()) {
      expect(Object.keys(entry).sort()).toEqual(["@type", "item", "name", "position", "url"]);
      expect(entry).toMatchObject({ "@type": "ListItem", position: index + 1, url: urls[index] });
      expect(entry.name).toEqual(expect.any(String)); expect(entry.name.length).toBeGreaterThan(0);
      expect(entry.item).toEqual({ "@type": "Service", name: entry.name, url: urls[index], provider: { "@type": "LocalBusiness", name: "Commercial Shot Blasting", telephone: "07970 566409", url: "https://commercialshotblasting.co.uk" } });
      const existingOffer = (fixture.offerCatalogBaseline.itemListElement as any[]).find(offer => offer.itemOffered.url === entry.url);
      if (existingOffer) expect(entry.name).toBe(existingOffer.itemOffered.name);
    }
    for (const excluded of ["https://commercialshotblasting.co.uk/steel-fabrications", "https://commercialshotblasting.co.uk/external-staircases", ...Object.keys(LEGACY_SERVICE_REDIRECTS).map(slug => `https://commercialshotblasting.co.uk/services/${slug}`), ...Object.keys(LEGACY_ROOT_SERVICE_REDIRECTS).map(slug => `https://commercialshotblasting.co.uk${slug}`)]) expect(urls).not.toContain(excluded);
    const organization = graph.filter(item => item["@type"] === "Organization" && item["@id"] === "https://commercialshotblasting.co.uk/#organization");
    expect(organization).toHaveLength(1);
    expect(fixture.offerCatalogBaseline.itemListElement).toHaveLength(18);
    expect(organization[0].hasOfferCatalog).toEqual(fixture.offerCatalogBaseline);
    expect(organization[0]).toMatchObject({ name: "Commercial Shot Blasting", telephone: "07970 566409", email: "info@commercialshotblasting.co.uk", areaServed: { "@type": "Country", name: "United Kingdom" } });
    const webPage = graph.find(item => item["@id"] === "https://commercialshotblasting.co.uk/services#webpage");
    expect(webPage.description).toBe("Browse professional shot blasting services offered by Commercial Shot Blasting nationwide — from structural steel and containers to floor preparation and powder coating.");
  });
});

// Reuse the existing renderingHydration real-App Vite graph, aliases, inert
// middleware server and private-backend deny rule. No new production paths,
// dependencies, copied pages or fake DOM/hydration claims are introduced.
let vite: ViteDevServer;
let renderPilot: typeof import("../client/src/ssr/entry-server").renderPilot;
beforeAll(async () => {
  vite = await createServer({
    configFile: false, root: path.join(root, "client"), envDir: root,
    cacheDir: "/home/ubuntu/csb-task10-implementation-2026-11-18/test-vite-cache",
    appType: "custom", logLevel: "error", publicDir: false,
    plugins: [{
      name: "task10-deny-private-backend-imports", enforce: "pre",
      resolveId(source, importer) {
        if (source === "/@task08/graph.ts") return "\0task08-ssr-graph";
        const resolved = source.startsWith(".") && importer ? path.resolve(path.dirname(importer), source) : source;
        if (/\/server\/(?:db|routers|storage|_core\/(?:context|sdk))(?:\.[cm]?[jt]s)?$/.test(resolved)) throw new Error("TEST DENIED renderer private backend import: " + source);
      },
      load(id) { if (id === "\0task08-ssr-graph") return "export {renderPilot} from '/src/ssr/entry-server.tsx';"; },
    }, react()],
    resolve: { alias: { "@": path.join(root, "client/src"), "@shared": path.join(root, "shared"), "@assets": path.join(root, "attached_assets") } },
    server: { middlewareMode: true, hmr: false, watch: null },
    ssr: { noExternal: ["react-helmet-async"] }, optimizeDeps: { noDiscovery: true, include: [] },
  });
  ({ renderPilot } = await vite.ssrLoadModule("/@task08/graph.ts"));
}, 60000);
afterAll(async () => { await vite?.close(); });
const date = new Date("2026-01-01T23:30:00Z");
const articleSlug = "factory-warehouse-cladding-restoration";
const article = { id: 8, slug: articleSlug, title: "Factory & Warehouse Cladding Restoration", excerpt: "Offline public fixture excerpt", content: "<h2>Offline public article evidence</h2><p>Offline public fixture body.</p>", featuredImage: "/offline-article.webp", author: "Commercial Shot Blasting", category: "Restoration Projects", tags: '["steel"]', faq: null, metaDescription: "Public offline fixture description", isPublished: true, publishedAt: date, createdAt: date, updatedAt: date };
function seeds(route: string): PilotSeed[] {
  const queryKey = (name: string, input?: object): unknown[] => [name.split("."), { ...(input === undefined ? {} : { input }), type: "query" }];
  if (route === "/counties/hampshire") return [];
  if (route.startsWith("/blog/")) return [{ queryKey: queryKey("blog.getBySlug", { slug: articleSlug }), data: article }, { queryKey: queryKey("blog.getRelated", { slug: articleSlug, category: article.category }), data: [] }];
  const result = [{ queryKey: queryKey("gallery.list"), data: [] }, { queryKey: queryKey("testimonials.list"), data: [] }];
  if (route === "/") result.push({ queryKey: queryKey("blog.list"), data: [] });
  return result;
}
describe("Task10 Node-only real maintained SSR semantics on the existing four pilots (not browser hydration)", () => {
  it.each(["/", "/services/structural-steel-frames", "/counties/hampshire", "/blog/" + articleSlug])("keeps %s primary H1, brand P, enquiry H2 styles, native form and private boot", async route => {
    const metadata = resolveRouteMetadata(route, route.startsWith("/blog/") ? { state: "published", title: article.title, description: article.metaDescription, image: article.featuredImage, author: article.author, section: article.category, publishedAt: date, modifiedAt: date } : {});
    const result = await renderPilot(route + query, seeds(route), metadata);
    expect(result.html).toMatch(/<p class="text-xl font-bold" style="font-family:&#x27;Playfair Display&#x27;, serif">Commercial Shot Blasting<\/p>/);
    const h1s = result.html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/g) ?? [];
    expect(h1s).toHaveLength(1); expect(h1s[0]).not.toMatch(/>Commercial Shot Blasting<\/h1>/);
    const enquiries = result.html.match(/<h2\b[^>]*>Get In Touch<\/h2>/g) ?? [];
    expect(enquiries.length).toBeGreaterThan(0);
    for (const enquiry of enquiries) expect(enquiry).toMatch(/class="(?:text-xl|text-lg) font-bold (?:text-white|text-\[#1a3a52\])"/);
    expect(result.html).not.toMatch(/<h3\b[^>]*>Get In Touch<\/h3>/);
    expect(result.html).not.toMatch(/<!--\$(?:!|\?)-->|data-msg=|data-dgst=/);
    expect(result.html).toMatch(/<form\b/);
    for (const field of ["name", "phone", "email", "postcode"]) {
      const controls = result.html.match(new RegExp(`<input\\b[^>]*\\bid="[^"]+-${field}"[^>]*>`, "g")) ?? [];
      expect(controls.length, field).toBeGreaterThan(0);
      for (const control of controls) expect(control).toContain('value=""');
    }
    expect(result.html).toMatch(/<textarea\b[^>]*id="[^"]+-message"[^>]*><\/textarea>/);
    expect(validateRenderingPilotBoot(result.boot, route)).not.toBeNull();
    expect(JSON.stringify(result.boot)).not.toMatch(/INERT_G|INERT_W|gclid|gbraid|wbraid|utm_source/);
    if (route === "/counties/hampshire") expect(h1s[0].replace(/<!-- -->/g, "")).toContain("Shot Blasting Services in Hampshire");
    if (route === "/services/structural-steel-frames") expect(h1s[0]).toContain("Structural Steel Frames");
    if (route.startsWith("/blog/")) expect(h1s[0]).toContain("Factory &amp; Warehouse Cladding Restoration");
  }, 60000);
});
