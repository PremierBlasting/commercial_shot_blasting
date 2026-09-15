import { useState, useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
}

const allCaseStudies: CaseStudy[] = [
  {
    id: 2,
    title: "Warehouse Cladding Restoration",
    category: "Industrial",
    description: "Complete removal of original plastisol and multiple paint layers from warehouse cladding, restoring bare metal for new coating system.",
    before: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/QRpJYgxdNmiyqvIK.webp",
    after: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/eujkoesZcJTxNAzk.webp",
    location: "Birmingham, West Midlands",
    duration: "5 days",
    results: "Restored to bare metal with ideal surface profile. Client reported excellent paint adhesion and a professional finish that exceeded expectations.",
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
    results: "Restored to pristine bare metal. The uniform surface preparation provides an ideal foundation for the new coating system.",
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
    results: "Successfully stripped to bare metal. Client impressed with thorough rust removal across the challenging curved geometry.",
  },
  {
    id: 19,
    title: "Commercial Radiator Restoration",
    category: "Commercial",
    description: "Precision restoration of vintage cast iron radiators — decades of paint and rust removed while preserving intricate casting details.",
    before: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/YVIqmQibsinaulNx.webp",
    after: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/UmbeZQqmNyesAHVo.webp",
    location: "UK",
    duration: "2 days",
    results: "Restored to pristine bare metal with all original details preserved. Client noted radiators looked better than when originally installed.",
  },
  {
    id: 16,
    title: "Commercial Gate Restoration",
    category: "Commercial",
    description: "Industrial gate surface preparation — complete rust and contamination removal for protective coating application.",
    before: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/MIIROVZiWbQlYLkF.webp",
    after: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/KMeJJHNNjmrVCsLA.webp",
    location: "UK",
    duration: "1 day",
    results: "Gates restored to bare metal with uniform surface profile, ready for new protective coating.",
  },
  {
    id: 17,
    title: "Heavy-Duty Commercial Vehicle Wheels",
    category: "Automotive",
    description: "Complete wheel restoration for vintage farm truck — decades of paint, rust, and agricultural contamination removed.",
    before: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/SrqhpzNTsQrjJrai.webp",
    after: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/izABKdVFbfGtnMQJ.webp",
    location: "UK",
    duration: "2 days",
    results: "All wheels restored to bare metal with perfect surface preparation for powder coating. Client delighted with the preservation of original details.",
  },
  {
    id: 18,
    title: "Complete Chassis Restoration",
    category: "Automotive",
    description: "Systematic shot blasting of entire warehouse vehicle chassis frame including all structural members and cross-braces.",
    before: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/dAQXgKdkBiPdcYhw.webp",
    after: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/dAQXgKdkBiPdcYhw.webp",
    location: "UK",
    duration: "4 days",
    results: "Chassis transformed to bare metal with ideal surface profile throughout. All structural members thoroughly cleaned and prepared.",
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
    results: "All barn elevations blasted clean to bare substrate. Completed on schedule with minimal disruption to farm operations.",
  },
  {
    id: 22,
    title: "Agricultural Building Restoration",
    category: "Agriculture",
    description: "Concrete and steel agricultural building surfaces shot blasted clean with scissor lift access — full elevation coverage.",
    before: "/manus-storage/WhatsAppImage2026-04-27at16.58.43(4)_5d798006.jpeg",
    after: "/manus-storage/WhatsAppImage2026-04-27at16.58.43(6)_5c09aa7a.jpeg",
    location: "UK",
    duration: "3 days",
    results: "Both concrete and steel surfaces prepared to a high standard with complete contamination removal. Building dramatically improved and ready for coating.",
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
    results: "Engine block restored to bare metal across all surfaces. Client proceeded immediately with inspection and recoating, significantly extending the engine's operational lifespan.",
  },
];

const categories = [
  { id: "all", label: "All Projects" },
  { id: "Industrial", label: "Industrial" },
  { id: "Commercial", label: "Commercial" },
  { id: "Automotive", label: "Automotive" },
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

  const getLabel = (id: number) => (beforeAfterState[id] === "before" ? "Before" : "After");

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
            Explore our completed projects by industry. Click any image to toggle between before and after.
          </p>
        </div>

        {/* Featured Case Study Banner */}
        <div className="mb-10 rounded-2xl overflow-hidden border border-amber-300/60 bg-gradient-to-r from-amber-50 to-white flex flex-col md:flex-row items-stretch shadow-sm">
          <div className="relative md:w-64 h-44 md:h-auto flex-shrink-0 overflow-hidden">
            <img
              src="https://commercialshotblasting.co.uk/manus-storage/IMG_3365_53136e5c.webp"
              alt="Structural steel shot blasting — commercial building project"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-amber-50/20" />
          </div>
          <div className="flex-1 p-5 md:p-7 flex flex-col justify-center">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-600 mb-1.5">Featured Project</span>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1.5" style={{ fontFamily: "'Playfair Display', serif" }}>
              ISS Property — Former Bakkavor Foods Facility, Wigan
            </h3>
            <p className="text-gray-600 text-sm mb-4 max-w-lg">
              A Wigan structural-steel preparation and fire-protection coating sequence: steelwork prepared to Sa 2.5 before the specified coating stage, with the project completed in 10 days.
            </p>
            <Link href="/case-studies/iss-property-former-bakkavor-foods-facility-wigan">
              <button className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors w-fit">
                View Full Case Study <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
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
            const label = getLabel(study.id);

            return (
              <div
                key={study.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                {/* Image with before/after toggle */}
                <div
                  className="relative overflow-hidden aspect-[4/3] cursor-pointer"
                  onClick={() => toggleBeforeAfter(study.id)}
                >
                  <img
                    src={imgSrc}
                    alt={`${study.title} — ${label}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
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
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronLeft className="w-3 h-3" />
                    <span>Toggle</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
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
          <Link href="/our-work">
            <Button
              size="lg"
              className="bg-[#2C5F7F] hover:bg-[#1a3d52] text-white px-8 py-3 rounded-full font-semibold inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              View Full Project Gallery
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
