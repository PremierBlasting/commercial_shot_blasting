const UK_POSTCODE_PATTERN = /^([A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2})$/i;

export function normalisePostcode(value: string): string {
  return value.trim().replace(/\s+/g, " ").toUpperCase();
}

export function isValidUKPostcode(value: string): boolean {
  return UK_POSTCODE_PATTERN.test(normalisePostcode(value));
}
