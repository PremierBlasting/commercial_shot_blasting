# Cloud Computer — Info's Cloud Computer

This persistent VM runs background cron jobs for Manus web projects.

## Services Running

| Directory | Project | Description |
|---|---|---|
| `/home/ubuntu/om-cron/` | optimised.marketing | GSC indexing + sitemap ping + **mockup generation worker v5 (persistent, Manus-first, 9-pass, 65K tokens)** + **mockup worker v4 (persistent, 10-pass, kept as fallback)** + **Manus webhook receiver (persistent)** |
| `/home/ubuntu/collagen-cron/` | collagen.club | Product sync, review sync, rank tracker, GSC report, **blog writer (Mon+Thu)**, SEO enrichment (Sun), sitemap audit (daily) |
| `/home/ubuntu/lumibeauty-cron/` | becomeabrandpartner.com | Drip email processor (6h) + webhook_logs cleanup (weekly Sun 02:00 UTC) |
| `/home/ubuntu/screenshot-service/` | Platform | Screenshot API service |
| `/home/ubuntu/image-processor/` | Platform | Image processing service |

## om-cron (Optimised Marketing)

Jobs run daily via systemd timers. Logs via `journalctl -u om-gsc-indexing.service -n 50`.

### om-mockup-worker-v5 (persistent service — PRIMARY — always running)

**CURRENT PRODUCTION WORKER.** Manus-first architecture — Gemini 2.5 Pro (via Manus Forge) is the primary builder across 6 of 9 passes. Claude Opus acts as Project Manager and critic. GPT-4o is QA copy scorer only.

File: `job-mockup-worker-v5.js` | Service: `om-mockup-worker-v5.service` | Added: May 2026

**Key changes from v4:**
- GTmetrix awaited BEFORE Pass 1 (not fire-and-forget) — performance data informs the content brief
- Pass 2 Manus token budget: 32K → **65K** (2x more space for the master HTML)
- Pass 4: GPT-4o replaced with **Manus Forge** (Manus fixes its own code — better coherence)
- Pass 7b (Mistral second-opinion): **REMOVED** — redundant
- Pass 8: Manus Forge replaces GPT-4o as copy injector (**65K tokens**)
- Pass 9 Manus token budget: 32K → **65K**
- QA remediation token budget: 32K → **65K**
- All critique passes receive **FULL HTML** (no `.substring(0, 25000)` truncation)
- 1 mockup only — style driven by user's form selection

**Pipeline (9 passes):**
1. **Pass 1 — Claude Opus (PM)** — master content + copy strategy (GTmetrix data injected here)
2. **Pass 2 — Manus Forge/Gemini 2.5 Pro** — full HTML generation (65K tokens)
3. **Pass 3 — Claude Opus** — UX/CRO critique (full HTML)
4. **Pass 4 — Manus Forge** — enact UX fixes (65K tokens)
5. **Pass 5 — Claude Opus** — visual design critique (full HTML)
6. **Pass 6 — Manus Forge** — enact design improvements (65K tokens)
7. **Pass 7 — Claude Opus** — copy polish (REPLACE/WITH pairs only)
8. **Pass 8 — Manus Forge** — inject polished copy (65K tokens)
9. **Pass 9 — Manus Forge** — definitive final quality pass (65K tokens)

**QA System (10 checks):** Python automated checks (QA-1 to QA-6) + Claude Opus UX score (QA-7) + GPT-4o copy score (QA-8) + Gemini design score (QA-9) + Manus Forge remediation if <85/100 (QA-10, 65K tokens, max 2 loops)

**18 pre-generation data sources:** Python brand analyser v2, scrape, SerpAPI, Serper, Google Places, PageSpeed, Knowledge Graph, Brandfetch, Clearbit Logo, Wappalyzer, Companies House, Pexels, Unsplash, Pixabay, Perplexity Sonar Pro, admired site screenshots, DataForSEO, GTmetrix (awaited)

Timeout: 90 minutes per job.

```bash
# Check status
systemctl status om-mockup-worker-v5

# View logs (live)
journalctl -u om-mockup-worker-v5.service -n 50 -f

# Restart (e.g. after .env changes)
sudo systemctl restart om-mockup-worker-v5
```

### om-mockup-worker-v4 (persistent service — FALLBACK — always running)

Previous production worker. Kept running as fallback. File: `job-mockup-worker-v4.js` | Service: `om-mockup-worker-v4.service`

**Note:** Both v4 and v5 poll the same `/api/cron/claim-mockup-job` endpoint. The first to claim a job processes it. To route all jobs to v5 only, stop v4: `sudo systemctl stop om-mockup-worker-v4`.

```bash
# Check status
systemctl status om-mockup-worker-v4

# View logs (live)
journalctl -u om-mockup-worker-v4.service -n 50 -f

# Stop v4 (if routing all jobs to v5)
sudo systemctl stop om-mockup-worker-v4
sudo systemctl disable om-mockup-worker-v4
```

**Note:** v3 (`om-mockup-worker-v3`) has been stopped and disabled. v2 and v1 were stopped earlier.

**API status (May 2026):** SerpAPI=✓ | DataForSEO=✓ | Perplexity=✓ | GooglePlaces=✓ | Mistral=✓ | Groq=✓ | Pexels=✓ | Brandfetch=✓ | GTmetrix=✓ | Serper=✓ | Unsplash=✓

**Note:** Bing Search (Microsoft) was deprecated from Azure Marketplace and removed. Replaced with Serper.dev (Google Search API) for second-engine competitor research. `SERPER_API_KEY` (OptimisedMarketing key) stored in `.env.pexels`. `SERPER_API_KEY_DEFAULT` (fallback) also stored.

**Google Maps / PageSpeed / Knowledge Graph keys:** All three stored in `/home/ubuntu/om-cron/.env` as `GOOGLE_MAPS_API_KEY`, `GOOGLE_PAGESPEED_API_KEY`, `GOOGLE_KNOWLEDGE_GRAPH_API_KEY`. Key: `AIzaSyAw_kz1SWbzmA6eKgmonugbHG8QLa-rg14` (confirmed active — GooglePlaces=✓ at startup).

**GTmetrix API key:** Stored in `/home/ubuntu/om-cron/.env.pexels`. Key: `3018e27a478d2241c6169b9d4737bd78` (confirmed active — GTmetrix=✓ at startup). Used for deep performance waterfall analysis of client sites.

**Brandfetch API key:** Stored in `/home/ubuntu/om-cron/.env.pexels`. Key: `sohGSIy0gvnykCNh9qTf7hveB-LOqbOC3tHpNwTIKubPqAbJmfp9mHxUDBVK_7mQkfKv5TN4po1bEkoYtgXs-g` (confirmed active — Brandfetch=✓ at startup). Used to fetch official brand colours, fonts, and logo assets for each client domain.

**Pexels key:** Stored in `/home/ubuntu/om-cron/.env.pexels` (loaded by worker alongside `.env`). Key: `jCUo0okykjxNqYtFPkpR2kgdyHAOTws01OS9jateMeI1vlWvYXG0STyD`

**Unsplash Access Key:** Stored in `/home/ubuntu/om-cron/.env.pexels`. App ID: 949549. Key: `_0Ll86-iqpEG9hhzsxC9JdUBLHENxa2gc_qFneCl_Oo` (demo key — production application submitted May 2026 with attribution screenshot). Worker triggers download events + injects photographer attribution into mockup footer.

### manus-webhook-receiver (persistent service — always running)

A standalone Express server (`manus-webhook-receiver.js`) on port **4500** that receives Manus webhook events when website build tasks complete:

- `task_stopped` (finish) — marks websiteOrder as `delivered`, sends client delivery email
- `task_stopped` (ask) — marks websiteOrder as `awaiting_input`, sends admin notification

Webhook ID: `78VNfFkkbuHdEXALyoWJvs` (registered with Manus API, May 2026)
Endpoint: `http://34.52.212.6:4500/manus-webhook`
Firewall: port 4500 open via ufw

```bash
# Check status
systemctl status manus-webhook-receiver

# View logs (live)
journalctl -u manus-webhook-receiver.service -n 50 -f

# Restart
sudo systemctl restart manus-webhook-receiver
```

**Note:** Uses web server as DB proxy (no direct DB credentials on cloud computer). Calls:
- `GET /api/cron/get-order-by-task` — look up order by Manus task ID
- `POST /api/cron/update-order-by-task` — update order status
- `POST /api/cron/send-delivery-email` — send delivery email to client
- `POST /api/cron/notify-admin` — send admin notification

Config: `/home/ubuntu/om-cron/.env`
- `SITE_BASE_URL` — https://optimised.marketing
- `GSC_CREDENTIALS_JSON` — service account key (balmy-coral-488815-k6)
- `GSC_IMPERSONATE_EMAIL` — info@optimised.marketing (domain-wide delegation)
- `SCHEDULED_TASK_COOKIE` — set after each Manus deployment
- `CRON_SECRET_KEY` — matches `CRON_SECRET_KEY` injected into the Manus web server (added May 2026)

### om-rating-followup (timer — every 2 hours)

Calls `POST https://optimised.marketing/api/cron/mockup-rating-followup` to send 48-hour post-delivery rating nudge emails to clients who haven't rated their mockup yet. Script: `job-rating-followup.js`. Added May 2026.

```bash
# Check timer
systemctl status om-rating-followup.timer

# View logs
journalctl -u om-rating-followup.service -n 20

# Manual run
cd /home/ubuntu/om-cron && node job-rating-followup.js
```

## lumibeauty-cron (Oriflame Brand Partner — becomeabrandpartner.com)

Jobs run via systemd timers. Logs in `/home/ubuntu/lumibeauty-cron/logs/`.

| Timer | Schedule | Script | Description |
|---|---|---|---|
| `lumibeauty-drip.timer` | Every 6h (00, 06, 12, 18 UTC) | `run_drip.sh` | Process due drip emails via `/api/scheduled/drip` |
| `lumibeauty-cleanup.timer` | Every Sunday 02:00 UTC | `cleanup-webhook-logs.sh` | Delete `webhook_logs` rows older than 90 days via `/api/scheduled/cleanup-webhook-logs` |

Config: Admin session cookie is embedded directly in each script (JWT, expires 2027). If 401 errors appear, re-generate by running:

```bash
curl -s -c /tmp/lumi-cookies.txt -X POST "https://becomeabrandpartner.com/api/trpc/adminAuth.login" \
  -H "Content-Type: application/json" \
  -d '{"json":{"email":"info@optimised.marketing","password":"<password>"}}'
cat /tmp/lumi-cookies.txt
# Copy the app_session_id value and update COOKIE= in the relevant script
```

```bash
# Check timers
systemctl list-timers --all | grep lumibeauty

# View logs
journalctl -u lumibeauty-drip.service -n 50
journalctl -u lumibeauty-cleanup.service -n 50

# Manual run
cd /home/ubuntu/lumibeauty-cron && bash run_drip.sh
cd /home/ubuntu/lumibeauty-cron && bash cleanup-webhook-logs.sh
```

## collagen-cron (Collagen Club)

Jobs run via systemd timers. Config: `/home/ubuntu/collagen-cron/collagen-blog-config.env`

| Timer | Schedule | Script | Description |
|---|---|---|---|
| `collagen-blog-writer.timer` | Mon + Thu 07:00 UTC | `job-blog-writer.js` | Generate + publish long-form blog post via Claude claude-opus-4-5 |
| `collagen-product-sync.timer` | Daily 03:00 UTC | `job-product-sync.js` | Sync products |
| `collagen-review-sync.timer` | Every 6h | `job-review-sync.js` | Sync reviews |
| `collagen-rank-tracker.timer` | Daily 06:00 UTC | `job-rank-tracker.js` | Track 25 keyword rankings (10 head terms + 15 product-level long-tail) |
| `collagen-gsc-report.timer` | Monday 08:00 UTC | `job-gsc-report.js` | GSC weekly report |
| `collagen-sitemap-audit.timer` | Daily 03:30 UTC | `job-sitemap-audit.js` | Sitemap freshness audit (DB vs sitemap lastmod cross-check) + ping Google & Bing |
| `collagen-seo-enrich.timer` | Sunday 04:00 UTC | `job-seo-enrich.js` | Claude bulk-fills skinConcern, ingredientHighlights, howToUse; YouTube Data API v3 populates videoUrl for products missing these SEO fields |
| ~~`collagen-sitemap-ping.timer`~~ | ~~Daily~~ | ~~`job-sitemap-ping.js`~~ | ~~Replaced by collagen-sitemap-audit.timer~~ |

Config (`collagen-blog-config.env` — loaded by ALL services via `EnvironmentFile` directive):
- `ANTHROPIC_API_KEY` — Claude claude-opus-4-5 API key
- `YOUTUBE_API_KEY` — YouTube Data API v3 key (used by job-seo-enrich.js to populate videoUrl; added May 2026)
- `CRON_SECRET` — `collagen-cron-2026` (matches server default)
- `SCHEDULED_TASK_COOKIE` — set after each Manus deployment (required by all jobs except sitemap-audit)
- `SITE_BASE_URL` — `https://collagen.club`
- Topic state: `/home/ubuntu/collagen-cron/blog-writer-state.json` (16 topics, auto-rotates)
- **Site must be published before first run** (Mon 11 May 2026)

> **Fix applied May 2026:** Four services (product-sync, review-sync, rank-tracker, gsc-report) were missing `EnvironmentFile` directives and failing with `SCHEDULED_TASK_COOKIE is not set`. Fixed by adding `EnvironmentFile=/home/ubuntu/collagen-cron/collagen-blog-config.env` to all service files in both `/etc/systemd/system/` and the `systemd/` template directory.

```bash
# Check all collagen timers
systemctl list-timers --all | grep collagen

# View logs for any service
journalctl -u collagen-blog-writer.service -n 50
journalctl -u collagen-seo-enrich.service -n 50
journalctl -u collagen-sitemap-audit.service -n 50
journalctl -u collagen-product-sync.service -n 50
journalctl -u collagen-rank-tracker.service -n 50

# Manual test runs
cd /home/ubuntu/collagen-cron && node job-blog-writer.js
cd /home/ubuntu/collagen-cron && node job-seo-enrich.js
cd /home/ubuntu/collagen-cron && node job-sitemap-audit.js
```

## Useful Commands

```bash
# Check timers
systemctl list-timers --all | grep om-

# View logs
journalctl -u om-gsc-indexing.service -n 50
journalctl -u om-sitemap-ping.service -n 50

# Manual run
cd /home/ubuntu/om-cron && node job-gsc-indexing.js
cd /home/ubuntu/om-cron && node job-sitemap-ping.js
```

## hubspot-schema (become-a-representative.com)
Scripts for managing JSON-LD schema on the HubSpot site (Portal ID: 49221946).
| File | Description |
|---|---|
| `hubspot_enhanced_location_schema.py` | Injects/upgrades enhanced schema (LocalBusiness, FAQPage, SpeakableSpecification, Article, BreadcrumbList) on all location blog posts |

**Usage:** `cd /home/ubuntu/hubspot-schema && python3 hubspot_enhanced_location_schema.py > run.log 2>&1 &`
The script is idempotent — it skips pages that already have FAQPage schema, so it is safe to re-run to pick up any new posts.
