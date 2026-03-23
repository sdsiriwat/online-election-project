import { ConstituencyRequest } from '../models/ConstituencyRequest';
import * as authRepo from '../repository/ConstituencyRepository';


// Constituency service functions and business logic for handling constituency-related operations
export async function createConstituency(requestConstituency: ConstituencyRequest) {
    const {
        provinceCode,
        districtCode,
        subdistrictCode,
        consituencynumber,
        zipcode, } = requestConstituency;

    return await authRepo.createConstituency(
        consituencynumber,
        districtCode,
        subdistrictCode,
        provinceCode,
        zipcode,
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


export async function deleteConstituency(id: number) {
    return authRepo.deleteConstituency(id);
}  

export async function openConstituencyElection(id: number) {
    return authRepo.openConstituencyElection(id);
}

export async function closeConstituencyElection(id: number) {
    return authRepo.closeConstituencyElection(id);
}

export async function openConstituencyElectionAll() {
    return authRepo.openConstituencyElectionAll();
}

export async function closeConstituencyElectionAll() {
    return authRepo.closeConstituencyElectionAll();
}