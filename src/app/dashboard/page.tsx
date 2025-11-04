import Link from "next/link";

const mockBooks = [
  {
    asin: "B000000001",
    title: "サンプル Kindle 本",
    author: "山田 太郎",
    status: "public" as const
  },
  {
    asin: "B000000002",
    title: "もう一冊の本",
    author: "佐藤 花子",
    status: "draft" as const
  }
];

export const metadata = {
  title: "ダッシュボード | ささきや書店"
};

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-12">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">管理ダッシュボード</h1>
          <p className="text-sm text-slate-600">ASIN を追加して棚を管理しましょう。</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard/books/new"
            className="inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-sm hover:opacity-90"
          >
            書籍を追加
          </Link>
          <Link
            href="/dashboard/settings"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white/70"
          >
            ストア設定
          </Link>
        </div>
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">登録済みの書籍</h2>
          <input
            type="search"
            placeholder="タイトル・ASIN で検索"
            className="w-64 rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none"
          />
        </div>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">ASIN</th>
                <th className="px-4 py-3">タイトル</th>
                <th className="px-4 py-3">著者</th>
                <th className="px-4 py-3">ステータス</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockBooks.map((book) => (
                <tr key={book.asin} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{book.asin}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{book.title}</td>
                  <td className="px-4 py-3 text-slate-600">{book.author}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        book.status === "public"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {book.status === "public" ? "公開" : "下書き"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/books/${book.asin}`} className="text-brand">
                        編集
                      </Link>
                      <button className="text-slate-500">削除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
