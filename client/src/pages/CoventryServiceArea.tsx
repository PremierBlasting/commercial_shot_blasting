import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Shield, Clock, Award, Users, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { LocationMap } from "@/components/LocationMap";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { TrackedPhoneButton } from "@/components/TrackedPhoneButton";

import { Footer } from "@/components/Footer";
import { NearbyTowns } from "@/components/NearbyTowns";
import { nearbyTownsData } from "@/data/nearbyTowns";
import { locationData } from "@/data/locationData";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { HeroCarousel } from "@/components/HeroCarousel";
// Placeholder data for Coventry-specific content
const COVENTRY_INDUSTRIES = [
  "Automotive & Future Mobility",
  "Advanced Manufacturing",
  "Aerospace & Rail",
  "Construction & Infrastructure",
  "Heritage Restoration",
  "General Engineering",
  "Education & Health Facilities",
  "Oil & Gas",
  "Marine",
  "Agriculture",
];

const COVENTRY_FAQ = [
  {
    q: "What areas in Coventry do you cover?",
    a: "We provide full shot blasting services across all of Coventry, including areas like Tile Hill, Cheylesmore, Earlsdon, and the city centre industrial zones. We cover the entire West Midlands region.",
  },
  {
    q: "Are your services suitable for Coventry's historic buildings?",
    a: "Yes, we offer specialized, non-destructive blasting techniques perfect for the careful restoration and preparation of Coventry's historic and listed buildings, ensuring surface integrity is maintained.",
  },
  {
    q: "Do you work with the local automotive and manufacturing sectors?",
    a: "Absolutely. Coventry is a hub for advanced manufacturing and automotive. Our services are essential for surface preparation of components, machinery, and infrastructure used by these key local industries.",
  },
];

const COVENTRY_TESTIMONIAL = {
  name: "Mr. A. Davies",
  company: "Coventry Engineering Works",
  quote: "Shot Blasting provided an exceptional service for our factory floor preparation. Their team was professional, efficient, and understood the tight deadlines required by our advanced manufacturing schedule. The results were flawless.",
};

export default function CoventryServiceArea() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useEffect(() => {
    document.title = "Shot Blasting Coventry | Commercial & Industrial";
    
    // Set keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'shot blasting Coventry, rust removal, surface preparation, industrial blasting, West Midlands');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'shot blasting Coventry, rust removal, surface preparation, industrial blasting, West Midlands';
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    const description = locationData["coventry"].description;
    
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
      ogTitle.setAttribute('content', 'Shot Blasting Coventry');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.setAttribute('content', 'Shot Blasting Coventry');
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
      twitterTitle.setAttribute('content', 'Shot Blasting Coventry');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'twitter:title';
      meta.content = 'Shot Blasting Coventry';
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

  let { user, loading, error, isAuthenticated, logout } = useAuth();

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
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
      

      {/* Breadcrumb Navigation */}
      <div className="container py-4 bg-white">
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
              <BreadcrumbLink href="/service-areas/west-midlands">West Midlands</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Coventry</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section */}
      <HeroCarousel className="py-20 lg:py-32">
        <div className="max-w-3xl">
          <p className="text-[#F5F1E8] font-medium mb-2">Professional Shot Blasting Services</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Expert Shot Blasting Services in Coventry
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            As the historic heart of the UK's advanced manufacturing and automotive sector, Coventry demands the highest quality surface preparation. We provide specialist, precision shot blasting for the city's industrial, commercial, and heritage projects, ensuring optimal results for every surface.
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
      </HeroCarousel>{/* Services Grid (Copied from Home.tsx) */}
      <section id="services" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Expert Services in the West Midlands</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Comprehensive Shot Blasting Solutions for Coventry
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Steel Shot Blasting", desc: "High-performance cleaning for steel structures, crucial for Coventry's heavy engineering and rail infrastructure.", img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400" },
              { title: "Concrete Preparation", desc: "Surface profiling for optimal coating adhesion on factory floors and commercial properties across the city.", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400" },
              { title: "Rust Removal", desc: "Complete corrosion removal, vital for maintaining the machinery and assets of Coventry's manufacturing base.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
              { title: "Paint Stripping", desc: "Safe and effective removal of old paint from automotive components and industrial equipment.", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400" },
              { title: "Surface Profiling", desc: "Precision surface preparation achieving exact anchor patterns for high-performance coatings in aerospace and automotive applications.", img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400" },
              { title: "Industrial Cleaning", desc: "Heavy-duty cleaning for machinery, equipment, and industrial components in the Coventry area.", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400" },
            ].map((service, i) => (
              <Card key={i} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img loading="lazy" src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <a href="/contact" className="inline-flex items-center text-[#2C5F7F] font-medium hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Location Specific */}
      <section id="about" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Your Local Coventry Shot Blasting Partner</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Supporting Coventry's Industrial Excellence
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are a trusted family-run business with the mission to provide superior shot blasting solutions specifically tailored for the industrial and commercial environments of Coventry and the wider West Midlands. Our advanced technology delivers exceptional results, meeting the high standards required by the city's leading sectors.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We are proud to support Coventry's legacy as a center for innovation, providing advanced surface preparation for the automotive, aerospace, and engineering firms that drive the local economy. Our expert team is dedicated to unparalleled service and safety.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Fully Insured" },
                  { icon: Award, text: "Quality Assured" },
                  { icon: Clock, text: "Fast Turnaround" },
                  { icon: Users, text: "Expert Team" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-[#F5F1E8] rounded-lg">
                    <item.icon className="w-6 h-6 text-[#2C5F7F]" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img loading="lazy" src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600" alt="Professional shot blasting in Coventry" className="rounded-lg shadow-xl" />
              <div className="absolute -bottom-6 -left-6 bg-[#2C5F7F] text-white p-6 rounded-lg shadow-lg">
                <p className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>20+</p>
                <p className="text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      


      {/* Before/After Slider */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Coventry Project Transformation
            </h2>
            <p className="text-gray-600">See the results of our professional shot blasting work</p>
          </div>
          <BeforeAfterSlider
            beforeImage="/warehouse-before.webp"
            afterImage="/warehouse-after.webp"
            beforeLabel="Before"
            afterLabel="After"
          />
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button size="lg" className="bg-[#2C5F7F] hover:bg-[#1a3d52]">
              Request a Quote
            </Button>
            <TrackedPhoneButton
              location="Coventry"
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

      

      {/* Local Testimonial Section */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Trusted by Coventry Businesses</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Our Local Clients Say
            </h2>
          </div>
          <Card className="max-w-3xl mx-auto p-8 shadow-xl">
            <CardContent className="p-0 text-center">
              <MessageSquare className="w-10 h-10 text-[#2C5F7F] mx-auto mb-6" />
              <blockquote className="text-xl italic text-gray-700 mb-6">
                "{COVENTRY_TESTIMONIAL.quote}"
              </blockquote>
              <p className="font-semibold text-[#2C5F7F]">{COVENTRY_TESTIMONIAL.name}</p>
              <p className="text-sm text-gray-500">{COVENTRY_TESTIMONIAL.company}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Industries Section - Location Specific */}
      <section id="industries" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Industries We Serve in Coventry</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Tailored Solutions for Coventry's Key Sectors
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {COVENTRY_INDUSTRIES.map((industry, i) => (
              <div key={i} className="bg-[#F5F1E8] p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <CheckCircle className="w-8 h-8 text-[#2C5F7F] mx-auto mb-3" />
                <p className="font-medium text-[#2C2C2C]">{industry}</p>
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
                Professional Site Preparation & Protection
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Shot blasting quality starts with preparation and ends with cleanup. We pride ourselves on our comprehensive approach to site containment, protective measures, and complete restoration – delivering consistent results and leaving Coventry sites ready for the next work phase.
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
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Common Questions</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Coventry Shot Blasting FAQ
            </h2>
          </div>
          <div className="space-y-6">
            {COVENTRY_FAQ.map((item, i) => (
              <Card key={i} className="p-6">
                <h3 className="text-xl font-semibold text-[#2C5F7F] mb-3">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (Copied from Home.tsx) */}
      <section className="py-16 bg-[#2C5F7F] text-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to Transform Your Surfaces in Coventry?
              </h2>
              <p className="text-white/80">Contact your local West Midlands experts today for a free, no-obligation quote.</p>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90">Get a Quote</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="w-4 h-4 mr-2" /> Call Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section (Copied from Home.tsx) */}
      <section id="contact" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Get In Touch</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Request a Free Quote for Your Coventry Project
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form and our team will get back to you within 24 hours with a detailed quote for your project in Coventry.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#2C5F7F]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">07970 566409</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#2C5F7F]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">info@shotblasting.co.uk</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#2C5F7F]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Service Area</p>
                    <p className="font-medium">Coventry & West Midlands</p>
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
                  <label className="text-sm font-medium mb-1 block">Project Details</label>
                  <Textarea placeholder="Tell us about your project in Coventry..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={5} required />
                </div>
                <Button type="submit" className="w-full bg-[#2C5F7F] hover:bg-[#234d66]">
                  Request a Quote
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer (Copied from Home.tsx) */}
      
      {/* Service Area Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F7F] mb-4">
              Our Shot Blasting Services in Coventry
            </h2>
            <p className="text-lg text-gray-600">
              We provide professional shot blasting services throughout Coventry and the surrounding region. The map shows our primary service area with a 25-mile radius.
            </p>
          </div>
          <LocationMap locationName="Coventry" />
        </div>
      </section>

<footer className="bg-[#1a3d52] text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/30">
                  <span className="font-bold">SB</span>
                </div>
                <span className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Shot Blasting</span>
              </div>
              <p className="text-white/70 text-sm">Professional shot blasting services for industrial and commercial applications across Coventry and the UK.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-white">Steel Shot Blasting</a></li>
                <li><a href="#" className="hover:text-white">Concrete Preparation</a></li>
                <li><a href="#" className="hover:text-white">Rust Removal</a></li>
                <li><a href="#" className="hover:text-white">Paint Stripping</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#about" className="hover:text-white">About Us</a></li>
                <li><a href="#industries" className="hover:text-white">Industries</a></li>
                <li><Link href="/our-work" className="hover:text-white">Our Work</Link></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>07970 566409</li>
                <li>info@shotblasting.co.uk</li>
                <li>Coventry & West Midlands Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
            <p>&copy; {new Date().getFullYear()} Shot Blasting Services. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Nearby Towns Section */}
      <NearbyTowns 
        locationName={nearbyTownsData["coventry"].location}
        towns={nearbyTownsData["coventry"].towns}
      />

    </div>
  );
}
