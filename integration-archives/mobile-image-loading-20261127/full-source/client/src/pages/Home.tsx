import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Shield, Clock, Award, Users, Star, Quote, X, Download } from "lucide-react";
import { useState, useMemo, useEffect, Suspense } from "react";
import { preloadable } from "@/ssr/preloadable";
import { useAdoptPilotServerSchema } from "@/ssr/PilotRenderContext";
import { QuotePopup } from "@/components/QuotePopup";
import { CompactSurveyCapture } from "@/components/CompactSurveyCapture";
import type { SurveyBookingDefaults } from "@/components/SurveyBookingFlow";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StaticServiceAreasMap } from "@/components/StaticServiceAreasMap";
import { trpc } from "@/lib/trpc";
import { useHomepagePreload } from "@/hooks/useHomepagePreload";
import { useDecorativeVideo } from "@/hooks/useDecorativeVideo";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ProjectDetailModal, type ProjectDetailItem } from "@/components/ProjectDetailModal";
import { BeforeAfterCard } from "@/components/BeforeAfterCard";
import { CapabilityStatementContents } from "@/components/CapabilityStatementContents";
import { CapabilityStatementDownload } from "@/components/CapabilityStatementDownload";
import { LeadForm } from "@/components/LeadForm";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { GOOGLE_BUSINESS_PROFILE_URL } from "@shared/googleBusinessProfile";
import { HBTunnellingProjectFilm } from "@/components/HBTunnellingProjectFilm";
import { HOMEPAGE_INTUMESCENT_SERVICE } from "@shared/homepageIntumescentService";
import { HOMEPAGE_CUSTOMER_COPY } from "@shared/homepageCustomerCopy";

// Below-the-fold components: lazy-loaded to reduce initial JS bundle and improve LCP
const BlogPreview = preloadable(() => import("@/components/BlogPreview").then(m => ({ default: m.BlogPreview })), "P0001");
const BeforeAfterSlider = preloadable(() => import("@/components/BeforeAfterSlider").then(m => ({ default: m.BeforeAfterSlider })), "P0001");
const HomeFAQ = preloadable(() => import("@/components/HomeFAQ"), "P0001");
const CaseStudies = preloadable(() => import("@/components/CaseStudies").then(m => ({ default: m.CaseStudies })), "P0001");
const ReviewCarousel = preloadable(() => import("@/components/ReviewCarousel").then(m => ({ default: m.ReviewCarousel })), "P0001");

export async function preloadHomePilot(): Promise<void> {
  await Promise.all([BlogPreview.preload(), BeforeAfterSlider.preload(), HomeFAQ.preload(), CaseStudies.preload(), ReviewCarousel.preload()]);
}

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

const HOME_HERO_POSTER = "/manus-storage/hb-tunnelling-hero-poster_30d7cc5f.webp";
const HOME_HERO_VIDEO = "/manus-storage/hb-tunnelling-doncaster-hero-loop-before-end-card-optimised_91fc60b0.mp4";
const HOME_HERO_MOBILE_POSTER = "/manus-storage/hb-tunnelling-doncaster-mobile-hero-poster_db54137a.webp";
const HOME_HERO_MOBILE_VIDEO = "/manus-storage/hb-tunnelling-doncaster-mobile-hero_9b3923bc.mp4";

const HERO_PROOF_POINTS: readonly { label: string; tooltip?: string }[] = [
  { label: "Fully Insured" },
  { label: "Full RAMS Supplied" },
  { label: "Rapid Deployment" },
  { label: "21 Teams Nationwide" },
  { label: "End-To-End Delivery" },
  {
    label: "CHAS Elite",
    tooltip: "Premier Blasting holds CHAS Elite status. It supports commercial prequalification, while project-specific RAMS and approvals are still agreed for each site.",
  },
];

export default function Home() {
  const adoptsServerSchema = useAdoptPilotServerSchema();
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [surveyDefaults, setSurveyDefaults] = useState<SurveyBookingDefaults | undefined>();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [projectCategory, setProjectCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedProject, setSelectedProject] = useState<ProjectDetailItem | null>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(-1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { shouldLoadHeroVideo, heroMediaRef } = useDecorativeVideo();
  const [heroVideoReady, setHeroVideoReady] = useState(false);

  useEffect(() => {
    if (!shouldLoadHeroVideo) setHeroVideoReady(false);
  }, [shouldLoadHeroVideo]);

  // Preserve page schema; complete head metadata belongs to RouteMetadataOwner.
  useEffect(() => {
    // WebSite + SiteLinksSearchBox JSON-LD
    if (adoptsServerSchema) return;
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
      'description': 'Nationwide commercial shot blasting services for industrial and commercial projects.',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': 'https://commercialshotblasting.co.uk/sitemap?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    });

    return () => {
      const s = document.getElementById(websiteSchemaId);
      if (s) s.remove();
    };
  }, [adoptsServerSchema]);

  const openQuotePopup = () => {
    setSurveyDefaults(undefined);
    setQuotePopupOpen(true);
  };

  const openSurveyWithDefaults = (defaults: SurveyBookingDefaults) => {
    setSurveyDefaults(defaults);
    setQuotePopupOpen(true);
  };

  // Seed QueryClient cache from /api/preload/homepage before tRPC queries fire
  // This eliminates cold-start latency — data is available instantly on first render
  useHomepagePreload();

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
      <section ref={heroMediaRef} className="relative overflow-hidden bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] pb-20 pt-12 text-white lg:pb-14 lg:pt-10">
        {/* Poster-first background keeps the commercial actions outside the video LCP path. */}
        <div className="absolute inset-0">
          <picture>
            <source media="(max-width: 767px)" srcSet={HOME_HERO_MOBILE_POSTER} />
            <img
              src={HOME_HERO_POSTER}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              width="1920"
              height="1080"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-30 sm:opacity-40"
            />
          </picture>
          {/* Deferred HB Tunnelling project background: decorative, muted and kept out of the LCP path. */}
          {shouldLoadHeroVideo && (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              tabIndex={-1}
              disablePictureInPicture
              onCanPlay={() => setHeroVideoReady(true)}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${heroVideoReady ? "opacity-100" : "opacity-0"}`}
            >
              <source media="(max-width: 767px)" src={HOME_HERO_MOBILE_VIDEO} type="video/mp4" />
              <source src={HOME_HERO_VIDEO} type="video/mp4" />
            </video>
          )}
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#143448]/85 via-[#1a3d52]/70 to-[#1a3d52]/40" />
        <div className="container relative z-10">
          <div className="grid xl:grid-cols-[minmax(0,1fr)_23rem] xl:items-start xl:gap-8">
            <div className="max-w-6xl py-3 lg:py-5 xl:max-w-none xl:py-7">
            <h1 className="mb-4 max-w-6xl text-4xl font-bold md:mb-6 md:text-5xl lg:mb-4 lg:text-6xl xl:text-7xl" style={{ fontFamily: "'Playfair Display', serif", textShadow: "0 2px 10px rgba(8, 25, 36, 0.35)" }}>
              <span className="md:hidden">Commercial Shot Blasting Across The UK</span>
              <span className="hidden md:inline">Commercial Shot Blasting Services for Industrial Projects Across The UK</span>
            </h1>
            <p className="mb-8 max-w-6xl text-lg leading-relaxed text-white/95 md:text-xl lg:mb-5 lg:text-2xl" style={{ textShadow: "0 1px 6px rgba(8, 25, 36, 0.4)" }}>
              End-to-end shot blasting and painting for major commercial and industrial projects nationwide. Our mobile teams prepare and coat your steelwork on site — CHAS Elite, fully insured, with full RAMS.
            </p>
            <div className="mb-7 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-4 lg:mb-8">
              <Button size="lg" className="min-h-12 w-full border border-white/45 bg-[#2C5F7F] px-2 text-xs leading-tight text-white shadow-lg shadow-[#102d3e]/25 hover:border-white hover:bg-white hover:text-[#2C5F7F] sm:w-auto sm:px-8 sm:text-base" onClick={openQuotePopup}>
                Get In Touch
              </Button>
              <Link href="/our-work">
                <Button size="lg" variant="outline" className="min-h-12 w-full px-2 text-xs leading-tight border-white text-white hover:bg-white/10 sm:w-auto sm:px-8 sm:text-base">
                  View Our Work
                </Button>
              </Link>
              <Button asChild size="lg" variant="outline" className="min-h-12 w-full px-2 text-xs leading-tight border-white text-white hover:bg-white/10 sm:w-auto sm:px-8 sm:text-base">
                <a href="tel:07970566409" className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Call Now
                </a>
              </Button>
            </div>
            <aside className="mt-6 xl:hidden" aria-label="Send a project enquiry">
              <LeadForm
                variant="dark"
                presentation="hero"
                enquiryContext="Homepage hero inline enquiry"
                showMarketingConsent={false}
                showWhatsApp={false}
              />
            </aside>
            <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:max-w-[49.5rem] lg:gap-3 xl:mt-0" aria-label="Commercial delivery assurances">
              {HERO_PROOF_POINTS.map((point) => (
                <li key={point.label}>
                  {point.tooltip ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="flex min-h-12 w-full items-center gap-1.5 rounded-lg border border-[#E8A021]/55 bg-[#2C5F7F]/85 px-2 py-1.5 text-left text-xs font-semibold leading-tight text-white shadow-md shadow-[#102d3e]/20 backdrop-blur-sm transition hover:border-[#f1c76e]/80 hover:bg-[#397796]/90 focus:outline-none focus:ring-2 focus:ring-[#f1c76e] lg:min-h-16 lg:px-4 lg:py-3 lg:text-base"
                          aria-label={`${point.label}: more information`}
                        >
                          <CheckCircle className="h-4 w-4 shrink-0 text-[#f1c76e] lg:h-5 lg:w-5" aria-hidden="true" />
                          <span>{point.label}</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-64 bg-[#0d2233] px-3 py-2 text-left text-xs leading-relaxed text-white" side="bottom" sideOffset={8}>
                        {point.tooltip}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <div className="flex min-h-12 items-center gap-1.5 rounded-lg border border-[#E8A021]/55 bg-[#2C5F7F]/85 px-2 py-1.5 text-xs font-semibold leading-tight text-white shadow-md shadow-[#102d3e]/20 backdrop-blur-sm lg:min-h-16 lg:px-4 lg:py-3 lg:text-base">
                      <CheckCircle className="h-4 w-4 shrink-0 text-[#f1c76e] lg:h-5 lg:w-5" aria-hidden="true" />
                      <span>{point.label}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <Link
              href="/our-work"
              className="mt-4 flex items-center justify-between rounded-lg border border-white/30 bg-[#16394f]/75 px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#102d3e]/20 transition hover:border-[#f1c76e]/70 hover:bg-[#2C5F7F] focus:outline-none focus:ring-2 focus:ring-[#f1c76e] focus:ring-offset-2 focus:ring-offset-[#16394f] md:hidden"
              aria-label="View recent commercial projects"
            >
              <span>See recent commercial projects</span>
              <span className="flex items-center gap-1 text-[#f7d98f]">View Our Work <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
            </Link>
            </div>
            <aside className="hidden pt-2 xl:block" aria-label="Send a project enquiry">
              <LeadForm
                variant="dark"
                presentation="hero"
                enquiryContext="Homepage hero inline enquiry"
                showMarketingConsent={false}
                showWhatsApp={false}
              />
            </aside>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <Suspense fallback={<div className="py-16" />}><CaseStudies /></Suspense>

      {/* Recent Projects Gallery Preview */}
      {allUniqueProjects.length > 0 && (
        <section className="py-20 bg-[#F5F1E8]">
          <div className="container">
            <div className="text-center mb-8">
              <p className="text-[#2C5F7F] font-medium mb-2 uppercase tracking-wide text-sm">Our Work</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Recent Commercial Projects
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                See more of our steelwork, refurbishment and surface-preparation projects. Select a project to take a closer look.
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

      {/* Commercial assurance & project resources */}
      <section className="bg-[#16394f] py-16 text-white md:py-20" aria-labelledby="commercial-resources-heading">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-[#f7d98f]">{HOMEPAGE_CUSTOMER_COPY.resources.eyebrow}</p>
            <h2 id="commercial-resources-heading" className="text-3xl font-bold md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              {HOMEPAGE_CUSTOMER_COPY.resources.heading}
            </h2>
            <p className="mt-4 text-sm font-medium tracking-wide text-white/75 md:text-base">
              The Commercial &amp; Industrial Arm of Premier Blasting
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
              {HOMEPAGE_CUSTOMER_COPY.resources.intro}
            </p>
          </div>

          <div className="mx-auto mt-9 grid max-w-5xl gap-4 md:grid-cols-3">
            <Link href="/chas-elite" aria-label="Learn what Premier Blasting CHAS Elite means for your project" className="group flex min-h-32 items-center gap-4 rounded-2xl border border-white/25 bg-white/10 p-5 text-left shadow-sm transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-[#f1c76e]/60">
              <img src="/manus-storage/chas-elite-accreditation_29937620.png" alt="CHAS Accreditation Elite logo" width="300" height="300" className="h-14 w-14 shrink-0 object-contain" loading="lazy" />
              <span className="leading-snug">
                <span className="block text-base font-semibold group-hover:text-[#f7d98f]">Premier Blasting is CHAS Elite</span>
                <span className="mt-1 block text-sm font-normal text-white/75">See how CHAS Elite can help with contractor selection.</span>
              </span>
            </Link>

            <CapabilityStatementDownload
              placement="Homepage commercial assurance and project resources section"
              tone="dark"
              containerClassName="max-w-full"
              linkClassName="group flex min-h-32 h-full w-full items-center gap-4 rounded-2xl border border-[#f1c76e]/50 bg-[#f1c76e]/10 p-5 text-left text-white shadow-sm transition hover:border-[#f1c76e] hover:bg-[#f1c76e]/20 focus:outline-none focus:ring-4 focus:ring-[#f1c76e]/60"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f1c76e] text-[#16394f]">
                <Download className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="leading-snug">
                <span className="block text-xs font-bold uppercase tracking-[0.11em] text-[#f7d98f]">Capability statement</span>
                <span className="mt-1 block text-base font-semibold group-hover:text-[#f7d98f]">Download our capability statement</span>
                <span className="mt-1 block text-sm font-normal text-white/75">Meet the team and see what we can do for your project.</span>
              </span>
            </CapabilityStatementDownload>

            <a
              href={GOOGLE_BUSINESS_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Commercial Shot Blasting's Google Business Profile (opens in a new tab)"
              className="group flex min-h-32 items-center gap-4 rounded-2xl border border-white/25 bg-white/10 p-5 text-left shadow-sm transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-[#f1c76e]/60"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-[#f7d98f]">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="leading-snug">
                <span className="block text-xs font-bold uppercase tracking-[0.11em] text-[#f7d98f]">On Google</span>
                <span className="mt-1 block text-base font-semibold group-hover:text-[#f7d98f]">View our Business Profile</span>
                <span className="mt-1 block text-sm font-normal text-white/75">Opens Google in a new tab.</span>
              </span>
            </a>
          </div>

          <CapabilityStatementContents tone="dark" className="mx-auto mt-5 max-w-2xl" description={HOMEPAGE_CUSTOMER_COPY.resources.capabilityIntro} />
          <CompactSurveyCapture onStart={openSurveyWithDefaults} className="mx-auto mt-8 max-w-4xl" />
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Commercial blasting and coating</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {HOMEPAGE_CUSTOMER_COPY.services.heading}
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {HOMEPAGE_CUSTOMER_COPY.services.intro}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Structural Steel Frames", desc: "Remove rust, mill scale and old coatings from your building frames and roof trusses, ready for the specified protective finish.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/sUfXaBUgQWNMAvEc.webp", link: "/services/structural-steel-frames" },
              { title: "Steel Container Blasting", desc: "Strip rust and failed coatings from shipping containers and storage steelwork, ready for repair, repainting or reuse.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/bGsCKoWjNMKfOhKj.webp", link: "/services/steel-containers" },
              { title: "Factory & Warehouse Cladding", desc: "Remove failing paint and plastisol from your factory or warehouse cladding, preparing the panels for a new coating system.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/GmdvvhZjrHfYtOVb.webp", link: "/services/factory-cladding" },
              { title: "Fire Escapes & External Stair Towers", desc: "Strip rust and flaking paint from fire escapes and external stair towers before the agreed repair and repainting work.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oySJrMBHyyuJOevk.webp", link: "/services/fire-escapes" },
              { title: "Internal Steel Staircases, Balustrades & Handrails", desc: "Prepare new or existing staircases, balustrades and handrails for their next finish, including hard-to-reach steelwork.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/TLjFQFhDhVdFaDwj.webp", link: "/services/staircases" },
              { title: "Bridge Steelwork (Girders, Crossmembers, Parapet Rails)", desc: "Prepare bridge girders, crossmembers and parapet rails for the coating system specified for your project.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/cuwoxubhXPpGCUSf.webp", link: "/services/bridge-steelwork" },
              { title: "Fixed Ladders & Step-Over Platforms", desc: "Remove rust and old coatings from fixed ladders and step-over platforms, ready for the agreed maintenance and coating work.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yXusfqsGJHZwuETv.webp", link: "/services/ladders" },
              { title: "Warehouse Racking & Pallet Rack Frames", desc: "Prepare racking frames and storage steelwork for refurbishment, with access and the work area planned around your warehouse.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/WmoactuoGfwMmVwl.webp", link: "/services/warehouse-racking" },
              { title: "Process Pipework, Spools & Manifolds", desc: "Blast-clean the external surfaces of pipework, spools and manifolds before applying the specified protective coating.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/eqezEvtOwgDSGsCT.webp", link: "/services/pipework" },
              { title: "Telecom Masts & Lattice Towers", desc: "Prepare masts, lattice towers and antenna supports for protective coatings, with access planned around the structure.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/XLIXJyIInSTPQjlE.webp", link: "/services/telecom-towers" },
              { title: "Floor Preparation & Shot Blasting", desc: "Remove existing floor coatings and prepare the surface for the new finish in your factory, warehouse or commercial unit.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/YMGizlSGgTjDQAyi.webp", link: "/services/floor-preparation" },
              { title: "Shot Blasting & Powder Coating", desc: "Have suitable metal components blast-prepared and powder coated as one job, with the finish agreed to suit their use.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/NpTRkKdXbfRWbnOl.webp", link: "/services/powder-coating" },
              HOMEPAGE_INTUMESCENT_SERVICE,
              { title: "Commercial Vehicles", desc: "Remove rust and old coatings from commercial vehicle chassis, wheels and other transport steelwork before refurbishment.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/NtAgxBOsLSxEcmau.webp", link: "/services/commercial-vehicles" },
              { title: "Steel Doors & Roller Shutters", desc: "Strip failing coatings and rust from steel doors and roller shutters, preparing them for repainting.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/EOszbYQwsYrTFvjN.webp", link: "/services/steel-doors" },
              { title: "Steel Sheeting", desc: "Prepare steel sheets and panels for fabrication or coating, removing mill scale, rust and existing finishes.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/QXdidJpwgjaMnlmb.webp", link: "/services/steel-sheeting" },
              { title: "Steel Gates & Railings", desc: "Restore commercial gates and perimeter railings by stripping rust and failed coatings before the agreed new finish.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/dIVmiYILOzXbQFlg.webp", link: "/services/steel-gates" },
              { title: "Plant & Machinery", desc: "Blast-clean plant and machinery at your site, preparing exposed steelwork for repair or protective painting.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/symRlOinndpZEzlR.webp", link: "/services/plant-machinery" },
            ].map((service, i) => (
              <ScrollReveal key={i} delay={Math.min(i % 3, 2) * 80}>
              <Link href={service.link}>
                <Card className="group overflow-hidden hover:shadow-lg transition-shadow h-full cursor-pointer">
                  <div className="h-48 overflow-hidden">
                    <img src={service.img} alt={"imageAlt" in service ? service.imageAlt : service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-0 transition-opacity duration-500" loading="lazy" decoding="async"
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
      <HBTunnellingProjectFilm />

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Working on a large commercial project?</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {HOMEPAGE_CUSTOMER_COPY.about.heading}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {HOMEPAGE_CUSTOMER_COPY.about.intro}
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {HOMEPAGE_CUSTOMER_COPY.about.detail}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Fully Insured" },
                  { icon: Award, text: "Premier Blasting CHAS Elite" },
                  { icon: Clock, text: "Planned Around Your Site" },
                  { icon: Users, text: "Blasting & Coating Teams" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-[#F5F1E8] rounded-lg">
                    <item.icon className="w-6 h-6 text-[#2C5F7F]" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              <Link href="/chas-elite" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2C5F7F] hover:text-[#1a3d52]">
                See what CHAS Elite means for your project <ArrowRight className="h-4 w-4" />
              </Link>
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
                {HOMEPAGE_CUSTOMER_COPY.process.heading}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {HOMEPAGE_CUSTOMER_COPY.process.intro}
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {HOMEPAGE_CUSTOMER_COPY.process.detail}
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
                  See How We Prepare Your Site
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
              Hear from clients who have trusted our teams with their warehouse, steelwork and refurbishment projects.
            </p>
          </div>
          
          {/* Featured Review with Images */}
          {displayTestimonials.length > 0 && (
            <Card className="p-6 mb-8 hover:shadow-lg transition-shadow relative bg-gradient-to-br from-[#F5F1E8] to-white border-2 border-[#2C5F7F]/20">
              <div className="flex items-center gap-2 mb-4">
                {displayTestimonials[0].isNew && (
                  <span className="bg-[#2C5F7F] text-white text-xs px-2 py-1 rounded font-medium">NEW</span>
                )}
                {displayTestimonials[0].rating > 0 ? (
                  <div className="flex gap-1" aria-label={`${displayTestimonials[0].rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < displayTestimonials[0].rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                ) : (
                  <span className="rounded-full bg-[#2C5F7F]/10 px-3 py-1 text-xs font-semibold text-[#2C5F7F]">Client testimonial</span>
                )}
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
              {displayTestimonials[0].company === "HB Tunnelling Limited" && (
                <Link href="/case-studies/hb-tunnelling-doncaster" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2C5F7F] hover:underline">
                  View the HB Tunnelling case study <ArrowRight className="h-4 w-4" />
                </Link>
              )}
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
      {/* All Three Teams Video Callout */}
      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-orange-600 mb-3">One Team — End-to-End Delivery</span>
              <h2 className="text-3xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {HOMEPAGE_CUSTOMER_COPY.team.heading}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {HOMEPAGE_CUSTOMER_COPY.team.intro}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                You don’t need to coordinate separate blasting and painting contractors. As{" "}
                <a href="/services/intumescent-painting" className="text-[#2C5F7F] font-semibold underline underline-offset-2 hover:text-orange-600 transition-colors">
                  intumescent painting contractors
                </a>{" "}
                who also blast in-house, we keep both stages with one team and give you one point of contact from preparation through to coating.
              </p>
              <a href="/services/intumescent-painting">
                <button className="inline-flex items-center gap-2 bg-[#2C5F7F] hover:bg-[#1a3d52] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Learn About Our Intumescent Painting Service
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <video
                src="/manus-storage/all3_3c7034df.mp4"
                controls
                muted
                playsInline
                preload="none"
                className="w-full aspect-video object-cover bg-black"
                aria-label="Video showing three operatives working simultaneously — shot blasting and intumescent painting at the same time on the same structure"
              />
              <div className="bg-[#2C5F7F] px-4 py-2 text-white text-xs font-medium text-center">
                Three Operatives On Site — Blasting &amp; Painting Simultaneously
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#2C5F7F] text-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {HOMEPAGE_CUSTOMER_COPY.enquiry.heading}
              </h2>
              <p className="text-white/80">{HOMEPAGE_CUSTOMER_COPY.enquiry.intro}</p>
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
              Commercial and Industrial Projects
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
            <p className="text-[#2C5F7F] font-medium mb-2">Find Your Service</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {HOMEPAGE_CUSTOMER_COPY.catalogue.heading}
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {HOMEPAGE_CUSTOMER_COPY.catalogue.intro}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                category: "Structural & Architectural",
                color: "bg-[#2C5F7F]",
                services: [
                  { name: "Structural Steel Shot Blasting", link: "/services/structural-steel-frames" },
                  { name: "Fire Escape Shot Blasting", link: "/services/fire-escapes" },
                  { name: "Racking & Mezzanine Blasting", link: "/services/warehouse-racking" },
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
                {HOMEPAGE_CUSTOMER_COPY.contact.heading}
              </h2>
              <p className="text-gray-600 mb-8">
                {HOMEPAGE_CUSTOMER_COPY.contact.intro}
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
                    <p className="font-medium">Mobile teams come to your site across the UK.</p>
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
                      <p className="font-semibold text-[#2C2C2C]">Straightforward Communication</p>
                      <p className="text-sm text-gray-600">Tell us what you need and we’ll get back to you promptly.</p>
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
                      <p className="text-sm text-gray-600">Fully insured teams for your commercial site work.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#2C5F7F] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#2C2C2C]">One Team, Start to Finish</p>
                      <p className="text-sm text-gray-600">Keep blasting and painting with one contractor.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#2C5F7F] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#2C2C2C]">Nationwide Deployment</p>
                      <p className="text-sm text-gray-600">Mobile teams come to your site across the UK.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Card className="p-6">
              <LeadForm variant="light" heading="Get In Touch" subheading="Send a short message and we’ll get back to you promptly." showWhatsApp={true} />
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
              {HOMEPAGE_CUSTOMER_COPY.coverage.heading}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {HOMEPAGE_CUSTOMER_COPY.coverage.intro}
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
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} defaults={surveyDefaults} />

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
