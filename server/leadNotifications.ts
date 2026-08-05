/**
 * Lead Notifications
 *
 * Handles five actions when a new contact form submission arrives:
 *  1. Send an email notification to all four CSB/PB notification addresses via Resend
 *  2. Create a contact in the CSB HubSpot account (tagged "CSB Website")
 *  3. Create a contact in the Premier Blasting HubSpot account (tagged "CSB Website")
 *  4. Append the lead directly to the Google Sheets "2026 Leads" and "COMMERCIAL SHOT BLASTING LEADS 26" tabs
 *  5. POST the lead as JSON to the cloud computer lead log endpoint
 */

import { Resend } from "resend";

// ─── Configuration ────────────────────────────────────────────────────────────

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const HUBSPOT_CSB_TOKEN = process.env.HUBSPOT_CSB_TOKEN ?? "";
const HUBSPOT_PB_TOKEN = process.env.HUBSPOT_PB_TOKEN ?? "";
const HUBSPOT_BASE_URL = "https://api.hubapi.com";

// Notification recipients — all four addresses receive every lead email
const NOTIFICATION_RECIPIENTS = [
  "info@commercialshotblasting.co.uk",
  "enquiry@premierblasting.co.uk",
  "chris@premierblasting.co.uk",
  "info@optimised.marketing",
];

// From address — must be a verified Resend domain sender
const FROM_ADDRESS = "leads@commercialshotblasting.co.uk";

// Google Sheets configuration (same spreadsheet as lead_sync_v2.py)
const GOOGLE_CLIENT_ID = "708251633389-bfhjsi8bgolunbaf73q2741qi8fq5kek.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GOOGLE_REFRESH_TOKEN = "1//056-2TSxPrIVCCgYIARAAGAUSNwF-L9IrvoWwc8tfVbVJ35RnLi2nfC46qT0GIyGUCJVr9IrWM5C9-XROGOP-yh5HEvPt9BKoEq8";
const SPREADSHEET_ID = "147rTC7zNoZ3fP4eDR6D_HcPNRo203pzG7htsagjDBec";
const SHEET_NAME_MAIN = "2026 Leads";
const SHEET_NAME_CSB = "COMMERCIAL SHOT BLASTING LEADS 26";

// Cloud computer lead log endpoint (port 8767 — CSB lead logger)
const CLOUD_LEAD_LOG_URL = "http://34.77.164.2:8767/csb-lead";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  sourcePage?: string;
  locationName?: string;
  utmData?: Record<string, string>;
  /** Whether the contact ticked the marketing consent checkbox */
  marketingConsent?: boolean;
}

// ─── Email Notification ────────────────────────────────────────────────────────

export async function sendLeadNotificationEmail(lead: LeadData): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn("[LeadNotifications] RESEND_API_KEY not set — skipping email notification");
    return false;
  }

  const resend = new Resend(RESEND_API_KEY);

  const submittedAt = new Date().toLocaleString("en-GB", {
    timeZone: "Europe/London",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Build UTM attribution rows for the email
  const utmRows = lead.utmData && Object.keys(lead.utmData).length > 0
    ? Object.entries(lead.utmData)
        .filter(([, v]) => v)
        .map(([k, v]) => `<tr><td style="padding:6px 0;font-weight:bold;width:180px;color:#555;font-size:12px;">${escapeHtml(k)}</td><td style="padding:6px 0;font-size:12px;">${escapeHtml(v)}</td></tr>`)
        .join("")
    : "";

  const sourceRow = lead.sourcePage
    ? `<tr><td style="padding:8px 0;font-weight:bold;width:120px;color:#555;">Source Page</td><td style="padding:8px 0;font-size:13px;"><a href="${escapeHtml(lead.sourcePage)}" style="color:#1a3a5c;">${escapeHtml(lead.sourcePage)}</a></td></tr>`
    : "";

  const locationRow = lead.locationName
    ? `<tr style="background:#fff;"><td style="padding:8px 0;font-weight:bold;color:#555;">Location</td><td style="padding:8px 0;">${escapeHtml(lead.locationName)}</td></tr>`
    : "";

  const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="background: #1a3a5c; padding: 20px; border-radius: 8px 8px 0 0;">
    <h1 style="color: #ffffff; margin: 0; font-size: 20px;">&#128276; New Lead — Commercial Shot Blasting</h1>
    <p style="color: #a0c4e8; margin: 4px 0 0; font-size: 13px;">${submittedAt}</p>
  </div>
  <div style="background: #f9f9f9; padding: 24px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #555;">Name</td>
        <td style="padding: 8px 0;">${escapeHtml(lead.name)}</td>
      </tr>
      <tr style="background: #fff;">
        <td style="padding: 8px 0; font-weight: bold; color: #555;">Email</td>
        <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(lead.email)}" style="color: #1a3a5c;">${escapeHtml(lead.email)}</a></td>
      </tr>
      ${lead.phone ? `
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone</td>
        <td style="padding: 8px 0;"><a href="tel:${escapeHtml(lead.phone)}" style="color: #1a3a5c;">${escapeHtml(lead.phone)}</a></td>
      </tr>` : ""}
      <tr style="background: #fff;">
        <td style="padding: 8px 0; font-weight: bold; color: #555; vertical-align: top;">Message</td>
        <td style="padding: 8px 0; white-space: pre-wrap;">${escapeHtml(lead.message)}</td>
      </tr>
      ${sourceRow}
      ${locationRow}
    </table>

    ${utmRows ? `
    <div style="margin-top: 20px; padding: 12px; background: #f0f4f8; border-radius: 6px; border: 1px solid #d0dce8;">
      <p style="margin: 0 0 8px; font-weight: bold; font-size: 13px; color: #1a3a5c;">Attribution Data</p>
      <table style="width: 100%; border-collapse: collapse;">${utmRows}</table>
    </div>` : ""}

    <div style="margin-top: 20px; padding: 12px; background: #e8f0f8; border-radius: 6px; font-size: 13px; color: #555;">
      This lead was submitted via <strong>commercialshotblasting.co.uk</strong> and has been added to both CSB and Premier Blasting HubSpot accounts and the Google Leads Sheet.
    </div>

    <div style="margin-top: 16px; text-align: center;">
      <a href="tel:${lead.phone ? escapeHtml(lead.phone) : '07721375756'}" style="display:inline-block;background:#1a3a5c;color:#fff;padding:10px 24px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;">
        Call ${lead.phone ? escapeHtml(lead.phone) : 'Lead Now'}
      </a>
    </div>
  </div>
</body>
</html>`;

  const utmText = lead.utmData && Object.keys(lead.utmData).length > 0
    ? "\n\nAttribution:\n" + Object.entries(lead.utmData).filter(([, v]) => v).map(([k, v]) => `  ${k}: ${v}`).join("\n")
    : "";

  const textBody = `New Lead — Commercial Shot Blasting
Submitted: ${submittedAt}

Name:     ${lead.name}
Email:    ${lead.email}
Phone:    ${lead.phone ?? "Not provided"}
Message:  ${lead.message}
Page:     ${lead.sourcePage ?? "Not captured"}
Location: ${lead.locationName ?? "Not specified"}${utmText}

This lead was submitted via commercialshotblasting.co.uk`;

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: NOTIFICATION_RECIPIENTS,
      subject: `New Lead: ${lead.name}${lead.locationName ? ` — ${lead.locationName}` : ""} | Commercial Shot Blasting`,
      html: htmlBody,
      text: textBody,
    });

    if (error) {
      console.error("[LeadNotifications] Resend error:", error);
      return false;
    }

    console.log(`[LeadNotifications] Email notification sent for lead: ${lead.email}`);
    return true;
  } catch (err) {
    console.error("[LeadNotifications] Failed to send email notification:", err);
    return false;
  }
}

// ─── HubSpot Helpers ──────────────────────────────────────────────────────────

function parseNameParts(fullName: string): { firstname: string; lastname: string } {
  const parts = fullName.trim().split(/\s+/);
  return {
    firstname: parts[0] ?? fullName,
    lastname: parts.slice(1).join(" ") || "",
  };
}

async function hubspotPost(url: string, token: string, body: unknown): Promise<Response> {
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

async function hubspotPatch(url: string, token: string, body: unknown): Promise<Response> {
  return fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

async function findContactIdByEmail(email: string, token: string): Promise<string | null> {
  const resp = await hubspotPost(
    `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts/search`,
    token,
    {
      filterGroups: [{ filters: [{ propertyName: "email", operator: "EQ", value: email }] }],
      limit: 1,
      properties: ["email"],
    }
  );
  if (!resp.ok) return null;
  const data = await resp.json() as { results?: Array<{ id: string }> };
  return data.results?.[0]?.id ?? null;
}

// ─── CSB HubSpot Contact ──────────────────────────────────────────────────────

export async function createHubSpotContact(lead: LeadData): Promise<boolean> {
  if (!HUBSPOT_CSB_TOKEN) {
    console.warn("[LeadNotifications] HUBSPOT_CSB_TOKEN not set — skipping CSB HubSpot contact");
    return false;
  }

  const { firstname, lastname } = parseNameParts(lead.name);

  const messageBody = [
    "*** CSB LEAD — COMMERCIAL SHOT BLASTING WEBSITE ***",
    lead.sourcePage ? `Source: ${lead.sourcePage}` : "",
    lead.locationName ? `Location: ${lead.locationName}` : "",
    "",
    lead.message,
  ].filter(Boolean).join("\n");

  const properties: Record<string, string> = {
    email: lead.email,
    firstname,
    ...(lastname && { lastname }),
    ...(lead.phone && { phone: lead.phone }),
    lifecyclestage: "lead",
    hs_lead_status: "NEW",
    // Source tags — clearly marks this as a CSB website lead in HubSpot reports and filters
    // hs_analytics_source is a valid HubSpot standard property (read-only in some portals but accepted on create)
    // lead_source was removed — it is a custom property that does not exist in either HubSpot account
    message: messageBody,
    // Maps to column J "Notes" in Google Sheet (read by lead_sync_v2.py)
    could_you_please_provide_a_brief_summary_of_your_project: lead.message,
  };

  try {
    const resp = await hubspotPost(
      `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts`,
      HUBSPOT_CSB_TOKEN,
      { properties }
    );

    if (resp.status === 201) {
      const data = await resp.json() as { id?: string };
      console.log(`[LeadNotifications] CSB HubSpot contact created: ${lead.email} (ID: ${data.id})`);
      return true;
    } else if (resp.status === 409) {
      // Update existing contact
      const contactId = await findContactIdByEmail(lead.email, HUBSPOT_CSB_TOKEN);
      if (!contactId) return false;
      const updateResp = await hubspotPatch(
        `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts/${contactId}`,
        HUBSPOT_CSB_TOKEN,
        { properties: { message: `${messageBody}\n\n(re-submitted)` } }
      );
      console.log(`[LeadNotifications] CSB HubSpot contact updated: ${lead.email}`);
      return updateResp.ok;
    } else {
      const body = await resp.text();
      console.error(`[LeadNotifications] CSB HubSpot error ${resp.status}: ${body.slice(0, 200)}`);
      return false;
    }
  } catch (err) {
    console.error("[LeadNotifications] Failed to create CSB HubSpot contact:", err);
    return false;
  }
}

// ─── Premier Blasting HubSpot Contact ────────────────────────────────────────

export async function createPBHubSpotContact(lead: LeadData): Promise<boolean> {
  if (!HUBSPOT_PB_TOKEN) {
    console.warn("[LeadNotifications] HUBSPOT_PB_TOKEN not set — skipping PB HubSpot contact");
    return false;
  }

  const { firstname, lastname } = parseNameParts(lead.name);

  const noteLines = [
    "*** CSB LEAD — COMMERCIAL SHOT BLASTING WEBSITE ***",
    `Submitted via: commercialshotblasting.co.uk`,
    lead.sourcePage ? `Page: ${lead.sourcePage}` : "",
    lead.locationName ? `Location: ${lead.locationName}` : "",
    "",
    lead.message,
  ].filter(Boolean).join("\n");

  const properties: Record<string, string> = {
    email: lead.email,
    firstname,
    ...(lastname && { lastname }),
    ...(lead.phone && { phone: lead.phone }),
    lifecyclestage: "lead",
    // Source tags — clearly marks this as a CSB website lead in PB HubSpot reports and filters
    // lead_source was removed — it is a custom property that does not exist in either HubSpot account
    // The CSB tag is clearly visible in the message field
    message: noteLines,
  };

  try {
    const resp = await hubspotPost(
      `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts`,
      HUBSPOT_PB_TOKEN,
      { properties }
    );

    if (resp.status === 201) {
      const data = await resp.json() as { id?: string };
      console.log(`[LeadNotifications] PB HubSpot contact created: ${lead.email} (ID: ${data.id})`);
      return true;
    } else if (resp.status === 409) {
      // Contact already exists in PB — update with new CSB lead note
      const contactId = await findContactIdByEmail(lead.email, HUBSPOT_PB_TOKEN);
      if (!contactId) return false;
      const updateResp = await hubspotPatch(
        `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts/${contactId}`,
        HUBSPOT_PB_TOKEN,
        { properties: { message: `${noteLines}\n\n(re-submitted)` } }
      );
      console.log(`[LeadNotifications] PB HubSpot contact updated: ${lead.email}`);
      return updateResp.ok;
    } else {
      const body = await resp.text();
      console.error(`[LeadNotifications] PB HubSpot error ${resp.status}: ${body.slice(0, 200)}`);
      return false;
    }
  } catch (err) {
    console.error("[LeadNotifications] Failed to create PB HubSpot contact:", err);
    return false;
  }
}

// ─── Google Sheets Direct Append ─────────────────────────────────────────────

async function getGoogleAccessToken(): Promise<string | null> {
  try {
    const resp = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        refresh_token: GOOGLE_REFRESH_TOKEN,
        grant_type: "refresh_token",
      }),
    });
    if (!resp.ok) {
      const err = await resp.text();
      console.error(`[LeadNotifications] Google token refresh failed: ${err.slice(0, 200)}`);
      return null;
    }
    const data = await resp.json() as { access_token?: string };
    return data.access_token ?? null;
  } catch (err) {
    console.error("[LeadNotifications] Failed to refresh Google token:", err);
    return null;
  }
}

async function appendToSheet(token: string, sheetName: string, row: string[]): Promise<boolean> {
  const encodedSheet = encodeURIComponent(sheetName);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodedSheet}!A:S:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    });
    if (!resp.ok) {
      const err = await resp.text();
      console.error(`[LeadNotifications] Google Sheets append failed for "${sheetName}": ${err.slice(0, 200)}`);
      return false;
    }
    console.log(`[LeadNotifications] Appended lead to Google Sheet tab: "${sheetName}"`);
    return true;
  } catch (err) {
    console.error(`[LeadNotifications] Failed to append to Google Sheet "${sheetName}":`, err);
    return false;
  }
}

export async function appendLeadToGoogleSheets(lead: LeadData): Promise<boolean> {
  const token = await getGoogleAccessToken();
  if (!token) return false;

  const { firstname, lastname } = parseNameParts(lead.name);
  const dateStr = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Build row matching the sheet column structure (A–S) from lead_sync_v2.py
  const row: string[] = [
    lead.email,                          // A: Unique Key (email)
    dateStr,                             // B: Date (DD/MM/YYYY)
    firstname,                           // C: First Name
    lastname,                            // D: Last Name
    lead.email,                          // E: Email
    lead.phone ?? "",                    // F: Phone number
    "",                                  // G: Postal code (not collected in form)
    "COMMERCIAL SHOT BLASTING LEAD",     // H: Method To Contact — clearly labelled
    "",                                  // I: Quoted Amount
    lead.message,                        // J: Notes (project summary)
    "",                                  // K: Service Required
    "",                                  // L: Completion Date
    "",                                  // M: Timeframe
    "",                                  // N: (blank)
    "COMMERCIAL SHOT BLASTING - Website",// O: Traffic Source Drill Down 1
    lead.sourcePage ?? "",               // P: Traffic Source Drill Down 2 (source page)
    "ORGANIC_SEARCH",                    // Q: Web Analytics Source
    "",                                  // R: Listed Building?
    lead.message,                        // S: Project Summary
  ];

  const [mainResult, csbResult] = await Promise.allSettled([
    appendToSheet(token, SHEET_NAME_MAIN, row),
    appendToSheet(token, SHEET_NAME_CSB, row),
  ]);

  const mainOk = mainResult.status === "fulfilled" && mainResult.value;
  const csbOk = csbResult.status === "fulfilled" && csbResult.value;
  return mainOk && csbOk;
}

// ─── HubSpot Workflow Enrolment ─────────────────────────────────────────────

/**
 * Enrol a PB HubSpot contact into the "January 26" workflow (ID: 3647837418).
 * Only called when the contact ticked the marketing consent checkbox.
 * Uses the automation v4 API — requires the `automation` scope on HUBSPOT_PB_TOKEN.
 */
export async function enrollInJanuary26Workflow(email: string): Promise<boolean> {
  if (!HUBSPOT_PB_TOKEN) {
    console.warn("[LeadNotifications] HUBSPOT_PB_TOKEN not set — skipping workflow enrolment");
    return false;
  }

  const WORKFLOW_ID = "3647837418";

  try {
    // First look up the contact ID in PB HubSpot by email
    const contactId = await findContactIdByEmail(email, HUBSPOT_PB_TOKEN);
    if (!contactId) {
      console.warn(`[LeadNotifications] Could not find PB HubSpot contact for ${email} — skipping workflow enrolment`);
      return false;
    }

    // Enrol via the automation/v3 workflows API
    const resp = await fetch(
      `https://api.hubapi.com/automation/v3/workflows/${WORKFLOW_ID}/enrollments/contacts/${contactId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HUBSPOT_PB_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.ok || resp.status === 204) {
      console.log(`[LeadNotifications] Enrolled ${email} (ID: ${contactId}) in January 26 workflow`);
      return true;
    } else {
      const body = await resp.text();
      console.warn(`[LeadNotifications] Workflow enrolment returned ${resp.status}: ${body.slice(0, 200)}`);
      return false;
    }
  } catch (err) {
    console.warn("[LeadNotifications] Workflow enrolment failed (non-critical):", (err as Error).message);
    return false;
  }
}

// ─── Cloud Computer Lead Log ──────────────────────────────────────────────────

export async function logLeadToCloud(lead: LeadData): Promise<boolean> {
  try {
    const resp = await fetch(CLOUD_LEAD_LOG_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        source: "CSB Website",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(5000), // 5-second timeout — non-blocking
    });
    if (!resp.ok) {
      console.warn(`[LeadNotifications] Cloud lead log returned ${resp.status}`);
      return false;
    }
    console.log(`[LeadNotifications] Lead logged to cloud computer: ${lead.email}`);
    return true;
  } catch (err) {
    // Non-critical — log but do not fail the submission
    console.warn("[LeadNotifications] Cloud lead log unavailable (non-critical):", (err as Error).message);
    return false;
  }
}

// ─── Combined Handler ──────────────────────────────────────────────────────────

/**
 * Fire-and-forget: send email + create HubSpot contacts + append to Google Sheets + log to cloud.
 * Errors are logged but do NOT throw — the form submission itself must always succeed.
 */
export async function notifyNewLead(lead: LeadData): Promise<void> {
  // Skip all external calls during automated tests to prevent real emails and
  // HubSpot contact creation from vitest runs.
  if (process.env.NODE_ENV === "test" || process.env.VITEST === "true") {
    console.log("[notifyNewLead] Skipping external calls in test environment.");
    return;
  }

  // Run all five core channels in parallel
  await Promise.allSettled([
    sendLeadNotificationEmail(lead),
    createHubSpotContact(lead),
    createPBHubSpotContact(lead),
    appendLeadToGoogleSheets(lead),
    logLeadToCloud(lead),
  ]);

  // Enrol in the Premier Blasting "January 26" workflow only if the contact
  // explicitly ticked the marketing consent checkbox.
  // Runs after the core channels so the PB HubSpot contact already exists.
  if (lead.marketingConsent) {
    await enrollInJanuary26Workflow(lead.email);
  }
}

// ─── Utility ──────────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
