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
 * A "swipe to compare" hint fades in then out on first mount.
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
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const [afterLoaded, setAfterLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate the slider handle left→right on first mount as a visual hint,
  // then fade out the text hint after 2 s.
  useEffect(() => {
    // Animate slider from 50 → 30 → 70 → 50 to hint at draggability
    let frame: number;
    let start: number | null = null;
    const duration = 1200; // ms for the full animation

    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Ease in-out sine wave: 50 + 20*sin(2π*progress)
      const pos = 50 + 20 * Math.sin(2 * Math.PI * progress);
      setSliderPos(pos);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setSliderPos(50);
      }
    };

    // Start animation after a short delay so images can load first
    const timer = setTimeout(() => {
      frame = requestAnimationFrame(animate);
    }, 600);

    // Fade out hint text after 2.8 s
    const hintTimer = setTimeout(() => setHintVisible(false), 2800);

    return () => {
      clearTimeout(timer);
      clearTimeout(hintTimer);
      cancelAnimationFrame(frame);
    };
  }, []); // run once on mount

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
    if (!hasInteracted) setHasInteracted(true);
  }, [hasInteracted]);

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

  // Determine whether we have both images for the slider
  const hasBothImages = !!(beforeSrc && afterSrc && beforeSrc !== afterSrc);

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
      ) : hasBothImages ? (
        /* ── Before/After slider ── */
        <div
          ref={containerRef}
          className={`relative ${imageHeight} overflow-hidden select-none`}
          style={{ cursor: "col-resize" }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Skeleton shimmer — shown until both images load */}
          {(!afterLoaded || !beforeLoaded) && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}

          {/* AFTER image — full width base layer (always visible on right side) */}
          <img
            src={afterSrc}
            alt={`${title} — After`}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
            loading="lazy"
            onLoad={() => setAfterLoaded(true)}
          />

          {/* BEFORE image — clipped to left portion; drag slider right to reveal more AFTER */}
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
              onLoad={() => setBeforeLoaded(true)}
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

          {/* Swipe-to-compare hint — fades out after interaction or timeout */}
          {!hasInteracted && (
            <div
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none"
              style={{
                opacity: hintVisible ? 1 : 0,
                transition: "opacity 600ms ease",
              }}
            >
              <span className="flex items-center gap-1.5 bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                {/* Finger/swipe icon */}
                <svg
                  className="w-3.5 h-3.5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 11V6a2 2 0 0 1 4 0v5" />
                  <path d="M13 11V8a2 2 0 0 1 4 0v3" />
                  <path d="M17 11a2 2 0 0 1 4 0v3a8 8 0 0 1-8 8H9a8 8 0 0 1-8-8v-1a2 2 0 0 1 4 0" />
                </svg>
                Swipe to compare
              </span>
            </div>
          )}
        </div>
      ) : (
        /* ── Single image fallback (no after image available) ── */
        <div className={`relative ${imageHeight} overflow-hidden`}>
          {/* Skeleton shimmer for single image */}
          {!beforeLoaded && !afterLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <img
            src={beforeSrc || afterSrc}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            onLoad={() => { setBeforeLoaded(true); setAfterLoaded(true); }}
          />
          {/* Gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20 pointer-events-none" />
          {/* Category badge */}
          {category && (
            <div className="absolute top-3 left-3">
              <span className="bg-[#2C5F7F]/90 text-white text-xs font-medium px-2 py-0.5 rounded shadow">
                {category}
              </span>
            </div>
          )}
          <div className="absolute bottom-3 left-3">
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow">
              COMPLETED
            </span>
          </div>
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
