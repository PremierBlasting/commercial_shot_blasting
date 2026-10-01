import { Link } from "wouter";
import { Phone, MapPin, CheckCircle, ArrowRight, Award, Zap, Building2, Factory, ClipboardList, ChevronDown, ChevronUp, CalendarCheck, Map as MapIcon } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { getLocationSEO, useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { QuotePopup } from "@/components/QuotePopup";
import { CompactSurveyCapture } from "@/components/CompactSurveyCapture";
import type { SurveyBookingDefaults } from "@/components/SurveyBookingFlow";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Footer } from "@/components/Footer";
import { ShareButton } from "@/components/ShareButton";
import { ServiceRadiusMap } from "@/components/ServiceRadiusMap";
import { LocalIndustryMap } from "@/components/LocalIndustryMap"; 
import { recordAreaVisit } from "@/hooks/useRecentlyViewed";

/** Hook: returns true once the ref element enters the viewport (with 200px rootMargin for preloading) */
function useLazyVisible(rootMargin = "200px") {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);
  return { ref, visible };
}
import { trackPhoneCall } from "@/lib/analytics";
import { generateLocationFAQs } from "@/components/FAQSchema";
import type { LocationData } from '@shared/locationData';
import { loadCountyLocations } from '@/data/locationChunkLoader';
import { countyData } from '@/data/countyData';
import { countyContext } from '@shared/countyContext';
import { townSpotlight } from '@shared/townSpotlight';
import { services } from '@/data/services';
import { getProjectsForCounty } from '@/data/recentProjects';
import { getCanonicalServicePath } from '@shared/serviceSeoCatalog';
import { normaliseResponseTimeCopy } from '@shared/seoContentPolicy';
import { getTierAPillarResources } from '@shared/tierAPillarResources';
import { priorityTownCommercialContent } from '@shared/priorityLocalSeoContent';
import { trpc } from "@/lib/trpc";
import { formatUTMForSubmission } from "@/lib/utm";
import { sortLocationSlugsByDistance } from "@/data/locationCoordinates";
export type { LocationData };

// Sub-component: renders AI-refreshed content for this location if available
function LocationCustomContent({ slug, locationName }: { slug: string; locationName: string }) {
  const { data } = trpc.serviceArea.getContent.useQuery({ slug }, { staleTime: 1000 * 60 * 10 });
  if (!data?.customContent) return null;
  return (
    <section className="py-16 bg-[#f0f6fb]">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#2C5F7F] font-medium mb-2">Local Expertise</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting in {locationName} — Latest Insights
            </h2>
          </div>
          <div
            className="blog-prose bg-white rounded-2xl shadow-sm p-8 md:p-12"
            dangerouslySetInnerHTML={{ __html: data.customContent }}
          />
        </div>
      </div>
    </section>
  );
}

const INDUSTRIES = [
  { slug: 'aerospace', name: 'Aerospace' },
  { slug: 'agriculture', name: 'Agriculture' },
  { slug: 'construction', name: 'Construction' },
  { slug: 'heritage-restoration', name: 'Heritage Restoration' },
  { slug: 'manufacturing', name: 'Manufacturing' },
  { slug: 'marine', name: 'Marine' },
  { slug: 'retail', name: 'Retail' },
  { slug: 'transport-logistics', name: 'Transport & Logistics' },
];

interface LocationPageProps {
  location: LocationData;
}

export function LocationPage({ location }: LocationPageProps) {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [surveyDefaults, setSurveyDefaults] = useState<SurveyBookingDefaults | undefined>();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showQuickNav, setShowQuickNav] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Lazy-load maps only when scrolled into view (saves ~200KB initial payload on mobile)
  const industryMapLazy = useLazyVisible("300px");
  const radiusMapLazy = useLazyVisible("300px");

  // Record this area visit for "recently viewed" feature
  useEffect(() => {
    recordAreaVisit(location.slug, location.name, location.county);
  }, [location.slug, location.name, location.county]);

  // Show quick-nav after user scrolls past the hero
  useEffect(() => {
    const handleScroll = () => {
      setShowQuickNav(window.scrollY > 400);
      // Highlight active section
      const sections = ['loc-services', 'loc-faqs', 'loc-contact', 'loc-nearby'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setFormSubmitted(true);
      setFormName('');
      setFormPhone('');
      setFormEmail('');
      setFormMessage('');
    },
    onError: (err) => {
      setFormError(err.message || 'Something went wrong. Please call us directly.');
    },
  });

  const handleInlineFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!formName.trim() || !formPhone.trim()) {
      setFormError('Please enter your name and phone number.');
      return;
    }
    const utmData = formatUTMForSubmission();
    contactMutation.mutate({
      name: formName.trim(),
      email: formEmail.trim() || `${formPhone.replace(/\s/g, '')}@sms.placeholder`,
      phone: formPhone.trim(),
      message: formMessage.trim() || `Site visit request from ${location.name} town page`,
      sourcePage: typeof window !== 'undefined' ? window.location.href : undefined,
      locationName: location.name,
      utmData: Object.keys(utmData).length > 0 ? utmData : undefined,
    });
  };

  // Derive a compact set of same-county links, preferring the nearest canonical
  // areas where lightweight coordinates are available.
  const [nearbyTowns, setNearbyTowns] = useState<LocationData[]>([]);
  const tierAPillarResources = getTierAPillarResources(location.slug, location.industries ?? []);
  useEffect(() => {
    if (!location.countySlug) return;
    loadCountyLocations(location.countySlug).then(countyLocs => {
      const candidates = Object.values(countyLocs).filter((town) => town.slug !== location.slug);
      const townsBySlug = new Map(candidates.map((town) => [town.slug, town]));
      const nearby = sortLocationSlugsByDistance(location.slug, candidates.map((town) => town.slug))
        .slice(0, 6)
        .map((slug) => townsBySlug.get(slug))
        .filter((town): town is LocationData => Boolean(town));
      setNearbyTowns(nearby);
    });
  }, [location.countySlug, location.slug]);

  // Set SEO metadata with optimized location-specific descriptions
  useSEO(getLocationSEO(location.name, location.slug, location.county));

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Service Areas", href: "/service-areas" },
    { label: location.county, href: `/counties/${location.countySlug}` },
    { label: location.name, href: `/service-areas/${location.slug}`, isCurrentPage: true }
  ];
  const locationSpotlight = location.spotlightText || townSpotlight[location.slug];
  const priorityCommercialContent = priorityTownCommercialContent[location.slug];
  const displayedFaqs = [
    ...(location.uniqueFaqs || []).slice(0, 3).map((faq) => ({
      question: faq.question,
      answer: normaliseResponseTimeCopy(faq.answer),
    })),
    ...generateLocationFAQs(location.name, location.county).map((faq) => ({
      ...faq,
      answer: normaliseResponseTimeCopy(faq.answer),
    })),
  ];

  return (
    <>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />

      {/* Breadcrumb Navigation */}
      <section className="py-4 bg-gray-50 border-b border-gray-200">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} bare />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3a4d] text-white py-20">
        <HeroCarousel>
          <div className="absolute inset-0 bg-gradient-to-br from-[#2C5F7F]/90 to-[#1a3a4d]/90 z-10" />
        </HeroCarousel>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <p className="text-blue-200 font-medium mb-4">Shot Blasting Contractor — {location.county}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Contractor {location.name} — Near Me
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Mobile shot blasting in {location.name}, {location.county} for commercial surface preparation, rust removal and coating handover planning. Share the asset, access and specification detail to arrange a Site Visit.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-white text-[#2C5F7F] hover:bg-gray-100"
                onClick={() => setQuotePopupOpen(true)}
              >
                Request A Site Visit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => { trackPhoneCall('07721375756', 'Location Page'); window.location.href = 'tel:07721375756'; }}
              >
                <Phone className="w-5 h-5 mr-2" />
                07721 375756
              </Button>
            </div>
            <CompactSurveyCapture
              defaults={{ locationName: location.name }}
              onStart={(defaults) => {
                setSurveyDefaults(defaults);
                setQuotePopupOpen(true);
              }}
              className="mt-7 max-w-3xl"
            />
          </div>
        </div>
      </section>

      {/* Project planning strip — verified, non-review assurances */}
      <div className="bg-[#f8f9fa] border-b border-gray-200">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-4 py-4 md:gap-6">
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>Specified Sa 2.5 / Sa 3 preparation</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>Commercial Site Visits</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>CHAS Elite assurance</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>England &amp; Wales coverage</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#2C5F7F] font-medium mb-2">Local Experts</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Professional Shot Blasting Services in {location.name}
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                We provide professional mobile shot blasting services throughout {location.name} and the wider <a href={`/counties/${location.countySlug}`} className="text-[#2C5F7F] hover:underline font-medium">{location.county}</a> area. Our fully equipped mobile units deliver expert surface preparation directly to your site — covering structural steelwork, factory cladding, shipping containers, floor preparation, fire escapes, warehouse racking, and more.
              </p>
              <p>
                {location.industries && location.industries.length > 0 ? (
                  <>Our shot blasting services in {location.name} support the {location.industries.join(', ')} sectors, delivering rust removal, paint stripping, mill scale removal, and surface profiling to the SA2.5 standard required for protective coating systems. We understand the demands of local industry and tailor every project accordingly.</>
                ) : (
                  <>Our shot blasting services in {location.name} cover the full range of commercial and industrial applications — from rust removal and paint stripping on structural steel to surface profiling for new protective coatings. We work to SA2.5 and SA3 standards and tailor every project to your specification.</>
                )}
              </p>
              <p>
                Whether you need a single component blasted or a full factory cladding programme, our mobile shot blasting service in {location.name} delivers consistent, high-quality results with minimal disruption to your operations. Call <a href="tel:07721375756" className="text-[#2C5F7F] hover:underline font-medium">07721 375756</a> to arrange a no-obligation site visit.
              </p>
              {countyContext[location.countySlug] && (
                <p className="mt-4 text-gray-600 border-l-4 border-[#2C5F7F] pl-4 italic">
                  {countyContext[location.countySlug]}
                </p>
              )}
              {locationSpotlight && (
                <div className="mt-6 p-5 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Factory className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Local Industry Spotlight</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{locationSpotlight}</p>
                </div>
              )}
              {priorityCommercialContent && (
                <section className="mt-8 rounded-2xl border border-[#2C5F7F]/20 bg-[#eef7fa] p-6" aria-label={`${location.name} commercial project context`}>
                  <p className="text-sm font-semibold uppercase tracking-wide text-[#2C5F7F]">{priorityCommercialContent.eyebrow}</p>
                  <h2 className="mt-2 text-2xl font-bold text-[#1a3d52]" style={{ fontFamily: "'Playfair Display', serif" }}>{priorityCommercialContent.title}</h2>
                  <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-700">
                    {priorityCommercialContent.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {priorityCommercialContent.links.map((link) => (
                      <a key={link.href} href={link.href} className="group rounded-xl border border-[#2C5F7F]/15 bg-white p-4 no-underline transition hover:-translate-y-0.5 hover:border-[#2C5F7F] hover:shadow-sm">
                        <span className="block font-bold text-[#1a3d52] group-hover:text-[#2C5F7F]">{link.title}</span>
                        <span className="mt-2 block text-sm leading-relaxed text-slate-600">{link.description}</span>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#2C5F7F]">Explore route <ArrowRight className="h-4 w-4" /></span>
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Local Industry Map — shown for all town pages */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[#2C5F7F] font-medium mb-2">Industrial Coverage</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Industrial Areas We Serve Near {location.name}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                Our mobile shot blasting units serve all industrial estates, business parks, and manufacturing sites in and around {location.name}.
              </p>
            </div>
            <div ref={industryMapLazy.ref} className="max-w-2xl mx-auto min-h-[300px]">
              {industryMapLazy.visible ? (
                <LocalIndustryMap
                  townName={location.name}
                  county={location.county}
                  className="w-full"
                />
              ) : (
                <div className="h-[300px] bg-slate-100 rounded-xl flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <MapIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Loading map...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Typical Commercial Projects in {location.name} — industry-specific examples */}
      {(() => {
        const typicalProjects = getProjectsForCounty(location.countySlug || '', 3);
        if (typicalProjects.length === 0) return null;
        return (
          <section className="py-12 bg-[#f0f6fb] border-y border-blue-100">
            <div className="container">
              <div className="text-center mb-8">
                <p className="text-[#2C5F7F] font-medium mb-1 uppercase tracking-wide text-xs">Typical Projects</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Commercial Shot Blasting Projects in {location.name}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                  Verified project examples relevant to {location.county} and the surrounding commercial area.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {typicalProjects.map(project => (
                  <a
                    key={project.id}
                    href={getCanonicalServicePath(project.serviceSlug) ?? "/services"}
                    title={`${project.title} — ${project.serviceLabel} in ${location.name}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-[#2C5F7F] transition-all duration-200 flex flex-col"
                  >
                    <div className="relative overflow-hidden h-40">
                      <img
                        src={project.afterImage}
                        alt={`${project.title} — shot blasting result`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#2C5F7F] text-white text-xs font-semibold px-2 py-1 rounded">
                        {project.serviceLabel}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-[#2C2C2C] text-sm leading-snug mb-1 group-hover:text-[#2C5F7F] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed flex-1">{project.description}</p>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-400">{project.date}</span>
                        <span className="inline-flex items-center gap-1 text-xs text-[#2C5F7F] font-medium">
                          View service <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="text-center mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/our-work">
                  <Button variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white text-sm">
                    View All Our Work
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button className="bg-[#2C5F7F] hover:bg-[#1a3d52] text-sm" onClick={() => setQuotePopupOpen(true)}>
                  <CalendarCheck className="w-4 h-4 mr-2" />
                  Request A Site Visit
                </Button>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-[#2C5F7F] font-medium mb-2">Your Local Choice</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Choose Our Shot Blasting Services in {location.name}?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are the specialist choice for commercial and industrial shot blasting services in {location.name} — mobile, SA2.5/SA3 certified, with site visits.
            </p>
          </div>

          {/* Trust bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: "18", label: "Shot Blasting Services" },
              { value: "SA2.5", label: "Guaranteed Blast Standard" },
              { value: "UK-Wide", label: "Mobile Coverage" },
              { value: "Free", label: "Site Visits" },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-white rounded-xl py-5 px-3 shadow-sm">
                <div className="text-2xl font-black text-[#2C5F7F] mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Mobile Shot Blasting in {location.name}</h3>
              <p className="text-gray-600">
                Our fully equipped mobile units travel directly to your site in {location.name}. No need to transport materials — we bring everything needed to complete the job on your premises.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">SA2.5 &amp; SA3 Certified Results</h3>
              <p className="text-gray-600">
                All shot blasting services in {location.name} are completed to SA2.5 near white metal or SA3 white metal standard — the correct surface profile for long-lasting protective coatings.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">18 Shot Blasting Services Available</h3>
              <p className="text-gray-600">
                From structural steelwork and factory cladding to containers, floor preparation, and plant &amp; machinery — we offer the full range of commercial shot blasting services in {location.name}.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Fast Response in {location.name}</h3>
              <p className="text-gray-600">
                We can schedule a site visit at your convenience anywhere in {location.name}.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Local Knowledge</h3>
              <p className="text-gray-600">
                Familiar with {location.name} and the {location.region}, we provide reliable service you can count on.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Site Visits</h3>
              <p className="text-gray-600">
                No-obligation quotations for all projects in {location.name}. Call us today to discuss your requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Quick-Navigation Menu */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${showQuickNav ? 'translate-y-0' : '-translate-y-full'}`}
        aria-label="Quick navigation"
      >
        <nav className="bg-[#2C5F7F] shadow-lg">
          <div className="container">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
              <span className="text-white/60 text-xs font-medium uppercase tracking-wide shrink-0 pr-2 hidden sm:block">Jump to:</span>
              {[
                { id: 'loc-services', label: 'Services' },
                { id: 'loc-faqs', label: 'FAQs' },
                { id: 'loc-contact', label: 'Get a Quote' },
                { id: 'loc-nearby', label: 'Nearby Areas' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
                    activeSection === id
                      ? 'bg-white text-[#2C5F7F]'
                      : 'text-white/90 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
              <div className="ml-auto shrink-0 flex items-center gap-2">
                <button
                  onClick={() => { trackPhoneCall('07721375756', 'Quick Nav'); window.location.href = 'tel:07721375756'; }}
                  className="hidden sm:flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-sm font-medium px-3 py-1.5 rounded-full transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  07721 375756
                </button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  aria-label="Back to top"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Services Section */}
      <section id="loc-services" className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services Available in {location.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer the full range of commercial shot blasting services in {location.name}, delivered on-site by our mobile units.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { id: "structural-steel-shot-blasting", label: `Structural Steel Shot Blasting in ${location.name}`, desc: "Beams, columns, trusses & fabrications" },
              { id: "factory-cladding-shot-blasting", label: `Factory Cladding Shot Blasting in ${location.name}`, desc: "Plastisol & paint removal from cladding panels" },
              { id: "container-shot-blasting", label: `Container Shot Blasting in ${location.name}`, desc: "Shipping containers & storage units" },
              { id: "floor-shot-blasting", label: `Industrial Floor Preparation in ${location.name}`, desc: "Concrete & steel floor surface profiling" },
              { id: "rust-removal-shot-blasting", label: `Rust Removal in ${location.name}`, desc: "Deep rust & scale removal to SA2.5/SA3" },
              { id: "machinery-shot-blasting", label: `Plant & Machinery Shot Blasting in ${location.name}`, desc: "Industrial equipment, vehicles & pipework" },
            ].map((svc) => (
              <Link
                key={svc.id}
                href={`/services/${svc.id}`}
                className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-[#2C5F7F] hover:bg-[#2C5F7F]/5 transition-colors group"
              >
                <CheckCircle className="w-5 h-5 text-[#2C5F7F] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-800 font-semibold text-sm group-hover:text-[#2C5F7F] transition-colors">{svc.label}</span>
                  <p className="text-xs text-gray-500 mt-0.5">{svc.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/services">
              <Button variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                View All 18 Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Nearby Areas Section */}
      {/* Item 6: Nearby towns as internal card links (derived from same county, up to 12) */}
      {nearbyTowns.length > 0 && (
        <section className="py-14 bg-[#f0f6fb]">
          <div className="container">
            <div className="text-center mb-8">
              <p className="text-[#2C5F7F] font-medium mb-2 uppercase tracking-wide text-sm">Local Coverage</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Shot Blasting Services Near {location.name}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                We provide mobile shot blasting services across {location.name} and all surrounding towns throughout {location.county}. Select a nearby area for local service information.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {nearbyTowns.map((town) => (
                <Link
                  key={town.slug}
                  href={`/service-areas/${town.slug}`}
                  className="flex items-center justify-center text-center bg-white rounded-lg px-3 py-4 text-sm font-medium text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white transition-colors duration-200 shadow-sm hover:shadow-md gap-1.5"
                >
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span>Shot Blasting {town.name}</span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href={`/counties/${location.countySlug}`} className="inline-flex items-center gap-2 text-[#2C5F7F] hover:text-[#1a3d52] font-semibold text-sm">
                View all shot blasting services in {location.county}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Location Map Section */}
      <section
        className="py-16 bg-gray-50"
        aria-label={`Service radius map showing coverage area around ${location.name}, ${location.county}`}
      >
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#2C5F7F] font-medium mb-2">Find Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our Service Area in {location.name}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide mobile shot blasting services throughout {location.name} and the surrounding areas in {location.county}.
              </p>
            </div>
            <div ref={radiusMapLazy.ref} className="min-h-[350px]">
              {radiusMapLazy.visible ? (
                <ServiceRadiusMap locationName={location.name} county={location.county} radiusMiles={30} />
              ) : (
                <div className="h-[350px] bg-slate-100 rounded-xl flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <MapIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Loading service area map...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* AI-Refreshed Local Expertise Section — only shown when scheduler has updated content */}
      <LocationCustomContent slug={location.slug} locationName={location.name} />

      {/* FAQ Section */}
      <section id="loc-faqs" className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#2C5F7F] font-medium mb-2">Common Questions</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                FAQs About Shot Blasting in {location.name}
              </h2>
            </div>

            <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
              {displayedFaqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg overflow-hidden" itemScope itemType="https://schema.org/Question">
                  <button
                    type="button"
                    aria-expanded={expandedFaq === index}
                    aria-controls={`loc-faq-answer-${index}`}
                    id={`loc-faq-btn-${index}`}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <span className="font-semibold text-[#2C5F7F] pr-4" itemProp="name">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-[#2C5F7F] flex-shrink-0" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#2C5F7F] flex-shrink-0" aria-hidden="true" />
                    )}
                  </button>
                  <div
                    id={`loc-faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`loc-faq-btn-${index}`}
                    className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? 'max-h-96' : 'max-h-0'}`}
                    itemScope itemType="https://schema.org/Answer"
                  >
                    <p className="px-6 pb-4 text-gray-700 leading-relaxed" itemProp="text">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {tierAPillarResources.length > 0 && (
        <section className="py-14 bg-white" aria-label="Commercial project planning resources">
          <div className="container">
            <div className="max-w-3xl mb-8">
              <p className="text-[#2C5F7F] font-medium mb-2">Commercial Project Planning</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Specialist Surface-Preparation Resources for {location.name}
              </h2>
              <p className="text-gray-600 mt-3">
                For larger fabrication, industrial refurbishment, or cladding programmes, these planning hubs help define the information to prepare before requesting a Site Visit.
              </p>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {tierAPillarResources.map((resource) => (
                <a key={resource.href} href={resource.href} className="group rounded-xl border border-slate-200 bg-[#f8fbfd] p-5 transition hover:border-[#2C5F7F] hover:shadow-md">
                  <h3 className="font-bold text-[#1a3d52] group-hover:text-[#2C5F7F]">{resource.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{resource.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#2C5F7F]">Explore resource <ArrowRight className="h-4 w-4" /></span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Services Section */}
      <section className="py-14 bg-[#f0f6fb]">
        <div className="container">
          <div className="text-center mb-8">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Services</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services Available in {location.name}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mt-2 text-sm">
              We offer the full range of commercial and industrial shot blasting services across {location.name} and {location.county}.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { slug: "structural-steel-shot-blasting", label: `Structural Steel Shot Blasting ${location.name}` },
              { slug: "container-shot-blasting", label: `Container Blasting ${location.name}` },
              { slug: "factory-cladding-shot-blasting", label: `Factory Cladding ${location.name}` },
              { slug: "floor-shot-blasting", label: `Floor Preparation ${location.name}` },
              { slug: "fire-escape-shot-blasting", label: `Fire Escapes ${location.name}` },
              { slug: "pipework-shot-blasting", label: `Pipework Blasting ${location.name}` },
              { slug: "agricultural-shot-blasting", label: `Agricultural Blasting ${location.name}` },
              { slug: "telecom-tower-shot-blasting", label: `Telecom Towers ${location.name}` },
              { slug: "machinery-shot-blasting", label: `Plant & Machinery ${location.name}` },
              { slug: "racking-shot-blasting", label: `Warehouse Racking ${location.name}` },
              { slug: "marine-shot-blasting", label: `Marine Blasting ${location.name}` },
              { slug: "intumescent-painting", label: `Intumescent Painting ${location.name}` },
            ].map((svc) => (
              <a
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="flex items-center justify-center text-center bg-white rounded-lg px-3 py-4 text-xs font-medium text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white transition-colors duration-200 shadow-sm hover:shadow-md leading-tight"
              >
                {svc.label}
              </a>
            ))}
          </div>
          <div className="text-center mt-6">
            <a href="/services" className="inline-flex items-center gap-2 text-[#2C5F7F] hover:text-[#1a3d52] font-semibold text-sm">
              View All 18 Shot Blasting Services
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Related Industries — county-specific 3-card section */}
      {(() => {
        const industryRouteMap: Record<string, { slug: string; label: string; desc: string }> = {
          "Manufacturing": { slug: "manufacturing", label: "Manufacturing", desc: "Surface preparation for fabricated components, plant, and production equipment." },
          "Construction": { slug: "construction", label: "Construction", desc: "Structural steel, cladding, and civil engineering surface preparation." },
          "CommercialConstruction": { slug: "construction", label: "Construction", desc: "Structural steel, cladding, and civil engineering surface preparation." },
          "Aerospace": { slug: "aerospace", label: "Aerospace & Defence", desc: "Precision blasting for aerospace components and defence structures." },
          "Aerospace&Defence": { slug: "aerospace", label: "Aerospace & Defence", desc: "Precision blasting for aerospace components and defence structures." },
          "Defense": { slug: "aerospace", label: "Aerospace & Defence", desc: "Precision blasting for aerospace components and defence structures." },
          "Marine": { slug: "marine", label: "Marine & Offshore", desc: "Shipyard, port, and offshore structure blasting to marine standards." },
          "Marine&Shipbuilding": { slug: "marine", label: "Marine & Offshore", desc: "Shipyard, port, and offshore structure blasting to marine standards." },
          "Shipbuilding&Marine": { slug: "marine", label: "Marine & Offshore", desc: "Shipyard, port, and offshore structure blasting to marine standards." },
          "Agriculture": { slug: "agriculture", label: "Agriculture", desc: "Farm machinery, grain stores, and agricultural equipment blasting." },
          "Retail": { slug: "retail", label: "Retail & Commercial", desc: "Shop fronts, mezzanine floors, and commercial property surface prep." },
          "Heritage&Restoration": { slug: "heritage-restoration", label: "Heritage & Restoration", desc: "Gentle blasting for listed buildings, ironwork, and heritage structures." },
          "Logistics": { slug: "transport-logistics", label: "Transport & Logistics", desc: "Fleet vehicles, trailers, and logistics infrastructure blasting." },
          "Automotive": { slug: "transport-logistics", label: "Transport & Logistics", desc: "Fleet vehicles, trailers, and logistics infrastructure blasting." },
          "Energy": { slug: "construction", label: "Energy & Infrastructure", desc: "Pipework, towers, and energy infrastructure surface preparation." },
          "Nuclear&Energy": { slug: "construction", label: "Energy & Infrastructure", desc: "Pipework, towers, and energy infrastructure surface preparation." },
          "Steel": { slug: "manufacturing", label: "Steel & Fabrication", desc: "Mill scale removal and surface prep for steel fabricators and stockholders." },
          "Ceramics": { slug: "manufacturing", label: "Ceramics & Potteries", desc: "Industrial kiln furniture, plant, and ceramics facility surface prep." },
          "Engineering": { slug: "manufacturing", label: "Engineering", desc: "Precision surface preparation for engineering components and structures." },
          "Technology": { slug: "manufacturing", label: "Technology & Engineering", desc: "Surface preparation for high-tech manufacturing facilities and equipment." },
          "Pharmaceuticals": { slug: "manufacturing", label: "Pharmaceuticals", desc: "Clean surface preparation for pharmaceutical plant and equipment." },
          "Nuclear": { slug: "construction", label: "Nuclear & Energy", desc: "Specialist surface preparation for nuclear and energy infrastructure." },
          "Ceramics&Potteries": { slug: "manufacturing", label: "Ceramics & Potteries", desc: "Industrial kiln furniture, plant, and ceramics facility surface prep." },
          "Shipbuilding": { slug: "marine", label: "Marine & Offshore", desc: "Shipyard, port, and offshore structure blasting to marine standards." },
          "Heritage": { slug: "heritage-restoration", label: "Heritage & Restoration", desc: "Gentle blasting for listed buildings, ironwork, and heritage structures." },
        };
        const county = countyData[location.countySlug];
        const countyIndustries = county?.industries ?? [];
        const industryCards = countyIndustries
          .map((ind) => industryRouteMap[ind.replace(/\s/g, "")])
          .filter(Boolean)
          .filter((v, i, arr) => arr.findIndex((x) => x.slug === v.slug) === i)
          .slice(0, 3);
        // Fallback to generic top-3 if county has no matching industries
        const fallbackCards = [
          { slug: "manufacturing", label: "Manufacturing", desc: "Surface preparation for fabricated components, plant, and production equipment." },
          { slug: "construction", label: "Construction", desc: "Structural steel, cladding, and civil engineering surface preparation." },
          { slug: "transport-logistics", label: "Transport & Logistics", desc: "Fleet vehicles, trailers, and logistics infrastructure blasting." },
        ];
        const cards = industryCards.length >= 2 ? industryCards : fallbackCards;
        return (
          <section className="py-12 bg-gray-50">
            <div className="container">
              <div className="text-center mb-6">
                <p className="text-[#2C5F7F] font-medium mb-1 uppercase tracking-wide text-sm">Sectors We Cover</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Industries We Serve in {location.name}
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  Shot blasting expertise across {location.county}'s key industrial sectors
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {cards.map(({ slug, label, desc }) => (
                  <Link key={slug} href={`/industries/${slug}`}>
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#2C5F7F]/30 transition-all duration-200 cursor-pointer group h-full flex flex-col gap-2">
                      <Factory className="w-5 h-5 text-[#2C5F7F] mb-1" />
                      <h3 className="font-semibold text-[#2C2C2C] group-hover:text-[#2C5F7F] transition-colors text-sm">{label}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed flex-1">{desc}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2C5F7F] mt-1">
                        View industry <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-5">
                <Link href="/industries" className="inline-flex items-center gap-2 text-sm text-[#2C5F7F] font-medium hover:underline">
                  <ArrowRight className="w-4 h-4" />
                  View all industries we serve
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

      {/* What to Expect Process Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Simple & Straightforward</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services in {location.name} — What to Expect
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Our shot blasting services in {location.name} are designed to be smooth from first contact to project completion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative flex flex-col items-center text-center p-6 bg-[#f0f6fb] rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-[#2C5F7F] text-white flex items-center justify-center text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>1</div>
              <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">Site Survey in {location.name}</h3>
              <p className="text-gray-600 text-sm">
                We visit your site in {location.name} at no charge, assess the surfaces to be blasted, and provide a detailed, no-obligation quote. We advise on the correct blast standard (SA2.5 or SA3) and any preparation needed.
              </p>
            </div>
            <div className="relative flex flex-col items-center text-center p-6 bg-[#f0f6fb] rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-[#2C5F7F] text-white flex items-center justify-center text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>2</div>
              <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">Mobile Unit Arrives On-Site</h3>
              <p className="text-gray-600 text-sm">
                Our fully equipped mobile shot blasting unit travels directly to your location in {location.name}. No need to transport your materials — we bring everything needed to carry out the work safely and efficiently on your premises.
              </p>
            </div>
            <div className="relative flex flex-col items-center text-center p-6 bg-[#f0f6fb] rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-[#2C5F7F] text-white flex items-center justify-center text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>3</div>
              <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">SA2.5 Finish &amp; Full Cleanup</h3>
              <p className="text-gray-600 text-sm">
                We complete the shot blasting to your specified standard — typically SA2.5 near white metal — and carry out a full site cleanup before leaving. Your surfaces are ready for protective coating immediately after our visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#2C5F7F] to-[#1a3a4d] text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Request A Site Visit in {location.name}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              No-obligation site visits for all shot blasting services in {location.name} and across {location.county}. Call us today or request a site visit online — we respond promptly.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-[#2C5F7F] hover:bg-gray-100"
                onClick={() => setQuotePopupOpen(true)}
              >
                Request A Site Visit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => { trackPhoneCall('07721375756', 'Location Page'); window.location.href = 'tel:07721375756'; }}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 07721 375756
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Preparation Checklist */}
      <section className="py-14 bg-gradient-to-br from-[#F5F1E8] to-[#EAE4D4]">
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <p className="text-[#2C5F7F] font-medium mb-1 uppercase tracking-wide text-sm">Before We Arrive</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>
              How to Prepare for Shot Blasting in {location.name}
            </h2>
            <p className="text-gray-600 mt-2 text-sm">Three simple steps to ensure your project runs smoothly</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                title: "Request A Site Survey",
                text: `Call 07721 375756 or use our online form to arrange a no-obligation site visit in ${location.name}. We will assess the surfaces, confirm the blast standard required (SA2.5 or SA3), and provide a written quote — after the visit.`
              },
              {
                step: 2,
                title: "Clear the Work Area & Arrange Access",
                text: `Ensure the surfaces to be blasted are accessible with a clear 2–3 metre perimeter. Confirm access for our mobile unit and advise us of any height restrictions, locked gates, or site induction requirements. Remove vehicles, equipment, and materials from the blast zone.`
              },
              {
                step: 3,
                title: "Coordinate Coating After Blasting",
                text: `Arrange for protective coating or primer to be applied as soon as possible after blasting — ideally within 4 hours for steel surfaces. Discuss timing with your coating contractor in advance so there is no delay between blasting and coating for the best long-term result.`
              }
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-6 shadow-sm border border-[#2C5F7F]/10">
                <div className="w-10 h-10 rounded-full bg-[#2C5F7F] text-white flex items-center justify-center font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-[#2C5F7F] text-base mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button className="bg-[#2C5F7F] hover:bg-[#1a3d52] text-white" onClick={() => setQuotePopupOpen(true)}>
              Request A Site Survey in {location.name}
            </Button>
          </div>
        </div>
      </section>

      {/* Related Counties */}
      {(() => {
        const nearbyCounties = Object.values(countyData)
          .filter((c) => c.slug !== location.countySlug && c.region === countyData[location.countySlug]?.region)
          .slice(0, 6);
        if (nearbyCounties.length === 0) return null;
        return (
          <section className="py-10 bg-gray-50 border-t border-gray-100">
            <div className="container">
              <div className="text-center mb-5">
                <p className="text-[#2C5F7F] font-medium mb-1 uppercase tracking-wide text-xs">Nearby Coverage</p>
                <h2 className="text-xl md:text-2xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Related Counties We Cover
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {nearbyCounties.map((c) => (
                  <Link key={c.slug} href={`/counties/${c.slug}`}>
                    <div className="group flex flex-col items-center gap-1 p-3 rounded-lg border border-gray-100 hover:border-[#2C5F7F] hover:shadow-md transition-all duration-200 bg-white cursor-pointer text-center">
                      <MapPin className="w-4 h-4 text-[#2C5F7F]" />
                      <p className="font-semibold text-xs text-[#2C2C2C] group-hover:text-[#2C5F7F] transition-colors leading-tight">{c.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Recently completed projects near {Town} — 3 geographically relevant case studies */}
      {(() => {
        const projects = getProjectsForCounty(location.countySlug || '', 3);
        if (!projects.length) return null;
        return (
          <section className="py-12 bg-white border-t border-gray-100">
            <div className="container">
              <div className="text-center mb-8">
                <p className="text-[#2C5F7F] font-medium mb-1 uppercase tracking-wide text-xs">Case Studies</p>
                <h2 className="text-xl md:text-2xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Recently Completed Projects near {location.name}
                </h2>
                <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
                  A selection of shot blasting projects completed by our team in {location.county} and surrounding areas.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {projects.map(project => (
                  <a
                    key={project.id}
                    href={getCanonicalServicePath(project.serviceSlug) ?? "/services"}
                    title={`${project.title} — ${project.serviceLabel} near ${location.name}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-[#2C5F7F] transition-all duration-200 flex flex-col"
                  >
                    <div className="relative overflow-hidden h-44">
                      <img
                        src={project.afterImage}
                        alt={`${project.title} — shot blasting result`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#2C5F7F] text-white text-xs font-semibold px-2 py-1 rounded">
                        {project.serviceLabel}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-[#2C2C2C] text-sm leading-snug mb-1 group-hover:text-[#2C5F7F] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed flex-1">{project.description}</p>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-400">{project.date}</span>
                        <span className="inline-flex items-center gap-1 text-xs text-[#2C5F7F] font-medium">
                          View service <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="text-center mt-6">
                <a href="/our-work" className="inline-flex items-center gap-2 text-sm text-[#2C5F7F] font-medium hover:underline">
                  View all completed projects <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Popular services near {Town} — 4 featured service cards with localized anchor text */}
      <section className="py-10 bg-[#f0f6fb] border-t border-gray-100">
        <div className="container">
          <div className="text-center mb-6">
            <p className="text-[#2C5F7F] font-medium mb-1 uppercase tracking-wide text-xs">Popular Services</p>
            <h2 className="text-xl md:text-2xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Popular Shot Blasting Services near {location.name}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { slug: "structural-steel-shot-blasting", label: `Structural Steel Shot Blasting in ${location.name}`, short: "Structural Steel" },
              { slug: "factory-cladding-shot-blasting", label: `Factory Cladding Shot Blasting in ${location.name}`, short: "Factory Cladding" },
              { slug: "floor-shot-blasting", label: `Floor Shot Blasting in ${location.name}`, short: "Floor Preparation" },
              { slug: "intumescent-painting", label: `Intumescent Painting Prep in ${location.name}`, short: "Intumescent Painting" },
            ].map(({ slug, label, short }) => (
              <a
                key={slug}
                href={`/services/${slug}`}
                title={label}
                className="group bg-white rounded-lg px-4 py-4 text-center shadow-sm border border-gray-100 hover:border-[#2C5F7F] hover:shadow-md transition-all duration-200 flex flex-col items-center gap-2"
              >
                <span className="text-xs font-semibold text-[#2C2C2C] group-hover:text-[#2C5F7F] transition-colors leading-tight">{short} in {location.name}</span>
                <span className="inline-flex items-center gap-1 text-xs text-[#2C5F7F] font-medium mt-auto">
                  View service <ArrowRight className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>
          <div className="text-center mt-5">
            <a href="/services" className="inline-flex items-center gap-2 text-sm text-[#2C5F7F] font-medium hover:underline">
              View all 19 shot blasting services <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Request A Site Visit — embedded inline contact form */}
      <section id="loc-contact" className="py-14 bg-[#1a3a52] text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
            {/* Left: copy + service links */}
            <div className="flex-1 md:max-w-md">
              <p className="text-[#7ec8e3] font-medium mb-1 uppercase tracking-wide text-xs">Site Visit — No Obligation</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Request A Site Visit in {location.name}
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-5">
                We provide mobile shot blasting services across {location.county}. Whether you need{" "}
                <a href="/services/structural-steel-shot-blasting" className="underline hover:text-white">structural steel shot blasting in {location.name}</a>,{" "}
                <a href="/services/factory-cladding-shot-blasting" className="underline hover:text-white">factory cladding preparation</a>,{" "}
                <a href="/services/floor-shot-blasting" className="underline hover:text-white">industrial floor blasting</a>, or{" "}
                <a href="/services/rust-removal" className="underline hover:text-white">rust removal</a>,
                we come directly to your site — no transport costs, no delays.
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-blue-200">
                  <CheckCircle className="w-4 h-4 text-[#7ec8e3] shrink-0" />
                  Site survey in {location.name}
                </div>
                <div className="flex items-center gap-2 text-blue-200">
                  <CheckCircle className="w-4 h-4 text-[#7ec8e3] shrink-0" />
                  SA2.5 / SA3 blast standard
                </div>
                <div className="flex items-center gap-2 text-blue-200">
                  <CheckCircle className="w-4 h-4 text-[#7ec8e3] shrink-0" />
                  
                </div>
                <div className="flex items-center gap-2 text-blue-200">
                  <CheckCircle className="w-4 h-4 text-[#7ec8e3] shrink-0" />
                  No transport costs — we come to you
                </div>
              </div>
              <a
                href="tel:07721375756"
                className="inline-flex items-center gap-2 mt-6 text-white font-semibold text-sm hover:text-[#7ec8e3] transition-colors"
                onClick={() => trackPhoneCall('07721375756', 'Location Page Inline CTA')}
              >
                <Phone className="w-4 h-4" />
                Or call us: 07721 375756
              </a>
            </div>

            {/* Right: inline form */}
            <div className="flex-1 w-full md:max-w-sm">
              {formSubmitted ? (
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <CheckCircle className="w-10 h-10 text-[#7ec8e3] mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-1">Site visit requested!</h3>
                  <p className="text-blue-100 text-sm">We'll be in touch shortly to confirm your site visit. For urgent jobs, call us directly on 07721 375756.</p>
                </div>
              ) : (
                <form onSubmit={handleInlineFormSubmit} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col gap-4">
                  <h3 className="font-semibold text-base mb-1">Request a site visit</h3>
                  <div>
                    <label className="block text-xs text-blue-200 mb-1" htmlFor="inline-name">Your name *</label>
                    <input
                      id="inline-name"
                      type="text"
                      required
                      placeholder="e.g. John Smith"
                      value={formName}
                      onChange={e => setFormName(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#7ec8e3] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-blue-200 mb-1" htmlFor="inline-phone">Phone number *</label>
                    <input
                      id="inline-phone"
                      type="tel"
                      required
                      placeholder="e.g. 07700 900000"
                      value={formPhone}
                      onChange={e => setFormPhone(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#7ec8e3] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-blue-200 mb-1" htmlFor="inline-email">Email address (optional)</label>
                    <input
                      id="inline-email"
                      type="email"
                      placeholder="e.g. john@company.co.uk"
                      value={formEmail}
                      onChange={e => setFormEmail(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#7ec8e3] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-blue-200 mb-1" htmlFor="inline-message">What do you need blasting? (optional)</label>
                    <textarea
                      id="inline-message"
                      rows={3}
                      placeholder={`e.g. Structural steel shot blasting in ${location.name} — 200m² of beams`}
                      value={formMessage}
                      onChange={e => setFormMessage(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#7ec8e3] transition-colors resize-none"
                    />
                  </div>
                  {formError && (
                    <p className="text-red-300 text-xs">{formError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-[#E8A020] hover:bg-[#d4911a] disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    {contactMutation.isPending ? (
                      <span>Sending…</span>
                    ) : (
                      <><ArrowRight className="w-4 h-4" /> Request A Site Visit</>
                    )}
                  </button>
                  <p className="text-blue-200 text-xs text-center">No spam. We'll only use your details to respond to your enquiry.</p>
                  <p className="text-blue-200/60 text-xs text-center">
                    Serving {location.name} and all of{"\ "}
                    <a href={`/counties/${location.countySlug}`} className="underline hover:text-white">{location.county}</a>
                    {" — and within 100 miles of our base."}
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-blue-200/50 text-xs">or</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                  <a
                    href={`https://wa.me/447970566409?text=${encodeURIComponent(`Hi, I'd like a quote for shot blasting in ${location.name}. Could you help?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] font-medium py-2.5 rounded-lg transition-colors text-sm"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Message us on WhatsApp
                  </a>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Nearby towns — dense internal link mesh between same-county town pages */}
      {nearbyTowns.length > 0 && (
        <section id="loc-nearby" className="py-10 bg-white border-t border-gray-100">
          <div className="container">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div>
                <p className="text-[#2C5F7F] font-medium mb-0.5 uppercase tracking-wide text-xs">Also Serving</p>
                <h2 className="text-lg font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Nearby Towns in {location.county}
                </h2>
              </div>
              <Link
                href={`/counties/${location.countySlug}`}
                className="text-sm text-[#2C5F7F] font-medium hover:underline shrink-0"
              >
                View all {location.county} areas →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {nearbyTowns.map(town => (
                <Link
                  key={town.slug}
                  href={`/service-areas/${town.slug}`}
                  title={`Shot Blasting in ${town.name}, ${location.county}`}
                  className="group flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-100 bg-gray-50 hover:border-[#2C5F7F] hover:bg-[#f0f6fb] transition-all duration-150 text-xs font-medium text-[#2C2C2C] hover:text-[#2C5F7F]"
                >
                  <MapPin className="w-3 h-3 text-[#2C5F7F] shrink-0" />
                  <span className="truncate">Shot Blasting in {town.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Browse by County — internal link to county hub for crawl equity */}
      <section className="py-5 bg-gray-50 border-t border-gray-200">
        <div className="container text-center">
          <p className="text-sm text-gray-500">
            Explore all towns and villages we serve in{" "}
            <Link href={`/counties/${location.countySlug}`} className="text-[#2C5F7F] hover:underline font-medium">
              {location.county}
            </Link>
            {" — or — "}
            <Link href="/counties" className="text-[#2C5F7F] hover:underline font-medium">
              browse all counties
            </Link>
          </p>
        </div>
      </section>

      {/* Sticky mobile Request A Site Visit bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#2C5F7F] shadow-[0_-2px_12px_rgba(0,0,0,0.15)] animate-[stickyPulse_0.6s_ease-in-out_3]"
        style={{ animationDelay: '1s' }}
      >
        <div className="flex items-stretch">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 text-white font-semibold text-sm relative overflow-hidden"
            onClick={() => setQuotePopupOpen(true)}
          >
            <CalendarCheck className="w-4 h-4" />
            Request A Site Visit
          </button>
          <a
            href="tel:07721375756"
            className="flex items-center justify-center gap-2 px-5 py-3.5 bg-[#1a3a4d] text-white font-semibold text-sm border-l border-white/20"
            onClick={() => trackPhoneCall('07721375756', 'Location Page Sticky Bar')}
            aria-label="Call 07721 375756"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>
      </div>

      {/* Share on Social Media */}
      <ShareButton
        title={`Shot Blasting Services in ${location.name} | Commercial Shot Blasting`}
        url={`/service-areas/${location.slug}`}
        description={`Professional shot blasting services in ${location.name}, ${location.county}. Mobile rust removal and surface preparation for commercial and industrial clients.`}
      />

      <Footer />

      {/* Add bottom padding on mobile to prevent content being hidden behind sticky bar */}
      <div className="h-14 md:hidden" aria-hidden="true" />

      <QuotePopup 
        open={quotePopupOpen} 
        onOpenChange={setQuotePopupOpen}
        locationName={location.name}
        defaults={surveyDefaults}
      />
    </>
  );
}
