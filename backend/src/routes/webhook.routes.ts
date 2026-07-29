import { Router } from "express";
import { WebhookController } from "../controllers/webhook.controllers.js";

// import { authMiddleware } from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.post("/", WebhookController.process);

export default router;
