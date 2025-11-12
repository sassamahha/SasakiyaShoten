import "./globals.css";

import type { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";

import { AppProviders } from "./providers";
import { auth, signOut } from "@/auth";

export const metadata: Metadata = {
  title: "ささきや書店",
  description: "Kindle 書籍を素早く紹介できるマルチテナント書店テンプレート",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  const handleSignOut = async () => {
    "use server";
    await signOut();
  };

  return (
    <html lang="ja">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <header className="border-b border-slate-200 bg-white">
              <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
                <div className="flex items-baseline gap-3">
                  <Link href="/" className="text-2xl font-semibold text-brand">
                    ささきや書店
                  </Link>
                  <span className="text-sm text-slate-500">Kindle 専用マルチテナント書店</span>
                </div>
                <nav className="flex items-center gap-4 text-sm text-slate-600">
                  <Link href="/terms" className="transition hover:text-brand">
                    利用規約
                  </Link>
                  {session?.user ? (
                    <form action={handleSignOut}>
                      <button
                        type="submit"
                        className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-white/70"
                      >
                        ログアウト
                      </button>
                    </form>
                  ) : (
                    <Link
                      href="/login"
                      className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-sm transition hover:opacity-90"
                    >
                      ログイン
                    </Link>
                  )}
                </nav>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t border-slate-200 bg-white">
              <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-slate-500">
                <p className="mb-2">当サイトはアフィリエイトプログラムを利用して収益を得ています。</p>
                <p className="text-slate-400">© {new Date().getFullYear()} Sasakiya Shoten</p>
              </div>
            </footer>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
