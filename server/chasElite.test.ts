import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { injectMetaTags } from "./metaTags";

const baseHtml = `<!doctype html><html><head><title>Commercial Shot Blasting</title><meta name="description" content="Initial description" /><meta property="og:title" content="Initial title" /><meta property="og:description" content="Initial description" /><meta property="og:url" content="https://commercialshotblasting.co.uk/" /></head><body><!--SSR_CONTENT--></body></html>`;
const projectRoot = resolve(import.meta.dirname, "..");

describe("CHAS Elite assurance pathway", () => {
  it("renders a canonical, evidence-led CHAS Elite assurance page for crawlers", async () => {
    const html = await injectMetaTags(baseHtml, "/chas-elite");

    expect(html).toContain("<link rel=\"canonical\" href=\"https://commercialshotblasting.co.uk/chas-elite\"");
    expect(html).toContain("Commercial Shot Blasting is the commercial shot blasting arm of Premier Blasting");
    expect(html).toContain("Premier Blasting holds CHAS Elite status");
    expect(html).toContain("CHAS Elite does not replace a project-specific assessment");
    expect(html).toContain("FAQPage");
    expect(html).toContain("contact?request=capability-statement");
  });

  it("exposes the assurance route in application, navigation, and both sitemap discovery paths", () => {
    const app = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
    const header = readFileSync(resolve(projectRoot, "client/src/components/Header.tsx"), "utf8");
    const footer = readFileSync(resolve(projectRoot, "client/src/components/Footer.tsx"), "utf8");
    const home = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
    const xmlSitemap = readFileSync(resolve(projectRoot, "server/sitemap.ts"), "utf8");
    const htmlSitemap = readFileSync(resolve(projectRoot, "client/src/pages/SitemapPage.tsx"), "utf8");

    expect(app).toContain('path={"/chas-elite"}');
    expect(header).toContain("CHAS Elite Assurance");
    expect(footer).toContain("CHAS Elite Assurance");
    expect(home).toContain('/manus-storage/chas-elite-accreditation_29937620.png');
    expect(home).toContain('alt="CHAS Accreditation Elite logo"');
    expect(xmlSitemap).toContain('{ loc: "/chas-elite"');
    expect(htmlSitemap).toContain('{ href: "/chas-elite", label: "CHAS Elite Assurance" }');
  });

  it("preserves capability-statement requests in the existing lead-summary pathway", () => {
    const leadForm = readFileSync(resolve(projectRoot, "client/src/components/LeadForm.tsx"), "utf8");
    const contact = readFileSync(resolve(projectRoot, "client/src/pages/Contact.tsx"), "utf8");

    expect(leadForm).toContain("capabilityStatementRequest?: boolean");
    expect(leadForm).toContain("Request: Commercial Shot Blasting capability statement");
    expect(contact).toContain('get("request") === "capability-statement"');
    expect(contact).toContain("capabilityStatementRequest={capabilityStatementRequest}");
  });
});
