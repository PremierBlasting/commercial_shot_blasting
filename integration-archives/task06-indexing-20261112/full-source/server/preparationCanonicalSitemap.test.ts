import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { getKnownPageRedirect } from "./seoUrlNormalisation";

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

describe("maintained preparation owner", () => {
  it("uses the maintained page in both sitemap sources without an alias entry", () => {
    const snapshot = read("client/public/sitemap-main.xml");
    expect(snapshot).toContain("<loc>https://commercialshotblasting.co.uk/preparation-cleanup</loc>");
    expect(snapshot).not.toContain("<loc>https://commercialshotblasting.co.uk/preparation-and-cleanup</loc>");
    expect(snapshot).not.toContain("<loc>https://commercialshotblasting.co.uk/prep-and-cleanup</loc>");
    expect(read("shared/sitemapPolicy.ts")).toMatch(/loc:\s*['"]\/preparation-cleanup['"]/);
    expect(read("server/sitemap.ts")).toContain("mainSitemapEntries()");
  });
  it("keeps the HTML sitemap link and crawler owner aligned", () => {
    expect(read("client/src/pages/SitemapPage.tsx")).toContain('/preparation-cleanup');
    const metadata = read("server/metaTags.ts");
    expect(metadata).toContain('const pcUrl = `${SITE_URL}/preparation-cleanup`;');
    expect(metadata).not.toContain('const pcUrl = `${SITE_URL}/preparation-and-cleanup`;');
  });
  it("preserves query context while going directly to the maintained destination", () => {
    const query = "?utm_source=adwords&gclid=a%2Bb&gbraid=&wbraid=123&ref=a&ref=b";
    expect(getKnownPageRedirect("/preparation-and-cleanup/", "/preparation-and-cleanup/" + query)).toBe("/preparation-cleanup" + query);
    expect(getKnownPageRedirect("/prep-and-cleanup", "/prep-and-cleanup" + query)).toBe("/preparation-cleanup" + query);
  });
});
