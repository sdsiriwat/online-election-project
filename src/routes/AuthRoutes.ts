import express from 'express';
import { RegisterRequest } from '../models/RegisterRequest';
import { LoginRequest } from '../models/LoginRequest';
import * as authService from '../services/AuthServices';
import { RoleName } from '../../generated/prisma/enums';



const router = express.Router();

router.post('/register', async (req, res) => {
    const registerRequest: RegisterRequest = req.body;

    try {
        const existingUser = await authService.existingNationalId(registerRequest);
        
        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'เลขบัตรประชาชนนี้ถูกใช้งานแล้วจ้า' });
        }
        const response = await authService.registerUser(registerRequest);
        
        res.status(201).json({
            status: 'success', 
            message: 'User registered successfully',
            userId: response.id 
        });

    } catch (error: any) {
        console.error(error); 
            res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});


router.post('/login', async (req, res) => {
    const loginRequest: LoginRequest = req.body;
    const user = await authService.findUserByNationalId(loginRequest);

    if (loginRequest.nationalId === undefined || loginRequest.nationalId === "" || loginRequest.nationalId === null) {
        return res.status(400).json({ status: 'error', message: 'กรุณากรอกบัตรประชาชน' });
    }
    if (!user) {
        return res.status(404).json({ status: 'error', message: 'ไม่พบผู้ใช้งานนี้ในระบบ' });
    }

    if (loginRequest.password === undefined || loginRequest.password === "" ||  user.password === undefined || user.password === null) {
        return res.status(400).json({ status: 'error', message: 'กรุณากรอกรหัสผ่าน' });
    }

    const isPasswordCorrect = await authService.comparePassword(loginRequest.password, user.password); {
        if (!isPasswordCorrect) {
            return res.status(401).json({ status: 'error', message: 'รหัสผ่านไม่ถูกต้อง' });
        }
    }

    const token = await authService.generatetoken(user.nationalId, user.role.map(r => r.roleName), user.consituencyID);

    res.status(200).json({
        status: 'success',
        message: 'Login successful',
        token: token,
        user: {
            id: user.id,
            nationalId: user.nationalId,
            firstname: user.firstname,
            lastname: user.lastname,
            consituencypercent: user.consituency.province,
            consituencynumber: user.consituency.consituencynumber,
            RoleName: user.role.map(r => r.roleName) as RoleName[],
        }
    });
});

export default router;