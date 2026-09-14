export type PriorityCommercialLink = {
  title: string;
  href: string;
  description: string;
};

export type PriorityCommercialContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  links: PriorityCommercialLink[];
};

export const priorityTownCommercialContent: Record<string, PriorityCommercialContent> = {
  birmingham: {
    eyebrow: "Commercial engineering context",
    title: "Planning commercial sandblasting around Birmingham’s advanced-engineering economy",
    paragraphs: [
      "Invest West Midlands identifies Birmingham as a leading UK core city for advanced engineering and future mobility. For commercial teams planning steelwork, plant, cladding, or access-steel maintenance, that is useful local context for setting out the asset, current condition, working area, access, adjacent operations, and intended coating or repair stage before a scope is agreed.",
      "A Site Visit can focus on the actual commercial asset and the practical project interfaces, rather than assuming a standard method or programme. The linked specialist routes help separate on-site work, steel-frame preparation, and broader commercial sandblasting requirements before the next step is planned.",
    ],
    links: [
      { title: "Commercial Sandblasting", href: "/commercial-shot-blasting-sandblasting", description: "A planning route for commercial metal preparation, coating removal, and surface condition review." },
      { title: "Mobile & On-Site Blasting", href: "/mobile-on-site-shot-blasting", description: "For access, containment, and working-area considerations at a live site." },
      { title: "Structural Steel Frames", href: "/services/structural-steel-frames", description: "For frames, beams, columns, and coating-readiness planning." },
    ],
  },
  liverpool: {
    eyebrow: "Commercial logistics context",
    title: "Planning commercial sand blasting around Liverpool City Region’s logistics and manufacturing setting",
    paragraphs: [
      "Invest Liverpool City Region describes the regional Freeport context as supporting advanced manufacturing, logistics, clean energy, and innovation, with the Port of Liverpool, rail freight terminals, and major road networks part of the wider connectivity picture. This is useful background when a commercial team is assessing warehouse steelwork, plant, cladding, containers, or maintenance assets in and around the city.",
      "Each project still needs a site-specific review of the asset, accessible surfaces, existing condition, access, protection of nearby operations, containment, and the next coating or repair stage. The specialist routes below support that discussion without implying a relationship with any named regional site or organisation.",
    ],
    links: [
      { title: "Commercial Sandblasting", href: "/commercial-shot-blasting-sandblasting", description: "For commercial metal surface-preparation and coating-removal planning." },
      { title: "Mobile & On-Site Blasting", href: "/mobile-on-site-shot-blasting", description: "For practical on-site access, containment, and operational-interface inputs." },
      { title: "Container Restoration & Storage Steelwork", href: "/container-restoration-storage-steelwork", description: "For container and storage-steelwork condition and coating planning." },
    ],
  },
  northampton: {
    eyebrow: "Commercial logistics context",
    title: "Planning commercial sandblasting around Northampton’s logistics setting",
    paragraphs: [
      "Invest in West Northants identifies advanced logistics as a regional sector and describes the area’s connection to the M1 and wider Midlands logistics network. For warehouse, distribution, fabrication, or facilities teams, this provides useful context for considering surface preparation around active commercial operations and the next protective-coating stage.",
      "A Site Visit can establish the asset, current surface condition, accessible faces, working levels, loading or pedestrian interfaces, containment needs, and intended finish before the most suitable scope is discussed. The routes below offer focused planning information for commercial sandblasting, on-site work, and steel-frame preparation.",
    ],
    links: [
      { title: "Commercial Sandblasting", href: "/commercial-shot-blasting-sandblasting", description: "For commercial metal preparation, rust and coating removal, and surface condition review." },
      { title: "Mobile & On-Site Blasting", href: "/mobile-on-site-shot-blasting", description: "For live-site access, containment, and programme-interface planning." },
      { title: "Structural Steel Frames", href: "/services/structural-steel-frames", description: "For structural steel and coating-readiness project discussions." },
    ],
  },
  leicester: {
    eyebrow: "Commercial building context",
    title: "Planning commercial sandblasting across Leicester’s business and commercial-space setting",
    paragraphs: [
      "Leicester City Council’s investment information highlights business investment areas, commercial space, and support for businesses looking to relocate, expand, or invest in the city. That is useful neutral context when a commercial team is reviewing steelwork, plant, cladding, containers, or building-maintenance assets ahead of a surface-preparation or coating stage.",
      "The practical starting point remains the project itself: the asset and condition, accessible faces, access arrangements, nearby activities, containment, protection of adjacent work, inspection requirements, and intended finish. A Site Visit can then focus on the information relevant to the individual commercial scope.",
    ],
    links: [
      { title: "Commercial Sandblasting", href: "/commercial-shot-blasting-sandblasting", description: "For commercial metal surface-preparation and coating-removal planning." },
      { title: "Factory Cladding Restoration", href: "/factory-cladding-restoration", description: "For coated factory and warehouse-building envelope planning." },
      { title: "Structural Steel Frames", href: "/services/structural-steel-frames", description: "For commercial steel frames and associated preparation inputs." },
    ],
  },
  bristol: {
    eyebrow: "Commercial site context",
    title: "Planning surface preparation around Bristol’s industrial and distribution estates",
    paragraphs: [
      "Bristol’s Avonmouth and Severnside Enterprise Area includes established distribution and industrial activity, with storage and distribution, general industrial, office, and light-industrial uses planned across the area. That commercial mix makes early access, containment, and coating-handover planning important when a steelwork, cladding, or plant-maintenance scope is being considered.",
      "A Site Visit helps establish the asset, existing condition, working area, site interfaces, access restrictions, and intended coating stage before a detailed surface-preparation scope is agreed. The links below provide a focused route for mobile and on-site work, structural steel, and building-envelope projects.",
    ],
    links: [
      { title: "Mobile & On-Site Blasting", href: "/mobile-on-site-shot-blasting", description: "Planning guidance for assets that are more practical to prepare at the site." },
      { title: "Structural Steel Frames", href: "/services/structural-steel-frames", description: "Surface-preparation route for frames, beams, columns, and associated steelwork." },
      { title: "Factory Cladding Restoration", href: "/factory-cladding-restoration", description: "Planning pathway for coated factory and warehouse cladding." },
    ],
  },
  peterborough: {
    eyebrow: "Commercial site context",
    title: "Planning warehouse and industrial steelwork scopes in Peterborough",
    paragraphs: [
      "Orton Southgate includes established industrial and warehouse space close to Junction 17 of the A1(M), including steel-frame and profile-steel-cladding units. This is useful context for planning surface preparation where operational access, working areas, material movement, and follow-on coating must be coordinated around an active commercial site.",
      "For a warehouse, fabrication, or cladding scope, photographs, drawings, the existing coating condition, access notes, and the intended finish help make an initial Site Visit discussion more specific. The linked specialist routes explain the information that is most useful before work is planned.",
    ],
    links: [
      { title: "Mobile & On-Site Blasting", href: "/mobile-on-site-shot-blasting", description: "A practical planning route for on-site commercial surface preparation." },
      { title: "Structural Steel Frames", href: "/services/structural-steel-frames", description: "For steel frames, structural members, and coating-readiness planning." },
      { title: "Intumescent Paint for Steel", href: "/intumescent-paint-for-steel", description: "For preparation and handover planning before fire-protective coating work." },
    ],
  },
  chesterfield: {
    eyebrow: "Commercial site context",
    title: "Planning surface preparation around Chesterfield’s industrial and logistics sites",
    paragraphs: [
      "Derbyshire County Council describes Markham Vale as an 85-hectare business park with more than 70 businesses, commercial floor space, transport links, and a new motorway junction. That is useful commercial context when a fabrication, warehouse, access-steel, cladding, or plant-maintenance scope needs a practical discussion around the working area and the next project stage.",
      "A Site Visit can establish the asset, current condition, access, neighbouring operations, protection of adjacent work, containment needs, and intended coating handover before a surface-preparation scope is agreed. The specialist routes below explain the planning information that can help the right project discussion take place.",
    ],
    links: [
      { title: "Mobile & On-Site Blasting", href: "/mobile-on-site-shot-blasting", description: "For on-site access, containment, and commercial interface planning." },
      { title: "Structural Steel Frames", href: "/services/structural-steel-frames", description: "For frames, beams, columns, and coating-readiness planning." },
      { title: "Intumescent Paint for Steel", href: "/intumescent-paint-for-steel", description: "For steel-preparation and fire-protective coating handover planning." },
    ],
  },
  sheffield: {
    eyebrow: "Commercial manufacturing context",
    title: "Planning commercial steelwork preparation around Sheffield’s manufacturing cluster",
    paragraphs: [
      "South Yorkshire Invest identifies the Advanced Manufacturing Innovation District as the United Kingdom’s largest research-led advanced-manufacturing cluster, with the University of Sheffield Advanced Manufacturing Research Centre among its facilities. This provides useful context for commercial teams planning surface preparation around fabricated steel, structural frames, maintenance assets, and the next protective-coating stage.",
      "The project-specific discussion should still start with the asset, accessible faces, surface condition, photographs, access, working levels, active operations, containment, inspection requirements, and programme interfaces. A Site Visit can consider those practical conditions before a method or schedule is assumed.",
    ],
    links: [
      { title: "Steel Fabrication Surface Preparation", href: "/steel-fabrication-surface-preparation", description: "Planning support for fabricated steel, mill scale, and coating readiness." },
      { title: "Intumescent Paint for Steel", href: "/intumescent-paint-for-steel", description: "For coordinated preparation and fire-protective coating handover." },
      { title: "Mobile & On-Site Blasting", href: "/mobile-on-site-shot-blasting", description: "For working-area, access, containment, and programme inputs." },
    ],
  },
  bradford: {
    eyebrow: "Commercial site context",
    title: "Planning industrial surface preparation across Bradford’s commercial premises",
    paragraphs: [
      "Bradford Council states that Invest in Bradford maintains a commercial-premises database and supports businesses moving to or expanding in the district. For industrial and commercial site teams, that is a reminder that access, operational interfaces, asset condition, and the next coating stage should be considered together when a surface-preparation scope is being explored.",
      "Photographs, drawings or dimensions, current coating condition, access routes, nearby activities, and the intended finish help make an initial Site Visit discussion more useful. The specialist routes below separate the most relevant planning paths without assuming a one-size-fits-all approach for every commercial asset.",
    ],
    links: [
      { title: "Mobile & On-Site Blasting", href: "/mobile-on-site-shot-blasting", description: "For access, containment, and working-area planning at a live commercial site." },
      { title: "Factory Cladding Restoration", href: "/factory-cladding-restoration", description: "For coated factory and warehouse-building envelope planning." },
      { title: "Structural Steel Frames", href: "/services/structural-steel-frames", description: "For commercial steel frames and associated preparation inputs." },
    ],
  },
  derby: {
    eyebrow: "Commercial manufacturing context",
    title: "Planning surface preparation around Derby’s advanced-manufacturing setting",
    paragraphs: [
      "Derby City Council describes Infinity Park Derby as a commercial and technology development with industrial-distribution plots and links to the city’s advanced-manufacturing setting. That is relevant local context for contractors, fabricators, and facilities teams discussing structural steel, plant, access steel, or coating-preparation work around a commercial project.",
      "A project-specific review should confirm the steelwork, existing condition, accessible surfaces, access arrangements, active operations, protection of adjacent work, inspection expectations, intended primer or coating stage, and handover process. A Site Visit can then focus on the information that is relevant to the actual scope.",
    ],
    links: [
      { title: "Structural Steel Frames", href: "/services/structural-steel-frames", description: "For steel-frame preparation and coating-readiness planning." },
      { title: "Intumescent Paint for Steel", href: "/intumescent-paint-for-steel", description: "For preparation and handover before fire-protective coating work." },
      { title: "Mobile & On-Site Blasting", href: "/mobile-on-site-shot-blasting", description: "For on-site access, containment, and programme considerations." },
    ],
  },
  leeds: {
    eyebrow: "Commercial manufacturing and logistics context",
    title: "Planning commercial surface preparation around Leeds’ Enterprise Zone setting",
    paragraphs: [
      "Leeds City Council describes the Leeds City Region Enterprise Zone as a location for modern manufacturing and related supply-chain businesses, with motorway access via Junction 45 of the M1 and sites including Logic Leeds and Temple Green. This is useful background when an industrial or commercial team is reviewing warehouse steelwork, plant, cladding, access steel, or storage assets ahead of a preparation or coating stage.",
      "The project discussion should still begin with the actual asset, current condition, accessible faces, active operations, access restrictions, containment, protection of adjacent work, and intended coating handover. A Site Visit can focus on those project-specific inputs before a method or programme is assumed.",
    ],
    links: [
      { title: "Commercial Sandblasting", href: "/commercial-shot-blasting-sandblasting", description: "For commercial metal surface preparation, coating removal, and condition review." },
      { title: "Mobile & On-Site Blasting", href: "/mobile-on-site-shot-blasting", description: "For access, containment, and operational-interface planning at a live site." },
      { title: "Structural Steel Frames", href: "/services/structural-steel-frames", description: "For frames, beams, columns, and coating-readiness planning." },
    ],
  },
  manchester: {
    eyebrow: "Commercial advanced-manufacturing context",
    title: "Planning commercial steelwork preparation around Greater Manchester’s advanced-materials cluster",
    paragraphs: [
      "Greater Manchester Combined Authority describes its Graphene, Advanced Materials and Manufacturing Alliance as supporting growth and innovation across the advanced materials and manufacturing sector. That is relevant local context when a commercial team is assessing fabricated steel, structural frames, maintenance assets, plant, or the handover between surface preparation and a protective coating stage.",
      "Each scope still requires a site-specific review of the asset, existing surface condition, accessible faces, working levels, nearby operations, containment, inspection needs, and intended finish. A Site Visit can establish those practical requirements without assuming a standard method, timescale, or outcome.",
    ],
    links: [
      { title: "Steel Fabrication Surface Preparation", href: "/steel-fabrication-surface-preparation", description: "For fabricated sections, mill scale, surface condition, and coating-readiness planning." },
      { title: "Intumescent Paint for Steel", href: "/intumescent-paint-for-steel", description: "For coordinated preparation and fire-protective coating handover discussions." },
      { title: "Mobile & On-Site Blasting", href: "/mobile-on-site-shot-blasting", description: "For on-site access, containment, and programme-interface considerations." },
    ],
  },
  oxford: {
    eyebrow: "Commercial innovation and manufacturing context",
    title: "Planning commercial surface preparation across Oxford’s innovation economy",
    paragraphs: [
      "Enterprise Oxfordshire describes a regional business ecosystem that combines research with science and business parks containing laboratory, office, and advanced-manufacturing space. This gives useful neutral context for facilities, engineering, and commercial teams considering structural steel, plant, access steel, cladding, or metal assets before a surface-preparation and coating stage.",
      "The relevant project information remains asset-specific: surface condition, accessible areas, access arrangements, adjacent activities, protection requirements, containment, inspection expectations, and the intended finish. A Site Visit can use that information to frame the next appropriate project discussion.",
    ],
    links: [
      { title: "Steel Fabrication Surface Preparation", href: "/steel-fabrication-surface-preparation", description: "For fabricated steel, mill scale, rust, and coating-readiness planning." },
      { title: "Commercial Sandblasting", href: "/commercial-shot-blasting-sandblasting", description: "For commercial metal surface preparation and coating-removal requirements." },
      { title: "Intumescent Paint for Steel", href: "/intumescent-paint-for-steel", description: "For preparation and handover ahead of fire-protective coating work." },
    ],
  },
  "milton-keynes": {
    eyebrow: "Commercial logistics context",
    title: "Planning commercial sandblasting around Milton Keynes’ logistics setting",
    paragraphs: [
      "Invest Milton Keynes describes the city as a logistics and warehousing hub with M1 and West Coast Mainline connectivity, while the City Council identifies the area’s transport and logistics connections between London, Birmingham, Oxford, and Cambridge. This is useful background when warehouse, distribution, facilities, or engineering teams are reviewing steelwork, cladding, containers, plant, or storage assets.",
      "A project-specific Site Visit can establish the asset, surface condition, access routes, active loading or pedestrian interfaces, working area, containment needs, protection of adjacent operations, and intended coating or repair stage before a scope is agreed.",
    ],
    links: [
      { title: "Mobile & On-Site Blasting", href: "/mobile-on-site-shot-blasting", description: "For practical working-area, access, containment, and operational-interface planning." },
      { title: "Container Restoration & Storage Steelwork", href: "/container-restoration-storage-steelwork", description: "For container and storage-steelwork condition and recoating planning." },
      { title: "Factory Cladding Restoration", href: "/factory-cladding-restoration", description: "For coated factory and warehouse-building envelope planning." },
    ],
  },
};

export const priorityCountyCommercialContent: Record<string, PriorityCommercialContent> = {
  derbyshire: {
    eyebrow: "Commercial manufacturing context",
    title: "Surface-preparation planning for Derbyshire’s manufacturing economy",
    paragraphs: [
      "Derbyshire Observatory identifies manufacturing as a key local sector, accounting for nearly one fifth of employment in the county. For fabricators, maintenance teams, and commercial contractors, that makes clear preparation, access, handling, and coating-handover information especially important before a steelwork or plant-maintenance scope is agreed.",
      "The resources below connect the county hub to focused planning routes for mobile work, fabricated and structural steel, and the sequence between surface preparation and fire-protective coating. They support an evidence-led Site Visit discussion rather than assuming a single method for every asset.",
    ],
    links: [
      { title: "Mobile & On-Site Blasting", href: "/mobile-on-site-shot-blasting", description: "For on-site access, containment, and programme considerations." },
      { title: "Steel Fabrication Surface Preparation", href: "/steel-fabrication-surface-preparation", description: "For fabricated sections, structural frames, mill scale, and coating readiness." },
      { title: "Intumescent Paint for Steel", href: "/intumescent-paint-for-steel", description: "For coordinated preparation and fire-protective coating handover." },
    ],
  },
  cornwall: {
    eyebrow: "Commercial marine and industrial context",
    title: "Planning surface preparation across Cornwall’s commercial sites",
    paragraphs: [
      "Cornwall Council’s Penzance Harbour plans include freight-handling improvements, engineering workshops, a boat-lift crane, a marine wash bay, and wider harbour-facility work. Together with Cornwall’s industrial estates and rural steelwork, this points to varied commercial environments where the asset, access arrangement, condition, and next coating stage need to be understood before a scope is agreed.",
      "The resources below help separate practical pathways for mobile work, marine-facing assets, containers, and industrial steelwork. A Site Visit can then consider the specific access, containment, operational, and coating-handover requirements of the individual project.",
    ],
    links: [
      { title: "Mobile & On-Site Blasting", href: "/mobile-on-site-shot-blasting", description: "For commercial assets that are assessed and prepared in their operating location." },
      { title: "Marine Shot Blasting", href: "/services/marine-shot-blasting", description: "For marine-related steelwork and assets subject to a project-specific scope review." },
      { title: "Container Restoration & Storage Steelwork", href: "/container-restoration-storage-steelwork", description: "For container and storage-steelwork condition and recoating planning." },
    ],
  },
};
