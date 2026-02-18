import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function NorfolkCounty() {
  return <CountyPage county={countyData["norfolk"]} />;
}
