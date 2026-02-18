import { useRef, useState } from "react";
import { MapView } from "./Map";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackPhoneCall } from "@/lib/analytics";

interface ServiceLocation {
  name: string;
  position: google.maps.LatLngLiteral;
  region?: string;
}

// All service locations across England and Wales - organized by county/region
const serviceLocations: ServiceLocation[] = [
  // West Midlands (Metro)
  { name: "Birmingham", position: { lat: 52.4862, lng: -1.8904 }, region: "West Midlands" },
  { name: "Wolverhampton", position: { lat: 52.5870, lng: -2.1288 }, region: "West Midlands" },
  { name: "Coventry", position: { lat: 52.4068, lng: -1.5197 }, region: "West Midlands" },
  { name: "Dudley", position: { lat: 52.5086, lng: -2.0872 }, region: "West Midlands" },
  { name: "Solihull", position: { lat: 52.4130, lng: -1.7780 }, region: "West Midlands" },
  { name: "Sutton Coldfield", position: { lat: 52.5637, lng: -1.8226 }, region: "West Midlands" },
  { name: "Walsall", position: { lat: 52.5860, lng: -1.9829 }, region: "West Midlands" },
  
  // Warwickshire
  { name: "Leamington Spa", position: { lat: 52.2852, lng: -1.5200 }, region: "Warwickshire" },
  { name: "Rugby", position: { lat: 52.3708, lng: -1.2615 }, region: "Warwickshire" },
  { name: "Stratford Upon Avon", position: { lat: 52.1917, lng: -1.7083 }, region: "Warwickshire" },
  { name: "Nuneaton", position: { lat: 52.5225, lng: -1.4684 }, region: "Warwickshire" },
  
  // Worcestershire
  { name: "Worcester", position: { lat: 52.1936, lng: -2.2216 }, region: "Worcestershire" },
  { name: "Kidderminster", position: { lat: 52.3885, lng: -2.2490 }, region: "Worcestershire" },
  { name: "Redditch", position: { lat: 52.3065, lng: -1.9454 }, region: "Worcestershire" },
  
  // Staffordshire
  { name: "Stoke-on-Trent", position: { lat: 53.0027, lng: -2.1794 }, region: "Staffordshire" },
  { name: "Stafford", position: { lat: 52.8062, lng: -2.1174 }, region: "Staffordshire" },
  { name: "Burton upon Trent", position: { lat: 52.8022, lng: -1.6426 }, region: "Staffordshire" },
  { name: "Cannock", position: { lat: 52.6906, lng: -2.0306 }, region: "Staffordshire" },
  { name: "Cannock Chase", position: { lat: 52.7500, lng: -2.0000 }, region: "Staffordshire" },
  { name: "Lichfield", position: { lat: 52.6833, lng: -1.8261 }, region: "Staffordshire" },
  { name: "Tamworth", position: { lat: 52.6340, lng: -1.6911 }, region: "Staffordshire" },
  { name: "Newcastle-under-Lyme", position: { lat: 53.0108, lng: -2.2285 }, region: "Staffordshire" },
  
  // Nottinghamshire
  { name: "Nottingham", position: { lat: 52.9548, lng: -1.1581 }, region: "Nottinghamshire" },
  { name: "Mansfield", position: { lat: 53.1397, lng: -1.1970 }, region: "Nottinghamshire" },
  
  // Leicestershire
  { name: "Leicester", position: { lat: 52.6369, lng: -1.1398 }, region: "Leicestershire" },
  { name: "Loughborough", position: { lat: 52.7721, lng: -1.2062 }, region: "Leicestershire" },
  { name: "Coalville", position: { lat: 52.7244, lng: -1.3691 }, region: "Leicestershire" },
  
  // Derbyshire
  { name: "Derby", position: { lat: 52.9225, lng: -1.4746 }, region: "Derbyshire" },
  { name: "Chesterfield", position: { lat: 53.2350, lng: -1.4210 }, region: "Derbyshire" },
  { name: "Dronfield", position: { lat: 53.3019, lng: -1.4663 }, region: "Derbyshire" },
  
  // Lincolnshire
  { name: "Lincoln", position: { lat: 53.2307, lng: -0.5406 }, region: "Lincolnshire" },
  { name: "Grantham", position: { lat: 52.9118, lng: -0.6417 }, region: "Lincolnshire" },
  { name: "Scunthorpe", position: { lat: 53.5809, lng: -0.6502 }, region: "Lincolnshire" },
  
  // Northamptonshire
  { name: "Northampton", position: { lat: 52.2405, lng: -0.9027 }, region: "Northamptonshire" },
  { name: "Corby", position: { lat: 52.4877, lng: -0.7006 }, region: "Northamptonshire" },
  { name: "Kettering", position: { lat: 52.3931, lng: -0.7229 }, region: "Northamptonshire" },
  { name: "Wellingborough", position: { lat: 52.3026, lng: -0.6946 }, region: "Northamptonshire" },
  
  // Yorkshire
  { name: "Sheffield", position: { lat: 53.3811, lng: -1.4701 }, region: "Yorkshire" },
  { name: "Leeds", position: { lat: 53.8008, lng: -1.5491 }, region: "Yorkshire" },
  { name: "Barnsley", position: { lat: 53.5526, lng: -1.4793 }, region: "Yorkshire" },
  { name: "Doncaster", position: { lat: 53.5228, lng: -1.1285 }, region: "Yorkshire" },
  { name: "Rotherham", position: { lat: 53.4326, lng: -1.3635 }, region: "Yorkshire" },
  { name: "Halifax", position: { lat: 53.7217, lng: -1.8630 }, region: "Yorkshire" },
  { name: "Huddersfield", position: { lat: 53.6458, lng: -1.7850 }, region: "Yorkshire" },
  
  // Greater Manchester
  { name: "Manchester", position: { lat: 53.4808, lng: -2.2426 }, region: "Greater Manchester" },
  { name: "Bolton", position: { lat: 53.5785, lng: -2.4299 }, region: "Greater Manchester" },
  { name: "Oldham", position: { lat: 53.5409, lng: -2.1114 }, region: "Greater Manchester" },
  { name: "Rochdale", position: { lat: 53.6097, lng: -2.1561 }, region: "Greater Manchester" },
  { name: "Salford", position: { lat: 53.4875, lng: -2.2901 }, region: "Greater Manchester" },
  { name: "Stockport", position: { lat: 53.4106, lng: -2.1575 }, region: "Greater Manchester" },
  
  // Merseyside
  { name: "Liverpool", position: { lat: 53.4084, lng: -2.9916 }, region: "Merseyside" },
  { name: "Birkenhead", position: { lat: 53.3934, lng: -3.0147 }, region: "Merseyside" },
  
  // Cheshire
  { name: "Chester", position: { lat: 53.1930, lng: -2.8931 }, region: "Cheshire" },
  { name: "Warrington", position: { lat: 53.3900, lng: -2.5970 }, region: "Cheshire" },
  { name: "Runcorn", position: { lat: 53.3419, lng: -2.7335 }, region: "Cheshire" },
  { name: "Crewe", position: { lat: 53.0988, lng: -2.4406 }, region: "Cheshire" },
  { name: "Macclesfield", position: { lat: 53.2587, lng: -2.1257 }, region: "Cheshire" },
  
  // Norfolk
  { name: "Norwich", position: { lat: 52.6309, lng: 1.2974 }, region: "Norfolk" },
  { name: "King's Lynn", position: { lat: 52.7540, lng: 0.3983 }, region: "Norfolk" },
  { name: "Great Yarmouth", position: { lat: 52.6061, lng: 1.7298 }, region: "Norfolk" },
  { name: "Thetford", position: { lat: 52.4143, lng: 0.7442 }, region: "Norfolk" },
  
  // Suffolk
  { name: "Ipswich", position: { lat: 52.0567, lng: 1.1482 }, region: "Suffolk" },
  { name: "Bury St Edmunds", position: { lat: 52.2474, lng: 0.7183 }, region: "Suffolk" },
  { name: "Lowestoft", position: { lat: 52.4797, lng: 1.7500 }, region: "Suffolk" },
  
  // Cambridgeshire
  { name: "Cambridge", position: { lat: 52.2053, lng: 0.1218 }, region: "Cambridgeshire" },
  { name: "Peterborough", position: { lat: 52.5695, lng: -0.2405 }, region: "Cambridgeshire" },
  
  // Essex
  { name: "Colchester", position: { lat: 51.8959, lng: 0.8919 }, region: "Essex" },
  { name: "Chelmsford", position: { lat: 51.7356, lng: 0.4685 }, region: "Essex" },
  { name: "Basildon", position: { lat: 51.5761, lng: 0.4886 }, region: "Essex" },
  { name: "Southend-on-Sea", position: { lat: 51.5459, lng: 0.7077 }, region: "Essex" },
  
  // Hertfordshire
  { name: "St Albans", position: { lat: 51.7520, lng: -0.3390 }, region: "Hertfordshire" },
  { name: "Watford", position: { lat: 51.6565, lng: -0.3903 }, region: "Hertfordshire" },
  { name: "Stevenage", position: { lat: 51.9019, lng: -0.2019 }, region: "Hertfordshire" },
  { name: "Hemel Hempstead", position: { lat: 51.7526, lng: -0.4692 }, region: "Hertfordshire" },
  { name: "Welwyn Garden City", position: { lat: 51.8010, lng: -0.2063 }, region: "Hertfordshire" },
  
  // Bedfordshire
  { name: "Bedford", position: { lat: 52.1356, lng: -0.4673 }, region: "Bedfordshire" },
  { name: "Luton", position: { lat: 51.8787, lng: -0.4200 }, region: "Bedfordshire" },
  { name: "Leighton Buzzard", position: { lat: 51.9166, lng: -0.6617 }, region: "Bedfordshire" },
  
  // Bristol & Bath
  { name: "Bristol", position: { lat: 51.4545, lng: -2.5879 }, region: "Bristol & Bath" },
  { name: "Bath", position: { lat: 51.3758, lng: -2.3599 }, region: "Bristol & Bath" },
  { name: "Kingswood", position: { lat: 51.4583, lng: -2.5000 }, region: "Bristol & Bath" },
  
  // Gloucestershire
  { name: "Gloucester", position: { lat: 51.8642, lng: -2.2382 }, region: "Gloucestershire" },
  { name: "Cheltenham", position: { lat: 51.8994, lng: -2.0783 }, region: "Gloucestershire" },
  
  // Wiltshire
  { name: "Swindon", position: { lat: 51.5558, lng: -1.7797 }, region: "Wiltshire" },
  { name: "Salisbury", position: { lat: 51.0688, lng: -1.7945 }, region: "Wiltshire" },
  
  // Somerset
  { name: "Taunton", position: { lat: 51.0147, lng: -3.1029 }, region: "Somerset" },
  { name: "Weston-super-Mare", position: { lat: 51.3460, lng: -2.9770 }, region: "Somerset" },
  
  // Oxfordshire
  { name: "Oxford", position: { lat: 51.7520, lng: -1.2577 }, region: "Oxfordshire" },
  { name: "Banbury", position: { lat: 52.0629, lng: -1.3397 }, region: "Oxfordshire" },
  
  // Buckinghamshire
  { name: "Milton Keynes", position: { lat: 52.0406, lng: -0.7594 }, region: "Buckinghamshire" },
  { name: "Aylesbury", position: { lat: 51.8168, lng: -0.8084 }, region: "Buckinghamshire" },
  { name: "High Wycombe", position: { lat: 51.6287, lng: -0.7482 }, region: "Buckinghamshire" },
  
  // Berkshire
  { name: "Reading", position: { lat: 51.4543, lng: -0.9781 }, region: "Berkshire" },
  { name: "Slough", position: { lat: 51.5105, lng: -0.5950 }, region: "Berkshire" },
  
  // Surrey
  { name: "Guildford", position: { lat: 51.2362, lng: -0.5704 }, region: "Surrey" },
  
  // Hampshire
  { name: "Portsmouth", position: { lat: 50.8198, lng: -1.0880 }, region: "Hampshire" },
  
  // Shropshire
  { name: "Shrewsbury", position: { lat: 52.7077, lng: -2.7540 }, region: "Shropshire" },
  { name: "Telford", position: { lat: 52.6778, lng: -2.4497 }, region: "Shropshire" },
  
  // Herefordshire & Wales
  { name: "Hereford", position: { lat: 52.0565, lng: -2.7160 }, region: "Herefordshire" },
  { name: "Cardiff", position: { lat: 51.4816, lng: -3.1791 }, region: "Wales" },
  { name: "Wrexham", position: { lat: 53.0469, lng: -2.9927 }, region: "Wales" },
  { name: "Newport", position: { lat: 51.5842, lng: -2.9977 }, region: "Wales" },
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
    name: "Herefordshire & Wales",
    center: { lat: 52.2000, lng: -3.0000 },
    radius: 50000,
    color: "#d4a853",
    description: "Shrewsbury, Hereford, Wrexham & Cardiff"
  },
  {
    id: "lincoln",
    name: "Lincoln Area",
    center: { lat: 53.2307, lng: -0.5406 },
    radius: 35000,
    color: "#7abfea",
    description: "Lincoln & surrounding Lincolnshire areas"
  },
  {
    id: "shropshire",
    name: "Shropshire",
    center: { lat: 52.8600, lng: -3.0500 },
    radius: 35000,
    color: "#8acffa",
    description: "Oswestry & North Shropshire"
  },
  {
    id: "cotswolds",
    name: "Cotswolds",
    center: { lat: 51.9500, lng: -1.8500 },
    radius: 30000,
    color: "#9adfff",
    description: "Cotswolds area including Cirencester & surrounding villages"
  },
  {
    id: "peterborough",
    name: "Peterborough Area",
    center: { lat: 52.5695, lng: -0.2405 },
    radius: 35000,
    color: "#aae5ff",
    description: "Peterborough & surrounding Cambridgeshire areas"
  },
  {
    id: "northampton",
    name: "Northampton Area",
    center: { lat: 52.2405, lng: -0.9027 },
    radius: 35000,
    color: "#b5ebff",
    description: "Northampton & surrounding Northamptonshire areas"
  },
  {
    id: "staffordshire",
    name: "Staffordshire",
    center: { lat: 52.7500, lng: -2.1200 },
    radius: 30000,
    color: "#c0f0ff",
    description: "Stafford, Telford & South Staffordshire"
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
      mapRef.current.setZoom(8);
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
          initialZoom={8}
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

      {/* Location List - Grouped by County/Region */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-[#1a3d52] mb-6">All Service Locations</h3>
        {(() => {
          // Map location names to their URL slugs
          const locationSlugMap: Record<string, string> = {
            "Birmingham": "birmingham", "Wolverhampton": "wolverhampton", "Coventry": "coventry",
            "Worcester": "worcester", "Stratford Upon Avon": "stratford-upon-avon", "Dudley": "dudley",
            "Solihull": "solihull", "Sutton Coldfield": "sutton-coldfield", "Walsall": "walsall",
            "Kidderminster": "kidderminster", "Redditch": "redditch", "Nuneaton": "nuneaton",
            "Leamington Spa": "leamington-spa", "Rugby": "rugby", "Stoke-on-Trent": "stoke",
            "Stafford": "stafford", "Burton upon Trent": "burton-upon-trent", "Cannock": "cannock",
            "Cannock Chase": "cannock-chase", "Lichfield": "lichfield", "Tamworth": "tamworth",
            "Newcastle-under-Lyme": "newcastle-under-lyme", "Nottingham": "nottingham",
            "Leicester": "leicester", "Derby": "derby", "Northampton": "northampton",
            "Chesterfield": "chesterfield", "Lincoln": "lincoln", "Mansfield": "mansfield",
            "Loughborough": "loughborough", "Coalville": "coalville", "Corby": "corby",
            "Kettering": "kettering", "Wellingborough": "wellingborough", "Grantham": "grantham",
            "Scunthorpe": "scunthorpe", "Dronfield": "dronfield", "Sheffield": "sheffield",
            "Leeds": "leeds", "Barnsley": "barnsley", "Doncaster": "doncaster",
            "Rotherham": "rotherham", "Halifax": "halifax", "Huddersfield": "huddersfield",
            "Manchester": "manchester", "Liverpool": "liverpool", "Chester": "chester",
            "Bolton": "bolton", "Oldham": "oldham", "Rochdale": "rochdale", "Salford": "salford",
            "Stockport": "stockport", "Warrington": "warrington", "Runcorn": "runcorn",
            "Birkenhead": "birkenhead", "Crewe": "crewe", "Macclesfield": "macclesfield",
            "Norwich": "norwich", "Cambridge": "cambridge", "Ipswich": "ipswich",
            "St Albans": "st-albans", "Peterborough": "peterborough", "Colchester": "colchester",
            "Chelmsford": "chelmsford", "Basildon": "basildon", "Southend-on-Sea": "southend-on-sea",
            "Great Yarmouth": "great-yarmouth", "Lowestoft": "lowestoft", "King's Lynn": "kings-lynn",
            "Thetford": "thetford", "Bury St Edmunds": "bury-st-edmunds", "Luton": "luton",
            "Bedford": "bedford", "Stevenage": "stevenage", "Watford": "watford",
            "Hemel Hempstead": "hemel-hempstead", "Welwyn Garden City": "welwyn-garden-city",
            "Leighton Buzzard": "leighton-buzzard", "Bristol": "bristol", "Gloucester": "gloucester",
            "Swindon": "swindon", "Bath": "bath", "Cheltenham": "cheltenham", "Taunton": "taunton",
            "Weston-super-Mare": "weston-super-mare", "Kingswood": "kingswood", "Salisbury": "salisbury",
            "Oxford": "oxford", "Milton Keynes": "milton-keynes", "Reading": "reading",
            "Slough": "slough", "Guildford": "guildford", "Portsmouth": "portsmouth",
            "Aylesbury": "aylesbury", "High Wycombe": "high-wycombe", "Banbury": "banbury",
            "Shrewsbury": "shrewsbury", "Telford": "telford", "Hereford": "hereford",
            "Cardiff": "cardiff", "Wrexham": "wrexham", "Newport": "newport"
          };
          
          // Define the order of regions for display
          const regionOrder = [
            "West Midlands", "Warwickshire", "Worcestershire", "Staffordshire",
            "Nottinghamshire", "Leicestershire", "Derbyshire", "Lincolnshire", "Northamptonshire",
            "Yorkshire", "Greater Manchester", "Merseyside", "Cheshire",
            "Norfolk", "Suffolk", "Cambridgeshire", "Essex", "Hertfordshire", "Bedfordshire",
            "Bristol & Bath", "Gloucestershire", "Wiltshire", "Somerset",
            "Oxfordshire", "Buckinghamshire", "Berkshire", "Surrey", "Hampshire",
            "Shropshire", "Herefordshire", "Wales"
          ];
          
          // Group locations by region
          const groupedLocations = serviceLocations.reduce((acc, location) => {
            const region = location.region || "Other";
            if (!acc[region]) acc[region] = [];
            acc[region].push(location);
            return acc;
          }, {} as Record<string, ServiceLocation[]>);
          
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {regionOrder.map((regionName) => {
                const locations = groupedLocations[regionName];
                if (!locations || locations.length === 0) return null;
                
                return (
                  <div key={regionName} className="space-y-2">
                    <h4 className="font-semibold text-[#2C5F7F] text-sm border-b border-[#2C5F7F]/20 pb-1">
                      {regionName}
                    </h4>
                    <div className="space-y-1">
                      {locations.map((location) => {
                        const slug = locationSlugMap[location.name];
                        const hasPage = !!slug;
                        
                        return hasPage ? (
                          <a
                            key={location.name}
                            href={`/service-areas/${slug}`}
                            className="flex items-center gap-2 py-1 rounded hover:bg-gray-50 transition"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-[#2C5F7F]" />
                            <span className="text-sm text-gray-700 hover:text-[#2C5F7F] hover:underline">{location.name}</span>
                          </a>
                        ) : (
                          <div
                            key={location.name}
                            className="flex items-center gap-2 py-1 rounded hover:bg-gray-50 cursor-pointer transition"
                            onClick={() => {
                              if (mapRef.current) {
                                mapRef.current.panTo(location.position);
                                mapRef.current.setZoom(11);
                              }
                            }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-[#2C5F7F]" />
                            <span className="text-sm text-gray-700">{location.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>

      {/* Contact CTA */}
      <div className="bg-[#1a3d52] rounded-xl p-6 text-center text-white">
        <h3 className="text-xl font-semibold mb-2">Not sure if we cover your area?</h3>
        <p className="text-white/70 mb-4">We travel across England and Wales for larger projects. Give us a call to discuss your requirements.</p>
        <Button 
          className="bg-[#d4a853] hover:bg-[#c49843] text-[#1a3d52] font-semibold"
          asChild
        >
          <a href="tel:07970566409" onClick={() => trackPhoneCall('07970566409', 'Service Areas Map')}>
            <Phone className="w-4 h-4 mr-2" />
            Call 07970 566409
          </a>
        </Button>
      </div>
    </div>
  );
}
