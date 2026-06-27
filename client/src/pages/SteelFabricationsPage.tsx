import { useEffect } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { LeadForm } from "@/components/LeadForm";
import { CheckCircle, ArrowRight, Wrench, Shield, Clock, Award } from "lucide-react";

// ── CDN image paths ────────────────────────────────────────────────────────────
const images = {
  // Project 1 — fabricated steel frames (before / during / after)
  p1Before: "/manus-storage/SteelFabrications1before_090ae51a.jpg",
  p1During: "/manus-storage/SteelFabrications1During_856056db.jpg",
  p1After:  "/manus-storage/SteelFabrications1After_ff77c1d1.jpg",
  // Project 2 — large steel frame in blast cabinet
  p2Before: "/manus-storage/SteelFabrications2before_c3997659.jpg",
  p2After:  "/manus-storage/SteelFabrications2After_beae57f5.jpg",
  // Project 3 — steel base plate
  p3Before: "/manus-storage/SteelFabrications3Before_b1e94331.jpg",
  p3After:  "/manus-storage/SteelFabrications3After_434a8bd1.jpg",
  // Project 4 — arch / horseshoe fabrications + base plates
  p4Before: "/manus-storage/SteelFabrications4before_dad326c3.jpg",
  p4After:  "/manus-storage/SteelFabrications4After_f09f90c9.jpg",
  // Project 5 — channel / bracket assembly
  p5Before: "/manus-storage/SteelFabrications5before_ca2e0610.jpg",
  p5After:  "/manus-storage/SteelFabrications5After_0ea5c92c.jpg",
};

// ── JSON-LD structured data ────────────────────────────────────────────────────
const JSONLD_ARTICLE = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Steel Fabrications Shot Blasting — Project Gallery",
  "description": "Real before-and-after project photos showing shot blasting of fabricated steelwork: frames, base plates, arch fabrications, and channel assemblies blasted to Sa 2.5 standard.",
  "url": "https://commercialshotblasting.co.uk/steel-fabrications",
  "image": images.p1After,
  "author": {
    "@type": "Organization",
    "name": "Commercial Shot Blasting",
    "url": "https://commercialshotblasting.co.uk"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Commercial Shot Blasting",
    "url": "https://commercialshotblasting.co.uk",
    "logo": {
      "@type": "ImageObject",
      "url": "https://commercialshotblasting.co.uk/logo.png"
    }
  },
  "datePublished": "2024-06-01",
  "dateModified": "2025-06-01",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://commercialshotblasting.co.uk/steel-fabrications"
  }
};

const JSONLD_IMAGE_GALLERY = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "Steel Fabrications Shot Blasting Gallery",
  "description": "Before, during, and after photos of fabricated steelwork shot blasted to Sa 2.5 standard by Commercial Shot Blasting.",
  "url": "https://commercialshotblasting.co.uk/steel-fabrications",
  "image": [
    { "@type": "ImageObject", "url": images.p1Before, "name": "Project 1 — Before: Fabricated steel frames with rust and mill scale" },
    { "@type": "ImageObject", "url": images.p1During, "name": "Project 1 — During: Steel frames inside blast cabinet" },
    { "@type": "ImageObject", "url": images.p1After,  "name": "Project 1 — After: Clean blasted steel frames ready for coating" },
    { "@type": "ImageObject", "url": images.p2Before, "name": "Project 2 — Before: Large steel frame with heavy rust in blast cabinet" },
    { "@type": "ImageObject", "url": images.p2After,  "name": "Project 2 — After: Clean white-primed steel frame in blast cabinet" },
    { "@type": "ImageObject", "url": images.p3Before, "name": "Project 3 — Before: Rusty steel base plate outdoors" },
    { "@type": "ImageObject", "url": images.p3After,  "name": "Project 3 — After: Clean blasted steel base plate" },
    { "@type": "ImageObject", "url": images.p4Before, "name": "Project 4 — Before: Rusty arch fabrications and base plates" },
    { "@type": "ImageObject", "url": images.p4After,  "name": "Project 4 — After: Clean blasted arch fabrications and base plates" },
    { "@type": "ImageObject", "url": images.p5Before, "name": "Project 5 — Before: Rusty steel channel and bracket assembly" },
    { "@type": "ImageObject", "url": images.p5After,  "name": "Project 5 — After: Clean blasted channel assembly" },
  ]
};

// ── Stats ──────────────────────────────────────────────────────────────────────
const stats = [
  { value: "Sa 2.5", label: "Surface Standard", icon: Award },
  { value: "Rz 50–75μm", label: "Anchor Profile", icon: Shield },
  { value: "24–48hr", label: "Typical Turnaround", icon: Clock },
  { value: "100%", label: "Coating-Ready Finish", icon: CheckCircle },
];

// ── Process steps ──────────────────────────────────────────────────────────────
const processSteps = [
  {
    number: "01",
    title: "Collection or Drop-Off",
    description: "We collect fabrications from your site or you can drop them at our blast facility. We handle pieces of all sizes — from small brackets to large structural frames.",
  },
  {
    number: "02",
    title: "Blast Cabinet Preparation",
    description: "Fabrications are positioned in our enclosed blast cabinet, ensuring every surface — including internal faces, welds, and recesses — is fully accessible.",
  },
  {
    number: "03",
    title: "Iron Silicate Shot Blasting",
    description: "We blast using iron silicate (copper slag) media to achieve Sa 2.5 near-white metal standard with an Rz 50–75 μm anchor profile ideal for paint and coating adhesion.",
  },
  {
    number: "04",
    title: "Quality Inspection",
    description: "Each piece is inspected against the Sa 2.5 standard before leaving our facility. Any areas that need additional passes are re-blasted at no extra cost.",
  },
  {
    number: "05",
    title: "Return or Collection",
    description: "Finished fabrications are returned to your site or collected by your team, ready for immediate priming or coating application.",
  },
];

export default function SteelFabricationsPage() {
  useSEO({
    title: "Steel Fabrications Shot Blasting | Before & After Gallery | Commercial Shot Blasting",
    description: "See real before and after photos of fabricated steelwork shot blasted to Sa 2.5 standard. Frames, base plates, arch fabrications, and channel assemblies — all blasted clean and ready for coating.",
    keywords: "steel fabrications shot blasting, fabricated steel blasting, before after shot blasting, Sa 2.5 steel fabrications, shot blasting gallery",
    canonical: "https://commercialshotblasting.co.uk/steel-fabrications",
  });

  // Inject JSON-LD
  useEffect(() => {
    const scripts: HTMLScriptElement[] = [];

    [JSONLD_ARTICLE, JSONLD_IMAGE_GALLERY].forEach((schema, i) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.id = `steel-fab-jsonld-${i}`;
      s.textContent = JSON.stringify(schema);
      document.head.appendChild(s);
      scripts.push(s);
    });

    return () => {
      scripts.forEach((s) => s.parentNode?.removeChild(s));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#1a2e3d] via-[#2C5F7F] to-[#1a3d52] text-white py-20 md:py-28">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-6xl mx-auto px-4 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link href="/our-work" className="hover:text-white transition">Our Work</Link>
            <span>/</span>
            <span className="text-white">Steel Fabrications</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Wrench className="w-4 h-4" />
              Project Gallery
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Steel Fabrications<br />
              <span className="text-[#7EC8E3]">Shot Blasting</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
              Real project photos showing fabricated steelwork transformed from heavily rusted and scaled surfaces to clean, profiled metal ready for priming and coating — all blasted to <strong className="text-white">Sa 2.5 near-white metal standard</strong>.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 bg-white text-[#2C5F7F] px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Request A Site Visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#2C5F7F] text-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#7EC8E3]" />
                </div>
                <div>
                  <div className="text-xl font-bold">{value}</div>
                  <div className="text-sm text-white/70">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro ─────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Fabricated Steel — Blasted Clean & Coating-Ready
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Steel fabrications arrive at our facility coated in rust, mill scale, and old paint. Using iron silicate (copper slag) media in our enclosed blast cabinet, we remove all surface contamination and create the anchor profile that coatings need to bond permanently.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Every piece is blasted to <strong>Sa 2.5 near-white metal standard</strong> with an <strong>Rz 50–75 μm anchor profile</strong> — the specification required by most protective coating systems. Fabrications leave our facility ready for immediate priming, powder coating, or galvanising.
            </p>
          </div>
        </div>
      </section>

      {/* ── Project Galleries ─────────────────────────────────────────────────── */}
      <section id="projects" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Project Gallery
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Drag the slider on each image to compare before and after. Project 1 also includes a during shot taken inside the blast cabinet.
            </p>
          </div>

          <div className="space-y-20">

            {/* ── Project 1: Before / During / After ──────────────────────────── */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#2C5F7F] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Fabricated Steel Frames</h3>
                  <p className="text-gray-500 text-sm mt-0.5">Multi-piece frame assembly — before, during, and after blasting</p>
                </div>
              </div>

              {/* Three-column layout for project 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Before */}
                <div className="space-y-3">
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                    <img
                      src={images.p1Before}
                      alt="Project 1 Before — fabricated steel frames with heavy rust and mill scale outdoors"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                    <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-semibold">Before</div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Fabricated steel frames with heavy rust and mill scale. Multiple pieces requiring full surface preparation before protective coating.
                  </p>
                </div>

                {/* During */}
                <div className="space-y-3">
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                    <img
                      src={images.p1During}
                      alt="Project 1 During — steel frames inside blast cabinet mid-process"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                    <div className="absolute top-3 left-3 bg-[#E67E22]/90 text-white px-3 py-1.5 rounded-full text-sm font-semibold">During</div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Inside our enclosed blast cabinet mid-process. The cabinet allows all faces — including internal corners and welds — to be blasted thoroughly.
                  </p>
                </div>

                {/* After */}
                <div className="space-y-3">
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                    <img
                      src={images.p1After}
                      alt="Project 1 After — clean blasted steel frames ready for coating"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                    <div className="absolute top-3 left-3 bg-[#2C5F7F] text-white px-3 py-1.5 rounded-full text-sm font-semibold">After</div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Clean, uniformly blasted frames with a consistent Sa 2.5 surface profile. Ready for immediate priming or powder coating application.
                  </p>
                </div>
              </div>

              {/* Before/After slider as a bonus comparison */}
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-3 text-center font-medium">Interactive before/after comparison:</p>
                <BeforeAfterSlider
                  beforeImage={images.p1Before}
                  afterImage={images.p1After}
                  beforeLabel="Before"
                  afterLabel="After"
                  className="max-w-2xl mx-auto"
                />
              </div>
            </div>

            {/* ── Project 2: Large Steel Frame ─────────────────────────────────── */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#2C5F7F] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Large Steel Frame Assembly</h3>
                  <p className="text-gray-500 text-sm mt-0.5">Heavy fabricated frame — rust and scale removed to bare metal</p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <BeforeAfterSlider
                  beforeImage={images.p2Before}
                  afterImage={images.p2After}
                  beforeLabel="Before"
                  afterLabel="After"
                />
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    A large fabricated steel frame with heavy rust and surface contamination, positioned in our blast cabinet. The frame carries job reference markings confirming traceability throughout the process.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    After blasting, the frame shows a clean, uniform surface with no residual rust, mill scale, or old coatings. The white-grey appearance is characteristic of a freshly blasted Sa 2.5 surface, ready for immediate priming.
                  </p>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <div className="text-sm font-semibold text-[#2C5F7F] mb-2">Specification Achieved</div>
                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                      <div><span className="font-medium">Standard:</span> Sa 2.5</div>
                      <div><span className="font-medium">Profile:</span> Rz 50–75 μm</div>
                      <div><span className="font-medium">Media:</span> Iron silicate</div>
                      <div><span className="font-medium">Method:</span> Blast cabinet</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Project 3: Steel Base Plate ───────────────────────────────────── */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#2C5F7F] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Steel Base Plate</h3>
                  <p className="text-gray-500 text-sm mt-0.5">Heavily rusted base plate — fully restored to clean bare metal</p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-4 order-2 lg:order-1">
                  <p className="text-gray-600 leading-relaxed">
                    This steel base plate arrived with severe rust coverage across the entire top face — a deep reddish-brown oxidation typical of fabrications stored outdoors without protection.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    After blasting, the plate shows a clean, smooth surface with the characteristic light grey tone of freshly blasted mild steel. The four bolt holes remain clean and undamaged throughout the process.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Rust Removal", "Mill Scale Removal", "Sa 2.5 Standard", "Coating-Ready"].map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 bg-[#2C5F7F]/10 text-[#2C5F7F] px-3 py-1 rounded-full text-sm font-medium">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <BeforeAfterSlider
                  beforeImage={images.p3Before}
                  afterImage={images.p3After}
                  beforeLabel="Before"
                  afterLabel="After"
                  className="order-1 lg:order-2"
                />
              </div>
            </div>

            {/* ── Project 4: Arch Fabrications + Base Plates ───────────────────── */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#2C5F7F] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">4</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Arch Fabrications &amp; Base Plates</h3>
                  <p className="text-gray-500 text-sm mt-0.5">Mixed batch — curved arch sections and flat base plates blasted together</p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <BeforeAfterSlider
                  beforeImage={images.p4Before}
                  afterImage={images.p4After}
                  beforeLabel="Before"
                  afterLabel="After"
                />
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    A mixed batch of arch-shaped fabrications and flat base plates, all showing varying degrees of rust and mill scale. The curved arch sections present a surface preparation challenge that shot blasting handles with ease — the media reaches all faces uniformly.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Post-blasting, both the curved arch sections and the flat base plates show a consistent, clean surface. The uniform grey tone across all pieces confirms an even Sa 2.5 standard has been achieved throughout the batch.
                  </p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Why batch blasting works</div>
                    <p className="text-sm text-gray-600">
                      Our blast cabinet accommodates mixed batches of different shapes and sizes simultaneously, reducing turnaround time and cost per piece for fabricators with multiple components.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Project 5: Channel & Bracket Assembly ────────────────────────── */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#2C5F7F] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">5</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Steel Channel &amp; Bracket Assembly</h3>
                  <p className="text-gray-500 text-sm mt-0.5">Slotted channel sections and end brackets — fully cleaned and profiled</p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-4 order-2 lg:order-1">
                  <p className="text-gray-600 leading-relaxed">
                    These slotted channel sections and end brackets show the typical condition of fabrications that have been stored or used in a humid environment — patchy rust, discolouration, and surface contamination across all faces.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    After blasting, the channel sections and brackets are clean throughout — including inside the slots and along the internal faces of the channel profile. The clean metallic finish is ready for galvanising, powder coating, or liquid paint application.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Channel Sections", "Bracket Assemblies", "Internal Faces Cleaned", "Sa 2.5 Standard"].map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 bg-[#2C5F7F]/10 text-[#2C5F7F] px-3 py-1 rounded-full text-sm font-medium">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <BeforeAfterSlider
                  beforeImage={images.p5Before}
                  afterImage={images.p5After}
                  beforeLabel="Before"
                  afterLabel="After"
                  className="order-1 lg:order-2"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Process Steps ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              A straightforward process from collection to return — designed to minimise disruption to your fabrication schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((step) => (
              <div key={step.number} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
                  <div className="text-3xl font-bold text-[#2C5F7F]/20 mb-3">{step.number}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#1a2e3d] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Fabricators Choose Us
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                We work directly with steel fabricators, structural engineers, and construction contractors who need a reliable, fast-turnaround blasting service that meets coating specification requirements first time.
              </p>
              <ul className="space-y-4">
                {[
                  "Sa 2.5 standard achieved on every piece — no exceptions",
                  "Enclosed blast cabinet for all-face coverage including internal sections",
                  "Iron silicate media for consistent Rz 50–75 μm anchor profile",
                  "24–48 hour turnaround on most fabrication batches",
                  "Collection and return service available across England and Wales",
                  "Fully documented process with job references maintained throughout",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#7EC8E3] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={images.p1After}
                alt="Clean blasted steel frames ready for coating"
                className="rounded-xl w-full aspect-[4/3] object-cover"
                loading="lazy"
                width={400}
                height={300}
              />
              <img
                src={images.p2After}
                alt="Large steel frame after shot blasting"
                className="rounded-xl w-full aspect-[4/3] object-cover mt-6"
                loading="lazy"
                width={400}
                height={300}
              />
              <img
                src={images.p4After}
                alt="Arch fabrications and base plates after blasting"
                className="rounded-xl w-full aspect-[4/3] object-cover"
                loading="lazy"
                width={400}
                height={300}
              />
              <img
                src={images.p5After}
                alt="Channel assembly after shot blasting"
                className="rounded-xl w-full aspect-[4/3] object-cover mt-6"
                loading="lazy"
                width={400}
                height={300}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Services ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Structural Steel Shot Blasting",
                href: "/services/structural-steel-shot-blasting",
                description: "On-site shot blasting for structural steelwork in commercial and industrial buildings.",
              },
              {
                title: "Rust Removal",
                href: "/services/rust-removal",
                description: "Complete rust removal from steel and iron fabrications to bare metal standard.",
              },
              {
                title: "Mill Scale Removal",
                href: "/services/mill-scale-removal",
                description: "Mill scale removal from new fabrications to ensure coating adhesion from day one.",
              },
            ].map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="block bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-[#2C5F7F] hover:shadow-md transition group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-[#2C5F7F] transition mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{service.description}</p>
                <span className="text-sm text-[#2C5F7F] font-medium flex items-center gap-1">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead Form ─────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Request A Site Visit
            </h2>
            <p className="text-lg text-gray-600">
              Tell us about your fabrications and we'll get back to you with a no-obligation quote and turnaround estimate.
            </p>
          </div>
          <LeadForm
            variant="light"
            heading="Get a Quote for Your Fabrications"
            subheading="Fill in the form below and we'll respond within one business day."
            showWhatsApp={true}
          />
        </div>
      </section>
    </div>
  );
}
