import { describe, expect, it } from "vitest";
import {
  createWhatsAppTrackerReference,
  isValidWhatsAppTrackerReference,
} from "./whatsappTracker";

describe("WhatsApp tracker references", () => {
  it("issues opaque references in the exact accepted format", () => {
    const reference = createWhatsAppTrackerReference();
    expect(reference).toMatch(/^PB2-[A-HJ-NP-Z0-9]{24}$/);
    expect(isValidWhatsAppTrackerReference(reference)).toBe(true);
  });

  it("rejects legacy-style, malformed, and over-broad references", () => {
    expect(isValidWhatsAppTrackerReference("PB-2026-08-31-001")).toBe(false);
    expect(isValidWhatsAppTrackerReference("PB2-gclid-123456789012345678")).toBe(false);
    expect(isValidWhatsAppTrackerReference("PB2-ABC")).toBe(false);
  });
});
