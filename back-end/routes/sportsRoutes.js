import { Router } from "express";
const router = Router();
import { findSportById, createSport, updateSport, findAllSport, deleteSport, findAllWhitInactiveSport } from "../controllers/sportsControllers.js";
import { verifyToken } from "../utils/jwtHelpers.js";

router.get('/inactive', findAllWhitInactiveSport);

router.get('/:id', findSportById);

router.post('/', verifyToken, createSport);

router.put('/:id', verifyToken, updateSport);

router.get('/', findAllSport);

router.put('/delete/:id', verifyToken, deleteSport);

export default router;