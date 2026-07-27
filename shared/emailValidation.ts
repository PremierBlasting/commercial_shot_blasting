/**
 * shared/emailValidation.ts
 *
 * Client-side email validation utilities — a lightweight subset of the
 * server-side checks in server/emailValidation.ts.
 *
 * These run instantly in the browser (no network call) to give the user
 * immediate feedback before the form is submitted. The server performs the
 * same checks again as the authoritative gate before touching HubSpot.
 *
 * Layers:
 *  1. Basic RFC 5321 format check
 *  2. Disposable/throwaway email domain blocklist
 *  3. Role-based address blocklist (noreply@, test@, admin@, etc.)
 *  4. Obvious test/junk pattern detection
 */

// ─── Disposable Email Domain Blocklist ────────────────────────────────────────
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "10minutemail.com",
  "10minutemail.net",
  "10minutemail.org",
  "tempmail.com",
  "tempmail.net",
  "throwam.com",
  "throwaway.email",
  "yopmail.com",
  "yopmail.fr",
  "trashmail.com",
  "trashmail.at",
  "trashmail.io",
  "trashmail.me",
  "trashmail.net",
  "trashmail.org",
  "dispostable.com",
  "spam4.me",
  "sharklasers.com",
  "fakeinbox.com",
  "mailnull.com",
  "spamgourmet.com",
  "spamgourmet.net",
  "spamgourmet.org",
  "maildrop.cc",
  "mailnesia.com",
  "mailnull.com",
  "spamgourmet.com",
  "example.com",
  "example.net",
  "example.org",
  "test.com",
  "invalid.com",
]);

// ─── Role-Based Address Blocklist ─────────────────────────────────────────────
const ROLE_BASED_PREFIXES = new Set([
  "noreply",
  "no-reply",
  "donotreply",
  "do-not-reply",
  "postmaster",
  "mailer-daemon",
  "abuse",
  "spam",
  "root",
  "webmaster",
  "hostmaster",
  "usenet",
  "news",
  "uucp",
  "ftp",
  "null",
  "nobody",
  "dummy",
  "test",
  "testing",
]);

// ─── Junk Pattern Regexes ─────────────────────────────────────────────────────
const JUNK_PATTERNS = [
  // Keyboard-walk patterns — match the root word repeated or followed by digits/itself
  /^(asdf|qwerty|zxcv|hjkl|foo|bar|baz|hello|world|abc|xyz)(\1|\d)*$/i,
  // Repeated single characters: aaaaa@, 11111@
  /^(.)\1{4,}$/,
  // Generic placeholder local parts
  /^(user\d+|admin\d+|test\d+|demo\d+|sample\d+)$/i,
];

// ─── UK Phone Number Validation ─────────────────────────────────────────────
/**
 * Validates a UK phone number.
 * Accepts:
 *   - 07xxx xxxxxx (UK mobile)
 *   - 01xxx xxxxxx / 02x xxxx xxxx (UK landline)
 *   - +44 7xxx xxxxxx / +44 1xxx xxxxxx (international format)
 *   - Allows spaces, hyphens, and parentheses as separators
 * Rejects:
 *   - US/international numbers not starting with 0 or +44
 *   - Numbers shorter than 10 digits or longer than 13 digits
 */
export interface PhoneValidationResult {
  valid: boolean;
  reason?: string;
}

export function validateUKPhone(phone: string): PhoneValidationResult {
  if (!phone || !phone.trim()) {
    return { valid: true }; // Phone is optional
  }
  // Strip all formatting characters (spaces, hyphens, parentheses, dots)
  const stripped = phone.trim().replace(/[\s\-().]/g, "");
  // Must start with 0 or +44, followed by 9-10 digits
  const ukPattern = /^(\+44|0)[0-9]{9,10}$/;
  if (!ukPattern.test(stripped)) {
    return {
      valid: false,
      reason: "Please enter a valid UK phone number (e.g. 07700 900000 or 01234 567890).",
    };
  }
  return { valid: true };
}

// ─── Main Validation Function ─────────────────────────────────────────────────
export interface EmailValidationResult {
  valid: boolean;
  reason?: string;
}

export function validateLeadEmailClient(email: string): EmailValidationResult {
  if (!email || !email.trim()) {
    return { valid: true }; // Empty is allowed (phone-only submissions)
  }

  const trimmed = email.trim().toLowerCase();

  // 1. Basic format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, reason: "Please enter a valid email address." };
  }

  const [localPart, domain] = trimmed.split("@");

  // 2. Disposable domain check
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      valid: false,
      reason: "Please use a real business or personal email address — temporary email services are not accepted.",
    };
  }

  // 3. Role-based prefix check
  if (ROLE_BASED_PREFIXES.has(localPart)) {
    return {
      valid: false,
      reason: "Please enter a personal or business email address rather than a generic role address.",
    };
  }

  // 4. Junk pattern check
  for (const pattern of JUNK_PATTERNS) {
    if (pattern.test(localPart)) {
      return {
        valid: false,
        reason: "Please enter a valid business or personal email address.",
      };
    }
  }

  return { valid: true };
}
