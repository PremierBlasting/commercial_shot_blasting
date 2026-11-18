/** Proposed local labels only; not a title, description, or rollout authority.
 * Deliberately unused by deployed route, metadata, heading, and schema owners.
 */
export function getLocalAreaLabelPolicy(areaName: string): {
  keyword: string;
  title: string;
  h1: string;
  serviceName: string;
} {
  const presentationLabel = `Shot Blasting in ${areaName}`;
  return {
    keyword: `shot blasting in ${areaName}`,
    title: presentationLabel,
    h1: presentationLabel,
    serviceName: presentationLabel,
  };
}
