/**
 * Optimised Marketing — Mockup Worker v5
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * THE WORLD'S MOST ADVANCED FREE WEBSITE MOCKUP PIPELINE
 * Manus-first architecture — Gemini 2.5 Pro does the heavy lifting
 * All other AIs and APIs act as intelligence/refinement tools
 *
 * ── PRE-GENERATION INTELLIGENCE (18 data sources) ────────────────────────────
 * Pre-1:  Python brand analyser v2 — colours, fonts, images, industry detection
 * Pre-2:  Screenshot service scrape — text content, meta, existing site data
 * Pre-3:  SerpAPI — top 10 competitor URLs for this industry + location
 * Pre-4:  Serper.dev (Google Search) — second-engine competitor research
 * Pre-5:  Google Places API — client's Google Business Profile (reviews, hours)
 * Pre-6:  Google PageSpeed Insights — Core Web Vitals + performance scores
 * Pre-7:  Google Knowledge Graph — entity verification
 * Pre-8:  Brandfetch API — brand colours, fonts, logos from brand database
 * Pre-9:  Clearbit Logo API — high-quality logo by domain
 * Pre-10: Wappalyzer API — client's current tech stack detection
 * Pre-11: Companies House API — UK business verification + SIC code
 * Pre-12: Pexels — industry stock photo pool
 * Pre-13: Unsplash — high-quality editorial photos (with attribution)
 * Pre-14: Pixabay — additional stock images
 * Pre-15: Perplexity Sonar Pro — live 2025 market research + conversion tactics
 * Pre-16: Screenshot service — admired sites screenshots
 * Pre-17: DataForSEO On-Page API — deep competitor content analysis
 * Pre-18: GTmetrix API — detailed performance analysis (AWAITED before Pass 1)
 *
 * ── GENERATION PIPELINE (9 passes) ───────────────────────────────────────────
 * Pass 1:  Claude Opus (Project Manager) — master content + copy strategy
 *          [GTmetrix data injected here — awaited before this pass]
 * Pass 2:  Manus Forge / Gemini 2.5 Pro (Master Designer) — full HTML generation
 *          [65,000 token budget — production-quality one-page website]
 * Pass 3:  Claude Opus (UX Auditor) — 18-point UX/CRO critique
 *          [Full HTML passed — no truncation]
 * Pass 4:  Manus Forge (UX Engineer) — enact all UX improvements
 *          [Manus applies its own fixes to its own code — 65,000 tokens]
 * Pass 5:  Claude Opus (Design Critic) — visual design critique
 *          [Full HTML passed — no truncation]
 * Pass 6:  Manus Forge (Master Designer) — enact design improvements
 *          [65,000 token budget]
 * Pass 7:  Claude Opus (Copywriter) — copy polish + readability optimisation
 *          [Produces REPLACE/WITH pairs only]
 * Pass 8:  Manus Forge (Copy Injector) — inject polished copy
 *          [Manus applies copy to its own HTML — 65,000 tokens]
 * Pass 9:  Manus Forge (Master Designer) — definitive final quality pass
 *          [65,000 token budget — Manus signs off its own masterpiece]
 *
 * ── QA SYSTEM (10 checks + remediation) ──────────────────────────────────────
 * QA-1:  Python HTML validator — syntax, structure, DOCTYPE
 * QA-2:  Python placeholder sweep — Lorem ipsum, dummy data detection
 * QA-3:  Python image integrity — real URLs, no placeholders
 * QA-4:  Python font verification — Google Fonts correctly imported
 * QA-5:  Python readability score — Flesch-Kincaid, sentence complexity
 * QA-6:  Python accessibility — contrast ratios, ARIA, viewport meta
 * QA-7:  Claude Opus — UX score (0-100) + conversion audit [full HTML]
 * QA-8:  GPT-4o — copy quality score (0-100) + brand voice audit [full HTML]
 * QA-9:  Gemini 2.5 Pro — visual design score (0-100) + layout audit [full HTML]
 * QA-10: Manus Forge — final verdict + remediation if <85 [65,000 tokens]
 *
 * ── POST-GENERATION ───────────────────────────────────────────────────────────
 * Screenshot → S3 upload → Human review queue → Owner sign-off → Delivery
 *
 * HUMAN SIGN-OFF: Every mockup enters "Awaiting Review" status.
 * Owner receives SMS + email with preview, AI scores, and one-click approve/reject.
 * Delivery email sent ONLY after owner approval.
 *
 * Timeout: 90 minutes per job.
 *
 * v5 KEY CHANGES from v4:
 * - GTmetrix awaited BEFORE Pass 1 (not fire-and-forget)
 * - Pass 2 Manus token budget: 32,000 → 65,000
 * - Pass 4: GPT-4o replaced with Manus Forge (Manus fixes its own code)
 * - Pass 7b (Mistral second-opinion): REMOVED — redundant
 * - Pass 8: Manus Forge replaces GPT-4o as copy injector (65,000 tokens)
 * - Pass 9 Manus token budget: 32,000 → 65,000
 * - QA remediation token budget: 32,000 → 65,000
 * - All critique passes receive FULL HTML (no .substring(0, 25000) truncation)
 * - 1 mockup only — style driven by user's form selection
 */

import dotenv from "dotenv";
import { execSync, spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config({ path: path.join(__dirname, ".env.pexels"), override: false }); // Pexels key (separate file)

// ─── Config ───────────────────────────────────────────────────────────────────
const SITE_BASE_URL = process.env.SITE_BASE_URL || "https://optimised.marketing";
const CRON_SECRET_KEY = process.env.CRON_SECRET_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MANUS_FORGE_API_URL = process.env.BUILT_IN_FORGE_API_URL || "https://api.manus.ai/v1";
const MANUS_FORGE_API_KEY = process.env.BUILT_IN_FORGE_API_KEY;
const SCREENSHOT_API_URL = process.env.SCREENSHOT_API_URL || "http://localhost:4000";
const SCREENSHOT_API_SECRET = process.env.SCREENSHOT_API_SECRET;
const MANUS_API_KEY = process.env.MANUS_API_KEY;
const MANUS_PROJECT_ID = process.env.MANUS_PROJECT_ID;
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY;
const DATAFORSEO_LOGIN = process.env.DATAFORSEO_LOGIN;
const DATAFORSEO_PASSWORD = process.env.DATAFORSEO_PASSWORD;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const BRANDFETCH_API_KEY = process.env.BRANDFETCH_API_KEY;
const GTMETRIX_API_KEY = process.env.GTMETRIX_API_KEY;
const SERPER_API_KEY = process.env.SERPER_API_KEY;
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const GOOGLE_PAGESPEED_API_KEY = process.env.GOOGLE_PAGESPEED_API_KEY;
const GOOGLE_KNOWLEDGE_GRAPH_API_KEY = process.env.GOOGLE_KNOWLEDGE_GRAPH_API_KEY;
const WAPPALYZER_API_KEY = process.env.WAPPALYZER_API_KEY;

const POLL_INTERVAL_MS = 60_000;
const JOB_TIMEOUT_MS = 90 * 60 * 1000; // 90 minutes
const DELAY_NOTIFY_MS = 60 * 60 * 1000; // notify user at 60 min if still running
const QA_PASS_THRESHOLD = 85; // minimum score to approve without remediation
const MAX_QA_LOOPS = 2; // max remediation loops before force-approve

// ─── Logging ──────────────────────────────────────────────────────────────────
const log = (...args) => console.log(`[${new Date().toISOString()}]`, ...args);
const logErr = (label, err) => console.error(`[${new Date().toISOString()}] ERROR ${label}:`, err?.message || err);

// ─── API helpers ──────────────────────────────────────────────────────────────
async function apiPost(path, body) {
  const res = await fetch(`${SITE_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-cron-secret": CRON_SECRET_KEY,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`API ${path} returned ${res.status}`);
  return res.json();
}

async function apiGet(path) {
  const res = await fetch(`${SITE_BASE_URL}${path}`, {
    headers: { "x-cron-secret": CRON_SECRET_KEY },
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`API GET ${path} returned ${res.status}`);
  return res.json();
}

// ─── Claude Opus (Project Manager + QA Orchestrator) ─────────────────────────
async function invokeClaude({ messages, maxTokens = 8000, system = null }) {
  const body = {
    model: "claude-opus-4-5",
    max_tokens: maxTokens,
    messages,
  };
  if (system) body.system = system;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(180_000),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Claude API error ${res.status}: ${errText.substring(0, 200)}`);
  }

  const data = await res.json();
  return data.content?.[0]?.text || "";
}

// ─── Manus Forge / Gemini 2.5 Pro (Master Designer — primary builder) ─────────
async function invokeForge({ messages, maxTokens = 65000, model = "gemini-2.5-pro" }) {
  const res = await fetch(`${MANUS_FORGE_API_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${MANUS_FORGE_API_KEY}`,
    },
    body: JSON.stringify({ model, messages, max_tokens: maxTokens }),
    signal: AbortSignal.timeout(300_000), // 5 min timeout for large outputs
  });

  if (!res.ok) {
    const errText = await res.text();
    // Fallback to flash if pro unavailable
    if (res.status === 404 || res.status === 400) {
      log("Gemini 2.5 Pro unavailable, falling back to Flash...");
      return invokeForge({ messages, maxTokens, model: "gemini-2.5-flash" });
    }
    throw new Error(`Forge API error ${res.status}: ${errText.substring(0, 200)}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content || "";
  return content.replace(/^```html\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "").trim();
}

// ─── GPT-4o (QA copy scorer only — no longer generates HTML) ─────────────────
async function invokeGPT4o({ messages, maxTokens = 1000 }) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ model: "gpt-4o", messages, max_tokens: maxTokens }),
    signal: AbortSignal.timeout(60_000),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI API error ${res.status}: ${errText.substring(0, 200)}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content || "";
  return content.replace(/^```html\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "").trim();
}

// ─── Mistral Large (kept for potential future use, not used in main pipeline) ──
async function invokeMistral({ messages, maxTokens = 4000 }) {
  if (!MISTRAL_API_KEY) return null;
  try {
    const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({ model: "mistral-large-latest", messages, max_tokens: maxTokens }),
      signal: AbortSignal.timeout(60_000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (e) {
    log("Mistral unavailable (non-fatal):", e.message);
    return null;
  }
}

// ─── Groq / Llama 3.3 70B (Ultra-fast structural validator) ──────────────────
async function invokeGroq({ messages, maxTokens = 2000 }) {
  if (!GROQ_API_KEY) return null;
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({ model: "llama-3.3-70b-versatile", messages, max_tokens: maxTokens }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (e) {
    log("Groq unavailable (non-fatal):", e.message);
    return null;
  }
}

// ─── Perplexity Sonar Pro (Live market research) ──────────────────────────────
async function invokePerplexity({ query }) {
  if (!PERPLEXITY_API_KEY) return null;
  try {
    const res = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${PERPLEXITY_API_KEY}`,
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          { role: "system", content: "You are a market research expert. Provide concise, actionable insights with specific data points." },
          { role: "user", content: query },
        ],
        max_tokens: 2000,
      }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (e) {
    log("Perplexity unavailable (non-fatal):", e.message);
    return null;
  }
}

// ─── SerpAPI (Competitor research) ───────────────────────────────────────────
async function searchCompetitors(industry, location = "UK") {
  if (!SERPAPI_API_KEY) return [];
  try {
    const query = encodeURIComponent(`best ${industry} company website ${location}`);
    const res = await fetch(
      `https://serpapi.com/search.json?q=${query}&api_key=${SERPAPI_API_KEY}&num=10&gl=gb&hl=en`,
      { signal: AbortSignal.timeout(15_000) }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.organic_results || [])
      .slice(0, 6)
      .map(r => ({ url: r.link, title: r.title, snippet: r.snippet }))
      .filter(r => r.url && !r.url.includes("wikipedia") && !r.url.includes("youtube"));
  } catch (e) {
    log("SerpAPI unavailable (non-fatal):", e.message);
    return [];
  }
}

// ─── Serper Web Search (Second-engine competitor research) ───────────────────
async function serperSearchCompetitors(industry, location = "UK") {
  if (!SERPER_API_KEY) return [];
  try {
    const query = `top ${industry} companies website design ${location} 2025`;
    const res = await fetch(
      `https://google.serper.dev/search`,
      {
        method: "POST",
        headers: {
          "X-API-KEY": SERPER_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ q: query, num: 5, gl: "gb" }),
        signal: AbortSignal.timeout(15_000),
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.organic || [])
      .slice(0, 5)
      .map(r => ({ url: r.link, title: r.title, snippet: r.snippet }));
  } catch (e) {
    log("Serper search unavailable (non-fatal):", e.message);
    return [];
  }
}

// ─── DataForSEO On-Page API (Deep competitor analysis) ────────────────────────
async function analyseCompetitorWithDataForSEO(url) {
  if (!DATAFORSEO_LOGIN || !DATAFORSEO_PASSWORD) return null;
  try {
    const auth = Buffer.from(`${DATAFORSEO_LOGIN}:${DATAFORSEO_PASSWORD}`).toString("base64");
    const res = await fetch("https://api.dataforseo.com/v3/on_page/instant_pages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${auth}`,
      },
      body: JSON.stringify([{ url, load_resources: false, enable_javascript: false }]),
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const item = data.tasks?.[0]?.result?.[0]?.items?.[0];
    if (!item) return null;
    return {
      title: item.meta?.title || "",
      description: item.meta?.description || "",
      h1: item.meta?.htags?.h1?.[0] || "",
      h2s: (item.meta?.htags?.h2 || []).slice(0, 5),
      wordCount: item.statistics?.words_count || 0,
      internalLinks: item.statistics?.links_internal || 0,
      images: item.statistics?.images_count || 0,
      hasSchema: item.checks?.has_micromarkup || false,
      hasFaq: item.checks?.has_micromarkup_faq || false,
    };
  } catch (e) {
    log("DataForSEO unavailable (non-fatal):", e.message);
    return null;
  }
}

// ─── Google Places API (Business profile) ────────────────────────────────────
async function getGoogleBusinessProfile(businessName, website) {
  if (!GOOGLE_MAPS_API_KEY) return null;
  try {
    const query = encodeURIComponent(businessName);
    const findRes = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=place_id,name,formatted_address,rating,user_ratings_total,types&key=${GOOGLE_MAPS_API_KEY}`,
      { signal: AbortSignal.timeout(10_000) }
    );
    if (!findRes.ok) return null;
    const findData = await findRes.json();
    const placeId = findData.candidates?.[0]?.place_id;
    if (!placeId) return null;

    const detailRes = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,rating,user_ratings_total,reviews,opening_hours,photos,types,website&key=${GOOGLE_MAPS_API_KEY}`,
      { signal: AbortSignal.timeout(10_000) }
    );
    if (!detailRes.ok) return null;
    const detailData = await detailRes.json();
    const place = detailData.result;
    if (!place) return null;

    return {
      name: place.name,
      address: place.formatted_address,
      phone: place.formatted_phone_number,
      rating: place.rating,
      reviewCount: place.user_ratings_total,
      reviews: (place.reviews || []).slice(0, 3).map(r => ({
        text: r.text?.substring(0, 200),
        rating: r.rating,
        author: r.author_name,
      })),
      openingHours: place.opening_hours?.weekday_text || [],
      types: place.types || [],
    };
  } catch (e) {
    log("Google Places unavailable (non-fatal):", e.message);
    return null;
  }
}

// ─── Google PageSpeed Insights (Current site performance) ────────────────────
async function getPageSpeedInsights(url) {
  if (!url) return null;
  try {
    const apiKey = GOOGLE_PAGESPEED_API_KEY ? `&key=${GOOGLE_PAGESPEED_API_KEY}` : "";
    const res = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile${apiKey}`,
      { signal: AbortSignal.timeout(30_000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const cats = data.lighthouseResult?.categories;
    return {
      performance: Math.round((cats?.performance?.score || 0) * 100),
      accessibility: Math.round((cats?.accessibility?.score || 0) * 100),
      seo: Math.round((cats?.seo?.score || 0) * 100),
      bestPractices: Math.round((cats?.["best-practices"]?.score || 0) * 100),
      lcp: data.lighthouseResult?.audits?.["largest-contentful-paint"]?.displayValue || "unknown",
      cls: data.lighthouseResult?.audits?.["cumulative-layout-shift"]?.displayValue || "unknown",
      fid: data.lighthouseResult?.audits?.["total-blocking-time"]?.displayValue || "unknown",
    };
  } catch (e) {
    log("PageSpeed Insights unavailable (non-fatal):", e.message);
    return null;
  }
}

// ─── Google Knowledge Graph (Entity verification) ─────────────────────────────
async function getKnowledgeGraphData(businessName) {
  if (!GOOGLE_KNOWLEDGE_GRAPH_API_KEY) return null;
  try {
    const query = encodeURIComponent(businessName);
    const res = await fetch(
      `https://kgsearch.googleapis.com/v1/entities:search?query=${query}&key=${GOOGLE_KNOWLEDGE_GRAPH_API_KEY}&limit=1&types=LocalBusiness,Organization`,
      { signal: AbortSignal.timeout(10_000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const entity = data.itemListElement?.[0]?.result;
    if (!entity) return null;
    return {
      name: entity.name,
      description: entity.description,
      detailedDescription: entity.detailedDescription?.articleBody,
      types: entity["@type"] || [],
    };
  } catch (e) {
    return null;
  }
}

// ─── Brandfetch API (Brand assets) ───────────────────────────────────────────
async function getBrandfetchData(domain) {
  if (!BRANDFETCH_API_KEY || !domain) return null;
  try {
    const cleanDomain = domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    const res = await fetch(`https://api.brandfetch.io/v2/brands/${cleanDomain}`, {
      headers: { "Authorization": `Bearer ${BRANDFETCH_API_KEY}` },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      name: data.name,
      description: data.description,
      colors: (data.colors || []).map(c => c.hex).filter(Boolean).slice(0, 5),
      fonts: (data.fonts || []).map(f => f.name).filter(Boolean).slice(0, 3),
      logoUrl: data.logos?.[0]?.formats?.find(f => f.format === "svg")?.src ||
               data.logos?.[0]?.formats?.find(f => f.format === "png")?.src || null,
    };
  } catch (e) {
    log("Brandfetch unavailable (non-fatal):", e.message);
    return null;
  }
}

// ─── Clearbit Logo API (High-quality logo) ────────────────────────────────────
async function getClearbitLogo(domain) {
  if (!domain) return null;
  try {
    const cleanDomain = domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    const url = `https://logo.clearbit.com/${cleanDomain}`;
    const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(5_000) });
    if (res.ok) return url;
    return null;
  } catch (e) {
    return null;
  }
}

// ─── Wappalyzer API (Tech stack detection) ───────────────────────────────────
async function getWappalyzerData(url) {
  if (!WAPPALYZER_API_KEY || !url) return null;
  try {
    const res = await fetch(
      `https://api.wappalyzer.com/v2/lookup/?urls=${encodeURIComponent(url)}`,
      {
        headers: { "x-api-key": WAPPALYZER_API_KEY },
        signal: AbortSignal.timeout(15_000),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const techs = data[0]?.technologies || [];
    return {
      cms: techs.find(t => t.categories?.some(c => c.name === "CMS"))?.name || null,
      framework: techs.find(t => t.categories?.some(c => c.name === "JavaScript frameworks"))?.name || null,
      analytics: techs.filter(t => t.categories?.some(c => c.name === "Analytics")).map(t => t.name),
      all: techs.map(t => t.name).slice(0, 10),
    };
  } catch (e) {
    return null;
  }
}

// ─── Companies House API (UK business verification) ──────────────────────────
async function getCompaniesHouseData(businessName) {
  try {
    const query = encodeURIComponent(businessName.substring(0, 50));
    const res = await fetch(
      `https://api.company-information.service.gov.uk/search/companies?q=${query}&items_per_page=1`,
      {
        headers: { "Authorization": `Basic ${Buffer.from(":").toString("base64")}` },
        signal: AbortSignal.timeout(10_000),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const company = data.items?.[0];
    if (!company) return null;
    return {
      name: company.title,
      number: company.company_number,
      status: company.company_status,
      type: company.company_type,
      incorporatedOn: company.date_of_creation,
      sicCode: company.sic_codes?.[0] || null,
      address: company.registered_office_address?.address_line_1 || null,
    };
  } catch (e) {
    return null;
  }
}

// ─── GTmetrix API (Performance analysis) ──────────────────────────────────────
async function getGTmetrixData(url) {
  if (!GTMETRIX_API_KEY || !url) return null;
  try {
    const startRes = await fetch("https://gtmetrix.com/api/2.0/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.api+json",
        "Authorization": `Basic ${Buffer.from(`${GTMETRIX_API_KEY}:`).toString("base64")}`,
      },
      body: JSON.stringify({
        data: {
          type: "test",
          attributes: { url, location: 1, browser: 3 }, // London, Chrome
        },
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!startRes.ok) return null;
    const startData = await startRes.json();
    const testId = startData.data?.id;
    if (!testId) return null;

    // Poll for result (max 45s)
    for (let i = 0; i < 9; i++) {
      await new Promise(r => setTimeout(r, 5000));
      const pollRes = await fetch(`https://gtmetrix.com/api/2.0/tests/${testId}`, {
        headers: { "Authorization": `Basic ${Buffer.from(`${GTMETRIX_API_KEY}:`).toString("base64")}` },
        signal: AbortSignal.timeout(10_000),
      });
      if (!pollRes.ok) continue;
      const pollData = await pollRes.json();
      const attrs = pollData.data?.attributes;
      if (attrs?.state === "completed") {
        return {
          gtmetrixGrade: attrs.gtmetrix_grade,
          performanceScore: attrs.performance_score,
          structureScore: attrs.structure_score,
          fullyLoadedTime: attrs.fully_loaded_time,
          totalPageSize: attrs.page_bytes,
          requestCount: attrs.page_elements,
        };
      }
    }
    return null;
  } catch (e) {
    log("GTmetrix unavailable (non-fatal):", e.message);
    return null;
  }
}

// ─── Pexels API (Industry stock photos) ──────────────────────────────────────
async function getPexelsImages(industry, count = 8) {
  if (!PEXELS_API_KEY) return [];
  try {
    const query = encodeURIComponent(`${industry} professional business`);
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=${count}&orientation=landscape`,
      {
        headers: { "Authorization": PEXELS_API_KEY },
        signal: AbortSignal.timeout(10_000),
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.photos || []).map(p => p.src?.large2x || p.src?.large || p.src?.original).filter(Boolean);
  } catch (e) {
    return [];
  }
}

// ─── Unsplash API (High-quality editorial photos) ────────────────────────────
// Returns objects with { url, downloadLocation, photographerName, photographerUrl }
// for attribution compliance (Unsplash API guidelines require hotlinking + attribution)
async function getUnsplashImages(industry, count = 5) {
  if (!UNSPLASH_ACCESS_KEY) return [];
  try {
    const query = encodeURIComponent(`${industry} business professional`);
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=${count}&orientation=landscape`,
      {
        headers: { "Authorization": `Client-ID ${UNSPLASH_ACCESS_KEY}` },
        signal: AbortSignal.timeout(10_000),
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).map(p => ({
      url: p.urls?.regular || p.urls?.full,
      downloadLocation: p.links?.download_location, // required by Unsplash guidelines
      photographerName: p.user?.name || "Unsplash Photographer",
      photographerUrl: p.user?.links?.html || "https://unsplash.com",
    })).filter(p => p.url);
  } catch (e) {
    return [];
  }
}

// Trigger Unsplash download event (required by Unsplash API guidelines when a photo is used)
async function triggerUnsplashDownload(downloadLocation) {
  if (!UNSPLASH_ACCESS_KEY || !downloadLocation) return;
  try {
    await fetch(downloadLocation, {
      headers: { "Authorization": `Client-ID ${UNSPLASH_ACCESS_KEY}` },
      signal: AbortSignal.timeout(5_000),
    });
  } catch (e) {
    // Non-fatal — attribution still works without the download trigger
  }
}

// ─── Pixabay API (Vectors and illustrations) ──────────────────────────────────
async function getPixabayImages(industry, count = 5) {
  try {
    const query = encodeURIComponent(`${industry} professional`);
    const res = await fetch(
      `https://pixabay.com/api/?q=${query}&image_type=photo&orientation=horizontal&per_page=${count}&safesearch=true`,
      { signal: AbortSignal.timeout(10_000) }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.hits || []).map(h => h.largeImageURL || h.webformatURL).filter(Boolean);
  } catch (e) {
    return [];
  }
}

// ─── Python brand analysis v2 ────────────────────────────────────────────────
function runPythonAnalysis(websiteUrl, admiredSites = []) {
  try {
    const args = [
      path.join(__dirname, "analyse-brand-v2.py"),
      websiteUrl,
      "--screenshot-service", SCREENSHOT_API_URL,
      "--screenshot-secret", SCREENSHOT_API_SECRET || "",
    ];
    if (admiredSites.length > 0) {
      args.push("--admired", admiredSites.join(","));
    }
    const result = spawnSync("python3", args, {
      timeout: 90_000,
      encoding: "utf8",
      cwd: __dirname,
    });
    if (result.error) {
      log("Python v2 analysis error:", result.error.message);
      return runPythonAnalysisV1(websiteUrl, admiredSites);
    }
    if (result.stdout) {
      try {
        return JSON.parse(result.stdout);
      } catch {
        return runPythonAnalysisV1(websiteUrl, admiredSites);
      }
    }
    return null;
  } catch (e) {
    log("Python v2 analysis failed (non-fatal):", e.message);
    return null;
  }
}

function runPythonAnalysisV1(websiteUrl, admiredSites = []) {
  try {
    const args = [
      path.join(__dirname, "analyse-brand.py"),
      websiteUrl,
      "--screenshot-service", SCREENSHOT_API_URL,
      "--screenshot-secret", SCREENSHOT_API_SECRET || "",
    ];
    if (admiredSites.length > 0) {
      args.push("--admired", admiredSites.join(","));
    }
    const result = spawnSync("python3", args, {
      timeout: 60_000,
      encoding: "utf8",
      cwd: __dirname,
    });
    if (result.stdout) return JSON.parse(result.stdout);
    return null;
  } catch (e) {
    return null;
  }
}

// ─── Python QA checks ─────────────────────────────────────────────────────────
function runPythonQA(html) {
  try {
    const tmpFile = `/tmp/mockup_qa_${Date.now()}.html`;
    require("fs").writeFileSync(tmpFile, html, "utf8");
    const result = spawnSync("python3", [path.join(__dirname, "qa-checks.py"), tmpFile], {
      timeout: 30_000,
      encoding: "utf8",
      cwd: __dirname,
    });
    try { require("fs").unlinkSync(tmpFile); } catch {}
    if (result.stdout) return JSON.parse(result.stdout);
    return null;
  } catch (e) {
    log("Python QA checks failed (non-fatal):", e.message);
    return null;
  }
}

// ─── Screenshot helpers ───────────────────────────────────────────────────────
async function screenshotUrl(url, fullPage = false) {
  try {
    const res = await fetch(`${SCREENSHOT_API_URL}/screenshot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-secret": SCREENSHOT_API_SECRET,
      },
      body: JSON.stringify({ url, width: 1440, height: 900, fullPage, format: "jpeg", quality: 85 }),
      signal: AbortSignal.timeout(45_000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url || data.screenshotUrl || data.imageUrl || null;
  } catch (e) {
    return null;
  }
}

async function scrapeWebsite(url) {
  try {
    const res = await fetch(`${SCREENSHOT_API_URL}/scrape`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-secret": SCREENSHOT_API_SECRET,
      },
      body: JSON.stringify({ url }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

// ─── Style helpers ────────────────────────────────────────────────────────────
function getStyleLabel(styleId) {
  const labels = {
    "modern-minimal": "Modern & Minimal",
    "bold-impactful": "Bold & Impactful",
    "corporate-professional": "Corporate & Professional",
    "creative-vibrant": "Creative & Vibrant",
    "luxury-premium": "Luxury & Premium",
    "current-brand": "Current Brand Style",
    "tech-forward": "Tech-Forward",
    "warm-friendly": "Warm & Friendly",
  };
  return labels[styleId] || "Premium Homepage";
}

function getStyleInstructions(styleId) {
  const styles = {
    "modern-minimal": `DESIGN STYLE: Modern & Minimal
- Clean whitespace, generous padding, subtle shadows
- Monochromatic or two-tone palette with one accent colour
- Sans-serif typography (Inter, Poppins, or similar)
- Thin borders, minimal decoration
- Large hero with single focused CTA`,
    "bold-impactful": `DESIGN STYLE: Bold & Impactful
- High contrast, strong typography, dramatic hero
- Bold colour blocking, full-bleed sections
- Large display fonts (700-900 weight)
- Energetic, confident tone
- Multiple strong CTAs throughout`,
    "corporate-professional": `DESIGN STYLE: Corporate & Professional
- Navy/grey/white palette with gold or blue accents
- Structured grid layout, clear hierarchy
- Professional serif or semi-serif headings
- Trust signals prominent (certifications, years in business, client logos)
- Conservative, authoritative tone`,
    "creative-vibrant": `DESIGN STYLE: Creative & Vibrant
- Bold colour palette, gradients, playful elements
- Asymmetric layouts, overlapping elements
- Mixed typography, creative section breaks
- Energetic animations and micro-interactions
- Personality-driven copy`,
    "luxury-premium": `DESIGN STYLE: Luxury & Premium
- Dark background (near-black or deep navy)
- Gold/champagne/cream accents
- Elegant serif typography (Playfair Display, Cormorant)
- Generous whitespace, understated elegance
- High-quality imagery, no clutter
- Sophisticated, exclusive tone`,
    "current-brand": `DESIGN STYLE: Match Current Brand
- Replicate the client's existing colour palette exactly
- Match their typography style and overall aesthetic
- Evolve rather than replace — keep what works, improve what doesn't
- Maintain brand consistency throughout`,
    "tech-forward": `DESIGN STYLE: Tech-Forward
- Dark mode preferred, neon/electric accents
- Geometric shapes, grid overlays, subtle animations
- Monospace or geometric sans-serif fonts
- Data visualisation elements, progress bars
- Innovation-focused copy`,
    "warm-friendly": `DESIGN STYLE: Warm & Friendly
- Warm palette (oranges, yellows, earth tones)
- Rounded corners, soft shadows
- Approachable sans-serif fonts
- Human photography, community feel
- Conversational, inclusive tone`,
  };
  return styles[styleId] || styles["modern-minimal"];
}

// ─── HTML validation ──────────────────────────────────────────────────────────
function isValidHtml(html, minLength = 8000) {
  if (!html || typeof html !== "string") return false;
  const clean = html.trim();
  return (
    clean.length >= minLength &&
    clean.toLowerCase().includes("<!doctype") &&
    clean.toLowerCase().includes("</html>") &&
    !/i('m| am) sorry|i can'?t (assist|help)|i'?m unable|cannot (assist|help|create|generate)/i.test(clean.substring(0, 500))
  );
}

function cleanHtml(html) {
  return html
    .replace(/^```html\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
}

// ─── Main generation function ─────────────────────────────────────────────────
async function generateMockup(req, jobStartTime, requestId) {
  const startTime = Date.now();
  let delayNotified = false;

  const checkDelayNotify = async () => {
    if (!delayNotified && (Date.now() - jobStartTime) > DELAY_NOTIFY_MS) {
      delayNotified = true;
      log(`Job running >60min — sending delay notification...`);
      try {
        await apiPost("/api/cron/mockup-delay-notify", { requestId });
      } catch (e) {
        logErr("Delay notification failed (non-fatal)", e);
      }
    }
  };

  const admiredSiteUrls = req.websiteLikes
    ? req.websiteLikes.split(/[,\n]+/).map(s => s.trim()).filter(Boolean)
    : [];

  // ═══════════════════════════════════════════════════════════════════════════
  // PRE-GENERATION INTELLIGENCE — 15 data sources running in parallel
  // (GTmetrix runs separately and is AWAITED before Pass 1)
  // ═══════════════════════════════════════════════════════════════════════════
  log("═══ PRE-GENERATION INTELLIGENCE ═══");

  const [
    pythonData,
    scraped_raw,
    serpCompetitors,
    serperCompetitors,
    googleProfile,
    pageSpeedData,
    knowledgeGraphData,
    brandfetchData,
    clearbitLogo,
    wappalyzerData,
    companiesHouseData,
    pexelsImages,
    unsplashImages,
    pixabayImages,
    perplexityResearch,
  ] = await Promise.allSettled([
    // Pre-1: Python brand analysis v2
    req.website ? Promise.resolve(runPythonAnalysis(req.website, admiredSiteUrls.slice(0, 3))) : Promise.resolve(null),
    // Pre-2: Screenshot service scrape
    req.website ? scrapeWebsite(req.website) : Promise.resolve(null),
    // Pre-3: SerpAPI competitor research
    searchCompetitors(req.industry || "business", "UK"),
    // Pre-4: Serper competitor research
    serperSearchCompetitors(req.industry || "business", "UK"),
    // Pre-5: Google Places
    getGoogleBusinessProfile(req.businessName || req.name, req.website),
    // Pre-6: Google PageSpeed
    req.website ? getPageSpeedInsights(req.website) : Promise.resolve(null),
    // Pre-7: Google Knowledge Graph
    getKnowledgeGraphData(req.businessName || req.name),
    // Pre-8: Brandfetch
    req.website ? getBrandfetchData(req.website) : Promise.resolve(null),
    // Pre-9: Clearbit Logo
    req.website ? getClearbitLogo(req.website) : Promise.resolve(null),
    // Pre-10: Wappalyzer
    req.website ? getWappalyzerData(req.website) : Promise.resolve(null),
    // Pre-11: Companies House
    getCompaniesHouseData(req.businessName || req.name),
    // Pre-12: Pexels images
    getPexelsImages(req.industry || "business", 8),
    // Pre-13: Unsplash images
    getUnsplashImages(req.industry || "business", 5),
    // Pre-14: Pixabay images
    getPixabayImages(req.industry || "business", 5),
    // Pre-15: Perplexity market research
    invokePerplexity({
      query: `What are the top conversion tactics, trust signals, and design patterns used by the best ${req.industry || "business"} company websites in the UK in 2025? What do customers look for? What makes these websites convert well? Give specific, actionable insights with data.`,
    }),
  ]).then(results => results.map(r => r.status === "fulfilled" ? r.value : null));

  const scraped = scraped_raw || { images: [], colours: [], fonts: [], title: "", description: "", textContent: "", logoUrl: null };

  // Log what we got
  if (pythonData?.mainSite) {
    log(`Pre-1 Python: industry=${pythonData.mainSite.detectedIndustry}, images=${pythonData.mainSite.images?.length || 0}, fonts=${pythonData.mainSite.fonts?.length || 0}`);
  }
  log(`Pre-3 SerpAPI: ${serpCompetitors?.length || 0} competitors`);
  log(`Pre-4 Serper: ${serperCompetitors?.length || 0} competitors`);
  log(`Pre-5 Google Places: ${googleProfile ? `${googleProfile.rating}★ (${googleProfile.reviewCount} reviews)` : "not found"}`);
  log(`Pre-6 PageSpeed: ${pageSpeedData ? `perf=${pageSpeedData.performance}, seo=${pageSpeedData.seo}` : "not available"}`);
  log(`Pre-8 Brandfetch: ${brandfetchData ? `${brandfetchData.colors?.length || 0} colors, ${brandfetchData.fonts?.length || 0} fonts` : "not found"}`);
  log(`Pre-9 Clearbit Logo: ${clearbitLogo || "not found"}`);
  log(`Pre-10 Wappalyzer: ${wappalyzerData?.cms || wappalyzerData?.framework || "not detected"}`);
  log(`Pre-11 Companies House: ${companiesHouseData?.name || "not found"}`);
  log(`Pre-12/13/14 Stock photos: ${(pexelsImages?.length || 0) + (unsplashImages?.length || 0) + (pixabayImages?.length || 0)} total`);
  log(`Pre-15 Perplexity: ${perplexityResearch ? `${perplexityResearch.length} chars` : "not available"}`);

  // Run DataForSEO on top 2 competitors (sequential, after we have SerpAPI results)
  let competitorAnalyses = [];
  const topCompetitorUrls = [...(serpCompetitors || []), ...(serperCompetitors || [])]
    .filter(c => c.url)
    .slice(0, 2)
    .map(c => c.url);

  for (const url of topCompetitorUrls) {
    log(`Pre-17 DataForSEO: analysing ${url}...`);
    const analysis = await analyseCompetitorWithDataForSEO(url);
    if (analysis) {
      competitorAnalyses.push({ url, ...analysis });
      log(`DataForSEO: ${url} — h1="${analysis.h1}", words=${analysis.wordCount}`);
    }
  }

  // Screenshot admired sites
  log("Pre-16: Screenshotting admired sites...");
  const admiredScreenshots = [];
  for (const siteUrl of admiredSiteUrls.slice(0, 3)) {
    const url = siteUrl.startsWith("http") ? siteUrl : "https://" + siteUrl;
    const shot = await screenshotUrl(url, false);
    if (shot) {
      admiredScreenshots.push({ url, screenshotUrl: shot });
      log(`Admired site screenshot: ${url}`);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PRE-18: GTmetrix — AWAITED before Pass 1 (v5 change: was fire-and-forget)
  // ═══════════════════════════════════════════════════════════════════════════
  let gtmetrixData = null;
  if (req.website && GTMETRIX_API_KEY) {
    log("Pre-18: GTmetrix analysis (awaited — required for Pass 1 brief)...");
    try {
      gtmetrixData = await getGTmetrixData(req.website);
      if (gtmetrixData) {
        log(`Pre-18 GTmetrix: grade=${gtmetrixData.gtmetrixGrade}, perf=${gtmetrixData.performanceScore}`);
      } else {
        log("Pre-18 GTmetrix: no data returned (non-fatal)");
      }
    } catch (e) {
      log("Pre-18 GTmetrix failed (non-fatal):", e.message);
    }
  }

  await checkDelayNotify();

  // ═══════════════════════════════════════════════════════════════════════════
  // BUILD INTELLIGENCE PACKAGE
  // ═══════════════════════════════════════════════════════════════════════════

  // Determine business name
  let displayName = req.name;
  if (req.businessName?.trim()) displayName = req.businessName.trim();
  else if (brandfetchData?.name) displayName = brandfetchData.name;
  else if (pythonData?.mainSite?.title?.trim()) {
    const cleanTitle = pythonData.mainSite.title.trim()
      .replace(/\s*[|\-–—:]{1,2}\s*(home|homepage|welcome|services|about|contact|main).*$/i, "")
      .trim();
    if (cleanTitle.length > 2 && cleanTitle.length < 80) displayName = cleanTitle;
  } else if (scraped.title?.trim()) {
    const cleanTitle = scraped.title.trim()
      .replace(/\s*[|\-–—:]{1,2}\s*(home|homepage|welcome|services|about|contact|main).*$/i, "")
      .trim();
    if (cleanTitle.length > 2 && cleanTitle.length < 80) displayName = cleanTitle;
  }

  // Determine industry
  const detectedIndustry = pythonData?.mainSite?.detectedIndustry || req.industry || "business";

  // Build comprehensive colour palette (priority: Brandfetch > Python > Scrape > Brief)
  const allColours = [
    ...(brandfetchData?.colors || []),
    ...(pythonData?.mainSite?.colours || []),
    ...(scraped.colours || []),
  ].filter(Boolean);
  const uniqueColours = [...new Set(allColours)].slice(0, 6);

  let colourBlock = "";
  if (uniqueColours.length > 0) {
    colourBlock = `BRAND COLOURS (extracted from live brand data — MANDATORY):
Primary: ${uniqueColours[0] || "#1a1a2e"}
Secondary: ${uniqueColours[1] || "#16213e"}
Accent: ${uniqueColours[2] || "#0f3460"}
${uniqueColours.slice(3).map((c, i) => `Additional ${i + 4}: ${c}`).join("\n")}
CRITICAL: Use these exact hex values throughout. Override all style defaults.
Ensure WCAG AA contrast (4.5:1 minimum) for all text on coloured backgrounds.`;
  } else if (req.brandColours) {
    colourBlock = `BRAND COLOURS (from client brief — MANDATORY):\n${req.brandColours}`;
  }

  // Build font stack (priority: Brandfetch > Python > Scrape > Brief)
  const allFonts = [
    ...(brandfetchData?.fonts || []),
    ...(pythonData?.mainSite?.fonts || []),
    ...(scraped.fonts || []),
    ...(req.detectedFontsStr ? [req.detectedFontsStr] : []),
  ].filter(Boolean);
  const uniqueFonts = [...new Set(allFonts)].slice(0, 3);
  const fontBlock = uniqueFonts.length > 0
    ? `DETECTED FONTS: ${uniqueFonts.join(", ")}\nImport via Google Fonts CDN. Use for headings and body text to match their brand.`
    : "";

  // Build logo URL (priority: Brandfetch > Clearbit > Python > Scrape)
  const logoUrl = brandfetchData?.logoUrl || clearbitLogo || pythonData?.mainSite?.logoUrl || scraped.logoUrl || null;
  const logoHtml = logoUrl
    ? `<img src="${logoUrl}" alt="${displayName} logo" class="h-10 w-auto" onerror="this.style.display='none';this.nextSibling.style.display='block'"><span style="display:none" class="text-xl font-bold">${displayName}</span>`
    : `<span class="text-xl font-bold">${displayName}</span>`;

  // Build image pool (priority: client site > Pexels > Unsplash > Pixabay)
  const logoKeywords = ["logo", "icon", "favicon", "stamp", "badge", "seal", "brand", "watermark", "sprite"];
  const isLikelyLogo = (url) => {
    if (!url) return true;
    const lower = url.toLowerCase();
    return logoKeywords.some(kw => lower.includes(kw)) || lower.endsWith(".svg");
  };

  let imagePool = [];
  for (const img of [...(scraped.images || []), ...(pythonData?.mainSite?.images || [])]) {
    if (!isLikelyLogo(img) && img !== logoUrl && !imagePool.includes(img)) {
      imagePool.push(img);
    }
  }
  const unsplashPhotoObjects = (unsplashImages || []).filter(p => p && typeof p === "object" && p.url);
  const unsplashUrls = unsplashPhotoObjects.map(p => p.url);
  const stockPhotos = [
    ...(pexelsImages || []),
    ...unsplashUrls,
    ...(pixabayImages || []),
  ];
  if (imagePool.length < 5) imagePool = [...imagePool, ...stockPhotos];

  // Trigger Unsplash download events for compliance (non-blocking)
  for (const photo of unsplashPhotoObjects) {
    triggerUnsplashDownload(photo.downloadLocation);
  }

  // Build Unsplash attribution block (injected into mockup footer)
  const unsplashAttributionHtml = unsplashPhotoObjects.length > 0
    ? `<div style="font-size:10px;color:#999;text-align:center;padding:8px 0;border-top:1px solid #eee;margin-top:16px">
  Photos: ${unsplashPhotoObjects.map(p =>
    `<a href="${p.photographerUrl}?utm_source=optimised_marketing&utm_medium=referral" target="_blank" rel="noopener" style="color:#999">${p.photographerName}</a> on <a href="https://unsplash.com?utm_source=optimised_marketing&utm_medium=referral" target="_blank" rel="noopener" style="color:#999">Unsplash</a>`
  ).join(" &middot; ")}
</div>`
    : "";

  const heroImage = imagePool[0] || stockPhotos[0] || "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1200";
  log(`Image pool: ${imagePool.length} images. Hero: ${heroImage.substring(0, 80)}`);
  log(`Logo: ${logoUrl || "text fallback"}`);

  // Build competitor intelligence block
  const allCompetitors = [...(serpCompetitors || []), ...(serperCompetitors || [])];
  const competitorBlock = allCompetitors.length > 0
    ? `COMPETITOR INTELLIGENCE (${allCompetitors.length} competitors analysed):
${allCompetitors.slice(0, 5).map((c, i) => `${i + 1}. ${c.title || c.url}: ${c.snippet || ""}`).join("\n")}
${competitorAnalyses.length > 0 ? `\nDEEP COMPETITOR ANALYSIS (DataForSEO):\n${competitorAnalyses.map(c => `${c.url}: H1="${c.h1}", ${c.wordCount} words, schema=${c.hasSchema}`).join("\n")}` : ""}`
    : "";

  // Build Google Business Profile block
  const googleProfileBlock = googleProfile
    ? `GOOGLE BUSINESS PROFILE:
Rating: ${googleProfile.rating}★ (${googleProfile.reviewCount} reviews)
Address: ${googleProfile.address || "not found"}
Phone: ${googleProfile.phone || "not found"}
${googleProfile.reviews?.length > 0 ? `Real Reviews:\n${googleProfile.reviews.map(r => `"${r.text}" — ${r.author} (${r.rating}★)`).join("\n")}` : ""}`
    : "";

  // Build performance context block
  const performanceBlock = pageSpeedData
    ? `CURRENT SITE PERFORMANCE (Google PageSpeed):
Performance: ${pageSpeedData.performance}/100
Accessibility: ${pageSpeedData.accessibility}/100
SEO: ${pageSpeedData.seo}/100
Best Practices: ${pageSpeedData.bestPractices}/100
LCP: ${pageSpeedData.lcp} | CLS: ${pageSpeedData.cls}
NOTE: The new mockup must visually demonstrate a massive improvement over these scores.`
    : "";

  // Build admired sites block
  let admiredBlock = "";
  if (admiredSiteUrls.length > 0) {
    const primary = admiredSiteUrls[0];
    const others = admiredSiteUrls.slice(1);
    const notes = req.websiteLikesNotes || "";
    admiredBlock = `ADMIRED WEBSITES — CRITICAL DESIGN REFERENCE:
PRIMARY INSPIRATION (70% influence): ${primary}
${others.length > 0 ? `SECONDARY INSPIRATION (15% each): ${others.join(", ")}` : ""}
${notes ? `CLIENT NOTES ON WHAT THEY LIKE: ${notes}` : ""}
${admiredScreenshots.length > 0 ? `SCREENSHOTS AVAILABLE: ${admiredScreenshots.map(s => s.screenshotUrl).join(", ")}` : ""}

INSTRUCTION: The final design MUST visually resemble the primary admired site.
Match their: layout structure, colour palette feel, typography style, section ordering, and overall aesthetic.`;
  }

  // Build tech stack context
  const techStackBlock = wappalyzerData
    ? `CURRENT TECH STACK: ${wappalyzerData.all?.join(", ") || "unknown"}${wappalyzerData.cms ? ` (CMS: ${wappalyzerData.cms})` : ""}`
    : "";

  // Build Companies House block
  const companiesHouseBlock = companiesHouseData
    ? `UK COMPANY DATA: ${companiesHouseData.name} (No. ${companiesHouseData.number}) — incorporated ${companiesHouseData.incorporatedOn}, status: ${companiesHouseData.status}`
    : "";

  // Build GTmetrix block (now always available — was awaited above)
  const gtmetrixBlock = gtmetrixData
    ? `DETAILED PERFORMANCE ANALYSIS (GTmetrix):
GTmetrix Grade: ${gtmetrixData.gtmetrixGrade}
Performance Score: ${gtmetrixData.performanceScore}%
Structure Score: ${gtmetrixData.structureScore}%
Fully Loaded Time: ${gtmetrixData.fullyLoadedTime ? (gtmetrixData.fullyLoadedTime / 1000).toFixed(1) + 's' : 'unknown'}
Page Size: ${gtmetrixData.totalPageSize ? Math.round(gtmetrixData.totalPageSize / 1024) + 'KB' : 'unknown'}
Requests: ${gtmetrixData.requestCount || 'unknown'}
NOTE: The new mockup must represent a massive improvement over these performance metrics.`
    : "";

  // Build text content block
  const textContent = scraped.textContent || pythonData?.mainSite?.textContent || "";
  const websiteContentBlock = textContent
    ? `\nCURRENT WEBSITE CONTENT (use for accurate copy — do NOT invent services):\n${textContent.substring(0, 4000)}`
    : "";

  // Style
  const reportedStyleId = req.designStyle || "modern-minimal";
  const styleId = req.designStyle === "current-brand" ? "modern-minimal" : (req.designStyle || "modern-minimal");
  const styleInstructions = getStyleInstructions(styleId);
  const styleLabel = getStyleLabel(reportedStyleId);

  // Full brief
  const briefLines = [
    `Business Name: ${displayName}`,
    req.website ? `Current Website: ${req.website}` : "No existing website — this is their first professional site",
    `Industry/Sector: ${detectedIndustry}`,
    req.targetAudience ? `Target Audience: ${req.targetAudience}` : "",
    req.usp ? `Unique Selling Points:\n${req.usp}` : "",
    req.competitors ? `Competitor Websites: ${req.competitors}` : "",
    req.primaryGoal ? `Primary Website Goal: ${req.primaryGoal}` : "",
    req.launchTimeline ? `Launch Timeline: ${req.launchTimeline}` : "",
    req.designerNotes ? `Designer Notes: ${req.designerNotes}` : "",
    req.notes ? `Additional Notes: ${req.notes}` : "",
    scraped.description ? `Current Site Meta Description: ${scraped.description}` : "",
    companiesHouseBlock,
    techStackBlock,
  ].filter(Boolean).join("\n");

  // ═══════════════════════════════════════════════════════════════════════════
  // PASS 1: Claude Opus — Master Content Strategy (Project Manager)
  // GTmetrix data now injected here (was missing in v4)
  // ═══════════════════════════════════════════════════════════════════════════
  log("═══ PASS 1: Claude Opus — Master Content Strategy ═══");
  const pass1System = `You are Claude Opus, the AI Project Manager for Optimised Marketing's world-class mockup pipeline. You are the most capable AI in this pipeline and you set the strategic vision that all other AIs follow. You create detailed, specific content plans that result in websites converting at 3-5x industry average. Every word you write is specific to this business — never generic.`;

  const pass1Prompt = `You are the Project Manager for this mockup. Create a comprehensive master content and copy strategy.

BUSINESS BRIEF:
${briefLines}

${colourBlock ? `BRAND COLOURS:\n${colourBlock}` : ""}
${fontBlock ? `\nFONTS:\n${fontBlock}` : ""}
${admiredBlock ? `\n${admiredBlock}` : ""}
${competitorBlock ? `\n${competitorBlock}` : ""}
${googleProfileBlock ? `\n${googleProfileBlock}` : ""}
${performanceBlock ? `\n${performanceBlock}` : ""}
${gtmetrixBlock ? `\n${gtmetrixBlock}` : ""}
${perplexityResearch ? `\nLIVE MARKET RESEARCH (2025 data):\n${perplexityResearch}` : ""}
${websiteContentBlock}

DESIGN STYLE: ${styleLabel}

As Project Manager, produce the master strategy covering:

## HEADLINE STRATEGY
Write 3 hero headline options (specific, benefit-driven, not generic). Include a subheadline for each.

## SECTION PLAN
List every section of the one-page site in order with purpose, key content, and specific copy points.

## COPY BLOCKS
Write the actual copy for:
1. Hero headline + subheadline (final recommendation)
2. Hero CTA button text
3. 4-6 service/feature cards (title + 2-sentence description each, specific to this business)
4. 3 testimonials (use real Google reviews if available, otherwise specific outcomes, real-sounding names)
5. Stats/social proof (realistic numbers for this industry — use Google rating if available)
6. About section (2 paragraphs, personal and credible)
7. Process/How-it-works (4 steps)
8. FAQ (6 questions specific to this industry)
9. Final CTA section

## TRUST SIGNALS
List 8 specific trust signals appropriate for this business and industry.

## COMPETITIVE POSITIONING
Based on competitor analysis, identify 3 ways this mockup should differentiate from competitors.

## READABILITY TARGETS
Specify target reading age (Flesch-Kincaid grade) appropriate for this industry and audience.

## COLOUR & TYPOGRAPHY
Specific CSS variable values for this design.

## ONE-PAGER UPSELL SECTION
Compelling copy for the upsell section at the bottom.

Be SPECIFIC. Use the business name, industry, real details, and real Google reviews throughout.`;

  let contentStrategy = "";
  try {
    contentStrategy = await invokeClaude({
      system: pass1System,
      messages: [{ role: "user", content: pass1Prompt }],
      maxTokens: 8000,
    });
    log(`Pass 1 complete: ${Math.round(contentStrategy.length / 1024)}KB strategy`);
  } catch (e) {
    logErr("Pass 1 (Claude) failed", e);
    contentStrategy = `Business: ${displayName}\nIndustry: ${detectedIndustry}\n${briefLines}`;
  }

  await checkDelayNotify();

  // ═══════════════════════════════════════════════════════════════════════════
  // PASS 2: Manus Forge / Gemini 2.5 Pro — Full HTML Generation (Master Designer)
  // v5: 65,000 token budget (up from 32,000)
  // ═══════════════════════════════════════════════════════════════════════════
  log("═══ PASS 2: Manus Forge — Full HTML Generation (65K tokens) ═══");

  const pass2System = `You are Manus, the world's best website designer and front-end developer. You are the centrepiece of this pipeline — the master craftsman. You create stunning, conversion-optimised one-page websites that look like they were built by a top London agency charging £50,000. Your HTML is always complete, valid, and production-ready. You never truncate output. You are the best. With 65,000 tokens available, you have the space to build something truly exceptional — use every token to create a masterpiece.`;

  const pass2Prompt = `Create a COMPLETE, STUNNING one-page website HTML for ${displayName}.

MASTER CONTENT STRATEGY (follow this exactly):
${contentStrategy}

${styleInstructions}

${colourBlock ? `\n${colourBlock}` : ""}
${fontBlock ? `\n${fontBlock}` : ""}
${admiredBlock ? `\n${admiredBlock}` : ""}

HERO IMAGE URL (use this for hero background — this is a real photo, NOT a logo):
${heroImage}

LOGO HTML (use exactly as shown):
${logoHtml}

AVAILABLE IMAGES for use throughout the page:
${imagePool.slice(0, 10).map((img, i) => `Image ${i + 1}: ${img}`).join("\n")}

MANDATORY QUALITY RULES — every rule must be followed:
1. Output ONLY the complete HTML document from <!DOCTYPE html> to </html>. No markdown, no explanation.
2. Use Tailwind CSS CDN (https://cdn.tailwindcss.com) as the primary styling framework.
3. Import Google Fonts via CDN link in <head> — use the detected fonts or choose premium alternatives.
4. The page MUST be a complete one-pager with ALL sections: hero, services/features, about, process/how-it-works, stats, testimonials, gallery/portfolio, FAQ, contact form, one-pager upsell CTA, footer.
5. HERO SECTION: Full-viewport height. Background image using heroImage URL above. Dark overlay for text readability. Logo top-left in sticky nav. Business name as H1. Specific benefit-driven headline. Two CTAs.
6. NAVIGATION: Sticky top nav. Logo top-left (use the logoHtml above). Nav links. Phone number. "Get Free Quote" CTA button. Mobile hamburger menu.
7. NEVER use the logo/favicon/stamp as a hero background image. The hero background MUST be the heroImage URL provided above.
8. ALL text must be readable against its background (WCAG AA contrast minimum 4.5:1).
9. Smooth scroll behaviour. IntersectionObserver animations on at least 5 sections.
10. Mobile-first responsive design. Hamburger menu on mobile.
11. Contact form with name, email, phone, message fields. WhatsApp button with real phone number if available.
12. Testimonials section with 3 specific testimonials (use real Google reviews if available).
13. Stats section with 4 impressive but realistic statistics for this industry.
14. FAQ section with 6 relevant questions and detailed answers.
15. Footer with logo, address, phone, email, social links, copyright.
16. Floating "Get a Quote" button (bottom-right, always visible).
17. Smooth scroll-to-top button.
18. ALL images must use the provided URLs — never use placeholder.com or picsum.photos.
19. The page must look like it was built by a top London agency — not a template.
20. Include a "ONE-PAGER UPSELL" section near the bottom with specific copy about upgrading to a full website.
21. Use CSS custom properties (variables) for all colours — defined in :root.
22. Include a locked/blurred section showing "Full Website Preview" with an upgrade CTA.
23. Social proof bar below hero with client logos or trust badges.
24. Process/How-it-works section with numbered steps.
25. NEVER use the client's logo, favicon, company stamp, seal, or any small graphic as a background image.
26. The design must be SPECIFIC to this business — not a generic template.
27. Include schema.org JSON-LD structured data in <head> for LocalBusiness.
28. Page must be at least 50KB of HTML — a full, comprehensive one-pager. With 65K tokens, aim for 60-80KB.
29. Add subtle CSS animations: fade-in on scroll, hover effects on cards, button pulse.
30. Include a "As seen in" / "Trusted by" social proof bar.
31. Add a gallery/portfolio section with the available images.
32. Include an interactive map placeholder or embedded Google Maps link.
33. Add a "Why Choose Us" section with 4-6 differentiators specific to this business.
34. Include a sticky announcement bar at the very top (e.g., "Free Website Audit — Limited Time").

OUTPUT: Complete HTML only. Start with <!DOCTYPE html>. End with </html>. Nothing else.`;

  let htmlOutput = "";
  try {
    htmlOutput = await invokeForge({
      messages: [
        { role: "system", content: pass2System },
        { role: "user", content: pass2Prompt },
      ],
      maxTokens: 65000,
    });
    htmlOutput = cleanHtml(htmlOutput);

    if (!isValidHtml(htmlOutput, 15000)) {
      log(`Pass 2 output invalid (${htmlOutput.length} chars) — retrying...`);
      const retryHtml = await invokeForge({
        messages: [
          { role: "system", content: "You are Manus, the world's best web designer. Output only complete, valid HTML." },
          { role: "user", content: `Create a complete professional one-page website for ${displayName} (${detectedIndustry} company). Use Tailwind CSS CDN. Include hero with background image ${heroImage}, services, testimonials, contact form. Logo: ${logoHtml}. Output ONLY the complete HTML from <!DOCTYPE html> to </html>.` },
        ],
        maxTokens: 65000,
      });
      const retryClean = cleanHtml(retryHtml);
      if (isValidHtml(retryClean, 8000)) {
        htmlOutput = retryClean;
        log(`Pass 2 retry succeeded: ${Math.round(htmlOutput.length / 1024)}KB`);
      } else {
        throw new Error("Pass 2 retry also invalid");
      }
    } else {
      log(`Pass 2 complete: ${Math.round(htmlOutput.length / 1024)}KB HTML`);
    }
  } catch (e) {
    logErr("Pass 2 (Forge) failed", e);
    throw new Error(`HTML generation failed: ${e.message}`);
  }

  await checkDelayNotify();

  // ═══════════════════════════════════════════════════════════════════════════
  // PASS 3: Claude Opus — UX/CRO Critique
  // v5: Full HTML passed (no truncation)
  // ═══════════════════════════════════════════════════════════════════════════
  log("═══ PASS 3: Claude Opus — UX/CRO Critique (full HTML) ═══");
  const pass3System = `You are a world-class UX designer and conversion rate optimisation (CRO) expert. You review website HTML and produce a precise, numbered list of specific improvements. You are brutally honest and specific — no vague feedback.`;

  const pass3Prompt = `Review this HTML mockup for ${displayName} (${detectedIndustry}) and produce a numbered list of specific UX/CRO improvements.

BUSINESS: ${displayName}
INDUSTRY: ${detectedIndustry}
ADMIRED SITES: ${admiredSiteUrls.join(", ") || "none specified"}
HERO IMAGE (should be this URL): ${heroImage}
LOGO URL (should be in nav): ${logoUrl || "not found"}
${competitorBlock ? `\n${competitorBlock}` : ""}

FULL HTML TO REVIEW:
${htmlOutput}

CRITIQUE CHECKLIST — check every item:
1. Is the hero background image the correct URL (${heroImage})? Is it a real photo, not a logo?
2. Is the logo in the top-left of the nav?
3. Are headlines specific and benefit-driven, or generic?
4. Is the copy specific to ${displayName} and ${detectedIndustry}?
5. Are there real, specific testimonials with outcomes and numbers?
6. Are the stats realistic and specific for ${detectedIndustry}?
7. Is the contact form complete with all fields?
8. Is there a floating CTA button?
9. Are there scroll animations?
10. Is the design visually similar to the admired sites?
11. Are all images loading (real URLs, not placeholders)?
12. Is the mobile menu implemented?
13. Is there a FAQ section with relevant questions?
14. Is there a one-pager upsell section?
15. Is the overall design premium and specific, or generic and template-like?
16. Are trust signals prominent above the fold?
17. Is there a clear value proposition in the first 3 seconds?
18. Are CTAs action-oriented (not just "Submit" or "Click Here")?

OUTPUT FORMAT:
ISSUE [N]: [Brief title]
PROBLEM: [Exactly what is wrong]
FIX: [Exactly what to change, with specific HTML/CSS if needed]

Only list real issues. Be specific. Maximum 18 issues.`;

  let uxCritique = "";
  try {
    uxCritique = await invokeClaude({
      system: pass3System,
      messages: [{ role: "user", content: pass3Prompt }],
      maxTokens: 5000,
    });
    log(`Pass 3 complete: ${uxCritique.length} chars critique`);
  } catch (e) {
    logErr("Pass 3 (Claude critique) failed — continuing", e);
    uxCritique = "No critique available — proceed with current HTML.";
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PASS 4: Manus Forge — Enact UX Fixes (v5: replaces GPT-4o)
  // Manus applies its own UX fixes to its own code — 65,000 tokens
  // ═══════════════════════════════════════════════════════════════════════════
  log("═══ PASS 4: Manus Forge — Enact UX Fixes (65K tokens) ═══");
  const pass4Prompt = `You are Manus, the world's best front-end developer. Apply the following UX/CRO improvements to this HTML mockup that you created for ${displayName}.

BUSINESS: ${displayName}
HERO IMAGE (use this for hero background): ${heroImage}
LOGO HTML (use in nav top-left): ${logoHtml}

UX IMPROVEMENTS TO APPLY:
${uxCritique}

CURRENT HTML:
${htmlOutput}

RULES:
- Apply ALL the improvements listed above
- Keep everything that is already good
- Do NOT truncate — output the COMPLETE HTML document
- Ensure hero background is ${heroImage} (not a logo)
- Ensure logo is in nav top-left
- You built this — you know exactly how to improve it
- Output ONLY the complete HTML from <!DOCTYPE html> to </html>`;

  try {
    const p4Html = await invokeForge({
      messages: [
        { role: "system", content: "You are Manus, the world's best front-end developer. Apply the specified UX improvements to your own HTML and output the complete improved document. Never truncate. Output ONLY valid complete HTML." },
        { role: "user", content: pass4Prompt },
      ],
      maxTokens: 65000,
    });
    const p4Clean = cleanHtml(p4Html);
    if (isValidHtml(p4Clean, 8000)) {
      htmlOutput = p4Clean;
      log(`Pass 4 complete: ${Math.round(htmlOutput.length / 1024)}KB HTML`);
    } else {
      log(`Pass 4 output invalid (${p4Clean.length} chars) — keeping Pass 3 output`);
    }
  } catch (e) {
    logErr("Pass 4 (Forge UX fix) failed — continuing with Pass 3 output", e);
  }

  await checkDelayNotify();

  // ═══════════════════════════════════════════════════════════════════════════
  // PASS 5: Claude Opus — Visual Design Critique
  // v5: Full HTML passed (no truncation)
  // ═══════════════════════════════════════════════════════════════════════════
  log("═══ PASS 5: Claude Opus — Visual Design Critique (full HTML) ═══");
  const pass5System = `You are a world-class visual designer and brand consultant. You review website HTML and identify specific visual design improvements. You focus on layout, hierarchy, whitespace, colour usage, typography, and brand consistency.`;

  const pass5Prompt = `Review this HTML mockup for ${displayName} and produce a numbered list of specific visual design improvements.

BUSINESS: ${displayName}
ADMIRED SITES (the design should match these): ${admiredSiteUrls.join(", ") || "none"}
BRAND COLOURS: ${uniqueColours.slice(0, 3).join(", ") || "not specified"}
DESIGN STYLE: ${styleLabel}
${admiredScreenshots.length > 0 ? `ADMIRED SITE SCREENSHOTS: ${admiredScreenshots.map(s => s.screenshotUrl).join(", ")}` : ""}

FULL HTML TO REVIEW:
${htmlOutput}

DESIGN CRITIQUE CHECKLIST:
1. Does the visual hierarchy guide the eye correctly (H1 → H2 → body)?
2. Is whitespace used generously or is it cramped?
3. Are the brand colours used consistently and correctly?
4. Does the typography feel premium or generic?
5. Are section backgrounds varied enough to create visual rhythm?
6. Are buttons visually prominent with good hover states?
7. Are cards/grid items visually balanced?
8. Does the overall aesthetic match the admired sites?
9. Are there enough visual elements (icons, dividers, patterns) to break up text?
10. Does the footer look complete and professional?
11. Are animations smooth and purposeful?
12. Is the mobile layout considered in the design choices?

OUTPUT FORMAT:
DESIGN ISSUE [N]: [Brief title]
PROBLEM: [Exactly what is wrong visually]
FIX: [Specific CSS/HTML change to make]

Maximum 12 design issues. Be specific.`;

  let designCritique = "";
  try {
    designCritique = await invokeClaude({
      system: pass5System,
      messages: [{ role: "user", content: pass5Prompt }],
      maxTokens: 4000,
    });
    log(`Pass 5 complete: ${designCritique.length} chars design critique`);
  } catch (e) {
    logErr("Pass 5 (Claude design critique) failed — continuing", e);
    designCritique = "No design critique available.";
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PASS 6: Manus Forge — Enact Design Critique + Visual Polish
  // v5: 65,000 token budget (up from 32,000)
  // ═══════════════════════════════════════════════════════════════════════════
  log("═══ PASS 6: Manus Forge — Design Polish (65K tokens) ═══");
  const pass6Prompt = `Apply the following visual design improvements to this HTML mockup for ${displayName}.

DESIGN IMPROVEMENTS TO APPLY:
${designCritique}

ADDITIONAL REQUIREMENTS:
- Ensure hero background is this real photo: ${heroImage}
- Ensure logo is in nav: ${logoHtml}
- Make the design match the admired sites: ${admiredSiteUrls.join(", ") || "premium UK agency style"}
- The page must look like it was built by a top London agency charging £50,000
- Ensure all sections have proper visual separation and rhythm
- Add subtle CSS animations and micro-interactions
- Every section must feel crafted, not templated

CURRENT HTML:
${htmlOutput}

Output ONLY the complete improved HTML from <!DOCTYPE html> to </html>. Do NOT truncate.`;

  try {
    const p6Html = await invokeForge({
      messages: [
        { role: "system", content: "You are Manus, the world's best web designer. Apply the design improvements and output the complete improved HTML. Never truncate. Output ONLY valid complete HTML." },
        { role: "user", content: pass6Prompt },
      ],
      maxTokens: 65000,
    });
    const p6Clean = cleanHtml(p6Html);
    if (isValidHtml(p6Clean, 8000)) {
      htmlOutput = p6Clean;
      log(`Pass 6 complete: ${Math.round(htmlOutput.length / 1024)}KB HTML`);
    } else {
      log(`Pass 6 output invalid (${p6Clean.length} chars) — keeping Pass 5 output`);
    }
  } catch (e) {
    logErr("Pass 6 (Forge design) failed — continuing", e);
  }

  await checkDelayNotify();

  // ═══════════════════════════════════════════════════════════════════════════
  // PASS 7: Claude Opus — Copy Polish + Readability Optimisation
  // v5: Produces REPLACE/WITH pairs only (no HTML output)
  // Pass 7b (Mistral second-opinion) REMOVED — redundant
  // ═══════════════════════════════════════════════════════════════════════════
  log("═══ PASS 7: Claude Opus — Copy Polish (REPLACE/WITH pairs) ═══");
  const pass7System = `You are a world-class copywriter specialising in UK business websites. You review HTML and rewrite weak copy to be specific, benefit-driven, and conversion-focused. You never use generic phrases like "we are committed to excellence" or "your trusted partner". You also optimise for readability — ensuring copy is at the right reading level for the target audience.`;

  const pass7Prompt = `Review the copy in this HTML mockup for ${displayName} (${detectedIndustry}) and provide specific copy improvements.

BUSINESS CONTEXT:
${briefLines}
${websiteContentBlock}
${googleProfileBlock ? `\n${googleProfileBlock}` : ""}

HTML (first 20000 chars for copy review):
${htmlOutput.substring(0, 20000)}

COPY REVIEW CHECKLIST:
1. Is the H1 headline specific and benefit-driven?
2. Are subheadlines compelling?
3. Are CTA buttons action-oriented (not just "Submit" or "Click Here")?
4. Are service descriptions specific to this business?
5. Are testimonials specific with real outcomes and numbers?
6. Are stats realistic and impressive?
7. Is the FAQ copy genuinely helpful?
8. Is the about section personal and credible?
9. Are there any generic phrases that should be replaced?
10. Is the one-pager upsell copy compelling?
11. Is the reading level appropriate for the target audience?
12. Are there any spelling or grammar issues?

OUTPUT FORMAT:
Provide a list of copy replacements in this exact format:
REPLACE: [exact current text]
WITH: [improved text]

Only include replacements that genuinely improve the copy. Maximum 25 replacements.`;

  let copyImprovements = "";
  try {
    copyImprovements = await invokeClaude({
      system: pass7System,
      messages: [{ role: "user", content: pass7Prompt }],
      maxTokens: 4000,
    });
    log(`Pass 7 complete: ${copyImprovements.length} chars copy improvements`);
  } catch (e) {
    logErr("Pass 7 (Claude copy) failed — continuing", e);
    copyImprovements = "";
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PASS 8: Manus Forge — Inject Polished Copy (v5: replaces GPT-4o)
  // Manus applies copy improvements to its own HTML — 65,000 tokens
  // ═══════════════════════════════════════════════════════════════════════════
  if (copyImprovements && copyImprovements.length > 100) {
    log("═══ PASS 8: Manus Forge — Inject Polished Copy (65K tokens) ═══");
    const pass8Prompt = `Apply the following copy improvements to this HTML mockup for ${displayName}. You built this HTML — you know exactly how to apply these text replacements cleanly.

COPY IMPROVEMENTS:
${copyImprovements}

CURRENT HTML:
${htmlOutput}

RULES:
- Apply ALL the copy replacements listed above
- Keep all HTML structure, CSS, and JavaScript unchanged
- Only change the text content
- Do NOT truncate — output the COMPLETE HTML document
- Output ONLY the complete HTML from <!DOCTYPE html> to </html>`;

    try {
      const p8Html = await invokeForge({
        messages: [
          { role: "system", content: "You are Manus, the world's best web developer. Apply the copy replacements precisely to your own HTML and output the complete document. Never truncate. Output ONLY valid complete HTML." },
          { role: "user", content: pass8Prompt },
        ],
        maxTokens: 65000,
      });
      const p8Clean = cleanHtml(p8Html);
      if (isValidHtml(p8Clean, 8000)) {
        htmlOutput = p8Clean;
        log(`Pass 8 complete: ${Math.round(htmlOutput.length / 1024)}KB HTML`);
      } else {
        log(`Pass 8 output invalid — keeping Pass 7 output`);
      }
    } catch (e) {
      logErr("Pass 8 (Forge copy inject) failed — continuing", e);
    }
  } else {
    log("Pass 8: skipped (no copy improvements)");
  }

  await checkDelayNotify();

  // ═══════════════════════════════════════════════════════════════════════════
  // PASS 9: Manus Forge — Definitive Final Quality Pass (Manus Signs Off)
  // v5: 65,000 token budget (up from 32,000) — full HTML passed
  // ═══════════════════════════════════════════════════════════════════════════
  log("═══ PASS 9: Manus Forge — Definitive Final Quality Pass (65K tokens) ═══");
  const pass9Prompt = `You are Manus, the world's best web designer. This is your definitive final quality pass on this HTML mockup for ${displayName}. This is your masterpiece — your signature on this work. With 65,000 tokens, you have the space to make it truly exceptional.

FINAL QUALITY CHECKLIST — fix everything that fails:
1. Hero background MUST be: ${heroImage} (real photo, not a logo)
2. Logo MUST be in nav top-left: ${logoHtml}
3. All text must be readable (check contrast — WCAG AA minimum)
4. No placeholder text (Lorem Ipsum, "Your Business Name", "example.com", "#", "000-000-0000")
5. All sections must be complete (no empty sections)
6. Contact form must have all fields and a submit button
7. Footer must have logo, address, phone, email, copyright
8. Floating CTA button must be present
9. Mobile menu must be implemented
10. One-pager upsell section must be present and compelling
11. The design must look PREMIUM — like a top London agency built it for £50,000
12. All images must use real URLs (not placeholder.com or picsum.photos)
13. Schema.org JSON-LD must be present in <head>
14. The page must be at least 40KB — a full, comprehensive one-pager
15. Animations must be smooth and purposeful
16. Typography must be premium and consistent
17. Colour palette must be consistent throughout
18. Every section must feel crafted, not templated
19. The business name must appear correctly throughout
20. All CTAs must be action-oriented and compelling
21. The announcement bar at the top must be present
22. The "Why Choose Us" section must be specific to this business
23. The gallery/portfolio section must use the real image URLs provided
24. The FAQ must have 6 industry-specific questions with detailed answers

CURRENT HTML:
${htmlOutput}

Output ONLY the complete final HTML from <!DOCTYPE html> to </html>. This is your masterpiece. Make it outstanding.`;

  try {
    const p9Html = await invokeForge({
      messages: [
        { role: "system", content: "You are Manus, the world's best web designer. Perform the final quality sweep and output the complete, definitive HTML. This is your masterpiece. Never truncate. Output ONLY valid complete HTML." },
        { role: "user", content: pass9Prompt },
      ],
      maxTokens: 65000,
    });
    const p9Clean = cleanHtml(p9Html);
    if (isValidHtml(p9Clean, 8000)) {
      htmlOutput = p9Clean;
      log(`Pass 9 complete: ${Math.round(htmlOutput.length / 1024)}KB HTML — Manus signed off`);
    } else {
      log(`Pass 9 output invalid (${p9Clean.length} chars) — keeping Pass 8 output`);
    }
  } catch (e) {
    logErr("Pass 9 (Forge final) failed — using Pass 8 output", e);
  }

  await checkDelayNotify();

  // ═══════════════════════════════════════════════════════════════════════════
  // QA SYSTEM: 10 checks + remediation (65,000 token budget for remediation)
  // v5: Full HTML passed to all AI QA scorers (no truncation)
  // ═══════════════════════════════════════════════════════════════════════════
  log("═══ QA SYSTEM: 10 checks + remediation ═══");

  let qaApproved = false;
  let qaLoops = 0;
  let finalQaReport = null;

  while (!qaApproved && qaLoops < MAX_QA_LOOPS + 1) {
    qaLoops++;
    log(`QA Loop ${qaLoops}/${MAX_QA_LOOPS + 1}...`);

    // ── QA-1 to QA-6: Python automated checks ──────────────────────────────
    log("QA-1/6: Python automated checks...");
    const pythonQA = runPythonQA(htmlOutput);
    const pythonQAReport = pythonQA ? JSON.stringify(pythonQA, null, 2) : "Python QA unavailable";
    log(`Python QA: ${pythonQA ? `html_valid=${pythonQA.html_valid}, placeholders=${pythonQA.placeholder_count}, readability=${pythonQA.readability_grade}` : "unavailable"}`);

    // ── QA-7: Claude Opus — UX Score (full HTML) ───────────────────────────
    log("QA-7: Claude Opus — UX score (full HTML)...");
    let uxScore = 0;
    let uxReport = "";
    try {
      const uxResult = await invokeClaude({
        system: "You are a UX expert. Score this website mockup and provide a JSON response.",
        messages: [{
          role: "user",
          content: `Score this HTML mockup for ${displayName} on UX quality (0-100).

FULL HTML:
${htmlOutput}

Evaluate:
- Hero clarity and value proposition (0-20)
- CTA prominence and action-orientation (0-15)
- Trust signals and social proof (0-15)
- Navigation and user flow (0-15)
- Mobile responsiveness hints (0-10)
- Contact form completeness (0-10)
- FAQ and content completeness (0-15)

Respond with JSON: {"score": N, "issues": ["issue1", "issue2"], "strengths": ["strength1"]}`,
        }],
        maxTokens: 1000,
      });
      const uxJson = JSON.parse(uxResult.match(/\{[\s\S]*\}/)?.[0] || "{}");
      uxScore = uxJson.score || 70;
      uxReport = uxResult;
      log(`QA-7 UX Score: ${uxScore}/100`);
    } catch (e) {
      uxScore = 70;
      log("QA-7 Claude UX score failed (non-fatal):", e.message);
    }

    // ── QA-8: GPT-4o — Copy Quality Score (full HTML) ─────────────────────
    log("QA-8: GPT-4o — copy quality score (full HTML)...");
    let copyScore = 0;
    let copyReport = "";
    try {
      const copyResult = await invokeGPT4o({
        messages: [{
          role: "system",
          content: "You are a copywriting expert. Score this website mockup and provide a JSON response.",
        }, {
          role: "user",
          content: `Score the copy quality in this HTML mockup for ${displayName} (0-100).

FULL HTML:
${htmlOutput}

Evaluate:
- Headline specificity and benefit-focus (0-20)
- No generic phrases (0-15)
- Brand voice consistency (0-15)
- CTA copy quality (0-15)
- Testimonial specificity (0-15)
- Grammar and spelling (0-10)
- Readability (0-10)

Respond with JSON: {"score": N, "issues": ["issue1"], "strengths": ["strength1"]}`,
        }],
        maxTokens: 800,
      });
      const copyJson = JSON.parse(copyResult.match(/\{[\s\S]*\}/)?.[0] || "{}");
      copyScore = copyJson.score || 70;
      copyReport = copyResult;
      log(`QA-8 Copy Score: ${copyScore}/100`);
    } catch (e) {
      copyScore = 70;
      log("QA-8 GPT-4o copy score failed (non-fatal):", e.message);
    }

    // ── QA-9: Gemini 2.5 Pro — Visual Design Score (full HTML) ─────────────
    log("QA-9: Gemini 2.5 Pro — visual design score (full HTML)...");
    let designScore = 0;
    let designReport = "";
    try {
      const designResult = await invokeForge({
        messages: [{
          role: "system",
          content: "You are a visual design expert. Score this website mockup and provide a JSON response.",
        }, {
          role: "user",
          content: `Score the visual design quality of this HTML mockup for ${displayName} (0-100).

FULL HTML:
${htmlOutput}

Evaluate:
- Colour palette consistency (0-20)
- Typography hierarchy (0-20)
- Whitespace and layout balance (0-20)
- Section visual variety (0-15)
- Button and interactive element design (0-15)
- Overall premium feel (0-10)

Respond with JSON: {"score": N, "issues": ["issue1"], "strengths": ["strength1"]}`,
        }],
        maxTokens: 800,
      });
      const designJson = JSON.parse(designResult.match(/\{[\s\S]*\}/)?.[0] || "{}");
      designScore = designJson.score || 70;
      designReport = designResult;
      log(`QA-9 Design Score: ${designScore}/100`);
    } catch (e) {
      designScore = 70;
      log("QA-9 Gemini design score failed (non-fatal):", e.message);
    }

    // ── QA-10: Manus Forge — Final Verdict + Remediation (65K tokens) ──────
    log("QA-10: Manus Forge — final verdict...");
    const overallScore = Math.round((uxScore + copyScore + designScore) / 3);
    log(`Overall QA Score: ${overallScore}/100 (UX: ${uxScore}, Copy: ${copyScore}, Design: ${designScore})`);

    finalQaReport = {
      overallScore,
      uxScore,
      copyScore,
      designScore,
      pythonChecks: pythonQA,
      loops: qaLoops,
    };

    if (overallScore >= QA_PASS_THRESHOLD || qaLoops > MAX_QA_LOOPS) {
      if (overallScore >= QA_PASS_THRESHOLD) {
        log(`QA PASSED: ${overallScore}/100 — Manus approves delivery`);
      } else {
        log(`QA FORCE-APPROVED after ${qaLoops} loops: ${overallScore}/100`);
      }
      qaApproved = true;
    } else {
      log(`QA FAILED: ${overallScore}/100 — Manus initiating remediation loop ${qaLoops}...`);

      try {
        const remediationPrompt = `You are Manus, the master designer and QA director. The mockup for ${displayName} scored ${overallScore}/100 in QA. Apply ALL the following fixes to bring it above ${QA_PASS_THRESHOLD}/100. With 65,000 tokens, you have the space to make it truly outstanding.

QA REPORTS:
UX Issues (score: ${uxScore}/100): ${uxReport.substring(0, 1000)}
Copy Issues (score: ${copyScore}/100): ${copyReport.substring(0, 1000)}
Design Issues (score: ${designScore}/100): ${designReport.substring(0, 1000)}
Python Checks: ${pythonQAReport.substring(0, 500)}

CURRENT HTML:
${htmlOutput}

Apply ALL fixes. Output the complete improved HTML from <!DOCTYPE html> to </html>. Make it outstanding.`;

        const remediatedHtml = await invokeForge({
          messages: [
            { role: "system", content: "You are Manus, the world's best web designer and QA director. Apply all fixes and output the complete improved HTML. Never truncate." },
            { role: "user", content: remediationPrompt },
          ],
          maxTokens: 65000,
        });
        const remediatedClean = cleanHtml(remediatedHtml);
        if (isValidHtml(remediatedClean, 8000)) {
          htmlOutput = remediatedClean;
          log(`QA Remediation ${qaLoops} complete: ${Math.round(htmlOutput.length / 1024)}KB HTML`);
        }
      } catch (e) {
        logErr(`QA Remediation ${qaLoops} failed — continuing`, e);
        qaApproved = true; // Force approve if remediation fails
      }
    }

    await checkDelayNotify();
  }

  const elapsed = Math.round((Date.now() - startTime) / 1000);
  log(`All passes complete in ${elapsed}s. Final HTML: ${Math.round(htmlOutput.length / 1024)}KB. QA Score: ${finalQaReport?.overallScore}/100`);

  // Inject Unsplash attribution into footer (Unsplash API compliance requirement)
  if (unsplashAttributionHtml && htmlOutput.includes("</body>")) {
    htmlOutput = htmlOutput.replace("</body>", `${unsplashAttributionHtml}</body>`);
    log(`Unsplash attribution injected for ${unsplashPhotoObjects.length} photo(s)`);
  }

  return {
    htmlOutput,
    styleId: reportedStyleId,
    styleLabel,
    elapsed,
    qaReport: finalQaReport,
    intelligenceData: {
      pageSpeedBefore: pageSpeedData,
      googleProfile,
      competitorCount: (serpCompetitors?.length || 0) + (serperCompetitors?.length || 0),
      brandfetchFound: !!brandfetchData,
      companiesHouseFound: !!companiesHouseData,
      stockPhotosUsed: stockPhotos.length,
      gtmetrixGrade: gtmetrixData?.gtmetrixGrade || null,
    },
  };
}

// ─── Screenshot and upload ────────────────────────────────────────────────────
async function screenshotAndUpload(requestId, htmlUrl) {
  try {
    const screenshotRes = await fetch(`${SCREENSHOT_API_URL}/screenshot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-secret": SCREENSHOT_API_SECRET,
      },
      body: JSON.stringify({
        url: htmlUrl,
        width: 1440,
        height: 900,
        fullPage: true,
        format: "jpeg",
        quality: 85,
      }),
      signal: AbortSignal.timeout(60_000),
    });
    if (!screenshotRes.ok) return null;
    const screenshotData = await screenshotRes.json();
    return screenshotData.url || screenshotData.screenshotUrl || null;
  } catch (e) {
    logErr("Screenshot failed (non-fatal)", e);
    return null;
  }
}

async function uploadAsset(requestId, content, filename, contentType) {
  try {
    const res = await apiPost("/api/cron/upload-asset", {
      requestId,
      content: typeof content === "string" ? content : content.toString("base64"),
      filename,
      contentType,
      encoding: typeof content === "string" ? "utf8" : "base64",
    });
    return res.url || null;
  } catch (e) {
    logErr(`Upload ${filename} failed`, e);
    return null;
  }
}

// ─── Create Manus task ────────────────────────────────────────────────────────
async function createManusTask(req, mockupResult) {
  if (!MANUS_API_KEY || !MANUS_PROJECT_ID) return null;
  try {
    const displayName = req.businessName?.trim() || req.name;
    const qaReport = mockupResult.qaReport;
    const intel = mockupResult.intelligenceData;

    const taskMessage = `# New Website Client — ${displayName}
A client has purchased a website package. Their mockup has been generated and quality-assured.

## Client Details
- **Name:** ${req.name}
- **Email:** ${req.email}
- **Business:** ${displayName}
- **Website:** ${req.website || "No existing website"}
- **Industry:** ${req.industry || "Not specified"}

## Brief
${[
  req.targetAudience ? `**Target Audience:** ${req.targetAudience}` : "",
  req.usp ? `**USPs:** ${req.usp}` : "",
  req.toneOfVoice ? `**Tone of Voice:** ${req.toneOfVoice}` : "",
  req.primaryGoal ? `**Primary Goal:** ${req.primaryGoal}` : "",
  req.websiteLikes ? `**Design Inspiration:** ${req.websiteLikes}` : "",
].filter(Boolean).join("\n")}

## AI QA Report
- **Overall Score:** ${qaReport?.overallScore || "N/A"}/100
- **UX Score:** ${qaReport?.uxScore || "N/A"}/100
- **Copy Score:** ${qaReport?.copyScore || "N/A"}/100
- **Design Score:** ${qaReport?.designScore || "N/A"}/100
- **QA Loops:** ${qaReport?.loops || 1}

## Intelligence Gathered
- **Competitors Analysed:** ${intel?.competitorCount || 0}
- **Google Rating:** ${intel?.googleProfile?.rating || "N/A"}★ (${intel?.googleProfile?.reviewCount || 0} reviews)
- **Current Site Performance:** ${intel?.pageSpeedBefore?.performance || "N/A"}/100
- **GTmetrix Grade:** ${intel?.gtmetrixGrade || "N/A"}
- **Brand Data Found:** ${intel?.brandfetchFound ? "Yes (Brandfetch)" : "No"}

## Mockup & Source Files
- **Approved Mockup (HTML):** ${mockupResult.htmlUrl}
- **Preview Screenshot:** ${mockupResult.pngUrl || "Not available"}
- **Design Style:** ${mockupResult.styleLabel}

## GitHub Repository
- **Repo:** PremierBlasting/commercial_shot_blasting (reference for code quality)

## Next Steps
1. Review the approved mockup HTML
2. Build the full multi-page website based on the mockup style
3. Apply brand colours and fonts from the mockup
4. Contact client at ${req.email} to confirm project start`;

    const res = await fetch("https://api.manus.ai/v2/task.create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-manus-api-key": MANUS_API_KEY,
      },
      body: JSON.stringify({
        title: `Website Build — ${displayName}`,
        project_id: MANUS_PROJECT_ID,
        message: { content: taskMessage },
        interactive_mode: true,
      }),
      signal: AbortSignal.timeout(30_000),
    });
    const data = await res.json();
    if (data.ok) {
      log(`Manus task created: ${data.task_url}`);
      return data.task_id;
    }
    return null;
  } catch (e) {
    logErr("Manus task creation error", e);
    return null;
  }
}

// ─── Poll and process ─────────────────────────────────────────────────────────
let isProcessing = false;

async function pollAndProcess() {
  if (isProcessing) {
    log("Still processing previous job — skipping poll");
    return;
  }
  if (!CRON_SECRET_KEY) {
    log("CRON_SECRET_KEY not set — skipping");
    return;
  }

  try {
    const claim = await apiPost("/api/cron/claim-mockup-job", {});
    if (!claim.job) {
      log("No pending jobs");
      return;
    }

    const req = claim.job;
    log(`Claimed job #${req.id} for ${req.email} (${req.businessName || req.name})`);
    isProcessing = true;
    const jobStartTime = Date.now();

    // SMS notification (fire and forget)
    apiPost("/api/cron/notify-owner-sms", {
      requestId: req.id,
      businessName: req.businessName || req.name,
      email: req.email,
      websiteUrl: req.website,
    }).catch(e => logErr("SMS notify failed (non-fatal)", e));

    const jobTimeout = setTimeout(() => {
      logErr(`Job #${req.id} timed out after ${JOB_TIMEOUT_MS / 60000} minutes`);
      isProcessing = false;
    }, JOB_TIMEOUT_MS);

    try {
      // Generate the mockup
      const result = await generateMockup(req, jobStartTime, req.id);

      // Upload HTML
      log("Uploading HTML...");
      const htmlUrl = await uploadAsset(req.id, result.htmlOutput, "homepage.html", "text/html");
      if (!htmlUrl) throw new Error("HTML upload failed");

      // Take screenshot of the uploaded HTML
      log("Taking screenshot...");
      const pngUrl = await screenshotAndUpload(req.id, htmlUrl);

      // Create ZIP
      let zipUrl = null;
      try {
        const zipResult = execSync(
          `cd /tmp && mkdir -p mockup_${req.id} && echo '${result.htmlOutput.replace(/'/g, "'\\''")}' > mockup_${req.id}/homepage.html && zip -q mockup_${req.id}.zip mockup_${req.id}/homepage.html && base64 mockup_${req.id}.zip`,
          { timeout: 30_000, maxBuffer: 10 * 1024 * 1024 }
        ).toString().trim();
        zipUrl = await uploadAsset(req.id, Buffer.from(zipResult, "base64"), "source.zip", "application/zip");
      } catch (e) {
        logErr("ZIP creation failed (non-fatal)", e);
      }

      // Report result — goes to HUMAN REVIEW QUEUE (not direct delivery)
      await apiPost("/api/cron/mockup-result", {
        requestId: req.id,
        htmlUrl,
        pngUrl,
        zipUrl,
        styleId: result.styleId,
        styleLabel: result.styleLabel,
        elapsedSecs: result.elapsed,
        qaScore: result.qaReport?.overallScore || null,
        qaReport: result.qaReport || null,
        intelligenceData: result.intelligenceData || null,
        status: "awaiting_review", // Human sign-off required before delivery
      });

      log(`Job #${req.id} complete in ${result.elapsed}s — QA: ${result.qaReport?.overallScore}/100 — AWAITING HUMAN REVIEW`);

      // Create Manus task if purchase-triggered
      if (req.purchaseTriggered) {
        await createManusTask(req, { htmlUrl, pngUrl, zipUrl, styleLabel: result.styleLabel, qaReport: result.qaReport, intelligenceData: result.intelligenceData });
      }

    } catch (e) {
      logErr(`Job #${req.id} failed`, e);
      try {
        await apiPost("/api/cron/mockup-result", {
          requestId: req.id,
          error: e.message,
        });
      } catch {}
    } finally {
      clearTimeout(jobTimeout);
      isProcessing = false;
    }

  } catch (e) {
    logErr("Poll error", e);
    isProcessing = false;
  }
}

// ─── Start ────────────────────────────────────────────────────────────────────
log(`╔═══════════════════════════════════════════════════════════════╗`);
log(`║  Optimised Marketing — Mockup Worker v5                       ║`);
log(`║  MANUS-FIRST ARCHITECTURE — Gemini 2.5 Pro leads             ║`);
log(`║  9-pass generation • 65K token budget • AI QA system          ║`);
log(`║  Human sign-off • 90-minute timeout                           ║`);
log(`╚═══════════════════════════════════════════════════════════════╝`);
log(`Models: Manus Forge/Gemini 2.5 Pro (Primary Builder — Passes 2,4,6,8,9,QA) | Claude Opus 4.5 (PM+Critique+QA) | GPT-4o (QA copy scorer only)`);
log(`APIs: SerpAPI=${SERPAPI_API_KEY ? "✓" : "✗"} | DataForSEO=${DATAFORSEO_LOGIN ? "✓" : "✗"} | Perplexity=${PERPLEXITY_API_KEY ? "✓" : "✗"} | GooglePlaces=${GOOGLE_MAPS_API_KEY ? "✓" : "✗"} | Brandfetch=${BRANDFETCH_API_KEY ? "✓" : "✗"} | GTmetrix=${GTMETRIX_API_KEY ? "✓" : "✗"} | Serper=${SERPER_API_KEY ? "✓" : "✗"} | Mistral=${MISTRAL_API_KEY ? "✓" : "✗"} | Groq=${GROQ_API_KEY ? "✓" : "✗"} | Pexels=${PEXELS_API_KEY ? "✓" : "✗"} | Unsplash=${UNSPLASH_ACCESS_KEY ? "✓" : "✗"}`);
log(`Anthropic: ${ANTHROPIC_API_KEY ? "✓" : "✗ MISSING"} | Forge: ${MANUS_FORGE_API_KEY ? "✓" : "✗ MISSING"} | OpenAI: ${OPENAI_API_KEY ? "✓" : "✗ MISSING"}`);
log(`QA threshold: ${QA_PASS_THRESHOLD}/100 | Max QA loops: ${MAX_QA_LOOPS} | Job timeout: ${JOB_TIMEOUT_MS / 60000}min | Delay notify: ${DELAY_NOTIFY_MS / 60000}min`);
log(`v5 changes: GTmetrix awaited pre-Pass1 | 65K tokens (Passes 2,4,6,8,9,QA) | Manus replaces GPT-4o in Passes 4+8 | No Mistral pass | Full HTML to critiques`);
log(`Polling every ${POLL_INTERVAL_MS / 1000}s`);

pollAndProcess();
setInterval(pollAndProcess, POLL_INTERVAL_MS);
