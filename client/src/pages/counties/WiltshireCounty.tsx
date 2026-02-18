import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function WiltshireCounty() {
  return <CountyPage county={countyData["wiltshire"]} />;
}
