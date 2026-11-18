import superjson from "superjson";
import { hashKey, type DehydratedState } from "@tanstack/react-query";

/** v3 production-parity verification; release requires all acceptance gates. */
export const RENDERING_PILOT_ENABLED: boolean = true;
export const RENDERING_PILOT_RELEASE = "csb-task08-20261118-v3";
export const RENDERING_PILOT_MAX_BYTES = 2 * 1024 * 1024;
const PILOTS = [
  { id: "P0066", pathname: "/services/structural-steel-frames" },
  { id: "P0116", pathname: "/counties/hampshire" },
  { id: "P0002", pathname: "/blog/factory-warehouse-cladding-restoration" },
  { id: "P0001", pathname: "/" },
] as const;
export type PilotSeed = { queryKey: unknown[]; data: unknown };
export type PilotRenderValues = { year: number };
export type RenderingPilotBoot = {
  schemaVersion: 1; release: string; pathname: string; pilotId: string; success: true;
  renderValues: PilotRenderValues; state: ReturnType<typeof superjson.serialize>;
};

/** Raw matching only: no case folding, decoding, slash or URL normalization. */
export function splitRenderingUrl(url: string): { pathname: string; search: string } {
  const fragment = url.indexOf("#");
  const route = fragment < 0 ? url : url.slice(0, fragment);
  const question = route.indexOf("?");
  return question < 0 ? { pathname: route, search: "" } :
    { pathname: route.slice(0, question), search: route.slice(question + 1) };
}
export function getRenderingPilot(url: string): { id: string; pathname: string } | null {
  if (!RENDERING_PILOT_ENABLED || typeof url !== "string") return null;
  const { pathname } = splitRenderingUrl(url);
  const pilot = PILOTS.find(item => item.pathname === pathname);
  return pilot ? { ...pilot } : null;
}
const own = (value: object, key: string) => Object.prototype.hasOwnProperty.call(value, key);
function record(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value) &&
    (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}
function exact(value: unknown, keys: readonly string[]): value is Record<string, unknown> {
  return record(value) && Object.keys(value).length === keys.length && keys.every(key => own(value, key));
}
function only(value: unknown, keys: readonly string[]): value is Record<string, unknown> {
  return record(value) && Object.keys(value).every(key => keys.includes(key));
}
const string = (value: unknown) => typeof value === "string";
const nullableString = (value: unknown) => value === null || string(value);
const integer = (value: unknown) => typeof value === "number" && Number.isSafeInteger(value);
const date = (value: unknown) => value instanceof Date && Number.isFinite(value.getTime());
const nonempty = (value: unknown) => string(value) && (value as string).trim().length > 0;
const galleryFields = ["id", "title", "category", "description", "beforeImage", "afterImage", "isActive", "sortOrder", "createdAt", "updatedAt"];
const testimonialFields = ["id", "name", "company", "rating", "text", "project", "images", "isNew", "isActive", "sortOrder", "createdAt", "updatedAt"];
const blogFields = ["id", "slug", "title", "excerpt", "content", "featuredImage", "author", "category", "tags", "faq", "metaDescription", "isPublished", "publishedAt", "createdAt", "updatedAt"];
function safeStrings(value: unknown): boolean {
  if (typeof value === "string") return true;
  if (value instanceof Date) return date(value);
  if (Array.isArray(value)) return value.every(safeStrings);
  if (record(value)) return Object.entries(value).every(([key, item]) => !["__proto__", "prototype", "constructor"].includes(key) && safeStrings(item));
  return value === null || typeof value === "boolean" || (typeof value === "number" && Number.isFinite(value));
}
function jsonArray(value: unknown, faq = false): boolean {
  if (value === null || value === "") return true;
  if (typeof value !== "string") return false;
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) && parsed.every(item => faq ?
      exact(item, ["question", "answer"]) && nonempty(item.question) && nonempty(item.answer) && safeStrings(item) : string(item));
  } catch { return false; }
}
function safePrimaryMarkup(content: string): boolean {
  if (!content.trim() || /\u0000/.test(content) ||
    /<\s*\/?\s*(?:script|iframe|object|embed|style|link|meta|base|html|head|body|svg|math)\b|\bon[a-z]+\s*=|\bsrcdoc\s*=|(?:javascript|vbscript|data)\s*(?::|&#(?:0*58|x0*3a);?)|<!--|<!doctype|<\?/i.test(content)) return false;
  const attributes = Array.from(content.matchAll(/\b(?:href|src|action|formaction|xlink:href)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi));
  return attributes.every(match => {
    const url = match[1] ?? match[2] ?? match[3];
    return !/[\u0000-\u0020\u007f]|&#|&(?:colon|tab|newline);/i.test(url) &&
      (/^(?:https?:\/\/|\/|#|mailto:|tel:)/i.test(url) || !/^[a-z][a-z0-9+.-]*:/i.test(url));
  });
}
function publicBlog(value: unknown): value is Record<string, unknown> {
  if (!exact(value, blogFields) || !safeStrings(value)) return false;
  return integer(value.id) && (value.id as number) > 0 && nonempty(value.slug) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.slug as string) &&
    nonempty(value.title) && string(value.excerpt) && string(value.content) && string(value.featuredImage) && string(value.author) &&
    nullableString(value.category) && nullableString(value.metaDescription) && value.isPublished === true &&
    date(value.publishedAt) && date(value.createdAt) && date(value.updatedAt) && jsonArray(value.tags) && jsonArray(value.faq, true);
}
/** Reject unsafe primary HTML; this is rejection, never silent sanitization. */
export function isSafePilotArticle(value: unknown): boolean {
  return publicBlog(value) && !Object.values(value).some(item => typeof item === "string" && /<\s*\/\s*script\b/i.test(item)) &&
    safePrimaryMarkup(value.content as string);
}
function publicRows(kind: string, data: unknown): boolean {
  if (kind === "blog.getBySlug") return isSafePilotArticle(data);
  if (!Array.isArray(data)) return false;
  if (kind === "blog.list" || kind === "blog.getRelated") return data.every(publicBlog);
  if (kind === "gallery.list") return data.every(row => exact(row, galleryFields) && safeStrings(row) && integer(row.id) &&
    nonempty(row.title) && string(row.category) && nullableString(row.description) && string(row.beforeImage) && string(row.afterImage) &&
    row.isActive === true && integer(row.sortOrder) && date(row.createdAt) && date(row.updatedAt));
  if (kind === "testimonials.list") return data.every(row => exact(row, testimonialFields) && safeStrings(row) && integer(row.id) &&
    nonempty(row.name) && nullableString(row.company) && integer(row.rating) && string(row.text) && nullableString(row.project) &&
    Array.isArray(row.images) && row.images.every(string) && typeof row.isNew === "boolean" && row.isActive === true &&
    integer(row.sortOrder) && date(row.createdAt) && date(row.updatedAt));
  return false;
}
function keyKind(key: unknown): string | null {
  if (!Array.isArray(key) || key.length !== 2 || !Array.isArray(key[0]) || key[0].length !== 2 || !key[0].every(string)) return null;
  const kind = key[0].join(".");
  const options = key[1];
  if (["gallery.list", "testimonials.list", "blog.list"].includes(kind)) return exact(options, ["type"]) && options.type === "query" ? kind : null;
  if (!exact(options, ["type", "input"]) || options.type !== "query") return null;
  const input = options.input;
  if (kind === "blog.getBySlug") return exact(input, ["slug"]) && input.slug === "factory-warehouse-cladding-restoration" ? kind : null;
  if (kind === "blog.getRelated") return exact(input, ["slug", "category"]) && input.slug === "factory-warehouse-cladding-restoration" && nullableString(input.category) ? kind : null;
  return null;
}
/** Shared assertion for server seeds and deserialized browser cache. */
export function validatePilotSeeds(url: string, seeds: unknown): seeds is PilotSeed[] {
  const pilot = getRenderingPilot(url);
  if (!pilot || !Array.isArray(seeds)) return false;
  const allowed = pilot.id === "P0001" ? ["gallery.list", "testimonials.list", "blog.list"] :
    pilot.id === "P0066" ? ["gallery.list", "testimonials.list"] : pilot.id === "P0002" ? ["blog.getBySlug", "blog.getRelated"] : [];
  if (seeds.length !== allowed.length) return false;
  const seen = new Set<string>();
  for (const seed of seeds) {
    if (!exact(seed, ["queryKey", "data"])) return false;
    const kind = keyKind(seed.queryKey);
    if (!kind || !allowed.includes(kind) || seen.has(kind) || !publicRows(kind, seed.data)) return false;
    seen.add(kind);
  }
  if (pilot.id === "P0002") {
    const post = seeds.find(seed => keyKind(seed.queryKey) === "blog.getBySlug")!.data as Record<string, unknown>;
    const related = seeds.find(seed => keyKind(seed.queryKey) === "blog.getRelated")!;
    const input = (related.queryKey[1] as { input: { category: unknown } }).input;
    if (post.slug !== "factory-warehouse-cladding-restoration" || input.category !== (post.category ?? null) ||
      (related.data as Record<string, unknown>[]).some(item => item.slug === post.slug)) return false;
  }
  return true;
}
const queryStateFields = ["data", "dataUpdateCount", "dataUpdatedAt", "error", "errorUpdateCount", "errorUpdatedAt", "fetchFailureCount", "fetchFailureReason", "fetchMeta", "isInvalidated", "status", "fetchStatus"];
function validateCache(pathname: string, state: unknown): state is DehydratedState {
  if (!exact(state, ["queries", "mutations"]) || !Array.isArray(state.mutations) || state.mutations.length || !Array.isArray(state.queries)) return false;
  const seeds: PilotSeed[] = [];
  for (const query of state.queries) {
    if (!only(query, ["queryKey", "queryHash", "state", "dehydratedAt"]) || !own(query, "queryKey") || !own(query, "queryHash") ||
      !exact(query.state, queryStateFields) || !Array.isArray(query.queryKey) || query.queryHash !== hashKey(query.queryKey) ||
      (own(query, "dehydratedAt") && (!integer(query.dehydratedAt) || (query.dehydratedAt as number) < 0))) return false;
    const status = query.state;
    if (status.status !== "success" || status.fetchStatus !== "idle" || status.error !== null || status.fetchFailureReason !== null ||
      status.fetchMeta !== null || status.isInvalidated !== false || status.errorUpdateCount !== 0 || status.errorUpdatedAt !== 0 || status.fetchFailureCount !== 0 ||
      !integer(status.dataUpdateCount) || (status.dataUpdateCount as number) < 1 || !integer(status.dataUpdatedAt) || (status.dataUpdatedAt as number) < 0) return false;
    seeds.push({ queryKey: query.queryKey, data: status.data });
  }
  return validatePilotSeeds(pathname, seeds);
}
/** Strict release/path/public-data check: a populated root is never authorization to hydrate. */
export function validateRenderingPilotBoot(value: unknown, pathname: string): RenderingPilotBoot | null {
  try {
    const pilot = getRenderingPilot(pathname);
    if (!pilot || pilot.pathname !== pathname || !exact(value, ["schemaVersion", "release", "pathname", "pilotId", "success", "renderValues", "state"]) ||
      value.schemaVersion !== 1 || value.release !== RENDERING_PILOT_RELEASE || value.pathname !== pathname || value.pilotId !== pilot.id || value.success !== true ||
      !exact(value.renderValues, ["year"]) || !integer(value.renderValues.year) || (value.renderValues.year as number) < 2000 || (value.renderValues.year as number) > 9999 ||
      !only(value.state, ["json", "meta"]) || !own(value.state, "json") || new TextEncoder().encode(JSON.stringify(value)).byteLength > RENDERING_PILOT_MAX_BYTES) return null;
    // Only Date annotations are needed. Reject custom/error/regexp/class revival and reserved paths before deserialization.
    const serialized = value.state;
    if (serialized.meta !== undefined) {
      const datePath = /^(?:queries\.\d+\.state\.data(?:\.\d+)?\.(?:publishedAt|createdAt|updatedAt))$/;
      if (!only(serialized.meta, ["values", "referentialEqualities"]) || !record(serialized.meta.values) ||
        !Object.entries(serialized.meta.values).every(([path, annotation]) => datePath.test(path) &&
          Array.isArray(annotation) && annotation.length === 1 && annotation[0] === "Date")) return null;
      const references = serialized.meta.referentialEqualities;
      const annotations = serialized.meta.values;
      if (references !== undefined && (!record(references) || !Object.entries(references).every(([path, aliases]) =>
        datePath.test(path) && own(annotations, path) &&
        Array.isArray(aliases) && aliases.every(alias => typeof alias === "string" && datePath.test(alias) && own(annotations, alias))))) return null;
    }
    const cache = superjson.deserialize(serialized as unknown as ReturnType<typeof superjson.serialize>);
    if (!validateCache(pathname, cache)) return null;
    return value as RenderingPilotBoot;
  } catch { return null; }
}
