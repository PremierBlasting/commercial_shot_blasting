import { useState, useMemo, useRef, lazy, Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { Search, X, ChevronRight } from "lucide-react";
import { GLOSSARY_TERMS, GLOSSARY_LETTERS } from "@/data/glossaryData";
import { Breadcrumb } from "@/components/Breadcrumb";

const LeadFormLazy = lazy(() => import("@/components/LeadForm").then(m => ({ default: m.LeadForm })));

export default function Glossary() {
  useSEO({
    title: "Shot Blasting Glossary | Industry Terms Explained | Commercial Shot Blasting",
    description:
      "Comprehensive glossary of shot blasting and surface preparation terms: Sa 2.5, Sa 3, DFT, intumescent paint, mill scale, surface profile, BS EN ISO 8501-1, SSPC, NACE and more. Written by UK shot blasting contractors.",
    canonical: "https://commercialshotblasting.co.uk/glossary",
  });

  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    let terms = GLOSSARY_TERMS;
    if (activeLetter) {
      terms = terms.filter((t) => t.letter === activeLetter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      terms = terms.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q) ||
          t.relatedTerms.some((r) => r.toLowerCase().includes(q))
      );
    }
    return terms;
  }, [search, activeLetter]);

  const clearSearch = () => {
    setSearch("");
    searchRef.current?.focus();
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <section className="py-3 bg-gray-50 border-b border-gray-200">
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Glossary", href: "/glossary", isCurrentPage: true }
          ]} />
        </div>
      </section>
      {/* Hero */}
      <section className="bg-[#1a3a4d] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Shot Blasting &amp; Surface Preparation Glossary
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mb-8">
            Clear definitions of the key terms used in shot blasting, surface preparation, and
            protective coating specifications — written by our team of professional shot blasting
            contractors.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (e.target.value) setActiveLetter(null);
              }}
              placeholder="Search terms, e.g. Sa 2.5, intumescent, mill scale…"
              className="w-full pl-12 pr-10 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84A]"
              aria-label="Search glossary terms"
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Alphabetical filter bar */}
      <section className="bg-gray-50 border-b border-gray-200 py-3 px-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-1">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mr-2 hidden sm:inline">
            Filter:
          </span>
          <button
            onClick={() => { setActiveLetter(null); setSearch(""); }}
            className={`text-xs px-3 py-1 rounded border transition-colors ${
              !activeLetter && !search
                ? "bg-[#1a3a4d] text-white border-[#1a3a4d]"
                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            All
          </button>
          {GLOSSARY_LETTERS.map((letter) => (
            <button
              key={letter}
              onClick={() => { setActiveLetter(letter === activeLetter ? null : letter); setSearch(""); }}
              className={`text-xs px-3 py-1 rounded border transition-colors font-medium ${
                activeLetter === letter
                  ? "bg-[#E8B84A] text-[#1a3a4d] border-[#E8B84A]"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {letter}
            </button>
          ))}
          {(search || activeLetter) && (
            <span className="ml-auto text-xs text-gray-500">
              {filtered.length} {filtered.length === 1 ? "term" : "terms"} found
            </span>
          )}
        </div>
      </section>

      {/* Terms */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-2">No terms match your search.</p>
              <button
                onClick={() => { setSearch(""); setActiveLetter(null); }}
                className="text-[#E8B84A] font-semibold hover:underline text-sm"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filtered.map((t) => (
                <article
                  key={t.id}
                  id={t.id}
                  className="scroll-mt-20 border border-gray-100 rounded-xl p-6 hover:border-[#E8B84A] transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <span className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-[#E8B84A] text-[#1a3a4d] font-bold text-sm flex-shrink-0 mt-1">
                      {t.letter}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h2 className="text-xl font-bold text-[#1a3a4d]">{t.term}</h2>
                        <Link
                          href={`/glossary/${t.id}`}
                          className="flex-shrink-0 flex items-center gap-1 text-xs text-[#E8B84A] font-semibold hover:underline whitespace-nowrap"
                          aria-label={`Read full definition of ${t.term}`}
                        >
                          Full definition
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4 text-sm">{t.definition}</p>
                      {t.relatedTerms.length > 0 && (
                        <div className="flex flex-wrap gap-2 items-center mb-3">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            Related:
                          </span>
                          {t.relatedTerms.map((relatedId) => {
                            const related = GLOSSARY_TERMS.find((g) => g.id === relatedId);
                            return related ? (
                              <Link
                                key={relatedId}
                                href={`/glossary/${related.id}`}
                                className="text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded px-2 py-0.5 hover:bg-blue-100 transition-colors"
                              >
                                {related.term}
                              </Link>
                            ) : (
                              <span
                                key={relatedId}
                                className="text-xs bg-gray-100 text-gray-600 rounded px-2 py-0.5"
                              >
                                {relatedId}
                              </span>
                            );
                          })}
                        </div>
                      )}
                      <Link
                        href={`/glossary/${t.id}`}
                        className="inline-flex items-center gap-1 text-sm text-[#1a3a4d] font-semibold hover:text-[#E8B84A] transition-colors mt-1"
                      >
                        Read full definition, FAQs &amp; examples
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA — native LeadForm */}
      <section className="py-16 bg-[#1a3a4d]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Request a Free Site Survey</h2>
            <p className="text-white/70">12 mobile units across England &amp; Wales. Fixed-price quotes, no obligation.</p>
          </div>
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-white/40">Loading form…</div>}>
            <LeadFormLazy variant="dark" heading="" showWhatsApp={true} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
