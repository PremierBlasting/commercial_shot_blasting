import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuotePopup } from "@/components/QuotePopup";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Phone, Mail, Shield, Clock, Award, ChevronDown, ChevronUp, Flame } from "lucide-react";
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
      "name": "External Staircases & Fire Escapes Shot Blasting",
      "alternateName": ["External Steel Staircase Shot Blasting", "Fire Escape Shot Blasting UK", "Shot Blasting Fire Escapes", "Staircase Rust Removal", "Shot Blasting External Steps UK"],
      "description": "On-site mobile shot blasting of external steel staircases and fire escapes across the UK. Rust, old paint, and contamination removed to Sa 2.5 near-white metal standard. No dismantling required — we blast the structure in place at your premises.",
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
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fire Escape Shot Blasting UK" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "External Staircase Paint Stripping" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fire Escape Rust Removal" } },
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
        { "@type": "Question", "name": "Do you blast external staircases on-site?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — we always work on-site at your premises. We bring all our mobile blasting equipment to you, so there is no need to dismantle or transport the staircase. We cover the UK." } },
        { "@type": "Question", "name": "What standard do you blast external staircases to?", "acceptedAnswer": { "@type": "Answer", "text": "We blast all external steelwork to Sa 2.5 near-white metal standard with an Rz 50–75 μm anchor profile — the specification required by most protective coating systems including epoxy, polyurethane, and intumescent paints." } },
        { "@type": "Question", "name": "Can you blast an external staircase while the building is occupied?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our mobile setup is self-contained and we can work in a designated area while the building remains occupied. We discuss logistics with you before starting and implement appropriate dust and abrasive containment." } },
        { "@type": "Question", "name": "How long does it take to shot blast an external staircase?", "acceptedAnswer": { "@type": "Answer", "text": "Most external staircases can be completed in one to two days. Timescales depend on the size and condition of the staircase. We will give you an accurate estimate when you enquire." } },
        { "@type": "Question", "name": "What happens after shot blasting an external staircase?", "acceptedAnswer": { "@type": "Answer", "text": "Once blasted, the steel surface is ready for immediate priming. We recommend applying a primer coat within four hours of blasting to prevent flash rusting, especially in humid conditions. We can advise on suitable coating systems if required." } },
        { "@type": "Question", "name": "How quickly does steel rust after shot blasting?", "acceptedAnswer": { "@type": "Answer", "text": "Freshly blasted steel can begin to flash rust within 2–4 hours in normal UK conditions — and even faster in humid or coastal environments. Shot blasting removes all protective mill scale and coatings, leaving bare reactive steel. We strongly recommend having your painter on-site and ready to apply an epoxy zinc phosphate primer immediately after we finish. We can coordinate our blasting schedule around your painter's availability, and for large staircases we can blast in sections so coating begins on completed areas while we continue working." } }
      ]
    }
  ]
};

const faqs = [
  {
    question: "Do you blast staircases on-site?",
    answer: "Yes — we always work on-site at your premises. We bring all our mobile blasting equipment to you, so there is no need to dismantle or transport the staircase. We cover the UK."
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
  {
    question: "How quickly does steel rust after shot blasting?",
    answer: "Freshly blasted steel can begin to flash rust within 2–4 hours in normal UK conditions — and even faster in humid or coastal environments. Shot blasting removes all protective mill scale and coatings, leaving bare reactive steel. We strongly recommend having your painter on-site and ready to apply an epoxy zinc phosphate primer immediately after we finish. We can coordinate our blasting schedule around your painter's availability, and for large staircases we can blast in sections so coating begins on completed areas while we continue working."
  },
];

export default function ExternalStaircasesPage() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useSEO({
    title: "Shot Blasting External Staircases & Fire Escapes UK | On-Site Rust Removal | Sa 2.5 | Commercial Shot Blasting",
    description: "Mobile on-site shot blasting for external steel staircases and fire escapes across the UK. Rust, old paint, and contamination removed to Sa 2.5 near-white metal standard. No dismantling required — we come to you. Call 07721 375756.",
    keywords: "shot blasting external staircases, shot blasting fire escapes, fire escape shot blasting UK, external staircase shot blasting, external staircase rust removal, steel staircase shot blasting UK, mobile shot blasting staircases, shot blasting fire escapes UK, fire escape rust removal, external staircase surface preparation, shot blast external steps UK, staircase rust and paint removal UK",
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
            Shot Blasting External Staircases &amp; Fire Escapes
          </h1>
          <p className="text-xl text-white/90 mb-6 max-w-2xl">
            Mobile on-site shot blasting for external steel staircases and fire escapes — rust, old paint, and contamination removed to Sa 2.5 near-white metal standard. No dismantling required. We come to you, anywhere in the UK.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-white text-[#2C5F7F] hover:bg-white/90 font-semibold" onClick={() => setQuotePopupOpen(true)}>
              Request A Site Visit
            </Button>
            <a href="tel:07721375756">
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
                  Shot Blasting External Staircases &amp; Fire Escapes — On-Site Service
                </h2>
                {/* AI Overview / Featured Snippet target block */}
                <div className="bg-blue-50 border-l-4 border-[#2C5F7F] rounded-r-lg p-5 mb-6">
                  <p className="text-gray-800 font-medium leading-relaxed">
                    <strong>Shot blasting external staircases and fire escapes</strong> is the process of propelling iron silicate abrasive media at high velocity against the steel surface to remove rust, old paint, and contamination — producing a clean, profiled surface ready for a long-lasting protective coating. Commercial Shot Blasting carries out this process <strong>on-site at your premises</strong>, blasting the staircase or fire escape in place without dismantling. The result is a <strong>Sa 2.5 near-white metal surface</strong> with an Rz 50–75 μm anchor profile, ready for immediate priming. Steel must be primed <strong>within 2–4 hours of blasting</strong> to prevent flash rusting.
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
                    "Mobile service covering the UK",
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

              {/* Priming & Painting */}
              <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6">
                <h2 className="text-2xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Prime &amp; Paint Within 2–4 Hours of Blasting
                </h2>
                <p className="text-gray-800 font-medium leading-relaxed mb-4">
                  Once your external staircase or fire escape has been shot blasted to Sa 2.5 near-white metal, the surface is highly reactive.
                  <strong> Flash rusting can begin within 2–4 hours</strong> in normal UK conditions — and even faster in wet or coastal environments.
                  To protect the investment of blasting, the steel <strong>must be primed immediately after we finish</strong>.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-bold text-[#2C5F7F] mb-2">Why Flash Rust Happens</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Shot blasting removes all rust, old paint, and coatings — leaving bare reactive steel. Without a protective primer,
                      moisture in the air immediately begins oxidising the surface. Even a thin layer of flash rust will compromise coating
                      adhesion and significantly reduce the lifespan of the paint system.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-bold text-[#2C5F7F] mb-2">What We Recommend</h3>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>✓ Have your painter on-site and ready before we start</li>
                      <li>✓ Apply an epoxy zinc phosphate primer within 2–4 hours</li>
                      <li>✓ For large staircases, we blast in sections so coating can begin immediately</li>
                      <li>✓ Keep the blasted surface dry and sheltered if priming is delayed</li>
                      <li>✓ Follow with a polyurethane or epoxy topcoat for long-term weather protection</li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  We are happy to coordinate our blasting schedule around your painter's availability — just let us know when booking.
                  On larger staircases we can work in sections, allowing coating to begin on completed areas while we continue blasting.
                </p>
                <Button className="bg-[#2C5F7F] hover:bg-[#234a63] text-white font-semibold" onClick={() => setQuotePopupOpen(true)}>
                  Request a Quote — We Come to You
                </Button>
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
                    <a href="tel:07721375756" className="block">
                      <Button variant="outline" className="w-full border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F]/10">
                        <Phone className="w-4 h-4 mr-2" />
                        07721 375756
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
                <a href="/services/fire-escapes" className="flex items-center justify-between p-3 rounded-lg hover:bg-[#2C5F7F]/5 transition-colors group mb-1">
                  <span className="text-gray-700 group-hover:text-[#2C5F7F] font-medium text-sm">Fire Escapes &amp; Stair Towers</span>
                  <ArrowRight className="w-4 h-4 text-[#2C5F7F] opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { title: "Intumescent Painting", href: "/services/intumescent-painting", tagline: "Fire protection coatings applied after Sa 2.5 blasting" },
                    { title: "Steel Gates Shot Blasting", href: "/services/steel-gates", tagline: "On-site blasting for steel gates and railings" },
                    { title: "Rust Removal", href: "/services/rust-removal", tagline: "Complete rust removal to bare metal standard" },
                    { title: "Structural Steel Shot Blasting", href: "/services/structural-steel-frames", tagline: "On-site blasting for building frames and trusses" },
                    { title: "Steel Fabrications Blasting", href: "/steel-fabrications", tagline: "Before & after photos from fabrication projects" },
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

      {/* ── Sa 2.5 & Fire Compliance Callout ─────────────────────────────── */}
      <section className="py-14 bg-[#0d2233]">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-orange-300 mb-3">Surface Preparation & Fire Compliance</span>
              <h2 className="text-3xl font-bold text-white mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                Why Sa 2.5 Matters for Staircase Fire Protection
              </h2>
              <p className="text-white/80 leading-relaxed mb-4">
                External and internal steel staircases in commercial and industrial buildings are frequently required to carry a fire resistance rating under Approved Document B. Intumescent paint is the standard method for achieving this — but it will only perform correctly if the steel has been properly prepared first.
              </p>
              <p className="text-white/80 leading-relaxed mb-4">
                Shot blasting to <strong className="text-white">Sa 2.5 near-white metal standard</strong> removes all rust, old paint, and mill scale and creates an Rz 50–75 μm anchor profile in the steel surface. Without this profile, intumescent coatings cannot bond correctly — and a coating that delaminates under heat provides no protection at all.
              </p>
              <p className="text-white/80 leading-relaxed">
                We provide shot blasting and intumescent painting as a combined service for staircases. Both operations are carried out by our teams in a single mobilisation — no separate contractors, no gap between blast and paint, no risk of flash rusting between trades.
              </p>
              <div className="mt-6">
                <Link
                  href="/services/intumescent-painting"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
                >
                  <Flame className="w-4 h-4" /> View Intumescent Painting Service
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { icon: <Shield className="w-5 h-5 text-orange-400" />, title: "Sa 2.5 Near-White Metal", body: "The internationally recognised standard for surface cleanliness before protective coating application. Required by all intumescent paint manufacturers as the minimum substrate condition." },
                { icon: <CheckCircle className="w-5 h-5 text-orange-400" />, title: "Rz 50–75 μm Anchor Profile", body: "Shot blasting creates a mechanical surface profile that primer and intumescent topcoat can key into. Without this profile, coatings are prone to delamination under heat." },
                { icon: <Award className="w-5 h-5 text-orange-400" />, title: "Combined Blast & Paint Service", body: "We blast and paint staircases in a single visit. One contractor, one invoice, one documentation package for building control sign-off." },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-4 bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex-shrink-0 mt-0.5">{icon}</div>
                  <div>
                    <p className="font-semibold text-white mb-1">{title}</p>
                    <p className="text-sm text-white/70 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Blog Posts */}
      <section className="py-12 bg-[#f5f0e8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Further Reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog/shot-blasting-external-staircases" className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
              <img
                src="/manus-storage/staircase_during1_e3065e80.jpg"
                alt="Shot blasting external staircase on-site — rust and old paint stripped to Sa 2.5 near-white metal"
                className="w-full h-44 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <span className="text-xs font-semibold text-[#C17F3B] uppercase tracking-wide">Guide</span>
                <h3 className="mt-1 text-base font-bold text-[#2C5F7F] group-hover:underline leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Shot Blasting External Staircases: The Complete Guide
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  Why rust spreads so fast on external steel staircases, how shot blasting removes it to Sa 2.5 standard, and what to expect from our on-site mobile service.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#2C5F7F] group-hover:gap-2 transition-all">
                  Read the guide <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
            <Link href="/blog/shot-blasting-steel-fabrications-uk" className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
              <img
                src="/manus-storage/SteelFabrications1before_090ae51a.jpg"
                alt="Steel fabrication before shot blasting — mill scale and rust on fabricated steel structure"
                className="w-full h-44 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <span className="text-xs font-semibold text-[#C17F3B] uppercase tracking-wide">Project Photos</span>
                <h3 className="mt-1 text-base font-bold text-[#2C5F7F] group-hover:underline leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Shot Blasting Steel Fabrications UK: Before &amp; After Photos
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  Five real fabrication projects with before, during, and after photos showing mill scale and rust removal to Sa 2.5 near-white metal standard.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#2C5F7F] group-hover:gap-2 transition-all">
                  See the projects <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
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
                  The term &quot;sandblasting&quot; is still widely used, but silica sand is illegal in the UK. We explain what the difference is, why it matters, and what abrasive media is used instead.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#2C5F7F] group-hover:gap-2 transition-all">
                  Read the article <ArrowRight className="w-4 h-4" />
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
