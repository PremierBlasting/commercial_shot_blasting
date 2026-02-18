import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function EastWalesCounty() {
  return <CountyPage county={countyData["east-wales"]} />;
}
