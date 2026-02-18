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
  image = "https://commercialshotblasting.co.uk/images/premier/steel-container-after.jpeg",
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
    "logo": "https://commercialshotblasting.co.uk/logo.png",
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
    "sameAs": [
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
