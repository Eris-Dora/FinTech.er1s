import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { 
  analyzeTransactions, 
  generateFinancialAdvice, 
  chatWithAI 
} from '../services/geminiService.js';
import { validateUserInput, validateTransactionData } from '../utils/validators.js';

const router = express.Router();

// Analyze user transactions
router.post('/analyze-transactions', verifyToken, async (req, res) => {
  try {
    const { transactions } = req.body;
    validateTransactionData(transactions);
    
    const analysis = await analyzeTransactions(transactions);
    res.json({ analysis });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get personalized financial advice
router.post('/advice', verifyToken, async (req, res) => {
  try {
    const { userProfile, recentTransactions } = req.body;
    validateTransactionData(userProfile);
    
    const advice = await generateFinancialAdvice(userProfile, recentTransactions || []);
    res.json({ advice });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Chat endpoint
router.post('/chat', verifyToken, async (req, res) => {
  try {
    const { message, history } = req.body;
    const userMessage = validateUserInput(message);
    
    const response = await chatWithAI(userMessage, history || []);
    res.json({ response });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
