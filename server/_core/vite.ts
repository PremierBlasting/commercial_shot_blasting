import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { injectMetaTags } from "../metaTags";

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
  
  // Detect crawlers (including Manus SEO crawler)
  function isCrawler(userAgent: string): boolean {
    const crawlerPatterns = [
      /bot/i, /crawler/i, /spider/i, /crawling/i,
      /facebookexternalhit/i, /twitterbot/i, /linkedinbot/i,
      /slackbot/i, /whatsapp/i, /telegram/i,
      /googlebot/i, /bingbot/i, /yandex/i, /baiduspider/i,
      /lighthouse/i, /pagespeed/i, /gtmetrix/i,
      /manus/i, /headless/i, /phantom/i, /selenium/i
    ];
    return crawlerPatterns.some(pattern => pattern.test(userAgent));
  }

  // Serve static HTML files for service area pages when accessed by crawlers
  app.use("/service-areas/:location", async (req, res, next) => {
    const userAgent = req.headers['user-agent'] || '';
    
    if (isCrawler(userAgent)) {
      const location = req.params.location;
      const staticHtmlPath = path.resolve(import.meta.dirname, '../..', 'client/public/service-areas', `${location}.html`);
      
      if (fs.existsSync(staticHtmlPath)) {
        const html = fs.readFileSync(staticHtmlPath, 'utf-8');
        return res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
      }
    }
    
    next();
  });
  
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
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
      // Inject meta tags for SEO (service area pages)
      template = injectMetaTags(template, url);
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Serve static files with aggressive caching for immutable assets
  app.use(express.static(distPath, {
    maxAge: '1y', // Cache for 1 year (immutable assets have content hashes)
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      const ext = path.extname(filePath).toLowerCase();
      
      // Images: Cache for 1 year (WebP, PNG, JPG, SVG, ICO)
      if (['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.avif'].includes(ext)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
      // Fonts: Cache for 1 year
      else if (['.woff', '.woff2', '.ttf', '.otf', '.eot'].includes(ext)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
      // JS/CSS with hashes: Cache for 1 year (Vite adds content hashes)
      else if (['.js', '.css'].includes(ext) && /\.[a-f0-9]{8}\./.test(filePath)) {
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

  // Detect crawlers (including Manus SEO crawler)
  function isCrawler(userAgent: string): boolean {
    const crawlerPatterns = [
      /bot/i, /crawler/i, /spider/i, /crawling/i,
      /facebookexternalhit/i, /twitterbot/i, /linkedinbot/i,
      /slackbot/i, /whatsapp/i, /telegram/i,
      /googlebot/i, /bingbot/i, /yandex/i, /baiduspider/i,
      /lighthouse/i, /pagespeed/i, /gtmetrix/i,
      /manus/i, /headless/i, /phantom/i, /selenium/i
    ];
    return crawlerPatterns.some(pattern => pattern.test(userAgent));
  }

  // Serve static HTML files for service area pages when accessed by crawlers
  app.use("/service-areas/:location", (req, res, next) => {
    const userAgent = req.headers['user-agent'] || '';
    
    if (isCrawler(userAgent)) {
      const location = req.params.location;
      const staticHtmlPath = path.resolve(distPath, 'service-areas', `${location}.html`);
      
      if (fs.existsSync(staticHtmlPath)) {
        const html = fs.readFileSync(staticHtmlPath, 'utf-8');
        return res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
      }
    }
    
    next();
  });

  // fall through to index.html if the file doesn't exist
  app.use("*", (req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    let html = fs.readFileSync(indexPath, "utf-8");
    // Inject meta tags for SEO (service area pages)
    html = injectMetaTags(html, req.originalUrl);
    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  });
}
