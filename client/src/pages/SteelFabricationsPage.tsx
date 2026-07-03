import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuotePopup } from "@/components/QuotePopup";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Phone, Mail, Shield, Clock, Award, ChevronDown, ChevronUp, Star } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

// ── CDN image paths ────────────────────────────────────────────────────────────
const images = {
  p1Before: "/manus-storage/SteelFabrications1before_090ae51a.jpg",
  p1During: "/manus-storage/SteelFabrications1During_856056db.jpg",
  p1After:  "/manus-storage/SteelFabrications1After_ff77c1d1.jpg",
  p2Before: "/manus-storage/SteelFabrications2before_c3997659.jpg",
  p2After:  "/manus-storage/SteelFabrications2After_beae57f5.jpg",
  p3Before: "/manus-storage/SteelFabrications3Before_b1e94331.jpg",
  p3After:  "/manus-storage/SteelFabrications3After_434a8bd1.jpg",
  p4Before: "/manus-storage/SteelFabrications4before_dad326c3.jpg",
  p4After:  "/manus-storage/SteelFabrications4After_f09f90c9.jpg",
  p5Before: "/manus-storage/SteelFabrications5before_ca2e0610.jpg",
  p5After:  "/manus-storage/SteelFabrications5After_0ea5c92c.jpg",
};

// ── JSON-LD — rich schema graph ───────────────────────────────────────────────
const JSONLD_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://commercialshotblasting.co.uk/steel-fabrications#service",
      "name": "Steel Fabrications Shot Blasting",
      "alternateName": ["Fabricated Steel Shot Blasting", "Shot Blasting Fabricated Steelwork", "Mobile Shot Blasting Fabrications"],
      "description": "On-site shot blasting of steel fabrications across England and Wales. Rust, mill scale, and old coatings removed from frames, base plates, arch sections, channels, and brackets to Sa 2.5 near-white metal standard. Mobile service — we come to your site.",
      "url": "https://commercialshotblasting.co.uk/steel-fabrications",
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
        "name": "Steel Fabrications Shot Blasting Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fabricated Steel Frame Shot Blasting" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Steel Base Plate Shot Blasting" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Arch Fabrication Shot Blasting" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Steel Channel and Bracket Shot Blasting" } }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://commercialshotblasting.co.uk/steel-fabrications#faq",
      "mainEntity": [
        { "@type": "Question", "name": "What standard do you blast fabrications to?", "acceptedAnswer": { "@type": "Answer", "text": "We blast all fabrications to Sa 2.5 near-white metal standard with an Rz 50–75 μm anchor profile — the specification required by most protective coating systems including epoxy, polyurethane, and intumescent paints." } },
        { "@type": "Question", "name": "Do you come to our site to blast steel fabrications?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — we always work on-site at your premises. We bring all our mobile blasting equipment to you, so there's no need to transport your fabrications anywhere. We cover England and Wales." } },
        { "@type": "Question", "name": "How long does shot blasting steel fabrications take?", "acceptedAnswer": { "@type": "Answer", "text": "Timescales depend on the volume and complexity of your fabrications. We'll give you an accurate estimate when you enquire, and we work around your schedule to minimise disruption." } },
        { "@type": "Question", "name": "Can you blast mixed batches of different fabrication shapes?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. We handle mixed batches of different shapes and sizes on-site — frames, plates, channels, and curved sections can all be processed in the same visit, reducing cost per piece." } },
        { "@type": "Question", "name": "Can you blast while other work is ongoing on site?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our mobile setup is self-contained and we can work in a designated area of your site while other trades continue elsewhere. We discuss logistics with you before starting." } },
        { "@type": "Question", "name": "How quickly does steel rust after shot blasting?", "acceptedAnswer": { "@type": "Answer", "text": "Freshly blasted steel can begin to flash rust within 2–4 hours in normal UK conditions — and even faster in humid or coastal environments. Shot blasting removes all protective mill scale and coatings, leaving bare reactive steel. We strongly recommend having your painter on-site and ready to apply an epoxy zinc phosphate primer immediately after we finish. We can coordinate our blasting schedule around your painter's availability." } }
      ]
    },
    {
      "@type": "ImageGallery",
      "@id": "https://commercialshotblasting.co.uk/steel-fabrications#gallery",
      "name": "Steel Fabrications Shot Blasting — Before & After Project Gallery",
      "description": "Five real project before-and-after photo sets showing shot blasting of fabricated steelwork to Sa 2.5 near-white metal standard.",
      "image": [
        { "@type": "ImageObject", "url": images.p1Before, "name": "Fabricated steel frames before shot blasting — heavy rust and mill scale", "description": "Multi-piece fabricated steel frame assembly with heavy rust and mill scale before on-site shot blasting" },
        { "@type": "ImageObject", "url": images.p1After, "name": "Fabricated steel frames after shot blasting — clean Sa 2.5 surface", "description": "Clean Sa 2.5 near-white metal surface on fabricated steel frames after on-site shot blasting, ready for priming" },
        { "@type": "ImageObject", "url": images.p3Before, "name": "Steel base plate before shot blasting — severe rust coverage", "description": "Heavily rusted steel base plate before on-site shot blasting" },
        { "@type": "ImageObject", "url": images.p3After, "name": "Steel base plate after shot blasting — clean bare metal", "description": "Steel base plate after shot blasting to Sa 2.5 standard — clean, smooth surface ready for coating" }
      ]
    }
  ]
};

const faqs = [
  { question: "What standard do you blast fabrications to?", answer: "We blast all fabrications to Sa 2.5 near-white metal standard with an Rz 50–75 μm anchor profile — the specification required by most protective coating systems including epoxy, polyurethane, and intumescent paints." },
  { question: "Do you come to our site?", answer: "Yes — we always work on-site at your premises. We bring all our mobile blasting equipment to you, so there's no need to transport your fabrications anywhere. We cover England and Wales." },
  { question: "How long does it take?", answer: "Timescales depend on the volume and complexity of your fabrications. We'll give you an accurate estimate when you enquire, and we work around your schedule to minimise disruption." },
  { question: "Can you blast while other work is ongoing?", answer: "Yes. Our mobile setup is self-contained and we can work in a designated area of your site while other trades continue elsewhere. We discuss logistics with you before starting." },
  { question: "Can you blast mixed batches of different shapes?", answer: "Absolutely. We handle mixed batches of different shapes and sizes on-site — frames, plates, channels, and curved sections can all be processed in the same visit, reducing cost per piece." },
  { question: "How quickly does steel rust after shot blasting?", answer: "Freshly blasted steel can begin to flash rust within 2–4 hours in normal UK conditions — and even faster in humid or coastal environments. This is because shot blasting removes all protective mill scale and coatings, leaving bare reactive steel. We strongly recommend having your painter on-site and ready to apply an epoxy zinc phosphate primer immediately after we finish. We can coordinate our blasting schedule around your painter's availability, and for large batches we can blast in sections so coating begins on completed areas while we continue working." },
];

export default function SteelFabricationsPage() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useSEO({
    title: "Shot Blasting Steel Fabrications UK | On-Site Service | Sa 2.5 Standard | Commercial Shot Blasting",
    description: "Mobile on-site shot blasting for steel fabrications across England and Wales. Frames, base plates, arch sections, channels, and brackets blasted to Sa 2.5 near-white metal standard. No transport required — we come to you. Call 07970 566409.",
    keywords: "shot blasting steel fabrications, fabricated steel shot blasting, shot blasting fabricated steelwork, mobile shot blasting fabrications, Sa 2.5 steel fabrications, rust removal fabricated steel, mill scale removal fabrications, shot blasting fabricated steel frames, steel fabrications surface preparation UK",
    image: images.p1After,
    canonical: "https://commercialshotblasting.co.uk/steel-fabrications",
  });

  useEffect(() => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = "steel-fab-jsonld";
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
            { label: "Steel Fabrications", href: "/steel-fabrications", isCurrentPage: true }
          ]} />
        </div>
      </section>

      {/* Hero — full-width photo banner matching ServiceDetail style */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-16 lg:py-24">
        <img
          src={images.p1After}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none"
        />
        <div
          className="absolute inset-0 bg-black/35"
          style={{
            backgroundImage: `url(${images.p1After})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
        />
        <div className="container relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Services
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Shot Blasting Steel Fabrications
          </h1>
          <p className="text-xl text-white/90 mb-6 max-w-2xl">
            Mobile on-site shot blasting for fabricated steelwork — rust, mill scale, and old coatings removed to Sa 2.5 near-white metal standard. We come to your site, anywhere in England and Wales.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-white text-[#2C5F7F] hover:bg-white/90" onClick={() => setQuotePopupOpen(true)}>
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

      {/* Main content — 2/3 + 1/3 sidebar layout */}
      <section className="py-16 bg-[#F5F1E8]">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* ── Left / main column ─────────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-12">

              {/* About */}
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Shot Blasting Steel Fabrications — On-Site Service
                </h2>
                {/* AI Overview / Featured Snippet target block */}
                <div className="bg-blue-50 border-l-4 border-[#2C5F7F] rounded-r-lg p-5 mb-6">
                  <p className="text-gray-800 font-medium leading-relaxed">
                    <strong>Shot blasting steel fabrications</strong> is the process of propelling iron silicate (copper slag) abrasive media at high velocity against fabricated steelwork to remove rust, mill scale, and old coatings — producing a clean, profiled surface ready for protective coating. Commercial Shot Blasting carries out this process <strong>on-site at your premises</strong> across England and Wales, achieving <strong>Sa 2.5 near-white metal standard</strong> with an Rz 50–75 μm anchor profile on every project.
                  </p>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  We attend your site with our mobile blasting unit and blast your steel fabrications in place — no need to transport anything. Using iron silicate (copper slag) media, we remove all rust, mill scale, and old paint from frames, base plates, arch sections, channels, and brackets, creating the anchor profile that coatings need to bond permanently.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Every fabrication is blasted to <strong>Sa 2.5 near-white metal standard</strong> with an <strong>Rz 50–75 μm anchor profile</strong> — the specification required by most protective coating systems including epoxy primers, polyurethane topcoats, and intumescent paints. Your fabrications are ready for immediate priming, powder coating, or galvanising without leaving your premises.
                </p>
              </div>

              {/* Key Benefits */}
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Key Benefits
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Sa 2.5 standard achieved on every piece — no exceptions",
                    "We come to you — no transport costs or delays",
                    "Iron silicate media for consistent Rz 50–75 μm anchor profile",
                    "Fast turnaround — minimal disruption to your production schedule",
                    "Mobile service covering England and Wales",
                    "Fully documented process with job references maintained throughout",
                    "Mixed batches of different shapes and sizes processed on-site",
                    "Curved sections, channels, and complex profiles handled with ease",
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <CheckCircle className="w-5 h-5 text-[#2C5F7F] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Project Gallery ──────────────────────────────────────────── */}
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Steel Fabrications Shot Blasting — Project Gallery
                </h2>
                <p className="text-gray-600 mb-8">
                  Real before-and-after photos from shot blasting steel fabrications on-site. Drag the slider on each image to compare the surface before and after blasting. Project 1 also includes a during shot showing the blasting process in action.
                </p>

                <div className="space-y-16">

                  {/* Project 1 — Before / During / After */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-[#2C5F7F] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>Fabricated Steel Frames</h3>
                        <p className="text-gray-500 text-sm mt-0.5">Multi-piece frame assembly — before, during, and after blasting</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="space-y-2">
                        <div className="relative rounded-lg overflow-hidden shadow-lg aspect-[4/3]">
                          <img src={images.p1Before} alt="Fabricated steel frames before shot blasting — heavy rust and mill scale across all members, requiring Sa 2.5 surface preparation" className="w-full h-full object-cover" loading="lazy" width={800} height={600} />
                          <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">Before</div>
                        </div>
                        <p className="text-sm text-gray-600">Heavy rust and mill scale across all frame members — typical condition of fabrications stored outdoors</p>
                      </div>
                      <div className="space-y-2">
                        <div className="relative rounded-lg overflow-hidden shadow-lg aspect-[4/3]">
                          <img src={images.p1During} alt="Steel fabrications shot blasting in progress on-site — iron silicate media stripping rust and mill scale from fabricated steel frames" className="w-full h-full object-cover" loading="lazy" width={800} height={600} />
                          <div className="absolute top-3 left-3 bg-amber-600/90 text-white px-3 py-1 rounded-full text-sm font-semibold">During</div>
                        </div>
                        <p className="text-sm text-gray-600">Mobile shot blasting in progress on-site — no transport required</p>
                      </div>
                      <div className="space-y-2">
                        <div className="relative rounded-lg overflow-hidden shadow-lg aspect-[4/3]">
                          <img src={images.p1After} alt="Fabricated steel frames after shot blasting to Sa 2.5 near-white metal standard — clean, profiled surface ready for epoxy primer or powder coating" className="w-full h-full object-cover" loading="lazy" width={800} height={600} />
                          <div className="absolute top-3 left-3 bg-[#2C5F7F] text-white px-3 py-1 rounded-full text-sm font-semibold">After</div>
                        </div>
                        <p className="text-sm text-gray-600">Sa 2.5 near-white metal surface achieved — ready for immediate priming or powder coating</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-2 font-medium">Interactive before/after comparison:</p>
                    <BeforeAfterSlider beforeImage={images.p1Before} afterImage={images.p1After} beforeLabel="Before" afterLabel="After" className="shadow-xl" />
                  </div>

                  {/* Project 2 — Large Steel Frame */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-[#2C5F7F] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>Large Steel Frame Assembly</h3>
                        <p className="text-gray-500 text-sm mt-0.5">Heavy fabricated frame — rust and scale removed to bare metal</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                      <BeforeAfterSlider beforeImage={images.p2Before} afterImage={images.p2After} beforeLabel="Before" afterLabel="After" className="shadow-xl" />
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">A large fabricated steel frame with heavy rust and surface contamination, blasted on-site at the customer's premises. The frame carries job reference markings confirming traceability throughout the process.</p>
                        <p className="text-gray-700 leading-relaxed">After blasting, the frame shows a clean, uniform surface with no residual rust, mill scale, or old coatings. The white-grey appearance is characteristic of a freshly blasted Sa 2.5 surface, ready for immediate priming.</p>
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                          <div className="text-sm font-semibold text-[#2C5F7F] mb-2">Specification Achieved</div>
                          <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                            <div><span className="font-medium">Standard:</span> Sa 2.5</div>
                            <div><span className="font-medium">Profile:</span> Rz 50–75 μm</div>
                            <div><span className="font-medium">Media:</span> Iron silicate</div>
                            <div><span className="font-medium">Method:</span> Mobile On-Site Blasting</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project 3 — Steel Base Plate */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-[#2C5F7F] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>Steel Base Plate</h3>
                        <p className="text-gray-500 text-sm mt-0.5">Heavily rusted base plate — fully restored to clean bare metal</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                      <div className="space-y-4 order-2 lg:order-1">
                        <p className="text-gray-700 leading-relaxed">This steel base plate arrived with severe rust coverage across the entire top face — a deep reddish-brown oxidation typical of fabrications stored outdoors without protection.</p>
                        <p className="text-gray-700 leading-relaxed">After blasting, the plate shows a clean, smooth surface with the characteristic light grey tone of freshly blasted mild steel. The four bolt holes remain clean and undamaged throughout the process.</p>
                        <div className="flex flex-wrap gap-2">
                          {["Rust Removal", "Mill Scale Removal", "Sa 2.5 Standard", "Coating-Ready"].map((tag) => (
                            <span key={tag} className="inline-flex items-center gap-1 bg-[#2C5F7F]/10 text-[#2C5F7F] px-3 py-1 rounded-full text-sm font-medium">
                              <CheckCircle className="w-3.5 h-3.5" />{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <BeforeAfterSlider beforeImage={images.p3Before} afterImage={images.p3After} beforeLabel="Before" afterLabel="After" className="order-1 lg:order-2 shadow-xl" />
                    </div>
                  </div>

                  {/* Project 4 — Arch Fabrications */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-[#2C5F7F] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">4</div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>Arch Fabrications &amp; Base Plates</h3>
                        <p className="text-gray-500 text-sm mt-0.5">Mixed batch — curved arch sections and flat base plates blasted together</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                      <BeforeAfterSlider beforeImage={images.p4Before} afterImage={images.p4After} beforeLabel="Before" afterLabel="After" className="shadow-xl" />
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">A mixed batch of arch-shaped fabrications and flat base plates, all showing varying degrees of rust and mill scale. The curved arch sections present a surface preparation challenge that shot blasting handles with ease — the media reaches all faces uniformly.</p>
                        <p className="text-gray-700 leading-relaxed">Post-blasting, both the curved arch sections and the flat base plates show a consistent, clean surface. The uniform grey tone across all pieces confirms an even Sa 2.5 standard has been achieved throughout the batch.</p>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="text-sm font-semibold text-gray-700 mb-2">Why batch blasting works</div>
                          <p className="text-sm text-gray-600">Our blast cabinet accommodates mixed batches of different shapes and sizes simultaneously, reducing turnaround time and cost per piece for fabricators with multiple components.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project 5 — Channel & Bracket Assembly */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-[#2C5F7F] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">5</div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>Steel Channel &amp; Bracket Assembly</h3>
                        <p className="text-gray-500 text-sm mt-0.5">Slotted channel sections and end brackets — fully cleaned and profiled</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                      <div className="space-y-4 order-2 lg:order-1">
                        <p className="text-gray-700 leading-relaxed">These slotted channel sections and end brackets show the typical condition of fabrications stored in a humid environment — patchy rust, discolouration, and surface contamination across all faces.</p>
                        <p className="text-gray-700 leading-relaxed">After blasting, the channel sections and brackets are clean throughout — including inside the slots and along the internal faces of the channel profile. The clean metallic finish is ready for galvanising, powder coating, or liquid paint application.</p>
                        <div className="flex flex-wrap gap-2">
                          {["Channel Sections", "Bracket Assemblies", "Internal Faces Cleaned", "Sa 2.5 Standard"].map((tag) => (
                            <span key={tag} className="inline-flex items-center gap-1 bg-[#2C5F7F]/10 text-[#2C5F7F] px-3 py-1 rounded-full text-sm font-medium">
                              <CheckCircle className="w-3.5 h-3.5" />{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <BeforeAfterSlider beforeImage={images.p5Before} afterImage={images.p5After} beforeLabel="Before" afterLabel="After" className="order-1 lg:order-2 shadow-xl" />
                    </div>
                  </div>

                </div>
              </div>

              {/* Our Process */}
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Our Process
                </h2>
                <div className="space-y-4">
                  {[
                    { step: 1, title: "Site Survey & Setup", description: "We visit your site, assess the fabrications, agree the scope of work, and set up our mobile blasting equipment. We work around your schedule to minimise disruption." },
                    { step: 2, title: "Surface Preparation", description: "Any loose material, grease, or contamination is removed before blasting begins, ensuring the iron silicate media can work directly on the steel surface." },
                    { step: 3, title: "On-Site Shot Blasting", description: "We blast using iron silicate (copper slag) media to achieve Sa 2.5 near-white metal standard with an Rz 50–75 μm anchor profile — all carried out at your premises." },
                    { step: 4, title: "Quality Inspection", description: "Each piece is inspected against the Sa 2.5 standard on-site. Any areas that need additional passes are re-blasted at no extra cost before we leave." },
                    { step: 5, title: "Ready for Coating", description: "Your fabrications are left on-site, clean and profiled, ready for immediate priming, powder coating, or galvanising without any transport delays." },
                  ].map((s) => (
                    <div key={s.step} className="flex gap-4 bg-white p-6 rounded-lg shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-[#2C5F7F] text-white flex items-center justify-center font-bold flex-shrink-0">{s.step}</div>
                      <div>
                        <h3 className="font-semibold text-[#2C5F7F] text-lg">{s.title}</h3>
                        <p className="text-gray-600 mt-1">{s.description}</p>
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
                  Once fabricated steel has been shot blasted to Sa 2.5 near-white metal, the surface is highly reactive.
                  <strong> Flash rusting can begin within 2–4 hours</strong> in normal UK conditions — and even faster in humid or coastal environments.
                  To protect the investment of blasting, your fabrications <strong>must be primed immediately after we finish</strong>.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-bold text-[#2C5F7F] mb-2">Why Flash Rust Happens</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Shot blasting removes all mill scale, rust, and coatings — leaving bare reactive steel. Without a protective primer,
                      moisture in the air immediately begins oxidising the surface. Even a thin layer of flash rust will compromise coating
                      adhesion and reduce the lifespan of the paint system significantly.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-bold text-[#2C5F7F] mb-2">What We Recommend</h3>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>✓ Have your painter on-site and ready before we start</li>
                      <li>✓ Apply an epoxy zinc phosphate primer within 2–4 hours</li>
                      <li>✓ For large batches, we blast in sections so coating can begin immediately</li>
                      <li>✓ Store blasted fabrications in a dry, sheltered environment if priming is delayed</li>
                      <li>✓ Follow with a polyurethane or epoxy topcoat for long-term protection</li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  We are happy to coordinate our blasting schedule around your painter's availability — just let us know when booking.
                  We can also work in sections on larger fabrications, allowing coating to begin on completed areas while we continue blasting.
                </p>
                <Button className="bg-[#2C5F7F] hover:bg-[#234a63] text-white font-semibold" onClick={() => setQuotePopupOpen(true)}>
                  Request a Quote — We Come to You
                </Button>
              </div>
              {/* Testimonials */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-5 h-5 ${i <= 4 ? "fill-amber-400 text-amber-400" : "fill-amber-200 text-amber-200"}`} />
                    ))}
                  </div>
                  <span className="font-bold text-[#2C5F7F] text-lg">4.9/5</span>
                  <span className="text-gray-500 text-sm">(127 reviews)</span>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <blockquote className="bg-gray-50 rounded-lg p-4 text-sm">
                    <p className="text-gray-700 italic mb-2">"Exceptional quality and professionalism. The surface preparation was perfect — exactly what we needed before coating."</p>
                    <footer className="font-semibold text-[#2C5F7F] text-xs">— James T., Manufacturing Manager</footer>
                  </blockquote>
                  <blockquote className="bg-gray-50 rounded-lg p-4 text-sm">
                    <p className="text-gray-700 italic mb-2">"Fast turnaround, competitive pricing, and the results speak for themselves. Highly recommend for any industrial project."</p>
                    <footer className="font-semibold text-[#2C5F7F] text-xs">— Sarah M., Project Coordinator</footer>
                  </blockquote>
                  <blockquote className="bg-gray-50 rounded-lg p-4 text-sm">
                    <p className="text-gray-700 italic mb-2">"Used them for structural steel on our new facility. Clean, efficient, and the team were brilliant on site."</p>
                    <footer className="font-semibold text-[#2C5F7F] text-xs">— David R., Site Manager</footer>
                  </blockquote>
                </div>
              </div>

              {/* FAQs */}
              <div itemScope itemType="https://schema.org/FAQPage">
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden" itemScope itemType="https://schema.org/Question">
                      <button
                        type="button"
                        aria-expanded={expandedFaq === index}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      >
                        <span className="font-semibold text-[#2C5F7F]" itemProp="name">{faq.question}</span>
                        {expandedFaq === index ? <ChevronUp className="w-5 h-5 text-[#2C5F7F]" /> : <ChevronDown className="w-5 h-5 text-[#2C5F7F]" />}
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? "max-h-96" : "max-h-0"}`} itemScope itemType="https://schema.org/Answer">
                        <p className="px-6 pb-4 text-gray-600" itemProp="text">{faq.answer}</p>
                      </div>
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
                Ready to discuss your fabrications project? We come to you — contact us for a no-obligation quote.               </p>
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
                        <p className="text-sm text-gray-600">Mobile — we come to you</p>
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
                    { title: "Structural Steel Shot Blasting", href: "/services/structural-steel-frames", tagline: "On-site blasting for building frames and trusses" },
                    { title: "Intumescent Painting", href: "/services/intumescent-painting", tagline: "Fire protection coatings applied after Sa 2.5 blasting" },
                    { title: "Rust Removal", href: "/services/rust-removal", tagline: "Complete rust removal to bare metal standard" },
                    { title: "Mill Scale Removal", href: "/services/mill-scale-removal", tagline: "Mill scale removal for optimal coating adhesion" },
                    { title: "Case Study: Commercial Building", href: "/case-studies/structural-steel", tagline: "25 real photos from a large structural steel project" },
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

      {/* Further Reading */}
      <section className="py-12 bg-[#f5f0e8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Further Reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  Five real fabrication projects with before, during, and after photos showing mill scale and rust removal to Sa 2.5 near-white metal standard.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#2C5F7F] group-hover:gap-2 transition-all">
                  See the projects <ArrowRight className="w-4 h-4" />
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
            <Link href="/services/intumescent-painting" className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
              <img
                src="/manus-storage/intumescentpaint6_9c8f5a2b.jpeg"
                alt="Intumescent painting of structural steel roof trusses on scissor lift — fire protection coating applied after shot blasting to Sa 2.5"
                className="w-full h-44 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <span className="text-xs font-semibold text-[#C17F3B] uppercase tracking-wide">Service</span>
                <h3 className="mt-1 text-base font-bold text-[#2C5F7F] group-hover:underline leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Intumescent Painting for Structural Steel
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  R30–R120 fire protection coatings applied after shot blasting — combined in a single mobilisation with full DFT documentation for building control.
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
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
    </div>
  );
}
