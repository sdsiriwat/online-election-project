import express from 'express';
import {voteService} from '../services/VoteServices';
import {VoteRequest} from '../models/VoteRequest';
import {checkRole_voter, protect} from '../middleware/AuthMiddleware';

const router = express.Router();

router.post('/', protect,checkRole_voter, async (req, res) => {
    const VoteRequest : VoteRequest = req.body;
    
    if (!VoteRequest.userId) {
                return res.status(401).json({ message: "Unauthoized" });
            }
    
    const vote = await voteService({userId: VoteRequest.userId,consituencyId: VoteRequest.consituencyId,candidateId: VoteRequest.candidateId});

    return res.status(200).json({
            message: "บันทึกคะแนนเลือกตั้งสำเร็จ",
            data: vote
    });
    
});


export default router;