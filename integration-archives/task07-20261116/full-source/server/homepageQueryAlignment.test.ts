import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { injectMetaTags } from "./metaTags";
import { resolveRouteMetadata } from "../shared/routeMetadata";

const root = resolve(import.meta.dirname, "..");
const homePage = readFileSync(resolve(root, "client/src/pages/Home.tsx"), "utf8");
const baseHtml = "<html><head><title>Initial</title></head><body><!--SSR_CONTENT--></body></html>";
const heroIntroduction = "End-to-end shot blasting and painting for major commercial and industrial projects nationwide. Our mobile teams prepare and coat your steelwork on site — CHAS Elite, fully insured, with full RAMS.";

describe("controlled homepage query alignment", () => {
  it("aligns the visible homepage with commercial shot blasting services intent", () => {
    expect(resolveRouteMetadata("/").title).toBe("Commercial Shot Blasting Services | Nationwide");
    expect(homePage).toContain(heroIntroduction);
    expect(homePage).toContain("Commercial Shot Blasting Services for Industrial Projects Across The UK");
  });

  it("uses one concise advert-aligned introduction in both visible and crawler content", async () => {
    const html = await injectMetaTags(baseHtml, "/");
    const visibleIntroduction = homePage.match(/<\/h1>\s*<p[^>]*>\s*([^<]+)\s*<\/p>/)?.[1].trim();
    expect(visibleIntroduction).toBe(heroIntroduction);
    expect(html).toContain(`<p>${heroIntroduction}</p>`);
    expect(homePage.split(heroIntroduction)).toHaveLength(2);
    expect(html.split(heroIntroduction)).toHaveLength(2);
    expect(heroIntroduction.split(/\s+/).length).toBeLessThanOrEqual(35);
    expect(homePage).not.toContain("We bring our equipment to you — removing rust, mill scale, paint");
  });

  it("keeps title, description, social metadata and crawler copy aligned", async () => {
    const html = await injectMetaTags(baseHtml, "/");
    expect(html).toContain("Commercial Shot Blasting Services | Nationwide");
    expect(html).toContain(resolveRouteMetadata("/").description);
    expect(resolveRouteMetadata("/").description).toBe("Nationwide commercial shot blasting services for metal surface preparation, rust and coating removal, structural steel, cladding, containers and plant. Get in touch.");
    expect(html).toContain("<h1>Commercial Shot Blasting Services in the UK</h1>");
    expect(html).toContain('href="https://commercialshotblasting.co.uk/contact">Get In Touch</a>');
    expect(html).not.toContain("Commercial Shot Blasting &amp; Sandblasting | England &amp; Wales | Commercial Shot Blasting");
  });

  it("keeps homepage structured data factual, visible-aligned and nationwide", async () => {
    const html = await injectMetaTags(baseHtml, "/");
    expect(html).toContain('"@type":"Organization"');
    expect(html).toContain('"@type":"Service"');
    expect(html).toContain('"name":"United Kingdom"');
    expect(html).not.toContain('"@type":"FAQPage"');
    expect(html).not.toContain('"@type":"VideoObject"');
    expect(html).not.toContain('"name":"England"');
    expect(html).not.toContain('"name":"Wales"');
    expect(html).not.toContain("SA2.5");
    expect(html).not.toContain("free-site-survey");
  });

  it("keeps the 21-to-28-day review window documented", () => {
    const log = readFileSync(resolve(root, "docs/homepage-query-alignment-2026-10-06.md"), "utf8");
    expect(log).toContain("2026-10-27");
    expect(log).toContain("2026-11-03");
    expect(log).toContain("Do not make further homepage title changes before review.");
  });
});
