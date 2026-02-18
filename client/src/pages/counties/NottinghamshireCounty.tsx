import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function NottinghamshireCounty() {
  return <CountyPage county={countyData["nottinghamshire"]} />;
}
