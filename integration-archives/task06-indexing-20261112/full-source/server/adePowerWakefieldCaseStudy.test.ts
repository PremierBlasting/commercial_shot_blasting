import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { injectMetaTags } from "./metaTags";
import { adePowerWakefieldProject } from "@shared/adePowerWakefieldProject";
import { caseStudyProofUnits } from "@shared/caseStudyProofUnits";

const baseHtml = `<!doctype html><html><head><title>Commercial Shot Blasting</title><meta name="description" content="Initial description" /><meta property="og:title" content="Initial title" /><meta property="og:description" content="Initial description" /><meta property="og:url" content="https://commercialshotblasting.co.uk/" /><meta property="og:image" content="https://commercialshotblasting.co.uk/placeholder.jpg" /></head><body><!--SSR_CONTENT--></body></html>`;
const projectRoot = resolve(import.meta.dirname, "..");
const path = "/case-studies/ade-power-wakefield-marine-cx-enclosures";

describe("ADE Power Wakefield Marine CX project record", () => {
  it("renders a canonical, indexable and carefully bounded project record for crawlers", async () => {
    const html = await injectMetaTags(baseHtml, path);

    expect(html).toContain(`<link rel="canonical" href="https://commercialshotblasting.co.uk${path}"`);
    expect(html).toContain("ADE Power Wakefield — Marine CX Enclosure Preparation");
    expect(html).toContain("Wakefield, WF9");
    expect(html).toContain("large enclosures");
    expect(html).toContain("blasted and primed to the stated Marine CX standard");
    expect(html).toContain("current flipping stage");
    expect(html).toContain("Large commercial enclosure preparation");
    expect(html).toContain("Why Marine CX preparation matters");
    expect(html).toContain("not simply a thicker coat of paint");
    expect(html).toContain("controlled microscopic anchor profile");
    expect(html).toContain("Planning Marine CX blasting for a major asset");
    expect(html).not.toContain("Claim boundary");
    expect(html).not.toContain("This record does not state a final coating product");
    expect(html).toContain("BreadcrumbList");
    expect(html).toContain("Article");
    expect(html).toContain("ImageObject");
    expect(html).toContain("VideoObject");
    expect(html).toContain("ade-power-wakefield-enclosure-movement_72e7662d.mp4");
    expect(html).toContain("ade-power-wakefield-enclosure-flip_e8bc8625.mp4");
    expect(html).not.toContain('name="robots" content="noindex');
  });

  it("uses only the supplied project record and connects each requested discovery surface", () => {
    const app = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
    const page = readFileSync(resolve(projectRoot, "client/src/pages/AdePowerWakefieldCaseStudy.tsx"), "utf8");
    const work = readFileSync(resolve(projectRoot, "client/src/pages/OurWork.tsx"), "utf8");
    const marineIndustry = readFileSync(resolve(projectRoot, "client/src/pages/MarineIndustry.tsx"), "utf8");
    const marineCx = readFileSync(resolve(projectRoot, "client/src/pages/MarineCxSurfacePreparationPage.tsx"), "utf8");
    const marineShot = readFileSync(resolve(projectRoot, "client/src/pages/ServiceDetail.tsx"), "utf8");
    const marineServiceData = readFileSync(resolve(projectRoot, "client/src/data/services.ts"), "utf8");
    const sitemap = readFileSync(resolve(projectRoot, "shared/sitemapPolicy.ts"), "utf8");
    const htmlSitemap = readFileSync(resolve(projectRoot, "client/src/pages/SitemapPage.tsx"), "utf8");

    expect(app).toContain('path={"/case-studies/ade-power-wakefield-marine-cx-enclosures"}');
    expect(adePowerWakefieldProject.status).toBe("Project update — in progress");
    expect(page).toContain("blasted and primed to the stated Marine CX standard");
    expect(page).toContain("The enclosures are now being flipped");
    expect(page).toContain("More project updates will be added as the work progresses");
    expect(page).toContain("Plan the blasting package around the whole project, not just the surface");
    expect(page).toContain("The finish starts with a controlled surface, not simply a thicker coat of paint.");
    expect(page).toContain("The coating system may use several layers and a defined total dry-film build");
    expect(page).toContain("controlled microscopic anchor profile");
    expect(page).not.toContain("This is an in-progress case-study record");
    expect(page).not.toContain("Claim boundary");
    expect(page).toContain("adePowerWakefieldProject.media.movementVideo");
    expect(page).toContain("adePowerWakefieldProject.media.flipVideo");
    expect(marineShot).toContain('service.id === "marine-shot-blasting"');
    expect(marineShot).toContain("ADE Power — Marine CX enclosure preparation");
    expect(marineShot).toContain("Marine CX enclosure preparation in progress");
    expect(marineShot).toContain("adePowerWakefieldProject.media.movementVideo");
    expect(marineServiceData).toContain('id: "marine-shot-blasting"');
    expect(marineServiceData).toContain("ade-power-wakefield-marine-cx-hero_0d533b36.webp");
    expect(adePowerWakefieldProject.media.movementVideo).toContain("ade-power-wakefield-enclosure-movement_72e7662d.mp4");
    expect(adePowerWakefieldProject.media.flipVideo).toContain("ade-power-wakefield-enclosure-flip_e8bc8625.mp4");
    expect(page).not.toContain("Sa 2.5");
    expect(work).toContain("ADE Power — Marine CX enclosure preparation");
    expect(work).toContain("marineFilterCards");
    expect(marineIndustry).toContain("ADE Power — Marine CX enclosure preparation");
    expect(marineCx).toContain("ADE Power: large enclosure blasting for the stated Marine CX standard");
    expect(sitemap).toContain('{ loc: "/case-studies/ade-power-wakefield-marine-cx-enclosures"');
    expect(htmlSitemap).toContain('href: "/case-studies/ade-power-wakefield-marine-cx-enclosures"');
  });

  it("features the ADE Power project on the Marine Shot Blasting service page", async () => {
    const html = await injectMetaTags(baseHtml, "/services/marine-shot-blasting");

    expect(html).toContain("Commercial Marine Shot Blasting");
    expect(html).toContain("ADE Power Wakefield — large enclosure Marine CX preparation");
    expect(html).toContain("blasted and primed to the stated Marine CX standard");
    expect(html).toContain("are now being flipped");
    expect(html).toContain('href="https://commercialshotblasting.co.uk/case-studies/ade-power-wakefield-marine-cx-enclosures"');
    expect(html).toContain('href="https://commercialshotblasting.co.uk/services/marine-cx-surface-preparation"');
    expect(html).not.toContain("Claim boundary");
  });

  it("keeps the shared fact record deliberately within the supplied evidence", () => {
    const facts = caseStudyProofUnits["ade-power-wakefield-marine-cx"].facts.map((fact) => fact.value).join(" ");
    expect(adePowerWakefieldProject.location).toBe("Wakefield, WF9");
    expect(facts).toContain("Large enclosures");
    expect(facts).toContain("blasted and primed to the stated Marine CX standard");
    expect(facts).toContain("being flipped");
    expect(facts).toContain("Supplied site images and footage");
    expect(facts).not.toContain("Sa 2.5");
  });
});
