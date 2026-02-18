import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Phone, Menu, X, ChevronDown, ChevronRight, Search, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { usePrefetch } from "@/hooks/usePrefetch";
import { trackCTAClick, trackPhoneCall } from "@/lib/analytics";

interface HeaderProps {
  onOpenQuotePopup?: () => void;
}

const serviceLinks = [
  { title: "Structural Steel Frames", href: "/services/structural-steel-frames", description: "Comprehensive shot blasting for building frames and trusses" },
  { title: "Steel Container Blasting", href: "/services/steel-containers", description: "Specialist shot blasting for shipping containers and storage tanks" },
  { title: "Factory & Warehouse Cladding", href: "/services/factory-cladding", description: "Specialist cladding restoration removing plastisol and paint layers" },
  { title: "Fire Escapes & External Stair Towers", href: "/services/fire-escapes", description: "Specialist surface preparation for fire safety infrastructure" },
  { title: "Internal Steel Staircases, Balustrades & Handrails", href: "/services/staircases", description: "Precision shot blasting for architectural metalwork" },
  { title: "Bridge Steelwork (Girders, Crossmembers, Parapet Rails)", href: "/services/bridge-steelwork", description: "Comprehensive surface preparation for bridge infrastructure" },
  { title: "Fixed Ladders & Step-Over Platforms", href: "/services/ladders", description: "Comprehensive surface preparation for industrial access systems" },
  { title: "Warehouse Racking & Pallet Rack Frames", href: "/services/warehouse-racking", description: "Professional shot blasting for warehouse racking systems" },
  { title: "Process Pipework, Spools & Manifolds", href: "/services/pipework", description: "Precision cleaning of industrial pipework systems" },
  { title: "Telecom Masts & Lattice Towers", href: "/services/telecom-towers", description: "Specialist shot blasting for telecommunications infrastructure" },
  { title: "Floor Preparation & Shot Blasting", href: "/services/floor-preparation", description: "Professional floor surface preparation for commercial and industrial facilities" },
  { title: "Shot Blasting & Powder Coating", href: "/services/powder-coating", description: "End-to-end metal surface solutions combining shot blasting with powder coating" },
  { title: "Commercial Radiators", href: "/services/commercial-radiators", description: "Professional restoration for cast iron & steel radiators" },
  { title: "Commercial Vehicles", href: "/services/commercial-vehicles", description: "Heavy-duty restoration for farm & warehouse vehicles" },
  { title: "Steel Doors & Roller Shutters", href: "/services/steel-doors", description: "Professional restoration for industrial doors & security shutters" },
  { title: "Steel Sheeting", href: "/services/steel-sheeting", description: "Professional surface preparation for steel sheets and panels" },
  { title: "Steel Gates & Railings", href: "/services/steel-gates", description: "Precision restoration for commercial & industrial gates" },
  { title: "Plant & Machinery", href: "/services/plant-machinery", description: "On-site shot blasting for construction & agricultural equipment" },
];

// Compact areas data - show key cities per region for desktop mega menu
const compactAreasLinks = [
  // West Midlands - split into metro and counties
  {
    region: "West Midlands",
    countyHref: "/counties/west-midlands",
    keyLocations: [
      { title: "Birmingham", href: "/service-areas/birmingham" },
      { title: "Wolverhampton", href: "/service-areas/wolverhampton" },
      { title: "Coventry", href: "/service-areas/coventry" },
    ],
    totalCount: 8
  },
  {
    region: "Warwickshire",
    countyHref: "/counties/warwickshire",
    keyLocations: [
      { title: "Leamington Spa", href: "/service-areas/leamington-spa" },
      { title: "Rugby", href: "/service-areas/rugby" },
    ],
    totalCount: 4
  },
  {
    region: "Worcestershire",
    countyHref: "/counties/worcestershire",
    keyLocations: [
      { title: "Worcester", href: "/service-areas/worcester" },
      { title: "Kidderminster", href: "/service-areas/kidderminster" },
    ],
    totalCount: 3
  },
  {
    region: "Staffordshire",
    countyHref: "/counties/staffordshire",
    keyLocations: [
      { title: "Stoke-on-Trent", href: "/service-areas/stoke" },
      { title: "Stafford", href: "/service-areas/stafford" },
    ],
    totalCount: 8
  },
  {
    region: "Nottinghamshire",
    countyHref: "/counties/nottinghamshire",
    keyLocations: [
      { title: "Nottingham", href: "/service-areas/nottingham" },
      { title: "Mansfield", href: "/service-areas/mansfield" },
    ],
    totalCount: 2
  },
  {
    region: "Leicestershire",
    countyHref: "/counties/leicestershire",
    keyLocations: [
      { title: "Leicester", href: "/service-areas/leicester" },
      { title: "Loughborough", href: "/service-areas/loughborough" },
    ],
    totalCount: 3
  },
  {
    region: "Derbyshire",
    countyHref: "/counties/derbyshire",
    keyLocations: [
      { title: "Derby", href: "/service-areas/derby" },
      { title: "Chesterfield", href: "/service-areas/chesterfield" },
    ],
    totalCount: 3
  },
  {
    region: "Lincolnshire",
    countyHref: "/counties/lincolnshire",
    keyLocations: [
      { title: "Lincoln", href: "/service-areas/lincoln" },
      { title: "Grantham", href: "/service-areas/grantham" },
    ],
    totalCount: 3
  },
  {
    region: "Northamptonshire",
    countyHref: "/counties/northamptonshire",
    keyLocations: [
      { title: "Northampton", href: "/service-areas/northampton" },
      { title: "Kettering", href: "/service-areas/kettering" },
    ],
    totalCount: 4
  },
  {
    region: "Yorkshire",
    countyHref: "/counties/west-yorkshire",
    keyLocations: [
      { title: "Sheffield", href: "/service-areas/sheffield" },
      { title: "Leeds", href: "/service-areas/leeds" },
    ],
    totalCount: 7
  },
  // North West - split into Greater Manchester, Merseyside, Cheshire, Lancashire
  {
    region: "Greater Manchester",
    countyHref: "/service-areas#greater-manchester",
    keyLocations: [
      { title: "Manchester", href: "/service-areas/manchester" },
      { title: "Bolton", href: "/service-areas/bolton" },
    ],
    totalCount: 6
  },
  {
    region: "Merseyside",
    countyHref: "/service-areas#merseyside",
    keyLocations: [
      { title: "Liverpool", href: "/service-areas/liverpool" },
      { title: "Birkenhead", href: "/service-areas/birkenhead" },
    ],
    totalCount: 2
  },
  {
    region: "Cheshire",
    countyHref: "/counties/cheshire",
    keyLocations: [
      { title: "Chester", href: "/service-areas/chester" },
      { title: "Crewe", href: "/service-areas/crewe" },
    ],
    totalCount: 5
  },
  // East of England - split into Norfolk, Suffolk, Cambridgeshire, Essex
  {
    region: "Norfolk",
    countyHref: "/counties/norfolk",
    keyLocations: [
      { title: "Norwich", href: "/service-areas/norwich" },
      { title: "King's Lynn", href: "/service-areas/kings-lynn" },
    ],
    totalCount: 5
  },
  {
    region: "Suffolk",
    countyHref: "/counties/suffolk",
    keyLocations: [
      { title: "Ipswich", href: "/service-areas/ipswich" },
      { title: "Bury St Edmunds", href: "/service-areas/bury-st-edmunds" },
    ],
    totalCount: 3
  },
  {
    region: "Cambridgeshire",
    countyHref: "/counties/cambridgeshire",
    keyLocations: [
      { title: "Cambridge", href: "/service-areas/cambridge" },
      { title: "Peterborough", href: "/service-areas/peterborough" },
    ],
    totalCount: 2
  },
  {
    region: "Essex",
    countyHref: "/service-areas#essex",
    keyLocations: [
      { title: "Colchester", href: "/service-areas/colchester" },
      { title: "Chelmsford", href: "/service-areas/chelmsford" },
    ],
    totalCount: 4
  },
  // Hertfordshire and Bedfordshire - separate
  {
    region: "Hertfordshire",
    countyHref: "/counties/hertfordshire",
    keyLocations: [
      { title: "St Albans", href: "/service-areas/st-albans" },
      { title: "Watford", href: "/service-areas/watford" },
    ],
    totalCount: 4
  },
  {
    region: "Bedfordshire",
    countyHref: "/counties/bedfordshire",
    keyLocations: [
      { title: "Bedford", href: "/service-areas/bedford" },
      { title: "Luton", href: "/service-areas/luton" },
    ],
    totalCount: 3
  },
  // South West - split into Bristol & Bath, Gloucestershire, Wiltshire, Somerset
  {
    region: "Bristol & Bath",
    countyHref: "/service-areas#bristol-bath",
    keyLocations: [
      { title: "Bristol", href: "/service-areas/bristol" },
      { title: "Bath", href: "/service-areas/bath" },
    ],
    totalCount: 3
  },
  {
    region: "Gloucestershire",
    countyHref: "/counties/gloucestershire",
    keyLocations: [
      { title: "Gloucester", href: "/service-areas/gloucester" },
      { title: "Cheltenham", href: "/service-areas/cheltenham" },
    ],
    totalCount: 2
  },
  {
    region: "Wiltshire",
    countyHref: "/counties/wiltshire",
    keyLocations: [
      { title: "Swindon", href: "/service-areas/swindon" },
      { title: "Salisbury", href: "/service-areas/salisbury" },
    ],
    totalCount: 2
  },
  {
    region: "Somerset",
    countyHref: "/counties/somerset",
    keyLocations: [
      { title: "Taunton", href: "/service-areas/taunton" },
      { title: "Weston-super-Mare", href: "/service-areas/weston-super-mare" },
    ],
    totalCount: 2
  },
  // South East - split into Oxfordshire, Berkshire, Buckinghamshire, Surrey, Hampshire
  {
    region: "Oxfordshire",
    countyHref: "/service-areas#oxfordshire",
    keyLocations: [
      { title: "Oxford", href: "/service-areas/oxford" },
      { title: "Banbury", href: "/service-areas/banbury" },
    ],
    totalCount: 2
  },
  {
    region: "Berkshire",
    countyHref: "/service-areas#berkshire",
    keyLocations: [
      { title: "Reading", href: "/service-areas/reading" },
      { title: "Slough", href: "/service-areas/slough" },
    ],
    totalCount: 2
  },
  {
    region: "Buckinghamshire",
    countyHref: "/counties/buckinghamshire",
    keyLocations: [
      { title: "Milton Keynes", href: "/service-areas/milton-keynes" },
      { title: "Aylesbury", href: "/service-areas/aylesbury" },
    ],
    totalCount: 3
  },
  {
    region: "Surrey",
    countyHref: "/service-areas#surrey",
    keyLocations: [
      { title: "Guildford", href: "/service-areas/guildford" },
    ],
    totalCount: 1
  },
  {
    region: "Hampshire",
    countyHref: "/service-areas#hampshire",
    keyLocations: [
      { title: "Portsmouth", href: "/service-areas/portsmouth" },
    ],
    totalCount: 1
  },
  {
    region: "Shropshire",
    countyHref: "/counties/shropshire",
    keyLocations: [
      { title: "Shrewsbury", href: "/service-areas/shrewsbury" },
      { title: "Telford", href: "/service-areas/telford" },
    ],
    totalCount: 2
  },
  {
    region: "Herefordshire",
    countyHref: "/counties/herefordshire",
    keyLocations: [
      { title: "Hereford", href: "/service-areas/hereford" },
    ],
    totalCount: 1
  },
  {
    region: "Wales",
    countyHref: "/counties/east-wales",
    keyLocations: [
      { title: "Cardiff", href: "/service-areas/cardiff" },
      { title: "Wrexham", href: "/service-areas/wrexham" },
    ],
    totalCount: 3
  },
];

// Full areas data for mobile collapsible menu
const fullAreasLinks = [
  // West Midlands - split into metro and counties
  {
    region: "West Midlands",
    locations: [
      { title: "Birmingham", href: "/service-areas/birmingham" },
      { title: "Wolverhampton", href: "/service-areas/wolverhampton" },
      { title: "Coventry", href: "/service-areas/coventry" },
      { title: "Dudley", href: "/service-areas/dudley" },
      { title: "Solihull", href: "/service-areas/solihull" },
      { title: "Sutton Coldfield", href: "/service-areas/sutton-coldfield" },
      { title: "Walsall", href: "/service-areas/walsall" },
      { title: "Nuneaton", href: "/service-areas/nuneaton" },
    ]
  },
  {
    region: "Warwickshire",
    locations: [
      { title: "Leamington Spa", href: "/service-areas/leamington-spa" },
      { title: "Rugby", href: "/service-areas/rugby" },
      { title: "Stratford Upon Avon", href: "/service-areas/stratford-upon-avon" },
      { title: "Nuneaton", href: "/service-areas/nuneaton" },
    ]
  },
  {
    region: "Worcestershire",
    locations: [
      { title: "Worcester", href: "/service-areas/worcester" },
      { title: "Kidderminster", href: "/service-areas/kidderminster" },
      { title: "Redditch", href: "/service-areas/redditch" },
    ]
  },
  {
    region: "Staffordshire",
    locations: [
      { title: "Stoke-on-Trent", href: "/service-areas/stoke" },
      { title: "Stafford", href: "/service-areas/stafford" },
      { title: "Burton upon Trent", href: "/service-areas/burton-on-trent" },
      { title: "Cannock", href: "/service-areas/cannock" },
      { title: "Cannock Chase", href: "/service-areas/cannock-chase" },
      { title: "Lichfield", href: "/service-areas/lichfield" },
      { title: "Tamworth", href: "/service-areas/tamworth" },
      { title: "Newcastle-under-Lyme", href: "/service-areas/newcastle-under-lyme" },
    ]
  },
  {
    region: "Nottinghamshire",
    locations: [
      { title: "Nottingham", href: "/service-areas/nottingham" },
      { title: "Mansfield", href: "/service-areas/mansfield" },
    ]
  },
  {
    region: "Leicestershire",
    locations: [
      { title: "Leicester", href: "/service-areas/leicester" },
      { title: "Loughborough", href: "/service-areas/loughborough" },
      { title: "Coalville", href: "/service-areas/coalville" },
    ]
  },
  {
    region: "Derbyshire",
    locations: [
      { title: "Derby", href: "/service-areas/derby" },
      { title: "Chesterfield", href: "/service-areas/chesterfield" },
      { title: "Dronfield", href: "/service-areas/dronfield" },
    ]
  },
  {
    region: "Lincolnshire",
    locations: [
      { title: "Lincoln", href: "/service-areas/lincoln" },
      { title: "Grantham", href: "/service-areas/grantham" },
      { title: "Scunthorpe", href: "/service-areas/scunthorpe" },
    ]
  },
  {
    region: "Northamptonshire",
    locations: [
      { title: "Northampton", href: "/service-areas/northampton" },
      { title: "Kettering", href: "/service-areas/kettering" },
      { title: "Corby", href: "/service-areas/corby" },
      { title: "Wellingborough", href: "/service-areas/wellingborough" },
    ]
  },
  {
    region: "Yorkshire",
    locations: [
      { title: "Sheffield", href: "/service-areas/sheffield" },
      { title: "Leeds", href: "/service-areas/leeds" },
      { title: "Barnsley", href: "/service-areas/barnsley" },
      { title: "Doncaster", href: "/service-areas/doncaster" },
      { title: "Rotherham", href: "/service-areas/rotherham" },
      { title: "Halifax", href: "/service-areas/halifax" },
      { title: "Huddersfield", href: "/service-areas/huddersfield" },
    ]
  },
  // North West - split into Greater Manchester, Merseyside, Cheshire
  {
    region: "Greater Manchester",
    locations: [
      { title: "Manchester", href: "/service-areas/manchester" },
      { title: "Bolton", href: "/service-areas/bolton" },
      { title: "Oldham", href: "/service-areas/oldham" },
      { title: "Rochdale", href: "/service-areas/rochdale" },
      { title: "Salford", href: "/service-areas/salford" },
      { title: "Stockport", href: "/service-areas/stockport" },
    ]
  },
  {
    region: "Merseyside",
    locations: [
      { title: "Liverpool", href: "/service-areas/liverpool" },
      { title: "Birkenhead", href: "/service-areas/birkenhead" },
    ]
  },
  {
    region: "Cheshire",
    locations: [
      { title: "Chester", href: "/service-areas/chester" },
      { title: "Warrington", href: "/service-areas/warrington" },
      { title: "Runcorn", href: "/service-areas/runcorn" },
      { title: "Crewe", href: "/service-areas/crewe" },
      { title: "Macclesfield", href: "/service-areas/macclesfield" },
    ]
  },
  // East of England - split into Norfolk, Suffolk, Cambridgeshire, Essex
  {
    region: "Norfolk",
    locations: [
      { title: "Norwich", href: "/service-areas/norwich" },
      { title: "King's Lynn", href: "/service-areas/kings-lynn" },
      { title: "Great Yarmouth", href: "/service-areas/great-yarmouth" },
      { title: "Thetford", href: "/service-areas/thetford" },
      { title: "Lowestoft", href: "/service-areas/lowestoft" },
    ]
  },
  {
    region: "Suffolk",
    locations: [
      { title: "Ipswich", href: "/service-areas/ipswich" },
      { title: "Bury St Edmunds", href: "/service-areas/bury-st-edmunds" },
      { title: "Lowestoft", href: "/service-areas/lowestoft" },
    ]
  },
  {
    region: "Cambridgeshire",
    locations: [
      { title: "Cambridge", href: "/service-areas/cambridge" },
      { title: "Peterborough", href: "/service-areas/peterborough" },
    ]
  },
  {
    region: "Essex",
    locations: [
      { title: "Colchester", href: "/service-areas/colchester" },
      { title: "Chelmsford", href: "/service-areas/chelmsford" },
      { title: "Basildon", href: "/service-areas/basildon" },
      { title: "Southend-on-Sea", href: "/service-areas/southend-on-sea" },
    ]
  },
  // Hertfordshire and Bedfordshire - separate
  {
    region: "Hertfordshire",
    locations: [
      { title: "St Albans", href: "/service-areas/st-albans" },
      { title: "Watford", href: "/service-areas/watford" },
      { title: "Stevenage", href: "/service-areas/stevenage" },
      { title: "Hemel Hempstead", href: "/service-areas/hemel-hempstead" },
      { title: "Welwyn Garden City", href: "/service-areas/welwyn-garden-city" },
    ]
  },
  {
    region: "Bedfordshire",
    locations: [
      { title: "Bedford", href: "/service-areas/bedford" },
      { title: "Luton", href: "/service-areas/luton" },
      { title: "Leighton Buzzard", href: "/service-areas/leighton-buzzard" },
    ]
  },
  // South West - split into Bristol & Bath, Gloucestershire, Wiltshire, Somerset
  {
    region: "Bristol & Bath",
    locations: [
      { title: "Bristol", href: "/service-areas/bristol" },
      { title: "Bath", href: "/service-areas/bath" },
      { title: "Kingswood", href: "/service-areas/kingswood" },
    ]
  },
  {
    region: "Gloucestershire",
    locations: [
      { title: "Gloucester", href: "/service-areas/gloucester" },
      { title: "Cheltenham", href: "/service-areas/cheltenham" },
    ]
  },
  {
    region: "Wiltshire",
    locations: [
      { title: "Swindon", href: "/service-areas/swindon" },
      { title: "Salisbury", href: "/service-areas/salisbury" },
    ]
  },
  {
    region: "Somerset",
    locations: [
      { title: "Taunton", href: "/service-areas/taunton" },
      { title: "Weston-super-Mare", href: "/service-areas/weston-super-mare" },
    ]
  },
  // South East - split into Oxfordshire, Berkshire, Buckinghamshire, Surrey, Hampshire
  {
    region: "Oxfordshire",
    locations: [
      { title: "Oxford", href: "/service-areas/oxford" },
      { title: "Banbury", href: "/service-areas/banbury" },
    ]
  },
  {
    region: "Berkshire",
    locations: [
      { title: "Reading", href: "/service-areas/reading" },
      { title: "Slough", href: "/service-areas/slough" },
    ]
  },
  {
    region: "Buckinghamshire",
    locations: [
      { title: "Milton Keynes", href: "/service-areas/milton-keynes" },
      { title: "Aylesbury", href: "/service-areas/aylesbury" },
      { title: "High Wycombe", href: "/service-areas/high-wycombe" },
    ]
  },
  {
    region: "Surrey",
    locations: [
      { title: "Guildford", href: "/service-areas/guildford" },
    ]
  },
  {
    region: "Hampshire",
    locations: [
      { title: "Portsmouth", href: "/service-areas/portsmouth" },
    ]
  },
  {
    region: "Shropshire",
    locations: [
      { title: "Shrewsbury", href: "/service-areas/shrewsbury" },
      { title: "Telford", href: "/service-areas/telford" },
    ]
  },
  {
    region: "Herefordshire",
    locations: [
      { title: "Hereford", href: "/service-areas/hereford" },
    ]
  },
  {
    region: "Wales",
    locations: [
      { title: "Cardiff", href: "/service-areas/cardiff" },
      { title: "Wrexham", href: "/service-areas/wrexham" },
      { title: "Newport", href: "/service-areas/newport" },
    ]
  },
];

export function Header({ onOpenQuotePopup }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileAreasSearch, setMobileAreasSearch] = useState("");
  const [expandedRegions, setExpandedRegions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const areasDropdownRef = useRef<HTMLDivElement>(null);
  const industriesDropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const areasTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const industriesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Prefetch hook for preloading pages on hover
  const { prefetch, cancelPrefetch } = usePrefetch();

  const toggleRegion = (region: string) => {
    setExpandedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  // Filter locations for mobile search
  const filteredMobileAreas = mobileAreasSearch.trim() === ""
    ? fullAreasLinks
    : fullAreasLinks.map(region => ({
        ...region,
        locations: region.locations.filter(loc =>
          loc.title.toLowerCase().includes(mobileAreasSearch.toLowerCase())
        )
      })).filter(region => region.locations.length > 0);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileAreasSearch("");
    setExpandedRegions([]);
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
      if (areasDropdownRef.current && !areasDropdownRef.current.contains(event.target as Node)) {
        setAreasOpen(false);
      }
      if (industriesDropdownRef.current && !industriesDropdownRef.current.contains(event.target as Node)) {
        setIndustriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  const handleAreasMouseEnter = () => {
    if (areasTimeoutRef.current) {
      clearTimeout(areasTimeoutRef.current);
      areasTimeoutRef.current = null;
    }
    setAreasOpen(true);
  };

  const handleAreasMouseLeave = () => {
    areasTimeoutRef.current = setTimeout(() => {
      setAreasOpen(false);
    }, 150);
  };

  const handleIndustriesMouseEnter = () => {
    if (industriesTimeoutRef.current) {
      clearTimeout(industriesTimeoutRef.current);
      industriesTimeoutRef.current = null;
    }
    setIndustriesOpen(true);
  };

  const handleIndustriesMouseLeave = () => {
    industriesTimeoutRef.current = setTimeout(() => {
      setIndustriesOpen(false);
    }, 150);
  };

  return (
    <header className="bg-[#2C5F7F] text-white sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition cursor-pointer touch-manipulation">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/30">
            <span className="text-xl font-bold">CSB</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Commercial Shot Blasting</h1>
            <p className="text-xs text-white/80">Professional Surface Preparation</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-white/80 transition">Home</Link>
          
          {/* Services Dropdown */}
          <div 
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/services"
              className="flex items-center gap-1 hover:text-white/80 transition py-2"
              onMouseEnter={() => prefetch('/services')}
              onMouseLeave={cancelPrefetch}
              onClick={(e) => {
                setServicesOpen(false);
              }}
              onMouseDown={(e) => {
                const target = e.target as HTMLElement;
                if (target.closest('svg')) {
                  e.preventDefault();
                  setServicesOpen(!servicesOpen);
                }
              }}
            >
              Services
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setServicesOpen(!servicesOpen);
                }}
              />
            </Link>
            
            {/* Services Dropdown Menu */}
            <div 
              className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                servicesOpen 
                  ? 'opacity-100 visible translate-y-0' 
                  : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              }`}
              style={{ zIndex: 99999 }}
            >
              <div className="w-[800px] bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-x-4">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block px-3 py-2.5 hover:bg-[#2C5F7F] hover:text-white transition-colors group rounded-md"
                        onClick={() => setServicesOpen(false)}
                      >
                        <div className="font-medium text-sm text-gray-900 group-hover:text-white">{service.title}</div>
                        <div className="text-xs text-gray-500 group-hover:text-white/80 mt-0.5">{service.description}</div>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 mt-3 pt-3">
                    <Link
                      href="/services"
                      className="block px-3 py-2 text-[#2C5F7F] font-medium hover:bg-[#2C5F7F]/10 transition-colors rounded-md text-center"
                      onClick={() => setServicesOpen(false)}
                    >
                      View All Services →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Industries Dropdown */}
          <div 
            ref={industriesDropdownRef}
            className="relative"
            onMouseEnter={handleIndustriesMouseEnter}
            onMouseLeave={handleIndustriesMouseLeave}
          >
            <Link
              href="/industries"
              className="flex items-center gap-1 hover:text-white/80 transition py-2"
              onClick={(e) => {
                setIndustriesOpen(false);
              }}
              onMouseDown={(e) => {
                const target = e.target as HTMLElement;
                if (target.closest('svg')) {
                  e.preventDefault();
                  setIndustriesOpen(!industriesOpen);
                }
              }}
            >
              Industries
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-200 ${industriesOpen ? 'rotate-180' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIndustriesOpen(!industriesOpen);
                }}
              />
            </Link>
            
            {/* Industries Dropdown Menu */}
            <div 
              className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                industriesOpen 
                  ? 'opacity-100 visible translate-y-0' 
                  : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              }`}
              style={{ zIndex: 99999 }}
            >
              <div className="w-[400px] bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-4">
                  <div className="space-y-1">
                    <Link
                      href="/industries/construction"
                      className="block px-3 py-2.5 hover:bg-[#2C5F7F] hover:text-white transition-colors group rounded-md"
                      onClick={() => setIndustriesOpen(false)}
                    >
                      <div className="font-medium text-sm text-gray-900 group-hover:text-white">Construction</div>
                      <div className="text-xs text-gray-500 group-hover:text-white/80 mt-0.5">Structural steel, bridges, fire escapes</div>
                    </Link>
                    <Link
                      href="/industries/manufacturing"
                      className="block px-3 py-2.5 hover:bg-[#2C5F7F] hover:text-white transition-colors group rounded-md"
                      onClick={() => setIndustriesOpen(false)}
                    >
                      <div className="font-medium text-sm text-gray-900 group-hover:text-white">Manufacturing</div>
                      <div className="text-xs text-gray-500 group-hover:text-white/80 mt-0.5">Warehouse racking, crane systems, pipework</div>
                    </Link>
                    <Link
                      href="/industries/retail"
                      className="block px-3 py-2.5 hover:bg-[#2C5F7F] hover:text-white transition-colors group rounded-md"
                      onClick={() => setIndustriesOpen(false)}
                    >
                      <div className="font-medium text-sm text-gray-900 group-hover:text-white">Retail</div>
                      <div className="text-xs text-gray-500 group-hover:text-white/80 mt-0.5">Shopping trolleys, shop fittings, displays</div>
                    </Link>
                    <Link
                      href="/industries/aerospace"
                      className="block px-3 py-2.5 hover:bg-[#2C5F7F] hover:text-white transition-colors group rounded-md"
                      onClick={() => setIndustriesOpen(false)}
                    >
                      <div className="font-medium text-sm text-gray-900 group-hover:text-white">Aerospace</div>
                      <div className="text-xs text-gray-500 group-hover:text-white/80 mt-0.5">Landing gear, engine components, airframes</div>
                    </Link>
                    <Link
                      href="/industries/marine"
                      className="block px-3 py-2.5 hover:bg-[#2C5F7F] hover:text-white transition-colors group rounded-md"
                      onClick={() => setIndustriesOpen(false)}
                    >
                      <div className="font-medium text-sm text-gray-900 group-hover:text-white">Marine</div>
                      <div className="text-xs text-gray-500 group-hover:text-white/80 mt-0.5">Ship hulls, offshore platforms, port equipment</div>
                    </Link>
                    <Link
                      href="/industries/agriculture"
                      className="block px-3 py-2.5 hover:bg-[#2C5F7F] hover:text-white transition-colors group rounded-md"
                      onClick={() => setIndustriesOpen(false)}
                    >
                      <div className="font-medium text-sm text-gray-900 group-hover:text-white">Agriculture</div>
                      <div className="text-xs text-gray-500 group-hover:text-white/80 mt-0.5">Tractors, farm equipment, agricultural machinery</div>
                    </Link>
                    <Link
                      href="/industries/transport-logistics"
                      className="block px-3 py-2.5 hover:bg-[#2C5F7F] hover:text-white transition-colors group rounded-md"
                      onClick={() => setIndustriesOpen(false)}
                    >
                      <div className="font-medium text-sm text-gray-900 group-hover:text-white">Transport & Logistics</div>
                      <div className="text-xs text-gray-500 group-hover:text-white/80 mt-0.5">Commercial vehicles, trailers, warehouse equipment</div>
                    </Link>
                    <Link
                      href="/industries/heritage-restoration"
                      className="block px-3 py-2.5 hover:bg-[#2C5F7F] hover:text-white transition-colors group rounded-md"
                      onClick={() => setIndustriesOpen(false)}
                    >
                      <div className="font-medium text-sm text-gray-900 group-hover:text-white">Heritage & Restoration</div>
                      <div className="text-xs text-gray-500 group-hover:text-white/80 mt-0.5">Listed buildings, historic bridges, museum artifacts</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Link 
            href="/preparation-cleanup" 
            className="hover:text-white/80 transition"
            onMouseEnter={() => prefetch('/preparation-cleanup')}
            onMouseLeave={cancelPrefetch}
          >Preparation & Cleanup</Link>
          <Link 
            href="/our-work" 
            className="hover:text-white/80 transition"
            onMouseEnter={() => prefetch('/our-work')}
            onMouseLeave={cancelPrefetch}
          >Our Work</Link>
          <Link 
            href="/blog" 
            className="hover:text-white/80 transition"
            onMouseEnter={() => prefetch('/blog')}
            onMouseLeave={cancelPrefetch}
          >Blog</Link>
          
          {/* Areas Dropdown - Compact Design */}
          <div 
            ref={areasDropdownRef}
            className="relative"
            onMouseEnter={handleAreasMouseEnter}
            onMouseLeave={handleAreasMouseLeave}
          >
            <Link
              href="/service-areas"
              className="flex items-center gap-1 hover:text-white/80 transition py-2"
              onMouseEnter={() => prefetch('/service-areas')}
              onMouseLeave={cancelPrefetch}
            >
              Areas
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-200 ${areasOpen ? 'rotate-180' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setAreasOpen(!areasOpen);
                }}
              />
            </Link>
            
            {/* Compact Areas Mega Menu */}
            <div 
              className={`absolute top-full right-0 pt-2 transition-all duration-200 ${
                areasOpen 
                  ? 'opacity-100 visible translate-y-0' 
                  : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              }`}
              style={{ zIndex: 99999 }}
            >
              <div className="w-[900px] bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden max-h-[80vh] overflow-y-auto">
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#2C5F7F]" />
                      <span className="font-semibold text-gray-900">Service Areas</span>
                    </div>
                    <span className="text-sm text-gray-500">102 locations across the UK</span>
                  </div>
                  
                  {/* Compact Grid - Key Cities by Region */}
                  <div className="grid grid-cols-5 gap-3">
                    {compactAreasLinks.map((area) => (
                      <div key={area.region} className="space-y-2">
                        <Link 
                          href={area.countyHref}
                          className="block font-semibold text-[#2C5F7F] text-sm border-b border-gray-100 pb-1 hover:text-[#1a3d52] transition-colors"
                          onClick={() => setAreasOpen(false)}
                        >
                          {area.region}
                        </Link>
                        <div className="space-y-1">
{area.keyLocations.map((location) => (
                                            <Link
                                              key={location.href}
                                              href={location.href}
                                              className="block px-2 py-1 text-gray-700 hover:bg-[#2C5F7F] hover:text-white rounded transition-colors text-sm"
                                              onClick={() => setAreasOpen(false)}
                                              onMouseEnter={() => prefetch(location.href)}
                                              onMouseLeave={cancelPrefetch}
                                            >
                                              {location.title}
                                            </Link>
                                          ))}
                          {area.totalCount > area.keyLocations.length && (
                            <Link
                              href={area.countyHref}
                              className="block px-2 py-1 text-xs text-[#2C5F7F] hover:text-[#1a3d52] hover:underline font-medium"
                              onClick={() => setAreasOpen(false)}
                            >
                              +{area.totalCount - area.keyLocations.length} more →
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* View All Link */}
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <Link
                      href="/service-areas"
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#2C5F7F] text-white rounded-lg hover:bg-[#1a3d52] transition-colors font-medium"
                      onClick={() => setAreasOpen(false)}
                    >
                      <MapPin className="w-4 h-4" />
                      View All Service Areas
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Link 
            href="/about" 
            className="hover:text-white/80 transition"
            onMouseEnter={() => prefetch('/about')}
            onMouseLeave={cancelPrefetch}
          >About</Link>
          <Link 
            href="/contact" 
            className="hover:text-white/80 transition"
            onMouseEnter={() => prefetch('/contact')}
            onMouseLeave={cancelPrefetch}
          >Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <a 
            href="tel:07970566409" 
            className="hidden lg:flex items-center gap-2 text-sm"
            onClick={() => trackPhoneCall('07970566409', 'Header')}
          >
            <Phone className="w-4 h-4" />
            07970 566409
          </a>
          <Button 
            className="hidden sm:flex bg-white text-[#2C5F7F] hover:bg-white/90" 
            onClick={() => {
              trackCTAClick('Get a Quote', 'Header');
              onOpenQuotePopup?.();
            }}
          >
            Get a Quote
          </Button>
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden overflow-y-auto transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[90vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container py-4 border-t border-white/20">
          <div className="flex flex-col gap-2">
            <Link href="/" onClick={closeMobileMenu} className="py-3 hover:text-white/80 transition border-b border-white/10">Home</Link>
            
            {/* Services Mega Menu */}
            <div className="border-b border-white/10 py-3">
              <div className="text-sm font-semibold mb-3 text-white/90">Services</div>
              <div className="grid grid-cols-1 gap-2">
                {serviceLinks.slice(0, 6).map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="block py-2 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm"
                    onClick={closeMobileMenu}
                  >
                    <div className="font-medium">{service.title}</div>
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="block py-2 px-3 text-center text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm font-medium mt-2 border-t border-white/10 pt-3"
                  onClick={closeMobileMenu}
                >
                  View All Services →
                </Link>
              </div>
            </div>

            {/* Industries Mega Menu */}
            <div className="border-b border-white/10 py-3">
              <div className="text-sm font-semibold mb-3 text-white/90">Industries</div>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/industries/construction" className="block py-2 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm" onClick={closeMobileMenu}>Construction</Link>
                <Link href="/industries/manufacturing" className="block py-2 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm" onClick={closeMobileMenu}>Manufacturing</Link>
                <Link href="/industries/retail" className="block py-2 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm" onClick={closeMobileMenu}>Retail</Link>
                <Link href="/industries/aerospace" className="block py-2 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm" onClick={closeMobileMenu}>Aerospace</Link>
                <Link href="/industries/marine" className="block py-2 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm" onClick={closeMobileMenu}>Marine</Link>
                <Link href="/industries/agriculture" className="block py-2 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm" onClick={closeMobileMenu}>Agriculture</Link>
              </div>
            </div>
            
            <Link href="/preparation-cleanup" onClick={closeMobileMenu} className="py-3 hover:text-white/80 transition border-b border-white/10">Preparation & Cleanup</Link>
            <Link href="/our-work" onClick={closeMobileMenu} className="py-3 hover:text-white/80 transition border-b border-white/10">Our Work</Link>
            <Link href="/blog" onClick={closeMobileMenu} className="py-3 hover:text-white/80 transition border-b border-white/10">Blog</Link>
            
            {/* Mobile Areas - Collapsible Regions with Search */}
            <div className="border-b border-white/10 py-3">
              <div className="text-sm font-semibold mb-3 text-white/90 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Service Areas
              </div>
              
              {/* Search Bar */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={mobileAreasSearch}
                  onChange={(e) => setMobileAreasSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:border-white/40"
                />
              </div>
              
              {/* Collapsible Regions */}
              <div className="space-y-1 max-h-[300px] overflow-y-auto">
                {filteredMobileAreas.map((area) => (
                  <div key={area.region} className="border-b border-white/5 last:border-0">
                    <button
                      type="button"
                      onClick={() => toggleRegion(area.region)}
                      className="w-full flex items-center justify-between py-2 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm"
                    >
                      <span className="font-medium">{area.region}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/50">{area.locations.length}</span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${expandedRegions.includes(area.region) ? 'rotate-90' : ''}`} />
                      </div>
                    </button>
                    
                    {expandedRegions.includes(area.region) && (
                      <div className="pl-4 pb-2 grid grid-cols-2 gap-1">
                        {area.locations.map((location) => (
                          <Link
                            key={location.href}
                            href={location.href}
                            className="block py-1.5 px-2 text-white/70 hover:text-white hover:bg-white/10 rounded transition text-xs"
                            onClick={closeMobileMenu}
                            onTouchStart={() => prefetch(location.href)}
                          >
                            {location.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {filteredMobileAreas.length === 0 && (
                  <div className="text-center py-4 text-white/50 text-sm">
                    No locations found
                  </div>
                )}
              </div>
              
              {/* View All Link */}
              <Link
                href="/service-areas"
                className="block mt-3 py-2 px-3 text-center bg-white/10 text-white hover:bg-white/20 rounded-lg transition text-sm font-medium"
                onClick={closeMobileMenu}
              >
                View All 102 Service Areas →
              </Link>
            </div>
            
            <a href="/about" onClick={closeMobileMenu} className="py-3 hover:text-white/80 transition border-b border-white/10">About</a>
            <a href="/contact" onClick={closeMobileMenu} className="py-3 hover:text-white/80 transition border-b border-white/10">Contact</a>
            
            <div className="flex flex-col gap-3 pt-4">
              <a 
                href="tel:07970566409" 
                className="flex items-center gap-2 text-sm"
                onClick={() => trackPhoneCall('07970566409', 'Mobile Menu')}
              >
                <Phone className="w-4 h-4" />
                07970 566409
              </a>
              <Button 
                className="bg-white text-[#2C5F7F] hover:bg-white/90 w-full" 
                onClick={() => { 
                  closeMobileMenu(); 
                  trackCTAClick('Get a Quote', 'Mobile Menu');
                  onOpenQuotePopup?.(); 
                }}
              >
                Get a Quote
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
