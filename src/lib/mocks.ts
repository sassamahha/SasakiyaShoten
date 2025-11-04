import type { TenantLike } from "./build-amazon-url";

interface BookSummary {
  asin: string;
  title: string;
  author: string;
  description: string;
  imageUrl?: string | null;
}

interface StoreBookEntry {
  tenantHandle: string;
  asin: string;
  status: "draft" | "public";
}

interface TenantMock extends TenantLike {
  name: string;
}

export const tenantCatalogMock = {
  tenants: [
    { handle: "official", plan: "pro", amazonTag: "official-22", name: "ささきや書店" },
    { handle: "tech", plan: "free", name: "テック選書" },
    { handle: "design", plan: "pro", amazonTag: "designers-22", name: "デザイン読書室" }
  ] satisfies TenantMock[],
  books: [
    {
      asin: "B09J2Y4ZZ4",
      title: "スタートアップ・ガイド",
      author: "佐々木 未来",
      description: "起業初期に必要な Kindle コンテンツ運営の基礎をわかりやすく解説。",
      imageUrl: "https://m.media-amazon.com/images/I/71b0w6wQyFL.jpg"
    },
    {
      asin: "B0C1234567",
      title: "配色デザインの教科書",
      author: "田中 彩",
      description: "ビジュアルデザインに役立つ配色ルールと具体例を収録。",
      imageUrl: "https://m.media-amazon.com/images/I/81u2FQ+1GZL.jpg"
    },
    {
      asin: "B08ABCDEF0",
      title: "React 実践レシピ",
      author: "山本 エンジ",
      description: "Next.js と TypeScript によるフロントエンド開発の最短ルート。",
      imageUrl: "https://m.media-amazon.com/images/I/71vZ1WxyWNL.jpg"
    }
  ] satisfies BookSummary[],
  storeBooks: [
    { tenantHandle: "official", asin: "B09J2Y4ZZ4", status: "public" },
    { tenantHandle: "official", asin: "B08ABCDEF0", status: "public" },
    { tenantHandle: "tech", asin: "B08ABCDEF0", status: "public" },
    { tenantHandle: "design", asin: "B0C1234567", status: "public" }
  ] satisfies StoreBookEntry[]
};
