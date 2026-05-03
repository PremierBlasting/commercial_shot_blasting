import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";
export default function HampshireCounty() {
  return <CountyPage county={countyData["hampshire"]} />;
}
