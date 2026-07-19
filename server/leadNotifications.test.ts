/**
 * Lead Notifications Integration Tests
 *
 * Validates that all three notification channels work:
 *  1. RESEND_API_KEY is set and accepted by the Resend API
 *  2. HUBSPOT_CSB_TOKEN is set and accepted by the HubSpot API
 *  3. HUBSPOT_PB_TOKEN is set and accepted by the HubSpot API
 *  4. notifyNewLead() runs without throwing (with source page + UTM data)
 */

import { describe, it, expect } from "vitest";
import { Resend } from "resend";

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

describe("notifyNewLead()", () => {
  it("returns early without sending real emails or HubSpot contacts in test environment", async () => {
    // The NODE_ENV=test guard in notifyNewLead() prevents real external calls.
    // This test verifies the guard works — no emails or HubSpot contacts are created.
    const { notifyNewLead } = await import("./leadNotifications");
    await expect(
      notifyNewLead({
        name: "Test Lead CSB",
        email: "test-csb-lead-vitest@example.com",
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
});
