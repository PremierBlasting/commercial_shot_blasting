import { useCallback, useState } from "react";
import { locationCoordinates } from "@/data/locationCoordinates";

export interface NearbyArea {
  slug: string;
  name: string;
  distanceMiles: number;
}

export type NearbyAreasStatus = "idle" | "loading" | "ready" | "denied" | "unavailable" | "error";

function titleFromSlug(slug: string): string {
  const specialNames: Record<string, string> = {
    "brighton-and-hove": "Brighton & Hove",
    "southend-on-sea": "Southend-on-Sea",
    "stratford-upon-avon": "Stratford-upon-Avon",
    "st-albans": "St Albans",
  };

  if (specialNames[slug]) return specialNames[slug];
  return slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function milesBetween(latA: number, lngA: number, latB: number, lngB: number): number {
  const radians = (value: number) => (value * Math.PI) / 180;
  const earthRadiusMiles = 3958.8;
  const dLat = radians(latB - latA);
  const dLng = radians(lngB - lngA);
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(radians(latA)) * Math.cos(radians(latB)) * Math.sin(dLng / 2) ** 2;
  return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getNearbyAreas(latitude: number, longitude: number, limit = 3): NearbyArea[] {
  return Object.entries(locationCoordinates)
    .map(([slug, coordinates]) => ({
      slug,
      name: titleFromSlug(slug),
      distanceMiles: Math.round(milesBetween(latitude, longitude, coordinates.lat, coordinates.lng)),
    }))
    .sort((left, right) => left.distanceMiles - right.distanceMiles)
    .slice(0, limit);
}

/**
 * Supplies nearest featured service areas only after a visitor explicitly requests location access.
 * Location data stays in the browser; no coordinates are sent to the server or stored.
 */
export function useNearbyAreas() {
  const [status, setStatus] = useState<NearbyAreasStatus>("idle");
  const [nearbyAreas, setNearbyAreas] = useState<NearbyArea[]>([]);

  const requestNearbyAreas = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setStatus("unavailable");
      return;
    }

    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setNearbyAreas(getNearbyAreas(position.coords.latitude, position.coords.longitude));
        setStatus("ready");
      },
      (error) => {
        setStatus(error.code === error.PERMISSION_DENIED ? "denied" : "error");
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  }, []);

  return { status, nearbyAreas, requestNearbyAreas };
}
