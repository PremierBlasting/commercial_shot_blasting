/**
 * Shared glossary data for Commercial Shot Blasting.
 * Powers both the /glossary index page and individual /glossary/:slug pages.
 * Each term includes: definition, extended body, FAQs, related terms, and schema metadata.
 */

export interface GlossaryFAQ {
  question: string;
  answer: string;
}

export interface GlossaryTerm {
  id: string;          // URL slug
  term: string;        // Display name
  letter: string;      // First letter for alphabetical filter
  shortDefinition: string; // One-sentence definition for index cards and meta description
  definition: string;  // Full paragraph definition (used on index page)
  body: string;        // Extended HTML body content for individual page (paragraphs, lists)
  faqs: GlossaryFAQ[];
  relatedTerms: string[]; // term IDs of related glossary entries
  relatedServices?: Array<{ id: string; name: string; description: string }>; // related service pages
  seeAlso?: string;    // URL to related service/blog page
  seeAlsoLabel?: string;
  metaTitle: string;
  metaDescription: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "bs-en-iso-8501-1",
    term: "BS EN ISO 8501-1",
    letter: "B",
    shortDefinition: "The British and European standard for visual assessment of steel surface cleanliness before painting, defining rust grades A–D and blast-cleaned preparation grades Sa 1 to Sa 3.",
    definition:
      "BS EN ISO 8501-1 is the British and European standard for the visual assessment of surface cleanliness of steel before the application of paints and related products. It defines four rust grades (A, B, C, D) for unpainted steel and seven blast-cleaned preparation grades (Sa 1, Sa 2, Sa 2.5, Sa 3, St 2, St 3, Fl). Photographic reference comparators are included in the standard. It is the primary standard referenced in UK and European coating specifications for structural steelwork.",
    body: `<p>BS EN ISO 8501-1 is the definitive reference standard for surface cleanliness assessment on steel structures in the UK and across Europe. It was developed to give specifiers, contractors, and inspectors a common visual language for describing how clean a steel surface is before protective coatings are applied.</p>

<h2>Rust Grades</h2>
<p>Before any surface preparation begins, the existing condition of the steel is assessed against one of four rust grades:</p>
<ul>
  <li><strong>Grade A</strong> — Steel largely covered with adherent mill scale, with little or no rust visible.</li>
  <li><strong>Grade B</strong> — Steel that has begun to rust, with mill scale starting to flake away.</li>
  <li><strong>Grade C</strong> — Steel where mill scale has rusted away entirely, with slight pitting visible to the naked eye.</li>
  <li><strong>Grade D</strong> — Steel where mill scale has rusted away and general pitting is clearly visible.</li>
</ul>
<p>The rust grade affects both the blast standard achievable and the time required to reach it. Grade D steel typically requires significantly more blasting time than Grade A steel to achieve the same cleanliness level.</p>

<h2>Blast-Cleaned Preparation Grades</h2>
<p>After shot blasting, the surface is assessed against one of the following preparation grades:</p>
<ul>
  <li><strong>Sa 1 (Light Blast Cleaning)</strong> — Loose mill scale, rust, and coatings removed. Not suitable for protective coatings.</li>
  <li><strong>Sa 2 (Thorough Blast Cleaning)</strong> — Nearly all mill scale, rust, and coatings removed. Suitable for some primer systems.</li>
  <li><strong>Sa 2.5 (Near-White Metal)</strong> — All but faint staining removed. The most commonly specified grade for structural steelwork.</li>
  <li><strong>Sa 3 (White Metal)</strong> — Complete removal of all contamination. Required for the most demanding coating systems.</li>
  <li><strong>St 2 / St 3</strong> — Hand or power tool cleaning grades (not blast-cleaned).</li>
  <li><strong>Fl (Flame Cleaning)</strong> — Flame cleaning grade, rarely specified today.</li>
</ul>

<h2>How It Is Used in Practice</h2>
<p>A typical UK structural steel coating specification will state something like: <em>"Blast clean to Sa 2.5 in accordance with BS EN ISO 8501-1 before application of the primer coat."</em> The inspector then compares the blasted surface against the photographic comparators supplied with the standard to verify compliance.</p>
<p>At Commercial Shot Blasting, all our work is carried out to the cleanliness grade specified by the client's coating specification. We routinely achieve Sa 2.5 and Sa 3 on structural steel frames, factory cladding, containers, and other industrial metalwork.</p>`,
    faqs: [
      {
        question: "What is BS EN ISO 8501-1?",
        answer: "BS EN ISO 8501-1 is the British and European standard for the visual assessment of surface cleanliness of steel before painting. It defines rust grades A to D for unpainted steel and blast-cleaned preparation grades Sa 1, Sa 2, Sa 2.5, and Sa 3."
      },
      {
        question: "What is the difference between Sa 2.5 and Sa 3?",
        answer: "Sa 2.5 (near-white metal) allows faint staining on up to 5% of the surface. Sa 3 (white metal) requires complete removal of all mill scale, rust, and coatings, leaving a uniformly grey-white surface. Sa 2.5 is the most commonly specified grade for structural steelwork."
      },
      {
        question: "Which blast grade is required for intumescent paint?",
        answer: "Most intumescent paint manufacturers specify Sa 2.5 as the minimum surface preparation standard. Some high-build systems may require Sa 3. Always check the coating manufacturer's data sheet for the exact requirement."
      },
      {
        question: "How is BS EN ISO 8501-1 different from SSPC and NACE standards?",
        answer: "BS EN ISO 8501-1 is the European/British standard. SSPC (Society for Protective Coatings) and NACE (now AMPP) are North American standards. Sa 2.5 is equivalent to SSPC SP 10 (Near-White Blast) and NACE No. 2. Sa 3 is equivalent to SSPC SP 5 (White Metal Blast) and NACE No. 1."
      }
    ],
    relatedTerms: ["sa-2-5", "sa-3", "rust-grade", "mill-scale", "sspc", "nace"],
    relatedServices: [
      { id: "structural-steel-frames", name: "Structural Steel Frames Shot Blasting", description: "Professional shot blasting for structural steelwork to Sa 2.5 and Sa 3 standards" },
      { id: "factory-cladding", name: "Factory Cladding Shot Blasting", description: "Specialist cleaning of factory cladding panels and metal siding" },
      { id: "container-shot-blasting", name: "Container Shot Blasting", description: "Professional blasting for shipping containers and storage tanks" }
    ],
    seeAlso: "/services",
    seeAlsoLabel: "Our Shot Blasting Services",
    metaTitle: "BS EN ISO 8501-1 Explained | Shot Blasting Surface Preparation Standard",
    metaDescription: "Complete guide to BS EN ISO 8501-1 — the UK standard for steel surface cleanliness. Covers rust grades A–D, blast grades Sa 1 to Sa 3, and how the standard is used in coating specifications."
  },
  {
    id: "dft",
    term: "DFT (Dry Film Thickness)",
    letter: "D",
    shortDefinition: "The thickness of a protective coating after it has fully cured, measured in microns (µm). Critical for intumescent coatings where DFT determines the fire rating achieved.",
    definition:
      "Dry Film Thickness (DFT) is the thickness of a coating after it has fully cured and all solvents have evaporated, measured in microns (µm). DFT is critical for intumescent coatings, where the specified thickness determines the fire rating achieved (R30, R60, R90, or R120). DFT is measured using a calibrated electromagnetic or eddy-current gauge on the prepared steel surface.",
    body: `<p>Dry Film Thickness (DFT) is one of the most important quality control measurements in any protective coating project. It is the thickness of the cured coating film, measured in microns (µm) — one micron being one thousandth of a millimetre.</p>

<h2>Why DFT Matters</h2>
<p>Every coating system has a specified DFT range. Too thin, and the coating will not provide the corrosion protection or fire resistance it was designed to deliver. Too thick, and the coating may crack, delaminate, or fail to cure properly. For intumescent fire protection coatings in particular, the DFT is directly tied to the fire rating:</p>
<ul>
  <li><strong>R30</strong> — 30 minutes of fire resistance (typically 300–600 µm DFT depending on the section factor)</li>
  <li><strong>R60</strong> — 60 minutes of fire resistance</li>
  <li><strong>R90</strong> — 90 minutes of fire resistance</li>
  <li><strong>R120</strong> — 120 minutes of fire resistance (may require 1,500–3,000 µm DFT)</li>
</ul>
<p>The exact DFT required for a given fire rating depends on the steel section factor (Hp/A — heated perimeter divided by cross-sectional area). Slender sections with a high Hp/A ratio need more coating than stocky sections.</p>

<h2>How DFT Is Measured</h2>
<p>DFT is measured using a calibrated gauge — typically an electromagnetic induction gauge for coatings on ferrous (steel) substrates, or an eddy-current gauge for non-ferrous substrates. Readings are taken at multiple points across the coated surface and averaged. Most specifications require a minimum of five readings per square metre.</p>

<h2>DFT and Surface Preparation</h2>
<p>Accurate DFT measurement depends on a correctly prepared substrate. A shot-blasted surface with a surface profile of 40–70 µm Rz will give slightly higher DFT readings than a smooth surface because the coating fills the peaks and valleys. Coating manufacturers account for this in their specifications, but it is important to use the same surface profile when calibrating the DFT gauge.</p>`,
    faqs: [
      {
        question: "What does DFT stand for in coatings?",
        answer: "DFT stands for Dry Film Thickness — the thickness of a protective coating after it has fully cured and all solvents have evaporated. It is measured in microns (µm)."
      },
      {
        question: "How is DFT measured on steel?",
        answer: "DFT on steel is measured using a calibrated electromagnetic induction gauge. The gauge is placed on the coated surface and gives a reading in microns. Multiple readings are taken across the surface and averaged to verify compliance with the specification."
      },
      {
        question: "What DFT is required for intumescent paint?",
        answer: "The DFT required for intumescent paint depends on the fire rating (R30, R60, R90, R120) and the steel section factor (Hp/A). Typical DFT ranges from around 300 µm for R30 on stocky sections to over 3,000 µm for R120 on slender sections. Always refer to the coating manufacturer's data sheet and the structural engineer's fire protection schedule."
      },
      {
        question: "What is the difference between WFT and DFT?",
        answer: "WFT (Wet Film Thickness) is the thickness of the coating immediately after application, before it cures. DFT (Dry Film Thickness) is the thickness after curing. WFT is typically higher than DFT because solvents evaporate during curing. Applicators use a WFT comb gauge during application to estimate the expected DFT."
      }
    ],
    relatedTerms: ["intumescent-paint", "surface-profile", "sa-2-5"],
    relatedServices: [
      { id: "intumescent-painting", name: "Intumescent Painting Service", description: "Complete fire-resistant coating service with certified DFT documentation" },
      { id: "powder-coating", name: "Powder Coating Shot Blasting", description: "Combined shot blasting and durable powder coating finishing" },
      { id: "structural-steel-frames", name: "Structural Steel Frames", description: "Professional surface preparation for protective coating systems" }
    ],
    seeAlso: "/services/intumescent-painting",
    seeAlsoLabel: "Intumescent Painting Service",
    metaTitle: "DFT (Dry Film Thickness) Explained | Coating Thickness for Steel",
    metaDescription: "What is DFT? Dry Film Thickness explained — how it is measured, why it matters for intumescent fire protection coatings, and how surface preparation affects DFT readings on structural steel."
  },
  {
    id: "grit-blasting",
    term: "Grit Blasting",
    letter: "G",
    shortDefinition: "Abrasive blasting using angular steel grit media to create a sharp surface profile on steel, particularly effective for high-build coatings and intumescent systems.",
    definition:
      "Grit blasting is a form of abrasive blasting that uses angular steel grit (rather than spherical shot) as the abrasive media. The angular particles create a sharper, more aggressive surface profile than shot, making grit blasting particularly effective for achieving the anchor pattern required by high-build coatings and intumescent systems. The terms 'shot blasting' and 'grit blasting' are often used interchangeably in the UK industry.",
    body: `<p>Grit blasting is a surface preparation process in which angular abrasive particles — typically steel grit, copper slag (iron silicate), or aluminium oxide — are propelled at high velocity against a metal surface. The angular shape of the particles cuts into the steel, creating a sharp, jagged surface profile that provides excellent mechanical adhesion for protective coatings.</p>

<h2>Grit Blasting vs Shot Blasting</h2>
<p>The two terms are often used interchangeably in the UK, but there is a technical distinction:</p>
<ul>
  <li><strong>Shot blasting</strong> uses spherical steel shot, which peens the surface and creates a rounded, dimpled profile (Rz 25–50 µm). It is faster and produces less dust, making it suitable for general rust and scale removal.</li>
  <li><strong>Grit blasting</strong> uses angular particles, which cut into the surface and create a sharper, more aggressive profile (Rz 40–100 µm). This is preferred for coatings that require strong mechanical adhesion, such as intumescent paint, zinc-rich primers, and high-build epoxy systems.</li>
</ul>

<h2>Common Grit Blasting Media</h2>
<ul>
  <li><strong>Steel grit</strong> — Hardened angular steel particles. Recyclable and cost-effective for workshop blasting.</li>
  <li><strong>Copper slag (iron silicate)</strong> — A by-product of copper smelting. Premium angular abrasive widely used for on-site mobile blasting. Delivers consistent Sa 2.5 and a sharp Rz 50–75 µm profile in a single pass.</li>
  <li><strong>Aluminium oxide (garnet)</strong> — Used where steel contamination must be avoided (e.g., stainless steel, aluminium).</li>
</ul>

<h2>Applications</h2>
<p>Grit blasting is used across a wide range of industrial applications including structural steel frames, factory cladding, shipping containers, fire escapes, bridge steelwork, and floor preparation. At Commercial Shot Blasting, we use iron silicate (copper slag) as our primary blasting media for on-site work, delivering a consistent Sa 2.5 cleanliness grade and a sharp anchor profile in a single pass.</p>`,
    faqs: [
      {
        question: "What is the difference between grit blasting and shot blasting?",
        answer: "Shot blasting uses spherical steel shot that peens the surface and creates a rounded profile. Grit blasting uses angular particles that cut into the surface and create a sharper, more aggressive profile. Grit blasting is preferred for coatings requiring strong mechanical adhesion, such as intumescent paint and zinc-rich primers."
      },
      {
        question: "What media is used for grit blasting?",
        answer: "Common grit blasting media include steel grit, copper slag (iron silicate), and aluminium oxide (garnet). For on-site mobile blasting, copper slag (iron silicate) is widely used because it delivers a consistent Sa 2.5 cleanliness grade and a sharp surface profile in a single pass."
      },
      {
        question: "What surface profile does grit blasting achieve?",
        answer: "Grit blasting typically achieves a surface profile (Rz) of 40–100 µm depending on the media size and blast pressure. For most protective coating systems, a profile of 50–75 µm Rz is specified. This provides the anchor pattern needed for strong coating adhesion."
      },
      {
        question: "Is grit blasting the same as sandblasting?",
        answer: "Sandblasting uses silica sand as the abrasive media. It is now banned or heavily restricted in the UK and most of Europe due to the risk of silicosis (a serious lung disease caused by inhaling silica dust). Modern grit blasting uses safer alternatives such as steel grit, copper slag, or garnet."
      }
    ],
    relatedTerms: ["shot-blasting", "surface-profile", "sa-2-5", "mill-scale"],
    relatedServices: [
      { id: "intumescent-painting", name: "Intumescent Painting", description: "Fire-resistant coatings applied to correctly prepared steel surfaces" },
      { id: "powder-coating", name: "Powder Coating", description: "Durable protective finishing after shot blasting preparation" },
      { id: "structural-steel-frames", name: "Structural Steel Frames", description: "Professional shot blasting to Sa 2.5 and Sa 3 standards" }
    ],
    seeAlso: "/services",
    seeAlsoLabel: "Our Shot Blasting Services",
    metaTitle: "Grit Blasting Explained | What Is Grit Blasting & How Does It Work?",
    metaDescription: "What is grit blasting? Learn how grit blasting works, the difference between grit and shot blasting, common media types, and the surface profiles achieved. Written by UK shot blasting contractors."
  },
  {
    id: "intumescent-paint",
    term: "Intumescent Paint",
    letter: "I",
    shortDefinition: "A passive fire protection coating that expands when heated to form an insulating char layer, protecting structural steel from reaching critical failure temperature.",
    definition:
      "Intumescent paint is a passive fire protection coating applied to structural steel. When exposed to heat above approximately 200°C, it expands to form a thick, insulating char layer that protects the steel from reaching critical failure temperature (typically 550°C). Intumescent coatings are specified to fire ratings of R30, R60, R90, or R120 (minutes of fire resistance) and must be applied to a correctly prepared surface, typically Sa 2.5 shot-blasted steel.",
    body: `<p>Intumescent paint is a specialist passive fire protection coating used to protect structural steel beams, columns, and connections from the effects of fire. Unlike active fire suppression systems (sprinklers, alarms), intumescent coatings work automatically and require no power or activation — they simply react to heat.</p>

<h2>How Intumescent Paint Works</h2>
<p>When exposed to temperatures above approximately 200°C, the intumescent coating undergoes a chemical reaction that causes it to expand dramatically — typically to 25–50 times its original thickness. This expansion creates a thick, lightweight, insulating char layer around the steel. The char acts as a thermal barrier, slowing the rate at which the steel heats up and delaying the point at which it reaches its critical failure temperature of around 550°C (the temperature at which structural steel begins to lose significant load-bearing capacity).</p>

<h2>Fire Ratings</h2>
<p>Intumescent coatings are specified to achieve a defined fire resistance period:</p>
<ul>
  <li><strong>R30</strong> — 30 minutes of fire resistance</li>
  <li><strong>R60</strong> — 60 minutes of fire resistance</li>
  <li><strong>R90</strong> — 90 minutes of fire resistance</li>
  <li><strong>R120</strong> — 120 minutes of fire resistance</li>
</ul>
<p>The fire rating required for a specific steel member is determined by the structural engineer and the building's fire strategy. The DFT (dry film thickness) required to achieve the specified rating depends on the steel section factor (Hp/A).</p>

<h2>Surface Preparation Requirements</h2>
<p>Intumescent paint must be applied to a correctly prepared steel surface. Most manufacturers specify:</p>
<ul>
  <li>Surface cleanliness: Sa 2.5 in accordance with BS EN ISO 8501-1</li>
  <li>Surface profile: 40–75 µm Rz</li>
  <li>Primer: a compatible primer applied to the specified DFT before the intumescent topcoat</li>
</ul>
<p>Failure to achieve the correct surface preparation will invalidate the coating manufacturer's warranty and may result in premature delamination or failure to achieve the specified fire rating.</p>

<h2>Types of Intumescent Coating</h2>
<ul>
  <li><strong>Water-based intumescent</strong> — Lower VOC, suitable for interior steelwork. Typically used for office buildings and retail environments where aesthetics matter.</li>
  <li><strong>Solvent-based intumescent</strong> — More durable, suitable for exterior or semi-exposed steelwork.</li>
  <li><strong>Epoxy intumescent</strong> — Highest durability, used for offshore, petrochemical, and heavily corrosive environments.</li>
</ul>`,
    faqs: [
      {
        question: "What is intumescent paint?",
        answer: "Intumescent paint is a passive fire protection coating applied to structural steel. When exposed to heat above approximately 200°C, it expands to form a thick insulating char layer that protects the steel from reaching its critical failure temperature of around 550°C."
      },
      {
        question: "What surface preparation is required before applying intumescent paint?",
        answer: "Most intumescent paint manufacturers require the steel to be shot blasted to Sa 2.5 in accordance with BS EN ISO 8501-1, with a surface profile of 40–75 µm Rz. A compatible primer must also be applied to the specified dry film thickness before the intumescent topcoat."
      },
      {
        question: "How thick does intumescent paint need to be?",
        answer: "The required dry film thickness (DFT) of intumescent paint depends on the fire rating required (R30, R60, R90, R120) and the steel section factor (Hp/A). Typical DFT ranges from around 300 µm for R30 on stocky sections to over 3,000 µm for R120 on slender sections."
      },
      {
        question: "Can intumescent paint be applied on site?",
        answer: "Yes. Intumescent paint can be applied in a workshop before erection or on site after the steelwork is erected. On-site application requires careful management of weather conditions (temperature, humidity, and dew point) and adequate containment to protect surrounding areas from overspray."
      },
      {
        question: "How long does intumescent paint last?",
        answer: "A correctly applied and maintained intumescent coating system should last the life of the building — typically 25–30 years or more for interior applications. Exterior or exposed applications require more durable coating systems and periodic inspection."
      }
    ],
    relatedTerms: ["dft", "sa-2-5", "surface-profile", "bs-en-iso-8501-1"],
    relatedServices: [
      { id: "intumescent-painting", name: "Intumescent Painting Service", description: "Complete fire protection coating service with certified DFT documentation" },
      { id: "structural-steel-frames", name: "Structural Steel Frames", description: "Professional shot blasting to Sa 2.5 for intumescent paint preparation" },
      { id: "bridge-steelwork", name: "Bridge Steelwork", description: "Infrastructure shot blasting meeting highway specifications" }
    ],
    seeAlso: "/services/intumescent-painting",
    seeAlsoLabel: "Intumescent Painting Service",
    metaTitle: "Intumescent Paint Explained | Fire Protection Coating for Structural Steel",
    metaDescription: "What is intumescent paint? How does it work, what fire ratings does it achieve, and what surface preparation is required? Complete guide from UK shot blasting and intumescent painting contractors."
  },
  {
    id: "mill-scale",
    term: "Mill Scale",
    letter: "M",
    shortDefinition: "A thin, hard oxide layer that forms on hot-rolled steel during manufacture. Must be completely removed by shot blasting before protective coatings are applied.",
    definition:
      "Mill scale is a thin, blue-grey oxide layer that forms on the surface of hot-rolled steel during the manufacturing process. It is harder and more brittle than the underlying steel and acts as a barrier to coating adhesion. Mill scale must be completely removed before protective coatings are applied — this is typically achieved by shot blasting to Sa 2.5 or Sa 3 standard. Failure to remove mill scale leads to premature coating delamination.",
    body: `<p>Mill scale is an iron oxide layer that forms on the surface of steel during the hot-rolling process. When steel is rolled at temperatures above 700°C, the surface reacts with oxygen in the atmosphere to form a thin, hard, blue-grey scale. This scale is composed primarily of iron oxides: wüstite (FeO), magnetite (Fe₃O₄), and haematite (Fe₂O₃).</p>

<h2>Why Mill Scale Is a Problem</h2>
<p>Mill scale presents several problems for protective coating systems:</p>
<ul>
  <li><strong>Poor adhesion</strong> — Mill scale is poorly bonded to the underlying steel and will eventually detach, taking any coating applied over it with it. Even if the scale appears firmly attached initially, thermal cycling, moisture ingress, and mechanical stress will cause it to delaminate over time.</li>
  <li><strong>Galvanic corrosion</strong> — Mill scale is cathodic relative to steel. Where the scale is broken or porous, a galvanic cell forms between the scale and the exposed steel, accelerating corrosion at the break points.</li>
  <li><strong>Coating barrier</strong> — The smooth, non-porous surface of mill scale provides no anchor pattern for coatings, resulting in poor mechanical adhesion even if the scale remains intact.</li>
</ul>

<h2>How Mill Scale Is Removed</h2>
<p>Shot blasting is the most effective and widely specified method for removing mill scale. Blasting to Sa 2.5 in accordance with BS EN ISO 8501-1 removes all but faint staining and simultaneously creates the surface profile (anchor pattern) required for coating adhesion. Sa 3 (white metal) removes all traces of scale and contamination.</p>
<p>Acid pickling is an alternative method used in some manufacturing processes, but it does not create a surface profile and requires additional treatment before coating.</p>

<h2>Identifying Mill Scale</h2>
<p>Fresh mill scale appears as a smooth, blue-grey, metallic surface on new steel. As it ages, it begins to crack and flake, revealing rust beneath. The rust grade system in BS EN ISO 8501-1 describes the progression from Grade A (intact mill scale, little rust) through to Grade D (mill scale entirely rusted away, general pitting visible).</p>`,
    faqs: [
      {
        question: "What is mill scale on steel?",
        answer: "Mill scale is a thin, hard, blue-grey iron oxide layer that forms on the surface of steel during the hot-rolling manufacturing process. It is composed of iron oxides (wüstite, magnetite, and haematite) and is harder but more brittle than the underlying steel."
      },
      {
        question: "Why does mill scale need to be removed before painting?",
        answer: "Mill scale must be removed because it is poorly bonded to the steel and will eventually delaminate, taking any coating with it. It also creates galvanic corrosion where it is broken or porous, and its smooth surface provides no anchor pattern for coating adhesion."
      },
      {
        question: "How is mill scale removed?",
        answer: "Shot blasting is the most effective method for removing mill scale. Blasting to Sa 2.5 or Sa 3 in accordance with BS EN ISO 8501-1 removes all mill scale and simultaneously creates the surface profile required for coating adhesion. Acid pickling is an alternative but does not create a surface profile."
      },
      {
        question: "Can you paint over mill scale?",
        answer: "Painting over mill scale is not recommended and is specifically prohibited by most coating manufacturers' specifications. The scale will eventually delaminate, causing the coating to fail prematurely. The only reliable solution is to remove the mill scale by shot blasting before applying any protective coating."
      }
    ],
    relatedTerms: ["sa-2-5", "sa-3", "shot-blasting", "rust-grade", "bs-en-iso-8501-1"],
    relatedServices: [
      { id: "rust-removal", name: "Rust Removal Shot Blasting", description: "Complete removal of rust and mill scale from all steel types" },
      { id: "structural-steel-frames", name: "Structural Steel Frames", description: "Professional shot blasting to Sa 2.5 and Sa 3 standards" },
      { id: "container-shot-blasting", name: "Container Shot Blasting", description: "Specialist cleaning of corroded shipping containers" }
    ],
    seeAlso: "/services",
    seeAlsoLabel: "Our Shot Blasting Services",
    metaTitle: "Mill Scale Explained | What Is Mill Scale & Why Must It Be Removed?",
    metaDescription: "What is mill scale on steel? Why does it cause coating failure? How is it removed? Complete guide to mill scale, its composition, and why shot blasting to Sa 2.5 is the correct removal method."
  },
  {
    id: "nace",
    term: "NACE / AMPP Standards",
    letter: "N",
    shortDefinition: "North American corrosion and surface preparation standards (now AMPP). NACE No. 1 = Sa 3 (white metal); NACE No. 2 = Sa 2.5 (near-white metal).",
    definition:
      "NACE International (now merged with SSPC to form AMPP — Association for Materials Protection and Performance) published widely used corrosion and surface preparation standards. NACE No. 1 (White Metal Blast) is equivalent to Sa 3, and NACE No. 2 (Near-White Blast) is equivalent to Sa 2.5. NACE standards are commonly referenced in oil and gas, marine, and infrastructure specifications alongside ISO 8501-1 and SSPC standards.",
    body: `<p>NACE International (National Association of Corrosion Engineers) was a leading standards body for corrosion control and surface preparation. In 2021, NACE merged with SSPC (Society for Protective Coatings) to form AMPP (Association for Materials Protection and Performance). The standards previously published under the NACE and SSPC names continue to be referenced in specifications worldwide.</p>

<h2>Key NACE/AMPP Surface Preparation Standards</h2>
<table>
  <thead>
    <tr><th>NACE Standard</th><th>SSPC Standard</th><th>ISO 8501-1 Equivalent</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td>NACE No. 1</td><td>SSPC SP 5</td><td>Sa 3</td><td>White Metal Blast Cleaning — complete removal of all contamination</td></tr>
    <tr><td>NACE No. 2</td><td>SSPC SP 10</td><td>Sa 2.5</td><td>Near-White Metal Blast Cleaning — faint staining on max 5% of surface</td></tr>
    <tr><td>NACE No. 3</td><td>SSPC SP 6</td><td>Sa 2</td><td>Commercial Blast Cleaning — staining on max 33% of surface</td></tr>
    <tr><td>NACE No. 4</td><td>SSPC SP 7</td><td>Sa 1</td><td>Brush-Off Blast Cleaning — loose contamination removed</td></tr>
  </tbody>
</table>

<h2>When Are NACE Standards Referenced in the UK?</h2>
<p>NACE/AMPP standards are most commonly referenced in the UK for:</p>
<ul>
  <li>Offshore oil and gas structures and pipelines</li>
  <li>Marine and port infrastructure</li>
  <li>Petrochemical and refinery projects</li>
  <li>International projects where the client or coating manufacturer uses North American standards</li>
</ul>
<p>For most onshore UK structural steelwork, BS EN ISO 8501-1 is the primary reference standard. However, many coating manufacturers' data sheets cross-reference both ISO and NACE/SSPC standards, so understanding the equivalencies is important for contractors and inspectors.</p>`,
    faqs: [
      {
        question: "What is NACE in surface preparation?",
        answer: "NACE (National Association of Corrosion Engineers) published widely used surface preparation standards for steel. NACE has now merged with SSPC to form AMPP. The key NACE blast cleaning standards are NACE No. 1 (white metal, equivalent to Sa 3), NACE No. 2 (near-white metal, equivalent to Sa 2.5), NACE No. 3 (commercial blast, equivalent to Sa 2), and NACE No. 4 (brush-off blast, equivalent to Sa 1)."
      },
      {
        question: "What is NACE No. 2 equivalent to in ISO 8501-1?",
        answer: "NACE No. 2 (Near-White Metal Blast Cleaning) is equivalent to Sa 2.5 in BS EN ISO 8501-1. Both standards require the removal of nearly all mill scale, rust, and coatings, with only faint staining remaining on no more than 5% of the surface."
      },
      {
        question: "What is the difference between NACE and SSPC?",
        answer: "NACE (National Association of Corrosion Engineers) and SSPC (Society for Protective Coatings) were two separate North American standards bodies that published overlapping surface preparation standards. In 2021, they merged to form AMPP (Association for Materials Protection and Performance). Their standards are now jointly published under the AMPP name."
      }
    ],
    relatedTerms: ["sspc", "sa-2-5", "sa-3", "bs-en-iso-8501-1"],
    relatedServices: [
      { id: "structural-steel-frames", name: "Structural Steel Frames", description: "Professional shot blasting to NACE and ISO standards" },
      { id: "bridge-steelwork", name: "Bridge Steelwork", description: "Infrastructure blasting meeting NACE/ISO specifications" },
      { id: "pipework", name: "Pipework Shot Blasting", description: "Pipeline surface preparation to NACE standards" }
    ],
    seeAlso: "/services",
    seeAlsoLabel: "Our Shot Blasting Services",
    metaTitle: "NACE Surface Preparation Standards Explained | NACE No. 1, 2, 3, 4",
    metaDescription: "What are NACE surface preparation standards? NACE No. 1 (Sa 3), NACE No. 2 (Sa 2.5), and their ISO 8501-1 equivalents explained. Guide to NACE/AMPP blast cleaning grades for steel."
  },
  {
    id: "rust-grade",
    term: "Rust Grade",
    letter: "R",
    shortDefinition: "The initial condition of uncoated steel before surface preparation, classified as Grade A (intact mill scale) through Grade D (general pitting) in BS EN ISO 8501-1.",
    definition:
      "Rust grade describes the initial condition of uncoated steel before surface preparation, as defined in BS EN ISO 8501-1. Four grades are defined: Grade A (steel largely covered with adherent mill scale, little or no rust), Grade B (steel with some rust and mill scale beginning to flake), Grade C (steel with mill scale rusted away and visible pitting), and Grade D (steel with general pitting visible to the naked eye). The rust grade affects the blast standard achievable and the time required.",
    body: `<p>Before any shot blasting work begins, the existing condition of the steel surface is assessed and recorded. BS EN ISO 8501-1 defines four rust grades that describe the progression of corrosion on uncoated steel, from fresh mill scale through to heavily pitted and corroded steel.</p>

<h2>The Four Rust Grades</h2>

<h3>Grade A</h3>
<p>Steel largely covered with adherent mill scale, with little or no rust visible. This is the condition of new, freshly rolled steel that has not been exposed to weathering. Grade A steel is the easiest to blast clean and requires the least time to achieve Sa 2.5 or Sa 3.</p>

<h3>Grade B</h3>
<p>Steel that has begun to rust, with mill scale starting to flake away. Some rust is visible on the surface, but the mill scale is still largely intact. Grade B is the most common condition for structural steel that has been stored outdoors for a short period.</p>

<h3>Grade C</h3>
<p>Steel where mill scale has rusted away entirely, with slight pitting visible to the naked eye. The surface is covered with rust, and the original mill scale is no longer present. Grade C steel requires more blasting time than Grade A or B to achieve the same cleanliness standard.</p>

<h3>Grade D</h3>
<p>Steel where mill scale has rusted away and general pitting is clearly visible to the naked eye. This is heavily corroded steel that has been exposed to weathering for an extended period. Grade D steel requires the most blasting time and may not be possible to blast to Sa 3 if the pitting is very deep.</p>

<h2>How Rust Grade Affects the Work</h2>
<p>The rust grade is recorded before blasting begins and is used to:</p>
<ul>
  <li>Estimate the time and media consumption required to achieve the specified cleanliness standard</li>
  <li>Identify steel that may be too corroded to accept the specified coating system</li>
  <li>Document the initial condition of the steel for quality assurance records</li>
</ul>
<p>At Commercial Shot Blasting, we assess and record the rust grade of all steel before work begins as part of our quality assurance process.</p>`,
    faqs: [
      {
        question: "What are the rust grades for steel?",
        answer: "BS EN ISO 8501-1 defines four rust grades for uncoated steel: Grade A (intact mill scale, little rust), Grade B (rust beginning, mill scale flaking), Grade C (mill scale rusted away, slight pitting), and Grade D (general pitting clearly visible). The rust grade describes the initial condition of the steel before surface preparation."
      },
      {
        question: "How does rust grade affect shot blasting?",
        answer: "The rust grade affects the time and effort required to achieve a given blast cleanliness standard. Grade A steel (fresh mill scale) is quickest to blast to Sa 2.5. Grade D steel (heavily pitted and corroded) requires significantly more blasting time and may require multiple passes to achieve the same standard."
      },
      {
        question: "What is the difference between rust grade and blast grade?",
        answer: "Rust grade (A, B, C, D) describes the initial condition of the steel before any surface preparation. Blast grade (Sa 1, Sa 2, Sa 2.5, Sa 3) describes the cleanliness of the steel after shot blasting. Both are defined in BS EN ISO 8501-1."
      }
    ],
    relatedTerms: ["sa-2-5", "sa-3", "mill-scale", "bs-en-iso-8501-1", "shot-blasting"],
    relatedServices: [
      { id: "rust-removal", name: "Rust Removal", description: "Complete rust and corrosion removal from all steel types" },
      { id: "structural-steel-frames", name: "Structural Steel Frames", description: "Professional shot blasting from any rust grade to Sa 2.5" },
      { id: "commercial-vehicles", name: "Commercial Vehicle Blasting", description: "Rust removal and restoration of vehicles and machinery" }
    ],
    seeAlso: "/services",
    seeAlsoLabel: "Our Shot Blasting Services",
    metaTitle: "Rust Grade Explained | Steel Rust Grades A, B, C, D (BS EN ISO 8501-1)",
    metaDescription: "What are rust grades for steel? Grades A, B, C, and D explained — how they are assessed, how they affect shot blasting, and the difference between rust grade and blast cleanliness grade."
  },
  {
    id: "sa-2-5",
    term: "Sa 2.5 (Near-White Metal)",
    letter: "S",
    shortDefinition: "The most commonly specified blast cleaning standard for structural steelwork — nearly all mill scale, rust, and coatings removed, with only faint staining on no more than 5% of the surface.",
    definition:
      "Sa 2.5, also called 'near-white metal', is a surface cleanliness standard defined in BS EN ISO 8501-1. It requires the removal of nearly all mill scale, rust, and coatings, leaving only faint staining on no more than 5% of the surface. Sa 2.5 is the most commonly specified standard for structural steelwork that will receive protective coatings, including intumescent fire protection paint.",
    body: `<p>Sa 2.5, commonly referred to as "near-white metal" or "near-white blast cleaning", is the surface preparation standard specified for the vast majority of structural steel coating projects in the UK. It is defined in BS EN ISO 8501-1 and represents the second-highest level of blast cleanliness achievable.</p>

<h2>What Sa 2.5 Requires</h2>
<p>To achieve Sa 2.5, the steel surface must be blast cleaned until:</p>
<ul>
  <li>All mill scale, rust, and previous coatings have been removed</li>
  <li>Only faint shadows, streaks, or stains from mill scale, rust, or previous coatings remain</li>
  <li>These residual stains cover no more than 5% of the surface area</li>
  <li>The surface has a visible surface profile (anchor pattern) suitable for coating adhesion</li>
</ul>
<p>The surface is assessed visually by comparing it against the photographic comparators in BS EN ISO 8501-1. The assessment is typically carried out by a qualified coating inspector.</p>

<h2>Why Sa 2.5 Is the Industry Standard</h2>
<p>Sa 2.5 strikes the optimal balance between surface cleanliness and practical achievability:</p>
<ul>
  <li>It removes all contamination that could cause coating failure (mill scale, rust, chlorides, oils)</li>
  <li>It creates a surface profile of 40–75 µm Rz that provides strong mechanical adhesion for coatings</li>
  <li>It is achievable on all rust grades (A through D) with standard blasting equipment</li>
  <li>It is specified by virtually all major coating manufacturers as the minimum preparation standard for their products</li>
</ul>

<h2>Sa 2.5 vs Sa 3</h2>
<p>Sa 3 (white metal) requires complete removal of all contamination with no residual staining. While Sa 3 provides marginally better coating adhesion, the additional time and cost required to achieve it over Sa 2.5 is rarely justified for standard structural steelwork. Sa 3 is typically specified for zinc-rich primers, coatings in highly corrosive environments (C4/C5 per ISO 12944), and offshore or marine applications.</p>

<h2>NACE and SSPC Equivalents</h2>
<p>Sa 2.5 is equivalent to NACE No. 2 (Near-White Metal Blast Cleaning) and SSPC SP 10 (Near-White Blast Cleaning). These equivalencies are important when working with coating manufacturers' data sheets that reference North American standards.</p>`,
    faqs: [
      {
        question: "What is Sa 2.5?",
        answer: "Sa 2.5 is a surface cleanliness standard defined in BS EN ISO 8501-1, commonly called 'near-white metal'. It requires the removal of nearly all mill scale, rust, and coatings by shot blasting, with only faint staining remaining on no more than 5% of the surface. It is the most commonly specified blast cleaning standard for structural steelwork."
      },
      {
        question: "What is Sa 2.5 equivalent to in NACE and SSPC?",
        answer: "Sa 2.5 is equivalent to NACE No. 2 (Near-White Metal Blast Cleaning) and SSPC SP 10 (Near-White Blast Cleaning). All three standards describe the same level of surface cleanliness."
      },
      {
        question: "Is Sa 2.5 required for intumescent paint?",
        answer: "Yes. Most intumescent paint manufacturers specify Sa 2.5 as the minimum surface preparation standard. The steel must be blast cleaned to Sa 2.5 in accordance with BS EN ISO 8501-1, with a surface profile of 40–75 µm Rz, before the primer and intumescent topcoat are applied."
      },
      {
        question: "How long does it take to blast to Sa 2.5?",
        answer: "The time required to achieve Sa 2.5 depends on the initial rust grade of the steel, the size and complexity of the structure, and the blasting equipment used. As a rough guide, a single mobile shot blasting unit can typically prepare 50–150 m² of steel per day to Sa 2.5, depending on the condition of the steel."
      },
      {
        question: "What is the difference between Sa 2 and Sa 2.5?",
        answer: "Sa 2 (thorough blast cleaning) allows staining on up to 33% of the surface. Sa 2.5 (near-white metal) allows only faint staining on up to 5% of the surface. Sa 2.5 is a significantly higher standard and is required by most coating manufacturers for structural steelwork."
      }
    ],
    relatedTerms: ["sa-3", "bs-en-iso-8501-1", "mill-scale", "surface-profile", "intumescent-paint", "nace", "sspc"],
    relatedServices: [
      { id: "structural-steel-frames", name: "Structural Steel Frames", description: "Professional shot blasting to Sa 2.5 standard" },
      { id: "intumescent-painting", name: "Intumescent Painting", description: "Fire protection coatings applied to Sa 2.5 prepared steel" },
      { id: "powder-coating", name: "Powder Coating", description: "Durable finishing on Sa 2.5 prepared surfaces" }
    ],
    seeAlso: "/blog/how-to-prepare-structural-steel-for-intumescent-painting",
    seeAlsoLabel: "How to Prepare Structural Steel for Intumescent Painting",
    metaTitle: "Sa 2.5 (Near-White Metal) Explained | Shot Blasting Standard for Steel",
    metaDescription: "What is Sa 2.5? Near-white metal blast cleaning explained — what it requires, why it is the standard for structural steelwork, NACE/SSPC equivalents, and how it differs from Sa 3."
  },
  {
    id: "sa-3",
    term: "Sa 3 (White Metal)",
    letter: "S",
    shortDefinition: "The highest blast cleaning standard in BS EN ISO 8501-1 — complete removal of all mill scale, rust, and coatings, leaving a uniformly grey-white metallic surface.",
    definition:
      "Sa 3, also called 'white metal', is the highest surface cleanliness standard in BS EN ISO 8501-1. It requires the complete removal of all mill scale, rust, coatings, and foreign matter, leaving a uniformly grey-white metallic surface. Sa 3 is specified for the most demanding coating systems, including zinc-rich primers and coatings in aggressive environments.",
    body: `<p>Sa 3, commonly referred to as "white metal" or "white metal blast cleaning", is the highest level of surface cleanliness achievable by shot blasting. It is defined in BS EN ISO 8501-1 and represents the complete removal of all contamination from the steel surface.</p>

<h2>What Sa 3 Requires</h2>
<p>To achieve Sa 3, the steel surface must be blast cleaned until:</p>
<ul>
  <li>All mill scale, rust, coatings, and foreign matter have been completely removed</li>
  <li>The surface has a uniform grey-white metallic appearance</li>
  <li>No staining, streaks, or shadows remain anywhere on the surface</li>
  <li>The surface has a visible surface profile suitable for coating adhesion</li>
</ul>

<h2>When Is Sa 3 Specified?</h2>
<p>Sa 3 is specified for applications where the highest level of coating performance is required:</p>
<ul>
  <li><strong>Zinc-rich primers</strong> — Inorganic zinc silicate primers require Sa 3 to achieve proper adhesion and electrical continuity between the zinc particles and the steel substrate.</li>
  <li><strong>Aggressive environments (ISO 12944 C4/C5)</strong> — Offshore structures, marine environments, chemical plants, and other highly corrosive environments where coating failure would be extremely costly.</li>
  <li><strong>Immersion service</strong> — Steel in contact with water (ballast tanks, water storage, piling) where the coating must provide a complete barrier.</li>
  <li><strong>Thermal spray coatings</strong> — Zinc or aluminium thermal spray coatings require Sa 3 for adhesion.</li>
</ul>

<h2>Sa 3 vs Sa 2.5</h2>
<p>The practical difference between Sa 3 and Sa 2.5 is the complete absence of any residual staining. Achieving Sa 3 typically requires 20–40% more blasting time than Sa 2.5 on the same steel. For most standard structural steelwork with conventional coating systems, Sa 2.5 is sufficient and Sa 3 is not cost-effective. However, for the applications listed above, Sa 3 is essential.</p>

<h2>NACE and SSPC Equivalents</h2>
<p>Sa 3 is equivalent to NACE No. 1 (White Metal Blast Cleaning) and SSPC SP 5 (White Metal Blast Cleaning).</p>`,
    faqs: [
      {
        question: "What is Sa 3 blast cleaning?",
        answer: "Sa 3 is the highest blast cleaning standard defined in BS EN ISO 8501-1, commonly called 'white metal'. It requires the complete removal of all mill scale, rust, coatings, and foreign matter, leaving a uniformly grey-white metallic surface with no residual staining."
      },
      {
        question: "When is Sa 3 required instead of Sa 2.5?",
        answer: "Sa 3 is required for inorganic zinc silicate primers, coatings in highly corrosive environments (ISO 12944 C4/C5), immersion service (ballast tanks, water storage), and thermal spray zinc or aluminium coatings. For most standard structural steelwork, Sa 2.5 is sufficient."
      },
      {
        question: "What is Sa 3 equivalent to in NACE and SSPC?",
        answer: "Sa 3 is equivalent to NACE No. 1 (White Metal Blast Cleaning) and SSPC SP 5 (White Metal Blast Cleaning). All three standards describe complete removal of all contamination from the steel surface."
      },
      {
        question: "How much harder is it to achieve Sa 3 compared to Sa 2.5?",
        answer: "Achieving Sa 3 typically requires 20–40% more blasting time than Sa 2.5 on the same steel, depending on the initial rust grade. The additional time is needed to remove the last traces of staining that are acceptable under Sa 2.5 but not under Sa 3."
      }
    ],
    relatedTerms: ["sa-2-5", "bs-en-iso-8501-1", "mill-scale", "surface-profile", "nace", "sspc"],
    relatedServices: [
      { id: "bridge-steelwork", name: "Bridge Steelwork", description: "Infrastructure blasting to Sa 3 for highway applications" },
      { id: "structural-steel-frames", name: "Structural Steel Frames", description: "Professional shot blasting to Sa 3 for demanding applications" },
      { id: "pipework", name: "Pipework Shot Blasting", description: "Pipeline surface preparation to Sa 3 standards" }
    ],
    seeAlso: "/services",
    seeAlsoLabel: "Our Shot Blasting Services",
    metaTitle: "Sa 3 (White Metal) Explained | Highest Blast Cleaning Standard for Steel",
    metaDescription: "What is Sa 3 white metal blast cleaning? Complete guide to the Sa 3 standard — what it requires, when it is specified, how it differs from Sa 2.5, and NACE/SSPC equivalents."
  },
  {
    id: "shot-blasting",
    term: "Shot Blasting",
    letter: "S",
    shortDefinition: "An abrasive surface preparation process that propels steel shot or grit at high velocity to remove rust, mill scale, and old coatings and create a surface profile for coating adhesion.",
    definition:
      "Shot blasting is an abrasive surface preparation process in which steel shot or grit media is propelled at high velocity against a metal surface using a centrifugal wheel or compressed air. The impact removes rust, mill scale, old coatings, and contamination, and creates a surface profile (anchor pattern) that improves coating adhesion. Shot blasting is used to prepare structural steel, factory cladding, shipping containers, floors, and other industrial metalwork.",
    body: `<p>Shot blasting is the most widely used method of surface preparation for industrial steel structures in the UK. It is a mechanical abrasive process in which abrasive media — typically steel shot, steel grit, or copper slag — is propelled at high velocity against the steel surface. The impact of the abrasive particles removes rust, mill scale, old coatings, and other contamination, and simultaneously creates a textured surface profile (anchor pattern) that provides mechanical adhesion for protective coatings.</p>

<h2>How Shot Blasting Works</h2>
<p>There are two main methods of propelling the abrasive media:</p>
<ul>
  <li><strong>Centrifugal wheel blasting</strong> — The abrasive is fed into a high-speed rotating wheel that flings it at the surface at velocities of up to 80 m/s. This method is used in fixed workshop blast cabinets and is highly efficient for large volumes of fabricated steelwork.</li>
  <li><strong>Compressed air blasting (nozzle blasting)</strong> — The abrasive is propelled through a nozzle using compressed air. This method is used for on-site mobile blasting and is more flexible, allowing the operator to reach complex shapes and confined areas.</li>
</ul>

<h2>What Shot Blasting Achieves</h2>
<ul>
  <li><strong>Removes contamination</strong> — Rust, mill scale, old paint, oil, and other surface contaminants are removed, leaving a clean steel surface.</li>
  <li><strong>Creates a surface profile</strong> — The impact of the abrasive particles creates a microscopic peak-and-valley texture (surface profile) that increases the surface area and provides mechanical adhesion for coatings.</li>
  <li><strong>Achieves a defined cleanliness standard</strong> — The blasted surface is assessed against BS EN ISO 8501-1 to verify it meets the specified cleanliness grade (Sa 1, Sa 2, Sa 2.5, or Sa 3).</li>
</ul>

<h2>Mobile Shot Blasting</h2>
<p>Commercial Shot Blasting operates 12 mobile blasting units across England and Wales, allowing us to carry out shot blasting on site — at the fabricator's yard, on the construction site, or at the client's premises. Mobile blasting eliminates the cost and logistics of transporting large steel structures to a fixed workshop.</p>

<h2>Applications</h2>
<p>Shot blasting is used to prepare a wide range of steel structures and components, including structural steel frames, factory and warehouse cladding, shipping containers, fire escapes and staircases, bridge steelwork, floor preparation, pipework, and plant and machinery.</p>`,
    faqs: [
      {
        question: "What is shot blasting?",
        answer: "Shot blasting is an abrasive surface preparation process in which steel shot or grit media is propelled at high velocity against a metal surface. It removes rust, mill scale, old coatings, and contamination, and creates a surface profile (anchor pattern) that improves coating adhesion."
      },
      {
        question: "What is the difference between shot blasting and sandblasting?",
        answer: "Sandblasting uses silica sand as the abrasive media, which is now banned or heavily restricted in the UK due to the risk of silicosis. Shot blasting uses steel shot, steel grit, or copper slag (iron silicate) as safer alternatives. The terms are sometimes used interchangeably in everyday speech, but technically they refer to different abrasive media."
      },
      {
        question: "How long does shot blasting take?",
        answer: "The time required depends on the size and complexity of the structure, the initial condition of the steel (rust grade), and the cleanliness standard required. A single mobile shot blasting unit can typically prepare 50–150 m² of steel per day to Sa 2.5, depending on conditions."
      },
      {
        question: "Can shot blasting be done on site?",
        answer: "Yes. Mobile shot blasting can be carried out on site using compressed air blasting equipment. This is ideal for large structures that cannot be transported to a workshop, or for steelwork that is already erected. Containment and dust suppression measures are required for on-site work."
      },
      {
        question: "What surfaces can be shot blasted?",
        answer: "Shot blasting is primarily used on steel and iron surfaces. It can be used on structural steel frames, factory cladding, shipping containers, fire escapes, staircases, bridge steelwork, floors, pipework, plant and machinery, and many other steel structures. It is not suitable for thin sheet metal, aluminium, or other soft metals without specialist media and equipment."
      }
    ],
     relatedTerms: ["sa-2-5", "sa-3", "grit-blasting", "mill-scale", "surface-profile"],
    relatedServices: [
      { id: "structural-steel-frames", name: "Structural Steel Frames", description: "Professional shot blasting to Sa 2.5 and Sa 3 standards" },
      { id: "factory-cladding", name: "Factory Cladding", description: "Specialist cleaning of cladding panels and metal siding" },
      { id: "rust-removal", name: "Rust Removal", description: "Complete rust and corrosion removal from all steel types" }
    ],
    seeAlso: "/services",
    seeAlsoLabel: "Our Shot Blasting Services",
    metaTitle: "Shot Blasting Explained | What Is Shot Blasting & How Does It Work?",
    metaDescription: "What is shot blasting? How does it work, what does it achieve, and what surfaces can be shot blasted? Complete guide to shot blasting from UK professional shot blasting contractors."
  },
  {
    id: "sspc",
    term: "SSPC (Society for Protective Coatings)",
    letter: "S",
    shortDefinition: "North American surface preparation standards body (now AMPP). SSPC SP 10 = Sa 2.5 (near-white metal); SSPC SP 5 = Sa 3 (white metal).",
    definition:
      "SSPC (Society for Protective Coatings) is a North American standards body that publishes surface preparation standards widely referenced in international coating specifications. Key SSPC standards include SP 6 (Commercial Blast, equivalent to Sa 2), SP 10 (Near-White Blast, equivalent to Sa 2.5), and SP 5 (White Metal Blast, equivalent to Sa 3). SSPC standards are sometimes referenced alongside ISO 8501-1 in UK project specifications, particularly for offshore and marine work.",
    body: `<p>SSPC (Society for Protective Coatings) was a North American standards organisation that published widely used surface preparation and coating application standards. In 2021, SSPC merged with NACE International to form AMPP (Association for Materials Protection and Performance). The standards previously published under the SSPC name continue to be referenced in specifications worldwide.</p>

<h2>Key SSPC/AMPP Blast Cleaning Standards</h2>
<table>
  <thead>
    <tr><th>SSPC Standard</th><th>NACE Equivalent</th><th>ISO 8501-1 Equivalent</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td>SSPC SP 5</td><td>NACE No. 1</td><td>Sa 3</td><td>White Metal Blast Cleaning</td></tr>
    <tr><td>SSPC SP 10</td><td>NACE No. 2</td><td>Sa 2.5</td><td>Near-White Metal Blast Cleaning</td></tr>
    <tr><td>SSPC SP 6</td><td>NACE No. 3</td><td>Sa 2</td><td>Commercial Blast Cleaning</td></tr>
    <tr><td>SSPC SP 7</td><td>NACE No. 4</td><td>Sa 1</td><td>Brush-Off Blast Cleaning</td></tr>
    <tr><td>SSPC SP 11</td><td>—</td><td>St 3</td><td>Power Tool Cleaning to Bare Metal</td></tr>
    <tr><td>SSPC SP 3</td><td>—</td><td>St 2</td><td>Power Tool Cleaning</td></tr>
  </tbody>
</table>

<h2>SSPC Standards in UK Specifications</h2>
<p>For most onshore UK structural steelwork, BS EN ISO 8501-1 is the primary reference standard. However, SSPC standards are commonly encountered in:</p>
<ul>
  <li>Coating manufacturers' data sheets (particularly US-headquartered manufacturers)</li>
  <li>Offshore oil and gas specifications</li>
  <li>Marine and port infrastructure projects</li>
  <li>International projects with North American clients or engineers</li>
</ul>
<p>Understanding the equivalencies between ISO, SSPC, and NACE standards is important for contractors and inspectors working across different specification frameworks.</p>`,
    faqs: [
      {
        question: "What is SSPC SP 10?",
        answer: "SSPC SP 10 is the Near-White Metal Blast Cleaning standard published by SSPC (now AMPP). It is equivalent to Sa 2.5 in BS EN ISO 8501-1 and NACE No. 2. It requires the removal of nearly all mill scale, rust, and coatings, with only faint staining remaining on no more than 5% of the surface."
      },
      {
        question: "What is SSPC SP 5?",
        answer: "SSPC SP 5 is the White Metal Blast Cleaning standard published by SSPC (now AMPP). It is equivalent to Sa 3 in BS EN ISO 8501-1 and NACE No. 1. It requires the complete removal of all mill scale, rust, coatings, and foreign matter."
      },
      {
        question: "What is the difference between SSPC and ISO 8501-1?",
        answer: "SSPC (now AMPP) is a North American standards body, while BS EN ISO 8501-1 is the British and European standard. Both describe the same levels of surface cleanliness but use different designations. SSPC SP 10 = Sa 2.5, SSPC SP 5 = Sa 3. Most UK coating specifications reference ISO 8501-1, but coating manufacturers' data sheets often cross-reference both."
      }
    ],
    relatedTerms: ["rust-grade", "sa-2-5", "bs-en-iso-8501-1"],
    relatedServices: [
      { id: "structural-steel-frames", name: "Structural Steel Frames", description: "Professional shot blasting to SSPC and ISO standards" },
      { id: "bridge-steelwork", name: "Bridge Steelwork", description: "Infrastructure blasting meeting SSPC/ISO specifications" },
      { id: "pipework", name: "Pipework Shot Blasting", description: "Pipeline surface preparation to SSPC standards" }
    ],
    seeAlso: "/services",
    seeAlsoLabel: "Our Shot Blasting Services",
    metaTitle: "SSPC Surface Preparation Standards Explained | SP 5, SP 10, SP 6",
    metaDescription: "What are SSPC surface preparation standards? SSPC SP 5 (Sa 3), SP 10 (Sa 2.5), SP 6 (Sa 2) and their ISO 8501-1 equivalents explained. Guide to SSPC/AMPP blast cleaning grades for steel."
  },
  {
    id: "surface-profile",
    term: "Surface Profile",
    letter: "S",
    shortDefinition: "The microscopic peak-and-valley texture created on steel by shot blasting, measured in microns Rz. Provides mechanical adhesion for protective coatings.",
    definition:
      "Surface profile (also called anchor pattern or surface roughness) is the microscopic peak-and-valley texture created on a steel surface by shot blasting. It is measured in microns Rz (mean peak-to-valley height) using a surface profile gauge or replica tape. A surface profile of 40–70 µm Rz is typically required for intumescent coatings and high-build protective systems. The profile provides mechanical adhesion for the coating and increases the effective surface area.",
    body: `<p>Surface profile, also known as anchor pattern or surface roughness, is the microscopic texture created on a steel surface by shot blasting. When abrasive particles impact the steel at high velocity, they create a series of peaks and valleys across the surface. This texture is invisible to the naked eye but is critical to the performance of any protective coating system.</p>

<h2>Why Surface Profile Matters</h2>
<p>Surface profile serves two key functions:</p>
<ul>
  <li><strong>Mechanical adhesion</strong> — Liquid coating penetrates into the valleys of the profile and, once cured, locks mechanically to the surface. A coating applied to a smooth surface relies only on chemical adhesion, which is significantly weaker.</li>
  <li><strong>Increased surface area</strong> — A profiled surface has a greater actual surface area than a flat surface of the same dimensions, providing more contact area for the coating.</li>
</ul>

<h2>How Surface Profile Is Measured</h2>
<p>Surface profile is measured in microns Rz (mean peak-to-valley height, also called Rz or Ry in some standards). The two main measurement methods are:</p>
<ul>
  <li><strong>Replica tape (Testex Press-O-Film)</strong> — A compressible foam tape is pressed against the blasted surface. The tape takes an impression of the profile, which is then measured with a micrometer. This is the most widely used method on site.</li>
  <li><strong>Surface profile gauge (stylus profilometer)</strong> — An electronic gauge with a fine stylus that traces the surface and calculates the profile electronically. More accurate but less practical for on-site use.</li>
</ul>

<h2>Typical Profile Requirements</h2>
<table>
  <thead>
    <tr><th>Coating System</th><th>Typical Profile Required</th></tr>
  </thead>
  <tbody>
    <tr><td>Standard primer + topcoat</td><td>40–70 µm Rz</td></tr>
    <tr><td>Intumescent paint</td><td>40–75 µm Rz</td></tr>
    <tr><td>Zinc-rich primer</td><td>50–100 µm Rz</td></tr>
    <tr><td>High-build epoxy (immersion)</td><td>50–100 µm Rz</td></tr>
    <tr><td>Thermal spray zinc/aluminium</td><td>75–125 µm Rz</td></tr>
  </tbody>
</table>

<h2>Profile and DFT</h2>
<p>Surface profile affects DFT (dry film thickness) measurements. A profiled surface has peaks and valleys, so the coating is thinner at the peaks and thicker in the valleys. DFT gauges measure the average thickness, but the coating at the peaks may be significantly thinner than the average. This is why coating specifications typically require a minimum DFT that accounts for the profile depth.</p>`,
    faqs: [
      {
        question: "What is surface profile in shot blasting?",
        answer: "Surface profile is the microscopic peak-and-valley texture created on a steel surface by shot blasting. It is measured in microns Rz (mean peak-to-valley height) and provides mechanical adhesion for protective coatings. A typical surface profile for structural steel coatings is 40–75 µm Rz."
      },
      {
        question: "How is surface profile measured?",
        answer: "Surface profile is most commonly measured on site using replica tape (Testex Press-O-Film). The tape is pressed against the blasted surface, takes an impression of the profile, and is then measured with a micrometer. Electronic stylus profilometers are also used for more precise measurements."
      },
      {
        question: "What surface profile is required for intumescent paint?",
        answer: "Most intumescent paint manufacturers specify a surface profile of 40–75 µm Rz. This is typically achieved by shot blasting to Sa 2.5 using angular abrasive media such as copper slag (iron silicate) or steel grit."
      },
      {
        question: "What is the difference between Rz and Ra surface profile?",
        answer: "Rz (mean peak-to-valley height) is the most commonly used measurement for surface profile in coating specifications. It measures the average height difference between the five highest peaks and five lowest valleys in a measured length. Ra (arithmetic mean roughness) is the average deviation of all points from the mean line. For coating specifications, Rz is the preferred measurement."
      }
    ],
    relatedTerms: ["shot-blasting", "grit-blasting", "dft", "sa-2-5", "intumescent-paint"],
    relatedServices: [
      { id: "intumescent-painting", name: "Intumescent Painting", description: "Fire protection coatings requiring precise surface profile" },
      { id: "powder-coating", name: "Powder Coating", description: "High-build coating systems applied to profiled surfaces" },
      { id: "structural-steel-frames", name: "Structural Steel Frames", description: "Professional shot blasting achieving required surface profiles" }
    ],
    seeAlso: "/services",
    seeAlsoLabel: "Our Shot Blasting Services",
    metaTitle: "Surface Profile Explained | Anchor Pattern for Shot Blasted Steel",
    metaDescription: "What is surface profile in shot blasting? How is it measured, why does it matter for coating adhesion, and what profile is required for intumescent paint and structural steel coatings?"
  }
];

// Lookup map by slug for fast access
export const GLOSSARY_BY_ID = Object.fromEntries(
  GLOSSARY_TERMS.map((t) => [t.id, t])
);

// All unique first letters present in the glossary (sorted)
export const GLOSSARY_LETTERS = Array.from(
  new Set(GLOSSARY_TERMS.map((t) => t.letter))
).sort();
