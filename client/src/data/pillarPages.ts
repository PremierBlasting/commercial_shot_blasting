export type PillarLink = {
  title: string;
  href: string;
  description: string;
};

export type PillarFaq = {
  question: string;
  answer: string;
};

export type PillarPageData = {
  slug: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  description: string;
  keywords: string;
  heroImage: string;
  heroAlt: string;
  overview: string[];
  scope: string[];
  planningInputs: Array<{ title: string; description: string }>;
  serviceLinks: PillarLink[];
  resourceLinks: PillarLink[];
  projectIds: string[];
  faqs: PillarFaq[];
};

export const pillarPages: PillarPageData[] = [
  {
    slug: "steel-fabrication-surface-preparation",
    eyebrow: "Commercial project planning hub",
    title: "Steel Fabrication & Structural Steel Surface Preparation",
    shortTitle: "Steel Fabrication Surface Preparation",
    description: "Plan steel fabrication and structural-steel blast cleaning before protective coating. Explore scope inputs, relevant services, verified project evidence, preparation guides, and a Site Visit pathway.",
    keywords: "steel fabrication surface preparation, structural steel shot blasting, fabricated steel blast cleaning, steelwork coating preparation, mill scale removal steel fabrication",
    heroImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3365_56728af1.webp",
    heroAlt: "Documented structural steel with a clean profiled surface after preparation for a protective coating system",
    overview: [
      "This hub is for fabricators, estimators, main contractors, and coating teams planning the surface-preparation stage of a steelwork package. It connects the information needed before an enquiry with the specialist services that deal with structural frames, fabricated sections, mill scale, and coating readiness.",
      "A sound scope normally begins with drawings or a clear component list, the existing surface condition, access and handling arrangements, the required coating system, and the sequence for priming or further work. Those details help turn a general request into a practical Site Visit discussion.",
    ],
    scope: [
      "Portal frames, beams, columns, base plates, brackets, channels, and fabricated assemblies",
      "Mill scale, corrosion, failed coatings, weld residues, and other surface contaminants",
      "Preparation planning before primer, intumescent coating, powder coating, galvanising, or a specified coating system",
      "On-site access, containment, lifting, component movement, masking, inspection, and coating handover planning",
    ],
    planningInputs: [
      { title: "Component schedule", description: "Share drawings, quantities, sizes, material thicknesses, connection details, and which faces must remain accessible." },
      { title: "Surface condition", description: "Photographs should show rust, mill scale, old coating, contamination, weld areas, bolt holes, and any delicate or excluded surfaces." },
      { title: "Coating handover", description: "Confirm the intended primer or finish, specification owner, and the practical sequencing of preparation and coating work." },
      { title: "Site logistics", description: "Identify access, working area, other trades, lifting or handling needs, containment requirements, and any programme constraints." },
    ],
    serviceLinks: [
      { title: "Structural Steel Frames", href: "/services/structural-steel-frames", description: "Specialist route for structural-steel preparation and coating readiness." },
      { title: "Steel Fabrications", href: "/steel-fabrications", description: "Project-led fabricated steelwork information and before-and-after material." },
      { title: "Mill Scale Removal", href: "/services/mill-scale-removal", description: "Guidance for new steelwork where mill scale must be addressed before coating." },
      { title: "Intumescent Painting", href: "/services/intumescent-painting", description: "Relevant when structural steel preparation forms part of a fire-protection coating scope." },
    ],
    resourceLinks: [
      { title: "How to prepare structural steel for shot blasting", href: "/blog/how-to-prepare-structural-steel-for-shot-blasting", description: "A practical pre-work guide for structural-steel packages." },
      { title: "Steel fabrication shot blasting costs and programme guide", href: "/blog/steel-fabrication-shot-blasting-costs-and-programme-guide", description: "The scope factors that influence estimating and programme planning." },
      { title: "Sa 2.5 surface preparation glossary", href: "/glossary/sa-2-5", description: "Plain-English explanation of a frequently referenced preparation term." },
      { title: "Surface profile glossary", href: "/glossary/surface-profile", description: "How surface profile relates to coating adhesion and specification." },
    ],
    projectIds: ["structural-steel-staffordshire", "school-steelwork-bucks"],
    faqs: [
      { question: "What information helps prepare a steelwork blast-cleaning estimate?", answer: "Drawings or a component schedule, dimensions, photographs of the existing surface, access information, and the intended coating system all help define the work. A Site Visit can confirm practical details that photographs do not show." },
      { question: "Can fabricated steel and structural frames be planned within one surface-preparation package?", answer: "Often, yes. The practical approach depends on component sizes, handling, access, surface condition, sequencing, and the coating handover. Those factors are reviewed before a final scope is agreed." },
      { question: "Why should coating requirements be discussed before blast cleaning?", answer: "The specified coating system may require particular cleanliness, profile, inspection, and handover arrangements. Confirming the coating requirement early reduces the risk of a mismatch between preparation and the next trade." },
    ],
  },
  {
    slug: "steel-chimney-process-stack-surface-preparation",
    eyebrow: "Industrial fabricated steelwork hub",
    title: "Steel Chimney, Process Stack & Flue Surface Preparation",
    shortTitle: "Steel Chimney & Process Stack Preparation",
    description: "Plan surface preparation for fabricated steel chimneys, process stacks, flues, and related duct sections. Review verified chimney project evidence, scope inputs, relevant services, and Site Visit guidance.",
    keywords: "steel chimney surface preparation, process stack shot blasting, flue surface preparation, industrial chimney blast cleaning, fabricated stack coating preparation",
    heroImage: "/manus-storage/SteelChimneyAfter2_3b5e3186.jpeg",
    heroAlt: "Verified project view of a fabricated steel chimney section with its prepared external body, flange, and access opening",
    overview: [
      "Steel chimneys, process stacks, flues, and large fabricated duct sections need a clear surface-preparation plan before a protective coating or next fabrication stage. This hub brings together the specialist chimney service, approved project evidence, planning guidance, and the related pipework and structural-steel pathways.",
      "The documented chimney project on this site shows a fabricated section at surface-preparation stage, including the cylindrical body, flange, access opening, stiffeners, and accessible internal surfaces. The supplied evidence does not establish a site location, programme, blast standard, client, or final coating system, and this page does not add those claims.",
    ],
    scope: [
      "Fabricated steel chimney sections, stacks, flues, duct transitions, flanges, access openings, and stiffened sections",
      "External and accessible internal surfaces that can be safely included in an agreed work scope",
      "Surface condition review before protective coating, refurbishment, fabrication completion, or planned maintenance",
      "Access, handling, lifting, staging, containment, aperture protection, and coating-sequencing discussions",
    ],
    planningInputs: [
      { title: "Fabrication and access details", description: "Provide overall dimensions, drawings where available, lifting points, openings, flange details, internal access, and any surfaces that must be protected." },
      { title: "Condition record", description: "Photographs should show existing corrosion, coating condition, joints, welds, transitions, and the full length of the fabricated section." },
      { title: "Coating or next-stage requirement", description: "Identify the intended coating system or downstream fabrication stage so the preparation discussion is aligned with the final specification." },
      { title: "Safe work arrangement", description: "Discuss handling, location, nearby activities, access equipment, containment, and any client or principal-contractor requirements before work is planned." },
    ],
    serviceLinks: [
      { title: "Steel Chimneys, Process Stacks & Flues", href: "/services/steel-chimney-surface-preparation", description: "Dedicated service page with factual scope, FAQs, verified comparison images, and supplied video." },
      { title: "Process Pipework, Spools & Manifolds", href: "/services/pipework", description: "Related industrial surface-preparation pathway for pipework and associated steelwork." },
      { title: "Structural Steel Frames", href: "/services/structural-steel-frames", description: "Useful where stack supports, frames, or structural interfaces form part of a wider scope." },
      { title: "Coating Removal", href: "/services/coating-removal", description: "Relevant where an existing coating system must be assessed before preparation work." },
    ],
    resourceLinks: [
      { title: "Steel chimney and process-stack surface preparation guide", href: "/blog/steel-chimney-process-stack-surface-preparation", description: "Planning guidance for fabricated stacks, flues, and chimney sections." },
      { title: "Steel fabrication shot blasting costs and programme guide", href: "/blog/steel-fabrication-shot-blasting-costs-and-programme-guide", description: "Inputs that support a clearer fabricator enquiry and programme discussion." },
      { title: "NACE / AMPP standards glossary", href: "/glossary/nace", description: "A glossary resource for terminology that may appear in project specifications." },
      { title: "Surface profile glossary", href: "/glossary/surface-profile", description: "A concise guide to an important coating-readiness concept." },
    ],
    projectIds: ["steel-chimney-surface-preparation"],
    faqs: [
      { question: "Can a chimney section be assessed before a blast standard is chosen?", answer: "Yes. The existing condition, coating specification, accessible surfaces, project requirements, and relevant records should be reviewed before a specific preparation standard is assumed." },
      { question: "What should be included with an enquiry for a process stack or fabricated flue?", answer: "Useful information includes drawings or dimensions, photos of all sides, access openings, flange details, lifting and handling arrangements, the existing coating condition, and the intended next stage." },
      { question: "Can the chimney service page confirm a final coating system from the project photos?", answer: "No. The verified project imagery documents surface preparation only. A coating system should be confirmed from the project specification or the responsible coating contractor." },
    ],
  },
  {
    slug: "industrial-steelwork-restoration",
    eyebrow: "Asset-maintenance planning hub",
    title: "Industrial Steelwork Restoration & Corrosion Preparation",
    shortTitle: "Industrial Steelwork Restoration",
    description: "Plan industrial steelwork restoration and corrosion preparation. Explore specialist pathways for pipework, containers, access steelwork, bridge components, and plant, supported by relevant project records and Site Visit guidance.",
    keywords: "industrial steelwork restoration, corrosion preparation steelwork, industrial shot blasting, pipework surface preparation, steel asset refurbishment",
    heroImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3349_cb9e8c4d.webp",
    heroAlt: "Industrial pipework and associated steelwork documented as part of a surface-preparation project",
    overview: [
      "Industrial steelwork restoration covers a wide set of assets, from pipework and containers to access steelwork, bridge components, and plant. This hub helps facilities teams, maintenance contractors, and asset owners identify the specialist pathway that best fits the asset, access conditions, coating objective, and programme context.",
      "The appropriate route depends on the specific asset and evidence available. Rather than treating every industrial project as identical, the pages below direct enquiries to the relevant specialist service and to project records that match the stated asset type.",
    ],
    scope: [
      "Process pipework, spools, manifolds, supports, and associated steelwork",
      "Steel containers, storage structures, access systems, bridge components, and industrial plant",
      "Corrosion, failed coatings, mill scale, and surface condition that must be reviewed before a new coating system",
      "Site logistics, access, operational interfaces, containment, and planned maintenance or shutdown coordination",
    ],
    planningInputs: [
      { title: "Asset register and drawings", description: "Identify the asset type, quantities, dimensions, line or component references, and any areas to exclude from the proposed scope." },
      { title: "Operating context", description: "Explain whether the asset is isolated, in a planned maintenance period, near operational equipment, or subject to specific site controls." },
      { title: "Surface and coating condition", description: "Supply clear photographs and any known coating history, corrosion observations, or specification requirements." },
      { title: "Access and containment", description: "Discuss working height, access equipment, surrounding assets, waste controls, and how the work must interface with the site programme." },
    ],
    serviceLinks: [
      { title: "Process Pipework, Spools & Manifolds", href: "/services/pipework", description: "Specialist route for industrial pipework and associated surface-preparation work." },
      { title: "Steel Container Blasting", href: "/services/steel-containers", description: "For containers and large steel storage structures with corrosion or coating-removal needs." },
      { title: "Fire Escapes & External Stair Towers", href: "/services/fire-escapes", description: "For access steelwork and external escape structures." },
      { title: "Bridge Steelwork", href: "/services/bridge-steelwork", description: "For steel bridge elements, crossmembers, parapet rails, and related infrastructure components." },
    ],
    resourceLinks: [
      { title: "Shot blasting versus chemical stripping", href: "/blog/shot-blasting-vs-chemical-stripping", description: "A decision guide for comparing surface-preparation routes." },
      { title: "Removing mill scale from steel", href: "/blog/removing-mill-scale-from-steel-shot-blasting", description: "A guide to a common new-steel surface-preparation issue." },
      { title: "Rust grade glossary", href: "/glossary/rust-grade", description: "Useful terminology for discussing corrosion condition." },
      { title: "Request a Site Visit", href: "/site-survey", description: "Start a structured discussion about the asset, access, condition, and required outcome." },
    ],
    projectIds: ["pipework-south", "container-blasting-midlands", "bridge-steelwork-north"],
    faqs: [
      { question: "How do you decide which industrial steelwork service is relevant?", answer: "The asset type, existing condition, access, operational environment, coating objective, and programme context guide the service discussion. The purpose of this hub is to route you to the most relevant specialist page before a Site Visit." },
      { question: "Can different industrial assets be included in one initial enquiry?", answer: "Yes. Include the asset types, photographs, quantities, access arrangements, and intended outcomes. The initial discussion can identify whether the scope should be split into specialist work packages." },
      { question: "Does corrosion appearance alone define the required preparation method?", answer: "No. Surface appearance is only one input. The final approach should account for the asset, coating specification, access, condition, environmental controls, and any project-specific requirements." },
    ],
  },
  {
    slug: "factory-cladding-restoration",
    eyebrow: "Industrial building refurbishment hub",
    title: "Factory Cladding Restoration & Coating Preparation",
    shortTitle: "Factory Cladding Restoration",
    description: "Plan factory and warehouse cladding restoration before a protective coating system. Review approved project evidence, scope inputs, cladding services, coating-removal guidance, and Site Visit support.",
    keywords: "factory cladding restoration, warehouse cladding shot blasting, plastisol coating removal, industrial cladding preparation, factory cladding coating preparation",
    heroImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3343_ac1c8682.webp",
    heroAlt: "Approved factory cladding restoration project image showing profiled steel cladding after preparation work",
    overview: [
      "This hub is for facilities teams, building owners, refurbishment contractors, and coating specialists planning work on profiled steel factory or warehouse cladding. It connects the cladding service with the scope information needed before a survey, coating-removal considerations, and relevant project evidence.",
      "The approved factory-cladding project record on this site describes removal of plastisol and failed paint from 2,400 m² of profiled steel cladding at a food-processing plant, with surfaces prepared for a 25-year coating system. This hub uses that documented record without adding a site location, programme, client identity, or unverified preparation standard.",
    ],
    scope: [
      "Profiled steel factory and warehouse cladding panels, elevations, interfaces, flashings, and accessible supporting steelwork",
      "Assessment of plastisol, paint, corrosion, contamination, and failing coating layers before a new system is specified",
      "Preparation sequencing alongside access, containment, neighbouring operations, masking, and coating handover discussions",
      "Commercial refurbishment planning where cladding condition, access, and the coating specification need to be considered together",
    ],
    planningInputs: [
      { title: "Building and elevation information", description: "Share photographs of every elevation, panel profile details, dimensions, access constraints, and any adjacent areas that need protection." },
      { title: "Existing coating condition", description: "Record flaking paint, plastisol condition, corrosion, surface contamination, repairs, damaged panels, and any known previous coating history." },
      { title: "Access and operations", description: "Explain working height, access equipment, occupied areas, production or logistics activity, neighbouring properties, and any time restrictions." },
      { title: "Coating handover", description: "Identify the intended coating contractor or specification owner, required sequence, inspection needs, and any compatibility requirements for the proposed new system." },
    ],
    serviceLinks: [
      { title: "Factory & Warehouse Cladding", href: "/services/factory-cladding", description: "Dedicated service route for cladding restoration and preparation planning." },
      { title: "Coating Removal", href: "/services/coating-removal", description: "Relevant where an existing coating system must be assessed and removed before refurbishment." },
      { title: "Steel Sheeting", href: "/services/steel-sheeting", description: "A related service pathway for steel sheets and panels used in commercial construction." },
      { title: "Structural Steel Frames", href: "/services/structural-steel-frames", description: "Useful where structural steelwork forms part of a wider refurbishment package." },
    ],
    resourceLinks: [
      { title: "Restoring factory and warehouse cladding", href: "/blog/restoring-factory-warehouse-cladding", description: "A practical guide to assessing cladding condition and planning a refurbishment sequence." },
      { title: "Shot blasting versus chemical stripping", href: "/blog/shot-blasting-vs-chemical-stripping", description: "A decision resource for comparing surface-preparation approaches." },
      { title: "Surface profile glossary", href: "/glossary/surface-profile", description: "An explanation of a key coating-readiness term." },
      { title: "Request a Site Visit", href: "/site-survey", description: "Start a structured discussion about cladding condition, access, and the next coating stage." },
    ],
    projectIds: ["factory-cladding-yorkshire"],
    faqs: [
      { question: "What information helps scope a factory cladding restoration enquiry?", answer: "Provide photographs of all elevations, dimensions where available, access details, operating constraints, existing coating condition, and the intended new coating system. A Site Visit can then confirm practical scope factors." },
      { question: "Can the cladding project record on this site confirm a preparation standard for every project?", answer: "No. The approved project record documents the stated cladding scope and intended coating system for that project. Preparation requirements should always be confirmed from the relevant project specification and condition assessment." },
      { question: "Why should access and coating handover be planned before surface preparation begins?", answer: "Access arrangements and the next coating stage affect the safe sequencing of the work, the protection of adjacent areas, inspection arrangements, and how the prepared surface is handed over to the coating contractor." },
    ],
  },
];

export function getPillarPage(slug: string): PillarPageData | undefined {
  return pillarPages.find((page) => page.slug === slug);
}
