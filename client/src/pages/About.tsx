import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Shield, Award, Clock, Users, CheckCircle, Phone, Download } from "lucide-react";
import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { QuotePopup } from "@/components/QuotePopup";
import { trackPhoneCall } from "@/lib/analytics";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CapabilityStatementContents } from "@/components/CapabilityStatementContents";
import { CapabilityStatementDownload } from "@/components/CapabilityStatementDownload";

export default function About() {
  // Set SEO metadata
  useSEO({ title: "About Us | Commercial Shot Blasting", description: "Learn about Commercial Shot Blasting - expert surface preparation services across the UK. Professional team, modern equipment, quality results.", canonical: "https://commercialshotblasting.co.uk/about" });

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
            <p className="inline-flex items-center gap-2 text-white/70 text-sm font-medium tracking-wide mb-3">
              <span className="w-4 h-px bg-white/40"></span>
              The Commercial &amp; Industrial Arm of Premier Blasting
            </p>
            <p className="text-blue-200 font-medium mb-2">About Commercial Shot Blasting</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              A Business You Can Trust
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed mb-4">
              Commercial Shot Blasting is the commercial and industrial shot blasting arm of{" "}
              <a href="https://premierblasting.co.uk" target="_blank" rel="noopener noreferrer" className="font-bold text-white underline decoration-white/50 hover:decoration-white transition-colors">Premier Blasting Ltd</a> — a trusted family-run business delivering superior surface preparation solutions across the UK.
            </p>
            <p className="text-base text-blue-200 leading-relaxed">
              Operating under the Premier Blasting Ltd umbrella, we specialise exclusively in large-scale commercial and industrial projects, bringing the same family values, quality standards, and expert team to every job.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-[#1a3a4d] text-white py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "12", label: "Mobile Teams" },
              { value: "20+", label: "Years Experience" },
              { value: "500+", label: "Projects Completed" },
              { value: "2", label: "Countries Covered" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-bold text-[#E8B84A]" style={{ fontFamily: "'Playfair Display', serif" }}>{stat.value}</p>
                <p className="text-sm text-white/70 mt-1">{stat.label}</p>
              </div>
            ))}
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
              <p className="text-gray-600 mb-4 leading-relaxed">
                Commercial Shot Blasting is the commercial and industrial shot blasting arm of{" "}
                <a href="https://premierblasting.co.uk" target="_blank" rel="noopener noreferrer" className="font-bold text-[#2C5F7F] underline decoration-[#2C5F7F]/40 hover:decoration-[#2C5F7F] transition-colors">Premier Blasting Ltd</a>. Operating under the Premier Blasting Ltd umbrella, we focus exclusively on large-scale commercial, industrial, and agricultural projects across the UK.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our advanced shot blasting technology delivers exceptional results at competitive prices, with 12 fully equipped mobile units ready to attend your site anywhere in the UK.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                As part of our commitment, we employ an expert team dedicated to providing unparalleled services while maintaining high safety standards that protect your property and workforce.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Fully Insured" },
                  { icon: Award, text: "Premier Blasting CHAS Elite" },
                  { icon: Clock, text: "Fast Turnaround" },
                  { icon: Users, text: "Expert Team" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-[#F5F1E8] rounded-lg">
                    <item.icon className="w-6 h-6 text-[#2C5F7F]" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              <a href="/chas-elite" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2C5F7F] hover:text-[#1a3d52]">
                Learn about our CHAS Elite assurance pathway <CheckCircle className="h-4 w-4" />
              </a>
              <section className="mt-7 rounded-2xl border border-[#2C5F7F]/20 bg-[#F5F1E8] p-5 shadow-sm" aria-labelledby="about-capability-statement-heading">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2C5F7F]/10 text-[#2C5F7F]">
                    <Download className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-[0.11em] text-[#2C5F7F]">Supplier information</p>
                    <h2 id="about-capability-statement-heading" className="mt-1 text-xl font-bold text-[#1a3d52]">Commercial capability statement</h2>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">Download the approved PDF for procurement review, tender files, and project planning.</p>
                    <CapabilityStatementDownload
                      placement="About Us page supplier information card"
                      linkClassName="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#2C5F7F] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1a3d52] focus:outline-none focus:ring-4 focus:ring-[#2C5F7F]/30"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" /> Download capability statement
                    </CapabilityStatementDownload>
                    <CapabilityStatementContents className="mt-2" />
                  </div>
                </div>
              </section>
            </div>
            <div className="relative">
              <BeforeAfterSlider
                beforeImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/VEiAvFTFwMSPdMnF.webp"
                afterImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/TicEtXjfKsaOJYbR.webp"
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
                description: "We never compromise on the quality of our work. We use premium iron silicate (copper slag) media on every commercial project — a high-density angular abrasive that delivers a consistent Sa 2.5 cleanliness grade and the sharp anchor profile required by leading coating systems. Every project receives the same meticulous attention to detail, regardless of size.",
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

      {/* Premier Blasting Connection Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#2C5F7F]/10 flex items-center justify-center mb-3">
                <span className="text-3xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>PB</span>
              </div>
              <a
                href="https://premierblasting.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2C5F7F] text-sm font-medium underline underline-offset-2 hover:text-[#1a3d52] transition-colors"
              >
                premierblasting.co.uk
              </a>
            </div>
            <div>
              <p className="text-[#2C5F7F] font-medium mb-1 text-sm">Our Parent Company</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Part of the Premier Blasting Family
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Commercial Shot Blasting is the dedicated commercial and industrial arm of{" "}
                <a href="https://premierblasting.co.uk" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#2C5F7F] underline decoration-[#2C5F7F]/40 hover:decoration-[#2C5F7F] transition-colors">Premier Blasting Ltd</a>
                {" "}— a family-run business with over 20 years of experience in surface preparation across the UK.
              </p>
              <p className="text-gray-600 leading-relaxed">
                While Premier Blasting serves domestic and smaller-scale clients, Commercial Shot Blasting was established to focus exclusively on large-scale commercial, industrial, and agricultural contracts — bringing the same trusted team, equipment, and quality standards to every project, regardless of size or complexity.
              </p>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Premier Blasting holds CHAS Elite status. <a href="/chas-elite" className="font-semibold text-[#2C5F7F] underline decoration-[#2C5F7F]/40 hover:decoration-[#2C5F7F]">Read how this relationship supports commercial project planning.</a>
              </p>
            </div>
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
                description: "We execute the shot blasting work with precision, using iron silicate (copper slag) media and advanced equipment to achieve the Sa 2.5 cleanliness grade and surface profile required by your coating specification.",
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
            Get in touch with our expert team today for a no-obligation consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openQuotePopup}
              className="bg-white text-[#2C5F7F] px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Request A Site Visit
            </button>
            <a
              href="tel:07721375756"
              onClick={() => trackPhoneCall('07721375756', 'About Page')}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Now: 07721 375756
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
    </div>
  );
}
