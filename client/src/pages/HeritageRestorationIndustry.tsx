import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, CheckCircle, ArrowRight, Landmark, Sparkles, Shield, Clock } from "lucide-react";
import { useState } from "react";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BackToTop } from "@/components/BackToTop";

export default function HeritageRestorationIndustry() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  const heritageServices = [
    {
      title: "Listed Building Metalwork",
      description: "Specialist shot blasting for Grade I and II listed buildings. Gentle cleaning that preserves original features, casting marks, and historical integrity while removing corrosion.",
      image: "/heritage-industry-hero.webp",
      link: "/services/staircases",
      benefits: ["Heritage approved", "Preserves details", "Conservation standards"]
    },
    {
      title: "Architectural Ironwork",
      description: "Precision restoration for railings, gates, balconies, and decorative metalwork. Remove paint layers while maintaining intricate Victorian and Georgian details.",
      image: "/heritage-restoration.webp",
      link: "/services/fire-escapes",
      benefits: ["Delicate cleaning", "Period authenticity", "Expert craftsmanship"]
    },
    {
      title: "Historic Bridges & Structures",
      description: "Sympathetic surface preparation for heritage bridges, viaducts, and industrial monuments. Meet conservation requirements while ensuring structural longevity.",
      image: "/service-bridge-steelwork.webp",
      link: "/services/bridge-steelwork",
      benefits: ["Conservation approved", "Structural integrity", "Heritage protection"]
    },
    {
      title: "Museum & Display Items",
      description: "Careful restoration of historical machinery, vehicles, and artifacts for museums and collections. Preserve provenance while removing decades of corrosion.",
      image: "/service-commercial-radiators.png",
      link: "/services/commercial-radiators",
      benefits: ["Museum quality", "Artifact preservation", "Documentation"]
    }
  ];

  const challenges = [
    {
      icon: Clock,
      title: "Conservation Requirements",
      description: "Heritage projects demand specialized techniques that preserve original features. We use controlled pressure and selective abrasives to protect historical integrity."
    },
    {
      icon: Shield,
      title: "Listed Building Consent",
      description: "Working with conservation officers and heritage bodies requires proven expertise. Our methods meet English Heritage and Historic England standards."
    },
    {
      icon: Landmark,
      title: "Irreplaceable Features",
      description: "One mistake can destroy centuries-old details. Our experienced team uses gentle cleaning methods that preserve casting marks, maker's stamps, and decorative elements."
    },
    {
      icon: Sparkles,
      title: "Period Authenticity",
      description: "Restoration must respect original craftsmanship and materials. We achieve appropriate surface finishes that honor historical manufacturing techniques."
    }
  ];

  const caseStudy = {
    title: "Victorian Railway Station Restoration - Grade II Listed",
    client: "Heritage Railway Trust",
    challenge: "A Victorian railway station required restoration of ornate cast iron columns, decorative brackets, and platform canopy steelwork. The Grade II listing demanded preservation of all original features including manufacturer's marks and Victorian decorative details. Multiple paint layers from 150 years needed removal without damaging the underlying ironwork.",
    solution: "We conducted test panels with conservation officers to establish appropriate blast pressure and abrasive media. Using fine aluminum oxide at reduced pressure, we carefully removed paint layers while preserving all casting details. Each component was documented photographically before, during, and after treatment. Original bolt holes and fixing points were protected to maintain structural authenticity.",
    result: "The station metalwork was restored to reveal original Victorian craftsmanship while meeting conservation standards. All manufacturer's marks and decorative details were preserved. The project received Heritage Lottery Fund approval and the station won a Railway Heritage Trust conservation award.",
    stats: [
      { label: "Project Age", value: "1870s structure" },
      { label: "Components", value: "45 cast iron pieces" },
      { label: "Paint Layers", value: "12 removed" },
      { label: "Award", value: "RHT Conservation" }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/#industries" },
          { label: "Heritage & Restoration", href: "/industries/heritage-restoration", isCurrentPage: true }
        ]}
        className="container mt-4"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#6b4423] to-[#4a2f18] text-white py-20">
        <div className="absolute inset-0 bg-[url('/heritage-industry-hero.webp')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Landmark className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">Heritage & Restoration</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Heritage Shot Blasting & Restoration
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Specialist conservation-grade shot blasting for listed buildings, historic structures, and heritage metalwork. Preserve the past with expert surface preparation that respects original craftsmanship.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setQuotePopupOpen(true)}
                className="bg-white text-[#6b4423] px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                Request Heritage Quote
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

      {/* Heritage Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Heritage Restoration Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conservation-grade shot blasting for historic buildings, structures, and artifacts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {heritageServices.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img loading="lazy"
                    
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.benefits.map((benefit, i) => (
                      <span key={i} className="text-xs bg-[#6b4423]/10 text-[#6b4423] px-3 py-1 rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                  <Link href={service.link} className="inline-flex items-center gap-2 text-[#6b4423] font-semibold hover:gap-3 transition-all">
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
              Heritage Conservation Challenges
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the unique demands of heritage restoration and conservation work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#6b4423]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#6b4423]" />
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
              <span className="text-[#6b4423] font-semibold text-sm uppercase tracking-wider">Case Study</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                {caseStudy.title}
              </h2>
              <p className="text-gray-600 italic">{caseStudy.client}</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#6b4423] text-white rounded-full flex items-center justify-center text-sm">1</span>
                    The Challenge
                  </h3>
                  <p className="text-gray-600 ml-10">{caseStudy.challenge}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#6b4423] text-white rounded-full flex items-center justify-center text-sm">2</span>
                    Our Solution
                  </h3>
                  <p className="text-gray-600 ml-10">{caseStudy.solution}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#6b4423] text-white rounded-full flex items-center justify-center text-sm">3</span>
                    The Result
                  </h3>
                  <p className="text-gray-600 ml-10">{caseStudy.result}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t">
                {caseStudy.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-[#6b4423] mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#6b4423] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Restore Your Heritage Project?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get expert advice on your heritage restoration project. Conservation-approved methods, proven expertise.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => setQuotePopupOpen(true)}
              className="bg-white text-[#6b4423] px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
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
