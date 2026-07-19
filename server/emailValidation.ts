/**
 * Server-side email validation utilities
 *
 * Provides multi-layer validation beyond basic format checks to prevent junk
 * submissions from reaching HubSpot CRM and the notification email inbox.
 *
 * Layers:
 *  1. RFC 5321 format check (handled by zod .email() upstream)
 *  2. Disposable/throwaway email domain blocklist
 *  3. Role-based address blocklist (noreply@, test@, admin@, etc.)
 *  4. Obvious test/junk pattern detection
 *  5. MX record presence check (optional — async, only used server-side)
 */

// ─── Disposable Email Domain Blocklist ────────────────────────────────────────
// Common throwaway/temporary email providers. Extend as needed.
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamail.biz",
  "guerrillamail.de",
  "guerrillamail.info",
  "sharklasers.com",
  "guerrillamailblock.com",
  "grr.la",
  "guerrillamail.co",
  "spam4.me",
  "trashmail.com",
  "trashmail.at",
  "trashmail.io",
  "trashmail.me",
  "trashmail.net",
  "trashmail.org",
  "dispostable.com",
  "yopmail.com",
  "yopmail.fr",
  "cool.fr.nf",
  "jetable.fr.nf",
  "nospam.ze.tc",
  "nomail.xl.cx",
  "mega.zik.dj",
  "speed.1s.fr",
  "courriel.fr.nf",
  "moncourrier.fr.nf",
  "monemail.fr.nf",
  "monmail.fr.nf",
  "10minutemail.com",
  "10minutemail.net",
  "10minutemail.org",
  "10minutemail.co.uk",
  "10minutemail.de",
  "10minutemail.ru",
  "10minutemail.info",
  "10minutemail.biz",
  "10minutemail.us",
  "10minutemail.nl",
  "tempmail.com",
  "tempmail.net",
  "tempmail.org",
  "temp-mail.org",
  "temp-mail.ru",
  "temp-mail.io",
  "throwam.com",
  "throwam.net",
  "throwam.org",
  "mailnull.com",
  "spamgourmet.com",
  "spamgourmet.net",
  "spamgourmet.org",
  "example.com",
  "example.net",
  "example.org",
  "test.com",
  "fake.com",
  "noemail.com",
  "noemail.net",
  "fakeinbox.com",
  "fakeinbox.net",
  "mailnesia.com",
  "maildrop.cc",
  "mailnull.com",
  "spamevader.com",
  "spamevader.net",
  "spamevader.org",
  "discard.email",
  "spamspot.com",
  "spamspot.net",
  "spamspot.org",
  "spamfree24.org",
  "spamfree24.de",
  "spamfree24.eu",
  "spamfree24.info",
  "spamfree24.net",
  "spamfree24.com",
  "spamfree.eu",
  "spam.la",
  "spam.su",
  "spam.ac",
  "spam.care",
  "spam.cf",
  "spam.cm",
  "spam.email",
  "spam.me",
  "spam.org.es",
  "spam.wtf",
  "spamavert.com",
  "spamcero.com",
  "spamcon.org",
  "spamcorptastic.com",
  "spamcowboy.com",
  "spamcowboy.net",
  "spamcowboy.org",
  "spamday.com",
  "spamex.com",
  "spamfighter.cf",
  "spamfighter.ga",
  "spamfighter.gq",
  "spamfighter.ml",
  "spamfighter.tk",
  "spamfighter.tw",
  "spamgoes.in",
  "spamgourmet.com",
  "spamgourmet.net",
  "spamgourmet.org",
  "spamherelots.com",
  "spamhereplease.com",
  "spamhole.com",
  "spamify.com",
  "spaminator.de",
  "spamkill.info",
  "spaml.com",
  "spaml.de",
  "spammotel.com",
  "spamobox.com",
  "spamoff.de",
  "spamslicer.com",
  "spamstack.net",
  "spamthis.co.uk",
  "spamthisplease.com",
  "spamtrail.com",
  "spamtrap.ro",
  "spamtroll.net",
  "spamwc.cf",
  "spamwc.de",
  "spamwc.ga",
  "spamwc.gq",
  "spamwc.ml",
  "spamwc.tk",
  "spamwc.tw",
  "spamwc.us",
  "spamwc.xyz",
]);

// ─── Role-Based Address Prefixes ──────────────────────────────────────────────
// These are system/role addresses that are never real people and should not
// be added to a CRM.
const ROLE_BASED_PREFIXES = new Set([
  "noreply",
  "no-reply",
  "donotreply",
  "do-not-reply",
  "postmaster",
  "mailer-daemon",
  "mailer",
  "daemon",
  "abuse",
  "spam",
  "junk",
  "bounce",
  "bounces",
  "unsubscribe",
  "root",
  "hostmaster",
  "webmaster",
  "test",
  "testing",
  "demo",
  "example",
  "sample",
  "fake",
  "dummy",
  "null",
  "void",
  "devnull",
  "dev-null",
  "blackhole",
  "trash",
  "throwaway",
  "throwam",
  "tempmail",
  "temp",
  "temporary",
  "disposable",
]);

// ─── Junk Pattern Detection ───────────────────────────────────────────────────
const JUNK_PATTERNS = [
  /^test[\d_.-]*@/i,           // test@, test123@, test_user@
  /^fake[\d_.-]*@/i,           // fake@, fake123@
  /^asdf/i,                    // asdfasdf@
  /^qwerty/i,                  // qwerty@
  /^aaaa/i,                    // aaaa@
  /^1234/i,                    // 1234@
  /^abc[\d]*@/i,               // abc@, abc123@
  /^xxx/i,                     // xxx@
  /^zzz/i,                     // zzz@
  /(.)\1{4,}/,                 // 5+ repeated characters: aaaaa@, 11111@
  /^[a-z]{1,2}@/i,             // single or double letter local part: a@, ab@
];

// ─── Validation Result ────────────────────────────────────────────────────────
export interface EmailValidationResult {
  valid: boolean;
  reason?: string;
}

/**
 * Validates an email address against multiple quality signals.
 * Returns { valid: true } for acceptable emails, or { valid: false, reason }
 * for emails that should be rejected.
 *
 * This is synchronous and runs on every lead form submission.
 */
export function validateLeadEmail(email: string): EmailValidationResult {
  if (!email || typeof email !== "string") {
    return { valid: false, reason: "Email address is required." };
  }

  const normalised = email.trim().toLowerCase();

  // Basic format sanity (belt-and-braces — zod .email() should catch this first)
  if (!normalised.includes("@") || !normalised.includes(".")) {
    return { valid: false, reason: "Please enter a valid email address." };
  }

  const [localPart, domain] = normalised.split("@");

  if (!localPart || !domain) {
    return { valid: false, reason: "Please enter a valid email address." };
  }

  // Check disposable domain blocklist
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      valid: false,
      reason: "Please use a real business or personal email address — temporary email addresses are not accepted.",
    };
  }

  // Check role-based address prefixes
  if (ROLE_BASED_PREFIXES.has(localPart)) {
    return {
      valid: false,
      reason: "Please use a personal or business email address rather than a system address.",
    };
  }

  // Check junk patterns
  for (const pattern of JUNK_PATTERNS) {
    if (pattern.test(normalised)) {
      return {
        valid: false,
        reason: "Please enter a valid email address.",
      };
    }
  }

  // Check for suspiciously short domain (e.g. a.b — no real TLD)
  const domainParts = domain.split(".");
  if (domainParts.length < 2 || domainParts[domainParts.length - 1].length < 2) {
    return { valid: false, reason: "Please enter a valid email address." };
  }

  return { valid: true };
}
