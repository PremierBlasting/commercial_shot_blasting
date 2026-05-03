import { useState } from "react";
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

const featuredCaseStudies: CaseStudy[] = [
  {
    id: 2,
    title: "Warehouse Cladding Restoration",
    category: "Factory/Warehouse Cladding",
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
    category: "Steel Doors & Shutters",
    description: "Complete rust and contamination removal from industrial roller shutter doors at a manufacturing facility.",
    before: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/CoioYfNmUywtcZxQ.webp",
    after: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/nQViKddQUSUWiKol.webp",
    location: "West Midlands",
    duration: "3 days",
    results: "Restored to pristine bare metal. The uniform surface preparation provides an ideal foundation for the new coating system.",
  },
  {
    id: 12,
    title: "Large Steel Tank Restoration",
    category: "Steel Containers",
    description: "Complete rust and paint removal from a large cylindrical steel storage tank with severe corrosion and multiple failed coating layers.",
    before: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/YBedohTImNkgXOlG.webp",
    after: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/wNJxNfMjngkYNOyk.webp",
    location: "West Midlands",
    duration: "6 days",
    results: "Successfully stripped to bare metal. Client impressed with thorough rust removal across the challenging curved geometry.",
  },
  {
    id: 19,
    title: "Commercial Radiator Restoration",
    category: "Radiators",
    description: "Precision restoration of vintage cast iron radiators — decades of paint and rust removed while preserving intricate casting details.",
    before: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/zhJKXbmyXfKCFRZy.webp",
    after: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oqjuEhatDJBjVZWF.webp",
    location: "UK",
    duration: "2 days",
    results: "Restored to pristine bare metal with all original details preserved. Client noted radiators looked better than when originally installed.",
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
    id: 24,
    title: "Marine Diesel Engine Block Restoration",
    category: "Marine & Offshore",
    description: "Large-format marine diesel engine block stripped of decades of rust, paint and corrosion — ready for inspection and recoating.",
    before: "/manus-storage/marine-before-1_01d5fffa.jpg",
    after: "/manus-storage/marine-after-1_dc53f2eb.jpg",
    location: "UK",
    duration: "3 days",
    results: "Engine block restored to bare metal across all surfaces. Client proceeded immediately with inspection and recoating.",
  },
];

export function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [beforeAfterState, setBeforeAfterState] = useState<Record<number, "before" | "after">>({});

  const toggleBeforeAfter = (id: number) => {
    setBeforeAfterState(prev => ({
      ...prev,
      [id]: prev[id] === "after" ? "before" : "after",
    }));
  };

  const getImage = (study: CaseStudy) => {
    const state = beforeAfterState[study.id] ?? "after";
    return state === "after" ? study.after : study.before;
  };

  const getLabel = (id: number) => (beforeAfterState[id] === "before" ? "Before" : "After");

  return (
    <section className="py-20 bg-white" id="case-studies">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#2C5F7F] font-medium mb-2 uppercase tracking-wide text-sm">Real Results</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Case Studies
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore a selection of our completed projects — click any card to toggle between before and after, and see the results we deliver.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCaseStudies.map((study) => {
            const isExpanded = activeIndex === study.id;
            const imgSrc = getImage(study);
            const label = getLabel(study.id);

            return (
              <div
                key={study.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                {/* Image with before/after toggle */}
                <div className="relative overflow-hidden aspect-[4/3] cursor-pointer" onClick={() => toggleBeforeAfter(study.id)}>
                  <img
                    src={imgSrc}
                    alt={`${study.title} — ${label}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Before/After badge */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold shadow transition-all ${
                        label === "After"
                          ? "bg-[#2C5F7F] text-white"
                          : "bg-amber-500 text-white"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {/* Toggle hint */}
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronLeft className="w-3 h-3" />
                    <span>Toggle</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/90 text-[#2C5F7F] text-xs font-semibold px-2 py-1 rounded-full shadow">
                      {study.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
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
                    <div className="mb-4">
                      <button
                        className="text-xs font-semibold text-[#2C5F7F] hover:underline flex items-center gap-1"
                        onClick={() => setActiveIndex(isExpanded ? null : study.id)}
                      >
                        {isExpanded ? "Hide Results" : "View Results"}
                        <ArrowRight className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
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
