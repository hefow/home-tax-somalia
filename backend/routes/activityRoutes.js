import express from 'express';
import { protect } from '../middleware/auth.js';
import { 
  getActivities, 
  createActivity,
  getHomeownerActivities 
} from '../controllers/activityController.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getActivities)
  .post(createActivity);

router.get('/homeowner/:homeownerId', getHomeownerActivities);

export default router; 