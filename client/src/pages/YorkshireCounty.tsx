import { Link } from "wouter";
import { Phone, MapPin, ArrowRight, Building2 } from "lucide-react";
import { useState, useEffect } from "react";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";

const towns = [
    { name: "Sheffield", slug: "sheffield" },
    { name: "Leeds", slug: "leeds" },
    { name: "Barnsley", slug: "barnsley" },
    { name: "Doncaster", slug: "doncaster" },
    { name: "Rotherham", slug: "rotherham" },
    { name: "Halifax", slug: "halifax" },
    { name: "Huddersfield", slug: "huddersfield" }
];

export default function YorkshireCounty() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useEffect(() => {
    document.title = "Shot Blasting Yorkshire | Service Areas";
    
    // Set keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'shot blasting Yorkshire, mobile shot blasting, rust removal, surface preparation, Yorkshire');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'shot blasting Yorkshire, mobile shot blasting, rust removal, surface preparation, Yorkshire';
      document.head.appendChild(meta);
    }

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Expert shot blasting services across Yorkshire. Covering Sheffield, Leeds, Barnsley, Doncaster, Rotherham, Halifax and Huddersfield.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Expert shot blasting services across Yorkshire. Covering Sheffield, Leeds, Barnsley, Doncaster, Rotherham, Halifax and Huddersfield.';
      document.head.appendChild(meta);
    }

    // Set Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Shot Blasting Yorkshire | Service Areas');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Expert shot blasting services across Yorkshire. Covering Sheffield, Leeds, Barnsley, Doncaster, Rotherham, Halifax and Huddersfield.');
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#2d4a6f] to-[#1e3a5f] text-white py-20">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5"></div>
        <div className="container relative">
          <Breadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Service Areas", href: "/service-areas" },
              { label: "Yorkshire", href: "/service-areas/yorkshire" }
            ]}
          />
          <div className="max-w-3xl mt-8">
            <div className="flex items-center gap-2 text-[#7ac5e3] mb-4">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Yorkshire Region</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Shot Blasting Services in Yorkshire
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Expert shot blasting services across Yorkshire. Covering Sheffield, Leeds, Barnsley, Doncaster, Rotherham, Halifax and Huddersfield.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setQuotePopupOpen(true)}
                className="bg-[#7ac5e3] hover:bg-[#5eb5d6] text-[#1e3a5f] font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Get a Free Quote
              </button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <a href="tel:07970566409">
                  <Phone className="w-4 h-4 mr-2" />
                  07970 566409
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Towns Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">
              Our Service Areas in Yorkshire
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide professional shot blasting services across all areas of Yorkshire. 
              Click on a location below to learn more about our services in your area.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {towns.map((town) => (
              <Link 
                key={town.slug}
                href={`/service-areas/${town.slug}`}
                className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-[#7ac5e3]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#7ac5e3]/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-[#1e3a5f]" />
                    </div>
                    <span className="font-medium text-[#1e3a5f] group-hover:text-[#7ac5e3] transition-colors">
                      {town.name}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#7ac5e3] transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1e3a5f] mb-6">
                Professional Shot Blasting Across Yorkshire
              </h2>
              <p className="text-gray-600 mb-6">
                Our mobile shot blasting teams cover the entire Yorkshire region, providing 
                on-site surface preparation services for commercial and industrial clients. 
                Whether you need rust removal, paint stripping, or surface preparation for 
                recoating, we deliver exceptional results.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#7ac5e3]/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#1e3a5f]"></div>
                  </div>
                  <span className="text-gray-700">Mobile shot blasting - we come to you</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#7ac5e3]/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#1e3a5f]"></div>
                  </div>
                  <span className="text-gray-700">Commercial & industrial specialists</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#7ac5e3]/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#1e3a5f]"></div>
                  </div>
                  <span className="text-gray-700">Fast turnaround times</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#7ac5e3]/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#1e3a5f]"></div>
                  </div>
                  <span className="text-gray-700">Competitive pricing</span>
                </li>
              </ul>
              <button
                onClick={() => setQuotePopupOpen(true)}
                className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Request a Quote
              </button>
            </div>
            <div className="relative">
              <img loading="lazy"
                src="/shotblasting-action.jpg" 
                alt="Shot blasting services in Yorkshire"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1e3a5f] text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started in Yorkshire?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Contact us today for a free quote on your shot blasting project. 
            We cover all areas of Yorkshire with our mobile shot blasting service.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setQuotePopupOpen(true)}
              className="bg-[#7ac5e3] hover:bg-[#5eb5d6] text-[#1e3a5f] font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Get a Free Quote
            </button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <a href="tel:07970566409">
                <Phone className="w-4 h-4 mr-2" />
                07970 566409
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
    </div>
  );
}
