import { NextResponse } from "next/server";

import { getPublicStorefrontBooks, getTenantByHandle } from "@/lib/mock-repository";

export async function GET(_: Request, { params }: { params: { handle: string } }) {
  const tenant = getTenantByHandle(params.handle);
  if (!tenant) {
    return NextResponse.json({ message: "Store not found" }, { status: 404 });
  }

  const books = getPublicStorefrontBooks(params.handle).map((book) => ({
    asin: book.asin,
    title: book.title,
    author: book.author,
    description: book.description,
    imageUrl: book.imageUrl,
    introText: book.introText,
  }));

  return NextResponse.json({
    tenant: {
      handle: tenant.handle,
      name: tenant.name,
      description: tenant.description ?? null,
      plan: tenant.plan,
    },
    books,
  });
}
