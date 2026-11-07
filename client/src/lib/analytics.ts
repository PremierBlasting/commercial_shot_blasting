/** Existing analytics API, now consent-aware; embedded HubSpot forms stay embedded. */
import { getUTMData, getFirstTouchUTM } from './utm';
import { dispatchGoogleEvent, dispatchHubSpotLeadConversion, dispatchPageView, measurementPagePath } from './googleMeasurement';
import { claimContactClick, isCSBPhone } from './contactClickTracking';
import { CSB_PHONE } from '@shared/googleMeasurement';

/** Never forward enquiry fields, raw query strings or arbitrary telephone numbers. */
function safeEventParams(params: Record<string, unknown>): Record<string, unknown> {
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    if (/^(?:name|email|email_address|phone|postcode|postal_code|message|user_data|user_id|send_to|transaction_id)$/i.test(key)) continue;
    if (key === 'phone_number' && (typeof value !== 'string' || !isCSBPhone(value))) continue;
    if (value === undefined || value === null) continue;
    if (typeof value === 'string') {
      let safe = value;
      if (/^(?:landing_page|page_path|page_location|destination|form_location|click_location|request_source)$/.test(key) && (/^[a-z]+:/i.test(value) || value.startsWith('/'))) {
        try { const url = new URL(value, window.location.origin); safe = url.origin === window.location.origin ? url.pathname : url.origin + url.pathname; } catch { continue; }
      } else if (key === 'referrer') {
        try { safe = new URL(value).hostname; } catch { continue; }
      }
      if (/@|[+]?\d[\d ()-]{8,}\d/.test(safe) && !(key === 'phone_number' || (key === 'event_label' && isCSBPhone(safe)))) continue;
      clean[key] = safe.slice(0, 200);
    } else if (typeof value === 'number' || typeof value === 'boolean') clean[key] = value;
  }
  return clean;
}

function getAttributionParams(): Record<string, unknown> {
  const last = getUTMData(); const first = getFirstTouchUTM();
  return {
    utm_source: last?.utm_source, utm_medium: last?.utm_medium,
    utm_campaign: last?.utm_campaign, utm_term: last?.utm_term, utm_content: last?.utm_content,
    first_touch_source: first?.utm_source, first_touch_medium: first?.utm_medium,
    first_touch_campaign: first?.utm_campaign, gclid: last?.gclid,
    fbclid: last?.fbclid, msclkid: last?.msclkid,
    landing_page: last?.landing_page, referrer: last?.referrer,
  };
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (eventName === 'email_click' && !claimContactClick('email')) return;
  try { dispatchGoogleEvent(eventName, safeEventParams({ ...getAttributionParams(), ...params })); } catch { /* Tracking must never interrupt an enquiry. */ }
}

export function trackFormSubmission(formName: string, formLocation?: string) {
  trackEvent('form_submission', { event_category: 'Form', event_label: formName, form_name: formName, form_location: formLocation || measurementPagePath() });
}

/** A click remains engagement, not a connected or duration-qualified website call. */
export function trackPhoneCall(phoneNumber: string, location?: string) {
  if (!isCSBPhone(phoneNumber) || !claimContactClick('phone')) return;
  trackEvent('phone_call', { event_category: 'Contact', event_label: CSB_PHONE, phone_number: CSB_PHONE, click_location: location || measurementPagePath() });
}

export function trackQuoteRequest(source?: string) {
  trackEvent('quote_request', { event_category: 'Lead', event_label: source || 'Quote Button', request_source: source || measurementPagePath() });
}

export function trackQuoteFormSubmission() {
  trackEvent('generate_lead', { event_category: 'Lead', event_label: 'Quote Form Submitted', currency: 'GBP' });
}

/** Called only after the existing accepted HubSpot callback, whose event dedup remains unchanged.
 * No native contact.submit UUID, transaction token or CRM migration is implied.
 */
export function trackCommercialShotBlastingGoogleAdsLead() {
  dispatchHubSpotLeadConversion();
}

export function trackCTAClick(buttonName: string, destination?: string) {
  trackEvent('cta_click', { event_category: 'Engagement', event_label: buttonName, button_name: buttonName, destination });
}

export function trackPageView(pagePath: string, pageTitle?: string) {
  dispatchPageView(pagePath, pageTitle || document.title);
}
