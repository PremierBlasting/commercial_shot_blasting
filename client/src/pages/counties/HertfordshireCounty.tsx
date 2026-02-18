import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function HertfordshireCounty() {
  return <CountyPage county={countyData["hertfordshire"]} />;
}
