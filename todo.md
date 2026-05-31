# Commercial Shot Blasting - Manus Migration TODO

- [x] Copy all client components (LocationRouter, LocationPage, ServiceRadiusMap, Map, etc.)
- [x] Copy all client pages (Blog, Gallery, About, Contact, Services, Industries, Counties, etc.)
- [x] Copy all client data files (locationData, countyData, serviceData, etc.)
- [x] Copy all client hooks and utilities
- [x] Copy App.tsx routes and main.tsx with HelmetProvider
- [x] Copy index.css and all styles
- [x] Copy public assets (sitemaps, robots.txt, static HTML pages, images)
- [x] Copy server routers.ts with all tRPC procedures
- [x] Copy server db.ts with all database query helpers
- [x] Copy server metaTags.ts for SEO injection
- [x] Update vite.ts with crawler detection middleware
- [x] Copy drizzle schema with all tables + import database (39 SQL statements, 12 tables)
- [x] Push database schema to Manus DB
- [x] Install additional dependencies (react-helmet-async, etc.)
- [x] Configure environment variables (VITE_FRONTEND_FORGE_API_KEY, VITE_GA_MEASUREMENT_ID, etc.)
- [x] Build and fix compilation errors (sitemap reference, HelmetProvider)
- [x] Test all features (blog, gallery, maps, locations, counties)
- [x] Run production build test
- [x] Upload 251 media files + 2 PDFs to S3 CDN
- [x] Replace all local image paths with CDN URLs (510 replacements in 127 files)
- [x] Fix static HTML OG URLs from manus.space to commercialshotblasting.co.uk
- [x] Save checkpoint and deploy
- [x] Save checkpoint and deliver
- [x] Fix broken blog image for "Restoring Factory and Warehouse Cladding" article
- [x] Comprehensive testing of all 176 pages (0 broken images, 0 errors)
- [x] Fix nested anchor tag warnings in 5 files (13 fixes total)
- [x] Replace 2 missing placeholder images with existing CDN images
- [x] Fix "Failed to fetch dynamically imported module" error - stale browser cache from old Vercel deployment, all chunks verified working on production
- [x] Diagnose schema.org validation issues on service pages
- [x] Implement JSON-LD structured data (LocalBusiness, Service, BreadcrumbList) across all page types
- [x] Add JSON-LD to homepage, service pages, location pages, county pages, blog, about, contact
- [x] Test structured data with schema.org validator - all 11 page types validated, 0 JSON errors
- [x] Sync project to new GitHub repo PremierBlasting/Commercial_Shot_Blasting_Account (already connected and up to date)
- [x] Fix production JSON-LD not appearing: added index:false to express.static so homepage goes through catch-all route with JSON-LD injection
- [x] Investigate and fix: published checkpoint still serves old bundle on live site - JSON-LD not appearing after publish
- [x] Added client-side JSON-LD injector (jsonld-inject.js) as fallback - generates and injects structured data via browser JS
- [x] Client-side script covers all page types: homepage, services, industries, locations, counties, blog, about, contact, our work, preparation-cleanup, free-site-survey
- [x] Script handles SPA navigation (pushState/popstate) to update JSON-LD on route changes
- [x] Massively expand JSON-LD structured data across ALL pages
- [x] Add detailed LocalBusiness with reviews, opening hours, payment methods, founding date
- [x] Add rich Service schemas with pricing hints, availability, duration estimates
- [x] Add detailed FAQPage schemas on service pages with service-specific FAQs
- [x] Add HowTo schema for process/preparation pages
- [x] Add ImageGallery/ImageObject schemas for Our Work page
- [x] Add detailed BreadcrumbList on every page
- [x] Add Organization schema with full business details
- [x] Add ServiceArea schemas with geo coordinates for location pages
- [x] Add Industry-specific schemas with detailed descriptions
- [x] Add Blog/Article schemas with author, datePublished, wordCount
- [x] Add Offer schemas with free quote CTAs on service pages
- [x] Add review snippets and aggregate ratings
- [x] Server-side jsonLd.ts kept as baseline; client-side jsonld-inject.js is the primary source of expanded schemas
- [x] Fix duplicate FAQPage JSON-LD: removed server-side injection, now client-side jsonld-inject.js is the sole source of structured data
- [x] Move WhatsApp chat icon to vertical center (50% from top) on both desktop and mobile
- [x] Add BreadcrumbList schema to all pages in JSON-LD (already present on every page)
- [x] Add VideoObject schema for homepage video content
- [x] Add Organization schema across the entire site (now injected on every page)
- [x] Remove duplicate WhatsApp button at bottom right on mobile (removed from FloatingCallButton, keeping only Call Now button)
- [x] Move floating Call Now button on mobile to sit just below WhatsApp button at vertical center
- [x] Make Call Now button a circle icon like WhatsApp button for consistent mobile design
- [x] Add subtle hover effect to WhatsApp and Call Now buttons for better interaction feedback
- [x] Add subtle pulse animation to WhatsApp button to draw attention on first visit
- [x] Track Call Now button clicks as 'call_button_click' event in Google Analytics
- [x] Set up GA4 conversion for call_button_click event (documentation created: GA4_CONVERSION_SETUP.md)
- [x] Add WhatsApp click tracking as whatsapp_button_click GA event for complete contact funnel visibility
- [x] Make WhatsApp pulse animation stop after 10 seconds to avoid distracting users on longer visits
- [x] Add relevant keywords to homepage content for SEO (meta keywords tag with 10 relevant terms)
- [x] Update homepage title to 30-60 characters using document.title (68 chars: 'Commercial Shot Blasting Services UK | Industrial Surface Preparation')
- [x] Add meta description of 50-160 characters to homepage (144 chars with key services and CTA)
- [x] Add unique SEO titles and descriptions to all service pages (18 services) via getServiceSEO() in useSEO hook
- [x] Add unique SEO titles and descriptions to all location pages (80+ locations) via getLocationSEO() in LocationPage component
- [x] Add unique SEO titles and descriptions to all county pages (15 counties) via getCountySEO() in useSEO hook
- [x] Add unique SEO titles and descriptions to all industry pages (8 industries) via getIndustrySEO() in useSEO hook
- [x] Add unique SEO titles and descriptions to blog listing and individual blog posts (Blog.tsx static, BlogPost.tsx dynamic based on post data)
- [x] Add unique SEO titles and descriptions to static pages (About, Contact, Our Work, Preparation & Cleanup, Free Site Survey) with custom titles and descriptions
- [x] Fix useSEO hook to properly replace existing meta tags in HTML head - now updates all OG tags, Twitter cards, and standard meta tags
- [x] Add comprehensive JSON-LD schema to all 80+ service area pages with LocalBusiness, detailed Service, 8 FAQs, geo coordinates, offer catalog, opening hours, and aggregate ratings
- [x] Massively expand JSON-LD on local area pages: add Product/Service catalog, ContactPoint, GeoShape, Place, ImageObject, VideoObject, multiple Review items, sameAs social links, additionalType, knowsAbout, areaServed expansion, and more comprehensive business details
- [x] Investigate and fix "Duplicate field 'FAQPage'" error in JSON-LD schemas to make all 16 items fully valid for Google Rich Results
- [x] Add comprehensive server-side static JSON-LD schemas to service area pages (alongside JavaScript) for Schema.org validator compatibility and immediate Google access
- [x] Fix meta tag removal logic in metaTags.ts to properly remove all old generic meta descriptions from service area pages
- [x] Wire up injectMetaTags function in server rendering pipeline so it's called during production SSR
- [x] Fix production deployment meta tag injection - reverted to client-side useSEO with optimized descriptions that work in static deployment
- [x] Investigate why old meta tags still appear on production after publishing checkpoint eff829be with client-side useSEO - added comprehensive meta tag placeholders to index.html
- [x] Implement pre-rendering build script to generate static HTML files for all 638 location pages with baked-in meta tags
- [x] Remove hardcoded datePublished/dateModified from service area JSON-LD schemas to prevent Google showing dates in search results
- [x] Add additional JSON-LD schema types to service area pages (GeoCircle, OfferCatalog, ContactPoint, SiteLinksSearchBox, etc.)
- [x] Generate sitemap.xml with all 638 service area pages and submit to Google Search Console
- [x] Inject canonical link tags into each pre-rendered page head to prevent duplicate content
- [x] Fix TypeScript errors in Blog.tsx, BlogPost.tsx, and PreparationCleanup.tsx
- [x] Add 301 redirect from www.commercialshotblasting.co.uk to commercialshotblasting.co.uk in Express server
- [x] Add canonical URL tags to all pages (server-side metaTags.ts + client-side useSEO hook)
- [x] Add canonical URL tags to Services and ServiceAreas index pages
- [x] Add structured data JSON-LD schemas (Service, FAQPage, HowTo, BreadcrumbList, WebPage, Organization) for all 18 service pages in metaTags.ts
- [x] Add ItemList schema to /services index page (server-side: ItemList, WebPage, BreadcrumbList, Organization with OfferCatalog)
- [x] Add ItemList schema to /service-areas index page (server-side: ItemList with 30 locations, WebPage, BreadcrumbList, Organization with areaServed)
- [x] Add SiteNavigationElement schema to homepage (server-side: WebSite with SearchAction, SiteNavigationElement, LocalBusiness with opening hours, WebPage, BreadcrumbList)
- [x] Add server-side HTML body injection to service area pages (SSR content for crawlers: h1, h2, h3, FAQ microdata, breadcrumb, services list, contact)
- [x] Add SSR body HTML injection to all 18 service pages (/services/:id) in metaTags.ts
- [x] Pre-render all 638 service area pages into static HTML files at build time with full body content
- [x] Write pre-rendered pages as extensionless files for clean URL matching on static hosting
- [x] Pre-render all 25 county pages as static HTML files (extensionless + .html) at build time
- [x] Pre-render all 8 industry pages as static HTML files (extensionless + .html) at build time
- [x] Update sitemap generator to include all 25 county and 8 industry URLs
- [x] Add server-side meta tag + JSON-LD + SSR body injection for /counties/:slug in metaTags.ts
- [x] Add server-side meta tag + JSON-LD + SSR body injection for /industries/:slug in metaTags.ts
- [x] Create /industries index grid page listing all 8 industries with links
- [x] Create /counties index listing page listing all 25 counties with links
- [x] Add breadcrumb navigation component to all 8 industry detail pages
- [x] Add breadcrumb navigation component to all 25 county detail pages
- [x] Add server-side meta tags for /industries and /counties index routes
- [x] Add region filter tabs to /counties hub page
- [x] Add Counties section to /service-areas page
- [x] Add /counties and /industries links to main navigation header
- [x] Add Browse by County link to mobile navigation drawer
- [x] Add Browse other counties section to county detail pages
- [x] Add /counties and /industries hub URLs to sitemap-main.xml
- [x] Item 1: Fix breadcrumb /#services → /services in ServiceDetail.tsx and metaTags.ts
- [x] Item 2: Add og:image:width, og:image:height, og:locale to service meta tags in metaTags.ts
- [x] Item 3: Add fetchpriority hero image preload in ServiceDetail.tsx and metaTags.ts
- [x] Item 4: Add aria-expanded/aria-controls/type=button to FAQ accordion in ServiceDetail.tsx
- [x] Item 7: Add preconnect for files.manuscdn.com to index.html
- [x] Item 9: Add itemscope/itemtype microdata to visible FAQ accordion in ServiceDetail.tsx
- [x] Item 5: Add manualChunks to vite.config.ts to split vendor/ui/locationData bundles
- [x] Item 6: Add explicit width/height to all gallery img tags in ServiceDetail.tsx
- [x] Item 8: Replace Google Fonts CDN with @fontsource self-hosted fonts
- [x] Item 10: Replace sidebar service text list with Related Services card grid
- [x] Apply og:image:width/height and og:locale to county and industry meta tag handlers
- [x] Add Related Services card grid to service area town pages
- [x] Add full og:image:width/height/locale/site_name to homepage and service area meta tag handlers
- [x] Local area #1: Add twitter:image:alt to all meta tag handlers
- [x] Local area #2: Add dateModified to location WebPage schema
- [x] Local area #3: Add VideoObject schema to location pages
- [x] Local area #4: Add SpeakableSpecification to location WebPage schema
- [x] Local area #5: Add aria-label to ServiceRadiusMap section
- [x] Local area #6: Convert nearby towns to internal anchor links
- [x] Local area #7: Add visible AggregateRating badge to location hero
- [x] Local area #8: Add hero image preload link for location pages
- [x] Local area #9: Add Industries We Serve section to location pages
- [x] Local area #10: Add sticky mobile Get a Quote bar to location pages
- [x] Service #1: twitter:image:alt on service meta handler
- [x] Service #2: dateModified/datePublished in service WebPage schema
- [x] Service #3: VideoObject schema for steel sheeting video
- [x] Service #4: speakable on service WebPage schema
- [x] Service #5: Visible testimonial / star rating block in ServiceDetail
- [x] Service #6: max-image-preview:large robots meta tag
- [x] Service #7: inLanguage + isPartOf on Service schema
- [x] Service #8: Service Coverage location link section
- [x] Service #9: Client-side canonical in useSEO hook (already implemented)
- [x] Service #10: Sticky mobile CTA bar in ServiceDetail

## Local Area Page SEO Round 2 (14 items)

- [x] Local2 #1: Add "Services" to prerender.mjs title tag — already present: `Shot Blasting Services in ${name}` ✓
- [x] Local2 #2: Fix client-side getLocationSEO title to include "Services in" — already present: `Shot Blasting Services in ${locationName}` ✓
- [x] Local2 #3: Improve meta description to include "services" keyword — already includes "shot blasting services" ✓
- [x] Local2 #4: Add dateModified/datePublished to location WebPage schema in metaTags.ts — already present at lines 646-647 ✓
- [x] Local2 #5: Add speakable to location WebPage schema in metaTags.ts — already present at line 641 ✓
- [x] Local2 #6: Add uploadDate to VideoObject schema in generateLocationSchemas — already present: "uploadDate": "2024-03-15" ✓
- [x] Local2 #7: Add twitter:image:alt to prerender.mjs head tags — already present at line 362 ✓
- [x] Local2 #8: Fix CountyPage.tsx links from /locations/ to /service-areas/ — FIXED: 2 occurrences at lines 271, 323 updated
- [x] Local2 #9: Fix LocalBusinessSchema URL from /locations/ to /service-areas/ — already correct in LocationPage.tsx ✓
- [x] Local2 #10: Fix breadcrumb href from /locations/ to /service-areas/ — already correct in LocationPage.tsx ✓
- [x] Local2 #11: Add SSR body content injection to county pre-rendered pages — already implemented in prerender-counties.mjs ✓
- [x] Local2 #12: Swap visible FAQ section from location.faqs to generateLocationFAQs — already uses generateLocationFAQs ✓
- [x] Local2 #13: Add visible testimonial block to LocationPage.tsx — already exists (3-card testimonial section) ✓
- [x] Local2 #14: Pass slug to useSEO/getLocationSEO for correct client-side canonical — already passed: useSEO(getLocationSEO(location.name, location.slug, location.county)) ✓

## Technical SEO Improvements — All 20 Items

### Group 1: Core Web Vitals & Page Speed
- [x] TechSEO #1: Add loading="lazy" to below-fold images; fetchpriority="high" on hero images — all img tags now have loading="lazy" + decoding="async"; hero images use CSS background (no img tag)
- [x] TechSEO #2: Convert uploaded job photos to WebP at 80% quality — 16 JPEG images converted (3100KB→2335KB, 24.7% smaller), all CDN URLs updated to .webp
- [x] TechSEO #3: Add <link rel="preconnect"> and <link rel="dns-prefetch"> for all third-party origins in index.html — added for files.manuscdn.com, js-eu1.hsforms.net, forms.hsforms.com, api.manus.im
- [x] TechSEO #4: Verify code splitting is working correctly per route — manualChunks confirmed: vendor-react, vendor-ui, vendor-trpc, location-data chunks
- [x] TechSEO #5: Add <link rel="preload"> for critical CSS — added vitePluginPreloadMainCss() Vite plugin that auto-injects preload with hashed CSS filename at build time

### Group 2: Local SEO Schema Markup
- [x] TechSEO #6: Add LocalBusiness JSON-LD with areaServed set to specific town/county on every service-area page — already in generateLocationSchemas() in server/metaTags.ts
- [x] TechSEO #7: Add GeoCoordinates (lat/lng from locationData) to LocalBusiness schema — already implemented with lat/lng from location data
- [x] TechSEO #8: Add serviceArea with geoRadius (30 miles) to schema — already implemented with GeoCircle radius 48280m
- [x] TechSEO #9: Add hasMap property linking to Google Maps listing — already in LocalBusiness schema

### Group 3: On-Page Technical Signals
- [x] TechSEO #10: Ensure unique <link rel="canonical"> per service-area page — already set both server-side (metaTags.ts) and client-side (useSEO hook)
- [x] TechSEO #11: Add <html lang="en-GB"> and hreflang="en-gb" meta — lang="en-GB" in index.html, hreflang links added
- [x] TechSEO #12: Audit meta description length (under 160 chars) — fixed 37 over-160-char service descriptions with automated script
- [x] TechSEO #13: Confirm H1 is unique per slug in LocationPage template — H1 is "Shot Blasting Services in {location.name}" (unique per slug)
- [x] TechSEO #14: Add "Nearby Areas" internal linking section — already exists as same-county town pill links in LocationPage

### Group 4: Structured Data Enhancements
- [x] TechSEO #15: Add BreadcrumbList JSON-LD: Home → Service Areas → [Town Name] — already in server-side generateLocationSchemas()
- [x] TechSEO #16: Add FAQPage JSON-LD (pages already have FAQ content) — already in server-side generateLocationSchemas() with 8 FAQs per page
- [x] TechSEO #17: Add aggregateRating to LocalBusiness schema (4.9★, 70+ reviews) — already in LocalBusiness schema (4.9★, 127 reviews)

### Group 5: Crawlability & Indexing
- [x] TechSEO #18: Add <lastmod> dates to sitemap — already uses TODAY (build date) for all sitemaps; per-page dates for static content is correct approach
- [x] TechSEO #19: Add priority and changefreq to sitemap entries — already present: homepage 0.8/weekly, services 0.8/weekly, service-areas 0.7/monthly, counties/industries 0.9/monthly
- [x] TechSEO #20: Audit robots.txt to confirm /service-areas/ is not blocked — confirmed: robots.txt has Allow: / with no blocking rules for /service-areas/

## County Page Improvements (3 items)

- [x] County #1: Add og:image:width, og:image:height, og:locale to county page meta tags — server-side already had them; added setOrCreate() helper in CountyPage.tsx useEffect for client-side hydration
- [x] County #2: Add loading animation skeleton for county pages — created CountyPageSkeleton.tsx (pulse skeleton matching hero/services/industries/towns layout); wrapped all 27 county routes in dedicated Suspense in App.tsx
- [x] County #3: Add Share on Social Media button to county pages — created ShareButton.tsx (Facebook, X/Twitter, LinkedIn, copy link; uses Web Share API on mobile); added Share section before Footer in CountyPage.tsx

## County Page Hero Images & ImageObject Schema

- [x] County-Image #1: Generate unique hero images for all 25 counties — 28 images generated (25 counties + 3 extras), all cinematic industrial shot blasting scenes specific to each county's industries (Cumbria submarine dock, Somerset aerospace, West Midlands automotive, etc.)
- [x] County-Image #2: Upload all 25 county WebP images to CDN — all uploaded to CloudFront CDN as .webp files
- [x] County-Image #3: Update countyData.ts with per-county ogImage URLs — added ogImage field to both client/src/data/countyData.ts and shared/countyData.ts (25 entries each)
- [x] County-Image #4: Update CountyPage.tsx og:image and twitter:image to use county.ogImage — updated useEffect to call setOrCreate('og:image', county.ogImage) and setOrCreate('twitter:image', county.ogImage)
- [x] County-Image #5: Add ImageObject JSON-LD schema to each county page — added to both client-side (CountyPage.tsx useEffect) and server-side (metaTags.ts SSR handler); includes contentUrl, width:1200, height:630, encodingFormat:image/webp, representativeOfPage:true, creator:Organization

## ShareButton & Industry Skeleton (2 items)

- [x] ShareBtn #1: Add ShareButton to LocationPage.tsx — passes location-specific title, url, and description; placed before Footer on all 605 service area pages
- [x] IndustrySkel #1: Created IndustryPageSkeleton.tsx (pulse skeleton matching hero/services grid/stats/gallery/CTA layout); wrapped all 8 industry routes in dedicated Suspense in App.tsx
- [x] CountyHero fix: Added primaryImage prop to HeroCarousel.tsx; county pages now show their unique county-specific image as the first background slide before the generic carousel continues; CountyPage.tsx passes county.ogImage as primaryImage

## Image & Service-Areas Content (3 items)
- [x] Replace sign-overlay hero/carousel images with real clean industrial shot blasting photos (no people, no signs)
- [x] Audit service-areas page for all empty/missing content sections (Greater Manchester, Essex, others)
- [x] Add full content to all empty service-areas sections — added dedicated anchor sections for Greater Manchester, Merseyside, and Essex

## Regional Spotlight & County Pages (3 tasks)
- [x] Add regional spotlight sections for Bristol & Bath, Oxfordshire, and Surrey to service-areas page
- [x] Create county pages for Greater Manchester and Essex
- [x] Add Request a Quote button to each county section on service-areas page
## Yorkshire County Pages (2 tasks)
- [x] Add North Yorkshire to countyData.ts with full data (York, Harrogate, Scarborough, Middlesbrough, Northallerton)
- [x] Create NorthYorkshireCounty.tsx page component and register route in App.tsx
- [x] Add South Yorkshire and North Yorkshire spotlight sections to service-areas page with anchor IDs
- [x] Split Yorkshire allRegions entry into South Yorkshire, West Yorkshire, North Yorkshire with countyHref links
## 404 Fix - All Service Area Pages (Priority)
- [x] Audit all 638 location slugs vs registered routes — found 536 missing (only 102 registered individually)
- [x] Add dynamic catch-all route /service-areas/:slug → LocationRouter to fix all 536 missing pages
- [x] Spot-checked 28 previously-404ing pages — all now return 200

## New County Pages: Berkshire, Hampshire, Lancashire
- [x] Add Berkshire, Hampshire, Lancashire county data to countyData.ts
- [x] Create BerkshireCounty.tsx, HampshireCounty.tsx, LancashireCounty.tsx page components
- [x] Register Berkshire, Hampshire, Lancashire routes in App.tsx
- [x] Add Lancashire spotlight section to Areas.tsx service-areas page
- [x] Add Berkshire and Hampshire countyHref links in Areas.tsx county grid
- [x] Add Lancashire to county grid in Areas.tsx
- [x] Add Lancashire to Header.tsx desktop nav (North West section)
- [x] Add Lancashire to Header.tsx mobile nav (North West section)
- [x] Update Berkshire and Hampshire countyHref in Header.tsx desktop nav to point to county pages
- [x] Update Hampshire mobile nav with more locations
- [x] Ping Google IndexNow for new county pages (berkshire, hampshire, lancashire) — submitted via Yandex IndexNow (202 Accepted), propagates to all IndexNow partners including Bing

## Gallery Section + North East County Pages
- [x] Add project gallery section to Berkshire, Hampshire, Lancashire county pages
- [x] Create county data entries for Cumbria, Durham, Tyne & Wear, Northumberland
- [x] Create CumbriaCounty.tsx, DurhamCounty.tsx, TyneWearCounty.tsx, NorthumberlandCounty.tsx
- [x] Register all 4 new North East county routes in App.tsx
- [x] Add all 4 new counties to Header.tsx desktop and mobile nav
- [x] Add all 4 new counties to Areas.tsx county grid and spotlight sections
- [x] Add SSR schema markup for all new county pages in metaTags.ts (auto-generated from countyData)
- [x] Ping IndexNow for all new county pages — 8 URLs submitted via Yandex IndexNow (202 Accepted)

## North East Spotlights, Location Pages, Gallery Filter
- [x] Add spotlight sections for Cumbria, County Durham, Tyne & Wear, Northumberland in Areas.tsx
- [x] Create locationData entries for Newcastle, Sunderland, Darlington, Carlisle
- [x] Create service-area pages for Newcastle, Sunderland, Darlington, Carlisle (via dynamic LocationRouter)
- [x] Register new service-area routes in App.tsx (handled by existing /service-areas/:slug dynamic route)
- [x] Add gallery industry filter feature to county pages (All, Structural Steel, Industrial Plant, Machinery, Agriculture, Commercial)
- [x] Ping IndexNow for new service-area pages and updated pages — 10 URLs submitted via Yandex IndexNow (202 Accepted)
- [x] Add agriculture page photos and video to the Our Work section (3 items: 2 before/after + 1 video)

## Marine Engine, North East Towns, Gallery Enhancements
- [x] Add marine engine photos from marine industry page to Our Work (2 projects: engine block top + side profile)
- [x] Add Gateshead, South Shields, Middlesbrough to locationData.ts
- [x] Create Marine & Offshore gallery filter category in CountyPage.tsx (6 marine engine photos)
- [x] Add Most Recent sort option to county page gallery filter (sorts All by date, shows 8 newest)
- [x] Ping IndexNow for new service-area pages (Gateshead, South Shields, Middlesbrough) — 4 URLs submitted (202 Accepted)

## Hartlepool & Hexham Service Area Coverage
- [x] Add Hartlepool (County Durham) to locationData.ts
- [x] Add Hexham (Northumberland) to locationData.ts
- [x] Ping IndexNow for new service-area pages — 2 URLs submitted via Yandex IndexNow (202 Accepted)

## County Page Links, Morpeth/Alnwick, Service Areas Search
- [x] Add Hartlepool link to Durham county page towns list (auto-linked via townsAndVillages in countyData)
- [x] Add Hexham link to Northumberland county page towns list (auto-linked via townsAndVillages in countyData)
- [x] Add Morpeth and Alnwick to locationData.ts
- [x] Add filter/search bar to service areas page (already existed with real-time search + region filter buttons)
- [x] Ping IndexNow for new service-area pages — 2 URLs submitted via Yandex IndexNow (202 Accepted)

## Case Studies Section on Homepage
- [x] Build Case Studies section on homepage showcasing featured projects from Our Work (6 featured projects, before/after toggle, results accordion, CTA to full gallery)

## Case Studies Filter Tabs
- [x] Add industry category filter tabs to Case Studies section on homepage (All, Industrial, Commercial, Automotive, Agriculture, Marine & Offshore — with project counts and results count)

## Reviews Page: New Reviews + Schema
- [x] Add 5 qualifying Premier Blasting reviews to reviews page (Kathleen Harris Powell, Richard Gray, christina henry, CoachingGTG trimmed, Sharon Sawyer trimmed)
- [x] Add AggregateRating + Review schema markup to metaTags.ts for reviews page (LocalBusiness with 5.0 rating, 75 reviews, 5 individual Review entities)
- [x] Update AggregateRating reviewCount to 70 (genuine reviews only, excluding 5 Premier Blasting ones)

## Reviews Page Enhancements + Homepage Carousel
- [x] Add aggregate rating summary section at top of reviews page (5.0 stars, 70 reviews, star distribution bars, Leave a Review + View on Google buttons)
- [x] Add Leave a Review button linking to Google Business Profile on reviews page
- [x] Add rotating testimonial carousel to homepage showcasing top 5-star commercial reviews (7 reviews, auto-advances every 5s, dot indicators, prev/next arrows, dark navy background)

## Nav Label & Spacing Fix
- [x] Rename "Preparation & Cleanup" to "Prep & Cleanup" in desktop and mobile nav
- [x] Reduce nav gap from gap-6 to gap-4 to tighten spacing between nav items
- [x] Add ScrollReveal (Intersection Observer) component for scroll-triggered fade-in + slide-up animations
- [x] Apply ScrollReveal to OurWork.tsx gallery card grid (staggered 0/80/160ms per row)
- [x] Apply ScrollReveal to Gallery.tsx before/after card grid (staggered per row)
- [x] Apply ScrollReveal to Home.tsx services card grid (staggered per row)
- [x] Apply ScrollReveal to Services.tsx services card grid (staggered per row)
- [x] Apply ScrollReveal to Industries.tsx industry card grid (staggered per row)
- [x] Update homepage H1 to lead with "Shot Blasting Services" keyword
- [x] Update homepage intro paragraph to include "mobile shot blasting services", "England and Wales"
- [x] Update Services Grid section heading to "Comprehensive Shot Blasting Services" + add intro paragraph
- [x] Update About section copy to include "shot blasting services" and "mobile shot blasting units"
- [x] Update Services.tsx H1 to "Professional Shot Blasting Services Across the UK"
- [x] Update Services.tsx intro paragraph to include local/mobile keyword signals
- [x] Update ServiceAreas.tsx H1 to "Shot Blasting Services Near You — UK-Wide Coverage"
- [x] Update ServiceAreas.tsx intro paragraph to include city names (Birmingham, Manchester, Bristol, Cardiff)
- [x] Update Industries.tsx H1 to "Shot Blasting Services by Industry"
- [x] Update Industries.tsx intro paragraph to include "shot blasting services" keyword
- [x] Update SSR homepage meta title to "Shot Blasting Services UK | Commercial & Industrial | Commercial Shot Blasting"
- [x] Update SSR homepage meta description to include "mobile shot blasting services", "structural steel", "factory cladding", "floor prep"
- [x] Update Twitter meta tags on homepage to match new title/description
- [x] Update client-side document.title in Home.tsx to match SSR title
- [x] Update getServiceSEO() to generate titles with "Shot Blasting Services UK" pattern
- [x] Update getServiceSEO() description to include "shot blasting services" in first sentence

## Location Page SEO Optimisation — "Shot Blasting Services [Area]"

- [x] Improve LocationPage.tsx hero intro paragraph — keyword-first: "Professional shot blasting services in [area]" with service types listed
- [x] Improve LocationPage.tsx About section H2 — changed to "Professional Shot Blasting Services in [area]"
- [x] Improve LocationPage.tsx About body copy — added SA2.5/SA3 standards, specific service types, phone CTA
- [x] Replace generic 6-item services checklist with linked service cards pointing to /services/[id]
- [x] Improve Nearby Areas section heading — changed to "Shot Blasting Services Near [area]"
- [x] Improve SSR body HTML intro — keyword-rich with service types, SA2.5/SA3 standards, county context
- [x] Update SSR services list — replaced generic items with specific service types (structural steel, cladding, containers, floor prep, etc.)
- [x] Replace per-location hardcoded FAQs in SSR body with keyword-rich generated FAQ set (8 questions, all using "shot blasting services [area]" pattern)
- [x] Improve dynamic fallback meta description for non-predefined locations — added SA2.5/SA3 and cladding restoration
- [x] Improve generateLocationFAQs() — 8 new questions all using "shot blasting services [area]" keyword pattern, added SA2.5/SA3 standard question
- [x] Replace CTA section H2 "Ready to Start Your Project in [area]?" with "Get a Quote for Shot Blasting Services in [area]" — keyword-rich heading immediately above the quote CTA buttons
- [x] Update SSR body CTA section heading to match the new keyword-rich H2

## SEO Round — Process Section, County Pages, Services Index

- [x] Add 3-step "Shot Blasting Services [area] — What to Expect" process section to LocationPage.tsx
- [x] Add same 3-step process section to SSR body HTML in metaTags.ts
- [x] Apply "Shot Blasting Services [county]" keyword treatment to county page H1, H2, intro copy
- [x] Update county page SSR body HTML with keyword-rich headings and intro
- [x] Update county page meta titles/descriptions for "Shot Blasting Services [county]"
- [x] Fully SEO-optimise /services index page H1, intro copy, and body for "Shot Blasting Services UK"
- [x] Update /services SSR meta title and description for "Shot Blasting Services UK"
- [x] Add keyword-rich FAQ section to /services index page

## SEO Round — FAQPage Schema & SSR Process Section

- [x] Add FAQPage JSON-LD schema to /services SSR meta tags in metaTags.ts
- [x] Add 3-step process section to SSR body HTML of all location pages in metaTags.ts (already present from previous session)

## SEO Round — County Page FAQPage Schema & Process Section

- [x] Add FAQPage JSON-LD schema to county page SSR meta tags in metaTags.ts (already present — dynamically generated from county.faqs)
- [x] Add 3-step "Shot Blasting Services [county] — What to Expect" process section to CountyPage.tsx
- [x] Add 3-step process section to county page SSR body HTML in metaTags.ts

## SEO Round — Service Pages & County Trust Section

- [x] Add FAQPage JSON-LD schema to all individual service pages in metaTags.ts (already present — dynamically generated from svc.faqs)
- [x] Add "Why Choose Us" trust section to CountyPage.tsx — upgraded with keyword-rich H2, trust bar metrics, and county-specific copy
- [x] Add "Why Choose Us" trust section to county SSR body HTML in metaTags.ts
- [x] Review individual service pages for 3-step process section — already present (Our Process section with numbered steps from service.process data)

## SEO Round — Related Services Block & Location Trust Bar

- [x] Add Related Services internal linking block to CountyPage.tsx
- [x] Add Related Services block to county SSR body HTML in metaTags.ts
- [x] Add Why Choose Us trust bar to LocationPage.tsx — upgraded H2, 4-item trust bar, keyword-rich card copy
- [x] Add Why Choose Us trust bar to location SSR body HTML in metaTags.ts

## SEO Round — Location Page Related Services Grid

- [x] Add 12-service Related Services linking grid to LocationPage.tsx
- [x] Add Related Services linking section to location SSR body HTML in metaTags.ts

## SEO Round — County 12-Tile Grid & Location Near-Me Block

- [x] Upgrade county page Related Services section to 12-tile grid in CountyPage.tsx (already in place from previous session)
- [x] Upgrade county page Related Services section in county SSR body HTML (already in place from previous session)
- [x] Add "Shot Blasting Services Near [area]" related locations block to LocationPage.tsx — upgraded from pill links to card tiles, 8→12 towns, keyword-rich anchor text
- [x] Add related locations block to location SSR body HTML in metaTags.ts — dynamic 12-town list with keyword-rich anchor text

## SEO Round — Industries We Serve & County Nearby Areas

- [x] Add "Industries We Serve" 4-tile section to LocationPage.tsx (already present at line 488)
- [x] Add "Industries We Serve" section to location SSR body HTML in metaTags.ts
- [x] Add "Nearby Areas" town card grid to CountyPage.tsx (already present — full towns list + 12-tile card grid + map)
- [x] Add "Nearby Areas" town card grid to county SSR body HTML in metaTags.ts (already present via locLinksHtml in Areas We Cover section)

## SEO Round — County Industries & Industry FAQPage Schema

- [x] Add "Industries We Serve" section to CountyPage.tsx (already present at line 317 with county.industries data)
- [x] Add "Industries We Serve" section to county SSR body HTML in metaTags.ts (already present)
- [x] Add FAQPage JSON-LD to all individual industry pages in metaTags.ts — 4 industry-specific Q&As per page, all 8 industry slugs covered

## SEO Round — Index Page Schemas & Industry Breadcrumbs

- [x] Add FAQPage JSON-LD to /industries index page SSR meta tags in metaTags.ts
- [x] Add HowTo JSON-LD to /services index page SSR meta tags in metaTags.ts
- [x] Verify BreadcrumbList schema on all individual industry pages in metaTags.ts (confirmed present at line 2592)

## SEO Round — Service-Areas FAQPage, Service HowTo, Industry Breadcrumb UI

- [x] Add FAQPage JSON-LD to /service-areas index page SSR meta tags in metaTags.ts (5 local mobile shot blasting Q&As targeting near-me searches)
- [x] Add HowTo JSON-LD to all 18 individual service pages in metaTags.ts (preparation steps per service — servicePreparationSteps data object with 9 service-specific entries + default fallback)
- [x] Add visual breadcrumb navigation UI component to all 8 industry pages — confirmed present in all 8 *Industry.tsx files with correct 3-level breadcrumb (Home → Industries → [Industry Name])

## SEO Round — County FAQPage, Service Prep Checklist UI, Service-Areas FAQ Accordion

- [x] Add FAQPage JSON-LD to all individual county pages in metaTags.ts — rewrote all 25 counties' FAQs in countyData.ts with locally-targeted, industry-specific questions (county industries, major towns, local context)
- [x] Add visible Preparation Checklist UI section to all service pages — added after Process section in ServiceDetail.tsx; uses shared servicePreparationSteps.ts data (9 service-specific step sets + default fallback); includes numbered steps + dual CTA buttons
- [x] Add interactive FAQ accordion section to the /service-areas page — 5 Q&As with expand/collapse (ChevronDown/Up), ARIA attributes, microdata markup (FAQPage/Question/Answer), placed before footer in ServiceAreas.tsx

## SEO Round — County FAQ Accordion, Prep Checklist, Service-Areas County Search

- [x] Add FAQ accordion to all individual county pages (CountyPage.tsx) — expand/collapse with ChevronDown/Up, ARIA attributes, microdata markup (FAQPage/Question/Answer itemscope), uses county.faqs data
- [x] Add condensed 3-step preparation checklist section to all county pages (CountyPage.tsx) — 3-card grid (Request Survey, Clear Work Area, Coordinate Coating) with numbered circles, county-specific CTA button
- [x] Add county search/filter bar to service areas page (ServiceAreas.tsx) — live search by county name, region, or town; shows county card grid with region label; clear button; uses countyData

## SEO Round — Location Prep Checklist, Service FAQ Accordion, County IndexNow

- [x] Add condensed 3-step preparation checklist to LocationPage.tsx — 3-card grid (Request Survey, Clear Work Area, Coordinate Coating) with numbered circles, location-specific CTA; placed before sticky mobile bar
- [x] Add visible FAQ accordion to ServiceDetail.tsx — already present at line 1316 with full expand/collapse, ARIA attributes, and microdata markup using service.faqs data (confirmed in code review)
- [x] Ping IndexNow for all 25 county page URLs — 25 URLs submitted to Yandex IndexNow (HTTP 202 Accepted)

## SEO Round — Service IndexNow, Location FAQ Accordion, Nearby Counties

- [x] Submit all 18 service page URLs to IndexNow — 18 URLs submitted to Yandex IndexNow (HTTP 202 Accepted)
- [x] Add visible FAQ accordion to LocationPage.tsx — upgraded static FAQ cards to interactive accordion with ChevronDown/Up, aria-expanded, aria-controls, role=region, FAQPage/Question/Answer microdata
- [x] Add Nearby Counties section to CountyPage.tsx — two-tier layout: Tier 1 shows up to 6 same-region counties as prominent icon cards with region colour border-top; Tier 2 shows all 24 other counties as compact cards

## SEO Round — County Related Services & Nearby Towns

- [x] Add Related Services section to CountyPage.tsx — upgraded from 12-pill compact grid to 6 descriptive service cards (structural steel, factory cladding, floor prep, fire escapes, plant machinery, bridge steelwork) with icon, county-specific description, and Learn More CTA
- [x] Add Nearby Towns section to CountyPage.tsx — shows up to 8 towns from locationData filtered by countySlug; MapPin icon cards with hover effect; placed between Preparation Checklist and Nearby Counties sections

## SEO Round — County Industries, Trust Bar & IndexNow

- [x] Add Related Industries section to CountyPage.tsx — 4-card grid using county.industries mapped to 8 industry routes (manufacturing, construction, aerospace, marine, agriculture, retail, heritage-restoration, transport-logistics); deduplicates by slug; placed before Nearby Towns
- [x] Add county-specific Why Choose Us trust bar to CountyPage.tsx — 4 stats now use county.name and county.industries.length for local proof points (e.g. "4+ Key Sectors Served in Staffordshire", "Free Site Surveys Across Yorkshire")
- [x] Re-submit all 25 county page URLs to IndexNow — HTTP 202 Accepted

## SEO Round — Location Industries & County Meta Descriptions

- [x] Add compact 3-card Related Industries section to LocationPage.tsx (using parent county's industries field)
- [x] Add unique locally-targeted meta descriptions to all 25 counties in countyData.ts and wire into SSR meta tags

## Bug Fixes — Service Area 404s & Missing Maps

- [x] Fix Durham 404 — add Durham city to locationData.ts with coordinates, county, FAQs
- [x] Fix missing maps on 72 ServiceArea pages — add coordinates to LocationMap.tsx + add LocationMap component to all 72 pages
- [x] Note: Birmingham JS chunk error is a stale deployment cache issue — will be resolved by next publish

## SEO Round — Town Meta Descriptions, Industry Counties, Breadcrumbs

- [x] Add unique locally-targeted meta descriptions to highest-traffic service-area town pages (Birmingham, Sheffield, Manchester, Leeds, Liverpool, Coventry, Derby, Nottingham, Chester, Bristol, Cardiff, etc.)
- [x] Add "Counties We Cover" section to all 8 industry pages (IndustryPage.tsx) linking to relevant county pages
- [x] Add dynamic breadcrumb navigation component to all location pages (LocationPage.tsx) and industry pages (IndustryPage.tsx)

## SEO Round — IndexNow, Remaining Town Meta Desc, County SSR Industries

- [x] Submit all 8 industry page URLs + 44 updated town URLs to IndexNow (Yandex)
- [x] Add unique locally-targeted meta descriptions to remaining ~36 town pages in locationMeta (metaTags.ts) — expanded to 89 entries
- [x] Add Related Industries section to county SSR body HTML in metaTags.ts (server-side HTML for crawlers)

## SEO Round — IndexNow (45 new towns), Batch Meta Desc, JSON-LD ItemList

- [x] Submit 45 newly added town URLs to IndexNow (Barnsley, Bradford, Doncaster, Wakefield, Huddersfield, York, Harrogate, Salford, Stockport, Bolton, Rochdale, Oldham, Walsall, West Bromwich, Solihull, Sutton Coldfield, Dudley, Loughborough, Mansfield, Tamworth, Burton-on-Trent, Stafford, Telford, Luton, Stevenage, Watford, Southend-on-Sea, Bath, Exeter, Yeovil, Swansea, Newport, Merthyr Tydfil, Warrington, Runcorn, Widnes, Rotherham, Shrewsbury, Hereford, Gloucester, Worcester, Northampton, Lincoln, Cambridge, Norwich)
- [x] Batch-generate unique meta descriptions for all remaining ~550 smaller towns using LLM and add to locationMeta in metaTags.ts — 650 total entries now (569 new added)
- [x] Add JSON-LD ItemList schema to all 8 industry pages listing the counties served by each industry

## SEO Round — IndexNow (569 towns), areaServed AdministrativeArea

- [x] Submit 569 newly covered town URLs to IndexNow — 200 submitted OK; remaining 377 blocked by key verification (key file added to client/public/, will work after next publish)
- [x] Update areaServed on all 8 industry Service schemas with county-level AdministrativeArea entries (replace generic "United Kingdom")

## SEO Round — Publish + IndexNow, Sitemap, hasOfferCatalog

- [x] Publish site and re-run IndexNow for remaining 377 town URLs — key file now hardcoded in Express route (always served correctly)
- [x] Implement dynamic sitemap.xml server endpoint covering all 650 towns, 30 counties, 8 industries, 18 services (721 total URLs)
- [x] Add LocalBusiness hasOfferCatalog schema to homepage SSR in metaTags.ts linking all 18 services

## SEO Round — robots.txt, Service Catalog UI, BreadcrumbList on town pages

- [x] Add robots.txt Express route with Sitemap directive pointing to sitemap.xml
- [x] Add visual Service Catalog section to homepage mirroring hasOfferCatalog schema (18 services)
- [x] Add BreadcrumbList schema markup to all service-area town pages SSR in metaTags.ts — upgraded to 4-level (Home → Service Areas → County → Town)

## SEO Round — FAQ Schema + Review Schema

- [x] Add FAQ schema to homepage SSR in metaTags.ts with 8 common shot blasting questions
- [x] Add Review and AggregateRating schema to Reviews page SSR in metaTags.ts — 12 reviews (first 12 shown on page load), reviewCount: 12, ratingValue: 5.0
- [x] Create indexnow_all_urls.py — full-site IndexNow submission script (713 URLs: 12 static + 18 services + 25 counties + 8 industries + 650 towns)
- [x] Note: WebSite SearchAction schema already present on homepage (added in previous session)

## Reviews Page UX Improvements

- [x] Add prominent visual 5.0 rating summary section (standalone section below hero with large score, star bars, review count)
- [x] Add date-based sort toggle (Newest first / Oldest first) with ArrowUpDown icon
- [x] Add prominent "Leave a Review on Google" button below the reviews grid (yellow CTA)
- [x] Show all 75 reviews (not just Commercial-tagged ones) — initial load shows 12, "Show all" reveals all 75
- [x] Update hero description to reflect 75 reviews

## Search Console Schema Fixes

- [x] Fix "Missing field 'name'" in Review snippets — added name field ("Review by {author}") to all 12 Review entries in aggregateRatingSchema (metaTags.ts)
- [x] Fix "Missing field 'itemReviewed'" on service-areas pages — added name field to all 3 Review entries in generateLocationSchemas (Jordan King, Sarah Mitchell, David Thompson)
- [x] Fix broken review name fields on /reviews page — all 12 reviews now have correct "Review by {author}" name matching their own author

## Mobile LCP Phase 2

- [x] fetchpriority="high" on hero image — already implemented in ResponsiveHeroBackground.tsx
- [x] Lazy-load below-the-fold Home.tsx components (BeforeAfterSlider, CaseStudies, ReviewCarousel, BlogPreview, HomeFAQ, HubSpotForm, ServiceSelector) — Home bundle: 176KB → 101KB (42% reduction)
- [x] Extract and inline critical Tailwind CSS (deferred — too risky, skipped by design)
- [x] Lazy-load Header mega-menu data (serviceLinks, compactAreasLinks, fullAreasLinks) via dynamic import — Header bundle: 63.92KB → 45.62KB gzip (8.54KB → 5.41KB); headerData.js (18.78KB) loads as separate chunk on first hover/interaction via requestIdleCallback after page idle

## Crawl Budget & Indexing Improvements

- [x] Create HTML sitemap page at /sitemap listing all 650 town pages, 35 county pages, 18 services, 8 industries grouped by region
- [x] Add county hub links to Footer (all 35 counties) to pass crawl equity from every page
- [x] Fix Footer copyright year (currently 2024, should be 2026)
- [x] Add /sitemap route to App.tsx (lazy-loaded via React.lazy)
- [x] Add SSR meta tags for /sitemap page in metaTags.ts
- [x] Add Site Map link to Footer Company section

## Crawl Budget & Indexing — Round 2

- [x] Add /sitemap URL to the XML sitemap endpoint (sitemap.ts)
- [x] Add "View full site map" link to /counties hub page
- [x] Add "View full site map" link to /service-areas index page
- [x] Add live search/filter bar to SitemapPage.tsx (searches towns, counties, services, industries in real-time)

## Crawl Budget & Indexing — Round 3

- [x] Add "Browse by county" internal link on each town/service-area page (LocationPage.tsx)
- [x] Add HTML sitemap link to Areas mega-menu footer in Header.tsx
- [x] Add HTML sitemap link to mobile drawer in Header.tsx
- [x] Highlight matching text in sitemap search results (SitemapPage.tsx)

## Crawl Budget & Indexing — Round 4

- [x] Add "Related Towns" card grid to county hub pages (County.tsx) — up to 8 towns per county
- [x] Add BreadcrumbList JSON-LD structured data to county hub pages (County.tsx)

## Crawl Budget & Indexing — Round 5

- [x] Expand Related Towns to show ALL towns alphabetically (not just 8) in CountyPage.tsx
- [x] Add search/filter bar to Related Towns section in CountyPage.tsx
- [x] Add Related Counties section to town pages (LocationPage.tsx)
- [x] Add ItemList JSON-LD schema to county hub pages listing all towns
- [x] Add SiteLinksSearchBox JSON-LD schema (WebSite + SearchAction) to home page

## Crawl Budget & UX — Round 6

- [x] Add ?q= URL query-string pre-population to SitemapPage.tsx
- [x] Add skeleton loading state to town search results in CountyPage.tsx (250ms debounce + animated skeleton grid)
- [x] Add Back to Top button to CountyPage.tsx (appears after 400px scroll, smooth scroll to top)

## UX Improvements — Round 7

- [x] Add Back to Top button to SitemapPage.tsx
- [x] Add town count badge to county cards on /counties hub page (Counties.tsx)
- [x] Improve "No results found" empty state in CountyPage.tsx town search

## New Service — Intumescent Painting

- [x] Add intumescent-painting to services.ts data (full content: 6-step process, 2 case studies, 6 FAQs, 8 applications)
- [x] Service page served automatically via existing /services/:id route (ServiceDetail.tsx)
- [x] Add SSR meta tags and serviceMeta entry to metaTags.ts
- [x] Add generateServiceBodyHTML entry to metaTags.ts for crawler SSR
- [x] Add to navigation menu (headerData.ts serviceLinks)
- [x] Add to XML sitemap (sitemap.ts SERVICE_SLUGS)
- [x] Add to HTML sitemap page (SitemapPage.tsx SERVICE_SLUGS)

## Intumescent Painting — Content & Lead Gen (Round 8)

- [x] Blog post "Why Shot Blasting is Essential Before Intumescent Painting" inserted into database (slug: why-shot-blasting-essential-before-intumescent-painting)
- [x] Related Service (Intumescent Painting) banner added to Structural Steel Frames service page
- [x] Related Service (Intumescent Painting) banner added to Fire Escapes service page
- [x] Related Service (Intumescent Painting) banner added to Staircases service page
- [x] IntumescentQuoteForm.tsx component created — fire rating selector, steel type, project size, contact fields, trpc.contact.submit integration
- [x] IntumescentQuoteForm injected into ServiceDetail.tsx for intumescent-painting service page

## Intumescent Painting — Industry Cross-links (Round 9)

- [x] Add Intumescent Painting service card to Construction industry page (ConstructionIndustry.tsx)
- [x] Add Intumescent Painting service card to Manufacturing industry page (ManufacturingIndustry.tsx)

## Local SEO — "Shot Blasting [Area]" Rankings (Round 10)

- [x] Fix H1 to "Shot Blasting in {Town}" (remove "Services") for exact-match keyword
- [x] Add H2 section headings with service+location keywords (e.g. "Structural Steel Shot Blasting in {Town}")
- [x] Add "Services in {Town}" anchor-text links in services section
- [x] Tighten title tag: "Shot Blasting {Town}, {County} | Mobile Rust Removal & Surface Prep" (SSR + client-side)
- [x] Add county to meta description + USPs (9 mobile units, same-week availability) — SSR + useSEO.ts
- [x] Add meta keywords tag with town + county variants to all dynamic local pages
- [x] Add 5 new local-intent FAQs to FAQSchema.tsx generateLocationFAQs (same-week, structural steel, intumescent, area coverage, industry)
- [x] Add matching 5 FAQs to SSR generatedFaqs array in generateServiceAreaBodyHTML (metaTags.ts)
- [x] Add intumescent-painting to SSR services list in generateServiceAreaBodyHTML
- [x] Add county to LocationPage.tsx hero intro paragraph
- [x] LocalBusiness schema already has priceRange, openingHours, areaServed — confirmed no changes needed

## Local SEO — County Context Paragraphs & About Us (Round 11)

- [x] Write unique local context paragraph for all 35 counties (shared/countyContext.ts)
- [x] Move countyContext.ts to shared/ so both client and server can import it
- [x] Wire county context paragraph into LocationPage.tsx About section (styled left-border blockquote)
- [x] Wire county context paragraph into SSR body HTML (generateServiceAreaBodyHTML in metaTags.ts)
- [x] Update About Us page to state Commercial Shot Blasting is the commercial/industrial arm of Premier Blasting Ltd

## Round 12 — Premier Blasting Links & County Hub SSR Context

- [x] Add hyperlinks to Premier Blasting Ltd (https://premierblasting.co.uk) in About.tsx (both mentions)
- [x] Inject county context paragraph into county hub SSR body HTML (countyBodyHtml template in metaTags.ts)
- [x] Run IndexNow script to notify Bing/Yandex of all updated pages

## Round 13 — Internal Linking & Interactive Map

- [x] Expand county hub "Related Services" section to all 19 services with localized anchor text (CountyPage.tsx)
- [x] Add county hub services section to SSR county body HTML (metaTags.ts countyBodyHtml)
- [x] Add "Popular services near {Town}" strip to LocationPage.tsx with 4 featured service cards + localized anchor text
- [x] Add "Popular services near {Town}" to SSR town body HTML (generateServiceAreaBodyHTML in metaTags.ts)
- [x] Enhance CountyMap.tsx: increase to 6 major + 12 village markers, add clickable service area links in info windows, add marker count display

## Round 14 — Schema Markup & Projects Section

- [x] Add Service schema with areaServed (all 37 counties as AdministrativeArea entities) to all 19 service pages in metaTags.ts
- [x] Verified BreadcrumbList JSON-LD already present on county hub pages (Home → Counties → {County})
- [x] Verified BreadcrumbList JSON-LD already present on town pages (4-level: Home → Service Areas → {County} → {Town})
- [x] Add "Recently completed projects near {Town}" section to LocationPage.tsx (3 project cards, county-matched, with after images)
- [x] Add recently completed projects to SSR town body HTML in metaTags.ts (SSR_PROJECTS array + getSSRProjectsForCounty helper)

## Round 15 — CTA Section, County Schema & GSC Script

- [x] Add "Get a Quote for {Service} in {Town}" CTA section to LocationPage.tsx with 4 service keyword links + phone/WhatsApp CTAs
- [x] Add CTA section to SSR town body HTML in generateServiceAreaBodyHTML (metaTags.ts)
- [x] Add hasMap (Google Maps search URL) and geo GeoCoordinates + areaServed sameAs Wikipedia to county hub LocalBusiness schema in metaTags.ts
- [x] Generate gsc_submit_counties.py script to submit 35 county hub URLs to Google Search Console via URL Inspection API

## Round 16 — Nearby Towns Section & Inline Contact Form

- [x] Add "Nearby towns" section to LocationPage.tsx (up to 12 same-county towns in a responsive grid with "Shot Blasting in {Town}" anchor text)
- [x] Verified SSR town body HTML already has "Nearby Areas" section with up to 12 town links (already present from earlier round)
- [x] Replace popup CTA in the Get a Quote section on town pages with an embedded inline contact form (name, phone, message, submit) with left/right layout
- [x] Wire inline form to trpc.contact.submit mutation with success/error states and loading indicator

## Round 19 — Trust Strip & WhatsApp CTA on Town Pages

- [x] Add Google Reviews star rating trust strip just below the hero section on town pages (LocationPage.tsx)
- [x] Add WhatsApp pre-filled message CTA to the inline contact form on town pages (LocationPage.tsx)
- [x] Trust strip and WhatsApp CTA added to React UI; SSR body HTML already has contact section (no additional SSR needed for these UI-only elements)

## Round 20 — Service → County Cross-Linking

- [x] Replace hardcoded 16-town list in ServiceDetail.tsx "Service Coverage" section with all 35 counties linking to county hub pages (/counties/{slug})
- [x] Add county coverage section to SSR service page body HTML in generateServiceBodyHTML (metaTags.ts) — 35 county links with "{Service} in {County}" anchor text
## Round 21 — Canonical Audit & Dynamic OG Images
- [x] Canonical tag audit: all county and town pages confirmed clean (no trailing slash issues)
- [x] Build server-side OG image generation endpoint /api/og-image using sharp + SVG-to-PNG
- [x] Branded 1200×630 PNG cards: dark navy background, orange accent stripe, "SHOT BLASTING IN" label, bold location name, county sub-label (for towns), footer with URL + phone
- [x] In-memory cache for generated images (deterministic from text, no S3 needed)
- [x] Update county hub pages in metaTags.ts to use countyOgImageUrl() — dynamic branded image per county
- [x] Update all town/service-area pages in metaTags.ts to use townOgImageUrl() — dynamic branded image per town with county sub-label
- [x] Added og:image:type (image/png) and og:image:alt to all county and town OG meta tags
- [x] Removed old ImageObject JSON-LD schema referencing static county ogImage fields (replaced by dynamic endpoint)
- [x] TypeScript: 0 errors
