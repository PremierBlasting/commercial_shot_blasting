import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db = await mysql.createConnection(process.env.DATABASE_URL);

// ─────────────────────────────────────────────────────────────────────────────
// POST 200001 — Shot Blasting for Shipping Containers
// Add: link to shot-blasting-vs-wire-brushing blog post, link to
// how-to-specify blog post, link to mill-scale-removal service, link to
// surface-preparation service, and cross-link to other county pages.
// ─────────────────────────────────────────────────────────────────────────────

const content200001 = `# Shot Blasting for Shipping Containers: The Complete Guide

Shipping containers are built to last, but decades of exposure to salt air, rain, and industrial environments take a heavy toll. Rust, scale, and failed coatings are the norm on any container that has seen real service. Shot blasting is the most effective way to return a container to bare metal — and the only method that produces a surface profile suitable for a long-lasting protective coating system.

This guide covers everything you need to know about container shot blasting: why it matters, what the process involves, what standards apply, and how to get it done cost-effectively anywhere in England and Wales.

---

## Why Containers Need Shot Blasting

A shipping container is essentially a steel box. The steel is typically 2–3 mm thick on the walls and roof, and 4–5 mm on the floor structure. When that steel corrodes, it does so from the outside in — and once pitting begins, no amount of surface painting will stop it. Paint applied over rust simply traps moisture and accelerates the corrosion underneath.

Shot blasting removes all of this: rust, mill scale, old paint, bitumen, and any other contamination. It also creates a surface profile — a microscopic roughness that gives the new coating a mechanical key to grip. Without this profile, even the best epoxy or polyurethane coating will delaminate within a few years.

For containers being repurposed as site offices, storage units, pop-up retail spaces, or modular buildings, shot blasting is the essential first step before any internal fit-out or external painting. For containers in active logistics service, it is the most economical way to extend service life by 15–25 years.

---

## The Shot Blasting Process for Containers

### 1. Pre-Inspection and Assessment

Before any blasting begins, the container is inspected for structural integrity. Holes, cracks, and severely corroded sections are identified and marked. If the steel has corroded through, welding repairs are needed before blasting — shot blasting cannot repair structural damage, it can only prepare the surface.

The inspector also notes the existing coating type. Bitumen-coated containers, for example, require a higher blast pressure and longer dwell time than containers with standard alkyd paint.

### 2. Containment and Environmental Controls

Shot blasting generates significant quantities of spent abrasive, rust particles, and paint debris. On a standard 20-foot container, a full blast clean produces 40–80 kg of waste material. Containment is essential — both to prevent contamination of the surrounding area and to allow the spent abrasive to be collected and either recycled or disposed of correctly.

Commercial Shot Blasting uses full containment systems on all container projects. Our mobile units are self-contained, meaning all equipment, abrasive, and containment comes to your site. We operate across all 35 counties in England and Wales — from [Staffordshire](/counties/staffordshire) and the [West Midlands](/counties/west-midlands) to [Yorkshire](/counties/south-yorkshire) and [Lancashire](/counties/lancashire).

### 3. Abrasive Selection

The choice of abrasive depends on the required blast standard and the condition of the steel:

| Abrasive Type | Grit Size | Best For |
|---|---|---|
| Steel shot | S280–S460 | General rust and scale removal, SA2.5 standard |
| Steel grit | G25–G40 | Deep pitting, old bitumen, heavily corroded surfaces |
| Mixed shot/grit | — | Balanced profile and cleaning rate |

For most container work, a steel grit or mixed media is preferred because it produces a more angular surface profile, which gives better adhesion for epoxy coatings.

### 4. Blasting to Standard

Container shot blasting is typically specified to **SA2.5 (near white metal)** as defined in ISO 8501-1. This means all rust, mill scale, and old coatings are removed, with only faint staining permitted in pits and surface irregularities. SA2.5 is the minimum standard required by most industrial coating manufacturers for their full warranty to apply.

For containers in aggressive environments (coastal, chemical, or offshore), **SA3 (white metal)** may be specified. This is a more demanding standard — the surface must be uniformly grey-white with no visible contamination — and takes approximately 30–40% longer to achieve.

If you are writing a specification for container refurbishment, our guide on [how to specify surface preparation for structural steel](/blog/how-to-specify-surface-preparation-for-structural-steel) covers the full ISO 8501-1 framework and common specification errors to avoid.

### 5. Surface Profile Measurement

After blasting, the surface profile is measured using a Testex tape or electronic gauge. Most coating systems for containers require a profile of **Rz 40–70 µm** (approximately 40–70 microns peak-to-trough). This measurement is recorded and included in the project documentation.

### 6. Coating Application Window

Blasted steel begins to rust within hours of exposure to air and moisture. The coating must be applied within the **flash rust window** — typically 4–8 hours in normal conditions, less in humid or coastal environments. Commercial Shot Blasting coordinates closely with coating contractors to ensure the window is not missed.

---

## Container Shot Blasting Costs

Pricing depends on container size, condition, blast standard, and site location. As a general guide:

| Container Size | Condition | Approximate Cost |
|---|---|---|
| 20ft standard | Moderate rust | £600–£900 |
| 40ft standard | Moderate rust | £900–£1,400 |
| 20ft heavily corroded | Severe rust/bitumen | £1,000–£1,500 |
| 40ft heavily corroded | Severe rust/bitumen | £1,500–£2,200 |
| Fleet of 10+ containers | Any condition | Volume discount applies |

These are indicative figures. For an accurate quote, contact us with the container size, quantity, current condition, and site location. We provide free, no-obligation quotes for all container projects.

---

## Shot Blasting vs Wire Brushing for Containers

A common question is whether wire brushing is sufficient for container refurbishment. The short answer is no — wire brushing cannot remove mill scale, cannot achieve SA2.5, and does not create the surface profile required for industrial coating systems. Our detailed guide on [shot blasting vs wire brushing](/blog/shot-blasting-vs-wire-brushing) explains the technical differences, including why surface profile is the critical factor that determines long-term coating performance.

---

## Common Applications

**Logistics and storage depots** — containers returning from service or being repurposed for long-term storage benefit from a full blast clean and recoat before they are put back into use.

**Modular buildings and site offices** — containers being converted into offices, welfare units, or retail spaces need to be structurally sound and corrosion-free before fit-out begins. Shot blasting is the standard first step.

**Container farms and vertical growing** — agricultural and horticultural operators converting containers for controlled-environment growing need a clean, non-contaminated interior surface. Shot blasting removes all previous coatings and contaminants.

**Heritage and restoration** — vintage containers, railway wagons, and industrial heritage items are often shot blasted to remove decades of paint and rust before conservation treatment.

---

## Mobile Container Shot Blasting Across England and Wales

All our container shot blasting services are fully mobile. We come to your site — whether that is a logistics depot in the [West Midlands](/counties/west-midlands), a storage yard in [Yorkshire](/counties/south-yorkshire), a port facility in [Hampshire](/counties/hampshire), or a farm in [Shropshire](/counties/shropshire). There is no need to transport your containers to a fixed facility.

Our [container shot blasting service](/services/container-shot-blasting) covers all container types and sizes, from standard ISO containers to high-cube, open-top, and flat-rack variants. We also carry out [rust removal](/services/rust-removal), [mill scale removal](/services/mill-scale-removal), and [paint stripping](/services/paint-stripping) on containers where a full blast clean is not required.

For projects requiring [surface preparation](/services/surface-preparation) documentation — blast standard achieved, profile measurements, ambient conditions — we provide full written records suitable for inclusion in project quality files or O&M manuals.

To discuss your container project, call **07970 566409** or use our [online quote form](/contact).`;

// ─────────────────────────────────────────────────────────────────────────────
// POST 200002 — Shot Blasting vs Wire Brushing
// Already has good links. Add: link to container post, link to spec post,
// link to mill-scale-removal, link to service-areas.
// ─────────────────────────────────────────────────────────────────────────────

const content200002 = `# Shot Blasting vs Wire Brushing: Which Is Right for Your Project?

When it comes to removing rust, old paint, and mill scale from steel, two methods dominate the conversation: shot blasting and wire brushing. Both will clean a surface to some degree. But they are not equivalent — and choosing the wrong method can result in coating failure, wasted money, and a job that needs redoing within a few years.

This guide explains the key differences between shot blasting and wire brushing, when each method is appropriate, and why most industrial and commercial projects specify shot blasting as the minimum acceptable standard.

---

## What Is Wire Brushing?

Wire brushing (also called mechanical wire brushing or power tool cleaning) uses rotating wire brushes, angle grinders with wire cup attachments, or needle guns to abrade the surface of steel. It removes loose rust, loose paint, and surface contamination by mechanical action.

Wire brushing is classified under **ISO 8501-1** as:

- **St 2** — Thorough hand and power tool cleaning. Loose mill scale, rust, and paint removed. Surface has a metallic sheen.
- **St 3** — Very thorough hand and power tool cleaning. As St 2 but with a more pronounced metallic sheen.

These are the highest standards achievable by wire brushing. They are considerably lower than the blast cleaning standards (Sa 1, Sa 2, Sa 2.5, Sa 3).

---

## What Is Shot Blasting?

Shot blasting propels abrasive media (steel shot or grit) at high velocity onto the steel surface using a centrifugal wheel or compressed air. It removes rust, mill scale, and old coatings far more thoroughly than any mechanical tool — and crucially, it creates a **surface profile**: a microscopic roughness that gives coatings a mechanical key to grip.

Shot blasting is classified under ISO 8501-1 as:

- **Sa 1** — Light blast cleaning. Loose mill scale, rust, and paint removed.
- **Sa 2** — Thorough blast cleaning. Most mill scale, rust, and paint removed.
- **Sa 2.5** — Very thorough blast cleaning (near white metal). Only faint staining in pits permitted.
- **Sa 3** — Blast cleaning to white metal. No visible contamination.

**Sa 2.5 is the standard specified by virtually all industrial coating manufacturers** as the minimum for their full warranty to apply.

---

## Side-by-Side Comparison

| Factor | Wire Brushing (St 3) | Shot Blasting (Sa 2.5) |
|---|---|---|
| Rust removal | Removes loose rust only | Removes all rust, including in pits |
| Mill scale removal | Partial | Complete |
| Old paint removal | Partial | Complete |
| Surface profile created | None | Rz 40–70 µm (typical) |
| Coating adhesion | Poor to moderate | Excellent |
| Speed (m²/hour) | 5–15 m² | 50–200 m² |
| Cost per m² | Lower upfront | Higher upfront, lower lifetime cost |
| Coating warranty eligibility | Usually not eligible | Full warranty from most manufacturers |
| Suitable for Sa 2.5 specification | No | Yes |
| Suitable for occupied buildings | Yes (low dust) | Yes (with containment) |

---

## Why Surface Profile Matters

This is the critical point that is often overlooked. Wire brushing does not create a surface profile. It smooths the steel surface rather than roughening it. A coating applied to a smooth surface has only chemical adhesion to rely on — and chemical adhesion alone is not sufficient for long-term performance in industrial environments.

Shot blasting creates a profile of microscopic peaks and valleys across the steel surface. The coating flows into these valleys and locks around the peaks, creating **mechanical adhesion** in addition to chemical adhesion. This is why shot-blasted surfaces consistently outperform wire-brushed surfaces in independent coating adhesion tests — often by a factor of three to five times.

For [structural steel shot blasting](/services/structural-steel-shot-blasting), the difference is even more pronounced. Structural steel carries mill scale from the rolling process — a thin, hard oxide layer that is almost impossible to remove completely by wire brushing. Mill scale is cathodic to steel, meaning it accelerates corrosion at any point where it is breached. Shot blasting removes mill scale completely, eliminating this risk. See our dedicated guide on [mill scale removal](/services/mill-scale-removal) for more detail on why mill scale is particularly problematic for coating performance.

---

## When Wire Brushing Is Acceptable

Wire brushing is appropriate in a limited set of circumstances:

**Maintenance painting over intact coatings** — if the existing coating is sound and well-adhered, and the specification only requires spot treatment of rust spots, wire brushing to St 3 followed by a compatible primer may be acceptable. This is common in planned maintenance programmes for structures where full blast cleaning is not practical.

**Inaccessible areas** — corners, crevices, and areas that cannot be reached by blast equipment may require wire brushing as a supplementary treatment. In these cases, wire brushing is used in conjunction with, not instead of, shot blasting.

**Low-risk environments** — for steel in dry, indoor environments with minimal corrosion risk and a decorative rather than protective coating, wire brushing may be sufficient. Examples include internal steelwork in heated buildings with no moisture exposure.

**Budget constraints on non-critical structures** — where the structure has a short planned service life and coating longevity is not a priority, wire brushing may be a pragmatic choice. This is the exception, not the rule.

---

## When Shot Blasting Is Required

Shot blasting is required — not just recommended — in the following situations:

**Any project with a coating specification** — virtually all industrial coating systems (epoxy, polyurethane, zinc-rich primer, intumescent) specify Sa 2.5 as the minimum surface preparation standard. Applying these coatings over a wire-brushed surface voids the manufacturer's warranty.

**Structural steelwork** — [structural steel shot blasting](/services/structural-steel-shot-blasting) to Sa 2.5 is standard practice for new fabrications and refurbishment projects. Mill scale must be removed before any protective coating is applied.

**Intumescent coating** — [intumescent painting](/services/intumescent-painting) for fire protection requires Sa 2.5 as a minimum. Intumescent coatings are thick and heavy; they require excellent mechanical adhesion to remain intact under fire conditions.

**Container refurbishment** — [shot blasting for shipping containers](/blog/shot-blasting-for-shipping-containers) to SA2.5 is the standard approach for container refurbishment and repurposing. Wire brushing cannot remove bitumen coatings or deep pitting rust from container steel.

**Marine and coastal environments** — salt air and moisture accelerate corrosion dramatically. Only shot-blasted surfaces with a high-build coating system provide adequate protection in these environments.

**Long-term asset protection** — for any structure with a planned service life of more than five years, shot blasting is the economically rational choice. The higher upfront cost is recovered many times over in extended coating life and reduced maintenance frequency.

---

## The Cost Argument

Wire brushing appears cheaper upfront. But the total cost of ownership tells a different story. A coating applied over a wire-brushed surface typically lasts 3–7 years before failure. The same coating applied over a shot-blasted surface typically lasts 15–25 years. The cost of recoating — including access, labour, and materials — is almost always higher than the cost of doing the job properly the first time.

Commercial Shot Blasting provides free, no-obligation quotes for all projects. Our mobile units cover all 35 counties in England and Wales, including [West Midlands](/counties/west-midlands), [Yorkshire](/counties/south-yorkshire), [Lancashire](/counties/lancashire), [Staffordshire](/counties/staffordshire), and [Greater Manchester](/counties/greater-manchester). To discuss your project, call **07970 566409** or use our [online quote form](/contact).

We also offer [rust removal](/services/rust-removal), [paint stripping](/services/paint-stripping), [mill scale removal](/services/mill-scale-removal), and [surface preparation](/services/surface-preparation) services across all industries and surface types. Explore our full [service areas](/service-areas) to find coverage near you.

If you need to write a formal surface preparation specification for your project, our guide on [how to specify surface preparation for structural steel](/blog/how-to-specify-surface-preparation-for-structural-steel) covers the ISO 8501-1 framework, profile requirements, and common specification errors.`;

// ─────────────────────────────────────────────────────────────────────────────
// POST 200003 — How to Specify Surface Preparation for Structural Steel
// Already has good links. Add: link to container post, link to wire brushing
// post, link to mill-scale-removal, link to service-areas.
// ─────────────────────────────────────────────────────────────────────────────

const content200003 = `# How to Specify Surface Preparation for Structural Steel

Getting the surface preparation specification right is one of the most important decisions in any structural steel project. Specify too low a standard and the coating fails prematurely. Specify too high and you add unnecessary cost. Get it wrong entirely and you may find yourself in a dispute with the coating contractor, the steel fabricator, or the client.

This guide is written for project managers, structural engineers, quantity surveyors, and procurement teams who need to write or review surface preparation specifications for structural steel projects in the UK.

---

## Why Surface Preparation Specification Matters

Coating failure on structural steel is rarely caused by a bad coating. In the vast majority of cases, it is caused by inadequate surface preparation. The Protective Coatings Council (now SSPC) has consistently found that surface preparation is the single most important factor in coating performance — accounting for more than 80% of premature coating failures.

A coating applied to a poorly prepared surface has no mechanical key to grip. Residual mill scale, rust, and contamination create weak points where moisture can penetrate and undercut the coating. Once undercutting begins, it spreads rapidly and the coating fails in large sheets rather than gradually.

The specification sets the minimum acceptable standard. It defines what the contractor must achieve before any coating is applied, and it provides the basis for inspection and acceptance.

---

## The ISO 8501-1 Standard

The primary reference standard for surface preparation of steel in the UK is **ISO 8501-1: Preparation of steel substrates before application of paints and related products — Visual assessment of surface cleanliness**.

ISO 8501-1 defines both the initial rust grade of the steel (A, B, C, or D) and the blast cleaning standard required:

### Initial Rust Grades

| Grade | Description |
|---|---|
| A | Steel surface largely covered with adherent mill scale, little or no rust |
| B | Steel surface with some rust and mill scale beginning to flake |
| C | Steel surface where rust has occurred across the whole surface; mill scale has rusted away or can be scraped off |
| D | Steel surface where rust has occurred across the whole surface; general pitting visible |

New fabrications are typically Grade A or B. Steel that has been in service for several years without maintenance is typically Grade C or D.

### Blast Cleaning Standards

| Standard | Description | Typical Use |
|---|---|---|
| Sa 1 | Light blast cleaning — loose material removed | Rarely specified for structural steel |
| Sa 2 | Thorough blast cleaning — most contamination removed | Minimum for some maintenance work |
| Sa 2.5 | Very thorough blast cleaning (near white metal) | Standard for new structural steel |
| Sa 3 | Blast cleaning to white metal — no visible contamination | Aggressive environments, offshore |

**Sa 2.5 is the standard specified by the vast majority of industrial coating manufacturers** as the minimum for their full warranty to apply. It is the default specification for new structural steelwork in the UK.

---

## Surface Profile Requirements

In addition to the cleanliness standard, the specification must define the required surface profile. This is the microscopic roughness of the blasted surface, measured as the peak-to-trough height (Rz or Ry).

The profile is important because it determines the mechanical adhesion of the coating. Too low a profile and the coating has insufficient key. Too high a profile and the peaks may protrude through thin coatings, creating corrosion initiation points.

Typical profile requirements for structural steel:

| Coating System | Required Profile |
|---|---|
| Zinc-rich primer (2-coat system) | Rz 40–70 µm |
| High-build epoxy (3-coat system) | Rz 40–70 µm |
| Intumescent coating (fire protection) | Rz 40–70 µm |
| Thermal spray zinc/aluminium | Rz 60–100 µm |
| Polyurethane topcoat only | Rz 25–50 µm |

Profile is measured using Testex Press-O-Film tape and a surface profile gauge, or using an electronic profilometer. The measurement method and acceptance criteria should be stated in the specification.

---

## Writing the Specification

A complete surface preparation specification for structural steel should include the following elements:

### 1. Reference Standard

State the governing standard: **ISO 8501-1** (visual cleanliness) and **ISO 8503** (surface profile). For UK projects, these are the standard references. Some clients also reference **SSPC standards** (SP 6, SP 10, SP 5) — these are broadly equivalent to Sa 2, Sa 2.5, and Sa 3 respectively.

### 2. Initial Condition Assessment

Specify how the initial rust grade will be assessed and documented. For new fabrications, this is typically a visual inspection against the ISO 8501-1 photographic reference plates.

### 3. Blast Cleaning Standard

State the required standard clearly: **Sa 2.5 to ISO 8501-1** is the standard specification for new structural steel. For aggressive environments, specify **Sa 3**.

### 4. Surface Profile

State the required profile range in Rz (µm) and the measurement method. For most structural steel projects: **Rz 40–70 µm measured to ISO 8503-2**.

### 5. Abrasive Specification

Some specifications define the abrasive type and grade. For [structural steel shot blasting](/services/structural-steel-shot-blasting), steel grit G25 or G40 is commonly specified for its ability to achieve the required profile on Grade A/B steel.

### 6. Inspection and Documentation

Specify who is responsible for inspection (contractor, independent inspector, or client), what records must be kept (blast standard achieved, profile measurement, ambient conditions at time of blasting), and what the acceptance criteria are.

### 7. Coating Application Window

State the maximum time between blast cleaning and primer application. For most projects: **4 hours in normal conditions, 2 hours in humid or coastal environments**. This is critical — blasted steel begins to rust within hours of exposure to air and moisture.

### 8. Areas Inaccessible to Blast Equipment

Specify the treatment for areas that cannot be reached by blast equipment (corners, crevices, weld toes). The standard approach is power tool cleaning to St 3 followed by a stripe coat of zinc-rich primer before the full coating system is applied.

---

## Common Specification Errors

**Specifying Sa 2.5 without a profile requirement** — the cleanliness standard alone is not sufficient. A surface can meet Sa 2.5 visually but have an inadequate profile if the wrong abrasive or blast pressure is used.

**Failing to specify the coating application window** — without a defined window, contractors may blast and leave steel exposed overnight, resulting in flash rust that requires re-blasting.

**Not accounting for the initial rust grade** — the blast standard required to achieve Sa 2.5 on Grade A steel (new fabrication) is different from that required on Grade D steel (heavily corroded). The specification should acknowledge this and allow for additional passes or abrasive changes if the initial condition is worse than anticipated.

**Specifying wire brushing (St 3) where Sa 2.5 is required** — this is a common error in maintenance specifications. Wire brushing cannot achieve the surface profile required for most industrial coating systems. See our guide on [shot blasting vs wire brushing](/blog/shot-blasting-vs-wire-brushing) for a full comparison of the two methods, including the surface profile data.

**Overlooking mill scale on new fabrications** — Grade A steel (new fabrication) is covered in mill scale, which must be removed before any protective coating is applied. See our [mill scale removal](/services/mill-scale-removal) service page for detail on why mill scale is particularly problematic and how shot blasting addresses it.

---

## Practical Guidance for UK Projects

For most structural steel projects in England and Wales, the specification is straightforward: **Sa 2.5 to ISO 8501-1, Rz 40–70 µm to ISO 8503-2, primer applied within 4 hours of blasting**.

Commercial Shot Blasting works to this specification on every project. Our mobile units travel to fabrication shops, construction sites, and existing structures across all 35 counties — from [Staffordshire](/counties/staffordshire) and the [West Midlands](/counties/west-midlands) to [Yorkshire](/counties/south-yorkshire), [Lancashire](/counties/lancashire), and [Greater Manchester](/counties/greater-manchester).

We provide full documentation on every project: blast standard achieved, surface profile measurements, ambient conditions, and operator details. This documentation is available for inclusion in your project quality file or O&M manual.

For complex projects, we are happy to review your specification before work begins and advise on any areas where clarification or amendment would be beneficial. Call **07970 566409** or use our [online quote form](/contact) to discuss your project.

For container refurbishment projects, the same specification principles apply — see our guide on [shot blasting for shipping containers](/blog/shot-blasting-for-shipping-containers) for container-specific guidance including blast standards, cost ranges, and the coating application window.

Explore our [service areas](/service-areas) to confirm coverage in your county, or browse our full range of [surface preparation services](/services/surface-preparation) to find the right solution for your project.`;

// ─────────────────────────────────────────────────────────────────────────────
// FAQ data for each post
// ─────────────────────────────────────────────────────────────────────────────

const faq200001 = JSON.stringify([
  {
    question: "What blast standard is required for shipping containers?",
    answer: "Most container refurbishment and repurposing projects specify SA2.5 (near white metal) as defined in ISO 8501-1. This removes all rust, mill scale, and old coatings, leaving only faint staining in pits. For containers in coastal or chemical environments, SA3 (white metal) may be specified."
  },
  {
    question: "How much does container shot blasting cost?",
    answer: "A standard 20ft container in moderate condition typically costs £600–£900 to blast clean. A 40ft container in moderate condition costs £900–£1,400. Heavily corroded containers with bitumen coatings cost more: £1,000–£1,500 for 20ft and £1,500–£2,200 for 40ft. Volume discounts apply for fleets of 10 or more containers."
  },
  {
    question: "Can you shot blast containers on-site?",
    answer: "Yes. Commercial Shot Blasting operates fully mobile units that come to your site anywhere in England and Wales. There is no need to transport containers to a fixed facility. All equipment, abrasive, and containment is brought to your location."
  },
  {
    question: "How long does container shot blasting take?",
    answer: "A standard 20ft container typically takes 2–4 hours to blast clean to SA2.5. A 40ft container takes 3–6 hours. Heavily corroded containers or those with bitumen coatings take longer. The coating must be applied within 4–8 hours of blasting to prevent flash rust."
  },
  {
    question: "Is shot blasting better than wire brushing for containers?",
    answer: "Yes. Wire brushing cannot remove mill scale, cannot achieve SA2.5, and does not create the surface profile required for industrial coating systems. Shot blasting is the only method that produces a surface suitable for a long-lasting protective coating on container steel."
  }
]);

const faq200002 = JSON.stringify([
  {
    question: "What is the difference between Sa 2.5 and St 3 surface preparation?",
    answer: "Sa 2.5 is a blast cleaning standard (near white metal) achieved by shot blasting. It removes all rust, mill scale, and old coatings, and creates a surface profile of Rz 40–70 µm. St 3 is the highest standard achievable by wire brushing — it removes loose rust and paint but cannot remove mill scale and creates no surface profile. Sa 2.5 is required by virtually all industrial coating manufacturers for their warranty to apply."
  },
  {
    question: "Does wire brushing remove mill scale?",
    answer: "No. Wire brushing cannot reliably remove mill scale from steel. Mill scale is a hard oxide layer formed during the steel rolling process. It is cathodic to steel, meaning it accelerates corrosion wherever it is breached. Shot blasting is the only practical method for complete mill scale removal."
  },
  {
    question: "When is wire brushing acceptable for steel surface preparation?",
    answer: "Wire brushing is acceptable for maintenance painting over intact coatings, treating inaccessible areas as a supplement to shot blasting, low-risk indoor environments with minimal corrosion exposure, and non-critical structures with a short planned service life. It is not acceptable where a coating specification requires Sa 2.5 or where coating manufacturer warranties are required."
  },
  {
    question: "How long does a coating last on a wire-brushed surface vs a shot-blasted surface?",
    answer: "A coating applied over a wire-brushed surface typically lasts 3–7 years before failure. The same coating applied over a shot-blasted surface typically lasts 15–25 years. The higher upfront cost of shot blasting is recovered many times over in extended coating life and reduced maintenance frequency."
  },
  {
    question: "What surface profile does shot blasting produce?",
    answer: "Shot blasting with steel grit or mixed media typically produces a surface profile of Rz 40–70 µm (40–70 microns peak-to-trough). This is the profile required by most industrial coating systems including epoxy, zinc-rich primer, and intumescent coatings. Wire brushing produces no measurable surface profile."
  }
]);

const faq200003 = JSON.stringify([
  {
    question: "What surface preparation standard should I specify for structural steel?",
    answer: "For new structural steel in the UK, specify Sa 2.5 to ISO 8501-1 with a surface profile of Rz 40–70 µm to ISO 8503-2, and a coating application window of 4 hours in normal conditions. Sa 2.5 is the standard required by virtually all industrial coating manufacturers for their full warranty to apply."
  },
  {
    question: "What is ISO 8501-1 and why is it important?",
    answer: "ISO 8501-1 is the primary reference standard for visual assessment of steel surface cleanliness before painting. It defines both the initial rust grade of the steel (A, B, C, D) and the blast cleaning standards (Sa 1, Sa 2, Sa 2.5, Sa 3). It is the standard referenced in virtually all UK structural steel coating specifications."
  },
  {
    question: "What is the difference between Sa 2.5 and Sa 3?",
    answer: "Sa 2.5 (near white metal) allows only faint staining in pits and surface irregularities. Sa 3 (white metal) requires the surface to be uniformly grey-white with no visible contamination. Sa 3 takes approximately 30–40% longer to achieve and is typically specified for aggressive environments such as offshore, coastal, or chemical exposure. Sa 2.5 is the standard for most structural steel projects."
  },
  {
    question: "What surface profile is required for structural steel?",
    answer: "For most structural steel coating systems (zinc-rich primer, high-build epoxy, intumescent), a surface profile of Rz 40–70 µm is required. Thermal spray zinc or aluminium requires Rz 60–100 µm. The profile is measured using Testex Press-O-Film tape or an electronic profilometer to ISO 8503-2."
  },
  {
    question: "How long after shot blasting can primer be applied?",
    answer: "Primer should be applied within 4 hours of shot blasting in normal conditions, and within 2 hours in humid or coastal environments. Blasted steel begins to rust within hours of exposure to air and moisture. The coating application window should be stated explicitly in the specification to prevent contractors from blasting and leaving steel exposed overnight."
  }
]);

// ─────────────────────────────────────────────────────────────────────────────
// Update the posts
// ─────────────────────────────────────────────────────────────────────────────

const now = new Date();

await db.execute(
  `UPDATE blog_posts SET content = ?, faq = ?, updatedAt = ? WHERE id = 200001`,
  [content200001, faq200001, now]
);
console.log("Updated post 200001");

await db.execute(
  `UPDATE blog_posts SET content = ?, faq = ?, updatedAt = ? WHERE id = 200002`,
  [content200002, faq200002, now]
);
console.log("Updated post 200002");

await db.execute(
  `UPDATE blog_posts SET content = ?, faq = ?, updatedAt = ? WHERE id = 200003`,
  [content200003, faq200003, now]
);
console.log("Updated post 200003");

await db.end();
console.log("Done.");
