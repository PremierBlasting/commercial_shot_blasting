import { createHash } from "node:crypto";
import fixture from "./headerNavigation20261127.json";

const hash = (source: string) => createHash("sha256").update(source).digest("hex");

/** Reverse only the exact 27 November owner-approved navigation/email delta. */
export function restoreBeforeHeaderNavigation(source: string): string {
  if (hash(source) === fixture.beforeHash) return source;
  if (hash(source) !== fixture.approvedHash) throw new Error("Header contains a change outside the approved navigation update");
  let restored = source;
  for (const delta of fixture.deltas) {
    if (restored.split(delta.after).length !== 2) throw new Error("Header differs from an exact navigation delta");
    restored = restored.replace(delta.after, delta.before);
  }
  if (hash(restored) !== fixture.beforeHash) throw new Error("Historical header source bytes were not restored");
  return restored;
}
