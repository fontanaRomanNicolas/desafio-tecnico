import { Router } from "express";
const router = Router();
import { getAllProvinces, createProvince, updateProvince } from "../controllers/provincesControllers.js";

router.get("/", getAllProvinces);

router.post("/", createProvince);

router.put("/:id", updateProvince);

export default router;