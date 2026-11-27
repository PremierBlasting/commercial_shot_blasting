import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const html = readFileSync(resolve(root, "client/index.html"), "utf8");
const home = readFileSync(resolve(root, "client/src/pages/Home.tsx"), "utf8");
const main = readFileSync(resolve(root, "client/src/main.tsx"), "utf8");
const worker = readFileSync(resolve(root, "client/public/sw.js"), "utf8");

describe("website does not advertise app installation", () => {
  it("blocks hosting-injected app manifests before resource discovery", () => {
    const policy = `<meta http-equiv="Content-Security-Policy" content="manifest-src 'none'" />`;
    expect(html.split(policy)).toHaveLength(2);
    expect(html.indexOf(policy)).toBeLessThan(html.indexOf('<meta\n      name="viewport"'));
  });

  it("sets only manifest-src, without restricting scripts, forms, media or workers", () => {
    const policies = [...html.matchAll(/<meta\b[^>]*http-equiv="Content-Security-Policy"[^>]*content="([^"]+)"/gi)];
    expect(policies.map(match => match[1])).toEqual(["manifest-src 'none'"]);
  });

  it("does not link an app manifest from the shared HTML template", () => {
    expect(html).not.toMatch(/<link\b[^>]*\brel=["'][^"']*\bmanifest\b/i);
    expect(html).not.toContain("/manifest.json");
  });

  it("does not opt into mobile standalone app display", () => {
    expect(html).not.toMatch(/<meta\b[^>]*\bname=["'](?:apple-)?mobile-web-app-capable["']/i);
  });

  it("omits app-only Apple title and status-bar metadata", () => {
    expect(html).not.toContain("apple-mobile-web-app-title");
    expect(html).not.toContain("apple-mobile-web-app-status-bar-style");
  });

  it("preserves the normal favicon and optional home-screen icon", () => {
    expect(html).toContain('<link rel="icon" type="image/svg+xml"');
    expect(html).toContain('<link rel="apple-touch-icon"');
  });

  it("preserves the normal browser theme colour", () => {
    expect(html).toContain('<meta name="theme-color" content="#2C5F7F" />');
  });

  it("retains worker registration instead of deleting visitor caches", () => {
    expect(main).toContain(".register('/sw.js', { scope: '/' })");
    expect(main).not.toContain(".unregister(");
    expect(main).not.toContain("caches.delete(");
  });

  it("retains network-first navigation and verified asset cache strategies", () => {
    expect(worker).toContain("networkFirstStaticAsset(request, STATIC_CACHE)");
    expect(worker).toContain("hasExpectedStaticContentType(request, response)");
    expect(worker).toContain("request.mode === 'navigate'");
    expect(worker).toContain("networkFirst(request, STATIC_CACHE)");
    expect(worker).toContain("url.pathname.startsWith('/api/')");
  });

  it("preserves the SSR rendering root, entry module and actual priority hero poster", () => {
    expect(html).toContain('<div id="root"><!--RENDERING_PILOT_ROOT--></div>');
    expect(html).toContain('src="/src/main.tsx"');
    expect(home).toContain('src={HOME_HERO_POSTER}');
    expect(home).toContain('srcSet={HOME_HERO_MOBILE_POSTER}');
    expect(home).toContain('fetchPriority="high"');
    expect(home).toContain('loading="eager"');
    expect(html).not.toContain("YScoptyBJOkODpiP");
  });
});
