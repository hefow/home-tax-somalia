import express from "express";
import { createHomeowner, deleteHomeowner, getHomeownerById, getHomeowners, updateHomeowner, getHomeownerProperties } from "../controllers/homeownerController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post('/', protect, createHomeowner);
router.get('/', protect, getHomeowners);
router.get('/:id', protect, getHomeownerById);
router.put('/', protect, updateHomeowner);
router.delete('/', protect, deleteHomeowner);
router.use(protect);
router.get('/properties', getHomeownerProperties);

export default router;
