import { useState } from "react";
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { Link } from "wouter";
import { ArrowLeft, Shield, Cookie, Database, Mail, Phone, MapPin, Lock, Users, Clock } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function PrivacyPolicy() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      
      {/* Breadcrumb Navigation */}
      <section className="py-4 bg-gray-50 border-b border-gray-200">
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy", href: "/privacy-policy", isCurrentPage: true }
          ]} />
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="bg-[#2C5F7F] text-white py-16">
        <div className="container">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Privacy Policy
            </h1>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            Your privacy is important to us. This policy explains how Commercial Shot Blasting collects, uses, and protects your personal information.
          </p>
          <p className="text-white/60 text-sm mt-4">
            Last updated: January 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-12">
            
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Commercial Shot Blasting ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#2C5F7F]/10 flex items-center justify-center">
                  <Database className="w-5 h-5 text-[#2C5F7F]" />
                </div>
                <h2 className="text-2xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Information We Collect
                </h2>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Personal Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Fill out a contact form or request a quote</li>
                <li>Subscribe to our newsletter or marketing communications</li>
                <li>Contact us via email, phone, or other communication channels</li>
                <li>Engage with our services</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                This information may include your name, email address, phone number, company name, project details, and any other information you choose to provide.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Automatically Collected Information</h3>
              <p className="text-gray-700 leading-relaxed">
                When you visit our website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the site, we collect information about the individual web pages you view, what websites or search terms referred you to the site, and information about how you interact with the site.
              </p>
            </div>

            {/* Cookie Policy */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#2C5F7F]/10 flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-[#2C5F7F]" />
                </div>
                <h2 className="text-2xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Cookie Policy
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Types of Cookies We Use</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800">Essential Cookies</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800">Analytics Cookies</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800">Marketing Cookies</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.
                  </p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mt-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </div>

            {/* How We Use Your Information */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#2C5F7F]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#2C5F7F]" />
                </div>
                <h2 className="text-2xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  How We Use Your Information
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect in various ways, including to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Provide, operate, and maintain our website and services</li>
                <li>Respond to your enquiries and provide customer support</li>
                <li>Process and manage quote requests</li>
                <li>Send you marketing and promotional communications (with your consent)</li>
                <li>Improve, personalise, and expand our website and services</li>
                <li>Understand and analyse how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            {/* Data Protection */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#2C5F7F]/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#2C5F7F]" />
                </div>
                <h2 className="text-2xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Data Protection & Security
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organisational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#2C5F7F]/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#2C5F7F]" />
                </div>
                <h2 className="text-2xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Your Rights Under GDPR
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you are a resident of the European Economic Area (EEA) or the United Kingdom, you have certain data protection rights. These include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Right of access</strong> – You have the right to request copies of your personal data</li>
                <li><strong>Right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate</li>
                <li><strong>Right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions</li>
                <li><strong>Right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data</li>
                <li><strong>Right to object to processing</strong> – You have the right to object to our processing of your personal data</li>
                <li><strong>Right to data portability</strong> – You have the right to request that we transfer the data we have collected to another organisation</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
              </p>
            </div>

            {/* Data Retention */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#2C5F7F]/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#2C5F7F]" />
                </div>
                <h2 className="text-2xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Data Retention
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies. Contact form submissions and quote requests are typically retained for up to 3 years unless you request earlier deletion.
              </p>
            </div>

            {/* Third-Party Services */}
            <div>
              <h2 className="text-2xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Third-Party Services
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may employ third-party companies and individuals to facilitate our website and services. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-[#2C5F7F]/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#2C5F7F]/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#2C5F7F]" />
                </div>
                <h2 className="text-2xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Contact Us
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, or if you would like to exercise any of your data protection rights, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> info@commercialshotblasting.co.uk</p>
                <p><strong>Phone:</strong> 07970 566409</p>
                <p><strong>Address:</strong> Commercial Shot Blasting, United Kingdom</p>
              </div>
            </div>

            {/* Changes to Policy */}
            <div>
              <h2 className="text-2xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C5F7F] text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <span className="font-bold">CSB</span>
                </div>
                <span className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Commercial Shot Blasting</span>
              </div>
              <p className="text-white/70 text-sm">
                Professional shot blasting services for industrial and commercial applications across the UK.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link href="/services/steel-shot-blasting" className="hover:text-white transition">Steel Shot Blasting</Link></li>
                <li><Link href="/services/concrete-preparation" className="hover:text-white transition">Concrete Preparation</Link></li>
                <li><Link href="/services/automotive-restoration" className="hover:text-white transition">Automotive Restoration</Link></li>
                <li><Link href="/services/marine-services" className="hover:text-white transition">Marine Services</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="/#about" className="hover:text-white transition">About Us</a></li>
                <li><a href="/#industries" className="hover:text-white transition">Industries</a></li>
                <li><Link href="/gallery" className="hover:text-white transition">Gallery</Link></li>
                <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-white/70 text-sm">
                <li>
                  <a href="tel:07970566409" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                    07970 566409
                  </a>
                </li>
                <li>
                  <a href="mailto:info@commercialshotblasting.co.uk" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                    info@commercialshotblasting.co.uk
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Nationwide UK Service
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
            © {new Date().getFullYear()} Commercial Shot Blasting Services. All rights reserved.
          </div>
        </div>
      </footer>

      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
    </div>
  );
}
