import { describe, expect, it, vi } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import { HOMEPAGE_CUSTOMER_COPY } from "../shared/homepageCustomerCopy";
import { HOMEPAGE_FAQS, homepageFAQSchema } from "../shared/homepageFAQs";
import { injectMetaTags } from "./metaTags";
import { getRouteMetadataTags, resolveRouteMetadata, serializeRouteMetadataHead } from "../shared/routeMetadata";

const root = resolve(import.meta.dirname, "..");
const source = (file: string) => readFileSync(resolve(root, file), "utf8");
const sha256 = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");
const home = source("client/src/pages/Home.tsx");
const caseStudies = source("client/src/components/CaseStudies.tsx");

function sliceBetween(text: string, start: string, end: string) {
  const first = text.indexOf(start);
  const last = text.indexOf(end, first + start.length);
  expect(first, `Missing protected slice start: ${start}`).toBeGreaterThanOrEqual(0);
  expect(last, `Missing protected slice end: ${end}`).toBeGreaterThan(first);
  return text.slice(first, last);
}

function stringValues(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (value && typeof value === "object") return Object.values(value).flatMap(stringValues);
  return [];
}

function plainText(html: string) {
  const entities: Record<string, string> = {
    "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"',
    "&#x27;": "'", "&#39;": "'", "&apos;": "'", "&nbsp;": " ",
  };
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&(?:amp|lt|gt|quot|apos|nbsp|#x27|#39);/g, entity => entities[entity]);
}

// The fixed hashes were captured from the pre-refresh HEAD; the hero hash is
// from the explicitly protected hero snapshot (including whitespace). Neither
// Git nor the external snapshot is required when this test ships or runs in CI.
const protectedDependencies = {
  // LeadForm and analytics were explicitly authorised for the later CSB
  // measurement repair; behavioural contract tests cover them independently.
  "client/src/components/Header.tsx": "d1230152b1e6acca8cf503297be81d897761b9169a183e3af5356dda059d8fe6",
  // utm.ts is separately authorised for the 7 November campaign/ID upgrade.
  // csbCampaignAttribution tests retain paid first/last-touch semantics.
  "shared/homepageIntumescentService.ts": "95cca9bc3f5ac0579c0b1ce52193f55fad3a85e0af56302be016505da2eeceea",
  "client/src/components/CapabilityStatementDownload.tsx": "0e80e431232d0457428fe9eccad3c5c6654abf4263dc570db77f24d49e026f1d",
  "client/src/components/QuotePopup.tsx": "83d9244d5ade673cdec31fc2a21400e991513f0c847fc0c1ac1cbebdb2d115aa",
} as const;

const buyerValues = [
  ...stringValues(HOMEPAGE_CUSTOMER_COPY),
  ...HOMEPAGE_FAQS.flatMap(({ question, answer }) => [question, answer]),
  ...Array.from(caseStudies.matchAll(/(?:description|results): "([^"]*)"/g), match => match[1]),
  ...Array.from(home.matchAll(/desc: "([^"]*)"/g), match => match[1]),
];

describe("homepage buyer-language refresh scope", () => {
  it("keeps the entire protected hero and its media/proof constants byte-for-byte unchanged", () => {
    const hero = sliceBetween(home, "      {/* Hero Section */}", "      {/* Case Studies Section */}");
    expect(sha256(hero)).toBe("da2654707e4cdef809077ecdcaeea74cb3851dc1bde4fdcb7a25fd3e0e825900");
    const constants = sliceBetween(home, "const HOME_HERO_POSTER", "export default function Home()");
    expect(sha256(constants)).toBe("e667c9c03db677dfc8ebedbf8f682384398251a7b798001171bfa2b8250b7dc9");
  });

  it("preserves protected attribution, navigation, quotes and service dependencies", () => {
    // There was no heroShared.ts in the baseline; Home's inline hero constants
    // are protected above rather than silently skipping a dependency check.
    for (const [file, expected] of Object.entries(protectedDependencies)) {
      expect(sha256(readFileSync(resolve(root, file))), file).toBe(expected);
    }
  });

  it("preserves the exact fallback customer quote, review carousel and HB project film", () => {
    expect(sha256(sliceBetween(home, "const testimonials = [", "const HOME_HERO_POSTER")))
      .toBe("f516d657acee30f252d7ae53dfa4d09136d0d1c60bc297d6955fe5e373d7e809");
    const evidence = {
      "client/src/components/ReviewCarousel.tsx": "441968a38c518b96db4897b035b6e46578cc0874a2152db93b4295c8745edf4c",
      "client/src/components/HBTunnellingProjectFilm.tsx": "0e7f74e59aacd9fcb0171ea9d984377e376e132d39df384c6574f08f14364490",
      "shared/homepageHBTunnellingFilm.ts": "591054f1217fc64e03ec755011a724802dfe212aed8fe1c7d2dee66b5a82a3ee",
    };
    for (const [file, expected] of Object.entries(evidence)) {
      expect(sha256(readFileSync(resolve(root, file))), file).toBe(expected);
    }
    expect(home).toContain("text: item.text");
    expect(home).toContain("{displayTestimonials[0].text}");
    expect(home).toContain("{testimonial.text}");
  });

  it("preserves existing literal media/contact/service links and dynamic project interactions", () => {
    const baselineLinks = {
      "client/src/pages/Home.tsx": "6e34c7d0a3f449f584c3363122cdf07d118fd67348cf16290c3c7c3962e4dd41",
      "client/src/components/CaseStudies.tsx": "72a8a225e4c352cbecbde17c5b691efdfdc4c360c01085a831425045fcb7a096",
      "client/src/components/BlogPreview.tsx": "8caafe4386f958034d7ecffadb2d2282ffb1d275f330f13c1575e5a57bcc7b4b",
    };
    for (const [file, expected] of Object.entries(baselineLinks)) {
      const urls = [...new Set(Array.from(source(file).matchAll(/["']((?:https?:\/\/|\/|tel:|mailto:)[^"'\r\n]*)["']/g), match => match[1]))].sort();
      expect(sha256(urls.join("\n")), file).toBe(expected);
    }
    for (const retained of ["trpc.testimonials.list.useQuery()", "trpc.gallery.list.useQuery()", "<HBTunnellingProjectFilm />", "<StaticServiceAreasMap />", "<CompactSurveyCapture onStart={openSurveyWithDefaults}", "<QuotePopup", "setVisibleCount(v => v + 3)", "setSelectedProject("]) {
      expect(home).toContain(retained);
    }
    const blog = source("client/src/components/BlogPreview.tsx");
    for (const retained of ["trpc.blog.list.useQuery()", "href={`/blog/${post.slug}`}", "src={post.featuredImage}", "{post.title}", "{post.excerpt}"]) {
      expect(blog).toContain(retained);
    }
  });

  it("uses customer-facing wording rather than internal evidence and approval labels", () => {
    for (const copy of buyerValues) {
      expect(copy).not.toMatch(/project records?|supplied images?|approved\s+PDF|assurance pathway/i);
    }
    // Check the visible below-hero text as well, not comments, placement labels,
    // filenames or component names that legitimately retain internal language.
    const belowHero = home.slice(home.indexOf("      {/* Case Studies Section */}"));
    const visibleText = Array.from(belowHero.matchAll(/>([^<>{}\n]+)</g), match => match[1]).join(" ");
    expect(visibleText).not.toMatch(/project records?|supplied images?|approved\s+PDF|assurance pathway/i);
  });

  it("retains large commercial steelwork, joined-up blasting/coating and nationwide mobile capability", () => {
    const copy = buyerValues.join(" ");
    expect(copy).toMatch(/structural steel|steelwork/i);
    expect(copy).toMatch(/warehouse|industrial/i);
    expect(copy).toMatch(/blasting and (?:painting|coating)|blasting and coating together/i);
    expect(HOMEPAGE_CUSTOMER_COPY.coverage.heading).toContain("across the UK");
    expect(HOMEPAGE_CUSTOMER_COPY.coverage.intro).toMatch(/project.*UK/);
    expect(HOMEPAGE_FAQS[1].answer).toMatch(/mobile shot blasting teams travel across the UK/);
    expect(home).toContain("Nationwide Deployment");
    expect(home).toContain("HOMEPAGE_CUSTOMER_COPY.coverage.intro");
  });

  it("keeps factual project status and avoids universal blast-profile or risk-free promises", () => {
    const ade = sliceBetween(caseStudies, "    id: 104,", "    id: 2,");
    expect(ade).toContain('stageLabel: "In progress"');
    expect(ade).toContain('duration: "Project update"');
    expect(ade).not.toMatch(/completed|finished project/i);
    expect(caseStudies).toContain("Completed in 10 days, five days ahead of programme.");
    expect(caseStudies).toContain("6-week programme");
    const changedCopy = buyerValues.join(" ") + home.slice(home.indexOf("      {/* Case Studies Section */}"));
    expect(changedCopy).not.toMatch(/zero[ -]+handover[ -]+risk|single[ -]?pass|SA\s*2\.5\s*(?:and|&|\/|or)\s*(?:SA\s*)?3/i);
    expect(changedCopy).not.toMatch(/(?:universal|guaranteed|same)\s+(?:surface\s+)?profile|(?:every|all)\s+(?:coating|surface)s?[^.!?\n]{0,60}(?:same|uniform)\s+profile/i);
    expect(HOMEPAGE_FAQS[8].answer).toContain("Sa 2.5 describes blast cleanliness; surface profile is a separate requirement.");
    expect(HOMEPAGE_FAQS[5].answer).toContain("cleanliness and profile need to suit the coating specification");
  });

  it("derives all nine FAQ schema questions and plain answers from the same canonical data", () => {
    expect(HOMEPAGE_FAQS).toHaveLength(9);
    expect(new Set(HOMEPAGE_FAQS.map(faq => faq.question)).size).toBe(9);
    expect(homepageFAQSchema()).toEqual({
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: HOMEPAGE_FAQS.map(({ question, answer }) => ({
        "@type": "Question", name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    });
    for (const faq of HOMEPAGE_FAQS) {
      expect(faq.answer).not.toMatch(/<[^>]+>/);
      for (const link of faq.links) expect(faq.answer).toContain(link.label);
    }
  });

  it("renders each FAQ plain answer unchanged with its service/area links and matching JSON-LD", async () => {
    // The project's test transform uses classic JSX; supply React without
    // changing production components or mocking the real wouter links.
    vi.stubGlobal("React", React);
    try {
      const { default: HomeFAQ } = await import("../client/src/components/HomeFAQ");
      const html = renderToStaticMarkup(React.createElement(Router, { ssrPath: "/" }, React.createElement(HomeFAQ)));
      const text = plainText(html);
      for (const faq of HOMEPAGE_FAQS) {
        expect(text).toContain(faq.question);
        expect(text).toContain(faq.answer);
        for (const link of faq.links) expect(html).toContain(`href="${link.href}"`);
      }
      const schema = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
      expect(schema).not.toBeNull();
      expect(JSON.parse(schema![1])).toEqual(homepageFAQSchema());
      expect(html).toContain('href="/contact"');
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("mirrors shared buyer copy and all FAQ answers in raw homepage HTML without changing metadata", async () => {
    const html = await injectMetaTags("<html><head><title>Initial</title></head><body><!--SSR_CONTENT--></body></html>", "/");
    const text = plainText(html);
    for (const copy of Object.values(HOMEPAGE_CUSTOMER_COPY)) {
      for (const [field, value] of Object.entries(copy)) {
        if (["heading", "intro", "detail", "capabilityIntro"].includes(field)) expect(text).toContain(value);
      }
    }
    for (const faq of HOMEPAGE_FAQS) {
      expect(text).toContain(faq.question);
      expect(text).toContain(faq.answer);
    }
    const metadata = resolveRouteMetadata("/");
    expect(metadata).toEqual({
      pathname: "/",
      state: "ready",
      title: "Commercial Shot Blasting Services | Nationwide",
      description: "Nationwide commercial shot blasting services for metal surface preparation, rust and coating removal, structural steel, cladding, containers and plant. Get in touch.",
      canonical: "https://commercialshotblasting.co.uk/",
      robots: "index, follow, max-image-preview:large",
      keywords: "commercial shot blasting, commercial sandblasting, industrial shot blasting, metal shot blasting, surface preparation, steel blasting, rust removal, mobile blasting, abrasive blasting",
      author: null,
      ogImageSecureUrl: null,
      twitterSite: null,
      twitterCreator: null,
      ogTitle: "Commercial Shot Blasting Services | Nationwide",
      ogDescription: "Nationwide commercial shot blasting services for metal surface preparation, rust and coating removal, structural steel, cladding, containers and plant. Get in touch.",
      ogUrl: "https://commercialshotblasting.co.uk/",
      ogType: "website",
      ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/ATzSAikYtVvYiYkQ.svg",
      ogImageWidth: "1200",
      ogImageHeight: "630",
      ogImageType: null,
      ogImageAlt: null,
      ogLocale: "en_GB",
      ogSiteName: "Commercial Shot Blasting",
      twitterCard: "summary_large_image",
      twitterTitle: "Commercial Shot Blasting Services | Nationwide",
      twitterDescription: "Nationwide commercial shot blasting services for metal surface preparation, rust and coating removal, structural steel, cladding, containers and plant. Get in touch.",
      twitterUrl: null,
      twitterImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/ATzSAikYtVvYiYkQ.svg",
      twitterImageAlt: "Commercial shot blasting services for industrial and commercial projects nationwide",
      publishedAt: null,
      modifiedAt: null,
      articleAuthor: null,
      articleSection: null,
      articleTags: [],
      alternates: [
        { href: "https://commercialshotblasting.co.uk/", hreflang: "en-gb" },
        { href: "https://commercialshotblasting.co.uk/", hreflang: "en" },
      ],
    });
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
    expect(head).toBeDefined();
    expect(head).toContain(serializeRouteMetadataHead(metadata));
    expect(head!.match(/<title\b[^>]*>[\s\S]*?<\/title>/gi)).toEqual([`<title>${metadata.title}</title>`]);
    expect(head!.match(/<link\b[^>]*rel="canonical"[^>]*>/gi)).toEqual([
      '<link rel="canonical" href="https://commercialshotblasting.co.uk/" />',
    ]);
    const headMetaTags = head!.match(/<meta\b[^>]*>/gi) ?? [];
    for (const tag of getRouteMetadataTags(metadata)) {
      expect(headMetaTags.filter(value => value.includes(`${tag.attribute}="${tag.key}"`)), tag.key).toEqual([
        `<meta ${tag.attribute}="${tag.key}" content="${tag.value}" />`,
      ]);
    }
    expect(html).toContain('rel="canonical" href="https://commercialshotblasting.co.uk/"');
  });
});
