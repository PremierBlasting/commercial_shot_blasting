import { useEffect } from 'react';
import { getPriorityLocalNearMeMetadata } from '@shared/priorityLocalNearMePilot';
import { getPageIndexingPath, getPageRobotsDirective } from '@shared/pageIndexingPolicy';

const SITE_URL = 'https://commercialshotblasting.co.uk';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  /** Explicit canonical URL. Defaults to SITE_URL + window.location.pathname */
  canonical?: string;
  /** Explicit page directive; known destination restrictions remain authoritative. */
  robots?: string;
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

type RobotsOwner = { pathname: string | undefined; directive: string | undefined };
const robotsLifecycles = new WeakMap<Window, { owner?: RobotsOwner; reconcile: () => void }>();

/** Keep one generic robots tag, including when the entry HTML contained duplicates. */
function setRobots(directive: string | undefined) {
  const tags = Array.from(document.querySelectorAll<HTMLMetaElement>('meta[name="robots"]'));
  if (!directive) {
    tags.forEach(tag => tag.remove());
    return;
  }
  const meta = tags.shift() ?? document.createElement('meta');
  meta.setAttribute('name', 'robots');
  meta.setAttribute('content', directive);
  if (!meta.parentNode) document.head.appendChild(meta);
  tags.forEach(tag => tag.remove());
}

/** Wouter already emits these history events. Listen without wrapping navigation,
 * changing attribution parameters, or changing the route-ready/measurement owner.
 * This document-lifetime listener also covers Home (which does not use this hook).
 */
function getRobotsLifecycle() {
  let lifecycle = robotsLifecycles.get(window);
  if (!lifecycle) {
    lifecycle = {
      reconcile: () => {
        const pathname = getPageIndexingPath(window.location.pathname);
        const directive = getPageRobotsDirective(window.location.pathname);
        // A hook's explicit/fallback directive belongs only to its own route.
        // Unknown destinations are left to their content owner, never labelled
        // published/deleted by a pathname-only lookup or by the preceding page.
        const owner = lifecycle?.owner;
        setRobots(directive ?? (owner && owner.pathname === pathname ? owner.directive : undefined));
      },
    };
    robotsLifecycles.set(window, lifecycle);
    for (const event of ['popstate', 'pushState', 'replaceState', 'hashchange']) {
      window.addEventListener(event, lifecycle.reconcile);
    }
  }
  return lifecycle;
}

/**
 * Custom hook to set SEO meta tags (title, description, keywords, OG tags,
 * Twitter cards), a canonical link and one destination-specific robots tag.
 *
 * Usage: useSEO({ title: "...", description: "...", keywords: "...", image: "..." })
 */
export function useSEO({ title, description, keywords, image, canonical, robots }: SEOConfig) {
  const renderedPathname = typeof window === 'undefined' ? undefined : window.location.pathname;
  useEffect(() => {
    const lifecycle = getRobotsLifecycle();
    const owner: RobotsOwner = {
      pathname: renderedPathname ? getPageIndexingPath(renderedPathname) : undefined,
      directive: (renderedPathname ? getPageRobotsDirective(renderedPathname) : undefined) ?? robots,
    };
    lifecycle.owner = owner;
    lifecycle.reconcile();
    const cleanup = () => {
      // Never restore a captured previous robots snapshot: the URL may already
      // be another town, a service, Home or an internal/legal destination.
      if (lifecycle.owner === owner) lifecycle.owner = undefined;
      lifecycle.reconcile();
      // Reconcile once more after this commit's other effect cleanups/setups.
      // Read the current URL/owner then, not a captured outgoing directive.
      queueMicrotask(lifecycle.reconcile);
    };
    // A child's Redirect can run before this passive effect. Its destination
    // must not receive the outgoing shell's explicit robots or visible metadata.
    if (window.location.pathname !== renderedPathname) return cleanup;

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
    return cleanup;
  }, [title, description, keywords, image, canonical, robots, renderedPathname]);
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
