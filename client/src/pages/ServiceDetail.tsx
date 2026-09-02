import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useParams } from "wouter";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, ArrowLeft, Clock, Shield, Award, ChevronDown, ChevronUp, Star, Flame } from "lucide-react";
import { useState } from "react";
import { getServiceSEO, useSEO } from "@/hooks/useSEO";
import { trackPhoneCall } from "@/lib/analytics";
import { getServiceById, services } from "@/data/services";
import { getServiceGallery, getServiceGalleries } from "@/data/serviceGalleries";
import { QuotePopup } from "@/components/QuotePopup";
import { CompactSurveyCapture } from "@/components/CompactSurveyCapture";
import type { SurveyBookingDefaults } from "@/components/SurveyBookingFlow";
import { LeadForm } from "@/components/LeadForm";
import { Header } from "@/components/Header";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BackToTop } from "@/components/BackToTop";
import { getPreparationSteps } from "@shared/servicePreparationSteps";

import { Footer } from "@/components/Footer";
import { IntumescentQuoteForm } from "@/components/IntumescentQuoteForm";
import { trpc } from "@/lib/trpc";
import { BeforeAfterCard } from "@/components/BeforeAfterCard";
import { StickyServiceButton } from "@/components/StickyServiceButton";
import { HBTunnellingTestimonial } from "@/components/HBTunnellingTestimonial";
export default function ServiceDetail() {
  const params = useParams<{ id: string }>();
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [surveyDefaults, setSurveyDefaults] = useState<SurveyBookingDefaults | undefined>();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const service = getServiceById(params.id || "");
  const { data: galleryItems } = trpc.gallery.list.useQuery();

  const openQuotePopup = () => {
    setSurveyDefaults(undefined);
    setQuotePopupOpen(true);
  };

  const openSurveyWithDefaults = (defaults: SurveyBookingDefaults) => {
    setSurveyDefaults(defaults);
    setQuotePopupOpen(true);
  };

  // Build a keyword map from service ID to gallery category keywords
  const serviceKeywords: Record<string, string[]> = {
    "structural-steel-frames": ["industrial", "steel", "structural"],
    "steel-chimney-surface-preparation": ["chimney", "stack", "steel", "structural"],
    "fire-escape-shot-blasting": ["fire escape", "staircase", "industrial"],
    "racking-mezzanine": ["industrial", "racking", "mezzanine"],
    "gate-restoration": ["gates", "railings", "metal"],
    "steel-doors-roller-shutters": ["industrial", "roller shutter", "steel"],
    "bridge-steelwork": ["bridge", "structural", "industrial"],
    "steel-containers": ["container", "industrial"],
    "floor-shot-blasting": ["floor", "concrete", "industrial"],
    "pipework-shot-blasting": ["pipework", "industrial"],
    "telecom-tower": ["industrial", "steel"],
    "machinery-shot-blasting": ["machinery", "industrial", "agricultural"],
    "marine-shot-blasting": ["marine", "industrial"],
    "rust-removal": ["industrial", "steel", "rust"],
    "mill-scale-removal": ["industrial", "steel"],
    "paint-stripping": ["industrial", "steel"],
    "coating-removal": ["industrial", "cladding"],
    "factory-cladding": ["cladding", "industrial", "agriculture"],
    "agricultural-shot-blasting": ["agricultural", "agriculture", "farm"],
    "steel-shot-blasting": ["industrial", "steel", "structural"],
    "concrete-preparation": ["floor", "concrete"],
    "automotive-restoration": ["automotive", "vehicle"],
    "infrastructure-projects": ["bridge", "structural", "industrial"],
    "intumescent-paint-removal": ["industrial", "steel"],
  };

  const keywords = serviceKeywords[params.id || ""] || [];
  const relatedProjects = (galleryItems || []).filter(item => {
    const cat = (item.category || "").toLowerCase();
    return keywords.some(kw => cat.includes(kw));
  }).slice(0, 3);

  // Set SEO metadata for this service
  if (service) {
    useSEO({ ...getServiceSEO(service.title, service.description), canonical: `https://commercialshotblasting.co.uk/services/${params.id}` });
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F1E8]">
        <h1 className="text-3xl font-bold text-[#2C5F7F] mb-4">Service Not Found</h1>
        <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
        <Link href="/">
          <Button className="bg-[#2C5F7F] hover:bg-[#234a63]">Return Home</Button>
        </Link>
      </div>
    );
  }

  // Get other services for the sidebar
  // Pin intumescent-painting first for structural-steel-frames since fire protection is directly relevant
  const otherServicesRaw = services.filter(s => s.id !== service.id);
  const pinIntumescent = ['structural-steel-frames', 'fire-escapes'];
  const otherServices = pinIntumescent.includes(service.id)
    ? [
        ...otherServicesRaw.filter(s => s.id === 'intumescent-painting'),
        ...otherServicesRaw.filter(s => s.id !== 'intumescent-painting'),
      ]
    : otherServicesRaw;

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Header */}
      <Header onOpenQuotePopup={openQuotePopup} />

      {/* Breadcrumb Navigation */}
      <section className="py-4 bg-gray-50 border-b border-gray-200">
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title, href: `/services/${service.id}`, isCurrentPage: true }
          ]} />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-16 lg:py-24">
        {/* Hidden LCP preload image — tells browser to fetch hero image at highest priority */}
        <img
          src={service.heroImage}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none"
        />
        <div className="absolute inset-0 bg-black/30" style={{
          backgroundImage: `url(${service.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }} />
        <div className="container relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {service.title}
          </h1>
          <p className="text-xl text-white/90 mb-6 max-w-2xl">{service.tagline}</p>
          {service.id === "structural-steel-frames" && (
            <aside className="mb-6 max-w-3xl rounded-xl border border-white/25 bg-[#102d3e]/75 p-4 shadow-lg backdrop-blur-sm" aria-label="HB Tunnelling client testimonial">
              <div className="flex items-center gap-3">
                <img
                  src="/manus-storage/hb-tunnelling-logo-official_1acf5938.png"
                  alt="HB Tunnelling logo"
                  width="400"
                  height="400"
                  className="h-11 w-11 shrink-0 rounded-full bg-white object-contain p-1"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f1c76e]">HB Tunnelling client feedback</p>
                  <blockquote className="mt-1 text-base font-semibold leading-snug text-white md:text-lg">
                    “They mobilised a large team and completed a substantial scope of work within a relatively short programme, minimising disruption to our operations.”
                  </blockquote>
                  <p className="mt-1 text-xs text-white/75">— Mark McGeady, HB Tunnelling Limited</p>
                </div>
              </div>
            </aside>
          )}
          <div className="flex flex-wrap gap-4">
            <Button className="bg-white text-[#2C5F7F] hover:bg-white/90" onClick={openQuotePopup}>
              Request A Site Visit
            </Button>
            <a href="tel:07721375756">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="w-4 h-4 mr-2" />
                Call Us Now
              </Button>
            </a>
          </div>
          <CompactSurveyCapture onStart={openSurveyWithDefaults} className="mt-7 max-w-3xl" />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-[#F5F1E8]">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Before/After Slider for Gate Restoration */}
              {service.id === "gate-restoration" && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    See the Transformation
                  </h2>
                  <BeforeAfterSlider
                    beforeImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/nMWUcZODmzxcQIPI.webp"
                    afterImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/KMeJJHNNjmrVCsLA.webp"
                    beforeLabel="Before"
                    afterLabel="After"
                    className="shadow-xl"
                  />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <p className="text-gray-600 text-sm">Drag the slider to see the dramatic transformation</p>
                    <div className="flex gap-3">
                      <Button onClick={openQuotePopup} className="bg-[#2C5F7F] hover:bg-[#234a63] text-white">
                        Request a Quote
                      </Button>
                      <Button asChild variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                        <a href="tel:07721375756" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Before/After Slider for Steel Shot Blasting */}
              {service.id === "steel-shot-blasting" && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    See the Transformation
                  </h2>
                  <BeforeAfterSlider
                    beforeImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oIKBPlRyGOSKXcAl.webp"
                    afterImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/xRNbdXezEbVeGwhe.webp"
                    beforeLabel="Before"
                    afterLabel="After"
                    className="shadow-xl"
                  />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <p className="text-gray-600 text-sm">Drag the slider to see the dramatic transformation</p>
                    <div className="flex gap-3">
                      <Button onClick={openQuotePopup} className="bg-[#2C5F7F] hover:bg-[#234a63] text-white">
                        Request a Quote
                      </Button>
                      <Button asChild variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                        <a href="tel:07721375756" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Before/After Slider for Automotive Restoration */}
              {service.id === "automotive-restoration" && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    See the Transformation
                  </h2>
                  <BeforeAfterSlider
                    beforeImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/RoKEcJObqHLwwzcU.webp"
                    afterImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/IqaUrBoOewlidHxp.webp"
                    beforeLabel="Before"
                    afterLabel="After"
                    className="shadow-xl"
                  />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <p className="text-gray-600 text-sm">Drag the slider to see the dramatic transformation</p>
                    <div className="flex gap-3">
                      <Button onClick={openQuotePopup} className="bg-[#2C5F7F] hover:bg-[#234a63] text-white">
                        Request a Quote
                      </Button>
                      <Button asChild variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                        <a href="tel:07721375756" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Before/After Slider for Concrete Preparation */}
              {service.id === "concrete-preparation" && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    See the Transformation
                  </h2>
                  <BeforeAfterSlider
                    beforeImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/QRpJYgxdNmiyqvIK.webp"
                    afterImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/eujkoesZcJTxNAzk.webp"
                    beforeLabel="Before"
                    afterLabel="After"
                    className="shadow-xl"
                  />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <p className="text-gray-600 text-sm">Drag the slider to see the dramatic transformation</p>
                    <div className="flex gap-3">
                      <Button onClick={openQuotePopup} className="bg-[#2C5F7F] hover:bg-[#234a63] text-white">
                        Request a Quote
                      </Button>
                      <Button asChild variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                        <a href="tel:07721375756" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Before/After Slider for Marine Services */}
              {service.id === "marine-services" && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    See the Transformation
                  </h2>
                  <BeforeAfterSlider
                    beforeImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/myUKFvWpLHDeGJcG.webp"
                    afterImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/uyCbSCtkFJehzTxI.webp"
                    beforeLabel="Before"
                    afterLabel="After"
                    className="shadow-xl"
                  />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <p className="text-gray-600 text-sm">Drag the slider to see the dramatic transformation</p>
                    <div className="flex gap-3">
                      <Button onClick={openQuotePopup} className="bg-[#2C5F7F] hover:bg-[#234a63] text-white">
                        Request a Quote
                      </Button>
                      <Button asChild variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                        <a href="tel:07721375756" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Before/After Slider for Agricultural Equipment */}
              {service.id === "agricultural-equipment" && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    See the Transformation
                  </h2>
                  <BeforeAfterSlider
                    beforeImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/zZPJdDNrwllRPDRT.webp"
                    afterImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/fDsaRxagauTcgoki.webp"
                    beforeLabel="Before"
                    afterLabel="After"
                    className="shadow-xl"
                  />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <p className="text-gray-600 text-sm">Drag the slider to see the dramatic transformation</p>
                    <div className="flex gap-3">
                      <Button onClick={openQuotePopup} className="bg-[#2C5F7F] hover:bg-[#234a63] text-white">
                        Request a Quote
                      </Button>
                      <Button asChild variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                        <a href="tel:07721375756" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Before/After Slider for Infrastructure Projects */}
              {service.id === "infrastructure-projects" && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    See the Transformation
                  </h2>
                  <BeforeAfterSlider
                    beforeImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oIKBPlRyGOSKXcAl.webp"
                    afterImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/xRNbdXezEbVeGwhe.webp"
                    beforeLabel="Before"
                    afterLabel="After"
                    className="shadow-xl"
                  />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <p className="text-gray-600 text-sm">Drag the slider to see the dramatic transformation</p>
                    <div className="flex gap-3">
                      <Button onClick={openQuotePopup} className="bg-[#2C5F7F] hover:bg-[#234a63] text-white">
                        Request a Quote
                      </Button>
                      <Button asChild variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                        <a href="tel:07721375756" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  About This Service
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">{service.description}</p>
              </div>

              {service.id === "steel-chimney-surface-preparation" && (
                <section className="rounded-2xl border border-[#2C5F7F]/15 bg-white p-6 md:p-8 shadow-sm" aria-labelledby="steel-chimney-evidence-heading">
                  <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#2C5F7F]">Verified project evidence</p>
                      <h2 id="steel-chimney-evidence-heading" className="text-3xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Steel Chimney Section — Surface Preparation
                      </h2>
                    </div>
                    <Link href="/our-work#steel-chimney-case-study" className="inline-flex items-center gap-1 text-sm font-semibold text-[#2C5F7F] hover:underline">
                      Browse the full project <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <p className="mb-6 text-gray-600 leading-relaxed">
                    Supplied project photos and video show a fabricated chimney section at surface-preparation stage, including the cylindrical body, flange, access opening, stiffeners, and accessible internal surfaces. This record does not state an unverified site location, programme, blast standard, client, or final coating system.
                  </p>
                  <p className="mb-6 text-sm text-gray-600">
                    Preparing an estimate? Read our <Link href="/blog/steel-fabrication-shot-blasting-costs-and-programme-guide" className="font-semibold text-[#2C5F7F] hover:underline">steel fabrication shot blasting costs and programme guide</Link> for the drawings, condition details, access information, and coating requirements that help define a clear scope.
                  </p>
                  <div className="grid gap-5 md:grid-cols-2">
                    <BeforeAfterSlider
                      beforeImage="/manus-storage/SteelChimneyBefore2_15695f0b.jpeg"
                      afterImage="/manus-storage/SteelChimneyAfter2_3b5e3186.jpeg"
                      beforeLabel="Before surface preparation"
                      afterLabel="Prepared surface"
                      className="shadow-lg"
                    />
                    <div className="overflow-hidden rounded-xl bg-[#1a3d52] shadow-lg">
                      <video className="h-full min-h-64 w-full object-cover" controls playsInline preload="metadata" poster="/manus-storage/SteelChimneyDuring4_0805e0e0.jpeg">
                        <source src="/manus-storage/SteelChimneyVideo1_b56615a3.mp4" type="video/mp4" />
                        Your browser does not support the project video.
                      </video>
                    </div>
                  </div>
                </section>
              )}

              {/* Steel Sheeting Video Section */}
              {service.id === 'steel-sheeting' && (
                <div className="my-12">
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Watch Our Steel Sheeting Shot Blasting Process
                  </h2>
                  <p className="text-gray-600 mb-6">
                    See our precision shot blasting equipment in action as we transform steel sheets, removing rust, mill scale, and old coatings to create the perfect surface profile for protective finishes.
                  </p>
                  
                  <div className="flex justify-center">
                    <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-[#2C5F7F]/20 max-w-md w-full">
                      <video 
                        className="w-full h-auto object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                      >
                        <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/CICKcOChLeIGkWWG.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-[#F5F1E8] rounded-lg p-6 border border-[#2C5F7F]/10">
                      <Shield className="w-10 h-10 text-[#2C5F7F] mb-3" />
                      <h3 className="font-bold text-lg text-[#2C2C2C] mb-2">Complete Coverage</h3>
                      <p className="text-gray-600 text-sm">Uniform blasting across entire surface area ensures consistent results</p>
                    </div>
                    <div className="bg-[#F5F1E8] rounded-lg p-6 border border-[#2C5F7F]/10">
                      <Clock className="w-10 h-10 text-[#2C5F7F] mb-3" />
                      <h3 className="font-bold text-lg text-[#2C2C2C] mb-2">Efficient Process</h3>
                      <p className="text-gray-600 text-sm">Fast turnaround times minimize project delays</p>
                    </div>
                    <div className="bg-[#F5F1E8] rounded-lg p-6 border border-[#2C5F7F]/10">
                      <Award className="w-10 h-10 text-[#2C5F7F] mb-3" />
                      <h3 className="font-bold text-lg text-[#2C2C2C] mb-2">Quality Finish</h3>
                      <p className="text-gray-600 text-sm">Perfect surface profile for optimal coating adhesion</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Factory Cladding Custom Gallery with 4 Before Images */}
              {service.id === 'factory-cladding' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Project Gallery: Industrial Warehouse Cladding Restoration
                  </h2>
                  <p className="text-gray-600 mb-6">
                    This project showcases the complete transformation of severely deteriorated warehouse cladding. The before images reveal the extent of the challenge: rust-coloured panels with original plastisol coating, multiple layers of failed paint, extensive peeling, and decades of weathering across the entire building envelope.
                  </p>
                  
                  {/* Before Images Grid */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">Before: Deteriorated Condition</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/HPtwzIiiccJOKYrw.webp" alt="Warehouse exterior showing deteriorated cladding" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="bg-gray-100 p-3">
                          <p className="text-sm text-gray-700">Warehouse exterior with severely deteriorated cladding panels</p>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/VBPKVVqzkWqJEjhF.webp" alt="Cladding showing multiple paint layers and rust" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="bg-gray-100 p-3">
                          <p className="text-sm text-gray-700">Multiple paint layers and plastisol coating failure</p>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/lBYMCISDpxYErzLZ.webp" alt="Close-up of deteriorated cladding panels" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="bg-gray-100 p-3">
                          <p className="text-sm text-gray-700">Close-up showing extent of coating deterioration</p>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/pYlYIpwTFEkTtuTj.webp" alt="Detailed view of peeling paint and rust" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="bg-gray-100 p-3">
                          <p className="text-sm text-gray-700">Peeling paint, rust, and surface contamination</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* After Image */}
                  <div>
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">After: Complete Restoration</h3>
                    <div className="overflow-hidden rounded-lg shadow-xl">
                      <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/xycLxipcWuKbKQsB.webp" alt="Fully restored warehouse cladding - clean bare metal" className="w-full h-96 object-cover" width="800" height="384" />
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4">
                        <p className="text-lg font-semibold text-gray-800 mb-2">Transformation Complete</p>
                        <p className="text-gray-700">Clean, uniform bare metal surfaces ready for protective coating. All plastisol, paint layers, rust, and contaminants completely removed while preserving panel integrity.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Intumescent Painting — Tailored Quick Quote Form */}
              {service.id === 'intumescent-painting' && (
                <IntumescentQuoteForm onOpenQuotePopup={openQuotePopup} />
              )}

              {service.id === 'intumescent-painting' && (
                <section className="mb-12 overflow-hidden rounded-2xl border border-[#2C5F7F]/20 bg-gradient-to-br from-[#183c52] to-[#2C5F7F] p-6 text-white shadow-lg md:p-8" aria-labelledby="hb-intumescent-callout-heading">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#f1c76e]">
                        <Flame className="h-4 w-4" /> End-to-end project evidence
                      </div>
                      <h2 id="hb-intumescent-callout-heading" className="text-2xl font-bold leading-tight md:text-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Surface preparation and fire protection delivered under one coordinated plan.
                      </h2>
                      <p className="mt-4 leading-relaxed text-white/85">
                        At HB Tunnelling in Doncaster, our five-person specialist team abrasive blasted the exposed structural steel, applied primer straight after preparation, and completed the intumescent fire-protective coating as one end-to-end delivery.
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-white/70">
                        This reduced handovers between separate trades and helped maintain continuous progress through the warehouse refurbishment programme.
                      </p>
                    </div>
                    <Link href="/case-studies/hb-tunnelling-doncaster" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#f1c76e] px-5 py-3 font-bold text-[#183c52] transition hover:bg-white active:scale-[0.98]">
                      View the HB Tunnelling case study <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </section>
              )}

              {/* Structural Steel Frames — Sa 2.5 Near-White Metal Section */}
              {service.id === 'structural-steel-frames' && (
                <div className="mb-12">
                  {/* Section header */}
                  <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#2C5F7F]/60 mb-2">Surface Preparation Standard</p>
                    <h2 className="text-3xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Sa 2.5 Near-White Metal — Why It Matters for Structural Steel
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      Every structural steel frame we blast is prepared to <strong>Sa 2.5 near-white metal standard</strong> — the internationally recognised benchmark for structural steelwork that will receive a protective or intumescent coating. This isn't a preference; it's what the coating manufacturers require for their products to perform as specified.
                    </p>
                  </div>

                  {/* Photo + video side by side */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="overflow-hidden rounded-xl shadow-lg">
                      <img
                        src="https://commercialshotblasting.co.uk/manus-storage/struct_thumbnail_hd_bc2083e2.jpg"
                        alt="Steel column and beam connection blasted to Sa 2.5 near-white metal standard"
                        className="w-full h-72 object-cover"
                        width="576"
                        height="288"
                        loading="lazy"
                      />
                      <div className="bg-gray-50 p-3">
                        <p className="text-sm text-gray-700">Steel column and beam connection — blasted to Sa 2.5 near-white metal, ready for coating</p>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg">
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-72 object-cover"
                        aria-label="Shot blasting structural steel to Sa 2.5 standard"
                      >
                        <source src="https://commercialshotblasting.co.uk/manus-storage/WhatsAppVideo2026-07-03at11.37.45_9416062e.mp4" type="video/mp4" />
                      </video>
                      <div className="bg-gray-50 p-3">
                        <p className="text-sm text-gray-700">Live footage — blasting structural steelwork to Sa 2.5 near-white metal standard on site</p>
                      </div>
                    </div>
                  </div>

                  {/* What Sa 2.5 means */}
                  <div className="grid md:grid-cols-3 gap-5 mb-8">
                    <div className="bg-[#2C5F7F]/5 border border-[#2C5F7F]/15 rounded-xl p-5">
                      <div className="w-10 h-10 bg-[#2C5F7F] rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <h3 className="font-bold text-[#2C5F7F] mb-2">What Sa 2.5 Means</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">Sa 2.5 is defined in ISO 8501-1 as a very thorough blast clean — at least 95% of the surface is free from all mill scale, rust, paint, and foreign matter. The remaining traces must be only slight staining in the form of spots or stripes.</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </div>
                      <h3 className="font-bold text-gray-800 mb-2">The Anchor Profile</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">Shot blasting creates a microscopic anchor profile (Rz 50–75 μm) across the steel surface. This roughness dramatically increases the surface area available for coating adhesion — without it, even the best primer will peel prematurely.</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <h3 className="font-bold text-gray-800 mb-2">Why Timing Matters</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">Freshly blasted steel will begin to flash rust within hours in humid conditions. Our on-site service means primer is applied the same day the steel is blasted — eliminating the window in which contamination can re-occur before coating.</p>
                    </div>
                  </div>

                  {/* What happens without Sa 2.5 */}
                    <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-6 mb-8">
                      <h3 className="font-bold text-red-800 mb-3 text-lg">What Happens If Steel Isn't Prepared to Sa 2.5?</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-sm text-red-700">
                        <li className="flex items-start gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />Coatings applied over mill scale will delaminate — mill scale contracts at a different rate to steel and takes the coating with it</li>
                        <li className="flex items-start gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />Intumescent paint applied without Sa 2.5 will not achieve its specified fire resistance performance</li>
                      </ul>
                      <ul className="space-y-2 text-sm text-red-700">
                        <li className="flex items-start gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />Coating warranties are voided if the substrate preparation is not documented to the required standard</li>
                        <li className="flex items-start gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />Premature corrosion under the coating is invisible until it has already caused structural damage</li>
                      </ul>
                      </div>
                    </div>

                    <section className="overflow-hidden rounded-2xl border border-[#2C5F7F]/20 bg-gradient-to-br from-[#183c52] to-[#2C5F7F] p-6 text-white shadow-lg md:p-8" aria-labelledby="hb-tunnelling-callout-heading">
                      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center">
                        <div className="max-w-2xl">
                          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#f1c76e]">
                            <Flame className="h-4 w-4" /> End-to-end project evidence
                          </div>
                          <h2 id="hb-tunnelling-callout-heading" className="text-2xl font-bold leading-tight md:text-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                            See rapid blasting and intumescent coating delivered as one coordinated scope.
                          </h2>
                          <p className="mt-4 leading-relaxed text-white/85">
                            On the HB Tunnelling Doncaster warehouse refurbishment, our five-person specialist team abrasive blasted the exposed steelwork, applied primer straight after preparation, and completed the intumescent fire-protective coating as one coordinated delivery.
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-white/70">
                            Keeping preparation and fire protection together reduced handovers between trades and helped maintain continuous progress through the refurbishment programme.
                          </p>
                        </div>
                        <div className="overflow-hidden rounded-xl border border-white/20 bg-[#102d3e] shadow-xl">
                          <video
                            controls
                            playsInline
                            preload="metadata"
                            poster="https://commercialshotblasting.co.uk/manus-storage/hb-tunnelling-video-still-25_e27be683.webp"
                            className="aspect-video w-full object-cover"
                            aria-label="HB Tunnelling end-to-end blasting and intumescent coating project film"
                          >
                            <source src="https://commercialshotblasting.co.uk/manus-storage/hb-tunnelling-doncaster-surface-preparation_0f209a96.mp4" type="video/mp4" />
                          </video>
                          <div className="p-3">
                            <p className="text-xs font-semibold text-white/75">HB Tunnelling project film</p>
                            <Link href="/case-studies/hb-tunnelling-doncaster" className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#f1c76e] transition hover:text-white">
                              View the full case study <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                )}

              {['structural-steel-frames', 'intumescent-painting'].includes(service.id) && (
                <HBTunnellingTestimonial variant="service" />
              )}

              {/* Related Reading: Preparation Guide — shown on structural steel pages */}
              {['structural-steel-frames', 'fire-escapes', 'bridge-steelwork', 'steel-containers', 'steel-sheeting'].includes(service.id) && (
                <div className="bg-[#2C5F7F]/5 border border-[#2C5F7F]/20 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#2C5F7F] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#2C5F7F] uppercase tracking-wide mb-1">Related Reading</p>
                      <a
                        href="/blog/how-to-prepare-structural-steel-for-shot-blasting"
                        className="text-lg font-bold text-[#2C5F7F] hover:text-[#1a3d52] transition-colors leading-snug block mb-2"
                      >
                        How to Prepare Structural Steel for Shot Blasting →
                      </a>
                      <p className="text-sm text-gray-600">
                        A practical guide covering degreasing, weld spatter removal, Sa standards, and the most common
                        mistakes that cause re-work. Essential reading before your blast team arrives on site.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Structural Steel Frames Custom Gallery with Before/During/After */}
              {service.id === 'structural-steel-frames' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Project Gallery: Commercial Building Structural Steel Frame Restoration
                  </h2>
                  <p className="text-gray-600 mb-6">
                    This project showcases the comprehensive shot blasting of extensive structural steel roof trusses and load-bearing frames in a commercial building. Follow the progression from the original mill-finished condition through the blasting process to the final restored state ready for protective coating.
                  </p>
                  
                  {/* Before Image */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">Before: Mill-Finished Condition</h3>
                    <div className="overflow-hidden rounded-lg shadow-xl">
                      <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/kUmVTjjoKHDIHFAO.webp" alt="Structural steel frames before blasting - mill scale and surface contaminants" className="w-full h-96 object-cover" width="800" height="384" />
                      <div className="bg-gray-100 p-4">
                        <p className="text-gray-700">Complex truss systems and frame members with mill scale, welding residue, and surface contaminants requiring complete removal for protective coating application.</p>
                      </div>
                    </div>
                  </div>

                  {/* During Image */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">During: Shot Blasting in Progress</h3>
                    <div className="overflow-hidden rounded-lg shadow-xl">
                      <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/VHkedDMGmJpYzYPp.webp" alt="Shot blasting process on structural steel trusses" className="w-full h-96 object-cover" width="800" height="384" />
                      <div className="bg-blue-50 p-4">
                        <p className="text-gray-700">Systematic shot blasting across the entire ceiling framework, removing all mill scale and contaminants from truss members, connection points, and hard-to-reach areas within the lattice structure.</p>
                      </div>
                    </div>
                  </div>

                  {/* After Images Grid */}
                  <div>
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">After: Complete Restoration</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="overflow-hidden rounded-lg shadow-xl">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/keEfSolNJRyexVMA.webp" alt="Restored structural steel frames - clean bare metal" className="w-full h-80 object-cover" width="800" height="320" />
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3">
                          <p className="text-sm text-gray-700">Uniform clean bare metal surfaces across all truss members and frame sections</p>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-lg shadow-xl">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/uOCIAHRxAwvXUrjJ.webp" alt="Complete view of restored structural framework" className="w-full h-80 object-cover" width="800" height="320" />
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3">
                          <p className="text-sm text-gray-700">Complete structural framework prepared to specification, ready for protective coating</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                      <p className="text-lg font-semibold text-gray-800 mb-2">Project Complete</p>
                      <p className="text-gray-700">Hundreds of linear metres of structural steelwork transformed to uniform, clean bare metal surfaces achieving professional cleanliness. All connection points, welds, and complex truss geometry achieved consistent surface preparation for optimal coating adhesion.</p>
                    </div>
                  </div>

                  {/* Case Study Link */}
                  <div className="mt-8 p-5 rounded-xl border border-amber-400/40 bg-amber-50 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-1">Real Project Case Study</p>
                      <p className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>Commercial Building Structural Steel — 25 Real Photos</p>
                      <p className="text-sm text-gray-600 mt-1">See the full project documentation: coating removal from all structural steel columns across a large commercial building, with 25 real on-site photographs.</p>
                    </div>
                    <Link href="/case-studies/structural-steel" className="flex-shrink-0 inline-flex items-center gap-2 bg-amber-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-amber-600 transition-colors">
                      View Case Study <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Related Service: Intumescent Painting */}
                  <div className="mt-8 p-5 rounded-xl border border-[#2C5F7F]/20 bg-[#2C5F7F]/5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#2C5F7F]/70 mb-1">Related Service</p>
                      <p className="text-lg font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>Intumescent Painting</p>
                      <p className="text-sm text-gray-600 mt-1">We offer a complete in-house service — shot blast to Sa 2.5, then apply certified intumescent coatings for structural steel fire protection. Two teams on site, blasting and painting on the same day.</p>
                    </div>
                    <Link href="/services/intumescent-painting" className="flex-shrink-0 inline-flex items-center gap-2 bg-[#2C5F7F] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1e4a63] transition-colors">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Steel Fabrications Gallery CTA */}
                  <div className="mt-8 p-5 rounded-xl border border-[#7EC8E3]/40 bg-gradient-to-r from-[#e8f4f9] to-[#f0f8ff] flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#2C5F7F]/70 mb-1">Project Gallery</p>
                      <p className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>Steel Fabrications — Before &amp; After Photos</p>
                      <p className="text-sm text-gray-600 mt-1">See 5 real fabrication projects: frames, base plates, arch fabrications, and channel assemblies blasted to Sa 2.5 standard — with interactive before/after sliders and a during shot inside our blast cabinet.</p>
                    </div>
                    <Link href="/steel-fabrications" className="flex-shrink-0 inline-flex items-center gap-2 bg-[#2C5F7F] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1e4a63] transition-colors whitespace-nowrap">
                      View Gallery <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Steel Gates Custom Gallery */}
              {service.id === 'steel-gates' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Project Gallery: Victorian Entrance Gates Restoration
                  </h2>
                  <p className="text-gray-600 mb-6">
                    This project showcases the complete restoration of ornate Victorian entrance gates for a commercial property. Follow the transformation from decades of deterioration through the careful shot blasting process to the final restored state, revealing the full beauty of the original craftsmanship.
                  </p>
                  
                  {/* Before Images Grid */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">Before: Decades of Deterioration</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="overflow-hidden rounded-lg shadow-xl">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/YxhVJYEGtCLThoaq.webp" alt="Gate showing rust and peeling paint on decorative railings" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="bg-gray-100 p-3">
                          <p className="text-sm text-gray-700">Decorative railings obscured by multiple layers of failing paint and rust</p>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-lg shadow-xl">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/VeYrspTLUvTsnnCg.webp" alt="Close-up of corroded gate base and lower sections" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="bg-gray-100 p-3">
                          <p className="text-sm text-gray-700">Severe corrosion at gate base where water pooling accelerated deterioration</p>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-lg shadow-xl">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/WIQxPqGtEySDWwTf.webp" alt="Ornate gate panels with paint buildup hiding details" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="bg-gray-100 p-3">
                          <p className="text-sm text-gray-700">Ornate scrollwork and finials hidden under decades of paint buildup</p>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-lg shadow-xl">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/rZAEwngYaDrtuLvP.webp" alt="Full gate view showing overall deteriorated condition" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="bg-gray-100 p-3">
                          <p className="text-sm text-gray-700">Complete gate structure requiring comprehensive restoration</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* During Images */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">During: Careful Shot Blasting Process</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="overflow-hidden rounded-lg shadow-xl">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/wmCPjmSFLCFAuCys.webp" alt="Shot blasting in progress on ornate gate panels" className="w-full h-80 object-cover" width="800" height="320" />
                        <div className="bg-blue-50 p-3">
                          <p className="text-sm text-gray-700">Systematic blasting revealing the intricate Victorian scrollwork beneath paint layers</p>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-lg shadow-xl">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/nGTIujzIIiKUlGeB.webp" alt="Partial restoration showing contrast between cleaned and uncleaned sections" className="w-full h-80 object-cover" width="800" height="320" />
                        <div className="bg-blue-50 p-3">
                          <p className="text-sm text-gray-700">Dramatic contrast between restored bare metal and remaining deteriorated sections</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* After Image */}
                  <div>
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">After: Restored to Original Splendor</h3>
                    <div className="overflow-hidden rounded-lg shadow-xl mb-4">
                      <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/dIVmiYILOzXbQFlg.webp" alt="Fully restored Victorian gates - clean bare metal revealing ornate details" className="w-full h-96 object-cover" width="800" height="384" />
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4">
                        <p className="text-gray-700">Complete gate restoration revealing the full beauty of Victorian craftsmanship - all decorative scrollwork, finials, and ornate details preserved and prepared for protective coating.</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                      <p className="text-lg font-semibold text-gray-800 mb-2">Heritage Preserved</p>
                      <p className="text-gray-700">These Victorian entrance gates have been transformed from deteriorated eyesores to stunning architectural features. Every intricate detail has been preserved while achieving complete rust removal and optimal surface preparation. The gates are now ready for a high-quality protective coating system that will ensure decades more service life while maintaining the property's heritage character.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Fire Escapes Video Showcase */}
              {service.id === 'fire-escapes' && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Fire Escape Shot Blasting — See Our Work
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Watch our mobile shot blasting unit removing rust, old paint, and corrosion from external fire escape steelwork — all carried out on-site at the customer's premises, no dismantling required, blasted to Sa 2.5 near-white metal standard.
                  </p>

                  {/* Video 1 — blasting in action */}
                  <div className="mb-8">
                    <div className="rounded-xl overflow-hidden shadow-xl bg-black">
                      <video
                        controls
                        preload="metadata"
                        poster="/manus-storage/staircase_thumb_d419ab8f.jpg"
                        className="w-full max-h-[520px] object-contain"
                        aria-label="On-site shot blasting of a rusted steel fire escape — rust, old paint and corrosion removed to Sa 2.5 near-white metal standard using mobile blasting equipment"
                        title="Fire Escape Shot Blasting — On-Site Rust and Paint Removal"
                      >
                        <source src="/manus-storage/WhatsAppVideo2026-06-27at13.50.17(1)_eb3b71ad.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      Mobile shot blasting removing rust and old paint from a steel fire escape structure — blasted in place on-site to Sa 2.5 near-white metal standard. No dismantling, no transport. We come to you.
                    </p>
                  </div>

                  {/* Video 2 — finished Sa 2.5 surface */}
                  <div className="mb-8">
                    <div className="rounded-xl overflow-hidden shadow-xl bg-black">
                      <video
                        controls
                        preload="metadata"
                        poster="/manus-storage/staircase_thumb_d419ab8f.jpg"
                        className="w-full max-h-[520px] object-contain"
                        aria-label="Steel fire escape after shot blasting — clean Sa 2.5 near-white metal surface across all structural members, treads, risers and handrails, ready for priming and protective coating"
                        title="Fire Escape After Shot Blasting — Sa 2.5 Surface Ready for Protective Coating"
                      >
                        <source src="/manus-storage/WhatsAppVideo2026-06-27at13.50.17(2)_f192dcbc.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      The completed Sa 2.5 near-white metal surface on a steel fire escape — all structural members, treads, risers, stringers, and handrails blasted clean and ready for immediate priming and long-lasting protective coating application.
                    </p>
                  </div>

                  {/* Before & After Gallery */}
                  <div className="mt-10 mb-8">
                    <h2 className="text-3xl font-bold text-[#2C5F7F] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Fire Escape Shot Blasting — Before &amp; After Gallery
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Drag the slider on each image to compare the rusted, corroded steel before blasting with the clean Sa 2.5 near-white metal surface after. All work carried out on-site — no dismantling, no transport.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Project 1 */}
                      <div>
                        <h3 className="text-lg font-semibold text-[#2C5F7F] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Project 1</h3>
                        <BeforeAfterSlider
                          beforeImage="/manus-storage/fireescape1before_b56bfae9.jpg"
                          afterImage="/manus-storage/FireEscape1after1_c5b095f6.jpg"
                          beforeLabel="Before"
                          afterLabel="After"
                          className="shadow-xl rounded-xl overflow-hidden"
                        />
                        <p className="text-sm text-gray-500 mt-2">Heavy rust and old paint removed to Sa 2.5 near-white metal standard — treads, risers, and structural members.</p>
                      </div>
                      {/* Project 2 */}
                      <div>
                        <h3 className="text-lg font-semibold text-[#2C5F7F] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Project 2</h3>
                        <BeforeAfterSlider
                          beforeImage="/manus-storage/FireEscape1before2_5381dc45.jpg"
                          afterImage="/manus-storage/FireEscape1after2_6ec7b073.jpg"
                          beforeLabel="Before"
                          afterLabel="After"
                          className="shadow-xl rounded-xl overflow-hidden"
                        />
                        <p className="text-sm text-gray-500 mt-2">Corroded handrails and landing plates blasted clean — surface profile created for maximum primer adhesion.</p>
                      </div>
                      {/* Project 3 */}
                      <div>
                        <h3 className="text-lg font-semibold text-[#2C5F7F] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Project 3</h3>
                        <BeforeAfterSlider
                          beforeImage="/manus-storage/FireEscape1before3_a7902523.jpg"
                          afterImage="/manus-storage/FireEscape1after3_e04fabf0.jpg"
                          beforeLabel="Before"
                          afterLabel="After"
                          className="shadow-xl rounded-xl overflow-hidden"
                        />
                        <p className="text-sm text-gray-500 mt-2">Stringers and cross-members freed of scale and corrosion — ready for epoxy zinc phosphate primer within 2–4 hours.</p>
                      </div>
                      {/* Project 4 */}
                      <div>
                        <h3 className="text-lg font-semibold text-[#2C5F7F] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Project 4</h3>
                        <BeforeAfterSlider
                          beforeImage="/manus-storage/FireEscape1before4_b36c600d.jpg"
                          afterImage="/manus-storage/FireEscape1after4_cad5023d.jpg"
                          beforeLabel="Before"
                          afterLabel="After"
                          className="shadow-xl rounded-xl overflow-hidden"
                        />
                        <p className="text-sm text-gray-500 mt-2">Full fire escape structure blasted on-site — all surfaces including bolt heads, welds, and tight angles prepared to specification.</p>
                      </div>
                    </div>
                  </div>

                  {/* Related Service: External Staircases */}
                  <div className="mt-4 p-5 rounded-xl border border-[#2C5F7F]/20 bg-[#2C5F7F]/5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#2C5F7F]/70 mb-1">Related Service</p>
                      <p className="text-lg font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>External Staircases Shot Blasting</p>
                      <p className="text-sm text-gray-600 mt-1">We also specialise in shot blasting external steel access staircases — loading bay steps, industrial staircases, and external building stairs blasted on-site to Sa 2.5 standard. See our dedicated page with more videos and project details.</p>
                    </div>
                    <Link href="/external-staircases" className="flex-shrink-0 inline-flex items-center gap-2 bg-[#2C5F7F] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1e4a63] transition-colors">
                      View Page <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Related Service: Intumescent Painting */}
                  <div className="mt-4 p-5 rounded-xl border border-[#2C5F7F]/20 bg-[#2C5F7F]/5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#2C5F7F]/70 mb-1">Related Service</p>
                      <p className="text-lg font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>Intumescent Painting</p>
                      <p className="text-sm text-gray-600 mt-1">Fire escapes often require intumescent coatings to meet building regulations. We offer a complete in-house service — shot blast to Sa 2.5, then apply certified intumescent coatings for R30–R120 fire resistance, with full DFT documentation.</p>
                    </div>
                    <Link href="/services/intumescent-painting" className="flex-shrink-0 inline-flex items-center gap-2 bg-[#2C5F7F] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1e4a63] transition-colors">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Sa 2.5 & Fire Compliance Callout */}
                  <div className="mt-8 rounded-2xl bg-[#0d2233] p-6">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-orange-300 mb-3">Surface Preparation & Fire Compliance</span>
                    <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Why Sa 2.5 Matters for Fire Escape Coatings</h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4">
                      Fire escapes and stair towers in commercial buildings are frequently required to carry a fire resistance rating. Intumescent paint is the standard method — but it will only perform correctly when applied to a properly prepared substrate.
                    </p>
                    <p className="text-white/80 text-sm leading-relaxed mb-5">
                      Shot blasting to <strong className="text-white">Sa 2.5 near-white metal standard</strong> removes all rust, old paint, and mill scale and creates an Rz 50–75 μm anchor profile. Without this profile, intumescent coatings cannot bond correctly — and a coating that delaminates under heat provides no protection at all.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-3 mb-5">
                      {[
                        { icon: <Shield className="w-4 h-4 text-orange-400" />, title: "Sa 2.5 Standard", body: "All rust, old paint, and mill scale removed. Required by all intumescent paint manufacturers." },
                        { icon: <CheckCircle className="w-4 h-4 text-orange-400" />, title: "Rz 50–75 μm Profile", body: "Mechanical anchor profile created by blasting. Primer and intumescent topcoat key into this surface." },
                        { icon: <Award className="w-4 h-4 text-orange-400" />, title: "Blast & Paint Same Day", body: "Both teams on site together. No gap between blast and paint, no flash rust between trades." },
                      ].map(({ icon, title, body }) => (
                        <div key={title} className="flex gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                          <div className="flex-shrink-0 mt-0.5">{icon}</div>
                          <div>
                            <p className="font-semibold text-white text-sm mb-1">{title}</p>
                            <p className="text-xs text-white/70 leading-relaxed">{body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/services/intumescent-painting"
                      className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
                    >
                      <Flame className="w-4 h-4" /> View Intumescent Painting Service
                    </Link>
                  </div>

                  {/* Further Reading */}
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Further Reading</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Link href="/blog/shot-blasting-external-staircases" className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
                        <img src="/manus-storage/staircase_during1_e3065e80.jpg" alt="Shot blasting external staircase on-site" className="w-full h-36 object-cover" loading="lazy" />
                        <div className="p-4">
                          <span className="text-xs font-semibold text-[#C17F3B] uppercase tracking-wide">Guide</span>
                          <h4 className="mt-1 text-sm font-bold text-[#2C5F7F] group-hover:underline leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>Shot Blasting External Staircases: The Complete Guide</h4>
                          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#2C5F7F] group-hover:gap-2 transition-all">Read the guide <ArrowRight className="w-3 h-3" /></span>
                        </div>
                      </Link>
                      <Link href="/blog/flash-rust-after-shot-blasting" className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
                        <img src="/manus-storage/staircase_after_sa25_2e0c8e5a.jpg" alt="Clean Sa 2.5 steel surface after shot blasting" className="w-full h-36 object-cover" loading="lazy" />
                        <div className="p-4">
                          <span className="text-xs font-semibold text-[#C17F3B] uppercase tracking-wide">Technical Guide</span>
                          <h4 className="mt-1 text-sm font-bold text-[#2C5F7F] group-hover:underline leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>Flash Rust After Shot Blasting: Causes, Prevention &amp; Solutions</h4>
                          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#2C5F7F] group-hover:gap-2 transition-all">Read the guide <ArrowRight className="w-3 h-3" /></span>
                        </div>
                      </Link>
                      <Link href="/blog/shot-blasting-vs-sandblasting-difference" className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
                        <img src="https://commercialshotblasting.co.uk/blog-og-images/shot-blasting-vs-sandblasting-difference.png" alt="Shot blasting vs sandblasting comparison" className="w-full h-36 object-cover" loading="lazy" />
                        <div className="p-4">
                          <span className="text-xs font-semibold text-[#C17F3B] uppercase tracking-wide">Explainer</span>
                          <h4 className="mt-1 text-sm font-bold text-[#2C5F7F] group-hover:underline leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>Shot Blasting vs Sandblasting: What's the Difference?</h4>
                          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#2C5F7F] group-hover:gap-2 transition-all">Read the article <ArrowRight className="w-3 h-3" /></span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Steel Containers Before/After Gallery */}
              {service.id === 'steel-containers' && (
                <div className="bg-gradient-to-br from-[#2C5F7F]/5 to-[#2C5F7F]/10 p-8 rounded-lg">
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Industrial Container Restoration Case Study
                  </h2>
                  <p className="text-gray-700 mb-8">
                    A manufacturing facility required restoration of large industrial mixing containers that had accumulated years of paint, coatings, and surface contamination. The containers needed complete surface preparation to restore structural integrity and enable food-grade coating application.
                  </p>

                  {/* Before Images Grid */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">Before: Heavy Contamination</h3>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/FIyBlHHzQagJIEem.webp" alt="Industrial container with heavy paint buildup and surface contamination" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Heavy paint buildup and rust on exterior surfaces</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/YdKQHVPNPpCHJZoL.webp" alt="Close-up of container showing multiple coating layers and corrosion" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Multiple coating layers hiding structural condition</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/pQwpxdJJlPffsNUa.webp" alt="Full view of contaminated container showing overall deteriorated state" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Overall contamination preventing proper inspection</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      The containers showed extensive surface contamination with multiple layers of industrial coatings, paint buildup, and surface rust. The heavy contamination prevented proper structural inspection and made the containers unsuitable for food-grade applications.
                    </p>
                  </div>

                  {/* After Images Grid */}
                  <div>
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">After: Complete Restoration</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/meTOjtsrxdpTxROo.webp" alt="Fully restored container showing clean bare metal surface" className="w-full h-80 object-cover" width="800" height="320" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Clean bare metal with uniform surface profile</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/lApYXEptwqycuhSM.webp" alt="Restored container ready for food-grade coating application" className="w-full h-80 object-cover" width="800" height="320" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Ready for food-grade protective coating</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      Complete transformation to clean bare metal with uniform surface profile. All contamination removed, revealing sound structural condition. The containers are now ready for food-grade coating application and will provide decades of reliable service in the manufacturing facility.
                    </p>
                  </div>

                  {/* Case Study Details */}
                  <div className="mt-8 grid md:grid-cols-3 gap-6">
                    <Card className="bg-white/80 backdrop-blur">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-[#2C5F7F] mb-2">Challenge</h4>
                        <p className="text-sm text-gray-600">
                          Multiple layers of industrial coatings and heavy contamination preventing structural inspection and food-grade certification.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/80 backdrop-blur">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-[#2C5F7F] mb-2">Solution</h4>
                        <p className="text-sm text-gray-600">
                          Systematic shot blasting to remove all contamination while preserving structural integrity. Careful attention to interior and exterior surfaces.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/80 backdrop-blur">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-[#2C5F7F] mb-2">Result</h4>
                        <p className="text-sm text-gray-600">
                          Complete restoration to clean bare metal, enabling food-grade coating and extending service life by 20+ years versus replacement.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Commercial Radiators Before/After Gallery */}
              {service.id === 'commercial-radiators' && (
                <div className="bg-gradient-to-br from-[#2C5F7F]/5 to-[#2C5F7F]/10 p-8 rounded-lg">
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Heritage Building Radiator Restoration Case Study
                  </h2>
                  <p className="text-gray-700 mb-8">
                    A heritage building refurbishment project required restoration of 45 original Victorian cast iron radiators. Decades of paint buildup obscured the decorative details, and many radiators had surface rust. The client required complete restoration while preserving the heritage value and manufacturer markings.
                  </p>

                  {/* Before Images Grid */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">Before: Multiple Paint Layers</h3>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/bpeWyMqdfieYuUcA.webp" alt="Victorian cast iron radiator with decades of paint buildup" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Decades of paint buildup obscuring decorative details</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/UFqXZoquxBjaseoA.webp" alt="Cast iron radiator showing multiple coating layers and surface rust" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Multiple coating layers hiding original cast iron surface</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/fHUmllJkLwwFibOk.webp" alt="Heritage radiator with paint buildup on decorative features" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Paint buildup on ornate scrollwork and manufacturer badges</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      The radiators showed extensive paint buildup with 10-20 layers accumulated over a century. The heavy paint obscured decorative details, manufacturer markings, and the original cast iron surface. Many radiators also had surface rust where paint had failed.
                    </p>
                  </div>

                  {/* After Images Grid */}
                  <div>
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">After: Complete Restoration</h3>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/gBUjQXvWuzcmjqgY.webp" alt="Fully restored cast iron radiator with clean bare metal finish" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Clean bare metal revealing original cast iron details</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/lBuDoVNVLoSLyiDs.webp" alt="Restored radiator showing preserved decorative features" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Preserved decorative features and manufacturer markings</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/iUMILuRHLMPjduxm.webp" alt="Heritage radiator ready for powder coating" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Ready for period-appropriate powder coating</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/aFvazGLSBOXTBMvc.webp" alt="Restored radiator with uniform surface preparation" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Uniform surface preparation for optimal coating adhesion</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/MuioTrMrtIGgUmCZ.webp" alt="Multiple restored radiators showing consistent quality" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Consistent restoration quality across all radiators</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/rUkUbveGcgYlLkcj.webp" alt="Restored radiators in heritage building setting" className="w-full h-64 object-cover" width="800" height="256" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Restored radiators preserving heritage building character</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      Complete transformation revealing the original cast iron surface with all decorative details preserved. All paint layers removed, manufacturer markings visible, and surfaces prepared for modern powder coating. The radiators were restored to their original appearance while providing modern corrosion protection for decades of continued service.
                    </p>
                  </div>

                  {/* Case Study Details */}
                  <div className="mt-8 grid md:grid-cols-3 gap-6">
                    <Card className="bg-white/80 backdrop-blur">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-[#2C5F7F] mb-2">Challenge</h4>
                        <p className="text-sm text-gray-600">
                          45 Victorian radiators with 10-20 paint layers obscuring decorative details. Required complete restoration while preserving heritage value and manufacturer markings.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/80 backdrop-blur">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-[#2C5F7F] mb-2">Solution</h4>
                        <p className="text-sm text-gray-600">
                          Controlled shot blasting to remove all paint layers without damaging cast iron. Protected threaded connections and preserved ornate details throughout the process.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/80 backdrop-blur">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-[#2C5F7F] mb-2">Result</h4>
                        <p className="text-sm text-gray-600">
                          All radiators restored to original appearance, passed building conservation approval, and reinstalled as functional heating elements with 50+ year service life extension.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Commercial & Agricultural Vehicles Case Studies */}
              {service.id === 'commercial-vehicles' && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Commercial Vehicle Restoration Projects
                  </h2>
                  <p className="text-gray-600 mb-8">
                    We specialize in heavy-duty commercial and agricultural vehicle restoration, from individual wheel sets to complete chassis overhauls. Below are two recent projects showcasing our capabilities with vintage farm trucks and warehouse vehicles.
                  </p>

                  {/* Project 1: Commercial Vehicle Wheels */}
                  <div className="mb-12 bg-gradient-to-br from-[#2C5F7F]/5 to-[#4A90B5]/5 p-8 rounded-lg">
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">Project 1: Heavy-Duty Commercial Vehicle Wheels</h3>
                    <p className="text-gray-600 mb-6">
                      A vintage farm truck required complete wheel restoration. The heavy-duty wheels had accumulated decades of paint, rust, and agricultural contamination. The client needed the wheels restored to bare metal for protective coating before the vehicle could return to service.
                    </p>

                    {/* Before Images */}
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold text-[#2C5F7F] mb-4">Before: Heavy Contamination</h4>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="relative group overflow-hidden rounded-lg shadow-lg">
                          <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/tHLYvHalejNIPAcU.webp" alt="Commercial vehicle wheel with heavy rust and paint buildup" className="w-full h-64 object-cover" width="800" height="256" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Black wheels showing decades of paint and contamination</p>
                          </div>
                        </div>
                        <div className="relative group overflow-hidden rounded-lg shadow-lg">
                          <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/hvIZuaYLQJesACCl.webp" alt="Commercial vehicle with black contaminated wheels before blasting" className="w-full h-64 object-cover" width="800" height="256" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Complete vehicle with black wheels before restoration</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 italic">
                        The wheels showed extensive corrosion, multiple paint layers, and agricultural chemical staining. The heavy contamination required industrial-grade shot blasting to restore the metal surface.
                      </p>
                    </div>

                    {/* After Images */}
                    <div>
                      <h4 className="text-xl font-semibold text-[#2C5F7F] mb-4">After: Complete Vehicle Restoration</h4>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="relative group overflow-hidden rounded-lg shadow-lg">
                          <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/gSsDBOyaBcHbkscJ.webp" alt="Restored commercial vehicle with silver shot-blasted wheels" className="w-full h-64 object-cover" width="800" height="256" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Silver shot-blasted wheels ready for protective coating</p>
                          </div>
                        </div>
                        <div className="relative group overflow-hidden rounded-lg shadow-lg">
                          <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/NtAgxBOsLSxEcmau.webp" alt="Vintage farm truck with clean bare metal wheels" className="w-full h-64 object-cover" width="800" height="256" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Vintage farm truck with clean bare metal finish</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg mb-4">
                        <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/pyxifOvUpsOZKlvE.webp" alt="Silver shot-blasted wheel showing clean bare metal finish" className="w-full h-96 object-cover" width="800" height="384" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Closeup of silver shot-blasted wheel ready for protective coating</p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic">
                        All wheels, chassis components, and body panels were shot blasted to bare metal (silver finish). The vintage farm truck was completely restored and prepared for protective coating, extending its service life by decades.
                      </p>
                    </div>

                    {/* Project Summary Cards */}
                    <div className="grid md:grid-cols-3 gap-4 mt-8">
                      <Card className="bg-white/80 backdrop-blur">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-[#2C5F7F] mb-2">Challenge</h4>
                          <p className="text-sm text-gray-600">
                            Heavy-duty wheels with decades of paint, rust, and agricultural contamination required complete restoration for vintage farm truck.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/80 backdrop-blur">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-[#2C5F7F] mb-2">Solution</h4>
                          <p className="text-sm text-gray-600">
                            Industrial-grade shot blasting of all wheels, chassis, and body panels to bare metal using heavy-duty media and controlled techniques.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/80 backdrop-blur">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-[#2C5F7F] mb-2">Result</h4>
                          <p className="text-sm text-gray-600">
                            Complete vehicle restoration with uniform surface preparation, ready for protective coating and decades more service in agricultural operations.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Project 2: Complete Chassis Restoration */}
                  <div className="bg-gradient-to-br from-[#2C5F7F]/5 to-[#4A90B5]/5 p-8 rounded-lg">
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">Project 2: Complete Chassis Restoration</h3>
                    <p className="text-gray-600 mb-6">
                      A commercial warehouse vehicle required complete chassis restoration for a full rebuild project. The chassis had been stripped to bare frame, revealing extensive corrosion and old coating residue. The client needed every structural member shot blasted to bare metal for inspection and protective coating.
                    </p>

                    {/* Chassis Restoration Images */}
                    <div>
                      <h4 className="text-xl font-semibold text-[#2C5F7F] mb-4">Complete Chassis Shot Blasting</h4>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="relative group overflow-hidden rounded-lg shadow-lg">
                          <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/HmfkQNuEPoJJBxlJ.webp" alt="Bare chassis frame showing structural members and roll cage" className="w-full h-64 object-cover" width="800" height="256" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Bare chassis frame with roll cage and structural members exposed</p>
                          </div>
                        </div>
                        <div className="relative group overflow-hidden rounded-lg shadow-lg">
                          <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/LvKfqfNdSkOkQBsm.webp" alt="Chassis interior showing clean metal finish" className="w-full h-64 object-cover" width="800" height="256" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Interior chassis members with uniform bare metal finish</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="relative group overflow-hidden rounded-lg shadow-lg">
                          <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/fRaWIUJCPwUpBIpo.webp" alt="Rear chassis section showing complete restoration" className="w-full h-64 object-cover" width="800" height="256" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Rear chassis section with complete corrosion removal</p>
                          </div>
                        </div>
                        <div className="relative group overflow-hidden rounded-lg shadow-lg">
                          <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/JdhbGaOokINFnzoN.webp" alt="Complete chassis ready for protective coating" className="w-full h-64 object-cover" width="800" height="256" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Complete chassis prepared for commercial-grade coating</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 italic">
                        Every structural member, cross-brace, and chassis component was systematically shot blasted to bare metal. The complete chassis restoration revealed the true condition of all structural members and provided optimal surface preparation for protective coating systems.
                      </p>
                    </div>

                    {/* Project Summary Cards */}
                    <div className="grid md:grid-cols-3 gap-4 mt-8">
                      <Card className="bg-white/80 backdrop-blur">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-[#2C5F7F] mb-2">Challenge</h4>
                          <p className="text-sm text-gray-600">
                            Complete chassis required total restoration with every structural member shot blasted for rebuild project inspection and coating.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/80 backdrop-blur">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-[#2C5F7F] mb-2">Solution</h4>
                          <p className="text-sm text-gray-600">
                            Systematic shot blasting of entire chassis frame, including all structural members, cross-braces, and mounting points to bare metal.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/80 backdrop-blur">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-[#2C5F7F] mb-2">Result</h4>
                          <p className="text-sm text-gray-600">
                            Complete chassis restoration revealing true structural condition, ready for commercial-grade protective coating and vehicle rebuild.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}

              {/* Steel Doors & Roller Shutters Before/After Gallery */}
              {service.id === 'steel-doors' && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Warehouse Roller Shutter Restoration
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Complete transformation of industrial loading bay roller shutters from heavily contaminated surfaces to clean, uniform bare metal ready for protective coating.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-semibold text-[#2C5F7F] mb-4">Before: Heavy Contamination</h3>
                      <div className="grid gap-4">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                          <img loading="lazy"
                            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/QHklOFfcsMuYCIzP.webp"
                            alt="Warehouse exterior showing contaminated roller shutter before restoration"
                            className="w-full h-full object-cover"
                            width="800" height="600"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Warehouse exterior with contaminated roller shutter</p>
                          </div>
                        </div>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                          <img loading="lazy"
                            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/XpCWVFNalgPUoEoE.webp"
                            alt="Roller shutter slats with severe rust staining and paint degradation"
                            className="w-full h-full object-cover"
                            width="800" height="600"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Severe rust staining and paint degradation on slats</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-[#2C5F7F] mb-4">After: Professional Restoration</h3>
                      <div className="grid gap-4">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                          <img loading="lazy"
                            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/EOszbYQwsYrTFvjN.webp"
                            alt="Restored roller shutter with uniform bare metal finish"
                            className="w-full h-full object-cover"
                            width="800" height="600"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Uniform bare metal finish ready for coating</p>
                          </div>
                        </div>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                          <img loading="lazy"
                            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/wKYqmRdChjVeZvpk.webp"
                            alt="Complete warehouse exterior with restored roller shutter"
                            className="w-full h-full object-cover"
                            width="800" height="600"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Complete restoration with professional finish</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#2C5F7F]/5 to-[#1a3a4d]/5 rounded-lg p-8">
                    <h3 className="text-xl font-semibold text-[#2C5F7F] mb-4">Project Summary</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <Card className="bg-white/80 backdrop-blur">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-[#2C5F7F] mb-2">Challenge</h4>
                          <p className="text-sm text-gray-600">
                            Multiple loading bay roller shutters with severe surface contamination, rust staining, and accelerating corrosion requiring restoration without replacement.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/80 backdrop-blur">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-[#2C5F7F] mb-2">Solution</h4>
                          <p className="text-sm text-gray-600">
                            Phased shot blasting of all roller shutter slats, door frames, and mounting hardware to remove industrial contamination while maintaining operational access.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/80 backdrop-blur">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-[#2C5F7F] mb-2">Result</h4>
                          <p className="text-sm text-gray-600">
                            Professional finish at a fraction of replacement cost, with restored doors expected to provide decades more service with minimal operational disruption.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}

              {/* First Before & After Gallery */}
              {getServiceGalleries(service.id).length > 0 && !['fire-escapes', 'staircases', 'bridge-steelwork', 'ladders', 'warehouse-racking', 'pipework', 'telecom-towers', 'factory-cladding', 'structural-steel-frames', 'steel-gates', 'steel-containers', 'commercial-radiators', 'commercial-vehicles', 'steel-doors'].includes(service.id) && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Transformation Gallery
                  </h2>
                  <p className="text-gray-600 mb-6">
                    See the dramatic difference our professional shot blasting service makes. Drag the slider to compare before and after results.
                  </p>
                  <BeforeAfterSlider
                    beforeImage={getServiceGalleries(service.id)[0].beforeImage}
                    afterImage={getServiceGalleries(service.id)[0].afterImage}
                    beforeLabel={getServiceGalleries(service.id)[0].beforeLabel}
                    afterLabel={getServiceGalleries(service.id)[0].afterLabel}
                    className="shadow-xl"
                  />
                </div>
              )}

              {/* Benefits */}
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Key Benefits
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <CheckCircle className="w-5 h-5 text-[#2C5F7F] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Our Process
                </h2>
                <div className="space-y-4">
                  {service.process.map((step) => (
                    <div key={step.step} className="flex gap-4 bg-white p-6 rounded-lg shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-[#2C5F7F] text-white flex items-center justify-center font-bold flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#2C5F7F] text-lg">{step.title}</h3>
                        <p className="text-gray-600 mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preparation Checklist */}
              {(() => {
                const prepSteps = getPreparationSteps(service.id);
                return (
                  <div className="bg-gradient-to-br from-[#F5F1E8] to-[#EAE4D4] rounded-xl p-8 border border-[#2C5F7F]/10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-[#2C5F7F] flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>
                          How to Prepare for {service.shortTitle}
                        </h2>
                        <p className="text-gray-600 text-sm mt-0.5">Follow these steps to ensure your project runs smoothly</p>
                      </div>
                    </div>
                    <ol className="space-y-4">
                      {prepSteps.map((step, index) => (
                        <li key={index} className="flex gap-4 bg-white rounded-lg p-5 shadow-sm border border-[#2C5F7F]/5">
                          <div className="w-8 h-8 rounded-full bg-[#2C5F7F] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#2C5F7F] text-base mb-1">{step.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={openQuotePopup}
                        className="flex-1 bg-[#2C5F7F] hover:bg-[#234a63] text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
                      >
                        Request A Site Survey
                      </button>
                      <a
                        href="tel:07721375756"
                        className="flex-1 flex items-center justify-center gap-2 border-2 border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        Call 07721 375756
                      </a>
                    </div>
                  </div>
                );
              })()}

              {/* Second Before & After Gallery */}
              {getServiceGalleries(service.id).length > 1 && !['fire-escapes', 'staircases', 'bridge-steelwork', 'ladders', 'warehouse-racking', 'pipework', 'telecom-towers'].includes(service.id) && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    More Project Transformations
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Another example of our professional container blasting work. Compare the before and after results.
                  </p>
                  <BeforeAfterSlider
                    beforeImage={getServiceGalleries(service.id)[1].beforeImage}
                    afterImage={getServiceGalleries(service.id)[1].afterImage}
                    beforeLabel={getServiceGalleries(service.id)[1].beforeLabel}
                    afterLabel={getServiceGalleries(service.id)[1].afterLabel}
                    className="shadow-xl"
                  />
                </div>
              )}

              {/* Applications */}
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Applications
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {service.applications.map((app, index) => (
                    <div key={index} className="bg-white px-4 py-3 rounded-lg shadow-sm text-gray-700 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-[#2C5F7F]" />
                      {app}
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Service: Car Park Paint Removal — shown on floor-preparation page */}
              {(service.id === 'floor-preparation' || service.id === 'floor-shot-blasting' || service.id === 'coating-removal' || service.id === 'paint-stripping') && (
                <div className="p-5 rounded-xl border border-[#2C5F7F]/20 bg-[#2C5F7F]/5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#2C5F7F]/70 mb-1">Related Service</p>
                    <p className="text-lg font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>Car Park Paint &amp; Line Marking Removal</p>
                    <p className="text-sm text-gray-600 mt-1">Need car park bay markings, thermoplastic road paint, or old line markings removed? Our mobile shot blasting units remove all marking types from tarmac and concrete — no chemicals, no scarring, ready for re-marking. We cover car parks, retail parks, industrial estates, and airports across the UK.</p>
                  </div>
                  <Link href="/services/car-park-paint-removal" className="flex-shrink-0 inline-flex items-center gap-2 bg-[#2C5F7F] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1e4a63] transition-colors">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {/* Related Service: Intumescent Painting — shown on staircases page */}
              {service.id === 'staircases' && (
                <div className="p-5 rounded-xl border border-[#2C5F7F]/20 bg-[#2C5F7F]/5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#2C5F7F]/70 mb-1">Related Service</p>
                    <p className="text-lg font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>Intumescent Painting</p>
                    <p className="text-sm text-gray-600 mt-1">Internal staircases in commercial buildings often require intumescent fire protection. We provide a complete in-house service — shot blast to Sa 2.5, then apply certified intumescent coatings for R30–R120 fire resistance ratings with full DFT documentation for building control.</p>
                  </div>
                  <Link href="/services/intumescent-painting" className="flex-shrink-0 inline-flex items-center gap-2 bg-[#2C5F7F] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1e4a63] transition-colors">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {/* Case Studies */}
              {!['fire-escapes', 'staircases', 'bridge-steelwork', 'ladders', 'warehouse-racking', 'pipework', 'telecom-towers'].includes(service.id) && (
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Case Studies
                </h2>
                <div className="space-y-6">
                  {service.caseStudies.map((study, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <img loading="lazy"
                            src={study.image} 
                            alt={study.title}
                            className="w-full h-48 md:h-full object-cover"
                            width="400" height="300"
                          />
                        </div>
                        <CardContent className="md:w-2/3 p-6">
                          <h3 className="text-xl font-bold text-[#2C5F7F] mb-2">{study.title}</h3>
                          <p className="text-sm text-gray-500 mb-4">{study.client}</p>
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="font-semibold text-[#2C5F7F]">Challenge: </span>
                              <span className="text-gray-600">{study.challenge}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-[#2C5F7F]">Solution: </span>
                              <span className="text-gray-600">{study.solution}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-[#2C5F7F]">Result: </span>
                              <span className="text-gray-600">{study.result}</span>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              )}

              {/* Item 5: Testimonials / Star Rating Block */}
              <div itemScope itemType="https://schema.org/LocalBusiness" className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-5 h-5 ${i <= 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-200 text-amber-200'}`} />
                    ))}
                  </div>
                  <span className="font-bold text-[#2C5F7F] text-lg" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                    <span itemProp="ratingValue">4.9</span>/5
                    <meta itemProp="reviewCount" content="127" />
                    <meta itemProp="bestRating" content="5" />
                  </span>
                  <span className="text-gray-500 text-sm">(127 reviews)</span>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <blockquote className="bg-gray-50 rounded-lg p-4 text-sm">
                    <p className="text-gray-700 italic mb-2">"Exceptional quality and professionalism. The surface preparation was perfect — exactly what we needed before coating."</p>
                    <footer className="font-semibold text-[#2C5F7F] text-xs">— James T., Manufacturing Manager</footer>
                  </blockquote>
                  <blockquote className="bg-gray-50 rounded-lg p-4 text-sm">
                    <p className="text-gray-700 italic mb-2">"Fast turnaround, competitive pricing, and the results speak for themselves. Highly recommend for any industrial project."</p>
                    <footer className="font-semibold text-[#2C5F7F] text-xs">— Sarah M., Project Coordinator</footer>
                  </blockquote>
                  <blockquote className="bg-gray-50 rounded-lg p-4 text-sm">
                    <p className="text-gray-700 italic mb-2">"Used them for structural steel on our new facility. Clean, efficient, and the team were brilliant on site."</p>
                    <footer className="font-semibold text-[#2C5F7F] text-xs">— David R., Site Manager</footer>
                  </blockquote>
                </div>
              </div>

              {/* Item 8: Where We Offer This Service — county grid with service-specific anchor text */}
              <div id="service-coverage">
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Where We Offer {service.title}
                </h2>
                <p className="text-gray-600 mb-5">
                  Our mobile units deliver <strong>{service.title.toLowerCase()}</strong> services across 35 counties in the UK.
                  Select a county below to see all the towns and areas we cover, or{' '}
                  <Link href="/contact" className="text-[#2C5F7F] underline">contact us</Link> for a site survey.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
                  {[
                    { name: 'Bedfordshire', slug: 'bedfordshire' },
                    { name: 'Berkshire', slug: 'berkshire' },
                    { name: 'Buckinghamshire', slug: 'buckinghamshire' },
                    { name: 'Cambridgeshire', slug: 'cambridgeshire' },
                    { name: 'Cheshire', slug: 'cheshire' },
                    { name: 'Cumbria', slug: 'cumbria' },
                    { name: 'Derbyshire', slug: 'derbyshire' },
                    { name: 'County Durham', slug: 'durham' },
                    { name: 'East Wales', slug: 'east-wales' },
                    { name: 'Essex', slug: 'essex' },
                    { name: 'Gloucestershire', slug: 'gloucestershire' },
                    { name: 'Greater Manchester', slug: 'greater-manchester' },
                    { name: 'Hampshire', slug: 'hampshire' },
                    { name: 'Herefordshire', slug: 'herefordshire' },
                    { name: 'Hertfordshire', slug: 'hertfordshire' },
                    { name: 'Lancashire', slug: 'lancashire' },
                    { name: 'Leicestershire', slug: 'leicestershire' },
                    { name: 'Lincolnshire', slug: 'lincolnshire' },
                    { name: 'Norfolk', slug: 'norfolk' },
                    { name: 'North Devon', slug: 'north-devon' },
                    { name: 'North Yorkshire', slug: 'north-yorkshire' },
                    { name: 'Northamptonshire', slug: 'northamptonshire' },
                    { name: 'Northumberland', slug: 'northumberland' },
                    { name: 'Nottinghamshire', slug: 'nottinghamshire' },
                    { name: 'Shropshire', slug: 'shropshire' },
                    { name: 'Somerset', slug: 'somerset' },
                    { name: 'South Yorkshire', slug: 'south-yorkshire' },
                    { name: 'Staffordshire', slug: 'staffordshire' },
                    { name: 'Suffolk', slug: 'suffolk' },
                    { name: 'Tyne & Wear', slug: 'tyne-and-wear' },
                    { name: 'Warwickshire', slug: 'warwickshire' },
                    { name: 'West Midlands', slug: 'west-midlands' },
                    { name: 'West Yorkshire', slug: 'west-yorkshire' },
                    { name: 'Wiltshire', slug: 'wiltshire' },
                    { name: 'Worcestershire', slug: 'worcestershire' },
                  ].map(county => (
                    <Link
                      key={county.slug}
                      href={`/counties/${county.slug}`}
                      title={`${service.title} in ${county.name}`}
                      className="flex items-center gap-1.5 text-sm text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 transition-colors group"
                    >
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0 group-hover:text-white" />
                      {county.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-2">
                  <Link href="/service-areas" className="inline-flex items-center gap-2 text-sm text-[#2C5F7F] font-medium hover:underline">
                    <ArrowRight className="w-4 h-4" />
                    Browse all 650+ service areas
                  </Link>
                  <Link href="/counties" className="inline-flex items-center gap-2 text-sm text-[#2C5F7F] font-medium hover:underline">
                    <ArrowRight className="w-4 h-4" />
                    View coverage by county
                  </Link>
                </div>
              </div>

              {/* FAQs */}
              <div itemScope itemType="https://schema.org/FAQPage">
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {service.faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden" itemScope itemType="https://schema.org/Question">
                      <button
                        type="button"
                        aria-expanded={expandedFaq === index}
                        aria-controls={`faq-answer-${index}`}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      >
                        <span className="font-semibold text-[#2C5F7F]" itemProp="name">{faq.question}</span>
                        {expandedFaq === index ? (
                          <ChevronUp className="w-5 h-5 text-[#2C5F7F]" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#2C5F7F]" aria-hidden="true" />
                        )}
                      </button>
                      <div
                        id={`faq-answer-${index}`}
                        role="region"
                        aria-labelledby={`faq-btn-${index}`}
                        className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? 'max-h-96' : 'max-h-0'}`}
                        itemScope itemType="https://schema.org/Answer"
                      >
                        <p className="px-6 pb-4 text-gray-600" itemProp="text">{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Contact Card */}
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Request A Site Visit
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Ready to discuss your {service.shortTitle.toLowerCase()} project? Contact us for a no-obligation quote.
                  </p>
                  <div className="space-y-3">
                    <Button className="w-full bg-[#2C5F7F] hover:bg-[#234a63]" onClick={openQuotePopup}>
                      Request Site Visit
                    </Button>
                    <a href="tel:07721375756" className="block">
                      <Button variant="outline" className="w-full border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F]/10">
                        <Phone className="w-4 h-4 mr-2" />
                        07721 375756
                      </Button>
                    </a>
                    <a href="mailto:info@commercialshotblasting.co.uk" className="block">
                      <Button variant="outline" className="w-full border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F]/10">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Us
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Why Choose Us */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Why Choose Us
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-[#2C5F7F] mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Fully Insured</h4>
                        <p className="text-sm text-gray-600">Comprehensive liability coverage</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-[#2C5F7F] mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Experienced Team</h4>
                        <p className="text-sm text-gray-600">Skilled professionals</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#2C5F7F] mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-800">On-Time Delivery</h4>
                        <p className="text-sm text-gray-600">Projects completed to schedule</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Services card grid */}
              <div>
                <h3 className="text-xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Related Services
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {otherServices.slice(0, 4).map((s) => (
                    <Link
                      key={s.id}
                      href={`/services/${s.id}`}
                      className="group flex gap-3 bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100"
                    >
                      <div className="w-20 flex-shrink-0 overflow-hidden">
                        <img
                          src={s.heroImage}
                          alt={s.title}
                          width="80"
                          height="80"
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col justify-center py-3 pr-3 min-w-0">
                        <span className="font-semibold text-[#2C5F7F] text-sm leading-tight group-hover:underline">{s.title}</span>
                        <span className="text-xs text-gray-500 mt-1 line-clamp-2">{s.tagline}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/services"
                  className="mt-4 flex items-center gap-2 text-sm text-[#2C5F7F] font-medium hover:underline"
                >
                  <ArrowRight className="w-4 h-4" />
                  View all services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-[#2C5F7F] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Recent {service.shortTitle} Projects
            </h2>
            <p className="text-gray-600 mb-8">See examples of our {service.title.toLowerCase()} work from across the UK.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((item) => (
                <BeforeAfterCard
                  key={item.id}
                  beforeSrc={item.beforeImage}
                  afterSrc={item.afterImage}
                  title={item.title}
                  description={item.description || ""}
                  category={item.category}
                  onClick={() => {}}
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/our-work">
                <Button variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                  View All Projects
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Inline Quote Form Section */}
      <section className="py-16 bg-[#F5F1E8]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: copy + trust signals */}
            <div>
              <h2 className="text-3xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Request A {service.shortTitle} Site Visit
              </h2>
              <p className="text-gray-600 mb-6">
                Fill in the short form and we'll get back to you promptly with a no-obligation quote.
                Our mobile units cover all of the UK — we come to your site.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Site survey & assessment",
                  "Competitive fixed-price quotes",
                  "SA 2.5 & SA 3 standard as standard",
                  "Fully insured, certified operators",
                  "Available 7 days a week",
                ].map((point) => (
                  <li key={point} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#4A7C59] flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Prefer to call?</p>
                <a
                  href="tel:07721375756"
                  className="flex items-center gap-2 text-[#2C5F7F] font-bold text-xl hover:underline"
                  onClick={() => trackPhoneCall('service-page-inline-form')}
                >
                  <Phone className="w-5 h-5" />
                  07721 375756
                </a>
                <p className="text-xs text-gray-400 mt-1">Mon–Sat 7am–6pm</p>
              </div>
            </div>
            {/* Right: Native lead form — wired to all five notification channels */}
            <div className="bg-white rounded-2xl shadow-md p-6 lg:p-8">
              <LeadForm
                variant="light"
                heading="Request A Site Visit"
                subheading="We respond promptly"
                showWhatsApp={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#2C5F7F] text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Start Your {service.shortTitle} Project?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contact us today for a no-obligation consultation. Our team is ready to help with your surface preparation needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-[#2C5F7F] hover:bg-white/90 text-lg px-8 py-6" onClick={openQuotePopup}>
              Request A Site Visit
            </Button>
            <a href="tel:07721375756">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                <Phone className="w-5 h-5 mr-2" />
                07721 375756
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a3d52] text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/30">
                  <span className="text-lg font-bold">CSB</span>
                </div>
                <span className="font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Commercial Shot Blasting</span>
              </div>
              <p className="text-white/70 text-sm">
                Professional surface preparation services across the UK. Quality workmanship guaranteed.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                {services.map((s) => (
                  <li key={s.id}>
                    <Link href={`/services/${s.id}`} className="hover:text-white transition">{s.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/#about" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/our-work" className="hover:text-white transition">Our Work</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-white/70 text-sm">
                <li>
                  <a href="tel:07721375756" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                    07721 375756
                  </a>
                </li>
                <li>
                  <a href="mailto:info@commercialshotblasting.co.uk" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                    info@commercialshotblasting.co.uk
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Professional service across England & Wales
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/50 text-sm">
            © {new Date().getFullYear()} Commercial Shot Blasting. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Item 10: Sticky mobile Get a Quote / Call Now bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#2C5F7F] shadow-[0_-2px_12px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-stretch">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 text-white font-semibold text-sm hover:bg-[#234a63] transition-colors duration-200"
            onClick={() => setQuotePopupOpen(true)}
          >
            <ArrowRight className="w-4 h-4" />
            Request A Site Visit
          </button>
          <a
            href="tel:07721375756"
            className="flex items-center justify-center gap-2 px-5 py-3.5 bg-[#1a3a4d] text-white font-semibold text-sm border-l border-white/20 hover:bg-[#0f2635] transition-colors duration-200"
            onClick={() => trackPhoneCall('07721375756', 'Service Page Sticky Bar')}
            aria-label="Call 07721 375756"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>
      </div>
      {/* Spacer to prevent content being hidden behind sticky bar on mobile */}
      <div className="h-14 md:hidden" aria-hidden="true" />

      {/* Sticky Service Button (Desktop) */}
      <StickyServiceButton onOpenQuotePopup={openQuotePopup} serviceTitle={service.shortTitle} />

      {/* Quote Popup */}
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} defaults={surveyDefaults} />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}
