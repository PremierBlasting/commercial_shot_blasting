# XML Sitemap Submission Guide for Google Search Console

## Sitemap Overview

Your website has a comprehensive sitemap structure with **660 total URLs** organized across multiple files for optimal search engine crawling and indexing.

### Sitemap Structure

```
sitemap.xml (Sitemap Index)
├── sitemap-main.xml (Main website pages)
├── sitemap-counties.xml (27 county landing pages)
├── sitemap-locations-1.xml (First 300+ location pages)
└── sitemap-locations-2.xml (Remaining 300+ location pages)
```

## Sitemap Files Breakdown

### 1. **sitemap.xml** (Sitemap Index)
- **Purpose**: Master index that references all other sitemaps
- **Location**: `/sitemap.xml`
- **URL**: `https://your-domain.com/sitemap.xml`
- **Submit this file to Google Search Console**

### 2. **sitemap-main.xml**
- **Purpose**: Core website pages (home, about, contact, services, blog, etc.)
- **Location**: `/sitemap-main.xml`
- **URL**: `https://your-domain.com/sitemap-main.xml`
- **Priority**: 0.8 (High)
- **Change Frequency**: Weekly

### 3. **sitemap-counties.xml**
- **Purpose**: All 27 county landing pages
- **Location**: `/sitemap-counties.xml`
- **URL**: `https://your-domain.com/sitemap-counties.xml`
- **Counties Included**: 
  - East of England: Bedfordshire, Buckinghamshire, Cambridgeshire, Hertfordshire, Norfolk, Suffolk
  - East Midlands: Derbyshire, Leicestershire, Lincolnshire, Northamptonshire, Nottinghamshire
  - West Midlands: Herefordshire, Shropshire, Staffordshire, Warwickshire, West Midlands, Worcestershire
  - Yorkshire: South Yorkshire, West Yorkshire
  - North West: Cheshire
  - South West: Gloucestershire, North Devon, Somerset, Wiltshire
  - Wales Borders: East Wales, Buckinghamshire
- **Priority**: 0.7 (Medium-High)
- **Change Frequency**: Monthly

### 4. **sitemap-locations-1.xml** & **sitemap-locations-2.xml**
- **Purpose**: 605 individual town and village location pages
- **Location**: `/sitemap-locations-1.xml` and `/sitemap-locations-2.xml`
- **URLs**: 
  - `https://your-domain.com/sitemap-locations-1.xml`
  - `https://your-domain.com/sitemap-locations-2.xml`
- **Priority**: 0.6 (Medium)
- **Change Frequency**: Monthly
- **Note**: Split into two files to stay within Google's recommended 50,000 URL limit per sitemap

## How to Submit to Google Search Console

### Step 1: Access Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property (website)
3. If you haven't added your website yet, click "Add Property" and verify ownership

### Step 2: Submit the Sitemap Index
1. In the left sidebar, click **"Sitemaps"**
2. In the "Add a new sitemap" field, enter: `sitemap.xml`
3. Click **"Submit"**

**Important**: You only need to submit `sitemap.xml` (the sitemap index). Google will automatically discover and crawl all referenced sitemaps (sitemap-main.xml, sitemap-counties.xml, sitemap-locations-1.xml, sitemap-locations-2.xml).

### Step 3: Monitor Sitemap Status
- After submission, Google will process your sitemap (this can take a few hours to several days)
- Check the status in the Sitemaps section:
  - **Success**: Green checkmark with number of discovered URLs
  - **Errors**: Red icon with error details (click to view and fix)
  - **Warnings**: Yellow icon with warnings (optional fixes)

### Step 4: Verify Coverage
1. Go to **"Coverage"** or **"Pages"** in the left sidebar
2. Check that your pages are being indexed
3. Look for any errors or excluded pages

## Expected Results After Submission

- **Total URLs Submitted**: 660
- **Main Pages**: ~30-40 URLs
- **County Pages**: 27 URLs
- **Location Pages**: 605 URLs

Google typically indexes:
- High-priority pages (main pages) within 1-3 days
- County pages within 3-7 days
- Location pages within 1-4 weeks (depending on crawl budget)

## Sitemap Best Practices

### ✅ Current Implementation
- ✅ Sitemap index structure for large site
- ✅ Proper XML formatting with namespace declarations
- ✅ Priority values set appropriately (0.8 for main, 0.7 for counties, 0.6 for locations)
- ✅ Change frequency specified (weekly for main, monthly for locations)
- ✅ Last modified dates included
- ✅ Split large location sitemaps into multiple files

### 🔄 Maintenance Recommendations
1. **Update lastmod dates** when pages are significantly updated
2. **Regenerate sitemaps** when adding new locations or counties
3. **Monitor Search Console** weekly for crawl errors
4. **Check robots.txt** to ensure sitemaps are referenced

## Robots.txt Verification

Your `robots.txt` file should include:

```
User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml
```

This tells search engines where to find your sitemap index.

## Troubleshooting Common Issues

### Issue: "Sitemap could not be read"
- **Cause**: XML formatting error or incorrect URL
- **Solution**: Validate XML syntax and ensure sitemap is accessible at the specified URL

### Issue: "Sitemap is HTML"
- **Cause**: Server returning HTML instead of XML
- **Solution**: Check server configuration and ensure `.xml` files are served with `Content-Type: application/xml`

### Issue: "Submitted URL not found (404)"
- **Cause**: Sitemap file doesn't exist at the specified location
- **Solution**: Verify file exists in `/client/public/` directory and is deployed

### Issue: "Couldn't fetch"
- **Cause**: Temporary server issue or network problem
- **Solution**: Wait a few hours and try resubmitting

## Additional Search Console Features

### 1. URL Inspection Tool
- Test individual URLs to see how Google views them
- Request indexing for important pages
- Check mobile usability and Core Web Vitals

### 2. Performance Reports
- Monitor which pages get clicks and impressions
- Track keyword rankings
- Identify opportunities for optimization

### 3. Coverage Reports
- See which pages are indexed vs. excluded
- Identify crawl errors and fix them
- Monitor indexing progress over time

## Local SEO Optimization Tips

Since your site focuses on local SEO with 27 counties and 605 locations:

1. **Monitor County Pages**: Track indexing status of all 27 county pages
2. **Prioritize High-Value Locations**: Use URL Inspection to manually request indexing for major cities
3. **Check Mobile Usability**: Ensure all location pages are mobile-friendly
4. **Monitor Core Web Vitals**: Page speed affects local search rankings
5. **Track Local Keywords**: Use Performance reports to see which "shot blasting [location]" keywords drive traffic

## Support Resources

- [Google Search Console Help](https://support.google.com/webmasters)
- [Sitemap Protocol Documentation](https://www.sitemaps.org/protocol.html)
- [Google's Sitemap Guidelines](https://developers.google.com/search/docs/advanced/sitemaps/overview)

---

**Last Updated**: February 2, 2026  
**Total URLs**: 660 (Main: ~35 | Counties: 27 | Locations: 605)  
**Sitemap Format**: XML 1.0 with Sitemap Protocol 0.9
