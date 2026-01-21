import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Star, Award, Zap } from "lucide-react";
import { useState } from "react";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { LocationMap } from "@/components/LocationMap";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { TrackedPhoneButton } from "@/components/TrackedPhoneButton";

export default function StratfordUponAvonServiceArea() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
      <LocalBusinessSchema
        name="Stratford Upon Avon"
        city="Stratford Upon Avon"
        region="West Midlands"
        description="Professional shot blasting services in Stratford Upon Avon and the West Midlands"
        url="https://shotblast-lwspuaik.manus.space/service-areas/stratford-upon-avon"
      />

      {/* Breadcrumb Navigation */}
      <section className="py-4 bg-gray-50 border-b border-gray-200">
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Service Areas", href: "/service-areas" },
            { label: "West Midlands", href: "/service-areas" },
            { label: "Stratford Upon Avon", href: "/service-areas/stratford-upon-avon", isCurrentPage: true }
          ]} />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-[#2C5F7F] to-[#1a3d52] text-white">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-[#F5F1E8] font-medium mb-2">Professional Shot Blasting Services</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services in Stratford Upon Avon
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Commercial Shot Blasting provides professional surface preparation and rust removal services throughout Stratford Upon Avon and the surrounding West Midlands region. Serving local manufacturers, heritage restoration specialists, and industrial facilities with precision blasting solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-[#F5F1E8]" onClick={() => setQuotePopupOpen(true)}>
                Get a Free Quote
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="w-4 h-4 mr-2" />
                Call Now: 07970 566409
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
              Stratford-upon-Avon Project Transformation
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
              location="Stratford-upon-Avon"
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

      

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-[#F5F1E8]">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Choose Commercial Shot Blasting in Stratford Upon Avon?
            </h2>
            <p className="text-gray-700 text-lg">
              With experience serving Stratford Upon Avon's heritage restoration and manufacturing sectors, we understand the unique surface preparation challenges faced by local businesses. Our team delivers precision blasting solutions tailored to your specific requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8 text-[#2C5F7F]" />,
                title: "Heritage Expertise",
                description: "Specialized experience with historic building restoration and heritage site preparation"
              },
              {
                icon: <Zap className="w-8 h-8 text-[#2C5F7F]" />,
                title: "Advanced Equipment",
                description: "State-of-the-art blasting technology for consistent, high-quality results on all surface types"
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-[#2C5F7F]" />,
                title: "Quality Assurance",
                description: "Rigorous quality control and certification to meet industry standards and client specifications"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Services in Stratford Upon Avon
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "Steel Shot Blasting",
                description: "High-efficiency surface cleaning and preparation for steel structures and components"
              },
              {
                title: "Heritage Restoration",
                description: "Specialized blasting for historic buildings and heritage sites with minimal surface damage"
              },
              {
                title: "Paint Removal",
                description: "Efficient removal of old coatings and paint from industrial equipment and structures"
              },
              {
                title: "Rust Removal",
                description: "Complete rust elimination and surface preparation for recoating and restoration"
              },
              {
                title: "Concrete Profiling",
                description: "Professional concrete surface preparation for optimal coating adhesion"
              },
              {
                title: "Custom Solutions",
                description: "Tailored blasting solutions for unique industrial challenges and specifications"
              }
            ].map((service, index) => (
              <div key={index} className="flex gap-4">
                <ArrowRight className="w-6 h-6 text-[#2C5F7F] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Industries We Serve in Stratford Upon Avon
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Heritage Restoration",
              "Manufacturing",
              "Engineering & Fabrication",
              "Construction",
              "Tourism & Hospitality",
              "Agricultural Equipment",
              "Machinery & Components",
              "Structural Steel",
              "General Industrial"
            ].map((industry, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 flex items-center gap-3">
                <Star className="w-5 h-5 text-[#2C5F7F]" />
                <span className="font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            What Stratford Upon Avon Businesses Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Elizabeth Hart",
                company: "Stratford Heritage Restoration",
                text: "Excellent service for our heritage projects. Their team understands the sensitivity required for historic buildings."
              },
              {
                name: "Robert Thompson",
                company: "Avon Manufacturing Ltd",
                text: "Professional and reliable. They've become an essential part of our production process."
              },
              {
                name: "Catherine Williams",
                company: "Stratford Industrial Services",
                text: "Outstanding attention to detail and customer service. Highly recommended for any surface preparation needs."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-[#F5F1E8] p-8 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#2C5F7F] text-[#2C5F7F]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "How quickly can you complete a shot blasting project in Stratford Upon Avon?",
                a: "Project timelines vary based on scope and complexity. Most projects are completed within 1-3 weeks. We'll provide a detailed timeline during the initial consultation."
              },
              {
                q: "Do you have experience with heritage building restoration?",
                a: "Yes, we specialize in heritage restoration with non-destructive blasting techniques that preserve the integrity of historic structures."
              },
              {
                q: "Can you handle large-scale industrial projects?",
                a: "Absolutely. We have the equipment and expertise to handle projects of any size, from small components to large structural elements."
              },
              {
                q: "Do you provide environmental compliance documentation?",
                a: "Yes, we maintain full compliance with environmental regulations and provide all necessary documentation for your records."
              },
              {
                q: "How do I get started with a quote?",
                a: "Simply click 'Get a Free Quote' above or call us at 07970 566409. We'll arrange a site visit to assess your requirements."
              }
            ].map((faq, index) => (
              <details key={index} className="bg-white p-6 rounded-lg border border-gray-200 cursor-pointer group">
                <summary className="font-bold flex items-center justify-between">
                  {faq.q}
                  <ArrowRight className="w-5 h-5 text-[#2C5F7F] group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-gray-600 mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* Service Area Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F7F] mb-4">
              Our Shot Blasting Services in Stratford Upon Avon
            </h2>
            <p className="text-lg text-gray-600">
              We provide professional shot blasting services throughout Stratford Upon Avon and the surrounding region. The map shows our primary service area with a 25-mile radius.
            </p>
          </div>
          <LocationMap locationName="StratfordUponAvon" />
        </div>
      </section>


      <section className="py-16 md:py-24 bg-gradient-to-r from-[#2C5F7F] to-[#1a3d52] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Transform Your Surfaces?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Contact Commercial Shot Blasting today for professional surface preparation services in Stratford Upon Avon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-[#F5F1E8]" onClick={() => setQuotePopupOpen(true)}>
              Get a Free Quote
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Phone className="w-4 h-4 mr-2" />
              Call: 07970 566409
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Phone className="w-8 h-8 text-[#2C5F7F] mx-auto mb-3" />
              <h3 className="font-bold mb-2">Call Us</h3>
              <a href="tel:07970566409" className="text-[#2C5F7F] hover:underline">07970 566409</a>
            </div>
            <div>
              <Mail className="w-8 h-8 text-[#2C5F7F] mx-auto mb-3" />
              <h3 className="font-bold mb-2">Email Us</h3>
              <a href="mailto:info@commercialshotblasting.co.uk" className="text-[#2C5F7F] hover:underline">info@commercialshotblasting.co.uk</a>
            </div>
            <div>
              <MapPin className="w-8 h-8 text-[#2C5F7F] mx-auto mb-3" />
              <h3 className="font-bold mb-2">Service Area</h3>
              <p className="text-gray-600">Stratford Upon Avon & West Midlands</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
