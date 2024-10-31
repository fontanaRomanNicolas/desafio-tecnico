import { Router } from "express";
const router = Router();
import { getAllShools, createSchool, updateSchool, getSchool, deleteSchool, getAllSchoolsWithInactive} from "../controllers/schoolsControllers.js";
import {uploadSingleSchoolImage} from "../middlewares/multerMiddleware.js";
import { verifyToken } from "../utils/jwtHelpers.js";

router.get("/inactive", getAllSchoolsWithInactive);

router.get("/", getAllShools);

router.get("/:id", getSchool);

router.post("/", verifyToken, uploadSingleSchoolImage, createSchool);

router.put("/:id", verifyToken, uploadSingleSchoolImage, updateSchool);

router.delete("/:id", verifyToken, deleteSchool);

export default router;