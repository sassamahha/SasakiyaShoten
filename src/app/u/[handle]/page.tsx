import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { StorefrontView } from "./storefront-view";
import { getPublicStorefrontBooks, getTenantByHandle } from "@/lib/mock-repository";

interface StorePageProps {
  params: { handle: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: StorePageProps): Promise<Metadata> {
  const tenant = getTenantByHandle(params.handle);
  if (!tenant) {
    return { title: "ストアが見つかりません | ささきや書店" };
  }

  const title = `${tenant.name} | ささきや書店`;
  const description = tenant.description ?? "Kindle タイトルを紹介する書店です。";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function StorefrontPage({ params, searchParams }: StorePageProps) {
  const tenant = getTenantByHandle(params.handle);
  if (!tenant) {
    notFound();
  }

  const books = getPublicStorefrontBooks(params.handle);
  const openParam = searchParams?.open;
  const initialOpenAsin = Array.isArray(openParam) ? openParam[0] : openParam;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{tenant.name}</h1>
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">{books.length} 冊</span>
          </div>
          {tenant.description ? (
            <p className="max-w-3xl text-sm leading-relaxed text-slate-600">{tenant.description}</p>
          ) : null}
        </div>
        <Link href="/" className="text-sm font-semibold text-brand">
          ささきや書店にもどる
        </Link>
      </div>
      <StorefrontView tenant={tenant} books={books} initialOpenAsin={initialOpenAsin ?? null} />
    </div>
  );
}
