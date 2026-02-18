import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { QuotePopup } from "@/components/QuotePopup";
import { DeferredServiceAreasMap } from "@/components/DeferredServiceAreasMap";
import { Link } from "wouter";
import { 
  MapPin, 
  Phone, 
  ArrowRight,
  Search
} from "lucide-react";

// All regions with their locations - matches the dropdown menu structure
const allRegions = [
  {
    region: "West Midlands",
    countyHref: "/counties/west-midlands",
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
    countyHref: "/counties/warwickshire",
    locations: [
      { title: "Leamington Spa", href: "/service-areas/leamington-spa" },
      { title: "Rugby", href: "/service-areas/rugby" },
      { title: "Stratford Upon Avon", href: "/service-areas/stratford-upon-avon" },
    ]
  },
  {
    region: "Worcestershire",
    countyHref: "/counties/worcestershire",
    locations: [
      { title: "Worcester", href: "/service-areas/worcester" },
      { title: "Kidderminster", href: "/service-areas/kidderminster" },
      { title: "Redditch", href: "/service-areas/redditch" },
    ]
  },
  {
    region: "Staffordshire",
    countyHref: "/counties/staffordshire",
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
    countyHref: "/counties/nottinghamshire",
    locations: [
      { title: "Nottingham", href: "/service-areas/nottingham" },
      { title: "Mansfield", href: "/service-areas/mansfield" },
    ]
  },
  {
    region: "Leicestershire",
    countyHref: "/counties/leicestershire",
    locations: [
      { title: "Leicester", href: "/service-areas/leicester" },
      { title: "Loughborough", href: "/service-areas/loughborough" },
      { title: "Coalville", href: "/service-areas/coalville" },
    ]
  },
  {
    region: "Derbyshire",
    countyHref: "/counties/derbyshire",
    locations: [
      { title: "Derby", href: "/service-areas/derby" },
      { title: "Chesterfield", href: "/service-areas/chesterfield" },
      { title: "Dronfield", href: "/service-areas/dronfield" },
    ]
  },
  {
    region: "Lincolnshire",
    countyHref: "/counties/lincolnshire",
    locations: [
      { title: "Lincoln", href: "/service-areas/lincoln" },
      { title: "Grantham", href: "/service-areas/grantham" },
      { title: "Scunthorpe", href: "/service-areas/scunthorpe" },
    ]
  },
  {
    region: "Northamptonshire",
    countyHref: "/counties/northamptonshire",
    locations: [
      { title: "Northampton", href: "/service-areas/northampton" },
      { title: "Kettering", href: "/service-areas/kettering" },
      { title: "Corby", href: "/service-areas/corby" },
      { title: "Wellingborough", href: "/service-areas/wellingborough" },
    ]
  },
  {
    region: "Yorkshire",
    countyHref: "/counties/west-yorkshire",
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
    countyHref: "/counties/cheshire",
    locations: [
      { title: "Chester", href: "/service-areas/chester" },
      { title: "Warrington", href: "/service-areas/warrington" },
      { title: "Runcorn", href: "/service-areas/runcorn" },
      { title: "Crewe", href: "/service-areas/crewe" },
      { title: "Macclesfield", href: "/service-areas/macclesfield" },
    ]
  },
  {
    region: "Norfolk",
    countyHref: "/counties/norfolk",
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
    countyHref: "/counties/suffolk",
    locations: [
      { title: "Ipswich", href: "/service-areas/ipswich" },
      { title: "Bury St Edmunds", href: "/service-areas/bury-st-edmunds" },
    ]
  },
  {
    region: "Cambridgeshire",
    countyHref: "/counties/cambridgeshire",
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
  {
    region: "Hertfordshire",
    countyHref: "/counties/hertfordshire",
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
    countyHref: "/counties/bedfordshire",
    locations: [
      { title: "Bedford", href: "/service-areas/bedford" },
      { title: "Luton", href: "/service-areas/luton" },
      { title: "Leighton Buzzard", href: "/service-areas/leighton-buzzard" },
    ]
  },
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
    countyHref: "/counties/gloucestershire",
    locations: [
      { title: "Gloucester", href: "/service-areas/gloucester" },
      { title: "Cheltenham", href: "/service-areas/cheltenham" },
    ]
  },
  {
    region: "Wiltshire",
    countyHref: "/counties/wiltshire",
    locations: [
      { title: "Swindon", href: "/service-areas/swindon" },
      { title: "Salisbury", href: "/service-areas/salisbury" },
    ]
  },
  {
    region: "Somerset",
    countyHref: "/counties/somerset",
    locations: [
      { title: "Taunton", href: "/service-areas/taunton" },
      { title: "Weston-super-Mare", href: "/service-areas/weston-super-mare" },
    ]
  },
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
    countyHref: "/counties/buckinghamshire",
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
    countyHref: "/counties/shropshire",
    locations: [
      { title: "Shrewsbury", href: "/service-areas/shrewsbury" },
      { title: "Telford", href: "/service-areas/telford" },
    ]
  },
  {
    region: "Herefordshire",
    countyHref: "/counties/herefordshire",
    locations: [
      { title: "Hereford", href: "/service-areas/hereford" },
    ]
  },
  {
    region: "Wales",
    countyHref: "/counties/east-wales",
    locations: [
      { title: "Cardiff", href: "/service-areas/cardiff" },
      { title: "Wrexham", href: "/service-areas/wrexham" },
      { title: "Newport", href: "/service-areas/newport" },
    ]
  },
];

// Calculate total locations
const totalLocations = allRegions.reduce((sum, region) => sum + region.locations.length, 0);

export default function Areas() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>("all");

  // Get unique high-level regions for filter buttons
  const regionFilters = [
    { id: "all", label: "All Regions" },
    { id: "east-of-england", label: "East of England" },
    { id: "east-midlands", label: "East Midlands" },
    { id: "west-midlands", label: "West Midlands" },
    { id: "yorkshire", label: "Yorkshire" },
    { id: "north-west", label: "North West" },
    { id: "south-west", label: "South West" },
    { id: "wales", label: "Wales" },
  ];

  // Map regions to their high-level categories
  const regionCategoryMap: Record<string, string> = {
    "West Midlands": "west-midlands",
    "Warwickshire": "west-midlands",
    "Worcestershire": "west-midlands",
    "Staffordshire": "west-midlands",
    "Shropshire": "west-midlands",
    "Herefordshire": "west-midlands",
    "Nottinghamshire": "east-midlands",
    "Leicestershire": "east-midlands",
    "Derbyshire": "east-midlands",
    "Lincolnshire": "east-midlands",
    "Northamptonshire": "east-midlands",
    "Yorkshire": "yorkshire",
    "Greater Manchester": "north-west",
    "Merseyside": "north-west",
    "Cheshire": "north-west",
    "Norfolk": "east-of-england",
    "Suffolk": "east-of-england",
    "Cambridgeshire": "east-of-england",
    "Hertfordshire": "east-of-england",
    "Bedfordshire": "east-of-england",
    "Essex": "east-of-england",
    "Buckinghamshire": "east-of-england",
    "Bristol & Bath": "south-west",
    "Gloucestershire": "south-west",
    "Wiltshire": "south-west",
    "Somerset": "south-west",
    "Oxfordshire": "south-west",
    "Berkshire": "south-west",
    "Surrey": "south-west",
    "Hampshire": "south-west",
    "Wales": "wales",
  };

  // Filter regions based on selected region filter and search query
  const filteredRegions = allRegions
    .filter(region => {
      // Apply region filter
      if (selectedRegionFilter === "all") return true;
      return regionCategoryMap[region.region] === selectedRegionFilter;
    })
    .map(region => ({
      ...region,
      locations: region.locations.filter(loc =>
        searchQuery.trim() === "" ||
        loc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        region.region.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(region => region.locations.length > 0);

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Areas", href: "/areas", isCurrentPage: true }
      ]} className="container mt-6" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a3d52] via-[#2C5F7F] to-[#1a3d52] text-white py-20 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-areas" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-areas)" />
          </svg>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4 text-[#E8B84A]" />
              <span className="text-sm font-medium">{totalLocations}+ Service Locations</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Service Areas
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Based at our West Midlands headquarters with 9 dedicated teams strategically positioned across the country, we deliver professional shot blasting services throughout England and Wales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-[#E8B84A] hover:bg-[#d4a63d] text-[#1a3d52] font-semibold px-8 py-6 text-lg"
                onClick={() => setQuotePopupOpen(true)}
              >
                Get a Free Quote
              </Button>
              <a href="tel:07970566409">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#1a3d52] px-8 py-6 text-lg w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  07970 566409
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3d52] mb-4">
              Interactive Coverage Map
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our service coverage across England and Wales. Click on any marker to see location details.
            </p>
          </div>
          
          <DeferredServiceAreasMap 
            onQuoteClick={() => setQuotePopupOpen(true)}
          />
        </div>
      </section>

      {/* All Service Areas Section */}
      <section className="py-16 bg-[#f8f5f0]">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3d52] mb-4">
              All Service Locations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Browse all {totalLocations}+ locations we serve across England and Wales. Click on any location to view detailed information about our services in that area.
            </p>
            
            {/* Region Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {regionFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedRegionFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedRegionFilter === filter.id
                      ? "bg-[#2C5F7F] text-white shadow-md"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#2C5F7F] focus:ring-2 focus:ring-[#2C5F7F]/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Regions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRegions.map((region) => (
              <div 
                key={region.region}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-[#1a3d52] mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E8B84A]" />
                  {region.countyHref ? (
                    <Link href={region.countyHref} className="hover:text-[#2C5F7F] transition-colors">
                      {region.region}
                    </Link>
                  ) : (
                    region.region
                  )}
                </h3>
                <ul className="space-y-2">
                  {region.locations.map((location) => (
                    <li key={location.href}>
                      <Link
                        href={location.href}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#2C5F7F] transition-colors group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#E8B84A]" />
                        <span>{location.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {filteredRegions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No locations found matching "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-4 text-[#2C5F7F] hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1a3d52] text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Don't See Your Location?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              We're constantly expanding our coverage. If your location isn't listed, get in touch - we may still be able to help with your shot blasting project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-[#E8B84A] hover:bg-[#d4a63d] text-[#1a3d52] font-semibold px-8 py-6 text-lg"
                onClick={() => setQuotePopupOpen(true)}
              >
                Request a Quote
              </Button>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#1a3d52] px-8 py-6 text-lg w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f2a38] text-white py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Commercial Shot Blasting. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="text-white/60 hover:text-white text-sm transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-white text-sm transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
    </div>
  );
}
