import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");

describe("homepage featured steel-sheets video", () => {
  it("uses the approved trimmed middle sequence rather than the untrimmed source footage", () => {
    const page = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");

    expect(page).toContain("homepage-steel-sheets-middle-04-to-15_5434cd44.mp4");
    expect(page).not.toContain("CICKcOChLeIGkWWG.mp4");
    expect(page).toContain('aria-label="Steel-sheet surface preparation video"');
    expect(page).toContain("Shot Blasting Steel Sheets in Action");
  });
});
