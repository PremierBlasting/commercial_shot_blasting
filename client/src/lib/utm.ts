/**
 * UTM Parameter Tracking Utility
 * Captures, stores, and retrieves UTM parameters for marketing attribution
 */

// UTM parameter names
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

// Additional tracking parameters
const TRACKING_PARAMS = ['gclid', 'fbclid', 'msclkid', 'ref'] as const;

// Storage key for UTM data
const UTM_STORAGE_KEY = 'csb_utm_data';
const FIRST_TOUCH_KEY = 'csb_first_touch';
const SESSION_KEY = 'csb_session_data';

export interface UTMData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  ref?: string;
  landing_page?: string;
  referrer?: string;
  timestamp?: string;
}

/**
 * Parse UTM parameters from URL
 */
export function parseUTMFromURL(): UTMData {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  const utmData: UTMData = {};
  
  // Capture UTM parameters
  UTM_PARAMS.forEach(param => {
    const value = params.get(param);
    if (value) {
      utmData[param] = value;
    }
  });
  
  // Capture additional tracking parameters
  TRACKING_PARAMS.forEach(param => {
    const value = params.get(param);
    if (value) {
      utmData[param as keyof UTMData] = value;
    }
  });
  
  return utmData;
}

/**
 * Store UTM data in localStorage (last-touch attribution)
 */
export function storeUTMData(data: UTMData): void {
  if (typeof window === 'undefined' || Object.keys(data).length === 0) return;
  
  const enrichedData: UTMData = {
    ...data,
    landing_page: window.location.pathname,
    referrer: document.referrer || undefined,
    timestamp: new Date().toISOString(),
  };
  
  // Store as last-touch (overwrites previous)
  localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(enrichedData));
  
  // Store first-touch only if not already set
  if (!localStorage.getItem(FIRST_TOUCH_KEY)) {
    localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(enrichedData));
  }
  
  // Store in session storage for current session attribution
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(enrichedData));
}

/**
 * Get stored UTM data (last-touch)
 */
export function getUTMData(): UTMData | null {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem(UTM_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Get first-touch UTM data
 */
export function getFirstTouchUTM(): UTMData | null {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem(FIRST_TOUCH_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Get current session UTM data
 */
export function getSessionUTM(): UTMData | null {
  if (typeof window === 'undefined') return null;
  
  const stored = sessionStorage.getItem(SESSION_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Initialize UTM tracking - call this on app load
 */
export function initUTMTracking(): void {
  const utmData = parseUTMFromURL();
  
  // Only store if we have UTM parameters
  if (Object.keys(utmData).length > 0) {
    storeUTMData(utmData);
  } else if (!getSessionUTM()) {
    // If no UTM params but no session data, store referrer info
    const referrerData: UTMData = {
      landing_page: window.location.pathname,
      referrer: document.referrer || undefined,
      timestamp: new Date().toISOString(),
    };
    
    // Detect organic search
    if (document.referrer) {
      const referrerUrl = new URL(document.referrer);
      const searchEngines = ['google', 'bing', 'yahoo', 'duckduckgo', 'baidu'];
      const isOrganic = searchEngines.some(engine => referrerUrl.hostname.includes(engine));
      
      if (isOrganic) {
        referrerData.utm_source = referrerUrl.hostname.replace('www.', '').split('.')[0];
        referrerData.utm_medium = 'organic';
      }
    }
    
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(referrerData));
  }
}

/**
 * Get attribution data for conversions (combines first-touch and last-touch)
 */
export function getAttributionData(): {
  firstTouch: UTMData | null;
  lastTouch: UTMData | null;
  session: UTMData | null;
} {
  return {
    firstTouch: getFirstTouchUTM(),
    lastTouch: getUTMData(),
    session: getSessionUTM(),
  };
}

/**
 * Format UTM data for form submission or API calls
 */
export function formatUTMForSubmission(): Record<string, string> {
  const lastTouch = getUTMData();
  const firstTouch = getFirstTouchUTM();
  
  const result: Record<string, string> = {};
  
  // Add last-touch data with prefix
  if (lastTouch) {
    Object.entries(lastTouch).forEach(([key, value]) => {
      if (value) {
        result[`lt_${key}`] = value;
      }
    });
  }
  
  // Add first-touch data with prefix
  if (firstTouch) {
    Object.entries(firstTouch).forEach(([key, value]) => {
      if (value) {
        result[`ft_${key}`] = value;
      }
    });
  }
  
  return result;
}

/**
 * Clear all UTM data (useful for testing)
 */
export function clearUTMData(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(UTM_STORAGE_KEY);
  localStorage.removeItem(FIRST_TOUCH_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}
