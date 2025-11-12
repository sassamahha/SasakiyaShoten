"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { track } from "@/lib/analytics";
import type { StorefrontBook } from "@/lib/mock-repository";

const formSchema = z.object({
  asin: z
    .string()
    .regex(/^[0-9A-Z]{10}$/i, "ASIN は英数字10桁で入力してください。"),
  introText: z
    .string()
    .min(80, "紹介文は80文字以上で入力してください。")
    .max(600, "紹介文は600文字以内で入力してください。")
    .refine((value) => !/[<>]/.test(value), "紹介文にHTMLタグは利用できません。"),
});

interface DashboardClientProps {
  tenantId: string;
  tenantHandle: string;
  initialBooks: StorefrontBook[];
}

type FormValues = z.infer<typeof formSchema>;

export function DashboardClient({ tenantId, tenantHandle, initialBooks }: DashboardClientProps) {
  const [books, setBooks] = useState(initialBooks);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sortedBooks = useMemo(() => [...books].sort((a, b) => a.sortOrder - b.sortOrder), [books]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      asin: "",
      introText: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    setIsSubmitting(true);
    setMessage(null);
    setError(null);
    try {
      const response = await fetch("/api/store-books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantId,
          asin: values.asin.toUpperCase(),
          introText: values.introText,
        }),
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.errors?.formErrors?.join("\n") ?? payload.message ?? "保存に失敗しました。");
      }

      const { storeBookId } = await response.json();
      setMessage("ドラフトとして追加しました。書誌情報を確認して公開ステータスを切り替えてください。");
      form.reset();
      track("book_add", { tenantId, asin: values.asin });
      setBooks((prev) => [
        ...prev,
        {
          id: storeBookId,
          asin: values.asin.toUpperCase(),
          title: "タイトル未設定",
          author: "著者未設定",
          description: "",
          imageUrl: undefined,
          introText: values.introText,
          status: "draft",
          sortOrder: prev.reduce((max, item) => Math.max(max, item.sortOrder), 0) + 1,
          tenantHandle,
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存に失敗しました。");
    } finally {
      setIsSubmitting(false);
    }
  });

  const updateBookInState = (id: string, patch: Partial<StorefrontBook>) => {
    setBooks((prev) => prev.map((book) => (book.id === id ? { ...book, ...patch } : book)));
  };

  const handleStatusChange = async (bookId: string, nextStatus: "public" | "draft") => {
    const response = await fetch(`/api/store-books/${bookId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    if (response.ok) {
      updateBookInState(bookId, { status: nextStatus });
      track("publish_toggle", { storeBookId: bookId, to_status: nextStatus });
    } else {
      setError("公開ステータスの更新に失敗しました。");
    }
  };

  const handleSortChange = async (bookId: string, sortOrder: number) => {
    const response = await fetch(`/api/store-books/${bookId}/order`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sortOrder }),
    });
    if (!response.ok) {
      setError("並び順の更新に失敗しました。");
      return;
    }
    updateBookInState(bookId, { sortOrder });
    track("sort_change", { tenantId });
  };

  return (
    <div className="flex flex-col gap-10">
      <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">ASIN を追加</h2>
          <p className="text-sm text-slate-600">Kindle の ASIN と紹介文を入力してください。保存するとドラフトとして追加されます。</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-800">ASIN</label>
            <input
              type="text"
              {...form.register("asin")}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none"
              placeholder="例: B09J2Y4ZZ4"
            />
            {form.formState.errors.asin ? (
              <p className="text-xs text-red-500">{form.formState.errors.asin.message}</p>
            ) : null}
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-800">紹介文</label>
            <textarea
              {...form.register("introText")}
              className="min-h-[160px] w-full rounded-md border border-slate-300 px-3 py-2 text-sm leading-relaxed shadow-sm focus:border-brand focus:outline-none"
              placeholder="80〜600文字で紹介文を入力してください。HTMLは使用できません。"
            />
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{form.watch("introText").length} / 600</span>
              <span>URL はテキストのまま入力してください。</span>
            </div>
            {form.formState.errors.introText ? (
              <p className="text-xs text-red-500">{form.formState.errors.introText.message}</p>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "保存中..." : "ドラフトとして追加"}
          </button>
          {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
        </form>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">陳列中の書籍</h2>
          <p className="text-xs text-slate-500">ドラフトは公開ストアには表示されません。</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">ASIN</th>
                <th className="px-4 py-3">タイトル</th>
                <th className="px-4 py-3">ステータス</th>
                <th className="px-4 py-3">並び順</th>
                <th className="px-4 py-3">紹介文</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedBooks.map((book) => (
                <tr key={book.id} className="align-top hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{book.asin}</td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <p className="font-medium text-slate-800">{book.title}</p>
                      <p className="text-xs text-slate-500">{book.author}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(book.id, book.status === "public" ? "draft" : "public")}
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                        book.status === "public"
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      {book.status === "public" ? "公開" : "下書き"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      defaultValue={book.sortOrder}
                      onBlur={(event) => {
                        const value = Number(event.currentTarget.value);
                        if (!Number.isNaN(value)) {
                          handleSortChange(book.id, value);
                        }
                      }}
                      className="w-20 rounded-md border border-slate-300 px-3 py-1 text-sm shadow-sm focus:border-brand focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-3 text-xs leading-relaxed text-slate-600">{book.introText}</td>
                </tr>
              ))}
              {!sortedBooks.length ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-500">
                    まだ本が登録されていません。
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
