import express from 'express';
import { createPaymentIntent, handleWebhook } from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/create-intent', protect, createPaymentIntent);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router; 