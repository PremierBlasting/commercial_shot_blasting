import { useEffect, useState, useCallback } from 'react';

// Hero carousel — 7 images (down from 14) to halve CSS animation work and background-image fetches.
// Each animated image is visible for ~7s; full cycle = 42s.
// Index 0 is the LCP element rendered as a real <img> tag.
// Indices 1–6 are CSS background-image divs (not LCP-critical).
const heroImages = [
  // 0 — LCP image (img tag, fetchpriority=high)
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/YScoptyBJOkODpiP.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/IaTezxmvYekRWxDg.webp', '1024w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oVxyFBqOSqiFnIqt.webp' } },
  // 1
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/pqOtoTHQuOwbPOLz.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/XKlLlCHzZpTTWuny.webp', '1024w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/WlgUvDfPkrrXlejg.webp' } },
  // 2
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/NoeGzcOAyORWbgxz.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/gkavEmLZDzrMTWcP.webp', '1024w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/kZndaBVWsUcdwHni.webp' } },
  // 3
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/TiCUsbsOYeeHdpkl.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/JVQrXgYBjpNYcZtI.webp', '1024w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/cWyQGkVlWGsBAIyt.webp' } },
  // 4
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/zIjthhhcbMiPBcQV.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/cLzlkrBcbIVUpdEp.webp', '1024w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yfLRHDSKOlbmKTqX.webp' } },
  // 5
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/gHwrrbDLYGcXYYgA.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/ePsTUvbFccLyDbOZ.webp', '1024w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/HCLJEkcrYROUsrNa.webp' } },
  // 6
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/KHFNaLmMCxeAcDHU.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/jtmxbELXXgjBXgEv.webp', '1024w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/gdkZsebrzNLTgsHS.webp', '1920w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/creSgmtwmDqfKigK.webp' } },
];

// Each animated image has a 42s cycle (7 images × 6s visible each).
// Delays stagger the images so only one is visible at a time.
// Images 1–6 start at 6s, 12s, 18s, 24s, 30s, 36s respectively.
const CYCLE_DURATION = 42; // seconds — total animation cycle
const animationDelays = [6, 12, 18, 24, 30, 36]; // for indices 1–6

// First hero image srcset — used for both the <img> tag and the <link rel="preload"> hint
export const HERO_FIRST_IMAGE = heroImages[0];
export const HERO_FIRST_SRCSET =
  `${heroImages[0].sizes['640w'] ?? heroImages[0].base} 640w, ` +
  `${heroImages[0].sizes['1024w'] ?? heroImages[0].base} 1024w, ` +
  `${heroImages[0].base} 1920w`;
export const HERO_FIRST_SIZES = '(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px';

function getResponsiveImageUrl(image: typeof heroImages[0], width: number): string {
  if (width <= 640 && image.sizes['640w']) {
    return image.sizes['640w'];
  }
  if (width <= 1024 && image.sizes['1024w']) {
    return image.sizes['1024w'];
  }
  if (image.sizes['1920w']) {
    return image.sizes['1920w'];
  }
  return image.base;
}

export function ResponsiveHeroBackground() {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1920
  );

  // Debounced resize handler — avoids continuous layout recalculation on resize
  const handleResize = useCallback(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(timer);
      timer = setTimeout(handleResize, 150);
    };
    window.addEventListener('resize', debouncedResize, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', debouncedResize);
    };
  }, [handleResize]);

  return (
    <div className="absolute inset-0">
      {/* ── Index 0: real <img> tag — discoverable by browser preload scanner ── */}
      <img
        src={heroImages[0].base}
        srcSet={HERO_FIRST_SRCSET}
        sizes={HERO_FIRST_SIZES}
        alt="Commercial shot blasting surface preparation"
        fetchPriority="high"
        loading="eager"
        decoding="sync"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
        width={1920}
        height={1080}
      />

      {/* ── Indices 1–6: CSS background-image animated carousel ── */}
      {heroImages.slice(1).map((image, idx) => {
        const imageUrl = getResponsiveImageUrl(image, screenWidth);
        return (
          <div
            key={idx + 1}
            className="absolute inset-0 bg-cover bg-center opacity-0"
            style={{
              backgroundImage: `url('${imageUrl}')`,
              animation: `fadeInOut ${CYCLE_DURATION}s ease-in-out infinite ${animationDelays[idx]}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export default ResponsiveHeroBackground;
