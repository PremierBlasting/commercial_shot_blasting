import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Shield, Award, Clock, Users, CheckCircle, Phone } from "lucide-react";
import { useState } from "react";
import { QuotePopup } from "@/components/QuotePopup";
import { trackPhoneCall } from "@/lib/analytics";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function About() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const openQuotePopup = () => setQuotePopupOpen(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenQuotePopup={openQuotePopup} />
      
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "About", href: "/about", isCurrentPage: true }
      ]} className="container mt-6" />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3a4d] text-white py-20">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-blue-200 font-medium mb-2">About Commercial Shot Blasting</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              A Business You Can Trust
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              We are a trusted family-run business with the mission to provide superior shot blasting solutions for industrial and commercial environments across the UK.
            </p>
          </div>
        </div>
      </section>

      {/* Main About Content */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Why Choose Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Professional Surface Preparation Experts
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are a trusted family-run business with the mission to provide superior shot blasting solutions for industrial and commercial environments across the UK. Our advanced shot blasting technology delivers exceptional results at competitive prices.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                As part of our commitment, we employ an expert team dedicated to providing unparalleled services while maintaining high safety standards that protect your property.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Fully Insured" },
                  { icon: Award, text: "Quality Assured" },
                  { icon: Clock, text: "Fast Turnaround" },
                  { icon: Users, text: "Expert Team" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-[#F5F1E8] rounded-lg">
                    <item.icon className="w-6 h-6 text-[#2C5F7F]" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <BeforeAfterSlider
                beforeImage="/warehouse-before.webp"
                afterImage="/warehouse-after.webp"
                beforeLabel="Before"
                afterLabel="After"
                className="shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#2C5F7F] text-white p-6 rounded-lg shadow-lg z-20">
                <p className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>20+</p>
                <p className="text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Values</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Drives Us
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                description: "We never compromise on the quality of our work. Every project receives the same meticulous attention to detail, regardless of size.",
              },
              {
                title: "Customer Focus",
                description: "Your satisfaction is our priority. We work closely with you to understand your needs and deliver results that exceed expectations.",
              },
              {
                title: "Safety & Environment",
                description: "We maintain the highest safety standards and use environmentally responsible practices in all our shot blasting operations.",
              },
            ].map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CheckCircle className="w-12 h-12 text-[#2C5F7F] mb-4" />
                <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">How We Work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Process
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Initial Consultation",
                description: "We discuss your project requirements and provide expert advice on the best approach.",
              },
              {
                step: "02",
                title: "Site Survey",
                description: "Our team visits your site to assess the work and provide an accurate quote.",
              },
              {
                step: "03",
                title: "Shot Blasting",
                description: "We execute the shot blasting work with precision, using advanced equipment and techniques.",
              },
              {
                step: "04",
                title: "Quality Check",
                description: "We inspect the completed work to ensure it meets our high standards before handover.",
              },
            ].map((process, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-[#2C5F7F] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">{process.title}</h3>
                <p className="text-gray-600 leading-relaxed">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2C5F7F] to-[#1a3a4d] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Transform Your Surfaces?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Get in touch with our expert team today for a free consultation and quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openQuotePopup}
              className="bg-white text-[#2C5F7F] px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Get a Free Quote
            </button>
            <a
              href="tel:07970566409"
              onClick={() => trackPhoneCall('07970566409', 'About Page')}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Now: 07970 566409
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
    </div>
  );
}
