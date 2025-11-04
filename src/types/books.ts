import type { Prisma } from "@prisma/client";

export type BookBaseData = {
  title: string;
  author: string;
  description?: string | null;
  image_url?: string | null;
  source?: Prisma.InputJsonValue | null;
};
