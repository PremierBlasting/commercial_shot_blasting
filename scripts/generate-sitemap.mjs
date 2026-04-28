#!/usr/bin/env node
/**
 * Generates all sitemap XML files and updates the sitemap index.
 *
 * Generates:
 *   - sitemap-service-areas.xml  (638 service area pages)
 *   - sitemap-counties.xml       (25 county pages — regenerated from counties_data.json)
 *   - sitemap-industries.xml     (8 industry pages — generated from industries_data.json)
 *   - sitemap-services.xml       (18 service pages — generated from services_data.json)
 *   - sitemap.xml                (sitemap index referencing all sitemaps)
 *
 * Usage: node scripts/generate-sitemap.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const SITE_URL = 'https://commercialshotblasting.co.uk';
const TODAY = new Date().toISOString().split('T')[0];
const publicDir = path.join(projectRoot, 'client/public');
const distPublicDir = path.join(projectRoot, 'dist/public');

function buildUrlset(urls) {
  const entries = urls.map(({ loc, lastmod, changefreq, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod || TODAY}</lastmod>
    <changefreq>${changefreq || 'monthly'}</changefreq>
    <priority>${priority || '0.7'}</priority>
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${entries}
</urlset>`;
}

function writeToPublic(filename, content) {
  fs.writeFileSync(path.join(publicDir, filename), content, 'utf-8');
  if (fs.existsSync(distPublicDir)) {
    fs.writeFileSync(path.join(distPublicDir, filename), content, 'utf-8');
  }
}

// 1. Service Areas
const locationsJsonPath = path.join(projectRoot, 'scripts/locations.json');
if (!fs.existsSync(locationsJsonPath)) {
  console.error('Error: scripts/locations.json not found. Run export-locations.mjs first.');
  process.exit(1);
}
const locations = JSON.parse(fs.readFileSync(locationsJsonPath, 'utf-8'));
writeToPublic('sitemap-service-areas.xml', buildUrlset(
  locations.map(loc => ({ loc: `${SITE_URL}/service-areas/${loc.slug}`, changefreq: 'monthly', priority: '0.7' }))
));
console.log(`sitemap-service-areas.xml — ${locations.length} URLs`);

// 2. Counties
const countiesJsonPath = path.join(projectRoot, 'scripts/counties_data.json');
if (!fs.existsSync(countiesJsonPath)) {
  console.error('Error: scripts/counties_data.json not found.');
  process.exit(1);
}
const counties = JSON.parse(fs.readFileSync(countiesJsonPath, 'utf-8'));
writeToPublic('sitemap-counties.xml', buildUrlset(
  counties.map(c => ({ loc: `${SITE_URL}/counties/${c.slug}`, changefreq: 'monthly', priority: '0.7' }))
));
console.log(`sitemap-counties.xml — ${counties.length} URLs`);

// 3. Industries
const industriesJsonPath = path.join(projectRoot, 'scripts/industries_data.json');
if (!fs.existsSync(industriesJsonPath)) {
  console.error('Error: scripts/industries_data.json not found.');
  process.exit(1);
}
const industries = JSON.parse(fs.readFileSync(industriesJsonPath, 'utf-8'));
writeToPublic('sitemap-industries.xml', buildUrlset(
  industries.map(i => ({ loc: `${SITE_URL}/industries/${i.slug}`, changefreq: 'monthly', priority: '0.7' }))
));
console.log(`sitemap-industries.xml — ${industries.length} URLs`);

// 4. Services
const servicesJsonPath = path.join(projectRoot, 'scripts/services_data.json');
if (!fs.existsSync(servicesJsonPath)) {
  console.error('Error: scripts/services_data.json not found.');
  process.exit(1);
}
const services = JSON.parse(fs.readFileSync(servicesJsonPath, 'utf-8'));
writeToPublic('sitemap-services.xml', buildUrlset(
  services.map(s => ({ loc: `${SITE_URL}/services/${s.id}`, changefreq: 'monthly', priority: '0.8' }))
));
console.log(`sitemap-services.xml — ${services.length} URLs`);

// 5. Sitemap Index
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-main.xml</loc>
    <lastmod>2026-02-02</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-services.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-counties.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-industries.xml</loc>
    <lastmod>${TODAY}</lastmod>
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
writeToPublic('sitemap.xml', sitemapIndex);
console.log(`sitemap.xml — index updated (6 sitemaps)`);

console.log(`\nSitemap generation complete!`);
console.log(`  Service areas: ${locations.length} | Counties: ${counties.length} | Industries: ${industries.length} | Services: ${services.length}`);
console.log(`  Submit to Google Search Console: ${SITE_URL}/sitemap.xml`);
