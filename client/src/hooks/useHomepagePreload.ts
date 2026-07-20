/**
 * useHomepagePreload
 *
 * Fetches /api/preload/homepage on first render and seeds the React Query cache
 * for trpc.testimonials.list and trpc.gallery.list.
 *
 * This eliminates the cold-start API latency on the homepage — when the tRPC
 * queries fire, the data is already in cache and the components render instantly
 * without a loading spinner.
 *
 * The preload endpoint has a 5-minute server-side cache and returns
 * Cache-Control: public, max-age=300 so the browser also caches it.
 */
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { trpc } from "@/lib/trpc";

export function useHomepagePreload() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Build the exact cache keys that tRPC uses for these two queries
    const testimonialsKey = getQueryKey(trpc.testimonials.list, undefined, "query");
    const galleryKey = getQueryKey(trpc.gallery.list, undefined, "query");

    // Only prefetch if neither query has data yet (avoids redundant fetches on
    // navigating back to the homepage after the data is already cached)
    const hasTestimonials = queryClient.getQueryData(testimonialsKey) !== undefined;
    const hasGallery = queryClient.getQueryData(galleryKey) !== undefined;

    if (hasTestimonials && hasGallery) return;

    fetch("/api/preload/homepage")
      .then((res) => {
        if (!res.ok) throw new Error(`Preload failed: ${res.status}`);
        return res.json();
      })
      .then((data: { testimonials: unknown[]; gallery: unknown[] }) => {
        // Seed testimonials — the tRPC router parses images JSON, so we replicate
        // that transform here to keep the cached shape identical to what tRPC returns
        if (!hasTestimonials && Array.isArray(data.testimonials)) {
          const parsed = data.testimonials.map((item: any) => ({
            ...item,
            images: item.images
              ? typeof item.images === "string"
                ? JSON.parse(item.images)
                : item.images
              : [],
          }));
          queryClient.setQueryData(testimonialsKey, parsed);
        }

        // Seed gallery
        if (!hasGallery && Array.isArray(data.gallery)) {
          queryClient.setQueryData(galleryKey, data.gallery);
        }
      })
      .catch((err) => {
        // Silently swallow — the tRPC queries will fetch normally as fallback
        console.warn("[useHomepagePreload] Preload skipped:", err.message);
      });
  // Run once on mount only — queryClient is stable
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
