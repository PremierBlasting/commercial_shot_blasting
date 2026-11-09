# Native enquiry media integration package — 9 November 2026

> **NOT RUNNABLE IN THIS OLD TARGET / NOT MERGED / NOT DEPLOYED FROM THIS OLD-TARGET BRANCH.**
>
> This directory is an inert, reviewable archive of the authorised native enquiry photo/video change. Adding it to `manus/csb-call-attribution-20261107` does not enable native uploads in this repository, replace its iframe form, merge the change into `main`, or deploy an application. The native feature at checkpoint `c38fbf2342e4763d30c87eadf852e4cfd541438b` **was deployed separately through the managed native system**, as verified by the parent and detailed below. This package task does not deploy anything or verify real storage/CRM delivery.

## Provenance and target boundary

The only authorised GitHub target is `PremierBlasting/commercial_shot_blasting`, repository ID **1137065430**. The package commit descends directly from cookie-consent commit `a2248fadf90b36c867d22ba3e4f91e5bb7d290ee`, preserving its tracking ancestor `728b7bdbfd272e0380f5476956a9967c6d7f29de`. Target `main` at `5d0d8ec359837f6a61801463beb6734821515bca` and `manus/soft404-remediation-20261001` at `f74aa0efec78f899330821b555959ed312c52932` are not changed.

The authoritative source is the expressly final-ready native checkout `/home/ubuntu/commercial_shot_blasting_manus`. Every patch delta is relative to the immutable native baseline **`be47be4e1263974881dfe28221aca806af40cfcc`**, not the legacy target. `manifest.json` records the checkpoint observed while taking the stable working-tree snapshot; an intervening parent checkpoint does not change the patch baseline. All 17 source files were checked byte-for-byte before and after packaging.

The native configured export associated with `PremierBlasting/Commercial_Shot_Blasting_Account` is not this task's target. This package neither pushes nor relinks that export.

## Why the legacy application is untouched

This target retains `HubSpotForm.tsx` and its iframe callback contract. It lacks the native `LeadForm.tsx`, shared privacy content and native lead-notification prerequisites present in the native baseline. Its older contact procedure does not implement the native required fields, attribution, accepted-attempt token or established notification/CRM delivery contract. The native and target histories have no shared ancestor.

Installing the upload backend alone would not upgrade the iframe form. Replacing the target's root form, router, privacy policy or dependencies would silently migrate an older application and overwrite preserved history. Therefore **do not apply this patch to the target root, copy these source files over target application files, or import/run the companion modules from this branch**. All 754 pre-existing target tracked files remain byte-identical to the protected preparation baseline.

## Contents and scope

- `native-source-be47be4.patch` is the complete standard unified Git patch for exactly 17 authorised native paths: 11 modifications and six additions.
- `new-files/` contains full byte-exact companion copies of the six additions, retaining their native paths. These are review copies, not a second application or a wholesale restoration method.
- `manifest.json` contains native baseline/final SHA-256 values, package provenance, protected target references and validation summaries. Local evidence is identified and hashed, but raw logs are not bundled.
- `checksums.sha256` authenticates every other package artifact; it excludes itself to avoid a circular checksum.

The patch extends the existing native enquiry form with optional original photos/videos/PDFs, sequential 1 MiB chunks, bounded server temporary assembly, actual-content format validation, retry/progress/error handling and preservation of successful links. Shared limits are 20 files/500 MiB total, 100 MiB per photo/PDF and 250 MiB per video. Recognition of camera formats is not a promise of every RAW format/codec or antivirus scanning. Native storage gains only Blob/AbortSignal support. The router adds the upload procedures and a 20,000-character generated-message envelope; the visitor's textarea remains capped at 5,000. Privacy changes cover original video/metadata and temporary assembly/retention. `file-type` is pinned to `20.5.0` with its corresponding lockfile resolution.

`manifest.json` is the definitive path whitelist. There is no `todo.md`, sitemap, production media, build output, raw application/browser log, environment snapshot, real credential or actual enquiry/customer data in this package. Synthetic tests and deliberately invalid security fixtures are retained exactly; pre-existing public business destinations are not live submissions.

## Restoration only into an already compatible native checkout

Restoration needs a separately authorised, **full native application checkout at exactly** `be47be4e1263974881dfe28221aca806af40cfcc`. All historical native prerequisites must already exist, including the native lead form/required fields, attribution and accepted-attempt safeguards, existing storage configuration contract, native notifications/CRM integrations and shared privacy renderer. This package does not supply or authorise their migration into the old target.

1. Work in a disposable or otherwise expressly authorised compatible native checkout, not either application checkout used to prepare this package. Confirm `git rev-parse HEAD` equals the full native baseline above. Require a clean working tree and clean index; preserve historical prerequisites.
2. Verify the package artifacts with `sha256sum -c checksums.sha256` from this package directory. Inspect the manifest and patch whitelist before use.
3. Point `PATCH` at the absolute path of `native-source-be47be4.patch`. From the compatible native root, first run `git apply --numstat "$PATCH"` and `git apply --check --whitespace=error "$PATCH"`. Do not bypass a mismatch, rebase this patch onto the old target, or replace root files wholesale.
4. Only after separate restoration authorisation, apply with `git apply --whitespace=error "$PATCH"`. Confirm all 17 final SHA-256 values match `manifest.json`; `git apply --reverse --check "$PATCH"` should also succeed.
5. In the appropriate separately authorised environment, reinstall dependencies using the pinned lockfile (for example, `pnpm install --frozen-lockfile`). Use a Node runtime that provides `node:fs` `openAsBlob`, `Blob` and `AbortSignal.timeout`, and writable private temporary-file storage with sufficient bounded capacity. Do not include production secrets or call live upstreams merely to restore/review this archive.
6. Run the compatible native typecheck, build and explicitly offline-safe/mocked tests under that environment's approved no-live-network setup. Neither this README nor a successful local patch check authorises deployment, live uploads, Google events, customer enquiries or CRM calls.

## Completed validation and its limits

Parent final-ready evidence reports **82 offline-safe Vitest files / 917 tests passed**, `pnpm check` passed and `pnpm build` passed. Their final summaries were inspected during packaging. The build retains informational pnpm configuration and chunk-size warnings; these are not represented as warning-free results.

Intercepted browser checks at **390 px and 1440 px** passed for a 6 MiB photo plus 2 MiB MOV, valid-file retention after a bad mixed selection and 1 MiB chunk size. Additional intercepted scenarios passed for cached successful-file reuse, upload failure blocking lead submission, explicit skip of failed files, blank-MIME JPG and retention of 20 files when a 21st is rejected. Storage assembly, lead delivery and Google HTTP requests were intercepted; no real uploads, leads or events were sent. Sixteen protected native production files were independently rechecked as baseline-byte-identical.

The package verifier built a disposable exact-native-base fixture from the 11 existing scoped files only. Patch parsing, forward applicability, actual application, **all 17 final byte/hash comparisons**, reverse applicability and actual exact-baseline restoration passed. The disposable fixture was removed. It was never a runnable project, and the patch was never applied to the old target root.

Separately, the parent reported a managed native deployment-success notification and fresh **13:47–13:48 UTC** public HTTP checks on 9 November. Home, Hampshire and privacy returned 200; `index-PPvWAE_m.js` and `LeadForm-mhNTNvCe.js` matched the tested build byte-for-byte and exposed the new limits/endpoints/retry controls and updated privacy disclosure. A GET-only `beginMediaUpload` check returned 405 for the recognised mutation without creating an upload. The parent evidence is identified and hashed in the manifest; this package task only read those local records and did not make public/backend/upload requests. Thus the **native feature is independently deployed**, while this old-target archive is not runnable or deployed from its branch.

The parent also separately verified staging-native HTTP transport with a 1 MiB chunk, a 13-byte second slice and an idempotent duplicate acknowledgement, then cancelled temporary assembly. Finalisation was not invoked; there were zero permanent-storage writes, lead submissions or Google events. This is not end-to-end storage/lead delivery verification.

The offline/mocked/intercepted tests and separately supplied public asset/transport evidence do **not** prove this legacy branch is runnable, maximum-size real storage receipt, real notification/CRM delivery or Google measurement. The package-only push neither performs nor claims a native release; that already completed managed deployment is separate. Actual maximum-size storage and real customer media receipt remain untested.
