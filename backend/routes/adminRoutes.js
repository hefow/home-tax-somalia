import express from 'express';
import { protect } from '../middleware/auth.js';
import { isAdmin } from '../middleware/adminMiddleware.js';
import {
  getAllUsers,
  getAllProperties,
  getDashboardStats,
  deleteUser,
  deleteProperty,
  getHomeownerActivities,
  getRevenueTrends
} from '../controllers/adminController.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);
router.use(isAdmin);

router.get('/users', getAllUsers);
router.get('/properties', getAllProperties);
router.get('/dashboard-stats', getDashboardStats);
router.delete('/users/:id', deleteUser);
router.delete('/properties/:id', deleteProperty);
router.get('/homeowner-activities', getHomeownerActivities);
router.get('/revenue-trends', protect, isAdmin, getRevenueTrends);

export default router; 