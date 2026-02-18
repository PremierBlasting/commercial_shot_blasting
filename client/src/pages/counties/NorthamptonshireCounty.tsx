import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function NorthamptonshireCounty() {
  return <CountyPage county={countyData["northamptonshire"]} />;
}
