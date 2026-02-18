import { Helmet } from "react-helmet-async";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
  locationName?: string;
}

/**
 * FAQ Schema component for rich snippets in Google search results
 * Implements JSON-LD structured data for FAQPage
 * 
 * @see https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */
export function FAQSchema({ faqs, locationName }: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}

/**
 * Generate location-specific FAQs for shot blasting services
 * 
 * @param locationName - Name of the location (e.g., "Bedford", "London")
 * @param county - County name (e.g., "Bedfordshire", "Greater London")
 * @returns Array of FAQ items
 */
export function generateLocationFAQs(locationName: string, county?: string): FAQItem[] {
  const countyText = county ? ` in ${county}` : "";
  const areaText = county || locationName;

  return [
    {
      question: `Do you provide shot blasting services in ${locationName}?`,
      answer: `Yes, we provide professional mobile shot blasting services throughout ${locationName}${countyText}. Our fully equipped mobile units can reach any location in the area, offering on-site shot blasting for commercial and industrial projects. Call 07970 566409 for a free quote.`
    },
    {
      question: `What types of surfaces can you shot blast in ${locationName}?`,
      answer: `We shot blast all types of metal surfaces in ${locationName}, including structural steel frames, factory cladding, warehouse racking, fire escapes, staircases, bridge steelwork, steel containers, pipework, and more. Our mobile service can handle projects of any size across ${areaText}.`
    },
    {
      question: `How much does shot blasting cost in ${locationName}?`,
      answer: `Shot blasting costs in ${locationName} vary depending on the size of the project, surface type, and accessibility. We provide free, no-obligation quotes for all projects${countyText}. Contact us on 07970 566409 or request a quote online to get an accurate price for your specific requirements.`
    },
    {
      question: `How long does a shot blasting project take in ${locationName}?`,
      answer: `Project duration in ${locationName} depends on the size and complexity of the work. Small projects like gates or railings can be completed in a few hours, while larger industrial projects may take several days. We provide estimated timelines with every quote and work efficiently to minimize disruption to your operations${countyText}.`
    },
    {
      question: `Do you offer same-day or emergency shot blasting in ${locationName}?`,
      answer: `We aim to accommodate urgent shot blasting requests in ${locationName} whenever possible. While same-day service depends on our current schedule and location, we prioritize emergency work and can often respond quickly${countyText}. Call 07970 566409 to discuss your urgent requirements.`
    },
    {
      question: `Is shot blasting better than other surface preparation methods in ${locationName}?`,
      answer: `Shot blasting is often the most effective surface preparation method for metal surfaces in ${locationName}. It removes rust, scale, and old coatings more thoroughly than manual methods, creates an ideal surface profile for new coatings, and is faster and more cost-effective for large projects${countyText}. We can advise on the best method for your specific needs.`
    },
    {
      question: `What areas near ${locationName} do you cover?`,
      answer: `We provide mobile shot blasting services throughout ${locationName} and surrounding areas${countyText}. Our mobile units can travel to any location within the region, serving commercial, industrial, and agricultural clients. Contact us to confirm coverage for your specific location.`
    },
    {
      question: `Do I need to prepare the site before shot blasting in ${locationName}?`,
      answer: `Minimal site preparation is required for shot blasting in ${locationName}. We recommend clearing the immediate work area of loose items and ensuring access for our mobile unit. Our team will protect surrounding areas with sheeting and handle all cleanup after completion. We'll provide specific preparation instructions when booking your project${countyText}.`
    }
  ];
}
