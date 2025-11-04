import "server-only";

export interface PaapiBookItem {
  asin: string;
  title: string;
  author: string;
  description: string;
  imageUrl?: string | null;
}

export async function lookupAsin(asin: string): Promise<PaapiBookItem | null> {
  const endpoint = process.env.PAAPI_ENDPOINT ?? "https://webservices.amazon.co.jp/paapi5/getitems";
  const accessKey = process.env.PAAPI_ACCESS_KEY;
  const secretKey = process.env.PAAPI_SECRET_KEY;
  const partnerTag = process.env.PAAPI_PARTNER_TAG ?? process.env.AMZ_ASSOC_TAG_DEFAULT;

  if (!accessKey || !secretKey || !partnerTag) {
    console.warn("PA-API credentials are not fully configured. Returning null.");
    return null;
  }

  // NOTE: In a production implementation this function should sign the request using PA-API.
  // For the MVP scaffold we simply return null to indicate a manual override is required.
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ItemIds: [asin],
        Resources: [
          "Images.Primary.Large",
          "ItemInfo.Title",
          "ItemInfo.ByLineInfo",
          "ItemInfo.ContentInfo",
          "ItemInfo.Features",
          "ItemInfo.ContentRating"
        ],
        PartnerTag: partnerTag,
        PartnerType: "Associates",
        Marketplace: "www.amazon.co.jp"
      })
    });

    if (!response.ok) {
      console.warn("PA-API lookup failed", await response.text());
      return null;
    }

    const payload = (await response.json()) as Record<string, any>;
    const item = payload.ItemsResult?.Items?.[0];

    if (!item) {
      return null;
    }

    const title = item.ItemInfo?.Title?.DisplayValue ?? "";
    const author =
      item.ItemInfo?.ByLineInfo?.Contributors?.map((contributor: any) => contributor.Name).join(", ") ?? "";
    const description =
      item.ItemInfo?.ContentInfo?.ShortSynopsis?.DisplayValue ?? item.ItemInfo?.Features?.DisplayValues?.[0] ?? "";
    const imageUrl = item.Images?.Primary?.Large?.URL;

    return {
      asin,
      title,
      author,
      description,
      imageUrl,
    };
  } catch (error) {
    console.error("PA-API lookup error", error);
    return null;
  }
}
