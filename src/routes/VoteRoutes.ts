import express from 'express';
import * as  voteService from '../services/VoteServices';
import {VoteRequest} from '../models/VoteRequest';
import * as authMiddleware from '../middleware/AuthMiddleware';

const router = express.Router();

router.post('/', authMiddleware.protect, authMiddleware.checkRole_voter, async (req, res) => {
    const VoteRequest : VoteRequest = req.body;
    
    if (!VoteRequest.userId) {
                return res.status(401).json({ message: "Unauthoized" });
            }
    
    const vote = await voteService.voteService({userId: VoteRequest.userId,consituencyId: VoteRequest.consituencyId,candidateId: VoteRequest.candidateId});

    return res.status(200).json({
            message: "บันทึกคะแนนเลือกตั้งสำเร็จ",
            data: vote
    });
    
});

router.get('/:userId', authMiddleware.protect,  async (req, res) => {
    const user = req.body.user;
        const vote = await voteService.findVoteByUserId(user.id);
        res.status(200).json({  
            status: 'success',
            data: vote
        });
});

export default router;