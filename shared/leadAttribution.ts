import { campaignReferenceRows } from "./campaignReference";

export type VisitChannel = "organic_search" | "paid_search" | "paid_social" | "tagged" | "referral" | "direct_or_unknown";

const SOURCE_NAMES: Record<string, string> = {
  google: "Google", adwords: "Google Ads", bing: "Bing", yahoo: "Yahoo", duckduckgo: "DuckDuckGo", baidu: "Baidu", facebook: "Facebook",
};

/** Keep search/referral context free of query strings, credentials and fragments. */
export function referrerHost(value?: string): string | undefined {
  if (!value || value.length > 4096) return undefined;
  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    if (!/^https?:$/.test(url.protocol) || url.username || url.password) return undefined;
    return url.hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

export function landingPath(value?: string): string | undefined {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return undefined;
  return value.split(/[?#]/)[0].replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 512);
}

export function hasTaggedAttribution(data: Record<string, string | undefined>): boolean {
  return ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id", "gclid", "gbraid", "wbraid", "fbclid", "msclkid", "ref"]
    .some((key) => Boolean(data[key]));
}

function searchSource(host: string): string | undefined {
  // Exact domain patterns, never substring matches such as notgoogle.com.
  if (/^google\.(?:com|[a-z]{2}|co\.[a-z]{2}|com\.[a-z]{2})$/.test(host)) return "google";
  if (host === "bing.com" || host === "cn.bing.com") return "bing";
  if (/^(?:(?:search|r\.search|m\.search)\.)?yahoo\.com$/.test(host)) return "yahoo";
  if (host === "duckduckgo.com") return "duckduckgo";
  if (host === "baidu.com") return "baidu";
  return undefined;
}

export function classifyVisit(data: Record<string, string | undefined>, ownOrigin?: string): {
  source: string; medium: string; channel: VisitChannel; referrer?: string;
} {
  const host = referrerHost(data.referrer);
  const ownHost = referrerHost(ownOrigin);
  const externalHost = host && host !== ownHost ? host : undefined;
  if (hasTaggedAttribution(data)) {
    const googleClick = Boolean(data.gclid || data.gbraid || data.wbraid);
    const source = data.utm_source || (googleClick ? "google" : data.msclkid ? "bing" : data.fbclid ? "facebook" : "tagged");
    const medium = data.utm_medium || (googleClick || data.msclkid ? "cpc" : "tagged");
    const paid = /^(cpc|ppc|paid|paidsearch|paid_search|cpm|display|paid_social|paidsocial)$/i.test(medium);
    const channel: VisitChannel = /^(paid_social|paidsocial)$/i.test(medium)
      ? "paid_social"
      : googleClick || data.msclkid || paid ? "paid_search"
      : medium === "organic" ? "organic_search" : "tagged";
    return { source: source.slice(0, 200), medium: medium.slice(0, 100), channel, referrer: externalHost };
  }
  const source = externalHost && searchSource(externalHost);
  if (source) return { source, medium: "organic", channel: "organic_search", referrer: externalHost };
  if (externalHost) return { source: externalHost, medium: "referral", channel: "referral", referrer: externalHost };
  return { source: "direct_or_unknown", medium: "none", channel: "direct_or_unknown" };
}

/** Only current-visit keys drive the summary; historic campaign touches never masquerade as a current visit. */
export function leadAttributionRows(data?: Record<string, string>, submissionPage?: string): Array<[string, string]> {
  if (!data?.cv_channel) return campaignReferenceRows(data);
  const source = (data.cv_source || "Unknown").replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 200);
  const name = SOURCE_NAMES[source] || source;
  const labels: Record<string, string> = {
    organic_search: `${name} organic`, paid_search: `${name} paid / tagged`, paid_social: `${name} paid social / tagged`,
    tagged: `${name} / ${(data.cv_medium || "tagged").slice(0, 100)}`, referral: `Referral from ${name}`,
    direct_or_unknown: "Direct / Unknown",
  };
  const rows: Array<[string, string]> = [["Lead source (this visit)", labels[data.cv_channel] || "Unknown"]];
  rows.push(...campaignReferenceRows(data));
  const landing = landingPath(data.cv_landing_page);
  if (landing) rows.push(["First landing page (this visit)", landing]);
  if (submissionPage) rows.push(["Enquiry submitted on", submissionPage.slice(0, 2048)]);
  const host = referrerHost(data.cv_referrer);
  if (host) rows.push(["Referrer host", host]);
  if (data.cv_timestamp && Number.isFinite(Date.parse(data.cv_timestamp))) rows.push(["Visit first observed (UTC)", data.cv_timestamp]);
  return rows;
}

export function leadAttributionText(data?: Record<string, string>, submissionPage?: string): string {
  const rows = leadAttributionRows(data, submissionPage);
  return rows.length ? rows.map(([label, value]) => `${label}: ${value}`).join("\n") : "";
}
