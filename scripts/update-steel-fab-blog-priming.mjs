/**
 * Update the steel fabrications blog post to add a detailed priming/flash rust section.
 */
import mysql from "mysql2/promise";

const db = await mysql.createConnection(process.env.DATABASE_URL);

const primingSection = `
<h2>Prime and Paint Within 2–4 Hours of Blasting</h2>

<p>One of the most important things to understand about shot blasting steel fabrications is what happens <em>after</em> the blasting is complete. Once the steel has been stripped to Sa 2.5 near-white metal, the surface is highly reactive — and <strong>flash rusting can begin within 2–4 hours</strong> in normal UK conditions. In humid weather or coastal environments, this window can be even shorter.</p>

<p>This is not a flaw in the process — it is simply the nature of bare reactive steel. Shot blasting removes every layer of protection: mill scale, rust, old coatings, and contamination. What is left is a clean, profiled surface with a greatly increased surface area due to the anchor profile. That same profile that gives primers excellent adhesion also makes the steel more susceptible to oxidation if left unprotected.</p>

<h3>Why Flash Rust Compromises Your Coating</h3>

<p>Even a thin layer of flash rust — barely visible to the naked eye — will significantly reduce the adhesion of your primer coat. If a primer is applied over flash rust, the coating system effectively bonds to the rust rather than to the steel itself. This leads to premature coating failure, blistering, and delamination, often within months rather than years. The cost of reblasting and recoating far exceeds the cost of simply having your painter ready on the day.</p>

<h3>What to Do: The 2–4 Hour Rule</h3>

<p>The solution is straightforward: coordinate your painter to be on-site and ready to apply the first coat of primer <strong>within two to four hours of us finishing the blasting</strong>. For large batches of fabrications, we can work in sections — blasting one group of pieces while your painter primes the completed sections. This rolling approach means no piece sits unprotected for longer than necessary.</p>

<p>The recommended primer for shot blasted fabricated steel is an <strong>epoxy zinc phosphate primer</strong>, applied at the manufacturer's specified dry film thickness. This should then be overcoated with a polyurethane or epoxy topcoat suited to the service environment. For fabrications destined for intumescent fire protection, your coating supplier will specify the correct primer system.</p>

<p>If there is any unavoidable delay between blasting and priming — for example, if the fabrications need to be moved to a different area of site — store them in a dry, sheltered environment and inspect for flash rust before priming. Light flash rust can be removed with a clean dry cloth; heavier flash rust will require re-blasting.</p>

<p>We are always happy to discuss timing and coordinate our schedule around your painter's availability. Just mention it when you enquire and we will plan the job accordingly.</p>
`;

// Fetch current content
const [rows] = await db.execute(
  "SELECT id, content FROM blog_posts WHERE slug = 'shot-blasting-steel-fabrications-uk' LIMIT 1"
);

if (!rows.length) {
  console.error("Blog post not found");
  process.exit(1);
}

const post = rows[0];
console.log("Found post ID:", post.id);

// Insert the priming section before the closing </article> or before the last <h2> (Why Choose)
// We'll append it before the "Why Choose Commercial Shot Blasting" section
let updatedContent = post.content;

// Find a good insertion point — before the last h2 heading
const lastH2Index = updatedContent.lastIndexOf("<h2>");
if (lastH2Index === -1) {
  // Append at end
  updatedContent = updatedContent + primingSection;
} else {
  updatedContent =
    updatedContent.slice(0, lastH2Index) +
    primingSection +
    updatedContent.slice(lastH2Index);
}

await db.execute(
  "UPDATE blog_posts SET content = ? WHERE id = ?",
  [updatedContent, post.id]
);

console.log("✅ Steel fabrications blog post updated with priming/flash rust section");
await db.end();
