import { Router } from "express";
import { assistantChat } from "../controllers/assistant.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { executeAction } from "../controllers/execution.controllers.js";

const router: Router = Router();

router.post("/chat", authMiddleware, assistantChat);
router.post("/execute", authMiddleware, executeAction);

export default router;