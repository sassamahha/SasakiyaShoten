import type { Metadata } from "next";

import { AffiliateTagDialogButton } from "./affiliate-tag-dialog-button";

interface SettingsPageProps {
  params: { handle: string };
}

export function generateMetadata({ params }: SettingsPageProps): Metadata {
  return {
    title: `@${params.handle} の設定 | ささきや書店`
  };
}

export default function SettingsPage({ params }: SettingsPageProps) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-5 py-12">
      <header className="space-y-2">
        <p className="text-sm font-semibold text-slate-500">SETTINGS</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">@{params.handle}</h1>
        <p className="text-sm leading-relaxed text-slate-600">
          ストアの基本情報を設定するためのダミービューです。入力値はまだ保存されません。
        </p>
      </header>

      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-slate-900">基本情報</h2>
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="storeName" className="text-sm font-semibold text-slate-700">
                ストア名
              </label>
              <input
                id="storeName"
                type="text"
                defaultValue={`@${params.handle} の書店`}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/50"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-semibold text-slate-700">
                説明
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="ここにストアの紹介文を入力します。"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/50"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="affiliateTag" className="text-sm font-semibold text-slate-700">
                アフィリエイトタグ
              </label>
              <input
                id="affiliateTag"
                type="text"
                disabled
                value="設定待ち"
                className="w-full cursor-not-allowed rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-500"
              />
              <p className="text-xs text-slate-500">Amazon のアフィリエイトタグは別途設定画面から登録します。</p>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                設定を保存（ダミー）
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Amazon アフィリエイトタグ</h2>
              <p className="text-sm text-slate-600">アフィリエイト連携の準備が整ったら、ここから設定できます。</p>
            </div>
            <AffiliateTagDialogButton />
          </div>
        </div>
      </section>
    </div>
  );
}
