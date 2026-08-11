import { Router } from "express"
import { getMe, updateTimezone } from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.get("/me", authMiddleware, getMe);
router.patch("/timezone", authMiddleware, updateTimezone);

export default router;