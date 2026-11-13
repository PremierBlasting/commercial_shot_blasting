/** Public crawler policy. This is discovery guidance, not access control. */
export const ROBOTS_TEXT = [
  "User-agent: *",
  "Allow: /",
  "",
  "# Preserve API and enquiry-storage boundaries; public-media exceptions require separate approval.",
  "Disallow: /api/",
  "Disallow: /manus-storage/",
  "",
  "# Canonical discovery index; catalogue HTML stays crawlable for noindex observation.",
  "Sitemap: https://commercialshotblasting.co.uk/sitemap.xml",
  "",
].join("\n");
