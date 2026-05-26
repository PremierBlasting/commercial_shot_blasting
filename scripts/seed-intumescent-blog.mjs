import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const slug = "why-shot-blasting-essential-before-intumescent-painting";
const title = "Why Shot Blasting is Essential Before Intumescent Painting";
const excerpt =
  "Intumescent paint only performs correctly when applied to properly prepared steel. Discover why shot blasting to Sa 2.5 is the industry-standard first step — and what happens when it is skipped.";
const featuredImage =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80";
const author = "Commercial Shot Blasting";
const category = "Technical Guides";
const tags = JSON.stringify([
  "intumescent painting",
  "shot blasting",
  "fire protection",
  "structural steel",
  "surface preparation",
  "Sa 2.5",
]);
const metaDescription =
  "Learn why shot blasting to Sa 2.5 is essential before applying intumescent paint to structural steel. Covers adhesion, DFT requirements, and fire resistance ratings R30–R120.";

const content = `# Why Shot Blasting is Essential Before Intumescent Painting

Intumescent paint is one of the most effective passive fire protection systems available for structural steel. When exposed to heat, the coating expands to form an insulating char layer that maintains the steel's structural integrity for the specified fire resistance period — typically R30, R60, R90, or R120. However, intumescent coatings are only as good as the surface they are applied to. Without proper surface preparation, even the most expensive intumescent system will fail to deliver its rated performance.

This article explains why [shot blasting](/services/intumescent-painting) is the industry-standard preparation method before intumescent painting, what the consequences of inadequate preparation are, and how Commercial Shot Blasting delivers a complete in-house service from bare steel to fully documented fire-resistant coating.

## The Adhesion Problem

Intumescent coatings work by expanding under heat — typically by a factor of 25 to 50 times their original thickness. This expansion generates enormous mechanical forces within the coating layer. For the char to remain in place and provide insulation during a fire, the coating must have exceptional adhesion to the steel substrate. Any weakness in the bond between the coating and the steel will cause the char to detach at the worst possible moment.

Mill scale, rust, old paint, oil contamination, and surface salts all compromise adhesion. Mill scale — the blue-grey oxide layer that forms on steel during hot rolling — is particularly problematic. It appears solid and well-bonded, but it is actually cathodic to steel and will eventually delaminate, taking the intumescent coating with it. Wire brushing and grinding cannot reliably remove mill scale. Only abrasive blasting achieves the complete removal required.

## Why Sa 2.5 is the Minimum Standard

The international standard ISO 8501-1 defines cleanliness grades for steel surfaces prepared by abrasive blasting. For intumescent painting, the minimum requirement specified by virtually all intumescent coating manufacturers is **Sa 2.5 — Very Thorough Blast Cleaning**. At Sa 2.5, all mill scale, rust, and old coatings are removed, leaving the steel with a light sheen of metallic colour. No more than 5% of the surface may show traces of contamination.

Some specifications require **Sa 3 — Blast Cleaning to Visually Clean Steel**, where the surface appears uniformly metallic with no visible contamination. This is typically required for aggressive environments or where the highest fire resistance ratings are needed.

Shot blasting achieves Sa 2.5 or Sa 3 consistently across the entire steel surface. Manual methods such as needle gunning or disc grinding can achieve Sa 2 at best, and only in localised areas. For [structural steel frames](/services/structural-steel-frames), beams, columns, and complex fabrications, shot blasting is the only practical method for achieving the required cleanliness standard across all surfaces.

## Surface Profile: The Mechanical Key

Beyond cleanliness, shot blasting creates a controlled surface profile — a microscopic roughness pattern measured in microns. This profile provides the mechanical key that allows the intumescent primer to grip the steel. Without an adequate profile, the coating relies solely on chemical adhesion, which is insufficient for the mechanical stresses generated during intumescent expansion.

Intumescent coating manufacturers specify a minimum surface profile, typically between 40 and 75 microns Rz (measured to ISO 8503). Shot blasting with steel grit or steel shot achieves this profile reliably and uniformly. The profile depth can be controlled by selecting the appropriate blast media and adjusting blast parameters, allowing the preparation to be precisely matched to the coating system specification.

## The DFT Requirement

Intumescent coatings must be applied to a precise **Dry Film Thickness (DFT)** to achieve the specified fire resistance rating. The required DFT varies depending on the steel section factor (Hp/A), the fire resistance period, and the specific coating product. For R60 protection on a typical column, the DFT might be 1,500–2,500 microns. For R120, it could exceed 4,000 microns.

Applying this thickness of intumescent material to steel that has not been properly prepared is not just ineffective — it is dangerous. The coating will appear to be in place, but under fire conditions, it will delaminate rather than expand correctly. The fire resistance rating will not be achieved, and the structural steel will lose its load-bearing capacity far sooner than specified.

Proper shot blasting ensures that every micron of intumescent coating is bonded to clean, profiled steel, delivering the full rated performance when it matters most.

## Flash Rusting: The Time-Critical Challenge

One of the practical challenges of shot blasting before intumescent painting is the risk of flash rusting. When steel is blasted to Sa 2.5, the highly reactive clean surface begins to oxidise immediately in the presence of moisture. In humid conditions, visible flash rusting can occur within minutes of blasting.

This is why the primer must be applied as quickly as possible after blasting — ideally within four hours, and before any visible rusting occurs. At Commercial Shot Blasting, we coordinate our shot blasting and painting operations to minimise the window between preparation and priming. Our [mobile service](/services/mobile-shot-blasting) means we can blast and prime on-site, eliminating the delays and handling risks associated with transporting blasted steel.

## The Complete In-House Service

Commercial Shot Blasting offers a complete intumescent painting service under a single contract:

1. **Site survey and specification** — we confirm the fire resistance rating, steel section factors, and coating system
2. **Shot blasting to Sa 2.5 or Sa 3** — all steel prepared to the manufacturer's specification
3. **Primer application** — zinc-rich or epoxy primer applied immediately after blasting
4. **Intumescent basecoat** — applied in controlled passes to achieve the specified DFT
5. **Sealer or topcoat** — for weather resistance and the required finish colour
6. **DFT inspection and documentation** — full coating report for building control sign-off

By combining shot blasting and intumescent painting under one contract, we eliminate the coordination risk between separate subcontractors and ensure the preparation standard is maintained throughout. Our documentation package — including DFT readings, product data sheets, and batch numbers — provides the evidence trail required by building control and fire engineers.

## When to Specify Shot Blasting Before Intumescent Painting

Shot blasting before intumescent painting is essential for:

- **New structural steel** — mill scale must be removed before any coating is applied
- **Refurbishment projects** — old coatings and rust must be stripped back to bare metal
- **[Fire escapes](/services/fire-escape-shot-blasting)** — external steelwork exposed to weather requires the highest preparation standard
- **Mezzanine floors and platforms** — complex fabrications with multiple surfaces and joints
- **Portal frames** — large surface areas where consistency is critical

If you are specifying intumescent painting for a project, insist on shot blasting to Sa 2.5 as the minimum preparation standard. It is the only reliable way to ensure the coating system delivers its rated fire resistance performance.

[Contact us](/contact) for a free site survey and quotation for shot blasting and intumescent painting.`;

// Check if post already exists
const [existing] = await connection.execute(
  "SELECT id FROM blog_posts WHERE slug = ?",
  [slug]
);

if (existing.length > 0) {
  console.log("Blog post already exists, skipping insert.");
} else {
  await connection.execute(
    `INSERT INTO blog_posts (slug, title, excerpt, content, featuredImage, author, category, tags, metaDescription, isPublished, publishedAt, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW(), NOW())`,
    [
      slug,
      title,
      excerpt,
      content,
      featuredImage,
      author,
      category,
      tags,
      metaDescription,
    ]
  );
  console.log("✅ Blog post inserted successfully:", slug);
}

await connection.end();
