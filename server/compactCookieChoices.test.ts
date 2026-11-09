import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { COOKIE_CONSENT_STORAGE_KEY, GOOGLE_MEASUREMENT_CONSENT_KEY, WEBSITE_CALL_CONSENT_KEY, COOKIE_CONSENT_CHANGE_EVENT } from "../shared/cookieConsent";
const mocks = vi.hoisted(() => ({ blocked: vi.fn(), sync: vi.fn() }));
vi.mock("../client/src/lib/googleMeasurement", () => ({ setGoogleChoiceBlocked: mocks.blocked, syncGoogleConsent: mocks.sync }));
import { readCookieMeasurementChoices, saveCookieMeasurementChoices } from "../client/src/lib/cookiePreferences";
let values: Map<string,string>; let dispatch: ReturnType<typeof vi.fn>;
beforeEach(() => {
 values = new Map(); dispatch = vi.fn(); vi.clearAllMocks();
 vi.stubGlobal("localStorage", { getItem: vi.fn((key:string) => values.get(key) ?? null), setItem: vi.fn((key:string,value:string) => values.set(key,value)) });
 vi.stubGlobal("window", { dispatchEvent: dispatch });
 vi.stubGlobal("CustomEvent", class { type: string; detail: unknown; constructor(type:string, options:{detail:unknown}) { this.type=type; this.detail=options.detail; } });
});
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });
const set = (general:string,advertising:string,calls?:string) => { values.set(COOKIE_CONSENT_STORAGE_KEY,general);values.set(GOOGLE_MEASUREMENT_CONSENT_KEY,advertising);if(calls)values.set(WEBSITE_CALL_CONSENT_KEY,calls); };

describe("compact notice explicit preferences", () => {
 it("starts unset and never writes consent merely by reading", () => { expect(readCookieMeasurementChoices()).toEqual({ measurements:false, websiteCalls:false });expect(localStorage.setItem).not.toHaveBeenCalled();expect(mocks.sync).not.toHaveBeenCalled(); });
 it("does not upgrade older analytics/advertising acceptance to calls", () => { set("accepted","accepted");expect(readCookieMeasurementChoices()).toEqual({ measurements:true, websiteCalls:false });expect(localStorage.setItem).not.toHaveBeenCalled(); });
 it("retains a separately declined call purpose", () => { set("accepted","accepted","declined");expect(readCookieMeasurementChoices()).toEqual({ measurements:true, websiteCalls:false });expect(values.get(WEBSITE_CALL_CONSENT_KEY)).toBe("declined"); });
 it("reads previous full acceptance without changing it", () => { set("accepted","accepted","accepted");expect(readCookieMeasurementChoices()).toEqual({ measurements:true, websiteCalls:true }); });
 it("explicit Allow all grants all existing keys and sends one consent event", () => {
  saveCookieMeasurementChoices({measurements:true,websiteCalls:true});
  for(const key of [COOKIE_CONSENT_STORAGE_KEY,GOOGLE_MEASUREMENT_CONSENT_KEY,WEBSITE_CALL_CONSENT_KEY])expect(values.get(key)).toBe("accepted");
  expect(mocks.blocked).toHaveBeenCalledWith(false);expect(mocks.sync).toHaveBeenCalledTimes(1);expect(dispatch).toHaveBeenCalledTimes(1);
  expect(dispatch.mock.calls[0][0]).toMatchObject({type:COOKIE_CONSENT_CHANGE_EVENT,detail:{status:"accepted",source:"interaction"}});
 });
 it("No thanks withdraws every optional scope even after prior acceptance", () => { set("accepted","accepted","accepted");saveCookieMeasurementChoices({measurements:false,websiteCalls:false});for(const key of values.keys())expect(values.get(key)).toBe("declined");expect(mocks.blocked).toHaveBeenCalledWith(true);expect(mocks.sync).toHaveBeenCalledTimes(1); });
 it("saving call-only withdrawal retains analytics/advertising choices", () => { set("accepted","accepted","accepted");saveCookieMeasurementChoices({measurements:true,websiteCalls:false});expect(values.get(COOKIE_CONSENT_STORAGE_KEY)).toBe("accepted");expect(values.get(GOOGLE_MEASUREMENT_CONSENT_KEY)).toBe("accepted");expect(values.get(WEBSITE_CALL_CONSENT_KEY)).toBe("declined");expect(mocks.sync).toHaveBeenCalledTimes(1); });
 it("fails closed if an inconsistent caller requests calls without measurement", () => { saveCookieMeasurementChoices({measurements:false,websiteCalls:true});expect(values.get(WEBSITE_CALL_CONSENT_KEY)).toBe("declined");expect(mocks.blocked).toHaveBeenCalledWith(true); });
 it("blocked storage returns no permitted choices", () => { vi.mocked(localStorage.getItem).mockImplementation(() => { throw new Error("blocked"); });expect(readCookieMeasurementChoices()).toEqual({measurements:false,websiteCalls:false}); });
 it("blocked save stops Google immediately and still broadcasts withdrawal", () => { vi.mocked(localStorage.setItem).mockImplementation(() => { throw new Error("blocked"); });saveCookieMeasurementChoices({measurements:true,websiteCalls:true});expect(mocks.blocked).toHaveBeenCalledWith(true);expect(mocks.sync).toHaveBeenCalledTimes(1);expect(dispatch).toHaveBeenCalledTimes(1); });
 it("has no checkbox on the initial notice, clear all-purpose disclosure and separate settings", () => {
  const source=readFileSync(new URL("../client/src/components/CookieConsent.tsx", import.meta.url),"utf8");
  expect(source).not.toContain('type="checkbox"');expect(source).toContain("Allow all");expect(source).toContain("No thanks");expect(source).toContain("Save choices");expect(source).toContain('role="switch"');expect(source).toContain('aria-label="Website call measurement"');
  expect(source).toContain("visits, enquiries and calls");expect(source).toContain("bottom-[calc(4.5rem+env(safe-area-inset-bottom))]");expect(source).not.toContain("top-24");
 });
});
