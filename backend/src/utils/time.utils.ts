import * as chrono from "chrono-node";
import { DateTime } from "luxon";

const DEFAULT_DURATION_MINUTES = 60;

function getReferenceDate(timezone: string): Date {
    const now = DateTime.now().setZone(timezone);

    if (!now.isValid) {
        throw new Error(`Invalid timezone: ${timezone}`);
    }

    // Create a Date whose UTC components represent the user's local
    // wall-clock time. Chrono uses these components to resolve
    // expressions like "tomorrow".
    return new Date(
        Date.UTC(
            now.year,
            now.month - 1,
            now.day,
            now.hour,
            now.minute,
            now.second,
        ),
    );
}

function parseDateTime(
    value: string,
    timezone: string,
    referenceDate: Date,
    forwardDate = true,
): DateTime {

    const results = chrono.parse(
        value,
        referenceDate,
        {
            forwardDate,
        },
    );

    if (results.length === 0) {
        throw new Error(`Unable to understand time: ${value}`);
    }

    const parsed = results[0];

    if (!parsed) {
        throw new Error(`Unable to understand time: ${value}`);
    }

    const components = parsed.start;

    const year = components.get("year");
    const month = components.get("month");
    const day = components.get("day");
    const hour = components.get("hour") ?? 0;
    const minute = components.get("minute") ?? 0;
    const second = components.get("second") ?? 0;

    if (
        year === null ||
        month === null ||
        day === null
    ) {
        throw new Error(`Unable to resolve date from: ${value}`);
    }

    const dateTime = DateTime.fromObject(
        {
            year,
            month,
            day,
            hour,
            minute,
            second,
        },
        {
            zone: timezone,
        },
    );

    if (!dateTime.isValid) {
        throw new Error(
            `Invalid date/time "${value}" in timezone "${timezone}": ${dateTime.invalidExplanation}`,
        );
    }

    return dateTime;
}

export function normalizeStartTime(value: string,timezone: string): string {

    const referenceDate = getReferenceDate(timezone);

    const dateTime = parseDateTime(
        value,
        timezone,
        referenceDate,
    );

    return dateTime.toUTC().toISO()!;
}

export function normalizeEndTime(startTime: string,endTime: string | undefined,durationMinutes: number | undefined,timezone: string): string {

    const start = DateTime.fromISO(startTime, {
        zone: "utc",
    });

    if (!start.isValid) {
        throw new Error(
            `Invalid normalized start time: ${startTime}`,
        );
    }

    if (!endTime) {
    return start
        .plus({
            minutes: durationMinutes ?? DEFAULT_DURATION_MINUTES,
        })
        .toISO()!;
}

    /*
     * Interpret the user's end-time expression relative to
     * the same calendar date as the start time.
     */
    const startInUserTimezone = start.setZone(timezone);

    const referenceDate = new Date(
        Date.UTC(
            startInUserTimezone.year,
            startInUserTimezone.month - 1,
            startInUserTimezone.day,
            startInUserTimezone.hour,
            startInUserTimezone.minute,
            startInUserTimezone.second,
        ),
    );

    const parsedEnd = parseDateTime(
        endTime,
        timezone,
        referenceDate,
        false,
    );

    /*
     * If the user says something like "5 PM", Chrono may resolve
     * it correctly on the same date. If the resulting end is before
     * the start, assume the user meant the following day.
     */
    let finalEnd = parsedEnd;

    if (finalEnd <= startInUserTimezone) {
        finalEnd = finalEnd.plus({ days: 1 });
    }

    return finalEnd.toUTC().toISO()!;
}