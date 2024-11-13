import express from 'express';
import { protect } from '../middleware/auth.js';
import { getActivities, createActivity } from '../controllers/activityController.js';

const router = express.Router();

router.use((req, res, next) => {
  console.log('Activities Route accessed:', req.path);
  next();
});

router.use(protect);

router.get('/', getActivities);
router.post('/', createActivity);

export default router; 