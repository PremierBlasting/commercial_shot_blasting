import { useEffect, useState } from "react";

interface BeforeAfterProjectSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  caption: string;
  aspectRatio?: "landscape" | "portrait";
}

export function BeforeAfterProjectSlider({ beforeImage, afterImage, title, caption, aspectRatio = "landscape" }: BeforeAfterProjectSliderProps) {
  const [position, setPosition] = useState(50);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const isPortrait = aspectRatio === "portrait";
  const inlineAspectClass = isPortrait ? "aspect-[3/4]" : "aspect-[16/9]";
  const lightboxAspectClass = isPortrait ? "aspect-[3/4] max-w-[56vh]" : "aspect-[16/9]";
  const imageFitClass = isPortrait ? "object-contain" : "object-cover";

  useEffect(() => {
    if (!isLightboxOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isLightboxOpen]);

  return (
    <figure className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
      <div className={`relative overflow-hidden ${inlineAspectClass}`}>
        <img src={beforeImage} alt={`${title} before restoration`} className={`absolute inset-0 h-full w-full ${imageFitClass}`} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img src={afterImage} alt={`${title} after restoration`} className={`h-full w-full ${imageFitClass}`} />
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${position}%` }} />
        <span className="absolute left-3 top-3 rounded bg-slate-950/75 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">After</span>
        <span className="absolute right-3 top-3 rounded bg-slate-950/75 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">Before</span>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={`Compare before and after images for ${title}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="bg-white px-4 py-3 text-sm leading-relaxed text-slate-600">
        {caption}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="mt-3 block font-semibold text-[#2C5F7F] underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-[#2C5F7F]/30"
        >
          View full-screen comparison
        </button>
      </figcaption>
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Full-screen comparison for ${title}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4"
          onMouseDown={() => setIsLightboxOpen(false)}
        >
          <div className="w-full max-w-6xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-3 text-white">
              <p className="text-sm font-semibold">{title} — before and after</p>
              <button type="button" onClick={() => setIsLightboxOpen(false)} className="rounded-md border border-white/30 px-3 py-1.5 text-xs font-semibold hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white">Close</button>
            </div>
            <div className={`relative mx-auto w-full overflow-hidden rounded-lg bg-black ${lightboxAspectClass}`}>
              <img src={beforeImage} alt={`${title} before restoration`} className="absolute inset-0 h-full w-full object-contain" />
              <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
                <img src={afterImage} alt={`${title} after restoration`} className="h-full w-full object-contain" />
              </div>
              <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${position}%` }} />
              <span className="absolute left-3 top-3 rounded bg-slate-950/80 px-2 py-1 text-xs font-semibold text-white">After</span>
              <span className="absolute right-3 top-3 rounded bg-slate-950/80 px-2 py-1 text-xs font-semibold text-white">Before</span>
              <input type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-label={`Compare full-screen before and after images for ${title}`} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">{caption}</p>
          </div>
        </div>
      )}
    </figure>
  );
}
