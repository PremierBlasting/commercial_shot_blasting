/**
 * Returns the one canonical non-trailing-slash service-area URL while retaining
 * query parameters used for attribution. Non-location requests are unchanged.
 */
export function getCanonicalServiceAreaRedirect(requestPath: string, originalUrl: string): string | null {
  const queryStart = originalUrl.indexOf("?");
  const query = queryStart >= 0 ? originalUrl.slice(queryStart) : "";

  if (requestPath === "/service-areas/stoke") {
    return `/service-areas/stoke-on-trent${query}`;
  }

  if (!requestPath.startsWith("/service-areas/") || !requestPath.endsWith("/")) {
    return null;
  }

  return `${requestPath.slice(0, -1)}${query}`;
}
