import { eq, desc, asc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  galleryItems, 
  InsertGalleryItem, 
  GalleryItem,
  testimonials, 
  InsertTestimonial, 
  Testimonial,
  contactSubmissions, 
  InsertContactSubmission, 
  ContactSubmission,
  blogPosts,
  InsertBlogPost,
  BlogPost,
  pageContentSections,
  InsertPageContentSection,
  PageContentSection
} from "../drizzle/schema";
import { ENV } from './_core/env';
import {
  newsletterEditions, InsertNewsletterEdition, NewsletterEdition,
  centenarians, InsertCentenarian, Centenarian,
  familyFeedback, InsertFamilyFeedback, FamilyFeedback,
  teamMembers, InsertTeamMember, TeamMember,
  crumAwards, InsertCrumAward, CrumAward,
  attendanceClub, InsertAttendanceClub, AttendanceClub,
  workiversaries, InsertWorkiversary, Workiversary,
  birthdayShoutouts, InsertBirthdayShoutout, BirthdayShoutout,
  magicMoments, InsertMagicMoment, MagicMoment,
  onCallRota, InsertOnCallRota, OnCallRota,
  payrollCalendar, InsertPayrollCalendar, PayrollCalendar,
  quickLinks, InsertQuickLink, QuickLink,
  clients, InsertClient, Client,
} from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ==================== Gallery Items ====================

export async function getActiveGalleryItems(): Promise<GalleryItem[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(galleryItems)
    .where(eq(galleryItems.isActive, true))
    .orderBy(asc(galleryItems.sortOrder), desc(galleryItems.createdAt));
  
  return result;
}

export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(galleryItems)
    .orderBy(asc(galleryItems.sortOrder), desc(galleryItems.createdAt));
  
  return result;
}

export async function createGalleryItem(item: InsertGalleryItem): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(galleryItems).values(item);
}

export async function updateGalleryItem(id: number, item: Partial<InsertGalleryItem>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(galleryItems).set(item).where(eq(galleryItems.id, id));
}

export async function deleteGalleryItem(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(galleryItems).where(eq(galleryItems.id, id));
}

// ==================== Testimonials ====================

export async function getActiveTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.isActive, true))
    .orderBy(asc(testimonials.sortOrder), desc(testimonials.createdAt));
  
  return result;
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(testimonials)
    .orderBy(asc(testimonials.sortOrder), desc(testimonials.createdAt));
  
  return result;
}

export async function createTestimonial(item: InsertTestimonial): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(testimonials).values(item);
}

export async function updateTestimonial(id: number, item: Partial<InsertTestimonial>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(testimonials).set(item).where(eq(testimonials.id, id));
}

export async function deleteTestimonial(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(testimonials).where(eq(testimonials.id, id));
}

// ==================== Contact Submissions ====================

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt));
  
  return result;
}

export async function createContactSubmission(submission: InsertContactSubmission): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(contactSubmissions).values(submission);
}

export async function updateContactSubmissionStatus(
  id: number, 
  status: "new" | "read" | "replied" | "archived"
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(contactSubmissions).set({ status }).where(eq(contactSubmissions.id, id));
}

export async function deleteContactSubmission(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
}

// ==================== Blog Posts ====================

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.isPublished, true))
    .orderBy(desc(blogPosts.publishedAt));
  
  return result;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt));
  
  return result;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);
  
  return result[0];
}

export async function createBlogPost(post: InsertBlogPost): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(blogPosts).values(post);
}

export async function updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(blogPosts).set(post).where(eq(blogPosts.id, id));
}

export async function deleteBlogPost(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

// ==================== Page Content Sections ====================

export async function getPageContentSections(pageSlug: string): Promise<PageContentSection[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(pageContentSections)
    .where(eq(pageContentSections.pageSlug, pageSlug))
    .orderBy(asc(pageContentSections.sortOrder));
  
  return result;
}

export async function getAllPageContentSections(): Promise<PageContentSection[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(pageContentSections)
    .orderBy(asc(pageContentSections.pageSlug), asc(pageContentSections.sortOrder));
  
  return result;
}

export async function getPageContentSection(id: number): Promise<PageContentSection | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db
    .select()
    .from(pageContentSections)
    .where(eq(pageContentSections.id, id))
    .limit(1);
  
  return result[0];
}

export async function createPageContentSection(section: InsertPageContentSection): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(pageContentSections).values(section);
}

export async function updatePageContentSection(id: number, section: Partial<InsertPageContentSection>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(pageContentSections).set(section).where(eq(pageContentSections.id, id));
}

export async function deletePageContentSection(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(pageContentSections).where(eq(pageContentSections.id, id));
}

export async function upsertPageContentSection(
  pageSlug: string,
  sectionKey: string,
  section: Omit<InsertPageContentSection, 'pageSlug' | 'sectionKey'>
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Check if section exists
  const existing = await db
    .select()
    .from(pageContentSections)
    .where(and(
      eq(pageContentSections.pageSlug, pageSlug),
      eq(pageContentSections.sectionKey, sectionKey)
    ))
    .limit(1);
  
  if (existing.length > 0) {
    // Update existing
    await db
      .update(pageContentSections)
      .set(section)
      .where(eq(pageContentSections.id, existing[0].id));
  } else {
    // Insert new
    await db.insert(pageContentSections).values({
      pageSlug,
      sectionKey,
      ...section
    });
  }
}

// ==================== CarerHub: Newsletter Editions ====================

export async function getPublishedNewsletterEditions(): Promise<NewsletterEdition[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(newsletterEditions).where(eq(newsletterEditions.isPublished, true)).orderBy(desc(newsletterEditions.publishedAt));
}
export async function getAllNewsletterEditions(): Promise<NewsletterEdition[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(newsletterEditions).orderBy(desc(newsletterEditions.createdAt));
}
export async function getNewsletterEditionBySlug(slug: string): Promise<NewsletterEdition | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(newsletterEditions).where(eq(newsletterEditions.slug, slug)).limit(1);
  return result[0];
}
export async function createNewsletterEdition(edition: InsertNewsletterEdition): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(newsletterEditions).values(edition);
}
export async function updateNewsletterEdition(id: number, edition: Partial<InsertNewsletterEdition>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(newsletterEditions).set(edition).where(eq(newsletterEditions.id, id));
}
export async function deleteNewsletterEdition(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(newsletterEditions).where(eq(newsletterEditions.id, id));
}

// ==================== CarerHub: Centenarians (100 Club) ====================
export async function getActiveCentenarians(): Promise<Centenarian[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(centenarians).where(eq(centenarians.isActive, true)).orderBy(asc(centenarians.joinedAt));
}
export async function getAllCentenarians(): Promise<Centenarian[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(centenarians).orderBy(desc(centenarians.createdAt));
}
export async function createCentenarian(item: InsertCentenarian): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(centenarians).values(item);
}
export async function updateCentenarian(id: number, item: Partial<InsertCentenarian>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(centenarians).set(item).where(eq(centenarians.id, id));
}
export async function deleteCentenarian(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(centenarians).where(eq(centenarians.id, id));
}

// ==================== CarerHub: Family Feedback ====================
export async function getActiveFamilyFeedback(): Promise<FamilyFeedback[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(familyFeedback).where(eq(familyFeedback.isActive, true)).orderBy(asc(familyFeedback.sortOrder), desc(familyFeedback.createdAt));
}
export async function getAllFamilyFeedback(): Promise<FamilyFeedback[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(familyFeedback).orderBy(desc(familyFeedback.createdAt));
}
export async function createFamilyFeedback(item: InsertFamilyFeedback): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(familyFeedback).values(item);
}
export async function updateFamilyFeedback(id: number, item: Partial<InsertFamilyFeedback>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(familyFeedback).set(item).where(eq(familyFeedback.id, id));
}
export async function deleteFamilyFeedback(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(familyFeedback).where(eq(familyFeedback.id, id));
}

// ==================== CarerHub: Team Members ====================
export async function getActiveTeamMembers(): Promise<TeamMember[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(teamMembers).where(and(eq(teamMembers.isActive, true), eq(teamMembers.status, 'active'))).orderBy(asc(teamMembers.sortOrder), asc(teamMembers.name));
}
export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(teamMembers).orderBy(asc(teamMembers.sortOrder), asc(teamMembers.name));
}
export async function createTeamMember(item: InsertTeamMember): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(teamMembers).values(item);
}
export async function updateTeamMember(id: number, item: Partial<InsertTeamMember>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(teamMembers).set(item).where(eq(teamMembers.id, id));
}
export async function deleteTeamMember(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(teamMembers).where(eq(teamMembers.id, id));
}

// ==================== CarerHub: CRUM Awards ====================
export async function getCrumAwards(month?: string): Promise<CrumAward[]> {
  const db = await getDb();
  if (!db) return [];
  if (month) return db.select().from(crumAwards).where(eq(crumAwards.month, month)).orderBy(desc(crumAwards.isTopCrum));
  return db.select().from(crumAwards).orderBy(desc(crumAwards.createdAt));
}
export async function createCrumAward(item: InsertCrumAward): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(crumAwards).values(item);
}
export async function updateCrumAward(id: number, item: Partial<InsertCrumAward>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(crumAwards).set(item).where(eq(crumAwards.id, id));
}
export async function deleteCrumAward(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(crumAwards).where(eq(crumAwards.id, id));
}

// ==================== CarerHub: Attendance Club ====================
export async function getAttendanceClub(month?: string): Promise<AttendanceClub[]> {
  const db = await getDb();
  if (!db) return [];
  if (month) return db.select().from(attendanceClub).where(eq(attendanceClub.month, month)).orderBy(asc(attendanceClub.caregiverName));
  return db.select().from(attendanceClub).orderBy(desc(attendanceClub.createdAt));
}
export async function createAttendanceEntry(item: InsertAttendanceClub): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(attendanceClub).values(item);
}
export async function deleteAttendanceEntry(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(attendanceClub).where(eq(attendanceClub.id, id));
}

// ==================== CarerHub: Workiversaries ====================
export async function getWorkiversaries(month?: string): Promise<Workiversary[]> {
  const db = await getDb();
  if (!db) return [];
  if (month) return db.select().from(workiversaries).where(eq(workiversaries.month, month));
  return db.select().from(workiversaries).orderBy(desc(workiversaries.createdAt));
}
export async function createWorkiversary(item: InsertWorkiversary): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(workiversaries).values(item);
}
export async function updateWorkiversary(id: number, item: Partial<InsertWorkiversary>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(workiversaries).set(item).where(eq(workiversaries.id, id));
}
export async function deleteWorkiversary(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(workiversaries).where(eq(workiversaries.id, id));
}

// ==================== CarerHub: Birthday Shoutouts ====================
export async function getBirthdayShoutouts(month?: string): Promise<BirthdayShoutout[]> {
  const db = await getDb();
  if (!db) return [];
  if (month) return db.select().from(birthdayShoutouts).where(eq(birthdayShoutouts.month, month));
  return db.select().from(birthdayShoutouts).orderBy(desc(birthdayShoutouts.createdAt));
}
export async function createBirthdayShoutout(item: InsertBirthdayShoutout): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(birthdayShoutouts).values(item);
}
export async function updateBirthdayShoutout(id: number, item: Partial<InsertBirthdayShoutout>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(birthdayShoutouts).set(item).where(eq(birthdayShoutouts.id, id));
}
export async function deleteBirthdayShoutout(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(birthdayShoutouts).where(eq(birthdayShoutouts.id, id));
}

// ==================== CarerHub: Magic Moments ====================
export async function getActiveMagicMoments(): Promise<MagicMoment[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(magicMoments).where(eq(magicMoments.isActive, true)).orderBy(asc(magicMoments.sortOrder), desc(magicMoments.createdAt));
}
export async function getAllMagicMoments(): Promise<MagicMoment[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(magicMoments).orderBy(desc(magicMoments.createdAt));
}
export async function createMagicMoment(item: InsertMagicMoment): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(magicMoments).values(item);
}
export async function updateMagicMoment(id: number, item: Partial<InsertMagicMoment>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(magicMoments).set(item).where(eq(magicMoments.id, id));
}
export async function deleteMagicMoment(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(magicMoments).where(eq(magicMoments.id, id));
}

// ==================== CarerHub: On-Call Rota ====================
export async function getOnCallRota(month?: string): Promise<OnCallRota[]> {
  const db = await getDb();
  if (!db) return [];
  if (month) return db.select().from(onCallRota).where(eq(onCallRota.month, month)).orderBy(asc(onCallRota.sortOrder));
  return db.select().from(onCallRota).orderBy(desc(onCallRota.createdAt));
}
export async function createOnCallEntry(item: InsertOnCallRota): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(onCallRota).values(item);
}
export async function updateOnCallEntry(id: number, item: Partial<InsertOnCallRota>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(onCallRota).set(item).where(eq(onCallRota.id, id));
}
export async function deleteOnCallEntry(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(onCallRota).where(eq(onCallRota.id, id));
}

// ==================== CarerHub: Payroll Calendar ====================
export async function getPayrollCalendar(year?: number): Promise<PayrollCalendar[]> {
  const db = await getDb();
  if (!db) return [];
  if (year) return db.select().from(payrollCalendar).where(eq(payrollCalendar.year, year)).orderBy(asc(payrollCalendar.sortOrder));
  return db.select().from(payrollCalendar).orderBy(desc(payrollCalendar.year), asc(payrollCalendar.sortOrder));
}
export async function createPayrollEntry(item: InsertPayrollCalendar): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(payrollCalendar).values(item);
}
export async function updatePayrollEntry(id: number, item: Partial<InsertPayrollCalendar>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(payrollCalendar).set(item).where(eq(payrollCalendar.id, id));
}
export async function deletePayrollEntry(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(payrollCalendar).where(eq(payrollCalendar.id, id));
}

// ==================== CarerHub: Quick Links ====================
export async function getActiveQuickLinks(): Promise<QuickLink[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(quickLinks).where(eq(quickLinks.isActive, true)).orderBy(asc(quickLinks.sortOrder));
}
export async function getAllQuickLinks(): Promise<QuickLink[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(quickLinks).orderBy(asc(quickLinks.sortOrder));
}
export async function createQuickLink(item: InsertQuickLink): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(quickLinks).values(item);
}
export async function updateQuickLink(id: number, item: Partial<InsertQuickLink>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(quickLinks).set(item).where(eq(quickLinks.id, id));
}
export async function deleteQuickLink(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(quickLinks).where(eq(quickLinks.id, id));
}

// ==================== CarerHub: Clients ====================
export async function getActiveClients(): Promise<Client[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(clients).where(eq(clients.isActive, true)).orderBy(asc(clients.sortOrder), asc(clients.name));
}
export async function getAllClients(): Promise<Client[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(clients).orderBy(asc(clients.name));
}
export async function createClient(item: InsertClient): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(clients).values(item);
}
export async function updateClient(id: number, item: Partial<InsertClient>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(clients).set(item).where(eq(clients.id, id));
}
export async function deleteClient(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(clients).where(eq(clients.id, id));
}
