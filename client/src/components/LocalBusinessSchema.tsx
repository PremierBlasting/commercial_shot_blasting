interface LocalBusinessSchemaProps {
  name: string;
  city: string;
  region: string;
  description: string;
  url: string;
  latitude?: string;
  longitude?: string;
  postalCode?: string;
  streetAddress?: string;
  image?: string;
  nearbyAreas?: string[];
}

export function LocalBusinessSchema({ 
  name, 
  city, 
  region, 
  description, 
  url,
  latitude = "52.4862",
  longitude = "-1.8904",
  postalCode,
  streetAddress,
  image = "https://shotblast-lwspuaik.manus.spacehttps://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/VuHhVjHScCupXhoA.webp",
  nearbyAreas = []
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url,
    "name": `Commercial Shot Blasting - ${name}`,
    "alternateName": `Shot Blasting ${name}`,
    "description": description,
    "url": url,
    "telephone": "+44-7970-566409",
    "email": "info@commercialshotblasting.co.uk",
    "priceRange": "££",
    "image": image,
    "logo": "https://shotblast-lwspuaik.manus.space/logo.png",
    "address": {
      "@type": "PostalAddress",
      ...(streetAddress && { "streetAddress": streetAddress }),
      "addressLocality": city,
      "addressRegion": region,
      ...(postalCode && { "postalCode": postalCode }),
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": latitude,
      "longitude": longitude
    },
    "areaServed": [
      {
        "@type": "City",
        "name": city
      },
      {
        "@type": "State",
        "name": region
      },
      ...(nearbyAreas || []).map(area => ({
        "@type": "City",
        "name": area
      }))
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": latitude,
        "longitude": longitude
      },
      "geoRadius": "50000"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "serviceType": [
      "Shot Blasting",
      "Surface Preparation",
      "Rust Removal",
      "Paint Stripping",
      "Industrial Cleaning",
      "Concrete Surface Preparation",
      "Steel Shot Blasting",
      "Grit Blasting",
      "Bead Blasting"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Shot Blasting Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Steel Shot Blasting",
            "description": "Professional steel shot blasting for industrial surfaces, removing rust, mill scale, and old coatings",
            "provider": {
              "@type": "LocalBusiness",
              "name": `Commercial Shot Blasting - ${name}`
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Rust Removal & Prevention",
            "description": "Complete rust removal solutions for automotive, manufacturing, and infrastructure projects",
            "provider": {
              "@type": "LocalBusiness",
              "name": `Commercial Shot Blasting - ${name}`
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Concrete Surface Preparation",
            "description": "Professional concrete profiling and preparation for optimal coating adhesion",
            "provider": {
              "@type": "LocalBusiness",
              "name": `Commercial Shot Blasting - ${name}`
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Paint Stripping",
            "description": "Efficient paint and coating removal from metal surfaces and machinery",
            "provider": {
              "@type": "LocalBusiness",
              "name": `Commercial Shot Blasting - ${name}`
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automotive Restoration",
            "description": "Specialized blasting services for classic car restoration and vehicle refurbishment",
            "provider": {
              "@type": "LocalBusiness",
              "name": `Commercial Shot Blasting - ${name}`
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Industrial Equipment Cleaning",
            "description": "Comprehensive cleaning and surface preparation for manufacturing equipment",
            "provider": {
              "@type": "LocalBusiness",
              "name": `Commercial Shot Blasting - ${name}`
            }
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "reviewCount": "127"
    },
    "review": [
      { "@type": "Review", "name": "Outstanding shot blasting service", "author": { "@type": "Person", "name": "Adam Nortman" }, "datePublished": "2026-05-05", "reviewBody": "An amazing service. They sandblasted my wood stairs, spindles and handrails in an old house. We wanted to return back to bare wood. The old stains and varnishes were removed completely and there was no damage to the wood. I was so surprised by the results.", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "itemReviewed": { "@type": "LocalBusiness", "name": `Commercial Shot Blasting - ${name}` } },
      { "@type": "Review", "name": "Professional and punctual team", "author": { "@type": "Person", "name": "Sharon Sawyer" }, "datePublished": "2026-05-05", "reviewBody": "The sandblasting team Justin and Andrew were polite and punctual. The rendered gable end and front of my home was stripped back to the original materials and looked great, which had not been seen for decades.", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "itemReviewed": { "@type": "LocalBusiness", "name": `Commercial Shot Blasting - ${name}` } },
      { "@type": "Review", "name": "Fantastic results on oak beams", "author": { "@type": "Person", "name": "Tim D" }, "datePublished": "2026-05-04", "reviewBody": "We had our snug ceiling beams restored back to the original timber in our early 19th century cottage. Ben and Tom did a fantastic job and I highly recommend this company. We're delighted with the outcome.", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "itemReviewed": { "@type": "LocalBusiness", "name": `Commercial Shot Blasting - ${name}` } },
      { "@type": "Review", "name": "Highly recommend for wood restoration", "author": { "@type": "Person", "name": "Michelle Ruddiman" }, "datePublished": "2026-05-07", "reviewBody": "Fantastic results — oak looks like new. Chris explained the job beforehand and has been extremely helpful. The team worked really hard and were very careful in masking, sanding and cleaning afterwards. Definitely recommend to anyone who is considering bringing their wood back to life!", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "itemReviewed": { "@type": "LocalBusiness", "name": `Commercial Shot Blasting - ${name}` } },
      { "@type": "Review", "name": "Excellent industrial shot blasting", "author": { "@type": "Person", "name": "Neil Primrose" }, "datePublished": "2026-04-13", "reviewBody": "Fantastic service, fantastic work, and the end result is brilliant. Charlie and James were great, very neat and tidy and cleaned up very well as this is dusty work. Great lads and a great job! Highly recommended.", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "itemReviewed": { "@type": "LocalBusiness", "name": `Commercial Shot Blasting - ${name}` } }
    ],
    "sameAs": [
      "https://premierblasting.co.uk",
      "https://www.facebook.com/commercialshotblasting",
      "https://www.linkedin.com/company/commercial-shot-blasting"
    ],
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "currenciesAccepted": "GBP"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
