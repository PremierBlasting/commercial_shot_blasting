import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function SuffolkCounty() {
  return <CountyPage county={countyData["suffolk"]} />;
}
