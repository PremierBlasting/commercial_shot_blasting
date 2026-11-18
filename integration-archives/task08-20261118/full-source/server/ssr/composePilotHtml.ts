import {
  RENDERING_PILOT_MAX_BYTES,
  validateRenderingPilotBoot,
  type RenderingPilotBoot,
} from "../../shared/renderingPilot";

export const PILOT_ROOT_MARKER = "<!--RENDERING_PILOT_ROOT-->";
export const PILOT_ROOT_TEMPLATE = `<div id="root">${PILOT_ROOT_MARKER}</div>`;
export const PILOT_BOOT_ID = "rendering-pilot-boot";

/** Boot.state is already Superjson serialized by the request-local renderer. */
export function escapePilotBootJson(value: RenderingPilotBoot): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function composePilotHtml(
  template: string,
  result: { html: string; boot: RenderingPilotBoot },
): string {
  if (typeof result?.html !== "string" || Buffer.byteLength(result.html, "utf8") > RENDERING_PILOT_MAX_BYTES) {
    throw new Error("Rendering pilot HTML exceeds byte budget");
  }
  if (!validateRenderingPilotBoot(result.boot, result.boot?.pathname)) {
    throw new Error("Rendering pilot boot failed public-state validation");
  }
  const payload = escapePilotBootJson(result.boot);
  if (Buffer.byteLength(result.html, "utf8") + Buffer.byteLength(payload, "utf8") > RENDERING_PILOT_MAX_BYTES) {
    throw new Error("Rendering pilot HTML and boot exceed byte budget");
  }
  if (template.split(PILOT_ROOT_MARKER).length !== 2 ||
      template.split(PILOT_ROOT_TEMPLATE).length !== 2 ||
      template.includes(`id="${PILOT_BOOT_ID}"`)) {
    throw new Error("Rendering pilot requires one dedicated empty root marker");
  }
  const script = `<script id="${PILOT_BOOT_ID}" type="application/json">${payload}</script>`;
  // Insert inert state OUTSIDE root before App insertion. Never replace a closing
  // head/body tag in completed App HTML (CMS text may contain those literals).
  const withBoot = template.replace(PILOT_ROOT_TEMPLATE, () => `${script}\n${PILOT_ROOT_TEMPLATE}`);
  return withBoot.replace(PILOT_ROOT_MARKER, () => result.html);
}
