import { useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "sync" | "auto";
  style?: React.CSSProperties;
}

/**
 * LazyImage — a lightweight wrapper around <img> that adds:
 * - Animated skeleton placeholder while the image loads
 * - Smooth fade-in once the image is ready
 * - All native lazy loading attributes passed through
 *
 * Use this for below-the-fold images that don't need the full
 * OptimizedImage (thumbnail preview + WebP switching) treatment.
 */
export function LazyImage({
  src,
  alt,
  className = "",
  width,
  height,
  loading = "lazy",
  fetchPriority,
  decoding = "async",
  style,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className="relative block overflow-hidden" style={{ width: width ? `${width}px` : undefined, height: height ? `${height}px` : undefined }}>
      {/* Skeleton shown until image loads */}
      {!loaded && (
        <span
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        // @ts-expect-error fetchpriority is a valid HTML attribute not yet in React types
        fetchpriority={fetchPriority}
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        style={style}
      />
    </span>
  );
}
