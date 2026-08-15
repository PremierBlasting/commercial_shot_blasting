import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";
export default function OxfordshireCounty() {
  return <CountyPage county={countyData["oxfordshire"]} />;
}
