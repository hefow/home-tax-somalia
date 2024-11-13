import express from 'express';
import { protect } from '../middleware/auth.js';
import { createReport, getUserReports } from '../controllers/reportController.js';

const router = express.Router();

router.use(protect);

router.post('/', createReport);
router.get('/', getUserReports);

export default router; 