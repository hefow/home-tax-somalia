import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createTaxRecord,
  getTaxRecords,
  getTaxRecordById,
  updateTaxRecord,
  deleteTaxRecord,
  getTaxHistory
} from '../controllers/taxController.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getTaxRecords)
  .post(createTaxRecord);

router.get('/history', getTaxHistory);

router.route('/:id')
  .get(getTaxRecordById)
  .put(updateTaxRecord)
  .delete(deleteTaxRecord);

export default router;

