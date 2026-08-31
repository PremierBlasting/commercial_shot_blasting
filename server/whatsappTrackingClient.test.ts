import { describe, expect, it } from "vitest";
import {
  buildConsentGatedWhatsAppLink,
  buildWhatsAppClickTrackerInput,
  hasAcceptedAnalyticsConsent,
} from "../client/src/lib/whatsappTracking";

describe("WhatsApp click tracking client contract", () => {
  it("creates a durable tracker payload only after accepted analytics consent", () => {
    const payload = buildWhatsAppClickTrackerInput(
      "whatsapp_widget",
      "accepted",
      "/services/structural-steel-frames",
    );

    expect(payload).toMatchObject({
      clickLocation: "whatsapp_widget",
      landingPath: "/services/structural-steel-frames",
    });
    expect(hasAcceptedAnalyticsConsent("declined")).toBe(false);
    expect(buildWhatsAppClickTrackerInput("whatsapp_widget", "declined", "/")).toBeNull();
  });

  it("adds only an opaque server-issued reference to the WhatsApp message", () => {
    const reference = "PB2-4D6M8Q2R9T5V7W3X1Y6Z8A2B";
    const link = buildConsentGatedWhatsAppLink(
      "447721375756",
      "Hello, I am interested in shot blasting.",
      reference,
    );

    expect(decodeURIComponent(link)).toContain(`Reference: ${reference}`);
    expect(decodeURIComponent(link)).not.toContain("gclid");
  });
});
