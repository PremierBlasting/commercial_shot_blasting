import { useEffect, useMemo, useRef, useState } from "react";
import { Crosshair, Loader2, Map as MapIcon, MapPin, Navigation, Search, X } from "lucide-react";
import { MapView } from "@/components/Map";
import { countyData } from "@/data/countyData";
import { locationData } from "@/data/locationData";
import { locationCoordinates } from "@/data/locationCoordinates";
import { clusterCoveragePoints, distanceInMiles } from "@/lib/sitemapMapUtils";
import { isValidUKPostcode, normalisePostcode } from "@shared/postcodeUtils";

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

const SEARCH_RADIUS_OPTIONS = [25, 50, 100, 150] as const;

function zoomForRadius(radiusMiles: number) {
  if (radiusMiles <= 25) return 10;
  if (radiusMiles <= 50) return 9;
  if (radiusMiles <= 100) return 8;
  return 7;
}

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
  const [postcode, setPostcode] = useState("");
  const [postcodeError, setPostcodeError] = useState("");
  const [isPostcodeLoading, setIsPostcodeLoading] = useState(false);
  const [searchRadiusMiles, setSearchRadiusMiles] = useState<number>(50);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const radiusCircleRef = useRef<google.maps.Circle | null>(null);
  const normalizedQuery = query.trim().toLowerCase();
  const normalisedPostcode = normalisePostcode(postcode);
  const postcodeFormatError = postcode.trim().length >= 5 && !isValidUKPostcode(normalisedPostcode)
    ? "Enter a full UK postcode, for example B1 1AA."
    : "";

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
        .filter(({ miles }) => miles <= searchRadiusMiles)
        .slice(0, 6)
    : [], [matchingAreas, searchRadiusMiles, userLocation]);
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
    radiusCircleRef.current?.setMap(null);
    radiusCircleRef.current = null;
    if (!map || !window.google?.maps || !userLocation) return;
    radiusCircleRef.current = new window.google.maps.Circle({
      map,
      center: userLocation,
      radius: searchRadiusMiles * 1609.344,
      fillColor: "#e8a020",
      fillOpacity: 0.08,
      strokeColor: "#e8a020",
      strokeOpacity: 0.8,
      strokeWeight: 1.5,
      clickable: false,
    });
    return () => radiusCircleRef.current?.setMap(null);
  }, [map, searchRadiusMiles, userLocation]);

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
        map?.setZoom(zoomForRadius(searchRadiusMiles));
      },
      () => {
        setLocationError("We could not access your location. You can still search by town or postcode.");
        setIsLocating(false);
      },
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 300_000 },
    );
  };

  const findPostcode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (postcodeFormatError || !isValidUKPostcode(normalisedPostcode)) {
      setPostcodeError(postcodeFormatError || "Enter a full UK postcode, for example B1 1AA.");
      return;
    }
    if (!map || !window.google?.maps) {
      setPostcodeError("The map is still preparing. Please try again in a moment.");
      return;
    }

    setLocationError("");
    setPostcodeError("");
    setIsPostcodeLoading(true);
    try {
      const coordinates = await new Promise<UserLocation>((resolve, reject) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(
          { address: `${normalisedPostcode}, UK`, componentRestrictions: { country: "GB" } },
          (results, status) => {
            const result = results?.[0];
            if (status !== "OK" || !result) {
              reject(new Error("We could not find that postcode. Please check it and try again."));
              return;
            }
            resolve({ lat: result.geometry.location.lat(), lng: result.geometry.location.lng() });
          },
        );
      });
      setUserLocation(coordinates);
      map.panTo(coordinates);
      map.setZoom(zoomForRadius(searchRadiusMiles));
    } catch (error) {
      setPostcodeError(error instanceof Error ? error.message : "We could not look up that postcode. Please try again.");
    } finally {
      setIsPostcodeLoading(false);
    }
  };

  const updatePostcode = (value: string) => {
    setPostcode(value.toUpperCase());
    setPostcodeError("");
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
                  onClick={() => { setUserLocation(null); setLocationError(""); setPostcodeError(""); }}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-600 transition hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2C5F7F] focus:ring-offset-2"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" /> Clear location
                </button>
              )}
            </div>
            <form onSubmit={findPostcode} className="flex flex-col gap-2 sm:flex-row sm:items-start" noValidate>
              <div className="min-w-0 flex-1">
                <label htmlFor="sitemap-map-postcode" className="sr-only">Find a postcode on the coverage map</label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2C5F7F]" aria-hidden="true" />
                  <input
                    id="sitemap-map-postcode"
                    type="text"
                    inputMode="text"
                    autoComplete="postal-code"
                    value={postcode}
                    onChange={(event) => updatePostcode(event.target.value)}
                    placeholder="Find a postcode on the map, e.g. B1 1AA"
                    aria-invalid={Boolean(postcodeError || postcodeFormatError)}
                    aria-describedby={postcodeError || postcodeFormatError ? "sitemap-map-postcode-error" : "sitemap-map-postcode-help"}
                    className="w-full rounded-lg border border-[#1a3d52]/25 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#2C5F7F] focus:ring-2 focus:ring-[#2C5F7F]/25"
                  />
                </div>
                {postcodeError || postcodeFormatError ? (
                  <p id="sitemap-map-postcode-error" role="alert" className="mt-1 text-xs text-amber-800">{postcodeError || postcodeFormatError}</p>
                ) : (
                  <p id="sitemap-map-postcode-help" className="mt-1 text-xs text-slate-500">Choose a radius to highlight mapped towns around your postcode.</p>
                )}
              </div>
              <label className="sr-only" htmlFor="sitemap-map-radius">Search radius</label>
              <select
                id="sitemap-map-radius"
                value={searchRadiusMiles}
                onChange={(event) => setSearchRadiusMiles(Number(event.target.value))}
                className="shrink-0 rounded-lg border border-[#1a3d52]/25 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none transition focus:border-[#2C5F7F] focus:ring-2 focus:ring-[#2C5F7F]/25"
              >
                {SEARCH_RADIUS_OPTIONS.map((radius) => <option key={radius} value={radius}>Within {radius} miles</option>)}
              </select>
              <button
                type="submit"
                disabled={isPostcodeLoading}
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[#1a3d52] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#1a3d52] transition hover:bg-slate-50 disabled:cursor-wait disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#2C5F7F] focus:ring-offset-2"
              >
                {isPostcodeLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Search className="h-4 w-4" aria-hidden="true" />}
                {isPostcodeLoading ? "Finding…" : "Find postcode"}
              </button>
            </form>
            {locationError && <p role="alert" className="text-xs text-amber-800">{locationError}</p>}
            {userLocation && nearbyAreas.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="font-semibold">Nearby towns within {searchRadiusMiles} miles:</span>
                {nearbyAreas.slice(0, 4).map(({ point, miles }) => <span key={point.slug} className="rounded-full bg-white px-2 py-1">{point.name} · {miles.toFixed(1)} mi</span>)}
              </div>
            )}
            {userLocation && nearbyAreas.length === 0 && (
              <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">No mapped towns are within {searchRadiusMiles} miles. Increase the radius to see more coverage.</p>
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
