import "dotenv/config";
import compression from "compression";
import helmet from "helmet";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { registerScheduledRoutes } from "../scheduledRoutes";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { registerSitemapRoute } from "../sitemap";
import { registerOgImageRoute } from "../ogImage";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Security headers — helmet sets sensible defaults including HSTS, X-Frame-Options,
  // X-Content-Type-Options, Referrer-Policy, etc. HSTS is belt-and-braces alongside
  // Cloudflare's CDN-level HSTS; maxAge=31536000 = 1 year as recommended by HSTS preload.
  //
  // Strict-Transport-Security header is set via helmet's hsts option:
  //   max-age=31536000; includeSubDomains; preload
  // Only applied when req.headers['x-forwarded-proto'] === 'https' (production/Cloudflare).
  app.use(
    helmet({
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
      // CSP is managed separately to avoid breaking the SPA / inline scripts
      contentSecurityPolicy: false,
    })
  );
  // Enable gzip/deflate compression for all responses (improves TTFB and Core Web Vitals)
  app.use(compression());
  // 301 redirect: www.commercialshotblasting.co.uk → commercialshotblasting.co.uk
  app.use((req, res, next) => {
    const host = req.headers.host || '';
    if (host.startsWith('www.')) {
      const rootHost = host.slice(4); // strip 'www.'
      const redirectUrl = `https://${rootHost}${req.originalUrl}`;
      return res.redirect(301, redirectUrl);
    }
    next();
  });

  // 301 redirect: /free-site-survey → /site-survey (SEO-safe rename)
  app.get("/free-site-survey", (_req, res) => {
    res.redirect(301, "/site-survey");
  });

  // 301 redirects: old/legacy service URL slugs → canonical current URLs
  app.get("/services/marine-services", (_req, res) => {
    res.redirect(301, "/services/marine-shot-blasting");
  });
  app.get("/services/bridge-steelwork-shot-blasting", (_req, res) => {
    res.redirect(301, "/services/bridge-steelwork");
  });
  app.get("/services/automotive-restoration", (_req, res) => {
    res.redirect(301, "/services/commercial-vehicles");
  });
  app.get("/services/steel-shot-blasting", (_req, res) => {
    res.redirect(301, "/services/structural-steel-frames");
  });
  // 301 redirect: /gloucestershire → /counties/gloucestershire
  app.get("/gloucestershire", (_req, res) => {
    res.redirect(301, "/counties/gloucestershire");
  });

  // 301 redirects: /areas/:slug and /locations/:slug → canonical /service-areas/:slug
  // These legacy URL patterns were crawled by Google but served blank SPA shells
  // (no SSR content, no location-specific meta). Consolidating to /service-areas/
  // eliminates duplicate content, passes link equity to indexed pages, and
  // ensures Googlebot always receives the full SSR-rendered location page.
  app.get("/areas/:slug", (req, res) => {
    res.redirect(301, `/service-areas/${req.params.slug}`);
  });
  app.get("/locations/:slug", (req, res) => {
    res.redirect(301, `/service-areas/${req.params.slug}`);
  });

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Storage proxy for /manus-storage/* paths
  registerStorageProxy(app);
  // Scheduled task endpoints (called by Manus Cloud Computer scheduler)
  registerScheduledRoutes(app);
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // Sitemap
  registerSitemapRoute(app);
  // Dynamic OG images for county and town pages
  registerOgImageRoute(app);

  // robots.txt — served before static middleware / SPA fallback
  app.get("/robots.txt", (_req, res) => {
    res.set("Content-Type", "text/plain");
    res.send(
      "User-agent: *\n" +
      "Allow: /\n" +
      "\n" +
      "# Disallow admin/API paths\n" +
      "Disallow: /api/\n" +
      "Disallow: /manus-storage/\n" +
      "\n" +
      "Sitemap: https://commercialshotblasting.co.uk/sitemap.xml\n"
    );
  });

  // IndexNow key file — must be served before static middleware / SPA fallback
  // Key: e8e86d804d074a3c99b7d1f29561bf59
  app.get("/e8e86d804d074a3c99b7d1f29561bf59.txt", (_req, res) => {
    res.set("Content-Type", "text/plain");
    res.send("e8e86d804d074a3c99b7d1f29561bf59");
  });
  // Legacy key file (keep for backwards compat)
  app.get("/commercialshotblasting.txt", (_req, res) => {
    res.set("Content-Type", "text/plain");
    res.send("commercialshotblasting");
  });

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
