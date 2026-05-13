import { Link } from "wouter";
import { countyData } from "@/data/countyData";
import { locationData } from "@/data/locationData";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Group counties by region
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

export default function SitemapPage() {
  // Group counties by region
  const countiesByRegion: Record<string, { name: string; slug: string }[]> = {};
  Object.values(countyData).forEach((county) => {
    const region = county.region;
    if (!countiesByRegion[region]) countiesByRegion[region] = [];
    countiesByRegion[region].push({ name: county.name, slug: county.slug });
  });

  // Group towns by county
  const townsByCounty: Record<string, { name: string; slug: string; countyName: string }[]> = {};
  Object.values(locationData).forEach((loc) => {
    const key = loc.countySlug;
    if (!townsByCounty[key]) townsByCounty[key] = [];
    townsByCounty[key].push({ name: loc.name, slug: loc.slug, countyName: loc.county });
  });

  // Sort regions by preferred order
  const sortedRegions = REGION_ORDER.filter((r) => countiesByRegion[r]);

  const totalTowns = Object.values(locationData).length;
  const totalCounties = Object.values(countyData).length;

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
            <p className="text-white/80">
              Complete directory of all {totalTowns} service area pages, {totalCounties} county pages, {SERVICE_SLUGS.length} services and {INDUSTRY_SLUGS.length} industries.
            </p>
          </div>
        </section>

        <div className="container py-12">
          {/* Static pages */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[#1a3d52] mb-4 pb-2 border-b border-gray-200">Main Pages</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
              {[
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
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[#2C5F7F] hover:underline">
                    {label}
                  </Link>
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
                  <Link href={`/services/${slug}`} className="text-[#2C5F7F] hover:underline">
                    {name}
                  </Link>
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
                  <Link href={`/industries/${slug}`} className="text-[#2C5F7F] hover:underline">
                    {name}
                  </Link>
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
                    const towns = townsByCounty[county.slug] || [];
                    return (
                      <div key={county.slug} className="mb-6 pl-4 border-l-2 border-[#2C5F7F]/20">
                        <h4 className="font-semibold text-[#1a3d52] mb-2 text-sm">
                          <Link href={`/counties/${county.slug}`} className="hover:underline">
                            {county.name} ({towns.length} locations)
                          </Link>
                        </h4>
                        {towns.length > 0 && (
                          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 text-sm">
                            {towns
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((town) => (
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
