import { useEffect, useState } from "react";
import type React from "react";
import { ChevronLeft, ChevronRight, Images, RotateCcw, X, ZoomIn } from "lucide-react";

interface GalleryImage {
  src: string;
  caption: string;
}

interface ProjectImageGalleryProps {
  title: string;
  images: GalleryImage[];
}

export function ProjectImageGallery({ title, images }: ProjectImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pinchStartDistance, setPinchStartDistance] = useState<number | null>(null);
  const [pinchStartZoom, setPinchStartZoom] = useState(1);
  const activeImage = images[activeIndex];

  const previous = () => {
    setActiveIndex((index) => (index - 1 + images.length) % images.length);
    setZoom(1);
  };
  const next = () => {
    setActiveIndex((index) => (index + 1) % images.length);
    setZoom(1);
  };
  const distanceBetweenTouches = (touches: React.TouchList) => Math.hypot(
    touches[0].clientX - touches[1].clientX,
    touches[0].clientY - touches[1].clientY,
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, images.length]);

  if (images.length < 2) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => { setZoom(1); setIsOpen(true); }}
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2C5F7F] underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-[#2C5F7F]/30"
      >
        <Images className="h-3.5 w-3.5" aria-hidden="true" /> Browse project gallery ({images.length})
      </button>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} project image gallery`}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/95 p-4"
          onMouseDown={() => setIsOpen(false)}
        >
          <div className="w-full max-w-6xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-3 text-white">
              <p className="text-sm font-semibold">{title} — project gallery</p>
              <button type="button" onClick={() => setIsOpen(false)} className="inline-flex items-center gap-1.5 rounded-md border border-white/30 px-3 py-1.5 text-xs font-semibold hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"><X className="h-3.5 w-3.5" /> Close</button>
            </div>
            <div
              className="relative overflow-hidden rounded-lg bg-black touch-none"
              onTouchStart={(event) => {
                if (event.touches.length === 2) {
                  setPinchStartDistance(distanceBetweenTouches(event.touches));
                  setPinchStartZoom(zoom);
                }
              }}
              onTouchMove={(event) => {
                if (event.touches.length === 2 && pinchStartDistance) {
                  event.preventDefault();
                  const scale = distanceBetweenTouches(event.touches) / pinchStartDistance;
                  setZoom(Math.min(3, Math.max(1, pinchStartZoom * scale)));
                }
              }}
              onTouchEnd={() => setPinchStartDistance(null)}
            >
              <img src={activeImage.src} alt={activeImage.caption} className="h-[65vh] w-full origin-center object-contain transition-transform duration-100" style={{ transform: `scale(${zoom})` }} />
              <button type="button" onClick={previous} aria-label="Previous project image" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-950/70 p-2 text-white hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-white"><ChevronLeft className="h-5 w-5" /></button>
              <button type="button" onClick={next} aria-label="Next project image" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-950/70 p-2 text-white hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-white"><ChevronRight className="h-5 w-5" /></button>
              {zoom > 1 ? (
                <button type="button" onClick={() => setZoom(1)} aria-label="Reset image zoom" className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-slate-950/80 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-white"><RotateCcw className="h-3.5 w-3.5" /> Reset zoom</button>
              ) : (
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-slate-950/80 px-2.5 py-1.5 text-xs font-medium text-white"><ZoomIn className="h-3.5 w-3.5" /> Pinch to zoom</span>
              )}
            </div>
            <div className="mt-3 flex items-start justify-between gap-4 text-sm text-slate-200">
              <p className="leading-relaxed">{activeImage.caption}</p>
              <p className="shrink-0 text-xs font-semibold text-slate-300">{activeIndex + 1} / {images.length}</p>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Choose project image">
              {images.map((image, index) => (
                <button key={image.src} type="button" onClick={() => setActiveIndex(index)} aria-label={`View image ${index + 1}`} aria-pressed={activeIndex === index} className={`h-14 w-20 shrink-0 overflow-hidden rounded border-2 focus:outline-none focus:ring-2 focus:ring-white ${activeIndex === index ? "border-white" : "border-transparent opacity-70 hover:opacity-100"}`}>
                  <img src={image.src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
