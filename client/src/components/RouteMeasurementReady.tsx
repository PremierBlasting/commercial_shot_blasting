import { useEffect, useState } from "react";
import { useLocation } from "wouter";

/** Lives INSIDE Suspense: pending routes cannot be reported with the old title. */
export function RouteMeasurementReady() {
  const [location] = useLocation();
  const [ready, setReady] = useState<string | null>(null);
  useEffect(() => { setReady(location); }, [location]);
  return <span hidden aria-hidden="true" data-csb-route-ready={ready === location ? ready : undefined} />;
}
