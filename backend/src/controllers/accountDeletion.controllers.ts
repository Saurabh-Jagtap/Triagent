import type { Request, Response } from "express";
import { AccountDeletionService } from "../services/accountDeletion.services.js";

export const deleteAccount = async (req: Request,res: Response) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        await AccountDeletionService.deleteAccount(
            req.user.id,
        );

        return res.json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (error) {
        console.error(
            "ACCOUNT DELETION ERROR:",
            error,
        );

        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to delete account",
        });
    }
};