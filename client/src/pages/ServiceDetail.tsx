import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useParams } from "wouter";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, ArrowLeft, Clock, Shield, Award, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { getServiceById, services } from "@/data/services";
import { getServiceGallery, getServiceGalleries } from "@/data/serviceGalleries";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BackToTop } from "@/components/BackToTop";

import { Footer } from "@/components/Footer";
export default function ServiceDetail() {
  const params = useParams<{ id: string }>();
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const service = getServiceById(params.id || "");

  const openQuotePopup = () => setQuotePopupOpen(true);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F1E8]">
        <h1 className="text-3xl font-bold text-[#2C5F7F] mb-4">Service Not Found</h1>
        <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
        <Link href="/">
          <Button className="bg-[#2C5F7F] hover:bg-[#234a63]">Return Home</Button>
        </Link>
      </div>
    );
  }

  // Get other services for the sidebar
  const otherServices = services.filter(s => s.id !== service.id);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Header */}
      <Header onOpenQuotePopup={openQuotePopup} />

      {/* Breadcrumb Navigation */}
      <section className="py-4 bg-gray-50 border-b border-gray-200">
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/#services" },
            { label: service.title, href: `/services/${service.id}`, isCurrentPage: true }
          ]} />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-16 lg:py-24">
        <div className="absolute inset-0 bg-black/30" style={{
          backgroundImage: `url(${service.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }} />
        <div className="container relative z-10">
          <Link href="/#services" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {service.title}
          </h1>
          <p className="text-xl text-white/90 mb-6 max-w-2xl">{service.tagline}</p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-white text-[#2C5F7F] hover:bg-white/90" onClick={openQuotePopup}>
              Get a Free Quote
            </Button>
            <a href="tel:07970566409">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="w-4 h-4 mr-2" />
                Call Us Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-[#F5F1E8]">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Before/After Slider for Gate Restoration */}
              {service.id === "gate-restoration" && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    See the Transformation
                  </h2>
                  <BeforeAfterSlider
                    beforeImage="/images/premier/gate-metal-before.webp"
                    afterImage="/images/premier/gate-metal-after.webp"
                    beforeLabel="Before"
                    afterLabel="After"
                    className="shadow-xl"
                  />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <p className="text-gray-600 text-sm">Drag the slider to see the dramatic transformation</p>
                    <div className="flex gap-3">
                      <Button onClick={openQuotePopup} className="bg-[#2C5F7F] hover:bg-[#234a63] text-white">
                        Request a Quote
                      </Button>
                      <Button asChild variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                        <a href="tel:07970566409" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Before/After Slider for Steel Shot Blasting */}
              {service.id === "steel-shot-blasting" && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    See the Transformation
                  </h2>
                  <BeforeAfterSlider
                    beforeImage="/images/premier/steel-container-before.webp"
                    afterImage="/images/premier/steel-container-after.webp"
                    beforeLabel="Before"
                    afterLabel="After"
                    className="shadow-xl"
                  />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <p className="text-gray-600 text-sm">Drag the slider to see the dramatic transformation</p>
                    <div className="flex gap-3">
                      <Button onClick={openQuotePopup} className="bg-[#2C5F7F] hover:bg-[#234a63] text-white">
                        Request a Quote
                      </Button>
                      <Button asChild variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                        <a href="tel:07970566409" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Before/After Slider for Automotive Restoration */}
              {service.id === "automotive-restoration" && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    See the Transformation
                  </h2>
                  <BeforeAfterSlider
                    beforeImage="/images/premier/steel-container-commercial-before.webp"
                    afterImage="/images/premier/steel-container-commercial-after.webp"
                    beforeLabel="Before"
                    afterLabel="After"
                    className="shadow-xl"
                  />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <p className="text-gray-600 text-sm">Drag the slider to see the dramatic transformation</p>
                    <div className="flex gap-3">
                      <Button onClick={openQuotePopup} className="bg-[#2C5F7F] hover:bg-[#234a63] text-white">
                        Request a Quote
                      </Button>
                      <Button asChild variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                        <a href="tel:07970566409" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Before/After Slider for Concrete Preparation */}
              {service.id === "concrete-preparation" && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    See the Transformation
                  </h2>
                  <BeforeAfterSlider
                    beforeImage="/images/premier/warehouse-outside-before.webp"
                    afterImage="/images/premier/warehouse-outside-after.webp"
                    beforeLabel="Before"
                    afterLabel="After"
                    className="shadow-xl"
                  />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <p className="text-gray-600 text-sm">Drag the slider to see the dramatic transformation</p>
                    <div className="flex gap-3">
                      <Button onClick={openQuotePopup} className="bg-[#2C5F7F] hover:bg-[#234a63] text-white">
                        Request a Quote
                      </Button>
                      <Button asChild variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                        <a href="tel:07970566409" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Before/After Slider for Marine Services */}
              {service.id === "marine-services" && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    See the Transformation
                  </h2>
                  <BeforeAfterSlider
                    beforeImage="/images/premier/storage-unit-before.jpeg"
                    afterImage="/images/premier/storage-unit-after.webp"
                    beforeLabel="Before"
                    afterLabel="After"
                    className="shadow-xl"
                  />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <p className="text-gray-600 text-sm">Drag the slider to see the dramatic transformation</p>
                    <div className="flex gap-3">
                      <Button onClick={openQuotePopup} className="bg-[#2C5F7F] hover:bg-[#234a63] text-white">
                        Request a Quote
                      </Button>
                      <Button asChild variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                        <a href="tel:07970566409" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Before/After Slider for Agricultural Equipment */}
              {service.id === "agricultural-equipment" && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    See the Transformation
                  </h2>
                  <BeforeAfterSlider
                    beforeImage="/images/premier/warehouse-bars-before.webp"
                    afterImage="/images/premier/warehouse-bars-after.webp"
                    beforeLabel="Before"
                    afterLabel="After"
                    className="shadow-xl"
                  />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <p className="text-gray-600 text-sm">Drag the slider to see the dramatic transformation</p>
                    <div className="flex gap-3">
                      <Button onClick={openQuotePopup} className="bg-[#2C5F7F] hover:bg-[#234a63] text-white">
                        Request a Quote
                      </Button>
                      <Button asChild variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                        <a href="tel:07970566409" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Before/After Slider for Infrastructure Projects */}
              {service.id === "infrastructure-projects" && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    See the Transformation
                  </h2>
                  <BeforeAfterSlider
                    beforeImage="/images/premier/steel-container-before.webp"
                    afterImage="/images/premier/steel-container-after.webp"
                    beforeLabel="Before"
                    afterLabel="After"
                    className="shadow-xl"
                  />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <p className="text-gray-600 text-sm">Drag the slider to see the dramatic transformation</p>
                    <div className="flex gap-3">
                      <Button onClick={openQuotePopup} className="bg-[#2C5F7F] hover:bg-[#234a63] text-white">
                        Request a Quote
                      </Button>
                      <Button asChild variant="outline" className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white">
                        <a href="tel:07970566409" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  About This Service
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">{service.description}</p>
              </div>

              {/* Steel Sheeting Video Section */}
              {service.id === 'steel-sheeting' && (
                <div className="my-12">
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Watch Our Steel Sheeting Shot Blasting Process
                  </h2>
                  <p className="text-gray-600 mb-6">
                    See our precision shot blasting equipment in action as we transform steel sheets, removing rust, mill scale, and old coatings to create the perfect surface profile for protective finishes.
                  </p>
                  
                  <div className="flex justify-center">
                    <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-[#2C5F7F]/20 max-w-md w-full">
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
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-[#F5F1E8] rounded-lg p-6 border border-[#2C5F7F]/10">
                      <Shield className="w-10 h-10 text-[#2C5F7F] mb-3" />
                      <h3 className="font-bold text-lg text-[#2C2C2C] mb-2">Complete Coverage</h3>
                      <p className="text-gray-600 text-sm">Uniform blasting across entire surface area ensures consistent results</p>
                    </div>
                    <div className="bg-[#F5F1E8] rounded-lg p-6 border border-[#2C5F7F]/10">
                      <Clock className="w-10 h-10 text-[#2C5F7F] mb-3" />
                      <h3 className="font-bold text-lg text-[#2C2C2C] mb-2">Efficient Process</h3>
                      <p className="text-gray-600 text-sm">Fast turnaround times minimize project delays</p>
                    </div>
                    <div className="bg-[#F5F1E8] rounded-lg p-6 border border-[#2C5F7F]/10">
                      <Award className="w-10 h-10 text-[#2C5F7F] mb-3" />
                      <h3 className="font-bold text-lg text-[#2C2C2C] mb-2">Quality Finish</h3>
                      <p className="text-gray-600 text-sm">Perfect surface profile for optimal coating adhesion</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Factory Cladding Custom Gallery with 4 Before Images */}
              {service.id === 'factory-cladding' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Project Gallery: Industrial Warehouse Cladding Restoration
                  </h2>
                  <p className="text-gray-600 mb-6">
                    This project showcases the complete transformation of severely deteriorated warehouse cladding. The before images reveal the extent of the challenge: rust-coloured panels with original plastisol coating, multiple layers of failed paint, extensive peeling, and decades of weathering across the entire building envelope.
                  </p>
                  
                  {/* Before Images Grid */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">Before: Deteriorated Condition</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="/factory-cladding-before-1.webp" alt="Warehouse exterior showing deteriorated cladding" className="w-full h-64 object-cover" />
                        <div className="bg-gray-100 p-3">
                          <p className="text-sm text-gray-700">Warehouse exterior with severely deteriorated cladding panels</p>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="/factory-cladding-before-2.webp" alt="Cladding showing multiple paint layers and rust" className="w-full h-64 object-cover" />
                        <div className="bg-gray-100 p-3">
                          <p className="text-sm text-gray-700">Multiple paint layers and plastisol coating failure</p>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="/factory-cladding-before-3.webp" alt="Close-up of deteriorated cladding panels" className="w-full h-64 object-cover" />
                        <div className="bg-gray-100 p-3">
                          <p className="text-sm text-gray-700">Close-up showing extent of coating deterioration</p>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="/factory-cladding-before-4.webp" alt="Detailed view of peeling paint and rust" className="w-full h-64 object-cover" />
                        <div className="bg-gray-100 p-3">
                          <p className="text-sm text-gray-700">Peeling paint, rust, and surface contamination</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* After Image */}
                  <div>
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">After: Complete Restoration</h3>
                    <div className="overflow-hidden rounded-lg shadow-xl">
                      <img loading="lazy" src="/factory-cladding-after-1.webp" alt="Fully restored warehouse cladding - clean bare metal" className="w-full h-96 object-cover" />
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4">
                        <p className="text-lg font-semibold text-gray-800 mb-2">Transformation Complete</p>
                        <p className="text-gray-700">Clean, uniform bare metal surfaces ready for protective coating. All plastisol, paint layers, rust, and contaminants completely removed while preserving panel integrity.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Structural Steel Frames Custom Gallery with Before/During/After */}
              {service.id === 'structural-steel-frames' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Project Gallery: Commercial Building Structural Steel Frame Restoration
                  </h2>
                  <p className="text-gray-600 mb-6">
                    This project showcases the comprehensive shot blasting of extensive structural steel roof trusses and load-bearing frames in a commercial building. Follow the progression from the original mill-finished condition through the blasting process to the final restored state ready for protective coating.
                  </p>
                  
                  {/* Before Image */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">Before: Mill-Finished Condition</h3>
                    <div className="overflow-hidden rounded-lg shadow-xl">
                      <img loading="lazy" src="/structural-frames-before.webp" alt="Structural steel frames before blasting - mill scale and surface contaminants" className="w-full h-96 object-cover" />
                      <div className="bg-gray-100 p-4">
                        <p className="text-gray-700">Complex truss systems and frame members with mill scale, welding residue, and surface contaminants requiring complete removal for protective coating application.</p>
                      </div>
                    </div>
                  </div>

                  {/* During Image */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">During: Shot Blasting in Progress</h3>
                    <div className="overflow-hidden rounded-lg shadow-xl">
                      <img loading="lazy" src="/structural-frames-during.webp" alt="Shot blasting process on structural steel trusses" className="w-full h-96 object-cover" />
                      <div className="bg-blue-50 p-4">
                        <p className="text-gray-700">Systematic shot blasting across the entire ceiling framework, removing all mill scale and contaminants from truss members, connection points, and hard-to-reach areas within the lattice structure.</p>
                      </div>
                    </div>
                  </div>

                  {/* After Images Grid */}
                  <div>
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">After: Complete Restoration</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="overflow-hidden rounded-lg shadow-xl">
                        <img loading="lazy" src="/structural-frames-after-1.webp" alt="Restored structural steel frames - clean bare metal" className="w-full h-80 object-cover" />
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3">
                          <p className="text-sm text-gray-700">Uniform clean bare metal surfaces across all truss members and frame sections</p>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-lg shadow-xl">
                        <img loading="lazy" src="/structural-frames-after-2.webp" alt="Complete view of restored structural framework" className="w-full h-80 object-cover" />
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3">
                          <p className="text-sm text-gray-700">Complete structural framework prepared to specification, ready for protective coating</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                      <p className="text-lg font-semibold text-gray-800 mb-2">Project Complete</p>
                      <p className="text-gray-700">Hundreds of linear metres of structural steelwork transformed to uniform, clean bare metal surfaces achieving professional cleanliness. All connection points, welds, and complex truss geometry achieved consistent surface preparation for optimal coating adhesion.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Steel Gates Custom Gallery */}
              {service.id === 'steel-gates' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Project Gallery: Victorian Entrance Gates Restoration
                  </h2>
                  <p className="text-gray-600 mb-6">
                    This project showcases the complete restoration of ornate Victorian entrance gates for a commercial property. Follow the transformation from decades of deterioration through the careful shot blasting process to the final restored state, revealing the full beauty of the original craftsmanship.
                  </p>
                  
                  {/* Before Images Grid */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">Before: Decades of Deterioration</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="overflow-hidden rounded-lg shadow-xl">
                        <img loading="lazy" src="/steel-gates-before-1.webp" alt="Gate showing rust and peeling paint on decorative railings" className="w-full h-64 object-cover" />
                        <div className="bg-gray-100 p-3">
                          <p className="text-sm text-gray-700">Decorative railings obscured by multiple layers of failing paint and rust</p>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-lg shadow-xl">
                        <img loading="lazy" src="/steel-gates-before-2.webp" alt="Close-up of corroded gate base and lower sections" className="w-full h-64 object-cover" />
                        <div className="bg-gray-100 p-3">
                          <p className="text-sm text-gray-700">Severe corrosion at gate base where water pooling accelerated deterioration</p>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-lg shadow-xl">
                        <img loading="lazy" src="/steel-gates-before-3.webp" alt="Ornate gate panels with paint buildup hiding details" className="w-full h-64 object-cover" />
                        <div className="bg-gray-100 p-3">
                          <p className="text-sm text-gray-700">Ornate scrollwork and finials hidden under decades of paint buildup</p>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-lg shadow-xl">
                        <img loading="lazy" src="/steel-gates-before-4.webp" alt="Full gate view showing overall deteriorated condition" className="w-full h-64 object-cover" />
                        <div className="bg-gray-100 p-3">
                          <p className="text-sm text-gray-700">Complete gate structure requiring comprehensive restoration</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* During Images */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">During: Careful Shot Blasting Process</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="overflow-hidden rounded-lg shadow-xl">
                        <img loading="lazy" src="/steel-gates-during-1.webp" alt="Shot blasting in progress on ornate gate panels" className="w-full h-80 object-cover" />
                        <div className="bg-blue-50 p-3">
                          <p className="text-sm text-gray-700">Systematic blasting revealing the intricate Victorian scrollwork beneath paint layers</p>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-lg shadow-xl">
                        <img loading="lazy" src="/steel-gates-during-2.webp" alt="Partial restoration showing contrast between cleaned and uncleaned sections" className="w-full h-80 object-cover" />
                        <div className="bg-blue-50 p-3">
                          <p className="text-sm text-gray-700">Dramatic contrast between restored bare metal and remaining deteriorated sections</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* After Image */}
                  <div>
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">After: Restored to Original Splendor</h3>
                    <div className="overflow-hidden rounded-lg shadow-xl mb-4">
                      <img loading="lazy" src="/steel-gates-after.webp" alt="Fully restored Victorian gates - clean bare metal revealing ornate details" className="w-full h-96 object-cover" />
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4">
                        <p className="text-gray-700">Complete gate restoration revealing the full beauty of Victorian craftsmanship - all decorative scrollwork, finials, and ornate details preserved and prepared for protective coating.</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                      <p className="text-lg font-semibold text-gray-800 mb-2">Heritage Preserved</p>
                      <p className="text-gray-700">These Victorian entrance gates have been transformed from deteriorated eyesores to stunning architectural features. Every intricate detail has been preserved while achieving complete rust removal and optimal surface preparation. The gates are now ready for a high-quality protective coating system that will ensure decades more service life while maintaining the property's heritage character.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Fire Escapes Image Showcase */}
              {service.id === 'fire-escapes' && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Professional External Staircase Shot Blasting
                  </h2>
                  <div className="overflow-hidden rounded-lg shadow-2xl">
                    <img loading="lazy"
                      src="/external-staircase-blasting.webp" 
                      alt="Professional shot blasting of external industrial staircase and fire escape structure" 
                      className="w-full h-auto object-cover"
                    />
                    <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6">
                      <p className="text-lg font-semibold text-gray-800 mb-3">Expert Surface Preparation for Safety-Critical Infrastructure</p>
                      <p className="text-gray-700 mb-2">
                        Our specialist team provides comprehensive shot blasting services for external staircases, fire escapes, and stair towers. Using controlled techniques and professional containment systems, we remove rust, old coatings, and corrosion while working safely at height.
                      </p>
                      <p className="text-gray-700">
                        Every project is completed to the highest safety standards, ensuring fire escape structures are prepared for protective coatings that will provide decades of corrosion protection and maintain fire safety requirements.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Steel Containers Before/After Gallery */}
              {service.id === 'steel-containers' && (
                <div className="bg-gradient-to-br from-[#2C5F7F]/5 to-[#2C5F7F]/10 p-8 rounded-lg">
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Industrial Container Restoration Case Study
                  </h2>
                  <p className="text-gray-700 mb-8">
                    A manufacturing facility required restoration of large industrial mixing containers that had accumulated years of paint, coatings, and surface contamination. The containers needed complete surface preparation to restore structural integrity and enable food-grade coating application.
                  </p>

                  {/* Before Images Grid */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">Before: Heavy Contamination</h3>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="/container-before-1.webp" alt="Industrial container with heavy paint buildup and surface contamination" className="w-full h-64 object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Heavy paint buildup and rust on exterior surfaces</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="/container-before-2.webp" alt="Close-up of container showing multiple coating layers and corrosion" className="w-full h-64 object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Multiple coating layers hiding structural condition</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="/container-before-3.webp" alt="Full view of contaminated container showing overall deteriorated state" className="w-full h-64 object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Overall contamination preventing proper inspection</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      The containers showed extensive surface contamination with multiple layers of industrial coatings, paint buildup, and surface rust. The heavy contamination prevented proper structural inspection and made the containers unsuitable for food-grade applications.
                    </p>
                  </div>

                  {/* After Images Grid */}
                  <div>
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">After: Complete Restoration</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="/container-after-1.webp" alt="Fully restored container showing clean bare metal surface" className="w-full h-80 object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Clean bare metal with uniform surface profile</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="/container-after-2.webp" alt="Restored container ready for food-grade coating application" className="w-full h-80 object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Ready for food-grade protective coating</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      Complete transformation to clean bare metal with uniform surface profile. All contamination removed, revealing sound structural condition. The containers are now ready for food-grade coating application and will provide decades of reliable service in the manufacturing facility.
                    </p>
                  </div>

                  {/* Case Study Details */}
                  <div className="mt-8 grid md:grid-cols-3 gap-6">
                    <Card className="bg-white/80 backdrop-blur">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-[#2C5F7F] mb-2">Challenge</h4>
                        <p className="text-sm text-gray-600">
                          Multiple layers of industrial coatings and heavy contamination preventing structural inspection and food-grade certification.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/80 backdrop-blur">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-[#2C5F7F] mb-2">Solution</h4>
                        <p className="text-sm text-gray-600">
                          Systematic shot blasting to remove all contamination while preserving structural integrity. Careful attention to interior and exterior surfaces.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/80 backdrop-blur">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-[#2C5F7F] mb-2">Result</h4>
                        <p className="text-sm text-gray-600">
                          Complete restoration to clean bare metal, enabling food-grade coating and extending service life by 20+ years versus replacement.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Commercial Radiators Before/After Gallery */}
              {service.id === 'commercial-radiators' && (
                <div className="bg-gradient-to-br from-[#2C5F7F]/5 to-[#2C5F7F]/10 p-8 rounded-lg">
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Heritage Building Radiator Restoration Case Study
                  </h2>
                  <p className="text-gray-700 mb-8">
                    A heritage building refurbishment project required restoration of 45 original Victorian cast iron radiators. Decades of paint buildup obscured the decorative details, and many radiators had surface rust. The client required complete restoration while preserving the heritage value and manufacturer markings.
                  </p>

                  {/* Before Images Grid */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">Before: Multiple Paint Layers</h3>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="/radiator-before-1.webp" alt="Victorian cast iron radiator with decades of paint buildup" className="w-full h-64 object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Decades of paint buildup obscuring decorative details</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="/radiator-before-2.webp" alt="Cast iron radiator showing multiple coating layers and surface rust" className="w-full h-64 object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Multiple coating layers hiding original cast iron surface</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="/radiator-before-3.webp" alt="Heritage radiator with paint buildup on decorative features" className="w-full h-64 object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Paint buildup on ornate scrollwork and manufacturer badges</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      The radiators showed extensive paint buildup with 10-20 layers accumulated over a century. The heavy paint obscured decorative details, manufacturer markings, and the original cast iron surface. Many radiators also had surface rust where paint had failed.
                    </p>
                  </div>

                  {/* After Images Grid */}
                  <div>
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">After: Complete Restoration</h3>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="/radiator-after-1.webp" alt="Fully restored cast iron radiator with clean bare metal finish" className="w-full h-64 object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Clean bare metal revealing original cast iron details</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="/radiator-after-2.webp" alt="Restored radiator showing preserved decorative features" className="w-full h-64 object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Preserved decorative features and manufacturer markings</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="/radiator-after-3.webp" alt="Heritage radiator ready for powder coating" className="w-full h-64 object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Ready for period-appropriate powder coating</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="/radiator-after-4.webp" alt="Restored radiator with uniform surface preparation" className="w-full h-64 object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Uniform surface preparation for optimal coating adhesion</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="/radiator-after-5.webp" alt="Multiple restored radiators showing consistent quality" className="w-full h-64 object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Consistent restoration quality across all radiators</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg">
                        <img loading="lazy" src="/radiator-after-6.webp" alt="Restored radiators in heritage building setting" className="w-full h-64 object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Restored radiators preserving heritage building character</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      Complete transformation revealing the original cast iron surface with all decorative details preserved. All paint layers removed, manufacturer markings visible, and surfaces prepared for modern powder coating. The radiators were restored to their original appearance while providing modern corrosion protection for decades of continued service.
                    </p>
                  </div>

                  {/* Case Study Details */}
                  <div className="mt-8 grid md:grid-cols-3 gap-6">
                    <Card className="bg-white/80 backdrop-blur">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-[#2C5F7F] mb-2">Challenge</h4>
                        <p className="text-sm text-gray-600">
                          45 Victorian radiators with 10-20 paint layers obscuring decorative details. Required complete restoration while preserving heritage value and manufacturer markings.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/80 backdrop-blur">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-[#2C5F7F] mb-2">Solution</h4>
                        <p className="text-sm text-gray-600">
                          Controlled shot blasting to remove all paint layers without damaging cast iron. Protected threaded connections and preserved ornate details throughout the process.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/80 backdrop-blur">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-[#2C5F7F] mb-2">Result</h4>
                        <p className="text-sm text-gray-600">
                          All radiators restored to original appearance, passed building conservation approval, and reinstalled as functional heating elements with 50+ year service life extension.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Commercial & Agricultural Vehicles Case Studies */}
              {service.id === 'commercial-vehicles' && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Commercial Vehicle Restoration Projects
                  </h2>
                  <p className="text-gray-600 mb-8">
                    We specialize in heavy-duty commercial and agricultural vehicle restoration, from individual wheel sets to complete chassis overhauls. Below are two recent projects showcasing our capabilities with vintage farm trucks and warehouse vehicles.
                  </p>

                  {/* Project 1: Commercial Vehicle Wheels */}
                  <div className="mb-12 bg-gradient-to-br from-[#2C5F7F]/5 to-[#4A90B5]/5 p-8 rounded-lg">
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">Project 1: Heavy-Duty Commercial Vehicle Wheels</h3>
                    <p className="text-gray-600 mb-6">
                      A vintage farm truck required complete wheel restoration. The heavy-duty wheels had accumulated decades of paint, rust, and agricultural contamination. The client needed the wheels restored to bare metal for protective coating before the vehicle could return to service.
                    </p>

                    {/* Before Images */}
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold text-[#2C5F7F] mb-4">Before: Heavy Contamination</h4>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="relative group overflow-hidden rounded-lg shadow-lg">
                          <img loading="lazy" src="/vehicle-wheel-before-closeup.webp" alt="Commercial vehicle wheel with heavy rust and paint buildup" className="w-full h-64 object-cover" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Black wheels showing decades of paint and contamination</p>
                          </div>
                        </div>
                        <div className="relative group overflow-hidden rounded-lg shadow-lg">
                          <img loading="lazy" src="/vehicle-complete-after-3.webp" alt="Commercial vehicle with black contaminated wheels before blasting" className="w-full h-64 object-cover" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Complete vehicle with black wheels before restoration</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 italic">
                        The wheels showed extensive corrosion, multiple paint layers, and agricultural chemical staining. The heavy contamination required industrial-grade shot blasting to restore the metal surface.
                      </p>
                    </div>

                    {/* After Images */}
                    <div>
                      <h4 className="text-xl font-semibold text-[#2C5F7F] mb-4">After: Complete Vehicle Restoration</h4>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="relative group overflow-hidden rounded-lg shadow-lg">
                          <img loading="lazy" src="/vehicle-complete-after-1.webp" alt="Restored commercial vehicle with silver shot-blasted wheels" className="w-full h-64 object-cover" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Silver shot-blasted wheels ready for protective coating</p>
                          </div>
                        </div>
                        <div className="relative group overflow-hidden rounded-lg shadow-lg">
                          <img loading="lazy" src="/vehicle-complete-after-2.webp" alt="Vintage farm truck with clean bare metal wheels" className="w-full h-64 object-cover" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Vintage farm truck with clean bare metal finish</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-lg shadow-lg mb-4">
                        <img loading="lazy" src="/vehicle-wheel-after-closeup.webp" alt="Silver shot-blasted wheel showing clean bare metal finish" className="w-full h-96 object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">Closeup of silver shot-blasted wheel ready for protective coating</p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic">
                        All wheels, chassis components, and body panels were shot blasted to bare metal (silver finish). The vintage farm truck was completely restored and prepared for protective coating, extending its service life by decades.
                      </p>
                    </div>

                    {/* Project Summary Cards */}
                    <div className="grid md:grid-cols-3 gap-4 mt-8">
                      <Card className="bg-white/80 backdrop-blur">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-[#2C5F7F] mb-2">Challenge</h4>
                          <p className="text-sm text-gray-600">
                            Heavy-duty wheels with decades of paint, rust, and agricultural contamination required complete restoration for vintage farm truck.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/80 backdrop-blur">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-[#2C5F7F] mb-2">Solution</h4>
                          <p className="text-sm text-gray-600">
                            Industrial-grade shot blasting of all wheels, chassis, and body panels to bare metal using heavy-duty media and controlled techniques.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/80 backdrop-blur">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-[#2C5F7F] mb-2">Result</h4>
                          <p className="text-sm text-gray-600">
                            Complete vehicle restoration with uniform surface preparation, ready for protective coating and decades more service in agricultural operations.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Project 2: Complete Chassis Restoration */}
                  <div className="bg-gradient-to-br from-[#2C5F7F]/5 to-[#4A90B5]/5 p-8 rounded-lg">
                    <h3 className="text-2xl font-semibold text-[#2C5F7F] mb-4">Project 2: Complete Chassis Restoration</h3>
                    <p className="text-gray-600 mb-6">
                      A commercial warehouse vehicle required complete chassis restoration for a full rebuild project. The chassis had been stripped to bare frame, revealing extensive corrosion and old coating residue. The client needed every structural member shot blasted to bare metal for inspection and protective coating.
                    </p>

                    {/* Chassis Restoration Images */}
                    <div>
                      <h4 className="text-xl font-semibold text-[#2C5F7F] mb-4">Complete Chassis Shot Blasting</h4>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="relative group overflow-hidden rounded-lg shadow-lg">
                          <img loading="lazy" src="/chassis-restoration-1.webp" alt="Bare chassis frame showing structural members and roll cage" className="w-full h-64 object-cover" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Bare chassis frame with roll cage and structural members exposed</p>
                          </div>
                        </div>
                        <div className="relative group overflow-hidden rounded-lg shadow-lg">
                          <img loading="lazy" src="/chassis-restoration-2.webp" alt="Chassis interior showing clean metal finish" className="w-full h-64 object-cover" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Interior chassis members with uniform bare metal finish</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="relative group overflow-hidden rounded-lg shadow-lg">
                          <img loading="lazy" src="/chassis-restoration-3.webp" alt="Rear chassis section showing complete restoration" className="w-full h-64 object-cover" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Rear chassis section with complete corrosion removal</p>
                          </div>
                        </div>
                        <div className="relative group overflow-hidden rounded-lg shadow-lg">
                          <img loading="lazy" src="/chassis-restoration-4.webp" alt="Complete chassis ready for protective coating" className="w-full h-64 object-cover" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Complete chassis prepared for commercial-grade coating</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 italic">
                        Every structural member, cross-brace, and chassis component was systematically shot blasted to bare metal. The complete chassis restoration revealed the true condition of all structural members and provided optimal surface preparation for protective coating systems.
                      </p>
                    </div>

                    {/* Project Summary Cards */}
                    <div className="grid md:grid-cols-3 gap-4 mt-8">
                      <Card className="bg-white/80 backdrop-blur">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-[#2C5F7F] mb-2">Challenge</h4>
                          <p className="text-sm text-gray-600">
                            Complete chassis required total restoration with every structural member shot blasted for rebuild project inspection and coating.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/80 backdrop-blur">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-[#2C5F7F] mb-2">Solution</h4>
                          <p className="text-sm text-gray-600">
                            Systematic shot blasting of entire chassis frame, including all structural members, cross-braces, and mounting points to bare metal.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/80 backdrop-blur">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-[#2C5F7F] mb-2">Result</h4>
                          <p className="text-sm text-gray-600">
                            Complete chassis restoration revealing true structural condition, ready for commercial-grade protective coating and vehicle rebuild.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}

              {/* Steel Doors & Roller Shutters Before/After Gallery */}
              {service.id === 'steel-doors' && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Warehouse Roller Shutter Restoration
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Complete transformation of industrial loading bay roller shutters from heavily contaminated surfaces to clean, uniform bare metal ready for protective coating.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-semibold text-[#2C5F7F] mb-4">Before: Heavy Contamination</h3>
                      <div className="grid gap-4">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                          <img loading="lazy"
                            src="/door-before-1.webp"
                            alt="Warehouse exterior showing contaminated roller shutter before restoration"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Warehouse exterior with contaminated roller shutter</p>
                          </div>
                        </div>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                          <img loading="lazy"
                            src="/door-before-2.webp"
                            alt="Roller shutter slats with severe rust staining and paint degradation"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Severe rust staining and paint degradation on slats</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-[#2C5F7F] mb-4">After: Professional Restoration</h3>
                      <div className="grid gap-4">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                          <img loading="lazy"
                            src="/door-after-1.webp"
                            alt="Restored roller shutter with uniform bare metal finish"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Uniform bare metal finish ready for coating</p>
                          </div>
                        </div>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                          <img loading="lazy"
                            src="/door-after-2.webp"
                            alt="Complete warehouse exterior with restored roller shutter"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm">Complete restoration with professional finish</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#2C5F7F]/5 to-[#1a3a4d]/5 rounded-lg p-8">
                    <h3 className="text-xl font-semibold text-[#2C5F7F] mb-4">Project Summary</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <Card className="bg-white/80 backdrop-blur">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-[#2C5F7F] mb-2">Challenge</h4>
                          <p className="text-sm text-gray-600">
                            Multiple loading bay roller shutters with severe surface contamination, rust staining, and accelerating corrosion requiring restoration without replacement.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/80 backdrop-blur">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-[#2C5F7F] mb-2">Solution</h4>
                          <p className="text-sm text-gray-600">
                            Phased shot blasting of all roller shutter slats, door frames, and mounting hardware to remove industrial contamination while maintaining operational access.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/80 backdrop-blur">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-[#2C5F7F] mb-2">Result</h4>
                          <p className="text-sm text-gray-600">
                            Professional finish at a fraction of replacement cost, with restored doors expected to provide decades more service with minimal operational disruption.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}

              {/* First Before & After Gallery */}
              {getServiceGalleries(service.id).length > 0 && !['fire-escapes', 'staircases', 'bridge-steelwork', 'ladders', 'warehouse-racking', 'pipework', 'telecom-towers', 'factory-cladding', 'structural-steel-frames', 'steel-gates', 'steel-containers', 'commercial-radiators', 'commercial-vehicles', 'steel-doors'].includes(service.id) && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Transformation Gallery
                  </h2>
                  <p className="text-gray-600 mb-6">
                    See the dramatic difference our professional shot blasting service makes. Drag the slider to compare before and after results.
                  </p>
                  <BeforeAfterSlider
                    beforeImage={getServiceGalleries(service.id)[0].beforeImage}
                    afterImage={getServiceGalleries(service.id)[0].afterImage}
                    beforeLabel={getServiceGalleries(service.id)[0].beforeLabel}
                    afterLabel={getServiceGalleries(service.id)[0].afterLabel}
                    className="shadow-xl"
                  />
                </div>
              )}

              {/* Benefits */}
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Key Benefits
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <CheckCircle className="w-5 h-5 text-[#2C5F7F] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Our Process
                </h2>
                <div className="space-y-4">
                  {service.process.map((step) => (
                    <div key={step.step} className="flex gap-4 bg-white p-6 rounded-lg shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-[#2C5F7F] text-white flex items-center justify-center font-bold flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#2C5F7F] text-lg">{step.title}</h3>
                        <p className="text-gray-600 mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Second Before & After Gallery */}
              {getServiceGalleries(service.id).length > 1 && !['fire-escapes', 'staircases', 'bridge-steelwork', 'ladders', 'warehouse-racking', 'pipework', 'telecom-towers'].includes(service.id) && (
                <div>
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    More Project Transformations
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Another example of our professional container blasting work. Compare the before and after results.
                  </p>
                  <BeforeAfterSlider
                    beforeImage={getServiceGalleries(service.id)[1].beforeImage}
                    afterImage={getServiceGalleries(service.id)[1].afterImage}
                    beforeLabel={getServiceGalleries(service.id)[1].beforeLabel}
                    afterLabel={getServiceGalleries(service.id)[1].afterLabel}
                    className="shadow-xl"
                  />
                </div>
              )}

              {/* Applications */}
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Applications
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {service.applications.map((app, index) => (
                    <div key={index} className="bg-white px-4 py-3 rounded-lg shadow-sm text-gray-700 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-[#2C5F7F]" />
                      {app}
                    </div>
                  ))}
                </div>
              </div>

              {/* Case Studies */}
              {!['fire-escapes', 'staircases', 'bridge-steelwork', 'ladders', 'warehouse-racking', 'pipework', 'telecom-towers'].includes(service.id) && (
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Case Studies
                </h2>
                <div className="space-y-6">
                  {service.caseStudies.map((study, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <img loading="lazy"
                            src={study.image} 
                            alt={study.title}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                        <CardContent className="md:w-2/3 p-6">
                          <h3 className="text-xl font-bold text-[#2C5F7F] mb-2">{study.title}</h3>
                          <p className="text-sm text-gray-500 mb-4">{study.client}</p>
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="font-semibold text-[#2C5F7F]">Challenge: </span>
                              <span className="text-gray-600">{study.challenge}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-[#2C5F7F]">Solution: </span>
                              <span className="text-gray-600">{study.solution}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-[#2C5F7F]">Result: </span>
                              <span className="text-gray-600">{study.result}</span>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              )}

              {/* FAQs */}
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {service.faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <button
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      >
                        <span className="font-semibold text-[#2C5F7F]">{faq.question}</span>
                        {expandedFaq === index ? (
                          <ChevronUp className="w-5 h-5 text-[#2C5F7F]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#2C5F7F]" />
                        )}
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                        <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Contact Card */}
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Get a Free Quote
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Ready to discuss your {service.shortTitle.toLowerCase()} project? Contact us for a free, no-obligation quote.
                  </p>
                  <div className="space-y-3">
                    <Button className="w-full bg-[#2C5F7F] hover:bg-[#234a63]" onClick={openQuotePopup}>
                      Request Quote
                    </Button>
                    <a href="tel:07970566409" className="block">
                      <Button variant="outline" className="w-full border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F]/10">
                        <Phone className="w-4 h-4 mr-2" />
                        07970 566409
                      </Button>
                    </a>
                    <a href="mailto:info@commercialshotblasting.co.uk" className="block">
                      <Button variant="outline" className="w-full border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F]/10">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Us
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Why Choose Us */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Why Choose Us
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-[#2C5F7F] mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Fully Insured</h4>
                        <p className="text-sm text-gray-600">Comprehensive liability coverage</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-[#2C5F7F] mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Experienced Team</h4>
                        <p className="text-sm text-gray-600">Skilled professionals</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#2C5F7F] mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-800">On-Time Delivery</h4>
                        <p className="text-sm text-gray-600">Projects completed to schedule</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Other Services */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#2C5F7F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Other Services
                  </h3>
                  <div className="space-y-2">
                    {otherServices.map((s) => (
                      <Link 
                        key={s.id} 
                        href={`/services/${s.id}`}
                        className="block px-4 py-3 rounded-lg hover:bg-[#2C5F7F]/10 transition text-gray-700 hover:text-[#2C5F7F]"
                      >
                        <span className="flex items-center gap-2">
                          <ArrowRight className="w-4 h-4" />
                          {s.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#2C5F7F] text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Start Your {service.shortTitle} Project?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. Our team is ready to help with your surface preparation needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-[#2C5F7F] hover:bg-white/90 text-lg px-8 py-6" onClick={openQuotePopup}>
              Get Your Free Quote
            </Button>
            <a href="tel:07970566409">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                <Phone className="w-5 h-5 mr-2" />
                07970 566409
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a3d52] text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/30">
                  <span className="text-lg font-bold">CSB</span>
                </div>
                <span className="font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Commercial Shot Blasting</span>
              </div>
              <p className="text-white/70 text-sm">
                Professional surface preparation services across the UK. Quality workmanship guaranteed.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                {services.map((s) => (
                  <li key={s.id}>
                    <Link href={`/services/${s.id}`} className="hover:text-white transition">{s.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/#about" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/our-work" className="hover:text-white transition">Our Work</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
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
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/50 text-sm">
            © {new Date().getFullYear()} Commercial Shot Blasting. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Quote Popup */}
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}
