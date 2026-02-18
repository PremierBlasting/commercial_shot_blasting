import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { QuotePopup } from "@/components/QuotePopup";
import { DeferredServiceAreasMap } from "@/components/DeferredServiceAreasMap";
import { Link } from "wouter";
import { 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  Building2, 
  Factory, 
  Warehouse,
  ArrowRight,
  Clock,
  Shield,
  Award
} from "lucide-react";

const serviceRegions = [
  {
    id: "west-midlands",
    name: "West Midlands",
    countyHref: "/service-areas/west-midlands",
    tagline: "Our Home Region",
    description: "The West Midlands is our home base and where we've built our reputation over 15+ years. From Birmingham's automotive suppliers to Wolverhampton's foundries, we understand the unique needs of Midlands industries.",
    locations: ["Birmingham", "Wolverhampton", "Coventry", "Worcester", "Stratford Upon Avon", "Dudley", "Solihull", "Sutton Coldfield", "Walsall", "Kidderminster", "Redditch", "Nuneaton", "Leamington Spa", "Rugby"],
    industries: ["Automotive manufacturing", "Aerospace components", "Foundry & casting", "Metal fabrication", "Heritage restoration"],
    stats: { projects: "2,500+", clients: "600+" }
  },
  {
    id: "staffordshire",
    name: "Staffordshire",
    countyHref: "/service-areas/staffordshire",
    tagline: "Potteries & Beyond",
    description: "Staffordshire's rich industrial heritage includes ceramics, engineering and manufacturing. We serve clients from Stoke-on-Trent to Stafford, Burton and beyond.",
    locations: ["Stoke-on-Trent", "Stafford", "Burton upon Trent", "Cannock", "Cannock Chase", "Lichfield", "Tamworth", "Newcastle-under-Lyme"],
    industries: ["Ceramics industry", "Brewing equipment", "Heavy engineering", "Automotive components", "Construction steel"],
    stats: { projects: "600+", clients: "150+" }
  },
  {
    id: "nottinghamshire",
    name: "Nottinghamshire",
    countyHref: "/service-areas/nottinghamshire",
    tagline: "Lace & Engineering Heritage",
    description: "Nottinghamshire's industrial heritage spans textiles, engineering and manufacturing. We serve clients across Nottingham, Mansfield and surrounding areas.",
    locations: ["Nottingham", "Mansfield"],
    industries: ["Textile machinery", "Engineering", "Manufacturing", "Rail components", "Construction"],
    stats: { projects: "400+", clients: "100+" }
  },
  {
    id: "leicestershire",
    name: "Leicestershire",
    countyHref: "/service-areas/leicestershire",
    tagline: "Engineering Excellence",
    description: "Leicestershire is home to diverse manufacturing from Leicester's textiles to Loughborough's engineering excellence.",
    locations: ["Leicester", "Loughborough", "Coalville"],
    industries: ["Textile machinery", "Engineering", "Food processing", "Automotive", "Construction"],
    stats: { projects: "350+", clients: "90+" }
  },
  {
    id: "derbyshire",
    name: "Derbyshire",
    countyHref: "/service-areas/derbyshire",
    tagline: "Rail & Engineering Heritage",
    description: "Derbyshire's engineering heritage includes rail, aerospace and manufacturing. We serve clients from Derby to Chesterfield and beyond.",
    locations: ["Derby", "Chesterfield", "Dronfield"],
    industries: ["Rail engineering", "Aerospace", "Heavy engineering", "Automotive", "Construction"],
    stats: { projects: "300+", clients: "80+" }
  },
  {
    id: "lincolnshire",
    name: "Lincolnshire",
    countyHref: "/service-areas/lincolnshire",
    tagline: "Agricultural & Industrial",
    description: "Lincolnshire's agricultural and industrial heritage includes food processing, steel and engineering. We cover Lincoln, Grantham, Scunthorpe and beyond.",
    locations: ["Lincoln", "Grantham", "Scunthorpe"],
    industries: ["Agricultural machinery", "Steel manufacturing", "Food processing", "Engineering", "Construction"],
    stats: { projects: "250+", clients: "65+" }
  },
  {
    id: "northamptonshire",
    name: "Northamptonshire",
    countyHref: "/service-areas/northamptonshire",
    tagline: "Footwear & Engineering",
    description: "Northamptonshire's industrial heritage includes footwear, engineering and logistics. We serve Northampton, Corby, Kettering and Wellingborough.",
    locations: ["Northampton", "Corby", "Kettering", "Wellingborough"],
    industries: ["Engineering", "Logistics equipment", "Steel fabrication", "Construction", "Manufacturing"],
    stats: { projects: "280+", clients: "70+" }
  },
  {
    id: "yorkshire",
    name: "Yorkshire",
    countyHref: "/service-areas/yorkshire",
    tagline: "Steel City & Beyond",
    description: "From Sheffield's legendary steel industry to Leeds and Bradford's diverse manufacturing sectors, we serve clients across Yorkshire with comprehensive shot blasting services.",
    locations: ["Sheffield", "Leeds", "Barnsley", "Doncaster", "Rotherham", "Halifax", "Huddersfield"],
    industries: ["Steel manufacturing", "Cutlery & tools", "Heavy engineering", "Textile machinery", "Automotive components"],
    stats: { projects: "700+", clients: "180+" }
  },
  {
    id: "north-west",
    name: "North West",
    countyHref: "/service-areas/north-west",
    tagline: "Industrial Heritage",
    description: "From Liverpool's maritime industry to Manchester's engineering excellence, we provide comprehensive shot blasting services across the North West region.",
    locations: ["Manchester", "Liverpool", "Chester", "Bolton", "Oldham", "Rochdale", "Salford", "Stockport", "Warrington", "Runcorn", "Birkenhead"],
    industries: ["Maritime & shipping", "Chemical processing", "Construction steel", "Architectural metalwork", "Logistics"],
    stats: { projects: "900+", clients: "220+" }
  },
  {
    id: "cheshire",
    name: "Cheshire",
    countyHref: "/service-areas/north-west",
    tagline: "Crewe & Macclesfield",
    description: "Cheshire's engineering heritage includes rail, automotive and manufacturing. We serve clients across the county.",
    locations: ["Crewe", "Macclesfield"],
    industries: ["Rail engineering", "Automotive", "Chemical processing", "Food manufacturing", "Construction"],
    stats: { projects: "200+", clients: "50+" }
  },
  {
    id: "east-england",
    name: "East of England",
    countyHref: "/service-areas/east-of-england",
    tagline: "Growing Coverage",
    description: "Our East of England coverage extends from Cambridge's high-tech industries to Norwich's agricultural equipment manufacturers and beyond.",
    locations: ["Norwich", "Cambridge", "Ipswich", "St Albans", "Peterborough", "Colchester", "Chelmsford", "Basildon", "Southend-on-Sea", "Great Yarmouth", "Lowestoft", "King's Lynn", "Thetford", "Bury St Edmunds"],
    industries: ["Agricultural machinery", "Scientific equipment", "Food processing", "Construction", "Heritage restoration"],
    stats: { projects: "800+", clients: "200+" }
  },
  {
    id: "hertfordshire-bedfordshire",
    name: "Hertfordshire & Bedfordshire",
    countyHref: "/service-areas/hertfordshire-bedfordshire",
    tagline: "Home Counties",
    description: "Serving the Home Counties with professional shot blasting services for manufacturing, construction and heritage projects.",
    locations: ["Luton", "Bedford", "Stevenage", "Watford", "Hemel Hempstead", "Welwyn Garden City", "Leighton Buzzard"],
    industries: ["Automotive", "Aerospace", "Construction", "Logistics equipment", "Heritage restoration"],
    stats: { projects: "400+", clients: "100+" }
  },
  {
    id: "south-west",
    name: "South West",
    countyHref: "/service-areas/south-west",
    tagline: "Bristol & Beyond",
    description: "We serve the South West from Bristol through Gloucester to Swindon, supporting aerospace, automotive and manufacturing clients.",
    locations: ["Bristol", "Gloucester", "Swindon", "Bath", "Cheltenham", "Taunton", "Weston-super-Mare", "Kingswood", "Salisbury"],
    industries: ["Aerospace manufacturing", "Automotive components", "Marine equipment", "Agricultural machinery", "Construction"],
    stats: { projects: "550+", clients: "140+" }
  },
  {
    id: "south-east",
    name: "South East & Thames Valley",
    countyHref: "/service-areas/south-east",
    tagline: "Oxford to Portsmouth",
    description: "Our South East coverage includes Oxford's scientific instrument makers, Reading's tech sector and Portsmouth's maritime industries.",
    locations: ["Oxford", "Milton Keynes", "Reading", "Slough", "Guildford", "Portsmouth", "Aylesbury", "High Wycombe", "Banbury"],
    industries: ["Scientific instruments", "Automotive", "Logistics equipment", "Maritime", "Construction"],
    stats: { projects: "450+", clients: "110+" }
  },
  {
    id: "shropshire",
    name: "Shropshire",
    countyHref: "/service-areas/shropshire",
    tagline: "Shrewsbury & Telford",
    description: "Serving Shropshire's manufacturing and agricultural sectors with professional shot blasting services.",
    locations: ["Shrewsbury", "Telford"],
    industries: ["Agricultural machinery", "Manufacturing", "Construction steel", "Heritage restoration"],
    stats: { projects: "200+", clients: "50+" }
  },
  {
    id: "welsh-borders",
    name: "Welsh Borders & Wales",
    countyHref: "/service-areas/wales-borders",
    tagline: "Hereford to Cardiff",
    description: "We serve clients along the Welsh borders and into Wales, from Hereford to Cardiff and Newport.",
    locations: ["Hereford", "Cardiff", "Wrexham", "Newport"],
    industries: ["Agricultural machinery", "Farm equipment", "Construction steel", "Heritage restoration", "Marine & port equipment"],
    stats: { projects: "350+", clients: "90+" }
  }
];

// All individual locations for the comprehensive list - ALL 102 locations
const allLocations = [
  // West Midlands
  "Birmingham", "Wolverhampton", "Coventry", "Worcester", "Stratford Upon Avon", "Dudley", "Solihull", "Sutton Coldfield", "Walsall", "Kidderminster", "Redditch", "Nuneaton", "Leamington Spa", "Rugby",
  // Staffordshire
  "Stoke-on-Trent", "Stafford", "Burton upon Trent", "Cannock", "Cannock Chase", "Lichfield", "Tamworth", "Newcastle-under-Lyme",
  // Nottinghamshire
  "Nottingham", "Mansfield",
  // Leicestershire
  "Leicester", "Loughborough", "Coalville",
  // Derbyshire
  "Derby", "Chesterfield", "Dronfield",
  // Lincolnshire
  "Lincoln", "Grantham", "Scunthorpe",
  // Northamptonshire
  "Northampton", "Corby", "Kettering", "Wellingborough",
  // Yorkshire
  "Sheffield", "Leeds", "Barnsley", "Doncaster", "Rotherham", "Halifax", "Huddersfield",
  // North West
  "Manchester", "Liverpool", "Chester", "Bolton", "Oldham", "Rochdale", "Salford", "Stockport", "Warrington", "Runcorn", "Birkenhead",
  // Cheshire
  "Crewe", "Macclesfield",
  // East of England
  "Norwich", "Cambridge", "Ipswich", "St Albans", "Peterborough", "Colchester", "Chelmsford", "Basildon", "Southend-on-Sea", "Great Yarmouth", "Lowestoft", "King's Lynn", "Thetford", "Bury St Edmunds",
  // Hertfordshire & Bedfordshire
  "Luton", "Bedford", "Stevenage", "Watford", "Hemel Hempstead", "Welwyn Garden City", "Leighton Buzzard",
  // South West
  "Bristol", "Gloucester", "Swindon", "Bath", "Cheltenham", "Taunton", "Weston-super-Mare", "Kingswood", "Salisbury",
  // South East
  "Oxford", "Milton Keynes", "Reading", "Slough", "Guildford", "Portsmouth", "Aylesbury", "High Wycombe", "Banbury",
  // Shropshire
  "Shrewsbury", "Telford",
  // Welsh Borders & Wales
  "Hereford", "Cardiff", "Wrexham", "Newport"
];

// Map location names to their URL slugs - used throughout the page
const locationSlugMap: Record<string, string> = {
  // West Midlands
  "Birmingham": "birmingham",
  "Wolverhampton": "wolverhampton",
  "Coventry": "coventry",
  "Worcester": "worcester",
  "Stratford Upon Avon": "stratford-upon-avon",
  "Dudley": "dudley",
  "Solihull": "solihull",
  "Sutton Coldfield": "sutton-coldfield",
  "Walsall": "walsall",
  "Kidderminster": "kidderminster",
  "Redditch": "redditch",
  "Nuneaton": "nuneaton",
  "Leamington Spa": "leamington-spa",
  "Rugby": "rugby",
  // Staffordshire
  "Stoke-on-Trent": "stoke",
  "Stafford": "stafford",
  "Burton upon Trent": "burton-upon-trent",
  "Cannock": "cannock",
  "Cannock Chase": "cannock-chase",
  "Lichfield": "lichfield",
  "Tamworth": "tamworth",
  "Newcastle-under-Lyme": "newcastle-under-lyme",
  // Nottinghamshire
  "Nottingham": "nottingham",
  "Mansfield": "mansfield",
  // Leicestershire
  "Leicester": "leicester",
  "Loughborough": "loughborough",
  "Coalville": "coalville",
  // Derbyshire
  "Derby": "derby",
  "Chesterfield": "chesterfield",
  "Dronfield": "dronfield",
  // Lincolnshire
  "Lincoln": "lincoln",
  "Grantham": "grantham",
  "Scunthorpe": "scunthorpe",
  // Northamptonshire
  "Northampton": "northampton",
  "Corby": "corby",
  "Kettering": "kettering",
  "Wellingborough": "wellingborough",
  // Yorkshire
  "Sheffield": "sheffield",
  "Leeds": "leeds",
  "Barnsley": "barnsley",
  "Doncaster": "doncaster",
  "Rotherham": "rotherham",
  "Halifax": "halifax",
  "Huddersfield": "huddersfield",
  // North West
  "Manchester": "manchester",
  "Liverpool": "liverpool",
  "Chester": "chester",
  "Bolton": "bolton",
  "Oldham": "oldham",
  "Rochdale": "rochdale",
  "Salford": "salford",
  "Stockport": "stockport",
  "Warrington": "warrington",
  "Runcorn": "runcorn",
  "Birkenhead": "birkenhead",
  // Cheshire
  "Crewe": "crewe",
  "Macclesfield": "macclesfield",
  // East of England
  "Norwich": "norwich",
  "Cambridge": "cambridge",
  "Ipswich": "ipswich",
  "St Albans": "st-albans",
  "Peterborough": "peterborough",
  "Colchester": "colchester",
  "Chelmsford": "chelmsford",
  "Basildon": "basildon",
  "Southend-on-Sea": "southend-on-sea",
  "Great Yarmouth": "great-yarmouth",
  "Lowestoft": "lowestoft",
  "King's Lynn": "kings-lynn",
  "Thetford": "thetford",
  "Bury St Edmunds": "bury-st-edmunds",
  // Hertfordshire & Bedfordshire
  "Luton": "luton",
  "Bedford": "bedford",
  "Stevenage": "stevenage",
  "Watford": "watford",
  "Hemel Hempstead": "hemel-hempstead",
  "Welwyn Garden City": "welwyn-garden-city",
  "Leighton Buzzard": "leighton-buzzard",
  // South West
  "Bristol": "bristol",
  "Gloucester": "gloucester",
  "Swindon": "swindon",
  "Bath": "bath",
  "Cheltenham": "cheltenham",
  "Taunton": "taunton",
  "Weston-super-Mare": "weston-super-mare",
  "Kingswood": "kingswood",
  "Salisbury": "salisbury",
  // South East
  "Oxford": "oxford",
  "Milton Keynes": "milton-keynes",
  "Reading": "reading",
  "Slough": "slough",
  "Guildford": "guildford",
  "Portsmouth": "portsmouth",
  "Aylesbury": "aylesbury",
  "High Wycombe": "high-wycombe",
  "Banbury": "banbury",
  // Shropshire
  "Shrewsbury": "shrewsbury",
  "Telford": "telford",
  // Welsh Borders & Wales
  "Hereford": "hereford",
  "Cardiff": "cardiff",
  "Wrexham": "wrexham",
  "Newport": "newport"
};

export default function ServiceAreas() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Service Areas", href: "/service-areas", isCurrentPage: true }
      ]} className="container mt-6" />

      {/* Hero Section */}
      <section className="relative bg-[#1a3d52] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3d52] via-[#2C5F7F] to-[#1a3d52]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-[#d4a853] mb-4">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Regional Coverage</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shot Blasting Across England
            </h1>
            <p className="text-xl text-white/80 mb-4">
              Professional shot blasting services from the West Midlands to the South West, 
              East Anglia to the North West. Wherever you are, we can help.
            </p>
            <p className="text-lg text-white/60 mb-8">
              <strong className="text-[#d4a853]">25+ locations</strong> served across <strong className="text-[#d4a853]">7 regions</strong> with 
              <strong className="text-[#d4a853]"> 4,500+ projects</strong> completed
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-[#d4a853] hover:bg-[#c49843] text-[#1a3d52] font-semibold"
                onClick={() => setQuotePopupOpen(true)}
              >
                Get a Free Quote
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <a href="tel:07970566409">
                  <Phone className="w-4 h-4 mr-2" />
                  Call 07970 566409
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1a3d52] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Coverage Area
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our service coverage across England. Click on any region or location to learn more about our local services.
            </p>
          </div>
          <DeferredServiceAreasMap 
            onAreaClick={(areaId) => {
              const element = document.getElementById(areaId);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            onQuoteClick={() => setQuotePopupOpen(true)}
          />
        </div>
      </section>

      {/* Why Local Matters Section */}
      <section className="py-16 bg-[#f8f5f0]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a3d52] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Choose a Local Shot Blasting Company?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Working with a local provider means faster response times, lower transport costs, and a team that understands your region's industries.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-[#2C5F7F]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1a3d52] mb-2">Rapid Response</h3>
                <p className="text-gray-600">
                  Same-day site visits available across our core regions. Quick turnaround times for urgent projects.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-[#2C5F7F]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1a3d52] mb-2">Trusted Reputation</h3>
                <p className="text-gray-600">
                  15+ years serving businesses across England. Our reputation is built on quality work and satisfied customers.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#2C5F7F]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1a3d52] mb-2">Industry Knowledge</h3>
                <p className="text-gray-600">
                  We understand the unique needs of different industries, from automotive to aerospace, agriculture to heritage.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Regional Sections */}
      {serviceRegions.map((region, index) => (
        <section 
          key={region.id} 
          id={region.id}
          className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-[#f8f5f0]'}`}
        >
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-2 text-[#d4a853] mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase tracking-wider">{region.tagline}</span>
                </div>
                <h2 className="text-3xl font-bold text-[#1a3d52] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Shot Blasting in {region.name}
                </h2>
                <p className="text-gray-600 mb-6">
                  {region.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#2C5F7F]/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[#2C5F7F]">{region.stats.projects}</div>
                    <div className="text-sm text-gray-600">Projects Completed</div>
                  </div>
                  <div className="bg-[#2C5F7F]/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[#2C5F7F]">{region.stats.clients}</div>
                    <div className="text-sm text-gray-600">Satisfied Clients</div>
                  </div>
                </div>

                    <div className="flex flex-wrap gap-3">
                      <Button 
                        className="bg-[#2C5F7F] hover:bg-[#1a3d52]"
                        onClick={() => setQuotePopupOpen(true)}
                      >
                        Get a Quote for {region.name}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F]/10"
                        asChild
                      >
                        <Link href={region.countyHref}>
                          View All {region.name} Locations
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
              </div>

              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-[#1a3d52] mb-4 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#2C5F7F]" />
                      Locations We Serve
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {region.locations.map((location) => {
                        const slug = locationSlugMap[location];
                        
                        if (slug) {
                          return (
                            <Link key={location} href={`/service-areas/${slug}`}>
                              <span className="px-3 py-1 bg-[#2C5F7F]/10 text-[#2C5F7F] rounded-full text-sm font-medium hover:bg-[#2C5F7F]/20 cursor-pointer transition-colors">
                                {location}
                              </span>
                            </Link>
                          );
                        }
                        return (
                          <span 
                            key={location}
                            className="px-3 py-1 bg-[#2C5F7F]/10 text-[#2C5F7F] rounded-full text-sm font-medium"
                          >
                            {location}
                          </span>
                        );
                      })}
                    </div>

                    <h3 className="font-semibold text-[#1a3d52] mb-4 flex items-center gap-2">
                      <Factory className="w-5 h-5 text-[#2C5F7F]" />
                      Industries We Serve
                    </h3>
                    <ul className="space-y-2">
                      {region.industries.map((industry) => (
                        <li key={industry} className="flex items-center gap-2 text-gray-600">
                          <CheckCircle className="w-4 h-4 text-[#d4a853]" />
                          {industry}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* All Locations Grid */}
      <section className="py-16 bg-[#1a3d52] text-white">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              All Service Locations
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              We provide professional shot blasting services to businesses across these locations and surrounding areas.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allLocations.map((location) => {
              const slug = locationSlugMap[location];
              
              if (slug) {
                return (
                  <Link
                    key={location}
                    href={`/service-areas/${slug}`}
                    className="flex items-center gap-2 p-3 bg-white/10 rounded-lg hover:bg-[#d4a853] hover:text-[#1a3d52] transition cursor-pointer group"
                  >
                    <MapPin className="w-4 h-4 text-[#d4a853] group-hover:text-[#1a3d52]" />
                    <span className="text-white/90 group-hover:text-[#1a3d52] font-medium">{location}</span>
                  </Link>
                );
              }
              
              // For locations without dedicated pages (Bradford, Wrexham, etc.)
              return (
                <div 
                  key={location}
                  className="flex items-center gap-2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition"
                >
                  <MapPin className="w-4 h-4 text-[#d4a853]" />
                  <span className="text-white/90">{location}</span>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <p className="text-white/60 mb-4">Don't see your location? We travel across England for larger projects.</p>
            <Button 
              className="bg-[#d4a853] hover:bg-[#c49843] text-[#1a3d52] font-semibold"
              asChild
            >
              <a href="tel:07970566409">
                <Phone className="w-4 h-4 mr-2" />
                Call to Discuss Your Location
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Available Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a3d52] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Services Available Across All Areas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              No matter where you're located, we offer our full range of professional shot blasting services.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Factory, title: "Steel Shot Blasting", desc: "Complete rust and coating removal from steel structures" },
              { icon: Building2, title: "Concrete Preparation", desc: "Surface preparation for coatings and repairs" },
              { icon: Warehouse, title: "Industrial Equipment", desc: "Machinery and equipment restoration" },
            ].map((service) => (
              <Card key={service.title} className="border-0 shadow-lg hover:shadow-xl transition group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#2C5F7F]/20 transition">
                    <service.icon className="w-6 h-6 text-[#2C5F7F]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a3d52] mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild className="bg-[#2C5F7F] hover:bg-[#1a3d52]">
              <Link href="/#services">
                View All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Get Started?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Contact us today for a free, no-obligation quote. We'll visit your site, assess your requirements, and provide a competitive price.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg"
              className="bg-[#d4a853] hover:bg-[#c49843] text-[#1a3d52] font-semibold"
              onClick={() => setQuotePopupOpen(true)}
            >
              Request a Free Quote
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <a href="tel:07970566409">
                <Phone className="w-4 h-4 mr-2" />
                07970 566409
              </a>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <a href="mailto:info@commercialshotblasting.co.uk">
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Counties & Cities Coverage Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-[#2C5F7F] mb-4">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Complete Coverage List</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3d52] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Counties & Cities We Serve
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional shot blasting services across England and Wales. From major cities to rural counties, we bring expertise to your location.
            </p>
          </div>

          {/* England Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a3d52]" style={{ fontFamily: "'Playfair Display', serif" }}>
                England
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Midlands */}
              <Card className="border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-[#2C5F7F] mb-4 flex items-center gap-2">
                    <Factory className="w-5 h-5" />
                    Midlands Region
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-[#1a3d52] mb-2">West Midlands</p>
                      <p className="text-sm text-gray-600">Birmingham, Wolverhampton, Coventry, Worcester, Stratford-upon-Avon, Dudley, Walsall, Solihull, West Bromwich, Warwickshire, Worcestershire, Staffordshire</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a3d52] mb-2">East Midlands</p>
                      <p className="text-sm text-gray-600">Nottingham, Leicester, Derby, Northampton, Chesterfield, Lincoln, Leicestershire, Nottinghamshire, Derbyshire, Lincolnshire, Northamptonshire</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Northern England */}
              <Card className="border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-[#2C5F7F] mb-4 flex items-center gap-2">
                    <Warehouse className="w-5 h-5" />
                    Northern England
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-[#1a3d52] mb-2">Yorkshire</p>
                      <p className="text-sm text-gray-600">Sheffield, Leeds, Bradford, South Yorkshire, West Yorkshire, North Yorkshire</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a3d52] mb-2">North West</p>
                      <p className="text-sm text-gray-600">Liverpool, Manchester, Chester, Stoke-on-Trent, Merseyside, Greater Manchester, Cheshire, Staffordshire</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Eastern England */}
              <Card className="border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-[#2C5F7F] mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Eastern England
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-[#1a3d52] mb-2">East of England</p>
                      <p className="text-sm text-gray-600">Norwich, Cambridge, Peterborough, St Albans, Ipswich, Norfolk, Suffolk, Cambridgeshire, Hertfordshire, Essex</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Southern England */}
              <Card className="border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-[#2C5F7F] mb-4 flex items-center gap-2">
                    <Factory className="w-5 h-5" />
                    Southern England
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-[#1a3d52] mb-2">South West</p>
                      <p className="text-sm text-gray-600">Bristol, Gloucester, Swindon, Gloucestershire, Wiltshire, Somerset, Avon</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a3d52] mb-2">South East & Thames Valley</p>
                      <p className="text-sm text-gray-600">Oxford, Milton Keynes, Oxfordshire, Buckinghamshire, Berkshire</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Wales Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#2C5F7F]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a3d52]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Wales
              </h3>
            </div>
            
            <Card className="border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow max-w-2xl">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-[#2C5F7F] mb-4 flex items-center gap-2">
                  <Warehouse className="w-5 h-5" />
                  Welsh Borders & Wales
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-[#1a3d52] mb-2">Major Cities & Counties</p>
                    <p className="text-sm text-gray-600">Cardiff, Wrexham, Shrewsbury, Hereford, South Wales, North Wales, Shropshire, Herefordshire, Powys, Monmouthshire</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center bg-[#f8f5f0] rounded-lg p-8">
            <h3 className="text-2xl font-bold text-[#1a3d52] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Don't See Your Location?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We regularly travel to new areas for the right projects. Get in touch to discuss your requirements—we may be able to help even if your location isn't listed above.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                className="bg-[#2C5F7F] hover:bg-[#1a3d52] text-white"
                onClick={() => setQuotePopupOpen(true)}
              >
                Request a Quote
              </Button>
              <Button 
                variant="outline"
                className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F]/10"
                asChild
              >
                <a href="tel:07970566409">
                  <Phone className="w-4 h-4 mr-2" />
                  Call 07970 566409
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a3d52] text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#d4a853] rounded-lg flex items-center justify-center">
                  <span className="text-[#1a3d52] font-bold text-lg">CSB</span>
                </div>
                <div>
                  <h3 className="font-semibold">Commercial Shot Blasting</h3>
                  <p className="text-sm text-white/60">Professional Surface Preparation</p>
                </div>
              </div>
              <p className="text-white/70 text-sm">
                Professional shot blasting services across England. Quality workmanship, competitive prices.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/70">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/our-work" className="hover:text-white transition">Our Work</Link></li>
                <li><Link href="/service-areas" className="hover:text-white transition">Service Areas</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/70">
                <li><Link href="/services/steel-shot-blasting" className="hover:text-white transition">Steel Shot Blasting</Link></li>
                <li><Link href="/services/concrete-preparation" className="hover:text-white transition">Concrete Preparation</Link></li>
                <li><Link href="/services/gate-restoration" className="hover:text-white transition">Gate Restoration</Link></li>
                <li><Link href="/services/automotive-restoration" className="hover:text-white transition">Automotive Restoration</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-center gap-2 hover:text-white transition">
                  <Phone className="w-4 h-4" />
                  <a href="tel:07970566409">07970 566409</a>
                </li>
                <li className="flex items-center gap-2 hover:text-white transition">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:info@commercialshotblasting.co.uk">info@commercialshotblasting.co.uk</a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1" />
                  <span>West Midlands, UK</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50 text-sm">
            <p>&copy; {new Date().getFullYear()} Commercial Shot Blasting. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
    </div>
  );
}
