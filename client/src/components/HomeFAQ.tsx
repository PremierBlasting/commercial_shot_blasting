import { useState } from 'react';
import { Link } from 'wouter';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "What types of surfaces can be shot blasted?",
    answer: (
      <>
        Shot blasting is effective on a wide range of metal and concrete surfaces. We regularly work on{' '}
        <Link href="/services/structural-steel-frames" className="text-[#1e6b8c] hover:underline font-medium">structural steel frames</Link>,{' '}
        <Link href="/services/steel-containers" className="text-[#1e6b8c] hover:underline font-medium">steel containers and storage tanks</Link>,{' '}
        <Link href="/services/factory-cladding" className="text-[#1e6b8c] hover:underline font-medium">factory and warehouse cladding</Link>,{' '}
        <Link href="/services/warehouse-racking" className="text-[#1e6b8c] hover:underline font-medium">warehouse racking systems</Link>, and{' '}
        <Link href="/services/floor-preparation" className="text-[#1e6b8c] hover:underline font-medium">concrete floors</Link>. The process removes rust, mill scale, old paint, and surface contaminants to prepare surfaces for protective coatings.
      </>
    )
  },
  {
    question: "Do you offer mobile shot blasting services?",
    answer: (
      <>
        Yes, we provide fully mobile shot blasting services across{' '}
        <Link href="/service-areas" className="text-[#1e6b8c] hover:underline font-medium">England and Wales</Link>. Our team travels to your site with all necessary equipment, which is ideal for large structures that cannot be transported. We serve the{' '}
        <Link href="/service-areas/west-midlands" className="text-[#1e6b8c] hover:underline font-medium">West Midlands</Link>,{' '}
        <Link href="/service-areas/yorkshire" className="text-[#1e6b8c] hover:underline font-medium">Yorkshire</Link>,{' '}
        <Link href="/service-areas/north-west" className="text-[#1e6b8c] hover:underline font-medium">North West</Link>, and many other regions.
      </>
    )
  },
  {
    question: "How long does commercial shot blasting take?",
    answer: (
      <>
        Project timelines vary depending on the size and complexity of the work. A typical{' '}
        <Link href="/services/steel-gates" className="text-[#1e6b8c] hover:underline font-medium">steel gate or railing</Link> project might take 1-2 days, while larger projects like{' '}
        <Link href="/services/structural-steel-frames" className="text-[#1e6b8c] hover:underline font-medium">structural steelwork</Link> or{' '}
        <Link href="/services/factory-cladding" className="text-[#1e6b8c] hover:underline font-medium">factory cladding</Link> may require several days or weeks. We provide detailed timelines after assessing your specific requirements.
      </>
    )
  },
  {
    question: "What industries do you work with?",
    answer: (
      <>
        We serve a diverse range of industries including{' '}
        <Link href="/industries/construction" className="text-[#1e6b8c] hover:underline font-medium">construction</Link>,{' '}
        <Link href="/industries/manufacturing" className="text-[#1e6b8c] hover:underline font-medium">manufacturing</Link>,{' '}
        <Link href="/industries/agriculture" className="text-[#1e6b8c] hover:underline font-medium">agriculture</Link>,{' '}
        <Link href="/industries/transport-logistics" className="text-[#1e6b8c] hover:underline font-medium">transport and logistics</Link>, and{' '}
        <Link href="/industries/heritage-restoration" className="text-[#1e6b8c] hover:underline font-medium">heritage restoration</Link>. Our experience spans from restoring{' '}
        <Link href="/services/commercial-radiators" className="text-[#1e6b8c] hover:underline font-medium">commercial radiators</Link> in historic buildings to preparing{' '}
        <Link href="/services/bridge-steelwork" className="text-[#1e6b8c] hover:underline font-medium">bridge steelwork</Link> for protective coatings.
      </>
    )
  },
  {
    question: "Can you shot blast fire escapes and external staircases?",
    answer: (
      <>
        Absolutely. We specialise in{' '}
        <Link href="/services/fire-escapes" className="text-[#1e6b8c] hover:underline font-medium">fire escapes and external stair towers</Link> as well as{' '}
        <Link href="/services/staircases" className="text-[#1e6b8c] hover:underline font-medium">internal steel staircases, balustrades and handrails</Link>. These structures are often exposed to weather and require thorough rust removal before recoating. We also handle{' '}
        <Link href="/services/ladders" className="text-[#1e6b8c] hover:underline font-medium">fixed ladders and step-over platforms</Link> for industrial facilities.
      </>
    )
  },
  {
    question: "What is the difference between shot blasting and sandblasting?",
    answer: (
      <>
        Shot blasting uses steel shot or grit propelled at high velocity to clean and profile surfaces, while sandblasting traditionally uses sand. Shot blasting is generally more effective for heavy-duty industrial applications like{' '}
        <Link href="/services/structural-steel-frames" className="text-[#1e6b8c] hover:underline font-medium">structural steel</Link> and{' '}
        <Link href="/services/steel-containers" className="text-[#1e6b8c] hover:underline font-medium">steel containers</Link>. It creates an ideal surface profile for coating adhesion and is the preferred method for{' '}
        <Link href="/services/powder-coating" className="text-[#1e6b8c] hover:underline font-medium">powder coating preparation</Link>.
      </>
    )
  },
  {
    question: "Do you provide shot blasting for vehicles and machinery?",
    answer: (
      <>
        Yes, we offer shot blasting services for{' '}
        <Link href="/services/commercial-vehicles" className="text-[#1e6b8c] hover:underline font-medium">commercial and agricultural vehicles</Link> including chassis, wheels, and bodywork. We also handle{' '}
        <Link href="/services/plant-machinery" className="text-[#1e6b8c] hover:underline font-medium">plant and machinery</Link> such as construction equipment, farm machinery, and industrial plant. Our mobile service means we can work on-site without the need to transport heavy equipment.
      </>
    )
  },
  {
    question: "How do you prepare and clean up the work area?",
    answer: (
      <>
        We follow a systematic{' '}
        <Link href="/preparation-cleanup" className="text-[#1e6b8c] hover:underline font-medium">four-stage preparation and cleanup process</Link>. This includes containment and protection of surrounding areas, careful surface preparation, protection of delicate fixtures, and thorough post-blast clean-down. We pride ourselves on leaving sites ready for the next phase of work with minimal disruption.
      </>
    )
  }
];

// Generate FAQ Schema JSON-LD
const generateFAQSchema = () => {
  const schemaFaqs = [
    {
      question: "What types of surfaces can be shot blasted?",
      answer: "Shot blasting is effective on a wide range of metal and concrete surfaces. We regularly work on structural steel frames, steel containers and storage tanks, factory and warehouse cladding, warehouse racking systems, and concrete floors. The process removes rust, mill scale, old paint, and surface contaminants to prepare surfaces for protective coatings."
    },
    {
      question: "Do you offer mobile shot blasting services?",
      answer: "Yes, we provide fully mobile shot blasting services across England and Wales. Our team travels to your site with all necessary equipment, which is ideal for large structures that cannot be transported. We serve the West Midlands, Yorkshire, North West, and many other regions."
    },
    {
      question: "How long does commercial shot blasting take?",
      answer: "Project timelines vary depending on the size and complexity of the work. A typical steel gate or railing project might take 1-2 days, while larger projects like structural steelwork or factory cladding may require several days or weeks. We provide detailed timelines after assessing your specific requirements."
    },
    {
      question: "What industries do you work with?",
      answer: "We serve a diverse range of industries including construction, manufacturing, agriculture, transport and logistics, and heritage restoration. Our experience spans from restoring commercial radiators in historic buildings to preparing bridge steelwork for protective coatings."
    },
    {
      question: "Can you shot blast fire escapes and external staircases?",
      answer: "Absolutely. We specialise in fire escapes and external stair towers as well as internal steel staircases, balustrades and handrails. These structures are often exposed to weather and require thorough rust removal before recoating. We also handle fixed ladders and step-over platforms for industrial facilities."
    },
    {
      question: "What is the difference between shot blasting and sandblasting?",
      answer: "Shot blasting uses steel shot or grit propelled at high velocity to clean and profile surfaces, while sandblasting traditionally uses sand. Shot blasting is generally more effective for heavy-duty industrial applications like structural steel and steel containers. It creates an ideal surface profile for coating adhesion and is the preferred method for powder coating preparation."
    },
    {
      question: "Do you provide shot blasting for vehicles and machinery?",
      answer: "Yes, we offer shot blasting services for commercial and agricultural vehicles including chassis, wheels, and bodywork. We also handle plant and machinery such as construction equipment, farm machinery, and industrial plant. Our mobile service means we can work on-site without the need to transport heavy equipment."
    },
    {
      question: "How do you prepare and clean up the work area?",
      answer: "We follow a systematic four-stage preparation and cleanup process. This includes containment and protection of surrounding areas, careful surface preparation, protection of delicate fixtures, and thorough post-blast clean-down. We pride ourselves on leaving sites ready for the next phase of work with minimal disruption."
    }
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": schemaFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      {/* FAQ Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema()) }}
      />
      
      <div className="container max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#1e6b8c]/10 text-[#1e6b8c] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f3a4d] font-display mb-4">
            Common Questions About Shot Blasting
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to the most common questions about our commercial and industrial shot blasting services.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-[#0f3a4d] text-lg pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#1e6b8c] flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Have a question that's not answered here?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#1e6b8c] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0f3a4d] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
