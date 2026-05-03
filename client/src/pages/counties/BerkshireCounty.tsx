import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";
export default function BerkshireCounty() {
  return <CountyPage county={countyData["berkshire"]} />;
}
