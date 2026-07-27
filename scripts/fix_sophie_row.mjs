/**
 * Fix Sophie's row (2344) in the "2026 Leads" tab with all correct data.
 * Uses batchUpdate to write specific cells rather than overwriting the whole row.
 */

const GOOGLE_CLIENT_ID = "708251633389-bfhjsi8bgolunbaf73q2741qi8fq5kek.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GOOGLE_REFRESH_TOKEN = "1//056-2TSxPrIVCCgYIARAAGAUSNwF-L9IrvoWwc8tfVbVJ35RnLi2nfC46qT0GIyGUCJVr9IrWM5C9-XROGOP-yh5HEvPt9BKoEq8";
const SPREADSHEET_ID = "147rTC7zNoZ3fP4eDR6D_HcPNRo203pzG7htsagjDBec";

const notes = [
  "Service Required: Structural Steelwork / Metal Restoration",
  "Organisation: Helhoughton Parish Council",
  "Project: Refurbishment of cemetery gates",
  "Work involves: removing existing paint by blasting, restoration/repairs, treating metal to prevent corrosion, repainting.",
  "Gate dimensions: Width 114 inches, Height 64 inches",
  "Questions asked:",
  "  - Whether restoration work would be carried out on-site or off-site",
  "  - The treatment process, paint system, and expected lifespan of the finish",
  "  - Whether repairs are included",
  "  - Earliest available start date",
  "  - Estimated duration of the work",
  "  - Detailed quotation for the restoration",
  "  - Validity of the quotation",
  "Quotation required by: 17 August 2026 (for Parish Council agenda papers)",
  "Contact: Sophie (Clerk, Helhoughton Parish Council)",
  "Original email received: 2026-07-27 15:15 BST via HubSpot form",
  "Note: This lead was manually injected after the HubSpot form bypassed the native notification system.",
].join("\n");

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

// Use batchUpdate to write specific ranges in row 2344
// Column mapping (1-indexed): H=8, J=10, K=11, M=13, O=15, S=19
const updates = [
  { range: "2026 Leads!H2344", values: [["CSB WEBSITE LEAD"]] },
  { range: "2026 Leads!J2344", values: [[notes]] },
  { range: "2026 Leads!K2344", values: [["Structural Steelwork / Metal Restoration"]] },
  { range: "2026 Leads!M2344", values: [["By 17 August 2026"]] },
  { range: "2026 Leads!O2344", values: [["COMMERCIAL SHOT BLASTING - Website"]] },
  { range: "2026 Leads!P2344", values: [["https://commercialshotblasting.co.uk/contact"]] },
  { range: "2026 Leads!S2344", values: [[notes]] },
];

const batchResp = await fetch(
  `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchUpdate`,
  {
    method: "POST",
    headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      valueInputOption: "USER_ENTERED",
      data: updates,
    }),
  }
);

if (!batchResp.ok) {
  console.error("Batch update failed:", await batchResp.text());
  process.exit(1);
}
const result = await batchResp.json();
console.log(`✅ Updated ${result.totalUpdatedCells} cells in Sophie's row (2344)`);
console.log("Columns updated: H (Method To Contact), J (Notes), K (Service Required), M (Timeframe), O (Traffic Source), P (Traffic Source Drill Down 2), S (Project Summary)");
