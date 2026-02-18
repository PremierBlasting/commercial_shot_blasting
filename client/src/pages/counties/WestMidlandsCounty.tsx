import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function WestMidlandsCounty() {
  return <CountyPage county={countyData["west-midlands"]} />;
}
