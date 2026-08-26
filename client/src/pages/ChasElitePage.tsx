import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, ClipboardCheck, FileText, ShieldCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { QuotePopup } from "@/components/QuotePopup";
import { useSEO } from "@/hooks/useSEO";

const assurancePoints = [
  {
    title: "A recognised pre-qualification route",
    description: "CHAS describes Elite membership as a route to completing the Common Assessment Standard through one recognised assessment process.",
  },
  {
    title: "Relevant to commercial buying teams",
    description: "The Common Assessment Standard is intended to provide a consistent pre-qualification benchmark for construction and related supply chains.",
  },
  {
    title: "Project requirements still come first",
    description: "Every scope is reviewed individually. Access, containment, surface condition, coating requirements, programme, and project documents remain essential to planning.",
  },
];

export default function ChasElitePage() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useSEO({
    title: "CHAS Elite Assurance | Commercial Shot Blasting",
    description: "Commercial Shot Blasting is the commercial shot blasting arm of Premier Blasting, which holds CHAS Elite status. Learn what this means for commercial project planning.",
    canonical: "https://commercialshotblasting.co.uk/chas-elite",
  });

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      <main>
        <section className="bg-gradient-to-br from-[#1a3d52] via-[#2C5F7F] to-[#25546f] py-16 text-white md:py-24">
          <div className="container max-w-5xl">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "CHAS Elite Assurance", href: "/chas-elite", isCurrentPage: true }]} className="mb-8 text-white/75 [&_a]:text-white/75 [&_span]:text-white" />
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold">
                <ShieldCheck className="h-4 w-4" />
                CHAS Elite assurance pathway
              </div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#B8D4E3]">Commercial Shot Blasting, part of Premier Blasting</p>
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                CHAS Elite assurance for commercial surface-preparation planning
              </h1>
              <p className="text-lg leading-relaxed text-white/90">
                Commercial Shot Blasting is the commercial shot blasting arm of Premier Blasting. Premier Blasting holds CHAS Elite status, giving commercial clients a recognised pre-qualification route alongside a properly scoped site visit and project review.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => setQuotePopupOpen(true)} className="rounded-lg bg-white px-5 py-3 font-semibold text-[#1a3d52] transition hover:bg-white/90">
                  Request A Site Visit
                </button>
                <Link href="/contact?request=capability-statement" className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
                  <FileText className="h-4 w-4" /> Request capability statement
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F5F1E8] py-12">
          <div className="container grid gap-5 md:grid-cols-3">
            {assurancePoints.map((point) => (
              <article key={point.title} className="rounded-xl border border-[#2C5F7F]/15 bg-white p-6 shadow-sm">
                <ClipboardCheck className="mb-4 h-8 w-8 text-[#2C5F7F]" />
                <h2 className="mb-2 text-lg font-bold text-[#1a3d52]">{point.title}</h2>
                <p className="text-sm leading-relaxed text-gray-600">{point.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container grid max-w-6xl gap-12 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="mb-2 font-semibold text-[#2C5F7F]">What this means for your enquiry</p>
              <h2 className="mb-5 text-3xl font-bold text-[#1a3d52]" style={{ fontFamily: "'Playfair Display', serif" }}>Assurance should support—not replace—project planning</h2>
              <p className="mb-5 leading-relaxed text-gray-600">
                For fabricators, principal contractors, facilities teams, and asset owners, pre-qualification information can be an important part of selecting a contractor. It sits alongside the practical project information needed to plan blast cleaning safely and effectively: asset details, site access, existing surface condition, operating constraints, drawings, photographs, and the intended coating or next stage.
              </p>
              <p className="mb-7 leading-relaxed text-gray-600">
                We use the Site Visit process to understand those project-specific requirements. CHAS Elite status does not make a project automatically compliant or confirm a particular preparation standard; the relevant scope, specification, and controls must always be agreed for the work in question.
              </p>
              <Link href="/site-survey" className="inline-flex items-center gap-2 font-semibold text-[#2C5F7F] hover:text-[#1a3d52]">
                Plan a Site Visit <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <aside className="rounded-2xl bg-[#1a3d52] p-7 text-white shadow-lg">
              <ShieldCheck className="mb-4 h-9 w-9 text-[#E8B84A]" />
              <h2 className="mb-3 text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Need supplier information?</h2>
              <p className="mb-6 text-sm leading-relaxed text-white/80">
                Request the current Commercial Shot Blasting capability statement for your project file, tender process, or internal review. We will provide the approved document once it is available for your enquiry.
              </p>
              <Link href="/contact?request=capability-statement" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-bold text-[#1a3d52] transition hover:bg-[#F5F1E8]">
                <FileText className="h-4 w-4" /> Request capability statement
              </Link>
            </aside>
          </div>
        </section>

        <section className="border-t border-gray-100 bg-white py-16">
          <div className="container max-w-5xl">
            <p className="mb-2 text-center font-semibold text-[#2C5F7F]">Frequently asked questions</p>
            <h2 className="mb-8 text-center text-3xl font-bold text-[#1a3d52]" style={{ fontFamily: "'Playfair Display', serif" }}>CHAS Elite and your commercial project</h2>
            <div className="space-y-4">
              <details className="rounded-xl border border-gray-200 p-5">
                <summary className="cursor-pointer font-semibold text-[#1a3d52]">Who holds CHAS Elite status?</summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">Premier Blasting holds CHAS Elite status. Commercial Shot Blasting is Premier Blasting’s commercial shot blasting arm and uses that relationship within its commercial assurance pathway.</p>
              </details>
              <details className="rounded-xl border border-gray-200 p-5">
                <summary className="cursor-pointer font-semibold text-[#1a3d52]">Does CHAS Elite replace a project-specific assessment?</summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">No. The asset, access, surface condition, coating requirements, programme, and any project documentation still need to be reviewed for the individual scope.</p>
              </details>
              <details className="rounded-xl border border-gray-200 p-5">
                <summary className="cursor-pointer font-semibold text-[#1a3d52]">How do I request a capability statement?</summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">Use the request button on this page or contact the team with your project details. The current approved document will be supplied when available for your enquiry.</p>
              </details>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
    </div>
  );
}
