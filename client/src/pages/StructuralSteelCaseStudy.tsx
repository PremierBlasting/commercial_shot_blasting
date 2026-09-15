import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Maximize2,
  ShieldCheck,
  Timer,
  X,
} from "lucide-react";
import { BeforeAfterProjectSlider } from "@/components/BeforeAfterProjectSlider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { useSEO } from "@/hooks/useSEO";

const CASE_STUDY_PATH = "/case-studies/iss-property-former-bakkavor-foods-facility-wigan";
const CASE_STUDY_URL = `https://commercialshotblasting.co.uk${CASE_STUDY_PATH}`;

const images = {
  before: "/manus-storage/iss-property-former-bakkavor-wigan-before-2026-09-15_a00636db.png",
  after: "/manus-storage/iss-property-former-bakkavor-wigan-after-2026-09-15_21aa25d4.png",
};

const legacyProjectMedia = {
  hero: "/manus-storage/IMG_3365_56728af1.webp",
  overview1: "/manus-storage/IMG_3363_b23b32da.webp",
  overview2: "/manus-storage/IMG_3291_59833f26.webp",
  challenge1: "/manus-storage/IMG_3339_a869318b.webp",
  challenge2: "/manus-storage/IMG_3355_362d1f7f.webp",
  challenge3: "/manus-storage/IMG_3349_cb9e8c4d.webp",
  process1: "/manus-storage/IMG_3292_7bee69d3.webp",
  process2: "/manus-storage/IMG_3293_6ba36e99.webp",
  process3: "/manus-storage/IMG_3334_2858c684.webp",
  detail1: "/manus-storage/IMG_3354_caa39ac3.webp",
  detail2: "/manus-storage/IMG_3350_31ece4f3.webp",
  detail3: "/manus-storage/IMG_3335_66ca0def.webp",
  detail4: "/manus-storage/IMG_3340_d53be3b8.webp",
  detail5: "/manus-storage/IMG_3341_2a6bee76.webp",
  detail6: "/manus-storage/IMG_3342_aa872ff8.webp",
  detail7: "/manus-storage/IMG_3343_ac1c8682.webp",
  detail8: "/manus-storage/IMG_3346_8ac6e144.webp",
  detail9: "/manus-storage/IMG_3351_e881450f.webp",
  detail10: "/manus-storage/IMG_3353_30cb94a2.webp",
  detail11: "/manus-storage/IMG_3356_0e439bba.webp",
  detail12: "/manus-storage/IMG_3357_75c3a571.webp",
  wide1: "/manus-storage/IMG_3358_fa5ea2cf.webp",
  wide2: "/manus-storage/IMG_3359_d748791d.webp",
  wide3: "/manus-storage/IMG_3360_63bedb19.webp",
  wide4: "/manus-storage/IMG_3366_af09464b.webp",
  previewVideo: "/manus-storage/hero_video_15s_4219ca94.mp4",
  fullVideo: "/manus-storage/hero_video_30s_83819d35.mp4",
};

type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  stage: "Before" | "After" | "Supporting project image";
};

const projectGallery: GalleryImage[] = [
  {
    src: images.before,
    alt: "Former Bakkavor Foods Facility in Wigan before the structural-steel preparation work",
    caption: "Before: the supplied project image records the existing coated structural steelwork at the former Bakkavor Foods facility.",
    stage: "Before",
  },
  {
    src: images.after,
    alt: "ISS Property Former Bakkavor Foods Facility structural steelwork in Wigan after the delivered preparation and coating sequence",
    caption: "After: the supplied project image records the structural steelwork after the project’s preparation and fire-protection coating sequence.",
    stage: "After",
  },
];

const legacyGalleryGroups: Array<{ label: string; items: GalleryImage[] }> = [
  {
    label: "Site overview",
    items: [
      { src: legacyProjectMedia.hero, alt: "Structural steel within the former facility", caption: "Previously published project image: structural steel within the former facility.", stage: "Supporting project image" },
      { src: legacyProjectMedia.overview1, alt: "Open-plan building space with structural steel columns", caption: "Previously published project image: open-plan building space and structural steel columns.", stage: "Supporting project image" },
      { src: legacyProjectMedia.wide1, alt: "Multiple bays of structural steelwork", caption: "Previously published project image: multiple bays of structural steelwork across the building footprint.", stage: "Supporting project image" },
      { src: legacyProjectMedia.wide2, alt: "Commercial unit showing the structural steel column grid", caption: "Previously published project image: column grid and the extent of the structural steelwork.", stage: "Supporting project image" },
      { src: legacyProjectMedia.wide3, alt: "Site view during works with barriers in position", caption: "Previously published project image: site view during works with safety barriers and equipment in position.", stage: "Supporting project image" },
      { src: legacyProjectMedia.wide4, alt: "Commercial space showing the depth of the building", caption: "Previously published project image: a second view showing the depth of the commercial space.", stage: "Supporting project image" },
    ],
  },
  {
    label: "Existing coatings and steel condition",
    items: [
      { src: legacyProjectMedia.challenge1, alt: "Structural steel column with existing coating and rust patches", caption: "Previously published project image: existing coating and rust patches on a structural steel column.", stage: "Supporting project image" },
      { src: legacyProjectMedia.challenge2, alt: "Structural steel column showing existing industrial coating", caption: "Previously published project image: existing industrial coating on structural steelwork.", stage: "Supporting project image" },
      { src: legacyProjectMedia.challenge3, alt: "Structural steel column with rust and peeling paint", caption: "Previously published project image: rust and peeling paint on a structural steel column.", stage: "Supporting project image" },
    ],
  },
  {
    label: "Active preparation works",
    items: [
      { src: legacyProjectMedia.process1, alt: "Operators working on structural steel columns", caption: "Previously published project image: operators working on adjacent structural steel columns.", stage: "Supporting project image" },
      { src: legacyProjectMedia.process2, alt: "Team wearing blast PPE during structural steel preparation", caption: "Previously published project image: team members in blast PPE during preparation work.", stage: "Supporting project image" },
      { src: legacyProjectMedia.process3, alt: "Operator preparing a structural steel column", caption: "Previously published project image: operator preparing a column within the building interior.", stage: "Supporting project image" },
      { src: legacyProjectMedia.overview2, alt: "Active site work with barriers in place", caption: "Previously published project image: active work area with safety cones and barriers in place.", stage: "Supporting project image" },
    ],
  },
  {
    label: "Surface preparation progress",
    items: [
      { src: legacyProjectMedia.detail1, alt: "Structural steel column showing preparation progress", caption: "Previously published project image: preparation progress on a structural steel column.", stage: "Supporting project image" },
      { src: legacyProjectMedia.detail2, alt: "Structural steel showing remaining coating and a prepared surface", caption: "Previously published project image: contrast between the existing coating and freshly prepared steelwork.", stage: "Supporting project image" },
      { src: legacyProjectMedia.detail3, alt: "Prepared structural steel column base", caption: "Previously published project image: prepared structural steel column base.", stage: "Supporting project image" },
      { src: legacyProjectMedia.detail4, alt: "Structural steel column at an intermediate preparation stage", caption: "Previously published project image: consistent preparation progress on structural steelwork.", stage: "Supporting project image" },
      { src: legacyProjectMedia.detail5, alt: "Structural steel during surface preparation", caption: "Previously published project image: structural steel during surface preparation.", stage: "Supporting project image" },
      { src: legacyProjectMedia.detail6, alt: "Close-up of a prepared structural steel surface", caption: "Previously published project image: close-up of the prepared structural steel surface.", stage: "Supporting project image" },
      { src: legacyProjectMedia.detail7, alt: "Prepared structural steel column base", caption: "Previously published project image: column base after surface preparation.", stage: "Supporting project image" },
      { src: legacyProjectMedia.detail8, alt: "Multiple structural steel columns under preparation", caption: "Previously published project image: multiple columns showing a consistent prepared condition.", stage: "Supporting project image" },
      { src: legacyProjectMedia.detail9, alt: "Prepared structural steel surface profile", caption: "Previously published project image: prepared structural steel surface profile.", stage: "Supporting project image" },
      { src: legacyProjectMedia.detail10, alt: "Prepared structural steel column", caption: "Previously published project image: prepared structural steel column.", stage: "Supporting project image" },
      { src: legacyProjectMedia.detail11, alt: "Structural steel column grid under preparation", caption: "Previously published project image: structural steel column grid under preparation.", stage: "Supporting project image" },
      { src: legacyProjectMedia.detail12, alt: "Wide view of surface preparation progress", caption: "Previously published project image: wide view of surface preparation progress.", stage: "Supporting project image" },
    ],
  },
];

const allGalleryImages = [...projectGallery, ...legacyGalleryGroups.flatMap((group) => group.items)];

const deliveryStages = [
  {
    number: "01",
    title: "Measured the scope at site survey",
    body: "A comprehensive site survey and measurement of the steel sections allowed the team to calculate blasting time and programme the work efficiently.",
  },
  {
    number: "02",
    title: "Prepared structural steel to Sa 2.5",
    body: "The structural steelwork at the former Bakkavor Foods facility was prepared to an Sa 2.5 surface finish ahead of the specified fire-protection coating stage.",
  },
  {
    number: "03",
    title: "Protected the freshly prepared steel",
    body: "Shot blasting was followed immediately by the application of a certified primer and topcoat to meet the fire-protection specification and prevent flash rusting.",
  },
  {
    number: "04",
    title: "Worked around the weather window",
    body: "Some steel sections were exposed to the elements. Extended hours and weekend shifts made use of favourable weather conditions while maintaining the planned delivery sequence.",
  },
];

function ProjectImageLightbox({ image, index, onClose, onMove }: {
  image: GalleryImage;
  index: number;
  onClose: () => void;
  onMove: (direction: number) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="ISS Property Wigan project image gallery"
      onMouseDown={onClose}
    >
      <div className="relative w-full max-w-6xl" onMouseDown={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-slate-950/85 p-2 text-white transition hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close full-screen image gallery"
        >
          <X className="h-6 w-6" />
        </button>
        <img src={image.src} alt={image.alt} className="max-h-[76vh] w-full rounded-xl object-contain" />
        <div className="mx-auto mt-4 max-w-3xl text-center text-sm text-white/85">
          <span className={`mr-2 rounded px-2 py-1 text-xs font-bold uppercase tracking-wide ${image.stage === "Before" ? "bg-amber-400 text-[#112f43]" : "bg-[#2c5f7f] text-white"}`}>{image.stage}</span>
          {image.caption}
        </div>
        <div className="mt-4 flex items-center justify-center gap-3">
          <button type="button" onClick={() => onMove(-1)} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/25 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Previous project image">
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <span className="text-sm text-white/70" aria-live="polite">{index + 1} of {allGalleryImages.length}</span>
          <button type="button" onClick={() => onMove(1)} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/25 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Next project image">
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StructuralSteelCaseStudy() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useSEO({
    title: "ISS Property Former Bakkavor Foods Facility, Wigan | Case Study",
    description: "Read how structural steel at ISS Property’s former Bakkavor Foods Facility in Wigan was prepared to Sa 2.5 before fire-protection coating, with a programmed one-stop blasting and coating sequence.",
    canonical: CASE_STUDY_URL,
    image: images.after,
  });

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") setActiveIndex((current) => current === null ? null : (current + allGalleryImages.length - 1) % allGalleryImages.length);
      if (event.key === "ArrowRight") setActiveIndex((current) => current === null ? null : (current + 1) % allGalleryImages.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  const moveImage = (direction: number) => {
    setActiveIndex((current) => current === null ? null : (current + direction + allGalleryImages.length) % allGalleryImages.length);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-slate-900" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      <main>
        <section className="relative isolate overflow-hidden bg-[#112f43] pb-14 pt-14 text-white sm:pb-20 sm:pt-18">
          <div className="absolute inset-0 opacity-30" aria-hidden="true">
            <img src={images.after} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#112f43] via-[#112f43]/90 to-[#112f43]/60" />
          </div>
          <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-white/75" aria-label="Breadcrumb">
              <Link href="/" className="transition hover:text-white">Home</Link><span aria-hidden="true">/</span>
              <Link href="/our-work" className="transition hover:text-white">Our Work</Link><span aria-hidden="true">/</span>
              <span className="text-white">ISS Property Wigan</span>
            </nav>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.76fr] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#f1c76e]">Case study · Wigan</p>
                <h1 className="mt-3 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl" style={{ fontFamily: "'Playfair Display', serif" }}>ISS Property — Former Bakkavor Foods Facility</h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">A programmed one-stop structural-steel preparation and fire-protection coating sequence, delivered at the former Bakkavor Foods facility in Wigan.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button type="button" onClick={() => setQuotePopupOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-[#f1c76e] px-5 py-3 font-bold text-[#112f43] transition hover:bg-[#f7d98f] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#112f43]">
                    Request A Site Visit <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link href="#project-images" className="inline-flex items-center gap-2 rounded-lg border border-white/35 px-5 py-3 font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white">
                    View project images <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                {projectGallery.map((image, index) => (
                  <button key={image.src} type="button" onClick={() => setActiveIndex(index)} className="group relative overflow-hidden rounded-xl text-left shadow-xl focus:outline-none focus:ring-4 focus:ring-[#f1c76e]/70" aria-label={`Open full-screen ${image.stage.toLowerCase()} project image`}>
                    <img src={image.src} alt={image.alt} className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105" loading={index === 0 ? "eager" : "lazy"} />
                    <span className={`absolute left-3 top-3 rounded px-2.5 py-1 text-xs font-bold uppercase tracking-wide shadow-sm ${image.stage === "Before" ? "bg-[#f1c76e] text-[#112f43]" : "bg-[#2c5f7f] text-white"}`}>{image.stage}</span>
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded bg-slate-950/75 px-2 py-1 text-[11px] font-bold text-white"><Maximize2 className="h-3.5 w-3.5" /> Full-screen</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-0 px-5 sm:px-7 lg:grid-cols-4 lg:px-10">
            {[
              { label: "Project", value: "Former Bakkavor Foods Facility" },
              { label: "Location", value: "Wigan" },
              { label: "Contract value", value: "£40,000" },
              { label: "Recorded duration", value: "150 hours" },
            ].map((item) => (
              <div key={item.label} className="border-r border-slate-200 py-5 pr-4 last:border-r-0 sm:py-6 sm:pr-6">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{item.label}</p>
                <p className="mt-1 text-sm font-bold text-[#183c52] sm:text-base">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-7 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#2c5f7f]">The brief</p>
              <h2 className="mt-3 text-3xl font-bold text-[#183c52] sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>A fire-protection coating sequence depended on the steelwork being prepared first.</h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-slate-600">
              <p>ISS Property required the structural steelwork at the former Bakkavor Foods facility to be prepared to an Sa 2.5 surface finish before the specified intumescent fire-protection coating stage.</p>
              <p>With some steel sections exposed to the elements, weather conditions were a significant consideration. The project required a coordinated one-stop solution: shot blasting followed immediately by the application of a certified primer and topcoat to meet the fire-protection specification and prevent flash rusting.</p>
            </div>
          </div>
        </section>

        <section id="project-images" className="border-y border-slate-200 bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#2c5f7f]">Before and after</p>
                <h2 className="mt-3 text-3xl font-bold text-[#183c52] sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>See the supplied project images side by side.</h2>
                <p className="mt-5 leading-relaxed text-slate-600">Drag the divider to compare the supplied before and after project images. Select either image to open the full-screen gallery.</p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {projectGallery.map((image, index) => (
                    <button key={image.src} type="button" onClick={() => setActiveIndex(index)} className="group overflow-hidden rounded-xl border border-slate-200 bg-[#f8f7f4] text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2c5f7f] focus:ring-offset-2" aria-label={`Open full-screen ${image.stage.toLowerCase()} image`}>
                      <img src={image.src} alt={image.alt} className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
                      <span className="flex items-center justify-between px-3 py-2 text-sm font-bold text-[#183c52]"><span>{image.stage} image</span><Maximize2 className="h-4 w-4 text-[#2c5f7f]" /></span>
                    </button>
                  ))}
                </div>
              </div>
              <BeforeAfterProjectSlider beforeImage={images.before} afterImage={images.after} title="ISS Property — Former Bakkavor Foods Facility, Wigan" caption="Drag the divider to compare the supplied before image with the supplied after image from the Wigan project." />
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-[#eef5f7] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#2c5f7f]">Project films</p>
                <h2 className="mt-3 text-3xl font-bold text-[#183c52] sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>Previously published footage from the structural-steel work.</h2>
                <p className="mt-5 leading-relaxed text-slate-600">The original project videos have been retained as supporting media beneath the supplied Wigan before-and-after lead images. Use the player controls to watch either version without autoplay.</p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#183c52] shadow-sm"><ShieldCheck className="h-4 w-4 text-[#2c5f7f]" /> Native playback controls available</div>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <video controls playsInline preload="metadata" poster={legacyProjectMedia.hero} className="aspect-video w-full bg-slate-950">
                    <source src={legacyProjectMedia.previewVideo} type="video/mp4" />
                    Your browser does not support HTML video.
                  </video>
                  <div className="p-4"><p className="font-bold text-[#183c52]">Project film preview</p><p className="mt-1 text-sm text-slate-600">Previously published short project video.</p></div>
                </article>
                <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <video controls playsInline preload="metadata" poster={legacyProjectMedia.hero} className="aspect-video w-full bg-slate-950">
                    <source src={legacyProjectMedia.fullVideo} type="video/mp4" />
                    Your browser does not support HTML video.
                  </video>
                  <div className="p-4"><p className="font-bold text-[#183c52]">Extended project film</p><p className="mt-1 text-sm text-slate-600">Previously published longer project video.</p></div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-7 lg:px-10 lg:py-24">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#2c5f7f]">Supporting project gallery</p>
              <h2 className="mt-3 text-3xl font-bold text-[#183c52] sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>The complete previously published project image collection.</h2>
              <p className="mt-4 leading-relaxed text-slate-600">All supporting images from the former structural-steel case-study page are retained here. Select an image to view it full-screen and browse the full collection with the keyboard or on-screen controls.</p>
            </div>
            <span className="rounded-full border border-[#2c5f7f]/20 bg-[#eef5f7] px-4 py-2 text-sm font-bold text-[#183c52]">{legacyGalleryGroups.reduce((total, group) => total + group.items.length, 0)} supporting images</span>
          </div>
          <div className="mt-12 space-y-12">
            {legacyGalleryGroups.map((group, groupIndex) => {
              const groupStart = projectGallery.length + legacyGalleryGroups.slice(0, groupIndex).reduce((total, previousGroup) => total + previousGroup.items.length, 0);
              return (
                <section key={group.label} aria-labelledby={`gallery-group-${groupIndex}`}>
                  <h3 id={`gallery-group-${groupIndex}`} className="flex items-center gap-3 text-xl font-bold text-[#183c52]"><span className="h-7 w-1 rounded-full bg-[#f1c76e]" />{group.label}</h3>
                  <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                    {group.items.map((image, imageIndex) => (
                      <button key={image.src} type="button" onClick={() => setActiveIndex(groupStart + imageIndex)} className="group relative overflow-hidden rounded-xl bg-slate-200 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2c5f7f] focus:ring-offset-2" aria-label={`Open full-screen image: ${image.alt}`}>
                        <img src={image.src} alt={image.alt} className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
                        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded bg-slate-950/75 px-2 py-1 text-[11px] font-bold text-white"><Maximize2 className="h-3.5 w-3.5" /> View</span>
                      </button>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-7 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#2c5f7f]">Delivery approach</p>
            <h2 className="mt-3 text-3xl font-bold text-[#183c52] sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>Site survey, surface preparation and protective coating planned as one package.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {deliveryStages.map((stage) => (
              <article key={stage.number} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <span className="absolute right-5 top-3 font-bold text-[5rem] leading-none text-[#eaf3f6]">{stage.number}</span>
                <ClipboardCheck className="relative h-8 w-8 text-[#b48324]" />
                <h3 className="relative mt-5 text-xl font-bold text-[#183c52]">{stage.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-slate-600">{stage.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#183c52] py-16 text-white lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-7 md:grid-cols-[1fr_auto] md:items-center lg:px-10">
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap gap-3 text-sm font-bold text-[#f1c76e]"><span className="inline-flex items-center gap-2"><Timer className="h-4 w-4" /> Completed in 10 days</span><span className="inline-flex items-center gap-2"><Check className="h-4 w-4" /> Five days ahead of programme</span></div>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>Need structural steel preparation and coating handover planned together?</h2>
              <p className="mt-4 leading-relaxed text-white/80">Request a Site Visit to discuss steel condition, access, exposure, required surface standard, programme and coating handover for your project.</p>
            </div>
            <button type="button" onClick={() => setQuotePopupOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f1c76e] px-6 py-3.5 font-bold text-[#112f43] transition hover:bg-[#f7d98f] focus:outline-none focus:ring-2 focus:ring-white">
              Request A Site Visit <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-7 lg:px-10">
          <div className="mb-5 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#2c5f7f]">Continue exploring</p>
            <h2 className="mt-2 text-2xl font-bold text-[#183c52]" style={{ fontFamily: "'Playfair Display', serif" }}>Planning a structural steel or fire-protection package?</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { href: "/services/structural-steel-frames", label: "Structural Steel Frames", text: "Explore commercial surface-preparation support for structural steelwork." },
              { href: "/services/intumescent-painting", label: "Intumescent Painting", text: "Plan preparation and coating handover for fire-protection work." },
              { href: "/service-areas/wigan", label: "Shot Blasting in Wigan", text: "Explore commercial Site Visit support in the Wigan area." },
              { href: "/our-work", label: "More completed work", text: "Browse evidence-led commercial project examples." },
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
      {activeIndex !== null && <ProjectImageLightbox image={allGalleryImages[activeIndex]} index={activeIndex} onClose={() => setActiveIndex(null)} onMove={moveImage} />}
    </div>
  );
}
