import { useEffect } from 'react';

const SITE_URL = 'https://commercialshotblasting.co.uk';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  /** Explicit canonical URL. Defaults to SITE_URL + window.location.pathname */
  canonical?: string;
}

/**
 * Helper: update or create a <link rel="canonical"> tag in <head>
 */
function setCanonical(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

/**
 * Custom hook to set SEO meta tags (title, description, keywords, OG tags,
 * Twitter cards) AND a canonical link tag.
 *
 * Usage: useSEO({ title: "...", description: "...", keywords: "...", image: "..." })
 */
export function useSEO({ title, description, keywords, image, canonical }: SEOConfig) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Canonical URL: use explicit value or derive from current path (strip trailing slash)
    const canonicalHref =
      canonical ||
      SITE_URL + window.location.pathname.replace(/\/$/, '') || SITE_URL;
    setCanonical(canonicalHref);

    // Helper function to update or create meta tag
    const updateMetaTag = (selector: string, attribute: string, value: string) => {
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement('meta');
        const [attrName, attrValue] = selector.match(/\[(.+?)="(.+?)"\]/)?.slice(1, 3) || [];
        if (attrName && attrValue) {
          meta.setAttribute(attrName, attrValue);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute(attribute, value);
    };

    // Update standard meta tags
    updateMetaTag('meta[name="description"]', 'content', description);
    if (keywords) {
      updateMetaTag('meta[name="keywords"]', 'content', keywords);
    }

    // Update Open Graph tags — og:url always uses the canonical href
    updateMetaTag('meta[property="og:title"]', 'content', title);
    updateMetaTag('meta[property="og:description"]', 'content', description);
    updateMetaTag('meta[property="og:url"]', 'content', canonicalHref);
    if (image) {
      updateMetaTag('meta[property="og:image"]', 'content', image);
    }

    // Update Twitter Card tags
    updateMetaTag('meta[name="twitter:title"]', 'content', title);
    updateMetaTag('meta[name="twitter:description"]', 'content', description);
    if (image) {
      updateMetaTag('meta[name="twitter:image"]', 'content', image);
    }
  }, [title, description, keywords, image, canonical]);
}

/**
 * Generate SEO config for service pages
 */
export function getServiceSEO(serviceName: string, serviceDescription: string): SEOConfig {
  return {
    title: `${serviceName} Shot Blasting Services UK | Commercial Shot Blasting`,
    description: `Professional ${serviceName.toLowerCase()} shot blasting services across the UK. ${serviceDescription.substring(0, 100)}... Free quote. Call 07970 566409.`,
    keywords: `${serviceName.toLowerCase()} shot blasting, ${serviceName.toLowerCase()} shot blasting services, commercial ${serviceName.toLowerCase()}, industrial ${serviceName.toLowerCase()}, shot blasting UK`,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/nSiMtaICoFPZGPZV.png"
  };
}

/**
 * Generate SEO config for location pages
 */
export function getLocationSEO(locationName: string, slug?: string, county?: string): SEOConfig {
  const countyStr = county ? `, ${county}` : '';
  return {
    title: `Shot Blasting ${locationName}${countyStr} | Mobile Rust Removal & Surface Prep`,
    description: `Shot blasting in ${locationName}${countyStr} — 9 mobile units, SA2.5/SA3 standard, same-week availability. Structural steel, cladding, containers, floors & more. Free quote: 07970 566409`,
    keywords: `shot blasting ${locationName}, ${locationName} shot blasting, mobile shot blasting ${locationName}, rust removal ${locationName}, surface preparation ${locationName}, commercial shot blasting ${locationName}${county ? `, shot blasting ${county}` : ''}`,
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
    description: `Professional commercial shot blasting services across ${countyName}. Covering all major towns and cities with expert surface preparation. Free quotes available.`,
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
