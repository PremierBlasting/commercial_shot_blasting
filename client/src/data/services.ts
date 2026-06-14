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
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/nSiMtaICoFPZGPZV.png",
    benefits: [
      "Complete removal of mill scale and rust",
      "Prepares surfaces for galvanizing or protective coatings",
      "Extends structural steel lifespan",
      
      "Suitable for new fabrications and refurbishment projects",
      
    ],
    process: [
      { step: 1, title: "Structural Assessment", description: "We inspect the steel frame components to determine the correct grade of iron silicate media, pressure settings, and surface preparation requirements for your coating specification." },
      { step: 2, title: "Component Preparation", description: "Frame sections are positioned for optimal blast coverage. Critical areas such as bolt holes and connection points are protected as required." },
      { step: 3, title: "Iron Silicate Blasting", description: "We use premium iron silicate (copper slag) media — a high-density, angular abrasive that delivers a consistent Sa 2.5 cleanliness grade and a sharp Rz 50–75 μm anchor profile on every pass. Its hardness and angular shape make it ideal for cutting through mill scale and welding residue on structural steel, achieving the profile depth required by leading coating systems in a single operation." },
      { step: 4, title: "Quality Inspection", description: "We conduct thorough inspections using Elcometer profile gauges and visual cleanliness comparators to confirm all surfaces meet the required Sa 2.5 cleanliness and profile specifications." },
      { step: 5, title: "Coating Coordination", description: "Cleaned components are prepared for galvanizing, powder coating, or painting, with timing coordinated to minimise flash rusting. Iron silicate's low soluble salt content means the blasted surface remains stable longer than with many alternative media." }
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
        title: "Commercial Building Structural Steel Frame Restoration",
        client: "Commercial Property Developer",
        challenge: "This commercial building project required comprehensive shot blasting of extensive structural steel roof trusses and load-bearing frames throughout the interior space. The steel frames had mill scale, welding residue, and surface contaminants that needed complete removal to achieve professional cleanliness for protective coating application. The project demanded precision work in an active construction environment with strict quality requirements for the subsequent coating system.",
        solution: "We mobilised our specialist structural steelwork team to the site with full containment and access equipment. Working systematically across the entire ceiling and structural framework, we used controlled shot blasting techniques to remove all mill scale, welding residue, rust, and surface contaminants from the complex truss systems and frame members. Our precision approach ensured complete coverage of all surfaces including connection points, welds, and hard-to-reach areas within the lattice truss structure. The project was completed in phases to coordinate with the construction schedule, maintaining the specified surface cleanliness throughout.",
        result: "The structural steel frames were transformed from mill-finished condition with surface contaminants to uniform, clean bare metal surfaces achieving professional cleanliness for protective coating. All truss members, frame sections, and connection points achieved consistent surface preparation across hundreds of linear metres of structural steelwork. The client received a perfectly prepared substrate that ensured optimal adhesion for the protective coating system, enabling the construction schedule to proceed without delay. The comprehensive surface preparation will provide decades of corrosion protection for this critical structural framework.",
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/ALLMpYyafQuXmsrE.jpg"
      }
    ],
    faqs: [
      {
        question: "Can you blast structural steel frames on-site?",
        answer: "Yes, we provide mobile shot blasting services and can work at your premises. For components requiring galvanizing, we ensure complete coverage and professional cleanliness for protective treatments. We coordinate timing with your galvanizing schedule to prevent surface oxidation."
      },

      {
        question: "How long does the process take?",
        answer: "Timeline depends on the size and complexity of the frame structure. A typical portal frame bay can be processed in 2-3 days. We can provide a detailed timeline after assessing your specific requirements."
      }
    ]
  },

  {
    id: "steel-containers",
    title: "Steel Container Blasting",
    shortTitle: "Steel Containers",
    tagline: "Specialist Shot Blasting for Steel Containers & Storage Structures",
    description: "We are specialists in shot blasting services for steel containers and large storage structures. Our skilled team uses advanced blasting techniques to remove rust, old coatings, and surface contaminants from shipping containers, fuel storage tanks, and other steel units. We focus on restoring strength and preparing containers so they're ready for repainting, recoating, or long-term reuse.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/nHsjfdNjoJYDWZxV.png",
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
      { step: 2, title: "Precision Shot Blasting", description: "Using the correct media and pressure for the substrate, we remove corrosion and old coatings without compromising the steel. Where specified, we prepare to recognised cleanliness grades such as professional cleanliness (near-white metal) for optimum primer adhesion." },
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
        solution: "We systematically shot blasted the entire tank surface, removing all rust, scale and failed coatings. The tank was prepared to professional cleanliness standard for optimal coating adhesion.",
        result: "The storage tank was successfully refurbished with a clean, profiled surface ready for protective coating. The tank's service life was extended by decades, avoiding costly replacement.",
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/NufEGVSVxhqcfzPL.jpg"
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
      }
    ]
  },

  {
    id: "factory-cladding",
    title: "Factory & Warehouse Cladding",
    shortTitle: "Factory & Warehouse Cladding",
    tagline: "Professional Cladding Surface Restoration",
    description: "Specialist shot blasting for factory and industrial cladding panels. We remove original plastisol, multiple layers of paint, rust, and weathering from metal cladding to restore surfaces to bare metal condition. Our precision techniques preserve the integrity of cladding panels while creating flawless surfaces ready for new protective coatings, extending the life of your building envelope.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yVumYDLwbpQLmIoD.png",
    benefits: [
      "Complete removal of plastisol and paint layers",
      "Preserves cladding panel integrity",
      "Prepares surfaces for long-lasting recoating",
      "More cost-effective than cladding replacement",
      "Minimal disruption to facility operations",
      "Extends building envelope lifespan"
    ],
    process: [
      { step: 1, title: "Site Assessment", description: "We assess cladding condition, coating types, and access requirements to plan the most effective blasting approach." },
      { step: 2, title: "Area Protection", description: "Work zones are contained and protected to control blast media and prevent contamination of surrounding areas." },
      { step: 3, title: "Controlled Blasting", description: "Using appropriate pressure and media, we systematically remove all coatings while preserving the cladding substrate." },
      { step: 4, title: "Surface Inspection", description: "Cleaned panels are inspected to ensure complete coating removal and proper surface profile for recoating." },
      { step: 5, title: "Coating Coordination", description: "Surfaces are prepared for immediate recoating to prevent oxidation and ensure optimal coating performance." }
    ],
    applications: [
      "Factory wall cladding",
      "Warehouse exterior panels",
      "Industrial building facades",
      "Commercial property cladding",
      "Agricultural building cladding",
      "Storage facility exteriors",
      "Manufacturing plant cladding",
      "Distribution center facades"
    ],
    caseStudies: [
      {
        title: "Industrial Warehouse Cladding Restoration",
        client: "Manufacturing Facility Owner",
        challenge: "This industrial warehouse had severely deteriorated cladding with original plastisol coating and multiple layers of paint that had failed over decades of exposure. The rust-coloured panels showed extensive peeling, corrosion, and weathering across hundreds of square metres. The client needed complete restoration to bare metal to prepare for a new protective coating system, but replacement would have been prohibitively expensive and caused major operational disruption.",
        solution: "We mobilised our specialist cladding blasting team to the site with full containment systems. Working systematically across the building envelope, we used controlled shot blasting techniques to remove all plastisol, paint layers, rust, and surface contaminants while preserving the structural integrity of the thin metal panels. Our precision approach ensured complete coating removal without damaging the substrate. The project was completed in phases to minimise disruption to the client's ongoing operations, with comprehensive dust control and waste management throughout.",
        result: "The warehouse cladding was transformed from severely deteriorated rust-coloured panels to clean, uniform bare metal surfaces ready for recoating. All plastisol and paint layers were completely removed, revealing sound substrate throughout. The client achieved a like-new surface finish at a fraction of the cost of panel replacement, extending the building envelope's service life by decades. The flawless preparation ensured optimal adhesion for the subsequent coating system, and the client was able to maintain operations throughout the project with minimal disruption.",
        image: "/factory-cladding-before-1.jpeg"
      }
    ],
    faqs: [
      {
        question: "Can you blast cladding in place?",
        answer: "Yes, we can blast cladding panels while installed on buildings using specialized containment and access equipment, minimizing disruption to your operations."
      },
      {
        question: "Will shot blasting damage thin cladding panels?",
        answer: "No. Our experienced technicians use controlled pressure and appropriate blast media to remove coatings without damaging the underlying metal panels."
      },
      {
        question: "How long before cladding needs recoating after blasting?",
        answer: "We coordinate closely with coating contractors to apply new coatings within 24-48 hours of blasting to prevent surface oxidation and ensure optimal adhesion."
      }
    ]
  },

  {
    id: "fire-escapes",
    title: "Fire Escapes & External Stair Towers",
    shortTitle: "Fire Escapes",
    tagline: "Specialist Shot Blasting for Fire Safety Infrastructure",
    description: "Our fire escape and external stair tower shot blasting service provides comprehensive surface preparation for emergency egress systems. We remove rust, old paint, and corrosion from fire escape structures, preparing them for protective coatings or galvanizing. Whether you're maintaining existing fire safety infrastructure or preparing new installations, our precision techniques ensure optimal corrosion protection and compliance with safety standards.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/SeWATNKMkdYyhiJa.png",
    benefits: [
      "Removes rust and corrosion from safety-critical structures",
      "Prepares surfaces for protective coatings or galvanizing",
      "Extends the service life of fire escape systems",
      "Ensures fire safety requirements",
      "Improves structural integrity and appearance",
      "Cost-effective alternative to replacement"
    ],
    process: [
      { step: 1, title: "Safety Assessment", description: "We inspect the fire escape structure to assess condition, identify structural concerns, and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Access Planning", description: "We coordinate access arrangements and safety measures for working at height, ensuring health and safety practices." },
      { step: 3, title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all fire escape surfaces including stairs, landings, handrails, and support structures." },
      { step: 4, title: "Quality Verification", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications for coating application." },
      { step: 5, title: "Coating Application", description: "We can coordinate protective coating application or galvanizing to ensure maximum corrosion protection and fire safety requirements." }
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
        result: "The fire escape passed all safety inspections and was approved for continued use, saving over 70% compared to replacement costs while ensuring professional service delivery.",
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/SeWATNKMkdYyhiJa.png"
      }
    ],
    faqs: [
      {
        question: "Can you work on fire escapes while the building is occupied?",
        answer: "Yes, we can coordinate work schedules to minimize disruption and maintain emergency egress routes. We work with building management to ensure alternative fire escape routes are available during refurbishment work."
      },
      {
        question: "Do you provide structural assessment after blasting?",
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
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/PQfVowXZcgLOUIdi.png",
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
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/PQfVowXZcgLOUIdi.png"
      }
    ],
    faqs: [
      {
        question: "Can you blast staircases without damaging decorative details?",
        answer: "Yes, we use fine-grade blast media and carefully controlled pressure settings to clean surfaces while preserving fine details, threads, and dimensional tolerances. Our technicians are experienced in handling delicate architectural metalwork."
      },
      {
        question: "Do you remove staircases for blasting or work on-site?",
        answer: "Yes, we provide mobile shot blasting services and work at your premises. We can blast fire escapes in situ or coordinate with you if components need to be removed for access. Our mobile units are equipped for complete coverage and proper containment of blast media."
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
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/aSPBSnphMeAtqixs.png",
    benefits: [
      "Meets highway and railway bridge coating specifications",
      "Removes rust, old coatings, and corrosion",
      "Extends bridge infrastructure lifespan",
      
      "Suitable for heritage bridge restoration",
      "Cost-effective alternative to bridge replacement"
    ],
    process: [
      { step: 1, title: "Structural Survey", description: "We conduct a detailed survey of the bridge steelwork to assess condition, identify structural concerns, and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Access & Safety Planning", description: "We coordinate access arrangements, traffic management, and safety measures for working on bridge structures, ensuring highway authority coordination." },
      { step: 3, title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all bridge steelwork surfaces to achieve professional cleanliness." },
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
        result: "The bridge was successfully refurbished and approved for continued use, extending its service life by an estimated 25+ years while maintaining traffic flow during the project.",
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/aSPBSnphMeAtqixs.png"
      }
    ],
    faqs: [
      {
        question: "Can you work on bridges while they remain open to traffic?",
        answer: "Yes, we can coordinate work schedules with highway authorities to minimize disruption. We typically work during night-time closures or use lane closures with traffic management systems."
      },
      {
        question: "What surface preparation standards do you achieve for bridge work?",
        answer: "We routinely achieve professional cleanliness and SA 3 surface preparation to industry standards, which are required for highway and railway bridge coating systems. We can provide certification as required by highway authorities."
      },
      {
        question: "Do you handle environmental containment for bridge blasting?",
        answer: "Yes, we implement comprehensive containment systems to capture spent blast media and debris, preventing environmental contamination of waterways or surrounding areas. We comply with all waste management practices."
      }
    ]
  },

  {
    id: "ladders",
    title: "Fixed Ladders & Step-Over Platforms",
    shortTitle: "Ladders & Platforms",
    tagline: "Specialist Shot Blasting for Access Infrastructure",
    description: "Our fixed ladder and step-over platform shot blasting service provides comprehensive surface preparation for industrial access systems. We remove rust, old paint, and corrosion from fixed ladders, caged ladder systems, step-over platforms, and access infrastructure, preparing them for protective coatings or galvanizing. Whether you're maintaining existing access systems or preparing new installations, our precision techniques ensure optimal corrosion protection and compliance with working at height regulations.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/JoSDDMptJnCSIGCd.png",
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
        result: "All access systems passed health and safety inspections and were approved for continued use, ensuring full compliance with working at height regulations and extending service life by 25+ years.",
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/JoSDDMptJnCSIGCd.png"
      }
    ],
    faqs: [
      {
        question: "Can you blast fixed ladders in situ?",
        answer: "Yes, we provide mobile shot blasting services at your location. For ladders requiring galvanizing, we ensure complete coverage and cleanliness. We can work with ladders in situ or coordinate if sections need removal for access."
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
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/SNBtxexdCjwaWaCm.png",
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
      { step: 2, title: "Disassembly & Preparation", description: "If required, we can coordinate the disassembly of racking components at your premises to ensure optimal access for mobile blasting treatment." },
      { step: 3, title: "Shot Blasting", description: "Our skilled technicians systematically blast all racking surfaces, removing rust, old coatings, and contaminants to achieve professional cleanliness." },
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
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/SNBtxexdCjwaWaCm.png"
      }
    ],
    faqs: [
      {
        question: "Can you blast racking on-site or does it need to be removed?",
        answer: "Yes, we provide mobile shot blasting services at your warehouse location. We can blast racking in situ or coordinate disassembly if needed for optimal access. Our mobile units ensure complete coverage and proper containment of blast media on-site."
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
    description: "Our specialized pipework shot blasting service delivers exceptional surface preparation for industrial process pipework, spools, manifolds, and piping systems. We provide precision cleaning that meets the stringent cleanliness levels required by food processing, pharmaceutical, chemical, and other regulated industries. Our techniques remove mill scale, rust, weld discoloration, and contaminants while preserving the integrity of critical pipework components, preparing them for protective coatings, galvanizing, or direct use in hygienic applications.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oiPekUximBYJaYdg.png",
    benefits: [
      "Meets stringent cleanliness levels for regulated industries",
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
      { step: 4, title: "Cleanliness Verification", description: "We conduct thorough inspections to ensure optimal surface cleanliness and preparation quality." },
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
        solution: "We processed all components using fine-grade aluminum oxide media to achieve optimal cleanliness. Each component was thoroughly inspected to meet food-grade requirements.",
        result: "All pipework passed third-party hygiene audits and was successfully installed, meeting project deadlines and enabling the facility to achieve BRC certification.",
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oiPekUximBYJaYdg.png"
      }
    ],
    faqs: [
      {
        question: "What cleanliness levels can you achieve for pipework?",
        answer: "We achieve high cleanliness levels suitable for food-grade, pharmaceutical, and chemical applications, meeting specific industry requirements for each sector."
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
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/pxHOyrIfKtbDUiJd.png",
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
      { step: 3, title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all tower surfaces to achieve optimal cleanliness for galvanizing or coating applications." },
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
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/pxHOyrIfKtbDUiJd.png"
      }
    ],
    faqs: [
      {
        question: "Can you blast telecommunications towers on-site?",
        answer: "Yes, we provide mobile shot blasting services for telecom towers at your site. For components requiring galvanizing, we ensure professional cleanliness for hot-dip galvanizing. We coordinate timing with galvanizing schedules to maintain surface quality."
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
  },

  {
    id: "floor-preparation",
    title: "Floor Preparation & Shot Blasting",
    shortTitle: "Floor Preparation",
    tagline: "Professional Floor Surface Preparation",
    description: "Specialist shot blasting services for floor preparation across commercial and industrial facilities. We employ robust and efficient shot blasting techniques to ensure your floor surfaces are aesthetically enhanced and substantially strengthened. Whether removing paint, tar, epoxy coatings, or preparing concrete for new treatments, shot blasting is the most time and cost-efficient method to bring surfaces back to their original form.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/dKDRcsOFCfGolHmY.jpg",
    benefits: [
      "Complete coating removal from concrete floors",
      "Creates ideal surface profile for new coatings",
      "Removes laitance from power-floated concrete",
      "Time and cost-efficient preparation method",
      "Suitable for car parks, warehouses, and industrial floors",
      "Minimal disruption to operations"
    ],
    process: [
      { step: 1, title: "Pre-Work Preparation", description: "We contain the work area by sheeting floors and sealing doorways and cracks to protect surrounding areas and control dust." },
      { step: 2, title: "Precision Blasting", description: "Using controlled low-pressure shot blasting, we remove unwanted coatings and reveal the original surface characteristics with precision." },
      { step: 3, title: "Surface Profiling", description: "The blasting process creates the optimal surface texture for maximum adhesion of subsequent coatings or treatments." },
      { step: 4, title: "Complete Cleanup", description: "We perform thorough cleanup, removing all waste materials and leaving your facility clean and ready for the next phase." }
    ],
    applications: [
      "Asphalt surface re-texturing",
      "Bridge laitance removal",
      "Car park decking preparation",
      "Cleaning and texturing old concrete",
      "Paint removal from concrete floors",
      "Epoxy coating removal",
      "Power-floated concrete preparation",
      "Warehouse floor refurbishment"
    ],
    caseStudies: [],
    faqs: [
      {
        question: "What types of floor coatings can be removed?",
        answer: "Our shot blasting equipment can remove virtually any floor coating including paint, epoxy, tar, adhesives, and surface laitance from concrete floors."
      },
      {
        question: "How long does floor preparation take?",
        answer: "Project duration depends on floor area and coating thickness. Most commercial floors can be prepared at 100-300 square meters per day."
      },
      {
        question: "Will shot blasting damage my concrete floor?",
        answer: "No. When performed correctly by trained professionals, shot blasting removes only the surface coating and creates beneficial texture for new coatings without damaging the concrete substrate."
      }
    ]
  },

  {
    id: "powder-coating",
    title: "Shot Blasting & Powder Coating",
    shortTitle: "Powder Coating",
    tagline: "End-to-End Metal Surface Solutions",
    description: "Complete metal surface preparation and powder coating service for commercial and industrial applications. We combine high-pressure shot blasting with premium powder coating application in one seamless process. Our integrated approach ensures metal surfaces are thoroughly cleaned, properly prepared, and finished with durable protective coatings—all handled by one team for consistent quality and faster turnaround.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/vKfGBQBrevERnqiq.jpg",
    benefits: [
      "Single-source accountability for preparation and coating",
      "No flash rust between blasting and coating",
      "Superior coating adhesion and longevity",
      "Faster project completion with integrated service",
      "Highly resistant to moisture, chemicals, and abrasion",
      "Professional finish with uniform appearance"
    ],
    process: [
      { step: 1, title: "Meticulous Preparation", description: "We contain and protect your site, then use abrasive blasting to strip away old paint, rust, and contaminants, creating the perfect texture for coating adhesion." },
      { step: 2, title: "High-Performance Coating", description: "Immediately after preparation, we apply premium powder coating that bonds firmly to the metal surface, preventing flash rust and ensuring maximum durability." },
      { step: 3, title: "Curing Process", description: "The powder coating is professionally cured to create a tough, uniform finish that resists weathering, corrosion, and wear." },
      { step: 4, title: "Hassle-Free Completion", description: "We handle cleanup and leave your premises tidy with a superior powder-coated finish ready for immediate use." }
    ],
    applications: [
      "Structural steel frame preparation",
      "Warehouse and factory cladding",
      "Machinery and equipment refurbishment",
      "Staircases, railings, and balustrades",
      "Storage tanks and fabrications",
      "Metal components for assembly",
      "Workshop floor equipment",
      "Commercial building facades"
    ],
    caseStudies: [],
    faqs: [
      {
        question: "Why combine shot blasting with powder coating?",
        answer: "Integrating both services eliminates the risk of flash rust between preparation and coating, ensures optimal surface profile for adhesion, and provides single-source accountability with faster turnaround."
      },
      {
        question: "What metals can be powder coated?",
        answer: "We can powder coat most metals including steel, stainless steel, aluminum, and galvanized surfaces after proper shot blasting preparation."
      },
      {
        question: "How durable is powder coating?",
        answer: "When applied over properly shot-blasted surfaces, powder coating provides exceptional durability, typically lasting 15-20 years outdoors and even longer in protected environments."
      }
    ]
  },

  {
    id: "commercial-radiators",
    title: "Commercial Radiators Shot Blasting",
    shortTitle: "Commercial Radiators",
    tagline: "Professional Restoration for Cast Iron & Steel Radiators",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/LvQweigMYtevByUq.png",
    description: "Our commercial radiators shot blasting service provides comprehensive restoration for cast iron and steel radiators in commercial buildings, heritage properties, and industrial facilities. We remove decades of paint buildup, rust, and corrosion from traditional column radiators, revealing the original cast iron or steel surface ready for modern powder coating or specialist finishes. Whether you're refurbishing period radiators for heritage projects or restoring commercial heating systems, our precision techniques preserve the integrity of these valuable heating assets while achieving optimal surface preparation.",
    benefits: [
      "Complete removal of multiple paint layers without damage",
      "Preservation of original cast iron details and manufacturer markings",
      "Preparation for powder coating or specialist radiator finishes",
      "Restoration of radiators to original appearance",
      "Extension of radiator lifespan by decades",
      "Cost-effective alternative to replacement",
      "Suitable for heritage and modern commercial radiators",
      "Environmentally responsible restoration process"
    ],
    process: [
      {
        step: 1,
        title: "Radiator Assessment",
        description: "We inspect each radiator to assess condition, identify material type (cast iron or steel), and determine appropriate blast media for safe restoration."
      },
      {
        step: 2,
        title: "Valve & Fitting Protection",
        description: "Threaded connections, valve seats, and critical fittings are masked or protected to preserve functionality during blasting."
      },
      {
        step: 3,
        title: "Controlled Shot Blasting",
        description: "Using carefully selected media and pressure settings, we systematically remove all paint layers, rust, and corrosion from radiator surfaces."
      },
      {
        step: 4,
        title: "Internal Cleaning",
        description: "For radiators requiring internal restoration, we can clean internal waterways to remove sludge and scale buildup."
      },
      {
        step: 5,
        title: "Detail Cleaning",
        description: "Meticulous cleaning of ornate details, manufacturer badges, and decorative features to preserve heritage value."
      },
      {
        step: 6,
        title: "Quality Verification",
        description: "Thorough inspection to ensure complete paint removal and optimal surface preparation for coating application."
      },
      {
        step: 7,
        title: "Coating Coordination",
        description: "Prepared radiators are ready for immediate powder coating or specialist radiator finishes to prevent flash rusting."
      }
    ],
    applications: [
      "Victorian cast iron column radiators",
      "Commercial building heating systems",
      "Heritage property radiator restoration",
      "School and hospital radiators",
      "Industrial facility heating equipment",
      "Period property refurbishment projects",
      "Architectural salvage radiators",
      "Listed building heating systems"
    ],
    caseStudies: [
      {
        title: "Heritage Building Radiator Restoration",
        client: "Period Property Refurbishment",
        challenge: "A heritage building refurbishment project required restoration of 45 original Victorian cast iron radiators. Decades of paint buildup obscured the decorative details, and many radiators had surface rust. The client required complete restoration while preserving the heritage value and manufacturer markings.",
        solution: "We systematically shot blasted all 45 radiators using controlled techniques to remove multiple paint layers without damaging the cast iron. Threaded connections were protected, and ornate details were carefully preserved. Each radiator was then powder coated in a period-appropriate finish.",
        result: "All radiators were successfully restored to their original appearance, preserving heritage features while providing modern corrosion protection. The restored radiators passed building conservation approval and were reinstalled as functional heating elements, extending their service life by an estimated 50+ years.",
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/phhZwdogYRWkuBVh.jpg"
      }
    ],
    faqs: [
      {
        question: "Can you blast cast iron radiators without damaging them?",
        answer: "Yes, we use appropriate blast media and controlled pressure settings specifically for cast iron. Our technicians are experienced in preserving the integrity of cast iron while removing paint and rust. We protect threaded connections and valve seats during the process."
      },
      {
        question: "How many paint layers can you remove?",
        answer: "We can remove virtually unlimited paint layers. Many heritage radiators have 10-20 layers of paint accumulated over a century. Our shot blasting process efficiently removes all layers while preserving the original cast iron surface and decorative details."
      },
      {
        question: "Do you offer powder coating after shot blasting?",
        answer: "Yes, we work with specialist radiator coating partners and can arrange complete refurbishment services including blasting, powder coating in period-appropriate or modern colors, and pressure testing before reinstallation."
      },
      {
        question: "Can you restore radiators that are still installed?",
        answer: "For best results, radiators should be removed from the property for workshop-based shot blasting. This ensures complete coverage, protects surrounding areas, and allows for thorough inspection and coating. We can coordinate with heating engineers for removal and reinstallation."
      }
    ]
  },

  {
    id: "commercial-vehicles",
    title: "Commercial & Agricultural Vehicle Shot Blasting",
    shortTitle: "Commercial Vehicles",
    tagline: "Heavy-Duty Restoration for Farm & Warehouse Vehicles",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yJlYnuHtamYTiiOv.jpg",
    description: "Our commercial and agricultural vehicle shot blasting service provides comprehensive restoration for heavy-duty trucks, farm machinery, warehouse vehicles, and industrial transport equipment. We specialize in large-scale vehicle chassis, wheels, and body panels for commercial operations. Whether you're restoring vintage farm trucks, refurbishing warehouse forklifts, or maintaining fleet vehicles, our industrial-grade shot blasting removes decades of corrosion, paint, and contamination to prepare vehicles for protective coatings and extended service life.",
    benefits: [
      "Complete chassis and body panel restoration",
      "Removal of heavy corrosion and multiple paint layers",
      "Preparation for commercial-grade protective coatings",
      "Extension of vehicle service life by decades",
      "Cost-effective alternative to vehicle replacement",
      "Suitable for farm, warehouse, and industrial vehicles",
      "Restoration of vintage commercial vehicles",
      "Professional finish for fleet refurbishment"
    ],
    process: [
      {
        step: 1,
        title: "Vehicle Assessment",
        description: "Comprehensive inspection of vehicle condition, chassis integrity, and component identification to determine optimal blast approach."
      },
      {
        step: 2,
        title: "Component Disassembly",
        description: "Removal of sensitive components, electrical systems, and mechanical parts that require protection during blasting."
      },
      {
        step: 3,
        title: "Heavy-Duty Shot Blasting",
        description: "Systematic blasting of chassis, body panels, and wheels using industrial-grade media to remove all corrosion, paint, and contamination."
      },
      {
        step: 4,
        title: "Detailed Cleaning",
        description: "Thorough cleaning of hard-to-reach areas, joints, and structural members to ensure complete surface preparation."
      },
      {
        step: 5,
        title: "Surface Profiling",
        description: "Achievement of optimal surface profile for maximum coating adhesion and long-term protection in harsh operating environments."
      },
      {
        step: 6,
        title: "Quality Verification",
        description: "Comprehensive inspection of all blasted surfaces to ensure uniform cleanliness and preparation standards before coating."
      }
    ],
    applications: [
      "Farm trucks and agricultural vehicles",
      "Warehouse forklifts and material handlers",
      "Commercial delivery trucks",
      "Industrial transport vehicles",
      "Vintage commercial vehicle restoration",
      "Fleet vehicle refurbishment",
      "Heavy-duty trailer chassis",
      "Construction site vehicles"
    ],
    caseStudies: [],
    faqs: [
      {
        question: "Can you blast complete vehicle chassis?",
        answer: "Yes, we specialize in complete chassis restoration for commercial and agricultural vehicles. Our facility can accommodate large farm trucks, warehouse vehicles, and industrial equipment. We systematically blast all chassis members, cross-braces, and structural components to bare metal."
      },
      {
        question: "Do you work on vintage commercial vehicles?",
        answer: "Absolutely. We have extensive experience restoring vintage farm trucks, classic commercial vehicles, and heritage agricultural machinery. Our careful approach preserves original features while removing decades of corrosion and paint buildup."
      },
      {
        question: "How long does vehicle restoration take?",
        answer: "Complete chassis restoration typically takes 3-5 days depending on vehicle size and condition. Wheel sets can be processed in 1-2 days. For fleet refurbishment projects, we can establish dedicated workflows to process multiple vehicles efficiently."
      },
      {
        question: "What coating should I apply after shot blasting?",
        answer: "For commercial vehicles, we recommend epoxy primer followed by polyurethane topcoat for maximum durability in harsh operating environments. For farm vehicles exposed to chemicals and weather, consider zinc-rich primer systems. We can advise on the most suitable coating system for your specific application."
      }
    ]
  },

  {
    id: "steel-doors",
    title: "Steel Doors & Roller Shutters Shot Blasting",
    shortTitle: "Steel Doors & Roller Shutters",
    tagline: "Professional Restoration for Industrial Doors & Security Shutters",
    heroImage: "/door-after-1.jpeg",
    description: "Our steel doors and roller shutters shot blasting service provides comprehensive restoration for industrial doors, warehouse roller shutters, security doors, and commercial access systems. We remove rust, old paint, and corrosion from large-format doors, roller shutter slats, and door frames, preparing them for protective coatings. Whether you're refurbishing warehouse loading bay doors, restoring security shutters, or maintaining industrial access systems, our precision techniques ensure optimal surface preparation for long-lasting protection and smooth operation.",
    benefits: [
      "Complete removal of rust and corrosion from door surfaces",
      "Restoration of roller shutter slats and mechanisms",
      "Preparation for powder coating, galvanizing, or paint systems",
      "Extension of door and shutter lifespan by decades",
      "Cost-effective alternative to complete replacement",
      "Improved operation and reduced maintenance",
      "Suitable for industrial, warehouse, and commercial applications",
      "Minimal disruption to site operations"
    ],
    process: [
      {
        step: 1,
        title: "Door Assessment & Planning",
        description: "Comprehensive evaluation of door condition, mechanism type, and access requirements for efficient restoration workflow."
      },
      {
        step: 2,
        title: "Component Removal & Protection",
        description: "Careful removal of mechanisms, motors, and sensitive components. Protection of surrounding building fabric and operational areas."
      },
      {
        step: 3,
        title: "Industrial Shot Blasting",
        description: "Systematic removal of all coatings, rust, and corrosion from door panels, roller slats, and frames using controlled blasting techniques."
      },
      {
        step: 4,
        title: "Mechanism Cleaning",
        description: "Detailed cleaning of tracks, guides, and mounting hardware to ensure smooth operation after restoration."
      },
      {
        step: 5,
        title: "Surface Profiling",
        description: "Achievement of optimal surface profile for maximum coating adhesion and long-term protection in demanding environments."
      },
      {
        step: 6,
        title: "Quality Verification",
        description: "Thorough inspection of all blasted surfaces to ensure uniform cleanliness and preparation standards before coating."
      }
    ],
    applications: [
      "Warehouse loading bay doors",
      "Industrial roller shutters",
      "Commercial security doors",
      "Factory access doors",
      "Storage facility doors",
      "Retail security shutters",
      "Fire doors and emergency exits",
      "Agricultural building doors"
    ],
    caseStudies: [
      {
        title: "Warehouse Roller Shutter Restoration",
        client: "Industrial Distribution Center",
        challenge: "A large warehouse facility had multiple loading bay roller shutters with severe surface contamination, rust staining, and paint degradation. The shutters were operational but visually deteriorated, and the contamination was accelerating corrosion. The client required complete restoration to extend service life and improve facility appearance without replacing the functional shutter systems.",
        solution: "We systematically shot blasted all roller shutter slats, door frames, and mounting hardware to remove decades of industrial contamination, rust, and failed coatings. The work was phased to maintain operational access to the loading bays. Each shutter was processed individually, with careful attention to preserving the slat profiles and mechanism mounting points. The bare metal surface was prepared to commercial coating standards.",
        result: "The warehouse roller shutters were transformed from heavily contaminated industrial doors to clean, uniform surfaces ready for protective coating. All rust and corrosion were completely removed, revealing sound structural steel. The client achieved a professional finish at a fraction of the cost of shutter replacement, with the restored doors expected to provide decades more service. The phased approach ensured minimal disruption to warehouse operations throughout the project.",
        image: "/door-after-2.jpeg"
      }
    ],
    faqs: [
      {
        question: "Can you blast roller shutters without removing them?",
        answer: "In most cases, yes. We can shot blast roller shutters in situ using containment systems to protect the building interior and surrounding areas. For severely corroded shutters or those requiring mechanism work, removal to our workshop may be recommended for comprehensive restoration."
      },
      {
        question: "Will shot blasting affect door operation?",
        answer: "Shot blasting improves door operation by removing corrosion and contamination that can bind mechanisms. We carefully protect motors, sensors, and control systems during the process. After restoration and coating, doors typically operate more smoothly than before."
      },
      {
        question: "How long does door restoration take?",
        answer: "A typical warehouse roller shutter can be shot blasted in 1-2 days depending on size and condition. Large industrial doors or multiple door sets may require longer. We work efficiently to minimize operational disruption and can phase the work to maintain site access."
      },
      {
        question: "What coating should I apply after shot blasting?",
        answer: "For industrial doors and roller shutters, we recommend epoxy primer followed by polyurethane topcoat for maximum durability in demanding environments. For high-traffic areas, consider powder coating for superior abrasion resistance. We can advise on the most suitable coating system for your specific application and exposure conditions."
      }
    ]
  },

  {
    id: "steel-sheeting",
    title: "Steel Sheeting Shot Blasting",
    shortTitle: "Steel Sheeting",
    tagline: "Professional Surface Preparation for Steel Sheets & Panels",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/fkgJmqEnmAuTURUu.png",
    description: "Our steel sheeting shot blasting service provides comprehensive surface preparation for steel sheets, panels, and flat metal products. We remove mill scale, rust, and old coatings from steel sheeting used in construction, manufacturing, and fabrication. Whether you're preparing new steel sheets for coating or refurbishing existing panels, our precision techniques ensure uniform surface cleanliness and optimal profile for coating adhesion across large flat surfaces.",
    benefits: [
      "Complete removal of mill scale and surface contaminants",
      "Uniform surface profile across entire sheet area",
      "Preparation for powder coating, galvanizing, or paint systems",
      "Extends service life of steel sheeting",
      "Suitable for new fabrication and refurbishment projects",
      "Cost-effective alternative to replacement",
      "Ideal for roofing, cladding, and structural panels",
      
    ],
    process: [
      {
        step: 1,
        title: "Sheet Assessment",
        description: "We inspect the steel sheeting to assess condition, thickness, and determine appropriate blast media and pressure settings for flat surface preparation."
      },
      {
        step: 2,
        title: "Surface Preparation",
        description: "Sheets are positioned for optimal blast coverage. We ensure proper support to prevent distortion during the blasting process."
      },
      {
        step: 3,
        title: "Systematic Shot Blasting",
        description: "Using controlled techniques, we systematically blast entire sheet surfaces to achieve uniform cleanliness and consistent surface profile."
      },
      {
        step: 4,
        title: "Edge Treatment",
        description: "Special attention to sheet edges and corners to ensure complete coverage and preparation for welding or joining."
      },
      {
        step: 5,
        title: "Quality Verification",
        description: "We conduct thorough inspections to ensure uniform surface cleanliness and profile specifications across the entire sheet area."
      },
      {
        step: 6,
        title: "Coating Coordination",
        description: "Prepared sheets are ready for immediate coating application, with timing coordinated to minimize surface oxidation."
      }
    ],
    applications: [
      "Roofing sheets and panels",
      "Cladding panels for buildings",
      "Structural steel plates",
      "Fabrication sheet material",
      "Industrial equipment panels",
      "Storage tank panels",
      "Architectural metal panels",
      "Manufacturing sheet stock"
    ],
    caseStudies: [],
    faqs: [
      {
        question: "Can you blast thin steel sheeting without causing distortion?",
        answer: "Yes, we adjust blast pressure and media selection based on sheet thickness and material grade. Our technicians are experienced in processing thin gauge material while maintaining flatness and preventing distortion."
      },
      {
        question: "What sheet sizes can you accommodate?",
        answer: "We can process steel sheets of various sizes, from small panels to large structural plates. Our equipment and facility can handle standard roofing and cladding sheet dimensions as well as custom-sized fabrication material."
      },
      {
        question: "How quickly can you process steel sheeting?",
        answer: "Processing time depends on sheet size, quantity, and condition. We can typically process standard roofing sheets efficiently in batches. For large projects, we can establish dedicated workflows to meet your schedule requirements."
      },
      {
        question: "Do you offer coating services after shot blasting?",
        answer: "Yes, we can coordinate with coating contractors or provide recommendations for powder coating, galvanizing, or paint systems. We ensure timing is optimized to minimize surface oxidation between blasting and coating."
      }
    ]
  },

  {
    id: "steel-gates",
    title: "Steel Gates & Railings Shot Blasting",
    shortTitle: "Steel Gates & Railings",
    tagline: "Precision Restoration for Commercial & Industrial Gates",
    heroImage: "/steel-gates-after.jpeg",
    description: "Our steel gates and railings shot blasting service provides comprehensive restoration for commercial and industrial entrance gates, perimeter railings, and decorative metalwork. We remove rust, old paint, and corrosion from ornate gates, security barriers, and architectural railings, preparing them for protective coatings. Whether you're restoring heritage entrance gates or maintaining modern security installations, our precision techniques preserve intricate details while achieving optimal surface preparation for long-lasting protection.",
    benefits: [
      "Complete removal of rust and corrosion from intricate metalwork",
      "Preservation of decorative details and ornate features",
      "Preparation for powder coating, galvanizing, or paint systems",
      "Restoration of gates to original appearance",
      "Extension of gate and railing lifespan by decades",
      "Cost-effective alternative to replacement",
      "Minimal disruption to site security during work",
      "Suitable for heritage and modern gates alike"
    ],
    process: [
      {
        step: 1,
        title: "Site Survey & Access Assessment",
        description: "Comprehensive evaluation of gate condition, access requirements, and surrounding area protection needs."
      },
      {
        step: 2,
        title: "Area Protection & Masking",
        description: "Installation of containment systems and protective sheeting to safeguard brick pillars, walls, and surrounding areas."
      },
      {
        step: 3,
        title: "Controlled Shot Blasting",
        description: "Systematic removal of all coatings, rust, and corrosion using carefully selected media and pressure settings."
      },
      {
        step: 4,
        title: "Detail Cleaning",
        description: "Meticulous cleaning of ornate scrollwork, finials, and decorative elements to preserve intricate features."
      },
      {
        step: 5,
        title: "Surface Profiling",
        description: "Achievement of optimal surface profile for maximum coating adhesion and long-term protection."
      },
      {
        step: 6,
        title: "Quality Inspection",
        description: "Thorough verification of surface cleanliness and preparation standards before coating application."
      },
      {
        step: 7,
        title: "Immediate Priming",
        description: "Application of primer coating if required to prevent flash rusting and ensure optimal protection."
      }
    ],
    applications: [
      "Commercial property entrance gates",
      "Industrial site security gates",
      "Decorative perimeter railings",
      "Ornate heritage gates",
      "Automated sliding and swing gates",
      "Pedestrian access gates",
      "Driveway gates and barriers",
      "Architectural metalwork features"
    ],
    caseStudies: [
      {
        title: "Victorian Entrance Gates Restoration",
        client: "Commercial Property Estate",
        challenge: "A pair of ornate Victorian entrance gates serving a commercial property had decades of paint buildup, rust, and corrosion. The decorative scrollwork details were obscured, and the gates were failing structurally. The client required complete restoration while preserving the intricate period features.",
        solution: "We carefully shot blasted the entire gate structure, removing multiple layers of paint and rust while preserving the delicate ornate metalwork. The process was conducted in phases to maintain site security, with detailed masking to protect the brick pillars and surrounding areas. Special attention was given to the decorative scrollwork and finials to ensure no detail was lost.",
        result: "The gates were restored to their original splendor, revealing the full beauty of the Victorian craftsmanship. All structural corrosion was removed, and the gates were prepared for a high-quality protective coating system. The client saved over 60% compared to commissioning replica gates, while preserving the property's heritage character and ensuring decades more service life.",
        image: "/steel-gates-after.jpeg"
      }
    ],
    faqs: [
      {
        question: "Can you work on gates without removing them?",
        answer: "Yes, we can shot blast gates in situ in most cases. We use containment systems and protective sheeting to prevent damage to surrounding areas. For complex restorations or gates with severe structural issues, removal may be recommended for workshop-based restoration."
      },
      {
        question: "Will shot blasting damage ornate details?",
        answer: "No, our technicians are trained in working with decorative metalwork. We adjust blast pressure and media selection to safely clean intricate details without causing damage. Shot blasting actually reveals fine details that may be hidden under paint buildup."
      },
      {
        question: "How long does gate restoration take?",
        answer: "Typical entrance gates can be shot blasted in 1-2 days depending on size and complexity. Large ornate gates or multiple gate sets may require longer. We work efficiently to minimize security disruption and can coordinate with your access control requirements."
      },
      {
        question: "What coating should I apply after shot blasting?",
        answer: "We recommend hot-dip galvanizing for maximum longevity, powder coating for decorative finishes, or high-quality metal paint systems. The choice depends on your aesthetic preferences, budget, and exposure conditions. We can advise on the most suitable system for your gates."
      }
    ]
  },
  {
    id: "plant-machinery",
    title: "Plant & Machinery Shot Blasting",
    shortTitle: "Plant & Machinery",
    tagline: "On-Site Shot Blasting for Construction & Agricultural Equipment",
    description: "Our mobile plant and machinery shot blasting service brings professional surface preparation directly to your site. We specialize in restoring construction equipment, agricultural machinery, and industrial plant without the need for transportation. From excavators and bulldozers to tractors and harvesters, we remove rust, old paint, and corrosion to extend equipment lifespan, maintain resale value, and ensure your machinery meets safety and compliance standards.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/XbGdoLIRzfQaKMpD.jpg",
    benefits: [
      "On-site service minimizes equipment downtime",
      "Extends machinery lifespan by 5-10 years",
      "Maintains and improves resale value",
      "Prevents costly breakdowns from corrosion",
      "Prepares surfaces for protective coatings",
      "Meets safety and compliance standards",
      "Cost-effective alternative to replacement",
      "No transportation logistics required"
    ],
    process: [
      { step: 1, title: "Site Assessment", description: "Our team visits your location to assess the machinery, determine blast media requirements, and plan containment setup to protect surrounding areas." },
      { step: 2, title: "Equipment Preparation", description: "We protect sensitive components like hydraulics, electronics, and bearings. Critical areas are masked to ensure only intended surfaces are blasted." },
      { step: 3, title: "Containment Setup", description: "Professional containment systems are deployed to capture blast media and debris, ensuring waste management and site cleanliness." },
      { step: 4, title: "Shot Blasting", description: "Using appropriate blast media for the equipment type, we systematically remove rust, paint, and corrosion from all accessible surfaces." },
      { step: 5, title: "Surface Inspection", description: "We inspect all blasted surfaces to ensure complete rust removal and proper surface profile for coating adhesion." },
      { step: 6, title: "Coating Application (Optional)", description: "If required, we can coordinate protective coating application immediately after blasting to prevent flash rusting and maximize protection." }
    ],
    applications: [
      "Excavators and diggers",
      "Bulldozers and loaders",
      "Cranes and lifting equipment",
      "Agricultural tractors",
      "Combine harvesters",
      "Industrial compressors",
      "Generators and power units",
      "Concrete mixers and pumps",
      "Dump trucks and tipper bodies",
      "Forklift trucks",
      "Road construction equipment",
      "Mining machinery"
    ],
    caseStudies: [],
    faqs: [
      {
        question: "Can you shot blast machinery on-site without moving it?",
        answer: "Yes, our mobile shot blasting service is specifically designed to work on-site. We bring all necessary equipment, containment systems, and blast media to your location, eliminating the need for expensive transportation and minimizing equipment downtime."
      },
      {
        question: "What types of plant and machinery can you shot blast?",
        answer: "We can shot blast virtually any construction or agricultural equipment including excavators, bulldozers, loaders, cranes, tractors, harvesters, compressors, generators, and more. Our mobile setup adapts to equipment of all sizes from small attachments to large earthmoving machinery."
      },
      {
        question: "How do you protect sensitive components during blasting?",
        answer: "Before blasting begins, our experienced team carefully masks and protects all sensitive components including hydraulic systems, electrical components, bearings, seals, and glass. We use specialized protective materials and techniques developed specifically for machinery restoration."
      },
      {
        question: "Will shot blasting damage my equipment?",
        answer: "No, when performed by experienced professionals using appropriate blast media and pressure settings, shot blasting is completely safe for machinery. We select media types and blast parameters specifically for each equipment type and surface condition to ensure effective cleaning without damage."
      },
      {
        question: "How long does it take to shot blast a piece of machinery?",
        answer: "Project duration varies based on equipment size and condition. A small excavator attachment might take 4-6 hours, while a large excavator or bulldozer could require 2-3 days. We provide accurate time estimates during our initial site assessment."
      },
      {
        question: "Do you apply protective coatings after shot blasting?",
        answer: "Yes, we can coordinate protective coating application immediately after blasting. This is highly recommended as freshly blasted metal surfaces can begin to oxidize within hours. We work with trusted coating specialists or can apply primer coatings ourselves to ensure maximum corrosion protection."
      },
      {
        question: "Is shot blasting better than manual rust removal?",
        answer: "Shot blasting is significantly more effective than manual methods. It completely removes rust down to bare metal, creates an ideal surface profile for coating adhesion, and works 10-20 times faster than manual grinding or wire brushing. The result is superior surface preparation that extends equipment life."
      },
      {
        question: "What about environmental concerns and site cleanliness?",
        answer: "We use professional containment systems that capture all blast media and debris, preventing environmental contamination. After completion, we thoroughly clean the work area, remove all waste materials, and leave your site in pristine condition. Our processes comply with all waste management practices."
      }
    ]
  },
  {
    id: "intumescent-painting",
    title: "Intumescent Painting",
    shortTitle: "Intumescent Painting",
    tagline: "Fire-Resistant Coatings Applied to Perfectly Prepared Steel",
    description: "Commercial Shot Blasting now offers a complete intumescent painting service for structural steel, fire escapes, and industrial metalwork. We prepare the steel to the correct cleanliness grade using shot blasting, then apply certified intumescent coatings that expand under heat to protect the structure and maintain fire resistance ratings. From R30 to R120, we deliver compliant, inspected, and documented fire protection for new builds, refurbishments, and structural upgrades across England and Wales.",
    heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663301568782/CYVSNVCfCqJAX7JT23JqdG/manus-storage/IMG_3363_26c5983e.webp",
    benefits: [
      "Full in-house service: shot blasting and intumescent painting under one contract",
      "Certified coatings compliant with BS EN 13381 and ASFP guidelines",
      "Fire resistance ratings from R30 to R120 achieved and documented",
      "Mobile service — we come to your site anywhere in England and Wales",
      "Correct surface preparation ensures maximum coating adhesion and longevity",
      "Detailed inspection records and coating thickness reports provided",
      "Works on structural steel frames, fire escapes, staircases, and mezzanines",
      "Coordination with principal contractors and fire engineers available"
    ],
    process: [
      { step: 1, title: "Site Survey & Specification", description: "We visit your site to assess the steel, confirm the required fire resistance rating (e.g. R30, R60, R90, R120), and agree the coating system. We review structural drawings where available and confirm the DFT (dry film thickness) required to achieve the specification." },
      { step: 2, title: "Surface Preparation by Shot Blasting", description: "All steel is shot blasted to Sa 2.5 (near-white metal) or Sa 3 (white metal) as required by the coating manufacturer's data sheet. This removes mill scale, rust, and old coatings and creates the correct surface profile for maximum adhesion." },
      { step: 3, title: "Primer Application", description: "An approved zinc-rich or epoxy primer is applied immediately after blasting to prevent flash rusting and provide the correct base for the intumescent topcoat. Primer DFT is measured and recorded." },
      { step: 4, title: "Intumescent Coating Application", description: "The intumescent basecoat is applied in controlled passes to achieve the specified DFT. We use approved products from leading manufacturers. Wet film thickness is checked during application; dry film thickness is measured and logged after curing." },
      { step: 5, title: "Sealer / Topcoat", description: "A protective sealer or decorative topcoat is applied over the intumescent layer to provide weather resistance, UV protection, and the required finish colour. This also protects the intumescent layer from mechanical damage during construction." },
      { step: 6, title: "Inspection & Documentation", description: "We carry out a final DFT survey across all coated members, photograph the completed work, and provide a full coating report including product data sheets, batch numbers, and thickness readings — ready for the building control file or fire engineer sign-off." }
    ],
    applications: [
      "Structural steel frames (columns, beams, trusses)",
      "Mezzanine floors and steel platforms",
      "Fire escapes and external stair towers",
      "Internal staircases, balustrades, and handrails",
      "Steel portal frames in warehouses and factories",
      "Roof purlins and secondary steelwork",
      "New build commercial and industrial projects",
      "Refurbishment of existing structures requiring upgraded fire ratings"
    ],
    caseStudies: [
      {
        title: "Warehouse Extension — R60 Structural Steel Protection",
        client: "Midlands Logistics Operator",
        challenge: "A 3,000 m² warehouse extension required all primary structural steel to achieve a 60-minute fire resistance rating. The principal contractor needed a single subcontractor to handle both surface preparation and intumescent painting.",
        solution: "We mobilised to site and shot blasted all columns and beams to Sa 2.5 before applying a zinc epoxy primer, a certified intumescent basecoat at the DFT required for R60, and a grey polyurethane sealer. All work was carried out in a controlled sequence to avoid delays to follow-on trades.",
        result: "All structural members achieved the R60 fire resistance rating. A full DFT survey and coating report was submitted to the building control officer. The project completed on programme and the client has since appointed us on two further warehouse projects.",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663301568782/CYVSNVCfCqJAX7JT23JqdG/manus-storage/IMG_3363_26c5983e.webp"
      },
      {
        title: "Fire Escape Refurbishment — R30 Rating Restored",
        client: "Commercial Property Management Company",
        challenge: "An external fire escape on a 1970s office block had corroded through its original intumescent coating. The building's fire risk assessment required the escape to be restored to a minimum R30 rating before the building could be reoccupied.",
        solution: "We removed all existing coatings and corrosion by shot blasting to Sa 2.5, applied an epoxy primer, and then applied a water-based intumescent coating at the specified DFT for R30. A topcoat in the client's specified RAL colour completed the restoration.",
        result: "The fire escape was restored to full compliance. The building control officer accepted the coating report and the property was reoccupied within the client's deadline. Total project duration was four days including surface preparation.",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663301568782/CYVSNVCfCqJAX7JT23JqdG/manus-storage/IMG_3343_0483fe56.webp"
      }
    ],
    faqs: [
      {
        question: "What is intumescent paint and how does it work?",
        answer: "Intumescent paint is a passive fire protection coating that remains inert under normal conditions but expands dramatically when exposed to heat (typically above 200°C). The expansion creates a thick, insulating char layer around the steel, slowing the rate at which the steel heats up and maintaining structural integrity for the specified fire resistance period — typically 30, 60, 90, or 120 minutes."
      },
      {
        question: "Why does the steel need to be shot blasted before intumescent painting?",
        answer: "Intumescent coatings rely on strong adhesion to perform correctly. Mill scale, rust, grease, and old coatings all compromise adhesion and can cause the intumescent layer to delaminate under heat — potentially invalidating the fire resistance rating. Shot blasting to Sa 2.5 or Sa 3 removes all contaminants and creates a surface profile that maximises mechanical adhesion."
      },
      {
        question: "What fire resistance ratings can you achieve?",
        answer: "We can achieve fire resistance ratings from R30 to R120 depending on the steel section factor, the coating system specified, and the required DFT. We work to the coating manufacturer's published data sheets and can provide documentation to support ratings of R30, R60, R90, and R120 for both protected and unprotected steel sections."
      },
      {
        question: "Do you provide a coating thickness report?",
        answer: "Yes. We measure dry film thickness (DFT) on every coated member using a calibrated gauge and record the readings in a coating report. The report includes product data sheets, batch numbers, application dates, ambient conditions, and thickness readings — providing the documentation required by building control and fire engineers."
      },
      {
        question: "Can you work on existing structures as well as new builds?",
        answer: "Yes. We regularly work on refurbishment projects where existing steel needs to be stripped back and recoated to restore or upgrade its fire resistance rating. This is common on older commercial buildings undergoing change of use, extension, or where a fire risk assessment has identified inadequate protection."
      },
      {
        question: "Do you offer this service nationwide?",
        answer: "Yes. Like all our services, intumescent painting is delivered on a mobile basis across England and Wales. We bring all equipment to your site and can work around your construction programme. Contact us to discuss your project and we will provide a site visit and quotation."
      }
    ]
  },
  {
    id: "marine-shot-blasting",
    title: "Marine Shot Blasting",
    shortTitle: "Marine Blasting",
    tagline: "Specialist Shot Blasting for Marine & Offshore Structures",
    description: "We provide specialist shot blasting services for marine and offshore structures, vessels, jetties, lock gates, and port infrastructure. Our mobile teams deliver controlled surface preparation that removes heavy corrosion, marine fouling, and failed coatings — achieving the cleanliness grades required for high-performance marine coatings and long-term corrosion protection in aggressive saltwater environments.",
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    benefits: [
      "Removes heavy marine corrosion and fouling completely",
      "Achieves Sa 2.5 or Sa 3 cleanliness for marine coatings",
      "Suitable for vessels, jetties, lock gates, and port infrastructure",
      "Mobile service delivered to your waterside location",
      "Extends service life of marine steel structures",
      "Compliant with marine coating manufacturer specifications"
    ],
    process: [
      { step: 1, title: "Site Assessment", description: "We inspect the marine structure to assess corrosion levels, identify any structural concerns, and determine appropriate blast media, pressure settings, and containment requirements for the waterside environment." },
      { step: 2, title: "Containment & Protection", description: "We install containment systems to prevent blast media and debris entering the water. Critical areas such as waterline zones and mechanical fittings are masked as required." },
      { step: 3, title: "Shot Blasting", description: "Using appropriate blast media and controlled pressure, we systematically remove marine corrosion, fouling, and old coatings to achieve the specified cleanliness grade — typically Sa 2.5 or Sa 3 for marine coating systems." },
      { step: 4, title: "Quality Verification", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and surface profile specifications for the marine coating system." },
      { step: 5, title: "Coating Coordination", description: "Cleaned surfaces are primed promptly to prevent flash rusting in the marine atmosphere. We coordinate timing with your coating contractor to ensure optimal adhesion conditions." }
    ],
    applications: [
      "Lock gates and sluice structures",
      "Jetties and pontoons",
      "Port and harbour infrastructure",
      "Offshore platform components",
      "Marine vessel hulls and decks",
      "Tidal barriers and flood defence structures",
      "Mooring bollards and fendering systems",
      "Underwater steel structures"
    ],
    caseStudies: [
      {
        title: "Canal Lock Gate Refurbishment",
        client: "Waterways Infrastructure Operator",
        challenge: "A pair of historic canal lock gates required complete surface preparation before recoating. The gates had decades of accumulated marine corrosion, old coal tar epoxy, and biological fouling that needed full removal to achieve a sound substrate for the new coating system.",
        solution: "We mobilised to the canal with full containment equipment and shot blasted both gates to Sa 2.5, removing all corrosion, old coatings, and fouling. Containment screens prevented blast media entering the waterway. The work was completed during the scheduled lock closure window to minimise disruption to canal traffic.",
        result: "Both lock gates were restored to bare metal with a consistent surface profile. The coating contractor applied the new marine epoxy system to a perfectly prepared substrate. The gates were returned to service within the scheduled maintenance window and are expected to provide 15–20 years of corrosion protection.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
      }
    ],
    faqs: [
      {
        question: "Can you work on structures in or near water?",
        answer: "Yes. We have experience working on waterside structures including lock gates, jetties, and port infrastructure. We install appropriate containment to prevent blast media and debris entering the water, and we comply with any environmental permit conditions applicable to the site."
      },
      {
        question: "What cleanliness grade do you achieve for marine coatings?",
        answer: "We typically achieve Sa 2.5 (near-white metal) or Sa 3 (white metal) depending on the coating manufacturer's specification. Marine coating systems generally require Sa 2.5 as a minimum to ensure adequate adhesion in aggressive saltwater environments."
      },
      {
        question: "How quickly do you prime after blasting in a marine environment?",
        answer: "In marine atmospheres, flash rusting can occur very quickly. We coordinate closely with the coating contractor to ensure primer is applied within the shortest possible interval after blasting — typically within 4 hours and always within the same working day where conditions allow."
      },
      {
        question: "Do you offer this service nationwide?",
        answer: "Yes. Our mobile teams operate across England and Wales and can reach most coastal, river, and canal locations. Contact us to discuss your project and we will provide a site visit and quotation."
      }
    ]
  },
  {
    id: "rust-removal",
    title: "Rust Removal",
    shortTitle: "Rust Removal",
    tagline: "Complete Rust Removal by Shot Blasting — Commercial & Industrial",
    description: "Shot blasting is the most effective method for removing rust from commercial and industrial steel structures. Unlike wire brushing, grinding, or chemical treatments, shot blasting removes rust completely and simultaneously creates a surface profile that maximises coating adhesion. Our mobile service brings this capability directly to your site, treating structures of any size to the cleanliness grade required by your coating specification.",
    heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663301568782/CYVSNVCfCqJAX7JT23JqdG/manus-storage/IMG_3350_877ba6b6.webp",
    benefits: [
      "Removes rust completely — not just surface treatment",
      "Creates surface profile for optimal coating adhesion",
      "Faster and more thorough than grinding or wire brushing",
      "Achieves recognised cleanliness grades (Sa 2, Sa 2.5, Sa 3)",
      "Suitable for structures of any size",
      "Mobile service — we come to your site"
    ],
    process: [
      { step: 1, title: "Rust Assessment", description: "We inspect the structure to assess the extent and depth of corrosion, identify any pitting or structural concerns, and select the correct grade of iron silicate media for complete rust removal without over-profiling the substrate." },
      { step: 2, title: "Surface Preparation", description: "The structure is prepared for blasting. Surrounding areas are protected with sheeting and seals to control blast media and debris. Mechanical fittings and non-steel components are masked as required." },
      { step: 3, title: "Iron Silicate Blasting", description: "We use iron silicate (copper slag) — a premium angular abrasive that cuts through rust, corrosion products, and surface contaminants in a single pass. Its high hardness and consistent particle geometry deliver a reliable Sa 2.5 finish with a sharp anchor profile, giving the replacement coating system the mechanical key it needs for long-term adhesion." },
      { step: 4, title: "Quality Inspection", description: "We conduct thorough inspections using visual cleanliness comparators and profile gauges to confirm all rust has been removed and the surface profile meets the coating manufacturer's requirements." },
      { step: 5, title: "Priming", description: "Cleaned surfaces are primed promptly to prevent re-rusting. Iron silicate's low chloride content minimises the risk of under-film corrosion, giving the primer the best possible foundation. We coordinate timing with your coating contractor or can apply a holding primer ourselves if required." }
    ],
    applications: [
      "Structural steelwork",
      "Industrial plant and equipment",
      "Steel gates, railings, and fencing",
      "Storage tanks and vessels",
      "Bridge steelwork",
      "Agricultural machinery and equipment",
      "Commercial vehicles and trailers",
      "Steel cladding and roofing"
    ],
    caseStudies: [
      {
        title: "Heavily Corroded Industrial Storage Tank",
        client: "Chemical Processing Facility",
        challenge: "A large industrial storage tank had developed heavy corrosion over several years of outdoor exposure. The existing coating had failed in multiple areas and the underlying steel had corroded significantly, with some areas showing deep pitting. A full recoat was required but the surface needed to be taken back to bare metal first.",
        solution: "We mobilised to site with our mobile shot blasting equipment and systematically treated the entire tank exterior to Sa 2.5. The shot blasting removed all corrosion products, failed coating, and surface contaminants, including cleaning out the pitted areas to provide a sound substrate. A zinc-rich primer was applied the same day to prevent re-rusting.",
        result: "The tank was restored to a clean, profiled surface ready for the full coating system. The client's coating contractor applied the specified epoxy system to a perfectly prepared substrate. The tank is expected to provide 20+ years of corrosion protection with the new coating system.",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663301568782/CYVSNVCfCqJAX7JT23JqdG/manus-storage/IMG_3350_877ba6b6.webp"
      }
    ],
    faqs: [
      {
        question: "Is shot blasting better than wire brushing for rust removal?",
        answer: "Yes, significantly. Wire brushing and grinding only remove surface rust and cannot achieve the surface profile required for long-term coating adhesion. Shot blasting removes rust completely — including from pits and surface irregularities — and simultaneously creates a mechanical key (surface profile) that maximises the adhesion of protective coatings. This is why coating manufacturers specify shot blasting as the preferred preparation method."
      },
      {
        question: "What cleanliness grade do you achieve?",
        answer: "We can achieve Sa 1 (light blast), Sa 2 (thorough blast), Sa 2.5 (near-white metal), or Sa 3 (white metal) depending on your coating specification. Most industrial coating systems require Sa 2.5 as a minimum. We will confirm the required grade before starting work."
      },
      {
        question: "How quickly will the steel re-rust after blasting?",
        answer: "Freshly blasted steel is highly reactive and will begin to flash rust within hours in humid conditions. We always coordinate closely with the coating contractor to ensure primer is applied as soon as possible after blasting — ideally the same day. We can also apply a holding primer ourselves if there will be a delay before the main coating system is applied."
      },
      {
        question: "Can you treat structures in situ?",
        answer: "Yes. Our mobile shot blasting service brings the equipment to your site. We can treat structures in place without the need for dismantling or transportation. We install appropriate containment to control blast media and debris."
      }
    ]
  },
  {
    id: "mill-scale-removal",
    title: "Mill Scale Removal",
    shortTitle: "Mill Scale Removal",
    tagline: "Professional Mill Scale Removal for Optimal Coating Adhesion",
    description: "Mill scale is the blue-grey oxide layer formed on steel during hot rolling. While it appears hard and protective, mill scale is actually cathodic to the underlying steel — meaning it accelerates corrosion when the scale breaks down. Coating over mill scale leads to premature coating failure. Shot blasting is the only reliable method for complete mill scale removal, simultaneously creating the surface profile required for long-term coating adhesion.",
    heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663301568782/CYVSNVCfCqJAX7JT23JqdG/manus-storage/IMG_3291_eabbc044.webp",
    benefits: [
      "Complete removal of mill scale — not just surface treatment",
      "Prevents premature coating failure caused by mill scale",
      "Creates optimal surface profile for coating adhesion",
      "Achieves Sa 2.5 or Sa 3 as required by coating specifications",
      "Suitable for new fabrications and structural steelwork",
      "Mobile service — we come to your fabrication yard or site"
    ],
    process: [
      { step: 1, title: "Steel Assessment", description: "We inspect the steel to assess the extent of mill scale coverage, identify any areas of existing corrosion, and select the correct grade of iron silicate media to achieve complete mill scale removal to the specified cleanliness grade." },
      { step: 2, title: "Component Preparation", description: "Steel components are positioned for optimal blast coverage. Threaded connections, machined surfaces, and non-steel components are masked as required." },
      { step: 3, title: "Iron Silicate Blasting", description: "Iron silicate (copper slag) is our media of choice for mill scale removal. Its angular, high-density particles fracture on impact, exposing fresh cutting edges that slice through the hard mill scale oxide layer in a single pass. The result is a consistent Sa 2.5 surface with a sharp Rz 50–75 μm anchor profile — exactly what coating manufacturers require for long-term adhesion on new fabrications." },
      { step: 4, title: "Quality Verification", description: "We conduct thorough inspections using Elcometer profile gauges and ISO 8501-1 visual comparators to confirm all mill scale has been removed and the surface profile meets the coating manufacturer's requirements. Certificates of conformance are available on request." },
      { step: 5, title: "Coating Coordination", description: "Cleaned components are primed promptly to prevent surface oxidation. Iron silicate leaves a chemically clean surface with low soluble salt content, giving primers the best possible bond. We coordinate timing with your coating contractor to ensure optimal adhesion conditions." }
    ],
    applications: [
      "New structural steel fabrications",
      "Steel beams, columns, and sections",
      "Steel plate and sheet",
      "Fabricated steelwork before galvanizing",
      "Pipework and pressure vessels",
      "Steel components before powder coating",
      "Bridge and infrastructure steelwork",
      "Industrial plant components"
    ],
    caseStudies: [
      {
        title: "New Build Structural Steel Frame — Mill Scale Removal",
        client: "Steel Fabricator, West Midlands",
        challenge: "A steel fabricator needed all structural steel for a new commercial building to be shot blasted to Sa 2.5 before delivery to site. The steel was freshly rolled with full mill scale coverage and needed to be prepared to the coating specification before the protective coating system could be applied.",
        solution: "We mobilised to the fabrication yard and systematically shot blasted all structural members — columns, beams, purlins, and bracing — to Sa 2.5. The work was sequenced to match the fabricator's production schedule, with completed members primed and racked ready for delivery to site.",
        result: "All structural steel was delivered to site with a clean, profiled, primed surface ready for the main coating system. The coating contractor confirmed excellent adhesion on all members. The project completed on schedule and the client has since appointed us as their preferred shot blasting contractor for all new fabrication work.",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663301568782/CYVSNVCfCqJAX7JT23JqdG/manus-storage/IMG_3291_eabbc044.webp"
      }
    ],
    faqs: [
      {
        question: "Why is mill scale a problem for coatings?",
        answer: "Mill scale is cathodic to the underlying steel, which means that when moisture penetrates the coating and reaches the mill scale, it creates a galvanic cell that accelerates corrosion of the steel beneath. The mill scale then lifts away from the steel, taking the coating with it. This is why coating manufacturers specify mill scale removal as a prerequisite for long-term coating performance."
      },
      {
        question: "Can mill scale be removed by pickling instead of shot blasting?",
        answer: "Yes, acid pickling is an alternative method for mill scale removal, but it does not create a surface profile. Shot blasting removes mill scale and simultaneously creates the mechanical key required for coating adhesion. For most industrial coating systems, shot blasting is the preferred method because it achieves both objectives in a single operation."
      },
      {
        question: "What surface profile do you achieve?",
        answer: "Surface profile (anchor pattern depth) depends on the blast media used. We can achieve profiles ranging from Rz 25–100 μm depending on your coating specification. We will confirm the required profile before starting work and can provide profile measurement reports if required."
      },
      {
        question: "Do you work at fabrication yards as well as on-site?",
        answer: "Yes. We regularly work at steel fabrication yards, treating components before they are delivered to site. This is often more efficient than on-site blasting as it allows the coating system to be applied under controlled conditions. We can also work on-site for refurbishment projects."
      }
    ]
  },
  {
    id: "paint-stripping",
    title: "Paint Stripping",
    shortTitle: "Paint Stripping",
    tagline: "Industrial Paint Stripping by Shot Blasting — Fast, Complete, No Chemicals",
    description: "Shot blasting is the most effective method for stripping paint from steel structures. It removes all paint layers simultaneously — including primers, intermediate coats, and topcoats — without chemicals, heat, or hand tools. Our mobile service delivers complete paint removal to the cleanliness grade required by your new coating specification, leaving a profiled surface ready for immediate recoating.",
    heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663301568782/CYVSNVCfCqJAX7JT23JqdG/manus-storage/IMG_3334_98d6c98d.webp",
    benefits: [
      "Removes all paint layers in a single operation",
      "No chemicals, heat, or hand tools required",
      "Creates surface profile for optimal recoating adhesion",
      "Faster and more thorough than alternative stripping methods",
      "Suitable for structures of any size",
      "Mobile service — we come to your site"
    ],
    process: [
      { step: 1, title: "Paint Assessment", description: "We inspect the structure to assess the existing paint system, identify any hazardous materials such as lead paint, and select the correct grade of iron silicate media for complete paint removal without damaging the substrate." },
      { step: 2, title: "Containment & Protection", description: "Surrounding areas are protected with sheeting and seals to control blast media and paint debris. If lead paint is present, we implement appropriate containment and disposal procedures." },
      { step: 3, title: "Iron Silicate Blasting", description: "Using iron silicate (copper slag) media and controlled pressure, we systematically remove all paint layers to achieve the specified cleanliness grade — typically Sa 2.5 for most recoating specifications." },
      { step: 4, title: "Quality Inspection", description: "We conduct thorough inspections to confirm all paint has been removed and the surface profile meets the new coating manufacturer's requirements." },
      { step: 5, title: "Priming", description: "Stripped surfaces are primed promptly to prevent re-rusting. We coordinate timing with your coating contractor or can apply a holding primer ourselves if required." }
    ],
    applications: [
      "Structural steelwork refurbishment",
      "Steel gates, railings, and fencing",
      "Industrial plant and equipment",
      "Commercial vehicles and trailers",
      "Steel cladding and roofing",
      "Bridge steelwork",
      "Storage tanks and vessels",
      "Fire escapes and access steelwork"
    ],
    caseStudies: [
      {
        title: "Multi-Storey Car Park Steelwork — Full Paint Strip",
        client: "Property Management Company",
        challenge: "A 1980s multi-storey car park required a full recoat of its structural steelwork. The existing paint system had failed in multiple areas and the specification required complete removal of all existing coatings before the new system could be applied.",
        solution: "We mobilised to site with our mobile shot blasting equipment and systematically stripped all structural steelwork to Sa 2.5. The work was phased to allow the car park to remain partially operational during the refurbishment. A zinc-rich primer was applied the same day to each section as it was completed.",
        result: "All structural steelwork was stripped to bare metal with a consistent surface profile. The coating contractor applied the new system to a perfectly prepared substrate. The client received a full coating inspection report confirming compliance with the specification.",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663301568782/CYVSNVCfCqJAX7JT23JqdG/manus-storage/IMG_3334_98d6c98d.webp"
      }
    ],
    faqs: [
      {
        question: "Can you strip lead paint safely?",
        answer: "Yes. We have experience working with lead paint and implement appropriate containment, PPE, and disposal procedures. All waste containing lead paint is disposed of in accordance with hazardous waste regulations. We can provide a COSHH assessment and risk method statement for lead paint removal projects."
      },
      {
        question: "How many coats of paint can you remove in one pass?",
        answer: "Shot blasting removes all paint layers simultaneously regardless of the number of coats. There is no practical limit — we have stripped structures with 10+ coats of accumulated paint in a single operation."
      },
      {
        question: "Will shot blasting damage the underlying steel?",
        answer: "No, when carried out correctly. We select blast media and pressure settings appropriate for the substrate and the required cleanliness grade. Shot blasting removes surface contaminants without removing base metal or reducing the structural integrity of the steel."
      },
      {
        question: "Do you offer this service nationwide?",
        answer: "Yes. Our mobile teams operate across England and Wales. We bring all equipment to your site and can work around your operational requirements. Contact us to discuss your project and we will provide a site visit and quotation."
      }
    ]
  },
  {
    id: "coating-removal",
    title: "Coating Removal",
    shortTitle: "Coating Removal",
    tagline: "Complete Coating Removal by Shot Blasting — All Coating Types",
    description: "We provide specialist coating removal services for all types of industrial and protective coatings — including epoxy, polyurethane, zinc-rich primers, coal tar epoxy, intumescent coatings, and specialist marine systems. Shot blasting removes coatings completely and simultaneously creates the surface profile required for the replacement coating system, making it the most efficient preparation method for coating refurbishment projects.",
    heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663301568782/CYVSNVCfCqJAX7JT23JqdG/manus-storage/IMG_3354_1d9bb82e.webp",
    benefits: [
      "Removes all coating types including epoxy, polyurethane, and zinc primers",
      "Complete removal — no residual coating left on surface",
      "Creates surface profile for replacement coating adhesion",
      "Faster than alternative removal methods",
      "Suitable for structures of any size",
      "Mobile service — we come to your site"
    ],
    process: [
      { step: 1, title: "Coating Assessment", description: "We inspect the existing coating system to identify coating types, assess adhesion and condition, and select the correct grade of iron silicate media for complete removal without damaging the substrate." },
      { step: 2, title: "Containment & Protection", description: "Surrounding areas are protected with sheeting and seals to control blast media and coating debris. Mechanical fittings and non-steel components are masked as required." },
      { step: 3, title: "Iron Silicate Blasting", description: "We use iron silicate (copper slag) media — a premium angular abrasive with the hardness and particle density to cut through even the toughest industrial coatings, including two-pack epoxy, coal tar epoxy, and intumescent systems. The angular particle shape fractures on impact, continually exposing fresh cutting edges that strip all coating layers in a single pass and leave a sharp anchor profile ready for the replacement system." },
      { step: 4, title: "Quality Verification", description: "We conduct thorough inspections to confirm all coating has been removed and the surface profile meets the replacement coating manufacturer's requirements." },
      { step: 5, title: "Coating Coordination", description: "Cleaned surfaces are primed promptly to prevent re-rusting. We coordinate timing with your coating contractor to ensure optimal adhesion conditions for the replacement system." }
    ],
    applications: [
      "Epoxy coating removal",
      "Polyurethane coating removal",
      "Zinc-rich primer removal",
      "Coal tar epoxy removal",
      "Intumescent coating removal",
      "Marine coating removal",
      "Powder coat removal",
      "Failed or delaminating coating systems"
    ],
    caseStudies: [
      {
        title: "Intumescent Coating Removal — Office Block Refurbishment",
        client: "Commercial Property Developer",
        challenge: "A 1990s office block undergoing change of use required all existing intumescent coatings to be removed from the structural steelwork before a new, upgraded fire protection system could be applied. The existing coatings had partially delaminated and could not be overcoated.",
        solution: "We mobilised to site and shot blasted all structural members to Sa 2.5, removing all existing intumescent coating, primer, and surface corrosion. The work was phased to allow the building to remain partially operational. A zinc epoxy primer was applied the same day to each section as it was completed.",
        result: "All structural steelwork was stripped to bare metal with a consistent surface profile. The intumescent coating contractor applied the new system to a perfectly prepared substrate. The project completed on programme and the building achieved its upgraded fire resistance rating.",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663301568782/CYVSNVCfCqJAX7JT23JqdG/manus-storage/IMG_3354_1d9bb82e.webp"
      }
    ],
    faqs: [
      {
        question: "Can you remove hard epoxy coatings?",
        answer: "Yes. Shot blasting is highly effective at removing hard epoxy coatings, including two-pack epoxy, coal tar epoxy, and high-build epoxy systems. We select blast media and pressure settings appropriate for the coating type and substrate to achieve complete removal without damaging the steel."
      },
      {
        question: "Can you remove intumescent coatings?",
        answer: "Yes. We regularly remove intumescent coatings from structural steelwork as part of refurbishment and change-of-use projects. Shot blasting removes intumescent coatings completely and prepares the surface for a new fire protection system."
      },
      {
        question: "What if only part of the coating has failed?",
        answer: "We can treat the entire structure to ensure a consistent surface condition, or we can spot-treat areas where the coating has failed. The appropriate approach depends on the extent of failure and the requirements of the replacement coating specification. We will advise on the most cost-effective approach after inspecting the structure."
      },
      {
        question: "Do you offer this service nationwide?",
        answer: "Yes. Our mobile teams operate across England and Wales. Contact us to discuss your project and we will provide a site visit and quotation."
      }
    ]
  },
  {
    id: "agricultural-shot-blasting",
    title: "Agricultural Shot Blasting",
    shortTitle: "Agricultural Blasting",
    tagline: "Shot Blasting for Agricultural Machinery, Equipment & Buildings",
    description: "We provide specialist shot blasting services for the agricultural sector — from tractors and farm machinery to grain stores, livestock buildings, and agricultural steelwork. Our mobile service comes to your farm or yard, removing rust, old paint, and surface contamination from agricultural equipment and structures to prepare them for protective coatings that extend service life and reduce long-term maintenance costs.",
    heroImage: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80",
    benefits: [
      "Mobile service — we come to your farm or yard",
      "Removes rust and old paint from agricultural machinery",
      "Extends equipment and building service life",
      "Prepares surfaces for protective coatings",
      "Suitable for tractors, implements, and farm buildings",
      "Reduces long-term maintenance costs"
    ],
    process: [
      { step: 1, title: "Equipment Assessment", description: "We inspect the agricultural machinery or structure to assess corrosion levels, identify any components requiring protection, and determine the appropriate blast media and pressure settings." },
      { step: 2, title: "Component Preparation", description: "Mechanical components, bearings, seals, and non-steel parts are masked or removed as required. Surrounding areas are protected to control blast media and debris." },
      { step: 3, title: "Shot Blasting", description: "Using appropriate blast media and controlled pressure, we systematically remove rust, old paint, and surface contaminants from all accessible surfaces to achieve the required cleanliness for protective coating." },
      { step: 4, title: "Quality Inspection", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications for the coating system." },
      { step: 5, title: "Coating Coordination", description: "Cleaned surfaces are primed promptly to prevent re-rusting. We coordinate timing with your coating contractor or can recommend suitable agricultural coating systems." }
    ],
    applications: [
      "Tractors and agricultural vehicles",
      "Farm implements and attachments",
      "Grain stores and storage bins",
      "Livestock building steelwork",
      "Agricultural trailers and tankers",
      "Farm gates and fencing",
      "Irrigation equipment",
      "Agricultural building cladding"
    ],
    caseStudies: [
      {
        title: "Farm Grain Store Steelwork Restoration",
        client: "Arable Farm, Lincolnshire",
        challenge: "A large grain store had developed significant corrosion on its structural steelwork and cladding fixings after years of exposure to the agricultural environment. The farm manager needed the steelwork prepared and recoated before the harvest season to protect the grain store from further deterioration.",
        solution: "We mobilised to the farm during a quiet period before harvest and shot blasted all structural steelwork and affected cladding areas to Sa 2.5. The work was completed in two days, allowing the coating contractor to apply the protective system in time for harvest.",
        result: "The grain store steelwork was restored to a clean, profiled surface and recoated with a high-build agricultural coating system. The farm manager reported that the building looked as good as new and was confident it would provide many more years of service. The project completed well within the harvest deadline.",
        image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80"
      }
    ],
    faqs: [
      {
        question: "Can you treat tractors and farm machinery on-site?",
        answer: "Yes. Our mobile service brings all equipment to your farm or yard. We can treat tractors, implements, and other agricultural machinery in situ without the need for transportation. We work around your operational requirements and can schedule work during quieter periods."
      },
      {
        question: "What coatings do you recommend for agricultural equipment?",
        answer: "For agricultural machinery, we typically recommend a zinc-rich primer followed by a high-build epoxy or polyurethane topcoat. For farm buildings, agricultural-grade coatings designed for the specific environment are most appropriate. We can advise on suitable coating systems based on your specific requirements."
      },
      {
        question: "Can you treat farm buildings as well as machinery?",
        answer: "Yes. We treat both agricultural machinery and farm buildings including grain stores, livestock buildings, and agricultural steelwork. Our mobile service can handle structures of any size."
      },
      {
        question: "Do you offer this service nationwide?",
        answer: "Yes. Our mobile teams operate across England and Wales. We regularly work on farms throughout the Midlands, East Anglia, Yorkshire, and the South West. Contact us to discuss your project and we will provide a site visit and quotation."
      }
    ]
  }
];

export function getServiceById(id: string): ServiceData | undefined {
  return services.find(service => service.id === id);
}
