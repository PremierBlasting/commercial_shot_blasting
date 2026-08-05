/**
 * Insert the two new blog posts (external staircases + steel fabrications) into production DB.
 * Run: node scripts/insert-staircase-fabrications-posts.mjs
 */
import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";
import * as dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const require = createRequire(import.meta.url);
const mysql = require("mysql2/promise");

const posts = [
  {
    slug: "shot-blasting-external-staircases",
    title: "Shot Blasting External Staircases: The Complete Guide to Rust Removal and Surface Preparation",
    excerpt: "External steel staircases are among the most rust-prone structures on any commercial or industrial site. Constant exposure to rain, frost, and humidity causes paint to fail and rust to spread rapidly. Shot blasting is the most effective and durable solution — here is everything you need to know.",
    content: `<h2>Why External Staircases Rust So Quickly</h2>
<p>External steel staircases face a relentless assault from the elements. Rain saturates joints and crevices, frost causes expansion and contraction that cracks paint films, and UV exposure degrades coatings from the outside in. The result is predictable: paint blisters, lifts, and falls away, exposing bare steel that begins to rust within hours in wet conditions.</p>
<p>Once rust takes hold beneath a paint film, the corrosion spreads laterally — often invisibly — until the paint peels in large sheets. At that point, grinding or wire-brushing is rarely sufficient to achieve the clean, profiled surface that a new coating system needs to bond to. <strong>Shot blasting external staircases</strong> is the only method that reliably strips the surface back to bare metal and creates the anchor profile required for a long-lasting finish.</p>
<figure>
  <img src="https://commercialshotblasting.co.uk/manus-storage/staircase_during1_e3065e80.jpg" alt="Commercial Shot Blasting operative shot blasting an external steel staircase on-site — rust and old paint being stripped back to bare metal" loading="lazy" width="480" height="640" />
  <figcaption>Our operative shot blasting an external steel staircase on-site. The yellow rust and old paint are stripped back to clean bare metal in a single pass.</figcaption>
</figure>
<h2>What Is Shot Blasting and How Does It Work on Staircases?</h2>
<p>Shot blasting is a mechanical surface preparation process in which abrasive media — in our case iron silicate (copper slag) — is propelled at high velocity against the steel surface using a blast nozzle. The impact of the abrasive removes rust, mill scale, old paint, and contamination simultaneously, leaving a clean, uniformly profiled surface.</p>
<p>On external staircases, the process covers every part of the structure: treads, risers, stringers, handrails, brackets, and fixing plates. The abrasive reaches into corners and joints that wire brushes and angle grinders cannot access, ensuring a consistent surface preparation standard across the entire staircase.</p>
<p>We work to <strong>Sa 2.5 near-white metal standard</strong> — the specification required by most protective coating systems including epoxy primers, polyurethane topcoats, and intumescent paints. This standard is defined in ISO 8501-1 and means that at least 95% of the surface is free from all visible rust, mill scale, paint, and foreign matter.</p>
<h2>On-Site Mobile Service — No Dismantling Required</h2>
<p>One of the most common questions we receive is whether the staircase needs to be dismantled before blasting. The answer is no. Our mobile blasting unit is self-contained and can be set up at your premises without any structural alterations. We blast the staircase in place — whether it is a single-flight fire escape, a multi-level access staircase, or a complex industrial structure.</p>
<figure>
  <img src="https://commercialshotblasting.co.uk/manus-storage/staircase_after1_2dc6ad73.jpg" alt="External steel staircase being shot blasted on-site at a commercial premises — full structure including treads, risers, and handrails being prepared to Sa 2.5 standard" loading="lazy" width="480" height="640" />
  <figcaption>The full staircase structure — treads, risers, stringers, and handrails — being prepared on-site. No dismantling or transport required.</figcaption>
</figure>
<p>We cover all of England and Wales. Our team arrives with all equipment, carries out the blast, and leaves the surface ready for immediate priming. We recommend applying a primer coat within four hours of blasting to prevent flash rusting, particularly in humid or damp conditions.</p>
<h2>How Long Does It Take to Shot Blast an External Staircase?</h2>
<p>Most external staircases can be completed in one to two days. The exact timescale depends on the size of the staircase, the severity of the rust and existing coating, and site access. We carry out a site survey before starting and give you an accurate programme so you can plan around the work.</p>
<p>Because we work on-site, there is no waiting time for transport or collection. The staircase is ready for coating as soon as the blast is complete and the surface has been inspected.</p>
<h2>What Happens After Shot Blasting?</h2>
<p>Once the staircase has been blasted to Sa 2.5 standard, the surface is in the ideal condition for a new protective coating system. The Rz 50–75 μm anchor profile created by the blasting process gives the primer maximum mechanical adhesion, significantly extending the life of the coating compared to a surface prepared by hand tools or power tools.</p>
<figure>
  <img src="https://commercialshotblasting.co.uk/manus-storage/staircase_after2_48f3364b.jpg" alt="External steel staircase after shot blasting — clean Sa 2.5 near-white metal surface across treads, risers, and handrails, ready for priming and protective coating" loading="lazy" width="480" height="640" />
  <figcaption>The staircase after shot blasting — a clean, uniform Sa 2.5 near-white metal surface ready for immediate priming.</figcaption>
</figure>
<p>We do not apply coatings ourselves, but we work closely with your painting contractor to ensure the surface is handed over in the correct condition. We can advise on primer selection and application windows based on the blast standard achieved.</p>
<h2>Get a Quote for Shot Blasting Your External Staircase</h2>
<p>If you have an external steel staircase that needs rust removal and surface preparation, we offer a free no-obligation site visit across England and Wales. Call us on <strong>07721 375756</strong> or use the <a href="/external-staircases">External Staircases Shot Blasting</a> page to request a site visit.</p>
<p>You can also see our work in action on the <a href="/external-staircases">External Staircases page</a>, where we have embedded two videos showing the blasting process and the finished Sa 2.5 surface.</p>`,
    featuredImage: "https://commercialshotblasting.co.uk/manus-storage/staircase_during1_e3065e80.jpg",
    author: "Commercial Shot Blasting",
    category: "Surface Preparation",
    tags: JSON.stringify(["shot blasting external staircases", "external staircase rust removal", "Sa 2.5 surface preparation", "mobile shot blasting UK", "steel staircase shot blasting"]),
    faq: JSON.stringify([
      { question: "Do you need to dismantle the staircase before shot blasting?", answer: "No — we blast the staircase in place at your premises. Our mobile unit is self-contained and requires no structural alterations." },
      { question: "What standard do you blast external staircases to?", answer: "We blast to Sa 2.5 near-white metal standard with an Rz 50–75 μm anchor profile, as defined in ISO 8501-1." },
      { question: "How quickly can you start?", answer: "We typically offer same-week availability. Contact us for current lead times in your area." }
    ]),
    metaDescription: "Learn how shot blasting external staircases removes rust and old paint to Sa 2.5 near-white metal standard. Mobile on-site service across England and Wales. No dismantling required. Call 07721 375756.",
    isPublished: true,
  },
  {
    slug: "shot-blasting-steel-fabrications-uk",
    title: "Shot Blasting Steel Fabrications UK: Before & After Project Photos and What to Expect",
    excerpt: "Fabricated steelwork arrives from the workshop covered in mill scale, weld spatter, and surface rust. Shot blasting is the only reliable way to prepare it for a long-lasting protective coating. Here we show five real projects — with before and after photos — and explain exactly what the process involves.",
    content: `<h2>Why Fabricated Steel Needs Shot Blasting Before Coating</h2>
<p>Steel fabrications — frames, brackets, base plates, staircases, mezzanine structures, and bespoke metalwork — leave the fabrication workshop with a surface that is far from coating-ready. Mill scale, the hard oxide layer formed during hot rolling, covers the steel and is weakly bonded to the substrate. Weld spatter, grinding marks, and surface rust add further contamination. If a primer is applied over this surface, it bonds to the mill scale rather than to the steel itself — and when the mill scale eventually detaches, it takes the entire coating system with it.</p>
<p><strong>Shot blasting steel fabrications</strong> removes all of this in a single operation. The abrasive media strips mill scale, rust, weld spatter, and any existing coatings simultaneously, leaving a clean, uniformly profiled surface that a primer can bond to directly. The result is a coating system that lasts years longer than one applied over a poorly prepared surface.</p>
<figure>
  <img src="https://commercialshotblasting.co.uk/manus-storage/SteelFabrications1before_090ae51a.jpg" alt="Steel fabrication before shot blasting — heavy mill scale, rust, and weld spatter covering the surface of a fabricated steel structure" loading="lazy" width="800" height="600" />
  <figcaption>Project 1 — before shot blasting. Heavy mill scale and surface rust across the entire fabricated structure.</figcaption>
</figure>
<h2>Project 1: Fabricated Steel Structure — Before, During, and After</h2>
<p>This project involved a fabricated steel structure with significant mill scale and surface rust. The before photo shows the typical condition of fabricated steelwork arriving from the workshop: a dark, uneven surface with areas of red rust at welds and cut edges.</p>
<figure>
  <img src="https://commercialshotblasting.co.uk/manus-storage/SteelFabrications1During_856056db.jpg" alt="Shot blasting steel fabrication in progress on-site — abrasive media stripping mill scale and rust from fabricated steel structure" loading="lazy" width="800" height="600" />
  <figcaption>During blasting — the abrasive strips mill scale and rust back to bare metal in a single pass.</figcaption>
</figure>
<p>During blasting, the transformation is immediate. The abrasive media — iron silicate (copper slag) — removes the mill scale and rust in a single pass, revealing the clean steel beneath. The after photo shows the Sa 2.5 near-white metal surface ready for priming.</p>
<figure>
  <img src="https://commercialshotblasting.co.uk/manus-storage/SteelFabrications1After_ff77c1d1.jpg" alt="Steel fabrication after shot blasting to Sa 2.5 near-white metal standard — clean profiled surface ready for epoxy primer and protective coating" loading="lazy" width="800" height="600" />
  <figcaption>After shot blasting to Sa 2.5 — a clean, uniformly profiled surface ready for immediate priming.</figcaption>
</figure>
<h2>Project 2: Fabricated Steelwork — Before and After</h2>
<p>The second project shows a different fabricated assembly with a combination of mill scale and localised rust at welded joints. This is extremely common: the heat from welding burns away any mill scale in the immediate area, leaving bare steel that begins to rust quickly, while the surrounding areas retain their mill scale.</p>
<figure>
  <img src="https://commercialshotblasting.co.uk/manus-storage/SteelFabrications2before_c3997659.jpg" alt="Fabricated steel assembly before shot blasting — mill scale on flat surfaces and rust at welded joints, typical condition of new fabrications" loading="lazy" width="800" height="600" />
  <figcaption>Project 2 before — mill scale on flat surfaces with rust at welded joints. A very common condition for new fabrications.</figcaption>
</figure>
<figure>
  <img src="https://commercialshotblasting.co.uk/manus-storage/SteelFabrications2After_beae57f5.jpg" alt="Fabricated steel assembly after shot blasting — uniform Sa 2.5 near-white metal surface across all faces including welds, ready for protective coating" loading="lazy" width="800" height="600" />
  <figcaption>Project 2 after — a uniform Sa 2.5 surface across all faces including the welds, ready for coating.</figcaption>
</figure>
<h2>What Standard Do We Blast To?</h2>
<p>All of our <strong>steel fabrication shot blasting</strong> work is carried out to <strong>Sa 2.5 near-white metal standard</strong>, as defined in ISO 8501-1. This means at least 95% of the surface is free from all visible rust, mill scale, paint, and foreign matter. It is the standard specified by most protective coating manufacturers for epoxy primers, polyurethane topcoats, and intumescent fire protection coatings.</p>
<p>The blasting process also creates an anchor profile — a microscopic roughness on the steel surface — that gives the primer maximum mechanical adhesion. We target an Rz of 50–75 μm, which is within the optimal range for most industrial coating systems.</p>
<figure>
  <img src="https://commercialshotblasting.co.uk/manus-storage/SteelFabrications3Before_b1e94331.jpg" alt="Steel fabrications before shot blasting — surface rust and mill scale on structural steel components awaiting surface preparation" loading="lazy" width="800" height="600" />
  <figcaption>Project 3 before — structural steel components with mill scale and surface rust awaiting shot blasting.</figcaption>
</figure>
<figure>
  <img src="https://commercialshotblasting.co.uk/manus-storage/SteelFabrications3After_434a8bd1.jpg" alt="Steel fabrications after shot blasting to Sa 2.5 — clean near-white metal surface on structural steel components ready for priming" loading="lazy" width="800" height="600" />
  <figcaption>Project 3 after — Sa 2.5 near-white metal across all components, ready for immediate priming.</figcaption>
</figure>
<h2>Mobile On-Site Service Across the UK</h2>
<p>We provide <strong>shot blasting for steel fabrications across the UK</strong> — England and Wales. Our mobile blasting unit comes to your fabrication yard, warehouse, or construction site. There is no need to transport your fabrications to a fixed blast facility, which saves time, reduces handling risk, and eliminates the possibility of the surface rusting in transit.</p>
<p>Our team carries out a site survey before starting, agrees a programme with you, and hands the surface over ready for priming. We recommend applying the first primer coat within four hours of blasting to prevent flash rusting.</p>
<figure>
  <img src="https://commercialshotblasting.co.uk/manus-storage/SteelFabrications4before_dad326c3.jpg" alt="Fabricated steel components before mobile on-site shot blasting — rust and mill scale on steel frames and brackets" loading="lazy" width="800" height="600" />
  <figcaption>Project 4 before — rust and mill scale on fabricated frames and brackets at the client's site.</figcaption>
</figure>
<figure>
  <img src="https://commercialshotblasting.co.uk/manus-storage/SteelFabrications4After_f09f90c9.jpg" alt="Fabricated steel components after mobile on-site shot blasting — clean Sa 2.5 surface on steel frames and brackets, coating-ready" loading="lazy" width="800" height="600" />
  <figcaption>Project 4 after — clean Sa 2.5 surface on all components, ready for the painting contractor.</figcaption>
</figure>
<h2>Get a Quote for Shot Blasting Your Steel Fabrications</h2>
<p>If you have fabricated steelwork that needs surface preparation before coating, we offer a free no-obligation site visit and quotation. We cover all of England and Wales and can typically mobilise within the same week.</p>
<p>Call us on <strong>07721 375756</strong> or visit our <a href="/steel-fabrications">Steel Fabrications Shot Blasting</a> page to request a site visit and see more project photos including before, during, and after images from all five projects.</p>`,
    featuredImage: "https://commercialshotblasting.co.uk/manus-storage/SteelFabrications1before_090ae51a.jpg",
    author: "Commercial Shot Blasting",
    category: "Surface Preparation",
    tags: JSON.stringify(["shot blasting steel fabrications UK", "fabricated steel shot blasting", "mill scale removal fabrications", "Sa 2.5 steel fabrications", "mobile shot blasting fabrications UK"]),
    faq: JSON.stringify([
      { question: "Do you blast steel fabrications on-site or at a fixed facility?", answer: "We come to you. Our mobile blasting unit operates at your fabrication yard, warehouse, or construction site anywhere in England and Wales." },
      { question: "What surface standard do you achieve on fabricated steel?", answer: "We blast to Sa 2.5 near-white metal standard with an Rz 50–75 μm anchor profile, as defined in ISO 8501-1." },
      { question: "How soon after blasting should primer be applied?", answer: "We recommend applying the first primer coat within four hours of blasting to prevent flash rusting, particularly in humid conditions." }
    ]),
    metaDescription: "See real before and after photos of shot blasting steel fabrications UK. Mobile on-site service to Sa 2.5 near-white metal standard. Covers England and Wales. Call 07721 375756 for a free quote.",
    isPublished: true,
  }
];

const conn = await mysql.createConnection(process.env.DATABASE_URL);
try {
  for (const post of posts) {
    try {
      const [result] = await conn.execute(
        `INSERT INTO blog_posts (slug, title, excerpt, content, featuredImage, author, category, tags, faq, metaDescription, isPublished, publishedAt, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())`,
        [post.slug, post.title, post.excerpt, post.content, post.featuredImage, post.author, post.category, post.tags, post.faq, post.metaDescription, post.isPublished]
      );
      console.log(`✅ Inserted: ${post.slug} (ID: ${result.insertId})`);
      console.log(`🔗 https://commercialshotblasting.co.uk/blog/${post.slug}`);
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        console.log(`⚠️  Already exists: ${post.slug} — skipping.`);
      } else {
        throw err;
      }
    }
  }
} finally {
  await conn.end();
}
