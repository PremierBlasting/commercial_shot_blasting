# Forward-Only WhatsApp Click Tracker

## Purpose and activation boundary

This implementation records an opaque reference only when a visitor who has accepted the existing analytics consent clicks either Commercial Shot Blasting WhatsApp entry point. The reference is placed in the prefilled WhatsApp message, allowing a later process to identify an actual new inbound reply by **exact reference only**.

The feature is intentionally **not active until its database migration is applied**. The new table starts empty at deployment. It contains no historic browser clicks, no historic WhatsApp threads, no existing contact records, and no derived time-window matches.

## Record and matching rules

| Part | Safeguard |
|---|---|
| Public message | Contains only a randomly generated `PB2-…` reference. It does not expose GCLID, email, phone number, UTM values, or any other attribution detail. |
| Website event ledger | Stores only consented, post-deployment click attribution. Each `trackerRef` is unique; later user retries do not overwrite it. |
| Inbound match | A future API-only HubSpot reader must submit the exact reference and the new HubSpot thread ID. It must never choose a reference based on time, customer identity, status, or closest unmatched click. |
| Callback | `whatsappTracking.markExactReply` requires the `x-whatsapp-tracker-secret` header to exactly equal the protected `WHATSAPP_TRACKER_CALLBACK_SECRET`. It remains unavailable until that secret exists. |
| Idempotency | The database status update succeeds only once, changing `clicked` to `matched`. A duplicate replay of the same message returns `matched: false`. |
| CRM scope | The website tracker contains no HubSpot write path. The future matcher is read-only against HubSpot. |
| Google Ads scope | No conversion action is created and no conversion is exported by this source change. The existing `HubSpot - Customer` action remains separate. |

## Required deployment steps

1. Apply `drizzle/0003_amused_invisible_woman.sql` to the **Commercial Shot Blasting website database only**. Do not apply it to the Premier Blasting admin database.
2. Set a newly generated, high-entropy `WHATSAPP_TRACKER_CALLBACK_SECRET` through the website project’s protected secrets configuration. Do not add it to the repository, frontend code, shell history, or the cloud runbook.
3. Publish the designated `commercial_shot_blasting` project. This creates the new empty baseline at deployment; it does not activate Google Ads export.
4. Add a fresh-start-only, read-only HubSpot message matcher on the recovered cloud after the cloud workspace is accessible again. Configure it to call the protected exact-match endpoint only after it sees the same `PB2-…` reference in a message newer than its baseline.
5. Separately create and approve a new Google Ads conversion destination for **WhatsApp Lead — Exact Reply** before any export is enabled. It must not reuse the £950 `HubSpot - Customer` conversion or removed legacy actions.

## Verification

The source passed the opaque-reference, consent-gate, malformed-reference, and fail-closed callback tests. TypeScript and the production build also passed. No live event, HubSpot request, Google Ads write, database migration, or website publication was performed during validation.

## References

[1] [HubSpot: Create and sync ad conversion events with your Google Ads account](https://knowledge.hubspot.com/ads/create-and-sync-ad-conversion-events-with-your-google-ads-account)

[2] [HubSpot: Webhooks API guide](https://developers.hubspot.com/docs/api-reference/latest/webhooks/guide)
