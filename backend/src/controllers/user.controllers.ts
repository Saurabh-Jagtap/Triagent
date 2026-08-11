import type { Request, Response } from "express";
import { UserService } from "../services/user.services.js";

export const getMe = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const user = await UserService.getMe(req.user.id);

        return res.json({
            success: true,
            user,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to fetch user",
        });
    }
};

export const updateTimezone = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const { timezone } = req.body;

        if (!timezone || typeof timezone !== "string") {
            return res.status(400).json({
                success: false,
                message: "Timezone is required",
            });
        }

        const user = await UserService.updateTimezone(
            req.user.id,
            timezone,
        );

        return res.json({
            success: true,
            timezone: user.timezone,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to update timezone",
        });
    }
};