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

export async function getAllConstituencies() {
    return prisma.consituency.findMany();
}

export async function findConstituencyById(id: number) {
    return prisma.consituency.findUnique({
        where: {
            id: id,
        },
    });
}

export async function updateConstituency(id: number, 
    province: string,
    consituencynumber: number,
    subdistrict: string,
    district: string,
    zipcode: string,
) {
    return prisma.consituency.update({
        where: {
            id: id,
        },
        data: {
            province,
            consituencynumber,
            subdistrict,
            district,
            zipcode,
        },
    });
}

export async function deleteConstituency(id: number) {
    return prisma.consituency.delete({
        where: {
            id: id,
        },
    });
}

export async function openConstituencyElection(id: number) {
    return prisma.consituency.update({
        where: {
            id: id,
        },
        data: {
            isclosed: false,
        },
    });
}

export async function closeConstituencyElection(id: number) {
    return prisma.consituency.update({
        where: {
            id: id,
        },
        data: {
            isclosed: true,
        },
    });
}


export async function openConstituencyElectionAll() {
    return prisma.consituency.updateMany({
        data: {
            isclosed: false,
        },
    });
}

export async function closeConstituencyElectionAll() {
    return prisma.consituency.updateMany({
        data: {
            isclosed: true,
        },
    });
}