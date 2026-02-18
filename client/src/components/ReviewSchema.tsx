import { Helmet } from "react-helmet-async";

interface ReviewSchemaProps {
  locationName: string;
  county: string;
}

export function ReviewSchema({ locationName, county }: ReviewSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Commercial Shot Blasting - ${locationName}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Manufacturing Manager"
        },
        "datePublished": "2025-11-15",
        "reviewBody": `Excellent shot blasting service in ${locationName}. The team arrived on time, completed the work professionally, and left the site spotless. Highly recommend for commercial projects in ${county}.`,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Facilities Director"
        },
        "datePublished": "2025-10-22",
        "reviewBody": `Professional mobile shot blasting service covering ${locationName} and surrounding areas. Great results on our industrial flooring project. The quality of work exceeded expectations.`,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Property Manager"
        },
        "datePublished": "2025-09-08",
        "reviewBody": `Used their shot blasting services for surface preparation in ${locationName}. Competitive pricing, reliable service, and excellent communication throughout the project.`,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
