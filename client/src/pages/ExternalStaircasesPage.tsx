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

// ── JSON-LD ────────────────────────────────────────────────────────────────────
const JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "External Staircases Shot Blasting",
  "description": "On-site shot blasting of external steel staircases — rust, old paint, and contamination removed to Sa 2.5 near-white metal standard. Mobile service covering England and Wales.",
  "url": "https://commercialshotblasting.co.uk/external-staircases",
  "provider": {
    "@type": "Organization",
    "name": "Commercial Shot Blasting",
    "url": "https://commercialshotblasting.co.uk",
    "telephone": "07970566409"
  },
  "areaServed": { "@type": "Country", "name": "United Kingdom" },
  "serviceType": "Shot Blasting"
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
    title: "External Staircases Shot Blasting | On-Site Service | Commercial Shot Blasting",
    description: "On-site shot blasting of external steel staircases across England and Wales. Rust, old paint, and contamination removed to Sa 2.5 near-white metal standard. Mobile service — we come to you.",
    keywords: "external staircases shot blasting, staircase shot blasting, steel staircase rust removal, external staircase surface preparation, shot blasting staircases UK",
    canonical: "https://commercialshotblasting.co.uk/external-staircases",
  });

  useEffect(() => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = "ext-stairs-jsonld";
    s.textContent = JSON.stringify(JSONLD);
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

      {/* Hero — dark gradient banner matching service page style */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-16 lg:py-24">
        <div
          className="absolute inset-0 bg-black/50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
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
            External Staircases<br />Shot Blasting
          </h1>
          <p className="text-xl text-white/90 mb-6 max-w-2xl">
            On-site shot blasting of external steel staircases — rust, old paint, and contamination removed to Sa 2.5 near-white metal standard. We come to you, anywhere in England and Wales.
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "Sa 2.5", label: "Surface Standard" },
              { value: "Rz 50–75μm", label: "Anchor Profile" },
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
                  About This Service
                </h2>
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
                  See Our Work
                </h2>
                <p className="text-gray-600 mb-8">
                  Watch our team shot blasting external staircases on-site. The videos show the blasting process in action and the dramatic surface transformation achieved.
                </p>

                <div className="space-y-12">

                  {/* Video 1 */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#2C5F7F] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>External Staircase — Shot Blasting in Action</h3>
                        <p className="text-gray-500 text-sm mt-0.5">On-site mobile blasting — rust and old paint stripped back to bare metal</p>
                      </div>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-xl bg-black">
                      <video
                        controls
                        preload="metadata"
                        className="w-full max-h-[520px] object-contain"
                        aria-label="Video showing external staircase shot blasting in action"
                      >
                        <source src={videos.v1} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      Our mobile blasting unit in action on an external steel staircase. The video clearly shows the transformation as rust and old paint are stripped back to clean bare metal in real time.
                    </p>
                  </div>

                  {/* Video 2 */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#2C5F7F] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>External Staircase — Surface Transformation</h3>
                        <p className="text-gray-500 text-sm mt-0.5">Sa 2.5 near-white metal finish achieved — ready for immediate priming</p>
                      </div>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-xl bg-black">
                      <video
                        controls
                        preload="metadata"
                        className="w-full max-h-[520px] object-contain"
                        aria-label="Video showing external staircase surface after shot blasting"
                      >
                        <source src={videos.v2} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      The finished result — a clean, uniform Sa 2.5 surface across the entire staircase structure, ready for the client's chosen coating system. The characteristic white-grey appearance confirms near-white metal standard has been achieved.
                    </p>
                  </div>

                </div>
              </div>

              {/* Process Steps */}
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Our Process
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
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <button
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                        onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                        aria-expanded={expandedFaq === i}
                      >
                        <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                        {expandedFaq === i
                          ? <ChevronUp className="w-5 h-5 text-[#2C5F7F] flex-shrink-0" />
                          : <ChevronDown className="w-5 h-5 text-[#2C5F7F] flex-shrink-0" />
                        }
                      </button>
                      {expandedFaq === i && (
                        <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                          {faq.answer}
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
                      { label: "Anchor Profile", value: "Rz 50–75 μm" },
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
