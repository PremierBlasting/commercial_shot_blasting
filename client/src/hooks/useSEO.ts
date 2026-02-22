import { useEffect } from 'react';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
}

/**
 * Custom hook to set SEO meta tags (title, description, keywords, OG tags, Twitter cards)
 * Usage: useSEO({ title: "...", description: "...", keywords: "...", image: "..." })
 */
export function useSEO({ title, description, keywords, image }: SEOConfig) {
  useEffect(() => {
    // Set document title
    document.title = title;

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

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', 'content', title);
    updateMetaTag('meta[property="og:description"]', 'content', description);
    updateMetaTag('meta[property="og:url"]', 'content', window.location.href);
    if (image) {
      updateMetaTag('meta[property="og:image"]', 'content', image);
    }

    // Update Twitter Card tags
    updateMetaTag('meta[name="twitter:title"]', 'content', title);
    updateMetaTag('meta[name="twitter:description"]', 'content', description);
    if (image) {
      updateMetaTag('meta[name="twitter:image"]', 'content', image);
    }
  }, [title, description, keywords, image]);
}

/**
 * Generate SEO config for service pages
 */
export function getServiceSEO(serviceName: string, serviceDescription: string): SEOConfig {
  return {
    title: `${serviceName} Services UK | Commercial Shot Blasting`,
    description: `${serviceDescription.substring(0, 140)}... Get a free quote today.`,
    keywords: `${serviceName.toLowerCase()}, commercial ${serviceName.toLowerCase()}, industrial ${serviceName.toLowerCase()}, shot blasting, UK services`,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png"
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
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png"
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
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png"
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
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png"
  };
}

/**
 * Generate SEO config for blog posts
 */
export function getBlogPostSEO(postTitle: string, excerpt: string, featuredImage?: string): SEOConfig {
  return {
    title: `${postTitle} | Commercial Shot Blasting Blog`,
    description: excerpt.substring(0, 155) + (excerpt.length > 155 ? '...' : ''),
    keywords: 'shot blasting, surface preparation, industrial cleaning, commercial services, blasting techniques',
    image: featuredImage || "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png"
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
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png"
  };
}
