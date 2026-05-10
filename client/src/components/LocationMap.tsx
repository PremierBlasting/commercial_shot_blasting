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
  Aylesbury: { lat: 51.8168, lng: -0.8124 },
  Banbury: { lat: 52.0629, lng: -1.3398 },
  Barnsley: { lat: 53.5527, lng: -1.4797 },
  Basildon: { lat: 51.5763, lng: 0.4887 },
  Bath: { lat: 51.3811, lng: -2.3590 },
  Bedford: { lat: 52.1360, lng: -0.4667 },
  Birkenhead: { lat: 53.3933, lng: -3.0146 },
  Bolton: { lat: 53.5780, lng: -2.4282 },
  BurtonUponTrent: { lat: 52.8019, lng: -1.6367 },
  BuryStEdmunds: { lat: 52.2462, lng: 0.7148 },
  Cannock: { lat: 52.6906, lng: -2.0295 },
  CannockChase: { lat: 52.7200, lng: -1.9800 },
  Chelmsford: { lat: 51.7361, lng: 0.4798 },
  Cheltenham: { lat: 51.8994, lng: -2.0783 },
  Coalville: { lat: 52.7241, lng: -1.3702 },
  Colchester: { lat: 51.8959, lng: 0.8919 },
  Corby: { lat: 52.4897, lng: -0.6958 },
  Crewe: { lat: 53.0980, lng: -2.4413 },
  Doncaster: { lat: 53.5228, lng: -1.1286 },
  Dronfield: { lat: 53.3022, lng: -1.4680 },
  Dudley: { lat: 52.5086, lng: -2.0813 },
  Durham: { lat: 54.7753, lng: -1.5849 },
  Grantham: { lat: 52.9128, lng: -0.6404 },
  GreatYarmouth: { lat: 52.6065, lng: 1.7298 },
  Guildford: { lat: 51.2362, lng: -0.5704 },
  Halifax: { lat: 53.7248, lng: -1.8658 },
  HemelHempstead: { lat: 51.7526, lng: -0.4692 },
  HighWycombe: { lat: 51.6284, lng: -0.7483 },
  Huddersfield: { lat: 53.6458, lng: -1.7850 },
  Kettering: { lat: 52.3985, lng: -0.7247 },
  Kidderminster: { lat: 52.3887, lng: -2.2494 },
  KingsLynn: { lat: 52.7540, lng: 0.3994 },
  Kingswood: { lat: 51.4545, lng: -2.5000 },
  LeamingtonSpa: { lat: 52.2919, lng: -1.5366 },
  LeightonBuzzard: { lat: 51.9168, lng: -0.6624 },
  Lichfield: { lat: 52.6836, lng: -1.8267 },
  Loughborough: { lat: 52.7697, lng: -1.2046 },
  Lowestoft: { lat: 52.4800, lng: 1.7500 },
  Luton: { lat: 51.8787, lng: -0.4200 },
  Macclesfield: { lat: 53.2590, lng: -2.1265 },
  Mansfield: { lat: 53.1471, lng: -1.1960 },
  NewcastleUnderLyme: { lat: 53.0120, lng: -2.2277 },
  Newport: { lat: 51.5882, lng: -2.9977 },
  Nuneaton: { lat: 52.5228, lng: -1.4655 },
  Oldham: { lat: 53.5409, lng: -2.1114 },
  Portsmouth: { lat: 50.8198, lng: -1.0880 },
  Reading: { lat: 51.4543, lng: -0.9781 },
  Redditch: { lat: 52.3063, lng: -1.9441 },
  Rochdale: { lat: 53.6136, lng: -2.1614 },
  Rotherham: { lat: 53.4300, lng: -1.3568 },
  Rugby: { lat: 52.3706, lng: -1.2644 },
  Runcorn: { lat: 53.3417, lng: -2.7310 },
  Salford: { lat: 53.4875, lng: -2.2901 },
  Salisbury: { lat: 51.0693, lng: -1.7942 },
  Scunthorpe: { lat: 53.5809, lng: -0.6502 },
  Slough: { lat: 51.5105, lng: -0.5950 },
  Solihull: { lat: 52.4130, lng: -1.7780 },
  SouthendOnSea: { lat: 51.5459, lng: 0.7077 },
  Stafford: { lat: 52.8068, lng: -2.1218 },
  Stevenage: { lat: 51.9022, lng: -0.2005 },
  Stockport: { lat: 53.4083, lng: -2.1494 },
  SuttonColdfield: { lat: 52.5630, lng: -1.8228 },
  Tamworth: { lat: 52.6338, lng: -1.6950 },
  Taunton: { lat: 51.0151, lng: -3.1015 },
  Telford: { lat: 52.6766, lng: -2.4469 },
  Thetford: { lat: 52.4139, lng: 0.7441 },
  Walsall: { lat: 52.5862, lng: -1.9826 },
  Warrington: { lat: 53.3900, lng: -2.5970 },
  Watford: { lat: 51.6565, lng: -0.3956 },
  Wellingborough: { lat: 52.3009, lng: -0.6954 },
  WelwynGardenCity: { lat: 51.8032, lng: -0.2079 },
  WestonSuperMare: { lat: 51.3462, lng: -2.9770 },
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
