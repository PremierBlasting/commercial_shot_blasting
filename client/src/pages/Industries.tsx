import { useState } from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { QuotePopup } from "@/components/QuotePopup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface Industry {
  id: string;
  title: string;
  description: string;
  image: string;
}

const industries: Industry[] = [
  {
    id: "construction",
    title: "Construction",
    description: "Structural steel, bridges, fire escapes, and building infrastructure requiring precision surface preparation.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600"
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: "Warehouse racking, crane systems, pipework, and industrial equipment for production facilities.",
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1600"
  },
  {
    id: "retail",
    title: "Retail",
    description: "Shopping trolleys, shop fittings, displays, and commercial retail equipment restoration.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
  },
  {
    id: "aerospace",
    title: "Aerospace",
    description: "Landing gear, engine components, airframes, and precision aerospace parts requiring specialist treatment.",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1600"
  },
  {
    id: "marine",
    title: "Marine",
    description: "Ship hulls, offshore platforms, port equipment, and maritime infrastructure protection.",
    image: "/marine-industry-hero.webp"
  },
  {
    id: "agriculture",
    title: "Agriculture",
    description: "Tractors, farm equipment, agricultural machinery, and rural infrastructure restoration.",
    image: "/agriculture-industry-hero-new.webp"
  },
  {
    id: "transport-logistics",
    title: "Transport & Logistics",
    description: "Commercial vehicles, trailers, warehouse equipment, and logistics infrastructure maintenance.",
    image: "/transport-industry-hero.webp"
  },
  {
    id: "heritage-restoration",
    title: "Heritage & Restoration",
    description: "Listed buildings, historic bridges, museum artifacts, and heritage metalwork requiring careful restoration.",
    image: "/heritage-industry-hero.webp"
  }
];

export default function Industries() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/industries", isCurrentPage: true }
      ]} className="container mt-6" />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Industries We Serve
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Professional shot blasting services across diverse sectors. From construction and manufacturing to aerospace and heritage restoration, we deliver specialist surface preparation solutions tailored to your industry's unique requirements.
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

      {/* Industries Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <Card key={industry.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 overflow-hidden">
                  <img loading="lazy"
                    src={industry.image} 
                    alt={industry.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {industry.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-700 mb-6">
                    {industry.description}
                  </CardDescription>
                  <Link href={`/industries/${industry.id}`}>
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
            Ready to Discuss Your Project?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Get in touch with our team to discuss your industry-specific shot blasting requirements. We provide free quotes and expert advice for all projects.
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
