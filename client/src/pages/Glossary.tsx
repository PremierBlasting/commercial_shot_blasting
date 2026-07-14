import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";

const glossaryTerms = [
  {
    id: "sa-2-5",
    term: "Sa 2.5",
    definition:
      "Sa 2.5, also called 'near-white metal', is a surface cleanliness standard defined in BS EN ISO 8501-1. It requires the removal of nearly all mill scale, rust, and coatings, leaving only faint staining on no more than 5% of the surface. Sa 2.5 is the most commonly specified standard for structural steelwork that will receive protective coatings, including intumescent fire protection paint.",
    relatedTerms: ["Sa 3", "BS EN ISO 8501-1", "Mill Scale"],
    seeAlso: "/blog/how-to-prepare-structural-steel-for-intumescent-painting",
  },
  {
    id: "sa-3",
    term: "Sa 3",
    definition:
      "Sa 3, also called 'white metal', is the highest surface cleanliness standard in BS EN ISO 8501-1. It requires the complete removal of all mill scale, rust, coatings, and foreign matter, leaving a uniformly grey-white metallic surface. Sa 3 is specified for the most demanding coating systems, including zinc-rich primers and coatings in aggressive environments.",
    relatedTerms: ["Sa 2.5", "BS EN ISO 8501-1"],
    seeAlso: null,
  },
  {
    id: "dft",
    term: "DFT (Dry Film Thickness)",
    definition:
      "Dry Film Thickness (DFT) is the thickness of a coating after it has fully cured and all solvents have evaporated, measured in microns (µm). DFT is critical for intumescent coatings, where the specified thickness determines the fire rating achieved (R30, R60, R90, or R120). DFT is measured using a calibrated electromagnetic or eddy-current gauge on the prepared steel surface.",
    relatedTerms: ["Intumescent Paint", "Surface Profile"],
    seeAlso: "/services/intumescent-painting",
  },
  {
    id: "intumescent-paint",
    term: "Intumescent Paint",
    definition:
      "Intumescent paint is a passive fire protection coating applied to structural steel. When exposed to heat above approximately 200°C, it expands to form a thick, insulating char layer that protects the steel from reaching critical failure temperature (typically 550°C). Intumescent coatings are specified to fire ratings of R30, R60, R90, or R120 (minutes of fire resistance) and must be applied to a correctly prepared surface, typically Sa 2.5 shot-blasted steel.",
    relatedTerms: ["DFT", "Sa 2.5", "Structural Steel"],
    seeAlso: "/services/intumescent-painting",
  },
  {
    id: "shot-blasting",
    term: "Shot Blasting",
    definition:
      "Shot blasting is an abrasive surface preparation process in which steel shot or grit media is propelled at high velocity against a metal surface using a centrifugal wheel or compressed air. The impact removes rust, mill scale, old coatings, and contamination, and creates a surface profile (anchor pattern) that improves coating adhesion. Shot blasting is used to prepare structural steel, factory cladding, shipping containers, floors, and other industrial metalwork.",
    relatedTerms: ["Grit Blasting", "Sa 2.5", "Surface Profile", "Mill Scale"],
    seeAlso: "/services",
  },
  {
    id: "grit-blasting",
    term: "Grit Blasting",
    definition:
      "Grit blasting is a form of abrasive blasting that uses angular steel grit (rather than spherical shot) as the abrasive media. The angular particles create a sharper, more aggressive surface profile than shot, making grit blasting particularly effective for achieving the anchor pattern required by high-build coatings and intumescent systems. The terms 'shot blasting' and 'grit blasting' are often used interchangeably in the UK industry.",
    relatedTerms: ["Shot Blasting", "Surface Profile", "Sa 2.5"],
    seeAlso: null,
  },
  {
    id: "mill-scale",
    term: "Mill Scale",
    definition:
      "Mill scale is a thin, blue-grey oxide layer that forms on the surface of hot-rolled steel during the manufacturing process. It is harder and more brittle than the underlying steel and acts as a barrier to coating adhesion. Mill scale must be completely removed before protective coatings are applied — this is typically achieved by shot blasting to Sa 2.5 or Sa 3 standard. Failure to remove mill scale leads to premature coating delamination.",
    relatedTerms: ["Sa 2.5", "Sa 3", "Shot Blasting"],
    seeAlso: null,
  },
  {
    id: "rust-grade",
    term: "Rust Grade",
    definition:
      "Rust grade describes the initial condition of uncoated steel before surface preparation, as defined in BS EN ISO 8501-1. Four grades are defined: Grade A (steel largely covered with adherent mill scale, little or no rust), Grade B (steel with some rust and mill scale beginning to flake), Grade C (steel with mill scale rusted away and visible pitting), and Grade D (steel with general pitting visible to the naked eye). The rust grade affects the blast standard achievable and the time required.",
    relatedTerms: ["Sa 2.5", "Sa 3", "BS EN ISO 8501-1", "Mill Scale"],
    seeAlso: null,
  },
  {
    id: "surface-profile",
    term: "Surface Profile",
    definition:
      "Surface profile (also called anchor pattern or surface roughness) is the microscopic peak-and-valley texture created on a steel surface by shot blasting. It is measured in microns Rz (mean peak-to-valley height) using a surface profile gauge or replica tape. A surface profile of 40–70 µm Rz is typically required for intumescent coatings and high-build protective systems. The profile provides mechanical adhesion for the coating and increases the effective surface area.",
    relatedTerms: ["Shot Blasting", "DFT", "Sa 2.5"],
    seeAlso: null,
  },
  {
    id: "bs-en-iso-8501-1",
    term: "BS EN ISO 8501-1",
    definition:
      "BS EN ISO 8501-1 is the British and European standard for the visual assessment of surface cleanliness of steel before the application of paints and related products. It defines four rust grades (A, B, C, D) for unpainted steel and seven blast-cleaned preparation grades (Sa 1, Sa 2, Sa 2.5, Sa 3, St 2, St 3, Fl). Photographic reference comparators are included in the standard. It is the primary standard referenced in UK and European coating specifications for structural steelwork.",
    relatedTerms: ["Sa 2.5", "Sa 3", "Rust Grade"],
    seeAlso: null,
  },
  {
    id: "sspc",
    term: "SSPC (Society for Protective Coatings)",
    definition:
      "SSPC (Society for Protective Coatings) is a North American standards body that publishes surface preparation standards widely referenced in international coating specifications. Key SSPC standards include SP 6 (Commercial Blast, equivalent to Sa 2), SP 10 (Near-White Blast, equivalent to Sa 2.5), and SP 5 (White Metal Blast, equivalent to Sa 3). SSPC standards are sometimes referenced alongside ISO 8501-1 in UK project specifications, particularly for offshore and marine work.",
    relatedTerms: ["Sa 2.5", "Sa 3", "BS EN ISO 8501-1", "NACE"],
    seeAlso: null,
  },
  {
    id: "nace",
    term: "NACE (National Association of Corrosion Engineers)",
    definition:
      "NACE International (now merged with SSPC to form AMPP — Association for Materials Protection and Performance) published widely used corrosion and surface preparation standards. NACE No. 1 (White Metal Blast) is equivalent to Sa 3, and NACE No. 2 (Near-White Blast) is equivalent to Sa 2.5. NACE standards are commonly referenced in oil and gas, marine, and infrastructure specifications alongside ISO 8501-1 and SSPC standards.",
    relatedTerms: ["SSPC", "Sa 2.5", "Sa 3", "BS EN ISO 8501-1"],
    seeAlso: null,
  },
];

export default function Glossary() {
  useSEO({
    title: "Shot Blasting Glossary | Industry Terms Explained | Commercial Shot Blasting",
    description:
      "Comprehensive glossary of shot blasting and surface preparation terms: Sa 2.5, Sa 3, DFT, intumescent paint, mill scale, surface profile, BS EN ISO 8501-1, SSPC, NACE and more. Written by UK shot blasting contractors.",
    canonical: "https://commercialshotblasting.co.uk/glossary",
  });

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#1a3a4d] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-gray-300 mb-4" aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-1 items-center">
              <li>
                <Link href="/" className="hover:text-[#E8B84A] transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-500 mx-1">/</li>
              <li className="text-[#E8B84A]">Glossary</li>
            </ol>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Shot Blasting &amp; Surface Preparation Glossary
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Clear definitions of the key terms used in shot blasting, surface preparation, and
            protective coating specifications — written by our team of professional shot blasting
            contractors.
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <section className="bg-gray-50 border-b border-gray-200 py-4 px-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-600 mb-2 font-medium">Jump to:</p>
          <div className="flex flex-wrap gap-2">
            {glossaryTerms.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="text-xs bg-white border border-gray-300 rounded px-2 py-1 text-[#1a3a4d] hover:bg-[#1a3a4d] hover:text-white hover:border-[#1a3a4d] transition-colors"
              >
                {t.term}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {glossaryTerms.map((t, idx) => (
            <article
              key={t.id}
              id={t.id}
              className="scroll-mt-20 border-b border-gray-100 pb-10 last:border-0"
            >
              <div className="flex items-start gap-4">
                <span className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-[#E8B84A] text-[#1a3a4d] font-bold text-sm flex-shrink-0 mt-1">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[#1a3a4d] mb-3">{t.term}</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">{t.definition}</p>
                  {t.relatedTerms.length > 0 && (
                    <div className="flex flex-wrap gap-2 items-center mb-3">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Related:
                      </span>
                      {t.relatedTerms.map((rt) => {
                        const related = glossaryTerms.find((g) => g.term === rt);
                        return related ? (
                          <a
                            key={rt}
                            href={`#${related.id}`}
                            className="text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded px-2 py-0.5 hover:bg-blue-100 transition-colors"
                          >
                            {rt}
                          </a>
                        ) : (
                          <span
                            key={rt}
                            className="text-xs bg-gray-100 text-gray-600 rounded px-2 py-0.5"
                          >
                            {rt}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  {t.seeAlso && (
                    <Link
                      href={t.seeAlso}
                      className="inline-flex items-center gap-1 text-sm text-[#E8B84A] font-semibold hover:underline"
                    >
                      See also: {t.seeAlso.includes("blog") ? "Related blog post" : "Related service"}
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1a3a4d] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Need Shot Blasting Services?</h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Our team of professional shot blasting contractors operates 12 mobile units across
            England and Wales. Free site surveys and fixed-price quotes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#E8B84A] text-[#1a3a4d] font-bold px-6 py-3 rounded hover:bg-yellow-400 transition-colors"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:07970566409"
              className="border border-white text-white font-bold px-6 py-3 rounded hover:bg-white hover:text-[#1a3a4d] transition-colors"
            >
              Call 07970 566409
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
