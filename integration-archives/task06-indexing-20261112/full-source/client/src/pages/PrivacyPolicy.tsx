import { useState } from "react";
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { Link } from "wouter";
import { ArrowLeft, Shield, Cookie, Database, Mail, Phone, MapPin, Lock, Users, Clock, type LucideIcon } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useSEO } from "@/hooks/useSEO";
import {
  ADS_APP_NAME,
  ADS_APP_OPERATOR,
  ADS_APP_PRIVACY_META,
  ADS_APP_PRIVACY_PATH,
  ADS_APP_STATUS,
  ADS_APP_STATUS_NOTICE,
  ADS_APP_TERMS_PATH,
  googleAdsPrivacySections,
  type AppLegalSection,
} from "@shared/googleAdsAppLegal";
import { websitePrivacySections, WEBSITE_PRIVACY_DATE_ISO, WEBSITE_PRIVACY_LAST_UPDATED } from "@shared/privacyPolicyContent";
import { CookiePreferencesButton } from "@/components/CookiePreferencesButton";

const sectionIcons: Record<string, LucideIcon> = {
  "information-we-collect": Database,
  "cookie-policy": Cookie,
  "how-we-use-your-information": Users,
  "data-protection-security": Lock,
  "your-rights": Shield,
  "data-retention": Clock,
  "lawful-basis": Shield,
  "data-controller": Database,
  "ico-complaints": Lock,
  "contact-us": Mail,
  "google-ads-app": Shield,
};

function PolicySection({ section }: { section: AppLegalSection }) {
  const Icon = sectionIcons[section.id];

  return (
    <section
      aria-labelledby={section.id}
      className={section.id === "contact-us" ? "bg-[#2C5F7F]/5 rounded-xl p-6" : undefined}
    >
      <div className="flex items-center gap-3 mb-4">
        {Icon && (
          <div className="w-10 h-10 shrink-0 rounded-full bg-[#2C5F7F]/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#2C5F7F]" aria-hidden="true" />
          </div>
        )}
        <h2
          id={section.id}
          tabIndex={-1}
          className="text-2xl font-bold text-[#2C5F7F] scroll-mt-32"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {section.heading}
        </h2>
      </div>
      <div className="space-y-4">
        {section.paragraphs.map((paragraph, index) => (
          <p key={`${section.id}-${index}`} className="text-gray-700 leading-relaxed [overflow-wrap:anywhere]">
            {paragraph}
          </p>
        ))}
      </div>
      {section.links && section.links.length > 0 && (
        <ul className="mt-4 space-y-2 list-none">
          {section.links.map(({ label, href }) => (
            <li key={`${section.id}-${href}`}>
              <a
                href={href}
                className="text-[#2C5F7F] underline hover:text-[#1a3d52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                {...(href.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function PrivacyPolicy() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useSEO({
    ...ADS_APP_PRIVACY_META,
    canonical: `https://commercialshotblasting.co.uk${ADS_APP_PRIVACY_PATH}`,
    robots: "noindex, follow",
  });

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />

      {/* Breadcrumb Navigation */}
      <section className="py-4 bg-gray-50 border-b border-gray-200">
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy", href: ADS_APP_PRIVACY_PATH, isCurrentPage: true }
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
            Your privacy is important to us. This policy explains how {ADS_APP_OPERATOR}, operating Commercial Shot Blasting, collects, uses, and protects your personal information.
          </p>
          <p className="text-white/60 text-sm mt-4">
            Last updated: <time dateTime={WEBSITE_PRIVACY_DATE_ISO}>{WEBSITE_PRIVACY_LAST_UPDATED}</time>
          </p>
          <p className="mt-4 text-sm"><CookiePreferencesButton /> — change or withdraw optional measurement at any time.</p>
          <a
            href="#google-ads-app"
            className="inline-block mt-6 text-white underline underline-offset-4 hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Jump to the pre-launch Google Ads app privacy disclosures
          </a>
        </div>
      </section>

      {/* Content */}
      <main className="py-16">
        <div className="container max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-12">
            <aside aria-labelledby="ads-app-status-heading" className="bg-amber-50 border border-amber-300 rounded-xl p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-amber-900 mb-2">
                Google Ads app: {ADS_APP_STATUS}
              </p>
              <h2 id="ads-app-status-heading" className="text-xl font-bold text-[#2C5F7F] mb-3">
                {ADS_APP_NAME} (proposed app name)
              </h2>
              <p className="text-gray-700 leading-relaxed">{ADS_APP_STATUS_NOTICE}</p>
              <a
                href="#google-ads-app"
                className="inline-block mt-4 text-[#2C5F7F] underline hover:text-[#1a3d52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Read the Google Ads app disclosures below
              </a>
            </aside>

            {websitePrivacySections.map((section) => (
              <PolicySection key={section.id} section={section} />
            ))}

            <div className="border-t border-gray-200 pt-10 space-y-12">
              {googleAdsPrivacySections.map((section) => (
                <PolicySection key={section.id} section={section} />
              ))}
            </div>
          </div>
        </div>
      </main>

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
                Professional shot blasting services for industrial and commercial applications nationwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link href="/services/structural-steel-frames" className="hover:text-white transition">Steel Shot Blasting</Link></li>
                <li><Link href="/services/floor-preparation" className="hover:text-white transition">Concrete Preparation</Link></li>
                <li><Link href="/services/commercial-vehicles" className="hover:text-white transition">Automotive Restoration</Link></li>
                <li><Link href="/services/marine-shot-blasting" className="hover:text-white transition">Marine Services</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="/#about" className="hover:text-white transition">About Us</a></li>
                <li><a href="/#industries" className="hover:text-white transition">Industries</a></li>
                <li><Link href="/our-work" className="hover:text-white transition">Our Work</Link></li>
                <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                <li><Link href={ADS_APP_PRIVACY_PATH} className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href={ADS_APP_TERMS_PATH} className="hover:text-white transition">Ads App Terms of Service</Link></li>
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
                  Professional service nationwide
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
