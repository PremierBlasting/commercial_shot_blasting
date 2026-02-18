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
- [x] Fix Steel Container Blasting page to display two separate before/after galleries
- [x] Reorder galleries so storage tank appears first, then industrial container
- [x] Separate two before/after galleries on Steel Container page with content sections between them
- [ ] Fetch content from Premier Blasting floor preparation page
- [ ] Fetch content from Premier Blasting powder coating page
- [ ] Create Floor Preparation (Shot Blasting Floors) service page
- [ ] Create Powder Coating (End-to-End Projects) service page
- [ ] Create Factory Cladding Blasting service page using review content
- [ ] Add factory cladding review images to new service page
- [ ] Update Find Your Perfect Service tool with Steel Containers, Floor Preparation, Powder Coating, and Factory Cladding
- [ ] Update navigation menus with new services
- [x] Create downloadable PDF checklist for site preparation
- [x] Add download button to Preparation & Cleanup page
- [x] Remove before/after galleries and case study sections from 7 service pages (fire-escapes, staircases, bridge-steelwork, ladders, warehouse-racking, pipework, telecom-towers)
- [x] Replace main image on Preparation & Cleanup page with clean warehouse photo
- [x] Remove all mentions of blasting at facility (we only do mobile blasting at client premises)
- [x] Remove all mentions of standards and certification (SA 2.5, SA 3, ISO 8501, certifications, etc.)
- [x] Replace main hero image on Preparation & Cleanup page with clean warehouse photo
- [x] Update Services page images to match homepage service images
- [x] Remove duplicate header bar from all local service area pages (Leicester, etc.)
- [x] Add unique preparation and cleanup sections to all 31 local service area pages
- [x] Rename Factory Cladding to Factory & Warehouse Cladding
- [x] Add before/after photo gallery to Factory & Warehouse Cladding page
- [x] Move Factory & Warehouse Cladding to 3rd position in all service lists
- [x] Update all references to factory-cladding service
- [x] Copy 5 factory cladding images to public directory (w.jpeg, 2.jpeg, 3.jpeg, 4.jpeg, 6.jpeg)
- [x] Add before/after gallery to Factory & Warehouse Cladding service page
- [x] Create comprehensive case study for Factory & Warehouse Cladding with all project images
- [x] Copy 4 structural steel frames images to public directory (before, during, after1, after2)
- [x] Remove existing Structural Steel Frames gallery
- [x] Create before/during/after gallery section for Structural Steel Frames
- [x] Add comprehensive case study to Structural Steel Frames service
- [x] Restructure Services dropdown menu to show all 12 services in multi-column layout
- [x] Add "View All Services" link to Services dropdown menu
- [x] Restructure Industries dropdown menu to multi-column layout for scalability
- [x] Update mobile Industries menu to accommodate future expansion
- [x] Fix mobile Services menu to show all 12 services and "View All Services" link
- [x] Verify mobile Industries menu displays correctly
- [x] Convert mobile Services menu to mega menu grid layout (like desktop)
- [x] Convert mobile Industries menu to mega menu grid layout (like desktop)
- [x] Remove accordion/collapsible style from mobile menus
- [x] Copy 7 steel gates images to public directory (4 before, 2 during, 1 after)
- [x] Add Steel Gates & Railings service to services.ts with comprehensive case study
- [x] Create custom before/during/after gallery section for steel-gates service in ServiceDetail
- [x] Add Steel Gates & Railings to Header navigation menu (desktop and mobile)
- [x] Add Steel Gates & Railings to Home page services grid
- [x] Add Steel Gates & Railings to Services page services list
- [x] Position Steel Gates & Railings appropriately in service ordering (4th position after Factory & Warehouse Cladding)
- [x] Move Steel Gates & Railings to bottom of all service lists (13th position - last service)
- [x] Update services.ts service order
- [x] Update Header.tsx navigation menu service order
- [x] Update Home.tsx services grid order
- [x] Update Services.tsx services list order
- [x] Add external staircase shot blasting image to Fire Escapes & External Stair Towers service page
- [x] Copy external staircase image to public directory
- [x] Integrate image into fire-escapes service page layout
- [x] Create new Steel Sheeting Shot Blasting service page
- [x] Add steel-sheeting service definition to services.ts with comprehensive content
- [x] Add Steel Sheeting to Header navigation menu (desktop and mobile)
- [x] Add Steel Sheeting to Home page services grid
- [x] Add Steel Sheeting to Services page services list
- [x] Position Steel Sheeting appropriately in service ordering (14th position, before Steel Gates)
- [x] Remove case study from Steel Sheeting service page in services.ts
- [x] Copy 5 container images to public directory (3 before, 2 after)
- [x] Add before/after case study gallery to Steel Containers service page in ServiceDetail.tsx
- [x] Create comprehensive case study content for steel container restoration
- [x] Create new Commercial Radiators Shot Blasting service page
- [x] Copy 9 radiator images to public directory (before and after)
- [x] Add commercial-radiators service definition to services.ts with comprehensive content
- [x] Add before/after case study gallery to Commercial Radiators service page in ServiceDetail.tsx
- [x] Add Commercial Radiators to Header navigation menu (desktop and mobile)
- [x] Add Commercial Radiators to Home page services grid
- [x] Add Commercial Radiators to Services page services list
- [x] Position Commercial Radiators appropriately in service ordering (14th position, before Steel Sheeting)
- [x] Create new Commercial & Agricultural Vehicle Shot Blasting service page with 9 images from two projects
- [x] Copy 9 vehicle images to public directory (1 wheel before, 3 complete vehicle after wheels, 5 chassis restoration)
- [x] Add commercial-vehicles service definition to services.ts focusing on commercial/agricultural/farm/warehouse vehicles
- [x] Add two-project case study gallery to ServiceDetail.tsx (wheels project + chassis project)
- [x] Add Commercial & Agricultural Vehicles to Header navigation menu (desktop and mobile)
- [x] Add Commercial & Agricultural Vehicles to Home page services grid
- [x] Add Commercial & Agricultural Vehicles to Services page services list
- [x] Position Commercial & Agricultural Vehicles appropriately in service ordering (15th position, before Steel Sheeting)
- [x] Fix Commercial Vehicles gallery image organization in ServiceDetail.tsx
- [x] Move chassis image (vehicle-chassis-1.jpeg) from Project 1 to Project 2 where it belongs
- [x] Fix Project 1 before/after labels: black wheel = before, silver wheels = after
- [x] Reorganize Project 1 to show: 2 before (black wheels), 3 after (silver wheels on complete vehicle)
- [x] Reorganize Project 2 to show: 4 chassis images including vehicle-chassis-1.jpeg
- [x] Replace incorrect chassis image in Project 1 Before section with cropped wheel closeup
- [x] Crop WhatsAppImage2025-10-15at21.03.37.jpeg to zoom in on black contaminated wheels
- [x] Replace vehicle-wheel-before.jpg with vehicle-wheel-before-closeup.jpeg in Project 1 Before section
- [x] Replace third after image (vehicle-complete-after-4.jpg) with new silver wheel closeup
- [x] Copy 4.jpeg to public directory as vehicle-wheel-after-closeup.jpeg
- [x] Update Project 1 After section third image to show silver shot-blasted wheel closeup
- [x] Replace broken chassis image (vehicle-chassis-1.jpeg) with new chassis image (4.jpeg)
- [x] Copy 4.jpeg to public directory as chassis-restoration-1.jpeg
- [x] Restructure Project 2 chassis section to remove incorrect "before/after" presentation
- [x] Present all 4 chassis images as completed restoration showcase from different angles
- [x] Update section heading and descriptions to reflect that all images are "after" restoration
- [x] Create new Steel Doors & Roller Shutters service page with 4 before/after images
- [x] Copy 4 door/roller shutter images to public directory (2 before, 2 after)
- [x] Add steel-doors service definition to services.ts covering both steel doors and roller shutters
- [x] Add before/after case study gallery to ServiceDetail.tsx for steel-doors
- [x] Add Steel Doors & Roller Shutters to Header navigation menu (desktop and mobile)
- [x] Add Steel Doors & Roller Shutters to Home page services grid
- [x] Add Steel Doors & Roller Shutters to Services page services list
- [x] Position Steel Doors & Roller Shutters appropriately in service ordering (16th position, before Steel Sheeting)
- [x] Increase default zoom level on map components by 2 levels to show closer Midlands view
- [x] Update ServiceAreasMap component zoom setting (from 6 to 8)
- [x] Update LocationMap component zoom setting (already at 10, no change needed)
- [x] Test map display shows correct zoom level on page load
- [x] Add Lincoln area regional coverage circle to ServiceAreasMap (35km radius)
- [x] Add Shropshire (Oswestry) regional coverage circle to ServiceAreasMap (35km radius)
- [x] Add Cotswolds area regional coverage circle to ServiceAreasMap (30km radius, above and right of Cheltenham)
- [x] Test new coverage circles display correctly on map
- [x] Add Peterborough area regional coverage circle to ServiceAreasMap (35km radius)
- [x] Add Northampton area regional coverage circle to ServiceAreasMap (35km radius)
- [x] Add Staffordshire/Telford area regional coverage circle to ServiceAreasMap (30km radius, below Stoke)
- [x] Test new coverage circles display correctly on map
- [x] Update Footer component to include all Services links from main navigation (18 services)
- [x] Add Industries links to Footer component (4 industries)
- [x] Add Service Areas links to Footer component (11 major locations)
- [x] Replace inline footer in Home.tsx with Footer component import
- [x] Replace inline footers in all service area pages with Footer component (18 pages)
- [x] Replace inline footers in industry pages with Footer component
- [x] Replace inline footers in other pages (Gallery, Contact, ServiceDetail, ServiceAreas) with Footer component
- [x] Test footer displays correctly across all pages
- [x] Fix nested anchor tag error in ConstructionIndustry.tsx
- [x] Remove <a> tags inside Link components (moved className to Link)
- [x] Test Construction Industry page for errors
- [x] Search for and download free stock images for Marine industry (ship hulls, offshore platforms)
- [x] Search for and download free stock images for Agriculture industry (tractors, farm equipment)
- [x] Search for and download free stock images for Transport & Logistics industry (commercial vehicles, trailers)
- [x] Search for and download free stock images for Heritage & Restoration industry (historic buildings, bridges)
- [x] Create MarineIndustry.tsx page component with comprehensive content
- [x] Create AgricultureIndustry.tsx page component with comprehensive content
- [x] Create TransportLogisticsIndustry.tsx page component with comprehensive content
- [x] Create HeritageRestorationIndustry.tsx page component with comprehensive content
- [x] Add 4 new industries to Header navigation dropdown (desktop and mobile)
- [x] Add 4 new industries to Footer Industries section (Marine, Agriculture, Transport & Logistics, Heritage & Restoration)
- [x] Add 4 new industries to Home page (if applicable)
- [x] Add routes for 4 new industry pages in App.tsx
- [x] Implement automated XML sitemap generation system (server/sitemap.ts and server/sitemapHandler.ts)
- [x] Create sitemap route that dynamically generates sitemap.xml at /sitemap.xml
- [x] Create sitemap management interface in Admin area (Sitemap tab with XML generation and route list)
- [x] Test all 4 new industry pages load correctly
- [x] Test sitemap.xml generation and accessibility
- [ ] Test sitemap admin interface
- [x] Research competitor mobile shot blasting page for inspiration
- [x] Search for and download free stock images for plant and machinery (excavators, bulldozers, industrial equipment)
- [x] Create plant-machinery service definition in services.ts with comprehensive content (8 benefits, 6-step process, 12 applications, 8 FAQs)
- [x] Create PlantMachineryService page component (added to services.ts, uses ServiceDetail.tsx)
- [x] Add Plant & Machinery to Header navigation menu (desktop and mobile)
- [x] Add Plant & Machinery to Home page services grid (19th service)
- [x] Add Plant & Machinery to Services page services list
- [x] Add Plant & Machinery to Footer services column 2
- [x] Add Plant & Machinery to sitemap routes in server/sitemapHandler.ts
- [x] Position Plant & Machinery appropriately in service ordering (19th position, after Steel Gates)
- [x] Test Plant & Machinery service page loads correctly
- [x] Save checkpoint with Plant & Machinery service
- [x] Research competitor mobile shot blasting page for inspiration
- [x] Search for and download free stock images for plant and machinery (excavators, bulldozers, industrial equipment)
- [x] Create plant-machinery service definition in services.ts with comprehensive content (8 benefits, 6-step process, 12 applications, 8 FAQs)
- [x] Create PlantMachineryService page component (added to services.ts, uses ServiceDetail.tsx)
- [x] Add Plant & Machinery to Header navigation menu (desktop and mobile)
- [x] Add Plant & Machinery to Home page services grid (19th service)
- [x] Add Plant & Machinery to Services page services list
- [x] Add Plant & Machinery to Footer services column 2
- [x] Add Plant & Machinery to sitemap routes in server/sitemapHandler.ts
- [x] Position Plant & Machinery appropriately in service ordering (19th position, after Steel Gates)
- [x] Test Plant & Machinery service page loads correctly
- [x] Save checkpoint with Plant & Machinery service
- [x] Update ServiceSelector component to include all 19 services
- [x] Add new material type options for Steel Doors & Roller Shutters, Plant & Machinery (4 new categories: Radiators & Heating, Vehicles & Machinery, Doors/Gates/Railings, Steel Sheeting & Panels)
- [x] Ensure all service routes are correctly mapped in ServiceSelector (12 material types total)
- [x] Add missing services to material type categories (Commercial Radiators, Commercial Vehicles, Steel Sheeting, Steel Gates, Steel Doors, Plant & Machinery)
- [x] Test ServiceSelector quiz flow with all services
- [x] Save checkpoint with updated ServiceSelector
- [x] Copy new MetalSheetShotblasting.png image to public directory (as steel-sheeting-hero.png)
- [x] Update Steel Sheeting service definition in services.ts with new image path (/steel-sheeting-hero.png)
- [x] Verify image displays on Home page services grid
- [x] Verify image displays on Services page list
- [x] Verify hero image displays on Steel Sheeting detail page
- [x] Save checkpoint with updated Steel Sheeting image
- [x] Find Steel Sheeting image reference in Home.tsx services grid (line 179)
- [x] Update Steel Sheeting image path in Home.tsx to /steel-sheeting-hero.png
- [x] Find Steel Sheeting image reference in Services.tsx services list (line 112)
- [x] Update Steel Sheeting image path in Services.tsx to /steel-sheeting-hero.png
- [x] Test image displays correctly on Home page
- [x] Test image displays correctly on Services page
- [x] Save checkpoint with Home and Services page image updates
- [ ] Find all "Before Shot Blasting" labels in services.ts and replace with "Before"
- [ ] Find all "After Shot Blasting" labels in services.ts and replace with "After"
- [ ] Find all "Before Restoration" labels in services.ts and replace with "Before"
- [ ] Find all "After Restoration" labels in services.ts and replace with "After"
- [ ] Test mobile display of before/after galleries
- [ ] Save checkpoint with shortened labels
- [x] Find all "Before: [description]" labels in serviceGalleries.ts
- [x] Replace all "Before: [description]" labels with just "Before" (11 instances updated)
- [x] Replace all "After: [description]" labels with just "After" (11 instances updated)
- [x] Test mobile display to verify labels no longer overflow
- [x] Save checkpoint with shortened labels
- [x] Find hardcoded before/after labels in Home.tsx (line 235-236)
- [x] Update Home.tsx before/after labels to just "Before" and "After"
- [x] Find hardcoded before/after labels in About.tsx (line 64-65)
- [x] Update About.tsx before/after labels to just "Before" and "After"
- [x] Search for any other hardcoded before/after labels across all pages (none found)
- [x] Test all pages to verify labels are shortened
- [x] Save checkpoint with all label updates
- [x] Add loading="lazy" to service images in Home.tsx services grid
- [x] Add loading="lazy" to service images in Services.tsx services list
- [x] Add loading="lazy" to ServiceDetail.tsx gallery images (41 images)
- [x] Add loading="lazy" to case study images in ServiceDetail.tsx
- [x] Add loading="lazy" to industry page images (8 industry pages updated)
- [x] Add loading="lazy" to location page images (all 31 service area pages)
- [x] Add loading="lazy" to Gallery.tsx gallery items (4 images)
- [x] Add loading="lazy" to About.tsx images (no img tags found)
- [x] Test lazy loading functionality across all pages
- [x] Save checkpoint with lazy loading implementation
- [x] Reorder Header.tsx navigation to move About before Contact (desktop and mobile)
- [x] Update mobile menu navigation order in Header.tsx
- [x] Continue adding loading="lazy" to ServiceDetail.tsx gallery images
- [x] Add loading="lazy" to case study images in ServiceDetail.tsx
- [x] Test navigation menu order on desktop and mobile
- [x] Save checkpoint with navigation reorder and lazy loading
- [x] Copy new warehouse cladding hero image to public directory
- [x] Update services.ts factory-cladding heroImage to use new image
- [x] Test Factory & Warehouse Cladding page hero section
- [x] Save checkpoint with updated hero image
- [x] Copy shot blasting video to public directory
- [x] Design and implement homepage video feature section
- [x] Add video to Steel Sheeting service page
- [x] Test video playback on homepage
- [x] Test video playback on Steel Sheeting page
- [x] Save checkpoint with video features
- [x] Update homepage video to portrait reel format with autoplay, loop, and muted
- [x] Update Steel Sheeting page video to portrait reel format with autoplay, loop, and muted
- [x] Remove video controls and sound options
- [x] Test video autoplay on homepage
- [x] Test video autoplay on Steel Sheeting page
- [x] Save checkpoint with reel-style video updates
- [x] Copy new radiator hero image to public directory
- [x] Update services.ts commercial-radiators heroImage
- [x] Update Home.tsx radiators service card image
- [x] Update Services.tsx radiators service card image
- [x] Test radiator image display on all pages
- [x] Save checkpoint with radiator image updates
- [x] Remove "Companies We've Worked For" section from homepage
- [x] Test homepage layout after removal
- [x] Save checkpoint with companies section removed
- [x] Search for all "nationwide" mentions across website
- [x] Remove nationwide coverage from all found locations
- [x] Test pages with nationwide coverage removed
- [x] Save checkpoint with nationwide coverage removed
- [x] Design counties and cities coverage section for Service Areas page
- [x] Implement coverage section with England and Wales regions
- [x] Test Service Areas page with new coverage section
- [x] Save checkpoint with coverage section added
- [x] Search for all brand name mentions (Rolls-Royce, Alstom, Toyota, etc.) across website
- [x] Remove brand names from location pages and other pages
- [x] Replace brand mentions with generic industry descriptions
- [x] Test affected pages
- [x] Save checkpoint with brand names removed
- [x] Fix duplicate React key error on Birmingham service area page
- [x] Test Birmingham page after fix
- [x] Save checkpoint with duplicate key error fixed
- [x] Fix duplicate header bar on Derby service area page
- [x] Fix duplicate header bar on Hereford service area page
- [x] Remove duplicate headers from Norwich, Stoke, Swindon, Worcester pages
- [x] Fix duplicate breadcrumb keys on 11 affected pages (Bristol, Chesterfield, Leeds, Liverpool, Manchester, Northampton, Oxford, Peterborough, Sheffield, Stratford-upon-Avon, Wrexham)
- [ ] Add nearby towns section (20-50 towns within 20km) to all 31 service area pages
- [ ] Test sample pages after all fixes
- [ ] Save checkpoint with all fixes and nearby towns feature
- [x] Search for all mentions of standards (SA 2.5, SA 3, ISO, BS, etc.) across website
- [x] Remove all standards mentions from service pages and location pages
- [x] Search for certification, regulation, and compliance mentions
- [x] Remove all certification/regulation/compliance references
- [x] Search for environmental/environment wording across website
- [x] Remove all environmental responsibility claims
- [x] Create detailed report of what was removed and why
- [x] Test affected pages
- [x] Save checkpoint with standards/compliance/environmental content removed
- [x] Copy new cylindrical tank before/after images to public directory
- [x] Update Steel Containers service before/after images in serviceGalleries.ts
- [x] Test Steel Containers page with new images
- [x] Save checkpoint with updated container images
- [ ] Research nearby towns within 20km for all 31 service area locations
- [ ] Create nearbyTowns data file with towns for each location
- [ ] Create NearbyTowns component for displaying towns list
- [x] Add nearby towns sections to all 31 service area pages
- [x] Test sample service area pages with nearby towns
- [x] Save checkpoint with nearby towns feature
- [x] Research nearby towns within 20km for all 31 service area locations
- [x] Create nearbyTowns data file with towns for each location
- [x] Create NearbyTowns component for displaying towns list
- [x] Investigate Nottingham page nearby towns placement issue (appears in FAQ section)
- [x] Fix Nottingham page nearby towns section placement
- [x] Check for duplicate nearby towns sections on Nottingham page
- [x] Verify all 31 service area pages for correct nearby towns placement
- [x] Ensure nearby towns section appears before CTA section on all pages
- [x] Save checkpoint with nearby towns placement fixes
- [x] Review existing LocalBusinessSchema component
- [x] Enhance LocalBusinessSchema with comprehensive Schema.org properties
- [x] Create location-specific structured data for all 31 service areas
- [x] Add geographic coordinates for each service area
- [x] Add service offerings and price range to structured data
- [x] Update all 31 service area pages with enhanced structured data
- [x] Verify structured data with Google Rich Results Test
- [x] Save checkpoint with structured data implementation
- [x] Examine homepage hero section implementation
- [x] Identify hero carousel images and animation logic
- [x] Create reusable HeroCarousel component for service area pages
- [x] Update all 31 service area pages to use new hero carousel
- [x] Remove old hero images from service area pages
- [x] Verify hero carousel works on all pages
- [x] Save checkpoint with hero carousel implementation
- [x] Investigate Worcester page for duplicate header issue
- [x] Check all 31 service area pages for duplicate headers
- [x] Remove duplicate headers from all affected pages
- [x] Identify pages with Before/After sections immediately after hero
- [x] Move Before/After sections to appear after Why Choose Us section on all pages
- [x] Find and remove markdown asterisks (e.g., **Manufacturing**, **Construction**) from all service area pages
- [x] Verify all fixes across all 31 pages
- [x] Save checkpoint with header, layout, and formatting fixes
- [x] Find all files containing "Gallery" references
- [x] Rename Gallery page component and file
- [x] Update Gallery route in App.tsx
- [x] Update Header component navigation menu
- [x] Update all "Gallery" links across all service area pages
- [x] Update Gallery page title and meta information
- [x] Verify all Gallery references changed to Our Work
- [x] Save checkpoint with Gallery to Our Work rename
- [x] Update second gallery item from "Factory Floor Preparation" to "Warehouse Cladding Restoration"
- [x] Update gallery item description to accurately reflect warehouse cladding work
- [x] Save checkpoint with gallery item correction
- [x] Check commercial vehicles service page for chassis and wheels project details
- [x] Identify and remove all automotive gallery items from Our Work page
- [x] Add chassis project to Our Work gallery
- [x] Add commercial vehicle wheels project to Our Work gallery
- [x] Verify changes and save checkpoint
- [x] Change commercial vehicle projects category from "Commercial Vehicles" to "Automotive"
- [x] Verify Automotive category shows 2 projects
- [x] Save checkpoint with category fix
- [x] Design ProjectDetailModal component with expanded layout
- [x] Add multiple photo gallery support to modal
- [x] Enhance gallery data with detailed descriptions and metadata
- [x] Add click handlers to gallery items to open detail modal
- [x] Implement image carousel/slider for multiple project photos
- [x] Add project specifications and technical details section
- [ ] Test modal functionality on multiple projects
- [ ] Save checkpoint with project detail view feature
- [x] Investigate duplicate modal/overlay issue when closing project detail modal
- [x] Fix duplicate close action requirement
- [x] Test modal open and close behavior
- [x] Save checkpoint with modal fix
- [x] Copy commercial vehicle wheels before image to project public directory
- [x] Copy commercial vehicle wheels after image to project public directory
- [x] Update OurWork.tsx gallery data with correct image paths for wheels project
- [x] Verify images display correctly on Our Work page
- [x] Save checkpoint with commercial vehicle wheels images
- [x] Crop commercial vehicle wheels before image to zoom in on wheels
- [x] Save cropped image as commercial-vehicle-wheels-before-cropped.png
- [x] Update OurWork.tsx to use cropped before image
- [x] Verify cropped image displays wheels clearly in modal
- [x] Save checkpoint with improved wheel visibility
- [x] Copy 4 new chassis restoration images to public/images/our-work directory
- [x] Update Complete Chassis Restoration project in OurWork.tsx with new images
- [x] Present all 4 chassis images as "after" photos showcasing completed restoration
- [x] Remove before/after structure since no before images available
- [x] Verify chassis restoration gallery displays correctly
- [x] Save checkpoint with updated chassis restoration images
- [x] Fix ProjectDetailModal to remove before/after labels for projects without before images
- [x] Update carousel badge logic to show appropriate labels based on image type
- [x] Save checkpoint with corrected modal labels
- [x] Remove 9 placeholder projects from OurWork.tsx gallery data
- [x] Keep only 2 real Automotive projects (Heavy-Duty Commercial Vehicle Wheels and Complete Chassis Restoration)
- [x] Projects to remove: Metal Gate Restoration, Decorative Gate Blasting, Manufacturing Equipment, Steel Storage Unit, Boat Hull Preparation, Tractor Restoration, Steel Balustrade, Railway Components
- [x] Save checkpoint with cleaned up gallery
- [x] Copy new gate before image to public/images/our-work directory
- [x] Update Commercial Gate Restoration project before image path in OurWork.tsx
- [x] Save checkpoint with updated gate before image
- [x] Fix gallery card hover to show after image instead of white background
- [x] Change hover text from "Hover to see transformation" to "Click To See The Transformation"
- [x] Save checkpoint with fixed hover and updated text
- [x] Investigate OptimizedImage component causing white hover issue
- [x] Fix gallery card hover to properly display after image without white background
- [x] Save checkpoint with working hover effect
- [x] Copy radiator before and after images to public/images/our-work directory
- [x] Create Commercial Radiator Restoration project in OurWork.tsx with detailed information
- [x] Add project to gallery with before/after images
- [x] Save checkpoint with new radiator project
- [x] Copy steel tank before and after images to public/images/our-work directory
- [x] Create Large Steel Tank Restoration project in OurWork.tsx with detailed information
- [x] Add project to Industrial category with before/after images
- [x] Save checkpoint with new steel tank project
- [x] Copy factory cladding before and after images to public/images/our-work directory
- [x] Add new "Cladding" category to categories array with appropriate icon
- [x] Create Factory Cladding Restoration project in OurWork.tsx with detailed information
- [x] Link project to Jordan King testimonial from home page
- [x] Add project to new Cladding category with before/after images
- [x] Save checkpoint with new cladding project and category
- [x] Copy steel roller shutter before and after images to public/images/our-work directory
- [x] Copy steel sheeting video to public/videos directory
- [x] Create Steel Roller Shutter Restoration project in OurWork.tsx with detailed information
- [x] Add roller shutter project to Industrial category with before/after images
- [x] Create Steel Sheeting Blasting project in OurWork.tsx with video showcase
- [x] Add steel sheeting project to Industrial category with video content
- [x] Optimize all large images on Our Work page (compress without quality loss)
- [x] Optimize steel sheeting video for web playback (compress, web-friendly format)
- [x] Implement lazy loading for images and videos on Our Work page
- [x] Save checkpoint with new projects and optimized media
- [x] Add "Steel Containers" category to categories array in OurWork.tsx
- [x] Change Steel Container Blasting project category from Industrial to Steel Containers
- [x] Change Large Steel Tank Restoration project category from Industrial to Steel Containers
- [x] Save checkpoint with updated categories
- [x] Change "Cladding" category name to "Factory/Warehouse Cladding" in categories array
- [x] Update all projects with category "Cladding" to "Factory/Warehouse Cladding"
- [x] Save checkpoint with renamed category
- [x] Change "Gates" category name to "Commercial Gates" in categories array
- [x] Update all projects with category "Gates" to "Commercial Gates"
- [x] Remove Marine, Agriculture, and Infrastructure categories from categories array
- [x] Save checkpoint with updated categories
- [x] Add "Structural Steel Frames" category to categories array
- [x] Change Industrial Steel Framework project category from Industrial to Structural Steel Frames
- [x] Save checkpoint with new category
- [x] Add "Steel Doors/Roller Shutters" category to categories array
- [x] Change Steel Roller Shutter Restoration project category from Industrial to Steel Doors/Roller Shutters
- [x] Save checkpoint with new category

## Category Reorganization (January 28, 2026)
- [x] Rename "Steel Doors/Roller Shutters" category to "Steel Doors/Shutters"
- [x] Verify Steel Roller Shutter project is in Steel Doors/Shutters (already moved)
- [x] Create new "Radiators" category
- [x] Move Commercial Radiator Restoration from Commercial to Radiators
- [x] Rename "Commercial Gates" category to "Steel Gates"
- [x] Create new "Steel Sheeting" category
- [x] Move Steel Sheeting Blasting from Industrial to Steel Sheeting
- [x] Update category filter list with all new categories
- [x] Save checkpoint with reorganized categories

## Remove Industrial Category (January 28, 2026)
- [x] Remove "Industrial" category from categories array in OurWork.tsx
- [x] Save checkpoint with Industrial category removed

## Update Steel Container Service Image (January 28, 2026)
- [x] Copy new cylindrical container image to public directory
- [x] Update steel-containers service image in services.ts
- [x] Verify image displays correctly on Home page services grid
- [x] Verify image displays correctly on Services page services list
- [x] Save checkpoint with updated steel container image

## Crop Steel Container Image and Push to GitHub (January 28, 2026)
- [x] Find old steel container image with people blasting
- [x] Crop image to remove people, focus on container
- [x] Restart dev server to clear cache
- [x] Save checkpoint with cropped image
- [x] Push all changes to GitHub (automatic sync via checkpoint)

## Recrop Steel Container Image (January 28, 2026)
- [x] Recrop steel container image to show more of the clean blasted area on right
- [x] Save checkpoint with adjusted crop

## Create Industries Listing Page (January 28, 2026)
- [x] Read existing Services page to understand layout pattern
- [x] Read industries data file to get all industries
- [x] Create Industries.tsx page component listing all industries
- [x] Add /industries route to App.tsx
- [x] Update Header navigation to make Industries menu clickable
- [x] Test Industries page displays all industries correctly
- [x] Save checkpoint with Industries page

## Update Industries Page Images (January 29, 2026)
- [x] Find hero images from each individual industry page
- [x] Update Industries.tsx to use hero images from industry pages
- [x] Verify all industry cards show correct images
- [x] Save checkpoint with updated industry images

## Create 3 Blog Posts (January 29, 2026)
- [x] Research blog topics related to shot blasting
- [x] Plan internal linking strategy to important pages
- [x] Write blog post 1: Structural steel shot blasting (1681 words, UK English)
- [x] Write blog post 2: Shot blasting and powder coating (1921 words, UK English)
- [x] Write blog post 3: Factory cladding restoration (2030 words, UK English)
- [x] Add internal links to relevant service/industry pages
- [x] Update blog data file with new posts (inserted via SQL)
- [x] Verify blog posts display correctly on blog page
- [x] Save checkpoint with new blog posts

## Update Agriculture Images (January 29, 2026)
- [x] Change agriculture image on Industries page
- [x] Change factory/warehouse cladding blog post featured image to actual cladding
- [x] Change agriculture hero image on Agriculture industry page
- [x] Save checkpoint with updated agriculture images

## Replace Warehouse Cladding Blog Image (January 29, 2026)
- [x] Copy new warehouse cladding photo to public directory
- [x] Update blog post featured image in database
- [x] Save checkpoint with new warehouse cladding blog image

## Update Area Pages Meta Titles (January 29, 2026)
- [x] Find all local area page files (31 area pages found)
- [x] Update meta titles to 'Shot Blasting [Area]' format (31 pages updated)
- [ ] Save checkpoint with updated meta titles

## Fix Scroll Position & Bradford Links (January 29, 2026)
- [x] Add scroll-to-top on route change in App.tsx
- [x] Find all Bradford links with #bradford (1 found in Header.tsx)
- [x] Update Bradford links from #bradford to /bradford
- [x] Save checkpoint with scroll fix and Bradford link updates

## Create Meta Descriptions for Area Pages (January 29, 2026)
- [x] Create unique meta descriptions for all 31 area pages (<160 chars, UK English)
- [x] Add meta description tags to area page components (31 pages updated)
- [x] Save checkpoint with meta descriptions

## Check Mobile View Powder Coating Images (January 29, 2026)
- [x] Check Home page mobile view for powder coating image
- [x] Check Services page mobile view
- [x] Check other pages with powder coating images on mobile
- [x] Fix any mobile display issues found (renamed to powder-coating-cropped.jpg)
- [x] Save checkpoint with mobile fixes

## Update Home Page Hero Text (January 29, 2026)
- [x] Update hero text to include 'commercial' and 'industrial'
- [x] Save checkpoint with mobile fixes and updated hero text

## Implement Lazy Loading for Service Images (January 29, 2026)
- [x] Check current lazy loading implementation on Home page (already implemented with loading="lazy")
- [x] Optimize lazy loading with decoding="async" for better performance
- [x] Native lazy loading already provides optimal UX (no additional placeholder needed)
- [x] Save checkpoint with lazy loading optimization

## Fix Local Area Meta Descriptions (January 29, 2026)
- [x] Review current meta descriptions on all area pages
- [x] Identify pages with incorrect CMS/website feature descriptions
- [x] Rewrite all 31 area meta descriptions for Shot Blasting services
- [x] Include mobile number (07970 566409) at end of each description
- [x] Ensure all under 160 characters in UK English
- [x] Save checkpoint with corrected meta descriptions

## Fix Open Graph Meta Tags on Area Pages (January 29, 2026)
- [ ] Find where OG tags (og:description, twitter:description) are set
- [ ] Update OG tag generation to use locationData descriptions
- [ ] Verify OG tags show correct shot blasting descriptions
- [ ] Restart server and test
- [ ] Save checkpoint with OG tag fixes

## Fix Open Graph Meta Tags on Area Pages - COMPLETED (January 29, 2026)
- [x] Find where OG tags (og:description, twitter:description) are set - Not in React code, needed server-side injection
- [x] Create server-side meta tag injection system in server/metaTags.ts
- [x] Update server/_core/vite.ts to inject meta tags before serving HTML
- [x] Add all 31 location meta descriptions to server-side injection
- [x] Verify OG tags show correct shot blasting descriptions in HTML source
- [x] Restart server and test multiple locations (Northampton, Birmingham, Milton Keynes, Stratford-upon-Avon)
- [ ] Save checkpoint with OG tag fixes

## Fix Platform OG Tag Override Issue (January 29, 2026)
- [x] Investigate why platform OG tags override server-side tags
- [x] Discover platform injects OG tags at CDN/edge level after server response
- [x] Add placeholder OG tags to client/index.html to establish presence
- [x] Update injectMetaTags() to remove placeholder tags before injecting location-specific tags
- [x] Update serveStatic() in vite.ts to inject meta tags in production mode
- [x] Test dev server shows only correct OG tags (no duplicates)
- [ ] Save checkpoint and test on published site

## Attempt to Override Platform OG Tag Injection (January 29, 2026)
- [x] Moved OG tags to appear before link tags in index.html
- [x] Updated server-side injection to work in both dev and production modes
- [ ] Test if OG tags now appear before platform injection in published HTML
- [ ] Save checkpoint and verify on published site
- [ ] If still not working, may need Manus platform support to disable their OG injection

## Fix Homepage SEO Issues (January 29, 2026)
- [x] Add meta keywords tag to homepage
- [x] Extend title from 24 characters to 30-60 characters (now 68 chars)
- [x] Add meta description (50-160 characters) - now 159 chars
- [x] Test SEO improvements
- [ ] Save checkpoint

## Fix Preparation & Cleanup Page SEO (January 29, 2026)
- [x] Reduce keywords from 9 to 6 (focused on preparation and cleanup)
- [x] Extend title from 24 to 54 characters (Shot Blasting Preparation & Cleanup Services UK)
- [x] Add page-specific meta description
- [x] Test changes
- [ ] Save checkpoint

## Fix Services Page SEO (January 29, 2026)
- [x] Reduce keywords from 9 to 7 (focused on services)
- [x] Extend title from 24 to 56 characters (Shot Blasting Services UK | Commercial & Industrial)
- [x] Add page-specific meta description with phone number
- [ ] Save checkpoint and sync to GitHub

## Generate Static HTML Files for Location Pages (January 29, 2026)
- [ ] Analyze current location page structure and React components
- [ ] Read locationData.ts for all 31 locations and descriptions
- [ ] Create build script to generate static HTML files with baked-in meta tags
- [ ] Ensure exact same content, URLs, styling as current React pages
- [ ] Update server routing to serve static HTML files
- [ ] Test static pages work correctly
- [ ] Verify meta tags appear in HTML source
- [ ] Save checkpoint and sync to GitHub

## Generate Static HTML Files for Location Pages (January 29, 2026)
- [x] Analyze current location page structure
- [x] Create build script to generate 31 static HTML files with correct meta tags
- [x] Add crawler detection middleware (both dev and production)
- [x] Test crawler vs regular user access - working perfectly
- [ ] Save checkpoint and sync to GitHub

## Implement Full SSR for Location Pages (January 29, 2026)
- [x] Install React SSR dependencies (react-dom/server) - already installed
- [x] Create SSR rendering script using renderToString
- [x] Generate 31 complete HTML files with full page content
- [x] Create sitemap.xml with all location page URLs
- [x] Update server routing to serve pre-rendered files - already configured
- [x] Test pages served correctly to crawlers
- [ ] Verify pages detected by Manus SEO panel after publishing
- [ ] Save checkpoint and sync to GitHub

## Fix Birmingham Page SEO (January 29, 2026)
- [x] Fix Birmingham page SEO: reduce keywords from 9 to 3-8, extend title from 24 to 30-60 characters

## Optimize SEO for All Location Pages (January 30, 2026)
- [x] Wolverhampton - optimize title (30-60 chars) and keywords (3-8)
- [x] Coventry - optimize title (30-60 chars) and keywords (3-8)
- [x] Leicester - optimize title (30-60 chars) and keywords (3-8)
- [x] Derby - optimize title (30-60 chars) and keywords (3-8)
- [x] Nottingham - optimize title (30-60 chars) and keywords (3-8)
- [x] Sheffield - optimize title (30-60 chars) and keywords (3-8)
- [x] Leeds - optimize title (30-60 chars) and keywords (3-8)
- [x] Manchester - optimize title (30-60 chars) and keywords (3-8)
- [x] Liverpool - optimize title (30-60 chars) and keywords (3-8)
- [x] Stoke-on-Trent - optimize title (30-60 chars) and keywords (3-8)
- [x] Worcester - optimize title (30-60 chars) and keywords (3-8)
- [x] Gloucester - optimize title (30-60 chars) and keywords (3-8)
- [x] Bristol - optimize title (30-60 chars) and keywords (3-8)
- [x] Cardiff - optimize title (30-60 chars) and keywords (3-8)
- [x] Hereford - optimize title (30-60 chars) and keywords (3-8)
- [x] Shrewsbury - optimize title (30-60 chars) and keywords (3-8)
- [x] Chester - optimize title (30-60 chars) and keywords (3-8)
- [x] St Albans - optimize title (30-60 chars) and keywords (3-8)
- [x] Milton Keynes - optimize title (30-60 chars) and keywords (3-8)
- [x] Northampton - optimize title (30-60 chars) and keywords (3-8)
- [x] Peterborough - optimize title (30-60 chars) and keywords (3-8)
- [x] Cambridge - optimize title (30-60 chars) and keywords (3-8)
- [x] Oxford - optimize title (30-60 chars) and keywords (3-8)
- [x] Chesterfield - optimize title (30-60 chars) and keywords (3-8)
- [x] Ipswich - optimize title (30-60 chars) and keywords (3-8)
- [x] Lincoln - optimize title (30-60 chars) and keywords (3-8)
- [x] Norwich - optimize title (30-60 chars) and keywords (3-8)
- [x] Stratford-upon-Avon - optimize title (30-60 chars) and keywords (3-8)
- [x] Swindon - optimize title (30-60 chars) and keywords (3-8)
- [x] Wrexham - optimize title (30-60 chars) and keywords (3-8)

## Create 72 New Location Pages (January 30, 2026)
- [x] Phase 1: Create location data entries for all 71 locations (Wrexham already existed)
- [x] Phase 2: Generate React components for all 71 location pages with SEO
- [x] Phase 3: Update App.tsx routing for all new pages
- [x] Phase 4: Update Header menu with new locations organized by region
- [x] Phase 5: Update Areas page with all new locations
- [x] Phase 6: Add locations to map component (102 total locations now)
- [x] Phase 7: Nearby towns data included in each component
- [x] Phase 8: Test and verify SEO optimization works - all pages loading correctly

## Update Sitemap with All Location Pages (January 30, 2026)
- [x] Update sitemap.xml with all 102 location pages (using commercialshotblasting.co.uk domain)
- [x] Save checkpoint for publishing

## Redesign Areas Mega Menu & Add Nearby Villages (January 30, 2026)
- [x] Redesign desktop mega menu to show key cities per region with "View All Areas" link
- [x] Redesign mobile menu with collapsible regions and search functionality
- [x] Generate nearby villages data (within 30km) for all 71 new locations
- [x] Location page components already have nearby towns from initial generation
- [x] Test menu and location pages - TypeScript passes, no errors
- [ ] Save checkpoint

## Create County Pages (January 30, 2026)
- [ ] Define county structure and assign all 102 towns to proper UK counties
- [ ] Create County page components for each county (e.g., WestMidlandsCounty.tsx)
- [ ] Add routes for all county pages in App.tsx (/service-areas/west-midlands, etc.)
- [ ] Redesign mega menu to show counties with sample towns and '+more' links to county pages
- [ ] Update ServiceAreas page to organize by counties
- [ ] Test and verify all pages work correctly
- [ ] Save checkpoint

## Split East Midlands into Proper Counties (January 30, 2026)
- [ ] Create Nottinghamshire county page (Nottingham, Mansfield)
- [ ] Create Leicestershire county page (Leicester, Loughborough, Coalville)
- [ ] Create Derbyshire county page (Derby, Chesterfield, Dronfield)
- [ ] Create Lincolnshire county page (Lincoln, Grantham, Scunthorpe)
- [ ] Create Northamptonshire county page (Northampton, Corby, Kettering, Wellingborough)
- [ ] Update App.tsx with new county routes
- [ ] Update Header mega menu with new counties
- [ ] Update ServiceAreas page with new county structure
- [ ] Remove old East Midlands combined page
- [ ] Test and save checkpoint

## Fix Missing Location Links (January 30, 2026)
- [x] Update ServiceAreas.tsx allLocations array with proper hrefs for all 102 locations
- [x] Verify ServiceAreasMap has markers for all 102 locations (already complete)
- [x] Test and save checkpoint (version: 964515e1)
- [x] Fix missing location links (Barnsley and others) - locations without slugs in locationSlugMap render as plain text instead of clickable links
- [x] Split West Midlands into counties (West Midlands metro, Warwickshire, Worcestershire) in Areas dropdown
- [x] Split North West into counties (Greater Manchester, Merseyside, Cheshire, Lancashire) in Areas dropdown
- [x] Split East of England into counties (Norfolk, Suffolk, Cambridgeshire, Essex) in Areas dropdown
- [x] Split South West into counties (Bristol & Bath, Gloucestershire, Wiltshire, Somerset) in Areas dropdown
- [x] Split South East into counties (Oxfordshire, Berkshire, Buckinghamshire, Surrey, Hampshire) in Areas dropdown
- [x] Separate Hertfordshire & Beds into two separate counties in Areas dropdown
- [x] Split All Service Locations section on Home page into organized counties and greater areas
- [x] Change Welsh Borders to Herefordshire everywhere (only Hereford is in it)
- [x] Fix homepage SEO: extend title to 30-60 characters (currently 24)
- [x] Fix homepage SEO: reduce keywords from 9 to 3-8 focused keywords
- [x] Add optimized FAQ section to homepage with FAQ schema markup for Google
- [x] Include long-tail questions about commercial shot blasting with internal links
- [x] Create SEO-optimized XML sitemap with all pages, priorities, and change frequencies
- [ ] Convert images to WebP format
- [ ] Implement lazy loading for images below the fold
- [ ] Use responsive images with srcset
- [ ] Compress hero images to under 200KB
- [ ] Improve hero image loading speed with preloading

## Image Optimization (January 2026)
- [x] Convert 52 large JPG/PNG images to WebP format (81.3% size reduction: 43.37MB -> 8.12MB)
- [x] Add lazy loading attribute to all images across 118 TSX files
- [x] Add preload hints for hero carousel images in index.html
- [x] Update 118 TSX files to reference WebP versions instead of JPG/PNG
- [x] Compress hero carousel images to under 200KB each
- [x] Fix duplicate loading="lazy" attributes in multiple files

## Responsive Images (January 2026)
- [x] Generate multiple sizes (640w, 1024w, 1920w) for hero carousel images
- [x] Create ResponsiveHeroBackground component with automatic size selection based on screen width
- [x] Update hero section to use responsive images with dynamic background URLs
- [x] Add responsive preload hints in index.html for mobile, tablet, and desktop

## Responsive Images for Local Area Pages (January 2026)
- [x] Analyze local area pages structure and identify images used
- [x] Generate responsive image sizes for local area page images (already created in previous task)
- [x] Update HeroCarousel component with responsive image support
- [x] All 103 local area pages now automatically use responsive images via HeroCarousel component

## Performance Optimizations (January 2026)
- [x] Implement Cache-Control headers for images (WebP, PNG, JPG) - 1 year cache with immutable flag
- [x] Implement caching for other static assets (CSS, JS, fonts) - content-hashed files cached for 1 year
- [x] Enable Gzip compression for text-based assets (HTML, CSS, JS) - compression middleware added
- [x] Configure CSS/JS minification with esbuild and ES2020 target for smaller bundles
- [x] Tailwind CSS v4 automatically purges unused classes in production builds
- [x] Implement route-based code splitting - all 103 service area pages now lazy-loaded
- [x] Configure vendor chunk splitting for React, UI components, router, and tRPC
- [x] All 33 existing tests passing after optimizations

## Page Load Speed Optimization (January 2026)
- [x] Implement link prefetching for faster navigation (usePrefetch hook)
- [x] Add route preloading on hover/focus to Header navigation links
- [x] Preload critical pages (services, contact, about, our-work, service-areas) after initial load

## Service Area Page Prefetching (January 2026)
- [x] Add all 102 service area pages to prefetch hook
- [x] Add prefetch handlers to Areas dropdown links (desktop hover + mobile touch)

## Google Analytics (February 2026)
- [x] Add Google Analytics tracking code (G-6LC7XCLGK2)

## Google Analytics Event Tracking (February 2026)
- [x] Add GA event tracking to contact forms (HubSpot form submissions)
- [x] Add GA event tracking to phone call links (Header, Mobile Menu, Floating Button, TrackedPhoneButton)
- [x] Add GA event tracking to quote request buttons (Header, Mobile Menu, Quote Popup)
- [x] Add WhatsApp click tracking

## UTM Parameter Tracking (February 2026)
- [x] Create UTM parameter capture and storage utility (utm.ts with first-touch/last-touch attribution)
- [x] Integrate UTM data with form submissions and conversions (HubSpotForm)
- [x] Add UTM data to GA events for attribution (all events now include UTM params)
- [x] Auto-detect organic search traffic from referrer

## PageSpeed Insights Fixes (February 2026)
- [x] Defer Google Maps loading until map section is visible (LazyServiceAreasMap with IntersectionObserver)
- [x] Optimize Google Fonts loading to reduce render-blocking (preload fonts, async stylesheet loading)
- [x] Lazy-load HubSpot form to reduce forced reflows (loads on interaction or 3s delay)
- [x] Add preconnect hints for third-party domains (fonts, maps, analytics, HubSpot)
- [x] Defer Google Analytics until after page load

## Static Map Replacement (February 2026)
- [x] Replace interactive Google Maps with static image on home page
- [x] Link static map to service areas page
- [ ] Run PageSpeed Insights to measure improvement (requires publish)

## Visual Static Map (February 2026)
- [x] Create SVG map of UK with service areas highlighted
- [x] Update StaticServiceAreasMap with visual map component

## Accurate UK Map Outline (February 2026)
- [x] Replace simplified UK outline with accurate SVG map of UK landmass
- [x] Position service area markers on accurate map coordinates

## Map Adjustments (February 2026)
- [x] Move coverage circle to center of UK on static home page map
- [x] Add deferred interactive Google Map to Service Areas page
- [x] Defer Google Maps loading until user visits Areas page

- [x] Move coverage circle down to cover the Midlands region (red box area)

- [x] Place 18 service area locations accurately on UK map (Manchester, Sheffield, Leeds, Nottingham, Derby, Leicester, Birmingham, Coventry, Bristol, Northampton, Shrewsbury, Wrexham, Powys, Milton Keynes, Cheltenham, Lincoln, Norwich, Bury St Edmunds)
- [ ] Remove coverage circle and location dots from UK map
- [x] Review and fine-tune marker positions for geographic accuracy

## Map Fixes (February 2026)
- [x] Fix marker positions using precise lat/long to SVG coordinate conversion
- [x] Make the map bigger (more like Google Maps size)
- [ ] Remove coverage circle overlay (user to confirm)
- [x] Update service areas list to include all 18 locations
- [x] Remove all location markers and HQ circle from map
- [x] Adjust coverage ellipse to avoid London and west Wales
- [x] Update description text to mention 9 teams across UK
- [x] Reshape coverage area to polygon including: Norfolk, Suffolk, Bristol, Somerset, SE Wales (Cardiff, Newport), Wiltshire, Berkshire, Bedfordshire, Buckinghamshire, north Devon
- [x] Refine polygon: pull back from London, extend east for all Norfolk/Suffolk, only include east Wales (not west)
- [x] Replace city list with counties within the coverage area
- [x] Redraw polygon to match user's red outline: extend north to Manchester/Yorkshire, east to Norfolk/Suffolk coast, southwest to Bristol/Somerset/N.Devon, west to South Wales, avoid London
- [x] Trace user's green outline exactly: Welsh border up to Manchester/Yorkshire, east to Norfolk/Suffolk bulge, down avoiding London completely, back through Somerset/Bristol to N.Devon
- [x] Extend polygon east to include all of Norfolk/Suffolk, pull back north to exclude Cumbria/Northumberland/Durham
- [x] Bring polygon top boundary further down to exclude Cumbria, Northumberland, East Riding
- [x] Pull polygon back from very west Wales
- [x] Pull back right side of polygon to exclude Kent, London, Sussex, Surrey (keep left side as is)
- [x] Pull in west Wales side of polygon to go down middle of Wales (don't touch other edges)
- [x] Change "UK-Wide Coverage" heading to "Covering most of England And Wales"
- [x] Update county list to accurately reflect the new service area polygon (exclude far north, London/Southeast, west Wales)
- [x] Add scroll-to-top arrow button for all pages

## New General Areas Page (February 2026)
- [ ] Create new Areas page with interactive Google Map (deferred loading)
- [ ] Include comprehensive list of all service area locations with links
- [ ] Update main navigation to point to new Areas page
- [x] Create new general Areas page with interactive map
- [x] Add all service area locations with links to individual pages
- [x] Update navigation to point to new Areas page

## Areas Page Updates (February 2026)
- [x] Update Areas dropdown header link to navigate to /service-areas page
- [x] Update home page county list with all counties organized alphabetically by region (East of England, East Midlands, West Midlands, Yorkshire, North West, South West, Wales Borders)

## County Pages and Region Improvements (February 2026)
- [x] Add region headings to county list on home page to improve clarity
- [x] Create individual landing pages for all 27 counties optimized for local search
- [x] Implement visual region selector on service areas page to filter locations by region

## County Pages Enhancement (February 2026)
- [x] Add section listing major towns and villages served to each county page for improved local SEO

## County Page Integration (February 2026)
- [x] Update Header navigation dropdown to link counties to their dedicated pages
- [x] Update home page county list to link to county pages
- [x] Update service areas page to link counties to their pages
- [x] Ensure all locations where counties are mentioned link to the new county pages

## County Page Map Fix (February 2026)
- [x] Fix Google Maps API error on all county pages (showing "The provided API key is invalid")

## County Page FAQ Section (February 2026)
- [x] Add county-specific FAQ section to all 27 county pages to improve local SEO and answer common questions

## County Page Interactive Map (February 2026)
- [x] Add interactive Google Maps to each county page showing major towns and villages with markers

## Location Pages for All Towns and Villages (February 2026)
- [x] Extract all unique towns and villages from county data (605 locations)
- [x] Create individual location pages for all towns and villages (605 pages created)
- [x] Update routing and navigation to include all location pages (dynamic routing implemented)

## Location Pages Integration (February 2026)
- [x] Make town/village names clickable on county pages, linking to their individual location pages
- [x] Generate and save XML sitemap including all 605 location pages (639 total URLs)
- [x] Fix TypeScript errors in 102 existing city service area pages

## Location Page Quote Form (February 2026)
- [x] Add "Request a Quote" form to all location pages with automatic location name pre-fill

## Location Page Maps (February 2026)
- [x] Add interactive Google Maps to all 605 location pages showing specific location with marker

## Nested Anchor Tag Error Fix (February 2026)
- [x] Fix nested anchor tag error on home page (and other pages if applicable)

## SEO and Performance Improvements (February 2026)
- [x] Enhance LocalBusiness schema markup on all location pages with business hours and service area
- [x] Split sitemap.xml into sitemap index with separate files for counties, cities, and towns (4 sitemaps, 660 total URLs)
- [x] Implement lazy loading for location maps to improve page load performance

## Additional SEO and Navigation Improvements (February 2026)
- [x] Create robots.txt file referencing sitemap index to guide search engine crawlers
- [x] Add review and aggregate rating schema markup to all location pages
- [x] Add dynamic breadcrumb navigation to all location and county pages (already implemented)

## Scroll to Top Button (February 2026)
- [x] Implement scroll-to-top button that appears after scrolling down on all pages

## County-to-City Cross-Linking (February 2026)
- [x] Create county-to-city cross-linking section component
- [x] Add cross-linking sections to all 27 county pages with links to major towns/cities

## XML Sitemaps for Search Console (February 2026)
- [x] Verify and enhance existing sitemap structure (index + individual sitemaps)
- [x] Create documentation for Google Search Console submission

## Location Page Errors Fix (February 2026)
- [x] Fix "Cannot read properties of undefined (reading 'description')" error on location pages
- [x] Identify and fix all affected location pages with missing data (34 pages)
- [x] Add proper data validation to prevent undefined errors

## Auto-Generate Missing LocationData (February 2026)
- [x] Create script to automatically generate locationData entries for 34 missing service areas
- [x] Generate descriptions, FAQs, and metadata for each missing location
- [x] Add generated data to locationData.ts file

## Google Analytics 4 Setup (February 2026)
- [x] Set up GA4 tracking code in the website
- [x] Configure environment variable for GA4 measurement ID
- [x] Add tracking to all location and service area pages
- [x] Test GA4 tracking is working correctly

## GA4 Conversion Tracking (February 2026)
- [x] Integrate tracking into quote form submissions
- [x] Add tracking to phone number clicks (header, floating button, location pages)
- [x] Add tracking to email link clicks
- [x] Test all conversion events are firing correctly in GA4

## GA4 Conversion Setup & FAQ Schema (February 2026)
- [x] Create step-by-step guide for setting up GA4 conversion goals
- [x] Implement FAQ schema markup component using JSON-LD
- [x] Add FAQ schema to all location pages (605 pages)
- [x] Test FAQ schema with Google Rich Results Test

## HTTP to HTTPS Redirection (February 2026)
- [x] Implement server-side middleware to redirect all HTTP requests to HTTPS
- [x] Test redirection works for all pages

## BreadcrumbList Schema Implementation (February 2026)
- [x] Create BreadcrumbList schema component using JSON-LD
- [x] Integrate schema into all page types (home, services, industries, locations, counties, etc.)
- [x] Test schema with Google Rich Results Test

## HSTS, LocalBusiness Schema & Image Sitemap (February 2026)
- [x] Add HSTS (HTTP Strict Transport Security) header to server
- [x] Implement LocalBusiness schema component with opening hours
- [x] Add LocalBusiness schema to all 605 location pages
- [x] Generate XML image sitemap from all website images
- [x] Test HSTS header, schema markup, and image sitemap

## WhatsApp Widget & Service Radius Maps (February 2026)
- [x] Create WhatsApp chat widget component matching Premier Blasting design
- [x] Add widget to all pages with phone number 07721 375 756
- [x] Create service radius map component showing 30-mile radius
- [x] Add embedded maps to all 605 location pages
- [x] Test WhatsApp widget and map functionality

## County Pages Optimization (February 2026)
- [x] Analyze current county page structure and identify improvement opportunities
- [x] Optimize meta descriptions with phone number (under 160 chars)
- [x] Apply SEO optimizations to all 27 county pages
- [x] Test all optimizations across 27 county pages

## Comprehensive SEO Optimization (February 2026)
- [x] Optimize all 605 location page meta descriptions with phone number (under 160 chars)
- [x] Add keyword-rich H2 subheadings to all county pages
- [x] Implement internal linking strategy between county and location pages
- [x] Test all SEO optimizations across the site

## Robots.txt Optimization (February 2026)
- [x] Create optimized robots.txt file with crawl directives
- [x] Add sitemap references to robots.txt
- [x] Test robots.txt configuration

## Sitemap Fix Reimplementation (February 2026) - Careful Testing Required
- [x] Analyze what went wrong with previous sitemap fix - Dynamic handler ran before static files
- [x] Implement safer solution to serve static sitemap files - Modified handler to check for static files first
- [x] Test sitemap accessibility in development - Sitemap index working, all sub-sitemaps accessible
- [x] Build and test production bundle before deployment - Production working correctly
- [x] Verify all 665 pages are discoverable in sitemap - Sitemap index + all sub-sitemaps accessible
- [x] Test that site loads correctly after changes - Homepage loading correctly

## React Version Mismatch Fix (February 2026)
- [x] Update react and react-dom to matching versions - Both now at 19.0.0
- [x] Clear node_modules and reinstall dependencies - Dependencies re-optimized
- [x] Restart server and verify fix - Server running, site loading correctly

## Google Analytics Event Tracking (February 2026)
- [x] Identify all contact forms on the site - HubSpotForm component used site-wide
- [x] Implement GA4 event tracking helper function - analytics.ts with trackEvent(), trackFormSubmission(), trackQuoteFormSubmission()
- [x] Add event tracking to main contact form - HubSpotForm tracks 'form_submission' and 'generate_lead' events
- [x] Add event tracking to location-specific contact forms - All forms use same HubSpotForm component with tracking
- [x] Add event tracking to quote request forms - trackQuoteRequest() fires when popup opens, trackQuoteFormSubmission() on submit
- [x] Add full UTM attribution to all events - First-touch and last-touch UTM tracking implemented
- [ ] Test GA4 events are firing correctly in Google Analytics dashboard

## Sitemap Production Issue (February 2026) - Still Serving Dynamic URLs
- [x] Investigate why production still serves dynamic sitemap instead of sitemap index - Handler was falling back to dynamic generation
- [x] Check if sitemap handler is still generating URLs dynamically - Yes, fallback was being triggered
- [x] Implement proper static sitemap index serving - Removed dynamic handler completely
- [x] Remove dynamic sitemap generation entirely - Handler removed, static files served by Express
- [x] Test dev server sitemap returns sitemap index with all sub-sitemaps - Working correctly
- [ ] Publish checkpoint f770b8ba to production
- [ ] Re-fetch sitemap in Google Search Console after deployment
- [ ] Verify Google Search Console discovers all 665+ pages (check in 24-48 hours)

## Alternative Sitemap Approach (February 2026) - Submit Sub-Sitemaps Directly
- [ ] Investigate why production STILL serves dynamic sitemap after checkpoint deployment
- [ ] Check if there's server-side caching or CDN caching the old sitemap
- [ ] Alternative approach: Submit each sub-sitemap directly to Google Search Console
- [ ] Submit sitemap-main.xml to Google Search Console
- [ ] Submit sitemap-counties.xml to Google Search Console
- [ ] Submit sitemap-locations-1.xml to Google Search Console
- [ ] Submit sitemap-locations-2.xml to Google Search Console
- [ ] Submit sitemap-images.xml to Google Search Console
- [ ] Verify total discovered pages = 665+ across all sitemaps

## Project Export for Transfer (February 2026)
- [x] Retrieve VITE_FRONTEND_FORGE_API_KEY value - KczkTsTRoZBA8SgTRSoBSU
- [ ] Create complete project export package
- [ ] Document all environment variables and secrets
- [ ] Create transfer instructions for new Manus account
- [ ] Package all project files for download
