import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read location data directly from the TypeScript file
const locationDataPath = path.join(__dirname, '../client/src/data/locationData.ts');
const locationDataContent = fs.readFileSync(locationDataPath, 'utf8');

// Extract location data using regex - parse each location block
const locations = [];
const locationPattern = /"([^"]+)":\s*\{[^}]*name:\s*"([^"]+)"[^}]*city:\s*"([^"]+)"[^}]*region:\s*"([^"]+)"[^}]*latitude:\s*"([^"]+)"[^}]*longitude:\s*"([^"]+)"[^}]*description:\s*"([^"]+)"[^}]*url:\s*"([^"]+)"/gs;

let match;
while ((match = locationPattern.exec(locationDataContent)) !== null) {
  const [, slug, name, city, region, latitude, longitude, description, url] = match;
  locations.push({
    slug,
    name,
    city,
    region,
    latitude,
    longitude,
    description,
    url,
    title: `Shot Blasting ${name}`,
    metaDescription: description
  });
}

console.log(`Found ${locations.length} locations`);

if (locations.length === 0) {
  console.error('No locations found! Check the regex pattern.');
  process.exit(1);
}

const outputDir = path.join(__dirname, '../client/public/service-areas');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to generate full HTML for a location
function generateFullHTML(location) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO Meta Tags -->
  <title>${location.title}</title>
  <meta name="description" content="${location.metaDescription}" />
  <meta name="keywords" content="shot blasting ${location.name}, mobile shot blasting, rust removal, surface preparation, ${location.name}, ${location.region}" />
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="${location.title}" />
  <meta property="og:description" content="${location.metaDescription}" />
  <meta property="og:url" content="https://shotblastuk-huv6zvx4.manus.space/service-areas/${location.slug}" />
  <meta property="og:type" content="website" />
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${location.title}" />
  <meta name="twitter:description" content="${location.metaDescription}" />
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://shotblastuk-huv6zvx4.manus.space/service-areas/${location.slug}" />
  
  <!-- Local Business Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Commercial Shot Blasting - ${location.name}",
    "description": "${location.metaDescription}",
    "url": "https://shotblastuk-huv6zvx4.manus.space/service-areas/${location.slug}",
    "telephone": "07970566409",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "${location.city}",
      "addressRegion": "${location.region}",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "${location.latitude}",
      "longitude": "${location.longitude}"
    },
    "areaServed": {
      "@type": "City",
      "name": "${location.name}"
    },
    "serviceType": "Shot Blasting Services"
  }
  </script>
  
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
    }
    header {
      background: linear-gradient(135deg, #2C5F7F 0%, #1a3a4f 100%);
      color: white;
      padding: 60px 20px;
      text-align: center;
    }
    h1 {
      font-size: 2.5em;
      margin-bottom: 0.5em;
      font-weight: 700;
    }
    main {
      max-width: 1200px;
      margin: 40px auto;
      padding: 0 20px;
    }
    section {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }
    h2 {
      color: #2C5F7F;
      margin-bottom: 20px;
      font-size: 1.8em;
    }
    p {
      font-size: 1.1em;
      line-height: 1.8;
      color: #555;
      margin-bottom: 1em;
    }
    .cta {
      display: inline-block;
      background: #2C5F7F;
      color: white;
      padding: 15px 30px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 20px;
      transition: background 0.3s;
    }
    .cta:hover {
      background: #1a3a4f;
    }
    .services-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    .service-card {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #2C5F7F;
    }
    .service-card h3 {
      color: #2C5F7F;
      margin-bottom: 10px;
      font-size: 1.2em;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    li:last-child {
      border-bottom: none;
    }
    footer {
      background: #1a1a1a;
      color: #ccc;
      text-align: center;
      padding: 40px 20px;
      margin-top: 60px;
    }
    .highlight-section {
      background: #2C5F7F;
      color: white;
      text-align: center;
    }
    .highlight-section h2 {
      color: white;
    }
    .highlight-section p {
      color: #e0e0e0;
    }
  </style>
</head>
<body>
  <header>
    <h1>${location.title}</h1>
    <p style="font-size: 1.2em; margin-top: 10px;">${location.metaDescription}</p>
  </header>
  
  <main>
    <section>
      <h2>Professional Shot Blasting Services in ${location.name}</h2>
      <p>Welcome to Commercial Shot Blasting, your trusted partner for professional mobile shot blasting services in ${location.name} and throughout the ${location.region}. We specialize in rust removal, surface preparation, and industrial cleaning for commercial and industrial clients.</p>
      <p>Our mobile shot blasting service brings professional-grade equipment directly to your site in ${location.name}, eliminating the need for costly transportation and minimizing downtime for your business.</p>
      <a href="tel:07970566409" class="cta">Call Now: 07970 566409</a>
      <a href="/contact" class="cta" style="margin-left: 15px; background: #4CAF50;">Get a Free Quote</a>
    </section>
    
    <section>
      <h2>Our Services in ${location.name}</h2>
      <div class="services-list">
        <div class="service-card">
          <h3>🏭 Industrial Shot Blasting</h3>
          <p>Factory equipment, machinery, structural steel, and industrial surfaces</p>
        </div>
        <div class="service-card">
          <h3>🚗 Commercial Vehicle Blasting</h3>
          <p>Commercial vehicles, agricultural equipment, chassis restoration</p>
        </div>
        <div class="service-card">
          <h3>🏗️ Structural Steel</h3>
          <p>Steel beams, frames, cladding, and construction steel</p>
        </div>
        <div class="service-card">
          <h3>🚪 Doors & Gates</h3>
          <p>Steel doors, roller shutters, gates, railings, and access control</p>
        </div>
        <div class="service-card">
          <h3>📦 Containers & Tanks</h3>
          <p>Storage containers, industrial tanks, and vessels</p>
        </div>
        <div class="service-card">
          <h3>🔥 Fire Escapes & Stairs</h3>
          <p>External stairs, fire escapes, and access towers</p>
        </div>
        <div class="service-card">
          <h3>🏢 Factory Cladding</h3>
          <p>Warehouse and factory cladding restoration</p>
        </div>
        <div class="service-card">
          <h3>🔧 Pipework & Racking</h3>
          <p>Industrial pipework and warehouse racking systems</p>
        </div>
      </div>
    </section>
    
    <section>
      <h2>Why Choose Us for Shot Blasting in ${location.name}?</h2>
      <ul>
        <li>✓ <strong>Mobile Service</strong> - We come to your site in ${location.name}, saving you time and money</li>
        <li>✓ <strong>Professional Team</strong> - Experienced shot blasting specialists with years of industry experience</li>
        <li>✓ <strong>Competitive Pricing</strong> - Free quotes with no obligation, transparent pricing structure</li>
        <li>✓ <strong>Full Containment</strong> - Clean, controlled blasting process with complete site preparation and cleanup</li>
        <li>✓ <strong>Quick Turnaround</strong> - Efficient service to minimize downtime for your business operations</li>
        <li>✓ <strong>Quality Guaranteed</strong> - Professional results that meet industry standards</li>
        <li>✓ <strong>Flexible Scheduling</strong> - We work around your schedule to minimize disruption</li>
      </ul>
    </section>
    
    <section>
      <h2>Industries We Serve in ${location.name}</h2>
      <p>Our shot blasting services in ${location.name} cater to a wide range of industries including:</p>
      <ul>
        <li>✓ Manufacturing and engineering facilities</li>
        <li>✓ Construction and building contractors</li>
        <li>✓ Automotive and transport companies</li>
        <li>✓ Agriculture and farming operations</li>
        <li>✓ Retail and commercial properties</li>
        <li>✓ Aerospace and defense sectors</li>
        <li>✓ Marine and offshore industries</li>
        <li>✓ Heritage and restoration projects</li>
      </ul>
    </section>
    
    <section class="highlight-section">
      <h2>Ready to Get Started?</h2>
      <p style="font-size: 1.2em;">Contact us today for a free, no-obligation quote for shot blasting services in ${location.name}</p>
      <a href="tel:07970566409" class="cta" style="background: white; color: #2C5F7F; margin-top: 20px;">📞 Call 07970 566409</a>
      <a href="/contact" class="cta" style="margin-left: 15px; margin-top: 20px;">Request a Quote</a>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2026 Commercial Shot Blasting. All rights reserved.</p>
    <p style="margin-top: 10px;">Professional mobile shot blasting services across the UK</p>
    <p style="margin-top: 10px;">Serving ${location.name}, ${location.region}, and surrounding areas</p>
  </footer>
  
  <!-- This page is pre-rendered for SEO and crawlers -->
  <script>
    console.log('Static SSR HTML loaded for ${location.name}');
    // This static HTML provides full content for search engines and the Manus SEO crawler
  </script>
</body>
</html>`;
}

console.log('Generating full SSR HTML files...\n');

let successCount = 0;
locations.forEach(location => {
  try {
    const html = generateFullHTML(location);
    const outputPath = path.join(outputDir, `${location.slug}.html`);
    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`✓ Generated ${location.slug}.html with full SSR content`);
    successCount++;
  } catch (error) {
    console.error(`✗ Failed to generate ${location.slug}.html:`, error.message);
  }
});

console.log(`\n✅ Successfully generated ${successCount}/${locations.length} full SSR HTML files!`);
console.log(`Output directory: ${outputDir}`);
console.log('\nThese files contain:');
console.log('  • Complete page content with proper HTML structure');
console.log('  • SEO meta tags (title, description, keywords)');
console.log('  • Open Graph and Twitter Card tags');
console.log('  • Local Business structured data (JSON-LD)');
console.log('  • Canonical URLs');
console.log('\nThe Manus SEO panel should now be able to detect and analyze these pages.');
