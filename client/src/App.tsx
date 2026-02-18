import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect, lazy, Suspense } from "react";
import { prefetchCriticalPages } from "./hooks/usePrefetch";
import { initUTMTracking } from "./lib/utm";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CookieConsent } from "./components/CookieConsent";
import { FloatingCallButton } from "./components/FloatingCallButton";
import { ScrollToTop } from "@/components/ScrollToTop";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

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

// Eagerly loaded core pages (critical for initial load)
import Home from "./pages/Home";

// Lazy-loaded pages for code splitting
const OurWork = lazy(() => import("./pages/OurWork"));
const Admin = lazy(() => import("./pages/Admin"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Services = lazy(() => import("./pages/Services"));
const Industries = lazy(() => import("./pages/Industries"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const Areas = lazy(() => import("./pages/Areas"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const PreparationCleanup = lazy(() => import("./pages/PreparationCleanup"));
const FreeSiteSurvey = lazy(() => import("./pages/FreeSiteSurvey"));
const CallAnalytics = lazy(() => import("./pages/CallAnalytics"));

// Lazy-loaded service area pages
const BirminghamServiceArea = lazy(() => import("./pages/BirminghamServiceArea"));
const SheffieldServiceArea = lazy(() => import("./pages/SheffieldServiceArea"));
const ManchesterServiceArea = lazy(() => import("./pages/ManchesterServiceArea"));
const BristolServiceArea = lazy(() => import("./pages/BristolServiceArea"));
const LeedsServiceArea = lazy(() => import("./pages/LeedsServiceArea"));
const LiverpoolServiceArea = lazy(() => import("./pages/LiverpoolServiceArea"));
const CambridgeServiceArea = lazy(() => import("./pages/CambridgeServiceArea"));
const CardiffServiceArea = lazy(() => import("./pages/CardiffServiceArea"));
const ChesterServiceArea = lazy(() => import("./pages/ChesterServiceArea"));
const CoventryServiceArea = lazy(() => import("./pages/CoventryServiceArea"));
const DerbyServiceArea = lazy(() => import("./pages/DerbyServiceArea"));
const GloucesterServiceArea = lazy(() => import("./pages/GloucesterServiceArea"));
const HerefordServiceArea = lazy(() => import("./pages/HerefordServiceArea"));
const IpswichServiceArea = lazy(() => import("./pages/IpswichServiceArea"));
const LeicesterServiceArea = lazy(() => import("./pages/LeicesterServiceArea"));
const LincolnServiceArea = lazy(() => import("./pages/LincolnServiceArea"));
const MiltonKeynesServiceArea = lazy(() => import("./pages/MiltonKeynesServiceArea"));
const NorwichServiceArea = lazy(() => import("./pages/NorwichServiceArea"));
const NottinghamServiceArea = lazy(() => import("./pages/NottinghamServiceArea"));
const ShrewsburyServiceArea = lazy(() => import("./pages/ShrewsburyServiceArea"));
const StAlbansServiceArea = lazy(() => import("./pages/StAlbansServiceArea"));
const StokeServiceArea = lazy(() => import("./pages/StokeServiceArea"));
const SwindonServiceArea = lazy(() => import("./pages/SwindonServiceArea"));
const StratfordUponAvonServiceArea = lazy(() => import("./pages/StratfordUponAvonServiceArea"));
const WolverhamtonServiceArea = lazy(() => import("./pages/WolverhamtonServiceArea"));
const WorcesterServiceArea = lazy(() => import("./pages/WorcesterServiceArea"));
const NorthamptonServiceArea = lazy(() => import("./pages/NorthamptonServiceArea"));
const OxfordServiceArea = lazy(() => import("./pages/OxfordServiceArea"));
const PeterboroughServiceArea = lazy(() => import("./pages/PeterboroughServiceArea"));
const ChesterfieldServiceArea = lazy(() => import("./pages/ChesterfieldServiceArea"));
const WrexhamServiceArea = lazy(() => import("./pages/WrexhamServiceArea"));
const AylesburyServiceArea = lazy(() => import("./pages/AylesburyServiceArea"));
const BanburyServiceArea = lazy(() => import("./pages/BanburyServiceArea"));
const BarnsleyServiceArea = lazy(() => import("./pages/BarnsleyServiceArea"));
const BathServiceArea = lazy(() => import("./pages/BathServiceArea"));
const BasildonServiceArea = lazy(() => import("./pages/BasildonServiceArea"));
const BedfordServiceArea = lazy(() => import("./pages/BedfordServiceArea"));
const BirkenheadServiceArea = lazy(() => import("./pages/BirkenheadServiceArea"));
const BoltonServiceArea = lazy(() => import("./pages/BoltonServiceArea"));
const BuryStEdmundsServiceArea = lazy(() => import("./pages/BuryStEdmundsServiceArea"));
const BurtonUponTrentServiceArea = lazy(() => import("./pages/BurtonUponTrentServiceArea"));
const CannockServiceArea = lazy(() => import("./pages/CannockServiceArea"));
const CannockChaseServiceArea = lazy(() => import("./pages/CannockChaseServiceArea"));
const ChelmsfordServiceArea = lazy(() => import("./pages/ChelmsfordServiceArea"));
const CheltenhamServiceArea = lazy(() => import("./pages/CheltenhamServiceArea"));
const ColchesterServiceArea = lazy(() => import("./pages/ColchesterServiceArea"));
const CoalvilleServiceArea = lazy(() => import("./pages/CoalvilleServiceArea"));
const CorbyServiceArea = lazy(() => import("./pages/CorbyServiceArea"));
const CreweServiceArea = lazy(() => import("./pages/CreweServiceArea"));
const DoncasterServiceArea = lazy(() => import("./pages/DoncasterServiceArea"));
const DronfieldServiceArea = lazy(() => import("./pages/DronfieldServiceArea"));
const DudleyServiceArea = lazy(() => import("./pages/DudleyServiceArea"));
const GranthamServiceArea = lazy(() => import("./pages/GranthamServiceArea"));
const GreatYarmouthServiceArea = lazy(() => import("./pages/GreatYarmouthServiceArea"));
const GuildfordServiceArea = lazy(() => import("./pages/GuildfordServiceArea"));
const HalifaxServiceArea = lazy(() => import("./pages/HalifaxServiceArea"));
const HemelHempsteadServiceArea = lazy(() => import("./pages/HemelHempsteadServiceArea"));
const HighWycombeServiceArea = lazy(() => import("./pages/HighWycombeServiceArea"));
const HuddersfieldServiceArea = lazy(() => import("./pages/HuddersfieldServiceArea"));
const KidderminsterServiceArea = lazy(() => import("./pages/KidderminsterServiceArea"));
const KingsLynnServiceArea = lazy(() => import("./pages/KingsLynnServiceArea"));
const KingswoodServiceArea = lazy(() => import("./pages/KingswoodServiceArea"));
const KetteringServiceArea = lazy(() => import("./pages/KetteringServiceArea"));
const LeamingtonSpaServiceArea = lazy(() => import("./pages/LeamingtonSpaServiceArea"));
const LeightonBuzzardServiceArea = lazy(() => import("./pages/LeightonBuzzardServiceArea"));
const LichfieldServiceArea = lazy(() => import("./pages/LichfieldServiceArea"));
const LowestoftServiceArea = lazy(() => import("./pages/LowestoftServiceArea"));
const LoughboroughServiceArea = lazy(() => import("./pages/LoughboroughServiceArea"));
const LutonServiceArea = lazy(() => import("./pages/LutonServiceArea"));
const MacclesfieldServiceArea = lazy(() => import("./pages/MacclesfieldServiceArea"));
const MansfieldServiceArea = lazy(() => import("./pages/MansfieldServiceArea"));
const NewportServiceArea = lazy(() => import("./pages/NewportServiceArea"));
const NewcastleUnderLymeServiceArea = lazy(() => import("./pages/NewcastleUnderLymeServiceArea"));
const NuneatonServiceArea = lazy(() => import("./pages/NuneatonServiceArea"));
const OldhamServiceArea = lazy(() => import("./pages/OldhamServiceArea"));
const PortsmouthServiceArea = lazy(() => import("./pages/PortsmouthServiceArea"));
const ReadingServiceArea = lazy(() => import("./pages/ReadingServiceArea"));
const RedditchServiceArea = lazy(() => import("./pages/RedditchServiceArea"));
const RochdaleServiceArea = lazy(() => import("./pages/RochdaleServiceArea"));
const RotherhamServiceArea = lazy(() => import("./pages/RotherhamServiceArea"));
const RugbyServiceArea = lazy(() => import("./pages/RugbyServiceArea"));
const RuncornServiceArea = lazy(() => import("./pages/RuncornServiceArea"));
const SalfordServiceArea = lazy(() => import("./pages/SalfordServiceArea"));
const SalisburyServiceArea = lazy(() => import("./pages/SalisburyServiceArea"));
const ScunthorpeServiceArea = lazy(() => import("./pages/ScunthorpeServiceArea"));
const SloughServiceArea = lazy(() => import("./pages/SloughServiceArea"));
const SolihullServiceArea = lazy(() => import("./pages/SolihullServiceArea"));
const SouthendOnSeaServiceArea = lazy(() => import("./pages/SouthendOnSeaServiceArea"));
const StaffordServiceArea = lazy(() => import("./pages/StaffordServiceArea"));
const StevenageServiceArea = lazy(() => import("./pages/StevenageServiceArea"));
const StockportServiceArea = lazy(() => import("./pages/StockportServiceArea"));
const SuttonColdfieldServiceArea = lazy(() => import("./pages/SuttonColdfieldServiceArea"));
const TauntonServiceArea = lazy(() => import("./pages/TauntonServiceArea"));
const TamworthServiceArea = lazy(() => import("./pages/TamworthServiceArea"));
const TelfordServiceArea = lazy(() => import("./pages/TelfordServiceArea"));
const ThetfordServiceArea = lazy(() => import("./pages/ThetfordServiceArea"));
const WalsallServiceArea = lazy(() => import("./pages/WalsallServiceArea"));
const WarringtonServiceArea = lazy(() => import("./pages/WarringtonServiceArea"));
const WatfordServiceArea = lazy(() => import("./pages/WatfordServiceArea"));
const WellingboroughServiceArea = lazy(() => import("./pages/WellingboroughServiceArea"));
const WelwynGardenCityServiceArea = lazy(() => import("./pages/WelwynGardenCityServiceArea"));
const WestonSuperMareServiceArea = lazy(() => import("./pages/WestonSuperMareServiceArea"));

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
const WestYorkshireCounty = lazy(() => import("./pages/counties/WestYorkshireCounty"));
const CheshireCounty = lazy(() => import("./pages/counties/CheshireCounty"));
const GloucestershireCounty = lazy(() => import("./pages/counties/GloucestershireCounty"));
const NorthDevonCounty = lazy(() => import("./pages/counties/NorthDevonCounty"));
const SomersetCounty = lazy(() => import("./pages/counties/SomersetCounty"));
const WiltshireCounty = lazy(() => import("./pages/counties/WiltshireCounty"));
const BuckinghamshireCounty = lazy(() => import("./pages/counties/BuckinghamshireCounty"));
const EastWalesCounty = lazy(() => import("./pages/counties/EastWalesCounty"));

// Dynamic location router for all 605 towns and villages
const LocationRouter = lazy(() => import("./pages/LocationRouter"));

// Lazy-loaded industry pages
const ConstructionIndustry = lazy(() => import("./pages/ConstructionIndustry"));
const ManufacturingIndustry = lazy(() => import("./pages/ManufacturingIndustry"));
const RetailIndustry = lazy(() => import("./pages/RetailIndustry"));
const AerospaceIndustry = lazy(() => import("./pages/AerospaceIndustry"));
const MarineIndustry = lazy(() => import("./pages/MarineIndustry"));
const AgricultureIndustry = lazy(() => import("./pages/AgricultureIndustry"));
const TransportLogisticsIndustry = lazy(() => import("./pages/TransportLogisticsIndustry"));
const HeritageRestorationIndustry = lazy(() => import("./pages/HeritageRestorationIndustry"));

function Router() {
  const [location] = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  // Initialize UTM tracking and prefetch critical pages after initial load
  useEffect(() => {
    initUTMTracking();
    prefetchCriticalPages();
  }, []);
  
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/contact"} component={Contact} />
        <Route path={"/about"} component={About} />
        <Route path={"/preparation-cleanup"} component={PreparationCleanup} />
        <Route path={"/our-work"} component={OurWork} />
        <Route path={"/admin"} component={Admin} />
        <Route path={"/call-analytics"} component={CallAnalytics} />
        <Route path={"/services"} component={Services} />
        <Route path={"/services/:id"} component={ServiceDetail} />
        <Route path={"/industries"} component={Industries} />
        <Route path="/industries/construction" component={ConstructionIndustry} />
        <Route path="/industries/manufacturing" component={ManufacturingIndustry} />
        <Route path="/industries/retail" component={RetailIndustry} />
        <Route path="/industries/aerospace" component={AerospaceIndustry} />
        <Route path="/industries/marine" component={MarineIndustry} />
        <Route path="/industries/agriculture" component={AgricultureIndustry} />
        <Route path="/industries/transport-logistics" component={TransportLogisticsIndustry} />
        <Route path="/industries/heritage-restoration" component={HeritageRestorationIndustry} />
        <Route path="/free-site-survey" component={FreeSiteSurvey} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms" component={Terms} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/service-areas" component={Areas} />
        {/* County Pages (27 counties) */}
        <Route path="/counties/bedfordshire" component={BedfordshireCounty} />
        <Route path="/counties/cambridgeshire" component={CambridgeshireCounty} />
        <Route path="/counties/hertfordshire" component={HertfordshireCounty} />
        <Route path="/counties/norfolk" component={NorfolkCounty} />
        <Route path="/counties/suffolk" component={SuffolkCounty} />
        <Route path="/counties/derbyshire" component={DerbyshireCounty} />
        <Route path="/counties/leicestershire" component={LeicestershireCounty} />
        <Route path="/counties/lincolnshire" component={LincolnshireCounty} />
        <Route path="/counties/northamptonshire" component={NorthamptonshireCounty} />
        <Route path="/counties/nottinghamshire" component={NottinghamshireCounty} />
        <Route path="/counties/herefordshire" component={HerefordshireCounty} />
        <Route path="/counties/shropshire" component={ShropshireCounty} />
        <Route path="/counties/staffordshire" component={StaffordshireCounty} />
        <Route path="/counties/warwickshire" component={WarwickshireCounty} />
        <Route path="/counties/west-midlands" component={WestMidlandsCounty} />
        <Route path="/counties/worcestershire" component={WorcestershireCounty} />
        <Route path="/counties/south-yorkshire" component={SouthYorkshireCounty} />
        <Route path="/counties/west-yorkshire" component={WestYorkshireCounty} />
        <Route path="/counties/cheshire" component={CheshireCounty} />
        <Route path="/counties/gloucestershire" component={GloucestershireCounty} />
        <Route path="/counties/north-devon" component={NorthDevonCounty} />
        <Route path="/counties/somerset" component={SomersetCounty} />
        <Route path="/counties/wiltshire" component={WiltshireCounty} />
        <Route path="/counties/buckinghamshire" component={BuckinghamshireCounty} />
        <Route path="/counties/east-wales" component={EastWalesCounty} />
        {/* Dynamic Location Pages (605 towns and villages) */}
        <Route path="/locations/:slug" component={LocationRouter} />
        <Route path="/service-areas/birmingham" component={BirminghamServiceArea} />
        <Route path="/service-areas/sheffield" component={SheffieldServiceArea} />
        <Route path="/service-areas/manchester" component={ManchesterServiceArea} />
        <Route path="/service-areas/bristol" component={BristolServiceArea} />
        <Route path="/service-areas/leeds" component={LeedsServiceArea} />
        <Route path="/service-areas/liverpool" component={LiverpoolServiceArea} />
        <Route path="/service-areas/cambridge" component={CambridgeServiceArea} />
        <Route path="/service-areas/cardiff" component={CardiffServiceArea} />
        <Route path="/service-areas/chester" component={ChesterServiceArea} />
        <Route path="/service-areas/coventry" component={CoventryServiceArea} />
        <Route path="/service-areas/derby" component={DerbyServiceArea} />
        <Route path="/service-areas/gloucester" component={GloucesterServiceArea} />
        <Route path="/service-areas/hereford" component={HerefordServiceArea} />
        <Route path="/service-areas/ipswich" component={IpswichServiceArea} />
        <Route path="/service-areas/leicester" component={LeicesterServiceArea} />
        <Route path="/service-areas/lincoln" component={LincolnServiceArea} />
        <Route path="/service-areas/milton-keynes" component={MiltonKeynesServiceArea} />
        <Route path="/service-areas/norwich" component={NorwichServiceArea} />
        <Route path="/service-areas/nottingham" component={NottinghamServiceArea} />
        <Route path="/service-areas/shrewsbury" component={ShrewsburyServiceArea} />
        <Route path="/service-areas/st-albans" component={StAlbansServiceArea} />
        <Route path="/service-areas/stoke" component={StokeServiceArea} />
        <Route path="/service-areas/swindon" component={SwindonServiceArea} />
        <Route path="/service-areas/stratford-upon-avon" component={StratfordUponAvonServiceArea} />
        <Route path="/service-areas/wolverhampton" component={WolverhamtonServiceArea} />
        <Route path="/service-areas/worcester" component={WorcesterServiceArea} />
        <Route path="/service-areas/northampton" component={NorthamptonServiceArea} />
        <Route path="/service-areas/oxford" component={OxfordServiceArea} />
        <Route path="/service-areas/peterborough" component={PeterboroughServiceArea} />
        <Route path="/service-areas/chesterfield" component={ChesterfieldServiceArea} />
        <Route path="/service-areas/wrexham" component={WrexhamServiceArea} />
        <Route path="/service-areas/aylesbury" component={AylesburyServiceArea} />
        <Route path="/service-areas/banbury" component={BanburyServiceArea} />
        <Route path="/service-areas/barnsley" component={BarnsleyServiceArea} />
        <Route path="/service-areas/bath" component={BathServiceArea} />
        <Route path="/service-areas/basildon" component={BasildonServiceArea} />
        <Route path="/service-areas/bedford" component={BedfordServiceArea} />
        <Route path="/service-areas/birkenhead" component={BirkenheadServiceArea} />
        <Route path="/service-areas/bolton" component={BoltonServiceArea} />
        <Route path="/service-areas/bury-st-edmunds" component={BuryStEdmundsServiceArea} />
        <Route path="/service-areas/burton-upon-trent" component={BurtonUponTrentServiceArea} />
        <Route path="/service-areas/cannock" component={CannockServiceArea} />
        <Route path="/service-areas/cannock-chase" component={CannockChaseServiceArea} />
        <Route path="/service-areas/chelmsford" component={ChelmsfordServiceArea} />
        <Route path="/service-areas/cheltenham" component={CheltenhamServiceArea} />
        <Route path="/service-areas/colchester" component={ColchesterServiceArea} />
        <Route path="/service-areas/coalville" component={CoalvilleServiceArea} />
        <Route path="/service-areas/corby" component={CorbyServiceArea} />
        <Route path="/service-areas/crewe" component={CreweServiceArea} />
        <Route path="/service-areas/doncaster" component={DoncasterServiceArea} />
        <Route path="/service-areas/dronfield" component={DronfieldServiceArea} />
        <Route path="/service-areas/dudley" component={DudleyServiceArea} />
        <Route path="/service-areas/grantham" component={GranthamServiceArea} />
        <Route path="/service-areas/great-yarmouth" component={GreatYarmouthServiceArea} />
        <Route path="/service-areas/guildford" component={GuildfordServiceArea} />
        <Route path="/service-areas/halifax" component={HalifaxServiceArea} />
        <Route path="/service-areas/hemel-hempstead" component={HemelHempsteadServiceArea} />
        <Route path="/service-areas/high-wycombe" component={HighWycombeServiceArea} />
        <Route path="/service-areas/huddersfield" component={HuddersfieldServiceArea} />
        <Route path="/service-areas/kidderminster" component={KidderminsterServiceArea} />
        <Route path="/service-areas/kings-lynn" component={KingsLynnServiceArea} />
        <Route path="/service-areas/kingswood" component={KingswoodServiceArea} />
        <Route path="/service-areas/kettering" component={KetteringServiceArea} />
        <Route path="/service-areas/leamington-spa" component={LeamingtonSpaServiceArea} />
        <Route path="/service-areas/leighton-buzzard" component={LeightonBuzzardServiceArea} />
        <Route path="/service-areas/lichfield" component={LichfieldServiceArea} />
        <Route path="/service-areas/lowestoft" component={LowestoftServiceArea} />
        <Route path="/service-areas/loughborough" component={LoughboroughServiceArea} />
        <Route path="/service-areas/luton" component={LutonServiceArea} />
        <Route path="/service-areas/macclesfield" component={MacclesfieldServiceArea} />
        <Route path="/service-areas/mansfield" component={MansfieldServiceArea} />
        <Route path="/service-areas/newport" component={NewportServiceArea} />
        <Route path="/service-areas/newcastle-under-lyme" component={NewcastleUnderLymeServiceArea} />
        <Route path="/service-areas/nuneaton" component={NuneatonServiceArea} />
        <Route path="/service-areas/oldham" component={OldhamServiceArea} />
        <Route path="/service-areas/portsmouth" component={PortsmouthServiceArea} />
        <Route path="/service-areas/reading" component={ReadingServiceArea} />
        <Route path="/service-areas/redditch" component={RedditchServiceArea} />
        <Route path="/service-areas/rochdale" component={RochdaleServiceArea} />
        <Route path="/service-areas/rotherham" component={RotherhamServiceArea} />
        <Route path="/service-areas/rugby" component={RugbyServiceArea} />
        <Route path="/service-areas/runcorn" component={RuncornServiceArea} />
        <Route path="/service-areas/salford" component={SalfordServiceArea} />
        <Route path="/service-areas/salisbury" component={SalisburyServiceArea} />
        <Route path="/service-areas/scunthorpe" component={ScunthorpeServiceArea} />
        <Route path="/service-areas/slough" component={SloughServiceArea} />
        <Route path="/service-areas/solihull" component={SolihullServiceArea} />
        <Route path="/service-areas/southend-on-sea" component={SouthendOnSeaServiceArea} />
        <Route path="/service-areas/stafford" component={StaffordServiceArea} />
        <Route path="/service-areas/stevenage" component={StevenageServiceArea} />
        <Route path="/service-areas/stockport" component={StockportServiceArea} />
        <Route path="/service-areas/sutton-coldfield" component={SuttonColdfieldServiceArea} />
        <Route path="/service-areas/taunton" component={TauntonServiceArea} />
        <Route path="/service-areas/tamworth" component={TamworthServiceArea} />
        <Route path="/service-areas/telford" component={TelfordServiceArea} />
        <Route path="/service-areas/thetford" component={ThetfordServiceArea} />
        <Route path="/service-areas/walsall" component={WalsallServiceArea} />
        <Route path="/service-areas/warrington" component={WarringtonServiceArea} />
        <Route path="/service-areas/watford" component={WatfordServiceArea} />
        <Route path="/service-areas/wellingborough" component={WellingboroughServiceArea} />
        <Route path="/service-areas/welwyn-garden-city" component={WelwynGardenCityServiceArea} />
        <Route path="/service-areas/weston-super-mare" component={WestonSuperMareServiceArea} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
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
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
