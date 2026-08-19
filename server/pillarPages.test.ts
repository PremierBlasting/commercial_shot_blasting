import { describe, expect, it } from "vitest";
import { injectMetaTags } from "./metaTags";
import { getTierAPillarResources } from "../shared/tierAPillarResources";

const baseHtml = `<!doctype html><html><head>
  <title>Commercial Shot Blasting</title>
  <meta name="description" content="Default description" />
  <meta property="og:title" content="Default title" />
  <meta property="og:description" content="Default description" />
  <meta property="og:url" content="https://commercialshotblasting.co.uk/" />
  <meta property="og:image" content="https://commercialshotblasting.co.uk/default.jpg" />
  <meta name="twitter:title" content="Default title" />
  <meta name="twitter:description" content="Default description" />
  <meta name="twitter:url" content="https://commercialshotblasting.co.uk/" />
  <meta name="twitter:image" content="https://commercialshotblasting.co.uk/default.jpg" />
</head><body><!--SSR_CONTENT--></body></html>`;

describe("phase-one pillar page SSR", () => {
  const pages = [
    ["/steel-fabrication-surface-preparation", "Steel Fabrication & Structural Steel Surface Preparation"],
    ["/steel-chimney-process-stack-surface-preparation", "Steel Chimney, Process Stack & Flue Surface Preparation"],
    ["/industrial-steelwork-restoration", "Industrial Steelwork Restoration & Corrosion Preparation"],
    ["/factory-cladding-restoration", "Factory Cladding Restoration & Coating Preparation"],
  ] as const;

  it.each(pages)("emits canonical metadata, schema, and substantive SSR content for %s", async (path, heading) => {
    const html = await injectMetaTags(baseHtml, path);

    expect(html).toContain(`<link rel="canonical" href="https://commercialshotblasting.co.uk${path}" />`);
    expect(html).toContain(`<meta name="twitter:url" content="https://commercialshotblasting.co.uk${path}" />`);
    expect(html).toContain('"@type":"BreadcrumbList"');
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain(`<h1>${heading}</h1>`);
    expect(html).toContain("We will get back to you promptly.");
    expect(html).not.toMatch(/within 24 hours/i);
  });

  it("keeps the chimney pillar explicit about the limits of the supplied project evidence", async () => {
    const html = await injectMetaTags(baseHtml, "/steel-chimney-process-stack-surface-preparation");

    expect(html).toContain("does not establish a location, programme, blast standard, client, or final coating system");
    expect(html).toContain("/our-work#steel-chimney-case-study");
  });

  it("keeps the factory cladding pillar tied to the approved project record without adding unsupported project claims", async () => {
    const html = await injectMetaTags(baseHtml, "/factory-cladding-restoration");

    expect(html).toContain("2,400 m² of profiled steel cladding");
    expect(html).toContain("prepared for a 25-year coating system");
    expect(html).toContain("does not establish a location, programme, client identity, or unverified preparation standard");
  });

  it("adds resource links only to Tier A locations and includes the cladding pillar", () => {
    const tierAResources = getTierAPillarResources("birmingham", ["Manufacturing", "Construction"]);
    const tierBResources = getTierAPillarResources("truro", ["Construction"]);

    expect(tierAResources.map((resource) => resource.href)).toContain("/factory-cladding-restoration");
    expect(tierBResources).toEqual([]);
  });
});
