/**
 * One-off diagnostic: read column headers from "2026 Leads" tab
 * and check Sophie's row (row 2344) to see what's in each column.
 */

const GOOGLE_CLIENT_ID = "708251633389-bfhjsi8bgolunbaf73q2741qi8fq5kek.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GOOGLE_REFRESH_TOKEN = "1//056-2TSxPrIVCCgYIARAAGAUSNwF-L9IrvoWwc8tfVbVJ35RnLi2nfC46qT0GIyGUCJVr9IrWM5C9-XROGOP-yh5HEvPt9BKoEq8";
const SPREADSHEET_ID = "147rTC7zNoZ3fP4eDR6D_HcPNRo203pzG7htsagjDBec";

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

// Read header row (row 1) from 2026 Leads tab
const headerRange = encodeURIComponent("2026 Leads!A1:Z1");
const headerResp = await fetch(
  `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${headerRange}`,
  { headers: { Authorization: `Bearer ${access_token}` } }
);
const headerData = await headerResp.json();
const headers = headerData.values?.[0] ?? [];
console.log("\n=== Column Headers (2026 Leads tab) ===");
headers.forEach((h, i) => {
  const col = String.fromCharCode(65 + i);
  console.log(`  ${col}: ${h}`);
});

// Read Sophie's row (row 2344) — check what's there
const sophieRange = encodeURIComponent("2026 Leads!A2344:Z2344");
const sophieResp = await fetch(
  `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sophieRange}`,
  { headers: { Authorization: `Bearer ${access_token}` } }
);
const sophieData = await sophieResp.json();
const sophieRow = sophieData.values?.[0] ?? [];
console.log("\n=== Sophie's Row (2344) ===");
sophieRow.forEach((v, i) => {
  const col = String.fromCharCode(65 + i);
  const header = headers[i] ?? "?";
  console.log(`  ${col} (${header}): ${v}`);
});
