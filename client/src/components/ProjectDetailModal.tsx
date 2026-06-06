import { useState, useRef, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ArrowRight, Share2, Check, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export interface ProjectDetailItem {
  id: number;
  title: string;
  category: string;
  description: string;
  // Support both beforeImage/afterImage (new) and before/after (legacy) field names
  beforeImage?: string;
  afterImage?: string;
  before?: string;
  after?: string;
  serviceHref?: string;
}

interface ProjectDetailModalProps {
  project: ProjectDetailItem | null;
  // Support both onClose and open/onOpenChange patterns
  onClose?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  /** 1-based index of the current project in the list */
  currentIndex?: number;
  /** Total number of projects in the list */
  totalCount?: number;
}

export function ProjectDetailModal({
  project,
  onClose,
  open,
  onOpenChange,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  currentIndex,
  totalCount,
}: ProjectDetailModalProps) {
  const handleClose = useCallback(() => {
    onClose?.();
    onOpenChange?.(false);
  }, [onClose, onOpenChange]);

  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  // Controls the per-project fade transition
  const [contentVisible, setContentVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate in when project opens
  useEffect(() => {
    if (project && open !== false) {
      const t = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [project, open]);

  // Smooth fade transition when switching between projects
  useEffect(() => {
    if (!project) return;
    // Fade out briefly then fade back in
    setContentVisible(false);
    const t = setTimeout(() => setContentVisible(true), 120);
    return () => clearTimeout(t);
  }, [project?.id]);

  // Reset slider and share state when project changes
  useEffect(() => {
    setSliderPos(50);
    setShareOpen(false);
    setCopied(false);
  }, [project?.id]);

  // Keyboard navigation — use refs to avoid stale closures
  const onPrevRef = useRef(onPrev);
  const onNextRef = useRef(onNext);
  const hasPrevRef = useRef(hasPrev);
  const hasNextRef = useRef(hasNext);
  useEffect(() => { onPrevRef.current = onPrev; }, [onPrev]);
  useEffect(() => { onNextRef.current = onNext; }, [onNext]);
  useEffect(() => { hasPrevRef.current = hasPrev; }, [hasPrev]);
  useEffect(() => { hasNextRef.current = hasNext; }, [hasNext]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft" && hasPrevRef.current && onPrevRef.current) onPrevRef.current();
      if (e.key === "ArrowRight" && hasNextRef.current && onNextRef.current) onNextRef.current();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [project, handleClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateSlider(e.clientX);
  }, [updateSlider]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) updateSlider(e.clientX);
  }, [isDragging, updateSlider]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    updateSlider(e.touches[0].clientX);
  }, [updateSlider]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging) updateSlider(e.touches[0].clientX);
  }, [isDragging, updateSlider]);

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

  // Share helpers
  const shareUrl = typeof window !== "undefined" ? window.location.origin + "/gallery" : "";
  const shareText = project ? `Shot blasting project: ${project.title} — Commercial Shot Blasting UK` : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Support open prop: if open is explicitly false, don't render
  if (!project || open === false) return null;

  const beforeSrc = project.beforeImage || project.before || '';
  const afterSrc = project.afterImage || project.after || '';
  const hasBothImages = !!(beforeSrc && afterSrc && beforeSrc !== afterSrc);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      style={{
        backgroundColor: visible ? "rgba(0,0,0,0.80)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(4px)" : "blur(0px)",
        transition: "background-color 280ms ease, backdrop-filter 280ms ease",
      }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto flex flex-col"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.94) translateY(16px)",
          transition: "opacity 280ms ease, transform 280ms ease",
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Content wrapper — fades when switching projects */}
        <div
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 180ms ease, transform 180ms ease",
          }}
        >
          {/* Before/After Slider */}
          <div
            ref={containerRef}
            className="relative w-full overflow-hidden rounded-t-2xl select-none"
            style={{ aspectRatio: "16/9", cursor: hasBothImages ? "col-resize" : "default" }}
            onMouseDown={hasBothImages ? handleMouseDown : undefined}
            onTouchStart={hasBothImages ? handleTouchStart : undefined}
          >
            {hasBothImages ? (
              <>
                {/* AFTER image — full width, sits below */}
                <img
                  src={afterSrc}
                  alt={`${project.title} — After`}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />

                {/* BEFORE image — clipped to left portion */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={beforeSrc}
                    alt={`${project.title} — Before`}
                    className="absolute inset-0 h-full object-cover"
                    style={{ width: `${(100 / Math.max(sliderPos, 0.1)) * 100}%`, maxWidth: "none" }}
                    draggable={false}
                  />
                </div>

                {/* Divider line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)] pointer-events-none"
                  style={{ left: `calc(${sliderPos}% - 1px)` }}
                />

                {/* Drag handle */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center pointer-events-none ring-2 ring-white/60"
                  style={{ left: `${sliderPos}%` }}
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-gray-600" />
                  <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                </div>

                {/* BEFORE / AFTER labels */}
                <div className="absolute top-3 left-3 pointer-events-none">
                  <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded shadow-md">
                    BEFORE
                  </span>
                </div>
                <div className="absolute top-3 right-3 pointer-events-none">
                  <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded shadow-md">
                    AFTER
                  </span>
                </div>

                {/* Swipe hint */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
                  <span className="flex items-center gap-1.5 bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap backdrop-blur-sm">
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
                    Drag to compare
                  </span>
                </div>
              </>
            ) : (
              /* Single image fallback */
              <img
                src={beforeSrc || afterSrc}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
            )}
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 flex-1">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <span className="inline-block bg-[#2C5F7F]/10 text-[#2C5F7F] text-xs font-semibold px-2.5 py-1 rounded-full mb-2 uppercase tracking-wide">
                  {project.category}
                </span>
                <h2
                  className="text-xl sm:text-2xl font-bold text-[#2C2C2C] leading-snug"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {project.title}
                </h2>
              </div>

              {/* Share button */}
              <div className="relative flex-shrink-0 mt-1">
                <button
                  onClick={() => setShareOpen((v) => !v)}
                  className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#2C5F7F] border border-gray-200 hover:border-[#2C5F7F] rounded-full px-3 py-1.5 transition-colors bg-white"
                  aria-label="Share this project"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Share
                </button>

                {/* Share dropdown */}
                {shareOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-30 min-w-[180px]">
                    <button
                      onClick={handleLinkedIn}
                      className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-[#0077B5]" />
                      LinkedIn
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                        </svg>
                      )}
                      {copied ? "Copied!" : "Copy link"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6">
              {project.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              {project.serviceHref && (
                <Link href={project.serviceHref} onClick={handleClose}>
                  <Button className="bg-[#2C5F7F] hover:bg-[#1a3d52] w-full sm:w-auto text-white">
                    View This Service
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
              <Link href="/gallery" onClick={handleClose}>
                <Button
                  variant="outline"
                  className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white bg-white w-full sm:w-auto"
                >
                  View All Projects
                </Button>
              </Link>
            </div>
          </div>

          {/* Prev / Next navigation */}
          {(hasPrev || hasNext) && (
            <div className="flex justify-between items-center px-5 sm:px-6 py-4 border-t border-gray-100">
              <button
                onClick={onPrev}
                disabled={!hasPrev}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#2C5F7F] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              {currentIndex != null && totalCount != null && (
                <span className="text-xs font-medium text-gray-400 tabular-nums select-none">
                  {currentIndex} of {totalCount}
                </span>
              )}
              <button
                onClick={onNext}
                disabled={!hasNext}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#2C5F7F] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Next project"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
