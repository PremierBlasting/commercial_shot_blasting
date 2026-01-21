import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Shield, Clock, Award, Users, Factory, Car, Hammer, HardHat, TrainFront, Building2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { LocationMap } from "@/components/LocationMap"; // Assuming this component exists
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { TrackedPhoneButton } from "@/components/TrackedPhoneButton";

const WOLVERHAMPTON_INDUSTRIES = [
  { name: "Advanced Manufacturing", icon: Factory, desc: "Precision cleaning for machinery, components, and tooling in Wolverhampton's high-tech sector." },
  { name: "Automotive & Aerospace", icon: Car, desc: "Surface preparation for vehicle parts, engine components, and specialized aerospace materials." },
  { name: "Metal Fabrication & Engineering", icon: Hammer, desc: "Rust and scale removal for structural steel, fabricated parts, and heavy engineering projects." },
  { name: "Construction & Infrastructure", icon: HardHat, desc: "Concrete floor preparation, steel beam cleaning, and surface profiling for new builds and repairs." },
  { name: "Rail & Transport", icon: TrainFront, desc: "Blasting services for rolling stock, track components, and transport infrastructure." },
  { name: "Historic Building Restoration", icon: Building2, desc: "Sensitive cleaning of historic brickwork, stone, and metal structures in the city centre." },
];

const WOLVERHAMPTON_TESTIMONIALS = [
  { quote: "The team did an outstanding job on our factory floor. The preparation for the new epoxy coating was flawless, and the service was fast and professional. Highly recommend for any Wolverhampton-based manufacturer.", name: "David K.", title: "Operations Manager, Bilston" },
  { quote: "We needed a quick turnaround on some structural steel for a new development near the Molineux. Shot Blasting delivered ahead of schedule and the quality was superb. Our go-to for all construction projects in the West Midlands.", name: "Sarah J.", title: "Project Lead, Construction Firm" },
];

const WOLVERHAMPTON_FAQS = [
  { question: "Do you offer on-site shot blasting services in Wolverhampton?", answer: "Yes, we provide mobile, on-site shot blasting services across Wolverhampton and the wider West Midlands area for large structures and fixed equipment." },
  { question: "What types of surfaces can you blast?", answer: "We handle a wide range of materials including steel, concrete, brick, stone, and various metals. Our services are tailored to the specific needs of Wolverhampton's diverse industrial base." },
  { question: "How long does a typical shot blasting job take?", answer: "The duration depends on the size and complexity of the project. We provide a detailed timeline with every quote, aiming for minimal disruption to your Wolverhampton business operations." },
  { question: "Are your services compliant with local Wolverhampton council regulations?", answer: "Absolutely. We adhere to all relevant health, safety, and environmental regulations, ensuring a fully compliant and responsible service for all our Wolverhampton clients." },
];

export default function WolverhamptonServiceArea() {
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
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-100 py-3">
        <div className="container">
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
              <BreadcrumbPage>Wolverhampton</BreadcrumbPage>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section - Wolverhampton Specific */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Expert Shot Blasting Services in Wolverhampton
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Serving Wolverhampton's rich industrial heritage, from advanced manufacturing to historic restoration. We provide specialist precision shot blasting to remove rust, scale, and coatings from all types of surfaces across the city.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90">
                Get a Free Quote in Wolverhampton
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Our Local Projects
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
              Wolverhampton Project Transformation
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
              location="Wolverhampton"
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

      {/* Why Choose Us Section - Wolverhampton Context */}
      <section id="why-choose-us" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Why Choose Us in Wolverhampton</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                The Trusted Partner for Wolverhampton's Industry
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                As a dedicated service provider in the West Midlands, we understand the unique demands of Wolverhampton's economy, from its thriving **Advanced Manufacturing** sector to its essential **Metal Fabrication** businesses. Our mission is to provide superior, locally-focused shot blasting solutions.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We combine advanced technology with a deep commitment to the local community, ensuring every project in Wolverhampton meets the highest standards of quality, safety, and environmental responsibility.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Local West Midlands Team" },
                  { icon: Award, text: "Industry Certified & Insured" },
                  { icon: Clock, text: "Fast Turnaround for Local Projects" },
                  { icon: Users, text: "Expert, Dedicated Team" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-[#F5F1E8] rounded-lg">
                    <item.icon className="w-6 h-6 text-[#2C5F7F]" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600" alt="Professional shot blasting in Wolverhampton" className="rounded-lg shadow-xl" />
              <div className="absolute -bottom-6 -left-6 bg-[#2C5F7F] text-white p-6 rounded-lg shadow-lg">
                <p className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>20+</p>
                <p className="text-sm">Years Serving the West Midlands</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid (Reused from Home.tsx) */}
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

      {/* Industries Served Section - Wolverhampton Specific */}
      <section id="industries" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Industries We Serve in Wolverhampton</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Targeted Solutions for Wolverhampton's Key Sectors
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WOLVERHAMPTON_INDUSTRIES.map((industry, i) => (
              <Card key={i} className="p-6 text-center hover:shadow-lg transition-shadow">
                <industry.icon className="w-10 h-10 text-[#2C5F7F] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-[#2C2C2C]">{industry.name}</h3>
                <p className="text-gray-600 text-sm">{industry.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Local Testimonials Section - New Section */}
      <section id="testimonials" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">What Our Wolverhampton Clients Say</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Trusted by Local Businesses
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {WOLVERHAMPTON_TESTIMONIALS.map((testimonial, i) => (
              <Card key={i} className="p-8 shadow-xl">
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

      {/* FAQ Section - New Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Wolverhampton Shot Blasting FAQs</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Common Questions
            </h2>
          </div>
          <div className="space-y-4">
            {WOLVERHAMPTON_FAQS.map((faq, i) => (
              <div key={i} className="border-b pb-4">
                <h3 className="text-xl font-semibold text-[#2C5F7F] mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (Reused from Home.tsx) */}
      <section className="py-16 bg-[#2C5F7F] text-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to Transform Your Surfaces in Wolverhampton?
              </h2>
              <p className="text-white/80">Contact your local West Midlands team today for a free, no-obligation quote.</p>
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

      {/* Contact Section (Reused from Home.tsx, but simplified for a location page) */}
      <section id="contact" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Get In Touch</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Request a Free Quote for Your Wolverhampton Project
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form and our local Wolverhampton team will get back to you within 24 hours with a detailed quote for your project.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-[#2C5F7F]" />
                  <p className="text-gray-700">Serving Wolverhampton and the entire West Midlands</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-[#2C5F7F]" />
                  <p className="text-gray-700">07970 566409 (Local Wolverhampton Contact)</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-[#2C5F7F]" />
                  <p className="text-gray-700">wolverhampton@shotblasting.co.uk</p>
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
                  placeholder="Your Phone (e.g., 07xxx xxxxxx)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Tell us about your project in Wolverhampton..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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

      {/* Footer (Simplified for a location page) */}
      
      {/* Service Area Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F7F] mb-4">
              Our Wolverhamton Service Area
            </h2>
            <p className="text-lg text-gray-600">
              We provide professional shot blasting services throughout Wolverhamton and the surrounding region. The map shows our primary service area with a 25-mile radius.
            </p>
          </div>
          <LocationMap locationName="Wolverhamton" />
        </div>
      </section>

<footer className="bg-[#2C2C2C] text-white py-10">
        <div className="container text-center text-sm text-white/70">
          <p>&copy; {new Date().getFullYear()} Shot Blasting Services. All rights reserved. Serving Wolverhampton and the West Midlands.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
