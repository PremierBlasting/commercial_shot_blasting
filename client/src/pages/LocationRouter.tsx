import { useParams, Redirect } from "wouter";
import { useState, useEffect } from "react";
import { LocationPage } from "@/components/LocationPage";
import { getCountyForSlug } from "@/data/locationSlugIndex";
import { loadLocation } from "@/data/locationChunkLoader";
import type { LocationData } from "@shared/locationData";
import NotFound from "@/pages/NotFound";

export default function LocationRouter() {
  const params = useParams();
  const slug = params.slug;
  const [location, setLocation] = useState<LocationData | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    const countySlug = getCountyForSlug(slug);
    if (!countySlug) {
      setLocation(null);
      return;
    }
    loadLocation(slug, countySlug).then(loc => {
      setLocation(loc);
    });
  }, [slug]);

  if (!slug) {
    return <NotFound />;
  }

  // Client-side safety net: redirect /locations/:slug to canonical /service-areas/:slug
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/locations/")) {
    return <Redirect to={`/service-areas/${slug}`} />;
  }

  // Loading state while chunk is being fetched
  if (location === undefined) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!location) {
    return <NotFound />;
  }

  return <LocationPage location={location} />;
}
