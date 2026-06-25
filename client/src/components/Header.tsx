import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Phone, Menu, X, ChevronDown, ChevronRight, Search, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { usePrefetch } from "@/hooks/usePrefetch";
import { trackCTAClick, trackPhoneCall } from "@/lib/analytics";
// headerData is loaded dynamically on first interaction to keep it out of the initial bundle
type HeaderData = typeof import('./headerData');

interface HeaderProps {
  onOpenQuotePopup?: () => void;
}

export function Header({ onOpenQuotePopup }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileAreasSearch, setMobileAreasSearch] = useState("");
  const [expandedRegions, setExpandedRegions] = useState<string[]>([]);
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);

  // Dynamically load header data on first interaction
  const loadHeaderData = () => {
    if (!headerData) {
      import('./headerData').then(setHeaderData);
    }
  };

  const serviceLinks = headerData?.serviceLinks ?? [];
  const compactAreasLinks = headerData?.compactAreasLinks ?? [];
  const fullAreasLinks = headerData?.fullAreasLinks ?? [];
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

  // Preload header data during browser idle time so it's ready before first hover
  useEffect(() => {
    const load = () => loadHeaderData();
    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(load, { timeout: 3000 });
      return () => (window as any).cancelIdleCallback(id);
    } else {
      const t = setTimeout(load, 2000);
      return () => clearTimeout(t);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    loadHeaderData();
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
    loadHeaderData();
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
    loadHeaderData();
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
        <nav className="hidden md:flex items-center gap-4">
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
              <div className="w-[860px] bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-5">
                  <div className="grid grid-cols-3 gap-4">
                    {/* Structural & Architectural */}
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <div className="px-4 py-2 text-white text-sm font-bold" style={{ backgroundColor: '#2C5F7F' }}>Structural &amp; Architectural</div>
                      {[
                        { title: 'Structural Steel Shot Blasting', href: '/services/structural-steel-frames' },
                        { title: 'Fire Escape Shot Blasting', href: '/services/fire-escapes' },
                        { title: 'Racking & Mezzanine Blasting', href: '/services/warehouse-racking' },
                        { title: 'Steel Gates & Railings', href: '/services/steel-gates' },
                        { title: 'Steel Doors & Roller Shutters', href: '/services/steel-doors' },
                        { title: 'Bridge Steelwork', href: '/services/bridge-steelwork' },
                      ].map((s) => (
                        <Link key={s.href} href={s.href} className="flex items-center justify-between px-4 py-2.5 hover:bg-[#2C5F7F]/5 border-t border-gray-100 group" onClick={() => setServicesOpen(false)}>
                          <span className="text-gray-800 text-xs font-medium group-hover:text-[#2C5F7F]">{s.title}</span>
                          <span className="text-gray-400 group-hover:text-[#2C5F7F] text-xs">→</span>
                        </Link>
                      ))}
                    </div>
                    {/* Industrial & Specialist */}
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <div className="px-4 py-2 text-white text-sm font-bold" style={{ backgroundColor: '#1a3d52' }}>Industrial &amp; Specialist</div>
                      {[
                        { title: 'Container Shot Blasting', href: '/services/steel-containers' },
                        { title: 'Floor Shot Blasting', href: '/services/floor-preparation' },
                        { title: 'Pipework Shot Blasting', href: '/services/pipework' },
                        { title: 'Telecom Tower Shot Blasting', href: '/services/telecom-towers' },
                        { title: 'Machinery Shot Blasting', href: '/services/plant-machinery' },
                        { title: 'Marine Shot Blasting', href: '/services/marine-shot-blasting' },
                      ].map((s) => (
                        <Link key={s.href} href={s.href} className="flex items-center justify-between px-4 py-2.5 hover:bg-[#1a3d52]/5 border-t border-gray-100 group" onClick={() => setServicesOpen(false)}>
                          <span className="text-gray-800 text-xs font-medium group-hover:text-[#1a3d52]">{s.title}</span>
                          <span className="text-gray-400 group-hover:text-[#1a3d52] text-xs">→</span>
                        </Link>
                      ))}
                    </div>
                    {/* Surface Preparation */}
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <div className="px-4 py-2 text-white text-sm font-bold" style={{ backgroundColor: '#3d6b3d' }}>Surface Preparation</div>
                      {[
                        { title: 'Rust Removal', href: '/services/rust-removal' },
                        { title: 'Mill Scale Removal', href: '/services/mill-scale-removal' },
                        { title: 'Paint Stripping', href: '/services/paint-stripping' },
                        { title: 'Coating Removal', href: '/services/coating-removal' },
                        { title: 'Factory Cladding Blasting', href: '/services/factory-cladding' },
                        { title: 'Agricultural Shot Blasting', href: '/services/agricultural-shot-blasting' },
                      ].map((s) => (
                        <Link key={s.href} href={s.href} className="flex items-center justify-between px-4 py-2.5 hover:bg-[#3d6b3d]/5 border-t border-gray-100 group" onClick={() => setServicesOpen(false)}>
                          <span className="text-gray-800 text-xs font-medium group-hover:text-[#3d6b3d]">{s.title}</span>
                          <span className="text-gray-400 group-hover:text-[#3d6b3d] text-xs">→</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-100 mt-4 pt-3">
                    <Link
                      href="/services"
                      className="block px-3 py-2 text-[#2C5F7F] font-medium hover:bg-[#2C5F7F]/10 transition-colors rounded-md text-center text-sm"
                      onClick={() => setServicesOpen(false)}
                    >
                      View All 18 Services →
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
                  {/* View All Industries */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <Link
                      href="/industries"
                      className="flex items-center justify-center gap-2 w-full py-2 bg-[#2C5F7F] text-white rounded-lg hover:bg-[#1a3d52] transition-colors font-medium text-sm"
                      onClick={() => setIndustriesOpen(false)}
                    >
                      View All Industries
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
          >Prep & Cleanup</Link>
          <Link 
            href="/our-work" 
            className="hover:text-white/80 transition"
            onMouseEnter={() => prefetch('/our-work')}
            onMouseLeave={cancelPrefetch}
          >Our Work</Link>
          <Link 
            href="/reviews" 
            className="hover:text-white/80 transition"
            onMouseEnter={() => prefetch('/reviews')}
            onMouseLeave={cancelPrefetch}
          >Reviews</Link>
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
                  
                  {/* View All Links */}
                  <div className="mt-5 pt-4 border-t border-gray-100 flex gap-3">
                    <Link
                      href="/service-areas"
                      className="flex items-center justify-center gap-2 flex-1 py-2.5 bg-[#2C5F7F] text-white rounded-lg hover:bg-[#1a3d52] transition-colors font-medium text-sm"
                      onClick={() => setAreasOpen(false)}
                    >
                      <MapPin className="w-4 h-4" />
                      View All Service Areas
                    </Link>
                    <Link
                      href="/counties"
                      className="flex items-center justify-center gap-2 flex-1 py-2.5 border-2 border-[#2C5F7F] text-[#2C5F7F] rounded-lg hover:bg-[#2C5F7F] hover:text-white transition-colors font-medium text-sm"
                      onClick={() => setAreasOpen(false)}
                    >
                      Browse by County
                    </Link>
                    <Link
                      href="/sitemap"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-[#2C5F7F] transition-colors text-sm"
                      onClick={() => setAreasOpen(false)}
                    >
                      Full Site Map
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
              trackCTAClick('Request A Site Visit', 'Header');
              onOpenQuotePopup?.();
            }}
          >
            Request A Site Visit
          </Button>
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
            onClick={() => { loadHeaderData(); setMobileMenuOpen(prev => !prev); }}
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
                <Link href="/industries/transport-logistics" className="block py-2 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm" onClick={closeMobileMenu}>Transport & Logistics</Link>
                <Link href="/industries/heritage-restoration" className="block py-2 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm" onClick={closeMobileMenu}>Heritage & Restoration</Link>
              </div>
              <Link
                href="/industries"
                className="block mt-2 py-2 px-3 text-center bg-white/10 text-white hover:bg-white/20 rounded-lg transition text-sm font-medium"
                onClick={closeMobileMenu}
              >
                View All Industries →
              </Link>
            </div>
            
            <Link href="/preparation-cleanup" onClick={closeMobileMenu} className="py-3 hover:text-white/80 transition border-b border-white/10">Prep & Cleanup</Link>
            <Link href="/our-work" onClick={closeMobileMenu} className="py-3 hover:text-white/80 transition border-b border-white/10">Our Work</Link>
            <Link href="/reviews" onClick={closeMobileMenu} className="py-3 hover:text-white/80 transition border-b border-white/10">Reviews</Link>
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
              
              {/* View All Links */}
              <div className="mt-3 flex flex-col gap-2">
                <Link
                  href="/service-areas"
                  className="block py-2 px-3 text-center bg-white/10 text-white hover:bg-white/20 rounded-lg transition text-sm font-medium"
                  onClick={closeMobileMenu}
                >
                  View All 102 Service Areas →
                </Link>
                <Link
                  href="/counties"
                  className="block py-2 px-3 text-center border border-white/30 text-white hover:bg-white/10 rounded-lg transition text-sm font-medium"
                  onClick={closeMobileMenu}
                >
                  Browse by County →
                </Link>
                <Link
                  href="/sitemap"
                  className="block py-2 px-3 text-center border border-white/20 text-white/70 hover:bg-white/10 hover:text-white rounded-lg transition text-sm"
                  onClick={closeMobileMenu}
                >
                  Full Site Map →
                </Link>
              </div>
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
                  trackCTAClick('Request A Site Visit', 'Mobile Menu');
                  onOpenQuotePopup?.(); 
                }}
              >
                Request A Site Visit
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
