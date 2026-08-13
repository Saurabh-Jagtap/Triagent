import { Router } from "express";
import { connectController, disconnect, getConnections } from "../controllers/connect.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.get("/", authMiddleware, connectController);
router.get("/connections", authMiddleware, getConnections);
router.delete("/connections/:provider", authMiddleware, disconnect);

export default router;
