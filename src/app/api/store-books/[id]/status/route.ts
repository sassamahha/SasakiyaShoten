import { NextResponse } from "next/server";
import { z } from "zod";

import { updateStoreBookStatus } from "@/lib/mock-repository";

const updateSchema = z.object({
  status: z.enum(["public", "draft"]),
});

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const json = await request.json();
  const result = updateSchema.safeParse(json);

  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten() }, { status: 400 });
  }

  try {
    const entry = updateStoreBookStatus(params.id, result.data.status);
    return NextResponse.json({ storeBookId: entry.id, status: entry.status });
  } catch (error) {
    return NextResponse.json({ message: "StoreBook not found" }, { status: 404 });
  }
}
