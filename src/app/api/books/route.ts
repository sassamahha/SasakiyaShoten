import { NextResponse } from "next/server";

const createBookSchema = z.object({
  asin: z.string().min(10).max(16),
  titleOverride: z.string().max(280).optional(),
  authorOverride: z.string().max(140).optional(),
  descriptionOverride: z.string().max(600).optional(),
  imageUrlOverride: z.string().url().optional(),
  tenantId: z.string().uuid(),
  status: z.enum(["draft", "public"]).default("public"),
  note: z.string().max(280).optional()
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const validation = createBookSchema.safeParse(json);

  if (!validation.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { asin, tenantId, status, note, ...overrides } = validation.data;
  const existing = await prisma.book.findUnique({ where: { asin } });

  let bookRecord = existing;
  if (!bookRecord) {
    const paapi = await lookupAsin(asin);

      title: overrides.titleOverride ?? paapi?.title ?? "",
      author: overrides.authorOverride ?? paapi?.author ?? "",
      description: overrides.descriptionOverride ?? paapi?.description ?? "",
      imageUrl: overrides.imageUrlOverride ?? paapi?.imageUrl ?? null,
      source: paapi?.source ?? null
    };

    });
  }

  const storeBook = await prisma.storeBook.upsert({
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
      note
    },
    update: {
      status,
      note
    }
  });

  return NextResponse.json({ book: bookRecord, storeBook }, { status: 201 });
}
