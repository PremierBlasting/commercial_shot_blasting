import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";
export default function GreaterManchesterCounty() {
  return <CountyPage county={countyData["greater-manchester"]} />;
}
