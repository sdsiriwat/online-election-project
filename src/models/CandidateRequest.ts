import { consituency } from "../generated/prisma/client"

export interface CandidateRequest {
    candidatenumber: number
    firstname: string
    lastname: string
    imageurl?: string
    policy?: string
    consituencyId: number
    consituencyprovince: string
    partyId: number
}