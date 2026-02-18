import { useEffect, useRef, useState } from "react";
import { MapView } from "@/components/Map";

interface CountyMapProps {
  countyName: string;
  latitude: number;
  longitude: number;
  majorTowns: string[];
  townsAndVillages: string[];
}

export function CountyMap({ countyName, latitude, longitude, majorTowns, townsAndVillages }: CountyMapProps) {
  const [mapReady, setMapReady] = useState(false);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const handleMapReady = async (map: google.maps.Map) => {
    setMapReady(true);

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Create geocoder instance
    const geocoder = new google.maps.Geocoder();

    // Geocode and add markers for major towns (red markers)
    for (const town of majorTowns.slice(0, 4)) { // Limit to first 4 major towns
      try {
        const result = await geocoder.geocode({ 
          address: `${town}, ${countyName}, UK`,
          region: 'uk'
        });
        
        if (result.results[0]) {
          const marker = new google.maps.Marker({
            position: result.results[0].geometry.location,
            map: map,
            title: town,
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            }
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `<div style="padding: 8px;"><strong>${town}</strong><br/>Major Town</div>`
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          markersRef.current.push(marker);
        }
      } catch (error) {
        console.error(`Failed to geocode ${town}:`, error);
      }
    }

    // Geocode and add markers for selected villages (blue markers)
    const selectedVillages = townsAndVillages.slice(0, 8); // Limit to first 8 villages
    for (const village of selectedVillages) {
      try {
        const result = await geocoder.geocode({ 
          address: `${village}, ${countyName}, UK`,
          region: 'uk'
        });
        
        if (result.results[0]) {
          const marker = new google.maps.Marker({
            position: result.results[0].geometry.location,
            map: map,
            title: village,
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            }
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `<div style="padding: 8px;"><strong>${village}</strong><br/>Service Area</div>`
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          markersRef.current.push(marker);
        }
      } catch (error) {
        console.error(`Failed to geocode ${village}:`, error);
      }
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
            <span className="text-gray-700">Villages & Areas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
