import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, CheckCircle, ArrowRight, ClipboardCheck, Calendar, Clock, MapPin, Camera, FileText, Users, Ruler, Shield, Truck, MessageSquare, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { QuotePopup } from "@/components/QuotePopup";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BackToTop } from "@/components/BackToTop";

export default function FreeSiteSurvey() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  const surveyIncludes = [
    {
      icon: Ruler,
      title: "Detailed Assessment",
      description: "Comprehensive inspection of all items requiring shot blasting, including measurements, condition assessment, and surface analysis."
    },
    {
      icon: Camera,
      title: "Photographic Documentation",
      description: "Full photographic record of current condition to support accurate quoting and project planning."
    },
    {
      icon: FileText,
      title: "Written Report",
      description: "Detailed survey report outlining scope of work, recommended processes, and any special considerations."
    },
    {
      icon: Truck,
      title: "Logistics Planning",
      description: "Assessment of access, collection/delivery requirements, and coordination with your operational schedule."
    },
    {
      icon: Clock,
      title: "Timeline Estimate",
      description: "Realistic project timeline based on scope, complexity, and your operational requirements."
    },
    {
      icon: Shield,
      title: "Health & Safety Review",
      description: "Identification of any H&S considerations and risk assessment for the proposed works."
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Initial Contact",
      description: "Call us or complete the form below. We'll discuss your requirements and arrange a convenient survey date.",
      duration: "Same day response"
    },
    {
      step: "2",
      title: "Site Visit",
      description: "Our surveyor visits your site to assess the work, take measurements, and understand your specific needs.",
      duration: "Typically within 5 working days"
    },
    {
      step: "3",
      title: "Survey Report",
      description: "You receive a comprehensive survey report with our findings, recommendations, and any technical considerations.",
      duration: "Within 48 hours of visit"
    },
    {
      step: "4",
      title: "Detailed Quotation",
      description: "Based on the survey, we provide a detailed, no-obligation quotation with clear pricing and timeline.",
      duration: "Included with report"
    }
  ];

  const benefits = [
    "No obligation - the survey is completely free with no pressure to proceed",
    "Accurate pricing - site surveys ensure quotes reflect actual requirements",
    "Expert advice - benefit from our experience across diverse industries",
    "Tailored solutions - we recommend the best approach for your specific needs",
    "Risk identification - we spot potential issues before they become problems",
    "Clear communication - you'll understand exactly what's involved"
  ];

  const faqs = [
    {
      question: "How long does a site survey take?",
      answer: "Most surveys take between 30 minutes to 2 hours depending on the scope and complexity of the work. Large industrial sites may require longer."
    },
    {
      question: "Do I need to prepare anything before the survey?",
      answer: "Just ensure our surveyor can access all areas and items to be assessed. Having any relevant drawings, specifications, or previous reports available is helpful but not essential."
    },
    {
      question: "Who will conduct the survey?",
      answer: "All surveys are conducted by experienced members of our team who understand both the technical requirements and practical considerations of shot blasting projects."
    },
    {
      question: "What areas do you cover for site surveys?",
      answer: "We offer free site surveys across the Midlands and surrounding regions. For locations further afield, please contact us to discuss arrangements."
    },
    {
      question: "Can you survey during our operational hours?",
      answer: "Absolutely. We're flexible and can arrange surveys at times that minimise disruption to your operations, including early mornings, evenings, or weekends if required."
    },
    {
      question: "What happens after the survey?",
      answer: "Within 48 hours you'll receive a detailed survey report and quotation. There's no obligation to proceed - the information is yours to use in your decision-making."
    }
  ];

  const idealFor = [
    {
      title: "Large-Scale Projects",
      description: "Multiple items, complex logistics, or significant quantities benefit from on-site assessment."
    },
    {
      title: "Unusual Items",
      description: "Non-standard components or unique requirements that are difficult to describe remotely."
    },
    {
      title: "Condition Assessment",
      description: "When the extent of corrosion or damage needs professional evaluation."
    },
    {
      title: "Access Constraints",
      description: "Items that can't easily be photographed or measured by your team."
    },
    {
      title: "Operational Planning",
      description: "When timing and logistics need careful coordination with your operations."
    },
    {
      title: "Budget Planning",
      description: "When you need accurate costs for capital expenditure or maintenance budgets."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: "Free Site Survey", href: "/free-site-survey", isCurrentPage: true }
        ]}
        className="container mt-4"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1e4159] text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600')] bg-cover bg-center opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <ClipboardCheck className="w-8 h-8" />
              <span className="text-sm font-medium uppercase tracking-wider">Professional Assessment</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Free Site Survey
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Book a free, no-obligation site survey and get expert assessment of your shot blasting requirements. Our experienced team will visit your premises, evaluate your needs, and provide a detailed quotation tailored to your project.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setQuotePopupOpen(true)}
                className="bg-white text-[#2C5F7F] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Book Your Free Survey
              </button>
              <a
                href="tel:07970566409"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                07970 566409
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Comprehensive Assessment</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              What's Included in Your Free Survey
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Our free site survey provides everything you need to make an informed decision about your shot blasting project.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surveyIncludes.map((item, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-[#2C5F7F]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              How It Works
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              From initial contact to detailed quotation, our streamlined process ensures you get the information you need quickly.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#2C5F7F]/20"></div>
              
              {processSteps.map((step, index) => (
                <div key={index} className={`relative flex items-center mb-12 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <Card className="bg-white shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-[#2C5F7F] text-white rounded-full flex items-center justify-center font-bold md:hidden">
                            {step.step}
                          </div>
                          <h3 className="font-bold text-xl">{step.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-3">{step.description}</p>
                        <span className="inline-block text-sm text-[#2C5F7F] font-medium bg-[#2C5F7F]/10 px-3 py-1 rounded-full">
                          {step.duration}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Center circle */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#2C5F7F] text-white rounded-full items-center justify-center font-bold text-lg z-10">
                    {step.step}
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[#2C5F7F] text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-white/80 font-medium mb-2">Why Book a Site Survey?</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Benefits of a Professional Site Survey
              </h2>
              <p className="text-white/90 mb-8 leading-relaxed">
                A site survey ensures you receive accurate information and pricing for your project. It's the best way to start any significant shot blasting project.
              </p>
              <div className="grid gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ideal For
              </h3>
              <div className="grid gap-4">
                {idealFor.map((item, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-white/70 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Common Questions</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-[#2C5F7F] mt-1 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed ml-8">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <MapPin className="w-12 h-12 text-[#2C5F7F] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Coverage Area
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We offer free site surveys across the Midlands and surrounding regions, including Birmingham, Nottingham, Leicester, Derby, Sheffield, Manchester, and beyond. For locations outside our standard coverage area, please contact us to discuss arrangements.
            </p>
            <Link href="/service-areas">
              <a className="inline-flex items-center gap-2 text-[#2C5F7F] font-semibold hover:gap-3 transition-all">
                View All Service Areas <ArrowRight className="w-4 h-4" />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2C5F7F] to-[#1e4159] text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <ThumbsUp className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to Book Your Free Site Survey?
            </h2>
            <p className="text-white/90 mb-8 leading-relaxed">
              Take the first step towards your shot blasting project. Book your free, no-obligation site survey today and get expert advice tailored to your specific requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setQuotePopupOpen(true)}
                className="bg-white text-[#2C5F7F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Book Free Site Survey
              </button>
              <a
                href="tel:07970566409"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2 text-lg"
              >
                <Phone className="w-5 h-5" />
                Call 07970 566409
              </a>
            </div>
            <p className="text-white/70 mt-6 text-sm">
              Or email us at <a href="mailto:info@commercialshotblasting.co.uk" className="underline hover:text-white">info@commercialshotblasting.co.uk</a>
            </p>
          </div>
        </div>
      </section>

      <BackToTop />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
    </div>
  );
}
