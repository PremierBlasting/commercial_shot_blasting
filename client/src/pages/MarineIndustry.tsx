import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, CheckCircle, ArrowRight, Anchor, Ship, Shield, Clock } from "lucide-react";
import { useState } from "react";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BackToTop } from "@/components/BackToTop";

export default function MarineIndustry() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  const marineServices = [
    {
      title: "Ship Hull Blasting",
      description: "Complete hull surface preparation for commercial vessels, cargo ships, and tankers. Remove marine growth, rust, and old coatings to bare metal.",
      image: "/marine-ship-cleaning.webp",
      link: "/services/steel-containers",
      benefits: ["Anti-fouling prep", "Corrosion removal", "Fast turnaround"]
    },
    {
      title: "Marine Structural Steel",
      description: "Shot blasting for offshore platforms, port infrastructure, and marine construction projects. Meet marine coating specifications.",
      image: "/service-structural-steel.webp",
      link: "/services/structural-steel-frames",
      benefits: ["Offshore approved", "Salt-resistant prep", "C5-M coating ready"]
    },
    {
      title: "Vessel Components",
      description: "Precision blasting for propellers, rudders, anchors, and deck equipment. Restore marine hardware to specification.",
      image: "/service-pipework.webp",
      link: "/services/pipework",
      benefits: ["Precision cleaning", "Component restoration", "Marine-grade finish"]
    },
    {
      title: "Port & Harbor Equipment",
      description: "Shot blasting for cranes, bollards, mooring equipment, and dock infrastructure exposed to harsh marine environments.",
      image: "/service-ladders.webp",
      link: "/services/ladders",
      benefits: ["Corrosion protection", "Extended service life", "Minimal downtime"]
    }
  ];

  const challenges = [
    {
      icon: Clock,
      title: "Vessel Downtime Costs",
      description: "Every day a vessel is out of service costs thousands. Our efficient processes minimize turnaround time while delivering marine-grade surface preparation."
    },
    {
      icon: Shield,
      title: "Harsh Marine Environment",
      description: "Saltwater corrosion demands superior surface preparation. We achieve professional cleanliness to Sa 3 cleanliness levels for long-lasting marine coatings."
    },
    {
      icon: Anchor,
      title: "Marine Coating Standards",
      description: "industry requirements demand precise surface profiles. We meet PSPC, NACE, and industry specifications."
    },
    {
      icon: Ship,
      title: "Large-Scale Projects",
      description: "Ship hulls and offshore structures require extensive blasting capacity. Our facilities handle components up to 12 meters with consistent quality."
    }
  ];

  const caseStudy = {
    title: "Cargo Vessel Hull Restoration - Port of Liverpool",
    client: "International Shipping Company",
    challenge: "A 180-meter cargo vessel required complete hull blasting and recoating during a scheduled 3-week dry dock period. The hull had severe corrosion and multiple layers of anti-fouling paint requiring removal to bare metal.",
    solution: "We deployed a team of 12 blasters working in shifts to cover the entire hull surface. Using copper slag abrasive for aggressive paint removal followed by steel grit for final surface profiling, we achieved professional cleanliness cleanliness with 75-micron profile. Immediate coating application prevented flash rusting.",
    result: "Complete hull preparation finished in 14 days, allowing 7 days for coating application. The vessel returned to service on schedule with a 5-year anti-fouling system, avoiding costly charter penalties.",
    stats: [
      { label: "Hull Area", value: "8,500 m²" },
      { label: "Project Duration", value: "14 days" },
      
      { label: "Coating Life", value: "5 years" }
    ]
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
