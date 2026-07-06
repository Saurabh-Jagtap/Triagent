import type { Request, Response, NextFunction } from 'express'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const internalApiKey = req.header("x-internal-api-key");

    if (internalApiKey !== process.env.INTERNAL_API_KEY) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    const userId = req.header("x-user-id")

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    req.user = { id: userId }
    next()
}
