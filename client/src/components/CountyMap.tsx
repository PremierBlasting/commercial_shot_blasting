import { useEffect, useRef, useState } from "react";
import { MapView } from "@/components/Map";
import { locationData } from "@/data/locationData";

interface CountyMapProps {
  countyName: string;
  latitude: number;
  longitude: number;
  majorTowns: string[];
  townsAndVillages: string[];
  countySlug?: string;
}

function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
}

export function CountyMap({ countyName, latitude, longitude, majorTowns, townsAndVillages, countySlug }: CountyMapProps) {
  const [mapReady, setMapReady] = useState(false);
  const [markerCount, setMarkerCount] = useState(0);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const openInfoRef = useRef<google.maps.InfoWindow | null>(null);

  const handleMapReady = async (map: google.maps.Map) => {
    setMapReady(true);

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    let placed = 0;

    const geocoder = new google.maps.Geocoder();

    // Helper: create a marker with info window linking to service area page
    const addMarker = async (
      name: string,
      isMajor: boolean,
    ) => {
      try {
        const result = await geocoder.geocode({
          address: `${name}, ${countyName}, UK`,
          region: "uk",
        });
        if (!result.results[0]) return;

        const slug = toSlug(name);
        const hasPage = !!locationData[slug];
        const serviceLink = hasPage
          ? `<br/><a href="/areas/${slug}" style="color:#2C5F7F;font-weight:600;font-size:12px;">View service area →</a>`
          : "";

        const marker = new google.maps.Marker({
          position: result.results[0].geometry.location,
          map,
          title: name,
          icon: {
            url: isMajor
              ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
              : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div style="padding:8px;min-width:140px;font-family:sans-serif;">
            <strong style="font-size:13px;">${name}</strong>
            <div style="font-size:11px;color:#666;margin-top:2px;">${isMajor ? "Major Town" : "Service Area"} · ${countyName}</div>
            <div style="font-size:11px;color:#444;margin-top:4px;">Shot blasting services available${serviceLink}</div>
          </div>`,
        });

        marker.addListener("click", () => {
          if (openInfoRef.current) openInfoRef.current.close();
          infoWindow.open(map, marker);
          openInfoRef.current = infoWindow;
        });

        markersRef.current.push(marker);
        placed++;
        setMarkerCount(placed);
      } catch {
        // silently skip geocode failures
      }
    };

    // Add major towns first (up to 6)
    for (const town of majorTowns.slice(0, 6)) {
      await addMarker(town, true);
    }

    // Add villages/areas (up to 12)
    const villages = townsAndVillages
      .filter((v) => !majorTowns.includes(v))
      .slice(0, 12);
    for (const village of villages) {
      await addMarker(village, false);
    }
  };

  return (
    <div className="relative">
      <MapView
        initialCenter={{ lat: latitude, lng: longitude }}
        initialZoom={10}
        onMapReady={handleMapReady}
        className="w-full h-[500px] rounded-xl shadow-lg"
      />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 z-10">
        <h4 className="font-semibold text-sm text-[#2C2C2C] mb-2">Service Coverage</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-700">Major Towns</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-700">Villages &amp; Areas</span>
          </div>
        </div>
        {markerCount > 0 && (
          <p className="text-xs text-gray-400 mt-2">{markerCount} locations shown</p>
        )}
      </div>

      {/* Loading overlay */}
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
          <p className="text-gray-500 text-sm">Loading map…</p>
        </div>
      )}
    </div>
  );
}
