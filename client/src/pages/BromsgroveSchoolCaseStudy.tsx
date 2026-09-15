import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { BeforeAfterProjectSlider } from "@/components/BeforeAfterProjectSlider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { useSEO } from "@/hooks/useSEO";

const CASE_STUDY_URL = "https://commercialshotblasting.co.uk/case-studies/bromsgrove-school-staircase";

const assets = {
  beforeVideo: "/manus-storage/bromsgrove-school-staircase-before_96c645cd.mp4",
  before: "/manus-storage/bromsgrove-school-staircase-before-definitive-2026-09-14_dca201c9.png",
  videoStill01: "/manus-storage/bromsgrove-school-before-video-still-01-2026-09-14_8c21d250.jpg",
  videoStill02: "/manus-storage/bromsgrove-school-before-video-still-02-2026-09-14_44c03384.jpg",
  videoStill03: "/manus-storage/bromsgrove-school-before-video-still-03-2026-09-14_c302bcf7.jpg",
  videoStill04: "/manus-storage/bromsgrove-school-before-video-still-04-2026-09-14_c5180565.jpg",
  videoStill05: "/manus-storage/bromsgrove-school-before-video-still-05-2026-09-14_00850011.jpg",
  after: "/manus-storage/bromsgrove-staircase-after_ae521dcd.png",
};

type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  stage: "Before" | "After";
};

const projectGallery: GalleryImage[] = [
  {
    src: assets.before,
    alt: "External metal spiral staircase at Bromsgrove School before restoration",
    caption: "Before: the supplied definitive image records flaking paint and rust-affected areas on the external staircase.",
    stage: "Before",
  },
  {
    src: assets.videoStill01,
    alt: "Bromsgrove School spiral staircase before restoration, from supplied project footage",
    caption: "Before footage: a video-derived view of the recorded staircase condition.",
    stage: "Before",
  },
  {
    src: assets.videoStill02,
    alt: "Bromsgrove School external spiral staircase before restoration, from supplied project footage",
    caption: "Before footage: the supplied video documents the stair structure and existing coating condition.",
    stage: "Before",
  },
  {
    src: assets.videoStill03,
    alt: "Bromsgrove School spiral staircase before restoration, from supplied project footage",
    caption: "Before footage: a recorded view of the stair flights and balustrades before the restoration work.",
    stage: "Before",
  },
  {
    src: assets.videoStill04,
    alt: "Bromsgrove School spiral staircase before restoration, from supplied project footage",
    caption: "Before footage: the supplied video captures the external metalwork ahead of the finished black treatment.",
    stage: "Before",
  },
  {
    src: assets.videoStill05,
    alt: "Bromsgrove School staircase before restoration, from supplied project footage",
    caption: "Before footage: a final video-derived view of the existing staircase before refurbishment.",
    stage: "Before",
  },
  {
    src: assets.after,
    alt: "Finished black external spiral staircase at Bromsgrove School after restoration",
    caption: "After: restored staircase finished in black, with black anti-slip paint applied to the steps.",
    stage: "After",
  },
];

const deliverySteps = [
  {
    number: "01",
    title: "Recorded the existing condition",
    body: "The before images and footage show the external spiral staircase with flaking paint and rust-affected areas across the stair structure and access route.",
  },
  {
    number: "02",
    title: "Restored the weathered steelwork",
    body: "The staircase was brought back to life through the agreed restoration and coating work, addressing the recorded finish condition across the external metalwork.",
  },
  {
    number: "03",
    title: "Applied the finished black coating",
    body: "The completed staircase was painted black, creating a clean, consistent finish across the spiral flights, landings and guardrails.",
  },
  {
    number: "04",
    title: "Added black anti-slip paint to the steps",
    body: "The stair treads received black anti-slip paint as part of the finished staircase treatment.",
  },
];

function formatVideoTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function BromsgroveBeforeVideoPlayer({ onClose }: { onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => () => videoRef.current?.pause(), []);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  const seek = (nextTime: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const replay = async () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setCurrentTime(0);
    try {
      await video.play();
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const closePlayer = () => {
    videoRef.current?.pause();
    onClose();
  };

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-black shadow-2xl" onClick={(event) => event.stopPropagation()}>
      <button onClick={closePlayer} className="absolute right-3 top-3 z-20 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-black/75 p-2 text-white transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-white" aria-label="Close before footage">
        <X className="h-5 w-5" />
      </button>
      <video
        ref={videoRef}
        playsInline
        preload="metadata"
        poster={assets.before}
        className="aspect-[9/16] w-full bg-black"
        onLoadedMetadata={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
      >
        <source src={assets.beforeVideo} type="video/mp4" />
        Your browser does not support this video.
      </video>
      <div className="border-t border-white/15 bg-slate-950 px-3 py-3 text-white sm:px-4">
        <p className="mb-3 text-sm font-semibold">Before footage: recorded staircase condition</p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={togglePlayback} className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full bg-[#f1c76e] text-[#112f43] transition hover:bg-[#f7d98f] focus:outline-none focus:ring-2 focus:ring-white" aria-label={isPlaying ? "Pause before footage" : "Play before footage"}>
            {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
          </button>
          <label className="sr-only" htmlFor="bromsgrove-before-video-progress">Before footage playback position</label>
          <input
            id="bromsgrove-before-video-progress"
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            onChange={(event) => seek(Number(event.target.value))}
            className="h-2 w-full cursor-pointer accent-[#f1c76e]"
            aria-valuetext={`${formatVideoTime(currentTime)} of ${formatVideoTime(duration)}`}
          />
          <span className="min-w-[4.75rem] text-right font-mono text-xs text-white/75" aria-hidden="true">{formatVideoTime(currentTime)} / {formatVideoTime(duration)}</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button type="button" onClick={toggleMute} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/25 px-3 text-sm font-semibold transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white" aria-label={isMuted ? "Unmute before footage" : "Mute before footage"}>
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {isMuted ? "Unmute" : "Mute"}
          </button>
          <button type="button" onClick={replay} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/25 px-3 text-sm font-semibold transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white">
            <RotateCcw className="h-4 w-4" /> Replay
          </button>
          <span className="sr-only" aria-live="polite">Before footage is {isPlaying ? "playing" : "paused"}.</span>
        </div>
      </div>
    </div>
  );
}

export default function BromsgroveSchoolCaseStudy() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useSEO({
    title: "Bromsgrove School Staircase Restoration | Commercial Shot Blasting",
    description: "See the Bromsgrove School external spiral staircase restoration: flaking paint and rust-affected areas restored with a black finish, including black anti-slip paint to the steps.",
    canonical: CASE_STUDY_URL,
    image: assets.after,
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
    const nextIndex = (activeIndex + direction + projectGallery.length) % projectGallery.length;
    setActiveIndex(nextIndex);
    setActiveImage(projectGallery[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-slate-900" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      <main>
        <section className="relative isolate overflow-hidden bg-[#112f43] text-white">
          <div className="absolute inset-0">
            <img src={assets.after} alt="" className="h-full w-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,29,42,0.97)_0%,rgba(12,37,53,0.88)_48%,rgba(12,37,53,0.48)_100%)]" />
          </div>
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-7 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24 lg:px-10">
            <div className="max-w-2xl">
              <div className="mb-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#f1c76e]">
                <span className="rounded-full border border-[#f1c76e]/40 bg-[#f1c76e]/10 px-3 py-1.5">Case study</span>
                <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5">Bromsgrove School</span>
                <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5">External staircase restoration</span>
              </div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#bdd9e8]">Bromsgrove School · Worcestershire</p>
              <h1 className="max-w-xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                Restoring an external spiral staircase with a hard-wearing black finish.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
                The supplied project record shows flaking paint and rust-affected areas across the Bromsgrove School staircase. The restoration brought the structure back to life with a black finish, including black anti-slip paint to the steps.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => setQuotePopupOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f1c76e] px-5 py-3.5 font-bold text-[#112f43] transition hover:bg-[#f7d98f] active:scale-[0.97]">
                  <CalendarDays className="h-5 w-5" /> Request A Site Visit
                </button>
                <button onClick={() => setVideoOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/10 px-5 py-3.5 font-bold text-white transition hover:bg-white/20 active:scale-[0.97]">
                  <Play className="h-5 w-5 fill-current" /> Watch before footage
                </button>
              </div>
              <p className="mt-4 text-xs text-white/65">Share photographs and details of your existing metalwork and we will get back to you promptly.</p>
            </div>

            <button onClick={() => openImage(projectGallery[6], 6)} className="group relative overflow-hidden rounded-2xl border border-white/25 bg-slate-950 text-left shadow-2xl transition hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#f1c76e]/60" aria-label="Open the Bromsgrove School finished staircase image">
              <img src={assets.after} alt="Finished black Bromsgrove School spiral staircase" className="aspect-[3/4] w-full object-cover opacity-95 transition duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
              <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-3 py-2 text-xs font-bold text-white opacity-100 shadow-sm transition sm:opacity-0 sm:group-hover:opacity-100"><Maximize2 className="h-3.5 w-3.5" /> View full-screen</span>
              <span className="absolute inset-x-5 bottom-5">
                <span className="block text-xl font-bold text-white">Black staircase restoration</span>
                <span className="mt-1 block text-sm text-white/75">Finished black coating and black anti-slip paint on the stair treads.</span>
              </span>
            </button>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-slate-200 px-5 sm:px-7 md:grid-cols-4 md:divide-y-0 lg:px-10">
            {[
              ["Project", "External spiral staircase"],
              ["Location", "Bromsgrove, Worcestershire"],
              ["Condition", "Flaking paint and rust-affected areas"],
              ["Finish", "Black coating and anti-slip steps"],
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
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#2c5f7f]">The restoration brief</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#183c52]" style={{ fontFamily: "'Playfair Display', serif" }}>Bring the existing staircase back to a clean, durable black finish.</h2>
            <p className="mt-5 leading-relaxed text-slate-600">The external spiral staircase showed flaking paint and rust in areas. The completed project returned the structure to a finished black appearance and included black anti-slip paint to the steps.</p>
            <div className="mt-7 border-t border-[#2c5f7f]/15 pt-6">
              <p className="text-sm font-semibold text-[#183c52]">Planning a similar staircase or external metalwork refurbishment?</p>
              <button onClick={() => setQuotePopupOpen(true)} className="mt-3 inline-flex items-center gap-2 font-bold text-[#2c5f7f] hover:text-[#183c52]">
                Request A Site Visit <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </aside>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#2c5f7f]">The recorded delivery sequence</p>
            <h2 className="mt-3 text-3xl font-bold text-[#183c52] sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>From weathered external access to a finished black staircase.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "The supplied before record captures flaking paint and rust-affected areas across the stair structure.",
                "The restoration returned the staircase to a clean black finish across the visible external metalwork.",
                "The completed work includes black anti-slip paint on the steps.",
                "The final image documents the completed staircase against the existing brick building.",
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
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#f1c76e]">Before the restoration</p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>Supplied project footage and images showing the original staircase condition.</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/75">Select any staircase image to view it full-screen. Use the on-screen controls or the left and right arrow keys to move through the project gallery.</p>
              </div>
              <button onClick={() => setVideoOpen(true)} className="inline-flex items-center gap-2 self-start rounded-lg border border-white/35 px-4 py-3 text-sm font-bold transition hover:bg-white/10">
                <Play className="h-4 w-4 fill-current" /> Play before footage
              </button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
              {projectGallery.slice(0, 6).map((image, index) => (
                <button key={image.src} onClick={() => openImage(image, index)} className={`group relative overflow-hidden rounded-xl text-left ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`} aria-label={`Open image: ${image.caption}`}>
                  <img src={image.src} alt={image.alt} className={`w-full object-cover transition duration-500 group-hover:scale-105 ${index === 0 ? "aspect-[3/4] h-full" : "aspect-[3/4]"}`} loading={index > 1 ? "lazy" : "eager"} />
                  <span className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />
                  <span className="absolute left-3 top-3 rounded bg-slate-950/75 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">Before</span>
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded bg-slate-950/75 px-2 py-1 text-[11px] font-bold text-white"><Maximize2 className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Full-screen</span></span>
                  <span className="absolute inset-x-3 bottom-3 text-xs font-semibold leading-snug text-white sm:text-sm">{image.caption}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-7 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#2c5f7f]">What we delivered</p>
            <h2 className="mt-3 text-3xl font-bold text-[#183c52] sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>A visible staircase restoration, with a black finish underfoot and overhead.</h2>
            <p className="mt-5 leading-relaxed text-slate-600">The completed after image records the full staircase restored in black. The steps were also finished with black anti-slip paint as part of the agreed work.</p>
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
                <h2 className="mt-3 text-3xl font-bold text-[#183c52] sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>From flaking paint and rust-affected areas to a completed black staircase.</h2>
                <p className="mt-5 leading-relaxed text-slate-600">The supplied before record and completed after image show the change across the same external spiral staircase. The finished project includes a black coating treatment and black anti-slip paint on the steps.</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <button onClick={() => setQuotePopupOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-[#183c52] px-5 py-3 font-bold text-white transition hover:bg-[#2c5f7f] active:scale-[0.97]">
                    Plan your Site Visit <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link href="/services/external-staircases" className="inline-flex items-center gap-2 rounded-lg border border-[#2c5f7f]/30 px-5 py-3 font-bold text-[#2c5f7f] transition hover:bg-[#eaf3f6] active:scale-[0.97]">
                    Explore staircase work <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <BeforeAfterProjectSlider
                beforeImage={assets.before}
                afterImage={assets.after}
                title="Bromsgrove School external spiral staircase"
                caption="Drag the divider to compare the supplied definitive Before image with the approved finished After image. The completed black treatment includes black anti-slip paint on the steps."
                aspectRatio="portrait"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#f1c76e] py-16 text-[#183c52] lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-7 md:grid-cols-[1fr_auto] md:items-center lg:px-10">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#183c52] text-[#f1c76e]"><ShieldCheck className="h-6 w-6" /></div>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>Planning an external staircase or steelwork restoration?</h2>
              <p className="mt-4 leading-relaxed text-[#183c52]/85">Tell us about the existing condition, access, number of flights or landings, and the finish you need. A Site Visit lets us review the practical scope with you.</p>
            </div>
            <button onClick={() => setQuotePopupOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#183c52] px-6 py-3.5 font-bold text-white transition hover:bg-[#112f43] active:scale-[0.97]">
              Request A Site Visit <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-7 lg:px-10">
          <div className="mb-5 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#2c5f7f]">Related staircase work</p>
            <h2 className="mt-2 text-2xl font-bold text-[#183c52]" style={{ fontFamily: "'Playfair Display', serif" }}>Continue exploring external access-steel projects and services.</h2>
            <Link href="/our-work?category=Staircases#staircases" className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#2c5f7f]/25 bg-white px-4 py-2 text-sm font-bold text-[#2c5f7f] transition hover:border-[#2c5f7f] hover:bg-[#eaf3f6] focus:outline-none focus:ring-2 focus:ring-[#2c5f7f] focus:ring-offset-2">
              More staircase work <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { href: "/services/external-staircases", label: "External Staircases", text: "Explore commercial staircase preparation and restoration support." },
              { href: "/services/fire-escapes", label: "Fire Escapes & Stair Towers", text: "Explore surface-preparation support for external fire-escape and access-steel structures." },
              { href: "/industrial-steelwork-restoration", label: "Industrial Steelwork Restoration", text: "Plan surface condition, access and finish requirements for weathered steelwork." },
              { href: "/service-areas/bromsgrove", label: "Shot Blasting in Bromsgrove", text: "Explore commercial Site Visit support in the Bromsgrove area." },
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
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/95 p-4" role="dialog" aria-modal="true" aria-label="Bromsgrove School staircase before footage" onClick={() => setVideoOpen(false)}>
          <BromsgroveBeforeVideoPlayer onClose={() => setVideoOpen(false)} />
        </div>
      )}

      {activeImage && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/95 p-4" role="dialog" aria-modal="true" aria-label="Bromsgrove School staircase image gallery" onClick={() => setActiveImage(null)}>
          <div className="relative w-full max-w-3xl" onClick={(event) => event.stopPropagation()}>
            <button onClick={() => setActiveImage(null)} className="absolute right-3 top-3 z-10 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-slate-950/85 p-2 text-white transition hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Close full-screen image gallery"><X className="h-6 w-6" /></button>
            <img src={activeImage.src} alt={activeImage.alt} className="max-h-[78vh] w-full rounded-xl object-contain" />
            <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-white/80"><span className="mr-2 rounded bg-white/15 px-2 py-1 text-xs font-bold uppercase tracking-wide text-white">{activeImage.stage}</span>{activeImage.caption}</p>
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
