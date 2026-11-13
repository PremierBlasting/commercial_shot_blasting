import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createHash } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import {
  countySitemapEntries, industrySitemapEntries, latestValidSitemapLastmod,
  mainSitemapEntries, omitUnverifiedImageParentLastmod, renderSitemapIndex,
  renderSitemapUrlSet, serviceAreaSitemapEntries, serviceSitemapEntries,
  SITEMAP_CHILD_PATHS, SITEMAP_SITE_URL, staticSitemapSnapshots, validSitemapLastmod,
} from "../shared/sitemapPolicy";
import { getLocationSitemapTier, LOCATION_ALIAS_SLUGS } from "../shared/locationSeoTiers";
import { locationSlugIndex } from "../client/src/data/locationSlugIndex";
import { CANONICAL_SERVICE_SLUGS, LEGACY_SERVICE_REDIRECTS } from "../shared/serviceSeoCatalog";
import { getCanonicalServiceAreaRedirect, getKnownPageRedirect } from "./seoUrlNormalisation";
import { generateSitemapSnapshots } from "../scripts/generate-sitemap-snapshots";
import { buildBlogSitemap, buildCountySitemap, buildMainSitemap, buildServiceAreaSitemap, buildSitemap, buildSitemapIndex, registerSitemapRoute } from "./sitemap";

const db = vi.hoisted(() => ({ getPublishedBlogPosts: vi.fn(), getActiveGalleryItems: vi.fn() }));
vi.mock("./db", () => db);
const root = resolve(import.meta.dirname, "..");
const asOf = new Date("2026-11-12T12:00:00Z");
const publicFile = (file: string) => readFileSync(join(root, "client/public", file), "utf8");
const sourceFile = (file: string) => readFileSync(join(root, file), "utf8");
const digest = (value: string) => createHash("sha256").update(value).digest("hex");
const pageLocations = (xml: string) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const urlEntries = (xml: string) => [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g)].map((match) => [match[1], match[0]]);
const entry = (xml: string, path: string) => urlEntries(xml).find(([url]) => url === `${SITEMAP_SITE_URL}${path}`)?.[1];
const changedPaths = (first: string, second: string) => {
  const old = new Map(urlEntries(first));
  return urlEntries(second).filter(([url, xml]) => old.get(url) !== xml).map(([url]) => url.replace(SITEMAP_SITE_URL, ""));
};

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(asOf);
  db.getActiveGalleryItems.mockReset().mockResolvedValue([]);
  db.getPublishedBlogPosts.mockReset().mockResolvedValue([]);
});
afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); });

describe("canonical sitemap policy and retained mirror parity", () => {
  it("keeps precisely 52A, 13B, one alias and the identical baseline 699 held slugs", () => {
    const slugs = Object.keys(locationSlugIndex);
    expect(slugs).toHaveLength(765);
    expect(slugs.filter((slug) => getLocationSitemapTier(slug) === "A")).toHaveLength(52);
    expect(slugs.filter((slug) => getLocationSitemapTier(slug) === "B")).toHaveLength(13);
    expect([...LOCATION_ALIAS_SLUGS]).toEqual(["stoke"]);
    const held = slugs.filter((slug) => getLocationSitemapTier(slug) === "noindex").sort();
    expect(held).toHaveLength(699);
    // Approved baseline 36cca1f5 fixture: membership guard, not a live crawl claim.
    expect(digest(held.join("\n"))).toBe("db1e991762df8481a621975d895b94a98c5cd058801a31fc936bd6dac1a2fadc");
    const urls = serviceAreaSitemapEntries().map((row) => row.loc);
    expect(urls).toHaveLength(65);
    expect(new Set(urls).size).toBe(65);
    expect(urls.filter((url) => url === "/service-areas/stoke-on-trent")).toHaveLength(1);
    expect(urls).not.toContain("/service-areas/stoke");
    for (const slug of held) expect(urls).not.toContain(`/service-areas/${slug}`);
    expect(countySitemapEntries()).toHaveLength(43);
  });
  it("shares complete static/runtime pure XML, not merely equivalent counts", async () => {
    const snapshots = staticSitemapSnapshots(asOf);
    expect(await buildMainSitemap()).toBe(snapshots["sitemap-main.xml"]);
    expect(buildCountySitemap()).toBe(snapshots["sitemap-counties.xml"]);
    expect(buildServiceAreaSitemap()).toBe(snapshots["sitemap-service-areas.xml"]);
    expect(buildSitemapIndex()).toBe(snapshots["sitemap.xml"]);
    expect(await buildSitemap()).toBe(renderSitemapIndex());
    for (const [file, xml] of Object.entries(snapshots)) expect(publicFile(file), file).toBe(xml);
    expect(db.getActiveGalleryItems).toHaveBeenCalledOnce();
    expect(db.getPublishedBlogPosts).not.toHaveBeenCalled();
  });
  it("keeps compatibility services/industries as canonical subsets of main and exactly five index children", () => {
    const main = mainSitemapEntries().map((row) => row.loc);
    expect(main).toHaveLength(81);
    expect(new Set(main).size).toBe(81);
    expect(serviceSitemapEntries().map((row) => row.loc)).toEqual(CANONICAL_SERVICE_SLUGS.map((slug) => `/services/${slug}`));
    for (const row of [...serviceSitemapEntries(), ...industrySitemapEntries()]) expect(main).toContain(row.loc);
    for (const slug of Object.keys(LEGACY_SERVICE_REDIRECTS)) expect(main).not.toContain(`/services/${slug}`);
    for (const path of ["/privacy-policy", "/terms-of-service", "/admin", "/call-analytics", "/case-studies/fire-escape-multi-storey-office", "/preparation-and-cleanup", "/prep-and-cleanup", "/case-studies/structural-steel"]) expect(main).not.toContain(path);
    expect(pageLocations(renderSitemapIndex())).toEqual(SITEMAP_CHILD_PATHS.map((path) => `${SITEMAP_SITE_URL}${path}`));
    expect(SITEMAP_CHILD_PATHS).toHaveLength(5);
    expect(renderSitemapIndex()).not.toContain("<lastmod>");
    expect(renderSitemapIndex()).not.toContain("sitemap-services.xml");
    expect(renderSitemapIndex()).not.toContain("sitemap-industries.xml");
  });
  it("keeps Task04 preparation, Stoke and Wigan redirects with all attribution query bytes", () => {
    const query = "?utm_source=adwords&gclid=a%2Bb&gbraid=&wbraid=123&ref=a&ref=b";
    for (const path of ["/preparation-and-cleanup", "/prep-and-cleanup"]) {
      expect(getKnownPageRedirect(path, path + query)).toBe("/preparation-cleanup" + query);
    }
    for (const path of ["/service-areas/stoke", "/service-areas/stoke/"]) {
      expect(getCanonicalServiceAreaRedirect(path, path + query)).toBe("/service-areas/stoke-on-trent" + query);
    }
    expect(getKnownPageRedirect("/case-studies/structural-steel", "/case-studies/structural-steel" + query)).toBe("/case-studies/iss-property-former-bakkavor-foods-facility-wigan" + query);
    expect(sourceFile("client/src/pages/ServiceAreas.tsx")).toContain('"Stoke-on-Trent": "stoke-on-trent"');
  });
  it("has strict page/media counts and retains the exact 271 approved image URLs", () => {
    const images = publicFile("sitemap-images.xml");
    expect(images).toContain('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"');
    expect(pageLocations(images)).toEqual([SITEMAP_SITE_URL]);
    const media = [...images.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((match) => match[1]);
    expect(media).toHaveLength(271);
    expect(digest(media.join("\n"))).toBe("20120280b292c0e4606fc1c07760ea6f60a24680942693d237bdfc450c771b6b");
    expect(images).not.toContain("<lastmod>");
    for (const xml of Object.values(staticSitemapSnapshots(asOf))) expect(xml).not.toContain("<image:loc>");
  });
  it("removes only unverified image-parent date without changing media markup or URLs", () => {
    const original = '<?xml version="1.0"?>\n<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n  <url>\n    <loc>https://commercialshotblasting.co.uk</loc>\n    <lastmod>2026-10-05</lastmod>\n    <image:image><image:loc>https://example.test/img?a=1&amp;b=2</image:loc><image:title>A</image:title></image:image>\n  </url>\n</urlset>\n';
    expect(omitUnverifiedImageParentLastmod(original)).toBe(original.replace("    <lastmod>2026-10-05</lastmod>\n", ""));
    expect(omitUnverifiedImageParentLastmod(omitUnverifiedImageParentLastmod(original))).toBe(omitUnverifiedImageParentLastmod(original));
  });
  it("keeps generator offline with no alternative catalogue/private/network input or dist writes", () => {
    const generator = sourceFile("scripts/generate-sitemap-snapshots.ts");
    expect(generator).toContain("staticSitemapSnapshots");
    expect(generator).not.toMatch(/getDb|\.\/db|DATABASE_URL|fetch\(|https?\.get|locations\.json|counties_data\.json|industries_data\.json|services_data\.json|dist\/public/);
    expect(sourceFile("shared/sitemapPolicy.ts")).not.toMatch(/from ["'][^"']*\/db|process\.env|readFileSync|fetch\(/);
    for (const filename of ["scripts/update-sitemap-dates.mjs", "scripts/generate-sitemap.mjs"]) {
      const source = sourceFile(filename);
      expect(source).toContain("generate-sitemap-snapshots.ts");
      expect(source).not.toMatch(/new Date|<lastmod>|TODAY|\.replace\(/);
    }
    const pkg = JSON.parse(sourceFile("package.json"));
    expect(pkg.scripts.build.split(" && ")[0]).toBe("tsx scripts/generate-sitemap-snapshots.ts");
  });
  it("writes deterministic mirrors offline and deletes only the obsolete static blog snapshot", () => {
    const dir = mkdtempSync(join(tmpdir(), "csb-sitemap-test-"));
    const image = publicFile("sitemap-images.xml");
    try {
      vi.spyOn(console, "log").mockImplementation(() => {});
      writeFileSync(join(dir, "sitemap-images.xml"), image);
      writeFileSync(join(dir, "sitemap-blog.xml"), "obsolete membership");
      writeFileSync(join(dir, "untouched.txt"), "not owned");
      generateSitemapSnapshots(dir);
      for (const [file, xml] of Object.entries(staticSitemapSnapshots(asOf))) expect(readFileSync(join(dir, file), "utf8")).toBe(xml);
      expect(existsSync(join(dir, "sitemap-blog.xml"))).toBe(false);
      expect(readFileSync(join(dir, "sitemap-images.xml"), "utf8")).toBe(image);
      expect(readFileSync(join(dir, "untouched.txt"), "utf8")).toBe("not owned");
      vi.setSystemTime(new Date("2026-11-13T12:00:00Z"));
      generateSitemapSnapshots(dir);
      for (const [file, xml] of Object.entries(staticSitemapSnapshots(asOf))) expect(readFileSync(join(dir, file), "utf8")).toBe(xml);
      expect(db.getActiveGalleryItems).not.toHaveBeenCalled();
      expect(db.getPublishedBlogPosts).not.toHaveBeenCalled();
    } finally { rmSync(dir, { recursive: true, force: true }); }
  });
  it("retains runtime blog route and published-post helper contracts despite absent static blog", async () => {
    expect(existsSync(join(root, "client/public/sitemap-blog.xml"))).toBe(false);
    db.getPublishedBlogPosts.mockResolvedValue([{ slug: "published-fixture", createdAt: "2026-11-01", updatedAt: "2026-11-10" }]);
    const xml = await buildBlogSitemap();
    expect(pageLocations(xml)).toEqual([`${SITEMAP_SITE_URL}/blog/published-fixture`]);
    expect(db.getPublishedBlogPosts).toHaveBeenCalledOnce();
    expect(db.getPublishedBlogPosts).toHaveBeenCalledWith();
    const routes = new Map<string, (...args: any[]) => unknown>();
    const app = { get: (path: string, handler: (...args: any[]) => unknown) => routes.set(path, handler) };
    registerSitemapRoute(app as any);
    expect([...routes.keys()]).toEqual(["/sitemap.xml", "/sitemap-main.xml", "/sitemap-counties.xml", "/sitemap-service-areas.xml", "/sitemap-blog.xml"]);
    const res = { set: vi.fn(), send: vi.fn(), status: vi.fn() };
    await routes.get("/sitemap-blog.xml")!({}, res);
    expect(res.set).toHaveBeenCalledWith("Content-Type", "application/xml; charset=utf-8");
    expect(res.set).toHaveBeenCalledWith("Cache-Control", "public, max-age=3600");
    expect(res.send).toHaveBeenCalledWith(xml);
    expect(res.status).not.toHaveBeenCalled();
  });
});

describe("evidence-backed optional lastmod dates", () => {
  it.each([undefined, null, "", "invalid", 0, {}, [], new Date("invalid"), "2026-02-29", "2026-02-30", "2026-04-31", "2026-00-01", "2026-13-01", "2026-11-00", "2026-1-2", "0000-01-01", "2026-11-10T24:00:00Z", "2026-11-10T12:60:00Z", "2026-11-10T12:00:60Z", "2026-11-10T12:00:00+14:01", "2026-11-10T12:00:00+00:60", "2026-11-10T12:00:00", "2026-11-13", "2026-11-12T12:00:01Z", new Date("2026-11-13")])("omits missing, invalid, impossible or future date %s without a clock fallback", (value) => {
    expect(validSitemapLastmod(value, asOf)).toBeUndefined();
  });
  it.each([
    ["2024-02-29", "2024-02-29"], ["2026-11-12", "2026-11-12"],
    ["2026-11-10T23:30:00-01:00", "2026-11-11"],
    ["2026-11-10T10:20:30.123Z", "2026-11-10"],
    [new Date("2026-11-10T10:20:30Z"), "2026-11-10"],
  ])("accepts real relevant record date %s as %s", (value, expected) => {
    expect(validSitemapLastmod(value, asOf)).toBe(expected);
  });
  it("rejects an invalid validation ceiling and escapes XML without retaining invalid dates", () => {
    expect(validSitemapLastmod("2026-11-01", new Date("invalid"))).toBeUndefined();
    const xml = renderSitemapUrlSet([{ loc: "/blog/a&b", lastmod: "2026-02-30", changefreq: "weekly", priority: "0.7" }], asOf);
    expect(xml).toContain("/blog/a&amp;b</loc>");
    expect(xml).not.toContain("<lastmod>");
    expect(latestValidSitemapLastmod(["2026-10-01", "invalid", "2026-11-10", "2026-11-13"], asOf)).toBe("2026-11-10");
  });
  it("is byte-stable across days for static, index, gallery and blog fixtures", async () => {
    db.getActiveGalleryItems.mockResolvedValue([{ updatedAt: new Date("2026-11-10"), createdAt: new Date("2026-10-01") }]);
    db.getPublishedBlogPosts.mockResolvedValue([{ slug: "valid", updatedAt: "2026-11-10", createdAt: "2026-10-01" }, { slug: "unknown", updatedAt: null, createdAt: null }]);
    const dayOne = [await buildMainSitemap(), await buildBlogSitemap(), buildCountySitemap(), buildServiceAreaSitemap(), buildSitemapIndex()];
    const staticOne = staticSitemapSnapshots(asOf);
    vi.setSystemTime(new Date("2026-11-13T12:00:00Z"));
    const dayTwo = [await buildMainSitemap(), await buildBlogSitemap(), buildCountySitemap(), buildServiceAreaSitemap(), buildSitemapIndex()];
    expect(dayTwo).toEqual(dayOne);
    expect(staticSitemapSnapshots(new Date())).toEqual(staticOne);
    expect(dayOne.join("\n")).not.toContain("<lastmod>2026-11-12</lastmod>");
    expect(dayTwo.join("\n")).not.toContain("<lastmod>2026-11-13</lastmod>");
  });
  it("dates only our-work from valid active gallery content and omits unknown main dates", async () => {
    db.getActiveGalleryItems.mockResolvedValue([
      { updatedAt: "invalid", createdAt: null },
      { updatedAt: "2026-02-30", createdAt: null },
      { updatedAt: "2026-11-20", createdAt: null },
    ]);
    expect(await buildMainSitemap()).not.toContain("<lastmod>");
    db.getActiveGalleryItems.mockResolvedValue([
      { updatedAt: "2026-11-10", createdAt: "2026-11-01" },
      { updatedAt: "invalid", createdAt: "2026-10-15" },
    ]);
    const xml = await buildMainSitemap();
    expect(xml.match(/<lastmod>/g)).toHaveLength(1);
    expect(entry(xml, "/our-work")).toContain("<lastmod>2026-11-10</lastmod>");
    expect(entry(xml, "/")).not.toContain("<lastmod>");
  });
  it("changing one relevant gallery fixture affects only our-work and no unrelated sitemap", async () => {
    db.getActiveGalleryItems.mockResolvedValue([{ updatedAt: "2026-11-01", createdAt: "2026-10-01" }]);
    const first = await buildMainSitemap();
    const county = buildCountySitemap();
    const town = buildServiceAreaSitemap();
    const index = buildSitemapIndex();
    const blog = await buildBlogSitemap();
    db.getActiveGalleryItems.mockResolvedValue([{ updatedAt: "2026-11-10", createdAt: "2026-10-01" }]);
    expect(changedPaths(first, await buildMainSitemap())).toEqual(["/our-work"]);
    expect(buildCountySitemap()).toBe(county);
    expect(buildServiceAreaSitemap()).toBe(town);
    expect(buildSitemapIndex()).toBe(index);
    expect(await buildBlogSitemap()).toBe(blog);
    expect(publicFile("sitemap-main.xml")).not.toContain("<lastmod>");
  });
  it("uses valid published blog created/updated dates but never undated or future fallbacks", async () => {
    db.getPublishedBlogPosts.mockResolvedValue([
      { slug: "updated", updatedAt: "2026-11-10", createdAt: "2026-10-01" },
      { slug: "created", updatedAt: "invalid", createdAt: new Date("2026-11-02") },
      { slug: "unknown", updatedAt: null, createdAt: null },
      { slug: "invalid", updatedAt: "2026-02-30", createdAt: "bad" },
      { slug: "future", updatedAt: "2026-11-20", createdAt: "2026-11-21" },
    ]);
    const xml = await buildBlogSitemap();
    expect(pageLocations(xml)).toHaveLength(5); // Publication membership remains helper-owned.
    expect(xml.match(/<lastmod>/g)).toHaveLength(2);
    expect(entry(xml, "/blog/updated")).toContain("<lastmod>2026-11-10</lastmod>");
    expect(entry(xml, "/blog/created")).toContain("<lastmod>2026-11-02</lastmod>");
    for (const slug of ["unknown", "invalid", "future"]) expect(entry(xml, `/blog/${slug}`)).not.toContain("<lastmod>");
  });
  it("changing one published blog record affects only its own entry, not main or index", async () => {
    const records = [{ slug: "changed", updatedAt: "2026-11-01", createdAt: "2026-10-01" }, { slug: "unchanged", updatedAt: "2026-11-02", createdAt: "2026-10-01" }];
    db.getPublishedBlogPosts.mockResolvedValue(records);
    const first = await buildBlogSitemap();
    const main = await buildMainSitemap();
    const index = buildSitemapIndex();
    db.getPublishedBlogPosts.mockResolvedValue([{ ...records[0], updatedAt: "2026-11-10" }, records[1]]);
    expect(changedPaths(first, await buildBlogSitemap())).toEqual(["/blog/changed"]);
    expect(await buildMainSitemap()).toBe(main);
    expect(buildSitemapIndex()).toBe(index);
  });
  it("keeps existing DB-failure behaviour without inventing replacement dates", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    db.getActiveGalleryItems.mockRejectedValue(new Error("offline fixture"));
    expect(await buildMainSitemap()).toBe(staticSitemapSnapshots(asOf)["sitemap-main.xml"]);
    db.getPublishedBlogPosts.mockRejectedValue(new Error("offline fixture"));
    expect(await buildBlogSitemap()).toBe(renderSitemapUrlSet([], asOf));
  });
});
