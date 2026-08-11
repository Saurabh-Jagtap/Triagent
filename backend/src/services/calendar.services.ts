import { corsair } from "../corsair.js";
import { IntegrationNotConnectedError } from "../utils/integration.errors.js";

type CreateCalendarEventParams = {
    tenantId: string;
    title: string;
    attendees: string[];
    startTime: string;
    endTime: string;
};

export const getCalendarEventService = async (userId: string) => {
    return await corsair
        .withTenant(userId)
        .googlecalendar
        .api
        .events
        .getMany();
};

export class CalendarService {
    static async createEvent({ tenantId, title, attendees, startTime, endTime }: CreateCalendarEventParams) {

        try {
            return await corsair
                .withTenant(tenantId)
                .googlecalendar
                .api
                .events
                .create({
                    calendarId: "primary",

                    event: {
                        summary: title,
                        attendees: attendees.map(email => ({
                            email,
                        })),

                        start: {
                            dateTime: startTime,
                        },

                        end: {
                            dateTime: endTime,
                        },
                    },
                });
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : String(error);

            if (message.includes("Account not found") && message.includes("googlecalendar")) {
                throw new IntegrationNotConnectedError("googlecalendar");
            }

            throw error;
        }

    }
}
