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
  {
    slug: "process-pipework-spools-surface-preparation",
    eyebrow: "Industrial asset planning hub",
    title: "Process Pipework, Spools & Support Steelwork Surface Preparation",
    shortTitle: "Process Pipework & Spools Preparation",
    description: "Plan blast cleaning for process pipework, spools, manifolds, and support steelwork before protective coating. Review approved water-treatment project evidence, scope inputs, specialist services, and Site Visit guidance.",
    keywords: "process pipework shot blasting, pipe spool surface preparation, water treatment pipework blast cleaning, pipework coating preparation, industrial pipe support steelwork",
    heroImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3349_cb9e8c4d.webp",
    heroAlt: "Approved project image of process pipework and support steelwork at a water-treatment facility after blast cleaning",
    overview: [
      "This hub helps facilities teams, principal contractors, maintenance planners, and coating specialists prepare a clear enquiry for process pipework, spools, manifolds, and support steelwork. It brings together the pipework service, coating-readiness questions, inspection and access considerations, and Site Visit pathway.",
      "The approved project record on this site documents external blast cleaning of 850 metres of process pipework and support steelwork at a water-treatment facility, achieving Sa 2.5 for a three-coat epoxy coating system. This hub is limited to that documented scope and does not add a site location, programme, client, operating condition, or further project claims.",
    ],
    scope: [
      "External process pipework, fabricated spools, manifolds, flanged sections, supports, brackets, and accessible associated steelwork",
      "Corrosion, failed coatings, mill scale, contamination, weld areas, support interfaces, and external pipework condition before coating",
      "Planning around isolation, operating interfaces, access, containment, protection of adjacent assets, inspection, and coating handover",
      "Asset-maintenance and refurbishment scopes where the pipework condition, access plan, and coating specification must be considered together",
    ],
    planningInputs: [
      { title: "Asset and line information", description: "Share drawings, line lists, spool references, sizes, support details, quantities, flange locations, and clearly identify any excluded surfaces." },
      { title: "Isolation and operations", description: "Confirm whether the assets are isolated, the planned maintenance window, adjacent operating equipment, permits, and site-specific control requirements." },
      { title: "Surface and coating condition", description: "Provide photographs showing the full run, corrosion, existing coating, joints, welds, interfaces, support steelwork, and any restricted-access areas." },
      { title: "Coating and inspection handover", description: "Identify the coating specification owner, intended coating system, inspection requirements, timing, and how the prepared work will be protected and handed over." },
    ],
    serviceLinks: [
      { title: "Process Pipework, Spools & Manifolds", href: "/services/pipework", description: "Dedicated service route for pipework and associated steelwork surface preparation." },
      { title: "Coating Removal", href: "/services/coating-removal", description: "Relevant where an existing coating system needs to be assessed before the work scope is confirmed." },
      { title: "Plant & Machinery", href: "/services/plant-machinery", description: "Useful where wider plant assets are included in a planned maintenance or refurbishment package." },
      { title: "Industrial Steelwork Restoration", href: "/industrial-steelwork-restoration", description: "A related planning hub for other industrial steel assets and corrosion-preparation scopes." },
    ],
    resourceLinks: [
      { title: "Steel fabrication shot blasting costs and programme guide", href: "/blog/steel-fabrication-shot-blasting-costs-and-programme-guide", description: "Cost and programme factors that also apply to drawings, access, condition, and coating sequencing." },
      { title: "Steel chimney and process-stack preparation guide", href: "/blog/steel-chimney-process-stack-surface-preparation", description: "Related guidance for fabricated cylindrical sections, access openings, and protective coating handover." },
      { title: "Sa 2.5 surface preparation glossary", href: "/glossary/sa-2-5", description: "Plain-English explanation of the preparation grade documented in the approved water-treatment project record." },
      { title: "Request a Site Visit", href: "/site-survey", description: "Start a structured discussion about the assets, isolation, access, coating system, and programme." },
    ],
    projectIds: ["pipework-south"],
    faqs: [
      { question: "What information helps prepare an enquiry for pipework blast cleaning?", answer: "Useful information includes line or spool references, drawings, photographs of the full run and support steelwork, isolation status, access, existing coating condition, operating constraints, and the intended coating system." },
      { question: "Does the approved water-treatment project record apply to every pipework project?", answer: "No. It documents the stated 850-metre water-treatment scope, Sa 2.5 result, and three-coat epoxy handover for that project only. The preparation and coating requirements for another asset must be confirmed from its own specification and condition assessment." },
      { question: "Why should isolation, access, and coating handover be considered before the work is scheduled?", answer: "They affect practical sequencing, safe access, protection of adjacent assets, inspection arrangements, surface condition at handover, and the coordination of the next coating stage." },
    ],
  },
  {
    slug: "agricultural-steelwork-grain-store-preparation",
    eyebrow: "Agricultural asset planning hub",
    title: "Agricultural Steelwork & Grain Store Surface Preparation",
    shortTitle: "Agricultural Steelwork & Grain Store Planning",
    description: "Plan surface preparation for agricultural steelwork, farm machinery, grain-store structures, and rural building components before protective coating. Review approved project evidence and Site Visit guidance.",
    keywords: "agricultural steelwork shot blasting, grain store surface preparation, farm machinery blast cleaning, agricultural building steel preparation, grain store coating preparation",
    heroImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3334_2858c684.webp",
    heroAlt: "Approved project image of agricultural farm machinery after rust removal and surface preparation",
    overview: [
      "This planning hub supports farm operators, rural building contractors, machinery owners, and coating teams assessing agricultural steelwork, grain-store structures, farm equipment, and related rural assets before protective coating or refurbishment.",
      "The approved project record used here documents rust removal and surface preparation on 14 pieces of farm machinery, including trailers, ploughs, and spreaders, before protective coating. It does not document a grain-store project, a farm location, a programme, a client, or a specific preparation standard; grain-store scopes require their own condition assessment and specification.",
    ],
    scope: [
      "Farm machinery, trailers, implements, spreaders, ploughs, brackets, gates, agricultural equipment, and accessible steel components",
      "Agricultural building steelwork, grain-store structures, hoppers, access steelwork, and related fabricated components where the specific scope can be safely assessed",
      "Rust, failed paint, scale, contamination, and surface condition before an agreed coating or repair stage",
      "Access, seasonal working windows, asset handling, containment, neighbouring operations, and coating handover planning",
    ],
    planningInputs: [
      { title: "Asset or building information", description: "Share photographs, dimensions, quantities, construction details, equipment type, and identify the surfaces or components included in the proposed scope." },
      { title: "Surface condition", description: "Photographs should show corrosion, existing paint, contamination, repairs, joints, moving parts, grain-store interfaces, and any areas that must be protected." },
      { title: "Access and seasonal constraints", description: "Explain access routes, working area, equipment handling, occupancy, livestock or crop considerations, seasonal windows, and any operational restrictions." },
      { title: "Coating handover", description: "Identify the intended coating, repair, or next stage, plus the responsible specification owner and practical sequence after surface preparation." },
    ],
    serviceLinks: [
      { title: "Agricultural Shot Blasting", href: "/services/agricultural-shot-blasting", description: "Dedicated service route for agricultural machinery, steelwork, and farm equipment preparation." },
      { title: "Plant & Machinery", href: "/services/plant-machinery", description: "Relevant where wider plant assets or machinery form part of a maintenance scope." },
      { title: "Steel Sheeting", href: "/services/steel-sheeting", description: "A related route for agricultural panels, sheeting, and accessible steel surfaces." },
      { title: "Coating Removal", href: "/services/coating-removal", description: "Useful where old coatings must be assessed before an agreed preparation approach is selected." },
    ],
    resourceLinks: [
      { title: "Industrial steelwork restoration planning", href: "/industrial-steelwork-restoration", description: "A related planning hub for corrosion preparation across steel assets and access systems." },
      { title: "Seasonal agricultural steelwork maintenance guide", href: "/blog/seasonal-agricultural-steelwork-maintenance-guide", description: "A practical pre-harvest planning guide for condition records, access, weatherproofing checks, and coating preparation." },
      { title: "Shot blasting versus chemical stripping", href: "/blog/shot-blasting-vs-chemical-stripping", description: "A decision guide for comparing surface-preparation routes." },
      { title: "Rust grade glossary", href: "/glossary/rust-grade", description: "Plain-English terminology to help describe observed corrosion condition." },
      { title: "Request a Site Visit", href: "/site-survey", description: "Start a structured discussion about the assets, access, condition, coating, and programme." },
    ],
    projectIds: ["agricultural-equipment-midlands"],
    faqs: [
      { question: "What information helps scope agricultural steelwork or grain-store surface preparation?", answer: "Photographs, dimensions, asset or building details, surface condition, access information, seasonal constraints, and the intended coating or repair stage all help define an initial scope. A Site Visit can confirm practical details." },
      { question: "Does the approved farm-machinery project record also document a grain-store project?", answer: "No. It documents preparation of 14 pieces of farm machinery before protective coating. Grain-store structures and agricultural buildings need their own condition assessment, scope, access plan, and specification review." },
      { question: "Why should access and seasonal activity be discussed before agricultural preparation work?", answer: "Access routes, equipment handling, working area, surrounding farm activity, seasonal priorities, and the planned coating handover can affect safe sequencing and the practical timing of the work." },
    ],
  },
  {
    slug: "container-restoration-storage-steelwork",
    eyebrow: "Industrial storage asset planning hub",
    title: "Container Restoration & Storage Steelwork Surface Preparation",
    shortTitle: "Container Restoration & Storage Steelwork",
    description: "Plan surface preparation for steel containers, storage units, and containerised steelwork before recoating. Review approved container-project evidence, scope inputs, specialist services, and Site Visit guidance.",
    keywords: "container restoration shot blasting, steel container recoating preparation, shipping container rust removal, container fleet blast cleaning, storage steelwork surface preparation",
    heroImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3354_caa39ac3.webp",
    heroAlt: "Approved project image of a steel shipping container prepared for a protective recoating system",
    overview: [
      "This planning hub supports logistics operators, facilities teams, storage-asset owners, and refurbishment contractors assessing steel containers, storage units, and containerised structures before a new protective coating stage. It connects the container service, condition-review inputs, project evidence, and Site Visit pathway.",
      "The approved container project record on this site documents removal of rust and old coatings from 18 shipping containers at a logistics depot, returned to Sa 2.5 and recoated on site. This hub is limited to that documented record and does not add a depot location, programme, client, coating product, or further fleet claims.",
    ],
    scope: [
      "Steel shipping containers, storage units, containerised steelwork, doors, frames, roof areas, corner details, and accessible external surfaces",
      "Corrosion, failed coatings, rust, surface contamination, repairs, and areas that need assessment before an agreed coating system",
      "Preparation sequencing alongside access, positioning, surrounding operations, containment, masking, inspection, and recoating handover",
      "Logistics, construction, manufacturing, and industrial-storage scopes where container condition and operational access need to be planned together",
    ],
    planningInputs: [
      { title: "Container schedule", description: "Share quantities, container types, dimensions, door and frame condition, serial or asset references where appropriate, and identify any excluded surfaces." },
      { title: "Condition record", description: "Provide photographs of all sides, roof areas, doors, corners, corrosion, old coating, repairs, labels that must be protected, and access constraints." },
      { title: "Access and operations", description: "Explain the depot or site layout, container movement, lifting arrangements, occupied areas, nearby activities, working restrictions, and any required containment." },
      { title: "Recoating handover", description: "Identify the intended coating specification owner, coating sequence, inspection requirements, and how prepared surfaces will be protected before recoating." },
    ],
    serviceLinks: [
      { title: "Steel Container Blasting", href: "/services/steel-containers", description: "Dedicated service route for container corrosion, old-coating, and recoating-preparation discussions." },
      { title: "Coating Removal", href: "/services/coating-removal", description: "Relevant where old container coatings need review before a preparation approach is agreed." },
      { title: "Industrial Steelwork Restoration", href: "/industrial-steelwork-restoration", description: "Related planning hub for wider industrial steel assets, corrosion, and refurbishment scopes." },
      { title: "Plant & Machinery", href: "/services/plant-machinery", description: "Useful where containerised assets form part of a wider plant or maintenance package." },
    ],
    resourceLinks: [
      { title: "Shot blasting versus chemical stripping", href: "/blog/shot-blasting-vs-chemical-stripping", description: "A decision guide for comparing surface-preparation routes where coating removal is part of the brief." },
      { title: "Steel fabrication shot blasting costs and programme guide", href: "/blog/steel-fabrication-shot-blasting-costs-and-programme-guide", description: "Useful scope factors for access, condition, coating handover, and programme planning." },
      { title: "Rust grade glossary", href: "/glossary/rust-grade", description: "Plain-English terminology for describing visible corrosion before an assessment." },
      { title: "Request a Site Visit", href: "/site-survey", description: "Start a structured discussion about container quantity, condition, access, and recoating requirements." },
    ],
    projectIds: ["container-blasting-midlands"],
    faqs: [
      { question: "What information helps scope a container restoration enquiry?", answer: "Useful information includes container quantities and dimensions, photographs of every side and roof where accessible, existing coating condition, corrosion, door and frame details, access arrangements, operational restrictions, and the intended recoating system." },
      { question: "Does the approved container project record apply to every storage-container project?", answer: "No. It documents 18 shipping containers at a logistics depot, returned to Sa 2.5 and recoated on site. Each container or storage-steelwork scope needs its own condition assessment, access review, and coating specification." },
      { question: "Why should container access and recoating handover be planned before surface preparation?", answer: "They influence container positioning, protection of adjacent activities, containment, inspection, safe sequencing, and the condition of the prepared surface when it is handed over for recoating." },
    ],
  },
  {
    slug: "mobile-on-site-shot-blasting",
    eyebrow: "Commercial site-planning hub",
    title: "Mobile & On-Site Shot Blasting for Commercial Projects",
    shortTitle: "Mobile & On-Site Shot Blasting",
    description: "Plan commercial mobile and on-site shot blasting for structural steel, cladding, containers, plant, and industrial assets. Explore scope inputs, specialist routes, access planning, and Site Visit guidance.",
    keywords: "mobile shot blasting, on site shot blasting, mobile blasting contractor, on site abrasive blasting, commercial mobile shot blasting, industrial surface preparation on site",
    heroImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3365_56728af1.webp",
    heroAlt: "Documented structural steel prepared for the next protective coating stage",
    overview: [
      "This commercial planning hub is for asset owners, facilities teams, fabricators, and contractors considering whether surface preparation can be assessed and delivered at the working site. It links the site information that affects a practical discussion with routes for structural steel, cladding, containers, pipework, and industrial plant.",
      "An on-site scope is not defined by asset type alone. The working area, access, asset dimensions, surrounding operations, containment needs, material handling, existing condition, intended coating, inspection requirements, and programme interfaces should be reviewed before a detailed method or schedule is assumed.",
    ],
    scope: [
      "Structural frames, fabricated steelwork, access steel, pipework, plant, containers, cladding, and other commercial steel assets where on-site assessment is appropriate",
      "Existing coatings, corrosion, mill scale, contamination, repair areas, accessible surfaces, and exclusions that need condition review",
      "Working-area layout, site interfaces, access routes, handling, elevation, protection of adjacent work, containment, cleaning, inspection, and coating handover",
      "Commercial programmes where surface preparation must be coordinated with fabrication, maintenance, refurbishment, or the next protective-coating stage",
    ],
    planningInputs: [
      { title: "Asset and condition record", description: "Share photographs, drawings or dimensions where available, the asset type, accessible faces, surface condition, old coatings, corrosion, repairs, and excluded areas." },
      { title: "Site and access plan", description: "Explain the working area, access routes, space around the asset, material movement, height or elevation, active operations, adjacent trades, and site restrictions." },
      { title: "Protection and containment", description: "Identify neighbouring equipment, occupied areas, sensitive surfaces, weather exposure where relevant, containment expectations, waste arrangements, and cleaning requirements." },
      { title: "Coating and programme handover", description: "Confirm the intended primer or coating stage, specification owner, inspection requirements, and the practical sequence between preparation and subsequent work." },
    ],
    serviceLinks: [
      { title: "Structural Steel Frames", href: "/services/structural-steel-frames", description: "For frames, beams, columns, and steelwork that need a project-specific preparation discussion." },
      { title: "Factory & Warehouse Cladding", href: "/services/factory-cladding", description: "For commercial building-envelope restoration and coating-removal planning." },
      { title: "Steel Container Blasting", href: "/services/steel-containers", description: "For container condition, access, handling, and recoating-handover inputs." },
      { title: "Plant & Machinery", href: "/services/plant-machinery", description: "For plant and equipment where transport, access, and working conditions need review." },
    ],
    resourceLinks: [
      { title: "Mobile and on-site blasting planning guide", href: "/blog/mobile-on-site-shot-blasting-project-planning-guide", description: "A practical checklist for asset, access, containment, coating-handover, and programme inputs." },
      { title: "Steel fabrication surface-preparation hub", href: "/steel-fabrication-surface-preparation", description: "Planning support for fabricated and structural-steel packages." },
      { title: "Industrial steelwork restoration hub", href: "/industrial-steelwork-restoration", description: "Related guidance for corrosion and refurbishment scopes." },
      { title: "Request A Site Visit", href: "/site-survey", description: "Share the asset, access, condition, project photographs, and intended next stage." },
    ],
    projectIds: [],
    faqs: [
      { question: "What information helps assess whether a project is suitable for on-site shot blasting?", answer: "Useful information includes the asset type and dimensions, photographs of the current condition, accessible working areas, access routes, surrounding operations, adjacent surfaces, containment needs, the intended coating stage, and any programme restrictions. A Site Visit can then consider the specific project conditions." },
      { question: "Can every commercial steel asset be prepared on site?", answer: "Not automatically. The practical approach depends on the asset, site layout, access, condition, safety requirements, protection of surrounding operations, containment, handling, and the next project stage. These details should be assessed before a method is agreed." },
      { question: "Why should coating handover be discussed before on-site surface preparation?", answer: "The planned primer or coating system can affect the preparation requirement, inspection, protection of prepared surfaces, and the sequence between trades. Early coordination helps the project team define the relevant scope inputs." },
    ],
  },
  {
    slug: "intumescent-paint-for-steel",
    eyebrow: "Steel fire-protection planning hub",
    title: "Intumescent Paint for Steel: Preparation & Handover Planning",
    shortTitle: "Intumescent Paint for Steel",
    description: "Plan structural-steel preparation and handover before intumescent fire-protective paint. Explore scope inputs, approved HB Tunnelling project evidence, specialist routes, and Site Visit guidance.",
    keywords: "intumescent paint steel preparation, intumescent coating steelwork, structural steel fire protection preparation, blast cleaning before intumescent paint, fire protective paint steel contractor",
    heroImage: "https://commercialshotblasting.co.uk/manus-storage/hb-tunnelling-intumescent-steelwork_83670264.jpeg",
    heroAlt: "Approved HB Tunnelling project image showing intumescent fire-protective paint on warehouse steelwork",
    overview: [
      "This hub supports main contractors, fabricators, coating teams, and asset owners planning the handover between structural-steel preparation and intumescent fire-protective painting. It connects the preparation inputs that need agreement with the relevant structural-steel and intumescent-painting service routes.",
      "The approved HB Tunnelling Doncaster case study documents a warehouse refurbishment delivered as one coordinated scope: abrasive blasting, primer applied immediately after preparation to protect coating adhesion, and intumescent fire-protective painting by a five-person multi-skilled team. That project provides useful evidence of coordinated sequencing, but each steelwork package needs its own condition, access, specification, and programme review.",
    ],
    scope: [
      "Structural frames, beams, columns, fabricated sections, connections, accessible steelwork, and areas identified for a fire-protective coating stage",
      "Corrosion, mill scale, failed coatings, contamination, repair areas, weld details, accessible faces, masking, and exclusions that affect preparation planning",
      "Preparation, primer, inspection, protection of prepared steel, intumescent-coating coordination, access, containment, and practical handover between trades",
      "Commercial refurbishment, new-build, fabrication, and operational-site scopes where the surface-preparation and fire-protection stages need clear sequencing",
    ],
    planningInputs: [
      { title: "Steelwork and specification", description: "Provide drawings or component information, the relevant fire-protection and coating specification owner, required areas, accessible faces, repair details, and any excluded surfaces." },
      { title: "Condition and preparation record", description: "Share photographs of the existing surface, corrosion, mill scale, old coatings, welds, bolts, connections, contamination, and areas that need protection." },
      { title: "Access and programme coordination", description: "Explain access arrangements, working levels, other trades, operational interfaces, working area, containment needs, and the sequence between preparation, primer, inspection, and intumescent coating." },
      { title: "Handover controls", description: "Confirm the responsible coating parties, inspection points, timing expectations, protection of prepared surfaces, and the practical process for release to the next coating stage." },
    ],
    serviceLinks: [
      { title: "Intumescent Painting", href: "/services/intumescent-painting", description: "Specialist service route for intumescent fire-protective coating project discussions." },
      { title: "Structural Steel Frames", href: "/services/structural-steel-frames", description: "For structural-steel condition, preparation, and coating-readiness planning." },
      { title: "HB Tunnelling Doncaster case study", href: "/case-studies/hb-tunnelling-doncaster", description: "Approved project evidence of coordinated blasting, prompt priming, and intumescent painting." },
      { title: "Mobile & On-Site Blasting", href: "/mobile-on-site-shot-blasting", description: "For access, containment, and site-interface planning around a live commercial asset." },
    ],
    resourceLinks: [
      { title: "Intumescent steelwork planning guide", href: "/blog/intumescent-steelwork-specification-planning-guide", description: "A focused guide to the information that should be agreed before coating work begins." },
      { title: "Steel fabrication surface-preparation hub", href: "/steel-fabrication-surface-preparation", description: "Related planning support for fabricated sections and structural frames." },
      { title: "Sa 2.5 surface-preparation glossary", href: "/glossary/sa-2-5", description: "Plain-English explanation of a frequently specified surface-preparation term." },
      { title: "Request A Site Visit", href: "/site-survey", description: "Share the steelwork, existing condition, access, specification, and intended coating sequence." },
    ],
    projectIds: [],
    faqs: [
      { question: "What should be agreed before steelwork is prepared for intumescent paint?", answer: "The steelwork and accessible areas, existing surface condition, specified fire-protective system, preparation requirement, primer sequence, inspection points, access, containment, and handover process should be clarified before a project-specific method is assumed." },
      { question: "Why does the interval between preparation and primer matter?", answer: "The approved HB Tunnelling case study states that primer was applied immediately after blasting to protect coating adhesion. The required sequence for another project depends on its specification, condition, environment, access, and coating-system requirements." },
      { question: "Does the HB Tunnelling case study define the programme for every intumescent coating project?", answer: "No. It documents a specific Doncaster warehouse refurbishment with a five-person multi-skilled team and carefully planned same-day stages. Each project needs its own review of steelwork, preparation, coating specification, access, operational interfaces, and programme." },
    ],
  },
];

export function getPillarPage(slug: string): PillarPageData | undefined {
  return pillarPages.find((page) => page.slug === slug);
}
