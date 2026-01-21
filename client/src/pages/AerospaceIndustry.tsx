import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, CheckCircle, ArrowRight, Plane, Shield, Award, Cog, FileCheck, Gauge, Target, Zap } from "lucide-react";
import { useState } from "react";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BackToTop } from "@/components/BackToTop";

export default function AerospaceIndustry() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  const aerospaceServices = [
    {
      title: "Landing Gear Components",
      description: "Precision shot blasting and peening for landing gear assemblies, struts, and associated components. Critical surface preparation meeting stringent aerospace specifications for fatigue life enhancement.",
      image: "/service-structural-steel.png",
      link: "/services/structural-steel-frames",
      benefits: ["NADCAP compliant processes", "Fatigue life improvement", "Full traceability"]
    },
    {
      title: "Engine Components & Turbine Parts",
      description: "Specialist surface treatment for engine casings, turbine blades, and combustion chamber components. Controlled shot peening to enhance component durability and resistance to stress corrosion.",
      image: "/service-pipework.png",
      link: "/services/pipework",
      benefits: ["Stress relief treatment", "Surface hardening", "Precision controlled"]
    },
    {
      title: "Structural Airframe Components",
      description: "Shot blasting for wing spars, fuselage frames, ribs, and structural fittings. Surface preparation for subsequent coating, bonding, or inspection processes.",
      image: "/service-structural-steel.png",
      link: "/services/structural-steel-frames",
      benefits: ["Coating preparation", "NDT ready surfaces", "Dimensional preservation"]
    },
    {
      title: "Ground Support Equipment",
      description: "Comprehensive refurbishment of aerospace ground support equipment including maintenance platforms, tooling, and handling equipment. Extend service life while maintaining safety standards.",
      image: "/service-ladders.png",
      link: "/services/ladders",
      benefits: ["Cost-effective refurbishment", "Safety certified", "Quick turnaround"]
    }
  ];

  const challenges = [
    {
      icon: Award,
      title: "Stringent Quality Standards",
      description: "Aerospace demands the highest quality standards. Our processes meet AS9100, NADCAP, and customer-specific requirements with full documentation and traceability."
    },
    {
      icon: FileCheck,
      title: "Regulatory Compliance",
      description: "Aviation authorities require certified processes. We maintain comprehensive quality management systems aligned with CAA, EASA, and FAA requirements."
    },
    {
      icon: Target,
      title: "Precision Requirements",
      description: "Aerospace components require precise surface finishes. Our controlled processes deliver consistent, repeatable results within tight tolerances."
    },
    {
      icon: Gauge,
      title: "Fatigue Life Enhancement",
      description: "Component longevity is critical for flight safety. Shot peening induces beneficial compressive stress to significantly extend fatigue life."
    }
  ];

  const caseStudy = {
    title: "Regional Aircraft Operator - Landing Gear Overhaul Support",
    client: "UK Regional Airline MRO Facility",
    challenge: "A regional aircraft maintenance facility required shot blasting services for landing gear overhaul programmes. Components needed surface preparation to SA 2.5 standard before NDT inspection and protective coating application. Strict turnaround times were essential to minimise aircraft downtime.",
    solution: "We established a dedicated workflow for the MRO facility with priority scheduling. Each landing gear component was processed with full batch traceability, surface profile measurement, and photographic documentation. Components were returned within 48 hours of receipt, ready for inspection.",
    result: "The partnership has supported over 50 landing gear overhauls with 100% on-time delivery. Surface preparation quality has contributed to zero coating failures in service. The MRO facility has reduced their overhaul turnaround time by 2 days through our responsive service.",
    stats: [
      { label: "Overhauls Supported", value: "50+" },
      { label: "On-Time Delivery", value: "100%" },
      { label: "Coating Failures", value: "Zero" },
      { label: "Turnaround Time", value: "48 hrs" }
    ]
  };

  const benefits = [
    "NADCAP-aligned processes for aerospace surface treatment",
    "Full material and process traceability documentation",
    "Controlled shot peening for fatigue life enhancement",
    "Surface profiles meeting aerospace coating specifications",
    "Experienced team with aerospace industry knowledge",
    "Priority scheduling for AOG and urgent requirements",
    "Secure handling of proprietary components",
    "Comprehensive quality records and certification"
  ];

  const certifications = [
    {
      title: "AS9100 Alignment",
      description: "Quality management processes aligned with aerospace industry standard AS9100 requirements."
    },
    {
      title: "NADCAP Awareness",
      description: "Processes developed with awareness of NADCAP special process requirements for shot peening."
    },
    {
      title: "ISO 8501-1 Compliance",
      description: "Surface preparation to internationally recognised cleanliness standards SA 1 through SA 3."
    },
    {
      title: "AMS 2430/2432",
      description: "Shot peening processes aligned with Aerospace Material Specification requirements."
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Technical Review",
      description: "Detailed review of component specifications, drawings, and surface preparation requirements."
    },
    {
      step: "2",
      title: "Process Planning",
      description: "Development of process parameters including media selection, intensity, and coverage requirements."
    },
    {
      step: "3",
      title: "Controlled Processing",
      description: "Shot blasting or peening performed with continuous monitoring and parameter recording."
    },
    {
      step: "4",
      title: "Quality Verification",
      description: "Surface profile measurement, coverage verification, and documentation completion."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/#industries" },
          { label: "Aerospace", href: "/industries/aerospace", isCurrentPage: true }
        ]}
        className="container mt-4"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1e4159] text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1600')] bg-cover bg-center opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="w-8 h-8" />
              <span className="text-sm font-medium uppercase tracking-wider">Aerospace Industry</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Precision Shot Blasting for Aerospace Applications
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Specialist surface preparation and shot peening services for aerospace components. Meeting the industry's demanding quality standards with full traceability, controlled processes, and rapid turnaround times.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setQuotePopupOpen(true)}
                className="bg-white text-[#2C5F7F] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get a Free Quote
              </button>
              <a
                href="tel:07970566409"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                07970 566409
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Challenges */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Understanding Aerospace Requirements</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Aerospace Industry Challenges
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We understand the critical nature of aerospace surface treatment. Our services are designed to meet the industry's exacting standards for quality, traceability, and reliability.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((challenge, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                    <challenge.icon className="w-6 h-6 text-[#2C5F7F]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{challenge.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{challenge.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Specialist Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Aerospace Shot Blasting Solutions
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Comprehensive surface preparation services for the aerospace sector, from flight-critical components to ground support equipment.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {aerospaceServices.map((service, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.benefits.map((benefit, i) => (
                      <span key={i} className="text-xs bg-[#2C5F7F]/10 text-[#2C5F7F] px-3 py-1 rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                  <Link href={service.link}>
                    <a className="inline-flex items-center gap-2 text-[#2C5F7F] font-semibold hover:gap-3 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </a>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Quality Assured Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Aerospace Process Workflow
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Every aerospace component follows a controlled process workflow ensuring consistent quality and full traceability.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-lg p-6 h-full">
                  <div className="w-10 h-10 bg-[#2C5F7F] text-white rounded-full flex items-center justify-center font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-[#2C5F7F]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Certifications */}
      <section className="py-20 bg-[#2C5F7F] text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-white/80 font-medium mb-2">Why Choose Us</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Benefits for Aerospace Customers
              </h2>
              <p className="text-white/90 mb-8 leading-relaxed">
                Our aerospace surface treatment services combine precision processing with comprehensive quality documentation to support your maintenance, repair, and overhaul operations.
              </p>
              <div className="grid gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Standards & Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="border-b border-white/20 pb-4 last:border-0">
                    <h4 className="font-semibold mb-1">{cert.title}</h4>
                    <p className="text-white/70 text-sm">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Success Story</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Aerospace Project Case Study
            </h2>
          </div>
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {caseStudy.title}
                </h3>
                <p className="text-[#2C5F7F] font-medium mb-6">{caseStudy.client}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm uppercase text-gray-500 mb-2">Challenge</h4>
                    <p className="text-gray-700 leading-relaxed">{caseStudy.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase text-gray-500 mb-2">Solution</h4>
                    <p className="text-gray-700 leading-relaxed">{caseStudy.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase text-gray-500 mb-2">Result</h4>
                    <p className="text-gray-700 leading-relaxed">{caseStudy.result}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="grid grid-cols-2 gap-4 w-full">
                  {caseStudy.stats.map((stat, index) => (
                    <div key={index} className="bg-[#F5F1E8] rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold text-[#2C5F7F] mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Partner With Us for Aerospace Surface Treatment
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Contact us today to discuss your aerospace surface preparation requirements. Our team is ready to support your MRO operations with quality-assured shot blasting and peening services.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setQuotePopupOpen(true)}
                className="bg-[#2C5F7F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1e4159] transition-colors"
              >
                Request a Quote
              </button>
              <Link href="/free-site-survey">
                <a className="border-2 border-[#2C5F7F] text-[#2C5F7F] px-8 py-3 rounded-lg font-semibold hover:bg-[#2C5F7F]/10 transition-colors">
                  Book Free Site Survey
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
    </div>
  );
}
