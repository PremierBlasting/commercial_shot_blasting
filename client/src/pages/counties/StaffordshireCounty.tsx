import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function StaffordshireCounty() {
  return <CountyPage county={countyData["staffordshire"]} />;
}
