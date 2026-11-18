import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "wouter";
import { getRenderingPilot, type PilotRenderValues } from "@shared/renderingPilot";
import type { RouteMetadataRecord } from "@shared/routeMetadata";

export type PilotRenderSeed = {
  pathname: string;
  renderValues: PilotRenderValues;
  metadata?: RouteMetadataRecord | null;
  /** Request URL stays in memory for routing; it is never part of render boot. */
  url?: string;
};
export type PilotRenderContextValue = {
  initial: PilotRenderSeed | null;
  synchronousPilotId: string | null;
  adoptsServerSchema: boolean;
  deterministicDates: boolean;
};
const PilotContext = createContext<PilotRenderContextValue>({
  initial: null, synchronousPilotId: null, adoptsServerSchema: false, deterministicDates: false,
});

export function PilotRenderProvider({ seed = null, children }: { seed?: PilotRenderSeed | null; children: ReactNode }) {
  const [location] = useLocation();
  const [browserPresentation, setBrowserPresentation] = useState(false);
  const leftDocumentRoute = useRef(false);
  // Raw browser path avoids broadening the allowlist through Wouter's decoding.
  const pathname = typeof window === "undefined" ? location : window.location.pathname;
  if (seed && pathname !== seed.pathname) leftDocumentRoute.current = true;
  const documentPilot = seed && pathname === seed.pathname ? getRenderingPilot(pathname) : null;
  const synchronousPilot = !leftDocumentRoute.current ? documentPilot : null;
  // Preserve the maintained pages' existing data-ready/ref reconciliation after
  // their first commit, even when public query results were supplied by SSR.
  useEffect(() => { setBrowserPresentation(true); }, []);
  return <PilotContext.Provider value={{
    initial: seed,
    synchronousPilotId: synchronousPilot?.id ?? null,
    // Only the successfully rendered document's existing server graphs are adopted.
    // They remain owned by the server head after leaving, so adopt them again on
    // exact document-route history return instead of emitting duplicate scripts.
    // Other hard loads / SPA destinations keep their legacy schema components.
    adoptsServerSchema: !!documentPilot,
    deterministicDates: !!synchronousPilot && !browserPresentation,
  }}>{children}</PilotContext.Provider>;
}
export function usePilotRenderContext() { return useContext(PilotContext); }
export function useAdoptPilotServerSchema() { return usePilotRenderContext().adoptsServerSchema; }
export function usePilotDateFormatter() {
  const { deterministicDates } = usePilotRenderContext();
  return (value: Date | string | number, options: Intl.DateTimeFormatOptions): string =>
    new Date(value).toLocaleDateString("en-GB", deterministicDates ? { ...options, timeZone: "Europe/London" } : options);
}
export function usePilotYear(): number {
  const { initial, deterministicDates } = usePilotRenderContext();
  const [year, setYear] = useState(() => deterministicDates && initial ? initial.renderValues.year : new Date().getFullYear());
  // React bails out when the browser year equals the initial request year.
  useEffect(() => { setYear(new Date().getFullYear()); }, [initial?.renderValues.year, deterministicDates]);
  return year;
}

export type PilotFormInitialValues = {
  name: string; phone: string; email: string; postcode: string; message: string;
};
/** Read existing browser controls only. Never part of the public render seed. */
export function readPilotFormInitialValues(
  fieldId: string, enabled: boolean, doc?: Document,
): PilotFormInitialValues {
  const empty = { name: "", phone: "", email: "", postcode: "", message: "" };
  if (!enabled || !doc) return empty;
  const root = doc.getElementById("root");
  if (!root) return empty;
  const fields = [
    ["name", "INPUT", "text"], ["phone", "INPUT", "tel"],
    ["email", "INPUT", "email"], ["postcode", "INPUT", "text"],
    ["message", "TEXTAREA", null],
  ] as const;
  let matchedForm: Element | null = null;
  const values = { ...empty };
  for (const [key, tag, type] of fields) {
    const control = doc.getElementById(`${fieldId}-${key}`) as HTMLInputElement | HTMLTextAreaElement | null;
    const form = control?.closest("form");
    if (!control || control.tagName !== tag || !control.required || !control.isConnected ||
        !root.contains(control) || !form || !root.contains(form) ||
        (type !== null && control.getAttribute("type") !== type) ||
        (matchedForm && form !== matchedForm)) return empty;
    matchedForm = form;
    values[key] = control.value;
  }
  return values;
}
/** One private snapshot per form; only a matching hydrated document can supply it. */
export function usePilotFormInitialValues(fieldId: string): PilotFormInitialValues {
  const { synchronousPilotId, deterministicDates } = usePilotRenderContext();
  const snapshot = useRef<PilotFormInitialValues | null>(null);
  if (snapshot.current === null) {
    snapshot.current = readPilotFormInitialValues(
      fieldId, !!synchronousPilotId && deterministicDates && typeof window !== "undefined",
      typeof document === "undefined" ? undefined : document,
    );
  }
  return snapshot.current;
}
