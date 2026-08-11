import type { Request, Response } from 'express'
import { getCalendarEventService } from '../services/calendar.services.js'
import { IntegrationNotConnectedError } from '../utils/integration.errors.js';

export const getCalendarEvents = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const calendarEvents = await getCalendarEventService(req.user.id)

        return res.status(200).json({ success: true, data: calendarEvents })
    } catch (error) {

        console.error(error);

        if (error instanceof IntegrationNotConnectedError) {
            return res.status(409).json({
                success: false,
                code: "INTEGRATION_NOT_CONNECTED",
                integration: error.integration,
                message:
                    "Google Calendar isn't connected yet. Connect your Google Calendar account in Settings, then try again.",
            });
        }

        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Execution failed",
        });
    }
}
