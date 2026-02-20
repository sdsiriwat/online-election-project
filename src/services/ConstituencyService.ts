import { ConstituencyRequest } from '../models/ConstituencyRequest';
import * as authRepo from '../repository/ConstituencyRepository';


// Constituency service functions
export async function createConstituency(requestConstituency: ConstituencyRequest) {
    const { consituencynumber, district, subdistrict, province, zipcode } = requestConstituency;
    return await authRepo.createConstituency(
        consituencynumber,
        district,
        subdistrict,
        province,
        zipcode
    );
}

export async function getAllConstituencies() {
    return await authRepo.getAllConstituencies()
}

export async function getConstituencyById(id: number) {
    return await authRepo.getConstituencyById(id)
}

export async function searchConstituencies(query: any) {
    const params = {
        province: query.province ? String(query.province) : undefined,
        district: query.district ? String(query.district) : undefined,
        subdistrict: query.subdistrict ? String(query.subdistrict) : undefined,
        consituencynumber: query.consituencynumber ? Number(query.consituencynumber) : undefined,
    }
    return await authRepo.searchConstituencies(params)
}