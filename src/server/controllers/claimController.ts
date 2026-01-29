import { Response } from 'express';
import Claim from '../models/Claim';
import Deal from '../models/Deal';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

export const claimDeal = async (req: AuthRequest, res: Response) => {
  try {
    const { dealId } = req.body;
    const userId = req.user?.id;

    // Validation
    if (!dealId) {
      return res.status(400).json({ message: 'Deal ID is required' });
    }

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const deal = await Deal.findById(dealId);
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if deal is locked and user is verified
    if (deal.isLocked && !user.isVerified) {
      return res.status(403).json({ message: 'This deal requires account verification' });
    }

    // Check if already claimed
    const existingClaim = await Claim.findOne({ user: userId, deal: dealId });
    if (existingClaim) {
      return res.status(400).json({ message: 'You have already claimed this deal' });
    }

    const newClaim = new Claim({
      user: userId,
      deal: dealId,
      status: 'pending',
      claimCode: Math.random().toString(36).substring(2, 10).toUpperCase()
    });

    const claim = await newClaim.save();
    res.status(201).json(claim);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const getMyClaims = async (req: AuthRequest, res: Response) => {
  try {
    const claims = await Claim.find({ user: req.user?.id })
      .populate('deal')
      .sort({ createdAt: -1 });
    res.json(claims);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const getAllClaims = async (req: Request, res: Response) => {
  try {
    const claims = await Claim.find().populate('user', 'name email').populate('deal');
    res.json(claims);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
