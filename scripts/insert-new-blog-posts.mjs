/**
 * Script to insert 3 new SEO blog posts into the database.
 * Run: node scripts/insert-new-blog-posts.mjs
 */

import mysql from "mysql2/promise";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

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

// Read the blog post content files
const costContent = readFileSync(join(__dirname, "../../blog_post_cost.md"), "utf8");
const vsContent = readFileSync(join(__dirname, "../../blog_post_vs_sandblasting.md"), "utf8");
const certContent = readFileSync(join(__dirname, "../../blog_post_certification.md"), "utf8");

const now = Date.now();

const posts = [
  {
    id: 100001,
    slug: "how-much-does-shot-blasting-cost-uk",
    title: "How Much Does Shot Blasting Cost in the UK? (2025 Price Guide)",
    excerpt: "Shot blasting costs vary widely depending on surface area, substrate condition, cleanliness standard, and location. This guide breaks down the real cost drivers and gives you realistic price ranges for 2025.",
    content: costContent,
    author: "Commercial Shot Blasting",
    category: "Pricing & Advice",
    tags: JSON.stringify(["shot blasting cost", "price guide", "surface preparation", "UK"]),
    featuredImage: "https://s3.eu-west-2.amazonaws.com/manus-webdev-static-assets-prod/commercial_shot_blasting_manus/shot-blasting-cost-guide.jpg",
    isPublished: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 100002,
    slug: "shot-blasting-vs-sandblasting-difference",
    title: "Shot Blasting vs Sandblasting: What's the Difference?",
    excerpt: "Shot blasting and sandblasting are often confused, but they use different propulsion methods and suit different applications. This article explains the key differences so you can specify the right process.",
    content: vsContent,
    author: "Commercial Shot Blasting",
    category: "Technical Guides",
    tags: JSON.stringify(["shot blasting", "sandblasting", "abrasive blasting", "surface preparation"]),
    featuredImage: "https://s3.eu-west-2.amazonaws.com/manus-webdev-static-assets-prod/commercial_shot_blasting_manus/shot-blasting-vs-sandblasting.jpg",
    isPublished: 1,
    createdAt: now + 1000,
    updatedAt: now + 1000,
  },
  {
    id: 100003,
    slug: "shot-blasting-structural-steel-standards-certification",
    title: "Shot Blasting for Structural Steel: Standards, Certification, and Compliance",
    excerpt: "ISO 8501-1, Sa 2.5, surface profile, salt contamination — this guide explains the standards, documentation, and compliance requirements for shot blasting structural steel on UK construction projects.",
    content: certContent,
    author: "Commercial Shot Blasting",
    category: "Technical Guides",
    tags: JSON.stringify(["ISO 8501-1", "Sa 2.5", "structural steel", "surface preparation standards", "certification"]),
    featuredImage: "https://s3.eu-west-2.amazonaws.com/manus-webdev-static-assets-prod/commercial_shot_blasting_manus/structural-steel-standards.jpg",
    isPublished: 1,
    createdAt: now + 2000,
    updatedAt: now + 2000,
  },
];

// Check which posts already exist
const [existing] = await connection.execute(
  "SELECT id FROM blog_posts WHERE id IN (100001, 100002, 100003)"
);
const existingIds = new Set(existing.map((r) => r.id));

for (const post of posts) {
  if (existingIds.has(post.id)) {
    console.log(`Skipping post ${post.id} (already exists)`);
    continue;
  }

  await connection.execute(
    `INSERT INTO blog_posts (id, slug, title, excerpt, content, featuredImage, author, category, tags, isPublished)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      post.id,
      post.slug,
      post.title,
      post.excerpt,
      post.content,
      post.featuredImage,
      post.author,
      post.category,
      post.tags,
      post.isPublished,
    ]
  );
  console.log(`✓ Inserted post ${post.id}: "${post.title}"`);
}

await connection.end();
console.log("\nDone.");
