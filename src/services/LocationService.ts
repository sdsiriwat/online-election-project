import * as repo from "../repository/LocationRepositoryPrisma";

export function listConsituencies(query: any) {
  const where: any = {};

  if (query.province) where.province = String(query.province);
  if (query.district) where.district = String(query.district);
  if (query.subdistrict) where.subdistrict = String(query.subdistrict);
  if (query.consituencynumber) where.consituencynumber = Number(query.consituencynumber);

  return repo.getConsituencies(where);
}

export function getConsituency(id: number) {
  return repo.getConsituencyById(id);
}

export async function listProvinces() {
  const rows = await repo.getProvinces();
  return rows.map((r) => r.province);
}
