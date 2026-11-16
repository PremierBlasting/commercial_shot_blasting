import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { injectMetaTags } from "./metaTags";
import { buildServiceAreaSitemap } from "./sitemap";
import { getLocationSEO } from "../client/src/hooks/useSEO";
import { resolveRouteMetadata } from "../shared/routeMetadata";
import { getCanonicalServiceAreaRedirect } from "./seoUrlNormalisation";
import {
  INDEXABLE_EVIDENCE_LOCATION_SLUGS,
  TIER_A_LOCATION_SLUGS,
  getLocationRobotsDirective,
  getLocationSitemapTier,
  isIndexableLocation,
} from "../shared/locationSeoTiers";
import { locationData } from "../shared/locationData";
import {
  getPriorityLocalNearMeCopy,
  getPriorityLocalNearMeFaqs,
  getPriorityLocalNearMeMetadata,
  isPriorityLocalNearMeSearchDestination,
} from "../shared/priorityLocalNearMePilot";

const baseHtml = `<!doctype html><html><head>
  <title>Commercial Shot Blasting</title>
  <meta name="description" content="Default description" />
  <link rel="canonical" href="https://commercialshotblasting.co.uk/" />
</head><body><!--SSR_CONTENT--></body></html>`;

const projectRoot = resolve(import.meta.dirname, "..");
const indexableSlugs = [...TIER_A_LOCATION_SLUGS, ...INDEXABLE_EVIDENCE_LOCATION_SLUGS];
const allLiveLocationSlugs = Object.keys(locationData);

const inheritedClaims = [
  "Mobile Contractor Near Me",
  "Free site survey",
  "Free quote",
  "same-week availability",
  "12 mobile units",
  "local base",
  "local workshop",
  "fast mobilisation",
  "Guaranteed Blast Standard",
];

describe("Local near-me growth — factual all-area rollout", () => {
  it("applies the same factual browser metadata pattern to every live location record", () => {
    expect(allLiveLocationSlugs).toHaveLength(765);

    for (const slug of allLiveLocationSlugs) {
      const location = locationData[slug];
      const canonicalSlug = slug === "stoke" ? "stoke-on-trent" : slug;
      const expectedMeta = getPriorityLocalNearMeMetadata(canonicalSlug, location.name);
      const legacyMeta = getLocationSEO(location.name, slug, location.county);
      const expectedLegacyMeta = getPriorityLocalNearMeMetadata(slug, location.name);
      // Compatibility inputs retain their factual record values; the shared
      // owner, not this legacy helper, decides the rendered canonical head.
      expect(legacyMeta.title, slug).toBe(expectedLegacyMeta.title);
      expect(legacyMeta.description, slug).toBe(expectedLegacyMeta.description);
      expect(legacyMeta.canonical, slug).toBe(`https://commercialshotblasting.co.uk/service-areas/${slug}`);
      const browserMeta = resolveRouteMetadata(
        `/service-areas/${slug}`,
        legacyMeta,
      );

      expect(browserMeta.title, slug).toBe(expectedMeta.title);
      expect(browserMeta.description, slug).toBe(expectedMeta.description);
      expect(browserMeta.pathname, slug).toBe(`/service-areas/${canonicalSlug}`);
      expect(browserMeta.canonical, slug).toBe(`https://commercialshotblasting.co.uk/service-areas/${canonicalSlug}`);
    }
  });

  it("keeps browser content on one factual shared pattern with no unreviewed local modules", () => {
    const locationPage = readFileSync(resolve(projectRoot, "client/src/components/LocationPage.tsx"), "utf8");

    expect(locationPage).toContain("getPriorityLocalNearMeCopy(location.slug, location.name)");
    expect(locationPage).toContain("getPriorityLocalNearMeFaqs(location.slug, location.name)");
    expect(locationPage).not.toContain("isNearMePilot");
    expect(locationPage).not.toContain("LocationCustomContent");
    expect(locationPage).not.toContain("getProjectsForCounty");
    expect(locationPage).not.toContain("local workshop");
    expect(locationPage).not.toContain("No-obligation quotations");
  });

  it("renders factual crawler metadata, one robots directive, and safe FAQs for every live location", async () => {
    for (const slug of allLiveLocationSlugs) {
      const location = locationData[slug];
      const canonicalSlug = slug === "stoke" ? "stoke-on-trent" : slug;
      const expectedMeta = getPriorityLocalNearMeMetadata(canonicalSlug, location.name);
      const routeMeta = resolveRouteMetadata(`/service-areas/${slug}`);
      const html = await injectMetaTags(baseHtml, `/service-areas/${slug}`);

      expect(routeMeta.title, slug).toBe(expectedMeta.title);
      expect(routeMeta.description, slug).toBe(expectedMeta.description);
      expect(routeMeta.pathname, slug).toBe(`/service-areas/${canonicalSlug}`);
      expect(routeMeta.canonical, slug).toBe(`https://commercialshotblasting.co.uk/service-areas/${canonicalSlug}`);
      expect(html, slug).toContain(`<title>${expectedMeta.title}</title>`);
      expect(html, slug).toContain(`<meta name="description" content="${expectedMeta.description}" />`);
      expect(html, slug).toContain(`<link rel="canonical" href="${routeMeta.canonical}" />`);
      expect(routeMeta.robots, slug).toBe(getLocationRobotsDirective(canonicalSlug));
      expect(html, slug).toContain(`<meta name="robots" content="${getLocationRobotsDirective(canonicalSlug)}" />`);
      expect(html.match(/<meta name="robots"/g), slug).toHaveLength(1);

      for (const inheritedClaim of inheritedClaims) {
        expect(html, `${slug} must not claim ${inheritedClaim}`).not.toContain(inheritedClaim);
      }

      for (const faq of getPriorityLocalNearMeFaqs(slug, location.name)) {
        expect(html, `${slug} should render factual FAQ wording`).toContain(faq.question);
      }
    }
  });

  it("uses useful project-planning copy and safe FAQs on every live browser route", () => {
    for (const slug of allLiveLocationSlugs) {
      const location = locationData[slug];
      const pageCopy = getPriorityLocalNearMeCopy(slug, location.name);
      const faqs = getPriorityLocalNearMeFaqs(slug, location.name);

      expect(pageCopy.heroHeading).toBe(
        isIndexableLocation(slug)
          ? `Commercial Shot Blasting Near ${location.name}`
          : `Commercial Shot Blasting in ${location.name} | Surface-Preparation Planning`,
      );
      expect(pageCopy.planningLinks.map((link) => link.href)).toEqual([
        "/services/structural-steel-frames",
        "/mobile-on-site-shot-blasting",
        "/intumescent-paint-for-steel",
      ]);
      expect(faqs).toHaveLength(isIndexableLocation(slug) ? 5 : 4);
      expect(faqs.map((faq) => `${faq.question} ${faq.answer}`).join(" ")).not.toMatch(/same-week|local base|free quote/i);
    }
  });

  it("uses the near-me phrase once in useful answers on the 65 canonical organic destinations only", async () => {
    expect(indexableSlugs).toHaveLength(65);

    for (const slug of indexableSlugs) {
      const location = locationData[slug];
      const pageCopy = getPriorityLocalNearMeCopy(slug, location.name);
      const html = await injectMetaTags(baseHtml, `/service-areas/${slug}`);

      expect(isPriorityLocalNearMeSearchDestination(slug), slug).toBe(true);
      expect(getPriorityLocalNearMeMetadata(slug, location.name).title, slug).toBe(
        `Shot Blasting Near ${location.name} | Commercial Surface Preparation`,
      );
      expect(pageCopy.queryAnswer?.heading, slug).toBe(`Looking for commercial shot blasting near ${location.name}?`);
      expect(getPriorityLocalNearMeFaqs(slug, location.name)[0]?.question, slug).toBe(
        `Do you provide commercial shot blasting near ${location.name}?`,
      );
      expect(html, slug).toContain(`Looking for commercial shot blasting near ${location.name}?`);
      expect(html, slug).toContain(`Do you provide commercial shot blasting near ${location.name}?`);
    }

    for (const slug of allLiveLocationSlugs.filter((candidate) => !isIndexableLocation(candidate))) {
      const location = locationData[slug];
      const pageCopy = getPriorityLocalNearMeCopy(slug, location.name);
      const html = await injectMetaTags(baseHtml, `/service-areas/${slug}`);

      expect(isPriorityLocalNearMeSearchDestination(slug), slug).toBe(false);
      expect(getPriorityLocalNearMeMetadata(slug, location.name).title, slug).toBe(
        `Shot Blasting in ${location.name} | Commercial Surface Preparation`,
      );
      expect(pageCopy.queryAnswer, slug).toBeUndefined();
      expect(html, slug).not.toContain(`Looking for commercial shot blasting near ${location.name}?`);
      expect(getLocationRobotsDirective(slug), slug).toMatch(/^noindex, follow/);
    }
  });

  it("routes every canonical service-area URL through the maintained shared template", () => {
    const appSource = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
    const routerSource = readFileSync(resolve(projectRoot, "client/src/pages/LocationRouter.tsx"), "utf8");
    const prefetchSource = readFileSync(resolve(projectRoot, "client/src/hooks/usePrefetch.ts"), "utf8");

    expect(appSource).toContain('<Route path="/service-areas/:slug"');
    expect(appSource.match(/<Route path="\/service-areas\/[a-z][^"]+"/g) ?? []).toHaveLength(0);
    expect(appSource).not.toContain("HerefordServiceArea");
    expect(routerSource).toContain("return <LocationPage location={location} />");
    expect(prefetchSource).toContain("path.startsWith('/service-areas/')");
    expect(prefetchSource).not.toContain("HerefordServiceArea");
  });

  it("retains the redirect-only Stoke alias and shared browser/server metadata owner at its canonical destination", async () => {
    const canonicalPath = "/service-areas/stoke-on-trent";
    const query = "?utm_source=adwords&gclid=mock%2Bclick&x=one&x=two&empty=";
    const canonicalMeta = resolveRouteMetadata(canonicalPath);
    const expectedMeta = getPriorityLocalNearMeMetadata("stoke-on-trent", locationData["stoke-on-trent"].name);

    expect(getLocationSitemapTier("stoke")).toBe("alias");
    expect(isPriorityLocalNearMeSearchDestination("stoke")).toBe(false);
    expect(canonicalMeta.pathname).toBe(canonicalPath);
    expect(canonicalMeta.canonical).toBe(`https://commercialshotblasting.co.uk${canonicalPath}`);
    expect(canonicalMeta.title).toBe(expectedMeta.title);
    expect(canonicalMeta.description).toBe(expectedMeta.description);
    expect(canonicalMeta.robots).toBe(getLocationRobotsDirective("stoke-on-trent"));
    expect(getCanonicalServiceAreaRedirect(canonicalPath, canonicalPath + query)).toBeNull();

    for (const aliasPath of ["/service-areas/stoke", "/service-areas/stoke/"]) {
      expect(getCanonicalServiceAreaRedirect(aliasPath, aliasPath + query)).toBe(canonicalPath + query);
      expect(resolveRouteMetadata(aliasPath + query)).toEqual(canonicalMeta);
    }

    for (const path of ["/service-areas/stoke", canonicalPath]) {
      const html = await injectMetaTags(baseHtml, path);
      const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
      expect(head).toBeDefined();
      expect(head).toContain(`<title>${expectedMeta.title}</title>`);
      expect(head).toContain(`<meta name="description" content="${expectedMeta.description}" />`);
      expect(head!.match(/<link\b[^>]*rel="canonical"[^>]*>/gi)).toEqual([
        `<link rel="canonical" href="${canonicalMeta.canonical}" />`,
      ]);
      expect(head).toContain(`<meta name="robots" content="${canonicalMeta.robots}" />`);
      expect(head!.match(/<meta name="robots"/g)).toHaveLength(1);
    }

    const appSource = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
    const ownerSource = readFileSync(resolve(projectRoot, "client/src/components/RouteMetadataOwner.tsx"), "utf8");
    const seoSource = readFileSync(resolve(projectRoot, "client/src/hooks/useSEO.ts"), "utf8");
    const serverSource = readFileSync(resolve(projectRoot, "server/metaTags.ts"), "utf8");
    expect(appSource).toContain("<RouteMetadataOwner>");
    expect(ownerSource).toContain("const resolve = options.resolve ?? resolveRouteMetadata;");
    expect(ownerSource).toContain("const metadata = resolve(currentUrl, input);");
    expect(seoSource).toContain("useRouteMetadataInput(key?.pathname ? config as RouteMetadataInput : undefined, key?.pathname, key?.generation)");
    expect(serverSource).toContain("return resolveRouteMetadata(url);");
    expect(serverSource).toContain("return composeRouteMetadataHead(result, resolveServerRouteMetadata(url, content));");
  });

  it("keeps Derby factual and retains approved local/regional evidence boundaries", async () => {
    const html = await injectMetaTags(baseHtml, "/service-areas/derby");
    const browserChunk = readFileSync(resolve(projectRoot, "client/src/data/locationChunks/derbyshire.ts"), "utf8");
    const derbyBrowserRecord = browserChunk.slice(
      browserChunk.indexOf('"derby": {'),
      browserChunk.indexOf('"chesterfield": {'),
    );

    for (const unsupportedClaim of ["Toyota Burnaston", "Rolls-Royce", "Litchurch Lane", "Derby workshop", "Derby base", "fast mobilisation"]) {
      expect(html).not.toContain(unsupportedClaim);
      expect(derbyBrowserRecord).not.toContain(unsupportedClaim);
    }

    expect(html).toContain("Infinity Park Derby");
    expect(html).toContain("not evidence of work in this town");
    expect(html).toContain("HB Tunnelling — Doncaster warehouse refurbishment");
    expect(html).toContain("Commercial Shot Blasting Near Derby");
    expect(html).toContain("Looking for commercial shot blasting near Derby?");
  });

  it("preserves the intentional Tier A/Tier B sitemap policy without widening the catalogue", () => {
    const sitemap = buildServiceAreaSitemap();

    expect(TIER_A_LOCATION_SLUGS).toHaveLength(52);
    expect(INDEXABLE_EVIDENCE_LOCATION_SLUGS).toHaveLength(13);
    expect(indexableSlugs).toHaveLength(65);
    expect(allLiveLocationSlugs.filter(slug => getLocationSitemapTier(slug) === "noindex")).toHaveLength(699);
    expect(allLiveLocationSlugs.filter(slug => getLocationSitemapTier(slug) === "alias")).toEqual(["stoke"]);
    expect(getLocationSitemapTier("stoke")).toBe("alias");
    expect(isPriorityLocalNearMeSearchDestination("stoke")).toBe(false);
    expect(sitemap).not.toContain("https://commercialshotblasting.co.uk/service-areas/stoke</loc>");
    for (const slug of indexableSlugs) {
      expect(isIndexableLocation(slug), slug).toBe(true);
      expect(getLocationRobotsDirective(slug), slug).toMatch(/^index, follow/);
      expect(sitemap, slug).toContain(`https://commercialshotblasting.co.uk/service-areas/${slug}`);
    }
    expect(getLocationSitemapTier("truro")).toBe("noindex");
    expect(sitemap).not.toContain("https://commercialshotblasting.co.uk/service-areas/truro");
  });
});
