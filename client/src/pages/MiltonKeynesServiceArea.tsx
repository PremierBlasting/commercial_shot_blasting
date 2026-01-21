import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { LocationMap } from "@/components/LocationMap";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { TrackedPhoneButton } from "@/components/TrackedPhoneButton";
import { Phone, ArrowRight, Shield, Clock, Award, Users, CheckCircle, Quote } from "lucide-react";

// Placeholder component for a standard layout wrapper
const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
    {/* Assuming a layout component handles the main header/footer */}
    {children}
  </div>
);

export default function MiltonKeynesServiceArea() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  const services = [
    { title: "Steel Shot Blasting", desc: "High-performance cleaning for steel structures, removing rust, mill scale, and old coatings." },
    { title: "Concrete Preparation", desc: "Surface profiling for optimal coating adhesion on floors, walls, and structural elements, ideal for MK's logistics hubs." },
    { title: "Rust Removal", desc: "Complete corrosion removal restoring metal surfaces to pristine condition for automotive and industrial clients." },
    { title: "Paint Stripping", desc: "Safe and effective removal of old paint, primers, and protective coatings from commercial properties." },
  ];

  const industries = [
    "Logistics & Warehousing", "Automotive Manufacturing & Restoration", "High-Tech & Data Centres",
    "Construction & Infrastructure", "Financial Services Buildings", "Retail & Leisure Facilities"
  ];

  const testimonials = [
    {
      quote: "The team prepped our 5,000 sq ft warehouse floor near the M1 junction perfectly for a new epoxy coating. Fast, clean, and professional. Highly recommend for any Milton Keynes logistics operation.",
      name: "David K.",
      company: "MK Logistics Solutions"
    },
    {
      quote: "Exceptional service on restoring a classic car chassis. The shot blasting was precise, and the surface was perfectly prepared for the next stage. True experts serving the local automotive scene.",
      name: "Sarah P.",
      company: "Bletchley Restoration Workshop"
    },
    {
      quote: "We needed a quick turnaround on a steel structure for a new data centre build. Shot Blasting delivered on time and to a flawless standard. Great local support.",
      name: "Mark T.",
      company: "MK Infrastructure Group"
    },
  ];

  const faqs = [
    {
      question: "What is the typical turnaround time for a project in Milton Keynes?",
      answer: "Turnaround time depends on the project size and complexity. For standard industrial floor preparation (e.g., a 1,000 sq ft warehouse), we can often complete the job within 1-2 days. We prioritize minimizing disruption for our Milton Keynes clients."
    },
    {
      question: "Do you offer dustless blasting options for sensitive environments like data centres?",
      answer: "Yes, we offer advanced dustless and low-dust shot blasting techniques, which are ideal for the high-tech and sensitive environments common in Milton Keynes, ensuring minimal impact on surrounding operations."
    },
    {
      question: "Is your service available across all of Buckinghamshire, or just Milton Keynes?",
      answer: "While we specialize in serving the Milton Keynes area, we proudly extend our services across all of Buckinghamshire and the wider South East region, leveraging our strategic location near major transport links."
    },
    {
      question: "How much does shot blasting cost in the Milton Keynes area?",
      answer: "Pricing is project-specific. We offer a free, no-obligation quote after an initial site assessment. Factors include the size of the area, the type of surface, and the required profile. Contact us today for a precise estimate."
    },
  ];

  return (
    <PageLayout>
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
                <Link href="/service-areas">Service Areas</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Milton Keynes</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section - Localized */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Premier Shot Blasting Services in Milton Keynes
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Serving the heart of Buckinghamshire, our specialist team provides high-quality surface preparation for the region's thriving logistics, automotive, and technology sectors. Get a fast, reliable quote today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90">Get a Free Quote Today</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">View Our Work</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Slider */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Milton Keynes Project Transformation
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
              location="Milton Keynes"
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
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Why Choose Us in Milton Keynes</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                The Surface Preparation Experts for the M1 Corridor
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are a trusted family-run business with a deep understanding of the unique industrial and commercial needs of Milton Keynes and the wider South East. Our advanced shot blasting technology delivers exceptional results for the region's logistics, automotive, and high-tech sectors.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our local team is dedicated to providing unparalleled services, focusing on efficiency and high safety standards, especially crucial when working near major transport links and dense business parks.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Fully Insured & Certified" },
                  { icon: Award, text: "Specialists in Logistics & Auto" },
                  { icon: Clock, text: "Fast Turnaround for MK Businesses" },
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
              {/* Placeholder image for local context */}
              <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600" alt="Shot blasting in an industrial setting" className="rounded-lg shadow-xl" />
              <div className="absolute -bottom-6 -left-6 bg-[#2C5F7F] text-white p-6 rounded-lg shadow-lg">
                <p className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>20+</p>
                <p className="text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Standard services, localized intro */}
      <section id="services" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Expert Services in Milton Keynes</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Comprehensive Surface Preparation Solutions
            </h2>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              From preparing vast warehouse floors to restoring classic car parts, our shot blasting services are tailored to meet the high standards of Milton Keynes' diverse economy.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <Card key={i} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <CheckCircle className="w-8 h-8 text-[#2C5F7F] mb-3" />
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

      {/* Industries Served Section - Localized */}
      <section id="industries" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Industries We Serve in Milton Keynes</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Supporting the Key Sectors of Buckinghamshire
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
            <p className="text-white/80 font-medium mb-2">What Our Milton Keynes Clients Say</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Trusted by Local Businesses
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} className="bg-white text-[#2C2C2C] p-6 shadow-lg">
                <Quote className="w-8 h-8 text-[#2C5F7F] mb-4" />
                <p className="italic mb-4">"{t.quote}"</p>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-gray-500">{t.company}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Localized */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Frequently Asked Questions</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Answers for Milton Keynes Projects
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-semibold hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Service Area Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F7F] mb-4">
              Our Shot Blasting Services in Milton Keynes
            </h2>
            <p className="text-lg text-gray-600">
              We provide professional shot blasting services throughout Milton Keynes and the surrounding region. The map shows our primary service area with a 25-mile radius.
            </p>
          </div>
          <LocationMap locationName="MiltonKeynes" />
        </div>
      </section>

      {/* CTA Section - Standard */}
      <section className="py-16 bg-[#2C5F7F] text-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to Transform Your Surfaces in Milton Keynes?
              </h2>
              <p className="text-white/80">Contact us today for a free, no-obligation quote for your Buckinghamshire project.</p>
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

      {/* Contact Section Placeholder (Assuming a full contact form would be here, but using the CTA as the final element for simplicity) */}
    </PageLayout>
  );
}
