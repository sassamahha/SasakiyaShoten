export const metadata = {
  title: "ストア設定 | ささきや書店"
};

export default function StoreSettingsPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-12">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900">ストア設定</h1>
        <p className="text-sm text-slate-600">テナント情報とアフィリエイトタグを管理します。</p>
      </div>
      <form className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-700">
              ストア名
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="例：技術書マガジン"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="handle" className="text-sm font-medium text-slate-700">
              ハンドル (@handle)
            </label>
            <input
              id="handle"
              name="handle"
              type="text"
              placeholder="例：tech-books"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="amazonTag" className="text-sm font-medium text-slate-700">
            Amazon アソシエイトタグ（Pro プラン）
          </label>
          <input
            id="amazonTag"
            name="amazonTag"
            type="text"
            placeholder="例：mytag-22"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none"
          />
          <p className="text-xs text-slate-500">
            無料プランの場合は自動的に ささきや書店 のタグが適用されます。Pro プランにアップグレードすると反映されます。
          </p>
        </div>
        <div className="space-y-2 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-700">現在のプラン</p>
          <p>Free プラン</p>
          <button className="mt-3 inline-flex items-center rounded-md bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground shadow-sm hover:opacity-90">
            Pro (¥500/月) にアップグレード
          </button>
        </div>
        <div className="flex justify-end">
          <button className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-sm hover:opacity-90">
            保存
          </button>
        </div>
      </form>
    </div>
  );
}
