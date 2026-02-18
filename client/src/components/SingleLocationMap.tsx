import { MapView } from "@/components/Map";
import { useEffect, useState, useRef } from "react";

interface SingleLocationMapProps {
  locationName: string;
  county: string;
}

/**
 * SingleLocationMap Component
 * Displays an interactive Google Map centered on a specific location
 * with a marker showing the location name
 */
export function SingleLocationMap({ locationName, county }: SingleLocationMapProps) {
  const [mapReady, setMapReady] = useState(false);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Lazy load map when it comes into viewport
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadMap(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before map enters viewport
        threshold: 0.1,
      }
    );

    observer.observe(mapContainerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleMapReady = async (map: google.maps.Map) => {
    setMapReady(true);

    // Use Geocoding API to find the location
    const geocoder = new window.google.maps.Geocoder();
    const searchQuery = `${locationName}, ${county}, UK`;

    try {
      const result = await geocoder.geocode({ address: searchQuery });
      
      if (result.results && result.results.length > 0) {
        const location = result.results[0].geometry.location;
        
        // Center map on the location
        map.setCenter(location);
        map.setZoom(12);

        // Create marker
        const newMarker = new window.google.maps.Marker({
          position: location,
          map: map,
          title: locationName,
          animation: window.google.maps.Animation.DROP,
        });

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: bold; color: #2C5F7F;">
                ${locationName}
              </h3>
              <p style="margin: 0; font-size: 14px; color: #666;">
                Shot Blasting Services Available
              </p>
            </div>
          `,
        });

        // Open info window on marker click
        newMarker.addListener('click', () => {
          infoWindow.open(map, newMarker);
        });

        // Auto-open info window initially
        infoWindow.open(map, newMarker);

        setMarker(newMarker);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      // Fallback to county center if specific location not found
      try {
        const countyResult = await geocoder.geocode({ address: `${county}, UK` });
        if (countyResult.results && countyResult.results.length > 0) {
          map.setCenter(countyResult.results[0].geometry.location);
          map.setZoom(10);
        }
      } catch (fallbackError) {
        console.error('County geocoding error:', fallbackError);
      }
    }
  };

  return (
    <div 
      ref={mapContainerRef}
      className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center"
    >
      {shouldLoadMap ? (
        <MapView
          initialCenter={{ lat: 52.5, lng: -1.5 }}
          initialZoom={8}
          onMapReady={handleMapReady}
          className="w-full h-full"
        />
      ) : (
        <div className="text-gray-500 flex flex-col items-center gap-2">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm">Loading map...</p>
        </div>
      )}
    </div>
  );
}
