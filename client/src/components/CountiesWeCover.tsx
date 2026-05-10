import { Link } from "wouter";
import { MapPin, ArrowRight } from "lucide-react";
import { countyData } from "@/data/countyData";

interface CountiesWeCoverProps {
  /** Industry label to filter counties by (e.g. "Manufacturing", "Aerospace") */
  industry: string;
  /** Heading override — defaults to "Counties We Cover for [industry] Shot Blasting" */
  heading?: string;
}

/**
 * Displays a grid of counties that list the given industry in their `industries` array.
 * Falls back to showing all counties if fewer than 4 match.
 */
export function CountiesWeCover({ industry, heading }: CountiesWeCoverProps) {
  const allCounties = Object.values(countyData);

  // Filter counties whose industries array includes this industry (case-insensitive partial match)
  let matched = allCounties.filter((c) =>
    c.industries.some((ind) => ind.toLowerCase().includes(industry.toLowerCase()))
  );

  // Fallback: if too few matches, show all counties sorted alphabetically
  if (matched.length < 4) {
    matched = allCounties;
  }

  // Sort alphabetically by name
  matched = matched.sort((a, b) => a.name.localeCompare(b.name));

  const title = heading ?? `Counties We Cover for ${industry} Shot Blasting`;

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-[#2C5F7F] font-medium mb-2">UK-Wide Coverage</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#2C2C2C]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Our mobile shot blasting units operate across England and Wales. Select your county to
            see local service details, coverage towns, and get a free quote.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-10">
          {matched.map((county) => (
            <Link
              key={county.slug}
              href={county.url.replace("https://commercialshotblasting.co.uk", "")}
              className="group flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-[#2C5F7F] hover:shadow-md transition-all"
            >
              <MapPin className="w-4 h-4 text-[#2C5F7F] flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#2C5F7F] transition-colors truncate">
                {county.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-2 bg-[#2C5F7F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1e4159] transition-colors"
          >
            View All Service Areas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
