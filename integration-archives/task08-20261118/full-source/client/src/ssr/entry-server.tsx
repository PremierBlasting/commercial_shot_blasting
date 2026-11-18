import { renderToString } from "react-dom/server";
import { dehydrate } from "@tanstack/react-query";
import superjson from "superjson";
import { preloadSelectedPilot } from "@/App";
import { getRenderingPilot, splitRenderingUrl, RENDERING_PILOT_MAX_BYTES, RENDERING_PILOT_RELEASE, validatePilotSeeds, validateRenderingPilotBoot, type PilotSeed, type RenderingPilotBoot } from "@shared/renderingPilot";
import type { RouteMetadataRecord } from "@shared/routeMetadata";
import { RenderProviders, createServerQueryClient, createServerTRPCClient } from "./RenderProviders";

function assertNotAborted(signal?: AbortSignal) {
  if (signal?.aborted) throw new Error("Rendering pilot aborted");
}
function escapeText(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#x27;");
}
function assertPrimaryHtml(html: string, pilotId: string, seeds: PilotSeed[]) {
  if (/<!--\$(?:!|\?)-->|data-msg=|data-dgst=/i.test(html) || !/<h1\b/.test(html) || !/<form\b/.test(html)) {
    throw new Error("Rendering pilot incomplete primary tree or Suspense failure");
  }
  if (pilotId === "P0002") {
    const post = seeds.find(seed => JSON.stringify(seed.queryKey[0]) === '["blog","getBySlug"]')?.data as { title: string; content: string };
    if (!/<article\b/.test(html) || !html.includes('class="blog-prose"') || !html.includes(escapeText(post.title)) ||
      !html.includes("Get In Touch") || html.includes("Blog Post Not Found")) throw new Error("Rendering pilot missing article content");
  } else {
    const needle = pilotId === "P0116" ? "Shot Blasting Services in" : pilotId === "P0066" ? "Structural Steel Frames" : "Commercial Shot Blasting";
    if (!html.includes(needle) || (pilotId === "P0116" && !html.includes("Hampshire")) || html.includes("Service Not Found")) {
      throw new Error("Rendering pilot missing selected primary content");
    }
  }
}

export async function renderPilot(url: string, seeds: PilotSeed[], metadata: RouteMetadataRecord, signal?: AbortSignal): Promise<{ html: string; boot: RenderingPilotBoot }> {
  // Captured before asynchronous code preparation; first client render reuses it.
  const year = Number(new Intl.DateTimeFormat("en-GB", { year: "numeric", timeZone: "Europe/London" }).format(new Date()));
  const queryClient = createServerQueryClient();
  try {
    assertNotAborted(signal);
    const pilot = getRenderingPilot(url);
    if (!pilot || !validatePilotSeeds(url, seeds) || metadata?.pathname !== pilot.pathname ||
      (metadata.state !== "ready" && metadata.state !== "published")) throw new Error("Rendering pilot invalid public route state");
    for (const seed of seeds) queryClient.setQueryData(seed.queryKey, seed.data);
    await preloadSelectedPilot(url);
    assertNotAborted(signal);
    let deniedOperation = false;
    const trpcClient = createServerTRPCClient(() => { deniedOperation = true; });
    const { pathname, search } = splitRenderingUrl(url);
    assertNotAborted(signal);
    const html = renderToString(<RenderProviders
      queryClient={queryClient} trpcClient={trpcClient} helmetContext={{}}
      ssrPath={pathname} ssrSearch={search}
      pilot={{ pathname, renderValues: { year }, metadata, url }}
    />);
    assertNotAborted(signal);
    if (deniedOperation) throw new Error("Rendering pilot attempted unexpected server transport");
    assertPrimaryHtml(html, pilot.id, seeds);
    const state = dehydrate(queryClient, {
      shouldDehydrateMutation: () => false,
      shouldDehydrateQuery: query => query.state.status === "success" && seeds.some(seed => JSON.stringify(seed.queryKey) === JSON.stringify(query.queryKey)),
    });
    const boot: RenderingPilotBoot = { schemaVersion: 1, release: RENDERING_PILOT_RELEASE, pathname, pilotId: pilot.id, success: true, renderValues: { year }, state: superjson.serialize(state) };
    if (!validateRenderingPilotBoot(boot, pathname)) throw new Error("Rendering pilot rejected public boot state");
    if (new TextEncoder().encode(html + JSON.stringify(boot)).byteLength > RENDERING_PILOT_MAX_BYTES) throw new Error("Rendering pilot exceeds buffered size limit");
    assertNotAborted(signal);
    return { html, boot };
  } finally {
    queryClient.clear();
  }
}
