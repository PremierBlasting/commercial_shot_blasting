import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All 31 locations
const locations = [
  'birmingham', 'wolverhampton', 'coventry', 'leicester', 'derby',
  'nottingham', 'sheffield', 'leeds', 'manchester', 'liverpool',
  'stoke', 'chesterfield', 'lincoln', 'peterborough', 'northampton',
  'milton-keynes', 'oxford', 'gloucester', 'worcester', 'hereford',
  'shrewsbury', 'chester', 'wrexham', 'cardiff', 'bristol',
  'swindon', 'cambridge', 'ipswich', 'norwich', 'st-albans',
  'stratford-upon-avon'
];

const DEV_SERVER_URL = 'http://localhost:3000';

async function generateStaticPages() {
  console.log('Starting static page generation...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const outputDir = path.join(__dirname, '../client/public/service-areas');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  for (const location of locations) {
    try {
      console.log(`Generating ${location}...`);
      
      const page = await browser.newPage();
      
      // Navigate to the location page
      await page.goto(`${DEV_SERVER_URL}/service-areas/${location}`, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });
      
      // Wait for React to render and meta tags to be set
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get the full HTML
      const html = await page.content();
      
      // Save to file
      const outputPath = path.join(outputDir, `${location}.html`);
      fs.writeFileSync(outputPath, html, 'utf8');
      
      console.log(`✓ Generated ${location}.html`);
      
      await page.close();
    } catch (error) {
      console.error(`✗ Failed to generate ${location}:`, error.message);
    }
  }
  
  await browser.close();
  console.log('\n✅ Static page generation complete!');
  console.log(`Generated 31 HTML files in ${outputDir}`);
}

generateStaticPages().catch(console.error);
