import { Loader2, MapPin, Navigation } from "lucide-react";
import { Link } from "wouter";
import { useNearbyAreas } from "@/hooks/useNearbyAreas";

interface NearbyAreaSuggestionsProps {
  maxItems?: number;
}

/**
 * Browser-only nearby suggestions. It requests location only after a visitor clicks
 * the trigger; coordinates are calculated locally and never persisted or transmitted.
 */
export function NearbyAreaSuggestions({ maxItems = 3 }: NearbyAreaSuggestionsProps) {
  const { status, nearbyAreas, requestNearbyAreas } = useNearbyAreas();

  if (status === "ready") {
    return (
      <div className="border-t border-gray-100">
        <div className="px-4 py-2">
          <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-gray-400">
            <Navigation className="h-3 w-3" /> Popular areas near you
          </span>
        </div>
        {nearbyAreas.slice(0, maxItems).map((area) => (
          <Link key={area.slug} href={`/service-areas/${area.slug}`}>
            <div className="flex cursor-pointer items-center gap-2 border-t border-gray-50 px-4 py-2.5 transition-colors hover:bg-[#f0f6fb]">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#2C5F7F]" />
              <span className="text-sm font-medium text-[#2C2C2C]">{area.name}</span>
              <span className="ml-auto text-xs text-gray-400">{area.distanceMiles === 0 ? "Nearest area" : `${area.distanceMiles} mi away`}</span>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="border-t border-gray-100 px-4 py-3">
      <button
        type="button"
        onMouseDown={(event) => event.preventDefault()}
        onClick={requestNearbyAreas}
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-[#f0f6fb] px-3 py-2 text-xs font-semibold text-[#2C5F7F] transition-colors hover:bg-[#e0eff8] disabled:cursor-wait disabled:opacity-70"
      >
        {status === "loading" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Navigation className="h-3.5 w-3.5" />}
        {status === "loading" ? "Finding nearby areas…" : "Find popular areas near you"}
      </button>
      {status === "denied" || status === "unavailable" || status === "error" ? (
        <p className="mt-2 text-center text-xs text-gray-500">Location isn&apos;t available. You can still search or browse every service area.</p>
      ) : (
        <p className="mt-2 text-center text-[11px] text-gray-400">Uses your browser location only. It is not saved or sent to us.</p>
      )}
    </div>
  );
}
