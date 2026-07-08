import { corsair } from "../corsair.js";

type CreateCalendarEventParams = {
    tenantId: string;
    title: string;
    attendees: string[];
    startTime: string;
    endTime: string;
};

export const getCalendarEventService = async (userId: string) => {
    return corsair
        .withTenant(userId)
        .googlecalendar
        .api
        .events
        .getMany();
};

export class CalendarService {
    static async createEvent({ tenantId, title, attendees, startTime, endTime }: CreateCalendarEventParams) {

        return corsair
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
                        timeZone: "Asia/Kolkata",
                    },

                    end: {
                        dateTime: endTime,
                        timeZone: "Asia/Kolkata",
                    },
                },
            });

    }
}
