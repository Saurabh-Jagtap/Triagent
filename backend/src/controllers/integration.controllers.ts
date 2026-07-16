import type { Request, Response } from "express";
import { integrationService } from "../services/integration.services.js";

export const disconnectPlugin = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const plugin = req.query.plugin as string;

    if (!plugin) {
      return res.status(400).json({
        success: false,
        message: "Plugin is required.",
      });
    }

    await integrationService.disconnect(
      req.user.id,
      plugin
    );

    return res.json({
      success: true,
      message: `${plugin} disconnected successfully.`,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Disconnect failed",
    });
  }
};

export const getConnectionStatus = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const status =await integrationService.getConnectionStatus(req.user.id);

    return res.json({
      success: true,
      status,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch connection status",
    });
  }
};