import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { OptimizedImage, getWebPUrl, getThumbnailUrl } from "@/components/OptimizedImage";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { Phone, Mail, MapPin, ArrowLeft, ArrowRight, Star, Quote, X } from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Breadcrumb } from "@/components/Breadcrumb";

import { Footer } from "@/components/Footer";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";
const galleryItems = [
  // Industrial Projects
  {
    id: 1,
    title: "Industrial Steel Framework",
    category: "Structural Steel Frames",
    description: "Complete rust and scale removal from structural steel beams in manufacturing facility",
    before: "/images/premier/warehouse-bars-before.webp",
    after: "/images/premier/warehouse-bars-after.webp",
  },
  {
    id: 2,
    title: "Warehouse Cladding Restoration",
    category: "Factory/Warehouse Cladding",
    description: "Complete removal of original plastisol and multiple paint layers from warehouse cladding",
    detailedDescription: "This challenging warehouse cladding restoration project involved removing decades of accumulated coatings including the original plastisol finish and multiple layers of industrial paint. Our team used precision shot blasting techniques to strip all layers down to bare metal while preserving the structural integrity of the cladding panels.",
    before: "/images/premier/warehouse-outside-before.webp",
    after: "/images/premier/warehouse-outside-after.webp",
    location: "Birmingham, West Midlands",
    completionDate: "November 2025",
    duration: "5 days",
    specifications: [
      "Complete plastisol removal from 500m² cladding",
      "Multi-layer paint stripping",
      "Surface profiling for optimal coating adhesion",
      "Minimal disruption to warehouse operations"
    ],
    challenges: "The project presented unique challenges due to the multiple coating layers and the need to maintain warehouse operations throughout the work. We implemented a phased approach to ensure zero contamination of stored goods.",
    results: "The warehouse cladding was restored to bare metal with an ideal surface profile for the new coating system. The client reported excellent paint adhesion and a professional finish that exceeded expectations."
  },
  {
    id: 13,
    title: "Factory Cladding Restoration",
    category: "Factory/Warehouse Cladding",
    description: "Complete plastisol and multi-layer paint removal from factory cladding panels",
    detailedDescription: "This factory cladding restoration project involved the complete removal of original plastisol coating and multiple layers of industrial paint from factory roof cladding. The job proved more challenging than initially expected due to the extent of coating buildup, but our team adapted techniques and put in extra hours to deliver flawless results within the agreed budget. This project showcases our commitment to client satisfaction and our ability to handle complex coating removal challenges.",
    before: "/images/our-work/factory-cladding-before.webp",
    after: "/images/our-work/factory-cladding-after.webp",
    location: "West Midlands",
    completionDate: "December 2025",
    duration: "7 days",
    specifications: [
      "Complete plastisol removal from factory roof cladding",
      "Multi-layer industrial paint stripping",
      "Surface profiling for optimal paint adhesion",
      "Budget-conscious project management",
      "Extended hours to meet deadline commitments"
    ],
    challenges: "The cladding had accumulated more coating layers than initially assessed, with the original plastisol proving particularly stubborn to remove. The increased complexity required adaptive techniques and additional work hours to ensure we delivered the flawless finish promised while staying within the client's budget constraints.",
    results: "Despite the unexpected challenges, the factory cladding was restored to pristine bare metal with perfect surface preparation. The client praised our dedication and professionalism, noting that the surfaces were left flawless and ready for painting. This project earned a 5-star review from the factory owner."
  },

  {
    id: 8,
    title: "Steel Container Blasting",
    category: "Steel Containers",
    description: "Storage container surface preparation for recoating",
    before: "/images/premier/steel-container-before.webp",
    after: "/images/premier/steel-container-after.webp",
  },
  {
    id: 12,
    title: "Large Steel Tank Restoration",
    category: "Steel Containers",
    description: "Complete rust and paint removal from large cylindrical steel storage tank",
    detailedDescription: "This challenging industrial tank restoration project involved removing decades of severe rust, failed paint coatings, and surface contamination from a large cylindrical steel storage tank. The extensive corrosion and paint deterioration required careful shot blasting to strip the surface down to bare metal while preserving the structural integrity of the tank walls. The project demonstrates our capability to handle large-scale industrial restoration work with precision and efficiency.",
    before: "/images/our-work/steel-tank-before.webp",
    after: "/images/our-work/steel-tank-after.webp",
    location: "West Midlands",
    completionDate: "January 2026",
    duration: "6 days",
    specifications: [
      "Complete rust and paint removal from large cylindrical tank",
      "Surface preparation across entire tank exterior",
      "Removal of severe corrosion and failed coating systems",
      "Uniform surface profile for new protective coating",
      "Safe working procedures for elevated tank access"
    ],
    challenges: "The tank presented severe rust penetration and multiple layers of failed paint that had trapped moisture, accelerating corrosion. Working on the curved surface at height required specialized access equipment and careful technique to ensure uniform coverage across the entire tank exterior without damaging the underlying metal.",
    results: "The tank was successfully stripped to bare metal, revealing the extent of previous corrosion while providing an ideal surface for the new protective coating system. The client was impressed with the thorough rust removal and uniform surface preparation achieved across the challenging curved geometry."
  },
  {
    id: 14,
    title: "Steel Roller Shutter Restoration",
    category: "Steel Doors/Shutters",
    description: "Complete rust and contamination removal from industrial roller shutter doors",
    detailedDescription: "This industrial roller shutter restoration project involved removing rust spots, contamination, and surface degradation from large steel roller shutter doors at an industrial facility. The shutters had developed multiple areas of rust and surface deterioration that compromised both appearance and functionality. Our shot blasting process completely stripped the contaminated surface, revealing clean bare metal ready for protective coating application.",
    before: "/images/our-work/roller-shutter-before.webp",
    after: "/images/our-work/roller-shutter-after.webp",
    location: "West Midlands",
    completionDate: "January 2026",
    duration: "3 days",
    specifications: [
      "Complete rust removal from roller shutter panels",
      "Surface contamination cleaning",
      "Uniform surface profile across all shutter sections",
      "Minimal disruption to facility access",
      "Surface preparation for new protective coating"
    ],
    challenges: "The roller shutters required careful handling to avoid damage to the moving mechanisms while ensuring thorough rust removal across all panel sections. The contamination patterns were uneven, requiring adaptive blasting techniques to achieve uniform surface preparation without over-blasting clean areas.",
    results: "The roller shutters were restored to pristine bare metal with all rust and contamination completely removed. The uniform surface preparation provides an ideal foundation for the new coating system, extending the operational life of these critical access doors while improving facility appearance."
  },
  {
    id: 15,
    title: "Steel Sheeting Blasting",
    category: "Steel Sheeting",
    description: "High-efficiency shot blasting of industrial steel sheeting panels",
    detailedDescription: "This industrial steel sheeting project showcases our high-efficiency shot blasting capabilities for large-scale surface preparation. The video demonstrates our precision technique in action, removing rust, mill scale, and surface contamination from steel sheeting panels. This type of work is essential for preparing steel components for protective coating systems in industrial and construction applications, ensuring optimal adhesion and long-term corrosion protection.",
    video: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZRFzUipVNoPynrdt.mp4",
    location: "West Midlands",
    completionDate: "January 2026",
    duration: "2 days",
    specifications: [
      "High-efficiency shot blasting of steel sheeting",
      "Complete mill scale and rust removal",
      "Uniform surface profile for coating adhesion",
      "Fast turnaround for construction schedules",
      "Quality surface preparation to industry standards"
    ],
    challenges: "Steel sheeting requires consistent blasting pressure and technique to achieve uniform surface preparation across large flat panels without warping or over-blasting. The work demands precision timing and control to meet tight construction schedules while maintaining quality standards.",
    results: "The steel sheeting was prepared to specification with uniform surface profile and complete contamination removal. The video showcases our efficient process and the quality finish achieved, demonstrating our capability to handle high-volume steel preparation projects for industrial and construction clients."
  },
  // Gates Projects
  {
    id: 16,
    title: "Commercial Gate Restoration",
    category: "Steel Gates",
    description: "Industrial gate surface preparation for protective coating application",
    before: "/images/our-work/gate-before.webp",
    after: "/images/premier/gate-metal-after.webp",
  },
  // Commercial Vehicle Projects
  {
    id: 9,
    title: "Heavy-Duty Commercial Vehicle Wheels",
    category: "Automotive",
    description: "Complete wheel restoration for vintage farm truck with decades of paint, rust, and agricultural contamination",
    detailedDescription: "This vintage farm truck wheel restoration showcases our expertise in automotive component refurbishment. The wheels had accumulated decades of paint layers, rust, and agricultural contamination that required careful removal to preserve the underlying metal structure.",
    before: "/images/our-work/commercial-vehicle-wheels-before-cropped.webp",
    after: "/images/our-work/commercial-vehicle-wheels-after.webp",
    location: "Leicestershire",
    completionDate: "October 2025",
    duration: "2 days",
    specifications: [
      "Complete paint and rust removal from 6 heavy-duty wheels",
      "Preservation of original wheel markings",
      "Surface preparation for powder coating",
      "Removal of agricultural chemical residue",
      "Inspection for structural integrity"
    ],
    challenges: "The wheels had been exposed to decades of agricultural chemicals and weather, creating a thick layer of contamination mixed with multiple paint layers. Careful blasting pressure control was essential to avoid damaging the wheel structure.",
    results: "All wheels were restored to bare metal with perfect surface preparation for powder coating. The client was delighted with the preservation of original details and the professional finish achieved."
  },
  {
    id: 10,
    title: "Complete Chassis Restoration",
    category: "Automotive",
    description: "Systematic shot blasting of entire warehouse vehicle chassis frame including all structural members and cross-braces",
    detailedDescription: "A comprehensive chassis restoration project for a warehouse vehicle requiring complete removal of rust, old paint, and surface contamination from every structural component. This meticulous work prepared the chassis for a full protective coating system to ensure decades of future service. These images showcase the completed restoration from multiple angles, highlighting the pristine shot-blasted finish across all structural members.",
    after: "/images/our-work/chassis-after-1.webp",
    location: "Nottinghamshire",
    completionDate: "December 2025",
    duration: "4 days",
    additionalImages: [
      "/images/our-work/chassis-after-2.webp",
      "/images/our-work/chassis-after-3.webp",
      "/images/our-work/chassis-after-4.webp"
    ],
    specifications: [
      "Complete chassis frame shot blasting",
      "All structural members and cross-braces treated",
      "Rust removal from hard-to-reach areas",
      "Surface profiling for epoxy primer adhesion",
      "Detailed inspection and documentation"
    ],
    challenges: "The chassis had extensive surface rust in difficult-to-access areas between structural members. Our team used specialized nozzles and techniques to ensure complete coverage while maintaining structural integrity.",
    results: "The chassis was transformed to bare metal with an ideal surface profile throughout. All structural members were thoroughly cleaned and prepared, providing an excellent foundation for the protective coating system."
  },
  // Commercial Projects
  {
    id: 11,
    title: "Commercial Radiator Restoration",
    category: "Radiators",
    description: "Vintage cast iron radiator restoration removing old paint and rust for heritage property",
    detailedDescription: "This heritage radiator restoration project involved careful removal of decades of accumulated paint layers and rust from vintage cast iron radiators in a period property. Our precision shot blasting technique stripped away all old coatings while preserving the intricate casting details and structural integrity of these valuable heating elements.",
    before: "/images/our-work/radiator-before.webp",
    after: "/images/our-work/radiator-after.webp",
    location: "Nottinghamshire",
    completionDate: "January 2026",
    duration: "3 days",
    specifications: [
      "Complete paint and rust removal from cast iron radiators",
      "Preservation of original casting details and markings",
      "Surface preparation for specialist radiator paint system",
      "Careful handling to prevent damage to vintage components",
      "Thorough cleaning of internal fins and channels"
    ],
    challenges: "Working with vintage cast iron radiators required extremely careful pressure control to remove stubborn paint layers without damaging the delicate casting details or weakening the metal structure. The intricate fin design demanded precise technique to ensure complete coverage.",
    results: "The radiators were restored to pristine bare metal with all original details preserved. The client was thrilled with the transformation, noting that the radiators looked better than when originally installed. The clean surface provided an ideal base for the specialist radiator paint system."
  },
  // Marine Projects
  // Agriculture Projects
  // Infrastructure Projects
];

const categories = [
  { name: "All", icon: "🔍" },
  { name: "Structural Steel Frames", icon: "🏭" },
  { name: "Steel Doors/Shutters", icon: "🚧" },
  { name: "Steel Containers", icon: "📦" },
  { name: "Factory/Warehouse Cladding", icon: "🏗️" },
  { name: "Steel Gates", icon: "🚪" },
  { name: "Steel Sheeting", icon: "📄" },
  { name: "Radiators", icon: "🔥" },
  { name: "Automotive", icon: "🚗" },
];

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

export default function OurWork() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof galleryItems[0] | null>(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  const openQuotePopup = () => setQuotePopupOpen(true);

  // Fetch data from database
  const { data: dbGalleryItems } = trpc.gallery.list.useQuery();
  const { data: dbTestimonials } = trpc.testimonials.list.useQuery();

  // Use database data if available, otherwise use static fallback
  const displayGalleryItems = useMemo(() => {
    if (dbGalleryItems && dbGalleryItems.length > 0) {
      return dbGalleryItems.map(item => ({
        id: item.id,
        title: item.title,
        category: item.category,
        description: item.description || '',
        before: item.beforeImage,
        after: item.afterImage,
      }));
    }
    return galleryItems;
  }, [dbGalleryItems]);

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

  const filteredItems = selectedCategory === "All" 
    ? displayGalleryItems 
    : displayGalleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Header */}
      <Header onOpenQuotePopup={openQuotePopup} />

      {/* Breadcrumb Navigation */}
      <section className="py-4 bg-gray-50 border-b border-gray-200">
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Our Work", href: "/our-work", isCurrentPage: true }
          ]} />
        </div>
      </section>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-16">
        <div className="container">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Work
          </h1>
          <p className="text-lg text-white/90 max-w-2xl">
            See the dramatic transformations we achieve with our professional shot blasting services. 
            View before and after results from projects across various industries.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-[#F5F1E8] py-8 border-b border-[#e5e0d5]">
        <div className="container">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#2C2C2C]">Filter by Category</h2>
            <span className="text-sm text-gray-500">{filteredItems.length} project{filteredItems.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const count = category.name === "All" 
                ? displayGalleryItems.length 
                : displayGalleryItems.filter(item => item.category === category.name).length;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`group flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.name
                      ? "bg-[#2C5F7F] text-white shadow-lg scale-105"
                      : "bg-white text-[#2C2C2C] hover:bg-[#2C5F7F]/10 hover:scale-102 shadow-sm"
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                    selectedCategory === category.name
                      ? "bg-white/20 text-white"
                      : "bg-[#2C5F7F]/10 text-[#2C5F7F]"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-[#F5F1E8] flex-1">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
                  <Card
                    key={item.id} 
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300"
                    onClick={() => { 
                      setSelectedProject(item);
                      setProjectModalOpen(true);
                    }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      {(item as any).video ? (
                        <>
                          <video 
                            src={(item as any).video} 
                            className="absolute inset-0 w-full h-full object-cover"
                            muted
                            loop
                            playsInline
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                          />
                          <div className="absolute top-3 left-3">
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded font-medium">VIDEO</span>
                          </div>
                        </>
                      ) : item.before ? (
                        <>
                          <img 
                            src={item.before} 
                            alt={`${item.title} - Before`} 
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                            loading="lazy"
                          />
                          <img 
                            src={item.after} 
                            alt={`${item.title} - After`} 
                            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3 flex gap-2">
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-medium group-hover:opacity-0 transition-opacity">BEFORE</span>
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-medium opacity-0 group-hover:opacity-100 transition-opacity">AFTER</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <img 
                            src={item.after} 
                            alt={`${item.title} - Completed`} 
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-medium">COMPLETED</span>
                          </div>
                        </>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <span className="text-white/80 text-xs uppercase tracking-wider">{item.category}</span>
                        <h3 className="text-white font-semibold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <p className="text-[#2C5F7F] text-sm font-medium mt-2">Click To See The Transformation →</p>
                    </div>
                  </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10"
          >
            <X className="w-8 h-8" />
          </button>
          
          {lightboxImages.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </>
          )}
          
          <img loading="lazy"
            src={lightboxImage} 
            alt="Review photo" 
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          
          {lightboxImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {lightboxImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); setLightboxImage(lightboxImages[idx]); }}
                  className={`w-2 h-2 rounded-full transition ${idx === lightboxIndex ? 'bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

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
                    <img loading="lazy"
                      key={idx} 
                      src={img} 
                      alt={`Review photo ${idx + 1}`} 
                      className="w-full h-64 md:h-80 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer shadow-md"
                      onClick={() => openLightbox(displayTestimonials[0].images!, idx)}
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
                      <img loading="lazy"
                        key={idx} 
                        src={img} 
                        alt={`Review photo ${idx + 1}`} 
                         className="w-full h-48 md:h-64 object-cover rounded hover:scale-105 transition-transform cursor-pointer"
                        onClick={() => openLightbox(testimonial.images!, idx)}
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
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready for Your Transformation?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Get in touch today and let us show you what professional shot blasting can do for your project.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90" onClick={openQuotePopup}>Get a Free Quote</Button>
            <a href="tel:07970566409">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="w-4 h-4 mr-2" /> Call Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a3d52] text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/30">
                  <span className="font-bold">CSB</span>
                </div>
                <span className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Commercial Shot Blasting</span>
              </div>
              <p className="text-white/70 text-sm">Professional shot blasting services for industrial and commercial applications across the UK.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="/#services" className="hover:text-white">Steel Shot Blasting</a></li>
                <li><a href="/#services" className="hover:text-white">Concrete Preparation</a></li>
                <li><a href="/#services" className="hover:text-white">Rust Removal</a></li>
                <li><a href="/#services" className="hover:text-white">Paint Stripping</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="/#about" className="hover:text-white">About Us</a></li>
                <li><Link href="/our-work" className="hover:text-white">Our Work</Link></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-white/70 text-sm">
                <li>
                  <a href="tel:07970566409" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                    07970 566409
                  </a>
                </li>
                <li>
                  <a href="mailto:info@commercialshotblasting.co.uk" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                    info@commercialshotblasting.co.uk
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Professional service across England & Wales
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
            <p>&copy; {new Date().getFullYear()} Commercial Shot Blasting Services. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Quote Popup Modal */}
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
      
      {/* Project Detail Modal */}
      <ProjectDetailModal 
        project={selectedProject}
        open={projectModalOpen}
        onOpenChange={setProjectModalOpen}
      />
    </div>
  );
}
