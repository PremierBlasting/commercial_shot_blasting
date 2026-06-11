import { ReactNode, useEffect, useState } from "react";

interface HeroCarouselProps {
  children: ReactNode;
  className?: string;
  /** Optional county/location-specific image shown as the first (static) background slide */
  primaryImage?: string;
  /** Accessible label for the hero section, e.g. 'Shot blasting services in Birmingham' */
  heroAlt?: string;
}

// Hero carousel images - real job site photos (no people, no signs)
const heroImages = [
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/UjSNpyqCeEUxElPP.webp', sizes: {} },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/eujkoesZcJTxNAzk.webp', sizes: {} },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/UhOtVLOfPobtqyhi.webp', sizes: {} },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yEbPReqUussVzDSr.webp', sizes: {} },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/xRNbdXezEbVeGwhe.webp', sizes: {} },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/QRpJYgxdNmiyqvIK.webp', sizes: {} },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oIKBPlRyGOSKXcAl.webp', sizes: {} },
  { base: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/okcUjGBJyNattGJb.webp', sizes: {} },
];

// Animation delays for each image (in seconds)
const animationDelays = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65];

function getResponsiveImageUrl(image: { base: string; sizes: Record<string, string> }, width: number): string {
  if (width <= 640 && image.sizes['640w']) {
    return image.sizes['640w'];
  }
  if (width <= 1024 && image.sizes['1024w']) {
    return image.sizes['1024w'];
  }
  if (width <= 1920 && image.sizes['1920w']) {
    return image.sizes['1920w'];
  }
  return image.base;
}

/**
 * HeroCarousel component - Animated background carousel with responsive images
 * Used across homepage and all service area pages for consistent visual experience
 * Automatically serves appropriately sized images based on screen width
 */
export function HeroCarousel({ children, className = "", primaryImage, heroAlt }: HeroCarouselProps) {
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      className={`relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white overflow-hidden ${className}`}
      aria-label={heroAlt}
    >
      {/* Animated Background Carousel - Responsive Images */}
      <div className="absolute inset-0">
        {/* County/location-specific primary image shown first (static, no animation) */}
        {primaryImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{ backgroundImage: `url('${primaryImage}')` }}
          />
        )}
        {/* Generic industrial carousel images (animated, shown when no primaryImage or cycling after) */}
        {heroImages.map((image, index) => {
          const imageUrl = getResponsiveImageUrl(image, screenWidth);
          // When primaryImage is set, all carousel images are animated (none static)
          const isFirst = !primaryImage && index === 0;
          
          return (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center ${isFirst ? 'opacity-30' : 'opacity-0'}`}
              style={{
                backgroundImage: `url('${imageUrl}')`,
                willChange: isFirst ? 'opacity' : 'auto',
                // When primaryImage is set, start carousel animations after a delay so primary shows first
                animation: isFirst ? 'none' : `fadeInOut 70s ease-in-out infinite ${primaryImage ? animationDelays[index] + 10 : animationDelays[index]}s`,
              }}
            />
          );
        })}
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a3d52]/80 via-[#2C5F7F]/60 to-transparent"></div>
      
      {/* Content */}
      <div className="container relative z-10">
        {children}
      </div>
    </section>
  );
}
