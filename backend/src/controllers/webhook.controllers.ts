import type { Request, Response } from "express";
import { WebhookService } from "../services/webhook.services.js";

export class WebhookController {
  static async process(req: Request, res: Response) {
    try {
      const result = await WebhookService.process(req);

      if (!result.response) {
        return res.status(404).json({
          success: false,
          message: "Webhook not handled",
        });
      }

      return res.status(200).json(result.response);
    } catch (error) {
      console.error("Webhook Error:", error);

      return res.status(500).json({
        success: false,
        message: "Webhook processing failed",
      });
    }
  }
}