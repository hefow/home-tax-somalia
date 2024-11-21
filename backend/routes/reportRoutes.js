import express from 'express';
import { protect } from '../middleware/auth.js';
import { createReport, getReports, getReport, updateReport, deleteReport } from '../controllers/reportController.js';

const router = express.Router();

router.use(protect);

router.post('/', createReport);
router.get('/', getReports);
router.get('/:id', getReport);
router.put('/:id', updateReport);
router.delete('/:id', deleteReport);

export default router; 