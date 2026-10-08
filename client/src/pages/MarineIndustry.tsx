import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, CheckCircle, ArrowRight, Anchor, Ship, Shield, Clock } from "lucide-react";
import { useState } from "react";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BackToTop } from "@/components/BackToTop";

const UK_MANAGED_MEDIA_ORIGIN = "https://www.ukshotblastingservices.com";

export default function MarineIndustry() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  const marineServices = [
    {
      title: "Ship Hull Blasting",
      description: "Surface-preparation planning for commercial vessels, cargo ships and tankers, with the required scope agreed against the coating and access brief.",
      image: "/marine-ship-cleaning.webp",
      link: "/services/steel-containers",
      benefits: ["Scope review", "Coating brief", "Access planning"]
    },
    {
      title: "Marine Structural Steel",
      description: "Surface preparation for offshore platforms, port infrastructure and marine construction, planned against the client’s required coating specification.",
      image: "/service-structural-steel.webp",
      link: "/services/structural-steel-frames",
      benefits: ["Specification review", "Condition assessment", "Coating-interface planning"]
    },
    {
      title: "Vessel Components",
      description: "Surface-preparation planning for propellers, rudders, anchors and deck equipment, with component condition and access reviewed first.",
      image: "/service-pipework.webp",
      link: "/services/pipework",
      benefits: ["Component review", "Preparation brief", "Handover records"]
    },
    {
      title: "Port & Harbor Equipment",
      description: "Surface-preparation planning for cranes, bollards, mooring equipment and dock infrastructure in exposed environments.",
      image: "/service-ladders.webp",
      link: "/services/ladders",
      benefits: ["Condition review", "Access planning", "Scope coordination"]
    }
  ];

  const challenges = [
    {
      icon: Clock,
      title: "Access and programme coordination",
      description: "Marine work may need to align with access windows, lifting plans and the wider coating programme. These constraints are reviewed before scope is agreed."
    },
    {
      icon: Shield,
      title: "Harsh Marine Environment",
      description: "Saltwater exposure, humidity and existing coating condition can affect the preparation and coating brief. The required preparation grade is confirmed for the specific project."
    },
    {
      icon: Anchor,
      title: "Marine coating specifications",
      description: "The coating manufacturer’s data, client specification and inspection requirements should define the preparation grade, profile, contamination controls and records."
    },
    {
      icon: Ship,
      title: "Large-Scale Projects",
      description: "Large fabrications can require staged handling, lifting coordination and practical access planning. The proposed sequence is scoped around the fabrication and site conditions."
    }
  ];

  const caseStudy = {
    title: "ADE Power — Wakefield Marine CX Enclosures",
    client: "Published project record · Wakefield, WF9",
    challenge: "The supplied ADE Power project update records large fabricated enclosures at the Wakefield, WF9 project, with surface preparation and priming forming part of the stated Marine CX route. The scope is presented from the approved project update and supplied media only.",
    solution: "The supplied update confirms that the enclosures were blasted and primed to the stated Marine CX standard. The project record does not add an unverified blast-cleaning grade, surface profile, primer product, film thickness, inspection result, final coating-system approval or programme.",
    result: "The supplied update records the enclosures after blasting and priming, with the next enclosure-flipping stage under way. This is a documented live project stage, not a claim of final coating completion or future performance.",
    stats: [
      { label: "Location", value: "Wakefield, WF9" },
      { label: "Scope", value: "Large enclosures" },
      { label: "Recorded route", value: "Marine CX" },
      { label: "Current stage", value: "Flipping" }
    ],
    images: [
      { src: `${UK_MANAGED_MEDIA_ORIGIN}/manus-storage/ade-power-wakefield-enclosure-01_217cd4e1.webp`, alt: "Large ADE Power enclosure at the Wakefield project after the supplied documented blasting and priming stage" },
      { src: `${UK_MANAGED_MEDIA_ORIGIN}/manus-storage/ade-power-wakefield-enclosure-03_a150a0c0.webp`, alt: "ADE Power enclosure inside the Wakefield workshop at the supplied documented project stage" },
      { src: `${UK_MANAGED_MEDIA_ORIGIN}/manus-storage/ade-power-wakefield-enclosure-05_72482b5e.webp`, alt: "Close exterior view of a primed ADE Power enclosure at the Wakefield project" },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/#industries" },
          { label: "Marine", href: "/industries/marine", isCurrentPage: true }
        ]}
        className="container mt-4"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1e4159] to-[#0d2838] text-white py-20">
        <div className="absolute inset-0 bg-[url('/marine-industry-hero.webp')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Anchor className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">Marine Industry</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Marine Shot Blasting Services
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Specialist surface preparation for vessels, offshore structures, and marine infrastructure. Meeting industry requirements for the maritime industry.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setQuotePopupOpen(true)}
                className="bg-white text-[#1e4159] px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                Request Marine Quote
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

      {/* Marine Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Marine Shot Blasting Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive surface preparation services for the maritime sector, from vessel hulls to offshore platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {marineServices.map((service, index) => (
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
                      <span key={i} className="text-xs bg-[#1e4159]/10 text-[#1e4159] px-3 py-1 rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                  <Link href={service.link} className="inline-flex items-center gap-2 text-[#1e4159] font-semibold hover:gap-3 transition-all">
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
              Marine Industry Challenges We Solve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The maritime sector faces unique surface preparation demands. Here's how we address them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#1e4159]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#1e4159]" />
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
              <span className="text-[#1e4159] font-semibold text-sm uppercase tracking-wider">Case Study</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                {caseStudy.title}
              </h2>
              <p className="text-gray-600 italic">{caseStudy.client}</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="grid gap-4 sm:grid-cols-3 mb-8">
                {caseStudy.images.map(image => (
                  <img key={image.src} src={image.src} alt={image.alt} loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover" />
                ))}
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#1e4159] text-white rounded-full flex items-center justify-center text-sm">1</span>
                    The Challenge
                  </h3>
                  <p className="text-gray-600 ml-10">{caseStudy.challenge}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#1e4159] text-white rounded-full flex items-center justify-center text-sm">2</span>
                    Our Solution
                  </h3>
                  <p className="text-gray-600 ml-10">{caseStudy.solution}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#1e4159] text-white rounded-full flex items-center justify-center text-sm">3</span>
                    The Result
                  </h3>
                  <p className="text-gray-600 ml-10">{caseStudy.result}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t">
                {caseStudy.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-[#1e4159] mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-md border border-[#1e4159]/15 bg-[#1e4159]/5 p-5 text-gray-700">
                <p className="font-semibold text-[#1e4159]">Marine CX surface-preparation guidance</p>
                <p className="mt-2 text-sm leading-relaxed">For the wider specification and handover context, read the evidence-led <a href="https://ukshotblastingservices.com/marine-cx-surface-preparation" className="font-semibold text-[#1e4159] underline underline-offset-4">Marine CX surface-preparation guide</a> and the <a href="https://ukshotblastingservices.com/case-studies/ade-power-wakefield-marine-cx-enclosures" className="font-semibold text-[#1e4159] underline underline-offset-4">full ADE Power project record</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1e4159] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Marine Project?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get a detailed quote for your vessel or marine infrastructure project. Fast turnaround, marine-grade quality.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => setQuotePopupOpen(true)}
              className="bg-white text-[#1e4159] px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
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
