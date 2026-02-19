/**
 * Client-side JSON-LD Structured Data Injector
 * Generates and injects schema.org structured data based on the current URL
 * This runs in the browser so Google's crawler (which executes JS) will see it
 */
(function() {
  var SITE_URL = "https://commercialshotblasting.co.uk";
  var BUSINESS_NAME = "Commercial Shot Blasting";
  var PHONE = "07970 566409";
  var EMAIL = "info@commercialshotblasting.co.uk";
  var LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/ATzSAikYtVvYiYkQ.svg";
  var HERO_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png";

  function getOrganizationSchema() {
    return {
      "@type": "Organization",
      "name": BUSINESS_NAME,
      "url": SITE_URL,
      "logo": LOGO_URL,
      "telephone": PHONE,
      "email": EMAIL,
      "sameAs": [],
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "West Midlands",
        "addressCountry": "GB"
      }
    };
  }

  function getLocalBusinessSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": BUSINESS_NAME,
      "url": SITE_URL,
      "logo": LOGO_URL,
      "image": HERO_IMAGE,
      "telephone": PHONE,
      "email": EMAIL,
      "priceRange": "££",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "West Midlands",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 52.4862,
        "longitude": -1.8904
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "07:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "08:00",
          "closes": "14:00"
        }
      ],
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      }
    };
  }

  function getWebSiteSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": BUSINESS_NAME,
      "url": SITE_URL,
      "description": "Professional mobile shot blasting services across England and Wales. Specialist surface preparation for structural steel, containers, cladding, and industrial applications.",
      "publisher": getOrganizationSchema()
    };
  }

  function getBreadcrumbSchema(items) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map(function(item, index) {
        return {
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        };
      })
    };
  }

  var serviceData = {
    "structural-steel-frames": {
      name: "Structural Steel Frame Shot Blasting",
      description: "Professional shot blasting for structural steel frames, removing mill scale, rust, and old coatings to prepare surfaces for protective treatments.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png"
    },
    "steel-containers": {
      name: "Steel Container Shot Blasting",
      description: "Specialist shot blasting for steel containers and large storage structures, removing rust and old coatings for refurbishment or recoating.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/bGsCKoWjNMKfOhKj.webp"
    },
    "factory-cladding": {
      name: "Factory & Warehouse Cladding Shot Blasting",
      description: "Specialist cladding restoration removing plastisol and paint layers from factory and industrial building panels.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/fAgmlMEezcGnfvae.webp"
    },
    "fire-escapes": {
      name: "Fire Escape Shot Blasting",
      description: "Complete restoration of fire escape structures through professional shot blasting, ensuring safety compliance and longevity."
    },
    "staircases": {
      name: "Staircase Shot Blasting",
      description: "Professional shot blasting for metal staircases, removing rust and old coatings to restore structural integrity."
    },
    "bridge-steelwork": {
      name: "Bridge Steelwork Shot Blasting",
      description: "Heavy-duty shot blasting for bridge structural steelwork, removing corrosion and preparing surfaces for protective coatings."
    },
    "ladders": {
      name: "Ladder Shot Blasting",
      description: "Professional shot blasting for metal ladders and access equipment, removing rust and preparing for recoating."
    },
    "warehouse-racking": {
      name: "Warehouse Racking Shot Blasting",
      description: "Shot blasting for warehouse racking systems, removing rust and damage to extend lifespan and maintain safety."
    },
    "pipework": {
      name: "Pipework Shot Blasting",
      description: "Specialist shot blasting for industrial pipework, removing scale, rust, and old coatings for maintenance and refurbishment."
    },
    "telecom-towers": {
      name: "Telecom Tower Shot Blasting",
      description: "Professional shot blasting for telecommunications towers and masts, removing corrosion and preparing for protective coatings."
    },
    "floor-preparation": {
      name: "Floor Preparation Shot Blasting",
      description: "Industrial floor preparation using shot blasting to remove coatings, adhesives, and create the perfect surface profile."
    },
    "powder-coating": {
      name: "Powder Coating Preparation",
      description: "Surface preparation shot blasting optimised for powder coating application, ensuring maximum adhesion and finish quality."
    },
    "commercial-radiators": {
      name: "Commercial Radiator Shot Blasting",
      description: "Professional shot blasting for commercial radiators, removing old paint and rust for refurbishment or recycling."
    },
    "commercial-vehicles": {
      name: "Commercial Vehicle Shot Blasting",
      description: "Shot blasting for commercial vehicle chassis, bodies, and components, removing rust and preparing for protective coatings."
    },
    "steel-doors": {
      name: "Steel Door Shot Blasting",
      description: "Professional shot blasting for steel doors and frames, removing rust and old coatings for refurbishment."
    },
    "steel-sheeting": {
      name: "Steel Sheeting Shot Blasting",
      description: "Shot blasting for steel sheeting and panels, removing corrosion and coatings for reuse or recycling."
    },
    "steel-gates": {
      name: "Steel Gate Shot Blasting",
      description: "Professional shot blasting for steel gates and fencing, removing rust and old coatings for restoration."
    },
    "plant-machinery": {
      name: "Plant & Machinery Shot Blasting",
      description: "Heavy-duty shot blasting for plant and machinery, removing corrosion and preparing for protective coatings."
    }
  };

  var industryData = {
    "construction": {
      name: "Construction Industry Shot Blasting",
      description: "Professional shot blasting services for the construction industry. Surface preparation for structural steel, reinforcement bars, and building components."
    },
    "manufacturing": {
      name: "Manufacturing Industry Shot Blasting",
      description: "Shot blasting services for manufacturing facilities. Surface preparation for production equipment, machinery, and metal components."
    },
    "retail": {
      name: "Retail Industry Shot Blasting",
      description: "Shot blasting services for retail environments. Surface preparation for shopfronts, fixtures, and commercial properties."
    },
    "aerospace": {
      name: "Aerospace Industry Shot Blasting",
      description: "Precision shot blasting for aerospace components. Surface preparation meeting strict industry standards and specifications."
    },
    "marine": {
      name: "Marine Industry Shot Blasting",
      description: "Shot blasting for marine vessels and structures. Removing marine growth, rust, and old coatings from hulls and marine equipment."
    },
    "agriculture": {
      name: "Agriculture Industry Shot Blasting",
      description: "Shot blasting services for agricultural equipment and buildings. Restoring farm machinery, grain stores, and agricultural steel structures."
    },
    "transport-logistics": {
      name: "Transport & Logistics Industry Shot Blasting",
      description: "Shot blasting for transport and logistics equipment. Surface preparation for trailers, containers, and fleet vehicles."
    },
    "heritage-restoration": {
      name: "Heritage Restoration Shot Blasting",
      description: "Sensitive shot blasting for heritage and restoration projects. Careful surface preparation preserving historical metalwork and structures."
    }
  };

  var serviceAreaNames = {
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

  var homeFAQs = [
    {
      question: "What is shot blasting?",
      answer: "Shot blasting is a surface preparation technique that propels abrasive media at high velocity to clean, strengthen, or polish metal surfaces. It effectively removes rust, mill scale, old coatings, and contaminants, creating an ideal surface profile for new protective coatings."
    },
    {
      question: "What areas do you cover?",
      answer: "We provide mobile shot blasting services across England and Wales, with 9 dedicated teams strategically positioned from our West Midlands headquarters. We cover over 100 locations including Birmingham, Manchester, Leeds, Bristol, and many more."
    },
    {
      question: "How much does shot blasting cost?",
      answer: "Shot blasting costs vary depending on the project size, surface type, and accessibility. We provide free, no-obligation quotes for all projects. Contact us on 07970 566409 or request a quote online for accurate pricing."
    },
    {
      question: "What surfaces can be shot blasted?",
      answer: "We shot blast a wide range of surfaces including structural steel frames, steel containers, factory cladding, fire escapes, staircases, bridge steelwork, warehouse racking, pipework, commercial vehicles, and industrial floors."
    },
    {
      question: "Do you offer mobile shot blasting?",
      answer: "Yes, all our shot blasting services are mobile. Our teams travel to your site with all necessary equipment, meaning there's no need to transport heavy items to a workshop. We can work on-site at factories, warehouses, construction sites, and more."
    },
    {
      question: "How long does a shot blasting project take?",
      answer: "Project duration depends on the size and complexity of the work. Small projects like gates or railings can be completed in a few hours, while larger industrial projects may take several days. We provide estimated timelines with every quote."
    }
  ];

  function slugToName(slug) {
    return slug.split("-").map(function(w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(" ");
  }

  function injectSchema(schema) {
    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  function generateAndInject() {
    // Remove any existing JSON-LD scripts first (avoid duplicates on SPA navigation)
    var existing = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < existing.length; i++) {
      existing[i].parentNode.removeChild(existing[i]);
    }

    var path = window.location.pathname.replace(/\/$/, "") || "/";
    var schemas = [];

    // === HOMEPAGE ===
    if (path === "/" || path === "") {
      schemas.push(getWebSiteSchema());
      schemas.push(getLocalBusinessSchema());
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": homeFAQs.map(function(faq) {
          return {
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          };
        })
      });
      schemas.push(getBreadcrumbSchema([
        { name: "Home", url: SITE_URL }
      ]));
    }

    // === SERVICE DETAIL PAGES ===
    else if (/^\/services\/([a-z-]+)$/.test(path)) {
      var serviceId = path.match(/^\/services\/([a-z-]+)$/)[1];
      var service = serviceData[serviceId];
      if (service) {
        var sSchema = {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": service.name,
          "description": service.description,
          "provider": getLocalBusinessSchema(),
          "areaServed": { "@type": "Country", "name": "United Kingdom" },
          "serviceType": "Shot Blasting",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "GBP" }
          }
        };
        if (service.image) sSchema.image = service.image;
        schemas.push(sSchema);
      }
      schemas.push(getBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Services", url: SITE_URL + "/services" },
        { name: slugToName(serviceId), url: SITE_URL + path }
      ]));
    }

    // === SERVICES LISTING ===
    else if (path === "/services") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Shot Blasting Services",
        "description": "Browse our full range of professional shot blasting services including structural steel, containers, cladding, fire escapes, and more.",
        "provider": getLocalBusinessSchema()
      });
      schemas.push(getBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Services", url: SITE_URL + "/services" }
      ]));
    }

    // === SERVICE AREA PAGES ===
    else if (/^\/service-areas\/([a-z-]+)$/.test(path)) {
      var locSlug = path.match(/^\/service-areas\/([a-z-]+)$/)[1];
      var locName = serviceAreaNames[locSlug] || slugToName(locSlug);
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Shot Blasting " + locName,
        "description": "Professional mobile shot blasting services in " + locName + ". Specialist surface preparation for structural steel, containers, cladding, and industrial applications.",
        "provider": getLocalBusinessSchema(),
        "areaServed": { "@type": "City", "name": locName },
        "serviceType": "Shot Blasting",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "GBP" }
        }
      });
      schemas.push(getBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Service Areas", url: SITE_URL + "/service-areas" },
        { name: locName, url: SITE_URL + path }
      ]));
    }

    // === SERVICE AREAS LISTING ===
    else if (path === "/service-areas") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Shot Blasting Service Areas",
        "description": "Browse over 100 locations across England and Wales where we provide professional mobile shot blasting services.",
        "provider": getLocalBusinessSchema()
      });
      schemas.push(getBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Service Areas", url: SITE_URL + "/service-areas" }
      ]));
    }

    // === LOCATION PAGES ===
    else if (/^\/locations\/([a-z-]+)$/.test(path)) {
      var lSlug = path.match(/^\/locations\/([a-z-]+)$/)[1];
      var lName = serviceAreaNames[lSlug] || slugToName(lSlug);
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Shot Blasting " + lName,
        "description": "Professional mobile shot blasting services in " + lName + ". Specialist surface preparation for structural steel, containers, cladding, and industrial applications.",
        "provider": getLocalBusinessSchema(),
        "areaServed": { "@type": "City", "name": lName },
        "serviceType": "Shot Blasting"
      });
      schemas.push(getBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Locations", url: SITE_URL + "/service-areas" },
        { name: lName, url: SITE_URL + path }
      ]));
    }

    // === COUNTY PAGES ===
    else if (/^\/counties\/([a-z-]+)$/.test(path)) {
      var cSlug = path.match(/^\/counties\/([a-z-]+)$/)[1];
      var cName = slugToName(cSlug);
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Shot Blasting in " + cName,
        "description": "Professional mobile shot blasting services across " + cName + ". Covering all towns and cities with specialist surface preparation for commercial and industrial projects.",
        "provider": getLocalBusinessSchema(),
        "areaServed": { "@type": "AdministrativeArea", "name": cName },
        "serviceType": "Shot Blasting"
      });
      schemas.push(getBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Service Areas", url: SITE_URL + "/service-areas" },
        { name: cName, url: SITE_URL + path }
      ]));
    }

    // === INDUSTRY PAGES ===
    else if (/^\/industries\/([a-z-]+)$/.test(path)) {
      var iSlug = path.match(/^\/industries\/([a-z-]+)$/)[1];
      var industry = industryData[iSlug];
      if (industry) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": industry.name,
          "description": industry.description,
          "provider": getLocalBusinessSchema(),
          "serviceType": "Shot Blasting",
          "areaServed": { "@type": "Country", "name": "United Kingdom" }
        });
      }
      schemas.push(getBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Industries", url: SITE_URL + "/industries" },
        { name: slugToName(iSlug), url: SITE_URL + path }
      ]));
    }

    // === INDUSTRIES LISTING ===
    else if (path === "/industries") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Industries We Serve",
        "description": "Professional shot blasting services for construction, manufacturing, aerospace, marine, agriculture, transport, and heritage restoration industries.",
        "provider": getLocalBusinessSchema()
      });
      schemas.push(getBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Industries", url: SITE_URL + "/industries" }
      ]));
    }

    // === BLOG LISTING ===
    else if (path === "/blog") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Commercial Shot Blasting Blog",
        "description": "Expert articles, guides, and insights about shot blasting, surface preparation, and industrial coating techniques.",
        "publisher": getOrganizationSchema()
      });
      schemas.push(getBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Blog", url: SITE_URL + "/blog" }
      ]));
    }

    // === BLOG POST ===
    else if (/^\/blog\/.+$/.test(path)) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Article",
        "publisher": getOrganizationSchema(),
        "author": { "@type": "Organization", "name": BUSINESS_NAME },
        "mainEntityOfPage": { "@type": "WebPage", "@id": SITE_URL + path }
      });
      schemas.push(getBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Blog", url: SITE_URL + "/blog" },
        { name: "Article", url: SITE_URL + path }
      ]));
    }

    // === ABOUT PAGE ===
    else if (path === "/about") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About Commercial Shot Blasting",
        "description": "Learn about Commercial Shot Blasting - professional mobile shot blasting services across England and Wales with 9 dedicated teams.",
        "mainEntity": getLocalBusinessSchema()
      });
      schemas.push(getBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "About", url: SITE_URL + "/about" }
      ]));
    }

    // === CONTACT PAGE ===
    else if (path === "/contact") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Commercial Shot Blasting",
        "description": "Get in touch with Commercial Shot Blasting for a free quote. Call 07970 566409 or use our contact form.",
        "mainEntity": getLocalBusinessSchema()
      });
      schemas.push(getBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Contact", url: SITE_URL + "/contact" }
      ]));
    }

    // === OUR WORK ===
    else if (path === "/our-work") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Our Work - Shot Blasting Projects",
        "description": "Browse our portfolio of completed shot blasting projects including before and after photos of structural steel, cladding, containers, and more.",
        "provider": getLocalBusinessSchema()
      });
      schemas.push(getBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Our Work", url: SITE_URL + "/our-work" }
      ]));
    }

    // === PREPARATION & CLEANUP ===
    else if (path === "/preparation-cleanup") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Shot Blasting Preparation & Cleanup",
        "description": "Learn about our thorough preparation and cleanup process for shot blasting projects. We ensure minimal disruption and leave your site clean.",
        "provider": getLocalBusinessSchema(),
        "serviceType": "Shot Blasting"
      });
      schemas.push(getBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Preparation & Cleanup", url: SITE_URL + "/preparation-cleanup" }
      ]));
    }

    // === FREE SITE SURVEY ===
    else if (path === "/free-site-survey") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Free Site Survey",
        "description": "Request a free site survey for your shot blasting project. Our experts will assess your requirements and provide a detailed quote.",
        "provider": getLocalBusinessSchema(),
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "GBP",
          "description": "Free site survey and quotation"
        }
      });
      schemas.push(getBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Free Site Survey", url: SITE_URL + "/free-site-survey" }
      ]));
    }

    // === FALLBACK ===
    if (schemas.length === 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": BUSINESS_NAME,
        "url": SITE_URL + path,
        "publisher": getOrganizationSchema()
      });
    }

    // Inject all schemas
    for (var s = 0; s < schemas.length; s++) {
      injectSchema(schemas[s]);
    }
  }

  // Run immediately
  generateAndInject();

  // Also re-run on SPA navigation (popstate)
  window.addEventListener("popstate", function() {
    setTimeout(generateAndInject, 100);
  });

  // Observe URL changes for SPA (pushState/replaceState)
  var origPushState = history.pushState;
  var origReplaceState = history.replaceState;
  history.pushState = function() {
    origPushState.apply(this, arguments);
    setTimeout(generateAndInject, 100);
  };
  history.replaceState = function() {
    origReplaceState.apply(this, arguments);
    setTimeout(generateAndInject, 100);
  };
})();
