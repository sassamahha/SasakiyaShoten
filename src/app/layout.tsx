import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ささきや書店",
  description: "Kindle 書籍を素早く紹介できるマルチテナント書店テンプレート"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-semibold text-brand">ささきや書店</span>
                <span className="text-sm text-slate-500">Kindle 専用マルチテナント書店</span>
              </div>
              <nav className="text-sm text-slate-600">
                <a href="/login" className="font-medium">
                  ログイン
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-5xl px-6 py-6 text-xs text-slate-500">
              <p className="mb-2">
                当サイトは Amazon アソシエイトとして、適格販売により収入を得ています。
              </p>
              <p className="text-slate-400">© {new Date().getFullYear()} Sasakiya Shoten</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
