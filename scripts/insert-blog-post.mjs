/**
 * One-off script to insert the Birmingham blog post directly into the database.
 * Run: node scripts/insert-blog-post.mjs
 */
import { createRequire } from "module";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import * as dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const require = createRequire(import.meta.url);
const mysql = require("mysql2/promise");

const content = `<h2>Why Birmingham Businesses Choose Professional Shot Blasting</h2>
<p>Birmingham and the wider West Midlands have long been the heartland of British manufacturing and engineering. From the steel fabricators of the Black Country to the construction contractors rebuilding the city centre, the demand for reliable, high-quality <strong>shot blasting in Birmingham</strong> has never been greater. Whether you need rust removal from structural steelwork, paint stripping from factory cladding, or surface preparation ahead of a protective coating, our team delivers results that meet the most demanding commercial and industrial specifications.</p>

<h2>What Is Shot Blasting and Why Does It Matter?</h2>
<p>Shot blasting is a mechanical surface preparation process in which abrasive media — typically steel shot, steel grit, or garnet — is propelled at high velocity onto a surface to remove rust, mill scale, old coatings, and contaminants. The result is a clean, profiled surface that provides the ideal key for paints, primers, powder coatings, and other protective finishes.</p>
<p>In the UK, surface preparation for structural steel and industrial components is governed by <strong>BS EN ISO 8501</strong>, the internationally recognised standard for visual assessment of surface cleanliness. Achieving the correct preparation grade — typically Sa 2½ (near-white metal) for steel that will be coated in aggressive environments — is only reliably achievable through professional shot blasting. Inadequate surface preparation is the single most common cause of premature coating failure, making the choice of contractor critical.</p>

<h2>Industries We Serve Across Birmingham and the West Midlands</h2>
<p>Our Birmingham-area clients span a wide range of commercial and industrial sectors:</p>
<ul>
  <li><strong>Construction and steel fabrication</strong> — structural steel frames, beams, columns, and connections prepared to Sa 2½ before priming and painting</li>
  <li><strong>Manufacturing and engineering</strong> — plant, machinery, process pipework, and fabricated components stripped and profiled for recoating</li>
  <li><strong>Commercial property</strong> — factory and warehouse cladding, steel doors, roller shutters, and fire escapes restored to a clean substrate</li>
  <li><strong>Transport and logistics</strong> — commercial vehicle bodywork, trailers, and chassis prepared for corrosion protection</li>
  <li><strong>Heritage and restoration</strong> — ornamental ironwork, gates, railings, and architectural metalwork cleaned without damage to the underlying metal</li>
</ul>
<p>If your project involves metal, concrete, brick, or timber that needs a clean, prepared surface, our shot blasting service is almost certainly the most cost-effective solution.</p>

<h2>Mobile Shot Blasting: We Come to Your Site</h2>
<p>One of the most common misconceptions about shot blasting is that components must be transported to a fixed facility. Our team operates fully mobile shot blasting equipment, meaning we can come directly to your Birmingham site — whether that is a construction site, a manufacturing plant, a commercial premises, or a storage yard. This eliminates the cost and risk of transporting large or heavy fabrications and allows us to work around your production schedule.</p>
<p>For larger structures such as steel frames, bridge sections, or building cladding that cannot be moved at all, mobile blasting is the only practical option. Our mobile shot blasting service is fully self-contained, with its own power generation and dust suppression where required.</p>

<h2>Surface Preparation Standards We Work To</h2>
<p>All our work is carried out to the relevant British and international standards. For steel surfaces, we routinely achieve:</p>
<ul>
  <li><strong>Sa 2½ (Near-White Metal)</strong> — the standard specified by most paint and coating manufacturers for industrial and marine environments</li>
  <li><strong>Sa 3 (White Metal)</strong> — for the most demanding applications, including offshore and chemical plant environments</li>
  <li><strong>Sa 2 (Thorough Blast Cleaning)</strong> — for less aggressive environments where a full near-white finish is not required</li>
</ul>
<p>We are happy to discuss the specific preparation grade required by your coating specification and confirm in writing that the finished surface meets the stated standard. This documentation is increasingly required by specifiers, main contractors, and coating warranty providers.</p>

<h2>How to Get a Quote for Shot Blasting in Birmingham</h2>
<p>Getting a quote is straightforward. Send us a brief description of the work — the material, the approximate surface area, the current condition, and the required preparation grade or coating system — and we will provide a clear, itemised quotation, typically within 24 hours. For larger or more complex projects, we are happy to visit site and provide a detailed assessment at no charge.</p>
<p>We cover Birmingham, Wolverhampton, Coventry, Derby, Leicester, and all surrounding areas across the West Midlands and East Midlands. Our team is experienced, fully insured, and committed to delivering work on time and to specification.</p>

<h2>Get a Free Quote Today</h2>
<p>Ready to discuss your project? Call us on <strong>07970 566409</strong> or use our contact form to send us your details. We look forward to helping you achieve the surface finish your project demands.</p>`;

const post = {
  slug: "shot-blasting-birmingham-west-midlands-2026",
  title: "Shot Blasting Services in Birmingham: West Midlands Industrial Surface Preparation",
  excerpt: "Birmingham and the West Midlands are home to some of the UK's most demanding commercial and industrial projects. Discover how professional shot blasting delivers the surface preparation results your project requires.",
  content,
  featuredImage: "https://commercialshotblasting.co.uk/manus-storage/blog-birmingham-shot-blasting_a78a77f9.jpg",
  author: "Commercial Shot Blasting",
  category: "Service Areas",
  tags: JSON.stringify(["Birmingham", "West Midlands", "shot blasting", "surface preparation", "industrial"]),
  metaDescription: "Professional shot blasting services in Birmingham and the West Midlands. Mobile grit blasting for steel, cladding, machinery and more. BS EN ISO 8501 compliant. Call 07970 566409.",
  isPublished: true,
};

const conn = await mysql.createConnection(process.env.DATABASE_URL);
try {
  const [result] = await conn.execute(
    `INSERT INTO blog_posts (slug, title, excerpt, content, featuredImage, author, category, tags, metaDescription, isPublished, publishedAt, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())`,
    [post.slug, post.title, post.excerpt, post.content, post.featuredImage, post.author, post.category, post.tags, post.metaDescription, post.isPublished]
  );
  console.log("✅ Blog post inserted successfully. Insert ID:", result.insertId);
  console.log("🔗 Live URL: https://commercialshotblasting.co.uk/blog/" + post.slug);
} catch (err) {
  if (err.code === "ER_DUP_ENTRY") {
    console.log("⚠️  Post already exists (duplicate slug) — skipping.");
  } else {
    throw err;
  }
} finally {
  await conn.end();
}
