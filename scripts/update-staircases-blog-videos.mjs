/**
 * Update the staircases blog post — replace still image figures with embedded videos.
 * Run: node scripts/update-staircases-blog-videos.mjs
 */
import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";
import * as dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const require = createRequire(import.meta.url);
const mysql = require("mysql2/promise");

const VIDEO_1 = "https://commercialshotblasting.co.uk/manus-storage/WhatsAppVideo2026-06-27at13.50.17(1)_eb3b71ad.mp4";
const VIDEO_2 = "https://commercialshotblasting.co.uk/manus-storage/WhatsAppVideo2026-06-27at13.50.17(2)_f192dcbc.mp4";
const THUMB   = "https://commercialshotblasting.co.uk/manus-storage/staircase_thumb_d419ab8f.jpg";

const newContent = `<h2>Why External Staircases Rust So Quickly</h2>
<p>External steel staircases face a relentless assault from the elements. Rain saturates joints and crevices, frost causes expansion and contraction that cracks paint films, and UV exposure degrades coatings from the outside in. The result is predictable: paint blisters, lifts, and falls away, exposing bare steel that begins to rust within hours in wet conditions.</p>
<p>Once rust takes hold beneath a paint film, the corrosion spreads laterally — often invisibly — until the paint peels in large sheets. At that point, grinding or wire-brushing is rarely sufficient to achieve the clean, profiled surface that a new coating system needs to bond to. <strong>Shot blasting external staircases</strong> is the only method that reliably strips the surface back to bare metal and creates the anchor profile required for a long-lasting finish. The same applies to <strong>fire escapes</strong> — external steel fire escape staircases are particularly vulnerable to rust because they are rarely painted as thoroughly as the main building structure, yet they are safety-critical and must be maintained to a high standard.</p>

<h2>What Is Shot Blasting and How Does It Work on Staircases?</h2>
<p>Shot blasting is a mechanical surface preparation process in which abrasive media — in our case iron silicate (copper slag) — is propelled at high velocity against the steel surface using a blast nozzle. The impact of the abrasive removes rust, mill scale, old paint, and contamination simultaneously, leaving a clean, uniformly profiled surface.</p>
<p>On external staircases and fire escapes, the process covers every part of the structure: treads, risers, stringers, handrails, brackets, and fixing plates. The abrasive reaches into corners and joints that wire brushes and angle grinders cannot access, ensuring a consistent surface preparation standard across the entire staircase.</p>
<p>We work to <strong>Sa 2.5 near-white metal standard</strong> — the specification required by most protective coating systems including epoxy primers, polyurethane topcoats, and intumescent paints. This standard is defined in ISO 8501-1 and means that at least 95% of the surface is free from all visible rust, mill scale, paint, and foreign matter.</p>

<figure style="margin: 2rem 0;">
  <video
    controls
    preload="metadata"
    poster="${THUMB}"
    style="width:100%; border-radius:12px; box-shadow:0 4px 24px rgba(0,0,0,0.18);"
    aria-label="Video showing shot blasting of an external steel staircase on-site — rust and old paint removed to Sa 2.5 near-white metal standard"
    title="External Staircase Shot Blasting — On-Site Mobile Service"
  >
    <source src="${VIDEO_1}" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <figcaption style="font-size:0.9rem;color:#555;margin-top:0.5rem;text-align:center;">Our mobile shot blasting unit in action on an external steel staircase — rust and old paint stripped to Sa 2.5 near-white metal standard in real time, on-site.</figcaption>
</figure>

<h2>On-Site Mobile Service — No Dismantling Required</h2>
<p>One of the most common questions we receive is whether the staircase needs to be dismantled before blasting. The answer is no. Our mobile blasting unit is self-contained and can be set up at your premises without any structural alterations. We blast the staircase in place — whether it is a single-flight fire escape, a multi-level access staircase, or a complex industrial structure.</p>
<p>We cover all of England and Wales. Our team arrives with all equipment, carries out the blast, and leaves the surface ready for immediate priming.</p>

<figure style="margin: 2rem 0;">
  <video
    controls
    preload="metadata"
    poster="${THUMB}"
    style="width:100%; border-radius:12px; box-shadow:0 4px 24px rgba(0,0,0,0.18);"
    aria-label="Video showing external steel staircase after shot blasting — clean Sa 2.5 near-white metal surface ready for protective coating"
    title="External Staircase After Shot Blasting — Sa 2.5 Surface Transformation"
  >
    <source src="${VIDEO_2}" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <figcaption style="font-size:0.9rem;color:#555;margin-top:0.5rem;text-align:center;">The finished Sa 2.5 near-white metal surface across the full staircase structure — treads, risers, stringers, and handrails — ready for the client's chosen coating system.</figcaption>
</figure>

<h2>Why Steel Must Be Primed and Painted Immediately After Blasting</h2>
<p>This is one of the most important points we stress to every client: <strong>blasted steel must be primed as quickly as possible after shot blasting — ideally within two to four hours</strong>. Here is why.</p>
<p>When shot blasting removes rust, mill scale, and old coatings, it exposes completely bare steel with a freshly created anchor profile. That bare steel is highly reactive. In normal atmospheric conditions — and especially in the damp British climate — a thin layer of flash rust can begin to form on the surface within as little as 30 minutes of blasting. In humid or wet conditions, visible rust can appear within an hour.</p>
<p>Flash rust is not the same as the deep corrosion that was removed by blasting. It is a superficial oxidation layer. However, if a primer is applied over flash rust rather than clean bare metal, the bond between the primer and the steel is compromised. The coating will fail prematurely — often within months rather than years — and the staircase will need to be reblasted and repainted all over again.</p>
<p>For this reason, we always coordinate with the painting contractor before we start blasting. The painter should be on-site and ready to apply the first primer coat as soon as we hand the surface over. For larger structures where blasting takes more than a day, we work in sections — blasting and priming each section before moving to the next — to ensure no blasted steel is left unprimed overnight.</p>
<p>We recommend a two-coat system for external staircases and fire escapes: an epoxy zinc phosphate primer applied immediately after blasting, followed by a polyurethane or alkyd topcoat. For fire escapes that require fire protection, an intumescent primer can be used as the first coat. The exact specification depends on the environment and the client's requirements — we are happy to advise.</p>

<h2>Shot Blasting Fire Escapes — The Same Process, Safety-Critical Results</h2>
<p><strong>Shot blasting fire escapes</strong> follows exactly the same process as external staircases. Fire escape steelwork is often neglected because it is out of sight at the rear of a building, but it is subject to the same corrosion risks — and the consequences of structural failure are far more serious. Local authorities and building inspectors increasingly require evidence that fire escapes have been properly maintained, and a shot-blasted and repainted fire escape is the most durable and verifiable way to demonstrate compliance.</p>
<p>We blast fire escapes to Sa 2.5 near-white metal standard, covering all structural members, treads, risers, handrails, and fixings. The process is carried out on-site without dismantling, and we can work around the building's operational requirements to minimise disruption.</p>

<h2>How Long Does It Take to Shot Blast an External Staircase or Fire Escape?</h2>
<p>Most external staircases and single-flight fire escapes can be completed in one to two days. Multi-level fire escapes or larger structures may take longer. We carry out a site survey before starting and give you an accurate programme so you can plan around the work and ensure your painting contractor is available immediately afterwards.</p>

<h2>Get a Quote for Shot Blasting Your External Staircase or Fire Escape</h2>
<p>If you have an external steel staircase or fire escape that needs rust removal and surface preparation, we offer a free no-obligation site visit across England and Wales. Call us on <strong>07721 375756</strong> or visit our <a href="/external-staircases">External Staircases Shot Blasting</a> page to request a site visit and watch the videos showing our work in action.</p>`;

const conn = await mysql.createConnection(process.env.DATABASE_URL);
try {
  const [result] = await conn.execute(
    `UPDATE blog_posts SET content = ?, updatedAt = NOW() WHERE slug = ?`,
    [newContent, "shot-blasting-external-staircases"]
  );
  if (result.affectedRows === 0) {
    console.log("⚠️  No post found with slug 'shot-blasting-external-staircases'");
  } else {
    console.log("✅ Blog post updated successfully.");
    console.log("🔗 https://commercialshotblasting.co.uk/blog/shot-blasting-external-staircases");
  }
} finally {
  await conn.end();
}
