"use client";

import { useState } from "react";

type DummyItem = {
  id: number;
  title: string;
  author: string;
  summary: string;
};

interface DummyStorefrontGridProps {
  items: DummyItem[];
}

export function DummyStorefrontGrid({ items }: DummyStorefrontGridProps) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const activeItem = activeId ? items.find((item) => item.id === activeId) ?? null : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <div className="flex flex-1 flex-col gap-3 px-5 py-6">
              <div className="space-y-1">
                <p className="line-clamp-2 text-base font-semibold text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-600">{item.author}</p>
              </div>
              <p className="line-clamp-3 text-xs leading-relaxed text-slate-500">{item.summary}</p>
            </div>
            <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-500 transition group-hover:text-brand">
              詳細をみる
            </div>
          </button>
        ))}
      </div>
      {activeItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-xl">
            <button
              type="button"
              onClick={() => setActiveId(null)}
              className="absolute right-4 top-4 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              閉じる
            </button>
            <div className="space-y-4 px-6 py-10 text-left">
              <h2 className="text-xl font-semibold text-slate-900">{activeItem.title}</h2>
              <p className="text-sm text-slate-600">{activeItem.author}</p>
              <p className="text-sm leading-relaxed text-slate-600">{activeItem.summary}</p>
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                ここに Amazon へのリンクなどが入ります。
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
