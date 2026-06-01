import { readFileSync } from 'fs';
import { createConnection } from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });

const containerContent = readFileSync('/home/ubuntu/blog_container_blasting.md', 'utf8');
const wireBrushContent = readFileSync('/home/ubuntu/blog_wire_brushing.md', 'utf8');
const specifyContent = readFileSync('/home/ubuntu/blog_specify_surface_prep.md', 'utf8');

const posts = [
  {
    id: 200001,
    slug: 'shot-blasting-for-shipping-containers',
    title: 'Shot Blasting for Shipping Containers: The Complete Guide',
    excerpt: 'Shipping containers corrode from the outside in. Shot blasting is the only method that removes all rust, mill scale, and old coatings to create a surface ready for a long-lasting protective coating. This guide covers the full process, costs, and standards.',
    content: containerContent,
    author: 'Commercial Shot Blasting',
    category: 'Services',
    tags: JSON.stringify(['container shot blasting', 'shipping containers', 'rust removal', 'SA2.5', 'surface preparation']),
    featuredImage: '/blog-placeholder.jpg',
    metaDescription: 'Shot blasting for shipping containers: how it works, what standard to specify, how long it takes, and how much it costs. Complete guide for container owners and fleet operators.',
    isPublished: true,
    publishedAt: new Date('2026-06-02'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 200002,
    slug: 'shot-blasting-vs-wire-brushing',
    title: 'Shot Blasting vs Wire Brushing: Which Is Right for Your Project?',
    excerpt: 'Wire brushing and shot blasting both clean steel — but they are not equivalent. This guide explains the key differences, when each method is appropriate, and why most industrial coating specifications require shot blasting as the minimum standard.',
    content: wireBrushContent,
    author: 'Commercial Shot Blasting',
    category: 'Guides',
    tags: JSON.stringify(['shot blasting vs wire brushing', 'surface preparation', 'ISO 8501-1', 'Sa 2.5', 'St 3']),
    featuredImage: '/blog-placeholder.jpg',
    metaDescription: 'Shot blasting vs wire brushing: a detailed comparison of surface preparation methods for structural steel. Learn which standard applies to your project and why surface profile matters.',
    isPublished: true,
    publishedAt: new Date('2026-06-02'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 200003,
    slug: 'how-to-specify-surface-preparation-for-structural-steel',
    title: 'How to Specify Surface Preparation for Structural Steel',
    excerpt: 'Getting the surface preparation specification right is one of the most important decisions in any structural steel project. This guide covers ISO 8501-1 blast standards, surface profile requirements, and how to write a complete specification that protects your project.',
    content: specifyContent,
    author: 'Commercial Shot Blasting',
    category: 'Technical Guides',
    tags: JSON.stringify(['surface preparation specification', 'ISO 8501-1', 'Sa 2.5', 'structural steel', 'blast cleaning standard']),
    featuredImage: '/blog-placeholder.jpg',
    metaDescription: 'How to specify surface preparation for structural steel: ISO 8501-1 standards, surface profile requirements, and a complete specification checklist for project managers and engineers.',
    isPublished: true,
    publishedAt: new Date('2026-06-02'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const conn = await createConnection(process.env.DATABASE_URL);

for (const post of posts) {
  const [existing] = await conn.execute('SELECT id FROM blog_posts WHERE id = ?', [post.id]);
  if (existing.length > 0) {
    console.log(`Post ${post.id} already exists, skipping.`);
    continue;
  }
  await conn.execute(
    `INSERT INTO blog_posts (id, slug, title, excerpt, content, featuredImage, author, category, tags, metaDescription, isPublished, publishedAt, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [post.id, post.slug, post.title, post.excerpt, post.content, post.featuredImage, post.author, post.category, post.tags, post.metaDescription, post.isPublished ? 1 : 0, post.publishedAt, post.createdAt, post.updatedAt]
  );
  console.log(`Inserted post ${post.id}: ${post.title}`);
}

await conn.end();
console.log('Done.');
