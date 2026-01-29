import express from 'express';
import { getDeals, getDealById, createDeal } from '../controllers/dealController';
import { auth, adminAuth } from '../middleware/auth';

const router = express.Router();

router.get('/', getDeals);
router.get('/:id', getDealById);
router.post('/', auth, adminAuth, createDeal);

export default router;
