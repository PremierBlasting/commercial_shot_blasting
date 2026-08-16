import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";
export default function SurreyCounty() {
  return <CountyPage county={countyData["surrey"]} />;
}
