export type TenantPlan = "free" | "pro";

export interface TenantLike {
  handle: string;
  plan: TenantPlan;
  amazonTag?: string | null;
}

export function buildAmazonUrl(asin: string, tenant?: TenantLike | null) {
  const base = `https://www.amazon.co.jp/dp/${asin}`;
  const fallbackTag = process.env.AMZ_ASSOC_TAG_DEFAULT ?? "SasakiyaTag-22";
  const shouldUseTenantTag = tenant?.plan === "pro" && tenant.amazonTag;
  const tag = shouldUseTenantTag ? tenant.amazonTag! : fallbackTag;
  return `${base}/?tag=${encodeURIComponent(tag)}`;
}
