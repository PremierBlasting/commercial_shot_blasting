import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Map as MapIcon } from "lucide-react";
import { MapView } from "@/components/Map";
import { countyData } from "@/data/countyData";
import { locationData } from "@/data/locationData";
import { locationCoordinates } from "@/data/locationCoordinates";

interface SitemapCoverageMapProps {
  query: string;
}

type CoveragePoint = {
  name: string;
  slug: string;
  county: string;
  lat: number;
  lng: number;
};

/**
 * An on-demand map for the HTML sitemap. County hubs represent the complete
 * service-area catalogue, while detailed town markers are added where the
 * lightweight coordinate index has a precise town location.
 */
export function SitemapCoverageMap({ query }: SitemapCoverageMapProps) {
  const [isMapEnabled, setIsMapEnabled] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const normalizedQuery = query.trim().toLowerCase();

  const countyPoints = useMemo(() =>
    Object.values(countyData).map((county) => ({
      name: county.name,
      slug: county.slug,
      county: county.name,
      lat: county.latitude,
      lng: county.longitude,
      townCount: Object.values(locationData).filter((location) => location.countySlug === county.slug).length,
    })), []);

  const serviceAreaPoints = useMemo<CoveragePoint[]>(() =>
    Object.entries(locationCoordinates)
      .map(([slug, coordinates]) => {
        const location = locationData[slug];
        return location ? {
          name: location.name,
          slug,
          county: location.county,
          ...coordinates,
        } : null;
      })
      .filter((point): point is CoveragePoint => point !== null), []);

  const matchesQuery = (name: string, county: string) =>
    !normalizedQuery || name.toLowerCase().includes(normalizedQuery) || county.toLowerCase().includes(normalizedQuery);

  useEffect(() => {
    if (!map || !window.google?.maps) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
    const bounds = new window.google.maps.LatLngBounds();
    const infoWindow = new window.google.maps.InfoWindow();

    const matchingHubs = countyPoints.filter((point) => matchesQuery(point.name, point.county));
    const matchingAreas = serviceAreaPoints.filter((point) => matchesQuery(point.name, point.county));

    matchingHubs.forEach((point) => {
      const marker = new window.google.maps.Marker({
        map,
        position: { lat: point.lat, lng: point.lng },
        title: `${point.name} county hub — ${point.townCount} service areas`,
        label: { text: String(point.townCount), color: "#ffffff", fontWeight: "700" },
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 13,
          fillColor: "#1a3d52",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
      });
      marker.addListener("click", () => {
        infoWindow.setContent(
          `<div style="max-width:220px"><strong>${point.name}</strong><br/>${point.townCount} service areas covered<br/><a href="/counties/${point.slug}">View county hub</a></div>`,
        );
        infoWindow.open({ map, anchor: marker });
      });
      markersRef.current.push(marker);
      bounds.extend({ lat: point.lat, lng: point.lng });
    });

    matchingAreas.forEach((point) => {
      const marker = new window.google.maps.Marker({
        map,
        position: { lat: point.lat, lng: point.lng },
        title: `${point.name}, ${point.county}`,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 5,
          fillColor: "#2C5F7F",
          fillOpacity: 0.92,
          strokeColor: "#ffffff",
          strokeWeight: 1,
        },
      });
      marker.addListener("click", () => {
        infoWindow.setContent(
          `<div style="max-width:220px"><strong>${point.name}</strong><br/>${point.county}<br/><a href="/service-areas/${point.slug}">View service area</a></div>`,
        );
        infoWindow.open({ map, anchor: marker });
      });
      markersRef.current.push(marker);
      bounds.extend({ lat: point.lat, lng: point.lng });
    });

    if (!bounds.isEmpty()) map.fitBounds(bounds, 40);
  }, [map, normalizedQuery, countyPoints, serviceAreaPoints]);

  const matchingHubCount = countyPoints.filter((point) => matchesQuery(point.name, point.county)).length;
  const matchingAreaCount = serviceAreaPoints.filter((point) => matchesQuery(point.name, point.county)).length;

  return (
    <section className="mb-12" aria-labelledby="sitemap-map-heading">
      <div className="flex flex-col gap-4 rounded-2xl border border-[#2C5F7F]/20 bg-[#f4f8fa] p-5 md:p-7">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a3d52] text-white">
            <MapPin className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 id="sitemap-map-heading" className="text-xl font-bold text-[#1a3d52]">Explore coverage on the map</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              County hub markers represent every service area within that county. Detailed pins show towns with a precise coordinate in the lightweight map index.
            </p>
          </div>
        </div>

        {!isMapEnabled ? (
          <button
            type="button"
            onClick={() => setIsMapEnabled(true)}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#1a3d52] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#102e40] focus:outline-none focus:ring-2 focus:ring-[#2C5F7F] focus:ring-offset-2"
          >
            <MapIcon className="h-4 w-4" aria-hidden="true" />
            Load interactive coverage map
          </button>
        ) : (
          <>
            <div className="flex flex-wrap gap-3 text-xs font-medium text-gray-600" aria-live="polite">
              <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">{matchingHubCount} county hubs shown</span>
              <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">{matchingAreaCount} detailed service-area pins shown</span>
            </div>
            <MapView
              className="h-[420px] overflow-hidden rounded-xl border border-[#1a3d52]/15"
              initialCenter={{ lat: 53.5, lng: -2.0 }}
              initialZoom={6}
              onMapReady={setMap}
            />
          </>
        )}
      </div>
    </section>
  );
}
