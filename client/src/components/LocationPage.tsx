import { Link } from "wouter";
import { Phone, MapPin, CheckCircle, ArrowRight, Award, Zap, Building2, Star, Factory } from "lucide-react";
import { useState, useMemo } from "react";
import { getLocationSEO, useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { ReviewSchema } from "@/components/ReviewSchema";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Footer } from "@/components/Footer";
import { ShareButton } from "@/components/ShareButton";
import { ServiceRadiusMap } from "@/components/ServiceRadiusMap";
import { trackPhoneCall } from "@/lib/analytics";
import { FAQSchema, generateLocationFAQs } from "@/components/FAQSchema";
import { LocationData, locationData } from '@shared/locationData';
import { services } from '@/data/services';
import { trpc } from "@/lib/trpc";
export type { LocationData };

// Sub-component: renders AI-refreshed content for this location if available
function LocationCustomContent({ slug, locationName }: { slug: string; locationName: string }) {
  const { data } = trpc.serviceArea.getContent.useQuery({ slug }, { staleTime: 1000 * 60 * 10 });
  if (!data?.customContent) return null;
  return (
    <section className="py-16 bg-[#f0f6fb]">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#2C5F7F] font-medium mb-2">Local Expertise</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting in {locationName} — Latest Insights
            </h2>
          </div>
          <div
            className="blog-prose bg-white rounded-2xl shadow-sm p-8 md:p-12"
            dangerouslySetInnerHTML={{ __html: data.customContent }}
          />
        </div>
      </div>
    </section>
  );
}

const INDUSTRIES = [
  { slug: 'aerospace', name: 'Aerospace' },
  { slug: 'agriculture', name: 'Agriculture' },
  { slug: 'construction', name: 'Construction' },
  { slug: 'heritage-restoration', name: 'Heritage Restoration' },
  { slug: 'manufacturing', name: 'Manufacturing' },
  { slug: 'marine', name: 'Marine' },
  { slug: 'retail', name: 'Retail' },
  { slug: 'transport-logistics', name: 'Transport & Logistics' },
];

interface LocationPageProps {
  location: LocationData;
}

export function LocationPage({ location }: LocationPageProps) {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  // Derive nearby towns from same-county locations (up to 8, excluding current)
  const nearbyTowns = useMemo(() => {
    return Object.values(locationData)
      .filter(l => l.countySlug === location.countySlug && l.slug !== location.slug)
      .slice(0, 8);
  }, [location.countySlug, location.slug]);

  // Set SEO metadata with optimized location-specific descriptions
  useSEO(getLocationSEO(location.name, location.slug, location.county));

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Service Areas", href: "/service-areas" },
    { label: location.county, href: `/counties/${location.countySlug}` },
    { label: location.name, href: `/service-areas/${location.slug}` }
  ];

  return (
    <>
      <LocalBusinessSchema 
        name="Commercial Shot Blasting"
        city={location.name}
        region={location.county}
        description={location.description}
        url={`https://commercialshotblasting.co.uk/service-areas/${location.slug}`}
        nearbyAreas={location.nearbyAreas}
      />
      <ReviewSchema locationName={location.name} county={location.county} />
      <FAQSchema faqs={generateLocationFAQs(location.name, location.county)} locationName={location.name} />
      
      <Header />
      
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3a4d] text-white py-20">
        <HeroCarousel>
          <div className="absolute inset-0 bg-gradient-to-br from-[#2C5F7F]/90 to-[#1a3a4d]/90 z-10" />
        </HeroCarousel>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <p className="text-blue-200 font-medium mb-4">Professional Surface Preparation</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services in {location.name}
            </h1>
            {/* Item 7: Visible AggregateRating badge */}
            <div className="flex items-center gap-2 mb-4" aria-label="Customer rating: 4.9 out of 5 based on 127 reviews">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-4 h-4 ${i <= 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-400/50 text-yellow-400/50'}`} />
                ))}
              </div>
              <span className="text-yellow-300 font-semibold text-sm">4.9</span>
              <span className="text-blue-200 text-sm">(127 reviews)</span>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Expert mobile shot blasting services throughout {location.name} and {location.county}. Professional rust removal and surface preparation for commercial and industrial clients.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-white text-[#2C5F7F] hover:bg-gray-100"
                onClick={() => setQuotePopupOpen(true)}
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => { trackPhoneCall('07970566409', 'Location Page'); window.location.href = 'tel:07970566409'; }}
              >
                <Phone className="w-5 h-5 mr-2" />
                07970 566409
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#2C5F7F] font-medium mb-2">Local Experts</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Serving {location.name} with Professional Shot Blasting
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                We provide comprehensive mobile shot blasting services throughout {location.name} and the wider <a href={`/counties/${location.countySlug}`} className="text-[#2C5F7F] hover:underline font-medium">{location.county}</a> area. Our fully equipped mobile units bring professional surface preparation directly to your site, eliminating the need for costly transportation of materials or equipment.
              </p>
              <p>
                {location.industries && location.industries.length > 0 ? (
                  <>Supporting {location.name}'s {location.industries.join(', ')} sectors, we deliver expert rust removal, paint stripping, and surface preparation services. Our team understands the unique requirements of local businesses and provides tailored solutions for every project.</>
                ) : (
                  <>Our experienced team serves businesses and industrial facilities across {location.name}, providing expert rust removal, paint stripping, and surface preparation services. We understand the unique requirements of local projects and deliver tailored solutions for every application.</>
                )}
              </p>
              <p>
                From small fabrications to large industrial equipment, our mobile shot blasting service in {location.name} ensures consistent, high-quality results. We work efficiently to minimize disruption to your operations while delivering the superior surface finish your project demands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Your Local Choice</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Choose Us in {location.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional shot blasting services delivered with expertise and reliability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Mobile Service</h3>
              <p className="text-gray-600">
                We bring our fully equipped mobile units directly to your location in {location.name}, saving you time and transportation costs.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Expert Team</h3>
              <p className="text-gray-600">
                Our experienced operators deliver consistent, high-quality results on every project across {location.county}.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Commercial Focus</h3>
              <p className="text-gray-600">
                Specializing in commercial and industrial applications, we understand the demands of business operations in {location.name}.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Fast Response</h3>
              <p className="text-gray-600">
                Quick response times and flexible scheduling to meet your project deadlines in {location.name} and surrounding areas.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Local Knowledge</h3>
              <p className="text-gray-600">
                Familiar with {location.name} and the {location.region}, we provide reliable service you can count on.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Free Quotes</h3>
              <p className="text-gray-600">
                No-obligation quotations for all projects in {location.name}. Call us today to discuss your requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services in {location.name}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Rust Removal & Surface Preparation",
              "Paint & Coating Stripping",
              "Metal Surface Cleaning",
              "Concrete Floor Preparation",
              "Industrial Equipment Blasting",
              "Vehicle & Machinery Restoration"
            ].map((service, index) => (
              <div key={index} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-[#2C5F7F] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">{service}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/services">
              <Button variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                View All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Nearby Areas Section */}
      {/* Item 6: Nearby towns as internal anchor links (derived from same county) */}
      {nearbyTowns.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                We Also Serve Areas Near {location.name}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our mobile shot blasting service covers {location.name} and surrounding towns throughout {location.county}.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-2 justify-center">
                {nearbyTowns.map((town) => (
                  <Link
                    key={town.slug}
                    href={`/service-areas/${town.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full text-sm text-[#2C5F7F] font-medium border border-gray-200 hover:bg-[#2C5F7F] hover:text-white hover:border-[#2C5F7F] transition-colors"
                  >
                    <MapPin className="w-3 h-3" />
                    {town.name}
                  </Link>
                ))}
              </div>
              <div className="text-center mt-4">
                <Link href={`/counties/${location.countySlug}`} className="text-sm text-[#2C5F7F] font-medium hover:underline">
                  View all {location.county} service areas →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Location Map Section */}
      <section
        className="py-16 bg-gray-50"
        aria-label={`Service radius map showing coverage area around ${location.name}, ${location.county}`}
      >
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#2C5F7F] font-medium mb-2">Find Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our Service Area in {location.name}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide mobile shot blasting services throughout {location.name} and the surrounding areas in {location.county}.
              </p>
            </div>
            <ServiceRadiusMap locationName={location.name} county={location.county} radiusMiles={30} />
          </div>
        </div>
      </section>

      {/* AI-Refreshed Local Expertise Section — only shown when scheduler has updated content */}
      <LocationCustomContent slug={location.slug} locationName={location.name} />

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#2C5F7F] font-medium mb-2">Common Questions</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                FAQs About Shot Blasting in {location.name}
              </h2>
            </div>

            <div className="space-y-6">
              {generateLocationFAQs(location.name, location.county).map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#2C2C2C] mb-3">
                    <span className="text-[#2C5F7F]">Q:</span> {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-14 bg-gray-50">
        <div className="container">
          <div className="text-center mb-8">
            <p className="text-[#2C5F7F] font-medium mb-2">Client Feedback</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Our Clients Say
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="text-sm font-semibold text-gray-700">4.9 / 5</span>
              <span className="text-sm text-gray-500">&mdash; 127 verified reviews</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'James H.', company: 'Midlands Steel Fabricators', text: `The team arrived on time and blasted our structural steelwork to SA2.5 standard. Excellent finish and very professional throughout.` },
              { name: 'Sarah M.', company: 'West Midlands Property Group', text: 'Competitive quote, fast turnaround, and the site was left spotless. We\'ve used them three times now and always impressed.' },
              { name: 'Dave T.', company: 'National Container Services', text: 'Handled a batch of 12 containers efficiently. The mobile unit came directly to our yard — no logistics headaches at all.' },
            ].map((t, i) => (
              <blockquote key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100" itemScope itemType="https://schema.org/Review">
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4" itemProp="reviewBody">&ldquo;{t.text}&rdquo;</p>
                <footer className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#2C5F7F]/10 flex items-center justify-center">
                    <span className="text-[#2C5F7F] font-bold text-xs">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#2C2C2C]" itemProp="author">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.company}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      <section className="py-14 bg-white">
        <div className="container">
          <div className="text-center mb-8">
            <p className="text-[#2C5F7F] font-medium mb-2">What We Offer</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Shot Blasting Services in {location.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {services.slice(0, 8).map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.id}`}
                className="group flex gap-3 bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-16 flex-shrink-0 overflow-hidden">
                  <img
                    src={s.heroImage}
                    alt={s.title}
                    width="64"
                    height="64"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col justify-center py-3 pr-3 min-w-0">
                  <span className="font-semibold text-[#2C5F7F] text-sm leading-tight group-hover:underline">{s.shortTitle}</span>
                  <span className="text-xs text-gray-500 mt-0.5 line-clamp-2">{s.tagline.split(' ').slice(0, 5).join(' ')}…</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm text-[#2C5F7F] font-medium hover:underline">
              <ArrowRight className="w-4 h-4" />
              View all 18 services
            </Link>
          </div>
        </div>
      </section>

      {/* Item 9: Industries We Serve section */}
      <section className="py-14 bg-gray-50">
        <div className="container">
          <div className="text-center mb-8">
            <p className="text-[#2C5F7F] font-medium mb-2">Sectors We Cover</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Industries We Serve in {location.name}
            </h2>
            <p className="text-gray-600 mt-2 max-w-xl mx-auto text-sm">
              Our shot blasting services are trusted across a wide range of sectors throughout {location.county}.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="group flex flex-col items-center gap-2 bg-white rounded-lg p-4 border border-gray-100 hover:border-[#2C5F7F] hover:shadow-sm transition-all text-center"
              >
                <Factory className="w-5 h-5 text-[#2C5F7F] group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-[#2C2C2C] leading-tight">{ind.name}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/industries" className="inline-flex items-center gap-2 text-sm text-[#2C5F7F] font-medium hover:underline">
              <ArrowRight className="w-4 h-4" />
              View all industries
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#2C5F7F] to-[#1a3a4d] text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to Start Your Project in {location.name}?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get a free, no-obligation quote for your shot blasting project. Call us today or request a quote online.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-[#2C5F7F] hover:bg-gray-100"
                onClick={() => setQuotePopupOpen(true)}
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => { trackPhoneCall('07970566409', 'Location Page'); window.location.href = 'tel:07970566409'; }}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 07970 566409
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Item 10: Sticky mobile Get a Quote bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#2C5F7F] shadow-[0_-2px_12px_rgba(0,0,0,0.15)]">
        <div className="flex items-stretch">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 text-white font-semibold text-sm"
            onClick={() => setQuotePopupOpen(true)}
          >
            <ArrowRight className="w-4 h-4" />
            Get a Free Quote
          </button>
          <a
            href="tel:07970566409"
            className="flex items-center justify-center gap-2 px-5 py-3.5 bg-[#1a3a4d] text-white font-semibold text-sm border-l border-white/20"
            onClick={() => trackPhoneCall('07970566409', 'Location Page Sticky Bar')}
            aria-label="Call 07970 566409"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>
      </div>

      {/* Share on Social Media */}
      <ShareButton
        title={`Shot Blasting Services in ${location.name} | Commercial Shot Blasting`}
        url={`/service-areas/${location.slug}`}
        description={`Professional shot blasting services in ${location.name}, ${location.county}. Mobile rust removal and surface preparation for commercial and industrial clients.`}
      />

      <Footer />

      {/* Add bottom padding on mobile to prevent content being hidden behind sticky bar */}
      <div className="h-14 md:hidden" aria-hidden="true" />

      <QuotePopup 
        open={quotePopupOpen} 
        onOpenChange={setQuotePopupOpen}
        locationName={location.name}
      />
    </>
  );
}
