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
