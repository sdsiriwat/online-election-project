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

// อ่าน AllConstitutency
export async function getAllConstituencies(){
    return prisma.consituency.findMany({
        orderBy:[
            {province: `asc`},
            {consituencynumber: `asc`},
        ],
    })
}

// อ่านแต่ id contitutency

export async function getConstituencyById(id : number){
    return prisma.consituency.findUnique({
        where: {id},
    })
}

