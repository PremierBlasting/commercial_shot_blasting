import { getPriorityLocalNearMeMetadata } from '@shared/priorityLocalNearMePilot';
import type { RouteMetadataInput } from '@shared/routeMetadata';
import { useRouteMetadataInput, type MetadataRouteKey } from '@/components/RouteMetadataOwner';

const SITE_URL = 'https://commercialshotblasting.co.uk';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  canonical?: string;
  robots?: string;
}

/** Legacy static inputs are compatibility-only; the pure resolver is the default
 * source. Only explicit route-keyed dynamic inputs may publish to the owner.
 * The owner captures navigation generation in the source render and rejects
 * stale effects rather than assigning an outgoing input to the new destination.
 */
export function useSEO(config: SEOConfig | RouteMetadataInput, key?: Partial<MetadataRouteKey>) {
  useRouteMetadataInput(key?.pathname ? config as RouteMetadataInput : undefined, key?.pathname, key?.generation);
}

/**
 * Generate SEO config for service pages
 */
export function getServiceSEO(serviceName: string, serviceDescription: string): SEOConfig {
  const isRustRemoval = serviceName.toLowerCase() === "rust removal";
  return {
    title: isRustRemoval
      ? "Commercial Rust Removal & Metal Shot Blasting | Nationwide"
      : `${serviceName} | Commercial Surface Preparation | Nationwide`,
    description: isRustRemoval
      ? "Commercial rust removal and metal shot blasting nationwide for structural steel, plant, cladding, containers and industrial assets. Request A Site Visit."
      : `Commercial ${serviceName.toLowerCase()} nationwide. ${serviceDescription.substring(0, 100)}... Request A Site Visit.`,
    keywords: isRustRemoval
      ? "commercial rust removal, metal shot blasting, rust removal near me, commercial metal surface preparation, mobile rust removal, industrial rust removal"
      : `${serviceName.toLowerCase()} shot blasting, ${serviceName.toLowerCase()} shot blasting services, commercial ${serviceName.toLowerCase()}, industrial ${serviceName.toLowerCase()}, commercial surface preparation`,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/nSiMtaICoFPZGPZV.png"
  };
}

/**
 * Generate SEO config for location pages
 */
export function getLocationSEO(locationName: string, slug?: string, county?: string): SEOConfig {
  const countyStr = county ? `, ${county}` : '';
  const pilotMeta = slug ? getPriorityLocalNearMeMetadata(slug, locationName) : undefined;
  return {
    title: pilotMeta?.title ?? `Shot Blasting & Sandblasting in ${locationName}${countyStr} | Commercial Surface Preparation`,
    description: pilotMeta?.description ?? `Commercial shot blasting and sandblasting in ${locationName}${countyStr} for metal surface preparation, rust removal, structural steel, cladding, containers, plant and coating handover. Request A Site Visit.`,
    keywords: `shot blasting ${locationName}, sandblasting ${locationName}, sand blasting ${locationName}, ${locationName} shot blasting, mobile shot blasting ${locationName}, rust removal ${locationName}, surface preparation ${locationName}, commercial shot blasting ${locationName}${county ? `, shot blasting ${county}` : ''}`,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/nSiMtaICoFPZGPZV.png",
    canonical: slug ? `${SITE_URL}/service-areas/${slug}` : undefined
  };
}

/**
 * Generate SEO config for county pages
 */
export function getCountySEO(countyName: string, slug?: string): SEOConfig {
  return {
    title: `Shot Blasting ${countyName} | Commercial Services Across the County`,
    description: `Professional commercial shot blasting services across ${countyName}. Covering all major towns and cities with expert surface preparation. Site visits available.`,
    keywords: `shot blasting ${countyName}, ${countyName} shot blasting services, commercial blasting ${countyName}, industrial shot blasting`,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/nSiMtaICoFPZGPZV.png",
    canonical: slug ? `${SITE_URL}/counties/${slug}` : undefined
  };
}

/**
 * Generate SEO config for industry pages
 */
export function getIndustrySEO(industryName: string, industryDescription: string, slug?: string): SEOConfig {
  return {
    title: `${industryName} Shot Blasting Services | Specialist Surface Preparation`,
    description: `${industryDescription.substring(0, 130)}... Expert commercial services.`,
    keywords: `${industryName.toLowerCase()} shot blasting, ${industryName.toLowerCase()} surface preparation, commercial blasting, industrial services`,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/nSiMtaICoFPZGPZV.png",
    canonical: slug ? `${SITE_URL}/industries/${slug}` : undefined
  };
}

/**
 * Generate SEO config for blog posts
 */
export function getBlogPostSEO(postTitle: string, excerpt: string, featuredImage?: string, slug?: string): SEOConfig {
  return {
    title: `${postTitle} | Commercial Shot Blasting Blog`,
    description: excerpt.substring(0, 155) + (excerpt.length > 155 ? '...' : ''),
    keywords: 'shot blasting, surface preparation, industrial cleaning, commercial services, blasting techniques',
    image: featuredImage || "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/nSiMtaICoFPZGPZV.png",
    canonical: slug ? `${SITE_URL}/blog/${slug}` : undefined
  };
}

/**
 * Generate SEO config for static pages
 */
export function getStaticPageSEO(pageName: string, description: string, path?: string): SEOConfig {
  return {
    title: `${pageName} | Commercial Shot Blasting`,
    description,
    keywords: 'commercial shot blasting, industrial blasting, surface preparation, UK services',
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/nSiMtaICoFPZGPZV.png",
    canonical: path ? `${SITE_URL}${path}` : undefined
  };
}
