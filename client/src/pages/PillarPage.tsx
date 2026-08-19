import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp, ClipboardCheck, FileText, Phone, ShieldCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuotePopup } from "@/components/QuotePopup";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProjectImageGallery } from "@/components/ProjectImageGallery";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { getPillarPage } from "@/data/pillarPages";
import { recentProjects } from "@/data/recentProjects";
import NotFound from "./NotFound";

const SITE_URL = "https://commercialshotblasting.co.uk";

export default function PillarPage() {
  const [, params] = useRoute("/:slug");
  const pillar = getPillarPage(params?.slug ?? "");
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const projects = useMemo(
    () => pillar ? pillar.projectIds.map((id) => recentProjects.find((project) => project.id === id)).filter((project): project is NonNullable<typeof project> => Boolean(project)) : [],
    [pillar],
  );

  useSEO({
    title: pillar ? `${pillar.title} | Commercial Shot Blasting` : "Commercial Project Planning | Commercial Shot Blasting",
    description: pillar?.description ?? "Commercial shot blasting project planning resources.",
    keywords: pillar?.keywords ?? "commercial shot blasting project planning",
    image: pillar?.heroImage,
    canonical: pillar ? `${SITE_URL}/${pillar.slug}` : SITE_URL,
  });

  useEffect(() => {
    if (!pillar) return;
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/${pillar.slug}#webpage`,
          name: pillar.title,
          description: pillar.description,
          url: `${SITE_URL}/${pillar.slug}`,
          inLanguage: "en-GB",
          primaryImageOfPage: { "@type": "ImageObject", url: pillar.heroImage },
          isPartOf: { "@type": "WebSite", name: "Commercial Shot Blasting", url: SITE_URL },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
            { "@type": "ListItem", position: 3, name: pillar.shortTitle, item: `${SITE_URL}/${pillar.slug}` },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: pillar.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
        },
      ],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = `pillar-${pillar.slug}-jsonld`;
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => script.remove();
  }, [pillar]);

  if (!pillar) return <NotFound />;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />

      <section className="border-b border-slate-200 bg-slate-50 py-4">
        <div className="container">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: pillar.shortTitle, href: `/${pillar.slug}`, isCurrentPage: true }]} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#173d57] py-16 text-white md:py-24">
        <img src={pillar.heroImage} alt="" aria-hidden="true" fetchPriority="high" loading="eager" decoding="async" className="absolute h-px w-px opacity-0" />
        <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: `url(${pillar.heroImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12334d] via-[#12334d]/90 to-[#12334d]/45" />
        <div className="container relative z-10 max-w-5xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#b9dce7]">{pillar.eyebrow}</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>{pillar.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl">{pillar.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="bg-white font-bold text-[#1a3d52] hover:bg-slate-100" onClick={() => setQuotePopupOpen(true)}>Request A Site Visit <ArrowRight className="ml-2 h-4 w-4" /></Button>
            <a href="tel:07721375756"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10"><Phone className="mr-2 h-4 w-4" /> 07721 375756</Button></a>
          </div>
        </div>
      </section>

      <main>
        <section className="bg-white py-14 md:py-20">
          <div className="container grid gap-12 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.85fr)]">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#2C5F7F]">Project planning</p>
              <h2 className="text-3xl font-bold text-[#20313d] md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>A clearer route from existing condition to a scoped Site Visit</h2>
              <div className="mt-7 space-y-5 text-lg leading-relaxed text-slate-700">{pillar.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </div>
            <aside className="rounded-2xl border border-[#2C5F7F]/15 bg-[#eef7fa] p-6 shadow-sm">
              <ShieldCheck className="h-7 w-7 text-[#2C5F7F]" />
              <h2 className="mt-4 text-xl font-bold text-[#1a3d52]" style={{ fontFamily: "'Playfair Display', serif" }}>Evidence-led project guidance</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">Service and project links are selected for the stated asset type. Confirmed scope, access, coating requirements, and project records guide the detailed advice provided at Site Visit stage.</p>
              <button type="button" onClick={() => setQuotePopupOpen(true)} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2C5F7F] hover:underline">Discuss your project <ArrowRight className="h-4 w-4" /></button>
            </aside>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-wide text-[#2C5F7F]">Typical scope</p>
              <h2 className="mt-2 text-3xl font-bold text-[#20313d] md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>What this planning hub can help you organise</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">{pillar.scope.map((item) => <div key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-5"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#2C5F7F]" /><p className="text-sm leading-relaxed text-slate-700">{item}</p></div>)}</div>
          </div>
        </section>

        <section className="bg-white py-14 md:py-20">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-wide text-[#2C5F7F]">Before you enquire</p>
              <h2 className="mt-2 text-3xl font-bold text-[#20313d] md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>Four inputs that make the first discussion more useful</h2>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{pillar.planningInputs.map((input, index) => <article key={input.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#2C5F7F] text-sm font-bold text-white">{index + 1}</span><h3 className="mt-5 text-lg font-bold text-[#20313d]">{input.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{input.description}</p></article>)}</div>
          </div>
        </section>

        <section className="bg-[#f5f1e8] py-14 md:py-20">
          <div className="container">
            <div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-wide text-[#2C5F7F]">Specialist pathways</p><h2 className="mt-2 text-3xl font-bold text-[#20313d] md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>Choose the most relevant service route</h2></div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">{pillar.serviceLinks.map((link) => <Link key={link.href} href={link.href} className="group rounded-2xl border border-[#2C5F7F]/15 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><h3 className="text-xl font-bold text-[#1a3d52]" style={{ fontFamily: "'Playfair Display', serif" }}>{link.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{link.description}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2C5F7F]">View service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div>
          </div>
        </section>

        {projects.length > 0 && <section className="bg-white py-14 md:py-20"><div className="container"><div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-wide text-[#2C5F7F]">Verified project evidence</p><h2 className="mt-2 text-3xl font-bold text-[#20313d] md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>Related documented work</h2><p className="mt-4 text-slate-600">Project cards use only the approved record, imagery, and stated description assigned to each project.</p></div><div className="mt-8 grid gap-6 lg:grid-cols-3">{projects.map((project) => <article key={project.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><img src={project.afterImage} alt={project.title} loading="lazy" className="h-52 w-full object-cover" /><div className="p-6"><p className="text-xs font-bold uppercase tracking-wide text-[#2C5F7F]">{project.serviceLabel}</p><h3 className="mt-2 text-xl font-bold text-[#20313d]" style={{ fontFamily: "'Playfair Display', serif" }}>{project.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{project.description}</p>{project.galleryImages && <ProjectImageGallery title={project.title} images={project.galleryImages} />} {project.id === "steel-chimney-surface-preparation" && <Link href="/our-work#steel-chimney-case-study" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#2C5F7F] hover:underline">View full case study <ArrowRight className="h-4 w-4" /></Link>}</div></article>)}</div></div></section>}

        <section className="border-y border-slate-200 bg-slate-50 py-14 md:py-20"><div className="container"><div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-wide text-[#2C5F7F]">Useful reading</p><h2 className="mt-2 text-3xl font-bold text-[#20313d] md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>Supporting guides and terminology</h2></div><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{pillar.resourceLinks.map((link) => <Link key={link.href} href={link.href} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><FileText className="h-5 w-5 text-[#2C5F7F]" /><h3 className="mt-4 font-bold text-[#20313d]">{link.title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{link.description}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#2C5F7F]">Read resource <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></div></section>

        <section className="bg-white py-14 md:py-20"><div className="container max-w-4xl"><p className="text-center text-sm font-bold uppercase tracking-wide text-[#2C5F7F]">Questions answered</p><h2 className="mt-2 text-center text-3xl font-bold text-[#20313d] md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>Frequently asked questions</h2><div className="mt-8 space-y-3" itemScope itemType="https://schema.org/FAQPage">{pillar.faqs.map((faq, index) => <article key={faq.question} className="overflow-hidden rounded-xl border border-slate-200 bg-white" itemScope itemType="https://schema.org/Question"><button type="button" className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left" aria-expanded={expandedFaq === index} onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}><span itemProp="name" className="font-bold text-[#20313d]">{faq.question}</span>{expandedFaq === index ? <ChevronUp className="h-5 w-5 shrink-0 text-[#2C5F7F]" /> : <ChevronDown className="h-5 w-5 shrink-0 text-[#2C5F7F]" />}</button>{expandedFaq === index && <div className="px-5 pb-5" itemScope itemType="https://schema.org/Answer"><p itemProp="text" className="text-sm leading-relaxed text-slate-600">{faq.answer}</p></div>}</article>)}</div></div></section>

        <section className="bg-[#1a3d52] py-16 text-white"><div className="container text-center"><ClipboardCheck className="mx-auto h-8 w-8 text-[#b9dce7]" /><h2 className="mt-4 text-3xl font-bold md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>Ready to discuss the project scope?</h2><p className="mx-auto mt-4 max-w-2xl text-white/85">Share your photographs, drawings, existing condition, access notes, and coating requirements through our native Site Visit flow. We’ll get back to you promptly.</p><Button size="lg" className="mt-8 bg-white font-bold text-[#1a3d52] hover:bg-slate-100" onClick={() => setQuotePopupOpen(true)}>Request A Site Visit <ArrowRight className="ml-2 h-4 w-4" /></Button></div></section>
      </main>
      <Footer />
    </div>
  );
}
