import { useState, useRef, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
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
}: ProjectDetailModalProps) {
  const handleClose = () => {
    onClose?.();
    onOpenChange?.(false);
  };
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset slider when project changes
  useEffect(() => {
    setSliderPos(50);
  }, [project?.id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft" && hasPrev && onPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext && onNext) onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [project, onClose, onPrev, onNext, hasPrev, hasNext]);

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

  // Support open prop: if open is explicitly false, don't render
  if (!project || open === false) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto flex flex-col">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Before/After Slider */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden rounded-t-2xl select-none"
          style={{ aspectRatio: "16/9", cursor: isDragging ? "col-resize" : "col-resize" }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* AFTER image — full width, sits below */}
          <img
            src={project.afterImage || project.after || ''}
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
              src={project.beforeImage || project.before || ''}
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

          {/* Hint */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
            <span className="bg-black/60 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap">
              ← Drag to compare →
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex-1">
          <div className="mb-4">
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
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#2C5F7F] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
