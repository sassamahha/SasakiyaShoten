import Link from "next/link";
import { notFound } from "next/navigation";

import { DashboardClient } from "./client";
import { auth } from "@/auth";
import { getStorefrontBooks, getTenantByHandle } from "@/lib/mock-repository";

export const metadata = {
  title: "ダッシュボード | ささきや書店",
  robots: {
    index: false,
    follow: false,
  },
};

interface DashboardPageProps {
  params: { handle: string };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const session = await auth();
  const tenant = getTenantByHandle(params.handle);

  if (!tenant) {
    notFound();
  }

  if (!session) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">管理ダッシュボードへはログインが必要です</h1>
        <p className="text-sm text-slate-600">メールアドレスまたは Google アカウントでログインしてください。</p>
        <div className="flex justify-center">
          <Link
            href={`/login?callbackUrl=/@${tenant.handle}/dashboard`}
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
        <p className="text-sm text-slate-600">このストアのオーナーのみがダッシュボードにアクセスできます。</p>
        <div className="flex justify-center">
          <Link href={`/@${tenant.handle}`} className="text-sm font-semibold text-brand">
            ストアページに戻る
          </Link>
        </div>
      </div>
    );
  }

  const books = getStorefrontBooks(tenant.handle);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900">{tenant.name} の管理</h1>
        <p className="text-sm text-slate-600">ASIN を追加して紹介文を管理し、公開ステータスや並び順を変更できます。</p>
      </div>
      <DashboardClient tenantId={tenant.id} tenantHandle={tenant.handle} initialBooks={books} />
    </div>
  );
}
