// Server-side meta tag and JSON-LD injection for SEO
// This ensures OG tags and structured data are in the initial HTML for crawlers
import { getContentDetail, getHtmlPath, renderHtmlRouteError, resolveHtmlRoute, type HtmlContentContext } from "./contentRouteExistence";
import { locationData } from "@shared/locationData";
import * as fs from "fs";
import * as path from "path";
import { countyData, CountyData } from "@shared/countyData";
import { servicePreparationSteps } from "@shared/servicePreparationSteps";
import { countyContext } from "@shared/countyContext";
import { getTownSpotlight } from "@shared/townSpotlight";
import { countyOgImageUrl, townOgImageUrl } from "./ogImage";
import { locationSlugIndex } from "../client/src/data/locationSlugIndex";
import { countyData as clientCountyData } from "../client/src/data/countyData";
import { getTierAPillarResources } from "@shared/tierAPillarResources";
import { getCountyPillarResources } from "@shared/countyPillarResources";
import { getIndustryPillarResources } from "@shared/industryPillarResources";
import { getAreaProjectEvidence, priorityCountyCommercialContent, priorityTownCommercialContent } from "@shared/priorityLocalSeoContent";
import { getCountyProjectEvidenceIndex } from "@shared/countyProjectEvidence";
import { normaliseResponseTimeCopy } from "@shared/seoContentPolicy";
import { getLocationRobotsDirective, isIndexableLocation } from "@shared/locationSeoTiers";
import { AEO_DECISION_ANSWERS_BY_SERVICE } from "@shared/aeoDecisionAnswers";
import { getPriorityLocalNearMeCopy, getPriorityLocalNearMeFaqs, getPriorityLocalNearMeMetadata } from "@shared/priorityLocalNearMePilot";
import { GOOGLE_BUSINESS_PROFILE_URL } from "@shared/googleBusinessProfile";
import { HOMEPAGE_HB_FILM } from "@shared/homepageHBTunnellingFilm";
import { HOMEPAGE_INTUMESCENT_SERVICE } from "@shared/homepageIntumescentService";
import { HOMEPAGE_CUSTOMER_COPY } from "@shared/homepageCustomerCopy";
import { HOMEPAGE_FAQS } from "@shared/homepageFAQs";
import { getLocalAreaHeroImage } from "@shared/localAreaHeroImage";
import { injectAppLegalPage } from "./appLegalPages";
// County chunk preload manifest (loaded once at startup in production)
let countyChunkManifest: Record<string, string> | null = null;
function getCountyChunkPath(countySlug: string): string | null {
  if (!countyChunkManifest) {
    try {
      const manifestPath = path.resolve(process.cwd(), 'dist/public/county-chunk-manifest.json');
      if (fs.existsSync(manifestPath)) {
        countyChunkManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      } else {
        countyChunkManifest = {};
      }
    } catch {
      countyChunkManifest = {};
    }
  }
  return countyChunkManifest?.[countySlug] || null;
}

/** Inject a <link rel="modulepreload"> for the county chunk into the HTML head */
function injectCountyChunkPreload(html: string, countySlug: string): string {
  const chunkPath = getCountyChunkPath(countySlug);
  if (!chunkPath) return html;
  const preloadTag = `<link rel="modulepreload" href="${chunkPath}" />`;
  return html.replace('</head>', `  ${preloadTag}\n  </head>`);
}

interface LocationMeta {
  title: string;
  description: string;
  url: string;
}

/**
 * Search Console highlights these towns for commercially relevant shot blasting
 * and sandblasting searches. Keep their canonical server-side snippet copy exact,
 * factual, and distinct from generic legacy location records.
 */
const highImpressionLocationMeta: Record<string, LocationMeta> = {
  "derby": { ...getPriorityLocalNearMeMetadata("derby", "Derby")!, url: "https://commercialshotblasting.co.uk/service-areas/derby" },
  "birmingham": { title: "Sandblasting Birmingham | Commercial Shot Blasting & Surface Preparation", description: "Commercial sandblasting and shot blasting in Birmingham for metal surface preparation, rust and coating removal, structural steel, plant and cladding. Request A Site Visit.", url: "https://commercialshotblasting.co.uk/service-areas/birmingham" },
  "liverpool": { title: "Sand Blasting Liverpool | Commercial Shot Blasting", description: "Commercial sand blasting and shot blasting in Liverpool for metal surface preparation, rust and coating removal, structural steel, plant and cladding. Request A Site Visit.", url: "https://commercialshotblasting.co.uk/service-areas/liverpool" },
  "northampton": { title: "Sandblasting Northampton | Commercial Surface Preparation", description: "Commercial sandblasting and shot blasting in Northampton for metal surface preparation, rust and coating removal, structural steel, plant and cladding. Request A Site Visit.", url: "https://commercialshotblasting.co.uk/service-areas/northampton" },
  "leicester": { title: "Sandblasting Leicester | Commercial Surface Preparation", description: "Commercial sandblasting and shot blasting in Leicester for metal surface preparation, rust and coating removal, structural steel, plant and cladding. Request A Site Visit.", url: "https://commercialshotblasting.co.uk/service-areas/leicester" },
  "chester": { title: "Sandblasting & Shot Blasting Chester | Commercial Surface Preparation", description: "Commercial sandblasting and shot blasting in Chester for metal surface preparation, rust and coating removal, structural steel, plant and cladding. Request A Site Visit.", url: "https://commercialshotblasting.co.uk/service-areas/chester" },
  "bury-st-edmunds": { title: "Sandblasting Bury St Edmunds | Commercial Shot Blasting", description: "Commercial sandblasting and shot blasting in Bury St Edmunds for metal surface preparation, rust and coating removal, structural steel, plant and cladding. Request A Site Visit.", url: "https://commercialshotblasting.co.uk/service-areas/bury-st-edmunds" },
  "nottingham": { title: "Shot Blasting Nottingham | Commercial Metal Surface Preparation", description: "Commercial shot blasting in Nottingham for metal surface preparation, rust and coating removal, structural steel, plant and cladding. Request A Site Visit.", url: "https://commercialshotblasting.co.uk/service-areas/nottingham" },
  "coventry": { title: "Shot Blasting Coventry | Commercial Metal Surface Preparation", description: "Commercial shot blasting in Coventry for metal surface preparation, rust and coating removal, structural steel, plant and cladding. Request A Site Visit.", url: "https://commercialshotblasting.co.uk/service-areas/coventry" },
  "carlisle": { title: "Shot Blasting Carlisle | Commercial Metal Surface Preparation", description: "Commercial shot blasting in Carlisle for metal surface preparation, rust and coating removal, structural steel, plant and cladding. Request A Site Visit.", url: "https://commercialshotblasting.co.uk/service-areas/carlisle" },
  "colchester": { title: "Sandblasting Colchester | Commercial Shot Blasting", description: "Commercial sandblasting and shot blasting in Colchester for metal surface preparation, rust and coating removal, structural steel, plant and cladding. Request A Site Visit.", url: "https://commercialshotblasting.co.uk/service-areas/colchester" },
  "wolverhampton": { title: "Shot Blasting Wolverhampton | Commercial Surface Preparation", description: "Commercial shot blasting in Wolverhampton for metal surface preparation, rust and coating removal, structural steel, plant and cladding. Request A Site Visit.", url: "https://commercialshotblasting.co.uk/service-areas/wolverhampton" },
  "stoke-on-trent": { title: "Shot Blasting Stoke-on-Trent | Commercial Surface Preparation", description: "Commercial shot blasting in Stoke-on-Trent for metal surface preparation, rust and coating removal, structural steel, plant and cladding. Request A Site Visit.", url: "https://commercialshotblasting.co.uk/service-areas/stoke-on-trent" },
  "stoke": { title: "Shot Blasting Stoke-on-Trent | Commercial Surface Preparation", description: "Commercial shot blasting in Stoke-on-Trent for metal surface preparation, rust and coating removal, structural steel, plant and cladding. Request A Site Visit.", url: "https://commercialshotblasting.co.uk/service-areas/stoke" },
  "wirral": { title: "Sandblasting Wirral | Commercial Shot Blasting", description: "Commercial sandblasting and shot blasting in Wirral for metal surface preparation, rust and coating removal, structural steel, plant and cladding. Request A Site Visit.", url: "https://commercialshotblasting.co.uk/service-areas/wirral" },
  "hitchin": { title: "Sandblasting Hitchin | Commercial Shot Blasting", description: "Commercial sandblasting and shot blasting in Hitchin for metal surface preparation, rust and coating removal, structural steel, plant and cladding. Request A Site Visit.", url: "https://commercialshotblasting.co.uk/service-areas/hitchin" },
};

// Coordinates for all locations (must match client/public/jsonld-inject.js)
const locCoords: Record<string, [number, number]> = {
  "birmingham": [52.4862, -1.8904], "wolverhampton": [52.587, -2.1288], "coventry": [52.4068, -1.5197],
  "worcester": [52.1936, -2.2216], "stratford-upon-avon": [52.1917, -1.7083], "nottingham": [52.9548, -1.1581],
  "leicester": [52.6369, -1.1398], "derby": [52.9225, -1.4746], "northampton": [52.2405, -0.9027],
  "chesterfield": [53.235, -1.421], "lincoln": [53.2307, -0.5406], "sheffield": [53.3811, -1.4701],
  "leeds": [53.8008, -1.5491], "liverpool": [53.4084, -2.9916], "manchester": [53.4808, -2.2426],
  "chester": [53.193, -2.8931], "norwich": [52.6309, 1.2974], "cambridge": [52.2053, 0.1218],
  "peterborough": [52.5695, -0.2405], "ipswich": [52.0567, 1.1482], "bristol": [51.4545, -2.5879],
  "gloucester": [51.8642, -2.2382], "swindon": [51.5558, -1.7797], "oxford": [51.752, -1.2577],
  "milton-keynes": [52.0406, -0.7594], "shrewsbury": [52.7077, -2.754], "hereford": [52.0565, -2.716],
  "wrexham": [53.0469, -2.9927], "cardiff": [51.4816, -3.1791], "stoke-on-trent": [53.0027, -2.1794],
};

// Location data for meta tags (must match client/src/data/locationData.ts)
const locationMeta: Record<string, LocationMeta> = {
  // West Midlands
  "birmingham": {
    title: "Birmingham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Birmingham — structural steelwork, factory cladding & industrial plant. SA2.5/SA3 standard. Serving the West Midlands — shot blasting near me. Free site survey. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/birmingham"
  },
  "wolverhampton": {
    title: "Wolverhampton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Wolverhampton — manufacturing plant, automotive components & structural steel. SA2.5/SA3 standard. West Midlands coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/wolverhampton"
  },
  "coventry": {
    title: "Coventry Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Coventry — automotive & aerospace surface preparation to SA2.5/SA3 standard. Structural steel, containers & cladding — shot blasting near me. Free site survey. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/coventry"
  },
  // East Midlands
  "leicester": {
    title: "Leicester Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Leicester — manufacturing plant, logistics structures & engineering steelwork. SA2.5/SA3 standard. East Midlands coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/leicester"
  },
  "derby": {
    ...getPriorityLocalNearMeMetadata("derby", "Derby")!,
    url: "https://commercialshotblasting.co.uk/service-areas/derby"
  },
  "nottingham": {
    title: "Nottingham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Nottingham — pharmaceutical plant, construction steelwork & industrial equipment. SA2.5/SA3 standard. Nottinghamshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/nottingham"
  },
  // Yorkshire
  "sheffield": {
    title: "Sheffield Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Sheffield — structural steel fabrications, manufacturing plant & engineering components. SA2.5/SA3 standard. South Yorkshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/sheffield"
  },
  "leeds": {
    title: "Leeds Shot Blasting & Sandblasting | Commercial Surface Preparation",
    description: "Commercial shot blasting and sandblasting in Leeds for steelwork, plant, cladding, containers and coating handover. Request A Site Visit for a project-specific scope.",
    url: "https://commercialshotblasting.co.uk/service-areas/leeds"
  },
  // North West
  "manchester": {
    title: "Manchester Shot Blasting & Sandblasting | Commercial Surface Preparation",
    description: "Commercial shot blasting and sandblasting in Manchester for fabricated steel, plant, structural frames and coating preparation. Request A Site Visit for a project-specific scope.",
    url: "https://commercialshotblasting.co.uk/service-areas/manchester"
  },
  "liverpool": {
    title: "Liverpool Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Liverpool — marine & port structures, logistics plant & industrial steelwork. SA2.5/SA3 standard. Merseyside coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/liverpool"
  },
  "chester": {
    title: "Chester Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Chester — heritage structures, manufacturing plant & commercial construction steelwork. SA2.5/SA3 standard. Cheshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/chester"
  },
  // Staffordshire
  "stoke-on-trent": {
    title: "Stoke-on-Trent Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Stoke-on-Trent — ceramics industry plant, manufacturing structures & construction steelwork. SA2.5/SA3 standard. Staffordshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/stoke-on-trent"
  },
  // Shropshire
  "shrewsbury": {
    title: "Shrewsbury Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Shrewsbury — agricultural machinery, manufacturing plant & heritage structures. SA2.5/SA3 standard. Shropshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/shrewsbury"
  },
  // Worcestershire
  "worcester": {
    title: "Worcester Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Worcester — manufacturing plant, agricultural equipment & commercial construction. SA2.5/SA3 standard. Worcestershire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/worcester"
  },
  // Herefordshire
  "hereford": {
    title: "Hereford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Hereford — agricultural machinery, food processing plant & construction steelwork. SA2.5/SA3 standard. Herefordshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/hereford"
  },
  // Gloucestershire
  "gloucester": {
    title: "Gloucester Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Gloucester — aerospace fabrications, manufacturing plant & heritage structures. SA2.5/SA3 standard. Gloucestershire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/gloucester"
  },
  // South West
  "bristol": {
    title: "Bristol Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Bristol — aerospace & defence plant, marine structures & commercial construction. SA2.5/SA3 standard. Bristol & Bath coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/bristol"
  },
  // Wales
  "cardiff": {
    title: "Cardiff Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Cardiff — steel fabrications, port infrastructure & manufacturing plant. SA2.5/SA3 standard. South Wales coverage — shot blasting near me. Free site survey. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/cardiff"
  },
  "wrexham": {
    title: "Wrexham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Wrexham — manufacturing plant, automotive components & industrial steelwork. SA2.5/SA3 standard. North Wales coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/wrexham"
  },
  // Oxfordshire
  "oxford": {
    title: "Oxford Shot Blasting & Sandblasting | Commercial Surface Preparation",
    description: "Commercial shot blasting and sandblasting in Oxford for steelwork, plant, cladding, containers and surface-preparation handover. Request A Site Visit for your scope.",
    url: "https://commercialshotblasting.co.uk/service-areas/oxford"
  },
  // Wiltshire
  "swindon": {
    title: "Swindon Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Swindon — automotive & logistics plant, manufacturing structures & construction steelwork. SA2.5/SA3 standard. Wiltshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/swindon"
  },
  // Buckinghamshire
  "milton-keynes": {
    title: "Milton Keynes Shot Blasting & Sandblasting | Commercial Surface Preparation",
    description: "Commercial shot blasting and sandblasting in Milton Keynes for warehouse steelwork, plant, cladding, containers and coating handover. Request A Site Visit for your scope.",
    url: "https://commercialshotblasting.co.uk/service-areas/milton-keynes"
  },
  // Northamptonshire
  "northampton": {
    title: "Northampton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Northampton — logistics & distribution structures, manufacturing plant & construction steelwork. SA2.5/SA3 standard — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/northampton"
  },
  // Cambridgeshire
  "peterborough": {
    title: "Peterborough Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Peterborough — logistics & distribution plant, agricultural equipment & construction steelwork. SA2.5/SA3 standard — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/peterborough"
  },
  "cambridge": {
    title: "Cambridge Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Cambridge — research & technology plant, heritage structures & construction steelwork. SA2.5/SA3 standard. Cambridgeshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/cambridge"
  },
  // Norfolk
  "norwich": {
    title: "Norwich Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Norwich — agricultural machinery, food processing plant & construction steelwork. SA2.5/SA3 standard. Norfolk coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/norwich"
  },
  // Suffolk
  "ipswich": {
    title: "Ipswich Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Ipswich — marine & port structures, agricultural equipment & manufacturing plant. SA2.5/SA3 standard. Suffolk coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/ipswich"
  },
  // Lincolnshire
  "lincoln": {
    title: "Lincoln Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Lincoln — agricultural machinery, food processing plant & heritage structures. SA2.5/SA3 standard. Lincolnshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/lincoln"
  },
  "chesterfield": {
    title: "Chesterfield Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Chesterfield — manufacturing plant, construction steelwork & industrial equipment. SA2.5/SA3 standard. Derbyshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/chesterfield"
  },
  // Warwickshire
  "stratford-upon-avon": {
    title: "Stratford-upon-Avon Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Stratford-upon-Avon — heritage restoration, agricultural equipment & construction steelwork. SA2.5/SA3 standard. Warwickshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/stratford-upon-avon"
  },
  // North East England
  "newcastle": {
    title: "Newcastle Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Newcastle upon Tyne — shipbuilding & marine structures, automotive plant & construction steelwork. SA2.5/SA3 standard. Tyne & Wear coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/newcastle"
  },
  "sunderland": {
    title: "Sunderland Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Sunderland — automotive & manufacturing plant, marine structures & construction steelwork. SA2.5/SA3 standard. Tyne & Wear coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/sunderland"
  },
  "darlington": {
    title: "Darlington Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Darlington — manufacturing plant, engineering components & construction steelwork. SA2.5/SA3 standard. County Durham coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/darlington"
  },
  "carlisle": {
    title: "Carlisle Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Carlisle — manufacturing plant, agricultural equipment & construction steelwork. SA2.5/SA3 standard. Cumbria coverage — shot blasting near me. Free site survey. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/carlisle"
  },
  "gateshead": {
    title: "Gateshead Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Gateshead — structural steelwork, manufacturing plant & commercial construction. SA2.5/SA3 standard. Tyne & Wear coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/gateshead"
  },
  "middlesbrough": {
    title: "Middlesbrough Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Middlesbrough — chemical & petrochemical plant, steel fabrications & port infrastructure. SA2.5/SA3 standard. Teesside coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/middlesbrough"
  },
  "hartlepool": {
    title: "Hartlepool Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Hartlepool — marine & port structures, manufacturing plant & construction steelwork. SA2.5/SA3 standard. County Durham coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/hartlepool"
  },
  // North West England
  "preston": {
    title: "Preston Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Preston — manufacturing & textile engineering plant, energy sector structures & construction steelwork. SA2.5/SA3 standard. Lancashire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/preston"
  },
  "blackburn": {
    title: "Blackburn Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Blackburn — manufacturing plant, engineering structures & construction steelwork. SA2.5/SA3 standard. Lancashire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/blackburn"
  },
  // South England
  "southampton": {
    title: "Southampton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Southampton — marine & shipyard structures, port infrastructure & commercial construction. SA2.5/SA3 standard. Hampshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/southampton"
  },
  "portsmouth": {
    title: "Portsmouth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Portsmouth — naval & marine structures, aerospace & defence plant, commercial construction. SA2.5/SA3 standard. Hampshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/portsmouth"
  },
  "reading": {
    title: "Reading Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Reading — commercial construction steelwork, logistics plant & manufacturing structures. SA2.5/SA3 standard. Berkshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/reading"
  },
  // Essex
  "colchester": {
    title: "Colchester Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Colchester — logistics & distribution structures, agricultural plant & manufacturing steelwork. SA2.5/SA3 standard. Essex coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/colchester"
  },
  // Taunton / Somerset
  "taunton": {
    title: "Taunton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Taunton — agricultural machinery, food processing plant & construction steelwork. SA2.5/SA3 standard. Somerset coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/taunton"
  },
  // Yorkshire — additional towns
  "barnsley": {
    title: "Barnsley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Barnsley — structural steelwork, mining & engineering plant, industrial cladding. SA2.5/SA3 standard. South Yorkshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/barnsley"
  },
  "rotherham": {
    title: "Rotherham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Rotherham — steel & engineering structures, manufacturing plant & industrial containers. SA2.5/SA3 standard. South Yorkshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/rotherham"
  },
  "doncaster": {
    title: "Doncaster Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Doncaster — logistics & distribution structures, rail & transport plant, agricultural machinery. SA2.5/SA3 standard. South Yorkshire — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/doncaster"
  },
  "wakefield": {
    title: "Wakefield Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Wakefield — manufacturing & logistics structures, structural steelwork & industrial plant. SA2.5/SA3 standard. West Yorkshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/wakefield"
  },
  "bradford": {
    title: "Bradford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Bradford — textile & manufacturing plant, structural steelwork & commercial construction. SA2.5/SA3 standard. West Yorkshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/bradford"
  },
  "huddersfield": {
    title: "Huddersfield Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Huddersfield — engineering & manufacturing plant, industrial cladding & structural steel. SA2.5/SA3 standard. West Yorkshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/huddersfield"
  },
  "york": {
    title: "York Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in York — heritage & restoration steelwork, rail & transport structures, commercial construction. SA2.5/SA3 standard. North Yorkshire — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/york"
  },
  "harrogate": {
    title: "Harrogate Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Harrogate — commercial construction steelwork, agricultural plant & industrial structures. SA2.5/SA3 standard. North Yorkshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/harrogate"
  },
  // Greater Manchester — additional towns
  "salford": {
    title: "Salford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Salford — media & commercial construction steelwork, logistics plant & industrial structures. SA2.5/SA3 standard. Greater Manchester — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/salford"
  },
  "stockport": {
    title: "Stockport Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Stockport — manufacturing & engineering plant, commercial construction steelwork & industrial cladding. SA2.5/SA3 standard. Greater Manchester — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/stockport"
  },
  "bolton": {
    title: "Bolton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Bolton — engineering & manufacturing structures, industrial plant & commercial steelwork. SA2.5/SA3 standard. Greater Manchester coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/bolton"
  },
  "rochdale": {
    title: "Rochdale Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Rochdale — textile & manufacturing plant, industrial cladding & structural steelwork. SA2.5/SA3 standard. Greater Manchester coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/rochdale"
  },
  "oldham": {
    title: "Oldham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Oldham — engineering & manufacturing plant, commercial construction & industrial structures. SA2.5/SA3 standard. Greater Manchester — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/oldham"
  },
  // West Midlands — additional towns
  "walsall": {
    title: "Walsall Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Walsall — manufacturing & engineering plant, structural steelwork & industrial cladding. SA2.5/SA3 standard. West Midlands coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/walsall"
  },
  "west-bromwich": {
    title: "West Bromwich Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in West Bromwich — automotive & manufacturing plant, structural steelwork & industrial containers. SA2.5/SA3 standard. West Midlands — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/west-bromwich"
  },
  "solihull": {
    title: "Solihull Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Solihull — automotive & aerospace plant, commercial construction steelwork & industrial structures. SA2.5/SA3 standard. West Midlands — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/solihull"
  },
  "sutton-coldfield": {
    title: "Sutton Coldfield Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Sutton Coldfield — commercial construction steelwork, manufacturing plant & industrial structures. SA2.5/SA3 standard. West Midlands — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/sutton-coldfield"
  },
  "dudley": {
    title: "Dudley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Dudley — engineering & manufacturing plant, structural steelwork & industrial cladding. SA2.5/SA3 standard. West Midlands coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/dudley"
  },
  // East Midlands — additional towns
  "loughborough": {
    title: "Loughborough Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Loughborough — engineering & manufacturing plant, logistics structures & commercial steelwork. SA2.5/SA3 standard. Leicestershire — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/loughborough"
  },
  "mansfield": {
    title: "Mansfield Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Mansfield — manufacturing & engineering plant, structural steelwork & industrial containers. SA2.5/SA3 standard. Nottinghamshire — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/mansfield"
  },
  "tamworth": {
    title: "Tamworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Tamworth — logistics & distribution structures, manufacturing plant & commercial steelwork. SA2.5/SA3 standard. Staffordshire — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/tamworth"
  },
  "burton-on-trent": {
    title: "Burton-on-Trent Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Burton-on-Trent — brewing & food processing plant, logistics structures & manufacturing steelwork. SA2.5/SA3 standard. Staffordshire — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/burton-on-trent"
  },
  "stafford": {
    title: "Stafford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Stafford — engineering & manufacturing plant, commercial construction steelwork & industrial structures. SA2.5/SA3 standard. Staffordshire — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/stafford"
  },
  "telford": {
    title: "Telford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Telford — manufacturing & engineering plant, structural steelwork & industrial cladding. SA2.5/SA3 standard. Shropshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/telford"
  },
  // East of England — additional towns
  "luton": {
    title: "Luton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Luton — aerospace & aviation plant, logistics structures & commercial construction steelwork. SA2.5/SA3 standard. Bedfordshire — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/luton"
  },
  "stevenage": {
    title: "Stevenage Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Stevenage — aerospace & defence plant, manufacturing structures & commercial steelwork. SA2.5/SA3 standard. Hertfordshire — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/stevenage"
  },
  "watford": {
    title: "Watford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Watford — commercial construction steelwork, logistics plant & manufacturing structures. SA2.5/SA3 standard. Hertfordshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/watford"
  },
  "southend-on-sea": {
    title: "Southend-on-Sea Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Southend-on-Sea — marine & coastal structures, commercial construction & logistics plant. SA2.5/SA3 standard. Essex coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/southend-on-sea"
  },
  // South West — additional towns
  "bath": {
    title: "Bath Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Bath — heritage & restoration steelwork, commercial construction & industrial structures. SA2.5/SA3 standard. Somerset/Wiltshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/bath"
  },
  "exeter": {
    title: "Exeter Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Exeter — commercial construction steelwork, agricultural plant & industrial structures. SA2.5/SA3 standard. Devon coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/exeter"
  },
  "yeovil": {
    title: "Yeovil Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Yeovil — aerospace & defence plant, agricultural machinery & commercial construction steelwork. SA2.5/SA3 standard. Somerset — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/yeovil"
  },
  // Wales — additional towns
  "swansea": {
    title: "Swansea Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Swansea — marine & port structures, steel & manufacturing plant, commercial construction. SA2.5/SA3 standard. South Wales coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/swansea"
  },
  "newport": {
    title: "Newport Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Newport — steel & manufacturing plant, port infrastructure & commercial construction steelwork. SA2.5/SA3 standard. South Wales coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/newport"
  },
  "merthyr-tydfil": {
    title: "Merthyr Tydfil Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Merthyr Tydfil — engineering & manufacturing plant, structural steelwork & industrial structures. SA2.5/SA3 standard. South Wales coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/merthyr-tydfil"
  },
  // North West — additional towns
  "warrington": {
    title: "Warrington Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Warrington — chemical & process plant, logistics structures & manufacturing steelwork. SA2.5/SA3 standard. Cheshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/warrington"
  },
  "runcorn": {
    title: "Runcorn Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Runcorn — chemical & process plant, industrial structures & commercial construction steelwork. SA2.5/SA3 standard. Cheshire coverage — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/runcorn"
  },
  "widnes": {
    title: "Widnes Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Widnes — chemical & industrial plant, logistics structures & commercial steelwork. SA2.5/SA3 standard. Cheshire/Merseyside — shot blasting near me. Free quote. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/widnes"
  },
  "abbots-bromley": {
    title: "Abbots Bromley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Looking for top-tier shot blasting in Abbots Bromley? offering Construction and structural steel, surface preparation solutions. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/abbots-bromley"
  },
  "abergele": {
    title: "Abergele Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Abergele businesses, professional shot blasting. Enhance your manufacturing operations with our SA3 shot blasting. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/abergele"
  },
  "acle": {
    title: "Acle Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting in Acle: rust removal & surface preparation for Norfolks Agriculture sector. Quality results. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/acle"
  },
  "albrighton": {
    title: "Albrighton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Albrighton and Shropshire with professional shot blasting. Specializing in Construction, Agriculture and mobile. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/albrighton"
  },
  "alcester": {
    title: "Alcester Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting services in Alcester, Warwickshire. Specializing in SA2.5. Trusted by Warwickshire Manufacturing firms. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/alcester"
  },
  "aldeburgh": {
    title: "Aldeburgh Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Aldeburgh for Construction & Agriculture projects. Our SA3 service ensures pristine surfaces. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/aldeburgh"
  },
  "aldridge": {
    title: "Aldridge Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting solutions for Aldridge. We handle structural steel projects for Construction clients across West Midlands. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/aldridge"
  },
  "alford": {
    title: "Alford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "We provide structural steel shot blasting in Alford. Catering to Lincolnshire's Manufacturing and Agriculture sectors. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/alford"
  },
  "alfreton": {
    title: "Alfreton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist shot blasting in Alfreton — expert rust removal & SA2.5 steel cleaning. Helping Derbyshire manufacturing & construction. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/alfreton"
  },
  "alnwick": {
    title: "Alnwick Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable surface preparation shot blasting in Alnwick for Construction and Engineering projects. Ensure lasting finishes. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/alnwick"
  },
  "alsager": {
    title: "Alsager Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized shot blasting for Alsager's shot blasting. SA3, surface preparation. Serving Cheshire's Manufacturing, Construction sector. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/alsager"
  },
  "alvechurch": {
    title: "Alvechurch Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need SA3 shot blasting in Alvechurch? We provide expert solutions for Construction sectors. Specializing in Worcestershire for all your needs. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/alvechurch"
  },
  "amersham": {
    title: "Amersham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Amersham businesses, our shot blasting for Logistics and Manufacturing industries. Specializing in mobile and rust removal. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/amersham"
  },
  "amesbury": {
    title: "Amesbury Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional shot blasting solutions in Amesbury. We offer shot blasting, including mobile. Serving Wiltshire agriculture & manufacturing sectors....",
    url: "https://commercialshotblasting.co.uk/service-areas/amesbury"
  },
  "ampthill": {
    title: "Ampthill Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Manufacturing and Logistics in Ampthill, choose our expert shot blasting. Our team ensures SA2.5/SA3 standards for durable finishes. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/ampthill"
  },
  "anstey": {
    title: "Anstey Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "In Anstey, we offer professional shot blasting for Manufacturing. Specializing in surface preparation across Leicestershire. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/anstey"
  },
  "anston": {
    title: "Anston Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Discover the best SA3 shot blasting in Anston for your Construction and Manufacturing requirements.  Trust our skilled technicians. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/anston"
  },
  "appledore": {
    title: "Appledore Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Appledore for Marine & Agriculture projects. We offer rust removal and surface preparation services. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/appledore"
  },
  "arlesey": {
    title: "Arlesey Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Arlesey businesses trust our mobile shot blasting. Dedicated to supporting Bedfordshire's Manufacturing and Manufacturing sectors. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/arlesey"
  },
  "arnold": {
    title: "Arnold Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Comprehensive shot blasting in Arnold for manufacturing, engineering projects. Our rust removal shot blasting ensures top-quality results. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/arnold"
  },
  "ashbourne": {
    title: "Ashbourne Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Leading shot blasting in Ashbourne — SA3 standard rust removal for heavy machinery. Assisting Derbyshire construction professionals. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/ashbourne"
  },
  "ashby-de-la-zouch": {
    title: "Ashby-de-la-Zouch Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing SA2.5 shot blasting in Ashby-de-la-Zouch for Manufacturing & Engineering sectors. Covering all of Leicestershire. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/ashby-de-la-zouch"
  },
  "askern": {
    title: "Askern Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Seeking rust removal shot blasting in Askern? We cater to Steel and Manufacturing businesses with precision.  Advanced techniques applied. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/askern"
  },
  "atherstone": {
    title: "Atherstone Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Get superior shot blasting results in Atherstone. Specializing in SA3, rust removal. Supporting Warwickshire Manufacturing and Construction. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/atherstone"
  },
  "attleborough": {
    title: "Attleborough Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Seeking shot blasting in Attleborough? We offer structural steel & surface preparation services for Norfolks Agriculture industry. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/attleborough"
  },
  "aughton": {
    title: "Aughton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "From Manufacturing to Steel, Aughton trusts us for SA3 shot blasting services.  With years of experience.  Precision work every time. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/aughton"
  },
  "axbridge": {
    title: "Axbridge Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services for Axbridge, Somerset – specializing in rust removal & mobile. Call today. Fast, efficient, and reliable service.",
    url: "https://commercialshotblasting.co.uk/service-areas/axbridge"
  },
  "aylesbury": {
    title: "Aylesbury Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist shot blasting in Aylesbury for Manufacturing and Logistics industries. Specializing in structural steel. Get your surfaces ready. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/aylesbury"
  },
  "aylsham": {
    title: "Aylsham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Aylsham for Agriculture and Construction applications. Featuring SA2.5 and structural steel solutions. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/aylsham"
  },
  "baildon": {
    title: "Baildon Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Baildon for Engineering, Construction businesses. Our mobile solutions ensure optimal surface preparation. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/baildon"
  },
  "bakewell": {
    title: "Bakewell Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Industrial shot blasting in Bakewell — structural steel treatment & SA2.5 finishing. Ideal for Derbyshire engineering businesses. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/bakewell"
  },
  "banbury": {
    title: "Banbury Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Banbury, comprehensive shot blasting solutions including rust removal, and more. Serving Oxfordshire for the Aerospace sector. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/banbury"
  },
  "bangor-wales": {
    title: "Bangor Wales Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Bangor, East Wales. Professional rust removal shot blasting for manufacturing & construction in East Wales. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/bangor-wales"
  },
  "barnstaple": {
    title: "Barnstaple Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional shot blasting in Barnstaple for Agriculture & Agriculture sectors. Includes mobile & surface preparation. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/barnstaple"
  },
  "barrow-upon-soar": {
    title: "Barrow upon Soar Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Engineering in Barrow upon Soar, our shot blasting delivers surface preparation results. Trusted in Leicestershire. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/barrow-upon-soar"
  },
  "barton-le-clay": {
    title: "Barton-le-Clay Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Barton-le-Clay businesses trust our mobile shot blasting. Effective rust removal and surface preparation for all projects. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/barton-le-clay"
  },
  "batley": {
    title: "Batley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Batley for Construction businesses. Our rust removal solutions ensure optimal surface preparation. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/batley"
  },
  "bawtry": {
    title: "Bawtry Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Top-tier rust removal shot blasting in Bawtry for Construction and Manufacturing projects. Get a fast quote.  Utilizing modern equipment. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/bawtry"
  },
  "beaconsfield": {
    title: "Beaconsfield Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting in Beaconsfield for Manufacturing and Construction industries. Specializing in surface preparation. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/beaconsfield"
  },
  "beaumaris": {
    title: "Beaumaris Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist shot blasting services for Beaumaris. Ideal for construction projects. We offer surface preparation shot blasting for optimal results. Get a ...",
    url: "https://commercialshotblasting.co.uk/service-areas/beaumaris"
  },
  "beccles": {
    title: "Beccles Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Agriculture & Construction businesses in Beccles, professional shot blasting. Our structural steel service ensures pristine surfaces. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/beccles"
  },
  "bedford": {
    title: "Bedford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Bedford businesses trust our mobile shot blasting. Your go-to for all Manufacturing and Logistics shot blasting requirements. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/bedford"
  },
  "bedworth": {
    title: "Bedworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Enhance surfaces in Bedworth with our shot blasting. Specializing in structural steel, mobile. Trusted by Warwickshire Engineering firms. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/bedworth"
  },
  "beeston": {
    title: "Beeston Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Looking for shot blasting in Beeston? We offer construction projects. Our SA2.5 shot blasting ensures top-quality results. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/beeston"
  },
  "belper": {
    title: "Belper Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Belper — comprehensive SA2.5 surface preparation. Delivering for Derbyshire manufacturing businesses. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/belper"
  },
  "bentley": {
    title: "Bentley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Experience the difference with our rust removal shot blasting in Bentley for Construction and Steel sectors.  Dedicated to your satisfaction. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/bentley"
  },
  "bewdley": {
    title: "Bewdley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need shot blasting for surface preparation in Bewdley? We provide expert solutions for Manufacturing sectors. We serve all of Worcestershire. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/bewdley"
  },
  "biddulph": {
    title: "Biddulph Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Looking for top-tier shot blasting in Biddulph? offering Engineering and Construction and SA2.5, structural steel solutions. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/biddulph"
  },
  "bideford": {
    title: "Bideford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional shot blasting in Bideford for Agriculture & Construction sectors. Includes structural steel & surface preparation. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/bideford"
  },
  "biggleswade": {
    title: "Biggleswade Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Biggleswade businesses trust our mobile shot blasting. Effective rust removal and surface preparation for all projects. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/biggleswade"
  },
  "bilston": {
    title: "Bilston Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized shot blasting in Bilston and surrounding areas. Our expertise includes SA2.5, structural steel for Engineering, Construction app... Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/bilston"
  },
  "bingham": {
    title: "Bingham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Comprehensive shot blasting in Bingham for engineering projects. Our surface preparation shot blasting ensures top-quality results. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/bingham"
  },
  "bingley": {
    title: "Bingley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Comprehensive shot blasting in Bingley, West Yorkshire. Trusted for Manufacturing, Engineering applications, including mobile and rust removal. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/bingley"
  },
  "birkenhead": {
    title: "Birkenhead Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Birkenhead, Merseyside. Expert surface preparation and rust removal for Marine and Manufacturing industries. Get a free quote today.",
    url: "https://commercialshotblasting.co.uk/service-areas/birkenhead"
  },
  "bishops-castle": {
    title: "Bishops Castle Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Bishops Castle and Shropshire with professional shot blasting. Specializing in Agriculture and surface preparation. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/bishops-castle"
  },
  "blaby": {
    title: "Blaby Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "In Blaby, we offer professional shot blasting for Manufacturing & Engineering. Specializing in SA3 across Leicestershire. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/blaby"
  },
  "blaenau-ffestiniog": {
    title: "Blaenau Ffestiniog Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Blaenau Ffestiniog, East Wales. Serving construction sectors with rust removal shot blasting and rust removal. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/blaenau-ffestiniog"
  },
  "bletchley": {
    title: "Bletchley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist shot blasting in Bletchley for Logistics and Manufacturing industries. Specializing in surface preparation and SA2.5. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/bletchley"
  },
  "bloxwich": {
    title: "Bloxwich Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Bloxwich businesses, top-tier shot blasting services. Specializing in SA3, SA2.5 for the Manufacturing industry. Your local experts. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/bloxwich"
  },
  "bollington": {
    title: "Bollington Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need shot blasting in Bollington? Get quality shot blasting. structural steel. Serving Cheshire's Construction sector. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/bollington"
  },
  "bolsover": {
    title: "Bolsover Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Advanced shot blasting in Bolsover — SA3 mobile blasting for commercial steelwork. Assisting Derbyshire engineering professionals. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/bolsover"
  },
  "borehamwood": {
    title: "Borehamwood Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Borehamwood, Hertfordshire: reliable shot blasting for our structural steel services support Aerospace projects. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/borehamwood"
  },
  "boston": {
    title: "Boston Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Offering specialized rust removal shot blasting solutions in Boston. with proven results. Trusted by Lincolnshire's Construction sector. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/boston"
  },
  "bottisham": {
    title: "Bottisham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Seeking reliable shot blasting in Bottisham? Specializing in shot blasting for structural steel. Serving Cambridgeshire Manufacturing & Constru Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/bottisham"
  },
  "bourne": {
    title: "Bourne Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized surface preparation shot blasting solutions in Bourne. Catering to Lincolnshire's Agriculture and Construction sectors. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/bourne"
  },
  "bourton-on-the-water": {
    title: "Bourton-on-the-Water Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Bourton-on-the-Water. Ideal for Manufacturing, Agriculture applications, including mobile. Covering Gloucestershire...",
    url: "https://commercialshotblasting.co.uk/service-areas/bourton-on-the-water"
  },
  "bovingdon": {
    title: "Bovingdon Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Bovingdon, Hertfordshire: reliable shot blasting for offering surface preparation solutions for Manufacturing & Construction clients. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/bovingdon"
  },
  "brackley": {
    title: "Brackley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "From Brackley, we deliver professional shot blasting for rust removal. Offering rust removal and other shot blasting solutions for Construction, Logisti...",
    url: "https://commercialshotblasting.co.uk/service-areas/brackley"
  },
  "bradford-on-avon": {
    title: "Bradford-on-Avon Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Comprehensive shot blasting for Bradford-on-Avon businesses. We offer shot blasting, including structural steel. Serving Wiltshire construction sectors.",
    url: "https://commercialshotblasting.co.uk/service-areas/bradford-on-avon"
  },
  "brandon": {
    title: "Brandon Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Brandon, ideal for Agriculture sector. Our SA2.5 service ensures pristine surfaces. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/brandon"
  },
  "braunstone": {
    title: "Braunstone Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Manufacturing & Construction in Braunstone, our shot blasting delivers surface preparation results. Trusted in Leicestershire. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/braunstone"
  },
  "braunton": {
    title: "Braunton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Braunton for Marine & Agriculture projects. We offer mobile and surface preparation services. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/braunton"
  },
  "brewood": {
    title: "Brewood Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Looking for top-tier shot blasting in Brewood? providing Construction for rust removal, SA3 projects. Serving Staffordshire industries. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/brewood"
  },
  "bridgnorth": {
    title: "Bridgnorth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Manufacturing, Construction businesses in Bridgnorth, we offer top-tier shot blasting including surface preparation. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/bridgnorth"
  },
  "bridgwater": {
    title: "Bridgwater Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Bridgwater – mobile, SA2.5 for Agriculture & Construction sectors. Free quote. Advanced surface cleaning. Experienced team.",
    url: "https://commercialshotblasting.co.uk/service-areas/bridgwater"
  },
  "brierley-hill": {
    title: "Brierley Hill Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Leading shot blasting services available in Brierley Hill. Providing SA3, surface preparation solutions for Construction, Manufacturing comp... Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/brierley-hill"
  },
  "brigg": {
    title: "Brigg Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Highly professional & efficient SA3 shot blasting for Brigg. for various applications. A key partner for Lincolnshire's Agriculture industry. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/brigg"
  },
  "brighouse": {
    title: "Brighouse Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Brighouse for Construction businesses. Our mobile solutions ensure optimal surface preparation. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/brighouse"
  },
  "brixworth": {
    title: "Brixworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "High-quality shot blasting in Brixworth for Manufacturing, Logistics projects. Our mobile shot blasting services are perfect for Manufacturing, Logistic...",
    url: "https://commercialshotblasting.co.uk/service-areas/brixworth"
  },
  "broadway": {
    title: "Broadway Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Experience professional SA2.5 shot blasting in Broadway, perfect for Construction applications. We serve all of Worcestershire. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/broadway"
  },
  "bromham": {
    title: "Bromham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Bromham for Logistics projects. We handle everything from structural steel to factory cladding. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/bromham"
  },
  "bromsgrove": {
    title: "Bromsgrove Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Bromsgrove with top-tier shot blasting for rust removal, trusted by local Construction companies. We serve all of Worcestershire. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/bromsgrove"
  },
  "bromyard": {
    title: "Bromyard Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Quality shot blasting in Bromyard, perfect for construction and construction applications. surface preparation available. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/bromyard"
  },
  "broseley": {
    title: "Broseley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Broseley and Shropshire with professional shot blasting. Specializing in Manufacturing, Agriculture and rust removal. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/broseley"
  },
  "brownhills": {
    title: "Brownhills Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting solutions for Brownhills. We handle SA2.5, mobile projects for Construction, Engineering clients across West Midlands. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/brownhills"
  },
  "broxbourne": {
    title: "Broxbourne Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Broxbourne businesses: professional shot blasting services – delivering SA3 for Construction & Manufacturing businesses. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/broxbourne"
  },
  "brundall": {
    title: "Brundall Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting in Brundall: SA2.5 & SA3 for Norfolks Manufacturing sector. Quality results. Serving Norfolk with excellence. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/brundall"
  },
  "bruton": {
    title: "Bruton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized rust removal shot blasting in Bruton for Agriculture & Manufacturing projects. Call today. Experienced team. Competitive pricing.",
    url: "https://commercialshotblasting.co.uk/service-areas/bruton"
  },
  "buckingham": {
    title: "Buckingham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Buckingham for the Construction sector. Specializing in surface preparation. Achieving superior results. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/buckingham"
  },
  "buckley": {
    title: "Buckley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Buckley, East Wales. Serving agriculture sectors with SA2.5 shot blasting and rust removal. Free quote. We specialize in structu...",
    url: "https://commercialshotblasting.co.uk/service-areas/buckley"
  },
  "bulkington": {
    title: "Bulkington Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting services in Bulkington, Warwickshire. Specializing in surface preparation. Trusted by Warwickshire Manufacturing firms. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/bulkington"
  },
  "bulwell": {
    title: "Bulwell Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Looking for shot blasting in Bulwell? We offer engineering projects. Our mobile shot blasting ensures top-quality results. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/bulwell"
  },
  "bungay": {
    title: "Bungay Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Bungay for Manufacturing & Construction projects. Our rust removal service ensures pristine surfaces. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/bungay"
  },
  "buntingford": {
    title: "Buntingford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Buntingford businesses: professional shot blasting services – specializing in surface preparation for the Aerospace sector. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/buntingford"
  },
  "burbage": {
    title: "Burbage Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing structural steel shot blasting in Burbage for Engineering & Construction sectors. Covering all of Leicestershire. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/burbage"
  },
  "burnham-on-sea": {
    title: "Burnham-on-Sea Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized rust removal shot blasting in Burnham-on-Sea for Agriculture & Manufacturing projects. Call today. We handle all project sizes.",
    url: "https://commercialshotblasting.co.uk/service-areas/burnham-on-sea"
  },
  "burntwood": {
    title: "Burntwood Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting services available in Burntwood. providing Construction for SA2.5 projects. Trusted by Staffordshire businesses. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/burntwood"
  },
  "burton-latimer": {
    title: "Burton Latimer Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "High-quality shot blasting in Burton Latimer for Construction, Logistics projects. Offering SA2.5 and other shot blasting solutions for Construction, Lo...",
    url: "https://commercialshotblasting.co.uk/service-areas/burton-latimer"
  },
  "burton-upon-trent": {
    title: "Burton upon Trent Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Burton upon Trent specialists in professional shot blasting. with expertise in Engineering and Manufacturing and SA3, surface preparation. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/burton-upon-trent"
  },
  "burwell": {
    title: "Burwell Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "High-quality shot blasting in Burwell for Construction & Manufacturing needs. Specializing in shot blasting for rust removal, SA3. Serving Camb Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/burwell"
  },
  "bury-st-edmunds": {
    title: "Bury St Edmunds Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Bury St Edmunds, ideal for Manufacturing sector. Our structural steel service ensures pristine surfaces. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/bury-st-edmunds"
  },
  "bushey": {
    title: "Bushey Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Bushey, Hertfordshire: reliable shot blasting for we provide rust removal for Construction & Manufacturing applications. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/bushey"
  },
  "buxton": {
    title: "Buxton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "On-site shot blasting in Buxton — structural steel treatment & SA2.5 finishing. Serving Derbyshire engineering & construction. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/buxton"
  },
  "caernarfon": {
    title: "Caernarfon Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Caernarfon businesses, professional shot blasting. Ideal for agriculture & manufacturing projects. We offer SA3 shot blasting for optimal results. C...",
    url: "https://commercialshotblasting.co.uk/service-areas/caernarfon"
  },
  "caister-on-sea": {
    title: "Caister-on-Sea Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Caister-on-Sea for Manufacturing and Agriculture applications. Featuring rust removal and SA3 solutions. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/caister-on-sea"
  },
  "caistor": {
    title: "Caistor Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need SA2.5 shot blasting in Caistor? ensuring optimal results and durability. Ideal for Lincolnshire's Construction & Manufacturing firms. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/caistor"
  },
  "calne": {
    title: "Calne Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Agriculture & Manufacturing in Calne, rely on our shot blasting. We offer shot blasting, including SA2.5. Serving Wiltshire agriculture &...",
    url: "https://commercialshotblasting.co.uk/service-areas/calne"
  },
  "cambourne": {
    title: "Cambourne Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional shot blasting in Cambourne for Manufacturing & Construction projects. Specializing in shot blasting for structural steel, SA2.5. S Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/cambourne"
  },
  "cannock": {
    title: "Cannock Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Your go-to for shot blasting in Cannock and surrounding areas. with expertise in Manufacturing and mobile. Trusted by Staffordshire businesses. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/cannock"
  },
  "cannock-chase": {
    title: "Cannock Chase Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting services available in Cannock Chase. providing Manufacturing for SA3, SA2.5 projects. Serving Staffordshire industries. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/cannock-chase"
  },
  "castle-cary": {
    title: "Castle Cary Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Castle Cary with structural steel & rust removal solutions for Agriculture industry. Call today. Fully insured & certified.",
    url: "https://commercialshotblasting.co.uk/service-areas/castle-cary"
  },
  "castle-donington": {
    title: "Castle Donington Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Castle Donington for Construction projects. Expert rust removal services throughout Leicestershire. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/castle-donington"
  },
  "castleford": {
    title: "Castleford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Castleford for Construction sectors. We offer structural steel services to prepare surfaces perfectly. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/castleford"
  },
  "chapel-en-le-frith": {
    title: "Chapel-en-le-Frith Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Bespoke shot blasting in Chapel-en-le-Frith — structural steelwork & SA2.5 surface preparation. Assisting Derbyshire engineering professionals. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/chapel-en-le-frith"
  },
  "chapeltown": {
    title: "Chapeltown Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Offering rust removal shot blasting services in Chapeltown for Manufacturing and Steel industries.  Enhance durability and finish. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/chapeltown"
  },
  "chard": {
    title: "Chard Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services for Chard, Somerset – specializing in mobile & surface preparation. Get a quote. Serving Somerset area with expertise.",
    url: "https://commercialshotblasting.co.uk/service-areas/chard"
  },
  "chatteris": {
    title: "Chatteris Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Construction in Chatteris, choose our shot blasting services. Specializing in shot blasting for SA2.5, rust removal. Serving Cambridgeshire Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/chatteris"
  },
  "cheadle": {
    title: "Cheadle Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting services available in Cheadle. with expertise in Manufacturing and Engineering and structural steel. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/cheadle"
  },
  "cheddar": {
    title: "Cheddar Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services for Cheddar, Somerset – specializing in SA3 & rust removal. Free quote. Fully insured & certified.",
    url: "https://commercialshotblasting.co.uk/service-areas/cheddar"
  },
  "chelmsford": {
    title: "Chelmsford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Leading shot blasting solutions in Chelmsford, supporting local Logistics. Our shot blasting services offer SA2.5 for Logistics projects. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/chelmsford"
  },
  "cheltenham": {
    title: "Cheltenham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Cheltenham for Construction, Manufacturing sectors. Specializing in SA2.5 & rust removal. Serving Gloucestershire businesses. Ge...",
    url: "https://commercialshotblasting.co.uk/service-areas/cheltenham"
  },
  "chesham": {
    title: "Chesham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Chesham businesses, our shot blasting for the Manufacturing sector. Specializing in SA2.5 and structural steel. Get your surfaces ready. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/chesham"
  },
  "cheshunt": {
    title: "Cheshunt Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Cheshunt businesses: professional shot blasting services – our mobile services support Construction & Manufacturing projects. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/cheshunt"
  },
  "chippenham": {
    title: "Chippenham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized mobile shot blasting in Chippenham. We offer shot blasting, including SA3, structural steel. Serving Wiltshire agriculture sectors. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/chippenham"
  },
  "chipping-campden": {
    title: "Chipping Campden Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Chipping Campden. Ideal for Manufacturing applications, including structural steel & surface preparation. Covering ...",
    url: "https://commercialshotblasting.co.uk/service-areas/chipping-campden"
  },
  "chipping-sodbury": {
    title: "Chipping Sodbury Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Chipping Sodbury. Ideal for Construction, Manufacturing applications, including structural steel & SA3. Covering Gl...",
    url: "https://commercialshotblasting.co.uk/service-areas/chipping-sodbury"
  },
  "chorleywood": {
    title: "Chorleywood Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Chorleywood, Hertfordshire: reliable shot blasting for specializing in mobile for the Aerospace & Construction sector. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/chorleywood"
  },
  "church-stretton": {
    title: "Church Stretton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Church Stretton and Shropshire with professional shot blasting. Specializing in Construction, Manufacturing and surface preparation. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/church-stretton"
  },
  "cinderford": {
    title: "Cinderford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Cinderford. Ideal for Manufacturing applications, including SA2.5 & surface preparation. Covering Gloucestershire. ...",
    url: "https://commercialshotblasting.co.uk/service-areas/cinderford"
  },
  "cirencester": {
    title: "Cirencester Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Cirencester. We offer rust removal for Manufacturing, Construction projects across Gloucestershire. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/cirencester"
  },
  "clapham-bedfordshire": {
    title: "Clapham Bedfordshire Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Clapham for Manufacturing projects. Your go-to for all Manufacturing and Construction shot blasting requirements. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/clapham-bedfordshire"
  },
  "clare": {
    title: "Clare Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Clare for Agriculture & Construction needs. Our SA2.5 service ensures pristine surfaces. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/clare"
  },
  "clay-cross": {
    title: "Clay Cross Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Elite shot blasting in Clay Cross — comprehensive SA2.5 surface preparation. Assisting Derbyshire construction professionals. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/clay-cross"
  },
  "cleckheaton": {
    title: "Cleckheaton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Comprehensive shot blasting in Cleckheaton, West Yorkshire. Trusted for Engineering applications, including SA2.5 and rust removal. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/cleckheaton"
  },
  "cleethorpes": {
    title: "Cleethorpes Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need rust removal shot blasting in Cleethorpes? ensuring optimal results and durability. Serving Lincolnshire's Manufacturing businesses. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/cleethorpes"
  },
  "cleobury-mortimer": {
    title: "Cleobury Mortimer Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need surface preparation shot blasting in Cleobury Mortimer? We serve Shropshire industries like Construction, Agriculture. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/cleobury-mortimer"
  },
  "clevedon": {
    title: "Clevedon Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Clevedon with surface preparation & structural steel solutions for Manufacturing industry. Call today. Advanced surface cleaning.",
    url: "https://commercialshotblasting.co.uk/service-areas/clevedon"
  },
  "clifton-bedfordshire": {
    title: "Clifton Bedfordshire Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Clifton businesses trust our mobile shot blasting. Your go-to for all Logistics and Manufacturing shot blasting requirements. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/clifton-bedfordshire"
  },
  "coalville": {
    title: "Coalville Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist shot blasting in Coalville for Construction clients. Offering surface preparation services across Leicestershire. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/coalville"
  },
  "coleford": {
    title: "Coleford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Coleford. Ideal for Agriculture applications, including SA2.5. Covering Gloucestershire. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/coleford"
  },
  "coleshill": {
    title: "Coleshill Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting services in Coleshill, Warwickshire. Specializing in structural steel, SA3. Trusted by Warwickshire Construction firms. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/coleshill"
  },
  "colwyn-bay": {
    title: "Colwyn Bay Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Colwyn Bay businesses, professional shot blasting. Ideal for construction projects. We offer surface preparation shot blasting for optimal results. ...",
    url: "https://commercialshotblasting.co.uk/service-areas/colwyn-bay"
  },
  "combe-martin": {
    title: "Combe Martin Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Combe Martin for Agriculture & Marine projects. We offer surface preparation and structural steel services. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/combe-martin"
  },
  "comberton": {
    title: "Comberton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Seeking reliable shot blasting in Comberton? Specializing in shot blasting for surface preparation. Serving Cambridgeshire Agriculture & Manuf Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/comberton"
  },
  "congleton": {
    title: "Congleton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Your trusted partner in Congleton for shot blasting. mobile, SA3. Serving Cheshire's Manufacturing, Construction sector. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/congleton"
  },
  "conisbrough": {
    title: "Conisbrough Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Top-tier mobile shot blasting in Conisbrough for Steel and Construction projects. Get a fast quote.  Get a free consultation. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/conisbrough"
  },
  "connahs-quay": {
    title: "Connahs Quay Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Connah's Quay, East Wales. Serving construction sectors with structural steel shot blasting and rust removal. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/connahs-quay"
  },
  "conwy": {
    title: "Conwy Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Conwy, East Wales. Ideal for agriculture projects. We offer SA3 shot blasting for optimal results. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/conwy"
  },
  "corby": {
    title: "Corby Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "High-quality shot blasting in Corby for Logistics projects. Offering structural steel and other shot blasting solutions for Logistics projects. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/corby"
  },
  "corsham": {
    title: "Corsham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized mobile shot blasting in Corsham. We offer shot blasting, including mobile. Serving Wiltshire construction & agriculture sectors. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/corsham"
  },
  "corwen": {
    title: "Corwen Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist shot blasting services for Corwen. Professional SA2.5 shot blasting for agriculture in East Wales. Call today. We specialize in mobile and su...",
    url: "https://commercialshotblasting.co.uk/service-areas/corwen"
  },
  "coseley": {
    title: "Coseley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need professional shot blasting in Coseley? Our team provides rust removal, mobile for Manufacturing, Engineering businesses in West Midlands. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/coseley"
  },
  "costessey": {
    title: "Costessey Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Costessey for Agriculture and Manufacturing applications. Featuring rust removal and structural steel solutions. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/costessey"
  },
  "cottenham": {
    title: "Cottenham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Construction & Manufacturing in Cottenham, choose our shot blasting services. Specializing in shot blasting for SA3, rust removal. Serving Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/cottenham"
  },
  "countesthorpe": {
    title: "Countesthorpe Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Countesthorpe for Engineering & Construction projects. Expert rust removal services throughout Leicestershire. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/countesthorpe"
  },
  "cranfield": {
    title: "Cranfield Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Cranfield businesses trust our mobile shot blasting. Your go-to for all Logistics and Manufacturing shot blasting requirements. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/cranfield"
  },
  "craven-arms": {
    title: "Craven Arms Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Craven Arms and Shropshire with professional shot blasting. Specializing in Manufacturing, Agriculture and rust removal. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/craven-arms"
  },
  "crewe": {
    title: "Crewe Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized shot blasting for Crewe's shot blasting. rust removal. Serving Cheshire's Manufacturing, Construction sector. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/crewe"
  },
  "crewkerne": {
    title: "Crewkerne Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Looking for shot blasting in Crewkerne? We offer SA2.5 & mobile services for Manufacturing businesses. Free quote. Advanced surface cleaning.",
    url: "https://commercialshotblasting.co.uk/service-areas/crewkerne"
  },
  "cricklade": {
    title: "Cricklade Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting services in Cricklade for Agriculture & Manufacturing. We offer shot blasting, including mobile. Serving Wiltshire agriculture &...",
    url: "https://commercialshotblasting.co.uk/service-areas/cricklade"
  },
  "cromer": {
    title: "Cromer Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Seeking shot blasting in Cromer? We offer rust removal & structural steel services for Norfolks Agriculture industry. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/cromer"
  },
  "crowland": {
    title: "Crowland Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "We provide mobile shot blasting in Crowland. ensuring optimal results and durability. Serving Lincolnshire's Manufacturing businesses. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/crowland"
  },
  "croyde": {
    title: "Croyde Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Croyde for Agriculture & Agriculture projects. We offer rust removal and surface preparation services. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/croyde"
  },
  "darlaston": {
    title: "Darlaston Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Leading shot blasting services available in Darlaston. Providing surface preparation solutions for Manufacturing companies in West Midlands. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/darlaston"
  },
  "daventry": {
    title: "Daventry Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Daventry for Construction, Logistics. Our SA2.5 shot blasting services are perfect for Construction, Logistics businesses. Free ...",
    url: "https://commercialshotblasting.co.uk/service-areas/daventry"
  },
  "dawley": {
    title: "Dawley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Dawley and Shropshire with professional shot blasting. Specializing in Manufacturing, Construction and surface preparation. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/dawley"
  },
  "debenham": {
    title: "Debenham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Debenham for Agriculture projects. Our SA2.5 service ensures pristine surfaces for Agriculture clients. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/debenham"
  },
  "denbigh": {
    title: "Denbigh Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist shot blasting services for Denbigh. Enhance your construction operations with our surface preparation shot blasting. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/denbigh"
  },
  "dereham": {
    title: "Dereham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Seeking shot blasting in Dereham? We offer structural steel & SA2.5 comprehensive services for Norfolks Manufacturing industry. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/dereham"
  },
  "desborough": {
    title: "Desborough Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "In Desborough, our shot blasting tackles SA3 needs. Our SA3 shot blasting services are perfect for Manufacturing, Logistics businesses. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/desborough"
  },
  "devizes": {
    title: "Devizes Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Manufacturing & Agriculture in Devizes, rely on our shot blasting. We offer shot blasting, including SA2.5. Serving Wiltshire manufacturing &...",
    url: "https://commercialshotblasting.co.uk/service-areas/devizes"
  },
  "dewsbury": {
    title: "Dewsbury Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Dewsbury for Manufacturing, Engineering sectors. We offer SA3 services to prepare surfaces perfectly. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/dewsbury"
  },
  "dinnington": {
    title: "Dinnington Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Comprehensive rust removal shot blasting for Steel and Manufacturing projects in Dinnington.  Industry-leading standards. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/dinnington"
  },
  "diss": {
    title: "Diss Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting in Diss: surface preparation & rust removal for Norfolks Agriculture sector. Quality results. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/diss"
  },
  "dodworth": {
    title: "Dodworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Dedicated to Construction and Steel excellence, offering rust removal shot blasting in Dodworth.  Fast and efficient service. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/dodworth"
  },
  "dorridge": {
    title: "Dorridge Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Dorridge, West Midlands. We offer comprehensive services including surface preparation, rust removal. Serving Engine... Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/dorridge"
  },
  "downham-market": {
    title: "Downham Market Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "In Downham Market, get top-tier shot blasting for Manufacturing & Construction needs. Our mobile & SA3 services deliver. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/downham-market"
  },
  "downton": {
    title: "Downton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional shot blasting solutions in Downton. We offer shot blasting, including mobile. Serving Wiltshire manufacturing sectors. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/downton"
  },
  "droitwich-spa": {
    title: "Droitwich Spa Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specializing in shot blasting for rust removal in Droitwich Spa, we support Construction businesses. We serve all of Worcestershire. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/droitwich-spa"
  },
  "dronfield": {
    title: "Dronfield Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Quality shot blasting in Dronfield — expert rust removal & SA2.5 steel cleaning. For Derbyshire engineering & manufacturing sectors. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/dronfield"
  },
  "dunstable": {
    title: "Dunstable Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Dunstable businesses trust our mobile shot blasting. Trusted by Bedfordshire Construction and Manufacturing firms for superior finishes. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/dunstable"
  },
  "dursley": {
    title: "Dursley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Dursley. We offer surface preparation & mobile for Agriculture, Construction projects across Gloucestershire. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/dursley"
  },
  "duston": {
    title: "Duston Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing rust removal shot blasting services across Duston. Trusted for shot blasting in Construction, Logistics, focusing on rust removal standards. C...",
    url: "https://commercialshotblasting.co.uk/service-areas/duston"
  },
  "earl-shilton": {
    title: "Earl Shilton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "In Earl Shilton, we offer professional shot blasting for Construction. Specializing in rust removal across Leicestershire. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/earl-shilton"
  },
  "earls-barton": {
    title: "Earls Barton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "From Earls Barton, we deliver professional shot blasting for rust removal. Our rust removal shot blasting services are perfect for Manufacturing, Constr...",
    url: "https://commercialshotblasting.co.uk/service-areas/earls-barton"
  },
  "eastwood": {
    title: "Eastwood Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized shot blasting services in Eastwood, including engineering projects. Our mobile shot blasting ensures top-quality results. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/eastwood"
  },
  "eaton-socon": {
    title: "Eaton Socon Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional shot blasting in Eaton Socon for Agriculture & Construction projects. Specializing in shot blasting for surface preparation, SA3. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/eaton-socon"
  },
  "eccleshall": {
    title: "Eccleshall Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Your go-to for shot blasting in Eccleshall and surrounding areas. with expertise in Engineering and surface preparation. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/eccleshall"
  },
  "eckington": {
    title: "Eckington Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Local shot blasting in Eckington — surface preparation for factory cladding. Tailored for Derbyshire engineering & manufacturing professionals. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/eckington"
  },
  "edlington": {
    title: "Edlington Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Precision SA3 shot blasting for Construction and Steel applications across Edlington.  Enhance durability and finish.  Delivering excellence. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/edlington"
  },
  "elland": {
    title: "Elland Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Elland for Manufacturing businesses. Our SA3 solutions ensure optimal surface preparation. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/elland"
  },
  "ellesmere": {
    title: "Ellesmere Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Ellesmere and Shropshire with professional shot blasting. Specializing in Construction, Manufacturing and surface preparation. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/ellesmere"
  },
  "ellesmere-port": {
    title: "Ellesmere Port Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Ellesmere Port businesses, reliable shot blasting. surface preparation. Serving Cheshire's Manufacturing, Construction sector. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/ellesmere-port"
  },
  "ely": {
    title: "Ely Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Ely for Manufacturing. Specializing in shot blasting for structural steel, rust removal. Serving Cambridgeshire Manufa Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/ely"
  },
  "enderby": {
    title: "Enderby Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Enderby for Manufacturing projects. Expert structural steel services throughout Leicestershire. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/enderby"
  },
  "erdington": {
    title: "Erdington Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting solutions for Erdington. We handle structural steel projects for Engineering clients across West Midlands. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/erdington"
  },
  "evesham": {
    title: "Evesham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Evesham with top-tier SA2.5 shot blasting, trusted by local Construction companies. Specializing in Worcestershire for all your needs. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/evesham"
  },
  "eye": {
    title: "Eye Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Eye for Manufacturing & Agriculture needs. Our structural steel service ensures pristine surfaces. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/eye"
  },
  "fairford": {
    title: "Fairford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Fairford. Ideal for Construction applications, including structural steel & SA2.5. Covering Gloucestershire. Call t...",
    url: "https://commercialshotblasting.co.uk/service-areas/fairford"
  },
  "fakenham": {
    title: "Fakenham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Fakenham businesses: expert shot blasting for Agriculture & Construction sectors. Specializing in rust removal and SA3. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/fakenham"
  },
  "fazeley": {
    title: "Fazeley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Fazeley specialists in professional shot blasting. specializing in Engineering and structural steel, surface preparation. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/fazeley"
  },
  "felixstowe": {
    title: "Felixstowe Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Felixstowe for Manufacturing projects. Our structural steel service ensures pristine surfaces. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/felixstowe"
  },
  "flint": {
    title: "Flint Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist shot blasting services for Flint. Enhance your manufacturing operations with our SA3 shot blasting. Free quote. We specialize in rust removal...",
    url: "https://commercialshotblasting.co.uk/service-areas/flint"
  },
  "flitwick": {
    title: "Flitwick Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Flitwick for Construction projects. Your go-to for all Construction and Manufacturing shot blasting requirements. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/flitwick"
  },
  "framlingham": {
    title: "Framlingham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Framlingham, ideal for Manufacturing sector. Our structural steel service ensures pristine surfaces. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/framlingham"
  },
  "frodsham": {
    title: "Frodsham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting services in Frodsham for shot blasting. SA2.5. Serving Cheshire's Food Processing, Manufacturing sector. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/frodsham"
  },
  "frome": {
    title: "Frome Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Frome – SA2.5, surface preparation for Manufacturing & Agriculture sectors. Get a quote. Your local shot blasting specialists.",
    url: "https://commercialshotblasting.co.uk/service-areas/frome"
  },
  "gainsborough": {
    title: "Gainsborough Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert rust removal shot blasting in Gainsborough. Supporting Lincolnshire's Manufacturing and Agriculture industries. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/gainsborough"
  },
  "garforth": {
    title: "Garforth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Comprehensive shot blasting in Garforth, West Yorkshire. Trusted for Manufacturing applications, including structural steel and rust removal. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/garforth"
  },
  "gerrards-cross": {
    title: "Gerrards Cross Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Gerrards Cross for Construction and Manufacturing industries. Specializing in structural steel and SA2.5. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/gerrards-cross"
  },
  "girton": {
    title: "Girton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Girton for Construction. Specializing in shot blasting for mobile. Serving Cambridgeshire Construction sectors. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/girton"
  },
  "glastonbury": {
    title: "Glastonbury Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Glastonbury with mobile & SA3 solutions for Manufacturing industry. Free quote. Environmentally friendly methods.",
    url: "https://commercialshotblasting.co.uk/service-areas/glastonbury"
  },
  "glossop": {
    title: "Glossop Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Dynamic shot blasting in Glossop — dedicated expert rust removal & SA2.5 structural steel cleaning. Serving Derbyshire manufacturers. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/glossop"
  },
  "godmanchester": {
    title: "Godmanchester Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Construction in Godmanchester, choose our shot blasting services. Specializing in shot blasting for SA2.5, rust removal. Serving Cambridges Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/godmanchester"
  },
  "goldthorpe": {
    title: "Goldthorpe Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Delivering high-quality structural steel shot blasting to Goldthorpe. Essential for Steel and Manufacturing projects. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/goldthorpe"
  },
  "gorleston": {
    title: "Gorleston Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Gorleston for Manufacturing and Agriculture applications. Featuring surface preparation and rust removal solutions. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/gorleston"
  },
  "grantham": {
    title: "Grantham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional surface preparation shot blasting for Grantham. Ideal for Lincolnshire's Agriculture & Manufacturing firms. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/grantham"
  },
  "great-malvern": {
    title: "Great Malvern Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Experience professional SA3 shot blasting in Great Malvern, perfect for Construction applications. We serve all of Worcestershire. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/great-malvern"
  },
  "great-torrington": {
    title: "Great Torrington Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Great Torrington for Agriculture & Marine projects. We offer surface preparation and rust removal services. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/great-torrington"
  },
  "great-yarmouth": {
    title: "Great Yarmouth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting in Great Yarmouth: structural steel & SA2.5 for Norfolks Construction sector. Quality results. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/great-yarmouth"
  },
  "grimsby": {
    title: "Grimsby Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Grimsby, our SA2.5 shot blasting services. ensuring optimal results and durability. Trusted by Lincolnshire's Agriculture sector. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/grimsby"
  },
  "groby": {
    title: "Groby Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist shot blasting in Groby for Manufacturing & Engineering clients. Offering SA2.5 services across Leicestershire. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/groby"
  },
  "guildford": {
    title: "Guildford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Guildford businesses, our shot blasting includes structural steel, rust removal. Serving Surrey Manufacturing sector. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/guildford"
  },
  "guiseley": {
    title: "Guiseley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Guiseley for Engineering businesses. Our surface preparation solutions ensure optimal surface preparation. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/guiseley"
  },
  "hadfield": {
    title: "Hadfield Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Premier shot blasting in Hadfield — surface preparation for factory cladding. Ideal for Derbyshire engineering businesses. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/hadfield"
  },
  "hadleigh": {
    title: "Hadleigh Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Hadleigh for Construction needs. Our rust removal service ensures pristine surfaces. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/hadleigh"
  },
  "hagley": {
    title: "Hagley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Experience professional shot blasting for structural steel in Hagley, perfect for Agriculture and Construction applications. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/hagley"
  },
  "halesowen": {
    title: "Halesowen Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting solutions for Halesowen. We handle surface preparation, SA3 projects for Construction clients across West Midlands. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/halesowen"
  },
  "halesworth": {
    title: "Halesworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Halesworth for Agriculture projects. Our rust removal service ensures pristine surfaces for Agriculture clients. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/halesworth"
  },
  "halifax": {
    title: "Halifax Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Halifax for Construction businesses. Our surface preparation solutions ensure optimal surface preparation. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/halifax"
  },
  "handforth": {
    title: "Handforth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need shot blasting in Handforth? Get quality shot blasting. SA3, SA2.5. Serving Cheshire's Construction, Manufacturing sector. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/handforth"
  },
  "harleston": {
    title: "Harleston Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Harleston for Agriculture and Manufacturing applications. Featuring SA2.5 and SA3 solutions. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/harleston"
  },
  "harpenden": {
    title: "Harpenden Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Harpenden businesses: professional shot blasting services – delivering SA3 for Aerospace & Construction businesses. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/harpenden"
  },
  "hatfield": {
    title: "Hatfield Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Hatfield, Hertfordshire: reliable shot blasting for delivering surface preparation for Manufacturing businesses. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/hatfield"
  },
  "haverhill": {
    title: "Haverhill Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Haverhill for Construction needs. Our rust removal service ensures pristine surfaces. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/haverhill"
  },
  "haverhill-cambridgeshire": {
    title: "Haverhill Cambridgeshire Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Seeking reliable shot blasting in Haverhill? Specializing in shot blasting for structural steel. Serving Cambridgeshire Manufacturing sectors. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/haverhill-cambridgeshire"
  },
  "hay-on-wye": {
    title: "Hay On Wye Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Quality shot blasting in Hay-on-Wye, perfect for manufacturing and construction applications. structural steel available. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/hay-on-wye"
  },
  "heanor": {
    title: "Heanor Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Superior shot blasting in Heanor — advanced rust removal & surface preparation. Trusted by the Derbyshire engineering sector. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/heanor"
  },
  "hebden-bridge": {
    title: "Hebden Bridge Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need SA3 shot blasting in Hebden Bridge? Our team serves West Yorkshire industries like Construction. Efficient rust removal & surface prep. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/hebden-bridge"
  },
  "heckmondwike": {
    title: "Heckmondwike Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need SA3 shot blasting in Heckmondwike? Our team serves West Yorkshire industries like Construction. Efficient rust removal & surface prep. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/heckmondwike"
  },
  "hednesford": {
    title: "Hednesford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Hednesford specialists in professional shot blasting. with expertise in Engineering and mobile. Trusted by Staffordshire businesses. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/hednesford"
  },
  "hemel-hempstead": {
    title: "Hemel Hempstead Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Hemel Hempstead, Hertfordshire – specializing in structural steel for the Manufacturing sector. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/hemel-hempstead"
  },
  "henley-in-arden": {
    title: "Henley-in-Arden Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Get superior shot blasting results in Henley-in-Arden. Specializing in SA3. Supporting Warwickshire Construction and Manufacturing sectors. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/henley-in-arden"
  },
  "henlow": {
    title: "Henlow Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist structural steel services in Henlow. Enhancing durability and appearance for Construction and Manufacturing assets. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/henlow"
  },
  "hertford": {
    title: "Hertford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Hertford, Hertfordshire: reliable shot blasting for delivering rust removal for Manufacturing & Aerospace businesses. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/hertford"
  },
  "hethersett": {
    title: "Hethersett Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting in Hethersett: SA2.5 & structural steel for Norfolks Manufacturing sector. Quality results. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/hethersett"
  },
  "hexham": {
    title: "Hexham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Construction and Agriculture in Hexham, choose us for structural steel shot blasting. Superior results guaranteed. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/hexham"
  },
  "high-wycombe": {
    title: "High Wycombe Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in High Wycombe for Manufacturing and Logistics industries. Specializing in SA3 and SA2.5. Trusted by local businesses. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/high-wycombe"
  },
  "higham-ferrers": {
    title: "Higham Ferrers Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Dedicated shot blasting solutions for Higham Ferrers's Manufacturing, Logistics. Offering SA3 and other shot blasting solutions for Manufacturing, Logis...",
    url: "https://commercialshotblasting.co.uk/service-areas/higham-ferrers"
  },
  "highbridge": {
    title: "Highbridge Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Looking for shot blasting in Highbridge? We offer SA3 & mobile services for Manufacturing businesses. Free quote. We handle all project sizes.",
    url: "https://commercialshotblasting.co.uk/service-areas/highbridge"
  },
  "highworth": {
    title: "Highworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting services in Highworth for Agriculture & Manufacturing. We offer shot blasting, including rust removal. Serving Wiltshire...",
    url: "https://commercialshotblasting.co.uk/service-areas/highworth"
  },
  "hinckley": {
    title: "Hinckley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist shot blasting in Hinckley for Engineering & Manufacturing clients. Offering SA3 services across Leicestershire. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/hinckley"
  },
  "histon": {
    title: "Histon Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Histon for Construction. Specializing in shot blasting for structural steel. Serving Cambridgeshire Construction secto Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/histon"
  },
  "hitchin": {
    title: "Hitchin Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Hitchin businesses: professional shot blasting services – delivering SA3 for Manufacturing & Aerospace businesses. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/hitchin"
  },
  "hoddesdon": {
    title: "Hoddesdon Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Hoddesdon, Hertfordshire: reliable shot blasting for offering structural steel solutions for Construction & Aerospace clients. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/hoddesdon"
  },
  "holbeach": {
    title: "Holbeach Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Holbeach, our surface preparation shot blasting services. Catering to Lincolnshire's Agriculture and Construction sectors. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/holbeach"
  },
  "holmes-chapel": {
    title: "Holmes Chapel Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need shot blasting in Holmes Chapel? Get quality shot blasting. rust removal. Serving Cheshire's Manufacturing, Construction sector. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/holmes-chapel"
  },
  "holmfirth": {
    title: "Holmfirth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Holmfirth for Engineering, Construction sectors. We offer rust removal services to prepare surfaces perfectly. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/holmfirth"
  },
  "holt": {
    title: "Holt Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "In Holt, get top-tier shot blasting for Construction & Manufacturing needs. Our rust removal & surface preparation services deliver. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/holt"
  },
  "holyhead": {
    title: "Holyhead Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Holyhead businesses, professional shot blasting. Serving manufacturing sectors with surface preparation shot blasting and rust removal. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/holyhead"
  },
  "horncastle": {
    title: "Horncastle Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Our expert & reliable SA3 shot blasting in Horncastle. for all your industrial needs. A key partner for Lincolnshire's Construction industry. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/horncastle"
  },
  "horsforth": {
    title: "Horsforth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Horsforth for Manufacturing businesses. Our structural steel solutions ensure optimal surface preparation. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/horsforth"
  },
  "houghton-regis": {
    title: "Houghton Regis Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Logistics and Manufacturing in Houghton Regis, choose our expert shot blasting. Our team ensures SA2.5/SA3 standards for durable finishes. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/houghton-regis"
  },
  "hoyland": {
    title: "Hoyland Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing advanced structural steel shot blasting in Hoyland for Steel and Construction applications.  With years of experience. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/hoyland"
  },
  "hucknall": {
    title: "Hucknall Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Hucknall for engineering, construction projects. Our surface preparation shot blasting ensures top-quality results. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/hucknall"
  },
  "hunstanton": {
    title: "Hunstanton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Hunstanton for Construction and Agriculture applications. Featuring SA2.5 and surface preparation solutions. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/hunstanton"
  },
  "huntingdon": {
    title: "Huntingdon Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Huntingdon for Construction. Specializing in shot blasting for mobile, structural steel. Serving Cambridgeshire Constru Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/huntingdon"
  },
  "ibstock": {
    title: "Ibstock Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist shot blasting in Ibstock for Engineering & Construction clients. Offering structural steel services across Leicestershire. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/ibstock"
  },
  "ilfracombe": {
    title: "Ilfracombe Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Ilfracombe for Construction & Construction projects. We offer SA2.5 and surface preparation services. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/ilfracombe"
  },
  "ilkeston": {
    title: "Ilkeston Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Efficient shot blasting in Ilkeston — comprehensive SA2.5 surface preparation. Supporting Derbyshire engineering projects. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/ilkeston"
  },
  "ilkley": {
    title: "Ilkley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Comprehensive shot blasting in Ilkley, West Yorkshire. Trusted for Construction, Manufacturing applications, including SA2.5 and rust removal. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/ilkley"
  },
  "ilminster": {
    title: "Ilminster Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Ilminster with rust removal & SA2.5 solutions for Construction industry. Get a quote. Environmentally friendly methods.",
    url: "https://commercialshotblasting.co.uk/service-areas/ilminster"
  },
  "immingham": {
    title: "Immingham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized SA3 shot blasting solutions in Immingham. Supporting Lincolnshire's Manufacturing and Agriculture industries. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/immingham"
  },
  "instow": {
    title: "Instow Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Instow for Marine & Construction projects. We offer structural steel and rust removal services. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/instow"
  },
  "irthlingborough": {
    title: "Irthlingborough Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "From Irthlingborough, we deliver professional shot blasting for rust removal. We provide comprehensive shot blasting, including rust removal, for Logist...",
    url: "https://commercialshotblasting.co.uk/service-areas/irthlingborough"
  },
  "kegworth": {
    title: "Kegworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing rust removal shot blasting in Kegworth for Construction & Manufacturing sectors. Covering all of Leicestershire. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/kegworth"
  },
  "keighley": {
    title: "Keighley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Keighley for Construction sectors. We offer structural steel services to prepare surfaces perfectly. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/keighley"
  },
  "kempston": {
    title: "Kempston Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist structural steel services in Kempston. Enhancing durability and appearance for Manufacturing and Construction assets. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/kempston"
  },
  "kenilworth": {
    title: "Kenilworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting for Kenilworth projects. Specializing in rust removal. Trusted by Warwickshire Construction firms. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/kenilworth"
  },
  "kesgrave": {
    title: "Kesgrave Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Kesgrave, ideal for Construction sector. Our rust removal service ensures pristine surfaces. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/kesgrave"
  },
  "kettering": {
    title: "Kettering Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "High-quality shot blasting in Kettering for Logistics projects. Trusted for shot blasting in Logistics, focusing on SA3 standards. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/kettering"
  },
  "keynsham": {
    title: "Keynsham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized rust removal shot blasting in Keynsham for Construction & Manufacturing projects. Get a quote. Trusted local experts for all your needs.",
    url: "https://commercialshotblasting.co.uk/service-areas/keynsham"
  },
  "kibworth": {
    title: "Kibworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Kibworth for Engineering projects. Expert surface preparation services throughout Leicestershire. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/kibworth"
  },
  "kidderminster": {
    title: "Kidderminster Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Kidderminster, our mobile shot blasting services are ideal for Manufacturing and Construction needs. We serve all of Worcestershire. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/kidderminster"
  },
  "kidsgrove": {
    title: "Kidsgrove Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Your go-to for shot blasting in Kidsgrove and surrounding areas. offering Manufacturing and Engineering and SA3, rust removal solutions. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/kidsgrove"
  },
  "kimberley": {
    title: "Kimberley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Looking for shot blasting in Kimberley? We offer engineering projects. Our rust removal shot blasting ensures top-quality results. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/kimberley"
  },
  "kimbolton": {
    title: "Kimbolton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional shot blasting in Kimbolton for Manufacturing & Agriculture projects. Specializing in shot blasting for SA2.5. Serving Cambridgeshi Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/kimbolton"
  },
  "kings-langley": {
    title: "Kings Langley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Kings Langley, Hertfordshire: reliable shot blasting for we provide mobile for Aerospace & Manufacturing applications. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/kings-langley"
  },
  "kings-lynn": {
    title: "King Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Seeking shot blasting in Kings Lynn? We offer SA3 & structural steel comprehensive services for Norfolks Construction industry. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/kings-lynn"
  },
  "kingswinford": {
    title: "Kingswinford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Leading shot blasting services available in Kingswinford. Providing structural steel solutions for Construction, Engineering companies in We... Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/kingswinford"
  },
  "kington": {
    title: "Kington Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Top-tier shot blasting in Kington for manufacturing & manufacturing industries. Featuring surface preparation methods. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/kington"
  },
  "kinver": {
    title: "Kinver Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Kinver specialists in professional shot blasting. providing Construction and Manufacturing for structural steel, mobile projects. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/kinver"
  },
  "knebworth": {
    title: "Knebworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist shot blasting in Knebworth for offering surface preparation solutions for Construction & Manufacturing clients. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/knebworth"
  },
  "knottingley": {
    title: "Knottingley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Knottingley for Manufacturing businesses. Our SA3 solutions ensure optimal surface preparation. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/knottingley"
  },
  "knowle": {
    title: "Knowle Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Leading shot blasting services available in Knowle. Providing SA3 solutions for Construction companies in West Midlands. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/knowle"
  },
  "knutsford": {
    title: "Knutsford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Delivering superior shot blasting to Knutsford's shot blasting. surface preparation. Serving Cheshire's Manufacturing, Food Processing sector. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/knutsford"
  },
  "langford-bedfordshire": {
    title: "Langford Bedfordshire Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Langford for Construction projects. Effective rust removal and surface preparation for all projects. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/langford-bedfordshire"
  },
  "langport": {
    title: "Langport Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Langport with SA3 & surface preparation solutions for Agriculture industry. Call today. We handle all project sizes.",
    url: "https://commercialshotblasting.co.uk/service-areas/langport"
  },
  "leamington-spa": {
    title: "Leamington Spa Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Top-tier shot blasting services across Leamington Spa. Specializing in mobile, structural steel. Supporting Warwickshire Construction and. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/leamington-spa"
  },
  "lechlade": {
    title: "Lechlade Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Lechlade. Ideal for Construction, Agriculture applications, including structural steel. Covering Gloucestershire. C...",
    url: "https://commercialshotblasting.co.uk/service-areas/lechlade"
  },
  "ledbury": {
    title: "Ledbury Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Top-tier shot blasting in Ledbury for manufacturing & manufacturing industries. Featuring surface preparation methods. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/ledbury"
  },
  "leek": {
    title: "Leek Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting solutions for Leek businesses. specializing in Construction and Manufacturing and mobile, rust removal. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/leek"
  },
  "leighton-buzzard": {
    title: "Leighton Buzzard Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Leading shot blasting services in Leighton Buzzard. Delivering high-quality results for local Manufacturing and Construction businesses. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/leighton-buzzard"
  },
  "leiston": {
    title: "Leiston Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Leiston, ideal for Construction sector. Our structural steel service ensures pristine surfaces. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/leiston"
  },
  "leominster": {
    title: "Leominster Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Top-tier shot blasting in Leominster for manufacturing & manufacturing industries. Featuring surface preparation methods. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/leominster"
  },
  "letchworth": {
    title: "Letchworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Letchworth, Hertfordshire: reliable shot blasting for we provide SA3 for Manufacturing & Construction applications. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/letchworth"
  },
  "letchworth-bedfordshire": {
    title: "Letchworth Bedfordshire Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Achieve pristine surfaces in Letchworth with our rust removal shot blasting. We handle everything from structural steel to factory cladding. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/letchworth-bedfordshire"
  },
  "lichfield": {
    title: "Lichfield Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Your go-to for shot blasting in Lichfield and surrounding areas. providing Manufacturing and Construction for SA2.5 projects. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/lichfield"
  },
  "linton": {
    title: "Linton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Seeking reliable shot blasting in Linton? Specializing in shot blasting for rust removal, SA2.5. Serving Cambridgeshire Construction sectors. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/linton"
  },
  "littleport": {
    title: "Littleport Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional shot blasting in Littleport for Construction & Manufacturing projects. Specializing in shot blasting for mobile, structural steel. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/littleport"
  },
  "llandudno": {
    title: "Llandudno Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist shot blasting services for Llandudno. Serving agriculture & manufacturing sectors with surface preparation shot blasting and rust removal. Ge...",
    url: "https://commercialshotblasting.co.uk/service-areas/llandudno"
  },
  "llangefni": {
    title: "Llangefni Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Llangefni, East Wales. Ideal for agriculture projects. We offer surface preparation shot blasting for optimal results. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/llangefni"
  },
  "llangollen": {
    title: "Llangollen Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Llangollen businesses, professional shot blasting. Serving construction sectors with mobile shot blasting and rust removal. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/llangollen"
  },
  "loddon": {
    title: "Loddon Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Seeking shot blasting in Loddon? We offer SA2.5 & rust removal comprehensive services for Norfolks Construction industry. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/loddon"
  },
  "long-buckby": {
    title: "Long Buckby Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "High-quality shot blasting in Long Buckby for Construction projects. We provide comprehensive shot blasting, including mobile, for Construction sectors....",
    url: "https://commercialshotblasting.co.uk/service-areas/long-buckby"
  },
  "long-eaton": {
    title: "Long Eaton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Top-tier shot blasting in Long Eaton — surface preparation for factory cladding. Ideal for Derbyshire engineering businesses. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/long-eaton"
  },
  "long-stratton": {
    title: "Long Stratton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting in Long Stratton: surface preparation & SA2.5 for Norfolks Construction sector. Quality results. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/long-stratton"
  },
  "longstanton": {
    title: "Longstanton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "High-quality shot blasting in Longstanton for Agriculture & Manufacturing needs. Specializing in shot blasting for rust removal. Serving Cambr Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/longstanton"
  },
  "louth": {
    title: "Louth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Highly professional & efficient SA3 shot blasting for Louth. for various applications. Trusted by Lincolnshire's Manufacturing sector. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/louth"
  },
  "lowestoft": {
    title: "Lowestoft Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Lowestoft, ideal for Construction sector. Our SA2.5 service ensures pristine surfaces. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/lowestoft"
  },
  "ludgershall": {
    title: "Ludgershall Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized mobile shot blasting in Ludgershall. We offer shot blasting, including mobile, SA2.5. Serving Wiltshire agriculture sectors. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/ludgershall"
  },
  "ludlow": {
    title: "Ludlow Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Ludlow and Shropshire with professional shot blasting. Specializing in Construction, Agriculture and structural steel. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/ludlow"
  },
  "lutterworth": {
    title: "Lutterworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Lutterworth for Engineering & Construction projects. Expert SA3 services throughout Leicestershire. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/lutterworth"
  },
  "lydney": {
    title: "Lydney Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Lydney. Ideal for Construction applications, including structural steel & surface preparation. Covering Gloucesters...",
    url: "https://commercialshotblasting.co.uk/service-areas/lydney"
  },
  "lynmouth": {
    title: "Lynmouth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Lynmouth for Construction & Construction projects. We offer rust removal and surface preparation services. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/lynmouth"
  },
  "lynton": {
    title: "Lynton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional shot blasting in Lynton for Construction & Agriculture sectors. Includes surface preparation & structural steel. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/lynton"
  },
  "mablethorpe": {
    title: "Mablethorpe Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Mablethorpe, our surface preparation shot blasting services. Supporting Lincolnshire's Construction and Manufacturing industries. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/mablethorpe"
  },
  "macclesfield": {
    title: "Macclesfield Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Macclesfield businesses, reliable shot blasting. mobile, SA2.5. Serving Cheshire's Manufacturing, Food Processing sector. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/macclesfield"
  },
  "madeley": {
    title: "Madeley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Madeley and Shropshire with professional shot blasting. Specializing in Agriculture, Manufacturing and surface preparation. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/madeley"
  },
  "malmesbury": {
    title: "Malmesbury Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Agriculture in Malmesbury, rely on our shot blasting. We offer shot blasting, including mobile. Serving Wiltshire agriculture sectors. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/malmesbury"
  },
  "maltby": {
    title: "Maltby Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For robust Manufacturing and Construction solutions in Maltby, trust our mobile shot blasting.  Exceeding expectations. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/maltby"
  },
  "malvern": {
    title: "Malvern Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Malvern, our SA3 shot blasting services are ideal for Construction and Agriculture needs. We serve all of Worcestershire. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/malvern"
  },
  "march": {
    title: "March Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "High-quality shot blasting in March for Agriculture needs. Specializing in shot blasting for SA2.5. Serving Cambridgeshire Agriculture sectors Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/march"
  },
  "market-bosworth": {
    title: "Market Bosworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Construction & Engineering in Market Bosworth, our shot blasting delivers rust removal results. Trusted in Leicestershire. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/market-bosworth"
  },
  "market-deeping": {
    title: "Market Deeping Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Offering specialized SA2.5 shot blasting solutions in Market Deeping. with proven results. Serving Lincolnshire's Construction businesses. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/market-deeping"
  },
  "market-drayton": {
    title: "Market Drayton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Market Drayton and Shropshire with professional shot blasting. Specializing in Construction, Agriculture and SA2.5. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/market-drayton"
  },
  "market-harborough": {
    title: "Market Harborough Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Market Harborough for Engineering & Construction projects. Expert mobile services throughout Leicestershire. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/market-harborough"
  },
  "market-rasen": {
    title: "Market Rasen Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Market Rasen, our mobile shot blasting services. Supporting Lincolnshire's Manufacturing and Construction industries. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/market-rasen"
  },
  "marlborough": {
    title: "Marlborough Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Manufacturing & Construction in Marlborough, rely on our shot blasting. We offer shot blasting, including SA2.5. Serving Wiltshire manufacturing &...",
    url: "https://commercialshotblasting.co.uk/service-areas/marlborough"
  },
  "marlow": {
    title: "Marlow Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist shot blasting in Marlow for the Logistics sector. Specializing in rust removal. Serving Buckinghamshire clients. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/marlow"
  },
  "marston-moretaine": {
    title: "Marston Moretaine Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist structural steel services in Marston Moretaine. Dedicated to supporting Bedfordshire's Logistics and Construction sectors. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/marston-moretaine"
  },
  "martock": {
    title: "Martock Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Martock with SA2.5 & structural steel solutions for Agriculture industry. Get a quote. Serving Somerset area with expertise.",
    url: "https://commercialshotblasting.co.uk/service-areas/martock"
  },
  "matlock": {
    title: "Matlock Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Effective shot blasting in Matlock — SA3 mobile blasting for commercial steelwork. Supporting Derbyshire engineering projects. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/matlock"
  },
  "maulden": {
    title: "Maulden Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Maulden with top-tier shot blasting for Construction and Manufacturing. Our team ensures SA2.5/SA3 standards for durable finishes. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/maulden"
  },
  "measham": {
    title: "Measham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "In Measham, we offer professional shot blasting for Manufacturing & Engineering. Specializing in structural steel across Leicestershire. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/measham"
  },
  "melbourn": {
    title: "Melbourn Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Melbourn for Construction. Specializing in shot blasting for SA2.5, surface preparation. Serving Cambridgeshire Constru Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/melbourn"
  },
  "melksham": {
    title: "Melksham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized mobile shot blasting in Melksham. We offer shot blasting, including rust removal. Serving Wiltshire agriculture & construction sectors....",
    url: "https://commercialshotblasting.co.uk/service-areas/melksham"
  },
  "melton-mowbray": {
    title: "Melton Mowbray Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing rust removal shot blasting in Melton Mowbray for Engineering & Manufacturing sectors. Covering all of Leicestershire. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/melton-mowbray"
  },
  "menai-bridge": {
    title: "Menai Bridge Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need shot blasting in Menai Bridge? Professional SA3 shot blasting for manufacturing in East Wales. Get a quote. We specialize in structural steel and s...",
    url: "https://commercialshotblasting.co.uk/service-areas/menai-bridge"
  },
  "mere": {
    title: "Mere Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional shot blasting solutions in Mere. We offer shot blasting, including structural steel. Serving Wiltshire manufacturing sectors. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/mere"
  },
  "meriden": {
    title: "Meriden Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Meriden businesses, top-tier shot blasting services. Specializing in surface preparation, SA3 for the Manufacturing industry. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/meriden"
  },
  "mexborough": {
    title: "Mexborough Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Custom rust removal shot blasting solutions in Mexborough for Construction and Manufacturing projects.  Environmentally friendly options. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/mexborough"
  },
  "middlewich": {
    title: "Middlewich Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need shot blasting in Middlewich? Get quality shot blasting. structural steel. Serving Cheshire's Manufacturing, Food Processing sector. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/middlewich"
  },
  "midsomer-norton": {
    title: "Midsomer Norton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services for Midsomer Norton, Somerset – specializing in mobile & structural steel. Free quote. We handle all project sizes.",
    url: "https://commercialshotblasting.co.uk/service-areas/midsomer-norton"
  },
  "mildenhall": {
    title: "Mildenhall Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Mildenhall for Construction & Manufacturing projects. Our surface preparation service ensures pristine surfaces. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/mildenhall"
  },
  "minehead": {
    title: "Minehead Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Looking for shot blasting in Minehead? We offer rust removal & SA2.5 services for Agriculture businesses. Free quote. Environmentally friendly methods.",
    url: "https://commercialshotblasting.co.uk/service-areas/minehead"
  },
  "mirfield": {
    title: "Mirfield Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Mirfield for Manufacturing businesses. Our rust removal solutions ensure optimal surface preparation. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/mirfield"
  },
  "mold": {
    title: "Mold Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Mold, East Wales. Professional surface preparation shot blasting for construction & agriculture in East Wales. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/mold"
  },
  "moreton-in-marsh": {
    title: "Moreton-in-Marsh Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need rust removal & SA3 in Moreton-in-Marsh? Our mobile shot blasting services cater to Manufacturing, Agriculture in Gloucestershire. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/moreton-in-marsh"
  },
  "morley": {
    title: "Morley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need rust removal shot blasting in Morley? Our team serves West Yorkshire industries like Construction. Efficient rust removal & surface prep. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/morley"
  },
  "morpeth": {
    title: "Morpeth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Get expert rust removal shot blasting in Morpeth. Ideal for Engineering and Construction projects needing rust removal. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/morpeth"
  },
  "mountsorrel": {
    title: "Mountsorrel Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "In Mountsorrel, we offer professional shot blasting for Engineering. Specializing in surface preparation across Leicestershire. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/mountsorrel"
  },
  "much-wenlock": {
    title: "Much Wenlock Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Much Wenlock and Shropshire with professional shot blasting. Specializing in Construction, Agriculture and surface preparation. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/much-wenlock"
  },
  "nailsea": {
    title: "Nailsea Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Looking for shot blasting in Nailsea? We offer mobile & rust removal services for Agriculture businesses. Free quote. Serving Somerset area with expertise.",
    url: "https://commercialshotblasting.co.uk/service-areas/nailsea"
  },
  "nailsworth": {
    title: "Nailsworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Nailsworth. Ideal for Construction applications, including rust removal. Covering Gloucestershire. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/nailsworth"
  },
  "nantwich": {
    title: "Nantwich Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized shot blasting for Nantwich's shot blasting. surface preparation, SA3. Serving Cheshire's Food Processing, Manufacturing sector. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/nantwich"
  },
  "narborough": {
    title: "Narborough Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "In Narborough, we offer professional shot blasting for Manufacturing. Specializing in structural steel across Leicestershire. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/narborough"
  },
  "needham-market": {
    title: "Needham Market Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Needham Market for Manufacturing projects. Our structural steel service ensures pristine surfaces. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/needham-market"
  },
  "newark": {
    title: "Newark Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Looking for shot blasting in Newark? We offer manufacturing projects. Our SA3 shot blasting ensures top-quality results. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/newark"
  },
  "newark-on-trent": {
    title: "Newark-on-Trent Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Leading shot blasting solutions in Newark-on-Trent for engineering, construction projects. Our SA2.5 shot blasting ensures top-quality results. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/newark-on-trent"
  },
  "newcastle-under-lyme": {
    title: "Newcastle-under-Lyme Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Newcastle-under-Lyme specialists in professional shot blasting. providing Engineering and Manufacturing for mobile, SA2.5 projects. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/newcastle-under-lyme"
  },
  "newcastle-upon-tyne": {
    title: "Newcastle upon Tyne Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need shot blasting in Newcastle upon Tyne? We offer marine and engineering needs. Our shot blasting services feature SA2.5. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/newcastle-upon-tyne"
  },
  "newent": {
    title: "Newent Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Newent for Agriculture sectors. Specializing in rust removal. Serving Gloucestershire businesses. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/newent"
  },
  "newmarket": {
    title: "Newmarket Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Newmarket for Construction needs. Our mobile service ensures pristine surfaces for Construction clients. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/newmarket"
  },
  "newport-pagnell": {
    title: "Newport Pagnell Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Newport Pagnell for Manufacturing and Construction industries. Specializing in structural steel and SA2.5. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/newport-pagnell"
  },
  "normanton": {
    title: "Normanton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Comprehensive shot blasting in Normanton, West Yorkshire. Trusted for Engineering applications, including mobile and rust removal. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/normanton"
  },
  "north-walsham": {
    title: "North Walsham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Seeking shot blasting in North Walsham? We offer structural steel & surface preparation services for Norfolks Construction industry. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/north-walsham"
  },
  "northleach": {
    title: "Northleach Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Northleach for Construction, Manufacturing sectors. Specializing in mobile. Serving Gloucestershire businesses. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/northleach"
  },
  "northwich": {
    title: "Northwich Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized shot blasting for Northwich's shot blasting. surface preparation, structural steel. Serving Cheshire's Manufacturing sector. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/northwich"
  },
  "nuneaton": {
    title: "Nuneaton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Nuneaton businesses, professional shot blasting. Specializing in structural steel, rust removal. Supporting Warwickshire Manufacturing. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/nuneaton"
  },
  "oadby": {
    title: "Oadby Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Oadby for Construction & Manufacturing projects. Expert structural steel services throughout Leicestershire. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/oadby"
  },
  "oakengates": {
    title: "Oakengates Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Oakengates and Shropshire with professional shot blasting. Specializing in Manufacturing and structural steel. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/oakengates"
  },
  "oldbury": {
    title: "Oldbury Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Comprehensive shot blasting for Oldbury projects. From surface preparation to full surface prep for Construction, Engineering in West Midla... Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/oldbury"
  },
  "ollerton": {
    title: "Ollerton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Ollerton for construction projects. Our surface preparation shot blasting ensures top-quality results. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/ollerton"
  },
  "olney": {
    title: "Olney Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting services in Olney for the Logistics sector. Specializing in SA3 and SA2.5. Achieving superior results. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/olney"
  },
  "ossett": {
    title: "Ossett Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Ossett for Construction sectors. We offer structural steel services to prepare surfaces perfectly. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/ossett"
  },
  "oswestry": {
    title: "Oswestry Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Oswestry and Shropshire with professional shot blasting. Specializing in Agriculture, Construction and rust removal. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/oswestry"
  },
  "otley": {
    title: "Otley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Comprehensive shot blasting in Otley, West Yorkshire. Trusted for Engineering applications, including rust removal and rust removal. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/otley"
  },
  "oundle": {
    title: "Oundle Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "High-quality shot blasting in Oundle for Manufacturing, Logistics projects. We provide comprehensive shot blasting, including SA2.5, for Manufacturing, ...",
    url: "https://commercialshotblasting.co.uk/service-areas/oundle"
  },
  "painswick": {
    title: "Painswick Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Painswick for Construction, Agriculture sectors. Specializing in SA3. Serving Gloucestershire businesses. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/painswick"
  },
  "penistone": {
    title: "Penistone Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Custom structural steel shot blasting solutions in Penistone for Steel and Construction projects.  With years of experience. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/penistone"
  },
  "penkridge": {
    title: "Penkridge Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting services available in Penkridge. with expertise in Manufacturing and mobile. Trusted by Staffordshire businesses. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/penkridge"
  },
  "pershore": {
    title: "Pershore Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specializing in shot blasting for rust removal in Pershore, we support Manufacturing businesses. We serve all of Worcestershire. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/pershore"
  },
  "pewsey": {
    title: "Pewsey Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Comprehensive shot blasting for Pewsey businesses. We offer shot blasting, including SA3. Serving Wiltshire agriculture & manufacturing sectors. Call...",
    url: "https://commercialshotblasting.co.uk/service-areas/pewsey"
  },
  "polesworth": {
    title: "Polesworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Polesworth with advanced shot blasting. Specializing in structural steel, SA2.5. Trusted by Warwickshire Construction firms. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/polesworth"
  },
  "pontefract": {
    title: "Pontefract Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Pontefract for Manufacturing businesses. Our SA2.5 solutions ensure optimal surface preparation. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/pontefract"
  },
  "pontrilas": {
    title: "Pontrilas Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Quality shot blasting in Pontrilas, perfect for manufacturing and manufacturing applications. structural steel available. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/pontrilas"
  },
  "porthmadog": {
    title: "Porthmadog Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need shot blasting in Porthmadog? Serving construction & manufacturing sectors with mobile shot blasting and rust removal. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/porthmadog"
  },
  "portishead": {
    title: "Portishead Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services for Portishead, Somerset – specializing in SA2.5 & mobile. Free quote. Environmentally friendly methods.",
    url: "https://commercialshotblasting.co.uk/service-areas/portishead"
  },
  "potters-bar": {
    title: "Potters Bar Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Potters Bar businesses: professional shot blasting services – offering structural steel solutions for Aerospace & Manufacturing clients. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/potters-bar"
  },
  "potton": {
    title: "Potton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Potton for Construction projects. Providing essential surface solutions for Construction and Logistics operations. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/potton"
  },
  "poynton": {
    title: "Poynton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized shot blasting for Poynton's shot blasting. SA2.5, rust removal. Serving Cheshire's Food Processing, Manufacturing sector. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/poynton"
  },
  "prestatyn": {
    title: "Prestatyn Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist shot blasting services for Prestatyn. Enhance your agriculture operations with our surface preparation shot blasting. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/prestatyn"
  },
  "princes-risborough": {
    title: "Princes Risborough Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Princes Risborough businesses, our shot blasting for the Manufacturing and Construction sector. Specializing in mobile and SA3. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/princes-risborough"
  },
  "priory-country-park": {
    title: "Priory Country Park Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Achieve pristine surfaces in Priory Country Park with our SA2.5 shot blasting. We handle everything from structural steel to factory cladding. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/priory-country-park"
  },
  "pudsey": {
    title: "Pudsey Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Pudsey for Construction businesses. Our structural steel solutions ensure optimal surface preparation. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/pudsey"
  },
  "pwllheli": {
    title: "Pwllheli Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Pwllheli, East Wales. Ideal for construction projects. We offer rust removal shot blasting for optimal results. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/pwllheli"
  },
  "quorn": {
    title: "Quorn Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "In Quorn, we offer professional shot blasting for Engineering & Manufacturing. Specializing in rust removal across Leicestershire. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/quorn"
  },
  "radlett": {
    title: "Radlett Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Radlett businesses: professional shot blasting services – offering structural steel solutions for Aerospace & Construction clients. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/radlett"
  },
  "ramsey": {
    title: "Ramsey Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Ramsey for Manufacturing & Construction. Specializing in shot blasting for rust removal, SA3. Serving Cambridgeshire M Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/ramsey"
  },
  "raunds": {
    title: "Raunds Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "From Raunds, we deliver professional shot blasting for SA3. Offering SA3 and other shot blasting solutions for Manufacturing projects. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/raunds"
  },
  "rawmarsh": {
    title: "Rawmarsh Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Leading mobile shot blasting solutions in Rawmarsh for Construction and Manufacturing applications.  Advanced techniques applied. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/rawmarsh"
  },
  "redditch": {
    title: "Redditch Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specializing in shot blasting for rust removal in Redditch, we support Manufacturing businesses. We serve all of Worcestershire. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/redditch"
  },
  "reepham": {
    title: "Reepham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Reepham businesses: expert shot blasting for Manufacturing & Agriculture sectors. Specializing in mobile and surface preparation. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/reepham"
  },
  "retford": {
    title: "Retford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Retford for construction, engineering projects. Our SA2.5 shot blasting ensures top-quality results. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/retford"
  },
  "rhyl": {
    title: "Rhyl Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need shot blasting in Rhyl? Enhance your manufacturing & construction operations with our mobile shot blasting. Call today. We specialize in SA2.5 and s...",
    url: "https://commercialshotblasting.co.uk/service-areas/rhyl"
  },
  "rickmansworth": {
    title: "Rickmansworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Rickmansworth, Hertfordshire: reliable shot blasting for we provide surface preparation for Aerospace & Construction applications. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/rickmansworth"
  },
  "ripley": {
    title: "Ripley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Skilled shot blasting in Ripley — SA2.5 structural steel cleaning & restoration. Serving Derbyshire engineering & construction. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/ripley"
  },
  "riseley": {
    title: "Riseley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Riseley for Logistics projects. Your go-to for all Logistics and Manufacturing shot blasting requirements. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/riseley"
  },
  "ross-on-wye": {
    title: "Ross-on-Wye Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Quality shot blasting in Ross-on-Wye, perfect for agriculture and agriculture applications. surface preparation available. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/ross-on-wye"
  },
  "rossington": {
    title: "Rossington Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "In Rossington, we provide SA2.5 shot blasting for South Yorkshire Manufacturing businesses, ensuring quality Construction solutions. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/rossington"
  },
  "rothwell": {
    title: "Rothwell Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Dedicated shot blasting solutions for Rothwell's Logistics, Manufacturing. Our structural steel shot blasting services are perfect for Logistics, Manufa...",
    url: "https://commercialshotblasting.co.uk/service-areas/rothwell"
  },
  "rowley-regis": {
    title: "Rowley Regis Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need professional shot blasting in Rowley Regis? Our team provides rust removal, SA3 for Construction businesses in West Midlands. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/rowley-regis"
  },
  "royal-wootton-bassett": {
    title: "Royal Wootton Bassett Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional shot blasting solutions in Royal Wootton Bassett. We offer shot blasting, including surface preparation. Serving Wiltshire manufacturing...",
    url: "https://commercialshotblasting.co.uk/service-areas/royal-wootton-bassett"
  },
  "royston": {
    title: "Royston Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Royston, Hertfordshire: reliable shot blasting for specializing in structural steel for the Construction & Manufacturing sector. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/royston"
  },
  "ruddington": {
    title: "Ruddington Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Looking for shot blasting in Ruddington? We offer engineering projects. Our structural steel shot blasting ensures top-quality results. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/ruddington"
  },
  "rugby": {
    title: "Rugby Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Get superior shot blasting results in Rugby. Specializing in structural steel. Trusted by Warwickshire Engineering firms. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/rugby"
  },
  "rugeley": {
    title: "Rugeley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting services available in Rugeley. providing Construction for structural steel projects. Trusted by Staffordshire businesses. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/rugeley"
  },
  "rushden": {
    title: "Rushden Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "From Rushden, we deliver professional shot blasting for mobile. Specializing in shot blasting for Logistics, with mobile capabilities. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/rushden"
  },
  "ruthin": {
    title: "Ruthin Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist shot blasting services for Ruthin. Serving construction sectors with surface preparation shot blasting and rust removal. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/ruthin"
  },
  "salisbury": {
    title: "Salisbury Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Agriculture in Salisbury, rely on our shot blasting. We offer shot blasting, including mobile. Serving Wiltshire agriculture sectors. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/salisbury"
  },
  "sandbach": {
    title: "Sandbach Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Quality surface preparation in Sandbach for shot blasting. surface preparation, SA3. Serving Cheshire's Construction sector. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/sandbach"
  },
  "sandy": {
    title: "Sandy Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Sandy for Manufacturing projects. We handle everything from structural steel to factory cladding. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/sandy"
  },
  "sawbridgeworth": {
    title: "Sawbridgeworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Sawbridgeworth businesses: professional shot blasting services – our SA2.5 services support Manufacturing & Aerospace projects. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/sawbridgeworth"
  },
  "sawbridgeworth-herts": {
    title: "Sawbridgeworth Herts Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Sawbridgeworth, Hertfordshire – our rust removal services support Construction & Aerospace projects. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/sawbridgeworth-herts"
  },
  "sawston": {
    title: "Sawston Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional shot blasting in Sawston for Agriculture & Construction projects. Specializing in shot blasting for mobile, rust removal. Serving Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/sawston"
  },
  "saxmundham": {
    title: "Saxmundham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Saxmundham, ideal for Construction & Agriculture sector. Our SA2.5 service ensures pristine surfaces. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/saxmundham"
  },
  "scunthorpe": {
    title: "Scunthorpe Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need surface preparation shot blasting in Scunthorpe? ensuring optimal results and durability. Serving Lincolnshire's Manufacturing businesses. Call today.\\\\",
    url: "https://commercialshotblasting.co.uk/service-areas/scunthorpe"
  },
  "sedgley": {
    title: "Sedgley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting solutions for Sedgley. We handle SA3 projects for Manufacturing clients across West Midlands. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/sedgley"
  },
  "sharnbrook": {
    title: "Sharnbrook Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Sharnbrook businesses trust our mobile shot blasting. Trusted by Bedfordshire Construction and Logistics firms for superior finishes. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/sharnbrook"
  },
  "shefford": {
    title: "Shefford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist SA2.5 services in Shefford. Providing essential surface solutions for Manufacturing and Construction operations. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/shefford"
  },
  "shepshed": {
    title: "Shepshed Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist shot blasting in Shepshed for Construction & Manufacturing clients. Offering mobile services across Leicestershire. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/shepshed"
  },
  "shepton-mallet": {
    title: "Shepton Mallet Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Looking for shot blasting in Shepton Mallet? We offer mobile & SA3 services for Agriculture businesses. Get a quote. Experienced team.",
    url: "https://commercialshotblasting.co.uk/service-areas/shepton-mallet"
  },
  "sheringham": {
    title: "Sheringham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Sheringham for Construction and Manufacturing applications. Featuring mobile and structural steel solutions. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/sheringham"
  },
  "shipley": {
    title: "Shipley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Shipley for Manufacturing businesses. Our SA3 solutions ensure optimal surface preparation. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/shipley"
  },
  "shipston-on-stour": {
    title: "Shipston-on-Stour Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting solutions for Shipston-on-Stour. Specializing in rust removal. Supporting Warwickshire Engineering and Construction. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/shipston-on-stour"
  },
  "shirebrook": {
    title: "Shirebrook Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Prime shot blasting in Shirebrook — mobile rust removal for industrial equipment. Supporting Derbyshire engineering projects. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/shirebrook"
  },
  "sileby": {
    title: "Sileby Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Sileby for Construction & Engineering projects. Expert rust removal services throughout Leicestershire. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/sileby"
  },
  "silsoe": {
    title: "Silsoe Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Achieve pristine surfaces in Silsoe with our SA3 shot blasting. Enhancing durability and appearance for Logistics and Manufacturing assets. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/silsoe"
  },
  "skegness": {
    title: "Skegness Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "We provide SA2.5 shot blasting in Skegness. ensuring optimal results and durability. Trusted by Lincolnshire's Manufacturing sector. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/skegness"
  },
  "sleaford": {
    title: "Sleaford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need surface preparation shot blasting in Sleaford? Supporting Lincolnshire's Manufacturing and Construction industries. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/sleaford"
  },
  "slough": {
    title: "Slough Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Slough – surface preparation for Manufacturing & Aerospace. Our mobile services ensure pristine results for Berkshire businesses. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/slough"
  },
  "smethwick": {
    title: "Smethwick Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized shot blasting in Smethwick and surrounding areas. Our expertise includes surface preparation for Engineering, Construction appl... Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/smethwick"
  },
  "soham": {
    title: "Soham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "High-quality shot blasting in Soham for Construction needs. Specializing in shot blasting for SA3, surface preparation. Serving Cambridgeshire Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/soham"
  },
  "south-molton": {
    title: "South Molton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in South Molton for Marine & Agriculture projects. We offer rust removal and structural steel services. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/south-molton"
  },
  "south-petherton": {
    title: "South Petherton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in South Petherton with SA3 & surface preparation solutions for Construction industry. Call today. We handle all project sizes.",
    url: "https://commercialshotblasting.co.uk/service-areas/south-petherton"
  },
  "south-shields": {
    title: "South Shields Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "High-quality shot blasting in South Shields for marine and manufacturing projects. We provide shot blasting, including rust removal. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/south-shields"
  },
  "southam": {
    title: "Southam Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Enhance surfaces in Southam with our shot blasting. Specializing in SA3, structural steel. Supporting Warwickshire Construction and. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/southam"
  },
  "southwell": {
    title: "Southwell Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Leading shot blasting solutions in Southwell for engineering projects. Our SA3 shot blasting ensures top-quality results. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/southwell"
  },
  "southwold": {
    title: "Southwold Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Southwold for Construction needs. Our rust removal service ensures pristine surfaces. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/southwold"
  },
  "sowerby-bridge": {
    title: "Sowerby Bridge Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Sowerby Bridge for Manufacturing sectors. We offer surface preparation services to prepare surfaces perfectly. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/sowerby-bridge"
  },
  "spalding": {
    title: "Spalding Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "We provide structural steel shot blasting in Spalding. Supporting Lincolnshire's Manufacturing and Agriculture industries. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/spalding"
  },
  "spennymoor": {
    title: "Spennymoor Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Spennymoor for the manufacturing and engineering sector. Our SA2.5 shot blasting ensures superior surface preparation. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/spennymoor"
  },
  "sprowston": {
    title: "Sprowston Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Sprowston businesses: expert shot blasting for Manufacturing & Agriculture sectors. Specializing in mobile and structural steel. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/sprowston"
  },
  "st-albans": {
    title: "St Albans Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist shot blasting in St Albans for specializing in surface preparation for the Construction & Manufacturing sector. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/st-albans"
  },
  "st-ives": {
    title: "St Ives Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Seeking reliable shot blasting in St Ives? Specializing in shot blasting for mobile. Serving Cambridgeshire Manufacturing sectors. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/st-ives"
  },
  "st-neots": {
    title: "St Neots Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Seeking reliable shot blasting in St Neots? Specializing in shot blasting for rust removal, mobile. Serving Cambridgeshire Agriculture sectors. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/st-neots"
  },
  "stalham": {
    title: "Stalham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Stalham for Manufacturing and Construction applications. Featuring SA3 and rust removal solutions. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/stalham"
  },
  "stamford": {
    title: "Stamford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional structural steel shot blasting for Stamford. Supporting Lincolnshire's Agriculture and Construction industries. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/stamford"
  },
  "stapleford": {
    title: "Stapleford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Comprehensive shot blasting in Stapleford for manufacturing projects. Our SA3 shot blasting ensures top-quality results. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/stapleford"
  },
  "staveley": {
    title: "Staveley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Trusted shot blasting in Staveley — SA3 surface preparation & structural steel care. Partnering with Derbyshire manufacturing experts. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/staveley"
  },
  "stocksbridge": {
    title: "Stocksbridge Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized rust removal shot blasting in Stocksbridge for Manufacturing and Construction industries. Contact us today. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/stocksbridge"
  },
  "stoke": {
    title: "Stoke-on-Trent Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Your go-to for shot blasting in Stoke-on-Trent and surrounding areas. providing Manufacturing and Construction for SA2.5 projects. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/stoke"
  },
  "stone": {
    title: "Stone Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting solutions for Stone businesses. providing Engineering and Construction for SA3, surface preparation projects. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/stone"
  },
  "stony-stratford": {
    title: "Stony Stratford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting in Stony Stratford for Logistics and Manufacturing industries. Specializing in mobile and SA3. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/stony-stratford"
  },
  "stotfold": {
    title: "Stotfold Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Achieve pristine surfaces in Stotfold with our SA2.5 shot blasting. Effective rust removal and surface preparation for all projects. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/stotfold"
  },
  "stourbridge": {
    title: "Stourbridge Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized shot blasting in Stourbridge and surrounding areas. Our expertise includes mobile, rust removal for Engineering, Manufacturing a... Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/stourbridge"
  },
  "stourport-on-severn": {
    title: "Stourport-on-Severn Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Stourport-on-Severn with top-tier mobile shot blasting, trusted by local Agriculture companies. We serve all of Worcestershire. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/stourport-on-severn"
  },
  "stow-on-the-wold": {
    title: "Stow-on-the-Wold Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Stow-on-the-Wold. We offer rust removal & surface preparation for Construction, Agriculture projects across Gloucestershire. F...",
    url: "https://commercialshotblasting.co.uk/service-areas/stow-on-the-wold"
  },
  "stowmarket": {
    title: "Stowmarket Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Stowmarket for Agriculture needs. Our SA3 service ensures pristine surfaces for Agriculture clients. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/stowmarket"
  },
  "street": {
    title: "Street Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Looking for shot blasting in Street? We offer surface preparation & SA2.5 services for Construction businesses. Free quote. Advanced surface cleaning.",
    url: "https://commercialshotblasting.co.uk/service-areas/street"
  },
  "stroud": {
    title: "Stroud Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Stroud for Agriculture, Manufacturing sectors. Specializing in SA3 & surface preparation. Serving Gloucestershire businesses. Ca...",
    url: "https://commercialshotblasting.co.uk/service-areas/stroud"
  },
  "studley": {
    title: "Studley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Top-tier shot blasting services across Studley. Specializing in surface preparation. Supporting Warwickshire Engineering and Construction. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/studley"
  },
  "sudbury": {
    title: "Sudbury Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Sudbury for Manufacturing & Construction needs. Our structural steel service ensures pristine surfaces. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/sudbury"
  },
  "sutton-bridge": {
    title: "Sutton Bridge Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "We provide rust removal shot blasting in Sutton Bridge. Supporting Lincolnshire's Manufacturing and Construction industries. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/sutton-bridge"
  },
  "sutton-in-ashfield": {
    title: "Sutton-in-Ashfield Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Sutton-in-Ashfield for engineering, construction projects. Our rust removal shot blasting ensures top-quality results. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/sutton-in-ashfield"
  },
  "swadlincote": {
    title: "Swadlincote Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Fast shot blasting in Swadlincote — industrial plant, containers & steelwork to SA3. Serving Derbyshire manufacturers. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/swadlincote"
  },
  "swaffham": {
    title: "Swaffham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Seeking shot blasting in Swaffham? We offer mobile & SA2.5 comprehensive services for Norfolks Manufacturing industry. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/swaffham"
  },
  "swavesey": {
    title: "Swavesey Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "High-quality shot blasting in Swavesey for Construction & Agriculture needs. Specializing in shot blasting for structural steel, rust removal. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/swavesey"
  },
  "swinton": {
    title: "Swinton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For unparalleled mobile shot blasting in Swinton, serving Manufacturing and Construction sectors.  Quality guaranteed. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/swinton"
  },
  "syston": {
    title: "Syston Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Mobile shot blasting in Syston for Construction & Manufacturing projects. Expert rust removal services throughout Leicestershire. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/syston"
  },
  "taverham": {
    title: "Taverham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Seeking shot blasting in Taverham? We offer mobile & SA2.5 services for Norfolks Agriculture industry. Contact us for a free consultation. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/taverham"
  },
  "tenbury-wells": {
    title: "Tenbury Wells Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Tenbury Wells, our shot blasting for structural steel services are ideal for Construction and Manufacturing needs. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/tenbury-wells"
  },
  "tetbury": {
    title: "Tetbury Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Tetbury. Ideal for Construction, Manufacturing applications, including surface preparation & rust removal. Covering...",
    url: "https://commercialshotblasting.co.uk/service-areas/tetbury"
  },
  "tewkesbury": {
    title: "Tewkesbury Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Tewkesbury. Ideal for Agriculture, Manufacturing applications, including rust removal & structural steel. Covering ...",
    url: "https://commercialshotblasting.co.uk/service-areas/tewkesbury"
  },
  "thetford": {
    title: "Thetford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "In Thetford, get top-tier shot blasting for Manufacturing & Agriculture needs. Our SA2.5 & structural steel services deliver. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/thetford"
  },
  "thornbury": {
    title: "Thornbury Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Thornbury for Manufacturing sectors. Specializing in rust removal & mobile. Serving Gloucestershire businesses. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/thornbury"
  },
  "thorne": {
    title: "Thorne Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "High-performance SA2.5 shot blasting in Thorne for demanding Construction and Manufacturing environments.  Dedicated to your satisfaction. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/thorne"
  },
  "thrapston": {
    title: "Thrapston Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing structural steel shot blasting services across Thrapston. We provide comprehensive shot blasting, including structural steel, for Manufacturin...",
    url: "https://commercialshotblasting.co.uk/service-areas/thrapston"
  },
  "tickhill": {
    title: "Tickhill Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable SA2.5 shot blasting services in Tickhill. Trusted by Manufacturing and Steel companies across South Yorkshire. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/tickhill"
  },
  "tidworth": {
    title: "Tidworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional shot blasting solutions in Tidworth. We offer shot blasting, including rust removal. Serving Wiltshire agriculture sectors. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/tidworth"
  },
  "tipton": {
    title: "Tipton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Comprehensive shot blasting for Tipton projects. From surface preparation to full surface prep for Construction in West Midlands. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/tipton"
  },
  "tisbury": {
    title: "Tisbury Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting services in Tisbury for Construction & Manufacturing. We offer shot blasting, including SA2.5. Serving Wiltshire construction &...",
    url: "https://commercialshotblasting.co.uk/service-areas/tisbury"
  },
  "toddington": {
    title: "Toddington Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist rust removal services in Toddington. Enhancing durability and appearance for Construction and Logistics assets. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/toddington"
  },
  "todmorden": {
    title: "Todmorden Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Todmorden for Manufacturing, Construction sectors. We offer SA3 services to prepare surfaces perfectly. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/todmorden"
  },
  "towcester": {
    title: "Towcester Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Dedicated shot blasting solutions for Towcester's Manufacturing. Our surface preparation shot blasting services are perfect for Manufacturing businesses...",
    url: "https://commercialshotblasting.co.uk/service-areas/towcester"
  },
  "tring": {
    title: "Tring Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Tring businesses: professional shot blasting services – specializing in mobile for the Manufacturing & Aerospace sector. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/tring"
  },
  "trowbridge": {
    title: "Trowbridge Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Comprehensive shot blasting for Trowbridge businesses. We offer shot blasting, including SA2.5. Serving Wiltshire agriculture sectors. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/trowbridge"
  },
  "tutbury": {
    title: "Tutbury Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting solutions for Tutbury businesses. specializing in Manufacturing and surface preparation, mobile. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/tutbury"
  },
  "upton-upon-severn": {
    title: "Upton-upon-Severn Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Need mobile shot blasting in Upton-upon-Severn? We provide expert solutions for Agriculture and Manufacturing sectors. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/upton-upon-severn"
  },
  "uttoxeter": {
    title: "Uttoxeter Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting solutions for Uttoxeter businesses. providing Engineering for SA2.5, structural steel projects. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/uttoxeter"
  },
  "wainfleet": {
    title: "Wainfleet Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized SA2.5 shot blasting solutions in Wainfleet. Supporting Lincolnshire's Construction and Agriculture industries. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/wainfleet"
  },
  "walgrave": {
    title: "Walgrave Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Dedicated shot blasting solutions for Walgrave's Construction. Specializing in shot blasting for Construction, with SA2.5 capabilities. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/walgrave"
  },
  "ware": {
    title: "Ware Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Ware, Hertfordshire: reliable shot blasting for offering SA2.5 solutions for Construction & Manufacturing clients. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/ware"
  },
  "warminster": {
    title: "Warminster Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting services in Warminster for Construction. We offer shot blasting, including SA3. Serving Wiltshire construction sectors. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/warminster"
  },
  "warwick": {
    title: "Warwick Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Enhance surfaces in Warwick with our shot blasting. Specializing in structural steel. Trusted by Warwickshire Manufacturing firms. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/warwick"
  },
  "wath-upon-dearne": {
    title: "Wath-upon-Dearne Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting in Wath-upon-Dearne for Construction projects. Specializing in SA3 and surface preparation.  Get a free consultation. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/wath-upon-dearne"
  },
  "watton": {
    title: "Watton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Watton for Construction and Manufacturing applications. Featuring surface preparation and SA2.5 solutions. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/watton"
  },
  "wednesbury": {
    title: "Wednesbury Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Wednesbury businesses, top-tier shot blasting services. Specializing in structural steel for the Engineering, Manufacturing industry. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/wednesbury"
  },
  "wellesbourne": {
    title: "Wellesbourne Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Enhance surfaces in Wellesbourne with our shot blasting. Specializing in SA2.5. Trusted by Warwickshire Construction firms. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/wellesbourne"
  },
  "wellingborough": {
    title: "Wellingborough Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "High-quality shot blasting in Wellingborough for Construction projects. Our structural steel shot blasting services are perfect for Construction busines...",
    url: "https://commercialshotblasting.co.uk/service-areas/wellingborough"
  },
  "wellington": {
    title: "Wellington Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Wellington and Shropshire with professional shot blasting. Specializing in Manufacturing and structural steel. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/wellington"
  },
  "wells": {
    title: "Wells Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Wells – SA3, surface preparation for Agriculture & Construction sectors. Free quote. Your local shot blasting specialists.",
    url: "https://commercialshotblasting.co.uk/service-areas/wells"
  },
  "wells-next-the-sea": {
    title: "Wells-next-the-Sea Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Wells-next-the-Sea businesses: expert shot blasting for Construction & Manufacturing sectors. Specializing in mobile and structural steel. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/wells-next-the-sea"
  },
  "welwyn": {
    title: "Welwyn Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Welwyn, Hertfordshire: reliable shot blasting for offering surface preparation solutions for Construction & Manufacturing clients. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/welwyn"
  },
  "welwyn-garden-city": {
    title: "Welwyn Garden City Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Welwyn Garden City, Hertfordshire – we provide structural steel for Manufacturing & Construction applications. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/welwyn-garden-city"
  },
  "wem": {
    title: "Wem Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Wem and Shropshire with professional shot blasting. Specializing in Agriculture, Construction and rust removal. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/wem"
  },
  "wendover": {
    title: "Wendover Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Wendover businesses, our shot blasting for the Manufacturing sector. Specializing in rust removal. Ensuring optimal surface preparation. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/wendover"
  },
  "west-bridgford": {
    title: "West Bridgford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Looking for shot blasting in West Bridgford? We offer manufacturing projects. Our SA2.5 shot blasting ensures top-quality results. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/west-bridgford"
  },
  "westbury": {
    title: "Westbury Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional shot blasting solutions in Westbury. We offer shot blasting, including structural steel. Serving Wiltshire agriculture sectors. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/westbury"
  },
  "weston-super-mare": {
    title: "Weston-super-Mare Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Weston-super-Mare with surface preparation & SA3 solutions for Agriculture industry. Free quote. We handle all project sizes.",
    url: "https://commercialshotblasting.co.uk/service-areas/weston-super-mare"
  },
  "westward-ho": {
    title: "Westward Ho! Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Westward Ho! for Construction & Agriculture projects. We offer SA2.5 and rust removal services. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/westward-ho"
  },
  "wetherby": {
    title: "Wetherby Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Providing top-tier shot blasting in Wetherby for Manufacturing businesses. Our mobile solutions ensure optimal surface preparation. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/wetherby"
  },
  "whitchurch": {
    title: "Whitchurch Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Whitchurch and Shropshire with professional shot blasting. Specializing in Construction and surface preparation. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/whitchurch"
  },
  "whitnash": {
    title: "Whitnash Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting services in Whitnash, Warwickshire. Specializing in structural steel, mobile. Supporting Warwickshire Engineering and. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/whitnash"
  },
  "whittlesey": {
    title: "Whittlesey Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional shot blasting in Whittlesey for Manufacturing projects. Specializing in shot blasting for SA2.5. Serving Cambridgeshire Manufactur Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/whittlesey"
  },
  "whittlesford": {
    title: "Whittlesford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Seeking reliable shot blasting in Whittlesford? Specializing in shot blasting for rust removal. Serving Cambridgeshire Agriculture sectors. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/whittlesford"
  },
  "wickham-market": {
    title: "Wickham Market Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Wickham Market, ideal for Construction sector. Our structural steel service ensures pristine surfaces. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/wickham-market"
  },
  "wigston": {
    title: "Wigston Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "In Wigston, we offer professional shot blasting for Manufacturing & Construction. Specializing in structural steel across Leicestershire. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/wigston"
  },
  "willenhall": {
    title: "Willenhall Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting solutions for Willenhall. We handle surface preparation projects for Manufacturing, Engineering clients across West... Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/willenhall"
  },
  "willingham": {
    title: "Willingham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional shot blasting in Willingham for Construction & Manufacturing projects. Specializing in shot blasting for structural steel. Serving Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/willingham"
  },
  "wilmslow": {
    title: "Wilmslow Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Quality surface preparation in Wilmslow for shot blasting. SA2.5, surface preparation. Serving Cheshire's Construction sector. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/wilmslow"
  },
  "wilton": {
    title: "Wilton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting services in Wilton for Agriculture & Construction. We offer shot blasting, including SA3. Serving Wiltshire agriculture &...",
    url: "https://commercialshotblasting.co.uk/service-areas/wilton"
  },
  "wincanton": {
    title: "Wincanton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Looking for shot blasting in Wincanton? We offer mobile & structural steel services for Construction businesses. Free quote. Experienced team.",
    url: "https://commercialshotblasting.co.uk/service-areas/wincanton"
  },
  "winchcombe": {
    title: "Winchcombe Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Winchcombe for Manufacturing sectors. Specializing in rust removal & SA2.5. Serving Gloucestershire businesses. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/winchcombe"
  },
  "winsford": {
    title: "Winsford Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Winsford with professional shot blasting. SA3, structural steel. Serving Cheshire's Manufacturing, Construction sector. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/winsford"
  },
  "winslow": {
    title: "Winslow Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Winslow for Construction and Logistics industries. Specializing in surface preparation. Achieving superior results. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/winslow"
  },
  "wirksworth": {
    title: "Wirksworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Proven shot blasting in Wirksworth — SA2.5 structural steel cleaning & restoration. Partnering with Derbyshire construction & engineering. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/wirksworth"
  },
  "wisbech": {
    title: "Wisbech Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional shot blasting in Wisbech for Construction projects. Specializing in shot blasting for rust removal, surface preparation. Serving C Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/wisbech"
  },
  "woburn": {
    title: "Woburn Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Woburn for Construction projects. Dedicated to supporting Bedfordshire's Construction and Manufacturing sectors. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/woburn"
  },
  "woburn-sands": {
    title: "Woburn Sands Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Serving Woburn Sands with top-tier shot blasting for Logistics and Manufacturing. Specializing in industrial plant, containers, and steelwork. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/woburn-sands"
  },
  "wollaston": {
    title: "Wollaston Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialized shot blasting in Wollaston, including mobile. Specializing in shot blasting for Logistics, Manufacturing, with mobile capabilities. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/wollaston"
  },
  "wollaton": {
    title: "Wollaton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Wollaton for construction, engineering projects. Our SA2.5 shot blasting ensures top-quality results. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/wollaton"
  },
  "wolverton": {
    title: "Wolverton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting in Wolverton for the Manufacturing sector. Specializing in SA3. Serving Buckinghamshire clients. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/wolverton"
  },
  "wombourne": {
    title: "Wombourne Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Wombourne specialists in professional shot blasting. offering Engineering and Manufacturing and structural steel solutions. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/wombourne"
  },
  "wombwell": {
    title: "Wombwell Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Experience premium surface preparation shot blasting in Wombwell. Perfect for Construction and Steel industries in South Yorkshire. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/wombwell"
  },
  "wooburn": {
    title: "Wooburn Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Wooburn businesses, our shot blasting for Construction and Manufacturing industries. Specializing in mobile and SA2.5. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/wooburn"
  },
  "wooburn-buckinghamshire": {
    title: "Wooburn Buckinghamshire Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Woburn businesses, our shot blasting for Construction and Manufacturing industries. Specializing in SA2.5 and rust removal. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/wooburn-buckinghamshire"
  },
  "woodbridge": {
    title: "Woodbridge Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Manufacturing businesses in Woodbridge, professional shot blasting. Our structural steel service ensures pristine surfaces. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/woodbridge"
  },
  "woodhall-spa": {
    title: "Woodhall Spa Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "For Woodhall Spa, our mobile shot blasting services. Supporting Lincolnshire's Construction and Manufacturing industries. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/woodhall-spa"
  },
  "woolacombe": {
    title: "Woolacombe Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Professional shot blasting in Woolacombe for Construction & Agriculture sectors. Includes structural steel & surface preparation. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/woolacombe"
  },
  "wootton": {
    title: "Wootton Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Achieve pristine surfaces in Wootton with our surface preparation shot blasting. Our team ensures SA2.5/SA3 standards for durable finishes. Free quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/wootton"
  },
  "worksop": {
    title: "Worksop Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Looking for shot blasting in Worksop? We offer engineering, manufacturing projects. Our mobile shot blasting ensures top-quality results. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/worksop"
  },
  "wotton-under-edge": {
    title: "Wotton Under Edge Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Commercial shot blasting services in Wotton-under-Edge. Ideal for Construction applications, including SA3 & surface preparation. Covering Gloucestershi...",
    url: "https://commercialshotblasting.co.uk/service-areas/wotton-under-edge"
  },
  "wrestlingworth": {
    title: "Wrestlingworth Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Wrestlingworth businesses trust our mobile shot blasting. Providing essential surface solutions for Construction and Manufacturing operations. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/wrestlingworth"
  },
  "wycombe": {
    title: "Wycombe Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Specialist shot blasting in Wycombe for the Manufacturing sector. Specializing in SA2.5. Serving Buckinghamshire clients. Call today.",
    url: "https://commercialshotblasting.co.uk/service-areas/wycombe"
  },
  "wymondham": {
    title: "Wymondham Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Reliable shot blasting in Wymondham for Agriculture and Construction applications. Featuring structural steel and SA3 solutions. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/wymondham"
  },
  "yaxley": {
    title: "Yaxley Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Seeking reliable shot blasting in Yaxley? Specializing in shot blasting for SA2.5. Serving Cambridgeshire Manufacturing & Construction sectors Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/yaxley"
  },
  "yeadon": {
    title: "Yeadon Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting",
    description: "Expert shot blasting in Yeadon for Construction, Manufacturing sectors. We offer surface preparation services to prepare surfaces perfectly. Get a quote.",
    url: "https://commercialshotblasting.co.uk/service-areas/yeadon"
  }
};

// Constants
const SITE_URL = "https://commercialshotblasting.co.uk";
const BUSINESS_NAME = "Commercial Shot Blasting";
const PHONE = "07970 566409";
const EMAIL = "info@commercialshotblasting.co.uk";
const LOGO = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/ATzSAikYtVvYiYkQ.svg";
const HERO_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png";

/**
 * Helper function to capitalize location names
 */
function capitalize(slug: string): string {
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/**
 * Generate hreflang link tags for a given canonical URL.
 * Adds en-gb (primary) and en (fallback) alternate links.
 * Should be injected immediately after the canonical link tag.
 */
function hreflangTags(canonicalUrl: string): string {
  return `
    <link rel="alternate" hreflang="en-gb" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="en" href="${canonicalUrl}" />`;
}

/**
 * Generate comprehensive JSON-LD schemas for service area pages
 */
function generateLocationSchemas(locationSlug: string, locationName: string, url: string, countyName?: string, countySlug?: string): string {
  const location = locationData[locationSlug] as {
    description?: string;
    uniqueFaqs?: Array<{ question: string; answer: string }>;
    faqs?: Array<{ question: string; answer: string }>;
  } | undefined;
  const priorityNearMeMeta = getPriorityLocalNearMeMetadata(locationSlug, locationName);
  const description = priorityNearMeMeta?.description ?? location?.description
    ?? `Commercial mobile shot blasting and surface preparation in ${locationName}, ${countyName ?? "the United Kingdom"}.`;
  const breadcrumbs = [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
    { "@type": "ListItem", "position": 2, "name": "Service Areas", "item": `${SITE_URL}/service-areas` },
    ...(countyName && countySlug
      ? [{ "@type": "ListItem", "position": 3, "name": countyName, "item": `${SITE_URL}/counties/${countySlug}` }]
      : []),
    {
      "@type": "ListItem",
      "position": countyName && countySlug ? 4 : 3,
      "name": locationName,
      "item": url,
    },
  ];
  const structuredFaqs = getPriorityLocalNearMeFaqs(locationSlug, locationName);
  const localFaqs = structuredFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": normaliseResponseTimeCopy(faq.answer) },
    }));

  const graph: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        "url": url,
        "name": priorityNearMeMeta?.title ?? `Shot Blasting in ${locationName} | Commercial Shot Blasting`,
        "description": normaliseResponseTimeCopy(description),
        "isPartOf": { "@type": "WebSite", "@id": `${SITE_URL}/#website`, "name": BUSINESS_NAME, "url": SITE_URL },
        "breadcrumb": { "@id": `${url}#breadcrumb` },
        "inLanguage": "en-GB",
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        "name": isIndexableLocation(locationSlug)
          ? `Commercial shot blasting near ${locationName}`
          : `Commercial mobile shot blasting in ${locationName}`,
        "description": normaliseResponseTimeCopy(description),
        "url": url,
        "serviceType": "Commercial mobile shot blasting and surface preparation",
        "provider": { "@type": "Organization", "@id": `${SITE_URL}/#organization`, "name": BUSINESS_NAME, "url": SITE_URL, "telephone": PHONE },
        "areaServed": { "@type": "City", "name": locationName },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        "itemListElement": breadcrumbs,
      },
      ...(localFaqs.length > 0 ? [{ "@type": "FAQPage", "mainEntity": localFaqs }] : []),
    ],
  };

  return `<script type="application/ld+json">${JSON.stringify(graph)}</script>`;
}

// ─── Service page data (mirrors client/src/data/services.ts) ───────────────
interface ServiceFAQ { question: string; answer: string; }
interface ServiceStep { step: number; title: string; description: string; }
interface ServiceMeta {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  benefits: string[];
  process: ServiceStep[];
  applications: string[];
  faqs: ServiceFAQ[];
}

const serviceMeta: Record<string, ServiceMeta> = {
  "steel-chimney-surface-preparation": {
    id: "steel-chimney-surface-preparation",
    title: "Steel Chimney & Process Stack Surface Preparation | Commercial Shot Blasting",
    description: "Surface preparation for fabricated steel chimneys, process stacks, flues, and duct sections. Plan access, internals, flanges, and coating handover with Commercial Shot Blasting.",
    heroImage: "/manus-storage/SteelChimneyAfter2_3b5e3186.jpeg",
    benefits: ["Planned surface preparation for fabricated chimney sections", "Scope for accessible shells, flanges, openings, and attachments", "Internal-surface access considered at survey stage", "Handover coordinated to coating or protection requirements"],
    process: [
      { step: 1, title: "Scope & Drawing Review", description: "We review available drawings, condition images, access constraints, and coating requirements to define the work scope." },
      { step: 2, title: "Access & Handling Plan", description: "We plan stable positioning, lifting, internal access, containment, and practical inspection access for the assembly." },
      { step: 3, title: "Controlled Surface Preparation", description: "Accessible steelwork is prepared using a method and sequence appropriate to the workpiece, environment, and specification." },
      { step: 4, title: "Inspection & Handover", description: "Prepared surfaces are reviewed against the agreed project requirements before coating, protection, transport, or installation." }
    ],
    applications: ["Fabricated steel chimney sections", "Industrial process stacks and flues", "Cylindrical duct and transition sections", "Stack flanges, access doors, and openings", "Stiffeners, support lugs, and attachments"],
    faqs: [
      { question: "What steel-chimney surfaces can you prepare?", answer: "Accessible external shells, flanges, access-door frames, stiffeners, attachments, and internal surfaces can be included when they are confirmed by drawings, access arrangements, and the project specification." },
      { question: "Can internal chimney or stack surfaces be included?", answer: "Where access and project controls allow, internal surfaces can be included. Ventilation, lighting, debris recovery, inspection, and specification requirements are agreed during planning." },
      { question: "What preparation standard will the chimney achieve?", answer: "The required surface condition, profile, contamination limits, and records should be set by the project specification, responsible engineer, or coating manufacturer. We do not assume a standard from appearance alone." }
    ]
  },
  "structural-steel-frames": {
    id: "structural-steel-frames",
    title: "Structural Steel Frames Shot Blasting | Professional Surface Preparation",
    description: "Professional structural steel frames shot blasting for roof trusses, load-bearing structures, and fabrications. We remove mill scale, rust, and old coatings to achieve SA2.5 or SA3 cleanliness standard, ready for protective coating or galvanizing.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Complete removal of mill scale and rust", "Prepares surfaces for galvanizing or protective coatings", "Extends structural steel lifespan", "Suitable for new fabrications and refurbishment projects"],
    process: [
      { step: 1, title: "Structural Assessment", description: "We inspect the steel frame components to determine appropriate blast media, pressure settings, and surface preparation requirements." },
      { step: 2, title: "Component Preparation", description: "Frame sections are positioned for optimal blast coverage. Critical areas such as bolt holes and connection points are protected as required." },
      { step: 3, title: "Shot Blasting", description: "Using appropriate blast media, we systematically clean all frame surfaces to achieve professional cleanliness for your coating system." },
      { step: 4, title: "Quality Inspection", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications." },
      { step: 5, title: "Coating Coordination", description: "Cleaned components are prepared for galvanizing, powder coating, or painting, with timing coordinated to minimize surface oxidation." }
    ],
    applications: ["Building frame structures", "Roof trusses and purlins", "Portal frame components", "Mezzanine floor structures", "Industrial building frames"],
    faqs: [
      { question: "Can you blast structural steel frames on-site?", answer: "Yes, we provide mobile shot blasting services and can work at your premises. For components requiring galvanizing, we ensure complete coverage and professional cleanliness for protective treatments." },
      { question: "How long does the process take?", answer: "Timeline depends on the size and complexity of the frame structure. A typical portal frame bay can be processed in 2-3 days. We can provide a detailed timeline after assessing your specific requirements." }
    ]
  },
  "steel-containers": {
    id: "steel-containers",
    title: "Steel Container Shot Blasting",
    description: "Specialist shot blasting for steel containers, shipping containers, and fuel storage tanks. We remove rust and old coatings to prepare surfaces for...",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/qVdGSYQwlEjNqJyE.png",
    benefits: ["Removes rust, mill scale and failed coatings completely", "Delivers clean, profiled, coating-ready finish", "Extends service life of steel containers", "Prepares containers for repainting or long-term reuse"],
    process: [
      { step: 1, title: "Preparation & Containment", description: "We begin with inspection and masking, then protect surrounding areas with sheeting and seals to control dust and debris." },
      { step: 2, title: "Precision Shot Blasting", description: "Using the correct media and pressure for the substrate, we remove corrosion and old coatings without compromising the steel." },
      { step: 3, title: "Final Clean Down", description: "On completion, we carry out a meticulous clean-up, collecting residues and waste, leaving the area ready for repainting or recoating." }
    ],
    applications: ["Shipping Containers", "Storage Tanks", "Refrigerated Containers", "Grain Silos", "Fuel Storage Cylinders", "Water Storage & Slurry Tanks"],
    faqs: [
      { question: "What types of steel containers can you blast?", answer: "We can blast all types of steel containers including shipping containers, storage tanks, refrigerated units, grain silos, fuel storage cylinders, water tanks, and more." },
      { question: "Can you blast containers on-site?", answer: "Yes, we can provide on-site shot blasting services for large containers and storage structures that cannot be easily transported." }
    ]
  },
  "factory-cladding": {
    id: "factory-cladding",
    title: "Factory & Warehouse Cladding Shot Blasting",
    description: "Practical surface preparation for factory and warehouse cladding. We plan around panel condition, access, operations and the coating stage that follows.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/EfAlIcQNicWsvHaA.png",
    benefits: ["A clear plan around access, operating areas and the wider refurbishment", "Removal of failed coatings and rust where the agreed method is suitable", "A practical handover point for the specified coating stage", "One team to discuss the cladding condition, preparation and next steps"],
    process: [
      { step: 1, title: "Talk through the building", description: "We start with the cladding condition, elevations, access, nearby operations and the coating stage that follows." },
      { step: 2, title: "Agree access and protection", description: "The work area, containment and protection measures are planned for the actual building and site activity." },
      { step: 3, title: "Prepare the agreed areas", description: "We use the agreed approach to remove failed coatings and corrosion from the cladding areas in scope." },
      { step: 4, title: "Check the handover", description: "We review the prepared areas against the agreed scope before the next project stage." },
      { step: 5, title: "Coordinate the next stage", description: "The timing and coating handover follow the project specification, product guidance and site conditions." }
    ],
    applications: ["Factory wall cladding", "Warehouse exterior panels", "Industrial building facades", "Commercial property cladding"],
    faqs: [
      { question: "Can you blast cladding in place?", answer: "We can review cladding in place as part of the survey. The right approach depends on the panel condition, access, surrounding activity, containment requirements and the coating work that follows." },
      { question: "Will shot blasting damage thin cladding panels?", answer: "Thin cladding needs a project-specific assessment. We look at the panel condition, profile, fixing details and the required coating handover before agreeing whether blasting is the right preparation method." },
      { question: "How long before cladding needs recoating after blasting?", answer: "The coating specification, product guidance and conditions on the day determine the handover timing. Bring the coating information to the planning conversation so the preparation and recoating stages can be lined up properly." }
    ]
  },
  "fire-escapes": {
    id: "fire-escapes",
    title: "Fire Escape Shot Blasting | External Stair Cleaning | Commercial Shot Blasting",
    description: "Professional shot blasting for fire escapes and external stairs. Removes rust and restores safety compliance for protective coating and maintenance.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/CwpnAmaEraMSszIF.png",
    benefits: ["Removes rust and corrosion from safety-critical structures", "Prepares surfaces for protective coatings or galvanizing", "Extends the service life of fire escape systems", "Cost-effective alternative to replacement"],
    process: [
      { step: 1, title: "Safety Assessment", description: "We inspect the fire escape structure to assess condition, identify structural concerns, and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Access Planning", description: "We coordinate access arrangements and safety measures for working at height, ensuring health and safety practices." },
      { step: 3, title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all fire escape surfaces including stairs, landings, handrails, and support..." },
      { step: 4, title: "Quality Verification", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications for coating application." },
      { step: 5, title: "Coating Application", description: "We can coordinate protective coating application or galvanizing to ensure maximum corrosion protection and fire safety requirements." }
    ],
    applications: ["External fire escape stairs", "Fire escape towers", "Emergency egress systems", "Fire escape landings and platforms", "Fire escape handrails and balustrades"],
    faqs: [
      { question: "Can you work on fire escapes while the building is occupied?", answer: "Yes, we can coordinate work schedules to minimize disruption and maintain emergency egress routes. We work with building management to ensure alternative fire escape routes are available during refurbishment work." },
      { question: "What coatings do you recommend for fire escapes?", answer: "We typically recommend intumescent fire-resistant coatings or hot-dip galvanizing for maximum corrosion protection and fire safety compliance." }
    ]
  },
  "staircases": {
    id: "staircases",
    title: "Staircase Shot Blasting | Balustrade Cleaning | Commercial Shot Blasting",
    description: "Professional shot blasting for steel staircases, balustrades, and handrails. Removes rust and welding residue for protective coating and restoration.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/jaElsgrlYUgbWwFe.png",
    benefits: ["Removes rust, old coatings, and welding discoloration", "Prepares surfaces for powder coating or painting", "Restores architectural metalwork to original condition", "Suitable for heritage restoration projects"],
    process: [
      { step: 1, title: "Component Assessment", description: "We inspect the metalwork to assess condition, identify any delicate features, and determine appropriate blast media and pressure settings." },
      { step: 2, title: "Preparation & Masking", description: "Components are prepared for blasting. Threaded connections, bearing surfaces, and delicate features are masked or protected as required." },
      { step: 3, title: "Precision Blasting", description: "Using fine-grade blast media and controlled pressure, we carefully clean all surfaces while preserving fine details and dimensional tolerances." },
      { step: 4, title: "Quality Inspection", description: "We conduct detailed inspections to ensure all surfaces meet the required cleanliness and profile specifications for your chosen finish." },
      { step: 5, title: "Finishing Coordination", description: "Cleaned components are prepared for powder coating, painting, or other finishing processes, with timing coordinated to maintain surface cleanliness." }
    ],
    applications: ["Internal steel staircases", "Balustrades and handrails", "Decorative metalwork", "Heritage staircase restoration", "Mezzanine staircase systems"],
    faqs: [
      { question: "Can you blast staircases without damaging decorative details?", answer: "Yes, we use fine-grade blast media and carefully controlled pressure settings to clean surfaces while preserving fine details, threads, and dimensional tolerances." },
      { question: "What finishes can be applied after blasting?", answer: "After shot blasting, staircases and balustrades can be powder coated, wet painted, galvanized, or left with a clear protective coating." }
    ]
  },
  "bridge-steelwork": {
    id: "bridge-steelwork",
    title: "Bridge Steelwork Shot Blasting | Infrastructure Cleaning | Commercial Shot Blasting",
    description: "Professional shot blasting for bridge steelwork, girders, and infrastructure. Meets highway specifications and prepares surfaces for protective coating systems.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/SIvqwXQxxXKmsmDK.png",
    benefits: ["Meets highway and railway bridge coating specifications", "Removes rust, old coatings, and corrosion", "Extends bridge infrastructure lifespan", "Cost-effective alternative to bridge replacement"],
    process: [
      { step: 1, title: "Structural Survey", description: "We conduct a detailed survey of the bridge steelwork to assess condition and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Access & Safety Planning", description: "We coordinate access arrangements, traffic management, and safety measures for working on bridge structures." },
      { step: 3, title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all bridge steelwork surfaces to achieve professional cleanliness." },
      { step: 4, title: "Quality Verification", description: "We conduct thorough inspections and surface cleanliness testing to verify compliance with bridge coating specifications." },
      { step: 5, title: "Coating Application", description: "We can coordinate protective coating application to ensure maximum corrosion protection and compliance with highway authority specifications." }
    ],
    applications: ["Bridge girders and beams", "Bridge crossmembers and bracing", "Parapet rails and barriers", "Footbridge steelwork", "Railway bridge components", "Heritage bridge restoration"],
    faqs: [
      { question: "Can you work on bridges while they remain open to traffic?", answer: "Yes, we can coordinate work schedules with highway authorities to minimize disruption. We typically work during night-time closures or use lane closures with traffic management systems." },
      { question: "What surface preparation standards do you achieve for bridge work?", answer: "We routinely achieve professional cleanliness and SA3 surface preparation standards required for highway and railway bridge coating systems." }
    ]
  },
  "ladders": {
    id: "ladders",
    title: "Ladder Shot Blasting | Access Platform Cleaning | Commercial Shot Blasting",
    description: "Professional shot blasting for fixed ladders, caged systems, and access platforms. Removes rust and restores safety-critical access infrastructure.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/fjQLkvBCsjdFzSjo.png",
    benefits: ["Removes rust and corrosion from safety-critical access systems", "Prepares surfaces for protective coatings or galvanizing", "Extends the service life of access infrastructure", "Cost-effective alternative to replacement"],
    process: [
      { step: 1, title: "Safety Assessment", description: "We inspect the access system to assess condition and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Component Preparation", description: "Ladder sections, platforms, and safety cages are prepared for blasting. Critical connection points and safety features are protected as required." },
      { step: 3, title: "Shot Blasting", description: "We systematically clean all access system surfaces including rungs, side rails, platforms, and safety cages." },
      { step: 4, title: "Quality Verification", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications." },
      { step: 5, title: "Coating & Installation", description: "Cleaned components are prepared for protective coating or galvanizing, with timing coordinated for installation." }
    ],
    applications: ["Fixed vertical ladders", "Caged ladder systems", "Step-over platforms", "Industrial access ladders", "Roof access systems", "Tank access ladders"],
    faqs: [
      { question: "Can you blast fixed ladders in situ?", answer: "Yes, we provide mobile shot blasting services at your location. We can work with ladders in situ or coordinate if sections need removal for access." },
      { question: "What protective coatings do you recommend for access systems?", answer: "We typically recommend hot-dip galvanizing for maximum corrosion protection and durability, especially for outdoor or harsh environment applications." }
    ]
  },
  "warehouse-racking": {
    id: "warehouse-racking",
    title: "Warehouse Racking Shot Blasting | Pallet Rack Cleaning | Commercial Shot Blasting",
    description: "Professional shot blasting for warehouse racking, pallet racks, and storage frames. Removes rust and corrosion to restore racking systems and extend service life.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/iAwFyjcyrlabkDxc.png",
    benefits: ["Complete removal of rust, old coatings, and corrosion", "Extends the service life of warehouse racking systems", "Prepares surfaces for powder coating or galvanizing", "Cost-effective alternative to replacing entire racking systems"],
    process: [
      { step: 1, title: "Assessment", description: "We inspect the racking components to determine the appropriate blast media, pressure settings, and surface preparation requirements." },
      { step: 2, title: "Disassembly & Preparation", description: "If required, we can coordinate the disassembly of racking components at your premises to ensure optimal access for mobile blasting treatment." },
      { step: 3, title: "Shot Blasting", description: "Our skilled technicians systematically blast all racking surfaces, removing rust, old coatings, and contaminants to achieve professional cleanliness." },
      { step: 4, title: "Quality Inspection", description: "We conduct thorough quality checks to ensure all surfaces meet the required profile and cleanliness specifications." },
      { step: 5, title: "Finishing & Return", description: "Cleaned components are prepared for powder coating, painting, or galvanizing, and can be returned to your site ready for installation." }
    ],
    applications: ["Pallet racking uprights and beams", "Cantilever racking systems", "Drive-in and drive-through racking", "Mezzanine floor support structures", "Distribution center racking"],
    faqs: [
      { question: "Can you blast racking on-site or does it need to be removed?", answer: "Yes, we provide mobile shot blasting services at your warehouse location. We can blast racking in situ or coordinate disassembly if needed for optimal access." },
      { question: "How long does the warehouse racking blasting process take?", answer: "Timeline depends on the quantity and condition of components. A typical pallet racking bay can be processed in 1-2 days." }
    ]
  },
  "pipework": {
    id: "pipework",
    title: "Pipework Shot Blasting | Pipe Spool Cleaning | Commercial Shot Blasting",
    description: "Professional shot blasting for process pipework, pipe spools, and manifolds. Prepares internal and external surfaces for coating and meets pipeline specifications.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Internal and external surface preparation", "Meets pipeline coating specifications", "Suitable for all pipe diameters and materials", "Extends pipeline service life"],
    process: [
      { step: 1, title: "Pipe Assessment", description: "We inspect pipework to assess condition, coating requirements, and determine appropriate blast media and preparation standards." },
      { step: 2, title: "End Preparation", description: "Pipe ends, flanges, and fittings are masked or protected as required before blasting commences." },
      { step: 3, title: "Shot Blasting", description: "We blast internal and external pipe surfaces to the specified cleanliness standard using appropriate media and equipment." },
      { step: 4, title: "Quality Verification", description: "Surface cleanliness and profile are measured and verified to ensure compliance with coating specifications." },
      { step: 5, title: "Coating Coordination", description: "Prepared pipework is handed over for immediate coating application to prevent surface oxidation." }
    ],
    applications: ["Process pipework", "Pipe spools and manifolds", "Industrial pipelines", "Chemical plant pipework", "Food processing pipework", "Oil and gas pipework"],
    faqs: [
      { question: "Can you blast pipework internally and externally?", answer: "Yes, we can prepare both internal and external pipe surfaces. Internal blasting uses specialist equipment to achieve the required cleanliness standard throughout the pipe bore." },
      { question: "What pipe sizes can you blast?", answer: "We can blast pipes from small bore (25mm diameter) up to large diameter industrial pipework. Our equipment is adaptable to a wide range of pipe sizes and configurations." }
    ]
  },
  "telecom-towers": {
    id: "telecom-towers",
    title: "Telecom Tower Shot Blasting | Mast Cleaning | Commercial Shot Blasting",
    description: "Professional shot blasting for telecom masts, lattice towers, and communication infrastructure. Removes corrosion and extends tower lifespan with protective coatings.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Removes corrosion from tower steelwork", "Extends telecom infrastructure lifespan", "Prepares surfaces for protective coating systems", "Reduces maintenance costs"],
    process: [
      { step: 1, title: "Tower Survey", description: "We conduct a detailed survey of the tower structure to assess condition and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Access & Safety Planning", description: "We coordinate access arrangements and safety measures for working at height on tower structures." },
      { step: 3, title: "Shot Blasting", description: "We systematically clean all tower steelwork surfaces, removing corrosion, old coatings, and contaminants." },
      { step: 4, title: "Quality Verification", description: "Surface cleanliness and profile are verified to ensure compliance with coating specifications." },
      { step: 5, title: "Coating Application", description: "We can coordinate protective coating application to ensure maximum corrosion protection for the tower structure." }
    ],
    applications: ["Telecom masts", "Lattice towers", "Communication towers", "Broadcast masts", "Wind turbine towers", "Power transmission towers"],
    faqs: [
      { question: "Can you blast telecom towers while they remain operational?", answer: "Yes, we can coordinate work to minimize downtime. We work with tower operators to schedule blasting during planned maintenance windows." },
      { question: "What surface preparation standard do you achieve for tower steelwork?", answer: "We typically achieve SA2.5 (near-white metal) or SA3 (white metal) finish as required by the coating specification for the tower structure." }
    ]
  },
  "floor-preparation": {
    id: "floor-preparation",
    title: "Floor Shot Blasting Contractors | Commercial Concrete Floor Preparation",
    description: "Commercial floor shot blasting and concrete floor preparation for warehouses, industrial floors and car parks. Plan condition, access and the next flooring or coating stage.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Commercial concrete and floor-coating preparation", "Assessment of old coatings, laitance and surface condition", "Preparation planned around the specified next flooring or coating stage", "Access, working-area and operational-interface planning"],
    process: [
      { step: 1, title: "Floor and site review", description: "We review floor condition, included areas, access, drains, edges, nearby operations and the next planned flooring or coating stage." },
      { step: 2, title: "Working-area set-up", description: "The practical set-up, surrounding-area protection, containment requirements and live-site interfaces are agreed before work starts." },
      { step: 3, title: "Floor shot blasting", description: "We carry out the agreed preparation work around the floor condition and the specified next stage." },
      { step: 4, title: "Handover for the next stage", description: "The condition for the next trade, practical handover and any agreed cleaning or inspection requirements are discussed with the project team." }
    ],
    applications: ["Warehouse floors", "Factory floors", "Car park decks", "Industrial unit floors", "Food processing floors", "Pharmaceutical facility floors"],
    faqs: [
      { question: "What should I send for a concrete floor shot blasting enquiry?", answer: "Send photos of the floor, the area or drawings, the current coating or contamination, access details, drains and edges, nearby operations, the site postcode and the intended new flooring or coating system. We can then discuss a practical scope." },
      { question: "Can floor blasting be planned around an operating facility?", answer: "We will discuss access, working areas, containment, nearby operations and the next flooring or coating handover. The right set-up depends on the actual floor and how the site is running." }
    ]
  },
  "powder-coating": {
    id: "powder-coating",
    title: "Powder Coating Shot Blasting | Surface Preparation & Finishing | Commercial Shot Blasting",
    description: "Professional combined shot blasting and powder coating service for steel components. Complete surface preparation and durable protective finishing.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Complete surface preparation and finishing service", "Wide range of colours and textures available", "Durable, long-lasting corrosion protection", "Environmentally friendly process"],
    process: [
      { step: 1, title: "Component Assessment", description: "We assess the components to determine appropriate blast media, powder coating specification, and preparation requirements." },
      { step: 2, title: "Shot Blasting", description: "Components are shot blasted to achieve the required surface cleanliness and profile for optimal powder coating adhesion." },
      { step: 3, title: "Pre-treatment", description: "Blasted components are pre-treated to remove any residual contamination and improve powder coating adhesion." },
      { step: 4, title: "Powder Coating Application", description: "Powder coating is applied electrostatically and cured in an oven to achieve a durable, uniform finish." },
      { step: 5, title: "Quality Inspection", description: "Finished components are inspected for coating thickness, adhesion, and appearance before delivery." }
    ],
    applications: ["Steel fabrications", "Architectural metalwork", "Industrial equipment", "Furniture and fixtures", "Automotive components", "Agricultural equipment"],
    faqs: [
      { question: "What colours are available for powder coating?", answer: "We can match virtually any RAL or BS colour. We stock a wide range of standard colours and can source custom colours to match your specification." },
      { question: "How durable is powder coating compared to paint?", answer: "Powder coating is significantly more durable than conventional paint. It provides excellent resistance to chipping, scratching, and corrosion, typically lasting 15-20 years in normal conditions." }
    ]
  },
  "commercial-radiators": {
    id: "commercial-radiators",
    title: "Commercial Radiator Shot Blasting | Heat Exchanger Cleaning | Commercial Shot Blasting",
    description: "Professional shot blasting for commercial radiators and heat exchangers. Restores efficiency and removes internal scale and corrosion.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Restores heat transfer efficiency", "Removes internal scale and corrosion", "Prepares external surfaces for recoating", "Extends radiator service life"],
    process: [
      { step: 1, title: "Radiator Assessment", description: "We inspect the radiators to assess condition, scale buildup, and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Valve & Fitting Protection", description: "Valves, fittings, and connection points are masked and protected before blasting commences." },
      { step: 3, title: "Controlled Shot Blasting", description: "We blast internal and external radiator surfaces using appropriate media to remove scale, corrosion, and old coatings." },
      { step: 4, title: "Internal Cleaning", description: "Internal passages are flushed and cleaned to remove blast media and debris, ensuring clear flow paths." },
      { step: 5, title: "Quality Verification", description: "Cleaned radiators are inspected and tested to ensure they meet the required standard before recoating or reinstallation." }
    ],
    applications: ["Cast iron radiators", "Steel panel radiators", "Industrial heat exchangers", "Commercial heating systems", "Heritage building radiators"],
    faqs: [
      { question: "Can you blast radiators without removing them from the building?", answer: "For smaller radiators, we recommend removal for optimal access and results. For large industrial radiators, we can provide on-site blasting with appropriate containment." },
      { question: "Will shot blasting damage radiator fins or internal passages?", answer: "No, we use appropriate blast media and controlled pressure to clean radiator surfaces without damaging fins or internal passages. Our technicians are experienced in handling delicate heat transfer components." }
    ]
  },
  "commercial-vehicles": {
    id: "commercial-vehicles",
    title: "Commercial Vehicle Shot Blasting | Truck & Machinery Cleaning | Commercial Shot Blasting",
    description: "Professional shot blasting for commercial vehicles, trucks, and agricultural machinery. Removes rust and corrosion for restoration and protective coating.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Complete rust and corrosion removal", "Prepares surfaces for protective coatings", "Extends vehicle and machinery service life", "Suitable for all vehicle types and sizes"],
    process: [
      { step: 1, title: "Vehicle Assessment", description: "We inspect the vehicle or machinery to assess condition, identify structural concerns, and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Component Disassembly", description: "Where required, components are disassembled to ensure complete access for blasting. Glass, rubber seals, and sensitive components are protected." },
      { step: 3, title: "Heavy-Duty Shot Blasting", description: "We systematically blast all vehicle surfaces, removing rust, old paint, and corrosion to achieve bare metal condition." },
      { step: 4, title: "Detailed Cleaning", description: "All blast media and debris is removed from cavities, joints, and recesses to ensure a clean substrate for coating." },
      { step: 5, title: "Surface Profiling", description: "The surface profile is verified to ensure it meets the requirements of the specified coating or restoration system." }
    ],
    applications: ["HGV and truck chassis", "Agricultural tractors and harvesters", "Plant and construction machinery", "Trailers and semi-trailers", "Skip lorries and refuse vehicles"],
    faqs: [
      { question: "Can you blast vehicles on-site?", answer: "Yes, we provide mobile shot blasting services and can work at your premises. We implement comprehensive containment systems to control dust and debris." },
      { question: "What types of vehicles can you blast?", answer: "We can blast all types of commercial and agricultural vehicles including HGVs, tractors, harvesters, trailers, plant machinery, and specialist vehicles." }
    ]
  },
  "steel-doors": {
    id: "steel-doors",
    title: "Steel Door Shot Blasting | Roller Shutter Cleaning | Commercial Shot Blasting",
    description: "Professional shot blasting for steel doors, roller shutters, and industrial door systems. Removes rust and prepares surfaces for protective coatings.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Removes rust and corrosion from door components", "Prepares surfaces for protective coatings", "Extends door and shutter service life", "Cost-effective alternative to replacement"],
    process: [
      { step: 1, title: "Door Assessment & Planning", description: "We inspect the door or shutter components to assess condition and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Component Removal & Protection", description: "Door hardware, seals, and sensitive components are removed or protected before blasting commences." },
      { step: 3, title: "Industrial Shot Blasting", description: "We systematically blast all door surfaces, removing rust, old coatings, and contaminants to achieve the required cleanliness standard." },
      { step: 4, title: "Quality Inspection", description: "Cleaned components are inspected to ensure all surfaces meet the required cleanliness and profile specifications." },
      { step: 5, title: "Coating Coordination", description: "Prepared components are handed over for immediate coating application to prevent surface oxidation." }
    ],
    applications: ["Industrial steel doors", "Roller shutters", "Security doors", "Fire doors", "Loading bay doors", "Warehouse entrance doors"],
    faqs: [
      { question: "Can you blast roller shutters in situ?", answer: "Yes, we can blast roller shutters in place using appropriate containment. For optimal results, we recommend removing the shutter curtain for blasting." },
      { question: "What coatings do you recommend for steel doors?", answer: "We typically recommend high-performance epoxy or polyurethane coating systems for maximum durability and corrosion protection. Powder coating is also an excellent option for smaller door components." }
    ]
  },
  "steel-sheeting": {
    id: "steel-sheeting",
    title: "Steel Sheeting Shot Blasting | Metal Plate Cleaning | Commercial Shot Blasting",
    description: "Professional shot blasting for steel sheet, plate, and profiled sheeting. Removes mill scale and prepares surfaces for galvanizing or protective coatings.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Removes mill scale, rust, and contamination", "Prepares surfaces for galvanizing or coating", "Suitable for all sheet thicknesses and profiles", "Achieves consistent surface cleanliness"],
    process: [
      { step: 1, title: "Sheet Assessment", description: "We assess the steel sheeting to determine appropriate blast media, pressure settings, and surface preparation requirements." },
      { step: 2, title: "Sheet Handling", description: "Sheets are positioned for optimal blast coverage, with appropriate support to prevent distortion during blasting." },
      { step: 3, title: "Shot Blasting", description: "We systematically blast all sheet surfaces to achieve the required cleanliness standard and surface profile." },
      { step: 4, title: "Quality Inspection", description: "Blasted sheets are inspected to verify cleanliness and profile meet the requirements of the specified coating or galvanizing process." },
      { step: 5, title: "Coating Coordination", description: "Prepared sheets are handed over for immediate coating or galvanizing to prevent surface oxidation." }
    ],
    applications: ["Structural steel plate", "Profiled roofing sheets", "Wall cladding panels", "Floor plate", "Tank shell plates", "Fabrication blanks"],
    faqs: [
      { question: "Can you blast thin steel sheeting without causing distortion?", answer: "Yes, we use appropriate blast media and controlled pressure to prepare thin sheeting without causing distortion. Our technicians are experienced in handling sheet materials of all thicknesses." },
      { question: "What surface cleanliness standard do you achieve?", answer: "We typically achieve SA2.5 (near-white metal) or SA3 (white metal) finish as required by the coating or galvanizing specification." }
    ]
  },
  "steel-gates": {
    id: "steel-gates",
    title: "Steel Gate Shot Blasting | Railing Cleaning | Commercial Shot Blasting",
    description: "Professional shot blasting for steel gates, railings, and ornamental ironwork. Removes rust and restores metalwork for protective coating or painting.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Removes rust and corrosion from metalwork", "Prepares surfaces for powder coating or painting", "Restores ornamental ironwork to original condition", "Cost-effective alternative to replacement"],
    process: [
      { step: 1, title: "Metalwork Assessment", description: "We inspect the gates and railings to assess condition, identify any delicate features, and determine appropriate blast media and pressure settings." },
      { step: 2, title: "Component Preparation", description: "Gates and railing sections are prepared for blasting. Hinges, locks, and sensitive components are protected as required." },
      { step: 3, title: "Shot Blasting", description: "Using appropriate blast media and controlled pressure, we clean all metalwork surfaces while preserving decorative details." },
      { step: 4, title: "Quality Inspection", description: "Cleaned components are inspected to ensure all surfaces meet the required cleanliness and profile specifications." },
      { step: 5, title: "Finishing Coordination", description: "Prepared components are handed over for powder coating, painting, or other finishing processes." }
    ],
    applications: ["Entrance gates", "Security railings", "Decorative ironwork", "Garden gates and fencing", "Commercial security fencing", "Heritage ironwork restoration"],
    faqs: [
      { question: "Can you blast ornamental ironwork without damaging decorative details?", answer: "Yes, we use fine-grade blast media and carefully controlled pressure to clean surfaces while preserving decorative details and fine metalwork features." },
      { question: "Can you blast gates and railings on-site?", answer: "Yes, we provide mobile shot blasting services and can work at your location. We implement containment systems to control blast media and protect surrounding areas." }
    ]
  },
  "plant-machinery": {
    id: "plant-machinery",
    title: "Plant & Machinery Shot Blasting | Equipment Cleaning | Commercial Shot Blasting",
    description: "Professional shot blasting for industrial plant, machinery, and manufacturing equipment. Removes rust and contamination for protective coating and restoration.",
    heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png",
    benefits: ["Complete rust and contamination removal", "Prepares surfaces for protective coatings", "Extends machinery service life", "Suitable for all types of industrial plant"],
    process: [
      { step: 1, title: "Machinery Assessment", description: "We inspect the plant and machinery to assess condition, identify sensitive components, and determine appropriate blast media and preparation requirements." },
      { step: 2, title: "Component Protection", description: "Bearings, seals, electrical components, and other sensitive parts are masked and protected before blasting commences." },
      { step: 3, title: "Shot Blasting", description: "We systematically blast all machinery surfaces, removing rust, old coatings, and contamination to achieve the required cleanliness standard." },
      { step: 4, title: "Detailed Cleaning", description: "All blast media and debris is removed from cavities, joints, and recesses to ensure a clean substrate for coating." },
      { step: 5, title: "Quality Verification", description: "Cleaned machinery is inspected to ensure all surfaces meet the required cleanliness and profile specifications before coating." }
    ],
    applications: ["Manufacturing equipment", "Processing machinery", "Pumps and compressors", "Gearboxes and drives", "Conveyors and handling equipment", "Construction plant"],
    faqs: [
      { question: "Can you blast machinery on-site without dismantling it?", answer: "Yes, we provide mobile shot blasting services and can work on machinery in situ. We implement comprehensive containment and protection to ensure sensitive components are not affected." },
      { question: "What types of plant and machinery can you blast?", answer: "We can blast virtually any type of industrial plant and machinery including processing equipment, pumps, compressors, conveyors, gearboxes, and construction plant." }
    ]
  },
  "intumescent-painting": {
    id: "intumescent-painting",
    title: "Intumescent Painting — Fire-Resistant Coatings for Structural Steel",
    description: "Complete intumescent painting service for structural steel, fire escapes, and industrial metalwork. We shot blast to Sa 2.5, apply certified intumescent coatings, and provide full DFT documentation. Two specialist teams on site at the same time — blasting and painting in a single visit.",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
    benefits: [
      "Full in-house service: shot blasting and intumescent painting under one contract",
      "Certified coatings compliant with BS EN 13381 and ASFP guidelines",
      "Certified fire protection coatings applied and fully documented",
      "Mobile service nationwide",
      "Detailed DFT inspection records and coating thickness reports provided"
    ],
    process: [
      { step: 1, title: "Site Survey & Specification", description: "We assess the steel, confirm the required fire resistance rating, and agree the coating system and DFT specification." },
      { step: 2, title: "Surface Preparation by Shot Blasting", description: "All steel is shot blasted to Sa 2.5 or Sa 3 to remove mill scale, rust, and old coatings and create the correct surface profile." },
      { step: 3, title: "Primer Application", description: "An approved zinc-rich or epoxy primer is applied immediately after blasting to prevent flash rusting." },
      { step: 4, title: "Intumescent Coating Application", description: "The intumescent basecoat is applied in controlled passes to achieve the specified DFT for the required fire resistance rating." },
      { step: 5, title: "Sealer / Topcoat", description: "A protective sealer or decorative topcoat is applied over the intumescent layer for weather resistance and the required finish colour." },
      { step: 6, title: "Inspection & Documentation", description: "A full DFT survey is carried out and a coating report issued, ready for building control or fire engineer sign-off." }
    ],
    applications: [
      "Structural steel frames (columns, beams, trusses)",
      "Mezzanine floors and steel platforms",
      "Fire escapes and external stair towers",
      "Internal staircases, balustrades, and handrails",
      "Steel portal frames in warehouses and factories",
      "New build and refurbishment projects"
    ],
    faqs: [
      { question: "What is intumescent paint?", answer: "Intumescent paint expands under heat to create an insulating char layer around steel, maintaining structural integrity for the specified fire resistance period. The steel must be blasted to Sa 2.5 before application to ensure the coating bonds correctly." },
      { question: "Why does steel need shot blasting before intumescent painting?", answer: "Intumescent coatings require strong adhesion to perform correctly. Shot blasting to Sa 2.5 removes all contaminants and creates the surface profile needed for maximum mechanical adhesion." },
       { question: "Do you provide a coating thickness report?", answer: "Yes. We measure dry film thickness on every coated member and provide a full coating report with product data sheets, batch numbers, and thickness readings for building control." }
    ]
  },
  "marine-shot-blasting": {
    id: "marine-shot-blasting",
    title: "Marine Shot Blasting",
    description: "Commercial marine shot blasting for large steelwork, fabricated enclosures, marine and waterside assets. See the current ADE Power Wakefield Marine CX enclosure preparation project record.",
    heroImage: "/manus-storage/ade-power-wakefield-marine-cx-hero_0d533b36.webp",
    benefits: ["Removes marine corrosion, barnacle fouling, and anti-fouling coatings", "Achieves SA2.5/SA3 standard for marine coating systems", "Mobile units deployable to ports, harbours, and inland waterways", "Suitable for steel vessels, lock gates, jetties, and offshore structures", "Prepares surfaces for epoxy, anti-fouling, and marine-grade coatings"],
    process: [
      { step: 1, title: "Marine Assessment", description: "We assess the structure, identify corrosion levels and fouling, and agree the blast standard and coating specification." },
      { step: 2, title: "Containment & Environmental Controls", description: "Appropriate containment is set up to capture blast media and debris, meeting port and harbour environmental requirements." },
      { step: 3, title: "Shot Blasting", description: "All surfaces are blasted to the agreed SA standard, removing all corrosion, fouling, and old coatings to create the correct surface profile." },
      { step: 4, title: "Inspection", description: "Surface cleanliness and profile are verified before any coating application to ensure the marine coating system will perform correctly." },
      { step: 5, title: "Coating Coordination", description: "We coordinate with coating applicators or apply primer coats immediately after blasting to prevent flash rusting in the marine environment." }
    ],
    applications: ["Steel vessels and barges", "Lock gates and sluice gates", "Jetties and pontoons", "Port and harbour infrastructure", "Offshore platform components", "Canal and river structures"],
    faqs: [
      { question: "Can you work in ports and harbours?", answer: "Yes, our mobile units are deployable to ports, harbours, and inland waterways. We work within port authority requirements and can provide method statements and risk assessments." },
      { question: "What blast standard is required for marine coatings?", answer: "Most marine coating systems require SA2.5 or SA3 surface cleanliness with a defined surface profile. We achieve these standards and can provide inspection documentation for coating manufacturers' warranties." }
    ]
  },
  "marine-cx-surface-preparation": {
    id: "marine-cx-surface-preparation",
    title: "Marine CX Surface Preparation | Large-Scale Commercial Blasting",
    description: "Large-scale commercial blasting for steelwork and enclosures entering Marine CX coating systems. CX is an extreme corrosivity category: the project coating specification sets the system, film build, controlled anchor profile and handover requirements.",
    heroImage: "/manus-storage/ade-power-wakefield-marine-cx-hero_0d533b36.webp",
    benefits: [
      "Commercial scope planned around the asset, working area, access and coating handover",
      "Blast cleanliness, profile and measurement method reviewed against the specified coating system",
      "Controlled anchor profile planned for primer adhesion—not a generic polished-smooth finish",
      "Containment, protection and sequencing planned around larger commercial work packages",
      "Inspection points, contamination and environmental controls included where the project requires them"
    ],
    process: [
      { step: 1, title: "Project Review", description: "We look at the asset, site, access and drawings alongside the coating information available for the job." },
      { step: 2, title: "Commercial Scope & Site Planning", description: "We plan the working area, access, containment, protection of adjacent assets and the blasting-to-coating sequence with your project team." },
      { step: 3, title: "Blast to the Agreed Requirement", description: "Accessible steelwork is prepared to the blast-cleanliness and profile requirement stated for the project using the agreed method and controls." },
      { step: 4, title: "Checks & Handover", description: "The agreed checks and records are completed before coating handover; final coating acceptance remains subject to the responsible project party and specification." }
    ],
    applications: ["Large commercial steelwork and fabricated enclosures entering a specified CX coating package", "Port, harbour and waterside steel assets", "Offshore-related steel components where project coating requirements are available", "Fabricated steelwork requiring coordinated blasting and coating handover"],
    faqs: [
      { question: "Why does Marine CX surface preparation matter?", answer: "CX identifies an extreme atmospheric corrosivity environment. The coating system is selected for that environment and the project maintenance plan. Its exact coats, total dry-film build, cleanliness requirements and inspection points are set by the project coating specification and current product data." },
      { question: "Is CX a blast profile?", answer: "No. CX is an ISO 12944 atmospheric corrosivity category. The applicable blast-cleanliness grade, profile range, test method and contamination limits are set by the project's approved coating specification and current product documentation." },
      { question: "What do you need before a large Marine CX blasting enquiry?", answer: "Send what you have: photos or drawings, approximate asset dimensions, site and access information, the coating system or product data sheet, and the required preparation, inspection and coating-handover sequence where known." },
      { question: "Can you work to a specified surface-profile range?", answer: "Where the project documentation specifies a range and measurement method, this can be reviewed as part of the work scope. We do not assume one profile range is correct for every CX coating system." }
    ]
  },
  "rust-removal": {
    id: "rust-removal",
    title: "Rust Removal Shot Blasting | Professional Rust Removal Service",
    description: "Professional rust removal by shot blasting for structural steel, plant, machinery, and fabrications. We remove all surface and deep-seated rust to achieve clean bare metal, ready for protective coating or galvanizing.",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
    benefits: ["Complete removal of surface and deep-seated rust", "Achieves SA2.5 or SA3 cleanliness standard", "Creates correct surface profile for coating adhesion", "Extends the service life of steel structures and components", "Mobile service — we come to your site nationwide"],
    process: [
      { step: 1, title: "Assessment", description: "We inspect the level of corrosion and agree the required cleanliness standard and surface profile for your coating system." },
      { step: 2, title: "Preparation", description: "Components are positioned for optimal blast coverage. Areas not requiring treatment are masked as required." },
      { step: 3, title: "Shot Blasting", description: "All corroded surfaces are blasted to remove rust, mill scale, and contamination, achieving clean bare metal to the agreed standard." },
      { step: 4, title: "Inspection", description: "Surface cleanliness and profile are checked against the specification before coating." },
      { step: 5, title: "Coating Coordination", description: "We coordinate primer or coating application immediately after blasting to prevent re-oxidation." }
    ],
    applications: ["Structural steelwork", "Plant and machinery", "Steel fabrications", "Pipework and vessels", "Agricultural equipment", "Commercial vehicles and trailers"],
    faqs: [
      { question: "Can you remove heavy rust and pitting?", answer: "Yes. Shot blasting is highly effective at removing all grades of rust including heavy corrosion and pitting. The abrasive media physically removes rust from the surface and creates a clean profile for coating." },
      { question: "What cleanliness standard do you achieve?", answer: "We typically achieve SA2.5 (near-white metal) or SA3 (white metal) depending on your coating system requirements. We can provide inspection documentation confirming the achieved standard." }
    ]
  },
  "mill-scale-removal": {
    id: "mill-scale-removal",
    title: "Mill Scale Removal | Shot Blasting for Steel Cleanliness",
    description: "Specialist mill scale removal by shot blasting for new steel fabrications, structural sections, and plate. Mill scale must be removed before coating or galvanizing to ensure adhesion and prevent premature coating failure.",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
    benefits: ["Complete removal of mill scale from new and used steel", "Achieves SA2.5 or SA3 standard required by coating manufacturers", "Prevents premature coating failure caused by mill scale delamination", "Creates the correct surface profile for coating adhesion", "Essential pre-treatment before galvanizing, powder coating, or painting"],
    process: [
      { step: 1, title: "Assessment", description: "We assess the steel sections and agree the required cleanliness standard and surface profile for your coating or galvanizing specification." },
      { step: 2, title: "Component Preparation", description: "Steel sections are positioned for full blast coverage. Threaded components and precision surfaces are protected as required." },
      { step: 3, title: "Shot Blasting", description: "All surfaces are blasted to remove mill scale and any surface contamination, achieving clean bare metal to the agreed standard." },
      { step: 4, title: "Inspection", description: "Surface cleanliness and profile are verified before coating or galvanizing." },
      { step: 5, title: "Coating Coordination", description: "We coordinate with coating applicators or galvanizers to minimise the time between blasting and coating to prevent flash rusting." }
    ],
    applications: ["New structural steel fabrications", "Steel plate and sections", "Beams, columns, and purlins", "Steel for galvanizing", "New build steelwork", "Fabricated components for powder coating"],
    faqs: [
      { question: "Why does mill scale need to be removed before coating?", answer: "Mill scale is a brittle iron oxide layer formed during steel rolling. It has poor adhesion and will delaminate over time, taking the coating with it. Removing mill scale by shot blasting ensures the coating bonds directly to clean steel." },
      { question: "Is mill scale removal required before galvanizing?", answer: "Yes. Galvanizers require clean steel free of mill scale and rust for the zinc to bond correctly. Shot blasting to SA2.5 or SA3 is the standard pre-treatment for galvanizing." }
    ]
  },
  "paint-stripping": {
    id: "paint-stripping",
    title: "Paint Stripping",
    description: "Industrial paint stripping by shot blasting for structural steel, plant, machinery, and fabrications. We remove all paint layers including lead-based paints, epoxy coatings, and intumescent systems to achieve clean bare metal.",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
    benefits: ["Removes all paint types including lead-based, epoxy, and intumescent coatings", "Achieves SA2.5 or SA3 cleanliness standard", "More effective than chemical stripping for complex geometries", "Creates correct surface profile for new coating system", "Mobile service — we come to your site"],
    process: [
      { step: 1, title: "Assessment", description: "We identify the existing coating system, check for lead-based paints, and agree the required cleanliness standard and blast media." },
      { step: 2, title: "Containment", description: "Appropriate containment is set up to capture blast media and paint debris, particularly important for lead-based paint removal." },
      { step: 3, title: "Shot Blasting", description: "All paint layers are removed by shot blasting, achieving clean bare metal to the agreed standard." },
      { step: 4, title: "Inspection", description: "Surface cleanliness and profile are verified before new coating application." },
      { step: 5, title: "Waste Disposal", description: "Blast media and paint debris are collected and disposed of in accordance with waste regulations, including special waste procedures for lead-based paints." }
    ],
    applications: ["Structural steelwork refurbishment", "Plant and machinery repainting", "Fire escape and staircase restoration", "Bridge steelwork", "Commercial vehicles", "Industrial equipment"],
    faqs: [
      { question: "Can you remove lead-based paint?", answer: "Yes. We have experience removing lead-based paints and follow appropriate containment and disposal procedures. We can provide method statements and risk assessments for lead paint removal projects." },
      { question: "Is shot blasting better than chemical paint stripping?", answer: "For most industrial applications, shot blasting is faster, more effective, and creates the correct surface profile for new coatings in a single operation. Chemical stripping may be preferred for very thin sections or complex components where blast damage is a concern." }
    ]
  },
  "coating-removal": {
    id: "coating-removal",
    title: "Coating Removal",
    description: "Specialist coating removal by shot blasting for industrial and commercial structures. We remove epoxy coatings, plastisol, galvanizing, thermal spray coatings, and other surface treatments to prepare steel for refurbishment or re-coating.",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
    benefits: ["Removes epoxy, plastisol, galvanizing, thermal spray, and other coatings", "Achieves SA2.5 or SA3 cleanliness standard", "Prepares surfaces for re-coating or galvanizing", "More effective than mechanical or chemical removal for complex geometries", "Mobile service nationwide"],
    process: [
      { step: 1, title: "Coating Identification", description: "We identify the existing coating system and determine the appropriate blast media and pressure settings for effective removal." },
      { step: 2, title: "Preparation", description: "Components are positioned for full blast coverage. Areas not requiring treatment are masked as required." },
      { step: 3, title: "Shot Blasting", description: "All coating layers are removed by shot blasting, achieving clean bare metal to the agreed standard." },
      { step: 4, title: "Inspection", description: "Surface cleanliness and profile are verified before re-coating." },
      { step: 5, title: "Coating Coordination", description: "We coordinate with coating applicators to minimise the time between blasting and re-coating to prevent flash rusting." }
    ],
    applications: ["Factory cladding re-coating", "Structural steel refurbishment", "Plant and machinery", "Pipework and vessels", "Bridge steelwork", "Industrial equipment"],
    faqs: [
      { question: "Can you remove galvanizing?", answer: "Yes. Shot blasting can remove galvanized coatings from steel to prepare surfaces for re-galvanizing or alternative coating systems. The process creates the correct surface profile for the new coating." },
      { question: "Can you remove plastisol from cladding?", answer: "Yes. We regularly remove plastisol coatings from factory and warehouse cladding panels as part of refurbishment projects. Shot blasting removes the coating without damaging the underlying steel profile." },
      { question: "Is coating removal faster than manual stripping?", answer: "Shot blasting is significantly faster than manual methods like scraping or grinding. We can remove multiple coating layers in a fraction of the time, reducing project duration and labor costs substantially." },
      { question: "Will shot blasting damage the substrate?", answer: "No. Our experienced technicians use controlled pressure and appropriate blast media to remove coatings without damaging the underlying substrate. We can work on delicate surfaces when required." },
      { question: "What happens after coating removal?", answer: "After removal, surfaces are clean and ready for new coatings. We coordinate timing with your coating contractor to apply new finishes within 24-48 hours to prevent surface oxidation and flash rusting." }
    ]
  },
  "agricultural-shot-blasting": {
    id: "agricultural-shot-blasting",
    title: "Agricultural Shot Blasting",
    description: "Specialist shot blasting for agricultural machinery, farm equipment, and agricultural structures. We remove rust, old paint, and contamination from tractors, implements, grain stores, and steel farm buildings to prepare for protective coating.",
    heroImage: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80",
    benefits: ["Removes rust, old paint, and agricultural contamination", "Extends the service life of expensive agricultural machinery", "Prepares surfaces for protective coating to withstand harsh agricultural environments", "Mobile service — we come to your farm or agricultural site", "Suitable for tractors, implements, grain stores, and steel buildings"],
    process: [
      { step: 1, title: "Assessment", description: "We assess the machinery or structure, identify corrosion levels, and agree the required cleanliness standard and coating specification." },
      { step: 2, title: "Preparation", description: "Machinery is prepared for blasting. Sensitive components such as bearings, seals, and hydraulics are protected before blasting begins." },
      { step: 3, title: "Shot Blasting", description: "All surfaces are blasted to remove rust, old paint, and contamination, achieving clean bare metal to the agreed standard." },
      { step: 4, title: "Inspection", description: "Surface cleanliness and profile are verified before coating application." },
      { step: 5, title: "Coating Coordination", description: "We coordinate primer or coating application to protect the blasted surfaces before the machinery returns to service." }
    ],
    applications: ["Tractors and agricultural vehicles", "Farm implements and attachments", "Grain stores and hoppers", "Steel farm buildings and structures", "Irrigation equipment", "Livestock handling equipment"],
    faqs: [
      { question: "Can you blast tractors and farm machinery on-site?", answer: "Yes. Our mobile units come directly to your farm or agricultural site. We can blast tractors, implements, and other machinery on-site, minimising downtime and transport costs." },
      { question: "What coating is recommended after blasting agricultural equipment?", answer: "For agricultural machinery, we recommend a zinc-rich primer followed by a two-pack epoxy or polyurethane topcoat for maximum durability in the harsh agricultural environment. We can advise on the most suitable coating system for your specific equipment." },
      { question: "How do you protect engines and mechanical components during blasting?", answer: "We carefully mask or protect engines, hydraulic systems, electrical components, and other sensitive areas. Our technicians ensure these components remain protected and functional after the blasting process." },
      { question: "What's the best time to have agricultural equipment blasted?", answer: "Off-season is ideal to minimize disruption to your operations. We can schedule work around your farming calendar to ensure equipment is ready when you need it for the next season." },
      { question: "Can blasting extend the life of agricultural equipment?", answer: "Yes, removing rust and applying protective coatings can significantly extend equipment life. Regular maintenance blasting can prevent corrosion and costly repairs, protecting your investment." }
    ]
  }
};
// Per-service proof data: standards, surface criteria, industries, decision note
const SERVICE_PROOF_DATA: Record<string, {
  standards: string[];
  surfaceBefore: string;
  surfaceAfter: string;
  industries: string[];
  decisionNote: string;
}> = {
  "structural-steel-frames": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5 (Near White Metal)", "Sa 3 (White Metal) where specified", "BS EN ISO 8503-2 (surface profile)"],
    surfaceBefore: "Mill scale, rust grade A–D, old primer, weld spatter, oil contamination",
    surfaceAfter: "Sa 2.5 or Sa 3 cleanliness; 40–75 µm anchor profile for coating adhesion",
    industries: ["Structural steel fabricators", "Main contractors", "Steelwork erectors", "Building developers"],
    decisionNote: "Shot blasting is required before hot-dip galvanising and before intumescent fire protection coatings. Wire brushing or power tool cleaning cannot achieve the anchor profile needed for long-term coating adhesion on structural steelwork.",
  },
  "steel-containers": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5 minimum", "SSPC-SP 10 (Near White Blast)"],
    surfaceBefore: "Heavy rust (grade C–D), old paint, contamination, scale",
    surfaceAfter: "Sa 2.5 cleanliness; uniform anchor profile for epoxy or polyurethane topcoat",
    industries: ["Shipping and logistics", "Storage and warehousing", "Food and agriculture", "Oil and gas"],
    decisionNote: "Containers with grade C or D rust require abrasive blasting — chemical treatments and hand tools cannot remove deep pitting corrosion. Shot blasting is the only method that achieves the profile needed for a 10+ year coating lifespan.",
  },
  "factory-cladding": {
    standards: ["Project specification", "Coating product guidance", "Agreed access and containment plan"],
    surfaceBefore: "Failed plastisol, multiple paint layers, surface rust, chalking coatings",
    surfaceAfter: "Prepared cladding areas ready for the agreed next coating stage",
    industries: ["Industrial property owners", "Facilities managers", "Roofing and cladding contractors"],
    decisionNote: "A cladding job starts with the actual panel condition, safe access, surrounding operations and the coating stage that follows. Bring those details to the survey so the preparation scope can be planned properly.",
  },
  "fire-escapes": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5", "BS EN ISO 12944 (C3 exterior corrosivity)"],
    surfaceBefore: "Surface rust, flaking paint, mill scale, corrosion at welds and fixings",
    surfaceAfter: "Sa 2.5 clean metal; 40–70 µm profile for zinc-rich primer adhesion",
    industries: ["Building owners and managers", "Housing associations", "Commercial property", "Local authorities"],
    decisionNote: "Fire escapes are a life-safety asset. Corrosion that compromises structural integrity is a legal liability. Shot blasting removes all corrosion products and provides the profile needed for a long-life zinc-rich primer system.",
  },
  "staircases": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5", "BS EN ISO 12944"],
    surfaceBefore: "Rust, old paint, mill scale, contamination at welds",
    surfaceAfter: "Sa 2.5 clean metal; uniform profile for primer and topcoat",
    industries: ["Steel fabricators", "Fit-out contractors", "Building developers", "Facilities managers"],
    decisionNote: "For new-build staircases, shot blasting before primer application is the most cost-effective way to ensure the coating system meets BS EN ISO 12944 C3 or C4 durability requirements.",
  },
  "bridge-steelwork": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5 or Sa 3", "Network Rail NR/SP/CIV/017", "Highways England standards"],
    surfaceBefore: "Heavy corrosion, failed paint, mill scale, weld spatter, contamination",
    surfaceAfter: "Sa 2.5 or Sa 3 cleanliness; 50–100 µm profile for high-build epoxy systems",
    industries: ["Civil engineering contractors", "Network Rail supply chain", "Local authority highways", "Structural engineers"],
    decisionNote: "Bridge steelwork is exposed to C4–C5 corrosivity environments. Only abrasive blasting to Sa 2.5 or Sa 3 achieves the cleanliness and profile needed for high-build epoxy and zinc-rich primer systems with 15–25 year maintenance intervals.",
  },
  "ladders": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5", "BS EN ISO 12944 C3"],
    surfaceBefore: "Surface rust, old paint, mill scale",
    surfaceAfter: "Sa 2.5 clean metal; 40–60 µm profile",
    industries: ["Industrial facilities", "Utilities", "Telecoms", "Building owners"],
    decisionNote: "Ladders and access equipment in industrial environments require a robust primer system. Shot blasting is the only preparation method that guarantees the adhesion needed for a 10-year coating life in C3 environments.",
  },
  "warehouse-racking": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5", "BS EN ISO 12944 C2–C3"],
    surfaceBefore: "Rust, old powder coat, mill scale, impact damage",
    surfaceAfter: "Sa 2.5 clean metal; uniform profile for powder coat adhesion",
    industries: ["Logistics and distribution", "Retail", "Manufacturing", "Cold storage"],
    decisionNote: "Racking with failed powder coat or surface rust cannot be safely recoated without abrasive preparation. Shot blasting removes all contamination and provides the profile needed for a new powder coat or liquid coating system.",
  },
  "pipework": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5 or Sa 3", "NACE SP0169 (external corrosion)", "BS EN 10290"],
    surfaceBefore: "Mill scale, rust, old coatings, weld seam contamination",
    surfaceAfter: "Sa 2.5 or Sa 3 cleanliness; 50–75 µm profile for fusion-bonded epoxy or polyurethane",
    industries: ["Oil and gas", "Water utilities", "Chemical processing", "District heating"],
    decisionNote: "External pipe corrosion is the leading cause of pipeline failure. Shot blasting to Sa 2.5 or Sa 3 before fusion-bonded epoxy or polyurethane coating is the industry standard for pipelines in buried and immersed environments.",
  },
  "telecom-towers": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5", "BS EN ISO 12944 C4–C5"],
    surfaceBefore: "Heavy corrosion, failed galvanising, old paint, weld spatter",
    surfaceAfter: "Sa 2.5 clean metal; 50–80 µm profile for high-build zinc-rich primer",
    industries: ["Telecoms operators", "Tower owners", "Infrastructure contractors"],
    decisionNote: "Telecom towers in exposed locations are subject to C4–C5 corrosivity. Shot blasting is required to remove failed galvanising and prepare the substrate for a new high-build zinc-rich primer system with a 20-year design life.",
  },
  "floor-preparation": {
    standards: ["Project flooring or coating specification", "Manufacturer guidance where supplied", "Agreed preparation and handover requirements"],
    surfaceBefore: "Laitance, old coatings, oil contamination, smooth concrete, failed paint",
    surfaceAfter: "Preparation condition agreed with the flooring or coating specification and project team",
    industries: ["Food and beverage", "Pharmaceutical", "Automotive", "Warehousing and logistics"],
    decisionNote: "Commercial floor preparation needs to be planned around the existing slab, coatings or contamination, access, nearby operations and the flooring or coating system that follows. The project specification determines the required handover condition.",
  },
  "powder-coating": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5", "BS EN 13438 (powder coating on steel)"],
    surfaceBefore: "Mill scale, rust, old coatings, oil, weld spatter",
    surfaceAfter: "Sa 2.5 clean metal; 40–60 µm profile for powder coat adhesion",
    industries: ["Metal fabricators", "Architectural metalwork", "Automotive components", "Garden and street furniture"],
    decisionNote: "Powder coat adhesion failures are almost always caused by inadequate substrate preparation. Shot blasting to Sa 2.5 before powder coating is the industry standard for components requiring a 10+ year coating life.",
  },
  "commercial-radiators": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5", "BS EN ISO 12944 C2"],
    surfaceBefore: "Rust, old paint, scale, corrosion at welds",
    surfaceAfter: "Sa 2.5 clean metal; 40–60 µm profile for primer and topcoat",
    industries: ["Building services contractors", "Facilities managers", "Social housing", "Commercial property"],
    decisionNote: "Radiators with surface rust or failed paint cannot be recoated without abrasive preparation. Shot blasting removes all corrosion products and provides the profile needed for a long-life primer and topcoat system.",
  },
  "commercial-vehicles": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5", "BS EN ISO 12944 C3"],
    surfaceBefore: "Rust, old paint, underseal, road salt contamination",
    surfaceAfter: "Sa 2.5 clean metal; 40–70 µm profile for zinc-rich primer",
    industries: ["Fleet operators", "Haulage and logistics", "Agricultural contractors", "Plant hire"],
    decisionNote: "Vehicle chassis corrosion is accelerated by road salt and moisture. Shot blasting to Sa 2.5 removes all corrosion products and provides the profile needed for a zinc-rich primer system that resists further corrosion for 5–10 years.",
  },
  "steel-doors": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5", "BS EN ISO 12944 C3"],
    surfaceBefore: "Rust, old paint, mill scale, weld spatter",
    surfaceAfter: "Sa 2.5 clean metal; 40–60 µm profile for primer and topcoat",
    industries: ["Industrial property", "Logistics", "Retail", "Building owners"],
    decisionNote: "Steel doors and roller shutters in industrial environments are subject to C3 corrosivity. Shot blasting before repainting is the only preparation method that guarantees adhesion and a 10-year coating life.",
  },
  "steel-sheeting": {
    standards: ["BS EN ISO 8501-1", "Sa 2", "BS EN ISO 12944 C3–C4"],
    surfaceBefore: "Failed plastisol, rust, old paint, chalking coatings",
    surfaceAfter: "Sa 2 clean metal; uniform profile for direct-to-metal primer",
    industries: ["Roofing contractors", "Industrial property owners", "Agricultural buildings"],
    decisionNote: "Profiled steel sheeting with failed coatings can be restored by shot blasting and recoating at a fraction of the cost of replacement. The process removes all failed coating and rust without damaging the substrate profile.",
  },
  "steel-gates": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5", "BS EN ISO 12944 C3"],
    surfaceBefore: "Rust, old paint, mill scale, weld spatter",
    surfaceAfter: "Sa 2.5 clean metal; 40–60 µm profile for zinc-rich primer or powder coat",
    industries: ["Agricultural", "Industrial", "Commercial property", "Local authorities"],
    decisionNote: "Gates and railings in outdoor environments require a robust primer system. Shot blasting to Sa 2.5 is the only preparation method that guarantees the adhesion needed for a 10-year coating life in C3 environments.",
  },
  "plant-machinery": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5", "BS EN ISO 12944 C3"],
    surfaceBefore: "Heavy rust, old paint, grease, hydraulic fluid contamination",
    surfaceAfter: "Sa 2.5 clean metal; 40–70 µm profile for primer and topcoat",
    industries: ["Plant hire", "Agricultural contractors", "Mining and quarrying", "Construction"],
    decisionNote: "Plant and machinery in outdoor environments accumulate heavy corrosion and contamination. Shot blasting is the only preparation method that removes all corrosion products and contamination to achieve the profile needed for a long-life coating system.",
  },
  "intumescent-painting": {
    standards: ["BS EN ISO 8501-1 Sa 2.5", "BS EN 13381-8 (fire protection)", "BS 476 Part 20–22", "ASFP guidance"],
    surfaceBefore: "Mill scale, rust, weld spatter — all must be removed before intumescent application",
    surfaceAfter: "Sa 2.5 clean metal; 40–75 µm profile for intumescent primer adhesion",
    industries: ["Structural steel fabricators", "Main contractors", "Fire protection engineers", "Building control"],
    decisionNote: "Intumescent coatings require Sa 2.5 surface preparation as a minimum. Any mill scale or rust beneath the intumescent layer will cause delamination during a fire event, rendering the fire protection ineffective. Shot blasting is mandatory before intumescent application on structural steelwork.",
  },
  "marine-shot-blasting": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5 or Sa 3", "NACE No. 2 / SSPC-SP 10", "IMO PSPC (ballast tanks)"],
    surfaceBefore: "Heavy marine corrosion, biofouling, old antifouling, mill scale",
    surfaceAfter: "Sa 2.5 or Sa 3 cleanliness; 60–100 µm profile for epoxy or antifouling systems",
    industries: ["Shipyards", "Offshore operators", "Port authorities", "Marine engineers"],
    decisionNote: "Marine environments are the most corrosive (C5-M). Only abrasive blasting to Sa 2.5 or Sa 3 achieves the cleanliness and profile needed for high-build epoxy and antifouling systems with 5–10 year dry-dock intervals.",
  },
  "rust-removal": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5 minimum", "Rust grades A–D (ISO 8501-1)"],
    surfaceBefore: "Rust grades B, C, or D — surface rust to deep pitting corrosion",
    surfaceAfter: "Sa 2.5 clean metal; all rust products removed; anchor profile for coating",
    industries: ["Steel fabricators", "Building owners", "Infrastructure", "Plant and equipment"],
    decisionNote: "Wire brushing and needle guns can only achieve St 2 or St 3 cleanliness — insufficient for long-life coatings. Shot blasting to Sa 2.5 removes all rust products including sub-surface corrosion that hand tools cannot reach.",
  },
  "mill-scale-removal": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5 (mill scale must be fully removed)", "BS EN ISO 8503-2"],
    surfaceBefore: "Mill scale (rust grade A) — intact or partially intact scale on hot-rolled steel",
    surfaceAfter: "Sa 2.5 or Sa 3 — all mill scale removed; 40–75 µm anchor profile",
    industries: ["Steel fabricators", "Structural steel", "Pipework", "Pressure vessels"],
    decisionNote: "Mill scale is cathodic to steel — it accelerates corrosion of the underlying metal once it breaks down. Shot blasting is the only reliable method to remove intact mill scale and achieve the Sa 2.5 standard required before primer application.",
  },
  "paint-stripping": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5", "BS EN ISO 12944"],
    surfaceBefore: "Multiple paint layers, failed coatings, lead paint (with appropriate controls), bitumen",
    surfaceAfter: "Sa 2.5 clean metal; all old coatings removed; uniform anchor profile",
    industries: ["Building owners", "Infrastructure", "Industrial plant", "Heritage and restoration"],
    decisionNote: "Chemical stripping is slow, produces hazardous waste, and cannot achieve the anchor profile needed for new coatings. Shot blasting removes all old coatings in a single pass and simultaneously prepares the surface for recoating.",
  },
  "coating-removal": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5", "SSPC-SP 10"],
    surfaceBefore: "Failed epoxy, polyurethane, bitumen, zinc-rich primer, thermal spray coatings",
    surfaceAfter: "Sa 2.5 clean metal; all old coatings removed; uniform anchor profile",
    industries: ["Oil and gas", "Water utilities", "Infrastructure", "Industrial plant"],
    decisionNote: "Hard coatings such as epoxy and thermal spray zinc cannot be removed by chemical stripping or hand tools. Shot blasting is the only method that reliably removes these coatings without damaging the substrate.",
  },
  "agricultural-shot-blasting": {
    standards: ["BS EN ISO 8501-1", "Sa 2.5", "BS EN ISO 12944 C3–C4"],
    surfaceBefore: "Heavy rust, old paint, soil contamination, hydraulic fluid, agricultural chemical residues",
    surfaceAfter: "Sa 2.5 clean metal; 40–70 µm profile for primer and topcoat",
    industries: ["Arable and livestock farmers", "Agricultural contractors", "Farm machinery dealers"],
    decisionNote: "Agricultural machinery is subject to C3–C4 corrosivity from soil, fertilisers, and moisture. Shot blasting to Sa 2.5 removes all corrosion products and contamination, providing the profile needed for a 5–10 year coating life.",
  },
};

/**
 * Generate SSR body HTML for service pages so crawlers see full content
 */
function generateServiceBodyHTML(serviceId: string): string {
  const escHtml = (s: string) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

  const serviceData: Record<string, {
    title: string; tagline: string; description: string;
    steps: Array<{title: string; description: string}>;
    applications: string[];
    faqs: Array<{q: string; a: string}>;
  }> = {
    "marine-cx-surface-preparation": {
      title: "Marine CX Surface Preparation for Commercial Steelwork",
      tagline: "Large-scale commercial blasting for steelwork and enclosures entering a Marine CX coating package",
      description: "CX identifies an extreme atmospheric corrosivity environment. Marine CX protection starts with the steel, not simply a thicker coat of paint: the project coating specification sets the coating system, coat sequence, total dry-film build, controlled anchor profile and handover requirements.",
      steps: [
        { title: "Review the coating requirements", description: "We review the available coating specification, product data, asset details, access and the next stage of the programme with the project team." },
        { title: "Plan the working area", description: "Access, containment, protection of adjacent work, handling and the blasting-to-coating sequence are planned around the commercial package." },
        { title: "Prepare the steel to the agreed requirement", description: "Abrasive blasting removes corrosion and contamination and creates the controlled microscopic anchor profile required for the primer to grip." },
        { title: "Check and hand over", description: "The agreed preparation checks and records are completed before the steel moves into the next coating stage." }
      ],
      applications: ["Large commercial enclosures", "Fabricated steelwork entering a specified CX coating package", "Marine, waterside and high-salinity site assets", "Commercial refurbishments and new-build coating packages"],
      faqs: [
        { q: "Why is Marine CX preparation important?", a: "CX is used for an extreme corrosive environment. The specified coating system, preparation and handover controls are selected for that environment and the asset maintenance plan." },
        { q: "Does Marine CX mean applying really thick paint?", a: "No. A coating package may have several layers and a defined total dry-film build, but the exact system and measurements are set by the project coating specification and current product data." },
        { q: "Should the steel be smooth before primer?", a: "No. The steel is not polished smooth. The specification sets the required cleanliness and controlled anchor profile so the primer can adhere correctly." }
      ],
    },
    "steel-chimney-surface-preparation": {
      title: "Steel Chimneys, Process Stacks & Flues",
      tagline: "Surface Preparation for Fabricated Steel Chimneys, Stacks & Flues",
      description: "Commercial Shot Blasting prepares accessible fabricated steel chimneys, process stacks, flues, duct sections, flanges, access openings, and associated steelwork. We review drawings, access, handling, inspection points, and coating requirements before work is scheduled.",
      steps: [
        { title: "Scope & Drawing Review", description: "We review available drawings, dimensions, condition images, access constraints, and coating requirements to define the scope." },
        { title: "Access, Handling & Protection", description: "The assembly is assessed for safe positioning, lifting, internal access, containment, and practical inspection access." },
        { title: "Controlled Surface Preparation", description: "Accessible fabricated steelwork is prepared using a sequence suitable for the workpiece, working environment, and specified protection requirements." },
        { title: "Inspection & Handover", description: "Prepared surfaces are reviewed against the agreed project requirements before the coating, transport, or installation sequence." }
      ],
      applications: ["Fabricated steel chimney sections", "Industrial process stacks and flues", "Cylindrical duct and transition sections", "Stack flanges and access openings", "Stiffeners, support lugs, and attachments"],
      faqs: [
        { q: "What steel-chimney surfaces can you prepare?", a: "Accessible external shells, flanges, access-door frames, stiffeners, attachments, and internal surfaces can be included when confirmed by drawings, access arrangements, and the project specification." },
        { q: "Can internal chimney or stack surfaces be included?", a: "Where access and project controls allow, internal surfaces can be included. Ventilation, lighting, debris recovery, inspection, and specification requirements are agreed during planning." },
        { q: "What preparation standard will the chimney achieve?", a: "The required surface condition, profile, contamination limits, and records should be set by the project specification, responsible engineer, or coating manufacturer." }
      ]
    },
    "structural-steel-frames": {
      title: "Structural Steel Frames",
      tagline: "Comprehensive Shot Blasting for Structural Steelwork",
      description: "Our structural steel frame shot blasting service delivers exceptional surface preparation for all types of building frames, roof trusses, and load-bearing...",
      steps: [
        { title: "Structural Assessment", description: "We inspect the steel frame components to determine appropriate blast media, pressure settings, and surface preparation r" },
        { title: "Component Preparation", description: "Frame sections are positioned for optimal blast coverage. Critical areas such as bolt holes and connection points are pr" },
        { title: "Shot Blasting", description: "Using appropriate blast media, we systematically clean all frame surfaces to achieve professional cleanliness for your c" },
        { title: "Quality Inspection", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications." },
      ],
      applications: ["Building frame structures", "Roof trusses and purlins", "Portal frame components", "Mezzanine floor structures", "Industrial building frames", "Warehouse structural steelwork"],
      faqs: [
        { q: "Can you blast structural steel frames on-site?", a: "Yes, we provide mobile shot blasting services and can work at your premises. For components requiring galvanizing, we ensure complete coverage and professional cleanliness for protective treatments. We coordinate timing " },
        { q: "How long does the process take?", a: "Timeline depends on the size and complexity of the frame structure. A typical portal frame bay can be processed in 2-3 days. We can provide a detailed timeline after assessing your specific requirements." },
      ],
    },
    "steel-containers": {
      title: "Steel Container Blasting",
      tagline: "Specialist Shot Blasting for Steel Containers & Storage Structures",
      description: "We are specialists in shot blasting services for steel containers and large storage structures. Our skilled team uses advanced blasting techniques to remove...",
      steps: [
        { title: "Preparation & Containment", description: "We begin with inspection and masking, then protect surrounding areas with sheeting and seals to control dust and debris." },
        { title: "Precision Shot Blasting", description: "Using the correct media and pressure for the substrate, we remove corrosion and old coatings without compromising the st" },
        { title: "Final Clean Down", description: "On completion, we carry out a meticulous clean-up: collecting residues and waste, leaving the area ready for repainting " },
      ],
      applications: ["Shipping Containers", "Storage Tanks", "Refrigerated Containers", "Grain Silos", "Bulk Waste & Recycling Containers", "Fuel Storage Cylinders"],
      faqs: [
        { q: "What types of steel containers can you blast?", a: "We can blast all types of steel containers including shipping containers, storage tanks, refrigerated units, grain silos, fuel storage cylinders, water tanks, and more. Our techniques are suitable for both standard and s" },
        { q: "Can you blast containers on-site?", a: "Yes, we can provide on-site shot blasting services for large containers and storage structures that cannot be easily transported. We implement comprehensive containment systems to control dust and debris." },
      ],
    },
    "factory-cladding": {
      title: "Factory & Warehouse Cladding",
      tagline: "Practical Preparation for Commercial Cladding Recoating",
      description: "We plan cladding preparation around the building condition, access, operations and the coating stage that follows.",
      steps: [
        { title: "Talk through the building", description: "We start with the cladding condition, access, operations and the coating stage that follows." },
        { title: "Agree access and protection", description: "The work area, containment and protection measures are planned for the actual building and site activity." },
        { title: "Prepare the agreed areas", description: "We use the agreed approach to remove failed coatings and corrosion from the cladding areas in scope." },
        { title: "Check the handover", description: "We review the prepared areas against the agreed scope before the next project stage." },
      ],
      applications: ["Factory wall cladding", "Warehouse exterior panels", "Industrial building facades", "Commercial property cladding", "Agricultural building cladding", "Storage facility exteriors"],
      faqs: [
        { q: "Can you blast cladding in place?", a: "We can review cladding in place as part of the survey. The right approach depends on the panel condition, access, surrounding activity, containment requirements and the coating work that follows." },
        { q: "Will shot blasting damage thin cladding panels?", a: "Thin cladding needs a project-specific assessment. We look at the panel condition, profile, fixing details and the required coating handover before agreeing whether blasting is the right preparation method." },
        { q: "How long before cladding needs recoating after blasting?", a: "The coating specification, product guidance and conditions on the day determine the handover timing. Bring the coating information to the planning conversation so the preparation and recoating stages can be lined up properly." },
      ],
    },
    "fire-escapes": {
      title: "Fire Escapes & External Stair Towers",
      tagline: "Specialist Shot Blasting for Fire Safety Infrastructure",
      description: "Our fire escape and external stair tower shot blasting service provides comprehensive surface preparation for emergency egress systems. We remove rust, old...",
      steps: [
        { title: "Safety Assessment", description: "We inspect the fire escape structure to assess condition, identify structural concerns, and determine appropriate blast " },
        { title: "Access Planning", description: "We coordinate access arrangements and safety measures for working at height, ensuring health and safety practices." },
        { title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all fire escape surfaces including stairs, " },
        { title: "Quality Verification", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications for coat" },
      ],
      applications: ["External fire escape stairs", "Fire escape towers", "Emergency egress systems", "External stair structures", "Fire escape landings and platforms", "Fire escape handrails and balustrades"],
      faqs: [
        { q: "Can you work on fire escapes while the building is occupied?", a: "Yes, we can coordinate work schedules to minimize disruption and maintain emergency egress routes. We work with building management to ensure alternative fire escape routes are available during refurbishment work." },
        { q: "Do you provide structural assessment after blasting?", a: "We can coordinate with structural engineers to provide certification as required. Our shot blasting process reveals the true condition of the steel, allowing for accurate structural assessment." },
        { q: "What coatings do you recommend for fire escapes?", a: "We typically recommend intumescent fire-resistant coatings or hot-dip galvanizing for maximum corrosion protection and fire safety compliance. We can advise on the most appropriate system for your specific requirements." },
      ],
    },
    "staircases": {
      title: "Internal Steel Staircases, Balustrades & Handrails",
      tagline: "Precision Shot Blasting for Architectural Metalwork",
      description: "Our internal steel staircase and balustrade shot blasting service provides meticulous surface preparation for architectural metalwork. We remove rust, old...",
      steps: [
        { title: "Component Assessment", description: "We inspect the metalwork to assess condition, identify any delicate features, and determine appropriate blast media and " },
        { title: "Preparation & Masking", description: "Components are prepared for blasting. Threaded connections, bearing surfaces, and delicate features are masked or protec" },
        { title: "Precision Blasting", description: "Using fine-grade blast media and controlled pressure, we carefully clean all surfaces while preserving fine details and " },
        { title: "Quality Inspection", description: "We conduct detailed inspections to ensure all surfaces meet the required cleanliness and profile specifications for your" },
      ],
      applications: ["Internal steel staircases", "Balustrades and handrails", "Decorative metalwork", "Architectural steel features", "Heritage staircase restoration", "Commercial building staircases"],
      faqs: [
        { q: "Can you blast staircases without damaging decorative details?", a: "Yes, we use fine-grade blast media and carefully controlled pressure settings to clean surfaces while preserving fine details, threads, and dimensional tolerances. Our technicians are experienced in handling delicate arc" },
        { q: "Do you remove staircases for blasting or work on-site?", a: "Yes, we provide mobile shot blasting services and work at your premises. We can blast fire escapes in situ or coordinate with you if components need to be removed for access. Our mobile units are equipped for complete co" },
        { q: "What finishes can be applied after blasting?", a: "After shot blasting, staircases and balustrades can be powder coated, wet painted, galvanized, or left with a clear protective coating. We can coordinate finishing services or provide components ready for your chosen fin" },
      ],
    },
    "bridge-steelwork": {
      title: "Bridge Steelwork (Girders, Crossmembers, Parapet Rails)",
      tagline: "Specialist Shot Blasting for Bridge Infrastructure",
      description: "Our bridge steelwork shot blasting service provides comprehensive surface preparation for all types of bridge components including girders, crossmembers,...",
      steps: [
        { title: "Structural Survey", description: "We conduct a detailed survey of the bridge steelwork to assess condition, identify structural concerns, and determine ap" },
        { title: "Access & Safety Planning", description: "We coordinate access arrangements, traffic management, and safety measures for working on bridge structures, ensuring hi" },
        { title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all bridge steelwork surfaces to achieve pr" },
        { title: "Quality Verification", description: "We conduct thorough inspections and, where required, perform surface cleanliness testing to verify compliance with bridg" },
      ],
      applications: ["Bridge girders and beams", "Bridge crossmembers and bracing", "Parapet rails and barriers", "Bridge support structures", "Footbridge steelwork", "Railway bridge components"],
      faqs: [
        { q: "Can you work on bridges while they remain open to traffic?", a: "Yes, we can coordinate work schedules with highway authorities to minimize disruption. We typically work during night-time closures or use lane closures with traffic management systems." },
        { q: "What surface preparation standards do you achieve for bridge work?", a: "We routinely achieve professional cleanliness and SA 3 surface preparation to industry standards, which are required for highway and railway bridge coating systems. We can provide certification as required by highway aut" },
        { q: "Do you handle environmental containment for bridge blasting?", a: "Yes, we implement comprehensive containment systems to capture spent blast media and debris, preventing environmental contamination of waterways or surrounding areas. We comply with all waste management practices." },
      ],
    },
    "ladders": {
      title: "Fixed Ladders & Step-Over Platforms",
      tagline: "Specialist Shot Blasting for Access Infrastructure",
      description: "Our fixed ladder and step-over platform shot blasting service provides comprehensive surface preparation for industrial access systems. We remove rust, old...",
      steps: [
        { title: "Safety Assessment", description: "We inspect the access system to assess condition, identify structural concerns, and determine appropriate blast media an" },
        { title: "Component Preparation", description: "Ladder sections, platforms, and safety cages are prepared for blasting. Critical connection points and safety features a" },
        { title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all access system surfaces including rungs," },
        { title: "Quality Verification", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications for coat" },
      ],
      applications: ["Fixed vertical ladders", "Caged ladder systems", "Step-over platforms", "Industrial access ladders", "Roof access systems", "Tank access ladders"],
      faqs: [
        { q: "Can you blast fixed ladders in situ?", a: "Yes, we provide mobile shot blasting services at your location. For ladders requiring galvanizing, we ensure complete coverage and cleanliness. We can work with ladders in situ or coordinate if sections need removal for " },
        { q: "What protective coatings do you recommend for access systems?", a: "We typically recommend hot-dip galvanizing for maximum corrosion protection and durability, especially for outdoor or harsh environment applications. For indoor systems, powder coating or high-performance paint systems m" },
      ],
    },
    "warehouse-racking": {
      title: "Warehouse Racking & Pallet Rack Frames",
      tagline: "Professional Shot Blasting for Storage Infrastructure",
      description: "Our specialist warehouse racking shot blasting service provides comprehensive surface preparation for pallet racking systems, storage frames, and industrial...",
      steps: [
        { title: "Assessment", description: "We inspect the racking components to determine the appropriate blast media, pressure settings, and surface preparation r" },
        { title: "Disassembly & Preparation", description: "If required, we can coordinate the disassembly of racking components at your premises to ensure optimal access for mobil" },
        { title: "Shot Blasting", description: "Our skilled technicians systematically blast all racking surfaces, removing rust, old coatings, and contaminants to achi" },
        { title: "Quality Inspection", description: "We conduct thorough quality checks to ensure all surfaces meet the required profile and cleanliness specifications for c" },
      ],
      applications: ["Pallet racking uprights and beams", "Cantilever racking systems", "Drive-in and drive-through racking", "Mezzanine floor support structures", "Industrial shelving units", "Warehouse storage frames"],
      faqs: [
        { q: "Can you blast racking on-site or does it need to be removed?", a: "Yes, we provide mobile shot blasting services at your warehouse location. We can blast racking in situ or coordinate disassembly if needed for optimal access. Our mobile units ensure complete coverage and proper containm" },
        { q: "How long does the warehouse racking blasting process take?", a: "Timeline depends on the quantity and condition of components. A typical pallet racking bay (2 uprights and 4 beams) can be processed in 1-2 days. We can provide a detailed timeline after assessing your specific requireme" },
        { q: "Will shot blasting damage the structural integrity of the racking?", a: "No, when performed correctly by trained professionals, shot blasting actually reveals the true condition of the metal and prepares it for protective coatings that enhance longevity. We use appropriate blast media and pre" },
        { q: "Can you coordinate powder coating after blasting?", a: "Yes, we work with trusted powder coating partners and can arrange complete refurbishment services including blasting, coating, and reinstallation of your warehouse racking systems." },
      ],
    },
    "pipework": {
      title: "Process Pipework, Spools & Manifolds",
      tagline: "Precision Cleaning for Industrial Pipework Systems",
      description: "Our specialized pipework shot blasting service delivers exceptional surface preparation for industrial process pipework, spools, manifolds, and piping...",
      steps: [
        { title: "Specification Review", description: "We review your cleanliness requirements, material specifications, and industry standards to determine the appropriate bl" },
        { title: "Component Preparation", description: "Pipework components are inspected, masked if necessary, and positioned for optimal blast coverage while protecting threa" },
        { title: "Precision Blasting", description: "Using fine-grade blast media and controlled pressure, we systematically clean all pipework surfaces to achieve the speci" },
        { title: "Cleanliness Verification", description: "We conduct thorough inspections to ensure optimal surface cleanliness and preparation quality." },
      ],
      applications: ["Food processing pipework and spools", "Pharmaceutical process piping", "Chemical plant manifolds and headers", "Dairy industry stainless steel pipework", "Brewery and beverage processing pipes", "Hygienic process equipment"],
      faqs: [
        { q: "What cleanliness levels can you achieve for pipework?", a: "We achieve high cleanliness levels suitable for food-grade, pharmaceutical, and chemical applications, meeting specific industry requirements for each sector." },
        { q: "Can you blast stainless steel pipework without damaging it?", a: "Yes, we use appropriate blast media such as aluminum oxide or glass bead, combined with controlled pressure settings, to clean stainless steel without embedding contaminants or damaging the passive layer. We can also coo" },
        { q: "Do you provide certification for food-grade or pharmaceutical pipework?", a: "Yes, we can provide material certificates, process documentation, and cleanliness certification as required for regulated industries. We maintain full traceability and quality records for all processed components." },
        { q: "What size pipework can you accommodate?", a: "We can process pipework ranging from small bore (1/2 inch) up to large diameter pipes and manifolds. Our facility can accommodate spools up to 6 meters in length. Contact us to discuss your specific requirements." },
      ],
    },
    "telecom-towers": {
      title: "Telecom Masts & Lattice Towers",
      tagline: "Specialist Shot Blasting for Telecommunications Infrastructure",
      description: "Our specialist telecommunications tower shot blasting service provides comprehensive surface preparation for telecom masts, lattice towers, antenna...",
      steps: [
        { title: "Structural Assessment", description: "We inspect tower components to assess condition, determine appropriate blast media, and identify any structural concerns" },
        { title: "Component Preparation", description: "Tower sections, legs, bracing members, and mounting brackets are prepared for blasting. Critical areas such as bolt hole" },
        { title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all tower surfaces to achieve optimal clean" },
        { title: "Quality Verification", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications for galv" },
      ],
      applications: ["Telecommunications lattice towers", "Monopole mast sections", "Guyed tower components", "Antenna mounting brackets and platforms", "Tower leg sections and bracing members", "Microwave dish support structures"],
      faqs: [
        { q: "Can you blast telecommunications towers on-site?", a: "Yes, we provide mobile shot blasting services for telecom towers at your site. For components requiring galvanizing, we ensure professional cleanliness for hot-dip galvanizing. We coordinate timing with galvanizing sched" },
        { q: "How do you handle the logistics of tower dismantling and transport?", a: "We can coordinate with specialist tower erection companies to handle dismantling, transport, and reinstallation. Alternatively, if you have your own contractors, we can work with them to ensure smooth coordination of the" },
        { q: "Can you blast tower components that have been previously galvanized?", a: "Yes, we can remove old galvanizing, rust, and corrosion from previously galvanized components, preparing them for re-galvanizing. This is a common requirement for tower refurbishment projects where the original galvanizi" },
      ],
    },
    "floor-preparation": {
      title: "Commercial Floor Shot Blasting & Concrete Floor Preparation",
      tagline: "Concrete Floor Preparation for Commercial Sites",
      description: "Commercial floor shot blasting for concrete floors, warehouse slabs, car parks and industrial work areas. We assess the existing surface, access and the next flooring or coating stage.",
      steps: [
        { title: "Floor and site review", description: "We review floor condition, included areas, access, drains, edges, nearby operations and the next planned flooring or coating stage." },
        { title: "Working-area set-up", description: "The practical set-up, surrounding-area protection, containment requirements and live-site interfaces are agreed before work starts." },
        { title: "Floor shot blasting", description: "We carry out the agreed preparation work around the floor condition and the specified next stage." },
        { title: "Handover for the next stage", description: "The condition for the next trade, practical handover and any agreed cleaning or inspection requirements are discussed with the project team." },
      ],
      applications: ["Asphalt surface re-texturing", "Bridge laitance removal", "Car park decking preparation", "Cleaning and texturing old concrete", "Paint removal from concrete floors", "Epoxy coating removal"],
      faqs: [
        { q: "What types of floor coatings can be removed?", a: "Tell us what is on the floor now—such as paint, epoxy, tar, adhesive, laitance or contamination—along with photos and the next flooring stage. The practical approach depends on the substrate, condition, access and project specification." },
        { q: "How long does floor preparation take?", a: "The programme depends on the floor area, existing condition, access, working hours, containment, adjacent operations and the handover needed for the next stage. We review those factors before agreeing a project-specific plan." },
        { q: "Will shot blasting damage my concrete floor?", a: "The floor condition, substrate, previous coatings and the required finish need reviewing before a method is agreed. Share photographs and the flooring or coating specification so the preparation discussion is based on the actual slab and the next stage." },
      ],
    },
    "powder-coating": {
      title: "Shot Blasting & Powder Coating",
      tagline: "End-to-End Metal Surface Solutions",
      description: "Complete metal surface preparation and powder coating service for commercial and industrial applications. We combine high-pressure shot blasting with...",
      steps: [
        { title: "Meticulous Preparation", description: "We contain and protect your site, then use abrasive blasting to strip away old paint, rust, and contaminants, creating t" },
        { title: "High-Performance Coating", description: "Immediately after preparation, we apply premium powder coating that bonds firmly to the metal surface, preventing flash " },
        { title: "Curing Process", description: "The powder coating is professionally cured to create a tough, uniform finish that resists weathering, corrosion, and wea" },
        { title: "Hassle-Free Completion", description: "We handle cleanup and leave your premises tidy with a superior powder-coated finish ready for immediate use." },
      ],
      applications: ["Structural steel frame preparation", "Warehouse and factory cladding", "Machinery and equipment refurbishment", "Staircases, railings, and balustrades", "Storage tanks and fabrications", "Metal components for assembly"],
      faqs: [
        { q: "Why combine shot blasting with powder coating?", a: "Integrating both services eliminates the risk of flash rust between preparation and coating, ensures optimal surface profile for adhesion, and provides single-source accountability with faster turnaround." },
        { q: "What metals can be powder coated?", a: "We can powder coat most metals including steel, stainless steel, aluminum, and galvanized surfaces after proper shot blasting preparation." },
        { q: "How durable is powder coating?", a: "When applied over properly shot-blasted surfaces, powder coating provides exceptional durability, typically lasting 15-20 years outdoors and even longer in protected environments." },
      ],
    },
    "commercial-radiators": {
      title: "Commercial Radiators Shot Blasting",
      tagline: "Professional Restoration for Cast Iron & Steel Radiators",
      description: "Our commercial radiators shot blasting service provides comprehensive restoration for cast iron and steel radiators in commercial buildings, heritage...",
      steps: [
        { title: "Radiator Assessment", description: "We inspect each radiator to assess condition, identify material type (cast iron or steel), and determine appropriate bla" },
        { title: "Valve & Fitting Protection", description: "Threaded connections, valve seats, and critical fittings are masked or protected to preserve functionality during blasti" },
        { title: "Controlled Shot Blasting", description: "Using carefully selected media and pressure settings, we systematically remove all paint layers, rust, and corrosion fro" },
        { title: "Internal Cleaning", description: "For radiators requiring internal restoration, we can clean internal waterways to remove sludge and scale buildup." },
      ],
      applications: ["Victorian cast iron column radiators", "Commercial building heating systems", "Heritage property radiator restoration", "School and hospital radiators", "Industrial facility heating equipment", "Period property refurbishment projects"],
      faqs: [
        { q: "Can you blast cast iron radiators without damaging them?", a: "Yes, we use appropriate blast media and controlled pressure settings specifically for cast iron. Our technicians are experienced in preserving the integrity of cast iron while removing paint and rust. We protect threaded" },
        { q: "How many paint layers can you remove?", a: "We can remove virtually unlimited paint layers. Many heritage radiators have 10-20 layers of paint accumulated over a century. Our shot blasting process efficiently removes all layers while preserving the original cast i" },
        { q: "Do you offer powder coating after shot blasting?", a: "Yes, we work with specialist radiator coating partners and can arrange complete refurbishment services including blasting, powder coating in period-appropriate or modern colors, and pressure testing before reinstallation" },
        { q: "Can you restore radiators that are still installed?", a: "For best results, radiators should be removed from the property for workshop-based shot blasting. This ensures complete coverage, protects surrounding areas, and allows for thorough inspection and coating. We can coordin" },
      ],
    },
    "commercial-vehicles": {
      title: "Commercial & Agricultural Vehicle Shot Blasting",
      tagline: "Heavy-Duty Restoration for Farm & Warehouse Vehicles",
      description: "Our commercial and agricultural vehicle shot blasting service provides comprehensive restoration for heavy-duty trucks, farm machinery, warehouse vehicles,...",
      steps: [
        { title: "Vehicle Assessment", description: "Comprehensive inspection of vehicle condition, chassis integrity, and component identification to determine optimal blas" },
        { title: "Component Disassembly", description: "Removal of sensitive components, electrical systems, and mechanical parts that require protection during blasting." },
        { title: "Heavy-Duty Shot Blasting", description: "Systematic blasting of chassis, body panels, and wheels using industrial-grade media to remove all corrosion, paint, and" },
        { title: "Detailed Cleaning", description: "Thorough cleaning of hard-to-reach areas, joints, and structural members to ensure complete surface preparation." },
      ],
      applications: ["Farm trucks and agricultural vehicles", "Warehouse forklifts and material handlers", "Commercial delivery trucks", "Industrial transport vehicles", "Vintage commercial vehicle restoration", "Fleet vehicle refurbishment"],
      faqs: [
        { q: "Can you blast complete vehicle chassis?", a: "Yes, we specialize in complete chassis restoration for commercial and agricultural vehicles. Our facility can accommodate large farm trucks, warehouse vehicles, and industrial equipment. We systematically blast all chass" },
        { q: "Do you work on vintage commercial vehicles?", a: "Absolutely. We have extensive experience restoring vintage farm trucks, classic commercial vehicles, and heritage agricultural machinery. Our careful approach preserves original features while removing decades of corrosi" },
        { q: "How long does vehicle restoration take?", a: "Complete chassis restoration typically takes 3-5 days depending on vehicle size and condition. Wheel sets can be processed in 1-2 days. For fleet refurbishment projects, we can establish dedicated workflows to process mu" },
        { q: "What coating should I apply after shot blasting?", a: "For commercial vehicles, we recommend epoxy primer followed by polyurethane topcoat for maximum durability in harsh operating environments. For farm vehicles exposed to chemicals and weather, consider zinc-rich primer sy" },
      ],
    },
    "steel-doors": {
      title: "Steel Doors & Roller Shutters Shot Blasting",
      tagline: "Professional Restoration for Industrial Doors & Security Shutters",
      description: "Our steel doors and roller shutters shot blasting service provides comprehensive restoration for industrial doors, warehouse roller shutters, security...",
      steps: [
        { title: "Door Assessment & Planning", description: "Comprehensive evaluation of door condition, mechanism type, and access requirements for efficient restoration workflow." },
        { title: "Component Removal & Protection", description: "Careful removal of mechanisms, motors, and sensitive components. Protection of surrounding building fabric and operation" },
        { title: "Industrial Shot Blasting", description: "Systematic removal of all coatings, rust, and corrosion from door panels, roller slats, and frames using controlled blas" },
        { title: "Mechanism Cleaning", description: "Detailed cleaning of tracks, guides, and mounting hardware to ensure smooth operation after restoration." },
      ],
      applications: ["Warehouse loading bay doors", "Industrial roller shutters", "Commercial security doors", "Factory access doors", "Storage facility doors", "Retail security shutters"],
      faqs: [
        { q: "Can you blast roller shutters without removing them?", a: "In most cases, yes. We can shot blast roller shutters in situ using containment systems to protect the building interior and surrounding areas. For severely corroded shutters or those requiring mechanism work, removal to" },
        { q: "Will shot blasting affect door operation?", a: "Shot blasting improves door operation by removing corrosion and contamination that can bind mechanisms. We carefully protect motors, sensors, and control systems during the process. After restoration and coating, doors t" },
        { q: "How long does door restoration take?", a: "A typical warehouse roller shutter can be shot blasted in 1-2 days depending on size and condition. Large industrial doors or multiple door sets may require longer. We work efficiently to minimize operational disruption " },
        { q: "What coating should I apply after shot blasting?", a: "For industrial doors and roller shutters, we recommend epoxy primer followed by polyurethane topcoat for maximum durability in demanding environments. For high-traffic areas, consider powder coating for superior abrasion" },
      ],
    },
    "steel-sheeting": {
      title: "Steel Sheeting Shot Blasting",
      tagline: "Professional Surface Preparation for Steel Sheets & Panels",
      description: "Our steel sheeting shot blasting service provides comprehensive surface preparation for steel sheets, panels, and flat metal products. We remove mill scale,...",
      steps: [
        { title: "Sheet Assessment", description: "We inspect the steel sheeting to assess condition, thickness, and determine appropriate blast media and pressure setting" },
        { title: "Surface Preparation", description: "Sheets are positioned for optimal blast coverage. We ensure proper support to prevent distortion during the blasting pro" },
        { title: "Systematic Shot Blasting", description: "Using controlled techniques, we systematically blast entire sheet surfaces to achieve uniform cleanliness and consistent" },
        { title: "Edge Treatment", description: "Special attention to sheet edges and corners to ensure complete coverage and preparation for welding or joining." },
      ],
      applications: ["Roofing sheets and panels", "Cladding panels for buildings", "Structural steel plates", "Fabrication sheet material", "Industrial equipment panels", "Storage tank panels"],
      faqs: [
        { q: "Can you blast thin steel sheeting without causing distortion?", a: "Yes, we adjust blast pressure and media selection based on sheet thickness and material grade. Our technicians are experienced in processing thin gauge material while maintaining flatness and preventing distortion." },
        { q: "What sheet sizes can you accommodate?", a: "We can process steel sheets of various sizes, from small panels to large structural plates. Our equipment and facility can handle standard roofing and cladding sheet dimensions as well as custom-sized fabrication materia" },
        { q: "How quickly can you process steel sheeting?", a: "Processing time depends on sheet size, quantity, and condition. We can typically process standard roofing sheets efficiently in batches. For large projects, we can establish dedicated workflows to meet your schedule requ" },
        { q: "Do you offer coating services after shot blasting?", a: "Yes, we can coordinate with coating contractors or provide recommendations for powder coating, galvanizing, or paint systems. We ensure timing is optimized to minimize surface oxidation between blasting and coating." },
      ],
    },
    "steel-gates": {
      title: "Steel Gates & Railings Shot Blasting",
      tagline: "Precision Restoration for Commercial & Industrial Gates",
      description: "Our steel gates and railings shot blasting service provides comprehensive restoration for commercial and industrial entrance gates, perimeter railings, and...",
      steps: [
        { title: "Site Survey & Access Assessment", description: "Comprehensive evaluation of gate condition, access requirements, and surrounding area protection needs." },
        { title: "Area Protection & Masking", description: "Installation of containment systems and protective sheeting to safeguard brick pillars, walls, and surrounding areas." },
        { title: "Controlled Shot Blasting", description: "Systematic removal of all coatings, rust, and corrosion using carefully selected media and pressure settings." },
        { title: "Detail Cleaning", description: "Meticulous cleaning of ornate scrollwork, finials, and decorative elements to preserve intricate features." },
      ],
      applications: ["Commercial property entrance gates", "Industrial site security gates", "Decorative perimeter railings", "Ornate heritage gates", "Automated sliding and swing gates", "Pedestrian access gates"],
      faqs: [
        { q: "Can you work on gates without removing them?", a: "Yes, we can shot blast gates in situ in most cases. We use containment systems and protective sheeting to prevent damage to surrounding areas. For complex restorations or gates with severe structural issues, removal may " },
        { q: "Will shot blasting damage ornate details?", a: "No, our technicians are trained in working with decorative metalwork. We adjust blast pressure and media selection to safely clean intricate details without causing damage. Shot blasting actually reveals fine details tha" },
        { q: "How long does gate restoration take?", a: "Typical entrance gates can be shot blasted in 1-2 days depending on size and complexity. Large ornate gates or multiple gate sets may require longer. We work efficiently to minimize security disruption and can coordinate" },
        { q: "What coating should I apply after shot blasting?", a: "We recommend hot-dip galvanizing for maximum longevity, powder coating for decorative finishes, or high-quality metal paint systems. The choice depends on your aesthetic preferences, budget, and exposure conditions. We c" },
      ],
    },
    "plant-machinery": {
      title: "Plant & Machinery Shot Blasting",
      tagline: "On-Site Shot Blasting for Construction & Agricultural Equipment",
      description: "Our mobile plant and machinery shot blasting service brings professional surface preparation directly to your site. We specialize in restoring construction...",
      steps: [
        { title: "Site Assessment", description: "Our team visits your location to assess the machinery, determine blast media requirements, and plan containment setup to" },
        { title: "Equipment Preparation", description: "We protect sensitive components like hydraulics, electronics, and bearings. Critical areas are masked to ensure only int" },
        { title: "Containment Setup", description: "Professional containment systems are deployed to capture blast media and debris, ensuring waste management and site clea" },
        { title: "Shot Blasting", description: "Using appropriate blast media for the equipment type, we systematically remove rust, paint, and corrosion from all acces" },
      ],
      applications: ["Excavators and diggers", "Bulldozers and loaders", "Cranes and lifting equipment", "Agricultural tractors", "Combine harvesters", "Industrial compressors"],
      faqs: [
        { q: "Can you shot blast machinery on-site without moving it?", a: "Yes, our mobile shot blasting service is specifically designed to work on-site. We bring all necessary equipment, containment systems, and blast media to your location, eliminating the need for expensive transportation a" },
        { q: "What types of plant and machinery can you shot blast?", a: "We can shot blast virtually any construction or agricultural equipment including excavators, bulldozers, loaders, cranes, tractors, harvesters, compressors, generators, and more. Our mobile setup adapts to equipment of a" },
        { q: "How do you protect sensitive components during blasting?", a: "Before blasting begins, our experienced team carefully masks and protects all sensitive components including hydraulic systems, electrical components, bearings, seals, and glass. We use specialized protective materials a" },
        { q: "Will shot blasting damage my equipment?", a: "No, when performed by experienced professionals using appropriate blast media and pressure settings, shot blasting is completely safe for machinery. We select media types and blast parameters specifically for each equipm" },
      ],
    },
    "intumescent-painting": {
      title: "Intumescent Painting — Fire-Resistant Coatings for Structural Steel",
      tagline: "Fire-Resistant Coatings Applied to Perfectly Prepared Steel",
      description: "Commercial Shot Blasting offers a complete intumescent painting service for structural steel, fire escapes, and industrial metalwork. We shot blast to Sa 2.5, apply certified intumescent coatings, and provide full DFT documentation for fire resistance ratings from R30 to R120.",
      steps: [
        { title: "Site Survey & Specification", description: "We assess the steel, confirm the required fire resistance rating (R30, R60, R90, R120), and agree the coating system and DFT specification." },
        { title: "Surface Preparation by Shot Blasting", description: "All steel is shot blasted to Sa 2.5 or Sa 3 to remove mill scale, rust, and old coatings and create the correct surface profile for maximum adhesion." },
        { title: "Primer Application", description: "An approved zinc-rich or epoxy primer is applied immediately after blasting to prevent flash rusting and provide the correct base for the intumescent topcoat." },
        { title: "Intumescent Coating Application", description: "The intumescent basecoat is applied in controlled passes to achieve the specified DFT for the required fire resistance rating. DFT is measured and logged." },
        { title: "Sealer / Topcoat", description: "A protective sealer or decorative topcoat is applied over the intumescent layer for weather resistance and the required finish colour." },
        { title: "Inspection & Documentation", description: "A full DFT survey is carried out and a coating report issued, ready for building control or fire engineer sign-off." },
      ],
      applications: ["Structural steel frames", "Mezzanine floors and steel platforms", "Fire escapes and stair towers", "Internal staircases and handrails", "Steel portal frames", "New build and refurbishment projects"],
      faqs: [
        { q: "What is intumescent paint and how does it work?", a: "Intumescent paint expands under heat to create an insulating char layer around steel, maintaining structural integrity for the specified fire resistance period — typically R30, R60, R90, or R120." },
        { q: "Why does steel need shot blasting before intumescent painting?", a: "Intumescent coatings require strong adhesion to perform correctly. Shot blasting to Sa 2.5 removes all contaminants and creates the surface profile needed for maximum mechanical adhesion." },
        { q: "What fire resistance ratings can you achieve?", a: "We can achieve fire resistance ratings from R30 to R120 depending on the steel section factor, the coating system specified, and the required DFT." },
        { q: "Do you provide a coating thickness report?", a: "Yes. We measure dry film thickness on every coated member and provide a full coating report with product data sheets, batch numbers, and thickness readings for building control." },
      ],
    },
    "marine-shot-blasting": {
      title: "Commercial Marine Shot Blasting",
      tagline: "Surface preparation for large marine, waterside and high-corrosivity steelwork",
      description: "Commercial Shot Blasting plans marine and waterside surface preparation around the asset, access, containment, handling and the next coating stage. The current ADE Power Wakefield project shows large enclosures blasted and primed to the stated Marine CX standard before moving into the flipping stage.",
      steps: [
        { title: "Scope, Access & Coating Review", description: "We review the asset, working area, access constraints and the available coating requirements to define a practical blasting scope." },
        { title: "Working-Area Protection", description: "Containment, protection of adjacent work and debris controls are planned around the actual site conditions and project requirements." },
        { title: "Blast Preparation", description: "Accessible steelwork is prepared to the agreed project requirement using the selected method and controls." },
        { title: "Handover & Next Stage", description: "The preparation, handling and coating-handover sequence is coordinated with the project team so the next agreed stage can proceed." }
      ],
      applications: ["Large fabricated enclosures", "Marine and waterside steelwork", "Port and harbour infrastructure", "Offshore-related fabricated components", "Lock gates, jetties and pontoons", "Steelwork entering a specified CX coating package"],
      faqs: [
        { q: "Can you prepare large enclosures for a Marine CX coating package?", a: "Yes. We can review the enclosure, access, working area, handling requirements and the available coating information to plan the blasting scope and the handover to the next project stage." },
        { q: "Is Marine CX a blast profile?", a: "No. CX is an ISO 12944 atmospheric corrosivity category. The required blast-cleanliness grade, profile range, test method and handover controls are set by the project coating specification." },
        { q: "What should be available before planning marine blasting work?", a: "Useful information includes photographs or drawings, approximate dimensions, site and access information, the coating system or product data sheet, handling arrangements and the preparation and coating sequence where known." }
      ],
    },
    "agricultural-shot-blasting": {
      title: "Agricultural Shot Blasting",
      tagline: "Mobile Shot Blasting for Farm Machinery, Grain Stores & Agricultural Steelwork",
      description: "Commercial Shot Blasting provides specialist shot blasting services for the agricultural sector nationwide. Our mobile units come directly to your farm or yard to remove rust, old paint, and surface contamination from tractors, farm implements, grain stores, livestock buildings, and agricultural steelwork — preparing surfaces for protective coatings that extend service life and reduce long-term maintenance costs.",
      steps: [
        { title: "On-Site Assessment", description: "We visit your farm or agricultural site to assess the machinery or structures, confirm the required cleanliness standard, and agree the coating specification with you." },
        { title: "Preparation & Protection", description: "Sensitive components — bearings, seals, hydraulic fittings, and electrical connections — are masked and protected before blasting begins." },
        { title: "Shot Blasting", description: "All surfaces are blasted to remove rust, old paint, and contamination, achieving clean bare metal to Sa 2 or Sa 2.5 standard as required." },
        { title: "Surface Inspection", description: "Surface cleanliness and profile are verified before coating application to ensure the substrate is ready for the specified primer or topcoat." },
        { title: "Coating Coordination", description: "We coordinate primer or protective coating application to protect the freshly blasted surfaces before the machinery or structure returns to service." },
      ],
      applications: ["Tractors and agricultural vehicles", "Farm implements and attachments", "Grain stores and hoppers", "Steel farm buildings and portal frames", "Livestock handling equipment", "Irrigation and water management equipment", "Trailers, ploughs, and spreaders", "Silage clamps and slurry stores"],
      faqs: [
        { q: "Can you blast tractors and farm machinery on-site?", a: "Yes. Our mobile units come directly to your farm or agricultural site. We can blast tractors, implements, and other machinery on-site, minimising downtime and transport costs. We work around your farming schedule to reduce disruption." },
        { q: "What coating is recommended after blasting agricultural equipment?", a: "For agricultural machinery, we recommend a zinc-rich primer followed by a two-pack epoxy or polyurethane topcoat for maximum durability in the harsh agricultural environment. We can advise on the most suitable coating system for your specific equipment and budget." },
        { q: "Can you blast grain stores and steel farm buildings?", a: "Yes. We regularly blast grain stores, steel portal frame farm buildings, and agricultural structures. Our mobile equipment can treat large areas of structural steelwork and cladding on-site without the need to dismantle the building." },
        { q: "How much does agricultural shot blasting cost?", a: "Cost depends on the size and condition of the machinery or structure. We provide free site surveys and detailed quotations. As a guide, a single tractor chassis typically takes one day; a grain store or farm building will be priced per square metre of surface area." },
      ],
    },
  };

  const d = serviceData[serviceId];
  if (!d) return "";

  const stepsHtml = d.steps.map((s, i) => `
    <div class="ssr-step">
      <h3>${i+1}. ${escHtml(s.title)}</h3>
      <p>${escHtml(s.description)}</p>
    </div>`).join("");

  const appsHtml = d.applications.map(a => `<li>${escHtml(a)}</li>`).join("");

	const faqsHtml = d.faqs.map(f => `
	  <div class="ssr-faq" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <h3 itemprop="name">${escHtml(f.q)}</h3>
      <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <p itemprop="text">${escHtml(f.a)}</p>
      </div>
	  </div>`).join("");

  const decisionAnswers = AEO_DECISION_ANSWERS_BY_SERVICE[serviceId];
  const decisionAnswersHtml = decisionAnswers
    ? `<section class="ssr-decision-answers"><h2>${escHtml(decisionAnswers.heading)}</h2><p>${escHtml(decisionAnswers.introduction)}</p>${decisionAnswers.answers.map(answer => `<article><h3>${escHtml(answer.question)}</h3><p>${escHtml(answer.answer)}</p>${answer.evidenceLink ? `<p><a href="${SITE_URL}${escHtml(answer.evidenceLink.href)}">${escHtml(answer.evidenceLink.label)}</a></p>` : ""}</article>`).join("")}${serviceId === "factory-cladding" ? `<p><a href="${SITE_URL}/commercial-blasting-specification-checklist">Use the commercial blasting scope checklist</a></p>` : ""}</section>`
    : "";

  const caseStudyCalloutHtml = ["structural-steel-frames", "intumescent-painting"].includes(serviceId)
    ? `<section class="ssr-case-study-callout"><h2>End-to-end blasting and intumescent coating project evidence</h2><p>See how a five-person specialist team delivered abrasive blasting, immediate primer protection and intumescent fire-protective painting as one coordinated scope for the HB Tunnelling Doncaster warehouse refurbishment.</p><p>Keeping surface preparation and fire protection together reduced handovers between trades and supported continuous progress through the refurbishment programme.</p><p><a href="${SITE_URL}/case-studies/hb-tunnelling-doncaster">View the HB Tunnelling Doncaster end-to-end delivery case study</a>.</p></section>`
	  : "";

  const marineCaseStudyCalloutHtml = serviceId === "marine-shot-blasting"
    ? `<section class="ssr-case-study-callout"><h2>ADE Power Wakefield — large enclosure Marine CX preparation</h2><p>Large enclosures at ADE Power in Wakefield have been blasted and primed to the stated Marine CX standard and are now being flipped.</p><p>See the project photos and handling footage, then use the record to plan access, containment, handling and coating handover for a similar commercial enclosure package.</p><p><a href="${SITE_URL}/case-studies/ade-power-wakefield-marine-cx-enclosures">View the ADE Power Wakefield project update</a> or <a href="${SITE_URL}/services/marine-cx-surface-preparation">plan Marine CX surface preparation</a>.</p></section>`
    : "";

	return `
<div id="ssr-service-content" aria-hidden="true" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;" itemscope itemtype="https://schema.org/Service">
  <nav aria-label="Breadcrumb"><ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a itemprop="item" href="${SITE_URL}"><span itemprop="name">Home</span></a><meta itemprop="position" content="1"/></li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a itemprop="item" href="${SITE_URL}/services"><span itemprop="name">Services</span></a><meta itemprop="position" content="2"/></li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><span itemprop="name">${escHtml(d.title)}</span><meta itemprop="position" content="3"/></li>
  </ol></nav>
  <h1 itemprop="name">${escHtml(d.title)}</h1>
  <p itemprop="description">${escHtml(d.tagline)}</p>
  <p>${escHtml(d.description)}</p>
  <section class="ssr-process"><h2>Our Process</h2>${stepsHtml}</section>
  <section class="ssr-applications"><h2>Applications</h2><ul>${appsHtml}</ul></section>
	  ${decisionAnswersHtml}
  ${(() => {
    const proof = SERVICE_PROOF_DATA[serviceId];
    if (!proof) return '';
    const stdItems = proof.standards.map((s: string) => `<li>${escHtml(s)}</li>`).join('');
    const indItems = proof.industries.map((i: string) => `<li>${escHtml(i)}</li>`).join('');
    return `<section class="ssr-proof">
    <h2>Applicable Standards &amp; Specifications</h2>
    <ul>${stdItems}</ul>
    <h2>Surface Condition</h2>
    <p><strong>Before blasting:</strong> ${escHtml(proof.surfaceBefore)}</p>
    <p><strong>After blasting:</strong> ${escHtml(proof.surfaceAfter)}</p>
    <h2>Industries We Serve</h2>
    <ul>${indItems}</ul>
    <h2>When to Choose Shot Blasting</h2>
	    <p>${escHtml(proof.decisionNote)}</p>
	  </section>`;
	})()}
		  ${caseStudyCalloutHtml}
		  ${marineCaseStudyCalloutHtml}
	  <section class="ssr-faqs" itemscope itemtype="https://schema.org/FAQPage"><h2>Frequently Asked Questions</h2>${faqsHtml}</section>
  <section class="ssr-coverage" id="service-coverage">
    <h2>Where We Offer ${escHtml(d.title)}</h2>
    <p>Our mobile units deliver ${escHtml(d.title.toLowerCase())} services across 35 counties in the UK. Select a county to see all the towns and areas we cover.</p>
    <ul>
      <li><a href="${SITE_URL}/counties/bedfordshire">${escHtml(d.title)} in Bedfordshire</a></li>
      <li><a href="${SITE_URL}/counties/berkshire">${escHtml(d.title)} in Berkshire</a></li>
      <li><a href="${SITE_URL}/counties/buckinghamshire">${escHtml(d.title)} in Buckinghamshire</a></li>
      <li><a href="${SITE_URL}/counties/cambridgeshire">${escHtml(d.title)} in Cambridgeshire</a></li>
      <li><a href="${SITE_URL}/counties/cheshire">${escHtml(d.title)} in Cheshire</a></li>
      <li><a href="${SITE_URL}/counties/cumbria">${escHtml(d.title)} in Cumbria</a></li>
      <li><a href="${SITE_URL}/counties/derbyshire">${escHtml(d.title)} in Derbyshire</a></li>
      <li><a href="${SITE_URL}/counties/durham">${escHtml(d.title)} in County Durham</a></li>
      <li><a href="${SITE_URL}/counties/east-wales">${escHtml(d.title)} in East Wales</a></li>
      <li><a href="${SITE_URL}/counties/essex">${escHtml(d.title)} in Essex</a></li>
      <li><a href="${SITE_URL}/counties/gloucestershire">${escHtml(d.title)} in Gloucestershire</a></li>
      <li><a href="${SITE_URL}/counties/greater-manchester">${escHtml(d.title)} in Greater Manchester</a></li>
      <li><a href="${SITE_URL}/counties/hampshire">${escHtml(d.title)} in Hampshire</a></li>
      <li><a href="${SITE_URL}/counties/herefordshire">${escHtml(d.title)} in Herefordshire</a></li>
      <li><a href="${SITE_URL}/counties/hertfordshire">${escHtml(d.title)} in Hertfordshire</a></li>
      <li><a href="${SITE_URL}/counties/lancashire">${escHtml(d.title)} in Lancashire</a></li>
      <li><a href="${SITE_URL}/counties/leicestershire">${escHtml(d.title)} in Leicestershire</a></li>
      <li><a href="${SITE_URL}/counties/lincolnshire">${escHtml(d.title)} in Lincolnshire</a></li>
      <li><a href="${SITE_URL}/counties/norfolk">${escHtml(d.title)} in Norfolk</a></li>
      <li><a href="${SITE_URL}/counties/north-devon">${escHtml(d.title)} in North Devon</a></li>
      <li><a href="${SITE_URL}/counties/north-yorkshire">${escHtml(d.title)} in North Yorkshire</a></li>
      <li><a href="${SITE_URL}/counties/northamptonshire">${escHtml(d.title)} in Northamptonshire</a></li>
      <li><a href="${SITE_URL}/counties/northumberland">${escHtml(d.title)} in Northumberland</a></li>
      <li><a href="${SITE_URL}/counties/nottinghamshire">${escHtml(d.title)} in Nottinghamshire</a></li>
      <li><a href="${SITE_URL}/counties/shropshire">${escHtml(d.title)} in Shropshire</a></li>
      <li><a href="${SITE_URL}/counties/somerset">${escHtml(d.title)} in Somerset</a></li>
      <li><a href="${SITE_URL}/counties/south-yorkshire">${escHtml(d.title)} in South Yorkshire</a></li>
      <li><a href="${SITE_URL}/counties/staffordshire">${escHtml(d.title)} in Staffordshire</a></li>
      <li><a href="${SITE_URL}/counties/suffolk">${escHtml(d.title)} in Suffolk</a></li>
      <li><a href="${SITE_URL}/counties/tyne-and-wear">${escHtml(d.title)} in Tyne &amp; Wear</a></li>
      <li><a href="${SITE_URL}/counties/warwickshire">${escHtml(d.title)} in Warwickshire</a></li>
      <li><a href="${SITE_URL}/counties/west-midlands">${escHtml(d.title)} in West Midlands</a></li>
      <li><a href="${SITE_URL}/counties/west-yorkshire">${escHtml(d.title)} in West Yorkshire</a></li>
      <li><a href="${SITE_URL}/counties/wiltshire">${escHtml(d.title)} in Wiltshire</a></li>
      <li><a href="${SITE_URL}/counties/worcestershire">${escHtml(d.title)} in Worcestershire</a></li>
    </ul>
  </section>
  ${(() => {
    const SERVICE_BLOG_MAP: Record<string, Array<{slug: string; title: string}>> = {
      "structural-steel-frames": [
        {slug: "shot-blasting-structural-steel-guide", title: "The Complete Guide to Shot Blasting Structural Steel"},
        {slug: "how-to-specify-surface-preparation-for-structural-steel", title: "How to Specify Surface Preparation for Structural Steel"},
        {slug: "shot-blasting-structural-steel-standards-certification", title: "Shot Blasting for Structural Steel: Standards & Certification"},
      ],
      "steel-containers": [
        {slug: "shot-blasting-for-shipping-containers", title: "Shot Blasting for Shipping Containers: The Complete Guide"},
        {slug: "shot-blasting-vs-wire-brushing", title: "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"},
      ],
      "factory-cladding": [
        {slug: "factory-warehouse-cladding-restoration", title: "Restoring Factory and Warehouse Cladding: Why Shot Blasting Wins"},
        {slug: "shot-blasting-vs-wire-brushing", title: "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"},
      ],
      "fire-escapes": [
        {slug: "shot-blasting-structural-steel-guide", title: "The Complete Guide to Shot Blasting Structural Steel"},
        {slug: "shot-blasting-vs-wire-brushing", title: "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"},
      ],
      "staircases": [
        {slug: "shot-blasting-structural-steel-guide", title: "The Complete Guide to Shot Blasting Structural Steel"},
        {slug: "shot-blasting-vs-sandblasting-difference", title: "Shot Blasting vs Sandblasting: What's the Difference?"},
      ],
      "bridge-steelwork": [
        {slug: "shot-blasting-structural-steel-guide", title: "The Complete Guide to Shot Blasting Structural Steel"},
        {slug: "how-to-specify-surface-preparation-for-structural-steel", title: "How to Specify Surface Preparation for Structural Steel"},
        {slug: "shot-blasting-structural-steel-standards-certification", title: "Shot Blasting for Structural Steel: Standards & Certification"},
      ],
      "ladders": [
        {slug: "shot-blasting-vs-wire-brushing", title: "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"},
        {slug: "shot-blasting-vs-sandblasting-difference", title: "Shot Blasting vs Sandblasting: What's the Difference?"},
      ],
      "warehouse-racking": [
        {slug: "shot-blasting-vs-wire-brushing", title: "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"},
        {slug: "shot-blasting-powder-coating-partnership", title: "Shot Blasting and Powder Coating: The Perfect Partnership"},
      ],
      "pipework": [
        {slug: "shot-blasting-structural-steel-guide", title: "The Complete Guide to Shot Blasting Structural Steel"},
        {slug: "shot-blasting-vs-sandblasting-difference", title: "Shot Blasting vs Sandblasting: What's the Difference?"},
      ],
      "telecom-towers": [
        {slug: "shot-blasting-structural-steel-guide", title: "The Complete Guide to Shot Blasting Structural Steel"},
        {slug: "shot-blasting-vs-wire-brushing", title: "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"},
      ],
      "floor-preparation": [
        {slug: "shot-blasting-vs-sandblasting-difference", title: "Shot Blasting vs Sandblasting: What's the Difference?"},
        {slug: "how-much-does-shot-blasting-cost-uk", title: "How Much Does Shot Blasting Cost in the UK? (2025 Price Guide)"},
      ],
      "powder-coating": [
        {slug: "shot-blasting-powder-coating-partnership", title: "Shot Blasting and Powder Coating: The Perfect Partnership"},
        {slug: "shot-blasting-vs-wire-brushing", title: "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"},
      ],
      "commercial-radiators": [
        {slug: "shot-blasting-vs-wire-brushing", title: "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"},
        {slug: "shot-blasting-powder-coating-partnership", title: "Shot Blasting and Powder Coating: The Perfect Partnership"},
      ],
      "commercial-vehicles": [
        {slug: "shot-blasting-vs-sandblasting-difference", title: "Shot Blasting vs Sandblasting: What's the Difference?"},
        {slug: "shot-blasting-vs-wire-brushing", title: "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"},
      ],
      "steel-doors": [
        {slug: "shot-blasting-vs-wire-brushing", title: "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"},
        {slug: "shot-blasting-powder-coating-partnership", title: "Shot Blasting and Powder Coating: The Perfect Partnership"},
      ],
      "steel-sheeting": [
        {slug: "shot-blasting-vs-wire-brushing", title: "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"},
        {slug: "shot-blasting-vs-sandblasting-difference", title: "Shot Blasting vs Sandblasting: What's the Difference?"},
      ],
      "steel-gates": [
        {slug: "shot-blasting-vs-wire-brushing", title: "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"},
        {slug: "shot-blasting-powder-coating-partnership", title: "Shot Blasting and Powder Coating: The Perfect Partnership"},
      ],
      "plant-machinery": [
        {slug: "shot-blasting-vs-sandblasting-difference", title: "Shot Blasting vs Sandblasting: What's the Difference?"},
        {slug: "how-much-does-shot-blasting-cost-uk", title: "How Much Does Shot Blasting Cost in the UK? (2025 Price Guide)"},
      ],
      "intumescent-painting": [
        {slug: "why-shot-blasting-essential-before-intumescent-painting", title: "Why Shot Blasting is Essential Before Intumescent Painting"},
        {slug: "shot-blasting-structural-steel-guide", title: "The Complete Guide to Shot Blasting Structural Steel"},
        {slug: "how-to-specify-surface-preparation-for-structural-steel", title: "How to Specify Surface Preparation for Structural Steel"},
      ],
      "agricultural-shot-blasting": [
        {slug: "shot-blasting-vs-sandblasting-difference", title: "Shot Blasting vs Sandblasting: What's the Difference?"},
        {slug: "how-much-does-shot-blasting-cost-uk", title: "How Much Does Shot Blasting Cost in the UK? (2025 Price Guide)"},
      ],
    };
    const relatedPosts = SERVICE_BLOG_MAP[serviceId] || [];
    if (!relatedPosts.length) return '';
    const items = relatedPosts.map((p: {slug: string; title: string}) => `<li><a href="${SITE_URL}/blog/${p.slug}">${escHtml(p.title)}</a></li>`).join('\n        ');
    return `<section aria-label="Related Guides">\n    <h2>Related Guides</h2>\n    <ul>\n        ${items}\n    </ul>\n  </section>`;
  })()}
  ${(() => {
    const SERVICE_RELATED_MAP: Record<string, Array<{slug: string; title: string}>> = {
      "structural-steel-frames": [
        {slug: "bridge-steelwork", title: "Bridge Steelwork Shot Blasting"},
        {slug: "warehouse-racking", title: "Warehouse Racking Shot Blasting"},
        {slug: "intumescent-painting", title: "Intumescent Painting"},
        {slug: "mill-scale-removal", title: "Mill Scale Removal"},
      ],
      "steel-containers": [
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "paint-stripping", title: "Paint Stripping"},
        {slug: "marine-shot-blasting", title: "Marine Shot Blasting"},
        {slug: "coating-removal", title: "Coating Removal"},
      ],
      "factory-cladding": [
        {slug: "steel-sheeting", title: "Steel Sheeting Blasting"},
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "paint-stripping", title: "Paint Stripping"},
        {slug: "powder-coating", title: "Powder Coating Preparation"},
      ],
      "fire-escapes": [
        {slug: "staircases", title: "Staircase Shot Blasting"},
        {slug: "steel-gates", title: "Steel Gates & Railings"},
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "ladders", title: "Ladder Shot Blasting"},
      ],
      "staircases": [
        {slug: "fire-escapes", title: "Fire Escape Shot Blasting"},
        {slug: "ladders", title: "Ladder Shot Blasting"},
        {slug: "steel-gates", title: "Steel Gates & Railings"},
        {slug: "powder-coating", title: "Powder Coating Preparation"},
      ],
      "bridge-steelwork": [
        {slug: "structural-steel-frames", title: "Structural Steel Frames"},
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "mill-scale-removal", title: "Mill Scale Removal"},
        {slug: "pipework", title: "Pipework Shot Blasting"},
      ],
      "ladders": [
        {slug: "fire-escapes", title: "Fire Escape Shot Blasting"},
        {slug: "staircases", title: "Staircase Shot Blasting"},
        {slug: "steel-gates", title: "Steel Gates & Railings"},
        {slug: "rust-removal", title: "Rust Removal"},
      ],
      "warehouse-racking": [
        {slug: "structural-steel-frames", title: "Structural Steel Frames"},
        {slug: "floor-preparation", title: "Floor Preparation"},
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "powder-coating", title: "Powder Coating Preparation"},
      ],
      "pipework": [
        {slug: "bridge-steelwork", title: "Bridge Steelwork Shot Blasting"},
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "mill-scale-removal", title: "Mill Scale Removal"},
        {slug: "coating-removal", title: "Coating Removal"},
      ],
      "telecom-towers": [
        {slug: "bridge-steelwork", title: "Bridge Steelwork Shot Blasting"},
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "structural-steel-frames", title: "Structural Steel Frames"},
        {slug: "mill-scale-removal", title: "Mill Scale Removal"},
      ],
      "floor-preparation": [
        {slug: "warehouse-racking", title: "Warehouse Racking Shot Blasting"},
        {slug: "factory-cladding", title: "Factory & Warehouse Cladding"},
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "paint-stripping", title: "Paint Stripping"},
      ],
      "powder-coating": [
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "mill-scale-removal", title: "Mill Scale Removal"},
        {slug: "paint-stripping", title: "Paint Stripping"},
        {slug: "steel-gates", title: "Steel Gates & Railings"},
      ],
      "commercial-radiators": [
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "paint-stripping", title: "Paint Stripping"},
        {slug: "powder-coating", title: "Powder Coating Preparation"},
        {slug: "commercial-vehicles", title: "Commercial Vehicles"},
      ],
      "commercial-vehicles": [
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "paint-stripping", title: "Paint Stripping"},
        {slug: "agricultural-shot-blasting", title: "Agricultural Shot Blasting"},
        {slug: "plant-machinery", title: "Plant & Machinery"},
      ],
      "steel-doors": [
        {slug: "steel-gates", title: "Steel Gates & Railings"},
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "powder-coating", title: "Powder Coating Preparation"},
        {slug: "paint-stripping", title: "Paint Stripping"},
      ],
      "steel-sheeting": [
        {slug: "factory-cladding", title: "Factory & Warehouse Cladding"},
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "paint-stripping", title: "Paint Stripping"},
        {slug: "mill-scale-removal", title: "Mill Scale Removal"},
      ],
      "steel-gates": [
        {slug: "steel-doors", title: "Steel Doors & Shutters"},
        {slug: "fire-escapes", title: "Fire Escape Shot Blasting"},
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "powder-coating", title: "Powder Coating Preparation"},
      ],
      "plant-machinery": [
        {slug: "commercial-vehicles", title: "Commercial Vehicles"},
        {slug: "agricultural-shot-blasting", title: "Agricultural Shot Blasting"},
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "paint-stripping", title: "Paint Stripping"},
      ],
      "intumescent-painting": [
        {slug: "structural-steel-frames", title: "Structural Steel Frames"},
        {slug: "bridge-steelwork", title: "Bridge Steelwork Shot Blasting"},
        {slug: "mill-scale-removal", title: "Mill Scale Removal"},
        {slug: "rust-removal", title: "Rust Removal"},
      ],
      "marine-shot-blasting": [
        {slug: "marine-cx-surface-preparation", title: "Marine CX Surface Preparation"},
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "coating-removal", title: "Coating Removal"},
        {slug: "paint-stripping", title: "Paint Stripping"},
      ],
      "rust-removal": [
        {slug: "mill-scale-removal", title: "Mill Scale Removal"},
        {slug: "paint-stripping", title: "Paint Stripping"},
        {slug: "coating-removal", title: "Coating Removal"},
        {slug: "structural-steel-frames", title: "Structural Steel Frames"},
      ],
      "mill-scale-removal": [
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "structural-steel-frames", title: "Structural Steel Frames"},
        {slug: "intumescent-painting", title: "Intumescent Painting"},
        {slug: "bridge-steelwork", title: "Bridge Steelwork Shot Blasting"},
      ],
      "paint-stripping": [
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "coating-removal", title: "Coating Removal"},
        {slug: "powder-coating", title: "Powder Coating Preparation"},
        {slug: "factory-cladding", title: "Factory & Warehouse Cladding"},
      ],
      "coating-removal": [
        {slug: "paint-stripping", title: "Paint Stripping"},
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "mill-scale-removal", title: "Mill Scale Removal"},
        {slug: "marine-shot-blasting", title: "Marine Shot Blasting"},
      ],
      "agricultural-shot-blasting": [
        {slug: "plant-machinery", title: "Plant & Machinery"},
        {slug: "commercial-vehicles", title: "Commercial Vehicles"},
        {slug: "rust-removal", title: "Rust Removal"},
        {slug: "paint-stripping", title: "Paint Stripping"},
      ],
    };
    const related = SERVICE_RELATED_MAP[serviceId] || [];
    if (!related.length) return '';
    const items = related.map((r: {slug: string; title: string}) =>
      `<li><a href="${SITE_URL}/services/${r.slug}">${escHtml(r.title)}</a></li>`
    ).join('\n        ');
    return `<section aria-label="Related Services">\n    <h2>Related Services</h2>\n    <ul>\n        ${items}\n    </ul>\n  </section>`;
  })()}
  <section class="ssr-contact">
    <h2>Get a Free Quote for ${escHtml(d.title)}</h2>
    <p>Contact Commercial Shot Blasting for professional ${escHtml(d.title.toLowerCase())} services nationwide.</p>
    <p>Phone: <a href="tel:${PHONE}">${PHONE}</a></p>
    <p>Email: <a href="mailto:${EMAIL}">${EMAIL}</a></p>
  </section>
</div>`;
}

/**
 * Generate comprehensive JSON-LD schemas for service pages
 */

// Service-specific keywords for meta keywords tag (replaces generic site-wide keywords)
const SERVICE_KEYWORDS: Record<string, string> = {
  "steel-chimney-surface-preparation": "steel chimney surface preparation, process stack blast cleaning, fabricated chimney blasting, steel flue coating preparation, industrial stack surface preparation",
  "structural-steel-frames": "structural steel shot blasting, steel frame surface preparation, mill scale removal steel, SA2.5 steel frames, shot blasting structural steel UK",
  "steel-containers": "steel container shot blasting, shipping container blasting, storage tank rust removal, container surface preparation UK",
  "factory-cladding": "factory cladding shot blasting, cladding rust removal, industrial cladding surface preparation, steel cladding blasting UK",
  "fire-escapes": "fire escape shot blasting, fire escape rust removal, fire escape surface preparation, metal fire escape blasting UK",
  "staircases": "staircase shot blasting, steel staircase rust removal, staircase surface preparation, industrial staircase blasting UK",
  "bridge-steelwork": "bridge steelwork shot blasting, bridge steel rust removal, bridge surface preparation, infrastructure shot blasting UK",
  "ladders": "steel ladder shot blasting, ladder rust removal, industrial ladder surface preparation, metal ladder blasting UK",
  "warehouse-racking": "warehouse racking shot blasting, racking rust removal, mezzanine floor blasting, industrial racking surface preparation UK",
  "pipework": "pipework shot blasting, pipe rust removal, industrial pipework surface preparation, steel pipe blasting UK",
  "telecom-towers": "telecom tower shot blasting, telecoms mast rust removal, tower surface preparation, steel mast blasting UK",
  "floor-preparation": "floor shot blasting, concrete floor preparation, floor surface profiling, industrial floor blasting UK",
  "powder-coating": "powder coating preparation, shot blasting before powder coat, metal surface preparation powder coating UK",
  "commercial-radiators": "commercial radiator shot blasting, radiator rust removal, radiator surface preparation, heating system blasting UK",
  "commercial-vehicles": "commercial vehicle shot blasting, truck chassis rust removal, van body surface preparation, vehicle blasting UK",
  "steel-doors": "steel door shot blasting, steel door rust removal, roller shutter surface preparation, industrial door blasting UK",
  "steel-sheeting": "steel sheeting shot blasting, profiled sheet rust removal, steel sheet surface preparation, cladding sheet blasting UK",
  "steel-gates": "steel gate shot blasting, gate rust removal, metal gate surface preparation, steel railings blasting UK",
  "plant-machinery": "plant machinery shot blasting, machinery rust removal, industrial equipment surface preparation, agricultural machinery blasting UK",
  "intumescent-painting": "intumescent painting structural steel, fire protection coating steel, R30 R60 R90 intumescent paint UK, steel fire protection painting",
  "marine-shot-blasting": "marine shot blasting, boat hull rust removal, marine surface preparation, offshore structure blasting UK",
  "rust-removal": "rust removal shot blasting, steel rust removal UK, corrosion removal surface preparation, industrial rust removal service",
  "mill-scale-removal": "mill scale removal shot blasting, mill scale steel surface preparation, SA2.5 mill scale removal UK",
  "paint-stripping": "paint stripping shot blasting, old paint removal steel, industrial paint stripping UK, coating removal service",
  "coating-removal": "coating removal shot blasting, old coating removal steel, industrial coating stripping UK, surface preparation coating removal",
  "agricultural-shot-blasting": "agricultural machinery shot blasting, farm equipment rust removal, agricultural surface preparation UK, tractor chassis blasting",
};

// Service-specific alternateName synonyms for Service schema (improves semantic entity matching)
const SERVICE_ALTERNATE_NAMES: Record<string, string[]> = {
  "steel-chimney-surface-preparation": ["Steel Chimney Shot Blasting", "Process Stack Blast Cleaning", "Fabricated Steel Flue Preparation", "Industrial Stack Surface Preparation"],
  "structural-steel-frames": ["Steel Frame Shot Blasting", "Structural Steel Surface Preparation", "Steel Frame Rust Removal", "Abrasive Blasting Structural Steel"],
  "steel-containers": ["Container Shot Blasting", "Shipping Container Rust Removal", "Storage Tank Blasting", "Container Surface Preparation"],
  "factory-cladding": ["Cladding Shot Blasting", "Factory Cladding Rust Removal", "Industrial Cladding Surface Preparation", "Steel Cladding Blasting"],
  "fire-escapes": ["Fire Escape Rust Removal", "Fire Escape Surface Preparation", "Metal Fire Escape Blasting"],
  "staircases": ["Staircase Rust Removal", "Steel Staircase Blasting", "Industrial Staircase Surface Preparation"],
  "bridge-steelwork": ["Bridge Steel Shot Blasting", "Bridge Rust Removal", "Infrastructure Surface Preparation", "Bridge Steelwork Blasting"],
  "ladders": ["Steel Ladder Rust Removal", "Industrial Ladder Blasting", "Metal Ladder Surface Preparation"],
  "warehouse-racking": ["Racking Shot Blasting", "Mezzanine Floor Blasting", "Warehouse Racking Rust Removal", "Industrial Racking Surface Preparation"],
  "pipework": ["Pipework Rust Removal", "Industrial Pipe Blasting", "Steel Pipe Surface Preparation", "Pipe Shot Blasting"],
  "telecom-towers": ["Telecoms Mast Blasting", "Tower Rust Removal", "Steel Mast Surface Preparation"],
  "floor-preparation": ["Floor Shot Blasting", "Concrete Floor Preparation", "Floor Surface Profiling", "Industrial Floor Blasting"],
  "powder-coating": ["Pre-Powder Coat Blasting", "Powder Coat Surface Preparation", "Metal Blasting Before Powder Coating"],
  "commercial-radiators": ["Radiator Rust Removal", "Commercial Radiator Blasting", "Heating System Surface Preparation"],
  "commercial-vehicles": ["Vehicle Chassis Shot Blasting", "Truck Rust Removal", "Commercial Vehicle Surface Preparation"],
  "steel-doors": ["Steel Door Rust Removal", "Roller Shutter Blasting", "Industrial Door Surface Preparation"],
  "steel-sheeting": ["Profiled Sheet Blasting", "Steel Sheet Rust Removal", "Cladding Sheet Surface Preparation"],
  "steel-gates": ["Gate Rust Removal", "Metal Gate Blasting", "Steel Railings Surface Preparation"],
  "plant-machinery": ["Machinery Rust Removal", "Industrial Equipment Blasting", "Agricultural Machinery Surface Preparation", "Plant Equipment Shot Blasting"],
  "intumescent-painting": ["Intumescent Coating Application", "Fire Protection Painting Steel", "Intumescent Paint Spraying UK", "Structural Steel Fire Protection", "R30 R60 R90 R120 Intumescent Coating"],
  "marine-shot-blasting": ["Marine Surface Preparation", "Boat Hull Blasting", "Offshore Structure Shot Blasting", "Marine Rust Removal"],
  "rust-removal": ["Corrosion Removal Shot Blasting", "Steel Rust Removal Service", "Industrial Rust Removal", "Abrasive Blasting Rust Removal"],
  "mill-scale-removal": ["Mill Scale Shot Blasting", "Steel Mill Scale Removal", "SA2.5 Mill Scale Preparation"],
  "paint-stripping": ["Old Paint Removal", "Industrial Paint Stripping", "Coating Removal Shot Blasting", "Paint Removal Service UK"],
  "coating-removal": ["Old Coating Removal", "Industrial Coating Stripping", "Surface Preparation Coating Removal"],
  "agricultural-shot-blasting": ["Farm Equipment Shot Blasting", "Agricultural Machinery Rust Removal", "Tractor Chassis Blasting", "Farm Machinery Surface Preparation"],
};

// servicePreparationSteps is now imported from @shared/servicePreparationSteps
function generateServiceSchemas(serviceId: string): string {
  const svc = serviceMeta[serviceId];
  if (!svc) return "";
  const url = `${SITE_URL}/services/${serviceId}`;
  const schemas = [];
  
  // Related services map for isRelatedTo schema
  const relatedServicesMap: Record<string, Array<{slug: string; title: string}>> = {
    "structural-steel-frames": [{slug: "bridge-steelwork", title: "Bridge Steelwork Shot Blasting"}, {slug: "warehouse-racking", title: "Warehouse Racking Shot Blasting"}, {slug: "intumescent-painting", title: "Intumescent Painting"}, {slug: "mill-scale-removal", title: "Mill Scale Removal"}],
    "steel-containers": [{slug: "rust-removal", title: "Rust Removal"}, {slug: "paint-stripping", title: "Paint Stripping"}, {slug: "marine-shot-blasting", title: "Marine Shot Blasting"}, {slug: "coating-removal", title: "Coating Removal"}],
    "factory-cladding": [{slug: "steel-sheeting", title: "Steel Sheeting Blasting"}, {slug: "rust-removal", title: "Rust Removal"}, {slug: "paint-stripping", title: "Paint Stripping"}, {slug: "powder-coating", title: "Powder Coating Preparation"}],
    "rust-removal": [{slug: "structural-steel-frames", title: "Structural Steel Frames"}, {slug: "steel-containers", title: "Steel Containers"}, {slug: "paint-stripping", title: "Paint Stripping"}, {slug: "coating-removal", title: "Coating Removal"}],
    "paint-stripping": [{slug: "rust-removal", title: "Rust Removal"}, {slug: "powder-coating", title: "Powder Coating Preparation"}, {slug: "factory-cladding", title: "Factory Cladding Blasting"}, {slug: "coating-removal", title: "Coating Removal"}],
    "intumescent-painting": [{slug: "structural-steel-frames", title: "Structural Steel Frames"}, {slug: "bridge-steelwork", title: "Bridge Steelwork Shot Blasting"}, {slug: "warehouse-racking", title: "Warehouse Racking Shot Blasting"}, {slug: "mill-scale-removal", title: "Mill Scale Removal"}],
    "mill-scale-removal": [{slug: "structural-steel-frames", title: "Structural Steel Frames"}, {slug: "intumescent-painting", title: "Intumescent Painting"}, {slug: "bridge-steelwork", title: "Bridge Steelwork Shot Blasting"}, {slug: "warehouse-racking", title: "Warehouse Racking Shot Blasting"}],
    "bridge-steelwork": [{slug: "structural-steel-frames", title: "Structural Steel Frames"}, {slug: "intumescent-painting", title: "Intumescent Painting"}, {slug: "mill-scale-removal", title: "Mill Scale Removal"}, {slug: "warehouse-racking", title: "Warehouse Racking Shot Blasting"}],
    "warehouse-racking": [{slug: "structural-steel-frames", title: "Structural Steel Frames"}, {slug: "bridge-steelwork", title: "Bridge Steelwork Shot Blasting"}, {slug: "intumescent-painting", title: "Intumescent Painting"}, {slug: "mill-scale-removal", title: "Mill Scale Removal"}],
    "machinery-equipment": [{slug: "rust-removal", title: "Rust Removal"}, {slug: "paint-stripping", title: "Paint Stripping"}, {slug: "coating-removal", title: "Coating Removal"}, {slug: "steel-containers", title: "Steel Containers"}],
    "coating-removal": [{slug: "rust-removal", title: "Rust Removal"}, {slug: "paint-stripping", title: "Paint Stripping"}, {slug: "machinery-equipment", title: "Machinery & Equipment Blasting"}, {slug: "powder-coating", title: "Powder Coating Preparation"}],
    "powder-coating": [{slug: "paint-stripping", title: "Paint Stripping"}, {slug: "coating-removal", title: "Coating Removal"}, {slug: "factory-cladding", title: "Factory Cladding Blasting"}, {slug: "rust-removal", title: "Rust Removal"}],
    "marine-shot-blasting": [{slug: "marine-cx-surface-preparation", title: "Marine CX Surface Preparation"}, {slug: "steel-containers", title: "Steel Containers"}, {slug: "rust-removal", title: "Rust Removal"}, {slug: "coating-removal", title: "Coating Removal"}],
    "steel-sheeting": [{slug: "factory-cladding", title: "Factory Cladding Blasting"}, {slug: "rust-removal", title: "Rust Removal"}, {slug: "paint-stripping", title: "Paint Stripping"}, {slug: "powder-coating", title: "Powder Coating Preparation"}],
    "castings-forgings": [{slug: "machinery-equipment", title: "Machinery & Equipment Blasting"}, {slug: "rust-removal", title: "Rust Removal"}, {slug: "coating-removal", title: "Coating Removal"}, {slug: "paint-stripping", title: "Paint Stripping"}],
    "vehicle-parts": [{slug: "machinery-equipment", title: "Machinery & Equipment Blasting"}, {slug: "rust-removal", title: "Rust Removal"}, {slug: "paint-stripping", title: "Paint Stripping"}, {slug: "coating-removal", title: "Coating Removal"}],
    "agricultural-equipment": [{slug: "machinery-equipment", title: "Machinery & Equipment Blasting"}, {slug: "rust-removal", title: "Rust Removal"}, {slug: "paint-stripping", title: "Paint Stripping"}, {slug: "coating-removal", title: "Coating Removal"}],
    "construction-equipment": [{slug: "machinery-equipment", title: "Machinery & Equipment Blasting"}, {slug: "rust-removal", title: "Rust Removal"}, {slug: "paint-stripping", title: "Paint Stripping"}, {slug: "coating-removal", title: "Coating Removal"}],
    "pipework-vessels": [{slug: "rust-removal", title: "Rust Removal"}, {slug: "paint-stripping", title: "Paint Stripping"}, {slug: "coating-removal", title: "Coating Removal"}, {slug: "steel-containers", title: "Steel Containers"}],
    "architectural-metalwork": [{slug: "rust-removal", title: "Rust Removal"}, {slug: "paint-stripping", title: "Paint Stripping"}, {slug: "powder-coating", title: "Powder Coating Preparation"}, {slug: "coating-removal", title: "Coating Removal"}],
    "heritage-restoration": [{slug: "rust-removal", title: "Rust Removal"}, {slug: "paint-stripping", title: "Paint Stripping"}, {slug: "coating-removal", title: "Coating Removal"}, {slug: "architectural-metalwork", title: "Architectural Metalwork"}],
    "grit-blasting": [{slug: "rust-removal", title: "Rust Removal"}, {slug: "paint-stripping", title: "Paint Stripping"}, {slug: "coating-removal", title: "Coating Removal"}, {slug: "powder-coating", title: "Powder Coating Preparation"}],
    "abrasive-blasting": [{slug: "rust-removal", title: "Rust Removal"}, {slug: "paint-stripping", title: "Paint Stripping"}, {slug: "coating-removal", title: "Coating Removal"}, {slug: "grit-blasting", title: "Grit Blasting"}],
    "surface-preparation": [{slug: "rust-removal", title: "Rust Removal"}, {slug: "paint-stripping", title: "Paint Stripping"}, {slug: "coating-removal", title: "Coating Removal"}, {slug: "powder-coating", title: "Powder Coating Preparation"}],
    "blast-cleaning": [{slug: "rust-removal", title: "Rust Removal"}, {slug: "paint-stripping", title: "Paint Stripping"}, {slug: "coating-removal", title: "Coating Removal"}, {slug: "surface-preparation", title: "Surface Preparation"}],
    "mobile-blasting": [{slug: "rust-removal", title: "Rust Removal"}, {slug: "paint-stripping", title: "Paint Stripping"}, {slug: "coating-removal", title: "Coating Removal"}, {slug: "surface-preparation", title: "Surface Preparation"}],
  };
  const relatedServices = relatedServicesMap[serviceId] || [];;

  // 1. Service Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    "name": svc.title,
    ...(SERVICE_ALTERNATE_NAMES[serviceId] ? { "alternateName": SERVICE_ALTERNATE_NAMES[serviceId] } : {}),
    "description": svc.description,
    "url": url,
    "image": svc.heroImage,
    "provider": {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      "name": BUSINESS_NAME,
      "telephone": PHONE,
      "email": EMAIL,
      "url": SITE_URL,
      "logo": { "@type": "ImageObject", "url": LOGO },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "GB",
        "addressRegion": "England"
      },
      "parentOrganization": {
        "@type": "Organization",
        "name": "Premier Blasting Ltd",
        "url": "https://www.premierblasting.co.uk"
      },
      "foundingDate": "2004",
      "sameAs": [
        "https://www.facebook.com/commercialshotblasting",
        "https://www.linkedin.com/company/commercial-shot-blasting",
        "https://www.premierblasting.co.uk"
      ]
    },
    "areaServed": [
      { "@type": "Country", "name": "United Kingdom" },
      { "@type": "AdministrativeArea", "name": "Bedfordshire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Berkshire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Bristol", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Buckinghamshire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Cambridgeshire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Cheshire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "County Durham", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Cumbria", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Derbyshire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "East Wales", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Essex", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Gloucestershire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Greater Manchester", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Hampshire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Herefordshire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Hertfordshire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Leicestershire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Lincolnshire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Merseyside", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Norfolk", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "North Devon", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Northamptonshire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Northumberland", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Nottinghamshire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Oxfordshire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Shropshire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Somerset", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "South Yorkshire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Staffordshire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Suffolk", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Surrey", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Tyne & Wear", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Warwickshire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "West Midlands", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "West Yorkshire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Wiltshire", "addressCountry": "GB" },
      { "@type": "AdministrativeArea", "name": "Worcestershire", "addressCountry": "GB" }
    ],
    "serviceType": "Shot Blasting & Surface Preparation",
    "category": "Industrial Surface Preparation",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${svc.title} Applications`,
      "itemListElement": svc.applications.map((app, i) => ({
        "@type": "OfferCatalog",
        "position": i + 1,
        "name": app
      }))
    },
    "offers": {
      "@type": "Offer",
      "name": `Free Quote for ${svc.title}`,
      "price": "0",
      "priceCurrency": "GBP",
      "description": "Free no-obligation site survey and quotation",
      "url": `${SITE_URL}/free-site-survey`,
      "availability": "https://schema.org/InStock"
    },
    "termsOfService": SITE_URL,
    "isRelatedTo": relatedServices.map((rs: {slug: string; title: string}) => ({
      "@type": "Service",
      "name": rs.title,
      "url": `${SITE_URL}/services/${rs.slug}`
    }))
  });

  // 2. FAQPage Schema — for top 10 services to earn featured snippets
  const top10Services = ['structural-steel-frames', 'rust-removal', 'intumescent-painting', 'mill-scale-removal', 'bridge-steelwork', 'factory-cladding', 'steel-containers', 'floor-preparation', 'powder-coating', 'fire-escapes', 'plant-machinery'];
  const schemaFaqs = [
    ...svc.faqs,
    ...(AEO_DECISION_ANSWERS_BY_SERVICE[serviceId]?.answers ?? []).map(({ question, answer }) => ({ question, answer })),
  ];
  if (schemaFaqs.length > 0 && top10Services.includes(serviceId)) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": schemaFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  } else if (schemaFaqs.length > 0) {
    // For non-top-10 services, still include FAQ schema but without FAQPage wrapper
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": schemaFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  // 3. HowTo Schema (process steps)
  if (svc.process.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": `How We Perform ${svc.title}`,
      "description": `Step-by-step process for our ${svc.title} service`,
      "image": svc.heroImage,
      "totalTime": "P1D",
      "supply": [
        { "@type": "HowToSupply", "name": "Shot blasting media" },
        { "@type": "HowToSupply", "name": "Containment equipment" },
        { "@type": "HowToSupply", "name": "Protective coatings" }
      ],
      "tool": [
        { "@type": "HowToTool", "name": "Mobile shot blasting unit" },
        { "@type": "HowToTool", "name": "Vacuum recovery system" },
        { "@type": "HowToTool", "name": "Surface profile gauges" }
      ],
      "step": svc.process.map(step => ({
        "@type": "HowToStep",
        "position": step.step,
        "name": step.title,
        "text": step.description
      }))
    });
  }

  // 4. BreadcrumbList Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": `${SITE_URL}/services` },
      { "@type": "ListItem", "position": 3, "name": svc.title, "item": url }
    ]
  });

  // 5. WebPage Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    "url": url,
    "name": `${svc.title} | ${BUSINESS_NAME}`,
    "description": svc.description,
    "isPartOf": { "@type": "WebSite", "@id": `${SITE_URL}/#website`, "name": BUSINESS_NAME, "url": SITE_URL },
    "about": { "@type": "Service", "@id": `${url}#service`, "name": svc.title },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": `${SITE_URL}/services` },
        { "@type": "ListItem", "position": 3, "name": svc.title, "item": url }
      ]
    },
    "inLanguage": "en-GB",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".hero-description", ".service-description"]
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "potentialAction": [{ "@type": "ReadAction", "target": [url] }]
  });

  // 6. Organization Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": BUSINESS_NAME,
    "url": SITE_URL,
    "logo": { "@type": "ImageObject", "url": LOGO },
    "telephone": PHONE,
    "email": EMAIL,
    "sameAs": [
      "https://premierblasting.co.uk",
      "https://www.facebook.com/commercialshotblasting",
      "https://www.linkedin.com/company/commercial-shot-blasting"
    ]
  });

  // 8. HowTo Schema — customer preparation steps (distinct from process HowTo)
  const prepSteps = servicePreparationSteps[serviceId] || servicePreparationSteps['default'];
  schemas.push({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Prepare for ${svc.title}`,
    "description": `What you need to do before our team arrives to carry out ${svc.title.toLowerCase()} at your site. Following these preparation steps ensures the job runs smoothly and on schedule.`,
    "image": svc.heroImage,
    "totalTime": "PT2H",
    "supply": [
      { "@type": "HowToSupply", "name": "Site access and clear working area" },
      { "@type": "HowToSupply", "name": "Contact details for site supervisor" }
    ],
    "tool": [
      { "@type": "HowToTool", "name": "Completed quote request or site survey" }
    ],
    "step": prepSteps.map((s: { title: string; text: string }, i: number) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": s.title,
      "text": s.text,
      "url": `${SITE_URL}/services/${serviceId}`
    }))
  });

  return schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n    ');
}

/**
 * Inject meta tags and JSON-LD into HTML template based on route
 * @param html - The HTML template string
 * @param url - The request URL
 * @returns Modified HTML with injected meta tags and JSON-LD
 */
function generateServiceAreasIndexSchemas(): string {
  const serviceAreasUrl = `${SITE_URL}/service-areas`;
  const locationList = [
    { slug: 'birmingham', name: 'Birmingham' },
    { slug: 'wolverhampton', name: 'Wolverhampton' },
    { slug: 'coventry', name: 'Coventry' },
    { slug: 'leicester', name: 'Leicester' },
    { slug: 'derby', name: 'Derby' },
    { slug: 'nottingham', name: 'Nottingham' },
    { slug: 'sheffield', name: 'Sheffield' },
    { slug: 'leeds', name: 'Leeds' },
    { slug: 'manchester', name: 'Manchester' },
    { slug: 'liverpool', name: 'Liverpool' },
    { slug: 'chester', name: 'Chester' },
    { slug: 'stoke-on-trent', name: 'Stoke-on-Trent' },
    { slug: 'shrewsbury', name: 'Shrewsbury' },
    { slug: 'worcester', name: 'Worcester' },
    { slug: 'hereford', name: 'Hereford' },
    { slug: 'gloucester', name: 'Gloucester' },
    { slug: 'bristol', name: 'Bristol' },
    { slug: 'cardiff', name: 'Cardiff' },
    { slug: 'wrexham', name: 'Wrexham' },
    { slug: 'oxford', name: 'Oxford' },
    { slug: 'swindon', name: 'Swindon' },
    { slug: 'milton-keynes', name: 'Milton Keynes' },
    { slug: 'northampton', name: 'Northampton' },
    { slug: 'peterborough', name: 'Peterborough' },
    { slug: 'cambridge', name: 'Cambridge' },
    { slug: 'norwich', name: 'Norwich' },
    { slug: 'ipswich', name: 'Ipswich' },
    { slug: 'lincoln', name: 'Lincoln' },
    { slug: 'chesterfield', name: 'Chesterfield' },
    { slug: 'stratford-upon-avon', name: 'Stratford-upon-Avon' },
  ];

  const schemas = [
    // 1. ItemList — enables sitelinks-style location list in Google SERPs
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${serviceAreasUrl}#itemlist`,
      "name": "Shot Blasting Service Areas",
      "description": "Professional mobile shot blasting services available nationwide. Browse all service areas.",
      "url": serviceAreasUrl,
      "numberOfItems": locationList.length,
      "itemListElement": locationList.map((loc, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": `Shot Blasting ${loc.name}`,
        "url": `${SITE_URL}/service-areas/${loc.slug}`,
        "item": {
          "@type": "Service",
          "name": `Shot Blasting ${loc.name}`,
          "url": `${SITE_URL}/service-areas/${loc.slug}`,
          "areaServed": {
            "@type": "City",
            "name": loc.name,
            "containedInPlace": { "@type": "Country", "name": "United Kingdom" }
          },
          "provider": {
            "@type": "LocalBusiness",
            "name": BUSINESS_NAME,
            "telephone": PHONE,
            "url": SITE_URL
          }
        }
      }))
    },
    // 2. WebPage
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${serviceAreasUrl}#webpage`,
      "url": serviceAreasUrl,
      "name": `Shot Blasting Service Areas | ${BUSINESS_NAME}`,
      "description": "Professional mobile shot blasting services nationwide. Browse all service areas covering the Midlands, North West, Yorkshire, South West, Wales, and more.",
      "isPartOf": {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "name": BUSINESS_NAME,
        "url": SITE_URL
      },
      "inLanguage": "en-GB"
    },
    // 3. BreadcrumbList
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Service Areas", "item": serviceAreasUrl }
      ]
    },
    // 4. Organization
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": BUSINESS_NAME,
      "url": SITE_URL,
      "telephone": PHONE,
      "email": EMAIL,
      "logo": { "@type": "ImageObject", "url": LOGO },
      "areaServed": locationList.map(loc => ({
        "@type": "City",
        "name": loc.name,
        "containedInPlace": { "@type": "Country", "name": "United Kingdom" }
      }))
    }
  ];

  return schemas
    .map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n    ');
}

function generateServicesIndexSchemas(): string {
  const servicesUrl = `${SITE_URL}/services`;
  const serviceList = [
    { id: 'structural-steel-frames', title: 'Structural Steel Frames Shot Blasting' },
    { id: 'steel-containers', title: 'Steel Container Shot Blasting' },
    { id: 'factory-cladding', title: 'Factory & Warehouse Cladding Shot Blasting' },
    { id: 'fire-escapes', title: 'Fire Escapes & External Stair Towers Shot Blasting' },
    { id: 'staircases', title: 'Internal Steel Staircases, Balustrades & Handrails Shot Blasting' },
    { id: 'bridge-steelwork', title: 'Bridge Steelwork Shot Blasting' },
    { id: 'ladders', title: 'Fixed Ladders & Step-Over Platforms Shot Blasting' },
    { id: 'warehouse-racking', title: 'Warehouse Racking & Pallet Rack Frames Shot Blasting' },
    { id: 'pipework', title: 'Process Pipework, Spools & Manifolds Shot Blasting' },
    { id: 'telecom-towers', title: 'Telecom Masts & Lattice Towers Shot Blasting' },
    { id: 'floor-preparation', title: 'Commercial Floor Shot Blasting & Concrete Floor Preparation' },
    { id: 'powder-coating', title: 'Shot Blasting & Powder Coating' },
    { id: 'commercial-radiators', title: 'Commercial Radiators Shot Blasting' },
    { id: 'commercial-vehicles', title: 'Commercial & Agricultural Vehicle Shot Blasting' },
    { id: 'steel-doors', title: 'Steel Doors & Roller Shutters Shot Blasting' },
    { id: 'steel-sheeting', title: 'Steel Sheeting Shot Blasting' },
    { id: 'steel-gates', title: 'Steel Gates & Railings Shot Blasting' },
    { id: 'plant-machinery', title: 'Plant & Machinery Shot Blasting' },
  ];

  const schemas = [
    // 1. ItemList — enables sitelinks-style service list in Google SERPs
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${servicesUrl}#itemlist`,
      "name": "Shot Blasting Services",
      "description": "Professional mobile shot blasting services for commercial and industrial applications nationwide.",
      "url": servicesUrl,
      "numberOfItems": serviceList.length,
      "itemListElement": serviceList.map((svc, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": svc.title,
        "url": `${SITE_URL}/services/${svc.id}`,
        "item": {
          "@type": "Service",
          "name": svc.title,
          "url": `${SITE_URL}/services/${svc.id}`,
          "provider": {
            "@type": "LocalBusiness",
            "name": BUSINESS_NAME,
            "telephone": PHONE,
            "url": SITE_URL
          }
        }
      }))
    },
    // 2. WebPage
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${servicesUrl}#webpage`,
      "url": servicesUrl,
      "name": `Shot Blasting Services | ${BUSINESS_NAME}`,
      "description": "Browse all 18 professional shot blasting services offered by Commercial Shot Blasting nationwide — from structural steel and containers to floor preparation and powder coating.",
      "isPartOf": {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "name": BUSINESS_NAME,
        "url": SITE_URL
      },
      "inLanguage": "en-GB"
    },
    // 3. BreadcrumbList
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": servicesUrl }
      ]
    },
    // 4. Organization
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": BUSINESS_NAME,
      "url": SITE_URL,
      "telephone": PHONE,
      "email": EMAIL,
      "logo": { "@type": "ImageObject", "url": LOGO },
      "areaServed": { "@type": "Country", "name": "United Kingdom" },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Shot Blasting Services",
        "itemListElement": serviceList.map((svc, i) => ({
          "@type": "Offer",
          "position": i + 1,
          "itemOffered": {
            "@type": "Service",
            "name": svc.title,
            "url": `${SITE_URL}/services/${svc.id}`
          }
        }))
      }
    }
  ];

  return schemas
    .map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n    ');
}

function generateHomepageSchemas(): string {
  const navItems = [
    { name: "Home", url: SITE_URL },
    { name: "Services", url: `${SITE_URL}/services` },
    { name: "Industries", url: `${SITE_URL}/industries` },
    { name: "Preparation & Cleanup", url: `${SITE_URL}/preparation-cleanup` },
    { name: "Our Work", url: `${SITE_URL}/our-work` },
    { name: "Service Areas", url: `${SITE_URL}/service-areas` },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: "About", url: `${SITE_URL}/about` },
    { name: "Contact", url: `${SITE_URL}/contact` },
  ];

  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    "name": BUSINESS_NAME,
    "url": SITE_URL,
    "telephone": PHONE,
    "email": EMAIL,
    "logo": { "@type": "ImageObject", "url": LOGO },
    "description": "Commercial shot blasting services for industrial and commercial projects nationwide.",
    "sameAs": [
      "https://premierblasting.co.uk",
      "https://www.facebook.com/commercialshotblasting",
      "https://www.linkedin.com/company/commercial-shot-blasting",
      GOOGLE_BUSINESS_PROFILE_URL,
    ],
    "parentOrganization": {
      "@type": "Organization",
      "name": "Premier Blasting Ltd",
      "url": "https://premierblasting.co.uk",
    },
  };

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "name": BUSINESS_NAME,
      "url": SITE_URL,
      "description": "Commercial shot blasting services for industrial and commercial projects nationwide.",
      "inLanguage": "en-GB",
      "publisher": { "@id": `${SITE_URL}/#organization` },
      "potentialAction": {
        "@type": "SearchAction",
        "target": { "@type": "EntryPoint", "urlTemplate": `${SITE_URL}/service-areas/{search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${SITE_URL}/#sitenavigation`,
      "name": "Site Navigation",
      "itemListElement": navItems.map((item, index) => ({
        "@type": "SiteNavigationElement",
        "position": index + 1,
        "name": item.name,
        "url": item.url,
      })),
    },
    {
      "@context": "https://schema.org",
      ...organization,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      "url": SITE_URL,
      "name": "Commercial Shot Blasting Services | Nationwide",
      "description": "Commercial shot blasting services nationwide for metal surface preparation, rust and coating removal, structural steel, cladding, containers and plant.",
      "isPartOf": { "@id": `${SITE_URL}/#website` },
      "about": { "@id": `${SITE_URL}/#service-shot-blasting` },
      "inLanguage": "en-GB",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${SITE_URL}/#service-shot-blasting`,
      "name": "Commercial Shot Blasting Services",
      "description": "Commercial shot blasting services nationwide for metal surface preparation, rust and coating removal, structural steel, cladding, containers and plant.",
      "serviceType": "Commercial shot blasting",
      "url": `${SITE_URL}/services`,
      "provider": { "@id": `${SITE_URL}/#organization` },
      "areaServed": { "@type": "Country", "name": "United Kingdom" },
    },
  ];

  return schemas
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .join("\n    ");
}

// Inline project data for SSR (mirrors client/src/data/recentProjects.ts)
const SSR_PROJECTS: Array<{ id: string; title: string; serviceSlug: string; serviceLabel: string; description: string; countySlugs: string[]; date: string }> = [
  { id: "structural-steel-staffordshire", title: "Structural Steel Frames — Industrial Unit", serviceSlug: "structural-steel-shot-blasting", serviceLabel: "Structural Steel Shot Blasting", description: "SA2.5 blast clean on 12 portal frame bays for a new industrial unit. Mill scale and fabrication residues removed ahead of intumescent coating.", countySlugs: ["staffordshire","west-midlands","warwickshire","worcestershire","shropshire"], date: "March 2025" },
  { id: "container-blasting-midlands", title: "Steel Container Fleet — Logistics Depot", serviceSlug: "container-shot-blasting", serviceLabel: "Container Shot Blasting", description: "Rust and old coatings removed from 18 shipping containers at a logistics depot. All containers returned to SA2.5 standard and recoated on-site.", countySlugs: ["west-midlands","staffordshire","warwickshire","leicestershire","northamptonshire"], date: "January 2025" },
  { id: "bridge-steelwork-north", title: "Bridge Steelwork — Footbridge Refurbishment", serviceSlug: "structural-steel-shot-blasting", serviceLabel: "Structural Steel Shot Blasting", description: "Full SA3 blast clean on a 40-metre footbridge. All girders, crossmembers, and parapet rails prepared for a 3-coat protective system.", countySlugs: ["south-yorkshire","west-yorkshire","county-durham","northumberland","tyne-wear","cumbria"], date: "December 2024" },
  { id: "floor-blasting-east", title: "Industrial Floor Preparation — Warehouse Extension", serviceSlug: "floor-shot-blasting", serviceLabel: "Floor Shot Blasting", description: "Concrete floor surface profiling across 3,200 m² of new warehouse extension. CSP 3–4 profile achieved for epoxy resin floor coating.", countySlugs: ["cambridgeshire","norfolk","suffolk","essex","hertfordshire","bedfordshire"], date: "November 2024" },
  { id: "fire-escape-northwest", title: "Fire Escape Restoration — Multi-Storey Office", serviceSlug: "fire-escape-shot-blasting", serviceLabel: "Fire Escape Shot Blasting", description: "Rust and failed coatings removed from a 6-storey external fire escape. Galvanizing prep completed over 3 days with building fully occupied.", countySlugs: ["greater-manchester","merseyside","cheshire"], date: "October 2024" },
  { id: "pipework-south", title: "Pipework & Steelwork — Water Treatment Facility", serviceSlug: "pipework-shot-blasting", serviceLabel: "Pipework Shot Blasting", description: "External blast clean on 850 metres of process pipework and support steelwork. SA2.5 standard achieved for a 3-coat epoxy coating system.", countySlugs: ["hampshire","surrey","oxfordshire","berkshire","wiltshire","gloucestershire"], date: "September 2024" },
  { id: "racking-east-midlands", title: "Warehouse Racking — Distribution Centre", serviceSlug: "racking-shot-blasting", serviceLabel: "Warehouse Racking Shot Blasting", description: "Shot blasting of 4,000 pallet positions of warehouse racking in situ. Rust and old powder coat removed; surfaces prepared for re-powder coating.", countySlugs: ["nottinghamshire","derbyshire","leicestershire","lincolnshire","northamptonshire"], date: "August 2024" },
  { id: "agricultural-equipment-midlands", title: "Agricultural Equipment — Farm Machinery Fleet", serviceSlug: "agricultural-shot-blasting", serviceLabel: "Agricultural Shot Blasting", description: "Rust removal and surface preparation on 14 pieces of farm machinery including trailers, ploughs, and spreaders.", countySlugs: ["shropshire","herefordshire","worcestershire","staffordshire","warwickshire"], date: "July 2024" },
  { id: "heritage-restoration-south", title: "Heritage Steelwork — Victorian Railway Bridge", serviceSlug: "heritage-shot-blasting", serviceLabel: "Heritage Shot Blasting", description: "Careful SA2.5 blast clean on a Grade II listed Victorian railway bridge. Decorative ironwork preserved; surfaces prepared for heritage-matched coating.", countySlugs: ["gloucestershire","wiltshire","somerset","north-devon","bristol"], date: "June 2024" },
  { id: "telecom-tower-north", title: "Telecom Tower — Mobile Mast Refurbishment", serviceSlug: "telecom-tower-shot-blasting", serviceLabel: "Telecom Tower Shot Blasting", description: "Full blast clean on a 45-metre telecom mast and associated steelwork. SA2.5 standard achieved; surfaces prepared for zinc-rich primer system.", countySlugs: ["northumberland","county-durham","tyne-wear","cumbria","south-yorkshire"], date: "May 2024" },
  { id: "machinery-east-england", title: "Plant & Machinery — Paper Mill Refurbishment", serviceSlug: "machinery-shot-blasting", serviceLabel: "Plant & Machinery Shot Blasting", description: "Blast clean on 22 pieces of paper mill machinery during planned shutdown. All surfaces prepared to SA2.5 for epoxy coating before recommissioning.", countySlugs: ["norfolk","suffolk","cambridgeshire","essex","lincolnshire"], date: "April 2024" },
  { id: "school-steelwork-bucks", title: "School Extension Steelwork — Academy Building", serviceSlug: "structural-steel-shot-blasting", serviceLabel: "Structural Steel Shot Blasting", description: "SA2.5 blast clean on 8 portal frames and 120 metres of purlins for a new school sports hall extension. Fabrication primer removed ahead of intumescent coating.", countySlugs: ["buckinghamshire","hertfordshire","bedfordshire","oxfordshire","berkshire"], date: "March 2024" },
  { id: "wind-turbine-durham", title: "Wind Turbine Tower Sections — Renewable Energy Site", serviceSlug: "structural-steel-shot-blasting", serviceLabel: "Structural Steel Shot Blasting", description: "Full SA3 blast clean on 6 tubular tower sections (18 m each) at a wind farm maintenance depot. Mill scale and weathering removed for zinc thermal spray.", countySlugs: ["durham","county-durham","northumberland","tyne-and-wear","cumbria"], date: "February 2024" },
  { id: "shipyard-crane-tyneside", title: "Shipyard Crane Refurbishment — Port Facility", serviceSlug: "machinery-shot-blasting", serviceLabel: "Plant & Machinery Shot Blasting", description: "Blast clean on a 35-tonne gantry crane including jib, trolley, and support legs. Heavy corrosion and marine paint removed to SA2.5 for epoxy primer system.", countySlugs: ["tyne-and-wear","tyne-wear","northumberland","county-durham","durham"], date: "December 2023" },
];

function getSSRProjectsForCounty(countySlug: string, limit = 3): typeof SSR_PROJECTS {
  const matches = SSR_PROJECTS.filter(p => p.countySlugs.includes(countySlug));
  return matches.slice(0, limit);
}

function generateServiceAreaBodyHTML(locationSlug: string): string {
  const loc = locationData[locationSlug];
  if (!loc) return "";

  const name = loc.name;
  const county = loc.county;
  const region = loc.region;
  const description = loc.description;
  const faqs = loc.faqs;
  const countySlug = loc.countySlug;
  const tierAPillarResources = getTierAPillarResources(locationSlug, (loc as { industries?: string[] }).industries ?? []);
  const tierAPillarHtml = tierAPillarResources.length > 0
    ? `<section aria-label="Commercial Project Planning Resources"><h2>Specialist Surface-Preparation Resources for ${escHtml(name)}</h2><p>For larger fabrication, industrial refurbishment, or cladding programmes, these planning hubs help define the information to prepare before requesting a Site Visit.</p><ul>${tierAPillarResources.map((resource) => `<li><a href="${SITE_URL}${resource.href}">${escHtml(resource.title)}</a> — ${escHtml(resource.description)}</li>`).join("")}</ul></section>`
    : "";

  const services = [
    "Structural steel and fabricated sections — frames, beams, columns, trusses and connections",
    "Factory and warehouse cladding — existing-coating and access planning",
    "Containers and storage steelwork — handling, corrosion and recoating inputs",
    "Industrial floor preparation — substrate, access and specified-finish discussion",
    "Rust and mill scale removal — condition review before the next protective stage",
    "Plant, machinery and pipework — working-area, interfaces and containment planning",
    "Fire escapes and staircases — safe access and protective-finish planning",
    "Warehouse racking and mezzanines — operational-interface and access review",
    "Preparation before fire-protective coating — specification and handover planning"
  ];

  const whyUs = [
    { title: `Commercial scope discussion in ${name}`, text: `A Site Visit can establish the asset, condition, access, working area, neighbouring operations and intended next stage for the individual project.` },
    { title: "Specified surface preparation", text: `The appropriate preparation standard, surface profile and inspection requirements are agreed against the applicable coating specification and project requirements.` },
    { title: "Relevant commercial routes", text: `Explore the specialist routes for structural steel, cladding, containers, floors, process assets and access steel to prepare a focused discussion.` },
    { title: "Prompt contact", text: `Share photographs, drawings or dimensions where available, access notes and the intended next stage. We’ll get back to you promptly.` },
    { title: `Area and county navigation`, text: `Use the county and nearby-area links to explore the commercial coverage information for ${name} and ${region}.` }
  ];

  // Use concise, project-specific FAQs rather than generic availability or outcome claims.
  const generatedFaqs = [
    { question: `What commercial surface-preparation discussions can start in ${name}?`, answer: `A commercial discussion can cover structural steel, factory cladding, containers, floors, plant, pipework and access steel. The suitable route depends on the asset, its current condition, access, containment, surrounding operations and the intended next stage.` },
    { question: `What information helps with a ${name} project enquiry?`, answer: `Photographs, drawings or dimensions where available, the asset condition, working-area and access notes, neighbouring operations, any applicable coating specification and the intended next stage help define an initial discussion.` },
    { question: `Can a preparation standard be discussed for work in ${name}?`, answer: `Yes. A specified preparation standard or surface profile should be considered against the individual asset, coating system, inspection requirements and project constraints. It is not assumed before those requirements are reviewed.` },
    { question: `Can blasting be planned around an operating commercial site?`, answer: `The Site Visit discussion can consider access, working area, material movement, containment, adjacent operations and the intended programme. The practical method and sequencing are agreed for the individual project.` },
    { question: `What determines the likely programme and cost?`, answer: `Programme and cost depend on the asset, condition, dimensions, access, containment, preparation requirement, coating handover and project interfaces. These inputs are reviewed before a project-specific scope is agreed.` },
    { question: `What happens after surface preparation?`, answer: `The next stage may include inspection, primer, a specified protective coating or another agreed handover. The correct sequence depends on the relevant specification and the individual project.` }
  ];
  // Bespoke legacy FAQs have not been evidence-reviewed for this all-area rollout.
  // Every local route uses the same factual planning answers until individual claims
  // have been separately approved.
  const localIntentCopy = getPriorityLocalNearMeCopy(locationSlug, name);
  const allFaqs = getPriorityLocalNearMeFaqs(locationSlug, name);
  const localHeroImage = getLocalAreaHeroImage(locationSlug, name);
  const faqHtml = allFaqs.map((faq) => `
    <div class="ssr-faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <h3 itemprop="name"><span class="ssr-q">Q:</span> ${escHtml(faq.question)}</h3>
      <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <p itemprop="text">${escHtml(faq.answer)}</p>
      </div>
    </div>`).join("");

  const servicesHtml = services.map(s => `<li class="ssr-service-item">${escHtml(s)}</li>`).join("");
  const whyHtml = whyUs.map(w => `
    <div class="ssr-why-item">
      <h3>${escHtml(w.title)}</h3>
      <p>${escHtml(w.text)}</p>
    </div>`).join("");

  // Nearby towns from same county (up to 12, excluding current)
  const nearbyTowns = Object.values(locationData)
    .filter((l: any) => l.countySlug === countySlug && l.slug !== locationSlug)
    .slice(0, 12);
  const nearbyHtml = nearbyTowns.length > 0
    ? `<section aria-label="Nearby Areas">
      <h2>Shot Blasting Services Near ${escHtml(name)}</h2>
      <p>Our mobile shot blasting services cover ${escHtml(name)} and all surrounding towns throughout ${escHtml(county)}.</p>
      <ul>${nearbyTowns.map((t: any) => `<li><a href="${SITE_URL}/service-areas/${t.slug}">Shot Blasting Services in ${escHtml(t.name)}</a></li>`).join("")}</ul>
      <p><a href="${SITE_URL}/counties/${countySlug}">View all shot blasting services in ${escHtml(county)}</a></p>
    </section>`
    : "";
  const priorityCommercialHtml = (() => {
    const priorityContent = priorityTownCommercialContent[locationSlug];
    const projectEvidence = getAreaProjectEvidence(locationSlug);
    if (!priorityContent && !projectEvidence) return "";
    const featuredCaseStudyHtml = projectEvidence
      ? `<aside aria-label="${escHtml(projectEvidence.eyebrow)}"><img src="${escHtml(projectEvidence.imageSrc)}" alt="${escHtml(projectEvidence.imageAlt)}" /><h3>${escHtml(projectEvidence.title)}</h3><p>${escHtml(projectEvidence.description)}</p><p><a href="${SITE_URL}${projectEvidence.href}">${escHtml(projectEvidence.ctaLabel)}</a></p></aside>`
      : "";
    if (!priorityContent) return `<section aria-label="Project evidence">${featuredCaseStudyHtml}</section>`;
    return `<section aria-label="Commercial project context"><h2>${escHtml(priorityContent.title)}</h2>${priorityContent.paragraphs.map((paragraph) => `<p>${escHtml(paragraph)}</p>`).join("")}${featuredCaseStudyHtml}<ul>${priorityContent.links.map((link) => `<li><a href="${SITE_URL}${link.href}">${escHtml(link.title)}</a> — ${escHtml(link.description)}</li>`).join("")}</ul></section>`;
  })();

  const commercialProjectPlanningHtml = `<section aria-label="Commercial project planning">
    <h2>What We Can Help You Plan in ${escHtml(name)}</h2>
    <p>A useful commercial Site Visit starts with the asset, its condition, access, working area, surrounding operations and the intended next stage. The following routes explain the information that helps define a surface-preparation discussion; a final method, specification, programme or price must be agreed for the individual project.</p>
    <ul>
      <li><a href="${SITE_URL}/services/structural-steel-frames">Structural steel and fabricated sections</a> — frames, beams, columns, connections and fabrication packages.</li>
      <li><a href="${SITE_URL}/intumescent-paint-for-steel">Preparation before protective coatings</a> — preparation, primer, inspection and intumescent-coating handover planning.</li>
      <li><a href="${SITE_URL}/factory-cladding-restoration">Factory cladding and industrial buildings</a> — existing coating condition, access and neighbouring-operations review.</li>
      <li><a href="${SITE_URL}/container-restoration-storage-steelwork">Containers and storage steelwork</a> — quantity, handling, corrosion and recoating inputs.</li>
      <li><a href="${SITE_URL}/process-pipework-spools-surface-preparation">Pipework, spools and process assets</a> — access, interfaces, containment and next-stage planning.</li>
      <li><a href="${SITE_URL}/external-staircases">Access steel, stairs and fire escapes</a> — condition, safe access and protective-finish planning.</li>
    </ul>
    <p><a href="${SITE_URL}/site-survey">Request A Site Visit</a> to discuss the asset, access, surface condition and intended next stage.</p>
  </section>`;

  return `
<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;">
  <nav aria-label="Breadcrumb">
    <ol itemscope itemtype="https://schema.org/BreadcrumbList">
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="${SITE_URL}/"><span itemprop="name">Home</span></a>
        <meta itemprop="position" content="1" />
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="${SITE_URL}/service-areas"><span itemprop="name">Service Areas</span></a>
        <meta itemprop="position" content="2" />
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="${SITE_URL}/counties/${countySlug}"><span itemprop="name">${escHtml(county)}</span></a>
        <meta itemprop="position" content="3" />
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <span itemprop="name">${escHtml(name)}</span>
        <meta itemprop="position" content="4" />
      </li>
    </ol>
  </nav>
  <main itemscope itemtype="https://schema.org/WebPage">
    <header>
      <img src="${escHtml(localHeroImage.src)}" alt="${escHtml(localHeroImage.alt)}" width="1600" height="900" decoding="async" />
      <h1>${escHtml(localIntentCopy.heroHeading)}</h1>
      <p>${escHtml(localIntentCopy.heroDescription)}</p>
      ${localIntentCopy.queryAnswer ? `<section aria-label="${escHtml(name)} near-me answer"><h2>${escHtml(localIntentCopy.queryAnswer.heading)}</h2><p>${escHtml(localIntentCopy.queryAnswer.body)}</p></section>` : ""}
      <p>Commercial Shot Blasting supports enquiries for structural steel, cladding, containers, floors, process assets, plant and access steel across ${escHtml(name)} and ${escHtml(county)}. A suitable route depends on the asset, condition, access, working area, containment needs, surrounding operations and intended next stage.</p>
      <p>We work nationwide. This ${escHtml(name)} page provides local planning context for the area; projects elsewhere in the UK can be discussed in the same way.</p>
      <p>Preparation standard, surface profile, inspection and coating handover requirements are assessed against the individual project and applicable specification.</p>
      <p>Call <a href="tel:${PHONE.replace(/\s/g, "")}">${PHONE}</a> or <a href="${SITE_URL}/site-survey">Request A Site Visit</a> to discuss the project inputs. We’ll get back to you promptly.</p>
      ${countyContext[countySlug] ? `<p><em>${escHtml(countyContext[countySlug])}</em></p>` : ""}
    </header>
    ${commercialProjectPlanningHtml}
    ${priorityCommercialHtml}
    <section aria-label="Why Choose Us">
      <h2>Why Choose Our Shot Blasting Services in ${escHtml(name)}?</h2>
      <p>Use this page to prepare a focused commercial surface-preparation discussion for ${escHtml(name)}. Requirements are confirmed against the individual asset, access, specification and next-stage handover.</p>
      ${whyHtml}
    </section>
    <section aria-label="Services">
      <h2>Shot Blasting Services Available in ${escHtml(name)}</h2>
      <p>Explore the commercial surface-preparation routes that may be relevant to assets in ${escHtml(name)} and ${escHtml(county)}:</p>
      <ul>
        <li><a href="${SITE_URL}/services/structural-steel-shot-blasting">Structural Steel Shot Blasting in ${escHtml(name)}</a></li>
        <li><a href="${SITE_URL}/services/container-shot-blasting">Container Shot Blasting in ${escHtml(name)}</a></li>
        <li><a href="${SITE_URL}/services/factory-cladding-shot-blasting">Factory Cladding Shot Blasting in ${escHtml(name)}</a></li>
        <li><a href="${SITE_URL}/services/floor-shot-blasting">Industrial Floor Preparation in ${escHtml(name)}</a></li>
        <li><a href="${SITE_URL}/services/fire-escape-shot-blasting">Fire Escape Shot Blasting in ${escHtml(name)}</a></li>
        <li><a href="${SITE_URL}/services/pipework-shot-blasting">Pipework &amp; Steelwork Blasting in ${escHtml(name)}</a></li>
        <li><a href="${SITE_URL}/services/agricultural-shot-blasting">Agricultural Equipment Blasting in ${escHtml(name)}</a></li>
        <li><a href="${SITE_URL}/services/telecom-tower-shot-blasting">Telecom Tower Shot Blasting in ${escHtml(name)}</a></li>
        <li><a href="${SITE_URL}/services/machinery-shot-blasting">Plant &amp; Machinery Blasting in ${escHtml(name)}</a></li>
        <li><a href="${SITE_URL}/services/racking-shot-blasting">Warehouse Racking Blasting in ${escHtml(name)}</a></li>
        <li><a href="${SITE_URL}/services/marine-shot-blasting">Marine &amp; Offshore Blasting in ${escHtml(name)}</a></li>
        <li><a href="${SITE_URL}/services/heritage-shot-blasting">Heritage &amp; Restoration Blasting in ${escHtml(name)}</a></li>
        <li><a href="${SITE_URL}/services/intumescent-painting">Intumescent Painting Preparation in ${escHtml(name)}</a></li>
      </ul>
      <p><a href="${SITE_URL}/services">View commercial surface-preparation services</a></p>
    </section>
    ${tierAPillarHtml}
    <section aria-label="Popular Services Near">
      <h2>Popular Shot Blasting Services near ${escHtml(name)}</h2>
      <ul>
        <li><a href="${SITE_URL}/services/structural-steel-shot-blasting">Structural Steel Shot Blasting in ${escHtml(name)}</a></li>
        <li><a href="${SITE_URL}/services/factory-cladding-shot-blasting">Factory Cladding Shot Blasting in ${escHtml(name)}</a></li>
        <li><a href="${SITE_URL}/services/floor-shot-blasting">Floor Shot Blasting in ${escHtml(name)}</a></li>
        <li><a href="${SITE_URL}/services/intumescent-painting">Intumescent Painting Preparation in ${escHtml(name)}</a></li>
      </ul>
    </section>
    <section aria-label="What to Expect">
      <h2>Shot Blasting Services in ${escHtml(name)} — What to Expect</h2>
      <p>A commercial surface-preparation discussion is scoped around the individual asset rather than a fixed template.</p>
      <ol>
        <li><strong>Step 1 — Define the asset and condition:</strong> Share photographs, dimensions or drawings where available, the current condition, access arrangement and working-area constraints.</li>
        <li><strong>Step 2 — Review interfaces and the intended next stage:</strong> Discuss containment, nearby operations, inspection requirements and the planned coating, repair or handover stage.</li>
        <li><strong>Step 3 — Agree a project-specific route:</strong> The appropriate preparation requirement, sequencing, programme and scope are agreed for the individual project.</li>
      </ol>
    </section>
    <section aria-label="Industries We Serve">
      <h2>Industries We Serve with Shot Blasting Services in ${escHtml(name)}</h2>
      <p>These industry resources explain common surface-preparation considerations; the suitable approach remains project-specific:</p>
      <ul>
        <li><a href="${SITE_URL}/industries/construction">Construction &amp; Structural Steel — Shot Blasting Services in ${escHtml(name)}</a></li>
        <li><a href="${SITE_URL}/industries/manufacturing">Manufacturing &amp; Engineering — Shot Blasting Services in ${escHtml(name)}</a></li>
        <li><a href="${SITE_URL}/industries/marine">Marine &amp; Offshore — Shot Blasting Services in ${escHtml(name)}</a></li>
        <li><a href="${SITE_URL}/industries/agriculture">Agriculture &amp; Farming — Shot Blasting Services in ${escHtml(name)}</a></li>
      </ul>
      <p><a href="${SITE_URL}/industries">View all industries we serve with shot blasting services</a></p>
    </section>
    <section aria-label="Frequently Asked Questions" itemscope itemtype="https://schema.org/FAQPage">
      <h2>FAQs About Shot Blasting in ${escHtml(name)}</h2>
      ${faqHtml}
    </section>
    ${nearbyHtml}
    <section aria-label="Get a Quote">
      <h2>Get a Quote for Shot Blasting in ${escHtml(name)}</h2>
      <p>For <a href="${SITE_URL}/services/structural-steel-shot-blasting">structural steel preparation</a>, <a href="${SITE_URL}/services/factory-cladding-shot-blasting">factory cladding restoration</a>, <a href="${SITE_URL}/services/floor-shot-blasting">floor preparation</a> or <a href="${SITE_URL}/services/rust-removal">rust and coating removal</a>, share the asset, condition, access, relevant specification and intended next stage.</p>
      <p>Request A Site Visit or call and we’ll get back to you promptly.</p>
      <p>Phone: <a href="tel:${PHONE.replace(/\s/g, "")}">${PHONE}</a></p>
      <p>Email: <a href="mailto:info@commercialshotblasting.co.uk">info@commercialshotblasting.co.uk</a></p>
    </section>
    <section aria-label="Further Reading">
      <h2>Further Reading — Shot Blasting Guides &amp; Resources</h2>
      <ul>
        <li><a href="${SITE_URL}/blog/shot-blasting-structural-steel-guide">The Complete Guide to Shot Blasting Structural Steel</a></li>
        <li><a href="${SITE_URL}/blog/why-shot-blasting-essential-before-intumescent-painting">Why Shot Blasting is Essential Before Intumescent Painting</a></li>
        <li><a href="${SITE_URL}/blog/how-much-does-shot-blasting-cost-uk">How Much Does Shot Blasting Cost in the UK? (2025 Price Guide)</a></li>
        <li><a href="${SITE_URL}/blog/shot-blasting-vs-sandblasting-difference">Shot Blasting vs Sandblasting: What's the Difference?</a></li>
        <li><a href="${SITE_URL}/blog/shot-blasting-structural-steel-standards-certification">Shot Blasting for Structural Steel: Standards, Certification, and Compliance</a></li>
      </ul>
    </section>
  </main>
</div>`;
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function injectMetaTags(html: string, url: string, content?: HtmlContentContext): Promise<string> {
  const pathname = getHtmlPath(url);
  const detail = getContentDetail(url);
  // Request-scoped content from the HTML gate avoids duplicate reads and outage races.
  if (/^\/(?:blog|glossary)\//.test(pathname ?? url)) {
    if (!detail) return renderHtmlRouteError(404);
    if (!content) {
      const decision = await resolveHtmlRoute(detail.canonical);
      if (decision.state === "unavailable") return renderHtmlRouteError(503);
      if (decision.state !== "found" || !decision.content) return renderHtmlRouteError(404);
      content = decision.content;
    }
    if (content.kind !== detail.kind || content.slug !== detail.slug) return renderHtmlRouteError(404);
  }
  // Only the scoped content/preparation branches use query-independent pathname matching.
  if (pathname && (/^\/(?:blog|glossary)(?:\/|$)/.test(pathname) || pathname === "/preparation-cleanup")) url = pathname;
  // Check if this is the homepage
  if (url === '/' || url === '') {
    let modifiedHtml = html
      .replace(/<meta\s+name="description"[^>]*>/gi, '')
      .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<link\s+rel="canonical"[^>]*>/gi, '');
    const homeMetaTags = `
    <title>Commercial Shot Blasting Services | Nationwide | ${BUSINESS_NAME}</title>
    <link rel="canonical" href="${SITE_URL}/" />
    <link rel="alternate" hreflang="en-gb" href="${SITE_URL}/" />
    <link rel="alternate" hreflang="en" href="${SITE_URL}/" />
    <meta name="description" content="Commercial shot blasting services nationwide for metal surface preparation, rust and coating removal, structural steel, cladding, containers and plant. Get in touch." />
    <meta property="og:title" content="Commercial Shot Blasting Services | Nationwide | ${BUSINESS_NAME}" />
    <meta property="og:description" content="Commercial shot blasting services nationwide for metal surface preparation, rust and coating removal, structural steel, cladding, containers and plant." />
    <meta property="og:url" content="${SITE_URL}/" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${LOGO}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Commercial Shot Blasting Services | Nationwide | ${BUSINESS_NAME}" />
    <meta name="twitter:description" content="Commercial shot blasting services nationwide for metal surface preparation, rust and coating removal, structural steel, cladding, containers and plant." />
    <meta name="twitter:image" content="${LOGO}" />
    <meta name="twitter:image:alt" content="Commercial shot blasting services for industrial and commercial projects nationwide" />
    ${generateHomepageSchemas()}
  `;
    modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, homeMetaTags);
    const featuredHBFilmContent = `<section id="ssr-hb-tunnelling-project-film"><p>${HOMEPAGE_HB_FILM.eyebrow}</p><h2>${HOMEPAGE_HB_FILM.heading}</h2><p>${HOMEPAGE_HB_FILM.description}</p><figure><img src="${SITE_URL}${HOMEPAGE_HB_FILM.poster}" alt="${HOMEPAGE_HB_FILM.posterAlt}" width="1600" height="900" loading="lazy" /><figcaption>HB Tunnelling Doncaster full project film with music.</figcaption></figure>${HOMEPAGE_HB_FILM.facts.map(fact => `<h3>${fact.heading}</h3><p>${fact.description}</p>`).join('')}<p><a href="${SITE_URL}${HOMEPAGE_HB_FILM.caseStudyPath}">Read the HB Tunnelling case study</a></p></section>`;
    const homepageBuyerContent = Object.entries(HOMEPAGE_CUSTOMER_COPY).map(([key, copy]) => {
      const heading = "heading" in copy ? copy.heading : "Case Studies";
      const paragraphs = Object.entries(copy).filter(([field]) => ["intro", "detail", "capabilityIntro"].includes(field));
      return `<section id="ssr-home-${escHtml(key)}"><h2>${escHtml(heading)}</h2>${paragraphs.map(([, text]) => `<p>${escHtml(text)}</p>`).join("")}</section>`;
    }).join("") + `<section id="ssr-home-faq"><h2>Planning a Commercial Blasting Project?</h2>${HOMEPAGE_FAQS.map(faq => `<h3>${escHtml(faq.question)}</h3><p>${escHtml(faq.answer)}</p>`).join("")}</section>`;
    modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="https://commercialshotblasting.co.uk/">Home</a> | <a href="https://commercialshotblasting.co.uk/services">Services</a> | <a href="https://commercialshotblasting.co.uk/service-areas">Service Areas</a> | <a href="https://commercialshotblasting.co.uk/about">About</a> | <a href="https://commercialshotblasting.co.uk/contact">Contact</a> | <a href="https://commercialshotblasting.co.uk/blog">Blog</a> | <a href="https://commercialshotblasting.co.uk/industries">Industries</a> | <a href="https://commercialshotblasting.co.uk/glossary">Glossary</a> | <a href="https://commercialshotblasting.co.uk/contact">Get In Touch</a> | <a href="${GOOGLE_BUSINESS_PROFILE_URL}">View our Google Business Profile</a></nav><main><h1>Commercial Shot Blasting Services in the UK</h1><p>End-to-end shot blasting and painting for major commercial and industrial projects nationwide. Our mobile teams prepare and coat your steelwork on site — CHAS Elite, fully insured, with full RAMS.</p><ul><li>Fully Insured</li><li>Full RAMS Supplied</li><li>Rapid Deployment</li><li>21 Teams Nationwide</li><li>End-To-End Delivery</li><li>CHAS Elite</li></ul><ul><li><a href="https://commercialshotblasting.co.uk/services/structural-steel-frames">Structural Steel Frames Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/steel-containers">Steel Container Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/factory-cladding">Factory &amp; Warehouse Cladding Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/fire-escapes">Fire Escape Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/staircases">Staircase Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/bridge-steelwork">Bridge Steelwork Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/ladders">Ladder Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/warehouse-racking">Warehouse Racking Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/pipework">Pipework Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/floor-preparation">Floor Preparation Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/rust-removal">Rust Removal Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/mill-scale-removal">Mill Scale Removal</a></li><li><a href="https://commercialshotblasting.co.uk/services/paint-stripping">Paint Stripping Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/coating-removal">Coating Removal Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/marine-shot-blasting">Marine Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk${HOMEPAGE_INTUMESCENT_SERVICE.link}">${HOMEPAGE_INTUMESCENT_SERVICE.title}</a><p>${HOMEPAGE_INTUMESCENT_SERVICE.desc}</p></li><li><a href="https://commercialshotblasting.co.uk/services/commercial-vehicles">Commercial Vehicle Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/agricultural-shot-blasting">Agricultural Shot Blasting</a></li></ul>${featuredHBFilmContent}${homepageBuyerContent}<p><a href="https://commercialshotblasting.co.uk/commercial-shot-blasting-sandblasting">Commercial shot blasting and sandblasting planning guide</a> | <a href="https://commercialshotblasting.co.uk/service-areas">Find a service area</a></p></main></div>`);
    return modifiedHtml;
  }

  // Check if this is the /services index page
  if (url === '/services' || url === '/services/') {
    const servicesUrl = `${SITE_URL}/services`;
    let modifiedHtml = html
      .replace(/<meta\s+name="description"[^>]*>/gi, '')
      .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<link\s+rel="canonical"[^>]*>/gi, '');
    const metaTags = `
    <title>Commercial Shot Blasting &amp; Sandblasting Services | Nationwide | ${BUSINESS_NAME}</title>
    <link rel="canonical" href="${servicesUrl}" />
    <link rel="alternate" hreflang="en-gb" href="${servicesUrl}" />
    <link rel="alternate" hreflang="en" href="${servicesUrl}" />
    <meta name="description" content="Commercial shot blasting and sandblasting services nationwide for structural steel, cladding, containers, floor preparation, rust removal, plant and machinery. Request A Site Visit." />
    <meta property="og:title" content="Commercial Shot Blasting &amp; Sandblasting Services | Nationwide | ${BUSINESS_NAME}" />
    <meta property="og:description" content="Commercial shot blasting and sandblasting services nationwide for structural steel, cladding, containers, floor preparation, rust removal, plant and machinery." />
    <meta property="og:url" content="${servicesUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${LOGO}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Commercial Shot Blasting &amp; Sandblasting Services | Nationwide | ${BUSINESS_NAME}" />
    <meta name="twitter:description" content="Commercial shot blasting and sandblasting services nationwide for structural steel, cladding, containers, floor preparation, rust removal, plant and machinery." />
    <meta name="twitter:image" content="${LOGO}" />
    <meta name="twitter:image:alt" content="Shot blasting services UK — 18 commercial and industrial services by Commercial Shot Blasting" />
    ${generateServicesIndexSchemas()}
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
      {"@type":"Question","name":"What shot blasting services do you offer?","acceptedAnswer":{"@type":"Answer","text":"We offer 18 specialist shot blasting services including structural steel frames, factory and warehouse cladding, steel containers, floor preparation, fire escapes, staircases, bridge steelwork, warehouse racking, process pipework, telecom masts, commercial radiators, commercial vehicles, steel doors, steel sheeting, steel gates, plant and machinery, and combined shot blasting and powder coating."}},
      {"@type":"Question","name":"Do you offer nationwide shot blasting services?","acceptedAnswer":{"@type":"Answer","text":"Yes. Our mobile shot blasting services work nationwide. We travel directly to your site, so there is no need to transport your materials. We regularly work across the Midlands, North West, Yorkshire, South East, South West, Wales, Scotland and Northern Ireland."}},
      {"@type":"Question","name":"What blast standard do your shot blasting services achieve?","acceptedAnswer":{"@type":"Answer","text":"All our shot blasting services are carried out to SA2.5 near white metal or SA3 white metal as specified. These are internationally recognised standards (ISO 8501-1) that define the cleanliness of the blasted surface and are required by most protective coating manufacturers."}},
      {"@type":"Question","name":"How much do shot blasting services cost?","acceptedAnswer":{"@type":"Answer","text":"The cost of shot blasting services depends on the surface area, material type, blast standard required, and site location. We provide free, no-obligation quotes for all projects. Call 07970 566409 or use our online quote form to get a price."}},
      {"@type":"Question","name":"How should I plan a shot blasting enquiry?","acceptedAnswer":{"@type":"Answer","text":"Share the asset, access, surface condition and intended next stage when you contact us. We’ll get back to you promptly to discuss a project-specific route."}}
    ]}
    </script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"HowTo","name":"How to Get a Shot Blasting Services Quote","description":"Getting a quote for shot blasting services from Commercial Shot Blasting is straightforward. Follow these four steps to book your mobile shot blasting service nationwide.","supply":[{"@type":"HowToSupply","name":"Site access for survey"},{"@type":"HowToSupply","name":"Details of surfaces to be blasted"}],"step":[
      {"@type":"HowToStep","position":1,"name":"Call or Submit an Online Quote Request","text":"Contact us by calling 07970 566409 or by completing the online quote form. Describe the surfaces, location and intended next stage; we’ll get back to you promptly.","url":"${SITE_URL}/contact"},
      {"@type":"HowToStep","position":2,"name":"Receive a Free Site Survey","text":"We arrange a free, no-obligation site visit to assess the surfaces, confirm the blast standard required (SA2.5 or SA3), and provide an accurate written quote. There is no charge for the site survey.","url":"${SITE_URL}/free-site-survey"},
      {"@type":"HowToStep","position":3,"name":"Mobile Unit Arrives On-Site","text":"Our fully equipped mobile shot blasting unit travels directly to your site on the agreed date. We bring all equipment, abrasive media, and containment — no need to transport your materials or hire additional equipment.","url":"${SITE_URL}/services"},
      {"@type":"HowToStep","position":4,"name":"SA2.5/SA3 Finish Delivered and Site Cleared","text":"We complete the shot blasting to your specified standard — typically SA2.5 near white metal — and carry out a full site cleanup before leaving. Your surfaces are ready for protective coating immediately after our visit.","url":"${SITE_URL}/services"}
    ]}
    </script>
  `;
    modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, metaTags);
    modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="https://commercialshotblasting.co.uk/">Home</a> | <a href="https://commercialshotblasting.co.uk/services">Services</a> | <a href="https://commercialshotblasting.co.uk/service-areas">Service Areas</a> | <a href="https://commercialshotblasting.co.uk/about">About</a> | <a href="https://commercialshotblasting.co.uk/contact">Contact</a> | <a href="https://commercialshotblasting.co.uk/blog">Blog</a> | <a href="https://commercialshotblasting.co.uk/industries">Industries</a> | <a href="https://commercialshotblasting.co.uk/glossary">Glossary</a> | <a href="https://commercialshotblasting.co.uk/site-survey">Free Site Survey</a></nav><main><h1>Shot Blasting Services UK</h1><p>Professional mobile shot blasting services for structural steel, factory cladding, fire escapes, staircases, pipework, containers, vehicles and more. SA2.5 and SA3 standards. Free quotes nationwide.</p><ul><li><a href="https://commercialshotblasting.co.uk/services/structural-steel-frames">Structural Steel Frames Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/steel-containers">Steel Container Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/factory-cladding">Factory &amp; Warehouse Cladding Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/fire-escapes">Fire Escape Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/staircases">Staircase Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/bridge-steelwork">Bridge Steelwork Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/ladders">Ladder Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/warehouse-racking">Warehouse Racking Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/pipework">Pipework Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/floor-preparation">Floor Preparation Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/rust-removal">Rust Removal Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/mill-scale-removal">Mill Scale Removal</a></li><li><a href="https://commercialshotblasting.co.uk/services/paint-stripping">Paint Stripping Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/coating-removal">Coating Removal Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/marine-shot-blasting">Marine Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/intumescent-painting">Intumescent Painting</a></li><li><a href="https://commercialshotblasting.co.uk/services/commercial-vehicles">Commercial Vehicle Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/services/agricultural-shot-blasting">Agricultural Shot Blasting</a></li></ul></main></div>`);
    modifiedHtml = modifiedHtml.replace("</main></div>", `<section aria-label="Commercial Project Planning"><h2>Commercial Project Planning Guides</h2><ul><li><a href="${SITE_URL}/services/structural-steel-frames">Structural steel shot blasting</a> — <a href="${SITE_URL}/blog/how-to-prepare-structural-steel-for-intumescent-painting">prepare structural steel for intumescent paint</a></li><li><a href="${SITE_URL}/services/factory-cladding">Factory cladding blasting</a> — <a href="${SITE_URL}/blog/shot-blasting-vs-chemical-stripping">shot blasting versus chemical stripping</a></li><li><a href="${SITE_URL}/blog/sa-2-5-vs-sa-3-surface-preparation-standard">Sa 2.5 versus Sa 3</a> — <a href="${SITE_URL}/blog/how-to-specify-shot-blasting-construction-contract">specify shot blasting in a construction contract</a></li></ul><p><a href="${SITE_URL}/site-survey">Request a site visit</a> for a project-specific survey.</p></section></main></div>`);
    return modifiedHtml;
  }

  // Check if this is the /service-areas index page
  if (url === '/service-areas' || url === '/service-areas/') {
    const serviceAreasUrl = `${SITE_URL}/service-areas`;
    let modifiedHtml = html
      .replace(/<meta\s+name="description"[^>]*>/gi, '')
      .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<link\s+rel="canonical"[^>]*>/gi, '');
    const areaMetaTags = `
    <title>Shot Blasting Near You | Commercial Mobile Service Areas | ${BUSINESS_NAME}</title>
    <link rel="canonical" href="${serviceAreasUrl}" />
    <link rel="alternate" hreflang="en-gb" href="${serviceAreasUrl}" />
    <link rel="alternate" hreflang="en" href="${serviceAreasUrl}" />
    <meta name="description" content="Looking for commercial shot blasting near you? Browse our England and Wales local service-area directory, or share the asset, access and surface condition for a nationwide project." />
    <meta property="og:title" content="Shot Blasting Near You | Commercial Mobile Service Areas | ${BUSINESS_NAME}" />
    <meta property="og:description" content="Browse our England and Wales local service-area directory, or request a Site Visit for a nationwide commercial shot blasting project." />
    <meta property="og:url" content="${serviceAreasUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${LOGO}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Shot Blasting Near You | Commercial Mobile Service Areas | ${BUSINESS_NAME}" />
    <meta name="twitter:description" content="Browse our England and Wales local service-area directory, or request a Site Visit for a nationwide commercial shot blasting project." />
    <meta name="twitter:image" content="${LOGO}" />
    <meta name="twitter:image:alt" content="Commercial Shot Blasting England and Wales local service-area directory" />
    ${generateServiceAreasIndexSchemas()}
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
      {"@type":"Question","name":"Do you offer mobile shot blasting services near me?","acceptedAnswer":{"@type":"Answer","text":"We provide commercial mobile shot blasting nationwide. Search your town or county, then share the asset, condition, access and intended next stage so the project can be assessed."}},
      {"@type":"Question","name":"Which areas do you cover for shot blasting services?","acceptedAnswer":{"@type":"Answer","text":"We work nationwide. The local service-area directory currently lists commercial locations in England and Wales, including the Midlands, North West, Yorkshire, East Midlands, East Anglia, South West, the Welsh Borders and Wales."}},
      {"@type":"Question","name":"Can you carry out shot blasting services on-site at my premises?","acceptedAnswer":{"@type":"Answer","text":"A project-specific site assessment considers the asset, access, working area, surrounding operations, containment needs, condition and the intended next stage before an approach is agreed."}},
      {"@type":"Question","name":"How do I find out if you cover my area for shot blasting services?","acceptedAnswer":{"@type":"Answer","text":"Search the service-area directory for your town or county, then use Request A Site Visit to share project photographs, access information and the intended next stage. We will get back to you promptly."}}
    ]}
    </script>
  `;
    modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, areaMetaTags);
    modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="https://commercialshotblasting.co.uk/">Home</a> | <a href="https://commercialshotblasting.co.uk/services">Services</a> | <a href="https://commercialshotblasting.co.uk/service-areas">Service Areas</a> | <a href="https://commercialshotblasting.co.uk/about">About</a> | <a href="https://commercialshotblasting.co.uk/contact">Contact</a> | <a href="https://commercialshotblasting.co.uk/blog">Blog</a> | <a href="https://commercialshotblasting.co.uk/industries">Industries</a> | <a href="https://commercialshotblasting.co.uk/glossary">Glossary</a> | <a href="https://commercialshotblasting.co.uk/site-survey">Request A Site Visit</a></nav><main><h1>Commercial Shot Blasting Near You</h1><p>We work nationwide. This local service-area directory currently lists England and Wales locations; search your town or county, or share the asset, access, surface condition and intended next stage through Request A Site Visit.</p><ul><li><a href="https://commercialshotblasting.co.uk/service-areas/birmingham">Shot Blasting Birmingham</a></li><li><a href="https://commercialshotblasting.co.uk/service-areas/manchester">Shot Blasting Manchester</a></li><li><a href="https://commercialshotblasting.co.uk/service-areas/sheffield">Shot Blasting Sheffield</a></li><li><a href="https://commercialshotblasting.co.uk/service-areas/leeds">Shot Blasting Leeds</a></li><li><a href="https://commercialshotblasting.co.uk/service-areas/nottingham">Shot Blasting Nottingham</a></li><li><a href="https://commercialshotblasting.co.uk/service-areas/leicester">Shot Blasting Leicester</a></li><li><a href="https://commercialshotblasting.co.uk/service-areas/derby">Shot Blasting Derby</a></li><li><a href="https://commercialshotblasting.co.uk/service-areas/coventry">Shot Blasting Coventry</a></li><li><a href="https://commercialshotblasting.co.uk/service-areas/bristol">Shot Blasting Bristol</a></li><li><a href="https://commercialshotblasting.co.uk/service-areas/cardiff">Shot Blasting Cardiff</a></li><li><a href="https://commercialshotblasting.co.uk/service-areas/liverpool">Shot Blasting Liverpool</a></li><li><a href="https://commercialshotblasting.co.uk/service-areas/wolverhampton">Shot Blasting Wolverhampton</a></li><li><a href="https://commercialshotblasting.co.uk/service-areas/stoke-on-trent">Shot Blasting Stoke-on-Trent</a></li><li><a href="https://commercialshotblasting.co.uk/service-areas/oxford">Shot Blasting Oxford</a></li><li><a href="https://commercialshotblasting.co.uk/service-areas/cambridge">Shot Blasting Cambridge</a></li><li><a href="https://commercialshotblasting.co.uk/service-areas/northampton">Shot Blasting Northampton</a></li><li><a href="https://commercialshotblasting.co.uk/service-areas/peterborough">Shot Blasting Peterborough</a></li><li><a href="https://commercialshotblasting.co.uk/service-areas/worcester">Shot Blasting Worcester</a></li><li><a href="https://commercialshotblasting.co.uk/service-areas/gloucester">Shot Blasting Gloucester</a></li><li><a href="https://commercialshotblasting.co.uk/service-areas/shrewsbury">Shot Blasting Shrewsbury</a></li></ul></main></div>`);
    return modifiedHtml;
  }

  // ── Glossary page: /glossary ──────────────────────────────────────────────
  if (url === '/glossary' || url === '/glossary/') {
    const glossaryTitle = 'Shot Blasting Glossary | Industry Terms Explained | Commercial Shot Blasting';
    const glossaryDesc = 'Comprehensive glossary of shot blasting and surface preparation terms: Sa 2.5, Sa 3, DFT, intumescent paint, mill scale, surface profile, BS EN ISO 8501-1, SSPC, NACE and more. Written by UK shot blasting contractors.';
    const glossaryUrl = `${SITE_URL}/glossary`;
    let modifiedHtml = html
      .replace(/<meta\s+name="description"[^>]*>/gi, '')
      .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<link\s+rel="canonical"[^>]*>/gi, '');
    const glossaryTerms = [
      { id: 'sa-2-5', name: 'Sa 2.5', description: 'Sa 2.5 (near-white metal) is a surface cleanliness standard defined in BS EN ISO 8501-1 requiring removal of nearly all mill scale, rust, and coatings, leaving only faint staining on no more than 5% of the surface. It is the most commonly specified standard for structural steelwork receiving protective coatings.' },
      { id: 'sa-3', name: 'Sa 3', description: 'Sa 3 (white metal) is the highest surface cleanliness standard in BS EN ISO 8501-1, requiring complete removal of all mill scale, rust, coatings, and foreign matter, leaving a uniformly grey-white metallic surface.' },
      { id: 'dft', name: 'DFT (Dry Film Thickness)', description: 'Dry Film Thickness (DFT) is the thickness of a coating after full cure, measured in microns. DFT is critical for intumescent coatings, where the specified thickness determines the fire rating achieved (R30, R60, R90, or R120).' },
      { id: 'intumescent-paint', name: 'Intumescent Paint', description: 'Intumescent paint is a passive fire protection coating applied to structural steel that expands when exposed to heat above approximately 200°C, forming an insulating char layer that protects the steel from reaching critical failure temperature.' },
      { id: 'shot-blasting', name: 'Shot Blasting', description: 'Shot blasting is an abrasive surface preparation process in which steel shot or grit media is propelled at high velocity against a metal surface to remove rust, mill scale, old coatings, and contamination, and create a surface profile for coating adhesion.' },
      { id: 'grit-blasting', name: 'Grit Blasting', description: 'Grit blasting uses angular steel grit as the abrasive media to create a sharper, more aggressive surface profile than spherical shot, making it particularly effective for high-build coatings and intumescent systems.' },
      { id: 'mill-scale', name: 'Mill Scale', description: 'Mill scale is a thin blue-grey oxide layer that forms on hot-rolled steel during manufacture. It must be completely removed before protective coatings are applied, typically by shot blasting to Sa 2.5 or Sa 3 standard.' },
      { id: 'rust-grade', name: 'Rust Grade', description: 'Rust grade describes the initial condition of uncoated steel before surface preparation, as defined in BS EN ISO 8501-1. Four grades are defined: Grade A (mill scale, little rust), Grade B (rust beginning), Grade C (mill scale rusted away), Grade D (general pitting).' },
      { id: 'surface-profile', name: 'Surface Profile', description: 'Surface profile (anchor pattern) is the microscopic peak-and-valley texture created on steel by shot blasting, measured in microns Rz. A profile of 40–70 µm Rz is typically required for intumescent coatings and high-build protective systems.' },
      { id: 'bs-en-iso-8501-1', name: 'BS EN ISO 8501-1', description: 'BS EN ISO 8501-1 is the British and European standard for visual assessment of steel surface cleanliness before paint application, defining four rust grades and seven blast-cleaned preparation grades including Sa 2.5 and Sa 3.' },
      { id: 'sspc', name: 'SSPC (Society for Protective Coatings)', description: 'SSPC publishes North American surface preparation standards widely referenced internationally. SP 10 (Near-White Blast) is equivalent to Sa 2.5, and SP 5 (White Metal Blast) is equivalent to Sa 3.' },
      { id: 'nace', name: 'NACE (National Association of Corrosion Engineers)', description: 'NACE International (now AMPP) published corrosion and surface preparation standards. NACE No. 2 (Near-White Blast) is equivalent to Sa 2.5, and NACE No. 1 (White Metal Blast) is equivalent to Sa 3.' },
    ];
    const definedTermSchemas = glossaryTerms.map(t => JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'DefinedTerm',
      '@id': `${glossaryUrl}#${t.id}`,
      'name': t.name,
      'description': t.description,
      'inDefinedTermSet': {
        '@type': 'DefinedTermSet',
        'name': 'Shot Blasting & Surface Preparation Glossary',
        'url': glossaryUrl,
        'publisher': { '@type': 'Organization', 'name': BUSINESS_NAME, 'url': SITE_URL }
      }
    })).join('\n    ');
    const breadcrumbSchema = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE_URL},{"@type":"ListItem","position":2,"name":"Glossary","item":glossaryUrl}]});
    const webPageSchema = JSON.stringify({"@context":"https://schema.org","@type":"DefinedTermSet","name":"Shot Blasting & Surface Preparation Glossary","description":glossaryDesc,"url":glossaryUrl,"inLanguage":"en-GB","publisher":{"@type":"Organization","name":BUSINESS_NAME,"url":SITE_URL}});
    const glossaryMetaTags = `
    <title>${glossaryTitle}</title>
    <link rel="canonical" href="${glossaryUrl}" />
    <link rel="alternate" hreflang="en-gb" href="${glossaryUrl}" />
    <link rel="alternate" hreflang="en" href="${glossaryUrl}" />
    <meta name="description" content="${glossaryDesc}" />
    <meta property="og:title" content="${glossaryTitle}" />
    <meta property="og:description" content="${glossaryDesc}" />
    <meta property="og:url" content="${glossaryUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${LOGO}" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${glossaryTitle}" />
    <meta name="twitter:description" content="${glossaryDesc}" />
    <meta name="twitter:image" content="${LOGO}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <script type="application/ld+json">${breadcrumbSchema}</script>
    <script type="application/ld+json">${webPageSchema}</script>
    ${definedTermSchemas.split('\n    ').map(s => `<script type="application/ld+json">${s}</script>`).join('\n    ')}
  `;
    modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, glossaryMetaTags);
    modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="https://commercialshotblasting.co.uk/">Home</a> | <a href="https://commercialshotblasting.co.uk/services">Services</a> | <a href="https://commercialshotblasting.co.uk/service-areas">Service Areas</a> | <a href="https://commercialshotblasting.co.uk/about">About</a> | <a href="https://commercialshotblasting.co.uk/contact">Contact</a> | <a href="https://commercialshotblasting.co.uk/blog">Blog</a> | <a href="https://commercialshotblasting.co.uk/industries">Industries</a> | <a href="https://commercialshotblasting.co.uk/glossary">Glossary</a> | <a href="https://commercialshotblasting.co.uk/site-survey">Free Site Survey</a></nav><main><h1>Shot Blasting Glossary — Industry Terms Explained</h1><p>Comprehensive glossary of shot blasting and surface preparation terms: Sa 2.5, Sa 3, DFT, intumescent paint, mill scale, surface profile, BS EN ISO 8501-1, SSPC, NACE and more.</p><ul><li><a href="https://commercialshotblasting.co.uk/glossary/sa-2-5">Sa 2.5 (Near-White Metal) Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/sa-3">Sa 3 (White Metal) Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/shot-blasting">What is Shot Blasting?</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/intumescent-paint">Intumescent Paint Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/mill-scale">Mill Scale Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/surface-profile">Surface Profile Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/bs-en-iso-8501-1">BS EN ISO 8501-1 Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/blast-cleaning">Blast Cleaning Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/rust-grade">Rust Grade Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/nace">NACE Standards Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/sspc">SSPC Standards Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/dry-film-thickness">Dry Film Thickness (DFT) Explained</a></li></ul></main></div>`);
    return modifiedHtml;
  }

  // ── Individual glossary term: /glossary/:slug ──────────────────────────────
  if (detail?.kind === "glossary") {
    const termSlug = detail.slug;
    const termUrl = `${SITE_URL}/glossary/${termSlug}`;
    // Term metadata map — mirrors client/src/data/glossaryData.ts
    const TERM_META: Record<string, { title: string; description: string; term: string }> = {
      'bs-en-iso-8501-1': { term: 'BS EN ISO 8501-1', title: 'BS EN ISO 8501-1 Explained | Shot Blasting Surface Preparation Standard', description: 'Complete guide to BS EN ISO 8501-1 — the UK standard for steel surface cleanliness. Covers rust grades A–D, blast grades Sa 1 to Sa 3, and how the standard is used in coating specifications.' },
      'dft': { term: 'DFT (Dry Film Thickness)', title: 'DFT (Dry Film Thickness) Explained | Coating Thickness for Steel', description: 'What is DFT? Dry Film Thickness explained — how it is measured, why it matters for intumescent fire protection coatings, and how surface preparation affects DFT readings on structural steel.' },
      'grit-blasting': { term: 'Grit Blasting', title: 'Grit Blasting Explained | What Is Grit Blasting & How Does It Work?', description: 'What is grit blasting? Learn how grit blasting works, the difference between grit and shot blasting, common media types, and the surface profiles achieved. Written by UK shot blasting contractors.' },
      'intumescent-paint': { term: 'Intumescent Paint', title: 'Intumescent Paint Explained | Fire Protection Coating for Structural Steel', description: 'What is intumescent paint? How does it work, what fire ratings does it achieve, and what surface preparation is required? Complete guide from UK shot blasting and intumescent painting contractors.' },
      'mill-scale': { term: 'Mill Scale', title: 'Mill Scale Explained | What Is Mill Scale & Why Must It Be Removed?', description: 'What is mill scale on steel? Why does it cause coating failure? How is it removed? Complete guide to mill scale, its composition, and why shot blasting to Sa 2.5 is the correct removal method.' },
      'nace': { term: 'NACE / AMPP Standards', title: 'NACE Surface Preparation Standards Explained | NACE No. 1, 2, 3, 4', description: 'What are NACE surface preparation standards? NACE No. 1 (Sa 3), NACE No. 2 (Sa 2.5), and their ISO 8501-1 equivalents explained. Guide to NACE/AMPP blast cleaning grades for steel.' },
      'rust-grade': { term: 'Rust Grade', title: 'Rust Grade Explained | Steel Rust Grades A, B, C, D (BS EN ISO 8501-1)', description: 'What are rust grades for steel? Grades A, B, C, and D explained — how they are assessed, how they affect shot blasting, and the difference between rust grade and blast cleanliness grade.' },
      'sa-2-5': { term: 'Sa 2.5 (Near-White Metal)', title: 'Sa 2.5 (Near-White Metal) Explained | Shot Blasting Standard for Steel', description: 'What is Sa 2.5? Near-white metal blast cleaning explained — what it requires, why it is the standard for structural steelwork, NACE/SSPC equivalents, and how it differs from Sa 3.' },
      'sa-3': { term: 'Sa 3 (White Metal)', title: 'Sa 3 (White Metal) Explained | Highest Blast Cleaning Standard for Steel', description: 'What is Sa 3 white metal blast cleaning? Complete guide to the Sa 3 standard — what it requires, when it is specified, how it differs from Sa 2.5, and NACE/SSPC equivalents.' },
      'shot-blasting': { term: 'Shot Blasting', title: 'Shot Blasting Explained | What Is Shot Blasting & How Does It Work?', description: 'What is shot blasting? How does it work, what does it achieve, and what surfaces can be shot blasted? Complete guide to shot blasting from UK professional shot blasting contractors.' },
      'sspc': { term: 'SSPC (Society for Protective Coatings)', title: 'SSPC Surface Preparation Standards Explained | SP 5, SP 10, SP 6', description: 'What are SSPC surface preparation standards? SSPC SP 5 (Sa 3), SP 10 (Sa 2.5), SP 6 (Sa 2) and their ISO 8501-1 equivalents explained. Guide to SSPC/AMPP blast cleaning grades for steel.' },
      'surface-profile': { term: 'Surface Profile', title: 'Surface Profile Explained | Anchor Pattern for Shot Blasted Steel', description: 'What is surface profile in shot blasting? How is it measured, why does it matter for coating adhesion, and what profile is required for intumescent paint and structural steel coatings?' },
    };
    const meta = TERM_META[termSlug];
    if (meta) {
      let modifiedHtml = html
        .replace(/<meta\s+name="description"[^>]*>/gi, '')
        .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
        .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
        .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
        .replace(/<link\s+rel="canonical"[^>]*>/gi, '');
      const breadcrumb = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE_URL},{"@type":"ListItem","position":2,"name":"Glossary","item":`${SITE_URL}/glossary`},{"@type":"ListItem","position":3,"name":meta.term,"item":termUrl}]});
      const definedTerm = JSON.stringify({"@context":"https://schema.org","@type":"DefinedTerm","@id":termUrl,"name":meta.term,"description":meta.description,"inDefinedTermSet":{"@type":"DefinedTermSet","name":"Shot Blasting & Surface Preparation Glossary","url":`${SITE_URL}/glossary`}});
      const commercialApplicationHtml: Record<string, string> = {
        "bs-en-iso-8501-1": `<section><h2>Using BS EN ISO 8501-1 in a commercial steelwork scope</h2><p>This standard helps project teams describe existing steel condition and surface-preparation grades. It does not select a coating system, inspection plan or delivery method on its own; those points should be confirmed against the project specification and the actual asset.</p><ul><li><a href="${SITE_URL}/steel-fabrication-surface-preparation">Steel fabrication surface preparation</a></li><li><a href="${SITE_URL}/mobile-on-site-shot-blasting">Mobile and on-site blasting</a></li><li><a href="${SITE_URL}/site-survey">Request A Site Visit</a></li></ul></section>`,
        "rust-grade": `<section><h2>Turning a rust-grade observation into a useful project brief</h2><p>A rust grade is a description of the initial steel condition, not a scope, price, method or finish specification. Photographs, accessible faces, old coatings, corrosion extent, repairs, access, working-area constraints and the intended next coating stage help turn the observation into a practical commercial discussion.</p><ul><li><a href="${SITE_URL}/commercial-shot-blasting-sandblasting">Commercial shot blasting and sandblasting</a></li><li><a href="${SITE_URL}/industrial-steelwork-restoration">Industrial steelwork restoration</a></li><li><a href="${SITE_URL}/site-survey">Request A Site Visit</a></li></ul></section>`,
        "sa-2-5": `<section><h2>Planning a Sa 2½ requirement around the next coating stage</h2><p>Where a specification calls for Sa 2½, the project team should also define the relevant steelwork, current condition, accessible surfaces, coating system, primer sequence, inspection points and protection of prepared steel. The Wigan case study is a documented example of coordinated sequencing; it does not prescribe a method for another site.</p><ul><li><a href="${SITE_URL}/case-studies/iss-property-former-bakkavor-foods-facility-wigan">ISS Property Wigan case study</a></li><li><a href="${SITE_URL}/intumescent-paint-for-steel">Intumescent paint for steel</a></li><li><a href="${SITE_URL}/site-survey">Request A Site Visit</a></li></ul></section>`,
        "sa-3": `<section><h2>Using a Sa 3 reference in a commercial specification discussion</h2><p>A Sa 3 requirement should be read alongside the project’s full coating specification, steel condition, access, inspection and handover requirements. The required preparation grade is project-specific, so it should not be selected from a search term or generic page alone.</p><ul><li><a href="${SITE_URL}/services/structural-steel-frames">Structural steel frames</a></li><li><a href="${SITE_URL}/blog/iso-8501-1-sa-2-5-sa-3-surface-preparation-guide">ISO 8501-1, Sa 2½ and Sa 3 guide</a></li><li><a href="${SITE_URL}/site-survey">Request A Site Visit</a></li></ul></section>`,
      };
      const termMetaTags = `
    <title>${meta.title}</title>
    <link rel="canonical" href="${termUrl}" />
    <link rel="alternate" hreflang="en-gb" href="${termUrl}" />
    <link rel="alternate" hreflang="en" href="${termUrl}" />
    <meta name="description" content="${meta.description}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:url" content="${termUrl}" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="${LOGO}" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${LOGO}" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
    <script type="application/ld+json">${breadcrumb}</script>
    <script type="application/ld+json">${definedTerm}</script>
  `;
      modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, termMetaTags);
      modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="https://commercialshotblasting.co.uk/">Home</a> | <a href="https://commercialshotblasting.co.uk/services">Services</a> | <a href="https://commercialshotblasting.co.uk/service-areas">Service Areas</a> | <a href="https://commercialshotblasting.co.uk/about">About</a> | <a href="https://commercialshotblasting.co.uk/contact">Contact</a> | <a href="https://commercialshotblasting.co.uk/blog">Blog</a> | <a href="https://commercialshotblasting.co.uk/industries">Industries</a> | <a href="https://commercialshotblasting.co.uk/glossary">Glossary</a> | <a href="https://commercialshotblasting.co.uk/site-survey">Request A Site Visit</a></nav><main><h1>${meta.term} — Definition and Commercial Application</h1><p>${meta.description}</p>${commercialApplicationHtml[termSlug] ?? ""}<h2>Related shot blasting glossary terms</h2><ul><li><a href="https://commercialshotblasting.co.uk/glossary/sa-2-5">Sa 2.5 (Near-White Metal) Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/sa-3">Sa 3 (White Metal) Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/shot-blasting">What is Shot Blasting?</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/intumescent-paint">Intumescent Paint Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/mill-scale">Mill Scale Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/surface-profile">Surface Profile Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/bs-en-iso-8501-1">BS EN ISO 8501-1 Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/blast-cleaning">Blast Cleaning Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/rust-grade">Rust Grade Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/nace">NACE Standards Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/sspc">SSPC Standards Explained</a></li><li><a href="https://commercialshotblasting.co.uk/glossary/dry-film-thickness">Dry Film Thickness (DFT) Explained</a></li></ul></main></div>`);
      return modifiedHtml;
    }
  }

  // ── Blog index page: /blog ─────────────────────────────────────────────────
  if (url === '/blog' || url === '/blog/') {
    const blogUrl = `${SITE_URL}/blog`;
    let modifiedHtml = html
      .replace(/<meta\s+name="description"[^>]*>/gi, '')
      .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<link\s+rel="canonical"[^>]*>/gi, '');
    const blogMetaTags = `
    <title>Shot Blasting Blog | Expert Guides &amp; Industry Insights | ${BUSINESS_NAME}</title>
    <link rel="canonical" href="${blogUrl}" />
    <link rel="alternate" hreflang="en-gb" href="${blogUrl}" />
    <link rel="alternate" hreflang="en" href="${blogUrl}" />
    <meta name="description" content="Expert articles and guides on shot blasting, surface preparation, rust removal, and industrial coating from Commercial Shot Blasting. SA2.5/SA3 standards, equipment, techniques and case studies." />
    <meta property="og:title" content="Shot Blasting Blog | Expert Guides &amp; Industry Insights | ${BUSINESS_NAME}" />
    <meta property="og:description" content="Expert articles and guides on shot blasting, surface preparation, rust removal, and industrial coating from Commercial Shot Blasting." />
    <meta property="og:url" content="${blogUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${LOGO}" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Shot Blasting Blog | Expert Guides &amp; Industry Insights | ${BUSINESS_NAME}" />
    <meta name="twitter:description" content="Expert articles and guides on shot blasting, surface preparation, rust removal, and industrial coating from Commercial Shot Blasting." />
    <meta name="twitter:image" content="${LOGO}" />
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Blog","name":"Commercial Shot Blasting Blog","description":"Expert articles, guides, and insights about shot blasting, surface preparation, and industrial coating techniques.","url":"${blogUrl}","publisher":{"@type":"Organization","name":"${BUSINESS_NAME}","url":"${SITE_URL}","logo":{"@type":"ImageObject","url":"${LOGO}"}}}
    </script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"${SITE_URL}"},{"@type":"ListItem","position":2,"name":"Blog","item":"${blogUrl}"}]}
    </script>
  `;
    modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, blogMetaTags);
    modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="https://commercialshotblasting.co.uk/">Home</a> | <a href="https://commercialshotblasting.co.uk/services">Services</a> | <a href="https://commercialshotblasting.co.uk/service-areas">Service Areas</a> | <a href="https://commercialshotblasting.co.uk/about">About</a> | <a href="https://commercialshotblasting.co.uk/contact">Contact</a> | <a href="https://commercialshotblasting.co.uk/blog">Blog</a> | <a href="https://commercialshotblasting.co.uk/industries">Industries</a> | <a href="https://commercialshotblasting.co.uk/glossary">Glossary</a> | <a href="https://commercialshotblasting.co.uk/site-survey">Free Site Survey</a></nav><main><h1>Shot Blasting Blog — Expert Guides and Industry Insights</h1><p>Expert articles and guides on shot blasting, surface preparation, rust removal, and industrial coating from Commercial Shot Blasting. SA2.5/SA3 standards, equipment, techniques and case studies.</p><p>Browse our latest articles on shot blasting, surface preparation, and industrial coatings. <a href="https://commercialshotblasting.co.uk/blog">View all blog posts</a>. <a href="https://commercialshotblasting.co.uk/contact">Contact us</a> for a free quote.</p></main></div>`);
    return modifiedHtml;
  }

  // ── Individual blog post: /blog/:slug ────────────────────────────────────────
  if (detail?.kind === "blog") {
    const postSlug = detail.slug;
    const postUrl = `${SITE_URL}/blog/${postSlug}`;
    // Fetch post from DB for rich Article JSON-LD
    const post = content?.kind === "blog" ? content.post : undefined;
    if (!post || post.isPublished !== true) return renderHtmlRouteError(404);
    const postTitle = post?.title || `Shot Blasting Blog | ${BUSINESS_NAME}`;
    const postDesc = post?.metaDescription || post?.excerpt || 'Expert insights on shot blasting and surface preparation from Commercial Shot Blasting.';
    const postImage = post?.featuredImage || LOGO;
    const postAuthor = post?.author || BUSINESS_NAME;
    const postDatePublished = post?.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString();
    const postDateModified = post?.updatedAt ? new Date(post.updatedAt).toISOString() : postDatePublished;
    const postTags: string[] = post?.tags ? (typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags) : [];
    const postWordCount = post ? post.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length : 0;
    const postCategory = post?.category || 'Shot Blasting';
    // Parse FAQ data for FAQPage JSON-LD
    type FaqItem = { question: string; answer: string };
    const postFaqs: FaqItem[] = post?.faq ? (typeof post.faq === 'string' ? JSON.parse(post.faq) : post.faq) : [];

    let modifiedHtml = html
      .replace(/<meta\s+name="description"[^>]*>/gi, '')
      .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<link\s+rel="canonical"[^>]*>/gi, '');

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': postTitle,
      'description': postDesc,
      'author': postAuthor === BUSINESS_NAME
        ? { '@type': 'Organization', 'name': BUSINESS_NAME, 'url': SITE_URL }
        : { '@type': 'Person', 'name': postAuthor, 'url': `${SITE_URL}/about`, 'sameAs': ['https://www.linkedin.com/company/commercial-shot-blasting'], 'worksFor': { '@type': 'Organization', 'name': BUSINESS_NAME, 'url': SITE_URL } },
      'publisher': { '@type': 'Organization', 'name': BUSINESS_NAME, 'url': SITE_URL, 'logo': { '@type': 'ImageObject', 'url': LOGO } },
      'datePublished': postDatePublished,
      'dateModified': postDateModified,
      'mainEntityOfPage': { '@type': 'WebPage', '@id': postUrl },
      'url': postUrl,
      'image': { '@type': 'ImageObject', 'url': postImage },
      'wordCount': postWordCount,
      'keywords': postTags.join(', '),
      'articleSection': postCategory,
      'inLanguage': 'en-GB',
      'isPartOf': { '@type': 'Blog', 'name': 'Commercial Shot Blasting Blog', 'url': `${SITE_URL}/blog` },
      'speakable': {
        '@type': 'SpeakableSpecification',
        'cssSelector': ['h1', '.blog-post-intro', 'article p:first-of-type'],
      },
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': SITE_URL },
        { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': `${SITE_URL}/blog` },
        { '@type': 'ListItem', 'position': 3, 'name': postTitle, 'item': postUrl },
      ],
    };

    const blogPostMetaTags = `
    <title>${postTitle} | ${BUSINESS_NAME} Blog</title>
    <link rel="canonical" href="${postUrl}" />
    <link rel="alternate" hreflang="en-gb" href="${postUrl}" />
    <link rel="alternate" hreflang="en" href="${postUrl}" />
    <meta name="description" content="${postDesc.replace(/"/g, '&quot;')}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <meta property="og:title" content="${postTitle}" />
    <meta property="og:description" content="${postDesc.replace(/"/g, '&quot;')}" />
    <meta property="og:url" content="${postUrl}" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="${postImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta property="article:published_time" content="${postDatePublished}" />
    <meta property="article:modified_time" content="${postDateModified}" />
    <meta property="article:author" content="${postAuthor}" />
    <meta property="article:section" content="${postCategory}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${postTitle}" />
    <meta name="twitter:description" content="${postDesc.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="${postImage}" />
    <script type="application/ld+json">${JSON.stringify(articleSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
    ${postFaqs.length > 0 ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': postFaqs.map(f => ({ '@type': 'Question', 'name': f.question, 'acceptedAnswer': { '@type': 'Answer', 'text': f.answer } })) })}</script>` : ''}
  `;
    modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, blogPostMetaTags);
    modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="https://commercialshotblasting.co.uk/">Home</a> | <a href="https://commercialshotblasting.co.uk/services">Services</a> | <a href="https://commercialshotblasting.co.uk/service-areas">Service Areas</a> | <a href="https://commercialshotblasting.co.uk/about">About</a> | <a href="https://commercialshotblasting.co.uk/contact">Contact</a> | <a href="https://commercialshotblasting.co.uk/blog">Blog</a> | <a href="https://commercialshotblasting.co.uk/industries">Industries</a> | <a href="https://commercialshotblasting.co.uk/glossary">Glossary</a> | <a href="https://commercialshotblasting.co.uk/site-survey">Free Site Survey</a></nav><main><h1>Shot Blasting Blog Post</h1><p>Expert article on shot blasting and surface preparation from Commercial Shot Blasting — UK mobile shot blasting contractors.</p><p><a href="https://commercialshotblasting.co.uk/blog">Back to Blog</a> | <a href="https://commercialshotblasting.co.uk/contact">Get a Free Quote</a></p></main></div>`);
    return modifiedHtml;
  }

  // Check if this is a service page
  const serviceMatch = url.match(/^\/services\/([a-z-]+)/);
  if (serviceMatch) {
    const serviceId = serviceMatch[1];
    const svc = serviceMeta[serviceId];
    if (svc) {
      const pageUrl = `${SITE_URL}/services/${serviceId}`;
      let modifiedHtml = html
        .replace(/<meta\s+name="description"[^>]*>/gi, '')
        .replace(/<meta\s+name="keywords"[^>]*>/gi, '')
        .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
        .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
        .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
        .replace(/<link\s+rel="canonical"[^>]*>/gi, '');
      const metaTags = `
    <title>${svc.title} | ${BUSINESS_NAME}</title>
    <link rel="preload" as="image" href="${svc.heroImage}" />
    <link rel="canonical" href="${pageUrl}" />
    <link rel="alternate" hreflang="en-gb" href="${pageUrl}" />
    <link rel="alternate" hreflang="en" href="${pageUrl}" />
    <meta name="description" content="${svc.description.replace(/"/g, '&quot;')}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <meta name="keywords" content="${SERVICE_KEYWORDS[serviceId] || `${svc.title.toLowerCase()}, shot blasting, surface preparation UK`}" />
    <meta property="og:title" content="${svc.title} | ${BUSINESS_NAME}" />
    <meta property="og:description" content="${svc.description.replace(/"/g, '&quot;')}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${svc.heroImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${svc.title} | ${BUSINESS_NAME}" />
    <meta name="twitter:description" content="${svc.description.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="${svc.heroImage}" />
    <meta name="twitter:image:alt" content="${svc.title} — professional shot blasting service by Commercial Shot Blasting" />
    ${generateServiceSchemas(serviceId)}
  `;
      modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, metaTags);
      // Inject SSR body HTML for crawlers
      const serviceBodyHtml = generateServiceBodyHTML(serviceId);
      if (serviceBodyHtml) {
        if (modifiedHtml.includes('<!--SSR_CONTENT-->')) {
          modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', serviceBodyHtml);
        } else {
          modifiedHtml = modifiedHtml.replace(/<body[^>]*>/, (match) => `${match}\n${serviceBodyHtml}`);
        }
      }
      return modifiedHtml;
    }
  }

  // ── About page: /about ─────────────────────────────────────────────────
  if (url === '/about' || url === '/about/') {
    const aboutTitle = 'About Commercial Shot Blasting | UK Mobile Shot Blasting Contractor';
    const aboutDesc = 'Commercial Shot Blasting is the UK\'s leading mobile shot blasting contractor — 12 mobile units, 20+ years experience, 500+ projects completed nationwide. Part of Premier Blasting Ltd. Free site surveys and fixed-price quotes.';
    const aboutUrl = `${SITE_URL}/about`;
    let modifiedHtml = html
      .replace(/<meta\s+name="description"[^>]*>/gi, '')
      .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<link\s+rel="canonical"[^>]*>/gi, '');
    const aboutMetaTags = `
    <title>${aboutTitle}</title>
    <link rel="canonical" href="${aboutUrl}" />
    <link rel="alternate" hreflang="en-gb" href="${aboutUrl}" />
    <link rel="alternate" hreflang="en" href="${aboutUrl}" />
    <meta name="description" content="${aboutDesc}" />
    <meta property="og:title" content="${aboutTitle}" />
    <meta property="og:description" content="${aboutDesc}" />
    <meta property="og:url" content="${aboutUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${LOGO}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${aboutTitle}" />
    <meta name="twitter:description" content="${aboutDesc}" />
    <meta name="twitter:image" content="${LOGO}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <script type="application/ld+json">
    ${JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE_URL},{"@type":"ListItem","position":2,"name":"About","item":aboutUrl}]})}
    </script>
    <script type="application/ld+json">
    ${JSON.stringify({"@context":"https://schema.org","@type":"AboutPage","name":aboutTitle,"description":aboutDesc,"url":aboutUrl,"inLanguage":"en-GB","isPartOf":{"@type":"WebSite","name":BUSINESS_NAME,"url":SITE_URL},"breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE_URL},{"@type":"ListItem","position":2,"name":"About","item":aboutUrl}]}})}
    </script>
    <script type="application/ld+json">
    ${JSON.stringify({"@context":"https://schema.org","@type":"Organization","@id":`${SITE_URL}/#organization`,"name":BUSINESS_NAME,"url":SITE_URL,"logo":{"@type":"ImageObject","url":LOGO},"telephone":"07970566409","email":"info@commercialshotblasting.co.uk","address":{"@type":"PostalAddress","addressCountry":"GB","addressRegion":"England"},"areaServed":{"@type":"Country","name":"United Kingdom"},"sameAs":["https://www.facebook.com/commercialshotblasting","https://www.linkedin.com/company/commercial-shot-blasting","https://www.premierblasting.co.uk"],"parentOrganization":{"@type":"Organization","name":"Premier Blasting Ltd","url":"https://www.premierblasting.co.uk"},"numberOfEmployees":{"@type":"QuantitativeValue","minValue":12,"maxValue":50},"foundingDate":"2004","description":"Commercial Shot Blasting is the commercial and industrial division of Premier Blasting Ltd, providing mobile shot blasting services nationwide. Operating 12 mobile units with 20+ years of industry experience.","knowsAbout":["Shot Blasting","Surface Preparation","Sa 2.5 Standard","Sa 3 Standard","Intumescent Painting","Structural Steel Preparation","BS EN ISO 8501-1","Industrial Coating","Rust Removal","Grit Blasting"]})}
    </script>
    <script type="application/ld+json">
    ${JSON.stringify({"@context":"https://schema.org","@type":"Person","@id":`${SITE_URL}/#founder`,"name":"Commercial Shot Blasting Team","jobTitle":"Managing Director","worksFor":{"@type":"Organization","@id":`${SITE_URL}/#organization`,"name":BUSINESS_NAME,"url":SITE_URL},"url":aboutUrl,"sameAs":["https://www.linkedin.com/company/commercial-shot-blasting"],"knowsAbout":["Shot Blasting","Surface Preparation","Sa 2.5","Intumescent Painting","Structural Steel","Industrial Coatings","BS EN ISO 8501-1"],"hasOccupation":{"@type":"Occupation","name":"Shot Blasting Contractor","occupationLocation":{"@type":"Country","name":"United Kingdom"},"description":"Professional mobile shot blasting contractor specialising in commercial and industrial surface preparation to Sa 2.5 and Sa 3 standards."}})}
    </script>
  `;
    modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, aboutMetaTags);
    modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="https://commercialshotblasting.co.uk/">Home</a> | <a href="https://commercialshotblasting.co.uk/services">Services</a> | <a href="https://commercialshotblasting.co.uk/service-areas">Service Areas</a> | <a href="https://commercialshotblasting.co.uk/about">About</a> | <a href="https://commercialshotblasting.co.uk/contact">Contact</a> | <a href="https://commercialshotblasting.co.uk/blog">Blog</a> | <a href="https://commercialshotblasting.co.uk/industries">Industries</a> | <a href="https://commercialshotblasting.co.uk/glossary">Glossary</a> | <a href="https://commercialshotblasting.co.uk/site-survey">Free Site Survey</a></nav><main><h1>About Commercial Shot Blasting</h1><p>Commercial Shot Blasting is the commercial and industrial division of Premier Blasting Ltd. 20+ years experience, 500+ projects completed nationwide. Free site surveys and fixed-price quotes.</p><p>Learn about our team, our equipment, and our commitment to SA2.5 and SA3 surface preparation standards. <a href="https://commercialshotblasting.co.uk/contact">Contact us</a> for a free site survey. <a href="https://commercialshotblasting.co.uk/reviews">Read our customer reviews</a>.</p></main></div>`);
    return modifiedHtml;
  }

  // ── Reviews page: /reviews ───────────────────────────────────────────────
  if (url === '/reviews' || url === '/reviews/') {
    const reviewsTitle = 'Customer Reviews | Commercial Shot Blasting';
    const reviewsDesc = 'Read genuine customer reviews for Commercial Shot Blasting. 75 five-star reviews from clients nationwide — residential, commercial and industrial projects including factory, warehouse, beam restoration, and heritage work.';
    const reviewsUrl = `${SITE_URL}/reviews`;
    let modifiedHtml = html;
    modifiedHtml = modifiedHtml.replace(/<title>[^<]*<\/title>/, `<title>${reviewsTitle}</title>`);
    modifiedHtml = modifiedHtml.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${reviewsDesc}" />`);
    modifiedHtml = modifiedHtml.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${reviewsUrl}" />
    <link rel="alternate" hreflang="en-gb" href="${reviewsUrl}" />
    <link rel="alternate" hreflang="en" href="${reviewsUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${reviewsTitle}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${reviewsDesc}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${reviewsUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${reviewsTitle}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${reviewsDesc}" />`);
    const breadcrumbSchema = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE_URL},{"@type":"ListItem","position":2,"name":"Customer Reviews","item":reviewsUrl}]});
    const webPageSchema = JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":reviewsTitle,"description":reviewsDesc,"url":reviewsUrl});
    modifiedHtml = modifiedHtml.replace('</head>', `<script type="application/ld+json">${breadcrumbSchema}</script>
<script type="application/ld+json">${webPageSchema}</script>
</head>`);
    modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="https://commercialshotblasting.co.uk/">Home</a> | <a href="https://commercialshotblasting.co.uk/services">Services</a> | <a href="https://commercialshotblasting.co.uk/service-areas">Service Areas</a> | <a href="https://commercialshotblasting.co.uk/about">About</a> | <a href="https://commercialshotblasting.co.uk/contact">Contact</a> | <a href="https://commercialshotblasting.co.uk/blog">Blog</a> | <a href="https://commercialshotblasting.co.uk/industries">Industries</a> | <a href="https://commercialshotblasting.co.uk/glossary">Glossary</a> | <a href="https://commercialshotblasting.co.uk/site-survey">Free Site Survey</a></nav><main><h1>Commercial Shot Blasting Customer Reviews</h1><p>Read verified customer reviews for Commercial Shot Blasting — UK mobile shot blasting contractors. 5-star rated for structural steel, factory cladding, rust removal and more.</p><p><a href="https://commercialshotblasting.co.uk/contact">Get a free quote</a> | <a href="https://commercialshotblasting.co.uk/about">About us</a></p></main></div>`);
    return modifiedHtml;
  }

  // ── CHAS Elite assurance page ──────────────────────────────────────────────
  if (url === "/chas-elite" || url === "/chas-elite/") {
    const chasUrl = `${SITE_URL}/chas-elite`;
    const title = "CHAS Elite: What It Means for Your Project | Commercial Shot Blasting";
    const description = "See how Premier Blasting’s CHAS Elite status can support safety pre-qualification, procurement readiness, and project planning for Commercial Shot Blasting clients.";
    const breadcrumbSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL }, { "@type": "ListItem", "position": 2, "name": "CHAS Elite Assurance", "item": chasUrl }] });
    const webPageSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "@id": `${chasUrl}#webpage`, "name": title, "description": description, "url": chasUrl, "inLanguage": "en-GB" });
    const faqSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Who holds CHAS Elite status?", "acceptedAnswer": { "@type": "Answer", "text": "Premier Blasting holds CHAS Elite status. Commercial Shot Blasting is Premier Blasting’s commercial shot blasting arm and uses that relationship within its commercial assurance pathway." } }, { "@type": "Question", "name": "What safety criteria does CHAS Elite relate to?", "acceptedAnswer": { "@type": "Answer", "text": "CHAS describes the Common Assessment Standard as covering 13 risk-management areas through a consistent assessment process. It does not replace project-specific risk assessment, method statements, access planning, or agreed site controls." } }, { "@type": "Question", "name": "Does CHAS Elite replace a project-specific assessment?", "acceptedAnswer": { "@type": "Answer", "text": "No. The asset, access, surface condition, coating requirements, programme, and project documentation still need to be reviewed for the individual scope." } }] });
    let modifiedHtml = html;
    modifiedHtml = modifiedHtml.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
    modifiedHtml = modifiedHtml.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}" />`);
    const canonicalTags = `<link rel="canonical" href="${chasUrl}" />\n    <link rel="alternate" hreflang="en-gb" href="${chasUrl}" />\n    <link rel="alternate" hreflang="en" href="${chasUrl}" />`;
    modifiedHtml = /<link rel="canonical"[^>]*>/.test(modifiedHtml) ? modifiedHtml.replace(/<link rel="canonical"[^>]*>/, canonicalTags) : modifiedHtml.replace("</head>", `${canonicalTags}\n</head>`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${chasUrl}" />`);
    const capabilityStatementUrl = `${SITE_URL}/manus-storage/commercial-capability-statement-amended-linked-2026-09-14_9cee6eda.pdf`;
    const ssrBody = `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="${SITE_URL}/">Home</a> | <a href="${SITE_URL}/about">About</a> | <a href="${SITE_URL}/services">Services</a> | <a href="${capabilityStatementUrl}">Download capability statement PDF</a> | <a href="${SITE_URL}/site-survey">Request A Site Visit</a></nav><main><h1>What CHAS Elite can mean for your commercial project</h1><p>Commercial Shot Blasting is the commercial shot blasting arm of Premier Blasting. Premier Blasting holds CHAS Elite status.</p><h2>A recognised safety pre-qualification starting point</h2><p>CHAS describes Elite membership as a route to completing the Common Assessment Standard through one consistent assessment. The Common Assessment Standard covers 13 risk-management areas and gives commercial clients a recognised assurance reference during supplier review.</p><h2>What this can help your team do</h2><p>For fabricators, principal contractors, facilities teams, and asset owners, recognised pre-qualification information can support procurement readiness and allow the conversation to focus on access, containment, surface condition, programme, coating handover, and the controls your site needs.</p><p>CHAS Elite does not replace a project-specific assessment, risk assessment, method statement, access planning, client approvals, or agreed site controls. Scope, specification, and site conditions still need individual review.</p><h2>Capability statement</h2><p><a href="${capabilityStatementUrl}">Download the current approved capability statement PDF</a> for a project file, tender process, or internal review.</p><p><a href="${SITE_URL}/site-survey">Request A Site Visit</a> | <a href="tel:07970566409">07970 566409</a></p></main></div>`;
    modifiedHtml = modifiedHtml.replace("</head>", `<script type="application/ld+json">${breadcrumbSchema}</script>\n<script type="application/ld+json">${webPageSchema}</script>\n<script type="application/ld+json">${faqSchema}</script>\n</head>`);
    return modifiedHtml.replace("<!--SSR_CONTENT-->", ssrBody);
  }

  // ── Commercial capability statement page ───────────────────────────────────
  if (url === "/capability-statement" || url === "/capability-statement/") {
    const capabilityUrl = `${SITE_URL}/capability-statement`;
    const pdfUrl = `${SITE_URL}/manus-storage/commercial-capability-statement-amended-linked-2026-09-14_9cee6eda.pdf`;
    const title = "Commercial Capability Statement | Commercial Shot Blasting";
    const description = "Download or preview Commercial Shot Blasting's current capability statement: commercial services, CHAS Elite information, equipment and selected project examples.";
    const breadcrumbSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL }, { "@type": "ListItem", "position": 2, "name": "Capability Statement", "item": capabilityUrl }] });
    const webPageSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "@id": `${capabilityUrl}#webpage`, "name": title, "description": description, "url": capabilityUrl, "inLanguage": "en-GB" });
    let modifiedHtml = html;
    modifiedHtml = modifiedHtml.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
    modifiedHtml = modifiedHtml.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}" />`);
    const canonicalTags = `<link rel="canonical" href="${capabilityUrl}" />\n    <link rel="alternate" hreflang="en-gb" href="${capabilityUrl}" />\n    <link rel="alternate" hreflang="en" href="${capabilityUrl}" />`;
    modifiedHtml = /<link rel="canonical"[^>]*>/.test(modifiedHtml) ? modifiedHtml.replace(/<link rel="canonical"[^>]*>/, canonicalTags) : modifiedHtml.replace("</head>", `${canonicalTags}\n</head>`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${capabilityUrl}" />`);
    const ssrBody = `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="${SITE_URL}/">Home</a> | <a href="${SITE_URL}/about">About</a> | <a href="${SITE_URL}/chas-elite">CHAS Elite assurance</a> | <a href="${SITE_URL}/services">Services</a> | <a href="${SITE_URL}/contact">Get In Touch</a></nav><main><h1>Commercial capability statement</h1><p>A straightforward overview for commercial buyers putting together a tender pack, planning a site visit or shortlisting a blasting contractor.</p><h2>What it helps with</h2><p>A quick introduction to Commercial Shot Blasting and our relationship with Premier Blasting, CHAS Elite and health-and-safety information, core services and equipment, plus selected Doncaster and Wigan project examples.</p><h2>CHAS Elite in context</h2><p>Premier Blasting holds CHAS Elite status. It gives commercial teams a recognised assurance starting point before the practical job discussion starts. It does not replace project-specific RAMS, access planning, site controls or the agreed preparation and coating scope.</p><h2>Useful next steps</h2><p><a href="${pdfUrl}">Download the current capability statement PDF</a>, <a href="${SITE_URL}/case-studies/hb-tunnelling-doncaster">see the Doncaster project</a>, <a href="${SITE_URL}/case-studies/iss-property-former-bakkavor-foods-facility-wigan">see the Wigan project</a> or <a href="${SITE_URL}/commercial-blasting-specification-checklist">use the commercial blasting scope checklist</a>.</p><p><a href="${SITE_URL}/contact">Get In Touch</a> | <a href="tel:07970566409">07970 566409</a></p></main></div>`;
    modifiedHtml = modifiedHtml.replace("</head>", `<script type="application/ld+json">${breadcrumbSchema}</script>\n<script type="application/ld+json">${webPageSchema}</script>\n</head>`);
    return modifiedHtml.replace("<!--SSR_CONTENT-->", ssrBody);
  }

  // ── ISS Property — Former Bakkavor Foods Facility, Wigan case study ─────────
  if (url === "/case-studies/iss-property-former-bakkavor-foods-facility-wigan" || url === "/case-studies/iss-property-former-bakkavor-foods-facility-wigan/") {
    const caseStudyUrl = `${SITE_URL}/case-studies/iss-property-former-bakkavor-foods-facility-wigan`;
    const title = "ISS Property Former Bakkavor Foods Facility, Wigan | Case Study";
    const description = "Read how structural steel at ISS Property’s former Bakkavor Foods Facility in Wigan was prepared to Sa 2.5 before fire-protection coating, with a programmed one-stop blasting and coating sequence.";
    const image = `${SITE_URL}/manus-storage/iss-property-former-bakkavor-wigan-after-2026-09-15_21aa25d4.png`;
    const beforeImage = `${SITE_URL}/manus-storage/iss-property-former-bakkavor-wigan-before-2026-09-15_a00636db.png`;
    const breadcrumbSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL }, { "@type": "ListItem", "position": 2, "name": "Our Work", "item": `${SITE_URL}/our-work` }, { "@type": "ListItem", "position": 3, "name": "ISS Property — Former Bakkavor Foods Facility, Wigan", "item": caseStudyUrl }] });
    const articleSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "Article", "@id": `${caseStudyUrl}#article`, "headline": "ISS Property — Former Bakkavor Foods Facility, Wigan", "description": description, "mainEntityOfPage": { "@type": "WebPage", "@id": caseStudyUrl }, "image": [beforeImage, image], "author": { "@type": "Organization", "name": "Commercial Shot Blasting", "url": SITE_URL }, "publisher": { "@type": "Organization", "name": "Commercial Shot Blasting", "url": SITE_URL }, "about": ["structural steel surface preparation", "Sa 2.5 surface finish", "intumescent fire-protection coating", "Wigan"] });
    const imageObjectSchema = JSON.stringify({ "@context": "https://schema.org", "@graph": [
      { "@type": "ImageObject", "@id": `${caseStudyUrl}#before-image`, "contentUrl": beforeImage, "name": "Former Bakkavor Foods Facility structural steelwork before the Wigan project", "caption": "Supplied before image recording the existing coated structural steelwork at the former Bakkavor Foods Facility in Wigan.", "representativeOfPage": true },
      { "@type": "ImageObject", "@id": `${caseStudyUrl}#after-image`, "contentUrl": image, "name": "Former Bakkavor Foods Facility structural steelwork after the Wigan project", "caption": "Supplied after image recording the structural steelwork after the documented preparation and fire-protection coating sequence.", "representativeOfPage": true }
    ] });
    let modifiedHtml = html;
    modifiedHtml = modifiedHtml.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
    modifiedHtml = modifiedHtml.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}" />`);
    const canonicalTags = `<link rel="canonical" href="${caseStudyUrl}" />\n    <link rel="alternate" hreflang="en-gb" href="${caseStudyUrl}" />\n    <link rel="alternate" hreflang="en" href="${caseStudyUrl}" />`;
    modifiedHtml = /<link rel="canonical"[^>]*>/.test(modifiedHtml) ? modifiedHtml.replace(/<link rel="canonical"[^>]*>/, canonicalTags) : modifiedHtml.replace("</head>", `${canonicalTags}\n</head>`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${caseStudyUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${image}" />`);
    const leadImagePreload = `<link rel="preload" as="image" href="/images/case-studies/iss-property-wigan-after-960.webp" imagesrcset="/images/case-studies/iss-property-wigan-after-640.webp 640w, /images/case-studies/iss-property-wigan-after-960.webp 960w" imagesizes="100vw" fetchpriority="high" />`;
    const ssrBody = `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="${SITE_URL}/">Home</a> | <a href="${SITE_URL}/our-work">Our Work</a> | <a href="${SITE_URL}/services/structural-steel-frames">Structural Steel Frames</a> | <a href="${SITE_URL}/services/intumescent-painting">Intumescent Painting</a> | <a href="${SITE_URL}/service-areas/wigan">Shot Blasting in Wigan</a> | <a href="${SITE_URL}/site-survey">Request A Site Visit</a></nav><main><h1>ISS Property — Former Bakkavor Foods Facility, Wigan</h1><p>This case study records a £40,000 structural-steel surface-preparation and fire-protection coating project at the former Bakkavor Foods facility in Wigan. The recorded duration was 150 hours.</p><h2>The brief</h2><p>ISS Property required the structural steelwork to be prepared to an Sa 2.5 surface finish before the specified intumescent fire-protection coating stage. Some steel sections were exposed to the elements, making weather conditions a significant consideration.</p><h2>One coordinated preparation and coating sequence</h2><p>The project required a complete one-stop solution. Shot blasting was followed immediately by the application of a certified primer and topcoat to meet fire-protection requirements and prevent flash rusting.</p><h2>Programme planning</h2><p>A comprehensive site survey and steel-section measurement allowed blasting time to be calculated and the work to be programmed. Extended working hours and weekend shifts used favourable weather windows. The project was completed in 10 days, five days ahead of programme, without compromising quality or compliance.</p><h2>Supplied before-and-after project images</h2><p>The supplied before image records the existing structural steelwork condition at the former facility. The supplied after image records the steelwork after the project’s preparation and coating sequence.</p><h2>Supporting project media</h2><p>The full previously published project gallery of 25 supporting images, together with the previous short and extended project videos, remains available beneath the supplied Wigan before-and-after lead images.</p><h2>Planning a similar project?</h2><p><a href="${SITE_URL}/site-survey">Request A Site Visit</a> to discuss steel condition, access, exposure, surface-standard requirements, programme and coating handover.</p></main></div>`;
    modifiedHtml = modifiedHtml.replace("</head>", `${leadImagePreload}\n<script type="application/ld+json">${breadcrumbSchema}</script>\n<script type="application/ld+json">${articleSchema}</script>\n<script type="application/ld+json">${imageObjectSchema}</script>\n</head>`);
    return modifiedHtml.replace("<!--SSR_CONTENT-->", ssrBody);
  }

  // ── ADE Power Wakefield Marine CX enclosure project record ──────────────────
  if (url === "/case-studies/ade-power-wakefield-marine-cx-enclosures" || url === "/case-studies/ade-power-wakefield-marine-cx-enclosures/") {
    const caseStudyUrl = `${SITE_URL}/case-studies/ade-power-wakefield-marine-cx-enclosures`;
    const title = "ADE Power Wakefield | Large Enclosure Marine CX Preparation";
    const description = "See the ADE Power Wakefield project: large enclosures blasted and primed to the stated Marine CX standard, now moving through the flipping stage.";
    const image = `${SITE_URL}/manus-storage/ade-power-wakefield-marine-cx-hero_0d533b36.webp`;
    const movementVideo = `${SITE_URL}/manus-storage/ade-power-wakefield-enclosure-movement_72e7662d.mp4`;
    const flipVideo = `${SITE_URL}/manus-storage/ade-power-wakefield-enclosure-flip_e8bc8625.mp4`;
    const breadcrumbSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL }, { "@type": "ListItem", "position": 2, "name": "Our Work", "item": `${SITE_URL}/our-work` }, { "@type": "ListItem", "position": 3, "name": "ADE Power Wakefield Marine CX Enclosure Preparation", "item": caseStudyUrl }] });
    const articleSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "Article", "@id": `${caseStudyUrl}#article`, "headline": "ADE Power Wakefield — Marine CX Enclosure Preparation", "description": description, "mainEntityOfPage": { "@type": "WebPage", "@id": caseStudyUrl }, "image": [image], "author": { "@type": "Organization", "name": "Commercial Shot Blasting", "url": SITE_URL }, "publisher": { "@type": "Organization", "name": "Commercial Shot Blasting", "url": SITE_URL }, "about": ["ADE Power", "large enclosure preparation", "Marine CX", "Wakefield"] });
    const imageObjectSchema = JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "ImageObject", "@id": `${caseStudyUrl}#project-image`, "contentUrl": image, "name": "ADE Power Wakefield enclosure during the Marine CX project update", "caption": "Supplied project image of a large enclosure at ADE Power in Wakefield. The project update records blasting and priming to the stated Marine CX standard and the current flipping stage.", "representativeOfPage": true }] });
    const videoSchema = JSON.stringify({ "@context": "https://schema.org", "@graph": [
      { "@type": "VideoObject", "name": "ADE Power Wakefield enclosure movement", "description": "Supplied project footage showing a large enclosure moving from the industrial bay at the ADE Power Wakefield project.", "thumbnailUrl": image, "contentUrl": movementVideo, "embedUrl": caseStudyUrl, "duration": "PT23S", "publisher": { "@type": "Organization", "name": "Commercial Shot Blasting", "url": SITE_URL } },
      { "@type": "VideoObject", "name": "ADE Power Wakefield enclosure flipping stage", "description": "Supplied project footage recording the current enclosure-handling and flipping stage at the ADE Power Wakefield project.", "thumbnailUrl": image, "contentUrl": flipVideo, "embedUrl": caseStudyUrl, "duration": "PT1M52S", "publisher": { "@type": "Organization", "name": "Commercial Shot Blasting", "url": SITE_URL } }
    ] });
    let modifiedHtml = html;
    modifiedHtml = modifiedHtml.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
    modifiedHtml = modifiedHtml.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}" />`);
    const canonicalTags = `<link rel="canonical" href="${caseStudyUrl}" />\n    <link rel="alternate" hreflang="en-gb" href="${caseStudyUrl}" />\n    <link rel="alternate" hreflang="en" href="${caseStudyUrl}" />`;
    modifiedHtml = /<link rel="canonical"[^>]*>/.test(modifiedHtml) ? modifiedHtml.replace(/<link rel="canonical"[^>]*>/, canonicalTags) : modifiedHtml.replace("</head>", `${canonicalTags}\n</head>`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${caseStudyUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${image}" />`);
    const ssrBody = `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="${SITE_URL}/">Home</a> | <a href="${SITE_URL}/our-work">Our Work</a> | <a href="${SITE_URL}/services/marine-shot-blasting">Marine shot blasting</a> | <a href="${SITE_URL}/industries/marine">Marine industry</a> | <a href="${SITE_URL}/services/marine-cx-surface-preparation">Marine CX surface preparation</a> | <a href="${SITE_URL}/site-survey">Request A Site Visit</a></nav><main><h1>ADE Power Wakefield — Marine CX Enclosure Preparation</h1><p>At ADE Power in Wakefield, WF9, large enclosures have been blasted and primed to the stated Marine CX standard. The project has moved into the current flipping stage.</p><h2>Large commercial enclosure preparation</h2><p>The project photographs show large enclosures, prepared and primed surfaces, access equipment and the handling operation. The project footage records enclosure movement and the flipping stage.</p><h2>Why Marine CX preparation matters</h2><p>Marine CX is used for an extreme corrosive environment. It is not simply a thicker coat of paint: the project coating specification selects the coating system, number of coats and total dry-film build for the asset and maintenance approach.</p><p>Before primer, blasting removes contamination and creates a controlled microscopic anchor profile. The surface is not polished smooth; the required cleanliness, anchor profile and inspection checks come from the project coating specification and primer product data.</p><h2>Planning Marine CX blasting for a major asset</h2><p>Large enclosures need a practical plan for access, containment, protection of the work area, handling and the next coating stage. CX describes the coating environment; the project coating specification sets the preparation and handover requirements.</p><h2>Planning a similar enclosure project?</h2><p><a href="${SITE_URL}/services/marine-shot-blasting">Explore commercial marine shot blasting</a>, <a href="${SITE_URL}/services/marine-cx-surface-preparation">plan Marine CX surface preparation</a> or <a href="${SITE_URL}/site-survey">Request A Site Visit</a> to discuss asset condition, access, handling and coating handover.</p></main></div>`;
    modifiedHtml = modifiedHtml.replace("</head>", `<script type="application/ld+json">${breadcrumbSchema}</script>\n<script type="application/ld+json">${articleSchema}</script>\n<script type="application/ld+json">${imageObjectSchema}</script>\n<script type="application/ld+json">${videoSchema}</script>\n</head>`);
    return modifiedHtml.replace("<!--SSR_CONTENT-->", ssrBody);
  }

  // ── Commercial blasting specification checklist ─────────────────────────────
  if (url === "/commercial-blasting-specification-checklist" || url === "/commercial-blasting-specification-checklist/") {
    const resourceUrl = `${SITE_URL}/commercial-blasting-specification-checklist`;
    const title = "Commercial Blasting Specification Checklist | Contractors & Fabricators";
    const description = "A practical commercial shot blasting specification checklist for main contractors and fabricators: asset details, condition, access, coating handover and site planning.";
    const faqs = [
      { question: "Do I need a full blasting specification before I get in touch?", answer: "No. Send what you have—photos, drawings, the asset details and a note about what needs to happen next. If there is a coating specification or product data, include that too. We can then talk through the practical blasting scope." },
      { question: "What if the coating system has not been chosen yet?", answer: "We can still discuss the asset, condition, access and the site set-up. The final preparation requirements need to match the coating system and project specification once those are agreed." },
      { question: "Can you help with blasting and the next coating stage?", answer: "Yes. Tell us what the project needs. On relevant packages, we can plan the blasting, primer and protective-coating handover as one coordinated job around the agreed specification and site sequence." },
    ];
    const breadcrumbSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL }, { "@type": "ListItem", "position": 2, "name": "Services", "item": `${SITE_URL}/services` }, { "@type": "ListItem", "position": 3, "name": "Commercial Blasting Specification Checklist", "item": resourceUrl }] });
    const webPageSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "@id": `${resourceUrl}#webpage`, "name": title, "description": description, "url": resourceUrl, "inLanguage": "en-GB", "isPartOf": { "@type": "WebSite", "name": BUSINESS_NAME, "url": SITE_URL } });
    const faqSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map((faq) => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) });
    const canonicalTags = `<link rel="canonical" href="${resourceUrl}" />\n    <link rel="alternate" hreflang="en-gb" href="${resourceUrl}" />\n    <link rel="alternate" hreflang="en" href="${resourceUrl}" />`;
    const ssrBody = `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="${SITE_URL}/">Home</a> | <a href="${SITE_URL}/services">Services</a> | <a href="${SITE_URL}/services/structural-steel-frames">Structural steel</a> | <a href="${SITE_URL}/services/intumescent-painting">Intumescent painting</a> | <a href="${SITE_URL}/site-survey">Request A Site Visit</a></nav><main><h1>Commercial blasting specification checklist</h1><p>A straightforward checklist for main contractors and fabricators planning a large commercial blasting job. Send the asset details, its condition, the site information and what needs to happen after blasting, and we will help shape the practical scope.</p><h2>Five things to send us</h2><ol><li><strong>Show us the asset:</strong> photos, drawings, rough dimensions and the areas that need attention.</li><li><strong>Tell us the current condition:</strong> rust, mill scale, failed paint, old coatings or contamination.</li><li><strong>Share the next stage:</strong> coating specification, product data, preparation grade, profile or inspection requirements if available.</li><li><strong>Map out the site set-up:</strong> location, access, working area, nearby operations and any handling or lifting.</li><li><strong>Keep the programme moving:</strong> other trades, primer or coating handover, access windows and key dates.</li></ol><h2>A clear scope protects the whole job</h2><p>The blast-cleaning requirement needs to match the project specification and coating system. Access, containment and nearby operations need sorting before the team arrives, with a clear handover route into the next coating or refurbishment stage.</p><h2>Quick answers</h2>${faqs.map((faq) => `<article><h3>${faq.question}</h3><p>${faq.answer}</p></article>`).join("")}<p><a href="${SITE_URL}/site-survey">Request A Site Visit</a> to talk through your job.</p></main></div>`;
    let modifiedHtml = html;
    modifiedHtml = modifiedHtml.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
    modifiedHtml = modifiedHtml.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}" />`);
    modifiedHtml = /<link rel="canonical"[^>]*>/.test(modifiedHtml) ? modifiedHtml.replace(/<link rel="canonical"[^>]*>/, canonicalTags) : modifiedHtml.replace("</head>", `${canonicalTags}\n</head>`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${resourceUrl}" />`);
    modifiedHtml = modifiedHtml.replace("</head>", `<script type="application/ld+json">${breadcrumbSchema}</script>\n<script type="application/ld+json">${webPageSchema}</script>\n<script type="application/ld+json">${faqSchema}</script>\n</head>`);
    return modifiedHtml.replace("<!--SSR_CONTENT-->", ssrBody);
  }

  // ── HB Tunnelling Doncaster warehouse case study ─────────────────────────────
  if (url === "/case-studies/hb-tunnelling-doncaster" || url === "/case-studies/hb-tunnelling-doncaster/") {
    const caseStudyUrl = `${SITE_URL}/case-studies/hb-tunnelling-doncaster`;
    const title = "HB Tunnelling Doncaster | End-to-End Blasting & Intumescent Painting";
    const description = "See how a five-person multi-skilled team delivered a one-stop steelwork solution: abrasive blasting, immediate primer and intumescent fire-protective painting in planned same-day stages for HB Tunnelling in Doncaster.";
    const image = `${SITE_URL}/manus-storage/hb-tunnelling-video-still-25_e27be683.webp`;
    const beforeImage = `${SITE_URL}/manus-storage/hb-tunnelling-before_b02e1e81.webp`;
    const afterImage = `${SITE_URL}/manus-storage/hb-tunnelling-finished-painted-drone_42119577.webp`;
    const video = `${SITE_URL}/manus-storage/hb-tunnelling-doncaster-surface-preparation_0f209a96.mp4`;
    const breadcrumbSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL }, { "@type": "ListItem", "position": 2, "name": "Our Work", "item": `${SITE_URL}/our-work` }, { "@type": "ListItem", "position": 3, "name": "HB Tunnelling Doncaster Case Study", "item": caseStudyUrl }] });
    const articleSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "Article", "@id": `${caseStudyUrl}#article`, "headline": "HB Tunnelling Doncaster: End-to-End Blasting and Intumescent Painting", "description": description, "mainEntityOfPage": { "@type": "WebPage", "@id": caseStudyUrl }, "image": [image], "author": { "@type": "Organization", "name": "Commercial Shot Blasting", "url": SITE_URL }, "publisher": { "@type": "Organization", "name": "Commercial Shot Blasting", "url": SITE_URL }, "about": ["warehouse refurbishment", "abrasive blasting", "intumescent fire-protective painting", "Doncaster"] });
    const imageObjectSchema = JSON.stringify({ "@context": "https://schema.org", "@graph": [
      { "@type": "ImageObject", "@id": `${caseStudyUrl}#before-image`, "contentUrl": beforeImage, "name": "HB Tunnelling Doncaster warehouse steelwork before refurbishment", "caption": "Before image of the Doncaster warehouse steelwork ahead of the documented surface-preparation and coating sequence.", "representativeOfPage": true },
      { "@type": "ImageObject", "@id": `${caseStudyUrl}#after-image`, "contentUrl": afterImage, "name": "HB Tunnelling Doncaster finished painted warehouse site", "caption": "Aerial completion image of the finished painted Doncaster warehouse site.", "representativeOfPage": true },
      { "@type": "ImageObject", "@id": `${caseStudyUrl}#project-film-still`, "contentUrl": image, "name": "HB Tunnelling Doncaster warehouse refurbishment project film still", "caption": "Project-film still from the Doncaster warehouse refurbishment.", "representativeOfPage": false }
    ] });
    const videoSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "VideoObject", "name": "HB Tunnelling Doncaster end-to-end blasting and intumescent painting", "description": "Project film showing a five-person multi-skilled team delivering abrasive blasting, immediate primer protection and intumescent fire-protective coating in planned same-day stages.", "thumbnailUrl": image, "contentUrl": video, "embedUrl": caseStudyUrl, "duration": "PT44S", "publisher": { "@type": "Organization", "name": "Commercial Shot Blasting", "url": SITE_URL } });
    let modifiedHtml = html;
    modifiedHtml = modifiedHtml.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
    modifiedHtml = modifiedHtml.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}" />`);
    const canonicalTags = `<link rel="canonical" href="${caseStudyUrl}" />\n    <link rel="alternate" hreflang="en-gb" href="${caseStudyUrl}" />\n    <link rel="alternate" hreflang="en" href="${caseStudyUrl}" />`;
    modifiedHtml = /<link rel="canonical"[^>]*>/.test(modifiedHtml) ? modifiedHtml.replace(/<link rel="canonical"[^>]*>/, canonicalTags) : modifiedHtml.replace("</head>", `${canonicalTags}\n</head>`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${caseStudyUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${image}" />`);
    const ssrBody = `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="${SITE_URL}/">Home</a> | <a href="${SITE_URL}/our-work">Our Work</a> | <a href="${SITE_URL}/services/structural-steel-frames">Structural Steel Frames</a> | <a href="${SITE_URL}/services/intumescent-painting">Intumescent Painting</a> | <a href="${SITE_URL}/service-areas/doncaster">Shot Blasting in Doncaster</a> | <a href="${SITE_URL}/site-survey">Request A Site Visit</a></nav><main><h1>HB Tunnelling Doncaster: Rapid End-to-End Blasting and Intumescent Painting</h1><p>This Doncaster warehouse refurbishment was delivered on a £150,000 contract over a six-week programme by a five-person multi-skilled team.</p><h2>The client requirement: one-stop delivery for the warehouse steelwork</h2><p>HB Tunnelling required the newly acquired warehouse to be shot blasted, fireproof painted and readied for the wider roof refurbishment before it could be brought into operation. The steelwork had to be primed immediately after blasting to prevent surface contamination or deterioration that could compromise coating adhesion.</p><h2>What we delivered: carefully planned same-day stages</h2><p>Our five-person multi-skilled team carried out abrasive blasting and applied the fire-protective primer in carefully planned stages, completing each section within a single day. The team then applied the intumescent fire-protective paint as part of the same coordinated delivery.</p><h2>Abrasive blasting from elevated access</h2><p>The team worked from elevated access equipment to abrasive blast the existing steelwork, removing corrosion and old coatings and preparing the surface for its protective paint system.</p><h2>Primer applied immediately after blasting</h2><p>As each area was prepared, primer was applied straight after abrasive blasting to prevent surface contamination or deterioration before the fire-protection stage. This same-day sequence kept freshly prepared steel protected.</p><h2>Continuous progress through to intumescent fire protection</h2><p>Keeping surface preparation, primer and intumescent fire-protective painting under one five-person team maintained continuous progress, minimised downtime and helped ensure the warehouse was completed to the client requirements and on schedule.</p><h2>Project film and before-and-after views</h2><p>Watch the project film for blasting, coating and aerial site views. The case study also shows the steelwork before work began and the finished painted warehouse site.</p><h2>Planning a similar project?</h2><p><a href="${SITE_URL}/site-survey">Request A Site Visit</a> to discuss surface condition, access, containment, programme and intended coating handover. For campaign enquiries, <a href="https://wa.me/447970566409?text=Hello%2C%20I%20am%20interested%20in%20a%20warehouse%20steelwork%20refurbishment%20similar%20to%20the%20HB%20Tunnelling%20Doncaster%20project.%20I%20would%20like%20to%20arrange%20a%20site%20visit.">contact the team on WhatsApp</a>.</p></main></div>`;
    modifiedHtml = modifiedHtml.replace("</head>", `<script type="application/ld+json">${breadcrumbSchema}</script>\n<script type="application/ld+json">${articleSchema}</script>\n<script type="application/ld+json">${imageObjectSchema}</script>\n<script type="application/ld+json">${videoSchema}</script>\n</head>`);
    return modifiedHtml.replace("<!--SSR_CONTENT-->", ssrBody);
  }

  // ── Provisional fire-escape project record (pending approved media) ─────────
  if (url === "/case-studies/fire-escape-multi-storey-office" || url === "/case-studies/fire-escape-multi-storey-office/") {
    const caseStudyUrl = `${SITE_URL}/case-studies/fire-escape-multi-storey-office`;
    const title = "Fire Escape Project Record (Provisional) | Commercial Shot Blasting";
    const description = "A provisional record for a multi-storey office fire-escape restoration. Final approved project media will be added when available.";
    const image = `${SITE_URL}/manus-storage/fireescape1before_b56bfae9.jpg`;
    const breadcrumbSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL }, { "@type": "ListItem", "position": 2, "name": "Our Work", "item": `${SITE_URL}/our-work` }, { "@type": "ListItem", "position": 3, "name": "Fire Escape Project Record (Provisional)", "item": caseStudyUrl }] });
    const webPageSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "@id": `${caseStudyUrl}#webpage`, "name": title, "description": description, "url": caseStudyUrl, "inLanguage": "en-GB" });
    let modifiedHtml = html;
    modifiedHtml = modifiedHtml.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
    modifiedHtml = modifiedHtml.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}" />`);
    const canonicalTags = `<link rel="canonical" href="${caseStudyUrl}" />\n    <meta name="robots" content="noindex, follow" />`;
    modifiedHtml = /<link rel="canonical"[^>]*>/.test(modifiedHtml) ? modifiedHtml.replace(/<link rel="canonical"[^>]*>/, canonicalTags) : modifiedHtml.replace("</head>", `${canonicalTags}\n</head>`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${caseStudyUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${image}" />`);
    const ssrBody = `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="${SITE_URL}/">Home</a> | <a href="${SITE_URL}/our-work?category=Staircases#staircases">Our Work: Staircases</a> | <a href="${SITE_URL}/services/fire-escapes">Fire Escapes &amp; Stair Towers</a> | <a href="${SITE_URL}/external-staircases">External Staircases</a> | <a href="${SITE_URL}/site-survey">Request A Site Visit</a></nav><main><h1>Fire Escape Restoration — Multi-Storey Office (Provisional Project Record)</h1><p>This is a provisional record for a multi-storey office external fire-escape project. The currently published image is a non-project-specific placeholder service image, not evidence from the individual project.</p><h2>What is recorded today</h2><p>The existing project summary identifies rust and failed coating removal from the external fire escape. Full approved project photography, video and verified delivery detail have not yet been supplied for publication.</p><h2>Media and information status</h2><p>This page is intentionally marked noindex while the approved project-media set is pending. It will be expanded or replaced once the final evidence is available.</p><h2>Planning fire-escape work?</h2><p><a href="${SITE_URL}/services/fire-escapes">Explore fire-escape and stair-tower surface-preparation support</a>, or <a href="${SITE_URL}/site-survey">Request A Site Visit</a> to discuss current condition, access and intended finish.</p></main></div>`;
    modifiedHtml = modifiedHtml.replace("</head>", `<script type="application/ld+json">${breadcrumbSchema}</script>\n<script type="application/ld+json">${webPageSchema}</script>\n</head>`);
    return modifiedHtml.replace("<!--SSR_CONTENT-->", ssrBody);
  }

  // ── Bromsgrove School spiral staircase restoration case study ────────────────
  if (url === "/case-studies/bromsgrove-school-staircase" || url === "/case-studies/bromsgrove-school-staircase/") {
    const caseStudyUrl = `${SITE_URL}/case-studies/bromsgrove-school-staircase`;
    const title = "Bromsgrove School Staircase Restoration | Commercial Shot Blasting";
    const description = "See the Bromsgrove School external spiral staircase restoration: flaking paint and rust-affected areas restored with a black finish, including black anti-slip paint to the steps.";
    const image = `${SITE_URL}/manus-storage/bromsgrove-staircase-after_ae521dcd.png`;
    const beforeImage = `${SITE_URL}/manus-storage/bromsgrove-school-staircase-before-definitive-2026-09-14_dca201c9.png`;
    const video = `${SITE_URL}/manus-storage/bromsgrove-school-staircase-before_96c645cd.mp4`;
    const breadcrumbSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL }, { "@type": "ListItem", "position": 2, "name": "Our Work", "item": `${SITE_URL}/our-work` }, { "@type": "ListItem", "position": 3, "name": "Bromsgrove School Staircase Restoration", "item": caseStudyUrl }] });
    const articleSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "Article", "@id": `${caseStudyUrl}#article`, "headline": "Bromsgrove School External Spiral Staircase Restoration", "description": description, "mainEntityOfPage": { "@type": "WebPage", "@id": caseStudyUrl }, "image": [image], "author": { "@type": "Organization", "name": "Commercial Shot Blasting", "url": SITE_URL }, "publisher": { "@type": "Organization", "name": "Commercial Shot Blasting", "url": SITE_URL }, "about": ["external staircase restoration", "rust-affected steelwork", "anti-slip stair paint", "Bromsgrove School"] });
    const imageObjectSchema = JSON.stringify({ "@context": "https://schema.org", "@graph": [
      { "@type": "ImageObject", "@id": `${caseStudyUrl}#before-image`, "contentUrl": beforeImage, "name": "Bromsgrove School external spiral staircase before restoration", "caption": "Supplied definitive before image recording flaking paint and rust-affected areas on the external spiral staircase.", "representativeOfPage": true },
      { "@type": "ImageObject", "@id": `${caseStudyUrl}#after-image`, "contentUrl": image, "name": "Bromsgrove School finished black external spiral staircase", "caption": "Approved finished image of the external spiral staircase in black, with black anti-slip paint applied to the steps.", "representativeOfPage": true }
    ] });
    const videoSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "VideoObject", "name": "Bromsgrove School external spiral staircase before restoration", "description": "Before footage of the Bromsgrove School external spiral staircase showing the recorded existing condition prior to restoration.", "thumbnailUrl": `${SITE_URL}/manus-storage/bromsgrove-staircase-before-01_9ba57d63.jpg`, "contentUrl": video, "embedUrl": caseStudyUrl, "duration": "PT1M56S", "publisher": { "@type": "Organization", "name": "Commercial Shot Blasting", "url": SITE_URL } });
    let modifiedHtml = html;
    modifiedHtml = modifiedHtml.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
    modifiedHtml = modifiedHtml.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}" />`);
    const canonicalTags = `<link rel="canonical" href="${caseStudyUrl}" />\n    <link rel="alternate" hreflang="en-gb" href="${caseStudyUrl}" />\n    <link rel="alternate" hreflang="en" href="${caseStudyUrl}" />`;
    modifiedHtml = /<link rel="canonical"[^>]*>/.test(modifiedHtml) ? modifiedHtml.replace(/<link rel="canonical"[^>]*>/, canonicalTags) : modifiedHtml.replace("</head>", `${canonicalTags}\n</head>`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${caseStudyUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${image}" />`);
    const ssrBody = `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="${SITE_URL}/">Home</a> | <a href="${SITE_URL}/our-work">Our Work</a> | <a href="${SITE_URL}/external-staircases">External Staircases</a> | <a href="${SITE_URL}/service-areas/bromsgrove">Shot Blasting in Bromsgrove</a> | <a href="${SITE_URL}/site-survey">Request A Site Visit</a></nav><main><h1>Bromsgrove School: External Spiral Staircase Restoration</h1><p>This case study documents the restoration of an external spiral staircase at Bromsgrove School. The supplied before record shows flaking paint and rust-affected areas on the stair structure.</p><h2>The restoration brief</h2><p>The required outcome was to bring the staircase back to life with a black finish, including black anti-slip paint on the steps.</p><h2>Recorded existing condition</h2><p>The supplied before images and footage show the external spiral flights, landings and guardrails ahead of the restoration work, with flaking paint and rust in areas.</p><h2>Finished black staircase</h2><p>The completed after image records the restored external spiral staircase finished in black. Black anti-slip paint was added to the steps as part of the completed treatment.</p><h2>Planning a similar external staircase project?</h2><p><a href="${SITE_URL}/site-survey">Request A Site Visit</a> to discuss existing condition, access, stair flights or landings, and the finish required for your project.</p></main></div>`;
    modifiedHtml = modifiedHtml.replace("</head>", `<script type="application/ld+json">${breadcrumbSchema}</script>\n<script type="application/ld+json">${articleSchema}</script>\n<script type="application/ld+json">${imageObjectSchema}</script>\n<script type="application/ld+json">${videoSchema}</script>\n</head>`);
    return modifiedHtml.replace("<!--SSR_CONTENT-->", ssrBody);
  }

  // ── Phase-one pillar pages ─────────────────────────────────────────────────
  const pillarPath = url.replace(/\/$/, "");
  const pillarPages: Record<string, {
    title: string;
    description: string;
    image: string;
    heading: string;
    intro: string;
    links: Array<{ label: string; href: string }>;
    faqs: Array<{ question: string; answer: string }>;
  }> = {
    "/steel-fabrication-surface-preparation": {
      title: "Steel Fabrication & Structural Steel Surface Preparation | Commercial Shot Blasting",
      description: "Plan steel fabrication and structural-steel surface preparation before protective coating. Explore scope inputs, specialist services, verified project evidence, guidance, and Site Visit support.",
      image: "https://commercialshotblasting.co.uk/manus-storage/IMG_3365_56728af1.webp",
      heading: "Steel Fabrication & Structural Steel Surface Preparation",
      intro: "A commercial planning hub for fabricators, estimators, contractors, and coating teams preparing structural frames, fabricated steel sections, mill scale, corrosion, and coating handover. Define the components, surface condition, access, coating requirement, and sequencing before a Site Visit.",
      links: [
        { label: "Structural Steel Frames", href: "/services/structural-steel-frames" },
        { label: "Steel Fabrications", href: "/steel-fabrications" },
        { label: "Fabrication cost and programme guide", href: "/blog/steel-fabrication-shot-blasting-costs-and-programme-guide" },
        { label: "Sa 2.5 glossary", href: "/glossary/sa-2-5" },
      ],
      faqs: [
        { question: "What information helps prepare a steelwork blast-cleaning estimate?", answer: "Drawings or a component schedule, dimensions, photographs of the existing surface, access information, and the intended coating system all help define the work. A Site Visit can confirm practical details that photographs do not show." },
        { question: "Why should coating requirements be discussed before blast cleaning?", answer: "The specified coating system may require particular cleanliness, profile, inspection, and handover arrangements. Confirming the coating requirement early reduces the risk of a mismatch between preparation and the next trade." },
      ],
    },
    "/steel-chimney-process-stack-surface-preparation": {
      title: "Steel Chimney, Process Stack & Flue Surface Preparation | Commercial Shot Blasting",
      description: "Plan surface preparation for fabricated steel chimneys, process stacks, flues, and duct sections. Review verified chimney evidence, scope inputs, specialist services, and Site Visit guidance.",
      image: "https://commercialshotblasting.co.uk/manus-storage/SteelChimneyAfter2_3b5e3186.jpeg",
      heading: "Steel Chimney, Process Stack & Flue Surface Preparation",
      intro: "A planning hub for fabricated steel chimney sections, process stacks, flues, and related ductwork. The supplied verified project evidence documents a fabricated chimney section at surface-preparation stage, including its cylindrical body, flange, access opening, stiffeners, and accessible internal surfaces. It does not establish a location, programme, blast standard, client, or final coating system.",
      links: [
        { label: "Steel Chimneys, Process Stacks & Flues", href: "/services/steel-chimney-surface-preparation" },
        { label: "Verified steel chimney case study", href: "/our-work#steel-chimney-case-study" },
        { label: "Process Pipework, Spools & Manifolds", href: "/services/pipework" },
        { label: "Chimney and process-stack guide", href: "/blog/steel-chimney-process-stack-surface-preparation" },
      ],
      faqs: [
        { question: "Can a chimney section be assessed before a blast standard is chosen?", answer: "Yes. The existing condition, coating specification, accessible surfaces, project requirements, and relevant records should be reviewed before a specific preparation standard is assumed." },
        { question: "What should be included with an enquiry for a process stack or fabricated flue?", answer: "Useful information includes drawings or dimensions, photos of all sides, access openings, flange details, lifting and handling arrangements, the existing coating condition, and the intended next stage." },
      ],
    },
    "/industrial-steelwork-restoration": {
      title: "Industrial Steelwork Restoration & Corrosion Preparation | Commercial Shot Blasting",
      description: "Plan industrial steelwork restoration and corrosion preparation for pipework, containers, access steelwork, bridge components, and plant. Explore specialist pathways and Site Visit support.",
      image: "https://commercialshotblasting.co.uk/manus-storage/IMG_3349_cb9e8c4d.webp",
      heading: "Industrial Steelwork Restoration & Corrosion Preparation",
      intro: "A commercial planning hub for facilities teams, maintenance contractors, and asset owners reviewing corrosion, failed coatings, mill scale, and surface condition across pipework, containers, access steelwork, bridge components, and industrial plant. The relevant route depends on the asset, access, operating context, coating objective, and project requirements.",
      links: [
        { label: "Process Pipework, Spools & Manifolds", href: "/services/pipework" },
        { label: "Steel Container Blasting", href: "/services/steel-containers" },
        { label: "Fire Escapes & External Stair Towers", href: "/services/fire-escapes" },
        { label: "Bridge Steelwork", href: "/services/bridge-steelwork" },
      ],
      faqs: [
        { question: "How do you decide which industrial steelwork service is relevant?", answer: "The asset type, existing condition, access, operational environment, coating objective, and programme context guide the service discussion. This hub routes you to the most relevant specialist page before a Site Visit." },
        { question: "Does corrosion appearance alone define the required preparation method?", answer: "No. Surface appearance is only one input. The final approach should account for the asset, coating specification, access, condition, environmental controls, and any project-specific requirements." },
      ],
    },
    "/factory-cladding-restoration": {
      title: "Factory Cladding Restoration & Coating Preparation | Commercial Shot Blasting",
      description: "Plan factory and warehouse cladding preparation before the next coating stage. Bring together scope inputs, access, operating constraints, cladding services and a practical Site Visit conversation.",
      image: "https://commercialshotblasting.co.uk/manus-storage/IMG_3343_ac1c8682.webp",
      heading: "Factory Cladding Restoration & Coating Preparation",
      intro: "A commercial planning hub for factory and warehouse cladding refurbishment. Panel condition, existing coatings, working height, adjacent activity and the specified handover all affect the sensible route forward, so we discuss those points before agreeing a preparation scope.",
      links: [
        { label: "Factory & Warehouse Cladding", href: "/services/factory-cladding" },
        { label: "Coating Removal", href: "/services/coating-removal" },
        { label: "Commercial blasting scope checklist", href: "/commercial-blasting-specification-checklist" },
        { label: "Cladding restoration guide", href: "/blog/restoring-factory-warehouse-cladding" },
      ],
      faqs: [
        { question: "What should be included in a factory cladding restoration enquiry?", answer: "Provide photographs of all elevations, dimensions where available, access details, operating constraints, existing coating condition, and the intended new coating system. A Site Visit can then confirm practical scope factors." },
        { question: "Can one cladding project confirm the preparation standard for every building?", answer: "No. Preparation requirements should be confirmed from the relevant project specification, panel condition, access arrangements and the coating system being used on that building." },
      ],
    },
    "/process-pipework-spools-surface-preparation": {
      title: "Process Pipework, Spools & Support Steelwork Surface Preparation | Commercial Shot Blasting",
      description: "Plan blast cleaning for process pipework, spools, manifolds, and support steelwork before protective coating. Review approved water-treatment evidence and Site Visit guidance.",
      image: "https://commercialshotblasting.co.uk/manus-storage/IMG_3349_cb9e8c4d.webp",
      heading: "Process Pipework, Spools & Support Steelwork Surface Preparation",
      intro: "The approved project record on this site documents external blast cleaning of 850 metres of process pipework and support steelwork at a water-treatment facility, achieving Sa 2.5 for a three-coat epoxy coating system. It does not establish a site location, programme, client, operating condition, or further project claims.",
      links: [
        { label: "Process Pipework, Spools & Manifolds", href: "/services/pipework" },
        { label: "Industrial Steelwork Restoration", href: "/industrial-steelwork-restoration" },
        { label: "Approved water-treatment pipework project", href: "/our-work#pipework-south" },
        { label: "Fabricator cost and programme guide", href: "/blog/steel-fabrication-shot-blasting-costs-and-programme-guide" },
      ],
      faqs: [
        { question: "What information helps prepare an enquiry for pipework blast cleaning?", answer: "Useful information includes line or spool references, drawings, photographs of the full run and support steelwork, isolation status, access, existing coating condition, operating constraints, and the intended coating system." },
        { question: "Does the approved water-treatment project record apply to every pipework project?", answer: "No. It documents the stated 850-metre water-treatment scope, Sa 2.5 result, and three-coat epoxy handover for that project only. Another asset needs its own specification and condition assessment." },
      ],
    },
    "/agricultural-steelwork-grain-store-preparation": {
      title: "Agricultural Steelwork & Grain Store Surface Preparation | Commercial Shot Blasting",
      description: "Plan surface preparation for agricultural steelwork, farm machinery, grain-store structures, and rural building components before protective coating. Review approved project evidence and Site Visit guidance.",
      image: "https://commercialshotblasting.co.uk/manus-storage/IMG_3334_2858c684.webp",
      heading: "Agricultural Steelwork & Grain Store Surface Preparation",
      intro: "A planning hub for agricultural steelwork, farm machinery, grain-store structures, and rural building components. The approved project record on this site documents rust removal and surface preparation on 14 pieces of farm machinery before protective coating. It does not document a grain-store project, a location, a programme, a client, or a specific preparation standard.",
      links: [
        { label: "Agricultural Shot Blasting", href: "/services/agricultural-shot-blasting" },
        { label: "Plant & Machinery", href: "/services/plant-machinery" },
        { label: "Industrial Steelwork Restoration", href: "/industrial-steelwork-restoration" },
        { label: "Seasonal agricultural steelwork maintenance guide", href: "/blog/seasonal-agricultural-steelwork-maintenance-guide" },
        { label: "Rust grade glossary", href: "/glossary/rust-grade" },
      ],
      faqs: [
        { question: "What information helps scope agricultural steelwork or grain-store surface preparation?", answer: "Photographs, dimensions, asset or building details, surface condition, access information, seasonal constraints, and the intended coating or repair stage all help define an initial scope. A Site Visit can confirm practical details." },
        { question: "Does the approved farm-machinery project record also document a grain-store project?", answer: "No. It documents preparation of 14 pieces of farm machinery before protective coating. Grain-store structures and agricultural buildings need their own condition assessment, scope, access plan, and specification review." },
      ],
    },
    "/container-restoration-storage-steelwork": {
      title: "Container Restoration & Storage Steelwork Surface Preparation | Commercial Shot Blasting",
      description: "Plan surface preparation for steel containers, storage units, and containerised steelwork before recoating. Review approved container-project evidence and Site Visit guidance.",
      image: "https://commercialshotblasting.co.uk/manus-storage/IMG_3354_caa39ac3.webp",
      heading: "Container Restoration & Storage Steelwork Surface Preparation",
      intro: "The approved project record on this site documents removal of rust and old coatings from 18 shipping containers at a logistics depot, returned to Sa 2.5 and recoated on site. It does not establish a depot location, programme, client, coating product, or further fleet claims.",
      links: [
        { label: "Steel Container Blasting", href: "/services/steel-containers" },
        { label: "Industrial Steelwork Restoration", href: "/industrial-steelwork-restoration" },
        { label: "Approved container project", href: "/our-work#container-blasting-midlands" },
        { label: "Shot blasting versus chemical stripping", href: "/blog/shot-blasting-vs-chemical-stripping" },
      ],
      faqs: [
        { question: "What information helps scope a container restoration enquiry?", answer: "Useful information includes container quantities and dimensions, photographs of every side and roof where accessible, existing coating condition, corrosion, door and frame details, access arrangements, operational restrictions, and the intended recoating system." },
        { question: "Does the approved container project record apply to every storage-container project?", answer: "No. It documents 18 shipping containers at a logistics depot, returned to Sa 2.5 and recoated on site. Each container or storage-steelwork scope needs its own condition assessment, access review, and coating specification." },
      ],
    },
    "/mobile-on-site-shot-blasting": {
      title: "Mobile & On-Site Shot Blasting for Commercial Projects | Commercial Shot Blasting",
      description: "Plan commercial mobile and on-site shot blasting for structural steel, cladding, containers, plant, and industrial metal assets. Explore access, containment, surface condition, coating handover, and Site Visit guidance.",
      image: "https://commercialshotblasting.co.uk/manus-storage/IMG_3365_56728af1.webp",
      heading: "Mobile & On-Site Shot Blasting for Commercial Projects",
      intro: "A commercial planning hub for asset owners, facilities teams, fabricators, and contractors considering on-site surface preparation. The working area, access, asset dimensions, surrounding operations, containment needs, material handling, existing condition, intended coating, inspection requirements, and programme interfaces should be reviewed before a detailed method or schedule is assumed.",
      links: [
        { label: "Structural Steel Frames", href: "/services/structural-steel-frames" },
        { label: "Factory & Warehouse Cladding", href: "/services/factory-cladding" },
        { label: "Steel Container Blasting", href: "/services/steel-containers" },
        { label: "Mobile and on-site blasting planning guide", href: "/blog/mobile-on-site-shot-blasting-project-planning-guide" },
        { label: "Commercial shot blasting and sandblasting guide", href: "/commercial-shot-blasting-sandblasting" },
        { label: "ISO 8501-1, Sa 2½ and Sa 3 guide", href: "/blog/iso-8501-1-sa-2-5-sa-3-surface-preparation-guide" },
        { label: "Request A Site Visit", href: "/site-survey" },
      ],
      faqs: [
        { question: "What information helps assess whether a project is suitable for on-site shot blasting?", answer: "Useful information includes the asset type and dimensions, photographs of the current condition, accessible working areas, access routes, surrounding operations, adjacent surfaces, containment needs, the intended coating stage, and any programme restrictions. A Site Visit can then consider the specific project conditions." },
        { question: "Can every commercial steel asset be prepared on site?", answer: "Not automatically. The practical approach depends on the asset, site layout, access, condition, safety requirements, protection of surrounding operations, containment, handling, and the next project stage. These details should be assessed before a method is agreed." },
      ],
    },
    "/commercial-shot-blasting-sandblasting": {
      title: "Commercial Shot Blasting Services | Industrial Projects Nationwide",
      description: "Nationwide commercial shot blasting services for structural steel, cladding, concrete floors, pipework, containers, plant and industrial assets. Start with the asset, condition and next stage.",
      image: "https://commercialshotblasting.co.uk/manus-storage/IMG_3365_56728af1.webp",
      heading: "Commercial Shot Blasting Services for Industrial Projects",
      intro: "We work with main contractors, fabricators, facilities teams and asset owners on substantial commercial blasting jobs nationwide. From structural steel and factory cladding to concrete floors, pipework, containers and plant, the starting point is the asset, its condition, site access and what needs to happen next. Many buyers search for “sandblasting”; we use that language where it helps, then plan the actual work around the job in front of us.",
      links: [
        { label: "Structural Steel Frames", href: "/services/structural-steel-frames" },
        { label: "Commercial Floor Shot Blasting", href: "/services/floor-preparation" },
        { label: "Factory & Warehouse Cladding", href: "/services/factory-cladding" },
        { label: "Mobile & On-Site Shot Blasting", href: "/mobile-on-site-shot-blasting" },
        { label: "Intumescent Painting", href: "/services/intumescent-painting" },
        { label: "Marine CX Surface Preparation", href: "/services/marine-cx-surface-preparation" },
        { label: "Commercial blasting specification checklist", href: "/commercial-blasting-specification-checklist" },
        { label: "HB Tunnelling Doncaster case study", href: "/case-studies/hb-tunnelling-doncaster" },
        { label: "ADE Power Wakefield project", href: "/case-studies/ade-power-wakefield-marine-cx-enclosures" },
        { label: "Request A Site Visit", href: "/site-survey" },
      ],
      faqs: [
        { question: "Do you provide commercial sandblasting?", answer: "Many buyers use “sandblasting” as the search term for the kind of work they need. We provide commercial shot blasting and surface preparation, then plan the job around the asset, site, access, protection of nearby work and the next coating or refurbishment stage." },
        { question: "What information helps scope a commercial shot blasting job?", answer: "Useful starting information is photos, drawings or rough dimensions, the asset type, current condition, accessible faces, site postcode, access, nearby activity, anything that needs protecting and the next stage after blasting." },
        { question: "Can one team coordinate blasting and the next coating stage?", answer: "Where the package calls for it, we can talk through the blasting, primer and protective-coating handover as one coordinated job. The right sequence is always agreed around the project specification, site set-up and the coating system being used." },
      ],
    },
    "/intumescent-paint-for-steel": {
      title: "Intumescent Paint for Steel: Preparation & Handover Planning | Commercial Shot Blasting",
      description: "Plan structural-steel preparation and handover before intumescent fire-protective paint. Explore scope inputs, approved HB Tunnelling project evidence, specialist routes, and Site Visit guidance.",
      image: "https://commercialshotblasting.co.uk/manus-storage/hb-tunnelling-intumescent-steelwork_83670264.jpeg",
      heading: "Intumescent Paint for Steel: Preparation & Handover Planning",
      intro: "A planning hub for the handover between structural-steel preparation and intumescent fire-protective painting. The approved HB Tunnelling Doncaster case study documents abrasive blasting, primer applied immediately after preparation to protect coating adhesion, and intumescent fire-protective painting by a five-person multi-skilled team. Each package still needs its own condition, access, specification, and programme review.",
      links: [
        { label: "Intumescent Painting", href: "/services/intumescent-painting" },
        { label: "Structural Steel Frames", href: "/services/structural-steel-frames" },
        { label: "HB Tunnelling Doncaster case study", href: "/case-studies/hb-tunnelling-doncaster" },
        { label: "Intumescent steelwork planning guide", href: "/blog/intumescent-steelwork-specification-planning-guide" },
        { label: "Request A Site Visit", href: "/site-survey" },
      ],
      faqs: [
        { question: "What should be agreed before steelwork is prepared for intumescent paint?", answer: "The steelwork and accessible areas, existing surface condition, specified fire-protective system, preparation requirement, primer sequence, inspection points, access, containment, and handover process should be clarified before a project-specific method is assumed." },
        { question: "Why does the interval between preparation and primer matter?", answer: "The approved HB Tunnelling case study states that primer was applied immediately after blasting to protect coating adhesion. The required sequence for another project depends on its specification, condition, environment, access, and coating-system requirements." },
      ],
    },
  };
  const pillar = pillarPages[pillarPath];
  if (pillar) {
    const pillarUrl = `${SITE_URL}${pillarPath}`;
    const breadcrumbSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL }, { "@type": "ListItem", "position": 2, "name": "Services", "item": `${SITE_URL}/services` }, { "@type": "ListItem", "position": 3, "name": pillar.heading, "item": pillarUrl }] });
    const webPageSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "@id": `${pillarUrl}#webpage`, "name": pillar.title, "description": pillar.description, "url": pillarUrl, "inLanguage": "en-GB", "primaryImageOfPage": { "@type": "ImageObject", "url": pillar.image } });
    const faqSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": pillar.faqs.map((faq) => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) });
    const resourceLinks = pillar.links.map((link) => `<li><a href="${SITE_URL}${link.href}">${link.label}</a></li>`).join("");
    const ssrBody = `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="${SITE_URL}/">Home</a> | <a href="${SITE_URL}/services">Services</a> | <a href="${SITE_URL}/our-work">Our Work</a> | <a href="${SITE_URL}/blog">Blog</a> | <a href="${SITE_URL}/glossary">Glossary</a> | <a href="${SITE_URL}/site-survey">Request A Site Visit</a></nav><main><h1>${pillar.heading}</h1><p>${pillar.intro}</p><h2>Related services and resources</h2><ul>${resourceLinks}</ul><h2>Planning a commercial project</h2><p>Share drawings, photographs, asset or component details, access information, existing condition, and the intended coating or next stage through a Site Visit request. We will get back to you promptly.</p><p><a href="${SITE_URL}/site-survey">Request A Site Visit</a> | <a href="tel:07970566409">07970 566409</a></p></main></div>`;
    let modifiedHtml = html;
    modifiedHtml = modifiedHtml.replace(/<title>[^<]*<\/title>/, `<title>${pillar.title}</title>`);
    modifiedHtml = modifiedHtml.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${pillar.description}" />`);
    const canonicalTags = `<link rel="canonical" href="${pillarUrl}" />\n    <link rel="alternate" hreflang="en-gb" href="${pillarUrl}" />\n    <link rel="alternate" hreflang="en" href="${pillarUrl}" />`;
    if (/<link rel="canonical"[^>]*>/.test(modifiedHtml)) {
      modifiedHtml = modifiedHtml.replace(/<link rel="canonical"[^>]*>/, canonicalTags);
    } else {
      modifiedHtml = modifiedHtml.replace("</head>", `${canonicalTags}\n</head>`);
    }
    modifiedHtml = modifiedHtml.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${pillar.title}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${pillar.description}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${pillarUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${pillar.image}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${pillar.title}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:url"[^>]*>/, `<meta name="twitter:url" content="${pillarUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${pillar.description}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${pillar.image}" />`);
    modifiedHtml = modifiedHtml.replace("</head>", `<script type="application/ld+json">${breadcrumbSchema}</script>\n<script type="application/ld+json">${webPageSchema}</script>\n<script type="application/ld+json">${faqSchema}</script>\n</head>`);
    return modifiedHtml.replace("<!--SSR_CONTENT-->", ssrBody);
  }

  // ── Site Survey page: /site-survey ─────────────────────────────────────────
  if (url === '/site-survey' || url === '/site-survey/') {
    const surveyTitle = 'Free Site Survey for Shot Blasting | No-Obligation Quote | Commercial Shot Blasting';
    const surveyDesc = 'Request a free, no-obligation site survey for your shot blasting project. We visit your site, assess the surfaces, confirm the blast standard required, and provide a detailed written quote — at no charge. Call 07970 566409.';
    const surveyUrl = `${SITE_URL}/site-survey`;
    let modifiedHtml = html;
    modifiedHtml = modifiedHtml.replace(/<title>[^<]*<\/title>/, `<title>${surveyTitle}</title>`);
    modifiedHtml = modifiedHtml.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${surveyDesc}" />`);
    modifiedHtml = modifiedHtml.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${surveyUrl}" />
    <link rel="alternate" hreflang="en-gb" href="${surveyUrl}" />
    <link rel="alternate" hreflang="en" href="${surveyUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${surveyTitle}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${surveyDesc}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${surveyUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${surveyTitle}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${surveyDesc}" />`);
    const breadcrumbSchema = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE_URL},{"@type":"ListItem","position":2,"name":"Free Site Survey","item":surveyUrl}]});
    const webPageSchema = JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":surveyTitle,"description":surveyDesc,"url":surveyUrl});
    const serviceSchema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Free Site Survey for Shot Blasting",
      "description": "A free, no-obligation site visit to assess your surfaces, confirm the blast standard required (SA2.5 or SA3), and provide a detailed written quotation.",
      "url": surveyUrl,
      "provider": {"@type": "LocalBusiness", "name": BUSINESS_NAME, "url": SITE_URL, "telephone": "07970566409"},
      "areaServed": {"@type": "Country", "name": "United Kingdom"},
      "offers": {"@type": "Offer", "price": "0", "priceCurrency": "GBP", "description": "Free, no-obligation site survey and written quotation"}
    });
    const faqSchema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {"@type":"Question","name":"Is the site survey really free?","acceptedAnswer":{"@type":"Answer","text":"Yes. Our site surveys are completely free and carry no obligation. We visit your site, assess the surfaces, and provide a detailed written quote — at no charge, regardless of whether you proceed with the work."}},
        {"@type":"Question","name":"How is a site survey arranged?","acceptedAnswer":{"@type":"Answer","text":"Contact us with the asset, access and intended scope. We’ll get back to you promptly to discuss a suitable project-specific visit."}},
        {"@type":"Question","name":"What does the site survey involve?","acceptedAnswer":{"@type":"Answer","text":"Our surveyor will inspect the surfaces to be blasted, assess the level of corrosion or coating to be removed, confirm the blast standard required (SA2.5 or SA3), measure the surface area, and discuss your coating specification. We then provide a detailed written quotation for review."}},
        {"@type":"Question","name":"Do you cover my area for a site survey?","acceptedAnswer":{"@type":"Answer","text":"We offer nationwide site surveys. The current local directory covers 35 counties in England and Wales; call 07970 566409 or use the online form with your project location."}}
      ]
    });
    modifiedHtml = modifiedHtml.replace('</head>', `<script type="application/ld+json">${breadcrumbSchema}</script>\n<script type="application/ld+json">${webPageSchema}</script>\n<script type="application/ld+json">${serviceSchema}</script>\n<script type="application/ld+json">${faqSchema}</script>\n</head>`);
    modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="https://commercialshotblasting.co.uk/">Home</a> | <a href="https://commercialshotblasting.co.uk/services">Services</a> | <a href="https://commercialshotblasting.co.uk/service-areas">Service Areas</a> | <a href="https://commercialshotblasting.co.uk/about">About</a> | <a href="https://commercialshotblasting.co.uk/contact">Contact</a> | <a href="https://commercialshotblasting.co.uk/blog">Blog</a> | <a href="https://commercialshotblasting.co.uk/industries">Industries</a> | <a href="https://commercialshotblasting.co.uk/glossary">Glossary</a> | <a href="https://commercialshotblasting.co.uk/site-survey">Free Site Survey</a></nav><main><h1>Free Site Survey for Shot Blasting</h1><p>Book a free, no-obligation site survey for shot blasting. Our surveyor will assess your surfaces, confirm the blast standard required, and provide a detailed written quote at no charge. Call 07970 566409.</p><p><a href="https://commercialshotblasting.co.uk/contact">Request a site survey online</a> | <a href="https://commercialshotblasting.co.uk/services">View all services</a></p></main></div>`);
    return modifiedHtml;
  }

  // Legal copy is shared with the visible React pages; no Google access is enabled.
  const legalPage = injectAppLegalPage(html, url);
  if (legalPage !== undefined) return legalPage;

  // ── Car Park Paint Removal page ────────────────────────────────────────────
  if (url === '/services/car-park-paint-removal' || url === '/services/car-park-paint-removal/') {
    const cpTitle = 'Car Park Paint & Line Marking Removal | Shot Blasting UK | Commercial Shot Blasting';
    const cpDesc = 'Mobile on-site shot blasting to remove car park line markings, bay numbers, thermoplastic road markings, and old paint from tarmac and concrete. Nationwide service. Free site survey and quotation.';
    const cpUrl = `${SITE_URL}/services/car-park-paint-removal`;
    let modifiedHtml = html;
    modifiedHtml = modifiedHtml.replace(/<title>[^<]*<\/title>/, `<title>${cpTitle}</title>`);
    modifiedHtml = modifiedHtml.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${cpDesc}" />`);
    modifiedHtml = modifiedHtml.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${cpUrl}" />
    <link rel="alternate" hreflang="en-gb" href="${cpUrl}" />
    <link rel="alternate" hreflang="en" href="${cpUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${cpTitle}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${cpDesc}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${cpUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${cpTitle}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${cpDesc}" />`);
    const cpBreadcrumb = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE_URL},{"@type":"ListItem","position":2,"name":"Services","item":`${SITE_URL}/services`},{"@type":"ListItem","position":3,"name":"Car Park Paint & Line Marking Removal","item":cpUrl}]});
    const cpWebPage = JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":cpTitle,"description":cpDesc,"url":cpUrl,"inLanguage":"en-GB"});
    const cpService = JSON.stringify({"@context":"https://schema.org","@type":"Service","name":"Car Park Paint & Line Marking Removal","alternateName":["Car Park Line Marking Removal","Car Park Shot Blasting","Road Paint Removal UK","Thermoplastic Road Marking Removal","Parking Bay Paint Removal"],"description":cpDesc,"url":cpUrl,"serviceType":"Shot Blasting","provider":{"@type":"LocalBusiness","name":BUSINESS_NAME,"url":SITE_URL,"telephone":"07970566409","email":"info@commercialshotblasting.co.uk","areaServed":{"@type":"Country","name":"United Kingdom"}},"areaServed":{"@type":"Country","name":"United Kingdom"}});
    const cpFaq = JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Can you remove car park line markings without damaging the tarmac?","acceptedAnswer":{"@type":"Answer","text":"Yes. We use calibrated shot blasting equipment that removes paint and thermoplastic markings from the surface without cutting into the tarmac or concrete substrate. The result is a clean surface with no visible scarring, ready for re-marking."}},{"@type":"Question","name":"Do you work on-site at the car park?","acceptedAnswer":{"@type":"Answer","text":"Yes — we bring all our mobile shot blasting equipment to your site. There is no need to close the entire car park; we can work bay by bay or section by section, allowing you to keep part of the facility operational during the works."}},{"@type":"Question","name":"What types of car park markings can you remove?","acceptedAnswer":{"@type":"Answer","text":"We can remove all types of car park and road markings including painted bay lines, thermoplastic markings, bay numbers, disabled bay symbols, directional arrows, hatching, yellow lines, and road paint from both tarmac and concrete surfaces."}},{"@type":"Question","name":"How long does car park line marking removal take?","acceptedAnswer":{"@type":"Answer","text":"Timescales depend on the size of the car park and the number of bays. As a guide, a standard 100-bay car park can typically be completed in one to two days. We will provide an accurate programme when you enquire."}},{"@type":"Question","name":"Do you remove thermoplastic road markings?","acceptedAnswer":{"@type":"Answer","text":"Yes. Thermoplastic markings are thicker and more durable than paint, but shot blasting removes them effectively without the heat or chemicals required by other methods. The surface is left clean and ready for new markings to be applied."}},{"@type":"Question","name":"What areas do you cover for car park paint removal?","acceptedAnswer":{"@type":"Answer","text":"We work nationwide from our bases in the Midlands. We regularly work in Nottingham, Birmingham, Manchester, Leeds, London, Bristol, and across our 35-county service area. Travel is included in our quotation."}}]});
    modifiedHtml = modifiedHtml.replace('</head>', `<script type="application/ld+json">${cpBreadcrumb}</script>\n<script type="application/ld+json">${cpWebPage}</script>\n<script type="application/ld+json">${cpService}</script>\n<script type="application/ld+json">${cpFaq}</script>\n</head>`);
    const _ssr_car_park = `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="${SITE_URL}/">Home</a> | <a href="${SITE_URL}/services">Services</a> | <a href="${SITE_URL}/service-areas">Service Areas</a> | <a href="${SITE_URL}/contact">Contact</a></nav><main><h1>Car Park Paint &amp; Line Marking Removal | Commercial Shot Blasting</h1><p>Professional car park paint and line marking removal using shot blasting. We remove old road markings, anti-slip coatings, and failed paint from concrete and tarmac surfaces. Mobile service nationwide. Free site surveys.</p><ul><li>Car park line marking removal</li><li>Thermoplastic road marking removal</li><li>Anti-slip coating removal</li><li>Concrete and tarmac surface preparation</li></ul><p><a href="${SITE_URL}/contact">Request a free site survey</a> | Call <a href="tel:07970566409">07970 566409</a></p></main></div>`;
    if (modifiedHtml.includes('<!--SSR_CONTENT-->')) {
      modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', _ssr_car_park);
    } else {
      modifiedHtml = modifiedHtml.replace(/<body[^>]*>/, (match) => `${match}\n${_ssr_car_park}`);
    }
    return modifiedHtml;
  }

  // ── Intumescent Painting page ─────────────────────────────────────────────
  if (url === '/services/intumescent-painting' || url === '/services/intumescent-painting/') {
    const ipTitle = 'Intumescent Painting Contractors | Structural Steel Fire Protection | Commercial Shot Blasting';
    const ipDesc = 'Looking for intumescent painting contractors for structural steel? We blast to Sa 2.5 and apply certified fire protection coatings on the same day — multiple operatives, single mobilisation, nationwide.';
    const ipUrl = `${SITE_URL}/services/intumescent-painting`;
    const ipImage = 'https://storage.manus.space/webdev-static/commercial_shot_blasting_manus/intumescentpaint.jpeg';
    let modifiedHtml = html;
    modifiedHtml = modifiedHtml.replace(/<title>[^<]*<\/title>/, `<title>${ipTitle}</title>`);
    modifiedHtml = modifiedHtml.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${ipDesc}" />`);
    modifiedHtml = modifiedHtml.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${ipUrl}" />
    <link rel="alternate" hreflang="en-gb" href="${ipUrl}" />
    <link rel="alternate" hreflang="en" href="${ipUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${ipTitle}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${ipDesc}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${ipUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${ipImage}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${ipTitle}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${ipDesc}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${ipImage}" />`);
    const ipBreadcrumb = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE_URL},{"@type":"ListItem","position":2,"name":"Services","item":`${SITE_URL}/services`},{"@type":"ListItem","position":3,"name":"Intumescent Painting","item":ipUrl}]});
    const ipWebPage = JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":ipTitle,"description":ipDesc,"url":ipUrl,"inLanguage":"en-GB","primaryImageOfPage":{"@type":"ImageObject","url":ipImage}});
    const ipService = JSON.stringify({"@context":"https://schema.org","@type":"Service","name":"Intumescent Painting on Structural Steel","alternateName":["Intumescent Coating Application","Fire Protection Painting Steel","Intumescent Paint Spraying UK","Structural Steel Fire Protection","R30 R60 R90 R120 Intumescent Coating"],"description":ipDesc,"url":ipUrl,"serviceType":"Intumescent Painting","provider":{"@type":"LocalBusiness","name":BUSINESS_NAME,"url":SITE_URL,"telephone":"07970566409","email":"info@commercialshotblasting.co.uk","areaServed":{"@type":"Country","name":"United Kingdom"}},"areaServed":{"@type":"Country","name":"United Kingdom"}});
    const ipFaq = JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is intumescent paint and how does it work?","acceptedAnswer":{"@type":"Answer","text":"Intumescent paint is a fire-resistant coating applied to structural steel. In the event of a fire, it expands to form a thick insulating char layer that protects the steel from heat, delaying structural failure and giving occupants more time to evacuate. It is specified to fire ratings of R30, R60, R90, or R120 (minutes of fire resistance)."}},{"@type":"Question","name":"Why does steel need to be shot blasted before intumescent painting?","acceptedAnswer":{"@type":"Answer","text":"Intumescent coatings require a clean, profiled steel surface to bond correctly. Shot blasting removes mill scale, rust, old coatings, and contamination, and creates a surface profile (typically 40–70 microns) that gives the coating mechanical adhesion. Without proper surface preparation, the coating can delaminate and will fail to provide the specified fire rating."}},{"@type":"Question","name":"What fire ratings can you achieve?","acceptedAnswer":{"@type":"Answer","text":"We apply intumescent coatings to achieve R30, R60, R90, and R120 fire ratings. The required dry film thickness (DFT) depends on the steel section factor, the fire rating required, and the coating product used. We work to the coating manufacturer's specification and can provide full application records."}},{"@type":"Question","name":"Do you work on-site or in a workshop?","acceptedAnswer":{"@type":"Answer","text":"We work both on-site and in workshops. For new-build structural steel, we typically blast and prime in a workshop before the steel is erected, then apply the intumescent topcoat on-site after erection. For existing structures, we carry out all works on-site using mobile equipment and cherry pickers or scissor lifts."}},{"@type":"Question","name":"What areas do you cover for intumescent painting?","acceptedAnswer":{"@type":"Answer","text":"We work nationwide. We regularly work in South Yorkshire, West Yorkshire, the East Midlands, West Midlands, Greater Manchester, and London. Travel is included in our fixed-price quotation."}},{"@type":"Question","name":"Can you provide a combined shot blasting and intumescent painting service?","acceptedAnswer":{"@type":"Answer","text":"Yes — this is our most common scope. We provide a single-contract service covering surface preparation (shot blasting to Sa 2.5), primer application, and intumescent topcoat. Using one contractor for both operations eliminates interface risk and simplifies programme management for the main contractor."}}]});
    modifiedHtml = modifiedHtml.replace('</head>', `<script type="application/ld+json">${ipBreadcrumb}</script>\n<script type="application/ld+json">${ipWebPage}</script>\n<script type="application/ld+json">${ipService}</script>\n<script type="application/ld+json">${ipFaq}</script>\n</head>`);
    const _ssr_intumescent = `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="${SITE_URL}/">Home</a> | <a href="${SITE_URL}/services">Services</a> | <a href="${SITE_URL}/service-areas">Service Areas</a> | <a href="${SITE_URL}/about">About</a> | <a href="${SITE_URL}/contact">Contact</a> | <a href="${SITE_URL}/blog">Blog</a> | <a href="${SITE_URL}/industries">Industries</a> | <a href="${SITE_URL}/glossary">Glossary</a></nav><main><h1>Intumescent Painting on Structural Steel | Commercial Shot Blasting</h1><p>Professional intumescent painting service for structural steel. We shot blast steel to SA2.5, apply primer, and apply intumescent topcoat to achieve R30, R60, R90, or R120 fire ratings. Mobile service nationwide. Single-contract shot blasting and intumescent painting. Free site surveys.</p><ul><li>Shot blasting to SA2.5 before intumescent coating</li><li>R30, R60, R90, R120 fire ratings achievable</li><li>On-site and workshop application</li><li>Full application records provided</li></ul><p><a href="${SITE_URL}/contact">Request a free site survey</a> | <a href="${SITE_URL}/services">View all services</a> | Call <a href="tel:07970566409">07970 566409</a></p></main></div>`;
    if (modifiedHtml.includes('<!--SSR_CONTENT-->')) {
      modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', _ssr_intumescent);
    } else {
      modifiedHtml = modifiedHtml.replace(/<body[^>]*>/, (match) => `${match}\n${_ssr_intumescent}`);
    }
    return modifiedHtml;
  }

  // ── Counties index page: /counties ────────────────────────────────────────
  if (url === '/counties' || url === '/counties/') {
    const countiesTitle = 'Shot Blasting Services by County | Nationwide | Commercial Shot Blasting';
    const countiesDesc = 'Commercial shot blasting services nationwide. Browse the current England and Wales county directory for local planning information, or get in touch about a project anywhere in the UK.';
    const countiesUrl = `${SITE_URL}/counties`;
    let modifiedHtml = html;
    modifiedHtml = modifiedHtml.replace(/<title>[^<]*<\/title>/, `<title>${countiesTitle}</title>`);
    modifiedHtml = modifiedHtml.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${countiesDesc}" />`);
    modifiedHtml = modifiedHtml.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${countiesUrl}" />
    <link rel="alternate" hreflang="en-gb" href="${countiesUrl}" />
    <link rel="alternate" hreflang="en" href="${countiesUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${countiesTitle}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${countiesDesc}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${countiesUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${countiesTitle}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${countiesDesc}" />`);
    const breadcrumbSchema = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE_URL},{"@type":"ListItem","position":2,"name":"Counties","item":countiesUrl}]});
    const webPageSchema = JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":countiesTitle,"description":countiesDesc,"url":countiesUrl});
    modifiedHtml = modifiedHtml.replace('</head>', `<script type="application/ld+json">${breadcrumbSchema}</script>\n<script type="application/ld+json">${webPageSchema}</script>\n</head>`);
    const _ssrCounties = `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="${SITE_URL}/">Home</a> | <a href="${SITE_URL}/service-areas">Service Areas</a> | <a href="${SITE_URL}/contact">Contact</a></nav><main><h1>Shot Blasting Services by County</h1><p>We work nationwide. This is the current England and Wales local county directory, with local planning information for 25 county hubs. Contact us about a project anywhere in the UK.</p><ul><li><a href="${SITE_URL}/counties/shropshire">Shropshire</a></li><li><a href="${SITE_URL}/counties/west-midlands">West Midlands</a></li><li><a href="${SITE_URL}/counties/south-yorkshire">South Yorkshire</a></li><li><a href="${SITE_URL}/counties/greater-manchester">Greater Manchester</a></li></ul><p><a href="${SITE_URL}/service-areas">All service areas</a> | <a href="${SITE_URL}/contact">Get a quote</a></p></main></div>`;
    if (modifiedHtml.includes('<!--SSR_CONTENT-->')) {
      modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', _ssrCounties);
    } else {
      modifiedHtml = modifiedHtml.replace(/<body[^>]*>/, (match) => `${match}\n${_ssrCounties}`);
    }
    return modifiedHtml;
  }

  // ── Industries index page: /industries ──────────────────────────────────────
  if (url === '/industries' || url === '/industries/') {
    const industriesTitle = 'Shot Blasting Services by Industry UK | Commercial Shot Blasting';
    const industriesDesc = 'Professional shot blasting services for construction, manufacturing, aerospace, marine, agriculture, retail, transport, and heritage restoration nationwide. Mobile, SA2.5/SA3 standard. Free quotes.';
    const industriesUrl = `${SITE_URL}/industries`;
    let modifiedHtml = html;
    modifiedHtml = modifiedHtml.replace(/<title>[^<]*<\/title>/, `<title>${industriesTitle}</title>`);
    modifiedHtml = modifiedHtml.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${industriesDesc}" />`);
    modifiedHtml = modifiedHtml.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${industriesUrl}" />
    <link rel="alternate" hreflang="en-gb" href="${industriesUrl}" />
    <link rel="alternate" hreflang="en" href="${industriesUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${industriesTitle}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${industriesDesc}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${industriesUrl}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${industriesTitle}" />`);
    modifiedHtml = modifiedHtml.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${industriesDesc}" />`);
    const breadcrumbSchema = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE_URL},{"@type":"ListItem","position":2,"name":"Industries","item":industriesUrl}]});
    const webPageSchema = JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":industriesTitle,"description":industriesDesc,"url":industriesUrl});
    const industriesFAQSchema = JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
      {"@type":"Question","name":"What industries do you provide shot blasting services for?","acceptedAnswer":{"@type":"Answer","text":"We provide shot blasting services for construction and structural steel, manufacturing and engineering, marine and offshore, agriculture and farming, aerospace, retail and commercial, transport and logistics, and heritage restoration. Our mobile units travel to your site nationwide."}},
      {"@type":"Question","name":"Do you offer shot blasting services for the construction industry?","acceptedAnswer":{"@type":"Answer","text":"Yes — we specialise in shot blasting for structural steelwork including beams, columns, RSJs, fabricated frames, staircases, and fire escapes. We achieve SA2.5 and SA3 surface standards and travel directly to construction sites nationwide."}},
      {"@type":"Question","name":"Can you carry out shot blasting for the marine and offshore industry?","acceptedAnswer":{"@type":"Answer","text":"Yes — we shot blast vessel hulls, offshore platforms, dock gates, pontoons, and marine pipework to SA2.5 and SA3 standards. Our mobile units travel to ports, dockyards, and offshore facilities nationwide."}},
      {"@type":"Question","name":"What surface preparation standard do you achieve for industrial shot blasting?","acceptedAnswer":{"@type":"Answer","text":"We achieve SA2.5 (near white metal) and SA3 (white metal) surface cleanliness standards as defined by ISO 8501-1. These are the correct preparation levels for industrial protective coating systems across all sectors."}},
      {"@type":"Question","name":"How do I get a quote for shot blasting services for my industry?","acceptedAnswer":{"@type":"Answer","text":"Call us on 07970 566409 or use our online quote form. We offer free site surveys and no-obligation quotes for all industries. We’ll get back to you promptly."}}
    ]});
    modifiedHtml = modifiedHtml.replace('</head>', `<script type="application/ld+json">${breadcrumbSchema}</script>\n<script type="application/ld+json">${webPageSchema}</script>\n<script type="application/ld+json">${industriesFAQSchema}</script>\n</head>`);
    modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="https://commercialshotblasting.co.uk/">Home</a> | <a href="https://commercialshotblasting.co.uk/services">Services</a> | <a href="https://commercialshotblasting.co.uk/service-areas">Service Areas</a> | <a href="https://commercialshotblasting.co.uk/about">About</a> | <a href="https://commercialshotblasting.co.uk/contact">Contact</a> | <a href="https://commercialshotblasting.co.uk/blog">Blog</a> | <a href="https://commercialshotblasting.co.uk/industries">Industries</a> | <a href="https://commercialshotblasting.co.uk/glossary">Glossary</a> | <a href="https://commercialshotblasting.co.uk/site-survey">Free Site Survey</a></nav><main><h1>Shot Blasting Services by Industry UK</h1><p>Professional shot blasting services for construction, manufacturing, aerospace, marine, agriculture, retail, transport, and heritage restoration nationwide. Mobile, SA2.5/SA3 standard. Free quotes.</p><ul><li><a href="https://commercialshotblasting.co.uk/industries">Construction &amp; Structural Steel Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/industries">Manufacturing &amp; Engineering Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/industries">Marine &amp; Offshore Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/industries">Agriculture &amp; Farming Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/industries">Aerospace Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/industries">Retail &amp; Commercial Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/industries">Transport &amp; Logistics Shot Blasting</a></li><li><a href="https://commercialshotblasting.co.uk/industries">Heritage Restoration Shot Blasting</a></li></ul></main></div>`);
    return modifiedHtml;
  }

  // ── County pages: /counties/:slug ──────────────────────────────────────────
  const countyMatch = url.match(/^\/counties\/([a-z-]+)/);
  if (countyMatch) {
    const countySlug = countyMatch[1];
    // Client countyData is the current canonical hub catalogue; shared countyData
    // remains as a fallback for older records used by other SSR helpers.
    const county = clientCountyData[countySlug] ?? countyData[countySlug];
    if (county) {
      const pageUrl = `${SITE_URL}/counties/${countySlug}`;
      const pageTitle = `${county.name} Shot Blasting | Mobile Contractor Near Me | Commercial Shot Blasting UK`;
      const metaDesc = county.metaDescription || `${county.name} shot blasting services near me — mobile surface preparation for structural steelwork, factory cladding, containers, floor preparation, rust removal & more. SA2.5/SA3 standard. Free quote. Call ${PHONE}`;
      const countyPillarResources = getCountyPillarResources(county.slug, county.industries ?? []);
      const countyPillarHtml = countyPillarResources.length > 0
        ? `<section><h2>Specialist Surface-Preparation Resources for ${escHtml(county.name)}</h2><p>These evidence-led planning hubs help define asset, access, condition, coating, and programme information before a commercial Site Visit.</p><ul>${countyPillarResources.map((resource) => `<li><a href="${SITE_URL}${resource.href}">${escHtml(resource.title)}</a> — ${escHtml(resource.description)}</li>`).join("")}</ul></section>`
        : "";
      const countyCommercialPlanningHtml = `<section aria-label="Commercial project planning"><h2>What We Can Help You Plan in ${escHtml(county.name)}</h2><p>A useful commercial Site Visit starts with the asset, its condition, access, working area, surrounding operations and the intended next stage. The following routes help define a surface-preparation discussion; a final method, specification, programme or price must be agreed for the individual project.</p><ul><li><a href="${SITE_URL}/services/structural-steel-frames">Structural steel and fabricated sections</a> — frames, beams, columns, connections and fabrication packages.</li><li><a href="${SITE_URL}/intumescent-paint-for-steel">Preparation before protective coatings</a> — preparation, primer, inspection and intumescent-coating handover planning.</li><li><a href="${SITE_URL}/factory-cladding-restoration">Factory cladding and industrial buildings</a> — existing coating condition, access and neighbouring-operations review.</li><li><a href="${SITE_URL}/container-restoration-storage-steelwork">Containers and storage steelwork</a> — quantity, handling, corrosion and recoating inputs.</li><li><a href="${SITE_URL}/process-pipework-spools-surface-preparation">Pipework, spools and process assets</a> — access, interfaces, containment and next-stage planning.</li><li><a href="${SITE_URL}/external-staircases">Access steel, stairs and fire escapes</a> — condition, safe access and protective-finish planning.</li></ul><p><a href="${SITE_URL}/site-survey">Request A Site Visit</a> to discuss the asset, access, surface condition and intended next stage.</p></section>`;
      const priorityCountyHtml = (() => {
        const priorityContent = priorityCountyCommercialContent[county.slug];
        if (!priorityContent) return "";
        return `<section><h2>${escHtml(priorityContent.title)}</h2>${priorityContent.paragraphs.map((paragraph) => `<p>${escHtml(paragraph)}</p>`).join("")}<ul>${priorityContent.links.map((link) => `<li><a href="${SITE_URL}${link.href}">${escHtml(link.title)}</a> — ${escHtml(link.description)}</li>`).join("")}</ul></section>`;
      })();
      const countyProjectEvidenceHtml = (() => {
        const evidenceIndex = getCountyProjectEvidenceIndex(county.slug);
        if (!evidenceIndex) return "";
        return `<section aria-label="${escHtml(evidenceIndex.title)}"><h2>${escHtml(evidenceIndex.title)}</h2><p>${escHtml(evidenceIndex.introduction)}</p><ul>${evidenceIndex.items.map((item) => `<li><article><img src="${escHtml(item.imageSrc)}" alt="${escHtml(item.imageAlt)}" /><p>${escHtml(item.relevanceLabel)}: ${escHtml(item.geographyLabel)}</p><h3>${escHtml(item.title)}</h3><p>${escHtml(item.description)}</p><p><a href="${SITE_URL}${item.href}">${escHtml(item.ctaLabel)}</a></p></article></li>`).join("")}</ul></section>`;
      })();

      let modifiedHtml = html
        .replace(/<meta\s+name="description"[^>]*>/gi, '')
        .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
        .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
        .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
        .replace(/<link\s+rel="canonical"[^>]*>/gi, '');

      const faqSchemaItems = (county.faqs || []).map((faq: { question: string; answer: string }) =>
        `{"@type":"Question","name":${JSON.stringify(faq.question)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(faq.answer)}}}`
      ).join(',');

      const schemas = `
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"LocalBusiness","name":"${BUSINESS_NAME}","url":"${SITE_URL}","telephone":"${PHONE}","email":"${EMAIL}","logo":"${LOGO}","areaServed":{"@type":"AdministrativeArea","name":"${county.name}","sameAs":"https://en.wikipedia.org/wiki/${encodeURIComponent(county.name)}"}${county.latitude ? `,"geo":{"@type":"GeoCoordinates","latitude":${county.latitude},"longitude":${county.longitude}},"hasMap":"https://www.google.com/maps/search/shot+blasting+${encodeURIComponent(county.name)}+UK/@${county.latitude},${county.longitude},10z"` : ''}}
    </script>
    ${faqSchemaItems ? `<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${faqSchemaItems}]}</script>` : ''}
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"BreadcrumbList","@id":"${pageUrl}#breadcrumb","inLanguage":"en-GB","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"${SITE_URL}"},{"@type":"ListItem","position":2,"name":"Counties","item":"${SITE_URL}/counties"},{"@type":"ListItem","position":3,"name":"${county.name}","item":"${pageUrl}"}]}
    </script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"WebPage","name":"${pageTitle}","url":"${pageUrl}","description":"${metaDesc}"}
    </script>`;

      const metaTags = `
    <title>${pageTitle}</title>
    <link rel="canonical" href="${pageUrl}" />
    <link rel="alternate" hreflang="en-gb" href="${pageUrl}" />
    <link rel="alternate" hreflang="en" href="${pageUrl}" />
    <meta name="description" content="${metaDesc}" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${metaDesc}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${countyOgImageUrl(county.name)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:alt" content="Shot Blasting in ${county.name} — Commercial Shot Blasting" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${metaDesc}" />
    <meta name="twitter:image" content="${countyOgImageUrl(county.name)}" />
    <meta name="twitter:image:alt" content="Shot Blasting in ${county.name} — Commercial Shot Blasting" />
    ${schemas}
  `;
      modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, metaTags);

      // Inject SSR body content for county pages so Googlebot can crawl location links
      const countyLocations = Object.values(locationData)
        .filter(loc => loc.countySlug === countySlug)
        .slice(0, 30);
      if (countyLocations.length > 0) {
        const esc = (s: string) => String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
        const locLinksHtml = countyLocations.map(loc =>
          `<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a itemprop="item" href="${SITE_URL}/service-areas/${loc.slug}"><span itemprop="name">Shot Blasting Services in ${esc(loc.name)}</span></a></li>`
        ).join('');
        // Map industry names to slugs for the Related Industries section
        const industrySlugMap: Record<string, string> = {
          'Manufacturing': 'manufacturing',
          'Construction': 'construction',
          'Aerospace': 'aerospace',
          'Marine': 'marine',
          'Agriculture': 'agriculture',
          'Retail': 'retail',
          'Heritage & Restoration': 'heritage-restoration',
          'Transport & Logistics': 'transport-logistics',
          'Steel': 'manufacturing',
          'Engineering': 'manufacturing',
          'Food Processing': 'manufacturing',
          'Automotive': 'manufacturing',
          'Logistics': 'transport-logistics',
          'Heritage': 'heritage-restoration',
          'Restoration': 'heritage-restoration',
          'Offshore': 'marine',
          'Farming': 'agriculture',
        };
        const relatedIndustriesHtml = (() => {
          if (!county.industries || county.industries.length === 0) return '';
          const seen = new Set<string>();
          const items = county.industries
            .map((ind: string) => { const slug = industrySlugMap[ind]; return slug ? { ind, slug } : null; })
            .filter((x: { ind: string; slug: string } | null): x is { ind: string; slug: string } => x !== null && !seen.has(x.slug) && !!seen.add(x.slug))
            .map(({ ind, slug }: { ind: string; slug: string }) => `<li><a href="${SITE_URL}/industries/${slug}">${esc(ind)} Shot Blasting Services in ${esc(county.name)}</a></li>`)
            .join('');
          return items ? `<section><h2>Related Industries We Serve in ${esc(county.name)}</h2><ul>${items}</ul></section>` : '';
        })();
        const countyBodyHtml = `<div id="ssr-county-content" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;" itemscope itemtype="https://schema.org/WebPage"><nav aria-label="Breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList"><ol><li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a itemprop="item" href="${SITE_URL}"><span itemprop="name">Home</span></a><meta itemprop="position" content="1"/></li><li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a itemprop="item" href="${SITE_URL}/counties"><span itemprop="name">Counties</span></a><meta itemprop="position" content="2"/></li><li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a itemprop="item" href="${pageUrl}"><span itemprop="name">${esc(county.name)}</span></a><meta itemprop="position" content="3"/></li></ol></nav><article><h1>Commercial Shot Blasting in ${esc(county.name)} | Surface-Preparation Planning</h1><p>Explore commercial surface-preparation routes for structural steel, cladding, containers, floors, process assets, plant and access steel across ${esc(county.name)}. The appropriate method, preparation requirement and sequencing depend on the individual asset, condition, access, containment, operating environment and intended next stage.</p>${countyContext[county.slug] ? `<p><em>${esc(countyContext[county.slug])}</em></p>` : ''}${countyCommercialPlanningHtml}${priorityCountyHtml}${countyProjectEvidenceHtml}<section><h2>Shot Blasting Services Available in ${esc(county.name)}</h2><ul><li>Structural Steelwork Shot Blasting — beams, columns, trusses and fabrications</li><li>Factory and Warehouse Cladding — plastisol and paint removal</li><li>Container Shot Blasting — shipping containers and steel storage units</li><li>Industrial Floor Preparation — concrete and steel floor surface profiling</li><li>Rust Removal and Mill Scale — condition review before the next protective stage</li><li>Plant and Machinery — industrial equipment, vehicles and pipework</li><li>Fire Escapes and Staircases — structural metalwork restoration</li><li>Warehouse Racking and Mezzanines — industrial storage structure preparation</li></ul></section>${countyPillarHtml}<section><h2>Shot Blasting Services ${esc(county.name)} — Areas We Cover</h2><ul itemscope itemtype="https://schema.org/ItemList">${locLinksHtml}</ul></section><section><h2>Shot Blasting Services Available in ${esc(county.name)} — Full Range</h2><ul><li><a href="${SITE_URL}/services/structural-steel-frames">Structural Steel Frames Shot Blasting in ${esc(county.name)}</a></li><li><a href="${SITE_URL}/services/steel-containers">Steel Container Blasting in ${esc(county.name)}</a></li><li><a href="${SITE_URL}/services/factory-cladding">Factory &amp; Warehouse Cladding Restoration in ${esc(county.name)}</a></li><li><a href="${SITE_URL}/services/fire-escapes">Fire Escapes &amp; External Stair Towers in ${esc(county.name)}</a></li><li><a href="${SITE_URL}/services/staircases">Internal Steel Staircases &amp; Balustrades in ${esc(county.name)}</a></li><li><a href="${SITE_URL}/services/bridge-steelwork">Bridge Steelwork Shot Blasting in ${esc(county.name)}</a></li><li><a href="${SITE_URL}/services/ladders">Fixed Ladders &amp; Step-Over Platforms in ${esc(county.name)}</a></li><li><a href="${SITE_URL}/services/warehouse-racking">Warehouse Racking &amp; Pallet Rack Frames in ${esc(county.name)}</a></li><li><a href="${SITE_URL}/services/pipework">Process Pipework, Spools &amp; Manifolds in ${esc(county.name)}</a></li><li><a href="${SITE_URL}/services/telecom-towers">Telecom Masts &amp; Lattice Towers in ${esc(county.name)}</a></li><li><a href="${SITE_URL}/services/floor-preparation">Floor Preparation &amp; Shot Blasting in ${esc(county.name)}</a></li><li><a href="${SITE_URL}/services/powder-coating">Shot Blasting &amp; Powder Coating in ${esc(county.name)}</a></li><li><a href="${SITE_URL}/services/commercial-radiators">Commercial Radiators Shot Blasting in ${esc(county.name)}</a></li><li><a href="${SITE_URL}/services/commercial-vehicles">Commercial Vehicles Shot Blasting in ${esc(county.name)}</a></li><li><a href="${SITE_URL}/services/steel-doors">Steel Doors &amp; Roller Shutters in ${esc(county.name)}</a></li><li><a href="${SITE_URL}/services/steel-sheeting">Steel Sheeting Shot Blasting in ${esc(county.name)}</a></li><li><a href="${SITE_URL}/services/steel-gates">Steel Gates &amp; Railings in ${esc(county.name)}</a></li><li><a href="${SITE_URL}/services/plant-machinery">Plant &amp; Machinery Shot Blasting in ${esc(county.name)}</a></li><li><a href="${SITE_URL}/services/intumescent-painting">Intumescent Painting in ${esc(county.name)}</a></li></ul><p><a href="${SITE_URL}/services">View all 19 shot blasting services</a></p></section><section><h2>Commercial Surface-Preparation Planning in ${esc(county.name)}</h2><p>Use the county hub to identify a relevant asset route, explore nearby areas and prepare a focused Site Visit discussion. Requirements are established against the individual asset, access, specification and intended handover.</p><ul><li><strong>Project-specific preparation:</strong> surface condition, profile, inspection and any coating requirements are considered against the applicable specification.</li><li><strong>Operational planning:</strong> access, working area, containment, material movement and neighbouring operations are reviewed for the individual project.</li><li><strong>Specialist resources:</strong> structural steel, cladding, containers, process assets, floors and access steel routes explain the inputs that help shape a discussion.</li></ul></section><section><h2>Commercial Planning Inputs for ${esc(county.name)}</h2><p>A project discussion is scoped around the individual asset rather than a fixed template.</p><ol><li><strong>Define the asset and condition:</strong> photographs, drawings or dimensions, current condition, access and working-area constraints.</li><li><strong>Review interfaces and next stage:</strong> containment, adjacent operations, inspection requirements and planned coating, repair or handover.</li><li><strong>Agree a project-specific route:</strong> preparation requirement, sequencing, programme and scope are agreed for the individual project.</li></ol></section><section><h2>Request a Site Visit for Shot Blasting Services in ${esc(county.name)}</h2><p>Tell us about your project and we will get back to you promptly. Call <a href="tel:07970566409">07970 566409</a> or email <a href="mailto:info@commercialshotblasting.co.uk">info@commercialshotblasting.co.uk</a>.</p></section>${relatedIndustriesHtml}</article></div>`;
        if (modifiedHtml.includes('<!--SSR_CONTENT-->')) {
          modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', countyBodyHtml);
        } else {
          modifiedHtml = modifiedHtml.replace(/<body[^>]*>/, (match: string) => `${match}\n${countyBodyHtml}`);
        }
      }

      return modifiedHtml;
    }
  }

  // ── Industry pages: /industries/:slug ──────────────────────────────────────
  // Industry-specific FAQ sets for FAQPage JSON-LD rich snippets
  const industryFAQs: Record<string, Array<{ q: string; a: string }>> = {
    'aerospace': [
      { q: 'What shot blasting services do you offer for the aerospace industry?', a: 'We provide precision shot blasting services for aerospace components including structural frames, engine housings, landing gear, and ground support equipment. All work is carried out to the required surface cleanliness standard.' },
      { q: 'Do you meet aerospace surface preparation standards?', a: 'Yes — we achieve SA2.5 and SA3 surface cleanliness standards and can provide documentation and certification as required for aerospace applications.' },
      { q: 'Can you carry out shot blasting on-site at aerospace facilities?', a: 'Yes — our mobile shot blasting units travel directly to your facility nationwide, eliminating the need to transport components off-site.' },
      { q: 'How do I get a quote for aerospace shot blasting services?', a: 'Call us on 07970 566409 or use our online quote form. We offer free site surveys and no-obligation quotes for all aerospace shot blasting projects.' },
    ],
    'agriculture': [
      { q: 'What agricultural equipment can you shot blast?', a: 'We shot blast tractors, combine harvesters, ploughs, trailers, grain dryers, irrigation equipment, and all types of farm machinery and implements.' },
      { q: 'Do you offer mobile shot blasting for agricultural equipment?', a: 'Yes — our mobile units travel directly to your farm or agricultural site nationwide, so you do not need to transport heavy machinery.' },
      { q: 'What surface standard do you achieve for agricultural shot blasting?', a: 'We typically achieve SA2.5 near white metal, which provides the correct surface profile for protective coatings that extend the life of agricultural equipment.' },
      { q: 'How much does agricultural shot blasting cost?', a: 'Pricing depends on the size and condition of the equipment. We offer free, no-obligation quotes — call 07970 566409 or request a quote online.' },
    ],
    'construction': [
      { q: 'What construction steelwork can you shot blast?', a: 'We shot blast structural steel beams, columns, RSJs, fabricated frames, staircases, fire escapes, mezzanine floors, and all types of structural metalwork for the construction industry.' },
      { q: 'Do you carry out shot blasting on construction sites?', a: 'Yes — our mobile shot blasting units travel directly to construction sites nationwide, completing work on-site without the need to transport steelwork.' },
      { q: 'What surface preparation standard do you achieve for structural steel?', a: 'We achieve SA2.5 (near white metal) and SA3 (white metal) standards, which are the correct preparation levels for structural steel before protective coating application.' },
      { q: 'How do I get a quote for construction shot blasting services?', a: 'Call 07970 566409 or use our online quote form. We offer free site surveys and will get back to you promptly.' },
    ],
    'heritage-restoration': [
      { q: 'Can you shot blast historic or listed metalwork?', a: 'Yes — we have extensive experience with heritage and restoration projects, including listed buildings, historic bridges, ornamental ironwork, and period architectural metalwork. We use appropriate blast media and pressures to preserve detail.' },
      { q: 'What blast media do you use for heritage restoration?', a: 'We select blast media appropriate to the substrate and level of detail required — including fine glass bead and low-pressure techniques for delicate heritage metalwork.' },
      { q: 'Do you work with conservation architects and heritage contractors?', a: 'Yes — we regularly work alongside conservation architects, heritage contractors, and local authorities on restoration projects nationwide.' },
      { q: 'How do I get a quote for heritage shot blasting?', a: 'Call 07970 566409 or use our online quote form. We offer free site surveys and no-obligation quotes for all heritage and restoration projects.' },
    ],
    'manufacturing': [
      { q: 'What manufacturing equipment can you shot blast?', a: 'We shot blast production machinery, CNC equipment, press tools, conveyor systems, warehouse racking, mezzanine floors, and all types of manufacturing plant and equipment.' },
      { q: 'Can you carry out shot blasting inside our manufacturing facility?', a: 'Yes — our mobile units can operate within factory and warehouse environments, subject to site access and safety requirements. We carry out full containment and cleanup.' },
      { q: 'What surface preparation standard do you achieve for manufacturing equipment?', a: 'We achieve SA2.5 near white metal as standard, providing the correct surface profile for industrial protective coatings on manufacturing equipment.' },
      { q: 'How do I get a quote for manufacturing shot blasting services?', a: 'Call 07970 566409 or use our online quote form. We offer free site surveys and will get back to you promptly.' },
    ],
    'marine': [
      { q: 'What marine structures can you shot blast?', a: 'We shot blast vessel hulls, offshore platforms, marine pipework, dock gates, pontoons, jetty structures, and all types of marine and offshore metalwork.' },
      { q: 'Do you achieve the correct surface standard for marine coatings?', a: 'Yes — we achieve SA2.5 and SA3 surface cleanliness standards, which are required for marine-grade protective coating systems in salt water environments.' },
      { q: 'Can you carry out shot blasting at ports and dockyards?', a: 'Yes — our mobile units travel to ports, dockyards, and offshore facilities nationwide. We carry out full containment to prevent blast media entering waterways.' },
      { q: 'How do I get a quote for marine shot blasting services?', a: 'Call 07970 566409 or use our online quote form. We offer free site surveys and no-obligation quotes for all marine and offshore shot blasting projects.' },
    ],
    'retail': [
      { q: 'What retail and commercial metalwork can you shot blast?', a: 'We shot blast shopfronts, commercial signage frames, retail fixtures, security shutters, balustrades, and all types of commercial metalwork for the retail and hospitality sectors.' },
      { q: 'Can you carry out shot blasting at retail premises?', a: 'Yes — our mobile units can operate at retail and commercial premises, typically out of hours to minimise disruption to trading.' },
      { q: 'What surface standard do you achieve for commercial metalwork?', a: 'We achieve SA2.5 near white metal, providing the correct surface profile for decorative and protective coatings on commercial metalwork.' },
      { q: 'How do I get a quote for retail shot blasting services?', a: 'Call 07970 566409 or use our online quote form. We offer free site surveys and no-obligation quotes for all commercial shot blasting projects.' },
    ],
    'transport-logistics': [
      { q: 'What transport and logistics equipment can you shot blast?', a: 'We shot blast trailers, flatbeds, curtainsiders, shipping containers, tankers, chassis frames, and all types of road transport and logistics equipment.' },
      { q: 'Do you offer mobile shot blasting for transport fleets?', a: 'Yes — our mobile units travel to your depot or yard nationwide, so you do not need to transport vehicles to a fixed facility.' },
      { q: 'What surface standard do you achieve for transport equipment?', a: 'We achieve SA2.5 near white metal as standard, which provides the correct surface profile for heavy-duty protective coatings on transport equipment.' },
      { q: 'How do I get a quote for transport shot blasting services?', a: 'Call 07970 566409 or use our online quote form. We offer free site surveys and will get back to you promptly.' },
    ],
  };

  const industryMeta: Record<string, { name: string; description: string }> = {
    'aerospace': { name: 'Aerospace', description: 'Specialist shot blasting for aerospace components. Precision surface preparation meeting aviation industry standards.' },
    'agriculture': { name: 'Agriculture', description: 'Professional shot blasting for agricultural machinery and equipment. Restore tractors, harvesters, and farm implements.' },
    'construction': { name: 'Construction', description: 'Commercial shot blasting for construction equipment and structural steelwork. Expert surface preparation for the building industry.' },
    'heritage-restoration': { name: 'Heritage Restoration', description: 'Specialist shot blasting for heritage and restoration projects. Preserve historic metalwork with expert surface preparation.' },
    'manufacturing': { name: 'Manufacturing', description: 'Industrial shot blasting for manufacturing facilities. Surface preparation for production equipment, racking, and infrastructure.' },
    'marine': { name: 'Marine', description: 'Professional shot blasting for marine and offshore applications. Corrosion removal for vessels, platforms, and maritime equipment.' },
    'retail': { name: 'Retail', description: 'Commercial shot blasting for retail and hospitality sectors. Restore shopfronts, fixtures, and commercial metalwork.' },
    'transport-logistics': { name: 'Transport & Logistics', description: 'Shot blasting for transport and logistics equipment. Surface preparation for trailers, containers, and fleet vehicles.' },
  };

  // Industry → counties mapping (for ItemList schema)
  const industryCountiesMap: Record<string, Array<{ slug: string; name: string }>> = {
    'manufacturing': [
      { slug: 'south-yorkshire', name: 'South Yorkshire' },
      { slug: 'west-midlands', name: 'West Midlands' },
      { slug: 'west-yorkshire', name: 'West Yorkshire' },
      { slug: 'greater-manchester', name: 'Greater Manchester' },
      { slug: 'staffordshire', name: 'Staffordshire' },
      { slug: 'derbyshire', name: 'Derbyshire' },
      { slug: 'leicestershire', name: 'Leicestershire' },
      { slug: 'nottinghamshire', name: 'Nottinghamshire' },
      { slug: 'cheshire', name: 'Cheshire' },
      { slug: 'lancashire', name: 'Lancashire' },
      { slug: 'warwickshire', name: 'Warwickshire' },
      { slug: 'worcestershire', name: 'Worcestershire' },
      { slug: 'northamptonshire', name: 'Northamptonshire' },
      { slug: 'lincolnshire', name: 'Lincolnshire' },
      { slug: 'cambridgeshire', name: 'Cambridgeshire' },
      { slug: 'hertfordshire', name: 'Hertfordshire' },
    ],
    'construction': [
      { slug: 'west-midlands', name: 'West Midlands' },
      { slug: 'south-yorkshire', name: 'South Yorkshire' },
      { slug: 'west-yorkshire', name: 'West Yorkshire' },
      { slug: 'greater-manchester', name: 'Greater Manchester' },
      { slug: 'essex', name: 'Essex' },
      { slug: 'hampshire', name: 'Hampshire' },
      { slug: 'berkshire', name: 'Berkshire' },
      { slug: 'gloucestershire', name: 'Gloucestershire' },
      { slug: 'wiltshire', name: 'Wiltshire' },
      { slug: 'somerset', name: 'Somerset' },
      { slug: 'shropshire', name: 'Shropshire' },
      { slug: 'herefordshire', name: 'Herefordshire' },
    ],
    'agriculture': [
      { slug: 'lincolnshire', name: 'Lincolnshire' },
      { slug: 'norfolk', name: 'Norfolk' },
      { slug: 'suffolk', name: 'Suffolk' },
      { slug: 'cambridgeshire', name: 'Cambridgeshire' },
      { slug: 'herefordshire', name: 'Herefordshire' },
      { slug: 'shropshire', name: 'Shropshire' },
      { slug: 'somerset', name: 'Somerset' },
      { slug: 'north-devon', name: 'North Devon' },
    ],
    'aerospace': [
      { slug: 'hertfordshire', name: 'Hertfordshire' },
      { slug: 'hampshire', name: 'Hampshire' },
      { slug: 'berkshire', name: 'Berkshire' },
      { slug: 'west-midlands', name: 'West Midlands' },
      { slug: 'warwickshire', name: 'Warwickshire' },
      { slug: 'gloucestershire', name: 'Gloucestershire' },
    ],
    'marine': [
      { slug: 'tyne-and-wear', name: 'Tyne & Wear' },
      { slug: 'merseyside', name: 'Merseyside' },
      { slug: 'hampshire', name: 'Hampshire' },
      { slug: 'north-devon', name: 'North Devon' },
      { slug: 'east-wales', name: 'East Wales' },
      { slug: 'county-durham', name: 'County Durham' },
    ],
    'heritage-restoration': [
      { slug: 'west-midlands', name: 'West Midlands' },
      { slug: 'south-yorkshire', name: 'South Yorkshire' },
      { slug: 'west-yorkshire', name: 'West Yorkshire' },
      { slug: 'gloucestershire', name: 'Gloucestershire' },
      { slug: 'wiltshire', name: 'Wiltshire' },
      { slug: 'somerset', name: 'Somerset' },
      { slug: 'herefordshire', name: 'Herefordshire' },
      { slug: 'shropshire', name: 'Shropshire' },
    ],
    'retail': [
      { slug: 'west-midlands', name: 'West Midlands' },
      { slug: 'greater-manchester', name: 'Greater Manchester' },
      { slug: 'west-yorkshire', name: 'West Yorkshire' },
      { slug: 'south-yorkshire', name: 'South Yorkshire' },
      { slug: 'essex', name: 'Essex' },
      { slug: 'hertfordshire', name: 'Hertfordshire' },
    ],
    'transport-logistics': [
      { slug: 'west-midlands', name: 'West Midlands' },
      { slug: 'greater-manchester', name: 'Greater Manchester' },
      { slug: 'south-yorkshire', name: 'South Yorkshire' },
      { slug: 'west-yorkshire', name: 'West Yorkshire' },
      { slug: 'northamptonshire', name: 'Northamptonshire' },
      { slug: 'essex', name: 'Essex' },
      { slug: 'hampshire', name: 'Hampshire' },
      { slug: 'cheshire', name: 'Cheshire' },
    ],
  };

  const industryMatch = url.match(/^\/industries\/([a-z-]+)/);
  if (industryMatch) {
    const industrySlug = industryMatch[1];
    const industry = industryMeta[industrySlug];
    if (industry) {
      const pageUrl = `${SITE_URL}/industries/${industrySlug}`;
      const pageTitle = `Shot Blasting for the ${industry.name} Industry | ${BUSINESS_NAME}`;
      const metaDesc = `${industry.description.slice(0, 130)}... Expert commercial services.`;

      let modifiedHtml = html
        .replace(/<meta\s+name="description"[^>]*>/gi, '')
        .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
        .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
        .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
        .replace(/<link\s+rel="canonical"[^>]*>/gi, '');

      const faqs = industryFAQs[industrySlug] || [];
      const faqSchemaItems = faqs.map(f => `{"@type":"Question","name":"${f.q.replace(/"/g, '&quot;')}","acceptedAnswer":{"@type":"Answer","text":"${f.a.replace(/"/g, '&quot;')}"}}`).join(',');
      const faqSchema = faqs.length > 0 ? `
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${faqSchemaItems}]}
    </script>` : '';

      // Build ItemList schema for counties served by this industry
      const countiesForIndustry = industryCountiesMap[industrySlug] || [];
      const itemListSchema = countiesForIndustry.length > 0 ? (() => {
        const items = countiesForIndustry.map((c, i) =>
          `{"@type":"ListItem","position":${i + 1},"name":"Shot Blasting in ${c.name}","url":"${SITE_URL}/counties/${c.slug}"}`
        ).join(',');
        return `
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"ItemList","name":"Counties Served for ${industry.name} Shot Blasting","description":"UK counties where Commercial Shot Blasting provides ${industry.name.toLowerCase()} shot blasting services","itemListElement":[${items}]}
    </script>`;
      })() : '';

      // Build areaServed: use county-level AdministrativeArea if available, else fall back to Country
      const areaServedJson = countiesForIndustry.length > 0
        ? `[${countiesForIndustry.map(c => `{"@type":"AdministrativeArea","name":"${c.name}","url":"${SITE_URL}/counties/${c.slug}"}`).join(',')}]`
        : `{"@type":"Country","name":"United Kingdom"}`;

      const schemas = `
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Service","name":"Shot Blasting for the ${industry.name} Industry","description":"${industry.description}","provider":{"@type":"LocalBusiness","name":"${BUSINESS_NAME}","telephone":"${PHONE}","url":"${SITE_URL}"},"areaServed":${areaServedJson}}
    </script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"${SITE_URL}"},{"@type":"ListItem","position":2,"name":"Industries","item":"${SITE_URL}/industries"},{"@type":"ListItem","position":3,"name":"${industry.name}","item":"${pageUrl}"}]}
    </script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"WebPage","name":"${pageTitle}","url":"${pageUrl}","description":"${metaDesc}"}
    </script>${faqSchema}${itemListSchema}`;

      const metaTags = `
    <title>${pageTitle}</title>
    <link rel="canonical" href="${pageUrl}" />
    <link rel="alternate" hreflang="en-gb" href="${pageUrl}" />
    <link rel="alternate" hreflang="en" href="${pageUrl}" />
    <meta name="description" content="${metaDesc}" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${metaDesc}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${HERO_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${metaDesc}" />
    <meta name="twitter:image" content="${HERO_IMAGE}" />
    <meta name="twitter:image:alt" content="Shot blasting for the ${industry.name} industry — professional surface preparation by Commercial Shot Blasting" />
    ${schemas}
  `;
      modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, metaTags);
      // Inject SSR body HTML for crawlers
      const industryServices: Record<string, string[]> = {
        'manufacturing': ['Structural Steel Frames', 'Warehouse Racking', 'Plant Machinery', 'Factory Cladding', 'Floor Preparation', 'Pipework'],
        'construction': ['Structural Steel Frames', 'Bridge Steelwork', 'Fire Escapes', 'Staircases', 'Ladders', 'Factory Cladding'],
        'marine': ['Marine Shot Blasting', 'Steel Containers', 'Pipework', 'Bridge Steelwork', 'Rust Removal', 'Coating Removal'],
        'agriculture': ['Agricultural Shot Blasting', 'Plant Machinery', 'Steel Doors', 'Steel Gates', 'Rust Removal', 'Paint Stripping'],
        'aerospace': ['Structural Steel Frames', 'Plant Machinery', 'Mill Scale Removal', 'Coating Removal', 'Powder Coating Removal'],
        'heritage-restoration': ['Steel Gates', 'Steel Doors', 'Staircases', 'Ladders', 'Fire Escapes', 'Bridge Steelwork'],
        'retail': ['Steel Doors', 'Steel Gates', 'Commercial Radiators', 'Steel Sheeting', 'Factory Cladding', 'Floor Preparation'],
        'transport-logistics': ['Commercial Vehicles', 'Steel Containers', 'Warehouse Racking', 'Plant Machinery', 'Rust Removal', 'Paint Stripping'],
      };
      const industryServiceLinks = (industryServices[industrySlug] || ['Structural Steel Frames', 'Plant Machinery', 'Rust Removal', 'Coating Removal', 'Paint Stripping', 'Mill Scale Removal'])
        .map(s => `<li>${escHtml(s)} shot blasting services — mobile, on-site, SA2.5/SA3 standard</li>`).join('');
      const industryCountyLinks = (industryCountiesMap[industrySlug] || []).slice(0, 8)
        .map(c => `<li><a href="${SITE_URL}/counties/${c.slug}">${escHtml(c.name)} ${escHtml(industry.name)} Shot Blasting</a></li>`).join('');
      const industryPillarLinks = getIndustryPillarResources(industrySlug)
        .map((resource) => `<li><a href="${SITE_URL}${resource.href}">${escHtml(resource.title)}</a> — ${escHtml(resource.description)} For a focused Site Visit, tell us: ${escHtml(resource.enquiryPrompt)} <a href="${SITE_URL}/site-survey">Request A Site Visit</a>.</li>`).join('');
      const industryPillarHtml = industryPillarLinks ? `<section><h2>${escHtml(industry.name)} Planning Resources</h2><ul>${industryPillarLinks}</ul></section>` : '';
      const industryBodyHtml = `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="${SITE_URL}/">Home</a> | <a href="${SITE_URL}/services">Services</a> | <a href="${SITE_URL}/service-areas">Service Areas</a> | <a href="${SITE_URL}/industries">Industries</a> | <a href="${SITE_URL}/about">About</a> | <a href="${SITE_URL}/contact">Contact</a></nav><main><h1>Shot Blasting for the ${escHtml(industry.name)} Industry</h1><p>${escHtml(industry.description)}</p><h2>${escHtml(industry.name)} Shot Blasting Services</h2><ul>${industryServiceLinks}</ul>${industryPillarHtml}${industryCountyLinks ? `<h2>Areas Covered for ${escHtml(industry.name)} Shot Blasting</h2><ul>${industryCountyLinks}</ul>` : ''}<p><a href="${SITE_URL}/contact">Request a free site survey</a> | <a href="${SITE_URL}/service-areas">Find your area</a> | Call <a href="tel:${PHONE.replace(/\s/g, '')}">${PHONE}</a></p></main></div>`;
      if (modifiedHtml.includes('<!--SSR_CONTENT-->')) {
        modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', industryBodyHtml);
      } else {
        modifiedHtml = modifiedHtml.replace(/<body[^>]*>/, (match) => `${match}\n${industryBodyHtml}`);
      }
      return modifiedHtml;
    }
  }

  // ── HTML Sitemap page: /sitemap ─────────────────────────────────────────────
  // ── Contact page: /contact ────────────────────────────────────────────────
  if (url === '/contact' || url === '/contact/') {
    const contactTitle = 'Contact Commercial Shot Blasting | Free Site Survey | 07970 566409';
    const contactDesc = 'Contact Commercial Shot Blasting for a free, no-obligation site survey and quote. Call 07970 566409 or complete our online form. We’ll get back to you promptly. Covering the UK.';
    const contactUrl = `${SITE_URL}/contact`;
    let modifiedHtml = html
      .replace(/<meta\s+name="description"[^>]*>/gi, '')
      .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<link\s+rel="canonical"[^>]*>/gi, '');
    modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, `<title>${contactTitle}</title>\n    <link rel="canonical" href="${contactUrl}" />\n    <link rel="alternate" hreflang="en-gb" href="${contactUrl}" />\n    <meta name="description" content="${contactDesc}" />\n    <meta name="robots" content="index, follow" />\n    <meta property="og:title" content="${contactTitle}" />\n    <meta property="og:description" content="${contactDesc}" />\n    <meta property="og:url" content="${contactUrl}" />\n    <meta property="og:type" content="website" />\n    <meta property="og:image" content="${LOGO}" />\n    <meta property="og:locale" content="en_GB" />\n    <meta property="og:site_name" content="${BUSINESS_NAME}" />\n    <meta name="twitter:card" content="summary" />\n    <meta name="twitter:title" content="${contactTitle}" />\n    <meta name="twitter:description" content="${contactDesc}" />`);
    const contactBreadcrumb = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE_URL},{"@type":"ListItem","position":2,"name":"Contact","item":contactUrl}]});
    const contactWebPage = JSON.stringify({"@context":"https://schema.org","@type":"ContactPage","name":contactTitle,"description":contactDesc,"url":contactUrl,"inLanguage":"en-GB"});
    modifiedHtml = modifiedHtml.replace('</head>', `<script type="application/ld+json">${contactBreadcrumb}</script>\n<script type="application/ld+json">${contactWebPage}</script>\n</head>`);
    const _ssrContact = `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="${SITE_URL}/">Home</a> | <a href="${SITE_URL}/services">Services</a> | <a href="${SITE_URL}/service-areas">Service Areas</a> | <a href="${SITE_URL}/about">About</a></nav><main><h1>Contact Commercial Shot Blasting</h1><p>Get a free, no-obligation site survey and quote for your shot blasting project. We work nationwide. Call <a href="tel:07970566409">07970 566409</a> or email <a href="mailto:info@commercialshotblasting.co.uk">info@commercialshotblasting.co.uk</a>. We’ll get back to you promptly.</p><ul><li>Free site surveys nationwide</li><li>No-obligation quotes — project-specific response</li><li>Mobile shot blasting — we come to you</li><li>SA2.5 and SA3 certified results</li></ul><p><a href="${SITE_URL}/site-survey">Book a free site survey</a> | <a href="${SITE_URL}/services">View all services</a></p></main></div>`;
    if (modifiedHtml.includes('<!--SSR_CONTENT-->')) {
      modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', _ssrContact);
    } else {
      modifiedHtml = modifiedHtml.replace(/<body[^>]*>/, (match) => `${match}\n${_ssrContact}`);
    }
    return modifiedHtml;
  }

  // ── Our Work page: /our-work ──────────────────────────────────────────────
  if (url === '/our-work' || url === '/our-work/') {
    const owTitle = 'Our Work — Shot Blasting Projects | Commercial Shot Blasting';
    const owDesc = 'See examples of our commercial and industrial shot blasting work nationwide. Structural steel, factory cladding, containers, bridges, and more. SA2.5 and SA3 standard.';
    const owUrl = `${SITE_URL}/our-work`;
    let modifiedHtml = html
      .replace(/<meta\s+name="description"[^>]*>/gi, '')
      .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<link\s+rel="canonical"[^>]*>/gi, '');
    modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, `<title>${owTitle}</title>\n    <link rel="canonical" href="${owUrl}" />\n    <link rel="alternate" hreflang="en-gb" href="${owUrl}" />\n    <meta name="description" content="${owDesc}" />\n    <meta name="robots" content="index, follow" />\n    <meta property="og:title" content="${owTitle}" />\n    <meta property="og:description" content="${owDesc}" />\n    <meta property="og:url" content="${owUrl}" />\n    <meta property="og:type" content="website" />\n    <meta property="og:image" content="${LOGO}" />\n    <meta property="og:locale" content="en_GB" />\n    <meta property="og:site_name" content="${BUSINESS_NAME}" />\n    <meta name="twitter:card" content="summary_large_image" />\n    <meta name="twitter:title" content="${owTitle}" />\n    <meta name="twitter:description" content="${owDesc}" />`);
    const owBreadcrumb = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE_URL},{"@type":"ListItem","position":2,"name":"Our Work","item":owUrl}]});
    const owWebPage = JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":owTitle,"description":owDesc,"url":owUrl,"inLanguage":"en-GB"});
    modifiedHtml = modifiedHtml.replace('</head>', `<script type="application/ld+json">${owBreadcrumb}</script>\n<script type="application/ld+json">${owWebPage}</script>\n</head>`);
    const _ssrOurWork = `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="${SITE_URL}/">Home</a> | <a href="${SITE_URL}/services">Services</a> | <a href="${SITE_URL}/about">About</a> | <a href="${SITE_URL}/contact">Contact</a></nav><main><h1>Our Shot Blasting Work</h1><p>Examples of commercial and industrial shot blasting projects completed by Commercial Shot Blasting nationwide. Structural steel frames, factory cladding, shipping containers, bridge steelwork, fire escapes, and more — all completed to SA2.5 or SA3 standard.</p><ul><li><a href="${SITE_URL}/services/structural-steel-frames">Structural Steel Shot Blasting</a></li><li><a href="${SITE_URL}/services/factory-cladding">Factory Cladding Shot Blasting</a></li><li><a href="${SITE_URL}/services/bridge-steelwork">Bridge Steelwork Shot Blasting</a></li><li><a href="${SITE_URL}/services/steel-containers">Steel Container Shot Blasting</a></li></ul><p><a href="${SITE_URL}/contact">Get a free quote</a> | Call <a href="tel:07970566409">07970 566409</a></p></main></div>`;
    if (modifiedHtml.includes('<!--SSR_CONTENT-->')) {
      modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', _ssrOurWork);
    } else {
      modifiedHtml = modifiedHtml.replace(/<body[^>]*>/, (match) => `${match}\n${_ssrOurWork}`);
    }
    return modifiedHtml;
  }

  // ── Preparation & Cleanup page: /preparation-cleanup ─────────────────
  if (url === '/preparation-cleanup' || url === '/preparation-cleanup/') {
    const pcTitle = 'Preparation & Cleanup for Shot Blasting | Commercial Shot Blasting';
    const pcDesc = 'Full site preparation and cleanup services for shot blasting projects. We protect surrounding areas, contain abrasive media, and leave your site clean after every job. Nationwide service.';
    const pcUrl = `${SITE_URL}/preparation-cleanup`;
    let modifiedHtml = html
      .replace(/<meta\s+name="description"[^>]*>/gi, '')
      .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<link\s+rel="canonical"[^>]*>/gi, '');
    modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, `<title>${pcTitle}</title>\n    <link rel="canonical" href="${pcUrl}" />\n    <link rel="alternate" hreflang="en-gb" href="${pcUrl}" />\n    <meta name="description" content="${pcDesc}" />\n    <meta name="robots" content="index, follow" />\n    <meta property="og:title" content="${pcTitle}" />\n    <meta property="og:description" content="${pcDesc}" />\n    <meta property="og:url" content="${pcUrl}" />\n    <meta property="og:type" content="website" />\n    <meta property="og:image" content="${LOGO}" />\n    <meta property="og:locale" content="en_GB" />\n    <meta property="og:site_name" content="${BUSINESS_NAME}" />\n    <meta name="twitter:card" content="summary" />\n    <meta name="twitter:title" content="${pcTitle}" />\n    <meta name="twitter:description" content="${pcDesc}" />`);
    const pcBreadcrumb = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE_URL},{"@type":"ListItem","position":2,"name":"Preparation & Cleanup","item":pcUrl}]});
    const pcWebPage = JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":pcTitle,"description":pcDesc,"url":pcUrl,"inLanguage":"en-GB"});
    modifiedHtml = modifiedHtml.replace('</head>', `<script type="application/ld+json">${pcBreadcrumb}</script>\n<script type="application/ld+json">${pcWebPage}</script>\n</head>`);
    const _ssrPrepCleanup = `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="${SITE_URL}/">Home</a> | <a href="${SITE_URL}/services">Services</a> | <a href="${SITE_URL}/contact">Contact</a></nav><main><h1>Preparation &amp; Cleanup for Shot Blasting</h1><p>We provide full site preparation and cleanup for every shot blasting project. Surrounding areas are masked and protected, abrasive media is fully contained, and the site is left clean after every job. No additional cleanup required from you.</p><ul><li>Full site masking and protection</li><li>Abrasive media containment and recovery</li><li>Full site cleanup included in every quote</li><li>Dust suppression and environmental controls</li></ul><p><a href="${SITE_URL}/contact">Request a free site survey</a> | <a href="${SITE_URL}/services">View all services</a> | Call <a href="tel:07970566409">07970 566409</a></p></main></div>`;
    if (modifiedHtml.includes('<!--SSR_CONTENT-->')) {
      modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', _ssrPrepCleanup);
    } else {
      modifiedHtml = modifiedHtml.replace(/<body[^>]*>/, (match) => `${match}\n${_ssrPrepCleanup}`);
    }
    return modifiedHtml;
  }

  if (url === '/sitemap' || url === '/sitemap/') {
    const sitemapTownCount = Object.keys(locationSlugIndex).length;
    const sitemapCountyCount = Object.keys(clientCountyData).length;
    const sitemapTitle = `Site Map — Commercial Shot Blasting`;
    const sitemapDesc = `Commercial Shot Blasting works nationwide. Browse the current England and Wales local directory of service areas and counties, plus services and industries.`;
    const sitemapUrl = `${SITE_URL}/sitemap`;
    let modifiedHtml = html
      .replace(/<meta\s+name="description"[^>]*>/gi, '')
      .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<link\s+rel="canonical"[^>]*>/gi, '');
    const sitemapMetaTags = `
    <title>${sitemapTitle}</title>
    <link rel="canonical" href="${sitemapUrl}" />
    <link rel="alternate" hreflang="en-gb" href="${sitemapUrl}" />
    <link rel="alternate" hreflang="en" href="${sitemapUrl}" />
    <meta name="description" content="${sitemapDesc}" />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="${sitemapTitle}" />
    <meta property="og:description" content="${sitemapDesc}" />
    <meta property="og:url" content="${sitemapUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${LOGO}" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${sitemapTitle}" />
    <meta name="twitter:description" content="${sitemapDesc}" />
  `;
    modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, sitemapMetaTags);
    const _ssr_sitemap = `<div id="ssr-content" aria-hidden="false" style="position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;overflow:hidden;white-space:nowrap;"><nav aria-label="Site Navigation"><a href="${SITE_URL}/">Home</a> | <a href="${SITE_URL}/services">Services</a> | <a href="${SITE_URL}/service-areas">Service Areas</a> | <a href="${SITE_URL}/counties">Counties</a> | <a href="${SITE_URL}/about">About</a> | <a href="${SITE_URL}/contact">Contact</a> | <a href="${SITE_URL}/blog">Blog</a> | <a href="${SITE_URL}/industries">Industries</a> | <a href="${SITE_URL}/glossary">Glossary</a></nav><main><h1>Site Map — Commercial Shot Blasting</h1><p>We work nationwide. This sitemap includes the current England and Wales local directory of ${sitemapTownCount} service areas and ${sitemapCountyCount} county hubs, alongside our services and industries.</p><ul><li><a href="${SITE_URL}/">Home</a></li><li><a href="${SITE_URL}/services">All Shot Blasting Services</a></li><li><a href="${SITE_URL}/service-areas">Service Areas — ${sitemapTownCount} England &amp; Wales Towns</a></li><li><a href="${SITE_URL}/counties">County Hubs — ${sitemapCountyCount}</a></li><li><a href="${SITE_URL}/industries">Industries</a></li><li><a href="${SITE_URL}/blog">Blog</a></li><li><a href="${SITE_URL}/glossary">Shot Blasting Glossary</a></li><li><a href="${SITE_URL}/sitemap.xml">XML Sitemap</a></li><li><a href="${SITE_URL}/about">About Us</a></li><li><a href="${SITE_URL}/contact">Contact</a></li></ul></main></div>`;
    if (modifiedHtml.includes('<!--SSR_CONTENT-->')) {
      modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', _ssr_sitemap);
    } else {
      modifiedHtml = modifiedHtml.replace(/<body[^>]*>/, (match) => `${match}\n${_ssr_sitemap}`);
    }
    return modifiedHtml;
  }

  // Check if this is a service area page
  // Handle both /service-areas/{slug} and /service-areas/{county}/{town} patterns
  const serviceAreaTwoSegMatch = url.match(/\/service-areas\/([a-z-]+)\/([a-z-]+)/);
  if (serviceAreaTwoSegMatch) {
    // Two-segment URL: /service-areas/{county}/{town}
    // Treat the town slug as the location and county slug as the county context
    const countySlug = serviceAreaTwoSegMatch[1];
    const townSlug = serviceAreaTwoSegMatch[2];
    const locationName = capitalize(townSlug);
    const countyName = capitalize(countySlug);
    const fullUrl = `${SITE_URL}/service-areas/${countySlug}/${townSlug}`;
    const countyStr = `, ${countyName}`;
    const robotsDirective = "noindex, follow, max-image-preview:large, max-snippet:-1";
    
    let modifiedHtml = html
      .replace(/<meta\s+name="description"[^>]*>/gi, '')
      .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="robots"[^>]*>/gi, '');
    modifiedHtml = modifiedHtml.replace(/<link\s+rel="canonical"[^>]*>/gi, '');
    
    const metaTags = `
    <title>Shot Blasting in ${locationName} | Commercial Surface Preparation</title>
    <link rel="canonical" href="${fullUrl}" />
    <link rel="alternate" hreflang="en-gb" href="${fullUrl}" />
    <link rel="alternate" hreflang="en" href="${fullUrl}" />
    <meta name="description" content="Commercial shot blasting and sandblasting in ${locationName}${countyStr} for structural steel, cladding, plant, floors and access steel. Share the asset, condition, access and next stage." />
    <meta property="og:title" content="Shot Blasting in ${locationName} | Commercial Surface Preparation" />
    <meta property="og:description" content="Commercial shot blasting in ${locationName}${countyStr} for structural steel, cladding, plant, floors and access steel." />
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${townOgImageUrl(locationName, countyName)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Shot Blasting in ${locationName} | Commercial Surface Preparation" />
    <meta name="twitter:description" content="Commercial shot blasting in ${locationName}${countyStr} for structural steel, cladding, plant, floors and access steel." />
    <meta name="twitter:image" content="${townOgImageUrl(locationName, countyName)}" />
    <meta name="robots" content="${robotsDirective}" />`;
    
    modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, metaTags);
    return modifiedHtml;
  }

  const serviceAreaMatch = url.match(/\/service-areas\/([a-z-]+)/);
  
  if (!serviceAreaMatch) {
    // Not a service area page, return original HTML
    return html;
  }
  
  const locationSlug = serviceAreaMatch[1];
  const metaLocEntry = locationData[locationSlug];
  const priorityNearMeMeta = metaLocEntry
    ? getPriorityLocalNearMeMetadata(locationSlug, metaLocEntry.name)
    : undefined;
  const meta = priorityNearMeMeta
    ? { ...priorityNearMeMeta, url: `${SITE_URL}/service-areas/${locationSlug}` }
    : highImpressionLocationMeta[locationSlug] ?? locationMeta[locationSlug];
  
  if (!meta) {
    // Location not found in our predefined list
    // Generate meta for any location dynamically
    const locationName = capitalize(locationSlug);
    const fullUrl = `${SITE_URL}/service-areas/${locationSlug}`;
    const locDataEntry = locationData[locationSlug];
    const dynCountyName = locDataEntry?.county || undefined;
    const dynCountySlug = locDataEntry?.countySlug || undefined;
    
    // Remove ALL existing meta tags (description, OG, Twitter) to ensure clean slate
    let modifiedHtml = html
      .replace(/<meta\s+name="description"[^>]*>/gi, '')
      .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="robots"[^>]*>/gi, '');
    
    // Remove any existing canonical link to avoid duplicates
    modifiedHtml = modifiedHtml.replace(/<link\s+rel="canonical"[^>]*>/gi, '');

    // Build meta tags and JSON-LD
    const countyStr = dynCountyName ? `, ${dynCountyName}` : '';
    const robotsDirective = getLocationRobotsDirective(locationSlug);
    const metaTags = `
    <title>Shot Blasting &amp; Sandblasting in ${locationName} | Commercial Surface Preparation</title>
    <link rel="canonical" href="${fullUrl}" />
    <link rel="alternate" hreflang="en-gb" href="${fullUrl}" />
    <link rel="alternate" hreflang="en" href="${fullUrl}" />
    <meta name="description" content="Commercial shot blasting and sandblasting in ${locationName}${countyStr} for metal surface preparation, rust removal, structural steel, cladding, containers, plant and coating handover. Request A Site Visit." />
    <meta name="keywords" content="shot blasting ${locationName}, sandblasting ${locationName}, sand blasting ${locationName}, ${locationName} shot blasting, mobile shot blasting ${locationName}, rust removal ${locationName}, surface preparation ${locationName}${dynCountyName ? `, shot blasting ${dynCountyName}` : ''}" />
    <meta property="og:title" content="Shot Blasting &amp; Sandblasting in ${locationName} | Commercial Surface Preparation" />
    <meta property="og:description" content="Commercial shot blasting and sandblasting in ${locationName}${countyStr} for metal surface preparation, rust removal, structural steel, cladding, containers, plant and coating handover." />
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${townOgImageUrl(locationName, dynCountyName || '')}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:alt" content="Shot Blasting in ${locationName}${countyStr} — Commercial Shot Blasting" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Shot Blasting &amp; Sandblasting in ${locationName} | Commercial Surface Preparation" />
    <meta name="twitter:description" content="Commercial shot blasting and sandblasting in ${locationName}${countyStr} for metal surface preparation, rust removal, structural steel, cladding, containers, plant and coating handover." />
    <meta name="twitter:image" content="${townOgImageUrl(locationName, dynCountyName || '')}" />
    <meta name="twitter:image:alt" content="Shot Blasting in ${locationName}${countyStr} — Commercial Shot Blasting" />
    <meta name="robots" content="${robotsDirective}" />
    ${generateLocationSchemas(locationSlug, locationName, fullUrl, dynCountyName, dynCountySlug)}
  `;
    
    // Replace the title tag with all meta tags and JSON-LD
    modifiedHtml = modifiedHtml.replace(
      /<title>.*?<\/title>/,
      metaTags
    );
    
    // Inject server-side body HTML for SEO crawlability
    const bodyHtml = generateServiceAreaBodyHTML(locationSlug);
    if (bodyHtml) {
      if (modifiedHtml.includes('<!--SSR_CONTENT-->')) {
        modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', bodyHtml);
      } else {
        modifiedHtml = modifiedHtml.replace(/<body[^>]*>/, (match) => `${match}\n${bodyHtml}`);
      }
    }
    
    // Inject modulepreload hint for the county chunk to eliminate dynamic import waterfall
    const dynPreloadSlug = locDataEntry?.countySlug || dynCountySlug;
    if (dynPreloadSlug) {
      modifiedHtml = injectCountyChunkPreload(modifiedHtml, dynPreloadSlug);
    }
    return modifiedHtml;
  }
  
  // Location found in predefined list - use its meta data
  const locationName = metaLocEntry?.name ?? capitalize(locationSlug);
  const metaCountyName = metaLocEntry?.county || undefined;
  const metaCountySlug = metaLocEntry?.countySlug || undefined;
  
  // Remove ALL existing meta tags (description, OG, Twitter) to ensure clean slate
  let modifiedHtml = html
    .replace(/<meta\s+name="description"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
    .replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '')
    .replace(/<meta\s+name="robots"[^>]*>/gi, '');
  
  // Remove any existing canonical link to avoid duplicates
  modifiedHtml = modifiedHtml.replace(/<link\s+rel="canonical"[^>]*>/gi, '');

  // Build meta tags and JSON-LD
  const robotsDirective = getLocationRobotsDirective(locationSlug);
  const metaTags = `
    <title>${meta.title}</title>
    <link rel="canonical" href="${meta.url}" />
    <link rel="alternate" hreflang="en-gb" href="${meta.url}" />
    <link rel="alternate" hreflang="en" href="${meta.url}" />
    <meta name="description" content="${meta.description}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:url" content="${meta.url}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${townOgImageUrl(locationName, metaCountyName || '')}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:alt" content="Shot Blasting in ${locationName}${metaCountyName ? ', ' + metaCountyName : ''} — Commercial Shot Blasting" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${BUSINESS_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${townOgImageUrl(locationName, metaCountyName || '')}" />
    <meta name="twitter:image:alt" content="Shot Blasting in ${locationName}${metaCountyName ? ', ' + metaCountyName : ''} — Commercial Shot Blasting" />
    <meta name="robots" content="${robotsDirective}" />
    ${generateLocationSchemas(locationSlug, locationName, meta.url, metaCountyName, metaCountySlug)}
  `;
  
  // Replace the title tag with all meta tags and JSON-LD
  modifiedHtml = modifiedHtml.replace(
    /<title>.*?<\/title>/,
    metaTags
  );
  
  // Inject server-side body HTML for SEO crawlability
  const bodyHtml = generateServiceAreaBodyHTML(locationSlug);
  if (bodyHtml) {
    if (modifiedHtml.includes('<!--SSR_CONTENT-->')) {
      modifiedHtml = modifiedHtml.replace('<!--SSR_CONTENT-->', bodyHtml);
    } else {
      modifiedHtml = modifiedHtml.replace(/<body[^>]*>/, (match) => `${match}\n${bodyHtml}`);
    }
  }
  
  // Inject modulepreload hint for the county chunk to eliminate dynamic import waterfall
  if (metaCountySlug) {
    modifiedHtml = injectCountyChunkPreload(modifiedHtml, metaCountySlug);
  }
  
  return modifiedHtml;
}
// SSR body injection checkpoint - 20260423113933
// Force publish: 20260423134613

// ─── County and Industry route handlers added ────────────────────────────────
