import { useState } from "react";

interface BeforeAfterProjectSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  caption: string;
}

export function BeforeAfterProjectSlider({ beforeImage, afterImage, title, caption }: BeforeAfterProjectSliderProps) {
  const [position, setPosition] = useState(50);

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
      <figcaption className="bg-white px-2.5 py-2 text-[11px] leading-relaxed text-slate-600">{caption}</figcaption>
    </figure>
  );
}
