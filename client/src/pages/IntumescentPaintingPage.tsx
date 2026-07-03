import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuotePopup } from "@/components/QuotePopup";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Phone, Shield, Clock, Award, ChevronDown, ChevronUp, Flame } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useState, useEffect } from "react";

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
          "name": "Do you shot blast before applying intumescent paint?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — all intumescent coatings require a clean, profiled substrate to achieve the specified adhesion. We shot blast the steelwork to Sa 2.5 near-white metal standard before applying primer and intumescent topcoat. This is a single-mobilisation package: blast and paint in one visit."
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
    q: "Do you shot blast before applying intumescent paint?",
    a: "Yes — all intumescent coatings require a clean, profiled substrate to achieve the specified adhesion. We shot blast the steelwork to Sa 2.5 near-white metal standard before applying primer and intumescent topcoat. This is a single-mobilisation package: blast and paint in one visit."
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
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!lightboxImg) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImg(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxImg]);

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
              { icon: <Shield className="w-4 h-4" />, text: "Sa 2.5 Surface Preparation" },
              { icon: <Flame className="w-4 h-4" />, text: "Blasting & Painting on the Same Day" },
              { icon: <Clock className="w-4 h-4" />, text: "Single Mobilisation" },
              { icon: <Award className="w-4 h-4" />, text: "England & Wales Coverage" },
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
                Blasted and Painted on the Same Day — Two Teams, One Mobilisation.
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We bring two specialist teams to site on the same day — one shot blasting the steelwork to Sa 2.5 near-white metal standard, the other following directly behind applying primer and intumescent topcoat. As one section of steel is blasted clean, the painting team moves in immediately. By the time we pack up and leave, the entire structure is blasted, primed, and coated.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                This is not the same as booking two separate contractors. Because both teams are ours, they work in sequence, not in conflict. There is no handover gap, no risk of flash rusting between blast and paint, and no dispute over substrate condition. The coating is applied to the correct surface in the correct window — every time.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We work on portal frames, roof trusses, mezzanine floors, and complex fabrications across England and Wales. One mobilisation, one invoice, one point of contact.
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

      {/* ── End-to-End Delivery ──────────────────────────────────────────── */}
      <section className="py-14 bg-orange-50 border-y border-orange-100">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-orange-600 mb-3">End-to-End Project Delivery</span>
            <h2 className="text-3xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>
              How We Blast and Paint Your Steel in a Single Visit
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Two teams, working in parallel on the same structure. No waiting for a second contractor. No gap between blast and paint.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[calc(50%-1px)] w-0.5 h-[calc(100%-4rem)] bg-orange-200" />

            <div className="space-y-8">
              {[
                {
                  time: "Morning",
                  team: "Blasting Team",
                  teamColor: "bg-[#2C5F7F] text-white",
                  icon: <Shield className="w-5 h-5" />,
                  title: "Shot Blasting Begins",
                  desc: "The blasting team mobilises with portable blast equipment and MEWPs. They work systematically through the structure, blasting each section to Sa 2.5 near-white metal standard and creating the Rz anchor profile required for coating adhesion.",
                  side: "left",
                },
                {
                  time: "Same Morning",
                  team: "Painting Team",
                  teamColor: "bg-orange-500 text-white",
                  icon: <Flame className="w-5 h-5" />,
                  title: "Painting Team Follows Behind",
                  desc: "As each section is blasted clean, the painting team moves in immediately — applying primer and intumescent topcoat before flash rust can form. Both teams are on site simultaneously, working in coordinated sequence across the structure.",
                  side: "right",
                },
                {
                  time: "Afternoon",
                  team: "Both Teams",
                  teamColor: "bg-[#2C5F7F] text-white",
                  icon: <CheckCircle className="w-5 h-5" />,
                  title: "Structure Fully Coated",
                  desc: "By end of day, the entire structure is blasted, primed, and coated. No second visit required. No waiting for a separate painting contractor to be available. The principal contractor can hand over the programme without a gap.",
                  side: "left",
                },
                {
                  time: "Sign-Off",
                  team: "Documentation",
                  teamColor: "bg-gray-700 text-white",
                  icon: <Award className="w-5 h-5" />,
                  title: "One Invoice. One Package.",
                  desc: "We issue a single invoice covering both operations. Documentation — including DFT records, product data sheets, and certificate of conformance — is provided as a single package for building control. One point of contact throughout.",
                  side: "right",
                },
              ].map(({ time, team, teamColor, icon, title, desc, side }) => (
                <div key={title} className={`md:grid md:grid-cols-2 md:gap-12 flex flex-col gap-4`}>
                  {/* Left column content */}
                  <div className={`${side === 'right' ? 'md:col-start-2' : 'md:col-start-1'} bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full ${teamColor} flex items-center justify-center flex-shrink-0`}>
                        {icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{time}</span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${teamColor}`}>{team}</span>
                        </div>
                        <p className="font-bold text-[#2C5F7F] text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </div>
                  {/* Spacer for opposite column */}
                  <div className={`hidden md:block ${side === 'right' ? 'md:col-start-1 md:row-start-auto' : ''}`} style={{ gridRow: 'auto' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-12 bg-[#2C5F7F] rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 text-center sm:text-left">
              <p className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Ready to book both teams for your project?</p>
              <p className="text-white/75 text-sm mt-1">Tell us the structure, the location, and the programme date — we'll confirm availability and price for the combined service.</p>
            </div>
            <Button
              onClick={() => setQuoteOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 text-base rounded-lg shadow-lg flex-shrink-0"
            >
              Request a Quote
            </Button>
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
              <button
                key={i}
                className="rounded-xl overflow-hidden shadow-md aspect-[4/3] cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-[#2C5F7F] focus:ring-offset-2 group"
                onClick={() => setLightboxImg({ src, alt })}
                aria-label={`Enlarge image: ${alt}`}
              >
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  width="400"
                  height="300"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sa 2.5 Callout ────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#0d2233]">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-orange-300 mb-3">Why Surface Preparation Matters</span>
              <h2 className="text-3xl font-bold text-white mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                What Happens If Steel Isn't Blasted First?
              </h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Intumescent paint applied over mill scale, rust, or contaminated steel will not bond correctly to the substrate. When the coating is exposed to heat, it needs to expand uniformly — but if adhesion is poor, the char layer delaminates rather than insulating the steel. The result is a coating that fails at the moment it is needed most.
              </p>
              <p className="text-white/80 leading-relaxed mb-4">
                Shot blasting to <strong className="text-white">Sa 2.5 near-white metal standard</strong> removes all mill scale, rust, and surface contamination and creates a mechanical anchor profile in the steel surface. This profile — typically Rz 50–75 μm — gives the primer and intumescent topcoat a surface to key into, ensuring the coating system performs as specified.
              </p>
              <p className="text-white/80 leading-relaxed">
                This is why we provide shot blasting and intumescent painting as a single combined service. Using the same contractor for both operations eliminates the risk of flash rusting or contamination between trades, and ensures the coating is applied to the correct substrate in the correct sequence.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: <Shield className="w-5 h-5 text-orange-400" />, title: "Sa 2.5 Near-White Metal", body: "The internationally recognised standard for surface cleanliness before protective coating application. All visible mill scale, rust, and coatings are removed." },
                { icon: <CheckCircle className="w-5 h-5 text-orange-400" />, title: "Rz 50–75 μm Anchor Profile", body: "Shot blasting creates a mechanical surface profile that primer and intumescent topcoat can bond to — without this profile, coatings are prone to delamination." },
                { icon: <Award className="w-5 h-5 text-orange-400" />, title: "Single Contractor, Zero Handover Risk", body: "We blast and paint in one visit. No gap between trades means no flash rust, no contamination, and no dispute over substrate condition." },
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

      {/* Further Reading */}
      <section className="py-12 bg-[#f5f0e8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Further Reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog/intumescent-painting-structural-steel" className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
              <img
                src="/manus-storage/intumescentpaint6_9c8f5a2b.jpeg"
                alt="Intumescent painting applied to structural steel roof trusses — fire protection coating after shot blasting to Sa 2.5"
                className="w-full h-44 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <span className="text-xs font-semibold text-[#C17F3B] uppercase tracking-wide">Technical Guide</span>
                <h3 className="mt-1 text-base font-bold text-[#2C5F7F] group-hover:underline leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Intumescent Painting for Structural Steel: The Complete UK Guide
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  DFT requirements, section factors, fire ratings R30 to R120, and why shot blasting to Sa 2.5 is essential before application.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#2C5F7F] group-hover:gap-2 transition-all">
                  Read the guide <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
            <Link href="/blog/flash-rust-after-shot-blasting" className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
              <img
                src="/manus-storage/staircase_after1_2dc6ad73.jpg"
                alt="Clean Sa 2.5 near-white metal surface immediately after shot blasting — must be primed within 2–4 hours to prevent flash rust"
                className="w-full h-44 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <span className="text-xs font-semibold text-[#C17F3B] uppercase tracking-wide">Technical Guide</span>
                <h3 className="mt-1 text-base font-bold text-[#2C5F7F] group-hover:underline leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Flash Rust After Shot Blasting: Why You Must Prime Within 2–4 Hours
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  What flash rust is, why it forms so quickly on freshly blasted steel, and how to prevent it from undermining your coating system.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#2C5F7F] group-hover:gap-2 transition-all">
                  Read the guide <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
            <Link href="/steel-fabrications" className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
              <img
                src="/manus-storage/SteelFabrications1before_090ae51a.jpg"
                alt="Steel fabrication before shot blasting — mill scale and rust on fabricated steel structure ready for intumescent painting"
                className="w-full h-44 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <span className="text-xs font-semibold text-[#C17F3B] uppercase tracking-wide">Service</span>
                <h3 className="mt-1 text-base font-bold text-[#2C5F7F] group-hover:underline leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Shot Blasting Steel Fabrications
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  Mobile shot blasting for fabricated steel structures, removing mill scale and rust to Sa 2.5 standard — ready for primer and intumescent coating.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#2C5F7F] group-hover:gap-2 transition-all">
                  View service <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <QuotePopup open={quoteOpen} onOpenChange={setQuoteOpen} />

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl leading-none font-light focus:outline-none"
            onClick={() => setLightboxImg(null)}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <img
            src={lightboxImg.src}
            alt={lightboxImg.alt}
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
