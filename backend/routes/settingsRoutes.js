import express from 'express';
import { protect } from '../middleware/auth.js';
import { updateEmailSettings } from '../controllers/settingsController.js';

const router = express.Router();

router.use(protect);

router.put('/email-notifications', updateEmailSettings);

export default router; 