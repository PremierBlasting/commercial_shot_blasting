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
      question: `What shot blasting services do you offer in ${locationName}?`,
      answer: `We offer a comprehensive range of shot blasting services in ${locationName}, including structural steelwork blasting, factory and warehouse cladding restoration, container shot blasting, industrial floor preparation, rust and mill scale removal, plant and machinery blasting, fire escape and staircase restoration, and warehouse racking preparation. All services are delivered by our mobile units directly to your site${countyText}. Call 07970 566409 for a free quote.`
    },
    {
      question: `Do you provide mobile shot blasting services in ${locationName}?`,
      answer: `Yes — all our shot blasting services in ${locationName} are fully mobile. Our equipped units travel directly to your site, eliminating the need to transport your materials or equipment. We cover ${locationName} and the surrounding ${areaText} area, serving commercial, industrial, and agricultural clients. Call 07970 566409 to book.`
    },
    {
      question: `How much do shot blasting services cost in ${locationName}?`,
      answer: `The cost of shot blasting services in ${locationName} depends on the size of the project, the surface type, and site accessibility. We provide free, no-obligation quotes for all projects${countyText}. Contact us on 07970 566409 or request a quote online to get an accurate price for your specific requirements.`
    },
    {
      question: `What surfaces can be shot blasted in ${locationName}?`,
      answer: `Our shot blasting services in ${locationName} cover all types of metal surfaces — structural steel frames, factory cladding, warehouse racking, fire escapes, staircases, bridge steelwork, steel containers, pipework, plant and machinery, and more. We also carry out concrete floor preparation. Our mobile service can handle projects of any size across ${areaText}.`
    },
    {
      question: `What standard do you blast to for shot blasting services in ${locationName}?`,
      answer: `We blast to SA2.5 (near white metal) and SA3 (white metal) standards as required by your coating specification. SA2.5 is the most commonly specified standard for protective coating systems and is the default for most commercial and industrial projects${countyText}. We can advise on the correct standard for your project.`
    },
    {
      question: `How long does a shot blasting project take in ${locationName}?`,
      answer: `Project duration for shot blasting services in ${locationName} depends on the size and complexity of the work. Small items like gates or railings can be completed in a few hours, while larger industrial projects such as factory cladding or structural steelwork may take several days. We provide estimated timelines with every quote and work efficiently to minimise disruption to your operations${countyText}.`
    },
    {
      question: `Is shot blasting better than other surface preparation methods in ${locationName}?`,
      answer: `Shot blasting is the most effective surface preparation method for metal surfaces in ${locationName}. It removes rust, mill scale, and old coatings more thoroughly than manual or chemical methods, creates the correct surface profile for new protective coatings, and is faster and more cost-effective for large-scale projects${countyText}. We can advise on the best method for your specific needs.`
    },
    {
      question: `Do I need to prepare the site before your shot blasting services arrive in ${locationName}?`,
      answer: `Minimal site preparation is required before our shot blasting services arrive in ${locationName}. We recommend clearing the immediate work area of loose items and ensuring vehicle access for our mobile unit. Our team will protect surrounding areas with sheeting and handle all cleanup after completion. We will provide specific preparation instructions when booking your project${countyText}.`
    }
  ];
}
