import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";
export default function DevonCounty() {
  return <CountyPage county={countyData["devon"]} />;
}
