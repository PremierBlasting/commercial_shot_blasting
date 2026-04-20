#!/usr/bin/env node

/**
 * Pre-rendering script for location pages
 * Generates static HTML files with baked-in meta tags, canonical URLs, and JSON-LD schemas for SEO
 * 
 * Usage: node scripts/prerender.mjs
 * 
 * This script:
 * 1. Reads the base index.html from dist/public
 * 2. Reads location data from scripts/locations.json
 * 3. For each location, creates a static HTML file with:
 *    - Location-specific title, description, OG and Twitter tags
 *    - Canonical link tag (prevents duplicate content)
 *    - Comprehensive JSON-LD structured data (LocalBusiness, FAQPage, BreadcrumbList, WebPage, WebSite, ItemList, GeoShape)
 * 4. Outputs to dist/public/service-areas/{slug}.html
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

// Constants
const SITE_URL = 'https://www.commercialshotblasting.co.uk';
const PHONE = '07970 566409';
const EMAIL = 'info@commercialshotblasting.co.uk';
const LOGO = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/ATzSAikYtVvYiYkQ.svg';
const HERO_IMAGE = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png';
const BUSINESS_NAME = 'Commercial Shot Blasting';

// Coordinates for key locations
const locCoords = {
  "birmingham": [52.4862, -1.8904], "wolverhampton": [52.587, -2.1288], "coventry": [52.4068, -1.5197],
  "worcester": [52.1936, -2.2216], "stratford-upon-avon": [52.1917, -1.7083], "nottingham": [52.9548, -1.1581],
  "leicester": [52.6369, -1.1398], "derby": [52.9225, -1.4746], "northampton": [52.2405, -0.9027],
  "chesterfield": [53.235, -1.421], "lincoln": [53.2307, -0.5406], "sheffield": [53.3811, -1.4701],
  "leeds": [53.8008, -1.5491], "liverpool": [53.4084, -2.9916], "manchester": [53.4808, -2.2426],
  "chester": [53.193, -2.8931], "norwich": [52.6309, 1.2974], "cambridge": [52.2053, 0.1218],
  "peterborough": [52.5695, -0.2405], "ipswich": [52.0567, 1.1482], "bristol": [51.4545, -2.5879],
  "gloucester": [51.8642, -2.2382], "swindon": [51.5558, -1.7797], "oxford": [51.752, -1.2577],
  "milton-keynes": [52.0406, -0.7594], "shrewsbury": [52.7077, -2.754], "hereford": [52.0565, -2.716],
  "wrexham": [53.0469, -2.9927], "cardiff": [51.4816, -3.1791], "stoke-on-trent": [53.0027, -2.1794],
};

/**
 * Generate JSON-LD schemas for a location page
 */
function generateSchemas(slug, name, url) {
  const coords = locCoords[slug];
  const lat = coords ? coords[0] : null;
  const lng = coords ? coords[1] : null;

  const schemas = [];

  // 1. LocalBusiness
  schemas.push({
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "name": `${BUSINESS_NAME} - ${name}`,
    "url": url,
    "logo": { "@type": "ImageObject", "url": LOGO, "width": 200, "height": 60 },
    "image": [HERO_IMAGE],
    "telephone": PHONE,
    "email": EMAIL,
    "priceRange": "££",
    "currenciesAccepted": "GBP",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer, Invoice",
    "description": `Professional mobile shot blasting services in ${name} and surrounding areas. We provide specialist surface preparation for structural steel, containers, cladding, fire escapes, and all industrial metalwork.`,
    "slogan": `Professional Mobile Shot Blasting Services in ${name}`,
    "address": { "@type": "PostalAddress", "addressLocality": name, "addressCountry": "GB" },
    ...(lat && lng ? { "geo": { "@type": "GeoCoordinates", "latitude": lat, "longitude": lng } } : {}),
    "areaServed": { "@type": "City", "name": name },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "14:00" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Shot Blasting Services in ${name}`,
      "itemListElement": [
        { "@type": "OfferCatalog", "name": "Structural Steelwork", "description": `Shot blasting for steel frames and structures in ${name}` },
        { "@type": "OfferCatalog", "name": "Container Blasting", "description": `Specialist blasting for shipping containers in ${name}` },
        { "@type": "OfferCatalog", "name": "Cladding Restoration", "description": `Plastisol and paint removal from factory cladding in ${name}` },
        { "@type": "OfferCatalog", "name": "Floor Preparation", "description": `Industrial floor shot blasting in ${name}` }
      ]
    },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127", "bestRating": "5", "worstRating": "1" }
  });

  // 2. FAQPage
  schemas.push({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Do you provide shot blasting in ${name}?`,
        "acceptedAnswer": { "@type": "Answer", "text": `Yes, we have dedicated mobile shot blasting teams covering ${name} and the surrounding area. We can be on-site within days of your enquiry. Our ${name} team operates 9 mobile units across England and Wales.` }
      },
      {
        "@type": "Question",
        "name": `How much does shot blasting cost in ${name}?`,
        "acceptedAnswer": { "@type": "Answer", "text": `Costs depend on the project size, surface type, and accessibility. We provide free, no-obligation quotes for all ${name} projects. Call ${PHONE} for a quick estimate. Most projects range from £500 to £5,000 depending on scope.` }
      },
      {
        "@type": "Question",
        "name": `What services do you offer in ${name}?`,
        "acceptedAnswer": { "@type": "Answer", "text": `We offer the full range of shot blasting services in ${name} including structural steel, containers, cladding, fire escapes, floor preparation, pipework, telecom towers, and more. All services are mobile - we come to your site.` }
      },
      {
        "@type": "Question",
        "name": `How quickly can you start a project in ${name}?`,
        "acceptedAnswer": { "@type": "Answer", "text": `We typically provide quotes within 24 hours and can be on-site in ${name} within 2-5 working days depending on project size and our current schedule.` }
      },
      {
        "@type": "Question",
        "name": `What surface finish do you achieve in ${name}?`,
        "acceptedAnswer": { "@type": "Answer", "text": "We typically achieve SA2.5 (near-white metal) finish which is the industry standard for structural steel preparation before protective coating application. We can also provide SA3 (white metal) finish if required." }
      },
      {
        "@type": "Question",
        "name": `Do you provide containment and cleanup in ${name}?`,
        "acceptedAnswer": { "@type": "Answer", "text": `Yes, all our ${name} projects include full containment to protect surrounding areas and thorough cleanup after completion. We leave your site clean and ready for the next stage of work.` }
      }
    ]
  });

  // 3. BreadcrumbList
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Service Areas", "item": `${SITE_URL}/service-areas` },
      { "@type": "ListItem", "position": 3, "name": name, "item": url }
    ]
  });

  // 4. WebPage
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    "url": url,
    "name": `Shot Blasting ${name} | Commercial Shot Blasting`,
    "description": `Professional mobile shot blasting services in ${name}. Rust removal, surface preparation, and industrial cleaning for commercial and industrial clients.`,
    "isPartOf": { "@type": "WebSite", "name": BUSINESS_NAME, "url": SITE_URL },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Service Areas", "item": `${SITE_URL}/service-areas` },
        { "@type": "ListItem", "position": 3, "name": name, "item": url }
      ]
    },
    "inLanguage": "en-GB",
    "potentialAction": [{ "@type": "ReadAction", "target": [url] }]
  });

  // 5. WebSite with SearchAction
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": BUSINESS_NAME,
    "url": SITE_URL,
    "description": "Professional mobile shot blasting services across England and Wales",
    "publisher": { "@type": "Organization", "name": BUSINESS_NAME },
    "potentialAction": {
      "@type": "SearchAction",
      "target": { "@type": "EntryPoint", "urlTemplate": `${SITE_URL}/service-areas/{search_term_string}` },
      "query-input": "required name=search_term_string"
    }
  });

  // 6. ItemList of services
  schemas.push({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Shot Blasting Services Available in ${name}`,
    "description": `Full list of professional shot blasting and surface preparation services available in ${name}`,
    "numberOfItems": 8,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Structural Steel Shot Blasting", "url": `${SITE_URL}/services/structural-steel-shot-blasting` },
      { "@type": "ListItem", "position": 2, "name": "Container Shot Blasting", "url": `${SITE_URL}/services/container-shot-blasting` },
      { "@type": "ListItem", "position": 3, "name": "Factory Cladding Restoration", "url": `${SITE_URL}/services/factory-cladding-shot-blasting` },
      { "@type": "ListItem", "position": 4, "name": "Industrial Floor Preparation", "url": `${SITE_URL}/services/floor-shot-blasting` },
      { "@type": "ListItem", "position": 5, "name": "Fire Escape Shot Blasting", "url": `${SITE_URL}/services/fire-escape-shot-blasting` },
      { "@type": "ListItem", "position": 6, "name": "Pipework & Steelwork Blasting", "url": `${SITE_URL}/services/pipework-shot-blasting` },
      { "@type": "ListItem", "position": 7, "name": "Telecom Tower Blasting", "url": `${SITE_URL}/services/telecom-tower-shot-blasting` },
      { "@type": "ListItem", "position": 8, "name": "Agricultural Equipment Blasting", "url": `${SITE_URL}/services/agricultural-shot-blasting` }
    ]
  });

  // 7. GeoShape service coverage (only for locations with known coordinates)
  if (lat && lng) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `Mobile Shot Blasting Coverage - ${name}`,
      "description": `We cover ${name} and all surrounding areas within approximately 30 miles. Our mobile units travel to your site.`,
      "provider": { "@type": "LocalBusiness", "name": BUSINESS_NAME, "telephone": PHONE },
      "areaServed": [
        { "@type": "City", "name": name },
        { "@type": "GeoShape", "circle": `${lat} ${lng} 48280` }
      ],
      "serviceType": "Mobile Shot Blasting",
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": url,
        "servicePhone": PHONE,
        "availableLanguage": "English"
      },
      "offers": {
        "@type": "Offer",
        "name": `Free Site Survey in ${name}`,
        "price": "0",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock"
      }
    });
  }

  // 8. Organization
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": BUSINESS_NAME,
    "url": SITE_URL,
    "logo": { "@type": "ImageObject", "url": LOGO, "width": 200, "height": 60 },
    "telephone": PHONE,
    "email": EMAIL,
    "foundingDate": "2015",
    "description": "Professional mobile shot blasting company providing specialist surface preparation services across England and Wales.",
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "England" },
      { "@type": "AdministrativeArea", "name": "Wales" }
    ],
    "contactPoint": [
      { "@type": "ContactPoint", "telephone": PHONE, "contactType": "sales", "areaServed": "GB", "availableLanguage": "English" },
      { "@type": "ContactPoint", "email": EMAIL, "contactType": "customer support", "areaServed": "GB", "availableLanguage": "English" }
    ]
  });

  return schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n    ');
}

/**
 * Inject meta tags, canonical URL, and JSON-LD into HTML
 */
function injectMetaTags(html, location) {
  const title = `Shot Blasting ${location.name} | Industrial Services`;
  const description = `Shot Blasting ${location.name} - Local experts in rust removal & industrial cleaning. Same-day response available. Call 07970 566409`;
  const url = `${SITE_URL}/service-areas/${location.slug}`;
  const image = HERO_IMAGE;

  // Remove existing meta tags for a clean slate
  html = html.replace(/<meta\s+name="description"[^>]*>/gi, '');
  html = html.replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '');
  html = html.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '');
  html = html.replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '');
  // Remove any existing canonical tags
  html = html.replace(/<link\s+rel="canonical"[^>]*>/gi, '');
  // Remove any existing JSON-LD script tags
  html = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

  const jsonLd = generateSchemas(location.slug, location.name, url);

  const metaTags = `<title>${title}</title>
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="en-gb" href="${url}" />
    <link rel="alternate" hreflang="en" href="${url}" />
    <link rel="alternate" hreflang="x-default" href="${url}" />
    <meta name="description" content="${description}" />
    <meta name="geo.region" content="GB" />
    <meta name="geo.placename" content="${location.name}" />
    <meta name="language" content="en-GB" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${image}" />
    <meta property="og:locale" content="en_GB" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    ${jsonLd}`;

  // Replace the title tag with all meta tags and JSON-LD
  html = html.replace(/<title>.*?<\/title>/, metaTags);

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
    
    if (successCount % 50 === 0) {
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
console.log(`   🔗 Each page now includes: canonical URL, JSON-LD schemas (LocalBusiness, FAQPage, BreadcrumbList, WebPage, WebSite, ItemList, GeoShape, Organization)`);
