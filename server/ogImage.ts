/**
 * Dynamic Open Graph image generation for county and town pages.
 *
 * Generates branded 1200×630 PNG cards with:
 *   - Dark navy background with diagonal accent stripe
 *   - Brand orange "SHOT BLASTING IN" label
 *   - Location name in large bold white text
 *   - County sub-label (for town pages)
 *   - commercialshotblasting.co.uk URL footer
 *   - Subtle grid texture overlay
 *
 * Images are cached in-memory after first generation.
 */

import type { Express, Request, Response } from "express";
import sharp from "sharp";

// ── In-memory cache ──────────────────────────────────────────────────────────
const cache = new Map<string, Buffer>();

// ── Brand tokens ─────────────────────────────────────────────────────────────
const BRAND_NAVY   = "#0d1b2a";
const BRAND_DARK   = "#0a1520";
const BRAND_ORANGE = "#e8650a";
const BRAND_LIGHT  = "#f0f4f8";
const BRAND_MUTED  = "#8ba4bc";
const SITE_URL     = "commercialshotblasting.co.uk";

// ── SVG builder ──────────────────────────────────────────────────────────────

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Splits a long location name into two lines if it exceeds maxChars.
 * Tries to split at a space near the middle.
 */
function splitName(name: string, maxChars = 18): [string, string | null] {
  if (name.length <= maxChars) return [name, null];
  const mid = Math.floor(name.length / 2);
  // Find nearest space around midpoint
  let splitAt = -1;
  for (let i = 0; i <= mid; i++) {
    if (name[mid - i] === " ") { splitAt = mid - i; break; }
    if (name[mid + i] === " ") { splitAt = mid + i; break; }
  }
  if (splitAt === -1) return [name, null]; // no space found, keep single line
  return [name.slice(0, splitAt).trim(), name.slice(splitAt + 1).trim()];
}

function buildSvg(locationName: string, countyName: string | null, type: "county" | "town"): string {
  const W = 1200;
  const H = 630;

  // Dynamic font sizing based on name length
  const [line1, line2] = splitName(locationName, 18);
  const hasLine2 = line2 !== null;

  let nameFontSize: number;
  if (hasLine2) {
    nameFontSize = line1.length > 14 ? 82 : 96;
  } else {
    nameFontSize = locationName.length > 16 ? 88 : locationName.length > 12 ? 100 : 112;
  }

  // Vertical layout
  const labelY = hasLine2 ? 195 : 210;
  const line1Y  = hasLine2 ? 310 : 330;
  const line2Y  = line1Y + nameFontSize + 12;
  const countyY = hasLine2 ? line2Y + 60 : line1Y + 68;
  const footerY = H - 38;

  const escapedLine1   = escapeXml(line1);
  const escapedLine2   = line2 ? escapeXml(line2) : "";
  const escapedCounty  = countyName ? escapeXml(countyName) : "";
  const escapedSiteUrl = escapeXml(SITE_URL);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Background gradient -->
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND_DARK}"/>
      <stop offset="60%" stop-color="${BRAND_NAVY}"/>
      <stop offset="100%" stop-color="#112233"/>
    </linearGradient>
    <!-- Orange accent gradient -->
    <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${BRAND_ORANGE}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#c4450a" stop-opacity="0.7"/>
    </linearGradient>
    <!-- Subtle vignette -->
    <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="transparent"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.45)"/>
    </radialGradient>
    <!-- Clip for the diagonal stripe -->
    <clipPath id="stripeClip">
      <polygon points="0,0 ${W},0 ${W},${H} 0,${H}"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bgGrad)"/>

  <!-- Subtle grid lines (texture) -->
  <g opacity="0.04" stroke="${BRAND_LIGHT}" stroke-width="1">
    ${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="${H}"/>`).join("")}
    ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 105}" x2="${W}" y2="${i * 105}"/>`).join("")}
  </g>

  <!-- Diagonal accent stripe (right side) -->
  <polygon points="${W - 320},0 ${W},0 ${W},${H} ${W - 520},${H}"
           fill="${BRAND_ORANGE}" opacity="0.08"/>

  <!-- Diagonal accent stripe (stronger, narrower) -->
  <polygon points="${W - 200},0 ${W},0 ${W},${H} ${W - 380},${H}"
           fill="${BRAND_ORANGE}" opacity="0.12"/>

  <!-- Left orange accent bar -->
  <rect x="0" y="0" width="8" height="${H}" fill="url(#accentGrad)"/>

  <!-- Top orange accent line -->
  <rect x="0" y="0" width="${W}" height="4" fill="${BRAND_ORANGE}" opacity="0.6"/>

  <!-- Vignette overlay -->
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>

  <!-- "SHOT BLASTING IN" label -->
  <text
    x="80"
    y="${labelY}"
    font-family="'Arial Black', 'Arial Bold', Arial, sans-serif"
    font-size="28"
    font-weight="900"
    letter-spacing="6"
    fill="${BRAND_ORANGE}"
    text-anchor="start"
  >${type === "county" ? "SHOT BLASTING IN" : "SHOT BLASTING IN"}</text>

  <!-- Separator line under label -->
  <rect x="80" y="${labelY + 14}" width="420" height="2" fill="${BRAND_ORANGE}" opacity="0.5"/>

  <!-- Location name — line 1 -->
  <text
    x="80"
    y="${line1Y}"
    font-family="'Arial Black', 'Arial Bold', Arial, sans-serif"
    font-size="${nameFontSize}"
    font-weight="900"
    fill="${BRAND_LIGHT}"
    text-anchor="start"
    dominant-baseline="auto"
  >${escapedLine1}</text>

  ${hasLine2 ? `<!-- Location name — line 2 -->
  <text
    x="80"
    y="${line2Y}"
    font-family="'Arial Black', 'Arial Bold', Arial, sans-serif"
    font-size="${nameFontSize}"
    font-weight="900"
    fill="${BRAND_LIGHT}"
    text-anchor="start"
    dominant-baseline="auto"
  >${escapedLine2}</text>` : ""}

  ${countyName && type === "town" ? `<!-- County sub-label -->
  <text
    x="82"
    y="${countyY}"
    font-family="Arial, sans-serif"
    font-size="30"
    font-weight="400"
    fill="${BRAND_MUTED}"
    text-anchor="start"
  >${escapedCounty}</text>` : ""}

  <!-- Bottom footer bar -->
  <rect x="0" y="${H - 72}" width="${W}" height="72" fill="rgba(0,0,0,0.35)"/>

  <!-- Site URL in footer -->
  <text
    x="80"
    y="${footerY}"
    font-family="Arial, sans-serif"
    font-size="22"
    font-weight="400"
    fill="${BRAND_MUTED}"
    text-anchor="start"
    letter-spacing="1"
  >${escapedSiteUrl}</text>

  <!-- Phone in footer (right-aligned) -->
  <text
    x="${W - 80}"
    y="${footerY}"
    font-family="Arial, sans-serif"
    font-size="22"
    font-weight="400"
    fill="${BRAND_MUTED}"
    text-anchor="end"
    letter-spacing="1"
  >01543 222 777</text>

  <!-- CSB monogram (bottom-right accent) -->
  <text
    x="${W - 80}"
    y="${H - 90}"
    font-family="'Arial Black', 'Arial Bold', Arial, sans-serif"
    font-size="52"
    font-weight="900"
    fill="${BRAND_ORANGE}"
    text-anchor="end"
    opacity="0.18"
  >CSB</text>
</svg>`;
}

// ── Image generator ──────────────────────────────────────────────────────────

async function generateOgImage(
  type: "county" | "town",
  locationName: string,
  countyName: string | null
): Promise<Buffer> {
  const cacheKey = `${type}:${locationName}:${countyName ?? ""}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const svg = buildSvg(locationName, countyName, type);
  const buffer = await sharp(Buffer.from(svg))
    .png({ compressionLevel: 6, quality: 90 })
    .toBuffer();

  cache.set(cacheKey, buffer);
  return buffer;
}

// ── Express route registration ───────────────────────────────────────────────

export function registerOgImageRoute(app: Express): void {
  app.get("/api/og-image", async (req: Request, res: Response) => {
    const type = req.query.type as string;
    const name = req.query.name as string;
    const county = (req.query.county as string) || null;

    if (!type || !name || (type !== "county" && type !== "town")) {
      res.status(400).send("Missing or invalid parameters. Use ?type=county|town&name=LocationName[&county=CountyName]");
      return;
    }

    // Sanitise inputs
    const safeName   = name.replace(/[<>"'&]/g, "").slice(0, 60).trim();
    const safeCounty = county ? county.replace(/[<>"'&]/g, "").slice(0, 40).trim() : null;

    if (!safeName) {
      res.status(400).send("Invalid name parameter");
      return;
    }

    try {
      const imageBuffer = await generateOgImage(type as "county" | "town", safeName, safeCounty);

      res.set({
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
        "X-OG-Type": type,
        "X-OG-Name": safeName,
      });
      res.send(imageBuffer);
    } catch (err) {
      console.error("[OG Image] Generation error:", err);
      res.status(500).send("Image generation failed");
    }
  });
}

// ── URL helper (used by metaTags.ts) ─────────────────────────────────────────

const PROD_ORIGIN = "https://commercialshotblasting.co.uk";

export function countyOgImageUrl(countyName: string): string {
  return `${PROD_ORIGIN}/api/og-image?type=county&name=${encodeURIComponent(countyName)}`;
}

export function townOgImageUrl(townName: string, countyName: string): string {
  return `${PROD_ORIGIN}/api/og-image?type=town&name=${encodeURIComponent(townName)}&county=${encodeURIComponent(countyName)}`;
}

// ── Blog post OG image generator ─────────────────────────────────────────────

const BLOG_OG_BADGE_COLOURS: Record<string, { bg: string; fg: string }> = {
  "surface preparation": { bg: "#f59e0b", fg: "#0f172a" },
  "shot blasting":       { bg: "#38bdf8", fg: "#0f172a" },
  "technical guide":     { bg: "#6ee7b7", fg: "#0f172a" },
  "industry guide":      { bg: "#c4b5fd", fg: "#0f172a" },
  "case study":          { bg: "#fdba74", fg: "#0f172a" },
  "services":            { bg: "#f59e0b", fg: "#0f172a" },
};

function getBlogBadgeColours(category: string): { bg: string; fg: string } {
  const lower = (category || "").toLowerCase();
  for (const [key, colours] of Object.entries(BLOG_OG_BADGE_COLOURS)) {
    if (lower.includes(key)) return colours;
  }
  return { bg: "#f59e0b", fg: "#0f172a" };
}

function escapeXmlBlog(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Splits a long title into up to 3 lines, each ≤ maxChars characters.
 */
function splitBlogTitle(title: string, maxChars = 32): string[] {
  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (test.length <= maxChars) {
      current = test;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function buildBlogSvg(title: string, category: string): string {
  const W = 1200;
  const H = 630;
  const { bg: badgeBg, fg: badgeFg } = getBlogBadgeColours(category);
  const catLabel = escapeXmlBlog(category || "Shot Blasting");
  const escapedTitle = escapeXmlBlog(title);

  // Font size based on title length
  const fontSize = title.length <= 40 ? 68 : title.length <= 65 ? 56 : 44;
  const maxChars = title.length <= 40 ? 28 : title.length <= 65 ? 32 : 38;
  const lines = splitBlogTitle(title, maxChars);
  const lineH = fontSize + 16;
  const totalTitleH = lines.length * lineH;

  // Vertical positioning
  const badgeY = 44;
  const badgeH = 40;
  const availTop = badgeY + badgeH + 24;
  const availBottom = H - 90 - 24;
  const titleStartY = availTop + Math.floor((availBottom - availTop - totalTitleH) / 2);

  // Badge width (approximate: ~14px per char + 32px padding)
  const badgeW = catLabel.length * 13 + 32;

  const titleLines = lines.map((line, i) => {
    const y = titleStartY + i * lineH + fontSize;
    return `
  <!-- Title shadow line ${i + 1} -->
  <text x="42" y="${y + 2}" font-family="'Arial Black', 'Arial Bold', Arial, sans-serif"
    font-size="${fontSize}" font-weight="900" fill="rgba(0,0,0,0.4)">${escapeXmlBlog(line)}</text>
  <!-- Title line ${i + 1} -->
  <text x="40" y="${y}" font-family="'Arial Black', 'Arial Bold', Arial, sans-serif"
    font-size="${fontSize}" font-weight="900" fill="#ffffff">${escapeXmlBlog(line)}</text>`;
  }).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bgGrad)"/>

  <!-- Diagonal stripes -->
  <g opacity="0.06" stroke="#1a2540" stroke-width="1">
    ${Array.from({ length: 40 }, (_, i) => {
      const x = -H + i * 55;
      return `<line x1="${x}" y1="0" x2="${x + H}" y2="${H}"/>`;
    }).join("")}
  </g>

  <!-- Top amber accent bar -->
  <rect x="0" y="0" width="${W}" height="6" fill="#f59e0b"/>

  <!-- Left amber accent bar -->
  <rect x="0" y="6" width="6" height="${H - 6}" fill="#f59e0b"/>

  <!-- Bottom panel -->
  <rect x="0" y="${H - 90}" width="${W}" height="90" fill="#1e293b"/>
  <rect x="0" y="${H - 91}" width="${W}" height="2" fill="#334155"/>

  <!-- Brand in bottom panel -->
  <text x="40" y="${H - 52}" font-family="'Arial Black', 'Arial Bold', Arial, sans-serif"
    font-size="22" font-weight="900" fill="#f59e0b">CSB</text>
  <text x="82" y="${H - 52}" font-family="Arial, sans-serif"
    font-size="22" font-weight="700" fill="#ffffff"> Commercial Shot Blasting</text>
  <text x="40" y="${H - 27}" font-family="Arial, sans-serif"
    font-size="16" fill="#94a3b8">commercialshotblasting.co.uk</text>

  <!-- Dot grid (top-right) -->
  <g fill="#3d3010">
    ${Array.from({ length: 6 }, (_, row) =>
      Array.from({ length: 6 }, (_, col) => {
        const cx = W - 60 - col * 20;
        const cy = 60 + row * 20;
        return `<circle cx="${cx}" cy="${cy}" r="2"/>`;
      }).join("")
    ).join("")}
  </g>

  <!-- Category badge background -->
  <rect x="40" y="${badgeY}" width="${badgeW}" height="${badgeH}" rx="6" fill="${badgeBg}"/>

  <!-- Category badge text -->
  <text x="56" y="${badgeY + 27}" font-family="'Arial Black', 'Arial Bold', Arial, sans-serif"
    font-size="20" font-weight="900" fill="${badgeFg}">${catLabel}</text>

  ${titleLines}
</svg>`;
}

/**
 * Generates a 1200×630 branded OG image for a blog post and uploads it to S3.
 * Returns the public CDN URL.
 */
export async function generateAndUploadBlogOgImage(
  title: string,
  category: string,
  slug: string
): Promise<string> {
  const { storagePut } = await import("./storage");

  const svg = buildBlogSvg(title, category);
  const buffer = await sharp(Buffer.from(svg))
    .png({ compressionLevel: 6, quality: 90 })
    .toBuffer();

  const key = `blog-og-images/${slug}.png`;
  const { url } = await storagePut(key, buffer, "image/png");
  return url;
}
