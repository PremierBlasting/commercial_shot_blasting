import { describe, it, expect, beforeEach } from "vitest";
import { appRouter } from "./routers";
import { getDb } from "./db";
import { callTrackingEvents } from "../drizzle/schema";
import { eq } from "drizzle-orm";

describe("Call Tracking", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;
  let adminCaller: ReturnType<typeof appRouter.createCaller>;

  beforeEach(async () => {
    // Create mock context for public user
    const mockCtx = {
      user: null,
      req: { ip: "127.0.0.1", socket: { remoteAddress: "127.0.0.1" } } as any,
      res: {} as any,
    };
    caller = appRouter.createCaller(mockCtx);

    // Create mock context for admin user
    const adminMockCtx = {
      user: { id: 1, name: "Admin", email: "admin@test.com", role: "admin" as const },
      req: { ip: "127.0.0.1", socket: { remoteAddress: "127.0.0.1" } } as any,
      res: {} as any,
    };
    adminCaller = appRouter.createCaller(adminMockCtx);

    // Clean up test data
    const db = await getDb();
    if (db) {
      await db.delete(callTrackingEvents);
    }
  });

  it("should log a call tracking event", async () => {
    const result = await caller.callTracking.logCall({
      location: "Birmingham",
      phoneNumber: "07970566409",
      userAgent: "Mozilla/5.0 Test Browser",
      referrer: "https://example.com",
    });

    expect(result.success).toBe(true);

    // Verify the event was stored
    const db = await getDb();
    if (db) {
      const events = await db.select().from(callTrackingEvents);
      expect(events.length).toBe(1);
      expect(events[0].location).toBe("Birmingham");
      expect(events[0].phoneNumber).toBe("07970566409");
      expect(events[0].userAgent).toBe("Mozilla/5.0 Test Browser");
    }
  });

  it("should retrieve call analytics for admin", async () => {
    // Log some test calls
    await caller.callTracking.logCall({
      location: "Birmingham",
      phoneNumber: "07970566409",
    });
    await caller.callTracking.logCall({
      location: "Leicester",
      phoneNumber: "07970566409",
    });
    await caller.callTracking.logCall({
      location: "Birmingham",
      phoneNumber: "07970566409",
    });

    // Retrieve analytics as admin
    const analytics = await adminCaller.callTracking.getAnalytics({});
    expect(analytics.length).toBe(3);
  });

  it("should get location statistics for admin", async () => {
    // Log test calls from different locations
    await caller.callTracking.logCall({
      location: "Birmingham",
      phoneNumber: "07970566409",
    });
    await caller.callTracking.logCall({
      location: "Birmingham",
      phoneNumber: "07970566409",
    });
    await caller.callTracking.logCall({
      location: "Leicester",
      phoneNumber: "07970566409",
    });

    // Get location stats as admin
    const stats = await adminCaller.callTracking.getLocationStats();
    expect(stats.length).toBe(2);
    
    // Birmingham should be first (highest count)
    expect(stats[0].location).toBe("Birmingham");
    expect(Number(stats[0].count)).toBe(2);
    
    // Leicester should be second
    expect(stats[1].location).toBe("Leicester");
    expect(Number(stats[1].count)).toBe(1);
  });

  it("should reject non-admin access to analytics", async () => {
    await expect(
      caller.callTracking.getAnalytics({})
    ).rejects.toThrow();
  });

  it("should reject non-admin access to location stats", async () => {
    await expect(
      caller.callTracking.getLocationStats()
    ).rejects.toThrow();
  });
});
