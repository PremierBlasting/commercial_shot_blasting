import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function CheshireCounty() {
  return <CountyPage county={countyData["cheshire"]} />;
}
