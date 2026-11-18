import express, { type Express, type Request, type Response } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
// Use fileURLToPath(import.meta.url) for reliable absolute paths in both dev and production
// import.meta.dirname can resolve to cwd in some hosting environments
const __filename = fileURLToPath(import.meta.url);
const __dirname_vite = path.dirname(__filename);
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { injectMetaTags, composeRouteMetadataHead, resolveServerRouteMetadata } from "../metaTags";
import { createContentRouteGate } from "../contentRouteExistence";
import { normaliseServiceUrls } from "@shared/serviceSeoCatalog";
import { normaliseResponseTimeCopy } from "@shared/seoContentPolicy";
import { getRenderingPilot, validateRenderingPilotBoot, type PilotSeed, type RenderingPilotBoot } from "../../shared/renderingPilot";
import type { RouteMetadataRecord } from "../../shared/routeMetadata";
import type { HtmlContentContext } from "../contentRouteExistence";
import { prefetchPilot, createTrackedPilotReads, PilotPrefetchError } from "../ssr/pilotPrefetch";
import { composePilotHtml } from "../ssr/composePilotHtml";

export interface PilotWorkLease {
  track<T>(promise: Promise<T>): Promise<T>;
  finish(): void;
  readonly settled: Promise<void>;
  readonly pending: number;
}
export function createPilotLeasePool(maxOutstanding = 2) {
  if (!Number.isInteger(maxOutstanding) || maxOutstanding < 1 || maxOutstanding > 2) throw new Error("Pilot leases require a limit of 1 or 2");
  let outstanding = 0;
  return {
    get outstanding() { return outstanding; },
    tryAcquire(): PilotWorkLease | null {
      if (outstanding >= maxOutstanding) return null;
      outstanding++;
      let pending = 0;
      let finished = false;
      let released = false;
      let resolveSettled!: () => void;
      const settled = new Promise<void>(resolve => { resolveSettled = resolve; });
      const releaseIfDrained = () => {
        if (finished && pending === 0 && !released) {
          released = true;
          outstanding--;
          resolveSettled();
        }
      };
      return {
        get pending() { return pending; },
        settled,
        track<T>(promise: Promise<T>): Promise<T> {
          if (finished) throw new Error("Pilot lease is closed to new work");
          pending++;
          const onSettle = () => { pending--; releaseIfDrained(); };
          promise.then(onSettle, onSettle);
          return promise;
        },
        finish() { finished = true; releaseIfDrained(); },
      };
    },
  };
}
export class PilotLifecycleError extends Error {
  constructor(public readonly code: "deadline" | "disconnected" | "capacity" | "invalid-renderer" | "invalid-result") {
    super(`Rendering pilot stopped: ${code}`);
    this.name = "PilotLifecycleError";
  }
}
export async function runPilotWithDeadline<T>(
  lease: PilotWorkLease,
  work: (signal: AbortSignal, track: <V>(promise: Promise<V>) => Promise<V>) => Promise<T>,
  options: { signal?: AbortSignal; timeoutMs?: number } = {},
): Promise<T> {
  const timeoutMs = options.timeoutMs ?? 5000;
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0 || timeoutMs > 5000) { lease.finish(); throw new Error("Invalid rendering pilot deadline"); }
  const deadline = Date.now() + timeoutMs;
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  let onAbort: (() => void) | undefined;
  let reason: PilotLifecycleError | undefined;
  try {
    if (options.signal?.aborted) throw new PilotLifecycleError("disconnected");
    const interruption = new Promise<never>((_, reject) => {
      const stop = (error: PilotLifecycleError) => { reason ??= error; controller.abort(); reject(reason); };
      timer = setTimeout(() => stop(new PilotLifecycleError("deadline")), timeoutMs);
      timer.unref?.();
      onAbort = () => stop(new PilotLifecycleError("disconnected"));
      options.signal?.addEventListener("abort", onAbort, { once: true });
      if (options.signal?.aborted) onAbort();
    });
    const operation = lease.track(Promise.resolve().then(() => {
      if (controller.signal.aborted) throw reason ?? new PilotLifecycleError("disconnected");
      return work(controller.signal, promise => lease.track(promise));
    }));
    const result = await Promise.race([operation, interruption]);
    if (controller.signal.aborted) throw reason ?? new PilotLifecycleError("disconnected");
    // Timers cannot interrupt synchronous React CPU; reject a late return too.
    if (Date.now() >= deadline) { controller.abort(); throw new PilotLifecycleError("deadline"); }
    return result;
  } catch (error) {
    controller.abort();
    throw error;
  } finally {
    if (timer) clearTimeout(timer);
    if (onAbort) options.signal?.removeEventListener("abort", onAbort);
    lease.finish();
  }
}

type PilotRenderer = {
  renderPilot(url: string, seeds: PilotSeed[], metadata: RouteMetadataRecord, signal?: AbortSignal): Promise<{ html: string; boot: RenderingPilotBoot }>;
};
function rendererModule(value: unknown): PilotRenderer {
  if (!value || typeof value !== "object" || typeof (value as PilotRenderer).renderPilot !== "function") throw new PilotLifecycleError("invalid-renderer");
  return value as PilotRenderer;
}
const pilotLeases = createPilotLeasePool();
let productionRenderer: Promise<PilotRenderer> | undefined;
function loadProductionPilotRenderer(): Promise<PilotRenderer> {
  if (!productionRenderer) {
    const rendererPath = path.resolve(__dirname_vite, "server-ssr", "entry-server.js");
    const rendererUrl = pathToFileURL(rendererPath).href;
    productionRenderer = import(rendererUrl).then(rendererModule).catch(error => { productionRenderer = undefined; throw error; });
  }
  return productionRenderer;
}
export function createPilotDisconnectSignal(req: Request, res: Response) {
  const controller = new AbortController();
  const onAborted = () => controller.abort();
  const onClose = () => { if (!res.writableFinished) controller.abort(); };
  req.once("aborted", onAborted);
  res.once("close", onClose);
  if (req.aborted || res.destroyed) controller.abort();
  return { signal: controller.signal, detach() { req.off("aborted", onAborted); res.off("close", onClose); } };
}
async function preparePilotResponse(
  url: string, template: string, content: HtmlContentContext | undefined, req: Request, res: Response,
  load: () => Promise<PilotRenderer>, transform?: (template: string) => Promise<string>,
): Promise<string> {
  const lease = pilotLeases.tryAcquire();
  if (!lease) throw new PilotLifecycleError("capacity");
  const disconnect = createPilotDisconnectSignal(req, res);
  try {
    return await runPilotWithDeadline(lease, async (signal, track) => {
      const deadline = Date.now() + 5000;
      const check = () => {
        if (signal.aborted) throw new PilotLifecycleError("disconnected");
        if (Date.now() >= deadline) throw new PilotLifecycleError("deadline");
      };
      check();
      const reads = createTrackedPilotReads(promise => { track(promise); }, undefined, signal);
      const seeds = await prefetchPilot(url, content, signal, reads);
      check();
      const renderer = await load();
      check();
      const metadata = resolveServerRouteMetadata(url, content);
      const result = await renderer.renderPilot(url, seeds, metadata, signal);
      check();
      if (!result || !validateRenderingPilotBoot(result.boot, getRenderingPilot(url)!.pathname)) throw new PilotLifecycleError("invalid-result");
      let page = normaliseResponseTimeCopy(normaliseServiceUrls(await injectMetaTags(template, url, content, { suppressPilotBody: true })));
      check();
      if (transform) {
        page = await transform(page);
        check();
        page = page.replace("</head>", () => '<link rel="stylesheet" href="/src/index.css?direct" data-rendering-pilot-dev-css></head>');
      }
      page = composeRouteMetadataHead(page, metadata);
      check();
      const finalPage = composePilotHtml(page, result);
      check();
      return finalPage;
    }, { signal: disconnect.signal });
  } finally { disconnect.detach(); }
}


export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use(createContentRouteGate());
  
  // Service area pages fall through to the catch-all below where injectMetaTags
  // injects all JSON-LD schemas server-side into the index.html template
  
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        __dirname_vite,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      if ((req.method === "GET" || req.method === "HEAD") && res.statusCode === 200 && getRenderingPilot(url)) {
        try {
          const finalPage = await preparePilotResponse(url, template, res.locals.htmlContent, req, res,
            async () => rendererModule(await vite.ssrLoadModule("/src/ssr/entry-server.tsx")),
            page => vite.transformIndexHtml(url, page));
          if (req.aborted || res.destroyed) return;
          res.set({ "Content-Type": "text/html", "Cache-Control": "no-cache, no-store, must-revalidate", "X-Rendering-Pilot": "rendered" }).end(finalPage);
          return;
        } catch (error) {
          // Preserve availability in preview as in production, without exposing
          // private errors/search or accepting legacy copied content as SSR.
          const reason = error instanceof PilotLifecycleError || error instanceof PilotPrefetchError ? error.code : "renderer-or-composition-failure";
          console.error("[Rendering pilot] legacy availability rollback", { reason, pilotId: getRenderingPilot(url)?.id });
          if (req.aborted || res.destroyed || res.headersSent) return;
          res.set({ "X-Rendering-Pilot": "rollback", "Cache-Control": "no-cache, no-store, must-revalidate" });
        }
      }
      // Default legacy branch is unchanged for every other request.
      template = normaliseResponseTimeCopy(normaliseServiceUrls(await injectMetaTags(template, url, res.locals.htmlContent)));
      const page = await vite.transformIndexHtml(url, template);
      const finalPage = composeRouteMetadataHead(page, resolveServerRouteMetadata(url, res.locals.htmlContent));
      res.set({ "Content-Type": "text/html" }).end(finalPage);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(__dirname_vite, "../..", "dist", "public")
      : path.resolve(__dirname_vite, "public");
  console.log(`[SSR] __dirname_vite: ${__dirname_vite}`);
  console.log(`[SSR] distPath: ${distPath}`);
  console.log(`[SSR] distPath exists: ${fs.existsSync(distPath)}`);
  const indexHtmlPath = path.resolve(distPath, 'index.html');
  console.log(`[SSR] index.html exists: ${fs.existsSync(indexHtmlPath)}`);
  if (fs.existsSync(indexHtmlPath)) {
    const sample = fs.readFileSync(indexHtmlPath, 'utf-8');
    console.log(`[SSR] index.html has SSR_CONTENT: ${sample.includes('<!--SSR_CONTENT-->')}`);
    console.log(`[SSR] index.html length: ${sample.length}`);
  }
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Serve static files with aggressive caching for immutable assets
  // index: false prevents express.static from serving index.html for '/',
  // so ALL HTML requests go through the catch-all route where JSON-LD is injected
  app.use(express.static(distPath, {
    index: false,
    maxAge: '1y', // Cache for 1 year (immutable assets have content hashes)
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      const ext = path.extname(filePath).toLowerCase();
      const fileName = path.basename(filePath);
      
      // The browser checks a service worker script for updates on navigation.
      // Do not permit an intermediary to retain an old worker across releases.
      if (fileName === 'sw.js') {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
      // Images: Cache for 1 year (WebP, PNG, JPG, SVG, ICO)
      else if (['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.avif'].includes(ext)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
      // Fonts: Cache for 1 year
      else if (['.woff', '.woff2', '.ttf', '.otf', '.eot'].includes(ext)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
      // JS/CSS with hashes: Cache for 1 year. Vite's current filenames use a
      // hyphen before base64url hashes (for example OurWork-DdhObPW_.js).
      else if (['.js', '.css'].includes(ext) && /(?:^|[-.])[A-Za-z0-9_-]{8,}\.(?:js|css)$/.test(fileName)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
      // Other JS/CSS: Cache for 1 day with revalidation
      else if (['.js', '.css'].includes(ext)) {
        res.setHeader('Cache-Control', 'public, max-age=86400, must-revalidate');
      }
      // HTML: No cache (always fetch fresh)
      else if (['.html'].includes(ext)) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
      // Default: Cache for 1 hour
      else {
        res.setHeader('Cache-Control', 'public, max-age=3600');
      }
    }
  }));

  // A retired content-hashed asset must be a real 404. Letting it reach the
  // SPA fallback returns HTML with a 200 response at a JavaScript URL, which
  // poisons cache-first clients and presents as a failed dynamic import.
  app.use('/assets', (_req, res) => {
    res.status(404).set('Content-Type', 'text/plain; charset=utf-8').send('Asset not found');
  });

  // Service area pages fall through to the catch-all below where injectMetaTags
  // injects all JSON-LD schemas server-side into the index.html template

  // Real files and assets resolved above; only existing page routes reach HTML fallback.
  app.use(createContentRouteGate());

  // Serve index.html for maintained routes with server-side meta/schema injection
  app.use("*", async (req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    let html = fs.readFileSync(indexPath, "utf-8");
    const url = req.originalUrl;
    if ((req.method === "GET" || req.method === "HEAD") && res.statusCode === 200 && getRenderingPilot(url)) {
      try {
        const finalPage = await preparePilotResponse(url, html, res.locals.htmlContent, req, res, loadProductionPilotRenderer);
        if (req.aborted || res.destroyed) return;
        res.set({ "Content-Type": "text/html", "Cache-Control": "no-cache, no-store, must-revalidate", "X-Rendering-Pilot": "rendered" }).send(finalPage);
        return;
      } catch (error) {
        // Never log URL/search, DB values, credentials or arbitrary renderer errors.
        const reason = error instanceof PilotLifecycleError || error instanceof PilotPrefetchError ? error.code : "renderer-or-composition-failure";
        console.error("[Rendering pilot] legacy availability rollback", { reason, pilotId: getRenderingPilot(url)?.id });
        if (req.aborted || res.destroyed || res.headersSent) return;
        // Explicit availability rollback, not accepted SSR. Keep upstream status policy.
        res.set({ "X-Rendering-Pilot": "rollback", "Cache-Control": "no-cache, no-store, must-revalidate" });
      }
    }
    // Inject meta tags for SEO (service area pages); defaults retain copied legacy bodies.
    html = normaliseResponseTimeCopy(normaliseServiceUrls(await injectMetaTags(html, req.originalUrl, res.locals.htmlContent)));
    html = composeRouteMetadataHead(html, resolveServerRouteMetadata(req.originalUrl, res.locals.htmlContent));
    res.set({ "Content-Type": "text/html" }).send(html);
  });
}
// Force redeploy: Tue Apr 21 06:18:54 EDT 2026
