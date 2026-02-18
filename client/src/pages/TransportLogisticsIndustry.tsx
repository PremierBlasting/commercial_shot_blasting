import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, CheckCircle, ArrowRight, Truck, Package, Shield, Clock } from "lucide-react";
import { useState } from "react";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BackToTop } from "@/components/BackToTop";

export default function TransportLogisticsIndustry() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  const transportServices = [
    {
      title: "Commercial Vehicle Fleet",
      description: "Complete shot blasting for trucks, vans, and delivery vehicles. Remove rust from chassis, cabs, and body panels for fleet refurbishment programs.",
      image: "/transport-industry-hero.webp",
      link: "/services/commercial-vehicles",
      benefits: ["Fleet restoration", "Chassis cleaning", "Rapid turnaround"]
    },
    {
      title: "Trailer & Container Restoration",
      description: "Shot blasting for trailers, shipping containers, and cargo bodies. Prepare surfaces for protective coatings that withstand constant loading and weather exposure.",
      image: "/service-steel-containers.webp",
      link: "/services/steel-containers",
      benefits: ["Container refurbishment", "Weather protection", "Extended service life"]
    },
    {
      title: "Warehouse Equipment",
      description: "Surface preparation for racking systems, pallet trucks, forklifts, and material handling equipment. Maintain safety and appearance in logistics facilities.",
      image: "/service-warehouse-racking.webp",
      link: "/services/warehouse-racking",
      benefits: ["Safety compliance", "Equipment longevity", "Cost-effective"]
    },
    {
      title: "Loading Bay Infrastructure",
      description: "Shot blasting for dock levelers, roller shutters, steel doors, and warehouse structural steel. Protect high-traffic areas from corrosion and wear.",
      image: "/service-steel-doors.png",
      link: "/services/steel-doors",
      benefits: ["High-traffic durability", "Corrosion protection", "Minimal downtime"]
    }
  ];

  const challenges = [
    {
      icon: Clock,
      title: "Vehicle Downtime Costs",
      description: "Every day a commercial vehicle is off the road costs money. We offer rapid turnaround shot blasting to minimize fleet downtime and maximize operational efficiency."
    },
    {
      icon: Shield,
      title: "Road Salt & Corrosion",
      description: "Transport vehicles face constant exposure to road salt, weather, and chemicals. Our thorough surface preparation ensures protective coatings last longer."
    },
    {
      icon: Truck,
      title: "Large Vehicle Handling",
      description: "Commercial vehicles and trailers require specialized facilities. We accommodate full-size trucks, articulated trailers, and oversized logistics equipment."
    },
    {
      icon: Package,
      title: "Fleet Management Schedules",
      description: "Logistics operations run 24/7. We coordinate with fleet managers to schedule work during maintenance windows, ensuring minimal impact on operations."
    }
  ];

  const caseStudy = {
    title: "National Logistics Fleet Refurbishment - Midlands Hub",
    client: "Major Parcel Delivery Company",
    challenge: "A fleet of 25 delivery trucks required complete chassis and cab restoration as part of a 5-year fleet maintenance program. Vehicles had severe underside corrosion from winter road salt, and the company needed to maintain delivery schedules throughout the project.",
    solution: "We established a rolling schedule processing 5 trucks per week. Each vehicle received complete underside blasting, cab floor restoration, and body panel preparation. We worked evening shifts to return vehicles by morning, allowing daytime delivery operations to continue uninterrupted.",
    result: "All 25 trucks were restored over 5 weeks with zero impact on delivery operations. The fleet received protective coatings extending service life by 3-5 years, saving the company significant replacement costs while maintaining brand appearance standards.",
    stats: [
      { label: "Fleet Size", value: "25 trucks" },
      { label: "Project Duration", value: "5 weeks" },
      { label: "Operational Impact", value: "Zero downtime" },
      { label: "Life Extension", value: "3-5 years" }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/#industries" },
          { label: "Transport & Logistics", href: "/industries/transport-logistics", isCurrentPage: true }
        ]}
        className="container mt-4"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#c45500] to-[#8a3d00] text-white py-20">
        <div className="absolute inset-0 bg-[url('/transport-industry-hero.webp')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">Transport & Logistics Industry</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transport & Logistics Shot Blasting
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Professional surface preparation for commercial vehicles, trailers, and warehouse equipment. Keep your fleet on the road and logistics operations running smoothly with expert shot blasting services.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setQuotePopupOpen(true)}
                className="bg-white text-[#c45500] px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                Request Fleet Quote
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

      {/* Transport Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transport & Logistics Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive shot blasting services for the transport and logistics sector.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {transportServices.map((service, index) => (
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
                      <span key={i} className="text-xs bg-[#c45500]/10 text-[#c45500] px-3 py-1 rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                  <Link href={service.link} className="inline-flex items-center gap-2 text-[#c45500] font-semibold hover:gap-3 transition-all">
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
              Transport & Logistics Challenges We Solve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the operational demands of transport and logistics businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#c45500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#c45500]" />
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
              <span className="text-[#c45500] font-semibold text-sm uppercase tracking-wider">Case Study</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                {caseStudy.title}
              </h2>
              <p className="text-gray-600 italic">{caseStudy.client}</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#c45500] text-white rounded-full flex items-center justify-center text-sm">1</span>
                    The Challenge
                  </h3>
                  <p className="text-gray-600 ml-10">{caseStudy.challenge}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#c45500] text-white rounded-full flex items-center justify-center text-sm">2</span>
                    Our Solution
                  </h3>
                  <p className="text-gray-600 ml-10">{caseStudy.solution}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#c45500] text-white rounded-full flex items-center justify-center text-sm">3</span>
                    The Result
                  </h3>
                  <p className="text-gray-600 ml-10">{caseStudy.result}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t">
                {caseStudy.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-[#c45500] mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#c45500] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Refurbish Your Fleet?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get a detailed quote for your commercial vehicle or warehouse equipment project. Minimize downtime, maximize value.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => setQuotePopupOpen(true)}
              className="bg-white text-[#c45500] px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
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
