import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function LeicestershireCounty() {
  return <CountyPage county={countyData["leicestershire"]} />;
}
