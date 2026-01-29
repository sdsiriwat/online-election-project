// src/services/AuthServices.ts
import { RegisterRequest } from '../models/RegisterRequest';
import * as authRepo from '../repository/AuthRepository';
import bcrypt from 'bcryptjs';

export async function registerUser(registerRequest: RegisterRequest) {
    // 1. Destructure ข้อมูลออกมา
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