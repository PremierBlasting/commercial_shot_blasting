import { Link } from "wouter";
import { Phone, MapPin, CheckCircle, ArrowRight, Award, Zap, Building2, Star, Factory, ClipboardList, ChevronDown, ChevronUp } from "lucide-react";
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
import { countyData } from '@/data/countyData';
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
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Derive nearby towns from same-county locations (up to 12, excluding current)
  const nearbyTowns = useMemo(() => {
    return Object.values(locationData)
      .filter(l => l.countySlug === location.countySlug && l.slug !== location.slug)
      .slice(0, 12);
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

      {/* Breadcrumb Navigation */}
      <section className="py-4 bg-gray-50 border-b border-gray-200">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} bare />
        </div>
      </section>

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
              Professional shot blasting services in {location.name} — mobile rust removal, surface preparation, and industrial cleaning for commercial and industrial clients across {location.county}. Free quotes available.
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
                Professional Shot Blasting Services in {location.name}
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                We provide professional mobile shot blasting services throughout {location.name} and the wider <a href={`/counties/${location.countySlug}`} className="text-[#2C5F7F] hover:underline font-medium">{location.county}</a> area. Our fully equipped mobile units deliver expert surface preparation directly to your site — covering structural steelwork, factory cladding, shipping containers, floor preparation, fire escapes, warehouse racking, and more.
              </p>
              <p>
                {location.industries && location.industries.length > 0 ? (
                  <>Our shot blasting services in {location.name} support the {location.industries.join(', ')} sectors, delivering rust removal, paint stripping, mill scale removal, and surface profiling to the SA2.5 standard required for protective coating systems. We understand the demands of local industry and tailor every project accordingly.</>
                ) : (
                  <>Our shot blasting services in {location.name} cover the full range of commercial and industrial applications — from rust removal and paint stripping on structural steel to surface profiling for new protective coatings. We work to SA2.5 and SA3 standards and tailor every project to your specification.</>
                )}
              </p>
              <p>
                Whether you need a single component blasted or a full factory cladding programme, our mobile shot blasting service in {location.name} delivers consistent, high-quality results with minimal disruption to your operations. Call <a href="tel:07970566409" className="text-[#2C5F7F] hover:underline font-medium">07970 566409</a> for a free, no-obligation quote.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-[#2C5F7F] font-medium mb-2">Your Local Choice</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Choose Our Shot Blasting Services in {location.name}?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are the specialist choice for commercial and industrial shot blasting services in {location.name} — mobile, SA2.5/SA3 certified, and free to quote.
            </p>
          </div>

          {/* Trust bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: "18", label: "Shot Blasting Services" },
              { value: "SA2.5", label: "Guaranteed Blast Standard" },
              { value: "UK-Wide", label: "Mobile Coverage" },
              { value: "Free", label: "Site Surveys & Quotes" },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-white rounded-xl py-5 px-3 shadow-sm">
                <div className="text-2xl font-black text-[#2C5F7F] mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Mobile Shot Blasting in {location.name}</h3>
              <p className="text-gray-600">
                Our fully equipped mobile units travel directly to your site in {location.name}. No need to transport materials — we bring everything needed to complete the job on your premises.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">SA2.5 &amp; SA3 Certified Results</h3>
              <p className="text-gray-600">
                All shot blasting services in {location.name} are completed to SA2.5 near white metal or SA3 white metal standard — the correct surface profile for long-lasting protective coatings.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">18 Shot Blasting Services Available</h3>
              <p className="text-gray-600">
                From structural steelwork and factory cladding to containers, floor preparation, and plant &amp; machinery — we offer the full range of commercial shot blasting services in {location.name}.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">24-Hour Response in {location.name}</h3>
              <p className="text-gray-600">
                We typically respond to quote requests within 24 hours and can schedule a free site survey at your convenience anywhere in {location.name}.
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
              Shot Blasting Services Available in {location.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer the full range of commercial shot blasting services in {location.name}, delivered on-site by our mobile units.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { id: "structural-steel", label: "Structural Steelwork Shot Blasting", desc: "Beams, columns, trusses & fabrications" },
              { id: "factory-cladding", label: "Factory & Warehouse Cladding", desc: "Plastisol & paint removal from cladding panels" },
              { id: "container-blasting", label: "Container Shot Blasting", desc: "Shipping containers & storage units" },
              { id: "floor-preparation", label: "Industrial Floor Preparation", desc: "Concrete & steel floor surface profiling" },
              { id: "rust-removal", label: "Rust Removal & Mill Scale", desc: "Deep rust & scale removal to SA2.5/SA3" },
              { id: "plant-machinery", label: "Plant & Machinery", desc: "Industrial equipment, vehicles & pipework" },
            ].map((svc) => (
              <Link
                key={svc.id}
                href={`/services/${svc.id}`}
                className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-[#2C5F7F] hover:bg-[#2C5F7F]/5 transition-colors group"
              >
                <CheckCircle className="w-5 h-5 text-[#2C5F7F] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-800 font-semibold text-sm group-hover:text-[#2C5F7F] transition-colors">{svc.label}</span>
                  <p className="text-xs text-gray-500 mt-0.5">{svc.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/services">
              <Button variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                View All 18 Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Nearby Areas Section */}
      {/* Item 6: Nearby towns as internal card links (derived from same county, up to 12) */}
      {nearbyTowns.length > 0 && (
        <section className="py-14 bg-[#f0f6fb]">
          <div className="container">
            <div className="text-center mb-8">
              <p className="text-[#2C5F7F] font-medium mb-2 uppercase tracking-wide text-sm">Local Coverage</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Shot Blasting Services Near {location.name}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                We provide mobile shot blasting services across {location.name} and all surrounding towns throughout {location.county}. Select a nearby area for local service information.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {nearbyTowns.map((town) => (
                <Link
                  key={town.slug}
                  href={`/service-areas/${town.slug}`}
                  className="flex items-center justify-center text-center bg-white rounded-lg px-3 py-4 text-sm font-medium text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white transition-colors duration-200 shadow-sm hover:shadow-md gap-1.5"
                >
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span>Shot Blasting {town.name}</span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href={`/counties/${location.countySlug}`} className="inline-flex items-center gap-2 text-[#2C5F7F] hover:text-[#1a3d52] font-semibold text-sm">
                View all shot blasting services in {location.county}
                <ArrowRight className="w-4 h-4" />
              </Link>
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

            <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
              {generateLocationFAQs(location.name, location.county).map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg overflow-hidden" itemScope itemType="https://schema.org/Question">
                  <button
                    type="button"
                    aria-expanded={expandedFaq === index}
                    aria-controls={`loc-faq-answer-${index}`}
                    id={`loc-faq-btn-${index}`}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <span className="font-semibold text-[#2C5F7F] pr-4" itemProp="name">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-[#2C5F7F] flex-shrink-0" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#2C5F7F] flex-shrink-0" aria-hidden="true" />
                    )}
                  </button>
                  <div
                    id={`loc-faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`loc-faq-btn-${index}`}
                    className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? 'max-h-96' : 'max-h-0'}`}
                    itemScope itemType="https://schema.org/Answer"
                  >
                    <p className="px-6 pb-4 text-gray-700 leading-relaxed" itemProp="text">{faq.answer}</p>
                  </div>
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
      <section className="py-14 bg-[#f0f6fb]">
        <div className="container">
          <div className="text-center mb-8">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Services</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services Available in {location.name}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mt-2 text-sm">
              We offer the full range of commercial and industrial shot blasting services across {location.name} and {location.county}.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { slug: "structural-steel-shot-blasting", label: "Structural Steel" },
              { slug: "container-shot-blasting", label: "Container Blasting" },
              { slug: "factory-cladding-shot-blasting", label: "Factory Cladding" },
              { slug: "floor-shot-blasting", label: "Floor Preparation" },
              { slug: "fire-escape-shot-blasting", label: "Fire Escapes" },
              { slug: "pipework-shot-blasting", label: "Pipework & Steel" },
              { slug: "agricultural-shot-blasting", label: "Agricultural" },
              { slug: "telecom-tower-shot-blasting", label: "Telecom Towers" },
              { slug: "machinery-shot-blasting", label: "Plant & Machinery" },
              { slug: "racking-shot-blasting", label: "Warehouse Racking" },
              { slug: "marine-shot-blasting", label: "Marine & Offshore" },
              { slug: "heritage-shot-blasting", label: "Heritage & Restoration" },
            ].map((svc) => (
              <a
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="flex items-center justify-center text-center bg-white rounded-lg px-3 py-4 text-sm font-medium text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                {svc.label}
              </a>
            ))}
          </div>
          <div className="text-center mt-6">
            <a href="/services" className="inline-flex items-center gap-2 text-[#2C5F7F] hover:text-[#1a3d52] font-semibold text-sm">
              View All 18 Shot Blasting Services
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Related Industries — county-specific 3-card section */}
      {(() => {
        const industryRouteMap: Record<string, { slug: string; label: string; desc: string }> = {
          "Manufacturing": { slug: "manufacturing", label: "Manufacturing", desc: "Surface preparation for fabricated components, plant, and production equipment." },
          "Construction": { slug: "construction", label: "Construction", desc: "Structural steel, cladding, and civil engineering surface preparation." },
          "CommercialConstruction": { slug: "construction", label: "Construction", desc: "Structural steel, cladding, and civil engineering surface preparation." },
          "Aerospace": { slug: "aerospace", label: "Aerospace & Defence", desc: "Precision blasting for aerospace components and defence structures." },
          "Aerospace&Defence": { slug: "aerospace", label: "Aerospace & Defence", desc: "Precision blasting for aerospace components and defence structures." },
          "Defense": { slug: "aerospace", label: "Aerospace & Defence", desc: "Precision blasting for aerospace components and defence structures." },
          "Marine": { slug: "marine", label: "Marine & Offshore", desc: "Shipyard, port, and offshore structure blasting to marine standards." },
          "Marine&Shipbuilding": { slug: "marine", label: "Marine & Offshore", desc: "Shipyard, port, and offshore structure blasting to marine standards." },
          "Shipbuilding&Marine": { slug: "marine", label: "Marine & Offshore", desc: "Shipyard, port, and offshore structure blasting to marine standards." },
          "Agriculture": { slug: "agriculture", label: "Agriculture", desc: "Farm machinery, grain stores, and agricultural equipment blasting." },
          "Retail": { slug: "retail", label: "Retail & Commercial", desc: "Shop fronts, mezzanine floors, and commercial property surface prep." },
          "Heritage&Restoration": { slug: "heritage-restoration", label: "Heritage & Restoration", desc: "Gentle blasting for listed buildings, ironwork, and heritage structures." },
          "Logistics": { slug: "transport-logistics", label: "Transport & Logistics", desc: "Fleet vehicles, trailers, and logistics infrastructure blasting." },
          "Automotive": { slug: "transport-logistics", label: "Transport & Logistics", desc: "Fleet vehicles, trailers, and logistics infrastructure blasting." },
          "Energy": { slug: "construction", label: "Energy & Infrastructure", desc: "Pipework, towers, and energy infrastructure surface preparation." },
          "Nuclear&Energy": { slug: "construction", label: "Energy & Infrastructure", desc: "Pipework, towers, and energy infrastructure surface preparation." },
          "Steel": { slug: "manufacturing", label: "Steel & Fabrication", desc: "Mill scale removal and surface prep for steel fabricators and stockholders." },
          "Ceramics": { slug: "manufacturing", label: "Ceramics & Potteries", desc: "Industrial kiln furniture, plant, and ceramics facility surface prep." },
          "Engineering": { slug: "manufacturing", label: "Engineering", desc: "Precision surface preparation for engineering components and structures." },
          "Technology": { slug: "manufacturing", label: "Technology & Engineering", desc: "Surface preparation for high-tech manufacturing facilities and equipment." },
          "Pharmaceuticals": { slug: "manufacturing", label: "Pharmaceuticals", desc: "Clean surface preparation for pharmaceutical plant and equipment." },
          "Nuclear": { slug: "construction", label: "Nuclear & Energy", desc: "Specialist surface preparation for nuclear and energy infrastructure." },
          "Ceramics&Potteries": { slug: "manufacturing", label: "Ceramics & Potteries", desc: "Industrial kiln furniture, plant, and ceramics facility surface prep." },
          "Shipbuilding": { slug: "marine", label: "Marine & Offshore", desc: "Shipyard, port, and offshore structure blasting to marine standards." },
          "Heritage": { slug: "heritage-restoration", label: "Heritage & Restoration", desc: "Gentle blasting for listed buildings, ironwork, and heritage structures." },
        };
        const county = countyData[location.countySlug];
        const countyIndustries = county?.industries ?? [];
        const industryCards = countyIndustries
          .map((ind) => industryRouteMap[ind.replace(/\s/g, "")])
          .filter(Boolean)
          .filter((v, i, arr) => arr.findIndex((x) => x.slug === v.slug) === i)
          .slice(0, 3);
        // Fallback to generic top-3 if county has no matching industries
        const fallbackCards = [
          { slug: "manufacturing", label: "Manufacturing", desc: "Surface preparation for fabricated components, plant, and production equipment." },
          { slug: "construction", label: "Construction", desc: "Structural steel, cladding, and civil engineering surface preparation." },
          { slug: "transport-logistics", label: "Transport & Logistics", desc: "Fleet vehicles, trailers, and logistics infrastructure blasting." },
        ];
        const cards = industryCards.length >= 2 ? industryCards : fallbackCards;
        return (
          <section className="py-12 bg-gray-50">
            <div className="container">
              <div className="text-center mb-6">
                <p className="text-[#2C5F7F] font-medium mb-1 uppercase tracking-wide text-sm">Sectors We Cover</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Industries We Serve in {location.name}
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  Shot blasting expertise across {location.county}'s key industrial sectors
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {cards.map(({ slug, label, desc }) => (
                  <Link key={slug} href={`/industries/${slug}`}>
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#2C5F7F]/30 transition-all duration-200 cursor-pointer group h-full flex flex-col gap-2">
                      <Factory className="w-5 h-5 text-[#2C5F7F] mb-1" />
                      <h3 className="font-semibold text-[#2C2C2C] group-hover:text-[#2C5F7F] transition-colors text-sm">{label}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed flex-1">{desc}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2C5F7F] mt-1">
                        View industry <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-5">
                <Link href="/industries" className="inline-flex items-center gap-2 text-sm text-[#2C5F7F] font-medium hover:underline">
                  <ArrowRight className="w-4 h-4" />
                  View all industries we serve
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

      {/* What to Expect Process Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Simple & Straightforward</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services in {location.name} — What to Expect
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Our shot blasting services in {location.name} are designed to be hassle-free from first contact to project completion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative flex flex-col items-center text-center p-6 bg-[#f0f6fb] rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-[#2C5F7F] text-white flex items-center justify-center text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>1</div>
              <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">Free Site Survey in {location.name}</h3>
              <p className="text-gray-600 text-sm">
                We visit your site in {location.name} at no charge, assess the surfaces to be blasted, and provide a detailed, no-obligation quote. We advise on the correct blast standard (SA2.5 or SA3) and any preparation needed.
              </p>
            </div>
            <div className="relative flex flex-col items-center text-center p-6 bg-[#f0f6fb] rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-[#2C5F7F] text-white flex items-center justify-center text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>2</div>
              <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">Mobile Unit Arrives On-Site</h3>
              <p className="text-gray-600 text-sm">
                Our fully equipped mobile shot blasting unit travels directly to your location in {location.name}. No need to transport your materials — we bring everything needed to carry out the work safely and efficiently on your premises.
              </p>
            </div>
            <div className="relative flex flex-col items-center text-center p-6 bg-[#f0f6fb] rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-[#2C5F7F] text-white flex items-center justify-center text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>3</div>
              <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">SA2.5 Finish &amp; Full Cleanup</h3>
              <p className="text-gray-600 text-sm">
                We complete the shot blasting to your specified standard — typically SA2.5 near white metal — and carry out a full site cleanup before leaving. Your surfaces are ready for protective coating immediately after our visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#2C5F7F] to-[#1a3a4d] text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Get a Quote for Shot Blasting Services in {location.name}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Free, no-obligation quotes for all shot blasting services in {location.name} and across {location.county}. Call us today or request a quote online — we typically respond within 24 hours.
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

      {/* Preparation Checklist */}
      <section className="py-14 bg-gradient-to-br from-[#F5F1E8] to-[#EAE4D4]">
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <p className="text-[#2C5F7F] font-medium mb-1 uppercase tracking-wide text-sm">Before We Arrive</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>
              How to Prepare for Shot Blasting in {location.name}
            </h2>
            <p className="text-gray-600 mt-2 text-sm">Three simple steps to ensure your project runs smoothly</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                title: "Request a Free Site Survey",
                text: `Call 07970 566409 or use our online form to arrange a free, no-obligation site visit in ${location.name}. We will assess the surfaces, confirm the blast standard required (SA2.5 or SA3), and provide a written quote — typically within 24 hours of the visit.`
              },
              {
                step: 2,
                title: "Clear the Work Area & Arrange Access",
                text: `Ensure the surfaces to be blasted are accessible with a clear 2–3 metre perimeter. Confirm access for our mobile unit and advise us of any height restrictions, locked gates, or site induction requirements. Remove vehicles, equipment, and materials from the blast zone.`
              },
              {
                step: 3,
                title: "Coordinate Coating After Blasting",
                text: `Arrange for protective coating or primer to be applied as soon as possible after blasting — ideally within 4 hours for steel surfaces. Discuss timing with your coating contractor in advance so there is no delay between blasting and coating for the best long-term result.`
              }
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-6 shadow-sm border border-[#2C5F7F]/10">
                <div className="w-10 h-10 rounded-full bg-[#2C5F7F] text-white flex items-center justify-center font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-[#2C5F7F] text-base mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button className="bg-[#2C5F7F] hover:bg-[#1a3d52] text-white" onClick={() => setQuotePopupOpen(true)}>
              Request Free Site Survey in {location.name}
            </Button>
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
