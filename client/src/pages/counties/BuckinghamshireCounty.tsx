import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function BuckinghamshireCounty() {
  return <CountyPage county={countyData["buckinghamshire"]} />;
}
