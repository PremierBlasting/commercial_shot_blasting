import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import { CaseStudies } from "../client/src/components/CaseStudies";
import { responsiveProjectImage } from "../client/src/lib/responsiveProjectImages";
import { restoreBeforeMobileLoading } from "./fixtures/mobileLoadingScope";

const previousReact = (globalThis as { React?: typeof React }).React;
beforeAll(() => { (globalThis as { React?: typeof React }).React = React; });
afterAll(() => { (globalThis as { React?: typeof React }).React = previousReact; });

const root = resolve(import.meta.dirname, "..");
const source = (path: string) => readFileSync(resolve(root, path), "utf8");
const before = "/manus-storage/iss-property-former-bakkavor-wigan-before-2026-09-15_a00636db.png";
const after = "/manus-storage/iss-property-former-bakkavor-wigan-after-2026-09-15_21aa25d4.png";
const markup = () => renderToStaticMarkup(React.createElement(Router, { ssrPath: "/" }, React.createElement(CaseStudies)));

describe("mobile project-image loading repair", () => {
  it("uses only known derivatives of the same approved before/after photographs", () => {
    expect(responsiveProjectImage(before)).toEqual({ src: "/images/case-studies/iss-property-wigan-before-960.webp", srcSet: "/images/case-studies/iss-property-wigan-before-640.webp 640w, /images/case-studies/iss-property-wigan-before-960.webp 960w", width: 960, height: 585 });
    expect(responsiveProjectImage(after)).toEqual({ src: "/images/case-studies/iss-property-wigan-after-960.webp", srcSet: "/images/case-studies/iss-property-wigan-after-640.webp 640w, /images/case-studies/iss-property-wigan-after-960.webp 960w", width: 960, height: 606 });
    for (const original of ["https://example.com/image.png?signature=opaque", "/unknown-image.png", "/manus-storage/bromsgrove-staircase-after_ae521dcd.png"]) {
      expect(responsiveProjectImage(original)).toEqual({ src: original });
    }
  });

  it("delivers a visible native lazy image with responsive sources in initial HTML", () => {
    const html = markup();
    const firstImage = html.match(/<img\b[^>]*>/)?.[0] ?? "";
    expect(firstImage).toContain('src="/images/case-studies/iss-property-wigan-after-960.webp"');
    expect(firstImage).toContain('srcSet="/images/case-studies/iss-property-wigan-after-640.webp 640w, /images/case-studies/iss-property-wigan-after-960.webp 960w"');
    expect(firstImage).toContain('sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"');
    expect(firstImage).toContain('width="960" height="606"');
    expect(firstImage).toContain('loading="lazy"');
    expect(firstImage).toContain('decoding="async"');
    expect(firstImage).not.toContain("opacity-0");
    expect(html.match(/<img\b/g)).toHaveLength(9);
  });

  it("retains the current card facts, original project media and accessible destinations", () => {
    const html = markup();
    for (const text of ["ISS Property — Former Bakkavor Foods Facility", "Wigan, Greater Manchester", "10 days", "View Results", "View case study", "In progress"]) expect(html).toContain(text);
    expect(html).toContain('href="/case-studies/iss-property-former-bakkavor-foods-facility-wigan"');
    const file = source("client/src/components/CaseStudies.tsx");
    expect(file).toContain(before); expect(file).toContain(after);
    expect(file).toContain('key={imgSrc}');
    expect(file).toContain('target.removeAttribute("srcset")');
    expect(file).toContain('target.src = imgSrc');
    expect(file).toContain('if (target.getAttribute("src") === imgSrc) return;');
  });

  it("removes only the obsolete preload and retains real poster-first and opt-in film contracts", () => {
    const html = source("client/index.html");
    for (const obsolete of ["YScoptyBJOkODpiP", "IaTezxmvYekRWxDg", "oVxyFBqOSqiFnIqt"]) expect(html).not.toContain(obsolete);
    expect(html).toContain('content="manifest-src \'none\'"');
    expect(html).toContain('<div id="root"><!--RENDERING_PILOT_ROOT--></div>');
    const home = source("client/src/pages/Home.tsx");
    expect(home).toContain('fetchPriority="high"'); expect(home).toContain('loading="eager"');
    expect(home).toContain('src={HOME_HERO_MOBILE_VIDEO}');
    const belowFold = home.slice(home.indexOf('src="/manus-storage/all3_3c7034df.mp4"'));
    expect(belowFold).toContain('preload="none"'); expect(belowFold).toContain("controls");
    const film = source("client/src/components/HBTunnellingProjectFilm.tsx");
    expect(film).toContain("{playRequested ? ("); expect(film).toContain('preload="none"');
  });

  it("reverses only exact approved media deltas and rejects unrelated source edits", () => {
    for (const file of ["client/index.html", "client/src/pages/Home.tsx", "client/src/components/CaseStudies.tsx"]) {
      const current = source(file);
      const restored = restoreBeforeMobileLoading(file, current);
      expect(restoreBeforeMobileLoading(file, restored)).toBe(restored);
      expect(() => restoreBeforeMobileLoading(file, current + "\n// unrelated edit\n")).toThrow();
    }
  });
});
