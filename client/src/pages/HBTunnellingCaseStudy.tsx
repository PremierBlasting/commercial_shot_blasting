import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  MessageCircle,
  Play,
  ShieldCheck,
  X,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuotePopup } from "@/components/QuotePopup";
import { useSEO } from "@/hooks/useSEO";

const CASE_STUDY_URL = "https://commercialshotblasting.co.uk/case-studies/hb-tunnelling-doncaster";
const VIDEO_URL = "/manus-storage/hb-tunnelling-doncaster-surface-preparation_0f209a96.mp4";
const WHATSAPP_URL = "https://wa.me/447970566409?text=Hello%2C%20I%20am%20interested%20in%20a%20warehouse%20steelwork%20refurbishment%20similar%20to%20the%20HB%20Tunnelling%20Doncaster%20project.%20I%20would%20like%20to%20arrange%20a%20site%20visit.";

const assets = {
  before: "/manus-storage/hb-tunnelling-before_b02e1e81.webp",
  after: "/manus-storage/hb-tunnelling-finished-painted-drone_42119577.webp",
  paintFromAbove: "/manus-storage/hb-tunnelling-painting-from-above_4a7fdaf6.webp",
  coatingDetail: "/manus-storage/hb-tunnelling-coating-detail_97ac043c.jpeg",
  intumescentSteelwork: "/manus-storage/hb-tunnelling-intumescent-steelwork_83670264.jpeg",
  blastingClose: "/manus-storage/hb-tunnelling-video-still-01_a5275ae9.webp",
  contrast: "/manus-storage/hb-tunnelling-video-still-05_47d30d08.webp",
  ppe: "/manus-storage/hb-tunnelling-video-still-08_6c5ce637.webp",
  structure: "/manus-storage/hb-tunnelling-video-still-14_a8042799.webp",
  coating: "/manus-storage/hb-tunnelling-video-still-17_f2a31f5d.webp",
  site: "/manus-storage/hb-tunnelling-video-still-20_b092b929.webp",
  spray: "/manus-storage/hb-tunnelling-video-still-22_6aa77de3.webp",
  aerial: "/manus-storage/hb-tunnelling-video-still-25_e27be683.webp",
};

type GalleryImage = { src: string; alt: string; caption: string };

const processGallery: GalleryImage[] = [
  {
    src: assets.blastingClose,
    alt: "Abrasive blasting work taking place from a mobile elevated work platform",
    caption: "Abrasive blasting underway on the warehouse steelwork.",
  },
  {
    src: assets.ppe,
    alt: "Operator in protective equipment carrying out blasting work on steelwork",
    caption: "Our team preparing the steelwork safely from elevated access equipment.",
  },
  {
    src: assets.structure,
    alt: "Low-angle view of the steel-framed warehouse structure during works",
    caption: "The steel-framed warehouse during the refurbishment works.",
  },
  {
    src: assets.coating,
    alt: "Operator applying a white protective coating from a raised work platform",
    caption: "Protective coating applied once the steelwork had been prepared.",
  },
  {
    src: assets.spray,
    alt: "Close view of spray coating work on prepared steelwork",
    caption: "Coating work in progress after surface preparation.",
  },
  {
    src: assets.aerial,
    alt: "Aerial view of the Doncaster warehouse refurbishment site",
    caption: "Aerial view of the Doncaster warehouse refurbishment site.",
  },
];

const deliverySteps = [
  {
    number: "01",
    title: "Plan the sequence around the refurbishment programme",
    body: "The warehouse was being prepared for use, with roof works and steelwork refurbishment forming part of the same programme. We planned the blasting and coating stages around those linked activities to keep the work moving.",
  },
  {
    number: "02",
    title: "Prepare the exposed steelwork",
    body: "Our team abrasive blasted the exposed steelwork from elevated access equipment, removing corrosion and old coatings and leaving it clean and ready for protection.",
  },
  {
    number: "03",
    title: "Protect freshly prepared surfaces promptly",
    body: "Once the steelwork had been blasted, we applied primer immediately to protect it from flash rust and contamination before the next coating stage.",
  },
  {
    number: "04",
    title: "Coordinate the fire-protection finish",
    body: "We coordinated surface preparation and fireproof paint application in planned stages, simplifying handovers and helping the wider refurbishment programme stay on track.",
  },
];

export default function HBTunnellingCaseStudy() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useSEO({
    title: "HB Tunnelling Doncaster Case Study | Warehouse Steelwork Refurbishment",
    description: "Explore a Doncaster warehouse steelwork refurbishment for HB Tunnelling: abrasive blasting, immediate priming and fireproof paint application coordinated in planned stages. View the project film and before-and-after imagery.",
    canonical: CASE_STUDY_URL,
    image: assets.aerial,
  });

  useEffect(() => {
    if (!activeImage && !videoOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
        setVideoOpen(false);
      }
      if (!activeImage) return;
      if (event.key === "ArrowRight") moveImage(1);
      if (event.key === "ArrowLeft") moveImage(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImage, videoOpen, activeIndex]);

  const openImage = (image: GalleryImage, index: number) => {
    setActiveImage(image);
    setActiveIndex(index);
  };

  const moveImage = (direction: number) => {
    const nextIndex = (activeIndex + direction + processGallery.length) % processGallery.length;
    setActiveIndex(nextIndex);
    setActiveImage(processGallery[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-slate-900" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      <main>
        <section className="relative isolate overflow-hidden bg-[#112f43] text-white">
          <div className="absolute inset-0">
            <img src={assets.aerial} alt="" className="h-full w-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,29,42,0.96)_0%,rgba(12,37,53,0.88)_44%,rgba(12,37,53,0.48)_100%)]" />
          </div>
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-7 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24 lg:px-10">
            <div className="max-w-2xl">
              <div className="mb-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#f1c76e]">
                <span className="rounded-full border border-[#f1c76e]/40 bg-[#f1c76e]/10 px-3 py-1.5">Case study</span>
                <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5">Doncaster</span>
                <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5">Warehouse refurbishment</span>
              </div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#bdd9e8]">HB Tunnelling · Doncaster</p>
              <h1 className="max-w-xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                Steelwork refurbishment built around the programme.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
                A warehouse transformation combining abrasive blasting, prompt primer application and fireproof paint coordination—so the steelwork was ready for the next stage of refurbishment.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => setQuotePopupOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f1c76e] px-5 py-3.5 font-bold text-[#112f43] transition hover:bg-[#f7d98f] active:scale-[0.97]">
                  <CalendarDays className="h-5 w-5" /> Request A Site Visit
                </button>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/10 px-5 py-3.5 font-bold text-white transition hover:bg-white/20 active:scale-[0.97]">
                  <MessageCircle className="h-5 w-5" /> Discuss a similar project
                </a>
              </div>
              <p className="mt-4 text-xs text-white/65">Email campaign visitor? Share photos, drawings or your proposed programme and we will get back to you promptly.</p>
            </div>

            <button onClick={() => setVideoOpen(true)} className="group relative overflow-hidden rounded-2xl border border-white/25 bg-slate-950 text-left shadow-2xl transition hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#f1c76e]/60" aria-label="Play the HB Tunnelling Doncaster project film">
              <img src={assets.contrast} alt="Prepared white steelwork contrasting with untreated steel at the warehouse project" className="aspect-video w-full object-cover opacity-90 transition duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
              <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f1c76e] text-[#112f43]"><Play className="ml-0.5 h-3 w-3 fill-current" /></span>
                Watch project film · 44 sec
              </span>
              <span className="absolute inset-x-5 bottom-5">
                <span className="block text-xl font-bold text-white">From surface preparation to protective finish</span>
                <span className="mt-1 block text-sm text-white/75">Watch blasting, coating and the full site context.</span>
              </span>
            </button>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-slate-200 px-5 sm:px-7 md:grid-cols-4 md:divide-y-0 lg:px-10">
            {[
              ["Project", "Warehouse refurbishment"],
              ["Location", "Doncaster"],
              ["Programme", "6 weeks"],
              ["Contract value", "£150,000"],
            ].map(([label, value]) => (
              <div key={label} className="px-4 py-5 md:px-6 md:py-7">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#2c5f7f]">{label}</p>
                <p className="mt-1 font-semibold text-slate-800">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-7 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-24">
          <aside className="rounded-2xl bg-[#eaf3f6] p-7 lg:p-9">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#2c5f7f]">The brief</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#183c52]" style={{ fontFamily: "'Playfair Display', serif" }}>Prepare the warehouse steelwork for refurbishment.</h2>
            <p className="mt-5 leading-relaxed text-slate-600">HB Tunnelling had recently acquired the Doncaster warehouse and needed the existing steelwork prepared before the building could be brought back into use. The scope included abrasive blasting, prompt priming and fireproof paint application, coordinated with roof works and the wider refurbishment programme.</p>
            <div className="mt-7 border-t border-[#2c5f7f]/15 pt-6">
              <p className="text-sm font-semibold text-[#183c52]">Need a steelwork refurbishment plan that fits your programme?</p>
              <button onClick={() => setQuotePopupOpen(true)} className="mt-3 inline-flex items-center gap-2 font-bold text-[#2c5f7f] hover:text-[#183c52]">
                Request A Site Visit <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </aside>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#2c5f7f]">Why it mattered to the programme</p>
            <h2 className="mt-3 text-3xl font-bold text-[#183c52] sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>A finish is only as dependable as the surface beneath it.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Existing steelwork needed to be cleaned and prepared before its new protective coating could be applied.",
                "Primer protected each freshly blasted area before rust or contamination could affect the coating.",
                "Elevated access and the active refurbishment programme required careful coordination.",
                "One team managed blasting, priming and fireproof-paint coordination, simplifying handovers.",
              ].map((point) => (
                <div key={point} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#b48324]" />
                  <p className="text-sm leading-relaxed text-slate-600">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#183c52] py-16 text-white lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#f1c76e]">The film, frame by frame</p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>Video-derived project evidence across every stage.</h2>
              </div>
              <button onClick={() => setVideoOpen(true)} className="inline-flex items-center gap-2 self-start rounded-lg border border-white/35 px-4 py-3 text-sm font-bold transition hover:bg-white/10">
                <Play className="h-4 w-4 fill-current" /> Play the full project film
              </button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
              {processGallery.map((image, index) => (
                <button key={image.src} onClick={() => openImage(image, index)} className={`group relative overflow-hidden rounded-xl text-left ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`} aria-label={`Open image: ${image.caption}`}>
                  <img src={image.src} alt={image.alt} className={`w-full object-cover transition duration-500 group-hover:scale-105 ${index === 0 ? "aspect-[16/9] h-full" : "aspect-[4/3]"}`} loading={index > 1 ? "lazy" : "eager"} />
                  <span className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />
                  <span className="absolute inset-x-3 bottom-3 text-xs font-semibold leading-snug text-white sm:text-sm">{image.caption}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-7 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#2c5f7f]">Delivery approach</p>
            <h2 className="mt-3 text-3xl font-bold text-[#183c52] sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>A practical sequence from surface preparation to fire protection.</h2>
            <p className="mt-5 leading-relaxed text-slate-600">For HB Tunnelling, the work had to fit the wider warehouse refurbishment. We coordinated the blasting, primer and fireproof-paint stages so each trade could move into the next part of the programme with confidence.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {deliverySteps.map((step) => (
              <article key={step.number} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <span className="absolute right-5 top-3 font-bold text-[5rem] leading-none text-[#eaf3f6]">{step.number}</span>
                <ClipboardCheck className="relative h-8 w-8 text-[#b48324]" />
                <h3 className="relative mt-5 text-xl font-bold text-[#183c52]">{step.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-slate-600">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#2c5f7f]">Visible change</p>
                <h2 className="mt-3 text-3xl font-bold text-[#183c52] sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>From exposed steelwork to a finished painted site.</h2>
                <p className="mt-5 leading-relaxed text-slate-600">The before image and aerial completion image show the change from exposed steelwork to a finished painted site. The detail images show the coating work that followed surface preparation.</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <button onClick={() => setQuotePopupOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-[#183c52] px-5 py-3 font-bold text-white transition hover:bg-[#2c5f7f] active:scale-[0.97]">
                    Plan your Site Visit <ArrowRight className="h-4 w-4" />
                  </button>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[#2c5f7f]/30 px-5 py-3 font-bold text-[#2c5f7f] transition hover:bg-[#eaf3f6] active:scale-[0.97]">
                    <MessageCircle className="h-5 w-5" /> WhatsApp the team
                  </a>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <figure className="overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
                  <img src={assets.before} alt="Steelwork before the supplied refurbishment project" className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  <figcaption className="bg-slate-900 px-4 py-3 text-sm font-semibold text-white">Before: steelwork ahead of surface preparation</figcaption>
                </figure>
                <figure className="overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
                  <img src={assets.after} alt="Finished painted Doncaster warehouse site viewed from above" className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  <figcaption className="bg-[#2c5f7f] px-4 py-3 text-sm font-semibold text-white">After: finished painted site</figcaption>
                </figure>
                <img src={assets.paintFromAbove} alt="Protective coating work shown from above" className="aspect-[16/7] w-full rounded-xl object-cover sm:col-span-2" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f1c76e] py-16 text-[#183c52] lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-7 md:grid-cols-[1fr_auto] md:items-center lg:px-10">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#183c52] text-[#f1c76e]"><ShieldCheck className="h-6 w-6" /></div>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>Planning a steelwork refurbishment, warehouse upgrade or protective coating programme?</h2>
              <p className="mt-4 leading-relaxed text-[#183c52]/85">Tell us what is on site, what has to happen next and when access is available. We can use a Site Visit to understand the surface condition, access, containment, programme and intended handover.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <button onClick={() => setQuotePopupOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#183c52] px-6 py-3.5 font-bold text-white transition hover:bg-[#112f43] active:scale-[0.97]">
                Request A Site Visit <ArrowRight className="h-4 w-4" />
              </button>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#183c52] px-6 py-3.5 font-bold transition hover:bg-[#183c52]/10 active:scale-[0.97]">
                <MessageCircle className="h-5 w-5" /> WhatsApp 07970 566409
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-7 lg:px-10">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { href: "/services/structural-steel-frames", label: "Structural Steel Frames", text: "Explore surface-preparation support for structural steelwork." },
              { href: "/services/intumescent-painting", label: "Intumescent Painting", text: "See how protective coating coordination can fit your programme." },
              { href: "/service-areas/doncaster", label: "Shot Blasting in Doncaster", text: "Explore commercial site-visit support in the Doncaster area." },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2c5f7f]/40 hover:shadow-md">
                <p className="font-bold text-[#183c52] group-hover:text-[#2c5f7f]">{link.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{link.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#2c5f7f]">Explore <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />

      {videoOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/95 p-4" role="dialog" aria-modal="true" aria-label="HB Tunnelling Doncaster project film" onClick={() => setVideoOpen(false)}>
          <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl bg-black shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button onClick={() => setVideoOpen(false)} className="absolute right-3 top-3 z-10 rounded-full bg-black/70 p-2 text-white transition hover:bg-black" aria-label="Close project film"><X className="h-5 w-5" /></button>
            <video autoPlay controls playsInline poster={assets.aerial} className="aspect-video w-full bg-black">
              <source src={VIDEO_URL} type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      {activeImage && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/95 p-4" role="dialog" aria-modal="true" aria-label="Project image gallery" onClick={() => setActiveImage(null)}>
          <div className="relative w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <button onClick={() => setActiveImage(null)} className="absolute -top-12 right-0 rounded-full p-2 text-white transition hover:bg-white/10" aria-label="Close gallery"><X className="h-6 w-6" /></button>
            <img src={activeImage.src} alt={activeImage.alt} className="max-h-[78vh] w-full rounded-xl object-contain" />
            <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-white/80">{activeImage.caption}</p>
            <div className="mt-4 flex justify-center gap-3">
              <button onClick={() => moveImage(-1)} className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10" aria-label="Previous project image"><ChevronLeft className="h-4 w-4" /> Previous</button>
              <button onClick={() => moveImage(1)} className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10" aria-label="Next project image">Next <ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
