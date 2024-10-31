import { Router } from "express";
const router = Router();
import { getPendingApplications, updateState, getApprovedApplications, getRejectApplications, getRejectById, updateReject } from "../controllers/applicationStatusesControllers.js";
import { uploadSingleDniImage } from "../middlewares/multerMiddleware.js";
import { verifyToken } from "../utils/jwtHelpers.js";

router.get('/pending', getPendingApplications);
router.get('/approved', getApprovedApplications);
router.get('/reject', getRejectApplications);
router.put('/update-state', verifyToken, updateState);
router.get('/reject/:id', getRejectById);
router.put('/reject/:id', verifyToken, uploadSingleDniImage, updateReject);
export default router;