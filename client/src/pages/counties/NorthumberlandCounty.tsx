import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";
export default function NorthumberlandCounty() {
  return <CountyPage county={countyData["northumberland"]} />;
}
