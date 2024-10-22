import express from 'express';
import { createProperty, getProperties, getPropertyById, updateProperty, deleteProperty } from '../controllers/propertyController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createProperty);
router.get('/', protect, getProperties);
router.get('/:id', protect, getPropertyById);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);

export default router;

