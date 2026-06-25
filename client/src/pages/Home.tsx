import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Shield, Clock, Award, Users, Star, Quote, X, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { useState, useMemo, useEffect, useRef, lazy, Suspense } from "react";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StaticServiceAreasMap } from "@/components/StaticServiceAreasMap";
import { ResponsiveHeroBackground } from "@/components/ResponsiveHeroBackground";
import { trpc } from "@/lib/trpc";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ProjectDetailModal, type ProjectDetailItem } from "@/components/ProjectDetailModal";
import { BeforeAfterCard } from "@/components/BeforeAfterCard";

// Below-the-fold components: lazy-loaded to reduce initial JS bundle and improve LCP
const HubSpotForm = lazy(() => import("@/components/HubSpotForm").then(m => ({ default: m.HubSpotForm })));
const BlogPreview = lazy(() => import("@/components/BlogPreview").then(m => ({ default: m.BlogPreview })));
const BeforeAfterSlider = lazy(() => import("@/components/BeforeAfterSlider").then(m => ({ default: m.BeforeAfterSlider })));
const ServiceSelector = lazy(() => import("@/components/ServiceSelector"));
const HomeFAQ = lazy(() => import("@/components/HomeFAQ"));
const CaseStudies = lazy(() => import("@/components/CaseStudies").then(m => ({ default: m.CaseStudies })));
const ReviewCarousel = lazy(() => import("@/components/ReviewCarousel").then(m => ({ default: m.ReviewCarousel })));

const testimonials = [
  {
    id: 1,
    name: "Jordan King",
    company: "Factory Owner",
    rating: 5,
    text: "Really happy with this team. Our factory cladding had original plastisol and multiple layers of paint. It turned out to be a much more difficult job than expected but Graham didn't let us down and put in extra hours to make sure we stayed in budget. The surfaces were left flawless and we're looking forward to painting.",
    project: "Factory Cladding Blasting",
    images: [
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/hFzlTbJdSBeiAVgW.webp",
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/tTeWEGasRhVPEMxU.webp",
    ],
    isNew: true,
  },
];

export default function Home() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [projectCategory, setProjectCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedProject, setSelectedProject] = useState<ProjectDetailItem | null>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(-1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [progressHover, setProgressHover] = useState<{ x: number; pct: number } | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Track video progress for the progress bar
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      if (video.duration) setVideoProgress((video.currentTime / video.duration) * 100);
    };
    const onLoadedMetadata = () => setVideoDuration(video.duration);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    if (video.duration) setVideoDuration(video.duration);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  const seekVideo = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressBarRef.current;
    const video = heroVideoRef.current;
    if (!bar || !video || !video.duration) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = pct * video.duration;
    setVideoProgress(pct * 100);
  };

  const onProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressBarRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setProgressHover({ x: e.clientX - rect.left, pct });
  };

  const toggleMute = () => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = !heroVideoRef.current.muted;
      setIsMuted(heroVideoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (heroVideoRef.current) {
      if (heroVideoRef.current.paused) {
        heroVideoRef.current.play();
        setIsPlaying(true);
      } else {
        heroVideoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Set SEO title and meta description
  useEffect(() => {
    document.title = "Shot Blasting Services UK | Commercial & Industrial | Commercial Shot Blasting";
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'UK-wide mobile shot blasting services for commercial and industrial clients. Rust removal, surface preparation, structural steel, factory cladding, floor prep & more. Site visit. Call 07970 566409.');

    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'shot blasting, commercial shot blasting, industrial shot blasting, surface preparation, steel blasting, concrete blasting, metal blasting, UK shot blasting services, grit blasting, abrasive blasting');

    // Set canonical URL for homepage
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://commercialshotblasting.co.uk';

    // WebSite + SiteLinksSearchBox JSON-LD
    const websiteSchemaId = 'home-website-schema';
    let websiteEl = document.getElementById(websiteSchemaId);
    if (!websiteEl) {
      websiteEl = document.createElement('script');
      websiteEl.id = websiteSchemaId;
      (websiteEl as HTMLScriptElement).type = 'application/ld+json';
      document.head.appendChild(websiteEl);
    }
    websiteEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Commercial Shot Blasting',
      'url': 'https://commercialshotblasting.co.uk',
      'description': 'UK-wide mobile shot blasting services for commercial and industrial clients.',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': 'https://commercialshotblasting.co.uk/sitemap?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    });

    // VideoObject JSON-LD for the homepage hero video
    const videoSchemaId = 'home-hero-video-schema';
    let videoEl = document.getElementById(videoSchemaId);
    if (!videoEl) {
      videoEl = document.createElement('script');
      videoEl.id = videoSchemaId;
      (videoEl as HTMLScriptElement).type = 'application/ld+json';
      document.head.appendChild(videoEl);
    }
    videoEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      'name': 'Commercial Shot Blasting Services — UK Industrial Surface Preparation',
      'description': '30-second showreel of commercial and industrial shot blasting work across the UK. Rust removal, coating removal, and surface preparation for structural steel, factory cladding, and machinery.',
      'thumbnailUrl': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/YScoptyBJOkODpiP.webp',
      'contentUrl': '/manus-storage/hero_video_30s_83819d35.mp4',
      'uploadDate': '2026-06-11',
      'duration': 'PT30S',
      'publisher': {
        '@type': 'Organization',
        'name': 'Commercial Shot Blasting',
        'url': 'https://commercialshotblasting.co.uk',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://commercialshotblasting.co.uk/logo.png'
        }
      },
      'embedUrl': 'https://commercialshotblasting.co.uk',
      'keywords': 'shot blasting, commercial shot blasting, industrial shot blasting, surface preparation, UK'
    });

    return () => {
      const s = document.getElementById(websiteSchemaId);
      if (s) s.remove();
      const v = document.getElementById(videoSchemaId);
      if (v) v.remove();
    };
  }, []);

  const openQuotePopup = () => setQuotePopupOpen(true);

  // Fetch testimonials from database
  const { data: dbTestimonials } = trpc.testimonials.list.useQuery();

  // Fetch gallery items for the homepage preview
  const { data: dbGalleryItems } = trpc.gallery.list.useQuery();

  // Category-to-service mapping (DB categories: Agriculture, Automotive, Gates, Industrial, Staircases)
  const CATEGORY_SERVICE_MAP: Record<string, string> = {
    "Industrial": "/services/structural-steel-frames",
    "Agriculture": "/services/plant-machinery",
    "Agricultural": "/services/plant-machinery",
    "Gates": "/services/steel-gates",
    "Automotive": "/services/commercial-vehicles",
    "Staircases": "/services/staircases",
    "Marine": "/services/plant-machinery",
    "Commercial": "/services/factory-cladding",
    "Containers": "/services/steel-containers",
    "Floors": "/services/floor-preparation",
    "Radiators": "/services/commercial-radiators",
    "Roller Shutters": "/services/steel-doors",
    "Cladding": "/services/factory-cladding",
    "Tanks": "/services/steel-containers",
    "Fire Escapes": "/services/fire-escapes",
    "Structural": "/services/structural-steel-frames",
  };

  // All non-duplicate projects (excluding those already shown in Case Studies)
  const allUniqueProjects = useMemo(() => {
    if (dbGalleryItems && dbGalleryItems.length > 0) {
      const caseStudyTitles = new Set([
        "Warehouse Cladding Restoration",
        "Steel Roller Shutter Restoration",
        "Large Steel Tank Restoration",
        "Commercial Radiator Restoration",
        "Commercial Gate Restoration",
        "Heavy-Duty Vehicle Wheel Restoration",
        "Heavy-Duty Commercial Vehicle Wheels",
        "Complete Chassis Restoration",
        "Farm Barn Shot Blasting",
        "Agricultural Building Restoration",
        "Marine Diesel Engine Block Restoration",
        "Marine Engine Block — Side Profile",
      ]);
      return dbGalleryItems
        .filter(item => !caseStudyTitles.has(item.title))
        .map(item => ({
          id: item.id,
          title: item.title,
          category: item.category,
          description: item.description || '',
          before: item.beforeImage,
          after: item.afterImage,
          beforeImage: item.beforeImage,
          afterImage: item.afterImage,
          serviceHref: CATEGORY_SERVICE_MAP[item.category] || "/services",
        }));
    }
    return [];
  }, [dbGalleryItems]);

  // Unique categories for filter pills
  const projectCategories = useMemo(() => {
    const cats = Array.from(new Set(allUniqueProjects.map(p => p.category)));
    return ["All", ...cats.sort()];
  }, [allUniqueProjects]);

  // Filtered list (all matching category)
  const filteredProjects = useMemo(() => {
    if (projectCategory === "All") return allUniqueProjects;
    return allUniqueProjects.filter(p => p.category === projectCategory);
  }, [allUniqueProjects, projectCategory]);

  // Visible slice for Load More
  const featuredProjects = useMemo(() => filteredProjects.slice(0, visibleCount), [filteredProjects, visibleCount]);
  // Use database data if available, otherwise use static fallback
  const displayTestimonials = useMemo(() => {
    if (dbTestimonials && dbTestimonials.length > 0) {
      return dbTestimonials.map(item => ({
        id: item.id,
        name: item.name,
        company: item.company || '',
        rating: item.rating,
        text: item.text,
        project: item.project || '',
        images: item.images as string[] | undefined,
        isNew: item.isNew,
      }));
    }
    return testimonials;
  }, [dbTestimonials]);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxImage(images[index]);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxImages([]);
    setLightboxIndex(0);
  };

  const nextImage = () => {
    const newIndex = (lightboxIndex + 1) % lightboxImages.length;
    setLightboxIndex(newIndex);
    setLightboxImage(lightboxImages[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    setLightboxIndex(newIndex);
    setLightboxImage(lightboxImages[newIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Header */}
      <Header onOpenQuotePopup={openQuotePopup} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-20 lg:py-32 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30 sm:opacity-40"
            poster="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/YScoptyBJOkODpiP.webp"
            preload="auto"
          >
            <source src="/manus-storage/hero_video_30s_83819d35.mp4" type="video/mp4" />
            {/* Fallback: static image carousel for browsers that can't play video */}
            <ResponsiveHeroBackground />
          </video>
        </div>
        {/* Video Controls: Play/Pause + Mute/Unmute */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white transition-all backdrop-blur-sm border border-white/20"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white transition-all backdrop-blur-sm border border-white/20"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a3d52]/80 via-[#2C5F7F]/60 to-transparent"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-white/70 text-sm font-medium tracking-wide mb-4">
              <span className="w-4 h-px bg-white/40"></span>
              The Commercial &amp; Industrial Arm of Premier Blasting
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services for Commercial & Industrial Projects Across the UK
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              UK-wide mobile shot blasting services for commercial and industrial clients. We remove rust, mill scale, paint, and coatings from structural steel, factory cladding, machinery, and more — delivered to your site, anywhere in England and Wales.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90" onClick={openQuotePopup}>
                Request A Site Visit
              </Button>
              <Link href="/our-work">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  View Our Work
                </Button>
              </Link>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <a href="tel:07970566409" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
        {/* Video Progress Bar — seekable with tooltip */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center group/bar">
          {/* Play/Pause mini toggle integrated into bar area */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-black/50 hover:bg-black/70 text-white/80 hover:text-white transition-all"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
          {/* Seekable track */}
          <div
            ref={progressBarRef}
            className="relative flex-1 h-[3px] bg-white/20 cursor-pointer group-hover/bar:h-[5px] transition-all duration-150"
            onClick={seekVideo}
            onMouseMove={onProgressMouseMove}
            onMouseLeave={() => setProgressHover(null)}
            role="slider"
            aria-label="Video progress"
            aria-valuenow={Math.round(videoProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-amber-400 transition-none"
              style={{ width: `${videoProgress}%` }}
            />
            {/* Scrub knob — visible on hover */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 opacity-0 group-hover/bar:opacity-100 transition-opacity -translate-x-1/2 pointer-events-none"
              style={{ left: `${videoProgress}%` }}
            />
            {/* Time-remaining tooltip */}
            {progressHover && videoDuration > 0 && (
              <div
                className="absolute bottom-5 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap"
                style={{ left: progressHover.x }}
              >
                {(() => {
                  const remaining = videoDuration - progressHover.pct * videoDuration;
                  return remaining < 1 ? "End" : `${Math.ceil(remaining)}s remaining`;
                })()}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service Selector Tool */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Find Your Perfect Service</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Not Sure Which Service You Need?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Answer a few quick questions and we'll recommend the best shot blasting services for your specific project requirements.
            </p>
          </div>
          <Suspense fallback={<div className="h-32" />}><ServiceSelector /></Suspense>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Expert Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Comprehensive Shot Blasting Services
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              From structural steel and factory cladding to floor preparation and powder coating — our mobile shot blasting services cover every commercial and industrial application.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Structural Steel Frames", desc: "Comprehensive shot blasting for building frames, roof trusses, and load-bearing steel structures. Prepare surfaces for galvanizing or protective coatings.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/sUfXaBUgQWNMAvEc.webp", link: "/services/structural-steel-frames" },
              { title: "Steel Container Blasting", desc: "Specialist shot blasting for shipping containers, storage tanks, and steel structures. Remove rust and coatings to restore containers for repainting or long-term reuse.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/bGsCKoWjNMKfOhKj.webp", link: "/services/steel-containers" },
              { title: "Factory & Warehouse Cladding", desc: "Specialist cladding restoration removing plastisol and paint layers from factory and industrial building panels.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/GmdvvhZjrHfYtOVb.webp", link: "/services/factory-cladding" },
              { title: "Fire Escapes & External Stair Towers", desc: "Specialist surface preparation for fire safety infrastructure. Remove rust and corrosion, ensuring compliance with safety regulations.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oySJrMBHyyuJOevk.webp", link: "/services/fire-escapes" },
              { title: "Internal Steel Staircases, Balustrades & Handrails", desc: "Precision shot blasting for architectural metalwork. Restore heritage features or prepare new fabrications for finishing.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/TLjFQFhDhVdFaDwj.webp", link: "/services/staircases" },
              { title: "Bridge Steelwork (Girders, Crossmembers, Parapet Rails)", desc: "Comprehensive surface preparation for bridge infrastructure. Meet highway and railway bridge coating specifications.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/cuwoxubhXPpGCUSf.webp", link: "/services/bridge-steelwork" },
              { title: "Fixed Ladders & Step-Over Platforms", desc: "Comprehensive surface preparation for industrial access systems. Ensure compliance with working at height regulations.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yXusfqsGJHZwuETv.webp", link: "/services/ladders" },
              { title: "Warehouse Racking & Pallet Rack Frames", desc: "Professional shot blasting for warehouse racking systems, pallet rack frames, and storage infrastructure.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/WmoactuoGfwMmVwl.webp", link: "/services/warehouse-racking" },
              { title: "Process Pipework, Spools & Manifolds", desc: "Precision cleaning of industrial pipework systems. Ideal for food processing, pharmaceutical, and chemical industries.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/eqezEvtOwgDSGsCT.webp", link: "/services/pipework" },
              { title: "Telecom Masts & Lattice Towers", desc: "Specialist shot blasting for telecommunications infrastructure including masts, lattice towers, and antenna supports.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/XLIXJyIInSTPQjlE.webp", link: "/services/telecom-towers" },
              { title: "Floor Preparation & Shot Blasting", desc: "Professional floor surface preparation for commercial and industrial facilities, removing coatings and creating ideal surface profiles.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/YMGizlSGgTjDQAyi.webp", link: "/services/floor-preparation" },
              { title: "Shot Blasting & Powder Coating", desc: "End-to-end metal surface solutions combining shot blasting with premium powder coating application.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/NpTRkKdXbfRWbnOl.webp", link: "/services/powder-coating" },
              { title: "Commercial Radiators", desc: "Professional restoration for cast iron and steel radiators in commercial buildings and heritage properties.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/nVyZGEbqdoYwEDMv.webp", link: "/services/commercial-radiators" },
              { title: "Commercial Vehicles", desc: "Heavy-duty restoration for farm trucks, warehouse vehicles, and industrial transport equipment including chassis and wheels.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/NtAgxBOsLSxEcmau.webp", link: "/services/commercial-vehicles" },
              { title: "Steel Doors & Roller Shutters", desc: "Professional restoration for industrial doors, warehouse roller shutters, security doors, and commercial access systems.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/EOszbYQwsYrTFvjN.webp", link: "/services/steel-doors" },
              { title: "Steel Sheeting", desc: "Professional surface preparation for steel sheets, panels, and flat metal products used in construction and manufacturing.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/QXdidJpwgjaMnlmb.webp", link: "/services/steel-sheeting" },
              { title: "Steel Gates & Railings", desc: "Precision restoration for commercial and industrial entrance gates, perimeter railings, and decorative metalwork.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/dIVmiYILOzXbQFlg.webp", link: "/services/steel-gates" },
              { title: "Plant & Machinery", desc: "On-site shot blasting for construction equipment, agricultural machinery, and industrial plant without transportation.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/symRlOinndpZEzlR.webp", link: "/services/plant-machinery" },
            ].map((service, i) => (
              <ScrollReveal key={i} delay={Math.min(i % 3, 2) * 80}>
              <Link href={service.link}>
                <Card className="group overflow-hidden hover:shadow-lg transition-shadow h-full cursor-pointer">
                  <div className="h-48 overflow-hidden">
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-0 transition-opacity duration-500" loading="lazy" decoding="async"
                  width={800}
                  height={600}
                  onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.desc}</p>
                    <span className="inline-flex items-center text-[#2C5F7F] font-medium group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="py-20 bg-gradient-to-br from-[#1a3d52] to-[#2C5F7F] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"></div>
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#B8D4E3] font-medium mb-2 uppercase tracking-wide">See Our Process</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Shot Blasting Steel Sheets in Action
              </h2>
              <p className="text-[#B8D4E3] max-w-2xl mx-auto">
                Watch our precision shot blasting process transform steel sheets, removing rust, scale, and coatings to create the perfect surface for protective finishes.
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 max-w-md w-full">
                <video 
                  className="w-full h-auto object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  poster="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/iWbuUjSLLiAZNRee.webp"
                >
                  <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/CICKcOChLeIGkWWG.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#4A90A4]" />
                      <span>Professional Grade Equipment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#4A90A4]" />
                      <span>Precision Surface Preparation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Shield className="w-10 h-10 text-[#4A90A4] mb-3" />
                <h3 className="font-bold text-lg mb-2">Complete Coverage</h3>
                <p className="text-[#B8D4E3] text-sm">Uniform blasting across entire surface area for consistent results</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Clock className="w-10 h-10 text-[#4A90A4] mb-3" />
                <h3 className="font-bold text-lg mb-2">Fast Turnaround</h3>
                <p className="text-[#B8D4E3] text-sm">Efficient process minimizes downtime for your project</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Award className="w-10 h-10 text-[#4A90A4] mb-3" />
                <h3 className="font-bold text-lg mb-2">Quality Finish</h3>
                <p className="text-[#B8D4E3] text-sm">Perfect surface profile for optimal coating adhesion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Why Choose Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                A Business You Can Trust
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are a trusted family-run business providing professional shot blasting services for industrial and commercial clients across the UK. Our mobile shot blasting units come directly to your site, delivering exceptional surface preparation at competitive prices.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you need rust removal, paint stripping, or surface profiling for new coatings, our expert team maintains the highest safety standards on every project — protecting your property and your schedule.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Fully Insured" },
                  { icon: Award, text: "Quality Assured" },
                  { icon: Clock, text: "Fast Turnaround" },
                  { icon: Users, text: "Expert Team" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-[#F5F1E8] rounded-lg">
                    <item.icon className="w-6 h-6 text-[#2C5F7F]" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Suspense fallback={<div className="aspect-video bg-gray-100 rounded-lg" />}>
                <BeforeAfterSlider
                  beforeImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/VEiAvFTFwMSPdMnF.webp"
                  afterImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/TicEtXjfKsaOJYbR.webp"
                  beforeLabel="Before"
                  afterLabel="After"
                  className="shadow-xl"
                />
              </Suspense>
              <div className="absolute -bottom-6 -left-6 bg-[#2C5F7F] text-white p-6 rounded-lg shadow-lg z-20">
                <p className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>20+</p>
                <p className="text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preparation & Cleanup Section */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Our Process</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Industry-Leading Preparation & Cleanup
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Shot blasting is only as good as the preparation and cleanup around it. We pride ourselves on our systematic approach to site protection, containment, and cleanup – ensuring minimal disruption and maximum quality on every project.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                From isolating work zones and protecting delicate fixtures to thorough post-blast cleanup and waste disposal, we follow a fixed four-stage process that delivers predictable results and leaves your site ready for the next phase of work.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Containment & Protection",
                  "Surface Preparation",
                  "Protection of Delicate Areas",
                  "Post-Blast Clean-Down"
                ].map((stage, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2C5F7F] text-white flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </div>
                    <span className="font-medium text-sm">{stage}</span>
                  </div>
                ))}
              </div>
              <Link href="/preparation-cleanup">
                <Button size="lg" className="bg-[#2C5F7F] hover:bg-[#1a3d52]">
                  Learn More About Our Process
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/LXqZHnZoEOfqdiqX.webp" 
                alt="Professional site preparation and cleanup" 
                className="w-full h-[500px] object-cover rounded-lg shadow-xl opacity-0 transition-opacity duration-500"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
                onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
                <p className="text-3xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>4</p>
                <p className="text-sm text-gray-600">Stage Process</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Customer Reviews</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Our Clients Say
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our shot blasting services.
            </p>
          </div>
          
          {/* Featured Review with Images */}
          {displayTestimonials.length > 0 && (
            <Card className="p-6 mb-8 hover:shadow-lg transition-shadow relative bg-gradient-to-br from-[#F5F1E8] to-white border-2 border-[#2C5F7F]/20">
              <div className="flex items-center gap-2 mb-4">
                {displayTestimonials[0].isNew && (
                  <span className="bg-[#2C5F7F] text-white text-xs px-2 py-1 rounded font-medium">NEW</span>
                )}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < displayTestimonials[0].rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <Quote className="absolute top-4 right-4 w-12 h-12 text-[#2C5F7F]/10" />
              <p className="text-gray-700 mb-6 leading-relaxed italic text-lg">"{displayTestimonials[0].text}"</p>
              {displayTestimonials[0].images && displayTestimonials[0].images.length > 0 && (
                <div className={`grid gap-2 mb-6 ${displayTestimonials[0].images.length >= 5 ? 'grid-cols-5' : `grid-cols-${displayTestimonials[0].images.length}`}`}>
                  {displayTestimonials[0].images.map((img, idx) => (
                    <img 
                      key={idx} 
                      src={img} 
                      alt={`Review photo ${idx + 1}`} 
                      className="w-full h-64 md:h-80 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer shadow-md opacity-0 transition-opacity duration-500"
                      loading="lazy"
                      decoding="async"
                      onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                      onClick={() => openLightbox(displayTestimonials[0].images!, idx)}
                    />
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#2C2C2C] text-lg">{displayTestimonials[0].name}</p>
                  <p className="text-sm text-gray-500">{displayTestimonials[0].company}</p>
                </div>
                <span className="text-xs bg-[#2C5F7F]/10 text-[#2C5F7F] px-3 py-1 rounded-full font-medium">
                  {displayTestimonials[0].project}
                </span>
              </div>
            </Card>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {displayTestimonials.slice(1).map((testimonial) => (
              <Card key={testimonial.id} className="p-6 hover:shadow-lg transition-shadow relative">
                <Quote className="absolute top-4 right-4 w-10 h-10 text-[#2C5F7F]/10" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed italic text-sm">"{testimonial.text}"</p>
                {testimonial.images && testimonial.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-1 mb-4">
                    {testimonial.images.map((img, idx) => (
                      <img 
                        key={idx} 
                        src={img} 
                        alt={`Review photo ${idx + 1}`} 
                        className="w-full h-48 md:h-64 object-cover rounded hover:scale-105 transition-transform cursor-pointer opacity-0 transition-opacity duration-500"
                        loading="lazy"
                        decoding="async"
                        onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                        onClick={() => openLightbox(testimonial.images!, idx)}
                      />
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#2C2C2C]">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                  <span className="text-xs bg-[#2C5F7F]/10 text-[#2C5F7F] px-3 py-1 rounded-full font-medium">
                    {testimonial.project}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Review Carousel Section */}
      <Suspense fallback={<div className="py-16" />}><ReviewCarousel /></Suspense>
      {/* Case Studies Section */}
      <Suspense fallback={<div className="py-16" />}><CaseStudies /></Suspense>

      {/* Recent Projects Gallery Preview */}
      {allUniqueProjects.length > 0 && (
        <section className="py-20 bg-[#F5F1E8]">
          <div className="container">
            <div className="text-center mb-8">
              <p className="text-[#2C5F7F] font-medium mb-2 uppercase tracking-wide text-sm">Our Work</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Recent Shot Blasting Projects
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Hover any card to reveal the after shot. Click to explore the matching service.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {projectCategories.map((cat) => {
                const count = cat === "All"
                  ? allUniqueProjects.length
                  : allUniqueProjects.filter(p => p.category === cat).length;
                const isActive = projectCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => { setProjectCategory(cat); setVisibleCount(6); }}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                      isActive
                        ? "bg-[#2C5F7F] text-white border-[#2C5F7F] shadow-md"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#2C5F7F] hover:text-[#2C5F7F]"
                    }`}
                  >
                    {cat} <span className={`ml-1 text-xs ${isActive ? "text-white/80" : "text-gray-400"}`}>({count})</span>
                  </button>
                );
              })}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {featuredProjects.map((item) => (
                <ScrollReveal key={item.id}>
                  <BeforeAfterCard
                    beforeSrc={item.before || ''}
                    afterSrc={item.after || ''}
                    title={item.title}
                    category={item.category}
                    description={item.description}
                    imageHeight="h-56"
                    onClick={() => {
                      setSelectedProject({ id: item.id, title: item.title, category: item.category, description: item.description, beforeImage: item.beforeImage, afterImage: item.afterImage, serviceHref: item.serviceHref });
                      setSelectedProjectIndex(filteredProjects.findIndex(p => p.id === item.id));
                    }}
                  />
                </ScrollReveal>
              ))}
            </div>

            {/* Load More + View All */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {visibleCount < filteredProjects.length && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setIsLoadingMore(true);
                    setTimeout(() => {
                      setVisibleCount(v => v + 3);
                      setIsLoadingMore(false);
                    }, 400);
                  }}
                  disabled={isLoadingMore}
                  className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white bg-white gap-2"
                >
                  {isLoadingMore ? (
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" strokeOpacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" /></svg>
                  ) : null}
                  {isLoadingMore ? "Loading…" : `Load More (${filteredProjects.length - visibleCount} remaining)`}
                </Button>
              )}
              <Link href="/our-work">
                <Button size="lg" className="bg-[#2C5F7F] hover:bg-[#1a3d52]">
                  View All Projects
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-[#2C5F7F] text-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to Transform Your Surfaces?
              </h2>
              <p className="text-white/80">Contact us today for a no-obligation quote.</p>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90" onClick={openQuotePopup}>Request A Site Visit</Button>
              <a href="tel:07970566409">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Phone className="w-4 h-4 mr-2" /> Call Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Industries We Serve</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Versatile Solutions for Every Sector
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              "Automotive", "Construction", "Manufacturing", "Marine", "Oil & Gas",
              "Aerospace", "Rail", "Infrastructure", "Restoration", "Agriculture"
            ].map((industry, i) => (
              <div key={i} className="bg-white p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <CheckCircle className="w-8 h-8 text-[#2C5F7F] mx-auto mb-3" />
                <p className="font-medium text-[#2C2C2C]">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Catalog Section */}
      <section id="service-catalog" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Full Service Catalog</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              18 Shot Blasting Services
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Every service delivered on-site by our mobile units — no transportation required. SA2.5 and SA3 standard as standard.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                category: "Structural & Architectural",
                color: "bg-[#2C5F7F]",
                services: [
                  { name: "Structural Steel Shot Blasting", link: "/services/structural-steel-shot-blasting" },
                  { name: "Fire Escape Shot Blasting", link: "/services/fire-escape-shot-blasting" },
                  { name: "Racking & Mezzanine Blasting", link: "/services/racking-shot-blasting" },
                  { name: "Steel Gates & Railings", link: "/services/steel-gates" },
                  { name: "Steel Doors & Roller Shutters", link: "/services/steel-doors" },
                  { name: "Bridge Steelwork", link: "/services/bridge-steelwork" },
                ]
              },
              {
                category: "Industrial & Specialist",
                color: "bg-[#1a3d52]",
                services: [
                  { name: "Container Shot Blasting", link: "/services/container-shot-blasting" },
                  { name: "Floor Shot Blasting", link: "/services/floor-shot-blasting" },
                  { name: "Pipework Shot Blasting", link: "/services/pipework-shot-blasting" },
                  { name: "Telecom Tower Shot Blasting", link: "/services/telecom-tower-shot-blasting" },
                  { name: "Machinery Shot Blasting", link: "/services/machinery-shot-blasting" },
                  { name: "Marine Shot Blasting", link: "/services/marine-shot-blasting" },
                ]
              },
              {
                category: "Surface Preparation",
                color: "bg-[#4A7C59]",
                services: [
                  { name: "Rust Removal", link: "/services/rust-removal" },
                  { name: "Mill Scale Removal", link: "/services/mill-scale-removal" },
                  { name: "Paint Stripping", link: "/services/paint-stripping" },
                  { name: "Coating Removal", link: "/services/coating-removal" },
                  { name: "Factory Cladding Blasting", link: "/services/factory-cladding-shot-blasting" },
                  { name: "Agricultural Shot Blasting", link: "/services/agricultural-shot-blasting" },
                ]
              }
            ].map((group, gi) => (
              <div key={gi} className="rounded-xl overflow-hidden shadow-md">
                <div className={`${group.color} text-white px-6 py-4`}>
                  <h3 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{group.category}</h3>
                </div>
                <ul className="bg-gray-50 divide-y divide-gray-100">
                  {group.services.map((svc, si) => (
                    <li key={si}>
                      <Link href={svc.link} className="flex items-center justify-between px-6 py-3 hover:bg-white hover:text-[#2C5F7F] transition-colors group">
                        <span className="text-gray-700 group-hover:text-[#2C5F7F] text-sm font-medium">{svc.name}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#2C5F7F] flex-shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="inline-flex items-center gap-2 bg-[#2C5F7F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1a3d52] transition-colors">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Get In Touch</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Request A Site Visit
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form and our team will get back to you within 24 hours with a detailed quote for your project.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#2C5F7F]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a href="tel:07970566409" className="font-medium hover:text-[#2C5F7F] transition-colors">07970 566409</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#2C5F7F]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href="mailto:info@commercialshotblasting.co.uk" className="font-medium hover:text-[#2C5F7F] transition-colors">info@commercialshotblasting.co.uk</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#2C5F7F]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Service Area</p>
                    <p className="font-medium">Professional service across England & Wales</p>
                  </div>
                </div>
              </div>
              
              {/* Why Choose Us - Quick Benefits */}
              <div className="mt-12 p-6 bg-gradient-to-br from-[#F5F1E8] to-[#E8E4DC] rounded-lg border border-[#2C5F7F]/10">
                <h3 className="text-xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Why Choose Us?</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#2C5F7F] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#2C2C2C]">24-Hour Response Time</p>
                      <p className="text-sm text-gray-600">Quick quotes and rapid project turnaround</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#2C5F7F] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#2C2C2C]">Fully Insured</p>
                      <p className="text-sm text-gray-600">Complete peace of mind for your project</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#2C5F7F] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#2C2C2C]">Competitive Pricing</p>
                      <p className="text-sm text-gray-600">Best value without compromising quality</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#2C5F7F] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#2C2C2C]">Regional Coverage</p>
                      <p className="text-sm text-gray-600">Professional service across England & Wales</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Card className="p-6">
              <Suspense fallback={<div className="h-64 flex items-center justify-center text-gray-400">Loading form…</div>}><HubSpotForm /></Suspense>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Areas Map Section */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Coverage</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Serving Clients Across the UK
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From our headquarters in the West Midlands, we provide professional shot blasting services across England and Wales. Click on any location to learn more.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <StaticServiceAreasMap />
          </div>
          <div className="text-center mt-8">
            <Link href="/service-areas">
              <Button size="lg" className="bg-[#2C5F7F] hover:bg-[#1a3d52]">
                View All Service Areas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <Suspense fallback={<div className="py-16" />}><BlogPreview /></Suspense>

      {/* FAQ Section */}
      <Suspense fallback={<div className="py-16" />}><HomeFAQ /></Suspense>

      {/* Footer */}
      <Footer />

      {/* Quote Popup Modal */}
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        hasPrev={selectedProjectIndex > 0}
        hasNext={selectedProjectIndex < filteredProjects.length - 1}
        currentIndex={selectedProjectIndex >= 0 ? selectedProjectIndex + 1 : undefined}
        totalCount={filteredProjects.length}
        onPrev={() => {
          const newIdx = selectedProjectIndex - 1;
          if (newIdx >= 0) {
            const p = filteredProjects[newIdx];
            setSelectedProject({ id: p.id, title: p.title, category: p.category, description: p.description, beforeImage: p.beforeImage, afterImage: p.afterImage, serviceHref: p.serviceHref });
            setSelectedProjectIndex(newIdx);
          }
        }}
        onNext={() => {
          const newIdx = selectedProjectIndex + 1;
          if (newIdx < filteredProjects.length) {
            const p = filteredProjects[newIdx];
            setSelectedProject({ id: p.id, title: p.title, category: p.category, description: p.description, beforeImage: p.beforeImage, afterImage: p.afterImage, serviceHref: p.serviceHref });
            setSelectedProjectIndex(newIdx);
          }
        }}
      />

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowRight className="w-8 h-8 rotate-180" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowRight className="w-8 h-8" />
          </button>
          <img 
            src={lightboxImage} 
            alt="Review photo" 
            className="max-w-full max-h-full object-contain"
            loading="lazy"
            decoding="async"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {lightboxIndex + 1} / {lightboxImages.length}
          </div>
        </div>
      )}

    </div>
  );
}
