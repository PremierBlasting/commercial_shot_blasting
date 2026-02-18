import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function SomersetCounty() {
  return <CountyPage county={countyData["somerset"]} />;
}
