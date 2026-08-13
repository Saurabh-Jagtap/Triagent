import { Router } from "express"
import { getMe, updateProfile, updateTimezone } from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { deleteAccount } from "../controllers/accountDeletion.controllers.js";

const router: Router = Router();

router.get("/me", authMiddleware, getMe);
router.patch("/timezone", authMiddleware, updateTimezone);
router.patch("/profile", authMiddleware, updateProfile);
router.delete("/account",authMiddleware,deleteAccount);

export default router;