import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect, lazy, Suspense } from "react";
import { initUTMTracking, refreshAttributionActivity } from "./lib/utm";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CookieConsent } from "./components/CookieConsent";
import { FloatingCallButton } from "./components/FloatingCallButton";
import { ScrollToTop } from "@/components/ScrollToTop";
import { RouteMeasurementReady } from "./components/RouteMeasurementReady";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { WhatsAppWidget } from "./components/WhatsAppWidget";
import { StickyMobileCTA } from "./components/StickyMobileCTA";
import { CountyPageSkeleton } from "@/components/CountyPageSkeleton";
import { IndustryPageSkeleton } from "@/components/IndustryPageSkeleton";

// Loading component for lazy-loaded pages
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

// All pages lazy-loaded for optimal code splitting
const Home = lazy(() => import("./pages/Home"));

// Lazy-loaded pages for code splitting
const OurWork = lazy(() => import("./pages/OurWork"));
const Admin = lazy(() => import("./pages/Admin"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Services = lazy(() => import("./pages/Services"));
const Industries = lazy(() => import("./pages/Industries"));
const Counties = lazy(() => import("./pages/Counties"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const AdsAppTermsOfService = lazy(() => import("./pages/AdsAppTermsOfService"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const Areas = lazy(() => import("./pages/Areas"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const PreparationCleanup = lazy(() => import("./pages/PreparationCleanup"));
const FreeSiteSurvey = lazy(() => import("./pages/FreeSiteSurvey"));
const CallAnalytics = lazy(() => import("./pages/CallAnalytics"));
const Reviews = lazy(() => import("./pages/Reviews"));
const StructuralSteelCaseStudy = lazy(() => import("./pages/StructuralSteelCaseStudy"));
const SteelFabricationsPage = lazy(() => import("./pages/SteelFabricationsPage"));
const PillarPage = lazy(() => import("./pages/PillarPage"));
const ExternalStaircasesPage = lazy(() => import("./pages/ExternalStaircasesPage"));
const CarParkPage = lazy(() => import("./pages/CarParkPage"));
const IntumescentPaintingPage = lazy(() => import("./pages/IntumescentPaintingPage"));
const MarineCxSurfacePreparationPage = lazy(() => import("./pages/MarineCxSurfacePreparationPage"));
const CommercialBlastingSpecificationChecklistPage = lazy(() => import("./pages/CommercialBlastingSpecificationChecklistPage"));
const Glossary = lazy(() => import("./pages/Glossary"));
const GlossaryTerm = lazy(() => import("./pages/GlossaryTerm"));
const ChasElitePage = lazy(() => import("./pages/ChasElitePage"));
const CapabilityStatementPage = lazy(() => import("./pages/CapabilityStatementPage"));
const HBTunnellingCaseStudy = lazy(() => import("./pages/HBTunnellingCaseStudy"));
const BromsgroveSchoolCaseStudy = lazy(() => import("./pages/BromsgroveSchoolCaseStudy"));
const FireEscapeProvisionalCaseStudy = lazy(() => import("./pages/FireEscapeProvisionalCaseStudy"));
const AdePowerWakefieldCaseStudy = lazy(() => import("./pages/AdePowerWakefieldCaseStudy"));
// Lazy-loaded county pages (27 counties)
const BedfordshireCounty = lazy(() => import("./pages/counties/BedfordshireCounty"));
const CambridgeshireCounty = lazy(() => import("./pages/counties/CambridgeshireCounty"));
const HertfordshireCounty = lazy(() => import("./pages/counties/HertfordshireCounty"));
const NorfolkCounty = lazy(() => import("./pages/counties/NorfolkCounty"));
const SuffolkCounty = lazy(() => import("./pages/counties/SuffolkCounty"));
const DerbyshireCounty = lazy(() => import("./pages/counties/DerbyshireCounty"));
const LeicestershireCounty = lazy(() => import("./pages/counties/LeicestershireCounty"));
const LincolnshireCounty = lazy(() => import("./pages/counties/LincolnshireCounty"));
const NorthamptonshireCounty = lazy(() => import("./pages/counties/NorthamptonshireCounty"));
const NottinghamshireCounty = lazy(() => import("./pages/counties/NottinghamshireCounty"));
const HerefordshireCounty = lazy(() => import("./pages/counties/HerefordshireCounty"));
const ShropshireCounty = lazy(() => import("./pages/counties/ShropshireCounty"));
const StaffordshireCounty = lazy(() => import("./pages/counties/StaffordshireCounty"));
const WarwickshireCounty = lazy(() => import("./pages/counties/WarwickshireCounty"));
const WestMidlandsCounty = lazy(() => import("./pages/counties/WestMidlandsCounty"));
const WorcestershireCounty = lazy(() => import("./pages/counties/WorcestershireCounty"));
const SouthYorkshireCounty = lazy(() => import("./pages/counties/SouthYorkshireCounty"));
const NorthYorkshireCounty = lazy(() => import("./pages/counties/NorthYorkshireCounty"));
const WestYorkshireCounty = lazy(() => import("./pages/counties/WestYorkshireCounty"));
const CheshireCounty = lazy(() => import("./pages/counties/CheshireCounty"));
const GloucestershireCounty = lazy(() => import("./pages/counties/GloucestershireCounty"));
const NorthDevonCounty = lazy(() => import("./pages/counties/NorthDevonCounty"));
const SomersetCounty = lazy(() => import("./pages/counties/SomersetCounty"));
const WiltshireCounty = lazy(() => import("./pages/counties/WiltshireCounty"));
const BuckinghamshireCounty = lazy(() => import("./pages/counties/BuckinghamshireCounty"));
const EastWalesCounty = lazy(() => import("./pages/counties/EastWalesCounty"));
const GreaterManchesterCounty = lazy(() => import("./pages/counties/GreaterManchesterCounty"));
const EssexCounty = lazy(() => import("./pages/counties/EssexCounty"));
const BerkshireCounty = lazy(() => import("./pages/counties/BerkshireCounty"));
const HampshireCounty = lazy(() => import("./pages/counties/HampshireCounty"));
const LancashireCounty = lazy(() => import("./pages/counties/LancashireCounty"));
const CumbriaCounty = lazy(() => import("./pages/counties/CumbriaCounty"));
const DurhamCounty = lazy(() => import("./pages/counties/DurhamCounty"));
const TyneAndWearCounty = lazy(() => import("./pages/counties/TyneAndWearCounty"));
const NorthumberlandCounty = lazy(() => import("./pages/counties/NorthumberlandCounty"));
const CornwallCounty = lazy(() => import("./pages/counties/CornwallCounty"));
const KentCounty = lazy(() => import("./pages/counties/KentCounty"));
const DevonCounty = lazy(() => import("./pages/counties/DevonCounty"));
const MerseysideCounty = lazy(() => import("./pages/counties/MerseysideCounty"));
const OxfordshireCounty = lazy(() => import("./pages/counties/OxfordshireCounty"));
const SurreyCounty = lazy(() => import("./pages/counties/SurreyCounty"));
const SussexCounty = lazy(() => import("./pages/counties/SussexCounty"));
const DorsetCounty = lazy(() => import("./pages/counties/DorsetCounty"));

// Dynamic location router for all 605 towns and villages
const LocationRouter = lazy(() => import("./pages/LocationRouter"));

// HTML Sitemap — lazy-loaded because it imports the large locationData file
const SitemapPage = lazy(() => import("./pages/SitemapPage"));

// Lazy-loaded industry pages
const ConstructionIndustry = lazy(() => import("./pages/ConstructionIndustry"));
const ManufacturingIndustry = lazy(() => import("./pages/ManufacturingIndustry"));
const RetailIndustry = lazy(() => import("./pages/RetailIndustry"));
const AerospaceIndustry = lazy(() => import("./pages/AerospaceIndustry"));
const MarineIndustry = lazy(() => import("./pages/MarineIndustry"));
const AgricultureIndustry = lazy(() => import("./pages/AgricultureIndustry"));
const TransportLogisticsIndustry = lazy(() => import("./pages/TransportLogisticsIndustry"));
const HeritageRestorationIndustry = lazy(() => import("./pages/HeritageRestorationIndustry"));

function LegacyPageRedirect({ destination }: { destination: string }) {
  useEffect(() => {
    window.location.replace(`${destination}${window.location.search}${window.location.hash}`);
  }, [destination]);
  return null;
}

function Router() {
  const [location] = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    refreshAttributionActivity();
  }, [location]);
  
  // UTM attribution is required for the current lead paths. Route code is
  // loaded only when a visitor shows intent through hover/focus/navigation.
  useEffect(() => {
    initUTMTracking();
  }, []);
  
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/contact"} component={Contact} />
        <Route path={"/about"} component={About} />
        <Route path={"/chas-elite"} component={ChasElitePage} />
        <Route path={"/capability-statement"} component={CapabilityStatementPage} />
        <Route path={"/preparation-cleanup"} component={PreparationCleanup} />
        <Route path={"/our-work"} component={OurWork} />
        <Route path={"/gallery"}><LegacyPageRedirect destination="/our-work" /></Route>
        <Route path={"/admin"} component={Admin} />
        <Route path={"/call-analytics"} component={CallAnalytics} />
        <Route path={"/reviews"} component={Reviews} />
        <Route path={"/case-studies/iss-property-former-bakkavor-foods-facility-wigan"} component={StructuralSteelCaseStudy} />
        <Route path={"/case-studies/structural-steel"}><LegacyPageRedirect destination="/case-studies/iss-property-former-bakkavor-foods-facility-wigan" /></Route>
        <Route path={"/case-studies/hb-tunnelling-doncaster"} component={HBTunnellingCaseStudy} />
        <Route path={"/case-studies/bromsgrove-school-staircase"} component={BromsgroveSchoolCaseStudy} />
        <Route path={"/case-studies/fire-escape-multi-storey-office"} component={FireEscapeProvisionalCaseStudy} />
        <Route path={"/case-studies/ade-power-wakefield-marine-cx-enclosures"} component={AdePowerWakefieldCaseStudy} />
        <Route path={"/steel-fabrications"} component={SteelFabricationsPage} />
        <Route path={"/steel-fabrication-surface-preparation"} component={PillarPage} />
        <Route path={"/steel-chimney-process-stack-surface-preparation"} component={PillarPage} />
        <Route path={"/industrial-steelwork-restoration"} component={PillarPage} />
        <Route path={"/factory-cladding-restoration"} component={PillarPage} />
        <Route path={"/process-pipework-spools-surface-preparation"} component={PillarPage} />
        <Route path={"/agricultural-steelwork-grain-store-preparation"} component={PillarPage} />
        <Route path={"/container-restoration-storage-steelwork"} component={PillarPage} />
        <Route path={"/mobile-on-site-shot-blasting"} component={PillarPage} />
        <Route path={"/intumescent-paint-for-steel"} component={PillarPage} />
        <Route path={"/commercial-shot-blasting-sandblasting"} component={PillarPage} />
        <Route path={"/external-staircases"} component={ExternalStaircasesPage} />
        <Route path={"/services/car-park-paint-removal"} component={CarParkPage} />
        <Route path={"/services/intumescent-painting"} component={IntumescentPaintingPage} />
        <Route path={"/services/marine-cx-surface-preparation"} component={MarineCxSurfacePreparationPage} />
        <Route path={"/commercial-blasting-specification-checklist"} component={CommercialBlastingSpecificationChecklistPage} />
        <Route path={"/services"} component={Services} />
        <Route path={"/services/:id"} component={ServiceDetail} />
        <Route path={"/industries"} component={Industries} />
        <Route path={"/counties"} component={Counties} />
        {/* Industry Pages — each wrapped in its own Suspense so they remain direct Switch children */}
          <Route path="/industries/construction" component={() => <Suspense fallback={<IndustryPageSkeleton />}><ConstructionIndustry /></Suspense>} />
          <Route path="/industries/manufacturing" component={() => <Suspense fallback={<IndustryPageSkeleton />}><ManufacturingIndustry /></Suspense>} />
          <Route path="/industries/retail" component={() => <Suspense fallback={<IndustryPageSkeleton />}><RetailIndustry /></Suspense>} />
          <Route path="/industries/aerospace" component={() => <Suspense fallback={<IndustryPageSkeleton />}><AerospaceIndustry /></Suspense>} />
          <Route path="/industries/marine" component={() => <Suspense fallback={<IndustryPageSkeleton />}><MarineIndustry /></Suspense>} />
          <Route path="/industries/agriculture" component={() => <Suspense fallback={<IndustryPageSkeleton />}><AgricultureIndustry /></Suspense>} />
          <Route path="/industries/transport-logistics" component={() => <Suspense fallback={<IndustryPageSkeleton />}><TransportLogisticsIndustry /></Suspense>} />
          <Route path="/industries/heritage-restoration" component={() => <Suspense fallback={<IndustryPageSkeleton />}><HeritageRestorationIndustry /></Suspense>} />
        <Route path="/site-survey" component={FreeSiteSurvey} />
        <Route path="/free-site-survey"><LegacyPageRedirect destination="/site-survey" /></Route>
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms" component={Terms} />
        <Route path="/terms-of-service" component={AdsAppTermsOfService} />
        <Route path="/glossary" component={Glossary} />
        <Route path="/glossary/:slug" component={GlossaryTerm} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/service-areas" component={Areas} />
        {/* County Pages (25 counties) — each wrapped in its own Suspense so they remain direct Switch children */}
          <Route path="/counties/bedfordshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><BedfordshireCounty /></Suspense>} />
          <Route path="/counties/cambridgeshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><CambridgeshireCounty /></Suspense>} />
          <Route path="/counties/hertfordshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><HertfordshireCounty /></Suspense>} />
          <Route path="/counties/norfolk" component={() => <Suspense fallback={<CountyPageSkeleton />}><NorfolkCounty /></Suspense>} />
          <Route path="/counties/suffolk" component={() => <Suspense fallback={<CountyPageSkeleton />}><SuffolkCounty /></Suspense>} />
          <Route path="/counties/derbyshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><DerbyshireCounty /></Suspense>} />
          <Route path="/counties/leicestershire" component={() => <Suspense fallback={<CountyPageSkeleton />}><LeicestershireCounty /></Suspense>} />
          <Route path="/counties/lincolnshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><LincolnshireCounty /></Suspense>} />
          <Route path="/counties/northamptonshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><NorthamptonshireCounty /></Suspense>} />
          <Route path="/counties/nottinghamshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><NottinghamshireCounty /></Suspense>} />
          <Route path="/counties/herefordshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><HerefordshireCounty /></Suspense>} />
          <Route path="/counties/shropshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><ShropshireCounty /></Suspense>} />
          <Route path="/counties/staffordshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><StaffordshireCounty /></Suspense>} />
          <Route path="/counties/warwickshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><WarwickshireCounty /></Suspense>} />
          <Route path="/counties/west-midlands" component={() => <Suspense fallback={<CountyPageSkeleton />}><WestMidlandsCounty /></Suspense>} />
          <Route path="/counties/worcestershire" component={() => <Suspense fallback={<CountyPageSkeleton />}><WorcestershireCounty /></Suspense>} />
          <Route path="/counties/south-yorkshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><SouthYorkshireCounty /></Suspense>} />
          <Route path="/counties/north-yorkshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><NorthYorkshireCounty /></Suspense>} />
          <Route path="/counties/west-yorkshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><WestYorkshireCounty /></Suspense>} />
          <Route path="/counties/cheshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><CheshireCounty /></Suspense>} />
          <Route path="/counties/gloucestershire" component={() => <Suspense fallback={<CountyPageSkeleton />}><GloucestershireCounty /></Suspense>} />
          <Route path="/counties/north-devon" component={() => <Suspense fallback={<CountyPageSkeleton />}><NorthDevonCounty /></Suspense>} />
          <Route path="/counties/somerset" component={() => <Suspense fallback={<CountyPageSkeleton />}><SomersetCounty /></Suspense>} />
          <Route path="/counties/wiltshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><WiltshireCounty /></Suspense>} />
          <Route path="/counties/buckinghamshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><BuckinghamshireCounty /></Suspense>} />
          <Route path="/counties/east-wales" component={() => <Suspense fallback={<CountyPageSkeleton />}><EastWalesCounty /></Suspense>} />
          <Route path="/counties/greater-manchester" component={() => <Suspense fallback={<CountyPageSkeleton />}><GreaterManchesterCounty /></Suspense>} />
          <Route path="/counties/essex" component={() => <Suspense fallback={<CountyPageSkeleton />}><EssexCounty /></Suspense>} />
          <Route path="/counties/berkshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><BerkshireCounty /></Suspense>} />
          <Route path="/counties/hampshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><HampshireCounty /></Suspense>} />
          <Route path="/counties/lancashire" component={() => <Suspense fallback={<CountyPageSkeleton />}><LancashireCounty /></Suspense>} />
          <Route path="/counties/cumbria" component={() => <Suspense fallback={<CountyPageSkeleton />}><CumbriaCounty /></Suspense>} />
          <Route path="/counties/durham" component={() => <Suspense fallback={<CountyPageSkeleton />}><DurhamCounty /></Suspense>} />
          <Route path="/counties/tyne-and-wear" component={() => <Suspense fallback={<CountyPageSkeleton />}><TyneAndWearCounty /></Suspense>} />
          <Route path="/counties/northumberland" component={() => <Suspense fallback={<CountyPageSkeleton />}><NorthumberlandCounty /></Suspense>} />
          <Route path="/counties/cornwall" component={() => <Suspense fallback={<CountyPageSkeleton />}><CornwallCounty /></Suspense>} />
          <Route path="/counties/kent" component={() => <Suspense fallback={<CountyPageSkeleton />}><KentCounty /></Suspense>} />
          <Route path="/counties/devon" component={() => <Suspense fallback={<CountyPageSkeleton />}><DevonCounty /></Suspense>} />
          <Route path="/counties/merseyside" component={() => <Suspense fallback={<CountyPageSkeleton />}><MerseysideCounty /></Suspense>} />
          <Route path="/counties/oxfordshire" component={() => <Suspense fallback={<CountyPageSkeleton />}><OxfordshireCounty /></Suspense>} />
          <Route path="/counties/surrey" component={() => <Suspense fallback={<CountyPageSkeleton />}><SurreyCounty /></Suspense>} />
          <Route path="/counties/sussex" component={() => <Suspense fallback={<CountyPageSkeleton />}><SussexCounty /></Suspense>} />
          <Route path="/counties/dorset" component={() => <Suspense fallback={<CountyPageSkeleton />}><DorsetCounty /></Suspense>} />
        {/* Canonical local pages use one maintained factual template. */}
        <Route path="/locations/:slug" component={LocationRouter} />
        {/* Shared catch-all for every current service-area location page. */}
        <Route path="/service-areas/:slug" component={() => <Suspense fallback={<div className="min-h-screen bg-background" />}><LocationRouter /></Suspense>} />
         <Route path="/sitemap" component={() => <Suspense fallback={<PageLoader />}><SitemapPage /></Suspense>} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
      <RouteMeasurementReady />
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
          <CookieConsent />
          <FloatingCallButton />
          <ScrollToTop />
          <GoogleAnalytics />
          <WhatsAppWidget />
          <StickyMobileCTA />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
