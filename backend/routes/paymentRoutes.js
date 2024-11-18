import express from 'express';
import { createCheckoutSession, handleWebhook } from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Route for creating checkout session
router.post('/create-checkout', protect, createCheckoutSession);

// Stripe webhook endpoint - no auth needed as it's called by Stripe
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router; 