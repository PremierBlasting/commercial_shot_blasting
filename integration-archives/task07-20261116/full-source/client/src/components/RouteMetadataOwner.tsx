import { createContext, useContext, useLayoutEffect, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { resolveRouteMetadata, getRouteMetadataTags, getRouteMetadataCanonical, ROUTE_METADATA_MANAGED_KEYS, type RouteMetadataRecord, type RouteMetadataInput } from "@shared/routeMetadata";

export interface MetadataRouteKey { pathname: string; generation: number }
export interface MetadataSnapshot extends MetadataRouteKey { metadata: RouteMetadataRecord }
function actualPathname(url: string): string {
  try { return new URL(url, "https://commercialshotblasting.co.uk").pathname; }
  catch { return "/"; }
}

/** Only body-root IDs verified in existing injectors; never an ssr substring scan. */
export function removeClippedServerBodyRoots(doc: Document = document): void {
  const reactRoot = doc.getElementById("root");
  for (const root of Array.from(doc.querySelectorAll<HTMLElement>("#ssr-content, #ssr-service-content, #ssr-county-content"))) {
    if (!doc.body.contains(root) || reactRoot?.contains(root) || (reactRoot && root.contains(reactRoot))) continue;
    let clipped = false;
    for (let node: HTMLElement | null = root; node && node !== doc.body; node = node.parentElement) {
      const style = node.style;
      if (style.position === "absolute" && style.width === "1px" && style.height === "1px" && style.overflow === "hidden" &&
          (/rect\(\s*0(?:px)?[ ,]+0(?:px)?[ ,]+0(?:px)?[ ,]+0(?:px)?\s*\)/i.test(style.clip) || /inset\(50%\)/i.test(style.clipPath))) clipped = true;
    }
    // Never delete scripts/schema or React content as part of body-copy cleanup.
    if (clipped && !root.querySelector("script, #root") && root.tagName !== "SCRIPT") root.remove();
  }
}

const MANAGED_META_KEYS = new Set(ROUTE_METADATA_MANAGED_KEYS);
/** The shared serializer's tag projection is also the browser's complete source. */
export function reconcileRouteMetadataHead(record: RouteMetadataRecord, doc: Document = document): void {
  const titles = Array.from(doc.head.querySelectorAll("title"));
  const title = titles.shift() ?? doc.createElement("title");
  title.textContent = record.title;
  if (!title.parentNode) doc.head.appendChild(title);
  titles.forEach(node => node.remove());
  const canonicalLinks = Array.from(doc.head.querySelectorAll<HTMLLinkElement>("link[rel]"))
    .filter(link => link.rel.toLowerCase().split(/\s+/).includes("canonical"));
  const canonicalHref = getRouteMetadataCanonical(record);
  if (canonicalHref) {
    const canonical = canonicalLinks.shift() ?? doc.createElement("link");
    canonical.rel = "canonical";
    canonical.setAttribute("href", canonicalHref);
    if (!canonical.parentNode) doc.head.appendChild(canonical);
  }
  canonicalLinks.forEach(node => node.remove());

  const tags = getRouteMetadataTags(record);
  for (const key of Array.from(MANAGED_META_KEYS)) {
    const matches = Array.from(doc.head.querySelectorAll<HTMLMetaElement>("meta[name], meta[property]"))
      .filter(meta => [meta.getAttribute("name"), meta.getAttribute("property")].some(name => name?.toLowerCase() === key));
    const desired = tags.filter(tag => tag.key === key);
    for (const tag of desired) {
      const meta = matches.shift() ?? doc.createElement("meta");
      meta.removeAttribute(tag.attribute === "name" ? "property" : "name");
      meta.setAttribute(tag.attribute, key);
      meta.setAttribute("content", tag.value);
      if (!meta.parentNode) doc.head.appendChild(meta);
    }
    matches.forEach(node => node.remove());
  }
  const alternateLinks = Array.from(doc.head.querySelectorAll<HTMLLinkElement>("link[rel]"))
    .filter(link => link.rel.toLowerCase().split(/\s+/).includes("alternate") && link.hasAttribute("hreflang"));
  for (const alternate of record.alternates) {
    const link = alternateLinks.shift() ?? doc.createElement("link");
    link.rel = "alternate";
    link.setAttribute("hreflang", alternate.hreflang);
    link.setAttribute("href", alternate.href);
    if (!link.parentNode) doc.head.appendChild(link);
  }
  alternateLinks.forEach(link => link.remove());
}

export function readRouteMetadataBoot(pathname: string, doc: Document = document): RouteMetadataRecord | null {
  const script = doc.getElementById("route-metadata-boot");
  if (!script || script.tagName !== "SCRIPT" || script.getAttribute("type") !== "application/json") return null;
  try {
    const record = JSON.parse(script.textContent ?? "") as RouteMetadataRecord;
    if (!record || typeof record.pathname !== "string" || record.pathname !== resolveRouteMetadata(pathname).pathname ||
        ![record.title, record.description, record.canonical, record.robots, record.state].every(value => typeof value === "string") ||
        !Array.isArray(record.articleTags) || !Array.isArray(record.alternates)) return null;
    return record;
  } catch { return null; }
}

export interface MetadataControllerOptions {
  url: string;
  document?: Document;
  getUrl?: () => string;
  resolve?: typeof resolveRouteMetadata;
  boot?: RouteMetadataRecord | null;
}
export function createMetadataController(options: MetadataControllerOptions) {
  const resolve = options.resolve ?? resolveRouteMetadata;
  const doc = options.document;
  let disposed = false;
  let currentUrl = options.url;
  const pathname = actualPathname(currentUrl);
  const defaults = resolve(currentUrl);
  const candidateBoot = options.boot ?? (doc ? readRouteMetadataBoot(pathname, doc) : null);
  const boot = candidateBoot?.pathname === defaults.pathname ? candidateBoot : null;
  let snapshot: MetadataSnapshot = { pathname, generation: 0, metadata: boot ?? defaults };
  const listeners = new Set<() => void>();
  const reconcile = () => { if (!disposed && doc) reconcileRouteMetadataHead(snapshot.metadata, doc); };
  const emit = () => { reconcile(); listeners.forEach(listener => listener()); };
  const navigate = (url: string) => {
    if (disposed) return;
    currentUrl = url;
    const pathname = actualPathname(url);
    if (pathname === snapshot.pathname) return;
    if (doc) removeClippedServerBodyRoots(doc);
    snapshot = { pathname, generation: snapshot.generation + 1, metadata: resolve(url) };
    emit();
  };
  return {
    getSnapshot: () => snapshot,
    navigate,
    reconcile,
    publish: (key: MetadataRouteKey, input: RouteMetadataInput): boolean => {
      if (disposed) return false;
      if (options.getUrl) navigate(options.getUrl());
      if (key.pathname !== snapshot.pathname || key.generation !== snapshot.generation) return false;
      if (input.pathname && input.pathname !== key.pathname) return false;
      if (input.state === "pending" && (snapshot.metadata.state === "ready" || snapshot.metadata.state === "published")) return false;
      const metadata = resolve(currentUrl, input);
      if (JSON.stringify(metadata) === JSON.stringify(snapshot.metadata)) return true;
      snapshot = { ...snapshot, metadata };
      emit();
      return true;
    },
    subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; },
    dispose: () => { disposed = true; listeners.clear(); },
  };
}
export type MetadataController = ReturnType<typeof createMetadataController>;
export const RouteMetadataContext = createContext<MetadataController | null>(null);
export function useRouteMetadataContext() { return useContext(RouteMetadataContext); }
const emptySnapshot: MetadataSnapshot = { pathname: "/", generation: -1, metadata: null as unknown as RouteMetadataRecord };
const emptySubscribe = () => () => {};
const getEmptySnapshot = () => emptySnapshot;

/** Capture generation in the source render, not when an async effect executes. */
export function useRouteMetadataInput(input: RouteMetadataInput | undefined, pathname?: string, generation?: number) {
  const controller = useRouteMetadataContext();
  const snapshot = useSyncExternalStore(controller?.subscribe ?? emptySubscribe, controller?.getSnapshot ?? getEmptySnapshot, controller?.getSnapshot ?? getEmptySnapshot);
  const renderedPathname = pathname ?? (typeof window === "undefined" ? snapshot.pathname : window.location.pathname);
  const renderedGeneration = generation ?? snapshot.generation;
  const serialized = JSON.stringify(input);
  useEffect(() => {
    if (controller && input) controller.publish({ pathname: renderedPathname, generation: renderedGeneration }, input);
  }, [controller, renderedPathname, renderedGeneration, serialized]);
}

export function RouteMetadataOwner({ children }: { children: ReactNode }) {
  const [controller] = useState(() => createMetadataController({
    url: typeof window === "undefined" ? "/" : window.location.href,
    document: typeof document === "undefined" ? undefined : document,
    getUrl: typeof window === "undefined" ? undefined : () => window.location.href,
  }));
  useLayoutEffect(() => {
    const navigate = () => controller.navigate(window.location.href);
    navigate();
    controller.reconcile();
    const events = ["popstate", "pushState", "replaceState", "hashchange"];
    events.forEach(event => window.addEventListener(event, navigate));
    // StrictMode replay must not dispose this instance or remove head/body.
    return () => { events.forEach(event => window.removeEventListener(event, navigate)); };
  }, [controller]);
  return <RouteMetadataContext.Provider value={controller}>{children}</RouteMetadataContext.Provider>;
}
