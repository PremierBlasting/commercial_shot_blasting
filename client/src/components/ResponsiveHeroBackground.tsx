import { useEffect, useState, useCallback } from 'react';

// Hero carousel images with their responsive variants
// First image is the LCP element — rendered as <img fetchpriority="high">
// Subsequent images use CSS background-image (off-screen/faded, not LCP-critical)
const heroImages = [
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/YScoptyBJOkODpiP.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/IaTezxmvYekRWxDg.webp', '1024w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oVxyFBqOSqiFnIqt.webp' } },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/pqOtoTHQuOwbPOLz.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/XKlLlCHzZpTTWuny.webp', '1024w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/WlgUvDfPkrrXlejg.webp' } },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/tfkLEZPoVbsKeTFt.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/shnTUJIvAuSqyYuk.webp' } },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/YScoptyBJOkODpiP.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/IaTezxmvYekRWxDg.webp', '1024w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oVxyFBqOSqiFnIqt.webp' } },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/NoeGzcOAyORWbgxz.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/gkavEmLZDzrMTWcP.webp', '1024w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/kZndaBVWsUcdwHni.webp' } },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/TiCUsbsOYeeHdpkl.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/JVQrXgYBjpNYcZtI.webp', '1024w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/cWyQGkVlWGsBAIyt.webp' } },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/TAaxJUYrnQuocQjH.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/YIlcOYLZKMFfJPVN.webp' } },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/SRCHoZWLPbipfJBV.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oVUgrJspUxHIJlzq.webp' } },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/zIjthhhcbMiPBcQV.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/cLzlkrBcbIVUpdEp.webp', '1024w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yfLRHDSKOlbmKTqX.webp' } },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/MrbweNYAwvmHQYLn.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/fbHnyhFWcXYvtcCG.webp', '1024w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/edUaNDiKBVUSMBjy.webp' } },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/gHwrrbDLYGcXYYgA.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/ePsTUvbFccLyDbOZ.webp', '1024w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/HCLJEkcrYROUsrNa.webp' } },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/zMWHVWZqVTPFXKRc.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/waVHDpCAkKYwIOCE.webp', '1024w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/CPvNOsMChQlXUtRV.webp' } },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/bMjgkbPUdxQNzwFm.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/PHumNKUQaaOHvgeR.webp', '1024w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/TzdytIZGBYJOKqLw.webp', '1920w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/LuKWLMBEFEImWkum.webp' } },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/KHFNaLmMCxeAcDHU.webp', sizes: { '640w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/jtmxbELXXgjBXgEv.webp', '1024w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/gdkZsebrzNLTgsHS.webp', '1920w': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/creSgmtwmDqfKigK.webp' } },
];

// Animation delays for images 1–13 (index 0 is static LCP image)
const animationDelays = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65];

// First hero image srcset — used for both the <img> tag and the preload hint
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
      {/* ── First image: real <img> tag so the browser preload scanner discovers it ── */}
      {/* fetchpriority="high" + loading="eager" tells the browser this is the LCP element */}
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

      {/* ── Images 1–13: CSS background-image (animated carousel, not LCP-critical) ── */}
      {/* Only apply willChange to the currently-animating element, not all at once */}
      {heroImages.slice(1).map((image, idx) => {
        const imageUrl = getResponsiveImageUrl(image, screenWidth);
        return (
          <div
            key={idx + 1}
            className="absolute inset-0 bg-cover bg-center opacity-0"
            style={{
              backgroundImage: `url('${imageUrl}')`,
              animation: `fadeInOut 70s ease-in-out infinite ${animationDelays[idx]}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export default ResponsiveHeroBackground;
