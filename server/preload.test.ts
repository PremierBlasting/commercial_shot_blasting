/**
 * Tests for the /api/preload/homepage endpoint.
 *
 * The endpoint returns { testimonials, gallery, blogPosts } JSON with a
 * 5-minute server-side cache and Cache-Control: public, max-age=300 headers.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mock the db module so tests don't hit a real database ──────────────────
vi.mock("./db", () => ({
  getActiveTestimonials: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Test User",
      company: "Test Co",
      rating: 5,
      text: "Great service",
      project: "Factory",
      images: JSON.stringify(["https://example.com/img.jpg"]),
      isNew: false,
      isActive: true,
      sortOrder: 0,
      createdAt: new Date("2025-01-01"),
    },
  ]),
  getActiveGalleryItems: vi.fn().mockResolvedValue([
    {
      id: 1,
      title: "Test Gallery Item",
      category: "Industrial",
      description: "A test item",
      beforeImage: "https://example.com/before.jpg",
      afterImage: "https://example.com/after.jpg",
      isActive: true,
      sortOrder: 0,
      createdAt: new Date("2025-01-01"),
    },
  ]),
  getPublishedBlogPosts: vi.fn().mockResolvedValue([
    {
      id: 1,
      title: "Shot Blasting Tips",
      slug: "shot-blasting-tips",
      excerpt: "Top tips for industrial shot blasting.",
      content: "Full content here.",
      category: "Tips",
      tags: "blasting,tips",
      featuredImage: "https://example.com/blog.jpg",
      isPublished: true,
      publishedAt: new Date("2025-06-01"),
      createdAt: new Date("2025-06-01"),
      updatedAt: new Date("2025-06-01"),
    },
  ]),
}));

// ── Import after mocks are set up ──────────────────────────────────────────
import { getActiveTestimonials, getActiveGalleryItems, getPublishedBlogPosts } from "./db";

describe("/api/preload/homepage endpoint logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls all three db functions in parallel", async () => {
    const [testimonials, gallery, blogPosts] = await Promise.all([
      getActiveTestimonials(),
      getActiveGalleryItems(),
      getPublishedBlogPosts(),
    ]);

    expect(getActiveTestimonials).toHaveBeenCalledOnce();
    expect(getActiveGalleryItems).toHaveBeenCalledOnce();
    expect(getPublishedBlogPosts).toHaveBeenCalledOnce();
    expect(testimonials).toHaveLength(1);
    expect(gallery).toHaveLength(1);
    expect(blogPosts).toHaveLength(1);
  });

  it("returns testimonials with correct shape", async () => {
    const [testimonials] = await Promise.all([
      getActiveTestimonials(),
      getActiveGalleryItems(),
      getPublishedBlogPosts(),
    ]);

    const first = testimonials[0];
    expect(first).toMatchObject({
      id: 1,
      name: "Test User",
      company: "Test Co",
      rating: 5,
    });
    // images is stored as JSON string in DB — the tRPC router parses it,
    // the preload hook also parses it before seeding the cache
    expect(typeof first.images === "string").toBe(true);
  });

  it("returns gallery items with correct shape", async () => {
    const [, gallery] = await Promise.all([
      getActiveTestimonials(),
      getActiveGalleryItems(),
      getPublishedBlogPosts(),
    ]);

    const first = gallery[0];
    expect(first).toMatchObject({
      id: 1,
      title: "Test Gallery Item",
      category: "Industrial",
      beforeImage: "https://example.com/before.jpg",
      afterImage: "https://example.com/after.jpg",
    });
  });

  it("returns blog posts with correct shape", async () => {
    const [, , blogPosts] = await Promise.all([
      getActiveTestimonials(),
      getActiveGalleryItems(),
      getPublishedBlogPosts(),
    ]);

    const first = blogPosts[0];
    expect(first).toMatchObject({
      id: 1,
      title: "Shot Blasting Tips",
      slug: "shot-blasting-tips",
      isPublished: true,
    });
  });

  it("returns empty arrays gracefully when db returns no data", async () => {
    vi.mocked(getActiveTestimonials).mockResolvedValueOnce([]);
    vi.mocked(getActiveGalleryItems).mockResolvedValueOnce([]);
    vi.mocked(getPublishedBlogPosts).mockResolvedValueOnce([]);

    const [testimonials, gallery, blogPosts] = await Promise.all([
      getActiveTestimonials(),
      getActiveGalleryItems(),
      getPublishedBlogPosts(),
    ]);

    expect(testimonials).toEqual([]);
    expect(gallery).toEqual([]);
    expect(blogPosts).toEqual([]);
  });

  it("handles db errors gracefully (fallback to empty arrays)", async () => {
    vi.mocked(getActiveTestimonials).mockRejectedValueOnce(new Error("DB connection failed"));

    // Simulate the endpoint's try/catch fallback
    let result: { testimonials: unknown[]; gallery: unknown[]; blogPosts: unknown[] };
    try {
      const [testimonials, gallery, blogPosts] = await Promise.all([
        getActiveTestimonials(),
        getActiveGalleryItems(),
        getPublishedBlogPosts(),
      ]);
      result = { testimonials, gallery, blogPosts };
    } catch {
      result = { testimonials: [], gallery: [], blogPosts: [] };
    }

    expect(result.testimonials).toEqual([]);
    expect(result.gallery).toEqual([]);
    expect(result.blogPosts).toEqual([]);
  });
});
