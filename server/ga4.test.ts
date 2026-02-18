import { describe, it, expect } from 'vitest';

describe('Google Analytics 4 Configuration', () => {
  it('should have GA4 measurement ID configured', () => {
    const measurementId = process.env.VITE_GA_MEASUREMENT_ID;
    
    // Check that the measurement ID exists
    expect(measurementId).toBeDefined();
    expect(measurementId).not.toBe('');
    
    // Check that it follows the GA4 format (G-XXXXXXXXXX)
    expect(measurementId).toMatch(/^G-[A-Z0-9]+$/);
    
    // Check that it's not the placeholder value
    expect(measurementId).not.toBe('G-XXXXXXXXXX');
  });

  it('should have valid GA4 measurement ID format', () => {
    const measurementId = process.env.VITE_GA_MEASUREMENT_ID;
    
    // GA4 measurement IDs start with G- followed by 10 alphanumeric characters
    expect(measurementId).toMatch(/^G-[A-Z0-9]{10}$/);
  });
});
