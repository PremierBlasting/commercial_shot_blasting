import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function DerbyshireCounty() {
  return <CountyPage county={countyData["derbyshire"]} />;
}
