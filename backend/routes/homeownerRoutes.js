import express from "express";
import { createHomeowner, deleteHomeowner, getHomeownerById, getHomeowners, updateHomeowner } from "../controllers/homeownerController.js";

const router=express.Router();

router.post('/', createHomeowner);
router.get('/',getHomeowners);
router.get('/:id',getHomeownerById);
router.get('/:id',updateHomeowner);
router.get('/:id',deleteHomeowner);

export default router;