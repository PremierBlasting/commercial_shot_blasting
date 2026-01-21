import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the storage module
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({
    key: "gallery/test-123.jpg",
    url: "https://storage.example.com/gallery/test-123.jpg",
  }),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): { ctx: TrpcContext } {
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
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
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

describe("S3 Image Upload", () => {
  it("admin can upload an image", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    // Create a simple base64 encoded image (1x1 pixel PNG)
    const base64Image = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    
    const result = await caller.upload.image({
      fileName: "test.png",
      fileData: base64Image,
      contentType: "image/png",
      folder: "gallery",
    });
    
    expect(result).toHaveProperty("url");
    expect(result).toHaveProperty("key");
    expect(result.url).toContain("https://");
  });

  it("admin can upload image with custom folder", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const base64Image = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    
    const result = await caller.upload.image({
      fileName: "before.jpg",
      fileData: base64Image,
      contentType: "image/jpeg",
      folder: "gallery/before",
    });
    
    expect(result.url).toBeDefined();
    expect(result.key).toBeDefined();
  });

  it("regular user cannot upload images", async () => {
    const { ctx } = createUserContext();
    const caller = appRouter.createCaller(ctx);
    
    const base64Image = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    
    await expect(
      caller.upload.image({
        fileName: "test.png",
        fileData: base64Image,
        contentType: "image/png",
      })
    ).rejects.toThrow("Admin access required");
  });
});
