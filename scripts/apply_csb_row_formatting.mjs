/**
 * Apply CSB brand colour formatting to:
 * 1. Sophie's row (2344) — immediate fix
 * 2. Add a conditional formatting rule so ALL future rows where column O
 *    contains "COMMERCIAL SHOT BLASTING" are automatically highlighted
 *
 * CSB brand colours:
 *   Primary steel blue: #2C5F7F  → light tint for bg: #D6E8F2
 *   Accent amber/gold:  #E8B84A  → used for column A (key identifier)
 *   Deep navy:          #1a3d52  → used for text
 */

const GOOGLE_CLIENT_ID = "708251633389-bfhjsi8bgolunbaf73q2741qi8fq5kek.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GOOGLE_REFRESH_TOKEN = "1//056-2TSxPrIVCCgYIARAAGAUSNwF-L9IrvoWwc8tfVbVJ35RnLi2nfC46qT0GIyGUCJVr9IrWM5C9-XROGOP-yh5HEvPt9BKoEq8";
const SPREADSHEET_ID = "147rTC7zNoZ3fP4eDR6D_HcPNRo203pzG7htsagjDBec";
const SHEET_ID = 65124931; // "2026 Leads" tab sheetId

// Helper: hex to RGB object for Sheets API (0–1 range)
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { red: r, green: g, blue: b };
}

// CSB brand colours
const CSB_BG_LIGHT   = hexToRgb("#D6E8F2"); // light steel blue tint — row background
const CSB_BG_MID     = hexToRgb("#B8D8ED"); // slightly deeper — gradient mid
const CSB_AMBER      = hexToRgb("#E8B84A"); // amber/gold — column A accent
const CSB_NAVY_TEXT  = hexToRgb("#1a3d52"); // deep navy — text colour

// Get access token
const tokenResp = await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    refresh_token: GOOGLE_REFRESH_TOKEN,
    grant_type: "refresh_token",
  }),
});
const { access_token } = await tokenResp.json();
if (!access_token) { console.error("No token"); process.exit(1); }

// Row 2344 = 0-indexed row 2343
const SOPHIE_ROW_INDEX = 2343;

const requests = [
  // ── 1. Apply amber background to column A (key identifier cell) ──────────
  {
    repeatCell: {
      range: {
        sheetId: SHEET_ID,
        startRowIndex: SOPHIE_ROW_INDEX,
        endRowIndex: SOPHIE_ROW_INDEX + 1,
        startColumnIndex: 0, // A
        endColumnIndex: 1,
      },
      cell: {
        userEnteredFormat: {
          backgroundColor: CSB_AMBER,
          textFormat: { bold: true, foregroundColor: CSB_NAVY_TEXT },
        },
      },
      fields: "userEnteredFormat(backgroundColor,textFormat)",
    },
  },
  // ── 2. Apply light steel blue background to columns B–S ──────────────────
  {
    repeatCell: {
      range: {
        sheetId: SHEET_ID,
        startRowIndex: SOPHIE_ROW_INDEX,
        endRowIndex: SOPHIE_ROW_INDEX + 1,
        startColumnIndex: 1, // B
        endColumnIndex: 19, // S
      },
      cell: {
        userEnteredFormat: {
          backgroundColor: CSB_BG_LIGHT,
          textFormat: { foregroundColor: CSB_NAVY_TEXT },
        },
      },
      fields: "userEnteredFormat(backgroundColor,textFormat)",
    },
  },
  // ── 3. Add conditional formatting rule for ALL future CSB rows ────────────
  // Rule: if column O (index 14) contains "COMMERCIAL SHOT BLASTING"
  // → apply amber on col A, light steel blue on cols B–S
  {
    addConditionalFormatRule: {
      rule: {
        ranges: [
          {
            sheetId: SHEET_ID,
            startRowIndex: 1,    // skip header row
            startColumnIndex: 0, // A
            endColumnIndex: 1,   // just column A
          },
        ],
        booleanRule: {
          condition: {
            type: "CUSTOM_FORMULA",
            values: [{ userEnteredValue: '=ISNUMBER(SEARCH("COMMERCIAL SHOT BLASTING",$O2))' }],
          },
          format: {
            backgroundColor: CSB_AMBER,
            textFormat: { bold: true, foregroundColor: CSB_NAVY_TEXT },
          },
        },
      },
      index: 0,
    },
  },
  {
    addConditionalFormatRule: {
      rule: {
        ranges: [
          {
            sheetId: SHEET_ID,
            startRowIndex: 1,    // skip header row
            startColumnIndex: 1, // B
            endColumnIndex: 19,  // S
          },
        ],
        booleanRule: {
          condition: {
            type: "CUSTOM_FORMULA",
            values: [{ userEnteredValue: '=ISNUMBER(SEARCH("COMMERCIAL SHOT BLASTING",$O2))' }],
          },
          format: {
            backgroundColor: CSB_BG_LIGHT,
            textFormat: { foregroundColor: CSB_NAVY_TEXT },
          },
        },
      },
      index: 1,
    },
  },
];

const resp = await fetch(
  `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}:batchUpdate`,
  {
    method: "POST",
    headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ requests }),
  }
);

if (!resp.ok) {
  console.error("Batch update failed:", await resp.text());
  process.exit(1);
}

const result = await resp.json();
console.log("✅ CSB brand formatting applied to Sophie's row (2344)");
console.log("   Column A: amber/gold background (#E8B84A) with bold navy text");
console.log("   Columns B–S: light steel blue background (#D6E8F2) with navy text");
console.log("✅ Conditional formatting rule added for ALL future CSB rows");
console.log("   Trigger: column O contains 'COMMERCIAL SHOT BLASTING'");
console.log("   Effect: same amber/gold + steel blue colour scheme applied automatically");
console.log("\nReplies:", result.replies?.length ?? 0, "operations completed");
