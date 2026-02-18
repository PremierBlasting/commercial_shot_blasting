import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function LincolnshireCounty() {
  return <CountyPage county={countyData["lincolnshire"]} />;
}
