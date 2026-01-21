import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Shield, Clock, Award, Users, Home as HomeIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { LocationMap } from "@/components/LocationMap";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { TrackedPhoneButton } from "@/components/TrackedPhoneButton";

// --- Gloucester Specific Content ---
const LOCATION_NAME = "Gloucester";
const REGION_NAME = "Gloucestershire";
const HERO_TITLE = `Professional Shot Blasting Services in ${LOCATION_NAME}`;
const HERO_TEXT = `Specialist precision shot blasting company serving ${LOCATION_NAME} and the wider ${REGION_NAME} region. We provide expert surface preparation for the city's key sectors, including Aerospace, Advanced Manufacturing, and Construction. Transform your surfaces with our expert team.`;

const GLOUCESTER_INDUSTRIES = [
  "Aerospace & Aviation",
  "Advanced Manufacturing",
  "Construction & Infrastructure",
  "Agri-tech & Farming Equipment",
  "Rail Infrastructure",
  "Industrial Machinery",
  "Heritage Restoration",
  "Marine & Docks"
];

const GLOUCESTER_TESTIMONIALS = [
  {
    quote: "The team provided an exceptional service on our factory floor in Gloucester. The concrete preparation was flawless, allowing us to apply the new coating ahead of schedule. Highly recommend for any industrial work in the area.",
    author: "Operations Manager, Gloucester Manufacturing Plant",
  },
  {
    quote: "Fast, professional, and excellent results on our steel structure rust removal project near the docks. They clearly understand the local environment and delivered on time.",
    author: "Project Lead, Gloucester Docks Development",
  }
];

const GLOUCESTER_FAQS = [
  {
    question: "What is shot blasting and why is it needed in Gloucester?",
    answer: "Shot blasting is a method of surface preparation that uses a stream of abrasive material (shot) propelled at high velocity to clean, strengthen, or polish metal and concrete surfaces. In Gloucester's key sectors like Aerospace and Manufacturing, it's essential for preparing components and structures for high-performance coatings, ensuring longevity and compliance with strict industry standards."
  },
  {
    question: "Do you serve the wider Gloucestershire area?",
    answer: "Yes, while we are based in Gloucester, we regularly serve clients across Cheltenham, Stroud, Tewkesbury, and the entire Gloucestershire region, including the M5 corridor and surrounding industrial parks."
  },
  {
    question: "What materials can be shot blasted?",
    answer: "We handle a wide range of materials, including steel, concrete, aluminium, and other alloys. Our services are tailored for heavy-duty industrial applications, rust removal, paint stripping, and surface profiling."
  }
];

// --- Component ---
export default function GloucesterServiceArea() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
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
      {/* Header (Copied from Home.tsx) */}
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
            <a href="tel:07970566409" className="hidden sm:flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4" />
              07970 566409
            </a>
            <Button className="bg-white text-[#2C5F7F] hover:bg-white/90">Get a Quote</Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="container py-4 bg-white">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/"><HomeIcon className="w-4 h-4" /></Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/uk">UK</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${REGION_NAME.toLowerCase()}`}>{REGION_NAME}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{LOCATION_NAME}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section (Location Specific) */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              {HERO_TITLE}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              {HERO_TEXT}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90">
                Get a Free Quote in {LOCATION_NAME}
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
              Gloucester Project Transformation
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
              location="Gloucester"
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

      

      {/* Services Grid (Generic, as per template) */}
      <section id="services" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Expert Services in {LOCATION_NAME}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Comprehensive Shot Blasting Solutions
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Steel Shot Blasting", desc: "High-performance cleaning for steel structures, removing rust, mill scale, and old coatings.", img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400" },
              { title: "Concrete Preparation", desc: "Surface profiling for optimal coating adhesion on floors, walls, and structural elements for Gloucester's industrial sites.", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400" },
              { title: "Rust Removal", desc: "Complete corrosion removal restoring metal surfaces to pristine condition, vital for the local marine and manufacturing sectors.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
              { title: "Paint Stripping", desc: "Safe and effective removal of old paint, primers, and protective coatings.", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400" },
              { title: "Surface Profiling", desc: "Precision surface preparation achieving exact anchor patterns for coatings, meeting Aerospace standards.", img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400" },
              { title: "Industrial Cleaning", desc: "Heavy-duty cleaning for machinery, equipment, and industrial components across the ${REGION_NAME} area.", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400" },
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

      {/* Why Choose Us Section (Location Specific) */}
      <section id="about" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Why Choose Us in {LOCATION_NAME}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Local Shot Blasting Experts
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are a trusted family-run business with a deep understanding of the industrial landscape in {LOCATION_NAME} and {REGION_NAME}. Our mission is to provide superior shot blasting solutions for the region's commercial and industrial environments. Our advanced technology delivers exceptional results with local, fast turnaround times.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                As part of our commitment to the local community, we employ an expert team dedicated to providing unparalleled services while maintaining high safety standards that protect both your property and our environment. We are perfectly positioned to serve the M5 corridor and all major industrial estates around {LOCATION_NAME}.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Fully Insured" },
                  { icon: Award, text: "Industry Certified" },
                  { icon: Clock, text: "Fast Local Turnaround" },
                  { icon: Users, text: "Expert Local Team" },
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

      {/* Local Testimonials Section */}
      <section id="testimonials" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">What Our {LOCATION_NAME} Clients Say</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Trusted by Local Businesses
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {GLOUCESTER_TESTIMONIALS.map((testimonial, i) => (
              <Card key={i} className="p-6 shadow-lg">
                <blockquote className="text-lg italic text-gray-700 mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <p className="font-semibold text-[#2C5F7F]">- {testimonial.author}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section (Location Specific) */}
      <section id="industries" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Industries We Serve in {LOCATION_NAME}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Supporting Gloucester's Key Sectors
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {GLOUCESTER_INDUSTRIES.map((industry, i) => (
              <div key={i} className="bg-[#F5F1E8] p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <CheckCircle className="w-8 h-8 text-[#2C5F7F] mx-auto mb-3" />
                <p className="font-medium text-[#2C2C2C]">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (Location Specific) */}
      <section id="faq" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Frequently Asked Questions</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Answers to Your Shot Blasting Queries
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {GLOUCESTER_FAQS.map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-[#2C5F7F] mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (Location Specific) */}
      <section className="py-16 bg-[#2C5F7F] text-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to Transform Your Surfaces in {LOCATION_NAME}?
              </h2>
              <p className="text-white/80">Contact your local {LOCATION_NAME} experts today for a free, no-obligation quote.</p>
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
                Request a Free Quote
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form and our team will get back to you within 24 hours with a detailed quote for your project in {LOCATION_NAME}.
              </p>
              <div className="space-y-6">
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
                    <p className="font-medium">Serving {LOCATION_NAME} and {REGION_NAME}</p>
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
                  <Textarea placeholder="Tell us about your project..." rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required />
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
              Our Shot Blasting Services in Gloucester
            </h2>
            <p className="text-lg text-gray-600">
              We provide professional shot blasting services throughout Gloucester and the surrounding region. The map shows our primary service area with a 25-mile radius.
            </p>
          </div>
          <LocationMap locationName="Gloucester" />
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
              <p className="text-white/70 text-sm">Professional shot blasting services for industrial and commercial applications across the UK, including {LOCATION_NAME}.</p>
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
                <li><Link href="/gallery" className="hover:text-white">Gallery</Link></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>07970 566409</li>
                <li>info@shotblasting.co.uk</li>
                <li>Serving {LOCATION_NAME} and {REGION_NAME}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
            <p>&copy; {new Date().getFullYear()} Shot Blasting Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
