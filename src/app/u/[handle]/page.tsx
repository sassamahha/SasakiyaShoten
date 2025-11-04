import Image from "next/image";
import Link from "next/link";
import { buildAmazonUrl } from "@/lib/build-amazon-url";
import { tenantCatalogMock } from "@/lib/mocks";

interface StorePageProps {
  params: { handle: string };
}

export async function generateMetadata({ params }: StorePageProps) {
  const tenant = tenantCatalogMock.tenants.find((t) => t.handle === params.handle);
  return {
    title: tenant ? `${tenant.name} | ささきや書店` : "ストア | ささきや書店"
  };
}

export default async function StorefrontPage({ params }: StorePageProps) {
  const tenant = tenantCatalogMock.tenants.find((t) => t.handle === params.handle);
  const storeBooks = tenantCatalogMock.storeBooks.filter((entry) => entry.tenantHandle === params.handle);
  const books = storeBooks
    .map((entry) => tenantCatalogMock.books.find((book) => book.asin === entry.asin))
    .filter((book) => Boolean(book));

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-900">{tenant?.name ?? params.handle} の書店</h1>
          <p className="text-sm text-slate-600">Kindle タイトルをピックアップしています。</p>
        </div>
        <Link href="/" className="text-sm font-semibold text-brand">
          ささきや書店にもどる
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {books.map((book) => (
          <article key={book!.asin} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-2xl bg-slate-100">
              {book!.imageUrl ? (
                <Image src={book!.imageUrl} alt={`${book!.title} のカバー`} fill className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-400">No Image</div>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-4 p-5">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-slate-900">{book!.title}</h2>
                <p className="text-sm text-slate-600">{book!.author}</p>
                <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">{book!.description}</p>
              </div>
              <Link
                href={buildAmazonUrl(book!.asin, tenant)}
                className="mt-auto inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-sm hover:opacity-90"
              >
                Amazon.co.jp で見る
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
