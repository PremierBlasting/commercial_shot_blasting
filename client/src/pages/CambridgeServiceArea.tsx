import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { useState, useEffect } from "react";
import { LocationMap } from "@/components/LocationMap";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, ArrowRight, Shield, Clock, Award, Users, CheckCircle, MapPin, Factory, Microscope, BookOpen, Hammer } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { TrackedPhoneButton } from "@/components/TrackedPhoneButton";
import { NearbyTowns } from "@/components/NearbyTowns";
import { nearbyTownsData } from "@/data/nearbyTowns";
import { locationData } from "@/data/locationData";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { HeroCarousel } from "@/components/HeroCarousel";

// --- Cambridge-Specific Data ---

const CAMBRIDGE_SERVICES = [
  { title: "Concrete Floor Preparation", desc: "Essential surface profiling for laboratories, cleanrooms, and industrial units in the Cambridge Science Park area.", icon: Hammer },
  { title: "Historic Building Restoration", desc: "Gentle blast cleaning for heritage sites and university buildings, removing old coatings without damage.", icon: BookOpen },
  { title: "Advanced Manufacturing Component Cleaning", desc: "Precision shot blasting for aerospace, medical, and high-tech components common in the Cambridge cluster.", icon: Factory },
  { title: "Steel Structure Refurbishment", desc: "High-performance rust and scale removal for bridges, rail infrastructure, and large industrial facilities across Cambridgeshire.", icon: Shield },
  { title: "Paint and Coating Removal", desc: "Safe and effective stripping of old protective layers from machinery and vehicles for refurbishment.", icon: Clock },
  { title: "Surface Profiling for Adhesion", desc: "Achieving the perfect anchor pattern for new high-performance coatings on floors and walls.", icon: CheckCircle },
];

const CAMBRIDGE_INDUSTRIES = [
  "Biotech & Pharma (Science Parks)",
  "Advanced Manufacturing (High-Tech)",
  "Construction & Infrastructure",
  "Education & Heritage (University)",
  "Aerospace & Defence Supply Chain",
  "Logistics & Warehousing",
  "Automotive Restoration",
  "Rail & Transport",
];

const CAMBRIDGE_TESTIMONIALS = [
  { quote: "The team prepared our new lab floor at the Science Park perfectly. The coating adhesion is flawless. Highly professional and efficient service.", name: "Dr. E. Davies", company: "BioTech Research, Cambridge" },
  { quote: "We needed a delicate clean for a historic university building's stone facade. The results were exceptional, preserving the integrity of the material.", name: "Alistair J.", company: "Heritage Restoration, Ely" },
  { quote: "Fast turnaround on a large warehouse floor preparation project near the A14. Minimal disruption and a first-class finish ready for epoxy.", name: "Sarah K.", company: "Logistics Manager, Cambs" },
];

const CAMBRIDGE_FAQ = [
  { question: "Do you offer mobile shot blasting services in Cambridge?", answer: "Yes, we operate a fully mobile unit capable of serving all areas of Cambridge, including the city centre, Science Parks, and surrounding towns like Ely and Newmarket. We can work on-site to minimize disruption." },
  { question: "Is shot blasting safe for historic buildings and university properties?", answer: "We use specialized, low-pressure abrasive blasting techniques, often with softer media, specifically designed for delicate surfaces like historic brick and stone. We always conduct a test patch first to ensure material integrity." },
  { question: "What is the typical turnaround time for a commercial floor project?", answer: "Turnaround time depends on the size and condition of the floor. For a standard 500m² warehouse floor, preparation can often be completed within 1-2 days. We work with you to schedule outside of peak hours." },
  { question: "Can you prepare surfaces for cleanroom or laboratory coatings?", answer: "Absolutely. We are experts in achieving the precise surface profile (CSP) required for high-performance, seamless coatings used in cleanroom and laboratory environments, which are critical for Cambridge's biotech sector." },
];

// --- Component Structure ---

const BreadcrumbSection = () => (
  <div className="bg-gray-100 py-3">
    <div className="container">
      <Breadcrumb>
            <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/service-areas">Service Areas</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Cambridge</BreadcrumbPage>
        </BreadcrumbItem>
            </BreadcrumbList>
      </Breadcrumb>
    </div>
  </div>
);

const HeroSection = ({ setQuotePopupOpen }: { setQuotePopupOpen: (open: boolean) => void }) => (
  <HeroCarousel className="py-20 lg:py-32">
    <div className="max-w-4xl">
      <p className="text-[#F5F1E8] font-medium mb-2">Professional Shot Blasting Services</p>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
        Specialist Shot Blasting Services in Cambridge
      </h1>
      <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
        Serving the Cambridge Science and Technology Cluster and all of Cambridgeshire with precision surface preparation for advanced manufacturing, heritage restoration, and industrial flooring.
      </p>
      <div className="flex flex-wrap gap-4">
        <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90" onClick={() => setQuotePopupOpen(true)}>
          Get a Free Quote Today
        </Button>
        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
          <a href="tel:07970566409" className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Call Now
          </a>
        </Button>
      </div>
    </div>
  </HeroCarousel>
);

const WhyChooseUsSection = () => (
  <section id="about" className="py-20 bg-white">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[#2C5F7F] font-medium mb-2">Your Local Cambridge Experts</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Precision and Reliability for the Cambridge Market
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We understand the unique demands of the Cambridge area, from the high-specification requirements of the Science Parks to the careful preservation needed for historic university properties. Our local team provides bespoke shot blasting solutions that meet these exacting standards.
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Our commitment to the Cambridgeshire region means we offer flexible scheduling to minimize disruption to your operations, whether you're in a busy manufacturing plant or a sensitive research facility.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Microscope, text: "Cleanroom Ready Prep" },
              { icon: BookOpen, text: "Heritage Safe Methods" },
              { icon: MapPin, text: "Local Cambridgeshire Team" },
              { icon: Factory, text: "Advanced Industry Focus" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-[#F5F1E8] rounded-lg">
                <item.icon className="w-6 h-6 text-[#2C5F7F]" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img loading="lazy" src="https://images.unsplash.com/photo-1559582772-297782337772?w=600" alt="Shot blasting equipment in an industrial setting" className="rounded-lg shadow-xl" />
          <div className="absolute -bottom-6 -left-6 bg-[#2C5F7F] text-white p-6 rounded-lg shadow-lg">
            <p className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>50+</p>
            <p className="text-sm">Cambridge Projects</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section id="services" className="py-20 bg-[#F5F1E8]">
    <div className="container">
      <div className="text-center mb-12">
        <p className="text-[#2C5F7F] font-medium mb-2">Our Cambridge Services</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Tailored Surface Preparation for Cambridgeshire
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CAMBRIDGE_SERVICES.map((service, i) => (
          <Card key={i} className="group overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-start">
              <service.icon className="w-8 h-8 text-[#2C5F7F] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.desc}</p>
              <a href="/contact" className="inline-flex items-center text-[#2C5F7F] font-medium hover:gap-2 transition-all mt-auto">
                Enquire Now <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const IndustriesSection = () => (
  <section id="industries" className="py-20 bg-white">
    <div className="container">
      <div className="text-center mb-12">
        <p className="text-[#2C5F7F] font-medium mb-2">Industries We Serve in Cambridge</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Supporting the Cambridge Knowledge Economy
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {CAMBRIDGE_INDUSTRIES.map((industry, i) => (
          <div key={i} className="bg-[#F5F1E8] p-6 rounded-lg text-center hover:shadow-md transition-shadow">
            <CheckCircle className="w-8 h-8 text-[#2C5F7F] mx-auto mb-3" />
            <p className="font-medium text-[#2C2C2C]">{industry}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-20 bg-[#2C5F7F] text-white">
    <div className="container">
      <div className="text-center mb-12">
        <p className="text-white/80 font-medium mb-2">Trusted by Cambridge Businesses</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          What Our Local Clients Say
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {CAMBRIDGE_TESTIMONIALS.map((testimonial, i) => (
          <Card key={i} className="bg-white text-[#2C2C2C] p-6 shadow-lg">
            <p className="italic mb-4">"{testimonial.quote}"</p>
            <div className="font-semibold border-t pt-3 mt-3">
              <p>{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.company}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const FAQSection = () => (
  <section className="py-20 bg-white">
    <div className="container">
      <div className="text-center mb-12">
        <p className="text-[#2C5F7F] font-medium mb-2">Common Questions</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Shot Blasting FAQs for Cambridge
        </h2>
      </div>
      <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
        {CAMBRIDGE_FAQ.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left font-semibold text-[#2C5F7F]">{item.question}</AccordionTrigger>
            <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-16 bg-[#F5F1E8]">
    <div className="container">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready for Your Cambridge Project?
          </h2>
          <p className="text-gray-600">Contact our local Cambridgeshire team today for a free, no-obligation site assessment and quote.</p>
        </div>
        <div className="flex gap-4">
          <Button size="lg" className="bg-[#2C5F7F] text-white hover:bg-[#1a3d52]">Get a Quote</Button>
          <Button size="lg" variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F]/10">
            <Phone className="w-4 h-4 mr-2" /> 07970 566409
          </Button>
        </div>
      </div>
    </div>
  </section>
);

// --- Main Page Component ---

export default function CambridgeServiceArea() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useEffect(() => {
    document.title = "Shot Blasting Cambridge | Commercial & Industrial";
    
    // Set keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'shot blasting Cambridge, rust removal, surface preparation, industrial blasting, Cambridgeshire');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'shot blasting Cambridge, rust removal, surface preparation, industrial blasting, Cambridgeshire';
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    const description = locationData["cambridge"].description;
    
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
      ogTitle.setAttribute('content', 'Shot Blasting Cambridge');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.setAttribute('content', 'Shot Blasting Cambridge');
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
      twitterTitle.setAttribute('content', 'Shot Blasting Cambridge');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'twitter:title';
      meta.content = 'Shot Blasting Cambridge';
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
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
      

      {/* Preparation & Cleanup Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-primary mb-2">Our Process</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Comprehensive Site Preparation & Restoration
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Shot blasting quality is built on preparation and finished with cleanup. We follow a rigorous four-stage process for site protection, containment, and restoration – delivering predictable results and leaving Cambridge facilities ready for immediate next-phase work.
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

      {/* Note: Header and Footer components are assumed to be handled by a parent Layout component */}
      
      <BreadcrumbSection />
      <HeroSection setQuotePopupOpen={setQuotePopupOpen} />
      <WhyChooseUsSection />
      <ServicesSection />
      <IndustriesSection />
      <TestimonialsSection />
      <FAQSection />
      
      {/* Service Area Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F7F] mb-4">
              Our Shot Blasting Services in Cambridge
            </h2>
            <p className="text-lg text-gray-600">
              We provide professional shot blasting services throughout Cambridge and the surrounding region. The map shows our primary service area with a 25-mile radius.
            </p>
          </div>
          <LocationMap locationName="Cambridge" />
        </div>
      </section>
      
      <CTASection />

      {/* Placeholder for Contact Form - assuming it's part of the CTA or a separate section if needed */}
      {/* For this task, we'll rely on the CTA to drive contact */}

      {/* Nearby Towns Section */}
      <NearbyTowns 
        locationName={nearbyTownsData["cambridge"].location}
        towns={nearbyTownsData["cambridge"].towns}
      />

    </div>
  );
}
