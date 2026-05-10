import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, CheckCircle, ArrowRight, Tractor, Wheat, Shield, Clock, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { getIndustrySEO, useSEO } from "@/hooks/useSEO";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BackToTop } from "@/components/BackToTop";
import { CountiesWeCover } from "@/components/CountiesWeCover";

export default function AgricultureIndustry() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const farmProjectImages = [
    { src: "/manus-storage/WhatsAppImage2026-04-27at16.58.43(4)_5d798006.jpeg", alt: "Farm barn concrete panels after shot blasting — side elevation showing clean surface" },
    { src: "/manus-storage/WhatsAppImage2026-04-27at16.58.43(5)_d258dff2.jpeg", alt: "Farm building steel frame and concrete panels mid-blast, showing rust removal progress" },
    { src: "/manus-storage/WhatsAppImage2026-04-27at16.58.43(6)_5c09aa7a.jpeg", alt: "Agricultural barn wall after shot blasting with tractor visible in background" },
    { src: "/manus-storage/WhatsAppImage2026-04-27at16.58.43(3)_cf8ab7c2.jpeg", alt: "Farm building concrete panels blasted clean with scissor lift on site" },
    { src: "/manus-storage/WhatsAppImage2026-04-27at16.58.42(1)_a8f17ecc.jpeg", alt: "Long barn wall fully shot blasted — clean grey concrete surface ready for coating" },
    { src: "/manus-storage/WhatsAppImage2026-04-27at16.58.42(2)_2bf96553.jpeg", alt: "Agricultural building end gable after shot blasting — corrugated steel and concrete" },
  ];

  // Set SEO metadata
  useSEO(getIndustrySEO("Agriculture", "Professional shot blasting for agricultural machinery and equipment. Restore tractors, harvesters, and farm implements.", "agriculture"));

  const agricultureServices = [
    {
      title: "Tractor & Harvester Restoration",
      description: "Complete shot blasting for agricultural machinery including tractors, combines, and harvesters. Remove rust, old paint, and prepare for powder coating or repainting.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/FpjmhPJJyjbvfQOU.webp",
      link: "/services/commercial-vehicles",
      benefits: ["Rust removal", "Paint prep", "Quick turnaround"]
    },
    {
      title: "Farm Equipment Components",
      description: "Precision blasting for ploughs, cultivators, seeders, and attachments. Restore implements to like-new condition for extended service life.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/tSdPxVlUfQVmNZOS.webp",
      link: "/services/steel-sheeting",
      benefits: ["Component restoration", "Corrosion protection", "Cost-effective"]
    },
    {
      title: "Agricultural Buildings & Structures",
      description: "Shot blasting for barn frames, grain silos, and farm building steelwork. Prepare surfaces for protective coatings in harsh rural environments.",
      image: "/manus-storage/WhatsAppImage2026-04-27at16.58.42(1)_a8f17ecc.jpeg",
      link: "/services/structural-steel-frames",
      benefits: ["Weather protection", "Long-lasting finish", "Structural integrity"]
    },
    {
      title: "Vintage & Classic Tractors",
      description: "Specialist restoration services for heritage agricultural machinery. Preserve original features while removing decades of corrosion and paint layers.",
      image: "/service-commercial-radiators.png",
      link: "/services/commercial-radiators",
      benefits: ["Heritage preservation", "Gentle cleaning", "Show-quality finish"]
    }
  ];

  const challenges = [
    {
      icon: Clock,
      title: "Seasonal Deadlines",
      description: "Farming operates on tight seasonal schedules. We offer rapid turnaround during off-season maintenance periods to get equipment back in the field on time."
    },
    {
      icon: Shield,
      title: "Harsh Operating Conditions",
      description: "Agricultural equipment faces mud, fertilizers, and weather extremes. Our thorough surface preparation ensures coatings withstand these demanding conditions."
    },
    {
      icon: Tractor,
      title: "Large Equipment Handling",
      description: "Farm machinery comes in all sizes. Our facilities accommodate everything from small implements to full-size combine harvesters and tractors."
    },
    {
      icon: Wheat,
      title: "Budget Constraints",
      description: "Farming margins are tight. We provide cost-effective restoration that extends equipment life, offering better value than replacement."
    }
  ];

  const caseStudy = {
    title: "Vintage Tractor Fleet Restoration - Shropshire Farm",
    client: "Heritage Farm & Agricultural Museum",
    challenge: "A collection of 8 vintage tractors from the 1950s-1970s required complete restoration for a working farm museum. Each tractor had severe corrosion, multiple paint layers, and needed to retain original features while being restored to working condition.",
    solution: "We carefully blasted each tractor using controlled pressure to preserve original casting marks and serial numbers. Components were blasted separately, documented, and reassembled. We used aluminum oxide for gentle cleaning of delicate parts and steel grit for chassis and heavy components.",
    result: "All 8 tractors were restored over 4 months, with each machine receiving show-quality surface preparation. The tractors are now working exhibits, demonstrating agricultural heritage while protected by modern coatings for another generation.",
    stats: [
      { label: "Tractors Restored", value: "8 units" },
      { label: "Project Duration", value: "4 months" },
      { label: "Oldest Tractor", value: "1952 model" },
      { label: "Components", value: "200+ parts" }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      
      <section className="py-4 bg-gray-50 border-b border-gray-200">
        <div className="container">
          <Breadcrumb bare items={[
            { label: "Home", href: "/" },
            { label: "Industries", href: "/industries" },
            { label: "Agriculture", href: "/industries/agriculture", isCurrentPage: true }
          ]} />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#4a7c59] to-[#2d5a3a] text-white py-20">
        <div className="absolute inset-0 bg-[url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/WYikbYiOMQznmVoG.webp')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Tractor className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">Agriculture Industry</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Agricultural Equipment Shot Blasting
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Professional surface preparation for farm machinery, tractors, and agricultural equipment. Extend equipment life and maintain operational efficiency with expert shot blasting services.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setQuotePopupOpen(true)}
                className="bg-white text-[#4a7c59] px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                Request Farm Equipment Quote
              </button>
              <a 
                href="tel:07970566409"
                className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                07970 566409
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Agriculture Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Agricultural Shot Blasting Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive surface preparation for all types of farm equipment and agricultural machinery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {agricultureServices.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img loading="lazy"
                    
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  width={800}
                  height={600}
                />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.benefits.map((benefit, i) => (
                      <span key={i} className="text-xs bg-[#4a7c59]/10 text-[#4a7c59] px-3 py-1 rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                  <Link href={service.link} className="inline-flex items-center gap-2 text-[#4a7c59] font-semibold hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Challenges */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Agricultural Challenges We Solve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the unique demands of farming and agricultural operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#4a7c59]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#4a7c59]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{challenge.title}</h3>
                  <p className="text-gray-600">{challenge.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[#4a7c59] font-semibold text-sm uppercase tracking-wider">Case Study</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                {caseStudy.title}
              </h2>
              <p className="text-gray-600 italic">{caseStudy.client}</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#4a7c59] text-white rounded-full flex items-center justify-center text-sm">1</span>
                    The Challenge
                  </h3>
                  <p className="text-gray-600 ml-10">{caseStudy.challenge}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#4a7c59] text-white rounded-full flex items-center justify-center text-sm">2</span>
                    Our Solution
                  </h3>
                  <p className="text-gray-600 ml-10">{caseStudy.solution}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#4a7c59] text-white rounded-full flex items-center justify-center text-sm">3</span>
                    The Result
                  </h3>
                  <p className="text-gray-600 ml-10">{caseStudy.result}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t">
                {caseStudy.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-[#4a7c59] mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects Gallery */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[#4a7c59] font-semibold text-sm uppercase tracking-wider">Recent Work</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Farm Building Shot Blasting — Shropshire, April 2026
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Concrete panel and steel frame surface preparation on a working Shropshire farm — blast cleaned and ready for protective coating.
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {farmProjectImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="relative aspect-[4/3] overflow-hidden rounded-lg group focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
                aria-label={`View full size: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                    View
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Video */}
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-lg bg-black aspect-video">
              <video
                controls
                preload="metadata"
                className="w-full h-full object-cover"
                poster="/manus-storage/WhatsAppImage2026-04-27at16.58.42(1)_a8f17ecc.jpeg"
              >
                <source src="/manus-storage/WhatsAppVideo2026-04-27at09.27.29(1)_3886b1d3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-center text-sm text-gray-500 mt-3">On-site shot blasting of farm building concrete panels and steel frame</p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx => idx !== null ? (idx + farmProjectImages.length - 1) % farmProjectImages.length : 0); }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <img
            src={farmProjectImages[lightboxIndex].src}
            alt={farmProjectImages[lightboxIndex].alt}
            className="max-h-[85vh] max-w-full rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            loading="lazy"
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx => idx !== null ? (idx + 1) % farmProjectImages.length : 0); }}
            aria-label="Next image"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {farmProjectImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                className={`w-2 h-2 rounded-full transition-colors ${i === lightboxIndex ? 'bg-white' : 'bg-white/40'}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Counties We Cover */}
      <CountiesWeCover industry="Agriculture" />

      {/* CTA Section */}
      <section className="py-16 bg-[#4a7c59] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Restore Your Farm Equipment?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get a detailed quote for your agricultural machinery restoration project. Fast turnaround to minimize downtime.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => setQuotePopupOpen(true)}
              className="bg-white text-[#4a7c59] px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              Request Free Quote
            </button>
            <a 
              href="tel:07970566409"
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Quote Popup */}
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}
