import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const breadcrumbId = "https://commercialshotblasting.co.uk/services/intumescent-painting#breadcrumb";

describe("Intumescent Painting breadcrumb schema", () => {
  it("defines the same BreadcrumbList entity referenced by its WebPage and supplies its items", () => {
    const page = readFileSync(resolve(projectRoot, "client/src/pages/IntumescentPaintingPage.tsx"), "utf8");

    expect(page).toContain("export const INTUMESCENT_JSONLD_GRAPH");
    expect(page).toContain(`"@id": "${breadcrumbId}"`);
    expect(page).toMatch(new RegExp(`"@type": "BreadcrumbList",\\s*"@id": "${breadcrumbId}",\\s*"itemListElement": \\[`));
    expect(page).toContain(`"breadcrumb": { "@id": "${breadcrumbId}" }`);
    expect(page).toContain('"name": "Home"');
    expect(page).toContain('"name": "Services"');
    expect(page).toContain('"name": "Intumescent Painting"');
  });
});
