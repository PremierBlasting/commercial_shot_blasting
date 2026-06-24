/**
 * Lead Notifications
 *
 * Handles two actions when a new contact form submission arrives:
 *  1. Send an email notification to the three CSB notification addresses via Resend
 *  2. Create a contact in the CSB HubSpot account so lead_sync_v2.py picks it up
 */

import { Resend } from "resend";

// ─── Configuration ────────────────────────────────────────────────────────────

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const HUBSPOT_CSB_TOKEN = process.env.HUBSPOT_CSB_TOKEN ?? "";
const HUBSPOT_BASE_URL = "https://api.hubapi.com";

// Notification recipients
const NOTIFICATION_RECIPIENTS = [
  "enquiry@premierblasting.co.uk",
  "chris@premierblasting.co.uk",
  "info@optimised.marketing",
];

// From address — must be a verified Resend domain sender
const FROM_ADDRESS = "leads@commercialshotblasting.co.uk";

// ─── Email Notification ────────────────────────────────────────────────────────

export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

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

  const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="background: #1a3a5c; padding: 20px; border-radius: 8px 8px 0 0;">
    <h1 style="color: #ffffff; margin: 0; font-size: 20px;">🔔 New Lead — Commercial Shot Blasting</h1>
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
    </table>
    <div style="margin-top: 20px; padding: 12px; background: #e8f0f8; border-radius: 6px; font-size: 13px; color: #555;">
      This lead was submitted via <strong>commercialshotblasting.co.uk</strong> and has been added to CSB HubSpot for the lead sync pipeline.
    </div>
  </div>
</body>
</html>`;

  const textBody = `New Lead — Commercial Shot Blasting
Submitted: ${submittedAt}

Name:    ${lead.name}
Email:   ${lead.email}
Phone:   ${lead.phone ?? "Not provided"}
Message: ${lead.message}

This lead was submitted via commercialshotblasting.co.uk`;

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: NOTIFICATION_RECIPIENTS,
      subject: `New Lead: ${lead.name} — Commercial Shot Blasting`,
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

// ─── HubSpot Contact Creation ──────────────────────────────────────────────────

export async function createHubSpotContact(lead: LeadData): Promise<boolean> {
  if (!HUBSPOT_CSB_TOKEN) {
    console.warn("[LeadNotifications] HUBSPOT_CSB_TOKEN not set — skipping HubSpot contact creation");
    return false;
  }

  // Parse name into first/last
  const nameParts = lead.name.trim().split(/\s+/);
  const firstname = nameParts[0] ?? lead.name;
  const lastname = nameParts.slice(1).join(" ") || "";

  const properties: Record<string, string> = {
    email: lead.email,
    firstname,
    ...(lastname && { lastname }),
    ...(lead.phone && { phone: lead.phone }),
    // Mark as a CSB website lead
    lifecyclestage: "lead",
    hs_lead_status: "NEW",
    // Store the enquiry message in the HubSpot 'message' field
    message: `COMMERCIAL SHOT BLASTING WEBSITE LEAD\n\n${lead.message}`,
  };

  const url = `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts`;
  const headers = {
    Authorization: `Bearer ${HUBSPOT_CSB_TOKEN}`,
    "Content-Type": "application/json",
  };

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ properties }),
    });

    if (resp.status === 201) {
      const data = await resp.json() as { id?: string };
      console.log(`[LeadNotifications] HubSpot contact created: ${lead.email} (ID: ${data.id})`);
      return true;
    } else if (resp.status === 409) {
      // Contact already exists — update the existing contact's description to note the new submission
      console.log(`[LeadNotifications] HubSpot contact already exists for ${lead.email} — updating`);
      return await updateExistingHubSpotContact(lead, headers);
    } else {
      const body = await resp.text();
      console.error(`[LeadNotifications] HubSpot error ${resp.status}: ${body.slice(0, 200)}`);
      return false;
    }
  } catch (err) {
    console.error("[LeadNotifications] Failed to create HubSpot contact:", err);
    return false;
  }
}

async function updateExistingHubSpotContact(
  lead: LeadData,
  headers: Record<string, string>
): Promise<boolean> {
  // Search for the existing contact by email
  const searchUrl = `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts/search`;
  try {
    const searchResp = await fetch(searchUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        filterGroups: [{ filters: [{ propertyName: "email", operator: "EQ", value: lead.email }] }],
        limit: 1,
        properties: ["email"],
      }),
    });

    if (!searchResp.ok) return false;
    const searchData = await searchResp.json() as { results?: Array<{ id: string }> };
    const contactId = searchData.results?.[0]?.id;
    if (!contactId) return false;

    // Append a note to the description
    const updateUrl = `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts/${contactId}`;
    const updateResp = await fetch(updateUrl, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        properties: {
          message: `COMMERCIAL SHOT BLASTING WEBSITE LEAD (re-submitted)\n\n${lead.message}`,
        },
      }),
    });

    return updateResp.ok;
  } catch (err) {
    console.error("[LeadNotifications] Failed to update existing HubSpot contact:", err);
    return false;
  }
}

// ─── Combined Handler ──────────────────────────────────────────────────────────

/**
 * Fire-and-forget: send email notification + create HubSpot contact.
 * Errors are logged but do NOT throw — the form submission itself must always succeed.
 */
export async function notifyNewLead(lead: LeadData): Promise<void> {
  await Promise.allSettled([
    sendLeadNotificationEmail(lead),
    createHubSpotContact(lead),
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
