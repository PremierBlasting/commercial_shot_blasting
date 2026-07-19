/**
 * Lead Notifications
 *
 * Handles three actions when a new contact form submission arrives:
 *  1. Send an email notification to the three CSB notification addresses via Resend
 *  2. Create a contact in the CSB HubSpot account (so lead_sync_v2.py picks it up for Google Sheet)
 *  3. Create a contact in the Premier Blasting HubSpot account, tagged as a CSB lead
 */

import { Resend } from "resend";

// ─── Configuration ────────────────────────────────────────────────────────────

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const HUBSPOT_CSB_TOKEN = process.env.HUBSPOT_CSB_TOKEN ?? "";
const HUBSPOT_PB_TOKEN = process.env.HUBSPOT_PB_TOKEN ?? "";
const HUBSPOT_BASE_URL = "https://api.hubapi.com";

// Notification recipients
const NOTIFICATION_RECIPIENTS = [
  "enquiry@premierblasting.co.uk",
  "chris@premierblasting.co.uk",
  "info@optimised.marketing",
];

// From address — must be a verified Resend domain sender
const FROM_ADDRESS = "leads@commercialshotblasting.co.uk";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  sourcePage?: string;
  locationName?: string;
  utmData?: Record<string, string>;
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
      This lead was submitted via <strong>commercialshotblasting.co.uk</strong> and has been added to both CSB and Premier Blasting HubSpot accounts.
    </div>

    <div style="margin-top: 16px; text-align: center;">
      <a href="tel:${lead.phone ? escapeHtml(lead.phone) : '07970566409'}" style="display:inline-block;background:#1a3a5c;color:#fff;padding:10px 24px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;">
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
    "COMMERCIAL SHOT BLASTING WEBSITE LEAD",
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
    "*** COMMERCIAL SHOT BLASTING LEAD ***",
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
    // Note: PB HubSpot uses custom hs_lead_status values — do not set it here
    // The CSB tag is in the message field, matching what lead_sync_v2.py sets
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

// ─── Combined Handler ──────────────────────────────────────────────────────────

/**
 * Fire-and-forget: send email notification + create contacts in both HubSpot accounts.
 * Errors are logged but do NOT throw — the form submission itself must always succeed.
 */
export async function notifyNewLead(lead: LeadData): Promise<void> {
  // Skip all external calls during automated tests to prevent real emails and
  // HubSpot contact creation from vitest runs.
  if (process.env.NODE_ENV === "test" || process.env.VITEST === "true") {
    console.log("[notifyNewLead] Skipping external calls in test environment.");
    return;
  }
  await Promise.allSettled([
    sendLeadNotificationEmail(lead),
    createHubSpotContact(lead),
    createPBHubSpotContact(lead),
  ]);
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
