import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";
export default function LancashireCounty() {
  return <CountyPage county={countyData["lancashire"]} />;
}
