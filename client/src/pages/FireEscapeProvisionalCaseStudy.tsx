import { useEffect, useState } from "react";
import { Link } from "wouter";
import { AlertTriangle, ArrowRight, CalendarDays, Check, ImageOff } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { useSEO } from "@/hooks/useSEO";

const CASE_STUDY_URL = "https://commercialshotblasting.co.uk/case-studies/fire-escape-multi-storey-office";
const placeholderImage = "/manus-storage/fireescape1before_b56bfae9.jpg";

export default function FireEscapeProvisionalCaseStudy() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useSEO({
    title: "Fire Escape Project Record (Provisional) | Commercial Shot Blasting",
    description: "A provisional record for a multi-storey office fire-escape restoration. Final approved project media will be added when available.",
    canonical: CASE_STUDY_URL,
    image: placeholderImage,
  });

  useEffect(() => {
    const existing = document.querySelector('meta[name="robots"]');
    const previousContent = existing?.getAttribute("content") ?? null;
    const robots = existing ?? document.createElement("meta");
    const wasCreated = !existing;
    if (wasCreated) {
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, follow");

    return () => {
      if (wasCreated) robots.remove();
      else if (previousContent) robots.setAttribute("content", previousContent);
      else robots.removeAttribute("content");
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-slate-900" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      <main>
        <section className="relative isolate overflow-hidden bg-[#112f43] text-white">
          <div className="absolute inset-0">
            <img src={placeholderImage} alt="" className="h-full w-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,29,42,0.98)_0%,rgba(12,37,53,0.9)_55%,rgba(12,37,53,0.64)_100%)]" />
          </div>
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-7 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24 lg:px-10">
            <div className="max-w-2xl">
              <div className="mb-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.15em]">
                <span className="rounded-full border border-[#f1c76e]/50 bg-[#f1c76e]/10 px-3 py-1.5 text-[#f1c76e]">Provisional project record</span>
                <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-white/85">Fire escape work</span>
              </div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#bdd9e8]">Multi-storey office</p>
              <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl" style={{ fontFamily: "'Playfair Display', serif" }}>Fire Escape Restoration — Multi-Storey Office</h1>
              <p className="mt-6 text-lg leading-relaxed text-white/85">This provisional project page records a multi-storey office fire-escape restoration while the final approved project image and video set is being prepared.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => setQuotePopupOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f1c76e] px-5 py-3.5 font-bold text-[#112f43] transition hover:bg-[#f7d98f] active:scale-[0.97]">
                  <CalendarDays className="h-5 w-5" /> Request A Site Visit
                </button>
                <Link href="/services/fire-escapes" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/10 px-5 py-3.5 font-bold text-white transition hover:bg-white/20 active:scale-[0.97]">
                  Explore fire escape work <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-slate-950 shadow-2xl">
              <img src={placeholderImage} alt="Non-project-specific placeholder service image for fire-escape surface preparation" className="aspect-[4/3] w-full object-cover" />
              <div className="border-t border-white/10 bg-slate-950 p-5">
                <div className="flex gap-3">
                  <ImageOff className="mt-0.5 h-5 w-5 shrink-0 text-[#f1c76e]" />
                  <p className="text-sm leading-relaxed text-white/80"><strong className="text-white">Placeholder service image.</strong> This image is not presented as media from the individual office fire-escape project. Approved project photography and video will replace it when supplied.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-slate-200 px-5 sm:px-7 md:grid-cols-4 md:divide-y-0 lg:px-10">
            {[
              ["Project", "External fire escape"],
              ["Setting", "Multi-storey office"],
              ["Recorded work", "Rust and failed coating removal"],
              ["Media status", "Final set pending approval"],
            ].map(([label, value]) => (
              <div key={label} className="px-4 py-5 md:px-6 md:py-7">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#2c5f7f]">{label}</p>
                <p className="mt-1 font-semibold text-slate-800">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-7 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-24">
          <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-7 lg:p-9">
            <AlertTriangle className="h-8 w-8 text-amber-700" />
            <h2 className="mt-5 text-3xl font-bold text-[#183c52]" style={{ fontFamily: "'Playfair Display', serif" }}>Project media is still being approved.</h2>
            <p className="mt-4 leading-relaxed text-slate-700">This page deliberately does not use the placeholder image as project evidence and does not make final programme, client, compliance, or outcome claims. It will be expanded when the approved project media and verified detail are available.</p>
          </aside>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#2c5f7f]">What is recorded today</p>
            <h2 className="mt-3 text-3xl font-bold text-[#183c52] sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>A transparent starting point for a fire-escape project record.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "The existing project summary identifies a multi-storey office external fire escape.",
                "The recorded scope includes removal of rust and failed coatings.",
                "The full approved project-media set has not yet been supplied for publication.",
                "Until then, the relevant fire-escape service route provides broader planning information.",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#b48324]" />
                  <p className="text-sm leading-relaxed text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#eaf3f6] py-14">
          <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#2c5f7f]">More access-steel work</p>
            <h2 className="mt-2 text-3xl font-bold text-[#183c52]" style={{ fontFamily: "'Playfair Display', serif" }}>Explore related staircase and fire-escape routes.</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {[
                { href: "/services/fire-escapes", title: "Fire Escapes & Stair Towers", text: "Explore service planning for external fire escapes and access steelwork." },
                { href: "/external-staircases", title: "External Staircases", text: "See external-staircase surface-preparation information and published work." },
                { href: "/our-work?category=Staircases#staircases", title: "More Staircase Work", text: "Browse the Staircases filter and its published project records." },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="group rounded-xl border border-[#2c5f7f]/15 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2c5f7f]/40 hover:shadow-md">
                  <p className="font-bold text-[#183c52] group-hover:text-[#2c5f7f]">{link.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{link.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#2c5f7f]">Explore <ArrowRight className="h-4 w-4" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
    </div>
  );
}
