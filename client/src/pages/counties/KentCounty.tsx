import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";
export default function KentCounty() {
  return <CountyPage county={countyData["kent"]} />;
}
