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
      answer: `We offer a comprehensive range of shot blasting services in ${locationName}, including structural steelwork blasting, factory and warehouse cladding restoration, container shot blasting, industrial floor preparation, rust and mill scale removal, plant and machinery blasting, fire escape and staircase restoration, and warehouse racking preparation. All services are delivered by our mobile units directly to your site${countyText}. Call 07970 566409 for a site visit.`
    },
    {
      question: `Do you provide mobile shot blasting services in ${locationName}?`,
      answer: `Yes — all our shot blasting services in ${locationName} are fully mobile. Our equipped units travel directly to your site, eliminating the need to transport your materials or equipment. We cover ${locationName} and the surrounding ${areaText} area, serving commercial, industrial, and agricultural clients. Call 07970 566409 to book.`
    },
    {
      question: `How much do shot blasting services cost in ${locationName}?`,
      answer: `The cost of shot blasting services in ${locationName} depends on the size of the project, the surface type, and site accessibility. We provide no-obligation quotes for all projects${countyText}. Contact us on 07970 566409 or request a quote online to get an accurate price for your specific requirements.`
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
    },
    {
      question: `Do you offer same-week shot blasting in ${locationName}?`,
      answer: `Yes — we operate 12 mobile shot blasting units across the UK, which means we can often offer same-week availability for projects in ${locationName}${countyText}. For urgent requirements, call 07970 566409 directly and we will do our best to accommodate your schedule. Planned projects can be booked in advance to suit your programme.`
    },
    {
      question: `Can you blast structural steel for construction projects in ${locationName}?`,
      answer: `Yes — structural steel shot blasting is one of our core services in ${locationName}. We blast beams, columns, trusses, and fabricated steelwork to SA2.5 or SA3 standard, ready for primer and protective coating. Our mobile units can work on-site at fabrication yards, construction sites, or at your premises across ${areaText}. We work with steel fabricators, main contractors, and developers throughout ${county || locationName}.`
    },
    {
      question: `Do you provide intumescent painting after shot blasting in ${locationName}?`,
      answer: `Yes — we now offer intumescent painting services in ${locationName} as a combined blast-and-coat solution. Intumescent paint provides fire protection for structural steel to R30, R60, R90, or R120 ratings. Having the same contractor carry out both the shot blasting and intumescent coating ensures the correct surface profile and eliminates the risk of contamination between trades. Contact us on 07970 566409 for a combined quote.`
    },
    {
      question: `What areas near ${locationName} do you cover for shot blasting?`,
      answer: `Our shot blasting services cover ${locationName} and all surrounding towns and villages throughout ${areaText}. We operate a fleet of 12 mobile units and regularly serve clients within a 50-mile radius of ${locationName}. If you are unsure whether we cover your specific location, call 07970 566409 and we will confirm availability and provide a site visit.`
    }
  ];
}
