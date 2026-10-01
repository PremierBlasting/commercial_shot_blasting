import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const indexPath = resolve(projectRoot, "client/src/data/locationSlugIndex.ts");
const chunksDirectory = resolve(projectRoot, "client/src/data/locationChunks");

function getIndexedLocations(): Array<{ slug: string; countySlug: string }> {
  const source = readFileSync(indexPath, "utf8");
  return [...source.matchAll(/^\s*"([^"]+)":\s*"([^"]+)",?$/gm)]
    .map((match) => ({ slug: match[1], countySlug: match[2] }));
}

describe("service-area catalogue parity", () => {
  it("provides a client chunk containing every sitemap-indexed location", () => {
    const entries = getIndexedLocations();
    const chunkNames = new Set(readdirSync(chunksDirectory)
      .filter((file) => file.endsWith(".ts"))
      .map((file) => file.replace(/\.ts$/, "")));

    expect(entries.length).toBeGreaterThan(700);
    for (const { slug, countySlug } of entries) {
      const chunkPath = resolve(chunksDirectory, `${countySlug}.ts`);
      expect(chunkNames.has(countySlug), `Missing county chunk for ${slug}`).toBe(true);
      expect(existsSync(chunkPath), `Missing source file for ${slug}`).toBe(true);
      const chunkSource = readFileSync(chunkPath, "utf8");
      expect(chunkSource).toContain(`"${slug}": {`);
    }
  });

  it("uses the corrected Sussex chunks for Eastbourne and Hastings", () => {
    const entries = new Map(getIndexedLocations().map((entry) => [entry.slug, entry.countySlug]));
    expect(entries.get("eastbourne")).toBe("sussex");
    expect(entries.get("hastings")).toBe("sussex");
  });
});
