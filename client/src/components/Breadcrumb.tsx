import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb component for navigation and SEO
 * Includes JSON-LD schema markup for search engines
 * 
 * Usage:
 * <Breadcrumb items={[
 *   { label: "Home", href: "/" },
 *   { label: "Areas", href: "/service-areas" },
 *   { label: "West Midlands", href: "/service-areas" },
 *   { label: "Birmingham", href: "/service-areas/birmingham", isCurrentPage: true }
 * ]} />
 */
export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  // Generate JSON-LD schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `${typeof window !== 'undefined' ? window.location.origin : ''}${item.href}`
    }))
  };

  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>

      {/* Breadcrumb Navigation */}
      <nav 
        aria-label="Breadcrumb"
        className={`py-3 px-4 bg-white/50 rounded-lg border border-gray-200 ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {item.isCurrentPage ? (
                <>
                  {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
                  <span 
                    className="text-gray-600 font-medium"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                </>
              ) : (
                <>
                  {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
                  <Link
                    href={item.href}
                    className="text-[#2C5F7F] hover:text-[#1a3d52] hover:underline transition-colors"
                  >
                    {item.label}
                  </Link>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
