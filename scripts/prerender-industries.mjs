#!/usr/bin/env node
/**
 * Pre-rendering script for industry pages
 * Generates static HTML files with full body content, meta tags, canonical URLs, and JSON-LD schemas
 *
 * Usage: node scripts/prerender-industries.mjs
 *
 * This script:
 * 1. Reads the base index.html from dist/public
 * 2. Reads industry data from scripts/industries_data.json
 * 3. For each industry, creates a static HTML file with:
 *    - Industry-specific title, description, OG and Twitter tags
 *    - Canonical link tag
 *    - Full visible body HTML (h1, breadcrumb, description, services, FAQs, CTA)
 *    - Comprehensive JSON-LD structured data (Service, FAQPage, BreadcrumbList, WebPage)
 * 4. Outputs to dist/public/industries/{slug} (extensionless) and dist/public/industries/{slug}.html
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

// Read industry data
const industriesJsonPath = path.join(projectRoot, 'scripts/industries_data.json');
if (!fs.existsSync(industriesJsonPath)) {
  console.error('❌ Error: scripts/industries_data.json not found.');
  process.exit(1);
}
const industriesRaw = JSON.parse(fs.readFileSync(industriesJsonPath, 'utf-8'));
console.log(`📄 Found ${industriesRaw.length} industries to pre-render`);

// Output directory
const industriesDir = path.join(projectRoot, 'dist/public/industries');
if (!fs.existsSync(industriesDir)) {
  fs.mkdirSync(industriesDir, { recursive: true });
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
 * Generate industry-specific FAQs since the source TSX files don't contain FAQ data.
 * These are tailored to each industry but follow a consistent, relevant pattern.
 */
function generateIndustryFaqs(industry) {
  const { name, slug } = industry;
  const nameLower = name.toLowerCase();

  // Industry-specific FAQ sets
  const faqSets = {
    'aerospace': [
      {
        question: 'Do you provide shot blasting services for aerospace components?',
        answer: `Yes, ${BUSINESS_NAME} provides specialist shot blasting services for aerospace components and structures. We work with aerospace-grade materials and follow strict surface preparation standards to ensure components meet the required cleanliness and profile specifications.`
      },
      {
        question: 'What surface preparation standards do you meet for aerospace applications?',
        answer: 'We can achieve surface cleanliness grades to Sa 2.5 and Sa 3 (ISO 8501-1) and specific blast profiles to suit aerospace coating systems. Our team is experienced in working with aluminium alloys, titanium, and high-strength steels used in aerospace manufacturing.'
      },
      {
        question: 'Can you blast aerospace components on-site at our facility?',
        answer: `Yes, our mobile shot blasting units can operate at your aerospace facility. We bring all necessary equipment including containment systems to prevent contamination of sensitive manufacturing environments. Call ${PHONE} to discuss your requirements.`
      },
      {
        question: 'What abrasive media do you use for aerospace shot blasting?',
        answer: 'We select abrasive media based on the specific aerospace material and coating requirements. Options include glass bead blasting for delicate components, aluminium oxide for harder substrates, and steel shot or grit for structural elements. We always recommend the most appropriate media for your application.'
      },
      {
        question: 'How do I get a quote for aerospace shot blasting services?',
        answer: `Contact us on ${PHONE} or email ${EMAIL} with details of your aerospace components, required surface preparation standard, and project timeline. We provide free, no-obligation quotations and can arrange a site survey if needed.`
      }
    ],
    'agriculture': [
      {
        question: 'Do you provide shot blasting for agricultural equipment and machinery?',
        answer: `Yes, ${BUSINESS_NAME} specialises in shot blasting agricultural machinery including tractors, combine harvesters, ploughs, trailers, and farm buildings. Our mobile units come directly to your farm, minimising downtime during quieter periods.`
      },
      {
        question: 'Can you blast farm machinery during the off-season?',
        answer: 'Absolutely. We recommend scheduling agricultural equipment blasting during winter months or between harvest seasons. This allows thorough surface preparation and repainting before the busy season, extending equipment life and preventing costly rust damage.'
      },
      {
        question: 'What types of agricultural surfaces can you blast?',
        answer: 'We can blast virtually any agricultural surface including steel frames, chassis, hoppers, grain stores, livestock buildings, gates, and fencing. Both indoor and outdoor blasting is available, with appropriate containment to protect surrounding areas.'
      },
      {
        question: 'How does shot blasting extend the life of agricultural equipment?',
        answer: 'Shot blasting removes all rust, old paint, and surface contaminants down to bare metal, creating an ideal surface profile for new protective coatings. This prevents further corrosion and significantly extends the working life of expensive agricultural machinery and structures.'
      },
      {
        question: 'How much does agricultural shot blasting cost?',
        answer: `Costs vary depending on the size and condition of the equipment, accessibility, and required surface preparation standard. We provide free, no-obligation quotes — call ${PHONE} or use our online quote request form to get started.`
      }
    ],
    'construction': [
      {
        question: 'Do you provide shot blasting services for construction projects?',
        answer: `Yes, ${BUSINESS_NAME} provides shot blasting services for the construction industry including structural steelwork, concrete floors, bridge components, and building facades. We work with main contractors, steelwork fabricators, and specialist subcontractors across the UK.`
      },
      {
        question: 'Can you blast structural steelwork on construction sites?',
        answer: 'Yes, our mobile shot blasting units are designed for on-site operation. We can blast structural steel beams, columns, and fabrications either at the fabrication yard before erection or on-site after installation. We provide full containment and dust suppression systems.'
      },
      {
        question: 'What surface preparation grades can you achieve for construction steelwork?',
        answer: 'We can achieve Sa 2, Sa 2.5, and Sa 3 cleanliness grades (ISO 8501-1) and blast profiles from 25 to 100 microns to suit all major paint and coating systems used in construction. We are familiar with specifications from major coating manufacturers.'
      },
      {
        question: 'Do you work with concrete floors in construction?',
        answer: 'Yes, we provide concrete floor preparation for construction projects including surface profiling for industrial floor coatings, removal of laitance, and preparation for waterproofing systems. Our equipment can handle large floor areas efficiently.'
      },
      {
        question: 'How quickly can you mobilise for a construction project?',
        answer: `We typically mobilise within 2-5 working days for standard projects. For urgent construction programmes, we can often accommodate faster response times. Call ${PHONE} to discuss your project timeline and we will do our best to meet your programme requirements.`
      }
    ],
    'heritage-restoration': [
      {
        question: 'Do you provide shot blasting for heritage and listed building restoration?',
        answer: `Yes, ${BUSINESS_NAME} has extensive experience in heritage restoration projects. We use gentle, controlled blasting techniques appropriate for historic materials including stone, brick, cast iron, and wrought iron, removing dirt, paint, and corrosion without damaging the substrate.`
      },
      {
        question: 'What blasting methods are safe for historic and listed structures?',
        answer: 'For sensitive heritage work, we use low-pressure wet blasting, soda blasting, or fine abrasive media to gently clean surfaces without causing damage. We always carry out test patches and work closely with conservation officers and heritage consultants to agree the appropriate specification.'
      },
      {
        question: 'Can you restore Victorian ironwork and cast iron structures?',
        answer: 'Yes, we regularly restore Victorian ironwork including railings, gates, bridges, and architectural metalwork. Shot blasting removes rust and old paint layers effectively, revealing the original metal surface ready for appropriate heritage-compatible coatings and paints.'
      },
      {
        question: 'Do you work with conservation officers and heritage consultants?',
        answer: 'Yes, we are experienced in working within the requirements of listed building consents and conservation area guidelines. We can provide technical information to support planning applications and work to specifications agreed with conservation officers.'
      },
      {
        question: 'How do I get a quote for heritage restoration blasting?',
        answer: `Contact us on ${PHONE} or email ${EMAIL} with details of your heritage project. We recommend a site visit to assess the materials, condition, and access requirements before providing a quotation. All quotes are free and no-obligation.`
      }
    ],
    'manufacturing': [
      {
        question: 'Do you provide shot blasting services for manufacturing facilities?',
        answer: `Yes, ${BUSINESS_NAME} provides shot blasting services for manufacturing companies including surface preparation of fabricated components, machinery, plant equipment, and factory floors. We work with manufacturers across a wide range of sectors throughout the UK.`
      },
      {
        question: 'Can you blast components at our manufacturing facility?',
        answer: 'Yes, our mobile shot blasting units can operate within your manufacturing facility. We provide full containment systems to protect machinery and production areas from abrasive media and dust. We can work around your production schedule to minimise disruption.'
      },
      {
        question: 'What surface preparation standards do you work to in manufacturing?',
        answer: 'We work to ISO 8501-1 surface cleanliness standards (Sa 1 to Sa 3) and can achieve specific blast profiles to suit your coating or bonding requirements. We are familiar with the surface preparation requirements of major industrial coating systems and adhesive manufacturers.'
      },
      {
        question: 'Can you handle large volumes of components for manufacturing?',
        answer: 'Yes, we can handle both one-off items and high-volume production runs. For large volumes, we can discuss dedicated blasting facilities or regular scheduled visits to your site. Contact us to discuss your production requirements and we will tailor a solution to suit your needs.'
      },
      {
        question: 'How does shot blasting improve manufacturing quality?',
        answer: 'Shot blasting creates a clean, profiled surface that significantly improves the adhesion of paints, coatings, and adhesives. This results in longer-lasting finishes, reduced warranty claims, and improved product quality. It also removes mill scale, rust, and contamination that could compromise product performance.'
      }
    ],
    'marine': [
      {
        question: 'Do you provide shot blasting for marine vessels and structures?',
        answer: `Yes, ${BUSINESS_NAME} provides shot blasting services for the marine industry including boat hulls, ship components, offshore structures, jetties, and marine fabrications. We use appropriate abrasive media and techniques for marine-grade surface preparation.`
      },
      {
        question: 'What surface preparation is required for marine antifouling coatings?',
        answer: 'Marine antifouling and anticorrosion coatings require a thoroughly clean, profiled surface typically to Sa 2.5 (ISO 8501-1) with a blast profile of 50-75 microns. We can achieve these standards and work to the specifications of all major marine coating manufacturers.'
      },
      {
        question: 'Can you blast boat hulls and marine structures in situ?',
        answer: 'Yes, our mobile units can operate at boatyards, marinas, and dry docks. We provide containment systems to capture abrasive media and prevent environmental contamination of waterways. We are experienced in working within the environmental restrictions of marine locations.'
      },
      {
        question: 'What abrasive media do you use for marine shot blasting?',
        answer: 'For marine applications, we typically use steel grit or copper slag to achieve the required surface profile. For aluminium hulls and sensitive marine components, we use appropriate non-ferrous abrasives. Media selection is always based on the substrate material and coating specification.'
      },
      {
        question: 'How do I arrange marine shot blasting services?',
        answer: `Call us on ${PHONE} or email ${EMAIL} to discuss your marine project. We will need details of the vessel or structure, location, access arrangements, and required surface preparation standard. We provide free, no-obligation quotations for all marine blasting work.`
      }
    ],
    'retail': [
      {
        question: 'Do you provide shot blasting for retail fit-out and refurbishment projects?',
        answer: `Yes, ${BUSINESS_NAME} provides shot blasting services for retail environments including concrete floor preparation, removal of old floor coatings, preparation of structural steelwork, and cleaning of exposed brick and stone surfaces. We work to retail project timescales, including out-of-hours working.`
      },
      {
        question: 'Can you prepare concrete floors for retail floor coatings?',
        answer: 'Yes, concrete floor preparation is one of our core services. We profile concrete floors to the correct CSP (Concrete Surface Profile) for resin, epoxy, and other retail floor coatings. Proper surface preparation is essential for coating adhesion and long-term performance in high-footfall retail environments.'
      },
      {
        question: 'Do you work out of hours to minimise disruption to retail operations?',
        answer: 'Yes, we regularly work evenings, nights, and weekends to minimise disruption to trading operations. We understand the commercial pressures of retail refurbishment and work closely with project managers to fit within tight programme windows.'
      },
      {
        question: 'Can you blast exposed brickwork and stonework in retail interiors?',
        answer: 'Yes, we can gently clean and prepare exposed brick, stone, and concrete surfaces in retail interiors. We use appropriate low-pressure techniques and containment systems to protect retail fixtures and fittings from dust and abrasive media.'
      },
      {
        question: 'How do I get a quote for retail shot blasting?',
        answer: `Contact us on ${PHONE} or email ${EMAIL} with details of your retail project including floor area, surface type, and programme dates. We provide free site surveys and no-obligation quotations. We are experienced in working with retail contractors, fit-out companies, and directly with retailers.`
      }
    ],
    'transport-logistics': [
      {
        question: 'Do you provide shot blasting for transport and logistics vehicles and infrastructure?',
        answer: `Yes, ${BUSINESS_NAME} provides shot blasting services for the transport and logistics sector including HGV chassis, trailers, vehicle bodies, rail infrastructure, loading bays, and warehouse floors. Our mobile units can operate at depots, yards, and maintenance facilities.`
      },
      {
        question: 'Can you blast HGV chassis and trailer frames?',
        answer: 'Yes, we regularly blast HGV chassis, trailer frames, and vehicle bodies. Shot blasting removes rust, old underseal, and paint to bare metal, allowing thorough inspection and application of new protective coatings. This extends vehicle life and reduces maintenance costs significantly.'
      },
      {
        question: 'Do you work at transport depots and logistics facilities?',
        answer: 'Yes, our mobile units are designed for operation at transport depots, distribution centres, and logistics facilities. We can work around vehicle movements and operational requirements to minimise disruption to your business. We are experienced in working within the health and safety requirements of busy logistics environments.'
      },
      {
        question: 'Can you prepare warehouse floors for heavy-duty coatings?',
        answer: 'Yes, concrete floor preparation for warehouse and logistics facilities is one of our specialist services. We profile floors to the correct standard for heavy-duty epoxy and polyurethane coatings that can withstand forklift traffic and heavy loads. Proper surface preparation is critical for coating performance in logistics environments.'
      },
      {
        question: 'How do I arrange shot blasting for our transport fleet?',
        answer: `Call us on ${PHONE} or email ${EMAIL} to discuss your fleet maintenance requirements. We can arrange regular scheduled visits to your depot or handle one-off refurbishment projects. We provide free, no-obligation quotations and can work to your maintenance programme.`
      }
    ]
  };

  return faqSets[slug] || [
    {
      question: `Do you provide shot blasting services for the ${nameLower} industry?`,
      answer: `Yes, ${BUSINESS_NAME} provides professional shot blasting services for the ${nameLower} industry across the UK. Our mobile units can operate at your site, minimising transport costs and downtime. Call ${PHONE} to discuss your requirements.`
    },
    {
      question: `What surfaces can be blasted in ${nameLower} applications?`,
      answer: `We can blast steel, iron, aluminium, concrete, and other surfaces commonly used in ${nameLower} applications. Surface preparation standards are tailored to your specific coating or treatment requirements.`
    },
    {
      question: `Can you work at our ${nameLower} facility?`,
      answer: `Yes, our mobile shot blasting units are fully self-contained and can operate at your ${nameLower} facility. We provide containment systems to protect surrounding areas and minimise disruption to your operations.`
    },
    {
      question: `What surface preparation standards do you achieve for ${nameLower} projects?`,
      answer: `We work to ISO 8501-1 surface cleanliness standards from Sa 1 to Sa 3, and can achieve specific blast profiles to suit your coating requirements. We are experienced in meeting the surface preparation specifications of all major coating manufacturers.`
    },
    {
      question: `How do I get a quote for ${nameLower} shot blasting services?`,
      answer: `Contact us on ${PHONE} or email ${EMAIL} with details of your project. We provide free, no-obligation quotations and can arrange a site visit to assess your specific requirements.`
    }
  ];
}

// Enrich industries with generated FAQs
const industries = industriesRaw.map(industry => ({
  ...industry,
  faqs: industry.faqs && industry.faqs.length > 0 ? industry.faqs : generateIndustryFaqs(industry)
}));

/**
 * Generate JSON-LD schemas for an industry page
 */
function generateSchemas(industry) {
  const { slug, name, description, faqs, services } = industry;
  const url = `${SITE_URL}/industries/${slug}`;

  const faqSchema = faqs && faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  } : null;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Shot Blasting for the ${name} Industry`,
    description: description || `Professional shot blasting services for the ${name.toLowerCase()} industry across the UK.`,
    url: url,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_NAME,
      telephone: PHONE,
      email: EMAIL,
      url: SITE_URL,
      logo: LOGO
    },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    ...(services && services.length > 0 ? {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${name} Shot Blasting Services`,
        itemListElement: services.map((s, i) => ({
          '@type': 'Offer',
          position: i + 1,
          itemOffered: { '@type': 'Service', name: s }
        }))
      }
    } : {})
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE_URL}/industries` },
      { '@type': 'ListItem', position: 3, name: name, item: url }
    ]
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Shot Blasting for the ${name} Industry | ${BUSINESS_NAME}`,
    description: description || `Professional shot blasting services for the ${name.toLowerCase()} industry.`,
    url: url,
    breadcrumb: breadcrumbSchema,
    mainEntity: serviceSchema,
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: LOGO }
    }
  };

  return [serviceSchema, faqSchema, breadcrumbSchema, webPageSchema].filter(Boolean);
}

/**
 * Generate the body HTML for an industry page
 */
function generateBodyHtml(industry) {
  const { slug, name, description, faqs, services, sections } = industry;
  const url = `${SITE_URL}/industries/${slug}`;
  const title = `Shot Blasting for the ${name} Industry`;

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
    <h2>Frequently Asked Questions — Shot Blasting for ${escHtml(name)}</h2>
    ${faqItems}
  </section>`;
  }

  // Services list
  const servicesHtml = services && services.length > 0
    ? `<ul class="ssr-services-list">${services.map(s => `<li>${escHtml(s)}</li>`).join('')}</ul>`
    : '';

  return `<div class="ssr-content" aria-hidden="false" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;">
  <nav aria-label="Breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
    <ol>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="${SITE_URL}"><span itemprop="name">Home</span></a>
        <meta itemprop="position" content="1" />
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="${SITE_URL}/industries"><span itemprop="name">Industries</span></a>
        <meta itemprop="position" content="2" />
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="${url}"><span itemprop="name">${escHtml(name)}</span></a>
        <meta itemprop="position" content="3" />
      </li>
    </ol>
  </nav>
  <article itemscope itemtype="https://schema.org/Service">
    <h1 itemprop="name">${escHtml(title)}</h1>
    ${description ? `<p itemprop="description">${escHtml(description)}</p>` : `<p itemprop="description">Professional shot blasting services for the ${escHtml(name.toLowerCase())} industry across the UK. ${BUSINESS_NAME} provides mobile shot blasting, rust removal, and surface preparation for ${escHtml(name.toLowerCase())} applications.</p>`}
    <div itemprop="provider" itemscope itemtype="https://schema.org/LocalBusiness">
      <meta itemprop="name" content="${BUSINESS_NAME}" />
      <meta itemprop="telephone" content="${PHONE}" />
      <meta itemprop="email" content="${EMAIL}" />
      <meta itemprop="url" content="${SITE_URL}" />
    </div>
    ${services && services.length > 0 ? `
    <section class="ssr-services">
      <h2>Our ${escHtml(name)} Shot Blasting Services</h2>
      ${servicesHtml}
    </section>` : ''}
    ${sections && sections.length > 0 ? `
    <section class="ssr-about">
      <h2>Why Choose ${BUSINESS_NAME} for ${escHtml(name)} Applications?</h2>
      <p>We have extensive experience providing shot blasting services to the ${escHtml(name.toLowerCase())} sector. Our mobile units operate across the UK, delivering professional surface preparation directly to your site.</p>
    </section>` : ''}
    ${faqHtml}
    <section class="ssr-cta">
      <h2>Get a Free Quote for ${escHtml(name)} Shot Blasting</h2>
      <p>Contact ${BUSINESS_NAME} today for professional shot blasting services for the ${escHtml(name.toLowerCase())} industry.</p>
      <p>Call us on <a href="tel:${PHONE.replace(/\s/g, '')}">${PHONE}</a> or email <a href="mailto:${EMAIL}">${EMAIL}</a></p>
    </section>
  </article>
</div>`;
}

/**
 * Inject meta tags, canonical, JSON-LD schemas, and body HTML into the base HTML
 */
function injectIndustryPage(html, industry) {
  const { slug, name, description } = industry;
  const url = `${SITE_URL}/industries/${slug}`;
  const pageTitle = `Shot Blasting for the ${name} Industry | ${BUSINESS_NAME}`;
  const metaDesc = description
    ? description.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 155) + '...'
    : `Professional shot blasting services for the ${name.toLowerCase()} industry across the UK. ${BUSINESS_NAME} — mobile units, expert surface preparation.`;
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
  const schemas = generateSchemas(industry);
  const schemaScripts = schemas.map(s =>
    `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`
  ).join('\n');

  // Body HTML
  const bodyHtml = generateBodyHtml(industry);

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

// Generate HTML file for each industry
let successCount = 0;
let errorCount = 0;

for (const industry of industries) {
  try {
    const industryHtml = injectIndustryPage(baseHtml, industry);

    // Write as .html for direct access
    const outputPathHtml = path.join(industriesDir, `${industry.slug}.html`);
    fs.writeFileSync(outputPathHtml, industryHtml, 'utf-8');

    // Also write as extensionless file so static server matches /industries/aerospace directly
    const outputPath = path.join(industriesDir, industry.slug);
    fs.writeFileSync(outputPath, industryHtml, 'utf-8');

    successCount++;
    console.log(`✅ Generated: /industries/${industry.slug} (${industry.faqs.length} FAQs)`);
  } catch (error) {
    console.error(`❌ Error generating page for ${industry.slug}:`, error.message);
    errorCount++;
  }
}

console.log(`\n🎉 Industry pre-rendering complete!`);
console.log(`   ✅ Successfully generated: ${successCount} industries (${successCount * 2} files — extensionless + .html)`);
if (errorCount > 0) {
  console.log(`   ❌ Errors: ${errorCount} pages`);
}
console.log(`   📁 Output directory: ${industriesDir}`);
