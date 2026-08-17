import { useEffect, useRef, useState } from "react";
import { loadMapScript } from "@/components/Map";
import { locationCoordinates } from "@/data/locationCoordinates";
import { locationSlugIndex } from "@/data/locationSlugIndex";
import { distanceInMiles } from "@/lib/sitemapMapUtils";
import { isValidUKPostcode, normalisePostcode } from "@shared/postcodeUtils";

export type NearbyCoverageTown = {
  name: string;
  slug: string;
  countySlug: string;
  countyLabel: string;
  miles: number;
};

type NearbyCoverageState = {
  status: "idle" | "loading" | "ready" | "error";
  towns: NearbyCoverageTown[];
};

const LOWERCASE_WORDS = new Set(["and", "of", "on", "the", "upon"]);

function townNameFromSlug(slug: string) {
  return slug.split("-").map((word, index) => {
    if (index > 0 && LOWERCASE_WORDS.has(word)) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
}

function countyLabelFromSlug(slug: string) {
  return townNameFromSlug(slug);
}

/**
 * Geocodes a valid Site Visit postcode in the visitor's browser only, then
 * presents the closest mapped service-area towns. No postcode or location is
 * persisted or sent to the application server.
 */
export function usePostcodeNearbyCoverage(value: string): NearbyCoverageState {
  const [state, setState] = useState<NearbyCoverageState>({ status: "idle", towns: [] });
  const requestRef = useRef(0);
  const postcode = normalisePostcode(value);

  useEffect(() => {
    if (!isValidUKPostcode(postcode)) {
      setState({ status: "idle", towns: [] });
      return;
    }

    const requestId = ++requestRef.current;
    const timer = window.setTimeout(async () => {
      setState({ status: "loading", towns: [] });
      try {
        await loadMapScript();
        if (!window.google?.maps) throw new Error("Maps unavailable");
        const coordinates = await new Promise<{ lat: number; lng: number }>((resolve, reject) => {
          new window.google.maps.Geocoder().geocode(
            { address: `${postcode}, UK`, componentRestrictions: { country: "GB" } },
            (results, status) => {
              const result = results?.[0];
              if (status !== "OK" || !result) {
                reject(new Error("Postcode not found"));
                return;
              }
              resolve({ lat: result.geometry.location.lat(), lng: result.geometry.location.lng() });
            },
          );
        });
        if (requestId !== requestRef.current) return;
        const towns = Object.entries(locationCoordinates)
          .map(([slug, point]) => {
            const countySlug = locationSlugIndex[slug];
            if (!countySlug) return null;
            return {
              slug,
              name: townNameFromSlug(slug),
              countySlug,
              countyLabel: countyLabelFromSlug(countySlug),
              miles: distanceInMiles(coordinates, point),
            };
          })
          .filter((town): town is NearbyCoverageTown => town !== null)
          .sort((a, b) => a.miles - b.miles)
          .slice(0, 12);
        setState({ status: "ready", towns });
      } catch {
        if (requestId === requestRef.current) setState({ status: "error", towns: [] });
      }
    }, 450);

    return () => window.clearTimeout(timer);
  }, [postcode]);

  return state;
}
