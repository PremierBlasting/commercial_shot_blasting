const handledCallbackEvents = new WeakSet<object>();

export const COMMERCIAL_SHOT_BLASTING_FORM_ID = 'b6f4f2e0-afe6-4351-9a63-5a9663bf6f37';

type HubSpotCallbackPayload = {
  type?: unknown;
  eventName?: unknown;
  id?: unknown;
};

/**
 * Accept only a successful callback from the embedded Commercial Shot Blasting
 * form. HubSpot dispatches this window message; the event-level WeakSet keeps
 * multiple mounted form instances from processing the same browser event twice.
 */
export function shouldTrackHubSpotFormSuccess(
  event: Pick<MessageEvent, 'data'> & object,
  expectedFormId = COMMERCIAL_SHOT_BLASTING_FORM_ID,
): boolean {
  const payload = event.data as HubSpotCallbackPayload | null;
  if (
    !payload ||
    payload.type !== 'hsFormCallback' ||
    payload.eventName !== 'onFormSubmitted' ||
    payload.id !== expectedFormId
  ) {
    return false;
  }

  if (handledCallbackEvents.has(event)) {
    return false;
  }

  handledCallbackEvents.add(event);
  return true;
}
