import { useRef, useState, useCallback } from "react";
import { MapView } from "@/components/Map";
import { Factory } from "lucide-react";

interface Landmark {
  name: string;
  type: "industrial_estate" | "business_park" | "factory" | "warehouse" | "port" | "airport";
  position: google.maps.LatLngLiteral;
}

interface LocalIndustryMapProps {
  townName: string;
  county: string;
  className?: string;
}

const PLACE_TYPE_LABELS: Record<string, string> = {
  industrial_estate: "Industrial Estate",
  business_park: "Business Park",
  factory: "Factory / Works",
  warehouse: "Warehouse / Distribution",
  port: "Port / Dock",
  airport: "Airport",
};

const PLACE_TYPE_COLORS: Record<string, string> = {
  industrial_estate: "#2563eb",
  business_park: "#7c3aed",
  factory: "#dc2626",
  warehouse: "#d97706",
  port: "#0891b2",
  airport: "#059669",
};

export function LocalIndustryMap({ townName, county, className = "" }: LocalIndustryMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  const initMap = useCallback(async (map: google.maps.Map) => {
    mapRef.current = map;
    setIsLoading(true);

    try {
      // Step 1: Geocode the town name to get coordinates
      const geocoder = new google.maps.Geocoder();
      const geoResult = await new Promise<google.maps.GeocoderResult | null>((resolve) => {
        geocoder.geocode(
          { address: `${townName}, ${county}, UK` },
          (results, status) => {
            if (status === "OK" && results && results[0]) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        );
      });

      if (!geoResult) {
        setError("Unable to locate this town on the map.");
        setIsLoading(false);
        return;
      }

      const center = geoResult.geometry.location;
      map.setCenter(center);
      map.setZoom(12);

      // Step 2: Add main town marker
      const townMarkerEl = document.createElement("div");
      townMarkerEl.style.cssText = `
        background: #1e40af; color: white; padding: 6px 10px; border-radius: 20px;
        font-size: 12px; font-weight: 600; white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3); border: 2px solid white;
      `;
      townMarkerEl.textContent = `📍 ${townName}`;

      const townMarker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: center,
        title: `${townName} — Shot Blasting Services`,
        content: townMarkerEl,
      });
      markersRef.current.push(townMarker);

      // Step 3: Search for nearby industrial estates and business parks
      const placesService = new google.maps.places.PlacesService(map);
      const queries = [
        `industrial estate ${townName}`,
        `business park ${townName}`,
        `trading estate ${townName}`,
      ];

      const searchResults = await Promise.all(
        queries.map(
          (query) =>
            new Promise<google.maps.places.PlaceResult[]>((resolve) => {
              placesService.textSearch(
                { query, location: center, radius: 10000 },
                (results, status) => {
                  if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                    resolve(results.slice(0, 3));
                  } else {
                    resolve([]);
                  }
                }
              );
            })
        )
      );

      const seenNames = new Set<string>();
      const allLandmarks: Landmark[] = [];

      searchResults.flat().forEach((place) => {
        if (!place.geometry?.location || !place.name) return;
        const normalised = place.name.toLowerCase().trim();
        if (seenNames.has(normalised)) return;
        seenNames.add(normalised);

        let type: Landmark["type"] = "business_park";
        const nameLower = place.name.toLowerCase();
        if (nameLower.includes("industrial") || nameLower.includes("trading estate")) {
          type = "industrial_estate";
        } else if (nameLower.includes("port") || nameLower.includes("dock")) {
          type = "port";
        } else if (nameLower.includes("airport") || nameLower.includes("airfield")) {
          type = "airport";
        } else if (nameLower.includes("warehouse") || nameLower.includes("distribution")) {
          type = "warehouse";
        }

        allLandmarks.push({
          name: place.name,
          type,
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
        });
      });

      // Step 4: Add landmark markers
      allLandmarks.slice(0, 6).forEach((landmark) => {
        const markerEl = document.createElement("div");
        const color = PLACE_TYPE_COLORS[landmark.type] || "#374151";
        markerEl.style.cssText = `
          background: ${color}; color: white; padding: 4px 8px; border-radius: 12px;
          font-size: 11px; font-weight: 500; white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25); border: 1.5px solid white;
          max-width: 160px; overflow: hidden; text-overflow: ellipsis;
        `;
        markerEl.textContent = landmark.name;

        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: landmark.position,
          title: landmark.name,
          content: markerEl,
        });
        markersRef.current.push(marker);
      });

      setLandmarks(allLandmarks.slice(0, 6));

      // Fit bounds to show all markers
      if (allLandmarks.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(center);
        allLandmarks.slice(0, 6).forEach((l) => bounds.extend(l.position));
        map.fitBounds(bounds, { top: 40, right: 40, bottom: 40, left: 40 });
        google.maps.event.addListenerOnce(map, "bounds_changed", () => {
          if ((map.getZoom() ?? 0) > 14) map.setZoom(13);
        });
      }

      setIsLoading(false);
    } catch (err) {
      console.error("LocalIndustryMap error:", err);
      setError("Unable to load nearby industrial areas.");
      setIsLoading(false);
    }
  }, [townName, county]);

  return (
    <div className={`rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm ${className}`}>
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
        <Factory className="w-4 h-4 text-blue-600" />
        <h3 className="text-sm font-semibold text-gray-800">
          Industrial Areas Near {townName}
        </h3>
        <span className="ml-auto text-xs text-gray-500">{county}</span>
      </div>

      <div className="relative">
        <MapView
          initialCenter={{ lat: 52.5, lng: -1.5 }}
          initialZoom={10}
          onMapReady={initMap}
          className="w-full h-64"
        />
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              Loading nearby industrial areas…
            </div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        )}
      </div>

      {landmarks.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Nearby Industrial Locations
          </p>
          <ul className="space-y-1.5">
            {landmarks.map((lm, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <span
                  className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: PLACE_TYPE_COLORS[lm.type] || "#374151" }}
                />
                <span className="font-medium truncate">{lm.name}</span>
                <span className="text-xs text-gray-400 flex-shrink-0">
                  {PLACE_TYPE_LABELS[lm.type] || lm.type}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-400 mt-2">
            We provide mobile shot blasting services to all industrial estates and business parks in and around {townName}.
          </p>
        </div>
      )}
    </div>
  );
}
