#!/usr/bin/env -S tsx
/**
 * Generate policy mirrors without network/database/private reads or build-date stamps.
 * Only public source registries and the existing public image XML are inputs.
 * Blog publication membership remains exclusively runtime-owned.
 */
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { omitUnverifiedImageParentLastmod, staticSitemapSnapshots } from "../shared/sitemapPolicy";

export function generateSitemapSnapshots(publicDir: string): void {
  // All source-catalogue dates are unknown: clock is only a validation ceiling.
  const snapshots = staticSitemapSnapshots(new Date());
  for (const [filename, xml] of Object.entries(snapshots)) {
    writeFileSync(join(publicDir, filename), xml, "utf8");
    console.log(`[sitemap-snapshots] ${filename}`);
  }
  const blogPath = join(publicDir, "sitemap-blog.xml");
  if (existsSync(blogPath)) {
    unlinkSync(blogPath);
    console.log("[sitemap-snapshots] Removed obsolete static blog snapshot; runtime endpoint retained");
  }
  const imagePath = join(publicDir, "sitemap-images.xml");
  if (existsSync(imagePath)) {
    const original = readFileSync(imagePath, "utf8");
    const withoutUnverifiedDate = omitUnverifiedImageParentLastmod(original);
    if (withoutUnverifiedDate !== original) writeFileSync(imagePath, withoutUnverifiedDate, "utf8");
  }
}

const thisFile = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === thisFile) {
  generateSitemapSnapshots(join(dirname(thisFile), "..", "client", "public"));
}
