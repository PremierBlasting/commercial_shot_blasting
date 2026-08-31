import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";

function anonymousCaller(headers: Record<string, string> = {}) {
  return appRouter.createCaller({
    user: null,
    req: {
      headers,
      ip: "127.0.0.1",
      socket: { remoteAddress: "127.0.0.1" },
    } as any,
    res: {} as any,
  });
}

describe("WhatsApp exact-reply callback", () => {
  it("fails closed when the protected callback secret has not been configured", async () => {
    const caller = anonymousCaller();

    await expect(caller.whatsappTracking.markExactReply({
      trackerRef: "PB2-4D6M8Q2R9T5V7W3X1Y6Z8A2B",
      hubspotThreadId: "thread-123",
    })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("rejects malformed references before any exact-match status update can run", async () => {
    const caller = anonymousCaller({ "x-whatsapp-tracker-secret": "not-configured" });

    await expect(caller.whatsappTracking.markExactReply({
      trackerRef: "legacy-reference-123",
      hubspotThreadId: "thread-123",
    })).rejects.toBeDefined();
  });
});
