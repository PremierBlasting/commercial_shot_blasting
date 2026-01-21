import { MapView } from "./Map";

// Location coordinates for all service areas
const LOCATION_COORDS: Record<string, { lat: number; lng: number }> = {
  Birmingham: { lat: 52.4862, lng: -1.8904 },
  Bristol: { lat: 51.4545, lng: -2.5879 },
  Cambridge: { lat: 52.2053, lng: 0.1218 },
  Cardiff: { lat: 51.4816, lng: -3.1791 },
  Chester: { lat: 53.1908, lng: -2.8908 },
  Chesterfield: { lat: 53.2350, lng: -1.4210 },
  Coventry: { lat: 52.4068, lng: -1.5197 },
  Derby: { lat: 52.9225, lng: -1.4746 },
  Gloucester: { lat: 51.8642, lng: -2.2382 },
  Hereford: { lat: 52.0565, lng: -2.7160 },
  Ipswich: { lat: 52.0594, lng: 1.1556 },
  Leeds: { lat: 53.8008, lng: -1.5491 },
  Leicester: { lat: 52.6369, lng: -1.1398 },
  Lincoln: { lat: 53.2307, lng: -0.5406 },
  Liverpool: { lat: 53.4084, lng: -2.9916 },
  Manchester: { lat: 53.4808, lng: -2.2426 },
  MiltonKeynes: { lat: 52.0406, lng: -0.7594 },
  Northampton: { lat: 52.2405, lng: -0.9027 },
  Norwich: { lat: 52.6309, lng: 1.2974 },
  Nottingham: { lat: 52.9548, lng: -1.1581 },
  Oxford: { lat: 51.7520, lng: -1.2577 },
  Peterborough: { lat: 52.5695, lng: -0.2405 },
  Sheffield: { lat: 53.3811, lng: -1.4701 },
  Shrewsbury: { lat: 52.7081, lng: -2.7535 },
  StAlbans: { lat: 51.7520, lng: -0.3360 },
  Stoke: { lat: 53.0027, lng: -2.1794 },
  StratfordUponAvon: { lat: 52.1917, lng: -1.7081 },
  Swindon: { lat: 51.5558, lng: -1.7797 },
  Wolverhampton: { lat: 52.5864, lng: -2.1285 },
  Worcester: { lat: 52.1920, lng: -2.2200 },
  Wrexham: { lat: 53.0462, lng: -2.9930 },
};

interface LocationMapProps {
  locationName: string;
}

export function LocationMap({ locationName }: LocationMapProps) {
  const coords = LOCATION_COORDS[locationName];
  
  if (!coords) {
    console.error(`No coordinates found for location: ${locationName}`);
    return null;
  }
  
  const { lat, lng } = coords;

  const handleMapReady = (map: google.maps.Map) => {
    // Add marker for the location
    new google.maps.Marker({
      position: { lat, lng },
      map,
      title: `${locationName} - Commercial Shot Blasting`,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#2C5F7F",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2,
      },
    });

    // Add 25-mile radius circle
    new google.maps.Circle({
      strokeColor: "#2C5F7F",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#2C5F7F",
      fillOpacity: 0.15,
      map,
      center: { lat, lng },
      radius: 40234, // 25 miles in meters
    });
  };

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapView
        initialCenter={{ lat, lng }}
        initialZoom={10}
        onMapReady={handleMapReady}
      />
    </div>
  );
}
