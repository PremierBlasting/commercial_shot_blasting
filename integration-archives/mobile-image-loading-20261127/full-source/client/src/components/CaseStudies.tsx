import { useState, useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOMEPAGE_CUSTOMER_COPY } from "@shared/homepageCustomerCopy";
import { responsiveProjectImage } from "@/lib/responsiveProjectImages";

interface CaseStudy {
  id: number;
  title: string;
  category: string;
  description: string;
  before: string;
  after: string;
  location?: string;
  duration?: string;
  results?: string;
  stageLabel?: string;
  imageAlt?: string;
  caseStudyHref?: string;
}

const allCaseStudies: CaseStudy[] = [
  {
    id: 101,
    title: "ISS Property — Former Bakkavor Foods Facility",
    category: "Industrial",
    description: "Shot blasting to Sa 2.5 followed by fire-protective coating work on the warehouse steelwork at the former Bakkavor Foods facility.",
    before: "/manus-storage/iss-property-former-bakkavor-wigan-before-2026-09-15_a00636db.png",
    after: "/manus-storage/iss-property-former-bakkavor-wigan-after-2026-09-15_21aa25d4.png",
    location: "Wigan, Greater Manchester",
    duration: "10 days",
    results: "Completed in 10 days, five days ahead of programme.",
    imageAlt: "Structural steel at the former Bakkavor Foods Facility in Wigan after the preparation and fire-protection coating sequence",
    caseStudyHref: "/case-studies/iss-property-former-bakkavor-foods-facility-wigan",
  },
  {
    id: 102,
    title: "HB Tunnelling Warehouse Refurbishment",
    category: "Industrial",
    description: "Our five-person team blasted the warehouse steelwork, primed each section straight away and applied intumescent fire-protective coating — all handled as one job.",
    before: "/manus-storage/hb-tunnelling-before_b02e1e81.webp",
    after: "/manus-storage/hb-tunnelling-finished-painted-drone_42119577.webp",
    location: "Doncaster, South Yorkshire",
    duration: "6-week programme",
    results: "A five-person multi-skilled team delivered the blast-and-coat work as one coordinated scope.",
    imageAlt: "Finished painted Doncaster warehouse site from the HB Tunnelling refurbishment project",
    caseStudyHref: "/case-studies/hb-tunnelling-doncaster",
  },
  {
    id: 103,
    title: "Bromsgrove School Spiral Staircase",
    category: "Commercial",
    description: "An external spiral staircase with flaking paint and rust-affected areas was restored and finished in black, including anti-slip paint to the steps.",
    before: "/manus-storage/bromsgrove-school-staircase-before-definitive-2026-09-14_dca201c9.png",
    after: "/manus-storage/bromsgrove-staircase-after_ae521dcd.png",
    location: "Bromsgrove, Worcestershire",
    results: "The completed staircase was finished in black, with black anti-slip paint applied to the steps.",
    imageAlt: "Finished black external spiral staircase at Bromsgrove School after restoration",
    caseStudyHref: "/case-studies/bromsgrove-school-staircase",
  },
  {
    id: 104,
    title: "ADE Power Marine CX Enclosure Preparation",
    category: "Marine & Offshore",
    description: "Large enclosures blasted and primed for a Marine CX protective coating system at ADE Power in Wakefield, now being flipped for the next stage of work.",
    before: "/manus-storage/ade-power-wakefield-marine-cx-hero_0d533b36.webp",
    after: "/manus-storage/ade-power-wakefield-marine-cx-hero_0d533b36.webp",
    location: "Wakefield, WF9",
    duration: "Project update",
    stageLabel: "In progress",
    imageAlt: "Large primed enclosure at the ADE Power Wakefield project site",
    caseStudyHref: "/case-studies/ade-power-wakefield-marine-cx-enclosures",
  },
  {
    id: 2,
    title: "Warehouse Cladding Restoration",
    category: "Industrial",
    description: "Complete removal of original plastisol and multiple paint layers from warehouse cladding, restoring bare metal for new coating system.",
    before: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/QRpJYgxdNmiyqvIK.webp",
    after: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/eujkoesZcJTxNAzk.webp",
    location: "Birmingham, West Midlands",
    duration: "5 days",
    results: "Plastisol and old paint layers were removed from the cladding, preparing the panels for a new coating system.",
  },
  {
    id: 14,
    title: "Steel Roller Shutter Restoration",
    category: "Industrial",
    description: "Complete rust and contamination removal from industrial roller shutter doors at a manufacturing facility.",
    before: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/xvKQQIlLmNAFAvok.webp",
    after: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/DUhxFvPPoYHiQnQF.webp",
    location: "West Midlands",
    duration: "3 days",
    results: "Rust and old coatings were removed from the roller shutter doors, ready for repainting.",
  },
  {
    id: 12,
    title: "Large Steel Tank Restoration",
    category: "Industrial",
    description: "Complete rust and paint removal from a large cylindrical steel storage tank with severe corrosion and multiple failed coating layers.",
    before: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/UhOtVLOfPobtqyhi.webp",
    after: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yEbPReqUussVzDSr.webp",
    location: "West Midlands",
    duration: "6 days",
    results: "Rust and failed paint layers were stripped from the tank’s curved surfaces before the next coating stage.",
  },
  {
    id: 21,
    title: "Farm Barn Shot Blasting",
    category: "Agriculture",
    description: "Shot blasting of farm barn concrete panels and steel frame — dramatic before and after transformation on-site.",
    before: "/manus-storage/WhatsAppImage2026-04-27at16.58.43(5)_d258dff2.jpeg",
    after: "/manus-storage/WhatsAppImage2026-04-27at16.58.42(1)_a8f17ecc.jpeg",
    location: "UK",
    duration: "2 days",
    results: "The barn’s concrete panels and steel frame were blasted to remove old finishes and surface contamination.",
  },
  {
    id: 24,
    title: "Marine Diesel Engine Block Restoration",
    category: "Marine & Offshore",
    description: "Large-format marine diesel engine block stripped of decades of rust, paint and corrosion — ready for inspection and recoating.",
    before: "/manus-storage/marine-before-1_01d5fffa.jpg",
    after: "/manus-storage/marine-after-1_dc53f2eb.jpg",
    location: "UK",
    duration: "3 days",
    results: "Old coatings and corrosion were removed from the engine block, preparing it for inspection and the next finish.",
  },
];

const categories = [
  { id: "all", label: "All Projects" },
  { id: "Industrial", label: "Industrial" },
  { id: "Commercial", label: "Commercial" },
  { id: "Agriculture", label: "Agriculture" },
  { id: "Marine & Offshore", label: "Marine & Offshore" },
];

export function CaseStudies() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [beforeAfterState, setBeforeAfterState] = useState<Record<number, "before" | "after">>({});

  const filteredStudies = useMemo(() => {
    if (activeCategory === "all") return allCaseStudies;
    return allCaseStudies.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const toggleBeforeAfter = (id: number) => {
    setBeforeAfterState((prev) => ({
      ...prev,
      [id]: prev[id] === "before" ? "after" : "before",
    }));
  };

  const getImage = (study: CaseStudy) => {
    const state = beforeAfterState[study.id] ?? "after";
    return state === "after" ? study.after : study.before;
  };

  const getLabel = (study: CaseStudy) => study.stageLabel ?? (beforeAfterState[study.id] === "before" ? "Before" : "After");

  const canToggleBeforeAfter = (study: CaseStudy) => study.before !== study.after;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setExpandedId(null);
  };

  return (
    <section className="py-20 bg-white" id="case-studies">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#2C5F7F] font-medium mb-2 uppercase tracking-wide text-sm">Real Results</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Case Studies
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {HOMEPAGE_CUSTOMER_COPY.caseStudies.intro}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const count = cat.id === "all"
              ? allCaseStudies.length
              : allCaseStudies.filter((s) => s.category === cat.id).length;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? "bg-[#2C5F7F] text-white border-[#2C5F7F] shadow-md"
                    : "bg-white text-[#2C5F7F] border-[#2C5F7F]/30 hover:border-[#2C5F7F] hover:bg-[#2C5F7F]/5"
                }`}
              >
                {cat.label}
                <span
                  className={`ml-2 text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-[#2C5F7F]/10 text-[#2C5F7F]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p className="text-center text-sm text-gray-500 mb-8">
          Showing <span className="font-semibold text-[#2C2C2C]">{filteredStudies.length}</span> project{filteredStudies.length !== 1 ? "s" : ""}
          {activeCategory !== "all" && (
            <> in <span className="font-semibold text-[#2C5F7F]">{activeCategory}</span></>
          )}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study) => {
            const isExpanded = expandedId === study.id;
            const imgSrc = getImage(study);
            const image = responsiveProjectImage(imgSrc);
            const label = getLabel(study);
            const canToggle = canToggleBeforeAfter(study);

            return (
              <div
                key={study.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                {/* Image with before/after toggle */}
                <div
                  className={`relative overflow-hidden aspect-[4/3] ${canToggle ? "cursor-pointer" : ""}`}
                  onClick={canToggle ? () => toggleBeforeAfter(study.id) : undefined}
                >
                  <img
                    key={imgSrc}
                    src={image.src}
                    srcSet={image.srcSet}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    width={image.width}
                    height={image.height}
                    alt={study.imageAlt ?? `${study.title} — ${label}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    onError={image.src !== imgSrc ? (event) => {
                      const target = event.currentTarget;
                      if (target.getAttribute("src") === imgSrc) return;
                      target.removeAttribute("srcset");
                      target.src = imgSrc;
                    } : undefined}
                  />
                  {/* Before/After badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold shadow transition-all ${
                        label === "After" ? "bg-[#2C5F7F] text-white" : "bg-amber-500 text-white"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/90 text-[#2C5F7F] text-xs font-semibold px-2 py-1 rounded-full shadow">
                      {study.category}
                    </span>
                  </div>
                  {/* Toggle hint */}
                  {canToggle && (
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronLeft className="w-3 h-3" />
                      <span>Toggle</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3
                    className="text-lg font-bold text-[#2C2C2C] mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {study.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-1">{study.description}</p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                    {study.location && (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2C5F7F] inline-block" />
                        {study.location}
                      </span>
                    )}
                    {study.duration && (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                        {study.duration}
                      </span>
                    )}
                  </div>

                  {/* Results accordion */}
                  {study.results && (
                    <div className="mb-2">
                      <button
                        className="text-xs font-semibold text-[#2C5F7F] hover:underline flex items-center gap-1"
                        onClick={() => setExpandedId(isExpanded ? null : study.id)}
                      >
                        {isExpanded ? "Hide Results" : "View Results"}
                        <ArrowRight
                          className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                        />
                      </button>
                      {isExpanded && (
                        <p className="mt-2 text-xs text-gray-600 bg-[#F5F1E8] rounded-lg p-3 leading-relaxed">
                          {study.results}
                        </p>
                      )}
                    </div>
                  )}

                  {study.caseStudyHref && (
                    <Link href={study.caseStudyHref} className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[#2C5F7F] transition hover:gap-2 hover:underline">
                      View case study <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredStudies.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg mb-4">No projects found in this category.</p>
            <button
              className="text-[#2C5F7F] font-semibold hover:underline"
              onClick={() => handleCategoryChange("all")}
            >
              View all projects
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
            <Button asChild
              size="lg"
              className="bg-[#2C5F7F] hover:bg-[#1a3d52] text-white px-8 py-3 rounded-full font-semibold inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Link href="/our-work">
                View more of our work
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
