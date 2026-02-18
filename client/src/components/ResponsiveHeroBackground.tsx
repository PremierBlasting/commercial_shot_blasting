import { useEffect, useState } from 'react';

// Hero carousel images with their responsive variants
const heroImages = [
  { base: '/hero-carousel-1.webp', sizes: { '640w': '/hero-carousel-1-640w.webp', '1024w': '/hero-carousel-1-1024w.webp' } },
  { base: '/operator-blasting-gate.webp', sizes: { '640w': '/operator-blasting-gate-640w.webp', '1024w': '/operator-blasting-gate-1024w.webp' } },
  { base: '/operator-warehouse-interior.webp', sizes: { '640w': '/operator-warehouse-interior-640w.webp' } },
  { base: '/hero-carousel-1.webp', sizes: { '640w': '/hero-carousel-1-640w.webp', '1024w': '/hero-carousel-1-1024w.webp' } },
  { base: '/hero-carousel-2.webp', sizes: { '640w': '/hero-carousel-2-640w.webp', '1024w': '/hero-carousel-2-1024w.webp' } },
  { base: '/hero-carousel-3.webp', sizes: { '640w': '/hero-carousel-3-640w.webp', '1024w': '/hero-carousel-3-1024w.webp' } },
  { base: '/hero-carousel-4.webp', sizes: { '640w': '/hero-carousel-4-640w.webp' } },
  { base: '/hero-carousel-5.webp', sizes: { '640w': '/hero-carousel-5-640w.webp' } },
  { base: '/hero-carousel-6.webp', sizes: { '640w': '/hero-carousel-6-640w.webp', '1024w': '/hero-carousel-6-1024w.webp' } },
  { base: '/hero-carousel-7.webp', sizes: { '640w': '/hero-carousel-7-640w.webp', '1024w': '/hero-carousel-7-1024w.webp' } },
  { base: '/hero-carousel-8.webp', sizes: { '640w': '/hero-carousel-8-640w.webp', '1024w': '/hero-carousel-8-1024w.webp' } },
  { base: '/hero-carousel-9.webp', sizes: { '640w': '/hero-carousel-9-640w.webp', '1024w': '/hero-carousel-9-1024w.webp' } },
  { base: '/hero-carousel-10.webp', sizes: { '640w': '/hero-carousel-10-640w.webp', '1024w': '/hero-carousel-10-1024w.webp', '1920w': '/hero-carousel-10-1920w.webp' } },
  { base: '/hero-carousel-11.webp', sizes: { '640w': '/hero-carousel-11-640w.webp', '1024w': '/hero-carousel-11-1024w.webp', '1920w': '/hero-carousel-11-1920w.webp' } },
];

// Animation delays for each image (in seconds)
const animationDelays = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65];

function getResponsiveImageUrl(image: typeof heroImages[0], width: number): string {
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

export function ResponsiveHeroBackground() {
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0">
      {heroImages.map((image, index) => {
        const imageUrl = getResponsiveImageUrl(image, screenWidth);
        const isFirst = index === 0;
        
        return (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center ${isFirst ? 'opacity-30' : 'opacity-0'}`}
            style={{
              backgroundImage: `url('${imageUrl}')`,
              willChange: isFirst ? 'opacity' : 'auto',
              animation: isFirst ? 'none' : `fadeInOut 70s ease-in-out infinite ${animationDelays[index]}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export default ResponsiveHeroBackground;
