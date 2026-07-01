import type { Request, Response } from "express";
import { assistantService } from "../services/assistant.services.js";

export const assistantChat = async (
    req: Request,
    res: Response
) => {
    try {

        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const result = await assistantService.chat(
            req.user.id,
            req.body.message
        );

        return res.json({
            success: true,
            answer: result.finalOutput
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Agent failed",
        });
    }
};