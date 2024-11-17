import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getNotifications,
  createNotification,
  markAsRead
} from '../controllers/notificationController.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getNotifications)
  .post(createNotification);

router.put('/:id/read', markAsRead);

export default router;
