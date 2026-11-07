export interface CampaignReference { campaign: string; id?: string; touch: "this_visit" | "latest_tagged" }

/** Campaign-reference output is deliberately narrower than stored attribution. */
function safeCampaign(value?: string): string | undefined {
  if (!value || value.length > 200 || !/^csb-search-[a-z0-9-]+$/i.test(value)) return undefined;
  // Never copy a mistakenly supplied email, telephone number, tracking query or unresolved ValueTrack macro.
  if (/\d{7,}/.test(value) || /gclid|gbraid|wbraid|mailto|https?/i.test(value)) return undefined;
  return value;
}

export function campaignReference(data?: Record<string, string>): CampaignReference | undefined {
  if (!data) return undefined;
  for (const [prefix, touch] of [["cv", "this_visit"], ["lt", "latest_tagged"]] as const) {
    const campaign = safeCampaign(data[`${prefix}_utm_campaign`]);
    if (!campaign) continue;
    const rawId = data[`${prefix}_utm_id`] || data[`${prefix}_hsa_cam`];
    const id = rawId && /^\d{1,20}$/.test(rawId) ? rawId : undefined;
    return { campaign, ...(id ? { id } : {}), touch };
  }
  return undefined;
}

export function campaignReferenceRows(data?: Record<string, string>): Array<[string, string]> {
  const ref = campaignReference(data);
  if (!ref) return [];
  const label = ref.touch === "this_visit" ? "Campaign (this visit)" : "Latest tagged campaign (not proof of this visit)";
  return [[label, ref.campaign], ...(ref.id ? [["Campaign ID", ref.id] as [string, string]] : [])];
}
