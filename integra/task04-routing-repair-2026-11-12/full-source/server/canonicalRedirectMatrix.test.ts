import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import express from "express";
import { createServer, request, type Server } from "node:http";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";
import { countyData } from "../client/src/data/countyData";
import { locationSlugIndex } from "../client/src/data/locationSlugIndex";
import { CANONICAL_SERVICE_SLUGS, LEGACY_ROOT_SERVICE_REDIRECTS, LEGACY_SERVICE_REDIRECTS } from "../shared/serviceSeoCatalog";
import { getCanonicalServiceAreaRedirect, getKnownPageRedirect, getMaintainedStaticPaths, getSoft404PathResolution } from "./seoUrlNormalisation";

const root = resolve(import.meta.dirname, "..");
const appSource = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const browserAliases = new Set(["/gallery", "/free-site-survey", "/case-studies/structural-steel"]);
// Test-only source parity check: production uses an explicit list, never filesystem parsing.
const literalAppPaths = [...appSource.matchAll(/<Route\s+path=(?:\{"([^"}]+)"\}|"([^"]+)")/g)]
  .map((match) => match[1] ?? match[2])
  .filter((path) => !path.includes(":") && path !== "/404" && !browserAliases.has(path));
const industrySlugs = ["manufacturing", "construction", "agriculture", "aerospace", "marine", "heritage-restoration", "retail", "transport-logistics"];
const currentOwners = new Set([
  ...literalAppPaths,
  ...CANONICAL_SERVICE_SLUGS.map((slug) => `/services/${slug}`),
  ...Object.keys(countyData).map((slug) => `/counties/${slug}`),
  ...Object.keys(locationSlugIndex).filter((slug) => slug !== "stoke").map((slug) => `/service-areas/${slug}`),
]);
const query = "?utm_source=adwords&utm_medium=ppc&utm_campaign=csb-test&utm_id=123&gclid=mock%2Bclick&gbraid=mock%2Fbraid&wbraid=mock%3Dbraid&hsa_acc=123&ref=a%20b&device=m&x=one&x=two&empty=&literal_plus=a+b&escaped=%252F&encoded_key%2B=encoded%3Dvalue";
const rootAliases: Record<string, string> = {
  "/preparation-and-cleanup": "/preparation-cleanup",
  "/prep-and-cleanup": "/preparation-cleanup",
  "/gallery": "/our-work",
  "/free-site-survey": "/site-survey",
  "/case-studies/structural-steel": "/case-studies/iss-property-former-bakkavor-foods-facility-wigan",
  "/privacy": "/privacy-policy",
  "/gloucestershire": "/counties/gloucestershire",
  "/hertfordshire": "/counties/hertfordshire",
  "/staffordshire": "/counties/staffordshire",
  "/counties/county-durham": "/counties/durham",
  "/industries/automotive": "/services/commercial-vehicles",
  ...LEGACY_ROOT_SERVICE_REDIRECTS,
};
const retiredTownOwners: Record<string, string> = {
  "west-midlands": "/counties/west-midlands",
  andover: "/counties/hampshire",
  alnwick: "/counties/northumberland",
  kendal: "/counties/cumbria",
  windsor: "/counties/berkshire",
  newbury: "/counties/berkshire",
  leyland: "/counties/lancashire",
  fareham: "/counties/hampshire",
};

function assertFinalRedirect(source: string, owner: string, suffix = query) {
  const destination = getKnownPageRedirect(source, source + suffix);
  expect(destination, source).toBe(owner + suffix);
  expect(currentOwners.has(owner), `${source} has a maintained successor`).toBe(true);
  expect(getKnownPageRedirect(owner, owner + suffix), `${source} has no second hop`).toBeNull();
  expect(getSoft404PathResolution(owner, owner + suffix), `${source} successor is not a scoped error`).toBeNull();
}

describe("Task04 finite canonical redirect graph", () => {
  it("exports exactly the maintained App literal owners, excluding aliases and errors", () => {
    expect([...getMaintainedStaticPaths()].sort()).toEqual([...literalAppPaths].sort());
    expect(new Set(getMaintainedStaticPaths()).size).toBe(getMaintainedStaticPaths().length);
    expect(Object.isFrozen(getMaintainedStaticPaths())).toBe(true);
    for (const excluded of [...browserAliases, "/404", "/index.html", "/prep-and-cleanup", "/preparation-and-cleanup"]) {
      expect(getMaintainedStaticPaths()).not.toContain(excluded);
    }
  });

  it("keeps all current owners direct and normalises only their known slash forms", () => {
    for (const owner of currentOwners) {
      expect(getKnownPageRedirect(owner, owner + query), owner).toBeNull();
      if (owner !== "/") assertFinalRedirect(owner + "/", owner);
    }
  });

  it("resolves all catalogue service aliases, static aliases and retired towns directly", () => {
    const aliases = {
      ...rootAliases,
      ...Object.fromEntries(Object.entries(LEGACY_SERVICE_REDIRECTS).map(([slug, owner]) => [`/services/${slug}`, owner])),
      ...Object.fromEntries(Object.entries(retiredTownOwners).map(([slug, owner]) => [`/service-areas/${slug}`, owner])),
    };
    for (const [source, owner] of Object.entries(aliases)) {
      for (const suffix of ["", "?", query]) {
        assertFinalRedirect(source, owner, suffix);
        assertFinalRedirect(source + "/", owner, suffix);
      }
    }
    // These are established hub successors, not new ranking service destinations.
    expect(getKnownPageRedirect("/services/mobile-shot-blasting/", "/services/mobile-shot-blasting/" + query)).toBe("/services" + query);
  });

  it("checks every town against all recognised legacy patterns, including final Stoke ownership", () => {
    for (const slug of Object.keys(locationSlugIndex)) {
      const owner = `/service-areas/${slug === "stoke" ? "stoke-on-trent" : slug}`;
      for (const source of [`/areas/${slug}`, `/locations/${slug}`, `/service-area/${slug}`, `/service-areas/${slug}.html`, `/service-areas/${slug}/index.html`]) {
        assertFinalRedirect(source, owner);
        assertFinalRedirect(source + "/", owner);
      }
    }
    for (const slug of Object.keys(countyData)) {
      // Preserve existing town precedence when a singular legacy name is also a town.
      const owner = Object.prototype.hasOwnProperty.call(locationSlugIndex, slug)
        ? `/service-areas/${slug === "stoke" ? "stoke-on-trent" : slug}` : `/counties/${slug}`;
      assertFinalRedirect(`/service-area/${slug}/`, owner);
    }
    for (const source of ["/service-areas/stoke", "/service-areas/stoke/"]) {
      expect(getCanonicalServiceAreaRedirect(source, source + query)).toBe("/service-areas/stoke-on-trent" + query);
    }
    for (const source of ["/locations/westward-ho!", "/locations/westward-ho%21/", "/areas/westward-ho!", "/service-areas/westward-ho%21.html"]) {
      assertFinalRedirect(source, "/service-areas/westward-ho");
    }
  });

  it("matches safe percent-encoded known names without inventing routes", () => {
    for (const [source, owner] of [
      ["/%61bout/", "/about"],
      ["/services/%66loor-shot-blasting/", "/services/floor-preparation"],
      ["/counties/%68ampshire/", "/counties/hampshire"],
      ["/service-areas/%73toke/", "/service-areas/stoke-on-trent"],
      ["/locations/%77igan/", "/service-areas/wigan"],
    ]) assertFinalRedirect(source, owner);
  });

  it("leaves unknowns, dynamic details, unsafe segments and non-page endpoints unredirected", () => {
    for (const path of [
      "/missing/", "/404", "/404/", "/index.html", "/index.html/", "/uk/",
      "/blog/published-fixture/", "/blog/no-such-post/", "/glossary/dft/", "/glossary/no-such-term/",
      "/api/trpc/blog.list", "/manus-storage/example/", "/assets/missing.js", "/missing.jpg", "/missing.mp4", "/sitemap.xml",
      "/services/no-such-service/", "/counties/no-such-county/", "/industries/no-such-industry/", "/service-areas/no-such-town/",
      "/about//", "//about", "/about/extra/", "/about?query", "/about#fragment", "/%", "/%C0%AF", "/%252e%252e/about/",
      "/service-areas/blackpool%2fextra/", "/service-areas/%2e%2e/", "/counties/hampshire%5c/", "/locations/%00wigan/",
      ...["constructor", "toString", "__proto__", "hasOwnProperty"].flatMap((key) => ["services", "counties", "industries", "service-areas", "locations"].map((prefix) => `/${prefix}/${key}/`)),
    ]) expect(getKnownPageRedirect(path, path + query), path).toBeNull();
    for (const slug of industrySlugs) assertFinalRedirect(`/industries/${slug}/`, `/industries/${slug}`);
    expect(getKnownPageRedirect("/blog/", "/blog/" + query)).toBe("/blog" + query);
    expect(getKnownPageRedirect("/glossary/", "/glossary/" + query)).toBe("/glossary" + query);
  });

  it("executes the actual browser fallback after render, retaining raw search and fragment", () => {
    const sourceFile = ts.createSourceFile("App.tsx", appSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const fallback = sourceFile.statements.find((node) => ts.isFunctionDeclaration(node) && node.name?.text === "LegacyPageRedirect");
    expect(fallback).toBeDefined();
    const js = ts.transpileModule(fallback!.getText(sourceFile), { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
    for (const destination of ["/our-work", "/site-survey", "/case-studies/iss-property-former-bakkavor-foods-facility-wigan"]) {
      const effects: Array<() => void> = [];
      const replace = vi.fn();
      const component = new Function("useEffect", "window", `${js}; return LegacyPageRedirect;`)(
        (effect: () => void) => effects.push(effect),
        { location: { search: query, hash: "#before-after-comparison%20details", replace } },
      );
      expect(component({ destination })).toBeNull();
      expect(replace).not.toHaveBeenCalled();
      expect(effects).toHaveLength(1);
      effects[0]();
      expect(replace).toHaveBeenCalledTimes(1);
      expect(replace).toHaveBeenCalledWith(destination + query + "#before-after-comparison%20details");
    }
    expect(appSource.match(/<LegacyPageRedirect destination=/g)).toHaveLength(3);
  });
});

type HttpResult = { status: number; location: string | undefined; body: string };
let server: Server;
let port: number;
function send(path: string, method = "GET"): Promise<HttpResult> {
  return new Promise((resolveResponse, reject) => {
    const req = request({ hostname: "127.0.0.1", port, path, method }, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => { body += chunk; });
      response.on("end", () => resolveResponse({ status: response.statusCode!, location: response.headers.location, body }));
    });
    req.on("error", reject);
    req.end();
  });
}
async function boundedMap<T>(items: T[], work: (item: T) => Promise<void>) {
  let next = 0;
  await Promise.all(Array.from({ length: 8 }, async () => {
    while (next < items.length) await work(items[next++]);
  }));
}

beforeAll(async () => {
  const app = express();
  app.use((req, res, next) => {
    const destination = getKnownPageRedirect(req.path, req.originalUrl);
    if (destination) return res.redirect(301, destination);
    next();
  });
  app.use((req, res, next) => {
    const resolution = getSoft404PathResolution(req.path, req.originalUrl);
    if (resolution?.type === "redirect") return res.redirect(301, resolution.destination);
    if (resolution?.type === "not-found") return res.status(404).send("Missing scoped page");
    next();
  });
  // Isolated maintained successor stand-in: no metadata/DB/events/contact modules load.
  app.use((req, res) => currentOwners.has(req.path)
    ? res.status(200).type("text").send(`Maintained owner: ${req.path}`)
    : res.status(404).type("text").send("Missing page"));
  server = createServer(app);
  await new Promise<void>((resolveListening) => server.listen(0, "127.0.0.1", resolveListening));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Expected isolated TCP listener");
  port = address.port;
});
afterAll(async () => {
  if (server) await new Promise<void>((resolveClosed, reject) => server.close((error) => error ? reject(error) : resolveClosed()));
});

describe("Task04 Express redirect matrix with mocked successors", () => {
  it("returns one actual 301 then a direct 200 for every maintained slash and catalogue alias", async () => {
    const matrix = new Map<string, string>();
    for (const owner of currentOwners) if (owner !== "/") matrix.set(owner + "/", owner);
    for (const [source, owner] of Object.entries(rootAliases)) {
      matrix.set(source, owner);
      matrix.set(source + "/", owner);
    }
    for (const [slug, owner] of Object.entries(LEGACY_SERVICE_REDIRECTS)) matrix.set(`/services/${slug}/`, owner);
    for (const [slug, owner] of Object.entries(retiredTownOwners)) matrix.set(`/service-areas/${slug}/`, owner);
    for (const source of ["/service-areas/stoke", "/service-areas/stoke/", "/locations/stoke/", "/service-areas/stoke.html", "/service-areas/stoke/index.html"]) matrix.set(source, "/service-areas/stoke-on-trent");
    for (const slug of ["derby", "wigan", "evesham", "westward-ho", "stoke"]) {
      const owner = `/service-areas/${slug === "stoke" ? "stoke-on-trent" : slug}`;
      for (const source of [`/areas/${slug}/`, `/locations/${slug}/`, `/service-area/${slug}/`, `/service-areas/${slug}.html`, `/service-areas/${slug}/index.html`]) matrix.set(source, owner);
    }
    await boundedMap([...matrix.entries()], async ([source, owner]) => {
      const first = await send(source + query);
      expect(first.status, source).toBe(301);
      expect(first.location, source).toBe(owner + query);
      expect(first.location!.slice(first.location!.indexOf("?"))).toBe(query);
      expect(new URLSearchParams(first.location!.split("?")[1]).getAll("x")).toEqual(["one", "two"]);
      const final = await send(first.location!);
      expect(final.status, source).toBe(200);
      expect(final.location, source).toBeUndefined();
      expect(final.body, source).toBe(`Maintained owner: ${owner}`);
    });
  }, 30000);

  it("preserves clean and empty queries plus duplicates and encoded values through real GET and HEAD", async () => {
    for (const [source, owner] of Object.entries(rootAliases)) {
      for (const method of ["GET", "HEAD"]) {
        for (const suffix of ["", "?", query, "?x=&x=%2B&x=+&empty&encoded=%2f%3d%20%25"]) {
          const first = await send(source + "/" + suffix, method);
          expect(first.status).toBe(301);
          expect(first.location).toBe(owner + suffix);
          const final = await send(first.location!, method);
          expect(final.status).toBe(200);
          expect(final.location).toBeUndefined();
          if (method === "HEAD") {
            expect(first.body).toBe("");
            expect(final.body).toBe("");
          }
        }
      }
    }
  }, 15000);

  it("does not redirect unknowns, errors or unsafe raw request targets to a guessed owner", async () => {
    for (const path of ["/not-real/", "/404", "/index.html", "/services/constructor/", "/counties/__proto__/", "/locations/toString/", "/industries/no-such-industry/", "/service-areas/no-such-town/", "/locations/%2e%2e/", "/locations/wigan%2fextra/", "/service-areas/%/", "/about//", "/missing.jpg", "/blog/no-such-post/", "/glossary/no-such-term/"]) {
      const result = await send(path + query);
      expect(result.status, path).toBe(404);
      expect(result.location, path).toBeUndefined();
    }
  });
});
