import { Link } from "wouter";
import { useState } from "react";
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Shield, Clock, Award, Users, ChevronRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LocationMap } from "@/components/LocationMap";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { TrackedPhoneButton } from "@/components/TrackedPhoneButton";

// Mock data for the Ipswich Service Area page
const ipswichData = {
  locationName: "Ipswich",
  region: "Suffolk, East Anglia",
  heroTitle: "Premier Shot Blasting Services in Ipswich & Suffolk",
  heroSubtitle: "Serving the industrial and commercial sectors of Ipswich with expert surface preparation and restoration.",
  whyChooseUs: {
    title: "Why Ipswich Chooses Us for Shot Blasting",
    points: [
      { icon: Shield, text: "Fully Insured & Certified" },
      { icon: Award, text: "Specialists in Marine & Logistics" },
      { icon: Clock, text: "Fast Turnaround for Port Operations" },
      { icon: Users, text: "Local Ipswich Expert Team" },
    ],
    experience: "15+",
    experienceText: "Years Serving East Anglia",
  },
  services: [
    { title: "Marine Equipment Blasting", desc: "Specialized cleaning for port machinery, ship parts, and marine structures, vital for Ipswich's port.", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af11?w=400" },
    { title: "Logistics Fleet Preparation", desc: "Surface preparation for haulage vehicles and distribution center flooring, supporting the local logistics hub.", img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400" },
    { title: "Historic Building Restoration", desc: "Gentle yet effective blasting for the restoration of Ipswich's historic architecture.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
    { title: "Agricultural Machinery Cleaning", desc: "Heavy-duty cleaning for farm equipment, supporting the strong local agriculture sector.", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400" },
  ],
  industries: [
    "Logistics & Transport (Port of Ipswich)", "Insurance & Finance (Local Cluster)", "Agriculture & Food Production", "Marine & Offshore", "Construction & Infrastructure",
  ],
  testimonials: [
    { quote: "The team handled the blasting of our port machinery quickly and professionally. Excellent service, minimal downtime.", author: "Operations Manager, Ipswich Port Services" },
    { quote: "Our haulage fleet looks brand new. The surface prep was flawless, and the new paint has adhered perfectly. Highly recommend!", author: "Fleet Director, Suffolk Logistics" },
  ],
  faq: [
    { question: "Do you service areas outside of Ipswich town center?", answer: "Yes, we cover the entire Suffolk region, including Felixstowe, Stowmarket, and Colchester." },
    { question: "What types of blasting media do you use for marine applications?", answer: "We use specialized media like garnet and glass bead for marine equipment to ensure effective cleaning without damaging sensitive surfaces." },
    { question: "Can you handle large industrial floor preparation?", answer: "Absolutely. We have heavy-duty equipment suitable for large-scale concrete floor preparation in warehouses and distribution centers across Ipswich." },
  ],
};

export default function IpswichServiceArea() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  const { locationName, region, heroTitle, heroSubtitle, whyChooseUs, services, industries, testimonials, faq } = ipswichData;

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-3 border-b">
        <div className="container flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2C5F7F] transition">Home</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <Link href="/service-areas" className="hover:text-[#2C5F7F] transition">Service Areas</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="font-medium text-[#2C5F7F]">{locationName}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <p className="text-lg font-semibold mb-3 text-white/80">{region} Service Area</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              {heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              {heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90">
                Get a Free Quote in {locationName}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="w-4 h-4 mr-2" /> Call {locationName} Team
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
              Ipswich Project Transformation
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
              location="Ipswich"
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

      

      {/* Why Choose Us Section (Tailored for Ipswich) */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Local Expertise</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {whyChooseUs.title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                As a dedicated service provider in {locationName}, we understand the unique demands of the local economy, from the busy Port of Ipswich to the surrounding agricultural and logistics hubs. Our methods are tailored to meet the specific needs of Suffolk businesses.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {whyChooseUs.points.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-[#F5F1E8] rounded-lg">
                    <item.icon className="w-6 h-6 text-[#2C5F7F]" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600" alt={`Shot blasting in ${locationName}`} className="rounded-lg shadow-xl" />
              <div className="absolute -bottom-6 -left-6 bg-[#2C5F7F] text-white p-6 rounded-lg shadow-lg">
                <p className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{whyChooseUs.experience}</p>
                <p className="text-sm">{whyChooseUs.experienceText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (Tailored for Ipswich) */}
      <section id="services" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Services for {locationName}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Specialized Shot Blasting for Suffolk's Needs
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <Card key={i} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
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

      {/* Industries Served Section (Tailored for Ipswich) */}
      <section id="industries" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Local Sectors</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Proudly Serving {locationName}'s Key Industries
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {industries.map((industry, i) => (
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Our {locationName} Clients Say
            </h2>
            <p className="text-white/80">Trusted by businesses across Suffolk and East Anglia.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="bg-white text-[#2C2C2C] p-8 shadow-lg">
                <blockquote className="italic text-lg mb-4">"{testimonial.quote}"</blockquote>
                <p className="font-semibold text-[#2C5F7F]">- {testimonial.author}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Questions?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Frequently Asked Questions in {locationName}
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-semibold text-[#2C2C2C] hover:no-underline">{item.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section (Final) */}
      <section className="py-16 bg-[#2C5F7F] text-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to Start Your Project in {locationName}?
              </h2>
              <p className="text-white/80">Contact our local {locationName} team today for a free, detailed consultation.</p>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90">Get a Quote Now</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Mail className="w-4 h-4 mr-2" /> Email Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Simplified for component) */}
      
      {/* Service Area Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F7F] mb-4">
              Our Shot Blasting Services in Ipswich
            </h2>
            <p className="text-lg text-gray-600">
              We provide professional shot blasting services throughout Ipswich and the surrounding region. The map shows our primary service area with a 25-mile radius.
            </p>
          </div>
          <LocationMap locationName="Ipswich" />
        </div>
      </section>

<footer className="bg-[#2C2C2C] text-white py-8">
        <div className="container text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Shot Blasting Services. Serving {locationName} and East Anglia.</p>
        </div>
      </footer>
    </div>
  );
}
