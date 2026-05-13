import { useState, useMemo } from "react";
import { Link } from "wouter";
import { countyData } from "@/data/countyData";
import { locationData } from "@/data/locationData";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Search, X } from "lucide-react";

// ── Static data ────────────────────────────────────────────────────────────────
const REGION_ORDER = [
  "East Midlands",
  "East of England",
  "West Midlands",
  "Yorkshire",
  "North West",
  "North West England",
  "North East England",
  "South West",
  "South England",
  "South East England",
  "Wales Borders",
];

const SERVICE_SLUGS: { slug: string; name: string }[] = [
  { slug: "structural-steel-shot-blasting", name: "Structural Steel Shot Blasting" },
  { slug: "container-shot-blasting", name: "Container Shot Blasting" },
  { slug: "factory-cladding-shot-blasting", name: "Factory Cladding Shot Blasting" },
  { slug: "floor-shot-blasting", name: "Floor Shot Blasting" },
  { slug: "fire-escape-shot-blasting", name: "Fire Escape Shot Blasting" },
  { slug: "pipework-shot-blasting", name: "Pipework Shot Blasting" },
  { slug: "agricultural-shot-blasting", name: "Agricultural Shot Blasting" },
  { slug: "telecom-tower-shot-blasting", name: "Telecom Tower Shot Blasting" },
  { slug: "machinery-shot-blasting", name: "Machinery Shot Blasting" },
  { slug: "racking-shot-blasting", name: "Racking Shot Blasting" },
  { slug: "marine-shot-blasting", name: "Marine Shot Blasting" },
  { slug: "heritage-shot-blasting", name: "Heritage Shot Blasting" },
  { slug: "rust-removal", name: "Rust Removal" },
  { slug: "mill-scale-removal", name: "Mill Scale Removal" },
  { slug: "paint-stripping", name: "Paint Stripping" },
  { slug: "coating-removal", name: "Coating Removal" },
  { slug: "surface-preparation", name: "Surface Preparation" },
  { slug: "mobile-shot-blasting", name: "Mobile Shot Blasting" },
];

const INDUSTRY_SLUGS: { slug: string; name: string }[] = [
  { slug: "manufacturing", name: "Manufacturing" },
  { slug: "construction", name: "Construction" },
  { slug: "agriculture", name: "Agriculture" },
  { slug: "aerospace", name: "Aerospace" },
  { slug: "marine", name: "Marine" },
  { slug: "heritage-restoration", name: "Heritage Restoration" },
  { slug: "retail", name: "Retail" },
  { slug: "transport-logistics", name: "Transport & Logistics" },
];

const MAIN_PAGES = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "All Services" },
  { href: "/industries", label: "All Industries" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/counties", label: "Counties" },
  { href: "/our-work", label: "Our Work" },
  { href: "/reviews", label: "Customer Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/prep-and-cleanup", label: "Prep & Cleanup" },
];

// ── Component ──────────────────────────────────────────────────────────────────
export default function SitemapPage() {
  const [query, setQuery] = useState("");

  // Pre-compute grouped data (stable references — no render-phase instability)
  const countiesByRegion = useMemo(() => {
    const map: Record<string, { name: string; slug: string }[]> = {};
    Object.values(countyData).forEach((county) => {
      if (!map[county.region]) map[county.region] = [];
      map[county.region].push({ name: county.name, slug: county.slug });
    });
    return map;
  }, []);

  const townsByCounty = useMemo(() => {
    const map: Record<string, { name: string; slug: string }[]> = {};
    Object.values(locationData).forEach((loc) => {
      if (!map[loc.countySlug]) map[loc.countySlug] = [];
      map[loc.countySlug].push({ name: loc.name, slug: loc.slug });
    });
    return map;
  }, []);

  const sortedRegions = useMemo(
    () => REGION_ORDER.filter((r) => countiesByRegion[r]),
    [countiesByRegion]
  );

  const totalTowns = Object.values(locationData).length;
  const totalCounties = Object.values(countyData).length;

  // ── Search / filter logic ────────────────────────────────────────────────────
  const q = query.trim().toLowerCase();
  const isSearching = q.length >= 2;

  const filteredServices = useMemo(
    () => (isSearching ? SERVICE_SLUGS.filter((s) => s.name.toLowerCase().includes(q)) : SERVICE_SLUGS),
    [q, isSearching]
  );

  const filteredIndustries = useMemo(
    () => (isSearching ? INDUSTRY_SLUGS.filter((s) => s.name.toLowerCase().includes(q)) : INDUSTRY_SLUGS),
    [q, isSearching]
  );

  const filteredMainPages = useMemo(
    () => (isSearching ? MAIN_PAGES.filter((p) => p.label.toLowerCase().includes(q)) : MAIN_PAGES),
    [q, isSearching]
  );

  // For town search: flatten all towns into one list when searching
  const allTownsFlat = useMemo(
    () =>
      Object.values(locationData).map((loc) => ({
        name: loc.name,
        slug: loc.slug,
        county: loc.county,
        countySlug: loc.countySlug,
      })),
    []
  );

  const filteredTowns = useMemo(
    () =>
      isSearching
        ? allTownsFlat
            .filter((t) => t.name.toLowerCase().includes(q) || t.county.toLowerCase().includes(q))
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, 200) // cap at 200 results for performance
        : [],
    [q, isSearching, allTownsFlat]
  );

  const filteredCounties = useMemo(
    () =>
      isSearching
        ? Object.values(countyData).filter(
            (c) => c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q)
          )
        : [],
    [q, isSearching]
  );

  const hasSearchResults =
    filteredMainPages.length > 0 ||
    filteredServices.length > 0 ||
    filteredIndustries.length > 0 ||
    filteredTowns.length > 0 ||
    filteredCounties.length > 0;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-[#1a3d52] text-white py-12">
          <div className="container">
            <nav className="text-sm text-white/60 mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Site Map</span>
            </nav>
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Site Map
            </h1>
            <p className="text-white/80 mb-6">
              Complete directory of all {totalTowns} service area pages, {totalCounties} county pages,{" "}
              {SERVICE_SLUGS.length} services and {INDUSTRY_SLUGS.length} industries.
            </p>

            {/* Search bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search towns, counties, services…"
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-10 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/15 transition"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </section>

        <div className="container py-12">

          {/* ── SEARCH RESULTS ── */}
          {isSearching ? (
            <div>
              <p className="text-sm text-gray-500 mb-8">
                Showing results for <strong>"{query}"</strong>
                {!hasSearchResults && " — no matches found."}
              </p>

              {filteredMainPages.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-xl font-bold text-[#1a3d52] mb-4 pb-2 border-b border-gray-200">
                    Main Pages ({filteredMainPages.length})
                  </h2>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
                    {filteredMainPages.map(({ href, label }) => (
                      <li key={href}>
                        <Link href={href} className="text-[#2C5F7F] hover:underline">{label}</Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {filteredServices.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-xl font-bold text-[#1a3d52] mb-4 pb-2 border-b border-gray-200">
                    Services ({filteredServices.length})
                  </h2>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
                    {filteredServices.map(({ slug, name }) => (
                      <li key={slug}>
                        <Link href={`/services/${slug}`} className="text-[#2C5F7F] hover:underline">{name}</Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {filteredIndustries.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-xl font-bold text-[#1a3d52] mb-4 pb-2 border-b border-gray-200">
                    Industries ({filteredIndustries.length})
                  </h2>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
                    {filteredIndustries.map(({ slug, name }) => (
                      <li key={slug}>
                        <Link href={`/industries/${slug}`} className="text-[#2C5F7F] hover:underline">{name}</Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {filteredCounties.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-xl font-bold text-[#1a3d52] mb-4 pb-2 border-b border-gray-200">
                    Counties ({filteredCounties.length})
                  </h2>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
                    {filteredCounties.map((c) => (
                      <li key={c.slug}>
                        <Link href={`/counties/${c.slug}`} className="text-[#2C5F7F] hover:underline">{c.name}</Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {filteredTowns.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-xl font-bold text-[#1a3d52] mb-4 pb-2 border-b border-gray-200">
                    Towns & Service Areas ({filteredTowns.length}{filteredTowns.length === 200 ? "+" : ""})
                  </h2>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 text-sm">
                    {filteredTowns.map((town) => (
                      <li key={town.slug}>
                        <Link href={`/service-areas/${town.slug}`} className="text-[#2C5F7F] hover:underline text-xs">
                          {town.name}
                          <span className="text-gray-400 ml-1 text-xs">{town.county}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          ) : (
            /* ── FULL DIRECTORY (no search) ── */
            <>
              {/* Static pages */}
              <section className="mb-12">
                <h2 className="text-xl font-bold text-[#1a3d52] mb-4 pb-2 border-b border-gray-200">Main Pages</h2>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
                  {MAIN_PAGES.map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href} className="text-[#2C5F7F] hover:underline">{label}</Link>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Services */}
              <section className="mb-12">
                <h2 className="text-xl font-bold text-[#1a3d52] mb-4 pb-2 border-b border-gray-200">
                  Services ({SERVICE_SLUGS.length})
                </h2>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
                  {SERVICE_SLUGS.map(({ slug, name }) => (
                    <li key={slug}>
                      <Link href={`/services/${slug}`} className="text-[#2C5F7F] hover:underline">{name}</Link>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Industries */}
              <section className="mb-12">
                <h2 className="text-xl font-bold text-[#1a3d52] mb-4 pb-2 border-b border-gray-200">
                  Industries ({INDUSTRY_SLUGS.length})
                </h2>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
                  {INDUSTRY_SLUGS.map(({ slug, name }) => (
                    <li key={slug}>
                      <Link href={`/industries/${slug}`} className="text-[#2C5F7F] hover:underline">{name}</Link>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Counties & Towns grouped by region */}
              <section className="mb-12">
                <h2 className="text-xl font-bold text-[#1a3d52] mb-6 pb-2 border-b border-gray-200">
                  Service Areas by Region ({totalCounties} counties, {totalTowns} towns)
                </h2>
                {sortedRegions.map((region) => {
                  const counties = countiesByRegion[region] || [];
                  return (
                    <div key={region} className="mb-10">
                      <h3 className="text-lg font-semibold text-[#2C2C2C] mb-3">{region}</h3>
                      {counties.map((county) => {
                        const towns = (townsByCounty[county.slug] || []).sort((a, b) =>
                          a.name.localeCompare(b.name)
                        );
                        return (
                          <div key={county.slug} className="mb-6 pl-4 border-l-2 border-[#2C5F7F]/20">
                            <h4 className="font-semibold text-[#1a3d52] mb-2 text-sm">
                              <Link href={`/counties/${county.slug}`} className="hover:underline">
                                {county.name} ({towns.length} locations)
                              </Link>
                            </h4>
                            {towns.length > 0 && (
                              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 text-sm">
                                {towns.map((town) => (
                                  <li key={town.slug}>
                                    <Link
                                      href={`/service-areas/${town.slug}`}
                                      className="text-[#2C5F7F] hover:underline text-xs"
                                    >
                                      {town.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </section>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
