import { describe, expect, it } from "vitest";
import { injectMetaTags } from "./metaTags";
import { getTierAPillarResources } from "../shared/tierAPillarResources";
import { getCountyPillarResources } from "../shared/countyPillarResources";
import { getIndustryPillarResources } from "../shared/industryPillarResources";

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
    ["/process-pipework-spools-surface-preparation", "Process Pipework, Spools & Support Steelwork Surface Preparation"],
    ["/agricultural-steelwork-grain-store-preparation", "Agricultural Steelwork & Grain Store Surface Preparation"],
    ["/container-restoration-storage-steelwork", "Container Restoration & Storage Steelwork Surface Preparation"],
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

  it("keeps the pipework pillar limited to the documented water-treatment project evidence", async () => {
    const html = await injectMetaTags(baseHtml, "/process-pipework-spools-surface-preparation");

    expect(html).toContain("850 metres of process pipework and support steelwork");
    expect(html).toContain("achieving Sa 2.5 for a three-coat epoxy coating system");
    expect(html).toContain("does not establish a site location, programme, client, operating condition, or further project claims");
  });

  it("links water-treatment-relevant county hubs to the pipework pillar without adding it to unrelated counties", () => {
    const hampshireResources = getCountyPillarResources("hampshire", ["Industrial Plant", "Aerospace & Defence"]);
    const cornwallResources = getCountyPillarResources("cornwall", ["Tourism", "Agriculture"]);

    expect(hampshireResources.map((resource) => resource.href)).toContain("/process-pipework-spools-surface-preparation");
    expect(cornwallResources.map((resource) => resource.href)).not.toContain("/process-pipework-spools-surface-preparation");
  });

  it("keeps the agricultural pillar tied to the approved farm-machinery evidence without representing it as a grain-store project", async () => {
    const html = await injectMetaTags(baseHtml, "/agricultural-steelwork-grain-store-preparation");

    expect(html).toContain("14 pieces of farm machinery");
    expect(html).toContain("does not document a grain-store project, a location, a programme, a client, or a specific preparation standard");
    expect(html).toContain("/services/agricultural-shot-blasting");
    expect(html).toContain("/blog/seasonal-agricultural-steelwork-maintenance-guide");
  });

  it("keeps the Container Restoration pillar tied to its approved 18-container project record", async () => {
    const html = await injectMetaTags(baseHtml, "/container-restoration-storage-steelwork");

    expect(html).toContain("18 shipping containers at a logistics depot");
    expect(html).toContain("returned to Sa 2.5 and recoated on site");
    expect(html).toContain("does not establish a depot location, programme, client, coating product, or further fleet claims");
    expect(html).toContain("/services/steel-containers");
  });

  it("selects industry resources with tailored enquiry prompts while leaving unrelated industry hubs unchanged", () => {
    const agricultureResources = getIndustryPillarResources("agriculture");
    const manufacturingResources = getIndustryPillarResources("manufacturing");
    const aerospaceResources = getIndustryPillarResources("aerospace");

    expect(agricultureResources.map((resource) => resource.href)).toContain("/agricultural-steelwork-grain-store-preparation");
    expect(agricultureResources.every((resource) => resource.enquiryPrompt.length > 25)).toBe(true);
    expect(manufacturingResources.map((resource) => resource.href)).toContain("/container-restoration-storage-steelwork");
    expect(manufacturingResources.find((resource) => resource.href === "/container-restoration-storage-steelwork")?.enquiryPrompt).toContain("container quantities");
    expect(aerospaceResources).toEqual([]);
  });
});
