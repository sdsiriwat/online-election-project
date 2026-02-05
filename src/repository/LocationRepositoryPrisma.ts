import { prisma } from "../lib/prisma";

export function getConsituencies(where: any) {
  return prisma.consituency.findMany({
    where,
    orderBy: [{ province: "asc" }, { consituencynumber: "asc" }],
  });
}

export function getConsituencyById(id: number) {
  return prisma.consituency.findUnique({ where: { id } });
}

export function getProvinces() {
  return prisma.consituency.findMany({
    select: { province: true },
    distinct: ["province"],
    orderBy: { province: "asc" },
  });
}