import { describe, it, expect, beforeEach, vi } from 'vitest';

// Google Ads constants (mirrored from GoogleAnalytics.tsx — kept in sync manually)
// Conversion actions created 2026-07-27 via Google Ads API in account 236-156-1845.
const GOOGLE_ADS_ID = 'AW-16481669131';
const GOOGLE_ADS_LEAD_LABEL = 'nOlECJeFnNccEIugibM9';   // CSB - Website Lead Form (ID: 7699104407)
const GOOGLE_ADS_PHONE_LABEL = 'UPr1CIvfr9ccEIugibM9';  // CSB - Phone Call Click (ID: 7699427211)
const EXPECTED_LEAD_SEND_TO = `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`;
const EXPECTED_PHONE_SEND_TO = `${GOOGLE_ADS_ID}/${GOOGLE_ADS_PHONE_LABEL}`;

describe('GA4 Conversion Tracking', () => {
  beforeEach(() => {
    // Mock window.gtag
    global.window = {
      gtag: vi.fn(),
      dataLayer: [],
    } as any;
    
    // Mock localStorage
    global.localStorage = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    } as any;
    
    // Mock sessionStorage
    global.sessionStorage = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    } as any;
  });

  it('should have tracking functions available', async () => {
    const { trackCapabilityStatementDownload, trackCaseStudyCardClick, trackPhoneCall, trackEvent, trackFormSubmission, trackQuoteFormSubmission } = await import('../client/src/lib/analytics');
    
    expect(trackPhoneCall).toBeDefined();
    expect(trackEvent).toBeDefined();
    expect(trackFormSubmission).toBeDefined();
    expect(trackQuoteFormSubmission).toBeDefined();
    expect(trackCapabilityStatementDownload).toBeDefined();
    expect(trackCaseStudyCardClick).toBeDefined();
  });

  it('should track phone calls with correct parameters', async () => {
    const { trackPhoneCall } = await import('../client/src/lib/analytics');
    
    trackPhoneCall('07721375756', 'Header');
    
    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'phone_call',
      expect.objectContaining({
        event_category: 'Contact',
        event_label: '07721375756',
        phone_number: '07721375756',
        click_location: 'Header',
      })
    );
  });

  it('should fire Google Ads phone-call conversion event on phone click (separate label from form)', async () => {
    const { trackPhoneCall } = await import('../client/src/lib/analytics');
    
    trackPhoneCall('07721375756', 'Header');
    
    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'conversion',
      expect.objectContaining({
        send_to: EXPECTED_PHONE_SEND_TO,
        value: 1.0,
        currency: 'GBP',
      })
    );
  });

  it('should NOT fire the lead-form label on phone call (labels must be distinct)', async () => {
    const { trackPhoneCall } = await import('../client/src/lib/analytics');
    
    trackPhoneCall('07721375756', 'Header');
    
    const calls = (window.gtag as ReturnType<typeof vi.fn>).mock.calls;
    const conversionCalls = calls.filter(
      (c: any[]) => c[0] === 'event' && c[1] === 'conversion'
    );
    // Every conversion call must use the phone label, not the lead-form label
    for (const call of conversionCalls) {
      expect(call[2].send_to).toBe(EXPECTED_PHONE_SEND_TO);
      expect(call[2].send_to).not.toBe(EXPECTED_LEAD_SEND_TO);
    }
  });

  it('should track email clicks with correct parameters', async () => {
    const { trackEvent } = await import('../client/src/lib/analytics');
    
    trackEvent('email_click', {
      event_category: 'Contact',
      event_label: 'Footer Email',
      email: 'info@commercialshotblasting.co.uk',
    });
    
    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'email_click',
      expect.objectContaining({
        event_category: 'Contact',
        event_label: 'Footer Email',
        email: 'info@commercialshotblasting.co.uk',
      })
    );
  });

  it('should track form submissions', async () => {
    const { trackFormSubmission } = await import('../client/src/lib/analytics');
    
    trackFormSubmission('HubSpot Contact Form', '/contact');
    
    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'form_submission',
      expect.objectContaining({
        event_category: 'Form',
        event_label: 'HubSpot Contact Form',
        form_name: 'HubSpot Contact Form',
        form_location: '/contact',
      })
    );
  });

  it('should fire Google Ads lead-form conversion event on form submission', async () => {
    const { trackFormSubmission } = await import('../client/src/lib/analytics');
    
    trackFormSubmission('HubSpot Contact Form', '/contact');
    
    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'conversion',
      expect.objectContaining({
        send_to: EXPECTED_LEAD_SEND_TO,
        value: 1.0,
        currency: 'GBP',
      })
    );
  });

  it('should NOT fire the phone-call label on form submission (labels must be distinct)', async () => {
    const { trackFormSubmission } = await import('../client/src/lib/analytics');
    
    trackFormSubmission('HubSpot Contact Form', '/contact');
    
    const calls = (window.gtag as ReturnType<typeof vi.fn>).mock.calls;
    const conversionCalls = calls.filter(
      (c: any[]) => c[0] === 'event' && c[1] === 'conversion'
    );
    for (const call of conversionCalls) {
      expect(call[2].send_to).toBe(EXPECTED_LEAD_SEND_TO);
      expect(call[2].send_to).not.toBe(EXPECTED_PHONE_SEND_TO);
    }
  });

  it('should track quote form submissions as lead generation', async () => {
    const { trackQuoteFormSubmission } = await import('../client/src/lib/analytics');
    
    trackQuoteFormSubmission();
    
    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'generate_lead',
      expect.objectContaining({
        event_category: 'Lead',
        event_label: 'Quote Form Submitted',
        currency: 'GBP',
      })
    );
  });

  it('tracks capability-statement downloads as document engagement without firing a Google Ads conversion', async () => {
    const { trackCapabilityStatementDownload } = await import('../client/src/lib/analytics');

    trackCapabilityStatementDownload('Structural Steel Frames service page');

    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'capability_statement_download',
      expect.objectContaining({
        event_category: 'Document',
        event_label: 'Commercial Capability Statement',
        document_name: 'Commercial Capability Statement',
        document_type: 'pdf',
        placement: 'Structural Steel Frames service page',
      })
    );

    const conversionCalls = (window.gtag as ReturnType<typeof vi.fn>).mock.calls.filter(
      (call: any[]) => call[0] === 'event' && call[1] === 'conversion'
    );
    expect(conversionCalls).toHaveLength(0);
  });

  it('tracks the Bromsgrove Staircases-filter card as content engagement without firing a Google Ads conversion', async () => {
    const { trackCaseStudyCardClick } = await import('../client/src/lib/analytics');

    trackCaseStudyCardClick(
      'Bromsgrove School external spiral staircase restoration',
      'Our Work Staircases filter',
      '/case-studies/bromsgrove-school-staircase',
    );

    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'case_study_card_click',
      expect.objectContaining({
        event_category: 'Content engagement',
        case_study: 'Bromsgrove School external spiral staircase restoration',
        placement: 'Our Work Staircases filter',
        destination: '/case-studies/bromsgrove-school-staircase',
      }),
    );

    const conversionCalls = (window.gtag as ReturnType<typeof vi.fn>).mock.calls.filter(
      (call: any[]) => call[0] === 'event' && call[1] === 'conversion',
    );
    expect(conversionCalls).toHaveLength(0);
  });

  it('tracks capability-statement previews and shares as document engagement without firing a Google Ads conversion', async () => {
    const { trackCapabilityStatementPreview, trackCapabilityStatementShare } = await import('../client/src/lib/analytics');

    trackCapabilityStatementPreview('Homepage CHAS Elite trust section');
    trackCapabilityStatementShare('Homepage CHAS Elite trust section', 'clipboard');

    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'capability_statement_preview',
      expect.objectContaining({
        event_category: 'Document',
        document_name: 'Commercial Capability Statement',
        placement: 'Homepage CHAS Elite trust section',
      })
    );
    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'capability_statement_share',
      expect.objectContaining({
        event_category: 'Document',
        placement: 'Homepage CHAS Elite trust section',
        share_method: 'clipboard',
      })
    );

    const conversionCalls = (window.gtag as ReturnType<typeof vi.fn>).mock.calls.filter(
      (call: any[]) => call[0] === 'event' && call[1] === 'conversion'
    );
    expect(conversionCalls).toHaveLength(0);
  });

  it('should fire Google Ads lead-form conversion event on quote form submission', async () => {
    const { trackQuoteFormSubmission } = await import('../client/src/lib/analytics');
    
    trackQuoteFormSubmission();
    
    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'conversion',
      expect.objectContaining({
        send_to: EXPECTED_LEAD_SEND_TO,
        value: 1.0,
        currency: 'GBP',
      })
    );
  });

  it('should use the correct Google Ads tag ID', () => {
    expect(GOOGLE_ADS_ID).toBe('AW-16481669131');
  });

  it('should use the correct Google Ads lead-form conversion label', () => {
    expect(GOOGLE_ADS_LEAD_LABEL).toBe('nOlECJeFnNccEIugibM9');
  });

  it('should use the correct Google Ads phone-call conversion label', () => {
    expect(GOOGLE_ADS_PHONE_LABEL).toBe('UPr1CIvfr9ccEIugibM9');
  });

  it('should use distinct labels for phone calls vs form submissions', () => {
    expect(GOOGLE_ADS_PHONE_LABEL).not.toBe(GOOGLE_ADS_LEAD_LABEL);
    expect(EXPECTED_PHONE_SEND_TO).not.toBe(EXPECTED_LEAD_SEND_TO);
  });

  it('should not throw errors when tracking without UTM data', async () => {
    const { trackPhoneCall } = await import('../client/src/lib/analytics');
    
    // Should work fine even without UTM data
    expect(() => {
      trackPhoneCall('07721375756', 'Footer');
    }).not.toThrow();
    
    expect(window.gtag).toHaveBeenCalled();
  });
});
