# Live Sitemap Audit — 16 August 2026

The live submitted `sitemap-service-areas.xml` remains a static URL set showing 638 service-area URLs. The live `sitemap-counties.xml` remains a static URL set showing 25 county hub URLs. Both are behind the current dynamic catalogue, which contains 765 service-area records and 43 county hub records.

The live `sitemap-main.xml` is also static and overlaps the canonical dynamic `/sitemap.xml`; its historical route list includes legacy coverage. The image-only `sitemap-images.xml` should remain available as a separate image sitemap.

The consolidation approach is to retain `/sitemap-images.xml`, establish `/sitemap.xml` as the single canonical page sitemap, redirect the stale static page sitemaps to `/sitemap.xml`, and remove only the stale static page-sitemap references from robots/discovery files.

Verification after implementation: the server-rendered `/sitemap` page reports 765 service areas and 43 county hubs, and includes a direct XML sitemap link. This aligns the crawler-visible HTML with the live route catalogues.
