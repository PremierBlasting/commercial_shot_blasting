import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { COOKIE_CONSENT_STORAGE_KEY, GOOGLE_MEASUREMENT_CONSENT_KEY } from '../shared/cookieConsent';

/** Local consent-aware regression, never a live Google tag or conversion test. */
describe('GA4 Conversion Tracking compatibility', () => {
  let values: Map<string, string>;
  let gtag: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    vi.resetModules(); values = new Map([[COOKIE_CONSENT_STORAGE_KEY, 'accepted'], [GOOGLE_MEASUREMENT_CONSENT_KEY, 'accepted']]); gtag = vi.fn();
    const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: vi.fn(), removeItem: vi.fn() };
    vi.stubGlobal('window', { gtag, dataLayer: [], localStorage: storage, sessionStorage: storage, location: { pathname: '/contact', origin: 'https://commercialshotblasting.co.uk' } });
    vi.stubGlobal('document', { querySelector: () => null, referrer: '', title: 'Contact' });
    vi.stubGlobal('fetch', vi.fn(() => { throw Error('Network forbidden'); }));
  });
  afterEach(() => { expect(fetch).not.toHaveBeenCalled(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

  it('keeps the existing tracking function exports', async () => {
    const a = await import('../client/src/lib/analytics');
    for (const fn of [a.trackPhoneCall, a.trackEvent, a.trackFormSubmission, a.trackQuoteFormSubmission, a.trackCommercialShotBlastingGoogleAdsLead]) expect(fn).toBeTypeOf('function');
  });
  it('tracks the real telephone as engagement with consent', async () => {
    const { trackPhoneCall } = await import('../client/src/lib/analytics'); trackPhoneCall('07970566409', 'Header');
    expect(gtag).toHaveBeenCalledWith('event', 'phone_call', expect.objectContaining({ event_category: 'Contact', event_label: '07970566409', phone_number: '07970566409', click_location: 'Header' }));
    expect(gtag.mock.calls.some(call => call[1] === 'conversion')).toBe(false);
  });
  it('tracks an email click without forwarding an email field to Google', async () => {
    const { trackEvent } = await import('../client/src/lib/analytics'); trackEvent('email_click', { event_category: 'Contact', event_label: 'Footer Email', email: 'info@commercialshotblasting.co.uk' });
    expect(gtag).toHaveBeenCalledWith('event', 'email_click', { event_category: 'Contact', event_label: 'Footer Email' });
  });
  it('retains form engagement names', async () => {
    const { trackFormSubmission } = await import('../client/src/lib/analytics'); trackFormSubmission('HubSpot Contact Form', '/contact');
    expect(gtag).toHaveBeenCalledWith('event', 'form_submission', expect.objectContaining({ event_category: 'Form', event_label: 'HubSpot Contact Form', form_name: 'HubSpot Contact Form', form_location: '/contact' }));
  });
  it('retains quote generate_lead engagement separately from accepted HubSpot conversion', async () => {
    const { trackQuoteFormSubmission } = await import('../client/src/lib/analytics'); trackQuoteFormSubmission();
    expect(gtag).toHaveBeenCalledWith('event', 'generate_lead', { event_category: 'Lead', event_label: 'Quote Form Submitted', currency: 'GBP' });
    expect(gtag.mock.calls.some(call => call[1] === 'conversion')).toBe(false);
  });
  it('drops undecided activity safely without UTM data or a loaded tag', async () => {
    values.clear(); const { trackPhoneCall } = await import('../client/src/lib/analytics');
    expect(() => trackPhoneCall('07970566409', 'Footer')).not.toThrow(); expect(gtag).not.toHaveBeenCalled();
  });
});
