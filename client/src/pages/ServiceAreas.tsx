import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { ServiceAreasMap } from "@/components/ServiceAreasMap";
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
    tagline: "Our Home Region",
    description: "The West Midlands is our home base and where we've built our reputation over 15+ years. From Birmingham's automotive suppliers to Wolverhampton's foundries, we understand the unique needs of Midlands industries.",
    locations: ["Birmingham", "Wolverhampton", "Coventry", "Worcester", "Stratford Upon Avon", "Dudley", "Walsall", "Solihull", "West Bromwich"],
    industries: ["Automotive manufacturing", "Aerospace components", "Foundry & casting", "Metal fabrication", "Heritage restoration"],
    stats: { projects: "2,000+", clients: "500+" }
  },
  {
    id: "east-midlands",
    name: "East Midlands",
    tagline: "Manufacturing Heartland",
    description: "The East Midlands is home to some of the UK's most important manufacturing centres. We serve clients across Nottingham, Leicester, Derby, Lincoln, Chesterfield and Northampton with the same quality and reliability.",
    locations: ["Nottingham", "Leicester", "Derby", "Northampton", "Chesterfield", "Lincoln"],
    industries: ["Heavy engineering", "Textile machinery", "Food processing equipment", "Rail components", "Industrial equipment"],
    stats: { projects: "800+", clients: "200+" }
  },
  {
    id: "yorkshire",
    name: "Yorkshire",
    tagline: "Steel City & Beyond",
    description: "From Sheffield's legendary steel industry to Leeds and Bradford's diverse manufacturing sectors, we serve clients across Yorkshire with comprehensive shot blasting services.",
    locations: ["Sheffield", "Leeds", "Bradford"],
    industries: ["Steel manufacturing", "Cutlery & tools", "Heavy engineering", "Textile machinery", "Automotive components"],
    stats: { projects: "450+", clients: "100+" }
  },
  {
    id: "north-west",
    name: "North West",
    tagline: "Industrial Heritage",
    description: "From Liverpool's maritime industry to Manchester's engineering excellence, we provide comprehensive shot blasting services across the North West region.",
    locations: ["Liverpool", "Manchester", "Chester", "Stoke-on-Trent"],
    industries: ["Maritime & shipping", "Ceramics industry", "Chemical processing", "Construction steel", "Architectural metalwork"],
    stats: { projects: "600+", clients: "150+" }
  },
  {
    id: "east-england",
    name: "East of England",
    tagline: "Growing Coverage",
    description: "Our East of England coverage extends from Cambridge's high-tech industries to Norwich's agricultural equipment manufacturers, Ipswich and beyond.",
    locations: ["Norwich", "Cambridge", "Peterborough", "St Albans", "Ipswich"],
    industries: ["Agricultural machinery", "Scientific equipment", "Food processing", "Construction", "Heritage restoration"],
    stats: { projects: "400+", clients: "100+" }
  },
  {
    id: "south-west",
    name: "South West",
    tagline: "Bristol & Beyond",
    description: "We serve the South West from Bristol through Gloucester to Swindon, supporting aerospace, automotive and manufacturing clients.",
    locations: ["Bristol", "Gloucester", "Swindon"],
    industries: ["Aerospace manufacturing", "Automotive components", "Marine equipment", "Agricultural machinery", "Construction"],
    stats: { projects: "350+", clients: "80+" }
  },
  {
    id: "south-east",
    name: "South East & Thames Valley",
    tagline: "Oxford & Milton Keynes",
    description: "Our South East coverage includes Oxford's scientific instrument makers and Milton Keynes' diverse manufacturing sector.",
    locations: ["Oxford", "Milton Keynes"],
    industries: ["Scientific instruments", "Automotive", "Logistics equipment", "Construction", "Heritage restoration"],
    stats: { projects: "250+", clients: "60+" }
  },
  {
    id: "welsh-borders",
    name: "Welsh Borders & Wales",
    tagline: "Shrewsbury to Cardiff",
    description: "We serve clients along the Welsh borders and into Wales, from Shrewsbury and Wrexham in the north to Hereford and Cardiff in the south.",
    locations: ["Shrewsbury", "Hereford", "Wrexham", "Cardiff"],
    industries: ["Agricultural machinery", "Farm equipment", "Construction steel", "Heritage restoration", "Architectural metalwork", "Marine & port equipment"],
    stats: { projects: "300+", clients: "70+" }
  }
];

// All individual locations for the comprehensive list
const allLocations = [
  "Birmingham", "Wolverhampton", "Coventry", "Worcester", "Stratford Upon Avon",
  "Nottingham", "Leicester", "Derby", "Northampton", "Chesterfield", "Lincoln",
  "Sheffield", "Leeds", "Bradford",
  "Liverpool", "Manchester", "Chester", "Stoke-on-Trent",
  "Norwich", "Cambridge", "Peterborough", "St Albans", "Ipswich",
  "Bristol", "Gloucester", "Swindon",
  "Oxford", "Milton Keynes",
  "Shrewsbury", "Hereford", "Wrexham", "Cardiff"
];

export default function ServiceAreas() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />

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
              <span className="text-sm font-medium uppercase tracking-wider">Nationwide Coverage</span>
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
          <ServiceAreasMap 
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

                <Button 
                  className="bg-[#2C5F7F] hover:bg-[#1a3d52]"
                  onClick={() => setQuotePopupOpen(true)}
                >
                  Get a Quote for {region.name}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
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
                        let href = null;
                        if (location === "Birmingham" && region.id === "west-midlands") {
                          href = "/service-areas/birmingham";
                        } else if (location === "Sheffield" && region.id === "yorkshire") {
                          href = "/service-areas/sheffield";
                        } else if (location === "Leeds" && region.id === "yorkshire") {
                          href = "/service-areas/leeds";
                        } else if (location === "Manchester" && region.id === "north-west") {
                          href = "/service-areas/manchester";
                        } else if (location === "Liverpool" && region.id === "north-west") {
                          href = "/service-areas/liverpool";
                        } else if (location === "Bristol" && region.id === "south-west") {
                          href = "/service-areas/bristol";
                        }
                        
                        if (href) {
                          return (
                            <Link key={location} href={href}>
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
              // Map location names to their URL slugs
              const locationSlugMap: Record<string, string> = {
                "Birmingham": "birmingham",
                "Sheffield": "sheffield",
                "Manchester": "manchester",
                "Bristol": "bristol",
                "Leeds": "leeds",
                "Bradford": "bradford",
                "Liverpool": "liverpool",
                "Wolverhampton": "wolverhampton",
                "Coventry": "coventry",
                "Worcester": "worcester",
                "Stratford Upon Avon": "stratford-upon-avon",
                "Leicester": "leicester",
                "Derby": "derby",
                "Nottingham": "nottingham",
                "Chester": "chester",
                "Stoke-on-Trent": "stoke",
                "Norwich": "norwich",
                "Cambridge": "cambridge",
                "Ipswich": "ipswich",
                "Lincoln": "lincoln",
                "Milton Keynes": "milton-keynes",
                "Gloucester": "gloucester",
                "Swindon": "swindon",
                "Shrewsbury": "shrewsbury",
                "Hereford": "hereford",
                "Cardiff": "cardiff",
                "Northampton": "northampton",
                "Oxford": "oxford",
                "Peterborough": "peterborough",
                "Chesterfield": "chesterfield",
                "St Albans": "st-albans",
                "Wrexham": "wrexham"
              };
              
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
                <li><Link href="/gallery" className="hover:text-white transition">Gallery</Link></li>
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
