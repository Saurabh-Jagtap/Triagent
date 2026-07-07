import { corsair } from "../corsair.js";

export const getCalendarEventService = async (userId: string) => {
    console.log(userId);
    const calendarEvents = await corsair
    .withTenant(userId)
    .googlecalendar
    .api
    .events
    .getMany()

    return calendarEvents
}
