import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createTaxRecord,
  getTaxHistory,
  getTaxRecordById,
  updateTaxRecord,
  deleteTaxRecord
} from '../controllers/taxController.js';

const router = express.Router();

router.use(protect);

router.get('/history', getTaxHistory);
router.post('/', createTaxRecord);
router.get('/:id', getTaxRecordById);
router.put('/:id', updateTaxRecord);
router.delete('/:id', deleteTaxRecord);

export default router;

