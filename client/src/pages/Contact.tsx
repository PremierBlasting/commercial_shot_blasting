import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Shield, Award, FileText } from "lucide-react";
import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { LeadForm } from "@/components/LeadForm";
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BackToTop } from "@/components/BackToTop";

import { Footer } from "@/components/Footer";

const CAPABILITY_STATEMENT_URL = "/manus-storage/commercial-capability-statement-approved-2026-09-02_308ee57e.pdf";

export default function Contact() {
  // Set SEO metadata
  useSEO({ title: "Contact Us | Commercial Shot Blasting", description: "Get in touch with Commercial Shot Blasting for a site visit. Call 07721 375756 or fill out our contact form for expert surface preparation services.", canonical: "https://commercialshotblasting.co.uk/contact" });

  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const capabilityStatementRequest = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("request") === "capability-statement";

  const openQuotePopup = () => setQuotePopupOpen(true);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Header */}
      <Header onOpenQuotePopup={openQuotePopup} />

      {/* Breadcrumb Navigation */}
      <section className="py-4 bg-gray-50 border-b border-gray-200">
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Contact", href: "/contact", isCurrentPage: true }
          ]} />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-16 lg:py-24">
        <div className="container relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Get In Touch
          </h1>
          <p className="text-xl text-white/90 mb-6 max-w-2xl">
            Ready to transform your surfaces? Contact our expert team for a no-obligation consultation.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Request A Site Visit</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Let's Discuss Your Project
              </h2>
              <p className="text-gray-600 mb-8">
                {capabilityStatementRequest ? "The current approved capability statement is ready to download. Use the form if you would like project-specific information or a Site Visit." : "Fill out the form and our team will get back to you promptly with a detailed quote for your project."}
              </p>

              <div className="mb-8 flex items-start gap-3 rounded-xl border border-[#2C5F7F]/20 bg-[#F5F1E8] p-4">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2C5F7F]/10 text-[#2C5F7F]">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-[#1a3d52]">Current capability statement</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">Download the approved commercial booklet for supplier review, tender files, and internal project planning.</p>
                  <a
                    href={CAPABILITY_STATEMENT_URL}
                    download="Commercial-Capability-Statement.pdf"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#2C5F7F] transition hover:text-[#1a3d52] hover:underline"
                    aria-label="Download the current Commercial Shot Blasting capability statement PDF"
                  >
                    Download capability statement (PDF)
                  </a>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#2C5F7F]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a href="tel:07721375756" className="font-medium hover:text-[#2C5F7F] transition-colors">07721 375756</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#2C5F7F]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href="mailto:info@commercialshotblasting.co.uk" className="font-medium hover:text-[#2C5F7F] transition-colors">info@commercialshotblasting.co.uk</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#2C5F7F]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Service Area</p>
                    <p className="font-medium">Professional service across England & Wales</p>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-[#F5F1E8] rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4 text-[#2C2C2C]">Why Choose Commercial Shot Blasting?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-[#2C5F7F]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#2C2C2C]">Fast Response Time</p>
                      <p className="text-sm text-gray-600">Fast quote turnaround</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Shield className="w-4 h-4 text-[#2C5F7F]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#2C2C2C]">Fully Insured</p>
                      <p className="text-sm text-gray-600">Comprehensive coverage for peace of mind</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Award className="w-4 h-4 text-[#2C5F7F]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#2C2C2C]">Premier Blasting CHAS Elite</p>
                      <p className="text-sm text-gray-600">Commercial Shot Blasting is the commercial arm of Premier Blasting. <a href="/chas-elite" className="font-semibold text-[#2C5F7F] hover:underline">Learn more</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <LeadForm
                variant="light"
                heading="Request A Site Visit"
                subheading={capabilityStatementRequest ? "Request the current approved capability statement and get project-specific support." : "We'll arrange a site visit and get back to you promptly."}
                showWhatsApp={true}
                showAssetSelector={true}
                capabilityStatementRequest={capabilityStatementRequest}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a3d52] text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/30">
                  <span className="font-bold">CSB</span>
                </div>
                <span className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Commercial Shot Blasting</span>
              </div>
              <p className="text-white/70 text-sm">Professional shot blasting services for industrial and commercial applications across the UK.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="/#services" className="hover:text-white">Structural Steel Frames</a></li>
                <li><a href="/#services" className="hover:text-white">Fire Escapes & Stair Towers</a></li>
                <li><a href="/#services" className="hover:text-white">Staircases & Balustrades</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="/#about" className="hover:text-white">About Us</a></li>
                <li><a href="/#industries" className="hover:text-white">Industries</a></li>
                <li><a href="/our-work" className="hover:text-white">Our Work</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Get In Touch</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="tel:07721375756" className="hover:text-white">07721 375756</a></li>
                <li><a href="mailto:info@commercialshotblasting.co.uk" className="hover:text-white">info@commercialshotblasting.co.uk</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
            <p>&copy; {new Date().getFullYear()} Commercial Shot Blasting. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
      <BackToTop />
    </div>
  );
}
