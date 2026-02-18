# Sitemap Submission Checklist

## Quick Reference for Google Search Console Submission

### ✅ Pre-Submission Checklist

- [ ] Verify website is deployed and accessible
- [ ] Confirm sitemap.xml is accessible at: `https://your-domain.com/sitemap.xml`
- [ ] Check robots.txt includes sitemap reference
- [ ] Verify Google Search Console property is set up
- [ ] Confirm website ownership is verified in Search Console

### ✅ Submission Steps

1. **Access Search Console**
   - [ ] Go to: https://search.google.com/search-console
   - [ ] Select your website property

2. **Submit Sitemap**
   - [ ] Click "Sitemaps" in left sidebar
   - [ ] Enter: `sitemap.xml`
   - [ ] Click "Submit"

3. **Verify Submission**
   - [ ] Check status shows "Success"
   - [ ] Verify discovered URLs count (~660 total)
   - [ ] Note submission date for future reference

### ✅ Post-Submission Monitoring (First Week)

- [ ] Day 1-2: Check for any immediate errors
- [ ] Day 3-5: Monitor "Coverage" report for indexed pages
- [ ] Day 7: Review which pages are being crawled
- [ ] Week 2: Check Performance report for search impressions

### 📊 Your Sitemap Structure

| Sitemap File | Purpose | URL Count | Priority |
|--------------|---------|-----------|----------|
| **sitemap.xml** | Index (submit this one) | 4 sitemaps | N/A |
| sitemap-main.xml | Main pages | ~35 | 0.8 |
| sitemap-counties.xml | County pages | 27 | 0.7 |
| sitemap-locations-1.xml | Location pages (part 1) | ~300 | 0.6 |
| sitemap-locations-2.xml | Location pages (part 2) | ~305 | 0.6 |
| **TOTAL** | | **660 URLs** | |

### 🔗 Sitemap URLs to Submit

**Primary (Submit this one):**
```
https://your-domain.com/sitemap.xml
```

**Individual Sitemaps (auto-discovered):**
```
https://your-domain.com/sitemap-main.xml
https://your-domain.com/sitemap-counties.xml
https://your-domain.com/sitemap-locations-1.xml
https://your-domain.com/sitemap-locations-2.xml
```

### 🎯 Expected Indexing Timeline

| Page Type | Expected Indexing Time |
|-----------|----------------------|
| Homepage & main pages | 1-3 days |
| County pages (27) | 3-7 days |
| Major city locations | 1-2 weeks |
| Town/village locations | 2-4 weeks |

### 🚨 Common Issues & Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| "Couldn't fetch" | Wait 24 hours, try again |
| "Sitemap is HTML" | Check server Content-Type headers |
| "404 Not Found" | Verify file exists in /public/ directory |
| "XML parsing error" | Validate XML syntax |
| Low indexed count | Normal for new sites, wait 2-4 weeks |

### 📱 Additional Actions (Optional but Recommended)

- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up Google Analytics to track traffic
- [ ] Enable email notifications in Search Console
- [ ] Request indexing for top 10 priority pages manually
- [ ] Set up weekly Search Console email reports

### 📞 Need Help?

- Google Search Console Help: https://support.google.com/webmasters
- Sitemap Protocol Docs: https://www.sitemaps.org/
- Full Guide: See `SITEMAP_SUBMISSION_GUIDE.md`

---

**Remember**: You only need to submit `sitemap.xml` once. Google will automatically discover and crawl all referenced sitemaps!
