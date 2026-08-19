import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { QuotePopup } from "@/components/QuotePopup";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const serviceCategories = [
  {
    name: "Structural & Architectural",
    color: "#2C5F7F",
    services: [
      { id: "structural-steel-frames", title: "Structural Steel Shot Blasting" },
      { id: "steel-fabrications", title: "Steel Fabrications Shot Blasting", href: "/steel-fabrications" },
      { id: "external-staircases", title: "External Staircases Shot Blasting", href: "/external-staircases" },
      { id: "fire-escapes", title: "Fire Escape Shot Blasting" },
      { id: "warehouse-racking", title: "Racking & Mezzanine Blasting" },
      { id: "steel-gates", title: "Steel Gates & Railings" },
      { id: "steel-doors", title: "Steel Doors & Roller Shutters" },
      { id: "bridge-steelwork", title: "Bridge Steelwork" },
    ]
  },
  {
    name: "Industrial & Specialist",
    color: "#1a3d52",
    services: [
      { id: "steel-containers", title: "Container Shot Blasting" },
      { id: "floor-preparation", title: "Floor Shot Blasting" },
      { id: "pipework", title: "Pipework Shot Blasting" },
      { id: "telecom-towers", title: "Telecom Tower Shot Blasting" },
      { id: "plant-machinery", title: "Machinery Shot Blasting" },
      { id: "marine-shot-blasting", title: "Marine Shot Blasting" },
    ]
  },
  {
    name: "Surface Preparation",
    color: "#3d6b3d",
    services: [
      { id: "rust-removal", title: "Rust Removal" },
      { id: "mill-scale-removal", title: "Mill Scale Removal" },
      { id: "paint-stripping", title: "Paint Stripping" },
      { id: "coating-removal", title: "Coating Removal" },
      { id: "factory-cladding", title: "Factory Cladding Blasting" },
      { id: "agricultural-shot-blasting", title: "Agricultural Shot Blasting" },
    ]
  }
];

// Full service list for the image grid below
const allServices = [
  { id: "structural-steel-frames", title: "Structural Steel Shot Blasting", description: "High-performance cleaning for steel structures, removing rust, mill scale, and old coatings.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/sUfXaBUgQWNMAvEc.webp" },
  { id: "steel-fabrications", title: "Steel Fabrications Shot Blasting", description: "On-site shot blasting for fabricated steelwork — frames, base plates, arch sections, and channel assemblies blasted to Sa 2.5 standard.", image: "/manus-storage/SteelFabrications1After_ff77c1d1.jpg", href: "/steel-fabrications" },
  { id: "external-staircases", title: "External Staircases Shot Blasting", description: "On-site shot blasting of external steel staircases — rust, old paint, and contamination removed to Sa 2.5 near-white metal standard. No dismantling required.", image: "/manus-storage/SteelFabrications1After_ff77c1d1.jpg", href: "/external-staircases" },
  { id: "fire-escapes", title: "Fire Escape Shot Blasting", description: "Complete restoration of fire escape structures, ensuring safety compliance and longevity.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oySJrMBHyyuJOevk.webp" },
  { id: "warehouse-racking", title: "Racking & Mezzanine Blasting", description: "Complete refurbishment of storage systems, extending service life and improving appearance.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/WmoactuoGfwMmVwl.webp" },
  { id: "steel-gates", title: "Steel Gates & Railings", description: "Precision restoration for commercial and industrial entrance gates, perimeter railings, and decorative metalwork.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/dIVmiYILOzXbQFlg.webp" },
  { id: "steel-doors", title: "Steel Doors & Roller Shutters", description: "Professional restoration for industrial doors, warehouse roller shutters, security doors, and commercial access systems.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/EOszbYQwsYrTFvjN.webp" },
  { id: "bridge-steelwork", title: "Bridge Steelwork", description: "Specialized treatment for bridge components, meeting stringent infrastructure standards.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/cuwoxubhXPpGCUSf.webp" },
  { id: "steel-containers", title: "Container Shot Blasting", description: "Specialist shot blasting for steel containers and large storage structures, removing rust and old coatings.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/bGsCKoWjNMKfOhKj.webp" },
  { id: "floor-preparation", title: "Floor Shot Blasting", description: "Professional floor surface preparation for commercial and industrial facilities.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/YMGizlSGgTjDQAyi.webp" },
  { id: "pipework", title: "Pipework Shot Blasting", description: "Surface profiling for optimal coating adhesion on industrial pipework and process equipment.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/eqezEvtOwgDSGsCT.webp" },
  { id: "telecom-towers", title: "Telecom Tower Shot Blasting", description: "Specialized treatment for telecommunications infrastructure, ensuring long-term protection.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/XLIXJyIInSTPQjlE.webp" },
  { id: "plant-machinery", title: "Machinery Shot Blasting", description: "On-site shot blasting for construction equipment, agricultural machinery, and industrial plant.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/symRlOinndpZEzlR.webp" },
  { id: "marine-shot-blasting", title: "Marine Shot Blasting", description: "Specialist shot blasting for vessels, lock gates, jetties, and port infrastructure.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" },
  { id: "rust-removal", title: "Rust Removal", description: "Complete rust removal by shot blasting — faster and more thorough than grinding or wire brushing.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/sUfXaBUgQWNMAvEc.webp" },
  { id: "mill-scale-removal", title: "Mill Scale Removal", description: "Complete mill scale removal for optimal coating adhesion on new fabrications and structural steelwork.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/bGsCKoWjNMKfOhKj.webp" },
  { id: "paint-stripping", title: "Paint Stripping", description: "Industrial paint stripping by shot blasting — all coats removed in one pass, no chemicals required.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/GmdvvhZjrHfYtOVb.webp" },
  { id: "coating-removal", title: "Coating Removal", description: "Specialist removal of epoxy, polyurethane, intumescent, and marine coatings from steel structures.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/QXdidJpwgjaMnlmb.webp" },
  { id: "factory-cladding", title: "Factory Cladding Blasting", description: "Specialist cladding restoration removing plastisol and paint layers from factory and industrial building panels.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/GmdvvhZjrHfYtOVb.webp" },
  { id: "agricultural-shot-blasting", title: "Agricultural Shot Blasting", description: "Shot blasting for farm machinery, grain stores, and agricultural steelwork — mobile service to your farm.", image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80" },
];

const commercialResourceClusters = [
  {
    eyebrow: "Structural Steel & Fire Protection",
    title: "Prepare structural steel for durable coating systems",
    description: "Practical guidance for fabricators, main contractors, and specifiers planning blast cleaning before primer or intumescent paint.",
    links: [
      { label: "Steel fabrication & structural steel planning hub", href: "/steel-fabrication-surface-preparation" },
      { label: "Structural steel shot blasting", href: "/services/structural-steel-frames" },
      { label: "Intumescent painting preparation", href: "/services/intumescent-painting" },
      { label: "Prepare structural steel for intumescent paint", href: "/blog/how-to-prepare-structural-steel-for-intumescent-painting" },
    ],
  },
  {
    eyebrow: "Industrial Building Refurbishment",
    title: "Plan cladding and coating-removal projects with less disruption",
    description: "Compare preparation options, define the existing coating condition, and plan the right sequence before a building-refurbishment programme begins.",
    links: [
      { label: "Industrial steelwork restoration hub", href: "/industrial-steelwork-restoration" },
      { label: "Factory cladding blasting", href: "/services/factory-cladding" },
      { label: "Coating removal", href: "/services/coating-removal" },
      { label: "Shot blasting vs chemical stripping", href: "/blog/shot-blasting-vs-chemical-stripping" },
    ],
  },
  {
    eyebrow: "Specification & Procurement",
    title: "Specify the blast standard, scope, and site survey correctly",
    description: "Useful resources for estimating teams and project managers comparing Sa standards, scope factors, and the information needed for an accurate survey.",
    links: [
      { label: "Steel chimney & process stack planning hub", href: "/steel-chimney-process-stack-surface-preparation" },
      { label: "Sa 2.5 vs Sa 3 explained", href: "/blog/sa-2-5-vs-sa-3-surface-preparation-standard" },
      { label: "Specify shot blasting in a construction contract", href: "/blog/how-to-specify-shot-blasting-construction-contract" },
      { label: "Request a site visit", href: "/site-survey" },
    ],
  },
];

export default function Services() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useEffect(() => {
    // Set page-specific SEO meta tags
    document.title = "Shot Blasting Services UK | Commercial & Industrial | Commercial Shot Blasting";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional shot blasting services UK-wide — structural steel, factory cladding, containers, floor preparation, rust removal & more. Mobile service to your site. SA2.5/SA3 standard. Site visit. Call 07721 375756');
    }
    
    // Update meta keywords (reduced from 9 to 7)
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'shot blasting services, steel blasting, industrial blasting, concrete blasting, metal surface preparation, commercial blasting, UK');
    }

    // Set canonical URL
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://commercialshotblasting.co.uk/services';
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services", isCurrentPage: true }
      ]} className="container mt-6" />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Shot Blasting Services UK — Commercial &amp; Industrial
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Professional mobile shot blasting services for commercial and industrial clients throughout the UK. We deliver all 18 shot blasting services directly to your site — structural steelwork, factory cladding, containers, floor preparation, rust removal, pipework, plant and machinery, and more — to SA2.5 and SA3 standards.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-[#2C5F7F] hover:bg-gray-100"
            onClick={() => setQuotePopupOpen(true)}
          >
            Request A Site Visit
          </Button>
        </div>
      </section>

      {/* Intro / Trust Bar */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
              Commercial Shot Blasting provides <strong>shot blasting services</strong> across the UK for a wide range of commercial and industrial applications. Our fully equipped mobile units travel directly to your site anywhere in the UK, eliminating the cost and delay of transporting materials to a fixed workshop.
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              All shot blasting services are carried out to <strong>SA2.5 near white metal</strong> or <strong>SA3 white metal</strong> standards as required, leaving surfaces clean, profiled, and ready for protective coating. We work with fabricators, contractors, facilities managers, and site owners across construction, manufacturing, agriculture, marine, and heritage sectors.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-3xl mx-auto text-center">
            {[
              { label: "18 Services", sub: "Full range available" },
              { label: "SA2.5 / SA3", sub: "Blast standard guaranteed" },
              { label: "Mobile UK-Wide", sub: "We come to your site" },
              { label: "Site Visits", sub: "Fast response" },
            ].map((item) => (
              <div key={item.label} className="bg-[#f0f6fb] rounded-xl p-4">
                <p className="font-bold text-[#2C5F7F] text-lg">{item.label}</p>
                <p className="text-gray-500 text-xs mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Category Grid — matches the 3-column layout from the screenshot */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-[#2C5F7F] font-medium mb-2">All Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Browse by Service Category
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceCategories.map((category) => (
              <ScrollReveal key={category.name}>
                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white h-full">
                  <div className="px-5 py-3 text-white font-bold text-lg" style={{ backgroundColor: category.color }}>
                    {category.name}
                  </div>
                  <div className="divide-y divide-gray-100">
                    {category.services.map((service) => (
                      <Link
                        key={service.id}
                        href={(service as any).href ?? `/services/${service.id}`}
                        className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors group"
                      >
                        <span className="text-gray-800 text-sm font-medium group-hover:text-[#2C5F7F]">{service.title}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#2C5F7F] flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Full Services Image Grid */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-[#2C5F7F] font-medium mb-2">All 19 Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Complete Shot Blasting Service Range
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service, idx) => (
              <ScrollReveal key={service.id} delay={Math.min(idx % 3, 2) * 80}>
                <Link href={(service as any).href ?? `/services/${service.id}`} className="block group">
                  <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 h-full bg-white">
                    <div className="h-52 overflow-hidden">
                      <img loading="lazy"
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={800}
                        height={600}
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-[#2C5F7F] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                      <span className="text-[#2C5F7F] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial-intent topic clusters: connect services to the guides buyers need before enquiring. */}
      <section className="border-y border-slate-200 bg-slate-50 py-16">
        <div className="container">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-2 font-medium text-[#2C5F7F]">Commercial Project Planning</p>
            <h2 className="text-3xl font-bold text-[#2C2C2C] md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Guidance for Specifying and Planning Shot Blasting Work
            </h2>
            <p className="mt-4 text-gray-600">
              Explore service-specific guidance before you request a survey, compare preparation options, or finalise a coating specification.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {commercialResourceClusters.map((cluster) => (
              <article key={cluster.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-[#2C5F7F]">{cluster.eyebrow}</p>
                <h3 className="mt-3 text-xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>{cluster.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{cluster.description}</p>
                <ul className="mt-5 space-y-3 border-t border-slate-100 pt-4">
                  {cluster.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-flex items-center gap-2 text-sm font-semibold text-[#2C5F7F] hover:text-[#1a3d52] hover:underline">
                        {link.label} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Shot Blasting Services */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-[#2C5F7F] font-medium mb-2">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Choose Our Shot Blasting Services UK?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Mobile — We Come to You", body: "Our shot blasting services are fully mobile. We bring all equipment directly to your site anywhere in the UK, saving you the time and cost of transporting materials." },
              { title: "SA2.5 & SA3 Guaranteed", body: "Every shot blasting job is completed to the specified blast standard — SA2.5 near white metal or SA3 white metal — with a full site cleanup before we leave." },
              { title: "18 Services, One Provider", body: "From structural steelwork and factory cladding to floor preparation and powder coating, we offer the full range of shot blasting services under one roof." },
            ].map((item) => (
              <div key={item.title} className="bg-[#f0f6fb] rounded-2xl p-6">
                <h3 className="font-bold text-[#2C2C2C] text-lg mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-[#2C5F7F] font-medium mb-2">Frequently Asked Questions</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services UK — FAQs
            </h2>
          </div>
          <div className="space-y-5">
            {[
              { q: "What shot blasting services do you offer?", a: "We offer 18 specialist shot blasting services including structural steel frames, factory and warehouse cladding, steel containers, floor preparation, fire escapes, staircases, bridge steelwork, warehouse racking, process pipework, telecom masts, commercial radiators, commercial vehicles, steel doors, steel sheeting, steel gates, plant and machinery, and combined shot blasting and powder coating." },
              { q: "Do you offer shot blasting services across the whole of the UK?", a: "Yes. Our mobile shot blasting services cover the UK. We travel directly to your site, so there is no need to transport your materials. We regularly work across the Midlands, North West, Yorkshire, South East, South West, and Wales." },
              { q: "What blast standard do your shot blasting services achieve?", a: "All our shot blasting services are carried out to SA2.5 near white metal or SA3 white metal as specified. These are internationally recognised standards (ISO 8501-1) that define the cleanliness of the blasted surface and are required by most protective coating manufacturers." },
              { q: "How much do shot blasting services cost?", a: "The cost of shot blasting services depends on the surface area, material type, blast standard required, and site location. We provide no-obligation quotes for all projects. Call 07721 375756 or use our online quote form to get a price." },
              { q: "How quickly can you carry out shot blasting services?", a: "We can typically schedule a site visit within a few days. For urgent projects, call us directly on 07721 375756 to discuss availability." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-[#2C2C2C] mb-2 flex items-start gap-2">
                  <span className="text-[#E8B84A] font-bold flex-shrink-0">Q:</span>
                  {item.q}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed ml-6">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#2C5F7F] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Request A Site Visit for Shot Blasting Services UK
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            No-obligation quotes for all shot blasting services across the UK. We can schedule a site survey at your convenience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-[#2C5F7F] hover:bg-gray-100"
              onClick={() => setQuotePopupOpen(true)}
            >
              Request A Site Visit
            </Button>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
