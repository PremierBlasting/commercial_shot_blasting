import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const notice = readFileSync(resolve(projectRoot, "client/src/components/CookieConsent.tsx"), "utf8");
const app = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");

describe("manually opened cookie preferences", () => {
  it("never schedules or opens an automatic banner for any stored consent state", () => {
    expect(notice).not.toContain("setTimeout");
    expect(notice).not.toContain("showSettings");
    expect(notice).not.toContain("localStorage.getItem");
    expect(notice).toContain("const [isVisible, setIsVisible] = useState(false)");
    expect(notice).toContain("window.addEventListener(COOKIE_PREFERENCES_OPEN_EVENT, reopen)");
    expect(notice.match(/setIsVisible\(true\)/g)).toHaveLength(1);
  });

  it("closes settings without changing saved permission and restores focus", () => {
    const close = notice.slice(notice.indexOf("const closeSettings"), notice.indexOf("const saveChoices"));
    expect(close).toContain("setIsVisible(false)");
    expect(close).toContain("returnFocus.current?.focus()");
    expect(close).not.toContain("saveCookieMeasurementChoices");
    expect(notice).toContain('event.key === "Escape"');
    expect(notice).toContain('event.preventDefault(); closeSettings();');
    expect(notice).toContain('onClick={closeSettings}');
  });

  it("keeps the site-wide consent control mounted", () => {
    expect(app).toContain("<CookieConsent />");
  });

  it("keeps only manually opened settings clear of mobile contact controls", () => {
    expect(notice).toContain("fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-3 right-3");
    expect(notice).toContain("max-w-[21rem]");
    expect(notice).toContain("sm:max-w-[22rem]");
    expect(notice).toContain("sm:bottom-4 sm:left-4 sm:right-auto");
    expect(notice).not.toContain("fixed bottom-0 left-0 right-0");
  });

  it("retains equally clear accept and decline choices, privacy information and an accessible close action", () => {
    expect(notice).toContain('role="dialog"');
    expect(notice).toContain('aria-label="Cookie settings"');
    expect(notice).toContain("Allow");
    expect(notice).toContain("No thanks");
    expect(notice).toContain('href="/privacy-policy"');
    expect(notice).toContain('aria-label="Close cookie settings"');
  });

  it("continues to persist accepted and declined consent states", () => {
    expect(notice).toContain("saveChoices({ measurements: true, websiteCalls: true })");
    expect(notice).toContain("saveChoices({ measurements: false, websiteCalls: false })");
    expect(notice).toContain("saveCookieMeasurementChoices(next)");
    expect(notice).not.toContain('type="checkbox"');
    expect(notice).toContain("Save choices");
  });

  it("matches the website privacy date and manual-only choices with explicit call disclosure", () => {
    const privacy = readFileSync(resolve(projectRoot, "client/src/pages/PrivacyPolicy.tsx"), "utf8");
    expect(privacy).toContain("Last updated: 11 November 2026");
    expect(privacy).toContain("If you choose Allow all, or enable website-call measurement under Settings with Google advertising measurement");
    expect(privacy).toContain("Allow all explicitly includes the disclosed analytics, advertising and website-call purposes");
    expect(privacy).toContain("Choices are not enabled just by opening or closing Settings");
    expect(privacy).toContain("We do not show an automatic cookie popup");
    expect(privacy).toContain("Optional Google measurement is blocked until permitted");
    expect(privacy).toContain("here or in the footer to opt in, change or withdraw your choice");
    expect(privacy).toContain("Opening or closing Cookie settings does not change your saved choice");
    expect(privacy).not.toContain("The separate call option is unselected");
  });

  it("preserves the older privacy renderer, iframe disclosures and withdrawal controls", () => {
    const privacy = readFileSync(resolve(projectRoot, "client/src/pages/PrivacyPolicy.tsx"), "utf8");
    expect(privacy).toContain("<Header onOpenQuotePopup");
    expect(privacy).toContain("accepted HubSpot form enquiries");
    expect(privacy).toContain("Telephone and WhatsApp clicks are engagement only");
    expect(privacy).toContain("lasting at least 60 seconds");
    expect(privacy).toContain("We do not enable call recording");
    expect(privacy).toContain("<CookiePreferencesButton");
    expect(privacy).toContain("blocks subsequent forwarding configuration");
    expect(privacy).not.toContain("websitePrivacySections");
  });
});
