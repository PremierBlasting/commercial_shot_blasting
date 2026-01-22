export interface CaseStudy {
  title: string;
  client: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
}

export interface ServiceData {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  heroImage: string;
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  applications: string[];
  caseStudies: CaseStudy[];
  faqs: { question: string; answer: string }[];
}

export const services: ServiceData[] = [
  {
    id: "structural-steel-frames",
    title: "Structural Steel Frames",
    shortTitle: "Steel Frames",
    tagline: "Comprehensive Shot Blasting for Structural Steelwork",
    description: "Our structural steel frame shot blasting service delivers exceptional surface preparation for all types of building frames, roof trusses, and load-bearing steel structures. We remove mill scale, rust, welding residue, and old coatings to create the perfect surface for protective treatments. Whether you're preparing new fabrications for galvanizing or refurbishing existing structural steelwork, our precision techniques ensure optimal coating adhesion and long-term corrosion protection.",
    heroImage: "/service-structural-steel.png",
    benefits: [
      "Complete removal of mill scale and rust",
      "Prepares surfaces for galvanizing or protective coatings",
      "Extends structural steel lifespan",
      "Meets SA 2.5 and SA 3 cleanliness standards",
      "Suitable for new fabrications and refurbishment projects",
      "Environmentally responsible process"
    ],
    process: [
      { step: 1, title: "Structural Assessment", description: "We inspect the steel frame components to determine appropriate blast media, pressure settings, and surface preparation requirements." },
      { step: 2, title: "Component Preparation", description: "Frame sections are positioned for optimal blast coverage. Critical areas such as bolt holes and connection points are protected as required." },
      { step: 3, title: "Shot Blasting", description: "Using appropriate blast media, we systematically clean all frame surfaces to achieve the specified cleanliness standard for your coating system." },
      { step: 4, title: "Quality Inspection", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications." },
      { step: 5, title: "Coating Coordination", description: "Cleaned components are prepared for galvanizing, powder coating, or painting, with timing coordinated to minimize surface oxidation." }
    ],
    applications: [
      "Building frame structures",
      "Roof trusses and purlins",
      "Portal frame components",
      "Mezzanine floor structures",
      "Industrial building frames",
      "Warehouse structural steelwork",
      "Agricultural building frames",
      "Commercial building steel frames"
    ],
    caseStudies: [
      {
        title: "Industrial Warehouse Frame Refurbishment",
        client: "Manufacturing Facility",
        challenge: "A 10,000 sq ft warehouse required complete refurbishment of corroded structural steel frames. Rust and deteriorated coatings compromised structural integrity.",
        solution: "We systematically shot blasted all frame components, removing rust and old coatings. Components were then hot-dip galvanized for maximum corrosion protection.",
        result: "The warehouse structure was restored to full load-bearing capacity with a protective galvanized finish, extending its service life by an estimated 30+ years.",
        image: "/service-structural-steel.png"
      }
    ],
    faqs: [
      {
        question: "Can you blast structural steel frames on-site?",
        answer: "For optimal results and to meet galvanizing specifications, we typically recommend processing frame components at our facility. This ensures complete coverage and the cleanliness standards required for protective treatments. On-site blasting can be arranged for coating repairs."
      },
      {
        question: "What surface preparation standard do you achieve?",
        answer: "We routinely achieve SA 2.5 and SA 3 surface preparation to ISO 8501 standards, which are required for hot-dip galvanizing and high-performance coating systems. We can provide certification as required."
      },
      {
        question: "How long does the process take?",
        answer: "Timeline depends on the size and complexity of the frame structure. A typical portal frame bay can be processed in 2-3 days. We can provide a detailed timeline after assessing your specific requirements."
      }
    ]
  },
  {
    id: "fire-escapes",
    title: "Fire Escapes & External Stair Towers",
    shortTitle: "Fire Escapes",
    tagline: "Specialist Shot Blasting for Fire Safety Infrastructure",
    description: "Our fire escape and external stair tower shot blasting service provides comprehensive surface preparation for emergency egress systems. We remove rust, old paint, and corrosion from fire escape structures, preparing them for protective coatings or galvanizing. Whether you're maintaining existing fire safety infrastructure or preparing new installations, our precision techniques ensure optimal corrosion protection and compliance with safety standards.",
    heroImage: "/service-fire-escapes.png",
    benefits: [
      "Removes rust and corrosion from safety-critical structures",
      "Prepares surfaces for protective coatings or galvanizing",
      "Extends the service life of fire escape systems",
      "Ensures compliance with fire safety regulations",
      "Improves structural integrity and appearance",
      "Cost-effective alternative to replacement"
    ],
    process: [
      { step: 1, title: "Safety Assessment", description: "We inspect the fire escape structure to assess condition, identify structural concerns, and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Access Planning", description: "We coordinate access arrangements and safety measures for working at height, ensuring compliance with health and safety regulations." },
      { step: 3, title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all fire escape surfaces including stairs, landings, handrails, and support structures." },
      { step: 4, title: "Quality Verification", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications for coating application." },
      { step: 5, title: "Coating Application", description: "We can coordinate protective coating application or galvanizing to ensure maximum corrosion protection and compliance with fire safety standards." }
    ],
    applications: [
      "External fire escape stairs",
      "Fire escape towers",
      "Emergency egress systems",
      "External stair structures",
      "Fire escape landings and platforms",
      "Fire escape handrails and balustrades",
      "Building evacuation systems",
      "Multi-storey fire escapes"
    ],
    caseStudies: [
      {
        title: "Commercial Building Fire Escape Restoration",
        client: "Office Building Management",
        challenge: "A 5-storey office building's external fire escape had severe corrosion, failing safety inspections. Complete refurbishment was required to meet fire safety regulations.",
        solution: "We systematically shot blasted all fire escape components, removing rust and old paint. The structure was then coated with a high-performance fire-resistant coating system.",
        result: "The fire escape passed all safety inspections and was certified for continued use, saving over 70% compared to replacement costs while ensuring full compliance with regulations.",
        image: "/service-fire-escapes.png"
      }
    ],
    faqs: [
      {
        question: "Can you work on fire escapes while the building is occupied?",
        answer: "Yes, we can coordinate work schedules to minimize disruption and maintain emergency egress routes. We work with building management to ensure alternative fire escape routes are available during refurbishment work."
      },
      {
        question: "Do you provide structural certification after blasting?",
        answer: "We can coordinate with structural engineers to provide certification as required. Our shot blasting process reveals the true condition of the steel, allowing for accurate structural assessment."
      },
      {
        question: "What coatings do you recommend for fire escapes?",
        answer: "We typically recommend intumescent fire-resistant coatings or hot-dip galvanizing for maximum corrosion protection and fire safety compliance. We can advise on the most appropriate system for your specific requirements."
      }
    ]
  },
  {
    id: "staircases",
    title: "Internal Steel Staircases, Balustrades & Handrails",
    shortTitle: "Staircases & Balustrades",
    tagline: "Precision Shot Blasting for Architectural Metalwork",
    description: "Our internal steel staircase and balustrade shot blasting service provides meticulous surface preparation for architectural metalwork. We remove rust, old paint, powder coating, and welding residue from staircases, balustrades, handrails, and decorative metalwork. Whether you're restoring heritage features or preparing new fabrications for finishing, our precision techniques ensure flawless surface preparation for powder coating, painting, or galvanizing.",
    heroImage: "/service-staircases.png",
    benefits: [
      "Removes rust, old coatings, and welding discoloration",
      "Prepares surfaces for powder coating or painting",
      "Restores architectural metalwork to original condition",
      "Suitable for heritage restoration projects",
      "Achieves consistent surface finish",
      "Preserves dimensional tolerances and fine details"
    ],
    process: [
      { step: 1, title: "Component Assessment", description: "We inspect the metalwork to assess condition, identify any delicate features, and determine appropriate blast media and pressure settings." },
      { step: 2, title: "Preparation & Masking", description: "Components are prepared for blasting. Threaded connections, bearing surfaces, and delicate features are masked or protected as required." },
      { step: 3, title: "Precision Blasting", description: "Using fine-grade blast media and controlled pressure, we carefully clean all surfaces while preserving fine details and dimensional tolerances." },
      { step: 4, title: "Quality Inspection", description: "We conduct detailed inspections to ensure all surfaces meet the required cleanliness and profile specifications for your chosen finish." },
      { step: 5, title: "Finishing Coordination", description: "Cleaned components are prepared for powder coating, painting, or other finishing processes, with timing coordinated to maintain surface cleanliness." }
    ],
    applications: [
      "Internal steel staircases",
      "Balustrades and handrails",
      "Decorative metalwork",
      "Architectural steel features",
      "Heritage staircase restoration",
      "Commercial building staircases",
      "Industrial access stairs",
      "Mezzanine staircase systems"
    ],
    caseStudies: [
      {
        title: "Heritage Building Staircase Restoration",
        client: "Listed Building Conservation",
        challenge: "A Grade II listed building required restoration of its ornate Victorian steel staircase and balustrades. Multiple layers of paint needed removal while preserving fine decorative details.",
        solution: "We used fine-grade aluminum oxide media with carefully controlled pressure to remove all paint layers while preserving the intricate metalwork details. Components were then powder coated to match the original finish.",
        result: "The staircase was restored to its original Victorian splendor, meeting conservation requirements and receiving approval from heritage authorities.",
        image: "/service-staircases.png"
      }
    ],
    faqs: [
      {
        question: "Can you blast staircases without damaging decorative details?",
        answer: "Yes, we use fine-grade blast media and carefully controlled pressure settings to clean surfaces while preserving fine details, threads, and dimensional tolerances. Our technicians are experienced in handling delicate architectural metalwork."
      },
      {
        question: "Do you remove staircases for blasting or work on-site?",
        answer: "For optimal results, we typically recommend removing components and processing them at our facility. This allows for complete coverage and better containment. However, on-site blasting can be arranged for certain applications."
      },
      {
        question: "What finishes can be applied after blasting?",
        answer: "After shot blasting, staircases and balustrades can be powder coated, wet painted, galvanized, or left with a clear protective coating. We can coordinate finishing services or provide components ready for your chosen finish."
      }
    ]
  },
  {
    id: "bridge-steelwork",
    title: "Bridge Steelwork (Girders, Crossmembers, Parapet Rails)",
    shortTitle: "Bridge Steelwork",
    tagline: "Specialist Shot Blasting for Bridge Infrastructure",
    description: "Our bridge steelwork shot blasting service provides comprehensive surface preparation for all types of bridge components including girders, crossmembers, parapet rails, and support structures. We remove rust, old coatings, and corrosion from bridge steelwork, preparing surfaces for protective coating systems that ensure long-term durability and structural integrity. Whether you're maintaining existing bridge infrastructure or preparing new fabrications, our precision techniques meet the stringent standards required for highway and railway bridge applications.",
    heroImage: "/service-bridge-steelwork.png",
    benefits: [
      "Meets highway and railway bridge coating specifications",
      "Removes rust, old coatings, and corrosion",
      "Extends bridge infrastructure lifespan",
      "Achieves SA 2.5 and SA 3 cleanliness standards",
      "Suitable for heritage bridge restoration",
      "Cost-effective alternative to bridge replacement"
    ],
    process: [
      { step: 1, title: "Structural Survey", description: "We conduct a detailed survey of the bridge steelwork to assess condition, identify structural concerns, and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Access & Safety Planning", description: "We coordinate access arrangements, traffic management, and safety measures for working on bridge structures, ensuring compliance with highway authority requirements." },
      { step: 3, title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all bridge steelwork surfaces to achieve the specified cleanliness standard." },
      { step: 4, title: "Quality Verification", description: "We conduct thorough inspections and, where required, perform surface cleanliness testing to verify compliance with bridge coating specifications." },
      { step: 5, title: "Coating Application", description: "We can coordinate protective coating application to ensure maximum corrosion protection and compliance with highway authority specifications." }
    ],
    applications: [
      "Bridge girders and beams",
      "Bridge crossmembers and bracing",
      "Parapet rails and barriers",
      "Bridge support structures",
      "Footbridge steelwork",
      "Railway bridge components",
      "Highway bridge infrastructure",
      "Heritage bridge restoration"
    ],
    caseStudies: [
      {
        title: "Highway Bridge Girder Refurbishment",
        client: "Local Highway Authority",
        challenge: "A 50-year-old highway bridge required complete refurbishment of corroded steel girders and parapet rails. The bridge needed to remain open to traffic during works.",
        solution: "We coordinated night-time closures to systematically shot blast all bridge steelwork. Components were coated with a high-performance protective system meeting highway authority specifications.",
        result: "The bridge was successfully refurbished and certified for continued use, extending its service life by an estimated 25+ years while maintaining traffic flow during the project.",
        image: "/service-bridge-steelwork.png"
      }
    ],
    faqs: [
      {
        question: "Can you work on bridges while they remain open to traffic?",
        answer: "Yes, we can coordinate work schedules with highway authorities to minimize disruption. We typically work during night-time closures or use lane closures with traffic management systems."
      },
      {
        question: "What surface preparation standards do you achieve for bridge work?",
        answer: "We routinely achieve SA 2.5 and SA 3 surface preparation to ISO 8501 standards, which are required for highway and railway bridge coating systems. We can provide certification as required by highway authorities."
      },
      {
        question: "Do you handle environmental containment for bridge blasting?",
        answer: "Yes, we implement comprehensive containment systems to capture spent blast media and debris, preventing environmental contamination of waterways or surrounding areas. We comply with all environmental regulations."
      }
    ]
  },
  {
    id: "steel-containers",
    title: "Steel Container Blasting",
    shortTitle: "Steel Containers",
    tagline: "Specialist Shot Blasting for Steel Containers & Storage Structures",
    description: "We are specialists in shot blasting services for steel containers and large storage structures. Our skilled team uses advanced blasting techniques to remove rust, old coatings, and surface contaminants from shipping containers, fuel storage tanks, and other steel units. We focus on restoring strength and preparing containers so they're ready for repainting, recoating, or long-term reuse.",
    heroImage: "/service-steel-containers.jpg",
    benefits: [
      "Removes rust, mill scale and failed coatings completely",
      "Delivers clean, profiled, coating-ready finish",
      "Extends service life of steel containers",
      "Prepares containers for repainting or long-term reuse",
      "Suitable for shipping containers, tanks, and storage structures",
      "Professional standard refurbishment"
    ],
    process: [
      { step: 1, title: "Preparation & Containment", description: "We begin with inspection and masking, then protect surrounding areas with sheeting and seals to control dust and debris. Careful planning and procedures guide every project, ensuring a controlled, compliant working environment." },
      { step: 2, title: "Precision Shot Blasting", description: "Using the correct media and pressure for the substrate, we remove corrosion and old coatings without compromising the steel. Where specified, we prepare to recognised cleanliness grades such as Sa 2½ (near-white metal) for optimum primer adhesion." },
      { step: 3, title: "Final Clean Down", description: "On completion, we carry out a meticulous clean-up: collecting residues and waste, leaving the area ready for repainting or recoating as required. This handover aligns with our emphasis on industry-leading clean downs." }
    ],
    applications: [
      "Shipping Containers",
      "Storage Tanks",
      "Refrigerated Containers",
      "Grain Silos",
      "Bulk Waste & Recycling Containers",
      "Fuel Storage Cylinders",
      "Water Storage & Slurry Tanks",
      "Aircraft Hangars",
      "Skips"
    ],
    caseStudies: [
      {
        title: "Industrial Storage Tank Refurbishment",
        client: "Manufacturing Facility",
        challenge: "A large cylindrical fuel storage tank had severe corrosion and failed coatings. Complete surface preparation was required before recoating to prevent further deterioration.",
        solution: "We systematically shot blasted the entire tank surface, removing all rust, scale and failed coatings. The tank was prepared to Sa 2½ standard for optimal coating adhesion.",
        result: "The storage tank was successfully refurbished with a clean, profiled surface ready for protective coating. The tank's service life was extended by decades, avoiding costly replacement.",
        image: "/service-steel-containers.jpg"
      }
    ],
    faqs: [
      {
        question: "What types of steel containers can you blast?",
        answer: "We can blast all types of steel containers including shipping containers, storage tanks, refrigerated units, grain silos, fuel storage cylinders, water tanks, and more. Our techniques are suitable for both standard and specialized container types."
      },
      {
        question: "Can you blast containers on-site?",
        answer: "Yes, we can provide on-site shot blasting services for large containers and storage structures that cannot be easily transported. We implement comprehensive containment systems to control dust and debris."
      },
      {
        question: "What surface preparation standard do you achieve?",
        answer: "We routinely achieve Sa 2½ (near-white metal) surface preparation to ISO 8501 standards, which provides optimal surface cleanliness and profile for protective coating systems. We can provide certification as required."
      }
    ]
  },
  {
    id: "ladders",
    title: "Fixed Ladders & Step-Over Platforms",
    shortTitle: "Ladders & Platforms",
    tagline: "Specialist Shot Blasting for Access Infrastructure",
    description: "Our fixed ladder and step-over platform shot blasting service provides comprehensive surface preparation for industrial access systems. We remove rust, old paint, and corrosion from fixed ladders, caged ladder systems, step-over platforms, and access infrastructure, preparing them for protective coatings or galvanizing. Whether you're maintaining existing access systems or preparing new installations, our precision techniques ensure optimal corrosion protection and compliance with working at height regulations.",
    heroImage: "/service-ladders.png",
    benefits: [
      "Removes rust and corrosion from safety-critical access systems",
      "Prepares surfaces for protective coatings or galvanizing",
      "Extends the service life of access infrastructure",
      "Ensures compliance with working at height regulations",
      "Improves safety of industrial access systems",
      "Cost-effective alternative to replacement"
    ],
    process: [
      { step: 1, title: "Safety Assessment", description: "We inspect the access system to assess condition, identify structural concerns, and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Component Preparation", description: "Ladder sections, platforms, and safety cages are prepared for blasting. Critical connection points and safety features are protected as required." },
      { step: 3, title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all access system surfaces including rungs, side rails, platforms, and safety cages." },
      { step: 4, title: "Quality Verification", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications for coating application." },
      { step: 5, title: "Coating & Installation", description: "Cleaned components are prepared for protective coating or galvanizing, with timing coordinated for installation and compliance with safety regulations." }
    ],
    applications: [
      "Fixed vertical ladders",
      "Caged ladder systems",
      "Step-over platforms",
      "Industrial access ladders",
      "Roof access systems",
      "Tank access ladders",
      "Building access infrastructure",
      "Offshore platform ladders"
    ],
    caseStudies: [
      {
        title: "Industrial Facility Access System Refurbishment",
        client: "Chemical Processing Plant",
        challenge: "A chemical plant required refurbishment of 15 fixed ladder systems and step-over platforms. Corrosion had compromised safety, failing health and safety inspections.",
        solution: "We systematically removed, shot blasted, and hot-dip galvanized all access system components. New safety cages were fabricated and installed to meet current regulations.",
        result: "All access systems passed health and safety inspections and were certified for continued use, ensuring full compliance with working at height regulations and extending service life by 25+ years.",
        image: "/service-ladders.png"
      }
    ],
    faqs: [
      {
        question: "Can you blast fixed ladders in situ?",
        answer: "For optimal results and to meet galvanizing specifications, we typically recommend removing ladder sections and processing them at our facility. This ensures complete coverage and the cleanliness standards required for protective treatments. On-site blasting can be arranged for coating repairs."
      },
      {
        question: "Do you provide safety certification after refurbishment?",
        answer: "We can coordinate with health and safety specialists to provide certification as required by working at height regulations. Our shot blasting process reveals the true condition of the steel, allowing for accurate safety assessment."
      },
      {
        question: "What protective coatings do you recommend for access systems?",
        answer: "We typically recommend hot-dip galvanizing for maximum corrosion protection and durability, especially for outdoor or harsh environment applications. For indoor systems, powder coating or high-performance paint systems may be appropriate. We can advise on the most suitable system for your specific requirements."
      }
    ]
  },
  {
    id: "warehouse-racking",
    title: "Warehouse Racking & Pallet Rack Frames",
    shortTitle: "Warehouse Racking",
    tagline: "Professional Shot Blasting for Storage Infrastructure",
    description: "Our specialist warehouse racking shot blasting service provides comprehensive surface preparation for pallet racking systems, storage frames, and industrial shelving. We remove rust, old powder coating, paint, and contaminants from racking components, preparing them for refinishing or galvanizing. Whether you're refurbishing existing warehouse infrastructure or preparing new racking for protective coatings, our precision techniques ensure optimal surface preparation for long-lasting durability.",
    heroImage: "/service-warehouse-racking.png",
    benefits: [
      "Complete removal of rust, old coatings, and corrosion",
      "Extends the service life of warehouse racking systems",
      "Prepares surfaces for powder coating or galvanizing",
      "Improves safety by restoring structural integrity",
      "Cost-effective alternative to replacing entire racking systems",
      "Environmentally responsible process with recyclable media"
    ],
    process: [
      { step: 1, title: "Assessment", description: "We inspect the racking components to determine the appropriate blast media, pressure settings, and surface preparation requirements for your specific system." },
      { step: 2, title: "Disassembly & Transport", description: "If required, we can coordinate the disassembly and transport of racking components to our blasting facility for optimal treatment." },
      { step: 3, title: "Shot Blasting", description: "Our skilled technicians systematically blast all racking surfaces, removing rust, old coatings, and contaminants to achieve the specified cleanliness standard." },
      { step: 4, title: "Quality Inspection", description: "We conduct thorough quality checks to ensure all surfaces meet the required profile and cleanliness specifications for coating adhesion." },
      { step: 5, title: "Finishing & Return", description: "Cleaned components are prepared for powder coating, painting, or galvanizing, and can be returned to your site ready for installation." }
    ],
    applications: [
      "Pallet racking uprights and beams",
      "Cantilever racking systems",
      "Drive-in and drive-through racking",
      "Mezzanine floor support structures",
      "Industrial shelving units",
      "Warehouse storage frames",
      "Distribution center racking",
      "Cold storage racking systems"
    ],
    caseStudies: [
      {
        title: "Distribution Center Racking Refurbishment",
        client: "National Logistics Company",
        challenge: "A 50,000 sq ft distribution center required complete refurbishment of corroded pallet racking systems. Rust and damaged powder coating compromised both safety and appearance.",
        solution: "We systematically removed, transported, and shot blasted over 200 racking components, removing all rust and old coatings. Components were then powder coated and reinstalled.",
        result: "The client saved over 60% compared to new racking replacement costs, with all components restored to like-new condition and certified safe for continued use.",
        image: "/service-warehouse-racking.png"
      }
    ],
    faqs: [
      {
        question: "Can you blast racking on-site or does it need to be removed?",
        answer: "For optimal results, we typically recommend removing racking components and transporting them to our facility. This allows for complete 360-degree coverage and better containment of blast media. However, for certain situations, on-site blasting can be arranged."
      },
      {
        question: "How long does the warehouse racking blasting process take?",
        answer: "Timeline depends on the quantity and condition of components. A typical pallet racking bay (2 uprights and 4 beams) can be processed in 1-2 days. We can provide a detailed timeline after assessing your specific requirements."
      },
      {
        question: "Will shot blasting damage the structural integrity of the racking?",
        answer: "No, when performed correctly by trained professionals, shot blasting actually reveals the true condition of the metal and prepares it for protective coatings that enhance longevity. We use appropriate blast media and pressure settings to clean without damaging the substrate."
      },
      {
        question: "Can you coordinate powder coating after blasting?",
        answer: "Yes, we work with trusted powder coating partners and can arrange complete refurbishment services including blasting, coating, and reinstallation of your warehouse racking systems."
      }
    ]
  },
  {
    id: "pipework",
    title: "Process Pipework, Spools & Manifolds",
    shortTitle: "Process Pipework",
    tagline: "Precision Cleaning for Industrial Pipework Systems",
    description: "Our specialized pipework shot blasting service delivers exceptional surface preparation for industrial process pipework, spools, manifolds, and piping systems. We provide precision cleaning that meets the stringent cleanliness standards required by food processing, pharmaceutical, chemical, and other regulated industries. Our techniques remove mill scale, rust, weld discoloration, and contaminants while preserving the integrity of critical pipework components, preparing them for protective coatings, galvanizing, or direct use in hygienic applications.",
    heroImage: "/service-pipework.png",
    benefits: [
      "Meets stringent cleanliness standards for regulated industries",
      "Removes mill scale, rust, and weld discoloration",
      "Prepares surfaces for stainless steel passivation",
      "Suitable for food-grade and pharmaceutical applications",
      "Preserves dimensional tolerances and surface integrity",
      "Faster and more consistent than manual cleaning methods"
    ],
    process: [
      { step: 1, title: "Specification Review", description: "We review your cleanliness requirements, material specifications, and industry standards to determine the appropriate blast media and process parameters." },
      { step: 2, title: "Component Preparation", description: "Pipework components are inspected, masked if necessary, and positioned for optimal blast coverage while protecting threaded connections and critical surfaces." },
      { step: 3, title: "Precision Blasting", description: "Using fine-grade blast media and controlled pressure, we systematically clean all pipework surfaces to achieve the specified cleanliness level without damaging the substrate." },
      { step: 4, title: "Cleanliness Verification", description: "We conduct thorough inspections and, where required, perform cleanliness testing to verify compliance with industry standards such as ISO 8501 or SSPC specifications." },
      { step: 5, title: "Packaging & Delivery", description: "Cleaned components are carefully packaged to maintain cleanliness during transport and delivered ready for installation or further processing." }
    ],
    applications: [
      "Food processing pipework and spools",
      "Pharmaceutical process piping",
      "Chemical plant manifolds and headers",
      "Dairy industry stainless steel pipework",
      "Brewery and beverage processing pipes",
      "Hygienic process equipment",
      "Oil and gas pipeline spools",
      "Water treatment system pipework"
    ],
    caseStudies: [
      {
        title: "Food Processing Plant Pipework Upgrade",
        client: "International Food Manufacturer",
        challenge: "A food processing facility required shot blasting of 150 stainless steel pipe spools and manifolds to meet stringent hygiene standards before installation in a new production line.",
        solution: "We processed all components using fine-grade aluminum oxide media, achieving SA 2.5 cleanliness standard. Each component was inspected and certified to meet food-grade requirements.",
        result: "All pipework passed third-party hygiene audits and was successfully installed, meeting project deadlines and enabling the facility to achieve BRC certification.",
        image: "/service-pipework.png"
      }
    ],
    faqs: [
      {
        question: "What cleanliness standards can you achieve for pipework?",
        answer: "We can achieve various cleanliness standards including SA 2.5, SA 3, and specific industry requirements for food-grade, pharmaceutical, and chemical applications. We work to ISO 8501, SSPC, and other internationally recognized standards."
      },
      {
        question: "Can you blast stainless steel pipework without damaging it?",
        answer: "Yes, we use appropriate blast media such as aluminum oxide or glass bead, combined with controlled pressure settings, to clean stainless steel without embedding contaminants or damaging the passive layer. We can also coordinate passivation services after blasting."
      },
      {
        question: "Do you provide certification for food-grade or pharmaceutical pipework?",
        answer: "Yes, we can provide material certificates, process documentation, and cleanliness certification as required for regulated industries. We maintain full traceability and quality records for all processed components."
      },
      {
        question: "What size pipework can you accommodate?",
        answer: "We can process pipework ranging from small bore (1/2 inch) up to large diameter pipes and manifolds. Our facility can accommodate spools up to 6 meters in length. Contact us to discuss your specific requirements."
      }
    ]
  },
  {
    id: "telecom-towers",
    title: "Telecom Masts & Lattice Towers",
    shortTitle: "Telecom Towers",
    tagline: "Specialist Shot Blasting for Telecommunications Infrastructure",
    description: "Our specialist telecommunications tower shot blasting service provides comprehensive surface preparation for telecom masts, lattice towers, antenna supports, and associated infrastructure. We remove rust, old galvanizing, paint, and corrosion from tower components, preparing them for hot-dip galvanizing, protective coatings, or structural repairs. Whether you're refurbishing existing telecommunications infrastructure or preparing new tower sections for protective treatments, our precision techniques ensure optimal surface preparation for maximum corrosion protection and extended service life.",
    heroImage: "/service-telecom-tower.png",
    benefits: [
      "Prepares surfaces for hot-dip galvanizing",
      "Removes rust, old coatings, and corrosion",
      "Extends the service life of telecommunications infrastructure",
      "Meets specifications for structural steel preparation",
      "Improves coating adhesion and corrosion protection",
      "Cost-effective refurbishment alternative to tower replacement"
    ],
    process: [
      { step: 1, title: "Structural Assessment", description: "We inspect tower components to assess condition, determine appropriate blast media, and identify any structural concerns that may require attention before coating." },
      { step: 2, title: "Component Preparation", description: "Tower sections, legs, bracing members, and mounting brackets are prepared for blasting. Critical areas such as bolt holes and connection points are protected as required." },
      { step: 3, title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all tower surfaces to achieve the specified cleanliness standard, typically SA 2.5 or SA 3 for galvanizing." },
      { step: 4, title: "Quality Verification", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications for galvanizing or coating application." },
      { step: 5, title: "Galvanizing Coordination", description: "Cleaned components are transported to galvanizing facilities or coating applicators, with timing coordinated to minimize surface oxidation before treatment." }
    ],
    applications: [
      "Telecommunications lattice towers",
      "Monopole mast sections",
      "Guyed tower components",
      "Antenna mounting brackets and platforms",
      "Tower leg sections and bracing members",
      "Microwave dish support structures",
      "Tower foundation anchor bolts",
      "Climbing ladder and safety systems"
    ],
    caseStudies: [
      {
        title: "Regional Telecom Tower Refurbishment Program",
        client: "National Telecommunications Provider",
        challenge: "A telecommunications company required refurbishment of 25 lattice towers across the region. Corrosion had compromised the existing galvanized coating, and structural assessments mandated complete re-galvanizing.",
        solution: "We systematically dismantled, transported, and shot blasted all tower components, removing rust and old galvanizing. Components were then hot-dip galvanized and reinstalled with upgraded mounting hardware.",
        result: "All 25 towers were successfully refurbished and certified for continued service, extending their operational life by an estimated 25+ years and ensuring compliance with structural safety standards.",
        image: "/service-telecom-tower.png"
      }
    ],
    faqs: [
      {
        question: "Can you blast telecommunications towers on-site?",
        answer: "For optimal results and to meet galvanizing specifications, we typically recommend removing tower components and processing them at our facility. This ensures complete coverage and the cleanliness standards required for hot-dip galvanizing. On-site blasting can be arranged for coating repairs but may not meet galvanizing specifications."
      },
      {
        question: "What surface preparation standard is required for galvanizing?",
        answer: "Hot-dip galvanizing typically requires SA 2.5 or SA 3 surface preparation to ISO 8501 standards. We routinely achieve these specifications and can provide certification as required by galvanizing facilities."
      },
      {
        question: "How do you handle the logistics of tower dismantling and transport?",
        answer: "We can coordinate with specialist tower erection companies to handle dismantling, transport, and reinstallation. Alternatively, if you have your own contractors, we can work with them to ensure smooth coordination of the refurbishment process."
      },
      {
        question: "Can you blast tower components that have been previously galvanized?",
        answer: "Yes, we can remove old galvanizing, rust, and corrosion from previously galvanized components, preparing them for re-galvanizing. This is a common requirement for tower refurbishment projects where the original galvanizing has deteriorated."
      }
    ]
  }
];

export function getServiceById(id: string): ServiceData | undefined {
  return services.find(service => service.id === id);
}
