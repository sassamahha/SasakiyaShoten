import Link from "next/link";

export const metadata = {
  title: "ログイン | ささきや書店"
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-8 px-6 py-16">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">ログイン</h1>
        <p className="text-sm text-slate-600">メールアドレスまたは Google アカウントでログインしてください。</p>
      </div>
      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <button className="w-full rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition hover:opacity-90">
          メールリンクを送信
        </button>
        <button className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-white/70">
          Google で続ける
        </button>
        <p className="text-xs text-slate-500">
          ログインすることで<Link href="/terms">利用規約</Link>に同意したものとみなされます。
        </p>
      </div>
    </div>
  );
}
