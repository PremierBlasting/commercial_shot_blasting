import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function SouthYorkshireCounty() {
  return <CountyPage county={countyData["south-yorkshire"]} />;
}
