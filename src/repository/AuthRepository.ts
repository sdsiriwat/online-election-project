import {prisma} from '../lib/prisma'
import { RoleName } from '../generated/prisma/enums';

// Repository functions for authentication and user management and authorization V1

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

export async function addUserRole(userId: number, roleName: RoleName) {
    return prisma.role.create({
        data: {
            usersId: userId,
            roleName: roleName,
        },
    });

}


export async function deleteUserRole(userId: number, roleName: RoleName) {
    return prisma.role.deleteMany({
        where: {
            usersId: userId,
            roleName: roleName,
        },
    });
}


export async function getAllProvinces () {
    return prisma.consituency.findMany({
        distinct: ['province'],
        select: { province: true },
        orderBy: { province: 'asc' },
    });
    
}

export async function getDistrictsByProvince(province: string) {
    return prisma.consituency.findMany({
        where: {
            province: province
        },
        distinct: ['district'],
        select: { district: true },
        orderBy: { district: 'asc' },
    });
}

export async function getSubdistrictsByDistrict(province: string, district: string) {
    return prisma.consituency.findMany({
        where: {
            province: province,
            district: district
        },
        distinct: ['subdistrict'],
        select: { subdistrict: true },
        orderBy: { subdistrict: 'asc' },
    });
}

export async function getConstituencyNumberByDistrict(province: string, district: string, subdistrict: string) {
    return prisma.consituency.findFirst({
        where: {
            province: province,
            district: district,
            subdistrict: subdistrict
        },
        select: { 
            id: true,
            consituencynumber: true 
        },
    });
}