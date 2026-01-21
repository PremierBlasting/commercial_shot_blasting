import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, CheckCircle, ArrowRight, Building2, HardHat, Shield, Clock } from "lucide-react";
import { useState } from "react";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BackToTop } from "@/components/BackToTop";

export default function ConstructionIndustry() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  const constructionServices = [
    {
      title: "Structural Steel Frames",
      description: "Comprehensive shot blasting for building frames, roof trusses, and load-bearing steel structures. Essential for new construction projects and structural refurbishment.",
      image: "/service-structural-steel.png",
      link: "/services/structural-steel-frames",
      benefits: ["SA 2.5/SA 3 standards", "Galvanizing preparation", "Fast turnaround"]
    },
    {
      title: "Bridge Steelwork",
      description: "Specialist surface preparation for bridge girders, crossmembers, and parapet rails. Meeting highway and railway infrastructure specifications.",
      image: "/service-bridge-steelwork.png",
      link: "/services/bridge-steelwork",
      benefits: ["Highway authority approved", "Traffic management coordination", "Heritage restoration"]
    },
    {
      title: "Fire Escapes & Stair Towers",
      description: "Complete refurbishment of fire safety infrastructure. Remove corrosion and ensure compliance with building regulations.",
      image: "/service-fire-escapes.png",
      link: "/services/fire-escapes",
      benefits: ["Safety compliance", "Working at height certified", "Minimal disruption"]
    },
    {
      title: "Internal Staircases & Balustrades",
      description: "Precision shot blasting for architectural metalwork. Perfect for heritage restoration and new commercial developments.",
      image: "/service-staircases.png",
      link: "/services/staircases",
      benefits: ["Heritage approved", "Preserves fine details", "Powder coating ready"]
    }
  ];

  const challenges = [
    {
      icon: Clock,
      title: "Tight Project Deadlines",
      description: "Construction schedules demand rapid turnaround without compromising quality. Our efficient processes and dedicated facilities ensure on-time delivery."
    },
    {
      icon: Shield,
      title: "Regulatory Compliance",
      description: "Building regulations and structural standards require certified surface preparation. We meet SA 2.5, SA 3, and all relevant British Standards."
    },
    {
      icon: HardHat,
      title: "Site Coordination",
      description: "Complex construction sites need seamless logistics. We coordinate with main contractors, provide flexible scheduling, and minimize site disruption."
    },
    {
      icon: Building2,
      title: "Heritage Constraints",
      description: "Listed buildings require specialist techniques that preserve original features. Our precision methods meet conservation requirements."
    }
  ];

  const caseStudy = {
    title: "Multi-Storey Office Development - Birmingham",
    client: "Major Construction Contractor",
    challenge: "A 12-storey office development required shot blasting of 450 tonnes of structural steelwork including beams, columns, and architectural features. The project had a strict 6-week deadline before galvanizing.",
    solution: "We coordinated delivery of steel sections directly from the fabricator to our facility. Working double shifts, we processed all components to SA 2.5 standard, with quality certification for each batch. Components were transported to the galvanizer within 24 hours of blasting to prevent surface oxidation.",
    result: "All 450 tonnes were processed within 5 weeks, allowing the construction program to proceed on schedule. The project achieved BREEAM Excellent certification, with our surface preparation contributing to the 60-year design life specification.",
    stats: [
      { label: "Steel Processed", value: "450 tonnes" },
      { label: "Project Duration", value: "5 weeks" },
      { label: "Quality Standard", value: "SA 2.5" },
      { label: "Design Life", value: "60 years" }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/#industries" },
          { label: "Construction", href: "/industries/construction", isCurrentPage: true }
        ]}
        className="container mt-4"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1e4159] text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600')] bg-cover bg-center opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-8 h-8" />
              <span className="text-sm font-medium uppercase tracking-wider">Construction Industry</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Solutions for Construction Projects
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Specialist surface preparation for structural steelwork, bridge infrastructure, and architectural metalwork. Supporting construction projects from heritage restoration to modern developments across the UK.
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
            <p className="text-[#2C5F7F] font-medium mb-2">Understanding Your Needs</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Construction Industry Challenges
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We understand the unique pressures facing construction projects. Our services are designed to address these specific challenges.
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
              Construction Shot Blasting Solutions
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Comprehensive surface preparation services tailored for the construction industry, from structural steelwork to architectural features.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {constructionServices.map((service, index) => (
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

      {/* Case Study */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Success Story</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Construction Project Case Study
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
                  <h4 className="font-bold mb-3">Why Construction Companies Choose Us</h4>
                  <ul className="space-y-2">
                    {[
                      "Certified to industry standards",
                      "Flexible scheduling around site programs",
                      "Large capacity for major projects",
                      "Quality documentation and traceability"
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

      {/* Free Resource Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12 border-l-4 border-[#2C5F7F]">
            <div className="flex items-start gap-6">
              <div className="hidden md:block w-16 h-16 bg-[#2C5F7F] rounded-lg flex-shrink-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Free Download: Steel Preparation Standards Guide
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Get our comprehensive 12-page PDF guide covering international standards (ISO 8501, SSPC), quality control procedures, and best practices for shot blasting structural steel, bridges, and architectural metalwork. Essential reading for construction project managers, engineers, and contractors.
                </p>
                <ul className="text-gray-600 mb-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#2C5F7F]" />
                    <span>ISO 8501 & SSPC surface preparation standards explained</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#2C5F7F]" />
                    <span>Quality control and inspection procedures</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#2C5F7F]" />
                    <span>Application guidelines for bridges and structural steel</span>
                  </li>
                </ul>
                <a
                  href="/steel-preparation-standards-guide.pdf"
                  download
                  className="inline-flex items-center gap-2 bg-[#2C5F7F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1e4159] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Free PDF Guide
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2C5F7F] to-[#1e4159] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Start Your Construction Project?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get a free quote for your structural steelwork, bridge infrastructure, or architectural metalwork project. Fast turnaround, certified quality, competitive pricing.
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
              <p className="text-white/70 text-sm">Professional shot blasting services for construction and industrial applications across the UK.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Construction Services</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link href="/services/structural-steel-frames"><a className="hover:text-white">Structural Steel Frames</a></Link></li>
                <li><Link href="/services/bridge-steelwork"><a className="hover:text-white">Bridge Steelwork</a></Link></li>
                <li><Link href="/services/fire-escapes"><a className="hover:text-white">Fire Escapes</a></Link></li>
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