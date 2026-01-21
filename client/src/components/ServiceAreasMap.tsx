import { useRef, useState } from "react";
import { MapView } from "./Map";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceLocation {
  name: string;
  position: google.maps.LatLngLiteral;
  region?: string;
}

// All service locations across England and Wales
const serviceLocations: ServiceLocation[] = [
  // West Midlands Core
  { name: "Birmingham", position: { lat: 52.4862, lng: -1.8904 }, region: "West Midlands" },
  { name: "Wolverhampton", position: { lat: 52.5870, lng: -2.1288 }, region: "West Midlands" },
  { name: "Coventry", position: { lat: 52.4068, lng: -1.5197 }, region: "West Midlands" },
  { name: "Worcester", position: { lat: 52.1936, lng: -2.2216 }, region: "West Midlands" },
  { name: "Stratford Upon Avon", position: { lat: 52.1917, lng: -1.7083 }, region: "West Midlands" },
  
  // East Midlands
  { name: "Nottingham", position: { lat: 52.9548, lng: -1.1581 }, region: "East Midlands" },
  { name: "Leicester", position: { lat: 52.6369, lng: -1.1398 }, region: "East Midlands" },
  { name: "Derby", position: { lat: 52.9225, lng: -1.4746 }, region: "East Midlands" },
  { name: "Northampton", position: { lat: 52.2405, lng: -0.9027 }, region: "East Midlands" },
  { name: "Chesterfield", position: { lat: 53.2350, lng: -1.4210 }, region: "East Midlands" },
  { name: "Lincoln", position: { lat: 53.2307, lng: -0.5406 }, region: "East Midlands" },
  
  // Yorkshire
  { name: "Sheffield", position: { lat: 53.3811, lng: -1.4701 }, region: "Yorkshire" },
  { name: "Leeds", position: { lat: 53.8008, lng: -1.5491 }, region: "Yorkshire" },
  { name: "Bradford", position: { lat: 53.7960, lng: -1.7594 }, region: "Yorkshire" },
  
  // North West
  { name: "Liverpool", position: { lat: 53.4084, lng: -2.9916 }, region: "North West" },
  { name: "Manchester", position: { lat: 53.4808, lng: -2.2426 }, region: "North West" },
  { name: "Chester", position: { lat: 53.1930, lng: -2.8931 }, region: "North West" },
  { name: "Stoke", position: { lat: 53.0027, lng: -2.1794 }, region: "North West" },
  
  // East of England
  { name: "Norwich", position: { lat: 52.6309, lng: 1.2974 }, region: "East of England" },
  { name: "Cambridge", position: { lat: 52.2053, lng: 0.1218 }, region: "East of England" },
  { name: "Peterborough", position: { lat: 52.5695, lng: -0.2405 }, region: "East of England" },
  { name: "St Albans", position: { lat: 51.7520, lng: -0.3390 }, region: "East of England" },
  { name: "Ipswich", position: { lat: 52.0567, lng: 1.1482 }, region: "East of England" },
  
  // South West
  { name: "Bristol", position: { lat: 51.4545, lng: -2.5879 }, region: "South West" },
  { name: "Gloucester", position: { lat: 51.8642, lng: -2.2382 }, region: "South West" },
  { name: "Swindon", position: { lat: 51.5558, lng: -1.7797 }, region: "South West" },
  
  // South East / Thames Valley
  { name: "Oxford", position: { lat: 51.7520, lng: -1.2577 }, region: "South East" },
  { name: "Milton Keynes", position: { lat: 52.0406, lng: -0.7594 }, region: "South East" },
  
  // Welsh Borders & Wales
  { name: "Shrewsbury", position: { lat: 52.7077, lng: -2.7540 }, region: "Welsh Borders" },
  { name: "Hereford", position: { lat: 52.0565, lng: -2.7160 }, region: "Welsh Borders" },
  { name: "Wrexham", position: { lat: 53.0469, lng: -2.9927 }, region: "Welsh Borders" },
  { name: "Cardiff", position: { lat: 51.4816, lng: -3.1791 }, region: "Wales" },
];

// Regional coverage areas for circles
const regionalCoverage = [
  {
    id: "west-midlands",
    name: "West Midlands",
    center: { lat: 52.4862, lng: -1.9500 },
    radius: 40000,
    color: "#2C5F7F",
    description: "Our home region - Birmingham, Wolverhampton, Coventry & surrounding areas"
  },
  {
    id: "east-midlands",
    name: "East Midlands",
    center: { lat: 52.7500, lng: -1.2000 },
    radius: 45000,
    color: "#1a3d52",
    description: "Nottingham, Leicester, Derby, Chesterfield, Lincoln & Northampton"
  },
  {
    id: "yorkshire",
    name: "Yorkshire",
    center: { lat: 53.6000, lng: -1.6000 },
    radius: 50000,
    color: "#2a6b8a",
    description: "Sheffield, Leeds, Bradford & Yorkshire"
  },
  {
    id: "north-west",
    name: "North West",
    center: { lat: 53.3500, lng: -2.5000 },
    radius: 50000,
    color: "#3d7a9e",
    description: "Liverpool, Manchester, Chester & Stoke"
  },
  {
    id: "east-england",
    name: "East of England",
    center: { lat: 52.4000, lng: 0.5000 },
    radius: 55000,
    color: "#4a8fb8",
    description: "Norwich, Cambridge, Peterborough, Ipswich & St Albans"
  },
  {
    id: "south-west",
    name: "South West",
    center: { lat: 51.6500, lng: -2.3000 },
    radius: 40000,
    color: "#5a9fc8",
    description: "Bristol, Gloucester & Swindon"
  },
  {
    id: "south-east",
    name: "South East",
    center: { lat: 51.9000, lng: -0.9000 },
    radius: 35000,
    color: "#6aafda",
    description: "Oxford & Milton Keynes"
  },
  {
    id: "welsh-borders",
    name: "Welsh Borders & Wales",
    center: { lat: 52.2000, lng: -3.0000 },
    radius: 50000,
    color: "#d4a853",
    description: "Shrewsbury, Hereford, Wrexham & Cardiff"
  }
];

interface ServiceAreasMapProps {
  onAreaClick?: (areaId: string) => void;
  onQuoteClick?: () => void;
}

export function ServiceAreasMap({ onAreaClick, onQuoteClick }: ServiceAreasMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<typeof regionalCoverage[0] | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    setIsMapLoaded(true);

    // Add coverage circles for each region
    regionalCoverage.forEach((region) => {
      const circle = new google.maps.Circle({
        map,
        center: region.center,
        radius: region.radius,
        fillColor: region.color,
        fillOpacity: 0.15,
        strokeColor: region.color,
        strokeOpacity: 0.6,
        strokeWeight: 2,
        clickable: true,
      });

      circle.addListener("click", () => {
        setSelectedRegion(region);
        map.panTo(region.center);
        map.setZoom(9);
        if (onAreaClick) {
          onAreaClick(region.id);
        }
      });
    });

    // Add markers for all service locations
    serviceLocations.forEach((location) => {
      const markerContent = document.createElement("div");
      markerContent.innerHTML = `
        <div style="
          background: #2C5F7F;
          color: white;
          padding: 6px 10px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 12px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        ">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          ${location.name}
        </div>
      `;

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: location.position,
        content: markerContent,
        title: location.name,
      });

      marker.addListener("click", () => {
        // Convert location name to URL slug
        const slug = location.name.toLowerCase().replace(/\s+/g, '-');
        // Navigate to location page if it exists, otherwise zoom to location
        const locationPages = [
          'birmingham', 'wolverhampton', 'coventry', 'worcester', 'stratford-upon-avon',
          'nottingham', 'leicester', 'derby', 'lincoln', 'northampton', 'chesterfield',
          'sheffield', 'leeds', 'bradford',
          'manchester', 'liverpool', 'chester', 'stoke',
          'norwich', 'cambridge', 'ipswich', 'st-albans', 'peterborough',
          'bristol', 'gloucester', 'swindon',
          'milton-keynes', 'oxford',
          'shrewsbury', 'hereford', 'cardiff', 'wrexham'
        ];
        
        if (locationPages.includes(slug)) {
          window.location.href = `/service-areas/${slug}`;
        } else {
          const region = regionalCoverage.find(r => 
            serviceLocations.filter(l => l.region === location.region)
              .some(l => l.name === location.name)
          );
          if (region) {
            setSelectedRegion(region);
          }
          map.panTo(location.position);
          map.setZoom(11);
        }
      });
    });

    // Add HQ marker LAST so it renders on top (highest z-index)
    const hqContent = document.createElement("div");
    hqContent.innerHTML = `
      <div style="
        background: #d4a853;
        color: #1a3d52;
        padding: 10px 14px;
        border-radius: 8px;
        font-weight: bold;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        cursor: pointer;
        border: 3px solid #1a3d52;
        position: relative;
        z-index: 9999;
      ">
        🏭 CSB HQ
      </div>
    `;

    new google.maps.marker.AdvancedMarkerElement({
      map,
      position: { lat: 52.5200, lng: -2.0500 },
      content: hqContent,
      title: "Commercial Shot Blasting HQ",
      zIndex: 9999,
    });
  };

  const handleZoomToRegion = (region: typeof regionalCoverage[0]) => {
    if (mapRef.current) {
      mapRef.current.panTo(region.center);
      mapRef.current.setZoom(9);
      setSelectedRegion(region);
      if (onAreaClick) {
        onAreaClick(region.id);
      }
    }
  };

  const handleShowAll = () => {
    if (mapRef.current) {
      mapRef.current.setCenter({ lat: 52.8, lng: -1.8 });
      mapRef.current.setZoom(6);
      setSelectedRegion(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white">
        <MapView
          className="h-[500px] md:h-[600px]"
          initialCenter={{ lat: 52.8, lng: -1.8 }}
          initialZoom={6}
          onMapReady={handleMapReady}
        />
        
        {/* Loading overlay */}
        {!isMapLoaded && (
          <div className="absolute inset-0 bg-[#1a3d52] flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
              <p>Loading map...</p>
            </div>
          </div>
        )}

        {/* Selected Region Info Card */}
        {selectedRegion && (
          <Card className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white/95 backdrop-blur shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: selectedRegion.color }}
                >
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#1a3d52]">{selectedRegion.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{selectedRegion.description}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-[#2C5F7F] hover:bg-[#1a3d52] text-xs"
                      onClick={onQuoteClick}
                    >
                      Get Quote
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs"
                      onClick={handleShowAll}
                    >
                      View All Areas
                    </Button>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedRegion(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Region Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {regionalCoverage.slice(0, 4).map((region) => (
          <button
            key={region.id}
            onClick={() => handleZoomToRegion(region)}
            className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition group text-left"
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition flex-shrink-0"
              style={{ backgroundColor: region.color }}
            >
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-[#1a3d52] text-sm group-hover:text-[#2C5F7F] transition truncate">
                {region.name}
              </h4>
            </div>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {regionalCoverage.slice(4).map((region) => (
          <button
            key={region.id}
            onClick={() => handleZoomToRegion(region)}
            className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition group text-left"
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition flex-shrink-0"
              style={{ backgroundColor: region.color }}
            >
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-[#1a3d52] text-sm group-hover:text-[#2C5F7F] transition truncate">
                {region.name}
              </h4>
            </div>
          </button>
        ))}
        <button
          onClick={handleShowAll}
          className="flex items-center gap-2 p-3 bg-[#d4a853]/10 border-2 border-[#d4a853] rounded-lg hover:bg-[#d4a853]/20 transition group text-left"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#d4a853] group-hover:scale-110 transition flex-shrink-0">
            <MapPin className="w-4 h-4 text-[#1a3d52]" />
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-[#1a3d52] text-sm group-hover:text-[#2C5F7F] transition">
              All Regions
            </h4>
          </div>
        </button>
      </div>

      {/* Location List */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-[#1a3d52] mb-4">All Service Locations</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {serviceLocations.map((location) => {
            const slug = location.name.toLowerCase().replace(/\s+/g, '-');
            const locationPages = [
              'birmingham', 'wolverhampton', 'coventry', 'worcester', 'stratford-upon-avon',
              'nottingham', 'leicester', 'derby', 'lincoln', 'chesterfield', 'northampton',
              'sheffield', 'leeds', 'bradford',
              'manchester', 'liverpool', 'chester', 'stoke',
              'norwich', 'cambridge', 'ipswich', 'st-albans', 'peterborough',
              'bristol', 'gloucester', 'swindon',
              'milton-keynes', 'oxford',
              'shrewsbury', 'hereford', 'cardiff', 'wrexham'
            ];
            const hasPage = locationPages.includes(slug);

            return hasPage ? (
              <a
                key={location.name}
                href={`/service-areas/${slug}`}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition"
              >
                <div className="w-2 h-2 rounded-full bg-[#2C5F7F]" />
                <span className="text-sm text-gray-700 hover:text-[#2C5F7F] hover:underline">{location.name}</span>
              </a>
            ) : (
              <div
                key={location.name}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.panTo(location.position);
                    mapRef.current.setZoom(11);
                  }
                }}
              >
                <div className="w-2 h-2 rounded-full bg-[#2C5F7F]" />
                <span className="text-sm text-gray-700">{location.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-[#1a3d52] rounded-xl p-6 text-center text-white">
        <h3 className="text-xl font-semibold mb-2">Not sure if we cover your area?</h3>
        <p className="text-white/70 mb-4">We travel across England and Wales for larger projects. Give us a call to discuss your requirements.</p>
        <Button 
          className="bg-[#d4a853] hover:bg-[#c49843] text-[#1a3d52] font-semibold"
          asChild
        >
          <a href="tel:07970566409">
            <Phone className="w-4 h-4 mr-2" />
            Call 07970 566409
          </a>
        </Button>
      </div>
    </div>
  );
}
