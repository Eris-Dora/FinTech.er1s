import express from 'express';
import aiRoutes from './ai.js';
import documentRoutes from './documents.js';
import authRoutes from './auth.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/ai', aiRoutes);
router.use('/documents', documentRoutes);

export default router;
