import {prisma} from '../lib/prisma'


export async function createConstituency(
    consituencynumber: number,
    district: string,
    subdistrict: string,
    province: string,  
    zipcode: string,

) {
    

    return prisma.consituency.create({
       data: {
            consituencynumber: consituencynumber,
            district: district,
            subdistrict: subdistrict,
            province: province,
            zipcode: zipcode,
        }
    });
}