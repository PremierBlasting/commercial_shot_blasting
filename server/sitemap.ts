import { publicProcedure, router } from "./_core/trpc";

// Define all static and dynamic routes for the sitemap
const sitemapRoutes = [
  // Main pages
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/about", changefreq: "monthly", priority: 0.8 },
  { url: "/contact", changefreq: "monthly", priority: 0.8 },
  { url: "/gallery", changefreq: "weekly", priority: 0.7 },
  { url: "/services", changefreq: "weekly", priority: 0.9 },
  { url: "/service-areas", changefreq: "monthly", priority: 0.9 },
  { url: "/preparation-cleanup", changefreq: "monthly", priority: 0.7 },
  { url: "/free-site-survey", changefreq: "monthly", priority: 0.8 },
  { url: "/blog", changefreq: "weekly", priority: 0.7 },
  { url: "/privacy-policy", changefreq: "yearly", priority: 0.3 },
  { url: "/terms", changefreq: "yearly", priority: 0.3 },
  
  // Service pages
  { url: "/services/structural-steel-frames", changefreq: "monthly", priority: 0.8 },
  { url: "/services/steel-containers", changefreq: "monthly", priority: 0.8 },
  { url: "/services/factory-cladding", changefreq: "monthly", priority: 0.8 },
  { url: "/services/fire-escapes", changefreq: "monthly", priority: 0.8 },
  { url: "/services/staircases", changefreq: "monthly", priority: 0.8 },
  { url: "/services/bridge-steelwork", changefreq: "monthly", priority: 0.8 },
  { url: "/services/ladders", changefreq: "monthly", priority: 0.8 },
  { url: "/services/warehouse-racking", changefreq: "monthly", priority: 0.8 },
  { url: "/services/pipework", changefreq: "monthly", priority: 0.8 },
  { url: "/services/telecom-towers", changefreq: "monthly", priority: 0.8 },
  { url: "/services/floor-preparation", changefreq: "monthly", priority: 0.8 },
  { url: "/services/powder-coating", changefreq: "monthly", priority: 0.8 },
  { url: "/services/commercial-radiators", changefreq: "monthly", priority: 0.8 },
  { url: "/services/commercial-vehicles", changefreq: "monthly", priority: 0.8 },
  { url: "/services/steel-doors", changefreq: "monthly", priority: 0.8 },
  { url: "/services/steel-sheeting", changefreq: "monthly", priority: 0.8 },
  { url: "/services/steel-gates", changefreq: "monthly", priority: 0.8 },
  
  // Industry pages
  { url: "/industries/construction", changefreq: "monthly", priority: 0.8 },
  { url: "/industries/manufacturing", changefreq: "monthly", priority: 0.8 },
  { url: "/industries/retail", changefreq: "monthly", priority: 0.8 },
  { url: "/industries/aerospace", changefreq: "monthly", priority: 0.8 },
  { url: "/industries/marine", changefreq: "monthly", priority: 0.8 },
  { url: "/industries/agriculture", changefreq: "monthly", priority: 0.8 },
  { url: "/industries/transport-logistics", changefreq: "monthly", priority: 0.8 },
  { url: "/industries/heritage-restoration", changefreq: "monthly", priority: 0.8 },
  
  // Service area pages
  { url: "/service-areas/birmingham", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/sheffield", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/manchester", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/bristol", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/leeds", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/liverpool", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/cambridge", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/cardiff", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/chester", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/coventry", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/derby", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/gloucester", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/hereford", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/ipswich", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/leicester", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/lincoln", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/milton-keynes", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/norwich", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/nottingham", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/shrewsbury", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/st-albans", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/stoke", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/swindon", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/stratford-upon-avon", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/wolverhampton", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/worcester", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/northampton", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/oxford", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/peterborough", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/chesterfield", changefreq: "monthly", priority: 0.7 },
  { url: "/service-areas/wrexham", changefreq: "monthly", priority: 0.7 },
];

export const sitemapRouter = router({
  // Get all sitemap routes
  getRoutes: publicProcedure.query(() => {
    return sitemapRoutes;
  }),
  
  // Generate XML sitemap
  generateXML: publicProcedure.query(() => {
    const baseUrl = process.env.VITE_APP_URL || "https://commercialshotblasting.co.uk";
    const currentDate = new Date().toISOString().split('T')[0];
    
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const xmlFooter = '\n</urlset>';
    
    const urlEntries = sitemapRoutes.map(route => {
      return `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    }).join('');
    
    return xmlHeader + urlEntries + xmlFooter;
  }),
});
