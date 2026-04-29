#!/usr/bin/env node
/**
 * Pre-rendering script for service pages
 * Generates static HTML files with full body content, meta tags, canonical URLs, and JSON-LD schemas
 *
 * Usage: node scripts/prerender-services.mjs
 *
 * This script:
 * 1. Reads the base index.html from dist/public
 * 2. Reads service data from scripts/services_data.json
 * 3. For each service, creates a static HTML file with:
 *    - Service-specific title, description, OG and Twitter tags
 *    - Canonical link tag
 *    - Full visible body HTML (h1, breadcrumb, tagline, description, process steps, FAQs, CTA)
 *    - Comprehensive JSON-LD structured data (Service, FAQPage, HowTo, BreadcrumbList, WebPage, Organization)
 * 4. Outputs to dist/public/services/{slug} (extensionless) and dist/public/services/{slug}.html
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

// Read service data
const servicesJsonPath = path.join(projectRoot, 'scripts/services_data.json');
if (!fs.existsSync(servicesJsonPath)) {
  console.error('❌ Error: scripts/services_data.json not found.');
  process.exit(1);
}
const services = JSON.parse(fs.readFileSync(servicesJsonPath, 'utf-8'));
console.log(`📄 Found ${services.length} services to pre-render`);

// Output directory
const servicesDir = path.join(projectRoot, 'dist/public/services');
if (!fs.existsSync(servicesDir)) {
  fs.mkdirSync(servicesDir, { recursive: true });
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
 * Generate JSON-LD schemas for a service page
 */
function generateSchemas(service) {
  const { id, title, tagline, description, faqs, processSteps } = service;
  const url = `${SITE_URL}/services/${id}`;

  const faqSchema = faqs && faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  } : null;

  const howToSchema = processSteps && processSteps.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How ${BUSINESS_NAME} Delivers ${title}`,
    description: `Step-by-step process for our ${title.toLowerCase()} service`,
    step: processSteps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.title,
      text: step.description
    }))
  } : null;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description: description || `Professional ${title.toLowerCase()} services across the UK`,
    url,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_NAME,
      telephone: PHONE,
      email: EMAIL,
      url: SITE_URL,
      logo: LOGO,
      image: HERO_IMAGE,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'GB'
      }
    },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    serviceType: 'Shot Blasting',
    category: 'Industrial Surface Preparation'
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: title, item: url }
    ]
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${title} | ${BUSINESS_NAME}`,
    description: description || `Professional ${title.toLowerCase()} services across the UK`,
    url,
    breadcrumb: breadcrumbSchema,
    isPartOf: { '@type': 'WebSite', url: SITE_URL, name: BUSINESS_NAME }
  };

  const schemas = [serviceSchema, breadcrumbSchema, webPageSchema];
  if (faqSchema) schemas.push(faqSchema);
  if (howToSchema) schemas.push(howToSchema);
  return schemas;
}

/**
 * Generate full visible body HTML for a service page
 */
function generateBodyHtml(service) {
  const { id, title, tagline, description, faqs, processSteps } = service;
  const url = `${SITE_URL}/services/${id}`;

  const faqHtml = faqs && faqs.length > 0 ? `
    <section class="ssr-faqs" itemscope itemtype="https://schema.org/FAQPage">
      <h2>Frequently Asked Questions — ${escHtml(title)}</h2>
      ${faqs.map(faq => `
        <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 itemprop="name">${escHtml(faq.question)}</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text">${escHtml(faq.answer)}</p>
          </div>
        </div>`).join('')}
    </section>` : '';

  const stepsHtml = processSteps && processSteps.length > 0 ? `
    <section class="ssr-process">
      <h2>Our ${escHtml(title)} Process</h2>
      <ol>
        ${processSteps.map(step => `
          <li>
            <strong>${escHtml(step.title)}</strong>
            <p>${escHtml(step.description)}</p>
          </li>`).join('')}
      </ol>
    </section>` : '';

  return `
<div id="ssr-service-content" class="ssr-service-content" aria-hidden="true" style="position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;">
  <nav aria-label="Breadcrumb" class="ssr-breadcrumb">
    <ol itemscope itemtype="https://schema.org/BreadcrumbList">
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="${SITE_URL}"><span itemprop="name">Home</span></a>
        <meta itemprop="position" content="1" />
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="${SITE_URL}/services"><span itemprop="name">Services</span></a>
        <meta itemprop="position" content="2" />
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="${url}"><span itemprop="name">${escHtml(title)}</span></a>
        <meta itemprop="position" content="3" />
      </li>
    </ol>
  </nav>

  <article itemscope itemtype="https://schema.org/Service">
    <h1 itemprop="name">${escHtml(title)} | ${BUSINESS_NAME}</h1>
    ${tagline ? `<p class="ssr-tagline"><strong>${escHtml(tagline)}</strong></p>` : ''}
    ${description ? `<p itemprop="description">${escHtml(description)}</p>` : ''}

    <div itemprop="provider" itemscope itemtype="https://schema.org/LocalBusiness">
      <meta itemprop="name" content="${BUSINESS_NAME}" />
      <meta itemprop="telephone" content="${PHONE}" />
      <meta itemprop="email" content="${EMAIL}" />
      <meta itemprop="url" content="${SITE_URL}" />
    </div>

    ${stepsHtml}
    ${faqHtml}

    <section class="ssr-cta">
      <h2>Get a Free Quote for ${escHtml(title)}</h2>
      <p>Contact ${BUSINESS_NAME} today for professional ${escHtml(title.toLowerCase())} services across the UK.</p>
      <p>Call us on <a href="tel:${PHONE.replace(/\s/g, '')}">${PHONE}</a> or email <a href="mailto:${EMAIL}">${EMAIL}</a></p>
    </section>
  </article>
</div>`;
}

/**
 * Inject meta tags, canonical, JSON-LD schemas, and body HTML into the base HTML
 */
function injectServicePage(html, service) {
  const { id, title, tagline, description } = service;
  const url = `${SITE_URL}/services/${id}`;
  const pageTitle = `${title} | ${BUSINESS_NAME} | UK Industrial Surface Preparation`;
  const metaDesc = description
    ? description.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 155) + '...'
    : `Professional ${title} services across the UK. ${BUSINESS_NAME} — expert industrial surface preparation.`;
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
  const schemas = generateSchemas(service);
  const schemaScripts = schemas.map(s =>
    `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`
  ).join('\n');

  // Body HTML
  const bodyHtml = generateBodyHtml(service);

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

// Generate HTML file for each service
let successCount = 0;
let errorCount = 0;

for (const service of services) {
  try {
    const serviceHtml = injectServicePage(baseHtml, service);

    // Write as extensionless file so static server matches /services/structural-steel-frames directly
    const outputPath = path.join(servicesDir, service.id);
    fs.writeFileSync(outputPath, serviceHtml, 'utf-8');

    successCount++;
    console.log(`✅ Generated: /services/${service.id}`);
  } catch (error) {
    console.error(`❌ Error generating page for ${service.id}:`, error.message);
    errorCount++;
  }
}

console.log(`\n🎉 Service pre-rendering complete!`);
console.log(`   ✅ Successfully generated: ${successCount} services (extensionless files only)`);
if (errorCount > 0) {
  console.log(`   ❌ Errors: ${errorCount} pages`);
}
console.log(`   📁 Output directory: ${servicesDir}`);
