import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function NorthDevonCounty() {
  return <CountyPage county={countyData["north-devon"]} />;
}
