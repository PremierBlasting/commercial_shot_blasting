import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, CheckCircle, ArrowRight, Factory, Cog, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BackToTop } from "@/components/BackToTop";

export default function ManufacturingIndustry() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  const manufacturingServices = [
    {
      title: "Warehouse Racking & Pallet Frames",
      description: "Professional shot blasting for warehouse racking systems and storage infrastructure. Extend the life of your material handling equipment with cost-effective refurbishment.",
      image: "/service-warehouse-racking.webp",
      link: "/services/warehouse-racking",
      benefits: ["60% cost saving vs replacement", "Powder coating ready", "Minimal downtime"]
    },
    {
      title: "Crane Beams, Gantries & Runway Rails",
      description: "Specialist surface preparation for overhead crane systems and material handling infrastructure. Maintain dimensional tolerances while removing rust and coatings.",
      image: "/service-crane-beams.webp",
      link: "/services/crane-beams",
      benefits: ["Preserves tolerances", "Load testing coordination", "Weekend scheduling"]
    },
    {
      title: "Process Pipework & Manifolds",
      description: "Precision cleaning for food-grade, pharmaceutical, and chemical process pipework. Meet stringent cleanliness levels for regulated industries.",
      image: "/service-pipework.webp",
      link: "/services/pipework",
      benefits: ["Food-grade quality", "Pharmaceutical compliant", "Full traceability"]
    },
    {
      title: "Fixed Ladders & Access Platforms",
      description: "Comprehensive surface preparation for industrial access systems. Ensure compliance with working at height regulations and extend equipment life.",
      image: "/service-ladders.webp",
      link: "/services/ladders",
      benefits: ["Safety compliant", "Galvanizing preparation", "Regulatory compliance"]
    }
  ];

  const challenges = [
    {
      icon: Zap,
      title: "Minimizing Production Downtime",
      description: "Manufacturing operations can't afford extended shutdowns. We offer flexible scheduling including weekend and night shifts to keep your production running."
    },
    {
      icon: TrendingUp,
      title: "Cost-Effective Refurbishment",
      description: "Replacing industrial equipment is expensive. Our shot blasting services restore components to like-new condition at a fraction of replacement costs."
    },
    {
      icon: Cog,
      title: "Maintaining Equipment Standards",
      description: "Manufacturing equipment must meet precise requirements. Our processes preserve dimensional tolerances while achieving required cleanliness levels."
    },
    {
      icon: Factory,
      title: "Quality Service",
      description: "Food, pharmaceutical, and chemical industries face high standards. We provide high-quality surface preparation with full documentation and traceability."
    }
  ];

  const caseStudy = {
    title: "Distribution Center Racking Refurbishment - Nottingham",
    client: "National Logistics Company",
    challenge: "A 50,000 sq ft distribution center required complete refurbishment of corroded pallet racking systems serving 24/7 operations. Rust and damaged powder coating compromised both safety and appearance. The facility could not afford extended downtime for replacement.",
    solution: "We coordinated a phased refurbishment program, removing and processing racking sections zone by zone. Over 200 racking components were shot blasted to remove all rust and old coatings, then powder coated and reinstalled. Work was scheduled around warehouse operations to maintain continuous service.",
    result: "The client saved over 60% compared to new racking replacement costs. All components were restored to like-new condition and verified safe for continued use. The phased approach allowed the warehouse to maintain operations throughout the 8-week refurbishment program.",
    stats: [
      { label: "Cost Saving", value: "60%" },
      { label: "Components Processed", value: "200+" },
      { label: "Project Duration", value: "8 weeks" },
      { label: "Warehouse Uptime", value: "100%" }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/#industries" },
          { label: "Manufacturing", href: "/industries/manufacturing", isCurrentPage: true }
        ]}
        className="container mt-4"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1e4159] text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1600')] bg-cover bg-center opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Factory className="w-8 h-8" />
              <span className="text-sm font-medium uppercase tracking-wider">Manufacturing Industry</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Solutions for Manufacturing Facilities
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Cost-effective refurbishment and surface preparation for warehouse racking, crane systems, process pipework, and industrial access equipment. Minimize downtime, maximize equipment life, maintain quality.
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
            <p className="text-[#2C5F7F] font-medium mb-2">Understanding Your Operations</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Manufacturing Industry Challenges
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We understand the operational and financial pressures facing manufacturing facilities. Our services address these specific challenges.
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
              Manufacturing Shot Blasting Solutions
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Comprehensive surface preparation services for manufacturing facilities, from warehouse infrastructure to process equipment and material handling systems.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {manufacturingServices.map((service, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all">
                <div className="h-64 overflow-hidden">
                  <img loading="lazy"
                    
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

      {/* Case Study */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Success Story</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Manufacturing Project Case Study
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
              <div>
                <div className="grid grid-cols-2 gap-4">
                  {caseStudy.stats.map((stat, index) => (
                    <Card key={index} className="bg-white">
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-[#2C5F7F] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 bg-[#2C5F7F] text-white p-6 rounded-lg">
                  <h4 className="font-bold mb-3">Why Manufacturing Facilities Choose Us</h4>
                  <ul className="space-y-2">
                    {[
                      "Flexible scheduling around production",
                      "60% cost saving vs equipment replacement",
                      "Food-grade and pharmaceutical quality",
                      "Fast turnaround to minimize downtime"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Industry Sectors */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">We Serve</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Manufacturing Sectors
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Food & Beverage Processing",
                description: "Food-grade shot blasting for process pipework, tanks, and equipment. Meet industry requirements.",
                icon: "🍽️"
              },
              {
                title: "Pharmaceutical Manufacturing",
                description: "Precision cleaning for pharmaceutical process equipment. Full traceability and documentation.",
                icon: "💊"
              },
              {
                title: "Chemical Processing",
                description: "Surface preparation for chemical plant pipework, vessels, and infrastructure. Corrosion-resistant coatings.",
                icon: "⚗️"
              },
              {
                title: "Automotive Manufacturing",
                description: "Overhead crane systems, material handling equipment, and production line infrastructure.",
                icon: "🚗"
              },
              {
                title: "Logistics & Warehousing",
                description: "Warehouse racking refurbishment, mezzanine structures, and material handling systems.",
                icon: "📦"
              },
              {
                title: "General Manufacturing",
                description: "Factory infrastructure, access systems, structural steelwork, and industrial equipment.",
                icon: "🏭"
              }
            ].map((sector, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{sector.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{sector.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{sector.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog Post Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5">
                <img loading="lazy"
                    
                  src="/blog-warehouse-racking.webp"
                  alt="Warehouse Racking Refurbishment"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:w-3/5">
                <div className="text-sm text-[#2C5F7F] font-semibold mb-2">FEATURED ARTICLE</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Warehouse Racking Refurbishment vs. Replacement: A Cost-Benefit Analysis
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Discover how professional shot blasting refurbishment delivers 60-75% cost savings compared to replacement while extending asset life by 15-20 years. This comprehensive analysis reveals the hidden costs of premature replacement and provides a framework for making data-driven decisions.
                </p>
                <ul className="text-gray-600 mb-6 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#2C5F7F]" />
                    <span>Detailed cost comparison: £813,000 savings on 5,000 pallet positions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#2C5F7F]" />
                    <span>Real-world case study: Food distribution warehouse refurbishment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#2C5F7F]" />
                    <span>Decision framework for facility managers</span>
                  </li>
                </ul>
                <Link href="/blog/warehouse-racking-refurbishment-vs-replacement">
                  <a className="inline-flex items-center gap-2 text-[#2C5F7F] font-semibold hover:text-[#1e4159] transition-colors">
                    Read Full Article
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2C5F7F] to-[#1e4159] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Refurbish Your Manufacturing Equipment?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get a free quote for warehouse racking, crane systems, process pipework, or access equipment. Save 60% vs replacement, minimize downtime, maintain quality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setQuotePopupOpen(true)}
              className="bg-white text-[#2C5F7F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Get Your Free Quote
            </button>
            <a
              href="tel:07970566409"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2 text-lg"
            >
              <Phone className="w-5 h-5" />
              Call 07970 566409
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C2C2C] text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#2C5F7F] rounded-full flex items-center justify-center font-bold text-lg">
                  CSB
                </div>
                <span className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Commercial Shot Blasting</span>
              </div>
              <p className="text-white/70 text-sm">Professional shot blasting services for manufacturing and industrial applications across the UK.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Manufacturing Services</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link href="/services/warehouse-racking"><a className="hover:text-white">Warehouse Racking</a></Link></li>
                <li><Link href="/services/crane-beams"><a className="hover:text-white">Crane Beams</a></Link></li>
                <li><Link href="/services/pipework"><a className="hover:text-white">Process Pipework</a></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Industries</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link href="/industries/construction"><a className="hover:text-white">Construction</a></Link></li>
                <li><Link href="/industries/manufacturing"><a className="hover:text-white">Manufacturing</a></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:07970566409" className="hover:text-white">07970 566409</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:info@commercialshotblasting.co.uk" className="hover:text-white">info@commercialshotblasting.co.uk</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
            <p>&copy; {new Date().getFullYear()} Commercial Shot Blasting Services. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Quote Popup */}
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}