import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuotePopup } from "@/components/QuotePopup";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Phone, Shield, Clock, Award, ChevronDown, ChevronUp, Flame } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useState } from "react";

// ── CDN asset paths ────────────────────────────────────────────────────────────
const IMG = {
  hero:    "/manus-storage/intumescentpaint_28bdf742.jpeg",
  spray1:  "/manus-storage/intumescentpaint2_f0c5c71c.jpeg",
  wide:    "/manus-storage/intumescentpaint3_09021db4.jpeg",
  spray2:  "/manus-storage/intumescentpaint4_f06b7186.jpeg",
  roller:  "/manus-storage/intumescentpaint5_88a00fbb.jpeg",
  aerial:  "/manus-storage/intumescentpaint6_3b61d3bc.jpeg",
  before:  "/manus-storage/WhatsAppImage2026-07-03at10.26.46_09230ac7.jpeg",
};
const VIDEO = "/manus-storage/intumescentpaint_cbe14861.mp4";

// ── JSON-LD rich schema graph ─────────────────────────────────────────────────
const JSONLD_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://commercialshotblasting.co.uk/services/intumescent-painting#service",
      "name": "Intumescent Painting for Structural Steel",
      "alternateName": [
        "Intumescent Coating Contractors UK",
        "Structural Steel Fire Protection Painting",
        "On-Site Intumescent Paint Application",
        "Steel Fire Protection Coating UK",
        "Intumescent Paint Contractors England Wales"
      ],
      "description": "On-site application of certified intumescent coatings to structural steel following shot blasting to Sa 2.5. We provide R30–R120 fire resistance ratings with full DFT documentation for building control across England and Wales.",
      "url": "https://commercialshotblasting.co.uk/services/intumescent-painting",
      "serviceType": "Intumescent Painting",
      "category": "Fire Protection Coatings",
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
        "name": "Intumescent Painting Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Structural Steel Intumescent Coating R30–R120" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Shot Blast and Intumescent Paint Package" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "On-Site Intumescent Spray Application" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "DFT Documentation for Building Control" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Intumescent Painting New Build Structural Steel" } }
        ]
      }
    },
    {
      "@type": "VideoObject",
      "@id": "https://commercialshotblasting.co.uk/services/intumescent-painting#video",
      "name": "Intumescent Painting Structural Steel — HB Tunnelling, Doncaster",
      "description": "Watch our operatives applying intumescent fire protection coating to structural steelwork at the HB Tunnelling project in Doncaster, South Yorkshire. Shot blasted to Sa 2.5 then spray-applied with certified intumescent paint from a MEWP.",
      "thumbnailUrl": "https://commercialshotblasting.co.uk/manus-storage/intumescentpaint_28bdf742.jpeg",
      "contentUrl": "https://commercialshotblasting.co.uk/manus-storage/intumescentpaint_cbe14861.mp4",
      "uploadDate": "2026-07-03",
      "duration": "PT1M",
      "publisher": {
        "@type": "Organization",
        "name": "Commercial Shot Blasting",
        "url": "https://commercialshotblasting.co.uk"
      },
      "keywords": "intumescent painting structural steel, fire protection coating, intumescent paint contractors UK"
    },
    {
      "@type": "FAQPage",
      "@id": "https://commercialshotblasting.co.uk/services/intumescent-painting#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What fire resistance ratings can you achieve with intumescent paint?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We can achieve R30, R60, R90, and R120 fire resistance ratings depending on the steel section size, DFT (dry film thickness) applied, and the product specification. All ratings are calculated to BS EN 13381-8 using manufacturer-approved DFT schedules."
          }
        },
        {
          "@type": "Question",
          "name": "Do you shot blast before applying intumescent paint?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — all intumescent coatings require a clean, profiled substrate to achieve the specified adhesion. We shot blast the steelwork to Sa 2.5 near-white metal standard before applying primer and intumescent topcoat. This is a single-mobilisation package: blast and paint in one visit."
          }
        },
        {
          "@type": "Question",
          "name": "Can you apply intumescent paint on-site to existing structures?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We work on new-build structural steel and on existing structures that require upgrading to current fire regulations. Our mobile MEWP-mounted equipment allows us to reach all sections of complex roof trusses, portal frames, and mezzanine steelwork without the need for scaffolding in most cases."
          }
        },
        {
          "@type": "Question",
          "name": "What documentation do you provide for building control?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We provide a full DFT (dry film thickness) inspection report, product data sheets, application records, and a certificate of conformance. This documentation package is accepted by building control officers and structural engineers as evidence of compliance with BS 476 and BS EN 13381."
          }
        },
        {
          "@type": "Question",
          "name": "How long does intumescent paint take to dry before other trades can work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Drying times depend on the product, DFT, and ambient conditions. Typically, water-based intumescent coatings are touch-dry within 2–4 hours and fully cured within 24–48 hours. We coordinate with the principal contractor to minimise programme impact and can apply in sections to keep other trades moving."
          }
        },
        {
          "@type": "Question",
          "name": "What types of steel structures do you coat with intumescent paint?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We coat portal frames, roof trusses, mezzanine floors, staircases, columns, beams, purlins, and complex fabrications. We work on new-build commercial and industrial units, warehouse conversions, extensions, and refurbishment projects across England and Wales."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://commercialshotblasting.co.uk/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://commercialshotblasting.co.uk/services" },
        { "@type": "ListItem", "position": 3, "name": "Intumescent Painting", "item": "https://commercialshotblasting.co.uk/services/intumescent-painting" }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://commercialshotblasting.co.uk/services/intumescent-painting",
      "url": "https://commercialshotblasting.co.uk/services/intumescent-painting",
      "name": "Intumescent Painting for Structural Steel | Commercial Shot Blasting",
      "description": "On-site intumescent painting for structural steel across England and Wales. Shot blast to Sa 2.5 and certified fire protection coatings in one mobilisation. R30–R120 ratings with full DFT documentation.",
      "inLanguage": "en-GB",
      "isPartOf": { "@type": "WebSite", "url": "https://commercialshotblasting.co.uk" },
      "about": { "@id": "https://commercialshotblasting.co.uk/services/intumescent-painting#service" },
      "breadcrumb": { "@id": "https://commercialshotblasting.co.uk/services/intumescent-painting#breadcrumb" }
    }
  ]
};

const FAQS = [
  {
    q: "What fire resistance ratings can you achieve with intumescent paint?",
    a: "We can achieve R30, R60, R90, and R120 fire resistance ratings depending on the steel section size, DFT (dry film thickness) applied, and the product specification. All ratings are calculated to BS EN 13381-8 using manufacturer-approved DFT schedules."
  },
  {
    q: "Do you shot blast before applying intumescent paint?",
    a: "Yes — all intumescent coatings require a clean, profiled substrate to achieve the specified adhesion. We shot blast the steelwork to Sa 2.5 near-white metal standard before applying primer and intumescent topcoat. This is a single-mobilisation package: blast and paint in one visit."
  },
  {
    q: "Can you apply intumescent paint on-site to existing structures?",
    a: "Yes. We work on new-build structural steel and on existing structures that require upgrading to current fire regulations. Our mobile MEWP-mounted equipment allows us to reach all sections of complex roof trusses, portal frames, and mezzanine steelwork without the need for scaffolding in most cases."
  },
  {
    q: "What documentation do you provide for building control?",
    a: "We provide a full DFT (dry film thickness) inspection report, product data sheets, application records, and a certificate of conformance. This documentation package is accepted by building control officers and structural engineers as evidence of compliance with BS 476 and BS EN 13381."
  },
  {
    q: "How long does intumescent paint take to dry before other trades can work?",
    a: "Drying times depend on the product, DFT, and ambient conditions. Typically, water-based intumescent coatings are touch-dry within 2–4 hours and fully cured within 24–48 hours. We coordinate with the principal contractor to minimise programme impact and can apply in sections to keep other trades moving."
  },
  {
    q: "What types of steel structures do you coat with intumescent paint?",
    a: "We coat portal frames, roof trusses, mezzanine floors, staircases, columns, beams, purlins, and complex fabrications. We work on new-build commercial and industrial units, warehouse conversions, extensions, and refurbishment projects across England and Wales."
  }
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-[#2C5F7F] text-sm sm:text-base">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-[#2C5F7F] flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#2C5F7F] flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-6 pb-5 pt-1 bg-white text-gray-600 text-sm leading-relaxed border-t border-gray-100">
          {a}
        </div>
      )}
    </div>
  );
}

export default function IntumescentPaintingPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  useSEO({
    title: "Intumescent Painting for Structural Steel | Commercial Shot Blasting",
    description: "On-site intumescent painting for structural steel across England and Wales. Shot blast to Sa 2.5 and certified fire protection coatings in one mobilisation. R30–R120 ratings with full DFT documentation for building control.",
    canonical: "https://commercialshotblasting.co.uk/services/intumescent-painting",
    image: "https://commercialshotblasting.co.uk/manus-storage/intumescentpaint_28bdf742.jpeg",
  });

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_GRAPH) }}
      />
      <Header />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[520px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMG.hero}
            alt="Operative on MEWP spray-applying intumescent fire protection paint to structural steel roof trusses at HB Tunnelling, Doncaster"
            className="w-full h-full object-cover"
            width="1600"
            height="900"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d2233]/95 via-[#0d2233]/70 to-[#0d2233]/30" />
        </div>
        <div className="relative container">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Intumescent Painting", href: "/services/intumescent-painting", isCurrentPage: true }
          ]} />
          <div className="mt-4 max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange-300 mb-3">
              <Flame className="w-4 h-4" /> Fire Protection Coatings
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Intumescent Painting for Structural Steel
            </h1>
            <p className="mt-4 text-lg text-white/85 max-w-2xl">
              On-site shot blasting and certified intumescent fire protection coatings in a single mobilisation. R30–R120 ratings with full DFT documentation for building control — anywhere in England and Wales.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button
                onClick={() => setQuoteOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3 text-base rounded-lg shadow-lg"
              >
                Request a Quote
              </Button>
              <a href="tel:07970566409" className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-7 py-3 text-base rounded-lg border border-white/30 transition-colors">
                <Phone className="w-4 h-4" /> 07970 566409
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ─────────────────────────────────────────────────────── */}
      <section className="bg-[#2C5F7F] py-4">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-white text-sm font-medium">
            {[
              { icon: <Shield className="w-4 h-4" />, text: "R30–R120 Fire Ratings" },
              { icon: <Award className="w-4 h-4" />, text: "BS EN 13381-8 Compliant" },
              { icon: <CheckCircle className="w-4 h-4" />, text: "Full DFT Documentation" },
              { icon: <Clock className="w-4 h-4" />, text: "Single Mobilisation" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                {icon}
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro ─────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#2C5F7F] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                Shot Blast & Intumescent Paint — One Team, One Visit
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Intumescent paint is a passive fire protection coating that expands when exposed to heat, forming a thick char layer that insulates the steel and delays structural failure. Building regulations require structural steel to achieve a minimum fire resistance period — typically R30, R60, or R90 — and intumescent paint is the most practical method for achieving this on site.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                The coating only performs correctly when applied to a properly prepared substrate. That is why we provide shot blasting and intumescent painting as a combined service: we blast the steelwork to Sa 2.5 near-white metal, apply the specified primer, and then spray-apply the intumescent topcoat — all in a single mobilisation. This eliminates the coordination risk between separate contractors and ensures the coating system is applied in the correct sequence.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We work on new-build commercial and industrial units, warehouse conversions, mezzanine extensions, and portal frame buildings across England and Wales. Our operatives are trained and certificated, and we provide a full DFT documentation package for building control sign-off.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={IMG.spray1}
                alt="Operative spray-applying intumescent fire protection paint to structural steel beams from a MEWP platform — Doncaster project"
                className="w-full h-80 object-cover"
                width="600"
                height="320"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Project Video ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#f5f8fa]">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-bold text-[#2C5F7F] mb-3 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            HB Tunnelling Project — Doncaster, South Yorkshire
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Structural steel shot blasting and intumescent painting for HB Tunnelling at their Doncaster facility. The full roof truss structure was blasted to Sa 2.5 and spray-coated with certified intumescent paint from scissor lifts and boom MEWPs.
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <video
                src={VIDEO}
                controls
                muted
                playsInline
                preload="metadata"
                className="w-full aspect-video object-cover bg-black"
                aria-label="Video showing intumescent paint being spray-applied to structural steel roof trusses at HB Tunnelling, Doncaster"
              />
              <div className="bg-[#2C5F7F] px-4 py-2 text-white text-xs font-medium">
                HB Tunnelling — Intumescent Painting, Doncaster
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={IMG.wide}
                alt="Wide view of structural steel roof truss framework at HB Tunnelling Doncaster — scissor lift in position for intumescent painting"
                className="w-full aspect-video object-cover"
                width="600"
                height="338"
                loading="lazy"
              />
              <div className="bg-[#2C5F7F] px-4 py-2 text-white text-xs font-medium">
                Roof Truss Framework — Before Coating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Photo Gallery ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-bold text-[#2C5F7F] mb-3 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Project Gallery
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-xl mx-auto">
            Images from the HB Tunnelling intumescent painting project in Doncaster — shot blasting and fire protection coating of a large structural steel roof truss system.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { src: IMG.before, alt: "Structural steel roof truss framework at HB Tunnelling Doncaster — wide view showing scissor lift and full extent of steelwork before intumescent coating" },
              { src: IMG.spray2, alt: "Operative on boom MEWP spray-applying intumescent fire protection paint to structural steel beams — Doncaster" },
              { src: IMG.roller, alt: "Close-up of operative applying intumescent paint to steel beam from scissor lift platform — HB Tunnelling project" },
              { src: IMG.aerial, alt: "Aerial view of structural steel roof truss system after intumescent painting — grey coated steelwork against blue sky, Doncaster" },
              { src: IMG.hero, alt: "Operative on MEWP applying intumescent coating to steel roof structure — fire protection painting in progress at HB Tunnelling" },
              { src: IMG.spray1, alt: "Spray application of intumescent paint to structural steel beam from MEWP — certified fire protection coating, Doncaster South Yorkshire" },
            ].map(({ src, alt }, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-md aspect-[4/3]">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  width="400"
                  height="300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Apply ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#f5f8fa]">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-bold text-[#2C5F7F] mb-3 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            What Structures We Coat
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-xl mx-auto">
            We apply intumescent paint to all types of structural steelwork on commercial and industrial projects.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Portal Frames", desc: "New-build and refurbished portal frame buildings — columns, rafters, and haunch connections." },
              { title: "Roof Trusses", desc: "Complex truss systems including lattice, bowstring, and Pratt configurations at height." },
              { title: "Mezzanine Floors", desc: "Mezzanine steel structures in warehouses and industrial units requiring fire rating upgrades." },
              { title: "Columns & Beams", desc: "Individual structural members in commercial buildings, extensions, and conversions." },
              { title: "Staircases", desc: "Internal and external steel staircases requiring intumescent protection for building control." },
              { title: "Purlins & Cladding Rails", desc: "Secondary steelwork elements where fire rating is specified by the structural engineer." },
            ].map(({ title, desc }) => (
              <Card key={title} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#2C5F7F] mb-1">{title}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#2C5F7F] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                How the Process Works
              </h2>
              <div className="space-y-6">
                {[
                  { n: "1", title: "Specification review", desc: "We review the structural engineer's fire rating schedule and the coating manufacturer's DFT requirements to confirm the correct product and application thickness for each section size." },
                  { n: "2", title: "Shot blasting to Sa 2.5", desc: "All steelwork is blasted to Sa 2.5 near-white metal standard, creating the surface profile required for the primer and intumescent topcoat to bond correctly." },
                  { n: "3", title: "Primer application", desc: "A compatible primer is applied to the blasted surface to provide corrosion protection and a stable base for the intumescent coating." },
                  { n: "4", title: "Intumescent topcoat", desc: "The intumescent paint is spray-applied in the specified number of coats to achieve the required DFT. We work from MEWPs to access all sections of the structure." },
                  { n: "5", title: "DFT inspection & documentation", desc: "Dry film thickness is measured and recorded across the structure. We provide a full documentation package including DFT report, product data sheets, and certificate of conformance for building control." },
                ].map(({ n, title, desc }) => (
                  <div key={n} className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#2C5F7F] text-white font-bold text-sm flex items-center justify-center flex-shrink-0">{n}</div>
                    <div>
                      <p className="font-semibold text-[#2C5F7F] mb-1">{title}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={IMG.aerial}
                  alt="Completed intumescent painting on structural steel roof trusses — grey fire protection coating applied to full roof structure, Doncaster"
                  className="w-full h-64 object-cover"
                  width="600"
                  height="256"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={IMG.spray2}
                  alt="Operative spray-applying intumescent fire protection paint from boom MEWP to structural steel beams — HB Tunnelling Doncaster"
                  className="w-full h-48 object-cover"
                  width="600"
                  height="192"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#2C5F7F]">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Need Intumescent Painting for Your Project?
          </h2>
          <p className="text-white/80 mb-8 text-lg max-w-2xl mx-auto">
            We provide a combined shot blast and intumescent paint service for structural steel across England and Wales. Send us your fire rating schedule and we will provide a fixed-price quotation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => setQuoteOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 text-base rounded-lg shadow-lg"
            >
              Request a Free Quote
            </Button>
            <a href="tel:07970566409" className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-8 py-3 text-base rounded-lg border border-white/30 transition-colors">
              <Phone className="w-4 h-4" /> 07970 566409
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-[#2C5F7F] mb-3 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-center mb-10">
            Common questions about intumescent painting for structural steel.
          </p>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Services ──────────────────────────────────────────────── */}
      <section className="py-16 bg-[#f5f8fa]">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-bold text-[#2C5F7F] mb-3 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Related Services
          </h2>
          <p className="text-gray-600 text-center mb-10">
            Intumescent painting is often combined with these services.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                href: "/services/structural-steel-frames",
                img: "/manus-storage/intumescentpaint3_09021db4.jpeg",
                title: "Structural Steel Shot Blasting",
                desc: "Shot blasting portal frames, roof trusses, and structural steelwork to Sa 2.5 — the required substrate for intumescent coatings.",
              },
              {
                href: "/services/staircases",
                img: "/manus-storage/staircase_thumb_d419ab8f.jpg",
                title: "External Staircases",
                desc: "Shot blasting and intumescent painting of internal and external steel staircases for fire compliance.",
              },
              {
                href: "/services/fire-escapes",
                img: "/manus-storage/fireescape1before_b56bfae9.jpg",
                title: "Fire Escape Shot Blasting",
                desc: "On-site shot blasting of fire escapes and emergency stairways — combined with intumescent painting where required.",
              },
            ].map(({ href, img, title, desc }) => (
              <Link key={href} href={href} className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width="400"
                    height="225"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-[#2C5F7F] mb-1 group-hover:underline">{title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-[#2C5F7F] font-medium mt-3">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <QuotePopup open={quoteOpen} onOpenChange={setQuoteOpen} />
    </div>
  );
}
