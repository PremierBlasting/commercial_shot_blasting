import { useEffect } from 'react';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
}

/**
 * Custom hook to set SEO meta tags (title, description, keywords)
 * Usage: useSEO({ title: "...", description: "...", keywords: "..." })
 */
export function useSEO({ title, description, keywords }: SEOConfig) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update or create meta keywords (if provided)
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }
  }, [title, description, keywords]);
}

/**
 * Generate SEO config for service pages
 */
export function getServiceSEO(serviceName: string, serviceDescription: string): SEOConfig {
  return {
    title: `${serviceName} Services UK | Commercial Shot Blasting`,
    description: `${serviceDescription.substring(0, 140)}... Get a free quote today.`,
    keywords: `${serviceName.toLowerCase()}, commercial ${serviceName.toLowerCase()}, industrial ${serviceName.toLowerCase()}, shot blasting, UK services`,
  };
}

/**
 * Generate SEO config for location pages
 */
export function getLocationSEO(locationName: string): SEOConfig {
  return {
    title: `Shot Blasting ${locationName} | Commercial & Industrial Services`,
    description: `Professional shot blasting services in ${locationName}. Expert surface preparation for commercial and industrial projects. Free quotes and site surveys available.`,
    keywords: `shot blasting ${locationName}, ${locationName} shot blasting, commercial shot blasting ${locationName}, industrial blasting ${locationName}`,
  };
}

/**
 * Generate SEO config for county pages
 */
export function getCountySEO(countyName: string): SEOConfig {
  return {
    title: `Shot Blasting ${countyName} | Commercial Services Across the County`,
    description: `Professional commercial shot blasting services across ${countyName}. Covering all major towns and cities with expert surface preparation. Free quotes available.`,
    keywords: `shot blasting ${countyName}, ${countyName} shot blasting services, commercial blasting ${countyName}, industrial shot blasting`,
  };
}

/**
 * Generate SEO config for industry pages
 */
export function getIndustrySEO(industryName: string, industryDescription: string): SEOConfig {
  return {
    title: `${industryName} Shot Blasting Services | Specialist Surface Preparation`,
    description: `${industryDescription.substring(0, 130)}... Expert commercial services.`,
    keywords: `${industryName.toLowerCase()} shot blasting, ${industryName.toLowerCase()} surface preparation, commercial blasting, industrial services`,
  };
}

/**
 * Generate SEO config for blog posts
 */
export function getBlogPostSEO(postTitle: string, excerpt: string): SEOConfig {
  return {
    title: `${postTitle} | Commercial Shot Blasting Blog`,
    description: excerpt.substring(0, 155) + (excerpt.length > 155 ? '...' : ''),
    keywords: 'shot blasting, surface preparation, industrial cleaning, commercial services, blasting techniques',
  };
}

/**
 * Generate SEO config for static pages
 */
export function getStaticPageSEO(pageName: string, description: string): SEOConfig {
  return {
    title: `${pageName} | Commercial Shot Blasting`,
    description,
    keywords: 'commercial shot blasting, industrial blasting, surface preparation, UK services',
  };
}
