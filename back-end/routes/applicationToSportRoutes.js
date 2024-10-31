import { Router } from "express";
import { uploadSingleDniImage } from "../middlewares/multerMiddleware.js";
import { createApplicationSportNewUser, findApplicationToSportByUserId, renewalApplicationToSport } from "../controllers/applicationToSportControllers.js";

const router = Router();

router.get('/:user_id', findApplicationToSportByUserId);

router.post('/new', uploadSingleDniImage, createApplicationSportNewUser);

router.post('/renewal-scholarship', renewalApplicationToSport);

export default router;
