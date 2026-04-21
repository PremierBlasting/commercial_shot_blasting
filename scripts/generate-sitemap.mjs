#!/usr/bin/env node
/**
 * Generates sitemap-service-areas.xml with all 638 service area pages
 * and updates sitemap.xml index to include it.
 * 
 * Usage: node scripts/generate-sitemap.mjs
 * Run this after the build to ensure the sitemap is in dist/public/
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Read location data
const locationsJsonPath = path.join(projectRoot, 'scripts/locations.json');
if (!fs.existsSync(locationsJsonPath)) {
  console.error('❌ Error: scripts/locations.json not found. Run `node scripts/export-locations.mjs` first.');
  process.exit(1);
}
const locations = JSON.parse(fs.readFileSync(locationsJsonPath, 'utf-8'));
console.log(`📄 Generating sitemap for ${locations.length} service area pages...`);

const SITE_URL = 'https://commercialshotblasting.co.uk';
const TODAY = new Date().toISOString().split('T')[0];

// Generate sitemap-service-areas.xml
const urlEntries = locations.map(loc => `  <url>
    <loc>${SITE_URL}/service-areas/${loc.slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n');

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;

// Write to client/public (static assets, served directly)
const publicDir = path.join(projectRoot, 'client/public');
const sitemapPath = path.join(publicDir, 'sitemap-service-areas.xml');
fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8');
console.log(`✅ Written: client/public/sitemap-service-areas.xml (${locations.length} URLs)`);

// Update sitemap.xml index to include the new sitemap
const sitemapIndexPath = path.join(publicDir, 'sitemap.xml');
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-main.xml</loc>
    <lastmod>2026-02-02</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-counties.xml</loc>
    <lastmod>2026-02-02</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-service-areas.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-images.xml</loc>
    <lastmod>2026-02-04</lastmod>
  </sitemap>
</sitemapindex>`;

fs.writeFileSync(sitemapIndexPath, sitemapIndex, 'utf-8');
console.log(`✅ Updated: client/public/sitemap.xml (index now includes sitemap-service-areas.xml)`);

// Also copy to dist/public if it exists (post-build)
const distPublicDir = path.join(projectRoot, 'dist/public');
if (fs.existsSync(distPublicDir)) {
  fs.writeFileSync(path.join(distPublicDir, 'sitemap-service-areas.xml'), sitemapContent, 'utf-8');
  fs.writeFileSync(path.join(distPublicDir, 'sitemap.xml'), sitemapIndex, 'utf-8');
  console.log(`✅ Also copied to dist/public/`);
}

console.log(`\n🎉 Sitemap generation complete!`);
console.log(`   📊 Total service area URLs: ${locations.length}`);
console.log(`   📁 Submit to Google Search Console: ${SITE_URL}/sitemap.xml`);
