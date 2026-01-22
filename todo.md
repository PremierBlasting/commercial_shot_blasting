# Commercial Shot Blasting Website Migration TODO

## Database Schema Migration
- [x] Migrate gallery_items table schema
- [x] Migrate testimonials table schema
- [x] Migrate contact_submissions table schema
- [x] Migrate blog_posts table schema
- [x] Migrate call_tracking table schema
- [x] Push database migrations

## Server-Side Code Migration
- [x] Migrate server/db.ts query helpers
- [x] Migrate server/routers.ts tRPC procedures
- [x] Migrate server/storage.ts S3 helpers

## React Pages Migration
- [x] Migrate Home page
- [x] Migrate Gallery page
- [x] Migrate Blog and BlogPost pages
- [x] Migrate Admin page
- [x] Migrate ServiceDetail page
- [x] Migrate ServiceAreas page
- [x] Migrate all 32 location landing pages
- [x] Migrate industry pages (Construction, Manufacturing, Retail, Aerospace)
- [x] Migrate PrivacyPolicy and Terms pages
- [x] Migrate CallAnalytics page
- [x] Migrate FreeSiteSurvey page

## Components Migration
- [x] Migrate Header with mega menu
- [x] Migrate Footer
- [x] Migrate BeforeAfterSlider
- [x] Migrate LocationMap
- [x] Migrate ServiceAreasMap
- [x] Migrate ServiceSelector
- [x] Migrate CookieConsent
- [x] Migrate FloatingCallButton
- [x] Migrate HubSpotForm and QuotePopup
- [x] Migrate BlogPreview
- [x] Migrate CaseStudy
- [x] Migrate Breadcrumb
- [x] Migrate TrackedPhoneButton
- [x] Migrate ImageUpload
- [x] Migrate LocalBusinessSchema
- [x] Migrate BackToTop
- [x] Migrate OptimizedImage

## Static Assets Migration
- [x] Copy all images from client/public
- [x] Copy favicon and branding assets
- [x] Copy PDF resources

## Configuration
- [x] Update App.tsx with all routes
- [x] Update index.css with custom styles
- [x] Update index.html with HubSpot scripts and fonts
- [x] Add required dependencies to package.json

## Testing & Deployment
- [x] Test all pages load correctly
- [x] Test database connectivity
- [x] Save checkpoint
- [x] Verify permanent hosting

## Bug Fixes
- [x] Fix tRPC API error on Gallery page (returning HTML instead of JSON)
- [x] Fix Google Maps script loading failure
- [x] Fix breadcrumb styling on location pages (Wolverhampton and others) - make inline like Birmingham
- [x] Add Header component to all location pages missing it (Milton Keynes, Wolverhampton, etc.)
- [x] Build gallery management interface in admin CMS
- [x] Add image upload functionality with S3 integration
- [x] Add gallery item editing (title, description, category, active status)
- [x] Add gallery item deletion with confirmation
- [x] Add category filtering and search functionality
- [x] Add active/inactive toggle for gallery items
- [x] Fix incorrect service URLs in ServiceSelector component (telecom-masts should be telecom-towers, etc.)
- [x] Change contact page URL from /#contact to /contact (dedicated page)
- [x] Create dedicated About page at /about (keep #about on homepage too)
- [x] Remove duplicate "Shot Blasting" header bars from pages (keep only "Commercial Shot Blasting" header)
- [x] Create comprehensive Services page at /services with card grid layout
- [x] Make Services menu item in header clickable to navigate to /services page
- [x] Remove three testimonial reviews from Home page (keep only Jordan King factory cladding review)
- [x] Remove "Made with Manus" branding button from all pages (not in source code - platform injected in preview only)
- [x] Check and remove extra reviews from other pages if present (removed from Gallery page)
- [x] Adjust testimonial review images to be taller and more square-shaped
- [x] Increase testimonial image height significantly to create much more square aspect ratio
- [x] Add content block to fill empty space on left side of contact form section
- [x] Replace before and after images on Structural Steel Frames service page
- [ ] Design database schema for WordPress-style page content management
- [ ] Create tRPC procedures for page content CRUD operations
- [ ] Build Admin Pages section UI with content editor
- [ ] Implement Home page content editor with all sections editable
- [ ] Update Home page to consume content from database instead of hardcoded
- [ ] Expand CMS to other pages (Services, Gallery, About, Contact, etc.)
- [ ] Write vitest tests for page content management procedures
- [x] Fetch content and images from https://premierblasting.co.uk/steel-container-blasting
- [x] Replace Crane Beams service with Steel Container Blasting service
- [x] Move Steel Container Blasting to 2nd position in services order
- [x] Update service data files with steel container content
- [x] Update Home page services grid with new service and reordering
- [x] Create/update steel container service detail page with content and images
- [x] Update navigation menus and all service references across site
- [x] Add two before/after sections to Steel Container Blasting service page with real project images
