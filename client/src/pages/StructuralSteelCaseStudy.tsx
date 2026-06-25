import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSEO } from "@/hooks/useSEO";
import { Volume2, VolumeX, Play, Pause, X, PlayCircle } from "lucide-react";

const images = {
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
};

const galleryGroups = [
  {
    label: "Site Overview",
    items: [
      { src: images.overview1, caption: "The vast open-plan commercial space — dozens of structural steel columns requiring full surface preparation" },
      { src: images.wide1, caption: "Scale of the project: multiple bays of structural steelwork across the entire building footprint" },
      { src: images.wide2, caption: "Open commercial unit showing the column grid and extent of the blasting scope" },
      { src: images.wide3, caption: "Wide view of the site during works — safety barriers and blast equipment in position" },
      { src: images.wide4, caption: "The site from a different angle, showing the full depth of the commercial space" },
    ],
  },
  {
    label: "Before — Existing Coatings",
    items: [
      { src: images.challenge1, caption: "White paint with heavy rust patches — typical condition of the columns before blasting began" },
      { src: images.challenge2, caption: "Blue industrial paint over the upper section, bare metal already achieved on the lower section" },
      { src: images.challenge3, caption: "Rust and peeling paint on a structural column — the condition that required complete removal" },
    ],
  },
  {
    label: "During — Active Blasting Works",
    items: [
      { src: images.process1, caption: "Two operators working simultaneously — one blasting a column base, one working on the adjacent column" },
      { src: images.process2, caption: "Close-up of the team working in tandem — full PPE including blast helmets, hi-vis, and protective suits" },
      { src: images.process3, caption: "Operator working on a column within the main building interior, blast hose and equipment visible" },
      { src: images.overview2, caption: "Active blasting underway — safety cones and barriers in place, full site safety compliance" },
    ],
  },
  {
    label: "Detail — Surface Preparation Progress",
    items: [
      { src: images.detail1, caption: "Vertical close-up showing the blasting progress line — coated section above, clean bare metal below" },
      { src: images.detail2, caption: "Clear contrast between the remaining coating and the freshly blasted surface profile" },
      { src: images.detail3, caption: "Column base freshly blasted to bare metal — the uniform grey surface profile is ideal for coating adhesion" },
      { src: images.detail4, caption: "Another column showing the progress line — consistent surface preparation across all steelwork" },
      { src: images.detail5, caption: "Mid-blast detail showing the transition from coated to clean steel" },
      { src: images.detail6, caption: "Close-up of the surface profile achieved — Sa 2.5 near-white metal standard" },
      { src: images.detail7, caption: "Column base preparation — all mill scale, rust, and paint removed to bare metal" },
      { src: images.detail8, caption: "Multiple columns showing consistent surface preparation across the project" },
      { src: images.detail9, caption: "Surface preparation detail — uniform profile ready for protective coating application" },
      { src: images.detail10, caption: "Column showing the clean, profiled surface achieved by shot blasting" },
      { src: images.detail11, caption: "Consistent surface preparation across the column grid" },
      { src: images.detail12, caption: "Wide view showing the scale of completed surface preparation" },
    ],
  },
];

function LightboxModal({ src, caption, onClose, onPrev, onNext, hasPrev, hasNext }: {
  src: string; caption: string; onClose: () => void;
  onPrev: () => void; onNext: () => void; hasPrev: boolean; hasNext: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl font-light leading-none"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ×
      </button>
      {hasPrev && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-5xl font-light leading-none"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}
      {hasNext && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-5xl font-light leading-none"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
        >
          ›
        </button>
      )}
      <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt={caption}
          className="w-full max-h-[80vh] object-contain rounded-lg"
        />
        {caption && (
          <p className="text-white/80 text-sm text-center mt-3 px-4">{caption}</p>
        )}
      </div>
    </div>
  );
}

export default function StructuralSteelCaseStudy() {
  const [lightbox, setLightbox] = useState<{ src: string; caption: string; allImages: { src: string; caption: string }[]; index: number } | null>(null);
  const [isCaseStudyMuted, setIsCaseStudyMuted] = useState(true);
  const [isCaseStudyPlaying, setIsCaseStudyPlaying] = useState(true);
  const [fullVideoOpen, setFullVideoOpen] = useState(false);
  const [caseStudyProgress, setCaseStudyProgress] = useState(0);
  const [caseStudyDuration, setCaseStudyDuration] = useState(0);
  const [caseStudyHover, setCaseStudyHover] = useState<{ x: number; pct: number } | null>(null);
  const caseStudyVideoRef = useRef<HTMLVideoElement>(null);
  const caseStudyProgressRef = useRef<HTMLDivElement>(null);

  // Track video progress for the progress bar
  useEffect(() => {
    const video = caseStudyVideoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      if (video.duration) setCaseStudyProgress((video.currentTime / video.duration) * 100);
    };
    const onLoadedMetadata = () => setCaseStudyDuration(video.duration);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    if (video.duration) setCaseStudyDuration(video.duration);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  const seekCaseStudyVideo = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = caseStudyProgressRef.current;
    const video = caseStudyVideoRef.current;
    if (!bar || !video || !video.duration) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = pct * video.duration;
    setCaseStudyProgress(pct * 100);
  };

  const onCaseStudyProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = caseStudyProgressRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setCaseStudyHover({ x: e.clientX - rect.left, pct });
  };

  const toggleCaseStudyMute = () => {
    if (caseStudyVideoRef.current) {
      caseStudyVideoRef.current.muted = !caseStudyVideoRef.current.muted;
      setIsCaseStudyMuted(caseStudyVideoRef.current.muted);
    }
  };

  const toggleCaseStudyPlay = () => {
    if (caseStudyVideoRef.current) {
      if (caseStudyVideoRef.current.paused) {
        caseStudyVideoRef.current.play();
        setIsCaseStudyPlaying(true);
      } else {
        caseStudyVideoRef.current.pause();
        setIsCaseStudyPlaying(false);
      }
    }
  };

  useSEO({
    title: "Structural Steel Shot Blasting Case Study | Commercial Building Refurbishment",
    description: "Full case study: shot blasting of structural steel columns across a large commercial building. Complete coating removal to Sa 2.5 standard, ready for protective recoating. View 25 real project photos.",
    canonical: "/case-studies/structural-steel",
    image: images.hero,
  });

  // JSON-LD structured data for SEO
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Commercial Building Structural Steel Shot Blasting — Full Case Study",
      "description": "Full case study documenting the shot blasting of structural steel columns across a large commercial building. Complete coating removal to Sa 2.5 near-white metal standard, ready for protective recoating. 25 real on-site photographs.",
      "image": [
        images.hero,
        images.overview1,
        images.process1,
      ],
      "author": {
        "@type": "Organization",
        "name": "Commercial Shot Blasting",
        "url": "https://commercialshotblasting.co.uk",
        "telephone": "+447970566409"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Commercial Shot Blasting",
        "url": "https://commercialshotblasting.co.uk",
        "logo": {
          "@type": "ImageObject",
          "url": "https://commercialshotblasting.co.uk/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://commercialshotblasting.co.uk/case-studies/structural-steel"
      },
      "about": {
        "@type": "Service",
        "name": "Structural Steel Shot Blasting",
        "serviceType": "Shot Blasting",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Commercial Shot Blasting",
          "url": "https://commercialshotblasting.co.uk",
          "areaServed": "England and Wales"
        }
      },
      "keywords": "structural steel shot blasting, commercial building shot blasting, Sa 2.5 surface preparation, coating removal structural steel, shot blasting case study UK"
    };
    const videoSchema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "Structural Steel Shot Blasting — Commercial Building Refurbishment",
      "description": "15-second clip showing active shot blasting of structural steel columns in a large commercial building. Workers in full PPE blasting to Sa 2.5 near-white metal standard.",
      "thumbnailUrl": images.hero,
      "contentUrl": "/manus-storage/hero_video_15s_4219ca94.mp4",
      "uploadDate": "2026-06-11",
      "duration": "PT15S",
      "publisher": {
        "@type": "Organization",
        "name": "Commercial Shot Blasting",
        "url": "https://commercialshotblasting.co.uk",
        "logo": {
          "@type": "ImageObject",
          "url": "https://commercialshotblasting.co.uk/logo.png"
        }
      },
      "embedUrl": "https://commercialshotblasting.co.uk/case-studies/structural-steel",
      "keywords": "structural steel shot blasting, commercial building, Sa 2.5, coating removal, UK shot blasting"
    };

    // ImageGallery JSON-LD schema — makes all 25 photos eligible for Google image rich results
    const imageGallerySchema = {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": "Structural Steel Shot Blasting — Commercial Building Refurbishment Photo Gallery",
      "description": "25 real on-site photographs documenting the full scope of structural steel shot blasting across a large commercial building. Shows site overview, before condition, active blasting works, and surface preparation detail.",
      "url": "https://commercialshotblasting.co.uk/case-studies/structural-steel",
      "author": {
        "@type": "Organization",
        "name": "Commercial Shot Blasting",
        "url": "https://commercialshotblasting.co.uk"
      },
      "image": [
        { "@type": "ImageObject", "contentUrl": images.hero, "name": "Structural steel column — Sa 2.5 surface achieved, ready for recoating", "description": "Close-up of a structural steel column after shot blasting, showing the near-white metal finish achieved to Sa 2.5 standard" },
        { "@type": "ImageObject", "contentUrl": images.overview1, "name": "Commercial building interior — full column grid requiring surface preparation", "description": "Wide view of the vast open-plan commercial space showing dozens of structural steel columns requiring full surface preparation" },
        { "@type": "ImageObject", "contentUrl": images.overview2, "name": "Active blasting underway — safety compliance on site", "description": "Active blasting underway with safety cones and barriers in place, full site safety compliance" },
        { "@type": "ImageObject", "contentUrl": images.challenge1, "name": "Before: white paint with heavy rust patches on structural column", "description": "White paint with heavy rust patches — typical condition of the columns before blasting began" },
        { "@type": "ImageObject", "contentUrl": images.challenge2, "name": "Before: blue industrial paint over upper section, bare metal on lower section", "description": "Blue industrial paint over the upper section, bare metal already achieved on the lower section" },
        { "@type": "ImageObject", "contentUrl": images.challenge3, "name": "Before: rust and peeling paint requiring complete removal", "description": "Rust and peeling paint on a structural column — the condition that required complete removal" },
        { "@type": "ImageObject", "contentUrl": images.process1, "name": "Two operators blasting simultaneously — structural steel columns", "description": "Two operators working simultaneously — one blasting a column base, one working on the adjacent column" },
        { "@type": "ImageObject", "contentUrl": images.process2, "name": "Shot blasting team in full PPE — blast helmets and protective suits", "description": "Close-up of the team working in tandem — full PPE including blast helmets, hi-vis, and protective suits" },
        { "@type": "ImageObject", "contentUrl": images.process3, "name": "Operator blasting structural steel column — commercial building interior", "description": "Operator working on a column within the main building interior, blast hose and equipment visible" },
        { "@type": "ImageObject", "contentUrl": images.detail1, "name": "Surface preparation detail — coating removal progress on structural steel", "description": "Close-up showing the contrast between the original coating and the blasted near-white metal surface" },
        { "@type": "ImageObject", "contentUrl": images.detail2, "name": "Structural steel column mid-blast — coating and rust removal in progress", "description": "Mid-blast view showing the active removal of coating and rust from a structural steel column" },
        { "@type": "ImageObject", "contentUrl": images.detail3, "name": "Column base detail — Sa 2.5 surface preparation achieved", "description": "Column base showing the clean near-white metal surface achieved after shot blasting" },
        { "@type": "ImageObject", "contentUrl": images.detail4, "name": "Multiple columns blasted — commercial building refurbishment progress", "description": "Multiple columns showing the progression of blasting works across the building" },
        { "@type": "ImageObject", "contentUrl": images.detail5, "name": "Structural steel surface detail — bare metal after coating removal", "description": "Detailed view of the bare metal surface achieved after complete coating removal" },
        { "@type": "ImageObject", "contentUrl": images.detail6, "name": "Shot blasting surface profile — Sa 2.5 near-white metal standard", "description": "Surface profile showing the anchor pattern created by shot blasting, ideal for protective coating adhesion" },
        { "@type": "ImageObject", "contentUrl": images.detail7, "name": "Structural column — full height coating removal completed", "description": "Full height view of a structural column with complete coating removal achieved" },
        { "@type": "ImageObject", "contentUrl": images.detail8, "name": "Column connection detail — blasting around structural joints", "description": "Detail of blasting work around structural connection points and joints" },
        { "@type": "ImageObject", "contentUrl": images.detail9, "name": "Surface preparation quality — consistent Sa 2.5 standard across all columns", "description": "Consistent near-white metal surface quality achieved across multiple columns" },
        { "@type": "ImageObject", "contentUrl": images.detail10, "name": "Structural steel — before and after comparison on single column", "description": "Single column showing the dramatic difference between the original coated surface and the blasted finish" },
        { "@type": "ImageObject", "contentUrl": images.detail11, "name": "Commercial building steel frame — blasting works in progress", "description": "Wide view showing the steel frame of the commercial building with blasting works in progress" },
        { "@type": "ImageObject", "contentUrl": images.detail12, "name": "Shot blasting equipment on site — mobile blasting unit", "description": "Mobile shot blasting equipment positioned on site for the commercial building project" },
        { "@type": "ImageObject", "contentUrl": images.wide1, "name": "Scale of the project — multiple bays of structural steelwork", "description": "Scale of the project: multiple bays of structural steelwork across the entire building footprint" },
        { "@type": "ImageObject", "contentUrl": images.wide2, "name": "Open commercial unit — column grid and blasting scope", "description": "Open commercial unit showing the column grid and extent of the blasting scope" },
        { "@type": "ImageObject", "contentUrl": images.wide3, "name": "Site during works — safety barriers and blast equipment in position", "description": "Wide view of the site during works — safety barriers and blast equipment in position" },
        { "@type": "ImageObject", "contentUrl": images.wide4, "name": "Full depth of commercial space — structural steel blasting project", "description": "The site from a different angle, showing the full depth of the commercial space" }
      ]
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "jsonld-case-study-structural-steel";
    script.textContent = JSON.stringify(schema);
    const videoScript = document.createElement("script");
    videoScript.type = "application/ld+json";
    videoScript.id = "jsonld-case-study-video";
    videoScript.textContent = JSON.stringify(videoSchema);
    const galleryScript = document.createElement("script");
    galleryScript.type = "application/ld+json";
    galleryScript.id = "jsonld-case-study-gallery";
    galleryScript.textContent = JSON.stringify(imageGallerySchema);
    // Remove any existing scripts with these ids before inserting
    const existing = document.getElementById("jsonld-case-study-structural-steel");
    if (existing) existing.remove();
    const existingVideo = document.getElementById("jsonld-case-study-video");
    if (existingVideo) existingVideo.remove();
    const existingGallery = document.getElementById("jsonld-case-study-gallery");
    if (existingGallery) existingGallery.remove();
    document.head.appendChild(script);
    document.head.appendChild(videoScript);
    document.head.appendChild(galleryScript);
    return () => {
      const el = document.getElementById("jsonld-case-study-structural-steel");
      if (el) el.remove();
      const vel = document.getElementById("jsonld-case-study-video");
      if (vel) vel.remove();
      const gel = document.getElementById("jsonld-case-study-gallery");
      if (gel) gel.remove();
    };
  }, []);

  const openLightbox = (allImages: { src: string; caption: string }[], index: number) => {
    setLightbox({ src: allImages[index].src, caption: allImages[index].caption, allImages, index });
  };

  const moveLightbox = (delta: number) => {
    if (!lightbox) return;
    const newIndex = lightbox.index + delta;
    if (newIndex >= 0 && newIndex < lightbox.allImages.length) {
      setLightbox({ ...lightbox, src: lightbox.allImages[newIndex].src, caption: lightbox.allImages[newIndex].caption, index: newIndex });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <video
          ref={caseStudyVideoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
          poster={images.hero}
          preload="auto"
        >
          <source src="/manus-storage/hero_video_15s_4219ca94.mp4" type="video/mp4" />
          {/* Fallback poster image */}
          <img src={images.hero} alt="Structural steel shot blasting — large commercial building refurbishment" className="w-full h-full object-cover" />
        </video>
        {/* Video Controls: Play/Pause + Mute/Unmute */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={toggleCaseStudyPlay}
            aria-label={isCaseStudyPlaying ? "Pause video" : "Play video"}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white transition-all backdrop-blur-sm border border-white/20"
          >
            {isCaseStudyPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleCaseStudyMute}
            aria-label={isCaseStudyMuted ? "Unmute video" : "Mute video"}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white transition-all backdrop-blur-sm border border-white/20"
          >
            {isCaseStudyMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
        {/* Video Progress Bar — seekable with tooltip */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center group/csbar">
          <button
            onClick={toggleCaseStudyPlay}
            aria-label={isCaseStudyPlaying ? "Pause video" : "Play video"}
            className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-black/50 hover:bg-black/70 text-white/80 hover:text-white transition-all"
          >
            {isCaseStudyPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
          <div
            ref={caseStudyProgressRef}
            className="relative flex-1 h-[3px] bg-white/20 cursor-pointer group-hover/csbar:h-[5px] transition-all duration-150"
            onClick={seekCaseStudyVideo}
            onMouseMove={onCaseStudyProgressMouseMove}
            onMouseLeave={() => setCaseStudyHover(null)}
            role="slider"
            aria-label="Video progress"
            aria-valuenow={Math.round(caseStudyProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-amber-400 transition-none"
              style={{ width: `${caseStudyProgress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 opacity-0 group-hover/csbar:opacity-100 transition-opacity -translate-x-1/2 pointer-events-none"
              style={{ left: `${caseStudyProgress}%` }}
            />
            {caseStudyHover && caseStudyDuration > 0 && (
              <div
                className="absolute bottom-5 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap"
                style={{ left: caseStudyHover.x }}
              >
                {(() => {
                  const remaining = caseStudyDuration - caseStudyHover.pct * caseStudyDuration;
                  return remaining < 1 ? "End" : `${Math.ceil(remaining)}s remaining`;
                })()}
              </div>
            )}
          </div>
        </div>
        {/* Play Full Video Button */}
        <button
          onClick={() => setFullVideoOpen(true)}
          aria-label="Play full video"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white text-sm font-medium backdrop-blur-sm border border-white/30 transition-all"
        >
          <PlayCircle className="w-4 h-4" />
          Play full video
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end pb-10 px-6 md:px-12 max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/our-work" className="hover:text-white transition-colors">Our Work</Link>
            <span>/</span>
            <span className="text-white">Structural Steel Case Study</span>
          </nav>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className="bg-amber-500 text-white border-0">Case Study</Badge>
            <Badge variant="outline" className="text-white border-white/40">Structural Steel</Badge>
            <Badge variant="outline" className="text-white border-white/40">Commercial Refurbishment</Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Commercial Building Structural Steel<br className="hidden md:block" /> Shot Blasting
          </h1>
          <p className="text-white/80 text-lg mt-3 max-w-2xl">
            Complete coating removal from all structural steel columns across a large commercial building undergoing full refurbishment — achieved to Sa 2.5 near-white metal standard.
          </p>
        </div>
      </div>

      {/* Full Video Modal */}
      {fullVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setFullVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setFullVideoOpen(false)}
              aria-label="Close video"
              className="absolute top-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <video
              autoPlay
              controls
              playsInline
              className="w-full aspect-video bg-black"
              poster={images.hero}
            >
              <source src="/manus-storage/hero_video_30s_83819d35.mp4" type="video/mp4" />
            </video>
            <div className="bg-slate-900 px-5 py-3">
              <p className="text-white font-semibold text-sm">Structural Steel Shot Blasting — Commercial Building Refurbishment</p>
              <p className="text-white/60 text-xs mt-0.5">Sa 2.5 near-white metal standard · Full building scope · Mobile shot blasting</p>
            </div>
          </div>
        </div>
      )}

      {/* Project Stats Bar */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Project Type", value: "Commercial Refurbishment" },
            { label: "Scope", value: "Full Building — All Columns" },
            { label: "Standard Achieved", value: "Sa 2.5 Near-White Metal" },
            { label: "Service", value: "Mobile Shot Blasting" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-white font-semibold text-sm">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">

        {/* Project Overview */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Project Overview</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                This project involved the complete shot blasting of all structural steel columns throughout a large commercial building undergoing a comprehensive refurbishment programme. The building — a former large-format retail or commercial unit — required full surface preparation of its steel frame prior to the application of a new protective coating system.
              </p>
              <p>
                The structural steelwork had accumulated multiple layers of industrial paint and coating over its service life, with significant rust and corrosion present on many columns. The existing coatings needed to be removed entirely to allow proper structural inspection and to achieve the surface profile required by the new coating specification.
              </p>
              <p>
                Commercial Shot Blasting deployed a team of specialist operators with mobile blasting equipment, working systematically through the building to treat every column from base to full accessible height. All works were carried out in compliance with full site safety requirements, including PPE, containment, and coordination with the main contractor.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img
                src={images.overview1}
                alt="Wide view of the commercial building showing the scale of structural steelwork"
                className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity col-span-2"
                onClick={() => openLightbox([{ src: images.overview1, caption: "The vast open-plan commercial space — dozens of structural steel columns requiring full surface preparation" }, { src: images.wide1, caption: "Scale of the project: multiple bays of structural steelwork" }], 0)}
                loading="lazy"
              />
              <img
                src={images.wide1}
                alt="Multiple bays of structural steelwork across the building"
                className="w-full h-36 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openLightbox([{ src: images.overview1, caption: "Wide view" }, { src: images.wide1, caption: "Scale of the project" }], 1)}
                loading="lazy"
              />
              <img
                src={images.wide3}
                alt="Wide view of the site during works"
                className="w-full h-36 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openLightbox([{ src: images.wide3, caption: "Wide view of the site during works" }], 0)}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <Separator className="mb-14" />

        {/* Challenge */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">The Challenge</h2>
          <p className="text-slate-500 mb-6">Existing coatings, rust, and site complexity</p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { src: images.challenge1, caption: "White paint with heavy rust patches — typical condition of the columns before blasting" },
              { src: images.challenge2, caption: "Blue industrial paint over the upper section — multiple coating layers requiring complete removal" },
              { src: images.challenge3, caption: "Rust and peeling paint — the extent of corrosion that had developed under the existing coatings" },
            ].map((img, i) => (
              <div key={i} className="group cursor-pointer" onClick={() => openLightbox([images.challenge1, images.challenge2, images.challenge3].map((s, j) => ({ src: s, caption: ["White paint with heavy rust patches", "Blue industrial paint — multiple coating layers", "Rust and peeling paint"][j] })), i)}>
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-52 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                  loading="lazy"
                />
                <p className="text-sm text-slate-500 mt-2 leading-snug">{img.caption}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-slate-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-slate-900 mb-3">Surface Condition</h3>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">▸</span>Multiple layers of industrial paint, including blue and white topcoats over primers</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">▸</span>Significant rust and corrosion present on many columns, particularly at the base plates</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">▸</span>Mill scale on some sections of steelwork — incompatible with the new coating specification</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">▸</span>Uneven coating adhesion across the column grid due to varying surface histories</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-slate-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-slate-900 mb-3">Site Complexity</h3>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">▸</span>Active construction site with multiple trades working concurrently</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">▸</span>Large open-plan building with dozens of columns requiring consistent treatment</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">▸</span>Blast media containment required across a large floor area</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">▸</span>Coordination with main contractor programme and access requirements</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="mb-14" />

        {/* Process */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Our Approach</h2>
          <p className="text-slate-500 mb-6">Systematic, safe, and efficient surface preparation</p>
          <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Our team deployed mobile shot blasting equipment and worked systematically through the building, treating each column in sequence. Two operators worked simultaneously to maintain programme efficiency, each equipped with full blast PPE including specialist blast helmets, protective suits, and hi-visibility clothing.
              </p>
              <p>
                We used <strong>iron silicate (copper slag)</strong> as the blasting media throughout this project. Iron silicate is a premium angular abrasive that delivers a consistent Sa 2.5 cleanliness grade and a sharp Rz 50–75 μm anchor profile in a single pass — the surface condition required by the replacement coating specification. Its high hardness and angular particle shape cut through the existing paint layers, rust, and mill scale far more efficiently than rounded steel shot, and its low soluble salt content minimises the risk of under-film corrosion in the finished coating system.
              </p>
              <p>
                Each column was blasted from the base plate upward, ensuring complete removal of all coatings, rust, and mill scale. The base plates — typically the most corroded section — received particular attention to ensure sound metal was exposed for the new coating system.
              </p>
              <p>
                Site safety was maintained throughout, with safety cones, barriers, and exclusion zones established around active blasting areas. All blast media was contained and cleaned up progressively to maintain a safe working environment for other trades on site.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { step: "01", title: "Site Assessment", desc: "Full survey of all columns to assess coating condition, identify problem areas, and plan the blasting sequence." },
                { step: "02", title: "Containment & Safety", desc: "Blast exclusion zones established, safety barriers and cones in place, coordination with site manager." },
                { step: "03", title: "Iron Silicate Blasting", desc: "Two operators working in tandem with iron silicate (copper slag) media, treating each column from base to full accessible height to achieve Sa 2.5 near-white metal." },
                { step: "04", title: "Quality Verification", desc: "Each column inspected after blasting to confirm Sa 2.5 standard achieved before moving on." },
                { step: "05", title: "Media Recovery & Cleanup", desc: "Blast media recovered and disposed of, site left clean and ready for the coating contractor." },
              ].map((s) => (
                <div key={s.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">{s.step}</div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{s.title}</p>
                    <p className="text-slate-600 text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Process photos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: images.process1, caption: "Two operators working simultaneously on adjacent columns" },
              { src: images.process2, caption: "Close-up of the team in full PPE — blast helmets, hi-vis, protective suits" },
              { src: images.process3, caption: "Operator working on a column within the building interior" },
              { src: images.overview2, caption: "Active blasting underway — safety cones and barriers in place" },
            ].map((img, i) => (
              <div key={i} className="group cursor-pointer" onClick={() => openLightbox([images.process1, images.process2, images.process3, images.overview2].map((s, j) => ({ src: s, caption: ["Two operators working simultaneously", "Full PPE — blast helmets, hi-vis, protective suits", "Operator working on a column", "Active blasting underway"][j] })), i)}>
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-36 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                  loading="lazy"
                />
                <p className="text-xs text-slate-500 mt-1.5 leading-snug">{img.caption}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="mb-14" />

        {/* Results */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Results</h2>
          <p className="text-slate-500 mb-6">Sa 2.5 near-white metal achieved across all columns</p>
          <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Every structural steel column across the building was successfully treated to Sa 2.5 near-white metal standard (ISO 8501-1). All existing coatings, rust, mill scale, and surface contamination were completely removed, leaving a clean, profiled surface with the anchor profile required for the replacement coating system.
              </p>
              <p>
                The consistent surface preparation across all columns — visible in the uniform grey bare metal finish in the photographs — ensures that the new protective coating system will achieve full adhesion and provide the long-term corrosion protection required for the refurbished building.
              </p>
              <p>
                The project was completed on programme, with the site handed back to the main contractor clean and ready for the coating contractor to begin work without delay.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 bg-slate-50 rounded-xl p-5 grid grid-cols-2 gap-4">
                {[
                  { metric: "Sa 2.5", label: "Blast standard achieved" },
                  { metric: "100%", label: "Coating removal — no residual paint" },
                  { metric: "All columns", label: "Treated to specification" },
                  { metric: "On programme", label: "Delivered to contractor schedule" },
                ].map((m) => (
                  <div key={m.label} className="text-center">
                    <p className="text-2xl font-bold text-slate-900">{m.metric}</p>
                    <p className="text-xs text-slate-500 mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator className="mb-14" />

        {/* Full Photo Gallery */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Project Photo Gallery</h2>
          <p className="text-slate-500 mb-8">All 25 photos from the project — click any image to view full size</p>
          {galleryGroups.map((group) => (
            <div key={group.label} className="mb-10">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-amber-500 rounded-full inline-block" />
                {group.label}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {group.items.map((img, i) => (
                  <div
                    key={i}
                    className="group cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => openLightbox(group.items, i)}
                  >
                    <img
                      src={img.src}
                      alt={img.caption}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <Separator className="mb-14" />

        {/* Services Used */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Services Delivered</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "Structural Steel Shot Blasting", href: "/services/structural-steel-frames", desc: "Complete surface preparation of structural steel frames and columns." },
              { title: "Coating Removal", href: "/services/coating-removal", desc: "Specialist removal of all coating types including industrial paint and primers." },
              { title: "Rust Removal", href: "/services/rust-removal", desc: "Complete rust removal to bare metal, including heavily corroded base plates." },
              { title: "Mill Scale Removal", href: "/services/mill-scale-removal", desc: "Removal of mill scale to achieve the surface profile required by coating specifications." },
              { title: "Paint Stripping", href: "/services/paint-stripping", desc: "Multi-layer paint stripping from structural steelwork in a single operation." },
              { title: "Mobile Shot Blasting", href: "/services", desc: "On-site service — we brought all equipment to the commercial building." },
            ].map((s) => (
              <Link key={s.href} href={s.href}>
                <Card className="h-full border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="pt-5 pb-5">
                    <h3 className="font-semibold text-slate-900 text-sm mb-1.5">{s.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Have a Similar Structural Steel Project?
          </h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            We provide mobile shot blasting for structural steel across commercial and industrial buildings throughout England and Wales. Contact us for a free site survey and quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white border-0 font-semibold">
                Request Free Site Visit
              </Button>
            </Link>
            <Link href="/our-work">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                View More Projects
              </Button>
            </Link>
          </div>
          <p className="text-white/40 text-sm mt-4">Call us on <a href="tel:07970566409" className="text-white/60 hover:text-white">07970 566409</a> — free site surveys available</p>
        </section>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <LightboxModal
          src={lightbox.src}
          caption={lightbox.caption}
          onClose={() => setLightbox(null)}
          onPrev={() => moveLightbox(-1)}
          onNext={() => moveLightbox(1)}
          hasPrev={lightbox.index > 0}
          hasNext={lightbox.index < lightbox.allImages.length - 1}
        />
      )}
    </div>
  );
}
