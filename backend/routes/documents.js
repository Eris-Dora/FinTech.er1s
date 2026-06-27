import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import upload from '../middleware/fileUpload.js';
import { processPdfDocument, processExcelDocument } from '../services/geminiService.js';

const router = express.Router();

// Upload and process bank statement (PDF/XLS)
router.post('/process-statement', verifyToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const { mimetype, buffer } = req.file;
    let result;

    if (mimetype === 'application/pdf') {
      result = await processPdfDocument(buffer);
    } else if (
      mimetype === 'application/vnd.ms-excel' ||
      mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      result = await processExcelDocument(buffer);
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    res.json({ 
      success: true, 
      data: result,
      fileType: mimetype 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
