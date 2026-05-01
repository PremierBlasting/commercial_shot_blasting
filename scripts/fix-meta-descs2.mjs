#!/usr/bin/env node
/**
 * Fix all meta descriptions over 160 characters in server/metaTags.ts
 * These are in the serviceMeta object's description field and SSR body descriptions.
 * Note: JSON-LD schema descriptions can be longer — we only fix HTML meta tag descriptions.
 */
import fs from 'fs';

const filePath = 'server/metaTags.ts';
let content = fs.readFileSync(filePath, 'utf-8');

// Map of exact old description -> new description (all under 160 chars)
const fixes = new Map([
  // serviceMeta description fields (used directly in <meta name="description">)
  [
    'Professional shot blasting for structural steel frames, roof trusses, and load-bearing structures. We remove mill scale, rust, and old coatings for galvanizing or protective coatings.',
    'Professional shot blasting for structural steel frames, roof trusses, and load-bearing structures. Remove mill scale, rust, and old coatings. Free quote.'
  ],
  [
    'Specialist shot blasting for steel containers, shipping containers, and fuel storage tanks. We remove rust and old coatings to prepare surfaces for repainting or long-term reuse.',
    'Specialist shot blasting for steel containers, shipping containers, and fuel storage tanks. Remove rust and old coatings for repainting or long-term reuse. Free quote.'
  ],
  [
    'Specialist shot blasting for factory and industrial cladding panels. We remove plastisol, paint layers, and rust to restore surfaces to bare metal ready for new protective coatings.',
    'Specialist shot blasting for factory and industrial cladding panels. Remove plastisol, paint layers, and rust to bare metal ready for new protective coatings. Free quote.'
  ],
  [
    'Comprehensive shot blasting for fire escape structures and stair towers. We remove rust and corrosion from fire safety infrastructure, preparing surfaces for protective coatings or galvanizing.',
    'Comprehensive shot blasting for fire escape structures and stair towers. Remove rust and corrosion from fire safety infrastructure for protective coatings or galvanizing. Free quote.'
  ],
  [
    'Using appropriate blast media and pressure settings, we systematically clean all fire escape surfaces including stairs, landings, handrails, and support structures.',
    'Using appropriate blast media and pressure settings, we systematically clean all fire escape surfaces including stairs, landings, handrails, and support structures.'
  ],
  [
    'Meticulous shot blasting for internal steel staircases, balustrades, and handrails. We remove rust, old paint, and welding residue, preparing surfaces for powder coating or painting.',
    'Meticulous shot blasting for internal steel staircases, balustrades, and handrails. Remove rust, old paint, and welding residue for powder coating or painting. Free quote.'
  ],
  // bridges - need to find the actual text
  [
    'Comprehensive shot blasting for bridge steelwork including girders, crossmembers, and parapet rails.',
    'Comprehensive shot blasting for bridge steelwork including girders, crossmembers, and parapet rails.'
  ],
  // ladders
  [
    'Comprehensive shot blasting for fixed ladders, caged ladder systems, and step-over platforms. We rem',
    'Comprehensive shot blasting for fixed ladders, caged ladder systems, and step-over platforms. We rem'
  ],
]);

// Use a more targeted approach - find and replace each description in serviceMeta
// by reading the actual content and fixing each one

// Get all description fields with their full text
const descPattern = /description: "([^"]{161,})"/g;
let match;
let fixCount = 0;

while ((match = descPattern.exec(content)) !== null) {
  const fullDesc = match[1];
  // Truncate to 157 chars + '...' if over 160
  if (fullDesc.length > 160) {
    // Find a good break point at or before char 157
    let truncated = fullDesc.substring(0, 157);
    // Break at last space
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 120) {
      truncated = truncated.substring(0, lastSpace);
    }
    truncated = truncated + '...';
    
    // Replace in content
    const oldStr = `description: "${fullDesc}"`;
    const newStr = `description: "${truncated}"`;
    content = content.replace(oldStr, newStr);
    console.log(`Fixed (${truncated.length}): ${truncated.substring(0, 80)}...`);
    fixCount++;
    // Reset regex since content changed
    descPattern.lastIndex = 0;
  }
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`\nDone. Fixed ${fixCount} descriptions.`);

// Verify
const remaining = [...content.matchAll(/description: "([^"]+)"/g)].filter(m => m[1].length > 160);
console.log(`Remaining over 160 chars: ${remaining.length}`);
if (remaining.length > 0) {
  remaining.forEach(m => console.log(`  (${m[1].length}): ${m[1].substring(0, 80)}`));
}
