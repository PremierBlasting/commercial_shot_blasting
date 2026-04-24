#!/usr/bin/env node

/**
 * Export location data as JSON for pre-rendering
 * This script reads the TypeScript location data and exports it as JSON
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Read the shared locationData.ts (has full rich data: county, region, description, FAQs)
const locationDataPath = path.join(projectRoot, 'shared/locationData.ts');
const content = fs.readFileSync(locationDataPath, 'utf-8');

const locations = [];

// Parse each slug entry block using bracket counting
const entryRegex = /"([a-z][a-z0-9-]+)":\s*\{/g;
let match;
while ((match = entryRegex.exec(content)) !== null) {
  const slug = match[1];
  const startBrace = match.index + match[0].length - 1;
  let depth = 0, i = startBrace;
  while (i < content.length) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') { depth--; if (depth === 0) break; }
    i++;
  }
  const block = content.slice(startBrace, i + 1);
  const nameMatch = block.match(/name:\s*"([^"]+)"/);
  const countyMatch = block.match(/county:\s*"([^"]+)"/);
  const countySlugMatch = block.match(/countySlug:\s*"([^"]+)"/);
  const regionMatch = block.match(/region:\s*"([^"]+)"/);
  const descriptionMatch = block.match(/description:\s*"([^"]+)"/);
  const faqs = [];
  const faqRegex = /\{\s*question:\s*"([^"]+)",\s*answer:\s*"([^"]+)"\s*\}/g;
  let faqMatch;
  while ((faqMatch = faqRegex.exec(block)) !== null) {
    faqs.push({ question: faqMatch[1], answer: faqMatch[2] });
  }
  if (nameMatch) {
    locations.push({
      name: nameMatch[1], slug,
      county: countyMatch ? countyMatch[1] : '',
      countySlug: countySlugMatch ? countySlugMatch[1] : '',
      region: regionMatch ? regionMatch[1] : '',
      description: descriptionMatch ? descriptionMatch[1] : '',
      faqs,
    });
  }
}

console.log(`📄 Extracted ${locations.length} locations with rich data (county, region, description, FAQs)`);

// Write to JSON file
const outputPath = path.join(projectRoot, 'scripts/locations.json');
fs.writeFileSync(outputPath, JSON.stringify(locations, null, 2), 'utf-8');

console.log(`✅ Exported to ${outputPath}`);
