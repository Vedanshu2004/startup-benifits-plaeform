const express = require('express');
const router = express.Router();
const Claim = require('../models/Claim');
const Deal = require('../models/Deal');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { dealId } = req.body;
    const userId = req.user.userId;
    const deal = await Deal.findById(dealId);
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    const user = await User.findById(userId);
    if (deal.isLocked && !user.isVerified) {
      return res.status(403).json({ 
        message: 'This deal is locked. You need to verify your account to claim it.' 
      });
    }
    const existingClaim = await Claim.findOne({ userId, dealId });
    if (existingClaim) {
      return res.status(400).json({ message: 'You have already claimed this deal' });
    }
    const claim = new Claim({
      userId,
      dealId
    });

    await claim.save();

    res.status(201).json({
      message: 'Deal claimed successfully',
      claim
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/my-claims', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const claims = await Claim.find({ userId })
      .populate('dealId')
      .sort({ claimedAt: -1 });

    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
