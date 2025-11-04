import Link from "next/link";

export const metadata = {
  title: "書籍を追加 | ささきや書店"
};

export default function NewBookPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-12">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900">ASIN を登録</h1>
        <p className="text-sm text-slate-600">
          Amazon PA-API (日本リージョン) から Kindle 書誌情報を取得し、必要に応じて手動でオーバーライドできます。
        </p>
      </div>
      <form className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <label htmlFor="asin" className="text-sm font-medium text-slate-700">
            ASIN <span className="text-red-500">*</span>
          </label>
          <input
            id="asin"
            name="asin"
            type="text"
            required
            placeholder="B000000000"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none"
          />
          <p className="text-xs text-slate-500">Kindle 版の ASIN を入力すると自動で情報を取得します。</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-slate-700">
              タイトル（任意オーバーライド）
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="任意で編集"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="author" className="text-sm font-medium text-slate-700">
              著者（任意オーバーライド）
            </label>
            <input
              id="author"
              name="author"
              type="text"
              placeholder="任意で編集"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium text-slate-700">
            紹介文（短めに要約）
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="PA-API から取得した説明文を短く編集してください。"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none"
          />
          <p className="text-xs text-slate-500">PA-API の規約に基づき、必要に応じて内容を要約してください。</p>
        </div>
        <div className="space-y-2">
          <label htmlFor="imageUrl" className="text-sm font-medium text-slate-700">
            カバー画像 URL（任意）
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            placeholder="https://m.media-amazon.com/..."
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/dashboard"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white/70"
          >
            キャンセル
          </Link>
          <button className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-sm hover:opacity-90">
            PA-API から取得
          </button>
        </div>
      </form>
    </div>
  );
}
