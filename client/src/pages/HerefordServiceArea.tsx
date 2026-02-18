import { useAuth } from "@/_core/hooks/useAuth";
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Shield, Clock, Award, Users, Home as HomeIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { LocationMap } from "@/components/LocationMap";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { TrackedPhoneButton } from "@/components/TrackedPhoneButton";

import { Footer } from "@/components/Footer";
import { NearbyTowns } from "@/components/NearbyTowns";
import { nearbyTownsData } from "@/data/nearbyTowns";
import { locationData } from "@/data/locationData";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { HeroCarousel } from "@/components/HeroCarousel";
// --- Hereford Specific Data ---
const LOCATION_NAME = "Hereford";
const REGION_NAME = "West Midlands"; // Hereford is in Herefordshire, which is part of the West Midlands region.

const HEREFORD_INDUSTRIES = [
  "Food & Drink Processing (e.g., Cider)",
  "Advanced Manufacturing & Engineering",
  "Defence and Security",
  "Agriculture & Farm Machinery",
  "Construction & Infrastructure",
  "Restoration & Heritage Buildings",
  "Logistics & Warehousing",
  "Automotive Repair & Restoration",
  "Sustainable Technologies",
  "General Commercial & Industrial"
];

const HEREFORD_SERVICES = [
  { title: "Agricultural Machinery Blasting", desc: "Specialist cleaning and preparation for tractors, trailers, and farm equipment to remove rust and prepare for new coatings." },
  { title: "Food & Beverage Plant Cleaning", desc: "Non-abrasive and abrasive blasting for processing equipment and structural steel in the local food and drink sector." },
  { title: "Structural Steel Preparation", desc: "High-performance shot blasting for new and existing steel structures in manufacturing and construction projects." },
  { title: "Heritage Building Restoration", desc: "Gentle blast cleaning for stone and brickwork on Hereford's historic and heritage properties." },
  { title: "Concrete Floor Preparation", desc: "Surface profiling for optimal coating adhesion on warehouse and factory floors." },
  { title: "Rust & Corrosion Removal", desc: "Complete corrosion removal for metal components, restoring them to a pristine condition for re-coating." },
];

const HEREFORD_TESTIMONIALS = [
  { quote: "The team did an outstanding job on our farm machinery. The rust removal was thorough, and the preparation for painting was perfect. Highly recommend their service in the Hereford area.", name: "David P.", title: "Local Farmer" },
  { quote: "We used them for the structural steelwork at our new manufacturing unit near Skylon Park. Fast, professional, and the surface profile was exactly what our coating required.", name: "Sarah K.", title: "Project Manager, Engineering Firm" },
];

const HEREFORD_FAQ = [
  { question: `Do you offer mobile shot blasting services in ${LOCATION_NAME}?`, answer: `Yes, we operate a fully mobile shot blasting unit and can service all areas within ${LOCATION_NAME} and the wider Herefordshire county, including Leominster, Ross-on-Wye, and Ledbury.` },
  { question: "What kind of surfaces can you blast in Hereford?", answer: "We can safely and effectively blast steel, concrete, stone, brick, wood, and various other materials. We tailor the abrasive and pressure to the specific surface and project requirement." },
  { question: "How quickly can you start a project in the area?", answer: "We aim to provide a quote within 24 hours of inquiry. Project start times depend on our current schedule, but we prioritize local commercial and industrial clients." },
];

// --- Component Structure ---

const Breadcrumb = () => (
  <nav className="flex py-4 container" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm text-gray-500">
      <li className="inline-flex items-center">
        <Link href="/" className="inline-flex items-center hover:text-[#2C5F7F]">
          <HomeIcon className="w-4 h-4 mr-2" />
          Home
        </Link>
      </li>
      <li>
        <div className="flex items-center">
          <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
          </svg>
          <Link href="#" className="ml-1 md:ml-2 hover:text-[#2C5F7F]">{REGION_NAME}</Link>
        </div>
      </li>
      <li aria-current="page">
        <div className="flex items-center">
          <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
          </svg>
          <span className="ml-1 md:ml-2 text-[#2C5F7F] font-medium">{LOCATION_NAME} Service Area</span>
        </div>
      </li>
    </ol>
  </nav>
);

const HeroSection = ({ setQuotePopupOpen }: { setQuotePopupOpen: (open: boolean) => void }) => (
  <HeroCarousel className="py-20 lg:py-32">
    <div className="max-w-4xl">
      <p className="text-[#F5F1E8] font-medium mb-2">Professional Shot Blasting Services</p>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
        Expert Shot Blasting Services in Hereford
      </h1>
      <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
        Professional surface preparation and rust removal services throughout Hereford and the surrounding areas. Serving local manufacturers, agricultural facilities, and industrial operations with precision blasting solutions.
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
  <section id="why-choose-us" className="py-20 bg-white">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[#2C5F7F] font-medium mb-2">Local Expertise, National Standards</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Trusted Shot Blasting Partner for {LOCATION_NAME}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We combine the high standards of a national provider with the dedicated, local service that businesses in {LOCATION_NAME} expect. Our team understands the unique requirements of the region, from the agricultural sector to the advanced manufacturing firms in Skylon Park.
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Our commitment is to deliver exceptional surface preparation that ensures the longevity and quality of your assets, whether it's a heritage restoration project or a modern industrial facility.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Shield, text: "Fully Insured" },
              { icon: Award, text: "Local Reputation for Quality" },
              { icon: Clock, text: "Efficient Project Completion" },
              { icon: Users, text: "Experienced Local Team" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-[#F5F1E8] rounded-lg">
                <item.icon className="w-6 h-6 text-[#2C5F7F]" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img loading="lazy" src="/images/industrial-precision.jpg" alt="Professional shot blasting in an industrial setting" className="rounded-lg shadow-xl" />
          <div className="absolute -bottom-6 -left-6 bg-[#2C5F7F] text-white p-6 rounded-lg shadow-lg">
            <p className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>20+</p>
            <p className="text-sm">Years Experience</p>
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
        <p className="text-[#2C5F7F] font-medium mb-2">Our {LOCATION_NAME} Services</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Tailored Shot Blasting Solutions for Herefordshire
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HEREFORD_SERVICES.map((service, i) => (
          <Card key={i} className="group overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.desc}</p>
              <a href="/contact" className="inline-flex items-center text-[#2C5F7F] font-medium hover:gap-2 transition-all">
                Get a Quote <ArrowRight className="w-4 h-4 ml-1" />
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
        <p className="text-[#2C5F7F] font-medium mb-2">Serving {LOCATION_NAME}'s Key Sectors</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Versatile Solutions for Every {LOCATION_NAME} Industry
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {HEREFORD_INDUSTRIES.map((industry, i) => (
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
  <section id="testimonials" className="py-20 bg-[#F5F1E8]">
    <div className="container">
      <div className="text-center mb-12">
        <p className="text-[#2C5F7F] font-medium mb-2">What Our {LOCATION_NAME} Clients Say</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Trusted by Local Businesses
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {HEREFORD_TESTIMONIALS.map((testimonial, i) => (
          <Card key={i} className="p-6 shadow-lg">
            <blockquote className="text-lg italic text-gray-700 mb-4">
              "{testimonial.quote}"
            </blockquote>
            <div className="font-semibold text-[#2C5F7F]">{testimonial.name}</div>
            <div className="text-sm text-gray-500">{testimonial.title}</div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const FAQSection = () => (
  <section id="faq" className="py-20 bg-white">
    <div className="container">
      <div className="text-center mb-12">
        <p className="text-[#2C5F7F] font-medium mb-2">Frequently Asked Questions</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Answers for Our {LOCATION_NAME} Customers
        </h2>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {HEREFORD_FAQ.map((item, i) => (
          <div key={i} className="border-b pb-4">
            <h3 className="text-xl font-semibold text-[#2C5F7F] mb-2">{item.question}</h3>
            <p className="text-gray-600">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-16 bg-[#2C5F7F] text-white">
    <div className="container">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Start Your {LOCATION_NAME} Project Today
          </h2>
          <p className="text-white/80">Contact your local shot blasting specialists for a free, no-obligation quote.</p>
        </div>
        <div className="flex gap-4">
          <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90">Get a Quote</Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <Phone className="w-4 h-4 mr-2" /> Call Us Now
          </Button>
        </div>
      </div>
    </div>
  </section>
);

const ContactFormSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success("Thank you! We'll be in touch shortly.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContact.mutate(formData);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-[#2C5F7F] font-medium mb-2">Get In Touch</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Request a Free Quote for {LOCATION_NAME}
            </h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and our {LOCATION_NAME} service team will get back to you within 24 hours with a detailed quote for your project.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#2C5F7F]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">07970 566409 (Local Line)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#2C5F7F]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">hereford@shotblasting.co.uk</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#2C5F7F]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service Area</p>
                  <p className="font-medium">All of Herefordshire County</p>
                </div>
              </div>
            </div>
          </div>
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Name</label>
                  <Input placeholder="Your name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <Input type="email" placeholder="Your email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Phone</label>
                <Input placeholder="Your phone number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Project Details in {LOCATION_NAME}</label>
                <Textarea placeholder="Tell us about your project in Hereford..." rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required />
              </div>
              <Button type="submit" className="w-full bg-[#2C5F7F] hover:bg-[#234d66]">
                Request Quote for {LOCATION_NAME}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};




export default function HerefordServiceArea() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useEffect(() => {
    document.title = "Shot Blasting Hereford | Commercial & Industrial";
    
    // Set keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'shot blasting Hereford, rust removal, surface preparation, industrial blasting, Herefordshire');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'shot blasting Hereford, rust removal, surface preparation, industrial blasting, Herefordshire';
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    const description = locationData["hereford"].description;
    
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
      ogTitle.setAttribute('content', 'Shot Blasting Hereford');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.setAttribute('content', 'Shot Blasting Hereford');
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
      twitterTitle.setAttribute('content', 'Shot Blasting Hereford');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'twitter:title';
      meta.content = 'Shot Blasting Hereford';
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

  // Authentication state is not directly used for the public service page, but kept for consistency
  let { user, loading, error, isAuthenticated, logout } = useAuth();

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
                Expert Site Preparation & Environmental Care
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Quality shot blasting demands careful preparation and responsible cleanup. Our systematic approach to site protection, containment measures, and complete post-blast restoration ensures Hereford facilities receive exceptional results with minimal environmental impact.
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

      {/* Header (Reused from Home.tsx) */}
<Breadcrumb />
      <HeroSection setQuotePopupOpen={setQuotePopupOpen} />
      <WhyChooseUsSection />
      <ServicesSection />
      <IndustriesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <ContactFormSection />
      
      {/* Service Area Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F7F] mb-4">
              Our Shot Blasting Services in Hereford
            </h2>
            <p className="text-lg text-gray-600">
              We provide professional shot blasting services throughout Hereford and the surrounding region. The map shows our primary service area with a 25-mile radius.
            </p>
          </div>
          <LocationMap locationName="Hereford" />
        </div>
      </section>
      
      <Footer />

      {/* Nearby Towns Section */}
      <NearbyTowns 
        locationName={nearbyTownsData["hereford"].location}
        towns={nearbyTownsData["hereford"].towns}
      />

    </div>
  );
}
