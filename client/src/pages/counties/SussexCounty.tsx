import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";
export default function SussexCounty() {
  return <CountyPage county={countyData["sussex"]} />;
}

