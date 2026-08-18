/** Shared approved wording for customer-response expectations across page templates. */
export const RESPONSE_TIME_MESSAGE = "We'll get back to you promptly.";

/**
 * Removes legacy response-time promises while preserving useful operational context.
 * Apply only to visible or crawler-visible copy; project programme and curing times
 * are deliberately outside the scope of this normaliser.
 */
export function normaliseResponseTimeCopy(copy: string): string {
  return copy
    .replace(
      /We typically respond to enquiries within 24 hours and can usually schedule site visits in ([^.]+?) within 2-5 working days\. For urgent projects, we can often accommodate faster response times\./gi,
      `${RESPONSE_TIME_MESSAGE} We will discuss practical site-visit availability for $1 when we review your requirements.`,
    )
    .replace(
      /We typically respond to quote requests within 24 hours and can schedule a free site survey at your convenience anywhere in ([^.]+)\./gi,
      `${RESPONSE_TIME_MESSAGE} We will discuss convenient site-survey availability anywhere in $1.`,
    )
    .replace(/We aim to respond to all enquiries within 24 hours/gi, RESPONSE_TIME_MESSAGE)
    .replace(/We'll review ([^.]+?) and get back to you within 24 hours\./gi, `We'll review $1 and ${RESPONSE_TIME_MESSAGE.toLowerCase()}`)
    .replace(/we'll respond within 24 hours/gi, RESPONSE_TIME_MESSAGE)
    .replace(/within 24 hours/gi, "promptly")
    .replace(/24-Hour Response/gi, "Prompt Response");
}
