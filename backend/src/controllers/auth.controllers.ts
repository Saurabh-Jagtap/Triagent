import type { Request, Response } from "express";
import { ConnectService } from "../services/connect.services.js";

const REDIRECT_URI = `${process.env.APP_URL}/api/auth`;

export const authController = async (req: Request, res: Response) => {
  const code = req.query.code as string | undefined;
  const state = req.query.state as string | undefined;
  const error = req.query.error as string | undefined;

  if (error) {
    res.clearCookie("oauth_state");

    return res.status(400).json({
      success: false,
      error,
    });
  }

  if (!code || !state) {
    res.clearCookie("oauth_state");

    return res.status(400).json({
      success: false,
      message: "Missing code or state",
    });
  }

  const storedState = req.cookies.oauth_state;

  if (!storedState || storedState !== state) {
    res.clearCookie("oauth_state");

    return res.status(400).json({
      success: false,
      message: "Invalid OAuth state",
    });
  }

  // State has been successfully validated.
  res.clearCookie("oauth_state");

  try {
    const result = await ConnectService.completeConnection({
      code,
      state,
      redirectUri: REDIRECT_URI,
    });

    return res.redirect(`${process.env.FRONTEND_URL}/connect/success?plugin=${result.plugin}`);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "OAuth callback failed",
    });
  }
};