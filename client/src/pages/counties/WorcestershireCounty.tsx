import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function WorcestershireCounty() {
  return <CountyPage county={countyData["worcestershire"]} />;
}
