import { HydrationBoundary, QueryClient, QueryClientProvider, type DehydratedState } from "@tanstack/react-query";
import { TRPCClientError } from "@trpc/client";
import { observable } from "@trpc/server/observable";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "wouter";
import type { ReactNode, ComponentProps } from "react";
import { trpc } from "@/lib/trpc";
import App from "@/App";
import { PilotRenderProvider, type PilotRenderSeed } from "./PilotRenderContext";

export type RenderProvidersProps = {
  queryClient: QueryClient;
  trpcClient: ReturnType<typeof trpc.createClient>;
  state?: DehydratedState;
  pilot?: PilotRenderSeed | null;
  ssrPath?: string;
  ssrSearch?: string;
  helmetContext?: ComponentProps<typeof HelmetProvider>["context"];
  children?: ReactNode;
};
export function RenderProviders({ queryClient, trpcClient, state, pilot, ssrPath, ssrSearch, helmetContext, children }: RenderProvidersProps) {
  return <HelmetProvider context={helmetContext}>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={state}>
          <Router ssrPath={ssrPath} ssrSearch={ssrSearch}>
            <PilotRenderProvider seed={pilot}>{children ?? <App />}</PilotRenderProvider>
          </Router>
        </HydrationBoundary>
      </QueryClientProvider>
    </trpc.Provider>
  </HelmetProvider>;
}
/** New instance per request, never an HTTP fallback or authenticated caller. */
export function createServerTRPCClient(onDenied?: () => void) {
  return trpc.createClient({
    links: [() => () => observable(observer => {
      onDenied?.();
      observer.error(new TRPCClientError("Unexpected server rendering transport operation denied"));
      return () => {};
    })],
  });
}
/** Match the existing five-minute client freshness for explicitly seeded reads. */
export function createServerQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: {
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  } } });
}
