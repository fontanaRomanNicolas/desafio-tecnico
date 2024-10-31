import { Router } from "express";
const router = Router();
import { uploadSingleEntityImage } from "../middlewares/multerMiddleware.js";
import { findAllEntities, findEntityById, deleteEntity, updateEntity, createEntity, findAllEntitiesWithInactive } from "../controllers/entitiesControllers.js";
import { verifyToken } from "../utils/jwtHelpers.js";

router.get('/inactive', findAllEntitiesWithInactive);

router.get('/', findAllEntities);

router.put('/:id', uploadSingleEntityImage, updateEntity);

router.get('/:id', findEntityById);

router.put('/state/:id', verifyToken, deleteEntity);

router.post('/', verifyToken, uploadSingleEntityImage, createEntity);

export default router;