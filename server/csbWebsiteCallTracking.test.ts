import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  COOKIE_CONSENT_CHANGE_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
  GOOGLE_MEASUREMENT_CONSENT_KEY,
  WEBSITE_CALL_CONSENT_KEY,
} from "../shared/cookieConsent";
import {
  CSB_GOOGLE_DESTINATIONS,
  GOOGLE_ADS_ID,
} from "../shared/googleMeasurement";
import type { CSBWebsiteCallConfig } from "../shared/csbWebsiteCall";

// This synthetically typed fixture stays test-only, separate from the verified
// production action: never put this fixture into config or send it to Google.
const websiteCallMock = vi.hoisted(() => ({
  enabled: false,
  fixture: {
    destination: "AW-16481669131/Z9qW2rY7pL5nB8vK4cF6",
    actionResourceName: "customers/1234567890/conversionActions/123456789",
    type: "WEBSITE_CALL" as const,
    minimumCallSeconds: 60 as const,
    businessNumber: "07970 566409" as const,
    verifiedSnippet: true as const,
  },
}));

vi.mock("../shared/csbWebsiteCall", async importOriginal => {
  const actual =
    await importOriginal<typeof import("../shared/csbWebsiteCall")>();
  return {
    ...actual,
    get CSB_WEBSITE_CALL_CONFIG() {
      return websiteCallMock.enabled
        ? websiteCallMock.fixture
        : actual.CSB_WEBSITE_CALL_CONFIG;
    },
  };
});

// Deliberately no jsdom, browser, live tag, form, Ads API, CRM, or real call.
class FakeElement {
  dataset: Record<string, string> = {};
  async = false;
  src = "";
  remove = vi.fn();
  constructor(private attributes: Record<string, string> = {}) {}
  getAttribute(name: string) {
    return this.attributes[name] ?? null;
  }
  setAttribute(name: string, value: string) {
    this.attributes[name] = value;
  }
}

class FakeDocument {
  loader: FakeElement | null = new FakeElement();
  head = { appendChild: vi.fn() };
  querySelector = vi.fn((selector: string) =>
    selector === "script[data-csb-analytics-loader]" ? this.loader : null
  );
  getElementById = vi.fn((_id: string): unknown => null);
  createElement = vi.fn(() => new FakeElement());
  createTreeWalker = vi.fn(() => ({ nextNode: vi.fn((): unknown => null) }));
  constructor() {
    this.loader!.dataset = {
      csbAnalyticsLoader: "true",
      csbAnalyticsLoaded: "true",
    };
  }
}

type SharedWebsiteCall = typeof import("../shared/csbWebsiteCall");
type Measurement = typeof import("../client/src/lib/googleMeasurement");
type Targets = typeof import("../client/src/lib/businessPhoneTargets");
type Tracking = typeof import("../client/src/lib/websiteCallTracking");
const FIXTURE: CSBWebsiteCallConfig = websiteCallMock.fixture;
// Relevant fields copied verbatim from the supplied website_call_action.json.
// Keep this readback snapshot in the test, not a dependency on an upload path.
const VERIFIED_ACTION_READBACK = {
  resourceName: "customers/2361561845/conversionActions/7893466760",
  id: "7893466760",
  type: "WEBSITE_CALL",
  phoneCallDurationSeconds: "60",
  tagSnippets: [
    {
      type: "WEBSITE_CALL",
      eventSnippet:
        "<script>\n  gtag('config', 'AW-16481669131/XyJ7CIj98rMdEIugibM9', {\n    'phone_conversion_number': 'REPLACE WITH VALUE'\n  });\n</script>\n",
    },
  ],
} as const;
const FORWARD_DIAL = "+448081234567";
const ORIGIN = "https://commercialshotblasting.co.uk";
const GA_ID = "G-CSBLOCAL01";

let values: Map<string, string>;
let storage: {
  getItem: ReturnType<typeof vi.fn>;
  setItem: ReturnType<typeof vi.fn>;
  removeItem: ReturnType<typeof vi.fn>;
};
let doc: FakeDocument;
let frames: Map<number, FrameRequestCallback>;
let fakeWindow: {
  location: {
    hostname: string;
    origin: string;
    pathname: string;
    href: string;
  };
  localStorage: typeof storage;
  sessionStorage: typeof storage;
  gtag: ReturnType<typeof vi.fn>;
  dataLayer: unknown[];
  requestAnimationFrame: ReturnType<typeof vi.fn>;
  cancelAnimationFrame: ReturnType<typeof vi.fn>;
  requestIdleCallback: ReturnType<typeof vi.fn>;
  addEventListener: ReturnType<typeof vi.fn>;
  removeEventListener: ReturnType<typeof vi.fn>;
};
let observerConstructor: ReturnType<typeof vi.fn>;
let observerObserve: ReturnType<typeof vi.fn>;
let observerDisconnect: ReturnType<typeof vi.fn>;
let network: ReturnType<typeof vi.fn>;
let actualShared: SharedWebsiteCall;
let measurement: Measurement;
let targets: Targets;
let tracking: Tracking;

function consent(
  analytics: string | null,
  advertising: string | null = null,
  websiteCall: string | null = advertising === "accepted" ? "accepted" : null
) {
  for (const [key, value] of [
    [COOKIE_CONSENT_STORAGE_KEY, analytics],
    [GOOGLE_MEASUREMENT_CONSENT_KEY, advertising],
    [WEBSITE_CALL_CONSENT_KEY, websiteCall],
  ]) {
    if (value === null) values.delete(key!);
    else values.set(key!, value!);
  }
}

function calls() {
  return fakeWindow.gtag.mock.calls;
}

function configCalls() {
  return calls().filter(call => call[0] === "config");
}

function expectNoDomOrTrackingWork() {
  expect(doc.querySelector).not.toHaveBeenCalled();
  expect(doc.getElementById).not.toHaveBeenCalled();
  expect(doc.createElement).not.toHaveBeenCalled();
  expect(doc.createTreeWalker).not.toHaveBeenCalled();
  expect(doc.head.appendChild).not.toHaveBeenCalled();
  expect(observerConstructor).not.toHaveBeenCalled();
  expect(fakeWindow.addEventListener).not.toHaveBeenCalled();
  expect(fakeWindow.removeEventListener).not.toHaveBeenCalled();
  expect(fakeWindow.requestAnimationFrame).not.toHaveBeenCalled();
  expect(fakeWindow.requestIdleCallback).not.toHaveBeenCalled();
  expect(fakeWindow.gtag).not.toHaveBeenCalled();
}

function runFrames() {
  const pending = [...frames.values()];
  frames.clear();
  pending.forEach(callback => callback(0));
}

beforeEach(async () => {
  websiteCallMock.enabled = false;
  vi.resetModules();
  vi.stubEnv("VITE_GA_MEASUREMENT_ID", GA_ID);
  values = new Map();
  storage = {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => values.set(key, value)),
    removeItem: vi.fn((key: string) => values.delete(key)),
  };
  doc = new FakeDocument();
  frames = new Map();
  let nextFrame = 0;
  fakeWindow = {
    location: {
      hostname: "commercialshotblasting.co.uk",
      origin: ORIGIN,
      pathname: "/contact",
      href: `${ORIGIN}/contact`,
    },
    localStorage: storage,
    sessionStorage: storage,
    gtag: vi.fn(),
    dataLayer: [],
    requestAnimationFrame: vi.fn((callback: FrameRequestCallback) => {
      const id = ++nextFrame;
      frames.set(id, callback);
      return id;
    }),
    cancelAnimationFrame: vi.fn((id: number) => frames.delete(id)),
    requestIdleCallback: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
  observerObserve = vi.fn();
  observerDisconnect = vi.fn();
  observerConstructor = vi.fn(function () {
    return { observe: observerObserve, disconnect: observerDisconnect };
  });
  network = vi.fn(() => {
    throw new Error("Network forbidden in website-call scaffold tests");
  });
  vi.stubGlobal("fetch", network);
  vi.stubGlobal("window", fakeWindow);
  vi.stubGlobal("document", doc);
  vi.stubGlobal("localStorage", storage);
  vi.stubGlobal("Element", FakeElement);
  vi.stubGlobal("MutationObserver", observerConstructor);
  vi.stubGlobal("NodeFilter", { SHOW_TEXT: 4 });
  actualShared = await vi.importActual<SharedWebsiteCall>(
    "../shared/csbWebsiteCall"
  );
  measurement = await import("../client/src/lib/googleMeasurement");
  targets = await import("../client/src/lib/businessPhoneTargets");
  tracking = await import("../client/src/lib/websiteCallTracking");
});

afterEach(() => {
  expect(network).not.toHaveBeenCalled();
  expect(storage.setItem).not.toHaveBeenCalled();
  expect(storage.removeItem).not.toHaveBeenCalled();
  targets.clearBusinessForwardingTargets();
  frames.clear();
  websiteCallMock.enabled = false;
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("verified production WEBSITE_CALL scaffold", () => {
  it("matches the genuine 60-second action and destination in the supplied Google readback", async () => {
    const config = actualShared.CSB_WEBSITE_CALL_CONFIG;
    expect(config).toEqual({
      destination: "AW-16481669131/XyJ7CIj98rMdEIugibM9",
      actionResourceName: VERIFIED_ACTION_READBACK.resourceName,
      type: VERIFIED_ACTION_READBACK.type,
      minimumCallSeconds: Number(
        VERIFIED_ACTION_READBACK.phoneCallDurationSeconds
      ),
      businessNumber: "07970 566409",
      verifiedSnippet: true,
    });
    expect(config!.actionResourceName).toBe(
      `customers/2361561845/conversionActions/${VERIFIED_ACTION_READBACK.id}`
    );
    expect(VERIFIED_ACTION_READBACK.tagSnippets[0].type).toBe(config!.type);
    expect(VERIFIED_ACTION_READBACK.tagSnippets[0].eventSnippet).toContain(
      `gtag('config', '${config!.destination}'`
    );
    expect(config!.minimumCallSeconds).toBe(60);
    expect(config!.minimumCallSeconds).not.toBe(120);
    expect(actualShared.verifiedWebsiteCallConfig(config)).toBe(config);
    expect(
      (await import("../shared/csbWebsiteCall")).CSB_WEBSITE_CALL_CONFIG
    ).toEqual(config);
    expect(config!.destination).not.toBe(FIXTURE.destination);
    expect(Object.values(CSB_GOOGLE_DESTINATIONS)).not.toContain(
      config!.destination
    );
  });

  it("keeps installation/cleanup and dispatch inert when old analytics/Ads acceptance has no call decision", () => {
    expect(WEBSITE_CALL_CONSENT_KEY).toBe("csb_website_call_consent");
    consent("accepted", "accepted", null);
    const cleanup = tracking.installWebsiteCallTracking("/contact");
    expect(typeof cleanup).toBe("function");
    cleanup();
    cleanup();
    expect(storage.getItem.mock.calls).toEqual([
      [COOKIE_CONSENT_STORAGE_KEY],
      [GOOGLE_MEASUREMENT_CONSENT_KEY],
      [WEBSITE_CALL_CONSENT_KEY],
    ]);
    expect(
      measurement.dispatchWebsiteCallConfig(
        actualShared.CSB_WEBSITE_CALL_CONFIG,
        vi.fn()
      )
    ).toBe(false);
    expect(storage.getItem).toHaveBeenCalledTimes(6);
    expectNoDomOrTrackingWork();
  });

  it("also installs a safe noop without window/document on the server", () => {
    vi.stubGlobal("window", undefined);
    vi.stubGlobal("document", undefined);
    expect(() =>
      tracking.installWebsiteCallTracking("/contact")()
    ).not.toThrow();
    expectNoDomOrTrackingWork();
  });
});

describe("shared verified website-call config validation", () => {
  it("accepts the synthetically typed fixture and rejects an absent config", () => {
    expect(actualShared.verifiedWebsiteCallConfig(FIXTURE)).toBe(FIXTURE);
    expect(actualShared.verifiedWebsiteCallConfig(null)).toBeNull();
    expect(actualShared.verifiedWebsiteCallConfig(undefined)).toBeNull();
    expect(Object.values(CSB_GOOGLE_DESTINATIONS)).not.toContain(
      FIXTURE.destination
    );
    for (const destination of [
      undefined,
      null,
      123,
      {},
      [FIXTURE.destination],
    ]) {
      expect(
        actualShared.verifiedWebsiteCallConfig({
          ...FIXTURE,
          destination,
        } as unknown as CSBWebsiteCallConfig)
      ).toBeNull();
    }
  });

  it("rejects every existing form, phone-click and WhatsApp-click destination", () => {
    for (const destination of Object.values(CSB_GOOGLE_DESTINATIONS)) {
      expect(
        actualShared.verifiedWebsiteCallConfig({ ...FIXTURE, destination })
      ).toBeNull();
    }
  });

  it("rejects a destination from a different Ads account", () => {
    expect(
      actualShared.verifiedWebsiteCallConfig({
        ...FIXTURE,
        destination: FIXTURE.destination.replace(
          GOOGLE_ADS_ID,
          "AW-99999999999"
        ),
      })
    ).toBeNull();
  });

  it("requires explicit verifiedSnippet=true, not false or a truthy string", () => {
    for (const verifiedSnippet of [false, "true", undefined]) {
      expect(
        actualShared.verifiedWebsiteCallConfig({
          ...FIXTURE,
          verifiedSnippet,
        } as unknown as CSBWebsiteCallConfig)
      ).toBeNull();
    }
  });

  it("rejects a 120-second threshold rather than silently calling it a 60-second action", () => {
    for (const config of [FIXTURE, actualShared.CSB_WEBSITE_CALL_CONFIG!]) {
      expect(
        actualShared.verifiedWebsiteCallConfig({
          ...config,
          minimumCallSeconds: 120,
        } as unknown as CSBWebsiteCallConfig)
      ).toBeNull();
    }
  });

  it("rejects non-WEBSITE_CALL action types", () => {
    for (const type of [
      "WEBPAGE",
      "CLICK_TO_CALL",
      "UPLOAD_CALLS",
      undefined,
    ]) {
      expect(
        actualShared.verifiedWebsiteCallConfig({
          ...FIXTURE,
          type,
        } as unknown as CSBWebsiteCallConfig)
      ).toBeNull();
    }
  });

  it("requires the exact original business number in the verified snippet", () => {
    for (const businessNumber of [
      "0808 123 4567",
      "+447970566409",
      "07970566409",
      "",
    ]) {
      expect(
        actualShared.verifiedWebsiteCallConfig({
          ...FIXTURE,
          businessNumber,
        } as unknown as CSBWebsiteCallConfig)
      ).toBeNull();
    }
  });

  it("rejects malformed action-resource names", () => {
    for (const actionResourceName of [
      "",
      "conversionActions/123456789",
      "customers/nope/conversionActions/123",
      "customers/123/conversionActions/nope",
      "customers/123/conversionActions/456/extra",
      "https://google.example/customers/123/conversionActions/456",
    ]) {
      expect(
        actualShared.verifiedWebsiteCallConfig({
          ...FIXTURE,
          actionResourceName,
        })
      ).toBeNull();
    }
  });

  it("rejects placeholder labels, malformed destinations, and labels outside length limits", () => {
    for (const label of [
      "placeholder1234",
      "PENDING_123456",
      "example123456",
      "replace123456",
      "TEST_LABEL_1234",
      "short",
      "A".repeat(101),
      "invalid/label1234",
      "invalid label1234",
    ]) {
      expect(
        actualShared.verifiedWebsiteCallConfig({
          ...FIXTURE,
          destination: `${GOOGLE_ADS_ID}/${label}`,
        })
      ).toBeNull();
    }
    expect(
      actualShared.verifiedWebsiteCallConfig({
        ...FIXTURE,
        destination: GOOGLE_ADS_ID,
      })
    ).toBeNull();
  });
});

describe("separate affirmative website-call consent", () => {
  it.each([null, "declined", "true"])(
    "blocks production call config and forwarding for call choice %s but keeps ordinary click measurement",
    websiteCall => {
      consent("accepted", "accepted", websiteCall);
      expect(measurement.currentGoogleConsent()).toEqual({
        analytics: true,
        advertising: true,
      });
      expect(measurement.currentWebsiteCallConsent()).toBe(false);
      const callback = vi.fn();
      expect(
        measurement.dispatchWebsiteCallConfig(
          actualShared.CSB_WEBSITE_CALL_CONFIG,
          callback
        )
      ).toBe(false);
      tracking.installWebsiteCallTracking("/contact")();
      const link = new FakeElement({
        href: `tel:${FORWARD_DIAL}`,
      }) as unknown as Element;
      targets.setBusinessForwardingDial(FORWARD_DIAL);
      targets.registerBusinessPhoneLink(link, `tel:${FORWARD_DIAL}`);
      expect(targets.businessPhoneDialTarget("07970566409")).toBe(
        "07970566409"
      );
      expect(targets.isManagedBusinessPhoneLink(link)).toBe(false);
      expect(callback).not.toHaveBeenCalled();
      expectNoDomOrTrackingWork();
      expect(fakeWindow.dataLayer).toEqual([]);

      expect(
        measurement.dispatchGoogleEvent("phone_call", {
          phone_number: "07970566409",
        })
      ).toBe(true);
      expect(calls().filter(call => call[0] === "event")).toEqual([
        ["event", "phone_call", { phone_number: "07970566409" }],
      ]);
      expect(
        configCalls().some(
          call => call[1] === actualShared.CSB_WEBSITE_CALL_CONFIG!.destination
        )
      ).toBe(false);
      expect(measurement.currentWebsiteCallConsent()).toBe(false);
      expect(values.get(COOKIE_CONSENT_STORAGE_KEY)).toBe("accepted");
      expect(values.get(GOOGLE_MEASUREMENT_CONSENT_KEY)).toBe("accepted");
      expect(values.get(WEBSITE_CALL_CONSENT_KEY) ?? null).toBe(websiteCall);
    }
  );

  it("requires analytics and advertising acceptance even when separate call consent is accepted", () => {
    for (const [analytics, advertising] of [
      [null, null],
      [null, "accepted"],
      ["declined", "accepted"],
      ["accepted", null],
      ["accepted", "declined"],
      ["accepted", "true"],
    ]) {
      consent(analytics, advertising, "accepted");
      expect(measurement.currentWebsiteCallConsent()).toBe(false);
      expect(
        measurement.dispatchWebsiteCallConfig(
          actualShared.CSB_WEBSITE_CALL_CONFIG,
          vi.fn()
        )
      ).toBe(false);
      tracking.installWebsiteCallTracking("/contact")();
    }
    expectNoDomOrTrackingWork();
    consent("accepted", "accepted", "accepted");
    expect(measurement.currentWebsiteCallConsent()).toBe(true);
  });

  it("dispatches the real verified production destination only after all three choices are accepted", () => {
    consent("accepted", "accepted", "accepted");
    const callback = vi.fn();
    expect(
      measurement.dispatchWebsiteCallConfig(
        actualShared.CSB_WEBSITE_CALL_CONFIG,
        callback
      )
    ).toBe(true);
    expect(configCalls().at(-1)).toEqual([
      "config",
      "AW-16481669131/XyJ7CIj98rMdEIugibM9",
      {
        phone_conversion_number: "07970 566409",
        phone_conversion_callback: expect.any(Function),
        send_page_view: false,
        allow_ad_personalization_signals: false,
      },
    ]);
    expect(configCalls().some(call => call[1] === FIXTURE.destination)).toBe(
      false
    );
    configCalls()
      .at(-1)![2]
      .phone_conversion_callback("0808 123 4567", FORWARD_DIAL);
    expect(callback).toHaveBeenCalledWith("0808 123 4567", FORWARD_DIAL);
    expect(calls().filter(call => call[0] === "event")).toEqual([]);
    expect(doc.createElement).not.toHaveBeenCalled();
    expect(doc.head.appendChild).not.toHaveBeenCalled();
  });

  it.each([null, "declined"])(
    "suppresses an already-issued production callback when only call choice becomes %s",
    websiteCall => {
      consent("accepted", "accepted", "accepted");
      const callback = vi.fn();
      expect(
        measurement.dispatchWebsiteCallConfig(
          actualShared.CSB_WEBSITE_CALL_CONFIG,
          callback
        )
      ).toBe(true);
      const googleCallback = configCalls().at(-1)![2].phone_conversion_callback;
      googleCallback("0808 123 4567", FORWARD_DIAL);
      expect(callback).toHaveBeenCalledTimes(1);
      consent("accepted", "accepted", websiteCall);
      expect(measurement.currentGoogleConsent()).toEqual({
        analytics: true,
        advertising: true,
      });
      googleCallback("0808 123 4567", FORWARD_DIAL);
      expect(callback).toHaveBeenCalledTimes(1);
      expect(measurement.dispatchGoogleEvent("phone_call")).toBe(true);
    }
  );
});

describe("production call-only withdrawal cleanup", () => {
  it.each([
    { event: COOKIE_CONSENT_CHANGE_EVENT, websiteCall: "declined" },
    { event: "storage", websiteCall: null },
  ])(
    "restores business numbers and rejects stale callbacks after $event withdrawal",
    ({ event, websiteCall }) => {
      consent("accepted", "accepted", "accepted");
      const marker = new FakeElement();
      marker.dataset.csbRouteReady = "/contact";
      const link = Object.assign(new FakeElement({ href: "tel:07970566409" }), {
        isConnected: true,
        closest: vi.fn(() => null),
      });
      const text = {
        data: "Call 07970 566409",
        isConnected: true,
        parentElement: { closest: vi.fn(() => null) },
      };
      const root = {
        querySelector: vi.fn(() => marker),
        querySelectorAll: vi.fn(() => [link]),
      };
      doc.getElementById.mockReturnValue(root);
      doc.createTreeWalker.mockImplementation(() => {
        let returned = false;
        return {
          nextNode: vi.fn(() => {
            if (returned) return null;
            returned = true;
            return text;
          }),
        };
      });
      const cleanup = tracking.installWebsiteCallTracking("/contact");
      runFrames();
      const phoneConfig = configCalls().find(
        call => call[1] === actualShared.CSB_WEBSITE_CALL_CONFIG!.destination
      )!;
      expect(phoneConfig).toBeDefined();
      const callback = phoneConfig[2].phone_conversion_callback;
      callback("0808 123 4567", FORWARD_DIAL);
      expect(link.getAttribute("href")).toBe(`tel:${FORWARD_DIAL}`);
      expect(text.data).toBe("Call 0808 123 4567");
      expect(targets.businessPhoneDialTarget("07970566409")).toBe(FORWARD_DIAL);
      expect(
        targets.isManagedBusinessPhoneLink(link as unknown as Element)
      ).toBe(true);

      const onReady = fakeWindow.addEventListener.mock.calls.find(
        call => call[0] === "csb:google-measurement-ready"
      )![1];
      onReady();
      expect(frames.size).toBe(1);
      consent("accepted", "accepted", websiteCall);
      expect(measurement.currentGoogleConsent()).toEqual({
        analytics: true,
        advertising: true,
      });
      const onWithdrawal = fakeWindow.addEventListener.mock.calls.find(
        call => call[0] === event
      )![1];
      onWithdrawal();
      expect(observerDisconnect).toHaveBeenCalled();
      expect(fakeWindow.cancelAnimationFrame).toHaveBeenCalledTimes(1);
      expect(frames.size).toBe(0);
      expect(fakeWindow.removeEventListener).toHaveBeenCalledTimes(3);
      expect(link.getAttribute("href")).toBe("tel:07970566409");
      expect(text.data).toBe("Call 07970 566409");
      expect(targets.businessPhoneDialTarget("07970566409")).toBe(
        "07970566409"
      );
      expect(
        targets.isManagedBusinessPhoneLink(link as unknown as Element)
      ).toBe(false);
      callback("0808 123 4567", FORWARD_DIAL);
      expect(link.getAttribute("href")).toBe("tel:07970566409");
      expect(measurement.dispatchGoogleEvent("phone_call")).toBe(true);

      // Reacceptance cannot revive the removed integration or replay its callback.
      consent("accepted", "accepted", "accepted");
      callback("0808 123 4567", FORWARD_DIAL);
      onReady();
      runFrames();
      expect(link.getAttribute("href")).toBe("tel:07970566409");
      expect(text.data).toBe("Call 07970 566409");
      expect(targets.businessPhoneDialTarget("07970566409")).toBe(
        "07970566409"
      );
      expect(
        configCalls().filter(
          call => call[1] === actualShared.CSB_WEBSITE_CALL_CONFIG!.destination
        )
      ).toHaveLength(1);
      cleanup();
      cleanup();
      expect(fakeWindow.removeEventListener).toHaveBeenCalledTimes(3);
      expect(doc.createElement).not.toHaveBeenCalled();
      expect(doc.head.appendChild).not.toHaveBeenCalled();
    }
  );
});

describe("Google website-call config dispatch", () => {
  it("uses phone config/callback after the existing Ads config, never conversion or a web-code duration claim", () => {
    consent("accepted", "accepted");
    const callback = vi.fn();
    const loader = doc.loader;
    expect(measurement.dispatchWebsiteCallConfig(FIXTURE, callback)).toBe(true);
    expect(configCalls()).toEqual([
      ["config", GA_ID, expect.any(Object)],
      ["config", GOOGLE_ADS_ID, { allow_ad_personalization_signals: false }],
      [
        "config",
        FIXTURE.destination,
        {
          phone_conversion_number: "07970 566409",
          phone_conversion_callback: expect.any(Function),
          send_page_view: false,
          allow_ad_personalization_signals: false,
        },
      ],
    ]);
    const phoneParams = configCalls().at(-1)![2];
    for (const key of [
      "minimumCallSeconds",
      "phone_conversion_minimum_call_duration",
      "call_duration",
      "call_duration_threshold",
      "value",
      "currency",
      "send_to",
    ])
      expect(phoneParams).not.toHaveProperty(key);
    expect(calls().filter(call => call[0] === "event")).toEqual([]);
    expect(callback).not.toHaveBeenCalled();
    phoneParams.phone_conversion_callback("0808 123 4567", FORWARD_DIAL);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("0808 123 4567", FORWARD_DIAL);
    expect(doc.loader).toBe(loader);
    expect(doc.createElement).not.toHaveBeenCalled();
    expect(doc.head.appendChild).not.toHaveBeenCalled();
    expect(fakeWindow.requestIdleCallback).not.toHaveBeenCalled();
  });

  it("reuses a configured Ads base without another base config or extra loader", () => {
    consent("accepted", "accepted");
    expect(measurement.syncGoogleConsent()).toBe(true);
    expect(measurement.dispatchWebsiteCallConfig(FIXTURE, vi.fn())).toBe(true);
    fakeWindow.location.hostname = "www.commercialshotblasting.co.uk";
    expect(measurement.dispatchWebsiteCallConfig(FIXTURE, vi.fn())).toBe(true);
    expect(
      configCalls().filter(call => call[1] === GOOGLE_ADS_ID)
    ).toHaveLength(1);
    expect(
      configCalls().filter(call => call[1] === FIXTURE.destination)
    ).toHaveLength(2);
    expect(doc.createElement).not.toHaveBeenCalled();
    expect(doc.head.appendChild).not.toHaveBeenCalled();
  });

  it("requires prior analytics/Ads consent to be exactly accepted even with call permission and a loaded tag", () => {
    for (const [analytics, advertising] of [
      [null, null],
      ["accepted", null],
      ["accepted", "declined"],
      [null, "accepted"],
      ["declined", "accepted"],
      ["accepted", "true"],
    ]) {
      consent(analytics, advertising, "accepted");
      expect(measurement.dispatchWebsiteCallConfig(FIXTURE, vi.fn())).toBe(
        false
      );
    }
    expect(fakeWindow.gtag).not.toHaveBeenCalled();
    consent("accepted", "accepted");
    expect(measurement.dispatchWebsiteCallConfig(FIXTURE, vi.fn())).toBe(true);
  });

  it("blocks a missing or not-yet-loaded existing script without queueing a phone config", () => {
    consent("accepted", "accepted");
    doc.loader = null;
    expect(measurement.dispatchWebsiteCallConfig(FIXTURE, vi.fn())).toBe(false);
    doc.loader = new FakeElement();
    doc.loader.dataset.csbAnalyticsLoader = "true";
    for (const status of [undefined, "false", "TRUE"]) {
      if (status === undefined) delete doc.loader.dataset.csbAnalyticsLoaded;
      else doc.loader.dataset.csbAnalyticsLoaded = status;
      expect(measurement.dispatchWebsiteCallConfig(FIXTURE, vi.fn())).toBe(
        false
      );
    }
    expect(fakeWindow.gtag).not.toHaveBeenCalled();
    expect(doc.createElement).not.toHaveBeenCalled();
    expect(doc.head.appendChild).not.toHaveBeenCalled();
  });

  it("blocks foreign, preview and lookalike hostnames", () => {
    consent("accepted", "accepted");
    for (const hostname of [
      "localhost",
      "preview.manus.space",
      "commercialshotblasting.co.uk.evil.example",
      "othercommercialshotblasting.co.uk",
    ]) {
      fakeWindow.location.hostname = hostname;
      expect(measurement.dispatchWebsiteCallConfig(FIXTURE, vi.fn())).toBe(
        false
      );
    }
    expect(fakeWindow.gtag).not.toHaveBeenCalled();
    expect(doc.querySelector).not.toHaveBeenCalled();
  });

  it("blocks null or click-action config before all Google/DOM work", () => {
    consent("accepted", "accepted");
    expect(measurement.dispatchWebsiteCallConfig(null, vi.fn())).toBe(false);
    expect(
      measurement.dispatchWebsiteCallConfig(
        {
          ...FIXTURE,
          destination: CSB_GOOGLE_DESTINATIONS.phone_click,
        },
        vi.fn()
      )
    ).toBe(false);
    expect(fakeWindow.gtag).not.toHaveBeenCalled();
    expect(doc.querySelector).not.toHaveBeenCalled();
  });

  it("contains throwing Google-tag code so website-call measurement is nonfatal", () => {
    consent("accepted", "accepted");
    measurement.syncGoogleConsent();
    fakeWindow.gtag.mockImplementation(() => {
      throw new Error("Blocked tag");
    });
    let result: boolean | undefined;
    expect(() => {
      result = measurement.dispatchWebsiteCallConfig(FIXTURE, vi.fn());
    }).not.toThrow();
    expect(result).toBe(false);
    expect(doc.head.appendChild).not.toHaveBeenCalled();
  });

  it("rechecks consent for asynchronous callbacks and contains callback exceptions", () => {
    consent("accepted", "accepted");
    const callback = vi.fn(() => {
      throw new Error("Consumer callback failed");
    });
    expect(measurement.dispatchWebsiteCallConfig(FIXTURE, callback)).toBe(true);
    const googleCallback = configCalls().at(-1)![2]
      .phone_conversion_callback as (
      formatted: unknown,
      mobile: unknown
    ) => void;
    expect(() => googleCallback("0808 123 4567", FORWARD_DIAL)).not.toThrow();
    expect(callback).toHaveBeenCalledTimes(1);
    consent("accepted", "declined");
    googleCallback("0808 123 4567", FORWARD_DIAL);
    consent("accepted", "accepted");
    measurement.setGoogleChoiceBlocked(true);
    googleCallback("0808 123 4567", FORWARD_DIAL);
    measurement.setGoogleChoiceBlocked(false);
    storage.getItem.mockImplementation(() => {
      throw new Error("Storage unavailable");
    });
    googleCallback("0808 123 4567", FORWARD_DIAL);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("fails closed for explicit withdrawal or inaccessible consent storage", () => {
    consent("accepted", "accepted");
    measurement.setGoogleChoiceBlocked(true);
    expect(measurement.dispatchWebsiteCallConfig(FIXTURE, vi.fn())).toBe(false);
    measurement.setGoogleChoiceBlocked(false);
    storage.getItem.mockImplementation(() => {
      throw new Error("Storage unavailable");
    });
    expect(() =>
      measurement.dispatchWebsiteCallConfig(FIXTURE, vi.fn())
    ).not.toThrow();
    expect(measurement.dispatchWebsiteCallConfig(FIXTURE, vi.fn())).toBe(false);
    expect(fakeWindow.gtag).not.toHaveBeenCalled();
  });
});

describe("forwarding-number callback validation", () => {
  it("accepts matching synthetic UK forwarding pairs and normalises only their dial target", () => {
    for (const [formatted, mobile] of [
      ["0808 123 4567", "08081234567"],
      ["0808 123 4567", FORWARD_DIAL],
      ["+44 808 123 4567", "448081234567"],
      ["0044 808 123 4567", "00448081234567"],
      ["0808 (123) 4567", FORWARD_DIAL],
    ]) {
      expect(tracking.validatedForwardingNumber(formatted, mobile)).toEqual({
        formatted,
        dial: FORWARD_DIAL,
      });
    }
  });

  it("recognises every original business-number pair as Google's fallback, not a forwarding target", () => {
    for (const [formatted, mobile] of [
      ["07970 566409", "07970566409"],
      ["07970 566409", "+447970566409"],
      ["+44 7970 566409", "447970566409"],
      ["0044 7970 566409", "00447970566409"],
    ])
      expect(tracking.validatedForwardingNumber(formatted, mobile)).toBeNull();
  });

  it("rejects foreign, mismatched, and incomplete phone-number pairs", () => {
    for (const [formatted, mobile] of [
      ["+1 202 555 0123", "+12025550123"],
      ["+33 1 23 45 67 89", "+33123456789"],
      ["0808 123 4568", FORWARD_DIAL],
      ["07970 566409", FORWARD_DIAL],
      ["0808 123 4567", "+448081234568"],
      ["0808 123 456", "0808123456"],
    ])
      expect(tracking.validatedForwardingNumber(formatted, mobile)).toBeNull();
  });

  it("rejects HTML, tel links, non-string values, oversized strings and malformed dial values", () => {
    for (const [formatted, mobile] of [
      ["<b>0808 123 4567</b>", FORWARD_DIAL],
      ["0808 123 4567<script>alert(1)</script>", FORWARD_DIAL],
      ["0808 123 4567", `tel:${FORWARD_DIAL}`],
      ["0808 123 4567", "+44 808 123 4567"],
      ["0808 123 4567", "++448081234567"],
      ["0808 123 4567", `${FORWARD_DIAL};ext=1`],
      ["0".repeat(41), FORWARD_DIAL],
      ["0808 123 4567", "0".repeat(26)],
      [null, FORWARD_DIAL],
      ["0808 123 4567", 448081234567],
      [{ toString: () => "0808 123 4567" }, FORWARD_DIAL],
    ])
      expect(tracking.validatedForwardingNumber(formatted, mobile)).toBeNull();
  });
});

describe("consent-sensitive business dial targets", () => {
  it("keeps the original business dial target while inactive or denied, with no later replay", () => {
    consent("accepted", "accepted");
    expect(targets.businessPhoneDialTarget("07970566409")).toBe("07970566409");
    targets.setBusinessForwardingDial(FORWARD_DIAL);
    for (const [analytics, advertising] of [
      [null, null],
      ["accepted", null],
      ["accepted", "declined"],
      ["declined", "accepted"],
    ]) {
      consent(analytics, advertising);
      expect(targets.businessPhoneDialTarget("07970566409")).toBe(
        "07970566409"
      );
    }
    consent("accepted", "accepted");
    measurement.setGoogleChoiceBlocked(true);
    expect(targets.businessPhoneDialTarget("07970566409")).toBe("07970566409");
    expect(fakeWindow.gtag).not.toHaveBeenCalled();
  });

  it("forwards only the real business number's national/international variants", () => {
    consent("accepted", "accepted");
    targets.setBusinessForwardingDial(FORWARD_DIAL);
    for (const original of [
      "07970566409",
      "07970 566409",
      "+447970566409",
      "+44 (7970) 566409",
      "447970566409",
      "00447970566409",
      "0044 7970 566409",
    ])
      expect(targets.businessPhoneDialTarget(original)).toBe(FORWARD_DIAL);
  });

  it("leaves other people's numbers unchanged even when forwarding is active", () => {
    consent("accepted", "accepted");
    targets.setBusinessForwardingDial(FORWARD_DIAL);
    for (const original of [
      "07123456789",
      "+447123456789",
      "02079460123",
      "079705664090",
      "",
      FORWARD_DIAL,
    ]) {
      expect(targets.businessPhoneDialTarget(original)).toBe(original);
    }
  });

  it("recognises managed links only with the exact registered href, active forwarding, and consent", () => {
    const link = new FakeElement({ href: `tel:${FORWARD_DIAL}` });
    const unrelated = new FakeElement({ href: `tel:${FORWARD_DIAL}` });
    const element = link as unknown as Element;
    consent("accepted", "accepted");
    targets.registerBusinessPhoneLink(element, `tel:${FORWARD_DIAL}`);
    expect(targets.isManagedBusinessPhoneLink(element)).toBe(false);
    targets.setBusinessForwardingDial(FORWARD_DIAL);
    expect(targets.isManagedBusinessPhoneLink(element)).toBe(true);
    expect(
      targets.isManagedBusinessPhoneLink(unrelated as unknown as Element)
    ).toBe(false);
    link.setAttribute("href", "tel:07123456789");
    expect(targets.isManagedBusinessPhoneLink(element)).toBe(false);
    link.setAttribute("href", `tel:${FORWARD_DIAL}`);
    consent("accepted", "declined");
    expect(targets.isManagedBusinessPhoneLink(element)).toBe(false);
    consent("accepted", "accepted");
    measurement.setGoogleChoiceBlocked(true);
    expect(targets.isManagedBusinessPhoneLink(element)).toBe(false);
  });

  it("clears the in-memory dial and link registry without writing tracking identifiers", () => {
    consent("accepted", "accepted");
    const link = new FakeElement({
      href: `tel:${FORWARD_DIAL}`,
    }) as unknown as Element;
    targets.setBusinessForwardingDial(FORWARD_DIAL);
    targets.registerBusinessPhoneLink(link, `tel:${FORWARD_DIAL}`);
    expect(targets.isManagedBusinessPhoneLink(link)).toBe(true);
    targets.clearBusinessForwardingTargets();
    expect(targets.businessPhoneDialTarget("07970566409")).toBe("07970566409");
    expect(targets.isManagedBusinessPhoneLink(link)).toBe(false);
    targets.setBusinessForwardingDial(FORWARD_DIAL);
    expect(targets.isManagedBusinessPhoneLink(link)).toBe(false);
    expect(storage.setItem).not.toHaveBeenCalled();
  });
});

describe("test-only enabled scaffold integration", () => {
  it("waits for the inert existing loader and ignores callback results after cleanup", async () => {
    websiteCallMock.enabled = true;
    vi.resetModules();
    const enabledShared = await import("../shared/csbWebsiteCall");
    const enabledTracking = await import(
      "../client/src/lib/websiteCallTracking"
    );
    const enabledTargets = await import(
      "../client/src/lib/businessPhoneTargets"
    );
    expect(enabledShared.CSB_WEBSITE_CALL_CONFIG).toEqual(FIXTURE);
    expect(actualShared.CSB_WEBSITE_CALL_CONFIG).not.toBeNull();
    expect(actualShared.CSB_WEBSITE_CALL_CONFIG!.destination).toBe(
      "AW-16481669131/XyJ7CIj98rMdEIugibM9"
    );
    consent("accepted", "accepted");
    const marker = new FakeElement();
    marker.dataset.csbRouteReady = "/contact";
    const root = {
      querySelector: vi.fn(() => marker),
      querySelectorAll: vi.fn(() => []),
    };
    doc.getElementById.mockReturnValue(root);
    doc.loader!.dataset.csbAnalyticsLoaded = "false";
    const cleanup = enabledTracking.installWebsiteCallTracking("/contact");
    expect(observerConstructor).toHaveBeenCalledTimes(1);
    expect(fakeWindow.addEventListener).toHaveBeenCalledTimes(3);
    runFrames();
    expect(fakeWindow.gtag).not.toHaveBeenCalled();
    doc.loader!.dataset.csbAnalyticsLoaded = "true";
    const onReady = fakeWindow.addEventListener.mock.calls.find(
      call => call[0] === "csb:google-measurement-ready"
    )![1];
    onReady();
    runFrames();
    const phoneConfig = configCalls().find(
      call => call[1] === FIXTURE.destination
    )!;
    expect(phoneConfig).toBeDefined();
    const callback = phoneConfig[2].phone_conversion_callback as (
      formatted: unknown,
      mobile: unknown
    ) => void;
    callback("0808 123 4567", FORWARD_DIAL);
    expect(enabledTargets.businessPhoneDialTarget("07970566409")).toBe(
      FORWARD_DIAL
    );
    callback("07970 566409", "+447970566409");
    expect(enabledTargets.businessPhoneDialTarget("07970566409")).toBe(
      "07970566409"
    );
    callback("0808 123 4567", FORWARD_DIAL);
    cleanup();
    cleanup();
    expect(fakeWindow.removeEventListener).toHaveBeenCalledTimes(3);
    callback("0808 123 4567", FORWARD_DIAL);
    expect(enabledTargets.businessPhoneDialTarget("07970566409")).toBe(
      "07970566409"
    );
    expect(doc.createElement).not.toHaveBeenCalled();
    expect(doc.head.appendChild).not.toHaveBeenCalled();
    expect(calls().filter(call => call[0] === "event")).toEqual([]);
  });
});
