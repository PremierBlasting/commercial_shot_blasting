import { Link } from "wouter";
import { locationData } from "@/data/locationData";
import { Phone, MapPin, CheckCircle, ArrowRight, Award, Zap, Building2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { HeroCarousel } from "@/components/HeroCarousel";
import { trackPhoneCall } from "@/lib/analytics";

import { Footer } from "@/components/Footer";
import { CountyData } from "@/data/countyData";
import { CountyMap } from "@/components/CountyMap";

interface CountyPageProps {
  county: CountyData;
}

export function CountyPage({ county }: CountyPageProps) {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useEffect(() => {
    document.title = `Shot Blasting ${county.name} | Commercial & Industrial Services`;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', county.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = county.description;
      document.head.appendChild(meta);
    }

    // Set keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const keywords = `shot blasting ${county.name}, rust removal ${county.name}, surface preparation ${county.name}, industrial blasting ${county.region}`;
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
    const titleContent = `Shot Blasting ${county.name} | Commercial & Industrial Services`;
    if (ogTitle) {
      ogTitle.setAttribute('content', titleContent);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.setAttribute('content', titleContent);
      document.head.appendChild(meta);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', county.description);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.setAttribute('content', county.description);
      document.head.appendChild(meta);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', county.url);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:url');
      meta.setAttribute('content', county.url);
      document.head.appendChild(meta);
    }
  }, [county]);

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
      <LocalBusinessSchema
        name={`Commercial Shot Blasting - ${county.name}`}
        city={county.majorTowns[0]}
        region={county.region}
        description={county.description}
        url={county.url}
        latitude={county.latitude.toString()}
        longitude={county.longitude.toString()}
      />

      {/* Breadcrumb Navigation */}
      <section className="py-4 bg-gray-50 border-b border-gray-200">
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Service Areas", href: "/service-areas" },
            { label: county.region, href: `/service-areas#${county.region.toLowerCase().replace(/\s+/g, '-')}` },
            { label: county.name, href: `/counties/${county.slug}`, isCurrentPage: true }
          ]} />
        </div>
      </section>

      {/* Hero Section */}
      <HeroCarousel className="py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="text-[#F5F1E8] font-medium mb-2">Professional Shot Blasting Services</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Shot Blasting Services in {county.name}
          </h1>
          <p className="text-lg text-white/90 mb-8">
            Commercial Shot Blasting provides professional surface preparation and rust removal services throughout {county.name}. Serving local businesses across {county.majorTowns.join(', ')} with precision blasting solutions for commercial and industrial applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-[#F5F1E8]" onClick={() => setQuotePopupOpen(true)}>
              Get a Free Quote
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="tel:07970566409" className="flex items-center gap-2" onClick={() => trackPhoneCall('07970566409', 'County Page')}>
                <Phone className="w-4 h-4" />
                Call Now: 07970 566409
              </a>
            </Button>
          </div>
        </div>
      </HeroCarousel>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services in {county.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide professional shot blasting services for businesses across {county.name}, specializing in surface preparation for a wide range of industrial and commercial applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Structural Steel Frames",
                description: "Comprehensive shot blasting for building frames, trusses, and structural steelwork",
                icon: Building2
              },
              {
                title: "Industrial Equipment",
                description: "Professional surface preparation for machinery, plant equipment, and industrial assets",
                icon: Award
              },
              {
                title: "Factory Cladding",
                description: "Specialist restoration removing plastisol and paint layers from warehouse and factory cladding",
                icon: Zap
              },
              {
                title: "Fire Escapes & Staircases",
                description: "Precision blasting for fire safety infrastructure and architectural metalwork",
                icon: CheckCircle
              },
              {
                title: "Warehouse Racking",
                description: "Professional shot blasting for warehouse racking systems and pallet rack frames",
                icon: Building2
              },
              {
                title: "Commercial Vehicles",
                description: "Heavy-duty restoration for farm equipment, warehouse vehicles, and commercial fleets",
                icon: Award
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <service.icon className="w-12 h-12 text-[#2C5F7F] mb-4" />
                <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link href="/services">
                  <a className="text-[#2C5F7F] hover:text-[#1a3d52] font-medium inline-flex items-center gap-2">
                    View All Services
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Industries We Serve</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {county.name} Industrial Blasting Experts
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We work with businesses across diverse industries throughout {county.name}, providing tailored shot blasting solutions for each sector's unique requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {county.industries.map((industry, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-[#2C5F7F]" />
                </div>
                <h3 className="text-lg font-bold text-[#2C2C2C]">{industry}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Towns Served */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Service Coverage</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Commercial Shot Blasting Coverage Across {county.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide mobile shot blasting services throughout {county.name}, including:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {county.majorTowns.map((town, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
                <MapPin className="w-5 h-5 text-[#2C5F7F] flex-shrink-0" />
                <span className="font-medium text-[#2C2C2C]">{town}</span>
              </div>
            ))}
          </div>

          {/* Towns and Villages Section */}
          <div className="mt-12" data-section="towns-villages">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#2C2C2C] mb-3">
                Towns & Villages We Serve in {county.name}
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our mobile shot blasting service covers all major towns and villages across {county.name}. If your location isn't listed, contact us - we likely serve your area.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {county.townsAndVillages.map((place, index) => {
                  // Create slug from place name
                  const slug = place.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
                  const locationExists = locationData[slug];
                  
                  if (locationExists) {
                    return (
                      <Link key={index} href={`/locations/${slug}`}>
                        <span className="inline-flex items-center px-3 py-1.5 bg-white rounded-full text-sm text-gray-700 border border-gray-200 hover:border-[#2C5F7F] hover:text-[#2C5F7F] cursor-pointer transition-colors">
                          {place}
                        </span>
                      </Link>
                    );
                  }
                  
                  return (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
                    >
                      {place}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/service-areas">
              <Button variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                View All Service Areas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-Linking Section - Explore Nearby Locations */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Explore Nearby Areas</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services in {county.name} Towns & Cities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Click on any location below to view detailed information about our shot blasting services in that specific area, including local FAQs, service coverage, and contact details.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {county.townsAndVillages.slice(0, 12).map((place, index) => {
              const slug = place.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
              const locationExists = locationData[slug];
              
              if (locationExists) {
                return (
                  <Link key={index} href={`/locations/${slug}`}>
                    <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-[#2C5F7F] hover:shadow-lg transition-all cursor-pointer group">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-[#2C2C2C] group-hover:text-[#2C5F7F] transition-colors">
                          {place}
                        </h3>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#2C5F7F] group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-sm text-gray-600">
                        Shot Blasting in {place}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-[#2C5F7F] font-medium">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>View service details</span>
                      </div>
                    </div>
                  </Link>
                );
              }
              return null;
            }).filter(Boolean)}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">
              Looking for a specific location? View our complete coverage across {county.name}
            </p>
            <Button 
              variant="outline" 
              className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white"
              onClick={() => {
                const townsSection = document.querySelector('[data-section="towns-villages"]');
                if (townsSection) {
                  townsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
            >
              View All {county.townsAndVillages.length} Locations
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Interactive Coverage Map</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Service Locations in {county.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our coverage across {county.name}. Red markers show major towns, blue markers indicate villages and smaller areas we serve.
            </p>
          </div>

          <CountyMap
            countyName={county.name}
            latitude={county.latitude}
            longitude={county.longitude}
            majorTowns={county.majorTowns}
            townsAndVillages={county.townsAndVillages}
          />
        </div>
      </section>

      {/* Mobile Service Coverage */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Mobile Service Throughout {county.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              We provide mobile shot blasting services throughout {county.name} and surrounding areas. Our fully equipped mobile units can reach any location in the region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:07970566409" className="inline-flex items-center gap-2 text-[#2C5F7F] hover:text-[#1a3d52] font-semibold" onClick={() => trackPhoneCall('07970566409', 'County Page CTA')}>
                <Phone className="w-5 h-5" />
                07970 566409
              </a>
              <Button onClick={() => setQuotePopupOpen(true)} className="bg-[#E8B84A] hover:bg-[#d4a63d] text-[#1a3d52]">
                Get a Free Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Your Trusted Shot Blasting Partner
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2C5F7F] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Expert Team</h3>
              <p className="text-gray-600">
                Highly trained professionals with years of experience in commercial and industrial shot blasting
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2C5F7F] rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Mobile Service</h3>
              <p className="text-gray-600">
                We come to your location across {county.name}, minimizing downtime and transportation costs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2C5F7F] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Quality Results</h3>
              <p className="text-gray-600">
                Flawless surface preparation ready for coating, ensuring long-lasting protection and finish
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Frequently Asked Questions</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting in {county.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Common questions about our shot blasting services in {county.name}
            </p>
          </div>

          <div className="space-y-6">
            {county.faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-[#2C2C2C] mb-3 flex items-start gap-3">
                  <span className="text-[#E8B84A] text-xl flex-shrink-0">Q:</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-gray-600 ml-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:07970566409" className="inline-flex items-center gap-2 text-[#2C5F7F] hover:text-[#1a3d52] font-semibold" onClick={() => trackPhoneCall('07970566409', 'County Page CTA')}>
                <Phone className="w-5 h-5" />
                Call us: 07970 566409
              </a>
              <Button onClick={() => setQuotePopupOpen(true)} className="bg-[#E8B84A] hover:bg-[#d4a63d] text-[#1a3d52]">
                Get a Free Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Get a free, no-obligation quote for shot blasting services in {county.name}. Contact us today to discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-[#F5F1E8]" onClick={() => setQuotePopupOpen(true)}>
              Get a Free Quote
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="tel:07970566409" className="flex items-center gap-2" onClick={() => trackPhoneCall('07970566409', 'County Page')}>
                <Phone className="w-4 h-4" />
                Call: 07970 566409
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
