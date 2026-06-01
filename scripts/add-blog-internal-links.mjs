/**
 * Script to add contextual internal links to all 5 blog posts.
 * Adds 2-3 county/service-area links per post based on content context.
 * Run: node scripts/add-blog-internal-links.mjs
 */

import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load env
const envPath = join(__dirname, "../.env");
try {
  const envContent = readFileSync(envPath, "utf8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
} catch {}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);

// Fetch all blog posts
const [posts] = await connection.execute("SELECT id, slug, content FROM blog_posts ORDER BY id");

const linkPatches = {
  // Post 2: Structural Steel Guide
  "shot-blasting-structural-steel-guide": [
    {
      find: "Shot blasting's versatility makes it indispensable across numerous industrial sectors. In the construction industry, virtually all structural steel components benefit from shot blasting before protective coating application.",
      replace: "Shot blasting's versatility makes it indispensable across numerous industrial sectors. In the construction industry, virtually all structural steel components benefit from shot blasting before protective coating application. Our [service areas](/service-areas) span the length and breadth of England, from [West Midlands](/counties/west-midlands) steel fabricators to [Yorkshire](/counties/yorkshire) construction contractors.",
    },
    {
      find: "For [manufacturing](/industries/manufacturing) facilities, blasted steel should be coated as quickly as possible",
      replace: "For [manufacturing](/industries/manufacturing) facilities across [Staffordshire](/counties/staffordshire) and the wider Midlands, blasted steel should be coated as quickly as possible",
    },
  ],

  // Post 3: Powder Coating Partnership
  "shot-blasting-powder-coating-partnership": [
    {
      find: "The [transport and logistics](/industries/transport-logistics) industry relies heavily on powder coated components for commercial vehicles, trailers, and material handling equipment.",
      replace: "The [transport and logistics](/industries/transport-logistics) industry — including hauliers and fleet operators across [West Midlands](/counties/west-midlands) and [Lancashire](/counties/lancashire) — relies heavily on powder coated components for commercial vehicles, trailers, and material handling equipment.",
    },
    {
      find: "Agricultural equipment presents particularly challenging coating requirements, with exposure to fertilisers, pesticides, moisture, and mechanical abrasion.",
      replace: "Agricultural equipment presents particularly challenging coating requirements, with exposure to fertilisers, pesticides, moisture, and mechanical abrasion. Farmers and contractors across [Yorkshire](/counties/yorkshire) and [Lincolnshire](/counties/lincolnshire) rely on shot blasted and powder coated components to keep machinery operational season after season.",
    },
  ],

  // Post 4: Cladding Restoration
  "factory-warehouse-cladding-restoration": [
    {
      find: "For large industrial facilities, these savings can amount to hundreds of thousands of pounds.",
      replace: "For large industrial facilities — including the many warehouse estates across [Lancashire](/counties/lancashire), [Yorkshire](/counties/yorkshire), and the [West Midlands](/counties/west-midlands) — these savings can amount to hundreds of thousands of pounds.",
    },
    {
      find: "Whether you're managing [industrial facilities](/industries/manufacturing), commercial properties, or heritage structures, shot blasting-based cladding restoration delivers the results your building deserves.",
      replace: "Whether you're managing [industrial facilities](/industries/manufacturing), commercial properties, or heritage structures across our [service areas](/service-areas), shot blasting-based cladding restoration delivers the results your building deserves.",
    },
  ],

  // Post 60001: Birmingham (HTML format)
  "shot-blasting-birmingham-west-midlands-2026": [
    {
      find: "<p>We cover Birmingham, Wolverhampton, Coventry, Derby, Leicester, and all surrounding areas across the West Midlands and East Midlands.",
      replace: "<p>We cover Birmingham, Wolverhampton, Coventry, Derby, Leicester, and all surrounding areas. Our <a href=\"/counties/west-midlands\">West Midlands</a> coverage extends into <a href=\"/counties/warwickshire\">Warwickshire</a> and <a href=\"/counties/staffordshire\">Staffordshire</a>, and you can <a href=\"/service-areas\">search all service areas</a> to find your nearest location.",
    },
  ],

  // Post 90001: Intumescent Painting
  "why-shot-blasting-essential-before-intumescent-painting": [
    {
      find: "This article explains why [shot blasting](/services/intumescent-painting) is the industry-standard preparation method before intumescent painting",
      replace: "This article explains why [shot blasting](/services/intumescent-painting) is the industry-standard preparation method before intumescent painting — a requirement we fulfil daily for construction contractors across [West Midlands](/counties/west-midlands), [Yorkshire](/counties/yorkshire), and [Staffordshire](/counties/staffordshire)",
    },
    {
      find: "If you are specifying intumescent painting for a project, insist on shot blasting to Sa 2.5 as the minimum preparation standard.",
      replace: "If you are specifying intumescent painting for a project anywhere across our [service areas](/service-areas), insist on shot blasting to Sa 2.5 as the minimum preparation standard.",
    },
  ],
};

let totalUpdated = 0;

for (const post of posts) {
  const patches = linkPatches[post.slug];
  if (!patches) {
    console.log(`Skipping post ${post.slug} (no patches defined)`);
    continue;
  }

  let content = post.content;
  let changed = false;

  for (const patch of patches) {
    if (content.includes(patch.find)) {
      content = content.replace(patch.find, patch.replace);
      changed = true;
      console.log(`  ✓ Applied patch to "${post.slug}": "${patch.find.slice(0, 60)}..."`);
    } else {
      console.warn(`  ✗ Patch NOT found in "${post.slug}": "${patch.find.slice(0, 60)}..."`);
    }
  }

  if (changed) {
    await connection.execute(
      "UPDATE blog_posts SET content = ? WHERE id = ?",
      [content, post.id]
    );
    totalUpdated++;
    console.log(`  → Updated post ID ${post.id} (${post.slug})`);
  }
}

await connection.end();
console.log(`\nDone. Updated ${totalUpdated} blog posts.`);
