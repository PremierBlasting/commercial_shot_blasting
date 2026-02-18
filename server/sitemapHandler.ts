import { Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define all static and dynamic routes for the sitemap (fallback)
const sitemapRoutes = [
  // Main pages - Highest Priority
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/services", changefreq: "monthly", priority: 0.9 },
  { url: "/service-areas", changefreq: "monthly", priority: 0.9 },
  { url: "/gallery", changefreq: "weekly", priority: 0.8 },
  { url: "/blog", changefreq: "weekly", priority: 0.8 },
  { url: "/contact", changefreq: "monthly", priority: 0.8 },
  { url: "/our-work", changefreq: "weekly", priority: 0.7 },
  { url: "/about", changefreq: "monthly", priority: 0.7 },
  { url: "/preparation-cleanup", changefreq: "monthly", priority: 0.7 },
  { url: "/free-site-survey", changefreq: "monthly", priority: 0.7 },
];

export function handleSitemapXML(req: Request, res: Response) {
  // Try to serve static sitemap file first (for production with pre-generated sitemaps)
  // In development: server/_core/index.ts is at project root, so client/public is relative
  // In production: built files are in dist/, and public files are copied to dist/public
  let staticSitemapPath: string;
  
  if (process.env.NODE_ENV === "production") {
    // Production: sitemap is in dist/public/ (relative to dist/index.js)
    staticSitemapPath = path.join(__dirname, "public/sitemap.xml");
  } else {
    // Development: sitemap is in client/public/
    staticSitemapPath = path.join(process.cwd(), "client/public/sitemap.xml");
  }
  
  // Check if static sitemap exists
  if (fs.existsSync(staticSitemapPath)) {
    // Serve the static sitemap file
    const sitemapContent = fs.readFileSync(staticSitemapPath, "utf-8");
    res.header("Content-Type", "application/xml");
    res.send(sitemapContent);
    return;
  }
  
  // Fallback: Generate dynamic sitemap if static file doesn't exist
  const protocol = req.protocol;
  const host = req.get("host");
  const baseUrl = process.env.VITE_APP_URL || `${protocol}://${host}`;
  const currentDate = new Date().toISOString().split("T")[0];
  
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const xmlFooter = "\n</urlset>";
  
  const urlEntries = sitemapRoutes
    .map(route => {
      return `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    })
    .join("");
  
  const xml = xmlHeader + urlEntries + xmlFooter;
  
  res.header("Content-Type", "application/xml");
  res.send(xml);
}
