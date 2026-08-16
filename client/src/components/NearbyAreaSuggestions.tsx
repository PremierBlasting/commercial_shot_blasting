import { Loader2, MapPin, Navigation } from "lucide-react";
import { useState } from "react";
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
  const [postcode, setPostcode] = useState("");
  const { status, nearbyAreas, postcodeError, requestNearbyAreas, requestNearbyByPostcode } = useNearbyAreas();

  const submitPostcode = (event: React.FormEvent) => {
    event.preventDefault();
    void requestNearbyByPostcode(postcode);
  };

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
        disabled={status === "loading" || status === "postcode-loading"}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-[#f0f6fb] px-3 py-2 text-xs font-semibold text-[#2C5F7F] transition-colors hover:bg-[#e0eff8] disabled:cursor-wait disabled:opacity-70"
      >
        {status === "loading" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Navigation className="h-3.5 w-3.5" />}
        {status === "loading" ? "Finding nearby areas…" : "Find popular areas near you"}
      </button>
      <div className="my-3 flex items-center gap-2 text-[11px] uppercase tracking-wide text-gray-400"><span className="h-px flex-1 bg-gray-100" />or use a postcode<span className="h-px flex-1 bg-gray-100" /></div>
      <form onSubmit={submitPostcode} className="flex gap-2">
        <label className="sr-only" htmlFor="nearby-postcode">UK postcode</label>
        <input
          id="nearby-postcode"
          value={postcode}
          onChange={(event) => setPostcode(event.target.value)}
          placeholder="e.g. SS1 1AA"
          inputMode="text"
          autoComplete="postal-code"
          maxLength={10}
          className="min-w-0 flex-1 rounded-md border border-gray-200 px-3 py-2 text-xs text-[#2C2C2C] outline-none transition focus:border-[#2C5F7F] focus:ring-2 focus:ring-[#2C5F7F]/20"
        />
        <button
          type="submit"
          disabled={status === "postcode-loading" || status === "loading"}
          className="inline-flex shrink-0 items-center justify-center rounded-md bg-[#2C5F7F] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1f4a65] disabled:cursor-wait disabled:opacity-70"
        >
          {status === "postcode-loading" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Find"}
        </button>
      </form>
      {postcodeError ? <p role="alert" className="mt-2 text-center text-xs text-red-600">{postcodeError}</p> : null}
      {status === "denied" || status === "unavailable" || status === "error" ? (
        <p className="mt-2 text-center text-xs text-gray-500">Device location isn&apos;t available. Try a full UK postcode instead.</p>
      ) : (
        <p className="mt-2 text-center text-[11px] text-gray-400">Device location stays in your browser. A typed postcode is used only for this lookup and is not saved.</p>
      )}
    </div>
  );
}
