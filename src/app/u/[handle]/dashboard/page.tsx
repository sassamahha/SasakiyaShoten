import type { Metadata } from "next";

interface DashboardPageProps {
  params: { handle: string };
}

const dummyEntries = Array.from({ length: 4 }, (_, index) => ({
  id: index + 1,
  asin: `B0${index}FAKE${index}`,
  title: `登録予定タイトル ${index + 1}`,
  status: index % 2 === 0 ? "下書き" : "公開準備中"
}));

export function generateMetadata({ params }: DashboardPageProps): Metadata {
  return {
    title: `@${params.handle} のダッシュボード | ささきや書店`
  };
}

export default function DashboardPage({ params }: DashboardPageProps) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-5 py-12">
      <header className="space-y-2">
        <p className="text-sm font-semibold text-slate-500">DASHBOARD</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">@{params.handle}</h1>
        <p className="text-sm leading-relaxed text-slate-600">
          こちらは @{params.handle} さんのダッシュボードのダミービューです。今後ここから商品登録を行えるようになります。
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-slate-900">新しい書籍を登録</h2>
        <form className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="asin" className="text-sm font-semibold text-slate-700">
              ASIN
            </label>
            <input
              id="asin"
              name="asin"
              type="text"
              placeholder="例: B012345678"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/50"
            />
            <p className="text-xs text-slate-500">Amazon の商品コードを入力してください。</p>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="summary" className="text-sm font-semibold text-slate-700">
              紹介文
            </label>
            <textarea
              id="summary"
              name="summary"
              rows={4}
              placeholder="ここに紹介文を入力します。"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/50"
            />
            <p className="text-xs text-slate-500">実装予定：AI で自動生成した紹介文をプレビューします。</p>
          </div>
          <div className="sm:col-span-2">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground shadow-sm transition hover:opacity-90"
            >
              下書きとして保存（ダミー）
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">最近の登録状況</h2>
          <span className="text-xs font-semibold text-slate-500">データ連携はまだ行われていません</span>
        </div>
        <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white shadow-sm">
          {dummyEntries.map((entry) => (
            <div key={entry.id} className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">{entry.title}</p>
                <p className="text-xs text-slate-500">ASIN: {entry.asin}</p>
              </div>
              <span className="inline-flex h-7 items-center rounded-full bg-slate-100 px-3 text-xs font-semibold text-slate-600">
                {entry.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
