export type GeographicPoint = {
  lat: number;
  lng: number;
};

export type ClusterableCoveragePoint = GeographicPoint & {
  slug: string;
  name: string;
};

export type CoverageCluster<T extends ClusterableCoveragePoint> = GeographicPoint & {
  members: T[];
};

export function distanceInMiles(from: GeographicPoint, to: GeographicPoint): number {
  const earthRadiusMiles = 3958.8;
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const latitudeDelta = toRadians(to.lat - from.lat);
  const longitudeDelta = toRadians(to.lng - from.lng);
  const a = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(toRadians(from.lat)) * Math.cos(toRadians(to.lat)) * Math.sin(longitudeDelta / 2) ** 2;

  return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Groups detailed town points into geographic cells while the map is zoomed out.
 * County hubs always remain individual markers, so visitors retain a clear route
 * into the full area directory even when individual town pins are clustered.
 */
export function clusterCoveragePoints<T extends ClusterableCoveragePoint>(points: T[], zoom: number): CoverageCluster<T>[] {
  if (zoom >= 8) return points.map((point) => ({ lat: point.lat, lng: point.lng, members: [point] }));

  const cellSize = zoom <= 5 ? 2.2 : zoom === 6 ? 1.15 : 0.55;
  const groups = new Map<string, T[]>();

  points.forEach((point) => {
    const key = `${Math.floor(point.lat / cellSize)}:${Math.floor(point.lng / cellSize)}`;
    const current = groups.get(key) ?? [];
    current.push(point);
    groups.set(key, current);
  });

  return Array.from(groups.values()).map((members) => ({
    lat: members.reduce((total, point) => total + point.lat, 0) / members.length,
    lng: members.reduce((total, point) => total + point.lng, 0) / members.length,
    members,
  }));
}
