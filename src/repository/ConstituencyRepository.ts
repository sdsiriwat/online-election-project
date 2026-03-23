import { prisma } from '../lib/prisma'


export async function createConstituency(
    consituencynumber: number,
    districtCode: string,
    subdistrictCode: string,
    provinceCode: string,
    zipcode: string,

) {
    return prisma.consituency.create({
        data: {
            provinceCode,
            districtCode,
            subdistrictCode,
            consituencynumber,
            zipcode,
            isclosed: false,
        }
    });
}

// อ่าน AllConstitutency
export async function getAllConstituencies() {
    return prisma.consituency.findMany({
        orderBy: [
            { provinceCode: `asc` },
            { consituencynumber: `asc` },
        ],
    })
}

// อ่านแต่ id contitutency

export async function getConstituencyById(id: number) {
    return prisma.consituency.findUnique({
        where: { id },
    })
}

// ค้นกา และ Filter ตอนลงทะเบียน

export async function searchConstituencies(params: {
    province?: string
    district?: string
    subdistrict?: string
    consituencynumber?: number
}) {
    const where: any = {}

    if (params.province) where.province = { nameTh: params.province }
    if (params.district) where.district = { nameTh: params.district }
    if (params.subdistrict) where.subdistrict = { nameTh: params.subdistrict }
    if (typeof params.consituencynumber === 'number') where.consituencynumber = params.consituencynumber

    return prisma.consituency.findMany({
        where,
        orderBy: [
            { provinceCode: `asc` },
            { consituencynumber: `asc` }],
    })
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
