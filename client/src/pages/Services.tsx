import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { QuotePopup } from "@/components/QuotePopup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    id: "structural-steel-frames",
    title: "Structural Steel Frames",
    description: "High-performance cleaning for steel structures, removing rust, mill scale, and old coatings.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/sUfXaBUgQWNMAvEc.webp"
  },
  {
    id: "steel-containers",
    title: "Steel Container Blasting",
    description: "Specialist shot blasting for steel containers and large storage structures, removing rust and old coatings.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/bGsCKoWjNMKfOhKj.webp"
  },
  {
    id: "factory-cladding",
    title: "Factory & Warehouse Cladding",
    description: "Specialist cladding restoration removing plastisol and paint layers from factory and industrial building panels.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/GmdvvhZjrHfYtOVb.webp"
  },
  {
    id: "fire-escapes",
    title: "Fire Escapes & External Stair Towers",
    description: "Complete restoration of fire escape structures, ensuring safety compliance and longevity.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oySJrMBHyyuJOevk.webp"
  },
  {
    id: "staircases",
    title: "Internal Staircases & Handrails",
    description: "Precision cleaning for architectural metalwork, preparing surfaces for premium finishes.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/TLjFQFhDhVdFaDwj.webp"
  },
  {
    id: "bridge-steelwork",
    title: "Bridge Steelwork",
    description: "Specialized treatment for bridge components, meeting stringent infrastructure standards.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/cuwoxubhXPpGCUSf.webp"
  },
  {
    id: "ladders",
    title: "Fixed Ladders & Access Systems",
    description: "Thorough cleaning of access equipment, removing corrosion and preparing for protective coatings.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yXusfqsGJHZwuETv.webp"
  },
  {
    id: "warehouse-racking",
    title: "Warehouse Racking Systems",
    description: "Complete refurbishment of storage systems, extending service life and improving appearance.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/WmoactuoGfwMmVwl.webp"
  },
  {
    id: "pipework",
    title: "Process Pipework",
    description: "Surface profiling for optimal coating adhesion on industrial pipework and process equipment.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/eqezEvtOwgDSGsCT.webp"
  },
  {
    id: "telecom-towers",
    title: "Telecom Masts & Lattice Towers",
    description: "Specialized treatment for telecommunications infrastructure, ensuring long-term protection.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/XLIXJyIInSTPQjlE.webp"
  },
  {
    id: "floor-preparation",
    title: "Floor Preparation & Shot Blasting",
    description: "Professional floor surface preparation for commercial and industrial facilities, removing coatings and creating ideal surface profiles.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/YMGizlSGgTjDQAyi.webp"
  },
  {
    id: "powder-coating",
    title: "Shot Blasting & Powder Coating",
    description: "End-to-end metal surface solutions combining shot blasting with premium powder coating application.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/NpTRkKdXbfRWbnOl.webp"
  },
  {
    id: "commercial-radiators",
    title: "Commercial Radiators",
    description: "Professional restoration for cast iron and steel radiators in commercial buildings and heritage properties.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/nVyZGEbqdoYwEDMv.webp"
  },
  {
    id: "commercial-vehicles",
    title: "Commercial & Agricultural Vehicles",
    description: "Heavy-duty restoration for farm trucks, warehouse vehicles, and industrial transport equipment including complete chassis and wheel restoration.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/NtAgxBOsLSxEcmau.webp"
  },
  {
    id: "steel-doors",
    title: "Steel Doors & Roller Shutters",
    description: "Professional restoration for industrial doors, warehouse roller shutters, security doors, and commercial access systems.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/EOszbYQwsYrTFvjN.webp"
  },
  {
    id: "steel-sheeting",
    title: "Steel Sheeting",
    description: "Professional surface preparation for steel sheets, panels, and flat metal products used in construction and manufacturing.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/QXdidJpwgjaMnlmb.webp"
  },
  {
    id: "steel-gates",
    title: "Steel Gates & Railings",
    description: "Precision restoration for commercial and industrial entrance gates, perimeter railings, and decorative metalwork.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/dIVmiYILOzXbQFlg.webp"
  },
  {
    id: "plant-machinery",
    title: "Plant & Machinery",
    description: "On-site shot blasting for construction equipment, agricultural machinery, and industrial plant without the need for transportation.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/symRlOinndpZEzlR.webp"
  }
];

export default function Services() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useEffect(() => {
    // Set page-specific SEO meta tags
    document.title = "Shot Blasting Services UK | Commercial & Industrial | Commercial Shot Blasting";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional shot blasting services UK-wide — structural steel, factory cladding, containers, floor preparation, rust removal & more. Mobile service to your site. SA2.5/SA3 standard. Free quote. Call 07970 566409');
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
            Professional mobile shot blasting services for commercial and industrial clients throughout England and Wales. We deliver all 18 shot blasting services directly to your site — structural steelwork, factory cladding, containers, floor preparation, rust removal, pipework, plant and machinery, and more — to SA2.5 and SA3 standards.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-[#2C5F7F] hover:bg-gray-100"
            onClick={() => setQuotePopupOpen(true)}
          >
            Get a Free Quote
          </Button>
        </div>
      </section>

      {/* Intro / Trust Bar */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
              Commercial Shot Blasting provides <strong>shot blasting services</strong> across the UK for a wide range of commercial and industrial applications. Our fully equipped mobile units travel directly to your site anywhere in England and Wales, eliminating the cost and delay of transporting materials to a fixed workshop.
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
              { label: "Free Quotes", sub: "24-hour response" },
            ].map((item) => (
              <div key={item.label} className="bg-[#f0f6fb] rounded-xl p-4">
                <p className="font-bold text-[#2C5F7F] text-lg">{item.label}</p>
                <p className="text-gray-500 text-xs mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <ScrollReveal key={service.id} delay={Math.min(idx % 3, 2) * 80}>
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                <div className="h-64 overflow-hidden">
                  <img loading="lazy"
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  width={800}
                  height={600}
                />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-700 mb-6">
                    {service.description}
                  </CardDescription>
                  <Link href={`/services/${service.id}`}>
                    <Button variant="link" className="text-[#2C5F7F] hover:text-[#1a3d52] p-0 h-auto font-semibold">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              </ScrollReveal>
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
              { title: "Mobile — We Come to You", body: "Our shot blasting services are fully mobile. We bring all equipment directly to your site anywhere in England and Wales, saving you the time and cost of transporting materials." },
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
              { q: "Do you offer shot blasting services across the whole of the UK?", a: "Yes. Our mobile shot blasting services cover England and Wales. We travel directly to your site, so there is no need to transport your materials. We regularly work across the Midlands, North West, Yorkshire, South East, South West, and Wales." },
              { q: "What blast standard do your shot blasting services achieve?", a: "All our shot blasting services are carried out to SA2.5 near white metal or SA3 white metal as specified. These are internationally recognised standards (ISO 8501-1) that define the cleanliness of the blasted surface and are required by most protective coating manufacturers." },
              { q: "How much do shot blasting services cost?", a: "The cost of shot blasting services depends on the surface area, material type, blast standard required, and site location. We provide free, no-obligation quotes for all projects. Call 07970 566409 or use our online quote form to get a price." },
              { q: "How quickly can you carry out shot blasting services?", a: "We aim to respond to all enquiries within 24 hours and can typically schedule a site visit within a few days. For urgent projects, call us directly on 07970 566409 to discuss availability." },
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
            Get a Quote for Shot Blasting Services UK
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Free, no-obligation quotes for all shot blasting services across the UK. We typically respond within 24 hours and can schedule a free site survey at your convenience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-[#2C5F7F] hover:bg-gray-100"
              onClick={() => setQuotePopupOpen(true)}
            >
              Get a Free Quote
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
