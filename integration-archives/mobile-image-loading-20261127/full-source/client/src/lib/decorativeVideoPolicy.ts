export interface MediaConnection {
  saveData?: boolean;
  effectiveType?: string;
  downlink?: number;
}

/** Decorative autoplay must not compete with useful content on a slow connection. */
export function canLoadDecorativeVideo(connection?: MediaConnection): boolean {
  if (connection?.saveData) return false;
  if (connection?.effectiveType && ["slow-2g", "2g", "3g"].includes(connection.effectiveType)) return false;
  if (typeof connection?.downlink === "number" && connection.downlink > 0 && connection.downlink <= 1.6) return false;
  // Browsers without Network Information retain the existing poster-first playback.
  return true;
}
