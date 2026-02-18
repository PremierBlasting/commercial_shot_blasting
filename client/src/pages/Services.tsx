import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { QuotePopup } from "@/components/QuotePopup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

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
    image: "/service-structural-steel.webp"
  },
  {
    id: "steel-containers",
    title: "Steel Container Blasting",
    description: "Specialist shot blasting for steel containers and large storage structures, removing rust and old coatings.",
    image: "/service-steel-containers.webp"
  },
  {
    id: "factory-cladding",
    title: "Factory & Warehouse Cladding",
    description: "Specialist cladding restoration removing plastisol and paint layers from factory and industrial building panels.",
    image: "/factory-cladding-main.webp"
  },
  {
    id: "fire-escapes",
    title: "Fire Escapes & External Stair Towers",
    description: "Complete restoration of fire escape structures, ensuring safety compliance and longevity.",
    image: "/service-fire-escapes.webp"
  },
  {
    id: "staircases",
    title: "Internal Staircases & Handrails",
    description: "Precision cleaning for architectural metalwork, preparing surfaces for premium finishes.",
    image: "/service-staircases.webp"
  },
  {
    id: "bridge-steelwork",
    title: "Bridge Steelwork",
    description: "Specialized treatment for bridge components, meeting stringent infrastructure standards.",
    image: "/service-bridge-steelwork.webp"
  },
  {
    id: "ladders",
    title: "Fixed Ladders & Access Systems",
    description: "Thorough cleaning of access equipment, removing corrosion and preparing for protective coatings.",
    image: "/service-ladders.webp"
  },
  {
    id: "warehouse-racking",
    title: "Warehouse Racking Systems",
    description: "Complete refurbishment of storage systems, extending service life and improving appearance.",
    image: "/service-warehouse-racking.webp"
  },
  {
    id: "pipework",
    title: "Process Pipework",
    description: "Surface profiling for optimal coating adhesion on industrial pipework and process equipment.",
    image: "/service-pipework.webp"
  },
  {
    id: "telecom-towers",
    title: "Telecom Masts & Lattice Towers",
    description: "Specialized treatment for telecommunications infrastructure, ensuring long-term protection.",
    image: "/service-telecom-tower.webp"
  },
  {
    id: "floor-preparation",
    title: "Floor Preparation & Shot Blasting",
    description: "Professional floor surface preparation for commercial and industrial facilities, removing coatings and creating ideal surface profiles.",
    image: "/floor-prep-1.webp"
  },
  {
    id: "powder-coating",
    title: "Shot Blasting & Powder Coating",
    description: "End-to-end metal surface solutions combining shot blasting with premium powder coating application.",
    image: "/powder-coating-cropped.webp"
  },
  {
    id: "commercial-radiators",
    title: "Commercial Radiators",
    description: "Professional restoration for cast iron and steel radiators in commercial buildings and heritage properties.",
    image: "/radiator-hero-new.webp"
  },
  {
    id: "commercial-vehicles",
    title: "Commercial & Agricultural Vehicles",
    description: "Heavy-duty restoration for farm trucks, warehouse vehicles, and industrial transport equipment including complete chassis and wheel restoration.",
    image: "/vehicle-complete-after-2.webp"
  },
  {
    id: "steel-doors",
    title: "Steel Doors & Roller Shutters",
    description: "Professional restoration for industrial doors, warehouse roller shutters, security doors, and commercial access systems.",
    image: "/door-after-1.webp"
  },
  {
    id: "steel-sheeting",
    title: "Steel Sheeting",
    description: "Professional surface preparation for steel sheets, panels, and flat metal products used in construction and manufacturing.",
    image: "/steel-sheeting-hero.webp"
  },
  {
    id: "steel-gates",
    title: "Steel Gates & Railings",
    description: "Precision restoration for commercial and industrial entrance gates, perimeter railings, and decorative metalwork.",
    image: "/steel-gates-after.webp"
  },
  {
    id: "plant-machinery",
    title: "Plant & Machinery",
    description: "On-site shot blasting for construction equipment, agricultural machinery, and industrial plant without the need for transportation.",
    image: "/plant-machinery-hero.webp"
  }
];

export default function Services() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useEffect(() => {
    // Set page-specific SEO meta tags
    document.title = "Shot Blasting Services UK | Commercial & Industrial";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional shot blasting services for steel, concrete, metal & industrial surfaces. Structural steel, containers, floors, pipework & more. Call 07970 566409');
    }
    
    // Update meta keywords (reduced from 9 to 7)
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'shot blasting services, steel blasting, industrial blasting, concrete blasting, metal surface preparation, commercial blasting, UK');
    }
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
            Comprehensive Shot Blasting Solutions
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Professional surface preparation services for all types of steel and metalwork. From structural frames to specialized equipment, we deliver precision cleaning that meets the highest industry standards.
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

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 overflow-hidden">
                  <img loading="lazy"
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#2C5F7F] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Transform Your Surfaces?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Get in touch with our team to discuss your shot blasting requirements. We provide free quotes and expert advice for all projects.
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
