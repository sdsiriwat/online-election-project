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
    return authRepo.getAllConstituencies();
}

export async function findConstituencyById(id: number) {
    return authRepo.findConstituencyById(id);
}

export async function updateConstituency(id: number, requestConstituency: ConstituencyRequest) {
    const { consituencynumber, district, subdistrict, province, zipcode } = requestConstituency;
    return authRepo.updateConstituency(
        id,
        province,
        consituencynumber,
        subdistrict,
        district,
        zipcode
    );
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