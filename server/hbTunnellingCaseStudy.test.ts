import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { injectMetaTags } from "./metaTags";

const baseHtml = `<!doctype html><html><head><title>Commercial Shot Blasting</title><meta name="description" content="Initial description" /><meta property="og:title" content="Initial title" /><meta property="og:description" content="Initial description" /><meta property="og:url" content="https://commercialshotblasting.co.uk/" /><meta property="og:image" content="https://commercialshotblasting.co.uk/placeholder.jpg" /></head><body><!--SSR_CONTENT--></body></html>`;
const projectRoot = resolve(import.meta.dirname, "..");

describe("HB Tunnelling Doncaster campaign case study", () => {
  it("renders a canonical, video-led, evidence-based case-study page for crawlers", async () => {
    const html = await injectMetaTags(baseHtml, "/case-studies/hb-tunnelling-doncaster");

    expect(html).toContain('<link rel="canonical" href="https://commercialshotblasting.co.uk/case-studies/hb-tunnelling-doncaster"');
    expect(html).toContain("HB Tunnelling Doncaster: Rapid End-to-End Blasting and Intumescent Painting");
    expect(html).toContain("£150,000");
    expect(html).toContain("six-week programme");
    expect(html).toContain("primer was applied straight after abrasive blasting");
    expect(html).toContain("five-person multi-skilled team");
    expect(html).toContain("one-stop delivery for the warehouse steelwork");
    expect(html).toContain("completing each section within a single day");
    expect(html).toContain("prevent surface contamination or deterioration that could compromise coating adhesion");
    expect(html).toContain("What we delivered: carefully planned same-day stages");
    expect(html).toContain("Continuous progress through to intumescent fire protection");
    expect(html).toContain("VideoObject");
    expect(html).toContain("BreadcrumbList");
    expect(html).toContain("hb-tunnelling-doncaster-surface-preparation_0f209a96.mp4");
    expect(html).toContain("wa.me/447970566409");
  });

  it("uses approved video-derived assets, campaign CTAs, and discoverable site pathways", () => {
    const app = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
    const page = readFileSync(resolve(projectRoot, "client/src/pages/HBTunnellingCaseStudy.tsx"), "utf8");
    const serviceDetail = readFileSync(resolve(projectRoot, "client/src/pages/ServiceDetail.tsx"), "utf8");
    const home = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
    const leadForm = readFileSync(resolve(projectRoot, "client/src/components/LeadForm.tsx"), "utf8");
    const testimonial = readFileSync(resolve(projectRoot, "client/src/components/HBTunnellingTestimonial.tsx"), "utf8");
    const scrollReveal = readFileSync(resolve(projectRoot, "client/src/hooks/useScrollReveal.ts"), "utf8");
    const surveyFlow = readFileSync(resolve(projectRoot, "client/src/components/SurveyBookingFlow.tsx"), "utf8");
    const work = readFileSync(resolve(projectRoot, "client/src/pages/OurWork.tsx"), "utf8");
    const xmlSitemap = readFileSync(resolve(projectRoot, "server/sitemap.ts"), "utf8");
    const htmlSitemap = readFileSync(resolve(projectRoot, "client/src/pages/SitemapPage.tsx"), "utf8");

    expect(app).toContain('path={"/case-studies/hb-tunnelling-doncaster"}');
    expect(page).toContain("hb-tunnelling-doncaster-surface-preparation_0f209a96.mp4");
    expect(page).toContain("hb-tunnelling-video-still-01_a5275ae9.webp");
    expect(page).toContain("hb-tunnelling-video-still-25_e27be683.webp");
    expect(page).toContain("Request A Site Visit");
    expect(page).toContain("wa.me/447970566409");
    expect(page).not.toContain("Screenshot2026-08-28");
    expect(page).not.toContain("The supplied project record");
    expect(page).not.toContain("Supplied footage");
    expect(page).toContain("Need rapid blasting and protective coating under one delivery plan?");
    expect(page).toContain("HB Tunnelling needed a one-stop solution for the warehouse steelwork");
    expect(page).toContain("A five-person multi-skilled team");
    expect(page).toContain("Delivered one end-to-end blast-and-coat scope");
    expect(page).toContain("Applied the intumescent fire-protection coating");
    expect(page).toContain('<HBTunnellingTestimonial variant="case-study" />');
    expect(serviceDetail).toContain("See rapid blasting and intumescent coating delivered as one coordinated scope.");
    expect(serviceDetail).toContain('/case-studies/hb-tunnelling-doncaster');
    expect(serviceDetail).toContain("hb-tunnelling-doncaster-surface-preparation_0f209a96.mp4");
    expect(serviceDetail).toContain("Surface preparation and fire protection delivered under one coordinated plan.");
    expect(serviceDetail).toContain('<HBTunnellingTestimonial variant="service" />');
    expect(serviceDetail).toContain("HB Tunnelling client feedback");
    expect(serviceDetail).toContain("They mobilised a large team and completed a substantial scope of work");
    expect(serviceDetail).toContain("— Mark McGeady, HB Tunnelling Limited");
    expect(serviceDetail).toContain("hb-tunnelling-logo-official_1acf5938.png");
    expect(surveyFlow).toContain("End-to-End Blasting & Intumescent Coating");
    expect(home).toContain('displayTestimonials[0].rating > 0');
    expect(home).toContain("Client testimonial");
    expect(leadForm).toContain('<HBTunnellingTestimonial variant="confirmation" />');
    expect(testimonial).toContain("trpc.testimonials.list.useQuery()");
    expect(testimonial).toContain('item.company === "HB Tunnelling Limited"');
    expect(testimonial).toContain("testimonial.text");
    expect(testimonial).toContain("HB Tunnelling logo");
    expect(testimonial).toContain("<ScrollReveal");
    expect(scrollReveal).toContain("prefers-reduced-motion: reduce");
    expect(work).toContain('/case-studies/hb-tunnelling-doncaster');
    expect(xmlSitemap).toContain('{ loc: "/case-studies/hb-tunnelling-doncaster"');
    expect(htmlSitemap).toContain('{ href: "/case-studies/hb-tunnelling-doncaster"');
  });

  it("links Structural Steel Frames crawler content to the end-to-end HB Tunnelling project evidence", async () => {
    const html = await injectMetaTags(baseHtml, "/services/structural-steel-frames");

    expect(html).toContain("End-to-end blasting and intumescent coating project evidence");
    expect(html).toContain("View the HB Tunnelling Doncaster end-to-end delivery case study");
    expect(html).toContain('/case-studies/hb-tunnelling-doncaster');

    const intumescentHtml = await injectMetaTags(baseHtml, "/services/intumescent-painting");
    expect(intumescentHtml).toContain("End-to-end blasting and intumescent coating project evidence");
    expect(intumescentHtml).toContain("HB Tunnelling Doncaster end-to-end delivery case study");
  });
});
