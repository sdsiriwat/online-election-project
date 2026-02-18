import { ConstituencyRequest } from '../models/ConstituencyRequest';
import * as authRepo from '../repository/ConstituencyRepository';



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

export async function getAllConstituencies(){
    return await authRepo.getAllConstituencies()
}

export async function getConstituencyById(id : number){
    return await authRepo.getConstituencyById(id)
}