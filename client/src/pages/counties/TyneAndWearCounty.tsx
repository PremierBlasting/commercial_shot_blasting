import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";
export default function TyneAndWearCounty() {
  return <CountyPage county={countyData["tyne-and-wear"]} />;
}
