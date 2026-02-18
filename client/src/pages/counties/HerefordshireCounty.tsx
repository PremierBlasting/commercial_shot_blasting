import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function HerefordshireCounty() {
  return <CountyPage county={countyData["herefordshire"]} />;
}
