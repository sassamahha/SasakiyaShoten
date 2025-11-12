import Link from "next/link";

const steps = [
  {
    title: "ASIN を登録",
    description: "管理ダッシュボードから Kindle ASIN を登録すると、PA-API でメタデータを自動取得します。",
  },
  {
    title: "棚に並べる",
    description: "取得した書誌情報をプレビューしつつ、並び順や公開ステータスを管理できます。",
  },
  {
    title: "アフィリンクで収益化",
    description:
      "無料プランでは既定タグ、Pro プランでは自分のアフィリエイトタグを設定して Amazon に遷移させます。",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-16">
      <section className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-center">
        <div className="space-y-5">
          <span className="inline-flex items-center rounded-full bg-brand px-3 py-1 text-xs font-medium uppercase tracking-wide text-brand-foreground">
            Kindle 紹介サイト MVP
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            ASIN を入れるだけで自分の <span className="text-brand">書店</span> ができる。
          </h1>
          <p className="text-base leading-relaxed text-slate-600">
            ささきや書店は、日本の Kindle タイトルに特化したマルチテナント型紹介サイトのテンプレートです。
            Amazon PA-API を用いて書誌情報を取得し、無料/有料プラン別にアフィリエイトタグを自動で付与します。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/@official/dashboard"
              className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition hover:opacity-90"
            >
              ダッシュボードをみる
            </Link>
            <Link
              href="/@official"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-white/70"
            >
              公開ストアを見る
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-slate-800">機能ハイライト</h2>
          <ul className="space-y-3">
            <li>⚡️ Amazon PA-API (JP) と連携した ASIN 取得</li>
            <li>🪄 `@username` 形式のカスタムストア URL</li>
            <li>💸 プラン別のアフィリエイトタグ自動付与</li>
            <li>🚀 Next.js 14 + Prisma + Stripe で構成</li>
          </ul>
        </div>
      </section>
      <section className="space-y-10">
        <h2 className="text-2xl font-semibold text-slate-900">MVP フロー</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-slate-800">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
