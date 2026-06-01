import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";
// Use fileURLToPath(import.meta.url) for reliable absolute paths in both dev and production
// import.meta.dirname can resolve to cwd in some hosting environments
const __filename = fileURLToPath(import.meta.url);
const __dirname_vite = path.dirname(__filename);
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { injectMetaTags } from "../metaTags";
// JSON-LD is now handled entirely by client-side jsonld-inject.js to avoid duplicates

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
      // Inject meta tags for SEO (service area pages)
      template = await injectMetaTags(template, url);
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

  // Service area pages fall through to the catch-all below where injectMetaTags
  // injects all JSON-LD schemas server-side into the index.html template

  // Serve index.html for all routes (SPA fallback) with server-side meta/schema injection
  app.use("*", async (req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    let html = fs.readFileSync(indexPath, "utf-8");
    // Inject meta tags for SEO (service area pages)
    html = await injectMetaTags(html, req.originalUrl);
    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  });
}
// Force redeploy: Tue Apr 21 06:18:54 EDT 2026
