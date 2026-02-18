import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function WarwickshireCounty() {
  return <CountyPage county={countyData["warwickshire"]} />;
}
