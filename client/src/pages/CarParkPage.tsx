import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuotePopup } from "@/components/QuotePopup";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Phone, ChevronDown, ChevronUp, MapPin, Clock, Shield, Award } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

// ── Unsplash image URLs (free to use under Unsplash licence) ─────────────────
const IMG = {
  hero:    "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1600&q=80&fit=crop&auto=format",
  aerial:  "https://images.unsplash.com/photo-1612917231506-a0825d1bc76d?w=1200&q=80&fit=crop&auto=format",
  bays:    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&fit=crop&auto=format",
  surface: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=80&fit=crop&auto=format",
  markings:"/manus-storage/ben-elliott-dk1F7gz38Cs-unsplash_76d9783d.webp",
};

// ── JSON-LD rich schema graph ─────────────────────────────────────────────────
const JSONLD_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://commercialshotblasting.co.uk/services/car-park-paint-removal#service",
      "name": "Car Park Paint & Line Marking Removal",
      "alternateName": [
        "Car Park Line Marking Removal",
        "Car Park Shot Blasting",
        "Road Paint Removal UK",
        "Car Park Bay Marking Removal",
        "Thermoplastic Road Marking Removal",
        "Car Park Surface Preparation",
        "Parking Bay Paint Removal"
      ],
      "description": "Mobile on-site shot blasting to remove car park line markings, bay numbers, road paint, thermoplastic markings, and old coatings from tarmac and concrete surfaces. We cover car parks, retail parks, industrial estates, airports, hospitals, and logistics centres across England and Wales.",
      "url": "https://commercialshotblasting.co.uk/services/car-park-paint-removal",
      "serviceType": "Shot Blasting",
      "category": "Surface Preparation",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Commercial Shot Blasting",
        "url": "https://commercialshotblasting.co.uk",
        "telephone": "+447970566409",
        "email": "info@commercialshotblasting.co.uk",
        "areaServed": ["England", "Wales"],
        "priceRange": "££"
      },
      "areaServed": { "@type": "Country", "name": "United Kingdom" },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Car Park Paint Removal Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Car Park Line Marking Removal" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Thermoplastic Road Marking Removal" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Car Park Bay Number Removal" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Disabled Bay Marking Removal" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Road Paint Removal from Tarmac" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Car Park Surface Preparation for Re-marking" } }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://commercialshotblasting.co.uk/services/car-park-paint-removal#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can you remove car park line markings without damaging the tarmac?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. We use calibrated shot blasting equipment that removes paint and thermoplastic markings from the surface without cutting into the tarmac or concrete substrate. The result is a clean surface with no visible scarring, ready for re-marking." }
        },
        {
          "@type": "Question",
          "name": "Do you work on-site at the car park?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — we bring all our mobile shot blasting equipment to your site. There is no need to close the entire car park; we can work bay by bay or section by section, allowing you to keep part of the facility operational during the works." }
        },
        {
          "@type": "Question",
          "name": "What types of car park markings can you remove?",
          "acceptedAnswer": { "@type": "Answer", "text": "We can remove all types of car park and road markings including painted bay lines, thermoplastic markings, bay numbers, disabled bay symbols, directional arrows, hatching, yellow lines, and road paint from both tarmac and concrete surfaces." }
        },
        {
          "@type": "Question",
          "name": "How long does car park line marking removal take?",
          "acceptedAnswer": { "@type": "Answer", "text": "Timescales depend on the size of the car park and the number of bays. As a guide, a standard 100-bay car park can typically be completed in one to two days. We will provide an accurate programme when you enquire." }
        },
        {
          "@type": "Question",
          "name": "Can you remove markings from concrete multi-storey car parks?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our equipment works on both tarmac and concrete surfaces. We regularly work in multi-storey car parks, underground car parks, and open-air surface car parks. Our mobile units are compact enough to operate in low-headroom environments." }
        },
        {
          "@type": "Question",
          "name": "Do you remove thermoplastic road markings?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Thermoplastic markings are thicker and more durable than paint, but shot blasting removes them effectively without the heat or chemicals required by other methods. The surface is left clean and ready for new markings to be applied." }
        },
        {
          "@type": "Question",
          "name": "What areas do you cover for car park paint removal?",
          "acceptedAnswer": { "@type": "Answer", "text": "We cover the whole of England and Wales from our bases in the Midlands. We regularly work in Nottingham, Birmingham, Manchester, Leeds, London, Bristol, and across our 35-county service area. Travel is included in our quotation." }
        },
        {
          "@type": "Question",
          "name": "How much does car park line marking removal cost?",
          "acceptedAnswer": { "@type": "Answer", "text": "Pricing depends on the number of bays, the type of marking (paint vs thermoplastic), and the surface condition. We price per bay or per square metre depending on the project. Contact us for a free site survey and quotation — we can often provide a desk-based estimate from photos before visiting." }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://commercialshotblasting.co.uk/services/car-park-paint-removal#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://commercialshotblasting.co.uk/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://commercialshotblasting.co.uk/services" },
        { "@type": "ListItem", "position": 3, "name": "Car Park Paint & Line Marking Removal", "item": "https://commercialshotblasting.co.uk/services/car-park-paint-removal" }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://commercialshotblasting.co.uk/services/car-park-paint-removal#webpage",
      "name": "Car Park Paint & Line Marking Removal | Shot Blasting UK",
      "description": "Mobile on-site shot blasting to remove car park line markings, bay numbers, thermoplastic road markings, and old paint from tarmac and concrete. England and Wales. Free site survey.",
      "url": "https://commercialshotblasting.co.uk/services/car-park-paint-removal",
      "inLanguage": "en-GB",
      "isPartOf": { "@id": "https://commercialshotblasting.co.uk/#website" }
    }
  ]
};

const faqs = [
  {
    question: "Can you remove car park line markings without damaging the tarmac?",
    answer: "Yes. We use calibrated shot blasting equipment that removes paint and thermoplastic markings from the surface without cutting into the tarmac or concrete substrate. The result is a clean surface with no visible scarring, ready for re-marking."
  },
  {
    question: "Do you work on-site at the car park?",
    answer: "Yes — we bring all our mobile shot blasting equipment to your site. There is no need to close the entire car park; we can work bay by bay or section by section, allowing you to keep part of the facility operational during the works."
  },
  {
    question: "What types of car park markings can you remove?",
    answer: "We can remove all types of car park and road markings including painted bay lines, thermoplastic markings, bay numbers, disabled bay symbols, directional arrows, hatching, yellow lines, and road paint from both tarmac and concrete surfaces."
  },
  {
    question: "How long does car park line marking removal take?",
    answer: "Timescales depend on the size of the car park and the number of bays. As a guide, a standard 100-bay car park can typically be completed in one to two days. We will provide an accurate programme when you enquire."
  },
  {
    question: "Can you remove markings from concrete multi-storey car parks?",
    answer: "Yes. Our equipment works on both tarmac and concrete surfaces. We regularly work in multi-storey car parks, underground car parks, and open-air surface car parks. Our mobile units are compact enough to operate in low-headroom environments."
  },
  {
    question: "Do you remove thermoplastic road markings?",
    answer: "Yes. Thermoplastic markings are thicker and more durable than paint, but shot blasting removes them effectively without the heat or chemicals required by other methods. The surface is left clean and ready for new markings to be applied."
  },
  {
    question: "What areas do you cover for car park paint removal?",
    answer: "We cover the whole of England and Wales from our bases in the Midlands. We regularly work in Nottingham, Birmingham, Manchester, Leeds, London, Bristol, and across our 35-county service area. Travel is included in our quotation."
  },
  {
    question: "How much does car park line marking removal cost?",
    answer: "Pricing depends on the number of bays, the type of marking (paint vs thermoplastic), and the surface condition. We price per bay or per square metre depending on the project. Contact us for a free site survey and quotation — we can often provide a desk-based estimate from photos before visiting."
  },
];

const applications = [
  { title: "Retail & Shopping Centre Car Parks", desc: "Bay reconfigurations, brand refreshes, and full re-marking projects for retail parks and supermarkets." },
  { title: "Industrial Estate & Logistics Centres", desc: "Warehouse yard markings, loading bay lines, and HGV routing arrows removed and re-laid to new layouts." },
  { title: "Multi-Storey & Underground Car Parks", desc: "Compact mobile equipment suitable for low-headroom environments. Concrete and tarmac surfaces." },
  { title: "Hospital & NHS Site Car Parks", desc: "Sensitive environments handled with full risk assessments. Out-of-hours working available." },
  { title: "Airport & Transport Hub Car Parks", desc: "Large-scale projects managed in phases to maintain operational capacity throughout." },
  { title: "Local Authority & Council Car Parks", desc: "Pay & display bays, disabled bays, yellow lines, and pedestrian crossings removed to specification." },
];

const whyShot = [
  { icon: Shield, title: "No chemicals or heat", desc: "Shot blasting is a dry, mechanical process — no solvents, no open flames, no chemical waste to dispose of." },
  { icon: Award, title: "Leaves surface ready to re-mark", desc: "The blasted surface has a clean, lightly textured profile that provides excellent adhesion for new line marking paint or thermoplastic." },
  { icon: Clock, title: "Fast turnaround", desc: "Our mobile units can process hundreds of linear metres per day. Most car parks are completed in one to two days." },
  { icon: MapPin, title: "Nationwide coverage", desc: "We cover all of England and Wales. Travel costs are included in our quotation — no hidden extras." },
];

export default function CarParkPage() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useSEO({
    title: "Car Park Paint & Line Marking Removal | Shot Blasting UK | Commercial Shot Blasting",
    description: "Mobile on-site shot blasting to remove car park line markings, bay numbers, thermoplastic road markings, and old paint from tarmac and concrete. England and Wales. Free site survey and quotation.",
    canonical: "https://commercialshotblasting.co.uk/services/car-park-paint-removal",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(JSONLD_GRAPH);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[520px] flex items-end pb-16 pt-32"
        style={{ background: "linear-gradient(135deg, #1a3a4f 0%, #2C5F7F 60%, #3a7a9c 100%)" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
          style={{ backgroundImage: `url('${IMG.hero}')` }}
          role="presentation"
          aria-hidden="true"
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition text-sm">
            ← Back to Services
          </Link>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "Car Park Paint & Line Marking Removal", href: "/services/car-park-paint-removal" },
            ]}
            className="mb-4 text-white/70"
          />
          <div className="inline-flex items-center gap-2 bg-[#C17F3B]/20 border border-[#C17F3B]/40 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#C17F3B] text-xs font-semibold uppercase tracking-widest">Surface Preparation</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Car Park Paint &amp; Line Marking Removal
          </h1>
          <p className="text-xl text-white/85 max-w-2xl mb-8 leading-relaxed">
            Mobile on-site shot blasting to remove bay markings, thermoplastic road paint, bay numbers, and old coatings from tarmac and concrete — anywhere in England and Wales.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="bg-[#C17F3B] hover:bg-[#a66a2e] text-white font-semibold px-8 py-3 text-base"
              onClick={() => setQuotePopupOpen(true)}
            >
              Request a Free Quote
            </Button>
            <a href="tel:07721375756" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3 rounded-md transition text-base">
              <Phone className="w-4 h-4" /> 07721 375756
            </a>
          </div>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────────────────────────── */}
      <div className="bg-[#2C5F7F] py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-6 justify-center md:justify-between text-white/90 text-sm font-medium">
          <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#C17F3B]" /> Mobile on-site service</span>
          <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#C17F3B]" /> Tarmac &amp; concrete</span>
          <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#C17F3B]" /> Paint &amp; thermoplastic</span>
          <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#C17F3B]" /> England &amp; Wales</span>
          <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#C17F3B]" /> Free site survey</span>
        </div>
      </div>

      {/* ── Intro ─────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Removing car park markings the right way
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              When a car park needs re-marking — whether due to a layout change, a rebrand, faded lines, or a change of use — the old markings need to come off cleanly before new ones can go down. Painting over old lines rarely works: the old markings bleed through, adhesion is poor, and the result looks unprofessional.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Shot blasting is the most effective method for removing car park line markings from tarmac and concrete. Our mobile equipment removes paint, thermoplastic, bay numbers, disabled symbols, arrows, and hatching back to a clean surface without damaging the substrate. The blasted surface has a light texture that actually improves adhesion for new markings.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We work on-site at your premises, anywhere in England and Wales. We can work in sections to keep part of the car park operational, and we can schedule out-of-hours or weekend working to minimise disruption.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={IMG.aerial}
              alt="Aerial view of a large car park with white bay markings on tarmac — typical of the type of car park line marking removal projects we undertake"
              className="w-full h-72 object-cover"
              width="600"
              height="288"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── What we remove ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#2C5F7F] mb-2 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            What we can remove
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Shot blasting removes virtually any type of car park or road surface marking from tarmac or concrete.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Bay dividing lines (white &amp; yellow)",
              "Bay numbers &amp; letter codes",
              "Disabled bay symbols &amp; markings",
              "Thermoplastic road markings",
              "Directional arrows",
              "Hatched no-parking areas",
              "Yellow lines &amp; kerb markings",
              "Pedestrian crossing markings",
              "Road paint &amp; anti-skid coatings",
              "Parent &amp; child bay markings",
              "EV charging bay markings",
              "Old &amp; faded line marking paint",
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-4 flex items-start gap-3 shadow-sm border border-gray-100">
                <CheckCircle className="w-5 h-5 text-[#C17F3B] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 font-medium" dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why shot blasting ────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#2C5F7F] mb-2 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Why shot blasting is the best method
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Compared to grinding, water jetting, or chemical stripping, shot blasting offers a faster, cleaner, and more substrate-friendly result.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {whyShot.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-xl border border-gray-100 shadow-sm bg-[#f9f7f4]">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2C5F7F]/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#2C5F7F]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2C5F7F] mb-1">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#2C5F7F] text-white">
                  <th className="text-left p-4 font-semibold">Method</th>
                  <th className="text-center p-4 font-semibold">Removes thermoplastic</th>
                  <th className="text-center p-4 font-semibold">Damages substrate</th>
                  <th className="text-center p-4 font-semibold">Chemical waste</th>
                  <th className="text-center p-4 font-semibold">Ready to re-mark</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { method: "Shot blasting", thermo: "✓", damage: "✗", waste: "✗", ready: "✓ Immediately" },
                  { method: "Water jetting", thermo: "Partial", damage: "Possible", waste: "✗", ready: "After drying" },
                  { method: "Grinding", thermo: "✓", damage: "Yes — cuts surface", waste: "✗", ready: "✓ But scarred" },
                  { method: "Chemical stripping", thermo: "✗", damage: "✗", waste: "✓ Yes", ready: "After treatment" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 font-semibold text-[#2C5F7F]">{row.method}</td>
                    <td className="p-4 text-center text-gray-700">{row.thermo}</td>
                    <td className="p-4 text-center text-gray-700">{row.damage}</td>
                    <td className="p-4 text-center text-gray-700">{row.waste}</td>
                    <td className="p-4 text-center text-gray-700">{row.ready}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Applications ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#2C5F7F] mb-2 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Types of car park we work in
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            We have experience across all types of car park and surface environment.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map(({ title, desc }, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#2C5F7F] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
            <img
              src={IMG.markings}
              alt="UK car park with white bay line markings on tarmac — typical car park surface preparation and line marking removal project"
              className="w-full h-72 object-cover"
              width="600"
              height="288"
              loading="lazy"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              How the process works
            </h2>
            <ol className="space-y-5">
              {[
                { step: "1", title: "Site survey & quotation", desc: "We visit your car park (or assess from photos) to understand the scope, surface type, and marking types. We provide a fixed-price quotation with a clear programme." },
                { step: "2", title: "Mobilisation", desc: "Our mobile shot blasting unit arrives at your site. Equipment is compact enough for multi-storey and underground car parks." },
                { step: "3", title: "Marking removal", desc: "We blast each bay, line, or marking systematically. Paint and thermoplastic are removed back to a clean surface. We work in sections to keep part of the car park open if required." },
                { step: "4", title: "Cleanup & handover", desc: "All spent abrasive and debris is collected and removed from site. The surface is left clean and ready for your line marking contractor to apply new markings." },
              ].map(({ step, title, desc }) => (
                <li key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#2C5F7F] text-white font-bold text-sm flex items-center justify-center">{step}</div>
                  <div>
                    <h3 className="font-bold text-[#2C5F7F] mb-1">{title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#2C5F7F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Need car park markings removed?
          </h2>
          <p className="text-white/80 mb-8 text-lg max-w-xl mx-auto">
            Tell us the size of your car park and the type of markings — we'll provide a fast, fixed-price quotation. Free site survey included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-[#C17F3B] hover:bg-[#a66a2e] text-white font-semibold px-8 py-3 text-base"
              onClick={() => setQuotePopupOpen(true)}
            >
              Get a Free Quote
            </Button>
            <a href="tel:07721375756" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3 rounded-md transition text-base">
              <Phone className="w-4 h-4" /> 07721 375756
            </a>
          </div>
        </div>
      </section>

      {/* ── Coverage ─────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Coverage across England &amp; Wales
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We operate from bases in the Midlands and cover all of England and Wales. We regularly work in Nottingham, Birmingham, Manchester, Leeds, Sheffield, Leicester, Derby, Coventry, Bristol, London, and across our <Link href="/service-areas" className="text-[#2C5F7F] underline hover:text-[#C17F3B]">35-county service area</Link>.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Travel costs are included in our quotation. For large projects or repeat contracts, we can agree a programme that minimises mobilisation costs across multiple sites.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["Nottingham", "Birmingham", "Manchester", "Leeds", "Sheffield", "Leicester", "Derby", "Coventry", "Bristol", "London"].map(city => (
                <div key={city} className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin className="w-4 h-4 text-[#C17F3B] flex-shrink-0" />
                  {city}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={IMG.bays}
              alt="Car park with clearly marked parking bays — showing the type of surface and markings that can be removed by shot blasting before re-marking"
              className="w-full h-72 object-cover"
              width="600"
              height="288"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#f5f0e8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#2C5F7F] mb-2 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Frequently asked questions
          </h2>
          <p className="text-gray-600 text-center mb-10">Common questions about car park line marking removal by shot blasting.</p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-[#2C5F7F] hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  aria-expanded={expandedFaq === i}
                >
                  <span>{faq.question}</span>
                  {expandedFaq === i
                    ? <ChevronUp className="w-5 h-5 text-[#C17F3B] flex-shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-[#C17F3B] flex-shrink-0" />
                  }
                </button>
                {expandedFaq === i && (
                  <div className="px-5 pb-5 text-gray-700 leading-relaxed text-sm border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related services ─────────────────────────────────────────────────── */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Related services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/services/structural-steel-frames" className="group p-5 rounded-xl border border-gray-100 shadow-sm bg-[#f9f7f4] hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#2C5F7F] group-hover:underline mb-1">Structural Steel Shot Blasting</h3>
              <p className="text-sm text-gray-600">Sa 2.5 surface preparation for structural steelwork, beams, and columns.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#2C5F7F]">View service <ArrowRight className="w-3 h-3" /></span>
            </Link>
            <Link href="/services/factory-cladding" className="group p-5 rounded-xl border border-gray-100 shadow-sm bg-[#f9f7f4] hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#2C5F7F] group-hover:underline mb-1">Factory &amp; Warehouse Cladding</h3>
              <p className="text-sm text-gray-600">Shot blasting and surface preparation for industrial building cladding panels.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#2C5F7F]">View service <ArrowRight className="w-3 h-3" /></span>
            </Link>
            <Link href="/services/warehouse-racking" className="group p-5 rounded-xl border border-gray-100 shadow-sm bg-[#f9f7f4] hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#2C5F7F] group-hover:underline mb-1">Racking &amp; Mezzanine Blasting</h3>
              <p className="text-sm text-gray-600">On-site shot blasting of warehouse racking, mezzanine floors, and storage systems.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#2C5F7F]">View service <ArrowRight className="w-3 h-3" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Further reading ──────────────────────────────────────────────────── */}
      <section className="py-12 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Further reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog/shot-blasting-vs-sandblasting-difference" className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
              <img
                src="https://commercialshotblasting.co.uk/blog-og-images/shot-blasting-vs-sandblasting-difference.png"
                alt="Shot blasting vs sandblasting — understanding the difference"
                className="w-full h-44 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <span className="text-xs font-semibold text-[#C17F3B] uppercase tracking-wide">Explainer</span>
                <h3 className="mt-1 text-base font-bold text-[#2C5F7F] group-hover:underline leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Shot Blasting vs Sandblasting: What's the Difference?
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  The term "sandblasting" is still widely used, but silica sand is illegal in the UK. We explain what the difference is and what media is used instead.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#2C5F7F] group-hover:gap-2 transition-all">
                  Read the article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
            <Link href="/blog/flash-rust-after-shot-blasting" className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
              <img
                src="/manus-storage/staircase_after_sa25_2e0c8e5a.jpg"
                alt="Clean Sa 2.5 steel surface after shot blasting — ready for coating"
                className="w-full h-44 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <span className="text-xs font-semibold text-[#C17F3B] uppercase tracking-wide">Technical Guide</span>
                <h3 className="mt-1 text-base font-bold text-[#2C5F7F] group-hover:underline leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Flash Rust After Shot Blasting: Causes, Prevention &amp; Solutions
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  Why freshly blasted steel rusts so quickly, and what to do about it — including priming windows and coating specifications.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#2C5F7F] group-hover:gap-2 transition-all">
                  Read the guide <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
            <Link href="/site-survey" className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
              <img
                src={IMG.surface}
                alt="Shot blasting team on-site — free site survey and quotation for car park paint removal"
                className="w-full h-44 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <span className="text-xs font-semibold text-[#C17F3B] uppercase tracking-wide">Free Service</span>
                <h3 className="mt-1 text-base font-bold text-[#2C5F7F] group-hover:underline leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Request A Site Visit &amp; Quotation
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  We visit your site, assess the scope, and provide a fixed-price quotation with a clear programme. No obligation.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#2C5F7F] group-hover:gap-2 transition-all">
                  Book now <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
    </div>
  );
}
