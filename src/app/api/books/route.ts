import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";

import { lookupAsin } from "@/lib/paapi";
import { prisma } from "@/lib/prisma";
import type { BookBaseData } from "@/types/books";

const bookPayloadSchema = z.object({
  asin: z.string().min(10).max(16),
  titleOverride: z.string().max(280).optional(),
  authorOverride: z.string().max(140).optional(),
  descriptionOverride: z.string().max(600).optional(),
  imageUrlOverride: z.string().url().optional(),
  tenantId: z.string().uuid().optional(),
  status: z.enum(["draft", "public"]).default("public"),
  note: z.string().max(280).optional()
});

type BookMutationShape = {
  title: string;
  author: string;
  description: string;
  image_url: string | null;
  source?: Prisma.InputJsonValue | typeof Prisma.JsonNull;
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = bookPayloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { asin, tenantId, status, note, ...overrides } = parsed.data;

  const existing = await prisma.book.findUnique({ where: { asin } });

  let paapiResult: Awaited<ReturnType<typeof lookupAsin>> | null = null;
  if (!existing) {
    try {
      paapiResult = await lookupAsin(asin);
    } catch (error) {
      console.warn("PA-API lookup failed", error);
    }
  }

  const baseData: BookBaseData = {
    title: overrides.titleOverride ?? paapiResult?.title ?? existing?.title ?? "",
    author: overrides.authorOverride ?? paapiResult?.author ?? existing?.author ?? "",
    description:
      overrides.descriptionOverride ?? paapiResult?.description ?? existing?.description ?? "",
    image_url: overrides.imageUrlOverride ?? paapiResult?.imageUrl ?? existing?.image_url ?? null,
    source: typeof paapiResult?.source !== "undefined" ? paapiResult?.source ?? null : undefined
  };

  if (!baseData.title.trim() || !baseData.author.trim()) {
    return NextResponse.json(
      { error: "Title and author are required either via overrides or PA-API." },
      { status: 400 }
    );
  }

  const sourceValue =
    typeof baseData.source === "undefined"
      ? undefined
      : baseData.source === null
      ? Prisma.JsonNull
      : (baseData.source as Prisma.InputJsonValue);

  const mutationData: BookMutationShape = {
    title: baseData.title,
    author: baseData.author,
    description: baseData.description ?? "",
    image_url: baseData.image_url ?? null,
    ...(typeof sourceValue === "undefined" ? {} : { source: sourceValue })
  };

  const bookRecord = await prisma.book.upsert({
    where: { asin },
    update: mutationData,
    create: {
      asin,
      ...mutationData
    }
  });

  let storeBook: unknown = null;
  if (tenantId) {
    try {
      // @ts-ignore - storeBook model may not be available in every schema revision
      const storeBookClient = prisma.storeBook;
      if (storeBookClient) {
        storeBook = await storeBookClient.upsert({
          where: {
            tenantId_bookId: {
              tenantId,
              bookId: bookRecord.id
            }
          },
          create: {
            tenantId,
            bookId: bookRecord.id,
            status,
            note: note ?? null
          },
          update: {
            status,
            note: note ?? null
          }
        });
      }
    } catch (error) {
      console.warn("storeBook upsert skipped", error);
      storeBook = null;
    }
  }

  const responseStatus = existing ? 200 : 201;
  return NextResponse.json({ book: bookRecord, storeBook }, { status: responseStatus });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const tenantId = url.searchParams.get("tenantId");

  if (tenantId) {
    try {
      // @ts-ignore - storeBook model may not be available in every schema revision
      const storeBookClient = prisma.storeBook;
      if (storeBookClient) {
        const shelfEntries = await storeBookClient.findMany({
          where: { tenantId },
          include: { book: true },
          orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
        });

        const books = shelfEntries.map((entry) => ({
          ...entry.book,
          storeBook: {
            id: entry.id,
            status: entry.status,
            sortOrder: entry.sortOrder,
            note: entry.note
          }
        }));

        return NextResponse.json({ books });
      }
    } catch (error) {
      console.warn("storeBook lookup failed", error);
    }
  }

  const books = await prisma.book.findMany({
    orderBy: { updatedAt: "desc" }
  });

  return NextResponse.json({ books });
}
