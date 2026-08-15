import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";
export default function MerseysideCounty() {
  return <CountyPage county={countyData["merseyside"]} />;
}

