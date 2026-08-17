import { useEffect, useState } from "react";

interface BeforeAfterProjectSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  caption: string;
}

export function BeforeAfterProjectSlider({ beforeImage, afterImage, title, caption }: BeforeAfterProjectSliderProps) {
  const [position, setPosition] = useState(50);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isLightboxOpen]);

  return (
    <figure className="mt-3 overflow-hidden rounded-md border border-slate-200 bg-slate-950">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img src={beforeImage} alt={`${title} before blasting`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img src={afterImage} alt={`${title} after blasting`} className="h-full w-full object-cover" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${position}%` }} />
        <span className="absolute left-2 top-2 rounded bg-slate-950/75 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">After</span>
        <span className="absolute right-2 top-2 rounded bg-slate-950/75 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">Before</span>
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
      <figcaption className="bg-white px-2.5 py-2 text-[11px] leading-relaxed text-slate-600">
        {caption}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="mt-2 block font-semibold text-[#2C5F7F] underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-[#2C5F7F]/30"
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
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-black">
              <img src={beforeImage} alt={`${title} before blasting`} className="absolute inset-0 h-full w-full object-contain" />
              <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
                <img src={afterImage} alt={`${title} after blasting`} className="h-full w-full object-contain" />
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
