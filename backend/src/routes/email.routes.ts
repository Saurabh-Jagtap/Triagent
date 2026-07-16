import { Router } from "express";
import { getThreads, sendEmail } from "../controllers/email.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { syncEmails } from "../controllers/emailSync.controllers.js";

const router: Router = Router()

router.get('/threads', authMiddleware, getThreads)
router.post('/send', authMiddleware, sendEmail)
router.post('/sync', authMiddleware, syncEmails)

export default router
