import type { Request, Response } from "express";
import { EmailSyncService } from "../services/emailSync.services.js";

export const syncEmails = async (req: Request,res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await EmailSyncService.syncInbox(req.user.id);

    return res.json({
      success: true,
      message: "Inbox synchronized successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to synchronize inbox.",
    });
  }
};