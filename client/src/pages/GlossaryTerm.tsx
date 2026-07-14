import { useRoute, Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GLOSSARY_TERMS, GLOSSARY_BY_ID } from "@/data/glossaryData";
import { ChevronRight, BookOpen, ArrowLeft, Phone } from "lucide-react";

const SITE_URL = "https://commercialshotblasting.co.uk";

function GlossaryTermSchema({ term }: { term: typeof GLOSSARY_TERMS[number] }) {
  const url = `${SITE_URL}/glossary/${term.id}`;

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": url,
    "name": term.term,
    "description": term.shortDefinition,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "Shot Blasting & Surface Preparation Glossary",
      "url": `${SITE_URL}/glossary`,
      "publisher": {
        "@type": "Organization",
        "name": "Commercial Shot Blasting",
        "url": SITE_URL,
        "telephone": "07970566409",
        "areaServed": "GB"
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Glossary", "item": `${SITE_URL}/glossary` },
      { "@type": "ListItem", "position": 3, "name": term.term, "item": url }
    ]
  };

  const faqSchema = term.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": term.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${term.term} — Definition & Explanation`,
    "description": term.metaDescription,
    "url": url,
    "datePublished": "2026-07-14",
    "dateModified": "2026-07-14",
    "author": {
      "@type": "Organization",
      "name": "Commercial Shot Blasting",
      "url": SITE_URL
    },
    "publisher": {
      "@type": "Organization",
      "name": "Commercial Shot Blasting",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".term-definition", ".term-short-def"]
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </>
  );
}

export default function GlossaryTerm() {
  const [, params] = useRoute("/glossary/:slug");
  const slug = params?.slug || "";
  const term = GLOSSARY_BY_ID[slug];

  useSEO({
    title: term ? term.metaTitle : "Term Not Found | Shot Blasting Glossary",
    description: term ? term.metaDescription : "This glossary term could not be found.",
    canonical: term ? `${SITE_URL}/glossary/${term.id}` : undefined,
  });

  if (!term) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-20 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#1a3a4d] mb-4">Term Not Found</h1>
            <p className="text-gray-600 mb-6">This glossary term doesn't exist or may have been moved.</p>
            <Link href="/glossary" className="bg-[#E8B84A] text-[#1a3a4d] font-bold px-6 py-3 rounded hover:bg-yellow-400 transition-colors">
              Back to Glossary
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedTermObjects = term.relatedTerms
    .map((id) => GLOSSARY_BY_ID[id])
    .filter(Boolean);

  // Next and previous terms for navigation
  const currentIndex = GLOSSARY_TERMS.findIndex((t) => t.id === term.id);
  const prevTerm = currentIndex > 0 ? GLOSSARY_TERMS[currentIndex - 1] : null;
  const nextTerm = currentIndex < GLOSSARY_TERMS.length - 1 ? GLOSSARY_TERMS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <GlossaryTermSchema term={term} />

      {/* Hero / Header */}
      <section className="bg-[#1a3a4d] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-300 mb-4" aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-1 items-center">
              <li><Link href="/" className="hover:text-[#E8B84A] transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3.5 h-3.5 text-gray-500 mx-0.5" /></li>
              <li><Link href="/glossary" className="hover:text-[#E8B84A] transition-colors">Glossary</Link></li>
              <li><ChevronRight className="w-3.5 h-3.5 text-gray-500 mx-0.5" /></li>
              <li className="text-[#E8B84A]">{term.term}</li>
            </ol>
          </nav>

          <div className="flex items-start gap-4">
            <span className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-[#E8B84A] text-[#1a3a4d] font-bold text-lg flex-shrink-0 mt-1">
              {term.letter}
            </span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{term.term}</h1>
              <p className="term-short-def text-lg text-gray-200 max-w-2xl leading-relaxed">
                {term.shortDefinition}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="flex-grow py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Body content */}
            <article className="md:col-span-2">
              {/* Definition callout */}
              <div className="term-definition bg-blue-50 border-l-4 border-[#1a3a4d] rounded-r-lg p-5 mb-8">
                <p className="text-gray-800 leading-relaxed font-medium">{term.definition}</p>
              </div>

              {/* Extended body */}
              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: term.body }}
              />

              {/* FAQ Section */}
              {term.faqs.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-2xl font-bold text-[#1a3a4d] mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {term.faqs.map((faq, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-5">
                        <h3 className="font-semibold text-[#1a3a4d] mb-2 text-lg">{faq.question}</h3>
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Prev / Next navigation */}
              <div className="mt-12 flex gap-4 flex-wrap">
                {prevTerm && (
                  <Link
                    href={`/glossary/${prevTerm.id}`}
                    className="flex items-center gap-2 text-sm text-[#1a3a4d] border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>
                      <span className="block text-xs text-gray-400">Previous</span>
                      {prevTerm.term}
                    </span>
                  </Link>
                )}
                {nextTerm && (
                  <Link
                    href={`/glossary/${nextTerm.id}`}
                    className="flex items-center gap-2 text-sm text-[#1a3a4d] border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors ml-auto"
                  >
                    <span className="text-right">
                      <span className="block text-xs text-gray-400">Next</span>
                      {nextTerm.term}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Back to glossary */}
              <Link
                href="/glossary"
                className="flex items-center gap-2 text-sm text-[#1a3a4d] font-semibold hover:text-[#E8B84A] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to full glossary
              </Link>

              {/* Related terms */}
              {relatedTermObjects.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-bold text-[#1a3a4d] mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#E8B84A]" />
                    Related Terms
                  </h3>
                  <ul className="space-y-2">
                    {relatedTermObjects.map((related) => (
                      <li key={related.id}>
                        <Link
                          href={`/glossary/${related.id}`}
                          className="text-sm text-[#1a3a4d] hover:text-[#E8B84A] transition-colors font-medium flex items-center gap-1"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-[#E8B84A]" />
                          {related.term}
                        </Link>
                        <p className="text-xs text-gray-500 ml-5 mt-0.5 line-clamp-2">{related.shortDefinition}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* See also service/blog link */}
              {term.seeAlso && (
                <div className="bg-[#1a3a4d] text-white rounded-xl p-5">
                  <h3 className="font-bold mb-2 text-sm uppercase tracking-wide text-[#E8B84A]">See Also</h3>
                  <Link
                    href={term.seeAlso}
                    className="text-white hover:text-[#E8B84A] transition-colors font-semibold flex items-center gap-1"
                  >
                    {term.seeAlsoLabel}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {/* All glossary terms quick nav */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-bold text-[#1a3a4d] mb-3 text-sm uppercase tracking-wide">All Terms</h3>
                <ul className="space-y-1">
                  {GLOSSARY_TERMS.map((t) => (
                    <li key={t.id}>
                      <Link
                        href={`/glossary/${t.id}`}
                        className={`text-sm flex items-center gap-1 py-0.5 transition-colors ${
                          t.id === term.id
                            ? "text-[#E8B84A] font-semibold"
                            : "text-gray-600 hover:text-[#1a3a4d]"
                        }`}
                      >
                        {t.id === term.id && <ChevronRight className="w-3 h-3 text-[#E8B84A]" />}
                        {t.term}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-[#E8B84A] rounded-xl p-5">
                <h3 className="font-bold text-[#1a3a4d] mb-2">Need Shot Blasting?</h3>
                <p className="text-sm text-[#1a3a4d]/80 mb-4">12 mobile units across England & Wales. Free site surveys.</p>
                <Link
                  href="/contact"
                  className="block text-center bg-[#1a3a4d] text-white font-bold py-2.5 rounded hover:bg-[#0f2535] transition-colors text-sm mb-2"
                >
                  Get a Free Quote
                </Link>
                <a
                  href="tel:07970566409"
                  className="flex items-center justify-center gap-2 text-[#1a3a4d] font-semibold text-sm hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  07970 566409
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
