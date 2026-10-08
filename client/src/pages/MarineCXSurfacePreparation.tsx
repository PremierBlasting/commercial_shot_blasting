import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import {
  Anchor,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Droplets,
  Gauge,
  Layers3,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BackToTop } from "@/components/BackToTop";
import { QuotePopup } from "@/components/QuotePopup";
import { FAQSchema } from "@/components/FAQSchema";

const images = [
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/iWLvchKqJhqibIDK.webp",
    alt: "ADE Power enclosure after Marine CX surface preparation and primer application",
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/ebtidQGhIvoeYkpa.webp",
    alt: "ADE Power enclosure being lifted following surface preparation",
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/TeeqNsVuyaHcJBqp.webp",
    alt: "Primed fabricated steel enclosure within the ADE Power facility",
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/UcNrvwwkmCavaIos.webp",
    alt: "Primed enclosure panel and ventilation detail",
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/qfuGXhTJgECVWZLk.webp",
    alt: "Large steel enclosure repositioning during the ADE Power project",
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/qRFhNUKzPyiRdmyi.webp",
    alt: "MEWP access around a large enclosure during surface preparation",
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/ZUwTxZIMbTEGQoUz.webp",
    alt: "Prepared internal fabricated steel enclosure surfaces",
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/zULLjZPZZAaKQBHU.webp",
    alt: "Marine CX primed enclosure side elevation",
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/hrJEsYLsHsRvKhBg.webp",
    alt: "Primed ADE Power enclosure prepared for lifting and flipping",
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/CcIOWAfYKSLpjzql.webp",
    alt: "Large ADE Power enclosure lifting operation in Wakefield",
  },
];

const processSteps = [
  {
    icon: ClipboardCheck,
    title: "Specification review",
    text: "We begin with the asset, access requirements and coating specification, so the preparation work is aligned with the required protective system and handover point.",
  },
  {
    icon: Layers3,
    title: "Controlled blast cleaning",
    text: "The team removes corrosion, scale and unsuitable coatings while preparing fabricated steelwork for the specified primer and subsequent coating stages.",
  },
  {
    icon: Gauge,
    title: "Profile and condition checks",
    text: "Surface condition and profile requirements are considered before primer application, with the agreed specification guiding the preparation standard.",
  },
  {
    icon: ShieldCheck,
    title: "Primer-ready handover",
    text: "Once blast cleaning is complete, the prepared substrate is ready for the specified primer system and the next manufacturing or coating phase.",
  },
];

const faqs = [
  {
    question: "What does Marine CX mean?",
    answer: "CX is the extreme atmospheric corrosivity category used within ISO 12944 for particularly severe environments, including offshore areas with high salinity and industrial locations with extreme humidity and aggressive atmospheres. The exact coating system, preparation grade and inspection requirements must always follow the project specification.",
  },
  {
    question: "Why is surface preparation important before Marine CX priming?",
    answer: "Protective coatings depend on a sound, suitably prepared substrate. Removing corrosion, scale and unsuitable coatings, then preparing the steel to the required specification, gives the primer system the correct base for adhesion and long-term protection.",
  },
  {
    question: "Can large fabricated enclosures be prepared before lifting or flipping?",
    answer: "Yes. Large fabricated units can be prepared in planned stages, coordinating access equipment, lifting operations and the coating sequence so the next manufacturing phase can proceed efficiently.",
  },
];

export default function MarineCXSurfacePreparation() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Marine CX Surface Preparation | Shot Blasting for Extreme Corrosivity</title>
        <meta
          name="description"
          content="Marine CX surface preparation for fabricated steel and industrial enclosures. See Premier Blasting's ADE Power case study in Wakefield, WF9."
        />
        <link rel="canonical" href="https://commercialshotblasting.co.uk/marine-cx-surface-preparation" />
        <meta property="og:title" content="Marine CX Surface Preparation | Commercial Shot Blasting" />
        <meta
          property="og:description"
          content="Surface preparation for severe marine and industrial corrosion environments, including the ADE Power enclosure case study in Wakefield."
        />
        <meta property="og:image" content={images[0].src} />
      </Helmet>
      <FAQSchema faqs={faqs} />

      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "Marine", href: "/industries/marine" },
          { label: "Marine CX Surface Preparation", href: "/marine-cx-surface-preparation", isCurrentPage: true },
        ]}
        className="container mt-4"
      />

      <section className="relative overflow-hidden bg-[#17384d] text-white">
        <div className="absolute inset-0">
          <img
            src={images[0].src}
            alt=""
            className="h-full w-full object-cover opacity-25"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#102b3d] via-[#17384d]/90 to-[#17384d]/60" />
        </div>
        <div className="container relative z-10 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#c8e4ef]">
              <Anchor className="h-5 w-5" />
              Marine & severe-environment coating preparation
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Marine CX Surface Preparation
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
              Shot blasting and primer-ready surface preparation for fabricated steelwork, industrial enclosures and assets specified for severe marine or aggressive industrial environments.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setQuotePopupOpen(true)}
                className="rounded-lg bg-white px-7 py-3 font-semibold text-[#17384d] transition hover:bg-[#f4f0e5]"
              >
                Discuss Your Specification
              </button>
              <a
                href="tel:07970566409"
                className="flex items-center gap-2 rounded-lg border-2 border-white px-7 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                07970 566409
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e8] py-16 md:py-20">
        <div className="container grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#2c5f7f]">Understanding the requirement</p>
            <h2 className="mb-6 text-3xl font-bold text-[#24313b] md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Preparation has to match the environment and coating system
            </h2>
            <p className="mb-5 leading-relaxed text-slate-700">
              ISO 12944 identifies CX as an extreme atmospheric corrosivity category. It is used for exceptionally demanding exposure conditions, such as offshore zones with high salinity or industrial locations with extreme humidity and aggressive atmospheres.
            </p>
            <p className="leading-relaxed text-slate-700">
              The correct process is not a one-size-fits-all claim. Surface preparation, primer selection, coating build and inspection need to follow the project’s confirmed specification. Our role is to prepare the steel substrate properly and hand it over ready for the agreed protective system.
            </p>
          </div>
          <aside className="rounded-2xl border border-[#2c5f7f]/10 bg-white p-8 shadow-sm">
            <Droplets className="mb-5 h-10 w-10 text-[#2c5f7f]" />
            <h3 className="mb-4 text-2xl font-bold text-[#24313b]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Planned around the full coating journey
            </h3>
            <ul className="space-y-3 text-slate-700">
              {[
                "Fabricated steel, enclosures and structural components",
                "Blast cleaning and surface profiling to the specified requirement",
                "Primer-ready or primed handover for the next coating phase",
                "Coordinated access and lifting around large or difficult assets",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[#2c5f7f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#2c5f7f]">Our approach</p>
            <h2 className="mb-4 text-3xl font-bold text-[#24313b] md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              A practical workflow for major steelwork
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Every project is shaped around the asset, the required coating specification, access and the next operation in the manufacturing or maintenance programme.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#2c5f7f]/10 text-[#2c5f7f]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-semibold text-slate-400">0{index + 1}</span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-[#24313b]">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{step.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#17384d] py-16 text-white md:py-20">
        <div className="container grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div className="overflow-hidden rounded-2xl bg-black/10 shadow-2xl">
            <img
              src={images[1].src}
              alt="ADE Power enclosure lifted after Marine CX surface preparation"
              className="aspect-[4/5] h-full w-full object-cover lg:aspect-[4/3]"
              loading="lazy"
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#c8e4ef]">Featured case study</p>
            <h2 className="mb-5 text-3xl font-bold md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              ADE Power: large enclosure surface preparation in Wakefield
            </h2>
            <p className="mb-5 text-lg leading-relaxed text-white/90">
              At ADE Power in Wakefield, WF9, Premier Blasting prepared large fabricated steel enclosures for the next phase of their build programme. The enclosures were blast cleaned and primed to the specified Marine CX standard before lifting and flipping operations began.
            </p>
            <p className="mb-8 leading-relaxed text-white/80">
              The work required a planned approach around large enclosure geometry, internal and external steel surfaces, mobile access equipment and the lift sequence. The result was a prepared, primed enclosure ready to move into the next stage of manufacture.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Location", "Wakefield, WF9"],
                ["Asset", "Large enclosures"],
                ["Scope", "Blast & prime"],
                ["Handover", "Ready to flip"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-white/15 bg-white/10 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#c8e4ef]">{label}</div>
                  <div className="mt-1 font-semibold text-white">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#2c5f7f]">Project gallery</p>
              <h2 className="text-3xl font-bold text-[#24313b] md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                ADE Power enclosure preparation
              </h2>
            </div>
            <Link href="/industries/marine" className="inline-flex items-center gap-2 font-semibold text-[#2c5f7f] transition hover:gap-3">
              Back to Marine services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {images.map((image, index) => (
              <figure key={image.src} className={`overflow-hidden rounded-xl bg-slate-100 ${index === 0 ? "col-span-2 row-span-2" : ""}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e8] py-16 md:py-20">
        <div className="container max-w-4xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#2c5f7f]">Marine CX FAQs</p>
            <h2 className="text-3xl font-bold text-[#24313b] md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold text-[#24313b]">{faq.question}</h3>
                <p className="leading-relaxed text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#2c5f7f] py-16 text-white md:py-20">
        <div className="container text-center">
          <h2 className="mb-5 text-3xl font-bold md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            Planning a severe-environment coating project?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
            Tell us about the steelwork, access constraints, current condition and protective coating specification. We will help plan the right surface-preparation stage.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setQuotePopupOpen(true)}
              className="rounded-lg bg-white px-7 py-3 font-semibold text-[#2c5f7f] transition hover:bg-[#f4f0e5]"
            >
              Request a Site Survey
            </button>
            <a
              href="tel:07970566409"
              className="flex items-center gap-2 rounded-lg border-2 border-white px-7 py-3 font-semibold transition hover:bg-white/10"
            >
              <Phone className="h-5 w-5" />
              07970 566409
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
      <BackToTop />
    </div>
  );
}
