/**
 * Tests for server-side email validation utility
 * Verifies that junk, disposable, role-based, and test emails are rejected
 * while real business and personal emails are accepted.
 */

import { describe, it, expect } from "vitest";
import { validateLeadEmail } from "./emailValidation";

describe("validateLeadEmail()", () => {
  describe("Valid emails — should pass", () => {
    it("accepts a standard personal email", () => {
      expect(validateLeadEmail("john.smith@gmail.com").valid).toBe(true);
    });

    it("accepts a business email", () => {
      expect(validateLeadEmail("enquiries@steelworks.co.uk").valid).toBe(true);
    });

    it("accepts an email with plus addressing", () => {
      expect(validateLeadEmail("user+tag@outlook.com").valid).toBe(true);
    });

    it("accepts an email with subdomain", () => {
      expect(validateLeadEmail("contact@mail.company.com").valid).toBe(true);
    });

    it("accepts a .co.uk email", () => {
      expect(validateLeadEmail("info@premier-blasting.co.uk").valid).toBe(true);
    });

    it("accepts a numeric local part", () => {
      expect(validateLeadEmail("user123@hotmail.com").valid).toBe(true);
    });
  });

  describe("Disposable email domains — should reject", () => {
    it("rejects mailinator.com", () => {
      const result = validateLeadEmail("test@mailinator.com");
      expect(result.valid).toBe(false);
      expect(result.reason).toContain("temporary email");
    });

    it("rejects guerrillamail.com", () => {
      expect(validateLeadEmail("user@guerrillamail.com").valid).toBe(false);
    });

    it("rejects 10minutemail.com", () => {
      expect(validateLeadEmail("user@10minutemail.com").valid).toBe(false);
    });

    it("rejects yopmail.com", () => {
      expect(validateLeadEmail("user@yopmail.com").valid).toBe(false);
    });

    it("rejects trashmail.com", () => {
      expect(validateLeadEmail("user@trashmail.com").valid).toBe(false);
    });

    it("rejects example.com (RFC test domain)", () => {
      expect(validateLeadEmail("user@example.com").valid).toBe(false);
    });

    it("rejects temp-mail.org", () => {
      expect(validateLeadEmail("user@temp-mail.org").valid).toBe(false);
    });
  });

  describe("Role-based addresses — should reject", () => {
    it("rejects noreply@", () => {
      expect(validateLeadEmail("noreply@company.com").valid).toBe(false);
    });

    it("rejects no-reply@", () => {
      expect(validateLeadEmail("no-reply@company.com").valid).toBe(false);
    });

    it("rejects test@", () => {
      expect(validateLeadEmail("test@company.com").valid).toBe(false);
    });

    it("rejects postmaster@", () => {
      expect(validateLeadEmail("postmaster@company.com").valid).toBe(false);
    });

    it("rejects abuse@", () => {
      expect(validateLeadEmail("abuse@company.com").valid).toBe(false);
    });

    it("rejects spam@", () => {
      expect(validateLeadEmail("spam@company.com").valid).toBe(false);
    });

    it("rejects dummy@", () => {
      expect(validateLeadEmail("dummy@company.com").valid).toBe(false);
    });

    it("rejects null@", () => {
      expect(validateLeadEmail("null@company.com").valid).toBe(false);
    });
  });

  describe("Junk patterns — should reject", () => {
    it("rejects test123@", () => {
      expect(validateLeadEmail("test123@gmail.com").valid).toBe(false);
    });

    it("rejects asdfasdf@", () => {
      expect(validateLeadEmail("asdfasdf@gmail.com").valid).toBe(false);
    });

    it("rejects qwerty@", () => {
      expect(validateLeadEmail("qwerty@gmail.com").valid).toBe(false);
    });

    it("rejects repeated characters (aaaaa@)", () => {
      expect(validateLeadEmail("aaaaa@gmail.com").valid).toBe(false);
    });

    it("rejects single character local part (a@)", () => {
      expect(validateLeadEmail("a@gmail.com").valid).toBe(false);
    });

    it("rejects fake@", () => {
      expect(validateLeadEmail("fake@gmail.com").valid).toBe(false);
    });
  });

  describe("Invalid format — should reject", () => {
    it("rejects empty string", () => {
      expect(validateLeadEmail("").valid).toBe(false);
    });

    it("rejects string without @", () => {
      expect(validateLeadEmail("notanemail").valid).toBe(false);
    });

    it("rejects string without domain TLD", () => {
      expect(validateLeadEmail("user@nodot").valid).toBe(false);
    });
  });
});
