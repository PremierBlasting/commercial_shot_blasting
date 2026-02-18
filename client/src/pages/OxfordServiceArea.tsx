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
import { LocationMap } from "@/components/LocationMap";
import { locationCoordinates } from "@/data/locationCoordinates";

import { Footer } from "@/components/Footer";
import { NearbyTowns } from "@/components/NearbyTowns";
import { nearbyTownsData } from "@/data/nearbyTowns";
import { locationData } from "@/data/locationData";
export default function OxfordServiceArea() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useEffect(() => {
    document.title = "Shot Blasting Oxford | Commercial & Industrial";
    
    // Set keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'shot blasting Oxford, rust removal, surface preparation, industrial blasting, Oxfordshire');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'shot blasting Oxford, rust removal, surface preparation, industrial blasting, Oxfordshire';
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    const locationInfo = locationData["oxford"];
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
      ogTitle.setAttribute('content', 'Shot Blasting Oxford');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.setAttribute('content', 'Shot Blasting Oxford');
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
      twitterTitle.setAttribute('content', 'Shot Blasting Oxford');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'twitter:title';
      meta.content = 'Shot Blasting Oxford';
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
            { label: "South East", href: "/service-areas#south-east" },
            { label: "Oxford", href: "/service-areas/oxford", isCurrentPage: true }
          ]} />
        </div>
      </section>

      {/* Hero Section */}
      <HeroCarousel className="py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="text-[#F5F1E8] font-medium mb-2">Professional Shot Blasting Services</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Shot Blasting Services in Oxford
          </h1>
          <p className="text-lg text-white/90 mb-8">
            Commercial Shot Blasting provides professional surface preparation and rust removal services throughout Oxford and the South East. Serving local manufacturers, automotive shops, and industrial facilities with precision blasting solutions.
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
      </HeroCarousel>{/* About Oxford Service Area */}
      <section className="py-16 bg-[#F5F1E8]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Local Shot Blasting Experts in Oxford
              </h2>
              <p className="text-gray-700 mb-4">
                Commercial Shot Blasting has been serving Oxford businesses for years, providing professional surface preparation services to the region's leading manufacturers, automotive restoration specialists, and industrial facilities.
              </p>
              <p className="text-gray-700 mb-6">
                Oxford's thriving manufacturing and automotive sectors rely on our expertise for precision surface preparation. Whether you need rust removal, paint stripping, or concrete surface profiling, we have the equipment and experience to deliver exceptional results.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2C5F7F] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Same-day quotes for Oxford area projects</span>
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
                  <span className="text-gray-700">Competitive pricing for Oxford businesses</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img loading="lazy"
                src="/images/premier/steel-container-after.webp"
                alt="Professional shot blasting results in Oxford"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute bottom-0 right-0 bg-[#2C5F7F] text-white p-6 rounded-lg shadow-lg max-w-xs">
                <p className="font-semibold mb-2">Serving Oxford Since</p>
                <p className="text-3xl font-bold">2015+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services for Oxford */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Services Available in Oxford
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide a complete range of shot blasting and surface preparation services tailored to Oxford's diverse industries.
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
                description: "Complete rust removal solutions for automotive, manufacturing, and infrastructure projects across Oxford.",
                icon: Award
              },
              {
                title: "Concrete Surface Preparation",
                description: "Professional concrete profiling and preparation for optimal coating adhesion on floors and structural elements.",
                icon: CheckCircle
              },
              {
                title: "Paint Stripping",
                description: "Efficient paint and coating removal from metal surfaces, machinery, and structural components.",
                icon: Zap
              },
              {
                title: "Automotive Restoration",
                description: "Specialized blasting services for classic car restoration and vehicle refurbishment projects.",
                icon: Award
              },
              {
                title: "Industrial Equipment Cleaning",
                description: "Comprehensive cleaning and surface preparation for manufacturing equipment and industrial machinery.",
                icon: CheckCircle
              }
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="bg-[#F5F1E8] p-8 rounded-lg hover:shadow-lg transition-shadow">
                  <Icon className="w-10 h-10 text-[#2C5F7F] mb-4" />
                  <h3 className="text-xl font-semibold text-[#2C2C2C] mb-3">{service.title}</h3>
                  <p className="text-gray-700">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Served in Oxford */}
      <section className="py-16 bg-[#F5F1E8]">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Industries We Serve in Oxford
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Automotive & Restoration",
                items: ["Classic car restoration", "Vehicle refurbishment", "Rust removal", "Paint stripping"]
              },
              {
                title: "Manufacturing & Engineering",
                items: ["Equipment cleaning", "Component preparation", "Metal fabrication support", "Production line maintenance"]
              },
              {
                title: "Construction & Infrastructure",
                items: ["Structural steel preparation", "Bridge maintenance", "Building restoration", "Concrete profiling"]
              },
              {
                title: "Marine & Industrial",
                items: ["Hull preparation", "Deck cleaning", "Industrial machinery", "Equipment restoration"]
              }
            ].map((industry, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-[#2C2C2C] mb-4">{industry.title}</h3>
                <ul className="space-y-2">
                  {industry.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#2C5F7F] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Why Oxford Businesses Choose Us
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                {
                  title: "Local Expertise",
                  description: "We understand Oxford's industrial landscape and the specific needs of local businesses."
                },
                {
                  title: "Fast Turnaround",
                  description: "Quick response times and flexible scheduling to minimize downtime for your operations."
                },
                {
                  title: "Competitive Pricing",
                  description: "Professional quality at competitive rates tailored to Oxford market conditions."
                },
                {
                  title: "Waste Management",
                  description: "Responsible waste management and responsible waste management."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <Star className="w-6 h-6 text-[#2C5F7F] flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#2C2C2C] mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#2C5F7F] text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>
              <p className="mb-6">
                Contact us today for a free, no-obligation quote on your Oxford shot blasting project.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <div>
                    <p className="text-sm text-white/70">Call us</p>
                    <a href="tel:07970566409" className="font-semibold hover:text-[#F5F1E8]">
                      07970 566409
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <div>
                    <p className="text-sm text-white/70">Email us</p>
                    <a href="mailto:info@commercialshotblasting.co.uk" className="font-semibold hover:text-[#F5F1E8]">
                      info@commercialshotblasting.co.uk
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <div>
                    <p className="text-sm text-white/70">Service Area</p>
                    <p className="font-semibold">Oxford & South East</p>
                  </div>
                </div>
              </div>
              <Button size="lg" className="w-full mt-6 bg-white text-[#2C5F7F] hover:bg-[#F5F1E8]" onClick={() => setQuotePopupOpen(true)}>
                Request a Free Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      


      {/* Before/After Slider */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Oxford Project Transformation
            </h2>
            <p className="text-gray-600">See the results of our professional shot blasting work</p>
          </div>
          <BeforeAfterSlider
            beforeImage="/images/premier/steel-container-before.webp"
            afterImage="/images/premier/steel-container-after.webp"
            beforeLabel="Before"
            afterLabel="After"
          />
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button size="lg" className="bg-[#2C5F7F] hover:bg-[#1a3d52]" onClick={() => setQuotePopupOpen(true)}>
              Request a Quote
            </Button>
            <TrackedPhoneButton
              location="Oxford"
              phoneNumber="07970566409"
              variant="outline"
              size="lg"
              className="border-[#2C5F7F] text-[#2C5F7F]"
            >
              Call Now
            </TrackedPhoneButton>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      {/* Preparation & Cleanup Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-primary mb-2">Our Process</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Comprehensive Preparation & Protection Excellence
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Shot blasting quality is built on preparation and finished with cleanup. We follow a rigorous approach to site protection, containment measures, and thorough restoration – ensuring Oxford facilities achieve outstanding results with minimal environmental impact.
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
      <section className="py-16 bg-[#F5F1E8]">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "How quickly can you provide a quote for Oxford projects?",
                a: "We typically provide same-day quotes for Oxford area projects. Contact us with your project details and we'll respond within hours."
              },
              {
                q: "Do you service all areas of Oxford?",
                a: "Yes, we provide comprehensive coverage throughout Oxford and the surrounding South East region. We handle projects of all sizes from small components to large industrial equipment."
              },
              {
                q: "What types of surfaces can you blast?",
                a: "We can blast steel, cast iron, aluminum, concrete, and many other surfaces. Our equipment is versatile and can handle various materials and coating types."
              },
              {
                q: "Are your services environmentally friendly?",
                a: "Yes, we fully comply with UK waste management practices and use waste management practices. We can discuss specific project requirements for your project."
              },
              {
                q: "Can you handle urgent or emergency projects?",
                a: "We often accommodate urgent projects. Contact us directly to discuss your timeline and we'll do our best to accommodate your needs."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-[#2C2C2C] mb-3">{item.q}</h3>
                <p className="text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Nearby Towns Section */}
      <NearbyTowns 
        locationName={nearbyTownsData["oxford"].location}
        towns={nearbyTownsData["oxford"].towns}
      />



      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#2C5F7F] to-[#1a3d52] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Transform Your Surfaces Today
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Get professional shot blasting services in Oxford. Contact us for a free quote and discover why local businesses trust Commercial Shot Blasting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-[#F5F1E8]" onClick={() => setQuotePopupOpen(true)}>
              Get a Free Quote
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Phone className="w-4 h-4 mr-2" />
              Call: 07970 566409
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a3d52] text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/30">
                  <span className="font-bold">CSB</span>
                </div>
                <span className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Commercial Shot Blasting</span>
              </div>
              <p className="text-white/70 text-sm">Professional shot blasting services across the UK.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="/services/steel-shot-blasting" className="hover:text-white">Steel Shot Blasting</a></li>
                <li><a href="/services/concrete-preparation" className="hover:text-white">Concrete Preparation</a></li>
                <li><a href="/services/automotive-restoration" className="hover:text-white">Automotive Restoration</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/our-work" className="hover:text-white">Our Work</Link></li>
                <li><Link href="/service-areas" className="hover:text-white">Service Areas</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>
                  <a href="tel:07970566409" className="hover:text-white flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    07970 566409
                  </a>
                </li>
                <li>
                  <a href="mailto:info@commercialshotblasting.co.uk" className="hover:text-white flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email us
                  </a>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-white text-sm">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8">
            <p className="text-center text-white/70 text-sm">
              © 2024 Commercial Shot Blasting. All rights reserved. | Serving Oxford and the South East
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
