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
// Read the base HTML template from the BUILT dist/public/index.html
// Pre-rendered files go to dist/public/service-areas/ — served directly by express.static
const indexHtmlPath = path.join(projectRoot, 'dist/public/index.html');
if (!fs.existsSync(indexHtmlPath)) {
  console.error('❌ Error: client/index.html not found.');
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

// Write pre-rendered HTML files to dist/public/service-areas/
// express.static serves these directly — full HTML, no runtime processing needed.
const serviceAreasDir = path.join(projectRoot, 'dist/public/service-areas');
if (!fs.existsSync(serviceAreasDir)) {
  fs.mkdirSync(serviceAreasDir, { recursive: true });
}

// Constants
const SITE_URL = 'https://commercialshotblasting.co.uk';
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
function generateSchemas(slug, name, url, county, region, faqs) {
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
    "description": `Professional mobile shot blasting services in ${name}${county ? `, ${county}` : ''} and surrounding areas. We provide specialist surface preparation for structural steel, containers, cladding, fire escapes, and all industrial metalwork.`,
    "slogan": `Professional Mobile Shot Blasting Services in ${name}`,
    "address": { "@type": "PostalAddress", "addressLocality": name, ...(county ? { "addressRegion": county } : {}), "addressCountry": "GB" },
    ...(lat && lng ? { "geo": { "@type": "GeoCoordinates", "latitude": lat, "longitude": lng } } : {}),
    "areaServed": [
      { "@type": "City", "name": name },
      ...(county ? [{ "@type": "AdministrativeArea", "name": county }] : []),
      ...(region && region !== county ? [{ "@type": "AdministrativeArea", "name": region }] : []),
    ],
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
    "name": `Shot Blasting Services in ${name} | Commercial Shot Blasting`,
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
 * Escape HTML special characters
 */
function esc(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

/**
 * Generate full visible body HTML for a location page
 * This is what Google reads — all the content visible on the page before JS executes
 */
function generateBodyHTML(location) {
  const { slug, name, county, region, description, faqs } = location;
  const url = `${SITE_URL}/service-areas/${slug}`;
  const countyLine = county ? `, ${esc(county)}` : '';
  const regionLine = esc(region || 'the UK');

  const servicesHtml = [
    ['Structural Steel Frames', `Shot blasting for steel frames, beams, and structures in ${esc(name)}.`],
    ['Shipping Containers', `Full interior and exterior blasting for containers in ${esc(name)}.`],
    ['Factory Cladding', `Plastisol and paint removal from factory cladding panels in ${esc(name)}.`],
    ['Concrete Floors', `Industrial floor preparation for coatings and screeds in ${esc(name)}.`],
    ['Fire Escapes', `Rust removal and surface preparation for fire escape steelwork in ${esc(name)}.`],
    ['Plant &amp; Machinery', `Mobile blasting for plant, machinery, and agricultural equipment.`],
    ['Pipework &amp; Steelwork', `Blasting for pipework, fabrications, and general steelwork.`],
    ['Agricultural Equipment', `Specialist blasting for farm machinery and equipment.`],
  ].map(([t, d]) => `<div itemscope itemtype="https://schema.org/Service"><h3 itemprop="name">${t}</h3><p itemprop="description">${d}</p></div>`).join('');

  const faqList = (faqs && faqs.length > 0) ? faqs : [
    { question: `Do you provide shot blasting services in ${name}?`, answer: `Yes, we provide comprehensive mobile shot blasting services throughout ${name}${countyLine} and the surrounding area.` },
    { question: `How much does shot blasting cost in ${name}?`, answer: `Costs depend on project size, surface type, and accessibility. We provide free, no-obligation quotes. Call ${PHONE} for a quick estimate.` },
    { question: `What services do you offer in ${name}?`, answer: `We offer structural steel, containers, cladding, fire escapes, floor preparation, pipework, plant and machinery blasting in ${name}.` },
    { question: `How quickly can you start in ${name}?`, answer: `We typically provide quotes within 24 hours and can be on-site in ${name} within 2-5 working days.` },
  ];
  const faqsHtml = faqList.map(faq => `<div itemscope itemtype="https://schema.org/Question"><h3 itemprop="name">${esc(faq.question)}</h3><div itemscope itemtype="https://schema.org/Answer" itemprop="acceptedAnswer"><p itemprop="text">${esc(faq.answer)}</p></div></div>`).join('');

  return `<div id="ssr-location-content" itemscope itemtype="https://schema.org/WebPage" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;"><nav aria-label="Breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList"><ol><li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a itemprop="item" href="${SITE_URL}"><span itemprop="name">Home</span></a><meta itemprop="position" content="1"/></li><li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a itemprop="item" href="${SITE_URL}/service-areas"><span itemprop="name">Service Areas</span></a><meta itemprop="position" content="2"/></li><li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a itemprop="item" href="${url}"><span itemprop="name">${esc(name)}</span></a><meta itemprop="position" content="3"/></li></ol></nav><article itemscope itemtype="https://schema.org/LocalBusiness"><h1 itemprop="name">Shot Blasting Services in ${esc(name)}${countyLine}</h1><p itemprop="description">${esc(description || `Professional mobile shot blasting services in ${name}${countyLine}. Rust removal, surface preparation, and industrial cleaning.`)}</p><div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress"><span itemprop="addressLocality">${esc(name)}</span>${county ? `<span itemprop="addressRegion">${esc(county)}</span>` : ''}<span itemprop="addressCountry">GB</span></div><span itemprop="telephone">${PHONE}</span><span itemprop="email">${EMAIL}</span><section><h2>Why Choose Commercial Shot Blasting in ${esc(name)}?</h2><p>We are specialists in mobile shot blasting, serving ${esc(name)}${countyLine} and the wider ${regionLine} region. Our fully equipped mobile units travel directly to your site.</p><ul><li>Mobile units come to your site in ${esc(name)} — no transport costs</li><li>Experienced team with 10+ years in industrial surface preparation</li><li>All work carried out to BS EN ISO 8501-1 standards</li><li>Free, no-obligation site surveys and quotations</li><li>Same-day response available for urgent projects</li></ul></section><section><h2>Our Shot Blasting Services in ${esc(name)}</h2><div itemscope itemtype="https://schema.org/ItemList">${servicesHtml}</div></section><section itemscope itemtype="https://schema.org/FAQPage"><h2>Frequently Asked Questions — Shot Blasting in ${esc(name)}</h2>${faqsHtml}</section><section><h2>Get a Free Quote for Shot Blasting in ${esc(name)}</h2><p>Contact our team for a free, no-obligation quotation covering ${esc(name)}${countyLine} and all surrounding areas.</p><p>Call <a href="tel:${PHONE.replace(/\s/g,'')}">${PHONE}</a> or email <a href="mailto:${EMAIL}">${EMAIL}</a>.</p><a href="${SITE_URL}/contact">Request a Free Quote</a></section></article></div>`;
}

/**
 * Inject meta tags, canonical URL, JSON-LD, and full body HTML into the base template
 */
function injectMetaTags(html, location) {
  const { slug, name, county, region, description, faqs } = location;
  const title = `Shot Blasting Services in ${name}${county ? `, ${county}` : ''} | ${BUSINESS_NAME}`;
  const metaDesc = description || `Professional shot blasting services in ${name}${county ? `, ${county}` : ''} — mobile rust removal & surface preparation for commercial and industrial clients. Free quote. Call ${PHONE}`;
  const url = `${SITE_URL}/service-areas/${slug}`;
  const image = HERO_IMAGE;

  // Remove existing head elements for a clean slate
  html = html.replace(/<title>.*?<\/title>/gi, '');
  html = html.replace(/<meta\s+name="description"[^>]*>/gi, '');
  html = html.replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '');
  html = html.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '');
  html = html.replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '');
  html = html.replace(/<link\s+rel="canonical"[^>]*>/gi, '');
  html = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<script\s+src="\/jsonld-inject\.js"><\/script>/gi, '');
  html = html.replace(/<script\s+src="\/schema-bootstrap\.js"[^>]*><\/script>/gi, '');
  html = html.replace(/<script\s+src="\/schema-service\.js"[^>]*><\/script>/gi, '');

  const jsonLd = generateSchemas(slug, name, url, county, region, faqs);

  const headTags = `<title>${esc(title)}</title>
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="en-gb" href="${url}" />
    <link rel="alternate" hreflang="en" href="${url}" />
    <link rel="alternate" hreflang="x-default" href="${url}" />
    <meta name="description" content="${esc(metaDesc)}" />
    <meta name="geo.region" content="GB" />
    <meta name="geo.placename" content="${esc(name)}" />
    <meta name="language" content="en-GB" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(metaDesc)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${image}" />
    <meta property="og:locale" content="en_GB" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(metaDesc)}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${esc(title)} — Commercial Shot Blasting" />
    ${jsonLd}`;

  // Insert head tags before </head>
  html = html.replace('</head>', `${headTags}\n</head>`);

  // Insert full body HTML — replace SSR_CONTENT placeholder or insert before root div
  const bodyHtml = generateBodyHTML(location);
  if (html.includes('<!--SSR_CONTENT-->')) {
    html = html.replace('<!--SSR_CONTENT-->', bodyHtml);
  } else {
    html = html.replace('<div id="root">', `${bodyHtml}\n  <div id="root">`);
  }

  return html;
}

// Generate HTML file for each location
let successCount = 0;
let errorCount = 0;

for (const location of locations) {
  try {
    const locationHtml = injectMetaTags(baseHtml, location);
    // Write as .html for direct access
    const outputPathHtml = path.join(serviceAreasDir, `${location.slug}.html`);
    fs.writeFileSync(outputPathHtml, locationHtml, 'utf-8');
    // Also write as extensionless file so static server matches /service-areas/nottingham directly
    const outputPath = path.join(serviceAreasDir, location.slug);
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
