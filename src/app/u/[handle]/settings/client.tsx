"use client";

import { useState } from "react";

interface SettingsClientProps {
  tenantId: string;
  plan: "free" | "pro";
  defaultName: string;
  defaultDescription?: string | null;
  defaultAmazonTag?: string | null;
}

export function SettingsClient({
  tenantId,
  plan,
  defaultName,
  defaultDescription,
  defaultAmazonTag,
}: SettingsClientProps) {
  const [name, setName] = useState(defaultName);
  const [description, setDescription] = useState(defaultDescription ?? "");
  const [amazonTag, setAmazonTag] = useState(defaultAmazonTag ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage(null);
    setError(null);
    try {
      const payload: Record<string, unknown> = {
        name: name.trim(),
        description: description.trim(),
      };
      if (plan === "pro") {
        payload.amazon_tag = amazonTag.trim() || undefined;
      }

      const response = await fetch(`/api/tenant/${tenantId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.errors?.formErrors?.join("\n") ?? data.message ?? "保存に失敗しました。");
      }

      setMessage("ストア設定を保存しました。");
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存に失敗しました。");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-800">ストア名</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          required
          maxLength={80}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-800">ストア説明</label>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
          maxLength={300}
          className="min-h-[120px] w-full rounded-md border border-slate-300 px-3 py-2 text-sm leading-relaxed shadow-sm focus:border-brand focus:outline-none"
          placeholder="ストアの紹介文を入力してください（任意）"
        />
        <span className="text-xs text-slate-500">最大300文字まで入力できます。</span>
      </div>
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-slate-800">Amazonアフィリエイトタグ</label>
            <p className="text-xs text-slate-500">Pro プランでのみ入力できます。未設定の場合は既定タグが利用されます。</p>
          </div>
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
            plan === "pro" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
          }`}
          >
            {plan === "pro" ? "Pro" : "Free"}
          </span>
        </div>
        <input
          type="text"
          value={amazonTag}
          onChange={(event) => setAmazonTag(event.currentTarget.value)}
          disabled={plan !== "pro"}
          placeholder="例: sasakiya-22"
          pattern="[A-Za-z0-9-]+"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-100"
        />
        {plan !== "pro" ? (
          <div className="flex flex-col gap-2 rounded-xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600">
            <p>アフィリエイトタグを設定するには Pro プランにアップグレードしてください。</p>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground shadow-sm transition hover:opacity-90"
            >
              Amazonのアフィリエイトタグを設定する
            </button>
          </div>
        ) : null}
      </div>
      <button
        type="submit"
        disabled={isSaving}
        className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? "保存中..." : "設定を保存"}
      </button>
      {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </form>
  );
}
