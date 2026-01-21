import { useState, useRef, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  thumbnailSrc?: string;
  webpSrc?: string;
  loading?: "lazy" | "eager";
  onLoad?: () => void;
}

/**
 * OptimizedImage component with:
 * - Lazy loading using Intersection Observer
 * - WebP support with fallback
 * - Thumbnail placeholder while loading
 * - Smooth fade-in animation
 */
export function OptimizedImage({
  src,
  alt,
  className = "",
  thumbnailSrc,
  webpSrc,
  loading = "lazy",
  onLoad,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(loading === "eager");
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Set up Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === "eager") {
      setIsInView(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: "100px", // Start loading 100px before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loading]);

  // Load image when in view
  useEffect(() => {
    if (!isInView) return;

    // Determine best source (WebP if available and supported)
    const loadSrc = webpSrc || src;
    
    // Preload the image
    const img = new Image();
    img.onload = () => {
      setCurrentSrc(loadSrc);
      setIsLoaded(true);
      onLoad?.();
    };
    img.onerror = () => {
      // Fallback to original src if WebP fails
      if (loadSrc !== src) {
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
          setCurrentSrc(src);
          setIsLoaded(true);
          onLoad?.();
        };
        fallbackImg.src = src;
      } else {
        setCurrentSrc(src);
        setIsLoaded(true);
      }
    };
    img.src = loadSrc;
  }, [isInView, src, webpSrc, onLoad]);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Thumbnail placeholder */}
      {thumbnailSrc && !isLoaded && (
        <img
          src={thumbnailSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
        />
      )}
      
      {/* Skeleton placeholder if no thumbnail */}
      {!thumbnailSrc && !isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Main image */}
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}

/**
 * Helper function to generate WebP URL from original URL
 * Assumes WebP versions are stored with .webp extension
 */
export function getWebPUrl(originalUrl: string): string | undefined {
  if (!originalUrl) return undefined;
  
  // If already WebP, return as-is
  if (originalUrl.endsWith(".webp")) return originalUrl;
  
  // For S3 URLs, replace extension with .webp
  const urlParts = originalUrl.split(".");
  if (urlParts.length > 1) {
    urlParts[urlParts.length - 1] = "webp";
    return urlParts.join(".");
  }
  
  return undefined;
}

/**
 * Helper function to generate thumbnail URL from original URL
 * Assumes thumbnails are stored with -thumb.webp suffix
 */
export function getThumbnailUrl(originalUrl: string): string | undefined {
  if (!originalUrl) return undefined;
  
  // For S3 URLs, insert -thumb before extension
  const lastDotIndex = originalUrl.lastIndexOf(".");
  if (lastDotIndex > 0) {
    return originalUrl.substring(0, lastDotIndex) + "-thumb.webp";
  }
  
  return undefined;
}
