import { signIn } from "@/auth";

interface LoginPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata = {
  title: "ログイン | ささきや書店",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  const callbackParam = searchParams?.callbackUrl;
  const callbackUrl = Array.isArray(callbackParam) ? callbackParam[0] : callbackParam ?? "/";

  const emailSignIn = async (formData: FormData) => {
    "use server";
    const email = formData.get("email");
    if (typeof email !== "string" || !email.trim()) {
      throw new Error("メールアドレスを入力してください。");
    }
    await signIn("email", { email, redirectTo: callbackUrl });
  };

  const googleSignIn = async () => {
    "use server";
    await signIn("google", { redirectTo: callbackUrl });
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-8 px-6 py-16">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">ログイン</h1>
        <p className="text-sm text-slate-600">メールアドレスまたは Google アカウントでログインしてください。</p>
      </div>
      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <form className="space-y-3" action={emailSignIn}>
          <label className="grid gap-2 text-left text-sm">
            <span className="font-medium text-slate-800">メールアドレス</span>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none"
              placeholder="you@example.com"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition hover:opacity-90"
          >
            メールリンクを送信
          </button>
        </form>
        <form action={googleSignIn}>
          <button
            type="submit"
            className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-white/70"
          >
            Google で続ける
          </button>
        </form>
        <p className="text-xs text-slate-500">
          ログインすることで<a href="/terms" className="font-semibold text-brand">利用規約</a>に同意したものとみなされます。
        </p>
      </div>
    </div>
  );
}
