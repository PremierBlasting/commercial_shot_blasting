import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  getActiveGalleryItems,
  getAllGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getActiveTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getContactSubmissions,
  createContactSubmission,
  updateContactSubmissionStatus,
  deleteContactSubmission,
  getPublishedBlogPosts,
  getAllBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "./db";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";

// Admin check middleware
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Upload endpoint for S3 images
  upload: router({
    image: adminProcedure
      .input(z.object({
        fileName: z.string(),
        fileData: z.string(), // Base64 encoded
        contentType: z.string(),
        folder: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { fileName, fileData, contentType, folder = "gallery" } = input;
        
        // Decode base64 to buffer
        const buffer = Buffer.from(fileData, "base64");
        
        // Generate unique file key
        const ext = fileName.split(".").pop() || "jpg";
        const uniqueId = nanoid(10);
        const fileKey = `${folder}/${uniqueId}-${Date.now()}.${ext}`;
        
        // Upload to S3
        const { url } = await storagePut(fileKey, buffer, contentType);
        
        return { url, key: fileKey };
      }),

    // Upload with WebP variants for optimized loading
    imageWithWebP: adminProcedure
      .input(z.object({
        fileName: z.string(),
        mainData: z.string(), // Base64 encoded main image (JPEG)
        mainContentType: z.string(),
        webpData: z.string(), // Base64 encoded WebP version
        thumbnailData: z.string(), // Base64 encoded WebP thumbnail
        folder: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { fileName, mainData, mainContentType, webpData, thumbnailData, folder = "gallery" } = input;
        
        const uniqueId = nanoid(10);
        const timestamp = Date.now();
        const baseName = fileName.replace(/\.[^/.]+$/, "");
        
        // Upload main image (JPEG)
        const mainBuffer = Buffer.from(mainData, "base64");
        const mainKey = `${folder}/${uniqueId}-${timestamp}.jpg`;
        const { url: mainUrl } = await storagePut(mainKey, mainBuffer, mainContentType);
        
        // Upload WebP version
        const webpBuffer = Buffer.from(webpData, "base64");
        const webpKey = `${folder}/${uniqueId}-${timestamp}.webp`;
        const { url: webpUrl } = await storagePut(webpKey, webpBuffer, "image/webp");
        
        // Upload thumbnail WebP
        const thumbBuffer = Buffer.from(thumbnailData, "base64");
        const thumbKey = `${folder}/${uniqueId}-${timestamp}-thumb.webp`;
        const { url: thumbnailUrl } = await storagePut(thumbKey, thumbBuffer, "image/webp");
        
        return { 
          url: mainUrl, 
          key: mainKey,
          webpUrl,
          webpKey,
          thumbnailUrl,
          thumbnailKey: thumbKey,
        };
      }),
  }),

  // Gallery Items
  gallery: router({
    // Public: Get active gallery items
    list: publicProcedure.query(async () => {
      return await getActiveGalleryItems();
    }),
    
    // Admin: Get all gallery items
    listAll: adminProcedure.query(async () => {
      return await getAllGalleryItems();
    }),
    
    // Admin: Create gallery item
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        category: z.string().min(1),
        description: z.string().optional(),
        beforeImage: z.string().url(),
        afterImage: z.string().url(),
        isActive: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        await createGalleryItem(input);
        return { success: true };
      }),
    
    // Admin: Update gallery item
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        category: z.string().min(1).optional(),
        description: z.string().optional(),
        beforeImage: z.string().url().optional(),
        afterImage: z.string().url().optional(),
        isActive: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateGalleryItem(id, data);
        return { success: true };
      }),
    
    // Admin: Delete gallery item
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteGalleryItem(input.id);
        return { success: true };
      }),
  }),

  // Testimonials
  testimonials: router({
    // Public: Get active testimonials
    list: publicProcedure.query(async () => {
      const items = await getActiveTestimonials();
      // Parse images JSON string to array
      return items.map(item => ({
        ...item,
        images: item.images ? JSON.parse(item.images) : [],
      }));
    }),
    
    // Admin: Get all testimonials
    listAll: adminProcedure.query(async () => {
      const items = await getAllTestimonials();
      return items.map(item => ({
        ...item,
        images: item.images ? JSON.parse(item.images) : [],
      }));
    }),
    
    // Admin: Create testimonial
    create: adminProcedure
      .input(z.object({
        name: z.string().min(1),
        company: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        text: z.string().min(1),
        project: z.string().optional(),
        images: z.array(z.string()).optional(),
        isNew: z.boolean().optional(),
        isActive: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { images, ...rest } = input;
        await createTestimonial({
          ...rest,
          images: images ? JSON.stringify(images) : null,
        });
        return { success: true };
      }),
    
    // Admin: Update testimonial
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().min(1).optional(),
        company: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        text: z.string().min(1).optional(),
        project: z.string().optional(),
        images: z.array(z.string()).optional(),
        isNew: z.boolean().optional(),
        isActive: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, images, ...rest } = input;
        await updateTestimonial(id, {
          ...rest,
          ...(images !== undefined ? { images: JSON.stringify(images) } : {}),
        });
        return { success: true };
      }),
    
    // Admin: Delete testimonial
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteTestimonial(input.id);
        return { success: true };
      }),
  }),

  // Contact Form Submissions
  contact: router({
    // Public: Submit contact form
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        message: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        await createContactSubmission(input);
        return { success: true };
      }),
    
    // Admin: Get all submissions
    list: adminProcedure.query(async () => {
      return await getContactSubmissions();
    }),
    
    // Admin: Update status
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "read", "replied", "archived"]),
      }))
      .mutation(async ({ input }) => {
        await updateContactSubmissionStatus(input.id, input.status);
        return { success: true };
      }),
    
    // Admin: Toggle read status
    toggleRead: adminProcedure
      .input(z.object({
        id: z.number(),
        isRead: z.boolean(),
      }))
      .mutation(async ({ input }) => {
        await updateContactSubmissionStatus(input.id, input.isRead ? "read" : "new");
        return { success: true };
      }),
    
    // Admin: Delete submission
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteContactSubmission(input.id);
        return { success: true };
      }),
  }),

  // Blog Posts
  blog: router({
    // Public: Get published blog posts
    list: publicProcedure.query(async () => {
      return await getPublishedBlogPosts();
    }),
    
    // Public: Get blog post by slug
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await getBlogPostBySlug(input.slug);
      }),
    
    // Admin: Get all blog posts
    listAll: adminProcedure.query(async () => {
      return await getAllBlogPosts();
    }),
    
    // Admin: Create blog post
    create: adminProcedure
      .input(z.object({
        slug: z.string().min(1),
        title: z.string().min(1),
        excerpt: z.string().min(1),
        content: z.string().min(1),
        featuredImage: z.string().url(),
        author: z.string().optional(),
        category: z.string().optional(),
        tags: z.string().optional(), // JSON string
        metaDescription: z.string().optional(),
        isPublished: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        await createBlogPost(input);
        return { success: true };
      }),
    
    // Admin: Update blog post
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        slug: z.string().min(1).optional(),
        title: z.string().min(1).optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        featuredImage: z.string().url().optional(),
        author: z.string().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        metaDescription: z.string().optional(),
        isPublished: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateBlogPost(id, data);
        return { success: true };
      }),
    
    // Admin: Delete blog post
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteBlogPost(input.id);
        return { success: true };
      }),
  }),

  // Call Tracking Analytics
  callTracking: router({
    // Log a call button click
    logCall: publicProcedure
      .input(z.object({
        location: z.string(),
        phoneNumber: z.string(),
        userAgent: z.string().optional(),
        referrer: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { getDb } = await import("./db");
        const { callTrackingEvents } = await import("../drizzle/schema");
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database not available' });
        
        await db.insert(callTrackingEvents).values({
          location: input.location,
          phoneNumber: input.phoneNumber,
          userAgent: input.userAgent,
          ipAddress: ctx.req.ip || ctx.req.socket.remoteAddress,
          referrer: input.referrer,
          userId: ctx.user?.id,
        });
        
        return { success: true };
      }),
    
    // Get call analytics (admin only)
    getAnalytics: adminProcedure
      .input(z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      }))
      .query(async ({ input }) => {
        const { getDb } = await import("./db");
        const { callTrackingEvents } = await import("../drizzle/schema");
        const { sql, gte, lte, and } = await import("drizzle-orm");
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database not available' });
        
        let conditions = [];
        if (input.startDate) {
          conditions.push(gte(callTrackingEvents.createdAt, new Date(input.startDate)));
        }
        if (input.endDate) {
          conditions.push(lte(callTrackingEvents.createdAt, new Date(input.endDate)));
        }
        
        const events = await db.select()
          .from(callTrackingEvents)
          .where(conditions.length > 0 ? and(...conditions) : undefined)
          .orderBy(callTrackingEvents.createdAt);
        
        return events;
      }),
    
    // Get call statistics by location (admin only)
    getLocationStats: adminProcedure
      .query(async () => {
        const { getDb } = await import("./db");
        const { callTrackingEvents } = await import("../drizzle/schema");
        const { sql } = await import("drizzle-orm");
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database not available' });
        
        const stats = await db.select({
          location: callTrackingEvents.location,
          count: sql<number>`count(*)`
        })
        .from(callTrackingEvents)
        .groupBy(callTrackingEvents.location)
        .orderBy(sql`count(*) DESC`);
        
        return stats;
      }),
  }),
});

export type AppRouter = typeof appRouter;
