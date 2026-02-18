import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function GloucestershireCounty() {
  return <CountyPage county={countyData["gloucestershire"]} />;
}
