import { useState } from "react";
import { AlertTriangle, ArrowRight, FileText } from "lucide-react";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { useSEO } from "@/hooks/useSEO";
import {
  ADS_APP_NAME,
  ADS_APP_OPERATOR,
  ADS_APP_STATUS,
  ADS_APP_STATUS_NOTICE,
  ADS_APP_TERMS_META,
  LEGAL_LAST_UPDATED,
  googleAdsTermsSections,
} from "@shared/googleAdsAppLegal";

const SITE_URL = "https://commercialshotblasting.co.uk";
const TERMS_CANONICAL = `${SITE_URL}/terms-of-service`;

export default function AdsAppTermsOfService() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useSEO({
    title: ADS_APP_TERMS_META.title,
    description: ADS_APP_TERMS_META.description,
    canonical: TERMS_CANONICAL,
    robots: "noindex, follow",
  });

  return (
    <div className="min-h-screen bg-[#F5F1E8]" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />

      <main>
        <section className="border-b border-slate-200 bg-slate-50 py-4">
          <div className="container">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Terms of Service", href: "/terms-of-service", isCurrentPage: true },
              ]}
            />
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#173d57] py-16 text-white md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(69,137,167,0.55),transparent_42%)]" aria-hidden="true" />
          <div className="container relative max-w-5xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#b9dce7]">App-specific legal information</p>
            <div className="flex items-start gap-4">
              <FileText className="mt-1 h-9 w-9 shrink-0 text-[#f7d98f]" aria-hidden="true" />
              <div>
                <h1 className="text-4xl font-bold leading-tight md:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Terms of Service
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90">
                  These terms cover the proposed {ADS_APP_NAME}, an internal Google Ads reporting and campaign-management tool operated by {ADS_APP_OPERATOR}.
                </p>
                <p className="mt-5 text-sm text-white/70">Last updated: {LEGAL_LAST_UPDATED}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-amber-200 bg-[#fff8e7] py-6">
          <div className="container max-w-5xl">
            <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-white/70 p-5 text-[#5f4818] shadow-sm">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
              <div>
                <p className="font-bold">{ADS_APP_STATUS}</p>
                <p className="mt-1 text-sm leading-relaxed">{ADS_APP_STATUS_NOTICE}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container max-w-5xl">
            <article className="overflow-hidden rounded-2xl bg-white shadow-lg">
              <div className="divide-y divide-slate-200 p-7 md:p-12">
                {googleAdsTermsSections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28 py-8 first:pt-0 last:pb-0">
                    <h2 className="text-2xl font-bold leading-tight text-[#2C5F7F] md:text-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {section.heading}
                    </h2>
                    <div className="mt-5 space-y-4 text-[15px] leading-7 text-slate-700 [overflow-wrap:anywhere]">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {section.links && section.links.length > 0 && (
                      <div className="mt-5 flex flex-col items-start gap-2">
                        {section.links.map((link) => {
                          const isInternal = link.href.startsWith("/");
                          return isInternal ? (
                            <Link key={link.href} href={link.href} className="inline-flex max-w-full items-center gap-2 font-semibold text-[#2C5F7F] underline decoration-[#2C5F7F]/40 underline-offset-4 hover:text-[#1a3d52]">
                              <span className="break-words">{link.label}</span>
                              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                            </Link>
                          ) : (
                            <a key={link.href} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} className="inline-flex max-w-full items-center gap-2 font-semibold text-[#2C5F7F] underline decoration-[#2C5F7F]/40 underline-offset-4 hover:text-[#1a3d52]">
                              <span className="break-words">{link.label}</span>
                              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </section>
                ))}
              </div>
            </article>

            <div className="mt-8 rounded-2xl border border-[#2C5F7F]/15 bg-white/70 p-6 text-sm leading-relaxed text-slate-700">
              Need the separate data-use disclosures? <Link href="/privacy-policy#google-ads-app" className="font-bold text-[#2C5F7F] underline underline-offset-4 hover:text-[#1a3d52]">Read the Privacy Policy and Google Ads app disclosures</Link>.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
