/**
 * Lead Notifications Integration Tests
 *
 * Validates that all five notification channels are correctly configured:
 *  1. RESEND_API_KEY is set and accepted by the Resend API
 *  2. HUBSPOT_CSB_TOKEN is set and accepted by the HubSpot API
 *  3. HUBSPOT_PB_TOKEN is set and accepted by the HubSpot API
 *  4. notifyNewLead() runs without throwing (with source page + UTM data)
 *  5. All four email recipients are present in the NOTIFICATION_RECIPIENTS list
 *  6. Both HubSpot contact creation calls include "CSB Website" lead_source tag
 *  7. Google Sheets append function is exported and callable
 *  8. Cloud computer lead log function is exported and callable
 */

import { describe, it, expect } from "vitest";
import { Resend } from "resend";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const HUBSPOT_CSB_TOKEN = process.env.HUBSPOT_CSB_TOKEN ?? "";
const HUBSPOT_PB_TOKEN = process.env.HUBSPOT_PB_TOKEN ?? "";
const HUBSPOT_BASE_URL = "https://api.hubapi.com";

describe("Lead Notification Credentials", () => {
  it("RESEND_API_KEY is set", () => {
    expect(RESEND_API_KEY.length).toBeGreaterThan(0);
  });

  it("HUBSPOT_CSB_TOKEN is set", () => {
    expect(HUBSPOT_CSB_TOKEN.length).toBeGreaterThan(0);
  });

  it("HUBSPOT_PB_TOKEN is set", () => {
    expect(HUBSPOT_PB_TOKEN.length).toBeGreaterThan(0);
  });

  it("Resend API key is valid (can list domains)", async () => {
    expect(RESEND_API_KEY.length).toBeGreaterThan(0);
    const resend = new Resend(RESEND_API_KEY);
    const { data, error } = await resend.domains.list();
    expect(error).toBeNull();
    expect(data).toBeDefined();
    const domains = data?.data ?? [];
    console.log("[Resend] Domains:", domains.map((d: { name: string }) => d.name));
    expect(domains.length).toBeGreaterThan(0);
  }, 15000);

  it("HubSpot CSB token is valid (can call contacts API)", async () => {
    expect(HUBSPOT_CSB_TOKEN.length).toBeGreaterThan(0);
    const resp = await fetch(`${HUBSPOT_BASE_URL}/crm/v3/objects/contacts?limit=1`, {
      headers: {
        Authorization: `Bearer ${HUBSPOT_CSB_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    expect(resp.status).toBe(200);
    const data = await resp.json() as { results?: unknown[] };
    console.log("[HubSpot CSB] API response status:", resp.status);
    expect(data.results).toBeDefined();
  }, 15000);

  it("HubSpot PB token is valid (can call contacts API)", async () => {
    expect(HUBSPOT_PB_TOKEN.length).toBeGreaterThan(0);
    const resp = await fetch(`${HUBSPOT_BASE_URL}/crm/v3/objects/contacts?limit=1`, {
      headers: {
        Authorization: `Bearer ${HUBSPOT_PB_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    expect(resp.status).toBe(200);
    const data = await resp.json() as { results?: unknown[] };
    console.log("[HubSpot PB] API response status:", resp.status);
    expect(data.results).toBeDefined();
  }, 15000);
});

describe("NOTIFICATION_RECIPIENTS", () => {
  it("includes all four required email addresses", () => {
    const __filename = fileURLToPath(import.meta.url);
    const src = readFileSync(join(dirname(__filename), "leadNotifications.ts"), "utf-8");
    expect(src).toContain("info@commercialshotblasting.co.uk");
    expect(src).toContain("enquiry@premierblasting.co.uk");
    expect(src).toContain("chris@premierblasting.co.uk");
    expect(src).toContain("info@optimised.marketing");
  });
});

describe("HubSpot Lead Source Tags", () => {
  it("CSB HubSpot contact creation does NOT include lead_source (non-existent property) and CSB tag is in message", () => {
    const __filename = fileURLToPath(import.meta.url);
    const src = readFileSync(join(dirname(__filename), "leadNotifications.ts"), "utf-8");
    // lead_source was removed — it is a custom property that does not exist in either HubSpot account
    // and caused 400 errors on every contact creation attempt
    expect(src).not.toContain('lead_source: "CSB Website"');
    // The CSB identifier is now carried in the message body
    expect(src).toContain("*** CSB LEAD — COMMERCIAL SHOT BLASTING WEBSITE ***");
  });

  it("CSB HubSpot contact message includes *** CSB LEAD *** marker", () => {
    const __filename = fileURLToPath(import.meta.url);
    const src = readFileSync(join(dirname(__filename), "leadNotifications.ts"), "utf-8");
    expect(src).toContain("*** CSB LEAD — COMMERCIAL SHOT BLASTING WEBSITE ***");
  });

  it("Google Sheets row includes COMMERCIAL SHOT BLASTING LEAD label in column H", () => {
    const __filename = fileURLToPath(import.meta.url);
    const src = readFileSync(join(dirname(__filename), "leadNotifications.ts"), "utf-8");
    expect(src).toContain("COMMERCIAL SHOT BLASTING LEAD");
    expect(src).toContain("COMMERCIAL SHOT BLASTING - Website");
  });
});

describe("Lead Channel Exports", () => {
  it("appendLeadToGoogleSheets is exported", async () => {
    const mod = await import("./leadNotifications");
    expect(typeof mod.appendLeadToGoogleSheets).toBe("function");
  });

  it("logLeadToCloud is exported", async () => {
    const mod = await import("./leadNotifications");
    expect(typeof mod.logLeadToCloud).toBe("function");
  });

  it("createHubSpotContact is exported", async () => {
    const mod = await import("./leadNotifications");
    expect(typeof mod.createHubSpotContact).toBe("function");
  });

  it("createPBHubSpotContact is exported", async () => {
    const mod = await import("./leadNotifications");
    expect(typeof mod.createPBHubSpotContact).toBe("function");
  });

  it("sendLeadNotificationEmail is exported", async () => {
    const mod = await import("./leadNotifications");
    expect(typeof mod.sendLeadNotificationEmail).toBe("function");
  });

  it("sendCustomerQuoteConfirmationEmail is exported", async () => {
    const mod = await import("./leadNotifications");
    expect(typeof mod.sendCustomerQuoteConfirmationEmail).toBe("function");
  });

  it("enrollInJanuary26Workflow is exported", async () => {
    const mod = await import("./leadNotifications");
    expect(typeof mod.enrollInJanuary26Workflow).toBe("function");
  });
});

describe("notifyNewLead()", () => {
  it("returns early without sending real emails or HubSpot contacts in test environment", async () => {
    // The NODE_ENV=test guard in notifyNewLead() prevents real external calls.
    // This test verifies the guard works — no emails or HubSpot contacts are created.
    const { notifyNewLead } = await import("./leadNotifications");
    await expect(
      notifyNewLead({
        name: "Test Lead CSB",
        email: "test-csb-lead-vitest@gmail.com",
        phone: "07700 900000",
        message: "Vitest integration test — please ignore",
        sourcePage: "https://commercialshotblasting.co.uk/service-areas/birmingham",
        locationName: "Birmingham",
        utmData: {
          lt_utm_source: "google",
          lt_utm_medium: "cpc",
          lt_utm_campaign: "csb_adwords_test",
          lt_gclid: "test-gclid-123",
        },
      })
    ).resolves.toBeUndefined(); // Guard returns early (undefined) without throwing
  }, 5000); // Fast — no real network calls made

  it("accepts marketingConsent: true without throwing in test environment", async () => {
    const { notifyNewLead } = await import("./leadNotifications");
    await expect(
      notifyNewLead({
        name: "Consent Test Lead",
        email: "consent-test@gmail.com",
        phone: "07700 900001",
        message: "Consent test — please ignore",
        marketingConsent: true,
      })
    ).resolves.toBeUndefined();
  }, 5000);

  it("accepts marketingConsent: false without throwing in test environment", async () => {
    const { notifyNewLead } = await import("./leadNotifications");
    await expect(
      notifyNewLead({
        name: "No Consent Test Lead",
        email: "no-consent-test@gmail.com",
        phone: "07700 900002",
        message: "No consent test — please ignore",
        marketingConsent: false,
      })
    ).resolves.toBeUndefined();
  }, 5000);
});

describe("Customer CHAS Elite confirmation", () => {
  it("includes a transactional client reassurance note and excludes phone-only placeholder addresses", () => {
    const __filename = fileURLToPath(import.meta.url);
    const src = readFileSync(join(dirname(__filename), "leadNotifications.ts"), "utf-8");
    expect(src).toContain("CHAS Elite assurance");
    expect(src).toContain("recognised safety pre-qualification starting point");
    expect(src).toContain('!lead.email.endsWith("@sms.placeholder")');
  });
});
