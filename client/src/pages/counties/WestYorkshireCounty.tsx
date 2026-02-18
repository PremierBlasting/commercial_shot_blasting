import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function WestYorkshireCounty() {
  return <CountyPage county={countyData["west-yorkshire"]} />;
}
