import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";
export default function CornwallCounty() {
  return <CountyPage county={countyData["cornwall"]} />;
}
