import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";
export default function DurhamCounty() {
  return <CountyPage county={countyData["durham"]} />;
}
