import "dotenv/config";
import compression from "compression";
import helmet from "helmet";
import { rateLimit, ipKeyGenerator } from "express-rate-limit";
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
import { getActiveTestimonials, getActiveGalleryItems, getPublishedBlogPosts } from "../db";
import { getCanonicalServicePath, isCanonicalServiceSlug } from "@shared/serviceSeoCatalog";
import { getCanonicalServiceAreaRedirect, getSoft404PathResolution } from "../seoUrlNormalisation";

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

  // Search Console reported alternate canonical copies such as
  // /service-areas/swindon/. All published internal links, sitemap entries,
  // and canonical tags use no trailing slash, so consolidate the duplicate at
  // the HTTP layer rather than relying on a canonical hint alone.
  app.use((req, res, next) => {
    const canonicalRedirect = getCanonicalServiceAreaRedirect(req.path, req.originalUrl);
    if (canonicalRedirect) {
      return res.redirect(301, canonicalRedirect);
    }
    next();
  });

  // Search Console's soft-404 report includes a mix of genuine historic paths,
  // current URLs and non-existent patterns that previously reached the SPA HTML
  // fallback. Send a 301 only when the same location or a clear county/page
  // successor exists; everything else receives a real, noindex 404 response.
  app.use((req, res, next) => {
    const resolution = getSoft404PathResolution(req.path, req.originalUrl);
    if (!resolution) return next();
    if (resolution.type === "redirect") return res.redirect(301, resolution.destination);
    return res.status(404).set("Content-Type", "text/html; charset=utf-8").send(`<!doctype html><html lang="en-GB"><head><meta name="robots" content="noindex, follow"><title>Page Not Found | Commercial Shot Blasting</title></head><body><main><h1>Page Not Found</h1><p>The requested page is not available. Browse our <a href="/service-areas">service areas</a>, <a href="/services">services</a> or <a href="/contact">contact page</a>.</p></main></body></html>`);
  });

  // 301 redirect: /free-site-survey → /site-survey (SEO-safe rename)
  app.get("/free-site-survey", (_req, res) => {
    res.redirect(301, "/site-survey");
  });

  // 301 redirect: legacy structural-steel case study → the named ISS Property Wigan record.
  // This retains discovery value for existing internal links and external references.
  app.get("/case-studies/structural-steel", (_req, res) => {
    res.redirect(301, "/case-studies/iss-property-former-bakkavor-foods-facility-wigan");
  });

  // Canonical service routing: redirects historic aliases and returns a genuine
  // 404 for unknown service paths instead of a 200-status SPA error screen.
  app.get("/services/:slug", (req, res, next) => {
    const slug = req.params.slug;
    const canonicalPath = getCanonicalServicePath(slug);
    if (canonicalPath && canonicalPath !== req.path) {
      return res.redirect(301, canonicalPath);
    }
    if (isCanonicalServiceSlug(slug)) return next();
    return res.status(404).set("Content-Type", "text/html; charset=utf-8").send(`<!doctype html><html lang="en-GB"><head><meta name="robots" content="noindex, follow"><title>Service Not Found | Commercial Shot Blasting</title></head><body><main><h1>Service Not Found</h1><p>The requested service page is not available. Please browse our <a href="/services">shot blasting services</a> or <a href="/contact">contact Commercial Shot Blasting</a>.</p></main></body></html>`);
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

  // Rate limiter for public lead submission and attachment upload endpoints.
  // Prevents automated spam bots from exhausting HubSpot API quota while still
  // allowing genuine users to resubmit after fixing a validation error.
  const contactRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour rolling window
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    keyGenerator: (req) => {
      // Respect Cloudflare's CF-Connecting-IP header in production;
      // ipKeyGenerator normalises IPv6 addresses to /56 subnets to prevent bypass.
      const cfIp = req.headers["cf-connecting-ip"];
      const rawIp = (typeof cfIp === "string" && cfIp)
        ? cfIp.trim()
        : (req.ip ?? "unknown");
      return ipKeyGenerator(rawIp);
    },
    message: JSON.stringify({
      error: {
        message: "Too many form submissions from this IP address. Please try again in an hour.",
        code: "TOO_MANY_REQUESTS",
      },
    }),
    skip: (req) => {
      // Limit both the lead mutation and optional public attachment uploads.
      return !req.path.includes("contact.submit") && !req.path.includes("contact.uploadAttachments");
    },
  });
  app.use("/api/trpc/contact", contactRateLimiter);

  // ── Homepage SSR Preload ─────────────────────────────────────────────────────
  // Returns testimonials + gallery as JSON with a 5-minute server-side cache.
  // The homepage seeds the React Query cache from this response, eliminating
  // the cold-start latency of the batched tRPC calls on first page load.
  let preloadCache: { data: unknown; expiresAt: number } | null = null;
  app.get("/api/preload/homepage", async (_req, res) => {
    try {
      const now = Date.now();
      if (!preloadCache || now > preloadCache.expiresAt) {
        const [testimonials, gallery, blogPosts] = await Promise.all([
          getActiveTestimonials(),
          getActiveGalleryItems(),
          getPublishedBlogPosts(),
        ]);
        preloadCache = {
          data: { testimonials, gallery, blogPosts },
          expiresAt: now + 5 * 60 * 1000, // 5 minutes
        };
      }
      res.set("Cache-Control", "public, max-age=300, stale-while-revalidate=60");
      res.json(preloadCache.data);
    } catch (err) {
      console.error("[preload/homepage] Error:", err);
      res.status(500).json({ testimonials: [], gallery: [] });
    }
  });

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
      "# Sitemap index (lists canonical main, county, service-area, blog, and image child sitemaps)\n" +
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
