import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function BedfordshireCounty() {
  return <CountyPage county={countyData["bedfordshire"]} />;
}
