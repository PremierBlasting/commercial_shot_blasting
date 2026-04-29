#!/usr/bin/env node
/**
 * Pre-rendering script for county pages
 * Generates static HTML files with full body content, meta tags, canonical URLs, and JSON-LD schemas
 *
 * Usage: node scripts/prerender-counties.mjs
 *
 * This script:
 * 1. Reads the base index.html from dist/public
 * 2. Reads county data from scripts/counties_data.json
 * 3. For each county, creates a static HTML file with:
 *    - County-specific title, description, OG and Twitter tags
 *    - Canonical link tag
 *    - Full visible body HTML (h1, breadcrumb, description, major towns, industries, FAQs, CTA)
 *    - Comprehensive JSON-LD structured data (LocalBusiness, FAQPage, BreadcrumbList, WebPage)
 * 4. Outputs to dist/public/counties/{slug} (extensionless) and dist/public/counties/{slug}.html
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Read the base HTML template from the BUILT dist/public/index.html
const indexHtmlPath = path.join(projectRoot, 'dist/public/index.html');
if (!fs.existsSync(indexHtmlPath)) {
  console.error('❌ Error: dist/public/index.html not found. Run `pnpm run build:client` first.');
  process.exit(1);
}
const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

// Read county data
const countiesJsonPath = path.join(projectRoot, 'scripts/counties_data.json');
if (!fs.existsSync(countiesJsonPath)) {
  console.error('❌ Error: scripts/counties_data.json not found.');
  process.exit(1);
}
const counties = JSON.parse(fs.readFileSync(countiesJsonPath, 'utf-8'));
console.log(`📄 Found ${counties.length} counties to pre-render`);

// Output directory
const countiesDir = path.join(projectRoot, 'dist/public/counties');
if (!fs.existsSync(countiesDir)) {
  fs.mkdirSync(countiesDir, { recursive: true });
}

// Constants
const SITE_URL = 'https://commercialshotblasting.co.uk';
const PHONE = '07970 566409';
const EMAIL = 'info@commercialshotblasting.co.uk';
const LOGO = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/ATzSAikYtVvYiYkQ.svg';
const HERO_IMAGE = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png';
const BUSINESS_NAME = 'Commercial Shot Blasting';

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Generate JSON-LD schemas for a county page
 */
function generateSchemas(county) {
  const { slug, name, description, faqs, majorTowns, latitude, longitude } = county;
  const url = `${SITE_URL}/counties/${slug}`;

  const faqSchema = faqs && faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  } : null;

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS_NAME,
    description: `Professional shot blasting services across ${name}. Mobile units covering all major towns and villages.`,
    url: url,
    telephone: PHONE,
    email: EMAIL,
    logo: LOGO,
    image: HERO_IMAGE,
    areaServed: [
      { '@type': 'AdministrativeArea', name: name },
      ...(majorTowns || []).map(town => ({ '@type': 'City', name: town }))
    ],
    ...(latitude && longitude ? {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: latitude,
        longitude: longitude
      }
    } : {}),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '14:00'
      }
    ],
    priceRange: '££',
    currenciesAccepted: 'GBP',
    paymentAccepted: 'Cash, Bank Transfer, Credit Card'
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Counties', item: `${SITE_URL}/counties` },
      { '@type': 'ListItem', position: 3, name: name, item: url }
    ]
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Shot Blasting Services in ${name} | ${BUSINESS_NAME}`,
    description: description || `Professional shot blasting services across ${name}.`,
    url: url,
    breadcrumb: breadcrumbSchema,
    mainEntity: localBusinessSchema,
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: LOGO }
    }
  };

  return [localBusinessSchema, faqSchema, breadcrumbSchema, webPageSchema].filter(Boolean);
}

/**
 * Generate the body HTML for a county page
 */
function generateBodyHtml(county) {
  const { slug, name, description, faqs, majorTowns, industries, region } = county;
  const url = `${SITE_URL}/counties/${slug}`;
  const title = `Shot Blasting Services in ${name}`;

  // Build FAQ HTML with Schema.org microdata
  let faqHtml = '';
  if (faqs && faqs.length > 0) {
    const faqItems = faqs.map(faq => `
    <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <h3 itemprop="name">${escHtml(faq.question)}</h3>
      <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <p itemprop="text">${escHtml(faq.answer)}</p>
      </div>
    </div>`).join('');
    faqHtml = `
  <section class="ssr-faqs" itemscope itemtype="https://schema.org/FAQPage">
    <h2>Frequently Asked Questions — Shot Blasting in ${escHtml(name)}</h2>
    ${faqItems}
  </section>`;
  }

  // Major towns list
  const townsHtml = majorTowns && majorTowns.length > 0
    ? `<p>We serve all major towns and surrounding areas including <strong>${majorTowns.map(escHtml).join(', ')}</strong> and throughout ${escHtml(name)}.</p>`
    : '';

  // Industries served
  const industriesHtml = industries && industries.length > 0
    ? `<ul class="ssr-industries">${industries.map(i => `<li>${escHtml(i)}</li>`).join('')}</ul>`
    : '';

  return `<div class="ssr-content" aria-hidden="false" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;">
  <nav aria-label="Breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
    <ol>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="${SITE_URL}"><span itemprop="name">Home</span></a>
        <meta itemprop="position" content="1" />
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="${SITE_URL}/counties"><span itemprop="name">Counties</span></a>
        <meta itemprop="position" content="2" />
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="${url}"><span itemprop="name">${escHtml(name)}</span></a>
        <meta itemprop="position" content="3" />
      </li>
    </ol>
  </nav>
  <article itemscope itemtype="https://schema.org/LocalBusiness">
    <h1 itemprop="name">${escHtml(title)}</h1>
    ${description ? `<p itemprop="description">${escHtml(description)}</p>` : ''}
    ${region ? `<p>Serving the <strong>${escHtml(region)}</strong> region of England.</p>` : ''}
    ${townsHtml}
    <div itemprop="telephone" content="${PHONE}"><meta itemprop="telephone" content="${PHONE}" /></div>
    <div itemprop="url" content="${SITE_URL}"><meta itemprop="url" content="${SITE_URL}" /></div>
    <section class="ssr-services">
      <h2>Shot Blasting Services Available in ${escHtml(name)}</h2>
      <ul>
        <li><a href="${SITE_URL}/services/structural-steel-frames">Structural Steel Frame Blasting</a></li>
        <li><a href="${SITE_URL}/services/plant-machinery">Plant &amp; Machinery Blasting</a></li>
        <li><a href="${SITE_URL}/services/rust-removal">Rust Removal Services</a></li>
        <li><a href="${SITE_URL}/services/concrete-floor-preparation">Concrete Floor Preparation</a></li>
        <li><a href="${SITE_URL}/services/agricultural-equipment">Agricultural Equipment Blasting</a></li>
        <li><a href="${SITE_URL}/services/vehicle-chassis">Vehicle Chassis Blasting</a></li>
      </ul>
    </section>
    ${industries && industries.length > 0 ? `
    <section class="ssr-industries-served">
      <h2>Industries We Serve in ${escHtml(name)}</h2>
      ${industriesHtml}
    </section>` : ''}
    ${faqHtml}
    <section class="ssr-cta">
      <h2>Get a Free Quote for Shot Blasting in ${escHtml(name)}</h2>
      <p>Contact ${BUSINESS_NAME} today for professional shot blasting services across ${escHtml(name)}.</p>
      <p>Call us on <a href="tel:${PHONE.replace(/\s/g, '')}">${PHONE}</a> or email <a href="mailto:${EMAIL}">${EMAIL}</a></p>
    </section>
  </article>
</div>`;
}

/**
 * Inject meta tags, canonical, JSON-LD schemas, and body HTML into the base HTML
 */
function injectCountyPage(html, county) {
  const { slug, name, description } = county;
  const url = `${SITE_URL}/counties/${slug}`;
  const pageTitle = `Shot Blasting Services in ${name} | ${BUSINESS_NAME}`;
  const metaDesc = description
    ? description.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 155) + '...'
    : `Professional shot blasting services across ${name}. ${BUSINESS_NAME} — mobile units covering all major towns.`;
  const ogImage = HERO_IMAGE;

  // Build <head> injections
  const headInjection = `
  <title>${escHtml(pageTitle)}</title>
  <meta name="description" content="${escHtml(metaDesc)}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:title" content="${escHtml(pageTitle)}" />
  <meta property="og:description" content="${escHtml(metaDesc)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="${ogImage}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escHtml(pageTitle)}" />
  <meta name="twitter:description" content="${escHtml(metaDesc)}" />
  <meta name="twitter:image" content="${ogImage}" />`;

  // JSON-LD schemas
  const schemas = generateSchemas(county);
  const schemaScripts = schemas.map(s =>
    `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`
  ).join('\n');

  // Body HTML
  const bodyHtml = generateBodyHtml(county);

  // Replace <title> tag
  let result = html.replace(/<title>[^<]*<\/title>/, `<title>${escHtml(pageTitle)}</title>`);

  // Inject meta/canonical/OG before </head>
  result = result.replace('</head>', `${headInjection}\n${schemaScripts}\n</head>`);

  // Inject body HTML — replace the SSR_CONTENT placeholder if present, otherwise inject before root div
  if (result.includes('<!--SSR_CONTENT-->')) {
    result = result.replace('<!--SSR_CONTENT-->', bodyHtml);
  } else {
    result = result.replace('<div id="root">', `${bodyHtml}\n<div id="root">`);
  }

  return result;
}

// Generate HTML file for each county
let successCount = 0;
let errorCount = 0;

for (const county of counties) {
  try {
    const countyHtml = injectCountyPage(baseHtml, county);

    // Write as extensionless file so static server matches /counties/bedfordshire directly
    const outputPath = path.join(countiesDir, county.slug);
    fs.writeFileSync(outputPath, countyHtml, 'utf-8');

    successCount++;
    console.log(`✅ Generated: /counties/${county.slug}`);
  } catch (error) {
    console.error(`❌ Error generating page for ${county.slug}:`, error.message);
    errorCount++;
  }
}

console.log(`\n🎉 County pre-rendering complete!`);
console.log(`   ✅ Successfully generated: ${successCount} counties (extensionless files only)`);
if (errorCount > 0) {
  console.log(`   ❌ Errors: ${errorCount} pages`);
}
console.log(`   📁 Output directory: ${countiesDir}`);
