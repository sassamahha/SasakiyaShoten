"use client";

import { useState } from "react";

export function AffiliateTagDialogButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-sm transition hover:opacity-90"
      >
        Amazon のアフィリエイトタグを設定する
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              閉じる
            </button>
            <div className="space-y-4 text-left">
              <h3 className="text-lg font-semibold text-slate-900">アフィリエイト設定（ダミー）</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                ここでは Amazon アフィリエイトタグの設定フローが入ります。実装予定の UI を確認するためのダミーダイアログです。
              </p>
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                今後、Amazon の PA-API と連携して自動入力をサポートします。
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white/70"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
