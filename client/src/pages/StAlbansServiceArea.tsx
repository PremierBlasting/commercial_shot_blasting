import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Shield, Clock, Award, Users, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LocationMap } from "@/components/LocationMap";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { TrackedPhoneButton } from "@/components/TrackedPhoneButton";

// Mock Testimonials for St Albans
const localTestimonials = [
  { name: "David L.", location: "St Albans", text: "The team did an outstanding job on our commercial vehicle fleet. Fast, professional, and the finish was perfect. Highly recommend for any business in Hertfordshire." },
  { name: "Sarah K.", location: "Harpenden (near St Albans)", text: "We needed rust removed from a historic iron gate. The care and precision were exceptional. They truly respect the heritage of the St Albans area." },
  { name: "Mark T.", location: "Hatfield Road Industrial Estate", text: "Excellent service on our manufacturing equipment. Minimal downtime and a great result. Our go-to for industrial shot blasting in the St Albans district." },
];

// Mock FAQs for St Albans
const faqs = [
  { question: "Do you serve all areas within the St Albans City and District?", answer: "Yes, we provide full shot blasting services across the entire St Albans City and District, including Harpenden, Redbourn, Wheathampstead, and London Colney." },
  { question: "What industries in St Albans do you specialize in?", answer: "We frequently work with the local automotive repair sector, construction companies, and businesses involved in the restoration of St Albans' many historic buildings and infrastructure." },
  { question: "How long does a typical shot blasting project take in the St Albans area?", answer: "Project duration varies based on size and complexity. We offer a fast turnaround and will provide a detailed timeline with your free, no-obligation quote." },
  { question: "Are your services suitable for historic properties in St Albans?", answer: "Absolutely. We use specialized, non-destructive blasting media and techniques suitable for delicate surfaces, ensuring the preservation of historic structures common in St Albans." },
];

export default function StAlbansServiceArea() {
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

  // The main structure is adapted from Home.tsx
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Header (Placeholder - typically a shared component) */}
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
            <a href="#about" className="hover:text-white/80 transition">About</a>
            <a href="#industries" className="hover:text-white/80 transition">Industries</a>
            <Link href="/gallery" className="hover:text-white/80 transition">Gallery</Link>
            <a href="#contact" className="hover:text-white/80 transition">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button className="bg-white text-[#2C5F7F] hover:bg-white/90">Get a Quote</Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="container py-4 bg-gray-50">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/service-areas">Service Areas</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/hertfordshire">Hertfordshire</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>St Albans</BreadcrumbPage>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Hero Section - Location Specific */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Expert Shot Blasting Services in St Albans, Hertfordshire
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Serving the historic city of St Albans and the wider Hertfordshire region with professional, high-quality surface preparation and restoration. We are the trusted choice for local businesses and residents.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90">
                Get a Free Quote in St Albans
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
              St Albans Project Transformation
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
              location="St Albans"
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

      

      {/* Why Choose Us Section - Location Specific */}
      <section id="about" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Why Choose Us in St Albans</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Local, Trusted Shot Blasting Partner
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are dedicated to providing superior shot blasting solutions specifically tailored for the needs of the St Albans and Hertfordshire area. Our local knowledge ensures we understand the unique requirements of projects, from modern commercial sites to the city's historic infrastructure.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our advanced technology and expert team deliver exceptional results, whether you require rust removal for construction in the city centre or surface preparation for a manufacturing facility near the M25.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Local St Albans Expertise" },
                  { icon: Award, text: "Certified & Insured" },
                  { icon: Clock, text: "Fast Hertfordshire Service" },
                  { icon: Users, text: "Dedicated Expert Team" },
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

      {/* Services Grid (Same as template) */}
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

      {/* Industries Section - Location Specific */}
      <section id="industries" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Industries We Serve in St Albans</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Supporting St Albans' Key Economic Sectors
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              "Automotive & Fleet Repair", "Local Construction", "Historic Restoration", "Manufacturing & Engineering", "Commercial Property",
              "Infrastructure & Rail", "Small Business & Retail", "Agricultural Equipment", "Marine (Narrowboats)", "General Fabrication"
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
      <section className="py-20 bg-[#2C5F7F] text-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-white/80 font-medium mb-2">What Our St Albans Clients Say</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Trusted by Businesses and Residents in Hertfordshire
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {localTestimonials.map((testimonial, i) => (
              <Card key={i} className="p-6 bg-white text-[#2C2C2C] shadow-xl">
                <div className="flex text-yellow-500 mb-3">
                  <Star fill="currentColor" className="w-5 h-5" /><Star fill="currentColor" className="w-5 h-5" /><Star fill="currentColor" className="w-5 h-5" /><Star fill="currentColor" className="w-5 h-5" /><Star fill="currentColor" className="w-5 h-5" />
                </div>
                <p className="italic mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">St Albans Service Area FAQs</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Answers to Your Local Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section - Location Specific */}
      <section className="py-16 bg-[#1a3d52] text-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready for Shot Blasting in St Albans?
              </h2>
              <p className="text-white/80">Contact our Hertfordshire team today for a free, no-obligation quote.</p>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90">Get Your St Albans Quote</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="w-4 h-4 mr-2" /> Call Our Local Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section (Same as template) */}
      <section id="contact" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Get In Touch</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Request a Free Quote
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form and our team will get back to you within 24 hours with a detailed quote for your project.
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
                    <p className="font-medium">St Albans, Hertfordshire & Nationwide UK Coverage</p>
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
                  <Textarea placeholder="Tell us about your project in St Albans..." rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required />
                </div>
                <Button type="submit" className="w-full bg-[#2C5F7F] hover:bg-[#234d66]">
                  Request a Quote
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer (Placeholder - typically a shared component) */}
      
      {/* Service Area Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F7F] mb-4">
              Our StAlbans Service Area
            </h2>
            <p className="text-lg text-gray-600">
              We provide professional shot blasting services throughout StAlbans and the surrounding region. The map shows our primary service area with a 25-mile radius.
            </p>
          </div>
          <LocationMap locationName="StAlbans" />
        </div>
      </section>

<footer className="bg-[#1a3d52] text-white py-12">
        <div className="container">
          <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
            <p>&copy; {new Date().getFullYear()} Shot Blasting Services. Serving St Albans, Hertfordshire. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
