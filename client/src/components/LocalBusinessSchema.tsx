interface LocalBusinessSchemaProps {
  name: string;
  city: string;
  region: string;
  description: string;
  url: string;
}

export function LocalBusinessSchema({ name, city, region, description, url }: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Commercial Shot Blasting - ${name}`,
    "description": description,
    "url": url,
    "telephone": "+44-7970-566409",
    "priceRange": "££",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": region,
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "0",
      "longitude": "0"
    },
    "areaServed": {
      "@type": "City",
      "name": city
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "serviceType": [
      "Shot Blasting",
      "Surface Preparation",
      "Rust Removal",
      "Paint Stripping",
      "Industrial Cleaning"
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
            "description": "Professional steel shot blasting for industrial surfaces"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Grit Blasting",
            "description": "High-quality grit blasting for rust and coating removal"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Bead Blasting",
            "description": "Precision bead blasting for delicate surfaces"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
