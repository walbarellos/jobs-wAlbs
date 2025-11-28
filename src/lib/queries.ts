// src/lib/queries.ts
import { prisma } from "./db";

export async function getAllLinks() {
  return prisma.link.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function searchLinks(q: string) {
  return prisma.link.findMany({
    where: {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { category: { contains: q, mode: "insensitive" } },
      ],
    },
  });
}

export async function getAffiliateLinks() {
  return prisma.link.findMany({
    where: {
      type: "AFFILIATE",
    },
    orderBy: { createdAt: "desc" },
  });
}
