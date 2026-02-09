import express from 'express';
import * as constituencyService from '../services/ConstituencyService';
import { ConstituencyRequest } from '../models/ConstituencyRequest';


const router = express.Router();

router.post('/create', async (req, res) => {
    const request: ConstituencyRequest = req.body;
    try {
        const newconstituency = await constituencyService.createConstituency(request); 
        res.status(201).json({
            status: 'success',
            message: 'สร้างเขตเลือกตั้งสำเร็จ',
            data: newconstituency
        });
    } catch (error: any) {
        console.error(error); 

        if (error.code === 'P2002') {
            res.status(400).json({ status: 'error', message: 'เขตเลือกตั้งนี้มีอยู่ในระบบแล้ว' });
        } else {
            res.status(500).json({ status: 'error', message: 'Internal server error' });
        }
    }
});

router.get('/all', async (req, res) => {
    try {
        const constituencies =  await constituencyService.getAllConstituencies();
        res.status(200).json({
            status: 'success',
            data: constituencies
        });
    } catch (error: any) {
        console.error(error); 
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const constituency =  await constituencyService.findConstituencyById(id);
        res.status(200).json({
            status: 'success',
            data: constituency
        });
    } catch (error: any) {  
        console.error(error); 
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const deletedconstituency =  await constituencyService.deleteConstituency(id);
        res.status(200).json({
            status: 'success',
            message: 'ลบเขตเลือกตั้งสำเร็จ',
            data: deletedconstituency
        });
    }
    catch (error: any) {
        console.error(error); 
        res.status(500).json({ status: 'error', message: 'มีผู้มีสิทธิ์เลือกตั้งในเขตเลือกตั้งนี้ อยู่ในระบบ ไม่สามารถลบได้' });
    }   
});

router.put('/open/all', async (req, res) => {
    try {
       await constituencyService.openConstituencyElectionAll();   
        res.status(200).json({
            status: 'success',
            message: 'เปิดการเลือกตั้งในทุกเขตเลือกตั้งสำเร็จ',
        });
    } catch (error: any) {
        console.error(error); 
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }   
});

router.put('/close/all', async (req, res) => {
    try {
        await constituencyService.closeConstituencyElectionAll();   
        res.status(200).json({
            status: 'success',
            message: 'ปิดการเลือกตั้งในทุกเขตเลือกตั้งสำเร็จ',
        });
    } catch (error: any) {
        console.error(error); 
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }   
}); 

router.put('/open/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const openedconstituency =  await constituencyService.openConstituencyElection(id);   
        res.status(200).json({
            status: 'success',
            message: `เปิดการเลือกตั้งในจังหวัด${openedconstituency.province} เขตที่ ${openedconstituency.consituencynumber} สำเร็จ`,
        });
    } catch (error: any) {
        console.error(error); 
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }   
});

router.put('/close/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const closedconstituency =  await constituencyService.closeConstituencyElection(id);   
        res.status(200).json({
            status: 'success',
            message: `ปิดการเลือกตั้งในจังหวัด ${closedconstituency.province} เขตที่ ${closedconstituency.consituencynumber} สำเร็จ`,
        });
    } catch (error: any) {
        console.error(error); 
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }   
});

export default router;