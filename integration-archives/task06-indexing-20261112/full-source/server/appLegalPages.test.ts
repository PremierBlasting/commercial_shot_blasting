import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { injectMetaTags } from "./metaTags";
import { escapeLegalHtml, injectAppLegalPage, renderLegalSections } from "./appLegalPages";
import { ADS_APP_NAME, ADS_APP_OPERATOR, googleAdsPrivacySections, googleAdsTermsSections } from "../shared/googleAdsAppLegal";
import { websitePrivacySections } from "../shared/privacyPolicyContent";

const template = `<!doctype html><html><head><title>Old title</title><link rel="canonical" href="https://commercialshotblasting.co.uk/"/><meta name="description" content="Old description"/><meta name="robots" content="index,follow"/><meta property="og:url" content="https://commercialshotblasting.co.uk/"/></head><body><!--SSR_CONTENT--><div id="root"></div></body></html>`;
const source = (path: string) => readFileSync(path, "utf8");

describe("Google Ads app pre-launch legal pages", () => {
  it.each(["/privacy-policy", "/privacy-policy/", "/terms-of-service", "/terms-of-service/", "/privacy-policy?utm_source=adwords&gclid=test", "/terms-of-service/?ref=test"])("serves full unauthenticated legal HTML for %s with one canonical and robots directive", async (path) => {
    const html = await injectMetaTags(template, path);
    const canonical = `https://commercialshotblasting.co.uk${path.split("?")[0].replace(/\/$/, "")}`;
    expect(html.match(/<link rel="canonical"/g)).toHaveLength(1);
    expect(html).toContain(`href="${canonical}"`);
    expect(html.match(/<meta name="description"/g)).toHaveLength(1);
    expect(html.match(/<meta name="robots"/g)).toHaveLength(1);
    expect(html).toContain('content="noindex, follow"');
    expect(html).toContain(ADS_APP_NAME);
    expect(html).toContain(ADS_APP_OPERATOR);
    expect(html).toContain("Pre-launch");
    const isPrivacy = path.startsWith("/privacy-policy");
    expect(html).toContain(isPrivacy ? "11 November 2026" : "5 November 2026");
    expect(html).not.toContain("Premier Blasting Ltd");
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]));
    expect(schemas.filter((schema) => schema["@type"] === "WebPage")).toHaveLength(1);
    expect(schemas.find((schema) => schema["@type"] === "WebPage").url).toBe(canonical);
    expect(schemas.find((schema) => schema["@type"] === "WebPage").dateModified).toBe(isPrivacy ? "2026-11-11" : "2026-11-05");
    expect(schemas.find((schema) => schema["@type"] === "BreadcrumbList").itemListElement.at(-1).item).toBe(canonical);
    expect(schemas.some((schema) => schema["@type"] === "SoftwareApplication")).toBe(false);
  });

  it("uses every shared website and Google privacy section in crawler HTML", () => {
    const html = injectAppLegalPage(template, "/privacy-policy")!;
    for (const section of [...websitePrivacySections, ...googleAdsPrivacySections]) {
      expect(html).toContain(escapeLegalHtml(section.heading));
      for (const text of section.paragraphs) expect(html).toContain(escapeLegalHtml(text));
    }
    const browser = source("client/src/pages/PrivacyPolicy.tsx");
    expect(browser).toContain("websitePrivacySections");
    expect(browser).toContain("googleAdsPrivacySections");
    expect(html).toContain("site postcode");
    expect(html).toContain("optional");
  });

  it("uses the complete shared app terms without replacing commercial work terms", () => {
    const html = injectAppLegalPage(template, "/terms-of-service")!;
    for (const section of googleAdsTermsSections) {
      expect(html).toContain(escapeLegalHtml(section.heading));
      for (const text of section.paragraphs) expect(html).toContain(escapeLegalHtml(text));
    }
    expect(html).toContain("They do not replace or change the terms of any commercial shot blasting");
    expect(html).toContain('href="/privacy-policy#google-ads-app"');
    const app = source("client/src/App.tsx");
    expect(app).toContain('path="/terms-of-service" component={AdsAppTermsOfService}');
    expect(app).toContain('path="/terms" component={Terms}');
    expect(source("client/src/pages/AdsAppTermsOfService.tsx")).toContain("googleAdsTermsSections");
    expect(source("client/src/components/Footer.tsx")).toContain('href="/terms-of-service"');
  });

  it("does not describe unfinished Google data processing as operational", () => {
    const privacy = googleAdsPrivacySections.flatMap((section) => section.paragraphs).join(" ");
    expect(privacy).toContain("does not currently access, collect, store or share Google user data");
    expect(privacy).toContain("have not yet been selected or implemented");
    expect(privacy).toContain("is not a read-only scope");
    expect(privacy).toContain("not a retention schedule for Google Ads data");
    expect(privacy).toContain("does not automatically delete copies");
    expect(privacy).toContain("Limited Use requirements where applicable");
    expect(privacy).toContain("not a certification");
    expect(privacy).toContain("not part of this proposed application");
    expect(privacy).not.toContain("we store your Google data securely");
  });

  it("escapes legal content and rejects unsafe link protocols", () => {
    const html = renderLegalSections([{ id: 'x"', heading: "<h> & 'x'", paragraphs: ['<script>alert("x")</script>'], links: [{ label: "<unsafe>", href: "javascript:alert(1)" }] }]);
    expect(html).toContain("&lt;h&gt; &amp; &#39;x&#39;");
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("javascript:");
    expect(html).toContain('href="#"');
    expect(injectAppLegalPage(template, "/services/intumescent-painting")).toBeUndefined();
    expect(injectAppLegalPage(template, "/terms")).toBeUndefined();
  });
});
