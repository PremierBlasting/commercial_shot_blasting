import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Shield, Clock, Award, Users, Star, Quote, X } from "lucide-react";
import { useState, useMemo } from "react";
import { QuotePopup } from "@/components/QuotePopup";
import { HubSpotForm } from "@/components/HubSpotForm";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StaticServiceAreasMap } from "@/components/StaticServiceAreasMap";
import { BlogPreview } from "@/components/BlogPreview";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import ServiceSelector from "@/components/ServiceSelector";
import HomeFAQ from "@/components/HomeFAQ";
import { ResponsiveHeroBackground } from "@/components/ResponsiveHeroBackground";
import { trpc } from "@/lib/trpc";

const testimonials = [
  {
    id: 1,
    name: "Jordan King",
    company: "Factory Owner",
    rating: 5,
    text: "Really happy with this team. Our factory cladding had original plastisol and multiple layers of paint. It turned out to be a much more difficult job than expected but Graham didn't let us down and put in extra hours to make sure we stayed in budget. The surfaces were left flawless and we're looking forward to painting.",
    project: "Factory Cladding Blasting",
    images: [
      "/jordan-king-review-1.webp",
      "/jordan-king-review-2.webp",
    ],
    isNew: true,
  },
];

export default function Home() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openQuotePopup = () => setQuotePopupOpen(true);

  // Fetch testimonials from database
  const { data: dbTestimonials } = trpc.testimonials.list.useQuery();

  // Use database data if available, otherwise use static fallback
  const displayTestimonials = useMemo(() => {
    if (dbTestimonials && dbTestimonials.length > 0) {
      return dbTestimonials.map(item => ({
        id: item.id,
        name: item.name,
        company: item.company || '',
        rating: item.rating,
        text: item.text,
        project: item.project || '',
        images: item.images as string[] | undefined,
        isNew: item.isNew,
      }));
    }
    return testimonials;
  }, [dbTestimonials]);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxImage(images[index]);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxImages([]);
    setLightboxIndex(0);
  };

  const nextImage = () => {
    const newIndex = (lightboxIndex + 1) % lightboxImages.length;
    setLightboxIndex(newIndex);
    setLightboxImage(lightboxImages[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    setLightboxIndex(newIndex);
    setLightboxImage(lightboxImages[newIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Header */}
      <Header onOpenQuotePopup={openQuotePopup} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-20 lg:py-32 overflow-hidden">
        {/* Animated Background Carousel - Responsive Images */}
        <ResponsiveHeroBackground />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a3d52]/80 via-[#2C5F7F]/60 to-transparent"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Professional Commercial & Industrial Shot Blasting Services
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Specialist precision shot blasting company in the UK, removing rust, scale, and coatings from all types of commercial and industrial surfaces. Transform your surfaces with our expert team.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90" onClick={openQuotePopup}>
                Get a Free Quote Today
              </Button>
              <Link href="/our-work">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  View Our Work
                </Button>
              </Link>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <a href="tel:07970566409" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Selector Tool */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Find Your Perfect Service</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Not Sure Which Service You Need?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Answer a few quick questions and we'll recommend the best shot blasting services for your specific project requirements.
            </p>
          </div>
          <ServiceSelector />
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Expert Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Comprehensive Shot Blasting Solutions
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Structural Steel Frames", desc: "Comprehensive shot blasting for building frames, roof trusses, and load-bearing steel structures. Prepare surfaces for galvanizing or protective coatings.", img: "/service-structural-steel.webp", link: "/services/structural-steel-frames" },
              { title: "Steel Container Blasting", desc: "Specialist shot blasting for shipping containers, storage tanks, and steel structures. Remove rust and coatings to restore containers for repainting or long-term reuse.", img: "/service-steel-containers.webp", link: "/services/steel-containers" },
              { title: "Factory & Warehouse Cladding", desc: "Specialist cladding restoration removing plastisol and paint layers from factory and industrial building panels.", img: "/factory-cladding-main.webp", link: "/services/factory-cladding" },
              { title: "Fire Escapes & External Stair Towers", desc: "Specialist surface preparation for fire safety infrastructure. Remove rust and corrosion, ensuring compliance with safety regulations.", img: "/service-fire-escapes.webp", link: "/services/fire-escapes" },
              { title: "Internal Steel Staircases, Balustrades & Handrails", desc: "Precision shot blasting for architectural metalwork. Restore heritage features or prepare new fabrications for finishing.", img: "/service-staircases.webp", link: "/services/staircases" },
              { title: "Bridge Steelwork (Girders, Crossmembers, Parapet Rails)", desc: "Comprehensive surface preparation for bridge infrastructure. Meet highway and railway bridge coating specifications.", img: "/service-bridge-steelwork.webp", link: "/services/bridge-steelwork" },
              { title: "Fixed Ladders & Step-Over Platforms", desc: "Comprehensive surface preparation for industrial access systems. Ensure compliance with working at height regulations.", img: "/service-ladders.webp", link: "/services/ladders" },
              { title: "Warehouse Racking & Pallet Rack Frames", desc: "Professional shot blasting for warehouse racking systems, pallet rack frames, and storage infrastructure.", img: "/service-warehouse-racking.webp", link: "/services/warehouse-racking" },
              { title: "Process Pipework, Spools & Manifolds", desc: "Precision cleaning of industrial pipework systems. Ideal for food processing, pharmaceutical, and chemical industries.", img: "/service-pipework.webp", link: "/services/pipework" },
              { title: "Telecom Masts & Lattice Towers", desc: "Specialist shot blasting for telecommunications infrastructure including masts, lattice towers, and antenna supports.", img: "/service-telecom-tower.webp", link: "/services/telecom-towers" },
              { title: "Floor Preparation & Shot Blasting", desc: "Professional floor surface preparation for commercial and industrial facilities, removing coatings and creating ideal surface profiles.", img: "/floor-prep-1.webp", link: "/services/floor-preparation" },
              { title: "Shot Blasting & Powder Coating", desc: "End-to-end metal surface solutions combining shot blasting with premium powder coating application.", img: "/powder-coating-cropped.webp", link: "/services/powder-coating" },
              { title: "Commercial Radiators", desc: "Professional restoration for cast iron and steel radiators in commercial buildings and heritage properties.", img: "/radiator-hero-new.webp", link: "/services/commercial-radiators" },
              { title: "Commercial Vehicles", desc: "Heavy-duty restoration for farm trucks, warehouse vehicles, and industrial transport equipment including chassis and wheels.", img: "/vehicle-complete-after-2.webp", link: "/services/commercial-vehicles" },
              { title: "Steel Doors & Roller Shutters", desc: "Professional restoration for industrial doors, warehouse roller shutters, security doors, and commercial access systems.", img: "/door-after-1.webp", link: "/services/steel-doors" },
              { title: "Steel Sheeting", desc: "Professional surface preparation for steel sheets, panels, and flat metal products used in construction and manufacturing.", img: "/steel-sheeting-hero.webp", link: "/services/steel-sheeting" },
              { title: "Steel Gates & Railings", desc: "Precision restoration for commercial and industrial entrance gates, perimeter railings, and decorative metalwork.", img: "/steel-gates-after.webp", link: "/services/steel-gates" },
              { title: "Plant & Machinery", desc: "On-site shot blasting for construction equipment, agricultural machinery, and industrial plant without transportation.", img: "/plant-machinery-hero.webp", link: "/services/plant-machinery" },
            ].map((service, i) => (
              <Link key={i} href={service.link}>
                <Card className="group overflow-hidden hover:shadow-lg transition-shadow h-full cursor-pointer">
                  <div className="h-48 overflow-hidden">
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.desc}</p>
                    <span className="inline-flex items-center text-[#2C5F7F] font-medium group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="py-20 bg-gradient-to-br from-[#1a3d52] to-[#2C5F7F] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/steel-texture-pattern.png')] opacity-5"></div>
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#B8D4E3] font-medium mb-2 uppercase tracking-wide">See Our Process</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Shot Blasting Steel Sheets in Action
              </h2>
              <p className="text-[#B8D4E3] max-w-2xl mx-auto">
                Watch our precision shot blasting process transform steel sheets, removing rust, scale, and coatings to create the perfect surface for protective finishes.
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 max-w-md w-full">
                <video 
                  className="w-full h-auto object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                >
                  <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/CICKcOChLeIGkWWG.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#4A90A4]" />
                      <span>Professional Grade Equipment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#4A90A4]" />
                      <span>Precision Surface Preparation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Shield className="w-10 h-10 text-[#4A90A4] mb-3" />
                <h3 className="font-bold text-lg mb-2">Complete Coverage</h3>
                <p className="text-[#B8D4E3] text-sm">Uniform blasting across entire surface area for consistent results</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Clock className="w-10 h-10 text-[#4A90A4] mb-3" />
                <h3 className="font-bold text-lg mb-2">Fast Turnaround</h3>
                <p className="text-[#B8D4E3] text-sm">Efficient process minimizes downtime for your project</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Award className="w-10 h-10 text-[#4A90A4] mb-3" />
                <h3 className="font-bold text-lg mb-2">Quality Finish</h3>
                <p className="text-[#B8D4E3] text-sm">Perfect surface profile for optimal coating adhesion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Why Choose Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                A Business You Can Trust
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are a trusted family-run business with the mission to provide superior shot blasting solutions for industrial and commercial environments across the UK. Our advanced shot blasting technology delivers exceptional results at competitive prices.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                As part of our commitment, we employ an expert team dedicated to providing unparalleled services while maintaining high safety standards that protect your property.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Fully Insured" },
                  { icon: Award, text: "Quality Assured" },
                  { icon: Clock, text: "Fast Turnaround" },
                  { icon: Users, text: "Expert Team" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-[#F5F1E8] rounded-lg">
                    <item.icon className="w-6 h-6 text-[#2C5F7F]" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <BeforeAfterSlider
                beforeImage="/warehouse-before.webp"
                afterImage="/warehouse-after.webp"
                beforeLabel="Before"
                afterLabel="After"
                className="shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#2C5F7F] text-white p-6 rounded-lg shadow-lg z-20">
                <p className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>20+</p>
                <p className="text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preparation & Cleanup Section */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Our Process</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Industry-Leading Preparation & Cleanup
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Shot blasting is only as good as the preparation and cleanup around it. We pride ourselves on our systematic approach to site protection, containment, and cleanup – ensuring minimal disruption and maximum quality on every project.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                From isolating work zones and protecting delicate fixtures to thorough post-blast cleanup and waste disposal, we follow a fixed four-stage process that delivers predictable results and leaves your site ready for the next phase of work.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Containment & Protection",
                  "Surface Preparation",
                  "Protection of Delicate Areas",
                  "Post-Blast Clean-Down"
                ].map((stage, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2C5F7F] text-white flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </div>
                    <span className="font-medium text-sm">{stage}</span>
                  </div>
                ))}
              </div>
              <Link href="/preparation-cleanup">
                <Button size="lg" className="bg-[#2C5F7F] hover:bg-[#1a3d52]">
                  Learn More About Our Process
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="/cleanwarehouse.webp" 
                alt="Professional site preparation and cleanup" 
                className="w-full h-[500px] object-cover rounded-lg shadow-xl"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
                <p className="text-3xl font-bold text-[#2C5F7F]" style={{ fontFamily: "'Playfair Display', serif" }}>4</p>
                <p className="text-sm text-gray-600">Stage Process</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Customer Reviews</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Our Clients Say
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our shot blasting services.
            </p>
          </div>
          
          {/* Featured Review with Images */}
          {displayTestimonials.length > 0 && (
            <Card className="p-6 mb-8 hover:shadow-lg transition-shadow relative bg-gradient-to-br from-[#F5F1E8] to-white border-2 border-[#2C5F7F]/20">
              <div className="flex items-center gap-2 mb-4">
                {displayTestimonials[0].isNew && (
                  <span className="bg-[#2C5F7F] text-white text-xs px-2 py-1 rounded font-medium">NEW</span>
                )}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < displayTestimonials[0].rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <Quote className="absolute top-4 right-4 w-12 h-12 text-[#2C5F7F]/10" />
              <p className="text-gray-700 mb-6 leading-relaxed italic text-lg">"{displayTestimonials[0].text}"</p>
              {displayTestimonials[0].images && displayTestimonials[0].images.length > 0 && (
                <div className={`grid gap-2 mb-6 ${displayTestimonials[0].images.length >= 5 ? 'grid-cols-5' : `grid-cols-${displayTestimonials[0].images.length}`}`}>
                  {displayTestimonials[0].images.map((img, idx) => (
                    <img 
                      key={idx} 
                      src={img} 
                      alt={`Review photo ${idx + 1}`} 
                      className="w-full h-64 md:h-80 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer shadow-md"
                      onClick={() => openLightbox(displayTestimonials[0].images!, idx)}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#2C2C2C] text-lg">{displayTestimonials[0].name}</p>
                  <p className="text-sm text-gray-500">{displayTestimonials[0].company}</p>
                </div>
                <span className="text-xs bg-[#2C5F7F]/10 text-[#2C5F7F] px-3 py-1 rounded-full font-medium">
                  {displayTestimonials[0].project}
                </span>
              </div>
            </Card>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {displayTestimonials.slice(1).map((testimonial) => (
              <Card key={testimonial.id} className="p-6 hover:shadow-lg transition-shadow relative">
                <Quote className="absolute top-4 right-4 w-10 h-10 text-[#2C5F7F]/10" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed italic text-sm">"{testimonial.text}"</p>
                {testimonial.images && testimonial.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-1 mb-4">
                    {testimonial.images.map((img, idx) => (
                      <img 
                        key={idx} 
                        src={img} 
                        alt={`Review photo ${idx + 1}`} 
                         className="w-full h-48 md:h-64 object-cover rounded hover:scale-105 transition-transform cursor-pointer"
                        onClick={() => openLightbox(testimonial.images!, idx)}
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#2C2C2C]">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                  <span className="text-xs bg-[#2C5F7F]/10 text-[#2C5F7F] px-3 py-1 rounded-full font-medium">
                    {testimonial.project}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#2C5F7F] text-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to Transform Your Surfaces?
              </h2>
              <p className="text-white/80">Contact us today for a free, no-obligation quote.</p>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90" onClick={openQuotePopup}>Get a Quote</Button>
              <a href="tel:07970566409">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Phone className="w-4 h-4 mr-2" /> Call Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Industries We Serve</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Versatile Solutions for Every Sector
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              "Automotive", "Construction", "Manufacturing", "Marine", "Oil & Gas",
              "Aerospace", "Rail", "Infrastructure", "Restoration", "Agriculture"
            ].map((industry, i) => (
              <div key={i} className="bg-white p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <CheckCircle className="w-8 h-8 text-[#2C5F7F] mx-auto mb-3" />
                <p className="font-medium text-[#2C2C2C]">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[#2C5F7F] font-medium mb-2">Get In Touch</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Request a Free Quote
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form and our team will get back to you within 24 hours with a detailed quote for your project.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#2C5F7F]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a href="tel:07970566409" className="font-medium hover:text-[#2C5F7F] transition-colors">07970 566409</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#2C5F7F]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href="mailto:info@commercialshotblasting.co.uk" className="font-medium hover:text-[#2C5F7F] transition-colors">info@commercialshotblasting.co.uk</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#2C5F7F]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Service Area</p>
                    <p className="font-medium">Professional service across England & Wales</p>
                  </div>
                </div>
              </div>
              
              {/* Why Choose Us - Quick Benefits */}
              <div className="mt-12 p-6 bg-gradient-to-br from-[#F5F1E8] to-[#E8E4DC] rounded-lg border border-[#2C5F7F]/10">
                <h3 className="text-xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Why Choose Us?</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#2C5F7F] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#2C2C2C]">24-Hour Response Time</p>
                      <p className="text-sm text-gray-600">Quick quotes and rapid project turnaround</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#2C5F7F] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#2C2C2C]">Fully Insured</p>
                      <p className="text-sm text-gray-600">Complete peace of mind for your project</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#2C5F7F] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#2C2C2C]">Competitive Pricing</p>
                      <p className="text-sm text-gray-600">Best value without compromising quality</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#2C5F7F] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#2C2C2C]">Regional Coverage</p>
                      <p className="text-sm text-gray-600">Professional service across England & Wales</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Card className="p-6">
              <HubSpotForm />
            </Card>
          </div>
        </div>
      </section>

      {/* Service Areas Map Section */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Our Coverage</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Serving Clients Across the UK
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From our headquarters in the West Midlands, we provide professional shot blasting services across England and Wales. Click on any location to learn more.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <StaticServiceAreasMap />
          </div>
          <div className="text-center mt-8">
            <Link href="/service-areas">
              <Button size="lg" className="bg-[#2C5F7F] hover:bg-[#1a3d52]">
                View All Service Areas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <HomeFAQ />

      {/* Footer */}
      <Footer />

      {/* Quote Popup Modal */}
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowRight className="w-8 h-8 rotate-180" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowRight className="w-8 h-8" />
          </button>
          <img 
            src={lightboxImage} 
            alt="Review photo" 
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
            loading="lazy"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {lightboxIndex + 1} / {lightboxImages.length}
          </div>
        </div>
      )}

      {/* Blog Preview Section */}
      <BlogPreview />
    </div>
  );
}
