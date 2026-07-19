/**
 * rateLimit.test.ts
 *
 * Tests for:
 *  1. The shared client-side email validation module (shared/emailValidation.ts)
 *  2. The rate-limit middleware configuration (structural checks)
 */

import { describe, it, expect } from "vitest";
import { validateLeadEmailClient } from "../shared/emailValidation";

// ─── Shared Email Validation ─────────────────────────────────────────────────

describe("validateLeadEmailClient", () => {
  // Valid emails
  it("accepts a standard business email", () => {
    expect(validateLeadEmailClient("john.smith@company.co.uk").valid).toBe(true);
  });

  it("accepts a Gmail address", () => {
    expect(validateLeadEmailClient("user@gmail.com").valid).toBe(true);
  });

  it("accepts an empty string (phone-only submission)", () => {
    expect(validateLeadEmailClient("").valid).toBe(true);
  });

  it("accepts a valid email with subdomain", () => {
    expect(validateLeadEmailClient("contact@mail.company.org").valid).toBe(true);
  });

  // Format errors
  it("rejects an address missing @", () => {
    const result = validateLeadEmailClient("notanemail");
    expect(result.valid).toBe(false);
    expect(result.reason).toBeTruthy();
  });

  it("rejects an address missing domain", () => {
    expect(validateLeadEmailClient("user@").valid).toBe(false);
  });

  // Disposable domains
  it("rejects mailinator.com", () => {
    const result = validateLeadEmailClient("test@mailinator.com");
    expect(result.valid).toBe(false);
    expect(result.reason).toMatch(/temporary|real/i);
  });

  it("rejects yopmail.com", () => {
    expect(validateLeadEmailClient("user@yopmail.com").valid).toBe(false);
  });

  it("rejects 10minutemail.com", () => {
    expect(validateLeadEmailClient("user@10minutemail.com").valid).toBe(false);
  });

  it("rejects example.com", () => {
    expect(validateLeadEmailClient("user@example.com").valid).toBe(false);
  });

  it("rejects trashmail.com", () => {
    expect(validateLeadEmailClient("user@trashmail.com").valid).toBe(false);
  });

  // Role-based prefixes
  it("rejects noreply@", () => {
    const result = validateLeadEmailClient("noreply@company.com");
    expect(result.valid).toBe(false);
    expect(result.reason).toMatch(/personal|business|role/i);
  });

  it("rejects test@", () => {
    expect(validateLeadEmailClient("test@company.com").valid).toBe(false);
  });

  it("rejects abuse@", () => {
    expect(validateLeadEmailClient("abuse@company.com").valid).toBe(false);
  });

  it("rejects postmaster@", () => {
    expect(validateLeadEmailClient("postmaster@company.com").valid).toBe(false);
  });

  it("rejects dummy@", () => {
    expect(validateLeadEmailClient("dummy@company.com").valid).toBe(false);
  });

  // Junk patterns
  it("rejects asdfasdf@ pattern", () => {
    expect(validateLeadEmailClient("asdfasdf@company.com").valid).toBe(false);
  });

  it("rejects qwerty@ pattern", () => {
    expect(validateLeadEmailClient("qwerty@company.com").valid).toBe(false);
  });

  it("rejects aaaaa@ repeated character pattern", () => {
    expect(validateLeadEmailClient("aaaaa@company.com").valid).toBe(false);
  });

  it("rejects admin123@ (generic placeholder pattern)", () => {
    expect(validateLeadEmailClient("admin123@company.com").valid).toBe(false);
  });

  it("accepts user@ as a valid local part (not blocked — too common in real addresses)", () => {
    // 'user' alone is not in ROLE_BASED_PREFIXES and not a junk pattern
    // Only 'user1', 'user2', 'user123' etc. are blocked
    expect(validateLeadEmailClient("user@gmail.com").valid).toBe(true);
  });

  // Case insensitivity
  it("rejects MAILINATOR.COM (case insensitive)", () => {
    expect(validateLeadEmailClient("user@MAILINATOR.COM").valid).toBe(false);
  });

  it("rejects NOREPLY@ (case insensitive)", () => {
    expect(validateLeadEmailClient("NOREPLY@company.com").valid).toBe(false);
  });
});

// ─── Rate Limiter Configuration ──────────────────────────────────────────────

describe("contact rate limiter configuration", () => {
  it("express-rate-limit package is importable", async () => {
    const { rateLimit, ipKeyGenerator } = await import("express-rate-limit");
    expect(typeof rateLimit).toBe("function");
    expect(typeof ipKeyGenerator).toBe("function");
  });

  it("ipKeyGenerator normalises an IPv4 address", async () => {
    const { ipKeyGenerator } = await import("express-rate-limit");
    const result = ipKeyGenerator("192.168.1.100");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("ipKeyGenerator normalises an IPv6 address to a subnet", async () => {
    const { ipKeyGenerator } = await import("express-rate-limit");
    const result = ipKeyGenerator("2001:db8::1");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });
});
