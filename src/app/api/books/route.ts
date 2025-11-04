import { NextResponse } from "next/server";
  asin: z.string().min(10).max(16),
  titleOverride: z.string().max(280).optional(),
  authorOverride: z.string().max(140).optional(),
  descriptionOverride: z.string().max(600).optional(),
  imageUrlOverride: z.string().url().optional(),
  status: z.enum(["draft", "public"]).default("public"),
  note: z.string().max(280).optional()
});

}
