import { Link } from "wouter";
import { Phone, MapPin, CheckCircle, ArrowRight, Award, Zap, Building2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { ReviewSchema } from "@/components/ReviewSchema";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Footer } from "@/components/Footer";
import { ServiceRadiusMap } from "@/components/ServiceRadiusMap";
import { trackPhoneCall } from "@/lib/analytics";
import { FAQSchema, generateLocationFAQs } from "@/components/FAQSchema";

export interface LocationData {
  name: string;
  slug: string;
  county: string;
  countySlug: string;
  region: string;
  description: string;
  industries?: string[];
  nearbyAreas?: string[];
  faqs: { question: string; answer: string; }[];
}

interface LocationPageProps {
  location: LocationData;
}

export function LocationPage({ location }: LocationPageProps) {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useEffect(() => {
    document.title = `Shot Blasting ${location.name} | Commercial & Industrial Services`;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', location.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = location.description;
      document.head.appendChild(meta);
    }

    // Set keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const keywords = `shot blasting ${location.name}, rust removal ${location.name}, surface preparation ${location.name}, industrial blasting ${location.county}`;
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = keywords;
      document.head.appendChild(meta);
    }

    // Set Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const titleContent = `Shot Blasting ${location.name} | Commercial & Industrial Services`;
    if (ogTitle) {
      ogTitle.setAttribute('content', titleContent);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.content = titleContent;
      document.head.appendChild(meta);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', location.description);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.content = location.description;
      document.head.appendChild(meta);
    }
  }, [location]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Service Areas", href: "/service-areas" },
    { label: location.county, href: `/counties/${location.countySlug}` },
    { label: location.name, href: `/locations/${location.slug}` }
  ];

  return (
    <>
      <LocalBusinessSchema 
        name="Commercial Shot Blasting"
        city={location.name}
        region={location.county}
        description={location.description}
        url={`https://commercialshotblasting.co.uk/locations/${location.slug}`}
        nearbyAreas={location.nearbyAreas}
      />
      <ReviewSchema locationName={location.name} county={location.county} />
      <FAQSchema faqs={generateLocationFAQs(location.name, location.county)} locationName={location.name} />
      
      <Header />
      
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3a4d] text-white py-20">
        <HeroCarousel>
          <div className="absolute inset-0 bg-gradient-to-br from-[#2C5F7F]/90 to-[#1a3a4d]/90 z-10" />
        </HeroCarousel>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <p className="text-blue-200 font-medium mb-4">Professional Surface Preparation</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services in {location.name}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Expert mobile shot blasting services throughout {location.name} and {location.county}. Professional rust removal and surface preparation for commercial and industrial clients.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-white text-[#2C5F7F] hover:bg-gray-100"
                onClick={() => setQuotePopupOpen(true)}
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => { trackPhoneCall('07970566409', 'Location Page'); window.location.href = 'tel:07970566409'; }}
              >
                <Phone className="w-5 h-5 mr-2" />
                07970 566409
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#2C5F7F] font-medium mb-2">Local Experts</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Serving {location.name} with Professional Shot Blasting
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                We provide comprehensive mobile shot blasting services throughout {location.name} and the wider <a href={`/counties/${location.countySlug}`} className="text-[#2C5F7F] hover:underline font-medium">{location.county}</a> area. Our fully equipped mobile units bring professional surface preparation directly to your site, eliminating the need for costly transportation of materials or equipment.
              </p>
              <p>
                {location.industries && location.industries.length > 0 ? (
                  <>Supporting {location.name}'s {location.industries.join(', ')} sectors, we deliver expert rust removal, paint stripping, and surface preparation services. Our team understands the unique requirements of local businesses and provides tailored solutions for every project.</>
                ) : (
                  <>Our experienced team serves businesses and industrial facilities across {location.name}, providing expert rust removal, paint stripping, and surface preparation services. We understand the unique requirements of local projects and deliver tailored solutions for every application.</>
                )}
              </p>
              <p>
                From small fabrications to large industrial equipment, our mobile shot blasting service in {location.name} ensures consistent, high-quality results. We work efficiently to minimize disruption to your operations while delivering the superior surface finish your project demands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Your Local Choice</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Choose Us in {location.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional shot blasting services delivered with expertise and reliability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Mobile Service</h3>
              <p className="text-gray-600">
                We bring our fully equipped mobile units directly to your location in {location.name}, saving you time and transportation costs.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Expert Team</h3>
              <p className="text-gray-600">
                Our experienced operators deliver consistent, high-quality results on every project across {location.county}.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Commercial Focus</h3>
              <p className="text-gray-600">
                Specializing in commercial and industrial applications, we understand the demands of business operations in {location.name}.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Fast Response</h3>
              <p className="text-gray-600">
                Quick response times and flexible scheduling to meet your project deadlines in {location.name} and surrounding areas.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Local Knowledge</h3>
              <p className="text-gray-600">
                Familiar with {location.name} and the {location.region}, we provide reliable service you can count on.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Free Quotes</h3>
              <p className="text-gray-600">
                No-obligation quotations for all projects in {location.name}. Call us today to discuss your requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services in {location.name}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Rust Removal & Surface Preparation",
              "Paint & Coating Stripping",
              "Metal Surface Cleaning",
              "Concrete Floor Preparation",
              "Industrial Equipment Blasting",
              "Vehicle & Machinery Restoration"
            ].map((service, index) => (
              <div key={index} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-[#2C5F7F] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">{service}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/services">
              <Button variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                View All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Nearby Areas Section */}
      {location.nearbyAreas && location.nearbyAreas.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                We Also Serve Areas Near {location.name}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our mobile shot blasting service covers {location.name} and surrounding areas throughout {location.county}.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-2 justify-center">
                {location.nearbyAreas.map((area, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-full text-sm text-gray-700 border border-gray-200"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Location Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#2C5F7F] font-medium mb-2">Find Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our Service Area in {location.name}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide mobile shot blasting services throughout {location.name} and the surrounding areas in {location.county}.
              </p>
            </div>
            <ServiceRadiusMap locationName={location.name} county={location.county} radiusMiles={30} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#2C5F7F] font-medium mb-2">Common Questions</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                FAQs About Shot Blasting in {location.name}
              </h2>
            </div>

            <div className="space-y-6">
              {location.faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#2C2C2C] mb-3">
                    <span className="text-[#2C5F7F]">Q:</span> {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#2C5F7F] to-[#1a3a4d] text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to Start Your Project in {location.name}?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get a free, no-obligation quote for your shot blasting project. Call us today or request a quote online.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-[#2C5F7F] hover:bg-gray-100"
                onClick={() => setQuotePopupOpen(true)}
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => { trackPhoneCall('07970566409', 'Location Page'); window.location.href = 'tel:07970566409'; }}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 07970 566409
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <QuotePopup 
        open={quotePopupOpen} 
        onOpenChange={setQuotePopupOpen}
        locationName={location.name}
      />
    </>
  );
}
