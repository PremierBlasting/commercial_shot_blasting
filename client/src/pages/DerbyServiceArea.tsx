import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Shield, Clock, Award, Users, Quote, HelpCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LocationMap } from "@/components/LocationMap";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { TrackedPhoneButton } from "@/components/TrackedPhoneButton"; // Assuming Accordion is available

export default function DerbyServiceArea() {
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

  const services = [
    { title: "Steel Shot Blasting", desc: "High-performance cleaning for steel structures, crucial for Derby's rail and construction projects.", img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400" },
    { title: "Concrete Preparation", desc: "Surface profiling for optimal coating adhesion on floors and structural elements in Derby's industrial parks.", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400" },
    { title: "Rust Removal", desc: "Complete corrosion removal restoring metal surfaces to pristine condition, vital for heritage and industrial assets.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
    { title: "Paint Stripping", desc: "Safe and effective removal of old paint, primers, and protective coatings from aerospace and automotive components.", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400" },
    { title: "Surface Profiling", desc: "Precision surface preparation achieving exact anchor patterns for coatings, meeting Rolls-Royce and Alstom standards.", img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400" },
    { title: "Industrial Cleaning", desc: "Heavy-duty cleaning for machinery, equipment, and industrial components in Derby's manufacturing facilities.", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400" },
  ];

  const derbyIndustries = [
    "Aerospace (Rolls-Royce)", "Rail (Alstom)", "Automotive (Toyota)", "Advanced Manufacturing", "Construction & Infrastructure",
    "Heritage Restoration", "Engineering", "Logistics & Supply Chain", "Foundry & Metalwork", "Local Commercial"
  ];

  const derbyTestimonials = [
    { quote: "The surface preparation on our rail components was flawless. The team understood the high standards required for Alstom's supply chain.", name: "Mark J.", company: "Derby Rail Supplier" },
    { quote: "Exceptional service for our aerospace tooling. The precision shot blasting met all our stringent quality control checks.", name: "Sarah K.", company: "Aerospace Engineering Firm, Derby" },
    { quote: "Fast, professional, and reliable. They handled the rust removal on our vintage machinery perfectly. Highly recommend to any Derby business.", name: "David P.", company: "Local Restoration Workshop" },
  ];

  const derbyFaqs = [
    { question: "Do you handle large components for Derby's rail industry?", answer: "Yes, we have the capacity and specialized equipment to handle large-scale components, including bogies and structural elements, common in the rail sector." },
    { question: "What safety standards do you adhere to for aerospace projects?", answer: "We adhere to strict industry safety and quality standards, including specific surface cleanliness and profile requirements essential for aerospace coatings and materials." },
    { question: "Are your services mobile within the East Midlands region?", answer: "Absolutely. While we are based near Derby, our mobile units are fully equipped to serve clients across the entire East Midlands, including Nottingham, Leicester, and beyond." },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Header (Keep as is for site navigation) */}
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
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container">
          <Breadcrumb className="py-3">
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
                <BreadcrumbLink href="/service-areas/derby">Derby</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section - Derby Focus */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Precision Shot Blasting Services for Derby's Advanced Industries
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              As Derby's surface preparation specialists, we deliver high-quality, reliable shot blasting for the city's world-leading aerospace, rail, and automotive sectors.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90">
                Get a Free Quote Today
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Our Derby Case Studies
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
              Derby Project Transformation
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
              location="Derby"
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

      

      {/* Why Choose Us Section - Derby Focus */}
      <section id="about" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Why Choose Us in Derby</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Trusted by Derby's Industry Leaders
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are a trusted family-run business with a deep understanding of the **specific needs of Derby's advanced manufacturing and transport sectors**. Our advanced shot blasting technology delivers exceptional results at competitive prices, meeting the stringent quality demands of companies like Rolls-Royce and Alstom.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our expert team is dedicated to providing unparalleled services, ensuring precision surface preparation for critical components in the aerospace, rail, and automotive supply chains. We maintain high safety standards that protect both your property and our environment.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Fully Insured & Certified" },
                  { icon: Award, text: "Aerospace & Rail Compliant" },
                  { icon: Clock, text: "Fast Turnaround for Production" },
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
              <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600" alt="Professional shot blasting in Derby" className="rounded-lg shadow-xl" />
              <div className="absolute -bottom-6 -left-6 bg-[#2C5F7F] text-white p-6 rounded-lg shadow-lg">
                <p className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>20+</p>
                <p className="text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Derby Context */}
      <section id="services" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Expert Services in Derby</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Comprehensive Surface Preparation for Derby
            </h2>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              Our full range of shot blasting services is tailored to support the diverse needs of the Derby economy, from heavy industrial components to delicate heritage restoration projects.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
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

      {/* Industries Section - Derby Focus */}
      <section id="industries" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Industries We Serve in Derby</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Specialist Solutions for Derby's Key Sectors
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {derbyIndustries.map((industry, i) => (
              <div key={i} className="bg-[#F5F1E8] p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <CheckCircle className="w-8 h-8 text-[#2C5F7F] mx-auto mb-3" />
                <p className="font-medium text-[#2C2C2C]">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Testimonials Section */}
      <section id="testimonials" className="py-20 bg-[#2C5F7F] text-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-white/80 font-medium mb-2">What Our Derby Clients Say</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Trusted by Local Businesses
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {derbyTestimonials.map((testimonial, i) => (
              <Card key={i} className="bg-white text-[#2C2C2C] p-6 shadow-lg">
                <Quote className="w-8 h-8 text-[#2C5F7F] mb-4" />
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.company}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Derby Service Area FAQs</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Answers to Your Questions
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {derbyFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-medium text-[#2C5F7F] hover:no-underline">
                    <HelpCircle className="w-5 h-5 mr-3" /> {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pl-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section - Derby Focus */}
      <section className="py-16 bg-[#2C5F7F] text-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to partner with Derby's surface preparation specialists?
              </h2>
              <p className="text-white/80">Contact us today for a free, no-obligation quote tailored to your Derby project.</p>
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

      {/* Contact Section (Keep as is) */}
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
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#2C5F7F] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#2C2C2C]">Derby Service Area Office</h3>
                    <p className="text-gray-600">Serving Derby, East Midlands, and surrounding areas.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-[#2C5F7F] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#2C2C2C]">Call Us</h3>
                    <p className="text-gray-600">07970 566409 (24/7 Service)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[#2C5F7F] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#2C2C2C]">Email Us</h3>
                    <p className="text-gray-600">info@shotblasting.co.uk</p>
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
                  placeholder="Your Phone (Optional)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <Textarea
                  placeholder="Tell us about your project in Derby..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  required
                />
                <Button type="submit" className="w-full bg-[#2C5F7F] hover:bg-[#1a3d52]" disabled={submitContact.isPending}>
                  {submitContact.isPending ? "Sending..." : "Request Quote"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer (Keep as is) */}
      
      {/* Service Area Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F7F] mb-4">
              Our Shot Blasting Services in Derby
            </h2>
            <p className="text-lg text-gray-600">
              We provide professional shot blasting services throughout Derby and the surrounding region. The map shows our primary service area with a 25-mile radius.
            </p>
          </div>
          <LocationMap locationName="Derby" />
        </div>
      </section>

<footer className="bg-[#1a3d52] text-white py-10">
        <div className="container text-center">
          <p className="text-sm text-white/70">&copy; {new Date().getFullYear()} Shot Blasting UK. All rights reserved. | Serving Derby and the East Midlands.</p>
        </div>
      </footer>
    </div>
  );
}
