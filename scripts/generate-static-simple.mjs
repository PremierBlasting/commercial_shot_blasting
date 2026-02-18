import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import location data
const locationDataPath = path.join(__dirname, '../client/src/data/locationData.ts');
const locationDataContent = fs.readFileSync(locationDataPath, 'utf8');

// Parse location data (simple regex extraction)
const locationMatches = [...locationDataContent.matchAll(/"([a-z-]+)":\s*{[\s\S]*?name:\s*"([^"]+)"[\s\S]*?description:\s*"([^"]+)"/g)];

const locations = locationMatches.map(match => ({
  slug: match[1],
  name: match[2],
  description: match[3]
}));

console.log(`Found ${locations.length} locations`);

// HTML template with meta tags and crawler-friendly content
function generateHTML(location) {
  const title = `Shot Blasting ${location.name}`;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO Meta Tags -->
  <title>${title}</title>
  <meta name="description" content="${location.description}" />
  <meta name="keywords" content="shot blasting ${location.name}, mobile shot blasting, rust removal, surface preparation, ${location.name}" />
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${location.description}" />
  <meta property="og:url" content="https://shotblastuk-huv6zvx4.manus.space/service-areas/${location.slug}" />
  <meta property="og:type" content="website" />
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${location.description}" />
  
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    h1 {
      color: #2C5F7F;
      font-size: 2.5em;
      margin-bottom: 0.5em;
    }
    .description {
      font-size: 1.2em;
      color: #666;
      margin-bottom: 2em;
    }
    .services {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .contact {
      background: #2C5F7F;
      color: white;
      padding: 30px;
      border-radius: 8px;
      text-align: center;
      margin: 30px 0;
    }
    .phone {
      font-size: 2em;
      font-weight: bold;
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <header>
    <h1>${title}</h1>
    <p class="description">${location.description}</p>
  </header>
  
  <main>
    <section class="services">
      <h2>Our Services in ${location.name}</h2>
      <ul>
        <li>Commercial & Industrial Shot Blasting</li>
        <li>Mobile Shot Blasting Services</li>
        <li>Rust Removal & Surface Preparation</li>
        <li>Steel & Metal Cleaning</li>
        <li>Concrete Surface Profiling</li>
        <li>Paint & Coating Removal</li>
      </ul>
    </section>
    
    <section class="contact">
      <h2>Get a Free Quote Today</h2>
      <p>Professional shot blasting services in ${location.name}</p>
      <div class="phone">07970 566409</div>
      <p>Same-day response • Competitive pricing • Expert service</p>
    </section>
    
    <section>
      <h2>About Our ${location.name} Service</h2>
      <p>
        Commercial Shot Blasting provides professional surface preparation and rust removal services 
        throughout ${location.name} and surrounding areas. We serve local manufacturers, automotive shops, 
        and industrial facilities with precision blasting solutions.
      </p>
      <p>
        Our mobile shot blasting service brings professional equipment directly to your location in ${location.name}, 
        minimizing disruption to your operations while delivering exceptional results.
      </p>
    </section>
  </main>
  
  <noscript>
    <p><strong>Note:</strong> This page is optimized for search engines. For the full interactive experience, please enable JavaScript.</p>
  </noscript>
</body>
</html>`;
}

// Generate files
const outputDir = path.join(__dirname, '../client/public/service-areas');

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Generating static HTML files...\n');

locations.forEach(location => {
  const html = generateHTML(location);
  const outputPath = path.join(outputDir, `${location.slug}.html`);
  fs.writeFileSync(outputPath, html, 'utf8');
  console.log(`✓ Generated ${location.slug}.html`);
});

console.log(`\n✅ Successfully generated ${locations.length} static HTML files!`);
console.log(`Output directory: ${outputDir}`);
console.log('\nThese files will be served to crawlers while regular users get the React app.');
