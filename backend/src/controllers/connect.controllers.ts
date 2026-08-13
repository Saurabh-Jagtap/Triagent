import type { Request, Response } from "express";
import { ConnectService } from "../services/connect.services.js";
import { PROVIDERS } from "../constants/providers.js";

const REDIRECT_URI = process.env.OAUTH_REDIRECT_URI!;

export const connectController = async (req: Request, res: Response) => {
    try {

        const plugin = req.query.plugin as string;

        if (!plugin) {
            return res.status(400).json({
                success: false,
                message: "Plugin required",
            });
        }

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const tenantId = req.user.id;

        const { url, state } = await ConnectService.generateConnectionUrl({
            plugin,
            tenantId,
            redirectUri: REDIRECT_URI,
        });

        res.cookie(
            "oauth_state",
            state,
            {
                httpOnly: true,
                sameSite: "lax",
                secure:
                    process.env.NODE_ENV ===
                    "production",
                maxAge: 10 * 60 * 1000,
            }
        );

        return res.redirect(url);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "OAuth connection failed",
        });
    }
};

export const getConnections = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const connections =
            await ConnectService.getConnections(req.user.id);

        return res.json({
            success: true,
            connections,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch connections",
        });
    }
};

export const disconnect = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const { provider } = req.params;

        if (provider !== PROVIDERS.GMAIL && provider !== PROVIDERS.GOOGLE_CALENDAR) {
            return res.status(400).json({
                success: false,
                message: "Invalid provider",
            });
        }

        await ConnectService.disconnect(
            req.user.id,
            provider,
        );

        return res.json({
            success: true,
            message: "Account disconnected successfully",
        });
    } catch (error) {
        console.error("Disconnect error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to disconnect account",
        });
    }
};