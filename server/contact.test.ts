import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const { storagePutMock } = vi.hoisted(() => ({
  storagePutMock: vi.fn().mockResolvedValue({
    key: "survey-attachments/test-file.png",
    url: "/manus-storage/survey-attachments/test-file.png",
  }),
}));

vi.mock("./storage", () => ({ storagePut: storagePutMock }));

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
      email: "john.doe@gmail.com",
      phone: "07721375756",
      message: "I need a quote for shot blasting services.",
    });

    expect(result).toEqual({ success: true });
  });

  it("successfully submits a contact form without optional phone", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Jane Smith",
      email: "jane.smith@outlook.com",
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

describe("contact.uploadAttachments", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uploads an allowed survey image and returns a storage URL", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    const result = await caller.contact.uploadAttachments({
      attachments: [{
        fileName: "steel-frame-plan.png",
        contentType: "image/png",
        fileData: Buffer.from("sample image bytes").toString("base64"),
      }],
    });

    expect(storagePutMock).toHaveBeenCalledWith(
      expect.stringMatching(/^survey-attachments\/.+\.png$/),
      expect.any(Buffer),
      "image/png",
    );
    expect(result).toEqual([
      expect.objectContaining({
        fileName: "steel-frame-plan.png",
        url: "/manus-storage/survey-attachments/test-file.png",
      }),
    ]);
  });

  it("rejects file types outside the public survey attachment allow-list", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(caller.contact.uploadAttachments({
      attachments: [{
        fileName: "site-model.exe",
        contentType: "application/octet-stream" as never,
        fileData: Buffer.from("not an image").toString("base64"),
      }],
    })).rejects.toThrow();

    expect(storagePutMock).not.toHaveBeenCalled();
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
