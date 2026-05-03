import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";
export default function EssexCounty() {
  return <CountyPage county={countyData["essex"]} />;
}
