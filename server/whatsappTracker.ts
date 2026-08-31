import { customAlphabet } from "nanoid";

const trackerAlphabet = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const createOpaqueToken = customAlphabet(trackerAlphabet, 24);
const trackerReferencePattern = /^PB2-[A-HJ-NP-Z0-9]{24}$/;

export function createWhatsAppTrackerReference(): string {
  return `PB2-${createOpaqueToken()}`;
}

export function isValidWhatsAppTrackerReference(value: string): boolean {
  return trackerReferencePattern.test(value);
}
