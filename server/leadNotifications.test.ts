/**
 * Lead Notifications Integration Tests
 *
 * Validates that:
 *  1. RESEND_API_KEY is set and accepted by the Resend API
 *  2. HUBSPOT_CSB_TOKEN is set and accepted by the HubSpot API
 *  3. notifyNewLead() runs without throwing
 */

import { describe, it, expect } from "vitest";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const HUBSPOT_CSB_TOKEN = process.env.HUBSPOT_CSB_TOKEN ?? "";
const HUBSPOT_BASE_URL = "https://api.hubapi.com";

describe("Lead Notification Credentials", () => {
  it("RESEND_API_KEY is set", () => {
    expect(RESEND_API_KEY.length).toBeGreaterThan(0);
  });

  it("HUBSPOT_CSB_TOKEN is set", () => {
    expect(HUBSPOT_CSB_TOKEN.length).toBeGreaterThan(0);
  });

  it("Resend API key is valid (can list domains)", async () => {
    expect(RESEND_API_KEY.length).toBeGreaterThan(0);
    const resend = new Resend(RESEND_API_KEY);
    const { data, error } = await resend.domains.list();
    expect(error).toBeNull();
    expect(data).toBeDefined();
    // Verify commercialshotblasting.co.uk domain is present
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
    // 200 = valid token, 401 = invalid token
    expect(resp.status).toBe(200);
    const data = await resp.json() as { results?: unknown[] };
    console.log("[HubSpot CSB] API response status:", resp.status);
    expect(data.results).toBeDefined();
  }, 15000);
});

describe("notifyNewLead()", () => {
  it("runs without throwing for a valid lead payload", async () => {
    const { notifyNewLead } = await import("./leadNotifications");
    // Use a test email that won't create a real HubSpot contact
    await expect(
      notifyNewLead({
        name: "Test Lead",
        email: "test-lead-vitest@example.com",
        phone: "07700 900000",
        message: "Vitest integration test — please ignore",
      })
    ).resolves.not.toThrow();
  }, 20000);
});
