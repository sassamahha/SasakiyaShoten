import Link from "next/link";
import { notFound } from "next/navigation";

import { SettingsClient } from "./client";
import { auth } from "@/auth";
import { getTenantByHandle } from "@/lib/mock-repository";

export const metadata = {
  title: "ストア設定 | ささきや書店",
  robots: {
    index: false,
    follow: false,
  },
};

interface SettingsPageProps {
  params: { handle: string };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const session = await auth();
  const tenant = getTenantByHandle(params.handle);

  if (!tenant) {
    notFound();
  }

  if (!session) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">ストア設定の管理にはログインが必要です</h1>
        <p className="text-sm text-slate-600">メールアドレスまたは Google アカウントでログインしてください。</p>
        <div className="flex justify-center">
          <Link
            href={`/login?callbackUrl=/@${tenant.handle}/settings`}
            className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition hover:opacity-90"
          >
            ログインページへ
          </Link>
        </div>
      </div>
    );
  }

  if (session.user?.id !== tenant.ownerUserId) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">アクセス権がありません</h1>
        <p className="text-sm text-slate-600">このストアのオーナーのみが設定を変更できます。</p>
        <div className="flex justify-center">
          <Link href={`/@${tenant.handle}`} className="text-sm font-semibold text-brand">
            ストアページに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">ストア設定</h1>
        <p className="text-sm text-slate-600">ストア名や説明、アフィリエイトタグを管理します。</p>
      </div>
      <SettingsClient
        tenantId={tenant.id}
        plan={tenant.plan}
        defaultName={tenant.name}
        defaultDescription={tenant.description}
        defaultAmazonTag={tenant.amazonTag}
      />
    </div>
  );
}
