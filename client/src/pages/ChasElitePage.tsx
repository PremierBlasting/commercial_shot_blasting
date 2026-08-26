import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, ClipboardCheck, FileText, ShieldCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuotePopup } from "@/components/QuotePopup";
import { useSEO } from "@/hooks/useSEO";

const assurancePoints = [
  {
    title: "A recognised safety pre-qualification standard",
    description: "CHAS Elite enables Premier Blasting to complete the Common Assessment Standard through one consistent assessment. The standard covers 13 risk-management areas.",
  },
  {
    title: "A more confident procurement starting point",
    description: "For commercial buyers, it provides evidence that recognised pre-qualification checks have been completed before project-specific information is reviewed.",
  },
  {
    title: "More focus on your actual project",
    description: "With supplier assurance information available, discussions can focus on access, containment, surface condition, programme, coating handover, and the controls your site needs.",
  },
];

export default function ChasElitePage() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useSEO({
    title: "CHAS Elite: What It Means for Your Project | Commercial Shot Blasting",
    description: "See how Premier Blasting’s CHAS Elite status can support safety pre-qualification, procurement readiness, and project planning for Commercial Shot Blasting clients.",
    canonical: "https://commercialshotblasting.co.uk/chas-elite",
  });

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      <main>
        <section className="bg-gradient-to-br from-[#1a3d52] via-[#2C5F7F] to-[#25546f] py-16 text-white md:py-24">
          <div className="container max-w-5xl">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold">
                <ShieldCheck className="h-4 w-4" />
                CHAS Elite assurance pathway
              </div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#B8D4E3]">Commercial Shot Blasting, part of Premier Blasting</p>
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                What CHAS Elite can mean for your commercial project
              </h1>
              <p className="text-lg leading-relaxed text-white/90">
                Commercial Shot Blasting is the commercial shot blasting arm of Premier Blasting. Premier Blasting holds CHAS Elite status, helping give your team a recognised safety pre-qualification starting point before we focus on the practical controls, access, programme, and surface-preparation scope for your site.
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
              <p className="mb-2 font-semibold text-[#2C5F7F]">What this means for your team</p>
              <h2 className="mb-5 text-3xl font-bold text-[#1a3d52]" style={{ fontFamily: "'Playfair Display', serif" }}>Less uncertainty at the supplier-review stage</h2>
              <p className="mb-5 leading-relaxed text-gray-600">
                For fabricators, principal contractors, facilities teams, and asset owners, pre-qualification information can be an important part of reviewing a supplier. CHAS Elite gives your team a recognised assurance reference to include in your procurement or project file, so the conversation can move sooner to the practical information needed to plan blast cleaning safely and effectively.
              </p>
              <p className="mb-7 leading-relaxed text-gray-600">
                We still use the Site Visit process to understand your asset, site access, existing surface condition, operating constraints, drawings, photographs, and intended coating or next stage. CHAS Elite does not make a project automatically compliant or confirm a particular preparation standard; the right scope, specification, and controls must always be agreed for the individual project.
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
                <summary className="cursor-pointer font-semibold text-[#1a3d52]">What safety criteria does CHAS Elite relate to?</summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">CHAS describes the Common Assessment Standard as covering 13 risk-management areas through a consistent assessment process. It gives your procurement team a recognised pre-qualification reference, but it does not replace project-specific risk assessment, method statements, access planning, or agreed site controls.</p>
              </details>
              <details className="rounded-xl border border-gray-200 p-5">
                <summary className="cursor-pointer font-semibold text-[#1a3d52]">Can it help our procurement process?</summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">It can support your supplier-review and tender-file process by providing a recognised pre-qualification reference. Your organisation should still apply its own procurement requirements and confirm the documentation needed for the individual contract.</p>
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
