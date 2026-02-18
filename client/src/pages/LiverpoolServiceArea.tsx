import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Star, Award, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { HeroCarousel } from "@/components/HeroCarousel";
import { LocationMap } from "@/components/LocationMap";
import { NearbyTowns } from "@/components/NearbyTowns";
import { nearbyTownsData } from "@/data/nearbyTowns";
import { locationData } from "@/data/locationData";

export default function LiverpoolServiceArea() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useEffect(() => {
    document.title = "Shot Blasting Liverpool | Commercial & Industrial";
    
    // Set keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'shot blasting Liverpool, rust removal, surface preparation, industrial blasting, Merseyside');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'shot blasting Liverpool, rust removal, surface preparation, industrial blasting, Merseyside';
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    const locationInfo = locationData["liverpool"];
    const description = locationInfo?.description || "Professional shot blasting services. Expert surface preparation & rust removal. Call 07970 566409";
    
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
      ogTitle.setAttribute('content', 'Shot Blasting Liverpool');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.setAttribute('content', 'Shot Blasting Liverpool');
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

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', "https://commercialshotblasting.co.uk");
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:url');
      meta.setAttribute('content', "https://commercialshotblasting.co.uk");
      document.head.appendChild(meta);
    }

    // Set Twitter Card meta tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'Shot Blasting Liverpool');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'twitter:title';
      meta.content = 'Shot Blasting Liverpool';
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
            { label: "North West", href: "/service-areas#north-west" },
            { label: "Liverpool", href: "/service-areas/liverpool", isCurrentPage: true }
          ]} />
        </div>
      </section>

      {/* Hero Section */}
      <HeroCarousel className="py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="text-[#F5F1E8] font-medium mb-2">Professional Shot Blasting Services</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Shot Blasting Services in Liverpool
          </h1>
          <p className="text-lg text-white/90 mb-8">
            Commercial Shot Blasting provides professional surface preparation and rust removal services throughout Liverpool and the North West. Serving local manufacturers, maritime facilities, and industrial businesses with precision blasting solutions.
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

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-[#F5F1E8]">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Choose Commercial Shot Blasting in Liverpool?
            </h2>
            <p className="text-gray-700 text-lg">
              With extensive experience serving Liverpool's maritime, manufacturing, and industrial sectors, we understand the unique surface preparation challenges faced by North West businesses. Our team delivers precision blasting solutions tailored to your specific requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8 text-[#2C5F7F]" />,
                title: "Industry Expertise",
                description: "Specialized experience with maritime, manufacturing, and industrial sectors across the North West"
              },
              {
                icon: <Zap className="w-8 h-8 text-[#2C5F7F]" />,
                title: "Advanced Equipment",
                description: "State-of-the-art blasting technology for consistent, high-quality results on all surface types"
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-[#2C5F7F]" />,
                title: "Quality Assurance",
                description: "Rigorous quality control and processes to meet industry standards and client specifications"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services in Liverpool */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Services in Liverpool
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "Steel Shot Blasting",
                description: "High-efficiency surface cleaning and preparation for steel structures, machinery, and components"
              },
              {
                title: "Stainless Steel Blasting",
                description: "Specialized blasting for stainless steel surfaces without cross-contamination"
              },
              {
                title: "Aluminium Blasting",
                description: "Precision blasting for aluminium components and structures with minimal material loss"
              },
              {
                title: "Paint Removal",
                description: "Efficient removal of old coatings and paint from industrial equipment and structures"
              },
              {
                title: "Rust Removal",
                description: "Complete rust elimination and surface preparation for recoating and restoration"
              },
              {
                title: "Custom Solutions",
                description: "Tailored blasting solutions for unique industrial challenges and specifications"
              }
            ].map((service, index) => (
              <div key={index} className="flex gap-4">
                <ArrowRight className="w-6 h-6 text-[#2C5F7F] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Industries We Serve in Liverpool
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Maritime & Shipping",
              "Manufacturing",
              "Heavy Equipment",
              "Machinery & Components",
              "Structural Steel",
              "Aerospace & Aviation",
              "Automotive",
              "Construction Equipment",
              "Port & Dock Facilities"
            ].map((industry, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 flex items-center gap-3">
                <Star className="w-5 h-5 text-[#2C5F7F]" />
                <span className="font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            What Liverpool Businesses Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Michael Roberts",
                company: "Liverpool Maritime Services",
                text: "Exceptional service for our maritime equipment. They understand the corrosion challenges we face and deliver outstanding results."
              },
              {
                name: "Emma Wilson",
                company: "North West Manufacturing Co.",
                text: "Reliable, professional, and efficient. They've been our trusted partner for surface preparation for many years."
              },
              {
                name: "James Patterson",
                company: "Liverpool Engineering Ltd",
                text: "Outstanding quality and customer service. They consistently meet our strict specifications and deadlines."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-[#F5F1E8] p-8 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#2C5F7F] text-[#2C5F7F]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Preparation & Cleanup Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-primary mb-2">Our Process</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Comprehensive Site Preparation & Cleanup
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Shot blasting excellence is built on preparation and finished with cleanup. We follow a rigorous four-stage process for site protection, containment systems, and complete restoration – delivering consistent results and leaving Liverpool sites ready for the next work phase.
              </p>
              <p className="text-gray-600 mb-8">
                From isolating work zones and protecting delicate fixtures to thorough post-blast cleanup and waste disposal, we follow a fixed four-stage process that delivers predictable results and leaves your site ready for the next phase of work.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Containment & Protection</h3>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Surface Preparation</h3>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Protection of Delicate Areas</h3>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Post-Blast Clean-Down</h3>
                  </div>
                </div>
              </div>
              <Link href="/preparation-cleanup">
                <Button variant="default" size="lg">
                  Learn More About Our Process
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img loading="lazy"
                  src="/cleanwarehouse.webp"
                  alt="Clean warehouse after shot blasting"
                  className="w-full h-auto"
                />
                <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg">
                  <div className="text-3xl font-bold text-primary">4</div>
                  <div className="text-sm text-gray-600">Stage Process</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "How quickly can you complete a shot blasting project in Liverpool?",
                a: "Project timelines vary based on scope and complexity. Most projects are completed within 1-3 weeks. We'll provide a detailed timeline during the initial consultation."
              },
              {
                q: "Do you offer emergency or rush blasting services?",
                a: "Yes, we can accommodate urgent requests. Contact us directly at 07970 566409 to discuss your timeline requirements."
              },
              {
                q: "What makes your Liverpool service different?",
                a: "Our team has deep expertise in the North West's maritime and manufacturing sectors, allowing us to understand and meet the specific needs of local businesses efficiently."
              },
              {
                q: "Can you handle large-scale industrial projects?",
                a: "Absolutely. We have the equipment and expertise to handle projects of any size, from small components to large structural elements."
              },
              {
                q: "Do you provide waste management documentation?",
                a: "Yes, we maintain full compliance with waste management practices and provide all necessary documentation for your records."
              },
              {
                q: "How do I get started with a quote?",
                a: "Simply click 'Get a Free Quote' above or call us at 07970 566409. We'll arrange a site visit to assess your requirements."
              }
            ].map((faq, index) => (
              <details key={index} className="bg-white p-6 rounded-lg border border-gray-200 cursor-pointer group">
                <summary className="font-bold flex items-center justify-between">
                  {faq.q}
                  <ArrowRight className="w-5 h-5 text-[#2C5F7F] group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-gray-600 mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      {/* Service Area Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F7F] mb-4">
              Our Shot Blasting Services in Liverpool
            </h2>
            <p className="text-lg text-gray-600">
              We provide professional shot blasting services throughout Liverpool and the surrounding region. The map shows our primary service area with a 25-mile radius.
            </p>
          </div>
          <LocationMap locationName="Liverpool" />
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#2C5F7F] to-[#1a3d52] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Transform Your Surfaces?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Contact Commercial Shot Blasting today for professional surface preparation services in Liverpool. Our team is ready to deliver exceptional results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-[#F5F1E8]" onClick={() => setQuotePopupOpen(true)}>
              Get a Free Quote
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Phone className="w-4 h-4 mr-2" />
              Call: 07970 566409
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Phone className="w-8 h-8 text-[#2C5F7F] mx-auto mb-3" />
              <h3 className="font-bold mb-2">Call Us</h3>
              <a href="tel:07970566409" className="text-[#2C5F7F] hover:underline">07970 566409</a>
            </div>
            <div>
              <Mail className="w-8 h-8 text-[#2C5F7F] mx-auto mb-3" />
              <h3 className="font-bold mb-2">Email Us</h3>
              <a href="mailto:info@commercialshotblasting.co.uk" className="text-[#2C5F7F] hover:underline">info@commercialshotblasting.co.uk</a>
            </div>
            <div>
              <MapPin className="w-8 h-8 text-[#2C5F7F] mx-auto mb-3" />
              <h3 className="font-bold mb-2">Service Area</h3>
              <p className="text-gray-600">Liverpool & North West Region</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Towns Section */}
      <NearbyTowns 
        locationName={nearbyTownsData["liverpool"].location}
        towns={nearbyTownsData["liverpool"].towns}
      />

    </div>
  );
}
