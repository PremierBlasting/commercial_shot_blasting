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
                    beforeImage="/images/premier/gate-metal-before.jpeg"
                    afterImage="/images/premier/gate-metal-after.jpeg"
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
                    beforeImage="/images/premier/steel-container-before.jpeg"
                    afterImage="/images/premier/steel-container-after.jpeg"
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
                    beforeImage="/images/premier/steel-container-commercial-before.jpeg"
                    afterImage="/images/premier/steel-container-commercial-after.jpeg"
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
                    beforeImage="/images/premier/warehouse-outside-before.jpeg"
                    afterImage="/images/premier/warehouse-outside-after.jpeg"
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
                    afterImage="/images/premier/storage-unit-after.jpeg"
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
                    beforeImage="/images/premier/warehouse-bars-before.jpeg"
                    afterImage="/images/premier/warehouse-bars-after.jpeg"
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
                    beforeImage="/images/premier/steel-container-before.jpeg"
                    afterImage="/images/premier/steel-container-after.jpeg"
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

              {/* Before & After Gallery */}
              {getServiceGalleries(service.id).length > 0 && (
                <div className="space-y-12">
                  <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Transformation Gallery
                  </h2>
                  <p className="text-gray-600 mb-6">
                    See the dramatic difference our professional shot blasting service makes. Drag the slider to compare before and after results.
                  </p>
                  {getServiceGalleries(service.id).map((gallery, index) => (
                    <div key={index} className="space-y-4">
                      <BeforeAfterSlider
                        beforeImage={gallery.beforeImage}
                        afterImage={gallery.afterImage}
                        beforeLabel={gallery.beforeLabel}
                        afterLabel={gallery.afterLabel}
                        className="shadow-xl"
                      />
                    </div>
                  ))}
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
              <div>
                <h2 className="text-3xl font-bold text-[#2C5F7F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Case Studies
                </h2>
                <div className="space-y-6">
                  {service.caseStudies.map((study, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <img 
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
                <li><Link href="/gallery" className="hover:text-white transition">Gallery</Link></li>
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
                  Nationwide UK Service
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
