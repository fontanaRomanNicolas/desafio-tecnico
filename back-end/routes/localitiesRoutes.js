import { Router } from "express";
const router = Router();
import { getAllLocalities, getAllLocalitiesWhitInactive, deleteLocality, updateLocality, createLocality } from "../controllers/localitiesControllers.js";

router.get("/", getAllLocalities);

router.get("/all", getAllLocalitiesWhitInactive);

router.put("/delete/:id", deleteLocality);

router.put("/:id", updateLocality);

router.post("/", createLocality);

export default router;