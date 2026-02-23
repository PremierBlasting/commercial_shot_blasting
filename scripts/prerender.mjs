#!/usr/bin/env node

/**
 * Pre-rendering script for location pages
 * Generates static HTML files with baked-in meta tags for SEO
 * 
 * Usage: node scripts/prerender.mjs
 * 
 * This script:
 * 1. Reads the base index.html from dist/
 * 2. Reads location data from client/src/data/locationData.ts
 * 3. For each location, creates a static HTML file with location-specific meta tags
 * 4. Outputs to dist/service-areas/{slug}.html
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Read the base HTML template from dist/public
const distPath = path.join(projectRoot, 'dist/public');
const indexHtmlPath = path.join(distPath, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('❌ Error: dist/index.html not found. Run `pnpm build` first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

// Read location data from JSON file
const locationsJsonPath = path.join(projectRoot, 'scripts/locations.json');
if (!fs.existsSync(locationsJsonPath)) {
  console.error('❌ Error: scripts/locations.json not found. Run `node scripts/export-locations.mjs` first.');
  process.exit(1);
}

const locations = JSON.parse(fs.readFileSync(locationsJsonPath, 'utf-8'));

console.log(`📄 Found ${locations.length} locations to pre-render`);

// Create service-areas directory in dist
const serviceAreasDir = path.join(distPath, 'service-areas');
if (!fs.existsSync(serviceAreasDir)) {
  fs.mkdirSync(serviceAreasDir, { recursive: true });
}

// Function to inject meta tags into HTML
function injectMetaTags(html, location) {
  const title = `Shot Blasting ${location.name} | Industrial Services`;
  const description = `Shot Blasting ${location.name} - Local experts in rust removal & industrial cleaning. Same-day response available. Call 07970 566409`;
  const url = `https://commercialshotblasting.co.uk/service-areas/${location.slug}`;
  const image = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png";

  // Replace title
  html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

  // Replace or add meta description
  if (html.includes('<meta name="description"')) {
    html = html.replace(
      /<meta name="description" content=".*?".*?\/>/,
      `<meta name="description" content="${description}" />`
    );
  } else {
    html = html.replace(
      '</title>',
      `</title>\n    <meta name="description" content="${description}" />`
    );
  }

  // Replace Open Graph tags
  html = html.replace(
    /<meta property="og:title" content=".*?".*?\/>/,
    `<meta property="og:title" content="${title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?".*?\/>/,
    `<meta property="og:description" content="${description}" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?".*?\/>/,
    `<meta property="og:url" content="${url}" />`
  );
  html = html.replace(
    /<meta property="og:image" content=".*?".*?\/>/,
    `<meta property="og:image" content="${image}" />`
  );

  // Replace Twitter Card tags
  html = html.replace(
    /<meta name="twitter:title" content=".*?".*?\/>/,
    `<meta name="twitter:title" content="${title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?".*?\/>/,
    `<meta name="twitter:description" content="${description}" />`
  );
  html = html.replace(
    /<meta name="twitter:url" content=".*?".*?\/>/,
    `<meta name="twitter:url" content="${url}" />`
  );
  html = html.replace(
    /<meta name="twitter:image" content=".*?".*?\/>/,
    `<meta name="twitter:image" content="${image}" />`
  );

  return html;
}

// Generate HTML file for each location
let successCount = 0;
let errorCount = 0;

for (const location of locations) {
  try {
    const locationHtml = injectMetaTags(baseHtml, location);
    const outputPath = path.join(serviceAreasDir, `${location.slug}.html`);
    
    fs.writeFileSync(outputPath, locationHtml, 'utf-8');
    successCount++;
    
    if (successCount % 20 === 0) {
      console.log(`✅ Generated ${successCount}/${locations.length} pages...`);
    }
  } catch (error) {
    console.error(`❌ Error generating page for ${location.name}:`, error.message);
    errorCount++;
  }
}

console.log(`\n🎉 Pre-rendering complete!`);
console.log(`   ✅ Successfully generated: ${successCount} pages`);
if (errorCount > 0) {
  console.log(`   ❌ Errors: ${errorCount} pages`);
}
console.log(`   📁 Output directory: ${serviceAreasDir}`);
