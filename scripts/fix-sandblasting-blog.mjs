import { createConnection } from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const db = await createConnection(process.env.DATABASE_URL);

const content = `<p>The terms "shot blasting" and "sandblasting" are often used interchangeably by clients, but they describe different processes that produce different results on different substrates. Choosing the wrong method can lead to inadequate surface preparation, coating failure, or unnecessary cost. This article explains the key differences so you can specify the right process for your project.</p>

<h2>What Is Sandblasting?</h2>

<p>Sandblasting — more accurately called <strong>abrasive blasting</strong> or <strong>grit blasting</strong> — is a surface preparation process in which abrasive particles are propelled at high velocity against a surface using compressed air. The abrasive strips rust, mill scale, paint, and other contaminants from the substrate and creates a mechanical anchor profile for subsequent coatings.</p>

<p>Historically, the abrasive used was silica sand. However, silica sand has been banned for use in blasting operations in the UK and across the EU since 1966 under the Blasting (Castings and Other Articles) Special Regulations, because fine silica dust causes silicosis — a fatal and irreversible lung disease. Modern abrasive blasting operations use alternative media such as steel grit, aluminium oxide, garnet, or recycled glass. The term "sandblasting" has persisted in common usage despite the ban, which is why you will still hear it used to describe what is technically abrasive grit blasting.</p>

<h2>What Is Shot Blasting?</h2>

<p>Shot blasting is a specific form of abrasive blasting in which the abrasive is propelled by a <strong>centrifugal wheel</strong> rather than compressed air. Steel shot or steel grit is fed into a spinning impeller wheel that accelerates the particles to high velocity and directs them at the workpiece. The process is typically carried out in an enclosed blast cabinet or blast room, or using a self-contained mobile blast unit for on-site work.</p>

<p>The key distinction is the propulsion method: compressed air (abrasive blasting / "sandblasting") versus centrifugal wheel (shot blasting). Both methods achieve similar surface cleanliness standards, but they differ in efficiency, cost, and the type of profile they produce.</p>

<h2>Key Differences at a Glance</h2>

<div style="overflow-x:auto; margin: 1.5rem 0;">
  <table style="width:100%; border-collapse:collapse; font-size:0.95rem;">
    <thead>
      <tr style="background:#2C5F7F; color:#fff;">
        <th style="padding:10px 14px; text-align:left; border:1px solid #1e4a63;">Factor</th>
        <th style="padding:10px 14px; text-align:left; border:1px solid #1e4a63;">Shot Blasting (Wheel)</th>
        <th style="padding:10px 14px; text-align:left; border:1px solid #1e4a63;">Abrasive / Grit Blasting (Air)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#f9f7f3;">
        <td style="padding:9px 14px; border:1px solid #ddd;">Propulsion method</td>
        <td style="padding:9px 14px; border:1px solid #ddd;">Centrifugal wheel</td>
        <td style="padding:9px 14px; border:1px solid #ddd;">Compressed air</td>
      </tr>
      <tr>
        <td style="padding:9px 14px; border:1px solid #ddd;">Production rate</td>
        <td style="padding:9px 14px; border:1px solid #ddd;">Very high (up to 30 m²/hr)</td>
        <td style="padding:9px 14px; border:1px solid #ddd;">Moderate (3–10 m²/hr)</td>
      </tr>
      <tr style="background:#f9f7f3;">
        <td style="padding:9px 14px; border:1px solid #ddd;">Media consumption</td>
        <td style="padding:9px 14px; border:1px solid #ddd;">Low (closed-loop recycling)</td>
        <td style="padding:9px 14px; border:1px solid #ddd;">Higher (open-loop or partial recovery)</td>
      </tr>
      <tr>
        <td style="padding:9px 14px; border:1px solid #ddd;">Profile type</td>
        <td style="padding:9px 14px; border:1px solid #ddd;">Rounded (shot) or angular (grit)</td>
        <td style="padding:9px 14px; border:1px solid #ddd;">Angular</td>
      </tr>
      <tr style="background:#f9f7f3;">
        <td style="padding:9px 14px; border:1px solid #ddd;">Dust generation</td>
        <td style="padding:9px 14px; border:1px solid #ddd;">Low (enclosed process)</td>
        <td style="padding:9px 14px; border:1px solid #ddd;">Higher (open process)</td>
      </tr>
      <tr>
        <td style="padding:9px 14px; border:1px solid #ddd;">Portability</td>
        <td style="padding:9px 14px; border:1px solid #ddd;">Limited (requires blast room or mobile unit)</td>
        <td style="padding:9px 14px; border:1px solid #ddd;">High (can access any geometry)</td>
      </tr>
      <tr style="background:#f9f7f3;">
        <td style="padding:9px 14px; border:1px solid #ddd;">Best suited for</td>
        <td style="padding:9px 14px; border:1px solid #ddd;">Flat or regular surfaces, high volume</td>
        <td style="padding:9px 14px; border:1px solid #ddd;">Complex shapes, on-site work, spot repairs</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Which Method Is Right for Your Project?</h2>

<h3>Large Flat Surfaces and Structural Steel</h3>

<p>For high-volume work on flat or regularly shaped surfaces — steel floors, structural beams, fabricated sections, and large plate — shot blasting with a centrifugal wheel is significantly faster and more cost-effective than compressed-air blasting. Our <a href="/services/structural-steel-frames" style="color:#2C5F7F; font-weight:600;">structural steel shot blasting</a> service uses mobile blast units that can process large areas efficiently on site.</p>

<h3>Complex Fabrications and Tight Access Areas</h3>

<p>For complex fabrications with internal cavities, tight angles, or irregular geometry, compressed-air blasting offers greater flexibility. The blast nozzle can be directed into areas that a centrifugal wheel cannot reach. Many projects require a combination of both methods: wheel blasting for the accessible flat areas and compressed-air blasting for the detail work.</p>

<h3>Factory Cladding and Roofing</h3>

<p><a href="/services/factory-cladding" style="color:#2C5F7F; font-weight:600;">Factory and warehouse cladding restoration</a> typically uses mobile shot blasting equipment that can be elevated on platforms to treat large areas of profiled steel sheeting efficiently. The enclosed nature of the process minimises dust and abrasive scatter, which is important for occupied or semi-occupied sites.</p>

<h3>Concrete and Masonry</h3>

<p>For concrete floors, bridge decks, and masonry surfaces, shot blasting is the preferred method. Specialist floor blasting machines use a self-contained blast and vacuum system that propels steel shot at the surface and immediately recovers the spent media and debris. This makes the process clean, fast, and suitable for indoor use without containment. Our <a href="/services/floor-preparation" style="color:#2C5F7F; font-weight:600;">concrete shot blasting</a> service covers industrial and commercial floors across our <a href="/service-areas" style="color:#2C5F7F; font-weight:600;">service areas</a>.</p>

<h3>Rust Removal and Spot Repairs</h3>

<p>For localised rust removal or spot repairs on painted structures, compressed-air blasting with a hand-held nozzle is often the most practical approach. It can be carried out without mobilising a full blast unit and is well suited to maintenance work on bridges, marine structures, and plant equipment.</p>

<h2>The Profile Question</h2>

<p>One important technical difference between shot and grit media is the surface profile they produce. Steel shot produces a <strong>rounded, peened profile</strong>, while steel grit produces a <strong>sharp, angular profile</strong>. Most coating specifications require an angular profile because it provides better mechanical adhesion for the coating. For this reason, steel grit or a shot/grit mix is the most common choice for structural steel preparation, while pure steel shot is more often used for peening applications (improving fatigue resistance in springs, gears, and castings).</p>

<p>When specifying surface preparation, always confirm the required profile depth (in microns, measured by replica tape) and the profile type (angular or rounded) with your coating manufacturer. Our team can advise on the correct media selection to meet your coating specification.</p>

<h2>A Note on Health and Safety</h2>

<p>Both shot blasting and compressed-air abrasive blasting generate dust and noise. Operators must wear appropriate respiratory protective equipment (RPE), hearing protection, and blast-rated personal protective equipment (PPE). <strong>The use of silica sand as a blasting abrasive is illegal in the UK.</strong> All abrasive media used by Commercial Shot Blasting complies with current health and safety legislation, and our operatives are trained and certificated to the relevant standards.</p>

<h2>Coverage Across England and Wales</h2>

<p>We offer both shot blasting and abrasive blasting services across our <a href="/service-areas" style="color:#2C5F7F; font-weight:600;">35-county service area</a>, from <a href="/counties/yorkshire" style="color:#2C5F7F; font-weight:600;">Yorkshire</a> and <a href="/counties/greater-manchester" style="color:#2C5F7F; font-weight:600;">Greater Manchester</a> in the north to <a href="/counties/kent" style="color:#2C5F7F; font-weight:600;">Kent</a> and <a href="/counties/hampshire" style="color:#2C5F7F; font-weight:600;">Hampshire</a> in the south. Our <a href="/counties/west-midlands" style="color:#2C5F7F; font-weight:600;">West Midlands</a> and <a href="/counties/staffordshire" style="color:#2C5F7F; font-weight:600;">Staffordshire</a> base allows rapid response across the Midlands.</p>

<p>To discuss your project and arrange a site visit, call <strong>07721 375756</strong> or use our <a href="/contact" style="color:#2C5F7F; font-weight:600;">online contact form</a>.</p>`;

try {
  const [rows] = await db.execute(
    "SELECT id FROM blog_posts WHERE slug = 'shot-blasting-vs-sandblasting-difference' LIMIT 1"
  );
  if (rows.length === 0) {
    console.log("Post not found");
    process.exit(1);
  }

  await db.execute(
    "UPDATE blog_posts SET content = ? WHERE slug = 'shot-blasting-vs-sandblasting-difference'",
    [content]
  );
  console.log("✅ Blog post content updated successfully");
} catch (err) {
  console.error("Error:", err);
} finally {
  await db.end();
}
