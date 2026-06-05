import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BeforeAfterCardProps {
  beforeSrc: string;
  afterSrc: string;
  title: string;
  category?: string;
  description?: string;
  /** Called when the card body (not the slider) is clicked */
  onClick?: () => void;
  /** Extra class names applied to the outer wrapper */
  className?: string;
  /** Height of the image area — defaults to "h-56" */
  imageHeight?: string;
  /** Whether this card has a video (shows VIDEO badge instead) */
  videoSrc?: string;
}

/**
 * A card that shows before (left) and after (right) side-by-side with a
 * draggable centre divider — inspired by premierblasting.co.uk.
 *
 * The slider starts at 50 % and can be dragged left/right.
 * BEFORE label sits bottom-left, AFTER label sits bottom-right.
 */
export function BeforeAfterCard({
  beforeSrc,
  afterSrc,
  title,
  category,
  description,
  onClick,
  className = "",
  imageHeight = "h-56",
  videoSrc,
}: BeforeAfterCardProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation(); // don't bubble to card onClick
      setIsDragging(true);
      updateSlider(e.clientX);
    },
    [updateSlider]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.stopPropagation();
      setIsDragging(true);
      updateSlider(e.touches[0].clientX);
    },
    [updateSlider]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) updateSlider(e.clientX);
    },
    [isDragging, updateSlider]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging) updateSlider(e.touches[0].clientX);
    },
    [isDragging, updateSlider]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div
      className={`group relative overflow-hidden rounded-xl shadow-md bg-white cursor-pointer
        hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out ${className}`}
      onClick={onClick}
    >
      {/* ── Image area ── */}
      {videoSrc ? (
        <div className={`relative ${imageHeight} overflow-hidden`}>
          <video
            src={videoSrc}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => {
              e.currentTarget.pause();
              e.currentTarget.currentTime = 0;
            }}
          />
          <div className="absolute top-3 left-3">
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded font-medium">
              VIDEO
            </span>
          </div>
        </div>
      ) : (
        <div
          ref={containerRef}
          className={`relative ${imageHeight} overflow-hidden select-none`}
          style={{ cursor: isDragging ? "col-resize" : "col-resize" }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={(e) => e.stopPropagation()} // slider area doesn't fire card onClick
        >
          {/* AFTER image — full width, sits below */}
          <img
            src={afterSrc}
            alt={`${title} — After`}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
            loading="lazy"
          />

          {/* BEFORE image — clipped to left portion */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src={beforeSrc}
              alt={`${title} — Before`}
              className="absolute inset-0 h-full object-cover"
              style={{
                width: `${(100 / Math.max(sliderPos, 0.1)) * 100}%`,
                maxWidth: "none",
              }}
              draggable={false}
              loading="lazy"
            />
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_6px_rgba(0,0,0,0.5)] pointer-events-none"
            style={{ left: `calc(${sliderPos}% - 1px)` }}
          />

          {/* Drag handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-white rounded-full shadow-xl flex items-center justify-center pointer-events-none ring-2 ring-white/60"
            style={{ left: `${sliderPos}%` }}
          >
            <ChevronLeft className="w-3 h-3 text-gray-600" />
            <ChevronRight className="w-3 h-3 text-gray-600" />
          </div>

          {/* BEFORE / AFTER labels — bottom corners */}
          <div className="absolute bottom-3 left-3 pointer-events-none">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow">
              BEFORE
            </span>
          </div>
          <div className="absolute bottom-3 right-3 pointer-events-none">
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow">
              AFTER
            </span>
          </div>

          {/* Category badge — top left */}
          {category && (
            <div className="absolute top-3 left-3 pointer-events-none">
              <span className="bg-[#2C5F7F]/90 text-white text-xs font-medium px-2 py-0.5 rounded shadow">
                {category}
              </span>
            </div>
          )}
        </div>
      )}

      {/* ── Text area ── */}
      <div className="p-4">
        <h3
          className="text-[#2C2C2C] font-semibold text-base leading-snug mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h3>
        {description && (
          <p className="text-gray-500 text-sm line-clamp-2">{description}</p>
        )}
        <p className="text-[#2C5F7F] text-xs font-semibold mt-2 group-hover:translate-x-0.5 transition-transform duration-200">
          View full project →
        </p>
      </div>
    </div>
  );
}
