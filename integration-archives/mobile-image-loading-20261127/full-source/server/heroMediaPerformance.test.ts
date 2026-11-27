import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const homePage = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const heroVideoHook = readFileSync(resolve(projectRoot, "client/src/hooks/useDecorativeVideo.ts"), "utf8");
const intumescentPage = readFileSync(resolve(projectRoot, "client/src/pages/IntumescentPaintingPage.tsx"), "utf8");

function between(source: string, start: string, end: string) {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end, startIndex);
  expect(startIndex).toBeGreaterThan(-1);
  expect(endIndex).toBeGreaterThan(startIndex);
  return source.slice(startIndex, endIndex);
}

describe("poster-first hero media", () => {
  it("keeps the homepage hero poster-first while deferring the decorative HB Tunnelling background", () => {
    const hero = between(homePage, "{/* Hero Section */}", "{/* Case Studies Section */}");

    expect(hero).toContain("HOME_HERO_POSTER");
    expect(hero).toContain("HOME_HERO_MOBILE_POSTER");
    expect(hero).toContain('fetchPriority="high"');
    expect(hero).toContain('loading="eager"');
    expect(homePage).toContain("HOME_HERO_VIDEO");
    expect(homePage).toContain("HOME_HERO_MOBILE_VIDEO");
    expect(homePage).toContain('hb-tunnelling-doncaster-hero-loop-before-end-card-optimised_91fc60b0.mp4');
    expect(homePage).toContain('hb-tunnelling-doncaster-mobile-hero_9b3923bc.mp4');
    expect(homePage).toContain("shouldLoadHeroVideo");
    expect(heroVideoHook).toContain("prefers-reduced-motion: reduce");
    expect(hero).toContain("shouldLoadHeroVideo &&");
    expect(hero).toContain("<video");
    expect(hero).toContain("autoPlay");
    expect(hero).toContain("muted");
    expect(hero).toContain("loop");
    expect(hero).toContain("playsInline");
    expect(hero).toContain('preload="metadata"');
    expect(hero).toContain('aria-hidden="true"');
    expect(hero).toContain("disablePictureInPicture");
    expect(hero).toContain("onCanPlay={() => setHeroVideoReady(true)}");
    expect(hero).toContain("transition-opacity duration-700");
    expect(hero).toContain('heroVideoReady ? "opacity-100" : "opacity-0"');
    expect(hero).toContain('<source media="(max-width: 767px)" srcSet={HOME_HERO_MOBILE_POSTER} />');
    expect(hero).toContain('<source media="(max-width: 767px)" src={HOME_HERO_MOBILE_VIDEO} type="video/mp4" />');
    expect(hero).not.toContain('preload="auto"');
    expect(hero).not.toContain("controls");
    expect(homePage).not.toContain("home-hero-video-schema");
  });

  it("uses a high-priority still image for the intumescent hero and keeps project footage opt-in", () => {
    const hero = between(intumescentPage, "{/* ── Hero", "{/* ── Trust bar");

    expect(hero).toContain("src={IMG.hero}");
    expect(hero).toContain('fetchPriority="high"');
    expect(hero).toContain('loading="eager"');
    expect(hero).not.toContain("<video");
    expect(hero).not.toContain("HERO_VIDEO");
    expect(hero).toContain('href="#project-video"');
    expect(intumescentPage).toContain('<section id="project-video"');
  });

  it("keeps Intumescent Painting coverage aligned to nationwide service", () => {
    expect(intumescentPage).toContain("nationwide");
    expect(intumescentPage).toContain('"name": "United Kingdom"');
    expect(intumescentPage).not.toContain('"name": "England"');
    expect(intumescentPage).not.toContain('"name": "Wales"');
  });
});
