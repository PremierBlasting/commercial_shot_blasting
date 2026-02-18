import { useEffect, useRef, useState } from "react";
import { MapView } from "./Map";

interface ServiceRadiusMapProps {
  locationName: string;
  county: string;
  radiusMiles?: number;
}

export function ServiceRadiusMap({
  locationName,
  county,
  radiusMiles = 30,
}: ServiceRadiusMapProps) {
  const circleRef = useRef<google.maps.Circle | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
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
    // Clear existing circle and marker if they exist
    if (circleRef.current) {
      circleRef.current.setMap(null);
    }
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    // Use Geocoding API to find the location
    const geocoder = new google.maps.Geocoder();
    const searchQuery = `${locationName}, ${county}, UK`;

    try {
      const result = await geocoder.geocode({ address: searchQuery });
      
      if (result.results && result.results.length > 0) {
        const location = result.results[0].geometry.location;
        const center = { lat: location.lat(), lng: location.lng() };

        // Add marker for the location
        markerRef.current = new google.maps.Marker({
          position: center,
          map: map,
          title: locationName,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#E8B84A",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        });

        // Convert miles to meters (1 mile = 1609.34 meters)
        const radiusMeters = radiusMiles * 1609.34;

        // Add circle showing service radius
        circleRef.current = new google.maps.Circle({
          strokeColor: "#E8B84A",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#E8B84A",
          fillOpacity: 0.15,
          map: map,
          center: center,
          radius: radiusMeters,
        });

        // Fit map to circle bounds
        const bounds = circleRef.current.getBounds();
        if (bounds) {
          map.fitBounds(bounds);
        }
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      // Fallback to county center if specific location not found
      try {
        const countyResult = await geocoder.geocode({ address: `${county}, UK` });
        if (countyResult.results && countyResult.results.length > 0) {
          const location = countyResult.results[0].geometry.location;
          map.setCenter(location);
          map.setZoom(9);
        }
      } catch (fallbackError) {
        console.error('County geocoding error:', fallbackError);
      }
    }
  };

  return (
    <div ref={mapContainerRef} className="w-full">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-t-lg border-b-2 border-primary/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Our Service Area
        </h3>
        <p className="text-gray-700">
          We serve <span className="font-semibold text-primary">{locationName}</span> and all surrounding areas within a{" "}
          <span className="font-semibold text-primary">{radiusMiles}-mile radius</span>. 
          Our mobile shot blasting service brings professional equipment directly to your site.
        </p>
      </div>
      <div className="relative w-full h-[400px] md:h-[500px] rounded-b-lg overflow-hidden border border-gray-200 shadow-md bg-gray-100 flex items-center justify-center">
        {shouldLoadMap ? (
          <MapView
            onMapReady={handleMapReady}
            initialCenter={{ lat: 52.5, lng: -1.5 }}
            initialZoom={8}
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
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg
                className="h-5 w-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Service Radius</p>
              <p className="text-lg font-bold text-gray-900">{radiusMiles} Miles</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg
                className="h-5 w-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Response Time</p>
              <p className="text-lg font-bold text-gray-900">Same Day</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg
                className="h-5 w-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Free Quotes</p>
              <p className="text-lg font-bold text-gray-900">24 Hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
