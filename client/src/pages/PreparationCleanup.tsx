import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { QuotePopup } from "@/components/QuotePopup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Phone, Mail, Download } from "lucide-react";

export default function PreparationCleanup() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useEffect(() => {
    // Set page-specific SEO meta tags
    document.title = "Shot Blasting Preparation & Cleanup Services UK";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional site preparation and cleanup for shot blasting projects. Full containment, protection, and post-blast cleanup services across the UK.');
    }
    
    // Update meta keywords (reduced from 9 to 6)
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'shot blasting preparation, site cleanup, containment services, dust control, industrial cleanup, UK');
    }
  }, []);

  const stages = [
    {
      number: "1",
      title: "Containment & Protection",
      description: "We start by isolating the work area, sealing it off as a controlled zone. Dust and media are contained from the outset so nothing escapes into adjoining spaces."
    },
    {
      number: "2",
      title: "Surface Preparation",
      description: "Heavy-duty sheeting and protection boards are laid where necessary, edges are taped and sealed, and safe access routes are established before any blasting starts."
    },
    {
      number: "3",
      title: "Protection Of Delicate Areas",
      description: "Windows, glazing, polished surfaces and delicate fixtures are carefully masked, boarded and sealed. High-value items receive extra protection."
    },
    {
      number: "4",
      title: "Post-Blast Clean-Down",
      description: "All spent media, dust and debris are thoroughly vacuumed, swept and bagged. Waste is removed from site and disposed of correctly, leaving surfaces ready for the next phase."
    }
  ];

  const faqs = [
    {
      question: "Does shot blasting make a mess?",
      answer: "Shot blasting is naturally dusty at the point of impact, but we don't let that mess spread. We isolate the work area, sheet and seal floors and fixtures, protect windows and delicate items, then use extraction and industrial vacuums to control dust and spent media. When we leave, the work zone is cleaned down and ready for the next phase."
    },
    {
      question: "How do you protect floors and surfaces?",
      answer: "We lay heavy-duty sheeting and protection boards over all floors, then tape and seal the edges so nothing gets underneath. Safe walkways are set out before we start, protecting the original surface finish from start to finish."
    },
    {
      question: "How do you protect windows and glass?",
      answer: "Glazing is treated as high-risk. We mask and tape all frames, then board or double-sheet the glass so it's fully shielded from ricochet and dust. The same approach is used on mirrors, polished worktops, and any other delicate items in the blasting zone."
    },
    {
      question: "Do I need to empty the area before you start?",
      answer: "We ask that you remove small, fragile and personal items so we can work efficiently. Larger equipment or furniture can either be moved out or repositioned and sheeted by our team, depending on access and what's been agreed in advance."
    },
    {
      question: "What happens to the dust and blasting media?",
      answer: "All spent media, dust and debris are vacuumed, swept and bagged at the end of the job. We remove waste from site and dispose of it correctly, rather than leaving you to deal with piles of media and dust."
    },
    {
      question: "Can you work in occupied facilities?",
      answer: "Yes. We phase the work, isolate specific areas and keep access routes as clear as possible. That means you can often continue operations in other parts of the facility while we're working."
    },
    {
      question: "Do you clean up after shot blasting?",
      answer: "Yes. Clean-down and handover are part of the service, not an optional extra. We vacuum, sweep and bag all visible media and dust in the work area, remove our protection materials and leave the surfaces ready for coating or the next phase of work."
    },
    {
      question: "How long does the cleanup take?",
      answer: "It depends on the size and complexity of the job, but cleanup is built into our programme. A typical area will be cleaned down the same day the blasting is finished; larger projects are cleaned in phases so areas can be handed back progressively."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Preparation & Cleanup", href: "/preparation-cleanup", isCurrentPage: true }
      ]} className="container mt-6" />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-20">
        <div className="absolute inset-0 bg-[url('/cleanwarehouse.webp')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Preparation & Cleanup
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-8 leading-relaxed">
            Industry-leading site protection and cleanup processes that ensure minimal disruption and maximum quality
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-white text-[#2C5F7F] hover:bg-gray-100"
              onClick={() => setQuotePopupOpen(true)}
            >
              Get a Free Quote
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <a href="tel:07970566409">
                <Phone className="w-4 h-4 mr-2" />
                Call Us Now
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <a href="/site-preparation-checklist.pdf" download>
                <Download className="w-4 h-4 mr-2" />
                Download Checklist
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              At Commercial Shot Blasting we pride ourselves on our industry-leading preparation and cleanup. Shot blasting is only as good as the preparation and cleanup around it. If the site isn't properly protected, contained and cleaned down, you're left with dust, damage and disruption – no matter how well the actual blasting was done.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              That's why we put as much focus on how we set up and leave a project as we do on the finish itself, whether it's a single component, a full structure or a commercial facility.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              That starts with discussing the project with you and your individual requirements. Understanding the facility and what needs to be protected. Planning access, protection and waste management properly, agreeing how areas will be zoned off and how the work will be phased around other operations. Clear method statements and realistic timeframes give you visibility over what's happening on site, while our team keeps noise, dust and disruption under tight control.
            </p>
            <p className="text-gray-700 leading-relaxed">
              To keep standards consistent on every job, we follow a fixed, four-stage process from the moment we arrive to the final sweep-up. Each stage is delivered methodically, using the right equipment, protective measures and on-site checks to keep everything controlled from start to finish.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Stage Process */}
      <section className="py-16 bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              The 4-Stage Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A systematic approach that ensures predictable results, minimal mess and a site ready for the next phase of work
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {stages.map((stage) => (
              <Card key={stage.number} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#2C5F7F] text-white flex items-center justify-center text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {stage.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#2C2C2C] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {stage.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Why Our Preparation Matters
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Minimal disruption to ongoing operations",
              "Complete protection of surrounding areas",
              "Professional waste management and disposal",
              "Clear communication and method statements",
              "Systematic approach on every project",
              "Site left ready for next phase of work"
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#2C5F7F] flex-shrink-0 mt-1" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-[#F5F1E8]">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Preparation & Cleanup FAQs
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#2C2C2C] mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
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
            Contact us today to learn more about our preparation and cleanup processes, or to discuss your specific project requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-[#2C5F7F] hover:bg-gray-100"
              onClick={() => setQuotePopupOpen(true)}
            >
              Request Quote
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <a href="tel:07970566409">
                <Phone className="w-4 h-4 mr-2" />
                07970 566409
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <a href="mailto:info@commercialshotblasting.co.uk">
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
