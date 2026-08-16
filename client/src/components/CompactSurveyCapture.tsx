import { ArrowRight, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { NearbyAreaSuggestions } from "@/components/NearbyAreaSuggestions";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import type { SurveyBookingDefaults } from "./SurveyBookingFlow";

interface CompactSurveyCaptureProps {
  defaults?: SurveyBookingDefaults;
  onStart: (defaults: SurveyBookingDefaults) => void;
  className?: string;
}

const QUICK_SERVICES = ["Structural Steelwork", "Factory, Cladding & Roofing", "Machinery & Equipment", "Other / Not Sure"];

export function CompactSurveyCapture({ defaults, onStart, className = "" }: CompactSurveyCaptureProps) {
  const [serviceType, setServiceType] = useState(defaults?.serviceType ?? "");
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const [locationFocused, setLocationFocused] = useState(false);
  const { items: recentlyViewed, clearHistory } = useRecentlyViewed();

  const beginSurvey = (event: React.FormEvent) => {
    event.preventDefault();
    if (!serviceType || !postalCode.trim()) {
      setError("Choose the job type and add the site postcode to continue.");
      return;
    }
    onStart({ ...defaults, serviceType, locationName: defaults?.locationName });
  };

  return (
    <form onSubmit={beginSurvey} className={`rounded-2xl border border-white/30 bg-white/95 p-4 text-left shadow-2xl backdrop-blur-sm ${className}`}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-[#1a3a52]">Request A Site Visit</p>
          <p className="text-xs text-slate-500">Start in under a minute. No obligation. We'll get back to you promptly.</p>
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-[1.25fr_0.9fr_auto]">
        <label className="sr-only" htmlFor="compact-survey-service">What needs blasting?</label>
        <select id="compact-survey-service" value={serviceType} onChange={(event) => { setServiceType(event.target.value); setError(""); }} className="min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-[#2C5F7F] focus:ring-2 focus:ring-[#2C5F7F]/20">
          <option value="">What needs blasting?</option>
          {QUICK_SERVICES.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        <div className="relative" role="combobox" aria-expanded={locationFocused && postalCode.length === 0} aria-haspopup="listbox">
          <label className="relative block"><span className="sr-only">Site postcode</span><MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input id="compact-survey-postcode" value={postalCode} onChange={(event) => { setPostalCode(event.target.value); setError(""); }} onFocus={() => setLocationFocused(true)} onBlur={() => setTimeout(() => setLocationFocused(false), 200)} placeholder="Site postcode" className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-[#2C5F7F] focus:ring-2 focus:ring-[#2C5F7F]/20" /></label>
          {locationFocused && postalCode.length === 0 && (
            <ul className="absolute z-50 top-full left-0 right-0 mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
              {recentlyViewed.length > 0 && <>
                <li className="border-b border-slate-100 px-3 py-2">
                  <span className="flex items-center justify-between gap-2 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> Recently viewed</span>
                    <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={clearHistory} className="text-[11px] normal-case text-slate-400 transition-colors hover:text-red-500" aria-label="Clear recently viewed areas">Clear</button>
                  </span>
                </li>
                {recentlyViewed.slice(0, 3).map((area) => (
                  <li key={area.slug}>
                    <Link href={`/service-areas/${area.slug}`}>
                      <div className="flex cursor-pointer items-center gap-2 border-b border-slate-50 px-3 py-2.5 transition-colors hover:bg-[#f0f6fb]">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-[#2C5F7F]" />
                        <span className="text-sm font-medium text-[#2C2C2C]">{area.name}</span>
                        <span className="ml-auto text-xs text-slate-400">{area.county}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </>}
              <li><NearbyAreaSuggestions /></li>
            </ul>
          )}
        </div>
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#E8A020] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#d4911a] active:scale-[0.98]">Start <ArrowRight className="h-4 w-4" /></button>
      </div>
      {error && <p role="alert" className="mt-2 text-xs font-medium text-red-600">{error}</p>}
    </form>
  );
}
