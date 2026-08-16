import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";
export default function DorsetCounty() {
  return <CountyPage county={countyData["dorset"]} />;
}

