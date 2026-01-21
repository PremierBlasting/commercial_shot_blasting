import { useAuth } from "@/_core/hooks/useAuth";
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Shield, Clock, Award, Users, Quote } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { LocationMap } from "@/components/LocationMap";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { TrackedPhoneButton } from "@/components/TrackedPhoneButton";

// Placeholder for a simple Testimonial Card component
const TestimonialCard = ({ quote, name, company }: { quote: string, name: string, company: string }) => (
  <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow">
    <Quote className="w-8 h-8 text-[#2C5F7F] mb-4" />
    <p className="italic text-gray-700 mb-4">"{quote}"</p>
    <p className="font-semibold text-[#2C2C2C]">{name}</p>
    <p className="text-sm text-gray-500">{company}</p>
  </Card>
);

export default function NorwichServiceArea() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

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

  const norwichIndustries = [
    "Advanced Engineering", "Construction & Infrastructure", "Energy & Renewables",
    "Agriculture & Agri-Food", "Heritage Restoration", "Manufacturing",
    "Automotive", "Marine", "Rail", "General Industrial"
  ];

  const norwichFAQs = [
    {
      question: "Why choose local shot blasting services in Norwich?",
      answer: "Choosing a local provider ensures faster response times, lower transport costs, and a team that understands the specific industrial and heritage requirements of the Norwich and East Anglia region. We are committed to supporting local businesses."
    },
    {
      question: "What types of surfaces can you shot blast in Norwich?",
      answer: "We handle a wide range of materials, including steel structures, concrete floors, machinery, automotive parts, and delicate heritage stonework. We use various media, from steel grit for heavy-duty cleaning to softer abrasives for restoration projects."
    },
    {
      question: "Do you offer on-site shot blasting services in Norfolk?",
      answer: "Yes, we provide fully mobile, on-site shot blasting services across Norwich, Norfolk, and the wider East Anglia area. Our mobile units are equipped to handle large-scale infrastructure and construction projects at your location."
    },
    {
      question: "How does shot blasting compare to sandblasting?",
      answer: "Shot blasting uses centrifugal force to propel abrasive media (usually steel shot or grit) and is highly efficient for large, flat surfaces and heavy-duty cleaning. Sandblasting (or abrasive blasting) uses compressed air and is often better for intricate or smaller components. We offer both methods to suit your specific needs."
    }
  ];

  const norwichTestimonials = [
    {
      quote: "The team provided an exceptional service on our new factory floor in Norwich. The concrete preparation was flawless, allowing for a perfect epoxy coating application.",
      name: "Mark T.",
      company: "Norfolk Manufacturing Ltd."
    },
    {
      quote: "We needed urgent rust removal on a piece of marine equipment. The local Norwich crew was fast, professional, and the quality of the finish was outstanding.",
      name: "Sarah W.",
      company: "East Coast Marine Services"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
      {/* Header (Kept from Home.tsx) */}
      <header className="bg-[#2C5F7F] text-white sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/30">
              <span className="text-xl font-bold">SB</span>
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Shot Blasting</h1>
              <p className="text-xs text-white/80">Professional Surface Preparation</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="hover:text-white/80 transition">Services</a>
            <a href="#about" className="hover:text-white/80 transition">Why Choose Us</a>
            <a href="#industries" className="hover:text-white/80 transition">Local Industries</a>
            <a href="#testimonials" className="hover:text-white/80 transition">Testimonials</a>
            <a href="#faq" className="hover:text-white/80 transition">FAQ</a>
            <a href="#contact" className="hover:text-white/80 transition">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="tel:07970566409" className="hidden sm:flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4" />
              07970 566409
            </a>
            <Button className="bg-white text-[#2C5F7F] hover:bg-white/90">Get a Quote</Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="container py-4 bg-gray-50">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/service-areas">Service Areas</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Norwich</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section - Norwich Specific */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Professional Shot Blasting Services in Norwich
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Specialist precision shot blasting company serving **Norwich, Norfolk**, and the wider East Anglia region. We are the local experts in removing rust, scale, and coatings from all types of surfaces for the city's diverse industries.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90">
                Get a Free Quote for Your Norwich Project
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Our Local Work
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
              Norwich Project Transformation
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
              location="Norwich"
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

      

      {/* Services Grid (Kept from Home.tsx) */}
      <section id="services" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Expert Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Comprehensive Shot Blasting Solutions
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Steel Shot Blasting", desc: "High-performance cleaning for steel structures, removing rust, mill scale, and old coatings.", img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400" },
              { title: "Concrete Preparation", desc: "Surface profiling for optimal coating adhesion on floors, walls, and structural elements.", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400" },
              { title: "Rust Removal", desc: "Complete corrosion removal restoring metal surfaces to pristine condition.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
              { title: "Paint Stripping", desc: "Safe and effective removal of old paint, primers, and protective coatings.", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400" },
              { title: "Surface Profiling", desc: "Precision surface preparation achieving exact anchor patterns for coatings.", img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400" },
              { title: "Industrial Cleaning", desc: "Heavy-duty cleaning for machinery, equipment, and industrial components.", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400" },
            ].map((service, i) => (
              <Card key={i} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <a href="#contact" className="inline-flex items-center text-[#2C5F7F] font-medium hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Norwich Specific */}
      <section id="about" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Why Choose Our Norwich Team</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Local Expertise for The Fine City
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are a trusted family-run business with a dedicated team serving the **Norwich** area. Our mission is to provide superior shot blasting solutions for the city's diverse industrial, commercial, and heritage environments. We combine advanced shot blasting technology with a deep understanding of local requirements, delivering exceptional results at competitive prices.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                As part of our commitment to the East Anglia region, we employ an expert team dedicated to providing unparalleled services while maintaining high safety standards that protect both your property and the local environment. We are proud to support Norwich's rich industrial heritage and its growing modern sectors.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Fully Insured" },
                  { icon: Award, text: "Industry Certified" },
                  { icon: Clock, text: "Fast Turnaround" },
                  { icon: Users, text: "Local Norwich Experts" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-[#F5F1E8] rounded-lg">
                    <item.icon className="w-6 h-6 text-[#2C5F7F]" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600" alt="Professional shot blasting in Norwich" className="rounded-lg shadow-xl" />
              <div className="absolute -bottom-6 -left-6 bg-[#2C5F7F] text-white p-6 rounded-lg shadow-lg">
                <p className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>20+</p>
                <p className="text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Testimonials Section */}
      <section id="testimonials" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Trusted by Norwich Businesses</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Our Local Clients Say
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {norwichTestimonials.map((testimonial, i) => (
              <TestimonialCard key={i} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Norwich Specific */}
      <section className="py-16 bg-[#2C5F7F] text-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to Restore Your Norwich Property?
              </h2>
              <p className="text-white/80">Contact our local Norwich team today for a free, no-obligation quote.</p>
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

      {/* Industries Section - Norwich Specific */}
      <section id="industries" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Local Industries We Serve</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Supporting Norwich's Key Sectors
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {norwichIndustries.map((industry, i) => (
              <div key={i} className="bg-[#F5F1E8] p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <CheckCircle className="w-8 h-8 text-[#2C5F7F] mx-auto mb-3" />
                <p className="font-medium text-[#2C2C2C]">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-[#F5F1E8]">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Frequently Asked Questions</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Norwich Shot Blasting FAQs
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {norwichFAQs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-semibold text-[#2C2C2C] hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section (Kept from Home.tsx, minor text update) */}
      <section id="contact" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Get In Touch</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Request a Free Quote for Norwich
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form and our local Norwich team will get back to you within 24 hours with a detailed quote for your project.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-[#2C5F7F]" />
                  <a href="tel:07970566409" className="text-lg font-medium text-[#2C2C2C]">07970 566409</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-[#2C5F7F]" />
                  <a href="mailto:info@shotblasting.co.uk" className="text-lg font-medium text-[#2C2C2C]">info@shotblasting.co.uk</a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-[#2C5F7F] mt-1" />
                  <p className="text-lg text-[#2C2C2C]">
                    Serving Norwich, Norfolk, and the entire East Anglia Region
                  </p>
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
                  placeholder="Your Phone (Optional)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <Textarea
                  placeholder="Tell us about your project in Norwich (e.g., location, material, size)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  required
                />
                <Button type="submit" className="w-full bg-[#2C5F7F] hover:bg-[#1a3d52]">
                  Submit Request
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer (Kept from Home.tsx) */}
      
      {/* Service Area Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F7F] mb-4">
              Our Shot Blasting Services in Norwich
            </h2>
            <p className="text-lg text-gray-600">
              We provide professional shot blasting services throughout Norwich and the surrounding region. The map shows our primary service area with a 25-mile radius.
            </p>
          </div>
          <LocationMap locationName="Norwich" />
        </div>
      </section>

<footer className="bg-[#2C2C2C] text-white py-10">
        <div className="container text-center">
          <p className="text-sm text-white/70">
            &copy; {new Date().getFullYear()} Shot Blasting. All rights reserved. | Serving Norwich and the UK.
          </p>
        </div>
      </footer>
    </div>
  );
}
