interface ResponsiveProjectImage {
  src: string;
  srcSet?: string;
  width?: number;
  height?: number;
}

// These are the same approved photos already used by the Wigan case-study page.
// Original project records stay intact; unregistered images are never rewritten.
const projectImages: Record<string, ResponsiveProjectImage> = {
  "/manus-storage/iss-property-former-bakkavor-wigan-before-2026-09-15_a00636db.png": {
    src: "/images/case-studies/iss-property-wigan-before-960.webp",
    srcSet: "/images/case-studies/iss-property-wigan-before-640.webp 640w, /images/case-studies/iss-property-wigan-before-960.webp 960w",
    width: 960,
    height: 585,
  },
  "/manus-storage/iss-property-former-bakkavor-wigan-after-2026-09-15_21aa25d4.png": {
    src: "/images/case-studies/iss-property-wigan-after-960.webp",
    srcSet: "/images/case-studies/iss-property-wigan-after-640.webp 640w, /images/case-studies/iss-property-wigan-after-960.webp 960w",
    width: 960,
    height: 606,
  },
};

export function responsiveProjectImage(originalSrc: string): ResponsiveProjectImage {
  return projectImages[originalSrc] ?? { src: originalSrc };
}
