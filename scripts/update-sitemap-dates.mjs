/**
 * update-sitemap-dates.mjs
 *
 * Replaces all <lastmod> dates in static sitemap XML files with today's date.
 * Run automatically as part of the build process (see package.json "prebuild").
 *
 * Usage: node scripts/update-sitemap-dates.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "client", "public");

const today = new Date().toISOString().split("T")[0];

const sitemapFiles = [
  "sitemap.xml",
  "sitemap-main.xml",
  "sitemap-services.xml",
  "sitemap-counties.xml",
  "sitemap-industries.xml",
  "sitemap-locations-1.xml",
  "sitemap-locations-2.xml",
  "sitemap-service-areas.xml",
  "sitemap-images.xml",
];

let updated = 0;
for (const filename of sitemapFiles) {
  const filePath = join(publicDir, filename);
  try {
    const content = readFileSync(filePath, "utf-8");
    const updated_content = content.replace(
      /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g,
      `<lastmod>${today}</lastmod>`
    );
    if (updated_content !== content) {
      writeFileSync(filePath, updated_content, "utf-8");
      updated++;
      console.log(`[sitemap-dates] Updated ${filename} → ${today}`);
    } else {
      console.log(`[sitemap-dates] ${filename} already up to date (${today})`);
    }
  } catch (e) {
    console.warn(`[sitemap-dates] Skipped ${filename}: ${e.message}`);
  }
}

console.log(`[sitemap-dates] Done — ${updated} file(s) updated to ${today}`);
