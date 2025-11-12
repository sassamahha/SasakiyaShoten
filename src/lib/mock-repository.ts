import { randomUUID } from "crypto";

import { mockData } from "./mocks";

export interface StorefrontBook {
  asin: string;
  title: string;
  author: string;
  description?: string;
  imageUrl?: string;
  introText: string;
  status: "public" | "draft";
  sortOrder: number;
  tenantHandle: string;
  id: string;
}

export function getTenantByHandle(handle: string) {
  return mockData.tenants.find((tenant) => tenant.handle === handle) ?? null;
}

export function getTenantById(id: string) {
  return mockData.tenants.find((tenant) => tenant.id === id) ?? null;
}

export function getStorefrontBooks(handle: string) {
  return mockData.storeBooks
    .filter((entry) => entry.tenantHandle === handle)
    .map((entry) => {
      const book = mockData.books.find((item) => item.asin === entry.asin);
      return book
        ? {
            id: entry.id,
            asin: book.asin,
            title: book.title,
            author: book.author,
            description: book.description,
            imageUrl: book.imageUrl,
            introText: entry.introText,
            status: entry.status,
            sortOrder: entry.sortOrder,
            tenantHandle: entry.tenantHandle,
          }
        : null;
    })
    .filter((value): value is StorefrontBook => Boolean(value))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getPublicStorefrontBooks(handle: string) {
  return getStorefrontBooks(handle).filter((book) => book.status === "public");
}

export function createStoreBook({
  tenantHandle,
  asin,
  introText,
}: {
  tenantHandle: string;
  asin: string;
  introText: string;
}) {
  const existing = mockData.storeBooks.find(
    (entry) => entry.tenantHandle === tenantHandle && entry.asin === asin
  );
  if (existing) {
    throw new Error("Book already exists in store");
  }

  const existingBook = mockData.books.find((book) => book.asin === asin);
  if (!existingBook) {
    mockData.books.push({
      asin,
      title: "タイトル未設定",
      author: "著者未設定",
      description: "",
    });
  }

  const sortOrder = mockData.storeBooks
    .filter((entry) => entry.tenantHandle === tenantHandle)
    .reduce((max, entry) => Math.max(max, entry.sortOrder), 0) + 1;

  const storeBook = {
    id: randomUUID(),
    tenantHandle,
    asin,
    status: "draft" as const,
    sortOrder,
    introText,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockData.storeBooks.push(storeBook);
  return storeBook;
}

export function updateStoreBookStatus(id: string, status: "public" | "draft") {
  const entry = mockData.storeBooks.find((item) => item.id === id);
  if (!entry) {
    throw new Error("StoreBook not found");
  }
  entry.status = status;
  entry.updatedAt = new Date().toISOString();
  return entry;
}

export function updateStoreBookOrder(id: string, sortOrder: number) {
  const entry = mockData.storeBooks.find((item) => item.id === id);
  if (!entry) {
    throw new Error("StoreBook not found");
  }
  entry.sortOrder = sortOrder;
  entry.updatedAt = new Date().toISOString();
  return entry;
}
