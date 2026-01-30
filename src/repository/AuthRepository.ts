import {prisma} from '../lib/prisma'

const ROLE_VOTER = 'VOTER' as const;


export async function registerUser(
    nationalId: string,
    firstName: string,
    lastName: string,         
    address: string,
    province: string,
    district: string,
    subdistrict: string,
    consituencyId: number,
    password: string,

) {
    return prisma.users.create({
       data: {
            nationalId: nationalId,
            firstname: firstName,
            lastname: lastName,
            roleName: ROLE_VOTER,
            password: password,
            consituencyID: consituencyId,
            address: address,
            subdistrict: subdistrict, 
            district: district, 
            province: province,
        }
    });
}


export async function findUserByNationalId(nationalId: string) {
    return prisma.users.findUnique({
        where: {
            nationalId: nationalId,
        },
        include: {
            consituency: true,
        },
    });
}