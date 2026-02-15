import express from 'express';
import * as constituencyService from '../services/ConstituencyService';
import { ConstituencyRequest } from '../models/ConstituencyRequest';

const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const constituencies = await constituencyService.getAllConstituencies()
        res.status(200).json(constituencies)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'ระบบไม่สามารถให้บริการได้ในขณะนี้ ต้องขออภัยในความไม่สะดวก' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        if (Number.isNaN(id)) {
            return res.status(400).json({ message: 'รหัสเขตเลือกตั้งไม่ถูกต้อง กรุณาใส่ตัวเลข' })
        }
        const constituency = await constituencyService.getConstituencyByID(id)
        if (!constituency) {
            return res.status(404).json({ message: 'ไม่พบเขตเลือกตั้งที่' })
        }
        res.status(200).json(constituency)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'ระบบไม่สามารถให้บริการได้ในขณะนี้' })
    }
})


router.post('/', async (req, res) => {
    const request: ConstituencyRequest = req.body;
    try {
        const newconstituency = await constituencyService.createConstituency(request);
        res.status(201).json(newconstituency);

    } catch (error: any) {
        console.error(error);

        if (error.code === 'P2002') {
            res.status(400).json({ message: 'เขตเลือกตั้งนี้มีอยู่ในระบบแล้ว' });
        } else {
            res.status(500).json({ message: 'ระบบไม่สามารถให้บริการได้ในขณะนี้' });
        }
    }
});

export default router;