import express from 'express';
import * as constituencyService from '../services/ConstituencyService';
import { ConstituencyRequest } from '../models/ConstituencyRequest';

const router = express.Router();



router.post('/const', async (req, res) => {
    const request: ConstituencyRequest = req.body;
    try {
        const newconstituency = await constituencyService.createConstituency(request);
        res.status(201).json(newconstituency);
        
    } catch (error: any) {
        console.error(error); 

        if (error.code === 'P2002') {
            res.status(400).json({ message: 'เขตเลือกตั้งนี้มีอยู่ในระบบแล้ว' });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});

export default router;