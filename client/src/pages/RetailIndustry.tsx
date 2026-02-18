import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, CheckCircle, ArrowRight, ShoppingCart, Store, Sparkles, RefreshCw, Clock, Shield, TrendingUp, Palette } from "lucide-react";
import { useState } from "react";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BackToTop } from "@/components/BackToTop";

export default function RetailIndustry() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  const retailServices = [
    {
      title: "Shopping Trolleys & Baskets",
      description: "Professional shot blasting and refurbishment of shopping trolleys, baskets, and carts. Remove rust, old paint, and damage to restore equipment to like-new condition at a fraction of replacement cost.",
      image: "/service-warehouse-racking.webp",
      link: "/services/warehouse-racking",
      benefits: ["70% cost saving vs replacement", "Powder coating ready", "Brand colour matching"]
    },
    {
      title: "Shop Fittings & Display Units",
      description: "Comprehensive surface preparation for metal shop fittings, display stands, gondolas, and retail shelving systems. Extend equipment life and maintain professional store appearance.",
      image: "/service-warehouse-racking.webp",
      link: "/services/warehouse-racking",
      benefits: ["Preserves structural integrity", "Custom finishes available", "Quick turnaround"]
    },
    {
      title: "Warehouse Racking & Storage",
      description: "Shot blasting for retail warehouse and stockroom racking systems. Remove corrosion and prepare surfaces for protective coatings to ensure safety compliance and longevity.",
      image: "/service-warehouse-racking.webp",
      link: "/services/warehouse-racking",
      benefits: ["Safety certified", "SEMA compliance support", "Minimal disruption"]
    },
    {
      title: "Security Fixtures & Barriers",
      description: "Surface preparation for security bollards, barriers, crowd control equipment, and safety fixtures. Maintain both functionality and appearance of essential retail security infrastructure.",
      image: "/service-structural-steel.webp",
      link: "/services/structural-steel-frames",
      benefits: ["Corrosion protection", "High-visibility finishes", "Durable coatings"]
    }
  ];

  const challenges = [
    {
      icon: TrendingUp,
      title: "Budget Constraints",
      description: "Retail margins are tight. Our refurbishment services restore equipment at 60-70% less than replacement costs, helping you maintain quality while controlling expenses."
    },
    {
      icon: Sparkles,
      title: "Brand Image Standards",
      description: "Customer-facing equipment must look pristine. We deliver showroom-quality finishes with exact brand colour matching to maintain your store's professional appearance."
    },
    {
      icon: Clock,
      title: "Operational Continuity",
      description: "Retail never stops. We offer flexible scheduling including overnight and weekend work to minimise disruption to your trading hours and customer experience."
    },
    {
      icon: Shield,
      title: "Health & Safety Compliance",
      description: "Retail equipment must meet strict safety standards. Our processes ensure full compliance with HSE regulations and industry standards for customer-facing environments."
    }
  ];

  const caseStudy = {
    title: "National Supermarket Chain - Trolley Fleet Refurbishment",
    client: "Major UK Supermarket Retailer",
    challenge: "A national supermarket chain needed to refurbish 2,500 shopping trolleys across 15 stores. The trolleys showed significant rust, damaged powder coating, and worn components. Replacing the entire fleet would cost over £500,000 and take months to coordinate.",
    solution: "We implemented a rolling refurbishment programme, collecting trolleys store-by-store to maintain operational capacity. Each trolley was shot blasted to remove all rust and old coatings, then powder coated in the retailer's brand colours. Worn wheels and handles were replaced during the process.",
    result: "The complete fleet was refurbished within 12 weeks at 65% less than replacement cost. Customer feedback improved significantly, with stores reporting trolleys looked 'better than new'. The retailer has now committed to annual refurbishment cycles rather than replacement.",
    stats: [
      { label: "Trolleys Refurbished", value: "2,500" },
      { label: "Cost Saving", value: "65%" },
      { label: "Project Duration", value: "12 weeks" },
      { label: "Store Disruption", value: "Zero" }
    ]
  };

  const benefits = [
    "Significant cost savings compared to equipment replacement",
    "Exact brand colour matching for consistent store appearance",
    "Extended equipment lifespan of 5-10 additional years",
    "Improved customer perception and shopping experience",
    "Full compliance with retail health and safety standards",
    "Flexible scheduling to avoid trading hour disruption",
    "Environmentally responsible alternative to disposal",
    "Comprehensive warranty on all refurbishment work"
  ];

  const regulations = [
    {
      title: "Health & Safety at Work Act 1974",
      description: "Ensures all retail equipment is maintained in safe condition for both staff and customers."
    },
    {
      title: "SEMA Guidelines",
      description: "Storage Equipment Manufacturers' Association standards for racking safety and maintenance."
    },
    {
      title: "PUWER Regulations",
      description: "Provision and Use of Work Equipment Regulations ensuring equipment fitness for purpose."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/#industries" },
          { label: "Retail", href: "/industries/retail", isCurrentPage: true }
        ]}
        className="container mt-4"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1e4159] text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600')] bg-cover bg-center opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Store className="w-8 h-8" />
              <span className="text-sm font-medium uppercase tracking-wider">Retail Industry</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Solutions for Retail Environments
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Professional refurbishment and surface preparation for shopping trolleys, shop fittings, display units, and retail infrastructure. Maintain brand standards, reduce costs, and extend equipment life across your retail estate.
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
            <p className="text-[#2C5F7F] font-medium mb-2">Understanding Your Business</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Retail Industry Challenges
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We understand the unique pressures facing retail businesses. Our services are designed to address these specific challenges while maintaining your brand standards.
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
              Retail Shot Blasting Solutions
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Comprehensive surface preparation and refurbishment services tailored for the retail sector, from customer-facing equipment to back-of-house infrastructure.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {retailServices.map((service, index) => (
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

      {/* Benefits Section */}
      <section className="py-20 bg-[#2C5F7F] text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-white/80 font-medium mb-2">Why Choose Us</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Benefits for Retail Businesses
              </h2>
              <p className="text-white/90 mb-8 leading-relaxed">
                Our specialist retail refurbishment services help you maintain brand standards, reduce capital expenditure, and extend the life of your equipment across your entire retail estate.
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
                Relevant Standards & Regulations
              </h3>
              <div className="space-y-4">
                {regulations.map((reg, index) => (
                  <div key={index} className="border-b border-white/20 pb-4 last:border-0">
                    <h4 className="font-semibold mb-1">{reg.title}</h4>
                    <p className="text-white/70 text-sm">{reg.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Success Story</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Retail Project Case Study
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
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to Refresh Your Retail Equipment?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Contact us today for a free consultation and discover how our shot blasting services can help maintain your brand standards while reducing equipment costs across your retail estate.
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
