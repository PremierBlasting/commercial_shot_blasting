import { useState } from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { QuotePopup } from "@/components/QuotePopup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";
import { countyData } from "@/data/countyData";
import { locationData } from "@/data/locationData";
import { useSEO } from "@/hooks/useSEO";


// Region order and colour palette
const regionOrder = [
  "All",
  "West Midlands",
  "East Midlands",
  "Yorkshire",
  "North West",
  "East of England",
  "South West",
  "Wales Borders",
];

const regionColours: Record<string, string> = {
  "West Midlands": "#2C5F7F",
  "East Midlands": "#3a7d5e",
  "Yorkshire": "#7d3a3a",
  "North West": "#5a3a7d",
  "East of England": "#7d6a3a",
  "South West": "#3a6a7d",
  "Wales Borders": "#3a7d4a",
};

const allCounties = Object.values(countyData).sort((a, b) =>
  a.name.localeCompare(b.name)
);

// Pre-compute town count per county slug (outside component for stable reference)
const townCountByCounty: Record<string, number> = Object.values(locationData).reduce<Record<string, number>>(
  (acc, loc) => {
    acc[loc.countySlug] = (acc[loc.countySlug] ?? 0) + 1;
    return acc;
  },
  {}
);

const countiesByRegion = regionOrder.slice(1).reduce<Record<string, typeof allCounties>>(
  (acc, region) => {
    acc[region] = allCounties.filter((c) => c.region === region);
    return acc;
  },
  {}
);

export default function Counties() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState("All");

  useSEO({
    title: "Shot Blasting Services by County | Commercial Shot Blasting",
    description:
      "Browse our shot blasting services by county. We cover 25 counties across the Midlands, Yorkshire, North West, East of England, South West, and Wales Borders.",
    canonical: "https://commercialshotblasting.co.uk/counties",
  });

  const totalCounties = allCounties.length;

  // Counties to display based on active filter
  const displayRegions =
    activeRegion === "All"
      ? regionOrder.slice(1)
      : [activeRegion];

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Counties", href: "/counties", isCurrentPage: true },
        ]}
        className="container mt-6"
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920')",
          }}
        />
        <div className="container relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="w-8 h-8 text-[#E8B84A]" />
            <span className="text-[#E8B84A] font-semibold text-lg uppercase tracking-wide">
              Service Coverage
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Shot Blasting by County
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            We provide professional mobile shot blasting services across{" "}
            <strong>{totalCounties} counties</strong> in the UK.
            Select your county below to find out more about our services in your
            area.
          </p>
          <Button
            size="lg"
            className="bg-white text-[#2C5F7F] hover:bg-gray-100"
            onClick={() => setQuotePopupOpen(true)}
          >
            Request A Site Visit
          </Button>
        </div>
      </section>

      {/* Counties by Region */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-[#2C5F7F] font-medium mb-2 uppercase tracking-wide">
              Coverage Area
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Find Your County
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Click on your county to see specific service information, local
              towns we cover, and frequently asked questions.
            </p>
          </div>

          {/* Region filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {regionOrder.map((region) => {
              const isActive = activeRegion === region;
              const colour = region === "All" ? "#2C5F7F" : (regionColours[region] || "#2C5F7F");
              const count = region === "All" ? totalCounties : (countiesByRegion[region]?.length ?? 0);
              return (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 ${
                    isActive
                      ? "text-white shadow-md"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-800"
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: colour, borderColor: colour }
                      : {}
                  }
                >
                  {region}
                  <span
                    className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/25" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* County grid */}
          <div className="space-y-12">
            {displayRegions.map((region) => {
              const counties = countiesByRegion[region];
              if (!counties || counties.length === 0) return null;
              const colour = regionColours[region] || "#2C5F7F";
              return (
                <div key={region}>
                  {/* Region heading — only show when "All" is active */}
                  {activeRegion === "All" && (
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-1 h-8 rounded-full flex-shrink-0"
                        style={{ backgroundColor: colour }}
                      />
                      <h3
                        className="text-2xl font-bold"
                        style={{ color: colour, fontFamily: "'Playfair Display', serif" }}
                      >
                        {region}
                      </h3>
                      <div className="flex-1 h-px bg-gray-200" />
                      <span className="text-sm text-gray-500 flex-shrink-0">
                        {counties.length} {counties.length === 1 ? "county" : "counties"}
                      </span>
                    </div>
                  )}

                  {/* County cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {counties.map((county) => (
                      <Link key={county.slug} href={`/counties/${county.slug}`}>
                        <Card
                          className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer group border-l-4"
                          style={{ borderLeftColor: colour }}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg group-hover:text-[#2C5F7F] transition-colors flex items-center justify-between">
                              {county.name}
                              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#2C5F7F]" />
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-500 mb-2">
                              {county.majorTowns.slice(0, 3).join(", ")}
                              {county.majorTowns.length > 3 ? " & more" : ""}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-[#2C5F7F]">
                                View services →
                              </span>
                              {(townCountByCounty[county.slug] ?? 0) > 0 && (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold bg-[#2C5F7F]/10 text-[#2C5F7F] rounded-full px-2 py-0.5">
                                  <MapPin className="w-3 h-3" />
                                  {townCountByCounty[county.slug]} towns
                                </span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Site Map Link */}
      <section className="py-5 bg-white border-t border-gray-100">
        <div className="container text-center">
          <p className="text-sm text-gray-500">
            Looking for a complete list of all towns and service areas?{" "}
            <Link href="/sitemap" className="text-[#2C5F7F] hover:underline font-medium">
              View the full site map
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#2C5F7F] text-white">
        <div className="container text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Can't Find Your County?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            We may still be able to help. Contact us to discuss your location
            and project requirements — we regularly travel outside our listed
            coverage areas for larger projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#2C5F7F] hover:bg-gray-100"
              onClick={() => setQuotePopupOpen(true)}
            >
              Request A Site Visit
            </Button>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
