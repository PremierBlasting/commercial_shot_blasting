import type { LocationData } from "@shared/locationData";

type ChunkModule = { default: Record<string, LocationData> };

const chunkCache = new Map<string, Record<string, LocationData>>();

/** Dynamically import a county chunk and return the location data for a specific slug */
export async function loadLocation(slug: string, countySlug: string): Promise<LocationData | null> {
  // Check cache first
  if (chunkCache.has(countySlug)) {
    return chunkCache.get(countySlug)![slug] || null;
  }

  try {
    // Dynamic import - Vite will code-split each county into its own chunk
    const chunkImporters: Record<string, () => Promise<ChunkModule>> = import.meta.glob(
      "./locationChunks/*.ts",
      { eager: false }
    ) as Record<string, () => Promise<ChunkModule>>;

    const chunkPath = `./locationChunks/${countySlug}.ts`;
    const importer = chunkImporters[chunkPath];
    if (!importer) return null;

    const mod = await importer();
    chunkCache.set(countySlug, mod.default);
    return mod.default[slug] || null;
  } catch {
    return null;
  }
}

/** Load all locations for a county (for nearby towns) */
export async function loadCountyLocations(countySlug: string): Promise<Record<string, LocationData>> {
  if (chunkCache.has(countySlug)) {
    return chunkCache.get(countySlug)!;
  }

  try {
    const chunkImporters: Record<string, () => Promise<ChunkModule>> = import.meta.glob(
      "./locationChunks/*.ts",
      { eager: false }
    ) as Record<string, () => Promise<ChunkModule>>;

    const chunkPath = `./locationChunks/${countySlug}.ts`;
    const importer = chunkImporters[chunkPath];
    if (!importer) return {};

    const mod = await importer();
    chunkCache.set(countySlug, mod.default);
    return mod.default;
  } catch {
    return {};
  }
}
