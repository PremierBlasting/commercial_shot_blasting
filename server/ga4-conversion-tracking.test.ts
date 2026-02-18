import { describe, it, expect, beforeEach, vi } from 'vitest';

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
    const { trackPhoneCall, trackEvent, trackFormSubmission, trackQuoteFormSubmission } = await import('../client/src/lib/analytics');
    
    expect(trackPhoneCall).toBeDefined();
    expect(trackEvent).toBeDefined();
    expect(trackFormSubmission).toBeDefined();
    expect(trackQuoteFormSubmission).toBeDefined();
  });

  it('should track phone calls with correct parameters', async () => {
    const { trackPhoneCall } = await import('../client/src/lib/analytics');
    
    trackPhoneCall('07970566409', 'Header');
    
    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'phone_call',
      expect.objectContaining({
        event_category: 'Contact',
        event_label: '07970566409',
        phone_number: '07970566409',
        click_location: 'Header',
      })
    );
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

  it('should not throw errors when tracking without UTM data', async () => {
    const { trackPhoneCall } = await import('../client/src/lib/analytics');
    
    // Should work fine even without UTM data
    expect(() => {
      trackPhoneCall('07970566409', 'Footer');
    }).not.toThrow();
    
    expect(window.gtag).toHaveBeenCalled();
  });
});
