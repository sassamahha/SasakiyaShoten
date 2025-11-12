import { NextResponse } from "next/server";
import { z } from "zod";

import { updateStoreBookOrder } from "@/lib/mock-repository";

const updateSchema = z.object({
  sortOrder: z.number().int().min(0).max(9999),
});

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const json = await request.json();
  const result = updateSchema.safeParse(json);

  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten() }, { status: 400 });
  }

  try {
    const entry = updateStoreBookOrder(params.id, result.data.sortOrder);
    return NextResponse.json({ storeBookId: entry.id, sortOrder: entry.sortOrder });
  } catch (error) {
    return NextResponse.json({ message: "StoreBook not found" }, { status: 404 });
  }
}
