import { Request, Response } from 'express';
import Deal from '../models/Deal';

export const getDeals = async (req: Request, res: Response) => {
  try {
    const { category, search, accessLevel } = req.query;
    let query: any = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (accessLevel === 'locked') {
      query.isLocked = true;
    } else if (accessLevel === 'unlocked') {
      query.isLocked = false;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { partnerName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const deals = await Deal.find(query).sort({ createdAt: -1 });
    res.json(deals);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const getDealById = async (req: Request, res: Response) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    res.json(deal);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const createDeal = async (req: Request, res: Response) => {
  try {
    const { title, description, partnerName, category, discountValue, isLocked, eligibilityConditions, logoUrl } = req.body;

    // Validation
    if (!title || !description || !partnerName || !category || !discountValue) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const validCategories = ['Cloud', 'Marketing', 'Analytics', 'Productivity', 'Other'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const newDeal = new Deal({
      title,
      description,
      partnerName,
      category,
      discountValue,
      isLocked: isLocked || false,
      eligibilityConditions: eligibilityConditions || [],
      logoUrl: logoUrl || ''
    });
    
    const deal = await newDeal.save();
    res.status(201).json(deal);
  } catch (err: any) {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).send('Server error');
  }
};
