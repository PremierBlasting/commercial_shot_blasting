#!/usr/bin/env python3
"""
Inserts county and industry route handlers into server/metaTags.ts
before the service area match block.
"""

import re

METATAGS_PATH = '/home/ubuntu/commercial_shot_blasting_manus/server/metaTags.ts'

with open(METATAGS_PATH, 'r') as f:
    content = f.read()

# ── 1. Add import for countyData at the top ────────────────────────────────────
if 'countyData' not in content:
    content = content.replace(
        'import { locationData } from "@shared/locationData";',
        'import { locationData } from "@shared/locationData";\nimport { countyData, CountyData } from "@shared/countyData";'
    )
    print("Added countyData import")
else:
    print("countyData import already present")

# ── 2. Build the new handler block ────────────────────────────────────────────
HANDLERS = r'''
  // ── County pages: /counties/:slug ──────────────────────────────────────────
  const countyMatch = url.match(/^\/counties\/([a-z-]+)/);
  if (countyMatch) {
    const countySlug = countyMatch[1];
    const county: CountyData | undefined = countyData[countySlug];
    if (county) {
      const pageUrl = `${SITE_URL}/counties/${countySlug}`;
      const pageTitle = `Shot Blasting Services in ${county.name} | ${BUSINESS_NAME}`;
      const metaDesc = county.description
        ? county.description.replace(/"/g, '&quot;').slice(0, 155) + '...'
        : `Professional shot blasting services across ${county.name}. ${BUSINESS_NAME} — mobile units covering all major towns.`;

      let modifiedHtml = html
        .replace(/<meta\s+name="description"[^>]*>/gi, '')
        .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
        .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
        .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
        .replace(/<link\s+rel="canonical"[^>]*>/gi, '');

      const faqSchemaItems = (county.faqs || []).map((faq: { question: string; answer: string }) =>
        `{"@type":"Question","name":${JSON.stringify(faq.question)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(faq.answer)}}}`
      ).join(',');

      const schemas = `
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"LocalBusiness","name":"${BUSINESS_NAME}","url":"${SITE_URL}","telephone":"${PHONE}","email":"${EMAIL}","logo":"${LOGO}","areaServed":{"@type":"AdministrativeArea","name":"${county.name}"}${county.latitude ? `,"geo":{"@type":"GeoCoordinates","latitude":${county.latitude},"longitude":${county.longitude}}` : ''}}
    </script>
    ${faqSchemaItems ? `<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${faqSchemaItems}]}</script>` : ''}
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"${SITE_URL}"},{"@type":"ListItem","position":2,"name":"Counties","item":"${SITE_URL}/counties"},{"@type":"ListItem","position":3,"name":"${county.name}","item":"${pageUrl}"}]}
    </script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"WebPage","name":"${pageTitle}","url":"${pageUrl}","description":"${metaDesc}"}
    </script>`;

      const metaTags = `
    <title>${pageTitle}</title>
    <link rel="canonical" href="${pageUrl}" />
    <meta name="description" content="${metaDesc}" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${metaDesc}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${HERO_IMAGE}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${metaDesc}" />
    <meta name="twitter:image" content="${HERO_IMAGE}" />
    ${schemas}
  `;
      modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, metaTags);
      return modifiedHtml;
    }
  }

  // ── Industry pages: /industries/:slug ──────────────────────────────────────
  const industryMeta: Record<string, { name: string; description: string }> = {
    'aerospace': { name: 'Aerospace', description: 'Specialist shot blasting for aerospace components. Precision surface preparation meeting aviation industry standards.' },
    'agriculture': { name: 'Agriculture', description: 'Professional shot blasting for agricultural machinery and equipment. Restore tractors, harvesters, and farm implements.' },
    'construction': { name: 'Construction', description: 'Commercial shot blasting for construction equipment and structural steelwork. Expert surface preparation for the building industry.' },
    'heritage-restoration': { name: 'Heritage Restoration', description: 'Specialist shot blasting for heritage and restoration projects. Preserve historic metalwork with expert surface preparation.' },
    'manufacturing': { name: 'Manufacturing', description: 'Industrial shot blasting for manufacturing facilities. Surface preparation for production equipment, racking, and infrastructure.' },
    'marine': { name: 'Marine', description: 'Professional shot blasting for marine and offshore applications. Corrosion removal for vessels, platforms, and maritime equipment.' },
    'retail': { name: 'Retail', description: 'Commercial shot blasting for retail and hospitality sectors. Restore shopfronts, fixtures, and commercial metalwork.' },
    'transport-logistics': { name: 'Transport & Logistics', description: 'Shot blasting for transport and logistics equipment. Surface preparation for trailers, containers, and fleet vehicles.' },
  };

  const industryMatch = url.match(/^\/industries\/([a-z-]+)/);
  if (industryMatch) {
    const industrySlug = industryMatch[1];
    const industry = industryMeta[industrySlug];
    if (industry) {
      const pageUrl = `${SITE_URL}/industries/${industrySlug}`;
      const pageTitle = `Shot Blasting for the ${industry.name} Industry | ${BUSINESS_NAME}`;
      const metaDesc = `${industry.description.slice(0, 130)}... Expert commercial services.`;

      let modifiedHtml = html
        .replace(/<meta\s+name="description"[^>]*>/gi, '')
        .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
        .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
        .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
        .replace(/<link\s+rel="canonical"[^>]*>/gi, '');

      const schemas = `
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Service","name":"Shot Blasting for the ${industry.name} Industry","description":"${industry.description}","provider":{"@type":"LocalBusiness","name":"${BUSINESS_NAME}","telephone":"${PHONE}","url":"${SITE_URL}"},"areaServed":{"@type":"Country","name":"United Kingdom"}}
    </script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"${SITE_URL}"},{"@type":"ListItem","position":2,"name":"Industries","item":"${SITE_URL}/industries"},{"@type":"ListItem","position":3,"name":"${industry.name}","item":"${pageUrl}"}]}
    </script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"WebPage","name":"${pageTitle}","url":"${pageUrl}","description":"${metaDesc}"}
    </script>`;

      const metaTags = `
    <title>${pageTitle}</title>
    <link rel="canonical" href="${pageUrl}" />
    <meta name="description" content="${metaDesc}" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${metaDesc}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${HERO_IMAGE}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${metaDesc}" />
    <meta name="twitter:image" content="${HERO_IMAGE}" />
    ${schemas}
  `;
      modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, metaTags);
      return modifiedHtml;
    }
  }

'''

# ── 3. Insert the handlers before the service area match block ─────────────────
INSERT_BEFORE = '  // Check if this is a service area pagee'
if INSERT_BEFORE in content:
    if 'countyMatch' not in content:
        content = content.replace(INSERT_BEFORE, HANDLERS + INSERT_BEFORE)
        print("Inserted county and industry handlers")
    else:
        print("Handlers already present")
else:
    print("ERROR: Could not find insertion point")
    exit(1)

with open(METATAGS_PATH, 'w') as f:
    f.write(content)

print("Done — metaTags.ts updated")
