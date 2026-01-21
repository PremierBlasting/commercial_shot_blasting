import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Shield, Clock, Award, Users, Home as HomeIcon, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { LocationMap } from "@/components/LocationMap";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { TrackedPhoneButton } from "@/components/TrackedPhoneButton";

// Dummy data for Testimonials and FAQ
const localTestimonials = [
  { name: "Mr. A. Davies", title: "Flaxmill Restoration Project Manager", quote: "The team's shot blasting work on the historic ironwork was exceptional. They handled the delicate restoration with precision, a crucial part of preserving Shrewsbury's heritage.", location: "Shrewsbury, Shropshire" },
  { name: "S. Jones", title: "Local Agricultural Engineer", quote: "Fast, professional service for cleaning our heavy machinery. Their mobile unit came out to our farm near Oswestry and got the job done with minimal downtime. Highly recommended for Agri-Tech.", location: "Oswestry, Shropshire" },
  { name: "C. Patel", title: "Construction Site Manager", quote: "We needed rapid surface preparation for a new commercial build in the town centre. Shot Blasting's efficiency and adherence to safety standards were top-notch.", location: "Shrewsbury Town Centre" },
];

const faqs = [
  { question: "What is the difference between shot blasting and sandblasting?", answer: "Shot blasting uses centrifugal force from a wheel to propel abrasive media (like steel shot or grit), while sandblasting uses compressed air. Shot blasting is generally faster, more environmentally friendly, and creates less dust, making it ideal for large industrial surfaces." },
  { question: "Is shot blasting safe for historic buildings and delicate surfaces?", answer: "Yes, when performed by experts. We use specialized, low-pressure techniques and select the appropriate media to gently remove contaminants without damaging the underlying historic material, which is essential for projects like those in Shrewsbury's conservation areas." },
  { question: "Do you offer mobile shot blasting services in the Shropshire area?", answer: "Absolutely. Our fully equipped mobile units can travel across Shrewsbury, Telford, Oswestry, and the wider Shropshire and Mid-Wales region to perform on-site shot blasting for large structures, machinery, and infrastructure." },
];

export default function ShrewsburyServiceArea() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

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
      <div className="bg-gray-100 py-4">
        <div className="container">
          <Breadcrumb>
            <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">
                  <HomeIcon className="w-4 h-4 mr-1 inline-block" /> Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="w-4 h-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/service-areas">Service Areas</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="w-4 h-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="text-[#2C5F7F] font-medium">Shrewsbury</span>
            </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section - Localized */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shrewsbury's Specialist Shot Blasting Services
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Serving Shrewsbury, Shropshire, and the wider Mid-Wales region with expert surface preparation. From historic restoration projects like the Flaxmill Maltings to modern industrial cleaning, we deliver precision and quality.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90">
                Get a Free Quote in Shrewsbury
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Local Case Studies
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
              Shrewsbury Project Transformation
            </h2>
            <p className="text-gray-600">See the results of our professional shot blasting work</p>
          </div>
          <BeforeAfterSlider
            beforeImage="/warehouse-before.jpg"
            afterImage="/warehouse-after.jpg"
            beforeLabel="Before"
            afterLabel="After"
          />
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button size="lg" className="bg-[#2C5F7F] hover:bg-[#1a3d52]">
              Request a Quote
            </Button>
            <TrackedPhoneButton
              location="Shrewsbury"
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

      

      {/* Why Choose Us Section - Localized */}
      <section id="about" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Why Choose Us in Shrewsbury</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Local Expertise for Shropshire's Unique Needs
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are a trusted, local provider with a deep understanding of Shrewsbury's unique architectural and industrial landscape. Our expertise is particularly valued in **historic restoration**, where delicate surfaces require precision shot blasting to preserve their integrity.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our commitment extends to supporting Shropshire's key sectors, including Advanced Manufacturing, Agri-Tech, and Construction, ensuring all projects meet the highest standards of safety and finish.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Fully Insured & Certified" },
                  { icon: Award, text: "Historic Restoration Specialists" },
                  { icon: Clock, text: "Mobile Service Across Shropshire" },
                  { icon: Users, text: "Local Expert Team" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-[#F5F1E8] rounded-lg">
                    <item.icon className="w-6 h-6 text-[#2C5F7F]" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600" alt="Professional shot blasting" className="rounded-lg shadow-xl" />
              <div className="absolute -bottom-6 -left-6 bg-[#2C5F7F] text-white p-6 rounded-lg shadow-lg">
                <p className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>20+</p>
                <p className="text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - General */}
      <section id="services" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Expert Services in Shrewsbury</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Comprehensive Shot Blasting Solutions
            </h2>
            <p className="text-gray-600 mt-4">We provide a full range of surface preparation services for commercial, industrial, and heritage projects across the Shrewsbury area.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Historic Restoration Blasting", desc: "Specialist, gentle media blasting for listed buildings and heritage ironwork, perfect for Shrewsbury's historic townscape.", img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400" },
              { title: "Agricultural Equipment Cleaning", desc: "Heavy-duty cleaning and rust removal for farm machinery and Agri-Tech components in the surrounding Shropshire countryside.", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400" },
              { title: "Industrial Steel Preparation", desc: "High-performance cleaning for steel structures, removing rust, mill scale, and old coatings for manufacturing and construction.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
              { title: "Concrete Floor Preparation", desc: "Surface profiling for optimal coating adhesion on commercial and industrial floors in Shrewsbury's business parks.", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400" },
              { title: "Rail and Infrastructure", desc: "Specialist blasting for rail components, bridges, and other critical infrastructure projects in the region.", img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400" },
              { title: "Paint and Coating Removal", desc: "Safe and effective removal of old paint, primers, and protective coatings from any surface.", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400" },
            ].map((service, i) => (
              <Card key={i} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <a href="#contact" className="inline-flex items-center text-[#2C5F7F] font-medium hover:gap-2 transition-all">
                    Get Service Details <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section - Localized */}
      <section id="industries" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Shrewsbury Industries We Serve</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Supporting Shropshire's Core Sectors
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              "Advanced Manufacturing", "Construction & Infrastructure", "Historic Restoration", "Agri-Tech & Farming", "Rail & Transport",
              "Food & Drink Production", "Commercial Property", "Oil & Gas (Local Depots)", "Automotive", "General Industry"
            ].map((industry, i) => (
              <div key={i} className="bg-[#F5F1E8] p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <CheckCircle className="w-8 h-8 text-[#2C5F7F] mx-auto mb-3" />
                <p className="font-medium text-[#2C2C2C]">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Testimonials Section */}
      <section id="testimonials" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">What Our Shrewsbury Clients Say</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Trusted by Local Businesses and Heritage Projects
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {localTestimonials.map((testimonial, i) => (
              <Card key={i} className="p-6 shadow-lg border-t-4 border-[#2C5F7F]">
                <p className="text-lg italic text-gray-700 mb-4">"{testimonial.quote}"</p>
                <div className="font-semibold text-[#2C2C2C]">{testimonial.name}</div>
                <div className="text-sm text-[#2C5F7F]">{testimonial.title}</div>
                <div className="text-xs text-gray-500">{testimonial.location}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Frequently Asked Questions</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Answers to Your Shot Blasting Queries
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b pb-4">
                <h3 className="text-xl font-semibold text-[#2C5F7F] mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Localized */}
      <section className="py-16 bg-[#2C5F7F] text-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to Start Your Shrewsbury Project?
              </h2>
              <p className="text-white/80">Contact our local team today for a free, no-obligation quote and site assessment.</p>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90">Get a Quote Now</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="w-4 h-4 mr-2" /> Call Shrewsbury Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Retained from Home.tsx structure */}
      <section id="contact" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Get In Touch</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Request a Free Quote for Your Shrewsbury Project
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form and our Shrewsbury team will get back to you within 24 hours with a detailed quote for your project in Shropshire or Mid-Wales.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#2C5F7F] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#2C2C2C]">Local Office</h3>
                    <p className="text-gray-600">Serving Shrewsbury, Telford, and all of Shropshire</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-[#2C5F7F] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#2C2C2C]">Call Us</h3>
                    <p className="text-gray-600">07970 566409 (Shropshire Line)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[#2C5F7F] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#2C2C2C]">Email Us</h3>
                    <p className="text-gray-600">shrewsbury@shotblasting.co.uk</p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  type="tel"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <Textarea
                  placeholder="Tell us about your project in Shrewsbury..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  required
                />
                <Button type="submit" className="w-full" disabled={submitContact.isPending}>
                  {submitContact.isPending ? "Sending..." : "Request Quote"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer - Retained from Home.tsx structure */}
      
      {/* Service Area Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F7F] mb-4">
              Our Shot Blasting Services in Shrewsbury
            </h2>
            <p className="text-lg text-gray-600">
              We provide professional shot blasting services throughout Shrewsbury and the surrounding region. The map shows our primary service area with a 25-mile radius.
            </p>
          </div>
          <LocationMap locationName="Shrewsbury" />
        </div>
      </section>

<footer className="bg-[#2C2C2C] text-white py-10">
        <div className="container text-center text-sm text-white/70">
          <p>&copy; {new Date().getFullYear()} Shot Blasting Specialists. All rights reserved. Serving Shrewsbury and the UK.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
