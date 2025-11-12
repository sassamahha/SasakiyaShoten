import { NextResponse } from "next/server";
import { z } from "zod";

import { lookupAsin } from "@/lib/paapi";
import { mockData } from "@/lib/mocks";
import { createStoreBook, getTenantById } from "@/lib/mock-repository";

const createSchema = z.object({
  tenantId: z.string().min(1),
  asin: z
    .string()
    .regex(/^[0-9A-Z]{10}$/i, "ASIN は英数字10桁で入力してください。")
    .transform((value) => value.toUpperCase()),
  introText: z
    .string()
    .min(80, "紹介文は80文字以上で入力してください。")
    .max(600, "紹介文は600文字以内で入力してください。")
    .refine((value) => !/[<>]/.test(value), {
      message: "紹介文にHTMLタグは利用できません。",
    }),
});

export async function POST(request: Request) {
  const json = await request.json();
  const result = createSchema.safeParse(json);

  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten() }, { status: 400 });
  }

  const { tenantId, asin, introText } = result.data;
  const tenant = getTenantById(tenantId);

  if (!tenant) {
    return NextResponse.json({ message: "Tenant not found" }, { status: 404 });
  }

  try {
    const lookupResult = await lookupAsin(asin);
    if (lookupResult) {
      const existingBook = mockData.books.find((book) => book.asin === asin);
      if (existingBook) {
        existingBook.title = lookupResult.title;
        existingBook.author = lookupResult.author;
        existingBook.description = lookupResult.description;
        existingBook.imageUrl = lookupResult.imageUrl ?? undefined;
      } else {
        mockData.books.push({
          asin,
          title: lookupResult.title,
          author: lookupResult.author,
          description: lookupResult.description,
          imageUrl: lookupResult.imageUrl ?? undefined,
        });
      }
    }

    const storeBook = createStoreBook({
      tenantHandle: tenant.handle,
      asin,
      introText,
    });

    return NextResponse.json({ storeBookId: storeBook.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create store book" }, { status: 500 });
  }
}
