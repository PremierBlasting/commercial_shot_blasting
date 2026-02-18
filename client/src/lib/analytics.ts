/**
 * Google Analytics Event Tracking Utility
 * Provides functions to track various user interactions with UTM attribution
 */

import { getUTMData, getFirstTouchUTM, type UTMData } from './utm';

// Declare gtag as a global function
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js',
      action: string,
      params?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

/**
 * Get UTM attribution data to include in events
 */
function getAttributionParams(): Record<string, string | undefined> {
  const lastTouch = getUTMData();
  const firstTouch = getFirstTouchUTM();
  
  return {
    // Last-touch attribution (most recent campaign)
    utm_source: lastTouch?.utm_source,
    utm_medium: lastTouch?.utm_medium,
    utm_campaign: lastTouch?.utm_campaign,
    utm_term: lastTouch?.utm_term,
    utm_content: lastTouch?.utm_content,
    // First-touch attribution (original campaign)
    first_touch_source: firstTouch?.utm_source,
    first_touch_medium: firstTouch?.utm_medium,
    first_touch_campaign: firstTouch?.utm_campaign,
    // Additional tracking IDs
    gclid: lastTouch?.gclid,
    fbclid: lastTouch?.fbclid,
    msclkid: lastTouch?.msclkid,
    // Landing page info
    landing_page: lastTouch?.landing_page,
    referrer: lastTouch?.referrer,
  };
}

/**
 * Track a custom event in Google Analytics with UTM attribution
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, any>
) {
  if (typeof window !== 'undefined' && window.gtag) {
    const attribution = getAttributionParams();
    
    // Filter out undefined values
    const cleanAttribution = Object.fromEntries(
      Object.entries(attribution).filter(([_, v]) => v !== undefined)
    );
    
    window.gtag('event', eventName, {
      ...cleanAttribution,
      ...params,
    });
  }
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName: string, formLocation?: string) {
  trackEvent('form_submission', {
    event_category: 'Form',
    event_label: formName,
    form_name: formName,
    form_location: formLocation || window.location.pathname,
  });
}

/**
 * Track phone call click
 */
export function trackPhoneCall(phoneNumber: string, location?: string) {
  trackEvent('phone_call', {
    event_category: 'Contact',
    event_label: phoneNumber,
    phone_number: phoneNumber,
    click_location: location || window.location.pathname,
  });
}

/**
 * Track quote request (when quote popup opens)
 */
export function trackQuoteRequest(source?: string) {
  trackEvent('quote_request', {
    event_category: 'Lead',
    event_label: source || 'Quote Button',
    request_source: source || window.location.pathname,
  });
}

/**
 * Track quote form submission
 */
export function trackQuoteFormSubmission() {
  trackEvent('generate_lead', {
    event_category: 'Lead',
    event_label: 'Quote Form Submitted',
    currency: 'GBP',
  });
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(buttonName: string, destination?: string) {
  trackEvent('cta_click', {
    event_category: 'Engagement',
    event_label: buttonName,
    button_name: buttonName,
    destination: destination,
  });
}

/**
 * Track page view (useful for SPA navigation)
 */
export function trackPageView(pagePath: string, pageTitle?: string) {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle || document.title,
  });
}
