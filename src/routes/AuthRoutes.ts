// src/routes/AuthRoutes.ts
import express from 'express';
import { RegisterRequest } from '../models/RegisterRequest';
import * as authService from '../services/AuthServices';

const router = express.Router();

router.post('/register', async (req, res) => {
    const registerRequest: RegisterRequest = req.body;

    try {
        const response = await authService.registerUser(registerRequest);
        
        res.status(201).json({
            status: 'success', 
            message: 'User registered successfully',
            userId: response.id 
        });

    } catch (error: any) {
        console.error(error); 
        
        if (error.code === 'P2002') {
            res.status(400).json({ status: 'error', message: 'เลขบัตรประชาชนนี้ถูกใช้งานแล้ว' });
        } else {
            res.status(500).json({ status: 'error', message: 'Internal server error' });
        }
    }
});

export default router;