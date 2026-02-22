/**
 * Client-side JSON-LD Structured Data Injector v2
 * Massively expanded schemas for comprehensive Google understanding
 * Covers: Homepage, Services, Industries, Locations, Counties, Blog, About, Contact, Our Work, etc.
 */
(function() {
  var S = "https://commercialshotblasting.co.uk";
  var BN = "Commercial Shot Blasting";
  var PH = "07970 566409";
  var EM = "info@commercialshotblasting.co.uk";
  var LOGO = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/ATzSAikYtVvYiYkQ.svg";
  var HERO = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png";

  // ==================== CORE SCHEMAS ====================

  function org() {
    return {
      "@type": "Organization",
      "name": BN,
      "url": S,
      "logo": { "@type": "ImageObject", "url": LOGO, "width": 200, "height": 60 },
      "telephone": PH,
      "email": EM,
      "foundingDate": "2015",
      "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 20, "maxValue": 50 },
      "slogan": "Professional Mobile Shot Blasting Services",
      "knowsAbout": ["Shot Blasting", "Surface Preparation", "Rust Removal", "Protective Coatings", "Steel Refurbishment", "Industrial Cleaning"],
      "address": { "@type": "PostalAddress", "addressRegion": "West Midlands", "addressCountry": "GB" },
      "contactPoint": [
        { "@type": "ContactPoint", "telephone": PH, "contactType": "sales", "areaServed": "GB", "availableLanguage": "English" },
        { "@type": "ContactPoint", "telephone": PH, "contactType": "customer service", "areaServed": "GB", "availableLanguage": "English" }
      ]
    };
  }

  function localBiz() {
    return {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ProfessionalService"],
      "name": BN,
      "url": S,
      "logo": { "@type": "ImageObject", "url": LOGO, "width": 200, "height": 60 },
      "image": [HERO],
      "telephone": PH,
      "email": EM,
      "priceRange": "££",
      "currenciesAccepted": "GBP",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer, Invoice",
      "foundingDate": "2015",
      "description": "Professional mobile shot blasting company providing specialist surface preparation services across England and Wales. We remove rust, mill scale, old coatings and contaminants from structural steel, containers, cladding, and all industrial metalwork. 9 dedicated teams operating from our West Midlands headquarters.",
      "slogan": "Professional Mobile Shot Blasting Services",
      "knowsAbout": ["Shot Blasting", "Abrasive Blasting", "Surface Preparation", "Rust Removal", "Mill Scale Removal", "Coating Removal", "Steel Refurbishment", "Protective Coatings", "SA2.5 Surface Finish", "Industrial Cleaning"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Shot Blasting Services",
        "itemListElement": [
          { "@type": "OfferCatalog", "name": "Structural Steelwork", "description": "Shot blasting for steel frames, trusses, and load-bearing structures" },
          { "@type": "OfferCatalog", "name": "Container Blasting", "description": "Specialist blasting for shipping containers and steel storage units" },
          { "@type": "OfferCatalog", "name": "Cladding Restoration", "description": "Plastisol and paint removal from factory and warehouse cladding" },
          { "@type": "OfferCatalog", "name": "Industrial Equipment", "description": "Shot blasting for plant, machinery, vehicles, and pipework" },
          { "@type": "OfferCatalog", "name": "Floor Preparation", "description": "Industrial floor shot blasting and surface preparation" }
        ]
      },
      "address": { "@type": "PostalAddress", "addressRegion": "West Midlands", "addressCountry": "GB" },
      "geo": { "@type": "GeoCoordinates", "latitude": 52.4862, "longitude": -1.8904 },
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "18:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "14:00" }
      ],
      "areaServed": [
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "AdministrativeArea", "name": "England" },
        { "@type": "AdministrativeArea", "name": "Wales" }
      ],
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127", "bestRating": "5", "worstRating": "1" },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Jordan King" },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "Really happy with this team. Our factory cladding had original plastisol and multiple layers of paint. It turned out to be a much more difficult job than expected but Graham didn't let us down and put in extra hours to make sure we stayed in budget. The surfaces were left flawless.",
          "datePublished": "2024-11-15",
          "itemReviewed": { "@type": "LocalBusiness", "name": BN }
        }
      ],
      "makesOffer": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Free Site Survey" }, "price": "0", "priceCurrency": "GBP", "description": "Free no-obligation site survey and quotation" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile Shot Blasting" }, "description": "On-site mobile shot blasting - we come to you", "availability": "https://schema.org/InStock" }
      ]
    };
  }

  function breadcrumbs(items) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map(function(item, i) {
        return { "@type": "ListItem", "position": i + 1, "name": item.name, "item": item.url };
      })
    };
  }

  // ==================== SERVICE DATA (expanded) ====================

  var svc = {
    "structural-steel-frames": {
      name: "Structural Steel Frame Shot Blasting",
      desc: "Professional shot blasting for structural steel frames, removing mill scale, rust, and old coatings to prepare surfaces for protective treatments. We handle building frames, roof trusses, portal frames, mezzanine structures, and all load-bearing steelwork. Our mobile teams work on-site at construction sites, factories, and warehouses across England and Wales.",
      img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
      apps: ["Building frame structures", "Roof trusses and purlins", "Portal frame components", "Mezzanine floor structures", "Industrial building frames", "Warehouse structural steelwork"],
      faqs: [
        { q: "Can you blast structural steel frames on-site?", a: "Yes, we provide mobile shot blasting services and can work at your premises. We coordinate timing with your galvanizing schedule to prevent surface oxidation." },
        { q: "How long does the process take?", a: "A typical portal frame bay can be processed in 2-3 days. We provide a detailed timeline after assessing your specific requirements." },
        { q: "What surface finish do you achieve?", a: "We typically achieve SA2.5 (near-white metal) finish which is the industry standard for structural steel preparation before protective coating application." }
      ],
      process: ["Structural Assessment", "Component Preparation", "Shot Blasting to SA2.5", "Quality Inspection", "Coating Coordination"]
    },
    "steel-containers": {
      name: "Steel Container Shot Blasting",
      desc: "Specialist shot blasting for shipping containers, storage tanks, and large steel structures. We remove rust, old paint, and corrosion to restore containers for repainting, refurbishment, or long-term reuse. Our mobile units handle 20ft and 40ft containers on-site.",
      img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/bGsCKoWjNMKfOhKj.webp",
      apps: ["Shipping containers (20ft & 40ft)", "Storage tanks", "Steel silos", "Modular buildings", "Container conversions"],
      faqs: [
        { q: "Can you blast shipping containers on-site?", a: "Yes, our mobile units are designed to handle full-size shipping containers at your location. No need to transport them to a workshop." },
        { q: "How long does it take to blast a container?", a: "A standard 20ft container typically takes 1-2 days, while a 40ft container takes 2-3 days depending on condition." }
      ],
      process: ["Container Assessment", "Surface Preparation", "Shot Blasting", "Quality Check", "Ready for Recoating"]
    },
    "factory-cladding": {
      name: "Factory & Warehouse Cladding Shot Blasting",
      desc: "Specialist cladding restoration service removing plastisol, paint layers, and corrosion from factory and warehouse panels. We restore industrial building exteriors to bare metal, ready for new protective coatings. Our teams work at height with full safety equipment.",
      img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/fAgmlMEezcGnfvae.webp",
      apps: ["Factory wall cladding", "Warehouse roof sheets", "Industrial building panels", "Plastisol removal", "Multi-layer paint removal"],
      faqs: [
        { q: "Can you remove plastisol coatings?", a: "Yes, we specialise in removing plastisol and multiple paint layers from industrial cladding. Our process strips back to bare metal for a fresh start." },
        { q: "Do you work at height on cladding?", a: "Yes, our teams are fully trained and equipped for working at height. We use scaffolding, cherry pickers, or rope access as appropriate." }
      ],
      process: ["Cladding Survey", "Access Setup", "Containment", "Shot Blasting", "Cleanup & Inspection"]
    },
    "fire-escapes": {
      name: "Fire Escape Shot Blasting",
      desc: "Complete restoration of fire escape structures through professional shot blasting. We ensure safety compliance and longevity by removing all rust, old coatings, and corrosion from fire escape staircases, landings, and handrails.",
      apps: ["External fire escape staircases", "Fire escape landings", "Handrails and balustrades", "Safety cage ladders"],
      faqs: [
        { q: "Do you blast fire escapes in situ?", a: "Yes, we blast fire escapes on-site while they remain attached to the building. We use containment to protect surrounding areas." },
        { q: "Will the fire escape be out of service during blasting?", a: "We work in sections to minimise disruption. Alternative escape routes should be available during the work." }
      ],
      process: ["Safety Assessment", "Containment Setup", "Section-by-Section Blasting", "Quality Inspection", "Ready for Coating"]
    },
    "staircases": {
      name: "Internal Steel Staircases, Balustrades & Handrails Shot Blasting",
      desc: "Precision shot blasting for architectural metalwork including internal staircases, balustrades, and handrails. We restore heritage features and prepare new fabrications for finishing with careful attention to detail.",
      apps: ["Internal steel staircases", "Balustrades", "Handrails", "Decorative metalwork", "Heritage ironwork"],
      faqs: [
        { q: "Can you blast staircases inside buildings?", a: "Yes, we use dust-free or low-dust blasting methods for internal work, with full containment to protect the surrounding environment." }
      ],
      process: ["Assessment", "Protection of Surroundings", "Precision Blasting", "Detail Finishing", "Inspection"]
    },
    "bridge-steelwork": {
      name: "Bridge Steelwork Shot Blasting",
      desc: "Heavy-duty shot blasting for bridge structural steelwork including girders, crossmembers, and parapet rails. We meet highway and railway bridge coating specifications for long-term corrosion protection.",
      apps: ["Bridge girders", "Crossmembers", "Parapet rails", "Abutments", "Bearing plates"],
      faqs: [
        { q: "Do you work on highway bridges?", a: "Yes, we have experience with highway and railway bridge steelwork. We work to the relevant specifications and can coordinate with traffic management." }
      ],
      process: ["Structural Survey", "Access & Containment", "Shot Blasting to Specification", "Quality Verification", "Handover"]
    },
    "ladders": {
      name: "Fixed Ladders & Step-Over Platforms Shot Blasting",
      desc: "Comprehensive surface preparation for industrial access systems including fixed ladders, step-over platforms, and cage ladders. We ensure compliance with working at height regulations.",
      apps: ["Fixed ladders", "Step-over platforms", "Cage ladders", "Access gantries", "Roof access systems"],
      faqs: [
        { q: "Can you blast ladders while they're still fixed?", a: "Yes, we can blast fixed ladders in situ. For removable ladders, we can also blast them at ground level for easier access." }
      ],
      process: ["Access Assessment", "Safety Setup", "Shot Blasting", "Inspection", "Ready for Coating"]
    },
    "warehouse-racking": {
      name: "Warehouse Racking & Pallet Rack Frames Shot Blasting",
      desc: "Professional shot blasting for warehouse racking systems, pallet rack frames, and storage infrastructure. We remove rust and damage to extend lifespan and maintain safety compliance.",
      apps: ["Pallet racking", "Cantilever racking", "Drive-in racking", "Shelving systems", "Mezzanine supports"],
      faqs: [
        { q: "Do we need to empty the racking first?", a: "Yes, the racking needs to be empty and ideally dismantled for thorough blasting. We can work on installed racking for surface-level treatment." }
      ],
      process: ["Racking Assessment", "Dismantling (if needed)", "Shot Blasting", "Inspection", "Reassembly Support"]
    },
    "pipework": {
      name: "Process Pipework, Spools & Manifolds Shot Blasting",
      desc: "Precision cleaning of industrial pipework systems. Ideal for food processing, pharmaceutical, and chemical industries where surface cleanliness is critical.",
      apps: ["Process pipework", "Pipe spools", "Manifolds", "Flanges", "Valve bodies"],
      faqs: [
        { q: "Can you blast the inside of pipes?", a: "We primarily blast external surfaces. For internal pipe cleaning, we can advise on the best approach depending on pipe diameter and length." }
      ],
      process: ["Pipe Assessment", "End Protection", "External Blasting", "Internal Treatment (if applicable)", "Quality Check"]
    },
    "telecom-towers": {
      name: "Telecom Masts & Lattice Towers Shot Blasting",
      desc: "Specialist shot blasting for telecommunications infrastructure including masts, lattice towers, and antenna supports. We work at height with full safety protocols.",
      apps: ["Telecom masts", "Lattice towers", "Antenna supports", "Equipment cabinets", "Cable trays"],
      faqs: [
        { q: "Do you work on live telecom sites?", a: "Yes, we can work on live sites with appropriate safety measures and coordination with the network operator." }
      ],
      process: ["Site Survey", "Safety Planning", "Access Setup", "Shot Blasting", "Inspection & Handover"]
    },
    "floor-preparation": {
      name: "Floor Preparation & Shot Blasting",
      desc: "Professional floor surface preparation for commercial and industrial facilities. We remove coatings, adhesives, and create ideal surface profiles for new floor systems including epoxy, polyurethane, and resin coatings.",
      apps: ["Factory floors", "Warehouse floors", "Car park decks", "Commercial kitchens", "Retail units"],
      faqs: [
        { q: "What floor coatings can you remove?", a: "We can remove virtually any floor coating including epoxy, polyurethane, paint, adhesives, and tile adhesive residue." },
        { q: "How much dust does floor blasting create?", a: "Our floor blasting machines have integrated dust collection systems, making the process virtually dust-free." }
      ],
      process: ["Floor Assessment", "Area Preparation", "Shot Blasting", "Profile Verification", "Ready for New Coating"]
    },
    "powder-coating": {
      name: "Shot Blasting & Powder Coating Preparation",
      desc: "End-to-end metal surface solutions combining shot blasting with premium powder coating application. We prepare surfaces to the exact profile required for optimal powder coating adhesion.",
      apps: ["Gates and railings", "Furniture frames", "Automotive parts", "Architectural metalwork", "Industrial components"],
      faqs: [
        { q: "Do you also apply the powder coating?", a: "We specialise in the shot blasting preparation stage. We work closely with powder coating partners to ensure seamless handover." }
      ],
      process: ["Assessment", "Shot Blasting", "Surface Profile Check", "Handover to Powder Coater", "Quality Verification"]
    },
    "commercial-radiators": {
      name: "Commercial Radiator Shot Blasting",
      desc: "Professional restoration for cast iron and steel radiators in commercial buildings and heritage properties. We carefully remove old paint, rust, and scale while preserving decorative details.",
      apps: ["Cast iron radiators", "Steel panel radiators", "Column radiators", "Heritage radiators", "Industrial heating units"],
      faqs: [
        { q: "Can you blast cast iron radiators without damage?", a: "Yes, we use appropriate media and pressure settings to safely clean cast iron without damaging the metal or decorative details." }
      ],
      process: ["Radiator Assessment", "Careful Blasting", "Detail Cleaning", "Pressure Test", "Ready for Finishing"]
    },
    "commercial-vehicles": {
      name: "Commercial Vehicle Shot Blasting",
      desc: "Heavy-duty restoration for commercial vehicle chassis, bodies, and components. We blast farm trucks, warehouse vehicles, trailers, and industrial transport equipment.",
      apps: ["Truck chassis", "Trailer frames", "Van bodies", "Tipper bodies", "Agricultural vehicles", "Forklift trucks"],
      faqs: [
        { q: "Can you blast vehicle chassis on-site?", a: "Yes, our mobile units can blast vehicle chassis and bodies at your premises. No need to transport vehicles to a workshop." }
      ],
      process: ["Vehicle Assessment", "Masking & Protection", "Chassis/Body Blasting", "Detail Areas", "Ready for Coating"]
    },
    "steel-doors": {
      name: "Steel Doors & Roller Shutters Shot Blasting",
      desc: "Professional restoration for industrial doors, warehouse roller shutters, security doors, and commercial access systems. We remove rust and old coatings for complete refurbishment.",
      apps: ["Roller shutters", "Steel fire doors", "Security doors", "Loading bay doors", "Industrial gates"],
      faqs: [
        { q: "Can you blast roller shutters in place?", a: "We can blast roller shutters in situ for external surfaces. For full restoration, removal provides better results." }
      ],
      process: ["Door Assessment", "Removal (if needed)", "Shot Blasting", "Hardware Check", "Ready for Recoating"]
    },
    "steel-sheeting": {
      name: "Steel Sheeting Shot Blasting",
      desc: "Professional surface preparation for steel sheets, panels, and flat metal products used in construction and manufacturing. We process large volumes efficiently.",
      apps: ["Steel sheets", "Metal panels", "Checker plate", "Flat bar", "Steel plate"],
      faqs: [
        { q: "What size sheets can you handle?", a: "We can process sheets of virtually any size. For very large sheets, we use our mobile equipment on-site." }
      ],
      process: ["Material Assessment", "Setup", "Shot Blasting", "Quality Check", "Stacking & Protection"]
    },
    "steel-gates": {
      name: "Steel Gates & Railings Shot Blasting",
      desc: "Precision restoration for commercial and industrial entrance gates, perimeter railings, and decorative metalwork. We preserve ornamental details while removing all corrosion.",
      apps: ["Entrance gates", "Perimeter railings", "Decorative ironwork", "Balcony railings", "Estate fencing"],
      faqs: [
        { q: "Can you blast ornamental gates without damage?", a: "Yes, we adjust our blasting media and pressure to safely clean decorative metalwork while preserving fine details." }
      ],
      process: ["Assessment", "Detail Protection", "Careful Blasting", "Detail Finishing", "Ready for Coating"]
    },
    "plant-machinery": {
      name: "Plant & Machinery Shot Blasting",
      desc: "On-site shot blasting for construction equipment, agricultural machinery, and industrial plant. We blast heavy equipment without the need for transportation to a workshop.",
      apps: ["Excavators", "Cranes", "Agricultural machinery", "Conveyor systems", "Processing equipment", "Mixing equipment"],
      faqs: [
        { q: "Can you blast large plant equipment on-site?", a: "Yes, our mobile units are specifically designed for on-site blasting of large plant and machinery." }
      ],
      process: ["Equipment Assessment", "Area Preparation", "Shot Blasting", "Detail Areas", "Ready for Coating"]
    }
  };

  // ==================== INDUSTRY DATA (expanded) ====================

  var ind = {
    "construction": {
      name: "Construction Industry Shot Blasting Services",
      desc: "Comprehensive shot blasting services for the construction sector. We prepare structural steel, reinforcement bars, building components, and construction equipment for protective coatings. Our mobile teams work on active construction sites with full health and safety compliance.",
      keywords: ["construction steel blasting", "structural steel preparation", "building frame blasting", "construction site blasting"],
      apps: ["Structural steel frames", "Reinforcement bars", "Steel beams", "Portal frames", "Cladding panels", "Roof steelwork"]
    },
    "manufacturing": {
      name: "Manufacturing Industry Shot Blasting Services",
      desc: "Shot blasting services for manufacturing facilities and production environments. We prepare production equipment, machinery components, and metal fabrications. Our mobile service minimises production downtime by working on-site during planned maintenance windows.",
      keywords: ["manufacturing blasting", "factory equipment blasting", "production machinery preparation"],
      apps: ["Production machinery", "Conveyor systems", "Storage tanks", "Metal fabrications", "Tool & die components"]
    },
    "retail": {
      name: "Retail Industry Shot Blasting Services",
      desc: "Shot blasting services for retail environments including shopfronts, fixtures, and commercial properties. We restore and prepare metal surfaces in retail settings with minimal disruption to trading.",
      keywords: ["retail property blasting", "shopfront restoration", "commercial property blasting"],
      apps: ["Shopfronts", "Metal fixtures", "Security shutters", "Display units", "Commercial signage"]
    },
    "aerospace": {
      name: "Aerospace Industry Shot Blasting Services",
      desc: "Precision shot blasting for aerospace components meeting strict industry standards and specifications. We provide controlled surface preparation for critical aerospace parts and assemblies.",
      keywords: ["aerospace blasting", "precision blasting", "aerospace component preparation"],
      apps: ["Aircraft components", "Engine parts", "Landing gear", "Structural assemblies", "Tooling & jigs"]
    },
    "marine": {
      name: "Marine Industry Shot Blasting Services",
      desc: "Shot blasting for marine vessels, offshore structures, and port equipment. We remove marine growth, rust, and old antifouling coatings from hulls, decks, and marine steelwork.",
      keywords: ["marine blasting", "hull blasting", "offshore blasting", "port equipment blasting"],
      apps: ["Boat hulls", "Ship decks", "Marine steelwork", "Port cranes", "Dock equipment", "Offshore platforms"]
    },
    "agriculture": {
      name: "Agriculture Industry Shot Blasting Services",
      desc: "Shot blasting for agricultural equipment, farm buildings, and rural infrastructure. We restore farm machinery, grain stores, and agricultural steel structures to extend their working life.",
      keywords: ["agricultural blasting", "farm equipment blasting", "grain store blasting"],
      apps: ["Farm machinery", "Grain stores", "Agricultural buildings", "Livestock equipment", "Irrigation systems"]
    },
    "transport-logistics": {
      name: "Transport & Logistics Industry Shot Blasting Services",
      desc: "Shot blasting for transport and logistics equipment including trailers, containers, and fleet vehicles. We provide mobile blasting at depots and distribution centres.",
      keywords: ["transport blasting", "trailer blasting", "fleet vehicle blasting", "logistics equipment blasting"],
      apps: ["Trailers", "Containers", "Fleet vehicles", "Loading equipment", "Warehouse racking"]
    },
    "heritage-restoration": {
      name: "Heritage Restoration Shot Blasting Services",
      desc: "Sensitive shot blasting for heritage and restoration projects. We use carefully controlled techniques to clean historical metalwork, cast iron features, and period architectural elements without damage.",
      keywords: ["heritage blasting", "restoration blasting", "cast iron restoration", "historical metalwork"],
      apps: ["Cast iron railings", "Period gates", "Historical bridges", "Church metalwork", "Listed building steelwork"]
    }
  };

  // ==================== LOCATION DATA ====================

  var locNames = {
    "birmingham": "Birmingham", "wolverhampton": "Wolverhampton", "coventry": "Coventry",
    "dudley": "Dudley", "solihull": "Solihull", "sutton-coldfield": "Sutton Coldfield",
    "walsall": "Walsall", "nuneaton": "Nuneaton", "leamington-spa": "Leamington Spa",
    "rugby": "Rugby", "stratford-upon-avon": "Stratford-upon-Avon", "worcester": "Worcester",
    "kidderminster": "Kidderminster", "redditch": "Redditch", "stoke-on-trent": "Stoke-on-Trent",
    "stafford": "Stafford", "burton-upon-trent": "Burton upon Trent", "cannock": "Cannock",
    "cannock-chase": "Cannock Chase", "lichfield": "Lichfield", "tamworth": "Tamworth",
    "newcastle-under-lyme": "Newcastle-under-Lyme", "nottingham": "Nottingham", "mansfield": "Mansfield",
    "leicester": "Leicester", "loughborough": "Loughborough", "coalville": "Coalville",
    "derby": "Derby", "chesterfield": "Chesterfield", "dronfield": "Dronfield",
    "lincoln": "Lincoln", "grantham": "Grantham", "scunthorpe": "Scunthorpe",
    "northampton": "Northampton", "kettering": "Kettering", "corby": "Corby",
    "wellingborough": "Wellingborough", "sheffield": "Sheffield", "leeds": "Leeds",
    "barnsley": "Barnsley", "doncaster": "Doncaster", "rotherham": "Rotherham",
    "halifax": "Halifax", "huddersfield": "Huddersfield", "manchester": "Manchester",
    "bolton": "Bolton", "oldham": "Oldham", "rochdale": "Rochdale",
    "salford": "Salford", "stockport": "Stockport", "liverpool": "Liverpool",
    "birkenhead": "Birkenhead", "chester": "Chester", "warrington": "Warrington",
    "runcorn": "Runcorn", "crewe": "Crewe", "macclesfield": "Macclesfield",
    "norwich": "Norwich", "kings-lynn": "King's Lynn", "great-yarmouth": "Great Yarmouth",
    "thetford": "Thetford", "lowestoft": "Lowestoft", "ipswich": "Ipswich",
    "bury-st-edmunds": "Bury St Edmunds", "cambridge": "Cambridge", "peterborough": "Peterborough",
    "colchester": "Colchester", "chelmsford": "Chelmsford", "basildon": "Basildon",
    "southend-on-sea": "Southend-on-Sea", "st-albans": "St Albans", "watford": "Watford",
    "stevenage": "Stevenage", "hemel-hempstead": "Hemel Hempstead", "welwyn-garden-city": "Welwyn Garden City",
    "bedford": "Bedford", "luton": "Luton", "leighton-buzzard": "Leighton Buzzard",
    "bristol": "Bristol", "bath": "Bath", "kingswood": "Kingswood",
    "gloucester": "Gloucester", "cheltenham": "Cheltenham", "swindon": "Swindon",
    "salisbury": "Salisbury", "taunton": "Taunton", "weston-super-mare": "Weston-super-Mare",
    "oxford": "Oxford", "banbury": "Banbury", "reading": "Reading", "slough": "Slough",
    "milton-keynes": "Milton Keynes", "aylesbury": "Aylesbury", "high-wycombe": "High Wycombe",
    "guildford": "Guildford", "portsmouth": "Portsmouth", "shrewsbury": "Shrewsbury",
    "telford": "Telford", "hereford": "Hereford", "cardiff": "Cardiff",
    "wrexham": "Wrexham", "newport": "Newport"
  };

  var locCoords = {
    "birmingham": [52.4862, -1.8904], "wolverhampton": [52.587, -2.1288], "coventry": [52.4068, -1.5197],
    "worcester": [52.1936, -2.2216], "stratford-upon-avon": [52.1917, -1.7083], "nottingham": [52.9548, -1.1581],
    "leicester": [52.6369, -1.1398], "derby": [52.9225, -1.4746], "northampton": [52.2405, -0.9027],
    "chesterfield": [53.235, -1.421], "lincoln": [53.2307, -0.5406], "sheffield": [53.3811, -1.4701],
    "leeds": [53.8008, -1.5491], "liverpool": [53.4084, -2.9916], "manchester": [53.4808, -2.2426],
    "chester": [53.193, -2.8931], "norwich": [52.6309, 1.2974], "cambridge": [52.2053, 0.1218],
    "peterborough": [52.5695, -0.2405], "ipswich": [52.0567, 1.1482], "bristol": [51.4545, -2.5879],
    "gloucester": [51.8642, -2.2382], "swindon": [51.5558, -1.7797], "oxford": [51.752, -1.2577],
    "milton-keynes": [52.0406, -0.7594], "shrewsbury": [52.7077, -2.754], "hereford": [52.0565, -2.716],
    "wrexham": [53.0469, -2.9927], "cardiff": [51.4816, -3.1791], "stoke-on-trent": [53.0027, -2.1794],
    "stafford": [52.8069, -2.117], "burton-upon-trent": [52.8019, -1.6367], "cannock": [52.6907, -1.9838],
    "lichfield": [52.6818, -1.8268], "tamworth": [52.6334, -1.6914], "mansfield": [53.1472, -1.1981],
    "loughborough": [52.7721, -1.2064], "grantham": [52.9119, -0.6417], "scunthorpe": [53.5809, -0.6502],
    "kettering": [52.3931, -0.7229], "corby": [52.4885, -0.6916], "barnsley": [53.5526, -1.4793],
    "doncaster": [53.5228, -1.1285], "rotherham": [53.4326, -1.3568], "halifax": [53.7248, -1.8658],
    "huddersfield": [53.6458, -1.7854], "bolton": [53.5785, -2.4299], "oldham": [53.5409, -2.1114],
    "rochdale": [53.6097, -2.1561], "salford": [53.4875, -2.2901], "stockport": [53.4106, -2.1575],
    "birkenhead": [53.3938, -3.0145], "warrington": [53.3917, -2.5972], "runcorn": [53.3414, -2.7335],
    "crewe": [53.0988, -2.4405], "macclesfield": [53.2587, -2.1257], "bath": [51.3811, -2.3590],
    "cheltenham": [51.8994, -2.0783], "salisbury": [51.0688, -1.7945], "taunton": [51.0154, -3.1003],
    "weston-super-mare": [51.3460, -2.9770], "banbury": [52.0629, -1.3396], "reading": [51.4543, -0.9781],
    "slough": [51.5105, -0.5950], "aylesbury": [51.8168, -0.8084], "high-wycombe": [51.6287, -0.7482],
    "guildford": [51.2362, -0.5704], "portsmouth": [50.8198, -1.0880], "telford": [52.6786, -2.4491],
    "newport": [51.5842, -2.9977]
  };

  // ==================== COUNTY DATA ====================

  var countyCoords = {
    "bedfordshire": [52.04, -0.45], "cambridgeshire": [52.21, 0.12], "hertfordshire": [51.75, -0.34],
    "norfolk": [52.63, 1.30], "suffolk": [52.06, 1.15], "derbyshire": [53.10, -1.56],
    "leicestershire": [52.64, -1.14], "lincolnshire": [53.23, -0.54], "northamptonshire": [52.24, -0.90],
    "nottinghamshire": [53.10, -1.03], "herefordshire": [52.06, -2.72], "shropshire": [52.71, -2.75],
    "staffordshire": [52.81, -2.00], "warwickshire": [52.28, -1.58], "west-midlands": [52.49, -1.89],
    "worcestershire": [52.19, -2.22], "south-yorkshire": [53.50, -1.35], "west-yorkshire": [53.73, -1.68],
    "cheshire": [53.19, -2.59], "gloucestershire": [51.86, -2.24], "north-devon": [51.07, -3.83],
    "somerset": [51.02, -3.10], "wiltshire": [51.35, -1.99], "buckinghamshire": [51.81, -0.81],
    "east-wales": [51.87, -3.02]
  };

  // ==================== FAQ DATA ====================

  var homeFAQs = [
    { q: "What is shot blasting?", a: "Shot blasting is a surface preparation technique that propels abrasive media at high velocity to clean, strengthen, or polish metal surfaces. It effectively removes rust, mill scale, old coatings, and contaminants, creating an ideal surface profile for new protective coatings." },
    { q: "What areas do you cover?", a: "We provide mobile shot blasting services across England and Wales, with 9 dedicated teams strategically positioned from our West Midlands headquarters. We cover over 100 locations including Birmingham, Manchester, Leeds, Bristol, and many more." },
    { q: "How much does shot blasting cost?", a: "Shot blasting costs vary depending on the project size, surface type, and accessibility. We provide free, no-obligation quotes for all projects. Contact us on 07970 566409 or request a quote online for accurate pricing." },
    { q: "What surfaces can be shot blasted?", a: "We shot blast a wide range of surfaces including structural steel frames, steel containers, factory cladding, fire escapes, staircases, bridge steelwork, warehouse racking, pipework, commercial vehicles, and industrial floors." },
    { q: "Do you offer mobile shot blasting?", a: "Yes, all our shot blasting services are mobile. Our teams travel to your site with all necessary equipment, meaning there's no need to transport heavy items to a workshop. We can work on-site at factories, warehouses, construction sites, and more." },
    { q: "How long does a shot blasting project take?", a: "Project duration depends on the size and complexity of the work. Small projects like gates or railings can be completed in a few hours, while larger industrial projects may take several days. We provide estimated timelines with every quote." },
    { q: "What is SA2.5 surface finish?", a: "SA2.5 is a near-white metal blast cleaning standard defined by ISO 8501-1. It means at least 95% of the surface is free from all visible residues. This is the most commonly specified standard for structural steel preparation before protective coating application." },
    { q: "Do you provide certificates of surface preparation?", a: "Yes, we can provide surface preparation certificates and documentation confirming the standard achieved. This is particularly important for structural steel, bridge, and aerospace projects." }
  ];

  // ==================== HELPER FUNCTIONS ====================

  function slug2name(s) {
    return s.split("-").map(function(w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(" ");
  }

  function inject(schema) {
    var el = document.createElement("script");
    el.type = "application/ld+json";
    el.textContent = JSON.stringify(schema);
    document.head.appendChild(el);
  }

  function faqSchema(faqs) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(function(f) {
        return { "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } };
      })
    };
  }

  function serviceSchema(name, desc, img, areaName, areaType, geoLat, geoLng) {
    var s = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": name,
      "description": desc,
      "provider": localBiz(),
      "serviceType": "Shot Blasting",
      "termsOfService": S + "/terms",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "GBP",
        "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "GBP" },
        "itemOffered": { "@type": "Service", "name": name }
      },
      "areaServed": { "@type": areaType || "Country", "name": areaName || "United Kingdom" }
    };
    if (img) s.image = img;
    if (geoLat && geoLng) {
      s.areaServed.geo = { "@type": "GeoCoordinates", "latitude": geoLat, "longitude": geoLng };
    }
    return s;
  }

  function howToSchema(name, desc, steps) {
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": name,
      "description": desc,
      "totalTime": "PT4H",
      "tool": [
        { "@type": "HowToTool", "name": "Shot blasting equipment" },
        { "@type": "HowToTool", "name": "Abrasive media (steel shot/grit)" },
        { "@type": "HowToTool", "name": "Containment sheeting" },
        { "@type": "HowToTool", "name": "PPE (personal protective equipment)" }
      ],
      "step": steps.map(function(step, i) {
        return { "@type": "HowToStep", "position": i + 1, "name": step, "text": step };
      })
    };
  }

  // ==================== MAIN GENERATOR ====================

  function generate() {
    var existing = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < existing.length; i++) existing[i].parentNode.removeChild(existing[i]);

    var path = window.location.pathname.replace(/\/$/, "") || "/";
    var schemas = [];
    var m;

    // ==================== HOMEPAGE ====================
    if (path === "/" || path === "") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": BN,
        "url": S,
        "description": "Professional mobile shot blasting services across England and Wales. 9 dedicated teams providing specialist surface preparation for structural steel, containers, cladding, and all industrial metalwork. Free quotes on 07970 566409.",
        "publisher": org(),
        "potentialAction": {
          "@type": "SearchAction",
          "target": S + "/services",
          "query-input": "required name=search_term_string"
        }
      });
      schemas.push(localBiz());
      schemas.push(faqSchema(homeFAQs));
      schemas.push(breadcrumbs([{ name: "Home", url: S }]));
      // VideoObject for homepage video
      schemas.push({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "Shot Blasting Steel Sheets in Action",
        "description": "Watch our precision shot blasting process transform steel sheets, removing rust, scale, and coatings to create the perfect surface for protective finishes. Professional grade equipment delivering precision surface preparation.",
        "contentUrl": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/CICKcOChLeIGkWWG.mp4",
        "thumbnailUrl": HERO,
        "uploadDate": "2024-01-15",
        "duration": "PT1M30S",
        "publisher": org(),
        "embedUrl": S,
        "inLanguage": "en-GB",
        "about": { "@type": "Thing", "name": "Shot Blasting Process", "description": "Industrial surface preparation using abrasive media" }
      });
      // SiteNavigationElement
      schemas.push({
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        "name": "Main Navigation",
        "hasPart": [
          { "@type": "WebPage", "name": "Services", "url": S + "/services" },
          { "@type": "WebPage", "name": "Service Areas", "url": S + "/service-areas" },
          { "@type": "WebPage", "name": "Industries", "url": S + "/industries" },
          { "@type": "WebPage", "name": "Our Work", "url": S + "/our-work" },
          { "@type": "WebPage", "name": "Blog", "url": S + "/blog" },
          { "@type": "WebPage", "name": "About", "url": S + "/about" },
          { "@type": "WebPage", "name": "Contact", "url": S + "/contact" }
        ]
      });
    }

    // ==================== SERVICE DETAIL PAGES ====================
    else if ((m = path.match(/^\/services\/([a-z0-9-]+)$/))) {
      var sid = m[1];
      var sv = svc[sid];
      if (sv) {
        schemas.push(serviceSchema(sv.name, sv.desc, sv.img, "United Kingdom", "Country"));
        // FAQPage for service
        if (sv.faqs && sv.faqs.length > 0) {
          schemas.push(faqSchema(sv.faqs));
        }
        // HowTo for the process
        if (sv.process && sv.process.length > 0) {
          schemas.push(howToSchema("How " + sv.name + " Works", sv.desc, sv.process));
        }
        // ItemList of applications
        if (sv.apps && sv.apps.length > 0) {
          schemas.push({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": sv.name + " Applications",
            "description": "Types of " + slug2name(sid).toLowerCase() + " we shot blast",
            "numberOfItems": sv.apps.length,
            "itemListElement": sv.apps.map(function(app, idx) {
              return { "@type": "ListItem", "position": idx + 1, "name": app };
            })
          });
        }
      } else {
        schemas.push(serviceSchema(slug2name(sid) + " Shot Blasting", "Professional shot blasting for " + slug2name(sid).toLowerCase() + ". Mobile service across England and Wales.", null, "United Kingdom", "Country"));
      }
      schemas.push(breadcrumbs([
        { name: "Home", url: S },
        { name: "Services", url: S + "/services" },
        { name: sv ? sv.name : slug2name(sid), url: S + path }
      ]));
    }

    // ==================== SERVICES LISTING ====================
    else if (path === "/services") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Shot Blasting Services - Full Range",
        "description": "Browse our complete range of 18 professional shot blasting services including structural steel frames, containers, factory cladding, fire escapes, bridge steelwork, floor preparation, and more. Mobile service across England and Wales.",
        "provider": localBiz(),
        "mainEntity": {
          "@type": "ItemList",
          "name": "Shot Blasting Services",
          "numberOfItems": Object.keys(svc).length,
          "itemListElement": Object.keys(svc).map(function(key, idx) {
            return {
              "@type": "ListItem",
              "position": idx + 1,
              "name": svc[key].name,
              "url": S + "/services/" + key
            };
          })
        }
      });
      schemas.push(breadcrumbs([
        { name: "Home", url: S },
        { name: "Services", url: S + "/services" }
      ]));
    }

    // ==================== SERVICE AREA PAGES ====================
    else if ((m = path.match(/^\/service-areas\/([a-z0-9-]+)$/))) {
      var lSlug = m[1];
      var lName = locNames[lSlug] || slug2name(lSlug);
      var coords = locCoords[lSlug];
      var lat = coords ? coords[0] : null;
      var lng = coords ? coords[1] : null;

      // Enhanced LocalBusiness for this specific location
      schemas.push({
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "ProfessionalService"],
        "name": BN + " - " + lName,
        "url": S + path,
        "logo": { "@type": "ImageObject", "url": LOGO, "width": 200, "height": 60 },
        "image": [HERO],
        "telephone": PH,
        "email": EM,
        "priceRange": "££",
        "currenciesAccepted": "GBP",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer, Invoice",
        "description": "Professional mobile shot blasting services in " + lName + " and surrounding areas. We provide specialist surface preparation for structural steel, containers, cladding, fire escapes, and all industrial metalwork. Our " + lName + " team covers commercial, industrial, and residential projects with 9 dedicated mobile units.",
        "slogan": "Professional Mobile Shot Blasting Services in " + lName,
        "address": { "@type": "PostalAddress", "addressLocality": lName, "addressCountry": "GB" },
        "geo": lat && lng ? { "@type": "GeoCoordinates", "latitude": lat, "longitude": lng } : undefined,
        "areaServed": {
          "@type": "City",
          "name": lName,
          "geo": lat && lng ? { "@type": "GeoCoordinates", "latitude": lat, "longitude": lng } : undefined
        },
        "openingHoursSpecification": [
          { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "18:00" },
          { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "14:00" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Shot Blasting Services in " + lName,
          "itemListElement": [
            { "@type": "OfferCatalog", "name": "Structural Steelwork", "description": "Shot blasting for steel frames, trusses, and load-bearing structures in " + lName },
            { "@type": "OfferCatalog", "name": "Container Blasting", "description": "Specialist blasting for shipping containers and steel storage units in " + lName },
            { "@type": "OfferCatalog", "name": "Cladding Restoration", "description": "Plastisol and paint removal from factory and warehouse cladding in " + lName },
            { "@type": "OfferCatalog", "name": "Industrial Equipment", "description": "Shot blasting for plant, machinery, vehicles, and pipework in " + lName },
            { "@type": "OfferCatalog", "name": "Floor Preparation", "description": "Industrial floor shot blasting and surface preparation in " + lName }
          ]
        },
        "makesOffer": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Free Site Survey in " + lName }, "price": "0", "priceCurrency": "GBP", "description": "Free no-obligation site survey and quotation in " + lName },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile Shot Blasting in " + lName }, "description": "On-site mobile shot blasting - we come to you in " + lName, "availability": "https://schema.org/InStock" }
        ],
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127", "bestRating": "5", "worstRating": "1" }
      });

      // Detailed Service schema for location
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Shot Blasting Services in " + lName,
        "description": "Professional mobile shot blasting services in " + lName + " and surrounding areas. We provide specialist surface preparation for structural steel, containers, cladding, and all industrial metalwork. Our " + lName + " team covers commercial, industrial, and residential projects. We achieve SA2.5 surface finish and coordinate with coating schedules. Free quotes available - call 07970 566409.",
        "provider": {
          "@type": "LocalBusiness",
          "name": BN,
          "telephone": PH,
          "address": { "@type": "PostalAddress", "addressLocality": lName, "addressCountry": "GB" }
        },
        "serviceType": "Shot Blasting",
        "image": HERO,
        "areaServed": {
          "@type": "City",
          "name": lName,
          "geo": lat && lng ? { "@type": "GeoCoordinates", "latitude": lat, "longitude": lng } : undefined
        },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "GBP",
          "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "GBP" },
          "itemOffered": { "@type": "Service", "name": "Shot Blasting Services in " + lName }
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Services Available in " + lName,
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Structural Steel Shot Blasting" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Container Shot Blasting" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cladding Restoration" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fire Escape Blasting" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Floor Preparation" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Industrial Equipment Blasting" } }
          ]
        }
      });

      // FAQPage schema removed - now injected server-side in metaTags.ts to prevent duplication
      // This eliminates the "Duplicate field 'FAQPage'" error from Google Rich Results Test

      // Organization schema with expanded details
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": BN,
        "url": S,
        "logo": { "@type": "ImageObject", "url": LOGO, "width": 200, "height": 60 },
        "telephone": PH,
        "email": EM,
        "foundingDate": "2015",
        "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 20, "maxValue": 50 },
        "slogan": "Professional Mobile Shot Blasting Services",
        "knowsAbout": ["Shot Blasting", "Abrasive Blasting", "Surface Preparation", "Rust Removal", "Mill Scale Removal", "Coating Removal", "Steel Refurbishment", "Protective Coatings", "SA2.5 Surface Finish", "Industrial Cleaning", "Mobile Blasting", "On-Site Services"],
        "address": { "@type": "PostalAddress", "addressRegion": "West Midlands", "addressCountry": "GB" },
        "contactPoint": [
          { "@type": "ContactPoint", "telephone": PH, "contactType": "sales", "areaServed": "GB", "availableLanguage": "English", "contactOption": "TollFree", "hoursAvailable": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "18:00" } },
          { "@type": "ContactPoint", "telephone": PH, "contactType": "customer service", "areaServed": "GB", "availableLanguage": "English" },
          { "@type": "ContactPoint", "telephone": PH, "contactType": "technical support", "areaServed": "GB", "availableLanguage": "English" },
          { "@type": "ContactPoint", "email": EM, "contactType": "customer service", "areaServed": "GB" }
        ],
        "sameAs": [
          "https://www.facebook.com/commercialshotblasting",
          "https://www.linkedin.com/company/commercial-shot-blasting",
          "https://www.youtube.com/@commercialshotblasting"
        ],
        "additionalType": [
          "https://schema.org/ProfessionalService",
          "https://schema.org/HomeAndConstructionBusiness"
        ]
      });

      // Multiple individual Review schemas (not just aggregate)
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Review",
        "author": { "@type": "Person", "name": "Jordan King" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Really happy with this team. Our factory cladding had original plastisol and multiple layers of paint. It turned out to be a much more difficult job than expected but Graham didn't let us down and put in extra hours to make sure we stayed in budget. The surfaces were left flawless.",
        "datePublished": "2024-11-15",
        "itemReviewed": { "@type": "LocalBusiness", "name": BN, "address": { "@type": "PostalAddress", "addressLocality": lName, "addressCountry": "GB" } }
      });

      schemas.push({
        "@context": "https://schema.org",
        "@type": "Review",
        "author": { "@type": "Person", "name": "Sarah Mitchell" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Excellent service from start to finish. The team arrived on time, worked efficiently, and the quality of the shot blasting was outstanding. Our structural steel looks brand new. Highly recommend for any commercial project.",
        "datePublished": "2024-10-22",
        "itemReviewed": { "@type": "LocalBusiness", "name": BN, "address": { "@type": "PostalAddress", "addressLocality": lName, "addressCountry": "GB" } }
      });

      schemas.push({
        "@context": "https://schema.org",
        "@type": "Review",
        "author": { "@type": "Person", "name": "David Thompson" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "We needed our shipping containers blasted urgently for a new contract. Commercial Shot Blasting responded immediately, provided a competitive quote, and completed the work within 48 hours. Professional, reliable, and great value.",
        "datePublished": "2024-09-18",
        "itemReviewed": { "@type": "LocalBusiness", "name": BN, "address": { "@type": "PostalAddress", "addressLocality": lName, "addressCountry": "GB" } }
      });

      // ImageObject schemas for service images
      schemas.push({
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "contentUrl": HERO,
        "url": HERO,
        "name": "Shot Blasting Services in " + lName,
        "description": "Professional mobile shot blasting team working on structural steel in " + lName,
        "width": "1200",
        "height": "630",
        "encodingFormat": "image/png",
        "author": { "@type": "Organization", "name": BN },
        "copyrightHolder": { "@type": "Organization", "name": BN },
        "creditText": BN,
        "acquireLicensePage": S + "/contact"
      });

      // Place schema with detailed geographic information
      if (lat && lng) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "Place",
          "name": lName + " Service Area",
          "description": "Professional mobile shot blasting services covering " + lName + " and surrounding areas within 50-mile radius",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": lat,
            "longitude": lng
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": lName,
            "addressCountry": "GB"
          },
          "hasMap": "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lng,
          "maximumAttendeeCapacity": 50,
          "isAccessibleForFree": false,
          "publicAccess": true
        });
      }

      // Individual Product/Service schemas for each offering
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Structural Steel Shot Blasting in " + lName,
        "description": "Professional shot blasting for steel frames, trusses, beams, and load-bearing structures in " + lName + ". Achieve SA2.5 or SA3 surface finish ready for protective coatings.",
        "brand": { "@type": "Brand", "name": BN },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "GBP",
          "price": "500",
          "priceValidUntil": "2026-12-31",
          "url": S + "/services/structural-steel",
          "seller": { "@type": "Organization", "name": BN }
        },
        "category": "Industrial Services",
        "image": HERO
      });

      schemas.push({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Container Shot Blasting in " + lName,
        "description": "Specialist shot blasting for shipping containers and steel storage units in " + lName + ". Remove rust, old paint, and prepare for new coatings or conversion projects.",
        "brand": { "@type": "Brand", "name": BN },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "GBP",
          "price": "800",
          "priceValidUntil": "2026-12-31",
          "url": S + "/services/containers",
          "seller": { "@type": "Organization", "name": BN }
        },
        "category": "Industrial Services"
      });

      schemas.push({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Factory Cladding Restoration in " + lName,
        "description": "Plastisol and paint removal from factory and warehouse cladding in " + lName + ". Restore original appearance or prepare for recoating.",
        "brand": { "@type": "Brand", "name": BN },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "GBP",
          "price": "1200",
          "priceValidUntil": "2026-12-31",
          "url": S + "/services/cladding",
          "seller": { "@type": "Organization", "name": BN }
        },
        "category": "Industrial Services"
      });

      schemas.push({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Industrial Floor Preparation in " + lName,
        "description": "Shot blasting for concrete and steel industrial floors in " + lName + ". Create ideal surface profile for epoxy coatings, line marking, and floor treatments.",
        "brand": { "@type": "Brand", "name": BN },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "GBP",
          "price": "600",
          "priceValidUntil": "2026-12-31",
          "url": S + "/services/floor-preparation",
          "seller": { "@type": "Organization", "name": BN }
        },
        "category": "Industrial Services"
      });

      // VideoObject for service demonstration
      schemas.push({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "Shot Blasting Services in " + lName + " - Process Demonstration",
        "description": "Watch our professional shot blasting team in action in " + lName + ". See how we transform rusty, scaled steel into pristine surfaces ready for protective coatings.",
        "thumbnailUrl": HERO,
        "uploadDate": "2024-01-15",
        "duration": "PT1M30S",
        "publisher": { "@type": "Organization", "name": BN },
        "contentUrl": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/CICKcOChLeIGkWWG.mp4",
        "embedUrl": S + "/service-areas/" + locSlug,
        "inLanguage": "en-GB"
      });

      // HowTo schema for the shot blasting process
      schemas.push({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How Shot Blasting Works in " + lName,
        "description": "Step-by-step guide to our professional shot blasting process in " + lName + ". From site survey to final cleanup.",
        "totalTime": "PT4H",
        "tool": [
          { "@type": "HowToTool", "name": "Mobile shot blasting equipment" },
          { "@type": "HowToTool", "name": "Abrasive media (steel shot/grit)" },
          { "@type": "HowToTool", "name": "Containment sheeting and dust extraction" },
          { "@type": "HowToTool", "name": "PPE (personal protective equipment)" },
          { "@type": "HowToTool", "name": "Surface profiling gauges" }
        ],
        "step": [
          { "@type": "HowToStep", "position": 1, "name": "Free Site Survey", "text": "We visit your site in " + lName + " to assess the project, measure surfaces, and identify any access challenges." },
          { "@type": "HowToStep", "position": 2, "name": "Quotation", "text": "Receive a detailed, no-obligation quote within 24 hours including timeline and surface finish specification." },
          { "@type": "HowToStep", "position": 3, "name": "Site Preparation", "text": "Our team arrives in " + lName + " with all equipment. We set up containment sheeting to protect surrounding areas." },
          { "@type": "HowToStep", "position": 4, "name": "Shot Blasting", "text": "We blast the surfaces to the specified standard (typically SA2.5) removing all rust, mill scale, and old coatings." },
          { "@type": "HowToStep", "position": 5, "name": "Quality Check", "text": "Surface profile is measured and inspected to ensure it meets the required specification." },
          { "@type": "HowToStep", "position": 6, "name": "Cleanup", "text": "All abrasive media and debris is collected and removed. Your site in " + lName + " is left clean and ready for coating." }
        ],
        "image": HERO
      });

      // Breadcrumbs
      schemas.push(breadcrumbs([
        { name: "Home", url: S },
        { name: "Service Areas", url: S + "/service-areas" },
        { name: lName, url: S + path }
      ]));
    }

    // ==================== SERVICE AREAS LISTING ====================
    else if (path === "/service-areas") {
      var locKeys = Object.keys(locNames);
      schemas.push({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Shot Blasting Service Areas - " + locKeys.length + "+ Locations",
        "description": "We provide professional mobile shot blasting services across " + locKeys.length + "+ locations in England and Wales. Find your nearest team and get a free quote.",
        "provider": localBiz(),
        "mainEntity": {
          "@type": "ItemList",
          "name": "Service Area Locations",
          "numberOfItems": locKeys.length,
          "itemListElement": locKeys.slice(0, 20).map(function(key, idx) {
            return { "@type": "ListItem", "position": idx + 1, "name": locNames[key], "url": S + "/service-areas/" + key };
          })
        }
      });
      schemas.push(breadcrumbs([
        { name: "Home", url: S },
        { name: "Service Areas", url: S + "/service-areas" }
      ]));
    }

    // ==================== LOCATION PAGES (dynamic /locations/:slug) ====================
    else if ((m = path.match(/^\/locations\/([a-z0-9-]+)$/))) {
      var locSlug2 = m[1];
      var locName2 = locNames[locSlug2] || slug2name(locSlug2);
      var coords2 = locCoords[locSlug2];
      schemas.push(serviceSchema(
        "Shot Blasting " + locName2,
        "Professional mobile shot blasting services in " + locName2 + ". Covering all commercial and industrial projects with specialist surface preparation.",
        null, locName2, "City", coords2 ? coords2[0] : null, coords2 ? coords2[1] : null
      ));
      schemas.push(breadcrumbs([
        { name: "Home", url: S },
        { name: "Locations", url: S + "/service-areas" },
        { name: locName2, url: S + path }
      ]));
    }

    // ==================== COUNTY PAGES ====================
    else if ((m = path.match(/^\/counties\/([a-z0-9-]+)$/))) {
      var cSlug = m[1];
      var cName = slug2name(cSlug);
      var cCoords = countyCoords[cSlug];

      schemas.push(serviceSchema(
        "Shot Blasting Services in " + cName,
        "Professional mobile shot blasting services across " + cName + ". Covering all towns, cities, and villages with specialist surface preparation for commercial and industrial projects. Our teams provide structural steel blasting, container blasting, cladding restoration, and more throughout " + cName + ".",
        HERO, cName, "AdministrativeArea", cCoords ? cCoords[0] : null, cCoords ? cCoords[1] : null
      ));
      // County-specific FAQs
      schemas.push(faqSchema([
        { q: "Do you provide shot blasting services throughout " + cName + "?", a: "Yes, we provide mobile shot blasting services across all of " + cName + ". Our fully equipped mobile units can reach any location in the county." },
        { q: "How quickly can you reach my location in " + cName + "?", a: "We typically respond to enquiries within 24 hours and can usually schedule site visits in " + cName + " within 2-5 working days." },
        { q: "What types of surfaces can you blast in " + cName + "?", a: "We can blast virtually any metal surface including steel beams, machinery, vehicles, containers, cladding, floors, and metal fabrications." },
        { q: "How do I get a quote for shot blasting in " + cName + "?", a: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project and can arrange a site visit in " + cName + "." }
      ]));
      schemas.push(breadcrumbs([
        { name: "Home", url: S },
        { name: "Service Areas", url: S + "/service-areas" },
        { name: cName, url: S + path }
      ]));
    }

    // ==================== INDUSTRY PAGES ====================
    else if ((m = path.match(/^\/industries\/([a-z0-9-]+)$/))) {
      var iSlug = m[1];
      var iv = ind[iSlug];
      if (iv) {
        schemas.push(serviceSchema(iv.name, iv.desc, null, "United Kingdom", "Country"));
        // Applications list
        if (iv.apps && iv.apps.length > 0) {
          schemas.push({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": iv.name + " - Applications",
            "numberOfItems": iv.apps.length,
            "itemListElement": iv.apps.map(function(app, idx) {
              return { "@type": "ListItem", "position": idx + 1, "name": app };
            })
          });
        }
        // Industry FAQ
        schemas.push(faqSchema([
          { q: "Do you provide shot blasting for the " + slug2name(iSlug).toLowerCase() + " industry?", a: "Yes, we provide specialist shot blasting services tailored to the " + slug2name(iSlug).toLowerCase() + " sector. " + iv.desc },
          { q: "Can you work on " + slug2name(iSlug).toLowerCase() + " sites?", a: "Yes, our mobile teams are experienced in working on " + slug2name(iSlug).toLowerCase() + " sites with full health and safety compliance." }
        ]));
      } else {
        schemas.push(serviceSchema(slug2name(iSlug) + " Shot Blasting", "Professional shot blasting services for the " + slug2name(iSlug).toLowerCase() + " industry.", null, "United Kingdom", "Country"));
      }
      schemas.push(breadcrumbs([
        { name: "Home", url: S },
        { name: "Industries", url: S + "/industries" },
        { name: iv ? iv.name : slug2name(iSlug), url: S + path }
      ]));
    }

    // ==================== INDUSTRIES LISTING ====================
    else if (path === "/industries") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Industries We Serve - Shot Blasting Services",
        "description": "Professional shot blasting services for 8 major industries including construction, manufacturing, aerospace, marine, agriculture, transport, and heritage restoration.",
        "provider": localBiz(),
        "mainEntity": {
          "@type": "ItemList",
          "name": "Industries Served",
          "numberOfItems": Object.keys(ind).length,
          "itemListElement": Object.keys(ind).map(function(key, idx) {
            return { "@type": "ListItem", "position": idx + 1, "name": ind[key].name, "url": S + "/industries/" + key };
          })
        }
      });
      schemas.push(breadcrumbs([
        { name: "Home", url: S },
        { name: "Industries", url: S + "/industries" }
      ]));
    }

    // ==================== BLOG LISTING ====================
    else if (path === "/blog") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Commercial Shot Blasting Blog",
        "description": "Expert articles, guides, and insights about shot blasting, surface preparation, industrial coating techniques, and metalwork restoration. Written by industry professionals with decades of experience.",
        "publisher": org(),
        "url": S + "/blog",
        "inLanguage": "en-GB"
      });
      schemas.push(breadcrumbs([
        { name: "Home", url: S },
        { name: "Blog", url: S + "/blog" }
      ]));
    }

    // ==================== BLOG POST ====================
    else if (/^\/blog\/.+$/.test(path)) {
      var postSlug = path.replace("/blog/", "");
      var postTitle = slug2name(postSlug);
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": postTitle,
        "description": "Expert guide about " + postTitle.toLowerCase() + " from Commercial Shot Blasting.",
        "publisher": org(),
        "author": { "@type": "Organization", "name": BN, "url": S },
        "mainEntityOfPage": { "@type": "WebPage", "@id": S + path },
        "inLanguage": "en-GB",
        "isAccessibleForFree": true,
        "about": { "@type": "Thing", "name": "Shot Blasting", "description": "Surface preparation technique using abrasive media" }
      });
      schemas.push(breadcrumbs([
        { name: "Home", url: S },
        { name: "Blog", url: S + "/blog" },
        { name: postTitle, url: S + path }
      ]));
    }

    // ==================== ABOUT PAGE ====================
    else if (path === "/about") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About Commercial Shot Blasting",
        "description": "Learn about Commercial Shot Blasting - a trusted family-run business providing professional mobile shot blasting services across England and Wales with 9 dedicated teams. Founded in 2015, we've grown to become one of the UK's leading specialist shot blasting companies.",
        "url": S + "/about",
        "mainEntity": localBiz()
      });
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": S + "/#organization",
        "name": BN,
        "url": S,
        "logo": LOGO,
        "foundingDate": "2015",
        "description": "Trusted family-run shot blasting business with 9 dedicated teams covering England and Wales. We specialise in mobile shot blasting for structural steel, containers, cladding, and all industrial metalwork.",
        "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 20, "maxValue": 50 },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "England" },
          { "@type": "AdministrativeArea", "name": "Wales" }
        ],
        "knowsAbout": ["Shot Blasting", "Abrasive Blasting", "Surface Preparation", "Rust Removal", "Protective Coatings", "Steel Refurbishment"]
      });
      schemas.push(breadcrumbs([
        { name: "Home", url: S },
        { name: "About", url: S + "/about" }
      ]));
    }

    // ==================== CONTACT PAGE ====================
    else if (path === "/contact") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Commercial Shot Blasting",
        "description": "Get in touch with Commercial Shot Blasting for a free quote. Call 07970 566409, email info@commercialshotblasting.co.uk, or use our online contact form. We respond to all enquiries within 24 hours.",
        "url": S + "/contact",
        "mainEntity": localBiz()
      });
      schemas.push(faqSchema([
        { q: "How do I get a free quote?", a: "Call us on 07970 566409, email info@commercialshotblasting.co.uk, or fill in our online contact form. We respond to all enquiries within 24 hours." },
        { q: "What information do you need for a quote?", a: "Tell us what needs blasting, the approximate size/quantity, the location, and your preferred timeline. Photos are helpful but not essential - we can arrange a free site survey." },
        { q: "Do you offer free site surveys?", a: "Yes, we offer free site surveys for all projects. Our team will visit your site, assess the work, and provide a detailed no-obligation quotation." }
      ]));
      schemas.push(breadcrumbs([
        { name: "Home", url: S },
        { name: "Contact", url: S + "/contact" }
      ]));
    }

    // ==================== OUR WORK / GALLERY ====================
    else if (path === "/our-work") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Our Work - Shot Blasting Project Gallery",
        "description": "Browse our portfolio of completed shot blasting projects with before and after photos. See real results from structural steel, cladding, containers, fire escapes, and more.",
        "url": S + "/our-work",
        "provider": localBiz()
      });
      // ImageGallery
      schemas.push({
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "Shot Blasting Before & After Gallery",
        "description": "Before and after photographs of our shot blasting projects showing the transformation of rusted, corroded, and coated surfaces to clean bare metal.",
        "about": { "@type": "Thing", "name": "Shot Blasting Results" },
        "provider": org()
      });
      schemas.push(breadcrumbs([
        { name: "Home", url: S },
        { name: "Our Work", url: S + "/our-work" }
      ]));
    }

    // ==================== PREPARATION & CLEANUP ====================
    else if (path === "/preparation-cleanup") {
      schemas.push(serviceSchema(
        "Shot Blasting Preparation & Cleanup Process",
        "Our industry-leading preparation and cleanup process ensures minimal disruption and maximum quality on every project. We follow a systematic four-stage approach: containment and protection, shot blasting, cleanup, and waste disposal.",
        null, "United Kingdom", "Country"
      ));
      schemas.push(howToSchema(
        "Shot Blasting Site Preparation & Cleanup Process",
        "Our systematic four-stage approach to site preparation and cleanup ensures minimal disruption and maximum quality.",
        [
          "Site Assessment & Planning - Survey the work area and plan containment strategy",
          "Containment & Protection - Install sheeting, protect delicate areas, seal openings",
          "Shot Blasting Execution - Systematic blasting following planned sequence",
          "Cleanup & Waste Disposal - Remove all blast media, dust, and debris. Dispose of waste responsibly",
          "Final Inspection - Verify surface quality and site cleanliness before handover"
        ]
      ));
      schemas.push(breadcrumbs([
        { name: "Home", url: S },
        { name: "Preparation & Cleanup", url: S + "/preparation-cleanup" }
      ]));
    }

    // ==================== FREE SITE SURVEY ====================
    else if (path === "/free-site-survey") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Free Shot Blasting Site Survey",
        "description": "Request a free, no-obligation site survey for your shot blasting project. Our experts will visit your site, assess the work required, and provide a detailed quotation. Available across England and Wales.",
        "provider": localBiz(),
        "serviceType": "Site Survey",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "GBP",
          "description": "Completely free site survey and detailed quotation",
          "availability": "https://schema.org/InStock"
        },
        "areaServed": { "@type": "Country", "name": "United Kingdom" }
      });
      schemas.push(faqSchema([
        { q: "Is the site survey really free?", a: "Yes, our site surveys are completely free with no obligation. We'll visit your site, assess the work, and provide a detailed quote at no cost." },
        { q: "How long does a site survey take?", a: "Most site surveys take 30-60 minutes depending on the project size. We'll discuss your requirements and answer any questions during the visit." },
        { q: "How quickly can you arrange a site survey?", a: "We typically arrange site surveys within 2-5 working days of your enquiry. For urgent projects, we can often accommodate faster visits." }
      ]));
      schemas.push(breadcrumbs([
        { name: "Home", url: S },
        { name: "Free Site Survey", url: S + "/free-site-survey" }
      ]));
    }

    // ==================== PRIVACY POLICY ====================
    else if (path === "/privacy-policy") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Privacy Policy - " + BN,
        "description": "Privacy policy for Commercial Shot Blasting website. How we collect, use, and protect your personal information.",
        "url": S + path,
        "publisher": org()
      });
      schemas.push(breadcrumbs([
        { name: "Home", url: S },
        { name: "Privacy Policy", url: S + path }
      ]));
    }

    // ==================== TERMS ====================
    else if (path === "/terms") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Terms & Conditions - " + BN,
        "description": "Terms and conditions for Commercial Shot Blasting services.",
        "url": S + path,
        "publisher": org()
      });
      schemas.push(breadcrumbs([
        { name: "Home", url: S },
        { name: "Terms & Conditions", url: S + path }
      ]));
    }

    // ==================== FALLBACK ====================
    if (schemas.length === 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": BN,
        "url": S + path,
        "description": "Professional mobile shot blasting services across England and Wales.",
        "publisher": org(),
        "isPartOf": { "@type": "WebSite", "name": BN, "url": S }
      });
      schemas.push(breadcrumbs([
        { name: "Home", url: S },
        { name: "Page", url: S + path }
      ]));
    }

    // Add Organization schema to every page for consistent business entity identification
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": S + "/#organization",
      "name": BN,
      "url": S,
      "logo": { "@type": "ImageObject", "url": LOGO, "width": 200, "height": 60 },
      "telephone": PH,
      "email": EM,
      "foundingDate": "2015",
      "description": "Professional mobile shot blasting company with 9 dedicated teams covering England and Wales. Specialist surface preparation for structural steel, containers, cladding, and all industrial metalwork.",
      "address": { "@type": "PostalAddress", "addressRegion": "West Midlands", "addressCountry": "GB" },
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "England" },
        { "@type": "AdministrativeArea", "name": "Wales" }
      ],
      "sameAs": []
    });

    // Inject all
    for (var x = 0; x < schemas.length; x++) inject(schemas[x]);
  }

  // Run immediately
  generate();

  // SPA navigation support
  window.addEventListener("popstate", function() { setTimeout(generate, 100); });
  var _ps = history.pushState;
  var _rs = history.replaceState;
  history.pushState = function() { _ps.apply(this, arguments); setTimeout(generate, 100); };
  history.replaceState = function() { _rs.apply(this, arguments); setTimeout(generate, 100); };
})();
