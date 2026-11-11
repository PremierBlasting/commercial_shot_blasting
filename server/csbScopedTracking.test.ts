import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { COOKIE_CONSENT_STORAGE_KEY, GOOGLE_MEASUREMENT_CONSENT_KEY, WEBSITE_CALL_CONSENT_KEY } from '../shared/cookieConsent';
import { CSB_GOOGLE_DESTINATIONS } from '../shared/googleMeasurement';

class Storage {
  data = new Map<string, string>();
  getItem(key: string) { return this.data.get(key) ?? null; }
  setItem(key: string, value: string) { this.data.set(key, value); }
  removeItem(key: string) { this.data.delete(key); }
}
class Link {
  isConnected = true;
  constructor(public href: string) {}
  getAttribute(name: string) { return name === 'href' ? this.href : null; }
  setAttribute(name: string, value: string) { if (name === 'href') this.href = value; }
  closest() { return this; }
}
let local: Storage;
let session: Storage;
let browser: any;
let listeners: Map<string, EventListener>;
let network: ReturnType<typeof vi.fn>;
beforeEach(() => {
  vi.resetModules(); vi.useFakeTimers();
  vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'G-LOCAL');
  local = new Storage(); session = new Storage(); listeners = new Map();
  browser = { localStorage: local, sessionStorage: session, location: { search: '', pathname: '/contact', origin: 'https://commercialshotblasting.co.uk', hostname: 'commercialshotblasting.co.uk' }, gtag: vi.fn(), dataLayer: [], performance: { getEntriesByType: () => [] }, setTimeout, clearTimeout, requestIdleCallback: vi.fn(), cancelIdleCallback: vi.fn() };
  vi.stubGlobal('window', browser);
  vi.stubGlobal('document', { referrer: '', querySelector: vi.fn(() => null), addEventListener: vi.fn((name: string, listener: EventListener) => listeners.set(name, listener)), removeEventListener: vi.fn(), head: { appendChild: vi.fn() } });
  vi.stubGlobal('Element', Link);
  network = vi.fn(() => { throw new Error('Network forbidden'); });
  vi.stubGlobal('fetch', network);
});
afterEach(() => { expect(network).not.toHaveBeenCalled(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.restoreAllMocks(); });
function allow(calls = false) { local.setItem(COOKIE_CONSENT_STORAGE_KEY, 'accepted'); local.setItem(GOOGLE_MEASUREMENT_CONSENT_KEY, 'accepted'); if (calls) local.setItem(WEBSITE_CALL_CONSENT_KEY, 'accepted'); }
function events() { return browser.gtag.mock.calls.filter((call: any[]) => call[0] === 'event'); }
function click(href: string) { const event = { target: new Link(href), button: 0 } as unknown as Event; listeners.get('click')!(event); return event; }

describe('target iframe API and consent gating', () => {
  it('drops denied events and accepted iframe callbacks instead of replaying them later', async () => {
    const analytics = await import('../client/src/lib/analytics');
    expect(analytics.trackCommercialShotBlastingGoogleAdsLead()).toBeUndefined();
    analytics.trackEvent('form_submission'); expect(browser.gtag).not.toHaveBeenCalled();
    allow(); analytics.trackEvent('cta_click');
    expect(events().map((call: any[]) => call[1])).toEqual(['cta_click']);
  });
  it('old generic acceptance does not grant Ads or new website-call permission', async () => {
    local.setItem(COOKIE_CONSENT_STORAGE_KEY, 'accepted');
    const m = await import('../client/src/lib/googleMeasurement');
    expect(m.currentGoogleConsent()).toEqual({ analytics: true, advertising: false });
    expect(m.dispatchHubSpotLeadConversion()).toBe(false); expect(m.currentWebsiteCallConsent()).toBe(false);
    allow(); expect(m.currentWebsiteCallConsent()).toBe(false);
  });
  it('preserves accepted iframe conversion destination with no native UUID return contract', async () => {
    allow(); const a = await import('../client/src/lib/analytics');
    expect(a.trackCommercialShotBlastingGoogleAdsLead()).toBeUndefined();
    expect(events()).toEqual([['event', 'conversion', { send_to: CSB_GOOGLE_DESTINATIONS.lead }]]);
  });
  it('filters enquiry PII and strips raw URL queries in old event helpers', async () => {
    allow(); const a = await import('../client/src/lib/analytics');
    a.trackEvent('cta_click', { email: 'user@example.com', name: 'Person', phone: '07123456789', message: 'secret', user_data: { email: 'secret' }, destination: '/contact?email=secret@example.com', nested: { secret: true }, event_label: 'user@example.com' });
    expect(events()[0][2]).toEqual({ destination: '/contact' });
    a.trackEvent('conversion', { send_to: 'unapproved' }); expect(events()).toHaveLength(1);
  });
  it('never adds a loader or queues events for an undecided visitor', async () => {
    const m = await import('../client/src/lib/googleMeasurement');
    m.initialiseGoogleMeasurement(); expect(browser.requestIdleCallback).not.toHaveBeenCalled();
    expect(browser.dataLayer).toEqual([]); expect(browser.gtag).not.toHaveBeenCalled();
  });
});

describe('business contact delegation preserves old handlers', () => {
  it('counts delegated and old React telephone callbacks exactly once, with no click conversion', async () => {
    allow(); const c = await import('../client/src/lib/contactClickTracking'); const a = await import('../client/src/lib/analytics');
    const cleanup = c.installBusinessContactTracking(); click('tel:07970566409'); a.trackPhoneCall('07970566409', 'Footer');
    expect(events()).toHaveLength(1); expect(events()[0][1]).toBe('phone_call'); cleanup();
  });
  it('counts ordinary mailto and inline Footer callback once without posting or a conversion', async () => {
    allow(); const c = await import('../client/src/lib/contactClickTracking'); const a = await import('../client/src/lib/analytics');
    c.installBusinessContactTracking(); click('mailto:info@commercialshotblasting.co.uk?subject=Existing');
    a.trackEvent('email_click', { email: 'info@commercialshotblasting.co.uk' });
    expect(events()).toHaveLength(1); expect(events()[0][1]).toBe('email_click');
  });
  it('ignores other telephone/email destinations and leaves legacy WhatsApp handler as the sole tracker', async () => {
    allow(); const c = await import('../client/src/lib/contactClickTracking'); const a = await import('../client/src/lib/analytics');
    c.installBusinessContactTracking(); click('tel:07123456789'); click('mailto:info@shotblasting.co.uk'); click('https://wa.me/447721375756');
    expect(events()).toHaveLength(0); a.trackEvent('whatsapp_click', { event_label: 'WhatsApp Widget' });
    expect(events()).toHaveLength(1); expect(events()[0][1]).toBe('whatsapp_click');
  });
  it('recognises only exact registered forwarding links and logs the real business number', async () => {
    allow(true); const c = await import('../client/src/lib/contactClickTracking'); const t = await import('../client/src/lib/businessPhoneTargets');
    c.installBusinessContactTracking(); const link = new Link('tel:+448081234567'); t.setBusinessForwardingDial('+448081234567'); t.registerBusinessPhoneLink(link as unknown as Element, link.href);
    listeners.get('click')!({ target: link, button: 0 } as unknown as Event);
    expect(events()[0][2].phone_number).toBe('07970566409');
  });
});

describe('incoming attribution and ordinary optional email references', () => {
  it('preserves adwords/ppc and new fields through SPA navigation using existing keys', async () => {
    allow(); browser.location.search = '?utm_source=adwords&utm_medium=ppc&utm_campaign=csb-search-steel&utm_id=24380758796&gbraid=fake-braid&wbraid=fake-web&hsa_cam=24380758796&hsa_net=adwords';
    const u = await import('../client/src/lib/utm'); u.initUTMTracking(); browser.location.search = ''; browser.location.pathname = '/about'; u.refreshAttributionActivity();
    const data = u.formatUTMForSubmission();
    for (const prefix of ['ft', 'lt', 'cv']) { expect(data[`${prefix}_utm_source`]).toBe('adwords'); expect(data[`${prefix}_utm_medium`]).toBe('ppc'); expect(data[`${prefix}_gbraid`]).toBe('fake-braid'); expect(data[`${prefix}_utm_id`]).toBe('24380758796'); }
    expect(local.getItem('csb_utm_data')).toContain('fake-braid'); expect(data.cv_landing_page).toBe('/contact');
  });
  it('keeps new braid IDs in memory only without advertising consent', async () => {
    browser.location.search = '?gbraid=fake-braid&wbraid=fake-web&utm_source=adwords&utm_medium=ppc';
    const u = await import('../client/src/lib/utm'); const data = u.formatUTMForSubmission();
    expect(data.lt_gbraid).toBe('fake-braid'); expect(local.getItem('csb_utm_data')).not.toContain('fake-braid'); expect(session.getItem('csb_session_data')).not.toContain('fake-web');
  });
  it('handles blocked or corrupt storage without interrupting attribution capture', async () => {
    const blocked = { getItem() { throw Error('blocked'); }, setItem() { throw Error('blocked'); }, removeItem() { throw Error('blocked'); } };
    browser.localStorage = blocked; browser.sessionStorage = blocked; browser.location.search = '?utm_source=adwords&gbraid=fake';
    const u = await import('../client/src/lib/utm'); expect(() => u.initUTMTracking()).not.toThrow(); expect(u.formatUTMForSubmission().lt_gbraid).toBe('fake');
  });
  it('preserves recipient, subject, cc and body; exposes campaign only, no click identifiers', async () => {
    const { campaignEmailHref } = await import('../client/src/lib/campaignEmailLinks');
    const href = 'mailto:info@commercialshotblasting.co.uk?subject=Steel&cc=existing%40example.com&body=Please%20help';
    const data = { cv_utm_campaign: 'csb-search-steel', cv_utm_id: '24380758796', cv_gclid: 'private-click', cv_gbraid: 'private-braid' };
    const result = campaignEmailHref(href, data, '/contact'); const parsed = new URL(result);
    expect(parsed.pathname).toBe('info@commercialshotblasting.co.uk'); expect(parsed.searchParams.get('cc')).toBe('existing@example.com'); expect(parsed.searchParams.get('subject')).toBe('Steel'); expect(parsed.searchParams.get('body')).toMatch(/^Please help/); expect(result).not.toMatch(/private|gclid|gbraid/);
    expect(campaignEmailHref(result, data, '/contact')).toBe(result);
    expect(campaignEmailHref(href, data, '/privacy-policy')).toBe(href);
    expect(campaignEmailHref('mailto:info@shotblasting.co.uk', data, '/contact')).toBe('mailto:info@shotblasting.co.uk');
  });
  it('does not prefill arbitrary personal names, numbers, macros or unapproved campaign names', async () => {
    const { campaignEmailHref } = await import('../client/src/lib/campaignEmailLinks');
    const href = 'mailto:info@commercialshotblasting.co.uk';
    for (const campaign of ['John Smith', '07970 566409', 'john@example.com', 'spring-sale', '{campaignid}', 'csb-search-07970566409']) expect(campaignEmailHref(href, { cv_utm_campaign: campaign }, '/contact')).toBe(href);
  });
  it('preserves existing mailto hash fragments separately from subject and body', async () => {
    const { campaignEmailHref } = await import('../client/src/lib/campaignEmailLinks');
    const result = new URL(campaignEmailHref('mailto:info@commercialshotblasting.co.uk?subject=Steel&body=Original#existing-fragment', { cv_utm_campaign: 'csb-search-steel' }, '/contact'));
    expect(result.hash).toBe('#existing-fragment'); expect(result.searchParams.get('subject')).toBe('Steel'); expect(result.searchParams.get('body')).toMatch(/^Original\n\nCampaign reference/);
  });
  it('labels historic campaigns honestly on a later direct visit', async () => {
    allow(); browser.location.search = '?utm_campaign=csb-search-steel&utm_source=adwords&utm_medium=ppc';
    let u = await import('../client/src/lib/utm'); u.initUTMTracking(); session.data.clear(); browser.location.search = ''; vi.resetModules(); u = await import('../client/src/lib/utm');
    const data = u.formatUTMForSubmission(); expect(data.cv_channel).toBe('direct_or_unknown'); expect(data.ft_utm_source).toBe('adwords');
    const { campaignReference } = await import('../shared/campaignReference'); expect(campaignReference(data)?.touch).toBe('latest_tagged');
  });
});

describe('scope and legacy source compatibility', () => {
  const source = (file: string) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
  it('retains iframe forms and legacy WhatsApp destination/reference callbacks', () => {
    expect(source('client/src/components/HubSpotForm.tsx')).toContain('shouldTrackHubSpotFormSuccess');
    for (const file of ['WhatsAppWidget', 'FloatingCallButton']) { const text = source(`client/src/components/${file}.tsx`); expect(text).toContain('447721375756'); expect(text).toContain('createReference.mutate'); expect(text).toContain('onSuccess: ({ trackerRef }) => openChat(trackerRef)'); }
  });
  it('keeps route readiness inside Suspense and compact explicit all-purpose choices with separate call Settings', () => {
    expect(source('client/src/App.tsx')).toMatch(/<Suspense[^>]*>[\s\S]*?<RouteMeasurementReady \/>[\s\S]*?<Switch>/);
    const consent = source('client/src/components/CookieConsent.tsx'); expect(consent).not.toContain('type="checkbox"'); expect(consent).toContain('saveChoices({ measurements: true, websiteCalls: true })'); expect(consent).toContain('aria-label="Website call measurement"'); expect(consent).toContain('Save choices');
    expect(source('client/src/pages/PrivacyPolicy.tsx')).toContain('Last updated: 11 November 2026');
  });
});
