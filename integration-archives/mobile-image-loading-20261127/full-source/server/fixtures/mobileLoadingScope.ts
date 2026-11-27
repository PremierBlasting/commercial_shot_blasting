import { createHash } from "node:crypto";
import captured from "./mobileLoading20261127.json";

const hash = (value: string) => createHash("sha256").update(value).digest("hex");
const fixtures = captured as Record<string, { beforeHash: string; approvedHash: string; deltas: { before: string; after: string }[] }>;

/** Test-only: reverse exact owner-requested performance deltas, never rebaseline UI. */
export function restoreBeforeMobileLoading(file: string, source: string): string {
  const fixture = fixtures[file];
  if (!fixture) throw new Error(`No approved mobile-loading delta: ${file}`);
  if (hash(source) === fixture.beforeHash) return source;
  if (hash(source) !== fixture.approvedHash) throw new Error(`Source differs outside approved mobile-loading repair: ${file}`);
  let restored = source;
  for (const delta of fixture.deltas) {
    if (restored.split(delta.after).length !== 2) throw new Error(`Mobile-loading delta is not unique: ${file}`);
    restored = restored.replace(delta.after, delta.before);
  }
  if (hash(restored) !== fixture.beforeHash) throw new Error(`Original source not restored: ${file}`);
  return restored;
}
