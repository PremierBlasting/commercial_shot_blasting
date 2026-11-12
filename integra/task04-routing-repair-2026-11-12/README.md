# Task04 routing repair — inert exact native archive

This directory archives the approved, tested Task04 native routing repair. **It is not installed into the legacy application, not runnable as a standalone package, and not a deployment or public release.** The active root App/router, `/contact` and HubSpot form, server, database, dependencies and configuration are untouched.

## Provenance and scope

- Repository: `PremierBlasting/commercial_shot_blasting`; existing branch: `manus/csb-call-attribution-20261107`.
- Expected archive commit parent: `1e15244790ccbbbe82041dd25ef7326e5d0adf53`.
- Native baseline: `fc77da8996665551fb84fab9f4f3055daf047071`.
- Genuine tested native checkpoint: `98d2492ab4eb67410937d1ce58db8e4b3ef1218b` (version `98d2492a`).
- Exact approved scope: 18 paths, including five new server source/test files; no deleted paths.
- `client/public/__manus__/version.json` is generated metadata and intentionally excluded.
- The final immutable approval explicitly includes `todo.md`, superseding its generic exclusion in the earlier preparation plan. Its frozen bytes are retained **inside this archive only**.

The native routing gate depends on the native application's existing enquiry prerequisites, content/database interfaces and server architecture. These prerequisites are not compatible with the legacy root. Do not apply this patch to the target root or selectively activate its gate without a separately authorised compatibility migration.

## Contents

`native-approved.patch.gz` is the deterministic level-9 gzip of the exact 163801-byte approved native artifact. **The supplied input contains ANSI colour escapes and abbreviated blob IDs, so its raw bytes are not Git-applyable.** It is retained byte-for-byte, not silently regenerated. Removing only ANSI SGR escapes produces the exact colour-free abbreviated immutable Git diff (SHA-256 `74e5ed6bc1f11790e27358352865f291e7c95c615969f44396687280b37224c0`). `native-full-index.patch.gz` is the separately identified colour-free full-index, binary-capable equivalent derived only from immutable baseline/checkpoint Git objects for the same approved paths; use this equivalent for isolated reconstruction. Its uncompressed SHA-256 is `7d6977a48586c8016f7afae35c17c07a4466ccd715e3ac7b0266aaa3b6d99d6e` and gzip SHA-256 is `ec22158a77739d9f49d1ba85ff3a12a5fcee920eeaeede1b85c4d4e1a7871f73`. `full-source/` contains every approved final file byte-for-byte. `new-files/` explicitly retains the five approved new files. `immutable-manifest.json` is the exact supplied handoff; `manifest.json` adds baseline/final hashes, full blob identities, modes, gzip integrity, scope and reconstruction results.

Patch SHA-256: `c0e76f9781b4156078b52742b1e7dfeaa4ebe0155ba62caaf75a68a78a06cf98`. Gzip SHA-256: `4218224868c69583d65d2d1d478ad35dc493fe54712eae4680f7d9460a310660`. Gzip has zero modification time, no filename/comment and a fixed OS marker (255).

## Independent archive validation

The supplied artifact, after removal of only ANSI SGR escapes, exactly matches the immutable baseline/checkpoint Git diff for the approved paths. Both this colour-free equivalent and the separately generated full-index equivalent passed apply-check, application, reverse-check and reversal in an isolated disposable Git index, never the managed index or either application working tree. Every final scoped blob matched its frozen source SHA-256 and checkpoint blob/mode. All 1489 non-generated files in the reconstructed native checkpoint were independently SHA-256 validated; the excluded version metadata remained at baseline. Reversal restored the complete baseline tree `24be7551df20b6367e93f4ab1c5f5b06cef5391f`. Both gzips were decompressed and matched their respective uncompressed artifacts byte-for-byte.

## Native validation evidence

Supplied final-ready handoff: 86 offline-safe files / 1120 passed; TypeScript, build, 94 HTTP, browser390/1440, 271 media and controlled production statuses passed.

These tests were completed on the native checkpoint by its owning task; this archive integration did not rerun native/browser/live API tests. Controlled production-status validation was native evidence, not activation of this legacy repository archive. Public release remains the responsibility of the parent task, and no public-fix claim is made here.

## Preservation boundary

Only this new inert archive directory is staged and committed. All 767 original target tracked files, active root application, App/contact/HubSpot behavior, server/database/dependencies, existing archive content, main and remediation history, managed/target Git configuration and GitHub authentication/binding configuration are preserved. No reset, rebind, merge, force push, new repository, deployment, live test or automation is performed.

## Exact-source whitespace

The staged whitespace check reports 74 inherited formatting warnings exclusively in byte-exact frozen source copies. No warning occurs in integration-authored README or manifests. These native bytes are deliberately preserved rather than reformatted; their immutable SHA-256 identities and reconstruction remain exact.
