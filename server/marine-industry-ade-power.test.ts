import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const marineIndustrySource = readFileSync('client/src/pages/MarineIndustry.tsx', 'utf8');

describe('Marine industry ADE Power project record', () => {
  it('replaces the unsupported placeholder vessel study with the approved Wakefield project', () => {
    expect(marineIndustrySource).toContain('ADE Power — Wakefield Marine CX Enclosures');
    expect(marineIndustrySource).toContain('Wakefield, WF9');
    expect(marineIndustrySource).toContain('Marine CX standard');
    expect(marineIndustrySource).toContain('enclosures were blasted and primed');
    expect(marineIndustrySource).toContain('enclosure-flipping stage');
    expect(marineIndustrySource).not.toContain('Cargo Vessel Hull Restoration - Port of Liverpool');
    expect(marineIndustrySource).not.toContain('8,500 m²');
    expect(marineIndustrySource).not.toContain('5-year anti-fouling system');
  });

  it('uses supplied project imagery and links to the evidence-led technical and case-study pages', () => {
    expect(marineIndustrySource).toContain('UK_MANAGED_MEDIA_ORIGIN');
    expect(marineIndustrySource).toContain('ade-power-wakefield-enclosure-01_217cd4e1.webp');
    expect(marineIndustrySource).toContain('ade-power-wakefield-enclosure-03_a150a0c0.webp');
    expect(marineIndustrySource).toContain('marine-cx-surface-preparation');
    expect(marineIndustrySource).toContain('ade-power-wakefield-marine-cx-enclosures');
  });
});
