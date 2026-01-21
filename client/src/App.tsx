import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Admin from "./pages/Admin";
import ServiceDetail from "./pages/ServiceDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ServiceAreas from "./pages/ServiceAreas";
import BirminghamServiceArea from "./pages/BirminghamServiceArea";
import SheffieldServiceArea from "./pages/SheffieldServiceArea";
import ManchesterServiceArea from "./pages/ManchesterServiceArea";
import BristolServiceArea from "./pages/BristolServiceArea";
import LeedsServiceArea from "./pages/LeedsServiceArea";
import LiverpoolServiceArea from "./pages/LiverpoolServiceArea";
import CambridgeServiceArea from "./pages/CambridgeServiceArea";
import CardiffServiceArea from "./pages/CardiffServiceArea";
import ChesterServiceArea from "./pages/ChesterServiceArea";
import CoventryServiceArea from "./pages/CoventryServiceArea";
import DerbyServiceArea from "./pages/DerbyServiceArea";
import GloucesterServiceArea from "./pages/GloucesterServiceArea";
import HerefordServiceArea from "./pages/HerefordServiceArea";
import IpswichServiceArea from "./pages/IpswichServiceArea";
import LeicesterServiceArea from "./pages/LeicesterServiceArea";
import LincolnServiceArea from "./pages/LincolnServiceArea";
import MiltonKeynesServiceArea from "./pages/MiltonKeynesServiceArea";
import NorwichServiceArea from "./pages/NorwichServiceArea";
import NottinghamServiceArea from "./pages/NottinghamServiceArea";
import ShrewsburyServiceArea from "./pages/ShrewsburyServiceArea";
import StAlbansServiceArea from "./pages/StAlbansServiceArea";
import StokeServiceArea from "./pages/StokeServiceArea";
import SwindonServiceArea from "./pages/SwindonServiceArea";
import StratfordUponAvonServiceArea from "./pages/StratfordUponAvonServiceArea";
import WolverhamtonServiceArea from "./pages/WolverhamtonServiceArea";
import WorcesterServiceArea from "./pages/WorcesterServiceArea";
import NorthamptonServiceArea from "./pages/NorthamptonServiceArea";
import OxfordServiceArea from "./pages/OxfordServiceArea";
import PeterboroughServiceArea from "./pages/PeterboroughServiceArea";
import ChesterfieldServiceArea from "./pages/ChesterfieldServiceArea";
import WrexhamServiceArea from "./pages/WrexhamServiceArea";
import ConstructionIndustry from "./pages/ConstructionIndustry";
import ManufacturingIndustry from "./pages/ManufacturingIndustry";
import RetailIndustry from "./pages/RetailIndustry";
import AerospaceIndustry from "./pages/AerospaceIndustry";
import FreeSiteSurvey from "./pages/FreeSiteSurvey";
import CallAnalytics from "./pages/CallAnalytics";
import { CookieConsent } from "./components/CookieConsent";
import { FloatingCallButton } from "./components/FloatingCallButton";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/gallery"} component={Gallery} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/call-analytics"} component={CallAnalytics} />
      <Route path="/services/:id" component={ServiceDetail} />
      <Route path="/industries/construction" component={ConstructionIndustry} />
      <Route path="/industries/manufacturing" component={ManufacturingIndustry} />
      <Route path="/industries/retail" component={RetailIndustry} />
      <Route path="/industries/aerospace" component={AerospaceIndustry} />
      <Route path="/free-site-survey" component={FreeSiteSurvey} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms" component={Terms} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/service-areas" component={ServiceAreas} />
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
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
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
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
