import { NextResponse } from "next/server";
import { z } from "zod";
import { lookupAsin } from "@/lib/paapi";

const requestSchema = z.object({
  asin: z.string().min(10).max(16)
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);

  const result = requestSchema.safeParse(json);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const payload = await lookupAsin(result.data.asin);

  if (!payload) {
    return NextResponse.json({ data: null }, { status: 200 });
  }

  return NextResponse.json({ data: payload }, { status: 200 });
}
