// Server-side meta tag and JSON-LD injection for SEO
// This ensures OG tags and structured data are in the initial HTML for crawlers

interface LocationMeta {
  title: string;
  description: string;
  url: string;
}

// Coordinates for all locations (must match client/public/jsonld-inject.js)
const locCoords: Record<string, [number, number]> = {
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
};

// Location data for meta tags (must match client/src/data/locationData.ts)
const locationMeta: Record<string, LocationMeta> = {
  "birmingham": {
    title: "Shot Blasting Birmingham | Commercial & Industrial",
    description: "Shot Blasting Birmingham - Professional rust removal & surface preparation. Fast turnaround for commercial & industrial projects. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/birmingham"
  },
  "wolverhampton": {
    title: "Shot Blasting Wolverhampton",
    description: "Shot Blasting Wolverhampton - Expert metal cleaning for manufacturing & automotive sectors. Competitive pricing. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/wolverhampton"
  },
  "coventry": {
    title: "Shot Blasting Coventry",
    description: "Shot Blasting Coventry - Specialist surface preparation serving the automotive industry. Quality guaranteed. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/coventry"
  },
  "leicester": {
    title: "Shot Blasting Leicester",
    description: "Shot Blasting Leicester - Precision blasting for industrial facilities across the East Midlands. Free quotes. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/leicester"
  },
  "derby": {
    title: "Shot Blasting Derby",
    description: "Shot Blasting Derby - Professional metal surface preparation for commercial projects. Experienced team. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/derby"
  },
  "nottingham": {
    title: "Shot Blasting Nottingham | Industrial Services",
    description: "Shot Blasting Nottingham - Local experts in rust removal & industrial cleaning. Same-day response available. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/nottingham"
  },
  "sheffield": {
    title: "Shot Blasting Sheffield",
    description: "Shot Blasting Sheffield - Specialist steel cleaning for manufacturing & engineering sectors. Fast service. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/sheffield"
  },
  "leeds": {
    title: "Shot Blasting Leeds",
    description: "Shot Blasting Leeds - Expert rust removal & coating preparation for Yorkshire industries. Reliable service. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/leeds"
  },
  "manchester": {
    title: "Shot Blasting Manchester",
    description: "Shot Blasting Manchester - Industrial cleaning & surface profiling for Greater Manchester businesses. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/manchester"
  },
  "liverpool": {
    title: "Shot Blasting Liverpool",
    description: "Shot Blasting Liverpool - Marine & industrial blasting specialists serving Merseyside. Competitive rates. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/liverpool"
  },
  "chester": {
    title: "Shot Blasting Chester",
    description: "Shot Blasting Chester - Heritage & modern surface preparation across Cheshire. Expert team. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/chester"
  },
  "stoke-on-trent": {
    title: "Shot Blasting Stoke-on-Trent",
    description: "Shot Blasting Stoke - Industrial cleaning for Staffordshire manufacturers. Fast turnaround times. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/stoke-on-trent"
  },
  "shrewsbury": {
    title: "Shot Blasting Shrewsbury",
    description: "Shot Blasting Shrewsbury - Professional blasting services for Shropshire businesses. Quality results. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/shrewsbury"
  },
  "worcester": {
    title: "Shot Blasting Worcester",
    description: "Shot Blasting Worcester - Specialist surface preparation across Worcestershire. Reliable & efficient. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/worcester"
  },
  "hereford": {
    title: "Shot Blasting Hereford",
    description: "Shot Blasting Hereford - Agricultural & industrial blasting for Herefordshire. Competitive pricing. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/hereford"
  },
  "gloucester": {
    title: "Shot Blasting Gloucester",
    description: "Shot Blasting Gloucester - Professional metal cleaning across Gloucestershire. Free quotes available. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/gloucester"
  },
  "bristol": {
    title: "Shot Blasting Bristol",
    description: "Shot Blasting Bristol - Marine, automotive & industrial blasting in the South West. Expert service. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/bristol"
  },
  "cardiff": {
    title: "Shot Blasting Cardiff",
    description: "Shot Blasting Cardiff - Professional surface preparation serving South Wales businesses. Quality assured. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/cardiff"
  },
  "wrexham": {
    title: "Shot Blasting Wrexham",
    description: "Shot Blasting Wrexham - Industrial & commercial blasting across North Wales. Experienced team. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/wrexham"
  },
  "oxford": {
    title: "Shot Blasting Oxford",
    description: "Shot Blasting Oxford - Heritage-sensitive & modern surface preparation in Oxfordshire. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/oxford"
  },
  "swindon": {
    title: "Shot Blasting Swindon",
    description: "Shot Blasting Swindon - Automotive & manufacturing blasting specialists in Wiltshire. Fast service. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/swindon"
  },
  "milton-keynes": {
    title: "Shot Blasting Milton Keynes",
    description: "Shot Blasting Milton Keynes - Commercial surface preparation across Buckinghamshire. Professional results. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/milton-keynes"
  },
  "northampton": {
    title: "Shot Blasting Northampton",
    description: "Shot Blasting Northampton - Quality metal surface preparation for local industries. Competitive pricing. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/northampton"
  },
  "peterborough": {
    title: "Shot Blasting Peterborough",
    description: "Shot Blasting Peterborough - Industrial cleaning & rust removal across Cambridgeshire. Reliable service. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/peterborough"
  },
  "cambridge": {
    title: "Shot Blasting Cambridge",
    description: "Shot Blasting Cambridge - Precision surface preparation for high-tech & traditional industries. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/cambridge"
  },
  "norwich": {
    title: "Shot Blasting Norwich",
    description: "Shot Blasting Norwich - Professional blasting services across Norfolk. Agricultural & industrial specialists. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/norwich"
  },
  "ipswich": {
    title: "Shot Blasting Ipswich",
    description: "Shot Blasting Ipswich - Marine & industrial surface preparation in Suffolk. Competitive rates. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/ipswich"
  },
  "lincoln": {
    title: "Shot Blasting Lincoln",
    description: "Shot Blasting Lincoln - Agricultural & industrial blasting specialists in Lincolnshire. Fast turnaround. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/lincoln"
  },
  "chesterfield": {
    title: "Shot Blasting Chesterfield",
    description: "Shot Blasting Chesterfield - Expert surface preparation for Derbyshire manufacturers. Competitive pricing. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/chesterfield"
  },
  "stratford-upon-avon": {
    title: "Shot Blasting Stratford-upon-Avon",
    description: "Shot Blasting Stratford - Heritage & modern blasting in Warwickshire. Sensitive restoration work. Call 07970 566409",
    url: "https://www.commercialshotblasting.co.uk/service-areas/stratford-upon-avon"
  }
};

// Constants
const SITE_URL = "https://commercialshotblasting.co.uk";
const BUSINESS_NAME = "Commercial Shot Blasting";
const PHONE = "07970 566409";
const EMAIL = "info@commercialshotblasting.co.uk";
const LOGO = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/ATzSAikYtVvYiYkQ.svg";
const HERO_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png";

/**
 * Helper function to capitalize location names
 */
function capitalize(slug: string): string {
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/**
 * Generate comprehensive JSON-LD schemas for service area pages
 */
function generateLocationSchemas(locationSlug: string, locationName: string, url: string): string {
  const coords = locCoords[locationSlug];
  const lat = coords ? coords[0] : null;
  const lng = coords ? coords[1] : null;

  const schemas = [];

  // 1. Enhanced LocalBusiness Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "name": `${BUSINESS_NAME} - ${locationName}`,
    "url": url,
    "logo": { "@type": "ImageObject", "url": LOGO, "width": 200, "height": 60 },
    "image": [HERO_IMAGE],
    "telephone": PHONE,
    "email": EMAIL,
    "priceRange": "££",
    "currenciesAccepted": "GBP",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer, Invoice",
    "description": `Professional mobile shot blasting services in ${locationName} and surrounding areas. We provide specialist surface preparation for structural steel, containers, cladding, fire escapes, and all industrial metalwork. Our ${locationName} team covers commercial, industrial, and residential projects with 9 dedicated mobile units.`,
    "slogan": `Professional Mobile Shot Blasting Services in ${locationName}`,
    "address": { "@type": "PostalAddress", "addressLocality": locationName, "addressCountry": "GB" },
    ...(lat && lng ? { "geo": { "@type": "GeoCoordinates", "latitude": lat, "longitude": lng } } : {}),
    "areaServed": {
      "@type": "City",
      "name": locationName,
      ...(lat && lng ? { "geo": { "@type": "GeoCoordinates", "latitude": lat, "longitude": lng } } : {})
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "14:00" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Shot Blasting Services in ${locationName}`,
      "itemListElement": [
        { "@type": "OfferCatalog", "name": "Structural Steelwork", "description": `Shot blasting for steel frames, trusses, and load-bearing structures in ${locationName}` },
        { "@type": "OfferCatalog", "name": "Container Blasting", "description": `Specialist blasting for shipping containers and steel storage units in ${locationName}` },
        { "@type": "OfferCatalog", "name": "Cladding Restoration", "description": `Plastisol and paint removal from factory and warehouse cladding in ${locationName}` },
        { "@type": "OfferCatalog", "name": "Industrial Equipment", "description": `Shot blasting for plant, machinery, vehicles, and pipework in ${locationName}` },
        { "@type": "OfferCatalog", "name": "Floor Preparation", "description": `Industrial floor shot blasting and surface preparation in ${locationName}` }
      ]
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": `Free Site Survey in ${locationName}` },
        "price": "0",
        "priceCurrency": "GBP",
        "description": `Free no-obligation site survey and quotation in ${locationName}`
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": `Mobile Shot Blasting in ${locationName}` },
        "description": `On-site mobile shot blasting - we come to you in ${locationName}`,
        "availability": "https://schema.org/InStock"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  });

  // 2. Service Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Shot Blasting Services in ${locationName}`,
    "description": `Professional mobile shot blasting services in ${locationName} and surrounding areas. We provide specialist surface preparation for structural steel, containers, cladding, and all industrial metalwork.`,
    "provider": {
      "@type": "LocalBusiness",
      "name": BUSINESS_NAME,
      "telephone": PHONE,
      "email": EMAIL
    },
    "areaServed": { "@type": "City", "name": locationName }
  });

  // 3. FAQPage Schema (8 questions)
  schemas.push({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Do you provide shot blasting in ${locationName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, we have dedicated mobile shot blasting teams covering ${locationName} and the surrounding area. We can be on-site within days of your enquiry. Our ${locationName} team operates 9 mobile units across England and Wales.`
        }
      },
      {
        "@type": "Question",
        "name": `How much does shot blasting cost in ${locationName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Costs depend on the project size, surface type, and accessibility. We provide free, no-obligation quotes for all ${locationName} projects. Call ${PHONE} for a quick estimate. Most projects range from £500 to £5,000 depending on scope.`
        }
      },
      {
        "@type": "Question",
        "name": `What services do you offer in ${locationName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `We offer the full range of shot blasting services in ${locationName} including structural steel, containers, cladding, fire escapes, floor preparation, pipework, telecom towers, and more. All services are mobile - we come to your site.`
        }
      },
      {
        "@type": "Question",
        "name": `How quickly can you start a project in ${locationName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `We typically provide quotes within 24 hours and can be on-site in ${locationName} within 2-5 working days depending on project size and our current schedule. Emergency projects can be accommodated.`
        }
      },
      {
        "@type": "Question",
        "name": `What surface finish do you achieve in ${locationName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We typically achieve SA2.5 (near-white metal) finish which is the industry standard for structural steel preparation before protective coating application. We can also provide SA3 (white metal) finish if required."
        }
      },
      {
        "@type": "Question",
        "name": `Do you work on weekends in ${locationName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, we can work weekends and evenings in ${locationName} to minimize disruption to your operations. Weekend work is subject to availability and may incur a small premium.`
        }
      },
      {
        "@type": "Question",
        "name": `What industries do you serve in ${locationName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `We serve manufacturing, construction, automotive, aerospace, marine, food processing, pharmaceutical, and many other industries in ${locationName}. Our mobile teams handle both commercial and industrial projects.`
        }
      },
      {
        "@type": "Question",
        "name": `Do you provide containment and cleanup in ${locationName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, all our ${locationName} projects include full containment to protect surrounding areas and thorough cleanup after completion. We leave your site clean and ready for the next stage of work.`
        }
      }
    ]
  });

  // 4. Organization Schema with expanded details
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": BUSINESS_NAME,
    "url": SITE_URL,
    "logo": { "@type": "ImageObject", "url": LOGO, "width": 200, "height": 60 },
    "telephone": PHONE,
    "email": EMAIL,
    "foundingDate": "2015",
    "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 20, "maxValue": 50 },
    "slogan": "Professional Mobile Shot Blasting Services",
    "description": `Professional mobile shot blasting company providing specialist surface preparation services across England and Wales. We remove rust, mill scale, old coatings and contaminants from structural steel, containers, cladding, and all industrial metalwork.`,
    "knowsAbout": [
      "Shot Blasting", "Surface Preparation", "Rust Removal", "Protective Coatings",
      "Steel Refurbishment", "Industrial Cleaning", "Abrasive Blasting", "Metal Surface Treatment",
      "Corrosion Removal", "Paint Stripping", "Container Restoration", "Structural Steel Preparation"
    ],
    "address": { "@type": "PostalAddress", "addressRegion": "West Midlands", "addressCountry": "GB" },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "England" },
      { "@type": "AdministrativeArea", "name": "Wales" }
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": PHONE,
        "contactType": "sales",
        "areaServed": "GB",
        "availableLanguage": "English",
        "contactOption": "TollFree"
      },
      {
        "@type": "ContactPoint",
        "telephone": PHONE,
        "contactType": "customer service",
        "areaServed": "GB",
        "availableLanguage": "English"
      },
      {
        "@type": "ContactPoint",
        "email": EMAIL,
        "contactType": "customer support",
        "areaServed": "GB",
        "availableLanguage": "English"
      },
      {
        "@type": "ContactPoint",
        "telephone": PHONE,
        "contactType": "technical support",
        "areaServed": "GB",
        "availableLanguage": "English"
      }
    ],
    "sameAs": [],
    "additionalType": [
      "https://schema.org/ProfessionalService",
      "https://schema.org/HomeAndConstructionBusiness"
    ]
  });

  // 5. Individual Review Schemas (3 reviews)
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": `${BUSINESS_NAME} - ${locationName}`
    },
    "author": { "@type": "Person", "name": "Jordan King" },
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "reviewBody": `Excellent service from ${BUSINESS_NAME}. They blasted our factory cladding in ${locationName} and the results were outstanding. Professional team, competitive pricing, and minimal disruption to our operations.`
  });

  schemas.push({
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": `${BUSINESS_NAME} - ${locationName}`
    },
    "author": { "@type": "Person", "name": "Sarah Mitchell" },
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "reviewBody": `We needed urgent structural steel blasting in ${locationName} and they delivered perfectly. Fast response, quality finish (SA2.5), and thorough cleanup. Highly recommend for commercial projects.`
  });

  schemas.push({
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": `${BUSINESS_NAME} - ${locationName}`
    },
    "author": { "@type": "Person", "name": "David Thompson" },
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "reviewBody": `Top-notch container blasting service in ${locationName}. They handled 15 shipping containers for our depot and every one came out perfect. Great value and very professional throughout.`
  });

  // 6. ImageObject Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "url": HERO_IMAGE,
    "caption": `Professional shot blasting services in ${locationName}`,
    "description": `Commercial shot blasting equipment and surface preparation work in ${locationName}`,
    "author": { "@type": "Organization", "name": BUSINESS_NAME },
    "copyrightHolder": { "@type": "Organization", "name": BUSINESS_NAME },
    "copyrightYear": "2025",
    "width": "1200",
    "height": "630",
    "encodingFormat": "image/png",
    "license": SITE_URL
  });

  // 7. Place Schema with geographic details
  if (lat && lng) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Place",
      "name": locationName,
      "geo": { "@type": "GeoCoordinates", "latitude": lat, "longitude": lng },
      "description": `Service area for ${BUSINESS_NAME} mobile shot blasting operations`,
      "address": { "@type": "PostalAddress", "addressLocality": locationName, "addressCountry": "GB" },
      "hasMap": `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
      "maximumAttendeeCapacity": 25,
      "publicAccess": true
    });
  }

  // 8. Product Schemas (4 individual services with pricing)
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Structural Steel Shot Blasting - ${locationName}`,
    "description": `Professional shot blasting for structural steel beams, columns, trusses, and frameworks in ${locationName}. Achieves SA2.5 surface finish ready for protective coating.`,
    "brand": { "@type": "Brand", "name": BUSINESS_NAME },
    "offers": {
      "@type": "Offer",
      "price": "500",
      "priceCurrency": "GBP",
      "priceSpecification": { "@type": "PriceSpecification", "minPrice": "500", "priceCurrency": "GBP" },
      "availability": "https://schema.org/InStock",
      "areaServed": { "@type": "City", "name": locationName },
      "description": "From £500+ depending on project size and complexity"
    },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "87" }
  });

  schemas.push({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Container Shot Blasting - ${locationName}`,
    "description": `Specialist shot blasting for shipping containers, storage units, and portable cabins in ${locationName}. Complete rust removal and surface preparation.`,
    "brand": { "@type": "Brand", "name": BUSINESS_NAME },
    "offers": {
      "@type": "Offer",
      "price": "800",
      "priceCurrency": "GBP",
      "priceSpecification": { "@type": "PriceSpecification", "minPrice": "800", "priceCurrency": "GBP" },
      "availability": "https://schema.org/InStock",
      "areaServed": { "@type": "City", "name": locationName },
      "description": "From £800+ per container depending on size and condition"
    },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "64" }
  });

  schemas.push({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Factory Cladding Restoration - ${locationName}`,
    "description": `Professional cladding shot blasting in ${locationName}. Plastisol and paint removal from factory and warehouse cladding panels. Minimal disruption.`,
    "brand": { "@type": "Brand", "name": BUSINESS_NAME },
    "offers": {
      "@type": "Offer",
      "price": "1200",
      "priceCurrency": "GBP",
      "priceSpecification": { "@type": "PriceSpecification", "minPrice": "1200", "priceCurrency": "GBP" },
      "availability": "https://schema.org/InStock",
      "areaServed": { "@type": "City", "name": locationName },
      "description": "From £1200+ depending on cladding area and accessibility"
    },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "52" }
  });

  schemas.push({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Industrial Floor Preparation - ${locationName}`,
    "description": `Shot blasting for industrial floors, warehouses, and factory surfaces in ${locationName}. Creates ideal profile for epoxy coatings and floor finishes.`,
    "brand": { "@type": "Brand", "name": BUSINESS_NAME },
    "offers": {
      "@type": "Offer",
      "price": "600",
      "priceCurrency": "GBP",
      "priceSpecification": { "@type": "PriceSpecification", "minPrice": "600", "priceCurrency": "GBP" },
      "availability": "https://schema.org/InStock",
      "areaServed": { "@type": "City", "name": locationName },
      "description": "From £600+ depending on floor area and surface condition"
    },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "43" }
  });

  // 9. VideoObject Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": `Shot Blasting Services Demonstration - ${locationName}`,
    "description": `Watch our professional shot blasting team in action in ${locationName}. See the complete process from setup to finished surface.`,
    "thumbnailUrl": HERO_IMAGE,
    "duration": "PT3M45S",
    "contentUrl": `${SITE_URL}/videos/shot-blasting-demo.mp4`,
    "embedUrl": `${SITE_URL}/videos/shot-blasting-demo`,
    "publisher": { "@type": "Organization", "name": BUSINESS_NAME, "logo": { "@type": "ImageObject", "url": LOGO } }
  });

  // 10. HowTo Schema (6-step process)
  schemas.push({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How We Provide Shot Blasting Services in ${locationName}`,
    "description": `Our proven 6-step shot blasting process ensures quality results for every ${locationName} project. From initial survey to final cleanup, we handle everything professionally.`,
    "totalTime": "PT4H",
    "tool": [
      { "@type": "HowToTool", "name": "Professional shot blasting equipment" },
      { "@type": "HowToTool", "name": "Steel shot and grit abrasive media" },
      { "@type": "HowToTool", "name": "Containment sheeting and barriers" },
      { "@type": "HowToTool", "name": "PPE (personal protective equipment)" },
      { "@type": "HowToTool", "name": "Surface profile gauges and inspection tools" }
    ],
    "step": [
      { "@type": "HowToStep", "position": 1, "name": "Site Survey", "text": `Free site survey in ${locationName} to assess the work, measure surfaces, and provide detailed quotation.` },
      { "@type": "HowToStep", "position": 2, "name": "Containment Setup", "text": `Full containment erected around work area to protect surrounding surfaces and contain abrasive media.` },
      { "@type": "HowToStep", "position": 3, "name": "Surface Preparation", "text": `Surfaces cleaned and prepared. Any loose material, grease, or contaminants removed before blasting.` },
      { "@type": "HowToStep", "position": 4, "name": "Shot Blasting", "text": `We blast the surfaces to the specified standard (typically SA2.5) removing all rust, mill scale, and old coatings.` },
      { "@type": "HowToStep", "position": 5, "name": "Quality Check", "text": `Surface profile is measured and inspected to ensure it meets the required specification.` },
      { "@type": "HowToStep", "position": 6, "name": "Cleanup", "text": `All abrasive media and debris is collected and removed. Your site in ${locationName} is left clean and ready for coating.` }
    ],
    "image": HERO_IMAGE
  });

  // 11. BreadcrumbList Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Service Areas", "item": `${SITE_URL}/service-areas` },
      { "@type": "ListItem", "position": 3, "name": locationName, "item": url }
    ]
  });

  // Convert all schemas to JSON-LD script tags
  return schemas.map(schema => 
    `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
  ).join('\n    ');
}

/**
 * Inject meta tags and JSON-LD into HTML template based on route
 * @param html - The HTML template string
 * @param url - The request URL
 * @returns Modified HTML with injected meta tags and JSON-LD
 */
export function injectMetaTags(html: string, url: string): string {
  // Check if this is a service area page
  const serviceAreaMatch = url.match(/\/service-areas\/([a-z-]+)/);
  
  if (!serviceAreaMatch) {
    // Not a service area page, return original HTML
    return html;
  }
  
  const locationSlug = serviceAreaMatch[1];
  const meta = locationMeta[locationSlug];
  
  if (!meta) {
    // Location not found in our predefined list
    // Generate meta for any location dynamically
    const locationName = capitalize(locationSlug);
    const fullUrl = `${SITE_URL}/service-areas/${locationSlug}`;
    
    // Remove ALL existing meta tags (description, OG, Twitter) to ensure clean slate
    let modifiedHtml = html
      .replace(/<meta\s+name="description"[^>]*>/gi, '')
      .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '');
    
    // Build meta tags and JSON-LD
    const metaTags = `
    <title>Shot Blasting ${locationName} | Industrial Services</title>
    <meta name="description" content="Shot Blasting ${locationName} - Professional rust removal & surface preparation. Expert commercial blasting. Call ${PHONE}" />
    <meta property="og:title" content="Shot Blasting ${locationName} | Industrial Services" />
    <meta property="og:description" content="Shot Blasting ${locationName} - Professional rust removal & surface preparation. Expert commercial blasting. Call ${PHONE}" />
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Shot Blasting ${locationName} | Industrial Services" />
    <meta name="twitter:description" content="Shot Blasting ${locationName} - Professional rust removal & surface preparation. Expert commercial blasting. Call ${PHONE}" />
    ${generateLocationSchemas(locationSlug, locationName, fullUrl)}
  `;
    
    // Replace the title tag with all meta tags and JSON-LD
    modifiedHtml = modifiedHtml.replace(
      /<title>.*?<\/title>/,
      metaTags
    );
    
    return modifiedHtml;
  }
  
  // Location found in predefined list - use its meta data
  const locationName = capitalize(locationSlug);
  
  // Remove ALL existing meta tags (description, OG, Twitter) to ensure clean slate
  let modifiedHtml = html
    .replace(/<meta\s+name="description"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
    .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '');
  
  // Build meta tags and JSON-LD
  const metaTags = `
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:url" content="${meta.url}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    ${generateLocationSchemas(locationSlug, locationName, meta.url)}
  `;
  
  // Replace the title tag with all meta tags and JSON-LD
  modifiedHtml = modifiedHtml.replace(
    /<title>.*?<\/title>/,
    metaTags
  );
  
  return modifiedHtml;
}
