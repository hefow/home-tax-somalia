import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, logoutUser } from '../controllers/usersController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', protect, logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
