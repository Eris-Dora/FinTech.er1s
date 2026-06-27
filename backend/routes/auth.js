import express from 'express';
import { generateToken } from '../middleware/auth.js';

const router = express.Router();

// Simple token generation for development
// In production, connect with Telegram Mini App authentication
router.post('/token', (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const token = generateToken(userId);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
