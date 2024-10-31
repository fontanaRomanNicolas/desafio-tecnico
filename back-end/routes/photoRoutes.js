import { Router } from "express";
const router = Router();
import { viewPhoto } from "../controllers/photoController.js";

router.get("/:filename", viewPhoto);

export default router;