import { describe, expect, it } from "vitest";
import { CANONICAL_SERVICE_SLUGS, getCanonicalServicePath, normaliseServiceUrls } from "../shared/serviceSeoCatalog";
import { getLocationSitemapTier, shouldIncludeLocationInSitemap } from "../shared/locationSeoTiers";
import { normaliseResponseTimeCopy } from "../shared/seoContentPolicy";
import { getProjectsForCounty } from "../client/src/data/recentProjects";

describe("SEO priority safeguards", () => {
  it("uses only live canonical service paths and redirects historic aliases", () => {
    expect(CANONICAL_SERVICE_SLUGS).toContain("structural-steel-frames");
    expect(CANONICAL_SERVICE_SLUGS).toContain("steel-chimney-surface-preparation");
    expect(getCanonicalServicePath("steel-chimney-surface-preparation")).toBe("/services/steel-chimney-surface-preparation");
    expect(getCanonicalServicePath("structural-steel-shot-blasting")).toBe("/services/structural-steel-frames");
    expect(normaliseServiceUrls('<a href="/services/floor-shot-blasting">Floor</a>')).toContain("/services/floor-preparation");
  });

  it("keeps response copy prompt without a fixed 24-hour promise", () => {
    const legacy = "We typically respond to enquiries within 24 hours and can usually schedule site visits in Leeds within 2-5 working days. For urgent projects, we can often accommodate faster response times.";
    const normalised = normaliseResponseTimeCopy(legacy);
    expect(normalised).toContain("We'll get back to you promptly.");
    expect(normalised).not.toMatch(/24 hours/i);
  });

  it("marks major commercial centres as Tier A while retaining the wider evidence-led catalogue", () => {
    expect(getLocationSitemapTier("birmingham")).toBe("A");
    expect(getLocationSitemapTier("truro")).toBe("B");
    expect(shouldIncludeLocationInSitemap("birmingham")).toBe(true);
    expect(shouldIncludeLocationInSitemap("truro")).toBe(true);
  });

  it("never pads local project examples with an unrelated county", () => {
    const projects = getProjectsForCounty("cornwall", 3);
    expect(projects.every((project) => project.countySlugs.includes("cornwall"))).toBe(true);
  });

  it("keeps the chimney service evidence-led and linked to estimating content", async () => {
    const { readFileSync } = await import("node:fs");
    const { resolve } = await import("node:path");
    const projectRoot = resolve(import.meta.dirname, "..");
    const serviceData = readFileSync(resolve(projectRoot, "client/src/data/services.ts"), "utf8");
    const servicePage = readFileSync(resolve(projectRoot, "client/src/pages/ServiceDetail.tsx"), "utf8");
    const headerData = readFileSync(resolve(projectRoot, "client/src/components/headerData.ts"), "utf8");

    expect(serviceData).toContain('id: "steel-chimney-surface-preparation"');
    expect(serviceData).toContain("We do not assume a standard from appearance alone");
    expect(servicePage).toContain("Steel Chimney Section — Surface Preparation");
    expect(servicePage).toContain("steel-fabrication-shot-blasting-costs-and-programme-guide");
    expect(headerData).toContain("Steel Chimneys, Process Stacks & Flues");
  });

  it("publishes the approved phase-one pillar pages with SSR, sitemap, and verified-evidence discovery", async () => {
    const { readFileSync } = await import("node:fs");
    const { resolve } = await import("node:path");
    const projectRoot = resolve(import.meta.dirname, "..");
    const pillarData = readFileSync(resolve(projectRoot, "client/src/data/pillarPages.ts"), "utf8");
    const pillarPage = readFileSync(resolve(projectRoot, "client/src/pages/PillarPage.tsx"), "utf8");
    const routes = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
    const ssr = readFileSync(resolve(projectRoot, "server/metaTags.ts"), "utf8");
    const servicesHub = readFileSync(resolve(projectRoot, "client/src/pages/Services.tsx"), "utf8");

    for (const slug of ["steel-fabrication-surface-preparation", "steel-chimney-process-stack-surface-preparation", "industrial-steelwork-restoration", "factory-cladding-restoration", "process-pipework-spools-surface-preparation"]) {
      expect(pillarData).toContain(`slug: "${slug}"`);
      expect(routes).toContain(`/${slug}`);
      expect(ssr).toContain(`"/${slug}"`);
      expect(servicesHub).toContain(`/${slug}`);
    }
    expect(pillarData).toContain("steel-chimney-surface-preparation");
    expect(pillarData).toContain("does not establish a site location, programme, blast standard, client, or final coating system");
    expect(pillarPage).toContain("ProjectImageGallery");
    expect(pillarPage).toContain("We’ll get back to you promptly.");
  });
});
