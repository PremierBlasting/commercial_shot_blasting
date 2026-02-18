import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Star, Award, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { TrackedPhoneButton } from "@/components/TrackedPhoneButton";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Footer } from "@/components/Footer";
import { locationData } from "@/data/locationData";

export default function WellingboroughServiceArea() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = 'Shot Blasting Wellingborough | Commercial & Industrial';
    
    // Set keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'shot blasting Wellingborough, rust removal, surface preparation, industrial blasting, Northamptonshire');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'shot blasting Wellingborough, rust removal, surface preparation, industrial blasting, Northamptonshire';
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    const description = locationData["wellingborough"]?.description || "Professional shot blasting services in Wellingborough. Call 07970 566409";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Set Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Shot Blasting Wellingborough | Commercial & Industrial');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.setAttribute('content', 'Shot Blasting Wellingborough | Commercial & Industrial');
      document.head.appendChild(meta);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.setAttribute('content', description);
      document.head.appendChild(meta);
    }

    // Set Twitter Card meta tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'Shot Blasting Wellingborough | Commercial & Industrial');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'twitter:title';
      meta.content = 'Shot Blasting Wellingborough | Commercial & Industrial';
      document.head.appendChild(meta);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'twitter:description';
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
      

      {/* Breadcrumb Navigation */}
      <section className="py-4 bg-gray-50 border-b border-gray-200">
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Service Areas", href: "/service-areas" },
            { label: "Wellingborough", href: "/service-areas/wellingborough", isCurrentPage: true }
          ]} />
        </div>
      </section>

      {/* Hero Section */}
      <HeroCarousel className="py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="text-[#F5F1E8] font-medium mb-2">Professional Shot Blasting Services</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Shot Blasting Services in Wellingborough
          </h1>
          <p className="text-lg text-white/90 mb-8">
            Commercial Shot Blasting provides professional surface preparation and rust removal services throughout Wellingborough and Northamptonshire. Serving local manufacturers, industrial facilities, and commercial projects with precision blasting solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-[#F5F1E8]" onClick={() => setQuotePopupOpen(true)}>
              Get a Free Quote
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="tel:07970566409" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call Now: 07970 566409
              </a>
            </Button>
          </div>
        </div>
      </HeroCarousel>

      {/* About Section */}
      <section className="py-16 bg-[#F5F1E8]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Local Shot Blasting Experts in Wellingborough
              </h2>
              <p className="text-gray-700 mb-4">
                Commercial Shot Blasting has been serving Wellingborough businesses, providing professional surface preparation services to the region's leading manufacturers, industrial facilities, and commercial projects.
              </p>
              <p className="text-gray-700 mb-6">
                Wellingborough's diverse industrial sector relies on our expertise for precision surface preparation. Whether you need rust removal, paint stripping, or concrete surface profiling, we have the equipment and experience to deliver exceptional results.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2C5F7F] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Same-day quotes for Wellingborough area projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2C5F7F] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Flexible scheduling to minimize business disruption</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2C5F7F] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Professional safety practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2C5F7F] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Competitive pricing for Wellingborough businesses</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img loading="lazy"
                src="/images/premier/steel-container-after.webp"
                alt="Professional shot blasting results in Wellingborough"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute bottom-0 right-0 bg-[#2C5F7F] text-white p-6 rounded-lg shadow-lg max-w-xs">
                <p className="font-semibold mb-2">Serving Northamptonshire</p>
                <p className="text-3xl font-bold">Since 2015</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Services Available in Wellingborough
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide a complete range of shot blasting and surface preparation services tailored to Wellingborough's diverse industries.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Steel Shot Blasting",
                description: "Precision cleaning for steel structures, removing rust, mill scale, and old coatings from industrial equipment and components.",
                icon: Zap
              },
              {
                title: "Rust Removal & Prevention",
                description: `Complete rust removal solutions for automotive, manufacturing, and infrastructure projects across Wellingborough.`,
                icon: Award
              },
              {
                title: "Surface Preparation",
                description: "Professional surface profiling for coating adhesion, ensuring optimal results for painting and protective treatments.",
                icon: Star
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                <service.icon className="w-12 h-12 text-[#2C5F7F] mb-4" />
                <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 bg-[#2C5F7F]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Industries We Serve in Wellingborough
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Our shot blasting services support a wide range of industries throughout Wellingborough and Northamptonshire.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Manufacturing & Engineering",
              "Automotive & Transport",
              "Construction & Infrastructure",
              "Marine & Offshore",
              "Agriculture & Farming",
              "Heritage & Restoration"
            ].map((industry, index) => (
              <div key={index} className="bg-white/10 backdrop-blur p-6 rounded-lg">
                <CheckCircle className="w-8 h-8 text-[#F5F1E8] mb-3" />
                <h3 className="text-lg font-semibold text-white">{industry}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              See Our Results
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              View the dramatic transformation our shot blasting services can achieve for your Wellingborough project.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <BeforeAfterSlider
              beforeImage="/images/premier/steel-container-before.webp"
              afterImage="/images/premier/steel-container-after.webp"
              beforeLabel="Before"
              afterLabel="After"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#2C5F7F]">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Get Started in Wellingborough?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Contact us today for a free quote on your shot blasting project. We serve all of Wellingborough and the surrounding Northamptonshire area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-[#F5F1E8]" onClick={() => setQuotePopupOpen(true)}>
              Get a Free Quote
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="tel:07970566409" className="flex items-center gap-2">
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
