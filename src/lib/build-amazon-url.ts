export type TenantPlan = "free" | "pro";

export interface TenantLike {
  handle: string;
  plan: TenantPlan;
  amazonTag?: string | null;
}

export function resolveAmazonTag(tenant?: TenantLike | null) {
  const fallbackTag = process.env.AMZ_ASSOC_TAG_DEFAULT ?? "sasakiyashoten-22";
  if (tenant?.plan === "pro" && tenant.amazonTag) {
    return tenant.amazonTag;
  }
  return fallbackTag;
}

export function buildAmazonUrl(asin: string, tenant?: TenantLike | null) {
  const tag = resolveAmazonTag(tenant);
  return `https://www.amazon.co.jp/dp/${asin}?tag=${encodeURIComponent(tag)}`;
}
