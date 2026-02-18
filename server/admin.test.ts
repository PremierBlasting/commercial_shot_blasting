import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  getActiveGalleryItems: vi.fn().mockResolvedValue([]),
  getAllGalleryItems: vi.fn().mockResolvedValue([
    { id: 1, title: "Test Project", category: "Industrial", beforeImage: "https://example.com/before.jpg", afterImage: "https://example.com/after.jpg", description: "Test description", isActive: true, sortOrder: 0, createdAt: new Date(), updatedAt: new Date() }
  ]),
  createGalleryItem: vi.fn().mockResolvedValue({ id: 1 }),
  updateGalleryItem: vi.fn().mockResolvedValue(undefined),
  deleteGalleryItem: vi.fn().mockResolvedValue(undefined),
  getActiveTestimonials: vi.fn().mockResolvedValue([]),
  getAllTestimonials: vi.fn().mockResolvedValue([
    { id: 1, name: "John Doe", company: "Test Co", rating: 5, text: "Great service!", project: "Beam Restoration", images: "[]", isNew: false, isActive: true, sortOrder: 0, createdAt: new Date(), updatedAt: new Date() }
  ]),
  createTestimonial: vi.fn().mockResolvedValue({ id: 1 }),
  updateTestimonial: vi.fn().mockResolvedValue(undefined),
  deleteTestimonial: vi.fn().mockResolvedValue(undefined),
  getContactSubmissions: vi.fn().mockResolvedValue([
    { id: 1, name: "Jane Doe", email: "jane@example.com", phone: "1234567890", message: "Test message", status: "new", createdAt: new Date(), updatedAt: new Date() }
  ]),
  createContactSubmission: vi.fn().mockResolvedValue({ id: 1 }),
  updateContactSubmissionStatus: vi.fn().mockResolvedValue(undefined),
  deleteContactSubmission: vi.fn().mockResolvedValue(undefined),
}));

type CookieCall = {
  name: string;
  options: Record<string, unknown>;
};

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): { ctx: TrpcContext; clearedCookies: CookieCall[] } {
  const clearedCookies: CookieCall[] = [];

  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };

  return { ctx, clearedCookies };
}

function createUserContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("Admin Gallery Management", () => {
  it("admin can list all gallery items", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.gallery.listAll();
    
    expect(Array.isArray(result)).toBe(true);
  });

  it("admin can create a gallery item", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.gallery.create({
      title: "New Project",
      category: "Industrial",
      description: "A new industrial project",
      beforeImage: "https://example.com/before.jpg",
      afterImage: "https://example.com/after.jpg",
    });
    
    expect(result.success).toBe(true);
  });

  it("admin can update a gallery item", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.gallery.update({
      id: 1,
      title: "Updated Project Title",
    });
    
    expect(result.success).toBe(true);
  });

  it("admin can delete a gallery item", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.gallery.delete({ id: 1 });
    
    expect(result.success).toBe(true);
  });

  it("regular user cannot access admin gallery endpoints", async () => {
    const { ctx } = createUserContext();
    const caller = appRouter.createCaller(ctx);
    
    await expect(caller.gallery.listAll()).rejects.toThrow("Admin access required");
    await expect(caller.gallery.create({
      title: "Test",
      category: "Industrial",
      beforeImage: "https://example.com/before.jpg",
      afterImage: "https://example.com/after.jpg",
    })).rejects.toThrow("Admin access required");
  });
});

describe("Admin Testimonials Management", () => {
  it("admin can list all testimonials", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.testimonials.listAll();
    
    expect(Array.isArray(result)).toBe(true);
  });

  it("admin can create a testimonial", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.testimonials.create({
      name: "John Smith",
      company: "Smith Corp",
      rating: 5,
      text: "Excellent service!",
      project: "Steel Blasting",
    });
    
    expect(result.success).toBe(true);
  });

  it("admin can update a testimonial", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.testimonials.update({
      id: 1,
      isNew: true,
    });
    
    expect(result.success).toBe(true);
  });

  it("admin can delete a testimonial", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.testimonials.delete({ id: 1 });
    
    expect(result.success).toBe(true);
  });
});

describe("Admin Contact Management", () => {
  it("admin can list all contact submissions", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.contact.list();
    
    expect(Array.isArray(result)).toBe(true);
  });

  it("admin can toggle read status", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.contact.toggleRead({ id: 1, isRead: true });
    
    expect(result.success).toBe(true);
  });

  it("admin can delete a contact submission", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.contact.delete({ id: 1 });
    
    expect(result.success).toBe(true);
  });

  it("regular user cannot access contact list", async () => {
    const { ctx } = createUserContext();
    const caller = appRouter.createCaller(ctx);
    
    await expect(caller.contact.list()).rejects.toThrow("Admin access required");
  });
});
