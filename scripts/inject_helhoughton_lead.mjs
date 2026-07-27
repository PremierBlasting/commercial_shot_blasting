/**
 * One-off script: manually inject the Helhoughton Cemetery Gates lead
 * into all five notification channels (Resend email, CSB HubSpot, PB HubSpot,
 * Google Sheets, cloud computer log).
 *
 * Lead details sourced from email received 2026-07-27 at 15:15 BST.
 * Run: node scripts/inject_helhoughton_lead.mjs
 */

import { config } from "dotenv";
config();

// ── Lead data from the email ──────────────────────────────────────────────────
const lead = {
  name: "Sophie",
  email: "clerk@helhoughtonparishcouncil.gov.uk",
  phone: "",
  message: [
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
  ].join("\n"),
  sourcePage: "https://commercialshotblasting.co.uk/contact",
  locationName: "Helhoughton, Norfolk",
  utmData: {},
};

// ── Import notifyNewLead from the compiled server ─────────────────────────────
// We call each channel directly using the same logic as the production server.

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const HUBSPOT_CSB_TOKEN = process.env.HUBSPOT_CSB_TOKEN ?? "";
const HUBSPOT_PB_TOKEN = process.env.HUBSPOT_PB_TOKEN ?? "";
const SPREADSHEET_ID = "147rTC7zNoZ3fP4eDR6D_HcPNRo203pzG7htsagjDBec";
const CLOUD_LEAD_LOG_URL = "http://34.77.164.2:8767/csb-lead";

const NOTIFICATION_RECIPIENTS = [
  "info@commercialshotblasting.co.uk",
  "enquiry@premierblasting.co.uk",
  "chris@premierblasting.co.uk",
  "info@optimised.marketing",
];

// ── 1. Resend email ───────────────────────────────────────────────────────────
async function sendEmail() {
  if (!RESEND_API_KEY) { console.warn("RESEND_API_KEY not set — skipping email"); return false; }
  const body = `
New lead from Commercial Shot Blasting website (MANUALLY INJECTED — original received 2026-07-27 15:15 BST via HubSpot form):

Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone || "(not provided)"}
Location: ${lead.locationName}
Source: ${lead.sourcePage}

--- MESSAGE ---
${lead.message}
  `.trim();

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "CSB Leads <leads@commercialshotblasting.co.uk>",
      to: NOTIFICATION_RECIPIENTS,
      subject: `[MANUAL INJECT] New Lead: ${lead.name} — ${lead.locationName}`,
      text: body,
    }),
  });
  if (!resp.ok) {
    const err = await resp.text();
    console.error("Email failed:", resp.status, err);
    return false;
  }
  console.log("✅ Email sent to all four recipients");
  return true;
}

// ── 2. CSB HubSpot ────────────────────────────────────────────────────────────
async function createCSBHubSpotContact() {
  if (!HUBSPOT_CSB_TOKEN) { console.warn("HUBSPOT_CSB_TOKEN not set — skipping"); return false; }
  const messageBody = [
    "*** CSB LEAD — COMMERCIAL SHOT BLASTING WEBSITE ***",
    `Source: ${lead.sourcePage}`,
    `Location: ${lead.locationName}`,
    "",
    lead.message,
  ].join("\n");
  const payload = {
    properties: {
      firstname: "Sophie",
      lastname: "(Helhoughton Parish Council Clerk)",
      email: lead.email,
      phone: lead.phone || "",
      lifecyclestage: "lead",
      hs_analytics_source: "ORGANIC_SEARCH",
      message: messageBody,
      could_you_please_provide_a_brief_summary_of_your_project: lead.message,
    },
  };
  const resp = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: { "Authorization": `Bearer ${HUBSPOT_CSB_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const err = await resp.text();
    if (resp.status === 409) {
      console.warn("CSB HubSpot: contact already exists (409) — skipping duplicate");
      return true;
    }
    console.error("CSB HubSpot failed:", resp.status, err);
    return false;
  }
  console.log("✅ CSB HubSpot contact created");
  return true;
}

// ── 3. PB HubSpot ─────────────────────────────────────────────────────────────
async function createPBHubSpotContact() {
  if (!HUBSPOT_PB_TOKEN) { console.warn("HUBSPOT_PB_TOKEN not set — skipping"); return false; }
  const noteLines = [
    "*** CSB LEAD — COMMERCIAL SHOT BLASTING WEBSITE ***",
    `Submitted via: commercialshotblasting.co.uk`,
    `Page: ${lead.sourcePage}`,
    `Location: ${lead.locationName}`,
    "",
    lead.message,
  ].join("\n");
  const payload = {
    properties: {
      firstname: "Sophie",
      lastname: "(Helhoughton Parish Council Clerk)",
      email: lead.email,
      phone: lead.phone || "",
      lifecyclestage: "lead",
      hs_analytics_source: "ORGANIC_SEARCH",
      message: noteLines,
    },
  };
  const resp = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: { "Authorization": `Bearer ${HUBSPOT_PB_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const err = await resp.text();
    if (resp.status === 409) {
      console.warn("PB HubSpot: contact already exists (409) — skipping duplicate");
      return true;
    }
    console.error("PB HubSpot failed:", resp.status, err);
    return false;
  }
  console.log("✅ PB HubSpot contact created");
  return true;
}

// ── 4. Google Sheets ──────────────────────────────────────────────────────────
async function appendToGoogleSheets() {
  // Use the same Google OAuth credentials as lead_sync_v2.py
  const GOOGLE_CLIENT_ID = "708251633389-bfhjsi8bgolunbaf73q2741qi8fq5kek.apps.googleusercontent.com";
  const GOOGLE_CLIENT_SECRET = "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";
  const GOOGLE_REFRESH_TOKEN = "1//056-2TSxPrIVCCgYIARAAGAUSNwF-L9IrvoWwc8tfVbVJ35RnLi2nfC46qT0GIyGUCJVr9IrWM5C9-XROGOP-yh5HEvPt9BKoEq8";

  // Refresh token
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
  if (!tokenResp.ok) {
    console.error("Google token refresh failed:", await tokenResp.text());
    return false;
  }
  const { access_token } = await tokenResp.json();

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const row = [
    lead.email,                            // A: Unique Key
    today,                                 // B: Date
    "Sophie",                              // C: First Name
    "(Helhoughton Parish Council Clerk)",  // D: Last Name
    lead.email,                            // E: Email
    "",                                    // F: Phone
    "",                                    // G: Postal Code
    "COMMERCIAL SHOT BLASTING LEAD",       // H: Method To Contact
    "",                                    // I: Quoted Amount
    lead.message,                          // J: Notes
    "Structural Steelwork / Metal Restoration", // K: Service Required
    "",                                    // L: Completion Date
    "By 17 August 2026",                   // M: Timeframe
    "",                                    // N: (blank)
    "COMMERCIAL SHOT BLASTING - Direct Enquiry", // O: Traffic Source
    "",                                    // P: Traffic Source Drill Down 2
    "Direct",                              // Q: Web Analytics Source
    "",                                    // R: Listed Building?
    lead.message,                          // S: Project Summary
  ];

  // Append to CSB tab
  const sheetName = "COMMERCIAL SHOT BLASTING LEADS 26";
  const range = encodeURIComponent(`${sheetName}!A:S`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const sheetResp = await fetch(url, {
    method: "POST",
    headers: { "Authorization": `Bearer ${access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ values: [row] }),
  });
  if (!sheetResp.ok) {
    console.error("Google Sheets (CSB tab) failed:", await sheetResp.text());
    return false;
  }
  console.log("✅ Google Sheets (CSB tab) row appended");
  return true;
}

// ── 5. Cloud computer log ─────────────────────────────────────────────────────
async function logToCloud() {
  try {
    const resp = await fetch(CLOUD_LEAD_LOG_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        source: "CSB Website (manual inject)",
        submittedAt: "2026-07-27T14:15:00.000Z", // original submission time (15:15 BST = 14:15 UTC)
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!resp.ok) {
      console.warn("Cloud log returned", resp.status);
      return false;
    }
    console.log("✅ Lead logged to cloud computer");
    return true;
  } catch (err) {
    console.warn("Cloud log unavailable:", err.message);
    return false;
  }
}

// ── Run all channels ──────────────────────────────────────────────────────────
console.log("Injecting Helhoughton Cemetery Gates lead into all five channels...\n");
const [emailOk, csbOk, pbOk, sheetsOk, cloudOk] = await Promise.allSettled([
  sendEmail(),
  createCSBHubSpotContact(),
  createPBHubSpotContact(),
  appendToGoogleSheets(),
  logToCloud(),
]);

console.log("\n── Summary ──────────────────────────────────────────────");
console.log("Email (all 4 recipients):", emailOk.status === "fulfilled" && emailOk.value ? "✅" : "❌");
console.log("CSB HubSpot:             ", csbOk.status === "fulfilled" && csbOk.value ? "✅" : "❌");
console.log("PB HubSpot:              ", pbOk.status === "fulfilled" && pbOk.value ? "✅" : "❌");
console.log("Google Sheets:           ", sheetsOk.status === "fulfilled" && sheetsOk.value ? "✅" : "❌");
console.log("Cloud log:               ", cloudOk.status === "fulfilled" && cloudOk.value ? "✅" : "❌");
