import { NextResponse } from "next/server";
import { z } from "zod";

import { mockData } from "@/lib/mocks";
import { getTenantById } from "@/lib/mock-repository";

const patchSchema = z
  .object({
    name: z.string().min(1).max(80).optional(),
    description: z.string().max(300).optional(),
    amazon_tag: z
      .string()
      .regex(/^[A-Za-z0-9-]+$/, "タグは英数字とハイフンのみ使用できます。")
      .optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    "少なくとも1項目を更新してください。"
  );

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const json = await request.json();
  const result = patchSchema.safeParse(json);

  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten() }, { status: 400 });
  }

  const tenant = getTenantById(params.id);
  if (!tenant) {
    return NextResponse.json({ message: "Tenant not found" }, { status: 404 });
  }

  const payload = result.data;
  if (payload.name) {
    tenant.name = payload.name;
  }
  if (payload.description !== undefined) {
    tenant.description = payload.description;
  }
  if (tenant.plan === "pro" && payload.amazon_tag !== undefined) {
    tenant.amazonTag = payload.amazon_tag;
  }
  if (tenant.plan !== "pro") {
    tenant.amazonTag = undefined;
  }

  const storedTenant = mockData.tenants.find((item) => item.id === tenant.id);
  if (storedTenant) {
    storedTenant.name = tenant.name;
    storedTenant.description = tenant.description;
    storedTenant.amazonTag = tenant.amazonTag;
  }

  return NextResponse.json({
    id: tenant.id,
    name: tenant.name,
    description: tenant.description,
    plan: tenant.plan,
    amazonTag: tenant.amazonTag ?? null,
  });
}
