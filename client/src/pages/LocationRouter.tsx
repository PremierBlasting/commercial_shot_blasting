import { useParams } from "wouter";
import { LocationPage } from "@/components/LocationPage";
import { locationData } from "@/data/locationData";
import NotFound from "@/pages/NotFound";

export default function LocationRouter() {
  const params = useParams();
  const slug = params.slug;
  
  if (!slug) {
    return <NotFound />;
  }
  
  const location = locationData[slug];
  
  if (!location) {
    return <NotFound />;
  }
  
  return <LocationPage location={location} />;
}
