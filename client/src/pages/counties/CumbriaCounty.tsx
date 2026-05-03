import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";
export default function CumbriaCounty() {
  return <CountyPage county={countyData["cumbria"]} />;
}
