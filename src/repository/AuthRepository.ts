import {prisma} from '../lib/prisma'
import { RoleName } from '../generated/prisma/enums';


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
            password: password,
            address: address,
            subdistrict: subdistrict, 
            district: district, 
            province: province,
            
            consituency : {
                connect: { id: consituencyId }
            },

            role:{
                create: {
                    roleName: RoleName.ROLE_VOTER
                }
            }
        },
        include: {
            role: true,
        },
    });
}


export async function findUserByNationalId(nationalId: string) {
    return prisma.users.findUnique({
        where: {
            nationalId: nationalId,
        },
        include: {
            consituency: true,
            role: true,
        },  
    });
}