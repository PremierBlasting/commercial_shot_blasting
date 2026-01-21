import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { OptimizedImage, getWebPUrl, getThumbnailUrl } from "@/components/OptimizedImage";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { Phone, Mail, MapPin, ArrowLeft, ArrowRight, Star, Quote, X } from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Breadcrumb } from "@/components/Breadcrumb";

const galleryItems = [
  // Industrial Projects
  {
    id: 1,
    title: "Industrial Steel Framework",
    category: "Industrial",
    description: "Complete rust and scale removal from structural steel beams in manufacturing facility",
    before: "/images/premier/warehouse-bars-before.jpeg",
    after: "/images/premier/warehouse-bars-after.jpeg",
  },
  {
    id: 2,
    title: "Factory Floor Preparation",
    category: "Industrial",
    description: "Surface profiling for epoxy coating application in warehouse",
    before: "/images/premier/warehouse-outside-before.jpeg",
    after: "/images/premier/warehouse-outside-after.jpeg",
  },
  {
    id: 7,
    title: "Manufacturing Equipment",
    category: "Industrial",
    description: "Heavy machinery restoration and protective coating preparation",
    before: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600",
    after: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=600",
  },
  {
    id: 8,
    title: "Steel Container Blasting",
    category: "Industrial",
    description: "Storage container surface preparation for recoating",
    before: "/images/premier/steel-container-before.jpeg",
    after: "/images/premier/steel-container-after.jpeg",
  },
  // Gates Projects
  {
    id: 3,
    title: "Metal Gate Restoration",
    category: "Gates",
    description: "Full gate blast cleaning and rust removal - transforming rusty gates to pristine condition",
    before: "/images/premier/gate-metal-before.jpeg",
    after: "/images/premier/gate-metal-after.jpeg",
  },
  {
    id: 15,
    title: "Decorative Gate Blasting",
    category: "Gates",
    description: "Shot blasting ornamental metal gates for paint preparation and rust removal",
    before: "/images/premier/gate-metal-1.jpeg",
    after: "/images/premier/gate-main.jpeg",
  },
  {
    id: 16,
    title: "Commercial Gate Restoration",
    category: "Gates",
    description: "Industrial gate surface preparation for protective coating application",
    before: "/images/premier/shot-blasting-gate.jpeg",
    after: "/images/premier/gate-metal-after.jpeg",
  },
  // Automotive Projects
  {
    id: 9,
    title: "Classic Car Body Panels",
    category: "Automotive",
    description: "Paint stripping and rust removal from vintage vehicle body",
    before: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600",
    after: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600",
  },
  {
    id: 10,
    title: "Engine Components",
    category: "Automotive",
    description: "Precision cleaning of engine blocks and components",
    before: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600",
    after: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
  },
  {
    id: 11,
    title: "Motorcycle Frame Restoration",
    category: "Automotive",
    description: "Complete frame stripping for custom motorcycle build",
    before: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=600",
    after: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600",
  },
  // Marine Projects
  {
    id: 4,
    title: "Steel Storage Unit",
    category: "Marine",
    description: "Corrosion removal from steel storage containers",
    before: "/images/premier/storage-unit-before.jpeg",
    after: "/images/premier/storage-unit-after.jpeg",
  },
  {
    id: 12,
    title: "Boat Hull Preparation",
    category: "Marine",
    description: "Antifouling removal and hull surface preparation",
    before: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600",
    after: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600",
  },
  // Agriculture Projects
  {
    id: 5,
    title: "Commercial Container",
    category: "Agriculture",
    description: "Heavy equipment restoration and paint preparation",
    before: "/images/premier/steel-container-commercial-before.jpeg",
    after: "/images/premier/steel-container-commercial-after.jpeg",
  },
  {
    id: 13,
    title: "Tractor Restoration",
    category: "Agriculture",
    description: "Complete rust removal from vintage tractor body",
    before: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600",
    after: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=600",
  },
  // Infrastructure Projects
  {
    id: 6,
    title: "Steel Balustrade",
    category: "Infrastructure",
    description: "Structural steel preparation for protective coating",
    before: "/images/premier/gate-metal-before.jpeg",
    after: "/images/premier/steel-balustrade.jpeg",
  },
  {
    id: 14,
    title: "Railway Components",
    category: "Infrastructure",
    description: "Rail infrastructure maintenance and surface preparation",
    before: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600",
    after: "https://images.unsplash.com/photo-1527684651001-731c474bbb5a?w=600",
  },
];

const categories = [
  { name: "All", icon: "🔍" },
  { name: "Industrial", icon: "🏭" },
  { name: "Gates", icon: "🚪" },
  { name: "Automotive", icon: "🚗" },
  { name: "Marine", icon: "⚓" },
  { name: "Agriculture", icon: "🚜" },
  { name: "Infrastructure", icon: "🌉" },
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

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);
  const [showAfter, setShowAfter] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

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
            { label: "Gallery", href: "/gallery", isCurrentPage: true }
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
            Our Work Gallery
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
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card 
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300"
                    onClick={() => { setSelectedItem(item); setShowAfter(false); }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <OptimizedImage 
                        src={item.before} 
                        alt={`${item.title} - Before`} 
                        className="absolute inset-0 w-full h-full transition-opacity duration-500 group-hover:opacity-0"
                        webpSrc={getWebPUrl(item.before)}
                        thumbnailSrc={getThumbnailUrl(item.before)}
                        loading="lazy"
                      />
                      <OptimizedImage 
                        src={item.after} 
                        alt={`${item.title} - After`} 
                        className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        webpSrc={getWebPUrl(item.after)}
                        thumbnailSrc={getThumbnailUrl(item.after)}
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-medium group-hover:opacity-0 transition-opacity">BEFORE</span>
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-medium opacity-0 group-hover:opacity-100 transition-opacity">AFTER</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <span className="text-white/80 text-xs uppercase tracking-wider">{item.category}</span>
                        <h3 className="text-white font-semibold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <p className="text-[#2C5F7F] text-sm font-medium mt-2">Hover to see transformation →</p>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={showAfter ? item.after : item.before} 
                      alt={item.title} 
                      className="w-full h-auto max-h-[70vh] object-contain bg-black"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`text-white text-sm px-3 py-1 rounded font-medium ${showAfter ? 'bg-green-500' : 'bg-red-500'}`}>
                        {showAfter ? 'AFTER' : 'BEFORE'}
                      </span>
                    </div>
                    <button 
                      onClick={() => setShowAfter(!showAfter)}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-[#2C5F7F] px-6 py-2 rounded-full font-medium shadow-lg hover:bg-[#2C5F7F] hover:text-white transition flex items-center gap-2"
                    >
                      {showAfter ? <><ArrowLeft className="w-4 h-4" /> View Before</> : <>View After <ArrowRight className="w-4 h-4" /></>}
                    </button>
                  </div>
                  <div className="p-6 bg-white">
                    <span className="text-[#2C5F7F] text-sm font-medium">{item.category}</span>
                    <h3 className="text-2xl font-bold text-[#2C2C2C] mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                  </div>
                </DialogContent>
              </Dialog>
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
          
          <img 
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
                    <img 
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
                      <img 
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
                <li><Link href="/gallery" className="hover:text-white">Gallery</Link></li>
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
                  Nationwide UK Service
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
    </div>
  );
}
