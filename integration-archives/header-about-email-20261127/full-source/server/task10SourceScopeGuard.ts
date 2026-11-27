import { createHash } from "node:crypto";
import ts from "typescript";
import captured from "./fixtures/task10ApprovalBaseline.json";
import { restoreBeforeHeaderNavigation } from "./fixtures/headerNavigationScope";

type HeaderEdit = { before: string; after: string; count: number };
type RecordEdit = { mapName: string; recordKey: string; field: string; before: string; after: string };
const fixture = captured as unknown as {
  baselineHashes: Record<string, string>;
  sourceTransforms: Record<string, HeaderEdit[] | RecordEdit[]>;
};
const digest = (source: string) => createHash("sha256").update(source).digest("hex");

/** Test-only: reverse exact owner-approved changes, then prove all original bytes. */
export function normalizeTask10Source(file: string, contents: string): string {
  if (file !== "client/src/components/Header.tsx" && file !== "shared/routeMetadata.ts") return contents;
  const originalHash = fixture.baselineHashes[file];
  if (!originalHash) throw new Error(`Missing Task10 baseline: ${file}`);
  // Historical guards also remain valid before the approved batch is applied.
  if (digest(contents) === originalHash) return contents;
  let restored = contents;
  if (file === "client/src/components/Header.tsx") {
    restored = restoreBeforeHeaderNavigation(restored);
    for (const edit of fixture.sourceTransforms[file] as HeaderEdit[]) {
      if (restored.split(edit.after).length - 1 !== edit.count || restored.includes(edit.before)) {
        throw new Error("Header differs from the exact approved tag/count transformation");
      }
      restored = restored.split(edit.after).join(edit.before);
    }
  } else {
    const tree = ts.createSourceFile(file, contents, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const maps = new Map<string, ts.ObjectLiteralExpression>();
    for (const statement of tree.statements) {
      if (!ts.isVariableStatement(statement)) continue;
      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name) && declaration.initializer && ts.isObjectLiteralExpression(declaration.initializer)) {
          maps.set(declaration.name.text, declaration.initializer);
        }
      }
    }
    const replacements: { start: number; end: number; value: string }[] = [];
    for (const edit of fixture.sourceTransforms[file] as RecordEdit[]) {
      const map = maps.get(edit.mapName);
      const entry = map?.properties.find(node => ts.isPropertyAssignment(node) && ts.isStringLiteral(node.name) && node.name.text === edit.recordKey);
      if (!entry || !ts.isPropertyAssignment(entry) || !ts.isObjectLiteralExpression(entry.initializer)) {
        throw new Error(`Missing approved metadata record: ${edit.recordKey}`);
      }
      const field = entry.initializer.properties.find(node => ts.isPropertyAssignment(node) && (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) && node.name.text === edit.field);
      if (!field || !ts.isPropertyAssignment(field) || !ts.isStringLiteral(field.initializer) || field.initializer.text !== edit.after) {
        throw new Error(`Metadata differs from approved ${edit.recordKey}.${edit.field}`);
      }
      replacements.push({ start: field.initializer.getStart(tree), end: field.initializer.getEnd(), value: JSON.stringify(edit.before) });
    }
    for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
      restored = restored.slice(0, replacement.start) + replacement.value + restored.slice(replacement.end);
    }
  }
  if (digest(restored) !== originalHash) throw new Error(`Unapproved source change outside Task10 exact deltas: ${file}`);
  return restored;
}
