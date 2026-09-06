/**
 * Returns the one canonical non-trailing-slash service-area URL while retaining
 * query parameters used for attribution. Non-location requests are unchanged.
 */
export function getCanonicalServiceAreaRedirect(requestPath: string, originalUrl: string): string | null {
  if (!requestPath.startsWith("/service-areas/") || !requestPath.endsWith("/")) {
    return null;
  }

  const queryStart = originalUrl.indexOf("?");
  const query = queryStart >= 0 ? originalUrl.slice(queryStart) : "";
  return `${requestPath.slice(0, -1)}${query}`;
}
