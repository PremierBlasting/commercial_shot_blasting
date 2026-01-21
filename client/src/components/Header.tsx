import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Phone, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface HeaderProps {
  onOpenQuotePopup?: () => void;
}

const serviceLinks = [
  { title: "Structural Steel Frames", href: "/services/structural-steel-frames", description: "Comprehensive shot blasting for building frames and trusses" },
  { title: "Fire Escapes & External Stair Towers", href: "/services/fire-escapes", description: "Specialist surface preparation for fire safety infrastructure" },
  { title: "Internal Steel Staircases, Balustrades & Handrails", href: "/services/staircases", description: "Precision shot blasting for architectural metalwork" },
  { title: "Bridge Steelwork (Girders, Crossmembers, Parapet Rails)", href: "/services/bridge-steelwork", description: "Comprehensive surface preparation for bridge infrastructure" },
  { title: "Crane Beams, Gantries & Runway Rails", href: "/services/crane-beams", description: "Specialist surface preparation for material handling infrastructure" },
  { title: "Fixed Ladders & Step-Over Platforms", href: "/services/ladders", description: "Comprehensive surface preparation for industrial access systems" },
  { title: "Warehouse Racking & Pallet Rack Frames", href: "/services/warehouse-racking", description: "Professional shot blasting for warehouse racking systems" },
  { title: "Process Pipework, Spools & Manifolds", href: "/services/pipework", description: "Precision cleaning of industrial pipework systems" },
  { title: "Telecom Masts & Lattice Towers", href: "/services/telecom-towers", description: "Specialist shot blasting for telecommunications infrastructure" },
];

const areasLinks = [
  {
    region: "West Midlands",
    locations: [
      { title: "Birmingham", href: "/service-areas/birmingham" },
      { title: "Wolverhampton", href: "/service-areas/wolverhampton" },
      { title: "Coventry", href: "/service-areas/coventry" },
      { title: "Worcester", href: "/service-areas/worcester" },
      { title: "Stratford Upon Avon", href: "/service-areas/stratford-upon-avon" },
    ]
  },
  {
    region: "East Midlands",
    locations: [
      { title: "Nottingham", href: "/service-areas/nottingham" },
      { title: "Leicester", href: "/service-areas/leicester" },
      { title: "Derby", href: "/service-areas/derby" },
      { title: "Lincoln", href: "/service-areas/lincoln" },
      { title: "Northampton", href: "/service-areas/northampton" },
      { title: "Chesterfield", href: "/service-areas/chesterfield" },
    ]
  },
  {
    region: "Yorkshire",
    locations: [
      { title: "Sheffield", href: "/service-areas/sheffield" },
      { title: "Leeds", href: "/service-areas/leeds" },
      { title: "Bradford", href: "/service-areas#bradford" },
    ]
  },
  {
    region: "North West",
    locations: [
      { title: "Manchester", href: "/service-areas/manchester" },
      { title: "Liverpool", href: "/service-areas/liverpool" },
      { title: "Chester", href: "/service-areas/chester" },
      { title: "Stoke", href: "/service-areas/stoke" },
    ]
  },
  {
    region: "East of England",
    locations: [
      { title: "Norwich", href: "/service-areas/norwich" },
      { title: "Cambridge", href: "/service-areas/cambridge" },
      { title: "Ipswich", href: "/service-areas/ipswich" },
      { title: "St Albans", href: "/service-areas/st-albans" },
      { title: "Peterborough", href: "/service-areas/peterborough" },
    ]
  },
  {
    region: "South West",
    locations: [
      { title: "Bristol", href: "/service-areas/bristol" },
      { title: "Gloucester", href: "/service-areas/gloucester" },
      { title: "Swindon", href: "/service-areas/swindon" },
    ]
  },
  {
    region: "South East",
    locations: [
      { title: "Milton Keynes", href: "/service-areas/milton-keynes" },
      { title: "Oxford", href: "/service-areas/oxford" },
    ]
  },
  {
    region: "Welsh Borders & Wales",
    locations: [
      { title: "Shrewsbury", href: "/service-areas/shrewsbury" },
      { title: "Hereford", href: "/service-areas/hereford" },
      { title: "Cardiff", href: "/service-areas/cardiff" },
    ]
  },
];

export function Header({ onOpenQuotePopup }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const areasDropdownRef = useRef<HTMLDivElement>(null);
  const industriesDropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const areasTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const industriesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Filter locations based on search query
  const filteredAreasLinks = searchQuery.trim() === "" 
    ? areasLinks 
    : areasLinks.map(region => ({
        ...region,
        locations: region.locations.filter(loc => 
          loc.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(region => region.locations.length > 0);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileAreasOpen(false);
    setMobileIndustriesOpen(false);
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
              onClick={(e) => {
                // Allow navigation to /services
                setServicesOpen(false);
              }}
              onMouseDown={(e) => {
                // Prevent navigation when clicking the chevron area to toggle dropdown
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
            
            {/* Dropdown Menu */}
            <div 
              className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                servicesOpen 
                  ? 'opacity-100 visible translate-y-0' 
                  : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              }`}
              style={{ zIndex: 99999 }}
            >
              <div className="w-80 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden">
                <div className="py-2">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block px-4 py-3 hover:bg-[#2C5F7F] hover:text-white transition-colors group"
                      onClick={() => setServicesOpen(false)}
                    >
                      <div className="font-medium text-gray-900 group-hover:text-white">{service.title}</div>
                      <div className="text-xs text-gray-500 group-hover:text-white/80 mt-0.5">{service.description}</div>
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <a
                      href="/#services"
                      className="block px-4 py-2 text-[#2C5F7F] font-medium hover:bg-[#2C5F7F]/10 transition-colors"
                      onClick={() => setServicesOpen(false)}
                    >
                      View All Services →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a href="/about" className="hover:text-white/80 transition">About</a>
          
          {/* Industries Dropdown */}
          <div 
            ref={industriesDropdownRef}
            className="relative"
            onMouseEnter={handleIndustriesMouseEnter}
            onMouseLeave={handleIndustriesMouseLeave}
          >
            <button 
              className="flex items-center gap-1 hover:text-white/80 transition py-2"
              onClick={() => setIndustriesOpen(!industriesOpen)}
              type="button"
              aria-expanded={industriesOpen}
              aria-haspopup="true"
            >
              Industries
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${industriesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Menu */}
            <div 
              className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                industriesOpen 
                  ? 'opacity-100 visible translate-y-0' 
                  : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              }`}
              style={{ zIndex: 99999 }}
            >
              <div className="w-64 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden">
                <div className="py-2">
                  <Link
                    href="/industries/construction"
                    className="block px-4 py-3 hover:bg-[#2C5F7F] hover:text-white transition-colors group"
                    onClick={() => setIndustriesOpen(false)}
                  >
                    <div className="font-medium text-gray-900 group-hover:text-white">Construction</div>
                    <div className="text-xs text-gray-500 group-hover:text-white/80 mt-0.5">Structural steel, bridges, fire escapes</div>
                  </Link>
                  <Link
                    href="/industries/manufacturing"
                    className="block px-4 py-3 hover:bg-[#2C5F7F] hover:text-white transition-colors group"
                    onClick={() => setIndustriesOpen(false)}
                  >
                    <div className="font-medium text-gray-900 group-hover:text-white">Manufacturing</div>
                    <div className="text-xs text-gray-500 group-hover:text-white/80 mt-0.5">Warehouse racking, crane systems, pipework</div>
                  </Link>
                  <Link
                    href="/industries/retail"
                    className="block px-4 py-3 hover:bg-[#2C5F7F] hover:text-white transition-colors group"
                    onClick={() => setIndustriesOpen(false)}
                  >
                    <div className="font-medium text-gray-900 group-hover:text-white">Retail</div>
                    <div className="text-xs text-gray-500 group-hover:text-white/80 mt-0.5">Shopping trolleys, shop fittings, displays</div>
                  </Link>
                  <Link
                    href="/industries/aerospace"
                    className="block px-4 py-3 hover:bg-[#2C5F7F] hover:text-white transition-colors group"
                    onClick={() => setIndustriesOpen(false)}
                  >
                    <div className="font-medium text-gray-900 group-hover:text-white">Aerospace</div>
                    <div className="text-xs text-gray-500 group-hover:text-white/80 mt-0.5">Landing gear, engine components, airframes</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <Link href="/gallery" className="hover:text-white/80 transition">Gallery</Link>
          <Link href="/blog" className="hover:text-white/80 transition">Blog</Link>
          
          {/* Areas Dropdown */}
          <div 
            ref={areasDropdownRef}
            className="relative"
            onMouseEnter={handleAreasMouseEnter}
            onMouseLeave={handleAreasMouseLeave}
          >
            <button 
              className="flex items-center gap-1 hover:text-white/80 transition py-2"
              onClick={() => setAreasOpen(!areasOpen)}
              type="button"
              aria-expanded={areasOpen}
              aria-haspopup="true"
            >
              Areas
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${areasOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Areas Mega Menu */}
            <div 
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                areasOpen 
                  ? 'opacity-100 visible translate-y-0' 
                  : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              }`}
              style={{ zIndex: 99999 }}
            >
              <div className="w-[800px] bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-6">
                  {/* Search Bar */}
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Search locations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C5F7F] focus:border-transparent text-gray-700 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    {filteredAreasLinks.map((area) => (
                      <div key={area.region}>
                        <div className="font-semibold text-[#2C5F7F] text-sm mb-3 pb-2 border-b border-gray-200">
                          {area.region}
                        </div>
                        <div className="space-y-1">
                          {area.locations.map((location) => (
                            <Link
                              key={location.href}
                              href={location.href}
                              className="block px-3 py-1.5 text-gray-700 hover:bg-[#2C5F7F] hover:text-white rounded transition-colors text-sm"
                              onClick={() => setAreasOpen(false)}
                            >
                              {location.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {filteredAreasLinks.length === 0 && (
                    <div className="col-span-3 text-center py-8 text-gray-500">
                      No locations found matching "{searchQuery}"
                    </div>
                  )}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <Link
                      href="/service-areas"
                      className="inline-flex items-center text-[#2C5F7F] font-medium hover:text-[#1a3d52] transition-colors text-sm"
                      onClick={() => { setAreasOpen(false); setSearchQuery(""); }}
                    >
                      View All Service Areas →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <a href="/contact" className="hover:text-white/80 transition">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          <a href="tel:07970566409" className="hidden lg:flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4" />
            07970 566409
          </a>
          <Button className="hidden sm:flex bg-white text-[#2C5F7F] hover:bg-white/90" onClick={onOpenQuotePopup}>
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
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container py-4 border-t border-white/20">
          <div className="flex flex-col gap-2">
            <Link href="/" onClick={closeMobileMenu} className="py-3 hover:text-white/80 transition border-b border-white/10">Home</Link>
            
            {/* Services with Sub-menu */}
            <div className="border-b border-white/10">
              <button
                className="w-full py-3 flex items-center justify-between hover:text-white/80 transition"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                type="button"
              >
                <span>Services</span>
                {mobileServicesOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              {/* Mobile Services Sub-menu */}
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  mobileServicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pl-4 pb-3 space-y-1">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block py-2 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm"
                      onClick={closeMobileMenu}
                    >
                      {service.title}
                    </Link>
                  ))}
                  <a
                    href="/#services"
                    className="block py-2 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm font-medium"
                    onClick={closeMobileMenu}
                  >
                    View All Services →
                  </a>
                </div>
              </div>
            </div>

            <a href="/about" onClick={closeMobileMenu} className="py-3 hover:text-white/80 transition border-b border-white/10">About</a>
            
            {/* Industries with Sub-menu */}
            <div className="border-b border-white/10">
              <button
                className="w-full py-3 flex items-center justify-between hover:text-white/80 transition"
                onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                type="button"
              >
                <span>Industries</span>
                {mobileIndustriesOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              {/* Mobile Industries Sub-menu */}
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  mobileIndustriesOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pl-4 pb-3 space-y-1">
                  <Link
                    href="/industries/construction"
                    className="block py-2 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm"
                    onClick={closeMobileMenu}
                  >
                    Construction
                  </Link>
                  <Link
                    href="/industries/manufacturing"
                    className="block py-2 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm"
                    onClick={closeMobileMenu}
                  >
                    Manufacturing
                  </Link>
                  <Link
                    href="/industries/retail"
                    className="block py-2 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm"
                    onClick={closeMobileMenu}
                  >
                    Retail
                  </Link>
                  <Link
                    href="/industries/aerospace"
                    className="block py-2 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm"
                    onClick={closeMobileMenu}
                  >
                    Aerospace
                  </Link>
                </div>
              </div>
            </div>
            
            <Link href="/gallery" onClick={closeMobileMenu} className="py-3 hover:text-white/80 transition border-b border-white/10">Gallery</Link>
            <Link href="/blog" onClick={closeMobileMenu} className="py-3 hover:text-white/80 transition border-b border-white/10">Blog</Link>
            
            {/* Mobile Areas with Sub-menu */}
            <div className="border-b border-white/10">
              <button
                className="w-full py-3 flex items-center justify-between hover:text-white/80 transition"
                onClick={() => setMobileAreasOpen(!mobileAreasOpen)}
                type="button"
              >
                <span>Service Areas</span>
                {mobileAreasOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              {/* Mobile Areas Sub-menu with Scroll */}
              <div 
                className={`transition-all duration-300 ${
                  mobileAreasOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="overflow-y-auto max-h-[450px] pl-4 pb-3 space-y-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  {areasLinks.map((area) => (
                    <div key={area.region}>
                      <div className="text-white/60 text-xs font-semibold uppercase py-2 px-3 sticky top-0 bg-[#2C5F7F] z-10">{area.region}</div>
                      {area.locations.map((location) => (
                        <Link
                          key={location.href}
                          href={location.href}
                          className="block py-2 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm"
                          onClick={closeMobileMenu}
                        >
                          {location.title}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <Link
                    href="/service-areas"
                    className="block py-2 px-3 text-white font-medium hover:bg-white/10 rounded transition text-sm mt-2"
                    onClick={closeMobileMenu}
                  >
                    View All Service Areas →
                  </Link>
                </div>
              </div>
            </div>
            
            <a href="/contact" onClick={closeMobileMenu} className="py-3 hover:text-white/80 transition border-b border-white/10">Contact</a>
            
            <div className="flex flex-col gap-3 pt-4">
              <a href="tel:07970566409" className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                07970 566409
              </a>
              <Button 
                className="bg-white text-[#2C5F7F] hover:bg-white/90 w-full" 
                onClick={() => { closeMobileMenu(); onOpenQuotePopup?.(); }}
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
