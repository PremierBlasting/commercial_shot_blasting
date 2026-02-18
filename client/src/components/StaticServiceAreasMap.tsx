import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

// Counties within the coverage area - organized alphabetically by region
// Includes: Midlands, East Anglia, parts of Yorkshire, South East Wales, Somerset/North Devon
// Excludes: Far north (Cumbria, Northumberland, Durham), London/Southeast, West Wales
const serviceCounties = [
  // East of England
  { name: "Bedfordshire", region: "East of England", slug: "bedfordshire" },
  { name: "Cambridgeshire", region: "East of England", slug: "cambridgeshire" },
  { name: "Hertfordshire", region: "East of England", slug: "hertfordshire" },
  { name: "Norfolk", region: "East of England", slug: "norfolk" },
  { name: "Suffolk", region: "East of England", slug: "suffolk" },
  
  // East Midlands
  { name: "Derbyshire", region: "East Midlands", slug: "derbyshire" },
  { name: "Leicestershire", region: "East Midlands", slug: "leicestershire" },
  { name: "Lincolnshire", region: "East Midlands", slug: "lincolnshire" },
  { name: "Northamptonshire", region: "East Midlands", slug: "northamptonshire" },
  { name: "Nottinghamshire", region: "East Midlands", slug: "nottinghamshire" },
  
  // West Midlands
  { name: "Herefordshire", region: "West Midlands", slug: "herefordshire" },
  { name: "Shropshire", region: "West Midlands", slug: "shropshire" },
  { name: "Staffordshire", region: "West Midlands", slug: "staffordshire" },
  { name: "Warwickshire", region: "West Midlands", slug: "warwickshire" },
  { name: "West Midlands", region: "West Midlands", slug: "west-midlands" },
  { name: "Worcestershire", region: "West Midlands", slug: "worcestershire" },
  
  // Yorkshire
  { name: "South Yorkshire", region: "Yorkshire", slug: "south-yorkshire" },
  { name: "West Yorkshire", region: "Yorkshire", slug: "west-yorkshire" },
  
  // North West
  { name: "Cheshire", region: "North West", slug: "cheshire" },
  
  // South West
  { name: "Gloucestershire", region: "South West", slug: "gloucestershire" },
  { name: "North Devon", region: "South West", slug: "north-devon" },
  { name: "Somerset", region: "South West", slug: "somerset" },
  { name: "Wiltshire", region: "South West", slug: "wiltshire" },
  
  // Wales Borders
  { name: "Buckinghamshire", region: "Wales Borders", slug: "buckinghamshire" },
  { name: "East Wales", region: "Wales Borders", slug: "east-wales" },
];

// Custom polygon path for coverage area
// Based on UK SVG coordinates (viewBox 0 0 1000 1000)
// Traced from user's green outline: kidney bean shape
// Includes: Norfolk/Suffolk (extended east), South/West Yorkshire, Greater Manchester
// Excludes: Cumbria, Northumberland, Durham, East Riding, very west Wales, London, Kent, Sussex, Surrey
const coveragePolygon = `
  M 580 870
  C 570 840, 570 810, 580 780
  C 590 750, 605 720, 620 695
  C 640 670, 660 655, 680 650
  L 720 650
  L 760 655
  L 800 665
  L 840 690
  L 870 720
  L 880 750
  L 875 780
  L 855 800
  L 820 815
  L 780 825
  L 740 835
  L 700 850
  L 660 865
  L 620 875
  L 585 875
  Z
`;

export function StaticServiceAreasMap() {
  return (
    <div className="relative min-h-[600px] md:min-h-[700px] bg-gradient-to-br from-[#1a3d52] to-[#2C5F7F] rounded-xl overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main content container */}
      <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-8">
        
        {/* Map Container - Large interactive-style map */}
        <div className="relative w-full md:w-3/5 h-[400px] md:h-[550px] flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* SVG container with UK map and custom polygon coverage */}
            <svg 
              viewBox="400 450 500 500" 
              className="w-full h-full"
              style={{ maxHeight: '550px' }}
            >
              {/* UK Map as embedded image */}
              <image 
                href="/uk-map.svg" 
                x="0" 
                y="0" 
                width="1000" 
                height="1000"
                style={{ 
                  filter: 'brightness(0.6) saturate(0.3)',
                  opacity: 0.7
                }}
              />
              
              {/* Custom polygon coverage area */}
              {/* Covers: Norfolk, Suffolk, East Midlands, West Midlands, South Wales (east only) */}
              {/* Bristol, Somerset, North Devon, Wiltshire, Berkshire, Bedfordshire, Bucks */}
              {/* Excludes: London, West Wales, Cornwall */}
              <path
                d={coveragePolygon}
                fill="rgba(232,184,74,0.15)"
                stroke="rgba(232,184,74,0.5)"
                strokeWidth="2.5"
                strokeDasharray="10,5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Info panel */}
        <div className="w-full md:w-2/5 text-white text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Covering Most of England and Wales
          </h3>
          <p className="text-white/80 mb-6 text-sm md:text-base">
            Based at our West Midlands headquarters with 9 dedicated teams strategically positioned across the country, we deliver professional shot blasting services throughout England and Wales.
          </p>
          
          {/* Counties list - organized by region */}
          <div className="space-y-4 mb-6">
            {/* Group counties by region */}
            {[
              { region: "East of England", counties: serviceCounties.filter(c => c.region === "East of England") },
              { region: "East Midlands", counties: serviceCounties.filter(c => c.region === "East Midlands") },
              { region: "West Midlands", counties: serviceCounties.filter(c => c.region === "West Midlands") },
              { region: "Yorkshire", counties: serviceCounties.filter(c => c.region === "Yorkshire") },
              { region: "North West", counties: serviceCounties.filter(c => c.region === "North West") },
              { region: "South West", counties: serviceCounties.filter(c => c.region === "South West") },
              { region: "Wales Borders", counties: serviceCounties.filter(c => c.region === "Wales Borders") },
            ].map((group) => (
              <div key={group.region}>
                <h4 className="text-[#E8B84A] font-semibold text-xs uppercase tracking-wide mb-2">{group.region}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1.5">
                  {group.counties.map((county) => (
                    <Link 
                      key={county.name}
                      href={`/counties/${county.slug}`}
                      className="flex items-center gap-2 text-sm hover:text-[#E8B84A] transition-colors cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 bg-white/60 rounded-full flex-shrink-0" />
                      <span>{county.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <Link 
            href="/service-areas"
            className="inline-flex items-center gap-2 bg-[#E8B84A] hover:bg-[#d4a63d] text-[#1a3d52] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            View All Service Areas
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#E8B84A]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
    </div>
  );
}
