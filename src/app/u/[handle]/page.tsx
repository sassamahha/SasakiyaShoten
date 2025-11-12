import type { Metadata } from "next";

import { DummyStorefrontGrid } from "./dummy-storefront-grid";

interface StorePageProps {
  params: { handle: string };
}

const dummyItems = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  title: `ダミー書籍 ${index + 1}`,
  author: "山田 太郎",
  summary:
    "ここに書籍の紹介文が入ります。ダミーデータのため、実際の情報はまだ設定されていません。"
}));

export function generateMetadata({ params }: StorePageProps): Metadata {
  const handle = params.handle;
  return {
    title: `@${handle} のストア | ささきや書店`,
    description: `@${handle} の公開ストアのダミービューです。`
  };
}

export default function StorefrontPage({ params }: StorePageProps) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-500">PUBLIC STORE</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">@{params.handle}</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
            こちらは @{params.handle} さんの公開ストアのダミービューです。実際のコンテンツは今後接続されます。
          </p>
        </div>
      </div>
      <DummyStorefrontGrid items={dummyItems} />
    </div>
  );
}
