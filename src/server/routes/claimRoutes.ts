import express from 'express';
import { claimDeal, getMyClaims, getAllClaims } from '../controllers/claimController';
import { auth, adminAuth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, claimDeal);
router.get('/my', auth, getMyClaims);
router.get('/all', auth, adminAuth, getAllClaims);

export default router;
