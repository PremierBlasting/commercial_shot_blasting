import { describe, expect, it } from 'vitest';
import {
  COMMERCIAL_SHOT_BLASTING_FORM_ID,
  shouldTrackHubSpotFormSuccess,
} from '../client/src/lib/hubspotFormTracking';

function callback(eventName: string, formId = COMMERCIAL_SHOT_BLASTING_FORM_ID) {
  return {
    data: {
      type: 'hsFormCallback',
      eventName,
      id: formId,
    },
  } as MessageEvent;
}

describe('HubSpot form conversion callback guard', () => {
  it('accepts one successful callback once', () => {
    const event = callback('onFormSubmitted');

    expect(shouldTrackHubSpotFormSuccess(event)).toBe(true);
    expect(shouldTrackHubSpotFormSuccess(event)).toBe(false);
  });

  it('rejects pre-submit callbacks so only successful submissions can emit the lead event', () => {
    expect(shouldTrackHubSpotFormSuccess(callback('onFormSubmit'))).toBe(false);
  });

  it('rejects callbacks from another HubSpot form', () => {
    expect(shouldTrackHubSpotFormSuccess(callback('onFormSubmitted', 'other-form'))).toBe(false);
  });
});
