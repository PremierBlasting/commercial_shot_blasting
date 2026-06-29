import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuotePopup } from "@/components/QuotePopup";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Phone, Mail, Shield, Clock, Award, ChevronDown, ChevronUp } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

// ── CDN video paths ────────────────────────────────────────────────────────────
const videos = {
  v1: "/manus-storage/WhatsAppVideo2026-06-27at13.50.17(1)_eb3b71ad.mp4",
  v2: "/manus-storage/WhatsAppVideo2026-06-27at13.50.17(2)_f192dcbc.mp4",
};

// ── JSON-LD — rich schema graph ───────────────────────────────────────────────
const JSONLD_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://commercialshotblasting.co.uk/external-staircases#service",
      "name": "External Staircases Shot Blasting",
      "alternateName": ["External Steel Staircase Shot Blasting", "Staircase Rust Removal", "Shot Blasting External Steps UK"],
      "description": "On-site mobile shot blasting of external steel staircases across England and Wales. Rust, old paint, and contamination removed to Sa 2.5 near-white metal standard. No dismantling required — we blast the staircase in place at your premises.",
      "url": "https://commercialshotblasting.co.uk/external-staircases",
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
        "name": "External Staircase Shot Blasting Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "External Steel Staircase Rust Removal" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "External Staircase Paint Stripping" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "External Staircase Surface Preparation for Coating" } }
        ]
      }
    },
    {
      "@type": "VideoObject",
      "@id": "https://commercialshotblasting.co.uk/external-staircases#video1",
      "name": "External Staircase Shot Blasting in Action — On-Site Mobile Service",
      "description": "Watch our mobile shot blasting unit in action on an external steel staircase. The video shows rust and old paint being stripped back to clean bare metal Sa 2.5 standard in real time.",
      "thumbnailUrl": "https://commercialshotblasting.co.uk/manus-storage/staircase_thumb_d419ab8f.jpg",
      "contentUrl": "https://commercialshotblasting.co.uk/manus-storage/WhatsAppVideo2026-06-27at13.50.17(1)_eb3b71ad.mp4",
      "uploadDate": "2026-06-27",
      "duration": "PT1M",
      "publisher": {
        "@type": "Organization",
        "name": "Commercial Shot Blasting",
        "url": "https://commercialshotblasting.co.uk"
      },
      "keywords": "shot blasting external staircase, staircase rust removal, mobile shot blasting UK"
    },
    {
      "@type": "VideoObject",
      "@id": "https://commercialshotblasting.co.uk/external-staircases#video2",
      "name": "External Staircase After Shot Blasting — Sa 2.5 Surface Transformation",
      "description": "The finished result of shot blasting an external steel staircase — a clean, uniform Sa 2.5 near-white metal surface across the entire structure, ready for the client's chosen coating system.",
      "thumbnailUrl": "https://commercialshotblasting.co.uk/manus-storage/staircase_thumb_d419ab8f.jpg",
      "contentUrl": "https://commercialshotblasting.co.uk/manus-storage/WhatsAppVideo2026-06-27at13.50.17(2)_f192dcbc.mp4",
      "uploadDate": "2026-06-27",
      "duration": "PT1M",
      "publisher": {
        "@type": "Organization",
        "name": "Commercial Shot Blasting",
        "url": "https://commercialshotblasting.co.uk"
      },
      "keywords": "shot blasting external staircase, Sa 2.5 surface preparation, external staircase coating ready"
    },
    {
      "@type": "FAQPage",
      "@id": "https://commercialshotblasting.co.uk/external-staircases#faq",
      "mainEntity": [
        { "@type": "Question", "name": "Do you blast external staircases on-site?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — we always work on-site at your premises. We bring all our mobile blasting equipment to you, so there is no need to dismantle or transport the staircase. We cover England and Wales." } },
        { "@type": "Question", "name": "What standard do you blast external staircases to?", "acceptedAnswer": { "@type": "Answer", "text": "We blast all external steelwork to Sa 2.5 near-white metal standard with an Rz 50–75 μm anchor profile — the specification required by most protective coating systems including epoxy, polyurethane, and intumescent paints." } },
        { "@type": "Question", "name": "Can you blast an external staircase while the building is occupied?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our mobile setup is self-contained and we can work in a designated area while the building remains occupied. We discuss logistics with you before starting and implement appropriate dust and abrasive containment." } },
        { "@type": "Question", "name": "How long does it take to shot blast an external staircase?", "acceptedAnswer": { "@type": "Answer", "text": "Most external staircases can be completed in one to two days. Timescales depend on the size and condition of the staircase. We will give you an accurate estimate when you enquire." } },
        { "@type": "Question", "name": "What happens after shot blasting an external staircase?", "acceptedAnswer": { "@type": "Answer", "text": "Once blasted, the steel surface is ready for immediate priming. We recommend applying a primer coat within four hours of blasting to prevent flash rusting, especially in humid conditions." } }
      ]
    }
  ]
};

const faqs = [
  {
    question: "Do you blast staircases on-site?",
    answer: "Yes — we always work on-site at your premises. We bring all our mobile blasting equipment to you, so there is no need to dismantle or transport the staircase. We cover England and Wales."
  },
  {
    question: "What standard do you blast staircases to?",
    answer: "We blast all external steelwork to Sa 2.5 near-white metal standard with an Rz 50–75 μm anchor profile — the specification required by most protective coating systems including epoxy, polyurethane, and intumescent paints."
  },
  {
    question: "Can you blast while the building is occupied?",
    answer: "Yes. Our mobile setup is self-contained and we can work in a designated area while the building remains occupied. We discuss logistics with you before starting and implement appropriate dust and abrasive containment."
  },
  {
    question: "How long does it take to blast an external staircase?",
    answer: "Timescales depend on the size and condition of the staircase. Most external staircases can be completed in one to two days. We will give you an accurate estimate when you enquire."
  },
  {
    question: "What happens after blasting?",
    answer: "Once blasted, the steel surface is ready for immediate priming. We recommend applying a primer coat within four hours of blasting to prevent flash rusting, especially in humid conditions. We can advise on suitable coating systems if required."
  },
];

export default function ExternalStaircasesPage() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useSEO({
    title: "Shot Blasting External Staircases UK | On-Site Rust Removal | Sa 2.5 Standard | Commercial Shot Blasting",
    description: "Mobile on-site shot blasting for external steel staircases across England and Wales. Rust, old paint, and contamination removed to Sa 2.5 near-white metal standard. No dismantling required — we come to you. Call 07970 566409.",
    keywords: "shot blasting external staircases, external staircase shot blasting, external staircase rust removal, steel staircase shot blasting UK, mobile shot blasting staircases, external staircase surface preparation, shot blast external steps, staircase rust and paint removal UK, external steel staircase coating preparation",
    image: "/manus-storage/staircase_thumb_d419ab8f.jpg",
    canonical: "https://commercialshotblasting.co.uk/external-staircases",
  });

  useEffect(() => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = "ext-stairs-jsonld";
    s.textContent = JSON.stringify(JSONLD_GRAPH);
    document.head.appendChild(s);
    return () => { s.parentNode?.removeChild(s); };
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />

      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50 border-b border-gray-200">
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "External Staircases", href: "/external-staircases", isCurrentPage: true }
          ]} />
        </div>
      </section>

      {/* Hero — photo banner matching service page style */}
      <section className="relative text-white py-16 lg:py-24 overflow-hidden">
        <img
          src="/manus-storage/staircase_thumb_d419ab8f.jpg"
          alt="Operative shot blasting external steel staircase on site"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </Link>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            🪜 External Steelwork
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Shot Blasting External Staircases
          </h1>
          <p className="text-xl text-white/90 mb-6 max-w-2xl">
            Mobile on-site shot blasting for external steel staircases — rust, old paint, and contamination removed to Sa 2.5 near-white metal standard. No dismantling required. We come to you, anywhere in England and Wales.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-white text-[#2C5F7F] hover:bg-white/90 font-semibold" onClick={() => setQuotePopupOpen(true)}>
              Request A Site Visit
            </Button>
            <a href="tel:07970566409">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="w-4 h-4 mr-2" />
                Call Us Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#1a3d52] text-white py-6 border-t border-white/10">
        <div className="container">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { value: "Sa 2.5", label: "Surface Standard" },
              { value: "1–2 days", label: "Typical Turnaround" },
              { value: "100%", label: "On-Site Service" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-sm text-white/70 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content — 2/3 + 1/3 sidebar layout */}
      <section className="py-16 bg-[#F5F1E8]">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* ── Left / main column ─────────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-12">

              {/* About */}
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Shot Blasting External Staircases — On-Site Service
                </h2>
                {/* AI Overview / Featured Snippet target block */}
                <div className="bg-blue-50 border-l-4 border-[#2C5F7F] rounded-r-lg p-5 mb-6">
                  <p className="text-gray-800 font-medium leading-relaxed">
                    <strong>Shot blasting external staircases</strong> is the process of propelling iron silicate abrasive media at high velocity against the steel surface to remove rust, old paint, and contamination — producing a clean, profiled surface ready for a long-lasting protective coating. Commercial Shot Blasting carries out this process <strong>on-site at your premises</strong>, blasting the staircase in place without dismantling. The result is a <strong>Sa 2.5 near-white metal surface</strong> with an Rz 50–75 μm anchor profile, ready for immediate priming.
                  </p>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  External steel staircases are constantly exposed to the elements — rain, frost, and humidity accelerate rust and cause old paint to fail. Shot blasting is the most effective way to strip the surface back to bare metal and prepare it for a long-lasting protective coating system.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  We attend your site with our mobile blasting unit and blast the staircase in place — no dismantling, no transport, no delays. Using iron silicate (copper slag) media, we remove all rust, old paint, and surface contamination, creating the anchor profile that coatings need to bond permanently.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Every staircase is blasted to <strong>Sa 2.5 near-white metal standard</strong> with an <strong>Rz 50–75 μm anchor profile</strong> — the specification required by most protective coating systems including epoxy primers, polyurethane topcoats, and intumescent paints. Your staircase is ready for immediate priming once blasting is complete.
                </p>
              </div>

              {/* Key Benefits */}
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Key Benefits
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "No dismantling required — blasted in place on-site",
                    "Sa 2.5 standard achieved on every project",
                    "Iron silicate media for consistent Rz 50–75 μm anchor profile",
                    "Fast 1–2 day turnaround for most staircases",
                    "Mobile service covering England and Wales",
                    "Suitable for all external steel staircase types and sizes",
                    "Dust and abrasive containment as standard",
                    "Ready for immediate priming after blasting",
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <CheckCircle className="w-5 h-5 text-[#2C5F7F] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Video Gallery ──────────────────────────────────────────────── */}
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  External Staircase Shot Blasting — See Our Work
                </h2>
                <p className="text-gray-600 mb-8">
                  Watch our mobile shot blasting unit in action on external steel staircases. The videos show the rust and paint removal process and the dramatic Sa 2.5 surface transformation achieved on-site.
                </p>

                <div className="space-y-12">

                  {/* Video 1 */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#2C5F7F] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>External Staircase Shot Blasting — In Action</h3>
                        <p className="text-gray-500 text-sm mt-0.5">Mobile on-site blasting — rust and old paint stripped to Sa 2.5 near-white metal standard</p>
                      </div>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-xl bg-black">
                      <video
                        controls
                        preload="metadata"
                        className="w-full max-h-[520px] object-contain"
                        aria-label="Video showing shot blasting of an external steel staircase on-site — rust and old paint removed to Sa 2.5 near-white metal standard"
                        title="External Staircase Shot Blasting — On-Site Mobile Service"
                      >
                        <source src={videos.v1} type="video/mp4" />
                        <track kind="descriptions" label="Shot blasting external steel staircase, removing rust and old paint to Sa 2.5 standard" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      Our mobile shot blasting unit in action on an external steel staircase. The video clearly shows the transformation as rust and old paint are stripped back to clean bare metal — achieving Sa 2.5 near-white metal standard in real time, on-site at the customer's premises.
                    </p>
                  </div>

                  {/* Video 2 */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#2C5F7F] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>External Staircase After Shot Blasting — Sa 2.5 Surface</h3>
                        <p className="text-gray-500 text-sm mt-0.5">Sa 2.5 near-white metal finish achieved across the full structure — ready for immediate priming</p>
                      </div>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-xl bg-black">
                      <video
                        controls
                        preload="metadata"
                        className="w-full max-h-[520px] object-contain"
                        aria-label="Video showing external steel staircase after shot blasting — clean Sa 2.5 near-white metal surface ready for protective coating"
                        title="External Staircase After Shot Blasting — Sa 2.5 Surface Transformation"
                      >
                        <source src={videos.v2} type="video/mp4" />
                        <track kind="descriptions" label="External steel staircase after shot blasting — clean Sa 2.5 near-white metal surface ready for coating" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      The finished result of shot blasting an external steel staircase — a clean, uniform Sa 2.5 near-white metal surface across the entire structure including treads, risers, stringers, and handrails. Ready for the client's chosen coating system. The characteristic white-grey appearance confirms near-white metal standard has been achieved throughout.
                    </p>
                  </div>

                </div>
              </div>

              {/* Process Steps */}
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  How We Shot Blast External Staircases
                </h2>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Site Survey & Assessment", desc: "We visit your site to assess the staircase condition, size, and access requirements. We agree the scope of work and provide a fixed-price quote." },
                    { step: "2", title: "Setup & Containment", desc: "Our mobile blasting unit is positioned on-site. We set up dust and abrasive containment to protect surrounding areas before blasting begins." },
                    { step: "3", title: "On-Site Shot Blasting", desc: "We blast the entire staircase structure — treads, risers, stringers, handrails, and fixings — to Sa 2.5 near-white metal standard using iron silicate media." },
                    { step: "4", title: "Quality Inspection", desc: "The blasted surface is inspected to confirm Sa 2.5 standard and the required Rz 50–75 μm anchor profile have been achieved across all sections." },
                    { step: "5", title: "Ready for Coating", desc: "The staircase is handed over ready for immediate priming. We recommend applying a primer coat within four hours to prevent flash rusting." },
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="flex gap-4 bg-white p-5 rounded-lg shadow-sm">
                      <div className="w-10 h-10 bg-[#2C5F7F] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">{step}</div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  External Staircase Shot Blasting — FAQs
                </h2>
                <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
                  {faqs.map((faq, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden" itemScope itemType="https://schema.org/Question">
                      <button
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                        onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                        aria-expanded={expandedFaq === i}
                      >
                        <span className="font-semibold text-gray-800 pr-4" itemProp="name">{faq.question}</span>
                        {expandedFaq === i
                          ? <ChevronUp className="w-5 h-5 text-[#2C5F7F] flex-shrink-0" />
                          : <ChevronDown className="w-5 h-5 text-[#2C5F7F] flex-shrink-0" />
                        }
                      </button>
                      {expandedFaq === i && (
                        <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4" itemScope itemType="https://schema.org/Answer">
                          <span itemProp="text">{faq.answer}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ── Right sidebar ──────────────────────────────────────────────── */}
            <div className="space-y-6">

              {/* Sticky contact card */}
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Request A Site Visit
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Ready to discuss your staircase project? We come to you — contact us for a no-obligation quote.
                  </p>
                  <div className="space-y-3">
                    <Button className="w-full bg-[#2C5F7F] hover:bg-[#234a63]" onClick={() => setQuotePopupOpen(true)}>
                      Request Site Visit
                    </Button>
                    <a href="tel:07970566409" className="block">
                      <Button variant="outline" className="w-full border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F]/10">
                        <Phone className="w-4 h-4 mr-2" />
                        07970 566409
                      </Button>
                    </a>
                    <a href="mailto:info@commercialshotblasting.co.uk" className="block">
                      <Button variant="outline" className="w-full border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F]/10">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Us
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Spec card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Specification
                  </h3>
                  <div className="space-y-3 text-sm">
                    {[
                      { label: "Surface Standard", value: "Sa 2.5 Near-White Metal" },
                      { label: "Blast Media", value: "Iron Silicate (Copper Slag)" },
                      { label: "Method", value: "Mobile On-Site Blasting" },
                      { label: "Turnaround", value: "1–2 Days Typical" },
                      { label: "Coverage", value: "England & Wales" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between gap-2 border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                        <span className="text-gray-500">{label}</span>
                        <span className="font-semibold text-gray-800 text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Why Choose Us */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Why Choose Us
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-[#2C5F7F] mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Fully Insured</h4>
                        <p className="text-sm text-gray-600">Comprehensive liability coverage</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-[#2C5F7F] mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Experienced Team</h4>
                        <p className="text-sm text-gray-600">Skilled professionals</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#2C5F7F] mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Fast Turnaround</h4>
                        <p className="text-sm text-gray-600">1–2 days for most staircases</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Services */}
              <div>
                <h3 className="text-xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Related Services
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { title: "Steel Gates Shot Blasting", href: "/services/steel-gates", tagline: "On-site blasting for steel gates and railings" },
                    { title: "Rust Removal", href: "/services/rust-removal", tagline: "Complete rust removal to bare metal standard" },
                    { title: "Structural Steel Shot Blasting", href: "/services/structural-steel-frames", tagline: "On-site blasting for building frames and trusses" },
                    { title: "Steel Fabrications Gallery", href: "/steel-fabrications", tagline: "Before & after photos from fabrication projects" },
                  ].map((s) => (
                    <Link key={s.href} href={s.href} className="group flex gap-3 bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100 p-3">
                      <div className="flex flex-col justify-center min-w-0">
                        <span className="font-semibold text-[#2C5F7F] text-sm leading-tight group-hover:underline">{s.title}</span>
                        <span className="text-xs text-gray-500 mt-1">{s.tagline}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#2C5F7F] flex-shrink-0 self-center ml-auto" />
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
    </div>
  );
}
