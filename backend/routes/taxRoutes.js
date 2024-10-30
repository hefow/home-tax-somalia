import express from 'express';
import { 
  createTaxRecord, 
  getTaxRecords, 
  getTaxRecordById, 
  updateTaxRecord, 
  deleteTaxRecord 
} from '../controllers/taxController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createTaxRecord);
router.get('/', protect, getTaxRecords);
router.get('/:id', protect, getTaxRecordById);
router.put('/:id', protect, updateTaxRecord);
router.delete('/:id', protect, deleteTaxRecord);

export default router;

