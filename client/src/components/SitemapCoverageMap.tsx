import { useEffect, useMemo, useRef, useState } from "react";
import { Crosshair, Loader2, Map as MapIcon, MapPin, Navigation, X } from "lucide-react";
import { MapView } from "@/components/Map";
import { countyData } from "@/data/countyData";
import { locationData } from "@/data/locationData";
import { locationCoordinates } from "@/data/locationCoordinates";
import { clusterCoveragePoints, distanceInMiles } from "@/lib/sitemapMapUtils";

interface SitemapCoverageMapProps {
  query: string;
  region: string;
}

type CoveragePoint = {
  name: string;
  slug: string;
  county: string;
  region: string;
  lat: number;
  lng: number;
};

type CountyPoint = CoveragePoint & {
  townCount: number;
};

type UserLocation = { lat: number; lng: number };

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039;",
    '"': "&quot;",
  }[character] ?? character));
}

/**
 * An on-demand map for the HTML sitemap. County hubs remain individual markers,
 * while detailed service-area pins use lightweight geographic clustering when a
 * visitor is zoomed out. Browser location is requested only after a user action.
 */
export function SitemapCoverageMap({ query, region }: SitemapCoverageMapProps) {
  const [isMapEnabled, setIsMapEnabled] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapZoom, setMapZoom] = useState(6);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const markersRef = useRef<google.maps.Marker[]>([]);
  const normalizedQuery = query.trim().toLowerCase();

  const countyPoints = useMemo<CountyPoint[]>(() =>
    Object.values(countyData).map((county) => ({
      name: county.name,
      slug: county.slug,
      county: county.name,
      region: county.region,
      lat: county.latitude,
      lng: county.longitude,
      townCount: Object.values(locationData).filter((location) => location.countySlug === county.slug).length,
    })), []);

  const serviceAreaPoints = useMemo<CoveragePoint[]>(() =>
    Object.entries(locationCoordinates)
      .map(([slug, coordinates]) => {
        const location = locationData[slug];
        if (!location) return null;
        return {
          name: location.name,
          slug,
          county: location.county,
          region: countyData[location.countySlug]?.region ?? "",
          ...coordinates,
        };
      })
      .filter((point): point is CoveragePoint => point !== null), []);

  const matchesFilters = (name: string, county: string, pointRegion: string) =>
    (!normalizedQuery || name.toLowerCase().includes(normalizedQuery) || county.toLowerCase().includes(normalizedQuery))
    && (!region || pointRegion === region);

  const matchingHubs = useMemo(
    () => countyPoints.filter((point) => matchesFilters(point.name, point.county, point.region)),
    [countyPoints, normalizedQuery, region],
  );
  const matchingAreas = useMemo(
    () => serviceAreaPoints.filter((point) => matchesFilters(point.name, point.county, point.region)),
    [serviceAreaPoints, normalizedQuery, region],
  );
  const nearbyAreas = useMemo(() => userLocation
    ? matchingAreas
        .map((point) => ({ point, miles: distanceInMiles(userLocation, point) }))
        .sort((a, b) => a.miles - b.miles)
        .slice(0, 6)
    : [], [matchingAreas, userLocation]);
  const nearbySlugs = useMemo(() => new Set(nearbyAreas.map(({ point }) => point.slug)), [nearbyAreas]);

  useEffect(() => {
    if (!map || !window.google?.maps) return;
    const listener = map.addListener("zoom_changed", () => setMapZoom(map.getZoom() ?? 6));
    return () => listener.remove();
  }, [map]);

  useEffect(() => {
    if (!map || !window.google?.maps || userLocation) return;
    const bounds = new window.google.maps.LatLngBounds();
    [...matchingHubs, ...matchingAreas].forEach((point) => bounds.extend({ lat: point.lat, lng: point.lng }));
    if (!bounds.isEmpty()) map.fitBounds(bounds, 42);
  }, [map, matchingHubs, matchingAreas, userLocation]);

  useEffect(() => {
    if (!map || !window.google?.maps) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
    const infoWindow = new window.google.maps.InfoWindow();

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
        infoWindow.setContent(`<div style="max-width:220px"><strong>${escapeHtml(point.name)}</strong><br/>${point.townCount} service areas covered<br/><a href="/counties/${encodeURIComponent(point.slug)}">View county hub</a></div>`);
        infoWindow.open({ map, anchor: marker });
      });
      markersRef.current.push(marker);
    });

    const clusters = clusterCoveragePoints(matchingAreas, mapZoom);
    clusters.forEach((cluster) => {
      const [singlePoint] = cluster.members;
      const isCluster = cluster.members.length > 1;
      const marker = new window.google.maps.Marker({
        map,
        position: { lat: cluster.lat, lng: cluster.lng },
        title: isCluster ? `${cluster.members.length} nearby service areas` : `${singlePoint.name}, ${singlePoint.county}`,
        label: isCluster
          ? { text: String(cluster.members.length), color: "#ffffff", fontWeight: "700" }
          : undefined,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: isCluster ? Math.min(15, 8 + Math.log2(cluster.members.length) * 2) : nearbySlugs.has(singlePoint.slug) ? 7 : 5,
          fillColor: isCluster ? "#2C5F7F" : nearbySlugs.has(singlePoint.slug) ? "#E8A020" : "#5a94af",
          fillOpacity: 0.94,
          strokeColor: "#ffffff",
          strokeWeight: isCluster ? 2 : 1,
        },
      });
      marker.addListener("click", () => {
        if (isCluster) {
          map.panTo({ lat: cluster.lat, lng: cluster.lng });
          map.setZoom(Math.max(8, (map.getZoom() ?? 6) + 2));
          return;
        } else {
          infoWindow.setContent(`<div style="max-width:220px"><strong>${escapeHtml(singlePoint.name)}</strong><br/>${escapeHtml(singlePoint.county)}<br/><a href="/service-areas/${encodeURIComponent(singlePoint.slug)}">View service area</a></div>`);
        }
        infoWindow.open({ map, anchor: marker });
      });
      markersRef.current.push(marker);
    });

    if (userLocation) {
      const marker = new window.google.maps.Marker({
        map,
        position: userLocation,
        title: "Your selected location",
        zIndex: 10,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#e8a020",
          fillOpacity: 1,
          strokeColor: "#1a3d52",
          strokeWeight: 3,
        },
      });
      markersRef.current.push(marker);
    }
  }, [map, mapZoom, matchingHubs, matchingAreas, nearbySlugs, userLocation]);

  const locateUser = () => {
    if (!navigator.geolocation) {
      setLocationError("Location is not available in this browser. You can still search by town or postcode.");
      return;
    }
    setLocationError("");
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const location = { lat: coords.latitude, lng: coords.longitude };
        setUserLocation(location);
        setIsLocating(false);
        map?.panTo(location);
        map?.setZoom(9);
      },
      () => {
        setLocationError("We could not access your location. You can still search by town or postcode.");
        setIsLocating(false);
      },
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 300_000 },
    );
  };

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
              County hubs represent every service area within that county. Town markers cluster at wider zoom levels to keep the map clear.
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
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-600" aria-live="polite">
              <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">{matchingHubs.length} county hubs shown</span>
              <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">{matchingAreas.length} detailed service-area pins shown</span>
              <button
                type="button"
                onClick={locateUser}
                disabled={isLocating}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#1a3d52] px-3 py-1.5 font-semibold text-white transition hover:bg-[#102e40] disabled:cursor-wait disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#2C5F7F] focus:ring-offset-2"
              >
                {isLocating ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> : <Crosshair className="h-3.5 w-3.5" aria-hidden="true" />}
                {isLocating ? "Locating…" : "Locate Me"}
              </button>
              {userLocation && (
                <button
                  type="button"
                  onClick={() => { setUserLocation(null); setLocationError(""); }}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-600 transition hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2C5F7F] focus:ring-offset-2"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" /> Clear location
                </button>
              )}
            </div>
            {locationError && <p role="alert" className="text-xs text-amber-800">{locationError}</p>}
            {userLocation && nearbyAreas.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="font-semibold">Nearby towns highlighted:</span>
                {nearbyAreas.slice(0, 4).map(({ point, miles }) => <span key={point.slug} className="rounded-full bg-white px-2 py-1">{point.name} · {miles.toFixed(1)} mi</span>)}
              </div>
            )}
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
