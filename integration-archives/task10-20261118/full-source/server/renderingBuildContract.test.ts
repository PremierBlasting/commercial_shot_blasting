import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { normalizeTask10Source } from "./task10SourceScopeGuard";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = (name: string) => readFileSync(path.join(root, name), "utf8");
const baseline = "c797ed159e312d9ecd07177ea1cb254974861ca3";
const allowed = new Set([
  "client/index.html", "client/src/main.tsx", "client/src/App.tsx", "server/_core/vite.ts", "server/metaTags.ts", "vite.config.ts", "package.json", "todo.md",
  "client/src/pages/Home.tsx", "client/src/pages/BlogPost.tsx", "client/src/components/CountyPage.tsx", "client/src/pages/ServiceDetail.tsx", "client/src/components/RouteMetadataOwner.tsx", "client/src/components/Breadcrumb.tsx", "client/src/components/LocalBusinessSchema.tsx", "client/src/components/BlogPreview.tsx",
  "client/src/ssr/entry-server.tsx", "client/src/ssr/RenderProviders.tsx", "client/src/ssr/PilotRenderContext.tsx", "shared/renderingPilot.ts", "server/ssr/pilotPrefetch.ts", "server/ssr/composePilotHtml.ts", "client/src/ssr/preloadable.tsx", "vite.config.ssr.ts",
  "server/renderingPilot.test.ts", "server/renderingHydration.test.ts", "server/renderingDataBoundary.test.ts", "server/renderingBuildContract.test.ts", "scripts/verify-ssr.sh",
  // Sole extra path explicitly approved on 18 November at 08:25 UTC.
  "client/src/components/LeadForm.tsx",
]);
const evidenceRoot = process.env.TASK08_EVIDENCE_ROOT ?? "/home/ubuntu/csb-task08-implementation-2026-11-17";
const evidence = (name: string) => JSON.parse(readFileSync(path.join(evidenceRoot,name),"utf8"));
const digest = (name: string) => createHash("sha256").update(readFileSync(path.join(root,name))).digest("hex");
// This suite never invokes repository commands. Parent owns fresh complete
// changed-path/legacy-test/lockfile/dependency verification; saved evidence is
// tested explicitly as evidence, not mislabeled a live working-tree inventory.

describe("Task08 additive production artifact commands", () => {
  it("keeps launch, sitemap generation, client and Express outputs and cleanup, adding isolated SSR leg", () => {
    const pkg = JSON.parse(source("package.json"));
    const build: string = pkg.scripts.build;
    expect(pkg.scripts.start).toBe("NODE_ENV=production node dist/index.js");
    expect(build).toContain("scripts/generate-sitemap-snapshots.ts");
    expect(build.split(" && ")[0]).toBe("tsx scripts/generate-sitemap-snapshots.ts");
    expect(build).toMatch(/NODE_ENV=production\s+vite build(?:\s*&&|\s*$)/);
    expect(build).toMatch(/NODE_ENV=production\s+vite build --config vite\.config\.ssr\.ts/);
    expect(build).toMatch(/NODE_ENV=production\s+esbuild server\/_core\/index\.ts/);
    for (const flag of ["--platform=node", "--packages=external", "--bundle", "--format=esm", "--outdir=dist"]) expect(build).toContain(flag);
    expect(build).toContain("rm -rf dist/public/service-areas dist/public/services dist/public/counties dist/public/industries");
    expect(build.indexOf("generate-sitemap-snapshots")).toBeLessThan(build.indexOf("vite build"));
    expect(build.indexOf("--config vite.config.ssr.ts")).toBeLessThan(build.indexOf("esbuild"));
    expect(build.indexOf("esbuild")).toBeLessThan(build.indexOf("rm -rf"));
  });
  it("separates Node renderer from existing browser root/public output and retains every alias/transform", () => {
    const ssr = source("vite.config.ssr.ts");
    for (const token of ["client", "src", "ssr", "entry-server.tsx", "server-ssr", "entry-server.js", "@shared", "@assets", "react()", "tailwindcss()", "envDir", "production"]) expect(ssr).toContain(token);
    expect(ssr).toMatch(/publicDir\s*:\s*false/);
    expect(ssr).toMatch(/emptyOutDir\s*:\s*true/);
    expect(ssr).not.toMatch(/import\s.*from\s*["']\.\/vite\.config/);
    expect(ssr).not.toContain("main.tsx");
    const client = source("vite.config.ts");
    for (const token of ["manualChunks", "public", "react()", "tailwindcss()", "@shared", "@assets", "vitePluginManusRuntime", "county"]) expect(client).toContain(token);
    for (const config of [ssr,client]) expect(config).toMatch(/ssr:\s*\{\s*noExternal:\s*\["react-helmet-async"\]/);
  });
  it("loads dev renderer through Vite, preserves transform/debug/error flow and blocks dev CSS only on pilots", () => {
    const server = source("server/_core/vite.ts");
    for (const token of ["configFile: false", "transformIndexHtml", "/src/main.tsx", "/src/ssr/entry-server.tsx", "/src/index.css?direct", "ssrFixStacktrace", "createContentRouteGate", "index: false", "pathToFileURL", "server-ssr", "entry-server.js", "X-Rendering-Pilot", "rollback", "rendered", "no-cache, no-store, must-revalidate"]) expect(server).toContain(token);
    expect(server).not.toMatch(/path\.resolve\([^;]*["']\.\.\/server-ssr/);
    expect(server).not.toMatch(/\.redirect\(301,\s*["']\/["']\)/);
    expect(server).not.toMatch(/import\s.*entry-server.*from/);
  });
  it("keeps bounded legacy availability rollback in both dev and production before the unchanged legacy owner", () => {
    const server = source("server/_core/vite.ts");
    const dev = server.slice(server.indexOf("export async function setupVite"), server.indexOf("export function serveStatic"));
    const prod = server.slice(server.indexOf("export function serveStatic"));
    for (const implementation of [dev, prod]) {
      expect(implementation).toContain('catch (error)');
      expect(implementation).toContain('[Rendering pilot] legacy availability rollback');
      expect(implementation).toContain('"X-Rendering-Pilot": "rollback"');
      expect(implementation.indexOf('"X-Rendering-Pilot": "rollback"')).toBeLessThan(implementation.lastIndexOf("await injectMetaTags"));
      expect(implementation).not.toMatch(/status\(200\)/);
    }
    expect(dev).toContain("vite.ssrFixStacktrace(e as Error)");
    expect(dev).toContain("next(e)");
  });
});

describe("approved source seams / protected owners", () => {
  it("checks parent's captured finite approved-path inventory (fresh repository audit remains parent-owned)", () => {
    const audit = evidence("source-integrity.json");
    expect(audit.baseline).toBe(baseline);
    expect(audit.changed_paths.filter((file: string) => !allowed.has(file))).toEqual([]);
    expect(new Set(evidence("approved-paths.json"))).toEqual(allowed);
    expect(audit.approved_maximum).toBe(30);
    expect(allowed.size).toBe(30);
  });
  it("preserves every captured read-only auth/data/tracking/worker/CSS/media baseline byte for byte", () => {
    const captured = evidence("baseline.json");
    expect(captured.head).toBe(baseline);
    const protectedFiles = Object.entries(captured.files_sha256).filter(([file]) => !allowed.has(file));
    // The newly approved LeadForm initialisers leave all 20 other hashes protected.
    expect(protectedFiles.length).toBeGreaterThanOrEqual(20);
    for (const [file,hash] of protectedFiles) {
      const protectedDigest = file === "client/src/components/Header.tsx" || file === "shared/routeMetadata.ts"
        ? createHash("sha256").update(normalizeTask10Source(file, source(file))).digest("hex") : digest(file);
      expect(protectedDigest,file).toBe(hash);
    }
    // Captured baseline does not contain legacy-test/lockfile/dependency bytes.
    // Do not manufacture a before snapshot from current files or report those
    // separate parent verification gates as tested here.
  });
  it("retains Task04 index.html=404 and exact upstream article status owner", () => {
    const gate = source("server/contentRouteExistence.ts");
    expect(gate).toContain('"/index.html"'); expect(gate).toContain("status(404)");
    expect(gate).toContain('"Retry-After", "60"'); expect(gate).toContain("status(503)");
    expect(gate).toContain("res.locals.htmlContent");
  });
  it("keeps one maintained App/provider and one startup root with post-preparation path recheck", () => {
    const main = source("client/src/main.tsx");
    const entry = source("client/src/ssr/entry-server.tsx");
    expect(main).toContain("RenderProviders"); expect(entry).toContain("RenderProviders");
    expect(main).toContain("hydrateRoot"); expect(main).toContain("createRoot");
    expect(main).toContain("validateRenderingPilotBoot"); expect(main).toContain("location.pathname");
    expect(main).toMatch(/staleTime:\s*5\s*\*\s*60\s*\*\s*1000/);
    expect(main).toMatch(/gcTime:\s*10\s*\*\s*60\s*\*\s*1000/);
    expect(main).toContain('credentials: "include"'); expect(main).toContain("queryClient.getQueryCache().subscribe");
    expect(main).toContain("queryClient.getMutationCache().subscribe"); expect(main).toContain("register('/sw.js'");
    expect(entry).toContain("renderToString"); expect(entry).not.toContain("renderToPipeableStream");
    expect(entry).toContain("finally"); expect(entry).toContain(".clear()");
    for (const file of ["client/src/ssr/entry-server.tsx", "client/src/ssr/RenderProviders.tsx", "shared/renderingPilot.ts"]) {
      expect(source(file), file).not.toMatch(/(?:from|import\()\s*["'][^"']*(?:server\/db|server\/routers|_core\/context|_core\/sdk|storage|notification)/);
    }
    expect(source("client/index.html")).toContain('<div id="root"><!--RENDERING_PILOT_ROOT--></div>');
    expect(source("client/src/App.tsx")).toContain("RouteMetadataOwner");
  });
  it("requires real root-body needles in adapted harness, not old generic boot or copied pages", () => {
    const harness = source("scripts/verify-ssr.sh");
    for (const token of ["rendering-pilot-boot", "route-metadata-boot", "structural-steel-frames", "counties/hampshire", "factory-warehouse-cladding-restoration", "intumescent-painting", "/index.html", "/assets", "PARENT_SERVER_READY"]) expect(harness).toContain(token);
    expect(harness).not.toContain("window.__RQ_STATE__");
    expect(harness).not.toContain('check_301 "/index.html"');
  });
});

// Parent confirmed controlled production build. These active assertions inspect
// emitted artifacts only; this suite never starts a build/application process.
describe("controlled emitted production artifacts", () => {
  it("has client, Express and Node renderer, without copied page outputs/SSR browser references", () => {
    for (const file of ["dist/public/index.html", "dist/index.js", "dist/server-ssr/entry-server.js"]) expect(existsSync(path.join(root, file)), file).toBe(true);
    for (const dir of ["service-areas", "services", "counties", "industries"]) expect(existsSync(path.join(root, "dist/public", dir))).toBe(false);
    expect(source("dist/public/index.html")).not.toMatch(/server-ssr|entry-server\.js/);
    // Browser effects remain in the maintained App graph but never run on SSR.
    // Reject a development JSX runtime or client bootstrap, not effect closures.
    expect(source("dist/server-ssr/entry-server.js")).not.toMatch(/jsxDEV|\b(?:hydrateRoot|createRoot)\s*\(/);
  });
});
