import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function NorthYorkshireCounty() {
  return <CountyPage county={countyData["north-yorkshire"]} />;
}
