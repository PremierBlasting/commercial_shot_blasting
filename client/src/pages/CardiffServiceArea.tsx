import React from 'react';
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { useState, useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { LocationMap } from "@/components/LocationMap";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { TrackedPhoneButton } from "@/components/TrackedPhoneButton";
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { NearbyTowns } from "@/components/NearbyTowns";
import { nearbyTownsData } from "@/data/nearbyTowns";
import { locationData } from "@/data/locationData";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Phone } from "lucide-react";

// Mock components for the sake of structure, assuming they exist in the project
const HeroSection = ({ title, subtitle, ctaText }: { title: string; subtitle: string; ctaText: string }) => (
  <section className="bg-gray-100 py-20 text-center">
    <div className="container mx-auto px-4">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-xl text-gray-600 mb-8">{subtitle}</p>
      <Button size="lg">{ctaText}</Button>
    </div>
  </section>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">{children}</h2>
);

const WhyChooseUs = ({ points }: { points: Array<{ title: string; description: string }> }) => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <SectionTitle>Why Choose Us for Your Cardiff Project?</SectionTitle>
      <div className="grid md:grid-cols-3 gap-8">
        {points.map((point: { title: string; description: string }, index: number) => (
          <Card key={index} className="text-center">
            <CardHeader>
              <CardTitle>{point.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{point.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const ServicesSection = ({ services }: { services: Array<{ title: string; description: string }> }) => (
  <section className="bg-blue-50 py-16">
    <div className="container mx-auto px-4">
      <SectionTitle>Our Core Shot Blasting Services in Cardiff</SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service: { title: string; description: string }, index: number) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const IndustriesServed = ({ industries }: { industries: Array<{ title: string; context: string }> }) => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <SectionTitle>Industries We Serve Across Cardiff & South Wales</SectionTitle>
      <div className="grid md:grid-cols-4 gap-6">
        {industries.map((industry: { title: string; context: string }, index: number) => (
          <Card key={index} className="text-center bg-gray-50">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">{industry.title}</h3>
              <p className="text-sm text-gray-600">{industry.context}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const TestimonialsSection = ({ testimonials }: { testimonials: Array<{ quote: string; name: string; location: string }> }) => (
  <section className="bg-gray-100 py-16">
    <div className="container mx-auto px-4">
      <SectionTitle>Local Testimonials from Cardiff Clients</SectionTitle>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial: { quote: string; name: string; location: string }, index: number) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <p className="italic mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold text-right">- {testimonial.name}, {testimonial.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const FAQSection = ({ faqs }: { faqs: Array<{ question: string; answer: string }> }) => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <SectionTitle>Frequently Asked Questions (FAQ)</SectionTitle>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqs.map((faq: { question: string; answer: string }, index: number) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

const CTASection = () => (
  <section className="bg-blue-600 text-white py-20 text-center">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold mb-4">Ready to Start Your Project in Cardiff?</h2>
      <p className="text-xl mb-8">Get a free, no-obligation quote from our local experts today.</p>
      <Button variant="secondary" size="lg">Request a Free Cardiff Quote</Button>
    </div>
  </section>
);

// --- Content Data for Cardiff ---

const whyChooseUsPoints = [
  {
    title: "Local Cardiff Expertise",
    description: "Deep understanding of local architecture, industrial sites, and regulatory requirements across Cardiff and the wider South Wales area."
  },
  {
    title: "Rapid Response in South Wales",
    description: "Our local base ensures we can mobilize quickly for urgent projects, minimizing downtime for your business."
  },
  {
    title: "Commitment to Quality",
    description: "We use state-of-the-art equipment and highly trained technicians to deliver superior surface preparation results every time."
  }
];

const services = [
  {
    title: "Dustless Blasting",
    description: "Eco-friendly and low-dust surface preparation, ideal for sensitive urban environments like Cardiff Bay and city centre projects."
  },
  {
    title: "Grit Blasting",
    description: "Heavy-duty cleaning for large industrial machinery, steel structures, and marine equipment at the Port of Cardiff."
  },
  {
    title: "Historic Restoration",
    description: "Gentle yet effective cleaning for the restoration of Cardiff's Victorian and Edwardian buildings, preserving their heritage."
  }
];

const industries = [
  {
    title: "Maritime & Port",
    context: "Cleaning and maintenance of ships, docks, and port infrastructure in Cardiff Bay."
  },
  {
    title: "Steel & Manufacturing",
    context: "Preparing metal components and machinery for coating in South Wales' industrial heartland."
  },
  {
    title: "Construction & Infrastructure",
    context: "Surface preparation for new builds, bridges, and road infrastructure projects across the city."
  },
  {
    title: "Heritage & Public Works",
    context: "Restoring historic landmarks and public buildings, ensuring compliance with local conservation standards."
  }
];

const testimonials = [
  {
    quote: "The team did an outstanding job on our warehouse floor in Tremorfa. Fast, professional, and the finish was perfect. Highly recommend their Cardiff service.",
    name: "Huw L.",
    location: "Tremorfa, Cardiff"
  },
  {
    quote: "We needed urgent rust removal on a marine component at the docks. They were on-site within hours and completed the job safely and efficiently.",
    name: "Sian P.",
    location: "Cardiff Bay"
  },
  {
    quote: "Excellent service for restoring the stone facade of our building near the Castle. Very careful and respectful of the historic structure.",
    name: "David M.",
    location: "Cardiff City Centre"
  }
];

const faqs = [
  {
    question: "What areas in South Wales do you cover?",
    answer: "We primarily serve Cardiff, but our service area extends across the whole of South Wales, including Newport, Swansea, Bridgend, and the Valleys."
  },
  {
    question: "Is dustless blasting suitable for domestic properties in Cardiff?",
    answer: "Yes, dustless blasting is ideal for domestic projects like driveway cleaning, timber restoration, and paint removal on houses, as it minimizes mess and environmental impact."
  },
  {
    question: "Do you handle large industrial projects at the Port of Cardiff?",
    answer: "Absolutely. We have the capacity and expertise to handle large-scale industrial projects, including ship hull cleaning, tank preparation, and structural steel maintenance at the port."
  }
];

// --- Main Component ---

const CardiffServiceArea: React.FC = () => {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useEffect(() => {
    document.title = "Shot Blasting Cardiff | Commercial & Industrial";
    
    // Set keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'shot blasting Cardiff, rust removal, surface preparation, industrial blasting, South Wales');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'shot blasting Cardiff, rust removal, surface preparation, industrial blasting, South Wales';
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    const description = locationData["cardiff"].description;
    
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
      ogTitle.setAttribute('content', 'Shot Blasting Cardiff');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.setAttribute('content', 'Shot Blasting Cardiff');
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
      twitterTitle.setAttribute('content', 'Shot Blasting Cardiff');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'twitter:title';
      meta.content = 'Shot Blasting Cardiff';
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
    <div className="CardiffServiceArea">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
      
      <div className="container mx-auto px-4 py-4">
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
              <BreadcrumbPage>Cardiff</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section */}
      <HeroCarousel className="py-20 lg:py-32">
        <div className="max-w-3xl">
          <p className="text-[#F5F1E8] font-medium mb-2">Professional Shot Blasting Services</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Expert Shot Blasting Services in Cardiff & South Wales
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            The leading provider for industrial, commercial, and domestic surface preparation, trusted across the Welsh capital.
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

      <WhyChooseUs points={whyChooseUsPoints} />

      <ServicesSection services={services} />

      <IndustriesServed industries={industries} />

      <TestimonialsSection testimonials={testimonials} />

      <FAQSection faqs={faqs} />


      {/* Preparation & Cleanup Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-primary mb-2">Our Process</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Expert Preparation & Environmental Protection
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Effective shot blasting requires careful preparation and responsible cleanup. Our systematic approach to site containment, protective measures, and post-blast restoration ensures Cardiff projects achieve superior results while maintaining waste management and site cleanliness.
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

      {/* Service Area Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F7F] mb-4">
              Our Shot Blasting Services in Cardiff
            </h2>
            <p className="text-lg text-gray-600">
              We provide professional shot blasting services throughout Cardiff and the surrounding region. The map shows our primary service area with a 25-mile radius.
            </p>
          </div>
          <LocationMap locationName="Cardiff" />
        </div>
      </section>

      <CTASection />

      {/* Nearby Towns Section */}
      <NearbyTowns 
        locationName={nearbyTownsData["cardiff"].location}
        towns={nearbyTownsData["cardiff"].towns}
      />

    </div>
  );
};

export default CardiffServiceArea;
