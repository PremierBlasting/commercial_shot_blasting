import { useState, useEffect } from "react";

export interface RecentlyViewedArea {
  slug: string;
  name: string;
  county: string;
  timestamp: number;
}

const STORAGE_KEY = "csb_recently_viewed_areas";
const MAX_ITEMS = 5;

/** Get recently viewed areas from localStorage */
export function getRecentlyViewed(): RecentlyViewedArea[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const items: RecentlyViewedArea[] = JSON.parse(stored);
    // Only return items from the last 30 days
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return items.filter((item) => item.timestamp > cutoff).slice(0, MAX_ITEMS);
  } catch {
    return [];
  }
}

/** Record a visit to a location page */
export function recordAreaVisit(slug: string, name: string, county: string): void {
  try {
    const existing = getRecentlyViewed();
    // Remove any existing entry for this slug
    const filtered = existing.filter((item) => item.slug !== slug);
    // Add new entry at the front
    const updated = [{ slug, name, county, timestamp: Date.now() }, ...filtered].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage may be unavailable (private browsing, etc.)
  }
}

/** Hook to get recently viewed areas (reactive) */
export function useRecentlyViewed(): RecentlyViewedArea[] {
  const [items, setItems] = useState<RecentlyViewedArea[]>([]);

  useEffect(() => {
    setItems(getRecentlyViewed());
  }, []);

  return items;
}
