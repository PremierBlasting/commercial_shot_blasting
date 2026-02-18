import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Shield, Award } from "lucide-react";
import { useState } from "react";
import { HubSpotForm } from "@/components/HubSpotForm";
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BackToTop } from "@/components/BackToTop";

import { Footer } from "@/components/Footer";
export default function Contact() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

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
            Ready to transform your surfaces? Contact our expert team for a free consultation and quote.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Request a Quote</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Let's Discuss Your Project
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form and our team will get back to you within 24 hours with a detailed quote for your project.
              </p>

              {/* Contact Information */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#2C5F7F]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a href="tel:07970566409" className="font-medium hover:text-[#2C5F7F] transition-colors">07970 566409</a>
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
                      <p className="text-sm text-gray-600">24-hour quote turnaround</p>
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
                      <p className="font-medium text-[#2C2C2C]">Expert Team</p>
                      <p className="text-sm text-gray-600">Years of industry experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-6">
              <HubSpotForm />
            </Card>
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
                <li><a href="tel:07970566409" className="hover:text-white">07970 566409</a></li>
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
