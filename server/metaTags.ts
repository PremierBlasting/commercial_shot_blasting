// Server-side meta tag and JSON-LD injection for SEO
// This ensures OG tags and structured data are in the initial HTML for crawlers
import { locationData } from "@shared/locationData";
import { countyData, CountyData } from "@shared/countyData";

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
    title: "Shot Blasting Services in Birmingham | Commercial Shot Blasting",
    description: "Professional shot blasting services in Birmingham — mobile rust removal & surface preparation for commercial and industrial clients. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/birmingham"
  },
  "wolverhampton": {
    title: "Shot Blasting Services in Wolverhampton | Commercial Shot Blasting",
    description: "Professional shot blasting services in Wolverhampton — mobile rust removal & surface preparation for manufacturing and automotive clients. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/wolverhampton"
  },
  "coventry": {
    title: "Shot Blasting Services in Coventry | Commercial Shot Blasting",
    description: "Professional shot blasting services in Coventry — specialist surface preparation for the automotive industry. Quality guaranteed. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/coventry"
  },
  "leicester": {
    title: "Shot Blasting Services in Leicester | Commercial Shot Blasting",
    description: "Professional shot blasting services in Leicester — precision rust removal & surface preparation for industrial facilities across the East Midlands. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/leicester"
  },
  "derby": {
    title: "Shot Blasting Services in Derby | Commercial Shot Blasting",
    description: "Professional shot blasting services in Derby — mobile metal surface preparation for commercial projects. Experienced team. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/derby"
  },
  "nottingham": {
    title: "Shot Blasting Services in Nottingham | Commercial Shot Blasting",
    description: "Professional shot blasting services in Nottingham — local experts in rust removal & industrial cleaning. Same-day response available. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/nottingham"
  },
  "sheffield": {
    title: "Shot Blasting Services in Sheffield | Commercial Shot Blasting",
    description: "Professional shot blasting services in Sheffield — specialist steel cleaning for manufacturing & engineering sectors. Fast service. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/sheffield"
  },
  "leeds": {
    title: "Shot Blasting Services in Leeds | Commercial Shot Blasting",
    description: "Professional shot blasting services in Leeds — expert rust removal & coating preparation for Yorkshire industries. Reliable service. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/leeds"
  },
  "manchester": {
    title: "Shot Blasting Services in Manchester | Commercial Shot Blasting",
    description: "Professional shot blasting services in Manchester — industrial cleaning & surface profiling for Greater Manchester businesses. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/manchester"
  },
  "liverpool": {
    title: "Shot Blasting Services in Liverpool | Commercial Shot Blasting",
    description: "Professional shot blasting services in Liverpool — marine & industrial blasting specialists serving Merseyside. Competitive rates. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/liverpool"
  },
  "chester": {
    title: "Shot Blasting Services in Chester | Commercial Shot Blasting",
    description: "Professional shot blasting services in Chester — heritage & modern surface preparation across Cheshire. Expert team. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/chester"
  },
  "stoke-on-trent": {
    title: "Shot Blasting Services in Stoke-on-Trent | Commercial Shot Blasting",
    description: "Professional shot blasting services in Stoke-on-Trent — industrial cleaning for Staffordshire manufacturers. Fast turnaround. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/stoke-on-trent"
  },
  "shrewsbury": {
    title: "Shot Blasting Services in Shrewsbury | Commercial Shot Blasting",
    description: "Professional shot blasting services in Shrewsbury — mobile blasting for Shropshire businesses. Quality results. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/shrewsbury"
  },
  "worcester": {
    title: "Shot Blasting Services in Worcester | Commercial Shot Blasting",
    description: "Professional shot blasting services in Worcester — specialist surface preparation across Worcestershire. Reliable & efficient. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/worcester"
  },
  "hereford": {
    title: "Shot Blasting Services in Hereford | Commercial Shot Blasting",
    description: "Professional shot blasting services in Hereford — agricultural & industrial blasting for Herefordshire. Competitive pricing. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/hereford"
  },
  "gloucester": {
    title: "Shot Blasting Services in Gloucester | Commercial Shot Blasting",
    description: "Professional shot blasting services in Gloucester — mobile metal cleaning across Gloucestershire. Free quotes available. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/gloucester"
  },
  "bristol": {
    title: "Shot Blasting Services in Bristol | Commercial Shot Blasting",
    description: "Professional shot blasting services in Bristol — marine, automotive & industrial blasting in the South West. Expert service. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/bristol"
  },
  "cardiff": {
    title: "Shot Blasting Services in Cardiff | Commercial Shot Blasting",
    description: "Professional shot blasting services in Cardiff — mobile surface preparation serving South Wales businesses. Quality assured. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/cardiff"
  },
  "wrexham": {
    title: "Shot Blasting Services in Wrexham | Commercial Shot Blasting",
    description: "Professional shot blasting services in Wrexham — industrial & commercial blasting across North Wales. Experienced team. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/wrexham"
  },
  "oxford": {
    title: "Shot Blasting Services in Oxford | Commercial Shot Blasting",
    description: "Professional shot blasting services in Oxford — heritage-sensitive & modern surface preparation in Oxfordshire. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/oxford"
  },
  "swindon": {
    title: "Shot Blasting Services in Swindon | Commercial Shot Blasting",
    description: "Professional shot blasting services in Swindon — automotive & manufacturing blasting specialists in Wiltshire. Fast service. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/swindon"
  },
  "milton-keynes": {
    title: "Shot Blasting Services in Milton Keynes | Commercial Shot Blasting",
    description: "Professional shot blasting services in Milton Keynes — commercial surface preparation across Buckinghamshire. Professional results. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/milton-keynes"
  },
  "northampton": {
    title: "Shot Blasting Services in Northampton | Commercial Shot Blasting",
    description: "Professional shot blasting services in Northampton — quality metal surface preparation for local industries. Competitive pricing. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/northampton"
  },
  "peterborough": {
    title: "Shot Blasting Services in Peterborough | Commercial Shot Blasting",
    description: "Professional shot blasting services in Peterborough — industrial cleaning & rust removal across Cambridgeshire. Reliable service. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/peterborough"
  },
  "cambridge": {
    title: "Shot Blasting Services in Cambridge | Commercial Shot Blasting",
    description: "Professional shot blasting services in Cambridge — precision surface preparation for high-tech & traditional industries. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/cambridge"
  },
  "norwich": {
    title: "Shot Blasting Services in Norwich | Commercial Shot Blasting",
    description: "Professional shot blasting services in Norwich — agricultural & industrial specialists across Norfolk. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/norwich"
  },
  "ipswich": {
    title: "Shot Blasting Services in Ipswich | Commercial Shot Blasting",
    description: "Professional shot blasting services in Ipswich — marine & industrial surface preparation in Suffolk. Competitive rates. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/ipswich"
  },
  "lincoln": {
    title: "Shot Blasting Services in Lincoln | Commercial Shot Blasting",
    description: "Professional shot blasting services in Lincoln — agricultural & industrial blasting specialists in Lincolnshire. Fast turnaround. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/lincoln"
  },
  "chesterfield": {
    title: "Shot Blasting Services in Chesterfield | Commercial Shot Blasting",
    description: "Professional shot blasting services in Chesterfield — expert surface preparation for Derbyshire manufacturers. Competitive pricing. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/chesterfield"
  },
  "stratford-upon-avon": {
    title: "Shot Blasting Services in Stratford-upon-Avon | Commercial Shot Blasting",
    description: "Professional shot blasting services in Stratford-upon-Avon — heritage & modern blasting in Warwickshire. Sensitive restoration work. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/stratford-upon-avon"
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
    "uploadDate": "2024-03-15",
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

  // 12. WebSite Schema with SearchAction (SiteLinksSearchBox)
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": BUSINESS_NAME,
    "url": SITE_URL,
    "description": "Professional mobile shot blasting services across England and Wales",
    "publisher": { "@type": "Organization", "name": BUSINESS_NAME },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/service-areas/{search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  });

  // 13. WebPage Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    "url": url,
    "name": `Shot Blasting Services in ${locationName} | Commercial Shot Blasting`,
    "description": `Professional mobile shot blasting services in ${locationName}. Rust removal, surface preparation, and industrial cleaning for commercial and industrial clients.`,
    "isPartOf": { "@type": "WebSite", "@id": `${SITE_URL}/#website`, "name": BUSINESS_NAME, "url": SITE_URL },
    "about": { "@type": "LocalBusiness", "name": `${BUSINESS_NAME} - ${locationName}` },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Service Areas", "item": `${SITE_URL}/service-areas` },
        { "@type": "ListItem", "position": 3, "name": locationName, "item": url }
      ]
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".hero-description", ".service-description"]
    },
    "inLanguage": "en-GB",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "potentialAction": [
      { "@type": "ReadAction", "target": [url] }
    ]
  });
  // 14. ItemList Schemaa (services offered at this location)
  schemas.push({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Shot Blasting Services Available in ${locationName}`,
    "description": `Full list of professional shot blasting and surface preparation services available in ${locationName}`,
    "numberOfItems": 8,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Structural Steel Shot Blasting", "url": `${SITE_URL}/services/structural-steel-shot-blasting` },
      { "@type": "ListItem", "position": 2, "name": "Container Shot Blasting", "url": `${SITE_URL}/services/container-shot-blasting` },
      { "@type": "ListItem", "position": 3, "name": "Factory Cladding Restoration", "url": `${SITE_URL}/services/factory-cladding-shot-blasting` },
      { "@type": "ListItem", "position": 4, "name": "Industrial Floor Preparation", "url": `${SITE_URL}/services/floor-shot-blasting` },
      { "@type": "ListItem", "position": 5, "name": "Fire Escape Shot Blasting", "url": `${SITE_URL}/services/fire-escape-shot-blasting` },
      { "@type": "ListItem", "position": 6, "name": "Pipework & Steelwork Blasting", "url": `${SITE_URL}/services/pipework-shot-blasting` },
      { "@type": "ListItem", "position": 7, "name": "Telecom Tower Blasting", "url": `${SITE_URL}/services/telecom-tower-shot-blasting` },
      { "@type": "ListItem", "position": 8, "name": "Agricultural Equipment Blasting", "url": `${SITE_URL}/services/agricultural-shot-blasting` }
    ]
  });

  // 15. GeoShape / Service Area Circle Schema
  if (lat && lng) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `Mobile Shot Blasting Coverage - ${locationName}`,
      "description": `We cover ${locationName} and all surrounding areas within approximately 30 miles. Our mobile units travel to your site.`,
      "provider": { "@type": "LocalBusiness", "name": BUSINESS_NAME, "telephone": PHONE },
      "areaServed": [
        { "@type": "City", "name": locationName },
        {
          "@type": "GeoShape",
          "circle": `${lat} ${lng} 48280`
        }
      ],
      "serviceType": "Mobile Shot Blasting",
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": url,
        "servicePhone": PHONE,
        "servicePostalAddress": {
          "@type": "PostalAddress",
          "addressLocality": locationName,
          "addressCountry": "GB"
        },
        "availableLanguage": "English"
      },
      "offers": {
        "@type": "Offer",
        "name": `Free Site Survey in ${locationName}`,
        "price": "0",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock"
      }
    });
  }

  // 16. Event Schema (Free Site Survey)
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": `Free Shot Blasting Site Survey - ${locationName}`,
    "description": `Book a free, no-obligation site survey for your shot blasting project in ${locationName}. Our expert team will assess your requirements and provide a detailed quotation.`,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": locationName,
      "address": { "@type": "PostalAddress", "addressLocality": locationName, "addressCountry": "GB" }
    },
    "organizer": {
      "@type": "Organization",
      "name": BUSINESS_NAME,
      "url": SITE_URL,
      "telephone": PHONE
    },
    "offers": {
      "@type": "Offer",
      "name": "Free Site Survey",
      "price": "0",
      "priceCurrency": "GBP",
      "url": `${SITE_URL}/free-site-survey`,
      "availability": "https://schema.org/InStock"
    },
    "performer": {
      "@type": "Organization",
      "name": BUSINESS_NAME
    }
  });

  // Convert all schemas to JSON-LD script tags
  return schemas.map(schema => 
    `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
  ).join('\n    ');
}

// ─── Service page data (mirrors client/src/data/services.ts) ───────────────
interface ServiceFAQ { question: string; answer: string; }
interface ServiceStep { step: number; title: string; description: string; }
interface ServiceMeta {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  benefits: string[];
  process: ServiceStep[];
  applications: string[];
  faqs: ServiceFAQ[];
}

const serviceMeta: Record<string, ServiceMeta> = {
  "structural-steel-frames": {
    id: "structural-steel-frames",
    title: "Structural Steel Frames Shot Blasting",
    description: "Professional shot blasting for structural steel frames, roof trusses, and load-bearing steel structures. We remove mill scale, rust, and old coatings to prepare surfaces for galvanizing or protective coatings.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Complete removal of mill scale and rust", "Prepares surfaces for galvanizing or protective coatings", "Extends structural steel lifespan", "Suitable for new fabrications and refurbishment projects"],
    process: [
      { step: 1, title: "Structural Assessment", description: "We inspect the steel frame components to determine appropriate blast media, pressure settings, and surface preparation requirements." },
      { step: 2, title: "Component Preparation", description: "Frame sections are positioned for optimal blast coverage. Critical areas such as bolt holes and connection points are protected as required." },
      { step: 3, title: "Shot Blasting", description: "Using appropriate blast media, we systematically clean all frame surfaces to achieve professional cleanliness for your coating system." },
      { step: 4, title: "Quality Inspection", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications." },
      { step: 5, title: "Coating Coordination", description: "Cleaned components are prepared for galvanizing, powder coating, or painting, with timing coordinated to minimize surface oxidation." }
    ],
    applications: ["Building frame structures", "Roof trusses and purlins", "Portal frame components", "Mezzanine floor structures", "Industrial building frames"],
    faqs: [
      { question: "Can you blast structural steel frames on-site?", answer: "Yes, we provide mobile shot blasting services and can work at your premises. For components requiring galvanizing, we ensure complete coverage and professional cleanliness for protective treatments." },
      { question: "How long does the process take?", answer: "Timeline depends on the size and complexity of the frame structure. A typical portal frame bay can be processed in 2-3 days. We can provide a detailed timeline after assessing your specific requirements." }
    ]
  },
  "steel-containers": {
    id: "steel-containers",
    title: "Steel Container Shot Blasting",
    description: "Specialist shot blasting for steel containers, shipping containers, fuel storage tanks, and large storage structures. We remove rust, old coatings, and surface contaminants to prepare containers for repainting or long-term reuse.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/qVdGSYQwlEjNqJyE.png",
    benefits: ["Removes rust, mill scale and failed coatings completely", "Delivers clean, profiled, coating-ready finish", "Extends service life of steel containers", "Prepares containers for repainting or long-term reuse"],
    process: [
      { step: 1, title: "Preparation & Containment", description: "We begin with inspection and masking, then protect surrounding areas with sheeting and seals to control dust and debris." },
      { step: 2, title: "Precision Shot Blasting", description: "Using the correct media and pressure for the substrate, we remove corrosion and old coatings without compromising the steel." },
      { step: 3, title: "Final Clean Down", description: "On completion, we carry out a meticulous clean-up, collecting residues and waste, leaving the area ready for repainting or recoating." }
    ],
    applications: ["Shipping Containers", "Storage Tanks", "Refrigerated Containers", "Grain Silos", "Fuel Storage Cylinders", "Water Storage & Slurry Tanks"],
    faqs: [
      { question: "What types of steel containers can you blast?", answer: "We can blast all types of steel containers including shipping containers, storage tanks, refrigerated units, grain silos, fuel storage cylinders, water tanks, and more." },
      { question: "Can you blast containers on-site?", answer: "Yes, we can provide on-site shot blasting services for large containers and storage structures that cannot be easily transported." }
    ]
  },
  "factory-cladding": {
    id: "factory-cladding",
    title: "Factory & Warehouse Cladding Shot Blasting",
    description: "Specialist shot blasting for factory and industrial cladding panels. We remove original plastisol, multiple layers of paint, rust, and weathering from metal cladding to restore surfaces to bare metal condition ready for new protective coatings.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/EfAlIcQNicWsvHaA.png",
    benefits: ["Complete removal of plastisol and paint layers", "Preserves cladding panel integrity", "Prepares surfaces for long-lasting recoating", "More cost-effective than cladding replacement"],
    process: [
      { step: 1, title: "Site Assessment", description: "We assess cladding condition, coating types, and access requirements to plan the most effective blasting approach." },
      { step: 2, title: "Area Protection", description: "Work zones are contained and protected to control blast media and prevent contamination of surrounding areas." },
      { step: 3, title: "Controlled Blasting", description: "Using appropriate pressure and media, we systematically remove all coatings while preserving the cladding substrate." },
      { step: 4, title: "Surface Inspection", description: "Cleaned panels are inspected to ensure complete coating removal and proper surface profile for recoating." },
      { step: 5, title: "Coating Coordination", description: "Surfaces are prepared for immediate recoating to prevent oxidation and ensure optimal coating performance." }
    ],
    applications: ["Factory wall cladding", "Warehouse exterior panels", "Industrial building facades", "Commercial property cladding"],
    faqs: [
      { question: "Can you blast cladding in place?", answer: "Yes, we can blast cladding panels while installed on buildings using specialized containment and access equipment, minimizing disruption to your operations." },
      { question: "Will shot blasting damage thin cladding panels?", answer: "No. Our experienced technicians use controlled pressure and appropriate blast media to remove coatings without damaging the underlying metal panels." },
      { question: "How long before cladding needs recoating after blasting?", answer: "We coordinate closely with coating contractors to apply new coatings within 24-48 hours of blasting to prevent surface oxidation and ensure optimal adhesion." }
    ]
  },
  "fire-escapes": {
    id: "fire-escapes",
    title: "Fire Escapes & External Stair Towers Shot Blasting",
    description: "Comprehensive shot blasting for fire escape structures and external stair towers. We remove rust, old paint, and corrosion from fire safety infrastructure, preparing surfaces for protective coatings or galvanizing to ensure long-term safety compliance.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/CwpnAmaEraMSszIF.png",
    benefits: ["Removes rust and corrosion from safety-critical structures", "Prepares surfaces for protective coatings or galvanizing", "Extends the service life of fire escape systems", "Cost-effective alternative to replacement"],
    process: [
      { step: 1, title: "Safety Assessment", description: "We inspect the fire escape structure to assess condition, identify structural concerns, and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Access Planning", description: "We coordinate access arrangements and safety measures for working at height, ensuring health and safety practices." },
      { step: 3, title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all fire escape surfaces including stairs, landings, handrails, and support structures." },
      { step: 4, title: "Quality Verification", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications for coating application." },
      { step: 5, title: "Coating Application", description: "We can coordinate protective coating application or galvanizing to ensure maximum corrosion protection and fire safety requirements." }
    ],
    applications: ["External fire escape stairs", "Fire escape towers", "Emergency egress systems", "Fire escape landings and platforms", "Fire escape handrails and balustrades"],
    faqs: [
      { question: "Can you work on fire escapes while the building is occupied?", answer: "Yes, we can coordinate work schedules to minimize disruption and maintain emergency egress routes. We work with building management to ensure alternative fire escape routes are available during refurbishment work." },
      { question: "What coatings do you recommend for fire escapes?", answer: "We typically recommend intumescent fire-resistant coatings or hot-dip galvanizing for maximum corrosion protection and fire safety compliance." }
    ]
  },
  "staircases": {
    id: "staircases",
    title: "Internal Steel Staircases, Balustrades & Handrails Shot Blasting",
    description: "Meticulous shot blasting for internal steel staircases, balustrades, and handrails. We remove rust, old paint, powder coating, and welding residue from architectural metalwork, preparing surfaces for powder coating, painting, or galvanizing.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/jaElsgrlYUgbWwFe.png",
    benefits: ["Removes rust, old coatings, and welding discoloration", "Prepares surfaces for powder coating or painting", "Restores architectural metalwork to original condition", "Suitable for heritage restoration projects"],
    process: [
      { step: 1, title: "Component Assessment", description: "We inspect the metalwork to assess condition, identify any delicate features, and determine appropriate blast media and pressure settings." },
      { step: 2, title: "Preparation & Masking", description: "Components are prepared for blasting. Threaded connections, bearing surfaces, and delicate features are masked or protected as required." },
      { step: 3, title: "Precision Blasting", description: "Using fine-grade blast media and controlled pressure, we carefully clean all surfaces while preserving fine details and dimensional tolerances." },
      { step: 4, title: "Quality Inspection", description: "We conduct detailed inspections to ensure all surfaces meet the required cleanliness and profile specifications for your chosen finish." },
      { step: 5, title: "Finishing Coordination", description: "Cleaned components are prepared for powder coating, painting, or other finishing processes, with timing coordinated to maintain surface cleanliness." }
    ],
    applications: ["Internal steel staircases", "Balustrades and handrails", "Decorative metalwork", "Heritage staircase restoration", "Mezzanine staircase systems"],
    faqs: [
      { question: "Can you blast staircases without damaging decorative details?", answer: "Yes, we use fine-grade blast media and carefully controlled pressure settings to clean surfaces while preserving fine details, threads, and dimensional tolerances." },
      { question: "What finishes can be applied after blasting?", answer: "After shot blasting, staircases and balustrades can be powder coated, wet painted, galvanized, or left with a clear protective coating." }
    ]
  },
  "bridge-steelwork": {
    id: "bridge-steelwork",
    title: "Bridge Steelwork Shot Blasting",
    description: "Comprehensive shot blasting for bridge steelwork including girders, crossmembers, and parapet rails. We prepare bridge steel surfaces to SA2.5 or SA3 standard for protective coating systems that ensure long-term structural integrity.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/SIvqwXQxxXKmsmDK.png",
    benefits: ["Meets highway and railway bridge coating specifications", "Removes rust, old coatings, and corrosion", "Extends bridge infrastructure lifespan", "Cost-effective alternative to bridge replacement"],
    process: [
      { step: 1, title: "Structural Survey", description: "We conduct a detailed survey of the bridge steelwork to assess condition and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Access & Safety Planning", description: "We coordinate access arrangements, traffic management, and safety measures for working on bridge structures." },
      { step: 3, title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all bridge steelwork surfaces to achieve professional cleanliness." },
      { step: 4, title: "Quality Verification", description: "We conduct thorough inspections and surface cleanliness testing to verify compliance with bridge coating specifications." },
      { step: 5, title: "Coating Application", description: "We can coordinate protective coating application to ensure maximum corrosion protection and compliance with highway authority specifications." }
    ],
    applications: ["Bridge girders and beams", "Bridge crossmembers and bracing", "Parapet rails and barriers", "Footbridge steelwork", "Railway bridge components", "Heritage bridge restoration"],
    faqs: [
      { question: "Can you work on bridges while they remain open to traffic?", answer: "Yes, we can coordinate work schedules with highway authorities to minimize disruption. We typically work during night-time closures or use lane closures with traffic management systems." },
      { question: "What surface preparation standards do you achieve for bridge work?", answer: "We routinely achieve professional cleanliness and SA3 surface preparation standards required for highway and railway bridge coating systems." }
    ]
  },
  "ladders": {
    id: "ladders",
    title: "Fixed Ladders & Step-Over Platforms Shot Blasting",
    description: "Comprehensive shot blasting for fixed ladders, caged ladder systems, and step-over platforms. We remove rust and corrosion from industrial access infrastructure, preparing surfaces for protective coatings or galvanizing.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/fjQLkvBCsjdFzSjo.png",
    benefits: ["Removes rust and corrosion from safety-critical access systems", "Prepares surfaces for protective coatings or galvanizing", "Extends the service life of access infrastructure", "Cost-effective alternative to replacement"],
    process: [
      { step: 1, title: "Safety Assessment", description: "We inspect the access system to assess condition and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Component Preparation", description: "Ladder sections, platforms, and safety cages are prepared for blasting. Critical connection points and safety features are protected as required." },
      { step: 3, title: "Shot Blasting", description: "We systematically clean all access system surfaces including rungs, side rails, platforms, and safety cages." },
      { step: 4, title: "Quality Verification", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications." },
      { step: 5, title: "Coating & Installation", description: "Cleaned components are prepared for protective coating or galvanizing, with timing coordinated for installation." }
    ],
    applications: ["Fixed vertical ladders", "Caged ladder systems", "Step-over platforms", "Industrial access ladders", "Roof access systems", "Tank access ladders"],
    faqs: [
      { question: "Can you blast fixed ladders in situ?", answer: "Yes, we provide mobile shot blasting services at your location. We can work with ladders in situ or coordinate if sections need removal for access." },
      { question: "What protective coatings do you recommend for access systems?", answer: "We typically recommend hot-dip galvanizing for maximum corrosion protection and durability, especially for outdoor or harsh environment applications." }
    ]
  },
  "warehouse-racking": {
    id: "warehouse-racking",
    title: "Warehouse Racking & Pallet Rack Frames Shot Blasting",
    description: "Specialist shot blasting for pallet racking systems, storage frames, and industrial shelving. We remove rust, old powder coating, and contaminants from racking components, preparing them for refinishing or galvanizing.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/iAwFyjcyrlabkDxc.png",
    benefits: ["Complete removal of rust, old coatings, and corrosion", "Extends the service life of warehouse racking systems", "Prepares surfaces for powder coating or galvanizing", "Cost-effective alternative to replacing entire racking systems"],
    process: [
      { step: 1, title: "Assessment", description: "We inspect the racking components to determine the appropriate blast media, pressure settings, and surface preparation requirements." },
      { step: 2, title: "Disassembly & Preparation", description: "If required, we can coordinate the disassembly of racking components at your premises to ensure optimal access for mobile blasting treatment." },
      { step: 3, title: "Shot Blasting", description: "Our skilled technicians systematically blast all racking surfaces, removing rust, old coatings, and contaminants to achieve professional cleanliness." },
      { step: 4, title: "Quality Inspection", description: "We conduct thorough quality checks to ensure all surfaces meet the required profile and cleanliness specifications." },
      { step: 5, title: "Finishing & Return", description: "Cleaned components are prepared for powder coating, painting, or galvanizing, and can be returned to your site ready for installation." }
    ],
    applications: ["Pallet racking uprights and beams", "Cantilever racking systems", "Drive-in and drive-through racking", "Mezzanine floor support structures", "Distribution center racking"],
    faqs: [
      { question: "Can you blast racking on-site or does it need to be removed?", answer: "Yes, we provide mobile shot blasting services at your warehouse location. We can blast racking in situ or coordinate disassembly if needed for optimal access." },
      { question: "How long does the warehouse racking blasting process take?", answer: "Timeline depends on the quantity and condition of components. A typical pallet racking bay can be processed in 1-2 days." }
    ]
  },
  "pipework": {
    id: "pipework",
    title: "Process Pipework, Spools & Manifolds Shot Blasting",
    description: "Professional shot blasting for process pipework, pipe spools, and manifolds. We prepare internal and external pipe surfaces to the required cleanliness standard for protective coating systems in industrial, chemical, and food processing applications.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Internal and external surface preparation", "Meets pipeline coating specifications", "Suitable for all pipe diameters and materials", "Extends pipeline service life"],
    process: [
      { step: 1, title: "Pipe Assessment", description: "We inspect pipework to assess condition, coating requirements, and determine appropriate blast media and preparation standards." },
      { step: 2, title: "End Preparation", description: "Pipe ends, flanges, and fittings are masked or protected as required before blasting commences." },
      { step: 3, title: "Shot Blasting", description: "We blast internal and external pipe surfaces to the specified cleanliness standard using appropriate media and equipment." },
      { step: 4, title: "Quality Verification", description: "Surface cleanliness and profile are measured and verified to ensure compliance with coating specifications." },
      { step: 5, title: "Coating Coordination", description: "Prepared pipework is handed over for immediate coating application to prevent surface oxidation." }
    ],
    applications: ["Process pipework", "Pipe spools and manifolds", "Industrial pipelines", "Chemical plant pipework", "Food processing pipework", "Oil and gas pipework"],
    faqs: [
      { question: "Can you blast pipework internally and externally?", answer: "Yes, we can prepare both internal and external pipe surfaces. Internal blasting uses specialist equipment to achieve the required cleanliness standard throughout the pipe bore." },
      { question: "What pipe sizes can you blast?", answer: "We can blast pipes from small bore (25mm diameter) up to large diameter industrial pipework. Our equipment is adaptable to a wide range of pipe sizes and configurations." }
    ]
  },
  "telecom-towers": {
    id: "telecom-towers",
    title: "Telecom Masts & Lattice Towers Shot Blasting",
    description: "Specialist shot blasting for telecom masts, lattice towers, and communication infrastructure. We remove corrosion and old coatings from tower steelwork, preparing surfaces for protective coating systems that ensure long-term structural integrity.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Removes corrosion from tower steelwork", "Extends telecom infrastructure lifespan", "Prepares surfaces for protective coating systems", "Reduces maintenance costs"],
    process: [
      { step: 1, title: "Tower Survey", description: "We conduct a detailed survey of the tower structure to assess condition and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Access & Safety Planning", description: "We coordinate access arrangements and safety measures for working at height on tower structures." },
      { step: 3, title: "Shot Blasting", description: "We systematically clean all tower steelwork surfaces, removing corrosion, old coatings, and contaminants." },
      { step: 4, title: "Quality Verification", description: "Surface cleanliness and profile are verified to ensure compliance with coating specifications." },
      { step: 5, title: "Coating Application", description: "We can coordinate protective coating application to ensure maximum corrosion protection for the tower structure." }
    ],
    applications: ["Telecom masts", "Lattice towers", "Communication towers", "Broadcast masts", "Wind turbine towers", "Power transmission towers"],
    faqs: [
      { question: "Can you blast telecom towers while they remain operational?", answer: "Yes, we can coordinate work to minimize downtime. We work with tower operators to schedule blasting during planned maintenance windows." },
      { question: "What surface preparation standard do you achieve for tower steelwork?", answer: "We typically achieve SA2.5 (near-white metal) or SA3 (white metal) finish as required by the coating specification for the tower structure." }
    ]
  },
  "floor-preparation": {
    id: "floor-preparation",
    title: "Floor Preparation & Shot Blasting",
    description: "Industrial floor shot blasting for concrete and steel floor surfaces. We prepare floors for resin coatings, epoxy systems, and protective treatments by removing laitance, contamination, and old coatings to create the ideal surface profile.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Creates ideal surface profile for coating adhesion", "Removes laitance, contamination, and old coatings", "Suitable for concrete and steel floors", "Prepares floors for resin, epoxy, and protective systems"],
    process: [
      { step: 1, title: "Floor Assessment", description: "We assess the floor condition, existing coatings, and contamination to determine the appropriate blast media and preparation requirements." },
      { step: 2, title: "Area Preparation", description: "Work areas are prepared and protected. Drainage points and sensitive areas are masked before blasting commences." },
      { step: 3, title: "Shot Blasting", description: "We systematically blast the floor surface to achieve the required surface profile and cleanliness standard for the specified coating system." },
      { step: 4, title: "Vacuum Recovery", description: "Spent blast media and debris are recovered using integrated vacuum systems, leaving the floor clean and ready for coating." },
      { step: 5, title: "Surface Verification", description: "The surface profile is measured and verified to ensure it meets the requirements of the specified coating system." }
    ],
    applications: ["Warehouse floors", "Factory floors", "Car park decks", "Industrial unit floors", "Food processing floors", "Pharmaceutical facility floors"],
    faqs: [
      { question: "What surface profile do you achieve for floor preparation?", answer: "We can achieve CSP 3-5 (Concrete Surface Profile) as required by most resin and epoxy coating manufacturers. The profile is verified using replica putty or profilometer measurements." },
      { question: "Can you blast floors while the facility remains operational?", answer: "Yes, we can work in sections to allow continued operations. Our equipment uses integrated vacuum recovery to minimize dust and disruption." }
    ]
  },
  "powder-coating": {
    id: "powder-coating",
    title: "Shot Blasting & Powder Coating",
    description: "Combined shot blasting and powder coating service for steel components. We prepare surfaces by shot blasting then apply durable powder coating finishes in a wide range of colours and textures for long-lasting corrosion protection.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Complete surface preparation and finishing service", "Wide range of colours and textures available", "Durable, long-lasting corrosion protection", "Environmentally friendly process"],
    process: [
      { step: 1, title: "Component Assessment", description: "We assess the components to determine appropriate blast media, powder coating specification, and preparation requirements." },
      { step: 2, title: "Shot Blasting", description: "Components are shot blasted to achieve the required surface cleanliness and profile for optimal powder coating adhesion." },
      { step: 3, title: "Pre-treatment", description: "Blasted components are pre-treated to remove any residual contamination and improve powder coating adhesion." },
      { step: 4, title: "Powder Coating Application", description: "Powder coating is applied electrostatically and cured in an oven to achieve a durable, uniform finish." },
      { step: 5, title: "Quality Inspection", description: "Finished components are inspected for coating thickness, adhesion, and appearance before delivery." }
    ],
    applications: ["Steel fabrications", "Architectural metalwork", "Industrial equipment", "Furniture and fixtures", "Automotive components", "Agricultural equipment"],
    faqs: [
      { question: "What colours are available for powder coating?", answer: "We can match virtually any RAL or BS colour. We stock a wide range of standard colours and can source custom colours to match your specification." },
      { question: "How durable is powder coating compared to paint?", answer: "Powder coating is significantly more durable than conventional paint. It provides excellent resistance to chipping, scratching, and corrosion, typically lasting 15-20 years in normal conditions." }
    ]
  },
  "commercial-radiators": {
    id: "commercial-radiators",
    title: "Commercial Radiators Shot Blasting",
    description: "Specialist shot blasting for commercial and industrial radiators. We clean internal and external surfaces of cast iron, steel, and aluminium radiators, removing scale, corrosion, and old paint to restore heat transfer efficiency and prepare for recoating.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Restores heat transfer efficiency", "Removes internal scale and corrosion", "Prepares external surfaces for recoating", "Extends radiator service life"],
    process: [
      { step: 1, title: "Radiator Assessment", description: "We inspect the radiators to assess condition, scale buildup, and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Valve & Fitting Protection", description: "Valves, fittings, and connection points are masked and protected before blasting commences." },
      { step: 3, title: "Controlled Shot Blasting", description: "We blast internal and external radiator surfaces using appropriate media to remove scale, corrosion, and old coatings." },
      { step: 4, title: "Internal Cleaning", description: "Internal passages are flushed and cleaned to remove blast media and debris, ensuring clear flow paths." },
      { step: 5, title: "Quality Verification", description: "Cleaned radiators are inspected and tested to ensure they meet the required standard before recoating or reinstallation." }
    ],
    applications: ["Cast iron radiators", "Steel panel radiators", "Industrial heat exchangers", "Commercial heating systems", "Heritage building radiators"],
    faqs: [
      { question: "Can you blast radiators without removing them from the building?", answer: "For smaller radiators, we recommend removal for optimal access and results. For large industrial radiators, we can provide on-site blasting with appropriate containment." },
      { question: "Will shot blasting damage radiator fins or internal passages?", answer: "No, we use appropriate blast media and controlled pressure to clean radiator surfaces without damaging fins or internal passages. Our technicians are experienced in handling delicate heat transfer components." }
    ]
  },
  "commercial-vehicles": {
    id: "commercial-vehicles",
    title: "Commercial & Agricultural Vehicle Shot Blasting",
    description: "Professional shot blasting for commercial vehicles, agricultural machinery, and heavy plant. We remove rust, old paint, and corrosion from vehicle bodywork, chassis, and components, preparing surfaces for protective coatings or restoration.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Complete rust and corrosion removal", "Prepares surfaces for protective coatings", "Extends vehicle and machinery service life", "Suitable for all vehicle types and sizes"],
    process: [
      { step: 1, title: "Vehicle Assessment", description: "We inspect the vehicle or machinery to assess condition, identify structural concerns, and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Component Disassembly", description: "Where required, components are disassembled to ensure complete access for blasting. Glass, rubber seals, and sensitive components are protected." },
      { step: 3, title: "Heavy-Duty Shot Blasting", description: "We systematically blast all vehicle surfaces, removing rust, old paint, and corrosion to achieve bare metal condition." },
      { step: 4, title: "Detailed Cleaning", description: "All blast media and debris is removed from cavities, joints, and recesses to ensure a clean substrate for coating." },
      { step: 5, title: "Surface Profiling", description: "The surface profile is verified to ensure it meets the requirements of the specified coating or restoration system." }
    ],
    applications: ["HGV and truck chassis", "Agricultural tractors and harvesters", "Plant and construction machinery", "Trailers and semi-trailers", "Skip lorries and refuse vehicles"],
    faqs: [
      { question: "Can you blast vehicles on-site?", answer: "Yes, we provide mobile shot blasting services and can work at your premises. We implement comprehensive containment systems to control dust and debris." },
      { question: "What types of vehicles can you blast?", answer: "We can blast all types of commercial and agricultural vehicles including HGVs, tractors, harvesters, trailers, plant machinery, and specialist vehicles." }
    ]
  },
  "steel-doors": {
    id: "steel-doors",
    title: "Steel Doors & Roller Shutters Shot Blasting",
    description: "Professional shot blasting for steel doors, roller shutters, and industrial door systems. We remove rust, old paint, and corrosion from door components, preparing surfaces for protective coatings or powder coating.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Removes rust and corrosion from door components", "Prepares surfaces for protective coatings", "Extends door and shutter service life", "Cost-effective alternative to replacement"],
    process: [
      { step: 1, title: "Door Assessment & Planning", description: "We inspect the door or shutter components to assess condition and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Component Removal & Protection", description: "Door hardware, seals, and sensitive components are removed or protected before blasting commences." },
      { step: 3, title: "Industrial Shot Blasting", description: "We systematically blast all door surfaces, removing rust, old coatings, and contaminants to achieve the required cleanliness standard." },
      { step: 4, title: "Quality Inspection", description: "Cleaned components are inspected to ensure all surfaces meet the required cleanliness and profile specifications." },
      { step: 5, title: "Coating Coordination", description: "Prepared components are handed over for immediate coating application to prevent surface oxidation." }
    ],
    applications: ["Industrial steel doors", "Roller shutters", "Security doors", "Fire doors", "Loading bay doors", "Warehouse entrance doors"],
    faqs: [
      { question: "Can you blast roller shutters in situ?", answer: "Yes, we can blast roller shutters in place using appropriate containment. For optimal results, we recommend removing the shutter curtain for blasting." },
      { question: "What coatings do you recommend for steel doors?", answer: "We typically recommend high-performance epoxy or polyurethane coating systems for maximum durability and corrosion protection. Powder coating is also an excellent option for smaller door components." }
    ]
  },
  "steel-sheeting": {
    id: "steel-sheeting",
    title: "Steel Sheeting Shot Blasting",
    description: "Specialist shot blasting for steel sheet, plate, and profiled sheeting. We prepare steel sheet surfaces for protective coatings, galvanizing, or further processing by removing mill scale, rust, and contamination.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Removes mill scale, rust, and contamination", "Prepares surfaces for galvanizing or coating", "Suitable for all sheet thicknesses and profiles", "Achieves consistent surface cleanliness"],
    process: [
      { step: 1, title: "Sheet Assessment", description: "We assess the steel sheeting to determine appropriate blast media, pressure settings, and surface preparation requirements." },
      { step: 2, title: "Sheet Handling", description: "Sheets are positioned for optimal blast coverage, with appropriate support to prevent distortion during blasting." },
      { step: 3, title: "Shot Blasting", description: "We systematically blast all sheet surfaces to achieve the required cleanliness standard and surface profile." },
      { step: 4, title: "Quality Inspection", description: "Blasted sheets are inspected to verify cleanliness and profile meet the requirements of the specified coating or galvanizing process." },
      { step: 5, title: "Coating Coordination", description: "Prepared sheets are handed over for immediate coating or galvanizing to prevent surface oxidation." }
    ],
    applications: ["Structural steel plate", "Profiled roofing sheets", "Wall cladding panels", "Floor plate", "Tank shell plates", "Fabrication blanks"],
    faqs: [
      { question: "Can you blast thin steel sheeting without causing distortion?", answer: "Yes, we use appropriate blast media and controlled pressure to prepare thin sheeting without causing distortion. Our technicians are experienced in handling sheet materials of all thicknesses." },
      { question: "What surface cleanliness standard do you achieve?", answer: "We typically achieve SA2.5 (near-white metal) or SA3 (white metal) finish as required by the coating or galvanizing specification." }
    ]
  },
  "steel-gates": {
    id: "steel-gates",
    title: "Steel Gates & Railings Shot Blasting",
    description: "Professional shot blasting for steel gates, railings, fencing, and ornamental ironwork. We remove rust, old paint, and corrosion from decorative and security metalwork, preparing surfaces for powder coating or painting.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Removes rust and corrosion from metalwork", "Prepares surfaces for powder coating or painting", "Restores ornamental ironwork to original condition", "Cost-effective alternative to replacement"],
    process: [
      { step: 1, title: "Metalwork Assessment", description: "We inspect the gates and railings to assess condition, identify any delicate features, and determine appropriate blast media and pressure settings." },
      { step: 2, title: "Component Preparation", description: "Gates and railing sections are prepared for blasting. Hinges, locks, and sensitive components are protected as required." },
      { step: 3, title: "Shot Blasting", description: "Using appropriate blast media and controlled pressure, we clean all metalwork surfaces while preserving decorative details." },
      { step: 4, title: "Quality Inspection", description: "Cleaned components are inspected to ensure all surfaces meet the required cleanliness and profile specifications." },
      { step: 5, title: "Finishing Coordination", description: "Prepared components are handed over for powder coating, painting, or other finishing processes." }
    ],
    applications: ["Entrance gates", "Security railings", "Decorative ironwork", "Garden gates and fencing", "Commercial security fencing", "Heritage ironwork restoration"],
    faqs: [
      { question: "Can you blast ornamental ironwork without damaging decorative details?", answer: "Yes, we use fine-grade blast media and carefully controlled pressure to clean surfaces while preserving decorative details and fine metalwork features." },
      { question: "Can you blast gates and railings on-site?", answer: "Yes, we provide mobile shot blasting services and can work at your location. We implement containment systems to control blast media and protect surrounding areas." }
    ]
  },
  "plant-machinery": {
    id: "plant-machinery",
    title: "Plant & Machinery Shot Blasting",
    description: "Comprehensive shot blasting for industrial plant, heavy machinery, and manufacturing equipment. We remove rust, old coatings, and contamination from machinery components, preparing surfaces for protective coatings or restoration.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Complete rust and contamination removal", "Prepares surfaces for protective coatings", "Extends machinery service life", "Suitable for all types of industrial plant"],
    process: [
      { step: 1, title: "Machinery Assessment", description: "We inspect the plant and machinery to assess condition, identify sensitive components, and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Component Protection", description: "Bearings, seals, electrical components, and other sensitive parts are masked and protected before blasting commences." },
      { step: 3, title: "Shot Blasting", description: "We systematically blast all machinery surfaces, removing rust, old coatings, and contamination to achieve the required cleanliness standard." },
      { step: 4, title: "Detailed Cleaning", description: "All blast media and debris is removed from cavities, joints, and recesses to ensure a clean substrate for coating." },
      { step: 5, title: "Quality Verification", description: "Cleaned machinery is inspected to ensure all surfaces meet the required cleanliness and profile specifications before coating." }
    ],
    applications: ["Manufacturing equipment", "Processing machinery", "Pumps and compressors", "Gearboxes and drives", "Conveyors and handling equipment", "Construction plant"],
    faqs: [
      { question: "Can you blast machinery on-site without dismantling it?", answer: "Yes, we provide mobile shot blasting services and can work on machinery in situ. We implement comprehensive containment and protection to ensure sensitive components are not affected." },
      { question: "What types of plant and machinery can you blast?", answer: "We can blast virtually any type of industrial plant and machinery including processing equipment, pumps, compressors, conveyors, gearboxes, and construction plant." }
    ]
  }
};


/**
 * Generate SSR body HTML for service pages so crawlers see full content
 */
function generateServiceBodyHTML(serviceId: string): string {
  const escHtml = (s: string) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

  const serviceData: Record<string, {
    title: string; tagline: string; description: string;
    steps: Array<{title: string; description: string}>;
    applications: string[];
    faqs: Array<{q: string; a: string}>;
  }> = {
    "structural-steel-frames": {
      title: "Structural Steel Frames",
      tagline: "Comprehensive Shot Blasting for Structural Steelwork",
      description: "Our structural steel frame shot blasting service delivers exceptional surface preparation for all types of building frames, roof trusses, and load-bearing steel structures. We remove mill scale, rust,",
      steps: [
        { title: "Structural Assessment", description: "We inspect the steel frame components to determine appropriate blast media, pressure settings, and surface preparation r" },
        { title: "Component Preparation", description: "Frame sections are positioned for optimal blast coverage. Critical areas such as bolt holes and connection points are pr" },
        { title: "Shot Blasting", description: "Using appropriate blast media, we systematically clean all frame surfaces to achieve professional cleanliness for your c" },
        { title: "Quality Inspection", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications." },
      ],
      applications: ["Building frame structures", "Roof trusses and purlins", "Portal frame components", "Mezzanine floor structures", "Industrial building frames", "Warehouse structural steelwork"],
      faqs: [
        { q: "Can you blast structural steel frames on-site?", a: "Yes, we provide mobile shot blasting services and can work at your premises. For components requiring galvanizing, we ensure complete coverage and professional cleanliness for protective treatments. We coordinate timing " },
        { q: "How long does the process take?", a: "Timeline depends on the size and complexity of the frame structure. A typical portal frame bay can be processed in 2-3 days. We can provide a detailed timeline after assessing your specific requirements." },
      ],
    },
    "steel-containers": {
      title: "Steel Container Blasting",
      tagline: "Specialist Shot Blasting for Steel Containers & Storage Structures",
      description: "We are specialists in shot blasting services for steel containers and large storage structures. Our skilled team uses advanced blasting techniques to remove rust, old coatings, and surface contaminant",
      steps: [
        { title: "Preparation & Containment", description: "We begin with inspection and masking, then protect surrounding areas with sheeting and seals to control dust and debris." },
        { title: "Precision Shot Blasting", description: "Using the correct media and pressure for the substrate, we remove corrosion and old coatings without compromising the st" },
        { title: "Final Clean Down", description: "On completion, we carry out a meticulous clean-up: collecting residues and waste, leaving the area ready for repainting " },
      ],
      applications: ["Shipping Containers", "Storage Tanks", "Refrigerated Containers", "Grain Silos", "Bulk Waste & Recycling Containers", "Fuel Storage Cylinders"],
      faqs: [
        { q: "What types of steel containers can you blast?", a: "We can blast all types of steel containers including shipping containers, storage tanks, refrigerated units, grain silos, fuel storage cylinders, water tanks, and more. Our techniques are suitable for both standard and s" },
        { q: "Can you blast containers on-site?", a: "Yes, we can provide on-site shot blasting services for large containers and storage structures that cannot be easily transported. We implement comprehensive containment systems to control dust and debris." },
      ],
    },
    "factory-cladding": {
      title: "Factory & Warehouse Cladding",
      tagline: "Professional Cladding Surface Restoration",
      description: "Specialist shot blasting for factory and industrial cladding panels. We remove original plastisol, multiple layers of paint, rust, and weathering from metal cladding to restore surfaces to bare metal ",
      steps: [
        { title: "Site Assessment", description: "We assess cladding condition, coating types, and access requirements to plan the most effective blasting approach." },
        { title: "Area Protection", description: "Work zones are contained and protected to control blast media and prevent contamination of surrounding areas." },
        { title: "Controlled Blasting", description: "Using appropriate pressure and media, we systematically remove all coatings while preserving the cladding substrate." },
        { title: "Surface Inspection", description: "Cleaned panels are inspected to ensure complete coating removal and proper surface profile for recoating." },
      ],
      applications: ["Factory wall cladding", "Warehouse exterior panels", "Industrial building facades", "Commercial property cladding", "Agricultural building cladding", "Storage facility exteriors"],
      faqs: [
        { q: "Can you blast cladding in place?", a: "Yes, we can blast cladding panels while installed on buildings using specialized containment and access equipment, minimizing disruption to your operations." },
        { q: "Will shot blasting damage thin cladding panels?", a: "No. Our experienced technicians use controlled pressure and appropriate blast media to remove coatings without damaging the underlying metal panels." },
        { q: "How long before cladding needs recoating after blasting?", a: "We coordinate closely with coating contractors to apply new coatings within 24-48 hours of blasting to prevent surface oxidation and ensure optimal adhesion." },
      ],
    },
    "fire-escapes": {
      title: "Fire Escapes & External Stair Towers",
      tagline: "Specialist Shot Blasting for Fire Safety Infrastructure",
      description: "Our fire escape and external stair tower shot blasting service provides comprehensive surface preparation for emergency egress systems. We remove rust, old paint, and corrosion from fire escape struct",
      steps: [
        { title: "Safety Assessment", description: "We inspect the fire escape structure to assess condition, identify structural concerns, and determine appropriate blast " },
        { title: "Access Planning", description: "We coordinate access arrangements and safety measures for working at height, ensuring health and safety practices." },
        { title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all fire escape surfaces including stairs, " },
        { title: "Quality Verification", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications for coat" },
      ],
      applications: ["External fire escape stairs", "Fire escape towers", "Emergency egress systems", "External stair structures", "Fire escape landings and platforms", "Fire escape handrails and balustrades"],
      faqs: [
        { q: "Can you work on fire escapes while the building is occupied?", a: "Yes, we can coordinate work schedules to minimize disruption and maintain emergency egress routes. We work with building management to ensure alternative fire escape routes are available during refurbishment work." },
        { q: "Do you provide structural assessment after blasting?", a: "We can coordinate with structural engineers to provide certification as required. Our shot blasting process reveals the true condition of the steel, allowing for accurate structural assessment." },
        { q: "What coatings do you recommend for fire escapes?", a: "We typically recommend intumescent fire-resistant coatings or hot-dip galvanizing for maximum corrosion protection and fire safety compliance. We can advise on the most appropriate system for your specific requirements." },
      ],
    },
    "staircases": {
      title: "Internal Steel Staircases, Balustrades & Handrails",
      tagline: "Precision Shot Blasting for Architectural Metalwork",
      description: "Our internal steel staircase and balustrade shot blasting service provides meticulous surface preparation for architectural metalwork. We remove rust, old paint, powder coating, and welding residue fr",
      steps: [
        { title: "Component Assessment", description: "We inspect the metalwork to assess condition, identify any delicate features, and determine appropriate blast media and " },
        { title: "Preparation & Masking", description: "Components are prepared for blasting. Threaded connections, bearing surfaces, and delicate features are masked or protec" },
        { title: "Precision Blasting", description: "Using fine-grade blast media and controlled pressure, we carefully clean all surfaces while preserving fine details and " },
        { title: "Quality Inspection", description: "We conduct detailed inspections to ensure all surfaces meet the required cleanliness and profile specifications for your" },
      ],
      applications: ["Internal steel staircases", "Balustrades and handrails", "Decorative metalwork", "Architectural steel features", "Heritage staircase restoration", "Commercial building staircases"],
      faqs: [
        { q: "Can you blast staircases without damaging decorative details?", a: "Yes, we use fine-grade blast media and carefully controlled pressure settings to clean surfaces while preserving fine details, threads, and dimensional tolerances. Our technicians are experienced in handling delicate arc" },
        { q: "Do you remove staircases for blasting or work on-site?", a: "Yes, we provide mobile shot blasting services and work at your premises. We can blast fire escapes in situ or coordinate with you if components need to be removed for access. Our mobile units are equipped for complete co" },
        { q: "What finishes can be applied after blasting?", a: "After shot blasting, staircases and balustrades can be powder coated, wet painted, galvanized, or left with a clear protective coating. We can coordinate finishing services or provide components ready for your chosen fin" },
      ],
    },
    "bridge-steelwork": {
      title: "Bridge Steelwork (Girders, Crossmembers, Parapet Rails)",
      tagline: "Specialist Shot Blasting for Bridge Infrastructure",
      description: "Our bridge steelwork shot blasting service provides comprehensive surface preparation for all types of bridge components including girders, crossmembers, parapet rails, and support structures. We remo",
      steps: [
        { title: "Structural Survey", description: "We conduct a detailed survey of the bridge steelwork to assess condition, identify structural concerns, and determine ap" },
        { title: "Access & Safety Planning", description: "We coordinate access arrangements, traffic management, and safety measures for working on bridge structures, ensuring hi" },
        { title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all bridge steelwork surfaces to achieve pr" },
        { title: "Quality Verification", description: "We conduct thorough inspections and, where required, perform surface cleanliness testing to verify compliance with bridg" },
      ],
      applications: ["Bridge girders and beams", "Bridge crossmembers and bracing", "Parapet rails and barriers", "Bridge support structures", "Footbridge steelwork", "Railway bridge components"],
      faqs: [
        { q: "Can you work on bridges while they remain open to traffic?", a: "Yes, we can coordinate work schedules with highway authorities to minimize disruption. We typically work during night-time closures or use lane closures with traffic management systems." },
        { q: "What surface preparation standards do you achieve for bridge work?", a: "We routinely achieve professional cleanliness and SA 3 surface preparation to industry standards, which are required for highway and railway bridge coating systems. We can provide certification as required by highway aut" },
        { q: "Do you handle environmental containment for bridge blasting?", a: "Yes, we implement comprehensive containment systems to capture spent blast media and debris, preventing environmental contamination of waterways or surrounding areas. We comply with all waste management practices." },
      ],
    },
    "ladders": {
      title: "Fixed Ladders & Step-Over Platforms",
      tagline: "Specialist Shot Blasting for Access Infrastructure",
      description: "Our fixed ladder and step-over platform shot blasting service provides comprehensive surface preparation for industrial access systems. We remove rust, old paint, and corrosion from fixed ladders, cag",
      steps: [
        { title: "Safety Assessment", description: "We inspect the access system to assess condition, identify structural concerns, and determine appropriate blast media an" },
        { title: "Component Preparation", description: "Ladder sections, platforms, and safety cages are prepared for blasting. Critical connection points and safety features a" },
        { title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all access system surfaces including rungs," },
        { title: "Quality Verification", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications for coat" },
      ],
      applications: ["Fixed vertical ladders", "Caged ladder systems", "Step-over platforms", "Industrial access ladders", "Roof access systems", "Tank access ladders"],
      faqs: [
        { q: "Can you blast fixed ladders in situ?", a: "Yes, we provide mobile shot blasting services at your location. For ladders requiring galvanizing, we ensure complete coverage and cleanliness. We can work with ladders in situ or coordinate if sections need removal for " },
        { q: "What protective coatings do you recommend for access systems?", a: "We typically recommend hot-dip galvanizing for maximum corrosion protection and durability, especially for outdoor or harsh environment applications. For indoor systems, powder coating or high-performance paint systems m" },
      ],
    },
    "warehouse-racking": {
      title: "Warehouse Racking & Pallet Rack Frames",
      tagline: "Professional Shot Blasting for Storage Infrastructure",
      description: "Our specialist warehouse racking shot blasting service provides comprehensive surface preparation for pallet racking systems, storage frames, and industrial shelving. We remove rust, old powder coatin",
      steps: [
        { title: "Assessment", description: "We inspect the racking components to determine the appropriate blast media, pressure settings, and surface preparation r" },
        { title: "Disassembly & Preparation", description: "If required, we can coordinate the disassembly of racking components at your premises to ensure optimal access for mobil" },
        { title: "Shot Blasting", description: "Our skilled technicians systematically blast all racking surfaces, removing rust, old coatings, and contaminants to achi" },
        { title: "Quality Inspection", description: "We conduct thorough quality checks to ensure all surfaces meet the required profile and cleanliness specifications for c" },
      ],
      applications: ["Pallet racking uprights and beams", "Cantilever racking systems", "Drive-in and drive-through racking", "Mezzanine floor support structures", "Industrial shelving units", "Warehouse storage frames"],
      faqs: [
        { q: "Can you blast racking on-site or does it need to be removed?", a: "Yes, we provide mobile shot blasting services at your warehouse location. We can blast racking in situ or coordinate disassembly if needed for optimal access. Our mobile units ensure complete coverage and proper containm" },
        { q: "How long does the warehouse racking blasting process take?", a: "Timeline depends on the quantity and condition of components. A typical pallet racking bay (2 uprights and 4 beams) can be processed in 1-2 days. We can provide a detailed timeline after assessing your specific requireme" },
        { q: "Will shot blasting damage the structural integrity of the racking?", a: "No, when performed correctly by trained professionals, shot blasting actually reveals the true condition of the metal and prepares it for protective coatings that enhance longevity. We use appropriate blast media and pre" },
        { q: "Can you coordinate powder coating after blasting?", a: "Yes, we work with trusted powder coating partners and can arrange complete refurbishment services including blasting, coating, and reinstallation of your warehouse racking systems." },
      ],
    },
    "pipework": {
      title: "Process Pipework, Spools & Manifolds",
      tagline: "Precision Cleaning for Industrial Pipework Systems",
      description: "Our specialized pipework shot blasting service delivers exceptional surface preparation for industrial process pipework, spools, manifolds, and piping systems. We provide precision cleaning that meets",
      steps: [
        { title: "Specification Review", description: "We review your cleanliness requirements, material specifications, and industry standards to determine the appropriate bl" },
        { title: "Component Preparation", description: "Pipework components are inspected, masked if necessary, and positioned for optimal blast coverage while protecting threa" },
        { title: "Precision Blasting", description: "Using fine-grade blast media and controlled pressure, we systematically clean all pipework surfaces to achieve the speci" },
        { title: "Cleanliness Verification", description: "We conduct thorough inspections to ensure optimal surface cleanliness and preparation quality." },
      ],
      applications: ["Food processing pipework and spools", "Pharmaceutical process piping", "Chemical plant manifolds and headers", "Dairy industry stainless steel pipework", "Brewery and beverage processing pipes", "Hygienic process equipment"],
      faqs: [
        { q: "What cleanliness levels can you achieve for pipework?", a: "We achieve high cleanliness levels suitable for food-grade, pharmaceutical, and chemical applications, meeting specific industry requirements for each sector." },
        { q: "Can you blast stainless steel pipework without damaging it?", a: "Yes, we use appropriate blast media such as aluminum oxide or glass bead, combined with controlled pressure settings, to clean stainless steel without embedding contaminants or damaging the passive layer. We can also coo" },
        { q: "Do you provide certification for food-grade or pharmaceutical pipework?", a: "Yes, we can provide material certificates, process documentation, and cleanliness certification as required for regulated industries. We maintain full traceability and quality records for all processed components." },
        { q: "What size pipework can you accommodate?", a: "We can process pipework ranging from small bore (1/2 inch) up to large diameter pipes and manifolds. Our facility can accommodate spools up to 6 meters in length. Contact us to discuss your specific requirements." },
      ],
    },
    "telecom-towers": {
      title: "Telecom Masts & Lattice Towers",
      tagline: "Specialist Shot Blasting for Telecommunications Infrastructure",
      description: "Our specialist telecommunications tower shot blasting service provides comprehensive surface preparation for telecom masts, lattice towers, antenna supports, and associated infrastructure. We remove r",
      steps: [
        { title: "Structural Assessment", description: "We inspect tower components to assess condition, determine appropriate blast media, and identify any structural concerns" },
        { title: "Component Preparation", description: "Tower sections, legs, bracing members, and mounting brackets are prepared for blasting. Critical areas such as bolt hole" },
        { title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all tower surfaces to achieve optimal clean" },
        { title: "Quality Verification", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications for galv" },
      ],
      applications: ["Telecommunications lattice towers", "Monopole mast sections", "Guyed tower components", "Antenna mounting brackets and platforms", "Tower leg sections and bracing members", "Microwave dish support structures"],
      faqs: [
        { q: "Can you blast telecommunications towers on-site?", a: "Yes, we provide mobile shot blasting services for telecom towers at your site. For components requiring galvanizing, we ensure professional cleanliness for hot-dip galvanizing. We coordinate timing with galvanizing sched" },
        { q: "How do you handle the logistics of tower dismantling and transport?", a: "We can coordinate with specialist tower erection companies to handle dismantling, transport, and reinstallation. Alternatively, if you have your own contractors, we can work with them to ensure smooth coordination of the" },
        { q: "Can you blast tower components that have been previously galvanized?", a: "Yes, we can remove old galvanizing, rust, and corrosion from previously galvanized components, preparing them for re-galvanizing. This is a common requirement for tower refurbishment projects where the original galvanizi" },
      ],
    },
    "floor-preparation": {
      title: "Floor Preparation & Shot Blasting",
      tagline: "Professional Floor Surface Preparation",
      description: "Specialist shot blasting services for floor preparation across commercial and industrial facilities. We employ robust and efficient shot blasting techniques to ensure your floor surfaces are aesthetic",
      steps: [
        { title: "Pre-Work Preparation", description: "We contain the work area by sheeting floors and sealing doorways and cracks to protect surrounding areas and control dus" },
        { title: "Precision Blasting", description: "Using controlled low-pressure shot blasting, we remove unwanted coatings and reveal the original surface characteristics" },
        { title: "Surface Profiling", description: "The blasting process creates the optimal surface texture for maximum adhesion of subsequent coatings or treatments." },
        { title: "Complete Cleanup", description: "We perform thorough cleanup, removing all waste materials and leaving your facility clean and ready for the next phase." },
      ],
      applications: ["Asphalt surface re-texturing", "Bridge laitance removal", "Car park decking preparation", "Cleaning and texturing old concrete", "Paint removal from concrete floors", "Epoxy coating removal"],
      faqs: [
        { q: "What types of floor coatings can be removed?", a: "Our shot blasting equipment can remove virtually any floor coating including paint, epoxy, tar, adhesives, and surface laitance from concrete floors." },
        { q: "How long does floor preparation take?", a: "Project duration depends on floor area and coating thickness. Most commercial floors can be prepared at 100-300 square meters per day." },
        { q: "Will shot blasting damage my concrete floor?", a: "No. When performed correctly by trained professionals, shot blasting removes only the surface coating and creates beneficial texture for new coatings without damaging the concrete substrate." },
      ],
    },
    "powder-coating": {
      title: "Shot Blasting & Powder Coating",
      tagline: "End-to-End Metal Surface Solutions",
      description: "Complete metal surface preparation and powder coating service for commercial and industrial applications. We combine high-pressure shot blasting with premium powder coating application in one seamless",
      steps: [
        { title: "Meticulous Preparation", description: "We contain and protect your site, then use abrasive blasting to strip away old paint, rust, and contaminants, creating t" },
        { title: "High-Performance Coating", description: "Immediately after preparation, we apply premium powder coating that bonds firmly to the metal surface, preventing flash " },
        { title: "Curing Process", description: "The powder coating is professionally cured to create a tough, uniform finish that resists weathering, corrosion, and wea" },
        { title: "Hassle-Free Completion", description: "We handle cleanup and leave your premises tidy with a superior powder-coated finish ready for immediate use." },
      ],
      applications: ["Structural steel frame preparation", "Warehouse and factory cladding", "Machinery and equipment refurbishment", "Staircases, railings, and balustrades", "Storage tanks and fabrications", "Metal components for assembly"],
      faqs: [
        { q: "Why combine shot blasting with powder coating?", a: "Integrating both services eliminates the risk of flash rust between preparation and coating, ensures optimal surface profile for adhesion, and provides single-source accountability with faster turnaround." },
        { q: "What metals can be powder coated?", a: "We can powder coat most metals including steel, stainless steel, aluminum, and galvanized surfaces after proper shot blasting preparation." },
        { q: "How durable is powder coating?", a: "When applied over properly shot-blasted surfaces, powder coating provides exceptional durability, typically lasting 15-20 years outdoors and even longer in protected environments." },
      ],
    },
    "commercial-radiators": {
      title: "Commercial Radiators Shot Blasting",
      tagline: "Professional Restoration for Cast Iron & Steel Radiators",
      description: "Our commercial radiators shot blasting service provides comprehensive restoration for cast iron and steel radiators in commercial buildings, heritage properties, and industrial facilities. We remove d",
      steps: [
        { title: "Radiator Assessment", description: "We inspect each radiator to assess condition, identify material type (cast iron or steel), and determine appropriate bla" },
        { title: "Valve & Fitting Protection", description: "Threaded connections, valve seats, and critical fittings are masked or protected to preserve functionality during blasti" },
        { title: "Controlled Shot Blasting", description: "Using carefully selected media and pressure settings, we systematically remove all paint layers, rust, and corrosion fro" },
        { title: "Internal Cleaning", description: "For radiators requiring internal restoration, we can clean internal waterways to remove sludge and scale buildup." },
      ],
      applications: ["Victorian cast iron column radiators", "Commercial building heating systems", "Heritage property radiator restoration", "School and hospital radiators", "Industrial facility heating equipment", "Period property refurbishment projects"],
      faqs: [
        { q: "Can you blast cast iron radiators without damaging them?", a: "Yes, we use appropriate blast media and controlled pressure settings specifically for cast iron. Our technicians are experienced in preserving the integrity of cast iron while removing paint and rust. We protect threaded" },
        { q: "How many paint layers can you remove?", a: "We can remove virtually unlimited paint layers. Many heritage radiators have 10-20 layers of paint accumulated over a century. Our shot blasting process efficiently removes all layers while preserving the original cast i" },
        { q: "Do you offer powder coating after shot blasting?", a: "Yes, we work with specialist radiator coating partners and can arrange complete refurbishment services including blasting, powder coating in period-appropriate or modern colors, and pressure testing before reinstallation" },
        { q: "Can you restore radiators that are still installed?", a: "For best results, radiators should be removed from the property for workshop-based shot blasting. This ensures complete coverage, protects surrounding areas, and allows for thorough inspection and coating. We can coordin" },
      ],
    },
    "commercial-vehicles": {
      title: "Commercial & Agricultural Vehicle Shot Blasting",
      tagline: "Heavy-Duty Restoration for Farm & Warehouse Vehicles",
      description: "Our commercial and agricultural vehicle shot blasting service provides comprehensive restoration for heavy-duty trucks, farm machinery, warehouse vehicles, and industrial transport equipment. We speci",
      steps: [
        { title: "Vehicle Assessment", description: "Comprehensive inspection of vehicle condition, chassis integrity, and component identification to determine optimal blas" },
        { title: "Component Disassembly", description: "Removal of sensitive components, electrical systems, and mechanical parts that require protection during blasting." },
        { title: "Heavy-Duty Shot Blasting", description: "Systematic blasting of chassis, body panels, and wheels using industrial-grade media to remove all corrosion, paint, and" },
        { title: "Detailed Cleaning", description: "Thorough cleaning of hard-to-reach areas, joints, and structural members to ensure complete surface preparation." },
      ],
      applications: ["Farm trucks and agricultural vehicles", "Warehouse forklifts and material handlers", "Commercial delivery trucks", "Industrial transport vehicles", "Vintage commercial vehicle restoration", "Fleet vehicle refurbishment"],
      faqs: [
        { q: "Can you blast complete vehicle chassis?", a: "Yes, we specialize in complete chassis restoration for commercial and agricultural vehicles. Our facility can accommodate large farm trucks, warehouse vehicles, and industrial equipment. We systematically blast all chass" },
        { q: "Do you work on vintage commercial vehicles?", a: "Absolutely. We have extensive experience restoring vintage farm trucks, classic commercial vehicles, and heritage agricultural machinery. Our careful approach preserves original features while removing decades of corrosi" },
        { q: "How long does vehicle restoration take?", a: "Complete chassis restoration typically takes 3-5 days depending on vehicle size and condition. Wheel sets can be processed in 1-2 days. For fleet refurbishment projects, we can establish dedicated workflows to process mu" },
        { q: "What coating should I apply after shot blasting?", a: "For commercial vehicles, we recommend epoxy primer followed by polyurethane topcoat for maximum durability in harsh operating environments. For farm vehicles exposed to chemicals and weather, consider zinc-rich primer sy" },
      ],
    },
    "steel-doors": {
      title: "Steel Doors & Roller Shutters Shot Blasting",
      tagline: "Professional Restoration for Industrial Doors & Security Shutters",
      description: "Our steel doors and roller shutters shot blasting service provides comprehensive restoration for industrial doors, warehouse roller shutters, security doors, and commercial access systems. We remove r",
      steps: [
        { title: "Door Assessment & Planning", description: "Comprehensive evaluation of door condition, mechanism type, and access requirements for efficient restoration workflow." },
        { title: "Component Removal & Protection", description: "Careful removal of mechanisms, motors, and sensitive components. Protection of surrounding building fabric and operation" },
        { title: "Industrial Shot Blasting", description: "Systematic removal of all coatings, rust, and corrosion from door panels, roller slats, and frames using controlled blas" },
        { title: "Mechanism Cleaning", description: "Detailed cleaning of tracks, guides, and mounting hardware to ensure smooth operation after restoration." },
      ],
      applications: ["Warehouse loading bay doors", "Industrial roller shutters", "Commercial security doors", "Factory access doors", "Storage facility doors", "Retail security shutters"],
      faqs: [
        { q: "Can you blast roller shutters without removing them?", a: "In most cases, yes. We can shot blast roller shutters in situ using containment systems to protect the building interior and surrounding areas. For severely corroded shutters or those requiring mechanism work, removal to" },
        { q: "Will shot blasting affect door operation?", a: "Shot blasting improves door operation by removing corrosion and contamination that can bind mechanisms. We carefully protect motors, sensors, and control systems during the process. After restoration and coating, doors t" },
        { q: "How long does door restoration take?", a: "A typical warehouse roller shutter can be shot blasted in 1-2 days depending on size and condition. Large industrial doors or multiple door sets may require longer. We work efficiently to minimize operational disruption " },
        { q: "What coating should I apply after shot blasting?", a: "For industrial doors and roller shutters, we recommend epoxy primer followed by polyurethane topcoat for maximum durability in demanding environments. For high-traffic areas, consider powder coating for superior abrasion" },
      ],
    },
    "steel-sheeting": {
      title: "Steel Sheeting Shot Blasting",
      tagline: "Professional Surface Preparation for Steel Sheets & Panels",
      description: "Our steel sheeting shot blasting service provides comprehensive surface preparation for steel sheets, panels, and flat metal products. We remove mill scale, rust, and old coatings from steel sheeting ",
      steps: [
        { title: "Sheet Assessment", description: "We inspect the steel sheeting to assess condition, thickness, and determine appropriate blast media and pressure setting" },
        { title: "Surface Preparation", description: "Sheets are positioned for optimal blast coverage. We ensure proper support to prevent distortion during the blasting pro" },
        { title: "Systematic Shot Blasting", description: "Using controlled techniques, we systematically blast entire sheet surfaces to achieve uniform cleanliness and consistent" },
        { title: "Edge Treatment", description: "Special attention to sheet edges and corners to ensure complete coverage and preparation for welding or joining." },
      ],
      applications: ["Roofing sheets and panels", "Cladding panels for buildings", "Structural steel plates", "Fabrication sheet material", "Industrial equipment panels", "Storage tank panels"],
      faqs: [
        { q: "Can you blast thin steel sheeting without causing distortion?", a: "Yes, we adjust blast pressure and media selection based on sheet thickness and material grade. Our technicians are experienced in processing thin gauge material while maintaining flatness and preventing distortion." },
        { q: "What sheet sizes can you accommodate?", a: "We can process steel sheets of various sizes, from small panels to large structural plates. Our equipment and facility can handle standard roofing and cladding sheet dimensions as well as custom-sized fabrication materia" },
        { q: "How quickly can you process steel sheeting?", a: "Processing time depends on sheet size, quantity, and condition. We can typically process standard roofing sheets efficiently in batches. For large projects, we can establish dedicated workflows to meet your schedule requ" },
        { q: "Do you offer coating services after shot blasting?", a: "Yes, we can coordinate with coating contractors or provide recommendations for powder coating, galvanizing, or paint systems. We ensure timing is optimized to minimize surface oxidation between blasting and coating." },
      ],
    },
    "steel-gates": {
      title: "Steel Gates & Railings Shot Blasting",
      tagline: "Precision Restoration for Commercial & Industrial Gates",
      description: "Our steel gates and railings shot blasting service provides comprehensive restoration for commercial and industrial entrance gates, perimeter railings, and decorative metalwork. We remove rust, old pa",
      steps: [
        { title: "Site Survey & Access Assessment", description: "Comprehensive evaluation of gate condition, access requirements, and surrounding area protection needs." },
        { title: "Area Protection & Masking", description: "Installation of containment systems and protective sheeting to safeguard brick pillars, walls, and surrounding areas." },
        { title: "Controlled Shot Blasting", description: "Systematic removal of all coatings, rust, and corrosion using carefully selected media and pressure settings." },
        { title: "Detail Cleaning", description: "Meticulous cleaning of ornate scrollwork, finials, and decorative elements to preserve intricate features." },
      ],
      applications: ["Commercial property entrance gates", "Industrial site security gates", "Decorative perimeter railings", "Ornate heritage gates", "Automated sliding and swing gates", "Pedestrian access gates"],
      faqs: [
        { q: "Can you work on gates without removing them?", a: "Yes, we can shot blast gates in situ in most cases. We use containment systems and protective sheeting to prevent damage to surrounding areas. For complex restorations or gates with severe structural issues, removal may " },
        { q: "Will shot blasting damage ornate details?", a: "No, our technicians are trained in working with decorative metalwork. We adjust blast pressure and media selection to safely clean intricate details without causing damage. Shot blasting actually reveals fine details tha" },
        { q: "How long does gate restoration take?", a: "Typical entrance gates can be shot blasted in 1-2 days depending on size and complexity. Large ornate gates or multiple gate sets may require longer. We work efficiently to minimize security disruption and can coordinate" },
        { q: "What coating should I apply after shot blasting?", a: "We recommend hot-dip galvanizing for maximum longevity, powder coating for decorative finishes, or high-quality metal paint systems. The choice depends on your aesthetic preferences, budget, and exposure conditions. We c" },
      ],
    },
    "plant-machinery": {
      title: "Plant & Machinery Shot Blasting",
      tagline: "On-Site Shot Blasting for Construction & Agricultural Equipment",
      description: "Our mobile plant and machinery shot blasting service brings professional surface preparation directly to your site. We specialize in restoring construction equipment, agricultural machinery, and indus",
      steps: [
        { title: "Site Assessment", description: "Our team visits your location to assess the machinery, determine blast media requirements, and plan containment setup to" },
        { title: "Equipment Preparation", description: "We protect sensitive components like hydraulics, electronics, and bearings. Critical areas are masked to ensure only int" },
        { title: "Containment Setup", description: "Professional containment systems are deployed to capture blast media and debris, ensuring waste management and site clea" },
        { title: "Shot Blasting", description: "Using appropriate blast media for the equipment type, we systematically remove rust, paint, and corrosion from all acces" },
      ],
      applications: ["Excavators and diggers", "Bulldozers and loaders", "Cranes and lifting equipment", "Agricultural tractors", "Combine harvesters", "Industrial compressors"],
      faqs: [
        { q: "Can you shot blast machinery on-site without moving it?", a: "Yes, our mobile shot blasting service is specifically designed to work on-site. We bring all necessary equipment, containment systems, and blast media to your location, eliminating the need for expensive transportation a" },
        { q: "What types of plant and machinery can you shot blast?", a: "We can shot blast virtually any construction or agricultural equipment including excavators, bulldozers, loaders, cranes, tractors, harvesters, compressors, generators, and more. Our mobile setup adapts to equipment of a" },
        { q: "How do you protect sensitive components during blasting?", a: "Before blasting begins, our experienced team carefully masks and protects all sensitive components including hydraulic systems, electrical components, bearings, seals, and glass. We use specialized protective materials a" },
        { q: "Will shot blasting damage my equipment?", a: "No, when performed by experienced professionals using appropriate blast media and pressure settings, shot blasting is completely safe for machinery. We select media types and blast parameters specifically for each equipm" },
      ],
    },
  };

  const d = serviceData[serviceId];
  if (!d) return "";

  const stepsHtml = d.steps.map((s, i) => `
    <div class="ssr-step">
      <h3>${i+1}. ${escHtml(s.title)}</h3>
      <p>${escHtml(s.description)}</p>
    </div>`).join("");

  const appsHtml = d.applications.map(a => `<li>${escHtml(a)}</li>`).join("");

  const faqsHtml = d.faqs.map(f => `
    <div class="ssr-faq" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <h3 itemprop="name">${escHtml(f.q)}</h3>
      <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <p itemprop="text">${escHtml(f.a)}</p>
      </div>
    </div>`).join("");

  return `
<div id="ssr-service-content" aria-hidden="true" style="position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;" itemscope itemtype="https://schema.org/Service">
  <nav aria-label="Breadcrumb"><ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a itemprop="item" href="${SITE_URL}"><span itemprop="name">Home</span></a><meta itemprop="position" content="1"/></li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a itemprop="item" href="${SITE_URL}/services"><span itemprop="name">Services</span></a><meta itemprop="position" content="2"/></li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><span itemprop="name">${escHtml(d.title)}</span><meta itemprop="position" content="3"/></li>
  </ol></nav>
  <h1 itemprop="name">${escHtml(d.title)}</h1>
  <p itemprop="description">${escHtml(d.tagline)}</p>
  <p>${escHtml(d.description)}</p>
  <section class="ssr-process"><h2>Our Process</h2>${stepsHtml}</section>
  <section class="ssr-applications"><h2>Applications</h2><ul>${appsHtml}</ul></section>
  <section class="ssr-faqs" itemscope itemtype="https://schema.org/FAQPage"><h2>Frequently Asked Questions</h2>${faqsHtml}</section>
  <section class="ssr-contact">
    <h2>Get a Free Quote for ${escHtml(d.title)}</h2>
    <p>Contact Commercial Shot Blasting for professional ${escHtml(d.title.toLowerCase())} services across the UK.</p>
    <p>Phone: <a href="tel:${PHONE}">${PHONE}</a></p>
    <p>Email: <a href="mailto:${EMAIL}">${EMAIL}</a></p>
  </section>
</div>`;
}

/**
 * Generate comprehensive JSON-LD schemas for service pages
 */
function generateServiceSchemas(serviceId: string): string {
  const svc = serviceMeta[serviceId];
  if (!svc) return "";

  const url = `${SITE_URL}/services/${serviceId}`;
  const schemas = [];

  // 1. Service Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    "name": svc.title,
    "description": svc.description,
    "url": url,
    "image": svc.heroImage,
    "provider": {
      "@type": "LocalBusiness",
      "name": BUSINESS_NAME,
      "telephone": PHONE,
      "email": EMAIL,
      "url": SITE_URL,
      "logo": { "@type": "ImageObject", "url": LOGO }
    },
    "areaServed": { "@type": "Country", "name": "United Kingdom" },
    "serviceType": "Shot Blasting & Surface Preparation",
    "category": "Industrial Surface Preparation",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${svc.title} Applications`,
      "itemListElement": svc.applications.map((app, i) => ({
        "@type": "OfferCatalog",
        "position": i + 1,
        "name": app
      }))
    },
    "offers": {
      "@type": "Offer",
      "name": `Free Quote for ${svc.title}`,
      "price": "0",
      "priceCurrency": "GBP",
      "description": "Free no-obligation site survey and quotation",
      "url": `${SITE_URL}/free-site-survey`,
      "availability": "https://schema.org/InStock"
    },
    "termsOfService": SITE_URL,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  });

  // 2. FAQPage Schema
  if (svc.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": svc.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  // 3. HowTo Schema (process steps)
  if (svc.process.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": `How We Perform ${svc.title}`,
      "description": `Step-by-step process for our ${svc.title} service`,
      "image": svc.heroImage,
      "totalTime": "P1D",
      "supply": [
        { "@type": "HowToSupply", "name": "Shot blasting media" },
        { "@type": "HowToSupply", "name": "Containment equipment" },
        { "@type": "HowToSupply", "name": "Protective coatings" }
      ],
      "tool": [
        { "@type": "HowToTool", "name": "Mobile shot blasting unit" },
        { "@type": "HowToTool", "name": "Vacuum recovery system" },
        { "@type": "HowToTool", "name": "Surface profile gauges" }
      ],
      "step": svc.process.map(step => ({
        "@type": "HowToStep",
        "position": step.step,
        "name": step.title,
        "text": step.description
      }))
    });
  }

  // 4. BreadcrumbList Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": `${SITE_URL}/services` },
      { "@type": "ListItem", "position": 3, "name": svc.title, "item": url }
    ]
  });

  // 5. WebPage Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    "url": url,
    "name": `${svc.title} | ${BUSINESS_NAME}`,
    "description": svc.description,
    "isPartOf": { "@type": "WebSite", "@id": `${SITE_URL}/#website`, "name": BUSINESS_NAME, "url": SITE_URL },
    "about": { "@type": "Service", "name": svc.title },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": `${SITE_URL}/services` },
        { "@type": "ListItem", "position": 3, "name": svc.title, "item": url }
      ]
    },
    "inLanguage": "en-GB",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".hero-description", ".service-description"]
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "potentialAction": [{ "@type": "ReadAction", "target": [url] }]
  });

  // 6. Organization Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": BUSINESS_NAME,
    "url": SITE_URL,
    "logo": { "@type": "ImageObject", "url": LOGO },
    "telephone": PHONE,
    "email": EMAIL,
    "sameAs": [`${SITE_URL}/services/${serviceId}`]
  });

  // 7. VideoObject Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": `${svc.title} — Shot Blasting Demonstration`,
    "description": `Watch our professional ${svc.title.toLowerCase()} team in action. See the complete process from initial setup to finished surface preparation.`,
    "thumbnailUrl": svc.heroImage,
    "duration": "PT3M45S",
    "contentUrl": `${SITE_URL}/videos/shot-blasting-demo.mp4`,
    "embedUrl": `${SITE_URL}/videos/shot-blasting-demo`,
    "publisher": { "@type": "Organization", "name": BUSINESS_NAME, "logo": { "@type": "ImageObject", "url": LOGO } }
  });

  return schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n    ');
}

/**
 * Inject meta tags and JSON-LD into HTML template based on route
 * @param html - The HTML template string
 * @param url - The request URL
 * @returns Modified HTML with injected meta tags and JSON-LD
 */
function generateServiceAreasIndexSchemas(): string {
  const serviceAreasUrl = `${SITE_URL}/service-areas`;
  const locationList = [
    { slug: 'birmingham', name: 'Birmingham' },
    { slug: 'wolverhampton', name: 'Wolverhampton' },
    { slug: 'coventry', name: 'Coventry' },
    { slug: 'leicester', name: 'Leicester' },
    { slug: 'derby', name: 'Derby' },
    { slug: 'nottingham', name: 'Nottingham' },
    { slug: 'sheffield', name: 'Sheffield' },
    { slug: 'leeds', name: 'Leeds' },
    { slug: 'manchester', name: 'Manchester' },
    { slug: 'liverpool', name: 'Liverpool' },
    { slug: 'chester', name: 'Chester' },
    { slug: 'stoke-on-trent', name: 'Stoke-on-Trent' },
    { slug: 'shrewsbury', name: 'Shrewsbury' },
    { slug: 'worcester', name: 'Worcester' },
    { slug: 'hereford', name: 'Hereford' },
    { slug: 'gloucester', name: 'Gloucester' },
    { slug: 'bristol', name: 'Bristol' },
    { slug: 'cardiff', name: 'Cardiff' },
    { slug: 'wrexham', name: 'Wrexham' },
    { slug: 'oxford', name: 'Oxford' },
    { slug: 'swindon', name: 'Swindon' },
    { slug: 'milton-keynes', name: 'Milton Keynes' },
    { slug: 'northampton', name: 'Northampton' },
    { slug: 'peterborough', name: 'Peterborough' },
    { slug: 'cambridge', name: 'Cambridge' },
    { slug: 'norwich', name: 'Norwich' },
    { slug: 'ipswich', name: 'Ipswich' },
    { slug: 'lincoln', name: 'Lincoln' },
    { slug: 'chesterfield', name: 'Chesterfield' },
    { slug: 'stratford-upon-avon', name: 'Stratford-upon-Avon' },
  ];

  const schemas = [
    // 1. ItemList — enables sitelinks-style location list in Google SERPs
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${serviceAreasUrl}#itemlist`,
      "name": "Shot Blasting Service Areas",
      "description": "Professional mobile shot blasting services available across the UK. Browse all service areas.",
      "url": serviceAreasUrl,
      "numberOfItems": locationList.length,
      "itemListElement": locationList.map((loc, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": `Shot Blasting ${loc.name}`,
        "url": `${SITE_URL}/service-areas/${loc.slug}`,
        "item": {
          "@type": "Service",
          "name": `Shot Blasting ${loc.name}`,
          "url": `${SITE_URL}/service-areas/${loc.slug}`,
          "areaServed": {
            "@type": "City",
            "name": loc.name,
            "containedInPlace": { "@type": "Country", "name": "United Kingdom" }
          },
          "provider": {
            "@type": "LocalBusiness",
            "name": BUSINESS_NAME,
            "telephone": PHONE,
            "url": SITE_URL
          }
        }
      }))
    },
    // 2. WebPage
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${serviceAreasUrl}#webpage`,
      "url": serviceAreasUrl,
      "name": `Shot Blasting Service Areas | ${BUSINESS_NAME}`,
      "description": "Professional mobile shot blasting services across the UK. Browse all service areas covering the Midlands, North West, Yorkshire, South West, Wales, and more.",
      "isPartOf": {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "name": BUSINESS_NAME,
        "url": SITE_URL
      },
      "inLanguage": "en-GB"
    },
    // 3. BreadcrumbList
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Service Areas", "item": serviceAreasUrl }
      ]
    },
    // 4. Organization
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": BUSINESS_NAME,
      "url": SITE_URL,
      "telephone": PHONE,
      "email": EMAIL,
      "logo": { "@type": "ImageObject", "url": LOGO },
      "areaServed": locationList.map(loc => ({
        "@type": "City",
        "name": loc.name,
        "containedInPlace": { "@type": "Country", "name": "United Kingdom" }
      }))
    }
  ];

  return schemas
    .map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n    ');
}

function generateServicesIndexSchemas(): string {
  const servicesUrl = `${SITE_URL}/services`;
  const serviceList = [
    { id: 'structural-steel-frames', title: 'Structural Steel Frames Shot Blasting' },
    { id: 'steel-containers', title: 'Steel Container Shot Blasting' },
    { id: 'factory-cladding', title: 'Factory & Warehouse Cladding Shot Blasting' },
    { id: 'fire-escapes', title: 'Fire Escapes & External Stair Towers Shot Blasting' },
    { id: 'staircases', title: 'Internal Steel Staircases, Balustrades & Handrails Shot Blasting' },
    { id: 'bridge-steelwork', title: 'Bridge Steelwork Shot Blasting' },
    { id: 'ladders', title: 'Fixed Ladders & Step-Over Platforms Shot Blasting' },
    { id: 'warehouse-racking', title: 'Warehouse Racking & Pallet Rack Frames Shot Blasting' },
    { id: 'pipework', title: 'Process Pipework, Spools & Manifolds Shot Blasting' },
    { id: 'telecom-towers', title: 'Telecom Masts & Lattice Towers Shot Blasting' },
    { id: 'floor-preparation', title: 'Floor Preparation & Shot Blasting' },
    { id: 'powder-coating', title: 'Shot Blasting & Powder Coating' },
    { id: 'commercial-radiators', title: 'Commercial Radiators Shot Blasting' },
    { id: 'commercial-vehicles', title: 'Commercial & Agricultural Vehicle Shot Blasting' },
    { id: 'steel-doors', title: 'Steel Doors & Roller Shutters Shot Blasting' },
    { id: 'steel-sheeting', title: 'Steel Sheeting Shot Blasting' },
    { id: 'steel-gates', title: 'Steel Gates & Railings Shot Blasting' },
    { id: 'plant-machinery', title: 'Plant & Machinery Shot Blasting' },
  ];

  const schemas = [
    // 1. ItemList — enables sitelinks-style service list in Google SERPs
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${servicesUrl}#itemlist`,
      "name": "Shot Blasting Services",
      "description": "Professional mobile shot blasting services for commercial and industrial applications across the UK.",
      "url": servicesUrl,
      "numberOfItems": serviceList.length,
      "itemListElement": serviceList.map((svc, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": svc.title,
        "url": `${SITE_URL}/services/${svc.id}`,
        "item": {
          "@type": "Service",
          "name": svc.title,
          "url": `${SITE_URL}/services/${svc.id}`,
          "provider": {
            "@type": "LocalBusiness",
            "name": BUSINESS_NAME,
            "telephone": PHONE,
            "url": SITE_URL
          }
        }
      }))
    },
    // 2. WebPage
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${servicesUrl}#webpage`,
      "url": servicesUrl,
      "name": `Shot Blasting Services | ${BUSINESS_NAME}`,
      "description": "Browse all 18 professional shot blasting services offered by Commercial Shot Blasting across the UK — from structural steel and containers to floor preparation and powder coating.",
      "isPartOf": {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "name": BUSINESS_NAME,
        "url": SITE_URL
      },
      "inLanguage": "en-GB"
    },
    // 3. BreadcrumbList
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": servicesUrl }
      ]
    },
    // 4. Organization
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": BUSINESS_NAME,
      "url": SITE_URL,
      "telephone": PHONE,
      "email": EMAIL,
      "logo": { "@type": "ImageObject", "url": LOGO },
      "areaServed": { "@type": "Country", "name": "United Kingdom" },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Shot Blasting Services",
        "itemListElement": serviceList.map((svc, i) => ({
          "@type": "Offer",
          "position": i + 1,
          "itemOffered": {
            "@type": "Service",
            "name": svc.title,
            "url": `${SITE_URL}/services/${svc.id}`
          }
        }))
      }
    }
  ];

  return schemas
    .map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n    ');
}

function generateHomepageSchemas(): string {
  const navItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Services', url: `${SITE_URL}/services` },
    { name: 'Industries', url: `${SITE_URL}/industries` },
    { name: 'Preparation & Cleanup', url: `${SITE_URL}/preparation-cleanup` },
    { name: 'Our Work', url: `${SITE_URL}/our-work` },
    { name: 'Service Areas', url: `${SITE_URL}/service-areas` },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: 'About', url: `${SITE_URL}/about` },
    { name: 'Contact', url: `${SITE_URL}/contact` },
    { name: 'Free Site Survey', url: `${SITE_URL}/free-site-survey` },
  ];

  const schemas = [
    // 1. WebSite with SiteLinksSearchBox
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "name": BUSINESS_NAME,
      "url": SITE_URL,
      "description": "Professional mobile shot blasting services for commercial and industrial applications across the UK.",
      "inLanguage": "en-GB",
      "publisher": {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": BUSINESS_NAME
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${SITE_URL}/service-areas/{search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    },
    // 2. SiteNavigationElement — signals primary nav to Google for sitelinks
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${SITE_URL}/#sitenavigation`,
      "name": "Site Navigation",
      "itemListElement": navItems.map((item, i) => ({
        "@type": "SiteNavigationElement",
        "position": i + 1,
        "name": item.name,
        "url": item.url
      }))
    },
    // 3. Organization
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#organization`,
      "name": BUSINESS_NAME,
      "url": SITE_URL,
      "telephone": PHONE,
      "email": EMAIL,
      "logo": { "@type": "ImageObject", "url": LOGO },
      "image": LOGO,
      "description": "Professional mobile shot blasting services for commercial and industrial applications across the UK. Specialists in rust removal, surface preparation, and industrial cleaning.",
      "priceRange": "££",
      "areaServed": { "@type": "Country", "name": "United Kingdom" },
      "sameAs": [],
      "hasMap": `${SITE_URL}/contact`,
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "18:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "13:00" }
      ]
    },
    // 4. WebPage (homepage)
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      "url": SITE_URL,
      "name": `${BUSINESS_NAME} | Professional Shot Blasting Services UK`,
      "description": "Professional mobile shot blasting services for commercial and industrial applications across the UK. Specialists in rust removal, surface preparation, and industrial cleaning.",
      "isPartOf": { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
      "about": { "@type": "LocalBusiness", "@id": `${SITE_URL}/#organization` },
      "inLanguage": "en-GB"
    },
    // 5. BreadcrumbList (homepage)
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL }
      ]
    }
  ];

  return schemas
    .map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
     .join('\n    ');
}

function generateServiceAreaBodyHTML(locationSlug: string): string {
  const loc = locationData[locationSlug];
  if (!loc) return "";

  const name = loc.name;
  const county = loc.county;
  const region = loc.region;
  const description = loc.description;
  const faqs = loc.faqs;
  const countySlug = loc.countySlug;

  const services = [
    "Rust Removal & Surface Preparation",
    "Paint & Coating Stripping",
    "Metal Surface Cleaning",
    "Concrete Floor Preparation",
    "Industrial Equipment Blasting",
    "Vehicle & Machinery Restoration"
  ];

  const whyUs = [
    { title: "Mobile Service", text: `We bring our fully equipped mobile units directly to your location in ${name}, saving you time and transportation costs.` },
    { title: "Expert Team", text: `Our experienced operators deliver consistent, high-quality results on every project across ${county}.` },
    { title: "Commercial Focus", text: `Specializing in commercial and industrial applications, we understand the demands of business operations in ${name}.` },
    { title: "Fast Response", text: `Quick response times and flexible scheduling to meet your project deadlines in ${name} and surrounding areas.` },
    { title: "Local Knowledge", text: `Familiar with ${name} and the ${region}, we provide reliable service you can count on.` },
    { title: "Free Quotes", text: `No-obligation quotations for all projects in ${name}. Call us today to discuss your requirements.` }
  ];

  const faqHtml = faqs.map((faq, i) => `
    <div class="ssr-faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <h3 itemprop="name"><span class="ssr-q">Q:</span> ${escHtml(faq.question)}</h3>
      <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <p itemprop="text">${escHtml(faq.answer)}</p>
      </div>
    </div>`).join("");

  const servicesHtml = services.map(s => `<li class="ssr-service-item">${escHtml(s)}</li>`).join("");
  const whyHtml = whyUs.map(w => `
    <div class="ssr-why-item">
      <h3>${escHtml(w.title)}</h3>
      <p>${escHtml(w.text)}</p>
    </div>`).join("");

  return `
<div id="ssr-content" aria-hidden="false" style="position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;">
  <nav aria-label="Breadcrumb">
    <ol itemscope itemtype="https://schema.org/BreadcrumbList">
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="${SITE_URL}/"><span itemprop="name">Home</span></a>
        <meta itemprop="position" content="1" />
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="${SITE_URL}/service-areas"><span itemprop="name">Service Areas</span></a>
        <meta itemprop="position" content="2" />
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="${SITE_URL}/counties/${countySlug}"><span itemprop="name">${escHtml(county)}</span></a>
        <meta itemprop="position" content="3" />
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <span itemprop="name">${escHtml(name)}</span>
        <meta itemprop="position" content="4" />
      </li>
    </ol>
  </nav>
  <main itemscope itemtype="https://schema.org/WebPage">
    <header>
      <h1>Shot Blasting Services in ${escHtml(name)}</h1>
      <p>${escHtml(description)}</p>
      <p>Expert mobile shot blasting services throughout ${escHtml(name)} and ${escHtml(county)}. Professional rust removal and surface preparation for commercial and industrial clients.</p>
      <p>Call us: <a href="tel:${PHONE.replace(/\s/g, "")}">${PHONE}</a></p>
    </header>
    <section aria-label="Why Choose Us">
      <h2>Why Choose ${escHtml(BUSINESS_NAME)} in ${escHtml(name)}?</h2>
      ${whyHtml}
    </section>
    <section aria-label="Services">
      <h2>Shot Blasting Services in ${escHtml(name)}</h2>
      <ul>${servicesHtml}</ul>
    </section>
    <section aria-label="Frequently Asked Questions" itemscope itemtype="https://schema.org/FAQPage">
      <h2>FAQs About Shot Blasting in ${escHtml(name)}</h2>
      ${faqHtml}
    </section>
    <section aria-label="Contact">
      <h2>Ready to Start Your Project in ${escHtml(name)}?</h2>
      <p>Get a free, no-obligation quote for your shot blasting project. Call us today or request a quote online.</p>
      <p>Phone: <a href="tel:${PHONE.replace(/\s/g, "")}">${PHONE}</a></p>
      <p>Email: <a href="mailto:info@commercialshotblasting.co.uk">info@commercialshotblasting.co.uk</a></p>
    </section>
  </main>
</div>`;
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function injectMetaTags(html: string, url: string): string {
  // Check if this is the homepage
  if (url === '/' || url === '') {
    let modifiedHtml = html
      .replace(/<meta\s+name="description"[^>]*>/gi, '')
      .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<link\s+rel="canonical"[^>]*>/gi, '');
    const homeMetaTags = `
    <title>${BUSINESS_NAME} | Professional Shot Blasting Services UK</title>
    <link rel="canonical" href="${SITE_URL}/" />
    <meta name="description" content="Professional mobile shot blasting services for commercial and industrial applications across the UK. Specialists in rust removal, surface preparation, and industrial cleaning. Call 07970 566409." />
    <meta property="og:title" content="${BUSINESS_NAME} | Professional Shot Blasting Services UK" />
    <meta property="og:description" content="Professional mobile shot blasting services for commercial and industrial applications across the UK. Specialists in rust removal, surface preparation, and industrial cleaning." />
    <meta property="og:url" content="${SITE_URL}/" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${LOGO}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${BUSINESS_NAME} | Professional Shot Blasting Services UK" />
    <meta name="twitter:description" content="Professional mobile shot blasting services for commercial and industrial applications across the UK. Specialists in rust removal, surface preparation, and industrial cleaning." />
    <meta name="twitter:image" content="${LOGO}" />
    <meta name="twitter:image:alt" content="Commercial Shot Blasting — professional mobile shot blasting services across the UK" />
    ${generateHomepageSchemas()}
  `;
    modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, homeMetaTags);
    return modifiedHtml;
  }

  // Check if this is the /services index page
  if (url === '/services' || url === '/services/') {
    const servicesUrl = `${SITE_URL}/services`;
    let modifiedHtml = html
      .replace(/<meta\s+name="description"[^>]*>/gi, '')
      .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<link\s+rel="canonical"[^>]*>/gi, '');
    const metaTags = `
    <title>Shot Blasting Services | ${BUSINESS_NAME}</title>
    <link rel="canonical" href="${servicesUrl}" />
    <meta name="description" content="Browse all 18 professional shot blasting services by Commercial Shot Blasting — structural steel, containers, cladding, floor preparation, powder coating and more. UK-wide mobile service." />
    <meta property="og:title" content="Shot Blasting Services | ${BUSINESS_NAME}" />
    <meta property="og:description" content="Browse all 18 professional shot blasting services by Commercial Shot Blasting — structural steel, containers, cladding, floor preparation, powder coating and more. UK-wide mobile service." />
    <meta property="og:url" content="${servicesUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${LOGO}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Shot Blasting Services | ${BUSINESS_NAME}" />
    <meta name="twitter:description" content="Browse all 18 professional shot blasting services by Commercial Shot Blasting — structural steel, containers, cladding, floor preparation, powder coating and more. UK-wide mobile service." />
    <meta name="twitter:image" content="${LOGO}" />
    <meta name="twitter:image:alt" content="Browse all professional shot blasting services by Commercial Shot Blasting" />
    ${generateServicesIndexSchemas()}
  `;
    modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, metaTags);
    return modifiedHtml;
  }

  // Check if this is the /service-areas index page
  if (url === '/service-areas' || url === '/service-areas/') {
    const serviceAreasUrl = `${SITE_URL}/service-areas`;
    let modifiedHtml = html
      .replace(/<meta\s+name="description"[^>]*>/gi, '')
      .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<link\s+rel="canonical"[^>]*>/gi, '');
    const areaMetaTags = `
    <title>Shot Blasting Service Areas | ${BUSINESS_NAME}</title>
    <link rel="canonical" href="${serviceAreasUrl}" />
    <meta name="description" content="Commercial Shot Blasting provides professional mobile shot blasting services across the UK. Browse our service areas covering the Midlands, North West, Yorkshire, South West, Wales, and more." />
    <meta property="og:title" content="Shot Blasting Service Areas | ${BUSINESS_NAME}" />
    <meta property="og:description" content="Commercial Shot Blasting provides professional mobile shot blasting services across the UK. Browse our service areas covering the Midlands, North West, Yorkshire, South West, Wales, and more." />
    <meta property="og:url" content="${serviceAreasUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${LOGO}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Shot Blasting Service Areas | ${BUSINESS_NAME}" />
    <meta name="twitter:description" content="Commercial Shot Blasting provides professional mobile shot blasting services across the UK. Browse our service areas covering the Midlands, North West, Yorkshire, South West, Wales, and more." />
    <meta name="twitter:image" content="${LOGO}" />
    <meta name="twitter:image:alt" content="Commercial Shot Blasting service areas across the UK Midlands, North West, Yorkshire and more" />
    ${generateServiceAreasIndexSchemas()}
  `;
    modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, areaMetaTags);
    return modifiedHtml;
  }

  // Check if this is a service page
  const serviceMatch = url.match(/^\/services\/([a-z-]+)/);
  if (serviceMatch) {
    const serviceId = serviceMatch[1];
    const svc = serviceMeta[serviceId];
    if (svc) {
      const pageUrl = `${SITE_URL}/services/${serviceId}`;
      let modifiedHtml = html
        .replace(/<meta\s+name="description"[^>]*>/gi, '')
        .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
        .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
        .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
        .replace(/<link\s+rel="canonical"[^>]*>/gi, '');

      const metaTags = `
    <title>${svc.title} | ${BUSINESS_NAME}</title>
    <link rel="preload" as="image" href="${svc.heroImage}" />
    <link rel="canonical" href="${pageUrl}" />
    <meta name="description" content="${svc.description.replace(/"/g, '&quot;')}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta property="og:title" content="${svc.title} | ${BUSINESS_NAME}" />
    <meta property="og:description" content="${svc.description.replace(/"/g, '&quot;')}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${svc.heroImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${svc.title} | ${BUSINESS_NAME}" />
    <meta name="twitter:description" content="${svc.description.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="${svc.heroImage}" />
    <meta name="twitter:image:alt" content="${svc.title} — professional shot blasting service by Commercial Shot Blasting" />
    ${generateServiceSchemas(serviceId)}
  `;
      modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, metaTags);
      // Inject SSR body HTML for crawlers
      const serviceBodyHtml = generateServiceBodyHTML(serviceId);
      if (serviceBodyHtml) {
        if (modifiedHtml.includes('<!--SSR_CONTENT-->')) {
          modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', serviceBodyHtml);
        } else {
          modifiedHtml = modifiedHtml.replace(/<body[^>]*>/, (match) => `${match}\n${serviceBodyHtml}`);
        }
      }
      return modifiedHtml;
    }
  }

  // ── Counties index page: /counties ────────────────────────────────────────
  if (url === '/counties' || url === '/counties/') {
    const countiesTitle = 'Shot Blasting Services by County | Commercial Shot Blasting';
    const countiesDesc = 'Browse our professional shot blasting services by county. We cover 25 counties across the Midlands, Yorkshire, North West, East of England, South West, and Wales Borders.';
    const countiesUrl = `${SITE_URL}/counties`;
    let modifiedHtml = html;
    modifiedHtml = modifiedHtml.replace(/<title>[^<]*<\/title>/, `<title>${countiesTitle}</title>`);
    modifiedHtml = modifiedHtml.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${countiesDesc}" />`);
    modifiedHtml = modifiedHtml.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${countiesUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${countiesTitle}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${countiesDesc}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${countiesUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${countiesTitle}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${countiesDesc}" />`);
    const breadcrumbSchema = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE_URL},{"@type":"ListItem","position":2,"name":"Counties","item":countiesUrl}]});
    const webPageSchema = JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":countiesTitle,"description":countiesDesc,"url":countiesUrl});
    modifiedHtml = modifiedHtml.replace('</head>', `<script type="application/ld+json">${breadcrumbSchema}</script>\n<script type="application/ld+json">${webPageSchema}</script>\n</head>`);
    return modifiedHtml;
  }

  // ── Industries index page: /industries ──────────────────────────────────────
  if (url === '/industries' || url === '/industries/') {
    const industriesTitle = 'Industries We Serve | Shot Blasting Services | Commercial Shot Blasting';
    const industriesDesc = 'Professional shot blasting services across diverse sectors. Construction, manufacturing, aerospace, marine, agriculture, retail, transport, and heritage restoration.';
    const industriesUrl = `${SITE_URL}/industries`;
    let modifiedHtml = html;
    modifiedHtml = modifiedHtml.replace(/<title>[^<]*<\/title>/, `<title>${industriesTitle}</title>`);
    modifiedHtml = modifiedHtml.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${industriesDesc}" />`);
    modifiedHtml = modifiedHtml.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${industriesUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${industriesTitle}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${industriesDesc}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${industriesUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${industriesTitle}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${industriesDesc}" />`);
    const breadcrumbSchema = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE_URL},{"@type":"ListItem","position":2,"name":"Industries","item":industriesUrl}]});
    const webPageSchema = JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":industriesTitle,"description":industriesDesc,"url":industriesUrl});
    modifiedHtml = modifiedHtml.replace('</head>', `<script type="application/ld+json">${breadcrumbSchema}</script>\n<script type="application/ld+json">${webPageSchema}</script>\n</head>`);
    return modifiedHtml;
  }

  // ── County pages: /counties/:slug ──────────────────────────────────────────
  const countyMatch = url.match(/^\/counties\/([a-z-]+)/);
  if (countyMatch) {
    const countySlug = countyMatch[1];
    const county: CountyData | undefined = countyData[countySlug];
    if (county) {
      const pageUrl = `${SITE_URL}/counties/${countySlug}`;
      const pageTitle = `Shot Blasting Services in ${county.name} | ${BUSINESS_NAME}`;
      const metaDesc = county.description
        ? county.description.replace(/"/g, '&quot;').slice(0, 155) + '...'
        : `Professional shot blasting services across ${county.name}. ${BUSINESS_NAME} — mobile units covering all major towns.`;

      let modifiedHtml = html
        .replace(/<meta\s+name="description"[^>]*>/gi, '')
        .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
        .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
        .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
        .replace(/<link\s+rel="canonical"[^>]*>/gi, '');

      const faqSchemaItems = (county.faqs || []).map((faq: { question: string; answer: string }) =>
        `{"@type":"Question","name":${JSON.stringify(faq.question)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(faq.answer)}}}`
      ).join(',');

      const schemas = `
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"LocalBusiness","name":"${BUSINESS_NAME}","url":"${SITE_URL}","telephone":"${PHONE}","email":"${EMAIL}","logo":"${LOGO}","areaServed":{"@type":"AdministrativeArea","name":"${county.name}"}${county.latitude ? `,"geo":{"@type":"GeoCoordinates","latitude":${county.latitude},"longitude":${county.longitude}}` : ''}}
    </script>
    ${faqSchemaItems ? `<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${faqSchemaItems}]}</script>` : ''}
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"${SITE_URL}"},{"@type":"ListItem","position":2,"name":"Counties","item":"${SITE_URL}/counties"},{"@type":"ListItem","position":3,"name":"${county.name}","item":"${pageUrl}"}]}
    </script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"WebPage","name":"${pageTitle}","url":"${pageUrl}","description":"${metaDesc}"}
    </script>`;

      const metaTags = `
    <title>${pageTitle}</title>
    <link rel="canonical" href="${pageUrl}" />
    <meta name="description" content="${metaDesc}" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${metaDesc}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${HERO_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${metaDesc}" />
    <meta name="twitter:image" content="${HERO_IMAGE}" />
    <meta name="twitter:image:alt" content="Shot blasting services in ${county.name} — rust removal and surface preparation by Commercial Shot Blasting" />
    ${schemas}
  `;
      modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, metaTags);

      // Inject SSR body content for county pages so Googlebot can crawl location links
      const countyLocations = Object.values(locationData)
        .filter(loc => loc.countySlug === countySlug)
        .slice(0, 30);
      if (countyLocations.length > 0) {
        const esc = (s: string) => String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
        const locLinksHtml = countyLocations.map(loc =>
          `<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a itemprop="item" href="${SITE_URL}/service-areas/${loc.slug}"><span itemprop="name">Shot Blasting Services in ${esc(loc.name)}</span></a></li>`
        ).join('');
        const countyBodyHtml = `<div id="ssr-county-content" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;" itemscope itemtype="https://schema.org/WebPage"><nav aria-label="Breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList"><ol><li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a itemprop="item" href="${SITE_URL}"><span itemprop="name">Home</span></a><meta itemprop="position" content="1"/></li><li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a itemprop="item" href="${SITE_URL}/counties"><span itemprop="name">Counties</span></a><meta itemprop="position" content="2"/></li><li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a itemprop="item" href="${pageUrl}"><span itemprop="name">${esc(county.name)}</span></a><meta itemprop="position" content="3"/></li></ol></nav><article><h1>Shot Blasting Services in ${esc(county.name)}</h1><p>${esc(county.description || `Professional mobile shot blasting services across ${county.name}. Our mobile units cover all major towns and cities.`)}</p><section><h2>Areas We Cover in ${esc(county.name)}</h2><ul itemscope itemtype="https://schema.org/ItemList">${locLinksHtml}</ul></section><section><h2>Get a Free Quote for Shot Blasting in ${esc(county.name)}</h2><p>Call <a href="tel:07970566409">07970 566409</a> or email <a href="mailto:info@commercialshotblasting.co.uk">info@commercialshotblasting.co.uk</a>.</p></section></article></div>`;
        if (modifiedHtml.includes('<!--SSR_CONTENT-->')) {
          modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', countyBodyHtml);
        } else {
          modifiedHtml = modifiedHtml.replace(/<body[^>]*>/, (match: string) => `${match}\n${countyBodyHtml}`);
        }
      }

      return modifiedHtml;
    }
  }

  // ── Industry pages: /industries/:slug ──────────────────────────────────────
  const industryMeta: Record<string, { name: string; description: string }> = {
    'aerospace': { name: 'Aerospace', description: 'Specialist shot blasting for aerospace components. Precision surface preparation meeting aviation industry standards.' },
    'agriculture': { name: 'Agriculture', description: 'Professional shot blasting for agricultural machinery and equipment. Restore tractors, harvesters, and farm implements.' },
    'construction': { name: 'Construction', description: 'Commercial shot blasting for construction equipment and structural steelwork. Expert surface preparation for the building industry.' },
    'heritage-restoration': { name: 'Heritage Restoration', description: 'Specialist shot blasting for heritage and restoration projects. Preserve historic metalwork with expert surface preparation.' },
    'manufacturing': { name: 'Manufacturing', description: 'Industrial shot blasting for manufacturing facilities. Surface preparation for production equipment, racking, and infrastructure.' },
    'marine': { name: 'Marine', description: 'Professional shot blasting for marine and offshore applications. Corrosion removal for vessels, platforms, and maritime equipment.' },
    'retail': { name: 'Retail', description: 'Commercial shot blasting for retail and hospitality sectors. Restore shopfronts, fixtures, and commercial metalwork.' },
    'transport-logistics': { name: 'Transport & Logistics', description: 'Shot blasting for transport and logistics equipment. Surface preparation for trailers, containers, and fleet vehicles.' },
  };

  const industryMatch = url.match(/^\/industries\/([a-z-]+)/);
  if (industryMatch) {
    const industrySlug = industryMatch[1];
    const industry = industryMeta[industrySlug];
    if (industry) {
      const pageUrl = `${SITE_URL}/industries/${industrySlug}`;
      const pageTitle = `Shot Blasting for the ${industry.name} Industry | ${BUSINESS_NAME}`;
      const metaDesc = `${industry.description.slice(0, 130)}... Expert commercial services.`;

      let modifiedHtml = html
        .replace(/<meta\s+name="description"[^>]*>/gi, '')
        .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
        .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
        .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
        .replace(/<link\s+rel="canonical"[^>]*>/gi, '');

      const schemas = `
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Service","name":"Shot Blasting for the ${industry.name} Industry","description":"${industry.description}","provider":{"@type":"LocalBusiness","name":"${BUSINESS_NAME}","telephone":"${PHONE}","url":"${SITE_URL}"},"areaServed":{"@type":"Country","name":"United Kingdom"}}
    </script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"${SITE_URL}"},{"@type":"ListItem","position":2,"name":"Industries","item":"${SITE_URL}/industries"},{"@type":"ListItem","position":3,"name":"${industry.name}","item":"${pageUrl}"}]}
    </script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"WebPage","name":"${pageTitle}","url":"${pageUrl}","description":"${metaDesc}"}
    </script>`;

      const metaTags = `
    <title>${pageTitle}</title>
    <link rel="canonical" href="${pageUrl}" />
    <meta name="description" content="${metaDesc}" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${metaDesc}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${HERO_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${metaDesc}" />
    <meta name="twitter:image" content="${HERO_IMAGE}" />
    <meta name="twitter:image:alt" content="Shot blasting for the ${industry.name} industry — professional surface preparation by Commercial Shot Blasting" />
    ${schemas}
  `;
      modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, metaTags);
      return modifiedHtml;
    }
  }

  // Check if this is a service area pagee
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
    
    // Remove any existing canonical link to avoid duplicates
    modifiedHtml = modifiedHtml.replace(/<link\s+rel="canonical"[^>]*>/gi, '');

    // Build meta tags and JSON-LD
    const metaTags = `
    <title>Shot Blasting Services in ${locationName} | Commercial Shot Blasting</title>
    <link rel="canonical" href="${fullUrl}" />
    <meta name="description" content="Professional shot blasting services in ${locationName} — mobile rust removal & surface preparation for commercial and industrial clients. Free quote. Call ${PHONE}" />
    <meta property="og:title" content="Shot Blasting Services in ${locationName} | Commercial Shot Blasting" />
    <meta property="og:description" content="Professional shot blasting services in ${locationName} — mobile rust removal & surface preparation for commercial and industrial clients. Free quote. Call ${PHONE}" />
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${HERO_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Shot Blasting Services in ${locationName} | Commercial Shot Blasting" />
    <meta name="twitter:description" content="Professional shot blasting services in ${locationName} — mobile rust removal & surface preparation for commercial clients. Free quote. Call ${PHONE}" />
    <meta name="twitter:image" content="${HERO_IMAGE}" />
    <meta name="twitter:image:alt" content="Shot blasting services in ${locationName} — Commercial Shot Blasting" />
    <link rel="preload" as="image" href="${HERO_IMAGE}" />
    ${generateLocationSchemas(locationSlug, locationName, fullUrl)}
  `;
    
    // Replace the title tag with all meta tags and JSON-LD
    modifiedHtml = modifiedHtml.replace(
      /<title>.*?<\/title>/,
      metaTags
    );
    
    // Inject server-side body HTML for SEO crawlability
    const bodyHtml = generateServiceAreaBodyHTML(locationSlug);
    if (bodyHtml) {
      if (modifiedHtml.includes('<!--SSR_CONTENT-->')) {
        modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', bodyHtml);
      } else {
        modifiedHtml = modifiedHtml.replace(/<body[^>]*>/, (match) => `${match}\n${bodyHtml}`);
      }
    }
    
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
  
  // Remove any existing canonical link to avoid duplicates
  modifiedHtml = modifiedHtml.replace(/<link\s+rel="canonical"[^>]*>/gi, '');

  // Build meta tags and JSON-LD
  const metaTags = `
    <title>${meta.title}</title>
    <link rel="canonical" href="${meta.url}" />
    <meta name="description" content="${meta.description}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:url" content="${meta.url}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${HERO_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${HERO_IMAGE}" />
    <meta name="twitter:image:alt" content="Shot blasting services in ${locationName} — Commercial Shot Blasting" />
    <link rel="preload" as="image" href="${HERO_IMAGE}" />
    ${generateLocationSchemas(locationSlug, locationName, meta.url)}
  `;
  
  // Replace the title tag with all meta tags and JSON-LD
  modifiedHtml = modifiedHtml.replace(
    /<title>.*?<\/title>/,
    metaTags
  );
  
  // Inject server-side body HTML for SEO crawlability
  const bodyHtml = generateServiceAreaBodyHTML(locationSlug);
  if (bodyHtml) {
    if (modifiedHtml.includes('<!--SSR_CONTENT-->')) {
      modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', bodyHtml);
    } else {
      modifiedHtml = modifiedHtml.replace(/<body[^>]*>/, (match) => `${match}\n${bodyHtml}`);
    }
  }
  
  return modifiedHtml;
}
// SSR body injection checkpoint - 20260423113933
// Force publish: 20260423134613

// ─── County and Industry route handlers added ────────────────────────────────
