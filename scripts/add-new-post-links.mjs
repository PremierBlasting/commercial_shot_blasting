#!/usr/bin/env node
// Add contextual internal links to the 3 new blog posts (100001, 100002, 100003)
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config({ path: new URL("../.env", import.meta.url).pathname });

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// ── POST 100002: shot blasting vs sandblasting ──────────────────────────────
// Add links to service pages and county pages in the "Which Method" section
const [rows2] = await conn.execute("SELECT content FROM blog_posts WHERE id = 100002");
let c2 = rows2[0].content;

// Link "structural steel" to the structural steel service page
c2 = c2.replace(
  /For high-volume work on flat or regularly shaped surfaces — steel floors, structural beams, and large fabrications — shot blasting is the preferred method\./,
  `For high-volume work on flat or regularly shaped surfaces — steel floors, structural beams, and large fabrications — shot blasting is the preferred method. Our [structural steel shot blasting](/services/structural-steel-shot-blasting) service is available across the UK, with strong coverage in the [West Midlands](/counties/west-midlands), [Yorkshire](/counties/yorkshire), and [Lancashire](/counties/lancashire).`
);

// Link "cladding" to cladding service page
c2 = c2.replace(
  /Abrasive grit blasting is better suited to complex shapes, on-site spot repairs, and substrates where a shot blasting machine cannot be positioned\./,
  `Abrasive grit blasting is better suited to complex shapes, on-site spot repairs, and substrates where a shot blasting machine cannot be positioned. It is commonly used for [factory cladding restoration](/services/factory-cladding-shot-blasting) and [machinery shot blasting](/services/machinery-equipment-shot-blasting) where access is restricted.`
);

// Link "service areas" at the end of the post
c2 = c2.replace(
  /If you are unsure which method is right for your project, contact our team for a no-obligation assessment\./,
  `If you are unsure which method is right for your project, contact our team for a no-obligation assessment. We cover all major industrial regions — browse our [service areas](/service-areas) to find your nearest coverage zone.`
);

await conn.execute("UPDATE blog_posts SET content = ? WHERE id = 100002", [c2]);
console.log("Post 100002 updated");

// ── POST 100003: structural steel standards ─────────────────────────────────
const [rows3] = await conn.execute("SELECT content FROM blog_posts WHERE id = 100003");
let c3 = rows3[0].content;

// Add county links in the "Choosing a Contractor" section
c3 = c3.replace(
  /When selecting a shot blasting contractor for structural steel work, look for the following:/,
  `When selecting a shot blasting contractor for structural steel work in the UK — whether in [Staffordshire](/counties/staffordshire), [Yorkshire](/counties/yorkshire), [Greater Manchester](/counties/greater-manchester), or any other region — look for the following:`
);

// Add link to floor shot blasting service in the "Floor Preparation" section if it exists
c3 = c3.replace(
  /Steel floors and concrete floors in industrial buildings are often specified to a surface profile for resin or epoxy coatings\./,
  `Steel floors and concrete floors in industrial buildings are often specified to a surface profile for resin or epoxy coatings. Our [floor shot blasting](/services/floor-shot-blasting) service achieves the required profile on both steel and concrete substrates.`
);

// Add service areas link near the end
c3 = c3.replace(
  /If you need a shot blasting contractor who understands structural steel specifications and can provide the documentation your project requires, contact Commercial Shot Blasting\./,
  `If you need a shot blasting contractor who understands structural steel specifications and can provide the documentation your project requires, contact Commercial Shot Blasting. We operate across England and Wales — view our full [service areas](/service-areas) or find your [county coverage](/counties) page for local information.`
);

await conn.execute("UPDATE blog_posts SET content = ? WHERE id = 100003", [c3]);
console.log("Post 100003 updated");

// ── POST 100001: cost guide ─────────────────────────────────────────────────
// Already has good links — add a few more to service pages
const [rows1] = await conn.execute("SELECT content FROM blog_posts WHERE id = 100001");
let c1 = rows1[0].content;

// Link "floor shot blasting" in the cost table section
c1 = c1.replace(
  /Concrete floor preparation \(Sa 2\.5\)/,
  `[Concrete floor preparation](/services/floor-shot-blasting) (Sa 2.5)`
);

// Link "machinery" in the cost table
c1 = c1.replace(
  /Machinery and equipment/,
  `[Machinery and equipment](/services/machinery-equipment-shot-blasting)`
);

// Add Yorkshire and Lancashire county links in the "How to Get an Accurate Quote" section
c1 = c1.replace(
  /The best way to get an accurate price is to request a site visit\./,
  `The best way to get an accurate price is to request a site visit. We cover all major industrial regions including [Yorkshire](/counties/yorkshire), [Lancashire](/counties/lancashire), [Staffordshire](/counties/staffordshire), and the [West Midlands](/counties/west-midlands).`
);

await conn.execute("UPDATE blog_posts SET content = ? WHERE id = 100001", [c1]);
console.log("Post 100001 updated");

await conn.end();
console.log("All 3 new blog posts updated with additional internal links.");
