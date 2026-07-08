import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { disconnectPlugin, getConnectionStatus } from "../controllers/integration.controllers.js";

const router: Router = Router();

router.post("/disconnect", authMiddleware, disconnectPlugin);
router.get("/status", authMiddleware, getConnectionStatus);

export default router;
