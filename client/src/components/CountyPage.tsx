import { Link } from "wouter";
import { locationData } from "@/data/locationData";
import { Phone, MapPin, CheckCircle, ArrowRight, Award, Zap, Building2, ChevronDown, ChevronUp, Wrench, Layers, Flame, Anchor, Factory, Settings } from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { HeroCarousel } from "@/components/HeroCarousel";
import { trackPhoneCall } from "@/lib/analytics";

import { Footer } from "@/components/Footer";
import { countyData, CountyData } from "@/data/countyData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceLinks } from "@/components/headerData";

const regionColours: Record<string, string> = {
  "West Midlands": "#2C5F7F",
  "East Midlands": "#3a7d5e",
  "Yorkshire": "#7d3a3a",
  "North West": "#5a3a7d",
  "East of England": "#7d6a3a",
  "South West": "#3a6a7d",
  "Wales Borders": "#3a7d4a",
};
import { CountyMap } from "@/components/CountyMap";

interface CountyPageProps {
  county: CountyData;
}

const galleryByCategory: Record<string, { src: string; alt: string; label: string; date?: string }[]> = {
  "All": [
    { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/UjSNpyqCeEUxElPP.webp", alt: "Shot blasting - structural steel preparation", label: "Structural Steel", date: "2025-09" },
    { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/eujkoesZcJTxNAzk.webp", alt: "Industrial surface preparation - rust removal", label: "Industrial Plant", date: "2025-10" },
    { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/UhOtVLOfPobtqyhi.webp", alt: "Commercial shot blasting - machinery cleaning", label: "Machinery", date: "2025-10" },
    { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yEbPReqUussVzDSr.webp", alt: "Shot blasting services - industrial plant", label: "Industrial Plant", date: "2025-11" },
    { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/xRNbdXezEbVeGwhe.webp", alt: "Surface preparation - steel beams", label: "Structural Steel", date: "2025-11" },
    { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/QRpJYgxdNmiyqvIK.webp", alt: "Industrial blasting - corrosion removal", label: "Industrial Plant", date: "2025-12" },
    { src: "/manus-storage/WhatsAppImage2026-04-27at16.58.43(5)_d258dff2.jpeg", alt: "Farm barn concrete panels mid-blast - agriculture", label: "Agriculture", date: "2026-04" },
    { src: "/manus-storage/WhatsAppImage2026-04-27at16.58.42(1)_a8f17ecc.jpeg", alt: "Farm barn fully shot blasted - agriculture", label: "Agriculture", date: "2026-04" },
    { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oIKBPlRyGOSKXcAl.webp", alt: "Shot blasting work - commercial project", label: "Commercial", date: "2025-11" },
    { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/okcUjGBJyNattGJb.webp", alt: "Professional blasting - surface treatment", label: "Commercial", date: "2025-11" },
    { src: "/manus-storage/WhatsAppImage2026-04-27at16.58.43(4)_5d798006.jpeg", alt: "Agricultural building after shot blasting", label: "Agriculture", date: "2026-04" },
    { src: "/manus-storage/WhatsAppImage2026-04-27at16.58.43(6)_5c09aa7a.jpeg", alt: "Agricultural barn wall after shot blasting", label: "Agriculture", date: "2026-04" },
    { src: "/manus-storage/marine-before-1_01d5fffa.jpg", alt: "Marine diesel engine block before shot blasting", label: "Marine & Offshore", date: "2026-03" },
    { src: "/manus-storage/marine-after-1_dc53f2eb.jpg", alt: "Marine diesel engine block after shot blasting", label: "Marine & Offshore", date: "2026-03" },
    { src: "/manus-storage/marine-after-3_9ab0feb6.jpg", alt: "Marine engine block - full length clean view", label: "Marine & Offshore", date: "2026-03" },
    { src: "/manus-storage/marine-after-4_292300df.jpg", alt: "Marine engine block - V-configuration end view", label: "Marine & Offshore", date: "2026-03" },
  ],
  "Structural Steel": [
    { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/UjSNpyqCeEUxElPP.webp", alt: "Shot blasting - structural steel preparation", label: "Structural Steel" },
    { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/xRNbdXezEbVeGwhe.webp", alt: "Surface preparation - steel beams", label: "Structural Steel" },
  ],
  "Industrial Plant": [
    { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/eujkoesZcJTxNAzk.webp", alt: "Industrial surface preparation - rust removal", label: "Industrial Plant" },
    { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yEbPReqUussVzDSr.webp", alt: "Shot blasting services - industrial plant", label: "Industrial Plant" },
    { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/QRpJYgxdNmiyqvIK.webp", alt: "Industrial blasting - corrosion removal", label: "Industrial Plant" },
  ],
  "Machinery": [
    { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/UhOtVLOfPobtqyhi.webp", alt: "Commercial shot blasting - machinery cleaning", label: "Machinery" },
  ],
  "Agriculture": [
    { src: "/manus-storage/WhatsAppImage2026-04-27at16.58.43(5)_d258dff2.jpeg", alt: "Farm barn concrete panels mid-blast", label: "Agriculture" },
    { src: "/manus-storage/WhatsAppImage2026-04-27at16.58.42(1)_a8f17ecc.jpeg", alt: "Farm barn fully shot blasted", label: "Agriculture" },
    { src: "/manus-storage/WhatsAppImage2026-04-27at16.58.43(4)_5d798006.jpeg", alt: "Agricultural building after shot blasting", label: "Agriculture" },
    { src: "/manus-storage/WhatsAppImage2026-04-27at16.58.43(6)_5c09aa7a.jpeg", alt: "Agricultural barn wall after shot blasting", label: "Agriculture" },
  ],
  "Commercial": [
    { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oIKBPlRyGOSKXcAl.webp", alt: "Shot blasting work - commercial project", label: "Commercial", date: "2025-11" },
    { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/okcUjGBJyNattGJb.webp", alt: "Professional blasting - surface treatment", label: "Commercial", date: "2025-11" },
  ],
  "Marine & Offshore": [
    { src: "/manus-storage/marine-before-1_01d5fffa.jpg", alt: "Marine diesel engine block before shot blasting - top view", label: "Marine & Offshore", date: "2026-03" },
    { src: "/manus-storage/marine-after-1_dc53f2eb.jpg", alt: "Marine diesel engine block after shot blasting - clean bare metal", label: "Marine & Offshore", date: "2026-03" },
    { src: "/manus-storage/marine-before-2_c23a76dd.jpg", alt: "Marine engine block before - side view showing corrosion", label: "Marine & Offshore", date: "2026-03" },
    { src: "/manus-storage/marine-after-2_30cf45df.jpg", alt: "Marine engine block after - clean side profile", label: "Marine & Offshore", date: "2026-03" },
    { src: "/manus-storage/marine-after-3_9ab0feb6.jpg", alt: "Marine engine block after shot blasting - full length view", label: "Marine & Offshore", date: "2026-03" },
    { src: "/manus-storage/marine-after-4_292300df.jpg", alt: "Marine engine block after - V-configuration end view", label: "Marine & Offshore", date: "2026-03" },
  ],
};

const galleryFilterLabels = ["All", "Most Recent", "Structural Steel", "Industrial Plant", "Machinery", "Agriculture", "Commercial", "Marine & Offshore"];

export function CountyPage({ county }: CountyPageProps) {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = `Shot Blasting Services ${county.name} | Commercial Shot Blasting UK`;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', county.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = county.description;
      document.head.appendChild(meta);
    }

    // Set keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const keywords = `shot blasting ${county.name}, rust removal ${county.name}, surface preparation ${county.name}, industrial blasting ${county.region}`;
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = keywords;
      document.head.appendChild(meta);
    }

    // Set Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const titleContent = `Shot Blasting Services ${county.name} | Commercial Shot Blasting UK`;
    if (ogTitle) {
      ogTitle.setAttribute('content', titleContent);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.setAttribute('content', titleContent);
      document.head.appendChild(meta);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', county.description);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.setAttribute('content', county.description);
      document.head.appendChild(meta);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', county.url);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:url');
      meta.setAttribute('content', county.url);
      document.head.appendChild(meta);
    }

    // og:image, og:image:width, og:image:height, og:locale
    const setOrCreate = (property: string, value: string) => {
      const el = document.querySelector(`meta[property="${property}"]`);
      if (el) {
        el.setAttribute('content', value);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('content', value);
        document.head.appendChild(meta);
      }
    };
    if (county.ogImage) {
      setOrCreate('og:image', county.ogImage);
      setOrCreate('twitter:image', county.ogImage);
      setOrCreate('twitter:image:alt', `Shot blasting services in ${county.name}`);
    }
    setOrCreate('og:image:width', '1200');
    setOrCreate('og:image:height', '630');
    setOrCreate('og:locale', 'en_GB');

    // ImageObject JSON-LD schema
    const schemaId = 'county-image-schema';
    let imageSchema = document.getElementById(schemaId);
    if (!imageSchema) {
      imageSchema = document.createElement('script');
      imageSchema.id = schemaId;
      (imageSchema as HTMLScriptElement).type = 'application/ld+json';
      document.head.appendChild(imageSchema);
    }
    if (county.ogImage) {
      imageSchema.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        'contentUrl': county.ogImage,
        'url': county.ogImage,
        'name': `Shot Blasting Services in ${county.name}`,
        'description': `Professional shot blasting and surface preparation services across ${county.name}`,
        'width': 1200,
        'height': 630,
        'encodingFormat': 'image/webp',
        'representativeOfPage': true,
        'creditText': 'Commercial Shot Blasting',
        'creator': {
          '@type': 'Organization',
          'name': 'Commercial Shot Blasting',
          'url': 'https://commercialshotblasting.co.uk'
        },
        'copyrightNotice': '\u00a9 2025 Commercial Shot Blasting. All rights reserved.',
        'acquireLicensePage': 'https://commercialshotblasting.co.uk/contact',
        'license': 'https://commercialshotblasting.co.uk/terms'
      });
    }

    return () => {
      const schema = document.getElementById(schemaId);
      if (schema) schema.remove();
    };
  }, [county]);

  // BreadcrumbList JSON-LD
  useEffect(() => {
    const breadcrumbId = 'county-breadcrumb-schema';
    let el = document.getElementById(breadcrumbId);
    if (!el) {
      el = document.createElement('script');
      el.id = breadcrumbId;
      (el as HTMLScriptElement).type = 'application/ld+json';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://commercialshotblasting.co.uk/' },
        { '@type': 'ListItem', position: 2, name: 'Counties', item: 'https://commercialshotblasting.co.uk/counties' },
        { '@type': 'ListItem', position: 3, name: county.name, item: `https://commercialshotblasting.co.uk/counties/${county.slug}` },
      ],
    });
    return () => {
      const s = document.getElementById(breadcrumbId);
      if (s) s.remove();
    };
  }, [county]);

  // All towns for this county sorted alphabetically
  const allCountyTowns = Object.values(locationData)
    .filter((loc) => loc.countySlug === county.slug)
    .sort((a, b) => a.name.localeCompare(b.name));

  // ItemList JSON-LD — lists all towns for this county
  useEffect(() => {
    const itemListId = 'county-itemlist-schema';
    let el = document.getElementById(itemListId);
    if (!el) {
      el = document.createElement('script');
      el.id = itemListId;
      (el as HTMLScriptElement).type = 'application/ld+json';
      document.head.appendChild(el);
    }
    const towns = Object.values(locationData)
      .filter((loc) => loc.countySlug === county.slug)
      .sort((a, b) => a.name.localeCompare(b.name));
    el.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': `Shot Blasting Service Areas in ${county.name}`,
      'description': `All towns and villages in ${county.name} covered by Commercial Shot Blasting mobile services`,
      'url': `https://commercialshotblasting.co.uk/counties/${county.slug}`,
      'numberOfItems': towns.length,
      'itemListElement': towns.map((t, i) => ({
        '@type': 'ListItem',
        'position': i + 1,
        'name': `Shot Blasting in ${t.name}`,
        'url': `https://commercialshotblasting.co.uk/service-areas/${t.slug}`,
      })),
    });
    return () => {
      const s = document.getElementById(itemListId);
      if (s) s.remove();
    };
  }, [county]);

  const [townSearch, setTownSearch] = useState("");
  const [townSearchLoading, setTownSearchLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show Back to Top button after scrolling 400px
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Debounce town search to show skeleton while user types
  useEffect(() => {
    if (townSearch === debouncedSearch) return;
    setTownSearchLoading(true);
    const t = setTimeout(() => {
      setDebouncedSearch(townSearch);
      setTownSearchLoading(false);
    }, 250);
    return () => clearTimeout(t);
  }, [townSearch, debouncedSearch]);

  const filteredTowns = debouncedSearch.trim().length >= 1
    ? allCountyTowns.filter((t) => t.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
    : allCountyTowns;

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
      <LocalBusinessSchema
        name={`Commercial Shot Blasting - ${county.name}`}
        city={county.majorTowns[0]}
        region={county.region}
        description={county.description}
        url={county.url}
        latitude={county.latitude.toString()}
        longitude={county.longitude.toString()}
      />

      {/* Breadcrumb Navigation */}
      <section className="py-4 bg-gray-50 border-b border-gray-200">
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Counties", href: "/counties" },
            { label: county.name, href: `/counties/${county.slug}`, isCurrentPage: true }
          ]} />
        </div>
      </section>

      {/* Hero Section */}
      <HeroCarousel className="py-16 md:py-24" primaryImage={county.ogImage}>
        <div className="max-w-3xl">
          <p className="text-[#F5F1E8] font-medium mb-2">Professional Shot Blasting Services</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Shot Blasting Services in {county.name}
          </h1>
          <p className="text-lg text-white/90 mb-8">
            Professional mobile shot blasting services across {county.name} — structural steelwork, factory cladding, containers, floor preparation, rust removal, and more. We serve commercial and industrial clients throughout {county.majorTowns.join(', ')} and the surrounding area, delivering results to SA2.5 and SA3 standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-[#F5F1E8]" onClick={() => setQuotePopupOpen(true)}>
              Request A Site Visit
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="tel:07970566409" className="flex items-center gap-2" onClick={() => trackPhoneCall('07970566409', 'County Page')}>
                <Phone className="w-4 h-4" />
                Call Now: 07970 566409
              </a>
            </Button>
          </div>
        </div>
      </HeroCarousel>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services in {county.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide professional shot blasting services for businesses across {county.name}, specializing in surface preparation for a wide range of industrial and commercial applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Structural Steel Frames",
                description: "Comprehensive shot blasting for building frames, trusses, and structural steelwork",
                icon: Building2
              },
              {
                title: "Industrial Equipment",
                description: "Professional surface preparation for machinery, plant equipment, and industrial assets",
                icon: Award
              },
              {
                title: "Factory Cladding",
                description: "Specialist restoration removing plastisol and paint layers from warehouse and factory cladding",
                icon: Zap
              },
              {
                title: "Fire Escapes & Staircases",
                description: "Precision blasting for fire safety infrastructure and architectural metalwork",
                icon: CheckCircle
              },
              {
                title: "Warehouse Racking",
                description: "Professional shot blasting for warehouse racking systems and pallet rack frames",
                icon: Building2
              },
              {
                title: "Commercial Vehicles",
                description: "Heavy-duty restoration for farm equipment, warehouse vehicles, and commercial fleets",
                icon: Award
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <service.icon className="w-12 h-12 text-[#2C5F7F] mb-4" />
                <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link href="/services" className="text-[#2C5F7F] hover:text-[#1a3d52] font-medium inline-flex items-center gap-2">
                    View All Services
                    <ArrowRight className="w-4 h-4" />
                  </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Industries We Serve</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services {county.name} — Industries We Serve
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our shot blasting services in {county.name} are trusted across a wide range of sectors, from construction and manufacturing to agriculture and heritage restoration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {county.industries.map((industry, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-[#2C5F7F]" />
                </div>
                <h3 className="text-lg font-bold text-[#2C2C2C]">{industry}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Towns Served */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Service Coverage</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Commercial Shot Blasting Coverage Across {county.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide mobile shot blasting services throughout {county.name}, including:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {county.majorTowns.map((town, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
                <MapPin className="w-5 h-5 text-[#2C5F7F] flex-shrink-0" />
                <span className="font-medium text-[#2C2C2C]">{town}</span>
              </div>
            ))}
          </div>

          {/* Towns and Villages Section */}
          <div className="mt-12" data-section="towns-villages">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#2C2C2C] mb-3">
                Towns & Villages We Serve in {county.name}
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our mobile shot blasting service covers all major towns and villages across {county.name}. If your location isn't listed, contact us - we likely serve your area.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {county.townsAndVillages.map((place, index) => {
                  // Create slug from place name
                  const slug = place.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
                  const locationExists = locationData[slug];
                  
                  if (locationExists) {
                    return (
                      <Link key={index} href={`/service-areas/${slug}`}>
                        <span className="inline-flex items-center px-3 py-1.5 bg-white rounded-full text-sm text-gray-700 border border-gray-200 hover:border-[#2C5F7F] hover:text-[#2C5F7F] cursor-pointer transition-colors">
                          {place}
                        </span>
                      </Link>
                    );
                  }
                  
                  return (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
                    >
                      {place}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/service-areas">
              <Button variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                View All Service Areas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-Linking Section - Explore Nearby Locations */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Explore Nearby Areas</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services in {county.name} Towns & Cities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Click on any location below to view detailed information about our shot blasting services in that specific area, including local FAQs, service coverage, and contact details.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {county.townsAndVillages.slice(0, 12).map((place, index) => {
              const slug = place.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
              const locationExists = locationData[slug];
              
              if (locationExists) {
                return (
                  <Link key={index} href={`/service-areas/${slug}`}>
                    <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-[#2C5F7F] hover:shadow-lg transition-all cursor-pointer group">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-[#2C2C2C] group-hover:text-[#2C5F7F] transition-colors">
                          {place}
                        </h3>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#2C5F7F] group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-sm text-gray-600">
                        Shot Blasting in {place}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-[#2C5F7F] font-medium">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>View service details</span>
                      </div>
                    </div>
                  </Link>
                );
              }
              return null;
            }).filter(Boolean)}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">
              Looking for a specific location? View our complete coverage across {county.name}
            </p>
            <Button 
              variant="outline" 
              className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white"
              onClick={() => {
                const townsSection = document.querySelector('[data-section="towns-villages"]');
                if (townsSection) {
                  townsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
            >
              View All {county.townsAndVillages.length} Locations
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Interactive Coverage Map</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Service Locations in {county.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our coverage across {county.name}. Red markers show major towns, blue markers indicate villages and smaller areas we serve.
            </p>
          </div>

          <CountyMap
            countyName={county.name}
            latitude={county.latitude}
            longitude={county.longitude}
            majorTowns={county.majorTowns}
            townsAndVillages={county.townsAndVillages}
          />
        </div>
      </section>

      {/* Mobile Service Coverage */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Mobile Service Throughout {county.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              We provide mobile shot blasting services throughout {county.name} and surrounding areas. Our fully equipped mobile units can reach any location in the region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:07970566409" className="inline-flex items-center gap-2 text-[#2C5F7F] hover:text-[#1a3d52] font-semibold" onClick={() => trackPhoneCall('07970566409', 'County Page CTA')}>
                <Phone className="w-5 h-5" />
                07970 566409
              </a>
              <Button onClick={() => setQuotePopupOpen(true)} className="bg-[#E8B84A] hover:bg-[#d4a63d] text-[#1a3d52]">
                Request A Site Visit
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-[#2C5F7F] font-medium mb-2">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Choose Our Shot Blasting Services in {county.name}?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are the specialist choice for commercial and industrial shot blasting services across {county.name} — mobile, fully equipped, and delivering SA2.5/SA3 results on-site.
            </p>
          </div>

          {/* Trust bar — county-specific proof points */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: "18", label: `Shot Blasting Services in ${county.name}` },
              { value: "SA2.5", label: "Guaranteed Blast Standard" },
              { value: county.industries.length > 0 ? `${county.industries.length}+` : "10+", label: `Key Sectors Served in ${county.name}` },
              { value: "Free", label: `Site Surveys Across ${county.name}` },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-[#f0f6fb] rounded-xl py-5 px-3">
                <div className="text-2xl font-black text-[#2C5F7F] mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2C5F7F] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">SA2.5 &amp; SA3 Certified Results</h3>
              <p className="text-gray-600">
                All shot blasting services in {county.name} are completed to SA2.5 near white metal or SA3 white metal standard — the correct surface profile for long-lasting protective coatings.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2C5F7F] rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Mobile Shot Blasting Across {county.name}</h3>
              <p className="text-gray-600">
                Our fully equipped mobile units travel directly to your site anywhere in {county.name}. No need to transport materials — we bring everything needed to complete the job on your premises.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2C5F7F] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">18 Shot Blasting Services Available</h3>
              <p className="text-gray-600">
                From structural steelwork and factory cladding to containers, floor preparation, and plant &amp; machinery — we offer the full range of commercial shot blasting services in {county.name}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Frequently Asked Questions</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services {county.name} — FAQs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Common questions about our shot blasting services across {county.name} and surrounding areas.
            </p>
          </div>

          <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
            {county.faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={expandedFaq === index}
                >
                  <h3 className="text-base font-semibold text-[#2C2C2C] flex items-center gap-3" itemProp="name">
                    <span className="text-[#E8B84A] font-bold text-sm flex-shrink-0 w-6 h-6 rounded-full bg-[#E8B84A]/10 flex items-center justify-center">Q</span>
                    {faq.question}
                  </h3>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2C5F7F]/10 flex items-center justify-center">
                    {expandedFaq === index
                      ? <ChevronUp className="w-4 h-4 text-[#2C5F7F]" />
                      : <ChevronDown className="w-4 h-4 text-[#2C5F7F]" />}
                  </span>
                </button>
                {expandedFaq === index && (
                  <div
                    className="px-6 pb-5 pt-1 border-t border-gray-100"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p className="text-gray-600 leading-relaxed ml-9" itemProp="text">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:07970566409" className="inline-flex items-center gap-2 text-[#2C5F7F] hover:text-[#1a3d52] font-semibold" onClick={() => trackPhoneCall('07970566409', 'County Page CTA')}>
                <Phone className="w-5 h-5" />
                Call us: 07970 566409
              </a>
              <Button onClick={() => setQuotePopupOpen(true)} className="bg-[#E8B84A] hover:bg-[#d4a63d] text-[#1a3d52]">
                Request A Site Visit
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Available in County */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services Available in {county.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer the full range of commercial and industrial shot blasting services throughout {county.name}. Click any service to learn more.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceLinks.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group flex items-start gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-[#2C5F7F] hover:bg-[#2C5F7F]/5 transition-all"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#2C5F7F]/10 flex items-center justify-center mt-0.5">
                  <ArrowRight className="w-4 h-4 text-[#2C5F7F] group-hover:translate-x-0.5 transition-transform" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-[#2C2C2C] group-hover:text-[#2C5F7F] transition-colors text-sm leading-snug mb-1">
                    {service.title} in {county.name}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/services">
              <Button variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                View All 19 Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What to Expect Process Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-[#2C5F7F] font-medium mb-2">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Services {county.name} — What to Expect
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-3">
              Our shot blasting services in {county.name} are designed to be smooth from first contact to project completion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: `Site Survey in ${county.name}`,
                body: `We visit your site in ${county.name} at no charge, assess the surfaces to be blasted, and provide a detailed no-obligation quote. We advise on the correct blast standard (SA2.5 or SA3) and any preparation required.`,
              },
              {
                step: "02",
                title: "Mobile Unit Arrives On-Site",
                body: `Our fully equipped mobile shot blasting unit travels directly to your location in ${county.name}. No need to transport your materials — we bring everything needed to carry out the work safely and efficiently on your premises.`,
              },
              {
                step: "03",
                title: "SA2.5 Finish & Full Cleanup",
                body: `We complete the shot blasting to your specified standard — typically SA2.5 near white metal — and carry out a full site cleanup before leaving. Your surfaces are ready for protective coating immediately after our visit.`,
              },
            ].map((item) => (
              <div key={item.step} className="relative bg-[#f0f6fb] rounded-2xl p-6">
                <span className="absolute -top-4 left-6 text-5xl font-black text-[#2C5F7F]/10 select-none">{item.step}</span>
                <h3 className="font-bold text-[#2C2C2C] text-lg mb-3 mt-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects Gallery */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-8">
            <p className="text-[#2C5F7F] font-medium mb-2 uppercase tracking-wide text-sm">Our Work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3d52] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Recently Completed Projects in {county.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A selection of our recent shot blasting and surface preparation projects completed across {county.name} and the surrounding region.
            </p>
          </div>

          {/* Gallery Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {galleryFilterLabels.map((label) => (
              <button
                key={label}
                onClick={() => setGalleryFilter(label)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  galleryFilter === label
                    ? "bg-[#2C5F7F] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-[#2C5F7F]/10 hover:text-[#2C5F7F]"
                }`}
              >
                {label}
                <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                  galleryFilter === label ? "bg-white/20 text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  {galleryByCategory[label]?.length ?? 0}
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {(galleryFilter === "Most Recent"
              ? [...galleryByCategory["All"]].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "")).slice(0, 8)
              : (galleryByCategory[galleryFilter] ?? galleryByCategory["All"])
            ).map((img, index) => (
              <div key={`${galleryFilter}-${index}`} className="relative aspect-square overflow-hidden rounded-lg group shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={img.src}
                  alt={`${img.alt} in ${county.name}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-2 py-1 bg-[#2C5F7F] text-white text-xs rounded-full font-medium">{img.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-500 text-sm mb-4">All projects completed by our professional team across {county.name} and surrounding areas</p>
            <a href="/our-work">
              <Button variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                View Full Project Gallery
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Request A Site Visit for Shot Blasting Services in {county.name}
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            No-obligation quotes for all shot blasting services across {county.name}. We typically respond within 24 hours and can schedule a site survey at your convenience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-[#F5F1E8]" onClick={() => setQuotePopupOpen(true)}>
              Request A Site Visit
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="tel:07970566409" className="flex items-center gap-2" onClick={() => trackPhoneCall('07970566409', 'County Page')}>
                <Phone className="w-4 h-4" />
                Call: 07970 566409
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Available in County — full 19-service grid with localized anchor text */}
      <section className="py-14 bg-[#f0f6fb]" id="services">
        <div className="container">
          <div className="text-center mb-8">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Services</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Services Available in {county.name}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mt-2 text-sm">
              We offer the full range of commercial and industrial shot blasting services across {county.name} — mobile, on-site, and delivered to SA2.5/SA3 standard.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              { slug: "structural-steel-shot-blasting", label: `Structural Steel Shot Blasting in ${county.name}`, desc: `Remove mill scale, rust, and old coatings from structural steelwork across ${county.name} to SA2.5 or SA3 standard.`, Icon: Building2 },
              { slug: "factory-cladding-shot-blasting", label: `Factory Cladding Shot Blasting in ${county.name}`, desc: `Restore corroded or painted factory cladding panels on-site across ${county.name} without dismantling.`, Icon: Factory },
              { slug: "floor-shot-blasting", label: `Floor Shot Blasting in ${county.name}`, desc: `Industrial floor preparation in ${county.name} for epoxy, resin, or screed. Removes laitance and creates a mechanical key.`, Icon: Layers },
              { slug: "fire-escape-shot-blasting", label: `Fire Escape Shot Blasting in ${county.name}`, desc: `Mobile shot blasting of fire escapes and external staircases across ${county.name} to halt corrosion.`, Icon: Flame },
              { slug: "machinery-shot-blasting", label: `Plant & Machinery Blasting in ${county.name}`, desc: `On-site shot blasting of plant and machinery in ${county.name} before repainting, powder coating, or refurbishment.`, Icon: Settings },
              { slug: "bridge-steelwork-shot-blasting", label: `Bridge Steelwork Blasting in ${county.name}`, desc: `Specialist bridge and infrastructure shot blasting across ${county.name} to Network Rail and Highways England standards.`, Icon: Wrench },
              { slug: "container-shot-blasting", label: `Container Shot Blasting in ${county.name}`, desc: `Shipping container and steel storage unit shot blasting across ${county.name} to SA2.5 standard.`, Icon: Building2 },
              { slug: "pipework-shot-blasting", label: `Pipework Shot Blasting in ${county.name}`, desc: `Process pipework and manifold blasting in ${county.name} for food-grade, pharmaceutical, and industrial applications.`, Icon: Wrench },
              { slug: "agricultural-shot-blasting", label: `Agricultural Shot Blasting in ${county.name}`, desc: `Farm machinery, grain stores, and agricultural equipment shot blasting across ${county.name}.`, Icon: Settings },
              { slug: "marine-shot-blasting", label: `Marine Shot Blasting in ${county.name}`, desc: `Marine and offshore structure shot blasting in ${county.name} to SSPC and NACE standards.`, Icon: Anchor },
              { slug: "racking-shot-blasting", label: `Warehouse Racking Blasting in ${county.name}`, desc: `Warehouse racking and pallet frame shot blasting across ${county.name} — cost-effective alternative to replacement.`, Icon: Layers },
              { slug: "telecom-tower-shot-blasting", label: `Telecom Tower Blasting in ${county.name}`, desc: `Telecom mast and tower shot blasting in ${county.name} to extend service life and prepare for protective coating.`, Icon: Zap },
              { slug: "heritage-shot-blasting", label: `Heritage Shot Blasting in ${county.name}`, desc: `Gentle shot blasting for listed buildings, ironwork, and heritage structures across ${county.name}.`, Icon: Award },
              { slug: "structural-steel-frames", label: `Steel Frame Preparation in ${county.name}`, desc: `New-build structural steel frame preparation in ${county.name} — mill scale removal ready for galvanizing or coating.`, Icon: Building2 },
              { slug: "fire-escapes", label: `Fire Escape Restoration in ${county.name}`, desc: `Comprehensive fire escape and staircase restoration across ${county.name} — blast, prime, and coat in one visit.`, Icon: Flame },
              { slug: "staircases", label: `Staircase Shot Blasting in ${county.name}`, desc: `Internal and external staircase shot blasting in ${county.name} for heritage, commercial, and industrial projects.`, Icon: Layers },
              { slug: "plant-machinery", label: `Plant Refurbishment in ${county.name}`, desc: `Full plant and machinery refurbishment blasting in ${county.name} — on-site, no transport costs.`, Icon: Settings },
              { slug: "floor-preparation", label: `Industrial Floor Preparation in ${county.name}`, desc: `Concrete and steel floor shot blasting in ${county.name} for industrial coatings and surface profiling.`, Icon: Layers },
              { slug: "intumescent-painting", label: `Intumescent Painting Prep in ${county.name}`, desc: `Shot blast preparation for intumescent fire protection coatings in ${county.name} — SA2.5 standard for R30–R120 ratings.`, Icon: Flame },
            ].map(({ slug, label, desc, Icon }) => (
              <a
                key={slug}
                href={`/services/${slug}`}
                className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#2C5F7F]/30 transition-all duration-200 flex flex-col gap-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2C5F7F]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#2C5F7F]" />
                  </div>
                  <h3 className="font-semibold text-[#2C2C2C] group-hover:text-[#2C5F7F] transition-colors text-sm leading-tight">{label}</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed flex-1">{desc}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2C5F7F] mt-auto">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>
          <div className="text-center">
            <a href="/services" className="inline-flex items-center gap-2 text-[#2C5F7F] hover:text-[#1a3d52] font-semibold text-sm">
              View All Shot Blasting Services
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Preparation Checklist */}
      <section className="py-14 bg-gradient-to-br from-[#F5F1E8] to-[#EAE4D4]">
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <p className="text-[#2C5F7F] font-medium mb-1 uppercase tracking-wide text-sm">Before We Arrive</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>
              How to Prepare for Shot Blasting in {county.name}
            </h2>
            <p className="text-gray-600 mt-2 text-sm">Three simple steps to ensure your project runs smoothly</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                title: "Request A Site Survey",
                text: `Call 07970 566409 or use our online form to arrange a no-obligation site visit across ${county.name}. We will assess the surfaces, confirm the blast standard required (SA2.5 or SA3), and provide a written quote — typically within 24 hours of the visit.`
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
              Request A Site Survey in {county.name}
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      {county.faqs && county.faqs.length > 0 && (
        <section className="py-14 bg-white">
          <div className="container max-w-3xl">
            <div className="text-center mb-8">
              <p className="text-[#2C5F7F] font-medium mb-1 uppercase tracking-wide text-sm">Common Questions</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Shot Blasting Services in {county.name} — FAQs
              </h2>
            </div>
            <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
              {county.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-[#f8f5f0] rounded-lg overflow-hidden border border-gray-100"
                  itemScope itemType="https://schema.org/Question"
                >
                  <button
                    type="button"
                    aria-expanded={expandedFaq === index}
                    aria-controls={`county-faq-answer-${index}`}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#EAE4D4] transition"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <span className="font-semibold text-[#2C5F7F] pr-4 text-sm md:text-base" itemProp="name">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-[#2C5F7F] flex-shrink-0" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#2C5F7F] flex-shrink-0" aria-hidden="true" />
                    )}
                  </button>
                  <div
                    id={`county-faq-answer-${index}`}
                    role="region"
                    className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? 'max-h-96' : 'max-h-0'}`}
                    itemScope itemType="https://schema.org/Answer"
                  >
                    <p className="px-6 pb-5 text-gray-600 leading-relaxed text-sm" itemProp="text">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button className="bg-[#2C5F7F] hover:bg-[#1a3d52] text-white" onClick={() => setQuotePopupOpen(true)}>
                Request A Site Visit
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Related Industries */}
      {(() => {
        // Map county industry labels to route slugs
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
        };
        const industryCards = county.industries
          .map((ind) => industryRouteMap[ind.replace(/\s/g, "")])
          .filter(Boolean)
          .filter((v, i, arr) => arr.findIndex((x) => x.slug === v.slug) === i) // deduplicate by slug
          .slice(0, 4);
        if (industryCards.length === 0) return null;
        return (
          <section className="py-12 bg-[#f0f6fb]">
            <div className="container">
              <div className="text-center mb-6">
                <p className="text-[#2C5F7F] font-medium mb-1 uppercase tracking-wide text-sm">By Sector</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Industries We Serve in {county.name}
                </h2>
                <p className="text-gray-500 text-sm mt-2">Shot blasting expertise across {county.name}'s key industrial sectors</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {industryCards.map(({ slug, label, desc }) => (
                  <Link key={slug} href={`/industries/${slug}`}>
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#2C5F7F]/30 transition-all duration-200 cursor-pointer group h-full flex flex-col gap-2">
                      <h3 className="font-semibold text-[#2C2C2C] group-hover:text-[#2C5F7F] transition-colors text-sm">{label}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed flex-1">{desc}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2C5F7F] mt-1">
                        View industry <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-6">
                <Link href="/industries">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2C5F7F] hover:text-[#1a3d52] cursor-pointer">
                    View all industries <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Nearby Towns */}
      {(() => {
        const nearbyTowns = Object.values(locationData)
          .filter((loc) => loc.countySlug === county.slug)
          .sort((a, b) => a.name.localeCompare(b.name))
          .slice(0, 8);
        if (nearbyTowns.length === 0) return null;
        return (
          <section className="py-12 bg-white">
            <div className="container">
              <div className="text-center mb-6">
                <p className="text-[#2C5F7F] font-medium mb-1 uppercase tracking-wide text-sm">Hyperlocal Coverage</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Towns We Serve in {county.name}
                </h2>
                <p className="text-gray-500 text-sm mt-2">Mobile shot blasting delivered directly to your site — no transport costs, no delays</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
                {nearbyTowns.map((loc) => (
                  <Link key={loc.slug} href={`/service-areas/${loc.slug}`}>
                    <div className="bg-gray-50 rounded-lg p-3 text-center hover:bg-[#2C5F7F] hover:text-white transition-all duration-200 cursor-pointer group border border-gray-100 hover:border-[#2C5F7F]">
                      <MapPin className="w-4 h-4 mx-auto mb-1 text-[#2C5F7F] group-hover:text-white" />
                      <p className="text-xs font-semibold text-[#2C2C2C] group-hover:text-white leading-tight">{loc.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-6">
                <Link href={`/counties/${county.slug}`}>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2C5F7F] hover:text-[#1a3d52] cursor-pointer">
                    View all locations in {county.name} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Nearby Counties */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          {/* Tier 1: Nearby (same-region) counties */}
          {(() => {
            const nearby = Object.values(countyData)
              .filter((c) => c.slug !== county.slug && c.region === county.region)
              .sort((a, b) => a.name.localeCompare(b.name))
              .slice(0, 6);
            if (nearby.length === 0) return null;
            return (
              <div className="mb-10">
                <div className="text-center mb-6">
                  <p className="text-[#2C5F7F] font-medium mb-1 uppercase tracking-wide text-sm">Same Region</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Nearby Counties in {county.region}
                  </h2>
                  <p className="text-gray-500 text-sm mt-2">We provide mobile shot blasting across the whole {county.region} region</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {nearby.map((c) => {
                    const colour = regionColours[c.region] || "#2C5F7F";
                    return (
                      <Link key={c.slug} href={`/counties/${c.slug}`}>
                        <div className="bg-white rounded-xl p-4 text-center shadow-sm border-t-4 hover:shadow-md transition-all duration-200 cursor-pointer group" style={{ borderTopColor: colour }}>
                          <MapPin className="w-5 h-5 mx-auto mb-2" style={{ color: colour }} />
                          <p className="font-semibold text-sm text-[#2C2C2C] group-hover:text-[#2C5F7F] transition-colors leading-tight">{c.name}</p>
                          <p className="text-xs text-gray-400 mt-1 truncate">{c.region}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Tier 2: All other counties */}
          <div>
            <div className="text-center mb-6">
              <p className="text-[#2C5F7F] font-medium mb-1 uppercase tracking-wide text-sm">Full Coverage</p>
              <h2 className="text-xl md:text-2xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                All Counties We Serve
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
              {Object.values(countyData)
                .filter((c) => c.slug !== county.slug)
                .sort((a, b) => {
                  if (a.region === county.region && b.region !== county.region) return -1;
                  if (b.region === county.region && a.region !== county.region) return 1;
                  return a.name.localeCompare(b.name);
                })
                .slice(0, 24)
                .map((c) => {
                  const colour = regionColours[c.region] || "#2C5F7F";
                  return (
                    <Link key={c.slug} href={`/counties/${c.slug}`}>
                      <Card className="h-full hover:shadow-md transition-all duration-200 cursor-pointer group border-l-4" style={{ borderLeftColor: colour }}>
                        <CardHeader className="p-3 pb-1">
                          <CardTitle className="text-sm font-semibold group-hover:text-[#2C5F7F] transition-colors leading-tight">
                            {c.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <p className="text-xs text-gray-500 truncate">{c.region}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
            </div>
            <div className="text-center">
              <Link href="/counties">
                <Button variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                  View All Counties <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Towns */}
      {allCountyTowns.length > 0 && (
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="container">
            <div className="text-center mb-6">
              <p className="text-[#2C5F7F] font-medium mb-1 uppercase tracking-wide text-sm">Service Locations</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Towns We Serve in {county.name}
              </h2>
              <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">
                {allCountyTowns.length} towns covered — click any town for local pricing and availability.
              </p>
            </div>
            {/* Search bar */}
            <div className="max-w-sm mx-auto mb-6 relative">
              <input
                type="text"
                value={townSearch}
                onChange={(e) => setTownSearch(e.target.value)}
                placeholder={`Search towns in ${county.name}…`}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F7F] focus:border-transparent"
              />
              {townSearch && (
                <button
                  onClick={() => setTownSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg leading-none"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
            {townSearchLoading ? (
              /* Skeleton state while debounce timer runs */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6 animate-pulse">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-lg border border-gray-100 bg-gray-50">
                    <div className="w-3.5 h-3.5 rounded-full bg-gray-200 shrink-0" />
                    <div className="h-3 rounded bg-gray-200" style={{ width: `${50 + (i % 5) * 10}%` }} />
                  </div>
                ))}
              </div>
            ) : filteredTowns.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <MapPin className="w-8 h-8 text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium mb-1">No towns found for &ldquo;{debouncedSearch}&rdquo;</p>
                <p className="text-gray-400 text-sm mb-4">Try a different spelling, or browse all towns below.</p>
                <button
                  onClick={() => setTownSearch("")}
                  className="text-sm font-medium text-[#2C5F7F] hover:underline focus:outline-none"
                >
                  Clear search and show all towns
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
                {filteredTowns.map((town) => (
                  <Link key={town.slug} href={`/service-areas/${town.slug}`}>
                    <div className="group flex items-center gap-2 p-3 rounded-lg border border-gray-100 hover:border-[#2C5F7F] hover:shadow-md transition-all duration-200 bg-white cursor-pointer">
                      <MapPin className="w-3.5 h-3.5 text-[#2C5F7F] shrink-0" />
                      <p className="font-medium text-sm text-[#2C2C2C] group-hover:text-[#2C5F7F] transition-colors truncate">{town.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <div className="text-center">
              <Link href="/service-areas">
                <Button variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                  View All UK Service Areas <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Share Section */}
      <section className="py-10 bg-gray-50 border-t border-gray-200">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto text-center sm:text-left">
            <div>
              <p className="font-semibold text-[#2C2C2C] mb-1">Found this useful?</p>
              <p className="text-sm text-gray-500">Share our shot blasting services in {county.name} with your network.</p>
            </div>
            <ShareButton
              title={`Shot Blasting Services in ${county.name} | Commercial Shot Blasting`}
              url={county.url}
              description={county.description}
            />
          </div>
        </div>
      </section>

      <Footer />

      {/* Back to Top button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-[#2C5F7F] text-white shadow-lg hover:bg-[#1a3a4d] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2C5F7F] focus:ring-offset-2"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
