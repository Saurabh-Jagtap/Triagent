import * as chrono from "chrono-node";

const DEFAULT_DURATION_MINUTES = 60;

export function normalizeStartTime(value: string, timezone: string): string {
  const referenceDate = new Date();

  const parsed = chrono.parseDate(
    value,
    referenceDate,
    {
      forwardDate: true,
    },
  );

  if (!parsed) {
    throw new Error(`Unable to understand start time: ${value}`);
  }

  // Chrono gives us a Date representing the interpreted time.
  // Convert it into an ISO timestamp.
  return parsed.toISOString();
}

export function normalizeEndTime(startTime: string, endTime?: string): string {
  if (endTime) {
    const parsedEndTime = chrono.parseDate(endTime);

    if (!parsedEndTime) {
      throw new Error(`Unable to understand end time: ${endTime}`);
    }

    return parsedEndTime.toISOString();
  }

  const start = new Date(startTime);

  if (Number.isNaN(start.getTime())) {
    throw new Error(`Invalid normalized start time: ${startTime}`);
  }

  start.setMinutes(start.getMinutes() + DEFAULT_DURATION_MINUTES);

  return start.toISOString();
}