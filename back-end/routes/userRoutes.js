import { Router } from "express";
const router = Router();
import { changePasswordController, getUserController } from "../controllers/userControllers.js";
import { verifyToken } from "../utils/jwtHelpers.js";

router.get('/:identification_document', getUserController);

router.post('/change-password', verifyToken, changePasswordController);

export default router;