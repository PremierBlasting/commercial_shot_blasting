import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the storage module
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockImplementation((key: string) => {
    return Promise.resolve({
      key,
      url: `https://storage.example.com/${key}`,
    });
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

describe("WebP Image Upload", () => {
  // Simple 1x1 pixel PNG as base64
  const base64Image = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

  it("admin can upload image with WebP variants", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.upload.imageWithWebP({
      fileName: "test.jpg",
      mainData: base64Image,
      mainContentType: "image/jpeg",
      webpData: base64Image,
      thumbnailData: base64Image,
      folder: "gallery",
    });
    
    expect(result).toHaveProperty("url");
    expect(result).toHaveProperty("webpUrl");
    expect(result).toHaveProperty("thumbnailUrl");
    expect(result.url).toContain(".jpg");
    expect(result.webpUrl).toContain(".webp");
    expect(result.thumbnailUrl).toContain("-thumb.webp");
  });

  it("returns all required URLs and keys", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.upload.imageWithWebP({
      fileName: "project-image.jpg",
      mainData: base64Image,
      mainContentType: "image/jpeg",
      webpData: base64Image,
      thumbnailData: base64Image,
      folder: "gallery/before",
    });
    
    expect(result.url).toBeDefined();
    expect(result.key).toBeDefined();
    expect(result.webpUrl).toBeDefined();
    expect(result.webpKey).toBeDefined();
    expect(result.thumbnailUrl).toBeDefined();
    expect(result.thumbnailKey).toBeDefined();
  });

  it("regular user cannot upload WebP images", async () => {
    const { ctx } = createUserContext();
    const caller = appRouter.createCaller(ctx);
    
    await expect(
      caller.upload.imageWithWebP({
        fileName: "test.jpg",
        mainData: base64Image,
        mainContentType: "image/jpeg",
        webpData: base64Image,
        thumbnailData: base64Image,
      })
    ).rejects.toThrow("Admin access required");
  });

  it("uses custom folder path when provided", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.upload.imageWithWebP({
      fileName: "custom.jpg",
      mainData: base64Image,
      mainContentType: "image/jpeg",
      webpData: base64Image,
      thumbnailData: base64Image,
      folder: "custom/path",
    });
    
    expect(result.key).toContain("custom/path/");
    expect(result.webpKey).toContain("custom/path/");
    expect(result.thumbnailKey).toContain("custom/path/");
  });
});
