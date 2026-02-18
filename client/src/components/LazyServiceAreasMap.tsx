import { StaticServiceAreasMap } from "./StaticServiceAreasMap";

// Export the static map directly - no lazy loading needed since it's lightweight
export function LazyServiceAreasMap() {
  return <StaticServiceAreasMap />;
}
