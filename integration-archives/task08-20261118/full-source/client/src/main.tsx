import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, type DehydratedState } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot, hydrateRoot } from "react-dom/client";
import superjson from "superjson";
import { preloadSelectedPilot } from "./App";
import { RenderProviders } from "./ssr/RenderProviders";
import { readRouteMetadataBoot } from "./components/RouteMetadataOwner";
import { RENDERING_PILOT_MAX_BYTES, validateRenderingPilotBoot, type RenderingPilotBoot } from "@shared/renderingPilot";
import { getLoginUrl } from "./const";
import { recoverFromStaleDynamicImport } from "./lib/dynamicImportRecovery";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes — reduces redundant API calls on SPA navigation
      // and prevents cold-start latency from blocking page renders on return visits
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      // Don't retry on 4xx errors — fail fast for auth/validation issues
      retry: (failureCount, error: any) => {
        if (error?.data?.httpStatus >= 400 && error?.data?.httpStatus < 500) return false;
        return failureCount < 2;
      },
    },
  },
});

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

// A deployment can replace a lazily loaded Vite chunk between a visitor
// receiving the app shell and opening a route. Recover once to the current
// release rather than leaving the visitor at the error boundary.
if (typeof window !== "undefined") {
  window.addEventListener("vite:preloadError", (event) => {
    const viteEvent = event as CustomEvent<unknown> & { payload?: unknown };
    if (recoverFromStaleDynamicImport(viteEvent.payload ?? viteEvent.detail)) {
      event.preventDefault();
    }
  });
}

/** Choose one root only at startup; SPA navigation never remounts it. */
async function startBrowserRoot(): Promise<void> {
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("Application root is missing");
  const marker = document.getElementById("rendering-pilot-boot");
  const initialPathname = window.location.pathname;
  let boot: RenderingPilotBoot | null = null;
  if (marker) {
    try {
      if (marker.tagName !== "SCRIPT" || marker.getAttribute("type") !== "application/json" || rootElement.contains(marker)) throw new Error("Invalid pilot marker");
      const raw = marker.textContent ?? "";
      if (new TextEncoder().encode(raw).byteLength > RENDERING_PILOT_MAX_BYTES) throw new Error("Oversized pilot marker");
      boot = validateRenderingPilotBoot(JSON.parse(raw), initialPathname);
    } catch { boot = null; }
    if (!boot) console.error("[Rendering Pilot] Invalid cached SSR state; recovering with client rendering (not hydration).");
  } else if (rootElement.querySelector("h1, form")) {
    console.error("[Rendering Pilot] SSR content has no valid boot; recovering with client rendering (not hydration).");
  }
  if (boot) {
    try {
      await preloadSelectedPilot(initialPathname);
      if (window.location.pathname !== initialPathname || !validateRenderingPilotBoot(boot, window.location.pathname)) {
        console.error("[Rendering Pilot] Route changed during preparation; recovering with client rendering (not hydration).");
        boot = null;
      }
    } catch (error) {
      console.error("[Rendering Pilot] Component preparation failed; recovering with client rendering (not hydration).");
      recoverFromStaleDynamicImport(error);
      boot = null;
    }
  }
  if (boot) {
    const state = superjson.deserialize<DehydratedState>(boot.state);
    const metadata = readRouteMetadataBoot(initialPathname);
    if (metadata && metadata.pathname === initialPathname && ["ready", "published"].includes(metadata.state) && window.location.pathname === initialPathname) {
      hydrateRoot(rootElement, <RenderProviders
        queryClient={queryClient} trpcClient={trpcClient} state={state}
        pilot={{ pathname: initialPathname, renderValues: boot.renderValues, metadata }}
      />, { onRecoverableError: error => console.error("[Rendering Pilot] Hydration failed", error) });
      return;
    }
    console.error("[Rendering Pilot] Metadata/path validation failed; recovering with client rendering (not hydration).");
  }
  createRoot(rootElement).render(<RenderProviders queryClient={queryClient} trpcClient={trpcClient} />);
}
void startBrowserRoot();

// Register Service Worker for PWA caching (cache-first for assets, stale-while-revalidate for CDN images)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((reg) => {
        console.log('[SW] Registered, scope:', reg.scope);
      })
      .catch((err) => {
        console.warn('[SW] Registration failed:', err);
      });
  });
}
