import { useState } from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
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
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800"
  },
  {
    id: "fire-escapes",
    title: "Fire Escapes & External Stair Towers",
    description: "Complete restoration of fire escape structures, ensuring safety compliance and longevity.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800"
  },
  {
    id: "staircases",
    title: "Internal Staircases & Handrails",
    description: "Precision cleaning for architectural metalwork, preparing surfaces for premium finishes.",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800"
  },
  {
    id: "bridge-steelwork",
    title: "Bridge Steelwork",
    description: "Specialized treatment for bridge components, meeting stringent infrastructure standards.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
  },
  {
    id: "steel-containers",
    title: "Steel Container Blasting",
    description: "Specialist shot blasting for steel containers and large storage structures, removing rust and old coatings.",
    image: "/service-steel-containers.jpg"
  },
  {
    id: "ladders",
    title: "Fixed Ladders & Access Systems",
    description: "Thorough cleaning of access equipment, removing corrosion and preparing for protective coatings.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800"
  },
  {
    id: "warehouse-racking",
    title: "Warehouse Racking Systems",
    description: "Complete refurbishment of storage systems, extending service life and improving appearance.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"
  },
  {
    id: "pipework",
    title: "Process Pipework",
    description: "Surface profiling for optimal coating adhesion on industrial pipework and process equipment.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800"
  },
  {
    id: "telecom-towers",
    title: "Telecom Masts & Lattice Towers",
    description: "Specialized treatment for telecommunications infrastructure, ensuring long-term protection.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800"
  },
  {
    id: "floor-preparation",
    title: "Floor Preparation & Shot Blasting",
    description: "Professional floor surface preparation for commercial and industrial facilities, removing coatings and creating ideal surface profiles.",
    image: "/floor-prep-1.jpg"
  },
  {
    id: "powder-coating",
    title: "Shot Blasting & Powder Coating",
    description: "End-to-end metal surface solutions combining shot blasting with premium powder coating application.",
    image: "/powder-coating-1.jpg"
  },
  {
    id: "factory-cladding",
    title: "Factory Cladding Shot Blasting",
    description: "Specialist cladding restoration removing plastisol and paint layers from factory and industrial building panels.",
    image: "/factory-cladding-main.webp"
  }
];

export default function Services() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
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
                  <img 
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
