import { useParams, Redirect } from "wouter";
import { LocationPage } from "@/components/LocationPage";
import { locationData } from "@/data/locationData";
import NotFound from "@/pages/NotFound";

export default function LocationRouter() {
  const params = useParams();
  const slug = params.slug;

  if (!slug) {
    return <NotFound />;
  }

  // Client-side safety net: if this component is reached via /locations/:slug,
  // redirect to the canonical /service-areas/:slug URL.
  // The server-side 301 redirect in server/_core/index.ts handles Googlebot;
  // this handles any SPA navigation that bypasses the server.
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/locations/")) {
    return <Redirect to={`/service-areas/${slug}`} />;
  }

  const location = locationData[slug];

  if (!location) {
    return <NotFound />;
  }

  return <LocationPage location={location} />;
}
