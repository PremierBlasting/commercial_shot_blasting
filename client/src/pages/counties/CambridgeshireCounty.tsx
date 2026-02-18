import { CountyPage } from "@/components/CountyPage";
import { countyData } from "@/data/countyData";

export default function CambridgeshireCounty() {
  return <CountyPage county={countyData["cambridgeshire"]} />;
}
