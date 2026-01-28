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
    constituency: number,
    password: string,

) {
    

    return prisma.users.create({
        data: {
            nationalId: nationalId,
            firstname: firstName,
            lastname: lastName,
            roleName: ROLE_VOTER,
            password: password,
            consituencynumber: constituency,
            // consituencynumber: {
            //     connect: {
            //         id: constituency
            //     }
            // },
            address: address,
            subdistrict: subdistrict, 
            district: district, 
            province: province, 
            postalCode: ''
        }
    });
}