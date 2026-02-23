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

// Read location data TypeScript file
const locationDataPath = path.join(projectRoot, 'client/src/data/locationData.ts');
const content = fs.readFileSync(locationDataPath, 'utf-8');

// Extract just the location objects (name and slug)
const locationMatches = content.matchAll(/\{\s*name:\s*"([^"]+)",\s*slug:\s*"([^"]+)"/g);
const locations = [];

for (const match of locationMatches) {
  locations.push({
    name: match[1],
    slug: match[2]
  });
}

console.log(`📄 Extracted ${locations.length} locations`);

// Write to JSON file
const outputPath = path.join(projectRoot, 'scripts/locations.json');
fs.writeFileSync(outputPath, JSON.stringify(locations, null, 2), 'utf-8');

console.log(`✅ Exported to ${outputPath}`);
