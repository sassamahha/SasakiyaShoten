import type { TenantPlan } from "./build-amazon-url";

export interface MockTenant {
  id: string;
  handle: string;
  name: string;
  description?: string;
  plan: TenantPlan;
  amazonTag?: string;
  ownerUserId: string;
}

export interface MockBook {
  asin: string;
  title: string;
  author: string;
  description?: string;
  imageUrl?: string;
}

export type MockStoreBookStatus = "public" | "draft";

export interface MockStoreBook {
  id: string;
  tenantHandle: string;
  asin: string;
  status: MockStoreBookStatus;
  sortOrder: number;
  introText: string;
  createdAt: string;
  updatedAt: string;
}

const now = new Date().toISOString();

export const mockData = {
  tenants: [
    {
      id: "tenant-official",
      handle: "official",
      name: "ささきや書店 公式セレクト",
      description: "Kindle Unlimited で読める注目タイトルを紹介しています。",
      plan: "pro",
      amazonTag: "sasakiyashoten-22",
      ownerUserId: "user-official",
    },
    {
      id: "tenant-startup",
      handle: "startup",
      name: "スタートアップ選書",
      description: "起業やプロダクト開発に役立つ Kindle 書籍を集めました。",
      plan: "free",
      ownerUserId: "user-startup",
    },
    {
      id: "tenant-design",
      handle: "design",
      name: "デザイン読書室",
      description: "色彩やUI/UXの教本を中心に紹介しています。",
      plan: "pro",
      amazonTag: "designers-22",
      ownerUserId: "user-design",
    }
  ] satisfies MockTenant[],
  books: [
    {
      asin: "B09J2Y4ZZ4",
      title: "スタートアップ・ガイド",
      author: "佐々木 未来",
      description: "ゼロからプロダクトを形にするためのロードマップを解説した Kindle 限定書。",
      imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51example.jpg",
    },
    {
      asin: "B0C1234567",
      title: "配色デザインの教科書",
      author: "田中 彩",
      description: "配色理論の基礎から実践まで幅広く学べるデザイン書。",
      imageUrl: "https://images-na.ssl-images-amazon.com/images/I/41palette.jpg",
    },
    {
      asin: "B08ABCDEF0",
      title: "React 実践レシピ",
      author: "山本 エンジ",
      description: "Next.js と TypeScript を活用したモダン開発のベストプラクティスを紹介。",
      imageUrl: "https://images-na.ssl-images-amazon.com/images/I/41react.jpg",
    },
    {
      asin: "B0D5555555",
      title: "プロダクトリサーチ入門",
      author: "小林 リサ",
      description: "ユーザーリサーチの進め方と実践フレームワークをまとめた一冊。",
      imageUrl: "https://images-na.ssl-images-amazon.com/images/I/41research.jpg",
    }
  ] satisfies MockBook[],
  storeBooks: [
    {
      id: "storeBook-1",
      tenantHandle: "official",
      asin: "B09J2Y4ZZ4",
      status: "public",
      sortOrder: 1,
      introText:
        "プロダクトづくりをこれから学びたい人に最初に手に取ってほしいバイブルです。創業準備から開発体制づくりまで網羅。",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "storeBook-2",
      tenantHandle: "official",
      asin: "B08ABCDEF0",
      status: "public",
      sortOrder: 2,
      introText:
        "Next.js で Kindle 紹介サイトを構築するために参考にした実践的なレシピ集。コードサンプルが充実しています。",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "storeBook-3",
      tenantHandle: "startup",
      asin: "B09J2Y4ZZ4",
      status: "public",
      sortOrder: 1,
      introText:
        "スタートアップ初期の混乱を整理し、数値で意思決定するための実践ガイド。起業家向けに厳選しました。",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "storeBook-4",
      tenantHandle: "startup",
      asin: "B0D5555555",
      status: "draft",
      sortOrder: 3,
      introText:
        "ユーザーリサーチの基礎を固める一冊としてピックアップ。公開準備中のため draft に設定しています。",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "storeBook-5",
      tenantHandle: "design",
      asin: "B0C1234567",
      status: "public",
      sortOrder: 1,
      introText:
        "色彩設計に悩んだときにいつでも立ち戻れる定番書。事例も豊富で現場で活躍します。",
      createdAt: now,
      updatedAt: now,
    }
  ] satisfies MockStoreBook[],
};
