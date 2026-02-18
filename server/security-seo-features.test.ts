import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Security and SEO Features', () => {
  describe('HSTS Header Implementation', () => {
    it('should have HSTS middleware in server configuration', () => {
      const serverPath = path.join(__dirname, '_core/index.ts');
      const serverContent = fs.readFileSync(serverPath, 'utf-8');
      
      expect(serverContent).toContain('Strict-Transport-Security');
      expect(serverContent).toContain('max-age=31536000');
      expect(serverContent).toContain('includeSubDomains');
      expect(serverContent).toContain('preload');
    });

    it('should only set HSTS in production (when x-forwarded-proto is https)', () => {
      const serverPath = path.join(__dirname, '_core/index.ts');
      const serverContent = fs.readFileSync(serverPath, 'utf-8');
      
      expect(serverContent).toContain("req.headers['x-forwarded-proto'] === 'https'");
    });

    it('should have correct HSTS max-age (1 year = 31536000 seconds)', () => {
      const serverPath = path.join(__dirname, '_core/index.ts');
      const serverContent = fs.readFileSync(serverPath, 'utf-8');
      
      expect(serverContent).toContain('max-age=31536000');
    });
  });

  describe('LocalBusiness Schema with Opening Hours', () => {
    it('should have LocalBusinessSchema component', () => {
      const schemaPath = path.join(__dirname, '../client/src/components/LocalBusinessSchema.tsx');
      expect(fs.existsSync(schemaPath)).toBe(true);
    });

    it('should include opening hours specification in schema', () => {
      const schemaPath = path.join(__dirname, '../client/src/components/LocalBusinessSchema.tsx');
      const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
      
      expect(schemaContent).toContain('openingHoursSpecification');
      expect(schemaContent).toContain('OpeningHoursSpecification');
    });

    it('should have weekday opening hours (Monday-Friday 08:00-18:00)', () => {
      const schemaPath = path.join(__dirname, '../client/src/components/LocalBusinessSchema.tsx');
      const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
      
      expect(schemaContent).toContain('Monday');
      expect(schemaContent).toContain('Friday');
      expect(schemaContent).toContain('08:00');
      expect(schemaContent).toContain('18:00');
    });

    it('should have Saturday opening hours (09:00-14:00)', () => {
      const schemaPath = path.join(__dirname, '../client/src/components/LocalBusinessSchema.tsx');
      const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
      
      expect(schemaContent).toContain('Saturday');
      expect(schemaContent).toContain('09:00');
      expect(schemaContent).toContain('14:00');
    });

    it('should be integrated in LocationPage component', () => {
      const locationPagePath = path.join(__dirname, '../client/src/components/LocationPage.tsx');
      const locationPageContent = fs.readFileSync(locationPagePath, 'utf-8');
      
      expect(locationPageContent).toContain('LocalBusinessSchema');
    });
  });

  describe('XML Image Sitemap', () => {
    it('should have sitemap-images.xml file', () => {
      const sitemapPath = path.join(__dirname, '../client/public/sitemap-images.xml');
      expect(fs.existsSync(sitemapPath)).toBe(true);
    });

    it('should be a valid XML file', () => {
      const sitemapPath = path.join(__dirname, '../client/public/sitemap-images.xml');
      const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
      
      expect(sitemapContent).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(sitemapContent).toContain('<urlset');
      expect(sitemapContent).toContain('</urlset>');
    });

    it('should include image namespace', () => {
      const sitemapPath = path.join(__dirname, '../client/public/sitemap-images.xml');
      const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
      
      expect(sitemapContent).toContain('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"');
    });

    it('should contain image entries with loc and title', () => {
      const sitemapPath = path.join(__dirname, '../client/public/sitemap-images.xml');
      const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
      
      expect(sitemapContent).toContain('<image:image>');
      expect(sitemapContent).toContain('<image:loc>');
      expect(sitemapContent).toContain('<image:title>');
    });

    it('should have at least 200 images', () => {
      const sitemapPath = path.join(__dirname, '../client/public/sitemap-images.xml');
      const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
      
      const imageCount = (sitemapContent.match(/<image:image>/g) || []).length;
      expect(imageCount).toBeGreaterThanOrEqual(200);
    });

    it('should be referenced in main sitemap index', () => {
      const mainSitemapPath = path.join(__dirname, '../client/public/sitemap.xml');
      const mainSitemapContent = fs.readFileSync(mainSitemapPath, 'utf-8');
      
      expect(mainSitemapContent).toContain('sitemap-images.xml');
    });

    it('should use correct domain in image URLs', () => {
      const sitemapPath = path.join(__dirname, '../client/public/sitemap-images.xml');
      const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
      
      expect(sitemapContent).toContain('https://commercialshotblasting.co.uk/');
    });
  });

  describe('Integration Tests', () => {
    it('should have all three features implemented', () => {
      // HSTS
      const serverPath = path.join(__dirname, '_core/index.ts');
      const serverContent = fs.readFileSync(serverPath, 'utf-8');
      expect(serverContent).toContain('Strict-Transport-Security');

      // LocalBusiness Schema
      const schemaPath = path.join(__dirname, '../client/src/components/LocalBusinessSchema.tsx');
      expect(fs.existsSync(schemaPath)).toBe(true);

      // Image Sitemap
      const sitemapPath = path.join(__dirname, '../client/public/sitemap-images.xml');
      expect(fs.existsSync(sitemapPath)).toBe(true);
    });

    it('should have updated main sitemap with image sitemap reference', () => {
      const mainSitemapPath = path.join(__dirname, '../client/public/sitemap.xml');
      const mainSitemapContent = fs.readFileSync(mainSitemapPath, 'utf-8');
      
      expect(mainSitemapContent).toContain('sitemap-main.xml');
      expect(mainSitemapContent).toContain('sitemap-counties.xml');
      expect(mainSitemapContent).toContain('sitemap-locations-1.xml');
      expect(mainSitemapContent).toContain('sitemap-locations-2.xml');
      expect(mainSitemapContent).toContain('sitemap-images.xml');
    });
  });
});
