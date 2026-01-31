import {prisma} from '../lib/prisma'

export async function upsetVote(userId: number,candidateId: number){
    return prisma.vote.upsert({
        where: {
            usersId: userId
               },
        update: {
            candidateId: candidateId,
            updatedAt: new Date()
                },
        create: {
            usersId: userId,
            candidateId: candidateId
    }
    }); 
} 

export async function consituencyByID(consituencyId: number){
    return prisma.consituency.findUnique({
        where: {
            id: consituencyId
        }
    });
}

export async function candidateByID(candidateId: number){
    return prisma.candidate.findUnique({
        where: {
            id: candidateId
        }
    });
}