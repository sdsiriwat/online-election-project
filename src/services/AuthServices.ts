import { RegisterRequest } from '../models/RegisterRequest';
import { LoginRequest } from '../models/LoginRequest';
import * as authRepo from '../repository/AuthRepository';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'my-secret-key';


export async function registerUser(registerRequest: RegisterRequest) {
    const { nationalId, firstname, lastname, address, province, district, subdistrict, consituencyId, password } = registerRequest;
    return await authRepo.registerUser(
        nationalId, 
        firstname, 
        lastname, 
        address, 
        province, 
        district,
        subdistrict,
        consituencyId,
        bcrypt.hashSync(password, 10)
    );
}

export async function existingNationalId(registerRequest: RegisterRequest) {
    return authRepo.findUserByNationalId(registerRequest.nationalId);
}

export async function generatetoken(nationalId: string, roles: string[], consituencyId: number | null) {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }  
     return jwt.sign({ nationalId, roles, consituencyId }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

export async function getUserFromToken(token: string) {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
    return await authRepo.findUserByNationalId(decoded.nationalId);
}   

export async function comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);

}

export async function findUserByNationalId(LoginRequest: LoginRequest) {
    return authRepo.findUserByNationalId(LoginRequest.nationalId);
}


