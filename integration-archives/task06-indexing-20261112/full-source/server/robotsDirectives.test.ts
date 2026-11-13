import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "node:fs";
import { ROBOTS_TEXT } from "../shared/robotsPolicy";
vi.mock("./db", () => ({ getPublishedBlogPostForHtml: vi.fn(async () => ({ state: "unavailable" })), getActiveGalleryItems: vi.fn(async () => []), getPublishedBlogPosts: vi.fn(async () => []) }));
import { injectMetaTags } from "./metaTags";
import { resolveHtmlRoute } from "./contentRouteExistence";
const template = `<!doctype html><html><head><title>Original</title><meta name="description" content="Original"><link rel="canonical" href="https://commercialshotblasting.co.uk/"><meta name="robots" content="index,follow"><meta content='noindex' name='googlebot'></head><body><!--SSR_CONTENT--><div id="root"></div></body></html>`;
const policies = [
  ["/privacy-policy", "noindex, follow"],
  ["/terms-of-service", "noindex, follow"],
  ["/case-studies/fire-escape-multi-storey-office", "noindex, follow"],
  ["/admin", "noindex, nofollow"],
  ["/call-analytics", "noindex, nofollow"],
] as const;
describe("Task06 scoped initial robots directives", () => {
  for (const [path, directive] of policies) for (const suffix of ["", "/", "?utm_source=adwords&gclid=x&gbraid=y&wbraid=z&ref=a%2Bb&ref=", "/?utm_campaign=csb-test"]) {
    it(`single correct directive for ${path}${suffix}`, async () => {
      const result = await injectMetaTags(template, path + suffix);
      const tags = result.match(/<meta\b[^>]*name=["'](?:robots|googlebot)["'][^>]*>/gi) ?? [];
      expect(tags).toHaveLength(1); expect(tags[0]).toContain(`content="${directive}"`);
      expect(result).toContain('<div id="root"></div>');
      if (path === "/privacy-policy") expect(result).toContain("11 November 2026");
      if (path === "/terms-of-service") expect(result).toContain("5 November 2026");
    });
  }
  it("legal query dispatch retains exact visible/schema content", async () => {
    const clean = await injectMetaTags(template, "/privacy-policy");
    expect(await injectMetaTags(template, "/privacy-policy?utm_source=adwords&gclid=test")).toBe(clean);
  });
  it("does not mistake a similar root for a legal route", async () => {
    expect((await resolveHtmlRoute("/privacy-policy-extra")).state).toBe("missing");
  });
  it("keeps missing blog distinct from unavailable backend and never noindexes 503 HTML", async () => {
    expect((await resolveHtmlRoute("/blog/missing", { lookupPost: async () => ({ state: "missing" }) })).state).toBe("missing");
    expect((await resolveHtmlRoute("/blog/unknown", { lookupPost: async () => ({ state: "unavailable" }) })).state).toBe("unavailable");
    const result = await injectMetaTags(template, "/blog/unknown");
    expect(result).toContain("Page Temporarily Unavailable");
    expect(result).not.toMatch(/<meta[^>]+name="robots"/);
  });
});
describe("Task06 crawler policy parity", () => {
  it("runtime uses the exact shared static policy without scoped endpoint changes", () => {
    expect(readFileSync("client/public/robots.txt", "utf8")).toBe(ROBOTS_TEXT);
    const source = readFileSync("server/_core/index.ts", "utf8");
    expect(source).toContain('import { ROBOTS_TEXT } from "@shared/robotsPolicy"');
    expect(source).toMatch(/app\.get\("\/robots\.txt"[\s\S]*?res\.send\(ROBOTS_TEXT\)/);
  });
  it("retains API/storage restrictions and leaves catalogue/directive HTML crawlable", () => {
    const disallows = ROBOTS_TEXT.split("\n").filter(x => x.startsWith("Disallow:"));
    expect(disallows).toEqual(["Disallow: /api/", "Disallow: /manus-storage/"]);
    expect(ROBOTS_TEXT).toContain("Sitemap: https://commercialshotblasting.co.uk/sitemap.xml");
    expect(ROBOTS_TEXT).not.toMatch(/Disallow:.*(?:\?|gclid|utm_|service-areas|admin|privacy)/);
    expect(ROBOTS_TEXT).not.toContain("Allow: /*.");
  });
});
