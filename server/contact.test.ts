import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  createContactSubmission: vi.fn().mockResolvedValue(undefined),
  getContactSubmissions: vi.fn().mockResolvedValue([]),
  updateContactSubmissionStatus: vi.fn().mockResolvedValue(undefined),
  deleteContactSubmission: vi.fn().mockResolvedValue(undefined),
  getActiveGalleryItems: vi.fn().mockResolvedValue([]),
  getAllGalleryItems: vi.fn().mockResolvedValue([]),
  createGalleryItem: vi.fn().mockResolvedValue(undefined),
  updateGalleryItem: vi.fn().mockResolvedValue(undefined),
  deleteGalleryItem: vi.fn().mockResolvedValue(undefined),
  getActiveTestimonials: vi.fn().mockResolvedValue([]),
  getAllTestimonials: vi.fn().mockResolvedValue([]),
  createTestimonial: vi.fn().mockResolvedValue(undefined),
  updateTestimonial: vi.fn().mockResolvedValue(undefined),
  deleteTestimonial: vi.fn().mockResolvedValue(undefined),
  upsertUser: vi.fn().mockResolvedValue(undefined),
  getUserByOpenId: vi.fn().mockResolvedValue(undefined),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("successfully submits a contact form with all fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "John Doe",
      email: "john@example.com",
      phone: "07970566409",
      message: "I need a quote for shot blasting services.",
    });

    expect(result).toEqual({ success: true });
  });

  it("successfully submits a contact form without optional phone", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Jane Smith",
      email: "jane@example.com",
      message: "Please contact me about your services.",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects submission with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "Test User",
        email: "invalid-email",
        message: "Test message",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "",
        email: "test@example.com",
        message: "Test message",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with empty message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "Test User",
        email: "test@example.com",
        message: "",
      })
    ).rejects.toThrow();
  });
});

describe("gallery.list", () => {
  it("returns gallery items for public access", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.gallery.list();

    expect(Array.isArray(result)).toBe(true);
  });
});

describe("testimonials.list", () => {
  it("returns testimonials for public access", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.testimonials.list();

    expect(Array.isArray(result)).toBe(true);
  });
});
