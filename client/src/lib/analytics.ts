/**
 * Google Analytics Event Tracking Utility
 * Provides functions to track various user interactions with UTM attribution
 */

import { getUTMData, getFirstTouchUTM, type UTMData } from './utm';
import { GOOGLE_ADS_ID, GOOGLE_ADS_LEAD_LABEL, GOOGLE_ADS_PHONE_LABEL } from '../components/GoogleAnalytics';

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
 * Fire a Google Ads conversion event for form submissions.
 * Uses the "CSB - Website Lead Form" conversion action (ID: 7699104407).
 */
function fireGoogleAdsLeadConversion() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`,
      value: 1.0,
      currency: 'GBP',
    });
  }
}

/**
 * Fire a Google Ads conversion event for phone call clicks.
 * Uses the "CSB - Phone Call Click" conversion action (ID: 7699427211).
 * Reported separately from form submissions in Google Ads.
 */
function fireGoogleAdsPhoneConversion() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_PHONE_LABEL}`,
      value: 1.0,
      currency: 'GBP',
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
  // Fire Google Ads conversion event — CSB - Website Lead Form
  fireGoogleAdsLeadConversion();
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
  // Fire Google Ads conversion event — CSB - Phone Call Click (separate from form submissions)
  fireGoogleAdsPhoneConversion();
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
  // Fire Google Ads conversion event — CSB - Website Lead Form
  fireGoogleAdsLeadConversion();
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
 * Track navigation from a content card to a published case study. This is an
 * engagement-only event and deliberately does not fire a Google Ads conversion.
 */
export function trackCaseStudyCardClick(caseStudy: string, placement: string, destination: string) {
  trackEvent('case_study_card_click', {
    event_category: 'Content engagement',
    event_label: caseStudy,
    case_study: caseStudy,
    placement,
    destination,
  });
}

/**
 * Track interest in the approved capability statement without treating a
 * document download as a lead or firing a Google Ads conversion.
 */
export function trackCapabilityStatementDownload(placement: string) {
  trackEvent('capability_statement_download', {
    event_category: 'Document',
    event_label: 'Commercial Capability Statement',
    document_name: 'Commercial Capability Statement',
    document_type: 'pdf',
    placement,
  });
}

/**
 * Track when a visitor opens the on-page document preview. This is an
 * engagement signal only and intentionally does not fire a lead conversion.
 */
export function trackCapabilityStatementPreview(placement: string) {
  trackEvent('capability_statement_preview', {
    event_category: 'Document',
    event_label: 'Commercial Capability Statement preview',
    document_name: 'Commercial Capability Statement',
    document_type: 'pdf',
    placement,
  });
}

/** Track visitor-initiated sharing of the capability statement without firing a lead conversion. */
export function trackCapabilityStatementShare(placement: string, shareMethod: 'native' | 'clipboard') {
  trackEvent('capability_statement_share', {
    event_category: 'Document',
    event_label: 'Commercial Capability Statement share',
    document_name: 'Commercial Capability Statement',
    document_type: 'pdf',
    placement,
    share_method: shareMethod,
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
