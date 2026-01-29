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