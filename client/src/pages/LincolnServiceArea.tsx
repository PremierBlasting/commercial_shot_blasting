import { Link } from "wouter";
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Shield, Clock, Award, Users, Factory, Truck, Wheat, Lock, Construction } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { LocationMap } from "@/components/LocationMap";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { TrackedPhoneButton } from "@/components/TrackedPhoneButton";

// --- Location-Specific Data ---
const LOCATION_NAME = "Lincoln";
const REGION_NAME = "Lincolnshire";
const CONTACT_PHONE = "07970 566409"; // Using the same number as Home.tsx for consistency

const INDUSTRIES_SERVED = [
  { name: "Advanced Manufacturing", icon: Factory, desc: "Precision surface preparation for Lincoln's engineering and manufacturing sector." },
  { name: "Agrifood & Technology", icon: Wheat, desc: "Specialist cleaning for agricultural machinery and food processing facilities." },
  { name: "Logistics & Distribution", icon: Truck, desc: "Blasting services for warehouse floors, fleet vehicles, and distribution hubs." },
  { name: "Defence & Security", icon: Lock, desc: "High-security, compliant surface treatment for defence-related infrastructure and equipment." },
  { name: "Construction & Infrastructure", icon: Construction, desc: "Preparation of concrete and steel for new builds and restoration projects." },
];

const TESTIMONIALS = [
  { quote: "The team provided an exceptional service on our factory floor. Fast, professional, and the finish was perfect. Highly recommend for any industrial job in Lincoln.", name: "David K.", company: "Lincoln Engineering Solutions" },
  { quote: "We needed urgent rust removal on our fleet of agricultural machinery. Shot Blasting's mobile unit in Lincolnshire was quick to respond and delivered brilliant results.", name: "Sarah J.", company: "Fenland Farms Ltd." },
  { quote: "Excellent work on preparing our new warehouse floor for epoxy coating. They worked around our schedule and left the site spotless.", name: "Mark P.", company: "East Midlands Logistics Hub" },
];

const FAQS = [
  { question: `Do you offer mobile shot blasting services in ${LOCATION_NAME}?`, answer: `Yes, our fully equipped mobile units cover all of ${LOCATION_NAME} and the wider ${REGION_NAME} area, allowing us to perform on-site work at your location.` },
  { question: "What is the typical turnaround time for a project in the area?", answer: "Turnaround time depends on the project size and complexity. We pride ourselves on efficiency and will provide a clear timeline with your free quote, often completing smaller jobs within a day." },
  { question: "Are your services suitable for historic buildings in Lincoln?", answer: "We offer specialized, gentle blasting techniques, such as soda or sponge blasting, which are ideal for the restoration of historic and listed buildings, ensuring no damage to the underlying structure." },
];

// --- Component Structure (Adapted from Home.tsx) ---

const ContactForm = ({ formData, setFormData, handleSubmit, submitContact }: { formData: { name: string; email: string; phone: string; message: string }; setFormData: React.Dispatch<React.SetStateAction<{ name: string; email: string; phone: string; message: string }>>; handleSubmit: (e: React.FormEvent) => void; submitContact: { isPending: boolean } }) => (
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
      placeholder="Tell us about your project in Lincoln..."
      value={formData.message}
      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      rows={5}
      required
    />
    <Button type="submit" size="lg" className="w-full bg-[#2C5F7F] hover:bg-[#1a3d52]" disabled={submitContact.isPending}>
      {submitContact.isPending ? "Submitting..." : "Request Free Quote"}
    </Button>
  </form>
);

export default function LincolnServiceArea() {
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
                <Link href="/services">Services</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/service-area/${REGION_NAME.toLowerCase().replace(/\s/g, '-')}`}>{REGION_NAME}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-[#2C5F7F] font-medium">{LOCATION_NAME}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section (Location Name) */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Expert Shot Blasting Services in {LOCATION_NAME}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Specialist precision shot blasting company serving {LOCATION_NAME}'s key sectors, including Advanced Manufacturing, Agrifood, and Logistics. We deliver superior surface preparation across {REGION_NAME}.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90">
                Get a Free Quote in {LOCATION_NAME}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Call {CONTACT_PHONE}
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
              Lincoln Project Transformation
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
              location="Lincoln"
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

      

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Why Choose Us in {LOCATION_NAME}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Local Expertise, National Standards
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are proud to be a trusted partner for businesses and residents in {LOCATION_NAME}. Our team combines deep local knowledge of {REGION_NAME}'s industrial landscape with the highest national standards for shot blasting and surface preparation.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our commitment to {LOCATION_NAME} means fast response times, flexible scheduling to minimize disruption to your operations, and a dedication to supporting the local economy.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Fully Insured & Certified" },
                  { icon: Award, text: "Serving Lincolnshire" },
                  { icon: Clock, text: "Rapid Local Response" },
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
              <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600" alt="Professional shot blasting in Lincoln" className="rounded-lg shadow-xl" />
              <div className="absolute -bottom-6 -left-6 bg-[#2C5F7F] text-white p-6 rounded-lg shadow-lg">
                <p className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{LOCATION_NAME}</p>
                <p className="text-sm">Service Area</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (Using Home.tsx structure) */}
      <section id="services" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Expert Services in {LOCATION_NAME}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Comprehensive Surface Preparation Solutions
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

      {/* Industries Served Section (Location-Specific) */}
      <section id="industries" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Industries We Serve in {LOCATION_NAME}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Supporting {LOCATION_NAME}'s Key Economic Sectors
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {INDUSTRIES_SERVED.map((industry, i) => (
              <Card key={i} className="p-6 text-center hover:shadow-lg transition-shadow">
                <industry.icon className="w-10 h-10 text-[#2C5F7F] mx-auto mb-4" />
                <h3 className="font-bold text-[#2C2C2C] mb-2">{industry.name}</h3>
                <p className="text-sm text-gray-600">{industry.desc}</p>
              </Card>
            ))}
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
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, i) => (
              <Card key={i} className="p-6 shadow-md">
                <p className="text-lg italic text-gray-700 mb-4">"{testimonial.quote}"</p>
                <div className="font-semibold text-[#2C5F7F]">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.company}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Frequently Asked Questions</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Answers for Our {LOCATION_NAME} Customers
              </h2>
              <p className="text-gray-600 mb-8">
                Find quick answers to the most common questions about our shot blasting services in the {REGION_NAME} area.
              </p>
              <Button className="bg-[#2C5F7F] hover:bg-[#1a3d52]">Contact Us Directly</Button>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="font-semibold text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-16 bg-[#2C5F7F] text-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Start Your {LOCATION_NAME} Project Today
              </h2>
              <p className="text-white/80">Contact us for a free, no-obligation quote tailored to your needs in {LOCATION_NAME}.</p>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90">Get a Quote Now</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="w-4 h-4 mr-2" /> Call {CONTACT_PHONE}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section (Re-using Home.tsx structure for form) */}
      <section id="contact" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Get In Touch</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Request a Free Quote for {LOCATION_NAME}
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form and our local team will get back to you within 24 hours with a detailed quote for your project in {LOCATION_NAME}.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5 text-[#2C5F7F]" />
                  <span>Call us: {CONTACT_PHONE}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5 text-[#2C5F7F]" />
                  <span>Email: info@shotblasting.co.uk</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-[#2C5F7F]" />
                  <span>Serving {LOCATION_NAME} and all of {REGION_NAME}</span>
                </div>
              </div>
            </div>
            <Card className="p-8 shadow-lg">
              <ContactForm
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                submitContact={submitContact}
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Footer (Placeholder for completeness) */}
      
      {/* Service Area Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F7F] mb-4">
              Our Shot Blasting Services in Lincoln
            </h2>
            <p className="text-lg text-gray-600">
              We provide professional shot blasting services throughout Lincoln and the surrounding region. The map shows our primary service area with a 25-mile radius.
            </p>
          </div>
          <LocationMap locationName="Lincoln" />
        </div>
      </section>

<footer className="bg-[#2C2C2C] text-white py-8">
        <div className="container text-center text-sm">
          &copy; {new Date().getFullYear()} Shot Blasting. All rights reserved. Serving {LOCATION_NAME}, {REGION_NAME}.
        </div>
      </footer>
    </div>
  );
}
