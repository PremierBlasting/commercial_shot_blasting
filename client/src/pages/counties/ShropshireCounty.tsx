import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function ShropshireCounty() {
  return <CountyPage county={countyData["shropshire"]} />;
}
