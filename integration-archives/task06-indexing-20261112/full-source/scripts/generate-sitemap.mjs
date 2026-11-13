#!/usr/bin/env node
/** Compatibility entry point: the canonical catalogue lives in shared/sitemapPolicy.ts. */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const generator = fileURLToPath(new URL("./generate-sitemap-snapshots.ts", import.meta.url));
const result = spawnSync(process.execPath, ["--import", "tsx", generator], { stdio: "inherit" });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
