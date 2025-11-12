"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { buildAmazonUrl, type TenantLike } from "@/lib/build-amazon-url";
import { track } from "@/lib/analytics";
import type { StorefrontBook } from "@/lib/mock-repository";

interface StorefrontViewProps {
  tenant: TenantLike & { name: string; description?: string | null };
  books: StorefrontBook[];
  initialOpenAsin?: string | null;
}

export function StorefrontView({ tenant, books, initialOpenAsin }: StorefrontViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeAsin, setActiveAsin] = useState<string | null>(initialOpenAsin ?? null);

  const activeBook = useMemo(
    () => books.find((book) => book.asin === activeAsin) ?? null,
    [activeAsin, books]
  );

  useEffect(() => {
    track("store_view", { handle: tenant.handle });
  }, [tenant.handle]);

  const openParam = searchParams.get("open");
  useEffect(() => {
    setActiveAsin(openParam);
  }, [openParam]);

  const handleOpen = (asin: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("open", asin);
    track("card_open", { handle: tenant.handle, asin });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("open");
    router.push(params.toString() ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  };

  if (!books.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">
        まだ本がありません。
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <button
            key={book.asin}
            type="button"
            onClick={() => handleOpen(book.asin)}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <div className="relative aspect-[3/4] w-full bg-slate-100">
              {book.imageUrl ? (
                <Image
                  src={book.imageUrl}
                  alt={`${book.title} の表紙`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-400">表紙なし</div>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2 px-4 py-5">
              <div className="space-y-1">
                <p className="line-clamp-2 text-base font-semibold text-slate-900">{book.title}</p>
                <p className="line-clamp-1 text-sm text-slate-600">{book.author}</p>
              </div>
              <p className="line-clamp-3 text-xs leading-relaxed text-slate-500">{book.introText}</p>
            </div>
          </button>
        ))}
      </div>
      {activeBook ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-xl">
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              閉じる
            </button>
            <div className="grid gap-6 p-6 sm:grid-cols-[180px_1fr] sm:p-8">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-100">
                {activeBook.imageUrl ? (
                  <Image
                    src={activeBook.imageUrl}
                    alt={`${activeBook.title} の表紙`}
                    fill
                    className="object-cover"
                    sizes="240px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-400">表紙なし</div>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-slate-900">{activeBook.title}</h2>
                  <p className="text-sm text-slate-600">{activeBook.author}</p>
                </div>
                {activeBook.description ? (
                  <p className="text-sm leading-relaxed text-slate-600">{activeBook.description}</p>
                ) : null}
                <div className="rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
                  {activeBook.introText}
                </div>
                <div className="mt-auto flex flex-col gap-3 sm:flex-row">
                  <a
                    href={buildAmazonUrl(activeBook.asin, tenant)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      track("amazon_click", {
                        handle: tenant.handle,
                        asin: activeBook.asin,
                        plan_type: tenant.plan,
                      })
                    }
                    className="inline-flex flex-1 items-center justify-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition hover:opacity-90"
                  >
                    Amazonで見る
                  </a>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex flex-1 items-center justify-center rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-white/70"
                  >
                    閉じる
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
