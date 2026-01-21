import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Shield, Clock, Award, Users, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LocationMap } from "@/components/LocationMap";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { TrackedPhoneButton } from "@/components/TrackedPhoneButton";

// Placeholder for a simple Breadcrumb component, as one was not found in the UI components
const Breadcrumb = ({ items }: { items: { label: string; href?: string }[] }) => (
  <nav className="flex" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm text-white/80">
      {items.map((item, index) => (
        <li key={index} className="inline-flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-1" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-white transition">
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-medium">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

// Placeholder for a simple FAQ component
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-semibold text-lg text-[#2C5F7F] hover:text-[#1a3d52]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <span className="ml-6">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <p className="mt-2 text-gray-600 pr-6">{answer}</p>
      )}
    </div>
  );
};


export default function NottinghamServiceArea() {
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

  const locationName = "Nottingham";
  const regionName = "East Midlands";

  // --- Content Data for Nottingham ---
  const nottinghamIndustries = [
    "Manufacturing", "Construction", "Logistics & Distribution", "Heritage Restoration",
    "Automotive", "Rail Infrastructure", "Aerospace", "Commercial Property"
  ];

  const nottinghamTestimonials = [
    { quote: "The team did an outstanding job on our factory floor in Beeston. Fast, professional, and the finish was perfect for our new coating.", name: "David K.", company: "Nottingham Manufacturing Co." },
    { quote: "We used their services for the restoration of a historic building near the Lace Market. The care and precision were exceptional.", name: "Sarah M.", company: "Heritage Project Manager" },
    { quote: "Excellent service for our fleet maintenance depot in the East Midlands Gateway area. Highly recommend for industrial cleaning.", name: "Tom B.", company: "Logistics Operations" },
  ];

  const nottinghamFAQ = [
    { question: `Do you cover the wider ${regionName} area?`, answer: `Yes, while we are based in ${locationName}, our services extend across the entire ${regionName} region, including Derby, Leicester, Lincoln, and surrounding areas.` },
    { question: "What is your typical turnaround time for a project in Nottingham?", answer: "Turnaround time depends on the project size and complexity. However, for most commercial projects in the Nottingham area, we aim for completion within 1-3 working days after the initial site survey." },
    { question: "Are your services suitable for historic buildings like those in the Lace Market?", answer: "Absolutely. We offer specialist, non-destructive blasting techniques perfect for sensitive heritage restoration projects, ensuring the integrity of historic materials." },
  ];
  // -----------------------------------

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />


      {/* Hero Section - Adapted for Nottingham */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-16 lg:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10">
          {/* Breadcrumb Navigation */}
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Service Areas", href: "/service-areas" },
            { label: regionName, href: `/service-areas/${regionName.toLowerCase().replace(/\s/g, '-')}` },
            { label: locationName },
          ]} />

          <div className="max-w-4xl mt-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Specialist Shot Blasting Services in {locationName}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Your local experts for precision surface preparation, rust removal, and industrial cleaning across {locationName} and the wider {regionName}. We serve the city's vital **Manufacturing**, **Construction**, and **Heritage Restoration** sectors.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90">
                Get a Free Quote in {locationName}
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
              Nottingham Project Transformation
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
              location="Nottingham"
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

      

      {/* Why Choose Us Section - Adapted for Nottingham */}
      <section id="about" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Why Choose Us in {locationName}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                The Trusted Shot Blasting Partner for the {regionName}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are a trusted family-run business with the mission to provide superior shot blasting solutions for industrial and commercial environments across the UK. Our advanced shot blasting technology delivers exceptional results at competitive prices, with a dedicated local team serving the **Nottinghamshire** area.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our commitment to the local community means we understand the specific needs of Nottingham's diverse industries, from the historic Lace Market to modern industrial parks like the East Midlands Gateway. We maintain high safety standards that protect both your property and our environment.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Fully Insured" },
                  { icon: Award, text: "Industry Certified" },
                  { icon: Clock, text: "Fast Turnaround" },
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
              <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600" alt="Professional shot blasting in Nottingham" className="rounded-lg shadow-xl" />
              <div className="absolute -bottom-6 -left-6 bg-[#2C5F7F] text-white p-6 rounded-lg shadow-lg">
                <p className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>20+</p>
                <p className="text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Copied from Home.tsx (General Services) */}
      <section id="services" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Expert Services in {locationName}</p>
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
                  <a href="/contact" className="inline-flex items-center text-[#2C5F7F] font-medium hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section - Adapted for Nottingham */}
      <section id="industries" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Industries We Serve in {locationName}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Supporting Nottingham's Key Economic Sectors
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {nottinghamIndustries.map((industry, i) => (
              <div key={i} className="bg-[#F5F1E8] p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <CheckCircle className="w-8 h-8 text-[#2C5F7F] mx-auto mb-3" />
                <p className="font-medium text-[#2C2C2C]">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Testimonials Section - New Section */}
      <section id="testimonials" className="py-20 bg-[#2C5F7F] text-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-white/80 font-medium mb-2">What Our {locationName} Clients Say</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Trusted by Local Businesses
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {nottinghamTestimonials.map((testimonial, i) => (
              <Card key={i} className="bg-white text-[#2C2C2C] p-6 shadow-lg">
                <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                <div className="font-semibold">
                  {testimonial.name}
                  <span className="block text-sm font-normal text-gray-500">{testimonial.company}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - New Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Frequently Asked Questions</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              About Our {locationName} Services
            </h2>
          </div>
          <div className="space-y-4">
            {nottinghamFAQ.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Copied from Home.tsx */}
      <section className="py-16 bg-[#2C5F7F] text-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to Transform Your Surfaces in {locationName}?
              </h2>
              <p className="text-white/80">Contact us today for a free, no-obligation quote.</p>
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

      {/* Contact Section - Adapted from Home.tsx */}
      <section id="contact" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Get In Touch</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Request a Free Quote for Your {locationName} Project
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form and our team dedicated to the {regionName} area will get back to you within 24 hours with a detailed quote for your project.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-[#2C5F7F]" />
                  <p className="text-gray-700">Serving {locationName} and all of the {regionName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-[#2C5F7F]" />
                  <p className="text-gray-700">07970 566409 (Local Line)</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-[#2C5F7F]" />
                  <p className="text-gray-700">nottingham@shotblasting.co.uk</p>
                </div>
              </div>
            </div>
            <Card className="p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder={`Tell us about your project in ${locationName} (e.g., steel structure, concrete floor, historic facade)`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  required
                />
                <Button type="submit" className="w-full bg-[#2C5F7F] hover:bg-[#1a3d52]">
                  Request Quote
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer - Copied from Home.tsx */}
      
      {/* Service Area Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F7F] mb-4">
              Our Shot Blasting Services in Nottingham
            </h2>
            <p className="text-lg text-gray-600">
              We provide professional shot blasting services throughout Nottingham and the surrounding region. The map shows our primary service area with a 25-mile radius.
            </p>
          </div>
          <LocationMap locationName="Nottingham" />
        </div>
      </section>

<footer className="bg-[#2C2C2C] text-white py-10">
        <div className="container text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Shot Blasting Specialists. All rights reserved. Serving {locationName} and the {regionName}.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-white/80 transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/80 transition">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
